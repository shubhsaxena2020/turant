# Turant pipeline eval: hw1

Generated 2026-11-23T11:29:58.641Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 600 ASR transcripts scored, **910 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).
Deltas in brackets are against `reports/baseline.json`.

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 (+44.3) | 100.0 | 100.0 | 100.0 | 100.0 (+22.4) | - | - |
| ASR clean, normal rate | 600 | 46.5 (+19.3) | 46.5 | 84.0 | 64.2 | 72.8 (+21.7) | 63.7 | 39.8 |
| ASR noise 15 dB | 0 | - (NaN) | - | - | - | - (NaN) | - | - |
| ASR noise 5 dB | 0 | - (NaN) | - | - | - | - (NaN) | - | - |
| ASR rate -15% / +15% | 0 | - (NaN) | - | - | - | - (NaN) | - | - |
| ASR all (forced language) | 600 | 46.5 (+21.6) | 46.5 | 84.0 | 64.2 | 72.8 (+24.6) | 63.7 | 39.8 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 50.3% of clean runs and 50.3% of all runs fully correct. Per language (clean): hi 88%, en 83%, bn 30%, ta 23%, te 36%, mr 59%, kn 19%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 72.2 | 55.1 | 62.5 (+19.7) | 62.5 |
| time | 113 | 100.0 | 100.0 | 100.0 | 77.6 | 71.2 | 74.2 (+29.1) | 74.2 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 99.2 | 73.1 | 84.2 (+20.6) | 84.2 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 97.8 | 85.9 | 91.5 (+29.0) | 91.5 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 68.3 | 81.1 (+20.3) | 81.1 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 71.4 | 22.2 | 33.9 (+4.8) | 33.9 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 100.0 | 63.9 | 78.0 (+0.0) | 78.0 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 79.2 | 30.2 | 43.7 (+0.8) | 43.7 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 37.5 | 40.0 | 38.7 (+3.9) | 38.7 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 40.0 | 57.1 (+0.0) | 57.1 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 84.0 | 64.2 | 72.8 (+21.7) | 72.8 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 (+20.0) | 82.5 (+25.0) | - | 100.0 | 93.5 | 39.3 | 26.0 | 81.3 (n=16) |
| en | 100.0 (+12.5) | 79.2 (+15.8) | - | 100.0 | 92.3 | 34.0 | 21.0 | 74.1 (n=27) |
| bn | 100.0 (+67.5) | 26.3 (+17.5) | - | 100.0 | 58.4 | 75.4 | 45.2 | 25.0 (n=16) |
| ta | 100.0 (+55.0) | 20.0 (+10.0) | - | 100.0 | 54.3 | 101.1 | 43.8 | 0.0 (n=16) |
| te | 100.0 (+55.0) | 32.5 (+22.5) | - | 100.0 | 62.3 | 68.7 | 63.4 | 25.0 (n=16) |
| mr | 100.0 (+47.5) | 52.5 (+33.8) | - | 100.0 | 78.5 | 66.5 | 30.3 | 12.5 (n=16) |
| kn | 100.0 (+52.5) | 16.3 (+12.5) | - | 100.0 | 47.6 | 107.1 | 62.4 | 6.3 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 88.7 | 100.0 / 96.9 | 100.0 / 96.0 | 100.0 / 100.0 | 100.0 / 85.7 | 100.0 / 66.7 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 100.0 |
| en | 100.0 / 81.9 | 100.0 / 98.0 | 100.0 / 97.4 | 100.0 / 100.0 | 100.0 / 88.9 | 100.0 / 80.0 | 100.0 / 100.0 | 100.0 / 84.6 | 100.0 / 100.0 |
| bn | 100.0 / 48.8 | 100.0 / 66.7 | 100.0 / 48.3 | 100.0 / 91.2 | 100.0 / 54.5 | 100.0 / 28.6 | 100.0 / - | 100.0 / 0.0 | 100.0 / 33.3 |
| ta | 100.0 / 16.4 | 100.0 / 65.6 | 100.0 / 85.0 | 100.0 / 80.0 | 100.0 / 85.7 | 100.0 / 0.0 | 100.0 / 85.7 | 100.0 / 0.0 | 100.0 / - |
| te | 100.0 / 50.0 | 100.0 / 59.3 | 100.0 / 74.3 | 100.0 / 90.2 | 100.0 / 76.9 | 100.0 / 0.0 | 100.0 / 100.0 | 100.0 / - | 100.0 / - |
| mr | 100.0 / 85.1 | 100.0 / 69.8 | 100.0 / 92.7 | 100.0 / 100.0 | 100.0 / 85.7 | 100.0 / - | 100.0 / - | 100.0 / 22.2 | 100.0 / 0.0 |
| kn | 100.0 / 39.4 | 100.0 / 44.1 | 100.0 / 66.7 | 100.0 / 71.1 | 100.0 / 76.9 | 100.0 / 0.0 | 100.0 / - | 100.0 / 0.0 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 600 | 46.5 | 72.8 | 63.7 | 39.8 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 600 | 46.5 | 72.8 | 63.7 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 20.0 | 54.3 | 77.0 | 43.6 |
| bn-IN-TanishaaNeural | 40 | 32.5 | 62.3 | 73.8 | 46.8 |
| en-IN-NeerjaExpressiveNeural | 40 | 87.5 | 95.1 | 35.7 | 22.7 |
| en-IN-NeerjaNeural | 40 | 75.0 | 91.1 | 33.7 | 21.0 |
| en-IN-PrabhatNeural | 40 | 75.0 | 90.7 | 32.4 | 19.2 |
| hi-IN-MadhurNeural | 40 | 80.0 | 92.5 | 39.2 | 26.6 |
| hi-IN-SwaraNeural | 40 | 85.0 | 94.4 | 39.5 | 25.4 |
| kn-IN-GaganNeural | 40 | 17.5 | 46.8 | 100.5 | 61.3 |
| kn-IN-SapnaNeural | 40 | 15.0 | 48.4 | 113.8 | 63.5 |
| mr-IN-AarohiNeural | 40 | 60.0 | 82.7 | 68.8 | 31.3 |
| mr-IN-ManoharNeural | 40 | 45.0 | 74.3 | 64.2 | 29.2 |
| ta-IN-PallaviNeural | 40 | 17.5 | 57.8 | 100.7 | 40.4 |
| ta-IN-ValluvarNeural | 40 | 22.5 | 50.7 | 101.4 | 47.3 |
| te-IN-MohanNeural | 40 | 35.0 | 67.7 | 66.3 | 60.6 |
| te-IN-ShrutiNeural | 40 | 30.0 | 56.7 | 71.1 | 66.3 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 600 | 46.5 | 72.8 | 63.7 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 330 | 100.0 | 37.3 | 74.8 |
| correction | 60 | 100.0 | 61.7 | 65.5 |
| answer | 195 | 100.0 | 57.9 | 66.7 |
| answer (skip intent) | 15 | 100.0 | 40.0 | 57.1 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 461 | 409 (89%) | 52 (11%) | 0 (0%) | 0 |
| clean | 461 | 409 (89%) | 52 (11%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 165 | 153 | 12 | 0 |
| time | 79 | 65 | 14 | 0 |
| scamType | 48 | 44 | 4 | 0 |
| suspectPhone | 45 | 42 | 3 | 0 |
| utr | 36 | 30 | 6 | 0 |
| bank | 31 | 28 | 3 | 0 |
| paymentApp | 20 | 16 | 4 | 0 |
| suspectAccount | 15 | 12 | 3 | 0 |
| suspectUpi | 13 | 13 | 0 | 0 |
| intent | 9 | 6 | 3 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 15 | 10 | 5 | 0 |
| en | 27 | 21 | 6 | 0 |
| bn | 91 | 80 | 11 | 0 |
| ta | 93 | 86 | 7 | 0 |
| te | 83 | 75 | 8 | 0 |
| mr | 48 | 39 | 9 | 0 |
| kn | 104 | 98 | 6 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | ta | asr | fn | 24 | ta-03 ta-04 ta-05 ta-07 ta-08 ta-10 ta-11 ta-13 +7 |
| 2 | amount | kn | asr | fn | 23 | kn-01 kn-04 kn-06 kn-08 kn-10 kn-11 kn-12 kn-13 +8 |
| 3 | amount | ta | asr | wrong | 18 | ta-01 ta-06 ta-08 ta-10 ta-12 ta-13 ta-15 ta-17 +3 |
| 4 | amount | te | asr | fn | 18 | te-01 te-02 te-04 te-07 te-10 te-11 te-12 te-16 +3 |
| 5 | scamType | bn | asr | fn | 15 | bn-01 bn-03 bn-07 bn-08 bn-09 bn-16 bn-18 bn-35 |
| 6 | amount | bn | asr | wrong | 13 | bn-02 bn-04 bn-07 bn-08 bn-18 bn-21 bn-24 bn-37 |
| 7 | amount | bn | asr | fn | 12 | bn-05 bn-06 bn-11 bn-12 bn-14 bn-15 bn-17 bn-23 +1 |
| 8 | scamType | kn | asr | fn | 11 | kn-01 kn-05 kn-07 kn-09 kn-16 kn-35 |
| 9 | bank | kn | asr | fn | 11 | kn-01 kn-03 kn-05 kn-16 kn-18 kn-21 kn-38 |
| 10 | amount | te | asr | wrong | 10 | te-06 te-07 te-08 te-13 te-14 te-20 te-24 te-25 |
| 11 | time | kn | asr | wrong | 10 | kn-03 kn-04 kn-12 kn-20 kn-26 kn-40 |
| 12 | time | ta | asr | wrong | 9 | ta-03 ta-04 ta-11 ta-12 ta-20 ta-26 ta-40 |
| 13 | scamType | te | asr | fn | 9 | te-01 te-08 te-09 te-16 te-18 |
| 14 | amount | kn | asr | wrong | 9 | kn-03 kn-07 kn-10 kn-12 kn-13 kn-20 kn-24 kn-31 |
| 15 | amount | en | asr | wrong | 8 | en-16 en-17 en-25 |
| 16 | suspectPhone | bn | asr | fn | 8 | bn-09 bn-22 bn-33 bn-39 |
| 17 | time | te | asr | fn | 7 | te-02 te-04 te-07 te-10 te-12 |
| 18 | suspectPhone | mr | asr | fn | 7 | mr-09 mr-22 mr-33 mr-39 |
| 19 | time | kn | asr | fn | 7 | kn-02 kn-12 kn-13 kn-16 kn-27 |
| 20 | suspectPhone | ta | asr | fn | 6 | ta-09 ta-33 ta-39 |
| 21 | bank | ta | asr | fn | 6 | ta-13 ta-17 ta-18 ta-21 ta-30 |
| 22 | suspectPhone | te | asr | fn | 6 | te-09 te-22 te-33 te-39 |
| 23 | time | mr | asr | wrong | 6 | mr-07 mr-15 mr-20 mr-26 mr-28 |
| 24 | time | bn | asr | fn | 5 | bn-03 bn-11 bn-16 |
| 25 | paymentApp | bn | asr | fn | 5 | bn-04 bn-08 bn-20 |
| 26 | scamType | ta | asr | fn | 5 | ta-03 ta-04 ta-16 |
| 27 | utr | ta | asr | fn | 5 | ta-14 ta-31 ta-32 |
| 28 | bank | te | asr | fn | 5 | te-12 te-18 te-21 te-38 |
| 29 | time | te | asr | wrong | 5 | te-20 te-26 te-28 |
| 30 | amount | mr | asr | wrong | 5 | mr-03 mr-14 mr-20 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. kn-16 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ನನಾ ಕಾಂಟಿಂದ ಇಪಟ್ಟು ಸಾವಿರ ರೂಪಿಸ್ಟೆ ರೂಪಿಸ್ಟೆ ರೂಪಿಸ್ಟೆ ರೂಪಿಸ್ಟೆ ರೂಪಿಸ್ಟ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: ಗಂಟೆ ಹಿಂದೆ |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 2. bn-08 (story) - fails 100% of 2 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__Bashkar__r0__bn`): একটা ঵্যা কাল এশে ছিলো রেকার্ড করে একন ব্লাক মিল কুরছে PNDA 35000 তাকা দিয়ে দিয়েছি

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 35000 | 15000 | **asr**: value not in the transcript |
| time | fp | - | -1d 12:00 (1440 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: পেটিএম |

### 3. bn-18 (story) - fails 100% of 2 runs

- Reference: দুই লাখ পঞ্চাশ হাজার টাকা ইনভেস্টমেন্টের নামে নিয়ে নিয়েছে, বলেছিল টাকা ডাবল হবে, ইয়েস ব্যাংক
- Transcript (`bn-18__Bashkar__r0__bn`): দুই লাক 55,000 তাকা ইন্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্্�

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 55000 | 250000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: ডাবল |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: ইয়েস ব্যাংক |

### 4. ta-04 (story) - fails 100% of 2 runs

- Reference: ஒருத்தர் தவறுதலாக பணம் அனுப்பிட்டேன்னு சொல்லி திருப்பி அனுப்ப சொன்னார், நான் கூகுள் பே மூலமா பன்னிரண்டாயிரத்து ஐநூறு ரூபாய் அனுப்பிட்டேன், இரண்டு மணி நேரத்துக்கு முன்னாடி
- Transcript (`ta-04__Pallavi__r0__ta`): ஒருத்தர் தவர்திலாக்கே பணம் அனுப்பிட்டேன்னுற் சொல்லி திருப்டி அனுப்ப சொன்னார் நான் கூகுள் பே மூலமா 12.5.5 அனுப்பிட்டேன் இரண்டு மணி நேரத்துக்கு முன்னாடி

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12500 | - | 12500 | **asr**: value not in the transcript |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: தவறுதலாக |

### 5. kn-21 (story) - fails 100% of 2 runs

- Reference: ಕರೆಂಟ್ ಬಿಲ್ ಮೆಸೇಜ್ ಬಂತು, ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿದೆ, 9999 ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು, ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್
- Transcript (`kn-21__Gagan__r0__kn`): Current Bill Message बಂತು Link Click मಾಡಿದೆ 19.993.002.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.001.00

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9999 | **asr**: value not in the transcript |
| time | fp | - | -1d 20:39 (921 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ |

### 6. en-16 (story) - fails 100% of 3 runs

- Reference: Aaj subah 10 baje ek message aaya, QR scan karne ko bola, scan kiya aur dhai hazaar rupaye chale gaye
- Transcript (`en-16__Neerja__r0__en`): Aad Subha 10.00 a.m. message AQR ScanKarNKoBola ScanKia and 500,000 Rs. 2000.00 a.m.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 500000 | 2500 | **asr**: value not in the transcript |
| scamType | fn | qr_scan | - | qr_scan | **extractor_form**: key words survive (scan) but the extractor fails |

### 7. ta-14 (story) - fails 100% of 2 runs

- Reference: UPI ரெஃபரன்ஸ் நம்பர் 4 0 3 2 1 8 7 6 5 4 3 2, ஐயாயிரம் ரூபாய் போச்சு
- Transcript (`ta-14__Pallavi__r0__ta`): UPI reference no. 433217765432. ஐயாயிரம் ரூபாய் போச்சு

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | wrong | 403218765432 | 433217765432 | 403218765432 | **asr**: value not in the transcript |

### 8. ta-21 (story) - fails 100% of 2 runs

- Reference: கரண்ட் பில் மெசேஜ் வந்தது, லிங்க் கிளிக் பண்ணேன், 9999 ரூபாய் கட் ஆச்சு, ஸ்டேட் பேங்க்
- Transcript (`ta-21__Pallavi__r0__ta`): Current Bill Message வந்தது, Link கேலிக் பண்ணேன் 90.3.3.3.4.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.1.2.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9999 | **asr**: value not in the transcript |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: ஸ்டேட் பேங்க் |

### 9. te-01 (story) - fails 100% of 2 runs

- Reference: నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు
- Transcript (`te-01__Mohan__r0__te`): నా SBI ఖాతానుండి అయదు వేలు రూపాయలు పోయాయి పది నిమిషాల క్రితం ఉకరుక్యవాయసి అప్డేట్ చేయమని చప్పరు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 10. te-04 (story) - fails 100% of 2 runs

- Reference: ఒకతను పొరపాటున డబ్బులు పంపించానని, తిరిగి పంపమని అడిగాడు, నేను గూగుల్ పే ద్వారా పన్నెండు వేల ఐదు వందల రూపాయలు పంపాను, రెండు గంటల క్రితం
- Transcript (`te-04__Mohan__r0__te`): ఒకతను పొరపాటున డబ్బులు పంపించానని తిరిగి పంపమని అడిగాడు నేను Google Pay ద్వారా పన్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న్న�

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12500 | - | 12500 | **asr**: value not in the transcript |
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: రెండు గంటల క్రితం |

### 11. te-08 (story) - fails 100% of 2 runs

- Reference: ఒక వీడియో కాల్ వచ్చింది, రికార్డ్ చేసి ఇప్పుడు బ్లాక్‌మెయిల్ చేస్తున్నారు, పేటీఎం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేశాను
- Transcript (`te-08__Mohan__r0__te`): ఉక వీడియో కాల్ వచ్చింది రికాడ్ చేసి ఇపుడు బ్లాక్ మేల్ చేస్తునరు పేటియం ద్వారా 15 వేల రూపాయలు ఇచ్చేసాను

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: బ్లాక్‌మెయిల్ |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: పేటీఎం |

### 12. kn-01 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): ನನ್ನ ಸಭೈ ಕಾತೆಯಿಂದ ಆಯಿದು ಸಾವಿರ ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ ಹತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು ಕೈಕ ಅಪ್ಪೇಟ್ ಮಾಡಲು ಹೇಳಿದರು

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 13. kn-03 (story) - fails 100% of 2 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__Gagan__r0__kn`): ನಿನ್ನೆ ಸಂಜಿ ಎಳು ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್ನಿಂದ ಕರೆಬಂತು Anydesk Install Modelು ಹೆಳಿದರು ನಂತರ ಹಡಿಫ್ಸಕಾತೆಯಿಂದ ಎರ್ಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: ಸಂಜೆ |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 14. kn-10 (story) - fails 100% of 2 runs

- Reference: UPI ID rahul dot kyc at ybl ಗೆ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ, ಇಪ್ಪತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ
- Transcript (`kn-10__Gagan__r0__kn`): View Pay at Rahul.kkateable ge 187 rupai ಕಳವಿಸಿದೆ 202 ನಿಮಿಷಗಳ ಹಿಂದೆ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 8000 | 187 | 8000 | **asr**: value not in the transcript |
| time | wrong | today 11:40 (20 min ago) | today 08:38 (202 min ago) | today 11:40 (20 min ago) | **extractor_form**: key words survive (ನಿಮಿಷಗಳ ಹಿಂದೆ) but the extractor fails |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 15. bn-02 (story) - fails 100% of 2 runs

- Reference: দাদা তাড়াতাড়ি, আমার স্টেট ব্যাংক থেকে সাড়ে তিন হাজার টাকা চলে গেছে, ফোনপে দিয়ে, এইমাত্র
- Transcript (`bn-02__Bashkar__r0__bn`): দাদা তারাতাডি আমার স্টেট বাইংক থেকে শাডে তিন হাজাত তাকা চুলে গয়াছে ফোন পে দিএ এই মাত্র্য়।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 3 | 3500 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **extractor_form**: key words survive (এইমাত্র) but the extractor fails |

### 16. bn-03 (story) - fails 100% of 2 runs

- Reference: গতকাল সন্ধ্যা সাতটায় কাস্টমার কেয়ার থেকে ফোন এসেছিল, AnyDesk ইনস্টল করতে বলল, তারপর এইচডিএফসি অ্যাকাউন্ট থেকে দুই লাখ টাকা কেটে নিল
- Transcript (`bn-03__Bashkar__r0__bn`): বতকাল শুন্ধা সাপতায কাস্টুমার কেয় থেকে ফান এশে ছিলো এনিডেসিক ইন্সল কুরতে বলো তার পার HDFC একাউন্ট থেকে দুই লাখ তাকা কেটে নিলো

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 17. bn-04 (story) - fails 100% of 2 runs

- Reference: একজন বলল ভুল করে টাকা পাঠিয়ে দিয়েছে, ফেরত দিতে বলল, আমি গুগল পে দিয়ে বারো হাজার পাঁচশো টাকা পাঠিয়ে দিলাম, দুই ঘণ্টা আগে
- Transcript (`bn-04__Bashkar__r0__bn`): এজন বল্লো ভুল করে টাকা পাঠিএ দিএছে ফেরত দিতে বল্ল আমি Google পে দিএ বারো হাজার পাজার টাকা পাঠিএ দিলাম দুই ঘন্টা আগে

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12500 | 12000 | 12500 | **asr**: value not in the transcript |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: গুগল |

### 18. bn-07 (story) - fails 100% of 2 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__Bashkar__r0__bn`): এত্য কি঵ার কোড পাঠিরে বলো সকান কোরুন তাকা পারেন সকান কোর্তে 41990 তাকা কেটে গালো আজ শকাল সারে দসটায়

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 41990 | 4999 | **asr**: value not in the transcript |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: স্ক্যান |

### 19. ta-03 (story) - fails 100% of 2 runs

- Reference: நேத்து சாயங்காலம் 7 மணிக்கு கஸ்டமர் கேர்ல இருந்து கால் வந்தது, AnyDesk இன்ஸ்டால் பண்ண சொன்னாங்க, அப்புறம் HDFC அக்கவுண்ட்ல இருந்து இரண்டு லட்சம் ரூபாய் எடுத்துட்டாங்க
- Transcript (`ta-03__Pallavi__r0__ta`): நேற்று சாயிங்காலம் ஏறு மணிக்கு Customer Careல இருந்து கால் வந்தது AnyDisk Install பண்ண சொன்னாங்க அப்புரம் HDFC அக்கவுண்ல இருந்து இருந்துலைச்சம் ரூபாய் கிடுத்துட்டாங்க

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: 7 |

### 20. ta-08 (story) - fails 100% of 2 runs

- Reference: ஒரு வீடியோ கால் வந்தது, ரெக்கார்ட் பண்ணி இப்போ மிரட்டல் பண்றாங்க, பேடிஎம் மூலமா பதினைந்தாயிரம் ரூபாய் கொடுத்துட்டேன்
- Transcript (`ta-08__Pallavi__r0__ta`): ஒரு வீடியோ கால் வந்தது ரக்காட் பண்ணி இப்போ மிறட்டல் பண்டாங்க பேடியம் மூலமா 14 ரூபாய் குடுத்துட்டேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 14 | 15000 | **asr**: value not in the transcript |
| bank | fp | - | Bandhan Bank | - | **asr**: spurious value from a mis-recognised transcript |

### 21. ta-10 (story) - fails 100% of 2 runs

- Reference: UPI ID rahul dot kyc at ybl க்கு எட்டாயிரம் ரூபாய் அனுப்பினேன், இருபது நிமிஷத்துக்கு முன்னாடி
- Transcript (`ta-10__Pallavi__r0__ta`): UPI ID Rahul.KYC at YPL Q8RM-RUBAI அனிப்பினேன் 20 நிமிஷத்தக்கு முன்னாடி

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 22. te-09 (story) - fails 100% of 2 runs

- Reference: కాల్ వచ్చిన నంబర్ 9 8 7 6 5... 4 3 2 1 0, బ్యాంక్ నుండి మాట్లాడుతున్నాం, KYC చేయకపోతే అకౌంట్ బ్లాక్ అవుతుందని చెప్పారు
- Transcript (`te-09__Mohan__r0__te`): కాల్ వచ్చిన నంబర్ తుమ్మిది 865 నాలుగు 3-2-1గంటసున్న బేంక్ నుంది మాట్లాడుతునాం క్యవాయసి చేకపోతే అకాంట్ బ్లాక్కవుతుందని చెప్పేరు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 23. te-12 (story) - fails 100% of 2 runs

- Reference: రెండున్నర వేల రూపాయలు కట్ అయ్యాయి, అరగంట క్రితం, ఇండియన్ బ్యాంక్
- Transcript (`te-12__Mohan__r0__te`): రిండునర వేల రూపాయలు కట్ అయాయి అరగంటకృతం ఇండియన్ బాంక్

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2500 | - | 2500 | **asr**: value not in the transcript |

### 24. te-16 (story) - fails 100% of 2 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__Mohan__r0__te`): నా అకాంట్నుండి ఇరావాయ వేలు రుపిస్ డెబిటాయి పోయఈ ICICI Bank ఒక గంటకృతం కస్టమర్ కియర్కి కాల్ చేసాను

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |

### 25. mr-03 (story) - fails 100% of 2 runs

- Reference: काल संध्याकाळी सात वाजता कस्टमर केअरमधून फोन आला, AnyDesk इन्स्टॉल करायला सांगितलं, मग एचडीएफसी खात्यातून दोन लाख रुपये काढले
- Transcript (`mr-03__Aarohi__r0__mr`): काल संध्यकाली साथ वाजता कस्टमर केर मधून फोन आला AnyDesk इंस्टॉल करायला संगितल मग HDFC खात्यातून 2,00,00 रुपय काडले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 200000 | 20000 | 200000 | **asr**: value not in the transcript |
| time | wrong | -1d 19:00 (1020 min ago) | -1d 07:00 (1740 min ago) | -1d 19:00 (1020 min ago) | **extractor_form**: near-spelling variant of: संध्याकाळी |

### 26. mr-14 (story) - fails 100% of 2 runs

- Reference: यूपीआय रेफरन्स नंबर 4 0 3 2 1 8 7 6 5 4 3 2, पाच हजार रुपये गेले
- Transcript (`mr-14__Aarohi__r0__mr`): UPI reference number 4032187-54325000 रुपय गिले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 54325000 | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 27. mr-33 (answer:suspect) - fails 100% of 2 runs

- Reference: त्याचा नंबर 7 0 1 1 2 2 3 3 4 4
- Transcript (`mr-33__Aarohi__r0__mr`): त्याचा नम्मर साथ 011123344

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |
| suspectAccount | fp | - | 011123344 | - | **asr**: spurious value from a mis-recognised transcript |

### 28. kn-02 (story) - fails 100% of 2 runs

- Reference: ಅಣ್ಣ ಬೇಗ, ನನ್ನ ಅಕೌಂಟ್‌ನಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು, ಫೋನ್‌ಪೇ ಮೂಲಕ, ಈಗಷ್ಟೇ ಆಯಿತು
- Transcript (`kn-02__Gagan__r0__kn`): ಅನ್ನ ಬೇಗಾ ನನ್ನ ಅಕಂಟ್ನಿಂದ ಆಯಿದು ಸಾವಿರ ರೂಪಾಯ ಹೋಯಿತು, PhonePeay Moolaka, ಇಗಸ್ಟೆ ಆಯಿತು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: ಈಗಷ್ಟೇ |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: ಫೋನ್‌ಪೇ |

### 29. en-02 (story) - fails 100% of 3 runs

- Reference: Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai
- Transcript (`en-02__Neerja__r0__en`): Muir Accounts 5,000 Rs.Cat goy 10 minute pahle a guy said KYC update kero SBI account is

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **extractor_form**: value is in the transcript but not parsed |

