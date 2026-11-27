# Turant pipeline eval: ta_transcripts_wb

Generated 2026-11-27T18:52:47.060Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 80 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 80 | 6.3 | 6.3 | 53.8 | 17.5 | 26.4 | 171.2 | 94.1 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 80 | 6.3 | 6.3 | 53.8 | 17.5 | 26.4 | 171.2 | 94.1 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 10.0% of clean runs and 10.0% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta 10%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 11.1 | 2.1 | 3.5 | 3.5 |
| time | 113 | 100.0 | 100.0 | 100.0 | 29.4 | 15.6 | 20.4 | 20.4 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 75.0 | 27.3 | 40.0 | 40.0 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 100.0 | 39.3 | 56.4 | 56.4 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 53.8 | 17.5 | 26.4 | 26.4 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | 6.3 | - | 100.0 | 26.4 | 171.2 | 94.1 | 0.0 (n=16) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / 3.5 | 100.0 / 20.4 | 100.0 / 40.0 | 100.0 / 56.4 | 100.0 / 66.7 | 100.0 / - | 100.0 / 0.0 | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 80 | 6.3 | 26.4 | 171.2 | 94.1 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 6.3 | 26.4 | 171.2 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| ta-IN-PallaviNeural | 40 | 10.0 | 26.4 | 138.3 | 66.6 |
| ta-IN-ValluvarNeural | 40 | 2.5 | 26.4 | 204.2 | 121.7 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 6.3 | 26.4 | 171.2 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 44 | 100.0 | 0.0 | 26.9 |
| answer | 26 | 100.0 | 7.7 | 19.5 |
| answer (skip intent) | 2 | 100.0 | 50.0 | 66.7 |
| correction | 8 | 100.0 | 25.0 | 33.3 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 137 | 126 (92%) | 11 (8%) | 0 (0%) | 0 |
| clean | 137 | 126 (92%) | 11 (8%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 48 | 46 | 2 | 0 |
| time | 29 | 26 | 3 | 0 |
| scamType | 18 | 17 | 1 | 0 |
| bank | 17 | 16 | 1 | 0 |
| suspectPhone | 8 | 8 | 0 | 0 |
| utr | 6 | 6 | 0 | 0 |
| paymentApp | 4 | 1 | 3 | 0 |
| suspectUpi | 4 | 4 | 0 | 0 |
| suspectAccount | 2 | 2 | 0 | 0 |
| intent | 1 | 0 | 1 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| ta | 137 | 126 | 11 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | ta | asr | fn | 38 | ta-01 ta-02 ta-03 ta-05 ta-06 ta-07 ta-08 ta-10 +12 |
| 2 | time | ta | asr | fn | 16 | ta-01 ta-02 ta-04 ta-10 ta-11 ta-12 ta-13 ta-16 +3 |
| 3 | bank | ta | asr | fn | 16 | ta-05 ta-06 ta-12 ta-13 ta-16 ta-17 ta-18 ta-21 +2 |
| 4 | scamType | ta | asr | fn | 15 | ta-01 ta-03 ta-04 ta-05 ta-06 ta-07 ta-09 ta-16 +1 |
| 5 | time | ta | asr | wrong | 8 | ta-07 ta-20 ta-26 ta-28 ta-40 |
| 6 | suspectPhone | ta | asr | fn | 8 | ta-09 ta-22 ta-33 ta-39 |
| 7 | amount | ta | asr | wrong | 7 | ta-04 ta-11 ta-16 ta-25 |
| 8 | utr | ta | asr | fn | 6 | ta-14 ta-31 ta-32 |
| 9 | paymentApp | ta | extractor_form | fn | 3 | ta-02 ta-20 |
| 10 | time | ta | extractor_form | wrong | 2 | ta-03 ta-04 |
| 11 | scamType | ta | asr | fp | 2 | ta-10 |
| 12 | suspectUpi | ta | asr | fn | 2 | ta-10 |
| 13 | amount | ta | extractor_form | fn | 2 | ta-15 |
| 14 | suspectAccount | ta | asr | fn | 2 | ta-19 |
| 15 | suspectUpi | ta | asr | wrong | 2 | ta-34 |
| 16 | time | ta | asr | fp | 2 | ta-35 |
| 17 | time | ta | extractor_form | fn | 1 | ta-03 |
| 18 | scamType | ta | extractor_form | fn | 1 | ta-08 |
| 19 | paymentApp | ta | asr | fn | 1 | ta-08 |
| 20 | bank | ta | extractor_form | fn | 1 | ta-16 |
| 21 | intent | ta | extractor_form | fn | 1 | ta-36 |
| 22 | amount | ta | asr | fp | 1 | ta-39 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. ta-10 (story) - fails 100% of 2 runs

- Reference: UPI ID rahul dot kyc at ybl க்கு எட்டாயிரம் ரூபாய் அனுப்பினேன், இருபது நிமிஷத்துக்கு முன்னாடி
- Transcript (`ta-10__Pallavi__r0__ta`): 'UPIDRAHUL.KYC' 'AdvYPL''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |
| time | fn | today 11:40 (20 min ago) | - | today 11:40 (20 min ago) | **asr**: ASR lost/changed: நிமிஷத்துக்கு |
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 2. ta-16 (story) - fails 100% of 2 runs

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__Pallavi__r0__ta`): என்னை இருந்து 20 20-25 Rs, IIT, ICI Bank, 1 மண்ணாடி காஷ்டமாக குக்காள் பாணேன்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 20000 | 25 | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: நேரத்துக்கு |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 3. ta-03 (story) - fails 100% of 2 runs

- Reference: நேத்து சாயங்காலம் 7 மணிக்கு கஸ்டமர் கேர்ல இருந்து கால் வந்தது, AnyDesk இன்ஸ்டால் பண்ண சொன்னாங்க, அப்புறம் HDFC அக்கவுண்ட்ல இருந்து இரண்டு லட்சம் ரூபாய் எடுத்துட்டாங்க
- Transcript (`ta-03__Pallavi__r0__ta`): நேற்று சாயங்களாம் 28 மனைக்கு கத்தமர் கேட்டு இருந்து கால் வந்தது, என்னிடு சக் கண்ஸ்டால் சொன்னாங்கள் அப்புரம் HDFC அக்கவும்லு இருந்து இருந்து இருந்துல்லைத்தும் ருபாய் கடுத்துக்கொண்டாங்கள்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **extractor_form**: near-spelling variant of: சாயங்காலம் |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 4. ta-07 (story) - fails 100% of 2 runs

- Reference: ஒரு QR code அனுப்பி ஸ்கேன் பண்ணா பணம் வரும்னு சொன்னாங்க, ஸ்கேன் பண்ணதும் ₹4,999 போச்சு, இன்று காலை 10 மணிக்கு
- Transcript (`ta-07__Pallavi__r0__ta`): ஒரு கிவார் கோட அனுப்பிஷ்கேன் பண்ணா பணம் பரும்பு சொன்னாங்கள். சகேன் பண்ணதம் நான் காயரத்துல் தொடலாயரத்து தொன்னும் சொன்பது ருவாய் போதுக்கும் இந்த காலை பார்த்து மனைக்கும்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 09:00 (180 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 மணிக்கு |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ஸ்கேன் |

### 5. ta-12 (story) - fails 100% of 2 runs

- Reference: இரண்டாயிரத்து ஐநூறு ரூபாய் கட் ஆயிடுச்சு, அரை மணி நேரத்துக்கு முன்னாடி, இந்தியன் வங்கி
- Transcript (`ta-12__Pallavi__r0__ta`): இரண்டாயர்த்து அனுவரு ருபாய் கட்டாயிடைத்து ஏறை மனினேர்த்துக்கும் முன்னாடி இந்த வங்கி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2500 | - | 2500 | **asr**: value not in the transcript |
| time | fn | today 11:30 (30 min ago) | - | today 11:30 (30 min ago) | **asr**: ASR lost/changed: அரை நேரத்துக்கு |
| bank | fn | Indian Bank | - | Indian Bank | **asr**: ASR lost/changed: இந்தியன் |

### 6. ta-18 (story) - fails 100% of 2 runs

- Reference: இரண்டரை லட்சம் ரூபாய் முதலீடு பண்ண சொல்லி வாங்கிட்டாங்க, பணம் டபுள் ஆகும்னு சொன்னாங்க, யெஸ் பேங்க்
- Transcript (`ta-18__Pallavi__r0__ta`): இரண்டரை Lacham Roobhai, முதலியில் பண்ணா சொல்லி வாங்கிவிட்டாங்கள். பணம் தபுள் அகும்னும் சொன்னார்கள்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: முதலீடு |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: யெஸ் பேங்க் |
