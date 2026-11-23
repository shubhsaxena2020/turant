# Turant pipeline eval: lv3r27b

Generated 2026-11-23T18:15:22.283Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 1098 ASR transcripts scored, **412 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).
Deltas in brackets are against `reports/baseline.json`.

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 (+44.3) | 100.0 | 100.0 | 100.0 | 100.0 (+22.4) | - | - |
| ASR clean, normal rate | 600 | 64.3 (+37.2) | 64.3 | 91.0 | 77.4 | 83.6 (+32.6) | 56.9 | 32.5 |
| ASR noise 15 dB | 249 | 59.8 (+35.2) | 59.8 | 90.2 | 73.4 | 80.9 (+31.9) | 62.6 | 35.0 |
| ASR noise 5 dB | 249 | 47.0 (+27.7) | 47.4 | 87.6 | 61.9 | 72.6 (+32.1) | 64.0 | 39.4 |
| ASR rate -15% / +15% | 0 | - (NaN) | - | - | - | - (NaN) | - | - |
| ASR all (forced language) | 1098 | 59.4 (+34.5) | 59.5 | 90.1 | 72.9 | 80.6 (+32.4) | 59.8 | 34.7 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 66.7% of clean runs and 62.9% of all runs fully correct. Per language (clean): hi 98%, en 90%, bn 41%, ta 58%, te 56%, mr 73%, kn 40%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 90.8 | 83.3 | 86.9 (+44.1) | 83.8 |
| time | 113 | 100.0 | 100.0 | 100.0 | 81.8 | 77.8 | 79.7 (+34.6) | 76.9 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 99.2 | 75.4 | 85.7 (+22.1) | 81.7 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 100.0 | 86.4 | 92.7 (+30.2) | 90.0 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 92.1 | 95.9 (+35.0) | 88.3 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 87.0 | 44.4 | 58.8 (+29.7) | 57.4 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 100.0 | 55.6 | 71.4 (-6.5) | 65.3 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 88.9 | 50.8 | 64.6 (+21.8) | 65.9 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 35.0 | 46.7 | 40.0 (+5.2) | 42.9 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 60.0 | 75.0 (+17.9) | 71.4 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 91.0 | 77.4 | 83.6 (+32.6) | 80.6 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 (+20.0) | 96.3 (+38.8) | 67.5 | 100.0 | 98.5 | 35.2 | 20.7 | 93.8 (n=16) |
| en | 100.0 (+12.5) | 89.2 (+25.8) | 75.0 | 100.0 | 96.7 | 28.7 | 17.1 | 66.7 (n=27) |
| bn | 100.0 (+67.5) | 37.5 (+28.8) | 25.0 | 100.0 | 68.8 | 81.6 | 44.9 | 50.0 (n=16) |
| ta | 100.0 (+55.0) | 56.3 (+46.3) | 32.5 | 100.0 | 80.8 | 46.6 | 26.0 | 18.8 (n=16) |
| te | 100.0 (+55.0) | 55.0 (+45.0) | 47.5 | 100.0 | 76.5 | 110.9 | 75.5 | 31.3 (n=16) |
| mr | 100.0 (+47.5) | 66.3 (+47.5) | 45.0 | 100.0 | 87.2 | 67.7 | 26.4 | 75.0 (n=16) |
| kn | 100.0 (+52.5) | 37.5 (+33.8) | 0.0 | 100.0 | 64.0 | 69.1 | 29.8 | 18.8 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 97.9 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 98.2 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 80.0 |
| en | 100.0 / 96.2 | 100.0 / 98.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 61.5 | 100.0 / 100.0 | 100.0 / 84.6 | 100.0 / 100.0 |
| bn | 100.0 / 73.1 | 100.0 / 58.6 | 100.0 / 53.3 | 100.0 / 90.9 | 100.0 / 66.7 | 100.0 / 80.0 | 100.0 / - | 100.0 / 54.5 | 100.0 / 50.0 |
| ta | 100.0 / 82.2 | 100.0 / 85.7 | 100.0 / 87.8 | 100.0 / 85.7 | 100.0 / 100.0 | 100.0 / 0.0 | 100.0 / 66.7 | 100.0 / 50.0 | 100.0 / 0.0 |
| te | 100.0 / 88.6 | 100.0 / 58.1 | 100.0 / 74.3 | 100.0 / 94.3 | 100.0 / 100.0 | 100.0 / 50.0 | 100.0 / 66.7 | 100.0 / 36.4 | 100.0 / 0.0 |
| mr | 100.0 / 95.7 | 100.0 / 81.3 | 100.0 / 87.2 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 80.0 | 100.0 / - | 100.0 / 66.7 | 100.0 / 25.0 |
| kn | 100.0 / 69.0 | 100.0 / 62.3 | 100.0 / 66.7 | 100.0 / 72.7 | 100.0 / 100.0 | 100.0 / 0.0 | 100.0 / - | 100.0 / 33.3 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 81 | 59.3 | 81.3 | 78.0 | 41.7 |
| babble 5 dB | 81 | 34.6 | 64.1 | 74.3 | 47.7 |
| clean | 600 | 64.3 | 83.6 | 56.9 | 32.5 |
| pink 15 dB | 91 | 52.7 | 76.0 | 58.4 | 32.0 |
| pink 5 dB | 91 | 37.4 | 64.9 | 61.8 | 35.1 |
| traffic 15 dB | 77 | 68.8 | 86.3 | 52.5 | 31.4 |
| traffic 5 dB | 77 | 71.4 | 89.2 | 56.5 | 35.7 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 600 | 64.3 | 83.6 | 56.9 |
| 15 dB | 249 | 59.8 | 80.9 | 62.6 |
| 5 dB | 249 | 47.0 | 72.6 | 64.0 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 47.5 | 76.4 | 82.8 | 45.8 |
| bn-IN-TanishaaNeural | 40 | 27.5 | 60.7 | 80.4 | 44.0 |
| en-IN-NeerjaExpressiveNeural | 40 | 87.5 | 95.1 | 31.3 | 18.5 |
| en-IN-NeerjaNeural | 40 | 90.0 | 97.5 | 27.7 | 17.1 |
| en-IN-PrabhatNeural | 40 | 90.0 | 97.5 | 27.0 | 15.6 |
| hi-IN-MadhurNeural | 40 | 95.0 | 98.2 | 35.1 | 19.7 |
| hi-IN-SwaraNeural | 40 | 97.5 | 98.8 | 35.3 | 21.7 |
| kn-IN-GaganNeural | 40 | 37.5 | 64.7 | 69.2 | 28.4 |
| kn-IN-SapnaNeural | 40 | 37.5 | 63.2 | 69.0 | 31.3 |
| mr-IN-AarohiNeural | 40 | 75.0 | 90.3 | 69.7 | 26.8 |
| mr-IN-ManoharNeural | 40 | 57.5 | 84.0 | 65.6 | 26.0 |
| ta-IN-PallaviNeural | 40 | 60.0 | 82.4 | 46.7 | 26.2 |
| ta-IN-ValluvarNeural | 40 | 52.5 | 79.2 | 46.5 | 25.8 |
| te-IN-MohanNeural | 40 | 57.5 | 76.9 | 86.0 | 64.5 |
| te-IN-ShrutiNeural | 40 | 52.5 | 76.1 | 135.8 | 86.6 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 600 | 64.3 | 83.6 | 56.9 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 330 | 100.0 | 58.8 | 85.6 |
| correction | 60 | 100.0 | 73.3 | 75.9 |
| answer | 195 | 100.0 | 71.3 | 77.8 |
| answer (skip intent) | 15 | 100.0 | 60.0 | 75.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 644 | 578 (90%) | 66 (10%) | 0 (0%) | 0 |
| clean | 295 | 268 (91%) | 27 (9%) | 0 (0%) | 0 |
| 15 dB | 144 | 125 (87%) | 19 (13%) | 0 (0%) | 0 |
| 5 dB | 205 | 185 (90%) | 20 (10%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 143 | 132 | 11 | 0 |
| time | 132 | 120 | 12 | 0 |
| scamType | 104 | 98 | 6 | 0 |
| bank | 68 | 61 | 7 | 0 |
| suspectPhone | 56 | 50 | 6 | 0 |
| utr | 46 | 41 | 5 | 0 |
| suspectUpi | 33 | 29 | 4 | 0 |
| suspectAccount | 25 | 21 | 4 | 0 |
| paymentApp | 25 | 17 | 8 | 0 |
| intent | 12 | 9 | 3 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 23 | 16 | 7 | 0 |
| en | 38 | 35 | 3 | 0 |
| bn | 156 | 147 | 9 | 0 |
| ta | 107 | 96 | 11 | 0 |
| te | 125 | 116 | 9 | 0 |
| mr | 81 | 59 | 22 | 0 |
| kn | 114 | 109 | 5 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | bn | asr | fn | 30 | bn-01 bn-03 bn-07 bn-08 bn-09 bn-16 bn-18 bn-35 |
| 2 | amount | bn | asr | wrong | 20 | bn-07 bn-11 bn-12 bn-20 bn-21 bn-24 bn-04 |
| 3 | scamType | kn | asr | fn | 20 | kn-01 kn-05 kn-07 kn-09 kn-16 kn-35 kn-08 |
| 4 | amount | kn | asr | fn | 20 | kn-03 kn-05 kn-10 kn-14 kn-16 kn-18 kn-23 kn-01 +5 |
| 5 | amount | te | asr | fn | 19 | te-10 te-14 te-15 te-16 te-02 te-04 te-17 te-20 +1 |
| 6 | amount | bn | asr | fn | 17 | bn-05 bn-06 bn-10 bn-17 bn-37 bn-02 bn-03 bn-07 +1 |
| 7 | bank | ta | asr | fn | 17 | ta-13 ta-17 ta-18 ta-21 ta-30 ta-29 |
| 8 | time | bn | asr | wrong | 16 | bn-03 bn-07 bn-26 bn-28 bn-40 |
| 9 | scamType | te | asr | fn | 16 | te-01 te-08 te-09 te-16 te-35 |
| 10 | time | te | asr | fn | 16 | te-10 te-13 te-15 te-16 te-28 te-02 te-20 |
| 11 | bank | kn | asr | fn | 16 | kn-01 kn-03 kn-05 kn-16 kn-18 kn-30 kn-38 |
| 12 | bank | bn | asr | fn | 14 | bn-05 bn-16 bn-18 bn-01 bn-02 bn-03 bn-38 |
| 13 | scamType | ta | asr | fn | 13 | ta-05 ta-16 ta-18 ta-04 ta-08 ta-09 |
| 14 | time | te | asr | fp | 13 | te-09 te-19 te-31 te-33 |
| 15 | suspectPhone | bn | asr | fn | 12 | bn-09 bn-22 bn-39 bn-33 |
| 16 | amount | ta | asr | wrong | 12 | ta-07 ta-10 ta-21 ta-17 |
| 17 | scamType | mr | asr | fn | 12 | mr-01 mr-03 mr-18 mr-05 mr-16 |
| 18 | time | bn | asr | fn | 11 | bn-03 bn-10 bn-11 bn-27 bn-02 bn-04 |
| 19 | time | ta | asr | wrong | 11 | ta-20 ta-26 ta-28 ta-40 |
| 20 | time | kn | asr | wrong | 11 | kn-03 kn-20 kn-26 kn-40 kn-07 |
| 21 | time | mr | asr | wrong | 10 | mr-07 mr-15 mr-20 mr-28 mr-26 |
| 22 | amount | ta | asr | fn | 9 | ta-11 ta-12 ta-16 ta-20 |
| 23 | utr | ta | asr | fn | 9 | ta-14 ta-31 ta-32 |
| 24 | bank | te | asr | fn | 9 | te-03 te-16 te-18 te-01 te-17 te-21 |
| 25 | amount | kn | asr | wrong | 9 | kn-04 kn-07 kn-13 kn-20 kn-25 |
| 26 | utr | en | asr | fn | 8 | en-31 en-32 |
| 27 | suspectUpi | bn | asr | fn | 8 | bn-10 bn-34 |
| 28 | suspectPhone | ta | asr | fn | 8 | ta-09 ta-33 |
| 29 | time | te | asr | wrong | 8 | te-04 te-20 te-26 |
| 30 | suspectPhone | te | asr | fn | 8 | te-09 te-22 te-33 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. bn-07 (story) - fails 100% of 4 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__Bashkar__r0__bn`): A তে কিয়ার কোড পাঠে বল্লো স্কান করুন তাকা পাবেন. স্কান করতে 4,999 টাকা কেটে গালো. আজ সকাল সারে দস্টায়.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 10:30 (90 min ago) | today 09:00 (180 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: সাড়ে দশটায় |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: স্ক্যান |

### 2. ta-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl க்கு எட்டாயிரம் ரூபாய் அனுப்பினேன், இருபது நிமிஷத்துக்கு முன்னாடி
- Transcript (`ta-10__Pallavi__r0__ta`): UBI ID rahul.kyc at ypl.com 80000 ரூபாய் அனிப்பினேன் 20 நிமிஷத்துக்கு முன்னாடி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 8000 | 80000 | 8000 | **asr**: value not in the transcript |
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 3. kn-03 (story) - fails 100% of 4 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__Gagan__r0__kn`): ನಿನ್ನೆ ಸಂಜಿ ಏಳು ಗಂಟಗೆ ಕಸ್ಟಮರ್ ಕೇರ್ಣಿಂದ ಕರೆಬಂತು ಎನಿಡಿಸ್ಕ ಇಂಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು. ನಂತರ ಹಡಿಫ್ಸಕಾತೆಯಿಂದ ಎರ್ಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: ಸಂಜೆ |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 4. bn-16 (story) - fails 100% of 4 runs

- Reference: আমার account থেকে 20,000 টাকা debit হয়ে গেছে, ICICI bank, এক ঘণ্টা আগে customer care এ ফোন করেছিলাম
- Transcript (`bn-16__Bashkar__r0__bn`): আমারা কান্থেকে কুডি হাজার তাকা দেবের হোয়ে গেছে. এসাসে বেক, এক ঘন্টা আগে কাস্টমার কের এ ফন করে ছিলম.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 5. te-09 (story) - fails 100% of 4 runs

- Reference: కాల్ వచ్చిన నంబర్ 9 8 7 6 5... 4 3 2 1 0, బ్యాంక్ నుండి మాట్లాడుతున్నాం, KYC చేయకపోతే అకౌంట్ బ్లాక్ అవుతుందని చెప్పారు
- Transcript (`te-09__Mohan__r0__te`): call వచ్చిన number 98765 43221 గంటసున్నా bank నుంది మాట్లాడుతునామ్ కెవాయసి చేయకపోతే account బ్లాక అవుతుందని చెప్పారు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| suspectPhone | wrong | 9876543210 | 9876543221 | 9876543210 | **asr**: value not in the transcript |

### 6. te-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl కి ఎనిమిది వేల రూపాయలు పంపాను, ఇరవై నిమిషాల క్రితం
- Transcript (`te-10__Mohan__r0__te`): UPA ID Rahul.kyc at ybl.ki enimidi vela rupayalu pampanu, irawai nimishala kritham.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: నిమిషాల క్రితం |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **extractor_form**: value is in the transcript but not parsed |

