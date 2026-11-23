# Turant pipeline eval: round2

Generated 2026-11-23T09:11:03.443Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 1510 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).
Deltas in brackets are against `reports/baseline.json`.

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 91.8 (+36.1) | 91.8 | 99.1 | 96.5 | 97.8 (+20.1) | - | - |
| ASR clean, normal rate | 600 | 36.5 (+9.3) | 36.5 | 77.9 | 53.3 | 63.2 (+12.2) | 65.5 | 40.6 |
| ASR noise 15 dB | 280 | 31.8 (+7.1) | 31.8 | 74.6 | 46.1 | 57.0 (+7.9) | 73.8 | 45.0 |
| ASR noise 5 dB | 280 | 25.4 (+6.1) | 25.7 | 74.5 | 35.2 | 47.8 (+7.3) | 84.0 | 67.3 |
| ASR rate -15% / +15% | 280 | 33.2 (+7.5) | 33.2 | 76.0 | 49.8 | 60.2 (+11.9) | 65.5 | 43.4 |
| ASR all (forced language) | 1440 | 32.8 (+7.9) | 32.8 | 76.4 | 47.7 | 58.7 (+10.5) | 70.7 | 47.2 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 49.0% of clean runs and 44.2% of all runs fully correct. Per language (clean): hi 85%, en 80%, bn 31%, ta 24%, te 29%, mr 58%, kn 21%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 64.7 | 54.8 | 59.3 (+16.5) | 54.3 |
| time | 113 | 98.3 | 100.0 | 99.1 | 68.2 | 54.7 | 60.7 (+15.6) | 55.7 |
| scamType | 81 | 100.0 | 90.1 | 94.8 | 98.8 | 46.9 | 63.6 (+0.0) | 60.1 |
| bank | 97 | 99.0 | 99.0 | 99.0 | 96.8 | 73.3 | 83.4 (+20.9) | 79.3 |
| paymentApp | 29 | 96.7 | 100.0 | 98.3 | 96.6 | 44.4 | 60.9 (+0.0) | 56.3 |
| utr | 21 | 95.0 | 90.5 | 92.7 | 80.0 | 17.8 | 29.1 (+0.0) | 28.6 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 100.0 | 63.9 | 78.0 (+0.0) | 65.6 |
| suspectPhone | 29 | 100.0 | 82.8 | 90.6 | 85.7 | 28.6 | 42.9 (+0.0) | 42.6 |
| suspectAccount | 7 | 100.0 | 42.9 | 60.0 | 50.0 | 26.7 | 34.8 (+0.0) | 30.8 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 40.0 | 57.1 (+0.0) | 53.1 |
| **micro** | 566 | 99.1 | 96.5 | 97.8 | 77.9 | 53.3 | 63.2 (+12.2) | 58.7 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 90.0 (+10.0) | 63.8 (+6.3) | 47.5 | 97.5 | 86.0 | 36.0 | 21.1 | 75.0 (n=16) |
| en | 90.0 (+2.5) | 68.3 (+5.0) | 60.0 | 96.4 | 86.0 | 36.6 | 34.7 | 70.4 (n=27) |
| bn | 90.0 (+57.5) | 18.8 (+10.0) | 15.0 | 97.5 | 44.7 | 76.1 | 50.1 | 12.5 (n=16) |
| ta | 92.5 (+47.5) | 15.0 (+5.0) | 12.5 | 98.1 | 41.8 | 134.4 | 47.8 | 0.0 (n=16) |
| te | 92.5 (+47.5) | 21.3 (+11.3) | 10.0 | 98.1 | 42.6 | 74.9 | 52.0 | 12.5 (n=16) |
| mr | 92.5 (+40.0) | 38.8 (+20.0) | 30.0 | 98.1 | 71.9 | 68.9 | 31.8 | 12.5 (n=16) |
| kn | 95.0 (+47.5) | 13.8 (+10.0) | 2.5 | 98.8 | 42.0 | 79.7 | 50.2 | 25.0 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 89.6 | 100.0 / 82.5 | 91.7 / 76.2 | 100.0 / 92.3 | 88.9 / 80.0 | 80.0 / 50.0 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 100.0 |
| en | 100.0 / 79.1 | 97.1 / 86.6 | 96.0 / 93.2 | 91.7 / 90.1 | 100.0 / 88.9 | 85.7 / 75.0 | 100.0 / 100.0 | 88.9 / 75.0 | 100.0 / 80.0 |
| bn | 100.0 / 44.0 | 100.0 / 44.8 | 90.0 / 30.8 | 100.0 / 75.0 | 100.0 / 22.2 | 100.0 / - | 100.0 / - | 85.7 / 22.2 | - / - |
| ta | 100.0 / 19.7 | 100.0 / 43.3 | 95.2 / 41.4 | 100.0 / 77.6 | 100.0 / 66.7 | 100.0 / 0.0 | 100.0 / 85.7 | 85.7 / 0.0 | - / - |
| te | 100.0 / 35.6 | 100.0 / 44.9 | 95.2 / 24.0 | 100.0 / 72.7 | 100.0 / 40.0 | 100.0 / - | 100.0 / 100.0 | 85.7 / - | - / - |
| mr | 100.0 / 86.3 | 100.0 / 56.7 | 95.2 / 66.7 | 100.0 / 100.0 | 100.0 / 40.0 | 80.0 / - | 100.0 / - | 100.0 / 22.2 | - / 0.0 |
| kn | 100.0 / 39.0 | 97.0 / 43.1 | 100.0 / 53.3 | 100.0 / 66.7 | 100.0 / 22.2 | 100.0 / - | 100.0 / - | 85.7 / 0.0 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 92 | 25.0 | 53.8 | 65.2 | 41.2 |
| babble 5 dB | 92 | 16.3 | 40.9 | 124.5 | 95.9 |
| clean | 880 | 35.5 | 62.3 | 65.5 | 41.5 |
| pink 15 dB | 99 | 33.3 | 56.4 | 92.6 | 55.5 |
| pink 5 dB | 99 | 23.2 | 43.3 | 71.5 | 63.4 |
| traffic 15 dB | 89 | 37.1 | 61.1 | 60.3 | 37.3 |
| traffic 5 dB | 89 | 37.1 | 58.9 | 57.9 | 41.4 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 600 | 36.5 | 63.2 | 65.5 |
| 15 dB | 280 | 31.8 | 57.0 | 73.8 |
| 5 dB | 280 | 25.4 | 47.8 | 84.0 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 15.0 | 40.9 | 79.4 | 51.6 |
| bn-IN-TanishaaNeural | 40 | 22.5 | 48.4 | 72.9 | 48.6 |
| en-IN-NeerjaExpressiveNeural | 40 | 67.5 | 86.3 | 37.9 | 26.5 |
| en-IN-NeerjaNeural | 40 | 70.0 | 86.6 | 35.6 | 25.9 |
| en-IN-PrabhatNeural | 40 | 67.5 | 85.2 | 36.4 | 51.6 |
| hi-IN-MadhurNeural | 40 | 57.5 | 83.7 | 36.6 | 20.3 |
| hi-IN-SwaraNeural | 40 | 70.0 | 88.3 | 35.4 | 21.8 |
| kn-IN-GaganNeural | 40 | 10.0 | 42.3 | 77.9 | 49.8 |
| kn-IN-SapnaNeural | 40 | 17.5 | 41.7 | 81.6 | 50.7 |
| mr-IN-AarohiNeural | 40 | 42.5 | 74.3 | 70.0 | 33.0 |
| mr-IN-ManoharNeural | 40 | 35.0 | 69.5 | 67.9 | 30.6 |
| ta-IN-PallaviNeural | 40 | 12.5 | 40.6 | 154.9 | 50.7 |
| ta-IN-ValluvarNeural | 40 | 17.5 | 43.0 | 113.8 | 44.9 |
| te-IN-MohanNeural | 40 | 22.5 | 44.8 | 74.5 | 50.6 |
| te-IN-ShrutiNeural | 40 | 20.0 | 40.3 | 75.2 | 53.5 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 600 | 36.5 | 63.2 | 65.5 |
| -15% | 147 | 32.7 | 57.1 | 64.6 |
| +15% | 133 | 33.8 | 63.3 | 66.2 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 330 | 86.4 | 27.3 | 64.4 |
| correction | 60 | 96.4 | 53.3 | 59.3 |
| answer | 195 | 98.9 | 46.7 | 59.5 |
| answer (skip intent) | 15 | 100.0 | 40.0 | 57.1 |

