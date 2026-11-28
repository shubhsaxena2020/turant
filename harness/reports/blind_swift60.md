# Turant pipeline eval: blind_swift60

Generated 2026-11-28T03:48:54.599Z. Extractor: `..\prototype\src\lib\extract.ts`. 84 cases, 84 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 84 | 92.9 | 92.9 | 98.1 | 95.6 | 96.8 | - | - |
| ASR clean, normal rate | 84 | 65.5 | 65.5 | 88.7 | 79.8 | 84.0 | 65.1 | 71.7 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 84 | 65.5 | 65.5 | 88.7 | 79.8 | 84.0 | 65.1 | 71.7 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 75.0% of clean runs and 75.0% of all runs fully correct. Per language (clean): hi 100%, en 78%, bn -%, ta -%, te -%, mr 46%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 48 | 100.0 | 97.9 | 98.9 | 93.2 | 89.1 | 91.1 | 91.1 |
| time | 25 | 100.0 | 100.0 | 100.0 | 89.7 | 83.9 | 86.7 | 86.7 |
| scamType | 34 | 93.8 | 88.2 | 90.9 | 82.8 | 72.7 | 77.4 | 77.4 |
| bank | 17 | 100.0 | 100.0 | 100.0 | 95.5 | 95.5 | 95.5 | 95.5 |
| paymentApp | 15 | 92.9 | 86.7 | 89.7 | 76.9 | 58.8 | 66.7 | 66.7 |
| utr | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 71.4 | 83.3 | 83.3 |
| suspectUpi | 6 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectPhone | 7 | 100.0 | 100.0 | 100.0 | 77.8 | 100.0 | 87.5 | 87.5 |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 159 | 98.1 | 95.6 | 96.8 | 88.7 | 79.8 | 84.0 | 84.0 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 91.7 | 91.7 | - | 95.7 | 95.7 | 102.5 | 130.6 | 0.0 (n=4) |
| en | 83.3 | 61.1 | - | 94.1 | 84.6 | 21.2 | 8.8 | 100.0 (n=6) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 91.7 | - | - | 95.2 | - | - | - | - (n=0) |
| te | 91.7 | - | - | 97.7 | - | - | - | - (n=0) |
| mr | 91.7 | 45.8 | - | 95.5 | 69.2 | 111.1 | 130.0 | 0.0 (n=4) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 100.0 | 100.0 / 100.0 | 75.0 / 75.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 |  | 100.0 / 100.0 |  |
| en | 100.0 / 94.4 | 100.0 / 93.3 | 88.9 / 80.0 | 100.0 / 95.7 | 66.7 / 40.0 | 100.0 / 100.0 | 100.0 / - | 100.0 / 100.0 |  |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |
| ta | 100.0 / - | 100.0 / - | 88.9 / - | 100.0 / - | 66.7 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |
| te | 92.3 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |
| mr | 100.0 / 76.9 | 100.0 / 40.0 | 80.0 / 75.0 | 100.0 / 88.9 | 100.0 / 85.7 | 100.0 / - | 100.0 / - | 100.0 / 66.7 |  |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 84 | 65.5 | 84.0 | 65.1 | 71.7 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 84 | 65.5 | 84.0 | 65.1 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 12 | 50.0 | 77.6 | 20.0 | 9.0 |
| en-IN-NeerjaNeural | 12 | 66.7 | 88.0 | 21.8 | 9.5 |
| en-IN-PrabhatNeural | 12 | 66.7 | 88.0 | 21.8 | 8.1 |
| hi-IN-MadhurNeural | 12 | 91.7 | 95.7 | 102.5 | 130.5 |
| hi-IN-SwaraNeural | 12 | 91.7 | 95.7 | 102.5 | 130.7 |
| mr-IN-AarohiNeural | 12 | 50.0 | 71.8 | 113.0 | 130.0 |
| mr-IN-ManoharNeural | 12 | 41.7 | 66.7 | 109.3 | 130.0 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 84 | 65.5 | 84.0 | 65.1 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 35 | 85.7 | 54.3 | 87.5 |
| answer | 42 | 100.0 | 76.2 | 79.0 |
| correction | 7 | 85.7 | 57.1 | 57.1 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 40 | 29 (73%) | 3 (8%) | 8 (20%) | 0 |
| clean | 40 | 29 (73%) | 3 (8%) | 8 (20%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| scamType | 12 | 5 | 2 | 5 |
| paymentApp | 7 | 4 | 0 | 3 |
| amount | 5 | 5 | 0 | 0 |
| time | 5 | 4 | 1 | 0 |
| suspectUpi | 5 | 5 | 0 | 0 |
| bank | 2 | 2 | 0 | 0 |
| utr | 2 | 2 | 0 | 0 |
| suspectPhone | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 2 | 0 | 0 | 2 |
| en | 18 | 9 | 3 | 6 |
| mr | 20 | 20 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | mr | asr | fn | 4 | mr-b01 mr-b11 |
| 2 | paymentApp | en | asr | fn | 3 | en-b02 |
| 3 | suspectUpi | en | asr | fn | 3 | en-b08 |
| 4 | paymentApp | en | extractor | wrong | 3 | en-b10 |
| 5 | scamType | en | extractor | fn | 3 | en-b11 |
| 6 | scamType | hi | extractor | wrong | 2 | hi-b03 |
| 7 | scamType | en | extractor_form | fp | 2 | en-b08 |
| 8 | amount | mr | asr | fn | 2 | mr-b02 |
| 9 | time | mr | asr | fn | 2 | mr-b02 |
| 10 | time | mr | asr | wrong | 2 | mr-b06 |
| 11 | utr | mr | asr | fn | 2 | mr-b07 |
| 12 | suspectPhone | mr | asr | fp | 2 | mr-b07 |
| 13 | amount | mr | asr | wrong | 2 | mr-b11 |
| 14 | suspectUpi | mr | asr | fn | 2 | mr-b12 |
| 15 | amount | en | asr | wrong | 1 | en-b04 |
| 16 | time | en | extractor_form | wrong | 1 | en-b04 |
| 17 | scamType | en | asr | fp | 1 | en-b08 |
| 18 | bank | en | asr | fn | 1 | en-b12 |
| 19 | bank | mr | asr | fp | 1 | mr-b02 |
| 20 | paymentApp | mr | asr | fn | 1 | mr-b03 |

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

### 3. mr-b07 (answer:utr) - fails 100% of 2 runs

- Reference: 6 5 4 3 2 1 0 9 8 7 6 5
- Transcript (`mr-b07__Aarohi__r0__mr`): Saha paanch chaar tin don't ek shoony nau aath saat saaha paanch.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 654321098765 | - | 654321098765 | **asr**: value not in the transcript |
| suspectPhone | fp | - | 6543210987 | - | **asr**: spurious value from a mis-recognised transcript |

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

### 6. en-b10 (correction) - fails 100% of 3 runs, also fails on reference text

- Reference: sorry, not Google Pay, it was Paytm
- Transcript (`en-b10__Neerja__r0__en`): Sorry, not Google Pay. It was Paytm.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | wrong | Paytm | Google Pay | Google Pay | **extractor**: fails on the reference text too (wrong) |

### 7. en-b11 (story) - fails 100% of 3 runs, also fails on reference text

- Reference: A guy on Instagram threatened to leak my photos, I paid him 3000 on Google Pay at 11 last night
- Transcript (`en-b11__Neerja__r0__en`): A guy on Instagram threatened to leak my photos. I paid him 3000 on Google pay at 11 last night.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | - | **extractor**: fails on the reference text too (fn) |

### 8. hi-b03 (story) - fails 100% of 2 runs, also fails on reference text

- Reference: गलती से ओटीपी बता दिया, कोटक बैंक से पच्चीस हज़ार निकल गए, अभी पंद्रह मिनट हुए
- Transcript (`hi-b03__Madhur__r0__hi`): Galti se OTP bata diya kotak bank se pachchis hazaar nikal gae abhi pandrah minute hue.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | wrong | otp_shared | wrong_transfer | wrong_transfer | **extractor**: fails on the reference text too (wrong) |

### 9. mr-b01 (story) - fails 100% of 2 runs

- Reference: कोणीतरी फोन करून केवायसी अपडेट करायला सांगितलं, माझ्या एसबीआय खात्यातून सहा हजार रुपये गेले
- Transcript (`mr-b01__Aarohi__r0__mr`): Kornitri phone karun ke vaayisi update karaayla sangitlabh maja SBI khaataatoon saahab hazaar roope ke lie.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: केवायसी |

### 10. mr-b06 (answer:time) - fails 100% of 2 runs

- Reference: आज सकाळी अकरा वाजता
- Transcript (`mr-b06__Aarohi__r0__mr`): Aaj sakaari akravaal

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 11:00 (60 min ago) | today 12:00 (0 min ago) | today 11:00 (60 min ago) | **asr**: ASR lost/changed: अकरा वाजता |

### 11. mr-b12 (answer:suspect) - fails 100% of 2 runs

- Reference: यूपीआय आयडी help dot desk at ybl
- Transcript (`mr-b12__Aarohi__r0__mr`): UPI ID help DOT Descath.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | help.desk@ybl | - | help.desk@ybl | **asr**: value not in the transcript |

### 12. en-b04 (story) - fails 33% of 3 runs

- Reference: My father told the OTP to a caller yesterday evening at 8, twenty two thousand rupees gone from his Canara Bank account
- Transcript (`en-b04__NeerjaExpressive__r0__en`): My father told the OTP to a caller yesterday evening at 822000 rupees gone from his Canada bank account.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 22000 | 822000 | 22000 | **asr**: value not in the transcript |
| time | wrong | -1d 20:00 (960 min ago) | -1d 19:00 (1020 min ago) | -1d 20:00 (960 min ago) | **extractor_form**: key words survive (evening at 8,) but the extractor fails |

### 13. en-b12 (answer:bank) - fails 33% of 3 runs

- Reference: Bank of India
- Transcript (`en-b12__NeerjaExpressive__r0__en`): Done of India.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Bank of India | - | Bank of India | **asr**: ASR lost/changed: Bank |