### 7. te-33 (answer:suspect) - fails 100% of 4 runs

- Reference: వాడి నంబర్ 7 0 1 1 2 2 3 3 4 4
- Transcript (`te-33__Mohan__r0__te`): 1.00 1.00 2.00 3.00 3.00 4.00

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 13:00 (1380 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |
| suspectAccount | fp | - | 100100200300300400 | - | **asr**: spurious value from a mis-recognised transcript |

### 8. kn-01 (story) - fails 100% of 4 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): ನನ್ನ ಸಬೈ ಕಾತೆಯಿಂದ ಆಯದು ಸಾವಿರು ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ. ಹತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು ಕೆಕ್ ಅಪ್ಪೇಟ್ ಮಾಡಲು ಹೇಳಿದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 9. bn-03 (story) - fails 100% of 4 runs

- Reference: গতকাল সন্ধ্যা সাতটায় কাস্টমার কেয়ার থেকে ফোন এসেছিল, AnyDesk ইনস্টল করতে বলল, তারপর এইচডিএফসি অ্যাকাউন্ট থেকে দুই লাখ টাকা কেটে নিল
- Transcript (`bn-03__Bashkar__r0__bn`): ্রে ক্ষ্টমার কেয়ে থেকে ফন এশে ছিলো, এনে ডেসক ইন্স্টল কুর্তে বল্লো, তার পর HDFC একাউন্ট থেকে দুই লাক তাকা কেটে নিলো.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 10. te-16 (story) - fails 100% of 4 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__Mohan__r0__te`): ನಾ ಕಾಂಟ್ జುಂಡಿ జಾವಾಯ వೇಲు రುಪಿಸ್ జಾವాಯ వೇಲు రುపిಸ్ జాವాಯ వేಲు రుపిస్ జావాಯ వేలు రుపిస్ జావాಯ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: గంట క్రితం |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 11. kn-07 (story) - fails 100% of 4 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__Gagan__r0__kn`): ಒಂದು ರಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು. ಸ್ಕಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ನಾಲ್ಕು 1999 ರೂಪಾಯಿ ಹೋಯಿತು ಇಂದು ಬಳಿಗ್ಗೆ ಹತ್ತು ಗಂಟಿಗೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 2003 | 4999 | **asr**: value not in the transcript |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 12. bn-08 (story) - fails 100% of 4 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__Bashkar__r0__bn`): A তা ঵িডিও কল এশে ছিলো, রেকাড করে এখন ব্লাকমেল কুরছে, পেতিয়ন দিয়ে পনেরো হাজার তাকা দিয়ে দিয়ে ছি.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: পেটিএম |

### 13. bn-09 (story) - fails 100% of 4 runs

- Reference: যে নম্বর থেকে ফোন এসেছিল সেটা হল 9 8 7 6 5... 4 3 2 1 0, বলল ব্যাংক থেকে বলছি, KYC না করলে অ্যাকাউন্ট বন্ধ হয়ে যাবে
- Transcript (`bn-09__Bashkar__r0__bn`): 43210 বল্বেন্ক থেকে বলছি থাইক না করলে একাউন্ত বন্ধ হোয়ে জাবে

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 14. bn-39 (correction) - fails 100% of 4 runs

- Reference: নম্বর ভুল, 9 8 1 1 1 2 2 2 3 3
- Transcript (`bn-39__Bashkar__r0__bn`): NOMOR BHUL 981112233

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 981112233 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 15. ta-20 (story) - fails 100% of 4 runs

- Reference: உம்... அதாவது, நேற்று மதியம் 2:30 மணிக்கு போன்பே மூலமா இரண்டாயிரத்து அறுநூறு ரூபாய் போச்சு
- Transcript (`ta-20__Pallavi__r0__ta`): ஓங்! அதாவது, நேற்று மதியம் இரண்டு மணி முப்பது நிமிணம் மணிக்கு போன்பே மூலமா இரண்டாயரத்து அரணூரு ரூபாய் போச்சு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2600 | - | 2600 | **asr**: value not in the transcript |
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: 2:30 |

### 16. te-19 (story) - fails 100% of 4 runs

- Reference: డబ్బులు వెళ్ళిన అకౌంట్ నంబర్ 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`te-19__Mohan__r0__te`): 1. దబ్బులు వేళ్ళిన అకాంట్ నంబర్ 5.00.1.00.2.3.4.5.6.7.8.1.2.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 17:00 (1140 min ago) | - | **extractor_form**: spurious value from a near-correct transcript |
| suspectAccount | fn | 50100234567812 | - | 50100234567812 | **asr**: value not in the transcript |

### 17. te-31 (answer:utr) - fails 100% of 4 runs

- Reference: మీ ఖాతా నుండి రూ.5000 డెబిట్ అయ్యింది, UPI Ref No 6 1 2 3 4 5 7 8 9 0 1 2
- Transcript (`te-31__Mohan__r0__te`): 1. మికాతానుంది 5000 రూపాయలు డెబిట్ ఐంది. U.P.I. Ref. No. 6 1.00, 2.00, 3.00, 4.00, 5.00, 7.00, 8.00, 9.00, 0.00, 1.00, 2.00.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 13:00 (1380 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| utr | fn | 612345789012 | - | 612345789012 | **asr**: value not in the transcript |

### 18. kn-05 (story) - fails 100% of 4 runs

- Reference: ನನ್ನ ಖಾತೆಯಿಂದ ಐದು... ಇಲ್ಲ ಇಲ್ಲ, ಆರು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು, OTP ಹೇಳಿಬಿಟ್ಟೆ, ಕೆನರಾ ಬ್ಯಾಂಕ್
- Transcript (`kn-05__Gagan__r0__kn`): ನನ್ನ ಕಾತೆಯಿಂದ ಆಯಿದು. ಇಲ್ಲಾ ಇಲ್ಲಾ, ಆರುಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ಟಾಯಿತು, ಓತ್ ಹೇಳಿಬಿಟ್ಟೆ, ಕೆನನ ಬೆಂಗ್.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: OTP |
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: ಕೆನರಾ |

### 19. kn-09 (story) - fails 100% of 4 runs

- Reference: ಕರೆ ಬಂದ ನಂಬರ್ 9 8 7 6 5... 4 3 2 1 0, ಬ್ಯಾಂಕ್‌ನಿಂದ ಮಾತನಾಡುತ್ತಿದ್ದೇವೆ, KYC ಮಾಡದಿದ್ದರೆ ಖಾತೆ ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ ಎಂದರು
- Transcript (`kn-09__Gagan__r0__kn`): ಕರೆಬಂದ ನಮ್ಬರ್ 98765 ನಾಲ್ಕು 3710 ಬೆಂಕ್ ನಿಂದ ಮಾತನಾಡುತ್ತಿದ್ದೇವೆ ಕೈಕ್ಮಾಡದಿದ್ದರೆ ಕಾತೆ ಬ್ಲಾಕ್ ಆಗುತ್ತದೇ ಎಂದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 20. ta-18 (story) - fails 100% of 4 runs

- Reference: இரண்டரை லட்சம் ரூபாய் முதலீடு பண்ண சொல்லி வாங்கிட்டாங்க, பணம் டபுள் ஆகும்னு சொன்னாங்க, யெஸ் பேங்க்
- Transcript (`ta-18__Pallavi__r0__ta`): இரண்டறே லட்சம் ரூபாய் முதலிடு பண்ண சொல்லி வாங்கிட்டாங்க. பணம் தபுள் ஆகும்னு சொன்னாங்க. ஏஸ் பெங்க.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: யெஸ் பேங்க் |

### 21. ta-21 (story) - fails 100% of 4 runs

- Reference: கரண்ட் பில் மெசேஜ் வந்தது, லிங்க் கிளிக் பண்ணேன், 9999 ரூபாய் கட் ஆச்சு, ஸ்டேட் பேங்க்
- Transcript (`ta-21__Pallavi__r0__ta`): Current bill message வந்தது. Link கேளிக் பண்ணேன். 9000-9090 ரூபாய் கட் ஆச்சு. State PIN.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 9999 | 9090 | 9999 | **asr**: value not in the transcript |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: ஸ்டேட் பேங்க் |

### 22. mr-39 (correction) - fails 100% of 4 runs

- Reference: नंबर चुकीचा, 9 8 1 1 1 2 2 2 3 3
- Transcript (`mr-39__Aarohi__r0__mr`): नमबर चुकीचा 981112233

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |
| suspectAccount | fp | - | 981112233 | - | **extractor_form**: spurious value from a near-correct transcript |

### 23. mr-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__Aarohi__r0__mr`): आईडी राहूल डियोटी आट वर आठ हजार रुपे पाठवले 20 मिनिताम कूर्वी

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 24. mr-31 (answer:utr) - fails 100% of 4 runs

