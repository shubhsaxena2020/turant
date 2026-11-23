# Turant pipeline eval: llm-llm

Generated 2026-11-23T09:39:32.747Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 884 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).
Deltas in brackets are against `reports/baseline.json`.

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 25.7 (-30.0) | 25.7 | 64.5 | 81.3 | 71.9 (-5.7) | - | - |
| ASR clean, normal rate | 600 | 16.5 (-10.7) | 16.5 | 48.7 | 58.2 | 53.0 (+2.0) | 65.5 | 40.6 |
| ASR noise 15 dB | 85 | 28.2 (+3.6) | 28.2 | 50.8 | 53.5 | 52.1 (+3.1) | 44.7 | 32.7 |
| ASR noise 5 dB | 67 | 29.9 (+10.6) | 29.9 | 53.7 | 51.8 | 52.7 (+12.2) | 48.4 | 46.4 |
| ASR rate -15% / +15% | 94 | 34.0 (+8.3) | 34.0 | 57.3 | 65.7 | 61.2 (+13.0) | 43.0 | 40.0 |
| ASR all (forced language) | 846 | 20.7 (-4.2) | 20.7 | 49.9 | 58.2 | 53.7 (+5.5) | 60.7 | 40.3 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 64.7% of clean runs and 68.8% of all runs fully correct. Per language (clean): hi 91%, en 83%, bn 49%, ta 45%, te 53%, mr 80%, kn 44%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 95.7 | 80.1 | 87.2 | 62.0 | 49.7 | 55.2 (+12.4) | 58.7 |
| time | 113 | 55.1 | 77.0 | 64.2 | 42.8 | 59.7 | 49.8 (+4.7) | 49.0 |
| scamType | 81 | 49.0 | 91.4 | 63.8 | 39.8 | 74.3 | 51.8 (-11.8) | 54.2 |
| bank | 97 | 98.8 | 83.5 | 90.5 | 96.7 | 70.4 | 81.5 (+19.0) | 78.9 |
| paymentApp | 29 | 70.7 | 100.0 | 82.9 | 66.3 | 84.1 | 74.1 (+13.3) | 74.7 |
| utr | 21 | 100.0 | 57.1 | 72.7 | 43.5 | 22.2 | 29.4 (+0.3) | 37.6 |
| suspectUpi | 16 | 100.0 | 50.0 | 66.7 | 73.3 | 30.6 | 43.1 (-34.8) | 39.4 |
| suspectPhone | 29 | 100.0 | 75.9 | 86.3 | 58.6 | 27.0 | 37.0 (-5.9) | 41.4 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 45.5 | 33.3 | 38.5 (+3.7) | 37.0 |
| intent | 7 | 7.5 | 100.0 | 14.0 | 7.8 | 100.0 | 14.4 (-42.7) | 15.6 |
| **micro** | 566 | 64.5 | 81.3 | 71.9 | 48.7 | 58.2 | 53.0 (+2.0) | 53.7 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 27.5 (-52.5) | 27.5 (-30.0) | 66.7 | 72.1 | 70.4 | 36.0 | 21.1 | 75.0 (n=16) |
| en | 30.0 (-57.5) | 27.5 (-35.8) | 42.1 | 71.6 | 64.7 | 36.6 | 34.7 | 70.4 (n=27) |
| bn | 22.5 (-10.0) | 7.5 (-1.3) | 12.5 | 71.7 | 44.7 | 76.1 | 50.1 | 12.5 (n=16) |
| ta | 25.0 (-20.0) | 11.3 (+1.3) | 33.3 | 73.3 | 40.6 | 134.4 | 47.8 | 0.0 (n=16) |
| te | 27.5 (-17.5) | 12.5 (+2.5) | 11.1 | 72.9 | 46.2 | 74.9 | 52.0 | 12.5 (n=16) |
| mr | 22.5 (-30.0) | 16.3 (-2.5) | 22.2 | 68.9 | 59.4 | 68.9 | 31.8 | 12.5 (n=16) |
| kn | 25.0 (-22.5) | 7.5 (+3.8) | 0.0 | 72.9 | 36.8 | 79.7 | 50.2 | 25.0 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 90.9 / 89.9 | 57.9 / 51.3 | 70.6 / 68.6 | 92.3 / 96.3 | 80.0 / 63.6 | 50.0 / 60.0 | 66.7 / 66.7 | 85.7 / 76.9 | 100.0 / 100.0 |
| en | 82.9 / 76.9 | 70.0 / 58.3 | 68.6 / 64.8 | 87.0 / 83.1 | 66.7 / 72.2 | 80.0 / 61.5 | 66.7 / 66.7 | 88.9 / 60.9 | 100.0 / 100.0 |
| bn | 90.9 / 43.7 | 61.5 / 36.4 | 60.6 / 45.5 | 92.9 / 72.0 | 88.9 / 93.3 | 50.0 / 44.4 | 66.7 / - | 85.7 / 18.2 | 100.0 / - |
| ta | 90.9 / 29.3 | 68.4 / 41.0 | 62.5 / 48.5 | 88.0 / 75.6 | 80.0 / 75.0 | 80.0 / 0.0 | 66.7 / 33.3 | 85.7 / 0.0 | 100.0 / 0.0 |
| te | 86.4 / 36.4 | 66.7 / 54.5 | 60.6 / 40.0 | 92.3 / 85.7 | 100.0 / 63.2 | 80.0 / 0.0 | 66.7 / 66.7 | 85.7 / 0.0 | 100.0 / 0.0 |
| mr | 77.3 / 70.5 | 57.9 / 49.4 | 62.5 / 55.4 | 92.3 / 92.3 | 88.9 / 88.9 | 80.0 / 20.0 | 66.7 / 0.0 | 85.7 / 57.1 | 100.0 / 0.0 |
| kn | 90.9 / 29.9 | 66.7 / 53.3 | 60.6 / 30.8 | 88.0 / 58.5 | 88.9 / 70.6 | 80.0 / 0.0 | 66.7 / 0.0 | 85.7 / 0.0 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 22 | 18.2 | 37.7 | 36.5 | 30.3 |
| babble 5 dB | 15 | 33.3 | 51.6 | 48.7 | 44.1 |
| clean | 694 | 18.9 | 53.9 | 63.0 | 40.5 |
| pink 15 dB | 22 | 36.4 | 56.7 | 46.6 | 34.3 |
| pink 5 dB | 16 | 37.5 | 51.4 | 58.6 | 82.6 |
| traffic 15 dB | 41 | 29.3 | 56.2 | 47.1 | 33.1 |
| traffic 5 dB | 36 | 25.0 | 53.5 | 44.2 | 34.6 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 600 | 16.5 | 53.0 | 65.5 |
| 15 dB | 85 | 28.2 | 52.1 | 44.7 |
| 5 dB | 67 | 29.9 | 52.7 | 48.4 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 7.5 | 43.2 | 79.4 | 51.6 |
| bn-IN-TanishaaNeural | 40 | 7.5 | 46.2 | 72.9 | 48.6 |
| en-IN-NeerjaExpressiveNeural | 40 | 27.5 | 65.2 | 37.9 | 26.5 |
| en-IN-NeerjaNeural | 40 | 30.0 | 65.2 | 35.6 | 25.9 |
| en-IN-PrabhatNeural | 40 | 25.0 | 63.8 | 36.4 | 51.6 |
| hi-IN-MadhurNeural | 40 | 25.0 | 69.9 | 36.6 | 20.3 |
| hi-IN-SwaraNeural | 40 | 30.0 | 71.0 | 35.4 | 21.8 |
| kn-IN-GaganNeural | 40 | 7.5 | 36.5 | 77.9 | 49.8 |
| kn-IN-SapnaNeural | 40 | 7.5 | 37.2 | 81.6 | 50.7 |
| mr-IN-AarohiNeural | 40 | 20.0 | 60.0 | 70.0 | 33.0 |
| mr-IN-ManoharNeural | 40 | 12.5 | 58.9 | 67.9 | 30.6 |
| ta-IN-PallaviNeural | 40 | 10.0 | 39.3 | 154.9 | 50.7 |
| ta-IN-ValluvarNeural | 40 | 12.5 | 41.9 | 113.8 | 44.9 |
| te-IN-MohanNeural | 40 | 12.5 | 48.6 | 74.5 | 50.6 |
| te-IN-ShrutiNeural | 40 | 12.5 | 43.7 | 75.2 | 53.5 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 600 | 16.5 | 53.0 | 65.5 |
| -15% | 50 | 36.0 | 61.1 | 43.5 |
| +15% | 44 | 31.8 | 61.3 | 42.5 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 330 | 20.8 | 11.5 | 60.8 |
| correction | 60 | 100.0 | 56.7 | 62.4 |
| answer | 195 | 5.5 | 6.2 | 6.0 |
| answer (skip intent) | 15 | 100.0 | 100.0 | 100.0 |

## Language auto-detect vs forced language token

38 clean clips transcribed twice. Forced: 18.4% fully correct (WER 83.5%). Auto-detect: 15.8% (WER 85.6%). Transcript in the wrong script under auto-detect: 23.7%.

| Lang | n | Forced fully correct % | Auto fully correct % | Auto wrong script % |
|---|---|---|---|---|
| hi | 9 | 11.1 | 11.1 | 0.0 |
| en | 7 | 42.9 | 42.9 | 14.3 |
| bn | 2 | 0.0 | 50.0 | 100.0 |
| ta | 10 | 0.0 | 0.0 | 10.0 |
| te | 2 | 50.0 | 0.0 | 100.0 |
| mr | 6 | 16.7 | 16.7 | 16.7 |
| kn | 2 | 50.0 | 0.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 1323 | 371 (28%) | 31 (2%) | 921 (70%) | 78 |
| clean | 1034 | 310 (30%) | 25 (2%) | 699 (68%) | 70 |
| 15 dB | 104 | 19 (18%) | 2 (2%) | 83 (80%) | 5 |
| 5 dB | 75 | 23 (31%) | 1 (1%) | 51 (68%) | 2 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| time | 308 | 55 | 7 | 246 |
| intent | 260 | 6 | 2 | 252 |
| scamType | 240 | 36 | 0 | 204 |
| amount | 217 | 117 | 12 | 88 |
| bank | 95 | 45 | 0 | 50 |
| suspectPhone | 73 | 52 | 1 | 20 |
| paymentApp | 41 | 21 | 4 | 16 |
| utr | 41 | 19 | 4 | 18 |
| suspectUpi | 36 | 9 | 0 | 27 |
| suspectAccount | 12 | 11 | 1 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 145 | 11 | 3 | 131 |
| en | 251 | 31 | 4 | 216 |
| bn | 192 | 71 | 3 | 118 |
| ta | 185 | 78 | 2 | 105 |
| te | 190 | 73 | 4 | 113 |
| mr | 165 | 29 | 6 | 130 |
| kn | 195 | 78 | 9 | 108 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | intent | en | extractor | fp | 58 | en-23 en-24 en-25 en-26 en-27 en-28 en-29 en-30 +4 |
| 2 | time | en | extractor | fp | 41 | en-06 en-07 en-08 en-10 en-15 en-17 en-19 en-20 +1 |
| 3 | scamType | en | extractor | fp | 40 | en-04 en-08 en-09 en-12 en-13 en-15 en-18 en-19 +2 |
| 4 | intent | hi | extractor | fp | 37 | hi-25 hi-26 hi-27 hi-28 hi-29 hi-30 hi-32 hi-33 +4 |
| 5 | intent | mr | extractor | fp | 35 | mr-23 mr-24 mr-25 mr-26 mr-27 mr-28 mr-29 mr-30 +4 |
| 6 | intent | bn | extractor | fp | 32 | bn-23 bn-24 bn-25 bn-26 bn-27 bn-28 bn-29 bn-31 +4 |
| 7 | intent | kn | extractor | fp | 31 | kn-23 kn-24 kn-25 kn-26 kn-27 kn-28 kn-29 kn-30 +4 |
| 8 | intent | te | extractor | fp | 30 | te-23 te-24 te-25 te-26 te-27 te-28 te-29 te-31 +3 |
| 9 | intent | ta | extractor | fp | 29 | ta-23 ta-24 ta-25 ta-26 ta-27 ta-28 ta-29 ta-30 +4 |
| 10 | scamType | bn | extractor | fp | 27 | bn-02 bn-10 bn-11 bn-12 bn-13 bn-14 bn-15 bn-17 +4 |
| 11 | scamType | mr | extractor | fp | 27 | mr-02 mr-10 mr-11 mr-12 mr-13 mr-14 mr-15 mr-17 +3 |
| 12 | scamType | te | extractor | fp | 24 | te-02 te-10 te-11 te-12 te-13 te-14 te-15 te-17 +4 |
| 13 | scamType | kn | extractor | fp | 24 | kn-02 kn-10 kn-11 kn-12 kn-13 kn-14 kn-15 kn-17 +4 |
| 14 | time | hi | extractor | fp | 23 | hi-05 hi-08 hi-09 hi-13 hi-15 hi-17 hi-19 hi-21 +1 |
| 15 | time | bn | extractor | fp | 23 | bn-05 bn-06 bn-08 bn-09 bn-14 bn-17 bn-18 bn-19 +2 |
| 16 | amount | kn | asr | wrong | 23 | kn-04 kn-06 kn-07 kn-08 kn-10 kn-11 kn-12 kn-13 +6 |
| 17 | scamType | ta | extractor | fp | 22 | ta-02 ta-10 ta-11 ta-12 ta-13 ta-14 ta-15 ta-17 +3 |
| 18 | scamType | hi | extractor | fp | 21 | hi-02 hi-10 hi-11 hi-12 hi-13 hi-15 hi-19 hi-21 +1 |
| 19 | amount | ta | asr | wrong | 21 | ta-01 ta-02 ta-04 ta-05 ta-06 ta-07 ta-08 ta-11 +6 |
| 20 | time | mr | extractor | fp | 21 | mr-05 mr-06 mr-08 mr-09 mr-14 mr-17 mr-18 mr-19 +1 |
| 21 | time | te | extractor | fp | 20 | te-05 te-06 te-08 te-09 te-14 te-17 te-18 te-19 +2 |
| 22 | amount | te | asr | wrong | 19 | te-01 te-04 te-06 te-07 te-08 te-10 te-12 te-13 +5 |
| 23 | time | kn | extractor | fp | 19 | kn-05 kn-06 kn-08 kn-09 kn-14 kn-17 kn-18 kn-19 +2 |
| 24 | time | ta | extractor | fp | 18 | ta-05 ta-06 ta-08 ta-09 ta-14 ta-17 ta-18 ta-19 +1 |
| 25 | amount | bn | asr | wrong | 17 | bn-02 bn-04 bn-05 bn-06 bn-07 bn-12 bn-17 bn-18 +2 |
| 26 | time | en | extractor | fn | 15 | en-26 en-27 en-28 |
| 27 | amount | en | extractor | fn | 14 | en-04 en-23 en-24 en-25 |
| 28 | bank | kn | asr | fn | 14 | kn-01 kn-03 kn-05 kn-16 kn-17 kn-18 kn-38 |
| 29 | amount | mr | extractor | fn | 13 | mr-23 mr-24 mr-25 mr-31 |
| 30 | bank | en | extractor | fn | 12 | en-29 en-30 |

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

