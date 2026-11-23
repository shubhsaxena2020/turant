# Turant pipeline eval: llm-fillcat

Generated 2026-11-23T09:40:57.257Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 884 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).
Deltas in brackets are against `reports/baseline.json`.

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 45.7 (-10.0) | 45.7 | 77.6 | 100.0 | 87.4 (+9.8) | - | - |
| ASR clean, normal rate | 600 | 22.7 (-4.5) | 22.7 | 58.3 | 64.0 | 61.0 (+10.0) | 65.5 | 40.6 |
| ASR noise 15 dB | 85 | 43.5 (+18.9) | 43.5 | 65.6 | 75.4 | 70.2 (+21.2) | 44.7 | 32.7 |
| ASR noise 5 dB | 67 | 41.8 (+22.5) | 41.8 | 66.7 | 70.6 | 68.6 (+28.1) | 48.4 | 46.4 |
| ASR rate -15% / +15% | 94 | 45.7 (+20.0) | 45.7 | 69.7 | 80.4 | 74.7 (+26.4) | 43.0 | 40.0 |
| ASR all (forced language) | 846 | 28.8 (+4.0) | 28.8 | 60.4 | 66.7 | 63.4 (+15.2) | 60.7 | 40.3 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 46.8% of clean runs and 53.8% of all runs fully correct. Per language (clean): hi 85%, en 77%, bn 28%, ta 21%, te 26%, mr 60%, kn 16%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 64.7 | 54.8 | 59.3 (+16.5) | 63.6 |
| time | 113 | 100.0 | 100.0 | 100.0 | 74.4 | 63.4 | 68.4 (+23.3) | 68.7 |
| scamType | 81 | 36.0 | 100.0 | 52.9 | 29.0 | 81.1 | 42.8 (-20.8) | 43.2 |
| bank | 97 | 99.0 | 100.0 | 99.5 | 97.2 | 84.5 | 90.4 (+27.9) | 90.3 |
| paymentApp | 29 | 61.7 | 100.0 | 76.3 | 62.4 | 84.1 | 71.6 (+10.8) | 72.6 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 88.9 | 17.8 | 29.6 (+0.5) | 38.2 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 100.0 | 63.9 | 78.0 (+0.0) | 81.9 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 82.6 | 30.2 | 44.2 (+1.3) | 52.1 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 36.4 | 26.7 | 30.8 (-4.0) | 29.6 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 40.0 | 57.1 (+0.0) | 70.3 |
| **micro** | 566 | 77.6 | 100.0 | 87.4 | 58.3 | 64.0 | 61.0 (+10.0) | 63.4 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 50.0 (-30.0) | 45.0 (-12.5) | 77.8 | 88.2 | 80.8 | 36.0 | 21.1 | 75.0 (n=16) |
| en | 50.0 (-37.5) | 38.3 (-25.0) | 63.2 | 87.4 | 76.9 | 36.6 | 34.7 | 70.4 (n=27) |
| bn | 45.0 (+12.5) | 8.8 (+0.0) | 25.0 | 87.6 | 52.4 | 76.1 | 50.1 | 12.5 (n=16) |
| ta | 40.0 (-5.0) | 11.3 (+1.3) | 33.3 | 86.5 | 47.5 | 134.4 | 47.8 | 0.0 (n=16) |
| te | 47.5 (+2.5) | 12.5 (+2.5) | 11.1 | 87.9 | 48.9 | 74.9 | 52.0 | 12.5 (n=16) |
| mr | 42.5 (-10.0) | 26.3 (+7.5) | 33.3 | 87.0 | 67.4 | 68.9 | 31.8 | 12.5 (n=16) |
| kn | 45.0 (-2.5) | 8.8 (+5.0) | 14.3 | 87.4 | 38.5 | 79.7 | 50.2 | 25.0 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 89.6 | 100.0 / 82.5 | 57.8 / 59.1 | 100.0 / 100.0 | 72.7 / 63.6 | 100.0 / 50.0 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 100.0 |
| en | 100.0 / 79.1 | 100.0 / 86.6 | 59.1 / 54.3 | 96.0 / 94.4 | 66.7 / 72.2 | 100.0 / 80.0 | 100.0 / 100.0 | 100.0 / 80.0 | 100.0 / 80.0 |
| bn | 100.0 / 44.0 | 100.0 / 68.9 | 51.2 / 33.7 | 100.0 / 86.8 | 80.0 / 93.3 | 100.0 / - | 100.0 / - | 100.0 / 22.2 | 100.0 / - |
| ta | 100.0 / 19.7 | 100.0 / 58.1 | 50.0 / 44.4 | 100.0 / 84.6 | 72.7 / 70.6 | 100.0 / 0.0 | 100.0 / 85.7 | 100.0 / 0.0 | 100.0 / - |
| te | 100.0 / 35.6 | 100.0 / 61.5 | 51.2 / 31.0 | 100.0 / 92.3 | 88.9 / 63.2 | 100.0 / - | 100.0 / 100.0 | 100.0 / - | 100.0 / - |
| mr | 100.0 / 86.3 | 100.0 / 59.0 | 50.0 / 46.5 | 100.0 / 100.0 | 80.0 / 80.0 | 100.0 / - | 100.0 / - | 100.0 / 22.2 | 100.0 / 0.0 |
| kn | 100.0 / 39.0 | 100.0 / 48.1 | 51.2 / 23.0 | 100.0 / 68.2 | 80.0 / 63.2 | 100.0 / - | 100.0 / - | 100.0 / 0.0 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 22 | 36.4 | 64.4 | 36.5 | 30.3 |
| babble 5 dB | 15 | 46.7 | 68.8 | 48.7 | 44.1 |
| clean | 694 | 25.8 | 62.5 | 63.0 | 40.5 |
| pink 15 dB | 22 | 54.5 | 77.4 | 46.6 | 34.3 |
| pink 5 dB | 16 | 50.0 | 70.3 | 58.6 | 82.6 |
| traffic 15 dB | 41 | 41.5 | 69.4 | 47.1 | 33.1 |
| traffic 5 dB | 36 | 36.1 | 67.9 | 44.2 | 34.6 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 600 | 22.7 | 61.0 | 65.5 |
| 15 dB | 85 | 43.5 | 70.2 | 44.7 |
| 5 dB | 67 | 41.8 | 68.6 | 48.4 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 10.0 | 50.0 | 79.4 | 51.6 |
| bn-IN-TanishaaNeural | 40 | 7.5 | 54.8 | 72.9 | 48.6 |
| en-IN-NeerjaExpressiveNeural | 40 | 37.5 | 78.9 | 37.9 | 26.5 |
| en-IN-NeerjaNeural | 40 | 40.0 | 77.3 | 35.6 | 25.9 |
| en-IN-PrabhatNeural | 40 | 37.5 | 74.3 | 36.4 | 51.6 |
| hi-IN-MadhurNeural | 40 | 42.5 | 78.9 | 36.6 | 20.3 |
| hi-IN-SwaraNeural | 40 | 47.5 | 82.6 | 35.4 | 21.8 |
| kn-IN-GaganNeural | 40 | 7.5 | 38.2 | 77.9 | 49.8 |
| kn-IN-SapnaNeural | 40 | 10.0 | 38.7 | 81.6 | 50.7 |
| mr-IN-AarohiNeural | 40 | 32.5 | 69.4 | 70.0 | 33.0 |
| mr-IN-ManoharNeural | 40 | 20.0 | 65.5 | 67.9 | 30.6 |
| ta-IN-PallaviNeural | 40 | 12.5 | 47.8 | 154.9 | 50.7 |
| ta-IN-ValluvarNeural | 40 | 10.0 | 47.2 | 113.8 | 44.9 |
| te-IN-MohanNeural | 40 | 10.0 | 51.8 | 74.5 | 50.6 |
| te-IN-ShrutiNeural | 40 | 15.0 | 45.9 | 75.2 | 53.5 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 600 | 22.7 | 61.0 | 65.5 |
| -15% | 50 | 44.0 | 73.3 | 43.5 |
| +15% | 44 | 47.7 | 76.2 | 42.5 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 330 | 44.8 | 17.3 | 65.5 |
| correction | 60 | 100.0 | 56.7 | 62.4 |
| answer | 195 | 26.4 | 20.0 | 45.0 |
| answer (skip intent) | 15 | 100.0 | 40.0 | 41.4 |

## Language auto-detect vs forced language token

38 clean clips transcribed twice. Forced: 47.4% fully correct (WER 83.5%). Auto-detect: 44.7% (WER 85.6%). Transcript in the wrong script under auto-detect: 23.7%.

| Lang | n | Forced fully correct % | Auto fully correct % | Auto wrong script % |
|---|---|---|---|---|
| hi | 9 | 55.6 | 55.6 | 0.0 |
| en | 7 | 57.1 | 57.1 | 14.3 |
| bn | 2 | 50.0 | 100.0 | 100.0 |
| ta | 10 | 10.0 | 10.0 | 10.0 |
| te | 2 | 100.0 | 50.0 | 100.0 |
| mr | 6 | 50.0 | 50.0 | 16.7 |
| kn | 2 | 100.0 | 50.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 978 | 512 (52%) | 81 (8%) | 385 (39%) | 0 |
| clean | 802 | 430 (54%) | 69 (9%) | 303 (38%) | 0 |
| 15 dB | 61 | 26 (43%) | 5 (8%) | 30 (49%) | 0 |
| 5 dB | 49 | 29 (59%) | 1 (2%) | 19 (39%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| scamType | 430 | 63 | 11 | 356 |
| amount | 188 | 169 | 19 | 0 |
| time | 120 | 97 | 23 | 0 |
| suspectPhone | 63 | 61 | 2 | 0 |
| bank | 48 | 42 | 5 | 1 |
| paymentApp | 46 | 12 | 6 | 28 |
| utr | 41 | 32 | 9 | 0 |
| suspectAccount | 16 | 13 | 3 | 0 |
| suspectUpi | 15 | 15 | 0 | 0 |
| intent | 11 | 8 | 3 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 82 | 17 | 17 | 48 |
| en | 143 | 43 | 12 | 88 |
| bn | 146 | 90 | 8 | 48 |
| ta | 156 | 99 | 9 | 48 |
| te | 163 | 110 | 6 | 47 |
| mr | 116 | 43 | 14 | 59 |
| kn | 172 | 110 | 15 | 47 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | en | extractor | fp | 79 | en-04 en-08 en-09 en-12 en-13 en-15 en-18 en-19 +10 |
| 2 | scamType | mr | extractor | fp | 55 | mr-02 mr-10 mr-11 mr-12 mr-13 mr-14 mr-15 mr-17 +13 |
| 3 | scamType | bn | extractor | fp | 48 | bn-02 bn-10 bn-11 bn-12 bn-13 bn-14 bn-15 bn-17 +12 |
| 4 | scamType | kn | extractor | fp | 45 | kn-02 kn-10 kn-11 kn-12 kn-13 kn-14 kn-15 kn-17 +13 |
| 5 | scamType | ta | extractor | fp | 44 | ta-02 ta-10 ta-11 ta-12 ta-13 ta-14 ta-15 ta-17 +14 |
| 6 | scamType | hi | extractor | fp | 43 | hi-02 hi-10 hi-11 hi-12 hi-13 hi-15 hi-19 hi-21 +9 |
| 7 | scamType | te | extractor | fp | 42 | te-02 te-10 te-11 te-12 te-13 te-14 te-15 te-17 +11 |
| 8 | amount | ta | asr | fn | 27 | ta-02 ta-03 ta-04 ta-07 ta-08 ta-10 ta-11 ta-12 +9 |
| 9 | amount | te | asr | wrong | 26 | te-01 te-04 te-06 te-07 te-08 te-10 te-13 te-14 +7 |
| 10 | amount | bn | asr | wrong | 23 | bn-02 bn-03 bn-04 bn-05 bn-06 bn-07 bn-12 bn-14 +6 |
| 11 | amount | ta | asr | wrong | 17 | ta-01 ta-06 ta-08 ta-11 ta-12 ta-15 ta-17 ta-18 +3 |
| 12 | amount | kn | asr | wrong | 17 | kn-03 kn-07 kn-08 kn-11 kn-12 kn-14 kn-17 kn-20 +3 |
| 13 | bank | kn | asr | fn | 16 | kn-01 kn-03 kn-05 kn-16 kn-17 kn-18 kn-30 kn-38 |
| 14 | suspectPhone | te | asr | fn | 14 | te-09 te-22 te-33 te-39 |
| 15 | time | kn | asr | fn | 14 | kn-02 kn-10 kn-12 kn-13 kn-16 kn-20 kn-27 kn-40 |
| 16 | amount | kn | asr | fn | 14 | kn-04 kn-10 kn-13 kn-16 kn-18 kn-23 kn-24 kn-25 +1 |
| 17 | time | ta | asr | wrong | 12 | ta-04 ta-11 ta-12 ta-13 ta-20 ta-26 ta-40 |
| 18 | time | te | asr | fn | 12 | te-02 te-10 te-12 te-13 te-16 te-20 te-27 |
| 19 | suspectPhone | bn | asr | fn | 11 | bn-09 bn-22 bn-33 bn-39 |
| 20 | bank | bn | asr | fn | 10 | bn-03 bn-16 bn-18 bn-38 |
| 21 | amount | te | asr | fn | 10 | te-11 te-12 te-18 te-21 te-23 te-37 |
| 22 | scamType | kn | asr | wrong | 10 | kn-01 kn-05 kn-09 kn-16 kn-35 |
| 23 | amount | en | asr | wrong | 9 | en-12 en-16 en-17 en-25 |
| 24 | suspectPhone | ta | asr | fn | 9 | ta-09 ta-33 ta-39 |
| 25 | scamType | te | asr | wrong | 9 | te-01 te-07 te-09 te-16 te-18 te-35 |
| 26 | bank | te | asr | fn | 9 | te-03 te-16 te-21 te-38 te-29 te-30 |
| 27 | paymentApp | en | extractor | fp | 8 | en-12 en-19 |
| 28 | scamType | te | asr | fp | 8 | te-32 te-33 te-36 te-30 |
| 29 | time | mr | extractor_form | wrong | 8 | mr-03 mr-26 mr-40 |
| 30 | suspectPhone | mr | asr | fn | 8 | mr-09 mr-22 mr-33 mr-39 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. en-04 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__Neerja__r0__en`): । । । ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: abhi |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 2. en-12 (story) - fails 100% of 4 runs, also fails on reference text

- Reference: Rs. 2,50,000 debited from my Bank of Baroda account this morning at 9:30
- Transcript (`en-12__Neerja__r0__en`): 2,50,000 rupees debited from my Bank of Baroda account this morning at 9.30.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| paymentApp | fp | - | Bank app / net banking | Bank app / net banking | **extractor**: fails on the reference text too (fp) |

### 3. en-13 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__Neerja__r0__en`): ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9999 | **asr**: value not in the transcript |
| time | fn | -1d 21:30 (870 min ago) | - | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: raat saade nau baje |
| scamType | fp | - | other | fake_customer_care | **extractor**: fails on the reference text too (fp) |

### 4. te-39 (correction) - fails 100% of 5 runs

- Reference: నంబర్ తప్పు, 9 8 1 1 1 2 2 2 3 3
- Transcript (`te-39__Mohan__r0__te`): నంబర్ తప్పు. తుమ్మిది ఎనిమిది ఒంటి గంటా ఒంటి గంటా ఒంటి ఒంటి ఒంటి ఒంటి �

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 17 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 5. mr-14 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: यूपीआय रेफरन्स नंबर 4 0 3 2 1 8 7 6 5 4 3 2, पाच हजार रुपये गेले
- Transcript (`mr-14__Aarohi__r0__mr`): UPI reference number 4032187-54325,000 रुपे गिले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 54325000 | 5000 | **asr**: value not in the transcript |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 6. hi-24 (story) - fails 100% of 4 runs, also fails on reference text

- Reference: कल दोपहर करीब ढाई बजे फोन पे से छब्बीस सौ रुपये गए
- Transcript (`hi-24__Madhur__r0__hi`): कल दोपहर करीब धाई बजे फोन पे से 2600 रुपए गए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **extractor_form**: key words survive (ढाई बजे) but the extractor fails |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 7. en-19 (story) - fails 100% of 4 runs, also fails on reference text

- Reference: The UPI ID was sharma123 at paytm, I sent him three thousand five hundred
- Transcript (`en-19__Neerja__r0__en`): The UPI ID was Sharma123 at Paytm, I sent him 3500.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| paymentApp | fp | - | Paytm | Paytm | **extractor**: fails on the reference text too (fp) |

### 8. ta-24 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: நாலாயிரத்து தொள்ளாயிரத்து தொண்ணூத்தொன்பது
- Transcript (`ta-24__Pallavi__r0__ta`): நாலாயிரத்து தொள்ளாயிரத்து தொன்னு தொன்பது

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4900 | 4999 | **asr**: value not in the transcript |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 9. ta-39 (correction) - fails 100% of 5 runs

- Reference: நம்பர் தப்பு, 9 8 1 1 1 2 2 2 3 3
- Transcript (`ta-39__Pallavi__r0__ta`): நம்பர் தப்பு, 1712122233

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 10. te-25 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: 1200 రూపాయలు
- Transcript (`te-25__Mohan__r0__te`): ఉకా వియి రెండు వందలు రూపాయలు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 1200 | 200 | 1200 | **asr**: value not in the transcript |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 11. te-36 (answer:bank) - fails 100% of 4 runs

- Reference: తెలియదు
- Transcript (`te-36__Mohan__r0__te`): తలియగు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | other | - | **asr**: spurious value from a mis-recognised transcript |
| intent | fn | skip | - | skip | **asr**: skip phrase not recognised |

### 12. kn-26 (answer:time) - fails 100% of 4 runs, also fails on reference text

- Reference: ನಿನ್ನೆ ರಾತ್ರಿ 9:30 ಕ್ಕೆ
- Transcript (`kn-26__Gagan__r0__kn`): ನಿನೆಯ ರಾತ್ರಿ 19ಗಂಟೆ ಮುವತ್ತು ನಿಮಿಶಕ್ಕೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 21:30 (870 min ago) | -1d 22:00 (840 min ago) | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: 9:30 |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 13. hi-28 (answer:time) - fails 100% of 4 runs, also fails on reference text

- Reference: कल रात करीब साढ़े नौ बजे
- Transcript (`hi-28__Madhur__r0__hi`): कल रात करीब साधे नौ बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 21:30 (870 min ago) | -1d 21:00 (900 min ago) | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: साढ़े |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 14. en-15 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: The number that called me was plus 91 70112 23344
- Transcript (`en-15__Neerja__r0__en`): The number that called me was plus 9-17011-23344.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |

### 15. en-20 (story) - fails 100% of 6 runs, also fails on reference text

- Reference: uh the guy called from 9 8 1 1 1, 2 2 2 3 3 and said he is from the electricity board
- Transcript (`en-20__Neerja__r0__en`): And the guy called from 98111 to 2233 and said he is from the electricity board.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | fake_customer_care | fake_customer_care | **extractor**: fails on the reference text too (fp) |
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 16. bn-14 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: ইউপিআই রেফারেন্স নম্বর 4 0 3 2 1 8 7 6 5 4 3 2, পাঁচ হাজার টাকা কেটেছে
- Transcript (`bn-14__Bashkar__r0__bn`): ইউপিযাই রেফারন্স নম্ব্র চার সুন্ন তিন দুই এক আট সাত ছয় পাঁচ চার তিন দুই পাঁচ হাজার তাকা কেটে ছেল।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 46000 | 5000 | **asr**: value not in the transcript |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 17. ta-14 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: UPI ரெஃபரன்ஸ் நம்பர் 4 0 3 2 1 8 7 6 5 4 3 2, ஐயாயிரம் ரூபாய் போச்சு
- Transcript (`ta-14__Pallavi__r0__ta`): UPI reference number 433217765432. அயாயிரம் ருபாய் போச்சு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | wrong | 403218765432 | 433217765432 | 403218765432 | **asr**: value not in the transcript |

### 18. te-22 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: వాడి నంబర్ తొమ్మిది తొమ్మిది ఎనిమిది ఎనిమిది ఏడు ఏడు ఆరు ఆరు ఐదు ఐదు
- Transcript (`te-22__Mohan__r0__te`): వాడి నంబర తుమ్మిది ఎనిమిది ఎనిమిది ఎడు ఎడు ఎడు ఆరు ఆరు ఆయిదు ఆయిదు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9988776655 | - | 9988776655 | **asr**: value not in the transcript |

### 19. kn-10 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: UPI ID rahul dot kyc at ybl ಗೆ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ, ಇಪ್ಪತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ
- Transcript (`kn-10__Gagan__r0__kn`): ವುಪೆಯ ಎದ ರಾಹುಲ್ ಡಾಟ್ ಕೈಕೆಟ ಇಬಲ್ಗೆ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುವಿಸಿದೆ ಇಪ್ಪತ್ತುನಿ ಮಿಷಿಗಳ ಹಿಂದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: ನಿಮಿಷಗಳ |
| scamType | fp | - | other | fake_kyc | **extractor**: fails on the reference text too (fp) |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 20. kn-16 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ನನ ಆಕಾಂಟಿಂದ ಇಪಟ್ಟು ಸಾವರಿದ ರುಪಿಸ್ಟೆ ರುಪಿಸ್ಟೆ ಆಯತು ಎಸೇಶಿ ಬಾಗ್ಗು ಒಂದು ಗಂಟೆ ಹಿಂದೆ ಕಾಸ್ಟಮರ್ಗೆ ಕಾರಗೆ ಕಾಲ್ಮಾಡಿದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | wrong | fake_customer_care | other | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 21. hi-15 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): पैसे कट गए UTR नंबर है 403218 765 432 5000 रुपए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | fn | 403218765432 | - | 403218765432 | **extractor_form**: value is in the transcript but not parsed |

### 22. bn-11 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: দেড় লাখ টাকা চলে গেছে, ব্যাংক অফ বরোদা অ্যাকাউন্ট, গতকাল রাত দশটায়
- Transcript (`bn-11__Bashkar__r0__bn`): Dead luck takachuleg e-cay, Bank of Boroda Account, gotokal rada doshtae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |
| time | fn | -1d 22:00 (840 min ago) | - | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: রাত |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 23. bn-19 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: যে অ্যাকাউন্টে টাকা গেছে তার নম্বর 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`bn-19__Bashkar__r0__bn`): জে একান্তে টাকা গেছে তার নোমবর পাচ সুন্ন এক সুন্ন দুই তিন চার পাচ ছায় সাক আট এক দুই.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| suspectAccount | fn | 50100234567812 | - | 50100234567812 | **asr**: value not in the transcript |

### 24. bn-20 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: উম্ম... মানে, গতকাল দুপুর আড়াইটায় ফোনপে থেকে দু হাজার ছশো টাকা গেছে
- Transcript (`bn-20__Bashkar__r0__bn`): উম্মো মানে গতকাল দুপুর আরাইতাই ফোন পেথেকে দু হাজার ছাসো টাকা গেছে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2600 | 2000 | 2600 | **asr**: value not in the transcript |
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: আড়াইটায় |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 25. bn-22 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: ওর নম্বর নয় নয় আট আট সাত সাত ছয় ছয় পাঁচ পাঁচ
- Transcript (`bn-22__Bashkar__r0__bn`): ওর নমব্য নাই নাই আট আট আট সাত শাট ছয ছয পাচ পাচ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| suspectPhone | fn | 9988776655 | - | 9988776655 | **asr**: value not in the transcript |

### 26. ta-08 (story) - fails 100% of 2 runs

- Reference: ஒரு வீடியோ கால் வந்தது, ரெக்கார்ட் பண்ணி இப்போ மிரட்டல் பண்றாங்க, பேடிஎம் மூலமா பதினைந்தாயிரம் ரூபாய் கொடுத்துட்டேன்
- Transcript (`ta-08__Pallavi__r0__ta`): ஒரு வீடியோ கால் வந்தது ரெக்காட் பண்ணி இப்போ மிறட்டல் பண்டாங்க பேடியம் மூலமா 14 ருபாய் குடுத்து தேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 14 | 15000 | **asr**: value not in the transcript |
| bank | fp | - | Bandhan Bank | - | **asr**: spurious value from a mis-recognised transcript |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: near-spelling variant of: பேடிஎம் |