- Reference: तुमच्या खात्यातून रु. 5000 डेबिट झाले, UPI Ref No 6 1 2 3 4 5 7 8 9 0 1 2
- Transcript (`mr-31__Aarohi__r0__mr`): तुमचा खात्यातून 5000 रुपे डेबिट जाले, रेफ 91612345789012.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 612345789012 | - | 612345789012 | **extractor_form**: value is in the transcript but not parsed |
| suspectAccount | fp | - | 91612345789012 | - | **asr**: spurious value from a mis-recognised transcript |

### 25. kn-16 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ನನ್ನ ಅಕ್ಕಾಂಟಿಂದ ಇಪ್ಪತ್ತು ಸಾವರು ರೂಪಿಸ್ ಡೇವೆಟ್ ಆಯಿತು, ಎಸೇಶಿ ಬೆಂಕ್ ಒಂದು ಗಂಟೆ ಹಿಂದೆ ಕಸ್ಟಮರ್ ಕೇರಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 26. en-20 (story) - fails 100% of 5 runs

- Reference: uh the guy called from 9 8 1 1 1, 2 2 2 3 3 and said he is from the electricity board
- Transcript (`en-20__Neerja__r0__en`): And the guy called from 98111 to 2233 and said he is from the electricity board.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 27. ta-09 (story) - fails 100% of 4 runs

