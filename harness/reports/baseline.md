# Turant pipeline eval: baseline

Generated 2026-11-23T08:59:08.507Z. Extractor: `..\prototype\src\lib\extract.ts`. 280 cases, 1510 ASR transcripts scored.
Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> `extractFields` / `interpret` / `parseCorrection`. Fixed clock: Sat Nov 21 2026 12:00:00 GMT+0530 (India Standard Time).

## Headline

| Input | Runs | Case fully correct % | Unambiguous-only % | Field P | Field R | Field F1 | WER % | CER % |
|---|---|---|---|---|---|---|---|---|
| Reference text (perfect ASR) | 280 | 55.7 | 55.7 | 86.9 | 70.1 | 77.6 | - | - |
| ASR clean, normal rate | 600 | 27.2 | 27.2 | 73.5 | 39.1 | 51.0 | 65.5 | 40.6 |
| ASR noise 15 dB | 280 | 24.6 | 24.6 | 76.7 | 36.0 | 49.0 | 73.8 | 45.0 |
| ASR noise 5 dB | 280 | 19.3 | 19.6 | 72.3 | 28.1 | 40.5 | 84.0 | 67.3 |
| ASR rate -15% / +15% | 280 | 25.7 | 25.7 | 73.1 | 36.0 | 48.3 | 65.5 | 43.4 |
| ASR all (forced language) | 1440 | 24.9 | 24.9 | 73.8 | 35.8 | 48.2 | 70.7 | 47.2 |

**Ceiling for extract.ts work alone** (every `extractor` and `extractor_form` error below fixed, ASR unchanged): 59.7% of clean runs and 55.9% of all runs fully correct. Per language (clean): hi 81%, en 80%, bn 51%, ta 45%, te 48%, mr 63%, kn 40%. The rest needs ASR changes.

"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper's choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.

## Per field

| Field | Support | Ref P | Ref R | Ref F1 | ASR-clean P | ASR-clean R | ASR-clean F1 | ASR-all F1 |
|---|---|---|---|---|---|---|---|---|
| amount | 166 | 62.8 | 48.8 | 54.9 | 55.7 | 34.7 | 42.8 | 41.2 |
| time | 113 | 90.0 | 71.7 | 79.8 | 59.9 | 36.2 | 45.1 | 42.6 |
| scamType | 81 | 100.0 | 90.1 | 94.8 | 98.8 | 46.9 | 63.6 | 60.1 |
| bank | 97 | 98.5 | 66.0 | 79.0 | 96.9 | 46.1 | 62.5 | 58.8 |
| paymentApp | 29 | 96.7 | 100.0 | 98.3 | 96.6 | 44.4 | 60.9 | 56.3 |
| utr | 21 | 95.0 | 90.5 | 92.7 | 80.0 | 17.8 | 29.1 | 28.6 |
| suspectUpi | 16 | 100.0 | 100.0 | 100.0 | 100.0 | 63.9 | 78.0 | 65.6 |
| suspectPhone | 29 | 100.0 | 82.8 | 90.6 | 85.7 | 28.6 | 42.9 | 42.6 |
| suspectAccount | 7 | 100.0 | 42.9 | 60.0 | 50.0 | 26.7 | 34.8 | 30.8 |
| intent | 7 | 100.0 | 100.0 | 100.0 | 100.0 | 40.0 | 57.1 | 53.1 |
| **micro** | 566 | 86.9 | 70.1 | 77.6 | 73.5 | 39.1 | 51.0 | 48.2 |

## Per language

| Lang | Ref fully correct % | ASR-clean fully correct % | ASR 5 dB fully correct % | Ref F1 | ASR-clean F1 | WER % | CER % | ID digits kept in transcript % |
|---|---|---|---|---|---|---|---|---|
| hi | 80.0 | 57.5 | 40.0 | 91.4 | 82.3 | 36.0 | 21.1 | 75.0 (n=16) |
| en | 87.5 | 63.3 | 55.0 | 94.5 | 82.8 | 36.6 | 34.7 | 70.4 (n=27) |
| bn | 32.5 | 8.8 | 7.5 | 56.9 | 13.5 | 76.1 | 50.1 | 12.5 (n=16) |
| ta | 45.0 | 10.0 | 7.5 | 71.8 | 30.0 | 134.4 | 47.8 | 0.0 (n=16) |
| te | 45.0 | 10.0 | 5.0 | 75.0 | 19.8 | 74.9 | 52.0 | 12.5 (n=16) |
| mr | 52.5 | 18.8 | 17.5 | 78.9 | 57.4 | 68.9 | 31.8 | 12.5 (n=16) |
| kn | 47.5 | 3.8 | 2.5 | 69.9 | 17.1 | 79.7 | 50.2 | 25.0 (n=16) |

Per-language, per-field F1 (reference text / ASR clean):

| Lang | amount | time | scamType | bank | paymentApp | utr | suspectUpi | suspectPhone | suspectAccount |
|---|---|---|---|---|---|---|---|---|---|
| hi | 79.2 / 86.0 | 100.0 / 75.4 | 91.7 / 76.2 | 100.0 / 85.7 | 88.9 / 80.0 | 80.0 / 50.0 | 100.0 / 100.0 | 100.0 / 93.3 | 100.0 / 100.0 |
| en | 95.5 / 76.0 | 94.1 / 76.3 | 96.0 / 93.2 | 91.7 / 88.6 | 100.0 / 88.9 | 85.7 / 75.0 | 100.0 / 100.0 | 88.9 / 75.0 | 100.0 / 80.0 |
| bn | 25.0 / 7.1 | 46.2 / 8.7 | 90.0 / 30.8 | 63.6 / 23.5 | 100.0 / 22.2 | 100.0 / - | 100.0 / - | 85.7 / 22.2 | - / - |
| ta | 36.4 / 0.0 | 69.2 / 26.1 | 95.2 / 41.4 | 78.3 / 60.0 | 100.0 / 66.7 | 100.0 / 0.0 | 100.0 / 85.7 | 85.7 / 0.0 | - / - |
| te | 40.0 / 0.0 | 81.5 / 25.0 | 95.2 / 24.0 | 72.7 / 30.3 | 100.0 / 40.0 | 100.0 / - | 100.0 / 100.0 | 85.7 / - | - / - |
| mr | 70.8 / 68.2 | 80.0 / 46.4 | 95.2 / 66.7 | 60.0 / 72.7 | 100.0 / 40.0 | 80.0 / - | 100.0 / - | 100.0 / 22.2 | - / 0.0 |
| kn | 27.3 / 2.9 | 78.6 / 9.1 | 100.0 / 53.3 | 78.3 / 35.3 | 100.0 / 22.2 | 100.0 / - | 100.0 / - | 85.7 / 0.0 | 100.0 / 0.0 |

## Noise, voice, speaking rate

| Condition | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| babble 15 dB | 92 | 18.5 | 46.6 | 65.2 | 41.2 |
| babble 5 dB | 92 | 13.0 | 34.6 | 124.5 | 95.9 |
| clean | 880 | 26.7 | 50.2 | 65.5 | 41.5 |
| pink 15 dB | 99 | 26.3 | 48.8 | 92.6 | 55.5 |
| pink 5 dB | 99 | 18.2 | 37.9 | 71.5 | 63.4 |
| traffic 15 dB | 89 | 29.2 | 51.9 | 60.3 | 37.3 |
| traffic 5 dB | 89 | 27.0 | 49.0 | 57.9 | 41.4 |

| SNR (clean = all base clips) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| clean | 600 | 27.2 | 51.0 | 65.5 |
| 15 dB | 280 | 24.6 | 49.0 | 73.8 |
| 5 dB | 280 | 19.3 | 40.5 | 84.0 |

| Voice (clean, normal rate) | Runs | Fully correct % | Field F1 | WER % | CER % |
|---|---|---|---|---|---|
| bn-IN-BashkarNeural | 40 | 7.5 | 10.8 | 79.4 | 51.6 |
| bn-IN-TanishaaNeural | 40 | 10.0 | 16.1 | 72.9 | 48.6 |
| en-IN-NeerjaExpressiveNeural | 40 | 62.5 | 81.8 | 37.9 | 26.5 |
| en-IN-NeerjaNeural | 40 | 62.5 | 82.8 | 35.6 | 25.9 |
| en-IN-PrabhatNeural | 40 | 65.0 | 83.9 | 36.4 | 51.6 |
| hi-IN-MadhurNeural | 40 | 55.0 | 81.9 | 36.6 | 20.3 |
| hi-IN-SwaraNeural | 40 | 60.0 | 82.7 | 35.4 | 21.8 |
| kn-IN-GaganNeural | 40 | 2.5 | 18.3 | 77.9 | 49.8 |
| kn-IN-SapnaNeural | 40 | 5.0 | 15.7 | 81.6 | 50.7 |
| mr-IN-AarohiNeural | 40 | 22.5 | 63.6 | 70.0 | 33.0 |
| mr-IN-ManoharNeural | 40 | 15.0 | 51.2 | 67.9 | 30.6 |
| ta-IN-PallaviNeural | 40 | 12.5 | 35.2 | 154.9 | 50.7 |
| ta-IN-ValluvarNeural | 40 | 7.5 | 24.2 | 113.8 | 44.9 |
| te-IN-MohanNeural | 40 | 10.0 | 20.6 | 74.5 | 50.6 |
| te-IN-ShrutiNeural | 40 | 10.0 | 18.9 | 75.2 | 53.5 |

| Rate (clean) | Runs | Fully correct % | Field F1 | WER % |
|---|---|---|---|---|
| +0% | 600 | 27.2 | 51.0 | 65.5 |
| -15% | 147 | 23.1 | 41.4 | 64.6 |
| +15% | 133 | 28.6 | 55.2 | 66.2 |

## By utterance kind (ASR clean vs reference)

| Kind | Runs | Ref fully correct % | ASR fully correct % | ASR field F1 |
|---|---|---|---|---|
| story | 330 | 37.0 | 17.0 | 51.1 |
| correction | 60 | 82.1 | 43.3 | 52.0 |
| answer | 195 | 75.8 | 38.5 | 50.3 |
| answer (skip intent) | 15 | 100.0 | 40.0 | 57.1 |

## Language auto-detect vs forced language token

70 clean clips transcribed twice. Forced: 24.3% fully correct (WER 80.9%). Auto-detect: 24.3% (WER 115.2%). Transcript in the wrong script under auto-detect: 52.9%.

| Lang | n | Forced fully correct % | Auto fully correct % | Auto wrong script % |
|---|---|---|---|---|
| hi | 10 | 50.0 | 40.0 | 10.0 |
| en | 10 | 60.0 | 60.0 | 40.0 |
| bn | 10 | 10.0 | 20.0 | 100.0 |
| ta | 10 | 10.0 | 10.0 | 10.0 |
| te | 10 | 10.0 | 10.0 | 100.0 |
| mr | 10 | 20.0 | 20.0 | 10.0 |
| kn | 10 | 10.0 | 10.0 | 100.0 |

## Where the errors come from

Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:
- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).
- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.
- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.

| Scope | Field errors | asr | extractor_form | extractor | ...of which ASR also lost the value |
|---|---|---|---|---|---|
| all forced-language runs | 1903 | 856 (45%) | 239 (13%) | 808 (42%) | 347 |
| clean | 753 | 313 (42%) | 115 (15%) | 325 (43%) | 134 |
| 15 dB | 368 | 169 (46%) | 39 (11%) | 160 (43%) | 70 |
| 5 dB | 417 | 220 (53%) | 35 (8%) | 162 (39%) | 76 |

| Field | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| amount | 583 | 151 | 40 | 392 |
| time | 397 | 168 | 70 | 159 |
| bank | 287 | 107 | 25 | 155 |
| scamType | 242 | 168 | 33 | 41 |
| suspectPhone | 109 | 79 | 4 | 26 |
| paymentApp | 93 | 45 | 47 | 1 |
| utr | 93 | 68 | 11 | 14 |
| suspectUpi | 43 | 43 | 0 | 0 |
| suspectAccount | 33 | 9 | 4 | 20 |
| intent | 23 | 18 | 5 | 0 |

| Lang | Errors | asr | extractor_form | extractor |
|---|---|---|---|---|
| hi | 123 | 57 | 42 | 24 |
| en | 122 | 69 | 19 | 34 |
| bn | 375 | 144 | 36 | 195 |
| ta | 334 | 153 | 18 | 163 |
| te | 353 | 155 | 39 | 159 |
| mr | 234 | 93 | 51 | 90 |
| kn | 362 | 185 | 34 | 143 |

## Biggest failure clusters (field x language x cause)

