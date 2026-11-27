# Turant pipeline eval: bn_base48

Generated 2026-11-27T22:21:39.278Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 80 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 80 | 36.3 | 36.3 | 82.1 | 56.8 | 67.2 | 47.0 | 31.2 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 80 | 36.3 | 36.3 | 82.1 | 56.8 | 67.2 | 47.0 | 31.2 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 40.0% of clean runs and 40.0% of all runs fully correct. Per language (clean): hi -%, en -%, bn 40%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 73.7 | 58.3 | 65.1 | 65.1 |
| time | 113 | 100.0 | 100.0 | 100.0 | 82.8 | 75.0 | 78.7 | 78.7 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 88.0 | 73.3 | 80.0 | 80.0 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 25.0 | 40.0 | 40.0 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 37.5 | 54.5 | 54.5 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 82.1 | 56.8 | 67.2 | 67.2 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | 36.3 | - | 100.0 | 67.2 | 47.0 | 31.2 | 12.5 (n=16) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / 65.1 | 100.0 / 78.7 | 100.0 / 66.7 | 100.0 / 80.0 | 100.0 / 40.0 | 100.0 / - | 100.0 / - | 100.0 / 54.5 | 100.0 / 0.0 |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 80 | 36.3 | 67.2 | 47.0 | 31.2 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 36.3 | 67.2 | 47.0 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 35.0 | 66.2 | 48.4 | 32.5 |
| bn-IN-TanishaaNeural | 40 | 37.5 | 68.1 | 45.6 | 29.8 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 36.3 | 67.2 | 47.0 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 44 | 100.0 | 22.7 | 67.9 |
| answer | 26 | 100.0 | 42.3 | 55.3 |
| answer (skip intent) | 2 | 100.0 | 100.0 | 100.0 |
| correction | 8 | 100.0 | 75.0 | 85.7 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 71 | 61 (86%) | 10 (14%) | 0 (0%) | 0 |
| clean | 71 | 61 (86%) | 10 (14%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 20 | 20 | 0 | 0 |
| scamType | 11 | 8 | 3 | 0 |
| bank | 9 | 7 | 2 | 0 |
| time | 8 | 6 | 2 | 0 |
| paymentApp | 6 | 3 | 3 | 0 |
| utr | 6 | 6 | 0 | 0 |
| suspectPhone | 5 | 5 | 0 | 0 |
| suspectUpi | 4 | 4 | 0 | 0 |
| suspectAccount | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bn | 71 | 61 | 10 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | bn | asr | wrong | 10 | bn-02 bn-04 bn-07 bn-20 bn-21 bn-24 bn-25 |
| 2 | amount | bn | asr | fn | 10 | bn-05 bn-06 bn-10 bn-11 bn-16 bn-17 bn-21 bn-37 |
| 3 | scamType | bn | asr | fn | 8 | bn-01 bn-09 bn-16 bn-18 bn-35 |
| 4 | utr | bn | asr | fn | 6 | bn-14 bn-31 bn-32 |
| 5 | bank | bn | asr | fn | 5 | bn-01 bn-16 bn-18 |
| 6 | suspectPhone | bn | asr | fn | 5 | bn-09 bn-22 bn-33 bn-39 |
| 7 | time | bn | asr | wrong | 4 | bn-03 bn-07 bn-11 bn-26 |
| 8 | suspectUpi | bn | asr | fn | 4 | bn-10 bn-34 |
| 9 | paymentApp | bn | extractor_form | fn | 3 | bn-02 bn-08 bn-20 |
| 10 | paymentApp | bn | asr | fn | 3 | bn-04 bn-08 |
| 11 | scamType | bn | extractor_form | fn | 3 | bn-05 bn-08 |
| 12 | time | bn | asr | fn | 2 | bn-04 bn-16 |
| 13 | suspectAccount | bn | asr | wrong | 2 | bn-19 |
| 14 | bank | bn | asr | wrong | 2 | bn-29 |
| 15 | bank | bn | extractor_form | fn | 1 | bn-01 |
| 16 | time | bn | extractor_form | fn | 1 | bn-01 |
| 17 | bank | bn | extractor_form | fp | 1 | bn-04 |
| 18 | time | bn | extractor_form | wrong | 1 | bn-20 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. bn-16 (story) - fails 100% of 2 runs

- Reference: আমার account থেকে 20,000 টাকা debit হয়ে গেছে, ICICI bank, এক ঘণ্টা আগে customer care এ ফোন করেছিলাম
- Transcript (`bn-16__Bashkar__r0__bn`): আমারা ক্যান থেকে কুড়ি হাজার টাকা দেবের হয়ে গেছে, এসেসি ব্যাংক এক ঘণ্টা আগে ক্যাস্টামার্কেয়ার এ ফোন করেছিলান।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 2. bn-04 (story) - fails 100% of 2 runs

- Reference: একজন বলল ভুল করে টাকা পাঠিয়ে দিয়েছে, ফেরত দিতে বলল, আমি গুগল পে দিয়ে বারো হাজার পাঁচশো টাকা পাঠিয়ে দিলাম, দুই ঘণ্টা আগে
- Transcript (`bn-04__Bashkar__r0__bn`): একজন বল্য ভুল করে টাকা পাঠিয়ে দিয়ে বল্য আমি গোগোলতে বারো হাজার পাঁচশ টাকা পাঠিয়ে দিলাম দুই ঘণটে আগে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: ঘণ্টা |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: গুগল পে |

### 3. bn-01 (story) - fails 100% of 2 runs

- Reference: আমার এসবিআই অ্যাকাউন্ট থেকে পাঁচ হাজার টাকা কেটে গেছে, দশ মিনিট আগে একজন KYC আপডেটের জন্য ফোন করেছিল
- Transcript (`bn-01__Bashkar__r0__bn`): আমার সবিআই অ্যাকাউন্ট থেকে পাঁচ হাজার তাকা কেটে গেছে দশ মিনিট আগে একজন কায়েক অপ্ডেটের জন্য ফোন করেছিল।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **extractor_form**: near-spelling variant of: এসবিআই |

### 4. bn-08 (story) - fails 100% of 2 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__Bashkar__r0__bn`): একটা ভিডিও কল এসেছিল রেকর্ড করে এখন ব্ল্যাক মেয়েল করছে পেটি এন দিয়ে পনেরো হাজার তাকা দিয়ে দিয়েছি।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **extractor_form**: near-spelling variant of: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: near-spelling variant of: পেটিএম |

### 5. bn-09 (story) - fails 100% of 2 runs

- Reference: যে নম্বর থেকে ফোন এসেছিল সেটা হল 9 8 7 6 5... 4 3 2 1 0, বলল ব্যাংক থেকে বলছি, KYC না করলে অ্যাকাউন্ট বন্ধ হয়ে যাবে
- Transcript (`bn-09__Bashkar__r0__bn`): যে নম্বর থেকে ফোন এসেছিল সেটা হোলোনয় আট স্বাচ্ছয় পাচ। চার তিন দুই একসোন্য "বল ব্যান্ড" থেকে বলছি খ্যাক না করে একাউন্স বন্ধ হয়ে যাবে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 6. bn-20 (story) - fails 100% of 2 runs

- Reference: উম্ম... মানে, গতকাল দুপুর আড়াইটায় ফোনপে থেকে দু হাজার ছশো টাকা গেছে
- Transcript (`bn-20__Bashkar__r0__bn`): উম্ম, মানে গতকাল দুপুর আড়াইটা এ ফোনতে থেকে দুহাজার শোস্ব টাকা গেছে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2600 | 2000 | 2600 | **asr**: value not in the transcript |
| time | wrong | -1d 14:30 (1290 min ago) | -1d 14:00 (1320 min ago) | -1d 14:30 (1290 min ago) | **extractor_form**: near-spelling variant of: আড়াইটায় |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: near-spelling variant of: ফোনপে |
