#!/usr/bin/env bash
# Regression check for an extractor change: re-score every transcript set and diff run by run against a baseline.
#   bash eval_all.sh <new-tag> <baseline-tag>
# Writes reports/{round,lv3r,swift,kitlv3r,blind_lv3_r,blind_swift,blind_turbo_r}<tag>.json and prints, per set:
# clean / 15 dB / 5 dB fully correct, and how many runs became wrong or right (wrong ones listed, except blind sets,
# which are never read case by case).
set -u
cd "$(dirname "$0")"
NEW=$1
OLD=$2
TSX=../round2-kit/indic-numbers/node_modules/.bin/tsx
node run_eval.mjs --name round$NEW --compare none >/dev/null 2>&1
node run_eval.mjs --name lv3r$NEW --transcripts transcripts_lv3 --compare none >/dev/null 2>&1
node run_eval.mjs --name swift$NEW --transcripts transcripts_swift --compare none >/dev/null 2>&1
$TSX run_eval.mjs --name kitlv3r$NEW --extractor kit --transcripts transcripts_lv3 --compare none >/dev/null 2>&1
node run_eval.mjs --name blind_lv3_r$NEW --cases corpus/blind.jsonl --plan plan_blind.json --transcripts transcripts_lv3 --compare none >/dev/null 2>&1
node run_eval.mjs --name blind_swift$NEW --cases corpus/blind.jsonl --plan plan_blind_hienmr.json --transcripts transcripts_swift --compare none >/dev/null 2>&1
node run_eval.mjs --name blind_turbo_r$NEW --cases corpus/blind.jsonl --plan plan_blind.json --compare none >/dev/null 2>&1
node run_eval.mjs --name robust_r$NEW --cases corpus/robust.jsonl --plan plan_robust.json --compare none >/dev/null 2>&1
node -e "
const H = (n) => require('./reports/' + n + '.json');
const f = (x) => (x == null ? '  -  ' : x.toFixed(1).padStart(5));
for (const s of ['round', 'lv3r', 'swift', 'kitlv3r', 'blind_lv3_r', 'blind_swift', 'blind_turbo_r', 'robust_r']) {
  const a = s + '$OLD', b = s + '$NEW';
  let A, B;
  try { A = H(a); B = H(b); } catch { console.log(b.padEnd(18), 'missing'); continue; }
  const prev = new Map(A.runs.map((r) => [r.tid, r.correct]));
  const wrong = [], right = [];
  for (const r of B.runs) { const p = prev.get(r.tid); if (p && !r.correct) wrong.push(r.tid); if (p === false && r.correct) right.push(r.tid); }
  const ha = A.summary.headline, hb = B.summary.headline;
  const k = (h, t) => h[t]?.correct;
  console.log(b.padEnd(18), 'ref', f(k(ha,'reference')) + '->' + f(k(hb,'reference')), '| clean', f(k(ha,'asr_clean')) + '->' + f(k(hb,'asr_clean')),
    '| 15dB', f(k(ha,'asr_noise15')) + '->' + f(k(hb,'asr_noise15')), '| 5dB', f(k(ha,'asr_noise5')) + '->' + f(k(hb,'asr_noise5')),
    '| -' + wrong.length, '+' + right.length, s.startsWith('blind') ? '' : wrong.slice(0, 10).join(' '));
}"
