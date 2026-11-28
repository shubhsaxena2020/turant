# Turant pipeline eval: blind3_page_ta_final

Generated 2026-11-28T06:52:33.642Z. Extractor: `..\prototype\src\lib\extract.ts`. 42 cases, 24 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 42 | 95.2 | 95.2 | 98.7 | 97.4 | 98.1 | - | - |
| ASR clean, normal rate | 12 | 66.7 | 66.7 | 94.7 | 81.8 | 87.8 | 11.5 | 2.6 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 24 | 75.0 | 75.0 | 97.4 | 86.4 | 91.6 | 10.4 | 2.9 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 66.7% of clean runs and 79.2% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta 67%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 25 | 96.0 | 96.0 | 96.0 | 87.5 | 87.5 | 87.5 | 93.8 |
| time | 19 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| scamType | 10 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| bank | 15 | 100.0 | 93.3 | 96.6 | 100.0 | 75.0 | 85.7 | 93.3 |
| paymentApp | 6 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| utr | 1 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectUpi | 0 | - | - | - | - | - | - | - |
| suspectPhone | 2 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 78 | 98.7 | 97.4 | 98.1 | 94.7 | 81.8 | 87.8 | 91.6 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 83.3 | - | - | 95.2 | - | - | - | - (n=0) |
| ta | 100.0 | 66.7 | - | 100.0 | 87.8 | 11.5 | 2.6 | - (n=0) |
| te | 83.3 | - | - | 90.9 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  | 100.0 / - |  |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  | 100.0 / - |  |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 80.0 / - | 100.0 / - |  |  |  |  |
| ta | 100.0 / 87.5 | 100.0 / 100.0 | 100.0 / 66.7 | 100.0 / 85.7 | 100.0 / 100.0 |  |  |  |  |
| te | 66.7 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |  |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 24 | 75.0 | 91.6 | 10.4 | 2.9 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 24 | 75.0 | 91.6 | 10.4 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| ta-IN-PallaviNeural | 6 | 66.7 | 90.0 | 8.3 | 1.7 |
| ta-IN-ValluvarNeural | 6 | 66.7 | 85.7 | 14.6 | 3.4 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 24 | 75.0 | 91.6 | 10.4 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 4 | 100.0 | 50.0 | 92.3 |
| answer | 6 | 90.5 | 66.7 | 72.7 |
| correction | 2 | 100.0 | 100.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 6 | 5 (83%) | 1 (17%) | 0 (0%) | 0 |
| clean | 6 | 5 (83%) | 1 (17%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| scamType | 4 | 3 | 1 | 0 |
| amount | 1 | 1 | 0 | 0 |
| bank | 1 | 1 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| ta | 6 | 5 | 1 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | ta | asr | fn | 3 | ta-d01 |
| 2 | amount | ta | asr | wrong | 1 | ta-d04 |
| 3 | bank | ta | asr | fn | 1 | ta-d05 |
| 4 | scamType | ta | extractor_form | fn | 1 | ta-d01 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. ta-d01 (story) - fails 100% of 4 runs

- Reference: நேற்று இரவு ஒன்பது மணிக்கு ஒருவர் வங்கியிலிருந்து பேசுவதாக சொல்லி ஓடிபி கேட்டார், நான் சொன்னேன், என் இந்தியன் வங்கி கணக்கிலிருந்து பத்தாயிரம் ரூபாய் போய்விட்டது
- Transcript (`ta-d01__Pallavi__r0__ta`): நேற்று இரவு ஒன்பது மணிக்கு ஒருவர் வங்கியிலிருந்து பேசுவதாக சொல்லி ஓடிப்பி கேட்டார் நான் சொன்னேன் என் இந்தியன் வங்கி கணக்கிலிருந்து பத்தாயிரம் ரூபாய் போய்விட்டது

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: ஓடிபி |

### 2. ta-d04 (answer:amount) - fails 25% of 4 runs

- Reference: எழுபத்தைந்தாயிரம் ரூபாய்
- Transcript (`ta-d04__Valluvar__r0__ta`): எழுபத்தி ஐந்தாயிரம் ரூபாய்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 75000 | 5000 | 75000 | **asr**: value not in the transcript |

### 3. ta-d05 (answer:bank) - fails 25% of 4 runs

- Reference: இந்தியன் ஓவர்சீஸ் பேங்க்
- Transcript (`ta-d05__Pallavi__r0__ta`): இந்தியன் ஓவர் சி ஸ்பெண்ட்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Indian Overseas Bank | - | Indian Overseas Bank | **asr**: ASR lost/changed: ஓவர்சீஸ் |