| # | Field | Lang | Cause | Outcome | Runs broken | Cases |
|---|---|---|---|---|---|---|
| 1 | amount | ta | extractor | fn | 85 | ta-02 ta-03 ta-04 ta-05 ta-06 ta-08 ta-10 ta-11 +10 |
| 2 | amount | te | extractor | fn | 82 | te-02 te-03 te-04 te-05 te-06 te-08 te-10 te-11 +10 |
| 3 | amount | kn | extractor | fn | 54 | kn-03 kn-04 kn-05 kn-06 kn-08 kn-10 kn-11 kn-17 +10 |
| 4 | amount | bn | extractor | wrong | 45 | bn-01 bn-02 bn-04 bn-05 bn-06 bn-08 bn-12 bn-14 +7 |
| 5 | amount | bn | extractor | fn | 40 | bn-01 bn-02 bn-03 bn-10 bn-11 bn-14 bn-23 bn-04 +7 |
| 6 | bank | bn | extractor | fn | 40 | bn-05 bn-06 bn-11 bn-12 bn-13 bn-17 bn-18 bn-21 |
| 7 | scamType | te | asr | fn | 39 | te-01 te-05 te-07 te-08 te-09 te-16 te-18 te-35 |
| 8 | scamType | bn | asr | fn | 36 | bn-01 bn-03 bn-07 bn-08 bn-09 bn-16 bn-35 bn-04 |
| 9 | amount | kn | extractor | wrong | 34 | kn-02 kn-05 kn-06 kn-08 kn-10 kn-11 kn-12 kn-14 +6 |
| 10 | time | bn | extractor | fn | 33 | bn-01 bn-04 bn-10 bn-12 bn-16 bn-27 bn-26 bn-28 |
| 11 | scamType | kn | asr | fn | 33 | kn-01 kn-05 kn-07 kn-09 kn-16 kn-35 kn-08 kn-18 |
| 12 | time | ta | extractor | fn | 32 | ta-02 ta-03 ta-04 ta-10 ta-12 ta-16 ta-27 |
| 13 | bank | mr | extractor | fn | 30 | mr-05 mr-11 mr-13 mr-17 mr-18 mr-21 |
| 14 | bank | te | extractor | fn | 29 | te-05 te-06 te-11 te-12 te-17 te-18 |
| 15 | bank | kn | asr | fn | 29 | kn-01 kn-03 kn-05 kn-16 kn-21 kn-30 kn-38 |
| 16 | bank | te | asr | fn | 28 | te-01 te-03 te-16 te-21 te-38 te-13 te-29 te-30 |
| 17 | amount | ta | asr | fn | 27 | ta-01 ta-07 ta-13 ta-16 ta-21 ta-25 |
| 18 | scamType | ta | asr | fn | 26 | ta-01 ta-03 ta-04 ta-05 ta-09 ta-16 ta-18 ta-35 +1 |
| 19 | bank | ta | extractor | fn | 25 | ta-06 ta-11 ta-12 ta-17 ta-18 |
| 20 | time | te | extractor | fn | 25 | te-04 te-10 te-12 te-16 te-27 |
| 21 | time | kn | extractor | fn | 25 | kn-04 kn-10 kn-12 kn-16 kn-27 |
| 22 | bank | kn | extractor | fn | 25 | kn-06 kn-11 kn-12 kn-17 kn-18 |
| 23 | time | kn | asr | fn | 24 | kn-02 kn-13 kn-20 kn-26 kn-40 kn-01 kn-07 kn-11 +1 |
| 24 | bank | bn | asr | fn | 22 | bn-01 bn-02 bn-03 bn-16 bn-38 |
| 25 | amount | kn | asr | fn | 19 | kn-07 kn-13 kn-16 kn-25 kn-01 |
| 26 | time | ta | asr | wrong | 18 | ta-11 ta-20 ta-26 ta-28 ta-40 |
| 27 | bank | ta | asr | fn | 18 | ta-13 ta-21 ta-29 ta-30 ta-01 ta-03 ta-05 |
| 28 | time | te | extractor_form | fn | 18 | te-01 te-07 te-11 te-15 te-28 |
| 29 | time | bn | extractor | wrong | 17 | bn-07 bn-20 bn-26 bn-28 |
| 30 | scamType | mr | asr | fn | 17 | mr-01 mr-03 mr-16 mr-04 mr-06 |

## Prioritised fixes for extract.ts (baseline round)

Ranked by how many ASR runs each fix can unblock. Run counts are field errors bucketed `extractor` + `extractor_form`
over the 1440 forced-language runs (see the tables above). Every item is reproducible on the reference text or on the
cached transcripts that are named. The ceiling if all of this lands: **27% -> ~59% of clean runs fully correct**
(hi 75%, en 80%, mr 63%, bn 51%, te 48%, ta 45%, kn 40%). The rest is ASR.

1. **Native number words for bn / ta / te / kn, and the gaps in mr / hi** (amount: 423 fixable errors, plus most time and ID errors). `UNITS` has only Hindi and English words. Bengali পাঁচ, দুই, দশ, পনেরো, কুড়ি, সাতচল্লিশ, Tamil ஐந்து, இரண்டு, பத்து, Telugu ఐదు, రెండు, పది, పదిహేను, నలభై ఏడు, and Kannada ಐದು, ಎರಡು, ಹತ್ತು, ಹದಿನೈದು, ನಲವತ್ತೇಳು are all unknown. Also add:
   - Hundreds: পাঁচশো, ছশো, নশো; ஐநூறு, அறுநூறு, தொள்ளாயிரத்து; వంద, వందల; ನೂರು, ಐನೂರು, ಆರುನೂರು, ಒಂಬೈನೂರ; Marathi पाचशे, सहाशे, नऊशे.
   - Oblique multipliers: Telugu **వేల** and **లక్షల** (only వేలు and లక్ష exist, so "ఐదు వేల రూపాయలు" fails), Kannada **ಸಾವಿರದ**, Tamil **ஆயிரத்து** and **லட்சத்து**.
   - Tamil fused thousands: split on the -ாயிரம் / -ஆயிரம் / -ாயிரத்து suffix, e.g. ஐயாயிரம் 5000, பத்தாயிரம், பன்னிரண்டாயிரத்து ஐநூறு 12500, நாற்பத்தேழாயிரம் 47000.
   - Fractions: সাড়ে, দেড়, আড়াই; ஒன்றரை, இரண்டரை; ఒకటిన్నర, రెండున్నర; ಒಂದೂವರೆ, ಎರಡೂವರೆ. Marathi fused साडेतीन, साडेनऊ, साडेदहा.
   - Missing Hindi tens: सैंतालीस, निन्यानवे, छब्बीस (hi-06, hi-13, hi-24, hi-26). Use a full 1-99 table, plus Hinglish ninyanve and saintalis.
   - Whisper's spellings: धाई (ढाई), देड़ (डेढ़), साड़े / साधे (साढ़े), बारा, पंद्रा, ज्यारा; ಆಯಿದು, ಎಳು, ವಂದು, ಇರಡು; అయ్దు, ఒంటి, తుమ్మిది.

   Measure with `node run_eval.mjs`: per-language amount F1 is currently ta 0.0, te 0.0, kn 2.9, bn 7.1 on ASR.

2. **Do not invent "1000" / "100000" from a lone multiplier.** When the word before হাজার / ಸಾವಿರ / লাখ / ಲಕ್ಷ is an unknown non-Latin word, `buildRun` uses `(current || 1) * mult`. So "পাঁচ হাজার" becomes 1000 and "দুই লাখ" / "ಎರಡು ಲಕ್ಷ" become 100000, at confidence 0.85-0.95 (bn-01..bn-24, kn-02..kn-23, ta-03, ta-11). These are confident wrong values, which is worse than a miss. Only default to 1× when the multiplier starts the run or follows a known "ek" / "one" / "एक", and otherwise abstain.

3. **Digit sequences spoken as native words** (IDs: about 80 fixable errors). Whisper writes digit-by-digit speech as words in te, kn and bn: "నాలుగు సున్నా మూడు రెండు …" (te-14), "ಒಂಬತ್ತು ಎಂಟು ಎಳು ಆರು ಆಯಿದು …" (kn-09), "ছয় এক দুই তিন …" (bn-31). The share of clean ID runs whose digits survive as digits is only bn/te 12%, kn 25%, ta 0%. Once fix 1 lands, add zero words (শূন্য, பூஜ்ஜியம், సున్నా, ಸೊನ್ನೆ, शून्य) and ಡಬಲ್ / ಟ್ರಿಪಲ್ / ডাবল / டபுள் to `REPEAT`. Then `findNumberRuns` builds the sequence.

4. **Digit-run boundaries swallow the next number.**
   - "UTR … 4 3 2, पाँच हज़ार रुपये" (hi-15, mr-14) becomes amount 50000 with no UTR, because the comma is dropped in `tokenize` and the run continues into पाँच हज़ार.
   - The transcript "403218765432 5000 টাকা" (bn-14) becomes a 16-digit run.

   Treat commas and sentence punctuation as run breaks for sequences. Never extend a run that already has 10 or 12 digits with a token followed by a multiplier or currency.

