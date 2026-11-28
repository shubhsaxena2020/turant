# Turant pipeline eval: bn_unseen60

Generated 2026-11-28T03:54:35.493Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 156 ASR transcripts scored, **4 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 0 | - | - | - | - | - | - | - |
| ASR noise 15 dB | 39 | 35.9 | 35.9 | 88.9 | 60.0 | 71.6 | 50.4 | 41.4 |
| ASR noise 5 dB | 39 | 23.1 | 23.1 | 80.0 | 40.0 | 53.3 | 75.1 | 45.2 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 156 | 33.3 | 33.3 | 85.8 | 54.7 | 66.8 | 54.9 | 36.5 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): -% of clean runs and 35.9% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | - | - | - | 72.5 |
| time | 113 | 100.0 | 100.0 | 100.0 | - | - | - | 62.6 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | - | - | - | 66.7 |
| bank | 97 | 100.0 | 100.0 | 100.0 | - | - | - | 84.6 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 60.9 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 0.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 100.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | - | - | - | 66.8 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | 23.1 | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 9 | 33.3 | 78.9 | 51.6 | 60.1 |
| babble 5 dB | 9 | 0.0 | 42.4 | 121.1 | 62.4 |
| clean | 78 | 37.2 | 70.4 | 47.1 | 29.7 |
| pink 15 dB | 11 | 36.4 | 70.3 | 48.3 | 30.8 |
| pink 5 dB | 11 | 27.3 | 48.5 | 65.8 | 40.1 |
| traffic 15 dB | 19 | 36.8 | 67.8 | 50.9 | 35.5 |
| traffic 5 dB | 19 | 31.6 | 63.0 | 52.8 | 36.5 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 78 | 37.2 | 70.4 | 47.1 |
| 15 dB | 39 | 35.9 | 71.6 | 50.4 |
| 5 dB | 39 | 23.1 | 53.3 | 75.1 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 78 | 37.2 | 70.4 | 47.1 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 145 | 131 (90%) | 14 (10%) | 0 (0%) | 0 |
| clean | 65 | 61 (94%) | 4 (6%) | 0 (0%) | 0 |
| 15 dB | 32 | 29 (91%) | 3 (9%) | 0 (0%) | 0 |
| 5 dB | 48 | 41 (85%) | 7 (15%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 34 | 34 | 0 | 0 |
| time | 28 | 24 | 4 | 0 |
| scamType | 22 | 18 | 4 | 0 |
| bank | 16 | 13 | 3 | 0 |
| suspectPhone | 16 | 14 | 2 | 0 |
| paymentApp | 9 | 8 | 1 | 0 |
| suspectUpi | 8 | 8 | 0 | 0 |
| utr | 8 | 8 | 0 | 0 |
| suspectAccount | 4 | 4 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bn | 145 | 131 | 14 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | bn | asr | fn | 21 | bn-06 bn-13 bn-16 bn-20 bn-02 bn-04 bn-05 bn-08 +3 |
| 2 | scamType | bn | asr | fn | 18 | bn-03 bn-04 bn-09 bn-16 bn-35 bn-05 bn-07 bn-18 |
| 3 | suspectPhone | bn | asr | fn | 14 | bn-09 bn-22 bn-33 bn-39 |
| 4 | bank | bn | asr | fn | 13 | bn-01 bn-12 bn-16 bn-18 bn-30 bn-06 bn-21 |
| 5 | amount | bn | asr | wrong | 13 | bn-04 bn-07 bn-20 bn-24 bn-31 bn-18 |
| 6 | time | bn | asr | fn | 12 | bn-01 bn-10 bn-12 bn-16 bn-27 bn-13 |
| 7 | time | bn | asr | wrong | 12 | bn-07 bn-12 bn-26 bn-28 bn-40 bn-03 bn-20 |
| 8 | paymentApp | bn | asr | fn | 8 | bn-04 bn-08 |
| 9 | suspectUpi | bn | asr | fn | 8 | bn-10 bn-34 |
| 10 | utr | bn | asr | fn | 8 | bn-14 bn-31 |
| 11 | scamType | bn | extractor_form | fn | 4 | bn-08 bn-05 |
| 12 | suspectAccount | bn | asr | fn | 3 | bn-19 |
| 13 | time | bn | extractor_form | wrong | 3 | bn-20 bn-28 |
| 14 | bank | bn | extractor_form | fn | 3 | bn-05 bn-12 bn-13 |
| 15 | suspectPhone | bn | extractor_form | fn | 2 | bn-33 |
| 16 | time | bn | extractor_form | fn | 1 | bn-02 |
| 17 | paymentApp | bn | extractor_form | fn | 1 | bn-02 |
| 18 | suspectAccount | bn | asr | wrong | 1 | bn-19 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. bn-16 (story) - fails 100% of 4 runs

- Reference: আমার account থেকে 20,000 টাকা debit হয়ে গেছে, ICICI bank, এক ঘণ্টা আগে customer care এ ফোন করেছিলাম
- Transcript (`bn-16__GiuseppeMultilingual__r0__bn`): আমার এক কাউন থেকে বিসাজার টাকা ডিবেট হয়ে গেছে, ইসিসি ব্যাংক এক ঘন্টা আগে ক্ষস্টমর খেয়ার এ ফোন করেছিলাম।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |

### 2. bn-04 (story) - fails 100% of 4 runs

- Reference: একজন বলল ভুল করে টাকা পাঠিয়ে দিয়েছে, ফেরত দিতে বলল, আমি গুগল পে দিয়ে বারো হাজার পাঁচশো টাকা পাঠিয়ে দিলাম, দুই ঘণ্টা আগে
- Transcript (`bn-04__GiuseppeMultilingual__r0__bn`): একজন বলুল ভুল করে টাকা পাঠিয়ে দিয়েছে ফেরোত দিতে বলল, আমি গোগলপে দিয়ে বারো হাজার পাচ্য টাকা পাঠিয়ে দিলাম দুই ঘন্টা আগে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12500 | 1000 | 12500 | **asr**: value not in the transcript |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: গুগল |

### 3. bn-08 (story) - fails 100% of 4 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__GiuseppeMultilingual__r0__bn`): একটা ভিডিও কল এসে ছিল রেকর্ড করে এখন ব্ল্যাকমেইল করছে পেটিয়াম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: পেটিএম |

### 4. bn-09 (story) - fails 100% of 4 runs

- Reference: যে নম্বর থেকে ফোন এসেছিল সেটা হল 9 8 7 6 5... 4 3 2 1 0, বলল ব্যাংক থেকে বলছি, KYC না করলে অ্যাকাউন্ট বন্ধ হয়ে যাবে
- Transcript (`bn-09__RemyMultilingual__r0__bn`): যে নম্বর থেকে ফোন এসেছিল, সেটা হলোনয় আট সাত ছয় পাঁচ, চার তিন দুই এক শূন্য, বোল ব্যাংক থেকে বলছে, ক্যিক না করে একাউন্ড বন্ধ হয়ে যাবে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 5. bn-20 (story) - fails 100% of 4 runs

- Reference: উম্ম... মানে, গতকাল দুপুর আড়াইটায় ফোনপে থেকে দু হাজার ছশো টাকা গেছে
- Transcript (`bn-20__GiuseppeMultilingual__r0__bn`): ওমানে, গতকাল দুপুর আড়াইটা অ্যায়টা ফোন পে থেকে দুহাজার ছোসো টাক্যা গেছে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2600 | - | 2600 | **asr**: value not in the transcript |
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **extractor_form**: near-spelling variant of: আড়াইটায় |

### 6. bn-18 (story) - fails 100% of 4 runs

- Reference: দুই লাখ পঞ্চাশ হাজার টাকা ইনভেস্টমেন্টের নামে নিয়ে নিয়েছে, বলেছিল টাকা ডাবল হবে, ইয়েস ব্যাংক
- Transcript (`bn-18__GiuseppeMultilingual__r0__bn`): দুই লাক পঞ্চাশ হাজার টাকা ইনভেস্টমেন্টের নামে নিয়ে নিয়েছে, বলেছিল টাকা ডাবল হবে, ইস ব্যাং।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: ইয়েস |
