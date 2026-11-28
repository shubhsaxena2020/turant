# Turant pipeline eval: mrcmpu_mrsmall58

Generated 2026-11-28T02:15:53.487Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 160 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 0 | - | - | - | - | - | - | - |
| ASR noise 15 dB | 40 | 15.0 | 15.0 | 58.1 | 31.3 | 40.7 | 67.2 | 47.4 |
| ASR noise 5 dB | 40 | 12.5 | 12.5 | 56.3 | 22.5 | 32.1 | 74.8 | 54.4 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 160 | 15.0 | 15.0 | 63.0 | 32.5 | 42.9 | 69.2 | 47.0 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): -% of clean runs and 18.1% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | - | - | - | 30.1 |
| time | 113 | 100.0 | 100.0 | 100.0 | - | - | - | 50.4 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | - | - | - | 59.7 |
| bank | 97 | 100.0 | 100.0 | 100.0 | - | - | - | 58.5 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 47.6 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 85.7 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | - | - | - | 42.9 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | 12.5 | 100.0 | - | - | - | - (n=0) |
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
| babble 15 dB | 17 | 23.5 | 44.9 | 66.9 | 65.3 |
| babble 5 dB | 17 | 11.8 | 32.6 | 85.8 | 80.6 |
| clean | 80 | 16.3 | 48.8 | 67.4 | 43.0 |
| pink 15 dB | 11 | 9.1 | 34.5 | 78.8 | 51.8 |
| pink 5 dB | 11 | 9.1 | 8.0 | 82.6 | 57.7 |
| traffic 15 dB | 12 | 8.3 | 40.0 | 57.7 | 27.7 |
| traffic 5 dB | 12 | 16.7 | 45.5 | 57.7 | 27.5 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 16.3 | 48.8 | 67.4 |
| 15 dB | 40 | 15.0 | 40.7 | 67.2 |
| 5 dB | 40 | 12.5 | 32.1 | 74.8 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 16.3 | 48.8 | 67.4 |

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
| all forced-language runs | 219 | 195 (89%) | 24 (11%) | 0 (0%) | 0 |
| clean | 100 | 86 (86%) | 14 (14%) | 0 (0%) | 0 |
| 15 dB | 56 | 51 (91%) | 5 (9%) | 0 (0%) | 0 |
| 5 dB | 63 | 58 (92%) | 5 (8%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 73 | 73 | 0 | 0 |
| time | 35 | 25 | 10 | 0 |
| bank | 32 | 25 | 7 | 0 |
| scamType | 27 | 22 | 5 | 0 |
| suspectPhone | 16 | 16 | 0 | 0 |
| utr | 12 | 12 | 0 | 0 |
| paymentApp | 11 | 10 | 1 | 0 |
| suspectUpi | 8 | 8 | 0 | 0 |
| suspectAccount | 4 | 4 | 0 | 0 |
| intent | 1 | 0 | 1 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| mr | 219 | 195 | 24 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | mr | asr | fn | 39 | mr-02 mr-04 mr-05 mr-06 mr-08 mr-10 mr-12 mr-13 +10 |
| 2 | amount | mr | asr | wrong | 34 | mr-01 mr-02 mr-04 mr-05 mr-07 mr-10 mr-15 mr-20 +7 |
| 3 | bank | mr | asr | fn | 24 | mr-01 mr-11 mr-12 mr-13 mr-16 mr-30 mr-17 mr-18 +3 |
| 4 | scamType | mr | asr | fn | 19 | mr-03 mr-04 mr-08 mr-09 mr-16 mr-35 |
| 5 | time | mr | asr | wrong | 16 | mr-03 mr-07 mr-15 mr-20 mr-26 mr-11 |
| 6 | suspectPhone | mr | asr | fn | 16 | mr-09 mr-22 mr-33 mr-39 |
| 7 | utr | mr | asr | fn | 12 | mr-14 mr-31 mr-32 |
| 8 | paymentApp | mr | asr | fn | 10 | mr-02 mr-04 mr-08 mr-20 |
| 9 | time | mr | asr | fn | 9 | mr-10 mr-01 mr-02 mr-04 mr-13 mr-27 |
| 10 | suspectUpi | mr | asr | fn | 8 | mr-10 mr-34 |
| 11 | bank | mr | extractor_form | fn | 6 | mr-03 mr-18 mr-21 |
| 12 | time | mr | extractor_form | wrong | 6 | mr-12 mr-20 mr-26 mr-40 |
| 13 | scamType | mr | extractor_form | fn | 5 | mr-07 mr-09 |
| 14 | time | mr | extractor_form | fn | 4 | mr-10 mr-27 mr-01 mr-16 |
| 15 | suspectAccount | mr | asr | fn | 4 | mr-19 |
| 16 | scamType | mr | asr | fp | 3 | mr-10 |
| 17 | paymentApp | mr | extractor_form | fn | 1 | mr-08 |
| 18 | intent | mr | extractor_form | fn | 1 | mr-36 |
| 19 | bank | mr | extractor_form | wrong | 1 | mr-38 |
| 20 | bank | mr | asr | wrong | 1 | mr-16 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. mr-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__GiuseppeMultilingual__r0__mr`): उपीअई आईदी राहुल डॉकगागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागागाग

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: मिनिटांपूर्वी |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 2. mr-04 (story) - fails 100% of 4 runs

- Reference: एकाने सांगितलं चुकून पैसे पाठवले, परत पाठवा, मी गूगल पे वरून बारा हजार पाचशे रुपये पाठवले, दोन तासांपूर्वी
- Transcript (`mr-04__GiuseppeMultilingual__r0__mr`): एकाने सांगितलंचुकून पैसे पाठवले; परत पाठवा मी गुगलपेवरून बारा हजार पाचे रूपे पाठवले दोन तासाम पूर्वी.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12500 | 1000 | 12500 | **asr**: value not in the transcript |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: गूगल |

### 3. mr-07 (story) - fails 100% of 4 runs

- Reference: एक क्यूआर कोड पाठवला आणि स्कॅन करा पैसे मिळतील म्हणाले, स्कॅन केल्यावर ₹4,999 कापले गेले, आज सकाळी साडेदहा वाजता
- Transcript (`mr-07__RemyMultilingual__r0__mr`): एक क्युवार कोट पाठवला आणि स्क्न करा पैसेमी तील म्हणाले स्क्न केल्यावर चार हजार नौसोनियाणवे रूपे कापले गेले, आज सकाय साडे धावाजता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 4000 | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: साडेदहा |
| scamType | fn | qr_scan | - | qr_scan | **extractor_form**: near-spelling variant of: स्कॅन |

### 4. mr-16 (story) - fails 100% of 4 runs

- Reference: माझ्या account मधून 20,000 rupees debit झाले, ICICI bank, एक तासापूर्वी customer care ला फोन केला होता
- Transcript (`mr-16__GiuseppeMultilingual__r0__mr`): माझ्या अकाँट मधून बीस हजार रुपीस द्याबिज्याले आय आय आय आय बँक एक तासापूर्वी कस्त्मकेला फोन केला होता.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 5. mr-08 (story) - fails 100% of 4 runs

- Reference: एक व्हिडिओ कॉल आला, रेकॉर्ड करून आता ब्लॅकमेल करत आहेत, पेटीएमवरून पंधरा हजार रुपये दिले
- Transcript (`mr-08__GiuseppeMultilingual__r0__mr`): एक विडियो कॉल आला रेकॉर्ट करून आता बलकमेल करत आहेत पेटी येमवरून पंदरा हजार रूपे दिले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ब्लॅकमेल |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: near-spelling variant of: पेटीएमवरून |

### 6. mr-13 (story) - fails 100% of 4 runs

- Reference: माझे १५००० रुपये गेले, ॲक्सिस बँक, ३ दिवसांपूर्वी
- Transcript (`mr-13__RemyMultilingual__r0__mr`): माझे पंद्र हजार रूपे गेले क्सिस्बंक तीन दिवसाम पूर्वी.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| bank | fn | Axis Bank | - | Axis Bank | **asr**: ASR lost/changed: ॲक्सिस |