## Language auto-detect vs forced language token

70 clean clips transcribed twice. Forced: 38.6% fully correct (WER 80.9%). Auto-detect: 32.9% (WER 115.2%). Transcript in the wrong script under auto-detect: 52.9%.

| Lang | n | Forced fully correct % | Auto fully correct % | Auto wrong script % |
|---|---|---|---|---|
| hi | 10 | 60.0 | 50.0 | 10.0 |
| en | 10 | 70.0 | 70.0 | 40.0 |
| bn | 10 | 20.0 | 20.0 | 100.0 |
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
| all forced-language runs | 1574 | 1234 (78%) | 232 (15%) | 108 (7%) | 49 |
| clean | 590 | 433 (73%) | 112 (19%) | 45 (8%) | 21 |
| 15 dB | 314 | 253 (81%) | 40 (13%) | 21 (7%) | 9 |
| 5 dB | 380 | 325 (86%) | 34 (9%) | 21 (6%) | 10 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 455 | 415 | 40 | 0 |
| time | 317 | 258 | 59 | 0 |
| scamType | 242 | 168 | 33 | 41 |
| bank | 166 | 131 | 29 | 6 |
| suspectPhone | 109 | 79 | 4 | 26 |
| paymentApp | 93 | 45 | 47 | 1 |
| utr | 93 | 68 | 11 | 14 |
| suspectUpi | 43 | 43 | 0 | 0 |
| suspectAccount | 33 | 9 | 4 | 20 |
| intent | 23 | 18 | 5 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 99 | 51 | 32 | 16 |
| en | 108 | 74 | 12 | 22 |
| bn | 297 | 240 | 37 | 20 |
| ta | 301 | 251 | 35 | 15 |
| te | 290 | 245 | 30 | 15 |
| mr | 173 | 105 | 53 | 15 |
| kn | 306 | 268 | 33 | 5 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | ta | asr | fn | 65 | ta-02 ta-03 ta-04 ta-07 ta-08 ta-10 ta-11 ta-12 +13 |
| 2 | amount | te | asr | wrong | 54 | te-01 te-04 te-06 te-07 te-08 te-10 te-13 te-14 +11 |
| 3 | amount | kn | asr | fn | 51 | kn-04 kn-10 kn-13 kn-16 kn-18 kn-23 kn-24 kn-25 +13 |
| 4 | amount | bn | asr | wrong | 49 | bn-02 bn-03 bn-04 bn-05 bn-06 bn-07 bn-12 bn-14 +10 |
| 5 | time | kn | asr | fn | 42 | kn-02 kn-10 kn-12 kn-13 kn-16 kn-20 kn-26 kn-27 +6 |
| 6 | amount | ta | asr | wrong | 39 | ta-01 ta-06 ta-08 ta-11 ta-12 ta-15 ta-17 ta-18 +6 |
| 7 | scamType | te | asr | fn | 39 | te-01 te-05 te-07 te-08 te-09 te-16 te-18 te-35 |
| 8 | time | te | asr | fn | 37 | te-01 te-02 te-10 te-12 te-13 te-16 te-20 te-27 +2 |
| 9 | scamType | bn | asr | fn | 36 | bn-01 bn-03 bn-07 bn-08 bn-09 bn-16 bn-35 bn-04 |
| 10 | bank | kn | asr | fn | 35 | kn-01 kn-03 kn-05 kn-16 kn-17 kn-18 kn-30 kn-38 +3 |
| 11 | amount | kn | asr | wrong | 34 | kn-03 kn-07 kn-08 kn-11 kn-12 kn-14 kn-17 kn-20 +7 |
| 12 | scamType | kn | asr | fn | 33 | kn-01 kn-05 kn-07 kn-09 kn-16 kn-35 kn-08 kn-18 |
| 13 | amount | bn | asr | fn | 32 | bn-07 bn-11 bn-23 bn-01 bn-02 bn-03 bn-04 bn-06 +9 |
| 14 | bank | te | asr | fn | 32 | te-01 te-03 te-16 te-18 te-21 te-38 te-12 te-13 +3 |
| 15 | amount | te | asr | fn | 31 | te-11 te-12 te-18 te-21 te-23 te-02 te-07 te-17 +7 |
| 16 | bank | bn | asr | fn | 27 | bn-03 bn-16 bn-18 bn-38 bn-01 bn-02 bn-06 bn-11 +3 |
| 17 | scamType | ta | asr | fn | 26 | ta-01 ta-03 ta-04 ta-05 ta-09 ta-16 ta-18 ta-35 +1 |
| 18 | time | ta | asr | wrong | 25 | ta-11 ta-12 ta-13 ta-20 ta-26 ta-40 ta-03 ta-28 |
| 19 | time | bn | asr | fn | 24 | bn-03 bn-11 bn-16 bn-40 bn-02 bn-04 bn-10 bn-12 +3 |
| 20 | bank | ta | asr | fn | 24 | ta-13 ta-17 ta-18 ta-21 ta-30 ta-01 ta-03 ta-12 +3 |
| 21 | time | bn | asr | wrong | 19 | bn-07 bn-12 bn-20 bn-26 bn-28 bn-40 |
| 22 | amount | en | asr | fn | 17 | en-04 en-13 en-16 en-02 en-17 en-18 en-25 |
| 23 | scamType | mr | asr | fn | 17 | mr-01 mr-03 mr-16 mr-04 mr-06 |
| 24 | suspectPhone | ta | asr | fn | 15 | ta-09 ta-33 ta-39 |
| 25 | suspectPhone | te | asr | fn | 15 | te-09 te-33 te-39 |
| 26 | time | mr | asr | wrong | 15 | mr-07 mr-15 mr-20 mr-26 mr-28 |
| 27 | suspectPhone | bn | asr | fn | 14 | bn-09 bn-33 bn-39 |
| 28 | time | ta | asr | fn | 14 | ta-04 ta-07 ta-10 ta-03 ta-13 ta-16 ta-40 |
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

### 2. te-01 (story) - fails 100% of 5 runs

- Reference: నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు
- Transcript (`te-01__Mohan__r0__te`): నా ఏస్బియాయి ఖాతానుండి అయదు వేలు రూపాయలు పోయాయి పది నిమిశాల కృతం ఉకరుక్య వాయసి అప్డేట్ చేయమని చిప్పరు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **asr**: value not in the transcript |
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: క్రితం |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 3. te-16 (story) - fails 100% of 5 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__Mohan__r0__te`): నా అకాంట్ నుండి ఇరావాయ వేలు రుపీస్ డెబిటాయి పోయఈ ఆయిసియాయి బాంక ఒక గంటకృతం కస్టమర్ కియర్ కాల్ చేసాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 20000 | 1000 | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: క్రితం |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 4. ta-08 (story) - fails 100% of 5 runs

- Reference: ஒரு வீடியோ கால் வந்தது, ரெக்கார்ட் பண்ணி இப்போ மிரட்டல் பண்றாங்க, பேடிஎம் மூலமா பதினைந்தாயிரம் ரூபாய் கொடுத்துட்டேன்
- Transcript (`ta-08__Pallavi__r0__ta`): ஒரு வீடியோ கால் வந்தது ரெக்காட் பண்ணி இப்போ மிறட்டல் பண்டாங்க பேடியம் மூலமா 14 ருபாய் குடுத்து தேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 14 | 15000 | **asr**: value not in the transcript |
| scamType | fn | sextortion | - | sextortion | **extractor_form**: near-spelling variant of: மிரட்டல் |
| bank | fp | - | Bandhan Bank | - | **asr**: spurious value from a mis-recognised transcript |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: near-spelling variant of: பேடிஎம் |

### 5. kn-16 (story) - fails 100% of 5 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ನನ ಆಕಾಂಟಿಂದ ಇಪಟ್ಟು ಸಾವರಿದ ರುಪಿಸ್ಟೆ ರುಪಿಸ್ಟೆ ಆಯತು ಎಸೇಶಿ ಬಾಗ್ಗು ಒಂದು ಗಂಟೆ ಹಿಂದೆ ಕಾಸ್ಟಮರ್ಗೆ ಕಾರಗೆ ಕಾಲ್ಮಾಡಿದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 6. bn-08 (story) - fails 100% of 5 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__Bashkar__r0__bn`): একটা ঵্য়া কাল এশে ছিলো রেকার্ড করে একন ব্লাক মেল কুরছে পেটিয়ে পনেরো হাজার তাকা দিয়ে দিয়েছি

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 12:00 (1440 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: পেটিএম |

### 7. ta-04 (story) - fails 100% of 5 runs

- Reference: ஒருத்தர் தவறுதலாக பணம் அனுப்பிட்டேன்னு சொல்லி திருப்பி அனுப்ப சொன்னார், நான் கூகுள் பே மூலமா பன்னிரண்டாயிரத்து ஐநூறு ரூபாய் அனுப்பிட்டேன், இரண்டு மணி நேரத்துக்கு முன்னாடி
- Transcript (`ta-04__Pallavi__r0__ta`): ஒருத்தர் தவர்தலாக்கே பணம் அனுப்பிட்டேன்னுற் சொல்லி திருப்டி அனுப்ப சொன்னார் நான் கூகுள் பே மூலமா 12.5.5 அனுப்பிட்டேன் 2 மணி நெரத்துக்கு முன்னாடி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12500 | - | 12500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | -1d 14:00 (1320 min ago) | today 10:00 (120 min ago) | **extractor_form**: near-spelling variant of: நேரத்துக்கு |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: தவறுதலாக |

### 8. bn-02 (story) - fails 100% of 5 runs

- Reference: দাদা তাড়াতাড়ি, আমার স্টেট ব্যাংক থেকে সাড়ে তিন হাজার টাকা চলে গেছে, ফোনপে দিয়ে, এইমাত্র
- Transcript (`bn-02__Bashkar__r0__bn`): দাদা তারাতা ডি আমার স্টেট বাইংক থেকে সাডে তিন হাজাত তাকা চুলে গেছে ফোন পে দিয়ে এই মাত্রো

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 3.5 | 3500 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **extractor_form**: key words survive (এইমাত্র) but the extractor fails |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (ফোনপে) but the extractor fails |

### 9. bn-16 (story) - fails 100% of 5 runs

- Reference: আমার account থেকে 20,000 টাকা debit হয়ে গেছে, ICICI bank, এক ঘণ্টা আগে customer care এ ফোন করেছিলাম
- Transcript (`bn-16__Bashkar__r0__bn`): আমারা কাম থেকে কে কুডি হাজার টাকা দেবের হোয়ে গেছে এসে এসে বেক এক ঘন্টা আগে কাস্টমার খের এফান কুরে ছিলম।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 10. ta-10 (story) - fails 100% of 5 runs

- Reference: UPI ID rahul dot kyc at ybl க்கு எட்டாயிரம் ரூபாய் அனுப்பினேன், இருபது நிமிஷத்துக்கு முன்னாடி
- Transcript (`ta-10__Pallavi__r0__ta`): UPI ID Rahul.KYC at YPLQ8RM-RUBAI ANIPPINEN, 20 NIMISHAT THIKKU MUNNADI.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: நிமிஷத்துக்கு |
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 11. kn-01 (story) - fails 100% of 5 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): ನನ ಸಬೈ ಕಾತೆಯಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ. ಹತ್ತು ನಿಮಿಷಿಗಳ ಹಿಂದೆ ಒಬ್ಬರು ಕೈಕ ಅಪ್ಪೇಟ್ ಮಾಡಲು ಹೇಳಿದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 12. bn-07 (story) - fails 100% of 5 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__Bashkar__r0__bn`): এত্য়ার কোড পাঠে বলো সকান কোরুন তাকা পারেন। সকান কোর্তে চার হজার নাল্সো নিরান ভিতাকা কেটে গেলো আজ শকাল সারে দস্তায়।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: সাড়ে দশটায় |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: স্ক্যান |

### 13. bn-18 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: দুই লাখ পঞ্চাশ হাজার টাকা ইনভেস্টমেন্টের নামে নিয়ে নিয়েছে, বলেছিল টাকা ডাবল হবে, ইয়েস ব্যাংক
- Transcript (`bn-18__Bashkar__r0__bn`): দুই লাক পন্চাশ হাজার তাকা ইন্্য়ে নামে নিয়ে নিয়ে ছে, বলে ছিলো তাকা ডাবল হবে, ইএস বানক.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 1000 | 250000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | - | **extractor**: fails on the reference text too (fn) |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: ইয়েস ব্যাংক |

### 14. ta-06 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: டெலிகிராம்ல பார்ட் டைம் ஜாப் டாஸ்க் கொடுத்தாங்க, அப்புறம் இன்வெஸ்ட் பண்ண சொன்னாங்க, நான் நாற்பத்தேழாயிரம் ரூபாய் போட்டுட்டேன், கோட்டக் பேங்க்ல இருந்து
- Transcript (`ta-06__Pallavi__r0__ta`): தெலிகிராம்ல பார்்ட்டைம் ஜாப் தாஸ் கொடுத்தாங்க, ஆப்கோரம் இன்வெஸ்ட் பண்ண சொன்னாங்க, நான் 4.3 ராயிரம் ருபாய் கோட்டிட்டேன் கோட்டைக் பேங்களை இருந்து.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 47000 | 4.3 | 47000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | - | **extractor**: fails on the reference text too (fn) |
| bank | fn | Kotak Mahindra Bank | - | Kotak Mahindra Bank | **extractor_form**: near-spelling variant of: கோட்டக் |

### 15. ta-16 (story) - fails 100% of 5 runs

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__Pallavi__r0__ta`): என்லை இருந்து 20தாயரம் ருப்பீஸ் டெபிட் ஆயிடுச்சு ICICI Bank ஒரு மணி நெருத்துக்கு முன்னாடி காஸ்டுமாக்கு கால் பண்ணேன்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | wrong | today 11:00 (60 min ago) | -1d 13:00 (1380 min ago) | today 11:00 (60 min ago) | **extractor_form**: near-spelling variant of: நேரத்துக்கு |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |

### 16. te-18 (story) - fails 100% of 5 runs

- Reference: రెండున్నర లక్షల రూపాయలు పెట్టుబడి పేరుతో తీసుకున్నారు, డబ్బులు డబుల్ అవుతాయన్నారు, యెస్ బ్యాంక్
- Transcript (`te-18__Mohan__r0__te`): రిండునర లక్షల రూపాయలు పిటుబడి పేరుతో తీస్కునారు డబులు డబుల అవుతాయనారు యస్ డాంక్.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 100000 | 250000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: పెట్టుబడి |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: యెస్ బ్యాంక్ |

### 17. kn-08 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: ಒಂದು ವೀಡಿಯೊ ಕಾಲ್ ಬಂತು, ರೆಕಾರ್ಡ್ ಮಾಡಿ ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ, ಪೇಟಿಎಂ ಮೂಲಕ ಹದಿನೈದು ಸಾವಿರ ರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೇನೆ
- Transcript (`kn-08__Gagan__r0__kn`): ಒಂದು ವಿಡಿಯೋ ಕಾಲ್ಬಂತು ರೆಕಾಡ್ ಮಾಡಿ ಇಗ ಬ್ಲಾಕ್ ಮೇಲ್ ಮಾಡತ್ತಿದ್ದಾರೆ. ಪೇಟಿಯೆ ಮೂಲಕ ಹದಿನೆಯಿದು ಸಾವಿರರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೆಯನೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 1000 | 15000 | **asr**: value not in the transcript |
| scamType | fn | sextortion | - | sextortion | **extractor_form**: near-spelling variant of: ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: ಪೇಟಿಎಂ |

### 18. en-04 (story) - fails 100% of 6 runs

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__Neerja__r0__en`): । । । ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: abhi |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 19. ta-12 (story) - fails 100% of 5 runs

- Reference: இரண்டாயிரத்து ஐநூறு ரூபாய் கட் ஆயிடுச்சு, அரை மணி நேரத்துக்கு முன்னாடி, இந்தியன் வங்கி
- Transcript (`ta-12__Pallavi__r0__ta`): 2.5 ருபாயி கட் ஆயிடுச்சு அரை மணி நெரத்துக்கு முன்னாடி இந்தியன் வங்கி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 2.5 | 2500 | **asr**: value not in the transcript |
| time | wrong | today 11:30 (30 min ago) | today 12:30 (-30 min ago) | today 11:30 (30 min ago) | **extractor_form**: near-spelling variant of: நேரத்துக்கு |

### 20. te-04 (story) - fails 100% of 5 runs

- Reference: ఒకతను పొరపాటున డబ్బులు పంపించానని, తిరిగి పంపమని అడిగాడు, నేను గూగుల్ పే ద్వారా పన్నెండు వేల ఐదు వందల రూపాయలు పంపాను, రెండు గంటల క్రితం
- Transcript (`te-04__Mohan__r0__te`): ఒకతను పొరపాటున డబ్బులు పంపించానని తిరిగి పంపమని అడిగాడు. నేను గూగుల్ పే ద్వారా పన్న్యండు వేల అయదు వందల రూపాయలు పంపాను. రెండు గంటల కృతం.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12500 | 100 | 12500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | -1d 14:00 (1320 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: క్రితం |

### 21. te-08 (story) - fails 100% of 5 runs

- Reference: ఒక వీడియో కాల్ వచ్చింది, రికార్డ్ చేసి ఇప్పుడు బ్లాక్‌మెయిల్ చేస్తున్నారు, పేటీఎం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేశాను
- Transcript (`te-08__Mohan__r0__te`): ఉక వీడియో కాల్ వచ్చింది రికాడ్ చేసి ఇపుడు బ్లాక్ మేల్ చేస్తునారు పేటియం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేసాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: బ్లాక్‌మెయిల్ |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: పేటీఎం |

### 22. kn-02 (story) - fails 100% of 5 runs

- Reference: ಅಣ್ಣ ಬೇಗ, ನನ್ನ ಅಕೌಂಟ್‌ನಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು, ಫೋನ್‌ಪೇ ಮೂಲಕ, ಈಗಷ್ಟೇ ಆಯಿತು
- Transcript (`kn-02__Gagan__r0__kn`): ಅನ್ನ ಬೇಗಾ ನನ್ನ ಅಕಂಂತ್ನಿಂದ ಆಯಿದು ಸಾವಿರ ರೂಪಾಯ ಹೋಯಿತು ಫೋನ್ಪೇ ಮೂಲಕ ಇಗ ಸ್ಟೇ ಆಯಿತು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **extractor_form**: value is in the transcript but not parsed |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: ಈಗಷ್ಟೇ |

### 23. kn-07 (story) - fails 100% of 5 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__Gagan__r0__kn`): ಒಂದು ರಕೋಡ್ಕಳುಹಿಸಿ ಸ್ಕಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು. ಸ್ಕಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ನಾಲ್ಕುಸಾವಿರ ಒಂಬೈನುರ ತೊಂಬತ್ರೂಬತ್ತು ರೂಪಾಯಿ ಹೋಯಿತು. ಇಂದು ಬಳಿಗೆ ಹತ್ತು ಗಂಟಿಗೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4900 | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 12:00 (0 min ago) | today 10:00 (120 min ago) | **extractor_form**: near-spelling variant of: ಗಂಟೆಗೆ |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 24. kn-03 (story) - fails 100% of 5 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__Gagan__r0__kn`): ನಿನ್ನೆ ಸಂಜಿ 7 ಗಂಟಗೆ ಕಸ್ಟಮರ್ ಕೇರ್ನಿಂದ ಕರೆಬಂತು, ಏನಿಡೆಸ್ಕ ಇಂಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು. ನಂತರ ಹಡಿಫ್ಸಕಾತೆಯಂದ ಎರ್ಡು ಲಕ್ಷರೂಪಾಯಿ ತೆಗದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: ಸಂಜೆ |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 25. en-13 (story) - fails 100% of 6 runs

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__Neerja__r0__en`): ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9999 | **asr**: value not in the transcript |
| time | fn | -1d 21:30 (870 min ago) | - | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: raat saade nau baje |

### 26. te-02 (story) - fails 100% of 5 runs

- Reference: అన్నా త్వరగా, నా అకౌంట్ నుండి ఐదు వేల రూపాయలు పోయాయి, ఫోన్‌పే ద్వారా, ఇప్పుడే జరిగింది
- Transcript (`te-02__Mohan__r0__te`): అన్నా త్వరగా నా అకాంట్ నండి అయిదు వేల రూపాయలు పోయాయి ఫోన్ పే ద్వారా ఇపుడే జరిగింది.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: ఇప్పుడే |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (ఫోన్‌పే) but the extractor fails |

### 27. mr-08 (story) - fails 100% of 5 runs

- Reference: एक व्हिडिओ कॉल आला, रेकॉर्ड करून आता ब्लॅकमेल करत आहेत, पेटीएमवरून पंधरा हजार रुपये दिले
- Transcript (`mr-08__Aarohi__r0__mr`): एक विडियो कॉल आला, रेकॉर्ड करून आता ब्लाकमेल करता है, पेटी एम वरून पंधरा हजार रुपे दिले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **extractor_form**: near-spelling variant of: ब्लॅकमेल |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: key words survive (पेटीएमवरून) but the extractor fails |

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

### 30. en-15 (story) - fails 100% of 6 runs, also fails on reference text

