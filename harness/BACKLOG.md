# Harness backlog (worked top-down; re-read after each item)

Started 28 Nov 2026, ~02:15 IST. Target metric: **unseen-voice and blind numbers**, never the tuned voice alone.
A rule change is kept only if it helps (or does not hurt) the unseen voices; tuned-voice-only gains are rejected.

Rules for this run: laptop CPU <= 75% (pin cores, BelowNormal); laptop 2 allowed (<= 3 threads, < 3 GB RAM,
only in C:\Users\admin\work\build-for-bharat, temp <= 85 C, own PIDs only); no Kaggle (needs Shubh's OK);
no form submit, no YouTube upload, no upload to Shubh's HF account, no spending. Deploy only with no regression.

## Status

| # | Item | State |
|---|---|---|
| 1 | Unseen-speaker set + per-voice report (tuned / held-out / unseen) for every language | in progress |
| 2 | Per-language error analysis on the worst fields; keep only fixes that hold on unseen voices | todo |
| 3 | Tamil model under 100 MB per file (so Turant can serve it), accuracy vs whisper-base | **done**: split into external-data chunks, identical output, live |
| 4 | Bengali model smaller / faster, accuracy vs load time | todo |
| 5 | Robustness cases: code-mixing, English digits inside Indic speech, lakh/crore/hazaar, "nahi nahi, 500" | todo |
| 6 | README / JOURNAL / deck numbers in sync, every claim with a tuned vs unseen vs blind split | todo |

## 1. Unseen speakers

- edge-tts has only 2 Indian voices per language (3 for English), all already in the dev / held-out split.
- Probe (`voiceprobe.py`, turbo transcripts of one sentence per language): the Azure **multilingual** voices
  fr-FR-Remy, it-IT-Giuseppe (male) and fr-FR-Vivienne, pt-BR-Thalita (female) read all 7 languages intelligibly
  (foreign-accented: a harder, genuinely new speaker). en-US-Ava fails on Kannada; Andrew and the ur-IN voices fail.
- Plan: tier `unseen`, every case read by one male + one female unseen voice (alternating pairs): 560 clips.
  ASR on them: large-v3 (GPU), turbo (GPU server), the in-page models (CPU; laptop 2 if set up).
  Then noise (15 / 5 dB) on the unseen clips, and speed perturbation (+/-15% via the existing rate tier).

## Milestones (notes for Shubh)

- 28 Nov ~02:40: Tamil in-page model live (6.3% -> 47.5%), served by Turant itself via chunked weights; no HF upload needed.
