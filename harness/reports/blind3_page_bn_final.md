# Turant pipeline eval: blind3_page_bn_final

Generated 2026-11-28T06:52:47.642Z. Extractor: `..\prototype\src\lib\extract.ts`. 42 cases, 24 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 42 | 95.2 | 95.2 | 98.7 | 97.4 | 98.1 | - | - |
| ASR clean, normal rate | 12 | 25.0 | 25.0 | 71.4 | 45.5 | 55.6 | 31.0 | 10.5 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 24 | 29.2 | 29.2 | 73.3 | 50.0 | 59.5 | 30.5 | 10.3 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 50.0% of clean runs and 50.0% of all runs fully correct. Per language (clean): hi -%, en -%, bn 50%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 25 | 96.0 | 96.0 | 96.0 | 66.7 | 33.3 | 44.4 | 50.0 |
| time | 19 | 100.0 | 100.0 | 100.0 | 50.0 | 50.0 | 50.0 | 58.3 |
| scamType | 10 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| bank | 15 | 100.0 | 93.3 | 96.6 | 100.0 | 50.0 | 66.7 | 66.7 |
| paymentApp | 6 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| utr | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 0 | - | - | - | - | - | - | - |
| suspectPhone | 2 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 78 | 98.7 | 97.4 | 98.1 | 71.4 | 45.5 | 55.6 | 59.5 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 83.3 | 25.0 | - | 95.2 | 55.6 | 31.0 | 10.5 | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 83.3 | - | - | 90.9 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  | 100.0 / - |  |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  | 100.0 / - |  |
| bn | 100.0 / 44.4 | 100.0 / 50.0 | 100.0 / 66.7 | 80.0 / 66.7 | 100.0 / 66.7 |  |  |  |  |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| te | 66.7 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |  |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 24 | 29.2 | 59.5 | 30.5 | 10.3 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 24 | 29.2 | 59.5 | 30.5 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 6 | 33.3 | 58.8 | 34.0 | 13.8 |
| bn-IN-TanishaaNeural | 6 | 16.7 | 52.6 | 28.0 | 7.1 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 24 | 29.2 | 59.5 | 30.5 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 4 | 100.0 | 0.0 | 58.3 |
| answer | 6 | 90.5 | 16.7 | 25.0 |
| correction | 2 | 100.0 | 100.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 22 | 15 (68%) | 3 (14%) | 4 (18%) | 0 |
| clean | 22 | 15 (68%) | 3 (14%) | 4 (18%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 7 | 7 | 0 | 0 |
| bank | 6 | 2 | 0 | 4 |
| time | 5 | 5 | 0 | 0 |
| scamType | 2 | 1 | 1 | 0 |
| paymentApp | 2 | 0 | 2 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bn | 22 | 15 | 3 | 4 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | time | bn | asr | wrong | 5 | bn-d01 bn-d03 |
| 2 | amount | bn | asr | fn | 4 | bn-d01 bn-d04 |
| 3 | bank | bn | extractor | fn | 4 | bn-d05 |
| 4 | amount | bn | asr | wrong | 3 | bn-d02 |
| 5 | bank | bn | asr | fn | 2 | bn-d01 |
| 6 | paymentApp | bn | extractor_form | fn | 2 | bn-d02 |
| 7 | scamType | bn | asr | fn | 1 | bn-d01 |
| 8 | scamType | bn | extractor_form | fn | 1 | bn-d01 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. bn-d02 (story) - fails 100% of 4 runs

- Reference: ফোনপে দিয়ে তিন হাজার পাঁচশো টাকা চলে গেছে, পনেরো মিনিট আগে
- Transcript (`bn-d02__Bashkar__r0__bn`): ফোনটে দিয়ে তিন হাজার পাঁচশ তাকা চলে গেছে পনেরো মিনিট আগে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: near-spelling variant of: ফোনপে |

### 2. bn-d05 (answer:bank) - fails 100% of 4 runs, also fails on reference text

- Reference: ইউকো ব্যাংক
- Transcript (`bn-d05__Bashkar__r0__bn`): ইউকো ব্যাংক

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | UCO Bank | - | - | **extractor**: fails on the reference text too (fn) |

### 3. bn-d01 (story) - fails 75% of 4 runs

- Reference: গতকাল সন্ধ্যা সাতটায় একজন কাস্টমার কেয়ার থেকে ফোন করে একটা অ্যাপ ডাউনলোড করতে বলল, তারপর আমার এসবিআই অ্যাকাউন্ট থেকে বারো হাজার টাকা কেটে গেছে
- Transcript (`bn-d01__Bashkar__r0__bn`): গতকাল সূন্ধা সপ্তায় একজন কাস্টোমার্ক এর থেকে ফোন করে একটা এক ডাউনলোড করতে বলল, তারপর আমার এসবিএকাউন্ট থেকে বারো হাজার তাকা কে গেছে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: কাস্টমার কেয়ার |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: এসবিআই |

### 4. bn-d03 (answer:time) - fails 75% of 4 runs

- Reference: আজ সকাল সাড়ে এগারোটায়
- Transcript (`bn-d03__Tanishaa__r0__bn`): আজ সকাল সারে এগারুটায়।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 11:30 (30 min ago) | today 09:00 (180 min ago) | today 11:30 (30 min ago) | **asr**: ASR lost/changed: সাড়ে |

### 5. bn-d04 (answer:amount) - fails 75% of 4 runs

- Reference: পঁচিশ হাজার টাকা
- Transcript (`bn-d04__Bashkar__r0__bn`): পঁচি সহাজার তাকা।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 25000 | - | 25000 | **asr**: value not in the transcript |
