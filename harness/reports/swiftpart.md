# Turant pipeline eval: swiftpart

Generated 2026-11-27T12:46:32.597Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 118 ASR transcripts scored, **1392 transcripts missing** (run asr.py).
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 118 | 58.5 | 58.5 | 93.3 | 82.8 | 87.7 | 68.5 | 75.2 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 118 | 58.5 | 58.5 | 93.3 | 82.8 | 87.7 | 68.5 | 75.2 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 58.5% of clean runs and 58.5% of all runs fully correct. Per language (clean): hi 59%, en 58%, bn -%, ta -%, te -%, mr -%, kn -%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 88.6 | 87.5 | 88.1 | 88.1 |
| time | 113 | 100.0 | 100.0 | 100.0 | 96.6 | 98.3 | 97.4 | 97.4 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 96.0 | 98.0 | 98.0 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 100.0 | 86.0 | 92.5 | 92.5 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 90.0 | 94.7 | 94.7 |
| utr | 21 | 100.0 | 100.0 | 100.0 | 100.0 | 22.2 | 36.4 | 36.4 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 14.3 | 14.3 | 14.3 | 14.3 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 21.4 | 35.3 | 35.3 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 93.3 | 82.8 | 87.7 | 87.7 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | 58.8 | - | 100.0 | 86.2 | 100.3 | 127.1 | 12.5 (n=16) |
| en | 100.0 | 57.9 | - | 100.0 | 89.7 | 27.2 | 18.5 | 33.3 (n=9) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 86.3 | 100.0 / 100.0 | 100.0 / 98.0 | 100.0 / 92.3 | 100.0 / 85.7 | 100.0 / - | 100.0 / 25.0 | 100.0 / 40.0 | 100.0 / - |
| en | 100.0 / 90.6 | 100.0 / 94.3 | 100.0 / 97.9 | 100.0 / 92.9 | 100.0 / 100.0 | 100.0 / 80.0 | 100.0 / 0.0 | 100.0 / 28.6 | 100.0 / - |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 118 | 58.5 | 87.7 | 68.5 | 75.2 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 118 | 58.5 | 87.7 | 68.5 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| en-IN-NeerjaExpressiveNeural | 12 | 58.3 | 90.7 | 27.4 | 19.6 |
| en-IN-NeerjaNeural | 13 | 61.5 | 90.0 | 26.9 | 17.7 |
| en-IN-PrabhatNeural | 13 | 53.8 | 88.6 | 27.2 | 18.2 |
| hi-IN-MadhurNeural | 40 | 55.0 | 85.3 | 100.6 | 127.1 |
| hi-IN-SwaraNeural | 40 | 62.5 | 87.0 | 100.0 | 127.2 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 118 | 58.5 | 87.7 | 68.5 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 82 | 100.0 | 54.9 | 88.8 |
| correction | 8 | 100.0 | 75.0 | 85.7 |
| answer | 26 | 100.0 | 69.2 | 81.6 |
| answer (skip intent) | 2 | 100.0 | 0.0 | - |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 50 | 50 (100%) | 0 (0%) | 0 (0%) | 0 |
| clean | 50 | 50 (100%) | 0 (0%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| suspectPhone | 11 | 11 | 0 | 0 |
| amount | 10 | 10 | 0 | 0 |
| utr | 7 | 7 | 0 | 0 |
| suspectUpi | 6 | 6 | 0 | 0 |
| bank | 6 | 6 | 0 | 0 |
| scamType | 2 | 2 | 0 | 0 |
| suspectAccount | 2 | 2 | 0 | 0 |
| paymentApp | 2 | 2 | 0 | 0 |
| intent | 2 | 2 | 0 | 0 |
| time | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 33 | 33 | 0 | 0 |
| en | 17 | 17 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | hi | asr | wrong | 6 | hi-03 hi-11 hi-17 |
| 2 | suspectPhone | hi | asr | fn | 6 | hi-09 hi-23 hi-35 |
| 3 | utr | hi | asr | fn | 6 | hi-15 hi-33 hi-34 |
| 4 | suspectPhone | en | asr | fn | 5 | en-06 en-07 |
| 5 | bank | hi | asr | fn | 4 | hi-12 hi-18 hi-22 |
| 6 | suspectUpi | hi | asr | wrong | 3 | hi-10 hi-36 |
| 7 | amount | en | asr | wrong | 3 | en-03 en-12 en-13 |
| 8 | suspectUpi | en | asr | wrong | 3 | en-09 |
| 9 | suspectAccount | hi | asr | fn | 2 | hi-21 |
| 10 | paymentApp | hi | asr | fn | 2 | hi-24 |
| 11 | intent | hi | asr | fn | 2 | hi-38 |
| 12 | bank | en | asr | fn | 2 | en-10 |
| 13 | scamType | hi | asr | fn | 1 | hi-01 |
| 14 | amount | hi | asr | fn | 1 | hi-27 |
| 15 | scamType | en | asr | fn | 1 | en-02 |
| 16 | time | en | asr | wrong | 1 | en-03 |
| 17 | time | en | asr | fp | 1 | en-08 |
| 18 | utr | en | asr | fn | 1 | en-08 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. en-07 (story) - fails 100% of 3 runs

- Reference: The caller's number was nine double eight seven six five four three two one, he asked for the OTP and I gave it
- Transcript (`en-07__Neerja__r0__en`): The caller's number was 9 double 8754321. He asked for the OTP and I gave it.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9887654321 | - | 9887654321 | **asr**: value not in the transcript |

### 2. en-09 (story) - fails 100% of 3 runs

- Reference: I paid to the UPI ID rahul dot kyc at ybl, eight thousand rupees, twenty minutes back
- Transcript (`en-09__Neerja__r0__en`): I paid to the UPI ID raahul dot KIC at YBL 8000 rupees 20 minutes back.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kic@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 3. hi-03 (story) - fails 100% of 2 runs

- Reference: कल शाम 7 बजे कस्टमर केयर वाले का फोन आया, उसने AnyDesk डाउनलोड करवाया और मेरे एचडीएफसी अकाउंट से दो लाख रुपये निकाल लिए
- Transcript (`hi-03__Madhur__r0__hi`): Kal shaam saat baje customer care vaale ka phone aaya. Usne any desk download karvaaya aur mere HDFC account se do laakh rupe nikaal lie.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 200000 | 2 | 200000 | **asr**: value not in the transcript |

### 4. hi-09 (story) - fails 100% of 2 runs

- Reference: जिस नंबर से फोन आया था वो है 9 8 7 6 5... 4 3 2 1 0, उसने बोला बैंक से बोल रहा हूँ, केवाईसी नहीं किया तो खाता बंद हो जाएगा
- Transcript (`hi-09__Madhur__r0__hi`): Jis number se phone aaya tha vah hai nau aath saat chhah paanch. Chaar tin do ek shoony usne bola bank se bol raha hoon ki vaah si nahin kiya to khaata band ho jaega.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 5. hi-10 (story) - fails 100% of 2 runs

- Reference: मैंने यूपीआई आईडी rahul dot kyc at ybl पर आठ हज़ार रुपये भेजे, बीस मिनट पहले
- Transcript (`hi-10__Madhur__r0__hi`): Mainne UPI ID raahul dot KYC at YBL par aath hazaar rupe bhejen bis minute pahle.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | rahul.kyc@ybl | raahul.kyc@ybl | rahul.kyc@ybl | **asr**: value not in the transcript |

### 6. hi-11 (story) - fails 100% of 2 runs

- Reference: डेढ़ लाख रुपये गए हैं मेरे, बैंक ऑफ बड़ौदा का अकाउंट है, कल रात दस बजे
- Transcript (`hi-11__Madhur__r0__hi`): Dedh laakh rupe gae hain mere Bank of Badoda ka account hai kal raat das baje.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 150000 | 1.5 | 150000 | **asr**: value not in the transcript |

### 7. hi-15 (story) - fails 100% of 2 runs

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): Pahle cut gae UTR number hain chaar shoony tin, do ek aath, saat, chhah, paanch, chaar, tin, do, paanch hazaar rupe.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 403218765432 | - | 403218765432 | **asr**: value not in the transcript |

### 8. hi-17 (story) - fails 100% of 2 runs

- Reference: दो लाख पचास हज़ार रुपये इन्वेस्टमेंट के नाम पे ले लिए, बोला डबल हो जाएगा, यस बैंक से गए
- Transcript (`hi-17__Madhur__r0__hi`): Do laakh pachaas hazaar rupe investment ke naam par le lie bola double ho jaega. Yes bank se gae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 50000 | 250000 | **asr**: value not in the transcript |

### 9. en-03 (story) - fails 67% of 3 runs

- Reference: Sir please help, I got a call from customer care, they made me install AnyDesk and two lakh rupees are gone from my ICICI account, this happened yesterday at 7 pm.
- Transcript (`en-03__Neerja__r0__en`): Sir please help. I got a call from customer care. They made me install any desk and to laakh rupees are gone from my ICICI account. This happened yesterday at 07:00PM.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 200000 | 100000 | 200000 | **asr**: value not in the transcript |

### 10. en-06 (story) - fails 67% of 3 runs

- Reference: His number was nine eight seven six five, four three two one zero. He said my account will be blocked if I don't update KYC.
- Transcript (`en-06__Prabhat__r0__en`): His number was 987543210. He said my account will be blocked if I don't update KYC.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9876543210 | - | 9876543210 | **asr**: value not in the transcript |

### 11. en-10 (story) - fails 67% of 3 runs

- Reference: It started on Telegram with a part time job, liking YouTube videos, then they asked me to invest and I lost forty seven thousand rupees from my Kotak account
- Transcript (`en-10__Neerja__r0__en`): It started on Telegram with a part time job, liking YouTube videos, then they asked me to invest and I lost 47000 rupees from my quota account.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Kotak Mahindra Bank | - | Kotak Mahindra Bank | **asr**: ASR lost/changed: Kotak |

### 12. en-13 (story) - fails 50% of 2 runs

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__Prabhat__r0__en`): Kal raat saadhe nau baje kisi ne call kiya bola bijli ka bill pending hai. Link par click kiya aur nau hazaar nau south ninyaanve rupe kaat gae.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 9999 | 99 | 9999 | **asr**: value not in the transcript |
