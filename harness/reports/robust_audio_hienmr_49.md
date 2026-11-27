# Turant pipeline eval: robust_audio_hienmr_49

Generated 2026-11-27T22:27:33.399Z. Extractor: `..\prototype\src\lib\extract.ts`. 40 cases, 103 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 40 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 55 | 78.2 | 78.2 | 87.5 | 84.0 | 85.7 | 69.3 | 63.3 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 103 | 76.7 | 76.7 | 89.0 | 81.3 | 85.0 | 70.8 | 66.7 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 78.2% of clean runs and 76.7% of all runs fully correct. Per language (clean): hi 81%, en 86%, bn -%, ta -%, te -%, mr 50%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 40 | 100.0 | 100.0 | 100.0 | 88.5 | 83.6 | 86.0 | 84.8 |
| time | 2 | 100.0 | 100.0 | 100.0 | 40.0 | 40.0 | 40.0 | 50.0 |
| scamType | 0 | - | - | - | - | - | - | - |
| bank | 4 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 94.1 |
| paymentApp | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| utr | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| suspectUpi | 0 | - | - | - | - | - | - | - |
| suspectPhone | 0 | - | - | - | - | - | - | - |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 48 | 100.0 | 100.0 | 100.0 | 87.5 | 84.0 | 85.7 | 85.0 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | 80.8 | - | 100.0 | 86.6 | 77.1 | 84.6 | 0.0 (n=2) |
| en | 100.0 | 85.7 | - | 100.0 | 90.9 | 43.8 | 28.6 | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | 50.0 | - | 100.0 | 57.1 | 126.1 | 111.5 | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 82.4 | 100.0 / 100.0 |  | 100.0 / 100.0 |  | 100.0 / 100.0 |  |  |  |
| en | 100.0 / 100.0 | 100.0 / 0.0 |  | 100.0 / 100.0 | 100.0 / 100.0 |  |  |  |  |
| bn | 100.0 / - |  |  |  |  |  |  |  |  |
| ta | 100.0 / - |  |  |  |  |  |  |  |  |
| te | 100.0 / - |  |  |  |  |  |  |  |  |
| mr | 100.0 / 57.1 |  |  |  |  |  |  |  |  |
| kn | 100.0 / - |  |  |  |  |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 103 | 76.7 | 85.0 | 70.8 | 66.7 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 103 | 76.7 | 85.0 | 70.8 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 7 | 85.7 | 90.9 | 42.6 | 30.4 |
| en-IN-NeerjaNeural | 7 | 85.7 | 90.9 | 44.4 | 28.6 |
| en-IN-PrabhatNeural | 7 | 85.7 | 90.9 | 44.4 | 26.9 |
| hi-IN-MadhurNeural | 13 | 84.6 | 88.2 | 76.0 | 83.5 |
| hi-IN-SwaraNeural | 13 | 76.9 | 84.8 | 78.1 | 85.6 |
| mr-IN-AarohiNeural | 4 | 75.0 | 75.0 | 117.4 | 110.0 |
| mr-IN-ManoharNeural | 4 | 25.0 | 33.3 | 134.8 | 113.0 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 103 | 76.7 | 85.0 | 70.8 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 46 | 100.0 | 73.9 | 83.7 |
| correction | 5 | 100.0 | 100.0 | 100.0 |
| answer | 4 | 100.0 | 100.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 26 | 24 (92%) | 2 (8%) | 0 (0%) | 0 |
| clean | 26 | 24 (92%) | 2 (8%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 19 | 19 | 0 | 0 |
| time | 5 | 3 | 2 | 0 |
| bank | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 11 | 9 | 2 | 0 |
| en | 7 | 7 | 0 | 0 |
| mr | 8 | 8 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | hi | asr | wrong | 5 | rb-07 rb-10 |
| 2 | amount | hi | asr | fn | 4 | rb-04 rb-08 rb-40 |
| 3 | amount | mr | asr | fn | 4 | rb-17 rb-18 rb-20 |
| 4 | amount | mr | asr | wrong | 4 | rb-19 |
| 5 | time | en | asr | wrong | 3 | rb-14 |
| 6 | time | hi | extractor_form | fn | 2 | rb-08 |
| 7 | bank | en | asr | fn | 2 | rb-11 |
| 8 | amount | en | asr | wrong | 2 | rb-15 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. rb-19 (story) - fails 100% of 4 runs

- Reference: एक कोटी रुपये गेले
- Transcript (`rb-19__Aarohi__r0__mr`): Ek koti roope ke lie.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 10000000 | 1 | 10000000 | **asr**: value not in the transcript |

### 2. rb-10 (story) - fails 75% of 4 runs

- Reference: सवा दो लाख रुपये गए SBI से
- Transcript (`rb-10__Madhur__r0__hi`): Sabha do laakh rupe gae SBI se.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 225000 | 200000 | 225000 | **asr**: value not in the transcript |

### 3. rb-14 (story) - fails 60% of 5 runs

- Reference: about 25k went from my account two days ago
- Transcript (`rb-14__Neerja__r0__en`): About 25 k went from my account today's ago.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -2d 12:00 (2880 min ago) | today 12:00 (0 min ago) | -2d 12:00 (2880 min ago) | **asr**: ASR lost/changed: two |

### 4. rb-08 (story) - fails 50% of 4 runs

- Reference: 1.5 lakh rupees kat gaye kal raat 10 baje
- Transcript (`rb-08__GiuseppeMultilingual__r0__hi`): Phir vishvavidyaalay kaat gae, kauraat jis din,

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |
| time | fn | -1d 22:00 (840 min ago) | - | -1d 22:00 (840 min ago) | **extractor_form**: key words survive (raat) but the extractor fails |

### 5. rb-07 (story) - fails 50% of 4 runs

- Reference: paanch sau nahi nahi, saat sau rupaye gaye
- Transcript (`rb-07__Madhur__r0__hi`): Paanch saal nahin nahin saat saal rupe gae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 700 | 7 | 700 | **asr**: value not in the transcript |

### 6. rb-18 (story) - fails 50% of 4 runs

- Reference: दीड लाख रुपये गेले, नाही नाही, अडीच लाख
- Transcript (`rb-18__Manohar__r0__mr`): Dead laakh rupe ke lie na hi na hi adhik laakh.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |

### 7. rb-11 (story) - fails 40% of 5 runs

- Reference: I lost 1.2 lakh rupees from my ICICI account
- Transcript (`rb-11__RemyMultilingual__r0__en`): I lost 1.2 lakh rupees from my ICC account.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 8. rb-15 (story) - fails 40% of 5 runs

- Reference: Rs 2,50,000 was debited from my Axis account
- Transcript (`rb-15__RemyMultilingual__r0__en`): RS 02:50 00 was debated from my access account.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 250 | 250000 | **asr**: value not in the transcript |

### 9. rb-04 (story) - fails 25% of 4 runs

- Reference: डेढ़ करोड़ रुपये का fraud हुआ
- Transcript (`rb-04__Swara__r0__hi`): Date karod rupe ka fraud hua.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000000 | - | 15000000 | **asr**: value not in the transcript |

### 10. rb-17 (story) - fails 25% of 4 runs

- Reference: माझ्या खात्यातून 5 thousand रुपये गेले
- Transcript (`rb-17__Manohar__r0__mr`): Maja khaatiyaatun paanch sthaav jaan roope ke lie.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |

### 11. rb-20 (story) - fails 25% of 4 runs

- Reference: सव्वा लाख रुपये कापले गेले
- Transcript (`rb-20__ThalitaMultilingual__r0__mr`): Sabva laakh rupe kaable gaele.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 125000 | - | 125000 | **asr**: value not in the transcript |

### 12. rb-40 (answer:amount) - fails 25% of 4 runs

- Reference: ढाई लाख
- Transcript (`rb-40__RemyMultilingual__r0__hi`): Ghai laakh.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 250000 | - | 250000 | **asr**: value not in the transcript |
