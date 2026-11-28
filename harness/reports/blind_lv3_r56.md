# Turant pipeline eval: blind_lv3_r56

Generated 2026-11-28T00:37:07.967Z. Extractor: `..\prototype\src\lib\extract.ts`. 84 cases, 432 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 84 | 92.9 | 92.9 | 98.1 | 95.6 | 96.8 | - | - |
| ASR clean, normal rate | 180 | 62.8 | 62.8 | 94.1 | 78.5 | 85.6 | 56.7 | 30.0 |
| ASR noise 15 dB | 84 | 61.9 | 61.9 | 93.2 | 77.4 | 84.5 | 64.4 | 31.7 |
| ASR noise 5 dB | 84 | 36.9 | 36.9 | 86.7 | 57.2 | 68.9 | 90.7 | 50.0 |
| ASR rate -15% / +15% | 84 | 65.5 | 65.5 | 96.2 | 80.5 | 87.7 | 51.1 | 29.2 |
| ASR all (forced language) | 432 | 58.1 | 58.1 | 93.2 | 74.5 | 82.8 | 63.7 | 34.0 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 72.2% of clean runs and 67.4% of all runs fully correct. Per language (clean): hi 88%, en 97%, bn 58%, ta 50%, te 63%, mr 71%, kn 67%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 48 | 100.0 | 97.9 | 98.9 | 95.6 | 85.3 | 90.2 | 87.5 |
| time | 25 | 100.0 | 100.0 | 100.0 | 96.2 | 92.7 | 94.4 | 88.8 |
| scamType | 34 | 93.8 | 88.2 | 90.9 | 93.5 | 79.5 | 85.9 | 82.5 |
| bank | 17 | 100.0 | 100.0 | 100.0 | 100.0 | 81.6 | 89.9 | 92.8 |
| paymentApp | 15 | 92.9 | 86.7 | 89.7 | 86.4 | 57.6 | 69.1 | 67.7 |
| utr | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 66.7 | 80.0 | 73.7 |
| suspectUpi | 6 | 100.0 | 100.0 | 100.0 | 66.7 | 30.8 | 42.1 | 40.9 |
| suspectPhone | 7 | 100.0 | 100.0 | 100.0 | 83.3 | 66.7 | 74.1 | 67.7 |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 159 | 98.1 | 95.6 | 96.8 | 94.1 | 78.5 | 85.6 | 82.8 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 91.7 | 75.0 | 58.3 | 95.7 | 88.9 | 41.7 | 26.7 | 100.0 (n=4) |
| en | 83.3 | 80.6 | 75.0 | 94.1 | 93.4 | 20.8 | 7.7 | 83.3 (n=6) |
| bn | 100.0 | 50.0 | 16.7 | 100.0 | 78.9 | 70.0 | 41.3 | 75.0 (n=4) |
| ta | 91.7 | 41.7 | 25.0 | 95.2 | 74.0 | 51.5 | 26.1 | 0.0 (n=4) |
| te | 91.7 | 54.2 | 16.7 | 97.7 | 80.5 | 134.9 | 83.1 | 75.0 (n=4) |
| mr | 91.7 | 62.5 | 33.3 | 95.5 | 84.3 | 70.8 | 24.3 | 100.0 (n=4) |
| kn | 100.0 | 66.7 | 33.3 | 100.0 | 90.0 | 57.9 | 20.3 | 50.0 (n=4) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 85.7 | 100.0 / 100.0 | 75.0 / 75.0 | 100.0 / 100.0 | 100.0 / 66.7 | 100.0 / 100.0 |  | 100.0 / 100.0 |  |
| en | 100.0 / 100.0 | 100.0 / 100.0 | 88.9 / 88.9 | 100.0 / 100.0 | 66.7 / 66.7 | 100.0 / 80.0 | 100.0 / 100.0 | 100.0 / 100.0 |  |
| bn | 100.0 / 84.6 | 100.0 / 100.0 | 100.0 / 94.7 | 100.0 / 66.7 | 100.0 / - | 100.0 / 100.0 | 100.0 / - | 100.0 / 0.0 |  |
| ta | 100.0 / 84.6 | 100.0 / 100.0 | 88.9 / 66.7 | 100.0 / 66.7 | 66.7 / 40.0 | 100.0 / 66.7 | 100.0 / 66.7 | 100.0 / 0.0 |  |
| te | 92.3 / 88.0 | 100.0 / 80.0 | 100.0 / 88.9 | 100.0 / 100.0 | 100.0 / 66.7 | 100.0 / - | 100.0 / 0.0 | 100.0 / 100.0 |  |
| mr | 100.0 / 88.0 | 100.0 / 66.7 | 80.0 / 80.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / - | 100.0 / 100.0 |  |
| kn | 100.0 / 96.3 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 40.0 | 100.0 / 100.0 | 100.0 / 66.7 | 100.0 / - | 100.0 / 66.7 |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 33 | 51.5 | 79.0 | 49.9 | 22.2 |
| babble 5 dB | 33 | 27.3 | 61.0 | 118.3 | 59.8 |
| clean | 264 | 63.6 | 86.2 | 55.0 | 29.8 |
| pink 15 dB | 28 | 71.4 | 88.1 | 53.3 | 33.9 |
| pink 5 dB | 28 | 25.0 | 58.3 | 69.3 | 42.5 |
| traffic 15 dB | 23 | 65.2 | 88.6 | 95.0 | 42.6 |
| traffic 5 dB | 23 | 65.2 | 87.4 | 75.0 | 44.1 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 180 | 62.8 | 85.6 | 56.7 |
| 15 dB | 84 | 61.9 | 84.5 | 64.4 |
| 5 dB | 84 | 36.9 | 68.9 | 90.7 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 12 | 50.0 | 78.9 | 70.8 | 43.4 |
| bn-IN-TanishaaNeural | 12 | 50.0 | 78.9 | 69.2 | 39.2 |
| en-IN-NeerjaExpressiveNeural | 12 | 83.3 | 94.1 | 20.6 | 7.8 |
| en-IN-NeerjaNeural | 12 | 75.0 | 92.0 | 21.2 | 8.1 |
| en-IN-PrabhatNeural | 12 | 83.3 | 94.1 | 20.6 | 7.1 |
| hi-IN-MadhurNeural | 12 | 75.0 | 88.9 | 41.4 | 26.3 |
| hi-IN-SwaraNeural | 12 | 75.0 | 88.9 | 42.0 | 27.1 |
| kn-IN-GaganNeural | 12 | 50.0 | 84.2 | 54.6 | 19.0 |
| kn-IN-SapnaNeural | 12 | 83.3 | 95.2 | 61.1 | 21.5 |
| mr-IN-AarohiNeural | 12 | 66.7 | 87.8 | 74.1 | 24.8 |
| mr-IN-ManoharNeural | 12 | 58.3 | 81.0 | 67.6 | 23.8 |
| ta-IN-PallaviNeural | 12 | 41.7 | 72.2 | 47.6 | 25.0 |
| ta-IN-ValluvarNeural | 12 | 41.7 | 75.7 | 55.3 | 27.1 |
| te-IN-MohanNeural | 12 | 50.0 | 78.9 | 169.7 | 79.3 |
| te-IN-ShrutiNeural | 12 | 58.3 | 82.1 | 100.0 | 87.0 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 180 | 62.8 | 85.6 | 56.7 |
| +15% | 45 | 57.8 | 85.4 | 52.1 |
| -15% | 39 | 74.4 | 90.4 | 49.9 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 75 | 85.7 | 57.3 | 89.6 |
| answer | 90 | 100.0 | 68.9 | 79.2 |
| correction | 15 | 85.7 | 53.3 | 57.1 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 212 | 156 (74%) | 19 (9%) | 37 (17%) | 5 |
| clean | 76 | 53 (70%) | 7 (9%) | 16 (21%) | 2 |
| 15 dB | 37 | 26 (70%) | 4 (11%) | 7 (19%) | 1 |
| 5 dB | 68 | 56 (82%) | 5 (7%) | 7 (10%) | 1 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 46 | 36 | 5 | 5 |
| scamType | 45 | 23 | 1 | 21 |
| paymentApp | 35 | 20 | 4 | 11 |
| suspectUpi | 22 | 20 | 2 | 0 |
| time | 19 | 17 | 2 | 0 |
| suspectPhone | 18 | 14 | 4 | 0 |
| utr | 15 | 14 | 1 | 0 |
| bank | 12 | 12 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 17 | 10 | 2 | 5 |
| en | 15 | 3 | 0 | 12 |
| bn | 41 | 33 | 8 | 0 |
| ta | 46 | 33 | 3 | 10 |
| te | 37 | 28 | 4 | 5 |
| mr | 30 | 24 | 1 | 5 |
| kn | 26 | 25 | 1 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | scamType | ta | asr | fn | 9 | ta-b01 ta-b02 ta-b04 |
| 2 | paymentApp | bn | asr | fn | 8 | bn-b02 bn-b11 |
| 3 | scamType | te | asr | fn | 8 | te-b01 te-b02 te-b04 te-b11 |
| 4 | amount | mr | asr | fn | 7 | mr-b04 mr-b11 |
| 5 | paymentApp | en | extractor | wrong | 6 | en-b10 |
| 6 | scamType | en | extractor | fn | 6 | en-b11 |
| 7 | time | mr | asr | wrong | 6 | mr-b03 mr-b06 |
| 8 | scamType | hi | extractor | wrong | 5 | hi-b03 |
| 9 | suspectUpi | bn | asr | fn | 5 | bn-b12 |
| 10 | bank | ta | asr | fn | 5 | ta-b01 ta-b09 |
| 11 | suspectPhone | ta | asr | fn | 5 | ta-b08 |
| 12 | amount | ta | asr | fn | 5 | ta-b10 ta-b03 ta-b04 |
| 13 | scamType | ta | extractor | fn | 5 | ta-b11 |
| 14 | paymentApp | ta | extractor | fn | 5 | ta-b11 |
| 15 | time | te | asr | fn | 5 | te-b06 te-b02 |
| 16 | amount | te | extractor | fn | 5 | te-b11 |
| 17 | scamType | mr | extractor | wrong | 5 | mr-b02 |
| 18 | suspectUpi | mr | asr | fn | 5 | mr-b12 |
| 19 | bank | kn | asr | fn | 5 | kn-b01 kn-b09 |
| 20 | suspectUpi | kn | asr | fn | 5 | kn-b12 |
| 21 | scamType | bn | asr | fn | 4 | bn-b01 bn-b11 |
| 22 | suspectPhone | bn | extractor_form | fn | 4 | bn-b08 |
| 23 | amount | bn | asr | wrong | 4 | bn-b10 bn-b05 |
| 24 | amount | bn | asr | fn | 4 | bn-b11 bn-b02 bn-b04 |
| 25 | amount | te | asr | fn | 4 | te-b04 te-b02 te-b05 |
| 26 | paymentApp | te | asr | fn | 4 | te-b11 |
| 27 | utr | kn | asr | fn | 4 | kn-b07 |
| 28 | amount | kn | asr | fn | 4 | kn-b10 kn-b11 |
| 29 | paymentApp | hi | asr | fn | 3 | hi-b02 |
| 30 | utr | ta | asr | fn | 3 | ta-b07 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. ta-b11 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: தப்பா பணம் அனுப்பிட்டேன்னு ஒருத்தர் சொன்னார், நான் ஜிபே மூலமா எண்ணூறு ரூபாய் திருப்பி அனுப்பினேன்
- Transcript (`ta-b11__Pallavi__r0__ta`): கப்பா படம் அனுப்பிட்டேன் என்று ஒரு தர் சொன்னார் நான் ஜிபே மூலமா 800 ருபாய் திருப்பி அனுப்பினேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | wrong_transfer | - | - | **extractor**: fails on the reference text too (fn) |
| paymentApp | fn | Google Pay | - | - | **extractor**: fails on the reference text too (fn) |

### 2. te-b11 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: పొరపాటున డబ్బులు పంపానని ఒకతను అడిగాడు, నేను గూగుల్ పే లో తొమ్మిది వందలు తిరిగి పంపాను
- Transcript (`te-b11__Mohan__r0__te`): ಪುರಪಾಟುನ ಡಬ್ಬಲು జಾನನೇ ಈ ಈ దిಗಾಡು. ಈ ಈ ಈ గూಗుಲ జಾನನು జಾನನು ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ ಈ � �

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 900 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: గూగుల్ పే |

### 3. bn-b11 (story) - fails 100% of 5 runs

- Reference: ভুল করে টাকা পাঠিয়েছি বলে একজন ফেরত চাইল, আমি গুগল পে থেকে বারোশো টাকা দিয়ে দিলাম
- Transcript (`bn-b11__Bashkar__r0__bn`): ভুল করে টাকা পাঠিয়েছি বোলে একজন ফেরত চাইল, আমি গুগুল পেথেকে বারোশো টাকা দিয়ে দিলাম।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: গুগল |

### 4. bn-b10 (correction) - fails 100% of 5 runs

- Reference: না না, তিন হাজার নয়, তেরো হাজার
- Transcript (`bn-b10__Bashkar__r0__bn`): 9-3-9-13-

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 13000 | 13 | 13000 | **asr**: value not in the transcript |

### 5. ta-b01 (story) - fails 100% of 5 runs

- Reference: யாரோ போன் பண்ணி கேஒய்சி அப்டேட் பண்ணணும்னு சொன்னாங்க, என் இந்தியன் பேங்க் அக்கவுண்ட்ல இருந்து பத்தாயிரம் ரூபாய் போச்சு
- Transcript (`ta-b01__Pallavi__r0__ta`): யாரோ போன் பண்ணி கேவிச்சி அப்தேட் பண்ணணும்னு சொன்னாங்க, என் இந்தியன் பேங் அக்கவுண்ல இருந்து பத்தாயிரம் ருபாய் போச்சு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: கேஒய்சி |
| bank | fn | Indian Bank | - | Indian Bank | **asr**: ASR lost/changed: பேங்க் |

### 6. hi-b02 (story) - fails 100% of 5 runs

- Reference: किसी ने बोला आपकी लॉटरी लगी है, फीस भेजो, मैंने पेटीएम से 2,999 रुपये भेज दिए कल रात नौ बजे
- Transcript (`hi-b02__Madhur__r0__hi`): किसी ने बोला आपकी लोटरी लगी है पीस भेजो मैंने पेटीम से 2,999 रुपए भेज दिये कल रात 9 बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: near-spelling variant of: पेटीएम |

### 7. en-b10 (correction) - fails 100% of 6 runs, also fails on reference text

- Reference: sorry, not Google Pay, it was Paytm
- Transcript (`en-b10__Neerja__r0__en`): Sorry, not Google Pay, it was Paytm.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | wrong | Paytm | Google Pay | Google Pay | **extractor**: fails on the reference text too (wrong) |

### 8. en-b11 (story) - fails 100% of 6 runs, also fails on reference text

- Reference: A guy on Instagram threatened to leak my photos, I paid him 3000 on Google Pay at 11 last night
- Transcript (`en-b11__Neerja__r0__en`): A guy on Instagram threatened to leak my photos, I paid him 3000 on Google Pay at 11 last night.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | sextortion | - | - | **extractor**: fails on the reference text too (fn) |

### 9. bn-b01 (story) - fails 100% of 5 runs

- Reference: কেউ ফোন করে বলল কেওয়াইসি আপডেট করতে হবে, তারপর আমার এসবিআই অ্যাকাউন্ট থেকে সাত হাজার টাকা কেটে নিল, আধ ঘণ্টা আগে
- Transcript (`bn-b01__Bashkar__r0__bn`): K-Wi-C আপডেট করতে হবে তারপর আমার SDI একাউন্ট থেকে 7000 তাকা কেটে নিলো আদ ঘন্তা আগে

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: কেওয়াইসি |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: এসবিআই |

### 10. bn-b02 (story) - fails 100% of 5 runs

- Reference: ওটিপি বলে দিয়েছিলাম, পনেরো হাজার টাকা চলে গেছে, ফোনপে থেকে
- Transcript (`bn-b02__Bashkar__r0__bn`): OTP বলে দিয়েছিলাম পনেরো হাজার তাকা চোলে গাছে ফন্তে থেকে

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: ফোনপে |

### 11. mr-b02 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: चुकून ओटीपी सांगितला, पंचवीस हजार रुपये गेले, अर्ध्या तासापूर्वी
- Transcript (`mr-b02__Aarohi__r0__mr`): चुकून OTP संगितला 25,000 रुपे गेले अरध्या तासा पूर्वी

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | wrong | otp_shared | wrong_transfer | wrong_transfer | **extractor**: fails on the reference text too (wrong) |

### 12. hi-b03 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: गलती से ओटीपी बता दिया, कोटक बैंक से पच्चीस हज़ार निकल गए, अभी पंद्रह मिनट हुए
- Transcript (`hi-b03__Madhur__r0__hi`): गलती से OTP बता दिया, कोटक बैंक से 25,000 निकल गए, अभी 15 मिनट हुए.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | wrong | otp_shared | wrong_transfer | wrong_transfer | **extractor**: fails on the reference text too (wrong) |

### 13. bn-b08 (answer:suspect) - fails 100% of 5 runs

- Reference: নম্বরটা হল ৯ ৮ ৩ ০ ১ ২ ৪ ৫ ৬ ৭
- Transcript (`bn-b08__Bashkar__r0__bn`): নমোরতা হলো নয় 830124567

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9830124567 | - | 9830124567 | **extractor_form**: value is in the transcript but not parsed |

### 14. bn-b12 (answer:suspect) - fails 100% of 5 runs

- Reference: ইউপিআই আইডি ছিল lucky dot win at ybl
- Transcript (`bn-b12__Bashkar__r0__bn`): UPI আইদি ছিলো Lucky.WinnieDeeble

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | lucky.win@ybl | - | lucky.win@ybl | **asr**: value not in the transcript |

### 15. ta-b08 (answer:suspect) - fails 100% of 5 runs

- Reference: அவன் நம்பர் 9 4 4 3 2 1 0 9 8 7
- Transcript (`ta-b08__Pallavi__r0__ta`): அவன் 944321 பூஜியம் 97

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9443210987 | - | 9443210987 | **asr**: value not in the transcript |

### 16. te-b01 (story) - fails 100% of 5 runs

- Reference: ఎవరో ఫోన్ చేసి కేవైసీ అప్డేట్ చేయాలని చెప్పారు, నా ఎస్బిఐ ఖాతా నుంచి ఎనిమిది వేల రూపాయలు పోయాయి
- Transcript (`te-b01__Mohan__r0__te`): ಎವರೋ ఫোನ್ జেಸಿ KVC అప್డేట్ జేయాలని జిప్పేరు. నా SBI ఖాతానంచి 8000 రూపాయలు పోయాఈ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: కేవైసీ |

### 17. te-b12 (answer:suspect) - fails 100% of 5 runs

- Reference: యూపీఐ ఐడీ gift dot card at ybl
- Transcript (`te-b12__Mohan__r0__te`): upaidgift.card at ybl

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | gift.card@ybl | upaidgift.card@ybl | gift.card@ybl | **extractor_form**: value is in the transcript but not parsed |

### 18. mr-b11 (story) - fails 100% of 5 runs

- Reference: चुकून पैसे पाठवले म्हणून एकाने परत मागितले, मी गुगल पे ने सातशे रुपये परत पाठवले
- Transcript (`mr-b11__Aarohi__r0__mr`): चुकून पैसे पाठावले मनून एकाने पर्त मागितले मी गुगल पेनने साथशे रुपे पर्त पाठावले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 700 | - | 700 | **asr**: value not in the transcript |

### 19. mr-b12 (answer:suspect) - fails 100% of 5 runs

- Reference: यूपीआय आयडी help dot desk at ybl
- Transcript (`mr-b12__Aarohi__r0__mr`): UPI ID Help D.O.T. Descat

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | help.desk@ybl | - | help.desk@ybl | **asr**: value not in the transcript |

### 20. kn-b12 (answer:suspect) - fails 100% of 5 runs

- Reference: ಯುಪಿಐ ಐಡಿ bonus dot pay at ybl
- Transcript (`kn-b12__Gagan__r0__kn`): UPAID bonus.pay it able.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | bonus.pay@ybl | - | bonus.pay@ybl | **asr**: value not in the transcript |

### 21. ta-b04 (story) - fails 80% of 5 runs

- Reference: டெலிகிராம்ல டாஸ்க் பண்ணா லாபம்னு சொல்லி ஐம்பதாயிரம் ரூபாய் வாங்கிட்டாங்க
- Transcript (`ta-b04__Pallavi__r0__ta`): தெலிக் ராம்ல டாஸ்க் பண்ணால் லாபம்னு சொல்லி 500,000 ரூபாய் வாங்கிட்டாங்க.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 50000 | 500000 | 50000 | **asr**: value not in the transcript |

### 22. ta-b07 (answer:utr) - fails 80% of 5 runs

- Reference: 7 7 1 2 3 4 5 6 8 9 0 1
- Transcript (`ta-b07__Pallavi__r0__ta`): ஏறு ஏறு 1, 2, 3, 4, 5, 6, 8, 9 பூஜியம் 1.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 771234568901 | - | 771234568901 | **asr**: value not in the transcript |

### 23. te-b07 (answer:utr) - fails 80% of 5 runs

- Reference: 3 2 1 4 5 6 7 8 9 0 1 2
- Transcript (`te-b07__Mohan__r0__te`): 3 2 1 గంటా 4 5 6 7 8 9 0 1 గంటా 2

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 321456789012 | - | 321456789012 | **extractor_form**: value is in the transcript but not parsed |

### 24. kn-b07 (answer:utr) - fails 80% of 5 runs

- Reference: 8 1 2 3 4 5 6 7 9 0 1 2
- Transcript (`kn-b07__Gagan__r0__kn`): 812-34567912

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 812345679012 | - | 812345679012 | **asr**: value not in the transcript |

### 25. kn-b08 (answer:suspect) - fails 80% of 5 runs

- Reference: ಅವನ ನಂಬರ್ 9 9 0 0 1 2 3 4 5 6
- Transcript (`kn-b08__Gagan__r0__kn`): ಅವನ ನಮ್ಬರ್ 999-173456

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9900123456 | - | 9900123456 | **asr**: value not in the transcript |

### 26. kn-b09 (answer:bank) - fails 80% of 5 runs

- Reference: ಐಸಿಐಸಿಐ ಬ್ಯಾಂಕ್
- Transcript (`kn-b09__Gagan__r0__kn`): ಇಸ್ಯಾಸಿದಾಗಿ ಬಾಂಕ್

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ಐಸಿಐಸಿಐ |

### 27. mr-b03 (story) - fails 60% of 5 runs

- Reference: काल रात्री आठ वाजता क्यूआर कोड स्कॅन केला, फोनपे वरून तीन हजार रुपये कापले गेले
- Transcript (`mr-b03__Manohar__r0__mr`): काल रातरी आठ वास्ता QR कोर स्कैन केला, फोन पे वरून तीन हजार रुपे कापले गेले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 20:00 (960 min ago) | -1d 22:00 (840 min ago) | -1d 20:00 (960 min ago) | **asr**: ASR lost/changed: वाजता |

### 28. ta-b02 (story) - fails 60% of 5 runs

- Reference: ஓடிபி சொல்லிட்டேன், இருபதாயிரம் ரூபாய் போயிடுச்சு, ஒரு மணி நேரம் முன்னாடி
- Transcript (`ta-b02__Valluvar__r0__ta`): ஓடிப்பி சொல்லிட்டேன் இருபதாயிரம் ரூபாய் போயிடிச்சி ஒரு மணி நேரம் முன்னாடி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: ஓடிபி |

### 29. te-b06 (answer:time) - fails 60% of 5 runs

- Reference: ఈ రోజు ఉదయం తొమ్మిది గంటలకు
- Transcript (`te-b06__Mohan__r0__te`): ಇರೋಜು ఉದೆಯం జుಮ್ಮಿದಿ జంತಲ కు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 09:00 (180 min ago) | - | today 09:00 (180 min ago) | **asr**: ASR lost/changed: తొమ్మిది గంటలకు |

### 30. mr-b06 (answer:time) - fails 60% of 5 runs

- Reference: आज सकाळी अकरा वाजता
- Transcript (`mr-b06__Manohar__r0__mr`): आज सकारी अक्रा वास्ता

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 11:00 (60 min ago) | today 12:00 (0 min ago) | today 11:00 (60 min ago) | **asr**: ASR lost/changed: अकरा वाजता |

### 31. kn-b10 (correction) - fails 60% of 5 runs

- Reference: ಇಲ್ಲ, ಮೂರು ಸಾವಿರ ಅಲ್ಲ, ಮೂವತ್ತು ಸಾವಿರ
- Transcript (`kn-b10__Gagan__r0__kn`): ಇಲ್ಲ ಮೂರು ಸಾವಿರಾಲ್ಲ ಮುವತ್ತು ಸಾವಿರಾ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 30000 | - | 30000 | **asr**: value not in the transcript |

### 32. te-b02 (story) - fails 40% of 5 runs

- Reference: ఓటీపీ చెప్పేశాను, ముప్పై వేల రూపాయలు కట్ అయ్యాయి, అరగంట క్రితం
- Transcript (`te-b02__Shruti__r0__babble15__te`): OTP చపేసాను 30,000 రూపాయలు కట్ అయాయి అరడంటక్ రితమ్

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:30 (30 min ago) | - | today 11:30 (30 min ago) | **asr**: ASR lost/changed: అరగంట |

### 33. kn-b11 (story) - fails 40% of 5 runs

- Reference: ತಪ್ಪಾಗಿ ಹಣ ಕಳಿಸಿದೆ ಅಂತ ಒಬ್ಬರು ಕೇಳಿದರು, ನಾನು ಗೂಗಲ್ ಪೇ ಇಂದ ಆರುನೂರು ರೂಪಾಯಿ ವಾಪಸ್ ಕಳಿಸಿದೆ
- Transcript (`kn-b11__Sapna__r0__babble5__kn`): ತಪ್ಪಾಗಿ ಹಣಕಳಸಿದೆ ಅಂತ ಒಬ್ಬರು ಕೆಳಿದರು. ನಾನು ಗೂಗಲ್ಬೇಯಿಂದ ಆರ್ಮೆರಿ ಮುಪಾಯಿಂದ ವಾಪಸ್ಕಳಿದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 600 | - | 600 | **asr**: value not in the transcript |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: ಪೇ |

### 34. hi-b06 (answer:amount) - fails 40% of 5 runs

- Reference: लगभग अठारह सौ रुपये
- Transcript (`hi-b06__Madhur__r0__hi`): लगभग अठारा सौ रुपए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 1800 | 100 | 1800 | **asr**: value not in the transcript |

### 35. mr-b04 (story) - fails 40% of 5 runs

- Reference: टेलिग्रामवर टास्कचं काम सांगून चाळीस हजार रुपये घेतले
- Transcript (`mr-b04__Aarohi__r0__mr`): तेली ग्राम वर टास्क च काम सांगुन चारीस हजार रुपे घितले।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 40000 | - | 40000 | **asr**: value not in the transcript |

### 36. en-b02 (story) - fails 33% of 6 runs

- Reference: I scanned a QR code to receive money for my old sofa and instead 9,500 got debited from my PhonePe
- Transcript (`en-b02__Prabhat__r0__babble15__en`): I scanned AQR code to receive money for my old sofa and instead 9500 got debited from my phone page.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 37. hi-b04 (story) - fails 20% of 5 runs

- Reference: एक लड़का बोला गलती से आपको पैसे भेज दिए, वापस करो, मैंने गूगल पे से सात सौ पचास रुपये लौटा दिए, सुबह दस बजे
- Transcript (`hi-b04__Swara__r0__pink5__hi`): एक लड़का बोला गल्पी से आपको पैसे भीज दिये वापस करो मैंने गूगल पे से 750 रुपए लोटा दिये सुभाँ 10 पजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 10:00 (120 min ago) | today 09:00 (180 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: बजे |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: गलती |

### 38. hi-b05 (story) - fails 20% of 5 runs

- Reference: टेलीग्राम पर टास्क वाला काम था, पहले मुनाफा दिया फिर एक लाख बीस हज़ार रुपये डलवा लिए
- Transcript (`hi-b05__Swara__r0__babble5__hi`): टेलिग्राम पर टास्क वाला काम था पहले मुनाफा दिया फिर एक लाख बीज हजार रुपए डलवा लिये

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 120000 | - | 120000 | **asr**: value not in the transcript |

### 39. hi-b11 (correction) - fails 20% of 5 runs

- Reference: नहीं, चार हज़ार नहीं, चौदह हज़ार गए थे
- Transcript (`hi-b11__Swara__r0__pink5__hi`): नहीं, चार हजार नहीं, चौधा हजार गए थे।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 14000 | - | 14000 | **asr**: value not in the transcript |

### 40. en-b07 (answer:utr) - fails 17% of 6 runs

- Reference: UTR is 3 0 9 8 7 6 5 4 3 2 1 0
- Transcript (`en-b07__Neerja__r0__en`): UTR is 309-876-543-10.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 309876543210 | - | 309876543210 | **asr**: value not in the transcript |
