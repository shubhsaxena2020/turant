# Turant pipeline eval: unseen_lv3_66

Generated 2026-11-28T11:41:48.657Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 1116 ASR transcripts scored, **4 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 0 | - | - | - | - | - | - | - |
| ASR noise 15 dB | 279 | 62.4 | 62.4 | 91.5 | 76.6 | 83.4 | 56.4 | 41.7 |
| ASR noise 5 dB | 279 | 53.0 | 53.0 | 90.3 | 67.6 | 77.3 | 67.1 | 42.4 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 1116 | 60.2 | 60.2 | 91.0 | 74.4 | 81.9 | 58.2 | 36.7 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): -% of clean runs and 63.1% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | - | - | - | 81.6 |
| time | 113 | 100.0 | 100.0 | 100.0 | - | - | - | 79.1 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | - | - | - | 85.1 |
| bank | 97 | 100.0 | 100.0 | 100.0 | - | - | - | 90.1 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 87.4 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | - | - | 75.4 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | 70.6 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 67.0 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 48.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 85.7 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | - | - | - | 81.9 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | 80.0 | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | 75.0 | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | 30.8 | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | 52.5 | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | 50.0 | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | 50.0 | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | 32.5 | 100.0 | - | - | - | - (n=0) |

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
| babble 15 dB | 85 | 68.2 | 85.0 | 52.0 | 46.2 |
| babble 5 dB | 85 | 56.5 | 78.0 | 62.8 | 48.2 |
| clean | 558 | 62.7 | 83.2 | 54.7 | 31.3 |
| pink 15 dB | 87 | 64.4 | 86.0 | 55.6 | 45.3 |
| pink 5 dB | 87 | 46.0 | 72.9 | 86.4 | 51.4 |
| traffic 15 dB | 107 | 56.1 | 79.9 | 60.6 | 35.1 |
| traffic 5 dB | 107 | 56.1 | 80.2 | 56.6 | 30.3 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 558 | 62.7 | 83.2 | 54.7 |
| 15 dB | 279 | 62.4 | 83.4 | 56.4 |
| 5 dB | 279 | 53.0 | 77.3 | 67.1 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 558 | 62.7 | 83.2 | 54.7 |

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
| all forced-language runs | 601 | 545 (91%) | 56 (9%) | 0 (0%) | 0 |
| clean | 275 | 247 (90%) | 28 (10%) | 0 (0%) | 0 |
| 15 dB | 137 | 124 (91%) | 13 (9%) | 0 (0%) | 0 |
| 5 dB | 189 | 174 (92%) | 15 (8%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 162 | 157 | 5 | 0 |
| time | 120 | 110 | 10 | 0 |
| scamType | 86 | 77 | 9 | 0 |
| bank | 66 | 65 | 1 | 0 |
| suspectPhone | 55 | 46 | 9 | 0 |
| utr | 31 | 24 | 7 | 0 |
| suspectUpi | 28 | 27 | 1 | 0 |
| paymentApp | 26 | 17 | 9 | 0 |
| suspectAccount | 20 | 19 | 1 | 0 |
| intent | 7 | 3 | 4 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 39 | 35 | 4 | 0 |
| en | 74 | 72 | 2 | 0 |
| bn | 117 | 102 | 15 | 0 |
| ta | 79 | 75 | 4 | 0 |
| te | 100 | 91 | 9 | 0 |
| mr | 62 | 48 | 14 | 0 |
| kn | 130 | 122 | 8 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | kn | asr | fn | 24 | kn-03 kn-14 kn-16 kn-20 kn-31 kn-01 kn-02 kn-04 +5 |
| 2 | amount | en | asr | fn | 21 | en-04 en-12 en-13 en-16 en-17 en-37 en-25 |
| 3 | amount | bn | asr | wrong | 16 | bn-07 bn-12 bn-13 bn-20 bn-21 bn-24 |
| 4 | time | te | asr | fn | 16 | te-02 te-10 te-12 te-13 te-15 te-16 te-01 te-27 |
| 5 | bank | kn | asr | fn | 16 | kn-16 kn-18 kn-21 kn-30 kn-12 kn-17 kn-38 |
| 6 | scamType | bn | asr | fn | 15 | bn-07 bn-08 bn-16 bn-05 bn-09 bn-18 bn-35 |
| 7 | amount | kn | asr | wrong | 15 | kn-07 kn-13 kn-21 kn-24 kn-20 |
| 8 | amount | bn | asr | fn | 13 | bn-06 bn-07 bn-08 bn-13 bn-37 bn-02 bn-20 |
| 9 | time | kn | asr | wrong | 13 | kn-04 kn-20 kn-26 kn-28 kn-07 kn-15 |
| 10 | time | en | asr | fn | 12 | en-02 en-04 en-13 |
| 11 | time | bn | asr | wrong | 12 | bn-07 bn-11 bn-26 bn-28 bn-40 |
| 12 | amount | ta | asr | fn | 12 | ta-12 ta-13 ta-16 ta-20 ta-37 ta-06 ta-14 |
| 13 | suspectPhone | te | asr | fn | 12 | te-09 te-22 te-33 te-39 |
| 14 | scamType | mr | asr | fn | 12 | mr-03 mr-08 mr-16 |
| 15 | scamType | kn | asr | fn | 12 | kn-03 kn-07 kn-16 kn-18 |
| 16 | amount | hi | asr | wrong | 11 | hi-02 hi-24 hi-26 hi-17 hi-27 |
| 17 | bank | bn | asr | fn | 11 | bn-01 bn-16 bn-18 bn-13 bn-21 |
| 18 | bank | ta | asr | fn | 11 | ta-17 ta-18 ta-21 ta-30 ta-16 |
| 19 | scamType | te | asr | fn | 10 | te-04 te-08 te-16 te-09 |
| 20 | time | hi | asr | wrong | 9 | hi-07 hi-24 hi-28 |
| 21 | suspectPhone | ta | asr | fn | 9 | ta-09 ta-33 ta-39 |
| 22 | amount | te | asr | fn | 9 | te-02 te-14 te-15 te-16 |
| 23 | bank | te | asr | fn | 9 | te-18 te-30 te-05 |
| 24 | amount | mr | asr | fn | 9 | mr-06 mr-12 mr-14 mr-04 mr-11 mr-17 mr-18 |
| 25 | scamType | en | asr | fn | 8 | en-02 en-16 |
| 26 | bank | en | asr | fn | 8 | en-02 en-03 |
| 27 | amount | ta | asr | wrong | 8 | ta-01 ta-10 ta-11 ta-31 |
| 28 | scamType | ta | asr | fn | 8 | ta-03 ta-05 ta-16 |
| 29 | time | te | asr | fp | 8 | te-09 te-19 te-31 |
| 30 | suspectUpi | kn | asr | fn | 8 | kn-10 kn-34 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. en-02 (story) - fails 100% of 4 runs

- Reference: Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai
- Transcript (`en-02__GiuseppeMultilingual__r0__en`): My account is 5,000 Rupai.g. The minute I log in, I don't have an update. SBK account is high.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: pehle |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 2. en-04 (story) - fails 100% of 4 runs

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__GiuseppeMultilingual__r0__en`): Bye-bye.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: abhi |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 3. en-16 (story) - fails 100% of 4 runs

- Reference: Aaj subah 10 baje ek message aaya, QR scan karne ko bola, scan kiya aur dhai hazaar rupaye chale gaye
- Transcript (`en-16__GiuseppeMultilingual__r0__en`): A.A.J. Subha Tenbaya Ekmesajaya Q.R.Skan Karn K.O. Bola Skan Kia Or Dai Hazaru Peichael Gay

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2500 | - | 2500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 09:00 (180 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 baje |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: scan |

### 4. kn-16 (story) - fails 100% of 4 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__GiuseppeMultilingual__r0__kn`): ನನ್ನ ಅಕಾಂಟ್ ಇಂದ ಇಪ್ಪತ್ತು ಸಾವಿರ್ ರುಪಿಸ್ ದೇಬಿಟ್ ಆಯತು, ICICI ಬೆಂಕ್, ಒಂದು ಗಂಟೆ ಹಿಂದೆ ಕಸ್ಟಮಕೆಯಗೆ ಕಾಲ್ ಮಾಡಿದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |

### 5. kn-31 (answer:utr) - fails 100% of 4 runs

- Reference: ನಿಮ್ಮ ಖಾತೆಯಿಂದ ರೂ.5000 ಡೆಬಿಟ್ ಆಗಿದೆ, UPI Ref No 6 1 2 3 4 5 7 8 9 0 1 2
- Transcript (`kn-31__RemyMultilingual__r0__kn`): ನಿಮ್ಮ ಕಾತೆಯಿಂದ ರುವಾಯದು ಸಾವರಡೆ ಬಿಟಾಗಿದೆ. ಯೂಪಿಯಾಯರೇಫ್ನೋ 61234578912.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | fn | 612345789012 | - | 612345789012 | **asr**: value not in the transcript |
| suspectAccount | fp | - | 61234578912 | - | **asr**: spurious value from a mis-recognised transcript |

### 6. bn-07 (story) - fails 100% of 4 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__RemyMultilingual__r0__bn`): 1 ক্যোআর কোড পাঠিয়ে বল স্কেন করুন টাকা পাবেন, স্কেন করতে চার হাজার নইশো নিরান্বে টাকা কেটে গালো, আজ সকাল সারে দোষ্টাই.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 1000 | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:30 (90 min ago) | today 09:00 (180 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: সাড়ে দশটায় |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: স্ক্যান |

### 7. bn-08 (story) - fails 100% of 4 runs

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__GiuseppeMultilingual__r0__bn`): 1 একটা ঵িডিও কল এসে ছিলো, রেকোড করে এখন ব্লাকমেল করছে, পেটিয়ম দিয়ে পনের হাজার টাকা দিয়ে দিয়ে ছি.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: near-spelling variant of: পেটিএম |

### 8. te-16 (story) - fails 100% of 4 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__GiuseppeMultilingual__r0__te`): ನಾ ಅಕಾಂಟ್ జುಂಡಿ 20,000 రುಪಿಸ್ దೇబిట జಾయ పోಯాయి, ICICI బంక్, ఒక గంటక్రితమ్ కస్టుమా కేయకి కాల్ చేసాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: క్రితం |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |

### 9. kn-07 (story) - fails 100% of 4 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__RemyMultilingual__r0__kn`): ಒಂದು ಕುಯಾರ್ ಕೋಡ್ಕಳು ಇಸಿ ಸ್ಕಾನ್ ಮಾಡಿದರೆ ಹನಾ ಬರುತದೆ ಎಂದರು. ಸ್ಕಾನ್ ಮಾಡಿದ ತಕ್ಷನ ನಾಲ್ಕು ಸಾವಿರ ಒಂಬೈನೂರ ತಮ್ಬತ್ರುಮ್ಬತ್ ರುಪಾಯಿ ಹೋಯಿತು. ಇಂದು ಬೆಳಿಗ್ಗೆ ಹತ್ತು ಗಂಟೆಗೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4900 | 4999 | **asr**: value not in the transcript |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 10. hi-24 (story) - fails 100% of 4 runs

- Reference: कल दोपहर करीब ढाई बजे फोन पे से छब्बीस सौ रुपये गए
- Transcript (`hi-24__GiuseppeMultilingual__r0__hi`): कल दोफर करीब रहाई बजे फोन पे से 26 रुपे गए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2600 | 26 | 2600 | **asr**: value not in the transcript |
| time | wrong | -1d 14:30 (1290 min ago) | -1d 12:00 (1440 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: ढाई |

### 11. en-13 (story) - fails 100% of 4 runs

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__RemyMultilingual__r0__en`): If you want to know more about the Bishlik disease, click here or on the link below.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9999 | **asr**: value not in the transcript |
| time | fn | -1d 21:30 (870 min ago) | - | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: raat saade nau baje |

### 12. te-04 (story) - fails 100% of 4 runs

- Reference: ఒకతను పొరపాటున డబ్బులు పంపించానని, తిరిగి పంపమని అడిగాడు, నేను గూగుల్ పే ద్వారా పన్నెండు వేల ఐదు వందల రూపాయలు పంపాను, రెండు గంటల క్రితం
- Transcript (`te-04__GiuseppeMultilingual__r0__te`): 1. పొరప్పాటున డబ్బులు పంపించానని తిరిగ పంపమని అడిగాడు. నేను గూగుల్ పేద్వారా 12,500 రూపాయలు పంపాను 2 గంటల కృతమ్.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 10:00 (120 min ago) | -1d 14:00 (1320 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: క్రితం |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: పొరపాటున |

### 13. te-09 (story) - fails 100% of 4 runs

- Reference: కాల్ వచ్చిన నంబర్ 9 8 7 6 5... 4 3 2 1 0, బ్యాంక్ నుండి మాట్లాడుతున్నాం, KYC చేయకపోతే అకౌంట్ బ్లాక్ అవుతుందని చెప్పారు
- Transcript (`te-09__RemyMultilingual__r0__te`): Kaal wachchina nr. 98765. 4321 gantas unna. Bank nundi matladutunam. KYC cheykapote account block avutundani chepwaru.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 12:00 (1440 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 14. te-14 (story) - fails 100% of 4 runs

- Reference: UPI రిఫరెన్స్ నంబర్ 4 0 3 2 1 8 7 6 5 4 3 2, ఐదు వేల రూపాయలు పోయాయి
- Transcript (`te-14__GiuseppeMultilingual__r0__te`): UPI reference no. 403218 7654325000 పోయాఈ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | 403218765432 | **extractor_form**: value is in the transcript but not parsed |

### 15. kn-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl ಗೆ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ, ಇಪ್ಪತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ
- Transcript (`kn-10__GiuseppeMultilingual__r0__kn`): ಯುಪಿಯಾಯ್ ಆಯ್ಡಿ ರಾಹೂಲ್ ಡಾಟ್ ಕೇವಾಯಸಿ ಎಂಟು ಸಾವರ್ ರೂಪಾಯಿ ಕಳುವಿಸಿದೆ. ಇಪ್ಪತ್ತು ನಿಮಿಷಗಳಾ ಹಿಂದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 16. kn-14 (story) - fails 100% of 4 runs

- Reference: UPI ರೆಫರೆನ್ಸ್ ನಂಬರ್ 4 0 3 2 1 8 7 6 5 4 3 2, ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-14__GiuseppeMultilingual__r0__kn`): UPI reference number 432187654325000.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 17. bn-02 (story) - fails 100% of 4 runs

- Reference: দাদা তাড়াতাড়ি, আমার স্টেট ব্যাংক থেকে সাড়ে তিন হাজার টাকা চলে গেছে, ফোনপে দিয়ে, এইমাত্র
- Transcript (`bn-02__GiuseppeMultilingual__r0__bn`): Dada Taratari, Amar State Bank Theke 3,500 টাকা চলে গাছে, ফন পে দিয়ে এই মাত্র

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: near-spelling variant of: ফোনপে |

### 18. bn-20 (story) - fails 100% of 4 runs

- Reference: উম্ম... মানে, গতকাল দুপুর আড়াইটায় ফোনপে থেকে দু হাজার ছশো টাকা গেছে
- Transcript (`bn-20__GiuseppeMultilingual__r0__bn`): OM মানে গতকাল দুপুর আরাইটাই ফন্পে থেকে দুহাজার ছো টাকা গাছে

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2600 | 2000 | 2600 | **asr**: value not in the transcript |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: ফোনপে |

### 19. ta-16 (story) - fails 100% of 4 runs

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__GiuseppeMultilingual__r0__ta`): என் அக்காண்டில் இருந்து 20000 ருபீஸ் டெபிட் ஆயிடிச்சு, ICICI பேர்வாக்கு ஒரு மணி நேரத்துக்கு முன்னாடி கஸ்ட்மர் கேயக்கு கால் பண்ணேன்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |

### 20. te-19 (story) - fails 100% of 4 runs

- Reference: డబ్బులు వెళ్ళిన అకౌంట్ నంబర్ 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`te-19__RemyMultilingual__r0__te`): 1.00.2345678.1.02

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectAccount | fn | 50100234567812 | - | 50100234567812 | **asr**: value not in the transcript |

### 21. kn-03 (story) - fails 100% of 4 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__RemyMultilingual__r0__kn`): ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟಗೆ ಕಸ್ಟಮರ್ಕೆರ್ಣಿಂದ ಕರೆಬಂತು, ಎನಿ ಡೆಸ್ಕ್ ಇಂಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು. ನಂತರ ಏಜ್ಡಿ ಎಫ್ಸಿ ಕಾತೆಯಿಂದ ಎರ್ಡು ಲಕ್ಷರು ಪಾಯಿತಗೆದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 22. bn-13 (story) - fails 100% of 4 runs

- Reference: আমার ১৫০০০ টাকা চলে গেছে, এক্সিস ব্যাংক, ৩ দিন আগে
- Transcript (`bn-13__RemyMultilingual__r0__bn`): A-MAR 1500 টাকা চলে গেছে, Axis Bank, তিন দিন আগে.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 1500 | 15000 | **asr**: value not in the transcript |

### 23. bn-18 (story) - fails 100% of 4 runs

- Reference: দুই লাখ পঞ্চাশ হাজার টাকা ইনভেস্টমেন্টের নামে নিয়ে নিয়েছে, বলেছিল টাকা ডাবল হবে, ইয়েস ব্যাংক
- Transcript (`bn-18__GiuseppeMultilingual__r0__bn`): 2,50,000 টাকা ইন্঵েস্টমেন্টে নামে নিয়ে নিয়ে ছে বলে ছিলো টাকা ডাবল হবে ইস বেং

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: ইয়েস ব্যাংক |

### 24. ta-14 (story) - fails 100% of 4 runs

- Reference: UPI ரெஃபரன்ஸ் நம்பர் 4 0 3 2 1 8 7 6 5 4 3 2, ஐயாயிரம் ரூபாய் போச்சு
- Transcript (`ta-14__GiuseppeMultilingual__r0__ta`): UPI Rearance Number 4.3218765432. 5000 ரூபாய் போச்சு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 5004.32 | 5000 | **extractor_form**: value is in the transcript but not parsed |
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 25. te-31 (answer:utr) - fails 100% of 4 runs

- Reference: మీ ఖాతా నుండి రూ.5000 డెబిట్ అయ్యింది, UPI Ref No 6 1 2 3 4 5 7 8 9 0 1 2
- Transcript (`te-31__RemyMultilingual__r0__te`): 1. మి కాతానుండి 5000 రూపాయలు డేబిట హింది. UPI REF NO 6, 1.23, 4.57, 8.09, 1.02.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 612345789012 | - | 612345789012 | **asr**: value not in the transcript |

### 26. hi-09 (story) - fails 100% of 4 runs

- Reference: जिस नंबर से फोन आया था वो है 9 8 7 6 5... 4 3 2 1 0, उसने बोला बैंक से बोल रहा हूँ, केवाईसी नहीं किया तो खाता बंद हो जाएगा
- Transcript (`hi-09__RemyMultilingual__r0__hi`): जिस नंबर से फोन आया था वो है 987654321 शूने उसने बोला बैंक से बोल रहा हूँ के वाईसी नहीं किया तो खाता बंध हो जाएगा

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 27. ta-31 (answer:utr) - fails 100% of 4 runs

- Reference: உங்கள் கணக்கிலிருந்து ரூ.5000 டெபிட் செய்யப்பட்டது, UPI Ref No 6 1 2 3 4 5 7 8 9 0 1 2
- Transcript (`ta-31__RemyMultilingual__r0__ta`): உங்கள் கணக்கிலிருந்து, 5000 ரூபாய் டெவிட் செய்யப்பட்டது, UPI REFNO 612345789-12.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 612345789012 | - | 612345789012 | **asr**: value not in the transcript |

### 28. hi-02 (story) - fails 100% of 4 runs

- Reference: भैया जल्दी करो, मेरे पैसे चले गए... साढ़े तीन हज़ार रुपये, फोनपे से गए हैं, अभी अभी हुआ
- Transcript (`hi-02__GiuseppeMultilingual__r0__hi`): भाईया जल्दी करो, मेरे पैसे चले गए, सारे तीन हजार रुपे, फोन पे से गए है, अभी अभी हुआ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 3000 | 3500 | **asr**: value not in the transcript |

### 29. hi-07 (story) - fails 100% of 4 runs

- Reference: क्यूआर कोड भेजा था बोला स्कैन करो पैसे मिलेंगे, स्कैन किया तो ₹4,999 कट गए, आज सुबह साढ़े दस बजे
- Transcript (`hi-07__RemyMultilingual__r0__hi`): QR को भेजा था बोला स्कैन करो पैसे मिलेंगे, स्कैन किया तो 4,999 रुपे कट गए, आज सुबह सारे 10 बजे.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 10:30 (90 min ago) | today 10:00 (120 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: साढ़े |

### 30. hi-11 (story) - fails 100% of 4 runs

- Reference: डेढ़ लाख रुपये गए हैं मेरे, बैंक ऑफ बड़ौदा का अकाउंट है, कल रात दस बजे
- Transcript (`hi-11__RemyMultilingual__r0__hi`): डेर लाख रुपे गए हैं मेरे बैंक ओफ बड़ोदा का अकाउंट है कल रात दस बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |

### 31. en-03 (story) - fails 100% of 4 runs

- Reference: Sir please help, I got a call from customer care, they made me install AnyDesk and two lakh rupees are gone from my ICICI account, this happened yesterday at 7 pm.
- Transcript (`en-03__RemyMultilingual__r0__en`): Sir please help, I got a call from customer care, they made me install any desk and 2 lakh rupees are gone from my Isisai account, this happened yesterday at 7pm.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 32. en-12 (story) - fails 100% of 4 runs

- Reference: Rs. 2,50,000 debited from my Bank of Baroda account this morning at 9:30
- Transcript (`en-12__GiuseppeMultilingual__r0__en`): RS. 250. 000 debited for my Bank of Baroda account this morning at 9.30.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 250 | 250000 | **asr**: value not in the transcript |

### 33. ta-09 (story) - fails 100% of 4 runs

- Reference: கால் வந்த நம்பர் 9 8 7 6 5... 4 3 2 1 0, பேங்க்ல இருந்து பேசறோம், KYC பண்ணலைன்னா அக்கவுண்ட் பிளாக் ஆயிடும்னு சொன்னாங்க
- Transcript (`ta-09__RemyMultilingual__r0__ta`): கால் வந்த நம்பர் 98, 7, 6, 5, 4, 3, 2, 1 பூஜ்சியம் பேங்கில இருந்து பேசறோம் கேவாயசி பண்ணலைன்னா அக்கவுன் பிளாக் ஆயிடும் என்று சொன்னாங்க

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 34. ta-18 (story) - fails 100% of 4 runs

- Reference: இரண்டரை லட்சம் ரூபாய் முதலீடு பண்ண சொல்லி வாங்கிட்டாங்க, பணம் டபுள் ஆகும்னு சொன்னாங்க, யெஸ் பேங்க்
- Transcript (`ta-18__GiuseppeMultilingual__r0__ta`): இரண்டரை லட்சம் ரூபாய் முதலிடு பண்ண சொல்லி வாங்கிட்டாங்க, பணம் தபுள் ஆகும்னு சொன்னாங்க, ஏஸ் பெங்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: யெஸ் பேங்க் |

### 35. ta-19 (story) - fails 100% of 4 runs

- Reference: பணம் போன அக்கவுண்ட் நம்பர் 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`ta-19__RemyMultilingual__r0__ta`): பணம் போன அக்கவுண் நம்பர் 5 பூஜ்சியம் 1, பூஜ்சியம் பூஜ்சியம் 2, 3, 4, 5, 6, 7, 8, 1, 2.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectAccount | fn | 50100234567812 | - | 50100234567812 | **asr**: value not in the transcript |

### 36. mr-03 (story) - fails 100% of 4 runs

- Reference: काल संध्याकाळी सात वाजता कस्टमर केअरमधून फोन आला, AnyDesk इन्स्टॉल करायला सांगितलं, मग एचडीएफसी खात्यातून दोन लाख रुपये काढले
- Transcript (`mr-03__RemyMultilingual__r0__mr`): काल संध्या काई साथ वाजता कस्टमर के अर्मधून फोन आला, एनी डिस्क इंस्टॉल कराईला सांगितलन, मग HDFC खात्यातून दोन लाख रुपे कारले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 37. mr-06 (story) - fails 100% of 4 runs

- Reference: टेलिग्रामवर पार्ट टाइम जॉबचे टास्क दिले, मग गुंतवणूक करायला सांगितली, मी सत्तेचाळीस हजार रुपये भरले, कोटक बँकेतून
- Transcript (`mr-06__GiuseppeMultilingual__r0__mr`): तेली ग्रामवर पार्ट टाइम जॉब चे टास्क दिले, मग गुन्तवनू करायला सांगितली, मी 27,000 रुपे भरले, कोटक बंके तून।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 47000 | 27000 | 47000 | **asr**: value not in the transcript |

### 38. mr-07 (story) - fails 100% of 4 runs

- Reference: एक क्यूआर कोड पाठवला आणि स्कॅन करा पैसे मिळतील म्हणाले, स्कॅन केल्यावर ₹4,999 कापले गेले, आज सकाळी साडेदहा वाजता
- Transcript (`mr-07__RemyMultilingual__r0__mr`): एक QR कोड पाठवला आनी स्कन करा पैसे मितील महनाले, स्कन के लियावर 4,999 रुपे कापले गेले, आज सकाई साडे धावाज था।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: साडेदहा वाजता |

### 39. mr-08 (story) - fails 100% of 4 runs

- Reference: एक व्हिडिओ कॉल आला, रेकॉर्ड करून आता ब्लॅकमेल करत आहेत, पेटीएमवरून पंधरा हजार रुपये दिले
- Transcript (`mr-08__GiuseppeMultilingual__r0__mr`): एक वीडियो कॉल आला, रेकॉर्ड करून आता बलकमेल करता है, पेटी एमवरून पंधरा हजार रुपे दिले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ब्लॅकमेल |

### 40. mr-16 (story) - fails 100% of 4 runs

- Reference: माझ्या account मधून 20,000 rupees debit झाले, ICICI bank, एक तासापूर्वी customer care ला फोन केला होता
- Transcript (`mr-16__GiuseppeMultilingual__r0__mr`): माज्या अकाउंट मधून 20,000 रुपीज देबिज्जाले, ICICI बैंक, एक तासापूर्वी कस्टमर के लाफोन केला होता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
