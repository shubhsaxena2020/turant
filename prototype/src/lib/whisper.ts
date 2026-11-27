// In-page speech-to-text with Whisper (transformers.js + ONNX Runtime Web). The fallback for when the
// browser's own speech service hears the microphone but returns no words (seen on Chrome for Windows).
// Loaded only when needed: the first use downloads the model (100-290 MB) and runtime (21 MB), then the browser
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
  /** Served by Turant itself from /models/<id>/ (converted with harness/convert_whisper.py), not from Hugging Face. */
  self?: boolean;
}
const BASE: ModelChoice = { id: 'onnx-community/whisper-base', gpu: true };
const HINGLISH: ModelChoice = { id: 'Hirecentive-D3l/Whisper-Hindi2Hinglish-Swift-ONNX', gpu: false };
// Bengali: a whisper-small fine-tune (arif11/bangla-ASR-v5, Apache-2.0, ONNX by shamim1122), 287 MB, downloaded
// only by people who speak Bengali and only when the browser recogniser fails.
const BANGLA: ModelChoice = { id: 'shamim1122/whisper-small-bangla-onnx', gpu: false };
// Measured on the harness clips (clean, fully correct reports):
//   Hindi 13.8% -> 90.0%, English (India) 50.0% -> 75.0%, Marathi 10.0% -> 53.8% (base -> Hinglish model + rules);
//   Bengali 5.0% -> 36.3% (base -> Bangla model, word error 165 -> 47).
// Telugu and Kannada: vasista22's IndicWhisper base fine-tunes (Apache-2.0, IIT Madras Speech Lab), converted to
// ONNX q8 (103 MB each) and served with the app. Telugu 6.3% -> 68.8%, Kannada 2.5% -> 50.0% fully correct.
const TELUGU: ModelChoice = { id: 'turant/whisper-telugu-base-onnx', gpu: false, self: true };
const KANNADA: ModelChoice = { id: 'turant/whisper-kannada-base-onnx', gpu: false, self: true };
// Tamil (measured, not shipped): vasista22/whisper-tamil-small goes 6.3% -> 47.5%, but its 196 MB decoder file is over
// the host's 100 MB per-file limit. It stays on whisper-base until it can be served from Hugging Face.
const MODEL_FOR: Record<string, ModelChoice> = {
  'hi-IN': HINGLISH,
  'en-IN': HINGLISH,
  'mr-IN': HINGLISH,
  'bn-IN': BANGLA,
  'te-IN': TELUGU,
  'kn-IN': KANNADA,
};
/** Where a model's files live: Hugging Face, or Turant's own /models/ folder. */
const modelHost = (model: ModelChoice) =>
  model.self ? { host: new URL('models/', document.baseURI).href, path: '{model}/' } : { host: 'https://huggingface.co/', path: '{model}/resolve/{revision}/' };
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
/** Everyone waiting on a model's download (a background prefetch and, later, the transcription itself). */
const listeners = new Map<string, Set<Progress>>();
const lastFraction = new Map<string, number>();
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
    const { host, path } = modelHost(model);
    return !!(await c.match(`${host}${path.replace('{model}', model.id).replace('{revision}', 'main')}onnx/${file}`));
  } catch {
    return false;
  }
}

/** Load (or join the loading of) the in-page model for a speaking language. Safe to call early as a prefetch. */
export function loadWhisper(lang: string, onProgress?: Progress): Promise<Asr> {
  const model = modelFor(lang);
  const ls = listeners.get(model.id) ?? new Set<Progress>();
  listeners.set(model.id, ls);
  if (onProgress) {
    ls.add(onProgress);
    const f = lastFraction.get(model.id);
    if (f !== undefined && f < 1) onProgress(f); // joined a download already under way
  }
  const hit = loading.get(model.id);
  if (hit) return hit;
  const p = (async () => {
    const { pipeline, env } = await import('@huggingface/transformers');
    env.allowLocalModels = false;
    const { host, path } = modelHost(model);
    env.remoteHost = host;
    env.remotePathTemplate = path;
    // Reading the model back from the cache also reports progress: only show it for a real download.
    const quiet = await cached(model);
    const files = new Map<string, { loaded: number; total: number }>();
    const progress_callback = (p: { status?: string; file?: string; loaded?: number; total?: number }) => {
      if (quiet || p.status !== 'progress' || !p.file || !p.total) return;
      files.set(p.file, { loaded: p.loaded ?? 0, total: p.total });
      let a = 0;
      let b = 0;
      for (const f of files.values()) (a += f.loaded), (b += f.total);
      const frac = b ? a / b : 0;
      lastFraction.set(model.id, frac);
      for (const l of ls) l(frac);
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
  // A language-specific model that fails to load (repo gone, network) falls back to stock whisper-base.
  const withFallback = model.id === BASE.id ? p : p.catch(() => {
    MODEL_FOR[lang] = BASE;
    loading.delete(model.id);
    return loadWhisper(lang, onProgress);
  });
  loading.set(model.id, withFallback);
  void p.finally(() => {
    lastFraction.set(model.id, 1);
    for (const l of ls) l(1);
    ls.clear();
  }).catch(() => undefined);
  p.catch(() => loading.delete(model.id)); // let a later attempt retry
  return withFallback;
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
