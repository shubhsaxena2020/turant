# Turant pipeline eval: llm-fill

Generated 2026-11-23T09:40:14.759Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 884 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).
Deltas in brackets are against `reports/baseline.json`.

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 30.0 (-25.7) | 30.0 | 66.3 | 100.0 | 79.7 (+2.1) | - | - |
| ASR clean, normal rate | 600 | 18.5 (-8.7) | 18.5 | 47.4 | 67.7 | 55.8 (+4.7) | 65.5 | 40.6 |
| ASR noise 15 dB | 85 | 37.6 (+13.0) | 37.6 | 55.3 | 77.2 | 64.5 (+15.4) | 44.7 | 32.7 |
| ASR noise 5 dB | 67 | 35.8 (+16.5) | 35.8 | 55.0 | 70.6 | 61.9 (+21.4) | 48.4 | 46.4 |
| ASR rate -15% / +15% | 94 | 39.4 (+13.6) | 39.4 | 59.6 | 82.5 | 69.2 (+20.9) | 43.0 | 40.0 |
| ASR all (forced language) | 846 | 24.1 (-0.7) | 24.1 | 49.5 | 69.9 | 57.9 (+9.7) | 60.7 | 40.3 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 50.2% of clean runs and 56.5% of all runs fully correct. Per language (clean): hi 85%, en 77%, bn 29%, ta 26%, te 35%, mr 68%, kn 19%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 99.4 | 100.0 | 99.7 | 59.4 | 57.9 | 58.7 (+15.9) | 63.0 |
| time | 113 | 47.7 | 100.0 | 64.6 | 35.0 | 72.8 | 47.3 (+2.2) | 47.3 |
| scamType | 81 | 36.0 | 100.0 | 52.9 | 29.0 | 81.1 | 42.8 (-20.8) | 43.2 |
| bank | 97 | 99.0 | 100.0 | 99.5 | 97.2 | 84.5 | 90.4 (+27.9) | 90.3 |
| paymentApp | 29 | 61.7 | 100.0 | 76.3 | 62.4 | 84.1 | 71.6 (+10.8) | 72.6 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 38.1 | 35.6 | 36.8 (+7.7) | 43.8 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 76.7 | 63.9 | 69.7 (-8.3) | 75.6 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 56.4 | 34.9 | 43.1 (+0.3) | 50.0 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 31.3 | 33.3 | 32.3 (-2.5) | 31.3 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 40.0 | 57.1 (+0.0) | 70.3 |
| **micro** | 566 | 66.3 | 100.0 | 79.7 | 47.4 | 67.7 | 55.8 (+4.7) | 57.9 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 35.0 (-45.0) | 33.8 (-23.8) | 66.7 | 80.4 | 73.6 | 36.0 | 21.1 | 75.0 (n=16) |
| en | 37.5 (-50.0) | 30.0 (-33.3) | 47.4 | 81.0 | 69.8 | 36.6 | 34.7 | 70.4 (n=27) |
| bn | 25.0 (-7.5) | 8.8 (+0.0) | 25.0 | 79.0 | 48.2 | 76.1 | 50.1 | 12.5 (n=16) |
| ta | 25.0 (-20.0) | 13.8 (+3.8) | 33.3 | 78.8 | 43.3 | 134.4 | 47.8 | 0.0 (n=16) |
| te | 30.0 (-15.0) | 12.5 (+2.5) | 11.1 | 80.0 | 47.1 | 74.9 | 52.0 | 12.5 (n=16) |
| mr | 27.5 (-25.0) | 17.5 (-1.3) | 33.3 | 79.2 | 62.8 | 68.9 | 31.8 | 12.5 (n=16) |
| kn | 30.0 (-17.5) | 7.5 (+3.8) | 14.3 | 79.6 | 35.9 | 79.7 | 50.2 | 25.0 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 88.7 | 64.0 / 53.6 | 57.8 / 59.1 | 100.0 / 100.0 | 72.7 / 63.6 | 100.0 / 54.5 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 100.0 |
| en | 100.0 / 78.5 | 69.4 / 56.8 | 59.1 / 54.3 | 96.0 / 94.4 | 66.7 / 72.2 | 100.0 / 66.7 | 100.0 / 100.0 | 100.0 / 76.9 | 100.0 / 100.0 |
| bn | 98.0 / 45.8 | 62.7 / 44.0 | 51.2 / 33.7 | 100.0 / 86.8 | 80.0 / 93.3 | 100.0 / 46.2 | 100.0 / - | 100.0 / 16.7 | 100.0 / - |
| ta | 100.0 / 26.7 | 64.0 / 40.4 | 50.0 / 44.4 | 100.0 / 84.6 | 72.7 / 70.6 | 100.0 / 0.0 | 100.0 / 75.0 | 100.0 / 0.0 | 100.0 / 0.0 |
| te | 100.0 / 39.2 | 64.0 / 46.3 | 51.2 / 31.0 | 100.0 / 92.3 | 88.9 / 63.2 | 100.0 / 36.4 | 100.0 / 100.0 | 100.0 / 0.0 | 100.0 / 0.0 |
| mr | 100.0 / 87.5 | 64.0 / 42.4 | 50.0 / 46.5 | 100.0 / 100.0 | 80.0 / 80.0 | 100.0 / 33.3 | 100.0 / 0.0 | 100.0 / 57.1 | 100.0 / 0.0 |
| kn | 100.0 / 34.4 | 64.0 / 42.9 | 51.2 / 23.0 | 100.0 / 68.2 | 80.0 / 63.2 | 100.0 / 0.0 | 100.0 / 0.0 | 100.0 / 0.0 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 22 | 31.8 | 59.4 | 36.5 | 30.3 |
| babble 5 dB | 15 | 40.0 | 62.9 | 48.7 | 44.1 |
| clean | 694 | 21.3 | 57.2 | 63.0 | 40.5 |
| pink 15 dB | 22 | 45.5 | 72.5 | 46.6 | 34.3 |
| pink 5 dB | 16 | 43.8 | 63.4 | 58.6 | 82.6 |
| traffic 15 dB | 41 | 36.6 | 62.9 | 47.1 | 33.1 |
| traffic 5 dB | 36 | 30.6 | 61.0 | 44.2 | 34.6 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 600 | 18.5 | 55.8 | 65.5 |
| 15 dB | 85 | 37.6 | 64.5 | 44.7 |
| 5 dB | 67 | 35.8 | 61.9 | 48.4 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 10.0 | 45.8 | 79.4 | 51.6 |
| bn-IN-TanishaaNeural | 40 | 7.5 | 50.5 | 72.9 | 48.6 |
| en-IN-NeerjaExpressiveNeural | 40 | 30.0 | 71.9 | 37.9 | 26.5 |
| en-IN-NeerjaNeural | 40 | 32.5 | 70.0 | 35.6 | 25.9 |
| en-IN-PrabhatNeural | 40 | 27.5 | 67.6 | 36.4 | 51.6 |
| hi-IN-MadhurNeural | 40 | 32.5 | 72.0 | 36.6 | 20.3 |
| hi-IN-SwaraNeural | 40 | 35.0 | 75.2 | 35.4 | 21.8 |
| kn-IN-GaganNeural | 40 | 5.0 | 35.5 | 77.9 | 49.8 |
| kn-IN-SapnaNeural | 40 | 10.0 | 36.3 | 81.6 | 50.7 |
| mr-IN-AarohiNeural | 40 | 22.5 | 65.0 | 70.0 | 33.0 |
| mr-IN-ManoharNeural | 40 | 12.5 | 60.7 | 67.9 | 30.6 |
| ta-IN-PallaviNeural | 40 | 15.0 | 43.3 | 154.9 | 50.7 |
| ta-IN-ValluvarNeural | 40 | 12.5 | 43.3 | 113.8 | 44.9 |
| te-IN-MohanNeural | 40 | 10.0 | 49.5 | 74.5 | 50.6 |
| te-IN-ShrutiNeural | 40 | 15.0 | 44.7 | 75.2 | 53.5 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 600 | 18.5 | 55.8 | 65.5 |
| -15% | 50 | 40.0 | 68.5 | 43.5 |
| +15% | 44 | 38.6 | 69.9 | 42.5 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 330 | 22.7 | 11.8 | 61.6 |
| correction | 60 | 100.0 | 56.7 | 62.4 |
| answer | 195 | 15.4 | 16.4 | 37.4 |
| answer (skip intent) | 15 | 100.0 | 40.0 | 31.6 |

## Language auto-detect vs forced language token

38 clean clips transcribed twice. Forced: 34.2% fully correct (WER 83.5%). Auto-detect: 31.6% (WER 85.6%). Transcript in the wrong script under auto-detect: 23.7%.

| Lang | n | Forced fully correct % | Auto fully correct % | Auto wrong script % |
|---|---|---|---|---|
| hi | 9 | 11.1 | 11.1 | 0.0 |
| en | 7 | 57.1 | 57.1 | 14.3 |
| bn | 2 | 50.0 | 100.0 | 100.0 |
| ta | 10 | 10.0 | 10.0 | 10.0 |
| te | 2 | 100.0 | 50.0 | 100.0 |
| mr | 6 | 33.3 | 33.3 | 16.7 |
| kn | 2 | 100.0 | 50.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 1271 | 509 (40%) | 76 (6%) | 686 (54%) | 0 |
| clean | 1029 | 422 (41%) | 66 (6%) | 541 (53%) | 0 |
| 15 dB | 84 | 27 (32%) | 4 (5%) | 53 (63%) | 0 |
| 5 dB | 67 | 31 (46%) | 1 (1%) | 35 (52%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| scamType | 430 | 63 | 11 | 356 |
| time | 425 | 99 | 26 | 300 |
| amount | 184 | 166 | 17 | 1 |
| suspectPhone | 63 | 62 | 1 | 0 |
| bank | 48 | 42 | 5 | 1 |
| paymentApp | 46 | 12 | 6 | 28 |
| utr | 34 | 29 | 5 | 0 |
| suspectUpi | 15 | 15 | 0 | 0 |
| suspectAccount | 15 | 13 | 2 | 0 |
| intent | 11 | 8 | 3 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 124 | 19 | 16 | 89 |
| en | 220 | 45 | 16 | 159 |
| bn | 184 | 92 | 4 | 88 |
| ta | 193 | 102 | 7 | 84 |
| te | 194 | 105 | 6 | 83 |
| mr | 152 | 40 | 12 | 100 |
| kn | 204 | 106 | 15 | 83 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | en | extractor | fp | 79 | en-04 en-08 en-09 en-12 en-13 en-15 en-18 en-19 +10 |
| 2 | time | en | extractor | fp | 71 | en-06 en-07 en-08 en-10 en-15 en-17 en-19 en-20 +7 |
| 3 | scamType | mr | extractor | fp | 55 | mr-02 mr-10 mr-11 mr-12 mr-13 mr-14 mr-15 mr-17 +13 |
| 4 | scamType | bn | extractor | fp | 48 | bn-02 bn-10 bn-11 bn-12 bn-13 bn-14 bn-15 bn-17 +12 |
| 5 | scamType | kn | extractor | fp | 45 | kn-02 kn-10 kn-11 kn-12 kn-13 kn-14 kn-15 kn-17 +13 |
| 6 | scamType | ta | extractor | fp | 44 | ta-02 ta-10 ta-11 ta-12 ta-13 ta-14 ta-15 ta-17 +14 |
| 7 | scamType | hi | extractor | fp | 43 | hi-02 hi-10 hi-11 hi-12 hi-13 hi-15 hi-19 hi-21 +9 |
| 8 | scamType | te | extractor | fp | 42 | te-02 te-10 te-11 te-12 te-13 te-14 te-15 te-17 +11 |
| 9 | time | hi | extractor | fp | 41 | hi-05 hi-08 hi-09 hi-13 hi-15 hi-17 hi-19 hi-21 +8 |
| 10 | time | mr | extractor | fp | 41 | mr-05 mr-06 mr-08 mr-09 mr-14 mr-17 mr-18 mr-19 +9 |
| 11 | time | bn | extractor | fp | 39 | bn-05 bn-06 bn-08 bn-09 bn-14 bn-17 bn-18 bn-19 +9 |
| 12 | time | ta | extractor | fp | 36 | ta-05 ta-06 ta-08 ta-09 ta-14 ta-17 ta-18 ta-19 +10 |
| 13 | time | te | extractor | fp | 36 | te-05 te-06 te-08 te-09 te-14 te-17 te-18 te-19 +9 |
| 14 | time | kn | extractor | fp | 36 | kn-05 kn-06 kn-08 kn-09 kn-14 kn-17 kn-18 kn-19 +10 |
| 15 | amount | te | asr | wrong | 30 | te-01 te-04 te-06 te-07 te-08 te-10 te-12 te-13 +9 |
| 16 | amount | ta | asr | wrong | 28 | ta-01 ta-02 ta-04 ta-06 ta-07 ta-08 ta-11 ta-12 +8 |
| 17 | amount | kn | asr | wrong | 26 | kn-03 kn-04 kn-07 kn-08 kn-10 kn-11 kn-12 kn-13 +8 |
| 18 | amount | bn | asr | wrong | 24 | bn-02 bn-03 bn-04 bn-05 bn-06 bn-07 bn-12 bn-14 +6 |
| 19 | bank | kn | asr | fn | 16 | kn-01 kn-03 kn-05 kn-16 kn-17 kn-18 kn-30 kn-38 |
| 20 | time | ta | asr | wrong | 13 | ta-04 ta-07 ta-11 ta-12 ta-13 ta-20 ta-26 ta-40 |
| 21 | time | bn | asr | wrong | 11 | bn-03 bn-07 bn-11 bn-20 bn-28 bn-40 |
| 22 | amount | en | asr | wrong | 10 | en-12 en-16 en-17 en-25 |
| 23 | bank | bn | asr | fn | 10 | bn-03 bn-16 bn-18 bn-38 |
| 24 | amount | ta | asr | fn | 10 | ta-03 ta-07 ta-10 ta-14 ta-21 ta-23 ta-31 ta-37 |
| 25 | suspectPhone | te | asr | fn | 10 | te-09 te-22 te-33 te-39 |
| 26 | scamType | kn | asr | wrong | 10 | kn-01 kn-05 kn-09 kn-16 kn-35 |
| 27 | time | kn | asr | wrong | 10 | kn-03 kn-16 kn-20 kn-26 kn-40 |
| 28 | suspectPhone | bn | asr | fn | 9 | bn-09 bn-22 bn-33 bn-39 |
| 29 | scamType | te | asr | wrong | 9 | te-01 te-07 te-09 te-16 te-18 te-35 |
| 30 | bank | te | asr | fn | 9 | te-03 te-16 te-21 te-38 te-29 te-30 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. en-20 (story) - fails 100% of 6 runs, also fails on reference text

- Reference: uh the guy called from 9 8 1 1 1, 2 2 2 3 3 and said he is from the electricity board
- Transcript (`en-20__Neerja__r0__en`): And the guy called from 98111 to 2233 and said he is from the electricity board.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | fake_customer_care | fake_customer_care | **extractor**: fails on the reference text too (fp) |
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 2. en-15 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: The number that called me was plus 91 70112 23344
- Transcript (`en-15__Neerja__r0__en`): The number that called me was plus 9-17011-23344.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| suspectPhone | wrong | 7011223344 | 1701123344 | 7011223344 | **asr**: value not in the transcript |

### 3. en-19 (story) - fails 100% of 4 runs, also fails on reference text

- Reference: The UPI ID was sharma123 at paytm, I sent him three thousand five hundred
- Transcript (`en-19__Neerja__r0__en`): The UPI ID was Sharma123 at Paytm, I sent him 3500.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| paymentApp | fp | - | Paytm | Paytm | **extractor**: fails on the reference text too (fp) |

### 4. en-30 (answer:bank) - fails 100% of 6 runs, also fails on reference text

- Reference: it's an IDFC First Bank account
- Transcript (`en-30__Neerja__r0__en`): It's an IDFC first bank account.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 5. en-34 (answer:suspect) - fails 100% of 6 runs, also fails on reference text

- Reference: his number is 9 8 7 6 5 4 3 2 1 0
- Transcript (`en-34__Neerja__r0__en`): His number is 987-654-3210.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 6. bn-19 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: যে অ্যাকাউন্টে টাকা গেছে তার নম্বর 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`bn-19__Bashkar__r0__bn`): জে একান্তে টাকা গেছে তার নোমবর পাচ সুন্ন এক সুন্ন দুই তিন চার পাচ ছায় সাক আট এক দুই.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| suspectPhone | fp | - | 1123456812 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectAccount | fn | 50100234567812 | - | 50100234567812 | **asr**: value not in the transcript |

