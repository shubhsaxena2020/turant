# Turant pipeline eval: blind2_page_bn_54

Generated 2026-11-28T00:17:38.445Z. Extractor: `..\prototype\src\lib\extract.ts`. 42 cases, 24 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 42 | 97.6 | 97.6 | 98.6 | 98.6 | 98.6 | - | - |
| ASR clean, normal rate | 12 | 58.3 | 58.3 | 87.5 | 70.0 | 77.8 | 22.4 | 10.0 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 24 | 58.3 | 58.3 | 85.3 | 72.5 | 78.4 | 24.5 | 11.4 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 66.7% of clean runs and 62.5% of all runs fully correct. Per language (clean): hi -%, en -%, bn 67%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 27 | 96.3 | 96.3 | 96.3 | 100.0 | 75.0 | 85.7 | 75.9 |
| time | 15 | 100.0 | 100.0 | 100.0 | 50.0 | 50.0 | 50.0 | 62.5 |
| scamType | 8 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 85.7 |
| bank | 13 | 100.0 | 100.0 | 100.0 | 100.0 | 75.0 | 85.7 | 85.7 |
| paymentApp | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| utr | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectPhone | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 73 | 98.6 | 98.6 | 98.6 | 87.5 | 70.0 | 77.8 | 78.4 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 83.3 | - | - | 90.9 | - | - | - | - (n=0) |
| bn | 100.0 | 58.3 | - | 100.0 | 77.8 | 22.4 | 10.0 | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  | 100.0 / - |  |
| en | 75.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |
| bn | 100.0 / 85.7 | 100.0 / 50.0 | 100.0 / 66.7 | 100.0 / 85.7 | 100.0 / 100.0 |  |  |  |  |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 24 | 58.3 | 78.4 | 24.5 | 11.4 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 24 | 58.3 | 78.4 | 24.5 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 6 | 50.0 | 70.6 | 26.5 | 13.3 |
| bn-IN-TanishaaNeural | 6 | 66.7 | 84.2 | 18.4 | 6.6 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 24 | 58.3 | 78.4 | 24.5 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 4 | 100.0 | 50.0 | 81.8 |
| answer | 6 | 100.0 | 50.0 | 60.0 |
| correction | 2 | 85.7 | 100.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 11 | 10 (91%) | 1 (9%) | 0 (0%) | 0 |
| clean | 11 | 10 (91%) | 1 (9%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 5 | 5 | 0 | 0 |
| time | 3 | 3 | 0 | 0 |
| bank | 2 | 1 | 1 | 0 |
| scamType | 1 | 1 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bn | 11 | 10 | 1 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | bn | asr | fn | 3 | bn-c02 bn-c04 bn-c06 |
| 2 | time | bn | asr | wrong | 3 | bn-c02 bn-c03 |
| 3 | amount | bn | asr | wrong | 2 | bn-c04 |
| 4 | scamType | bn | asr | fn | 1 | bn-c01 |
| 5 | bank | bn | extractor_form | fn | 1 | bn-c05 |
| 6 | bank | bn | asr | fn | 1 | bn-c01 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. bn-c04 (answer:amount) - fails 75% of 4 runs

- Reference: এক লাখ বিশ হাজার
- Transcript (`bn-c04__Tanishaa__r0__bn`): এক লাক বিস হাজার।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 120000 | - | 120000 | **asr**: value not in the transcript |

### 2. bn-c02 (story) - fails 50% of 4 runs

- Reference: গতকাল সন্ধ্যা ছটায় ফোনপে দিয়ে দুই হাজার টাকা চলে গেছে
- Transcript (`bn-c02__Bashkar__r0__bn`): গতকাল সূন্ধা ছোটায় ফোনপে দিয়ে দুই হাজায় তাকা চলে গেছে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2000 | - | 2000 | **asr**: value not in the transcript |
| time | wrong | -1d 18:00 (1080 min ago) | -1d 12:00 (1440 min ago) | -1d 18:00 (1080 min ago) | **asr**: ASR lost/changed: ছটায় |

### 3. bn-c01 (story) - fails 50% of 4 runs

- Reference: একজন বলল আমার কেওয়াইসি আপডেট করতে হবে, না হলে অ্যাকাউন্ট বন্ধ হয়ে যাবে, তারপর আমার এসবিআই অ্যাকাউন্ট থেকে আট হাজার টাকা কেটে গেল
- Transcript (`bn-c01__Bashkar__r0__bn`): একজন বলল আমার কিউইসি অফলেট করতে হবে, না হলে একাউন্ট বন্ধ হয়ে যাবে, তারপর আমার এসবিআই একাউন্ট থেকে আট হাজার তাকা কেল।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: কেওয়াইসি |

### 4. bn-c03 (answer:time) - fails 25% of 4 runs

- Reference: চল্লিশ মিনিট আগে
- Transcript (`bn-c03__Tanishaa__r0__bn`): চল্ডিস মিনিট আগেই।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 11:20 (40 min ago) | today 11:59 (1 min ago) | today 11:20 (40 min ago) | **asr**: ASR lost/changed: চল্লিশ |

### 5. bn-c05 (answer:bank) - fails 25% of 4 runs

- Reference: পাঞ্জাব ন্যাশনাল ব্যাংক
- Transcript (`bn-c05__Bashkar__r0__bn`): পাঞ্জাদ ন্যাশনাল ব্যাংক

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Punjab National Bank (PNB) | - | Punjab National Bank (PNB) | **extractor_form**: near-spelling variant of: পাঞ্জাব |

### 6. bn-c06 (correction) - fails 25% of 4 runs

- Reference: টাকার পরিমাণ ভুল, পাঁচ হাজার ছিল
- Transcript (`bn-c06__GiuseppeMultilingual__r0__bn`): টাকার পরিমাণ ভুল, পাঁচ হাজারছিল।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