- Reference: The number that called me was plus 91 70112 23344
- Transcript (`en-15__Neerja__r0__en`): The number that called me was plus 9-17011-23344.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7011223344 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |

### 31. hi-08 (story) - fails 100% of 5 runs

- Reference: एक लड़की का वीडियो कॉल आया, रिकॉर्ड करके ब्लैकमेल कर रहे हैं, अब तक पंद्रह हज़ार रुपये दे चुका हूँ पेटीएम से
- Transcript (`hi-08__Madhur__r0__hi`): एक लड़की का विडियो कॉल आया, रिकॉर्ड करके ब्लैकमेल कर रहे हैं, अब तक 15,000 रुपए दे चुका हूँ पेटी इन से.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: पेटीएम |

### 32. hi-11 (story) - fails 100% of 5 runs

- Reference: डेढ़ लाख रुपये गए हैं मेरे, बैंक ऑफ बड़ौदा का अकाउंट है, कल रात दस बजे
- Transcript (`hi-11__Madhur__r0__hi`): देड़ लाख रुपए गए हैं मेरे बैंक आफ बड़ादा का अकाउंट है कल रात दस बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 150000 | 100000 | 150000 | **extractor_form**: value is in the transcript but not parsed |
| bank | fn | Bank of Baroda | - | Bank of Baroda | **extractor_form**: near-spelling variant of: बड़ौदा |

### 33. mr-10 (story) - fails 100% of 5 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__Aarohi__r0__mr`): आईडी राहूल डियोटी आट वर आठ हजार रुपे पाठावले, वीस मिनिटाम कूर्वी.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 34. mr-14 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: यूपीआय रेफरन्स नंबर 4 0 3 2 1 8 7 6 5 4 3 2, पाच हजार रुपये गेले
- Transcript (`mr-14__Aarohi__r0__mr`): UPI reference number 4032187-54325,000 रुपे गिले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 54325000 | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |

### 35. mr-16 (story) - fails 100% of 5 runs

- Reference: माझ्या account मधून 20,000 rupees debit झाले, ICICI bank, एक तासापूर्वी customer care ला फोन केला होता
- Transcript (`mr-16__Aarohi__r0__mr`): माज़ा अकाउंट मधून 20,000 रूपीज डेबिट जाले, ICICI Bank एक तासा पूर्वी कस्टमर केरला फोन केला होता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |

### 36. mr-33 (answer:suspect) - fails 100% of 5 runs

- Reference: त्याचा नंबर 7 0 1 1 2 2 3 3 4 4
- Transcript (`mr-33__Aarohi__r0__mr`): त्याचा नंबर साथ 011 123344

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |
| suspectAccount | fp | - | 011123344 | - | **asr**: spurious value from a mis-recognised transcript |

### 37. hi-15 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): पैसे कट गए UTR नंबर है 403218 765 432 5000 रुपए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 403218765432 | - | - | **extractor**: fails on the reference text too (fn); value is in the transcript |

### 38. hi-24 (story) - fails 100% of 5 runs

- Reference: कल दोपहर करीब ढाई बजे फोन पे से छब्बीस सौ रुपये गए
- Transcript (`hi-24__Madhur__r0__hi`): कल दोपहर करीब धाई बजे फोन पे से 2600 रुपए गए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **extractor_form**: key words survive (ढाई बजे) but the extractor fails |

### 39. en-11 (story) - fails 100% of 6 runs, also fails on reference text

- Reference: Yesterday night around 10 I got a video call, they recorded it and are now blackmailing me, I already paid fifteen thousand through Google Pay
- Transcript (`en-11__Neerja__r0__en`): Yesterday night around 10 I got a video call. They recorded it and are now blackmailing me. I already paid 15,000 through Google Pay.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | - | **extractor**: fails on the reference text too (fn) |

### 40. en-17 (story) - fails 100% of 6 runs

- Reference: Do lakh pachas hazaar rupaye invest karwaye trading app mein, bola paisa double hoga, Yes Bank se gaye
- Transcript (`en-17__Neerja__r0__en`): Do luck purchase, 1000,000 rupees invest kervayet trading app me bola paisa double ho ga? Yes bank se gaye.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 1000000 | 250000 | **asr**: value not in the transcript |
