// Score findAmount() on every corpus sentence that has an expected amount.
import { readFileSync } from 'node:fs';
import { findAmount } from './src/numbers';

const lines = readFileSync('../../harness/corpus/cases.jsonl', 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const by: Record<string, { ok: number; n: number }> = {};
const fails: string[] = [];
for (const c of lines) {
  if (c.expected?.amount === undefined) continue;
  const got = findAmount(c.text);
  const s = (by[c.lang] ??= { ok: 0, n: 0 });
  s.n++;
  if (got === c.expected.amount) s.ok++;
  else fails.push(`${c.id} expected ${c.expected.amount} got ${got} | ${c.text.slice(0, 110)}`);
}
let ok = 0, n = 0;
for (const [l, s] of Object.entries(by)) { ok += s.ok; n += s.n; console.log(l.padEnd(3), `${s.ok}/${s.n}`, (100 * s.ok / s.n).toFixed(0) + '%'); }
console.log('ALL', `${ok}/${n}`, (100 * ok / n).toFixed(1) + '%');
console.log(fails.join('\n'));