- Reference: கால் வந்த நம்பர் 9 8 7 6 5... 4 3 2 1 0, பேங்க்ல இருந்து பேசறோம், KYC பண்ணலைன்னா அக்கவுண்ட் பிளாக் ஆயிடும்னு சொன்னாங்க
- Transcript (`ta-09__Pallavi__r0__ta`): கால் வந்த 9, 8, 7, 6, 5, 4, 3, 2, 1 பூஜ்யம் பேங்கில இருந்து பேசறோம் கேவாயசி பண்ணலின்னா அக்கவொன் பிலாக் ஆயிடும் என்று சொன்னாங்க.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 28. ta-16 (story) - fails 100% of 4 runs

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__Pallavi__r0__ta`): என்னை இருந்து இருபதாயிரம் ருபீஸ் டெபிட் ஆயிடுச்சு, ICICI பாங்க் ஒரு மணி நேரத்துக்கு முன்னாடி காஸ்டுமாக்கு கால் பண்ணேன்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |

### 29. mr-18 (story) - fails 100% of 4 runs

- Reference: अडीच लाख रुपये गुंतवणुकीच्या नावाखाली घेतले, पैसे दुप्पट होतील म्हणाले, येस बँक
- Transcript (`mr-18__Aarohi__r0__mr`): अडीच लाख रुपे गुन्तवनुकी चा नावा खाली घितले पैसे दुपट होतील मनाले येस बंग

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: दुप्पट |

### 30. mr-01 (story) - fails 100% of 4 runs

- Reference: माझ्या SBI खात्यातून पाच हजार रुपये कापले गेले, दहा मिनिटांपूर्वी एका माणसाने KYC अपडेट करायला सांगितले
- Transcript (`mr-01__Aarohi__r0__mr`): माझा SBI खात्यातून 5000 रुपे कापले गेले 10 मिनितान पूर्वी एका मानसाने अपनेट करायला संगितले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 31. mr-07 (story) - fails 100% of 4 runs

- Reference: एक क्यूआर कोड पाठवला आणि स्कॅन करा पैसे मिळतील म्हणाले, स्कॅन केल्यावर ₹4,999 कापले गेले, आज सकाळी साडेदहा वाजता
- Transcript (`mr-07__Aarohi__r0__mr`): एक QR कोड पाठवला आणी स्कैन करा पैसे मिलतील मणाले, स्कैन केले अवर 4,999 रुपे कापले गेले, आज सकारी साडे धा वाजता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: साडेदहा |

### 32. en-31 (answer:utr) - fails 80% of 5 runs

- Reference: Your A/c XX4321 has been debited via UPI. UPI Ref No 4 5 6 7 8 9 0 1 2 3 4 5. Not you? Call your bank.
- Transcript (`en-31__Neerja__r0__en`): Your ACXX 4321 has been debited via UPI. UPI Ref No. 4567-8901-345. Not you? Call your bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 456789012345 | - | 456789012345 | **asr**: value not in the transcript |

### 33. en-32 (answer:utr) - fails 80% of 5 runs

- Reference: the reference number is 6012 3456 7890
- Transcript (`en-32__Neerja__r0__en`): The reference number is 601-345-67890.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 601234567890 | - | 601234567890 | **asr**: value not in the transcript |

### 34. en-13 (story) - fails 60% of 5 runs

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__NeerjaExpressive__r0__en`): KAL RAT SAADE NAU BAJAY KISI NAY KALL KIA BOLA BIJLI KA BILL PENDING HAY. LINK PE CLICK KIA OR 9999 RUPEI CAT GAY.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 21:30 (870 min ago) | -1d 12:00 (1440 min ago) | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: raat baje |

