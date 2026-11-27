# Turant pipeline eval: kn_transcripts_wb

Generated 2026-11-27T18:38:27.566Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 80 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 100.0 | 100.0 | 100.0 | 100.0 | 100.0 | - | - |
| ASR clean, normal rate | 80 | 2.5 | 2.5 | 78.6 | 6.9 | 12.6 | 388.2 | 226.3 |
| ASR noise 15 dB | 0 | - | - | - | - | - | - | - |
| ASR noise 5 dB | 0 | - | - | - | - | - | - | - |
| ASR rate -15% / +15% | 0 | - | - | - | - | - | - | - |
| ASR all (forced language) | 80 | 2.5 | 2.5 | 78.6 | 6.9 | 12.6 | 388.2 | 226.3 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 2.5% of clean runs and 2.5% of all runs fully correct. Per language (clean): hi -%, en -%, bn -%, ta -%, te -%, mr -%, kn 3%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| time | 113 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| scamType | 81 | 100.0 | 100.0 | 100.0 | 100.0 | 22.7 | 37.0 | 37.0 |
| bank | 97 | 100.0 | 100.0 | 100.0 | 100.0 | 21.4 | 35.3 | 35.3 |
| paymentApp | 29 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| utr | 21 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| suspectPhone | 29 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| suspectAccount | 7 | 100.0 | 100.0 | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| intent | 7 | 100.0 | 100.0 | 100.0 | - | 0.0 | - | - |
| **micro** | 566 | 100.0 | 100.0 | 100.0 | 78.6 | 6.9 | 12.6 | 12.6 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| en | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| bn | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| ta | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| te | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| mr | 100.0 | - | - | 100.0 | - | - | - | - (n=0) |
| kn | 100.0 | 2.5 | - | 100.0 | 12.6 | 388.2 | 226.3 | 0.0 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| en | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| bn | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| ta | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| te | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| mr | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - | 100.0 / - |
| kn | 100.0 / - | 100.0 / - | 100.0 / 37.0 | 100.0 / 35.3 | 100.0 / - | 100.0 / - | 100.0 / 0.0 | 100.0 / - | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| clean | 80 | 2.5 | 12.6 | 388.2 | 226.3 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 80 | 2.5 | 12.6 | 388.2 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| kn-IN-GaganNeural | 40 | 2.5 | 13.8 | 312.8 | 212.0 |
| kn-IN-SapnaNeural | 40 | 2.5 | 11.5 | 463.6 | 240.5 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 80 | 2.5 | 12.6 | 388.2 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 44 | 100.0 | 0.0 | 13.7 |
| answer | 26 | 100.0 | 7.7 | 12.5 |
| answer (skip intent) | 2 | 100.0 | 0.0 | - |
| correction | 8 | 100.0 | 0.0 | 0.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 151 | 151 (100%) | 0 (0%) | 0 (0%) | 0 |
| clean | 151 | 151 (100%) | 0 (0%) | 0 (0%) | 0 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 48 | 48 | 0 | 0 |
| time | 32 | 32 | 0 | 0 |
| bank | 22 | 22 | 0 | 0 |
| scamType | 17 | 17 | 0 | 0 |
| paymentApp | 8 | 8 | 0 | 0 |
| suspectPhone | 8 | 8 | 0 | 0 |
| utr | 6 | 6 | 0 | 0 |
| suspectUpi | 4 | 4 | 0 | 0 |
| suspectAccount | 4 | 4 | 0 | 0 |
| intent | 2 | 2 | 0 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| kn | 151 | 151 | 0 | 0 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | kn | asr | fn | 48 | kn-01 kn-02 kn-03 kn-04 kn-05 kn-06 kn-07 kn-08 +16 |
| 2 | time | kn | asr | fn | 32 | kn-01 kn-02 kn-03 kn-04 kn-07 kn-10 kn-11 kn-12 +8 |
| 3 | bank | kn | asr | fn | 22 | kn-01 kn-03 kn-05 kn-11 kn-12 kn-13 kn-16 kn-17 +4 |
| 4 | scamType | kn | asr | fn | 17 | kn-01 kn-03 kn-04 kn-05 kn-07 kn-09 kn-16 kn-18 +1 |
| 5 | paymentApp | kn | asr | fn | 8 | kn-02 kn-04 kn-08 kn-20 |
| 6 | suspectPhone | kn | asr | fn | 8 | kn-09 kn-22 kn-33 kn-39 |
| 7 | utr | kn | asr | fn | 6 | kn-14 kn-31 kn-32 |
| 8 | suspectUpi | kn | asr | fn | 3 | kn-10 kn-34 |
| 9 | suspectAccount | kn | asr | fn | 2 | kn-19 |
| 10 | suspectAccount | kn | asr | fp | 2 | kn-33 kn-39 |
| 11 | intent | kn | asr | fn | 2 | kn-36 |
| 12 | suspectUpi | kn | asr | wrong | 1 | kn-34 |

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. kn-01 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): ننسبی کتے ہیں دا آیدو صابر روپای کڑی تواگی دے ہاتھ دنیمیشر لہیں دے عبرو کک اپیٹ ماردلو ہیلیدر

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **asr**: ASR lost/changed: ನಿಮಿಷಗಳ ಹಿಂದೆ |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 2. kn-03 (story) - fails 100% of 2 runs

- Reference: ನಿನ್ನೆ ಸಂಜೆ 7 ಗಂಟೆಗೆ ಕಸ್ಟಮರ್ ಕೇರ್‌ನಿಂದ ಕರೆ ಬಂತು, AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳಿದರು, ನಂತರ HDFC ಖಾತೆಯಿಂದ ಎರಡು ಲಕ್ಷ ರೂಪಾಯಿ ತೆಗೆದರು
- Transcript (`kn-03__Gagan__r0__kn`): நீن்னை சن்ஷியழுக்குண்டுகே கஷ்டமர்க்க்கேன் இந்த கரை்பந்து, என்னிருஸ்க இனஷ்டால் மாடலும் எல்லிரு, நந்தரா கடிவ்ஸ்காத்தை இந்த எழுலக்ஷிருப்பாய்துக்குத்துக்கொள்ளரு

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 200000 | **asr**: value not in the transcript |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: ಸಂಜೆ |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: HDFC |

### 3. kn-04 (story) - fails 100% of 2 runs

- Reference: ಒಬ್ಬರು ತಪ್ಪಾಗಿ ಹಣ ಕಳುಹಿಸಿದ್ದೇನೆ, ವಾಪಸ್ ಕಳುಹಿಸಿ ಎಂದರು, ನಾನು ಗೂಗಲ್ ಪೇ ಮೂಲಕ ಹನ್ನೆರಡು ಸಾವಿರದ ಐನೂರು ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ, ಎರಡು ಗಂಟೆಗಳ ಹಿಂದೆ
- Transcript (`kn-04__Gagan__r0__kn`): おばろ تبقى گھی ہنا کلویس دینے وپس کلویسی ہندھرு, ھنانو گوگلپی مولکہ حنےڈو ساوردہ آینورو روپای کلویس دینے, ھیڈو گنٹگلہ ہندھے

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12500 | - | 12500 | **asr**: value not in the transcript |
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **asr**: ASR lost/changed: ಎರಡು ಗಂಟೆಗಳ ಹಿಂದೆ |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: ತಪ್ಪಾಗಿ |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: ಗೂಗಲ್ ಪೇ |

### 4. kn-16 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ننہاں کنت انہیں پتو سابیر روپیس دیبے دائیتو, اسے شبیک, ونگنٹے ہن دیگستمر کارگے کال ماریدے

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | today 11:00 (60 min ago) | **asr**: ASR lost/changed: ಗಂಟೆ ಹಿಂದೆ |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 5. kn-02 (story) - fails 100% of 2 runs

- Reference: ಅಣ್ಣ ಬೇಗ, ನನ್ನ ಅಕೌಂಟ್‌ನಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು, ಫೋನ್‌ಪೇ ಮೂಲಕ, ಈಗಷ್ಟೇ ಆಯಿತು
- Transcript (`kn-02__Gagan__r0__kn`): அنا بے گا ننہاں کنگنین دا آیدو ساول روپائی ہوئی تو فون پی ملکہ ایگستے آیدو

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 5000 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: ಈಗಷ್ಟೇ |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: ಫೋನ್‌ಪೇ |

### 6. kn-05 (story) - fails 100% of 2 runs

- Reference: ನನ್ನ ಖಾತೆಯಿಂದ ಐದು... ಇಲ್ಲ ಇಲ್ಲ, ಆರು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು, OTP ಹೇಳಿಬಿಟ್ಟೆ, ಕೆನರಾ ಬ್ಯಾಂಕ್
- Transcript (`kn-05__Gagan__r0__kn`): Nannakatain da aido, illa illa, aarosawiru rupaikat aido, oth helibite ke nannabang.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: OTP |
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: ಕೆನರಾ |
