// Does cleanup ever change what the parsers extract? Compare raw vs cleaned on the corpus.
import { readFileSync } from 'node:fs';
import { cleanup } from './src/cleanup';
import { findAmount } from './src/numbers';
import { findTime } from './src/time';
import { findBank } from './src/bank';
const NOW = new Date('2026-11-21T12:00:00+05:30');
const lines = readFileSync('../../harness/corpus/cases.jsonl', 'utf8').trim().split('\n').map((l) => JSON.parse(l));
let changed = 0, removedAny = 0, diffs: string[] = [];
for (const c of lines) {
  const cl = cleanup(c.text);
  if (cl.removed.length) removedAny++;
  const a = [findAmount(c.text), findTime(c.text, NOW)?.date.getTime(), findBank(c.text)?.key];
  const b = [findAmount(cl.text), findTime(cl.text, NOW)?.date.getTime(), findBank(cl.text)?.key];
  if (JSON.stringify(a) !== JSON.stringify(b)) { changed++; diffs.push(`${c.id} raw ${JSON.stringify(a)} clean ${JSON.stringify(b)} | ${cl.text.slice(0, 90)}`); }
}
console.log(`cases ${lines.length}, cleanup removed something in ${removedAny}, extraction changed in ${changed}`);
console.log(diffs.join('\n'));
