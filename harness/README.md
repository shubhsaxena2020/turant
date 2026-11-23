# Turant end-to-end eval harness

Measures the real pipeline (speech -> ASR -> extraction) for the prototype in `../prototype`,
across 7 languages, 15 Indian neural voices, 3 speaking rates and 3 noise types at 3 SNRs.
It never edits `../prototype`: it imports `prototype/src/lib/extract.ts` directly, so every run
scores the extractor as it is on disk.

## Re-run after changing extract.ts

```powershell
cd C:\Users\shubh\Projects\build-for-bharat\harness
.\run.ps1 -Name round1          # or: node run_eval.mjs --name round1
```

This takes a few seconds. Audio and transcripts are cached, so it only re-runs extraction and scoring.
It writes `reports/round1.md` and `reports/round1.json`, with deltas against `reports/baseline.json`.
Optional hand-written commentary in `reports/<name>.notes.md` is embedded in the report.

Use `.\run.ps1 -Name x -Fresh` after adding or changing corpus cases. That rebuilds `cases.jsonl` and `plan.json`
and renders/transcribes only the clips that are missing.

## Pieces

| File | What it does |
|---|---|
| `corpus/parts/<lang>.jsonl` | Hand-written cases, 40 per language (edit these). |
| `corpus/build.mjs` | Validates and merges the parts into `corpus/cases.jsonl`. |
| `common.py` | Voices, rates, noises and the deterministic plan, written to `plan.json`. |
| `tts.py` | Renders clean clips with `edge_tts` (at most 2 requests at once) into `audio/clean/*.wav` (16 kHz mono). Also renders the babble sources. |
| `noise.py` | Mixes pink, babble or traffic noise at 15 dB and 5 dB SNR (numpy only) into `audio/noisy/`. |
| `asr.py` | Sends one request at a time to the local Whisper server (`127.0.0.1:8790`) and caches each result in `transcripts/<audio>__<lang\|auto>.json`. It starts the server if `/health` fails twice. `python asr.py --stop` stops only a server it started (PID in `asr_server.pid`). |
| `asr_alt.py` | Second ASR: Whisper large-v3 (OpenVINO int8, in-process on the GPU; model in `models/`, git-ignored, download with `huggingface_hub.snapshot_download('OpenVINO/whisper-large-v3-int8-ov')`). Writes `transcripts_<name>/`. `--tiers all`; `HARNESS_PLAN=plan_kit.json` for the kit apps. Score with `run_eval.mjs --transcripts transcripts_lv3` or `kit_apps_eval.mjs --asr plan_kit.json --transcripts transcripts_lv3`. Run it with the clipping venv's Python (it has openvino_genai). |
| `lib.mjs` | Canonical bank and app names, time tolerance, WER/CER, and the value-in-transcript oracles. |
| `run_eval.mjs` | Scores the reference text and every transcript, attributes each error, and writes the report. |

## Case format

```json
{"id":"hi-05","lang":"hi","kind":"story","text":"...","hint":"amount",
 "expected":{"amount":6000,"time":{"ago":10},"bank":"pnb","suspectUpi":"rahul.kyc@ybl"},
 "ambiguous":["time"],"tags":["selfcorr","numwords"],"tts":"optional text to speak instead of text"}
```

- `kind`: `story` (uses `extractFields`), `answer:<question>` (uses `interpret()` from answer.ts: a skip intent first, then `extractFields` with the hint), or `correction` (uses `parseCorrection`, which must return exactly the one expected field).
- `time`: `{"ago": minutes}` or `{"day": -1, "at": "19:00"}`, relative to the fixed clock Sat 21 Nov 2026 12:00 local. Default tolerance is ±20 min; set `"tol"` in minutes to override it for vague phrases.
- `bank` and `paymentApp` use short ids (`sbi`, `hdfc`, `gpay`, ...), mapped to the extractor's canonical names in `lib.mjs`.
- `intent: "skip"` marks answers like "pata nahi" that must be detected as a skip.
- `ambiguous` lists expectations that follow a convention rather than a single right answer. The report scores them both ways ("Unambiguous-only %").
- `text` is what an ideal recogniser would output (native script with English loanwords in Latin, the way Chrome and Whisper write them). It is also the WER reference.

## Scoring

- Field outcome: `tp`, `wrong` (counts as both FP and FN), `fn` (missed) or `fp` (spurious). P/R/F1 are micro-averaged.
- Amounts must match exactly. Time is within the tolerance. UTR, phone and account match on digits only. Bank and app match on canonical name. UPI is compared case-insensitively.
- "Case fully correct": every expected field is right and nothing is spurious.
- Each error on a transcript is put in one bucket:
  - `extractor`: it also fails on the reference text.
  - `extractor_form`: the transcript still carries the value (digits, UPI letters, or every reference token the extractor needs, found by leave-one-out ablation), but extract.ts can't parse that form.
  - `asr`: the words carrying the value were lost or changed.

## Plan (1510 ASR requests)

- base: every case with every voice of its language, normal rate, clean (600).
- noise: one voice per case, with one of pink, babble or traffic at 15 dB and 5 dB (560).
- rate: one voice per case at -15% or +15% (280).
- auto: every 4th case transcribed with language auto-detect instead of the forced token (70).

## Added 23 Nov 2026

| File | What it does |
|---|---|
| `JOURNAL.md` | Round-by-round results, honesty checks, rules vs LLM, and what is left. Start here. |
| `split.mjs` | `node split.mjs round8 round9`: dev voice vs held-out voice per report. Tune only on what the dev voice shows. |
| `calib.mjs` | Precision of returned values by confidence band (is low confidence really less right?). |
| `llm_fill.mjs` + `run_eval.mjs --llm <slug> --policy <p>` | Rules vs LLM vs hybrids on the same transcripts and scorer. Policies: `rules`, `llm`, `fill`, `fillcat`, `fillcheck`, or a field list such as `bank,amount:check`. |
| `run_eval.mjs --extractor kit` | Run under `tsx`. Scores the Round 2 voice kit's fraud app instead of Turant. |
| `kit_apps_eval.mjs` | Run under `tsx`. Scores ANY kit app by slot type on `corpus/kit/<app>.jsonl` (or `--corpus kit-heldout`), or on Whisper transcripts with `--asr plan_kit.json [--set kit|kit-heldout]`. |
| `corpus/kit/`, `corpus/kit-heldout/` | Text cases for khata / health / civic. `build.py` writes them. The held-out set is not for tuning. |

Running the audio pipeline on another corpus (caches are shared, keyed by case id):

```powershell
$env:HARNESS_CASES='corpus/kit/_all.jsonl'; $env:HARNESS_PLAN='plan_kit.json'; $env:HARNESS_TIERS='base'
python common.py; python tts.py; python asr.py      # not python -I: edge_tts is in the user site-packages
..\round2-kit\indic-numbers\node_modules\.bin\tsx kit_apps_eval.mjs --asr plan_kit.json
```
