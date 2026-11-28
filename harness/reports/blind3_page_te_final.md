# Turant pipeline eval: blind3_page_te_final

Generated 2026-11-28T06:52:06.049Z. Extractor: `..\prototype\src\lib\extract.ts`. 42 cases, 24 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 42 | 95.2 | 95.2 | 98.7 | 97.4 | 98.1 | - | - |
| ASR clean, normal rate | 12 | 66.7 | 66.7 | 90.0 | 81.8 | 85.7 | 10.6 | 1.8 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 24 | 70.8 | 70.8 | 90.2 | 84.1 | 87.1 | 8.0 | 2.0 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 91.7% of clean runs and 95.8% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te 92%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 25 | 96.0 | 96.0 | 96.0 | 66.7 | 66.7 | 66.7 | 66.7 |
| time | 19 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| scamType | 10 | 100.0 | 100.0 | 100.0 | 100.0 | 75.0 | 85.7 | 93.3 |
| bank | 15 | 100.0 | 93.3 | 96.6 | 100.0 | 83.3 | 90.9 | 90.9 |
| paymentApp | 6 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| utr | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 0 | - | - | - | - | - | - | - |
| suspectPhone | 2 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 78 | 98.7 | 97.4 | 98.1 | 90.0 | 81.8 | 85.7 | 87.1 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 83.3 | - | - | 95.2 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 83.3 | 66.7 | - | 90.9 | 85.7 | 10.6 | 1.8 | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  | 100.0 / - |  |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  | 100.0 / - |  |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 80.0 / - | 100.0 / - |  |  |  |  |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| te | 66.7 / 66.7 | 100.0 / 100.0 | 100.0 / 85.7 | 100.0 / 90.9 |  |  |  |  |  |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 24 | 70.8 | 87.1 | 8.0 | 2.0 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 24 | 70.8 | 87.1 | 8.0 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| te-IN-MohanNeural | 6 | 66.7 | 85.7 | 10.6 | 1.2 |
| te-IN-ShrutiNeural | 6 | 66.7 | 85.7 | 10.6 | 2.3 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 24 | 70.8 | 87.1 | 8.0 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 4 | 100.0 | 50.0 | 92.3 |
| answer | 6 | 90.5 | 66.7 | 66.7 |
| correction | 2 | 100.0 | 100.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 7 | 1 (14%) | 2 (29%) | 4 (57%) | 4 |
| clean | 7 | 1 (14%) | 2 (29%) | 4 (57%) | 4 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 4 | 0 | 0 | 4 |
| bank | 2 | 0 | 2 | 0 |
| scamType | 1 | 1 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| te | 7 | 1 | 2 | 4 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | te | extractor | wrong | 4 | te-d04 |
| 2 | bank | te | extractor_form | fn | 2 | te-d02 |
| 3 | scamType | te | asr | fn | 1 | te-d02 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. te-d04 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: లక్షా యాభై వేలు
- Transcript (`te-d04__Mohan__r0__te`): లక్షా యాభై వేలు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 150000 | 50000 | 50000 | **extractor**: fails on the reference text too (wrong); ASR also lost the value |

### 2. te-d02 (story) - fails 75% of 4 runs

- Reference: క్యూఆర్ కోడ్ స్కాన్ చేశాను, నా ఎస్బీఐ అకౌంట్ నుండి ఎనిమిది వేల రూపాయలు పోయాయి, ఇరవై నిమిషాల క్రితం
- Transcript (`te-d02__Mohan__r0__te`): క్యూఆర్ కోర్సు కాన్ చేశాను నా ఎస్బీఏ అకౌంట్ నుండి ఎనిమిది వేల రూపాయలు పోయాయి ఇరవై నిమిషాల క్రితం

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **extractor_form**: near-spelling variant of: ఎస్బీఐ |
