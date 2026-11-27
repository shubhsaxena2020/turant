#!/usr/bin/env bash
# Blind set 2 (corpus/blind2.jsonl, written after round 51): aggregate scores only, never per case.
#   bash blind2_report.sh <tag>
# Prints fully correct reports per language and overall, for the tuning voices and the unseen voices,
# on server large-v3 and on the in-page model the app uses for each language.
set -u
cd "$(dirname "$0")"
T=$1
node run_eval.mjs --cases corpus/blind2.jsonl --plan plan_blind2.json --name blind2_ref_$T --compare none >/dev/null 2>&1
node run_eval.mjs --cases corpus/blind2.jsonl --plan plan_blind2.json --transcripts transcripts_lv3 --name blind2_lv3_$T --compare none >/dev/null 2>&1
for spec in hienmr:swift te:tebase kn:knbase ta:tasmall bn:bnsmall; do
  g=${spec%%:*}
  node run_eval.mjs --cases corpus/blind2.jsonl --plan plan_blind2_$g.json --transcripts transcripts_${spec#*:} --name blind2_page_${g}_$T --compare none >/dev/null 2>&1
done
node -e "
const H = (n) => require('./reports/' + n + '.json');
const ref = H('blind2_ref_$T').summary.headline.reference;
console.log('blind set 2, reference text:', ref.correct.toFixed(1) + '% (' + ref.n + ')');
const agg = (runs) => { const o = {}; for (const r of runs) { const v = /Multilingual/.test(r.voice) ? 'unseen' : 'tuning'; for (const k of [r.lang + ':' + v, 'all:' + v]) { o[k] = o[k] || [0, 0]; o[k][0] += r.correct ? 1 : 0; o[k][1]++; } } return o; };
const show = (name, o) => console.log(name.padEnd(9), ['hi','en','mr','bn','ta','te','kn','all'].map((l) => l + ' ' + ['tuning','unseen'].map((v) => o[l + ':' + v] ? Math.round(100 * o[l + ':' + v][0] / o[l + ':' + v][1]) + '%' : '-').join('/')).join(' | '));
show('large-v3', agg(H('blind2_lv3_$T').runs));
show('in-page', agg(['hienmr','te','kn','ta','bn'].flatMap((g) => H('blind2_page_' + g + '_$T').runs)));
console.log('(tuning = the edge-tts Indian voices; unseen = the 4 multilingual voices never used for tuning)');
"
