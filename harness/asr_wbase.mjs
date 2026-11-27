// Transcribe harness clips with the SAME speech model the app runs in the page when the browser's own
// recogniser fails: onnx-community/whisper-base, q8, through transformers.js (here on onnxruntime-node, CPU).
// So the harness measures what actually ships, not only server-side Whisper.
//
//   node asr_wbase.mjs [--plan plan.json] [--tiers base] [--limit N] [--threads 3]
//   then: node run_eval.mjs --transcripts transcripts_wb --name wb1
//
// Writes transcripts_wb/<tid>.json ({"text"}); skips ones already done. Run from harness/ (it imports the
// prototype's copy of transformers.js, so nothing extra to install).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const arg = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const PLAN = path.join(HERE, arg('--plan', 'plan.json'));
const TIERS = arg('--tiers', 'base').split(',');
const LIMIT = Number(arg('--limit', '0'));
const THREADS = Number(arg('--threads', '3'));
// --model <hf id> --out <dir>: compare other browser-sized models on the same clips
const MODEL = arg('--model', 'onnx-community/whisper-base');
const OUT = path.join(HERE, arg('--out', 'transcripts_wb'));
const LANG = { hi: 'hindi', en: 'english', bn: 'bengali', ta: 'tamil', te: 'telugu', mr: 'marathi', kn: 'kannada' };

const { pipeline, env } = await import(pathToFileURL(path.join(HERE, '..', 'prototype', 'node_modules', '@huggingface', 'transformers', 'src', 'transformers.js')).href).catch(
  () => import(pathToFileURL(path.join(HERE, '..', 'prototype', 'node_modules', '@huggingface', 'transformers', 'dist', 'transformers.node.mjs')).href),
);
env.allowLocalModels = false;

/** 16-bit PCM WAV -> Float32 mono at the file's rate (the harness writes 16 kHz mono). */
function readWav(file) {
  const b = fs.readFileSync(file);
  let off = 12;
  let fmt = null;
  let data = null;
  while (off + 8 <= b.length) {
    const id = b.toString('ascii', off, off + 4);
    const size = b.readUInt32LE(off + 4);
    if (id === 'fmt ') fmt = { ch: b.readUInt16LE(off + 10), rate: b.readUInt32LE(off + 12), bits: b.readUInt16LE(off + 22) };
    if (id === 'data') data = b.subarray(off + 8, off + 8 + size);
    off += 8 + size + (size % 2);
  }
  if (!fmt || !data || fmt.bits !== 16) throw new Error(`unsupported wav ${file}`);
  const n = data.length / 2 / fmt.ch;
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = data.readInt16LE(i * 2 * fmt.ch) / 32768;
  if (fmt.rate === 16000) return out;
  // linear resample to 16 kHz
  const m = Math.round((n * 16000) / fmt.rate);
  const r = new Float32Array(m);
  for (let i = 0; i < m; i++) {
    const x = (i * fmt.rate) / 16000;
    const j = Math.floor(x);
    r[i] = out[j] + ((out[Math.min(j + 1, n - 1)] - out[j]) * (x - j));
  }
  return r;
}

const plan = JSON.parse(fs.readFileSync(PLAN, 'utf8'));
const audios = Object.fromEntries(plan.audios.map((a) => [a.audio, a]));
const audioPath = (a) => (a.noise === 'clean' ? path.join(HERE, 'audio', 'clean', a.clip + '.wav') : path.join(HERE, 'audio', 'noisy', a.audio + '.wav'));
fs.mkdirSync(OUT, { recursive: true });
let todo = plan.jobs.filter((j) => TIERS.includes('all') || TIERS.includes(j.tier)).filter((j) => !fs.existsSync(path.join(OUT, j.tid + '.json')));
if (LIMIT) todo = todo.slice(0, LIMIT);
console.log(`${todo.length} clips to transcribe with ${MODEL} q8 (${THREADS} threads)`);
if (!todo.length) process.exit(0);

const asr = await pipeline('automatic-speech-recognition', MODEL, {
  dtype: 'q8',
  device: 'cpu',
  session_options: { intraOpNumThreads: THREADS, interOpNumThreads: 1 },
});
const t0 = Date.now();
let done = 0;
for (const j of todo) {
  const a = audios[j.audio];
  const lang = j.asr_lang ? LANG[j.lang] : undefined; // "auto" tier: let Whisper detect
  try {
    const out = await asr(readWav(audioPath(a)), { language: lang, task: 'transcribe', chunk_length_s: 30, stride_length_s: 5 });
    const text = (Array.isArray(out) ? out.map((o) => o.text).join(' ') : out.text).replace(/\s+/g, ' ').trim();
    fs.writeFileSync(path.join(OUT, j.tid + '.json'), JSON.stringify({ text }));
  } catch (e) {
    console.error(`${j.tid}: ${e.message}`);
  }
  if (++done % 25 === 0) console.log(`  ${done}/${todo.length}, ${((Date.now() - t0) / done / 1000).toFixed(2)} s per clip`);
}
console.log(`done: ${done} in ${Math.round((Date.now() - t0) / 1000)} s`);
