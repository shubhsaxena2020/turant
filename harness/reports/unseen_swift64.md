# Turant pipeline eval: unseen_swift64

Generated 2026-11-28T10:04:22.001Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 480 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 0 | - | - | - | - | - | - | - |
| ASR noise 15 dB | 120 | 56.7 | 56.7 | 88.9 | 75.5 | 81.7 | 80.5 | 85.3 |
| ASR noise 5 dB | 120 | 39.2 | 40.0 | 82.2 | 64.1 | 72.0 | 108.6 | 106.9 |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 480 | 53.1 | 53.3 | 87.4 | 73.6 | 79.9 | 90.2 | 94.0 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): -% of clean runs and 53.1% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | - | - | - | 84.9 |
| time | 113 | 100.0 | 100.0 | 100.0 | - | - | - | 70.6 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | - | - | - | 88.2 |
| bank | 97 | 100.0 | 100.0 | 100.0 | - | - | - | 89.8 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 87.2 |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | - | - | 74.2 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | 19.2 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | - | - | 69.1 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 50.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | 73.7 |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | - | - | - | 79.9 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | 55.0 | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | 42.5 | 100.0 | - | - | - | - (n=0) |
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
| babble 15 dB | 42 | 61.9 | 84.8 | 69.5 | 70.6 |
| babble 5 dB | 42 | 38.1 | 69.7 | 148.1 | 131.0 |
| clean | 240 | 58.3 | 82.8 | 85.8 | 92.0 |
| pink 15 dB | 31 | 61.3 | 80.8 | 96.1 | 113.9 |
| pink 5 dB | 31 | 22.6 | 59.6 | 100.0 | 115.9 |
| traffic 15 dB | 47 | 48.9 | 79.6 | 80.7 | 82.8 |
| traffic 5 dB | 47 | 51.1 | 80.0 | 80.5 | 82.1 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 240 | 58.3 | 82.8 | 85.8 |
| 15 dB | 120 | 56.7 | 81.7 | 80.5 |
| 5 dB | 120 | 39.2 | 72.0 | 108.6 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 240 | 58.3 | 82.8 | 85.8 |

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
| all forced-language runs | 274 | 271 (99%) | 3 (1%) | 0 (0%) | 0 |
| clean | 117 | 116 (99%) | 1 (1%) | 0 (0%) | 0 |
| 15 dB | 62 | 62 (100%) | 0 (0%) | 0 (0%) | 0 |
| 5 dB | 95 | 93 (98%) | 2 (2%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| time | 64 | 64 | 0 | 0 |
| amount | 60 | 58 | 2 | 0 |
| scamType | 32 | 32 | 0 | 0 |
| bank | 30 | 30 | 0 | 0 |
| suspectUpi | 27 | 26 | 1 | 0 |
| suspectPhone | 24 | 24 | 0 | 0 |
| utr | 13 | 13 | 0 | 0 |
| paymentApp | 12 | 12 | 0 | 0 |
| suspectAccount | 7 | 7 | 0 | 0 |
| intent | 5 | 5 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 46 | 46 | 0 | 0 |
| en | 99 | 96 | 3 | 0 |
| mr | 129 | 129 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | time | mr | asr | wrong | 24 | mr-03 mr-07 mr-11 mr-15 mr-26 mr-28 mr-40 mr-10 +1 |
| 2 | scamType | mr | asr | fn | 19 | mr-04 mr-08 mr-09 mr-16 mr-18 mr-01 mr-35 |
| 3 | time | en | asr | wrong | 18 | en-03 en-13 en-16 en-26 en-40 en-11 |
| 4 | time | mr | asr | fn | 16 | mr-01 mr-02 mr-04 mr-12 mr-13 mr-10 mr-16 |
| 5 | bank | mr | asr | fn | 16 | mr-06 mr-12 mr-13 mr-18 mr-11 mr-21 mr-29 mr-30 |
| 6 | amount | en | asr | fn | 15 | en-04 en-16 en-17 en-37 en-25 |
| 7 | amount | mr | asr | fn | 14 | mr-02 mr-06 mr-11 mr-15 mr-18 mr-37 |
| 8 | suspectPhone | en | asr | fn | 10 | en-07 en-15 en-34 |
| 9 | amount | en | asr | wrong | 10 | en-12 en-23 en-25 en-05 en-24 |
| 10 | bank | hi | asr | fn | 9 | hi-01 hi-12 hi-17 hi-18 hi-31 |
| 11 | suspectPhone | mr | asr | fn | 8 | mr-22 mr-39 mr-09 |
| 12 | suspectUpi | hi | asr | wrong | 6 | hi-10 hi-36 |
| 13 | suspectUpi | en | asr | wrong | 6 | en-09 en-33 en-39 |
| 14 | utr | en | asr | fn | 6 | en-31 en-32 |
| 15 | amount | mr | asr | wrong | 6 | mr-20 mr-24 mr-17 |
| 16 | paymentApp | hi | asr | fn | 5 | hi-04 hi-24 |
| 17 | suspectPhone | hi | asr | fn | 5 | hi-23 hi-09 hi-16 |
| 18 | amount | hi | asr | wrong | 5 | hi-27 hi-07 hi-13 |
| 19 | scamType | en | asr | fn | 5 | en-02 en-16 |
| 20 | suspectUpi | en | asr | fn | 5 | en-39 en-33 |
| 21 | time | hi | asr | wrong | 4 | hi-24 hi-30 |
| 22 | amount | en | asr | fp | 4 | en-15 en-33 |
| 23 | suspectAccount | mr | asr | fn | 4 | mr-19 |
| 24 | suspectUpi | mr | asr | fn | 4 | mr-34 mr-10 |
| 25 | intent | mr | asr | fn | 4 | mr-36 |
| 26 | scamType | hi | asr | fn | 4 | hi-01 hi-09 hi-37 |
| 27 | bank | en | asr | fn | 3 | en-03 en-10 |
| 28 | paymentApp | en | asr | fn | 3 | en-04 |
| 29 | paymentApp | mr | asr | fn | 3 | mr-04 mr-02 mr-20 |
| 30 | suspectUpi | mr | asr | wrong | 3 | mr-10 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. en-16 (story) - fails 100% of 4 runs

- Reference: Aaj subah 10 baje ek message aaya, QR scan karne ko bola, scan kiya aur dhai hazaar rupaye chale gaye
- Transcript (`en-16__GiuseppeMultilingual__r0__en`): AHA subah 10 by aque message aaya. QR scan kaaran K O bola. Scanthiya aur die hazaar rupe chale gae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2500 | - | 2500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 09:00 (180 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: baje |

### 2. mr-04 (story) - fails 100% of 4 runs

- Reference: एकाने सांगितलं चुकून पैसे पाठवले, परत पाठवा, मी गूगल पे वरून बारा हजार पाचशे रुपये पाठवले, दोन तासांपूर्वी
- Transcript (`mr-04__GiuseppeMultilingual__r0__mr`): Ekkaani sangitlan chukun paise paath vaale, paarad paathava, miggul par varun baarah hazaar paanch se rupe paath vaale, don'ta saampurvi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: दोन तासांपूर्वी |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: चुकून |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: गूगल पे |

### 3. mr-18 (story) - fails 100% of 4 runs

- Reference: अडीच लाख रुपये गुंतवणुकीच्या नावाखाली घेतले, पैसे दुप्पट होतील म्हणाले, येस बँक
- Transcript (`mr-18__GiuseppeMultilingual__r0__mr`): Adij laakh rupe guntavan uki chaar aava khaali ghete. Paise dupat hoti mahaanaalay, yah is bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: दुप्पट |
| bank | fn | Yes Bank | - | Yes Bank | **asr**: ASR lost/changed: येस बँक |

### 4. en-15 (story) - fails 100% of 4 runs

- Reference: The number that called me was plus 91 70112 23344
- Transcript (`en-15__RemyMultilingual__r0__en`): The number the Colve was plus 91 7100122344.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | wrong | 7011223344 | 7100122344 | 7011223344 | **asr**: value not in the transcript |

### 5. mr-10 (story) - fails 100% of 4 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__GiuseppeMultilingual__r0__mr`): UPI ID raahul dot KYC at YBL var aath hazaar rupe paathave, bis minute aampurvin.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kyc@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 6. mr-12 (story) - fails 100% of 4 runs

- Reference: अडीच हजार रुपये कापले, अर्ध्या तासापूर्वी, कॅनरा बँक
- Transcript (`mr-12__GiuseppeMultilingual__r0__mr`): Adhik hazaar rupe ka play, adhyaataasaapoorvi, kunaara bank.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:30 (30 min ago) | - | today 11:30 (30 min ago) | **asr**: ASR lost/changed: अर्ध्या तासापूर्वी, |

### 7. mr-13 (story) - fails 100% of 4 runs

- Reference: माझे १५००० रुपये गेले, ॲक्सिस बँक, ३ दिवसांपूर्वी
- Transcript (`mr-13__RemyMultilingual__r0__mr`): Majhe pandrah hazaar rupe gaele, kis bank tin divsaanpurvi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Axis Bank | - | Axis Bank | **asr**: ASR lost/changed: ॲक्सिस |

### 8. hi-01 (story) - fails 100% of 4 runs

- Reference: मेरे अकाउंट से पाँच हज़ार रुपये कट गए, दस मिनट पहले एक आदमी ने बोला केवाईसी अपडेट करो, एसबीआई का अकाउंट है
- Transcript (`hi-01__RemyMultilingual__r0__hi`): Mere account se paanch hazaar rupe cut gae. Das minute pahle ek aadmi ne bola ki VC update karo, is PI ka account hai.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: एसबीआई |

### 9. en-04 (story) - fails 100% of 4 runs

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__GiuseppeMultilingual__r0__en`): Bayaapan na hi na hi chhah hazaar upaegi high. Formpe se, abhi abhi.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 10. en-33 (answer:suspect) - fails 100% of 4 runs

- Reference: rahul dot kyc at ybl
- Transcript (`en-33__RemyMultilingual__r0__en`): Rohul dot KYC at YBL.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | rohul.kyc@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 11. mr-06 (story) - fails 100% of 4 runs

- Reference: टेलिग्रामवर पार्ट टाइम जॉबचे टास्क दिले, मग गुंतवणूक करायला सांगितली, मी सत्तेचाळीस हजार रुपये भरले, कोटक बँकेतून
- Transcript (`mr-06__GiuseppeMultilingual__r0__mr`): Telegram par part time job check task delay. Magh guntavnon karaaya tha sangit li. Mishrat chaahe hazaar rupe bhare ko tak bankar toon.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 47000 | - | 47000 | **asr**: value not in the transcript |
| bank | fn | Kotak Mahindra Bank | - | Kotak Mahindra Bank | **asr**: ASR lost/changed: कोटक |

### 12. hi-10 (story) - fails 100% of 4 runs

- Reference: मैंने यूपीआई आईडी rahul dot kyc at ybl पर आठ हज़ार रुपये भेजे, बीस मिनट पहले
- Transcript (`hi-10__GiuseppeMultilingual__r0__hi`): Mainne UPI ID raahul dot KYC at YBL par aath hazaar roope bhejen. Bis minute pahle.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kyc@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 13. hi-36 (answer:suspect) - fails 100% of 4 runs

- Reference: यूपीआई आईडी है sharma dot pay at paytm
- Transcript (`hi-36__GiuseppeMultilingual__r0__hi`): UPI ID hai sharma dot par at Paytm.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | sharma.pay@paytm | sharma.par@paytm | sharma.pay@paytm | **asr**: value not in the transcript |

### 14. en-09 (story) - fails 100% of 4 runs

- Reference: I paid to the UPI ID rahul dot kyc at ybl, eight thousand rupees, twenty minutes back
- Transcript (`en-09__RemyMultilingual__r0__en`): I paid to the UPI ID rahul the KYC at YBL 8000 rupees 20 minutes back.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **extractor_form**: value is in the transcript but not parsed |

### 15. en-21 (story) - fails 100% of 4 runs

- Reference: I sent money to account number 5 0 1 0 0 2 3 4 5 6 7 8 1 2, IFSC SBIN0001234, around four thousand rupees
- Transcript (`en-21__RemyMultilingual__r0__en`): I sent money to account number 05:01 0234567812, IFSC SPI and 001234 around 4000 rupees.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectAccount | wrong | 50100234567812 | 5010234567812 | 50100234567812 | **asr**: value not in the transcript |

### 16. hi-04 (story) - fails 100% of 4 runs

- Reference: उम्म... मतलब, एक आदमी ने बोला गलती से पैसे भेज दिए, वापस भेजो, तो मैंने गूगल पे से बारह हज़ार पाँच सौ रुपये भेज दिए, ये दो घंटे पहले की बात है
- Transcript (`hi-04__GiuseppeMultilingual__r0__hi`): Khoong, matlab ek aadmi ne bola galti se paise bhej die. Vaapas bhejo to mainne Google par ise baarah hazaar paanch sau rupe bhej die. Yah do ghante pahle ki baat hai.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: गूगल पे |

### 17. hi-24 (story) - fails 100% of 4 runs

- Reference: कल दोपहर करीब ढाई बजे फोन पे से छब्बीस सौ रुपये गए
- Transcript (`hi-24__GiuseppeMultilingual__r0__hi`): Kal dophar karib dhai baje phone par ise chhabbis sau rupe gae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: फोन पे से |

### 18. hi-23 (correction) - fails 75% of 4 runs

- Reference: नंबर गलत है, 9 8 1 1 1 2 2 2 3 3 था
- Transcript (`hi-23__VivienneMultilingual__r0__hi`): Number galat hai nau aath ek ek ek do do tin tin tha.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9811122233 | - | 9811122233 | **asr**: value not in the transcript |
