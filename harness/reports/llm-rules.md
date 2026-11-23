# Turant pipeline eval: llm-rules

Generated 2026-11-23T09:38:38.703Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 884 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).
Deltas in brackets are against `reports/baseline.json`.

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 (+44.3) | 100.0 | 100.0 | 100.0 | 100.0 (+22.4) | - | - |
| ASR clean, normal rate | 600 | 39.7 (+12.5) | 39.7 | 79.9 | 57.4 | 66.8 (+15.7) | 65.5 | 40.6 |
| ASR noise 15 dB | 85 | 65.9 (+41.2) | 65.9 | 86.7 | 74.6 | 80.2 (+31.2) | 44.7 | 32.7 |
| ASR noise 5 dB | 67 | 61.2 (+41.9) | 61.2 | 86.8 | 69.4 | 77.1 (+36.7) | 48.4 | 46.4 |
| ASR rate -15% / +15% | 94 | 67.0 (+41.3) | 67.0 | 89.3 | 75.5 | 81.8 (+33.5) | 43.0 | 40.0 |
| ASR all (forced language) | 846 | 47.0 (+22.2) | 47.0 | 81.9 | 61.0 | 69.9 (+21.7) | 60.7 | 40.3 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 46.2% of clean runs and 53.1% of all runs fully correct. Per language (clean): hi 84%, en 78%, bn 29%, ta 19%, te 25%, mr 55%, kn 19%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 64.7 | 54.8 | 59.3 (+16.5) | 63.6 |
| time | 113 | 100.0 | 100.0 | 100.0 | 74.4 | 63.4 | 68.4 (+23.3) | 68.7 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 99.0 | 59.4 | 74.3 (+10.7) | 77.6 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 98.1 | 74.3 | 84.5 (+22.0) | 85.6 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 50.8 | 67.4 (+6.5) | 71.8 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 88.9 | 17.8 | 29.6 (+0.5) | 38.2 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 100.0 | 63.9 | 78.0 (+0.0) | 81.9 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 82.6 | 30.2 | 44.2 (+1.3) | 52.1 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 36.4 | 26.7 | 30.8 (-4.0) | 29.6 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 40.0 | 57.1 (+0.0) | 70.3 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 79.9 | 57.4 | 66.8 (+15.7) | 69.9 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 (+20.0) | 68.8 (+11.3) | 77.8 | 100.0 | 87.7 | 36.0 | 21.1 | 75.0 (n=16) |
| en | 100.0 (+12.5) | 73.3 (+10.0) | 94.7 | 100.0 | 88.0 | 36.6 | 34.7 | 70.4 (n=27) |
| bn | 100.0 (+67.5) | 22.5 (+13.8) | 50.0 | 100.0 | 52.7 | 76.1 | 50.1 | 12.5 (n=16) |
| ta | 100.0 (+55.0) | 16.3 (+6.3) | 33.3 | 100.0 | 49.0 | 134.4 | 47.8 | 0.0 (n=16) |
| te | 100.0 (+55.0) | 21.3 (+11.3) | 22.2 | 100.0 | 48.0 | 74.9 | 52.0 | 12.5 (n=16) |
| mr | 100.0 (+47.5) | 42.5 (+23.8) | 77.8 | 100.0 | 72.7 | 68.9 | 31.8 | 12.5 (n=16) |
| kn | 100.0 (+52.5) | 16.3 (+12.5) | 14.3 | 100.0 | 45.3 | 79.7 | 50.2 | 25.0 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 89.6 | 100.0 / 82.5 | 100.0 / 87.0 | 100.0 / 92.3 | 100.0 / 85.7 | 100.0 / 50.0 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 100.0 |
| en | 100.0 / 79.1 | 100.0 / 86.6 | 100.0 / 97.4 | 100.0 / 95.8 | 100.0 / 88.9 | 100.0 / 80.0 | 100.0 / 100.0 | 100.0 / 80.0 | 100.0 / 80.0 |
| bn | 100.0 / 44.0 | 100.0 / 68.9 | 100.0 / 53.3 | 100.0 / 75.0 | 100.0 / 22.2 | 100.0 / - | 100.0 / - | 100.0 / 22.2 | 100.0 / - |
| ta | 100.0 / 19.7 | 100.0 / 58.1 | 100.0 / 68.6 | 100.0 / 77.6 | 100.0 / 66.7 | 100.0 / 0.0 | 100.0 / 85.7 | 100.0 / 0.0 | 100.0 / - |
| te | 100.0 / 35.6 | 100.0 / 61.5 | 100.0 / 42.9 | 100.0 / 72.7 | 100.0 / 40.0 | 100.0 / - | 100.0 / 100.0 | 100.0 / - | 100.0 / - |
| mr | 100.0 / 86.3 | 100.0 / 59.0 | 100.0 / 74.3 | 100.0 / 100.0 | 100.0 / 40.0 | 100.0 / - | 100.0 / - | 100.0 / 22.2 | 100.0 / 0.0 |
| kn | 100.0 / 39.0 | 100.0 / 48.1 | 100.0 / 53.3 | 100.0 / 66.7 | 100.0 / 76.9 | 100.0 / - | 100.0 / - | 100.0 / 0.0 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 22 | 63.6 | 74.5 | 36.5 | 30.3 |
| babble 5 dB | 15 | 53.3 | 73.3 | 48.7 | 44.1 |
| clean | 694 | 43.4 | 68.5 | 63.0 | 40.5 |
| pink 15 dB | 22 | 72.7 | 85.2 | 46.6 | 34.3 |
| pink 5 dB | 16 | 62.5 | 75.0 | 58.6 | 82.6 |
| traffic 15 dB | 41 | 63.4 | 80.4 | 47.1 | 33.1 |
| traffic 5 dB | 36 | 63.9 | 79.1 | 44.2 | 34.6 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 600 | 39.7 | 66.8 | 65.5 |
| 15 dB | 85 | 65.9 | 80.2 | 44.7 |
| 5 dB | 67 | 61.2 | 77.1 | 48.4 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 20.0 | 49.2 | 79.4 | 51.6 |
| bn-IN-TanishaaNeural | 40 | 25.0 | 56.1 | 72.9 | 48.6 |
| en-IN-NeerjaExpressiveNeural | 40 | 72.5 | 88.2 | 37.9 | 26.5 |
| en-IN-NeerjaNeural | 40 | 75.0 | 88.6 | 35.6 | 25.9 |
| en-IN-PrabhatNeural | 40 | 72.5 | 87.2 | 36.4 | 51.6 |
| hi-IN-MadhurNeural | 40 | 62.5 | 85.7 | 36.6 | 20.3 |
| hi-IN-SwaraNeural | 40 | 75.0 | 89.7 | 35.4 | 21.8 |
| kn-IN-GaganNeural | 40 | 12.5 | 44.8 | 77.9 | 49.8 |
| kn-IN-SapnaNeural | 40 | 20.0 | 45.9 | 81.6 | 50.7 |
| mr-IN-AarohiNeural | 40 | 45.0 | 74.6 | 70.0 | 33.0 |
| mr-IN-ManoharNeural | 40 | 40.0 | 70.8 | 67.9 | 30.6 |
| ta-IN-PallaviNeural | 40 | 15.0 | 50.4 | 154.9 | 50.7 |
| ta-IN-ValluvarNeural | 40 | 17.5 | 47.6 | 113.8 | 44.9 |
| te-IN-MohanNeural | 40 | 22.5 | 50.0 | 74.5 | 50.6 |
| te-IN-ShrutiNeural | 40 | 20.0 | 45.9 | 75.2 | 53.5 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 600 | 39.7 | 66.8 | 65.5 |
| -15% | 50 | 68.0 | 81.5 | 43.5 |
| +15% | 44 | 65.9 | 82.2 | 42.5 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 330 | 100.0 | 30.9 | 68.3 |
| correction | 60 | 100.0 | 56.7 | 62.4 |
| answer | 195 | 100.0 | 49.2 | 61.7 |
| answer (skip intent) | 15 | 100.0 | 40.0 | 57.1 |

## Language auto-detect vs forced language token

38 clean clips transcribed twice. Forced: 65.8% fully correct (WER 83.5%). Auto-detect: 63.2% (WER 85.6%). Transcript in the wrong script under auto-detect: 23.7%.

| Lang | n | Forced fully correct % | Auto fully correct % | Auto wrong script % |
|---|---|---|---|---|
| hi | 9 | 66.7 | 66.7 | 0.0 |
| en | 7 | 100.0 | 100.0 | 14.3 |
| bn | 2 | 50.0 | 100.0 | 100.0 |
| ta | 10 | 10.0 | 10.0 | 10.0 |
| te | 2 | 100.0 | 50.0 | 100.0 |
| mr | 6 | 100.0 | 100.0 | 16.7 |
| kn | 2 | 100.0 | 50.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 634 | 523 (82%) | 111 (18%) | 0 (0%) | 0 |
| clean | 539 | 443 (82%) | 96 (18%) | 0 (0%) | 0 |
| 15 dB | 30 | 25 (83%) | 5 (17%) | 0 (0%) | 0 |
| 5 dB | 29 | 28 (97%) | 1 (3%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 188 | 169 | 19 | 0 |
| time | 120 | 97 | 23 | 0 |
| scamType | 77 | 63 | 14 | 0 |
| bank | 70 | 55 | 15 | 0 |
| suspectPhone | 63 | 61 | 2 | 0 |
| utr | 41 | 32 | 9 | 0 |
| paymentApp | 33 | 10 | 23 | 0 |
| suspectAccount | 16 | 13 | 3 | 0 |
| suspectUpi | 15 | 15 | 0 | 0 |
| intent | 11 | 8 | 3 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 43 | 21 | 22 | 0 |
| en | 46 | 39 | 7 | 0 |
| bn | 111 | 93 | 18 | 0 |
| ta | 116 | 104 | 12 | 0 |
| te | 125 | 112 | 13 | 0 |
| mr | 70 | 45 | 25 | 0 |
| kn | 123 | 109 | 14 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | ta | asr | fn | 27 | ta-02 ta-03 ta-04 ta-07 ta-08 ta-10 ta-11 ta-12 +9 |
| 2 | amount | te | asr | wrong | 26 | te-01 te-04 te-06 te-07 te-08 te-10 te-13 te-14 +7 |
| 3 | amount | bn | asr | wrong | 23 | bn-02 bn-03 bn-04 bn-05 bn-06 bn-07 bn-12 bn-14 +6 |
| 4 | bank | kn | asr | fn | 18 | kn-01 kn-03 kn-05 kn-16 kn-17 kn-18 kn-30 kn-38 |
| 5 | amount | ta | asr | wrong | 17 | ta-01 ta-06 ta-08 ta-11 ta-12 ta-15 ta-17 ta-18 +3 |
| 6 | amount | kn | asr | wrong | 17 | kn-03 kn-07 kn-08 kn-11 kn-12 kn-14 kn-17 kn-20 +3 |
| 7 | scamType | te | asr | fn | 15 | te-01 te-05 te-07 te-08 te-09 te-16 te-18 te-35 |
| 8 | bank | te | asr | fn | 15 | te-01 te-03 te-16 te-18 te-21 te-38 te-29 te-30 |
| 9 | scamType | bn | asr | fn | 14 | bn-01 bn-03 bn-07 bn-08 bn-09 bn-16 bn-35 |
| 10 | suspectPhone | te | asr | fn | 14 | te-09 te-22 te-33 te-39 |
| 11 | time | kn | asr | fn | 14 | kn-02 kn-10 kn-12 kn-13 kn-16 kn-20 kn-27 kn-40 |
| 12 | amount | kn | asr | fn | 14 | kn-04 kn-10 kn-13 kn-16 kn-18 kn-23 kn-24 kn-25 +1 |
| 13 | time | ta | asr | wrong | 12 | ta-04 ta-11 ta-12 ta-13 ta-20 ta-26 ta-40 |
| 14 | time | te | asr | fn | 12 | te-02 te-10 te-12 te-13 te-16 te-20 te-27 |
| 15 | scamType | kn | asr | fn | 12 | kn-01 kn-05 kn-07 kn-09 kn-16 kn-35 |
| 16 | suspectPhone | bn | asr | fn | 11 | bn-09 bn-22 bn-33 bn-39 |
| 17 | scamType | ta | asr | fn | 11 | ta-01 ta-04 ta-05 ta-09 ta-16 ta-18 ta-35 |
| 18 | bank | bn | asr | fn | 10 | bn-03 bn-16 bn-18 bn-38 |
| 19 | amount | te | asr | fn | 10 | te-11 te-12 te-18 te-21 te-23 te-37 |
| 20 | amount | en | asr | wrong | 9 | en-12 en-16 en-17 en-25 |
| 21 | suspectPhone | ta | asr | fn | 9 | ta-09 ta-33 ta-39 |
| 22 | time | mr | extractor_form | wrong | 8 | mr-03 mr-26 mr-40 |
| 23 | suspectPhone | mr | asr | fn | 8 | mr-09 mr-22 mr-33 mr-39 |
| 24 | time | kn | asr | wrong | 8 | kn-03 kn-20 kn-26 kn-40 |
| 25 | scamType | hi | extractor_form | fn | 7 | hi-01 hi-03 hi-08 hi-37 |
| 26 | time | bn | asr | wrong | 7 | bn-07 bn-20 bn-28 bn-40 |
| 27 | amount | mr | asr | wrong | 7 | mr-02 mr-14 mr-20 mr-23 mr-37 |
| 28 | paymentApp | mr | extractor_form | fn | 7 | mr-02 mr-08 mr-20 |
| 29 | utr | mr | asr | fn | 7 | mr-14 mr-31 mr-32 |
| 30 | suspectPhone | kn | asr | fn | 7 | kn-09 kn-22 kn-33 kn-39 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. te-39 (correction) - fails 100% of 5 runs

- Reference: నంబర్ తప్పు, 9 8 1 1 1 2 2 2 3 3
- Transcript (`te-39__Mohan__r0__te`): నంబర్ తప్పు. తుమ్మిది ఎనిమిది ఒంటి గంటా ఒంటి గంటా ఒంటి ఒంటి ఒంటి ఒంటి �

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 17 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 2. bn-03 (story) - fails 100% of 2 runs

- Reference: গতকাল সন্ধ্যা সাতটায় কাস্টমার কেয়ার থেকে ফোন এসেছিল, AnyDesk ইনস্টল করতে বলল, তারপর এইচডিএফসি অ্যাকাউন্ট থেকে দুই লাখ টাকা কেটে নিল
- Transcript (`bn-03__Bashkar__r0__bn`): বতকাল শুন্ধা সাপতায় কাস্টমার কেয় থেকে ফোন এশে ছিলো, এনিয় দেশক ইন্সল কুরতে বলো, তার পার এজ ডিএফ্সি একাউন্ট থেকে দুই লাক তাকা কেটে নিলো.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 200000 | 2 | 200000 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: এইচডিএফসি |

### 3. ta-39 (correction) - fails 100% of 5 runs

- Reference: நம்பர் தப்பு, 9 8 1 1 1 2 2 2 3 3
- Transcript (`ta-39__Pallavi__r0__ta`): நம்பர் தப்பு, 1712122233

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 4. en-04 (story) - fails 100% of 3 runs

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__Neerja__r0__en`): । । । ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: abhi |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 5. te-16 (story) - fails 100% of 2 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__Mohan__r0__te`): నా అకాంట్ నుండి ఇరావాయ వేలు రుపీస్ డెబిటాయి పోయఈ ఆయిసియాయి బాంక ఒక గంటకృతం కస్టమర్ కియర్ కాల్ చేసాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 20000 | 1000 | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 6. kn-16 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ನನ ಆಕಾಂಟಿಂದ ಇಪಟ್ಟು ಸಾವರಿದ ರುಪಿಸ್ಟೆ ರುಪಿಸ್ಟೆ ಆಯತು ಎಸೇಶಿ ಬಾಗ್ಗು ಒಂದು ಗಂಟೆ ಹಿಂದೆ ಕಾಸ್ಟಮರ್ಗೆ ಕಾರಗೆ ಕಾಲ್ಮಾಡಿದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 7. en-13 (story) - fails 100% of 3 runs

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__Neerja__r0__en`): ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9999 | **asr**: value not in the transcript |
| time | fn | -1d 21:30 (870 min ago) | - | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: raat saade nau baje |

### 8. en-16 (story) - fails 100% of 3 runs

- Reference: Aaj subah 10 baje ek message aaya, QR scan karne ko bola, scan kiya aur dhai hazaar rupaye chale gaye
- Transcript (`en-16__Neerja__r0__en`): Today, a message in the morning, QR scan to get a scan and 50000 rupees went on.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 50000 | 2500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 09:00 (180 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 baje |

### 9. bn-08 (story) - fails 100% of 2 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__Bashkar__r0__bn`): একটা ঵্য়া কাল এশে ছিলো রেকার্ড করে একন ব্লাক মেল কুরছে পেটিয়ে পনেরো হাজার তাকা দিয়ে দিয়েছি

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 12:00 (1440 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: পেটিএম |

### 10. bn-20 (story) - fails 100% of 2 runs

- Reference: উম্ম... মানে, গতকাল দুপুর আড়াইটায় ফোনপে থেকে দু হাজার ছশো টাকা গেছে
- Transcript (`bn-20__Bashkar__r0__bn`): উম্মো মানে গতকাল দুপুর আরাইতাই ফোন পেথেকে দু হাজার ছাসো টাকা গেছে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2600 | 2000 | 2600 | **asr**: value not in the transcript |
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: আড়াইটায় |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (ফোনপে) but the extractor fails |

### 11. ta-04 (story) - fails 100% of 2 runs

- Reference: ஒருத்தர் தவறுதலாக பணம் அனுப்பிட்டேன்னு சொல்லி திருப்பி அனுப்ப சொன்னார், நான் கூகுள் பே மூலமா பன்னிரண்டாயிரத்து ஐநூறு ரூபாய் அனுப்பிட்டேன், இரண்டு மணி நேரத்துக்கு முன்னாடி
- Transcript (`ta-04__Pallavi__r0__ta`): ஒருத்தர் தவர்தலாக்கே பணம் அனுப்பிட்டேன்னுற் சொல்லி திருப்டி அனுப்ப சொன்னார் நான் கூகுள் பே மூலமா 12.5.5 அனுப்பிட்டேன் 2 மணி நெரத்துக்கு முன்னாடி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12500 | - | 12500 | **asr**: value not in the transcript |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: தவறுதலாக |

### 12. ta-08 (story) - fails 100% of 2 runs

- Reference: ஒரு வீடியோ கால் வந்தது, ரெக்கார்ட் பண்ணி இப்போ மிரட்டல் பண்றாங்க, பேடிஎம் மூலமா பதினைந்தாயிரம் ரூபாய் கொடுத்துட்டேன்
- Transcript (`ta-08__Pallavi__r0__ta`): ஒரு வீடியோ கால் வந்தது ரெக்காட் பண்ணி இப்போ மிறட்டல் பண்டாங்க பேடியம் மூலமா 14 ருபாய் குடுத்து தேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 14 | 15000 | **asr**: value not in the transcript |
| bank | fp | - | Bandhan Bank | - | **asr**: spurious value from a mis-recognised transcript |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: near-spelling variant of: பேடிஎம் |

### 13. ta-16 (story) - fails 100% of 3 runs

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__Pallavi__r0__ta`): என்லை இருந்து 20தாயரம் ருப்பீஸ் டெபிட் ஆயிடுச்சு ICICI Bank ஒரு மணி நெருத்துக்கு முன்னாடி காஸ்டுமாக்கு கால் பண்ணேன்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |

### 14. te-01 (story) - fails 100% of 2 runs

- Reference: నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు
- Transcript (`te-01__Mohan__r0__te`): నా ఏస్బియాయి ఖాతానుండి అయదు వేలు రూపాయలు పోయాయి పది నిమిశాల కృతం ఉకరుక్య వాయసి అప్డేట్ చేయమని చిప్పరు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **asr**: value not in the transcript |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 15. te-18 (story) - fails 100% of 2 runs

- Reference: రెండున్నర లక్షల రూపాయలు పెట్టుబడి పేరుతో తీసుకున్నారు, డబ్బులు డబుల్ అవుతాయన్నారు, యెస్ బ్యాంక్
- Transcript (`te-18__Mohan__r0__te`): రిండునర లక్షల రూపాయలు పిటుబడి పేరుతో తీస్కునారు డబులు డబుల అవుతాయనారు యస్ డాంక్.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 100000 | 250000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: పెట్టుబడి |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: యెస్ బ్యాంక్ |

### 16. mr-08 (story) - fails 100% of 3 runs

- Reference: एक व्हिडिओ कॉल आला, रेकॉर्ड करून आता ब्लॅकमेल करत आहेत, पेटीएमवरून पंधरा हजार रुपये दिले
- Transcript (`mr-08__Aarohi__r0__mr`): एक विडियो कॉल आला, रेकॉर्ड करून आता ब्लाकमेल करता है, पेटी एम वरून पंधरा हजार रुपे दिले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **extractor_form**: near-spelling variant of: ब्लॅकमेल |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: key words survive (पेटीएमवरून) but the extractor fails |

### 17. mr-14 (story) - fails 100% of 3 runs

- Reference: यूपीआय रेफरन्स नंबर 4 0 3 2 1 8 7 6 5 4 3 2, पाच हजार रुपये गेले
- Transcript (`mr-14__Aarohi__r0__mr`): UPI reference number 4032187-54325,000 रुपे गिले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 54325000 | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 18. kn-08 (story) - fails 100% of 2 runs

- Reference: ಒಂದು ವೀಡಿಯೊ ಕಾಲ್ ಬಂತು, ರೆಕಾರ್ಡ್ ಮಾಡಿ ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ, ಪೇಟಿಎಂ ಮೂಲಕ ಹದಿನೈದು ಸಾವಿರ ರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೇನೆ
- Transcript (`kn-08__Gagan__r0__kn`): ಒಂದು ವಿಡಿಯೋ ಕಾಲ್ಬಂತು ರೆಕಾಡ್ ಮಾಡಿ ಇಗ ಬ್ಲಾಕ್ ಮೇಲ್ ಮಾಡತ್ತಿದ್ದಾರೆ. ಪೇಟಿಯೆ ಮೂಲಕ ಹದಿನೆಯಿದು ಸಾವಿರರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೆಯನೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 1000 | 15000 | **asr**: value not in the transcript |
| scamType | fn | sextortion | - | sextortion | **extractor_form**: near-spelling variant of: ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: ಪೇಟಿಎಂ |

### 19. hi-08 (story) - fails 100% of 3 runs

- Reference: एक लड़की का वीडियो कॉल आया, रिकॉर्ड करके ब्लैकमेल कर रहे हैं, अब तक पंद्रह हज़ार रुपये दे चुका हूँ पेटीएम से
- Transcript (`hi-08__Madhur__r0__hi`): एक लड़की का विडियो कॉल आया, रिकॉर्ड करके ब्लैकमेल कर रहे हैं, अब तक 15,000 रुपए दे चुका हूँ पेटी इन से.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: पेटीएम |

### 20. bn-07 (story) - fails 100% of 2 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__Bashkar__r0__bn`): এত্য়ার কোড পাঠে বলো সকান কোরুন তাকা পারেন। সকান কোর্তে চার হজার নাল্সো নিরান ভিতাকা কেটে গেলো আজ শকাল সারে দস্তায়।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: সাড়ে দশটায় |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: স্ক্যান |

### 21. bn-11 (story) - fails 100% of 2 runs

- Reference: দেড় লাখ টাকা চলে গেছে, ব্যাংক অফ বরোদা অ্যাকাউন্ট, গতকাল রাত দশটায়
- Transcript (`bn-11__Bashkar__r0__bn`): Dead luck takachuleg e-cay, Bank of Boroda Account, gotokal rada doshtae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |
| time | fn | -1d 22:00 (840 min ago) | - | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: রাত |

### 22. bn-38 (correction) - fails 100% of 5 runs

- Reference: ব্যাংক ভুল, এসবিআই না, এইচডিএফসি
- Transcript (`bn-38__Bashkar__r0__bn`): ব্বূ বোর বোর বোর বোর

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: এইচডিএফসি |

### 23. ta-10 (story) - fails 100% of 2 runs

- Reference: UPI ID rahul dot kyc at ybl க்கு எட்டாயிரம் ரூபாய் அனுப்பினேன், இருபது நிமிஷத்துக்கு முன்னாடி
- Transcript (`ta-10__Pallavi__r0__ta`): UPI ID Rahul.KYC at YPLQ8RM-RUBAI ANIPPINEN, 20 NIMISHAT THIKKU MUNNADI.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: நிமிஷத்துக்கு |
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 24. ta-13 (story) - fails 100% of 2 runs