### 35. hi-11 (story) - fails 50% of 4 runs

- Reference: डेढ़ लाख रुपये गए हैं मेरे, बैंक ऑफ बड़ौदा का अकाउंट है, कल रात दस बजे
- Transcript (`hi-11__Swara__r0__babble15__hi`): देड लाख रुपए गए हैं मेरे बैंक ओफ बड़ोदा का अकाउंट है कल राद दस बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 22:00 (840 min ago) | -1d 10:00 (1560 min ago) | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: रात |

### 36. hi-01 (story) - fails 50% of 4 runs

- Reference: मेरे अकाउंट से पाँच हज़ार रुपये कट गए, दस मिनट पहले एक आदमी ने बोला केवाईसी अपडेट करो, एसबीआई का अकाउंट है
- Transcript (`hi-01__Madhur__r0__babble15__hi`): मेरे अकाउंट से 5000 रुपए कट गए 10 मिनट पहले एक आदमी ने बोला के वाईसी अपडेट करो SBI का अकाउंट है

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **extractor_form**: key words survive (केवाईसी) but the extractor fails |

### 37. hi-14 (story) - fails 50% of 4 runs

- Reference: आईसीआईसीआई बैंक के कस्टमर केयर का नंबर गूगल पे सर्च किया था, उसने बोला एक ऐप डालो, फिर मेरे अकाउंट से बीस हज़ार रुपये चले गए, लगभग एक घंटा पहले
- Transcript (`hi-14__Madhur__r0__hi`): आई-सी-ाई-सी-ाई बैंड के कस्टमर केयर का नंबर गूगल पे सर्च किया था. उसने बोला एक एप डालो, फिर मेरे अकाउंट से 20,000 रुपए चले गए, लगभग एक घंटा पहले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | ICICI Bank | - | ICICI Bank | **extractor_form**: near-spelling variant of: आईसीआईसीआई |

### 38. en-04 (story) - fails 40% of 5 runs

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__Prabhat__r0__pink15__en`): Bhaya Paanch Nahi Nahi 6000 Rupees Gaya Hain Phon Peh Se Abhi Abhi

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 39. en-02 (story) - fails 40% of 5 runs

- Reference: Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai
- Transcript (`en-02__NeerjaExpressive__r0__en`): New York account say paanch huzaal rupay cat gay. Daas minute pehle ek aadmi ne bola KYC update karo. SBI ka account hai.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 5 | 5000 | **asr**: value not in the transcript |

### 40. hi-10 (story) - fails 25% of 4 runs

- Reference: मैंने यूपीआई आईडी rahul dot kyc at ybl पर आठ हज़ार रुपये भेजे, बीस मिनट पहले
- Transcript (`hi-10__Swara__r0__pink5__hi`): मैंने UPI ID rahul.kyc at ybn पर 8000 रुपए भीजे 20 मिनिट पहले।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |
