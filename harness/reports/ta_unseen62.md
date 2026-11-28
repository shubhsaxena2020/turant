# Turant pipeline eval: ta_unseen62

Generated 2026-11-28T04:32:15.235Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 160 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 0 | - | - | - | - | - | - | - |
| ASR noise 15 dB | 40 | 47.5 | 47.5 | 93.4 | 71.3 | 80.9 | 50.0 | 44.4 |
| ASR noise 5 dB | 40 | 45.0 | 45.0 | 93.1 | 67.5 | 78.3 | 53.5 | 46.4 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 160 | 50.0 | 50.0 | 93.1 | 71.6 | 80.9 | 51.8 | 45.1 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): -% of clean runs and 51.9% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | - | - | - | 77.2 |
| time | 113 | 100.0 | 100.0 | 100.0 | - | - | - | 100.0 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | - | - | - | 77.8 |
| bank | 97 | 100.0 | 100.0 | 100.0 | - | - | - | 80.9 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 54.5 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | - | - | 73.7 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 81.5 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 100.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | - | - | - | 80.9 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | 45.0 | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
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
| babble 15 dB | 6 | 66.7 | 90.9 | 46.3 | 42.6 |
| babble 5 dB | 6 | 66.7 | 90.9 | 53.7 | 46.9 |
| clean | 80 | 53.8 | 82.2 | 51.8 | 44.7 |
| pink 15 dB | 16 | 37.5 | 76.7 | 55.0 | 45.9 |
| pink 5 dB | 16 | 31.3 | 70.2 | 62.6 | 50.1 |
| traffic 15 dB | 18 | 50.0 | 81.4 | 46.8 | 43.6 |
| traffic 5 dB | 18 | 50.0 | 81.4 | 45.2 | 42.6 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 53.8 | 82.2 | 51.8 |
| 15 dB | 40 | 47.5 | 80.9 | 50.0 |
| 5 dB | 40 | 45.0 | 78.3 | 53.5 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 53.8 | 82.2 | 51.8 |

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
| all forced-language runs | 91 | 84 (92%) | 7 (8%) | 0 (0%) | 0 |
| clean | 42 | 40 (95%) | 2 (5%) | 0 (0%) | 0 |
| 15 dB | 23 | 22 (96%) | 1 (4%) | 0 (0%) | 0 |
| 5 dB | 26 | 22 (85%) | 4 (15%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 25 | 21 | 4 | 0 |
| bank | 18 | 18 | 0 | 0 |
| scamType | 16 | 16 | 0 | 0 |
| paymentApp | 10 | 7 | 3 | 0 |
| suspectUpi | 8 | 8 | 0 | 0 |
| utr | 5 | 5 | 0 | 0 |
| suspectPhone | 5 | 5 | 0 | 0 |
| suspectAccount | 4 | 4 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| ta | 91 | 84 | 7 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | bank | ta | asr | fn | 18 | ta-06 ta-13 ta-18 ta-21 ta-30 ta-11 ta-16 |
| 2 | amount | ta | asr | wrong | 17 | ta-06 ta-07 ta-14 ta-21 ta-24 |
| 3 | scamType | ta | asr | fn | 16 | ta-01 ta-03 ta-05 ta-09 ta-16 ta-35 |
| 4 | suspectUpi | ta | asr | fn | 8 | ta-10 ta-34 |
| 5 | paymentApp | ta | asr | fn | 7 | ta-08 ta-20 ta-02 |
| 6 | utr | ta | asr | fn | 5 | ta-32 ta-31 |
| 7 | suspectPhone | ta | asr | fn | 5 | ta-39 ta-22 |
| 8 | amount | ta | extractor_form | fn | 4 | ta-16 |
| 9 | suspectAccount | ta | asr | fn | 4 | ta-19 |
| 10 | amount | ta | asr | fn | 4 | ta-24 ta-23 |
| 11 | paymentApp | ta | extractor_form | fn | 3 | ta-02 ta-04 ta-20 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. ta-16 (story) - fails 100% of 4 runs

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__GiuseppeMultilingual__r0__ta`): என கவுண்ட் இருந்து இருபதாயிரம் ரூபிஸ் டெபிட் ஆயிடுச்சு ஐசிஐசிஐ பேங்க் ஒரு மணி நேரத்துக்கு முன்னாடி கஷ்டம் கேக்க கால் பண்ணேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **extractor_form**: value is in the transcript but not parsed |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |

### 2. ta-21 (story) - fails 100% of 4 runs

- Reference: கரண்ட் பில் மெசேஜ் வந்தது, லிங்க் கிளிக் பண்ணேன், 9999 ரூபாய் கட் ஆச்சு, ஸ்டேட் பேங்க்
- Transcript (`ta-21__RemyMultilingual__r0__ta`): கரண்பில் மெசேஜ் வந்தது லிங்கில் பண்ணேன் ஒன்பதாயிரத்தி தொள்ளாயிரத்தி தொண்ணூத்தி ஒன்பது ரூபாய் கட்டாட்சி ஸ்டேட் பெங்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 9999 | 9 | 9999 | **asr**: value not in the transcript |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: பேங்க் |

### 3. ta-06 (story) - fails 100% of 4 runs

- Reference: டெலிகிராம்ல பார்ட் டைம் ஜாப் டாஸ்க் கொடுத்தாங்க, அப்புறம் இன்வெஸ்ட் பண்ண சொன்னாங்க, நான் நாற்பத்தேழாயிரம் ரூபாய் போட்டுட்டேன், கோட்டக் பேங்க்ல இருந்து
- Transcript (`ta-06__GiuseppeMultilingual__r0__ta`): தெலிகிராம் பார்ட்டை ஜாப் டாஸ் கொடுத்தாங்க அப்புறம் இன்வெஸ்ட் பண்ண சொன்னாங்க நான் நாற்பதாயிரம் ரூபாய் போட்டுட்டேன் கோட்டக் பெயர்ந்து

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 47000 | 40000 | 47000 | **asr**: value not in the transcript |

### 4. ta-01 (story) - fails 100% of 4 runs

- Reference: என் SBI கணக்கிலிருந்து 5000 ரூபாய் போய்விட்டது, 10 நிமிடங்களுக்கு முன்பு ஒருவர் KYC அப்டேட் செய்யச் சொன்னார்
- Transcript (`ta-01__RemyMultilingual__r0__ta`): என் எஸ் பி ஆய் கணக்கிலிருந்து ஐந்தாயிரம் ரூபாய் போய்விட்டது பத்து நிமிடங்களுக்கு முன்பு ஒருவர் கே வாய்ச்சி அப்டே செய்யச் சொன்னார்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 5. ta-07 (story) - fails 100% of 4 runs

- Reference: ஒரு QR code அனுப்பி ஸ்கேன் பண்ணா பணம் வரும்னு சொன்னாங்க, ஸ்கேன் பண்ணதும் ₹4,999 போச்சு, இன்று காலை 10 மணிக்கு
- Transcript (`ta-07__RemyMultilingual__r0__ta`): ஒருக்கியார் கோத் அனுப்பி ஸ்கேன் பண்ணா பணம் வரும்னு சொன்னாங்க ஸ்கேன் பண்ணதும் நான்காயிரத்து தொள்ளாயிரத்து தொண்ணூற்று ஒன்பது ரூபாய் போச்சு இன்று காலை பத்து மணிக்கு

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 9 | 4999 | **asr**: value not in the transcript |

### 6. ta-08 (story) - fails 100% of 4 runs

- Reference: ஒரு வீடியோ கால் வந்தது, ரெக்கார்ட் பண்ணி இப்போ மிரட்டல் பண்றாங்க, பேடிஎம் மூலமா பதினைந்தாயிரம் ரூபாய் கொடுத்துட்டேன்
- Transcript (`ta-08__GiuseppeMultilingual__r0__ta`): ஒரு வீடியோ கால் வந்தது ரெக்கார் பண்ணி இப்போ மிரட்டல் பண்ணிட்டாங்க பேடிய மூலம் பதினைந்தாயிரம் ரூபாய் கொடுத்துட்டேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: பேடிஎம் |
