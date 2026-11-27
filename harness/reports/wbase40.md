# Turant pipeline eval: wbase40

Generated 2026-11-27T14:27:25.392Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 40 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 40 | 0.0 | 0.0 | 75.9 | 19.0 | 30.3 | 144.6 | 114.1 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 40 | 0.0 | 0.0 | 75.9 | 19.0 | 30.3 | 144.6 | 114.1 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 0.0% of clean runs and 0.0% of all runs fully correct. Per language (clean): hi -%, en -%, bn 0%, ta 0%, te 0%, mr -%, kn 0%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | 33.3 | 2.8 | 5.1 | 5.1 |
| time | 113 | 100.0 | 100.0 | 100.0 | 28.6 | 8.3 | 12.9 | 12.9 |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 15.0 | 26.1 | 26.1 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 100.0 | 57.1 | 72.7 | 72.7 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | - | - | - |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 75.9 | 19.0 | 30.3 | 30.3 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | 0.0 | - | 100.0 | 43.9 | 104.3 | 106.4 | 0.0 (n=2) |
| ta | 100.0 | 0.0 | - | 100.0 | 27.0 | 91.4 | 62.6 | 0.0 (n=2) |
| te | 100.0 | 0.0 | - | 100.0 | 33.3 | 225.2 | 123.3 | 0.0 (n=2) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | 0.0 | - | 100.0 | 12.9 | 160.4 | 173.6 | 0.0 (n=2) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / 18.2 | 100.0 / 22.2 | 100.0 / 33.3 | 100.0 / 92.3 | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / 0.0 | 100.0 / 22.2 | 100.0 / - | 100.0 / 72.7 | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / 0.0 | 100.0 / 57.1 | 100.0 / 72.7 | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / 44.4 | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 40 | 0.0 | 30.3 | 144.6 | 114.1 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 40 | 0.0 | 30.3 | 144.6 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 10 | 0.0 | 43.9 | 104.3 | 106.4 |
| kn-IN-GaganNeural | 10 | 0.0 | 12.9 | 160.4 | 173.6 |
| ta-IN-PallaviNeural | 10 | 0.0 | 27.0 | 91.4 | 62.6 |
| te-IN-MohanNeural | 10 | 0.0 | 33.3 | 225.2 | 123.3 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 40 | 0.0 | 30.3 | 144.6 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 32 | 100.0 | 0.0 | 33.1 |
| answer | 8 | 100.0 | 0.0 | - |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 94 | 92 (98%) | 2 (2%) | 0 (0%) | 0 |
| clean | 94 | 92 (98%) | 2 (2%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 35 | 35 | 0 | 0 |
| time | 22 | 21 | 1 | 0 |
| scamType | 17 | 16 | 1 | 0 |
| bank | 12 | 12 | 0 | 0 |
| utr | 4 | 4 | 0 | 0 |
| suspectPhone | 4 | 4 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| bn | 20 | 20 | 0 | 0 |
| ta | 24 | 23 | 1 | 0 |
| te | 23 | 22 | 1 | 0 |
| kn | 27 | 27 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | te | asr | fn | 9 | te-01 te-03 te-05 te-07 te-11 te-13 te-16 te-21 +1 |
| 2 | amount | kn | asr | fn | 9 | kn-01 kn-03 kn-05 kn-07 kn-11 kn-13 kn-16 kn-21 +1 |
| 3 | amount | ta | asr | fn | 8 | ta-01 ta-03 ta-05 ta-07 ta-11 ta-13 ta-21 ta-31 |
| 4 | amount | bn | asr | fn | 7 | bn-03 bn-05 bn-07 bn-11 bn-13 bn-16 bn-31 |
| 5 | time | kn | asr | fn | 6 | kn-01 kn-03 kn-07 kn-11 kn-13 kn-16 |
| 6 | scamType | ta | asr | fn | 5 | ta-01 ta-03 ta-05 ta-07 ta-16 |
| 7 | time | te | asr | fn | 5 | te-01 te-03 te-07 te-11 te-13 |
| 8 | scamType | kn | asr | fn | 5 | kn-01 kn-03 kn-05 kn-07 kn-16 |
| 9 | bank | kn | asr | fn | 5 | kn-01 kn-03 kn-05 kn-11 kn-16 |
| 10 | scamType | bn | asr | fn | 4 | bn-01 bn-03 bn-05 bn-16 |
| 11 | time | bn | asr | fn | 3 | bn-03 bn-07 bn-11 |
| 12 | time | ta | asr | fn | 3 | ta-01 ta-11 ta-16 |
| 13 | bank | ta | asr | fn | 3 | ta-05 ta-16 ta-21 |
| 14 | bank | te | asr | fn | 3 | te-05 te-11 te-13 |
| 15 | time | bn | asr | wrong | 2 | bn-13 bn-16 |
| 16 | scamType | te | asr | fn | 2 | te-01 te-16 |
| 17 | bank | bn | asr | fn | 1 | bn-16 |
| 18 | amount | bn | asr | wrong | 1 | bn-21 |
| 19 | utr | bn | asr | fn | 1 | bn-31 |
| 20 | suspectPhone | bn | asr | fn | 1 | bn-33 |
| 21 | time | ta | extractor_form | wrong | 1 | ta-03 |
| 22 | time | ta | asr | wrong | 1 | ta-07 |
| 23 | amount | ta | asr | wrong | 1 | ta-16 |
| 24 | utr | ta | asr | fn | 1 | ta-31 |
| 25 | suspectPhone | ta | asr | fn | 1 | ta-33 |
| 26 | scamType | te | extractor_form | fn | 1 | te-03 |
| 27 | time | te | asr | wrong | 1 | te-16 |
| 28 | utr | te | asr | fn | 1 | te-31 |
| 29 | suspectPhone | te | asr | fn | 1 | te-33 |
| 30 | utr | kn | asr | fn | 1 | kn-31 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. bn-16 (story) - fails 100% of 1 runs

- Reference: আমার account থেকে 20,000 টাকা debit হয়ে গেছে, ICICI bank, এক ঘণ্টা আগে customer care এ ফোন করেছিলাম
- Transcript (`bn-16__Bashkar__r0__bn`): Amaraqantke kuli hajataka debit huyagatze, SSBAK, Aghantarage Customarker ePhone kuratilam.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | wrong | today 11:00 (60 min ago) | today 09:00 (180 min ago) | today 11:00 (60 min ago) | **asr**: ASR lost/changed: ঘণ্টা আগে |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 2. ta-16 (story) - fails 100% of 1 runs

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__Pallavi__r0__ta`): என்னை இருந்து 20 20-25 Rs, IIT, ICI Bank, 1 மண்ணாடி காஷ்டமாக குக்காள் பாணேன்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 20000 | 25 | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: நேரத்துக்கு |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 3. kn-01 (story) - fails 100% of 1 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): ننسبی کتے ہیں دا آیدو صابر روپای کڑی تواگی دے ہاتھ دنیمیشر لہیں دے عبرو کک اپیٹ ماردلو ہیلیدر

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: ನಿಮಿಷಗಳ ಹಿಂದೆ |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 4. kn-03 (story) - fails 100% of 1 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__Gagan__r0__kn`): நீن்னை சن்ஷியழுக்குண்டுகே கஷ்டமர்க்க்கேன் இந்த கரை்பந்து, என்னிருஸ்க இனஷ்டால் மாடலும் எல்லிரு, நந்தரா கடிவ்ஸ்காத்தை இந்த எழுலக்ஷிருப்பாய்துக்குத்துக்கொள்ளரு

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: ಸಂಜೆ |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 5. kn-16 (story) - fails 100% of 1 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ننہاں کنت انہیں پتو سابیر روپیس دیبے دائیتو, اسے شبیک, ونگنٹے ہن دیگستمر کارگے کال ماریدے

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: ಗಂಟೆ ಹಿಂದೆ |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 6. bn-03 (story) - fails 100% of 1 runs

