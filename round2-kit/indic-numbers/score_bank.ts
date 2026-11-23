import { readFileSync } from 'node:fs';
import { findBank } from './src/bank';
const lines = readFileSync('../../harness/corpus/cases.jsonl', 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const by: Record<string, { ok: number; n: number; fp: number }> = {};
const fails: string[] = [];
for (const c of lines) {
  const want = c.expected?.bank;
  const got = findBank(c.text)?.key;
  const s = (by[c.lang] ??= { ok: 0, n: 0, fp: 0 });
  if (want) { s.n++; if (got === want) s.ok++; else fails.push(`${c.id} want ${want} got ${got} | ${c.text.slice(0, 100)}`); }
  else if (got && c.kind === 'story') { s.fp++; fails.push(`${c.id} FALSE POSITIVE ${got} | ${c.text.slice(0, 100)}`); }
}
let ok = 0, n = 0, fp = 0;
for (const [l, s] of Object.entries(by)) { ok += s.ok; n += s.n; fp += s.fp; console.log(l.padEnd(3), `${s.ok}/${s.n}`, (100 * s.ok / s.n).toFixed(0) + '%', 'fp', s.fp); }
console.log('ALL', `${ok}/${n}`, (100 * ok / n).toFixed(1) + '%', 'false positives', fp);
console.log(fails.join('\n'));
