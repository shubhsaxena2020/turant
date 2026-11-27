# Turant pipeline eval: wbpart

Generated 2026-11-27T12:48:11.510Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 340 ASR transcripts scored, **1170 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 340 | 22.1 | 22.6 | 75.8 | 37.7 | 50.4 | 103.4 | 81.4 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 340 | 22.1 | 22.6 | 75.8 | 37.7 | 50.4 | 103.4 | 81.4 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 26.2% of clean runs and 26.2% of all runs fully correct. Per language (clean): hi 16%, en 57%, bn 5%, ta 7%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 57.3 | 26.7 | 36.4 | 36.4 |
| time | 113 | 100.0 | 100.0 | 100.0 | 60.0 | 35.2 | 44.3 | 44.3 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 95.2 | 55.1 | 69.8 | 69.8 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 96.0 | 60.0 | 73.8 | 73.8 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 35.9 | 52.8 | 52.8 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 75.0 | 13.0 | 22.2 | 22.2 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 55.6 | 22.7 | 32.3 | 32.3 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 17.1 | 29.3 | 29.3 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 11.1 | 20.0 | 20.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 42.9 | 60.0 | 60.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 75.8 | 37.7 | 50.4 | 50.4 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | 13.8 | - | 100.0 | 42.0 | 118.9 | 122.9 | 0.0 (n=16) |
| en | 100.0 | 48.3 | - | 100.0 | 74.8 | 41.7 | 27.9 | 59.3 (n=27) |
| bn | 100.0 | 5.0 | - | 100.0 | 29.0 | 164.9 | 127.9 | 0.0 (n=16) |
| ta | 100.0 | 3.3 | - | 100.0 | 25.7 | 162.2 | 91.1 | 0.0 (n=8) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 31.3 | 100.0 / 43.9 | 100.0 / 63.2 | 100.0 / 68.2 | 100.0 / - | 100.0 / - | 100.0 / 0.0 | 100.0 / - | 100.0 / - |
| en | 100.0 / 67.2 | 100.0 / 72.9 | 100.0 / 94.7 | 100.0 / 84.4 | 100.0 / 80.0 | 100.0 / 46.2 | 100.0 / 52.6 | 100.0 / 57.1 | 100.0 / 50.0 |
| bn | 100.0 / 6.6 | 100.0 / 8.2 | 100.0 / 48.3 | 100.0 / 80.8 | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / 3.8 | 100.0 / 22.7 | 100.0 / 30.8 | 100.0 / 51.4 | 100.0 / 66.7 | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 340 | 22.1 | 50.4 | 103.4 | 81.4 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 340 | 22.1 | 50.4 | 103.4 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 5.0 | 29.4 | 142.8 | 132.9 |
| bn-IN-TanishaaNeural | 40 | 5.0 | 28.6 | 187.1 | 122.9 |
| en-IN-NeerjaExpressiveNeural | 40 | 45.0 | 71.6 | 43.7 | 28.7 |
| en-IN-NeerjaNeural | 40 | 50.0 | 73.7 | 40.3 | 26.7 |
| en-IN-PrabhatNeural | 40 | 50.0 | 79.2 | 41.2 | 28.4 |
| hi-IN-MadhurNeural | 40 | 10.0 | 37.0 | 142.1 | 143.1 |
| hi-IN-SwaraNeural | 40 | 17.5 | 46.8 | 95.8 | 102.6 |
| ta-IN-PallaviNeural | 30 | 6.7 | 24.7 | 147.7 | 64.9 |
| ta-IN-ValluvarNeural | 30 | 0.0 | 26.7 | 176.7 | 117.3 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 340 | 22.1 | 50.4 | 103.4 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 198 | 100.0 | 11.1 | 50.6 |
| correction | 28 | 100.0 | 39.3 | 50.0 |
| answer | 107 | 100.0 | 36.4 | 48.5 |
| answer (skip intent) | 7 | 100.0 | 42.9 | 60.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 452 | 420 (93%) | 32 (7%) | 0 (0%) | 0 |
| clean | 452 | 420 (93%) | 32 (7%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 151 | 141 | 10 | 0 |
| time | 98 | 92 | 6 | 0 |
| scamType | 51 | 49 | 2 | 0 |
| bank | 48 | 46 | 2 | 0 |
| suspectPhone | 29 | 28 | 1 | 0 |
| paymentApp | 25 | 22 | 3 | 0 |
| utr | 21 | 17 | 4 | 0 |
| suspectUpi | 17 | 15 | 2 | 0 |
| suspectAccount | 8 | 6 | 2 | 0 |
| intent | 4 | 4 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 118 | 111 | 7 | 0 |
| en | 85 | 71 | 14 | 0 |
| bn | 132 | 131 | 1 | 0 |
| ta | 117 | 107 | 10 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | bn | asr | fn | 35 | bn-03 bn-05 bn-06 bn-07 bn-08 bn-10 bn-11 bn-12 +12 |
| 2 | amount | ta | asr | fn | 34 | ta-01 ta-02 ta-03 ta-05 ta-06 ta-07 ta-08 ta-10 +10 |
| 3 | amount | hi | asr | fn | 28 | hi-02 hi-03 hi-04 hi-05 hi-06 hi-07 hi-11 hi-12 +9 |
| 4 | time | hi | asr | fn | 23 | hi-01 hi-02 hi-04 hi-06 hi-07 hi-11 hi-12 hi-14 +5 |
| 5 | time | bn | asr | fn | 17 | bn-03 bn-07 bn-10 bn-11 bn-12 bn-13 bn-15 bn-16 +4 |
| 6 | bank | ta | asr | fn | 16 | ta-05 ta-06 ta-12 ta-13 ta-16 ta-17 ta-18 ta-21 +2 |
| 7 | time | ta | asr | fn | 15 | ta-01 ta-02 ta-04 ta-10 ta-11 ta-12 ta-13 ta-16 +2 |
| 8 | scamType | ta | asr | fn | 15 | ta-01 ta-03 ta-04 ta-05 ta-06 ta-07 ta-09 ta-16 +1 |
| 9 | scamType | hi | asr | fn | 14 | hi-01 hi-03 hi-04 hi-05 hi-06 hi-07 hi-08 hi-09 +2 |
| 10 | amount | en | asr | wrong | 14 | en-04 en-12 en-13 en-16 en-17 en-22 en-25 |
| 11 | scamType | bn | asr | fn | 14 | bn-01 bn-03 bn-04 bn-05 bn-08 bn-09 bn-16 bn-18 +1 |
| 12 | time | bn | asr | wrong | 13 | bn-02 bn-04 bn-07 bn-10 bn-11 bn-13 bn-15 bn-16 +2 |
| 13 | bank | hi | asr | fn | 12 | hi-01 hi-05 hi-06 hi-11 hi-12 hi-14 hi-18 hi-19 |
| 14 | amount | bn | asr | wrong | 11 | bn-02 bn-04 bn-11 bn-16 bn-17 bn-18 bn-21 bn-23 |
| 15 | paymentApp | hi | asr | fn | 8 | hi-02 hi-04 hi-08 hi-24 |
| 16 | suspectPhone | hi | asr | fn | 8 | hi-09 hi-16 hi-23 hi-35 |
| 17 | bank | en | asr | fn | 8 | en-02 en-10 en-14 en-22 |
| 18 | suspectPhone | en | asr | fn | 8 | en-06 en-07 en-15 en-20 |
| 19 | bank | bn | asr | fn | 8 | bn-01 bn-06 bn-12 bn-13 bn-16 bn-29 |
| 20 | paymentApp | bn | asr | fn | 8 | bn-02 bn-04 bn-08 bn-20 |
| 21 | suspectPhone | bn | asr | fn | 8 | bn-09 bn-22 bn-33 bn-39 |
| 22 | time | en | asr | fn | 7 | en-02 en-04 en-22 en-28 |
| 23 | amount | en | asr | fn | 7 | en-13 en-16 en-18 en-25 |
| 24 | amount | ta | asr | wrong | 7 | ta-04 ta-11 ta-16 ta-25 |
| 25 | time | ta | asr | wrong | 7 | ta-07 ta-20 ta-26 ta-28 |
| 26 | utr | hi | asr | fn | 6 | hi-15 hi-33 hi-34 |
| 27 | time | en | asr | wrong | 6 | en-13 en-16 |
| 28 | utr | bn | asr | fn | 6 | bn-14 bn-31 bn-32 |
| 29 | amount | hi | asr | wrong | 5 | hi-07 hi-14 hi-22 hi-24 hi-27 |
| 30 | paymentApp | en | asr | fn | 5 | en-04 en-05 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. hi-04 (story) - fails 100% of 2 runs

- Reference: उम्म... मतलब, एक आदमी ने बोला गलती से पैसे भेज दिए, वापस भेजो, तो मैंने गूगल पे से बारह हज़ार पाँच सौ रुपये भेज दिए, ये दो घंटे पहले की बात है
- Transcript (`hi-04__Madhur__r0__hi`): اُمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَتْمَ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12500 | - | 12500 | **asr**: value not in the transcript |
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: दो घंटे पहले |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: वापस भेजो, |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: गूगल पे |

### 2. hi-18 (story) - fails 100% of 2 runs

- Reference: सुबह ग्यारह बजे एक कॉल आया, बोला आपके क्रेडिट कार्ड के रिवॉर्ड पॉइंट हैं, ओटीपी बताओ, मैंने बता दिया और तीस हज़ार रुपये कट गए एक्सिस बैंक से
- Transcript (`hi-18__Madhur__r0__hi`): سبح جارہ بجے ایک کول آیا بولہ آپ کے قردٹ کارڈ کے روڑ் پوٹھ ہیں پوٹھ بٹاہوں میں نے باتا دیا اور 30 000 روپائکٹ گئے ایکسیس بنک سے

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 30000 | - | 30000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: ग्यारह बजे |
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: ओटीपी |
| bank | fn | Axis Bank | - | Axis Bank | **asr**: ASR lost/changed: एक्सिस |

### 3. en-04 (story) - fails 100% of 3 runs

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__Neerja__r0__en`): The price of the phone is Rs. 5,000.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 6000 | 5000 | 6000 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: abhi |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 4. bn-04 (story) - fails 100% of 2 runs

- Reference: একজন বলল ভুল করে টাকা পাঠিয়ে দিয়েছে, ফেরত দিতে বলল, আমি গুগল পে দিয়ে বারো হাজার পাঁচশো টাকা পাঠিয়ে দিলাম, দুই ঘণ্টা আগে
- Transcript (`bn-04__Bashkar__r0__bn`): Agnbullu Bhulkure Taqapati Adiyashe, Ferdite Bullu, Amibhul-Tedyebharo Hajaar Patshutaka Pathe Dilem, Dui Ghanta Aghe

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12500 | 1000 | 12500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 09:00 (180 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: দুই ঘণ্টা আগে |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: ভুল করে |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: গুগল পে |

### 5. bn-16 (story) - fails 100% of 2 runs

- Reference: আমার account থেকে 20,000 টাকা debit হয়ে গেছে, ICICI bank, এক ঘণ্টা আগে customer care এ ফোন করেছিলাম
- Transcript (`bn-16__Bashkar__r0__bn`): Amaraqantke kuli hajataka debit huyagatze, SSBAK, Aghantarage Customarker ePhone kuratilam.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | wrong | today 11:00 (60 min ago) | today 09:00 (180 min ago) | today 11:00 (60 min ago) | **asr**: ASR lost/changed: ঘণ্টা আগে |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 6. ta-10 (story) - fails 100% of 2 runs

- Reference: UPI ID rahul dot kyc at ybl க்கு எட்டாயிரம் ரூபாய் அனுப்பினேன், இருபது நிமிஷத்துக்கு முன்னாடி
- Transcript (`ta-10__Pallavi__r0__ta`): 'UPIDRAHUL.KYC' 'AdvYPL''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: நிமிஷத்துக்கு |
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 7. ta-16 (story) - fails 100% of 2 runs

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__Pallavi__r0__ta`): என்னை இருந்து 20 20-25 Rs, IIT, ICI Bank, 1 மண்ணாடி காஷ்டமாக குக்காள் பாணேன்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 20000 | 25 | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: நேரத்துக்கு |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 8. en-02 (story) - fails 100% of 3 runs

