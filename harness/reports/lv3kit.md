# Turant pipeline eval: lv3kit

Generated 2026-11-23T18:09:23.323Z. Extractor: `round2-kit/voice-kit (fraud app)`. 280 cases, 1006 ASR transcripts scored, **504 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).
Deltas in brackets are against `reports/baseline.json`.

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 (+44.3) | 100.0 | 100.0 | 100.0 | 100.0 (+22.4) | - | - |
| ASR clean, normal rate | 600 | 61.3 (+34.2) | 61.3 | 90.1 | 75.0 | 81.9 (+30.8) | 56.9 | 32.5 |
| ASR noise 15 dB | 203 | 58.6 (+34.0) | 58.6 | 89.4 | 73.1 | 80.5 (+31.4) | 61.0 | 36.5 |
| ASR noise 5 dB | 203 | 47.3 (+28.0) | 47.8 | 87.7 | 63.3 | 73.5 (+33.1) | 60.2 | 39.0 |
| ASR rate -15% / +15% | 0 | - (NaN) | - | - | - | - (NaN) | - | - |
| ASR all (forced language) | 1006 | 58.0 (+33.1) | 58.1 | 89.5 | 72.2 | 80.0 (+31.8) | 58.4 | 34.7 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 64.8% of clean runs and 61.9% of all runs fully correct. Per language (clean): hi 94%, en 88%, bn 36%, ta 58%, te 56%, mr 74%, kn 36%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 87.3 | 77.7 | 82.2 (+39.4) | 80.6 |
| time | 113 | 100.0 | 100.0 | 100.0 | 81.8 | 77.8 | 79.7 (+34.6) | 78.2 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 99.2 | 74.3 | 85.0 (+21.4) | 82.3 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 98.3 | 85.0 | 91.1 (+28.6) | 88.5 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 88.9 | 94.1 (+33.2) | 89.7 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 86.4 | 42.2 | 56.7 (+27.6) | 54.5 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 100.0 | 55.6 | 71.4 (-6.5) | 68.1 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 88.6 | 49.2 | 63.3 (+20.4) | 65.4 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 50.0 | 46.7 | 48.3 (+13.5) | 52.2 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 60.0 | 75.0 (+17.9) | 71.8 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 90.1 | 75.0 | 81.9 (+30.8) | 80.0 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 (+20.0) | 91.3 (+33.8) | 65.0 | 100.0 | 96.6 | 35.2 | 20.7 | 93.8 (n=16) |
| en | 100.0 (+12.5) | 87.5 (+24.2) | 75.0 | 100.0 | 95.9 | 28.7 | 17.1 | 66.7 (n=27) |
| bn | 100.0 (+67.5) | 32.5 (+23.8) | 22.5 | 100.0 | 64.2 | 81.6 | 44.9 | 50.0 (n=16) |
| ta | 100.0 (+55.0) | 56.3 (+46.3) | 32.5 | 100.0 | 80.4 | 46.6 | 26.0 | 18.8 (n=16) |
| te | 100.0 (+55.0) | 52.5 (+42.5) | 42.5 | 100.0 | 75.1 | 110.9 | 75.5 | 31.3 (n=16) |
| mr | 100.0 (+47.5) | 65.0 (+46.3) | 33.3 | 100.0 | 87.0 | 67.7 | 26.4 | 75.0 (n=16) |
| kn | 100.0 (+52.5) | 31.3 (+27.5) | - | 100.0 | 59.1 | 69.1 | 29.8 | 18.8 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 92.6 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 98.2 | 100.0 / 100.0 | 100.0 / 90.9 | 100.0 / 100.0 | 100.0 / 85.7 | 100.0 / 100.0 |
| en | 100.0 / 93.1 | 100.0 / 98.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 61.5 | 100.0 / 100.0 | 100.0 / 84.6 | 100.0 / 100.0 |
| bn | 100.0 / 61.4 | 100.0 / 58.6 | 100.0 / 53.3 | 100.0 / 87.3 | 100.0 / 66.7 | 100.0 / 80.0 | 100.0 / - | 100.0 / 54.5 | 100.0 / 50.0 |
| ta | 100.0 / 80.0 | 100.0 / 85.7 | 100.0 / 87.8 | 100.0 / 85.7 | 100.0 / 100.0 | 100.0 / 0.0 | 100.0 / 66.7 | 100.0 / 50.0 | 100.0 / - |
| te | 100.0 / 88.6 | 100.0 / 58.1 | 100.0 / 74.3 | 100.0 / 86.8 | 100.0 / 100.0 | 100.0 / 50.0 | 100.0 / 66.7 | 100.0 / 36.4 | 100.0 / 0.0 |
| mr | 100.0 / 93.8 | 100.0 / 81.3 | 100.0 / 81.1 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 80.0 | 100.0 / - | 100.0 / 66.7 | 100.0 / 50.0 |
| kn | 100.0 / 56.8 | 100.0 / 62.3 | 100.0 / 66.7 | 100.0 / 72.7 | 100.0 / 85.7 | 100.0 / 0.0 | 100.0 / - | 100.0 / 33.3 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 64 | 57.8 | 79.0 | 79.6 | 46.0 |
| babble 5 dB | 64 | 34.4 | 62.0 | 69.7 | 47.8 |
| clean | 600 | 61.3 | 81.9 | 56.9 | 32.5 |
| pink 15 dB | 70 | 52.9 | 76.3 | 55.6 | 33.5 |
| pink 5 dB | 70 | 40.0 | 68.0 | 57.0 | 34.1 |
| traffic 15 dB | 69 | 65.2 | 86.0 | 50.9 | 31.0 |
| traffic 5 dB | 69 | 66.7 | 88.4 | 55.3 | 35.7 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 600 | 61.3 | 81.9 | 56.9 |
| 15 dB | 203 | 58.6 | 80.5 | 61.0 |
| 5 dB | 203 | 47.3 | 73.5 | 60.2 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 42.5 | 70.0 | 82.8 | 45.8 |
| bn-IN-TanishaaNeural | 40 | 22.5 | 58.2 | 80.4 | 44.0 |
| en-IN-NeerjaExpressiveNeural | 40 | 82.5 | 92.7 | 31.3 | 18.5 |
| en-IN-NeerjaNeural | 40 | 90.0 | 97.5 | 27.7 | 17.1 |
| en-IN-PrabhatNeural | 40 | 90.0 | 97.5 | 27.0 | 15.6 |
| hi-IN-MadhurNeural | 40 | 87.5 | 95.0 | 35.1 | 19.7 |
| hi-IN-SwaraNeural | 40 | 95.0 | 98.2 | 35.3 | 21.7 |
| kn-IN-GaganNeural | 40 | 30.0 | 58.2 | 69.2 | 28.4 |
| kn-IN-SapnaNeural | 40 | 32.5 | 60.0 | 69.0 | 31.3 |
| mr-IN-AarohiNeural | 40 | 72.5 | 89.5 | 69.7 | 26.8 |
| mr-IN-ManoharNeural | 40 | 57.5 | 84.6 | 65.6 | 26.0 |
| ta-IN-PallaviNeural | 40 | 60.0 | 81.1 | 46.7 | 26.2 |
| ta-IN-ValluvarNeural | 40 | 52.5 | 79.7 | 46.5 | 25.8 |
| te-IN-MohanNeural | 40 | 55.0 | 75.5 | 86.0 | 64.5 |
| te-IN-ShrutiNeural | 40 | 50.0 | 74.6 | 135.8 | 86.6 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 600 | 61.3 | 81.9 | 56.9 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 330 | 100.0 | 55.8 | 84.0 |
| correction | 60 | 100.0 | 65.0 | 67.8 |
| answer | 195 | 100.0 | 69.7 | 76.8 |
| answer (skip intent) | 15 | 100.0 | 60.0 | 75.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 602 | 537 (89%) | 65 (11%) | 0 (0%) | 0 |
| clean | 322 | 287 (89%) | 35 (11%) | 0 (0%) | 0 |
| 15 dB | 118 | 104 (88%) | 14 (12%) | 0 (0%) | 0 |
| 5 dB | 162 | 146 (90%) | 16 (10%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 154 | 144 | 10 | 0 |
| time | 116 | 106 | 10 | 0 |
| scamType | 91 | 84 | 7 | 0 |
| bank | 67 | 56 | 11 | 0 |
| suspectPhone | 52 | 45 | 7 | 0 |
| utr | 45 | 39 | 6 | 0 |
| suspectUpi | 29 | 25 | 4 | 0 |
| paymentApp | 20 | 12 | 8 | 0 |
| suspectAccount | 17 | 17 | 0 | 0 |
| intent | 11 | 9 | 2 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 33 | 22 | 11 | 0 |
| en | 40 | 37 | 3 | 0 |
| bn | 170 | 161 | 9 | 0 |
| ta | 108 | 97 | 11 | 0 |
| te | 131 | 117 | 14 | 0 |
| mr | 35 | 25 | 10 | 0 |
| kn | 85 | 78 | 7 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | bn | asr | fn | 30 | bn-01 bn-03 bn-07 bn-08 bn-09 bn-16 bn-18 bn-35 |
| 2 | amount | bn | asr | fn | 26 | bn-01 bn-05 bn-06 bn-10 bn-14 bn-17 bn-37 bn-02 +3 |
| 3 | amount | bn | asr | wrong | 24 | bn-03 bn-07 bn-11 bn-12 bn-20 bn-21 bn-24 bn-02 +1 |
| 4 | amount | te | asr | fn | 20 | te-10 te-14 te-15 te-16 te-02 te-04 te-17 te-20 +1 |
| 5 | bank | ta | asr | fn | 17 | ta-13 ta-17 ta-18 ta-21 ta-30 ta-29 |
| 6 | time | bn | asr | wrong | 16 | bn-03 bn-07 bn-26 bn-28 bn-40 |
| 7 | scamType | te | asr | fn | 16 | te-01 te-08 te-09 te-16 te-35 |
| 8 | time | te | asr | fn | 16 | te-10 te-13 te-15 te-16 te-28 te-02 te-20 |
| 9 | bank | bn | asr | fn | 14 | bn-05 bn-16 bn-18 bn-01 bn-02 bn-03 bn-38 |
| 10 | amount | kn | asr | fn | 14 | kn-01 kn-03 kn-05 kn-10 kn-11 kn-12 kn-14 kn-16 +2 |
| 11 | scamType | ta | asr | fn | 13 | ta-05 ta-16 ta-18 ta-04 ta-08 ta-09 |
| 12 | amount | ta | asr | wrong | 13 | ta-07 ta-10 ta-20 ta-21 ta-17 |
| 13 | time | te | asr | fp | 13 | te-09 te-19 te-31 te-33 |
| 14 | suspectPhone | bn | asr | fn | 12 | bn-09 bn-22 bn-39 bn-33 |
| 15 | bank | kn | asr | fn | 12 | kn-01 kn-03 kn-05 kn-16 kn-18 kn-30 kn-38 |
| 16 | time | bn | asr | fn | 11 | bn-03 bn-10 bn-11 bn-27 bn-02 bn-04 |
| 17 | time | ta | asr | wrong | 11 | ta-20 ta-26 ta-28 ta-40 |
| 18 | scamType | kn | asr | fn | 11 | kn-01 kn-05 kn-07 kn-09 kn-16 kn-35 |
| 19 | amount | ta | asr | fn | 9 | ta-11 ta-12 ta-16 ta-18 ta-20 |
| 20 | utr | ta | asr | fn | 9 | ta-14 ta-31 ta-32 |
| 21 | bank | te | asr | fn | 9 | te-03 te-16 te-18 te-01 te-17 te-21 |
| 22 | amount | kn | asr | wrong | 9 | kn-04 kn-07 kn-13 kn-20 kn-25 kn-37 |
| 23 | utr | en | asr | fn | 8 | en-31 en-32 |
| 24 | suspectUpi | bn | asr | fn | 8 | bn-10 bn-34 |
| 25 | suspectPhone | ta | asr | fn | 8 | ta-09 ta-33 |
| 26 | time | te | asr | wrong | 8 | te-04 te-20 te-26 |
| 27 | suspectPhone | te | asr | fn | 8 | te-09 te-22 te-33 |
| 28 | utr | te | asr | fn | 8 | te-14 te-31 te-32 |
| 29 | time | kn | asr | wrong | 8 | kn-03 kn-20 kn-26 kn-40 |
| 30 | scamType | mr | asr | fn | 7 | mr-01 mr-03 mr-18 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. bn-03 (story) - fails 100% of 4 runs

- Reference: গতকাল সন্ধ্যা সাতটায় কাস্টমার কেয়ার থেকে ফোন এসেছিল, AnyDesk ইনস্টল করতে বলল, তারপর এইচডিএফসি অ্যাকাউন্ট থেকে দুই লাখ টাকা কেটে নিল
- Transcript (`bn-03__Bashkar__r0__bn`): ্রে ক্ষ্টমার কেয়ে থেকে ফন এশে ছিলো, এনে ডেসক ইন্স্টল কুর্তে বল্লো, তার পর HDFC একাউন্ট থেকে দুই লাক তাকা কেটে নিলো.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 200000 | 2 | 200000 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 2. bn-07 (story) - fails 100% of 4 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__Bashkar__r0__bn`): A তে কিয়ার কোড পাঠে বল্লো স্কান করুন তাকা পাবেন. স্কান করতে 4,999 টাকা কেটে গালো. আজ সকাল সারে দস্টায়.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 10:30 (90 min ago) | today 09:00 (180 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: সাড়ে দশটায় |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: স্ক্যান |

### 3. ta-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl க்கு எட்டாயிரம் ரூபாய் அனுப்பினேன், இருபது நிமிஷத்துக்கு முன்னாடி
- Transcript (`ta-10__Pallavi__r0__ta`): UBI ID rahul.kyc at ypl.com 80000 ரூபாய் அனிப்பினேன் 20 நிமிஷத்துக்கு முன்னாடி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 8000 | 80000 | 8000 | **asr**: value not in the transcript |
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 4. bn-10 (story) - fails 100% of 4 runs

- Reference: আমি UPI ID rahul dot kyc at ybl এ আট হাজার টাকা পাঠিয়েছি, কুড়ি মিনিট আগে
- Transcript (`bn-10__Bashkar__r0__bn`): আমি আপা এদ্ রাহুল ডাক্খাকের ইবো এ আঠ হাজার তকা পাঠেয়েছি কুডি মিনিট আগে

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 5. bn-16 (story) - fails 100% of 4 runs

- Reference: আমার account থেকে 20,000 টাকা debit হয়ে গেছে, ICICI bank, এক ঘণ্টা আগে customer care এ ফোন করেছিলাম
- Transcript (`bn-16__Bashkar__r0__bn`): আমারা কান্থেকে কুডি হাজার তাকা দেবের হোয়ে গেছে. এসাসে বেক, এক ঘন্টা আগে কাস্টমার কের এ ফন করে ছিলম.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 6. te-09 (story) - fails 100% of 4 runs

- Reference: కాల్ వచ్చిన నంబర్ 9 8 7 6 5... 4 3 2 1 0, బ్యాంక్ నుండి మాట్లాడుతున్నాం, KYC చేయకపోతే అకౌంట్ బ్లాక్ అవుతుందని చెప్పారు
- Transcript (`te-09__Mohan__r0__te`): call వచ్చిన number 98765 43221 గంటసున్నా bank నుంది మాట్లాడుతునామ్ కెవాయసి చేయకపోతే account బ్లాక అవుతుందని చెప్పారు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| suspectPhone | wrong | 9876543210 | 9876543221 | 9876543210 | **asr**: value not in the transcript |

### 7. te-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl కి ఎనిమిది వేల రూపాయలు పంపాను, ఇరవై నిమిషాల క్రితం
- Transcript (`te-10__Mohan__r0__te`): UPA ID Rahul.kyc at ybl.ki enimidi vela rupayalu pampanu, irawai nimishala kritham.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: నిమిషాల క్రితం |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **extractor_form**: value is in the transcript but not parsed |

### 8. te-33 (answer:suspect) - fails 100% of 4 runs

- Reference: వాడి నంబర్ 7 0 1 1 2 2 3 3 4 4
- Transcript (`te-33__Mohan__r0__te`): 1.00 1.00 2.00 3.00 3.00 4.00

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 13:00 (1380 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |
| suspectAccount | fp | - | 100100200300300400 | - | **asr**: spurious value from a mis-recognised transcript |

### 9. te-16 (story) - fails 100% of 4 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__Mohan__r0__te`): ನಾ ಕಾಂಟ್ జುಂಡಿ జಾವಾಯ వೇಲు రುಪಿಸ್ జಾವాಯ వೇಲు రುపిಸ్ జాವాಯ వేಲు రుపిస్ జావాಯ వేలు రుపిస్ జావాಯ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రుపిస్ జావాయ వేలు రు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: గంట క్రితం |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 10. bn-08 (story) - fails 100% of 4 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__Bashkar__r0__bn`): A তা ঵িডিও কল এশে ছিলো, রেকাড করে এখন ব্লাকমেল কুরছে, পেতিয়ন দিয়ে পনেরো হাজার তাকা দিয়ে দিয়ে ছি.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: পেটিএম |

### 11. bn-09 (story) - fails 100% of 4 runs

- Reference: যে নম্বর থেকে ফোন এসেছিল সেটা হল 9 8 7 6 5... 4 3 2 1 0, বলল ব্যাংক থেকে বলছি, KYC না করলে অ্যাকাউন্ট বন্ধ হয়ে যাবে
- Transcript (`bn-09__Bashkar__r0__bn`): 43210 বল্বেন্ক থেকে বলছি থাইক না করলে একাউন্ত বন্ধ হোয়ে জাবে

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 12. ta-18 (story) - fails 100% of 4 runs

- Reference: இரண்டரை லட்சம் ரூபாய் முதலீடு பண்ண சொல்லி வாங்கிட்டாங்க, பணம் டபுள் ஆகும்னு சொன்னாங்க, யெஸ் பேங்க்
- Transcript (`ta-18__Pallavi__r0__ta`): இரண்டறே லட்சம் ரூபாய் முதலிடு பண்ண சொல்லி வாங்கிட்டாங்க. பணம் தபுள் ஆகும்னு சொன்னாங்க. ஏஸ் பெங்க.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: யெஸ் பேங்க் |

### 13. ta-20 (story) - fails 100% of 4 runs

- Reference: உம்... அதாவது, நேற்று மதியம் 2:30 மணிக்கு போன்பே மூலமா இரண்டாயிரத்து அறுநூறு ரூபாய் போச்சு
- Transcript (`ta-20__Pallavi__r0__ta`): ஓங்! அதாவது, நேற்று மதியம் இரண்டு மணி முப்பது நிமிணம் மணிக்கு போன்பே மூலமா இரண்டாயரத்து அரணூரு ரூபாய் போச்சு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2600 | 30 | 2600 | **asr**: value not in the transcript |
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: 2:30 |

### 14. te-14 (story) - fails 100% of 4 runs

- Reference: UPI రిఫరెన్స్ నంబర్ 4 0 3 2 1 8 7 6 5 4 3 2, ఐదు వేల రూపాయలు పోయాయి
- Transcript (`te-14__Mohan__r0__te`): UPA Reference No. 40322187654325000 రూపాయలు పోయాయి.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 15. te-19 (story) - fails 100% of 4 runs

- Reference: డబ్బులు వెళ్ళిన అకౌంట్ నంబర్ 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`te-19__Mohan__r0__te`): 1. దబ్బులు వేళ్ళిన అకాంట్ నంబర్ 5.00.1.00.2.3.4.5.6.7.8.1.2.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 17:00 (1140 min ago) | - | **extractor_form**: spurious value from a near-correct transcript |
| suspectAccount | fn | 50100234567812 | - | 50100234567812 | **asr**: value not in the transcript |

### 16. ta-21 (story) - fails 100% of 4 runs

- Reference: கரண்ட் பில் மெசேஜ் வந்தது, லிங்க் கிளிக் பண்ணேன், 9999 ரூபாய் கட் ஆச்சு, ஸ்டேட் பேங்க்
- Transcript (`ta-21__Pallavi__r0__ta`): Current bill message வந்தது. Link கேளிக் பண்ணேன். 9000-9090 ரூபாய் கட் ஆச்சு. State PIN.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 9999 | 9090 | 9999 | **asr**: value not in the transcript |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: ஸ்டேட் பேங்க் |

### 17. kn-16 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ನನ್ನ ಅಕ್ಕಾಂಟಿಂದ ಇಪ್ಪತ್ತು ಸಾವರು ರೂಪಿಸ್ ಡೇವೆಟ್ ಆಯಿತು, ಎಸೇಶಿ ಬೆಂಕ್ ಒಂದು ಗಂಟೆ ಹಿಂದೆ ಕಸ್ಟಮರ್ ಕೇರಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 18. en-20 (story) - fails 100% of 5 runs

- Reference: uh the guy called from 9 8 1 1 1, 2 2 2 3 3 and said he is from the electricity board
- Transcript (`en-20__Neerja__r0__en`): And the guy called from 98111 to 2233 and said he is from the electricity board.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 19. ta-09 (story) - fails 100% of 4 runs

- Reference: கால் வந்த நம்பர் 9 8 7 6 5... 4 3 2 1 0, பேங்க்ல இருந்து பேசறோம், KYC பண்ணலைன்னா அக்கவுண்ட் பிளாக் ஆயிடும்னு சொன்னாங்க
- Transcript (`ta-09__Pallavi__r0__ta`): கால் வந்த 9, 8, 7, 6, 5, 4, 3, 2, 1 பூஜ்யம் பேங்கில இருந்து பேசறோம் கேவாயசி பண்ணலின்னா அக்கவொன் பிலாக் ஆயிடும் என்று சொன்னாங்க.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 20. ta-16 (story) - fails 100% of 4 runs

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__Pallavi__r0__ta`): என்னை இருந்து இருபதாயிரம் ருபீஸ் டெபிட் ஆயிடுச்சு, ICICI பாங்க் ஒரு மணி நேரத்துக்கு முன்னாடி காஸ்டுமாக்கு கால் பண்ணேன்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |

### 21. kn-01 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): ನನ್ನ ಸಬೈ ಕಾತೆಯಿಂದ ಆಯದು ಸಾವಿರು ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ. ಹತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು ಕೆಕ್ ಅಪ್ಪೇಟ್ ಮಾಡಲು ಹೇಳಿದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 22. kn-03 (story) - fails 100% of 2 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__Gagan__r0__kn`): ನಿನ್ನೆ ಸಂಜಿ ಏಳು ಗಂಟಗೆ ಕಸ್ಟಮರ್ ಕೇರ್ಣಿಂದ ಕರೆಬಂತು ಎನಿಡಿಸ್ಕ ಇಂಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು. ನಂತರ ಹಡಿಫ್ಸಕಾತೆಯಿಂದ ಎರ್ಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: ಸಂಜೆ |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 23. mr-01 (story) - fails 100% of 4 runs

- Reference: माझ्या SBI खात्यातून पाच हजार रुपये कापले गेले, दहा मिनिटांपूर्वी एका माणसाने KYC अपडेट करायला सांगितले
- Transcript (`mr-01__Aarohi__r0__mr`): माझा SBI खात्यातून 5000 रुपे कापले गेले 10 मिनितान पूर्वी एका मानसाने अपनेट करायला संगितले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 24. mr-39 (correction) - fails 100% of 2 runs

- Reference: नंबर चुकीचा, 9 8 1 1 1 2 2 2 3 3
- Transcript (`mr-39__Aarohi__r0__mr`): नमबर चुकीचा 981112233

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 981112233 | - | **extractor_form**: spurious value from a near-correct transcript |
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 25. kn-05 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ ಖಾತೆಯಿಂದ ಐದು... ಇಲ್ಲ ಇಲ್ಲ, ಆರು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು, OTP ಹೇಳಿಬಿಟ್ಟೆ, ಕೆನರಾ ಬ್ಯಾಂಕ್
- Transcript (`kn-05__Gagan__r0__kn`): ನನ್ನ ಕಾತೆಯಿಂದ ಆಯಿದು. ಇಲ್ಲಾ ಇಲ್ಲಾ, ಆರುಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ಟಾಯಿತು, ಓತ್ ಹೇಳಿಬಿಟ್ಟೆ, ಕೆನನ ಬೆಂಗ್.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: OTP |
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: ಕೆನರಾ |

### 26. kn-07 (story) - fails 100% of 2 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__Gagan__r0__kn`): ಒಂದು ರಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು. ಸ್ಕಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ನಾಲ್ಕು 1999 ರೂಪಾಯಿ ಹೋಯಿತು ಇಂದು ಬಳಿಗ್ಗೆ ಹತ್ತು ಗಂಟಿಗೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 2003 | 4999 | **asr**: value not in the transcript |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 27. kn-09 (story) - fails 100% of 2 runs

- Reference: ಕರೆ ಬಂದ ನಂಬರ್ 9 8 7 6 5... 4 3 2 1 0, ಬ್ಯಾಂಕ್‌ನಿಂದ ಮಾತನಾಡುತ್ತಿದ್ದೇವೆ, KYC ಮಾಡದಿದ್ದರೆ ಖಾತೆ ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ ಎಂದರು
- Transcript (`kn-09__Gagan__r0__kn`): ಕರೆಬಂದ ನಮ್ಬರ್ 98765 ನಾಲ್ಕು 3710 ಬೆಂಕ್ ನಿಂದ ಮಾತನಾಡುತ್ತಿದ್ದೇವೆ ಕೈಕ್ಮಾಡದಿದ್ದರೆ ಕಾತೆ ಬ್ಲಾಕ್ ಆಗುತ್ತದೇ ಎಂದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 28. mr-09 (story) - fails 100% of 2 runs

- Reference: ज्या नंबरवरून फोन आला तो 9 8 7 6 5... 4 3 2 1 0, म्हणाला बँकेतून बोलतोय, केवायसी केलं नाही तर खातं बंद होईल
- Transcript (`mr-09__Aarohi__r0__mr`): जा नंबर वरून फोन आला तो 98765432100 भणाला बंकेतून बोलतोई केवा ऐसी केल नाही तर खात बंद होई।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **extractor_form**: near-spelling variant of: केवायसी |
| suspectPhone | fn | 9876543210 | - | 9876543210 | **extractor_form**: value is in the transcript but not parsed |