- Reference: என் 15000 ரூபாய் போயிடுச்சு, ஆக்சிஸ் பேங்க், 3 நாட்களுக்கு முன்பு
- Transcript (`ta-13__Pallavi__r0__ta`): என் பதனேந்தாயிரம் ரோபாய் போயிடுச்சு ஆக்சிஸ் பேங்க மோன்று நாட்கலைக்க முன்பு

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| time | wrong | -3d 12:00 (4320 min ago) | -1d 12:00 (1440 min ago) | -3d 12:00 (4320 min ago) | **asr**: ASR lost/changed: 3 நாட்களுக்கு |

### 25. te-08 (story) - fails 100% of 2 runs

- Reference: ఒక వీడియో కాల్ వచ్చింది, రికార్డ్ చేసి ఇప్పుడు బ్లాక్‌మెయిల్ చేస్తున్నారు, పేటీఎం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేశాను
- Transcript (`te-08__Mohan__r0__te`): ఉక వీడియో కాల్ వచ్చింది రికాడ్ చేసి ఇపుడు బ్లాక్ మేల్ చేస్తునారు పేటియం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేసాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: బ్లాక్‌మెయిల్ |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: పేటీఎం |

### 26. te-20 (story) - fails 100% of 2 runs

- Reference: అంటే... నిన్న మధ్యాహ్నం 2:30 కి ఫోన్‌పే ద్వారా రెండు వేల ఆరు వందల రూపాయలు పోయాయి
- Transcript (`te-20__Mohan__r0__te`): అంటే నిన్న మధ్యానం రెండు గంటల ముప్పే నిమిశాలు కి ఫోన్ పేద్వారా రెండు వేల ఆరు వందల రూపాయలు పోయాయి.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: 2:30 |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (ఫోన్‌పే) but the extractor fails |

### 27. mr-40 (correction) - fails 100% of 5 runs

- Reference: वेळ चुकीची, काल संध्याकाळी सात वाजता
- Transcript (`mr-40__Aarohi__r0__mr`): वे चुकीची, काल संध्याकारी सात वाजता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 07:00 (1740 min ago) | -1d 19:00 (1020 min ago) | **extractor_form**: near-spelling variant of: संध्याकाळी |

### 28. kn-01 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): ನನ ಸಬೈ ಕಾತೆಯಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ. ಹತ್ತು ನಿಮಿಷಿಗಳ ಹಿಂದೆ ಒಬ್ಬರು ಕೈಕ ಅಪ್ಪೇಟ್ ಮಾಡಲು ಹೇಳಿದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 29. kn-03 (story) - fails 100% of 2 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__Gagan__r0__kn`): ನಿನ್ನೆ ಸಂಜಿ 7 ಗಂಟಗೆ ಕಸ್ಟಮರ್ ಕೇರ್ನಿಂದ ಕರೆಬಂತು, ಏನಿಡೆಸ್ಕ ಇಂಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು. ನಂತರ ಹಡಿಫ್ಸಕಾತೆಯಂದ ಎರ್ಡು ಲಕ್ಷರೂಪಾಯಿ ತೆಗದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: ಸಂಜೆ |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 30. kn-07 (story) - fails 100% of 2 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__Gagan__r0__kn`): ಒಂದು ರಕೋಡ್ಕಳುಹಿಸಿ ಸ್ಕಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು. ಸ್ಕಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ನಾಲ್ಕುಸಾವಿರ ಒಂಬೈನುರ ತೊಂಬತ್ರೂಬತ್ತು ರೂಪಾಯಿ ಹೋಯಿತು. ಇಂದು ಬಳಿಗೆ ಹತ್ತು ಗಂಟಿಗೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4900 | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 12:00 (0 min ago) | today 10:00 (120 min ago) | **extractor_form**: near-spelling variant of: ಗಂಟೆಗೆ |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 31. kn-10 (story) - fails 100% of 2 runs