- Reference: Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai
- Transcript (`en-02__Neerja__r0__en`): The Miura account has been cut from Rs. 5000. First, I have updated the VIC of the Admi Nebola account.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: minute pehle |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 9. hi-02 (story) - fails 100% of 2 runs

- Reference: भैया जल्दी करो, मेरे पैसे चले गए... साढ़े तीन हज़ार रुपये, फोनपे से गए हैं, अभी अभी हुआ
- Transcript (`hi-02__Madhur__r0__hi`): بھیا جلدی کرو میرے پیسے چلے گئے۔ ساڑے 3 000 روپے فون پے سے گئے ہیں ابھی ابھی ہوا۔

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 3500 | - | 3500 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: अभी |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: फोनपे |

### 10. hi-06 (story) - fails 100% of 2 runs

- Reference: टेलीग्राम पे टास्क वाला पार्ट टाइम जॉब था, पहले थोड़ा पैसा मिला फिर मैंने सैंतालीस हज़ार रुपये इन्वेस्ट कर दिए, परसों की बात है, कोटक बैंक से
- Transcript (`hi-06__Madhur__r0__hi`): ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک ٹھیک

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 47000 | - | 47000 | **asr**: value not in the transcript |
| time | fn | -2d 12:00 (2880 min ago) | - | -2d 12:00 (2880 min ago) | **asr**: ASR lost/changed: परसों |
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: इन्वेस्ट |
| bank | fn | Kotak Mahindra Bank | - | Kotak Mahindra Bank | **asr**: ASR lost/changed: कोटक |

### 11. hi-11 (story) - fails 100% of 2 runs

- Reference: डेढ़ लाख रुपये गए हैं मेरे, बैंक ऑफ बड़ौदा का अकाउंट है, कल रात दस बजे
- Transcript (`hi-11__Madhur__r0__hi`): دید لاخروبائے ہیں میری بینک آف بڑا کا ایکنٹ ہے کل رات دس بجی۔

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |
| time | fn | -1d 22:00 (840 min ago) | - | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: रात |
| bank | fn | Bank of Baroda | - | Bank of Baroda | **asr**: ASR lost/changed: बड़ौदा |

### 12. en-13 (story) - fails 100% of 3 runs

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__Neerja__r0__en`): Yesterday night Saturday 9th, someone called the Bill pending the Bill of Bajali. The link is clicked and the Rs.9,000,000 NINYAM will be cut.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 9999 | 9000000 | 9999 | **asr**: value not in the transcript |
| time | wrong | -1d 21:30 (870 min ago) | -1d 22:00 (840 min ago) | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: raat saade baje |

### 13. en-16 (story) - fails 100% of 3 runs

- Reference: Aaj subah 10 baje ek message aaya, QR scan karne ko bola, scan kiya aur dhai hazaar rupaye chale gaye
- Transcript (`en-16__Neerja__r0__en`): Today, at 10 PM, a message came to us to scan QR codes and the price of Rs. 2,000.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 2000 | 2500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 22:00 (-600 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: baje |

### 14. en-19 (story) - fails 100% of 3 runs

- Reference: The UPI ID was sharma123 at paytm, I sent him three thousand five hundred
- Transcript (`en-19__Neerja__r0__en`): The UPI ID was Sharma 123 at PTM. I sent him 3,500.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 123 | 3500 | **extractor_form**: value is in the transcript but not parsed |
| suspectUpi | fn | sharma123@paytm | - | sharma123@paytm | **asr**: value not in the transcript |

### 15. bn-02 (story) - fails 100% of 2 runs

- Reference: দাদা তাড়াতাড়ি, আমার স্টেট ব্যাংক থেকে সাড়ে তিন হাজার টাকা চলে গেছে, ফোনপে দিয়ে, এইমাত্র
- Transcript (`bn-02__Bashkar__r0__bn`): Dada Tara Taadi Ama State Bank Thik Eshar 3,000 Taka Chole Gace, Phone PDA, A-Matro

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 3000 | 3500 | **asr**: value not in the transcript |
| time | wrong | today 12:00 (0 min ago) | today 09:00 (180 min ago) | today 12:00 (0 min ago) | **asr**: ASR lost/changed: এইমাত্র |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: ফোনপে |

### 16. bn-08 (story) - fails 100% of 2 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__Bashkar__r0__bn`): اپنے بیدیو کال ایشتیلو ریکرد کرے ایکن بلاک مل کر چے پیتی اندی اپنے رو حجاکتا کا دیدیت چی

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: পেটিএম |

### 17. bn-10 (story) - fails 100% of 2 runs

- Reference: আমি UPI ID rahul dot kyc at ybl এ আট হাজার টাকা পাঠিয়েছি, কুড়ি মিনিট আগে
- Transcript (`bn-10__Bashkar__r0__bn`): Amirpai Adrahul.ca.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | wrong | today 11:40 (20 min ago) | today 09:00 (180 min ago) | today 11:40 (20 min ago) | **asr**: ASR lost/changed: মিনিট আগে |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 18. bn-12 (story) - fails 100% of 2 runs

- Reference: আড়াই হাজার টাকা কেটেছে, আধ ঘণ্টা আগে, কানাড়া ব্যাংক
- Transcript (`bn-12__Bashkar__r0__bn`): آرای حجر تاکہ کتیچھے آد گھونٹ آگی کنارہ بیک

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2500 | - | 2500 | **asr**: value not in the transcript |
| time | fn | today 11:30 (30 min ago) | - | today 11:30 (30 min ago) | **asr**: ASR lost/changed: আধ ঘণ্টা আগে, |
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: কানাড়া |

### 19. ta-03 (story) - fails 100% of 2 runs

- Reference: நேத்து சாயங்காலம் 7 மணிக்கு கஸ்டமர் கேர்ல இருந்து கால் வந்தது, AnyDesk இன்ஸ்டால் பண்ண சொன்னாங்க, அப்புறம் HDFC அக்கவுண்ட்ல இருந்து இரண்டு லட்சம் ரூபாய் எடுத்துட்டாங்க
- Transcript (`ta-03__Pallavi__r0__ta`): நேற்று சாயங்களாம் 28 மனைக்கு கத்தமர் கேட்டு இருந்து கால் வந்தது, என்னிடு சக் கண்ஸ்டால் சொன்னாங்கள் அப்புரம் HDFC அக்கவும்லு இருந்து இருந்து இருந்துல்லைத்தும் ருபாய் கடுத்துக்கொண்டாங்கள்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **extractor_form**: near-spelling variant of: சாயங்காலம் |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 20. ta-07 (story) - fails 100% of 2 runs

- Reference: ஒரு QR code அனுப்பி ஸ்கேன் பண்ணா பணம் வரும்னு சொன்னாங்க, ஸ்கேன் பண்ணதும் ₹4,999 போச்சு, இன்று காலை 10 மணிக்கு
- Transcript (`ta-07__Pallavi__r0__ta`): ஒரு கிவார் கோட அனுப்பிஷ்கேன் பண்ணா பணம் பரும்பு சொன்னாங்கள். சகேன் பண்ணதம் நான் காயரத்துல் தொடலாயரத்து தொன்னும் சொன்பது ருவாய் போதுக்கும் இந்த காலை பார்த்து மனைக்கும்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 09:00 (180 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 மணிக்கு |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ஸ்கேன் |

### 21. ta-12 (story) - fails 100% of 2 runs

- Reference: இரண்டாயிரத்து ஐநூறு ரூபாய் கட் ஆயிடுச்சு, அரை மணி நேரத்துக்கு முன்னாடி, இந்தியன் வங்கி
- Transcript (`ta-12__Pallavi__r0__ta`): இரண்டாயர்த்து அனுவரு ருபாய் கட்டாயிடைத்து ஏறை மனினேர்த்துக்கும் முன்னாடி இந்த வங்கி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2500 | - | 2500 | **asr**: value not in the transcript |
| time | fn | today 11:30 (30 min ago) | - | today 11:30 (30 min ago) | **asr**: ASR lost/changed: அரை நேரத்துக்கு |
| bank | fn | Indian Bank | - | Indian Bank | **asr**: ASR lost/changed: இந்தியன் |

### 22. ta-18 (story) - fails 100% of 2 runs

- Reference: இரண்டரை லட்சம் ரூபாய் முதலீடு பண்ண சொல்லி வாங்கிட்டாங்க, பணம் டபுள் ஆகும்னு சொன்னாங்க, யெஸ் பேங்க்
- Transcript (`ta-18__Pallavi__r0__ta`): இரண்டரை Lacham Roobhai, முதலியில் பண்ணா சொல்லி வாங்கிவிட்டாங்கள். பணம் தபுள் அகும்னும் சொன்னார்கள்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: முதலீடு |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: யெஸ் பேங்க் |

### 23. hi-01 (story) - fails 100% of 2 runs

- Reference: मेरे अकाउंट से पाँच हज़ार रुपये कट गए, दस मिनट पहले एक आदमी ने बोला केवाईसी अपडेट करो, एसबीआई का अकाउंट है
- Transcript (`hi-01__Madhur__r0__hi`): میرے акounth سے 5000 rupee cut gai 10 minp aadmi ne bula ke vaisi update karo sbi ka account hai

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: मिनट पहले |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: केवाईसी |

### 24. en-17 (story) - fails 100% of 3 runs

- Reference: Do lakh pachas hazaar rupaye invest karwaye trading app mein, bola paisa double hoga, Yes Bank se gaye
- Transcript (`en-17__Neerja__r0__en`): 2 lakh purchase of Rs. 5000 invested in the trading app will double the amount of money. Yes, banks have gone.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 5000 | 250000 | **asr**: value not in the transcript |
| time | fp | - | today 09:00 (180 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