### 29. mr-07 (story) - fails 100% of 2 runs

- Reference: एक क्यूआर कोड पाठवला आणि स्कॅन करा पैसे मिळतील म्हणाले, स्कॅन केल्यावर ₹4,999 कापले गेले, आज सकाळी साडेदहा वाजता
- Transcript (`mr-07__Aarohi__r0__mr`): एक QR कोड पाठवला आणी स्कैन करा पैसे मिलतील मणाले, स्कैन केले अवर 4,999 रुपे कापले गेले, आज सकारी साडे धा वाजता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: साडेदहा |

### 30. mr-10 (story) - fails 100% of 2 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__Aarohi__r0__mr`): आईडी राहूल डियोटी आट वर आठ हजार रुपे पाठवले 20 मिनिताम कूर्वी

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 31. mr-18 (story) - fails 100% of 2 runs

- Reference: अडीच लाख रुपये गुंतवणुकीच्या नावाखाली घेतले, पैसे दुप्पट होतील म्हणाले, येस बँक
- Transcript (`mr-18__Aarohi__r0__mr`): अडीच लाख रुपे गुन्तवनुकी चा नावा खाली घितले पैसे दुपट होतील मनाले येस बंग

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: दुप्पट |

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

### 34. hi-15 (story) - fails 75% of 4 runs

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): पैसे कट गए UTR नमबर है 4032187654325000 रुपए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | 403218765432 | **extractor_form**: value is in the transcript but not parsed |