### 7. ta-24 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: நாலாயிரத்து தொள்ளாயிரத்து தொண்ணூத்தொன்பது
- Transcript (`ta-24__Pallavi__r0__ta`): நாலாயிரத்து தொள்ளாயிரத்து தொன்னு தொன்பது

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4900 | 4999 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 8. te-25 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: 1200 రూపాయలు
- Transcript (`te-25__Mohan__r0__te`): ఉకా వియి రెండు వందలు రూపాయలు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 1200 | 200 | 1200 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 9. te-36 (answer:bank) - fails 100% of 4 runs

- Reference: తెలియదు
- Transcript (`te-36__Mohan__r0__te`): తలియగు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| scamType | fp | - | other | - | **asr**: spurious value from a mis-recognised transcript |
| intent | fn | skip | - | skip | **asr**: skip phrase not recognised |

### 10. mr-14 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: यूपीआय रेफरन्स नंबर 4 0 3 2 1 8 7 6 5 4 3 2, पाच हजार रुपये गेले
- Transcript (`mr-14__Aarohi__r0__mr`): UPI reference number 4032187-54325,000 रुपे गिले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 54325000 | 5000 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | wrong | 403218765432 | 403218754325 | 403218765432 | **asr**: value not in the transcript |

### 11. ta-32 (answer:utr) - fails 100% of 3 runs