- Reference: গতকাল সন্ধ্যা সাতটায় কাস্টমার কেয়ার থেকে ফোন এসেছিল, AnyDesk ইনস্টল করতে বলল, তারপর এইচডিএফসি অ্যাকাউন্ট থেকে দুই লাখ টাকা কেটে নিল
- Transcript (`bn-03__Bashkar__r0__bn`): Boto kalshundar sakta e customar ke erhte ke phone eshe silo, NADSK install kurthe bolo, tar par HDFC account ke 2 laktaka ke tenilo.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 7. ta-01 (story) - fails 100% of 1 runs

- Reference: என் SBI கணக்கிலிருந்து 5000 ரூபாய் போய்விட்டது, 10 நிமிடங்களுக்கு முன்பு ஒருவர் KYC அப்டேட் செய்யச் சொன்னார்
- Transcript (`ta-01__Pallavi__r0__ta`): என SBI Connect்லிருந்து 5 ஏறம் RooBai Poiwettaது 10 நம்னங்களைக்கு முன்பு ஒருவர் KVIC UPDATE செய்யa சொன்னால்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: நிமிடங்களுக்கு |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 8. ta-03 (story) - fails 100% of 1 runs

- Reference: நேத்து சாயங்காலம் 7 மணிக்கு கஸ்டமர் கேர்ல இருந்து கால் வந்தது, AnyDesk இன்ஸ்டால் பண்ண சொன்னாங்க, அப்புறம் HDFC அக்கவுண்ட்ல இருந்து இரண்டு லட்சம் ரூபாய் எடுத்துட்டாங்க
- Transcript (`ta-03__Pallavi__r0__ta`): நேற்று சாயங்களாம் 28 மனைக்கு கத்தமர் கேட்டு இருந்து கால் வந்தது, என்னிடு சக் கண்ஸ்டால் சொன்னாங்கள் அப்புரம் HDFC அக்கவும்லு இருந்து இருந்து இருந்துல்லைத்தும் ருபாய் கடுத்துக்கொண்டாங்கள்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **extractor_form**: near-spelling variant of: சாயங்காலம் |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 9. ta-05 (story) - fails 100% of 1 runs

- Reference: என் அக்கவுண்ட்ல இருந்து ஐயாயிரம்... இல்ல இல்ல, ஆறாயிரம் ரூபாய் போச்சு, OTP சொல்லிட்டேன், கனரா பேங்க்
- Transcript (`ta-05__Pallavi__r0__ta`): என்றாக் கவன்றில் இருந்து அயரம் இல்லை இல்லை ராயரம் ரோபாய் போட்சு,ோட்டிப் பிச்சுளித்து தனராப்பேங்க

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: OTP |
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: கனரா |

### 10. ta-07 (story) - fails 100% of 1 runs

- Reference: ஒரு QR code அனுப்பி ஸ்கேன் பண்ணா பணம் வரும்னு சொன்னாங்க, ஸ்கேன் பண்ணதும் ₹4,999 போச்சு, இன்று காலை 10 மணிக்கு
- Transcript (`ta-07__Pallavi__r0__ta`): ஒரு கிவார் கோட அனுப்பிஷ்கேன் பண்ணா பணம் பரும்பு சொன்னாங்கள். சகேன் பண்ணதம் நான் காயரத்துல் தொடலாயரத்து தொன்னும் சொன்பது ருவாய் போதுக்கும் இந்த காலை பார்த்து மனைக்கும்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 09:00 (180 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 மணிக்கு |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ஸ்கேன் |

### 11. te-01 (story) - fails 100% of 1 runs

- Reference: నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు
- Transcript (`te-01__Mohan__r0__te`): Na SBI Khatannundi iDwalu Rupal Poyai, Padhi Nimisala kritam okarukyavai si update ceymani chappar.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: నిమిషాల క్రితం |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |

### 12. te-03 (story) - fails 100% of 1 runs

- Reference: నిన్న సాయంత్రం 7 గంటలకు కస్టమర్ కేర్ నుండి కాల్ వచ్చింది, AnyDesk ఇన్‌స్టాల్ చేయమన్నారు, తర్వాత HDFC అకౌంట్ నుండి రెండు లక్షల రూపాయలు తీసేశారు
- Transcript (`te-03__Mohan__r0__te`): NINASAINTRAM 8-KSTAMAR-KERNUNDI-CALL-WATCHINDI, any disk install ndr, TARVATHA HDFC Account Nundi, RENDULAXHAL RUPALO-TECESAR

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: సాయంత్రం |
| scamType | fn | fake_customer_care | - | fake_customer_care | **extractor_form**: near-spelling variant of: AnyDesk |

### 13. te-11 (story) - fails 100% of 1 runs

- Reference: ఒకటిన్నర లక్షల రూపాయలు పోయాయి, బ్యాంక్ ఆఫ్ బరోడా అకౌంట్, నిన్న రాత్రి 10 గంటలకు
- Transcript (`te-11__Mohan__r0__te`): போکہ تینرہ لکشل روپائل پویای، بھانکاف بروڑا اکھاونٹ, ننراتری پدی گنٹلکو۔

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |
| time | fn | -1d 22:00 (840 min ago) | - | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: రాత్రి |
| bank | fn | Bank of Baroda | - | Bank of Baroda | **asr**: ASR lost/changed: బరోడా |

### 14. te-13 (story) - fails 100% of 1 runs

- Reference: నా 15000 రూపాయలు పోయాయి, యాక్సిస్ బ్యాంక్, 3 రోజుల క్రితం
- Transcript (`te-13__Mohan__r0__te`): نا پا دہین وویل روپائل پویای، یاکسیس بینک، مورو روزل کرتاً

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| time | fn | -3d 12:00 (4320 min ago) | - | -3d 12:00 (4320 min ago) | **asr**: ASR lost/changed: 3 రోజుల క్రితం |
| bank | fn | Axis Bank | - | Axis Bank | **asr**: ASR lost/changed: యాక్సిస్ |

### 15. te-16 (story) - fails 100% of 1 runs

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__Mohan__r0__te`): نہ akan nundi ireva velo rupeez debat ai poe ai i c i c i bank,hoca gantakritham customer keer ki kaal chaisan

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | wrong | today 11:00 (60 min ago) | -1d 12:00 (1440 min ago) | today 11:00 (60 min ago) | **asr**: ASR lost/changed: గంట క్రితం |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: care |

### 16. kn-05 (story) - fails 100% of 1 runs

- Reference: ನನ್ನ ಖಾತೆಯಿಂದ ಐದು... ಇಲ್ಲ ಇಲ್ಲ, ಆರು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು, OTP ಹೇಳಿಬಿಟ್ಟೆ, ಕೆನರಾ ಬ್ಯಾಂಕ್
- Transcript (`kn-05__Gagan__r0__kn`): Nannakatain da aido, illa illa, aarosawiru rupaikat aido, oth helibite ke nannabang.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: OTP |
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: ಕೆನರಾ |

### 17. kn-07 (story) - fails 100% of 1 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__Gagan__r0__kn`): ۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔۔

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 ಗಂಟೆಗೆ |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 18. kn-11 (story) - fails 100% of 1 runs

- Reference: ಒಂದೂವರೆ ಲಕ್ಷ ರೂಪಾಯಿ ಹೋಯಿತು, ಬ್ಯಾಂಕ್ ಆಫ್ ಬರೋಡಾ ಖಾತೆ, ನಿನ್ನೆ ರಾತ್ರಿ 10 ಗಂಟೆಗೆ
- Transcript (`kn-11__Gagan__r0__kn`): وندு ஒری لکشرு پائی ہوئی تو بھنک آف بروڑا کھا تے نینے راتری حتگیں تگیں

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |
| time | fn | -1d 22:00 (840 min ago) | - | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: ರಾತ್ರಿ |
| bank | fn | Bank of Baroda | - | Bank of Baroda | **asr**: ASR lost/changed: ಬರೋಡಾ |

### 19. bn-05 (story) - fails 100% of 1 runs

- Reference: আমার অ্যাকাউন্ট থেকে পাঁচ... না না, ছয় হাজার টাকা কেটেছে, ওটিপি বলে দিয়েছিলাম, পাঞ্জাব ন্যাশনাল ব্যাংক
- Transcript (`bn-05__Bashkar__r0__bn`): Our Account thicket parts Nana, Choyhajal Takaketise, OTT Bholedye Silam, Punjab National Bank

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: ওটিপি |