- Reference: UPI ID rahul dot kyc at ybl ಗೆ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ, ಇಪ್ಪತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ
- Transcript (`kn-10__Gagan__r0__kn`): ವುಪೆಯ ಎದ ರಾಹುಲ್ ಡಾಟ್ ಕೈಕೆಟ ಇಬಲ್ಗೆ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುವಿಸಿದೆ ಇಪ್ಪತ್ತುನಿ ಮಿಷಿಗಳ ಹಿಂದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: ನಿಮಿಷಗಳ |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 32. hi-11 (story) - fails 100% of 2 runs

- Reference: डेढ़ लाख रुपये गए हैं मेरे, बैंक ऑफ बड़ौदा का अकाउंट है, कल रात दस बजे
- Transcript (`hi-11__Madhur__r0__hi`): देड़ लाख रुपए गए हैं मेरे बैंक आफ बड़ादा का अकाउंट है कल रात दस बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 150000 | 100000 | 150000 | **extractor_form**: value is in the transcript but not parsed |
| bank | fn | Bank of Baroda | - | Bank of Baroda | **extractor_form**: near-spelling variant of: बड़ौदा |

### 33. hi-24 (story) - fails 100% of 4 runs

- Reference: कल दोपहर करीब ढाई बजे फोन पे से छब्बीस सौ रुपये गए
- Transcript (`hi-24__Madhur__r0__hi`): कल दोपहर करीब धाई बजे फोन पे से 2600 रुपए गए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **extractor_form**: key words survive (ढाई बजे) but the extractor fails |