### 30. en-04 (story) - fails 100% of 3 runs

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__Neerja__r0__en`): BAYA 5 NAHI NAHI 6000 RUPAY GAY HAY FONE PEACE SE ABHI ABHI

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 31. en-17 (story) - fails 100% of 3 runs

- Reference: Do lakh pachas hazaar rupaye invest karwaye trading app mein, bola paisa double hoga, Yes Bank se gaye
- Transcript (`en-17__Neerja__r0__en`): Do luck purchase 1000 rupay invest karvay trading app me Bola Paisa Double Hooga Yes Bank Se Gai

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 1000 | 250000 | **asr**: value not in the transcript |

### 32. en-25 (answer:amount) - fails 100% of 3 runs

- Reference: saade teen hazaar
- Transcript (`en-25__Neerja__r0__en`): 3,000

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 3000 | 3500 | **asr**: value not in the transcript |

### 33. mr-19 (story) - fails 100% of 2 runs

- Reference: ज्या खात्यात पैसे गेले त्याचा नंबर 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`mr-19__Aarohi__r0__mr`): जा खात्यात पईसे गेले त्याचा नंबर पाच 010-02-345-782

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectAccount | wrong | 50100234567812 | 501002345782 | 50100234567812 | **asr**: value not in the transcript |

### 34. mr-20 (story) - fails 100% of 2 runs

- Reference: म्हणजे... काल दुपारी अडीच वाजता फोनपे वरून दोन हजार सहाशे रुपये गेले
- Transcript (`mr-20__Aarohi__r0__mr`): मनजे, काल दुपारी अडीच वाजता फोन पे वरून 2100 रुपय गिले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2600 | 2100 | 2600 | **asr**: value not in the transcript |

### 35. mr-31 (answer:utr) - fails 100% of 2 runs

- Reference: तुमच्या खात्यातून रु. 5000 डेबिट झाले, UPI Ref No 6 1 2 3 4 5 7 8 9 0 1 2
- Transcript (`mr-31__Aarohi__r0__mr`): तुंचा खात्यातून 5000 रुपय डेबिट जाले रेफ 9 सहा 12345789012

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 612345789012 | - | 612345789012 | **extractor_form**: value is in the transcript but not parsed |

### 36. hi-08 (story) - fails 100% of 2 runs

- Reference: एक लड़की का वीडियो कॉल आया, रिकॉर्ड करके ब्लैकमेल कर रहे हैं, अब तक पंद्रह हज़ार रुपये दे चुका हूँ पेटीएम से
- Transcript (`hi-08__Madhur__r0__hi`): एक लड़की का विडियो कॉल आया, रिकॉर्ड करके ब्लैक मेल कर रहे हैं, अब तक 15,000 रुपये दे चुका हूँ पेटी इन से

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **extractor_form**: key words survive (ब्लैकमेल) but the extractor fails |

### 37. hi-15 (story) - fails 100% of 2 runs

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): पैसे कट गए UTR नंबर है 403218 765432 5000 रुपय

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 765432 | 5000 | **extractor_form**: value is in the transcript but not parsed |

### 38. hi-27 (answer:amount) - fails 100% of 2 runs

- Reference: उम्म... बारह सौ
- Transcript (`hi-27__Madhur__r0__hi`): उन्लग बारा साओ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 1200 | 12 | 1200 | **asr**: value not in the transcript |

### 39. en-15 (story) - fails 67% of 3 runs

- Reference: The number that called me was plus 91 70112 23344
- Transcript (`en-15__Neerja__r0__en`): The number that called me was plus 917011 to 23344

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |

### 40. hi-23 (correction) - fails 50% of 2 runs

- Reference: नंबर गलत है, 9 8 1 1 1 2 2 2 3 3 था
- Transcript (`hi-23__Madhur__r0__hi`): नमबर गलत है 981 1112 2233 था

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 2233 | - | **extractor_form**: spurious value from a near-correct transcript |
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |
