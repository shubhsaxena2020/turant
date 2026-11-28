#!/usr/bin/env bash
# Blind set 3 (corpus/blind3.jsonl, committed 28 Nov 06:50 IST before any scoring): scored ONCE, aggregate only.
#   bash blind3_report.sh --final
# Transcribes the 174 clips (tuning voices + unseen voices) with server large-v3 (asr_alt.py, in-process on the
# laptop GPU; it does not use the clipping project's ASR server) and with the in-page model the app uses for each
# language (asr_wbase.mjs, CPU), then prints fully correct reports per language and overall.
# Guard: refuses without --final, and refuses for good once any blind3 report exists (the set is then spent).
set -u
cd "$(dirname "$0")"
if [ "${1:-}" != "--final" ]; then echo "refusing: blind set 3 is scored once; run with --final at the freeze"; exit 1; fi
if ls reports/blind3_* >/dev/null 2>&1; then echo "refusing: blind set 3 has already been scored (reports/blind3_* exist)"; exit 1; fi

PY_ASR=/c/Users/shubh/Projects/clipping/.venv-asr/Scripts/python.exe
MODELS=../prototype/public/models/turant
export HARNESS_CASES=corpus/blind3.jsonl HARNESS_PLAN=plan_blind3.json HARNESS_TIERS=base,unseen

# per in-page model, the slice of the plan it transcribes
node -e "
const p = require('./plan_blind3.json');
const groups = { hienmr: ['hi','en','mr'], te: ['te'], kn: ['kn'], ta: ['ta'], bn: ['bn'] };
for (const [g, ls] of Object.entries(groups)) {
  const keep = (x) => ls.includes(x.lang);
  const jobs = p.jobs.filter(keep);
  const aud = new Set(jobs.map((j) => j.audio));
  require('fs').writeFileSync('plan_blind3_' + g + '.json', JSON.stringify({ clips: p.clips.filter(keep), audios: p.audios.filter((a) => aud.has(a.audio)), jobs }, null, 1));
}"

echo "[1/3] large-v3 (GPU, in-process)"
"$PY_ASR" asr_alt.py --model models/whisper-large-v3-int8-ov --name lv3 --tiers base,unseen || { echo "large-v3 failed"; exit 1; }

echo "[2/3] in-page models (CPU, 3 threads)"
node asr_wbase.mjs --plan plan_blind3_hienmr.json --tiers base,unseen --threads 3 --model Hirecentive-D3l/Whisper-Hindi2Hinglish-Swift-ONNX --out transcripts_swift || exit 1
node asr_wbase.mjs --plan plan_blind3_bn.json --tiers base,unseen --threads 3 --model shamim1122/whisper-small-bangla-onnx --out transcripts_bnsmall || exit 1
node asr_wbase.mjs --plan plan_blind3_te.json --tiers base,unseen --threads 3 --local $MODELS --model whisper-telugu-base-onnx --out transcripts_tebase || exit 1
node asr_wbase.mjs --plan plan_blind3_kn.json --tiers base,unseen --threads 3 --local $MODELS --model whisper-kannada-base-onnx --out transcripts_knbase || exit 1
node asr_wbase.mjs --plan plan_blind3_ta.json --tiers base,unseen --threads 3 --local $MODELS --model whisper-tamil-small-onnx --out transcripts_tasmall || exit 1

echo "[3/3] scoring (aggregate only)"
T=final
node run_eval.mjs --cases corpus/blind3.jsonl --plan plan_blind3.json --name blind3_ref_$T --compare none >/dev/null 2>&1
node run_eval.mjs --cases corpus/blind3.jsonl --plan plan_blind3.json --transcripts transcripts_lv3 --name blind3_lv3_$T --compare none >/dev/null 2>&1
for spec in hienmr:swift te:tebase kn:knbase ta:tasmall bn:bnsmall; do
  g=${spec%%:*}
  node run_eval.mjs --cases corpus/blind3.jsonl --plan plan_blind3_$g.json --transcripts transcripts_${spec#*:} --name blind3_page_${g}_$T --compare none >/dev/null 2>&1
done
node -e "
const H = (n) => require('./reports/' + n + '.json');
const ref = H('blind3_ref_$T').summary.headline.reference;
console.log('blind set 3, reference text:', ref.correct.toFixed(1) + '% (' + ref.n + ')');
const agg = (runs) => { const o = {}; for (const r of runs) { if (r.transcript == null) continue; const v = /Multilingual/.test(r.voice) ? 'unseen' : 'tuning'; for (const k of [r.lang + ':' + v, 'all:' + v, 'all:all']) { o[k] = o[k] || [0, 0]; o[k][0] += r.correct ? 1 : 0; o[k][1]++; } } return o; };
const pct = (o, k) => (o[k] ? (100 * o[k][0] / o[k][1]).toFixed(1) + '% (' + o[k][1] + ')' : '-');
const show = (name, o) => { console.log(name.padEnd(9), ['hi','en','mr','bn','ta','te','kn'].map((l) => l + ' ' + ['tuning','unseen'].map((v) => o[l + ':' + v] ? Math.round(100 * o[l + ':' + v][0] / o[l + ':' + v][1]) + '%' : '-').join('/')).join(' | '));
  console.log(''.padEnd(9), 'ALL tuning', pct(o, 'all:tuning'), '| ALL unseen', pct(o, 'all:unseen'), '| ALL', pct(o, 'all:all')); };
show('large-v3', agg(H('blind3_lv3_$T').runs));
show('in-page', agg(['hienmr','te','kn','ta','bn'].flatMap((g) => H('blind3_page_' + g + '_$T').runs)));
console.log('(tuning = the edge-tts Indian voices; unseen = the 4 multilingual voices never used for tuning)');
"

echo "[4/4] fill the result into README, deck and morning brief; rebuild the deck; run the tests"
node fill_blind.mjs blind3 $T || { echo "fill failed: fill by hand from the numbers above"; exit 1; }
python ../deck/build_deck.py || echo "deck rebuild failed"
(cd ../prototype && npx vitest run 2>&1 | grep -E "Tests ")
(cd ../round2-kit/indic-numbers && npx vitest run 2>&1 | grep -E "Tests ")
(cd ../round2-kit/voice-kit && npx vitest run 2>&1 | grep -E "Tests ")
echo "done: review the diff (git diff README.md deck/DECK.md harness/JOURNAL.md), then commit and push"
