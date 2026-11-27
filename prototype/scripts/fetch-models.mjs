// Fetch the self-hosted speech models (Telugu, Kannada) into public/models/ for a local or Docker build.
// They are not kept in git (about 100 MB each). If the download fails, the build still works and the
// app falls back to stock whisper-base for those languages. Rebuild them from source instead with
// harness/convert_whisper.py.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'models', 'turant');
const SOURCE = process.env.TURANT_MODELS_URL ?? 'https://turant-voice.vercel.app/models/turant';
const MODELS = ['whisper-telugu-base-onnx', 'whisper-kannada-base-onnx'];
const FILES = [
  'config.json', 'generation_config.json', 'preprocessor_config.json', 'tokenizer.json', 'tokenizer_config.json',
  'special_tokens_map.json', 'added_tokens.json', 'normalizer.json', 'vocab.json', 'merges.txt',
  'onnx/encoder_model_quantized.onnx', 'onnx/decoder_model_merged_quantized.onnx',
];

for (const m of MODELS) {
  try {
    for (const f of FILES) {
      const dest = join(ROOT, m, f);
      if (existsSync(dest)) continue;
      const res = await fetch(`${SOURCE}/${m}/${f}`);
      if (!res.ok) throw new Error(`${f}: HTTP ${res.status}`);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    }
    console.log(`models: ${m} ready`);
  } catch (e) {
    console.log(`models: ${m} not fetched (${e.message}); the app will use whisper-base for it`);
  }
}
