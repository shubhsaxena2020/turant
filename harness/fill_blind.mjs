// Fill a blind set's aggregate result into the README, the deck text and the morning brief, from saved reports
// only (it never transcribes or scores). The text sits between <!-- blind3 --> ... <!-- /blind3 --> markers.
//   node fill_blind.mjs blind3 final          write it (blind3_report.sh --final calls this)
//   node fill_blind.mjs blind2 56 --dry       print what would be written, change nothing (format check)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const [set, tag, dryFlag] = process.argv.slice(2);
const dry = dryFlag === '--dry';
if (!set || !tag) throw new Error('usage: node fill_blind.mjs <blind3|blind2> <tag> [--dry]');
const load = (n) => JSON.parse(fs.readFileSync(path.join(HERE, 'reports', `${set}_${n}_${tag}.json`), 'utf8'));

// fully correct reports, split by voice: tuning = the edge-tts Indian voices, unseen = the 4 multilingual voices
function agg(runs) {
  const o = { tuning: [0, 0], unseen: [0, 0], all: [0, 0] };
  for (const r of runs) {
    if (r.transcript == null) continue;
    for (const k of [/Multilingual/.test(r.voice) ? 'unseen' : 'tuning', 'all']) {
      o[k][0] += r.correct ? 1 : 0;
      o[k][1]++;
    }
  }
  return o;
}
const pct = ([a, n]) => (n ? Math.round((100 * a) / n) : NaN);
const ref = load('ref').summary.headline.reference;
const lv3 = agg(load('lv3').runs);
const page = agg(['hienmr', 'te', 'kn', 'ta', 'bn'].flatMap((g) => load(`page_${g}`).runs));
const cases = new Set(load('lv3').runs.map((r) => r.case)).size;
const n = { lv3: lv3.all[1], page: page.all[1] };
const v = {
  ref: ref.correct.toFixed(1), lv3T: pct(lv3.tuning), lv3U: pct(lv3.unseen), lv3A: pct(lv3.all),
  pageT: pct(page.tuning), pageU: pct(page.unseen), pageA: pct(page.all),
};
if (Object.values(v).some((x) => Number.isNaN(Number(x)))) throw new Error('a report is empty: ' + JSON.stringify(v));

const label = set === 'blind3' ? 'Blind set 3' : 'Blind set 2 (DRY RUN)';
const when = set === 'blind3' ? `committed before any scoring and scored once, at the rules freeze (${new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false })} IST)` : 'format check on saved reports';
const text = {
  readme: `  **${label}, the headline** (${cases} new sentences in 7 languages, ${when}): reference text ${v.ref}%; spoken, fully correct reports: server Whisper large-v3 **${v.lv3A}%** (${v.lv3T}% tuning voices, ${v.lv3U}% unseen speakers; ${n.lv3} runs), the in-page models **${v.pageA}%** (${v.pageT}% / ${v.pageU}%; ${n.page} runs).`,
  deck: `- **${label}, the headline** (${cases} new sentences, scored once at the freeze): large-v3 ${v.lv3A}% fully correct (${v.lv3U}% with unseen speakers); the in-page models ${v.pageA}% (${v.pageU}%).`,
  brief: `- **${label}** (committed unscored at 06:50, scored once at the freeze): large-v3 **${v.lv3A}%** fully correct (tuning voices ${v.lv3T}%, unseen speakers ${v.lv3U}%); in-page models **${v.pageA}%** (${v.pageT}% / ${v.pageU}%); reference text ${v.ref}%.`,
};
const targets = [['README.md', text.readme], [path.join('deck', 'DECK.md'), text.deck], [path.join('harness', 'JOURNAL.md'), text.brief]];
const re = /<!-- blind3 -->[\s\S]*?<!-- \/blind3 -->/;
for (const [rel, body] of targets) {
  const file = path.join(ROOT, rel);
  const s = fs.readFileSync(file, 'utf8');
  if (!re.test(s)) throw new Error(`no <!-- blind3 --> marker in ${rel}`);
  const next = s.replace(re, `<!-- blind3 -->\n${body}\n<!-- /blind3 -->`);
  if (dry) console.log(`--- ${rel} would get:\n${body}\n`);
  else fs.writeFileSync(file, next);
}
// The README and deck say "about 6 to 7 in 10": flag it if this set says otherwise, for a person to reword.
const lo = Math.min(v.lv3A, v.pageA);
const hi = Math.max(v.lv3A, v.pageA);
if (lo < 55 || hi > 75) console.log(`WARNING: ${label} (${lo}-${hi}%) does not match "about 6 to 7 in 10" in README / deck: reword the headline by hand.`);
console.log(JSON.stringify({ set, tag, dry, cases, ...v, runs: n }));
