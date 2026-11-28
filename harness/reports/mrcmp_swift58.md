# Turant pipeline eval: mrcmp_swift58

Generated 2026-11-28T02:03:42.684Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 80 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 80 | 53.8 | 53.8 | 90.8 | 73.8 | 81.4 | 117.2 | 130.0 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 80 | 53.8 | 53.8 | 90.8 | 73.8 | 81.4 | 117.2 | 130.0 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 53.8% of clean runs and 53.8% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr 54%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 85.4 | 85.4 | 85.4 | 85.4 |
| time | 113 | 100.0 | 100.0 | 100.0 | 85.7 | 75.0 | 80.0 | 80.0 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 54.5 | 70.6 | 70.6 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 96.4 | 96.4 | 96.4 | 96.4 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 100.0 | 16.7 | 28.6 | 28.6 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 37.5 | 54.5 | 54.5 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 90.8 | 73.8 | 81.4 | 81.4 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | 53.8 | - | 100.0 | 81.4 | 117.2 | 130.0 | 0.0 (n=16) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / 85.4 | 100.0 / 80.0 | 100.0 / 70.6 | 100.0 / 96.4 | 100.0 / 100.0 | 100.0 / 28.6 | 100.0 / - | 100.0 / 54.5 | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 80 | 53.8 | 81.4 | 117.2 | 130.0 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 53.8 | 81.4 | 117.2 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| mr-IN-AarohiNeural | 40 | 67.5 | 89.2 | 117.4 | 130.3 |
| mr-IN-ManoharNeural | 40 | 40.0 | 73.2 | 117.0 | 129.8 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 53.8 | 81.4 | 117.2 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 44 | 100.0 | 43.2 | 82.5 |
| answer | 26 | 100.0 | 57.7 | 70.8 |
| answer (skip intent) | 2 | 100.0 | 100.0 | 100.0 |
| correction | 8 | 100.0 | 87.5 | 93.3 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 44 | 44 (100%) | 0 (0%) | 0 (0%) | 0 |
| clean | 44 | 44 (100%) | 0 (0%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| scamType | 10 | 10 | 0 | 0 |
| time | 8 | 8 | 0 | 0 |
| amount | 8 | 8 | 0 | 0 |
| suspectPhone | 5 | 5 | 0 | 0 |
| utr | 5 | 5 | 0 | 0 |
| suspectUpi | 4 | 4 | 0 | 0 |
| bank | 2 | 2 | 0 | 0 |
| suspectAccount | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| mr | 44 | 44 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | mr | asr | fn | 10 | mr-01 mr-04 mr-09 mr-16 mr-18 mr-35 |
| 2 | amount | mr | asr | wrong | 6 | mr-04 mr-06 mr-07 mr-21 mr-24 |
| 3 | suspectPhone | mr | asr | fn | 5 | mr-09 mr-22 mr-33 mr-39 |
| 4 | utr | mr | asr | fn | 5 | mr-14 mr-31 mr-32 |
| 5 | time | mr | asr | fn | 4 | mr-02 mr-12 mr-13 mr-16 |
| 6 | time | mr | asr | wrong | 4 | mr-07 mr-11 mr-26 mr-28 |
| 7 | suspectUpi | mr | asr | fn | 4 | mr-10 mr-34 |
| 8 | suspectAccount | mr | asr | fn | 2 | mr-19 |
| 9 | bank | mr | asr | fp | 1 | mr-09 |
| 10 | amount | mr | asr | fn | 1 | mr-11 |
| 11 | bank | mr | asr | fn | 1 | mr-17 |
| 12 | amount | mr | asr | fp | 1 | mr-19 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. mr-09 (story) - fails 100% of 2 runs

- Reference: ज्या नंबरवरून फोन आला तो 9 8 7 6 5... 4 3 2 1 0, म्हणाला बँकेतून बोलतोय, केवायसी केलं नाही तर खातं बंद होईल
- Transcript (`mr-09__Aarohi__r0__mr`): Jahaan number un phone aala to nau aath saat saath aath chaar tin don ek shoony, bhala banketon bol to kevaah aisi telnaahitar khaata band hui.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: केवायसी |
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 2. mr-04 (story) - fails 100% of 2 runs

- Reference: एकाने सांगितलं चुकून पैसे पाठवले, परत पाठवा, मी गूगल पे वरून बारा हजार पाचशे रुपये पाठवले, दोन तासांपूर्वी
- Transcript (`mr-04__Aarohi__r0__mr`): Aikaani sangitla chookun paise paathavle, parth paathava, meagoogal par varun baarah hazaar paanch se rupe paathavle, don'taasaanpurvi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: चुकून |

### 3. mr-16 (story) - fails 100% of 2 runs

- Reference: माझ्या account मधून 20,000 rupees debit झाले, ICICI bank, एक तासापूर्वी customer care ला फोन केला होता
- Transcript (`mr-16__Aarohi__r0__mr`): Maja account madhun bis hazaar roopij debit jha le ICI C I bank ek taaza poorvi customer kerla phone kerla hota.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: care |

### 4. mr-19 (story) - fails 100% of 2 runs

- Reference: ज्या खात्यात पैसे गेले त्याचा नंबर 5 0 1 0 0 2 3 4 5 6 7 8 1 2
- Transcript (`mr-19__Aarohi__r0__mr`): Jahaan khaate aath paise gale taisa number paanch shoony ek shoony shoony don tin chaar paanch saath aath ek don.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fp | - | 8 | - | **asr**: spurious value from a mis-recognised transcript |
| suspectAccount | fn | 50100234567812 | - | 50100234567812 | **asr**: value not in the transcript |

### 5. mr-01 (story) - fails 100% of 2 runs

- Reference: माझ्या SBI खात्यातून पाच हजार रुपये कापले गेले, दहा मिनिटांपूर्वी एका माणसाने KYC अपडेट करायला सांगितले
- Transcript (`mr-01__Aarohi__r0__mr`): Maja SBI khaadyatoon paanch hazaar rupe kaaple gale, dahaan minitaanpurvin ekaansa ne update karaila sangit le.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 6. mr-06 (story) - fails 100% of 2 runs

- Reference: टेलिग्रामवर पार्ट टाइम जॉबचे टास्क दिले, मग गुंतवणूक करायला सांगितली, मी सत्तेचाळीस हजार रुपये भरले, कोटक बँकेतून
- Transcript (`mr-06__Aarohi__r0__mr`): Telegram var paath time job se task dile, main guntanon karaayla sangit li. Mere saty chaalis hazaar rupe bhar le kotak bankar.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 47000 | 40000 | 47000 | **asr**: value not in the transcript |
