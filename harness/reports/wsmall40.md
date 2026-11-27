# Turant pipeline eval: wsmall40

Generated 2026-11-27T14:25:30.370Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 40 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 40 | 2.5 | 2.5 | 78.4 | 25.0 | 37.9 | 170.9 | 151.0 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 40 | 2.5 | 2.5 | 78.4 | 25.0 | 37.9 | 170.9 | 151.0 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 5.0% of clean runs and 5.0% of all runs fully correct. Per language (clean): hi -%, en -%, bn 0%, ta 20%, te 0%, mr -%, kn 0%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 50.0 | 8.3 | 14.3 | 14.3 |
| time | 113 | 100.0 | 100.0 | 100.0 | 55.6 | 20.8 | 30.3 | 30.3 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 15.0 | 26.1 | 26.1 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 100.0 | 57.1 | 72.7 | 72.7 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| utr | 21 | 100.0 | 100.0 | 100.0 | 50.0 | 25.0 | 33.3 | 33.3 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | 100.0 | 25.0 | 40.0 | 40.0 |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 78.4 | 25.0 | 37.9 | 37.9 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | 0.0 | - | 100.0 | 35.9 | 220.5 | 139.4 | 50.0 (n=2) |
| ta | 100.0 | 10.0 | - | 100.0 | 53.3 | 64.9 | 58.0 | 0.0 (n=2) |
| te | 100.0 | 0.0 | - | 100.0 | 37.8 | 168.9 | 152.0 | 0.0 (n=2) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | 0.0 | - | 100.0 | 18.8 | 226.8 | 271.6 | 0.0 (n=2) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / 18.2 | 100.0 / 0.0 | 100.0 / - | 100.0 / 83.3 | 100.0 / - | 100.0 / 100.0 | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / 30.8 | 100.0 / 60.0 | 100.0 / 57.1 | 100.0 / 72.7 | 100.0 / - | 100.0 / 0.0 | 100.0 / - | 100.0 / 100.0 | 100.0 / - |
| te | 100.0 / - | 100.0 / 25.0 | 100.0 / 33.3 | 100.0 / 83.3 | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / 28.6 | 100.0 / - | 100.0 / 44.4 | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 40 | 2.5 | 37.9 | 170.9 | 151.0 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 40 | 2.5 | 37.9 | 170.9 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 10 | 0.0 | 35.9 | 220.5 | 139.4 |
| kn-IN-GaganNeural | 10 | 0.0 | 18.8 | 226.8 | 271.6 |
| ta-IN-PallaviNeural | 10 | 10.0 | 53.3 | 64.9 | 58.0 |
| te-IN-MohanNeural | 10 | 0.0 | 37.8 | 168.9 | 152.0 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 40 | 2.5 | 37.9 | 170.9 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 32 | 100.0 | 0.0 | 37.7 |
| answer | 8 | 100.0 | 12.5 | 40.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 88 | 85 (97%) | 3 (3%) | 0 (0%) | 0 |
| clean | 88 | 85 (97%) | 3 (3%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 33 | 31 | 2 | 0 |
| time | 19 | 19 | 0 | 0 |
| scamType | 17 | 16 | 1 | 0 |
| bank | 12 | 12 | 0 | 0 |
| utr | 4 | 4 | 0 | 0 |
| suspectPhone | 3 | 3 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bn | 22 | 22 | 0 | 0 |
| ta | 18 | 15 | 3 | 0 |
| te | 22 | 22 | 0 | 0 |
| kn | 26 | 26 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | te | asr | fn | 9 | te-01 te-03 te-05 te-07 te-11 te-13 te-16 te-21 +1 |
| 2 | amount | kn | asr | fn | 9 | kn-01 kn-03 kn-05 kn-07 kn-11 kn-13 kn-16 kn-21 +1 |
| 3 | amount | bn | asr | fn | 7 | bn-03 bn-05 bn-07 bn-13 bn-16 bn-21 bn-31 |
| 4 | scamType | bn | asr | fn | 5 | bn-01 bn-03 bn-05 bn-07 bn-16 |
| 5 | time | kn | asr | fn | 5 | kn-01 kn-03 kn-07 kn-13 kn-16 |
| 6 | scamType | kn | asr | fn | 5 | kn-01 kn-03 kn-05 kn-07 kn-16 |
| 7 | bank | kn | asr | fn | 5 | kn-01 kn-03 kn-05 kn-16 kn-21 |
| 8 | time | bn | asr | fn | 4 | bn-03 bn-11 bn-13 bn-16 |
| 9 | time | te | asr | fn | 4 | te-01 te-07 te-13 te-16 |
| 10 | scamType | te | asr | fn | 4 | te-01 te-05 te-07 te-16 |
| 11 | bank | ta | asr | fn | 3 | ta-01 ta-03 ta-21 |
| 12 | amount | ta | asr | fn | 3 | ta-03 ta-11 ta-13 |
| 13 | time | bn | asr | wrong | 2 | bn-01 bn-07 |
| 14 | bank | bn | asr | fn | 2 | bn-16 bn-21 |
| 15 | time | ta | asr | fn | 2 | ta-01 ta-16 |
| 16 | scamType | ta | asr | fn | 2 | ta-03 ta-16 |
| 17 | amount | ta | extractor_form | fn | 2 | ta-05 ta-16 |
| 18 | amount | ta | asr | wrong | 2 | ta-07 ta-21 |
| 19 | bank | te | asr | fn | 2 | te-01 te-21 |
| 20 | amount | bn | asr | wrong | 1 | bn-11 |
| 21 | suspectPhone | bn | asr | fn | 1 | bn-33 |
| 22 | scamType | ta | extractor_form | fn | 1 | ta-07 |
| 23 | time | ta | asr | wrong | 1 | ta-11 |
| 24 | utr | ta | asr | fp | 1 | ta-21 |
| 25 | utr | ta | asr | fn | 1 | ta-31 |
| 26 | time | te | asr | wrong | 1 | te-03 |
| 27 | utr | te | asr | fn | 1 | te-31 |
| 28 | suspectPhone | te | asr | fn | 1 | te-33 |
| 29 | utr | kn | asr | fn | 1 | kn-31 |
| 30 | suspectPhone | kn | asr | fn | 1 | kn-33 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. bn-16 (story) - fails 100% of 1 runs

- Reference: আমার account থেকে 20,000 টাকা debit হয়ে গেছে, ICICI bank, এক ঘণ্টা আগে customer care এ ফোন করেছিলাম
- Transcript (`bn-16__Bashkar__r0__bn`): आमार खान्ते के 20 आजात्ताका देवेड हो एगे चे, SSE bank, अग गान्ता अगे कास्तमार केर एप फोन को रची लम.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: ঘণ্টা আগে |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 2. te-01 (story) - fails 100% of 1 runs

- Reference: నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు
- Transcript (`te-01__Mohan__r0__te`): आए स्भी आए खातान तुट आए वेल रूपायल पोयाए, पदी निमिशालक रित्व उकरुए वाय्सी अप्टेट चेए मने चप्तर.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: నిమిషాల క్రితం |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 3. kn-01 (story) - fails 100% of 1 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): अद्द निम्श्यगल लग, अब रूएक अप्ट्ट्वाडल रहाँ, अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद्द अद अद्द अद्द अद अद्द अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद द अद द अद

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: ನಿಮಿಷಗಳ ಹಿಂದೆ |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 4. kn-03 (story) - fails 100% of 1 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__Gagan__r0__kn`): अद्र अद्फ्स कातेंगेंद, येडु लक्षर उपाइ तेगेदरू.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: ಸಂಜೆ |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 5. kn-16 (story) - fails 100% of 1 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): नना अग्याएँट अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अद अ�

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: ಗಂಟೆ ಹಿಂದೆ |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 6. bn-03 (story) - fails 100% of 1 runs

- Reference: গতকাল সন্ধ্যা সাতটায় কাস্টমার কেয়ার থেকে ফোন এসেছিল, AnyDesk ইনস্টল করতে বলল, তারপর এইচডিএফসি অ্যাকাউন্ট থেকে দুই লাখ টাকা কেটে নিল
- Transcript (`bn-03__Bashkar__r0__bn`): Botokal shunda sapta ek kastmar ke ertek ek fone ishe chilo, ene desek instal kur tebolo, tarpor HDFC ek count te ke duy lakta kaketenilo.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 7. bn-07 (story) - fails 100% of 1 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__Bashkar__r0__bn`): अटे कि वर कोड पाट्खे बोल्लु स्क्यन कुरुन तकापडेन, स्क्यन कुर ते चार हाजर नाल्शु निलन भी तकाखे ते यालो, आज शोकाल सरे दोष्ता है.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:30 (90 min ago) | today 12:00 (0 min ago) | today 10:30 (90 min ago) | **asr**: ASR lost/changed: সাড়ে দশটায় |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: স্ক্যান |

### 8. ta-03 (story) - fails 100% of 1 runs

- Reference: நேத்து சாயங்காலம் 7 மணிக்கு கஸ்டமர் கேர்ல இருந்து கால் வந்தது, AnyDesk இன்ஸ்டால் பண்ண சொன்னாங்க, அப்புறம் HDFC அக்கவுண்ட்ல இருந்து இரண்டு லட்சம் ரூபாய் எடுத்துட்டாங்க
- Transcript (`ta-03__Pallavi__r0__ta`): நேது சாயங்காலம் 7 மணிக்கு கால வந்தது கால வந்தது, 'எனிடுஸ்' கின்ச்டால் பண்ணா சொன்னாங்க, அப்குறம் 'ஹடியாட்ஷ்' அக்கவன்லை இருந்து, இரண்டுலட்சம் ரூபாய் கெடுத்துக்கொண்டாங்க.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 9. ta-16 (story) - fails 100% of 1 runs

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__Pallavi__r0__ta`): என்னை இருந்து 20,000 ரப்பீத் டப்பிட் ஆயிடத்து, ICICI-Bank ஒரு மாணி நிறுத்தக்கு முன்னாடி காஸ்ட்டமாகக்கு கால் பாண்ணேன்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **extractor_form**: value is in the transcript but not parsed |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: நேரத்துக்கு |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |

### 10. ta-21 (story) - fails 100% of 1 runs

- Reference: கரண்ட் பில் மெசேஜ் வந்தது, லிங்க் கிளிக் பண்ணேன், 9999 ரூபாய் கட் ஆச்சு, ஸ்டேட் பேங்க்
- Transcript (`ta-21__Pallavi__r0__ta`): கரண்டுப்பில் மசேஜ் வந்தது, லிங்க் கேளிக் பண்ணேன் 10,000, 9,000, 990 ரூபாய் கட் ஆச்சு, 'ஸ்டேட் பேங்'.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 9999 | 990 | 9999 | **asr**: value not in the transcript |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: பேங்க் |
| utr | fp | - | 100009000990 | - | **asr**: spurious value from a mis-recognised transcript |

### 11. te-07 (story) - fails 100% of 1 runs

- Reference: ఒక QR కోడ్ పంపి స్కాన్ చేస్తే డబ్బులు వస్తాయన్నారు, స్కాన్ చేయగానే ₹4,999 పోయాయి, ఈరోజు ఉదయం 10 గంటలకు
- Transcript (`te-07__Mohan__r0__te`): अक व्र कोड पम्पी स्कान चेस टबलू वस्तायनारू स्कान चेगाने नालूगुगेला 2009-99 रूपायलू पोयाए इरोजू वूदेयम पदी गंतलकू

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 గంటలకు |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: స్కాన్ |

### 12. te-16 (story) - fails 100% of 1 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__Mohan__r0__te`): आअ अकाचाच्टन दी इरावाय वेलु रूपी जबे ताई पोयाए, ICICI bank, उक गन्तक्रितम कुस्तमर केर की काट चेसेन।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: గంట క్రితం |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |

### 13. kn-05 (story) - fails 100% of 1 runs

- Reference: ನನ್ನ ಖಾತೆಯಿಂದ ಐದು... ಇಲ್ಲ ಇಲ್ಲ, ಆರು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು, OTP ಹೇಳಿಬಿಟ್ಟೆ, ಕೆನರಾ ಬ್ಯಾಂಕ್
- Transcript (`kn-05__Gagan__r0__kn`): अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अद्यादा अदा अद्यादा अदा अद्यादा अदा अद्यादा अदा अद्यादा अद्यादा अदा अद्याद

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: OTP |
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: ಕೆನರಾ |

### 14. kn-07 (story) - fails 100% of 1 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__Gagan__r0__kn`): ಸಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿರಿಿರಿರಿರಿಿರಿಿರಿರಿರಿಿರಿರಿರಿರಿರಿರ

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 ಗಂಟೆಗೆ |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 15. bn-01 (story) - fails 100% of 1 runs

- Reference: আমার এসবিআই অ্যাকাউন্ট থেকে পাঁচ হাজার টাকা কেটে গেছে, দশ মিনিট আগে একজন KYC আপডেটের জন্য ফোন করেছিল
- Transcript (`bn-01__Bashkar__r0__bn`): Amar SBI-account teke 5,000 taka ketek yatse 10 minit age aek jon kaik update jon no phone kuratsilo.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 11:50 (10 min ago) | today 09:00 (180 min ago) | today 11:50 (10 min ago) | **asr**: ASR lost/changed: মিনিট আগে |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 16. bn-05 (story) - fails 100% of 1 runs

- Reference: আমার অ্যাকাউন্ট থেকে পাঁচ... না না, ছয় হাজার টাকা কেটেছে, ওটিপি বলে দিয়েছিলাম, পাঞ্জাব ন্যাশনাল ব্যাংক
- Transcript (`bn-05__Bashkar__r0__bn`): आमर अक्ण्त थे के पाच नाना च्वाय हाजार ताका के ते थे उटीपी बोले दे थी लम पन्जाब नाशनाल बंक

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: ওটিপি |

### 17. bn-11 (story) - fails 100% of 1 runs

- Reference: দেড় লাখ টাকা চলে গেছে, ব্যাংক অফ বরোদা অ্যাকাউন্ট, গতকাল রাত দশটায়
- Transcript (`bn-11__Bashkar__r0__bn`): Deed Lak taka chuleg etse bank of boroda account, botukal rak doshtay.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 150000 | 100000 | 150000 | **asr**: value not in the transcript |
| time | fn | -1d 22:00 (840 min ago) | - | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: রাত |

### 18. ta-01 (story) - fails 100% of 1 runs

- Reference: என் SBI கணக்கிலிருந்து 5000 ரூபாய் போய்விட்டது, 10 நிமிடங்களுக்கு முன்பு ஒருவர் KYC அப்டேட் செய்யச் சொன்னார்
- Transcript (`ta-01__Pallavi__r0__ta`): என் ச்பியாய் கணக்க்கிலிருந்து 5,000 ரூபாய் கோய்விட்டது, 10 நமினங்களக்கு முன்பு ஒருவர் கேவாய்சி அப்டேற்செய்ய செய்ய சொன்னார்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: நிமிடங்களுக்கு |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 19. ta-07 (story) - fails 100% of 1 runs

