# Turant pipeline eval: blind_swift35

Generated 2026-11-27T14:34:04.970Z. Extractor: `..\prototype\src\lib\extract.ts`. 84 cases, 84 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 84 | 90.5 | 90.5 | 97.4 | 94.3 | 95.8 | - | - |
| ASR clean, normal rate | 84 | 56.0 | 56.0 | 87.9 | 73.2 | 79.9 | 65.1 | 71.7 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 84 | 56.0 | 56.0 | 87.9 | 73.2 | 79.9 | 65.1 | 71.7 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 69.0% of clean runs and 69.0% of all runs fully correct. Per language (clean): hi 100%, en 78%, bn -%, ta -%, te -%, mr 25%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 48 | 97.9 | 95.8 | 96.8 | 92.7 | 82.6 | 87.4 | 87.4 |
| time | 25 | 100.0 | 100.0 | 100.0 | 82.8 | 77.4 | 80.0 | 80.0 |
| scamType | 34 | 93.8 | 88.2 | 90.9 | 82.8 | 72.7 | 77.4 | 77.4 |
| bank | 17 | 100.0 | 94.1 | 97.0 | 95.2 | 90.9 | 93.0 | 93.0 |
| paymentApp | 15 | 92.9 | 86.7 | 89.7 | 76.9 | 58.8 | 66.7 | 66.7 |
| utr | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 28.6 | 44.4 | 44.4 |
| suspectUpi | 6 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectPhone | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 71.4 | 83.3 | 83.3 |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 159 | 97.4 | 94.3 | 95.8 | 87.9 | 73.2 | 79.9 | 79.9 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 91.7 | 91.7 | - | 95.7 | 95.7 | 102.5 | 130.6 | 0.0 (n=4) |
| en | 83.3 | 52.8 | - | 94.1 | 82.2 | 21.2 | 8.8 | 100.0 (n=6) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 91.7 | - | - | 95.2 | - | - | - | - (n=0) |
| te | 83.3 | - | - | 93.0 | - | - | - | - (n=0) |
| mr | 83.3 | 25.0 | - | 93.0 | 54.3 | 111.1 | 130.0 | 0.0 (n=4) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 100.0 | 100.0 / 100.0 | 75.0 / 75.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 |  | 100.0 / 100.0 |  |
| en | 100.0 / 94.4 | 100.0 / 93.3 | 88.9 / 80.0 | 100.0 / 95.7 | 66.7 / 40.0 | 100.0 / - | 100.0 / - | 100.0 / 100.0 |  |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |
| ta | 100.0 / - | 100.0 / - | 88.9 / - | 100.0 / - | 66.7 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |
| te | 76.9 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |
| mr | 100.0 / 60.9 | 100.0 / 0.0 | 80.0 / 75.0 | 66.7 / 75.0 | 100.0 / 85.7 | 100.0 / - | 100.0 / - | 100.0 / - |  |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 84 | 56.0 | 79.9 | 65.1 | 71.7 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 84 | 56.0 | 79.9 | 65.1 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 12 | 41.7 | 75.0 | 20.0 | 9.0 |
| en-IN-NeerjaNeural | 12 | 58.3 | 85.7 | 21.8 | 9.5 |
| en-IN-PrabhatNeural | 12 | 58.3 | 85.7 | 21.8 | 8.1 |
| hi-IN-MadhurNeural | 12 | 91.7 | 95.7 | 102.5 | 130.5 |
| hi-IN-SwaraNeural | 12 | 91.7 | 95.7 | 102.5 | 130.7 |
| mr-IN-AarohiNeural | 12 | 16.7 | 52.9 | 113.0 | 130.0 |
| mr-IN-ManoharNeural | 12 | 33.3 | 55.6 | 109.3 | 130.0 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 84 | 56.0 | 79.9 | 65.1 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 35 | 82.9 | 51.4 | 84.7 |
| answer | 42 | 100.0 | 61.9 | 71.2 |
| correction | 7 | 71.4 | 42.9 | 46.2 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 49 | 35 (71%) | 6 (12%) | 8 (16%) | 0 |
| clean | 49 | 35 (71%) | 6 (12%) | 8 (16%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| scamType | 12 | 5 | 2 | 5 |
| amount | 8 | 8 | 0 | 0 |
| paymentApp | 7 | 4 | 0 | 3 |
| time | 7 | 6 | 1 | 0 |
| utr | 5 | 2 | 3 | 0 |
| suspectUpi | 5 | 5 | 0 | 0 |
| bank | 3 | 3 | 0 | 0 |
| suspectPhone | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 2 | 0 | 0 | 2 |
| en | 21 | 9 | 6 | 6 |
| mr | 26 | 26 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | mr | asr | fn | 5 | mr-b01 mr-b02 mr-b10 |
| 2 | scamType | mr | asr | fn | 4 | mr-b01 mr-b11 |
| 3 | time | mr | asr | wrong | 4 | mr-b03 mr-b06 |
| 4 | paymentApp | en | asr | fn | 3 | en-b02 |
| 5 | utr | en | extractor_form | fn | 3 | en-b07 |
| 6 | suspectUpi | en | asr | fn | 3 | en-b08 |
| 7 | paymentApp | en | extractor | wrong | 3 | en-b10 |
| 8 | scamType | en | extractor | fn | 3 | en-b11 |
| 9 | scamType | hi | extractor | wrong | 2 | hi-b03 |
| 10 | scamType | en | extractor_form | fp | 2 | en-b08 |
| 11 | time | mr | asr | fn | 2 | mr-b02 |
| 12 | utr | mr | asr | fn | 2 | mr-b07 |
| 13 | suspectPhone | mr | asr | fn | 2 | mr-b08 |
| 14 | amount | mr | asr | wrong | 2 | mr-b11 |
| 15 | suspectUpi | mr | asr | fn | 2 | mr-b12 |
| 16 | amount | en | asr | wrong | 1 | en-b04 |
| 17 | time | en | extractor_form | wrong | 1 | en-b04 |
| 18 | scamType | en | asr | fp | 1 | en-b08 |
| 19 | bank | en | asr | fn | 1 | en-b12 |
| 20 | bank | mr | asr | fp | 1 | mr-b02 |
| 21 | paymentApp | mr | asr | fn | 1 | mr-b03 |
| 22 | bank | mr | asr | fn | 1 | mr-b09 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. en-b08 (answer:suspect) - fails 100% of 3 runs

- Reference: the UPI ID was refund dot help at okaxis
- Transcript (`en-b08__Neerja__r0__en`): The UPI ID was refund dot help at the taxes.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | wrong_transfer | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | refund.help@okaxis | - | refund.help@okaxis | **asr**: value not in the transcript |

### 2. mr-b02 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: चुकून ओटीपी सांगितला, पंचवीस हजार रुपये गेले, अर्ध्या तासापूर्वी
- Transcript (`mr-b02__Aarohi__r0__mr`): Chukun OTP sangitla panchvi hazaar rupe gale ardhataapur bhi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 25000 | - | 25000 | **asr**: value not in the transcript |
| time | fn | today 11:30 (30 min ago) | - | today 11:30 (30 min ago) | **asr**: ASR lost/changed: अर्ध्या तासापूर्वी |

### 3. mr-b01 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: कोणीतरी फोन करून केवायसी अपडेट करायला सांगितलं, माझ्या एसबीआय खात्यातून सहा हजार रुपये गेले
- Transcript (`mr-b01__Aarohi__r0__mr`): Kornitri phone karun ke vaayisi update karaayla sangitlabh maja SBI khaataatoon saahab hazaar roope ke lie.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: केवायसी |

### 4. mr-b11 (story) - fails 100% of 2 runs

- Reference: चुकून पैसे पाठवले म्हणून एकाने परत मागितले, मी गुगल पे ने सातशे रुपये परत पाठवले
- Transcript (`mr-b11__Aarohi__r0__mr`): Chukun paise paathave mein unhonne aikaane parat maagit le, bhi Google Pay ne saath se rupe parat paathave.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 700 | 60 | 700 | **asr**: value not in the transcript |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: चुकून |

### 5. en-b02 (story) - fails 100% of 3 runs

- Reference: I scanned a QR code to receive money for my old sofa and instead 9,500 got debited from my PhonePe
- Transcript (`en-b02__Neerja__r0__en`): I scan a QR code to receive money for my own sofa and instead 9500 got debated from my phone par.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 6. en-b07 (answer:utr) - fails 100% of 3 runs

- Reference: UTR is 3 0 9 8 7 6 5 4 3 2 1 0
- Transcript (`en-b07__Neerja__r0__en`): UTR is 03:09 8 765432 1 0.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 309876543210 | - | 309876543210 | **extractor_form**: value is in the transcript but not parsed |

### 7. en-b10 (correction) - fails 100% of 3 runs, also fails on reference text

- Reference: sorry, not Google Pay, it was Paytm
- Transcript (`en-b10__Neerja__r0__en`): Sorry, not Google Pay. It was Paytm.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | wrong | Paytm | Google Pay | Google Pay | **extractor**: fails on the reference text too (wrong) |

### 8. en-b11 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: A guy on Instagram threatened to leak my photos, I paid him 3000 on Google Pay at 11 last night
- Transcript (`en-b11__Neerja__r0__en`): A guy on Instagram threatened to leak my photos. I paid him 3000 on Google pay at 11 last night.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | - | **extractor**: fails on the reference text too (fn) |

### 9. mr-b03 (story) - fails 100% of 2 runs

- Reference: काल रात्री आठ वाजता क्यूआर कोड स्कॅन केला, फोनपे वरून तीन हजार रुपये कापले गेले
- Transcript (`mr-b03__Aarohi__r0__mr`): Kal raatri aath vaajastha QR code scan kela, PhonePe varun tin hazaar rupe ka play ke lie.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 20:00 (960 min ago) | -1d 12:00 (1440 min ago) | -1d 20:00 (960 min ago) | **asr**: ASR lost/changed: रात्री वाजता |

### 10. hi-b03 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: गलती से ओटीपी बता दिया, कोटक बैंक से पच्चीस हज़ार निकल गए, अभी पंद्रह मिनट हुए
- Transcript (`hi-b03__Madhur__r0__hi`): Galti se OTP bata diya kotak bank se pachchis hazaar nikal gae abhi pandrah minute hue.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | wrong | otp_shared | wrong_transfer | wrong_transfer | **extractor**: fails on the reference text too (wrong) |

### 11. mr-b06 (answer:time) - fails 100% of 2 runs

- Reference: आज सकाळी अकरा वाजता
- Transcript (`mr-b06__Aarohi__r0__mr`): Aaj sakaari akravaal

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 11:00 (60 min ago) | today 12:00 (0 min ago) | today 11:00 (60 min ago) | **asr**: ASR lost/changed: अकरा वाजता |

### 12. mr-b07 (answer:utr) - fails 100% of 2 runs

- Reference: 6 5 4 3 2 1 0 9 8 7 6 5
- Transcript (`mr-b07__Aarohi__r0__mr`): Saha paanch chaar tin don't ek shoony nau aath saat saaha paanch.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 654321098765 | - | 654321098765 | **asr**: value not in the transcript |

### 13. en-b04 (story) - fails 33% of 3 runs

- Reference: My father told the OTP to a caller yesterday evening at 8, twenty two thousand rupees gone from his Canara Bank account
- Transcript (`en-b04__NeerjaExpressive__r0__en`): My father told the OTP to a caller yesterday evening at 822000 rupees gone from his Canada bank account.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 22000 | 822000 | 22000 | **asr**: value not in the transcript |
| time | wrong | -1d 20:00 (960 min ago) | -1d 19:00 (1020 min ago) | -1d 20:00 (960 min ago) | **extractor_form**: key words survive (evening at 8,) but the extractor fails |
