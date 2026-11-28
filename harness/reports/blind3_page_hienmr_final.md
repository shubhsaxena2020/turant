# Turant pipeline eval: blind3_page_hienmr_final

Generated 2026-11-28T06:51:52.687Z. Extractor: `..\prototype\src\lib\extract.ts`. 42 cases, 78 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 42 | 95.2 | 95.2 | 98.7 | 97.4 | 98.1 | - | - |
| ASR clean, normal rate | 42 | 83.3 | 83.3 | 96.0 | 91.1 | 93.5 | 71.7 | 73.9 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 78 | 80.8 | 80.8 | 94.2 | 89.1 | 91.6 | 75.7 | 79.4 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 83.3% of clean runs and 80.8% of all runs fully correct. Per language (clean): hi 83%, en 94%, bn -%, ta -%, te -%, mr 67%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 25 | 96.0 | 96.0 | 96.0 | 92.0 | 92.0 | 92.0 | 89.4 |
| time | 19 | 100.0 | 100.0 | 100.0 | 93.8 | 83.3 | 88.2 | 86.2 |
| scamType | 10 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 90.3 |
| bank | 15 | 100.0 | 93.3 | 96.6 | 100.0 | 83.3 | 90.9 | 95.2 |
| paymentApp | 6 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| utr | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| suspectUpi | 0 | - | - | - | - | - | - | - |
| suspectPhone | 2 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 78 | 98.7 | 97.4 | 98.1 | 96.0 | 91.1 | 93.5 | 91.6 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | 83.3 | - | 100.0 | 90.9 | 100.0 | 132.6 | 0.0 (n=2) |
| en | 100.0 | 94.4 | - | 100.0 | 98.5 | 35.6 | 13.5 | 0.0 (n=6) |
| bn | 83.3 | - | - | 95.2 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 83.3 | - | - | 90.9 | - | - | - | - (n=0) |
| mr | 100.0 | 66.7 | - | 100.0 | 88.9 | 113.9 | 121.6 | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 75.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 |  |  | 100.0 / 100.0 |  |
| en | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 90.9 | 100.0 / 100.0 | 100.0 / 100.0 |  | 100.0 / 100.0 |  |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 80.0 / - | 100.0 / - |  |  |  |  |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| te | 66.7 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |  |
| mr | 100.0 / 100.0 | 100.0 / 60.0 | 100.0 / 100.0 | 100.0 / 85.7 | 100.0 / 100.0 |  |  |  |  |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 78 | 80.8 | 91.6 | 75.7 | 79.4 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 78 | 80.8 | 91.6 | 75.7 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 6 | 100.0 | 100.0 | 34.1 | 12.9 |
| en-IN-NeerjaNeural | 6 | 83.3 | 95.2 | 35.2 | 14.1 |
| en-IN-PrabhatNeural | 6 | 100.0 | 100.0 | 37.5 | 13.5 |
| hi-IN-MadhurNeural | 6 | 83.3 | 90.9 | 100.0 | 132.3 |
| hi-IN-SwaraNeural | 6 | 83.3 | 90.9 | 100.0 | 133.0 |
| mr-IN-AarohiNeural | 6 | 66.7 | 90.9 | 109.3 | 121.2 |
| mr-IN-ManoharNeural | 6 | 66.7 | 87.0 | 118.5 | 122.0 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 78 | 80.8 | 91.6 | 75.7 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 14 | 100.0 | 71.4 | 94.9 |
| answer | 21 | 90.5 | 90.5 | 90.5 |
| correction | 7 | 100.0 | 85.7 | 92.3 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 16 | 16 (100%) | 0 (0%) | 0 (0%) | 0 |
| clean | 16 | 16 (100%) | 0 (0%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| time | 6 | 6 | 0 | 0 |
| amount | 5 | 5 | 0 | 0 |
| scamType | 3 | 3 | 0 | 0 |
| bank | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 4 | 4 | 0 | 0 |
| en | 2 | 2 | 0 | 0 |
| mr | 10 | 10 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | hi | asr | wrong | 4 | hi-d04 |
| 2 | time | mr | asr | wrong | 3 | mr-d01 mr-d03 |
| 3 | time | mr | asr | fn | 3 | mr-d02 |
| 4 | scamType | mr | asr | fn | 3 | mr-d01 mr-d02 |
| 5 | bank | en | asr | fn | 1 | en-d06 |
| 6 | bank | mr | asr | fn | 1 | mr-d01 |
| 7 | amount | en | asr | wrong | 1 | en-d04 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. hi-d04 (answer:amount) - fails 100% of 4 runs

- Reference: अड़तीस हज़ार सात सौ
- Transcript (`hi-d04__Madhur__r0__hi`): Arthais hazaar saat sau.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 38700 | 1700 | 38700 | **asr**: value not in the transcript |

### 2. mr-d01 (story) - fails 100% of 4 runs

- Reference: काल रात्री साडेनऊ वाजता कोणीतरी केवायसी अपडेट करा म्हणून मेसेज पाठवला, आणि माझ्या युनियन बँकेच्या खात्यातून अठरा हजार रुपये गेले
- Transcript (`mr-d01__Aarohi__r0__mr`): Kaal raatri saadhe nau vaajastha kornitri KYC update karaamhunoo mein se is baadhaavla aani maajha union mankecha khaadyaatun athaarah hazaar rupe ke lie.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Union Bank of India | - | Union Bank of India | **asr**: ASR lost/changed: युनियन बँकेच्या |

### 3. mr-d02 (story) - fails 75% of 4 runs

- Reference: मी क्यूआर कोड स्कॅन केला आणि गुगल पे वरून सहा हजार चारशे रुपये कट झाले, अर्ध्या तासापूर्वी
- Transcript (`mr-d02__Aarohi__r0__mr`): MET QR code scan kela aane Google Pay varun saahab hazaar chaar se rupe katjaalay, ardhata saapurvi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:30 (30 min ago) | - | today 11:30 (30 min ago) | **asr**: ASR lost/changed: अर्ध्या तासापूर्वी |

### 4. mr-d03 (answer:time) - fails 50% of 4 runs

- Reference: काल संध्याकाळी पाच वाजता
- Transcript (`mr-d03__RemyMultilingual__r0__mr`): Kaal sandhya ka hi paanchavaajta.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 17:00 (1140 min ago) | -1d 12:00 (1440 min ago) | -1d 17:00 (1140 min ago) | **asr**: ASR lost/changed: पाच वाजता |

### 5. en-d04 (answer:amount) - fails 20% of 5 runs

- Reference: three lakh seventy-five thousand
- Transcript (`en-d04__ThalitaMultilingual__r0__en`): 3 lakh 7500.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 375000 | 307500 | 375000 | **asr**: value not in the transcript |

### 6. en-d06 (correction) - fails 20% of 5 runs

- Reference: sorry, it was Bandhan Bank, not Bank of India
- Transcript (`en-d06__Neerja__r0__en`): Sorry, it was London Bank, not Bank of India.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Bandhan Bank | - | Bandhan Bank | **asr**: ASR lost/changed: Bandhan |
