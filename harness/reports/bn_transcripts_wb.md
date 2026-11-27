# Turant pipeline eval: bn_transcripts_wb

Generated 2026-11-27T18:22:51.439Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 80 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 80 | 5.0 | 5.0 | 66.7 | 19.8 | 30.5 | 164.9 | 127.9 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 80 | 5.0 | 5.0 | 66.7 | 19.8 | 30.5 | 164.9 | 127.9 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 5.0% of clean runs and 5.0% of all runs fully correct. Per language (clean): hi -%, en -%, bn 5%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 15.4 | 4.2 | 6.6 | 6.6 |
| time | 113 | 100.0 | 100.0 | 100.0 | 33.3 | 6.3 | 10.5 | 10.5 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 31.8 | 48.3 | 48.3 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 95.5 | 70.0 | 80.8 | 80.8 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 66.7 | 19.8 | 30.5 | 30.5 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | 5.0 | - | 100.0 | 30.5 | 164.9 | 127.9 | 0.0 (n=16) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / 6.6 | 100.0 / 10.5 | 100.0 / 48.3 | 100.0 / 80.8 | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 80 | 5.0 | 30.5 | 164.9 | 127.9 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 5.0 | 30.5 | 164.9 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 5.0 | 31.4 | 142.8 | 132.9 |
| bn-IN-TanishaaNeural | 40 | 5.0 | 29.6 | 187.1 | 122.9 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 5.0 | 30.5 | 164.9 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 44 | 100.0 | 0.0 | 34.1 |
| answer | 26 | 100.0 | 11.5 | 17.6 |
| answer (skip intent) | 2 | 100.0 | 0.0 | - |
| correction | 8 | 100.0 | 12.5 | 20.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 130 | 129 (99%) | 1 (1%) | 0 (0%) | 0 |
| clean | 130 | 129 (99%) | 1 (1%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 46 | 46 | 0 | 0 |
| time | 30 | 30 | 0 | 0 |
| scamType | 15 | 14 | 1 | 0 |
| bank | 9 | 9 | 0 | 0 |
| paymentApp | 8 | 8 | 0 | 0 |
| suspectPhone | 8 | 8 | 0 | 0 |
| utr | 6 | 6 | 0 | 0 |
| suspectUpi | 4 | 4 | 0 | 0 |
| suspectAccount | 2 | 2 | 0 | 0 |
| intent | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bn | 130 | 129 | 1 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | bn | asr | fn | 35 | bn-03 bn-05 bn-06 bn-07 bn-08 bn-10 bn-11 bn-12 +12 |
| 2 | time | bn | asr | fn | 26 | bn-02 bn-03 bn-04 bn-07 bn-10 bn-11 bn-12 bn-13 +7 |
| 3 | scamType | bn | asr | fn | 14 | bn-01 bn-03 bn-04 bn-05 bn-08 bn-09 bn-16 bn-18 +1 |
| 4 | amount | bn | asr | wrong | 11 | bn-02 bn-04 bn-11 bn-16 bn-17 bn-18 bn-21 bn-23 |
| 5 | bank | bn | asr | fn | 8 | bn-01 bn-06 bn-12 bn-13 bn-16 bn-29 |
| 6 | paymentApp | bn | asr | fn | 8 | bn-02 bn-04 bn-08 bn-20 |
| 7 | suspectPhone | bn | asr | fn | 8 | bn-09 bn-22 bn-33 bn-39 |
| 8 | utr | bn | asr | fn | 6 | bn-14 bn-31 bn-32 |
| 9 | time | bn | asr | wrong | 4 | bn-07 bn-15 bn-26 bn-28 |
| 10 | suspectUpi | bn | asr | fn | 4 | bn-10 bn-34 |
| 11 | suspectAccount | bn | asr | fn | 2 | bn-19 |
| 12 | intent | bn | asr | fn | 2 | bn-36 |
| 13 | scamType | bn | extractor_form | fn | 1 | bn-16 |
| 14 | bank | bn | asr | wrong | 1 | bn-38 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. bn-04 (story) - fails 100% of 2 runs

- Reference: একজন বলল ভুল করে টাকা পাঠিয়ে দিয়েছে, ফেরত দিতে বলল, আমি গুগল পে দিয়ে বারো হাজার পাঁচশো টাকা পাঠিয়ে দিলাম, দুই ঘণ্টা আগে
- Transcript (`bn-04__Bashkar__r0__bn`): Agnbullu Bhulkure Taqapati Adiyashe, Ferdite Bullu, Amibhul-Tedyebharo Hajaar Patshutaka Pathe Dilem, Dui Ghanta Aghe

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12500 | 1000 | 12500 | **asr**: value not in the transcript |
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: দুই ঘণ্টা আগে |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: ভুল করে |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: গুগল পে |

### 2. bn-16 (story) - fails 100% of 2 runs

- Reference: আমার account থেকে 20,000 টাকা debit হয়ে গেছে, ICICI bank, এক ঘণ্টা আগে customer care এ ফোন করেছিলাম
- Transcript (`bn-16__Bashkar__r0__bn`): Amaraqantke kuli hajataka debit huyagatze, SSBAK, Aghantarage Customarker ePhone kuratilam.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: ঘণ্টা আগে |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 3. bn-02 (story) - fails 100% of 2 runs

- Reference: দাদা তাড়াতাড়ি, আমার স্টেট ব্যাংক থেকে সাড়ে তিন হাজার টাকা চলে গেছে, ফোনপে দিয়ে, এইমাত্র
- Transcript (`bn-02__Bashkar__r0__bn`): Dada Tara Taadi Ama State Bank Thik Eshar 3,000 Taka Chole Gace, Phone PDA, A-Matro

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 3000 | 3500 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: এইমাত্র |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: ফোনপে |

### 4. bn-08 (story) - fails 100% of 2 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__Bashkar__r0__bn`): اپنے بیدیو کال ایشتیلو ریکرد کرے ایکن بلاک مل کر چے پیتی اندی اپنے رو حجاکتا کا دیدیت چی

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: পেটিএম |

### 5. bn-10 (story) - fails 100% of 2 runs

- Reference: আমি UPI ID rahul dot kyc at ybl এ আট হাজার টাকা পাঠিয়েছি, কুড়ি মিনিট আগে
- Transcript (`bn-10__Bashkar__r0__bn`): Amirpai Adrahul.ca.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: মিনিট আগে |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 6. bn-12 (story) - fails 100% of 2 runs

- Reference: আড়াই হাজার টাকা কেটেছে, আধ ঘণ্টা আগে, কানাড়া ব্যাংক
- Transcript (`bn-12__Bashkar__r0__bn`): آرای حجر تاکہ کتیچھے آد گھونٹ آگی کنارہ بیک

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2500 | - | 2500 | **asr**: value not in the transcript |
| time | fn | today 11:30 (30 min ago) | - | today 11:30 (30 min ago) | **asr**: ASR lost/changed: আধ ঘণ্টা আগে, |
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: কানাড়া |
