// Score findTime() on every corpus sentence with an expected time (same fixed clock as the harness).
import { readFileSync } from 'node:fs';
import { findTime } from './src/time';

const NOW = new Date('2026-11-21T12:00:00+05:30');
const expected = (e: { ago?: number; day?: number; at?: string }) => {
  if (e.ago !== undefined) return new Date(NOW.getTime() - e.ago * 60000);
  const [h, m] = e.at!.split(':').map(Number);
  const d = new Date(NOW);
  d.setDate(d.getDate() + (e.day ?? 0));
  d.setHours(h, m, 0, 0);
  return d;
};
const lines = readFileSync('../../harness/corpus/cases.jsonl', 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const by: Record<string, { ok: number; n: number }> = {};
const fails: string[] = [];
for (const c of lines) {
  const e = c.expected?.time;
  if (!e) continue;
  const hit = findTime(c.text, NOW);
  const tol = (e.tol ?? 20) * 60000;
  const ok = !!hit && Math.abs(hit.date.getTime() - expected(e).getTime()) <= tol;
  const s = (by[c.lang] ??= { ok: 0, n: 0 });
  s.n++;
  if (ok) s.ok++;
  else fails.push(`${c.id} want ${JSON.stringify(e)} got ${hit ? hit.date.toString().slice(0, 21) + ' ' + hit.kind : 'none'} | ${c.text.slice(0, 100)}`);
}
let ok = 0, n = 0;
for (const [l, s] of Object.entries(by)) { ok += s.ok; n += s.n; console.log(l.padEnd(3), `${s.ok}/${s.n}`, (100 * s.ok / s.n).toFixed(0) + '%'); }
console.log('ALL', `${ok}/${n}`, (100 * ok / n).toFixed(1) + '%');
console.log(fails.join('\n'));