- Reference: 4567 8901 2345
- Transcript (`ta-32__Pallavi__r0__ta`): 45679 போசியம் ஒன்று 2345

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 45679 | - | **asr**: spurious value from a mis-recognised transcript |
| time | fp | - | today 12:00 (0 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| scamType | fp | - | other | - | **asr**: spurious value from a mis-recognised transcript |
| utr | fn | 456789012345 | - | 456789012345 | **asr**: value not in the transcript |

### 12. en-24 (answer:amount) - fails 100% of 5 runs, also fails on reference text

- Reference: around 4,999 rupees
- Transcript (`en-24__Neerja__r0__en`): Around Rs 4,999.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 13. bn-22 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: ওর নম্বর নয় নয় আট আট সাত সাত ছয় ছয় পাঁচ পাঁচ
- Transcript (`bn-22__Bashkar__r0__bn`): ওর নমব্য নাই নাই আট আট আট সাত শাট ছয ছয পাচ পাচ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 88765 | - | **asr**: spurious value from a mis-recognised transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| suspectPhone | fn | 9988776655 | - | 9988776655 | **asr**: value not in the transcript |

### 14. mr-24 (answer:amount) - fails 100% of 5 runs, also fails on reference text

- Reference: चार हजार नऊशे नव्याण्णव
- Transcript (`mr-24__Aarohi__r0__mr`): 4,999

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 15. bn-24 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: চার হাজার নশো নিরানব্বই
- Transcript (`bn-24__Bashkar__r0__bn`): চার হাজার নসো নিরান্মোই

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4000 | 4999 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 16. te-22 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: వాడి నంబర్ తొమ్మిది తొమ్మిది ఎనిమిది ఎనిమిది ఏడు ఏడు ఆరు ఆరు ఐదు ఐదు
- Transcript (`te-22__Mohan__r0__te`): వాడి నంబర తుమ్మిది ఎనిమిది ఎనిమిది ఎడు ఎడు ఎడు ఆరు ఆరు ఆయిదు ఆయిదు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | wrong | 9988776655 | 9888776555 | 9988776655 | **asr**: value not in the transcript |

### 17. te-24 (answer:amount) - fails 100% of 3 runs, also fails on reference text

- Reference: నాలుగు వేల తొమ్మిది వందల తొంభై తొమ్మిది
- Transcript (`te-24__Mohan__r0__te`): నాలుగు వేల తుమ్మిది వందల తుమ్ భఈ తుమ్మిది.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4900 | 4999 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 18. te-39 (correction) - fails 100% of 5 runs

- Reference: నంబర్ తప్పు, 9 8 1 1 1 2 2 2 3 3
- Transcript (`te-39__Mohan__r0__te`): నంబర్ తప్పు. తుమ్మిది ఎనిమిది ఒంటి గంటా ఒంటి గంటా ఒంటి ఒంటి ఒంటి ఒంటి �

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 17 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 19. mr-23 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: पाच हजार रुपये
- Transcript (`mr-23__Aarohi__r0__mr`): पाच हजार रुपे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 20. kn-23 (answer:amount) - fails 100% of 3 runs, also fails on reference text

- Reference: ಐದು ಸಾವಿರ ರೂಪಾಯಿ
- Transcript (`kn-23__Gagan__r0__kn`): ಆಿದು ಸಾವಿರ ರೂಪಾಯಿ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 21. hi-24 (story) - fails 100% of 4 runs, also fails on reference text

- Reference: कल दोपहर करीब ढाई बजे फोन पे से छब्बीस सौ रुपये गए
- Transcript (`hi-24__Madhur__r0__hi`): कल दोपहर करीब धाई बजे फोन पे से 2600 रुपए गए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **extractor_form**: key words survive (ढाई बजे) but the extractor fails |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 22. hi-32 (answer:bank) - fails 100% of 4 runs, also fails on reference text

- Reference: बैंक ऑफ इंडिया
- Transcript (`hi-32__Madhur__r0__hi`): Bank of India

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 23. ta-08 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: ஒரு வீடியோ கால் வந்தது, ரெக்கார்ட் பண்ணி இப்போ மிரட்டல் பண்றாங்க, பேடிஎம் மூலமா பதினைந்தாயிரம் ரூபாய் கொடுத்துட்டேன்
- Transcript (`ta-08__Pallavi__r0__ta`): ஒரு வீடியோ கால் வந்தது ரெக்காட் பண்ணி இப்போ மிறட்டல் பண்டாங்க பேடியம் மூலமா 14 ருபாய் குடுத்து தேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 14 | 15000 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| bank | fp | - | Bandhan Bank | - | **asr**: spurious value from a mis-recognised transcript |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: near-spelling variant of: பேடிஎம் |

### 24. ta-14 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: UPI ரெஃபரன்ஸ் நம்பர் 4 0 3 2 1 8 7 6 5 4 3 2, ஐயாயிரம் ரூபாய் போச்சு
- Transcript (`ta-14__Pallavi__r0__ta`): UPI reference number 433217765432. அயாயிரம் ருபாய் போச்சு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | wrong | 403218765432 | 433217765432 | 403218765432 | **asr**: value not in the transcript |

### 25. ta-26 (answer:time) - fails 100% of 3 runs, also fails on reference text

- Reference: நேற்று இரவு 9:30 மணிக்கு
- Transcript (`ta-26__Pallavi__r0__ta`): நேற்றியரவு 90 மணி 30 நிமிடம் மணிக்கு

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 90 | - | **asr**: spurious value from a mis-recognised transcript |
| time | wrong | -1d 21:30 (870 min ago) | today 11:30 (30 min ago) | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: இரவு 9:30 |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 26. ta-39 (correction) - fails 100% of 5 runs

- Reference: நம்பர் தப்பு, 9 8 1 1 1 2 2 2 3 3
- Transcript (`ta-39__Pallavi__r0__ta`): நம்பர் தப்பு, 1712122233

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 27. mr-19 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: ज्या खात्यात पैसे गेले त्याचा नंबर 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`mr-19__Aarohi__r0__mr`): जा खात्यात पईसे गेले त्याचा नंबर पाच शून्य एक शून्य शून्य दोन तीन चार पाच सहा साथ आठेक दोन

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| suspectPhone | fp | - | 0002345678 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectAccount | wrong | 50100234567812 | 5010023456 | 50100234567812 | **asr**: value not in the transcript |

