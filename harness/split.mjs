// Dev / held-out split of a harness report, to keep extractor tuning honest.
// Dev = the alphabetically first voice of each language; held-out = the other voice(s).
// Tune only by reading dev transcripts; report held-out next to it.
//   node split.mjs round1 [round2 ...]
import fs from 'node:fs';

const names = process.argv.slice(2);
if (!names.length) names.push('latest');

const pct = (a, b) => (b ? ((100 * a) / b).toFixed(1) : '-');
const FIELDS = ['amount', 'time', 'bank', 'scamType'];

function score(runs) {
  const f = Object.fromEntries(FIELDS.map((k) => [k, { tp: 0, fp: 0, fn: 0 }]));
  for (const r of runs)
    for (const k of FIELDS) {
      const o = r.out?.[k];
      if (o === 'tp') f[k].tp++;
      else if (o === 'fp') f[k].fp++;
      else if (o === 'fn') f[k].fn++;
      else if (o === 'wrong') (f[k].fp++, f[k].fn++);
    }
  const f1 = (x) => pct(2 * x.tp, 2 * x.tp + x.fp + x.fn);
  return { n: runs.length, full: pct(runs.filter((r) => r.correct).length, runs.length), ...Object.fromEntries(FIELDS.map((k) => [k, f1(f[k])])) };
}

const rows = [];
for (const name of names) {
  const j = JSON.parse(fs.readFileSync(new URL(`./reports/${name}.json`, import.meta.url), 'utf8'));
  const runs = j.runs.filter((r) => r.asrLang !== 'auto' && !String(r.tid).endsWith('__auto'));
  const dev = new Set();
  for (const lang of new Set(runs.map((r) => r.lang))) dev.add([...new Set(runs.filter((r) => r.lang === lang).map((r) => r.voice))].sort()[0]);
  for (const [label, keep] of [
    ['dev clean', (r) => dev.has(r.voice) && r.noise === 'clean' && r.rate === 'r0'],
    ['held-out clean', (r) => !dev.has(r.voice) && r.noise === 'clean' && r.rate === 'r0'],
    ['dev all', (r) => dev.has(r.voice)],
    ['held-out all', (r) => !dev.has(r.voice)],
  ])
    rows.push([name, label, score(runs.filter(keep))]);
}
console.log(['report', 'split', 'runs', 'full%', ...FIELDS.map((k) => `${k} F1`)].join('\t'));
for (const [n, l, s] of rows) console.log([n, l, s.n, s.full, ...FIELDS.map((k) => s[k])].join('\t'));
