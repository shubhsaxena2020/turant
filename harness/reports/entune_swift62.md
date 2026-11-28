# Turant pipeline eval: entune_swift62

Generated 2026-11-28T04:33:43.760Z. Extractor: `..\prototype\src\lib\extract.ts`. 30 cases, 300 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 30 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 90 | 80.0 | 80.0 | 94.0 | 89.7 | 91.8 | 26.2 | 17.8 |
| ASR noise 15 dB | 60 | 73.3 | 73.3 | 91.7 | 85.3 | 88.4 | 28.7 | 19.7 |
| ASR noise 5 dB | 60 | 58.3 | 58.3 | 89.8 | 75.9 | 82.2 | 33.9 | 25.0 |
| ASR rate -15% / +15% | 30 | 73.3 | 73.3 | 92.6 | 86.2 | 89.3 | 27.5 | 18.6 |
| ASR all (forced language) | 300 | 74.7 | 74.7 | 92.9 | 86.0 | 89.3 | 28.1 | 19.7 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 82.2% of clean runs and 75.3% of all runs fully correct. Per language (clean): hi -%, en 82%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 19 | 100.0 | 100.0 | 100.0 | 91.2 | 91.2 | 91.2 | 88.4 |
| time | 12 | 100.0 | 100.0 | 100.0 | 100.0 | 97.2 | 98.6 | 94.5 |
| scamType | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 97.8 |
| bank | 13 | 100.0 | 100.0 | 100.0 | 100.0 | 87.2 | 93.2 | 90.8 |
| paymentApp | 3 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 90.9 |
| utr | 2 | 100.0 | 100.0 | 100.0 | 25.0 | 16.7 | 20.0 | 51.4 |
| suspectUpi | 1 | 100.0 | 100.0 | 100.0 | 33.3 | 33.3 | 33.3 | 12.5 |
| suspectPhone | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 94.7 |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 58 | 100.0 | 100.0 | 100.0 | 94.0 | 89.7 | 91.8 | 89.3 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | - | - | - | - | - | - | - | - (n=0) |
| en | 100.0 | 80.0 | 58.3 | 100.0 | 91.8 | 26.2 | 17.8 | 33.3 (n=9) |
| bn | - | - | - | - | - | - | - | - (n=0) |
| ta | - | - | - | - | - | - | - | - (n=0) |
| te | - | - | - | - | - | - | - | - (n=0) |
| mr | - | - | - | - | - | - | - | - (n=0) |
| kn | - | - | - | - | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi |  |  |  |  |  |  |  |  |  |
| en | 100.0 / 91.2 | 100.0 / 98.6 | 100.0 / 100.0 | 100.0 / 93.2 | 100.0 / 100.0 | 100.0 / 20.0 | 100.0 / 33.3 | 100.0 / 100.0 |  |
| bn |  |  |  |  |  |  |  |  |  |
| ta |  |  |  |  |  |  |  |  |  |
| te |  |  |  |  |  |  |  |  |  |
| mr |  |  |  |  |  |  |  |  |  |
| kn |  |  |  |  |  |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 20 | 80.0 | 93.0 | 22.8 | 14.5 |
| babble 5 dB | 20 | 45.0 | 78.5 | 30.6 | 22.9 |
| clean | 180 | 80.6 | 91.9 | 25.9 | 17.9 |
| pink 15 dB | 25 | 60.0 | 78.9 | 35.2 | 23.9 |
| pink 5 dB | 25 | 48.0 | 73.5 | 42.9 | 31.0 |
| traffic 15 dB | 15 | 86.7 | 92.5 | 28.8 | 21.3 |
| traffic 5 dB | 15 | 93.3 | 95.5 | 27.9 | 20.7 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 150 | 82.0 | 92.4 | 25.6 |
| 15 dB | 60 | 73.3 | 88.4 | 28.7 |
| 5 dB | 60 | 58.3 | 82.2 | 33.9 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 30 | 73.3 | 89.3 | 26.4 | 17.9 |
| en-IN-NeerjaNeural | 30 | 83.3 | 93.0 | 25.3 | 17.6 |
| en-IN-PrabhatNeural | 30 | 83.3 | 93.0 | 26.7 | 17.9 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 150 | 82.0 | 92.4 | 25.6 |
| +15% | 12 | 91.7 | 95.7 | 29.1 |
| -15% | 18 | 61.1 | 84.8 | 26.6 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 45 | 100.0 | 86.7 | 96.5 |
| answer | 36 | 100.0 | 72.2 | 77.6 |
| correction | 9 | 100.0 | 77.8 | 77.8 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 82 | 79 (96%) | 3 (4%) | 0 (0%) | 0 |
| clean | 28 | 26 (93%) | 2 (7%) | 0 (0%) | 0 |
| 15 dB | 17 | 17 (100%) | 0 (0%) | 0 (0%) | 0 |
| 5 dB | 29 | 28 (97%) | 1 (3%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 23 | 21 | 2 | 0 |
| bank | 22 | 22 | 0 | 0 |
| utr | 11 | 11 | 0 | 0 |
| suspectUpi | 9 | 9 | 0 | 0 |
| time | 8 | 8 | 0 | 0 |
| paymentApp | 5 | 5 | 0 | 0 |
| scamType | 3 | 2 | 1 | 0 |
| suspectPhone | 1 | 1 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| en | 82 | 79 | 3 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | bank | en | asr | fn | 22 | et-09 et-12 et-26 et-27 et-10 et-06 et-08 et-29 |
| 2 | amount | en | asr | wrong | 19 | et-03 et-07 et-04 et-14 et-17 et-11 et-28 |
| 3 | utr | en | asr | wrong | 6 | et-22 et-23 |
| 4 | utr | en | asr | fn | 5 | et-23 |
| 5 | suspectUpi | en | asr | wrong | 5 | et-25 |
| 6 | paymentApp | en | asr | fn | 5 | et-13 et-07 |
| 7 | time | en | asr | wrong | 5 | et-01 et-04 et-19 et-21 |
| 8 | suspectUpi | en | asr | fn | 4 | et-25 |
| 9 | time | en | asr | fn | 3 | et-06 et-20 |
| 10 | amount | en | extractor_form | wrong | 2 | et-28 |
| 11 | amount | en | asr | fn | 2 | et-05 et-11 |
| 12 | scamType | en | asr | fn | 2 | et-05 |
| 13 | suspectPhone | en | asr | fn | 1 | et-24 |
| 14 | scamType | en | extractor_form | fp | 1 | et-25 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. et-25 (answer:suspect) - fails 90% of 10 runs

- Reference: the UPI ID was refund dot help at ybl
- Transcript (`et-25__Prabhat__r0__en`): The UPI ID was refund dot health at YBL.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | refund.help@ybl | refund.health@ybl | refund.help@ybl | **asr**: value not in the transcript |

### 2. et-23 (answer:utr) - fails 90% of 10 runs

- Reference: UTR 6723 4589 0123
- Transcript (`et-23__Neerja__r0__en`): UTR67245 890123.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 672345890123 | - | 672345890123 | **asr**: value not in the transcript |

### 3. et-07 (story) - fails 70% of 10 runs

- Reference: I paid nineteen ninety nine rupees for a fake delivery fee on PhonePe
- Transcript (`et-07__Neerja__r0__en`): I paid 99 9 rupees for a fake delivery fee on PhonePe.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 1999 | 99 | 1999 | **asr**: value not in the transcript |

### 4. et-26 (answer:bank) - fails 70% of 10 runs

- Reference: it was my IndusInd Bank account
- Transcript (`et-26__Neerja__r0__en`): It was my indarshan bank account.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | IndusInd Bank | - | IndusInd Bank | **asr**: ASR lost/changed: IndusInd |

### 5. et-06 (story) - fails 50% of 10 runs

- Reference: Rs 45,000 went from my ICICI account two hours ago
- Transcript (`et-06__Prabhat__r0__en`): 45000 rupees went from my ICICI account to aarza ago.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: two hours |

### 6. et-03 (story) - fails 50% of 10 runs

- Reference: A man said he was from my bank and asked for the OTP, I shared it and 12,750 rupees were debited from my HDFC account
- Transcript (`et-03__Prabhat__r0__en`): A man said he was from my bank and asked for the OTP, I shared it and 12,755 rupees were debated from my HDFC account.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 12750 | 12755 | 12750 | **asr**: value not in the transcript |
