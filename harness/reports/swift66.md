# Turant pipeline eval: swift66

Generated 2026-11-28T11:23:21.035Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 520 ASR transcripts scored, **990 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 280 | 73.6 | 73.6 | 93.2 | 86.2 | 89.6 | 70.8 | 74.0 |
| ASR noise 15 dB | 120 | 61.7 | 61.7 | 92.2 | 77.6 | 84.3 | 79.9 | 86.0 |
| ASR noise 5 dB | 120 | 39.2 | 40.0 | 78.7 | 58.8 | 67.3 | 87.2 | 90.0 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 520 | 62.9 | 63.1 | 90.1 | 77.9 | 83.6 | 76.6 | 80.4 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 73.9% of clean runs and 63.8% of all runs fully correct. Per language (clean): hi 90%, en 77%, bn -%, ta -%, te -%, mr 54%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 92.5 | 92.0 | 92.3 | 86.8 |
| time | 113 | 100.0 | 100.0 | 100.0 | 91.8 | 87.8 | 89.8 | 81.7 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 87.4 | 93.3 | 88.9 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 98.9 | 97.8 | 98.4 | 92.3 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 92.5 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 82.4 | 66.7 | 73.7 | 70.6 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 43.8 | 35.0 | 38.9 | 24.6 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 87.5 | 45.2 | 59.6 | 63.6 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 71.4 | 83.3 | 60.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 81.8 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 93.2 | 86.2 | 89.6 | 83.6 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | 90.0 | 55.0 | 100.0 | 96.6 | 100.3 | 127.1 | 12.5 (n=16) |
| en | 100.0 | 75.8 | 32.5 | 100.0 | 89.6 | 30.5 | 15.9 | 37.0 (n=27) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | 53.8 | 30.0 | 100.0 | 81.8 | 117.2 | 130.0 | 0.0 (n=16) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 98.9 | 100.0 / 100.0 | 100.0 / 98.0 | 100.0 / 98.2 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 25.0 | 100.0 / 85.7 | 100.0 / 100.0 |
| en | 100.0 / 92.4 | 100.0 / 89.1 | 100.0 / 98.7 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 73.7 | 100.0 / 50.0 | 100.0 / 45.5 | 100.0 / 100.0 |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / 85.4 | 100.0 / 80.0 | 100.0 / 74.3 | 100.0 / 96.4 | 100.0 / 100.0 | 100.0 / 28.6 | 100.0 / - | 100.0 / 54.5 | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 47 | 53.2 | 79.5 | 82.5 | 88.2 |
| babble 5 dB | 47 | 17.0 | 46.4 | 102.7 | 100.1 |
| clean | 280 | 73.6 | 89.6 | 70.8 | 74.0 |
| pink 15 dB | 41 | 61.0 | 84.1 | 89.9 | 98.6 |
| pink 5 dB | 41 | 36.6 | 68.5 | 91.8 | 99.2 |
| traffic 15 dB | 32 | 75.0 | 90.6 | 64.0 | 68.2 |
| traffic 5 dB | 32 | 75.0 | 90.6 | 63.5 | 66.6 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 280 | 73.6 | 89.6 | 70.8 |
| 15 dB | 120 | 61.7 | 84.3 | 79.9 |
| 5 dB | 120 | 39.2 | 67.3 | 87.2 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 40 | 75.0 | 89.0 | 31.2 | 16.5 |
| en-IN-NeerjaNeural | 40 | 80.0 | 91.5 | 29.9 | 15.3 |
| en-IN-PrabhatNeural | 40 | 72.5 | 88.2 | 30.4 | 15.7 |
| hi-IN-MadhurNeural | 40 | 87.5 | 96.3 | 100.6 | 127.1 |
| hi-IN-SwaraNeural | 40 | 92.5 | 96.9 | 100.0 | 127.2 |
| mr-IN-AarohiNeural | 40 | 67.5 | 89.9 | 117.4 | 130.3 |
| mr-IN-ManoharNeural | 40 | 40.0 | 73.2 | 117.0 | 129.8 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 280 | 73.6 | 89.6 | 70.8 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 154 | 100.0 | 68.8 | 91.2 |
| correction | 28 | 100.0 | 82.1 | 86.8 |
| answer | 91 | 100.0 | 76.9 | 81.8 |
| answer (skip intent) | 7 | 100.0 | 100.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 247 | 239 (97%) | 8 (3%) | 0 (0%) | 0 |
| clean | 82 | 80 (98%) | 2 (2%) | 0 (0%) | 0 |
| 15 dB | 58 | 55 (95%) | 3 (5%) | 0 (0%) | 0 |
| 5 dB | 107 | 104 (97%) | 3 (3%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| time | 50 | 48 | 2 | 0 |
| amount | 47 | 46 | 1 | 0 |
| scamType | 33 | 32 | 1 | 0 |
| suspectUpi | 29 | 29 | 0 | 0 |
| suspectPhone | 29 | 29 | 0 | 0 |
| bank | 24 | 22 | 2 | 0 |
| utr | 16 | 15 | 1 | 0 |
| paymentApp | 8 | 8 | 0 | 0 |
| suspectAccount | 7 | 6 | 1 | 0 |
| intent | 4 | 4 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 40 | 39 | 1 | 0 |
| en | 78 | 72 | 6 | 0 |
| mr | 129 | 128 | 1 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | mr | asr | fn | 21 | mr-01 mr-04 mr-16 mr-18 mr-35 mr-06 mr-09 |
| 2 | time | mr | asr | fn | 17 | mr-02 mr-12 mr-13 mr-16 mr-01 mr-04 mr-10 mr-15 +1 |
| 3 | amount | mr | asr | wrong | 17 | mr-04 mr-06 mr-07 mr-21 mr-24 mr-02 mr-14 mr-16 +2 |
| 4 | suspectPhone | en | asr | fn | 13 | en-06 en-07 en-15 en-20 |
| 5 | amount | en | asr | wrong | 13 | en-13 en-17 en-22 en-24 en-03 en-12 en-23 |
| 6 | time | mr | asr | wrong | 13 | mr-07 mr-11 mr-26 mr-28 mr-04 mr-12 mr-40 |
| 7 | suspectPhone | mr | asr | fn | 11 | mr-09 mr-22 mr-33 mr-39 |
| 8 | utr | mr | asr | fn | 10 | mr-14 mr-31 mr-32 |
| 9 | bank | mr | asr | fn | 10 | mr-17 mr-06 mr-12 mr-13 mr-18 mr-21 |
| 10 | suspectUpi | en | asr | wrong | 9 | en-09 en-33 en-19 |
| 11 | suspectUpi | mr | asr | fn | 8 | mr-10 mr-34 |
| 12 | amount | mr | asr | fn | 8 | mr-11 mr-06 mr-10 mr-15 mr-18 |
| 13 | bank | hi | asr | fn | 7 | hi-12 hi-11 hi-19 hi-22 hi-31 hi-32 |
| 14 | time | en | asr | wrong | 7 | en-03 en-26 en-40 |
| 15 | scamType | hi | asr | fn | 6 | hi-01 hi-18 hi-22 hi-37 |
| 16 | suspectUpi | hi | asr | wrong | 5 | hi-10 hi-36 |
| 17 | suspectUpi | en | asr | fn | 5 | en-19 en-33 en-39 |
| 18 | suspectAccount | mr | asr | fn | 4 | mr-19 |
| 19 | bank | en | asr | fn | 4 | en-03 en-10 en-29 en-30 |
| 20 | paymentApp | en | asr | fn | 4 | en-04 en-11 en-18 |
| 21 | amount | hi | asr | fn | 3 | hi-27 hi-39 |
| 22 | suspectPhone | en | asr | wrong | 3 | en-15 en-34 |
| 23 | time | en | asr | fn | 3 | en-22 |
| 24 | utr | en | asr | wrong | 3 | en-31 |
| 25 | time | hi | asr | wrong | 3 | hi-24 hi-28 hi-30 |
| 26 | paymentApp | mr | asr | fn | 3 | mr-02 mr-20 |
| 27 | suspectPhone | hi | asr | fn | 2 | hi-23 |
| 28 | scamType | en | asr | fn | 2 | en-02 en-11 |
| 29 | time | en | extractor_form | wrong | 2 | en-28 |
| 30 | scamType | hi | asr | fp | 2 | hi-10 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. mr-04 (story) - fails 100% of 4 runs

- Reference: एकाने सांगितलं चुकून पैसे पाठवले, परत पाठवा, मी गूगल पे वरून बारा हजार पाचशे रुपये पाठवले, दोन तासांपूर्वी
- Transcript (`mr-04__Aarohi__r0__mr`): Aikaani sangitla chookun paise paathavle, parth paathava, meagoogal par varun baarah hazaar paanch se rupe paathavle, don'taasaanpurvi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: चुकून |

### 2. mr-16 (story) - fails 100% of 4 runs

- Reference: माझ्या account मधून 20,000 rupees debit झाले, ICICI bank, एक तासापूर्वी customer care ला फोन केला होता
- Transcript (`mr-16__Aarohi__r0__mr`): Maja account madhun bis hazaar roopij debit jha le ICI C I bank ek taaza poorvi customer kerla phone kerla hota.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: care |

### 3. mr-18 (story) - fails 100% of 4 runs

- Reference: अडीच लाख रुपये गुंतवणुकीच्या नावाखाली घेतले, पैसे दुप्पट होतील म्हणाले, येस बँक
- Transcript (`mr-18__Aarohi__r0__mr`): Aditi laakh rupe guntamron ki chaar nava khaali ghitle. Paise duphar hoti bana len. Yes, bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: दुप्पट |

### 4. en-33 (answer:suspect) - fails 100% of 5 runs

- Reference: rahul dot kyc at ybl
- Transcript (`en-33__Neerja__r0__en`): Raahul dot KYC at YBL.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kyc@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 5. mr-06 (story) - fails 100% of 4 runs

- Reference: टेलिग्रामवर पार्ट टाइम जॉबचे टास्क दिले, मग गुंतवणूक करायला सांगितली, मी सत्तेचाळीस हजार रुपये भरले, कोटक बँकेतून
- Transcript (`mr-06__Aarohi__r0__mr`): Telegram var paath time job se task dile, main guntanon karaayla sangit li. Mere saty chaalis hazaar rupe bhar le kotak bankar.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 47000 | 40000 | 47000 | **asr**: value not in the transcript |

### 6. mr-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__Aarohi__r0__mr`): ID raahul D0T at var aath hazaar rupe paathavle bis minute aappur bhi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 7. hi-10 (story) - fails 100% of 4 runs

- Reference: मैंने यूपीआई आईडी rahul dot kyc at ybl पर आठ हज़ार रुपये भेजे, बीस मिनट पहले
- Transcript (`hi-10__Madhur__r0__hi`): Mainne UPI ID raahul dot KYC at YBL par aath hazaar rupe bhejen bis minute pahle.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kyc@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 8. en-15 (story) - fails 100% of 5 runs

- Reference: The number that called me was plus 91 70112 23344
- Transcript (`en-15__Neerja__r0__en`): The number that called me was plus 9 1 07:01 2 2344.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | wrong | 7011223344 | 9170122344 | 7011223344 | **asr**: value not in the transcript |

### 9. mr-01 (story) - fails 100% of 4 runs

- Reference: माझ्या SBI खात्यातून पाच हजार रुपये कापले गेले, दहा मिनिटांपूर्वी एका माणसाने KYC अपडेट करायला सांगितले
- Transcript (`mr-01__Aarohi__r0__mr`): Maja SBI khaadyatoon paanch hazaar rupe kaaple gale, dahaan minitaanpurvin ekaansa ne update karaila sangit le.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 10. en-07 (story) - fails 100% of 5 runs

- Reference: The caller's number was nine double eight seven six five four three two one, he asked for the OTP and I gave it
- Transcript (`en-07__Neerja__r0__en`): The caller's number was 9 double 8754321. He asked for the OTP and I gave it.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9887654321 | - | 9887654321 | **asr**: value not in the transcript |

### 11. en-09 (story) - fails 100% of 5 runs

- Reference: I paid to the UPI ID rahul dot kyc at ybl, eight thousand rupees, twenty minutes back
- Transcript (`en-09__Neerja__r0__en`): I paid to the UPI ID raahul dot KIC at YBL 8000 rupees 20 minutes back.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kic@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 12. en-13 (story) - fails 80% of 5 runs

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__Prabhat__r0__en`): Kal raat saadhe nau baje kisi ne call kiya bola bijli ka bill pending hai. Link par click kiya aur nau hazaar nau south ninyaanve rupe kaat gae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 9999 | 99 | 9999 | **asr**: value not in the transcript |

### 13. hi-36 (answer:suspect) - fails 75% of 4 runs

- Reference: यूपीआई आईडी है sharma dot pay at paytm
- Transcript (`hi-36__Swara__r0__hi`): UPI ID hai sharma dot par at Paytm.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | sharma.pay@paytm | sharma.par@paytm | sharma.pay@paytm | **asr**: value not in the transcript |

### 14. en-03 (story) - fails 60% of 5 runs

- Reference: Sir please help, I got a call from customer care, they made me install AnyDesk and two lakh rupees are gone from my ICICI account, this happened yesterday at 7 pm.
- Transcript (`en-03__NeerjaExpressive__r0__en`): Sub please help. I got a call from customer care. They made me install any desk and to lock rupees are gone from my ICICI account. This happened yesterday at 07:00.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 07:00 (1740 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: pm. |

### 15. hi-27 (answer:amount) - fails 50% of 4 runs

- Reference: उम्म... बारह सौ
- Transcript (`hi-27__Madhur__r0__hi`): Ummaaraasvaan.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 1200 | - | 1200 | **asr**: value not in the transcript |

### 16. hi-01 (story) - fails 50% of 4 runs

- Reference: मेरे अकाउंट से पाँच हज़ार रुपये कट गए, दस मिनट पहले एक आदमी ने बोला केवाईसी अपडेट करो, एसबीआई का अकाउंट है
- Transcript (`hi-01__Madhur__r0__hi`): Mere account se paanch hazaar rupe cut gae. Das minute pahle ek aadmi ne bola ki vaise hi update karo SBI ka account hai.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: केवाईसी |

### 17. hi-12 (story) - fails 50% of 4 runs

- Reference: ढाई हज़ार रुपये कटे, आधा घंटा पहले, केनरा बैंक
- Transcript (`hi-12__Madhur__r0__hi`): Dhai hazaar rupe kate aadha ghanta pahle kendr bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: केनरा |

### 18. hi-23 (correction) - fails 50% of 4 runs

- Reference: नंबर गलत है, 9 8 1 1 1 2 2 2 3 3 था
- Transcript (`hi-23__Madhur__r0__hi`): Number galat hai nau aath ek ek ek do do tin tin tha.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |
