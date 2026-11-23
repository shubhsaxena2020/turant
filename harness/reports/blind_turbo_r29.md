# Turant pipeline eval: blind_turbo_r29

Generated 2026-11-23T21:38:57.832Z. Extractor: `..\prototype\src\lib\extract.ts`. 84 cases, 432 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 84 | 90.5 | 90.5 | 97.4 | 94.3 | 95.8 | - | - |
| ASR clean, normal rate | 180 | 50.6 | 50.6 | 87.4 | 66.6 | 75.6 | 49.4 | 24.3 |
| ASR noise 15 dB | 84 | 39.3 | 39.3 | 84.1 | 59.7 | 69.9 | 78.4 | 42.7 |
| ASR noise 5 dB | 84 | 28.6 | 28.6 | 77.6 | 41.5 | 54.1 | 67.2 | 59.7 |
| ASR rate -15% / +15% | 84 | 38.1 | 38.1 | 84.8 | 59.7 | 70.1 | 53.6 | 27.6 |
| ASR all (forced language) | 432 | 41.7 | 41.7 | 84.8 | 59.1 | 69.6 | 59.2 | 35.4 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 62.2% of clean runs and 51.6% of all runs fully correct. Per language (clean): hi 83%, en 100%, bn 29%, ta 29%, te 71%, mr 71%, kn 33%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 48 | 97.9 | 95.8 | 96.8 | 85.7 | 64.7 | 73.7 | 67.1 |
| time | 25 | 100.0 | 100.0 | 100.0 | 85.7 | 76.4 | 80.8 | 72.3 |
| scamType | 34 | 93.8 | 88.2 | 90.9 | 92.9 | 71.2 | 80.6 | 75.3 |
| bank | 17 | 100.0 | 94.1 | 97.0 | 93.3 | 73.7 | 82.4 | 84.1 |
| paymentApp | 15 | 92.9 | 86.7 | 89.7 | 88.9 | 72.7 | 80.0 | 75.6 |
| utr | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 40.0 | 57.1 | 48.0 |
| suspectUpi | 6 | 100.0 | 100.0 | 100.0 | 42.9 | 23.1 | 30.0 | 18.2 |
| suspectPhone | 7 | 100.0 | 100.0 | 100.0 | 88.9 | 53.3 | 66.7 | 53.8 |
| suspectAccount | 0 | - | - | - | 0.0 | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 159 | 97.4 | 94.3 | 95.8 | 87.4 | 66.6 | 75.6 | 69.6 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 91.7 | 75.0 | 58.3 | 95.7 | 88.9 | 44.6 | 28.2 | 75.0 (n=4) |
| en | 83.3 | 83.3 | 66.7 | 94.1 | 92.0 | 20.2 | 6.4 | 100.0 (n=6) |
| bn | 100.0 | 25.0 | 8.3 | 100.0 | 48.6 | 78.3 | 36.6 | 50.0 (n=4) |
| ta | 91.7 | 20.8 | 8.3 | 95.2 | 52.9 | 64.6 | 31.7 | 0.0 (n=4) |
| te | 83.3 | 50.0 | 16.7 | 93.0 | 80.0 | 56.9 | 31.6 | 0.0 (n=4) |
| mr | 83.3 | 54.2 | 25.0 | 93.0 | 80.0 | 55.6 | 23.5 | 50.0 (n=4) |
| kn | 100.0 | 29.2 | 16.7 | 100.0 | 61.8 | 63.0 | 26.7 | 25.0 (n=4) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 81.5 | 100.0 / 100.0 | 75.0 / 75.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 |  | 100.0 / 66.7 |  |
| en | 100.0 / 90.9 | 100.0 / 100.0 | 88.9 / 88.9 | 100.0 / 100.0 | 66.7 / 66.7 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 |  |
| bn | 100.0 / 48.0 | 100.0 / 54.5 | 100.0 / 75.0 | 100.0 / 0.0 | 100.0 / 40.0 | 100.0 / 66.7 | 100.0 / - | 100.0 / - |  |
| ta | 100.0 / 47.6 | 100.0 / 72.7 | 88.9 / 66.7 | 100.0 / 66.7 | 66.7 / 66.7 | 100.0 / - | 100.0 / 0.0 | 100.0 / 0.0 |  |
| te | 76.9 / 76.9 | 100.0 / 90.9 | 100.0 / 94.7 | 100.0 / 85.7 | 100.0 / 100.0 | 100.0 / - | 100.0 / 0.0 | 100.0 / 66.7 |  |
| mr | 100.0 / 92.3 | 100.0 / 54.5 | 80.0 / 73.7 | 66.7 / 100.0 | 100.0 / 100.0 | 100.0 / - | 100.0 / - | 100.0 / 100.0 |  |
| kn | 100.0 / 66.7 | 100.0 / 40.0 | 100.0 / 82.4 | 100.0 / 40.0 | 100.0 / 85.7 | 100.0 / - | 100.0 / - | 100.0 / 66.7 | fp 0/1 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 33 | 27.3 | 64.3 | 112.3 | 64.5 |
| babble 5 dB | 33 | 15.2 | 38.3 | 76.5 | 98.9 |
| clean | 264 | 46.6 | 73.9 | 50.7 | 25.4 |
| pink 15 dB | 28 | 50.0 | 75.3 | 60.5 | 36.3 |
| pink 5 dB | 28 | 28.6 | 52.9 | 71.3 | 43.3 |
| traffic 15 dB | 23 | 43.5 | 72.3 | 50.8 | 19.1 |
| traffic 5 dB | 23 | 47.8 | 73.2 | 50.8 | 22.1 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 180 | 50.6 | 75.6 | 49.4 |
| 15 dB | 84 | 39.3 | 69.9 | 78.4 |
| 5 dB | 84 | 28.6 | 54.1 | 67.2 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 12 | 16.7 | 42.4 | 81.7 | 39.9 |
| bn-IN-TanishaaNeural | 12 | 33.3 | 54.1 | 75.0 | 33.3 |
| en-IN-NeerjaExpressiveNeural | 12 | 83.3 | 92.0 | 20.0 | 5.9 |
| en-IN-NeerjaNeural | 12 | 83.3 | 92.0 | 20.6 | 5.9 |
| en-IN-PrabhatNeural | 12 | 83.3 | 92.0 | 20.0 | 7.4 |
| hi-IN-MadhurNeural | 12 | 75.0 | 88.9 | 44.6 | 27.5 |
| hi-IN-SwaraNeural | 12 | 75.0 | 88.9 | 44.6 | 29.0 |
| kn-IN-GaganNeural | 12 | 25.0 | 58.8 | 63.0 | 21.1 |
| kn-IN-SapnaNeural | 12 | 33.3 | 64.7 | 63.0 | 32.2 |
| mr-IN-AarohiNeural | 12 | 58.3 | 85.0 | 57.4 | 22.9 |
| mr-IN-ManoharNeural | 12 | 50.0 | 75.0 | 53.7 | 24.1 |
| ta-IN-PallaviNeural | 12 | 25.0 | 62.9 | 65.0 | 37.6 |
| ta-IN-ValluvarNeural | 12 | 16.7 | 42.4 | 64.1 | 25.8 |
| te-IN-MohanNeural | 12 | 58.3 | 82.9 | 53.2 | 29.2 |
| te-IN-ShrutiNeural | 12 | 41.7 | 76.9 | 60.6 | 34.0 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 180 | 50.6 | 75.6 | 49.4 |
| +15% | 45 | 37.8 | 74.2 | 52.1 |
| -15% | 39 | 38.5 | 65.0 | 55.6 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 75 | 82.9 | 46.7 | 80.8 |
| answer | 90 | 100.0 | 57.8 | 68.4 |
| correction | 15 | 71.4 | 26.7 | 30.8 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 345 | 265 (77%) | 38 (11%) | 42 (12%) | 10 |
| clean | 117 | 82 (70%) | 17 (15%) | 18 (15%) | 4 |
| 15 dB | 68 | 52 (76%) | 8 (12%) | 8 (12%) | 2 |
| 5 dB | 95 | 79 (83%) | 8 (8%) | 8 (8%) | 2 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 107 | 90 | 7 | 10 |
| scamType | 64 | 34 | 9 | 21 |
| time | 45 | 31 | 14 | 0 |
| paymentApp | 27 | 14 | 2 | 11 |
| suspectUpi | 27 | 25 | 2 | 0 |
| utr | 25 | 25 | 0 | 0 |
| suspectPhone | 24 | 22 | 2 | 0 |
| bank | 23 | 21 | 2 | 0 |
| suspectAccount | 3 | 3 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 18 | 11 | 2 | 5 |
| en | 25 | 6 | 7 | 12 |
| bn | 75 | 71 | 4 | 0 |
| ta | 75 | 57 | 8 | 10 |
| te | 46 | 34 | 2 | 10 |
| mr | 41 | 30 | 6 | 5 |
| kn | 65 | 56 | 9 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | kn | asr | fn | 21 | kn-b02 kn-b03 kn-b04 kn-b10 kn-b11 kn-b01 kn-b05 |
| 2 | amount | ta | asr | fn | 19 | ta-b04 ta-b05 ta-b10 ta-b11 ta-b01 ta-b02 ta-b03 |
| 3 | amount | bn | asr | fn | 14 | bn-b01 bn-b02 bn-b04 bn-b05 bn-b11 |
| 4 | amount | bn | asr | wrong | 11 | bn-b03 bn-b04 bn-b10 bn-b05 |
| 5 | scamType | bn | asr | fn | 9 | bn-b01 bn-b03 bn-b11 |
| 6 | scamType | ta | asr | fn | 9 | ta-b01 ta-b02 ta-b03 ta-b04 |
| 7 | paymentApp | bn | asr | fn | 7 | bn-b02 bn-b11 |
| 8 | time | te | asr | fn | 7 | te-b06 te-b02 |
| 9 | amount | mr | asr | fn | 7 | mr-b11 mr-b02 mr-b03 mr-b01 |
| 10 | scamType | kn | asr | fn | 7 | kn-b01 kn-b03 |
| 11 | bank | kn | asr | fn | 7 | kn-b01 kn-b09 |
| 12 | paymentApp | en | extractor | wrong | 6 | en-b10 |
| 13 | scamType | en | extractor | fn | 6 | en-b11 |
| 14 | scamType | te | asr | fn | 6 | te-b03 te-b02 te-b04 |
| 15 | time | mr | asr | wrong | 6 | mr-b03 mr-b06 |
| 16 | scamType | hi | extractor | wrong | 5 | hi-b03 |
| 17 | amount | hi | asr | wrong | 5 | hi-b06 |
| 18 | amount | en | extractor_form | fn | 5 | en-b11 en-b05 |
| 19 | time | bn | asr | fn | 5 | bn-b03 bn-b01 bn-b06 |
| 20 | time | bn | asr | wrong | 5 | bn-b03 bn-b06 |
| 21 | bank | bn | asr | fn | 5 | bn-b09 bn-b01 |
| 22 | suspectUpi | bn | asr | fn | 5 | bn-b12 |
| 23 | utr | ta | asr | fn | 5 | ta-b07 |
| 24 | suspectPhone | ta | asr | fn | 5 | ta-b08 |
| 25 | bank | ta | asr | fn | 5 | ta-b09 ta-b01 |
| 26 | scamType | ta | extractor | fn | 5 | ta-b11 |
| 27 | paymentApp | ta | extractor | fn | 5 | ta-b11 |
| 28 | suspectUpi | ta | asr | wrong | 5 | ta-b12 |
| 29 | utr | te | asr | fn | 5 | te-b07 |
| 30 | amount | te | extractor | wrong | 5 | te-b10 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. bn-b03 (story) - fails 100% of 5 runs

- Reference: গতকাল সন্ধ্যা সাতটায় একটা কিউআর কোড স্ক্যান করলাম, দুই হাজার পাঁচশো টাকা কেটে গেল
- Transcript (`bn-b03__Bashkar__r0__bn`): গতকল শুন্ধা শাকটায় এটা কি঵র করড সকেন করলাম ১ুই হাজার পাচ্শো টাকা কিটে গালো.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 1500 | 2500 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: স্ক্যান |

### 2. ta-b11 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: தப்பா பணம் அனுப்பிட்டேன்னு ஒருத்தர் சொன்னார், நான் ஜிபே மூலமா எண்ணூறு ரூபாய் திருப்பி அனுப்பினேன்
- Transcript (`ta-b11__Pallavi__r0__ta`): கப்பா படம் அனுப்பிட்டேன்னு ஒருத்தர் சொன்னார் நான் ஜிபே மோலமா என்னுறு ருபாய் திருப்பி அனுப்பினேன்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 800 | - | 800 | **asr**: value not in the transcript |
| scamType | fn | wrong_transfer | - | - | **extractor**: fails on the reference text too (fn) |
| paymentApp | fn | Google Pay | - | - | **extractor**: fails on the reference text too (fn) |

### 3. kn-b03 (story) - fails 100% of 5 runs

- Reference: ನಿನ್ನೆ ರಾತ್ರಿ ಒಂಬತ್ತು ಗಂಟೆಗೆ ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದೆ, ಫೋನ್‌ಪೇ ನಲ್ಲಿ ಎರಡು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು
- Transcript (`kn-b03__Gagan__r0__kn`): ನಿನ್ನೆಯ ರಾತ್ರಿ ಉಂಬತ್ತು ಗಂಟೆಗೆ ಕ್ಯುವಾರ ಕೋಡ್ ಸ್ಕಾನ್ ಮಾಡಿದೆ ಫೋನ್ ಪೇನಲ್ಲಿ ಎಡು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2000 | - | 2000 | **asr**: value not in the transcript |
| time | wrong | -1d 21:00 (900 min ago) | -1d 22:00 (840 min ago) | -1d 21:00 (900 min ago) | **extractor_form**: near-spelling variant of: ಒಂಬತ್ತು |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 4. bn-b01 (story) - fails 100% of 5 runs

- Reference: কেউ ফোন করে বলল কেওয়াইসি আপডেট করতে হবে, তারপর আমার এসবিআই অ্যাকাউন্ট থেকে সাত হাজার টাকা কেটে নিল, আধ ঘণ্টা আগে
- Transcript (`bn-b01__Bashkar__r0__bn`): কেউ ফোন করে বোলো কে য়াইসি আপ্ডেট কর্তে হোভে। তার পওর আমার এস্ডিাই একাউন্ট থেকে শাথ হজার তাকা কেটে নিলো আদ ঘনতা আগে।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 7000 | - | 7000 | **asr**: value not in the transcript |
| scamType | fn | fake_kyc | - | fake_kyc | **extractor_form**: near-spelling variant of: কেওয়াইসি |
| bank | wrong | State Bank of India (SBI) | Canara Bank | State Bank of India (SBI) | **asr**: ASR lost/changed: এসবিআই |

### 5. en-b11 (story) - fails 100% of 6 runs, also fails on reference text

- Reference: A guy on Instagram threatened to leak my photos, I paid him 3000 on Google Pay at 11 last night
- Transcript (`en-b11__Neerja__r0__en`): A guy on Instagram threatened to leak my photos. I paid him $3,000 on Google Pay at 11 last night.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 3000 | - | 3000 | **extractor_form**: value is in the transcript but not parsed |
| scamType | fn | sextortion | - | - | **extractor**: fails on the reference text too (fn) |

### 6. ta-b01 (story) - fails 100% of 5 runs

- Reference: யாரோ போன் பண்ணி கேஒய்சி அப்டேட் பண்ணணும்னு சொன்னாங்க, என் இந்தியன் பேங்க் அக்கவுண்ட்ல இருந்து பத்தாயிரம் ரூபாய் போச்சு
- Transcript (`ta-b01__Pallavi__r0__ta`): யாரோ போன் பண்ணி கேவிச்சி அப்தேட் பண்ணனும்னு சொன்னாங்க, என் இந்தியன் பேங்க அக்கவோன்ல இறுந்து பத்தாயிரம் ருபாய் போச்சு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: கேஒய்சி |

### 7. mr-b02 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: चुकून ओटीपी सांगितला, पंचवीस हजार रुपये गेले, अर्ध्या तासापूर्वी
- Transcript (`mr-b02__Aarohi__r0__mr`): चुकून OTP संगितला 25,000 रुपे गेले अर्ध्या तासा पूर्वी

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | wrong | otp_shared | wrong_transfer | wrong_transfer | **extractor**: fails on the reference text too (wrong) |

