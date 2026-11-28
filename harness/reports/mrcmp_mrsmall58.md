# Turant pipeline eval: mrcmp_mrsmall58

Generated 2026-11-28T02:05:04.853Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 80 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 80 | 28.8 | 28.8 | 81.6 | 50.0 | 62.0 | 58.5 | 32.8 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 80 | 28.8 | 28.8 | 81.6 | 50.0 | 62.0 | 58.5 | 32.8 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 36.3% of clean runs and 36.3% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr 36%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 78.0 | 66.7 | 71.9 | 71.9 |
| time | 113 | 100.0 | 100.0 | 100.0 | 68.0 | 53.1 | 59.6 | 59.6 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 54.5 | 70.6 | 70.6 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 93.3 | 50.0 | 65.1 | 65.1 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 81.6 | 50.0 | 62.0 | 62.0 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | 28.8 | - | 100.0 | 62.0 | 58.5 | 32.8 | 0.0 (n=16) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / 71.9 | 100.0 / 59.6 | 100.0 / 70.6 | 100.0 / 65.1 | 100.0 / 66.7 | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 80 | 28.8 | 62.0 | 58.5 | 32.8 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 28.8 | 62.0 | 58.5 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| mr-IN-AarohiNeural | 40 | 30.0 | 60.3 | 56.7 | 33.2 |
| mr-IN-ManoharNeural | 40 | 27.5 | 63.6 | 60.3 | 32.4 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 28.8 | 62.0 | 58.5 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 44 | 100.0 | 20.5 | 64.3 |
| answer | 26 | 100.0 | 34.6 | 50.0 |
| answer (skip intent) | 2 | 100.0 | 50.0 | 66.7 |
| correction | 8 | 100.0 | 50.0 | 66.7 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 80 | 70 (88%) | 10 (13%) | 0 (0%) | 0 |
| clean | 80 | 70 (88%) | 10 (13%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 16 | 16 | 0 | 0 |
| time | 15 | 13 | 2 | 0 |
| bank | 14 | 9 | 5 | 0 |
| scamType | 10 | 10 | 0 | 0 |
| suspectPhone | 8 | 8 | 0 | 0 |
| utr | 6 | 6 | 0 | 0 |
| paymentApp | 4 | 2 | 2 | 0 |
| suspectUpi | 4 | 4 | 0 | 0 |
| suspectAccount | 2 | 2 | 0 | 0 |
| intent | 1 | 0 | 1 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| mr | 80 | 70 | 10 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | mr | asr | fn | 10 | mr-01 mr-03 mr-07 mr-08 mr-09 mr-16 |
| 2 | amount | mr | asr | wrong | 9 | mr-04 mr-07 mr-20 mr-21 mr-24 |
| 3 | bank | mr | asr | fn | 8 | mr-01 mr-11 mr-12 mr-16 mr-30 |
| 4 | time | mr | asr | wrong | 8 | mr-07 mr-15 mr-20 mr-26 mr-28 |
| 5 | suspectPhone | mr | asr | fn | 8 | mr-09 mr-22 mr-33 mr-39 |
| 6 | amount | mr | asr | fn | 7 | mr-02 mr-11 mr-13 mr-15 mr-16 |
| 7 | utr | mr | asr | fn | 6 | mr-14 mr-31 mr-32 |
| 8 | time | mr | asr | fn | 5 | mr-02 mr-10 mr-13 mr-27 |
| 9 | bank | mr | extractor_form | fn | 5 | mr-11 mr-17 mr-21 mr-38 |
| 10 | suspectUpi | mr | asr | fn | 4 | mr-10 mr-34 |
| 11 | time | mr | extractor_form | fn | 2 | mr-01 mr-10 |
| 12 | paymentApp | mr | asr | fn | 2 | mr-04 |
| 13 | paymentApp | mr | extractor_form | fn | 2 | mr-08 |
| 14 | suspectAccount | mr | asr | fn | 2 | mr-19 |
| 15 | bank | mr | asr | wrong | 1 | mr-03 |
| 16 | intent | mr | extractor_form | fn | 1 | mr-36 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. mr-07 (story) - fails 100% of 2 runs

- Reference: एक क्यूआर कोड पाठवला आणि स्कॅन करा पैसे मिळतील म्हणाले, स्कॅन केल्यावर ₹4,999 कापले गेले, आज सकाळी साडेदहा वाजता
- Transcript (`mr-07__Aarohi__r0__mr`): एक क्युवार कोड पाठवला आणि स्क्यान करा पैसे मिळतील म्हणाले, स्क्यान केल्यावर चार हजार नवशे नव्यानव रूपे कापले गेले, आज सकारी साढेधा वाजता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4000 | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: साडेदहा |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: स्कॅन |

### 2. mr-16 (story) - fails 100% of 2 runs

- Reference: माझ्या account मधून 20,000 rupees debit झाले, ICICI bank, एक तासापूर्वी customer care ला फोन केला होता
- Transcript (`mr-16__Aarohi__r0__mr`): माझ्या अकांटमधून विस हजाले आय यिष आय बँक एक तासापूर्वी कुस्त्मर केला फोन केला होता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 3. mr-01 (story) - fails 100% of 2 runs

- Reference: माझ्या SBI खात्यातून पाच हजार रुपये कापले गेले, दहा मिनिटांपूर्वी एका माणसाने KYC अपडेट करायला सांगितले
- Transcript (`mr-01__Aarohi__r0__mr`): माझ्या एसभी आई खात्यातून पाच हजार रूपे कापले गेले, दहा मिनेटांपूर्वी एका मानसाने अपनेट करायला सांधितले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **extractor_form**: near-spelling variant of: मिनिटांपूर्वी |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 4. mr-04 (story) - fails 100% of 2 runs

- Reference: एकाने सांगितलं चुकून पैसे पाठवले, परत पाठवा, मी गूगल पे वरून बारा हजार पाचशे रुपये पाठवले, दोन तासांपूर्वी
- Transcript (`mr-04__Aarohi__r0__mr`): एकाने सांगितल्य चुकून पैसे पाठवले पर्त पाठवा मी गुगलपेवरून बारा हजार पाठशे रूपे पाठवले दोन तासाम पूर्वी.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12500 | 12000 | 12500 | **asr**: value not in the transcript |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: गूगल |

### 5. mr-10 (story) - fails 100% of 2 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__Aarohi__r0__mr`): आईडी राहुल डिओटी अट वर आठ हजार रुपे पाठवले, विस मिनेताम कुर्वी.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: मिनिटांपूर्वी |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 6. mr-15 (story) - fails 100% of 2 runs

- Reference: तो म्हणाला मी आर्मीत आहे, सामान विकायचंय, ॲडव्हान्स पाठवा, मी नऊ हजार रुपये पाठवले, आज सकाळी नऊ वाजता
- Transcript (`mr-15__Aarohi__r0__mr`): तो म्हणाला मी आर्मित आहे, सामान विकायचन्य, अडवान्स पाठवा मी नवू हजार रूपे पाठवले आज सकारी नवू वाजता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9000 | - | 9000 | **asr**: value not in the transcript |
| time | wrong | today 09:00 (180 min ago) | today 12:00 (0 min ago) | today 09:00 (180 min ago) | **asr**: ASR lost/changed: नऊ |
