# Turant pipeline eval: blind3_lv3_final

Generated 2026-11-28T06:51:38.036Z. Extractor: `..\prototype\src\lib\extract.ts`. 42 cases, 174 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 42 | 95.2 | 95.2 | 98.7 | 97.4 | 98.1 | - | - |
| ASR clean, normal rate | 90 | 62.2 | 62.2 | 94.1 | 76.0 | 84.1 | 69.0 | 45.8 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 174 | 64.9 | 64.9 | 93.7 | 77.7 | 84.9 | 63.7 | 41.1 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 73.3% of clean runs and 78.7% of all runs fully correct. Per language (clean): hi 83%, en 78%, bn 67%, ta 67%, te 58%, mr 75%, kn 83%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 25 | 96.0 | 96.0 | 96.0 | 90.5 | 71.7 | 80.0 | 82.8 |
| time | 19 | 100.0 | 100.0 | 100.0 | 89.2 | 82.5 | 85.7 | 82.1 |
| scamType | 10 | 100.0 | 100.0 | 100.0 | 100.0 | 76.2 | 86.5 | 84.5 |
| bank | 15 | 100.0 | 93.3 | 96.6 | 100.0 | 87.5 | 93.3 | 94.9 |
| paymentApp | 6 | 100.0 | 100.0 | 100.0 | 100.0 | 61.5 | 76.2 | 78.0 |
| utr | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 66.7 | 80.0 | 88.9 |
| suspectUpi | 0 | - | - | - | - | - | - | - |
| suspectPhone | 2 | 100.0 | 100.0 | 100.0 | 100.0 | 40.0 | 57.1 | 80.0 |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 78 | 98.7 | 97.4 | 98.1 | 94.1 | 76.0 | 84.1 | 84.9 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | 66.7 | - | 100.0 | 90.0 | 42.6 | 23.2 | 100.0 (n=2) |
| en | 100.0 | 77.8 | - | 100.0 | 93.5 | 35.6 | 14.8 | 33.3 (n=6) |
| bn | 83.3 | 41.7 | - | 95.2 | 57.1 | 82.0 | 64.2 | - (n=0) |
| ta | 100.0 | 66.7 | - | 100.0 | 90.0 | 37.5 | 20.4 | - (n=0) |
| te | 83.3 | 41.7 | - | 90.9 | 77.8 | 269.1 | 194.7 | - (n=0) |
| mr | 100.0 | 66.7 | - | 100.0 | 85.1 | 57.4 | 30.0 | - (n=0) |
| kn | 100.0 | 66.7 | - | 100.0 | 85.7 | 43.8 | 14.2 | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 85.7 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / - |  |  | 100.0 / 100.0 |  |
| en | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 80.0 |  | 100.0 / - |  |
| bn | 100.0 / 90.9 | 100.0 / 36.4 | 100.0 / - | 80.0 / 66.7 | 100.0 / - |  |  |  |  |
| ta | 100.0 / 85.7 | 100.0 / 100.0 | 100.0 / 66.7 | 100.0 / 100.0 | 100.0 / 100.0 |  |  |  |  |
| te | 66.7 / 50.0 | 100.0 / 80.0 | 100.0 / 85.7 | 100.0 / 90.9 |  |  |  |  |  |
| mr | 100.0 / 75.0 | 100.0 / 83.3 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 66.7 |  |  |  |  |
| kn | 100.0 / 57.1 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 174 | 64.9 | 84.9 | 63.7 | 41.1 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 174 | 64.9 | 84.9 | 63.7 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 6 | 33.3 | 50.0 | 88.0 | 81.6 |
| bn-IN-TanishaaNeural | 6 | 50.0 | 63.2 | 76.0 | 46.9 |
| en-IN-NeerjaExpressiveNeural | 6 | 83.3 | 95.2 | 36.4 | 14.7 |
| en-IN-NeerjaNeural | 6 | 66.7 | 90.0 | 36.4 | 15.0 |
| en-IN-PrabhatNeural | 6 | 83.3 | 95.2 | 34.1 | 14.7 |
| hi-IN-MadhurNeural | 6 | 66.7 | 90.0 | 43.2 | 23.5 |
| hi-IN-SwaraNeural | 6 | 66.7 | 90.0 | 42.0 | 22.8 |
| kn-IN-GaganNeural | 6 | 50.0 | 76.2 | 43.8 | 15.8 |
| kn-IN-SapnaNeural | 6 | 83.3 | 95.2 | 43.8 | 12.7 |
| mr-IN-AarohiNeural | 6 | 66.7 | 87.0 | 61.1 | 32.2 |
| mr-IN-ManoharNeural | 6 | 66.7 | 83.3 | 53.7 | 27.8 |
| ta-IN-PallaviNeural | 6 | 66.7 | 90.0 | 37.5 | 19.9 |
| ta-IN-ValluvarNeural | 6 | 66.7 | 90.0 | 37.5 | 20.8 |
| te-IN-MohanNeural | 6 | 33.3 | 70.6 | 274.5 | 188.3 |
| te-IN-ShrutiNeural | 6 | 50.0 | 84.2 | 263.8 | 201.2 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 174 | 64.9 | 84.9 | 63.7 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 30 | 100.0 | 53.3 | 88.3 |
| answer | 45 | 90.5 | 64.4 | 73.4 |
| correction | 15 | 100.0 | 73.3 | 84.6 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 72 | 45 (63%) | 21 (29%) | 6 (8%) | 4 |
| clean | 72 | 45 (63%) | 21 (29%) | 6 (8%) | 4 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 26 | 19 | 3 | 4 |
| time | 16 | 6 | 10 | 0 |
| scamType | 11 | 7 | 4 | 0 |
| paymentApp | 9 | 5 | 4 | 0 |
| bank | 6 | 4 | 0 | 2 |
| suspectPhone | 3 | 3 | 0 | 0 |
| utr | 1 | 1 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 7 | 3 | 4 | 0 |
| en | 4 | 4 | 0 | 0 |
| bn | 17 | 10 | 5 | 2 |
| ta | 6 | 6 | 0 | 0 |
| te | 16 | 12 | 0 | 4 |
| mr | 12 | 6 | 6 | 0 |
| kn | 10 | 4 | 6 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | time | mr | extractor_form | wrong | 5 | mr-d01 mr-d03 |
| 2 | paymentApp | hi | extractor_form | fn | 4 | hi-d02 |
| 3 | paymentApp | bn | asr | fn | 4 | bn-d02 |
| 4 | time | bn | extractor_form | wrong | 4 | bn-d03 |
| 5 | amount | ta | asr | fn | 4 | ta-d04 |
| 6 | amount | te | asr | fn | 4 | te-d01 |
| 7 | amount | te | extractor | fn | 4 | te-d04 |
| 8 | amount | hi | asr | fn | 3 | hi-d06 |
| 9 | suspectPhone | en | asr | fn | 3 | en-d05 |
| 10 | amount | mr | asr | wrong | 3 | mr-d04 mr-d02 |
| 11 | scamType | te | asr | fn | 3 | te-d01 |
| 12 | time | te | asr | fn | 3 | te-d03 |
| 13 | amount | kn | asr | wrong | 3 | kn-d02 kn-d04 |
| 14 | amount | kn | extractor_form | fn | 3 | kn-d06 |
| 15 | bank | bn | asr | fn | 2 | bn-d01 |
| 16 | bank | bn | extractor | fn | 2 | bn-d05 |
| 17 | scamType | ta | asr | fn | 2 | ta-d01 |
| 18 | bank | te | asr | fn | 2 | te-d02 |
| 19 | scamType | kn | extractor_form | fn | 2 | kn-d01 |
| 20 | utr | en | asr | fn | 1 | en-d03 |
| 21 | paymentApp | mr | asr | fn | 1 | mr-d02 |
| 22 | amount | bn | asr | fn | 1 | bn-d01 |
| 23 | time | bn | asr | fn | 1 | bn-d01 |
| 24 | scamType | bn | asr | fn | 1 | bn-d01 |
| 25 | time | bn | asr | wrong | 1 | bn-d01 |
| 26 | scamType | bn | extractor_form | fn | 1 | bn-d01 |
| 27 | scamType | mr | extractor_form | fn | 1 | mr-d02 |
| 28 | time | mr | asr | fn | 1 | mr-d02 |
| 29 | scamType | mr | asr | fn | 1 | mr-d02 |
| 30 | time | kn | extractor_form | wrong | 1 | kn-d01 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. te-d01 (story) - fails 100% of 4 runs

- Reference: నిన్న మధ్యాహ్నం మూడు గంటలకు టెలిగ్రామ్‌లో పార్ట్ టైమ్ జాబ్ అని చెప్పి నా దగ్గర నుంచి ముప్పై ఐదు వేల రూపాయలు కట్టించారు
- Transcript (`te-d01__Mohan__r0__te`): ನಿನ್ನ ಮಧ್ಯಾನ ಮೂಡು ಗಂಟಲಕು జಾಲಿ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జಾಬ జ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 35000 | - | 35000 | **asr**: value not in the transcript |
| scamType | fn | investment_task | - | investment_task | **asr**: ASR lost/changed: టెలిగ్రామ్‌లో |

### 2. hi-d02 (story) - fails 100% of 4 runs

- Reference: फ़ोनपे पर एक आदमी ने कहा गलती से पैसे भेज दिए, वापस करो, तो मैंने उसे चार हज़ार दो सौ रुपये भेज दिए, एक घंटा पहले
- Transcript (`hi-d02__Madhur__r0__hi`): फोन पेपर एक आदमी ने कहा गलती से पैसे भेज दिये, वापस करो, तो मैंने उसे 4,200 रुपए भेज दिये एक घंटा पहले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (फ़ोनपे) but the extractor fails |

### 3. bn-d02 (story) - fails 100% of 4 runs