5. **Time phrases** (224 fixable errors).
   - The number words from fix 1 (পনেরো মিনিট, பதினைந்து நிமிடம், పది నిమిషాల, ಹತ್ತು ಗಂಟೆಗೆ).
   - Bengali o'clock words: সাতটায়, দশটায়, নটায়, আড়াইটায়, সাড়ে দশটায়. Only the `\d+টায়` form is handled today, so bn-07 and bn-20 fall back to the 09:00 / 14:00 day-part default and come out confidently wrong.
   - Tamil colloquial நேத்து, இன்னைக்கு, சாயங்காலம், காலைல, ராத்திரி.
   - The two-word Tamil hour unit "மணி நேரத்துக்கு முன்னாடி".
   - Half-hour words: আধ ঘণ্টা, அரை மணி, అరగంట, ಅರ್ಧ ಗಂಟೆ, अर्ध्या तास.
   - "at 9.30" with a dot (en-12, the form Whisper writes) and "11 in the morning" (en-14).
   - When an hour word is present but unparsed, return nothing (or low confidence) rather than the day-part default.

6. **Bank names in every script** (180 fixable errors).
   - Add native keys for PNB, Kotak, Baroda, Canara, Axis, Union, Yes and Indian Bank in bn, ta, te, kn and mr. Marathi uses **बँक**, so 'स्टेट बँक' (mr-21, mr-29) and 'युनियन बँकेतून' miss.
   - Better: match "<name> + any bank word" (ব্যাংক / বাংক / பேங்க் / வங்கி / బ్యాంక్ / బాంక్ / ಬ್ಯಾಂಕ್ / बँक / बैंक).
   - Collapse spaced or dotted acronyms in any script before matching: "S.B.I." (hi-31), "आई सी आई सी आई" (hi-14), "এইচ টিএফসি", "এস্বিআই".
   - Accept close spellings: नैशनल, बड़ादा / बडोदा, अक्सिस, एक्सिस, কানাড়া, and "Canada Bank" for Canara.

7. **Scam keywords** (74 fixable errors).
   - Latin keywords need prefix matching: "blackmailing" misses 'blackmail' because of the word-boundary regex (en-11, on reference text too).
   - Native-script acronyms split by Whisper: केवाई सी / केवाय सी (hi-01, hi-37, mr-35).
   - Loanwords: इन्वेस्टमेंट, ইনভেস্ট, ইনভেস্টমেন্ট, இன்வெஸ்ட், ఇన్వెస్ట్; টেলিগ্রাম, டெலிகிராம், టెలిగ్రామ్; টাস্ক.
   - The Marathi stem गुंतवणु- (the inflected गुंतवणुकीच्या, mr-18).
   - Hindi "पैन कार्ड अपडेट" and "बैंक वाले बनके" (hi-22).
   - Whisper spellings: ब्लाकमेल, AnyDisk, स्कान, மிறட்டல்.

8. **Payment apps** (48 fixable errors, mostly `extractor_form`).
   - The "phone pe" guard only accepts se / app / upi after it. Whisper writes "फोन पे वरून" (mr), "ফোন পে দিয়ে" / "ফোন পেথেকে" (bn), "ఫోన్ పే ద్వారా" (te), "போன்பை மூலமா" (ta). Accept the postpositions वरून, ने, দিয়ে, থেকে, ద్వారా, மூலமா, ಮೂಲಕ.
   - Accept spaced or variant brands: पेटीम, पेटी एम, পেটিম, பேடியம், ಪೇಟಿಯಂ, ಫೋನ್ಪೆ, கூகுள்பே.
   - Fix the false positive in hi-14: "गूगल पे सर्च किया" means "searched on Google".

9. **ID context and spurious numbers.**
   - `ACCOUNT_CTX` is an exact-match set, so inflected or other-script forms miss: অ্যাকাউন্টে, அக்கவுண்ட், అకౌంట్ (bn-19, ta-19 and te-19 fail on reference text).
   - "plus 91 70112 23344" is read as UTR 917011223344 (en-15). Treat the spoken word "plus" like "+".
   - A masked account in an SMS, "A/c XX4321" / "ACXX 4321", becomes a spurious ₹4321 (en-31). Skip numbers right after XX / A/c.

10. **Corrections, negation and false "now".**
    - `parseCorrection('no, the bank was HDFC not SBI')` returns SBI because `preferLast` picks the negated mention (en-38). Prefer the value that is not followed or preceded by not / nahi / नहीं / না / இல்ல / కాదు / ಅಲ್ಲ / नाही.
    - 'ಈಗ' ("now") in "ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ" ("they are blackmailing now") sets time = now (kn-08). Only accept NOW words in a past-event phrase or as the whole answer.
    - Skip intents need Whisper's spellings: জনিনা, माहित नही, திரியாது.

### ASR-side findings (not fixable in extract.ts)

- **Whisper large-v3-turbo is the bottleneck for bn / ta / te / kn**: CER about 50% on clean TTS speech, and 38-51% of field errors there are pure ASR (bn 38%, te 44%, ta 46%, kn 51%). Typical outputs: "Dead luck takachuleg" for দেড় লাখ টাকা চলে গেছে, ఆయిసియాయి for ICICI, ಸಬೈ for SBI. Evaluate an Indic model (AI4Bharat IndicConformer / IndicWhisper) or the browser recogniser for these locales with this harness. Add a backend by writing transcripts under a new language tag.
- **Always force the language token.** Under auto-detect, 100% of bn / te / kn transcripts came back in the wrong script, at roughly equal accuracy.
- **Hinglish through `<|en|>` is unreliable.** Whisper translates ("Your account is 5,000 rupees …", en-02) or hallucinates ("5,000,000,000,000…", "। । । ।"; en-04, en-13). Decode Hinglish speakers with `<|hi|>`; the extractor already handles the Devanagari output.
- **Pass `hotwords`** (the server supports them): KYC, OTP, UPI, AnyDesk, PhonePe, Paytm, Google Pay and the bank names. Scam type has 168 ASR errors, mostly the acronyms ("के YC", "కేవాయసి", "ಕೈಕ").
- **Babble is the harmful noise:** 13% fully correct at 5 dB babble, against 27% at 5 dB traffic and 27% clean. Speaking rate barely matters (-15%: 23%, +15%: 29%).
- **Read IDs back for confirmation.** Even on clean audio only about 70-75% of hi/en UTR and phone digit strings survive ASR intact ("98765-4321", "601-34567890").

### Caveats

The speech is TTS read speech from 15 neural voices, not panicked humans, so real-world ASR will be worse. The bn / ta / te / mr / kn cases are deliberately parallel (same 40 scenarios, native phrasing), so per-language numbers are comparable. Three expectations are marked `ambiguous`. The ASR / extractor split is heuristic (field oracles plus token ablation; see "Where the errors come from"); spot-check it in the worst-40 list below.

## Worst 40 failures

Ranked by the share of a case's ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).

