# Turant pipeline eval: kit17

Generated 2026-11-23T12:22:37.430Z. Extractor: `round2-kit/voice-kit (fraud app)`. 280 cases, 1510 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).
Deltas in brackets are against `reports/baseline.json`.

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 (+44.3) | 100.0 | 100.0 | 100.0 | 100.0 (+22.4) | - | - |
| ASR clean, normal rate | 600 | 50.5 (+23.3) | 50.5 | 87.8 | 68.3 | 76.9 (+25.8) | 65.5 | 40.6 |
| ASR noise 15 dB | 280 | 39.6 (+15.0) | 39.6 | 83.5 | 57.2 | 67.9 (+18.9) | 73.8 | 45.0 |
| ASR noise 5 dB | 280 | 31.1 (+11.8) | 31.4 | 82.3 | 42.8 | 56.3 (+15.8) | 84.0 | 67.3 |
| ASR rate -15% / +15% | 280 | 47.1 (+21.4) | 47.1 | 86.1 | 64.5 | 73.7 (+25.5) | 65.5 | 43.4 |
| ASR all (forced language) | 1440 | 44.0 (+19.1) | 44.0 | 85.9 | 60.5 | 71.0 (+22.8) | 70.7 | 47.2 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 54.3% of clean runs and 47.8% of all runs fully correct. Per language (clean): hi 93%, en 79%, bn 39%, ta 25%, te 43%, mr 65%, kn 25%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 81.3 | 66.4 | 73.1 (+30.3) | 67.0 |
| time | 113 | 100.0 | 100.0 | 100.0 | 79.9 | 72.0 | 75.8 (+30.6) | 68.2 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 99.3 | 76.0 | 86.1 (+22.5) | 81.2 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 99.4 | 82.0 | 89.9 (+27.4) | 85.5 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 82.5 | 90.4 (+29.6) | 81.3 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 90.9 | 22.2 | 35.7 (+6.6) | 33.1 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 100.0 | 63.9 | 78.0 (+0.0) | 65.6 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 81.5 | 34.9 | 48.9 (+6.0) | 46.7 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 35.7 | 33.3 | 34.5 (-0.3) | 30.8 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 40.0 | 57.1 (+0.0) | 58.8 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 87.8 | 68.3 | 76.9 (+25.8) | 71.0 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 (+20.0) | 87.5 (+30.0) | 57.5 | 100.0 | 96.3 | 36.0 | 21.1 | 75.0 (n=16) |
| en | 100.0 (+12.5) | 77.5 (+14.2) | 70.0 | 100.0 | 89.5 | 36.6 | 34.7 | 70.4 (n=27) |
| bn | 100.0 (+67.5) | 35.0 (+26.3) | 17.5 | 100.0 | 64.2 | 76.1 | 50.1 | 12.5 (n=16) |
| ta | 100.0 (+55.0) | 20.0 (+10.0) | 15.0 | 100.0 | 57.6 | 134.4 | 47.8 | 0.0 (n=16) |
| te | 100.0 (+55.0) | 38.8 (+28.8) | 20.0 | 100.0 | 73.3 | 74.9 | 52.0 | 12.5 (n=16) |
| mr | 100.0 (+47.5) | 58.8 (+40.0) | 35.0 | 100.0 | 83.3 | 68.9 | 31.8 | 12.5 (n=16) |
| kn | 100.0 (+52.5) | 22.5 (+18.8) | 2.5 | 100.0 | 59.0 | 79.7 | 50.2 | 25.0 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 97.9 | 100.0 / 96.9 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / - | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 100.0 |
| en | 100.0 / 81.0 | 100.0 / 86.6 | 100.0 / 97.4 | 100.0 / 100.0 | 100.0 / 92.9 | 100.0 / 80.0 | 100.0 / 100.0 | 100.0 / 80.0 | 100.0 / 80.0 |
| bn | 100.0 / 62.8 | 100.0 / 68.9 | 100.0 / 53.3 | 100.0 / 84.6 | 100.0 / 76.9 | 100.0 / 28.6 | 100.0 / - | 100.0 / 40.0 | 100.0 / 0.0 |
| ta | 100.0 / 28.2 | 100.0 / 64.5 | 100.0 / 87.8 | 100.0 / 79.2 | 100.0 / 85.7 | 100.0 / 0.0 | 100.0 / 85.7 | 100.0 / 0.0 | 100.0 / - |
| te | 100.0 / 76.4 | 100.0 / 67.9 | 100.0 / 74.3 | 100.0 / 85.7 | 100.0 / 100.0 | 100.0 / - | 100.0 / 100.0 | 100.0 / 20.0 | 100.0 / - |
| mr | 100.0 / 90.3 | 100.0 / 78.1 | 100.0 / 92.7 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 50.0 | 100.0 / - | 100.0 / 22.2 | 100.0 / 0.0 |
| kn | 100.0 / 58.5 | 100.0 / 58.6 | 100.0 / 70.6 | 100.0 / 69.8 | 100.0 / 85.7 | 100.0 / 28.6 | 100.0 / - | 100.0 / 18.2 | 100.0 / 33.3 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 92 | 32.6 | 64.4 | 65.2 | 41.2 |
| babble 5 dB | 92 | 18.5 | 45.2 | 124.5 | 95.9 |
| clean | 880 | 49.4 | 75.9 | 65.5 | 41.5 |
| pink 15 dB | 99 | 38.4 | 65.5 | 92.6 | 55.5 |
| pink 5 dB | 99 | 28.3 | 51.7 | 71.5 | 63.4 |
| traffic 15 dB | 89 | 48.3 | 74.4 | 60.3 | 37.3 |
| traffic 5 dB | 89 | 47.2 | 70.9 | 57.9 | 41.4 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 600 | 50.5 | 76.9 | 65.5 |
| 15 dB | 280 | 39.6 | 67.9 | 73.8 |
| 5 dB | 280 | 31.1 | 56.3 | 84.0 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 37.5 | 64.7 | 79.4 | 51.6 |
| bn-IN-TanishaaNeural | 40 | 32.5 | 63.7 | 72.9 | 48.6 |
| en-IN-NeerjaExpressiveNeural | 40 | 82.5 | 91.4 | 37.9 | 26.5 |
| en-IN-NeerjaNeural | 40 | 77.5 | 89.2 | 35.6 | 25.9 |
| en-IN-PrabhatNeural | 40 | 72.5 | 87.7 | 36.4 | 51.6 |
| hi-IN-MadhurNeural | 40 | 87.5 | 96.3 | 36.6 | 20.3 |
| hi-IN-SwaraNeural | 40 | 87.5 | 96.3 | 35.4 | 21.8 |
| kn-IN-GaganNeural | 40 | 22.5 | 62.7 | 77.9 | 49.8 |
| kn-IN-SapnaNeural | 40 | 22.5 | 55.1 | 81.6 | 50.7 |
| mr-IN-AarohiNeural | 40 | 75.0 | 89.6 | 70.0 | 33.0 |
| mr-IN-ManoharNeural | 40 | 42.5 | 76.7 | 67.9 | 30.6 |
| ta-IN-PallaviNeural | 40 | 20.0 | 60.3 | 154.9 | 50.7 |
| ta-IN-ValluvarNeural | 40 | 20.0 | 54.7 | 113.8 | 44.9 |
| te-IN-MohanNeural | 40 | 45.0 | 76.9 | 74.5 | 50.6 |
| te-IN-ShrutiNeural | 40 | 32.5 | 69.2 | 75.2 | 53.5 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 600 | 50.5 | 76.9 | 65.5 |
| -15% | 147 | 46.9 | 73.7 | 64.6 |
| +15% | 133 | 47.4 | 73.8 | 66.2 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 330 | 100.0 | 45.5 | 79.7 |
| correction | 60 | 100.0 | 61.7 | 66.7 |
| answer | 195 | 100.0 | 56.4 | 67.8 |
| answer (skip intent) | 15 | 100.0 | 40.0 | 57.1 |

## Language auto-detect vs forced language token

70 clean clips transcribed twice. Forced: 55.7% fully correct (WER 80.9%). Auto-detect: 41.4% (WER 115.2%). Transcript in the wrong script under auto-detect: 52.9%.

| Lang | n | Forced fully correct % | Auto fully correct % | Auto wrong script % |
|---|---|---|---|---|
| hi | 10 | 90.0 | 80.0 | 10.0 |
| en | 10 | 70.0 | 70.0 | 40.0 |
| bn | 10 | 60.0 | 20.0 | 100.0 |
| ta | 10 | 30.0 | 30.0 | 10.0 |
| te | 10 | 50.0 | 10.0 | 100.0 |
| mr | 10 | 70.0 | 70.0 | 10.0 |
| kn | 10 | 20.0 | 10.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 1198 | 1103 (92%) | 95 (8%) | 0 (0%) | 0 |
| clean | 402 | 363 (90%) | 39 (10%) | 0 (0%) | 0 |
| 15 dB | 252 | 234 (93%) | 18 (7%) | 0 (0%) | 0 |
| 5 dB | 336 | 317 (94%) | 19 (6%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 370 | 351 | 19 | 0 |
| time | 237 | 217 | 20 | 0 |
| scamType | 134 | 129 | 5 | 0 |
| bank | 122 | 113 | 9 | 0 |
| suspectPhone | 102 | 99 | 3 | 0 |
| utr | 86 | 70 | 16 | 0 |
| paymentApp | 48 | 32 | 16 | 0 |
| suspectUpi | 43 | 43 | 0 | 0 |
| suspectAccount | 35 | 32 | 3 | 0 |
| intent | 21 | 17 | 4 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 47 | 34 | 13 | 0 |
| en | 80 | 74 | 6 | 0 |
| bn | 241 | 224 | 17 | 0 |
| ta | 254 | 239 | 15 | 0 |
| te | 189 | 178 | 11 | 0 |
| mr | 126 | 101 | 25 | 0 |
| kn | 261 | 253 | 8 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | ta | asr | fn | 65 | ta-03 ta-04 ta-07 ta-08 ta-10 ta-11 ta-12 ta-13 +12 |
| 2 | amount | kn | asr | fn | 54 | kn-03 kn-10 kn-13 kn-14 kn-16 kn-18 kn-23 kn-25 +14 |
| 3 | amount | bn | asr | fn | 40 | bn-06 bn-07 bn-11 bn-17 bn-18 bn-23 bn-01 bn-02 +10 |
| 4 | amount | te | asr | fn | 39 | te-01 te-07 te-08 te-11 te-13 te-21 te-23 te-25 +7 |
| 5 | scamType | bn | asr | fn | 38 | bn-01 bn-03 bn-07 bn-08 bn-09 bn-16 bn-35 bn-04 +1 |
| 6 | bank | kn | asr | fn | 35 | kn-01 kn-03 kn-05 kn-16 kn-17 kn-18 kn-30 kn-38 +3 |
| 7 | amount | ta | asr | wrong | 33 | ta-01 ta-06 ta-08 ta-12 ta-15 ta-20 ta-24 ta-25 +3 |
| 8 | time | kn | asr | fn | 33 | kn-10 kn-12 kn-13 kn-16 kn-20 kn-27 kn-01 kn-02 +4 |
| 9 | scamType | kn | asr | fn | 30 | kn-01 kn-05 kn-07 kn-09 kn-16 kn-35 kn-08 kn-18 |
| 10 | amount | bn | asr | wrong | 27 | bn-02 bn-03 bn-04 bn-07 bn-20 bn-21 bn-24 bn-10 +3 |
| 11 | bank | bn | asr | fn | 25 | bn-03 bn-16 bn-18 bn-38 bn-01 bn-02 bn-06 bn-11 +3 |
| 12 | time | ta | asr | wrong | 24 | ta-04 ta-11 ta-12 ta-20 ta-26 ta-40 ta-03 ta-28 |
| 13 | time | te | asr | fn | 24 | te-10 te-12 te-13 te-16 te-27 te-02 te-20 te-01 |
| 14 | scamType | te | asr | fn | 23 | te-01 te-09 te-16 te-35 te-07 te-08 |
| 15 | bank | te | asr | fn | 23 | te-01 te-16 te-18 te-21 te-12 te-13 te-17 te-29 +1 |
| 16 | bank | ta | asr | fn | 22 | ta-13 ta-17 ta-18 ta-21 ta-30 ta-01 ta-03 ta-12 +1 |
| 17 | amount | kn | asr | wrong | 22 | kn-04 kn-07 kn-11 kn-12 kn-20 kn-21 kn-24 kn-05 +1 |
| 18 | time | bn | asr | fn | 19 | bn-03 bn-11 bn-40 bn-02 bn-04 bn-10 bn-12 bn-26 +2 |
| 19 | suspectPhone | bn | asr | fn | 18 | bn-09 bn-22 bn-33 bn-39 |
| 20 | amount | en | asr | fn | 17 | en-04 en-13 en-16 en-02 en-17 en-18 en-25 |
| 21 | scamType | ta | asr | fn | 17 | ta-05 ta-16 ta-18 ta-03 ta-04 ta-08 |
| 22 | suspectPhone | ta | asr | fn | 17 | ta-09 ta-33 ta-39 ta-22 |
| 23 | suspectPhone | te | asr | fn | 16 | te-09 te-22 te-33 te-39 |
| 24 | time | kn | asr | wrong | 16 | kn-03 kn-20 kn-26 kn-40 kn-15 kn-28 |
| 25 | time | mr | asr | wrong | 15 | mr-07 mr-15 mr-20 mr-26 mr-28 |
| 26 | suspectPhone | kn | asr | fn | 15 | kn-09 kn-22 kn-33 kn-39 |
| 27 | time | bn | asr | wrong | 14 | bn-07 bn-20 bn-28 bn-40 bn-26 |
| 28 | utr | ta | asr | fn | 14 | ta-14 ta-31 ta-32 |
| 29 | suspectPhone | mr | asr | fn | 14 | mr-09 mr-22 mr-33 mr-39 |
| 30 | amount | en | asr | wrong | 13 | en-12 en-16 en-17 en-25 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. bn-03 (story) - fails 100% of 5 runs

- Reference: গতকাল সন্ধ্যা সাতটায় কাস্টমার কেয়ার থেকে ফোন এসেছিল, AnyDesk ইনস্টল করতে বলল, তারপর এইচডিএফসি অ্যাকাউন্ট থেকে দুই লাখ টাকা কেটে নিল
- Transcript (`bn-03__Bashkar__r0__bn`): বতকাল শুন্ধা সাপতায় কাস্টমার কেয় থেকে ফোন এশে ছিলো, এনিয় দেশক ইন্সল কুরতে বলো, তার পার এজ ডিএফ্সি একাউন্ট থেকে দুই লাক তাকা কেটে নিলো.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 200000 | 2 | 200000 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: এইচডিএফসি |

### 2. kn-16 (story) - fails 100% of 5 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ನನ ಆಕಾಂಟಿಂದ ಇಪಟ್ಟು ಸಾವರಿದ ರುಪಿಸ್ಟೆ ರುಪಿಸ್ಟೆ ಆಯತು ಎಸೇಶಿ ಬಾಗ್ಗು ಒಂದು ಗಂಟೆ ಹಿಂದೆ ಕಾಸ್ಟಮರ್ಗೆ ಕಾರಗೆ ಕಾಲ್ಮಾಡಿದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 3. bn-08 (story) - fails 100% of 5 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__Bashkar__r0__bn`): একটা ঵্য়া কাল এশে ছিলো রেকার্ড করে একন ব্লাক মেল কুরছে পেটিয়ে পনেরো হাজার তাকা দিয়ে দিয়েছি

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 12:00 (1440 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: পেটিএম |

### 4. ta-10 (story) - fails 100% of 5 runs

- Reference: UPI ID rahul dot kyc at ybl க்கு எட்டாயிரம் ரூபாய் அனுப்பினேன், இருபது நிமிஷத்துக்கு முன்னாடி
- Transcript (`ta-10__Pallavi__r0__ta`): UPI ID Rahul.KYC at YPLQ8RM-RUBAI ANIPPINEN, 20 NIMISHAT THIKKU MUNNADI.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: நிமிஷத்துக்கு |
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 5. te-01 (story) - fails 100% of 5 runs

- Reference: నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు
- Transcript (`te-01__Mohan__r0__te`): నా ఏస్బియాయి ఖాతానుండి అయదు వేలు రూపాయలు పోయాయి పది నిమిశాల కృతం ఉకరుక్య వాయసి అప్డేట్ చేయమని చిప్పరు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 6. te-16 (story) - fails 100% of 5 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__Mohan__r0__te`): నా అకాంట్ నుండి ఇరావాయ వేలు రుపీస్ డెబిటాయి పోయఈ ఆయిసియాయి బాంక ఒక గంటకృతం కస్టమర్ కియర్ కాల్ చేసాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 7. bn-07 (story) - fails 100% of 5 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__Bashkar__r0__bn`): এত্য়ার কোড পাঠে বলো সকান কোরুন তাকা পারেন। সকান কোর্তে চার হজার নাল্সো নিরান ভিতাকা কেটে গেলো আজ শকাল সারে দস্তায়।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: সাড়ে দশটায় |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: স্ক্যান |

### 8. ta-12 (story) - fails 100% of 5 runs

- Reference: இரண்டாயிரத்து ஐநூறு ரூபாய் கட் ஆயிடுச்சு, அரை மணி நேரத்துக்கு முன்னாடி, இந்தியன் வங்கி
- Transcript (`ta-12__Pallavi__r0__ta`): 2.5 ருபாயி கட் ஆயிடுச்சு அரை மணி நெரத்துக்கு முன்னாடி இந்தியன் வங்கி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 2.5 | 2500 | **asr**: value not in the transcript |

### 9. ta-14 (story) - fails 100% of 5 runs

- Reference: UPI ரெஃபரன்ஸ் நம்பர் 4 0 3 2 1 8 7 6 5 4 3 2, ஐயாயிரம் ரூபாய் போச்சு
- Transcript (`ta-14__Pallavi__r0__ta`): UPI reference number 433217765432. அயாயிரம் ருபாய் போச்சு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | wrong | 403218765432 | 433217765432 | 403218765432 | **asr**: value not in the transcript |

### 10. kn-01 (story) - fails 100% of 5 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): ನನ ಸಬೈ ಕಾತೆಯಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ. ಹತ್ತು ನಿಮಿಷಿಗಳ ಹಿಂದೆ ಒಬ್ಬರು ಕೈಕ ಅಪ್ಪೇಟ್ ಮಾಡಲು ಹೇಳಿದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 11. en-13 (story) - fails 100% of 6 runs

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__Neerja__r0__en`): ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9999 | **asr**: value not in the transcript |
| time | fn | -1d 21:30 (870 min ago) | - | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: raat saade nau baje |

### 12. bn-01 (story) - fails 100% of 5 runs

- Reference: আমার এসবিআই অ্যাকাউন্ট থেকে পাঁচ হাজার টাকা কেটে গেছে, দশ মিনিট আগে একজন KYC আপডেটের জন্য ফোন করেছিল
- Transcript (`bn-01__Bashkar__r0__bn`): আমার এস্বিযাই একাউন্ট থেকে পাঁচ হাজার তাকা কেটে গেছে, দাস মিনিট আগে এক জন কাইক আপডেটের জন ন ফোন কুরে ছিলো.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 13. bn-16 (story) - fails 100% of 5 runs

- Reference: আমার account থেকে 20,000 টাকা debit হয়ে গেছে, ICICI bank, এক ঘণ্টা আগে customer care এ ফোন করেছিলাম
- Transcript (`bn-16__Bashkar__r0__bn`): আমারা কাম থেকে কে কুডি হাজার টাকা দেবের হোয়ে গেছে এসে এসে বেক এক ঘন্টা আগে কাস্টমার খের এফান কুরে ছিলম।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 14. bn-18 (story) - fails 100% of 5 runs

- Reference: দুই লাখ পঞ্চাশ হাজার টাকা ইনভেস্টমেন্টের নামে নিয়ে নিয়েছে, বলেছিল টাকা ডাবল হবে, ইয়েস ব্যাংক
- Transcript (`bn-18__Bashkar__r0__bn`): দুই লাক পন্চাশ হাজার তাকা ইন্্য়ে নামে নিয়ে নিয়ে ছে, বলে ছিলো তাকা ডাবল হবে, ইএস বানক.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: ইয়েস ব্যাংক |

### 15. ta-04 (story) - fails 100% of 5 runs

- Reference: ஒருத்தர் தவறுதலாக பணம் அனுப்பிட்டேன்னு சொல்லி திருப்பி அனுப்ப சொன்னார், நான் கூகுள் பே மூலமா பன்னிரண்டாயிரத்து ஐநூறு ரூபாய் அனுப்பிட்டேன், இரண்டு மணி நேரத்துக்கு முன்னாடி
- Transcript (`ta-04__Pallavi__r0__ta`): ஒருத்தர் தவர்தலாக்கே பணம் அனுப்பிட்டேன்னுற் சொல்லி திருப்டி அனுப்ப சொன்னார் நான் கூகுள் பே மூலமா 12.5.5 அனுப்பிட்டேன் 2 மணி நெரத்துக்கு முன்னாடி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12500 | - | 12500 | **asr**: value not in the transcript |

### 16. kn-03 (story) - fails 100% of 5 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__Gagan__r0__kn`): ನಿನ್ನೆ ಸಂಜಿ 7 ಗಂಟಗೆ ಕಸ್ಟಮರ್ ಕೇರ್ನಿಂದ ಕರೆಬಂತು, ಏನಿಡೆಸ್ಕ ಇಂಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು. ನಂತರ ಹಡಿಫ್ಸಕಾತೆಯಂದ ಎರ್ಡು ಲಕ್ಷರೂಪಾಯಿ ತೆಗದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: ಸಂಜೆ |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 17. en-16 (story) - fails 100% of 6 runs