### 8. ta-b04 (story) - fails 100% of 5 runs

- Reference: டெலிகிராம்ல டாஸ்க் பண்ணா லாபம்னு சொல்லி ஐம்பதாயிரம் ரூபாய் வாங்கிட்டாங்க
- Transcript (`ta-b04__Pallavi__r0__ta`): डेलिक रामलेट दास्क पढणना लाबमन सुली आइंबदाहरम रुबाई वांगितांग है

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 50000 | - | 50000 | **asr**: value not in the transcript |

### 9. ta-b07 (answer:utr) - fails 100% of 5 runs

- Reference: 7 7 1 2 3 4 5 6 8 9 0 1
- Transcript (`ta-b07__Pallavi__r0__ta`): ஏறி ஏறு ஒன்று இரண்டு மோன்று நாங்கு ஐந்து ஆரி எட்டு ஒன்பது பூஜியம் ஒன்று

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 771234568901 | - | 771234568901 | **asr**: value not in the transcript |

### 10. en-b10 (correction) - fails 100% of 6 runs, also fails on reference text

- Reference: sorry, not Google Pay, it was Paytm
- Transcript (`en-b10__Neerja__r0__en`): Sorry, not Google Pay, it was Paytm.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | wrong | Paytm | Google Pay | Google Pay | **extractor**: fails on the reference text too (wrong) |

### 11. ta-b08 (answer:suspect) - fails 100% of 5 runs

- Reference: அவன் நம்பர் 9 4 4 3 2 1 0 9 8 7
- Transcript (`ta-b08__Pallavi__r0__ta`): அவன் நம்பர் 144-4-3-21 பூஜியம் 977.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9443210987 | - | 9443210987 | **asr**: value not in the transcript |

### 12. mr-b07 (answer:utr) - fails 100% of 5 runs

- Reference: 6 5 4 3 2 1 0 9 8 7 6 5
- Transcript (`mr-b07__Aarohi__r0__mr`): सहापाच 43210987 सहापाच

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 654321098765 | - | 654321098765 | **asr**: value not in the transcript |

### 13. hi-b03 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: गलती से ओटीपी बता दिया, कोटक बैंक से पच्चीस हज़ार निकल गए, अभी पंद्रह मिनट हुए
- Transcript (`hi-b03__Madhur__r0__hi`): गलती से OTP बता दिया, कोटक बैंक से 25,000 निकल गए, अभी 15 मिनट हुए.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | wrong | otp_shared | wrong_transfer | wrong_transfer | **extractor**: fails on the reference text too (wrong) |

### 14. hi-b06 (answer:amount) - fails 100% of 5 runs

- Reference: लगभग अठारह सौ रुपये
- Transcript (`hi-b06__Madhur__r0__hi`): लगभग अठारा सौ रुपए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 1800 | 100 | 1800 | **asr**: value not in the transcript |

### 15. bn-b08 (answer:suspect) - fails 100% of 5 runs

- Reference: নম্বরটা হল ৯ ৮ ৩ ০ ১ ২ ৪ ৫ ৬ ৭
- Transcript (`bn-b08__Bashkar__r0__bn`): নম্বর তা হলো নয় 830124567

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9830124567 | - | 9830124567 | **extractor_form**: value is in the transcript but not parsed |

### 16. bn-b12 (answer:suspect) - fails 100% of 5 runs

- Reference: ইউপিআই আইডি ছিল lucky dot win at ybl
- Transcript (`bn-b12__Bashkar__r0__bn`): UPAI ID Chilolaki.Wanadiebo

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | lucky.win@ybl | - | lucky.win@ybl | **asr**: value not in the transcript |

### 17. ta-b05 (answer:amount) - fails 100% of 5 runs

- Reference: ஆயிரத்து ஐநூறு ரூபாய்
- Transcript (`ta-b05__Pallavi__r0__ta`): ஐரத்து ஐனோரு ரூபாயி

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 1500 | - | 1500 | **asr**: value not in the transcript |

### 18. te-b07 (answer:utr) - fails 100% of 5 runs

- Reference: 3 2 1 4 5 6 7 8 9 0 1 2
- Transcript (`te-b07__Mohan__r0__te`): 3, 2, 1 గంటా, 4, 5, 6, 7, 9, గంటా, 2.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 321456789012 | - | 321456789012 | **asr**: value not in the transcript |

### 19. te-b10 (correction) - fails 100% of 5 runs, also fails on reference text

- Reference: కాదు, నాలుగు వేలు కాదు, నాలుగు వేల ఐదు వందలు
- Transcript (`te-b10__Mohan__r0__te`): కాదు, నాలుగు వేలు కాదు, నాలుగు వేల అయిదు వందలు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4500 | 1000 | 1000 | **extractor**: fails on the reference text too (wrong); ASR also lost the value |

### 20. te-b11 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: పొరపాటున డబ్బులు పంపానని ఒకతను అడిగాడు, నేను గూగుల్ పే లో తొమ్మిది వందలు తిరిగి పంపాను
- Transcript (`te-b11__Mohan__r0__te`): పొరపాటున డబ్బులు పంపానని ఒకతను అడిగాడు. నేను గూగుల్ పేలో తుమ్మిది వందలు తిరిగి పంపాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 900 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |

### 21. te-b12 (answer:suspect) - fails 100% of 5 runs

- Reference: యూపీఐ ఐడీ gift dot card at ybl
- Transcript (`te-b12__Mohan__r0__te`): upaidgift.card at YBL

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | wrong | gift.card@ybl | upaidgift.card@ybl | gift.card@ybl | **extractor_form**: value is in the transcript but not parsed |

### 22. mr-b12 (answer:suspect) - fails 100% of 5 runs

- Reference: यूपीआय आयडी help dot desk at ybl
- Transcript (`mr-b12__Aarohi__r0__mr`): UPI ID Help DOT Desk Act

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | help.desk@ybl | - | help.desk@ybl | **asr**: value not in the transcript |

### 23. kn-b07 (answer:utr) - fails 100% of 5 runs

- Reference: 8 1 2 3 4 5 6 7 9 0 1 2
- Transcript (`kn-b07__Gagan__r0__kn`): 81234567919

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 812345679012 | - | 812345679012 | **asr**: value not in the transcript |

### 24. kn-b09 (answer:bank) - fails 100% of 5 runs

- Reference: ಐಸಿಐಸಿಐ ಬ್ಯಾಂಕ್
- Transcript (`kn-b09__Gagan__r0__kn`): ACCA Bank

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ಐಸಿಐಸಿಐ |

### 25. kn-b10 (correction) - fails 100% of 5 runs

- Reference: ಇಲ್ಲ, ಮೂರು ಸಾವಿರ ಅಲ್ಲ, ಮೂವತ್ತು ಸಾವಿರ
- Transcript (`kn-b10__Gagan__r0__kn`): Illa, mur savira alla, muotto savira.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 30000 | - | 30000 | **asr**: value not in the transcript |

### 26. kn-b12 (answer:suspect) - fails 100% of 5 runs

- Reference: ಯುಪಿಐ ಐಡಿ bonus dot pay at ybl
- Transcript (`kn-b12__Gagan__r0__kn`): upaidbonus.payitable

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | bonus.pay@ybl | - | bonus.pay@ybl | **asr**: value not in the transcript |

### 27. bn-b02 (story) - fails 80% of 5 runs

- Reference: ওটিপি বলে দিয়েছিলাম, পনেরো হাজার টাকা চলে গেছে, ফোনপে থেকে
- Transcript (`bn-b02__Bashkar__r0__bn`): ওটিপি বলে দিয়ছিলাম পনেরো হাজাকা চোলে গেছে ফোন তেথেকে

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: ফোনপে |

### 28. kn-b02 (story) - fails 80% of 5 runs

- Reference: ಒಟಿಪಿ ಹೇಳಿಬಿಟ್ಟೆ, ಇಪ್ಪತ್ತು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು, ಅರ್ಧ ಗಂಟೆ ಹಿಂದೆ
- Transcript (`kn-b02__Gagan__r0__kn`): ಒಟಿಪಿ ಹೇಳಿಬಿಟ್ಟೆ ಇಪ್ಪತ್ತು ಸಾವಿರ ರೂಪಾಯ ಹೋಯಿತು ಅರ್ಧಗಂಟೆ ಹಿಂದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:30 (30 min ago) | - | today 11:30 (30 min ago) | **extractor_form**: key words survive (ಅರ್ಧ ಗಂಟೆ ಹಿಂದೆ) but the extractor fails |

### 29. mr-b03 (story) - fails 80% of 5 runs

- Reference: काल रात्री आठ वाजता क्यूआर कोड स्कॅन केला, फोनपे वरून तीन हजार रुपये कापले गेले
- Transcript (`mr-b03__Aarohi__r0__mr`): काल रात्री आठ वाज्ता क्यू आर कोड स्कान केला फोन पे वरून तीन हजार रुपे कापले गेले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | qr_scan | - | qr_scan | **extractor_form**: near-spelling variant of: स्कॅन |

### 30. bn-b11 (story) - fails 80% of 5 runs

- Reference: ভুল করে টাকা পাঠিয়েছি বলে একজন ফেরত চাইল, আমি গুগল পে থেকে বারোশো টাকা দিয়ে দিলাম
- Transcript (`bn-b11__Bashkar__r0__bn`): ভুল করে তাকা পাঠিয়ে ছি বলে এক জন ফেরত চাইল আমি গুগোল পেথেকে বারোশো তাকা দিয়ে দিলাম।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: গুগল |

### 31. mr-b11 (story) - fails 80% of 5 runs

- Reference: चुकून पैसे पाठवले म्हणून एकाने परत मागितले, मी गुगल पे ने सातशे रुपये परत पाठवले
- Transcript (`mr-b11__Manohar__r0__mr`): चुकून पईसे पाठवले महणून एकाने पर्त मागितले, मी गुगल पेने साच्छे रुपय पर्त पाठवले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 700 | - | 700 | **asr**: value not in the transcript |

### 32. te-b03 (story) - fails 80% of 5 runs

- Reference: నిన్న సాయంత్రం ఆరు గంటలకు క్యూఆర్ కోడ్ స్కాన్ చేశాను, ఫోన్‌పే లో రెండు వేల రూపాయలు పోయాయి
- Transcript (`te-b03__Shruti__r0__te`): నిన్న సాయంద్రం ఆరు గంటలకు కుయుార్ కోడ్ స్కాం జేసాను ఫోన్ పేలో రిండు వేలరూపాయలు పోయాఈ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: స్కాన్ |

### 33. te-b06 (answer:time) - fails 80% of 5 runs

- Reference: ఈ రోజు ఉదయం తొమ్మిది గంటలకు
- Transcript (`te-b06__Shruti__r0__te`): ఇ రోజు ఉదేయం కమ్మిది గండలకు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 09:00 (180 min ago) | - | today 09:00 (180 min ago) | **asr**: ASR lost/changed: తొమ్మిది |

### 34. hi-b02 (story) - fails 60% of 5 runs

- Reference: किसी ने बोला आपकी लॉटरी लगी है, फीस भेजो, मैंने पेटीएम से 2,999 रुपये भेज दिए कल रात नौ बजे
- Transcript (`hi-b02__Swara__r0__babble15__hi`): किसी ने बोला आपकी लौटरी लगी है फीस भेजो मैंने पेटीम से 2,999 रुपए भेज दिये कल रात 9 बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: near-spelling variant of: पेटीएम |

### 35. mr-b06 (answer:time) - fails 60% of 5 runs

- Reference: आज सकाळी अकरा वाजता
- Transcript (`mr-b06__Manohar__r0__mr`): आज सकारी अक्रा वास्ता

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 11:00 (60 min ago) | today 12:00 (0 min ago) | today 11:00 (60 min ago) | **asr**: ASR lost/changed: अकरा वाजता |

### 36. hi-b04 (story) - fails 40% of 5 runs

- Reference: एक लड़का बोला गलती से आपको पैसे भेज दिए, वापस करो, मैंने गूगल पे से सात सौ पचास रुपये लौटा दिए, सुबह दस बजे
- Transcript (`hi-b04__Madhur__r0__hi`): एक लड़का बोला गलती से आपको पैसे भेज दिये, वापस करो, मैंने गूगल पेसे साथ सौपचास रुपए लोटा दिये, सुभध दस बजे.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 750 | - | 750 | **asr**: value not in the transcript |

### 37. en-b08 (answer:suspect) - fails 33% of 6 runs

- Reference: the UPI ID was refund dot help at okaxis
- Transcript (`en-b08__Prabhat__r0__babble15__en`): The UPI ID was refund.help at Ocaxis.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fp | - | wrong_transfer | - | **extractor_form**: spurious value from a near-correct transcript |
| suspectUpi | fn | refund.help@okaxis | - | refund.help@okaxis | **asr**: value not in the transcript |

### 38. en-b02 (story) - fails 33% of 6 runs

- Reference: I scanned a QR code to receive money for my old sofa and instead 9,500 got debited from my PhonePe
- Transcript (`en-b02__Prabhat__r0__babble15__en`): I scanned a QR code to receive money for my old sofa and instead 9,500 got debited from my phone page.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 39. hi-b07 (answer:time) - fails 20% of 5 runs

- Reference: आज सुबह साढ़े आठ बजे
- Transcript (`hi-b07__Madhur__r0__pink5__hi`): आज सुबह साधे आज बजे।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 08:30 (210 min ago) | today 09:00 (180 min ago) | today 08:30 (210 min ago) | **asr**: ASR lost/changed: साढ़े आठ |

### 40. hi-b09 (answer:suspect) - fails 20% of 5 runs

- Reference: उसका नंबर नौ आठ एक शून्य दो दो तीन चार पाँच छह
- Transcript (`hi-b09__Swara__r0__hi`): उसका नमबर 981022345 है

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 9810223456 | - | 9810223456 | **asr**: value not in the transcript |
