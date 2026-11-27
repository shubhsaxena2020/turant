# Turant pipeline eval: swift34

Generated 2026-11-27T12:53:17.249Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 200 ASR transcripts scored, **1310 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 200 | 71.0 | 71.0 | 89.4 | 85.7 | 87.5 | 57.9 | 55.9 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 200 | 71.0 | 71.0 | 89.4 | 85.7 | 87.5 | 57.9 | 55.9 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 71.5% of clean runs and 71.5% of all runs fully correct. Per language (clean): hi 85%, en 63%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 94.6 | 92.1 | 93.3 | 93.3 |
| time | 113 | 100.0 | 100.0 | 100.0 | 78.6 | 92.8 | 85.1 | 85.1 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 96.9 | 98.4 | 98.4 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 100.0 | 95.3 | 97.6 | 97.6 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 91.3 | 95.5 | 95.5 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 100.0 | 40.0 | 57.1 | 57.1 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 20.0 | 18.8 | 19.4 | 19.4 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 47.8 | 64.7 | 64.7 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 40.0 | 40.0 | 40.0 | 40.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 89.4 | 85.7 | 87.5 | 87.5 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | 85.0 | - | 100.0 | 95.3 | 100.3 | 127.1 | 12.5 (n=16) |
| en | 100.0 | 61.7 | - | 100.0 | 82.4 | 30.5 | 15.9 | 37.0 (n=27) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 98.9 | 100.0 / 100.0 | 100.0 / 98.0 | 100.0 / 98.2 | 100.0 / 85.7 | 100.0 / 80.0 | 100.0 / 25.0 | 100.0 / 85.7 | 100.0 / 100.0 |
| en | 100.0 / 89.2 | 100.0 / 76.9 | 100.0 / 98.7 | 100.0 / 97.1 | 100.0 / 100.0 | 100.0 / 36.4 | 100.0 / 17.4 | 100.0 / 50.0 | 100.0 / 0.0 |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 200 | 71.0 | 87.5 | 57.9 | 55.9 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 200 | 71.0 | 87.5 | 57.9 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 40 | 60.0 | 82.2 | 31.2 | 16.5 |
| en-IN-NeerjaNeural | 40 | 65.0 | 84.1 | 29.9 | 15.3 |
| en-IN-PrabhatNeural | 40 | 60.0 | 81.0 | 30.4 | 15.7 |
| hi-IN-MadhurNeural | 40 | 82.5 | 94.9 | 100.6 | 127.1 |
| hi-IN-SwaraNeural | 40 | 87.5 | 95.7 | 100.0 | 127.2 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 200 | 71.0 | 87.5 | 57.9 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 110 | 100.0 | 64.5 | 89.3 |
| correction | 20 | 100.0 | 75.0 | 81.1 |
| answer | 65 | 100.0 | 78.5 | 79.7 |
| answer (skip intent) | 5 | 100.0 | 100.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 75 | 65 (87%) | 10 (13%) | 0 (0%) | 0 |
| clean | 75 | 65 (87%) | 10 (13%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| time | 22 | 15 | 7 | 0 |
| suspectUpi | 13 | 13 | 0 | 0 |
| suspectPhone | 12 | 12 | 0 | 0 |
| utr | 9 | 9 | 0 | 0 |
| amount | 9 | 9 | 0 | 0 |
| bank | 3 | 3 | 0 | 0 |
| suspectAccount | 3 | 0 | 3 | 0 |
| scamType | 2 | 2 | 0 | 0 |
| paymentApp | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 12 | 12 | 0 | 0 |
| en | 63 | 53 | 10 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | suspectPhone | en | asr | fn | 10 | en-06 en-07 en-15 en-20 |
| 2 | time | en | asr | fp | 10 | en-08 en-19 en-21 en-31 |
| 3 | suspectUpi | en | asr | wrong | 9 | en-09 en-19 en-33 |
| 4 | utr | en | asr | fn | 7 | en-08 en-31 en-32 |
| 5 | amount | en | asr | wrong | 6 | en-12 en-13 en-17 en-22 en-24 |
| 6 | time | en | extractor_form | fp | 6 | en-15 en-32 |
| 7 | time | en | asr | wrong | 4 | en-03 en-26 en-40 |
| 8 | suspectUpi | hi | asr | wrong | 3 | hi-10 hi-36 |
| 9 | suspectAccount | en | extractor_form | wrong | 3 | en-21 |
| 10 | utr | hi | asr | fn | 2 | hi-15 |
| 11 | suspectPhone | hi | asr | fn | 2 | hi-23 |
| 12 | paymentApp | hi | asr | fn | 2 | hi-24 |
| 13 | bank | en | asr | fn | 2 | en-10 |
| 14 | amount | en | asr | fn | 2 | en-17 |
| 15 | scamType | hi | asr | fn | 1 | hi-01 |
| 16 | bank | hi | asr | fn | 1 | hi-12 |
| 17 | amount | hi | asr | fn | 1 | hi-27 |
| 18 | scamType | en | asr | fn | 1 | en-02 |
| 19 | time | en | asr | fn | 1 | en-22 |
| 20 | time | en | extractor_form | wrong | 1 | en-28 |
| 21 | suspectUpi | en | asr | fn | 1 | en-39 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. en-15 (story) - fails 100% of 3 runs

- Reference: The number that called me was plus 91 70112 23344
- Transcript (`en-15__Neerja__r0__en`): The number that called me was plus 9 1 07:01 2 2344.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 07:01 (299 min ago) | - | **extractor_form**: spurious value from a near-correct transcript |
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |

### 2. en-19 (story) - fails 100% of 3 runs

- Reference: The UPI ID was sharma123 at paytm, I sent him three thousand five hundred
- Transcript (`en-19__Neerja__r0__en`): The UPI ID was sharma 01:23 at Paytm. I sent him 3500.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 13:23 (1357 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | wrong | sharma123@paytm | 23@paytm | sharma123@paytm | **asr**: value not in the transcript |

### 3. en-21 (story) - fails 100% of 3 runs

- Reference: I sent money to account number 5 0 1 0 0 2 3 4 5 6 7 8 1 2, IFSC SBIN0001234, around four thousand rupees
- Transcript (`en-21__Neerja__r0__en`): I sent money to account number 05:01 0 02:34567812 IFSC's been 001234 around 4000 rupees.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 17:01 (1139 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| suspectAccount | wrong | 50100234567812 | 00234567812 | 50100234567812 | **extractor_form**: value is in the transcript but not parsed |

### 4. en-31 (answer:utr) - fails 100% of 3 runs

- Reference: Your A/c XX4321 has been debited via UPI. UPI Ref No 4 5 6 7 8 9 0 1 2 3 4 5. Not you? Call your bank.
- Transcript (`en-31__Neerja__r0__en`): Your ACXX 4321 has been debated by UPI. UPI refer number 45678 08:01 2 345. Not you, call your bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | today 08:01 (239 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| utr | fn | 456789012345 | - | 456789012345 | **asr**: value not in the transcript |

### 5. en-32 (answer:utr) - fails 100% of 3 runs

- Reference: the reference number is 6012 3456 7890
- Transcript (`en-32__Neerja__r0__en`): The reference number is 06:01 to 34567 890.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fp | - | -1d 18:01 (1079 min ago) | - | **extractor_form**: spurious value from a near-correct transcript |
| utr | fn | 601234567890 | - | 601234567890 | **asr**: value not in the transcript |

### 6. en-07 (story) - fails 100% of 3 runs

- Reference: The caller's number was nine double eight seven six five four three two one, he asked for the OTP and I gave it
- Transcript (`en-07__Neerja__r0__en`): The caller's number was 9 double 8754321. He asked for the OTP and I gave it.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9887654321 | - | 9887654321 | **asr**: value not in the transcript |

### 7. hi-10 (story) - fails 100% of 2 runs

- Reference: मैंने यूपीआई आईडी rahul dot kyc at ybl पर आठ हज़ार रुपये भेजे, बीस मिनट पहले
- Transcript (`hi-10__Madhur__r0__hi`): Mainne UPI ID raahul dot KYC at YBL par aath hazaar rupe bhejen bis minute pahle.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kyc@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 8. hi-15 (story) - fails 100% of 2 runs

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): Pahle cut gae UTR number hain chaar shoony tin, do ek aath, saat, chhah, paanch, chaar, tin, do, paanch hazaar rupe.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 9. hi-23 (correction) - fails 100% of 2 runs

- Reference: नंबर गलत है, 9 8 1 1 1 2 2 2 3 3 था
- Transcript (`hi-23__Madhur__r0__hi`): Number galat hai nau aath ek ek ek do do tin tin tha.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |

### 10. hi-24 (story) - fails 100% of 2 runs

- Reference: कल दोपहर करीब ढाई बजे फोन पे से छब्बीस सौ रुपये गए
- Transcript (`hi-24__Madhur__r0__hi`): Kal dophar karib dhai baje phone par se chhabbis sau rupe gae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: फोन पे से |

### 11. hi-01 (story) - fails 50% of 2 runs

- Reference: मेरे अकाउंट से पाँच हज़ार रुपये कट गए, दस मिनट पहले एक आदमी ने बोला केवाईसी अपडेट करो, एसबीआई का अकाउंट है
- Transcript (`hi-01__Madhur__r0__hi`): Mere account se paanch hazaar rupe cut gae. Das minute pahle ek aadmi ne bola ki vaise hi update karo SBI ka account hai.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: केवाईसी |

### 12. hi-12 (story) - fails 50% of 2 runs

- Reference: ढाई हज़ार रुपये कटे, आधा घंटा पहले, केनरा बैंक
- Transcript (`hi-12__Madhur__r0__hi`): Dhai hazaar rupe kate aadha ghanta pahle kendr bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: केनरा |