### 34. hi-31 (answer:bank) - fails 100% of 4 runs

- Reference: एसबीआई
- Transcript (`hi-31__Madhur__r0__hi`): S.B.I.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: एसबीआई |

### 35. en-31 (answer:utr) - fails 100% of 3 runs

- Reference: Your A/c XX4321 has been debited via UPI. UPI Ref No 4 5 6 7 8 9 0 1 2 3 4 5. Not you? Call your bank.
- Transcript (`en-31__Neerja__r0__en`): Your ACXX 4321 has been debited via UPI. UPI REF No. 456789012345 Not you? Call your bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 4321 | - | **extractor_form**: spurious value from a near-correct transcript |

### 36. mr-03 (story) - fails 100% of 2 runs

- Reference: काल संध्याकाळी सात वाजता कस्टमर केअरमधून फोन आला, AnyDesk इन्स्टॉल करायला सांगितलं, मग एचडीएफसी खात्यातून दोन लाख रुपये काढले
- Transcript (`mr-03__Aarohi__r0__mr`): काल संध्याकाली साथ वाजता कस्टमर केर मधून फोन आला, एने डेस्क इंस्टॉल करायला संगितल, मग HDFC खात्यातून दोन लाख रुपे काडले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **extractor_form**: near-spelling variant of: संध्याकाळी |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 37. mr-20 (story) - fails 100% of 2 runs