### 27. ta-10 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: UPI ID rahul dot kyc at ybl க்கு எட்டாயிரம் ரூபாய் அனுப்பினேன், இருபது நிமிஷத்துக்கு முன்னாடி
- Transcript (`ta-10__Pallavi__r0__ta`): UPI ID Rahul.KYC at YPLQ8RM-RUBAI ANIPPINEN, 20 NIMISHAT THIKKU MUNNADI.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: நிமிஷத்துக்கு |
| scamType | fp | - | fake_kyc | fake_kyc | **extractor**: fails on the reference text too (fp) |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 28. ta-12 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: இரண்டாயிரத்து ஐநூறு ரூபாய் கட் ஆயிடுச்சு, அரை மணி நேரத்துக்கு முன்னாடி, இந்தியன் வங்கி
- Transcript (`ta-12__Pallavi__r0__ta`): 2.5 ருபாயி கட் ஆயிடுச்சு அரை மணி நெரத்துக்கு முன்னாடி இந்தியன் வங்கி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 2.5 | 2500 | **asr**: value not in the transcript |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 29. te-10 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: UPI ID rahul dot kyc at ybl కి ఎనిమిది వేల రూపాయలు పంపాను, ఇరవై నిమిషాల క్రితం
- Transcript (`te-10__Mohan__r0__te`): UPAID Rahul.kyc at YBL కి ఏనిమిది వేలరుపాయు పంపాను ఇరావాయు నిమిశాలకృతమ్.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 8000 | 1000 | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: నిమిషాల క్రితం |
| scamType | fp | - | fake_kyc | fake_kyc | **extractor**: fails on the reference text too (fp) |

### 30. te-24 (answer:amount) - fails 100% of 3 runs, also fails on reference text

- Reference: నాలుగు వేల తొమ్మిది వందల తొంభై తొమ్మిది
- Transcript (`te-24__Mohan__r0__te`): నాలుగు వేల తుమ్మిది వందల తుమ్ భఈ తుమ్మిది.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4900 | 4999 | **asr**: value not in the transcript |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 31. mr-33 (answer:suspect) - fails 100% of 2 runs, also fails on reference text

- Reference: त्याचा नंबर 7 0 1 1 2 2 3 3 4 4
- Transcript (`mr-33__Aarohi__r0__mr`): त्याचा नंबर साथ 011 123344

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |
| suspectAccount | fp | - | 011123344 | - | **asr**: spurious value from a mis-recognised transcript |

### 32. mr-34 (answer:suspect) - fails 100% of 2 runs, also fails on reference text

- Reference: sharma dot pay at paytm
- Transcript (`mr-34__Aarohi__r0__mr`): शर्मा डियोटी पे आट पेटमा

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| paymentApp | fp | - | Paytm | Paytm | **extractor**: fails on the reference text too (fp) |
| suspectUpi | fn | sharma.pay@paytm | - | sharma.pay@paytm | **asr**: value not in the transcript |

### 33. kn-02 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: ಅಣ್ಣ ಬೇಗ, ನನ್ನ ಅಕೌಂಟ್‌ನಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು, ಫೋನ್‌ಪೇ ಮೂಲಕ, ಈಗಷ್ಟೇ ಆಯಿತು
- Transcript (`kn-02__Gagan__r0__kn`): ಅನ್ನ ಬೇಗಾ ನನ್ನ ಅಕಂಂತ್ನಿಂದ ಆಯಿದು ಸಾವಿರ ರೂಪಾಯ ಹೋಯಿತು ಫೋನ್ಪೇ ಮೂಲಕ ಇಗ ಸ್ಟೇ ಆಯಿತು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **extractor_form**: value is in the transcript but not parsed |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: ಈಗಷ್ಟೇ |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 34. kn-12 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: ಎರಡೂವರೆ ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು, ಅರ್ಧ ಗಂಟೆಯ ಹಿಂದೆ, ಇಂಡಿಯನ್ ಬ್ಯಾಂಕ್
- Transcript (`kn-12__Gagan__r0__kn`): ಎರಡು ಒರೆ ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ಆಯತು ಅರ್ಧಗಂಟೆ ಹಿಂದೆ ಇಂಡಿಯನ್ ಬ್ಯಂಕ್ಕಿಂದೆ ಇಂಡಿಯನ್ ಬ್ಯಂಕ್ಕಿಂದೆ ಇಂಡಿಯನ್ ಬ್ಯಂಕಿಂದೆ ಇಂಡಿಯನ್ ಬಾಮಸಿಯನ್ಯನ್ ಬಾಮಸಿಯನ್ಯನ್ಯನ್ಯನ್ಯನ್ಯನ್ಯ�

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 1000 | 2500 | **asr**: value not in the transcript |
| time | fn | today 11:30 (30 min ago) | - | today 11:30 (30 min ago) | **asr**: ASR lost/changed: ಗಂಟೆಯ |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 35. kn-14 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: UPI ರೆಫರೆನ್ಸ್ ನಂಬರ್ 4 0 3 2 1 8 7 6 5 4 3 2, ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-14__Gagan__r0__kn`): ಯುಪಾಯ ರೆಫ್ರೆನ್ಸ್ ನಂಬರ್ ನಾಲ್ಕು ಸೊನ್ನೆ ಮೂರು ಎರ್ಡು ಒಂಡು ಎಂಟು ಎಳು ಆರು ಆಯಿದು ನಾಲ್ಕು ಮೂರು ಎರ್ಡು ಆಯಿದು ಸಾವಿರ ರೂಪಾಯ ಹೋಯಿತು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **extractor_form**: value is in the transcript but not parsed |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 36. hi-11 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: डेढ़ लाख रुपये गए हैं मेरे, बैंक ऑफ बड़ौदा का अकाउंट है, कल रात दस बजे
- Transcript (`hi-11__Madhur__r0__hi`): देड़ लाख रुपए गए हैं मेरे बैंक आफ बड़ादा का अकाउंट है कल रात दस बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 150000 | 100000 | 150000 | **extractor_form**: value is in the transcript but not parsed |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 37. bn-03 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: গতকাল সন্ধ্যা সাতটায় কাস্টমার কেয়ার থেকে ফোন এসেছিল, AnyDesk ইনস্টল করতে বলল, তারপর এইচডিএফসি অ্যাকাউন্ট থেকে দুই লাখ টাকা কেটে নিল
- Transcript (`bn-03__Bashkar__r0__bn`): বতকাল শুন্ধা সাপতায় কাস্টমার কেয় থেকে ফোন এশে ছিলো, এনিয় দেশক ইন্সল কুরতে বলো, তার পার এজ ডিএফ্সি একাউন্ট থেকে দুই লাক তাকা কেটে নিলো.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 200000 | 2 | 200000 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: এইচডিএফসি |

### 38. mr-13 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: माझे १५००० रुपये गेले, ॲक्सिस बँक, ३ दिवसांपूर्वी
- Transcript (`mr-13__Aarohi__r0__mr`): माजे 15,000 रुपे गेले आक्सिस बंक तीन दिवसाम कूरवी

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | -3d 12:00 (4320 min ago) | - | -3d 12:00 (4320 min ago) | **asr**: ASR lost/changed: दिवसांपूर्वी |
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |

### 39. mr-22 (story) - fails 100% of 3 runs

- Reference: त्याचा नंबर नऊ नऊ आठ आठ सात सात सहा सहा पाच पाच
- Transcript (`mr-22__Aarohi__r0__mr`): त्याचा नंबर 998877-55

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | other | - | **asr**: spurious value from a mis-recognised transcript |
| suspectPhone | fn | 9988776655 | - | 9988776655 | **asr**: value not in the transcript |

### 40. mr-23 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: पाच हजार रुपये
- Transcript (`mr-23__Aarohi__r0__mr`): पाच हजार रुपे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | other | other | **extractor**: fails on the reference text too (fp) |
