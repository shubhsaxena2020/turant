# Turant pipeline eval: swift37

Generated 2026-11-27T15:31:06.612Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 520 ASR transcripts scored, **990 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 280 | 60.4 | 60.4 | 88.3 | 76.6 | 82.1 | 70.8 | 74.0 |
| ASR noise 15 dB | 120 | 55.8 | 55.8 | 89.8 | 71.8 | 79.8 | 79.9 | 86.0 |
| ASR noise 5 dB | 120 | 35.0 | 35.8 | 78.0 | 56.3 | 65.4 | 87.2 | 90.0 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 520 | 53.5 | 53.7 | 86.6 | 70.8 | 77.9 | 76.6 | 80.4 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 60.7% of clean runs and 54.4% of all runs fully correct. Per language (clean): hi 85%, en 69%, bn -%, ta -%, te -%, mr 24%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 87.3 | 84.6 | 85.9 | 81.2 |
| time | 113 | 100.0 | 100.0 | 100.0 | 79.2 | 73.0 | 76.0 | 72.8 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 86.2 | 92.6 | 88.5 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 98.9 | 96.7 | 97.8 | 91.9 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 74.2 | 85.2 | 80.0 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 77.8 | 33.3 | 46.7 | 47.3 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 20.0 | 15.0 | 17.1 | 10.7 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 91.7 | 35.5 | 51.2 | 56.1 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 71.4 | 83.3 | 63.2 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 71.4 | 83.3 | 70.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 88.3 | 76.6 | 82.1 | 77.9 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | 85.0 | 52.5 | 100.0 | 95.3 | 100.3 | 127.1 | 12.5 (n=16) |
| en | 100.0 | 68.3 | 32.5 | 100.0 | 86.8 | 30.5 | 15.9 | 37.0 (n=27) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | 23.8 | 20.0 | 100.0 | 57.7 | 117.2 | 130.0 | 0.0 (n=16) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 98.9 | 100.0 / 100.0 | 100.0 / 98.0 | 100.0 / 98.2 | 100.0 / 85.7 | 100.0 / 80.0 | 100.0 / 25.0 | 100.0 / 85.7 | 100.0 / 100.0 |
| en | 100.0 / 92.4 | 100.0 / 86.5 | 100.0 / 98.7 | 100.0 / 98.6 | 100.0 / 100.0 | 100.0 / 42.9 | 100.0 / 17.4 | 100.0 / 47.6 | 100.0 / 100.0 |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / 63.0 | 100.0 / 26.4 | 100.0 / 70.6 | 100.0 / 96.4 | 100.0 / 40.0 | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 47 | 48.9 | 73.3 | 82.5 | 88.2 |
| babble 5 dB | 47 | 17.0 | 46.4 | 102.7 | 100.1 |
| clean | 280 | 60.4 | 82.1 | 70.8 | 74.0 |
| pink 15 dB | 41 | 51.2 | 78.4 | 89.9 | 98.6 |
| pink 5 dB | 41 | 26.8 | 63.9 | 91.8 | 99.2 |
| traffic 15 dB | 32 | 71.9 | 89.8 | 64.0 | 68.2 |
| traffic 5 dB | 32 | 71.9 | 89.8 | 63.5 | 66.6 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 280 | 60.4 | 82.1 | 70.8 |
| 15 dB | 120 | 55.8 | 79.8 | 79.9 |
| 5 dB | 120 | 35.0 | 65.4 | 87.2 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 40 | 67.5 | 86.4 | 31.2 | 16.5 |
| en-IN-NeerjaNeural | 40 | 72.5 | 88.3 | 29.9 | 15.3 |
| en-IN-PrabhatNeural | 40 | 65.0 | 85.5 | 30.4 | 15.7 |
| hi-IN-MadhurNeural | 40 | 82.5 | 94.9 | 100.6 | 127.1 |
| hi-IN-SwaraNeural | 40 | 87.5 | 95.7 | 100.0 | 127.2 |
| mr-IN-AarohiNeural | 40 | 27.5 | 60.7 | 117.4 | 130.3 |
| mr-IN-ManoharNeural | 40 | 20.0 | 54.5 | 117.0 | 129.8 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 280 | 60.4 | 82.1 | 70.8 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 154 | 100.0 | 55.2 | 84.3 |
| correction | 28 | 100.0 | 60.7 | 69.4 |
| answer | 91 | 100.0 | 68.1 | 75.0 |
| answer (skip intent) | 7 | 100.0 | 71.4 | 83.3 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 325 | 318 (98%) | 7 (2%) | 0 (0%) | 0 |
| clean | 139 | 138 (99%) | 1 (1%) | 0 (0%) | 0 |
| 15 dB | 72 | 69 (96%) | 3 (4%) | 0 (0%) | 0 |
| 5 dB | 114 | 111 (97%) | 3 (3%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| time | 74 | 72 | 2 | 0 |
| amount | 67 | 66 | 1 | 0 |
| scamType | 34 | 33 | 1 | 0 |
| suspectPhone | 34 | 34 | 0 | 0 |
| suspectUpi | 33 | 33 | 0 | 0 |
| utr | 26 | 26 | 0 | 0 |
| bank | 25 | 23 | 2 | 0 |
| paymentApp | 19 | 19 | 0 | 0 |
| suspectAccount | 7 | 6 | 1 | 0 |
| intent | 6 | 6 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 47 | 46 | 1 | 0 |
| en | 91 | 86 | 5 | 0 |
| mr | 187 | 186 | 1 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | mr | asr | wrong | 29 | mr-04 mr-06 mr-07 mr-20 mr-21 mr-24 mr-25 mr-02 +2 |
| 2 | time | mr | asr | fn | 26 | mr-01 mr-02 mr-04 mr-10 mr-12 mr-13 mr-16 mr-15 +1 |
| 3 | time | mr | asr | wrong | 24 | mr-03 mr-07 mr-11 mr-12 mr-15 mr-20 mr-26 mr-28 +2 |
| 4 | scamType | mr | asr | fn | 22 | mr-01 mr-04 mr-09 mr-16 mr-18 mr-35 mr-06 |
| 5 | amount | mr | asr | fn | 16 | mr-03 mr-11 mr-37 mr-06 mr-10 mr-15 mr-18 |
| 6 | suspectPhone | mr | asr | fn | 16 | mr-09 mr-22 mr-33 mr-39 |
| 7 | suspectPhone | en | asr | fn | 14 | en-06 en-07 en-15 en-20 |
| 8 | amount | en | asr | wrong | 13 | en-13 en-17 en-22 en-24 en-03 en-12 en-23 |
| 9 | suspectUpi | en | asr | wrong | 12 | en-09 en-19 en-33 |
| 10 | utr | mr | asr | fn | 12 | mr-14 mr-31 mr-32 |
| 11 | paymentApp | mr | asr | fn | 11 | mr-02 mr-04 mr-20 |
| 12 | bank | mr | asr | fn | 10 | mr-17 mr-06 mr-12 mr-13 mr-18 mr-21 |
| 13 | suspectUpi | mr | asr | fn | 8 | mr-10 mr-34 |
| 14 | bank | hi | asr | fn | 7 | hi-12 hi-11 hi-19 hi-22 hi-31 hi-32 |
| 15 | time | en | asr | wrong | 7 | en-03 en-26 en-40 |
| 16 | utr | en | asr | fn | 7 | en-31 en-32 |
| 17 | scamType | hi | asr | fn | 6 | hi-01 hi-18 hi-22 hi-37 |
| 18 | suspectUpi | en | asr | fn | 6 | en-39 en-19 en-33 |
| 19 | suspectUpi | hi | asr | wrong | 5 | hi-10 hi-36 |
| 20 | bank | en | asr | fn | 5 | en-10 en-03 en-29 en-30 |
| 21 | time | en | asr | fp | 5 | en-19 |
| 22 | utr | hi | asr | fn | 4 | hi-15 |
| 23 | paymentApp | hi | asr | fn | 4 | hi-24 |
| 24 | suspectAccount | mr | asr | fn | 4 | mr-19 |
| 25 | intent | mr | asr | fn | 4 | mr-36 |
| 26 | paymentApp | en | asr | fn | 4 | en-04 en-11 en-18 |
| 27 | amount | hi | asr | fn | 3 | hi-27 hi-39 |
| 28 | time | en | asr | fn | 3 | en-22 |
| 29 | time | hi | asr | wrong | 3 | hi-24 hi-28 hi-30 |
| 30 | suspectPhone | hi | asr | fn | 2 | hi-23 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. mr-04 (story) - fails 100% of 4 runs

- Reference: एकाने सांगितलं चुकून पैसे पाठवले, परत पाठवा, मी गूगल पे वरून बारा हजार पाचशे रुपये पाठवले, दोन तासांपूर्वी
- Transcript (`mr-04__Aarohi__r0__mr`): Aikaani sangitla chookun paise paathavle, parth paathava, meagoogal par varun baarah hazaar paanch se rupe paathavle, don'taasaanpurvi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12500 | 12005 | 12500 | **asr**: value not in the transcript |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: चुकून |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: गूगल पे |

### 2. mr-20 (story) - fails 100% of 4 runs

- Reference: म्हणजे... काल दुपारी अडीच वाजता फोनपे वरून दोन हजार सहाशे रुपये गेले
- Transcript (`mr-20__Aarohi__r0__mr`): Manje, kal doopaari adhik vaajata phone par varun don hazaar sahaashay rupe ke lie.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2600 | 2000 | 2600 | **asr**: value not in the transcript |
| time | wrong | -1d 14:30 (1290 min ago) | -1d 12:00 (1440 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: अडीच वाजता |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: फोनपे |

### 3. en-19 (story) - fails 100% of 5 runs

- Reference: The UPI ID was sharma123 at paytm, I sent him three thousand five hundred
- Transcript (`en-19__Neerja__r0__en`): The UPI ID was sharma 01:23 at Paytm. I sent him 3500.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 13:23 (1357 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | wrong | sharma123@paytm | 23@paytm | sharma123@paytm | **asr**: value not in the transcript |

### 4. mr-16 (story) - fails 100% of 4 runs

- Reference: माझ्या account मधून 20,000 rupees debit झाले, ICICI bank, एक तासापूर्वी customer care ला फोन केला होता
- Transcript (`mr-16__Aarohi__r0__mr`): Maja account madhun bis hazaar roopij debit jha le ICI C I bank ek taaza poorvi customer kerla phone kerla hota.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: तासापूर्वी |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: care |

### 5. mr-02 (story) - fails 100% of 4 runs

- Reference: दादा लवकर, माझ्या खात्यातून साडेतीन हजार रुपये गेले, फोनपे वरून, आत्ताच झालं
- Transcript (`mr-02__Aarohi__r0__mr`): Daada lauka maja khaatiyaatun saadhe tin hazaar rupe ke lie phone par varun aatachhaala.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: आत्ताच |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: फोनपे |

### 6. mr-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__Aarohi__r0__mr`): ID raahul D0T at var aath hazaar rupe paathavle bis minute aappur bhi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: मिनिटांपूर्वी |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 7. mr-01 (story) - fails 100% of 4 runs

- Reference: माझ्या SBI खात्यातून पाच हजार रुपये कापले गेले, दहा मिनिटांपूर्वी एका माणसाने KYC अपडेट करायला सांगितले
- Transcript (`mr-01__Aarohi__r0__mr`): Maja SBI khaadyatoon paanch hazaar rupe kaaple gale, dahaan minitaanpurvin ekaansa ne update karaila sangit le.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: मिनिटांपूर्वी |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 8. en-33 (answer:suspect) - fails 100% of 5 runs

- Reference: rahul dot kyc at ybl
- Transcript (`en-33__Neerja__r0__en`): Raahul dot KYC at YBL.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kyc@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 9. hi-10 (story) - fails 100% of 4 runs

- Reference: मैंने यूपीआई आईडी rahul dot kyc at ybl पर आठ हज़ार रुपये भेजे, बीस मिनट पहले
- Transcript (`hi-10__Madhur__r0__hi`): Mainne UPI ID raahul dot KYC at YBL par aath hazaar rupe bhejen bis minute pahle.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kyc@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 10. hi-24 (story) - fails 100% of 4 runs

- Reference: कल दोपहर करीब ढाई बजे फोन पे से छब्बीस सौ रुपये गए
- Transcript (`hi-24__Madhur__r0__hi`): Kal dophar karib dhai baje phone par se chhabbis sau rupe gae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: फोन पे से |

### 11. en-07 (story) - fails 100% of 5 runs

- Reference: The caller's number was nine double eight seven six five four three two one, he asked for the OTP and I gave it
- Transcript (`en-07__Neerja__r0__en`): The caller's number was 9 double 8754321. He asked for the OTP and I gave it.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9887654321 | - | 9887654321 | **asr**: value not in the transcript |

### 12. en-09 (story) - fails 100% of 5 runs

- Reference: I paid to the UPI ID rahul dot kyc at ybl, eight thousand rupees, twenty minutes back
- Transcript (`en-09__Neerja__r0__en`): I paid to the UPI ID raahul dot KIC at YBL 8000 rupees 20 minutes back.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kic@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 13. en-15 (story) - fails 100% of 5 runs

- Reference: The number that called me was plus 91 70112 23344
- Transcript (`en-15__Neerja__r0__en`): The number that called me was plus 9 1 07:01 2 2344.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | wrong | 7011223344 | 9170122344 | 7011223344 | **asr**: value not in the transcript |

### 14. en-32 (answer:utr) - fails 100% of 5 runs

- Reference: the reference number is 6012 3456 7890
- Transcript (`en-32__Neerja__r0__en`): The reference number is 06:01 to 34567 890.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 601234567890 | - | 601234567890 | **asr**: value not in the transcript |

### 15. hi-15 (story) - fails 100% of 4 runs

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): Pahle cut gae UTR number hain chaar shoony tin, do ek aath, saat, chhah, paanch, chaar, tin, do, paanch hazaar rupe.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 16. hi-36 (answer:suspect) - fails 75% of 4 runs

- Reference: यूपीआई आईडी है sharma dot pay at paytm
- Transcript (`hi-36__Swara__r0__hi`): UPI ID hai sharma dot par at Paytm.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | sharma.pay@paytm | sharma.par@paytm | sharma.pay@paytm | **asr**: value not in the transcript |

### 17. hi-27 (answer:amount) - fails 50% of 4 runs

- Reference: उम्म... बारह सौ
- Transcript (`hi-27__Madhur__r0__hi`): Ummaaraasvaan.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 1200 | - | 1200 | **asr**: value not in the transcript |

### 18. hi-01 (story) - fails 50% of 4 runs

- Reference: मेरे अकाउंट से पाँच हज़ार रुपये कट गए, दस मिनट पहले एक आदमी ने बोला केवाईसी अपडेट करो, एसबीआई का अकाउंट है
- Transcript (`hi-01__Madhur__r0__hi`): Mere account se paanch hazaar rupe cut gae. Das minute pahle ek aadmi ne bola ki vaise hi update karo SBI ka account hai.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: केवाईसी |