### 35. hi-09 (story) - fails 75% of 4 runs

- Reference: जिस नंबर से फोन आया था वो है 9 8 7 6 5... 4 3 2 1 0, उसने बोला बैंक से बोल रहा हूँ, केवाईसी नहीं किया तो खाता बंद हो जाएगा
- Transcript (`hi-09__Swara__r0__hi`): जिस नंबर से फोन आया था वो है 98765. 43210 उसने बोला बैंक से बोल रहा हूँ के वाईसी नहीं किया तो खाता बंध हो जाएगा.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9876543210 | - | 9876543210 | **extractor_form**: value is in the transcript but not parsed |

### 36. en-13 (story) - fails 60% of 5 runs

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__NeerjaExpressive__r0__en`): KAL RAT SAADE NAU BAJAY KISI NAY KALL KIA BOLA BIJLI KA BILL PENDING HAY. LINK PE CLICK KIA OR 9999 RUPEI CAT GAY.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 21:30 (870 min ago) | -1d 12:00 (1440 min ago) | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: raat baje |

### 37. hi-11 (story) - fails 50% of 4 runs

- Reference: डेढ़ लाख रुपये गए हैं मेरे, बैंक ऑफ बड़ौदा का अकाउंट है, कल रात दस बजे
- Transcript (`hi-11__Swara__r0__babble15__hi`): देड लाख रुपए गए हैं मेरे बैंक ओफ बड़ोदा का अकाउंट है कल राद दस बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 22:00 (840 min ago) | -1d 10:00 (1560 min ago) | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: रात |

### 38. hi-27 (answer:amount) - fails 50% of 4 runs

- Reference: उम्म... बारह सौ
- Transcript (`hi-27__Madhur__r0__hi`): उम्मत बारा सौँ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 1200 | 12 | 1200 | **asr**: value not in the transcript |

### 39. hi-01 (story) - fails 50% of 4 runs

- Reference: मेरे अकाउंट से पाँच हज़ार रुपये कट गए, दस मिनट पहले एक आदमी ने बोला केवाईसी अपडेट करो, एसबीआई का अकाउंट है
- Transcript (`hi-01__Madhur__r0__babble15__hi`): मेरे अकाउंट से 5000 रुपए कट गए 10 मिनट पहले एक आदमी ने बोला के वाईसी अपडेट करो SBI का अकाउंट है

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **extractor_form**: key words survive (केवाईसी) but the extractor fails |

### 40. hi-14 (story) - fails 50% of 4 runs

- Reference: आईसीआईसीआई बैंक के कस्टमर केयर का नंबर गूगल पे सर्च किया था, उसने बोला एक ऐप डालो, फिर मेरे अकाउंट से बीस हज़ार रुपये चले गए, लगभग एक घंटा पहले
- Transcript (`hi-14__Madhur__r0__hi`): आई-सी-ाई-सी-ाई बैंड के कस्टमर केयर का नंबर गूगल पे सर्च किया था. उसने बोला एक एप डालो, फिर मेरे अकाउंट से 20,000 रुपए चले गए, लगभग एक घंटा पहले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | ICICI Bank | - | ICICI Bank | **extractor_form**: near-spelling variant of: आईसीआईसीआई |
