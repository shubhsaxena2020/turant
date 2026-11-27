# Turant pipeline eval: robust_audio_te

Generated 2026-11-27T22:25:49.647Z. Extractor: `..\prototype\src\lib\extract.ts`. 40 cases, 16 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 40 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 8 | 75.0 | 75.0 | 75.0 | 75.0 | 75.0 | 13.0 | 13.8 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 16 | 75.0 | 75.0 | 75.0 | 75.0 | 75.0 | 13.0 | 13.8 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 75.0% of clean runs and 75.0% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te 75%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 40 | 100.0 | 100.0 | 100.0 | 75.0 | 75.0 | 75.0 | 75.0 |
| time | 2 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| scamType | 0 | - | - | - | - | - | - | - |
| bank | 4 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| paymentApp | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| utr | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 0 | - | - | - | - | - | - | - |
| suspectPhone | 0 | - | - | - | - | - | - | - |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 48 | 100.0 | 100.0 | 100.0 | 75.0 | 75.0 | 75.0 | 75.0 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | 75.0 | - | 100.0 | 75.0 | 13.0 | 13.8 | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - |  | 100.0 / - |  | 100.0 / - |  |  |  |
| en | 100.0 / - | 100.0 / - |  | 100.0 / - | 100.0 / - |  |  |  |  |
| bn | 100.0 / - |  |  |  |  |  |  |  |  |
| ta | 100.0 / - |  |  |  |  |  |  |  |  |
| te | 100.0 / 75.0 |  |  |  |  |  |  |  |  |
| mr | 100.0 / - |  |  |  |  |  |  |  |  |
| kn | 100.0 / - |  |  |  |  |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 16 | 75.0 | 75.0 | 13.0 | 13.8 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 16 | 75.0 | 75.0 | 13.0 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| te-IN-MohanNeural | 4 | 75.0 | 75.0 | 13.0 | 13.8 |
| te-IN-ShrutiNeural | 4 | 75.0 | 75.0 | 13.0 | 13.8 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 16 | 75.0 | 75.0 | 13.0 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 8 | 100.0 | 75.0 | 75.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 4 | 4 (100%) | 0 (0%) | 0 (0%) | 0 |
| clean | 4 | 4 (100%) | 0 (0%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 4 | 4 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| te | 4 | 4 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | te | asr | wrong | 4 | rb-29 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. rb-29 (story) - fails 100% of 4 runs

- Reference: నా account నుండి 5 thousand రూపాయలు పోయాయి
- Transcript (`rb-29__Mohan__r0__te`): నా అకౌంట్‌ నుండి ఐదు థౌజండ్‌ రూపాయలు పోయాయి

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 5 | 5000 | **asr**: value not in the transcript |
