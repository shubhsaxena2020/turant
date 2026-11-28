# Turant pipeline eval: te_page58

Generated 2026-11-28T01:46:08.139Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 80 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 80 | 68.8 | 68.8 | 97.8 | 82.5 | 89.5 | 45.2 | 39.2 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 80 | 68.8 | 68.8 | 97.8 | 82.5 | 89.5 | 45.2 | 39.2 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 75.0% of clean runs and 75.0% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te 75%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 97.9 | 95.8 | 96.8 | 96.8 |
| time | 113 | 100.0 | 100.0 | 100.0 | 97.0 | 100.0 | 98.5 | 98.5 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 59.1 | 74.3 | 74.3 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 100.0 | 92.9 | 96.3 | 96.3 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 75.0 | 85.7 | 85.7 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 100.0 | 66.7 | 80.0 | 80.0 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 25.0 | 40.0 | 40.0 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 50.0 | 50.0 | 50.0 | 50.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 97.8 | 82.5 | 89.5 | 89.5 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | 68.8 | - | 100.0 | 89.5 | 45.2 | 39.2 | 62.5 (n=16) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / 96.8 | 100.0 / 98.5 | 100.0 / 74.3 | 100.0 / 96.3 | 100.0 / 85.7 | 100.0 / 80.0 | 100.0 / - | 100.0 / 40.0 | 100.0 / 50.0 |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 80 | 68.8 | 89.5 | 45.2 | 39.2 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 68.8 | 89.5 | 45.2 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| te-IN-MohanNeural | 40 | 70.0 | 90.4 | 45.4 | 39.4 |
| te-IN-ShrutiNeural | 40 | 67.5 | 88.6 | 45.0 | 39.1 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 68.8 | 89.5 | 45.2 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 44 | 100.0 | 59.1 | 89.4 |
| answer | 26 | 100.0 | 80.8 | 90.2 |
| answer (skip intent) | 2 | 100.0 | 100.0 | 100.0 |
| correction | 8 | 100.0 | 75.0 | 85.7 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 29 | 23 (79%) | 6 (21%) | 0 (0%) | 0 |
| clean | 29 | 23 (79%) | 6 (21%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| scamType | 9 | 7 | 2 | 0 |
| suspectPhone | 6 | 5 | 1 | 0 |
| suspectUpi | 4 | 4 | 0 | 0 |
| amount | 2 | 2 | 0 | 0 |
| utr | 2 | 0 | 2 | 0 |
| bank | 2 | 2 | 0 | 0 |
| paymentApp | 2 | 1 | 1 | 0 |
| time | 1 | 1 | 0 | 0 |
| suspectAccount | 1 | 1 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| te | 29 | 23 | 6 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | te | asr | fn | 7 | te-01 te-09 te-16 te-35 |
| 2 | suspectPhone | te | asr | fn | 5 | te-09 te-33 te-39 |
| 3 | suspectUpi | te | asr | fn | 4 | te-10 te-34 |
| 4 | scamType | te | extractor_form | fn | 2 | te-08 |
| 5 | utr | te | extractor_form | fn | 2 | te-14 |
| 6 | bank | te | asr | fn | 2 | te-18 |
| 7 | amount | te | asr | wrong | 1 | te-07 |
| 8 | time | te | asr | fp | 1 | te-09 |
| 9 | suspectPhone | te | extractor_form | fn | 1 | te-09 |
| 10 | amount | te | asr | fn | 1 | te-16 |
| 11 | suspectAccount | te | asr | wrong | 1 | te-19 |
| 12 | paymentApp | te | extractor_form | fn | 1 | te-20 |
| 13 | paymentApp | te | asr | fn | 1 | te-20 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. te-09 (story) - fails 100% of 2 runs

- Reference: కాల్ వచ్చిన నంబర్ 9 8 7 6 5... 4 3 2 1 0, బ్యాంక్ నుండి మాట్లాడుతున్నాం, KYC చేయకపోతే అకౌంట్ బ్లాక్ అవుతుందని చెప్పారు
- Transcript (`te-09__Mohan__r0__te`): కాల్ వచ్చిన నంబర్ తొమ్మిది ఎనిమిది ఏడు ఆరు ఐదు నాలుగు మూడు రెండు వంటి గంటలు సున్నా బ్యాంక్ నుండి మాట్లాడుతున్నాం కెవాసి చేయకపోతే అకౌంట్ బ్లాక్ అవుతుందని చెప్పారు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 2. te-16 (story) - fails 100% of 2 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__Mohan__r0__te`): నా అకౌంట్ నుండి ఇరావాయి వేలు రుపీస్ డెబిట్ అయిపోయాయి ఐసిఐసిఐ బ్యాంక్ ఒక గంట క్రితం కస్టమర్ కేఆర్ కి కాల్ చేశాను

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |

### 3. te-01 (story) - fails 100% of 2 runs

- Reference: నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు
- Transcript (`te-01__Mohan__r0__te`): నా ఎస్బీఐ ఖాతా నుండి ఐదు వేలు రూపాయలు పోయాయి పది నిమిషాల క్రితం ఒకరు అప్ డేట్ చేయమని చెప్పారు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 4. te-08 (story) - fails 100% of 2 runs

- Reference: ఒక వీడియో కాల్ వచ్చింది, రికార్డ్ చేసి ఇప్పుడు బ్లాక్‌మెయిల్ చేస్తున్నారు, పేటీఎం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేశాను
- Transcript (`te-08__Mohan__r0__te`): ఒక వీడియో కాల్ వచ్చింది రికార్డు చేసి ఇప్పుడు బ్లాక్ మెయిల్ చేస్తున్నారు పేటీఎం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేశాను

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | sextortion | **extractor_form**: key words survive (బ్లాక్‌మెయిల్) but the extractor fails |

### 5. te-10 (story) - fails 100% of 2 runs

- Reference: UPI ID rahul dot kyc at ybl కి ఎనిమిది వేల రూపాయలు పంపాను, ఇరవై నిమిషాల క్రితం
- Transcript (`te-10__Mohan__r0__te`): యూపీఐ ఐడి రాహుల్ డాట్ కే వాసి ఎనిమిది వేల రూపాయలు పంపాను ఇరవై నిమిషాల క్రితం

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 6. te-14 (story) - fails 100% of 2 runs

- Reference: UPI రిఫరెన్స్ నంబర్ 4 0 3 2 1 8 7 6 5 4 3 2, ఐదు వేల రూపాయలు పోయాయి
- Transcript (`te-14__Mohan__r0__te`): యూపీఐ రిఫరెన్స్ నెంబర్ నాలుగు సున్నా మూడు రెండు ఒంటి గంట ఎనిమిది ఏడు ఆరు ఐదు నాలుగు మూడు రెండు ఐదు వేల రూపాయలు పోయాయి

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 403218765432 | - | 403218765432 | **extractor_form**: value is in the transcript but not parsed |
