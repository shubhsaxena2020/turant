# Turant pipeline eval: ta_base47

Generated 2026-11-27T22:06:05.130Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 80 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 80 | 50.0 | 50.0 | 91.9 | 70.6 | 79.9 | 49.3 | 42.3 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 80 | 50.0 | 50.0 | 91.9 | 70.6 | 79.9 | 49.3 | 42.3 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 50.0% of clean runs and 50.0% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta 50%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 80.9 | 79.2 | 80.0 | 80.0 |
| time | 113 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 93.8 | 53.6 | 68.2 | 68.2 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 100.0 | 83.3 | 90.9 | 90.9 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 62.5 | 76.9 | 76.9 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 50.0 | 66.7 | 66.7 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 91.9 | 70.6 | 79.9 | 79.9 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | 50.0 | - | 100.0 | 79.9 | 49.3 | 42.3 | 0.0 (n=16) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / 80.0 | 100.0 / 100.0 | 100.0 / 66.7 | 100.0 / 68.2 | 100.0 / 66.7 | 100.0 / 90.9 | 100.0 / - | 100.0 / 76.9 | 100.0 / 66.7 |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 80 | 50.0 | 79.9 | 49.3 | 42.3 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 50.0 | 79.9 | 49.3 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| ta-IN-PallaviNeural | 40 | 52.5 | 81.7 | 48.6 | 42.2 |
| ta-IN-ValluvarNeural | 40 | 47.5 | 78.0 | 50.0 | 42.3 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 50.0 | 79.9 | 49.3 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 44 | 100.0 | 36.4 | 80.2 |
| answer | 26 | 100.0 | 65.4 | 79.2 |
| answer (skip intent) | 2 | 100.0 | 100.0 | 100.0 |
| correction | 8 | 100.0 | 62.5 | 71.4 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 47 | 46 (98%) | 1 (2%) | 0 (0%) | 0 |
| clean | 47 | 46 (98%) | 1 (2%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bank | 13 | 13 | 0 | 0 |
| scamType | 11 | 10 | 1 | 0 |
| amount | 10 | 10 | 0 | 0 |
| paymentApp | 4 | 4 | 0 | 0 |
| suspectUpi | 4 | 4 | 0 | 0 |
| suspectPhone | 3 | 3 | 0 | 0 |
| suspectAccount | 1 | 1 | 0 | 0 |
| utr | 1 | 1 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| ta | 47 | 46 | 1 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | bank | ta | asr | fn | 12 | ta-01 ta-05 ta-13 ta-16 ta-17 ta-18 ta-21 ta-30 |
| 2 | scamType | ta | asr | fn | 10 | ta-01 ta-05 ta-09 ta-16 ta-35 |
| 3 | amount | ta | asr | wrong | 9 | ta-06 ta-07 ta-14 ta-21 ta-24 |
| 4 | paymentApp | ta | asr | fn | 4 | ta-02 ta-08 ta-20 |
| 5 | suspectUpi | ta | asr | fn | 4 | ta-10 ta-34 |
| 6 | suspectPhone | ta | asr | fn | 3 | ta-22 ta-39 |
| 7 | scamType | ta | extractor_form | fn | 1 | ta-08 |
| 8 | suspectAccount | ta | asr | fn | 1 | ta-19 |
| 9 | amount | ta | asr | fn | 1 | ta-24 |
| 10 | utr | ta | asr | fn | 1 | ta-32 |
| 11 | bank | ta | asr | wrong | 1 | ta-38 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. ta-05 (story) - fails 100% of 2 runs

- Reference: என் அக்கவுண்ட்ல இருந்து ஐயாயிரம்... இல்ல இல்ல, ஆறாயிரம் ரூபாய் போச்சு, OTP சொல்லிட்டேன், கனரா பேங்க்
- Transcript (`ta-05__Pallavi__r0__ta`): என் அக்கவுண்டில் இருந்து ஐயாயிரம் இல்ல இல்ல ஆறாயிரம் ரூபாய் போச்சு டி பி சொல்லிட்டேன் தன் பேங்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: OTP |
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: கனரா |

### 2. ta-21 (story) - fails 100% of 2 runs

- Reference: கரண்ட் பில் மெசேஜ் வந்தது, லிங்க் கிளிக் பண்ணேன், 9999 ரூபாய் கட் ஆச்சு, ஸ்டேட் பேங்க்
- Transcript (`ta-21__Pallavi__r0__ta`): கரண்ட் பில் மெசேஜ் வந்தது லிங்க் கிளிக் பண்ணின ஒன்பதாயிரத்தி தொள்ளாயிரத்தி தொண்ணூற்றி ஒன்பது ரூபாய் கட் ஆற்று ஸ்டேட் பேண்ட்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 9999 | 9 | 9999 | **asr**: value not in the transcript |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: பேங்க் |

### 3. ta-01 (story) - fails 100% of 2 runs

- Reference: என் SBI கணக்கிலிருந்து 5000 ரூபாய் போய்விட்டது, 10 நிமிடங்களுக்கு முன்பு ஒருவர் KYC அப்டேட் செய்யச் சொன்னார்
- Transcript (`ta-01__Pallavi__r0__ta`): என் எஸ் பி பி கணக்கிலிருந்து ஐந்தாயிரம் ரூபாய் போய்விட்டது பத்து நிமிடங்களுக்கு முன்பு ஒருவர் கேவா சி அப்டேட் செய்ய சொன்னார்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 4. ta-08 (story) - fails 100% of 2 runs

- Reference: ஒரு வீடியோ கால் வந்தது, ரெக்கார்ட் பண்ணி இப்போ மிரட்டல் பண்றாங்க, பேடிஎம் மூலமா பதினைந்தாயிரம் ரூபாய் கொடுத்துட்டேன்
- Transcript (`ta-08__Pallavi__r0__ta`): ஒரு வீடியோ கால் வந்தது ரெக்கார்ட் பண்ணி இப்போ மிரட்டல் பண்றாங்க பேடியும் மூலமா பதினைந்தாயிரம் ரூபாய் கொடுத்துட்டேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: பேடிஎம் |

### 5. ta-16 (story) - fails 100% of 2 runs

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__Pallavi__r0__ta`): என்ன இருந்து இருபதாயிரம் ரூபீஸ் டெபிட் ஆயிடுச்சு ஐசிஐசிஆய் பேங்க் ஒரு மணி நேரத்துக்கு முன்னாடி காஸ்ட்மா கு கால் பண்ணேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |

### 6. ta-06 (story) - fails 100% of 2 runs

- Reference: டெலிகிராம்ல பார்ட் டைம் ஜாப் டாஸ்க் கொடுத்தாங்க, அப்புறம் இன்வெஸ்ட் பண்ண சொன்னாங்க, நான் நாற்பத்தேழாயிரம் ரூபாய் போட்டுட்டேன், கோட்டக் பேங்க்ல இருந்து
- Transcript (`ta-06__Pallavi__r0__ta`): டெலிகிராம் பார்ட்டை ஜாப் தாஸ் கொடுத்தாங்க அப்புறம் இன்வெஸ்ட் பண்ண சொன்னாங்க நான் நாற்பதாயிரம் ரூபாய் போட்டுத்தேன் கோட்டக் பங்க இருந்து

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 47000 | 40000 | 47000 | **asr**: value not in the transcript |
