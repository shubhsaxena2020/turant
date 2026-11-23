// Score the kit's fraud config on the harness corpus (reference text): amount, time, bank.
import { readFileSync } from 'node:fs';
import cfg from './src/apps/fraud/config';
import { extractAll } from './src/lib/slots';

const NOW = new Date('2026-11-21T12:00:00+05:30');
const BANK: Record<string, RegExp> = { sbi: /SBI|State Bank/i, hdfc: /HDFC/i, icici: /ICICI/i, axis: /Axis/i, kotak: /Kotak/i, pnb: /Punjab|PNB/i, bob: /Baroda/i, canara: /Canara/i, union: /Union/i, boi: /^Bank of India/i, indian: /^Indian Bank/i, yes: /Yes/i, idfc: /IDFC/i };
const want = (e: { ago?: number; day?: number; at?: string }) => {
  if (e.ago !== undefined) return NOW.getTime() - e.ago * 60000;
  const [h, m] = e.at!.split(':').map(Number); const d = new Date(NOW); d.setDate(d.getDate() + (e.day ?? 0)); d.setHours(h, m, 0, 0); return d.getTime();
};
const lines = readFileSync('../../harness/corpus/cases.jsonl', 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const s: Record<string, Record<string, [number, number]>> = {};
for (const c of lines) {
  if (c.kind === 'correction') continue;
  const ext = extractAll(cfg as never, c.text, { now: NOW, hint: c.hint } as never) as Record<string, { value: unknown }>;
  const by = (s[c.lang] ??= {});
  const tally = (f: string, ok: boolean) => { const t = (by[f] ??= [0, 0]); t[1]++; if (ok) t[0]++; };
  if (c.expected.amount !== undefined) tally('amount', Number(ext.amount?.value) === c.expected.amount);
  if (c.expected.time) tally('time', !!ext.time && Math.abs(new Date(String(ext.time.value)).getTime() - want(c.expected.time)) <= (c.expected.time.tol ?? 20) * 60000);
  if (c.expected.bank) tally('bank', !!ext.bank && BANK[c.expected.bank]?.test(String(ext.bank.value)));
}
const tot: Record<string, [number, number]> = {};
for (const [lang, f] of Object.entries(s)) {
  console.log(lang.padEnd(3), Object.entries(f).map(([k, [a, b]]) => `${k} ${a}/${b}`).join('  '));
  for (const [k, [a, b]] of Object.entries(f)) { const t = (tot[k] ??= [0, 0]); t[0] += a; t[1] += b; }
}
console.log('ALL', Object.entries(tot).map(([k, [a, b]]) => `${k} ${a}/${b} (${((100 * a) / b).toFixed(1)}%)`).join('  '));
