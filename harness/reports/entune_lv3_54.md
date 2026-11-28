# Turant pipeline eval: entune_lv3_54

Generated 2026-11-28T00:19:53.113Z. Extractor: `..\prototype\src\lib\extract.ts`. 30 cases, 300 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 30 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 90 | 94.4 | 94.4 | 98.3 | 97.1 | 97.7 | 23.3 | 18.9 |
| ASR noise 15 dB | 60 | 91.7 | 91.7 | 100.0 | 95.7 | 97.8 | 22.2 | 16.1 |
| ASR noise 5 dB | 60 | 81.7 | 81.7 | 96.3 | 90.5 | 93.3 | 24.0 | 17.6 |
| ASR rate -15% / +15% | 30 | 96.7 | 96.7 | 100.0 | 98.3 | 99.1 | 23.7 | 20.5 |
| ASR all (forced language) | 300 | 90.3 | 90.3 | 98.7 | 95.0 | 96.8 | 23.1 | 17.6 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 95.6% of clean runs and 93.0% of all runs fully correct. Per language (clean): hi -%, en 96%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 19 | 100.0 | 100.0 | 100.0 | 96.4 | 94.7 | 95.6 | 97.1 |
| time | 12 | 100.0 | 100.0 | 100.0 | 97.2 | 97.2 | 97.2 | 99.2 |
| scamType | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 99.3 |
| bank | 13 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 96.8 |
| paymentApp | 3 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 86.8 |
| utr | 2 | 100.0 | 100.0 | 100.0 | 100.0 | 83.3 | 90.9 | 91.9 |
| suspectUpi | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 75.0 |
| suspectPhone | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 58 | 100.0 | 100.0 | 100.0 | 98.3 | 97.1 | 97.7 | 96.8 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | - | - | - | - | - | - | - | - (n=0) |
| en | 100.0 | 94.4 | 81.7 | 100.0 | 97.7 | 23.3 | 18.9 | 88.9 (n=9) |
| bn | - | - | - | - | - | - | - | - (n=0) |
| ta | - | - | - | - | - | - | - | - (n=0) |
| te | - | - | - | - | - | - | - | - (n=0) |
| mr | - | - | - | - | - | - | - | - (n=0) |
| kn | - | - | - | - | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi |  |  |  |  |  |  |  |  |  |
| en | 100.0 / 95.6 | 100.0 / 97.2 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 90.9 | 100.0 / 100.0 | 100.0 / 100.0 |  |
| bn |  |  |  |  |  |  |  |  |  |
| ta |  |  |  |  |  |  |  |  |  |
| te |  |  |  |  |  |  |  |  |  |
| mr |  |  |  |  |  |  |  |  |  |
| kn |  |  |  |  |  |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 20 | 90.0 | 97.7 | 19.8 | 14.0 |
| babble 5 dB | 20 | 75.0 | 92.9 | 21.3 | 14.8 |
| clean | 180 | 92.8 | 97.7 | 23.0 | 18.1 |
| pink 15 dB | 25 | 96.0 | 98.7 | 22.7 | 17.5 |
| pink 5 dB | 25 | 80.0 | 89.2 | 26.7 | 21.2 |
| traffic 15 dB | 15 | 86.7 | 97.0 | 24.7 | 16.9 |
| traffic 5 dB | 15 | 93.3 | 98.5 | 24.2 | 17.0 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 150 | 92.0 | 97.4 | 22.9 |
| 15 dB | 60 | 91.7 | 97.8 | 22.2 |
| 5 dB | 60 | 81.7 | 93.3 | 24.0 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 30 | 93.3 | 97.4 | 23.7 | 19.0 |
| en-IN-NeerjaNeural | 30 | 100.0 | 100.0 | 24.3 | 20.4 |
| en-IN-PrabhatNeural | 30 | 90.0 | 95.7 | 21.8 | 17.2 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 150 | 92.0 | 97.4 | 22.9 |
| +15% | 12 | 100.0 | 100.0 | 28.4 |
| -15% | 18 | 94.4 | 98.6 | 21.0 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 45 | 100.0 | 93.3 | 98.1 |
| answer | 36 | 100.0 | 94.4 | 95.8 |
| correction | 9 | 100.0 | 100.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 30 | 21 (70%) | 9 (30%) | 0 (0%) | 0 |
| clean | 12 | 8 (67%) | 4 (33%) | 0 (0%) | 0 |
| 5 dB | 12 | 9 (75%) | 3 (25%) | 0 (0%) | 0 |
| 15 dB | 5 | 3 (60%) | 2 (40%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bank | 8 | 5 | 3 | 0 |
| paymentApp | 7 | 3 | 4 | 0 |
| amount | 6 | 6 | 0 | 0 |
| suspectUpi | 4 | 4 | 0 | 0 |
| utr | 3 | 3 | 0 | 0 |
| time | 1 | 0 | 1 | 0 |
| scamType | 1 | 0 | 1 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| en | 30 | 21 | 9 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | en | asr | wrong | 5 | et-07 et-14 et-16 |
| 2 | bank | en | asr | fn | 5 | et-27 et-06 |
| 3 | suspectUpi | en | asr | fn | 4 | et-25 |
| 4 | paymentApp | en | extractor_form | fn | 4 | et-07 |
| 5 | utr | en | asr | fn | 3 | et-22 |
| 6 | paymentApp | en | asr | fn | 3 | et-13 |
| 7 | bank | en | extractor_form | fn | 3 | et-26 |
| 8 | amount | en | asr | fn | 1 | et-11 |
| 9 | time | en | extractor_form | wrong | 1 | et-19 |
| 10 | scamType | en | extractor_form | fp | 1 | et-25 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. et-07 (story) - fails 70% of 10 runs

- Reference: I paid nineteen ninety nine rupees for a fake delivery fee on PhonePe
- Transcript (`et-07__Prabhat__r0__en`): I paid Rs.19.99 for a fake delivery fee on PhonePe.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 1999 | 19.99 | 1999 | **asr**: value not in the transcript |

### 2. et-25 (answer:suspect) - fails 40% of 10 runs

- Reference: the UPI ID was refund dot help at ybl
- Transcript (`et-25__Neerja__r0__pink5__en`): The UPI ID was refund.help at YBM.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | wrong_transfer | - | **extractor_form**: spurious value from a near-correct transcript |
| suspectUpi | fn | refund.help@ybl | - | refund.help@ybl | **asr**: value not in the transcript |

### 3. et-06 (story) - fails 40% of 10 runs

- Reference: Rs 45,000 went from my ICICI account two hours ago
- Transcript (`et-06__GiuseppeMultilingual__r0__en`): 45,000 rupees went from my Isisai account two hours ago.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 4. et-13 (story) - fails 30% of 10 runs

- Reference: Somebody said he had sent money by mistake and asked me to return it, I sent 7,200 rupees on Paytm
- Transcript (`et-13__Prabhat__r0__babble5__en`): Somebody said he had sent money by mistake and asked me to return it. I sent 7,200 rupees on payday.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: Paytm |

### 5. et-22 (answer:utr) - fails 30% of 10 runs

- Reference: the reference number is 3 4 5 6 7 8 9 0 1 2 3 4
- Transcript (`et-22__Prabhat__r0__en`): The reference number is 345-678-901-34.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 345678901234 | - | 345678901234 | **asr**: value not in the transcript |

### 6. et-26 (answer:bank) - fails 30% of 10 runs

- Reference: it was my IndusInd Bank account
- Transcript (`et-26__GiuseppeMultilingual__r0__en`): It was my Indus IND bank account.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | IndusInd Bank | - | IndusInd Bank | **extractor_form**: key words survive (IndusInd) but the extractor fails |