### 28. mr-33 (answer:suspect) - fails 100% of 2 runs, also fails on reference text

- Reference: त्याचा नंबर 7 0 1 1 2 2 3 3 4 4
- Transcript (`mr-33__Aarohi__r0__mr`): त्याचा नंबर साथ 011 123344

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |
| suspectAccount | fp | - | 011123344 | - | **asr**: spurious value from a mis-recognised transcript |

### 29. mr-34 (answer:suspect) - fails 100% of 2 runs, also fails on reference text

- Reference: sharma dot pay at paytm
- Transcript (`mr-34__Aarohi__r0__mr`): शर्मा डियोटी पे आट पेटमा

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| paymentApp | fp | - | Paytm | Paytm | **extractor**: fails on the reference text too (fp) |
| suspectUpi | wrong | sharma.pay@paytm | sharmadioti@paytm | sharma.pay@paytm | **asr**: value not in the transcript |

### 30. kn-14 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: UPI ರೆಫರೆನ್ಸ್ ನಂಬರ್ 4 0 3 2 1 8 7 6 5 4 3 2, ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-14__Gagan__r0__kn`): ಯುಪಾಯ ರೆಫ್ರೆನ್ಸ್ ನಂಬರ್ ನಾಲ್ಕು ಸೊನ್ನೆ ಮೂರು ಎರ್ಡು ಒಂಡು ಎಂಟು ಎಳು ಆರು ಆಯಿದು ನಾಲ್ಕು ಮೂರು ಎರ್ಡು ಆಯಿದು ಸಾವಿರ ರೂಪಾಯ ಹೋಯಿತು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **extractor_form**: value is in the transcript but not parsed |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | wrong | 403218765432 | 40321876432 | 403218765432 | **asr**: value not in the transcript |

