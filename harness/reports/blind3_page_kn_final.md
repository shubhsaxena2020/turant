# Turant pipeline eval: blind3_page_kn_final

Generated 2026-11-28T06:52:19.671Z. Extractor: `..\prototype\src\lib\extract.ts`. 42 cases, 24 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 42 | 95.2 | 95.2 | 98.7 | 97.4 | 98.1 | - | - |
| ASR clean, normal rate | 12 | 91.7 | 91.7 | 100.0 | 95.5 | 97.7 | 15.6 | 2.1 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 24 | 87.5 | 87.5 | 100.0 | 93.2 | 96.5 | 18.2 | 3.2 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 91.7% of clean runs and 87.5% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn 92%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 25 | 96.0 | 96.0 | 96.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| time | 19 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| scamType | 10 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 40.0 |
| bank | 15 | 100.0 | 93.3 | 96.6 | 100.0 | 100.0 | 100.0 | 100.0 |
| paymentApp | 6 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| utr | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 0 | - | - | - | - | - | - | - |
| suspectPhone | 2 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 78 | 98.7 | 97.4 | 98.1 | 100.0 | 95.5 | 97.7 | 96.5 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 83.3 | - | - | 95.2 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 83.3 | - | - | 90.9 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | 91.7 | - | 100.0 | 97.7 | 15.6 | 2.1 | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  | 100.0 / - |  |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  | 100.0 / - |  |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 80.0 / - | 100.0 / - |  |  |  |  |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| te | 66.7 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |  |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| kn | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 66.7 | 100.0 / 100.0 | 100.0 / 100.0 |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 24 | 87.5 | 96.5 | 18.2 | 3.2 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 24 | 87.5 | 96.5 | 18.2 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| kn-IN-GaganNeural | 6 | 100.0 | 100.0 | 18.8 | 2.3 |
| kn-IN-SapnaNeural | 6 | 83.3 | 95.2 | 12.5 | 1.9 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 24 | 87.5 | 96.5 | 18.2 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 4 | 100.0 | 75.0 | 96.3 |
| answer | 6 | 90.5 | 100.0 | 100.0 |
| correction | 2 | 100.0 | 100.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 3 | 3 (100%) | 0 (0%) | 0 (0%) | 0 |
| clean | 3 | 3 (100%) | 0 (0%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| scamType | 3 | 3 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| kn | 3 | 3 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | kn | asr | fn | 3 | kn-d01 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. kn-d01 (story) - fails 75% of 4 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ ಆರು ಗಂಟೆಗೆ ಯಾರೋ ಕೆವೈಸಿ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ ಇಲ್ಲದಿದ್ದರೆ ಖಾತೆ ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ ಅಂದರು, ನನ್ನ ಕೆನರಾ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದ ಒಂಬತ್ತು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-d01__Sapna__r0__kn`): ನಿನ್ನೆ ಸಂಜೆ ಆರು ಗಂಟೆಗೆ ಯಾರೋ ಕೆವಯಿಸಿ ಅಪ್ಡೇಟ್ ಮಾಡಿ ಇಲ್ಲದಿದ್ದರೆ ಖಾತೆ ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ ಎಂದರು ನನ್ನ ಕೆನರಾ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದ ಒಂಬತ್ತು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: ಕೆವೈಸಿ |