- Reference: म्हणजे... काल दुपारी अडीच वाजता फोनपे वरून दोन हजार सहाशे रुपये गेले
- Transcript (`mr-20__Aarohi__r0__mr`): मनजे, काल दुपारी अडीच वाजता फोन पे वरून 2,100 रुपे गिले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2600 | 2100 | 2600 | **asr**: value not in the transcript |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (फोनपे) but the extractor fails |

### 38. mr-33 (answer:suspect) - fails 100% of 2 runs

- Reference: त्याचा नंबर 7 0 1 1 2 2 3 3 4 4
- Transcript (`mr-33__Aarohi__r0__mr`): त्याचा नंबर साथ 011 123344

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |
| suspectAccount | fp | - | 011123344 | - | **asr**: spurious value from a mis-recognised transcript |

### 39. hi-01 (story) - fails 100% of 3 runs

- Reference: मेरे अकाउंट से पाँच हज़ार रुपये कट गए, दस मिनट पहले एक आदमी ने बोला केवाईसी अपडेट करो, एसबीआई का अकाउंट है
- Transcript (`hi-01__Madhur__r0__hi`): मेरे अकाउंट से 5000 रुपए कट गए, 10 मिनट पहले एक आदमी ने बोला के YC अपडेट करो, SBI का अकाउंट है.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: केवाईसी |

### 40. hi-15 (story) - fails 100% of 3 runs

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): पैसे कट गए UTR नंबर है 403218 765 432 5000 रुपए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 403218765432 | - | 403218765432 | **extractor_form**: value is in the transcript but not parsed |
