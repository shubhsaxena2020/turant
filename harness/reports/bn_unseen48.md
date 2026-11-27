# Turant pipeline eval: bn_unseen48

Generated 2026-11-27T22:23:04.687Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 156 ASR transcripts scored, **4 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 0 | - | - | - | - | - | - | - |
| ASR noise 15 dB | 39 | 28.2 | 28.2 | 86.0 | 53.8 | 66.2 | 50.4 | 41.4 |
| ASR noise 5 dB | 39 | 20.5 | 20.5 | 79.5 | 38.8 | 52.1 | 75.1 | 45.2 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 156 | 25.0 | 25.0 | 82.8 | 49.7 | 62.1 | 54.9 | 36.5 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): -% of clean runs and 28.2% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | - | - | - | 60.5 |
| time | 113 | 100.0 | 100.0 | 100.0 | - | - | - | 62.6 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | - | - | - | 64.6 |
| bank | 97 | 100.0 | 100.0 | 100.0 | - | - | - | 82.4 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 60.9 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 0.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 100.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | - | - | - | 62.1 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | 20.5 | 100.0 | - | - | - | - (n=0) |
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
| babble 15 dB | 9 | 11.1 | 70.3 | 51.6 | 60.1 |
| babble 5 dB | 9 | 0.0 | 42.4 | 121.1 | 62.4 |
| clean | 78 | 25.6 | 64.6 | 47.1 | 29.7 |
| pink 15 dB | 11 | 36.4 | 66.7 | 48.3 | 30.8 |
| pink 5 dB | 11 | 27.3 | 48.5 | 65.8 | 40.1 |
| traffic 15 dB | 19 | 31.6 | 63.2 | 50.9 | 35.5 |
| traffic 5 dB | 19 | 26.3 | 60.4 | 52.8 | 36.5 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 78 | 25.6 | 64.6 | 47.1 |
| 15 dB | 39 | 28.2 | 66.2 | 50.4 |
| 5 dB | 39 | 20.5 | 52.1 | 75.1 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 78 | 25.6 | 64.6 | 47.1 |

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
| all forced-language runs | 161 | 144 (89%) | 17 (11%) | 0 (0%) | 0 |
| clean | 75 | 69 (92%) | 6 (8%) | 0 (0%) | 0 |
| 15 dB | 37 | 33 (89%) | 4 (11%) | 0 (0%) | 0 |
| 5 dB | 49 | 42 (86%) | 7 (14%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 47 | 47 | 0 | 0 |
| time | 28 | 24 | 4 | 0 |
| scamType | 23 | 18 | 5 | 0 |
| bank | 18 | 13 | 5 | 0 |
| suspectPhone | 16 | 14 | 2 | 0 |
| paymentApp | 9 | 8 | 1 | 0 |
| suspectUpi | 8 | 8 | 0 | 0 |
| utr | 8 | 8 | 0 | 0 |
| suspectAccount | 4 | 4 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bn | 161 | 144 | 17 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | bn | asr | fn | 30 | bn-06 bn-11 bn-13 bn-16 bn-17 bn-20 bn-21 bn-37 +6 |
| 2 | scamType | bn | asr | fn | 18 | bn-03 bn-04 bn-09 bn-16 bn-35 bn-05 bn-07 bn-18 |
| 3 | amount | bn | asr | wrong | 17 | bn-04 bn-07 bn-20 bn-21 bn-24 bn-25 bn-31 bn-18 |
| 4 | suspectPhone | bn | asr | fn | 14 | bn-09 bn-22 bn-33 bn-39 |
| 5 | bank | bn | asr | fn | 13 | bn-01 bn-12 bn-16 bn-18 bn-30 bn-06 bn-21 |
| 6 | time | bn | asr | fn | 12 | bn-01 bn-10 bn-12 bn-16 bn-27 bn-13 |
| 7 | time | bn | asr | wrong | 12 | bn-07 bn-12 bn-26 bn-28 bn-40 bn-03 bn-20 |
| 8 | paymentApp | bn | asr | fn | 8 | bn-04 bn-08 |
| 9 | suspectUpi | bn | asr | fn | 8 | bn-10 bn-34 |
| 10 | utr | bn | asr | fn | 8 | bn-14 bn-31 |
| 11 | scamType | bn | extractor_form | fn | 5 | bn-05 bn-08 |
| 12 | bank | bn | extractor_form | fn | 5 | bn-21 bn-05 bn-12 bn-13 |
| 13 | suspectAccount | bn | asr | fn | 3 | bn-19 |
| 14 | time | bn | extractor_form | wrong | 3 | bn-20 bn-28 |
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

### 6. bn-07 (story) - fails 100% of 4 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__RemyMultilingual__r0__bn`): একটা কিউআর কোট পাঠিয়ে বল স্ক্যান করুণ তাকা পাবেন, স্ক্যান করতেই চার হাজার নৈশ্য নিরান বি তাকা কেলো, আজ সকাল স্বারে দোষ্টায়।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4000 | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:30 (90 min ago) | today 09:00 (180 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: সাড়ে দশটায় |
