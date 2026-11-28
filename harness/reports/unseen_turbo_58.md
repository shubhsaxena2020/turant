# Turant pipeline eval: unseen_turbo_58

Generated 2026-11-28T02:36:03.791Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 1116 ASR transcripts scored, **4 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 0 | - | - | - | - | - | - | - |
| ASR noise 15 dB | 279 | 44.4 | 44.4 | 87.7 | 62.8 | 73.2 | 69.7 | 36.8 |
| ASR noise 5 dB | 279 | 34.4 | 34.8 | 85.4 | 51.7 | 64.4 | 71.6 | 46.3 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 1116 | 43.3 | 43.4 | 86.8 | 61.2 | 71.8 | 67.8 | 39.0 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): -% of clean runs and 45.7% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | - | - | - | 60.2 |
| time | 113 | 100.0 | 100.0 | 100.0 | - | - | - | 72.0 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | - | - | - | 81.5 |
| bank | 97 | 100.0 | 100.0 | 100.0 | - | - | - | 86.4 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 90.0 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | - | - | 69.4 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | 54.9 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 53.8 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 38.5 |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 60.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | - | - | - | 71.8 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | 55.0 | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | 62.5 | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | 15.4 | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | 22.5 | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | 17.5 | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | 47.5 | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | 20.0 | 100.0 | - | - | - | - (n=0) |

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
| babble 15 dB | 85 | 48.2 | 77.3 | 53.9 | 29.5 |
| babble 5 dB | 85 | 32.9 | 64.3 | 67.0 | 48.2 |
| clean | 558 | 47.1 | 74.4 | 65.0 | 36.5 |
| pink 15 dB | 87 | 46.0 | 75.8 | 82.8 | 46.5 |
| pink 5 dB | 87 | 28.7 | 61.1 | 75.3 | 56.7 |
| traffic 15 dB | 107 | 40.2 | 67.6 | 73.1 | 35.4 |
| traffic 5 dB | 107 | 40.2 | 66.9 | 72.5 | 36.5 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 558 | 47.1 | 74.4 | 65.0 |
| 15 dB | 279 | 44.4 | 73.2 | 69.7 |
| 5 dB | 279 | 34.4 | 64.4 | 71.6 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 558 | 47.1 | 74.4 | 65.0 |

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
| all forced-language runs | 901 | 828 (92%) | 73 (8%) | 0 (0%) | 0 |
| clean | 405 | 363 (90%) | 42 (10%) | 0 (0%) | 0 |
| 5 dB | 280 | 264 (94%) | 16 (6%) | 0 (0%) | 0 |
| 15 dB | 216 | 201 (93%) | 15 (7%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 339 | 318 | 21 | 0 |
| time | 158 | 144 | 14 | 0 |
| scamType | 104 | 91 | 13 | 0 |
| bank | 92 | 89 | 3 | 0 |
| suspectPhone | 73 | 71 | 2 | 0 |
| suspectUpi | 39 | 31 | 8 | 0 |
| utr | 37 | 30 | 7 | 0 |
| suspectAccount | 22 | 22 | 0 | 0 |
| paymentApp | 21 | 18 | 3 | 0 |
| intent | 16 | 14 | 2 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 51 | 45 | 6 | 0 |
| en | 95 | 86 | 9 | 0 |
| bn | 194 | 183 | 11 | 0 |
| ta | 178 | 168 | 10 | 0 |
| te | 141 | 123 | 18 | 0 |
| mr | 87 | 73 | 14 | 0 |
| kn | 155 | 150 | 5 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | ta | asr | fn | 58 | ta-03 ta-04 ta-05 ta-06 ta-07 ta-10 ta-11 ta-13 +10 |
| 2 | amount | kn | asr | fn | 54 | kn-02 kn-03 kn-06 kn-08 kn-10 kn-11 kn-12 kn-13 +15 |
| 3 | amount | bn | asr | fn | 37 | bn-05 bn-06 bn-08 bn-10 bn-12 bn-13 bn-18 bn-23 +8 |
| 4 | amount | te | asr | fn | 27 | te-07 te-11 te-12 te-14 te-16 te-18 te-21 te-23 +6 |
| 5 | amount | en | asr | fn | 26 | en-02 en-04 en-12 en-13 en-16 en-17 en-25 en-37 |
| 6 | bank | bn | asr | fn | 26 | bn-01 bn-02 bn-03 bn-13 bn-18 bn-21 bn-29 bn-38 +1 |
| 7 | time | bn | asr | wrong | 22 | bn-03 bn-04 bn-07 bn-11 bn-26 bn-28 bn-40 bn-10 |
| 8 | scamType | bn | asr | fn | 22 | bn-03 bn-07 bn-08 bn-09 bn-16 bn-35 bn-18 |
| 9 | amount | bn | asr | wrong | 21 | bn-02 bn-04 bn-07 bn-13 bn-14 bn-20 bn-21 bn-24 +1 |
| 10 | amount | ta | asr | wrong | 21 | ta-01 ta-04 ta-06 ta-12 ta-15 ta-20 ta-21 ta-24 +2 |
| 11 | bank | ta | asr | fn | 19 | ta-01 ta-12 ta-13 ta-18 ta-21 ta-30 ta-38 ta-06 |
| 12 | bank | kn | asr | fn | 18 | kn-16 kn-18 kn-21 kn-30 kn-06 kn-12 kn-13 kn-17 |
| 13 | time | te | asr | fn | 17 | te-13 te-16 te-27 te-01 te-07 te-10 te-15 te-28 |
| 14 | scamType | ta | asr | fn | 15 | ta-01 ta-03 ta-05 ta-16 ta-06 |
| 15 | suspectPhone | ta | asr | fn | 15 | ta-09 ta-22 ta-33 ta-39 |
| 16 | suspectPhone | te | asr | fn | 15 | te-09 te-22 te-33 te-39 |
| 17 | suspectPhone | bn | asr | fn | 14 | bn-09 bn-22 bn-33 bn-39 |
| 18 | scamType | mr | asr | fn | 14 | mr-08 mr-16 mr-18 mr-35 mr-01 mr-03 |
| 19 | amount | hi | asr | wrong | 13 | hi-02 hi-03 hi-24 hi-17 hi-39 |
| 20 | time | bn | asr | fn | 13 | bn-02 bn-10 bn-11 bn-12 bn-27 bn-13 bn-28 |
| 21 | amount | te | asr | wrong | 13 | te-04 te-21 te-24 te-25 te-05 te-06 |
| 22 | time | kn | asr | fn | 13 | kn-13 kn-16 kn-01 kn-02 kn-07 kn-15 kn-26 kn-28 +1 |
| 23 | time | en | asr | fn | 12 | en-02 en-04 en-13 en-16 |
| 24 | time | ta | asr | fn | 12 | ta-02 ta-04 ta-07 ta-10 ta-13 ta-16 |
| 25 | scamType | te | asr | fn | 12 | te-05 te-08 te-16 te-04 te-07 te-09 |
| 26 | amount | mr | asr | wrong | 11 | mr-04 mr-06 mr-11 mr-18 |
| 27 | time | mr | asr | wrong | 11 | mr-07 mr-15 mr-26 mr-28 |
| 28 | scamType | kn | asr | fn | 11 | kn-05 kn-07 kn-16 kn-01 kn-08 kn-35 |
| 29 | time | hi | asr | wrong | 10 | hi-07 hi-24 hi-28 hi-30 |
| 30 | bank | te | asr | fn | 10 | te-16 te-18 te-30 te-13 te-38 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. kn-16 (story) - fails 100% of 4 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__GiuseppeMultilingual__r0__kn`): ನನ್ನ ಅಕಾಂಟ್ಟ ಇಂದ ಇಪ್ಪತ್ತು ಸಾವಿರ್ ರುಪಿಸ್ ದೇಬಿಟ್ ಆಯತು, ಆಯಿಸಿಯಿಯಾಯಿಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾಯಾ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: ಗಂಟೆ ಹಿಂದೆ |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 2. en-02 (story) - fails 100% of 4 runs

- Reference: Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai
- Transcript (`en-02__GiuseppeMultilingual__r0__en`): My account is a punch. I'll see you later. I'll see you later. SBIK Count High.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: minute pehle |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **extractor_form**: key words survive (SBI) but the extractor fails |

### 3. en-04 (story) - fails 100% of 4 runs

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__GiuseppeMultilingual__r0__en`): Baya Punk Nahi Nahi CHS Hazaru Pai Gei Hai, FOMPSE, ABYABY

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: abhi |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 4. bn-10 (story) - fails 100% of 4 runs

- Reference: আমি UPI ID rahul dot kyc at ybl এ আট হাজার টাকা পাঠিয়েছি, কুড়ি মিনিট আগে
- Transcript (`bn-10__GiuseppeMultilingual__r0__bn`): আমি উপি এড রেহোল দওট খিক এট ইবল এ আথাজা টাকা পাথয়াচি, কুদি মিনি তাগে?

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: আগে |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 5. kn-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl ಗೆ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ, ಇಪ್ಪತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ
- Transcript (`kn-10__GiuseppeMultilingual__r0__kn`): UPIID Rahul.kyc at YBLG n-to-savir-roo-pāyī ಕಳುಯಸಿದೆ. 20 ನಿಮಿಷಗಳಾ ಹಿಂದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **extractor_form**: value is in the transcript but not parsed |

### 6. en-16 (story) - fails 100% of 4 runs

- Reference: Aaj subah 10 baje ek message aaya, QR scan karne ko bola, scan kiya aur dhai hazaar rupaye chale gaye
- Transcript (`en-16__GiuseppeMultilingual__r0__en`): Aaj Suba Ten Baya Ek Mesejaya QR Scan Karn Keo Bola, Scan Kea or Dai Hazaru Pechail Gay.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2500 | - | 2500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 12:00 (0 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: baje |

### 7. bn-08 (story) - fails 100% of 4 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__GiuseppeMultilingual__r0__bn`): একটা ঵িডিয় কালেশে ছিলো রেকোর্ড করে এখন ব্লাক্মিল করছে পেটিয় দিয় পনের হাজার টাকা দিয়েছে

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: পেটিএম |

### 8. te-16 (story) - fails 100% of 4 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__GiuseppeMultilingual__r0__te`): నా అకాంత్ నుండి ఇరవై వేలు రుపీస్ దేబిట ఆయ్ పోయాయి. ICICI బాంక్ ఒక గంటకృతమ కస్టుమాకేయకి కాల్ చేసాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: క్రితం |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |

### 9. bn-07 (story) - fails 100% of 4 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__RemyMultilingual__r0__bn`): একটা ক্য়ার কোড পাথিএ বল্ল সকেন কোরুন টাকা পাবেন সকেন কোর্তেই চার হাজার নিরান বি টাকা কেটে গেলো আজ শকাল সারে দোস্টাই

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4000 | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: সাড়ে দশটায় |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: স্ক্যান |

### 10. bn-18 (story) - fails 100% of 4 runs

- Reference: দুই লাখ পঞ্চাশ হাজার টাকা ইনভেস্টমেন্টের নামে নিয়ে নিয়েছে, বলেছিল টাকা ডাবল হবে, ইয়েস ব্যাংক
- Transcript (`bn-18__GiuseppeMultilingual__r0__bn`): দুই লাক পনচাশ হাজাড টাকা ইন্্য়েন ইনিয়েছে, বলেছিলো টাকা ডাভল হবে, ইএস বাংগ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: ইয়েস ব্যাংক |

### 11. ta-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl க்கு எட்டாயிரம் ரூபாய் அனுப்பினேன், இருபது நிமிஷத்துக்கு முன்னாடி
- Transcript (`ta-10__GiuseppeMultilingual__r0__ta`): UPI ID Rahul.KYC at YBL कு 820.0.20.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: நிமிஷத்துக்கு |

### 12. bn-02 (story) - fails 100% of 4 runs

- Reference: দাদা তাড়াতাড়ি, আমার স্টেট ব্যাংক থেকে সাড়ে তিন হাজার টাকা চলে গেছে, ফোনপে দিয়ে, এইমাত্র
- Transcript (`bn-02__GiuseppeMultilingual__r0__bn`): দাদা তারা তাডি অমার স্টেট বেক থেকে সাডে তিন হজা টাকা চোলেগাছে ফোন পে দিয়ে এই মাত্র।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 3.5 | 3500 | **asr**: value not in the transcript |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: ব্যাংক |

### 13. bn-03 (story) - fails 100% of 4 runs

- Reference: গতকাল সন্ধ্যা সাতটায় কাস্টমার কেয়ার থেকে ফোন এসেছিল, AnyDesk ইনস্টল করতে বলল, তারপর এইচডিএফসি অ্যাকাউন্ট থেকে দুই লাখ টাকা কেটে নিল
- Transcript (`bn-03__RemyMultilingual__r0__bn`): গতকাল সন্দা সাত্টে কাস্টমার কেয়ার থেকে ফান এশে ছিলো এনে দেস্ক ইন্সটল করতে বল্লো তার পর এইস টি এফসি একান থেকে দুই লাক টাকা কেটে নিল

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: এইচডিএফসি |

### 14. ta-01 (story) - fails 100% of 4 runs

- Reference: என் SBI கணக்கிலிருந்து 5000 ரூபாய் போய்விட்டது, 10 நிமிடங்களுக்கு முன்பு ஒருவர் KYC அப்டேட் செய்யச் சொன்னார்
- Transcript (`ta-01__RemyMultilingual__r0__ta`): என் SBI கணக்கிலிருந்து 5 ரூபாய் போய்விட்டது 10 நிமிடங்களுக்கு முன்பு ஒருவர் கேவாயசி அப்டே செய்யத் சொன்னார்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 5 | 5000 | **asr**: value not in the transcript |

### 15. ta-07 (story) - fails 100% of 4 runs

- Reference: ஒரு QR code அனுப்பி ஸ்கேன் பண்ணா பணம் வரும்னு சொன்னாங்க, ஸ்கேன் பண்ணதும் ₹4,999 போச்சு, இன்று காலை 10 மணிக்கு
- Transcript (`ta-07__RemyMultilingual__r0__ta`): ஒருக்கிவார் கோத் அனுப்பி ச்கேன் பண்ணா பணம் பரும்னு சொன்னாங்க, ச்கேன் பண்ணதும் 4.3.9.9.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.5.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 மணிக்கு |
| scamType | fn | qr_scan | - | qr_scan | **extractor_form**: near-spelling variant of: ஸ்கேன் |

### 16. ta-16 (story) - fails 100% of 4 runs

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__GiuseppeMultilingual__r0__ta`): என அக்கான்டில் இருந்து 25 ருபிஸ் தெபிட் ஆயிடுச்சு ICICI Bank, ஒருமனி நெரத்துக்கு முனாடி கस்டுமர் கேயக்கு கால்ப்பன்னேன்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |

### 17. en-13 (story) - fails 100% of 4 runs

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__RemyMultilingual__r0__en`): The link is in the description below. Click the link below.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9999 | **asr**: value not in the transcript |
| time | fn | -1d 21:30 (870 min ago) | - | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: raat saade nau baje |

### 18. en-19 (story) - fails 100% of 4 runs

- Reference: The UPI ID was sharma123 at paytm, I sent him three thousand five hundred
- Transcript (`en-19__RemyMultilingual__r0__en`): The UPIID was Sharma 123 at Paytum. I sent him 3,500.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 123 | 3500 | **extractor_form**: value is in the transcript but not parsed |
| suspectUpi | fn | sharma123@paytm | - | sharma123@paytm | **asr**: value not in the transcript |

### 19. ta-03 (story) - fails 100% of 4 runs

- Reference: நேத்து சாயங்காலம் 7 மணிக்கு கஸ்டமர் கேர்ல இருந்து கால் வந்தது, AnyDesk இன்ஸ்டால் பண்ண சொன்னாங்க, அப்புறம் HDFC அக்கவுண்ட்ல இருந்து இரண்டு லட்சம் ரூபாய் எடுத்துட்டாங்க
- Transcript (`ta-03__RemyMultilingual__r0__ta`): நேத்து சாயங்காலம் ஏழு மனிக்கு கस்டமர் கேரில் இருந்து கால் வந்தது, எனிடஸ்க இன்ஸ்டால் பண்ண சொன்னாங்க, அப்புரம் HDFC அக்கவுண்லை இருந்து இரண்டுலச்சம் ரூபாய் எடுத்துட்டாங்க.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 20. ta-04 (story) - fails 100% of 4 runs

- Reference: ஒருத்தர் தவறுதலாக பணம் அனுப்பிட்டேன்னு சொல்லி திருப்பி அனுப்ப சொன்னார், நான் கூகுள் பே மூலமா பன்னிரண்டாயிரத்து ஐநூறு ரூபாய் அனுப்பிட்டேன், இரண்டு மணி நேரத்துக்கு முன்னாடி
- Transcript (`ta-04__GiuseppeMultilingual__r0__ta`): உருத்தர் தவர்தலாக பணம் அனுப்பிட்டேன் சொல்லி திருப்பி அனுப்ப சொன்னார் நான் கூகுள் பே மூலமா 12.550 ரூபாய் அனுப்பிட்டேன் இரண்டுமணி நெரத்துக்கு முன்னாடி

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12500 | 12.55 | 12500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 11:00 (60 min ago) | today 10:00 (120 min ago) | **extractor_form**: near-spelling variant of: நேரத்துக்கு |

### 21. kn-07 (story) - fails 100% of 4 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__RemyMultilingual__r0__kn`): ಒಂದು ಕೂವಾರ ಕೋಡ್ಕಳುಯಸಿ ಸ್ಕಾನ್ ಮಾಡಿದರೆ ಹಣಾ ಬರುತದೆ ಎಂದರು. ಸ್ಕಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ನಾಲ್ಕು ಸಾವಿರ ಒಂಬೈನೂರ ತಂಬತ್ರುಂಬತ್ರುಪಾಯ ಹೋಯಿತು. ಇಂದು ಬೆಳಿಗೆ ಹತ್ತು ಗಂಟೆಗೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4900 | 4999 | **asr**: value not in the transcript |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 22. kn-13 (story) - fails 100% of 4 runs

- Reference: ನನ್ನ 15000 ರೂಪಾಯಿ ಹೋಯಿತು, ಆಕ್ಸಿಸ್ ಬ್ಯಾಂಕ್, 3 ದಿನಗಳ ಹಿಂದೆ
- Transcript (`kn-13__RemyMultilingual__r0__kn`): ನನ್ನ ಒಂದು ಅಯಿದು ತರಿಪಲ್ ಸೊನ್ನೆ ರುಪಾಯಿ ಹೋಯಿತು ಆಕ್ಸಿಸ್ ಬ್ಯಾಂಗ್ ಮೂರು ದಿನಗಳ ಹಿಂದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |

### 23. kn-14 (story) - fails 100% of 4 runs

- Reference: UPI ರೆಫರೆನ್ಸ್ ನಂಬರ್ 4 0 3 2 1 8 7 6 5 4 3 2, ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-14__GiuseppeMultilingual__r0__kn`): UPI reference number 493218 7 6 5 4 3 2 5 5 5 5

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 24. hi-24 (story) - fails 100% of 4 runs

- Reference: कल दोपहर करीब ढाई बजे फोन पे से छब्बीस सौ रुपये गए
- Transcript (`hi-24__GiuseppeMultilingual__r0__hi`): कल दोफर करीब रहाई बजे फोन पे से 2600 रुपे गए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 14:30 (1290 min ago) | -1d 12:00 (1440 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: ढाई |

### 25. te-04 (story) - fails 100% of 4 runs

- Reference: ఒకతను పొరపాటున డబ్బులు పంపించానని, తిరిగి పంపమని అడిగాడు, నేను గూగుల్ పే ద్వారా పన్నెండు వేల ఐదు వందల రూపాయలు పంపాను, రెండు గంటల క్రితం
- Transcript (`te-04__GiuseppeMultilingual__r0__te`): ఉకతను పొరుపాటున డబులు పంపించానని తిరిగ పంపమని అడిగాడు నేను గూగుల్ పేద్వారా పన్యండు వేల అయిదు వందల రూపాయలు పంపాను రెండు గంటల కృతంం

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12500 | 1500 | 12500 | **asr**: value not in the transcript |
| scamType | fn | wrong_transfer | - | wrong_transfer | **extractor_form**: near-spelling variant of: పొరపాటున |

### 26. te-07 (story) - fails 100% of 4 runs

- Reference: ఒక QR కోడ్ పంపి స్కాన్ చేస్తే డబ్బులు వస్తాయన్నారు, స్కాన్ చేయగానే ₹4,999 పోయాయి, ఈరోజు ఉదయం 10 గంటలకు
- Transcript (`te-07__RemyMultilingual__r0__te`): ఉక్క క్యువార కోడ్పంపి స్కాం చేస్తే డబులు వస్తాయన్నారు. స్కాం చేగానే నాలుగు వేల తోమ్ిది వందల తోమ్పె తోమ్ిది రూపాయలు పోయాయి. ఈ రోజు ఉదేయం పది గంటలకు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |

### 27. te-11 (story) - fails 100% of 4 runs

- Reference: ఒకటిన్నర లక్షల రూపాయలు పోయాయి, బ్యాంక్ ఆఫ్ బరోడా అకౌంట్, నిన్న రాత్రి 10 గంటలకు
- Transcript (`te-11__RemyMultilingual__r0__te`): ఉకటినర లక్షల రూపాయలు పోయాయి బ్యాం కాఫ్ బరోడా ఆకోంత్ నిన్న రాత్రి 10 గంటలకు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |

### 28. te-14 (story) - fails 100% of 4 runs

- Reference: UPI రిఫరెన్స్ నంబర్ 4 0 3 2 1 8 7 6 5 4 3 2, ఐదు వేల రూపాయలు పోయాయి
- Transcript (`te-14__GiuseppeMultilingual__r0__te`): UPI reference నంబర్ నాలుగు సున్నా 3, 2, 1 గంటా ఎనిమిది 7, 6, 5, 4, 3, 2, 5 వేలరూపాయలు పోయాయి.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 403218765432 | - | 403218765432 | **extractor_form**: value is in the transcript but not parsed |

### 29. kn-31 (answer:utr) - fails 100% of 4 runs

- Reference: ನಿಮ್ಮ ಖಾತೆಯಿಂದ ರೂ.5000 ಡೆಬಿಟ್ ಆಗಿದೆ, UPI Ref No 6 1 2 3 4 5 7 8 9 0 1 2
- Transcript (`kn-31__RemyMultilingual__r0__kn`): ನಿಮ್ಮ ಖಾತೆಯಿಂದ ರುವ ಐದು ಸಾವಿರಡೆ ಬಿಟಾಗಿದೆ. ಯೂಪಿಯಾಯಿ ರೆಫ್ನೋ 6 ವಂದು ಎರಡು ಮೂರು ನಾಲ್ಕು ಆಿದು ಎಳು ಎಂಟು ಒಂಬತ್ತು ಸೊನ್ನೆ ಒಂದು ಎರಡು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | fn | 612345789012 | - | 612345789012 | **asr**: value not in the transcript |

### 30. en-12 (story) - fails 100% of 4 runs

- Reference: Rs. 2,50,000 debited from my Bank of Baroda account this morning at 9:30
- Transcript (`en-12__GiuseppeMultilingual__r0__en`): R.S. 2.50.000 debited from my Bank of Baroda account this morning at 9.30.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |

### 31. te-13 (story) - fails 100% of 4 runs

- Reference: నా 15000 రూపాయలు పోయాయి, యాక్సిస్ బ్యాంక్, 3 రోజుల క్రితం
- Transcript (`te-13__RemyMultilingual__r0__te`): నా పదిహేను వేలు రూపాయలు పోయాయి యాక్సిస్ బ్యాంక్ మూడు రోజుల కృతమ్.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | -3d 12:00 (4320 min ago) | - | -3d 12:00 (4320 min ago) | **asr**: ASR lost/changed: క్రితం |

### 32. mr-18 (story) - fails 100% of 4 runs

- Reference: अडीच लाख रुपये गुंतवणुकीच्या नावाखाली घेतले, पैसे दुप्पट होतील म्हणाले, येस बँक
- Transcript (`mr-18__GiuseppeMultilingual__r0__mr`): अडीच लाक रुपे गुंतवन उकीचा नावा खाली घेतले, पैसे दुपपर होतील महना ले, येस बंक

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 2.5 | 250000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: दुप्पट |

### 33. mr-06 (story) - fails 100% of 4 runs

- Reference: टेलिग्रामवर पार्ट टाइम जॉबचे टास्क दिले, मग गुंतवणूक करायला सांगितली, मी सत्तेचाळीस हजार रुपये भरले, कोटक बँकेतून
- Transcript (`mr-06__GiuseppeMultilingual__r0__mr`): तेली ग्राम वर पार्ट टाइम जॉब चे टास्क दिले, मग गुंतवनू करायला सांगितली, मी 27,000 रुपे भरले, कोटक बंके तून

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 47000 | 27000 | 47000 | **asr**: value not in the transcript |

### 34. mr-11 (story) - fails 100% of 4 runs

- Reference: दीड लाख रुपये गेले, बँक ऑफ बडोदा खातं, काल रात्री दहा वाजता
- Transcript (`mr-11__RemyMultilingual__r0__mr`): दीड लाक रुपे गेले बंक ओफ बडो दा खातन काल रात्री दहावाजता

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 150000 | 1.5 | 150000 | **asr**: value not in the transcript |
| bank | fn | Bank of Baroda | - | Bank of Baroda | **extractor_form**: key words survive (बडोदा) but the extractor fails |

### 35. hi-02 (story) - fails 100% of 4 runs

- Reference: भैया जल्दी करो, मेरे पैसे चले गए... साढ़े तीन हज़ार रुपये, फोनपे से गए हैं, अभी अभी हुआ
- Transcript (`hi-02__GiuseppeMultilingual__r0__hi`): भाईया जल्दी करो, मेरे पैसे चले गए, सारे 3000 रुपे, फोन पे से गए है, अभी अभी हुआ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 3000 | 3500 | **asr**: value not in the transcript |

### 36. hi-03 (story) - fails 100% of 4 runs

- Reference: कल शाम 7 बजे कस्टमर केयर वाले का फोन आया, उसने AnyDesk डाउनलोड करवाया और मेरे एचडीएफसी अकाउंट से दो लाख रुपये निकाल लिए
- Transcript (`hi-03__RemyMultilingual__r0__hi`): कल शाम साथ बजे कस्तमर के एर वाले का फोन आया, उसने AnyDisk डाउनलोड करवाया और मेरे HDFC अकाउंट से 2 लाक रुपे निकाल लिये.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 200000 | 2 | 200000 | **asr**: value not in the transcript |

### 37. hi-07 (story) - fails 100% of 4 runs

- Reference: क्यूआर कोड भेजा था बोला स्कैन करो पैसे मिलेंगे, स्कैन किया तो ₹4,999 कट गए, आज सुबह साढ़े दस बजे
- Transcript (`hi-07__RemyMultilingual__r0__hi`): QR कोर भेजा था बोला स्कैन करो पैसे मिलेंगे, स्कैन किया तो 4,999 रुपे कट गए, आज सुबह सारे 10 बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 10:30 (90 min ago) | today 10:00 (120 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: साढ़े |

### 38. hi-11 (story) - fails 100% of 4 runs

- Reference: डेढ़ लाख रुपये गए हैं मेरे, बैंक ऑफ बड़ौदा का अकाउंट है, कल रात दस बजे
- Transcript (`hi-11__RemyMultilingual__r0__hi`): देर लाक रुपे गए है मेरे बैंक आफ बड़ोदा का अकाउंट है कल रात दस बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |

### 39. mr-07 (story) - fails 100% of 4 runs

- Reference: एक क्यूआर कोड पाठवला आणि स्कॅन करा पैसे मिळतील म्हणाले, स्कॅन केल्यावर ₹4,999 कापले गेले, आज सकाळी साडेदहा वाजता
- Transcript (`mr-07__RemyMultilingual__r0__mr`): एक QR कोड पाथवला आनी स्कन करा पैसे मितील महनाले, स्कन के लियावर 4,999 रुपे कापले गेले, आज सकाई साडे धावाज था.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: साडेदहा वाजता |

### 40. mr-08 (story) - fails 100% of 4 runs

- Reference: एक व्हिडिओ कॉल आला, रेकॉर्ड करून आता ब्लॅकमेल करत आहेत, पेटीएमवरून पंधरा हजार रुपये दिले
- Transcript (`mr-08__GiuseppeMultilingual__r0__mr`): एक वीडियो कॉल आला, रेकॉर्ड करून आता बलकमेल करताहित, पेटी एमवरून पंधरा हजार रुपे दिले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ब्लॅकमेल |
