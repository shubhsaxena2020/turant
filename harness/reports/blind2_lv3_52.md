# Turant pipeline eval: blind2_lv3_52

Generated 2026-11-27T23:50:44.454Z. Extractor: `..\prototype\src\lib\extract.ts`. 42 cases, 174 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 42 | 97.6 | 97.6 | 98.6 | 98.6 | 98.6 | - | - |
| ASR clean, normal rate | 90 | 67.8 | 67.8 | 91.8 | 78.3 | 84.5 | 69.6 | 28.8 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 174 | 70.1 | 70.1 | 92.4 | 79.9 | 85.7 | 62.9 | 30.8 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 74.4% of clean runs and 76.4% of all runs fully correct. Per language (clean): hi 92%, en 89%, bn 83%, ta 42%, te 75%, mr 75%, kn 58%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 27 | 96.3 | 96.3 | 96.3 | 83.3 | 69.0 | 75.5 | 77.8 |
| time | 15 | 100.0 | 100.0 | 100.0 | 90.6 | 90.6 | 90.6 | 85.2 |
| scamType | 8 | 100.0 | 100.0 | 100.0 | 100.0 | 82.4 | 90.3 | 95.2 |
| bank | 13 | 100.0 | 100.0 | 100.0 | 100.0 | 81.5 | 89.8 | 94.0 |
| paymentApp | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 66.7 | 80.0 | 81.6 |
| utr | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| suspectUpi | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| suspectPhone | 1 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| suspectAccount | 0 | - | - | - | - | - | - | - |
| intent | 0 | - | - | - | - | - | - | - |
| **micro** | 73 | 98.6 | 98.6 | 98.6 | 91.8 | 78.3 | 84.5 | 85.7 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | 83.3 | - | 100.0 | 90.9 | 35.1 | 15.4 | 100.0 (n=2) |
| en | 83.3 | 72.2 | - | 90.9 | 86.2 | 24.1 | 10.6 | 100.0 (n=3) |
| bn | 100.0 | 75.0 | - | 100.0 | 88.9 | 72.4 | 48.7 | - (n=0) |
| ta | 100.0 | 41.7 | - | 100.0 | 74.3 | 43.2 | 13.0 | - (n=0) |
| te | 100.0 | 75.0 | - | 100.0 | 82.4 | 347.4 | 101.4 | - (n=0) |
| mr | 100.0 | 75.0 | - | 100.0 | 83.7 | 50.0 | 15.8 | - (n=0) |
| kn | 100.0 | 50.0 | - | 100.0 | 82.4 | 51.3 | 19.6 | - (n=0) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / 100.0 | 100.0 / 50.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 |  |  | 100.0 / 100.0 |  |
| en | 75.0 / 66.7 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 80.0 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 |  |  |
| bn | 100.0 / 93.3 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 85.7 | 100.0 / - |  |  |  |  |
| ta | 100.0 / 57.1 | 100.0 / 100.0 | 100.0 / - | 100.0 / 100.0 | 100.0 / 66.7 |  |  |  |  |
| te | 100.0 / 85.7 | 100.0 / 100.0 | 100.0 / 66.7 | 100.0 / 85.7 | 100.0 / - |  |  |  |  |
| mr | 100.0 / 66.7 | 100.0 / 83.3 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 100.0 |  |  |  |  |
| kn | 100.0 / 66.7 | 100.0 / 100.0 | 100.0 / 100.0 | 100.0 / 66.7 | 100.0 / 100.0 |  |  |  |  |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 174 | 70.1 | 85.7 | 62.9 | 30.8 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 174 | 70.1 | 85.7 | 62.9 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 6 | 83.3 | 88.9 | 77.6 | 51.3 |
| bn-IN-TanishaaNeural | 6 | 66.7 | 88.9 | 67.3 | 46.0 |
| en-IN-NeerjaExpressiveNeural | 6 | 66.7 | 85.7 | 24.1 | 8.7 |
| en-IN-NeerjaNeural | 6 | 66.7 | 81.8 | 25.3 | 11.3 |
| en-IN-PrabhatNeural | 6 | 83.3 | 90.9 | 23.0 | 11.9 |
| hi-IN-MadhurNeural | 6 | 83.3 | 90.9 | 35.1 | 15.8 |
| hi-IN-SwaraNeural | 6 | 83.3 | 90.9 | 35.1 | 15.0 |
| kn-IN-GaganNeural | 6 | 50.0 | 82.4 | 47.4 | 21.1 |
| kn-IN-SapnaNeural | 6 | 50.0 | 82.4 | 55.3 | 18.1 |
| mr-IN-AarohiNeural | 6 | 83.3 | 90.9 | 47.6 | 17.3 |
| mr-IN-ManoharNeural | 6 | 66.7 | 76.2 | 52.4 | 14.4 |
| ta-IN-PallaviNeural | 6 | 50.0 | 77.8 | 40.5 | 10.5 |
| ta-IN-ValluvarNeural | 6 | 33.3 | 70.6 | 45.9 | 15.4 |
| te-IN-MohanNeural | 6 | 83.3 | 94.7 | 71.8 | 58.1 |
| te-IN-ShrutiNeural | 6 | 66.7 | 66.7 | 623.1 | 144.7 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 174 | 70.1 | 85.7 | 62.9 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 30 | 100.0 | 50.0 | 87.0 |
| answer | 45 | 100.0 | 80.0 | 84.7 |
| correction | 15 | 85.7 | 66.7 | 69.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 61 | 47 (77%) | 9 (15%) | 5 (8%) | 0 |
| clean | 61 | 47 (77%) | 9 (15%) | 5 (8%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 33 | 25 | 3 | 5 |
| time | 10 | 8 | 2 | 0 |
| paymentApp | 9 | 5 | 4 | 0 |
| bank | 6 | 6 | 0 | 0 |
| scamType | 3 | 3 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 5 | 4 | 1 | 0 |
| en | 10 | 3 | 2 | 5 |
| bn | 6 | 3 | 3 | 0 |
| ta | 10 | 9 | 1 | 0 |
| te | 10 | 10 | 0 | 0 |
| mr | 10 | 9 | 1 | 0 |
| kn | 10 | 9 | 1 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | kn | asr | fn | 5 | kn-c01 kn-c02 |
| 2 | amount | en | extractor | wrong | 4 | en-c06 |
| 3 | amount | mr | asr | wrong | 4 | mr-c02 |
| 4 | amount | te | asr | fn | 4 | te-c01 te-c02 |
| 5 | time | hi | asr | wrong | 3 | hi-c03 |
| 6 | amount | mr | asr | fn | 3 | mr-c04 |
| 7 | paymentApp | bn | extractor_form | fn | 3 | bn-c02 |
| 8 | amount | ta | asr | fn | 3 | ta-c04 ta-c06 |
| 9 | paymentApp | te | asr | fn | 3 | te-c02 |
| 10 | bank | kn | asr | fn | 3 | kn-c05 |
| 11 | scamType | ta | asr | fn | 2 | ta-c01 |
| 12 | amount | ta | asr | wrong | 2 | ta-c04 ta-c06 |
| 13 | amount | en | extractor_form | fn | 2 | en-c02 |
| 14 | time | hi | extractor_form | wrong | 1 | hi-c03 |
| 15 | bank | en | asr | fn | 1 | en-c02 |
| 16 | amount | en | asr | wrong | 1 | en-c04 |
| 17 | time | mr | asr | wrong | 1 | mr-c02 |
| 18 | bank | bn | asr | fn | 1 | bn-c01 |
| 19 | amount | bn | asr | fn | 1 | bn-c02 |
| 20 | paymentApp | ta | asr | fn | 1 | ta-c02 |
| 21 | scamType | te | asr | fn | 1 | te-c01 |
| 22 | bank | te | asr | fn | 1 | te-c01 |
| 23 | amount | kn | extractor_form | fn | 1 | kn-c04 |
| 24 | amount | hi | asr | fn | 1 | hi-c04 |
| 25 | paymentApp | en | asr | fn | 1 | en-c01 |
| 26 | amount | en | extractor | fn | 1 | en-c06 |
| 27 | time | mr | asr | fn | 1 | mr-c03 |
| 28 | time | mr | extractor_form | fn | 1 | mr-c03 |
| 29 | time | bn | asr | wrong | 1 | bn-c02 |
| 30 | time | ta | asr | wrong | 1 | ta-c02 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. te-c02 (story) - fails 100% of 4 runs

- Reference: నిన్న మధ్యాహ్నం రెండు గంటలకు పేటీఎం ద్వారా నాలుగు వేల రూపాయలు పోయాయి
- Transcript (`te-c02__Mohan__r0__te`): ನಿನ್ನ ಮಧ್ಯಾನಂ 2 ಗಂಟಲಕು జಿಂದు జಾರಾ 4000 రೂಪಾಯಲు జಾರಾ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: పేటీఎం |

### 2. en-c06 (correction) - fails 100% of 5 runs, also fails on reference text

- Reference: no, the amount was 9,500 not 5,900
- Transcript (`en-c06__Neerja__r0__en`): No, the amount was 9,500 not 5,900.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 9500 | 5900 | 5900 | **extractor**: fails on the reference text too (wrong); value is in the transcript |

### 3. mr-c02 (story) - fails 100% of 4 runs

- Reference: काल दुपारी तीन वाजता फोनपे वरून चार हजार पाचशे रुपये गेले
- Transcript (`mr-c02__Aarohi__r0__mr`): काल दुपारी तीन वाजता फोन पे वरून चार हजार पाच्छे रुपे गेले

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4500 | 4000 | 4500 | **asr**: value not in the transcript |

### 4. hi-c03 (answer:time) - fails 100% of 4 runs

- Reference: परसों रात साढ़े दस बजे
- Transcript (`hi-c03__Madhur__r0__hi`): परसो रात साधे दस बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -2d 22:30 (2250 min ago) | -1d 22:30 (810 min ago) | -2d 22:30 (2250 min ago) | **asr**: ASR lost/changed: साढ़े |

### 5. kn-c02 (story) - fails 100% of 4 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ ಏಳು ಗಂಟೆಗೆ ಫೋನ್‌ಪೇ ಮೂಲಕ ಎರಡು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-c02__Gagan__r0__kn`): ನಿನ್ನೆ ಸಂಜಿ 7 ಗಂಟಗೆ ಫೋನ್ಪೇ ಮೂಲಕ ಎಡುಸಾವಿಲ ರೂಪಾಯಿ ಹೋಯಿತು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2000 | - | 2000 | **asr**: value not in the transcript |

### 6. bn-c02 (story) - fails 75% of 4 runs

- Reference: গতকাল সন্ধ্যা ছটায় ফোনপে দিয়ে দুই হাজার টাকা চলে গেছে
- Transcript (`bn-c02__Bashkar__r0__bn`): Gatokal শুন্ধা ছটায় ফুন পে দিয়ে দুই হাজাক তাকা চুলে গাছে

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2000 | - | 2000 | **asr**: value not in the transcript |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: near-spelling variant of: ফোনপে |

### 7. mr-c04 (answer:amount) - fails 75% of 4 runs

- Reference: पावणे दोन लाख
- Transcript (`mr-c04__Manohar__r0__mr`): पावने दोनलाख

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 175000 | - | 175000 | **asr**: value not in the transcript |

### 8. ta-c04 (answer:amount) - fails 75% of 4 runs

- Reference: ஒன்றரை லட்சம் ரூபாய்
- Transcript (`ta-c04__Pallavi__r0__ta`): ஒன்றரே லட்சம் ரூபாய்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |

### 9. kn-c05 (answer:bank) - fails 75% of 4 runs

- Reference: ಎಸ್‌ಬಿಐ ಬ್ಯಾಂಕ್
- Transcript (`kn-c05__Gagan__r0__kn`): ಇಸ್ಬಿಯಾ ಬಂಕ್

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: ಎಸ್‌ಬಿಐ |

### 10. en-c02 (story) - fails 60% of 5 runs

- Reference: A buyer on OLX sent me a QR code to receive payment, I scanned it and 18,000 was debited from my Kotak account yesterday at 4 pm
- Transcript (`en-c02__NeerjaExpressive__r0__en`): A buyer on OLX sent me a QR code to receive payment. I scanned it and 18,000 was debited from my Kotip account yesterday at 4pm.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | Kotak Mahindra Bank | - | Kotak Mahindra Bank | **asr**: ASR lost/changed: Kotak |

### 11. ta-c02 (story) - fails 50% of 4 runs

- Reference: நேற்று இரவு எட்டு மணிக்கு கூகுள் பே மூலம் மூவாயிரம் ரூபாய் போனது
- Transcript (`ta-c02__Valluvar__r0__ta`): நேற்று இரவு 8 மணிக்கு கூகுள்டே முளம் 3000 ரூபாய் போனது.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: பே |

### 12. mr-c03 (answer:time) - fails 50% of 4 runs

- Reference: दोन तासांपूर्वी
- Transcript (`mr-c03__RemyMultilingual__r0__mr`): दोन्ता साम्पूर्वी

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: तासांपूर्वी |

### 13. ta-c01 (story) - fails 50% of 4 runs

- Reference: ஒருவர் வங்கியிலிருந்து பேசுவதாகச் சொல்லி ஓடிபி கேட்டார், நான் சொன்னேன், என் இந்தியன் வங்கி கணக்கிலிருந்து ஆறாயிரம் ரூபாய் போய்விட்டது
- Transcript (`ta-c01__Pallavi__r0__ta`): ஒருவர் வங்கிலிருந்து பேசுவதாக சொல்லி ஓடிப்பி கேட்டார். நான் சொன்னேன் என் இந்தியன் வங்கி கணக்கிலிருந்து ஆராயிரம் ருபாய் போய் விட்டது.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: ஓடிபி |

### 14. ta-c06 (correction) - fails 50% of 4 runs

- Reference: தொகை தவறு, ஏழாயிரம் ரூபாய்
- Transcript (`ta-c06__Pallavi__r0__ta`): தொகை தவரு 1 ராயிரம் ரூபாய்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 7000 | 1 | 7000 | **asr**: value not in the transcript |

### 15. kn-c04 (answer:amount) - fails 50% of 4 runs

- Reference: ಒಂದು ಲಕ್ಷ ರೂಪಾಯಿ
- Transcript (`kn-c04__Gagan__r0__kn`): ಬೊಂದು ಲಕ್ಷ ರೂಪಾಯ್

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 100000 | - | 100000 | **extractor_form**: value is in the transcript but not parsed |

### 16. te-c01 (story) - fails 25% of 4 runs

- Reference: ఒకతను బ్యాంకు నుండి అని చెప్పి ఓటీపీ అడిగాడు, నేను చెప్పాను, నా ఐసీఐసీఐ ఖాతా నుండి పది వేల రూపాయలు పోయాయి
- Transcript (`te-c01__Shruti__r0__te`): 1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 10000 | - | 10000 | **asr**: value not in the transcript |
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: ఓటీపీ |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ఐసీఐసీఐ |

### 17. hi-c04 (answer:amount) - fails 25% of 4 runs

- Reference: सवा लाख रुपये
- Transcript (`hi-c04__ThalitaMultilingual__r0__hi`): सवा लाक रुपे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 125000 | - | 125000 | **asr**: value not in the transcript |

### 18. bn-c01 (story) - fails 25% of 4 runs

- Reference: একজন বলল আমার কেওয়াইসি আপডেট করতে হবে, না হলে অ্যাকাউন্ট বন্ধ হয়ে যাবে, তারপর আমার এসবিআই অ্যাকাউন্ট থেকে আট হাজার টাকা কেটে গেল
- Transcript (`bn-c01__Tanishaa__r0__bn`): 1. একজন বোল আমার KYC আপনেট করতে হবে, না হলে একাউন্ট বন্ধু হোয়ে জাবে, তারপর আমার HBI একাউন্ট থেকে 8,000 টাকা কেটে গালো.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: এসবিআই |

### 19. kn-c01 (story) - fails 25% of 4 runs

- Reference: ಒಬ್ಬರು ಬ್ಯಾಂಕಿನಿಂದ ಎಂದು ಹೇಳಿ ಓಟಿಪಿ ಕೇಳಿದರು, ನಾನು ಹೇಳಿದೆ, ನನ್ನ ಕೆನರಾ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದ ಎಂಟು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು
- Transcript (`kn-c01__Sapna__r0__kn`): ಒಬ್ಬರು ಬೈಂಕಿನಿಂದ ಎಂದು ಹೇಳಿ ಒಟಿಪಿ ಕೇಳಿದರು. ನಾನು ಹೇಳಿದೆ. ನನ್ನ ಕೆನರಾ ಬೈಂಕ್ ಕಾತೆಯಿಂದ ಎಂದು ಸಾವಿರ ರೂಪಾಯ್ ಹೋಯತು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | 8000 | **asr**: value not in the transcript |

### 20. en-c01 (story) - fails 20% of 5 runs

- Reference: Someone claiming to be from the electricity board said my power would be cut tonight, I paid 3,450 rupees through Paytm an hour ago
- Transcript (`en-c01__VivienneMultilingual__r0__en`): Someone claiming to be from the electricity board said my power would be cut tonight. I paid 3,450 rupees through paid him an hour ago.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: Paytm |

### 21. en-c04 (answer:amount) - fails 20% of 5 runs

- Reference: one lakh seventy five thousand
- Transcript (`en-c04__Neerja__r0__en`): 1 lap 75,000

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 175000 | 75000 | 175000 | **asr**: value not in the transcript |
