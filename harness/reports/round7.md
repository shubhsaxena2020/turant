# Turant pipeline eval: round7

Generated 2026-11-23T09:51:34.888Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 1510 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).
Deltas in brackets are against `reports/baseline.json`.

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 (+44.3) | 100.0 | 100.0 | 100.0 | 100.0 (+22.4) | - | - |
| ASR clean, normal rate | 600 | 41.0 (+13.8) | 41.0 | 80.3 | 58.7 | 67.8 (+16.8) | 65.5 | 40.6 |
| ASR noise 15 dB | 280 | 36.1 (+11.4) | 36.1 | 77.2 | 50.9 | 61.3 (+12.3) | 73.8 | 45.0 |
| ASR noise 5 dB | 280 | 29.3 (+10.0) | 29.6 | 76.6 | 39.2 | 51.9 (+11.4) | 84.0 | 67.3 |
| ASR rate -15% / +15% | 280 | 37.5 (+11.8) | 37.5 | 78.5 | 55.5 | 65.0 (+16.7) | 65.5 | 43.4 |
| ASR all (forced language) | 1440 | 37.1 (+12.2) | 37.2 | 78.8 | 52.8 | 63.2 (+15.0) | 70.7 | 47.2 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 47.0% of clean runs and 42.6% of all runs fully correct. Per language (clean): hi 86%, en 78%, bn 29%, ta 19%, te 29%, mr 55%, kn 19%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 64.7 | 54.8 | 59.3 (+16.5) | 54.4 |
| time | 113 | 100.0 | 100.0 | 100.0 | 74.4 | 63.4 | 68.4 (+23.3) | 61.8 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 99.0 | 59.4 | 74.3 (+10.7) | 71.1 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 98.3 | 82.0 | 89.4 (+26.9) | 85.5 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 50.8 | 67.4 (+6.5) | 61.8 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 88.9 | 17.8 | 29.6 (+0.5) | 29.5 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 100.0 | 63.9 | 78.0 (+0.0) | 65.6 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 82.6 | 30.2 | 44.2 (+1.3) | 45.3 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 36.4 | 26.7 | 30.8 (-4.0) | 28.6 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 40.0 | 57.1 (+0.0) | 58.8 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 80.3 | 58.7 | 67.8 (+16.8) | 63.2 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 (+20.0) | 72.5 (+15.0) | 55.0 | 100.0 | 89.2 | 36.0 | 21.1 | 75.0 (n=16) |
| en | 100.0 (+12.5) | 74.2 (+10.8) | 70.0 | 100.0 | 88.2 | 36.6 | 34.7 | 70.4 (n=27) |
| bn | 100.0 (+67.5) | 25.0 (+16.3) | 17.5 | 100.0 | 54.9 | 76.1 | 50.1 | 12.5 (n=16) |
| ta | 100.0 (+55.0) | 16.3 (+6.3) | 15.0 | 100.0 | 49.6 | 134.4 | 47.8 | 0.0 (n=16) |
| te | 100.0 (+55.0) | 23.8 (+13.8) | 15.0 | 100.0 | 51.0 | 74.9 | 52.0 | 12.5 (n=16) |
| mr | 100.0 (+47.5) | 42.5 (+23.8) | 30.0 | 100.0 | 72.7 | 68.9 | 31.8 | 12.5 (n=16) |
| kn | 100.0 (+52.5) | 16.3 (+12.5) | 2.5 | 100.0 | 46.0 | 79.7 | 50.2 | 25.0 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 89.6 | 100.0 / 82.5 | 100.0 / 87.0 | 100.0 / 100.0 | 100.0 / 85.7 | 100.0 / 50.0 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 100.0 |
| en | 100.0 / 79.1 | 100.0 / 86.6 | 100.0 / 97.4 | 100.0 / 97.2 | 100.0 / 88.9 | 100.0 / 80.0 | 100.0 / 100.0 | 100.0 / 80.0 | 100.0 / 80.0 |
| bn | 100.0 / 44.0 | 100.0 / 68.9 | 100.0 / 53.3 | 100.0 / 84.6 | 100.0 / 22.2 | 100.0 / - | 100.0 / - | 100.0 / 22.2 | 100.0 / - |
| ta | 100.0 / 19.7 | 100.0 / 58.1 | 100.0 / 68.6 | 100.0 / 80.0 | 100.0 / 66.7 | 100.0 / 0.0 | 100.0 / 85.7 | 100.0 / 0.0 | 100.0 / - |
| te | 100.0 / 35.6 | 100.0 / 61.5 | 100.0 / 42.9 | 100.0 / 85.7 | 100.0 / 40.0 | 100.0 / - | 100.0 / 100.0 | 100.0 / - | 100.0 / - |
| mr | 100.0 / 86.3 | 100.0 / 59.0 | 100.0 / 74.3 | 100.0 / 100.0 | 100.0 / 40.0 | 100.0 / - | 100.0 / - | 100.0 / 22.2 | 100.0 / 0.0 |
| kn | 100.0 / 39.0 | 100.0 / 48.1 | 100.0 / 53.3 | 100.0 / 69.8 | 100.0 / 76.9 | 100.0 / - | 100.0 / - | 100.0 / 0.0 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 92 | 28.3 | 57.7 | 65.2 | 41.2 |
| babble 5 dB | 92 | 17.4 | 43.8 | 124.5 | 95.9 |
| clean | 880 | 39.9 | 66.9 | 65.5 | 41.5 |
| pink 15 dB | 99 | 36.4 | 60.7 | 92.6 | 55.5 |
| pink 5 dB | 99 | 27.3 | 46.9 | 71.5 | 63.4 |
| traffic 15 dB | 89 | 43.8 | 66.0 | 60.3 | 37.3 |
| traffic 5 dB | 89 | 43.8 | 64.4 | 57.9 | 41.4 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 600 | 41.0 | 67.8 | 65.5 |
| 15 dB | 280 | 36.1 | 61.3 | 73.8 |
| 5 dB | 280 | 29.3 | 51.9 | 84.0 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 22.5 | 51.5 | 79.4 | 51.6 |
| bn-IN-TanishaaNeural | 40 | 27.5 | 58.2 | 72.9 | 48.6 |
| en-IN-NeerjaExpressiveNeural | 40 | 75.0 | 88.9 | 37.9 | 26.5 |
| en-IN-NeerjaNeural | 40 | 75.0 | 88.6 | 35.6 | 25.9 |
| en-IN-PrabhatNeural | 40 | 72.5 | 87.2 | 36.4 | 51.6 |
| hi-IN-MadhurNeural | 40 | 67.5 | 87.9 | 36.6 | 20.3 |
| hi-IN-SwaraNeural | 40 | 77.5 | 90.4 | 35.4 | 21.8 |
| kn-IN-GaganNeural | 40 | 12.5 | 44.8 | 77.9 | 49.8 |
| kn-IN-SapnaNeural | 40 | 20.0 | 47.2 | 81.6 | 50.7 |
| mr-IN-AarohiNeural | 40 | 45.0 | 74.6 | 70.0 | 33.0 |
| mr-IN-ManoharNeural | 40 | 40.0 | 70.8 | 67.9 | 30.6 |
| ta-IN-PallaviNeural | 40 | 15.0 | 51.5 | 154.9 | 50.7 |
| ta-IN-ValluvarNeural | 40 | 17.5 | 47.6 | 113.8 | 44.9 |
| te-IN-MohanNeural | 40 | 25.0 | 53.4 | 74.5 | 50.6 |
| te-IN-ShrutiNeural | 40 | 22.5 | 48.4 | 75.2 | 53.5 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 600 | 41.0 | 67.8 | 65.5 |
| -15% | 147 | 36.7 | 63.4 | 64.6 |
| +15% | 133 | 38.3 | 66.7 | 66.2 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 330 | 100.0 | 32.4 | 69.4 |
| correction | 60 | 100.0 | 58.3 | 63.6 |
| answer | 195 | 100.0 | 50.3 | 62.5 |
| answer (skip intent) | 15 | 100.0 | 40.0 | 57.1 |

## Language auto-detect vs forced language token

70 clean clips transcribed twice. Forced: 41.4% fully correct (WER 80.9%). Auto-detect: 34.3% (WER 115.2%). Transcript in the wrong script under auto-detect: 52.9%.

| Lang | n | Forced fully correct % | Auto fully correct % | Auto wrong script % |
|---|---|---|---|---|
| hi | 10 | 70.0 | 60.0 | 10.0 |
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
| all forced-language runs | 1422 | 1243 (87%) | 179 (13%) | 0 (0%) | 0 |
| clean | 523 | 438 (84%) | 85 (16%) | 0 (0%) | 0 |
| 15 dB | 286 | 256 (90%) | 30 (10%) | 0 (0%) | 0 |
| 5 dB | 356 | 328 (92%) | 28 (8%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 454 | 414 | 40 | 0 |
| time | 278 | 242 | 36 | 0 |
| scamType | 190 | 164 | 26 | 0 |
| bank | 124 | 116 | 8 | 0 |
| suspectPhone | 105 | 101 | 4 | 0 |
| utr | 89 | 75 | 14 | 0 |
| paymentApp | 84 | 41 | 43 | 0 |
| suspectUpi | 43 | 43 | 0 | 0 |
| suspectAccount | 34 | 30 | 4 | 0 |
| intent | 21 | 17 | 4 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 80 | 47 | 33 | 0 |
| en | 86 | 77 | 9 | 0 |
| bn | 264 | 240 | 24 | 0 |
| ta | 277 | 258 | 19 | 0 |
| te | 260 | 237 | 23 | 0 |
| mr | 162 | 113 | 49 | 0 |
| kn | 293 | 271 | 22 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | ta | asr | fn | 65 | ta-02 ta-03 ta-04 ta-07 ta-08 ta-10 ta-11 ta-12 +13 |
| 2 | amount | te | asr | wrong | 54 | te-01 te-04 te-06 te-07 te-08 te-10 te-13 te-14 +11 |
| 3 | amount | kn | asr | fn | 51 | kn-04 kn-10 kn-13 kn-16 kn-18 kn-23 kn-24 kn-25 +13 |
| 4 | amount | bn | asr | wrong | 48 | bn-02 bn-03 bn-04 bn-05 bn-06 bn-07 bn-12 bn-14 +10 |
| 5 | time | kn | asr | fn | 40 | kn-02 kn-10 kn-12 kn-13 kn-16 kn-20 kn-27 kn-40 +5 |
| 6 | amount | ta | asr | wrong | 39 | ta-01 ta-06 ta-08 ta-11 ta-12 ta-15 ta-17 ta-18 +6 |
| 7 | scamType | bn | asr | fn | 38 | bn-01 bn-03 bn-07 bn-08 bn-09 bn-16 bn-35 bn-04 +1 |
| 8 | scamType | te | asr | fn | 36 | te-01 te-05 te-07 te-08 te-09 te-16 te-18 te-35 |
| 9 | bank | kn | asr | fn | 35 | kn-01 kn-03 kn-05 kn-16 kn-17 kn-18 kn-30 kn-38 +3 |
| 10 | amount | kn | asr | wrong | 34 | kn-03 kn-07 kn-08 kn-11 kn-12 kn-14 kn-17 kn-20 +7 |
| 11 | scamType | kn | asr | fn | 33 | kn-01 kn-05 kn-07 kn-09 kn-16 kn-35 kn-08 kn-18 |
| 12 | amount | bn | asr | fn | 32 | bn-07 bn-11 bn-23 bn-01 bn-02 bn-03 bn-04 bn-06 +9 |
| 13 | time | te | asr | fn | 31 | te-02 te-10 te-12 te-13 te-16 te-20 te-27 te-01 |
| 14 | amount | te | asr | fn | 31 | te-11 te-12 te-18 te-21 te-23 te-02 te-07 te-17 +7 |
| 15 | time | ta | asr | wrong | 27 | ta-04 ta-11 ta-12 ta-13 ta-20 ta-26 ta-40 ta-03 +1 |
| 16 | bank | bn | asr | fn | 25 | bn-03 bn-16 bn-18 bn-38 bn-01 bn-02 bn-06 bn-11 +3 |
| 17 | scamType | ta | asr | fn | 25 | ta-01 ta-04 ta-05 ta-09 ta-16 ta-18 ta-35 ta-03 +1 |
| 18 | bank | te | asr | fn | 23 | te-01 te-16 te-18 te-21 te-12 te-13 te-17 te-29 +1 |
| 19 | bank | ta | asr | fn | 22 | ta-13 ta-17 ta-18 ta-21 ta-30 ta-01 ta-03 ta-12 +1 |
| 20 | suspectPhone | te | asr | fn | 20 | te-09 te-22 te-33 te-39 |
| 21 | time | bn | asr | fn | 19 | bn-03 bn-11 bn-40 bn-02 bn-04 bn-10 bn-12 bn-26 +2 |
| 22 | suspectPhone | bn | asr | fn | 19 | bn-09 bn-22 bn-33 bn-39 |
| 23 | amount | en | asr | fn | 17 | en-04 en-13 en-16 en-02 en-17 en-18 en-25 |
| 24 | suspectPhone | ta | asr | fn | 17 | ta-09 ta-33 ta-39 ta-22 |
| 25 | scamType | mr | asr | fn | 17 | mr-01 mr-03 mr-16 mr-04 mr-18 |
| 26 | suspectPhone | kn | asr | fn | 16 | kn-09 kn-22 kn-33 kn-39 |
| 27 | time | bn | asr | wrong | 15 | bn-07 bn-20 bn-28 bn-40 bn-26 |
| 28 | time | mr | asr | wrong | 15 | mr-07 mr-15 mr-20 mr-26 mr-28 |
| 29 | utr | ta | asr | fn | 14 | ta-14 ta-31 ta-32 |
| 30 | amount | mr | asr | wrong | 14 | mr-02 mr-14 mr-20 mr-23 mr-37 mr-03 mr-06 mr-10 +3 |

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
| amount | wrong | 20000 | 1000 | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 3. te-01 (story) - fails 100% of 5 runs

- Reference: నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు
- Transcript (`te-01__Mohan__r0__te`): నా ఏస్బియాయి ఖాతానుండి అయదు వేలు రూపాయలు పోయాయి పది నిమిశాల కృతం ఉకరుక్య వాయసి అప్డేట్ చేయమని చిప్పరు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **asr**: value not in the transcript |
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

### 8. bn-20 (story) - fails 100% of 5 runs

- Reference: উম্ম... মানে, গতকাল দুপুর আড়াইটায় ফোনপে থেকে দু হাজার ছশো টাকা গেছে
- Transcript (`bn-20__Bashkar__r0__bn`): উম্মো মানে গতকাল দুপুর আরাইতাই ফোন পেথেকে দু হাজার ছাসো টাকা গেছে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2600 | 2000 | 2600 | **asr**: value not in the transcript |
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: আড়াইটায় |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (ফোনপে) but the extractor fails |

### 9. ta-04 (story) - fails 100% of 5 runs

- Reference: ஒருத்தர் தவறுதலாக பணம் அனுப்பிட்டேன்னு சொல்லி திருப்பி அனுப்ப சொன்னார், நான் கூகுள் பே மூலமா பன்னிரண்டாயிரத்து ஐநூறு ரூபாய் அனுப்பிட்டேன், இரண்டு மணி நேரத்துக்கு முன்னாடி
- Transcript (`ta-04__Pallavi__r0__ta`): ஒருத்தர் தவர்தலாக்கே பணம் அனுப்பிட்டேன்னுற் சொல்லி திருப்டி அனுப்ப சொன்னார் நான் கூகுள் பே மூலமா 12.5.5 அனுப்பிட்டேன் 2 மணி நெரத்துக்கு முன்னாடி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12500 | - | 12500 | **asr**: value not in the transcript |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: தவறுதலாக |

### 10. te-18 (story) - fails 100% of 5 runs

- Reference: రెండున్నర లక్షల రూపాయలు పెట్టుబడి పేరుతో తీసుకున్నారు, డబ్బులు డబుల్ అవుతాయన్నారు, యెస్ బ్యాంక్
- Transcript (`te-18__Mohan__r0__te`): రిండునర లక్షల రూపాయలు పిటుబడి పేరుతో తీస్కునారు డబులు డబుల అవుతాయనారు యస్ డాంక్.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 100000 | 250000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: పెట్టుబడి |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: యెస్ బ్యాంక్ |

### 11. kn-08 (story) - fails 100% of 5 runs

- Reference: ಒಂದು ವೀಡಿಯೊ ಕಾಲ್ ಬಂತು, ರೆಕಾರ್ಡ್ ಮಾಡಿ ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ, ಪೇಟಿಎಂ ಮೂಲಕ ಹದಿನೈದು ಸಾವಿರ ರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೇನೆ
- Transcript (`kn-08__Gagan__r0__kn`): ಒಂದು ವಿಡಿಯೋ ಕಾಲ್ಬಂತು ರೆಕಾಡ್ ಮಾಡಿ ಇಗ ಬ್ಲಾಕ್ ಮೇಲ್ ಮಾಡತ್ತಿದ್ದಾರೆ. ಪೇಟಿಯೆ ಮೂಲಕ ಹದಿನೆಯಿದು ಸಾವಿರರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೆಯನೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 1000 | 15000 | **asr**: value not in the transcript |
| scamType | fn | sextortion | - | sextortion | **extractor_form**: near-spelling variant of: ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: ಪೇಟಿಎಂ |

### 12. en-04 (story) - fails 100% of 6 runs

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__Neerja__r0__en`): । । । ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: abhi |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 13. ta-08 (story) - fails 100% of 5 runs

- Reference: ஒரு வீடியோ கால் வந்தது, ரெக்கார்ட் பண்ணி இப்போ மிரட்டல் பண்றாங்க, பேடிஎம் மூலமா பதினைந்தாயிரம் ரூபாய் கொடுத்துட்டேன்
- Transcript (`ta-08__Pallavi__r0__ta`): ஒரு வீடியோ கால் வந்தது ரெக்காட் பண்ணி இப்போ மிறட்டல் பண்டாங்க பேடியம் மூலமா 14 ருபாய் குடுத்து தேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 14 | 15000 | **asr**: value not in the transcript |
| bank | fp | - | Bandhan Bank | - | **asr**: spurious value from a mis-recognised transcript |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: near-spelling variant of: பேடிஎம் |

### 14. te-08 (story) - fails 100% of 5 runs

- Reference: ఒక వీడియో కాల్ వచ్చింది, రికార్డ్ చేసి ఇప్పుడు బ్లాక్‌మెయిల్ చేస్తున్నారు, పేటీఎం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేశాను
- Transcript (`te-08__Mohan__r0__te`): ఉక వీడియో కాల్ వచ్చింది రికాడ్ చేసి ఇపుడు బ్లాక్ మేల్ చేస్తునారు పేటియం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేసాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: బ్లాక్‌మెయిల్ |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: పేటీఎం |

### 15. bn-01 (story) - fails 100% of 5 runs

- Reference: আমার এসবিআই অ্যাকাউন্ট থেকে পাঁচ হাজার টাকা কেটে গেছে, দশ মিনিট আগে একজন KYC আপডেটের জন্য ফোন করেছিল
- Transcript (`bn-01__Bashkar__r0__bn`): আমার এস্বিযাই একাউন্ট থেকে পাঁচ হাজার তাকা কেটে গেছে, দাস মিনিট আগে এক জন কাইক আপডেটের জন ন ফোন কুরে ছিলো.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 16. bn-07 (story) - fails 100% of 5 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__Bashkar__r0__bn`): এত্য়ার কোড পাঠে বলো সকান কোরুন তাকা পারেন। সকান কোর্তে চার হজার নাল্সো নিরান ভিতাকা কেটে গেলো আজ শকাল সারে দস্তায়।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: সাড়ে দশটায় |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: স্ক্যান |

### 17. ta-12 (story) - fails 100% of 5 runs

- Reference: இரண்டாயிரத்து ஐநூறு ரூபாய் கட் ஆயிடுச்சு, அரை மணி நேரத்துக்கு முன்னாடி, இந்தியன் வங்கி
- Transcript (`ta-12__Pallavi__r0__ta`): 2.5 ருபாயி கட் ஆயிடுச்சு அரை மணி நெரத்துக்கு முன்னாடி இந்தியன் வங்கி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 2.5 | 2500 | **asr**: value not in the transcript |

### 18. ta-13 (story) - fails 100% of 5 runs

- Reference: என் 15000 ரூபாய் போயிடுச்சு, ஆக்சிஸ் பேங்க், 3 நாட்களுக்கு முன்பு
- Transcript (`ta-13__Pallavi__r0__ta`): என் பதனேந்தாயிரம் ரோபாய் போயிடுச்சு ஆக்சிஸ் பேங்க மோன்று நாட்கலைக்க முன்பு

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| time | wrong | -3d 12:00 (4320 min ago) | -1d 12:00 (1440 min ago) | -3d 12:00 (4320 min ago) | **asr**: ASR lost/changed: 3 நாட்களுக்கு |

### 19. ta-14 (story) - fails 100% of 5 runs

- Reference: UPI ரெஃபரன்ஸ் நம்பர் 4 0 3 2 1 8 7 6 5 4 3 2, ஐயாயிரம் ரூபாய் போச்சு
- Transcript (`ta-14__Pallavi__r0__ta`): UPI reference number 433217765432. அயாயிரம் ருபாய் போச்சு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | wrong | 403218765432 | 433217765432 | 403218765432 | **asr**: value not in the transcript |

### 20. kn-03 (story) - fails 100% of 5 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__Gagan__r0__kn`): ನಿನ್ನೆ ಸಂಜಿ 7 ಗಂಟಗೆ ಕಸ್ಟಮರ್ ಕೇರ್ನಿಂದ ಕರೆಬಂತು, ಏನಿಡೆಸ್ಕ ಇಂಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು. ನಂತರ ಹಡಿಫ್ಸಕಾತೆಯಂದ ಎರ್ಡು ಲಕ್ಷರೂಪಾಯಿ ತೆಗದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: ಸಂಜೆ |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 21. en-13 (story) - fails 100% of 6 runs

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__Neerja__r0__en`): ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9999 | **asr**: value not in the transcript |
| time | fn | -1d 21:30 (870 min ago) | - | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: raat saade nau baje |

### 22. bn-02 (story) - fails 100% of 5 runs

- Reference: দাদা তাড়াতাড়ি, আমার স্টেট ব্যাংক থেকে সাড়ে তিন হাজার টাকা চলে গেছে, ফোনপে দিয়ে, এইমাত্র
- Transcript (`bn-02__Bashkar__r0__bn`): দাদা তারাতা ডি আমার স্টেট বাইংক থেকে সাডে তিন হাজাত তাকা চুলে গেছে ফোন পে দিয়ে এই মাত্রো

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 3.5 | 3500 | **asr**: value not in the transcript |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (ফোনপে) but the extractor fails |

### 23. te-02 (story) - fails 100% of 5 runs

- Reference: అన్నా త్వరగా, నా అకౌంట్ నుండి ఐదు వేల రూపాయలు పోయాయి, ఫోన్‌పే ద్వారా, ఇప్పుడే జరిగింది
- Transcript (`te-02__Mohan__r0__te`): అన్నా త్వరగా నా అకాంట్ నండి అయిదు వేల రూపాయలు పోయాయి ఫోన్ పే ద్వారా ఇపుడే జరిగింది.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: ఇప్పుడే |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (ఫోన్‌పే) but the extractor fails |

### 24. te-20 (story) - fails 100% of 5 runs

- Reference: అంటే... నిన్న మధ్యాహ్నం 2:30 కి ఫోన్‌పే ద్వారా రెండు వేల ఆరు వందల రూపాయలు పోయాయి
- Transcript (`te-20__Mohan__r0__te`): అంటే నిన్న మధ్యానం రెండు గంటల ముప్పే నిమిశాలు కి ఫోన్ పేద్వారా రెండు వేల ఆరు వందల రూపాయలు పోయాయి.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: 2:30 |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (ఫోన్‌పే) but the extractor fails |

### 25. mr-08 (story) - fails 100% of 5 runs

- Reference: एक व्हिडिओ कॉल आला, रेकॉर्ड करून आता ब्लॅकमेल करत आहेत, पेटीएमवरून पंधरा हजार रुपये दिले
- Transcript (`mr-08__Aarohi__r0__mr`): एक विडियो कॉल आला, रेकॉर्ड करून आता ब्लाकमेल करता है, पेटी एम वरून पंधरा हजार रुपे दिले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **extractor_form**: near-spelling variant of: ब्लॅकमेल |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: key words survive (पेटीएमवरून) but the extractor fails |

### 26. kn-02 (story) - fails 100% of 5 runs

- Reference: ಅಣ್ಣ ಬೇಗ, ನನ್ನ ಅಕೌಂಟ್‌ನಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು, ಫೋನ್‌ಪೇ ಮೂಲಕ, ಈಗಷ್ಟೇ ಆಯಿತು
- Transcript (`kn-02__Gagan__r0__kn`): ಅನ್ನ ಬೇಗಾ ನನ್ನ ಅಕಂಂತ್ನಿಂದ ಆಯಿದು ಸಾವಿರ ರೂಪಾಯ ಹೋಯಿತು ಫೋನ್ಪೇ ಮೂಲಕ ಇಗ ಸ್ಟೇ ಆಯಿತು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **extractor_form**: value is in the transcript but not parsed |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: ಈಗಷ್ಟೇ |

### 27. kn-07 (story) - fails 100% of 5 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__Gagan__r0__kn`): ಒಂದು ರಕೋಡ್ಕಳುಹಿಸಿ ಸ್ಕಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು. ಸ್ಕಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ನಾಲ್ಕುಸಾವಿರ ಒಂಬೈನುರ ತೊಂಬತ್ರೂಬತ್ತು ರೂಪಾಯಿ ಹೋಯಿತು. ಇಂದು ಬಳಿಗೆ ಹತ್ತು ಗಂಟಿಗೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4900 | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 12:00 (0 min ago) | today 10:00 (120 min ago) | **extractor_form**: near-spelling variant of: ಗಂಟೆಗೆ |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 28. en-16 (story) - fails 100% of 6 runs

