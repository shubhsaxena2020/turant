# Turant pipeline eval: blindref

Generated 2026-11-23T20:52:54.042Z. Extractor: `..\prototype\src\lib\extract.ts`. 84 cases, 0 ASR transcripts scored, **432 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 84 | 90.5 | 90.5 | 97.4 | 94.3 | 95.8 | - | - |
| ASR clean, normal rate | 0 | - | - | - | - | - | - | - |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 0 | - | - | - | - | - | - | - |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): -% of clean runs and -% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 48 | 97.9 | 95.8 | 96.8 | - | - | - | - |
| time | 25 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| scamType | 34 | 93.8 | 88.2 | 90.9 | - | - | - | - |
| bank | 17 | 100.0 | 94.1 | 97.0 | - | - | - | - |
| paymentApp | 15 | 92.9 | 86.7 | 89.7 | - | - | - | - |
| utr | 7 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 6 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectPhone | 7 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 159 | 97.4 | 94.3 | 95.8 | - | - | - | - |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 91.7 | - | - | 95.7 | - | - | - | - (n=0) |
| en | 83.3 | - | - | 94.1 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 91.7 | - | - | 95.2 | - | - | - | - (n=0) |
| te | 83.3 | - | - | 93.0 | - | - | - | - (n=0) |
| mr | 83.3 | - | - | 93.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 75.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  | 100.0 / - |  |
| en | 100.0 / - | 100.0 / - | 88.9 / - | 100.0 / - | 66.7 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |
| ta | 100.0 / - | 100.0 / - | 88.9 / - | 100.0 / - | 66.7 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |
| te | 76.9 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |
| mr | 100.0 / - | 100.0 / - | 80.0 / - | 66.7 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 0 | 0 (-%) | 0 (-%) | 0 (-%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).
