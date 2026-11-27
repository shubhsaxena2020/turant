// Generalisation report: per language, fully correct reports on
//   tuned   = the dev voice (alphabetically first voice; the only one read while tuning),
//   held-out = the other edge-tts Indian voice(s),
//   unseen  = Azure multilingual voices never used for tuning (plan_unseen*.json, tier "unseen"),
//   unseen 15 / 5 dB = the same voices with noise (tier "unseen_noise").
//   node unseen_report.mjs <base report name> <unseen report name> [langs]
// The target metric is the unseen (and blind) column; a rule that only moves "tuned" is not kept.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const [baseName, unseenName, langArg] = process.argv.slice(2);
const load = (n) => JSON.parse(fs.readFileSync(path.join(HERE, 'reports', n + '.json'), 'utf8')).runs;
const base = load(baseName);
const unseen = load(unseenName);
const langs = langArg ? langArg.split(',') : [...new Set(unseen.map((r) => r.lang))];
const dev = {};
for (const l of langs) dev[l] = [...new Set(base.filter((r) => r.lang === l).map((r) => r.voice))].sort()[0];

const pct = (rs) => (rs.length ? `${((100 * rs.filter((r) => r.correct).length) / rs.length).toFixed(1).padStart(5)}% (${String(rs.length).padStart(3)})` : '     -      ');
const clean = (r) => r.noise === 'clean' && (r.rate ?? 'r0') === 'r0';
console.log(`${baseName} / ${unseenName}: fully correct reports`);
console.log('lang | tuned voice    | held-out       | unseen         | unseen 15 dB   | unseen 5 dB');
const tot = { tuned: [], held: [], unseen: [], n15: [], n5: [] };
for (const l of langs) {
  const b = base.filter((r) => r.lang === l && clean(r));
  const u = unseen.filter((r) => r.lang === l);
  const cols = {
    tuned: b.filter((r) => r.voice === dev[l]),
    held: b.filter((r) => r.voice !== dev[l]),
    unseen: u.filter(clean),
    n15: u.filter((r) => r.snr === 15),
    n5: u.filter((r) => r.snr === 5),
  };
  for (const k of Object.keys(tot)) tot[k].push(...cols[k]);
  console.log(`${l.padEnd(4)} | ${Object.values(cols).map(pct).join(' | ')}`);
}
console.log(`all  | ${Object.values(tot).map(pct).join(' | ')}`);
