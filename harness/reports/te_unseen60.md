# Turant pipeline eval: te_unseen60

Generated 2026-11-28T03:50:38.131Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 160 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 0 | - | - | - | - | - | - | - |
| ASR noise 15 dB | 40 | 62.5 | 62.5 | 95.5 | 78.8 | 86.3 | 44.0 | 41.3 |
| ASR noise 5 dB | 40 | 45.0 | 45.0 | 91.2 | 65.0 | 75.9 | 51.6 | 44.6 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 160 | 61.9 | 61.9 | 95.8 | 77.8 | 85.9 | 47.1 | 42.3 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): -% of clean runs and 66.3% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | - | - | - | 96.3 |
| time | 113 | 100.0 | 100.0 | 100.0 | - | - | - | 91.5 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | - | - | - | 77.3 |
| bank | 97 | 100.0 | 100.0 | 100.0 | - | - | - | 88.0 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 89.7 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | - | - | 40.0 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 47.6 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 50.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 100.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | - | - | - | 85.9 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | 45.0 | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
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
| babble 15 dB | 18 | 61.1 | 85.7 | 43.6 | 43.5 |
| babble 5 dB | 18 | 38.9 | 71.9 | 55.1 | 47.2 |
| clean | 80 | 70.0 | 90.2 | 46.4 | 41.7 |
| pink 15 dB | 13 | 69.2 | 85.0 | 51.9 | 43.7 |
| pink 5 dB | 13 | 46.2 | 70.3 | 55.7 | 49.3 |
| traffic 15 dB | 9 | 55.6 | 88.9 | 37.1 | 34.7 |
| traffic 5 dB | 9 | 55.6 | 88.9 | 40.0 | 35.0 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 70.0 | 90.2 | 46.4 |
| 15 dB | 40 | 62.5 | 86.3 | 44.0 |
| 5 dB | 40 | 45.0 | 75.9 | 51.6 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 70.0 | 90.2 | 46.4 |

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
| all forced-language runs | 76 | 63 (83%) | 13 (17%) | 0 (0%) | 0 |
| clean | 28 | 23 (82%) | 5 (18%) | 0 (0%) | 0 |
| 15 dB | 19 | 15 (79%) | 4 (21%) | 0 (0%) | 0 |
| 5 dB | 29 | 25 (86%) | 4 (14%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| scamType | 17 | 14 | 3 | 0 |
| bank | 12 | 11 | 1 | 0 |
| suspectPhone | 11 | 10 | 1 | 0 |
| utr | 9 | 5 | 4 | 0 |
| time | 8 | 8 | 0 | 0 |
| suspectUpi | 8 | 8 | 0 | 0 |
| amount | 6 | 3 | 3 | 0 |
| paymentApp | 3 | 2 | 1 | 0 |
| suspectAccount | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| te | 76 | 63 | 13 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | te | asr | fn | 12 | te-01 te-04 te-16 te-09 te-35 |
| 2 | bank | te | asr | fn | 11 | te-18 te-30 te-01 te-06 te-16 te-17 te-21 te-38 |
| 3 | suspectPhone | te | asr | fn | 10 | te-09 te-33 te-39 |
| 4 | suspectUpi | te | asr | fn | 8 | te-10 te-34 |
| 5 | utr | te | asr | fn | 5 | te-32 te-31 |
| 6 | utr | te | extractor_form | fn | 4 | te-14 |
| 7 | scamType | te | extractor_form | fn | 3 | te-08 |
| 8 | time | te | asr | fp | 3 | te-09 te-14 |
| 9 | amount | te | extractor_form | fn | 3 | te-16 |
| 10 | time | te | asr | wrong | 3 | te-12 te-26 |
| 11 | scamType | te | asr | fp | 2 | te-10 |
| 12 | time | te | asr | fn | 2 | te-12 te-27 |
| 13 | amount | te | asr | fn | 2 | te-16 te-04 |
| 14 | suspectAccount | te | asr | wrong | 2 | te-19 |
| 15 | paymentApp | te | asr | fn | 2 | te-20 |
| 16 | paymentApp | te | extractor_form | fn | 1 | te-20 |
| 17 | amount | te | asr | wrong | 1 | te-07 |
| 18 | suspectPhone | te | extractor_form | fn | 1 | te-09 |
| 19 | bank | te | extractor_form | fn | 1 | te-12 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. te-16 (story) - fails 100% of 4 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__GiuseppeMultilingual__r0__te`): నా అకౌంట్ నుండి ఇరవై వేల రూపీస్ డెబిట్ అయిపోయాయి ఐసీఐసీఐ బ్యాంక్ ఒక గంట క్రితం కస్టమర్ కెకె కాల్ చేశాను

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **extractor_form**: value is in the transcript but not parsed |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |

### 2. te-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl కి ఎనిమిది వేల రూపాయలు పంపాను, ఇరవై నిమిషాల క్రితం
- Transcript (`te-10__GiuseppeMultilingual__r0__te`): యూపీఐ ఐడి రాహుల్ డాట్ కే వైసీ ఎట్ వైబీఎల్ కి ఎనిమిది వేల రూపాయలు పంపాను ఇరవై నిమిషాల క్రితం

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 3. te-14 (story) - fails 100% of 4 runs

- Reference: UPI రిఫరెన్స్ నంబర్ 4 0 3 2 1 8 7 6 5 4 3 2, ఐదు వేల రూపాయలు పోయాయి
- Transcript (`te-14__GiuseppeMultilingual__r0__te`): యుపిఐ రిఫరెన్స్ నంబర్ నాలుగు సున్నా మూడు రెండు ఒంటి గంట ఎనిమిది ఏడు ఆరు ఐదు నాలుగు మూడు రెండు ఐదు వేల రూపాయలు పోయాయి

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 403218765432 | - | 403218765432 | **extractor_form**: value is in the transcript but not parsed |

### 4. te-32 (answer:utr) - fails 100% of 4 runs

- Reference: 4567 8901 2345
- Transcript (`te-32__GiuseppeMultilingual__r0__te`): ఫోర్ తౌసండ్ ఫైవ్ హండ్రెడ్ సిక్స్టీ సెవెన్ ఎయిట్ తౌసండ్ నైన్ హండ్రెడ్ వన్ టు తౌసండ్ త్రీ హండ్రెడ్ ఫోర్టీ ఫైవ్

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 456789012345 | - | 456789012345 | **asr**: value not in the transcript |

### 5. te-33 (answer:suspect) - fails 100% of 4 runs

- Reference: వాడి నంబర్ 7 0 1 1 2 2 3 3 4 4
- Transcript (`te-33__RemyMultilingual__r0__te`): వాడి నంబర్ ఏడుస్తున్న ఒంటి గంట ఒంటి గంట రెండు రెండు మూడు నాలుగు నాలుగు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7011223344 | - | 7011223344 | **asr**: value not in the transcript |

### 6. te-34 (answer:suspect) - fails 100% of 4 runs

- Reference: sharma dot pay at paytm
- Transcript (`te-34__GiuseppeMultilingual__r0__te`): శామర్ డా పేరం

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | sharma.pay@paytm | - | sharma.pay@paytm | **asr**: value not in the transcript |
