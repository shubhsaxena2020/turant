# Turant pipeline eval: round11

Generated 2026-11-23T10:40:35.025Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 1510 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).
Deltas in brackets are against `reports/baseline.json`.

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 (+44.3) | 100.0 | 100.0 | 100.0 | 100.0 (+22.4) | - | - |
| ASR clean, normal rate | 600 | 43.5 (+16.3) | 43.5 | 85.4 | 61.6 | 71.5 (+20.5) | 65.5 | 40.6 |
| ASR noise 15 dB | 280 | 37.9 (+13.2) | 37.9 | 82.8 | 52.8 | 64.5 (+15.5) | 73.8 | 45.0 |
| ASR noise 5 dB | 280 | 30.4 (+11.1) | 30.7 | 81.9 | 40.6 | 54.3 (+13.9) | 84.0 | 67.3 |
| ASR rate -15% / +15% | 280 | 39.6 (+13.9) | 39.6 | 84.2 | 58.3 | 68.9 (+20.6) | 65.5 | 43.4 |
| ASR all (forced language) | 1440 | 39.1 (+14.2) | 39.2 | 84.1 | 55.2 | 66.6 (+18.4) | 70.7 | 47.2 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 47.0% of clean runs and 42.6% of all runs fully correct. Per language (clean): hi 86%, en 78%, bn 29%, ta 19%, te 29%, mr 55%, kn 19%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 76.4 | 56.8 | 65.2 (+22.4) | 60.0 |
| time | 113 | 100.0 | 100.0 | 100.0 | 76.1 | 65.4 | 70.4 (+25.2) | 63.3 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 99.1 | 64.0 | 77.8 (+14.2) | 74.7 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 98.3 | 82.0 | 89.4 (+26.9) | 85.5 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 74.6 | 85.5 (+24.6) | 76.9 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 88.9 | 17.8 | 29.6 (+0.5) | 29.5 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 100.0 | 63.9 | 78.0 (+0.0) | 65.6 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 82.6 | 30.2 | 44.2 (+1.3) | 45.3 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 36.4 | 26.7 | 30.8 (-4.0) | 28.6 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 40.0 | 57.1 (+0.0) | 58.8 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 85.4 | 61.6 | 71.5 (+20.5) | 66.6 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 (+20.0) | 81.3 (+23.8) | 57.5 | 100.0 | 94.0 | 36.0 | 21.1 | 75.0 (n=16) |
| en | 100.0 (+12.5) | 74.2 (+10.8) | 70.0 | 100.0 | 88.2 | 36.6 | 34.7 | 70.4 (n=27) |
| bn | 100.0 (+67.5) | 25.0 (+16.3) | 17.5 | 100.0 | 60.0 | 76.1 | 50.1 | 12.5 (n=16) |
| ta | 100.0 (+55.0) | 16.3 (+6.3) | 15.0 | 100.0 | 51.0 | 134.4 | 47.8 | 0.0 (n=16) |
| te | 100.0 (+55.0) | 26.3 (+16.3) | 17.5 | 100.0 | 57.3 | 74.9 | 52.0 | 12.5 (n=16) |
| mr | 100.0 (+47.5) | 50.0 (+31.3) | 32.5 | 100.0 | 78.8 | 68.9 | 31.8 | 12.5 (n=16) |
| kn | 100.0 (+52.5) | 16.3 (+12.5) | 2.5 | 100.0 | 49.4 | 79.7 | 50.2 | 25.0 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 97.9 | 100.0 / 88.9 | 100.0 / 93.9 | 100.0 / 100.0 | 100.0 / 85.7 | 100.0 / 50.0 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 100.0 |
| en | 100.0 / 79.1 | 100.0 / 86.6 | 100.0 / 97.4 | 100.0 / 97.2 | 100.0 / 88.9 | 100.0 / 80.0 | 100.0 / 100.0 | 100.0 / 80.0 | 100.0 / 80.0 |
| bn | 100.0 / 51.9 | 100.0 / 68.9 | 100.0 / 53.3 | 100.0 / 84.6 | 100.0 / 76.9 | 100.0 / - | 100.0 / - | 100.0 / 22.2 | 100.0 / - |
| ta | 100.0 / 20.0 | 100.0 / 58.1 | 100.0 / 68.6 | 100.0 / 80.0 | 100.0 / 85.7 | 100.0 / 0.0 | 100.0 / 85.7 | 100.0 / 0.0 | 100.0 / - |
| te | 100.0 / 46.2 | 100.0 / 60.4 | 100.0 / 42.9 | 100.0 / 85.7 | 100.0 / 85.7 | 100.0 / - | 100.0 / 100.0 | 100.0 / - | 100.0 / - |
| mr | 100.0 / 89.1 | 100.0 / 67.7 | 100.0 / 84.2 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / - | 100.0 / - | 100.0 / 22.2 | 100.0 / 0.0 |
| kn | 100.0 / 45.1 | 100.0 / 48.1 | 100.0 / 62.5 | 100.0 / 69.8 | 100.0 / 76.9 | 100.0 / - | 100.0 / - | 100.0 / 0.0 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 92 | 30.4 | 60.7 | 65.2 | 41.2 |
| babble 5 dB | 92 | 18.5 | 45.9 | 124.5 | 95.9 |
| clean | 880 | 42.3 | 70.7 | 65.5 | 41.5 |
| pink 15 dB | 99 | 38.4 | 64.2 | 92.6 | 55.5 |
| pink 5 dB | 99 | 28.3 | 49.8 | 71.5 | 63.4 |
| traffic 15 dB | 89 | 44.9 | 69.0 | 60.3 | 37.3 |
| traffic 5 dB | 89 | 44.9 | 66.9 | 57.9 | 41.4 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 600 | 43.5 | 71.5 | 65.5 |
| 15 dB | 280 | 37.9 | 64.5 | 73.8 |
| 5 dB | 280 | 30.4 | 54.3 | 84.0 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 22.5 | 57.8 | 79.4 | 51.6 |
| bn-IN-TanishaaNeural | 40 | 27.5 | 62.1 | 72.9 | 48.6 |
| en-IN-NeerjaExpressiveNeural | 40 | 75.0 | 88.9 | 37.9 | 26.5 |
| en-IN-NeerjaNeural | 40 | 75.0 | 88.6 | 35.6 | 25.9 |
| en-IN-PrabhatNeural | 40 | 72.5 | 87.2 | 36.4 | 51.6 |
| hi-IN-MadhurNeural | 40 | 77.5 | 92.4 | 36.6 | 20.3 |
| hi-IN-SwaraNeural | 40 | 85.0 | 95.6 | 35.4 | 21.8 |
| kn-IN-GaganNeural | 40 | 12.5 | 48.7 | 77.9 | 49.8 |
| kn-IN-SapnaNeural | 40 | 20.0 | 50.0 | 81.6 | 50.7 |
| mr-IN-AarohiNeural | 40 | 57.5 | 83.0 | 70.0 | 33.0 |
| mr-IN-ManoharNeural | 40 | 42.5 | 74.5 | 67.9 | 30.6 |
| ta-IN-PallaviNeural | 40 | 15.0 | 53.0 | 154.9 | 50.7 |
| ta-IN-ValluvarNeural | 40 | 17.5 | 48.8 | 113.8 | 44.9 |
| te-IN-MohanNeural | 40 | 27.5 | 60.3 | 74.5 | 50.6 |
| te-IN-ShrutiNeural | 40 | 25.0 | 54.1 | 75.2 | 53.5 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 600 | 43.5 | 71.5 | 65.5 |
| -15% | 147 | 38.8 | 67.9 | 64.6 |
| +15% | 133 | 40.6 | 69.9 | 66.2 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 330 | 100.0 | 35.8 | 73.6 |
| correction | 60 | 100.0 | 60.0 | 67.3 |
| answer | 195 | 100.0 | 51.8 | 64.4 |
| answer (skip intent) | 15 | 100.0 | 40.0 | 57.1 |

## Language auto-detect vs forced language token

70 clean clips transcribed twice. Forced: 42.9% fully correct (WER 80.9%). Auto-detect: 35.7% (WER 115.2%). Transcript in the wrong script under auto-detect: 52.9%.

| Lang | n | Forced fully correct % | Auto fully correct % | Auto wrong script % |
|---|---|---|---|---|
| hi | 10 | 80.0 | 70.0 | 10.0 |
| en | 10 | 70.0 | 70.0 | 40.0 |
| bn | 10 | 30.0 | 20.0 | 100.0 |
| ta | 10 | 10.0 | 10.0 | 10.0 |
| te | 10 | 30.0 | 10.0 | 100.0 |
| mr | 10 | 60.0 | 60.0 | 10.0 |
| kn | 10 | 20.0 | 10.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 1349 | 1237 (92%) | 112 (8%) | 0 (0%) | 0 |
| clean | 487 | 436 (90%) | 51 (10%) | 0 (0%) | 0 |
| 15 dB | 274 | 255 (93%) | 19 (7%) | 0 (0%) | 0 |
| 5 dB | 347 | 327 (94%) | 20 (6%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 436 | 408 | 28 | 0 |
| time | 269 | 242 | 27 | 0 |
| scamType | 171 | 164 | 7 | 0 |
| bank | 124 | 116 | 8 | 0 |
| suspectPhone | 105 | 101 | 4 | 0 |
| utr | 89 | 75 | 14 | 0 |
| paymentApp | 57 | 41 | 16 | 0 |
| suspectUpi | 43 | 43 | 0 | 0 |
| suspectAccount | 34 | 30 | 4 | 0 |
| intent | 21 | 17 | 4 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 59 | 47 | 12 | 0 |
| en | 86 | 77 | 9 | 0 |
| bn | 257 | 239 | 18 | 0 |
| ta | 272 | 258 | 14 | 0 |
| te | 244 | 233 | 11 | 0 |
| mr | 141 | 112 | 29 | 0 |
| kn | 290 | 271 | 19 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | kn | asr | fn | 69 | kn-04 kn-08 kn-10 kn-11 kn-12 kn-13 kn-14 kn-16 +15 |
| 2 | amount | ta | asr | fn | 66 | ta-02 ta-03 ta-04 ta-07 ta-08 ta-10 ta-11 ta-12 +13 |
| 3 | amount | te | asr | fn | 60 | te-01 te-08 te-10 te-11 te-12 te-13 te-14 te-16 +11 |
| 4 | amount | bn | asr | fn | 52 | bn-05 bn-06 bn-07 bn-11 bn-12 bn-17 bn-18 bn-23 +10 |
| 5 | time | kn | asr | fn | 40 | kn-02 kn-10 kn-12 kn-13 kn-16 kn-20 kn-27 kn-40 +5 |
| 6 | scamType | bn | asr | fn | 38 | bn-01 bn-03 bn-07 bn-08 bn-09 bn-16 bn-35 bn-04 +1 |
| 7 | amount | ta | asr | wrong | 38 | ta-01 ta-06 ta-08 ta-12 ta-15 ta-17 ta-18 ta-20 +5 |
| 8 | scamType | te | asr | fn | 36 | te-01 te-05 te-07 te-08 te-09 te-16 te-18 te-35 |
| 9 | bank | kn | asr | fn | 35 | kn-01 kn-03 kn-05 kn-16 kn-17 kn-18 kn-30 kn-38 +3 |
| 10 | scamType | kn | asr | fn | 33 | kn-01 kn-05 kn-07 kn-09 kn-16 kn-35 kn-08 kn-18 |
| 11 | time | te | asr | fn | 30 | te-02 te-10 te-12 te-13 te-16 te-27 te-01 te-20 |
| 12 | amount | bn | asr | wrong | 27 | bn-02 bn-03 bn-04 bn-07 bn-20 bn-21 bn-24 bn-01 +2 |
| 13 | time | ta | asr | wrong | 27 | ta-04 ta-11 ta-12 ta-13 ta-20 ta-26 ta-40 ta-03 +1 |
| 14 | bank | bn | asr | fn | 25 | bn-03 bn-16 bn-18 bn-38 bn-01 bn-02 bn-06 bn-11 +3 |
| 15 | scamType | ta | asr | fn | 25 | ta-01 ta-04 ta-05 ta-09 ta-16 ta-18 ta-35 ta-03 +1 |
| 16 | amount | te | asr | wrong | 24 | te-04 te-06 te-07 te-20 te-24 te-25 te-37 |
| 17 | bank | te | asr | fn | 23 | te-01 te-16 te-18 te-21 te-12 te-13 te-17 te-29 +1 |
| 18 | bank | ta | asr | fn | 22 | ta-13 ta-17 ta-18 ta-21 ta-30 ta-01 ta-03 ta-12 +1 |
| 19 | suspectPhone | te | asr | fn | 20 | te-09 te-22 te-33 te-39 |
| 20 | time | bn | asr | fn | 19 | bn-03 bn-11 bn-40 bn-02 bn-04 bn-10 bn-12 bn-26 +2 |
| 21 | suspectPhone | bn | asr | fn | 19 | bn-09 bn-22 bn-33 bn-39 |
| 22 | amount | en | asr | fn | 17 | en-04 en-13 en-16 en-02 en-17 en-18 en-25 |
| 23 | suspectPhone | ta | asr | fn | 17 | ta-09 ta-33 ta-39 ta-22 |
| 24 | scamType | mr | asr | fn | 17 | mr-01 mr-03 mr-16 mr-04 mr-18 |
| 25 | amount | kn | asr | wrong | 16 | kn-03 kn-07 kn-12 kn-20 kn-21 kn-05 kn-37 |
| 26 | suspectPhone | kn | asr | fn | 16 | kn-09 kn-22 kn-33 kn-39 |
| 27 | time | bn | asr | wrong | 15 | bn-07 bn-20 bn-28 bn-40 bn-26 |
| 28 | time | mr | asr | wrong | 15 | mr-07 mr-15 mr-20 mr-26 mr-28 |
| 29 | utr | ta | asr | fn | 14 | ta-14 ta-31 ta-32 |
| 30 | suspectPhone | mr | asr | fn | 14 | mr-09 mr-22 mr-33 mr-39 |

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

### 2. te-16 (story) - fails 100% of 5 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__Mohan__r0__te`): నా అకాంట్ నుండి ఇరావాయ వేలు రుపీస్ డెబిటాయి పోయఈ ఆయిసియాయి బాంక ఒక గంటకృతం కస్టమర్ కియర్ కాల్ చేసాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 3. te-01 (story) - fails 100% of 5 runs

- Reference: నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు
- Transcript (`te-01__Mohan__r0__te`): నా ఏస్బియాయి ఖాతానుండి అయదు వేలు రూపాయలు పోయాయి పది నిమిశాల కృతం ఉకరుక్య వాయసి అప్డేట్ చేయమని చిప్పరు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 4. kn-16 (story) - fails 100% of 5 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ನನ ಆಕಾಂಟಿಂದ ಇಪಟ್ಟು ಸಾವರಿದ ರುಪಿಸ್ಟೆ ರುಪಿಸ್ಟೆ ಆಯತು ಎಸೇಶಿ ಬಾಗ್ಗು ಒಂದು ಗಂಟೆ ಹಿಂದೆ ಕಾಸ್ಟಮರ್ಗೆ ಕಾರಗೆ ಕಾಲ್ಮಾಡಿದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 5. bn-08 (story) - fails 100% of 5 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__Bashkar__r0__bn`): একটা ঵্য়া কাল এশে ছিলো রেকার্ড করে একন ব্লাক মেল কুরছে পেটিয়ে পনেরো হাজার তাকা দিয়ে দিয়েছি

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 12:00 (1440 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: পেটিএম |

### 6. ta-10 (story) - fails 100% of 5 runs

- Reference: UPI ID rahul dot kyc at ybl க்கு எட்டாயிரம் ரூபாய் அனுப்பினேன், இருபது நிமிஷத்துக்கு முன்னாடி
- Transcript (`ta-10__Pallavi__r0__ta`): UPI ID Rahul.KYC at YPLQ8RM-RUBAI ANIPPINEN, 20 NIMISHAT THIKKU MUNNADI.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: நிமிஷத்துக்கு |
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 7. kn-01 (story) - fails 100% of 5 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): ನನ ಸಬೈ ಕಾತೆಯಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ. ಹತ್ತು ನಿಮಿಷಿಗಳ ಹಿಂದೆ ಒಬ್ಬರು ಕೈಕ ಅಪ್ಪೇಟ್ ಮಾಡಲು ಹೇಳಿದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 8. ta-04 (story) - fails 100% of 5 runs

- Reference: ஒருத்தர் தவறுதலாக பணம் அனுப்பிட்டேன்னு சொல்லி திருப்பி அனுப்ப சொன்னார், நான் கூகுள் பே மூலமா பன்னிரண்டாயிரத்து ஐநூறு ரூபாய் அனுப்பிட்டேன், இரண்டு மணி நேரத்துக்கு முன்னாடி
- Transcript (`ta-04__Pallavi__r0__ta`): ஒருத்தர் தவர்தலாக்கே பணம் அனுப்பிட்டேன்னுற் சொல்லி திருப்டி அனுப்ப சொன்னார் நான் கூகுள் பே மூலமா 12.5.5 அனுப்பிட்டேன் 2 மணி நெரத்துக்கு முன்னாடி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12500 | - | 12500 | **asr**: value not in the transcript |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: தவறுதலாக |

### 9. te-18 (story) - fails 100% of 5 runs

- Reference: రెండున్నర లక్షల రూపాయలు పెట్టుబడి పేరుతో తీసుకున్నారు, డబ్బులు డబుల్ అవుతాయన్నారు, యెస్ బ్యాంక్
- Transcript (`te-18__Mohan__r0__te`): రిండునర లక్షల రూపాయలు పిటుబడి పేరుతో తీస్కునారు డబులు డబుల అవుతాయనారు యస్ డాంక్.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: పెట్టుబడి |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: యెస్ బ్యాంక్ |

### 10. en-04 (story) - fails 100% of 6 runs

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__Neerja__r0__en`): । । । ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: abhi |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 11. te-08 (story) - fails 100% of 5 runs

- Reference: ఒక వీడియో కాల్ వచ్చింది, రికార్డ్ చేసి ఇప్పుడు బ్లాక్‌మెయిల్ చేస్తున్నారు, పేటీఎం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేశాను
- Transcript (`te-08__Mohan__r0__te`): ఉక వీడియో కాల్ వచ్చింది రికాడ్ చేసి ఇపుడు బ్లాక్ మేల్ చేస్తునారు పేటియం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేసాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: బ్లాక్‌మెయిల్ |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: పేటీఎం |

### 12. bn-01 (story) - fails 100% of 5 runs

- Reference: আমার এসবিআই অ্যাকাউন্ট থেকে পাঁচ হাজার টাকা কেটে গেছে, দশ মিনিট আগে একজন KYC আপডেটের জন্য ফোন করেছিল
- Transcript (`bn-01__Bashkar__r0__bn`): আমার এস্বিযাই একাউন্ট থেকে পাঁচ হাজার তাকা কেটে গেছে, দাস মিনিট আগে এক জন কাইক আপডেটের জন ন ফোন কুরে ছিলো.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 13. bn-07 (story) - fails 100% of 5 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__Bashkar__r0__bn`): এত্য়ার কোড পাঠে বলো সকান কোরুন তাকা পারেন। সকান কোর্তে চার হজার নাল্সো নিরান ভিতাকা কেটে গেলো আজ শকাল সারে দস্তায়।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: সাড়ে দশটায় |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: স্ক্যান |

### 14. ta-12 (story) - fails 100% of 5 runs

- Reference: இரண்டாயிரத்து ஐநூறு ரூபாய் கட் ஆயிடுச்சு, அரை மணி நேரத்துக்கு முன்னாடி, இந்தியன் வங்கி
- Transcript (`ta-12__Pallavi__r0__ta`): 2.5 ருபாயி கட் ஆயிடுச்சு அரை மணி நெரத்துக்கு முன்னாடி இந்தியன் வங்கி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 2.5 | 2500 | **asr**: value not in the transcript |

### 15. ta-13 (story) - fails 100% of 5 runs

- Reference: என் 15000 ரூபாய் போயிடுச்சு, ஆக்சிஸ் பேங்க், 3 நாட்களுக்கு முன்பு
- Transcript (`ta-13__Pallavi__r0__ta`): என் பதனேந்தாயிரம் ரோபாய் போயிடுச்சு ஆக்சிஸ் பேங்க மோன்று நாட்கலைக்க முன்பு

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| time | wrong | -3d 12:00 (4320 min ago) | -1d 12:00 (1440 min ago) | -3d 12:00 (4320 min ago) | **asr**: ASR lost/changed: 3 நாட்களுக்கு |

### 16. ta-14 (story) - fails 100% of 5 runs

- Reference: UPI ரெஃபரன்ஸ் நம்பர் 4 0 3 2 1 8 7 6 5 4 3 2, ஐயாயிரம் ரூபாய் போச்சு
- Transcript (`ta-14__Pallavi__r0__ta`): UPI reference number 433217765432. அயாயிரம் ருபாய் போச்சு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | wrong | 403218765432 | 433217765432 | 403218765432 | **asr**: value not in the transcript |

### 17. kn-03 (story) - fails 100% of 5 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__Gagan__r0__kn`): ನಿನ್ನೆ ಸಂಜಿ 7 ಗಂಟಗೆ ಕಸ್ಟಮರ್ ಕೇರ್ನಿಂದ ಕರೆಬಂತು, ಏನಿಡೆಸ್ಕ ಇಂಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು. ನಂತರ ಹಡಿಫ್ಸಕಾತೆಯಂದ ಎರ್ಡು ಲಕ್ಷರೂಪಾಯಿ ತೆಗದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: ಸಂಜೆ |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 18. en-13 (story) - fails 100% of 6 runs

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__Neerja__r0__en`): ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9999 | **asr**: value not in the transcript |
| time | fn | -1d 21:30 (870 min ago) | - | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: raat saade nau baje |

### 19. bn-16 (story) - fails 100% of 5 runs

- Reference: আমার account থেকে 20,000 টাকা debit হয়ে গেছে, ICICI bank, এক ঘণ্টা আগে customer care এ ফোন করেছিলাম
- Transcript (`bn-16__Bashkar__r0__bn`): আমারা কাম থেকে কে কুডি হাজার টাকা দেবের হোয়ে গেছে এসে এসে বেক এক ঘন্টা আগে কাস্টমার খের এফান কুরে ছিলম।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 20. bn-18 (story) - fails 100% of 5 runs

- Reference: দুই লাখ পঞ্চাশ হাজার টাকা ইনভেস্টমেন্টের নামে নিয়ে নিয়েছে, বলেছিল টাকা ডাবল হবে, ইয়েস ব্যাংক
- Transcript (`bn-18__Bashkar__r0__bn`): দুই লাক পন্চাশ হাজার তাকা ইন্্য়ে নামে নিয়ে নিয়ে ছে, বলে ছিলো তাকা ডাবল হবে, ইএস বানক.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: ইয়েস ব্যাংক |

### 21. kn-02 (story) - fails 100% of 5 runs

- Reference: ಅಣ್ಣ ಬೇಗ, ನನ್ನ ಅಕೌಂಟ್‌ನಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು, ಫೋನ್‌ಪೇ ಮೂಲಕ, ಈಗಷ್ಟೇ ಆಯಿತು
- Transcript (`kn-02__Gagan__r0__kn`): ಅನ್ನ ಬೇಗಾ ನನ್ನ ಅಕಂಂತ್ನಿಂದ ಆಯಿದು ಸಾವಿರ ರೂಪಾಯ ಹೋಯಿತು ಫೋನ್ಪೇ ಮೂಲಕ ಇಗ ಸ್ಟೇ ಆಯಿತು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **extractor_form**: value is in the transcript but not parsed |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: ಈಗಷ್ಟೇ |

### 22. kn-07 (story) - fails 100% of 5 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__Gagan__r0__kn`): ಒಂದು ರಕೋಡ್ಕಳುಹಿಸಿ ಸ್ಕಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು. ಸ್ಕಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ನಾಲ್ಕುಸಾವಿರ ಒಂಬೈನುರ ತೊಂಬತ್ರೂಬತ್ತು ರೂಪಾಯಿ ಹೋಯಿತು. ಇಂದು ಬಳಿಗೆ ಹತ್ತು ಗಂಟಿಗೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4900 | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 12:00 (0 min ago) | today 10:00 (120 min ago) | **extractor_form**: near-spelling variant of: ಗಂಟೆಗೆ |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 23. kn-08 (story) - fails 100% of 5 runs

