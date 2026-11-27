# Turant pipeline eval: swift35

Generated 2026-11-27T14:21:09.938Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 280 ASR transcripts scored, **1230 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 280 | 56.1 | 56.1 | 87.1 | 73.1 | 79.5 | 70.8 | 74.0 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 280 | 56.1 | 56.1 | 87.1 | 73.1 | 79.5 | 70.8 | 74.0 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 57.5% of clean runs and 57.5% of all runs fully correct. Per language (clean): hi 85%, en 68%, bn -%, ta -%, te -%, mr 15%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 86.0 | 79.6 | 82.7 | 82.7 |
| time | 113 | 100.0 | 100.0 | 100.0 | 76.2 | 67.0 | 71.3 | 71.3 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 86.2 | 92.6 | 92.6 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 98.9 | 95.7 | 97.2 | 97.2 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 74.2 | 85.2 | 85.2 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 85.7 | 28.6 | 42.9 | 42.9 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 20.0 | 15.0 | 17.1 | 17.1 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 35.5 | 52.4 | 52.4 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 40.0 | 28.6 | 33.3 | 33.3 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 71.4 | 83.3 | 83.3 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 87.1 | 73.1 | 79.5 | 79.5 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | 85.0 | - | 100.0 | 95.3 | 100.3 | 127.1 | 12.5 (n=16) |
| en | 100.0 | 64.2 | - | 100.0 | 85.2 | 30.5 | 15.9 | 37.0 (n=27) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | 15.0 | - | 100.0 | 48.8 | 117.2 | 130.0 | 0.0 (n=16) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 98.9 | 100.0 / 100.0 | 100.0 / 98.0 | 100.0 / 98.2 | 100.0 / 85.7 | 100.0 / 80.0 | 100.0 / 25.0 | 100.0 / 85.7 | 100.0 / 100.0 |
| en | 100.0 / 90.9 | 100.0 / 86.5 | 100.0 / 98.7 | 100.0 / 98.6 | 100.0 / 100.0 | 100.0 / 33.3 | 100.0 / 17.4 | 100.0 / 50.0 | 100.0 / 0.0 |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / 51.8 | 100.0 / 0.0 | 100.0 / 70.6 | 100.0 / 94.5 | 100.0 / 40.0 | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 280 | 56.1 | 79.5 | 70.8 | 74.0 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 280 | 56.1 | 79.5 | 70.8 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 40 | 65.0 | 85.7 | 31.2 | 16.5 |
| en-IN-NeerjaNeural | 40 | 67.5 | 87.0 | 29.9 | 15.3 |
| en-IN-PrabhatNeural | 40 | 60.0 | 83.0 | 30.4 | 15.7 |
| hi-IN-MadhurNeural | 40 | 82.5 | 94.9 | 100.6 | 127.1 |
| hi-IN-SwaraNeural | 40 | 87.5 | 95.7 | 100.0 | 127.2 |
| mr-IN-AarohiNeural | 40 | 15.0 | 47.6 | 117.4 | 130.3 |
| mr-IN-ManoharNeural | 40 | 15.0 | 50.0 | 117.0 | 129.8 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 280 | 56.1 | 79.5 | 70.8 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 154 | 100.0 | 50.0 | 81.6 |
| correction | 28 | 100.0 | 60.7 | 69.4 |
| answer | 91 | 100.0 | 63.7 | 72.1 |
| answer (skip intent) | 7 | 100.0 | 71.4 | 83.3 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 160 | 154 (96%) | 6 (4%) | 0 (0%) | 0 |
| clean | 160 | 154 (96%) | 6 (4%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| time | 41 | 40 | 1 | 0 |
| amount | 34 | 34 | 0 | 0 |
| suspectPhone | 20 | 20 | 0 | 0 |
| suspectUpi | 17 | 17 | 0 | 0 |
| utr | 16 | 15 | 1 | 0 |
| scamType | 12 | 12 | 0 | 0 |
| paymentApp | 8 | 8 | 0 | 0 |
| bank | 5 | 4 | 1 | 0 |
| suspectAccount | 5 | 2 | 3 | 0 |
| intent | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 12 | 12 | 0 | 0 |
| en | 48 | 43 | 5 | 0 |
| mr | 100 | 99 | 1 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | time | mr | asr | fn | 16 | mr-01 mr-02 mr-04 mr-10 mr-12 mr-13 mr-16 mr-27 |
| 2 | time | mr | asr | wrong | 16 | mr-03 mr-07 mr-11 mr-15 mr-20 mr-26 mr-28 mr-40 |
| 3 | amount | mr | asr | wrong | 14 | mr-04 mr-06 mr-07 mr-20 mr-21 mr-24 mr-25 |
| 4 | amount | mr | asr | fn | 12 | mr-03 mr-05 mr-11 mr-12 mr-18 mr-37 |
| 5 | suspectPhone | en | asr | fn | 10 | en-06 en-07 en-15 en-20 |
| 6 | scamType | mr | asr | fn | 10 | mr-01 mr-04 mr-09 mr-16 mr-18 mr-35 |
| 7 | suspectUpi | en | asr | wrong | 9 | en-09 en-19 en-33 |
| 8 | suspectPhone | mr | asr | fn | 8 | mr-09 mr-22 mr-33 mr-39 |
| 9 | utr | en | asr | fn | 7 | en-08 en-31 en-32 |
| 10 | amount | en | asr | wrong | 6 | en-12 en-13 en-17 en-22 en-24 |
| 11 | paymentApp | mr | asr | fn | 6 | mr-02 mr-04 mr-20 |
| 12 | utr | mr | asr | fn | 6 | mr-14 mr-31 mr-32 |
| 13 | time | en | asr | wrong | 4 | en-03 en-26 en-40 |
| 14 | suspectUpi | mr | asr | fn | 4 | mr-10 mr-34 |
| 15 | suspectUpi | hi | asr | wrong | 3 | hi-10 hi-36 |
| 16 | time | en | asr | fp | 3 | en-19 |
| 17 | suspectAccount | en | extractor_form | wrong | 3 | en-21 |
| 18 | utr | hi | asr | fn | 2 | hi-15 |
| 19 | suspectPhone | hi | asr | fn | 2 | hi-23 |
| 20 | paymentApp | hi | asr | fn | 2 | hi-24 |
| 21 | suspectAccount | mr | asr | fn | 2 | mr-19 |
| 22 | intent | mr | asr | fn | 2 | mr-36 |
| 23 | scamType | hi | asr | fn | 1 | hi-01 |
| 24 | bank | hi | asr | fn | 1 | hi-12 |
| 25 | amount | hi | asr | fn | 1 | hi-27 |
| 26 | scamType | en | asr | fn | 1 | en-02 |
| 27 | bank | en | asr | fn | 1 | en-10 |
| 28 | utr | en | extractor_form | fp | 1 | en-15 |
| 29 | time | en | asr | fn | 1 | en-22 |
| 30 | time | en | extractor_form | wrong | 1 | en-28 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. mr-04 (story) - fails 100% of 2 runs

- Reference: एकाने सांगितलं चुकून पैसे पाठवले, परत पाठवा, मी गूगल पे वरून बारा हजार पाचशे रुपये पाठवले, दोन तासांपूर्वी
- Transcript (`mr-04__Aarohi__r0__mr`): Aikaani sangitla chookun paise paathavle, parth paathava, meagoogal par varun baarah hazaar paanch se rupe paathavle, don'taasaanpurvi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12500 | 12005 | 12500 | **asr**: value not in the transcript |
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: दोन तासांपूर्वी |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: चुकून |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: गूगल पे |

### 2. en-19 (story) - fails 100% of 3 runs

- Reference: The UPI ID was sharma123 at paytm, I sent him three thousand five hundred
- Transcript (`en-19__Neerja__r0__en`): The UPI ID was sharma 01:23 at Paytm. I sent him 3500.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 13:23 (1357 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | wrong | sharma123@paytm | 23@paytm | sharma123@paytm | **asr**: value not in the transcript |

### 3. mr-20 (story) - fails 100% of 2 runs

- Reference: म्हणजे... काल दुपारी अडीच वाजता फोनपे वरून दोन हजार सहाशे रुपये गेले
- Transcript (`mr-20__Aarohi__r0__mr`): Manje, kal doopaari adhik vaajata phone par varun don hazaar sahaashay rupe ke lie.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2600 | 2000 | 2600 | **asr**: value not in the transcript |
| time | wrong | -1d 14:30 (1290 min ago) | -1d 12:00 (1440 min ago) | -1d 14:30 (1290 min ago) | **asr**: ASR lost/changed: अडीच वाजता |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: फोनपे |

### 4. mr-16 (story) - fails 100% of 2 runs

- Reference: माझ्या account मधून 20,000 rupees debit झाले, ICICI bank, एक तासापूर्वी customer care ला फोन केला होता
- Transcript (`mr-16__Aarohi__r0__mr`): Maja account madhun bis hazaar roopij debit jha le ICI C I bank ek taaza poorvi customer kerla phone kerla hota.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: तासापूर्वी |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: care |
| bank | fn | ICICI Bank | - | ICICI Bank | **extractor_form**: key words survive (ICICI) but the extractor fails |

### 5. en-15 (story) - fails 100% of 3 runs

- Reference: The number that called me was plus 91 70112 23344
- Transcript (`en-15__Neerja__r0__en`): The number that called me was plus 9 1 07:01 2 2344.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |

### 6. mr-01 (story) - fails 100% of 2 runs

- Reference: माझ्या SBI खात्यातून पाच हजार रुपये कापले गेले, दहा मिनिटांपूर्वी एका माणसाने KYC अपडेट करायला सांगितले
- Transcript (`mr-01__Aarohi__r0__mr`): Maja SBI khaadyatoon paanch hazaar rupe kaaple gale, dahaan minitaanpurvin ekaansa ne update karaila sangit le.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: मिनिटांपूर्वी |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 7. mr-02 (story) - fails 100% of 2 runs

- Reference: दादा लवकर, माझ्या खात्यातून साडेतीन हजार रुपये गेले, फोनपे वरून, आत्ताच झालं
- Transcript (`mr-02__Aarohi__r0__mr`): Daada lauka maja khaatiyaatun saadhe tin hazaar rupe ke lie phone par varun aatachhaala.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: आत्ताच |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: फोनपे |

### 8. mr-03 (story) - fails 100% of 2 runs

- Reference: काल संध्याकाळी सात वाजता कस्टमर केअरमधून फोन आला, AnyDesk इन्स्टॉल करायला सांगितलं, मग एचडीएफसी खात्यातून दोन लाख रुपये काढले
- Transcript (`mr-03__Aarohi__r0__mr`): Kaal sandhyaakaari saat vaajata customer care madhun phone aala. Any desk install karaala sangitla. Mag HDFC khaate tum don't laakh rupe kaadle.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: संध्याकाळी |

### 9. en-07 (story) - fails 100% of 3 runs

- Reference: The caller's number was nine double eight seven six five four three two one, he asked for the OTP and I gave it
- Transcript (`en-07__Neerja__r0__en`): The caller's number was 9 double 8754321. He asked for the OTP and I gave it.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9887654321 | - | 9887654321 | **asr**: value not in the transcript |

### 10. en-09 (story) - fails 100% of 3 runs

- Reference: I paid to the UPI ID rahul dot kyc at ybl, eight thousand rupees, twenty minutes back
- Transcript (`en-09__Neerja__r0__en`): I paid to the UPI ID raahul dot KIC at YBL 8000 rupees 20 minutes back.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kic@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 11. en-21 (story) - fails 100% of 3 runs

- Reference: I sent money to account number 5 0 1 0 0 2 3 4 5 6 7 8 1 2, IFSC SBIN0001234, around four thousand rupees
- Transcript (`en-21__Neerja__r0__en`): I sent money to account number 05:01 0 02:34567812 IFSC's been 001234 around 4000 rupees.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectAccount | wrong | 50100234567812 | 050100234567812 | 50100234567812 | **extractor_form**: value is in the transcript but not parsed |

### 12. en-31 (answer:utr) - fails 100% of 3 runs

- Reference: Your A/c XX4321 has been debited via UPI. UPI Ref No 4 5 6 7 8 9 0 1 2 3 4 5. Not you? Call your bank.
- Transcript (`en-31__Neerja__r0__en`): Your ACXX 4321 has been debated by UPI. UPI refer number 45678 08:01 2 345. Not you, call your bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 456789012345 | - | 456789012345 | **asr**: value not in the transcript |

### 13. hi-10 (story) - fails 100% of 2 runs

- Reference: मैंने यूपीआई आईडी rahul dot kyc at ybl पर आठ हज़ार रुपये भेजे, बीस मिनट पहले
- Transcript (`hi-10__Madhur__r0__hi`): Mainne UPI ID raahul dot KYC at YBL par aath hazaar rupe bhejen bis minute pahle.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kyc@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 14. hi-15 (story) - fails 100% of 2 runs

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): Pahle cut gae UTR number hain chaar shoony tin, do ek aath, saat, chhah, paanch, chaar, tin, do, paanch hazaar rupe.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 15. hi-23 (correction) - fails 100% of 2 runs

- Reference: नंबर गलत है, 9 8 1 1 1 2 2 2 3 3 था
- Transcript (`hi-23__Madhur__r0__hi`): Number galat hai nau aath ek ek ek do do tin tin tha.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 16. hi-24 (story) - fails 100% of 2 runs

- Reference: कल दोपहर करीब ढाई बजे फोन पे से छब्बीस सौ रुपये गए
- Transcript (`hi-24__Madhur__r0__hi`): Kal dophar karib dhai baje phone par se chhabbis sau rupe gae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: फोन पे से |

### 17. hi-01 (story) - fails 50% of 2 runs

- Reference: मेरे अकाउंट से पाँच हज़ार रुपये कट गए, दस मिनट पहले एक आदमी ने बोला केवाईसी अपडेट करो, एसबीआई का अकाउंट है
- Transcript (`hi-01__Madhur__r0__hi`): Mere account se paanch hazaar rupe cut gae. Das minute pahle ek aadmi ne bola ki vaise hi update karo SBI ka account hai.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: केवाईसी |

### 18. hi-12 (story) - fails 50% of 2 runs

- Reference: ढाई हज़ार रुपये कटे, आधा घंटा पहले, केनरा बैंक
- Transcript (`hi-12__Madhur__r0__hi`): Dhai hazaar rupe kate aadha ghanta pahle kendr bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: केनरा |
