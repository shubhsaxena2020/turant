# Turant pipeline eval: kn_unseen52

Generated 2026-11-27T23:37:09.255Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 160 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 0 | - | - | - | - | - | - | - |
| ASR noise 15 dB | 40 | 47.5 | 47.5 | 96.4 | 67.5 | 79.4 | 53.6 | 45.5 |
| ASR noise 5 dB | 40 | 17.5 | 17.5 | 80.0 | 35.0 | 48.7 | 79.3 | 77.2 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 160 | 43.1 | 43.1 | 93.1 | 63.1 | 75.2 | 56.3 | 50.4 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): -% of clean runs and 43.8% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | - | - | - | 84.6 |
| time | 113 | 100.0 | 100.0 | 100.0 | - | - | - | 85.2 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | - | - | - | 68.7 |
| bank | 97 | 100.0 | 100.0 | 100.0 | - | - | - | 83.3 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 54.5 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 40.0 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 0.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 85.7 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | - | - | - | 75.2 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | 17.5 | 100.0 | - | - | - | - (n=0) |

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
| babble 15 dB | 10 | 60.0 | 83.3 | 63.3 | 62.1 |
| babble 5 dB | 10 | 0.0 | 8.3 | 129.6 | 139.7 |
| clean | 80 | 53.8 | 83.9 | 46.2 | 39.4 |
| pink 15 dB | 16 | 56.3 | 84.8 | 43.0 | 23.3 |
| pink 5 dB | 16 | 18.8 | 58.6 | 63.7 | 45.2 |
| traffic 15 dB | 14 | 28.6 | 64.7 | 59.9 | 66.9 |
| traffic 5 dB | 14 | 28.6 | 60.6 | 65.1 | 70.2 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 53.8 | 83.9 | 46.2 |
| 15 dB | 40 | 47.5 | 79.4 | 53.6 |
| 5 dB | 40 | 17.5 | 48.7 | 79.3 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 53.8 | 83.9 | 46.2 |

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
| all forced-language runs | 119 | 116 (97%) | 3 (3%) | 0 (0%) | 0 |
| clean | 41 | 39 (95%) | 2 (5%) | 0 (0%) | 0 |
| 5 dB | 52 | 51 (98%) | 1 (2%) | 0 (0%) | 0 |
| 15 dB | 26 | 26 (100%) | 0 (0%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 23 | 22 | 1 | 0 |
| scamType | 21 | 20 | 1 | 0 |
| bank | 16 | 15 | 1 | 0 |
| utr | 12 | 12 | 0 | 0 |
| time | 12 | 12 | 0 | 0 |
| suspectPhone | 12 | 12 | 0 | 0 |
| paymentApp | 10 | 10 | 0 | 0 |
| suspectUpi | 8 | 8 | 0 | 0 |
| suspectAccount | 4 | 4 | 0 | 0 |
| intent | 1 | 1 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| kn | 119 | 116 | 3 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | kn | asr | fn | 20 | kn-01 kn-03 kn-09 kn-16 kn-35 kn-05 kn-06 kn-07 +1 |
| 2 | amount | kn | asr | fn | 17 | kn-13 kn-14 kn-31 kn-01 kn-03 kn-07 kn-08 kn-15 +4 |
| 3 | bank | kn | asr | fn | 15 | kn-18 kn-21 kn-30 kn-01 kn-05 kn-06 kn-12 kn-17 +1 |
| 4 | utr | kn | asr | fn | 12 | kn-14 kn-31 kn-32 |
| 5 | suspectPhone | kn | asr | fn | 12 | kn-22 kn-33 kn-39 kn-09 |
| 6 | paymentApp | kn | asr | fn | 10 | kn-04 kn-08 kn-02 kn-20 |
| 7 | suspectUpi | kn | asr | fn | 8 | kn-10 kn-34 |
| 8 | time | kn | asr | wrong | 6 | kn-20 kn-03 kn-12 kn-28 |
| 9 | time | kn | asr | fn | 6 | kn-01 kn-02 kn-07 kn-13 kn-26 |
| 10 | amount | kn | asr | wrong | 4 | kn-07 kn-21 kn-04 |
| 11 | suspectAccount | kn | asr | wrong | 4 | kn-19 |
| 12 | bank | kn | extractor_form | fn | 1 | kn-06 |
| 13 | scamType | kn | extractor_form | fn | 1 | kn-08 |
| 14 | amount | kn | asr | fp | 1 | kn-39 |
| 15 | amount | kn | extractor_form | fn | 1 | kn-17 |
| 16 | intent | kn | asr | fn | 1 | kn-36 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. kn-31 (answer:utr) - fails 100% of 4 runs

- Reference: ನಿಮ್ಮ ಖಾತೆಯಿಂದ ರೂ.5000 ಡೆಬಿಟ್ ಆಗಿದೆ, UPI Ref No 6 1 2 3 4 5 7 8 9 0 1 2
- Transcript (`kn-31__RemyMultilingual__r0__kn`): ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಇದು ಸಾವಿರ ಬಿಟ್ಟಾಗಿದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | fn | 612345789012 | - | 612345789012 | **asr**: value not in the transcript |

### 2. kn-04 (story) - fails 100% of 4 runs

- Reference: ಒಬ್ಬರು ತಪ್ಪಾಗಿ ಹಣ ಕಳುಹಿಸಿದ್ದೇನೆ, ವಾಪಸ್ ಕಳುಹಿಸಿ ಎಂದರು, ನಾನು ಗೂಗಲ್ ಪೇ ಮೂಲಕ ಹನ್ನೆರಡು ಸಾವಿರದ ಐನೂರು ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ, ಎರಡು ಗಂಟೆಗಳ ಹಿಂದೆ
- Transcript (`kn-04__GiuseppeMultilingual__r0__kn`): ಒಬ್ಬರು ತಪ್ಪಾಗಿ ಹಣ ಕಳುಹಿಸಿದ್ದೇನೆ ವಾಪಸ್ ಕಳುಹಿಸಿ ಎಂದರು ನಾನು ಗೂಗಲ್ಪೆ ಮೂಲಕ ಹನ್ನೆರಡು ಸಾವಿರದ ಐನೂರು ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ ಎರಡು ಗಂಟೆಗಳ ಹಿಂದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: ಪೇ |

### 3. kn-09 (story) - fails 100% of 4 runs

- Reference: ಕರೆ ಬಂದ ನಂಬರ್ 9 8 7 6 5... 4 3 2 1 0, ಬ್ಯಾಂಕ್‌ನಿಂದ ಮಾತನಾಡುತ್ತಿದ್ದೇವೆ, KYC ಮಾಡದಿದ್ದರೆ ಖಾತೆ ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ ಎಂದರು
- Transcript (`kn-09__RemyMultilingual__r0__kn`): ಕರೆ ಬಂದ ನಂಬರ್ ಒಂಬತ್ತು ಎಂಟು ಏಳು ಆರು ಐದು ನಾಲ್ಕು ಮೂರು ಎರಡು ಒಂದು ಸೊನ್ನೆ ಬ್ಯಾಂಕ್ನಿಂದ ಮಾತನಾಡುತ್ತಿದ್ದೇವೆ ಕೆವಹಿಸಿ ಮಾಡದಿದ್ದರೆ ಖಾತೆ ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ ಎಂದರು

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 4. kn-13 (story) - fails 100% of 4 runs

- Reference: ನನ್ನ 15000 ರೂಪಾಯಿ ಹೋಯಿತು, ಆಕ್ಸಿಸ್ ಬ್ಯಾಂಕ್, 3 ದಿನಗಳ ಹಿಂದೆ
- Transcript (`kn-13__RemyMultilingual__r0__kn`): ನನ್ನ ಒಂದು ಐದು ತ್ರಿಪಲ್ ಸೊನ್ನೆ ರೂಪಾಯಿ ಹೋಯಿತು ಅಕ್ಸಿಸ್ ಬ್ಯಾಂಕ್ ಮೂರು ದಿನಗಳ ಹಿಂದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |

### 5. kn-14 (story) - fails 100% of 4 runs

- Reference: UPI ರೆಫರೆನ್ಸ್ ನಂಬರ್ 4 0 3 2 1 8 7 6 5 4 3 2, ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-14__GiuseppeMultilingual__r0__kn`): ಯುಪಿಐ ರೆಫರೆನ್ಸ್ ನಂಬರ್ ನಾಲ್ಕು ಸೊನ್ನೆ ಮೂರು ಎರಡು ಒಂದು ಎಂಟು ಎಪ್ಪತ್ತೆರಲ್ಲಿ ಎಪ್ಪತ್ತೆರಲ್ಲಿ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ ಎಪ್ಪತ್ತ್ತೆರಲ್ಲಾ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 6. kn-21 (story) - fails 100% of 4 runs

- Reference: ಕರೆಂಟ್ ಬಿಲ್ ಮೆಸೇಜ್ ಬಂತು, ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿದೆ, 9999 ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು, ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್
- Transcript (`kn-21__RemyMultilingual__r0__kn`): ಕರೆಂಟ್ ಬಿಲ್ ಮೆಸೇಜ್ ಬಂತು ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿದೆ ಒಂಬತ್ತು ಸಾವಿರ ಒಂಬೈನೂರ ತೊಂಬತ್ತು ರೂಪಾಯಿ ಕಟಾಯಿತು ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 9999 | 9990 | 9999 | **asr**: value not in the transcript |