- Reference: ஒரு QR code அனுப்பி ஸ்கேன் பண்ணா பணம் வரும்னு சொன்னாங்க, ஸ்கேன் பண்ணதும் ₹4,999 போச்சு, இன்று காலை 10 மணிக்கு
- Transcript (`ta-07__Pallavi__r0__ta`): ஒரு கீர் ஓர் கோட் அனுப்பி ச்கேன் சென்னா பணம் பரும் என்று சொன்னாங்க, ச்கேன் சென்னதம் 4000, 900, 990 ரூபாய் போய்விட்டு, இன்று காலை 10 மணிக்கு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 4999 | 990 | 4999 | **asr**: value not in the transcript |
| scamType | fn | qr_scan | - | qr_scan | **extractor_form**: near-spelling variant of: ஸ்கேன் |

### 20. ta-11 (story) - fails 100% of 1 runs

- Reference: ஒன்றரை லட்சம் ரூபாய் போயிடுச்சு, பேங்க் ஆஃப் பரோடா அக்கவுண்ட், நேற்று இரவு 10 மணிக்கு
- Transcript (`ta-11__Pallavi__r0__ta`): ஒந்தரே லட்சம் ரூபாய் போயிட்டு, பெயங்க அப்பரோடா அக்கவுன் நேற்று 20 மணிக்கு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |
| time | wrong | -1d 22:00 (840 min ago) | -1d 20:00 (960 min ago) | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: இரவு |

### 21. te-03 (story) - fails 100% of 1 runs

- Reference: నిన్న సాయంత్రం 7 గంటలకు కస్టమర్ కేర్ నుండి కాల్ వచ్చింది, AnyDesk ఇన్‌స్టాల్ చేయమన్నారు, తర్వాత HDFC అకౌంట్ నుండి రెండు లక్షల రూపాయలు తీసేశారు
- Transcript (`te-03__Mohan__r0__te`): निन्न सायंत्रम एद गंतलको कस्टमर केर नूडी काल वच्छन्दी, अनी दिस्क अच्टाल चे एम आरो, तरवात हे ज्दीएफ्सी अक्व्ट नूडी रेंडू लक्षल रूपायलो तीसे सेरू.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: సాయంత్రం |

### 22. te-05 (story) - fails 100% of 1 runs

- Reference: నా అకౌంట్ నుండి ఐదు... కాదు కాదు, ఆరు వేల రూపాయలు కట్ అయ్యాయి, OTP చెప్పేశాను, కెనరా బ్యాంక్
- Transcript (`te-05__Mohan__r0__te`): अग्ड़ान्त न्दी आएदू खादू खादू खादू आरू वेलरूपायलू कटायाए अटीपी चपेसानू खेनरा बाव्क

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: OTP |

### 23. te-13 (story) - fails 100% of 1 runs

- Reference: నా 15000 రూపాయలు పోయాయి, యాక్సిస్ బ్యాంక్, 3 రోజుల క్రితం
- Transcript (`te-13__Mohan__r0__te`): आप दिहें उ वेलु रूपायल पोयाए याक्सिस बांक, मुड रोसलक रित्फम.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| time | fn | -3d 12:00 (4320 min ago) | - | -3d 12:00 (4320 min ago) | **asr**: ASR lost/changed: 3 రోజుల క్రితం |

### 24. kn-13 (story) - fails 100% of 1 runs

- Reference: ನನ್ನ 15000 ರೂಪಾಯಿ ಹೋಯಿತು, ಆಕ್ಸಿಸ್ ಬ್ಯಾಂಕ್, 3 ದಿನಗಳ ಹಿಂದೆ
- Transcript (`kn-13__Gagan__r0__kn`): नना वन्दु अईदू प्रिपल्सोने रूपाई होई तू अक्सिस बेंक, मुर दिनगल हिंदे.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| time | fn | -3d 12:00 (4320 min ago) | - | -3d 12:00 (4320 min ago) | **asr**: ASR lost/changed: 3 ದಿನಗಳ ಹಿಂದೆ |