- Reference: ফোনপে দিয়ে তিন হাজার পাঁচশো টাকা চলে গেছে, পনেরো মিনিট আগে
- Transcript (`bn-d02__Bashkar__r0__bn`): FON পে দিয়ে 3500 টাকা চুলে গাছে, 15 মিনিট আগে.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: ফোনপে |

### 4. bn-d03 (answer:time) - fails 100% of 4 runs

- Reference: আজ সকাল সাড়ে এগারোটায়
- Transcript (`bn-d03__Bashkar__r0__bn`): Aaj সকাল সাডে এগারো টাই

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 11:30 (30 min ago) | today 11:00 (60 min ago) | today 11:30 (30 min ago) | **extractor_form**: near-spelling variant of: এগারোটায় |

### 5. ta-d04 (answer:amount) - fails 100% of 4 runs

- Reference: எழுபத்தைந்தாயிரம் ரூபாய்
- Transcript (`ta-d04__Pallavi__r0__ta`): ஏழுபத்தேந்தாயிரம் ரூபாய்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 75000 | - | 75000 | **asr**: value not in the transcript |

### 6. te-d04 (answer:amount) - fails 100% of 4 runs, also fails on reference text

- Reference: లక్షా యాభై వేలు
- Transcript (`te-d04__Mohan__r0__te`): LAKSHYA YABHAI VELU

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 50000 | **extractor**: fails on the reference text too (wrong); ASR also lost the value |

### 7. mr-d02 (story) - fails 75% of 4 runs

- Reference: मी क्यूआर कोड स्कॅन केला आणि गुगल पे वरून सहा हजार चारशे रुपये कट झाले, अर्ध्या तासापूर्वी
- Transcript (`mr-d02__Aarohi__r0__mr`): मी QR कोड स्कैन केला आणी Google पे वरून 6,400 रुपे कट जाले अर्ध्या तासा पूर्वी

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: गुगल |

### 8. hi-d06 (correction) - fails 75% of 4 runs

- Reference: नहीं, रकम बारह हज़ार नहीं, इक्कीस हज़ार थी
- Transcript (`hi-d06__Madhur__r0__hi`): नहीं रकम बारा हजार नहीं इकीस हजार थी

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 21000 | - | 21000 | **asr**: value not in the transcript |

### 9. mr-d01 (story) - fails 75% of 4 runs

- Reference: काल रात्री साडेनऊ वाजता कोणीतरी केवायसी अपडेट करा म्हणून मेसेज पाठवला, आणि माझ्या युनियन बँकेच्या खात्यातून अठरा हजार रुपये गेले
- Transcript (`mr-d01__Manohar__r0__mr`): काल रातरी साडे नू वाजता कोनीतरी KYC अपडेट करा महनून मेसेज पाठवला आणी माझा युनियन बंकेचा खात्यातून 18,000 रुपये गेले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 21:30 (870 min ago) | -1d 22:00 (840 min ago) | -1d 21:30 (870 min ago) | **extractor_form**: near-spelling variant of: रात्री साडेनऊ |

### 10. te-d03 (answer:time) - fails 75% of 4 runs

- Reference: ఈరోజు ఉదయం పది గంటలకు
- Transcript (`te-d03__Mohan__r0__te`): ಇರೋಜೋ ಉದೈಯం జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ జಾನಿ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: పది గంటలకు |

### 11. kn-d06 (correction) - fails 75% of 4 runs

- Reference: ಇಲ್ಲ, ಮೊತ್ತ ಎರಡು ಸಾವಿರ ಅಲ್ಲ, ಐದು ಸಾವಿರ
- Transcript (`kn-d06__Gagan__r0__kn`): ಇಲ್ಲಾ ಮೊತ್ತ ಎಡು ಸಾವಿರ ಅಲ್ಲ ಐದು ಸಾವಿರ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **extractor_form**: value is in the transcript but not parsed |

### 12. en-d05 (answer:suspect) - fails 60% of 5 runs

- Reference: the number was 7 0 4 2 9 8 1 3 6 5
- Transcript (`en-d05__Neerja__r0__en`): The number was 704-981365.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7042981365 | - | 7042981365 | **asr**: value not in the transcript |

### 13. bn-d01 (story) - fails 50% of 4 runs

- Reference: গতকাল সন্ধ্যা সাতটায় একজন কাস্টমার কেয়ার থেকে ফোন করে একটা অ্যাপ ডাউনলোড করতে বলল, তারপর আমার এসবিআই অ্যাকাউন্ট থেকে বারো হাজার টাকা কেটে গেছে
- Transcript (`bn-d01__Bashkar__r0__bn`): ্রে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্দে ক্ষেন্

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12000 | - | 12000 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: কাস্টমার কেয়ার |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: এসবিআই |

### 14. kn-d01 (story) - fails 50% of 4 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ ಆರು ಗಂಟೆಗೆ ಯಾರೋ ಕೆವೈಸಿ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ ಇಲ್ಲದಿದ್ದರೆ ಖಾತೆ ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ ಅಂದರು, ನನ್ನ ಕೆನರಾ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದ ಒಂಬತ್ತು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-d01__RemyMultilingual__r0__kn`): ಮಿನ್ನೆ ಸಂಜೆ ಆರು ಗಂಟಗೆ ಯಾರೋಕೆ ವೈಸಿ ಅಪ್ಡೇಟ್ ಮಾಡಿ ಇಲ್ಲದಿದ್ದರೆ ಕಾತೆ ಬ್ಲಾಕ ಆಗುತ್ತದೆ ಅಂದರು. ನನ್ನ ಕೆನರಾ ಬ್ಯಾಂಕ್ ಕಾತೆ ಇಂದ ಒಂಬತ್ತು ಸಾವಿರ ರುಪಾಯಿ ಹೋಯಿತು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | fake_kyc | **extractor_form**: key words survive (ಕೆವೈಸಿ) but the extractor fails |

### 15. mr-d03 (answer:time) - fails 50% of 4 runs

- Reference: काल संध्याकाळी पाच वाजता
- Transcript (`mr-d03__RemyMultilingual__r0__mr`): काल संध्या काई पाचवाजता

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 17:00 (1140 min ago) | -1d 12:00 (1440 min ago) | -1d 17:00 (1140 min ago) | **extractor_form**: key words survive (पाच वाजता) but the extractor fails |

### 16. mr-d04 (answer:amount) - fails 50% of 4 runs

- Reference: एक लाख वीस हजार
- Transcript (`mr-d04__Aarohi__r0__mr`): एक लाख वीज हजार

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 120000 | 100000 | 120000 | **asr**: value not in the transcript |

### 17. bn-d05 (answer:bank) - fails 50% of 4 runs, also fails on reference text

- Reference: ইউকো ব্যাংক
- Transcript (`bn-d05__Bashkar__r0__bn`): Youko Bank

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | UCO Bank | - | - | **extractor**: fails on the reference text too (fn) |

### 18. ta-d01 (story) - fails 50% of 4 runs

- Reference: நேற்று இரவு ஒன்பது மணிக்கு ஒருவர் வங்கியிலிருந்து பேசுவதாக சொல்லி ஓடிபி கேட்டார், நான் சொன்னேன், என் இந்தியன் வங்கி கணக்கிலிருந்து பத்தாயிரம் ரூபாய் போய்விட்டது
- Transcript (`ta-d01__Pallavi__r0__ta`): நேற்றி இரவு 9 மணிக்கு ஒருவர் வங்கிலிருந்து பேசுவதாக சொல்லி ஓடிப்பி கேட்டார் நான் சொன்னேன் என் இந்தியன் வங்கி கணக்கிலிருந்து 10,000 ரூபாய் போய் விட்டது.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: ஓடிபி |

### 19. te-d02 (story) - fails 50% of 4 runs

- Reference: క్యూఆర్ కోడ్ స్కాన్ చేశాను, నా ఎస్బీఐ అకౌంట్ నుండి ఎనిమిది వేల రూపాయలు పోయాయి, ఇరవై నిమిషాల క్రితం
- Transcript (`te-d02__Mohan__r0__te`): QR కోడ్ స్కాన్ చేసాను, నా SBA అకాంట్ నుండి 8000 రూపాయలు పోయాయి, 20 నిమిషాల కృతం.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: ఎస్బీఐ |

### 20. kn-d02 (story) - fails 50% of 4 runs

- Reference: ಫೋನ್‌ಪೇ ಮೂಲಕ ಮೂರು ಸಾವಿರ ಎರಡು ನೂರು ರೂಪಾಯಿ ಕಳೆದುಕೊಂಡೆ, ಒಂದು ಗಂಟೆ ಹಿಂದೆ
- Transcript (`kn-d02__Gagan__r0__kn`): ಫೋನ್ ಪೇ ಮೂಲಕ ಮೂರು ಸಾವಿರ ಎಡು ನೂರು ರೂಪಾಯಿ ಕಳದುಕೊಂಡೆ ಒಂದು ಗಂಟೆ ಹಿಂದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3200 | 100 | 3200 | **asr**: value not in the transcript |

### 21. kn-d04 (answer:amount) - fails 50% of 4 runs

- Reference: ನಲವತ್ತು ಸಾವಿರ
- Transcript (`kn-d04__Gagan__r0__kn`): ನಲ್ವತ್ತು ಸಾವಿರ ನಲ್ವತ್ತು ಸಾವಿರ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 40000 | 80000 | 40000 | **asr**: value not in the transcript |

### 22. en-d03 (answer:utr) - fails 20% of 5 runs

- Reference: it's 6 1 8 2 0 4 5 7 3 9 1 6
- Transcript (`en-d03__Neerja__r0__en`): It's 618-04573916.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| utr | fn | 618204573916 | - | 618204573916 | **asr**: value not in the transcript |
