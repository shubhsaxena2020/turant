// Is the extractor's confidence meaningful? For every field it returns on an ASR transcript, bucket by
// confidence and measure how often the value is right. If low-confidence values are much more often
// wrong, the app can confirm just those (and trust the rest).
//   node calib.mjs [report-name]   (uses the transcripts listed in reports/<name>.json; default round9)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { NOW, FIELDS, fieldMatches } from './lib.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const X = await import(pathToFileURL(path.resolve(HERE, '..', 'prototype', 'src', 'lib', 'extract.ts')).href);
const name = process.argv[2] ?? 'round9';
const rep = JSON.parse(fs.readFileSync(path.join(HERE, 'reports', `${name}.json`), 'utf8'));
const cases = Object.fromEntries(fs.readFileSync(path.join(HERE, 'corpus', 'cases.jsonl'), 'utf8').trim().split(/\r?\n/).map((l) => JSON.parse(l)).map((c) => [c.id, c]));

const BUCKETS = [[0.9, 1.01, '>= 0.90'], [0.8, 0.9, '0.80-0.89'], [0.6, 0.8, '0.60-0.79'], [0, 0.6, '< 0.60']];
const stat = {};
for (const r of rep.runs) {
  if (r.asrLang === 'auto' || r.noise !== 'clean') continue;
  const c = cases[r.case];
  if (c.kind === 'correction') continue;
  const e = X.extractFields(r.transcript, { now: NOW, hint: c.hint });
  for (const f of FIELDS) {
    if (!e[f]) continue;
    const ok = f in c.expected && fieldMatches(f, c.expected[f], e[f].value);
    const b = BUCKETS.find(([lo, hi]) => e[f].confidence >= lo && e[f].confidence < hi)[2];
    for (const key of [f, 'ALL']) {
      const s = ((stat[key] ??= {})[b] ??= [0, 0]);
      s[1]++;
      if (ok) s[0]++;
    }
  }
}
console.log(`Precision of returned values by confidence (clean ASR transcripts, ${name})`);
console.log('field'.padEnd(15) + BUCKETS.map((b) => b[2].padStart(16)).join(''));
for (const [f, by] of Object.entries(stat).sort((a, b) => (a[0] === 'ALL') - (b[0] === 'ALL')))
  console.log(f.padEnd(15) + BUCKETS.map(([, , b]) => (by[b] ? `${((100 * by[b][0]) / by[b][1]).toFixed(0)}% of ${by[b][1]}` : '-').padStart(16)).join(''));
