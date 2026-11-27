# Turant pipeline eval: te_transcripts_wb

Generated 2026-11-27T18:34:25.460Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 80 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 80 | 6.3 | 6.3 | 75.0 | 16.9 | 27.6 | 227.9 | 164.8 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 80 | 6.3 | 6.3 | 75.0 | 16.9 | 27.6 | 227.9 | 164.8 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 6.3% of clean runs and 6.3% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te 6%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| time | 113 | 100.0 | 100.0 | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 27.3 | 42.9 | 42.9 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 100.0 | 75.0 | 85.7 | 85.7 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 75.0 | 16.9 | 27.6 | 27.6 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | 6.3 | - | 100.0 | 27.6 | 227.9 | 164.8 | 0.0 (n=16) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / 0.0 | 100.0 / 0.0 | 100.0 / 42.9 | 100.0 / 85.7 | 100.0 / - | 100.0 / - | 100.0 / 0.0 | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 80 | 6.3 | 27.6 | 227.9 | 164.8 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 6.3 | 27.6 | 227.9 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| te-IN-MohanNeural | 40 | 7.5 | 29.7 | 244.3 | 137.3 |
| te-IN-ShrutiNeural | 40 | 5.0 | 25.3 | 211.5 | 192.2 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 6.3 | 27.6 | 227.9 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 44 | 100.0 | 0.0 | 29.7 |
| answer | 26 | 100.0 | 11.5 | 16.7 |
| answer (skip intent) | 2 | 100.0 | 0.0 | - |
| correction | 8 | 100.0 | 25.0 | 40.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 137 | 135 (99%) | 2 (1%) | 0 (0%) | 0 |
| clean | 137 | 135 (99%) | 2 (1%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 48 | 48 | 0 | 0 |
| time | 36 | 36 | 0 | 0 |
| scamType | 16 | 14 | 2 | 0 |
| paymentApp | 8 | 8 | 0 | 0 |
| suspectPhone | 8 | 8 | 0 | 0 |
| bank | 7 | 7 | 0 | 0 |
| utr | 6 | 6 | 0 | 0 |
| suspectUpi | 4 | 4 | 0 | 0 |
| suspectAccount | 2 | 2 | 0 | 0 |
| intent | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| te | 137 | 135 | 2 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | te | asr | fn | 46 | te-01 te-02 te-03 te-04 te-05 te-06 te-07 te-08 +15 |
| 2 | time | te | asr | fn | 31 | te-01 te-02 te-03 te-04 te-07 te-10 te-11 te-12 +8 |
| 3 | scamType | te | asr | fn | 14 | te-01 te-04 te-05 te-07 te-09 te-16 te-18 te-35 |
| 4 | paymentApp | te | asr | fn | 8 | te-02 te-04 te-08 te-20 |
| 5 | suspectPhone | te | asr | fn | 8 | te-09 te-22 te-33 te-39 |
| 6 | bank | te | asr | fn | 7 | te-05 te-11 te-13 te-18 te-29 |
| 7 | utr | te | asr | fn | 6 | te-14 te-31 te-32 |
| 8 | time | te | asr | fp | 4 | te-09 te-17 te-35 |
| 9 | scamType | te | extractor_form | fn | 2 | te-03 |
| 10 | suspectUpi | te | asr | fn | 2 | te-10 |
| 11 | suspectAccount | te | asr | fn | 2 | te-19 |
| 12 | amount | te | asr | wrong | 2 | te-25 |
| 13 | suspectUpi | te | asr | wrong | 2 | te-34 |
| 14 | intent | te | asr | fn | 2 | te-36 |
| 15 | time | te | asr | wrong | 1 | te-16 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. te-04 (story) - fails 100% of 2 runs

- Reference: ఒకతను పొరపాటున డబ్బులు పంపించానని, తిరిగి పంపమని అడిగాడు, నేను గూగుల్ పే ద్వారా పన్నెండు వేల ఐదు వందల రూపాయలు పంపాను, రెండు గంటల క్రితం
- Transcript (`te-04__Mohan__r0__te`): 1.0.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12500 | - | 12500 | **asr**: value not in the transcript |
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: రెండు గంటల క్రితం |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: పొరపాటున |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: గూగుల్ పే |

### 2. te-01 (story) - fails 100% of 2 runs

- Reference: నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు
- Transcript (`te-01__Mohan__r0__te`): Na SBI Khatannundi iDwalu Rupal Poyai, Padhi Nimisala kritam okarukyavai si update ceymani chappar.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: నిమిషాల క్రితం |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 3. te-02 (story) - fails 100% of 2 runs

- Reference: అన్నా త్వరగా, నా అకౌంట్ నుండి ఐదు వేల రూపాయలు పోయాయి, ఫోన్‌పే ద్వారా, ఇప్పుడే జరిగింది
- Transcript (`te-02__Mohan__r0__te`): அந்த வரகா, நான் அக்கும் நுந்தி, 'I'do Vailor Ru' پயலுப் போயாய், குற்புத் தோரா, இப்படி ஷரிந்தி?

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: ఇప్పుడే |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: ఫోన్‌పే |

### 4. te-03 (story) - fails 100% of 2 runs

- Reference: నిన్న సాయంత్రం 7 గంటలకు కస్టమర్ కేర్ నుండి కాల్ వచ్చింది, AnyDesk ఇన్‌స్టాల్ చేయమన్నారు, తర్వాత HDFC అకౌంట్ నుండి రెండు లక్షల రూపాయలు తీసేశారు
- Transcript (`te-03__Mohan__r0__te`): NINASAINTRAM 8-KSTAMAR-KERNUNDI-CALL-WATCHINDI, any disk install ndr, TARVATHA HDFC Account Nundi, RENDULAXHAL RUPALO-TECESAR

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: సాయంత్రం |
| scamType | fn | fake_customer_care | - | fake_customer_care | **extractor_form**: near-spelling variant of: AnyDesk |

### 5. te-10 (story) - fails 100% of 2 runs

- Reference: UPI ID rahul dot kyc at ybl కి ఎనిమిది వేల రూపాయలు పంపాను, ఇరవై నిమిషాల క్రితం
- Transcript (`te-10__Mohan__r0__te`): UPN ID Rahul.KVIC & YBL Ki Enemity Valorupalupampanu, Iravaan Nimeshala-Kritam

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: నిమిషాల క్రితం |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 6. te-11 (story) - fails 100% of 2 runs

- Reference: ఒకటిన్నర లక్షల రూపాయలు పోయాయి, బ్యాంక్ ఆఫ్ బరోడా అకౌంట్, నిన్న రాత్రి 10 గంటలకు
- Transcript (`te-11__Mohan__r0__te`): போکہ تینرہ لکشل روپائل پویای، بھانکاف بروڑا اکھاونٹ, ننراتری پدی گنٹلکو۔

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |
| time | fn | -1d 22:00 (840 min ago) | - | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: రాత్రి |
| bank | fn | Bank of Baroda | - | Bank of Baroda | **asr**: ASR lost/changed: బరోడా |
