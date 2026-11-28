// The in-page Whisper model in a worker, so loading and running it never blocks the page (on a slow phone the
// main-thread path kept the "Listening" bar running ~8 s after the person stopped). whisper.ts decides whether to
// use this worker and falls back to its own main-thread path if the worker cannot start, stalls or fails.
/// <reference lib="webworker" />

type Asr = (audio: Float32Array, opts: Record<string, unknown>) => Promise<{ text: string } | { text: string }[]>;
type In =
  | { type: 'ping' }
  | { type: 'load'; id: string; gpu: boolean; host: string; path: string; quiet: boolean; forceWasm: boolean; hang?: boolean }
  | { type: 'run'; rid: number; id: string; pcm: Float32Array; opts: Record<string, unknown> };

const scope = self as unknown as DedicatedWorkerGlobalScope;
const models = new Map<string, Promise<Asr>>();
let hang = false; // debug (?asr-worker-hang): never answer a transcription, to test the page's stall fallback

async function hasGpu(): Promise<boolean> {
  try {
    const gpu = (navigator as unknown as { gpu?: { requestAdapter(): Promise<unknown> } }).gpu;
    return !!gpu && !!(await gpu.requestAdapter());
  } catch {
    return false;
  }
}

async function load(m: Extract<In, { type: 'load' }>): Promise<Asr> {
  const { pipeline, env } = await import('@huggingface/transformers');
  env.allowLocalModels = false;
  env.remoteHost = m.host;
  env.remotePathTemplate = m.path;
  const files = new Map<string, { loaded: number; total: number }>();
  const progress_callback = (p: { status?: string; file?: string; loaded?: number; total?: number }) => {
    scope.postMessage({ type: 'alive', id: m.id }); // any event (cache reads too) shows the worker is working
    if (m.quiet || p.status !== 'progress' || !p.file || !p.total) return;
    files.set(p.file, { loaded: p.loaded ?? 0, total: p.total });
    let a = 0;
    let b = 0;
    for (const f of files.values()) (a += f.loaded), (b += f.total);
    scope.postMessage({ type: 'progress', id: m.id, frac: b ? a / b : 0 });
  };
  if (m.gpu && !m.forceWasm && (await hasGpu())) {
    try {
      return (await pipeline('automatic-speech-recognition', m.id, { device: 'webgpu', dtype: { encoder_model: 'fp32', decoder_model_merged: 'q4' }, progress_callback })) as unknown as Asr;
    } catch {
      /* no usable WebGPU adapter: fall back to WebAssembly */
    }
  }
  return (await pipeline('automatic-speech-recognition', m.id, { device: 'wasm', dtype: 'q8', progress_callback })) as unknown as Asr;
}

scope.onmessage = async (e: MessageEvent<In>) => {
  const m = e.data;
  if (m.type === 'ping') return scope.postMessage({ type: 'pong', isolated: self.crossOriginIsolated });
  if (m.type === 'load') {
    hang = !!m.hang;
    let p = models.get(m.id);
    if (!p) {
      p = load(m);
      models.set(m.id, p);
      p.catch(() => models.delete(m.id));
    }
    try {
      await p;
      scope.postMessage({ type: 'ready', id: m.id });
    } catch (err) {
      scope.postMessage({ type: 'error', id: m.id, message: String(err) });
    }
    return;
  }
  if (m.type === 'run') {
    if (hang) return;
    try {
      const asr = await models.get(m.id);
      if (!asr) throw new Error('model not loaded');
      const out = await asr(m.pcm, m.opts);
      scope.postMessage({ type: 'result', rid: m.rid, out: Array.isArray(out) ? out.map((o) => ({ text: o.text })) : { text: out.text } });
    } catch (err) {
      scope.postMessage({ type: 'result', rid: m.rid, error: String(err) });
    }
  }
};
