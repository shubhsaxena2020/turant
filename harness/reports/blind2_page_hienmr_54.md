# Turant pipeline eval: blind2_page_hienmr_54

Generated 2026-11-28T00:16:58.464Z. Extractor: `..\prototype\src\lib\extract.ts`. 42 cases, 78 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 42 | 97.6 | 97.6 | 98.6 | 98.6 | 98.6 | - | - |
| ASR clean, normal rate | 42 | 61.9 | 61.9 | 93.8 | 79.2 | 85.9 | 66.1 | 66.9 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 78 | 59.0 | 59.0 | 94.9 | 77.6 | 85.4 | 69.7 | 71.8 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 69.0% of clean runs and 65.4% of all runs fully correct. Per language (clean): hi 83%, en 67%, bn -%, ta -%, te -%, mr 58%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 27 | 96.3 | 96.3 | 96.3 | 88.5 | 88.5 | 88.5 | 90.5 |
| time | 15 | 100.0 | 100.0 | 100.0 | 93.3 | 87.5 | 90.3 | 83.6 |
| scamType | 8 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| bank | 13 | 100.0 | 100.0 | 100.0 | 100.0 | 63.6 | 77.8 | 83.3 |
| paymentApp | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 85.7 | 92.3 | 81.8 |
| utr | 1 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectUpi | 1 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectPhone | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 73 | 98.6 | 98.6 | 98.6 | 93.8 | 79.2 | 85.9 | 85.4 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | 83.3 | - | 100.0 | 95.2 | 100.7 | 129.0 | 0.0 (n=2) |
| en | 83.3 | 50.0 | - | 90.9 | 82.8 | 31.0 | 11.5 | 100.0 (n=3) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | 58.3 | - | 100.0 | 81.0 | 114.3 | 120.8 | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 66.7 | 100.0 / 100.0 |  |  | 100.0 / 100.0 |  |
| en | 75.0 / 100.0 | 100.0 / 83.3 | 100.0 / 100.0 | 100.0 / 50.0 | 100.0 / 100.0 | 100.0 / - | 100.0 / - |  |  |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |
| mr | 100.0 / 62.5 | 100.0 / 90.9 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 66.7 |  |  |  |  |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 78 | 59.0 | 85.4 | 69.7 | 71.8 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 78 | 59.0 | 85.4 | 69.7 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 6 | 50.0 | 84.2 | 29.9 | 11.6 |
| en-IN-NeerjaNeural | 6 | 50.0 | 84.2 | 32.2 | 12.6 |
| en-IN-PrabhatNeural | 6 | 50.0 | 80.0 | 31.0 | 10.3 |
| hi-IN-MadhurNeural | 6 | 83.3 | 95.2 | 100.0 | 129.2 |
| hi-IN-SwaraNeural | 6 | 83.3 | 95.2 | 101.4 | 128.8 |
| mr-IN-AarohiNeural | 6 | 50.0 | 80.0 | 109.5 | 118.8 |
| mr-IN-ManoharNeural | 6 | 66.7 | 81.8 | 119.0 | 122.8 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 78 | 59.0 | 85.4 | 69.7 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 14 | 100.0 | 42.9 | 89.1 |
| answer | 21 | 100.0 | 61.9 | 72.2 |
| correction | 7 | 85.7 | 100.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 32 | 27 (84%) | 5 (16%) | 0 (0%) | 0 |
| clean | 32 | 27 (84%) | 5 (16%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| time | 7 | 7 | 0 | 0 |
| bank | 6 | 6 | 0 | 0 |
| utr | 5 | 0 | 5 | 0 |
| suspectUpi | 5 | 5 | 0 | 0 |
| amount | 5 | 5 | 0 | 0 |
| paymentApp | 4 | 4 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 5 | 5 | 0 | 0 |
| en | 15 | 10 | 5 | 0 |
| mr | 12 | 12 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | utr | en | extractor_form | fn | 5 | en-c03 |
| 2 | suspectUpi | en | asr | fn | 5 | en-c05 |
| 3 | time | mr | asr | fn | 5 | mr-c01 mr-c03 |
| 4 | bank | hi | asr | fn | 4 | hi-c01 |
| 5 | amount | mr | asr | wrong | 4 | mr-c02 mr-c04 |
| 6 | bank | en | asr | fn | 2 | en-c02 |
| 7 | paymentApp | en | asr | fn | 2 | en-c01 |
| 8 | time | en | asr | wrong | 1 | en-c01 |
| 9 | paymentApp | mr | asr | fn | 1 | mr-c02 |
| 10 | paymentApp | hi | asr | fn | 1 | hi-c02 |
| 11 | time | mr | asr | wrong | 1 | mr-c02 |
| 12 | amount | mr | asr | fn | 1 | mr-c04 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. en-c03 (answer:utr) - fails 100% of 5 runs

- Reference: the UTR is 5 0 7 1 2 3 4 5 6 7 8 9
- Transcript (`en-c03__Neerja__r0__en`): The UTR is 05:07123456789.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 507123456789 | - | 507123456789 | **extractor_form**: value is in the transcript but not parsed |

### 2. en-c05 (answer:suspect) - fails 100% of 5 runs

- Reference: the UPI ID was lucky dot winner at okaxis
- Transcript (`en-c05__Neerja__r0__en`): The UPI ID was lucky dot winner at the taxes.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | lucky.winner@okaxis | - | lucky.winner@okaxis | **asr**: value not in the transcript |

### 3. hi-c01 (story) - fails 100% of 4 runs

- Reference: एक आदमी ने खुद को बैंक का अफसर बताया, ओटीपी माँगा और मैंने दे दिया, फिर मेरे केनरा बैंक खाते से सात हज़ार रुपये कट गए, बीस मिनट पहले
- Transcript (`hi-c01__Madhur__r0__hi`): Ek aadmi ne khud ko bank ka avsar bataaya, OTP maanga aur mainne de diya. Phir mere kendr bank khaate se saat hazaar rupe cut gae bis minute pahle.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: केनरा |

### 4. mr-c04 (answer:amount) - fails 100% of 4 runs

- Reference: पावणे दोन लाख
- Transcript (`mr-c04__Aarohi__r0__mr`): Paani donon laakh.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 175000 | 200000 | 175000 | **asr**: value not in the transcript |

### 5. mr-c01 (story) - fails 75% of 4 runs

- Reference: माझ्या बँक ऑफ इंडिया खात्यातून बारा हजार रुपये गेले, एका माणसाने ओटीपी मागितला आणि मी सांगितला, अर्ध्या तासापूर्वी
- Transcript (`mr-c01__Aarohi__r0__mr`): Maja Bank of India khaataatoon baarah hazaar rupe gale, ekaam aadashaani OTP magtla, aani mein sangitla, aradhaataapur bhi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:30 (30 min ago) | - | today 11:30 (30 min ago) | **asr**: ASR lost/changed: अर्ध्या तासापूर्वी |

### 6. mr-c02 (story) - fails 75% of 4 runs

- Reference: काल दुपारी तीन वाजता फोनपे वरून चार हजार पाचशे रुपये गेले
- Transcript (`mr-c02__Aarohi__r0__mr`): Kal dophari tin vaajastha phone par varoorn chaar hazaar paanch se rupe ke lie.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: फोनपे |

### 7. en-c01 (story) - fails 60% of 5 runs

- Reference: Someone claiming to be from the electricity board said my power would be cut tonight, I paid 3,450 rupees through Paytm an hour ago
- Transcript (`en-c01__Prabhat__r0__en`): Someone claiming to be from the electricity board said my power would be cut to night, I paid 3450 rupees through Paytm and aargo.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 11:00 (60 min ago) | -1d 22:00 (840 min ago) | today 11:00 (60 min ago) | **asr**: ASR lost/changed: hour ago |

### 8. mr-c03 (answer:time) - fails 50% of 4 runs

- Reference: दोन तासांपूर्वी
- Transcript (`mr-c03__RemyMultilingual__r0__mr`): Don't ask for me.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: दोन तासांपूर्वी |

### 9. en-c02 (story) - fails 40% of 5 runs

- Reference: A buyer on OLX sent me a QR code to receive payment, I scanned it and 18,000 was debited from my Kotak account yesterday at 4 pm
- Transcript (`en-c02__Neerja__r0__en`): Ab by or on OILX sent me a QR code to receive payment. I scan it and 18000 was debated from my quota account yesterday at 4PM.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Kotak Mahindra Bank | - | Kotak Mahindra Bank | **asr**: ASR lost/changed: Kotak |

### 10. hi-c02 (story) - fails 25% of 4 runs

- Reference: टेलीग्राम पर टास्क वाली नौकरी के नाम पर मुझसे तीस हज़ार रुपये भरवाए, गूगल पे से भेजे थे
- Transcript (`hi-c02__GiuseppeMultilingual__r0__hi`): Telegram par task vaali naukri ke naam par mujh se tis hazaar rupe bhravae Google par ise bheje the.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: गूगल पे |