- Reference: ಒಂದು ವೀಡಿಯೊ ಕಾಲ್ ಬಂತು, ರೆಕಾರ್ಡ್ ಮಾಡಿ ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ, ಪೇಟಿಎಂ ಮೂಲಕ ಹದಿನೈದು ಸಾವಿರ ರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೇನೆ
- Transcript (`kn-08__Gagan__r0__kn`): ಒಂದು ವಿಡಿಯೋ ಕಾಲ್ಬಂತು ರೆಕಾಡ್ ಮಾಡಿ ಇಗ ಬ್ಲಾಕ್ ಮೇಲ್ ಮಾಡತ್ತಿದ್ದಾರೆ. ಪೇಟಿಯೆ ಮೂಲಕ ಹದಿನೆಯಿದು ಸಾವಿರರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೆಯನೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: ಪೇಟಿಎಂ |

### 24. en-16 (story) - fails 100% of 6 runs

- Reference: Aaj subah 10 baje ek message aaya, QR scan karne ko bola, scan kiya aur dhai hazaar rupaye chale gaye
- Transcript (`en-16__Neerja__r0__en`): Today, a message in the morning, QR scan to get a scan and 50000 rupees went on.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 50000 | 2500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 09:00 (180 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 baje |

### 25. ta-18 (story) - fails 100% of 5 runs

- Reference: இரண்டரை லட்சம் ரூபாய் முதலீடு பண்ண சொல்லி வாங்கிட்டாங்க, பணம் டபுள் ஆகும்னு சொன்னாங்க, யெஸ் பேங்க்
- Transcript (`ta-18__Pallavi__r0__ta`): இறந்தரேல்லட்சம் ருபாய் முதலேடு பாண்ண சொல்லி வாங்கிட்டாங்கே. பாணம் தபுழ் ஆகும்னு சொன்னாங்கே. YES PING

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |

### 26. te-12 (story) - fails 100% of 5 runs

- Reference: రెండున్నర వేల రూపాయలు కట్ అయ్యాయి, అరగంట క్రితం, ఇండియన్ బ్యాంక్
- Transcript (`te-12__Mohan__r0__te`): రిండునరవేలరుపాయలు కట్ అయాఈ అరగంటకృతం ఇండియన్ బాంక

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2500 | - | 2500 | **asr**: value not in the transcript |

### 27. mr-03 (story) - fails 100% of 5 runs

- Reference: काल संध्याकाळी सात वाजता कस्टमर केअरमधून फोन आला, AnyDesk इन्स्टॉल करायला सांगितलं, मग एचडीएफसी खात्यातून दोन लाख रुपये काढले
- Transcript (`mr-03__Aarohi__r0__mr`): काल संध्याकाली साथ वाजता कस्टमर केर मधून फोन आला, एने डेस्क इंस्टॉल करायला संगितल, मग HDFC खात्यातून दोन लाख रुपे काडले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **extractor_form**: near-spelling variant of: संध्याकाळी |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 28. te-04 (story) - fails 100% of 5 runs

- Reference: ఒకతను పొరపాటున డబ్బులు పంపించానని, తిరిగి పంపమని అడిగాడు, నేను గూగుల్ పే ద్వారా పన్నెండు వేల ఐదు వందల రూపాయలు పంపాను, రెండు గంటల క్రితం
- Transcript (`te-04__Mohan__r0__te`): ఒకతను పొరపాటున డబ్బులు పంపించానని తిరిగి పంపమని అడిగాడు. నేను గూగుల్ పే ద్వారా పన్న్యండు వేల అయదు వందల రూపాయలు పంపాను. రెండు గంటల కృతం.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12500 | 100 | 12500 | **asr**: value not in the transcript |

### 29. mr-14 (story) - fails 100% of 5 runs

- Reference: यूपीआय रेफरन्स नंबर 4 0 3 2 1 8 7 6 5 4 3 2, पाच हजार रुपये गेले
- Transcript (`mr-14__Aarohi__r0__mr`): UPI reference number 4032187-54325,000 रुपे गिले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 54325000 | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 30. mr-16 (story) - fails 100% of 5 runs

- Reference: माझ्या account मधून 20,000 rupees debit झाले, ICICI bank, एक तासापूर्वी customer care ला फोन केला होता
- Transcript (`mr-16__Aarohi__r0__mr`): माज़ा अकाउंट मधून 20,000 रूपीज डेबिट जाले, ICICI Bank एक तासा पूर्वी कस्टमर केरला फोन केला होता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |

### 31. mr-33 (answer:suspect) - fails 100% of 5 runs

- Reference: त्याचा नंबर 7 0 1 1 2 2 3 3 4 4
- Transcript (`mr-33__Aarohi__r0__mr`): त्याचा नंबर साथ 011 123344

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |
| suspectAccount | fp | - | 011123344 | - | **asr**: spurious value from a mis-recognised transcript |

### 32. mr-10 (story) - fails 100% of 5 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__Aarohi__r0__mr`): आईडी राहूल डियोटी आट वर आठ हजार रुपे पाठावले, वीस मिनिटाम कूर्वी.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 33. hi-15 (story) - fails 100% of 5 runs

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): पैसे कट गए UTR नंबर है 403218 765 432 5000 रुपए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 403218765432 | - | 403218765432 | **extractor_form**: value is in the transcript but not parsed |

### 34. mr-01 (story) - fails 100% of 5 runs

- Reference: माझ्या SBI खात्यातून पाच हजार रुपये कापले गेले, दहा मिनिटांपूर्वी एका माणसाने KYC अपडेट करायला सांगितले
- Transcript (`mr-01__Aarohi__r0__mr`): माज़ा SBI खात्यातून 5,000 रुपे कापले गेले 10 मिनिटान पूर्वी एका मानसा ने अपडेट करायला संगितले।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 35. hi-08 (story) - fails 100% of 5 runs

- Reference: एक लड़की का वीडियो कॉल आया, रिकॉर्ड करके ब्लैकमेल कर रहे हैं, अब तक पंद्रह हज़ार रुपये दे चुका हूँ पेटीएम से
- Transcript (`hi-08__Madhur__r0__hi`): एक लड़की का विडियो कॉल आया, रिकॉर्ड करके ब्लैकमेल कर रहे हैं, अब तक 15,000 रुपए दे चुका हूँ पेटी इन से.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: पेटीएम |

### 36. en-17 (story) - fails 100% of 6 runs

- Reference: Do lakh pachas hazaar rupaye invest karwaye trading app mein, bola paisa double hoga, Yes Bank se gaye
- Transcript (`en-17__Neerja__r0__en`): Do luck purchase, 1000,000 rupees invest kervayet trading app me bola paisa double ho ga? Yes bank se gaye.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 1000000 | 250000 | **asr**: value not in the transcript |

### 37. en-02 (story) - fails 83% of 6 runs

- Reference: Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai
- Transcript (`en-02__Prabhat__r0__en`): Mere account says 5000 rupees cat got. 10 minutes ago, one person told me why is he updated? SBI account says.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 38. en-31 (answer:utr) - fails 83% of 6 runs

- Reference: Your A/c XX4321 has been debited via UPI. UPI Ref No 4 5 6 7 8 9 0 1 2 3 4 5. Not you? Call your bank.
- Transcript (`en-31__Neerja__r0__en`): Your ACXX 4321 has been debited via UPI. UPI REF No. 456789012345 Not you? Call your bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 4321 | - | **extractor_form**: spurious value from a near-correct transcript |

### 39. hi-01 (story) - fails 80% of 5 runs

- Reference: मेरे अकाउंट से पाँच हज़ार रुपये कट गए, दस मिनट पहले एक आदमी ने बोला केवाईसी अपडेट करो, एसबीआई का अकाउंट है
- Transcript (`hi-01__Madhur__r0__hi`): मेरे अकाउंट से 5000 रुपए कट गए, 10 मिनट पहले एक आदमी ने बोला के YC अपडेट करो, SBI का अकाउंट है.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: केवाईसी |

### 40. hi-28 (answer:time) - fails 80% of 5 runs

- Reference: कल रात करीब साढ़े नौ बजे
- Transcript (`hi-28__Madhur__r0__hi`): कल रात करीब साधे नौ बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 21:30 (870 min ago) | -1d 21:00 (900 min ago) | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: साढ़े |
