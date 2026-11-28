# Turant pipeline eval: robust_r61

Generated 2026-11-28T04:08:23.156Z. Extractor: `..\prototype\src\lib\extract.ts`. 40 cases, 0 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 40 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
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
| amount | 40 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| time | 2 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| scamType | 0 | - | - | - | - | - | - | - |
| bank | 4 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| paymentApp | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| utr | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 0 | - | - | - | - | - | - | - |
| suspectPhone | 0 | - | - | - | - | - | - | - |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 48 | 100.0 | 100.0 | 100.0 | - | - | - | - |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - |  | 100.0 / - |  | 100.0 / - |  |  |  |
| en | 100.0 / - | 100.0 / - |  | 100.0 / - | 100.0 / - |  |  |  |  |
| bn | 100.0 / - |  |  |  |  |  |  |  |  |
| ta | 100.0 / - |  |  |  |  |  |  |  |  |
| te | 100.0 / - |  |  |  |  |  |  |  |  |
| mr | 100.0 / - |  |  |  |  |  |  |  |  |
| kn | 100.0 / - |  |  |  |  |  |  |  |  |

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
