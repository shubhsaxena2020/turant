# Turant pipeline eval: kn_base52

Generated 2026-11-27T23:38:35.869Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 80 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 80 | 50.0 | 50.0 | 95.8 | 71.9 | 82.1 | 48.1 | 42.6 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 80 | 50.0 | 50.0 | 95.8 | 71.9 | 82.1 | 48.1 | 42.6 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 51.3% of clean runs and 51.3% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn 51%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 97.7 | 89.6 | 93.5 | 93.5 |
| time | 113 | 100.0 | 100.0 | 100.0 | 93.8 | 93.8 | 93.8 | 93.8 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 59.1 | 74.3 | 74.3 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 94.7 | 64.3 | 76.6 | 76.6 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 75.0 | 85.7 | 85.7 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 37.5 | 54.5 | 54.5 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 95.8 | 71.9 | 82.1 | 82.1 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | 50.0 | - | 100.0 | 82.1 | 48.1 | 42.6 | 18.8 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / 93.5 | 100.0 / 93.8 | 100.0 / 74.3 | 100.0 / 76.6 | 100.0 / 85.7 | 100.0 / - | 100.0 / - | 100.0 / 54.5 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 80 | 50.0 | 82.1 | 48.1 | 42.6 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 50.0 | 82.1 | 48.1 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| kn-IN-GaganNeural | 40 | 50.0 | 82.0 | 48.7 | 43.8 |
| kn-IN-SapnaNeural | 40 | 50.0 | 82.3 | 47.6 | 41.4 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 50.0 | 82.1 | 48.1 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 44 | 100.0 | 38.6 | 82.9 |
| answer | 26 | 100.0 | 61.5 | 78.3 |
| answer (skip intent) | 2 | 100.0 | 100.0 | 100.0 |
| correction | 8 | 100.0 | 62.5 | 76.9 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 45 | 44 (98%) | 1 (2%) | 0 (0%) | 0 |
| clean | 45 | 44 (98%) | 1 (2%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bank | 10 | 10 | 0 | 0 |
| scamType | 9 | 8 | 1 | 0 |
| utr | 6 | 6 | 0 | 0 |
| amount | 5 | 5 | 0 | 0 |
| suspectPhone | 5 | 5 | 0 | 0 |
| suspectUpi | 4 | 4 | 0 | 0 |
| paymentApp | 2 | 2 | 0 | 0 |
| suspectAccount | 2 | 2 | 0 | 0 |
| time | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| kn | 45 | 44 | 1 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | bank | kn | asr | fn | 9 | kn-01 kn-03 kn-16 kn-18 kn-38 |
| 2 | scamType | kn | asr | fn | 8 | kn-03 kn-05 kn-09 kn-16 kn-35 |
| 3 | utr | kn | asr | fn | 6 | kn-14 kn-31 kn-32 |
| 4 | suspectPhone | kn | asr | fn | 5 | kn-22 kn-33 kn-39 |
| 5 | amount | kn | asr | fn | 4 | kn-04 kn-13 kn-14 |
| 6 | suspectUpi | kn | asr | fn | 4 | kn-10 kn-34 |
| 7 | paymentApp | kn | asr | fn | 2 | kn-04 kn-20 |
| 8 | time | kn | asr | wrong | 2 | kn-20 |
| 9 | scamType | kn | extractor_form | fn | 1 | kn-08 |
| 10 | amount | kn | asr | wrong | 1 | kn-14 |
| 11 | bank | kn | asr | wrong | 1 | kn-16 |
| 12 | suspectAccount | kn | asr | fn | 1 | kn-19 |
| 13 | suspectAccount | kn | asr | wrong | 1 | kn-19 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. kn-14 (story) - fails 100% of 2 runs

- Reference: UPI ರೆಫರೆನ್ಸ್ ನಂಬರ್ 4 0 3 2 1 8 7 6 5 4 3 2, ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-14__Gagan__r0__kn`): ಯುಪಾಯಿ ರೆಫರೆನ್ಸ್ ನಂಬರ್ ನಾಲ್ಕು ಸೊನ್ನೆ ಮೂರು ಎರಡು ಎಂಟು ಎಪ್ಪತ್ತು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತೆಂಟು ಎಪ್ಪತ್ತಾಹಿಕಾರಿಗಳಿಗೆ ಎಪ್ಪತ್ತಾಹಿಕ ಎಪ್ಪತ್�

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 2. kn-03 (story) - fails 100% of 2 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__Gagan__r0__kn`): ನಿನ್ನೆ ಸಂಜೆ ಏಳು ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ಕ್ಕೆರಿನಿಂದ ಕೆರೆ ಬಂತು ಎನಿಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು ನಂತರ ಹಡಗು ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 3. kn-16 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ನನ್ಯಾಕ್ಯಾಂಡ್ ಇಂದ ಇಪ್ಪತ್ತು ಸಾವಿರ ರೂಪಿಸ್ ಟೇಬೆರ್ ಆಯ್ತು ಯಶೆಸಿ ಬ್ಯಾಂಕ್ ಒಂದು ಗಂಟೆ ಹಿಂದೆ ಕಸ್ಟಮರ್ ಖೇರ್ಗೆ ಕಾಲ್ಮಾಡಿದ್ದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | wrong | ICICI Bank | Yes Bank | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 4. kn-20 (story) - fails 100% of 2 runs

- Reference: ಅಂದರೆ... ನಿನ್ನೆ ಮಧ್ಯಾಹ್ನ 2:30 ಕ್ಕೆ ಫೋನ್‌ಪೇ ಮೂಲಕ ಎರಡು ಸಾವಿರದ ಆರುನೂರು ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-20__Gagan__r0__kn`): ಅಂದರೆ ನಿನ್ನೆ ಮಧ್ಯಾಹ್ನ ಎರಡು ವರೆಕ್ಕೆ ಫೋನ್ ಮೂಲಕ ಎರಡು ಸಾವಿರದ ಆರುನೂರು ರೂಪಾಯಿ ಹೋಯಿತು

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: 2:30 |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: ಫೋನ್‌ಪೇ |

### 5. kn-01 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): ನನ್ನ ಸ್ವೇ ಖಾತೆಯಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ ಹತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು ಕೆಕ್ ಅಪ್ಪೆಟ್ ಮಾಡಲು ಹೇಳಿದರು

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 6. kn-04 (story) - fails 100% of 2 runs

- Reference: ಒಬ್ಬರು ತಪ್ಪಾಗಿ ಹಣ ಕಳುಹಿಸಿದ್ದೇನೆ, ವಾಪಸ್ ಕಳುಹಿಸಿ ಎಂದರು, ನಾನು ಗೂಗಲ್ ಪೇ ಮೂಲಕ ಹನ್ನೆರಡು ಸಾವಿರದ ಐನೂರು ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ, ಎರಡು ಗಂಟೆಗಳ ಹಿಂದೆ
- Transcript (`kn-04__Gagan__r0__kn`): ಒಬ್ಬರು ತಪ್ಪಾಗಿ ಹಣ ಕಳುಹಿಸಿದ್ದೇನೆ ವಾಪಾಸ್ ಕಳುಹಿಸಿ ಎಂದರು ನಾನು ಗೂಗಲ್ಪೆ ಮೂಲಕ ಹನ್ನೆರಡು ಸಾವಿರದ ಐನೂರು ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ ಎರಡು ಗಂಟೆಗಳ ಹಿಂದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: ಪೇ |
