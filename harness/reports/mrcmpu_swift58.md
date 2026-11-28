# Turant pipeline eval: mrcmpu_swift58

Generated 2026-11-28T02:14:28.531Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 160 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 0 | - | - | - | - | - | - | - |
| ASR noise 15 dB | 40 | 37.5 | 37.5 | 86.2 | 62.5 | 72.5 | 116.1 | 128.1 |
| ASR noise 5 dB | 40 | 20.0 | 20.0 | 73.1 | 47.5 | 57.6 | 116.7 | 124.0 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 160 | 35.6 | 35.6 | 83.5 | 60.0 | 69.8 | 127.8 | 138.6 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): -% of clean runs and 35.6% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | - | - | - | 84.0 |
| time | 113 | 100.0 | 100.0 | 100.0 | - | - | - | 42.9 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | - | - | - | 65.7 |
| bank | 97 | 100.0 | 100.0 | 100.0 | - | - | - | 83.3 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 89.7 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | - | - | 76.2 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | 16.7 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 66.7 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | - | - | - | 69.8 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | 20.0 | 100.0 | - | - | - | - (n=0) |
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
| babble 15 dB | 17 | 41.2 | 74.1 | 112.8 | 117.5 |
| babble 5 dB | 17 | 17.6 | 51.0 | 113.5 | 108.6 |
| clean | 80 | 42.5 | 74.3 | 139.2 | 151.1 |
| pink 15 dB | 11 | 45.5 | 72.2 | 116.7 | 141.3 |
| pink 5 dB | 11 | 18.2 | 52.9 | 121.2 | 140.4 |
| traffic 15 dB | 12 | 25.0 | 70.8 | 118.6 | 129.6 |
| traffic 5 dB | 12 | 25.0 | 68.1 | 116.0 | 127.5 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 42.5 | 74.3 | 139.2 |
| 15 dB | 40 | 37.5 | 72.5 | 116.1 |
| 5 dB | 40 | 20.0 | 57.6 | 116.7 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 42.5 | 74.3 | 139.2 |

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
| all forced-language runs | 132 | 132 (100%) | 0 (0%) | 0 (0%) | 0 |
| clean | 58 | 58 (100%) | 0 (0%) | 0 (0%) | 0 |
| 15 dB | 30 | 30 (100%) | 0 (0%) | 0 (0%) | 0 |
| 5 dB | 44 | 44 (100%) | 0 (0%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| time | 40 | 40 | 0 | 0 |
| scamType | 23 | 23 | 0 | 0 |
| amount | 23 | 23 | 0 | 0 |
| bank | 16 | 16 | 0 | 0 |
| suspectPhone | 8 | 8 | 0 | 0 |
| suspectUpi | 7 | 7 | 0 | 0 |
| suspectAccount | 4 | 4 | 0 | 0 |
| utr | 4 | 4 | 0 | 0 |
| intent | 4 | 4 | 0 | 0 |
| paymentApp | 3 | 3 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| mr | 132 | 132 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | time | mr | asr | wrong | 24 | mr-03 mr-07 mr-11 mr-15 mr-26 mr-28 mr-40 mr-10 +1 |
| 2 | scamType | mr | asr | fn | 22 | mr-01 mr-04 mr-08 mr-09 mr-16 mr-18 mr-35 |
| 3 | time | mr | asr | fn | 16 | mr-01 mr-02 mr-04 mr-12 mr-13 mr-10 mr-16 |
| 4 | bank | mr | asr | fn | 16 | mr-06 mr-12 mr-13 mr-18 mr-11 mr-21 mr-29 mr-30 |
| 5 | amount | mr | asr | fn | 14 | mr-02 mr-06 mr-11 mr-15 mr-18 mr-37 |
| 6 | suspectPhone | mr | asr | fn | 8 | mr-22 mr-39 mr-09 |
| 7 | amount | mr | asr | wrong | 6 | mr-20 mr-24 mr-17 |
| 8 | suspectAccount | mr | asr | fn | 4 | mr-19 |
| 9 | suspectUpi | mr | asr | fn | 4 | mr-34 mr-10 |
| 10 | intent | mr | asr | fn | 4 | mr-36 |
| 11 | paymentApp | mr | asr | fn | 3 | mr-04 mr-02 mr-20 |
| 12 | suspectUpi | mr | asr | wrong | 3 | mr-10 |
| 13 | amount | mr | asr | fp | 3 | mr-19 mr-32 |
| 14 | utr | mr | asr | fn | 3 | mr-32 |
| 15 | scamType | mr | asr | fp | 1 | mr-10 |
| 16 | utr | mr | asr | wrong | 1 | mr-32 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. mr-04 (story) - fails 100% of 4 runs

- Reference: एकाने सांगितलं चुकून पैसे पाठवले, परत पाठवा, मी गूगल पे वरून बारा हजार पाचशे रुपये पाठवले, दोन तासांपूर्वी
- Transcript (`mr-04__GiuseppeMultilingual__r0__mr`): Ekkaani sangitlan chukun paise paath vaale, paarad paathava, miggul par varun baarah hazaar paanch se rupe paath vaale, don'ta saampurvi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: दोन तासांपूर्वी |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: चुकून |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: गूगल पे |

### 2. mr-18 (story) - fails 100% of 4 runs

- Reference: अडीच लाख रुपये गुंतवणुकीच्या नावाखाली घेतले, पैसे दुप्पट होतील म्हणाले, येस बँक
- Transcript (`mr-18__GiuseppeMultilingual__r0__mr`): Adij laakh rupe guntavan uki chaar aava khaali ghete. Paise dupat hoti mahaanaalay, yah is bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: दुप्पट |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: येस बँक |

### 3. mr-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__GiuseppeMultilingual__r0__mr`): UPI ID raahul dot KYC at YBL var aath hazaar rupe paathave, bis minute aampurvin.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kyc@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 4. mr-12 (story) - fails 100% of 4 runs

- Reference: अडीच हजार रुपये कापले, अर्ध्या तासापूर्वी, कॅनरा बँक
- Transcript (`mr-12__GiuseppeMultilingual__r0__mr`): Adhik hazaar rupe ka play, adhyaataasaapoorvi, kunaara bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:30 (30 min ago) | - | today 11:30 (30 min ago) | **asr**: ASR lost/changed: अर्ध्या तासापूर्वी, |

### 5. mr-13 (story) - fails 100% of 4 runs

- Reference: माझे १५००० रुपये गेले, ॲक्सिस बँक, ३ दिवसांपूर्वी
- Transcript (`mr-13__RemyMultilingual__r0__mr`): Majhe pandrah hazaar rupe gaele, kis bank tin divsaanpurvi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Axis Bank | - | Axis Bank | **asr**: ASR lost/changed: ॲक्सिस |

### 6. mr-06 (story) - fails 100% of 4 runs

- Reference: टेलिग्रामवर पार्ट टाइम जॉबचे टास्क दिले, मग गुंतवणूक करायला सांगितली, मी सत्तेचाळीस हजार रुपये भरले, कोटक बँकेतून
- Transcript (`mr-06__GiuseppeMultilingual__r0__mr`): Telegram par part time job check task delay. Magh guntavnon karaaya tha sangit li. Mishrat chaahe hazaar rupe bhare ko tak bankar toon.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 47000 | - | 47000 | **asr**: value not in the transcript |
| bank | fn | Kotak Mahindra Bank | - | Kotak Mahindra Bank | **asr**: ASR lost/changed: कोटक |
