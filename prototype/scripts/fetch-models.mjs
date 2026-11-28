// Fetch the self-hosted speech models (Telugu, Kannada, Tamil) into public/models/ for a local or Docker build.
// They are not kept in git (about 100, 100 and 290 MB). If the download fails, the build still works and the
// app falls back to stock whisper-base for those languages. Rebuild them from source instead with
// harness/convert_whisper.py.
// Large files can drop mid-download ("terminated"), so each file is retried, written to a temp file and renamed
// only when complete; a model that still fails is removed whole, so the app never loads a partial model.
import { createWriteStream, existsSync, mkdirSync, readFileSync, renameSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'models', 'turant');
const SOURCE = process.env.TURANT_MODELS_URL ?? 'https://turant-voice.vercel.app/models/turant';
const MODELS = ['whisper-telugu-base-onnx', 'whisper-kannada-base-onnx', 'whisper-tamil-small-onnx'];
const FILES = [
  'config.json', 'generation_config.json', 'preprocessor_config.json', 'tokenizer.json', 'tokenizer_config.json',
  'special_tokens_map.json', 'added_tokens.json', 'normalizer.json', 'vocab.json', 'merges.txt',
  'onnx/encoder_model_quantized.onnx', 'onnx/decoder_model_merged_quantized.onnx',
];
const TRIES = 4;

async function download(url, dest) {
  for (let attempt = 1; ; attempt++) {
    const tmp = dest + '.part';
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // the host answers a missing file with the app's index.html (status 200)
      if ((res.headers.get('content-type') ?? '').includes('text/html')) throw new Error('not found (got a web page)');
      mkdirSync(dirname(dest), { recursive: true });
      await pipeline(Readable.fromWeb(res.body), createWriteStream(tmp));
      renameSync(tmp, dest);
      return;
    } catch (e) {
      rmSync(tmp, { force: true });
      if (attempt >= TRIES) throw new Error(`${url.slice(SOURCE.length + 1)}: ${e.message}`);
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

for (const m of MODELS) {
  try {
    // a decoder split into external-data chunks (harness/split_onnx.py) lists them in config.json
    const cfgPath = join(ROOT, m, 'config.json');
    await download(`${SOURCE}/${m}/config.json`, cfgPath);
    const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
    const chunks = Object.entries(cfg['transformers.js_config']?.use_external_data_format ?? {}).flatMap(([f, n]) =>
      Array.from({ length: Number(n) }, (_, i) => `onnx/${f}_data${i ? '_' + i : ''}`),
    );
    for (const f of [...FILES, ...chunks]) {
      const dest = join(ROOT, m, f);
      if (existsSync(dest)) continue;
      await download(`${SOURCE}/${m}/${f}`, dest);
    }
    console.log(`models: ${m} ready`);
  } catch (e) {
    rmSync(join(ROOT, m), { recursive: true, force: true });
    console.log(`models: ${m} not fetched (${e.message}); the app will use whisper-base for it`);
  }
}
