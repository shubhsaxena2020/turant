// In-page speech-to-text with Whisper (transformers.js + ONNX Runtime Web). The fallback for when the
// browser's own speech service hears the microphone but returns no words (seen on Chrome for Windows).
// Loaded only when needed: the first use downloads the model (about 80-100 MB) and runtime (21 MB), then the browser
// caches them. Everything runs on the device; no audio leaves it.
//
// Model by speaking language (measured with harness/asr_wbase.mjs on the same clips, see harness/JOURNAL.md):
// stock whisper-base writes Hindi in Urdu / Cyrillic / Latin letters (13.8% fully correct reports), so Hindi uses
// Oriserve's Whisper-Hindi2Hinglish-Swift (a whisper-base fine-tune, Apache-2.0), which writes clean Hinglish.
// Indian English is better on it too, so English (India) uses it as well.

type Asr = (audio: Float32Array, opts: Record<string, unknown>) => Promise<{ text: string } | { text: string }[]>;

interface ModelChoice {
  id: string;
  /** Has fp32/q4 files for the WebGPU path; otherwise WebAssembly q8 only. */
  gpu: boolean;
}
const BASE: ModelChoice = { id: 'onnx-community/whisper-base', gpu: true };
const HINGLISH: ModelChoice = { id: 'Hirecentive-D3l/Whisper-Hindi2Hinglish-Swift-ONNX', gpu: false };
// Measured on the harness clips (clean, fully correct reports, after round 34):
//   Hindi 13.8% -> 85.0%, English (India) 50.0% -> 61.7%, Marathi 10.0% -> 15.0% (base -> Hinglish model).
// Bengali, Tamil, Telugu and Kannada stay on whisper-base (2.5-6.3%): weak; the browser recogniser is the main path there.
const MODEL_FOR: Record<string, ModelChoice> = { 'hi-IN': HINGLISH, 'en-IN': HINGLISH, 'mr-IN': HINGLISH };
const modelFor = (lang: string) => MODEL_FOR[lang] ?? BASE;
const WHISPER_LANG: Record<string, string> = {
  'en-IN': 'english',
  'hi-IN': 'hindi',
  'bn-IN': 'bengali',
  'ta-IN': 'tamil',
  'te-IN': 'telugu',
  'mr-IN': 'marathi',
  'kn-IN': 'kannada',
};

const loading = new Map<string, Promise<Asr>>();
let forceWasm = false;

/** navigator.gpu can exist with no usable adapter (headless, blocklisted drivers): ask for one first. */
async function hasGpu(): Promise<boolean> {
  try {
    const gpu = (navigator as unknown as { gpu?: { requestAdapter(): Promise<unknown> } }).gpu;
    return !!gpu && !!(await gpu.requestAdapter());
  } catch {
    return false;
  }
}

/** Progress 0..1 of the one-time model download (summed over its files). */
export type Progress = (fraction: number) => void;

/** Is this model's largest file already in the browser's cache (so no "downloading" message is needed)? */
async function cached(model: ModelChoice): Promise<boolean> {
  try {
    const file = model.gpu ? 'decoder_model_merged_q4.onnx' : 'decoder_model_merged_quantized.onnx';
    const c = await caches.open('transformers-cache');
    return !!(await c.match(`https://huggingface.co/${model.id}/resolve/main/onnx/${file}`));
  } catch {
    return false;
  }
}

export function loadWhisper(lang: string, onProgress?: Progress): Promise<Asr> {
  const model = modelFor(lang);
  const hit = loading.get(model.id);
  if (hit) return hit;
  const p = (async () => {
    const { pipeline, env } = await import('@huggingface/transformers');
    env.allowLocalModels = false;
    // Reading the model back from the cache also reports progress: only show it for a real download.
    if (await cached(model)) onProgress = undefined;
    const files = new Map<string, { loaded: number; total: number }>();
    const progress_callback = (p: { status?: string; file?: string; loaded?: number; total?: number }) => {
      if (p.status !== 'progress' || !p.file || !p.total) return;
      files.set(p.file, { loaded: p.loaded ?? 0, total: p.total });
      let a = 0;
      let b = 0;
      for (const f of files.values()) (a += f.loaded), (b += f.total);
      onProgress?.(b ? a / b : 0);
    };
    if (model.gpu && !forceWasm && (await hasGpu())) {
      try {
        return (await pipeline('automatic-speech-recognition', model.id, {
          device: 'webgpu',
          dtype: { encoder_model: 'fp32', decoder_model_merged: 'q4' },
          progress_callback,
        })) as unknown as Asr;
      } catch {
        /* no usable WebGPU adapter: fall back to WebAssembly */
      }
    }
    return (await pipeline('automatic-speech-recognition', model.id, { device: 'wasm', dtype: 'q8', progress_callback })) as unknown as Asr;
  })();
  loading.set(model.id, p);
  p.catch(() => loading.delete(model.id)); // let a later attempt retry
  return p;
}

/** Recorded audio (any format the browser can decode) -> 16 kHz mono samples. */
async function toPcm16k(blob: Blob): Promise<Float32Array> {
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  try {
    const audio = await ctx.decodeAudioData(await blob.arrayBuffer());
    const off = new OfflineAudioContext(1, Math.max(1, Math.ceil(audio.duration * 16000)), 16000);
    const src = off.createBufferSource();
    src.buffer = audio;
    src.connect(off.destination);
    src.start();
    return (await off.startRendering()).getChannelData(0);
  } finally {
    void ctx.close().catch(() => undefined);
  }
}

/** Transcribe a recording in the given speaking language. Resolves to '' if nothing was understood. */
export async function transcribe(blob: Blob, lang: string, onProgress?: Progress): Promise<string> {
  const [asr, pcm] = await Promise.all([loadWhisper(lang, onProgress), toPcm16k(blob)]);
  const opts = { language: WHISPER_LANG[lang] ?? 'english', task: 'transcribe', chunk_length_s: 30, stride_length_s: 5 };
  let out: Awaited<ReturnType<Asr>>;
  try {
    out = await asr(pcm, opts);
  } catch (e) {
    if (forceWasm) throw e;
    // The GPU path failed at run time: rebuild on WebAssembly once and retry.
    forceWasm = true;
    loading.delete(modelFor(lang).id);
    out = await (await loadWhisper(lang, onProgress))(pcm, opts);
  }
  const text = (Array.isArray(out) ? out.map((o) => o.text).join(' ') : out.text).replace(/\s+/g, ' ').trim();
  // Whisper's stock outputs for silence or noise
  return /^(\[.*\]|\(.*\)|you\.?|thanks?\.?|thank you\.?|thanks for watching!?|bye\.?)$/i.test(text) ? '' : text;
}