### 1. bn-01 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: আমার এসবিআই অ্যাকাউন্ট থেকে পাঁচ হাজার টাকা কেটে গেছে, দশ মিনিট আগে একজন KYC আপডেটের জন্য ফোন করেছিল
- Transcript (`bn-01__Bashkar__r0__bn`): আমার এস্বিযাই একাউন্ট থেকে পাঁচ হাজার তাকা কেটে গেছে, দাস মিনিট আগে এক জন কাইক আপডেটের জন ন ফোন কুরে ছিলো.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 1000 | **extractor**: fails on the reference text too (wrong); value is in the transcript |
| time | fn | today 11:50 (10 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: এসবিআই |

### 2. bn-02 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: দাদা তাড়াতাড়ি, আমার স্টেট ব্যাংক থেকে সাড়ে তিন হাজার টাকা চলে গেছে, ফোনপে দিয়ে, এইমাত্র
- Transcript (`bn-02__Bashkar__r0__bn`): দাদা তারাতা ডি আমার স্টেট বাইংক থেকে সাডে তিন হাজাত তাকা চুলে গেছে ফোন পে দিয়ে এই মাত্রো

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 3500 | - | 1000 | **extractor**: fails on the reference text too (wrong); ASR also lost the value |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **extractor_form**: key words survive (এইমাত্র) but the extractor fails |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: ব্যাংক |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (ফোনপে) but the extractor fails |

### 3. bn-03 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: গতকাল সন্ধ্যা সাতটায় কাস্টমার কেয়ার থেকে ফোন এসেছিল, AnyDesk ইনস্টল করতে বলল, তারপর এইচডিএফসি অ্যাকাউন্ট থেকে দুই লাখ টাকা কেটে নিল
- Transcript (`bn-03__Bashkar__r0__bn`): বতকাল শুন্ধা সাপতায় কাস্টমার কেয় থেকে ফোন এশে ছিলো, এনিয় দেশক ইন্সল কুরতে বলো, তার পার এজ ডিএফ্সি একাউন্ট থেকে দুই লাক তাকা কেটে নিলো.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 200000 | - | 100000 | **extractor**: fails on the reference text too (wrong); ASR also lost the value |
| time | fn | -1d 19:00 (1020 min ago) | - | -1d 19:00 (1020 min ago) | **asr**: ASR lost/changed: সন্ধ্যা |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |
| bank | fn | HDFC Bank | - | HDFC Bank | **asr**: ASR lost/changed: এইচডিএফসি |

### 4. bn-16 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: আমার account থেকে 20,000 টাকা debit হয়ে গেছে, ICICI bank, এক ঘণ্টা আগে customer care এ ফোন করেছিলাম
- Transcript (`bn-16__Bashkar__r0__bn`): আমারা কাম থেকে কে কুডি হাজার টাকা দেবের হোয়ে গেছে এসে এসে বেক এক ঘন্টা আগে কাস্টমার খের এফান কুরে ছিলম।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 20000 | 1000 | 20000 | **extractor_form**: value is in the transcript but not parsed |
| time | fn | today 11:00 (60 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 5. te-01 (story) - fails 100% of 5 runs

- Reference: నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు
- Transcript (`te-01__Mohan__r0__te`): నా ఏస్బియాయి ఖాతానుండి అయదు వేలు రూపాయలు పోయాయి పది నిమిశాల కృతం ఉకరుక్య వాయసి అప్డేట్ చేయమని చిప్పరు.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **asr**: value not in the transcript |
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **extractor_form**: near-spelling variant of: నిమిషాల |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 6. te-16 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: నా account నుండి 20,000 rupees debit అయిపోయాయి, ICICI bank, ఒక గంట క్రితం customer care కి కాల్ చేశాను
- Transcript (`te-16__Mohan__r0__te`): నా అకాంట్ నుండి ఇరావాయ వేలు రుపీస్ డెబిటాయి పోయఈ ఆయిసియాయి బాంక ఒక గంటకృతం కస్టమర్ కియర్ కాల్ చేసాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 20000 | 1000 | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 7. kn-01 (story) - fails 100% of 5 runs

- Reference: ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು
- Transcript (`kn-01__Gagan__r0__kn`): ನನ ಸಬೈ ಕಾತೆಯಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ. ಹತ್ತು ನಿಮಿಷಿಗಳ ಹಿಂದೆ ಒಬ್ಬರು ಕೈಕ ಅಪ್ಪೇಟ್ ಮಾಡಲು ಹೇಳಿದರು.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 5000 | 1000 | 5000 | **extractor_form**: value is in the transcript but not parsed |
| time | fn | today 11:50 (10 min ago) | - | today 11:50 (10 min ago) | **extractor_form**: near-spelling variant of: ನಿಮಿಷಗಳ |
| scamType | fn | fake_kyc | - | fake_kyc | **asr**: ASR lost/changed: KYC |
| bank | fn | State Bank of India (SBI) | - | State Bank of India (SBI) | **asr**: ASR lost/changed: SBI |

### 8. kn-16 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: ನನ್ನ account ಇಂದ 20,000 rupees debit ಆಯ್ತು, ICICI bank, ಒಂದು ಗಂಟೆ ಹಿಂದೆ customer care ಗೆ ಕಾಲ್ ಮಾಡಿದ್ದೆ
- Transcript (`kn-16__Gagan__r0__kn`): ನನ ಆಕಾಂಟಿಂದ ಇಪಟ್ಟು ಸಾವರಿದ ರುಪಿಸ್ಟೆ ರುಪಿಸ್ಟೆ ಆಯತು ಎಸೇಶಿ ಬಾಗ್ಗು ಒಂದು ಗಂಟೆ ಹಿಂದೆ ಕಾಸ್ಟಮರ್ಗೆ ಕಾರಗೆ ಕಾಲ್ಮಾಡಿದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care |
| bank | fn | ICICI Bank | - | ICICI Bank | **asr**: ASR lost/changed: ICICI |

### 9. bn-08 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: একটা ভিডিও কল এসেছিল, রেকর্ড করে এখন ব্ল্যাকমেইল করছে, পেটিএম দিয়ে পনেরো হাজার টাকা দিয়ে দিয়েছি
- Transcript (`bn-08__Bashkar__r0__bn`): একটা ঵্য়া কাল এশে ছিলো রেকার্ড করে একন ব্লাক মেল কুরছে পেটিয়ে পনেরো হাজার তাকা দিয়ে দিয়েছি

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 1000 | 1000 | **extractor**: fails on the reference text too (wrong); value is in the transcript |
| time | fp | - | -1d 12:00 (1440 min ago) | - | **asr**: spurious value from a mis-recognised transcript |
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: ব্ল্যাকমেইল |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: পেটিএম |

### 10. ta-10 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: UPI ID rahul dot kyc at ybl க்கு எட்டாயிரம் ரூபாய் அனுப்பினேன், இருபது நிமிஷத்துக்கு முன்னாடி
- Transcript (`ta-10__Pallavi__r0__ta`): UPI ID Rahul.KYC at YPLQ8RM-RUBAI ANIPPINEN, 20 NIMISHAT THIKKU MUNNADI.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 8000 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |
| time | fn | today 11:40 (20 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| scamType | fp | - | fake_kyc | - | **asr**: spurious value from a mis-recognised transcript |
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 11. ta-04 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: ஒருத்தர் தவறுதலாக பணம் அனுப்பிட்டேன்னு சொல்லி திருப்பி அனுப்ப சொன்னார், நான் கூகுள் பே மூலமா பன்னிரண்டாயிரத்து ஐநூறு ரூபாய் அனுப்பிட்டேன், இரண்டு மணி நேரத்துக்கு முன்னாடி
- Transcript (`ta-04__Pallavi__r0__ta`): ஒருத்தர் தவர்தலாக்கே பணம் அனுப்பிட்டேன்னுற் சொல்லி திருப்டி அனுப்ப சொன்னார் நான் கூகுள் பே மூலமா 12.5.5 அனுப்பிட்டேன் 2 மணி நெரத்துக்கு முன்னாடி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12500 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |
| time | fn | today 10:00 (120 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| scamType | fn | wrong_transfer | - | wrong_transfer | **asr**: ASR lost/changed: தவறுதலாக |

### 12. bn-06 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: টেলিগ্রামে পার্ট টাইম জবের টাস্ক দিয়েছিল, তারপর ইনভেস্ট করতে বলল, আমি সাতচল্লিশ হাজার টাকা দিয়ে দিয়েছি, কোটাক ব্যাংক থেকে
- Transcript (`bn-06__Bashkar__r0__bn`): তেলিগ্রামে পার্টাইন জবে টাস্ক দেছিলো তার পর ইন্রেস্ট কর্তে বল্লো আমি সাক্চুলিষ হাজার তাকা দেদেছি কুটাক বেনক থেকে

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 47000 | 1000 | 1000 | **extractor**: fails on the reference text too (wrong); ASR also lost the value |
| scamType | fn | investment_task | - | - | **extractor**: fails on the reference text too (fn) |
| bank | fn | Kotak Mahindra Bank | - | - | **extractor**: fails on the reference text too (fn) |

### 13. ta-06 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: டெலிகிராம்ல பார்ட் டைம் ஜாப் டாஸ்க் கொடுத்தாங்க, அப்புறம் இன்வெஸ்ட் பண்ண சொன்னாங்க, நான் நாற்பத்தேழாயிரம் ரூபாய் போட்டுட்டேன், கோட்டக் பேங்க்ல இருந்து
- Transcript (`ta-06__Pallavi__r0__ta`): தெலிகிராம்ல பார்்ட்டைம் ஜாப் தாஸ் கொடுத்தாங்க, ஆப்கோரம் இன்வெஸ்ட் பண்ண சொன்னாங்க, நான் 4.3 ராயிரம் ருபாய் கோட்டிட்டேன் கோட்டைக் பேங்களை இருந்து.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 47000 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |
| scamType | fn | investment_task | - | - | **extractor**: fails on the reference text too (fn) |
| bank | fn | Kotak Mahindra Bank | - | - | **extractor**: fails on the reference text too (fn) |

### 14. ta-08 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: ஒரு வீடியோ கால் வந்தது, ரெக்கார்ட் பண்ணி இப்போ மிரட்டல் பண்றாங்க, பேடிஎம் மூலமா பதினைந்தாயிரம் ரூபாய் கொடுத்துட்டேன்
- Transcript (`ta-08__Pallavi__r0__ta`): ஒரு வீடியோ கால் வந்தது ரெக்காட் பண்ணி இப்போ மிறட்டல் பண்டாங்க பேடியம் மூலமா 14 ருபாய் குடுத்து தேன்

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |
| scamType | fn | sextortion | - | sextortion | **extractor_form**: near-spelling variant of: மிரட்டல் |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: near-spelling variant of: பேடிஎம் |

### 15. ta-12 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: இரண்டாயிரத்து ஐநூறு ரூபாய் கட் ஆயிடுச்சு, அரை மணி நேரத்துக்கு முன்னாடி, இந்தியன் வங்கி
- Transcript (`ta-12__Pallavi__r0__ta`): 2.5 ருபாயி கட் ஆயிடுச்சு அரை மணி நெரத்துக்கு முன்னாடி இந்தியன் வங்கி.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2500 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |
| time | fn | today 11:30 (30 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| bank | fn | Indian Bank | - | - | **extractor**: fails on the reference text too (fn) |

### 16. ta-16 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: என் account-ல இருந்து 20,000 rupees debit ஆயிடுச்சு, ICICI bank, ஒரு மணி நேரத்துக்கு முன்னாடி customer care-க்கு கால் பண்ணேன்
- Transcript (`ta-16__Pallavi__r0__ta`): என்லை இருந்து 20தாயரம் ருப்பீஸ் டெபிட் ஆயிடுச்சு ICICI Bank ஒரு மணி நெருத்துக்கு முன்னாடி காஸ்டுமாக்கு கால் பண்ணேன்.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 20000 | - | 20000 | **asr**: value not in the transcript |
| time | fn | today 11:00 (60 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: customer care-க்கு |

### 17. te-06 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: టెలిగ్రామ్‌లో పార్ట్ టైమ్ జాబ్ టాస్క్‌లు ఇచ్చారు, తర్వాత ఇన్వెస్ట్ చేయమన్నారు, నేను నలభై ఏడు వేల రూపాయలు పెట్టాను, కోటక్ బ్యాంక్ నుండి
- Transcript (`te-06__Mohan__r0__te`): టెలిగ్రామ్ లో పార్ టైమ్ జాబ తాస్క్లు ఇచ్చారు తరువాత ఇంవిస్ట్ చేయమన్నారు నేను నలభాయ్ ఏడు వేల రూపాయలు పిట్టాను కోటక బైంక్ నుండి.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 47000 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |
| scamType | fn | investment_task | - | - | **extractor**: fails on the reference text too (fn) |
| bank | fn | Kotak Mahindra Bank | - | - | **extractor**: fails on the reference text too (fn) |

### 18. te-07 (story) - fails 100% of 5 runs

- Reference: ఒక QR కోడ్ పంపి స్కాన్ చేస్తే డబ్బులు వస్తాయన్నారు, స్కాన్ చేయగానే ₹4,999 పోయాయి, ఈరోజు ఉదయం 10 గంటలకు
- Transcript (`te-07__Mohan__r0__te`): ఉక క్యువార కోడ్ పంపి స్కాం చేస్తే డబ్బులు వస్తాయనారు స్కాం చేయేగానే నాలుగు వేల తుమ్మిది వందల తుమ్మ్మిది రూపాయలు పోయాఈ ఈ రోజు వుదియం పది గంటలకు

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | fn | today 10:00 (120 min ago) | - | today 10:00 (120 min ago) | **extractor_form**: key words survive (10 గంటలకు) but the extractor fails |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: స్కాన్ |

### 19. te-08 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: ఒక వీడియో కాల్ వచ్చింది, రికార్డ్ చేసి ఇప్పుడు బ్లాక్‌మెయిల్ చేస్తున్నారు, పేటీఎం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేశాను
- Transcript (`te-08__Mohan__r0__te`): ఉక వీడియో కాల్ వచ్చింది రికాడ్ చేసి ఇపుడు బ్లాక్ మేల్ చేస్తునారు పేటియం ద్వారా పదిహేను వేల రూపాయలు ఇచ్చేసాను.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | - | **extractor**: fails on the reference text too (fn); value is in the transcript |
| scamType | fn | sextortion | - | sextortion | **asr**: ASR lost/changed: బ్లాక్‌మెయిల్ |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: పేటీఎం |

### 20. te-12 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: రెండున్నర వేల రూపాయలు కట్ అయ్యాయి, అరగంట క్రితం, ఇండియన్ బ్యాంక్
- Transcript (`te-12__Mohan__r0__te`): రిండునరవేలరుపాయలు కట్ అయాఈ అరగంటకృతం ఇండియన్ బాంక

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2500 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |
| time | fn | today 11:30 (30 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| bank | fn | Indian Bank | - | - | **extractor**: fails on the reference text too (fn) |

### 21. kn-04 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: ಒಬ್ಬರು ತಪ್ಪಾಗಿ ಹಣ ಕಳುಹಿಸಿದ್ದೇನೆ, ವಾಪಸ್ ಕಳುಹಿಸಿ ಎಂದರು, ನಾನು ಗೂಗಲ್ ಪೇ ಮೂಲಕ ಹನ್ನೆರಡು ಸಾವಿರದ ಐನೂರು ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ, ಎರಡು ಗಂಟೆಗಳ ಹಿಂದೆ
- Transcript (`kn-04__Gagan__r0__kn`): ಒಬ್ಬರು ತಪ್ಪಾಗಿ ಹಣಕಳುವಿಸಿದ್ದೆನೆ ವಾಪಸ್ಕಳುರಿಸಿಯಂದರು. ನಾನು ಗೂಗಲ್ಪೆ ಮೂಲಕ್ಕ ಹನ್ನೆಡು ಸಾವರದ ಆಯನೂರು ರೂಪಾಯಿ ಕಳುವಿಸಿದೆ. ಎರ್ಡು ಗಂಟೆಗಳ ಹಿಂದೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 12500 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |
| time | fn | today 10:00 (120 min ago) | - | - | **extractor**: fails on the reference text too (fn) |
| paymentApp | fn | Google Pay | - | Google Pay | **asr**: ASR lost/changed: ಪೇ |

### 22. kn-05 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: ನನ್ನ ಖಾತೆಯಿಂದ ಐದು... ಇಲ್ಲ ಇಲ್ಲ, ಆರು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು, OTP ಹೇಳಿಬಿಟ್ಟೆ, ಕೆನರಾ ಬ್ಯಾಂಕ್
- Transcript (`kn-05__Gagan__r0__kn`): ನನ್ನ ಖಾತೆ ಇಂದ ಆಯಿದು. ಇಲ್ಲ ಇಲ್ಲ ಆರು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿದು. ಓತ್ ಹೇಳಿಬಿಟ್ಟೆ ಕೆನಣ ಬ್ಯಂಗ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 6000 | 1000 | 1000 | **extractor**: fails on the reference text too (wrong); value is in the transcript |
| scamType | fn | otp_shared | - | otp_shared | **asr**: ASR lost/changed: OTP |
| bank | fn | Canara Bank | - | Canara Bank | **asr**: ASR lost/changed: ಕೆನರಾ |

### 23. kn-07 (story) - fails 100% of 5 runs

- Reference: ಒಂದು QR ಕೋಡ್ ಕಳುಹಿಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು, ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ₹4,999 ಹೋಯಿತು, ಇಂದು ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆಗೆ
- Transcript (`kn-07__Gagan__r0__kn`): ಒಂದು ರಕೋಡ್ಕಳುಹಿಸಿ ಸ್ಕಾನ್ ಮಾಡಿದರೆ ಹಣ ಬರುತ್ತದೆ ಎಂದರು. ಸ್ಕಾನ್ ಮಾಡಿದ ತಕ್ಷಣ ನಾಲ್ಕುಸಾವಿರ ಒಂಬೈನುರ ತೊಂಬತ್ರೂಬತ್ತು ರೂಪಾಯಿ ಹೋಯಿತು. ಇಂದು ಬಳಿಗೆ ಹತ್ತು ಗಂಟಿಗೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 4999 | - | 4999 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 12:00 (0 min ago) | today 10:00 (120 min ago) | **extractor_form**: near-spelling variant of: ಗಂಟೆಗೆ |
| scamType | fn | qr_scan | - | qr_scan | **asr**: ASR lost/changed: ಸ್ಕ್ಯಾನ್ |

### 24. kn-08 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: ಒಂದು ವೀಡಿಯೊ ಕಾಲ್ ಬಂತು, ರೆಕಾರ್ಡ್ ಮಾಡಿ ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ, ಪೇಟಿಎಂ ಮೂಲಕ ಹದಿನೈದು ಸಾವಿರ ರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೇನೆ
- Transcript (`kn-08__Gagan__r0__kn`): ಒಂದು ವಿಡಿಯೋ ಕಾಲ್ಬಂತು ರೆಕಾಡ್ ಮಾಡಿ ಇಗ ಬ್ಲಾಕ್ ಮೇಲ್ ಮಾಡತ್ತಿದ್ದಾರೆ. ಪೇಟಿಯೆ ಮೂಲಕ ಹದಿನೆಯಿದು ಸಾವಿರರೂಪಾಯಿ ಕೊಟ್ಟಿದ್ದೆಯನೆ.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 15000 | - | 1000 | **extractor**: fails on the reference text too (wrong); ASR also lost the value |
| scamType | fn | sextortion | - | sextortion | **extractor_form**: near-spelling variant of: ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ |
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: ಪೇಟಿಎಂ |

### 25. en-04 (story) - fails 100% of 6 runs

- Reference: Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye hai, PhonePe se, abhi abhi
- Transcript (`en-04__Neerja__r0__en`): । । । ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 6000 | - | 6000 | **asr**: value not in the transcript |
| time | fn | today 12:00 (0 min ago) | - | today 12:00 (0 min ago) | **asr**: ASR lost/changed: abhi |
| paymentApp | fn | PhonePe | - | PhonePe | **asr**: ASR lost/changed: PhonePe |

### 26. mr-08 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: एक व्हिडिओ कॉल आला, रेकॉर्ड करून आता ब्लॅकमेल करत आहेत, पेटीएमवरून पंधरा हजार रुपये दिले
- Transcript (`mr-08__Aarohi__r0__mr`): एक विडियो कॉल आला, रेकॉर्ड करून आता ब्लाकमेल करता है, पेटी एम वरून पंधरा हजार रुपे दिले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 15000 | 1000 | 1000 | **extractor**: fails on the reference text too (wrong); value is in the transcript |
| scamType | fn | sextortion | - | sextortion | **extractor_form**: near-spelling variant of: ब्लॅकमेल |
| paymentApp | fn | Paytm | - | Paytm | **extractor_form**: key words survive (पेटीएमवरून) but the extractor fails |

### 27. hi-11 (story) - fails 100% of 5 runs

- Reference: डेढ़ लाख रुपये गए हैं मेरे, बैंक ऑफ बड़ौदा का अकाउंट है, कल रात दस बजे
- Transcript (`hi-11__Madhur__r0__hi`): देड़ लाख रुपए गए हैं मेरे बैंक आफ बड़ादा का अकाउंट है कल रात दस बजे

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 150000 | 100000 | 150000 | **extractor_form**: value is in the transcript but not parsed |
| bank | fn | Bank of Baroda | - | Bank of Baroda | **extractor_form**: near-spelling variant of: बड़ौदा |

### 28. mr-18 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: अडीच लाख रुपये गुंतवणुकीच्या नावाखाली घेतले, पैसे दुप्पट होतील म्हणाले, येस बँक
- Transcript (`mr-18__Aarohi__r0__mr`): अडीच लाख रुपे गुंतवनु की चा नावा खाली घितले, पैसे दुपपट होतील मनाले, येस बंक.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | investment_task | - | - | **extractor**: fails on the reference text too (fn) |
| bank | fn | Yes Bank | - | - | **extractor**: fails on the reference text too (fn) |

### 29. en-13 (story) - fails 100% of 6 runs, also fails on reference text

- Reference: Kal raat saade nau baje kisi ne call kiya bola bijli ka bill pending hai, link pe click kiya aur nau hazaar nau sau ninyanve rupaye kat gaye
- Transcript (`en-13__Neerja__r0__en`): ।

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 9999 | - | 9900 | **extractor**: fails on the reference text too (wrong); ASR also lost the value |
| time | fn | -1d 21:30 (870 min ago) | - | -1d 21:30 (870 min ago) | **asr**: ASR lost/changed: raat saade nau baje |

### 30. en-16 (story) - fails 100% of 6 runs

- Reference: Aaj subah 10 baje ek message aaya, QR scan karne ko bola, scan kiya aur dhai hazaar rupaye chale gaye
- Transcript (`en-16__Neerja__r0__en`): Today, a message in the morning, QR scan to get a scan and 50000 rupees went on.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 2500 | 50000 | 2500 | **asr**: value not in the transcript |
| time | wrong | today 10:00 (120 min ago) | today 09:00 (180 min ago) | today 10:00 (120 min ago) | **asr**: ASR lost/changed: 10 baje |

### 31. mr-20 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: म्हणजे... काल दुपारी अडीच वाजता फोनपे वरून दोन हजार सहाशे रुपये गेले
- Transcript (`mr-20__Aarohi__r0__mr`): मनजे, काल दुपारी अडीच वाजता फोन पे वरून 2,100 रुपे गिले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 2600 | - | 2000 | **extractor**: fails on the reference text too (wrong); ASR also lost the value |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (फोनपे) but the extractor fails |

### 32. mr-03 (story) - fails 100% of 5 runs

- Reference: काल संध्याकाळी सात वाजता कस्टमर केअरमधून फोन आला, AnyDesk इन्स्टॉल करायला सांगितलं, मग एचडीएफसी खात्यातून दोन लाख रुपये काढले
- Transcript (`mr-03__Aarohi__r0__mr`): काल संध्याकाली साथ वाजता कस्टमर केर मधून फोन आला, एने डेस्क इंस्टॉल करायला संगितल, मग HDFC खात्यातून दोन लाख रुपे काडले.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | -1d 19:00 (1020 min ago) | -1d 12:00 (1440 min ago) | -1d 19:00 (1020 min ago) | **extractor_form**: near-spelling variant of: संध्याकाळी |
| scamType | fn | fake_customer_care | - | fake_customer_care | **asr**: ASR lost/changed: AnyDesk |

### 33. hi-15 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये
- Transcript (`hi-15__Madhur__r0__hi`): पैसे कट गए UTR नंबर है 403218 765 432 5000 रुपए

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | fn | 5000 | - | 50000 | **extractor**: fails on the reference text too (wrong); value is in the transcript |
| utr | fn | 403218765432 | - | - | **extractor**: fails on the reference text too (fn); value is in the transcript |

### 34. en-15 (story) - fails 100% of 6 runs, also fails on reference text

- Reference: The number that called me was plus 91 70112 23344
- Transcript (`en-15__Neerja__r0__en`): The number that called me was plus 9-17011-23344.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectPhone | fn | 7011223344 | - | - | **extractor**: fails on the reference text too (fn); ASR also lost the value |

### 35. mr-02 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: दादा लवकर, माझ्या खात्यातून साडेतीन हजार रुपये गेले, फोनपे वरून, आत्ताच झालं
- Transcript (`mr-02__Aarohi__r0__mr`): दादा लवकर माझा खात्यातून सालेतीन हजार रुपे गेले फोन पे वरून आत्ता जाला.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 3500 | 1000 | 1000 | **extractor**: fails on the reference text too (wrong); ASR also lost the value |
| paymentApp | fn | PhonePe | - | PhonePe | **extractor_form**: key words survive (फोनपे) but the extractor fails |

### 36. mr-10 (story) - fails 100% of 5 runs

- Reference: UPI ID rahul dot kyc at ybl वर आठ हजार रुपये पाठवले, वीस मिनिटांपूर्वी
- Transcript (`mr-10__Aarohi__r0__mr`): आईडी राहूल डियोटी आट वर आठ हजार रुपे पाठावले, वीस मिनिटाम कूर्वी.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| suspectUpi | fn | rahul.kyc@ybl | - | rahul.kyc@ybl | **asr**: value not in the transcript |

### 37. hi-08 (story) - fails 100% of 5 runs

- Reference: एक लड़की का वीडियो कॉल आया, रिकॉर्ड करके ब्लैकमेल कर रहे हैं, अब तक पंद्रह हज़ार रुपये दे चुका हूँ पेटीएम से
- Transcript (`hi-08__Madhur__r0__hi`): एक लड़की का विडियो कॉल आया, रिकॉर्ड करके ब्लैकमेल कर रहे हैं, अब तक 15,000 रुपए दे चुका हूँ पेटी इन से.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| paymentApp | fn | Paytm | - | Paytm | **asr**: ASR lost/changed: पेटीएम |

### 38. en-12 (story) - fails 100% of 6 runs

- Reference: Rs. 2,50,000 debited from my Bank of Baroda account this morning at 9:30
- Transcript (`en-12__Neerja__r0__en`): 2,50,000 rupees debited from my Bank of Baroda account this morning at 9.30.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| time | wrong | today 09:30 (150 min ago) | today 09:00 (180 min ago) | today 09:30 (150 min ago) | **extractor_form**: key words survive (9:30) but the extractor fails |

### 39. hi-22 (story) - fails 100% of 5 runs, also fails on reference text

- Reference: बैंक वाले बनके फोन आया, बोला पैन कार्ड अपडेट करो वरना अकाउंट ब्लॉक हो जाएगा, लिंक पे क्लिक किया और चौदह हज़ार रुपये कट गए, स्टेट बैंक
- Transcript (`hi-22__Madhur__r0__hi`): बैंक वाले बनके फोन आया, बोला पैन कार्ड अपडेट करो वरना अकाउंट ब्लॉक हो जाएगा, लिंक पे क्लिक किया और 14,000 रुपए कट गए, स्टेट बैंक

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| scamType | fn | fake_kyc | - | - | **extractor**: fails on the reference text too (fn) |

### 40. en-17 (story) - fails 100% of 6 runs

- Reference: Do lakh pachas hazaar rupaye invest karwaye trading app mein, bola paisa double hoga, Yes Bank se gaye
- Transcript (`en-17__Neerja__r0__en`): Do luck purchase, 1000,000 rupees invest kervayet trading app me bola paisa double ho ga? Yes bank se gaye.

| Field | Outcome | Expected | Got (ASR) | Got (reference) | Diagnosis |
|---|---|---|---|---|---|
| amount | wrong | 250000 | 1000000 | 250000 | **asr**: value not in the transcript |