- Reference: Aaj subah 10 baje ek message aaya, QR scan karne ko bola, scan kiya aur dhai hazaar rupaye chale gaye
- Transcript (`en-16__Neerja__r0__en`): Today, a message in the morning, QR scan to get a scan and 50000 rupees went on.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 50000 | 2500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 09:00 (180 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 baje |

### 29. mr-03 (story) - fails 100% of 5 runs

- Reference: काल संध्याकाळी सात वाजता कस्टमर केअरमधून फोन आला, AnyDesk इन्स्टॉल करायला सांगितलं, मग एचडीएफसी खात्यातून दोन लाख रुपये काढले
- Transcript (`mr-03__Aarohi__r0__mr`): काल संध्याकाली साथ वाजता कस्टमर केर मधून फोन आला, एने डेस्क इंस्टॉल करायला संगितल, मग HDFC खात्यातून दोन लाख रुपे काडले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **extractor_form**: near-spelling variant of: संध्याकाळी |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 30. hi-08 (story) - fails 100% of 5 runs

- Reference: एक लड़की का वीडियो कॉल आया, रिकॉर्ड करके ब्लैकमेल कर रहे हैं, अब तक पंद्रह हज़ार रुपये दे चुका हूँ पेटीएम से
- Transcript (`hi-08__Madhur__r0__hi`): एक लड़की का विडियो कॉल आया, रिकॉर्ड करके ब्लैकमेल कर रहे हैं, अब तक 15,000 रुपए दे चुका हूँ पेटी इन से.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: पेटीएम |

### 31. mr-14 (story) - fails 100% of 5 runs

- Reference: यूपीआय रेफरन्स नंबर 4 0 3 2 1 8 7 6 5 4 3 2, पाच हजार रुपये गेले
- Transcript (`mr-14__Aarohi__r0__mr`): UPI reference number 4032187-54325,000 रुपे गिले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 54325000 | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 32. mr-16 (story) - fails 100% of 5 runs

- Reference: माझ्या account मधून 20,000 rupees debit झाले, ICICI bank, एक तासापूर्वी customer care ला फोन केला होता
- Transcript (`mr-16__Aarohi__r0__mr`): माज़ा अकाउंट मधून 20,000 रूपीज डेबिट जाले, ICICI Bank एक तासा पूर्वी कस्टमर केरला फोन केला होता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |

### 33. mr-33 (answer:suspect) - fails 100% of 5 runs

- Reference: त्याचा नंबर 7 0 1 1 2 2 3 3 4 4
- Transcript (`mr-33__Aarohi__r0__mr`): त्याचा नंबर साथ 011 123344

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |
| suspectAccount | fp | - | 011123344 | - | **asr**: spurious value from a mis-recognised transcript |

### 34. hi-11 (story) - fails 100% of 5 runs

- Reference: डेढ़ लाख रुपये गए हैं मेरे, बैंक ऑफ बड़ौदा का अकाउंट है, कल रात दस बजे
- Transcript (`hi-11__Madhur__r0__hi`): देड़ लाख रुपए गए हैं मेरे बैंक आफ बड़ादा का अकाउंट है कल रात दस बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 150000 | 100000 | 150000 | **extractor_form**: value is in the transcript but not parsed |

### 35. mr-10 (story) - fails 100% of 5 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__Aarohi__r0__mr`): आईडी राहूल डियोटी आट वर आठ हजार रुपे पाठावले, वीस मिनिटाम कूर्वी.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 36. hi-15 (story) - fails 100% of 5 runs

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): पैसे कट गए UTR नंबर है 403218 765 432 5000 रुपए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 403218765432 | - | 403218765432 | **extractor_form**: value is in the transcript but not parsed |

### 37. hi-24 (story) - fails 100% of 5 runs

- Reference: कल दोपहर करीब ढाई बजे फोन पे से छब्बीस सौ रुपये गए
- Transcript (`hi-24__Madhur__r0__hi`): कल दोपहर करीब धाई बजे फोन पे से 2600 रुपए गए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **extractor_form**: key words survive (ढाई बजे) but the extractor fails |

### 38. en-17 (story) - fails 100% of 6 runs

- Reference: Do lakh pachas hazaar rupaye invest karwaye trading app mein, bola paisa double hoga, Yes Bank se gaye
- Transcript (`en-17__Neerja__r0__en`): Do luck purchase, 1000,000 rupees invest kervayet trading app me bola paisa double ho ga? Yes bank se gaye.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 1000000 | 250000 | **asr**: value not in the transcript |

### 39. hi-01 (story) - fails 100% of 5 runs

- Reference: मेरे अकाउंट से पाँच हज़ार रुपये कट गए, दस मिनट पहले एक आदमी ने बोला केवाईसी अपडेट करो, एसबीआई का अकाउंट है
- Transcript (`hi-01__Madhur__r0__hi`): मेरे अकाउंट से 5000 रुपए कट गए, 10 मिनट पहले एक आदमी ने बोला के YC अपडेट करो, SBI का अकाउंट है.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: केवाईसी |

### 40. hi-12 (story) - fails 100% of 5 runs

- Reference: ढाई हज़ार रुपये कटे, आधा घंटा पहले, केनरा बैंक
- Transcript (`hi-12__Madhur__r0__hi`): धाई हजार रुपय कटे आधा घंटा पहले केनरा बैंग

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 1000 | 2500 | **extractor_form**: value is in the transcript but not parsed |