### 31. kn-19 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: ಹಣ ಹೋದ ಖಾತೆ ನಂಬರ್ 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`kn-19__Gagan__r0__kn`): ಹಣಹೋದ ಕಾತೆ ನಂಬರ ಐದು ಸೊನ್ನೆ ವಂದು ಸೊನ್ನೆ ಸೊನ್ನೆ ಇರಡು ಮೂರು ನಾಲ್ಕು ಆಯದು ಆರು ಇಳು ಎಂಟು ವಂದು ಇರಡು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | fp | - | 500023456782 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectAccount | fn | 50100234567812 | - | 50100234567812 | **asr**: value not in the transcript |

### 32. kn-26 (answer:time) - fails 100% of 4 runs, also fails on reference text

- Reference: ನಿನ್ನೆ ರಾತ್ರಿ 9:30 ಕ್ಕೆ
- Transcript (`kn-26__Gagan__r0__kn`): ನಿನೆಯ ರಾತ್ರಿ 19ಗಂಟೆ ಮುವತ್ತು ನಿಮಿಶಕ್ಕೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 21:30 (870 min ago) | -1d 22:00 (840 min ago) | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: 9:30 |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 33. kn-34 (answer:suspect) - fails 100% of 2 runs, also fails on reference text

- Reference: sharma dot pay at paytm
- Transcript (`kn-34__Gagan__r0__kn`): Sharma.payitpame

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| paymentApp | fp | - | Paytm | Paytm | **extractor**: fails on the reference text too (fp) |
| suspectUpi | fn | sharma.pay@paytm | - | sharma.pay@paytm | **asr**: value not in the transcript |

### 34. hi-15 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): पैसे कट गए UTR नंबर है 403218 765 432 5000 रुपए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 35. hi-28 (answer:time) - fails 100% of 4 runs, also fails on reference text

- Reference: कल रात करीब साढ़े नौ बजे
- Transcript (`hi-28__Madhur__r0__hi`): कल रात करीब साधे नौ बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 21:30 (870 min ago) | -1d 21:00 (900 min ago) | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: साढ़े |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 36. bn-14 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: ইউপিআই রেফারেন্স নম্বর 4 0 3 2 1 8 7 6 5 4 3 2, পাঁচ হাজার টাকা কেটেছে
- Transcript (`bn-14__Bashkar__r0__bn`): ইউপিযাই রেফারন্স নম্ব্র চার সুন্ন তিন দুই এক আট সাত ছয় পাঁচ চার তিন দুই পাঁচ হাজার তাকা কেটে ছেল।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 46000 | 5000 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 37. te-14 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: UPI రిఫరెన్స్ నంబర్ 4 0 3 2 1 8 7 6 5 4 3 2, ఐదు వేల రూపాయలు పోయాయి
- Transcript (`te-14__Mohan__r0__te`): UPI reference నంబర నాలుగు సున్నా మూడు రెండు ఒంటి గంటా ఎనిమిది ఏడు ఆరు అయ్దు నాలుగు మూడు రెండు అయ్దు వేలరూపాయలు పోయాయి.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **asr**: value not in the transcript |
| time | fp | - | today 11:08 (52 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | wrong | 403218765432 | 403211765432 | 403218765432 | **extractor_form**: value is in the transcript but not parsed |

### 38. kn-08 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: ಒಂದು ವೀಡಿಯೊ ಕಾಲ್ ಬಂತು, ರೆಕಾರ್ಡ್ ಮಾಡಿ ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ, ಪೇಟಿಎಂ ಮೂಲಕ ಹದಿನೈದು ಸಾವಿರ ರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೇನೆ
- Transcript (`kn-08__Gagan__r0__kn`): ಒಂದು ವಿಡಿಯೋ ಕಾಲ್ಬಂತು ರೆಕಾಡ್ ಮಾಡಿ ಇಗ ಬ್ಲಾಕ್ ಮೇಲ್ ಮಾಡತ್ತಿದ್ದಾರೆ. ಪೇಟಿಯೆ ಮೂಲಕ ಹದಿನೆಯಿದು ಸಾವಿರರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೆಯನೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 1000 | 15000 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | wrong | sextortion | other | sextortion | **extractor_form**: near-spelling variant of: ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ |
| paymentApp | wrong | Paytm | PhonePe | Paytm | **asr**: ASR lost/changed: ಪೇಟಿಎಂ |

### 39. hi-19 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: वो क्या है ना, मतलब मेरे पापा के फोन पे कॉल आया था, उन्होंने कुछ बताया नहीं, बस अब देखा तो सत्तर हज़ार रुपये गायब हैं यूनियन बैंक से
- Transcript (`hi-19__Madhur__r0__hi`): वो क्या है ना मतलब मेरे पापा के फोन पे कॉल आया था उन्होंने कुछ बताया नहीं बस अब देखा तो सत्तर हजार रुपए गायब है यूनियन बैंक से

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| paymentApp | fp | - | PhonePe | PhonePe | **extractor**: fails on the reference text too (fp) |

### 40. hi-25 (answer:amount) - fails 100% of 3 runs, also fails on reference text

- Reference: पाँच हज़ार
- Transcript (`hi-25__Madhur__r0__hi`): 5000

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