- Reference: Aaj subah 10 baje ek message aaya, QR scan karne ko bola, scan kiya aur dhai hazaar rupaye chale gaye
- Transcript (`en-16__Neerja__r0__en`): Today, a message in the morning, QR scan to get a scan and 50000 rupees went on.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 50000 | 2500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 09:00 (180 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 baje |

### 18. ta-18 (story) - fails 100% of 5 runs

- Reference: இரண்டரை லட்சம் ரூபாய் முதலீடு பண்ண சொல்லி வாங்கிட்டாங்க, பணம் டபுள் ஆகும்னு சொன்னாங்க, யெஸ் பேங்க்
- Transcript (`ta-18__Pallavi__r0__ta`): இறந்தரேல்லட்சம் ருபாய் முதலேடு பாண்ண சொல்லி வாங்கிட்டாங்கே. பாணம் தபுழ் ஆகும்னு சொன்னாங்கே. YES PING

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |

### 19. ta-20 (story) - fails 100% of 5 runs

- Reference: உம்... அதாவது, நேற்று மதியம் 2:30 மணிக்கு போன்பே மூலமா இரண்டாயிரத்து அறுநூறு ரூபாய் போச்சு
- Transcript (`ta-20__Pallavi__r0__ta`): 1. அதாவது 4.2 மணி 30 நிமினம் மணிக்கு போன்பே மூலமா 2.60 ருபாய் போச்சு

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2600 | 2.6 | 2600 | **asr**: value not in the transcript |
| time | wrong | -1d 14:30 (1290 min ago) | -1d 15:00 (1260 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: 2:30 |

### 20. kn-07 (story) - fails 100% of 5 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__Gagan__r0__kn`): ಒಂದು ರಕೋಡ್ಕಳುಹಿಸಿ ಸ್ಕಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು. ಸ್ಕಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ನಾಲ್ಕುಸಾವಿರ ಒಂಬೈನುರ ತೊಂಬತ್ರೂಬತ್ತು ರೂಪಾಯಿ ಹೋಯಿತು. ಇಂದು ಬಳಿಗೆ ಹತ್ತು ಗಂಟಿಗೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4900 | 4999 | **asr**: value not in the transcript |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 21. kn-10 (story) - fails 100% of 5 runs

- Reference: UPI ID rahul dot kyc at ybl ಗೆ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ, ಇಪ್ಪತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ
- Transcript (`kn-10__Gagan__r0__kn`): ವುಪೆಯ ಎದ ರಾಹುಲ್ ಡಾಟ್ ಕೈಕೆಟ ಇಬಲ್ಗೆ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುವಿಸಿದೆ ಇಪ್ಪತ್ತುನಿ ಮಿಷಿಗಳ ಹಿಂದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: ನಿಮಿಷಗಳ |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 22. te-39 (correction) - fails 100% of 5 runs

- Reference: నంబర్ తప్పు, 9 8 1 1 1 2 2 2 3 3
- Transcript (`te-39__Mohan__r0__te`): నంబర్ తప్పు. తుమ్మిది ఎనిమిది ఒంటి గంటా ఒంటి గంటా ఒంటి ఒంటి ఒంటి ఒంటి �

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 8 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 23. mr-33 (answer:suspect) - fails 100% of 5 runs

- Reference: त्याचा नंबर 7 0 1 1 2 2 3 3 4 4
- Transcript (`mr-33__Aarohi__r0__mr`): त्याचा नंबर साथ 011 123344

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |
| suspectAccount | fp | - | 011123344 | - | **asr**: spurious value from a mis-recognised transcript |

### 24. kn-05 (story) - fails 100% of 5 runs

- Reference: ನನ್ನ ಖಾತೆಯಿಂದ ಐದು... ಇಲ್ಲ ಇಲ್ಲ, ಆರು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು, OTP ಹೇಳಿಬಿಟ್ಟೆ, ಕೆನರಾ ಬ್ಯಾಂಕ್
- Transcript (`kn-05__Gagan__r0__kn`): ನನ್ನ ಖಾತೆ ಇಂದ ಆಯಿದು. ಇಲ್ಲ ಇಲ್ಲ ಆರು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿದು. ಓತ್ ಹೇಳಿಬಿಟ್ಟೆ ಕೆನಣ ಬ್ಯಂಗ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: OTP |
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: ಕೆನರಾ |

### 25. te-09 (story) - fails 100% of 5 runs

- Reference: కాల్ వచ్చిన నంబర్ 9 8 7 6 5... 4 3 2 1 0, బ్యాంక్ నుండి మాట్లాడుతున్నాం, KYC చేయకపోతే అకౌంట్ బ్లాక్ అవుతుందని చెప్పారు
- Transcript (`te-09__Mohan__r0__te`): కాల్ వచ్చిన నంబర్ తుమ్మిది ఎనిమిది ఏడు ఆరు అయిదు నాలుగు మూడు రెండు ఒంటి గంటసున్నా బేంక్ నుంది మార్ట్లాడుతునాం కెవాసి చేకపోతే అకాంట్ బ్లాక ఆవుతుందని చెప్పేరు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 26. mr-14 (story) - fails 100% of 5 runs

- Reference: यूपीआय रेफरन्स नंबर 4 0 3 2 1 8 7 6 5 4 3 2, पाच हजार रुपये गेले
- Transcript (`mr-14__Aarohi__r0__mr`): UPI reference number 4032187-54325,000 रुपे गिले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 54325000 | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 27. mr-10 (story) - fails 100% of 5 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__Aarohi__r0__mr`): आईडी राहूल डियोटी आट वर आठ हजार रुपे पाठावले, वीस मिनिटाम कूर्वी.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 28. hi-15 (story) - fails 100% of 5 runs

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): पैसे कट गए UTR नंबर है 403218 765 432 5000 रुपए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 403218765432 | - | 403218765432 | **extractor_form**: value is in the transcript but not parsed |

### 29. te-07 (story) - fails 100% of 5 runs

- Reference: ఒక QR కోడ్ పంపి స్కాన్ చేస్తే డబ్బులు వస్తాయన్నారు, స్కాన్ చేయగానే ₹4,999 పోయాయి, ఈరోజు ఉదయం 10 గంటలకు
- Transcript (`te-07__Mohan__r0__te`): ఉక క్యువార కోడ్ పంపి స్కాం చేస్తే డబ్బులు వస్తాయనారు స్కాం చేయేగానే నాలుగు వేల తుమ్మిది వందల తుమ్మ్మిది రూపాయలు పోయాఈ ఈ రోజు వుదియం పది గంటలకు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |

### 30. te-20 (story) - fails 100% of 5 runs

- Reference: అంటే... నిన్న మధ్యాహ్నం 2:30 కి ఫోన్‌పే ద్వారా రెండు వేల ఆరు వందల రూపాయలు పోయాయి
- Transcript (`te-20__Mohan__r0__te`): అంటే నిన్న మధ్యానం రెండు గంటల ముప్పే నిమిశాలు కి ఫోన్ పేద్వారా రెండు వేల ఆరు వందల రూపాయలు పోయాయి.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: 2:30 |

### 31. mr-01 (story) - fails 100% of 5 runs

- Reference: माझ्या SBI खात्यातून पाच हजार रुपये कापले गेले, दहा मिनिटांपूर्वी एका माणसाने KYC अपडेट करायला सांगितले
- Transcript (`mr-01__Aarohi__r0__mr`): माज़ा SBI खात्यातून 5,000 रुपे कापले गेले 10 मिनिटान पूर्वी एका मानसा ने अपडेट करायला संगितले।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 32. en-17 (story) - fails 100% of 6 runs

- Reference: Do lakh pachas hazaar rupaye invest karwaye trading app mein, bola paisa double hoga, Yes Bank se gaye
- Transcript (`en-17__Neerja__r0__en`): Do luck purchase, 1000,000 rupees invest kervayet trading app me bola paisa double ho ga? Yes bank se gaye.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 1000000 | 250000 | **asr**: value not in the transcript |

### 33. mr-07 (story) - fails 100% of 5 runs

- Reference: एक क्यूआर कोड पाठवला आणि स्कॅन करा पैसे मिळतील म्हणाले, स्कॅन केल्यावर ₹4,999 कापले गेले, आज सकाळी साडेदहा वाजता
- Transcript (`mr-07__Aarohi__r0__mr`): एक QR कोड पाठवला आणी स्कान करा 25 मिलतील भणाले, स्कान केले आवर 4,999 रुपे कापले गेले, आज सकाली साडेधा वाजता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: साडेदहा |

### 34. mr-19 (story) - fails 100% of 5 runs

- Reference: ज्या खात्यात पैसे गेले त्याचा नंबर 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`mr-19__Aarohi__r0__mr`): जा खात्यात पईसे गेले त्याचा नंबर पाच शून्य एक शून्य शून्य दोन तीन चार पाच सहा साथ आठेक दोन

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectAccount | wrong | 50100234567812 | 5010023456 | 50100234567812 | **asr**: value not in the transcript |

### 35. en-04 (story) - fails 83% of 6 runs

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__Neerja__r0__en`): । । । ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: abhi |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 36. en-02 (story) - fails 83% of 6 runs

- Reference: Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai
- Transcript (`en-02__Prabhat__r0__en`): Mere account says 5000 rupees cat got. 10 minutes ago, one person told me why is he updated? SBI account says.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 37. en-25 (answer:amount) - fails 83% of 6 runs

- Reference: saade teen hazaar
- Transcript (`en-25__Neerja__r0__en`): 3,000

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 3000 | 3500 | **asr**: value not in the transcript |

### 38. hi-08 (story) - fails 80% of 5 runs

- Reference: एक लड़की का वीडियो कॉल आया, रिकॉर्ड करके ब्लैकमेल कर रहे हैं, अब तक पंद्रह हज़ार रुपये दे चुका हूँ पेटीएम से
- Transcript (`hi-08__Swara__r0__hi`): एक लड़की का विडियो कॉल आया, रिकॉर्ड करके ब्लाकमेल कर रहे हैं, अब तक 15,000 रुपए दे चुका हूँ, पेटीम से.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: near-spelling variant of: पेटीएम |

### 39. hi-34 (answer:utr) - fails 80% of 5 runs

- Reference: 4 5 6 7 8 9 0 1 2 3 4 5
- Transcript (`hi-34__Madhur__r0__hi`): 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 456789012345 | - | 456789012345 | **extractor_form**: value is in the transcript but not parsed |

### 40. hi-11 (story) - fails 60% of 5 runs

- Reference: डेढ़ लाख रुपये गए हैं मेरे, बैंक ऑफ बड़ौदा का अकाउंट है, कल रात दस बजे
- Transcript (`hi-11__Swara__r0__hi`): देड़ लाख रुपए गए हैं मेरे बैंक ओफ बडोदा का अकाउंट है कल राद दस बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 22:00 (840 min ago) | -1d 10:00 (1560 min ago) | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: रात |