### 4. en-27 (answer:time) - fails 100% of 6 runs, also fails on reference text

- Reference: about 45 minutes ago
- Transcript (`en-27__Neerja__r0__en`): About 45 minutes ago.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:15 (45 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 5. en-28 (answer:time) - fails 100% of 6 runs, also fails on reference text

- Reference: kal shaam 7 baje
- Transcript (`en-28__Neerja__r0__en`): KAL SHAM 7 BAJE

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | -1d 19:00 (1020 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 6. en-29 (answer:bank) - fails 100% of 6 runs, also fails on reference text

- Reference: State Bank of India
- Transcript (`en-29__Neerja__r0__en`): State Bank of India

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 7. bn-19 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: যে অ্যাকাউন্টে টাকা গেছে তার নম্বর 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`bn-19__Bashkar__r0__bn`): জে একান্তে টাকা গেছে তার নোমবর পাচ সুন্ন এক সুন্ন দুই তিন চার পাচ ছায় সাক আট এক দুই.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| suspectPhone | fp | - | 1123456812 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectAccount | fn | 50100234567812 | - | 50100234567812 | **asr**: value not in the transcript |

### 8. mr-14 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: यूपीआय रेफरन्स नंबर 4 0 3 2 1 8 7 6 5 4 3 2, पाच हजार रुपये गेले
- Transcript (`mr-14__Aarohi__r0__mr`): UPI reference number 4032187-54325,000 रुपे गिले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 403218 | 5000 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | wrong | 403218765432 | 403218754325 | 403218765432 | **asr**: value not in the transcript |

### 9. bn-22 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: ওর নম্বর নয় নয় আট আট সাত সাত ছয় ছয় পাঁচ পাঁচ
- Transcript (`bn-22__Bashkar__r0__bn`): ওর নমব্য নাই নাই আট আট আট সাত শাট ছয ছয পাচ পাচ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 88765 | - | **asr**: spurious value from a mis-recognised transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| suspectPhone | fn | 9988776655 | - | 9988776655 | **asr**: value not in the transcript |

### 10. bn-29 (answer:bank) - fails 100% of 5 runs, also fails on reference text

- Reference: স্টেট ব্যাংক অফ ইন্ডিয়া
- Transcript (`bn-29__Bashkar__r0__bn`): State Bank of India

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 11. te-29 (answer:bank) - fails 100% of 5 runs, also fails on reference text

- Reference: స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా
- Transcript (`te-29__Mohan__r0__te`): State Bank of India

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 12. te-34 (answer:suspect) - fails 100% of 5 runs, also fails on reference text

- Reference: sharma dot pay at paytm
- Transcript (`te-34__Mohan__r0__te`): sharma.pay at paytm

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fp | - | Paytm | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | sharma.pay@paytm | - | - | **extractor**: fails on the reference text too (fn); value is in the transcript |

### 13. mr-24 (answer:amount) - fails 100% of 5 runs, also fails on reference text

- Reference: चार हजार नऊशे नव्याण्णव
- Transcript (`mr-24__Aarohi__r0__mr`): 4,999

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | - | **extractor**: fails on the reference text too (fn); value is in the transcript |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 14. mr-29 (answer:bank) - fails 100% of 5 runs, also fails on reference text

- Reference: स्टेट बँक ऑफ इंडिया
- Transcript (`mr-29__Aarohi__r0__mr`): State Bank of India

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 15. kn-29 (answer:bank) - fails 100% of 5 runs, also fails on reference text

- Reference: ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ
- Transcript (`kn-29__Gagan__r0__kn`): State Bank of India

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 16. te-22 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: వాడి నంబర్ తొమ్మిది తొమ్మిది ఎనిమిది ఎనిమిది ఏడు ఏడు ఆరు ఆరు ఐదు ఐదు
- Transcript (`te-22__Mohan__r0__te`): వాడి నంబర తుమ్మిది ఎనిమిది ఎనిమిది ఎడు ఎడు ఎడు ఆరు ఆరు ఆయిదు ఆయిదు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | wrong | 9988776655 | 9888776555 | 9988776655 | **asr**: value not in the transcript |

### 17. te-39 (correction) - fails 100% of 5 runs

- Reference: నంబర్ తప్పు, 9 8 1 1 1 2 2 2 3 3
- Transcript (`te-39__Mohan__r0__te`): నంబర్ తప్పు. తుమ్మిది ఎనిమిది ఒంటి గంటా ఒంటి గంటా ఒంటి ఒంటి ఒంటి ఒంటి �

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 17 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 18. hi-24 (story) - fails 100% of 4 runs, also fails on reference text

- Reference: कल दोपहर करीब ढाई बजे फोन पे से छब्बीस सौ रुपये गए
- Transcript (`hi-24__Madhur__r0__hi`): कल दोपहर करीब धाई बजे फोन पे से 2600 रुपए गए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 14:30 (1290 min ago) | today 14:00 (-120 min ago) | today 14:30 (-150 min ago) | **extractor**: fails on the reference text too (wrong) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 19. hi-28 (answer:time) - fails 100% of 4 runs, also fails on reference text

- Reference: कल रात करीब साढ़े नौ बजे
- Transcript (`hi-28__Madhur__r0__hi`): कल रात करीब साधे नौ बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | -1d 21:30 (870 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 20. hi-30 (answer:time) - fails 100% of 4 runs, also fails on reference text

- Reference: परसों शाम को
- Transcript (`hi-30__Madhur__r0__hi`): परसों शाम को

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | -2d 19:00 (2460 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 21. hi-32 (answer:bank) - fails 100% of 4 runs, also fails on reference text

- Reference: बैंक ऑफ इंडिया
- Transcript (`hi-32__Madhur__r0__hi`): Bank of India

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Bank of India | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 22. hi-35 (answer:suspect) - fails 100% of 4 runs, also fails on reference text

- Reference: उसका नंबर 7 0 1 1 2 2 3 3 4 4
- Transcript (`hi-35__Madhur__r0__hi`): उसका नमबर 701-122-3344

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7011223344 | - | - | **extractor**: fails on the reference text too (fn); value is in the transcript |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 23. hi-36 (answer:suspect) - fails 100% of 4 runs, also fails on reference text

- Reference: यूपीआई आईडी है sharma dot pay at paytm
- Transcript (`hi-36__Madhur__r0__hi`): UPI ID है sharma.pay at paytm

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | sharma.pay@paytm | - | - | **extractor**: fails on the reference text too (fn); value is in the transcript |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 24. bn-24 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: চার হাজার নশো নিরানব্বই
- Transcript (`bn-24__Bashkar__r0__bn`): চার হাজার নসো নিরান্মোই

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 25. bn-27 (answer:time) - fails 100% of 4 runs, also fails on reference text

- Reference: পনেরো মিনিট আগে
- Transcript (`bn-27__Bashkar__r0__bn`): পনেরো মিনিট আগে

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:45 (15 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 26. ta-08 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: ஒரு வீடியோ கால் வந்தது, ரெக்கார்ட் பண்ணி இப்போ மிரட்டல் பண்றாங்க, பேடிஎம் மூலமா பதினைந்தாயிரம் ரூபாய் கொடுத்துட்டேன்
- Transcript (`ta-08__Pallavi__r0__ta`): ஒரு வீடியோ கால் வந்தது ரெக்காட் பண்ணி இப்போ மிறட்டல் பண்டாங்க பேடியம் மூலமா 14 ருபாய் குடுத்து தேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 14 | 15000 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | wrong | sextortion | other | sextortion | **asr**: ASR lost/changed: பதினைந்தாயிரம் கொடுத்துட்டேன் |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: பதினைந்தாயிரம் கொடுத்துட்டேன் |

### 27. ta-14 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: UPI ரெஃபரன்ஸ் நம்பர் 4 0 3 2 1 8 7 6 5 4 3 2, ஐயாயிரம் ரூபாய் போச்சு
- Transcript (`ta-14__Pallavi__r0__ta`): UPI reference number 433217765432. அயாயிரம் ருபாய் போச்சு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | wrong | 403218765432 | 433217765432 | 403218765432 | **asr**: value not in the transcript |

### 28. ta-24 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: நாலாயிரத்து தொள்ளாயிரத்து தொண்ணூத்தொன்பது
- Transcript (`ta-24__Pallavi__r0__ta`): நாலாயிரத்து தொள்ளாயிரத்து தொன்னு தொன்பது

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 29. ta-39 (correction) - fails 100% of 5 runs

- Reference: நம்பர் தப்பு, 9 8 1 1 1 2 2 2 3 3
- Transcript (`ta-39__Pallavi__r0__ta`): நம்பர் தப்பு, 1712122233

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 30. te-21 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: కరెంట్ బిల్ మెసేజ్ వచ్చింది, లింక్ క్లిక్ చేశాను, 9999 రూపాయలు కట్ అయ్యాయి, స్టేట్ బ్యాంక్
- Transcript (`te-21__Mohan__r0__te`): కరంట బిల్ మెసేజ్ వచింది లింక క్లిక చేసాను తుమేది వేలా తుమేది వందలా తుమేది రూపాయు కటాయాఈ స్టేట బాంక

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 9999 | 1000 | 9999 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | fake_kyc | **extractor**: fails on the reference text too (fp) |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: కరెంట్ వచ్చింది, 9999 కట్ |

### 31. te-25 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: 1200 రూపాయలు
- Transcript (`te-25__Mohan__r0__te`): ఉకా వియి రెండు వందలు రూపాయలు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 1200 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 32. mr-19 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: ज्या खात्यात पैसे गेले त्याचा नंबर 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`mr-19__Aarohi__r0__mr`): जा खात्यात पईसे गेले त्याचा नंबर पाच शून्य एक शून्य शून्य दोन तीन चार पाच सहा साथ आठेक दोन

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| suspectPhone | fp | - | 0002345678 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectAccount | fn | 50100234567812 | - | 50100234567812 | **asr**: value not in the transcript |

### 33. mr-23 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: पाच हजार रुपये
- Transcript (`mr-23__Aarohi__r0__mr`): पाच हजार रुपे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | - | **extractor**: fails on the reference text too (fn); value is in the transcript |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 34. mr-27 (answer:time) - fails 100% of 4 runs, also fails on reference text

- Reference: पंधरा मिनिटांपूर्वी
- Transcript (`mr-27__Aarohi__r0__mr`): पंधरा मिनिटान कूरवी

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:45 (15 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 35. kn-14 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: UPI ರೆಫರೆನ್ಸ್ ನಂಬರ್ 4 0 3 2 1 8 7 6 5 4 3 2, ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-14__Gagan__r0__kn`): ಯುಪಾಯ ರೆಫ್ರೆನ್ಸ್ ನಂಬರ್ ನಾಲ್ಕು ಸೊನ್ನೆ ಮೂರು ಎರ್ಡು ಒಂಡು ಎಂಟು ಎಳು ಆರು ಆಯಿದು ನಾಲ್ಕು ಮೂರು ಎರ್ಡು ಆಯಿದು ಸಾವಿರ ರೂಪಾಯ ಹೋಯಿತು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **extractor_form**: value is in the transcript but not parsed |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | wrong | 403218765432 | 40321876432 | 403218765432 | **asr**: value not in the transcript |

### 36. kn-19 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: ಹಣ ಹೋದ ಖಾತೆ ನಂಬರ್ 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`kn-19__Gagan__r0__kn`): ಹಣಹೋದ ಕಾತೆ ನಂಬರ ಐದು ಸೊನ್ನೆ ವಂದು ಸೊನ್ನೆ ಸೊನ್ನೆ ಇರಡು ಮೂರು ನಾಲ್ಕು ಆಯದು ಆರು ಇಳು ಎಂಟು ವಂದು ಇರಡು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | fp | - | 500023456782 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectAccount | fn | 50100234567812 | - | 50100234567812 | **asr**: value not in the transcript |

### 37. kn-26 (answer:time) - fails 100% of 4 runs, also fails on reference text

- Reference: ನಿನ್ನೆ ರಾತ್ರಿ 9:30 ಕ್ಕೆ
- Transcript (`kn-26__Gagan__r0__kn`): ನಿನೆಯ ರಾತ್ರಿ 19ಗಂಟೆ ಮುವತ್ತು ನಿಮಿಶಕ್ಕೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | -1d 21:30 (870 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| intent | fp | - | skip | skip | **extractor**: fails on the reference text too (fp) |

### 38. bn-17 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: ইউনিয়ন ব্যাংক থেকে সত্তর হাজার টাকা উধাও, বাবার ফোনে কল এসেছিল
- Transcript (`bn-17__Bashkar__r0__bn`): ইউনিযন বেংক থেকে সত্তোর হাজার তাকা উধাও বাবার ফুনে কোলেশে ছিলো।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 70000 | 7500 | 70000 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 39. ta-21 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: கரண்ட் பில் மெசேஜ் வந்தது, லிங்க் கிளிக் பண்ணேன், 9999 ரூபாய் கட் ஆச்சு, ஸ்டேட் பேங்க்
- Transcript (`ta-21__Pallavi__r0__ta`): கரண்ட் பில் மெசேஜ் வந்தது லிங்க கேலிக் பண்ணேன் 90.3.3.4.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.2.1.1.1.2.1.1.1.1.1.2.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9999 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| bank | fn | State Bank of India (SBI) | - | - | **extractor**: fails on the reference text too (fn) |

### 40. kn-08 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: ಒಂದು ವೀಡಿಯೊ ಕಾಲ್ ಬಂತು, ರೆಕಾರ್ಡ್ ಮಾಡಿ ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ, ಪೇಟಿಎಂ ಮೂಲಕ ಹದಿನೈದು ಸಾವಿರ ರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೇನೆ
- Transcript (`kn-08__Gagan__r0__kn`): ಒಂದು ವಿಡಿಯೋ ಕಾಲ್ಬಂತು ರೆಕಾಡ್ ಮಾಡಿ ಇಗ ಬ್ಲಾಕ್ ಮೇಲ್ ಮಾಡತ್ತಿದ್ದಾರೆ. ಪೇಟಿಯೆ ಮೂಲಕ ಹದಿನೆಯಿದು ಸಾವಿರರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೆಯನೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 11000 | 15000 | **asr**: value not in the transcript |
| time | fp | - | today 12:00 (0 min ago) | today 12:00 (0 min ago) | **extractor**: fails on the reference text too (fp) |
| scamType | wrong | sextortion | other | sextortion | **asr**: ASR lost/changed: ವೀಡಿಯೊ ರೆಕಾರ್ಡ್ ಈಗ ಪೇಟಿಎಂ |
| paymentApp | wrong | Paytm | PhonePe | Paytm | **asr**: ASR lost/changed: ವೀಡಿಯೊ ರೆಕಾರ್ಡ್ ಈಗ ಪೇಟಿಎಂ |
