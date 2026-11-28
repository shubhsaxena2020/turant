# Turant pipeline eval: blind2_page_te_56

Generated 2026-11-28T00:38:35.619Z. Extractor: `..\prototype\src\lib\extract.ts`. 42 cases, 24 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 42 | 97.6 | 97.6 | 98.6 | 98.6 | 98.6 | - | - |
| ASR clean, normal rate | 12 | 91.7 | 91.7 | 100.0 | 95.0 | 97.4 | 3.8 | 0.5 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 24 | 91.7 | 91.7 | 100.0 | 95.0 | 97.4 | 3.2 | 0.6 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 91.7% of clean runs and 95.8% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te 92%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 27 | 96.3 | 96.3 | 96.3 | 100.0 | 100.0 | 100.0 | 100.0 |
| time | 15 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| scamType | 8 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| bank | 13 | 100.0 | 100.0 | 100.0 | 100.0 | 75.0 | 85.7 | 85.7 |
| paymentApp | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| utr | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectPhone | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 73 | 98.6 | 98.6 | 98.6 | 100.0 | 95.0 | 97.4 | 97.4 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 83.3 | - | - | 90.9 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | 91.7 | - | 100.0 | 97.4 | 3.8 | 0.5 | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  | 100.0 / - |  |
| en | 75.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| te | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 85.7 | 100.0 / 100.0 |  |  |  |  |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 24 | 91.7 | 97.4 | 3.2 | 0.6 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 24 | 91.7 | 97.4 | 3.2 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| te-IN-MohanNeural | 6 | 100.0 | 100.0 | 0.0 | 0.0 |
| te-IN-ShrutiNeural | 6 | 83.3 | 94.7 | 7.7 | 0.9 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 24 | 91.7 | 97.4 | 3.2 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 4 | 100.0 | 75.0 | 95.7 |
| answer | 6 | 100.0 | 100.0 | 100.0 |
| correction | 2 | 85.7 | 100.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 2 | 1 (50%) | 1 (50%) | 0 (0%) | 0 |
| clean | 2 | 1 (50%) | 1 (50%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bank | 2 | 1 | 1 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| te | 2 | 1 | 1 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | bank | te | asr | fn | 1 | te-c01 |
| 2 | bank | te | extractor_form | fn | 1 | te-c01 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. te-c01 (story) - fails 50% of 4 runs

- Reference: ఒకతను బ్యాంకు నుండి అని చెప్పి ఓటీపీ అడిగాడు, నేను చెప్పాను, నా ఐసీఐసీఐ ఖాతా నుండి పది వేల రూపాయలు పోయాయి
- Transcript (`te-c01__Shruti__r0__te`): ఒకతను బ్యాంకు నుండి అని చెప్పి ఓటీపీ అడిగాడు నేను చెప్పాను నా ఐసీఎస్ఐ ఖాతా నుండి పదివేల రూపాయలు పోయాయి

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ఐసీఐసీఐ |
