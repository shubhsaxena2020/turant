# Turant pipeline eval: kncmp_knsmall58

Generated 2026-11-28T01:30:25.620Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 80 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 80 | 41.3 | 41.3 | 90.6 | 60.0 | 72.2 | 46.3 | 37.5 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 80 | 41.3 | 41.3 | 90.6 | 60.0 | 72.2 | 46.3 | 37.5 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 42.5% of clean runs and 42.5% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn 43%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 85.0 | 70.8 | 77.3 | 77.3 |
| time | 113 | 100.0 | 100.0 | 100.0 | 93.5 | 90.6 | 92.1 | 92.1 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 100.0 | 46.4 | 63.4 | 63.4 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 25.0 | 40.0 | 40.0 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 100.0 | 16.7 | 28.6 | 28.6 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 90.6 | 60.0 | 72.2 | 72.2 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | 41.3 | - | 100.0 | 72.2 | 46.3 | 37.5 | 31.3 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / 77.3 | 100.0 / 92.1 | 100.0 / 66.7 | 100.0 / 63.4 | 100.0 / 40.0 | 100.0 / 28.6 | 100.0 / - | 100.0 / 66.7 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 80 | 41.3 | 72.2 | 46.3 | 37.5 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 41.3 | 72.2 | 46.3 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| kn-IN-GaganNeural | 40 | 45.0 | 71.2 | 46.6 | 38.2 |
| kn-IN-SapnaNeural | 40 | 37.5 | 73.1 | 45.9 | 36.8 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 41.3 | 72.2 | 46.3 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 44 | 100.0 | 20.5 | 70.0 |
| answer | 26 | 100.0 | 69.2 | 80.9 |
| answer (skip intent) | 2 | 100.0 | 100.0 | 100.0 |
| correction | 8 | 100.0 | 50.0 | 66.7 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 64 | 62 (97%) | 2 (3%) | 0 (0%) | 0 |
| clean | 64 | 62 (97%) | 2 (3%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bank | 15 | 15 | 0 | 0 |
| amount | 14 | 14 | 0 | 0 |
| scamType | 11 | 9 | 2 | 0 |
| paymentApp | 6 | 6 | 0 | 0 |
| utr | 5 | 5 | 0 | 0 |
| suspectPhone | 4 | 4 | 0 | 0 |
| suspectUpi | 4 | 4 | 0 | 0 |
| time | 3 | 3 | 0 | 0 |
| suspectAccount | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| kn | 64 | 62 | 2 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | bank | kn | asr | fn | 15 | kn-01 kn-03 kn-05 kn-06 kn-16 kn-18 kn-21 kn-38 |
| 2 | scamType | kn | asr | fn | 9 | kn-01 kn-05 kn-09 kn-16 kn-35 |
| 3 | amount | kn | asr | fn | 8 | kn-02 kn-06 kn-08 kn-10 kn-13 kn-21 kn-24 kn-31 |
| 4 | paymentApp | kn | asr | fn | 6 | kn-02 kn-04 kn-08 kn-20 |
| 5 | amount | kn | asr | wrong | 6 | kn-06 kn-07 kn-13 kn-14 kn-21 |
| 6 | utr | kn | asr | fn | 5 | kn-14 kn-31 kn-32 |
| 7 | suspectPhone | kn | asr | fn | 4 | kn-09 kn-22 kn-39 |
| 8 | suspectUpi | kn | asr | fn | 4 | kn-10 kn-34 |
| 9 | scamType | kn | extractor_form | fn | 2 | kn-08 |
| 10 | suspectAccount | kn | asr | wrong | 2 | kn-19 |
| 11 | time | kn | asr | wrong | 2 | kn-20 |
| 12 | time | kn | asr | fn | 1 | kn-10 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. kn-06 (story) - fails 100% of 2 runs

- Reference: ಟೆಲಿಗ್ರಾಮ್‌ನಲ್ಲಿ ಪಾರ್ಟ್ ಟೈಮ್ ಜಾಬ್ ಟಾಸ್ಕ್ ಕೊಟ್ಟರು, ನಂತರ ಹೂಡಿಕೆ ಮಾಡಲು ಹೇಳಿದರು, ನಾನು ನಲವತ್ತೇಳು ಸಾವಿರ ರೂಪಾಯಿ ಹಾಕಿದೆ, ಕೋಟಕ್ ಬ್ಯಾಂಕ್‌ನಿಂದ
- Transcript (`kn-06__Gagan__r0__kn`): ಟೆಲಿಗ್ರಾಮ್ನಲ್ಲಿ ಪಾರ್ಟ್ ಟೈಮ್ ಕೊಟ್ಟರು ನಂತರ ಹೂಡಿಕೆ ಮಾಡಲು ಹೇಳಿದರು ನಾನು ಸಾವಿರ ರೂಪಾಯಿ ಹಾಕಿದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 47000 | - | 47000 | **asr**: value not in the transcript |
| bank | fn | Kotak Mahindra Bank | - | Kotak Mahindra Bank | **asr**: ASR lost/changed: ಕೋಟಕ್ |

### 2. kn-08 (story) - fails 100% of 2 runs

- Reference: ಒಂದು ವೀಡಿಯೊ ಕಾಲ್ ಬಂತು, ರೆಕಾರ್ಡ್ ಮಾಡಿ ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ, ಪೇಟಿಎಂ ಮೂಲಕ ಹದಿನೈದು ಸಾವಿರ ರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೇನೆ
- Transcript (`kn-08__Gagan__r0__kn`): ಒಂದು ವಿಡಿಯೋ ಕಾಲ್ ಬಂತು ರೆಕಾರ್ಡ್ ಮಾಡಿ ಈಗ ಬ್ಲ್ಯಾಕ್ ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ ಕೊಟ್ಟಿದ್ದೇನೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| scamType | fn | sextortion | - | sextortion | **extractor_form**: key words survive (ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್) but the extractor fails |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: ಪೇಟಿಎಂ |

### 3. kn-10 (story) - fails 100% of 2 runs

- Reference: UPI ID rahul dot kyc at ybl ಗೆ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ, ಇಪ್ಪತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ
- Transcript (`kn-10__Gagan__r0__kn`): ಯುಪಾಯಿ ಎದುರಾಹುಲ್ ಬೋಗಿ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ ನಿಮಿಷಗಳ ಹಿಂದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 4. kn-16 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ನನ್ನೆಯ ಕೌಂಟ್ ಇಂದು ಇಪ್ಪತ್ತು ಸಾವಿರ ರೂಪಿಸಿಟಿಸಿ ಒಂದು ಗಂಟೆ ಹಿಂದೆ ಕಸ್ಟಮರ್ ಕಾಲ್ ಮಾಡಿದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 5. kn-21 (story) - fails 100% of 2 runs

- Reference: ಕರೆಂಟ್ ಬಿಲ್ ಮೆಸೇಜ್ ಬಂತು, ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿದೆ, 9999 ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು, ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್
- Transcript (`kn-21__Gagan__r0__kn`): ಕೆರೆಂಟ್ ಬಿಲ್ ಮೆಸೇಜ್ ಬಂತು ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿದೆ ಒಂಬತ್ತು ಸಾವಿರ ಒಂಬೈನೂರ ತೊಂಬತ್ತು ರೂಪಾಯಿ ಬ್ಯಾಂಕ್

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 9999 | 9990 | 9999 | **asr**: value not in the transcript |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: ಸ್ಟೇಟ್ |

### 6. kn-01 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): ನನ್ನ ಖಾತೆಯಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ ಹತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು ಮಾಡಲು ಹೇಳಿದರು

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |
