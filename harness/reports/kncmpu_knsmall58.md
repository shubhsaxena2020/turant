# Turant pipeline eval: kncmpu_knsmall58

Generated 2026-11-28T01:42:18.260Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 160 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 0 | - | - | - | - | - | - | - |
| ASR noise 15 dB | 40 | 52.5 | 52.5 | 91.4 | 66.3 | 76.8 | 56.2 | 49.5 |
| ASR noise 5 dB | 40 | 27.5 | 27.5 | 85.4 | 43.8 | 57.9 | 78.1 | 77.0 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 160 | 46.9 | 46.9 | 91.0 | 62.8 | 74.3 | 55.9 | 50.8 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): -% of clean runs and 48.1% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | - | - | - | 80.7 |
| time | 113 | 100.0 | 100.0 | 100.0 | - | - | - | 86.9 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | - | - | - | 75.0 |
| bank | 97 | 100.0 | 100.0 | 100.0 | - | - | - | 74.2 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 54.5 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | - | - | 0.0 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 69.2 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 0.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 100.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | - | - | - | 74.3 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | 27.5 | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 10 | 70.0 | 78.9 | 41.8 | 37.5 |
| babble 5 dB | 10 | 20.0 | 48.3 | 139.8 | 141.8 |
| clean | 80 | 53.8 | 80.1 | 44.6 | 38.3 |
| pink 15 dB | 16 | 62.5 | 84.8 | 38.5 | 19.7 |
| pink 5 dB | 16 | 25.0 | 60.7 | 60.3 | 45.1 |
| traffic 15 dB | 14 | 28.6 | 58.8 | 86.2 | 111.3 |
| traffic 5 dB | 14 | 35.7 | 61.1 | 59.2 | 67.6 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 53.8 | 80.1 | 44.6 |
| 15 dB | 40 | 52.5 | 76.8 | 56.2 |
| 5 dB | 40 | 27.5 | 57.9 | 78.1 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 53.8 | 80.1 | 44.6 |

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
| all forced-language runs | 122 | 118 (97%) | 4 (3%) | 0 (0%) | 0 |
| clean | 48 | 47 (98%) | 1 (2%) | 0 (0%) | 0 |
| 5 dB | 47 | 45 (96%) | 2 (4%) | 0 (0%) | 0 |
| 15 dB | 27 | 26 (96%) | 1 (4%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 27 | 26 | 1 | 0 |
| bank | 23 | 23 | 0 | 0 |
| scamType | 18 | 16 | 2 | 0 |
| utr | 13 | 13 | 0 | 0 |
| time | 12 | 12 | 0 | 0 |
| paymentApp | 10 | 9 | 1 | 0 |
| suspectUpi | 8 | 8 | 0 | 0 |
| suspectPhone | 7 | 7 | 0 | 0 |
| suspectAccount | 4 | 4 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| kn | 122 | 118 | 4 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | bank | kn | asr | fn | 23 | kn-05 kn-06 kn-16 kn-18 kn-21 kn-30 kn-03 kn-12 +2 |
| 2 | amount | kn | asr | fn | 20 | kn-02 kn-08 kn-13 kn-21 kn-24 kn-31 kn-01 kn-03 +4 |
| 3 | scamType | kn | asr | fn | 15 | kn-03 kn-05 kn-09 kn-16 kn-01 kn-08 kn-18 kn-35 |
| 4 | utr | kn | asr | fn | 10 | kn-14 kn-31 kn-32 |
| 5 | paymentApp | kn | asr | fn | 9 | kn-02 kn-04 kn-08 kn-20 |
| 6 | suspectUpi | kn | asr | fn | 8 | kn-10 kn-34 |
| 7 | time | kn | asr | fn | 7 | kn-16 kn-01 kn-02 kn-07 kn-13 kn-15 kn-26 |
| 8 | amount | kn | asr | wrong | 6 | kn-07 kn-21 |
| 9 | suspectPhone | kn | asr | fn | 6 | kn-22 kn-39 |
| 10 | suspectAccount | kn | asr | wrong | 4 | kn-19 |
| 11 | time | kn | asr | wrong | 4 | kn-20 |
| 12 | scamType | kn | extractor_form | fn | 2 | kn-08 |
| 13 | utr | kn | asr | wrong | 2 | kn-14 |
| 14 | scamType | kn | asr | fp | 1 | kn-10 |
| 15 | suspectPhone | kn | asr | wrong | 1 | kn-39 |
| 16 | paymentApp | kn | extractor_form | fn | 1 | kn-04 |
| 17 | amount | kn | extractor_form | fn | 1 | kn-04 |
| 18 | time | kn | asr | fp | 1 | kn-17 |
| 19 | utr | kn | asr | fp | 1 | kn-39 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. kn-16 (story) - fails 100% of 4 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__GiuseppeMultilingual__r0__kn`): ನನ್ನ ಅಕೌಂಟ್ ಇಂದ ಇಪ್ಪತ್ತು ಸಾವಿರ ರೂಪಿಸಿ ಬಿಟ್ ಆಯಿತು ಬ್ಯಾಂಕ್ ಒಂದು ಗಂಟೆಯಿಂದ ಕಾಲ್ ಮಾಡಿದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: ಹಿಂದೆ |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 2. kn-21 (story) - fails 100% of 4 runs

- Reference: ಕರೆಂಟ್ ಬಿಲ್ ಮೆಸೇಜ್ ಬಂತು, ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿದೆ, 9999 ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು, ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್
- Transcript (`kn-21__RemyMultilingual__r0__kn`): ಕರೆಂಟ್ ಬಿಲ್ ಮೆಸೇಜ್ ಬಂತು ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9999 | **asr**: value not in the transcript |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ |

### 3. kn-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl ಗೆ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ, ಇಪ್ಪತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ
- Transcript (`kn-10__GiuseppeMultilingual__r0__kn`): ಯುಪಿಐ ಡಿ ರಾಹುಲ್ ಕೆವೈಸಿಗೆ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ ಇಪ್ಪತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 4. kn-31 (answer:utr) - fails 100% of 4 runs

- Reference: ನಿಮ್ಮ ಖಾತೆಯಿಂದ ರೂ.5000 ಡೆಬಿಟ್ ಆಗಿದೆ, UPI Ref No 6 1 2 3 4 5 7 8 9 0 1 2
- Transcript (`kn-31__RemyMultilingual__r0__kn`): ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಸಾವಿರಾರು ಸಾಗಿದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | fn | 612345789012 | - | 612345789012 | **asr**: value not in the transcript |

### 5. kn-20 (story) - fails 100% of 4 runs

- Reference: ಅಂದರೆ... ನಿನ್ನೆ ಮಧ್ಯಾಹ್ನ 2:30 ಕ್ಕೆ ಫೋನ್‌ಪೇ ಮೂಲಕ ಎರಡು ಸಾವಿರದ ಆರುನೂರು ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-20__GiuseppeMultilingual__r0__kn`): ಅಂದ ನಿನ್ನೆ ಮಧ್ಯಾಹ್ನ ಎರಡೂವರೆಗೆ ಫೋನ್ ಪೇ ಮೂಲಕ ಎರಡು ಸಾವಿರದ ಆರುನೂರು ರೂಪಾಯಿ ಹೋಯಿತು

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: 2:30 |

### 6. kn-07 (story) - fails 100% of 4 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__RemyMultilingual__r0__kn`): ಒಂದು ಕ್ಯೂಆರ್ ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು ತಕ್ಷಣ ನಾಲ್ಕು ಸಾವಿರ ಒಂಬೈನೂರ ರೂಪಾಯಿ ಹೋಯಿತು ಇಂದು ಬೆಳಿಗ್ಗೆ ಹತ್ತು ಗಂಟೆಗೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4900 | 4999 | **asr**: value not in the transcript |
