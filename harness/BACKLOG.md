# Harness backlog (worked top-down; re-read after each item)

Started 28 Nov 2026, ~02:15 IST. Target metric: **unseen-voice and blind numbers**, never the tuned voice alone.
A rule change is kept only if it helps (or does not hurt) the unseen voices; tuned-voice-only gains are rejected.

Rules for this run: laptop CPU <= 75% (pin cores, BelowNormal); laptop 2 allowed (<= 3 threads, < 3 GB RAM,
only in C:\Users\admin\work\build-for-bharat, temp <= 85 C, own PIDs only); no Kaggle (needs Shubh's OK);
no form submit, no YouTube upload, no upload to Shubh's HF account, no spending. Deploy only with no regression.

## Status

| # | Item | State |
|---|---|---|
| 1 | Unseen-speaker set + per-voice report (tuned / held-out / unseen) for every language | **done** (large-v3 + all in-page models; turbo running) |
| 2 | Per-language error analysis on the worst fields; keep only fixes that hold on unseen voices | **done** as rounds 47-52 (see item 8) |
| 3 | Tamil model under 100 MB per file (so Turant can serve it), accuracy vs whisper-base | **done**: split into external-data chunks, identical output, live |
| 4 | Bengali model smaller / faster, accuracy vs load time | **done, rejected**: 4-bit (MatMulNBits) 287 -> 205 MB but 3x slower on CPU and less accurate (16.0 vs 20.0% on 25 clips, WER 43.5 vs 36.9); no licensed whisper-base Bengali fine-tune exists; stays 8-bit |
| 5 | Robustness cases: code-mixing, English digits inside Indic speech, lakh/crore/hazaar, "nahi nahi, 500" | **done**: text 97.5% -> 100%; audio (167 clips, tuning + unseen voices) through every in-page model; round 49 fixes (karod!) +4 on unseen Hindi |
| 7 | Turbo on the unseen set; add to the generalisation table | **done**: unseen 47.1% (tuned 52.4%) |
| 8 | Next error-analysis pass (all languages, unseen analysis half, check half must move) | rounds 47-52 done (one rule reverted on check-half evidence); remaining failures are almost all recogniser losses |
| 10 | Voice-kit parity: speaking-language option + Marathi normaliser | **done** |
| 11 | English unseen split (English vs romanised-Hindi cases) | **done**: 58.1% / 87.1% on English sentences |
| 9 | Second blind set (42 cases, written after round 51), aggregate only | **done**: text 97.6%; large-v3 68% / 73% unseen; in-page 67% / 67% |
| 12 | English tuning set (corpus/en_tune.jsonl, 30 cases, 300 clips) + Indian-English number / clock phrasing | **done** (rounds 53-56): blind-2 in-page English 33% -> 56% |
| 13 | Blind set 2 frozen (scored 3x: rounds 52, 54, 56). **Blind set 3**: write + commit before scoring, score ONCE at the very end; it is the submission headline with the unseen-speaker number | todo (last) |
| 14 | Extractor-fixable share (`extractor_form`) per language on the unseen ANALYSIS half (bn/te/kn/ta in-page); fix only shapes that also appear on the check half | **done**: 3 of 72 analysis-half errors fixable (rest = recogniser); round 58 |
| 15 | Live-site QA: mobile Lighthouse (perf / a11y / best practices), console errors, each screen at 360 px in all 7 UI languages; fix what is found | **done**: 96/100/100/100; mic bar overflow at text size 1.25 fixed |
| 16 | First-visit cost: model download size per language shown before download; offline reload after first load | size per language **done**; offline check after deploy |
| 17 | Recogniser lever for Kannada (unseen 53.8%, 19 of 19 analysis-half errors are ASR): vasista22/whisper-kannada-small (Apache-2.0) vs the base model on tuned + unseen clips; adopt only if unseen moves enough to justify ~290 MB vs ~100 MB | todo |
| 6 | README / JOURNAL / deck numbers in sync, every claim with a tuned vs unseen vs blind split | **done** for unseen (re-sync after each round) |

## 1. Unseen speakers

- edge-tts has only 2 Indian voices per language (3 for English), all already in the dev / held-out split.
- Probe (`voiceprobe.py`, turbo transcripts of one sentence per language): the Azure **multilingual** voices
  fr-FR-Remy, it-IT-Giuseppe (male) and fr-FR-Vivienne, pt-BR-Thalita (female) read all 7 languages intelligibly
  (foreign-accented: a harder, genuinely new speaker). en-US-Ava fails on Kannada; Andrew and the ur-IN voices fail.
- Plan: tier `unseen`, every case read by one male + one female unseen voice (alternating pairs): 560 clips.
  ASR on them: large-v3 (GPU), turbo (GPU server), the in-page models (CPU; laptop 2 if set up).
  Then noise (15 / 5 dB) on the unseen clips, and speed perturbation (+/-15% via the existing rate tier).

- **First unseen-voice result (in-page Hinglish model, `unseen_report.mjs swift45 unseen_swift46`):**

  | lang | tuned | held-out | unseen | unseen 15 dB | unseen 5 dB |
  |---|---|---|---|---|---|
  | hi | 87.5% | 92.5% | 81.3% | 75.0% | 52.5% |
  | en | 75.0% | 75.0% | 47.5% | 52.5% | 42.5% |
  | mr | 67.5% | 40.0% | 40.0% | 37.5% | 20.0% |
  | all | 76.7% | 70.6% | **56.3%** | 55.0% | 38.3% |

  Hindi generalises; Marathi's tuned-voice number is inflated (unseen = held-out = 40%); English drops on these
  foreign-accented voices, mostly recogniser losses, and partly because several English cases are romanised Hindi
  read with a European accent (not a realistic Indian speaker). Error analysis reads only the Remy / Vivienne half
  of the unseen set; the Giuseppe / Thalita half is the check. Paytm mishearings ("paidum") added: +3 on the
  analysis half, 0 on the check half (that sentence fell only in the analysis half), so not counted as a gain.

- **Round 47 (Marathi, unseen analysis half only):** donon / did laakh, saahazaar, vaaj tak / vaajhata / baajta,
  daavaajta, sandhya ke, sakai, glued "divsaampur bhi". Unseen Marathi 40.0% -> 42.5% (+1 analysis, **+1 check**),
  all report sets unchanged run for run: kept.

## Milestones (notes for Shubh)

- 28 Nov ~05:30: unseen-speaker eval done for every path (large-v3 unseen 61.6% = blind 62.8%); "karod" (crore) bug found via robustness audio and fixed.

- 28 Nov ~02:40: Tamil in-page model live (6.3% -> 47.5%), served by Turant itself via chunked weights; no HF upload needed.