### 20. bn-07 (story) - fails 100% of 1 runs

- Reference: একটা কিউআর কোড পাঠিয়ে বলল স্ক্যান করুন টাকা পাবেন, স্ক্যান করতেই ৪৯৯৯ টাকা কেটে গেল, আজ সকাল সাড়ে দশটায়
- Transcript (`bn-07__Bashkar__r0__bn`): Athekiwa kud pati bulu scan kuruntakapadin scan kurti char hajan alshunilan buitakakitigelu adshokal saridoshtae

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | fn | today 10:30 (90 min ago) | - | today 10:30 (90 min ago) | **asr**: ASR lost/changed: সাড়ে দশটায় |

### 21. bn-11 (story) - fails 100% of 1 runs

- Reference: দেড় লাখ টাকা চলে গেছে, ব্যাংক অফ বরোদা অ্যাকাউন্ট, গতকাল রাত দশটায়
- Transcript (`bn-11__Bashkar__r0__bn`): DED LAC TAKA'I CHULIGETSE, Bank of Boroda account, Botical Raddostai

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |
| time | fn | -1d 22:00 (840 min ago) | - | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: রাত |

### 22. bn-13 (story) - fails 100% of 1 runs

- Reference: আমার ১৫০০০ টাকা চলে গেছে, এক্সিস ব্যাংক, ৩ দিন আগে
- Transcript (`bn-13__Bashkar__r0__bn`): Amar Pune Rohadar Taqa Chule Gya Chhe, Exist Bank, 3D Nagye

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 15000 | **asr**: value not in the transcript |
| time | wrong | -3d 12:00 (4320 min ago) | today 09:00 (180 min ago) | -3d 12:00 (4320 min ago) | **asr**: ASR lost/changed: দিন আগে |

### 23. ta-11 (story) - fails 100% of 1 runs

- Reference: ஒன்றரை லட்சம் ரூபாய் போயிடுச்சு, பேங்க் ஆஃப் பரோடா அக்கவுண்ட், நேற்று இரவு 10 மணிக்கு
- Transcript (`ta-11__Pallavi__r0__ta`): ஒன்று ஏல் ரோபாய் போயில்லைத்து, பேங் அப்பரோடாகக்கும் வணக்கும் நேட்டு ஏரவு பார்த்தும் மனைக்கு.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 150000 | - | 150000 | **asr**: value not in the transcript |
| time | fn | -1d 22:00 (840 min ago) | - | -1d 22:00 (840 min ago) | **asr**: ASR lost/changed: இரவு |

### 24. te-05 (story) - fails 100% of 1 runs

- Reference: నా అకౌంట్ నుండి ఐదు... కాదు కాదు, ఆరు వేల రూపాయలు కట్ అయ్యాయి, OTP చెప్పేశాను, కెనరా బ్యాంక్
- Transcript (`te-05__Mohan__r0__te`): நான் அக்கும் தின்னும் நண்டி, ஆய்து, காது காது, ஆரு வேல் ரூபாய் ரூபாய் கட்டாய், OTP' சென்று, Kenerobank

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: కెనరా |
