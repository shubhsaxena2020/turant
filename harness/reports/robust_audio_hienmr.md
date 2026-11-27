# Turant pipeline eval: robust_audio_hienmr

Generated 2026-11-27T22:25:46.567Z. Extractor: `..\prototype\src\lib\extract.ts`. 40 cases, 103 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 40 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 55 | 58.2 | 58.2 | 75.4 | 69.3 | 72.2 | 69.3 | 63.3 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 103 | 61.2 | 61.2 | 77.9 | 68.3 | 72.8 | 70.8 | 66.7 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 58.2% of clean runs and 61.2% of all runs fully correct. Per language (clean): hi 69%, en 52%, bn -%, ta -%, te -%, mr 38%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 40 | 100.0 | 100.0 | 100.0 | 73.6 | 70.9 | 72.2 | 72.4 |
| time | 2 | 100.0 | 100.0 | 100.0 | 40.0 | 40.0 | 40.0 | 50.0 |
| scamType | 0 | - | - | - | - | - | - | - |
| bank | 4 | 100.0 | 100.0 | 100.0 | 100.0 | 80.0 | 88.9 | 80.0 |
| paymentApp | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 33.3 | 50.0 | 75.0 |
| utr | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| suspectUpi | 0 | - | - | - | - | - | - | - |
| suspectPhone | 0 | - | - | - | - | - | - | - |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 48 | 100.0 | 100.0 | 100.0 | 75.4 | 69.3 | 72.2 | 72.8 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | 69.2 | - | 100.0 | 76.5 | 77.1 | 84.6 | 0.0 (n=2) |
| en | 100.0 | 52.4 | - | 100.0 | 74.2 | 43.8 | 28.6 | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | 37.5 | - | 100.0 | 42.9 | 126.1 | 111.5 | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 69.2 | 100.0 / 100.0 |  | 100.0 / 100.0 |  | 100.0 / 100.0 |  |  |  |
| en | 100.0 / 85.7 | 100.0 / 0.0 |  | 100.0 / 80.0 | 100.0 / 50.0 |  |  |  |  |
| bn | 100.0 / - |  |  |  |  |  |  |  |  |
| ta | 100.0 / - |  |  |  |  |  |  |  |  |
| te | 100.0 / - |  |  |  |  |  |  |  |  |
| mr | 100.0 / 42.9 |  |  |  |  |  |  |  |  |
| kn | 100.0 / - |  |  |  |  |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 103 | 61.2 | 72.8 | 70.8 | 66.7 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 103 | 61.2 | 72.8 | 70.8 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 7 | 57.1 | 76.2 | 42.6 | 30.4 |
| en-IN-NeerjaNeural | 7 | 42.9 | 70.0 | 44.4 | 28.6 |
| en-IN-PrabhatNeural | 7 | 57.1 | 76.2 | 44.4 | 26.9 |
| hi-IN-MadhurNeural | 13 | 69.2 | 76.5 | 76.0 | 83.5 |
| hi-IN-SwaraNeural | 13 | 69.2 | 76.5 | 78.1 | 85.6 |
| mr-IN-AarohiNeural | 4 | 50.0 | 50.0 | 117.4 | 110.0 |
| mr-IN-ManoharNeural | 4 | 25.0 | 33.3 | 134.8 | 113.0 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 103 | 61.2 | 72.8 | 70.8 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 46 | 100.0 | 50.0 | 68.3 |
| correction | 5 | 100.0 | 100.0 | 100.0 |
| answer | 4 | 100.0 | 100.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 44 | 42 (95%) | 2 (5%) | 0 (0%) | 0 |
| clean | 44 | 42 (95%) | 2 (5%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 31 | 31 | 0 | 0 |
| bank | 6 | 6 | 0 | 0 |
| time | 5 | 3 | 2 | 0 |
| paymentApp | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 18 | 16 | 2 | 0 |
| en | 16 | 16 | 0 | 0 |
| mr | 10 | 10 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | hi | asr | wrong | 13 | rb-04 rb-05 rb-07 rb-10 |
| 2 | bank | en | asr | fn | 6 | rb-15 rb-11 |
| 3 | amount | mr | asr | wrong | 6 | rb-18 rb-19 |
| 4 | amount | en | asr | wrong | 5 | rb-11 rb-15 |
| 5 | amount | mr | asr | fn | 4 | rb-17 rb-18 rb-20 |
| 6 | time | en | asr | wrong | 3 | rb-14 |
| 7 | amount | hi | asr | fn | 3 | rb-08 rb-40 |
| 8 | paymentApp | en | asr | fn | 2 | rb-16 |
| 9 | time | hi | extractor_form | fn | 2 | rb-08 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. rb-11 (story) - fails 100% of 5 runs

- Reference: I lost 1.2 lakh rupees from my ICICI account
- Transcript (`rb-11__Neerja__r0__en`): I lost 1 point to laakh rupees from my ICICI account.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 120000 | 200000 | 120000 | **asr**: value not in the transcript |

### 2. rb-04 (story) - fails 100% of 4 runs

- Reference: डेढ़ करोड़ रुपये का fraud हुआ
- Transcript (`rb-04__Madhur__r0__hi`): Dedh karod rupe ka fraud hua.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000000 | 1.5 | 15000000 | **asr**: value not in the transcript |

### 3. rb-05 (story) - fails 100% of 4 runs

- Reference: 2 करोड़ 50 लाख रुपये चले गए
- Transcript (`rb-05__Madhur__r0__hi`): Do karod pachaas laakh rupe chale gae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 25000000 | 5000000 | 25000000 | **asr**: value not in the transcript |

### 4. rb-18 (story) - fails 100% of 4 runs

- Reference: दीड लाख रुपये गेले, नाही नाही, अडीच लाख
- Transcript (`rb-18__Aarohi__r0__mr`): Dedh laakh roope ke lie na hi, na hi, adhik laakh.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 150000 | 250000 | **asr**: value not in the transcript |

### 5. rb-19 (story) - fails 100% of 4 runs

- Reference: एक कोटी रुपये गेले
- Transcript (`rb-19__Aarohi__r0__mr`): Ek koti roope ke lie.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 10000000 | 1 | 10000000 | **asr**: value not in the transcript |

### 6. rb-15 (story) - fails 80% of 5 runs

- Reference: Rs 2,50,000 was debited from my Axis account
- Transcript (`rb-15__Neerja__r0__en`): To lakhs 50000 rupees was debated from my access account.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Axis Bank | - | Axis Bank | **asr**: ASR lost/changed: Axis |

### 7. rb-10 (story) - fails 75% of 4 runs

- Reference: सवा दो लाख रुपये गए SBI से
- Transcript (`rb-10__Madhur__r0__hi`): Sabha do laakh rupe gae SBI se.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 225000 | 200000 | 225000 | **asr**: value not in the transcript |

### 8. rb-14 (story) - fails 60% of 5 runs

- Reference: about 25k went from my account two days ago
- Transcript (`rb-14__Neerja__r0__en`): About 25 k went from my account today's ago.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -2d 12:00 (2880 min ago) | today 12:00 (0 min ago) | -2d 12:00 (2880 min ago) | **asr**: ASR lost/changed: two |

### 9. rb-08 (story) - fails 50% of 4 runs

- Reference: 1.5 lakh rupees kat gaye kal raat 10 baje
- Transcript (`rb-08__GiuseppeMultilingual__r0__hi`): Phir vishvavidyaalay kaat gae, kauraat jis din,

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |
| time | fn | -1d 22:00 (840 min ago) | - | -1d 22:00 (840 min ago) | **extractor_form**: key words survive (raat) but the extractor fails |

### 10. rb-07 (story) - fails 50% of 4 runs

- Reference: paanch sau nahi nahi, saat sau rupaye gaye
- Transcript (`rb-07__Madhur__r0__hi`): Paanch saal nahin nahin saat saal rupe gae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 700 | 7 | 700 | **asr**: value not in the transcript |

### 11. rb-16 (story) - fails 40% of 5 runs

- Reference: teen hazaar rupees gaye through PhonePe
- Transcript (`rb-16__Neerja__r0__en`): Tin hazaar rupees gae through phone par.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 12. rb-17 (story) - fails 25% of 4 runs

- Reference: माझ्या खात्यातून 5 thousand रुपये गेले
- Transcript (`rb-17__Manohar__r0__mr`): Maja khaatiyaatun paanch sthaav jaan roope ke lie.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |

### 13. rb-20 (story) - fails 25% of 4 runs

- Reference: सव्वा लाख रुपये कापले गेले
- Transcript (`rb-20__ThalitaMultilingual__r0__mr`): Sabva laakh rupe kaable gaele.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 125000 | - | 125000 | **asr**: value not in the transcript |

### 14. rb-40 (answer:amount) - fails 25% of 4 runs

- Reference: ढाई लाख
- Transcript (`rb-40__RemyMultilingual__r0__hi`): Ghai laakh.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |
