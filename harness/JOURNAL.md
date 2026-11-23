# Harness journal

What each change to the extractor did, measured end to end. The setup:

- **Audio:** 280 spoken fraud reports in 7 languages, voiced with edge-tts.
- **Variations:** synthetic noise and speaking rate.
- **Transcription:** local Whisper large-v3-turbo.
- **Extraction and scoring:** Turant's on-device extractor, scored per field.

Everything is reproducible:

```
.\run.ps1 -Name <round>        # or: node run_eval.mjs --name <round>   (about 5 s; audio and transcripts are cached)
node split.mjs <round> [...]   # dev voice vs held-out voice
```

"Fully correct" means every expected field is right and nothing is invented. That is strict: one wrong or extra field fails the whole report.

## Results by round (23 Nov 2026)

| Round | Change | Reference text | ASR clean | Held-out voice (clean) | 15 dB | 5 dB | Field F1 (clean) |
|---|---|---|---|---|---|---|---|
| baseline | extract.ts before today | 55.7% | 27.2% | 29.4% | 24.6% | 19.3% | 51.0 |
| round1 | + indic-numbers parsers wired in (amount, time and bank backstops) | 91.8% | 33.0% | 35.9% | 27.9% | 23.2% | 60.3 |
| round2 | + sound-alike repair of number words; fuzzy and glued currency words | 91.8% | 36.5% | 40.0% | 31.8% | 25.4% | 63.2 |
| round3 | + time words matched by sound (மனிக்கு, নিমিশাল, আদ ঘন্টা, দসটায়) | 91.8% | 37.7% | 40.9% | 32.1% | 25.4% | 64.9 |
| round4 | + digit-by-digit IDs, native ID context, scam words in all 7 languages, 4 false-positive fixes | 100.0% | 39.7% | 43.1% | 34.6% | 27.1% | 66.7 |
| round5 | + Tamil i/e, anusvara/chandrabindu | 100.0% | 39.7% | 43.1% | 34.6% | 27.5% | 66.8 |
| round6 | + short-multiplier and final-virama repair (found by the mutation fuzz; no change on this corpus) | 100.0% | 39.7% | 43.1% | 34.6% | 27.5% | 66.8 |
| round7 | + bank names: dotted and letter-by-letter acronyms, आफ for "of", near-miss names before "bank" | 100.0% | 41.0% | 44.1% | 36.1% | 29.3% | 67.8 |
| round8 | + standard alternate spellings (देड़, धाई, రిండు, mr नव), spaced app names (ফোন পে, पेटी एम), split scam words (केवाई सी), glued half-hour (अर्ध्यातासा); two bare single digits never form one amount | 100.0% | 43.5% | 45.6% | 37.9% | 30.4% | 70.3 |

**Net change:**

| Measure | Before | After |
|---|---|---|
| Clean speech, fully correct | 27.2% | 43.5% (+16.3 points, about 1.6×) |
| Field F1 | 51.0 | 70.3 |
| Reference text, fully correct | 55.7% | 100% |

No round broke a field that an earlier round got right. Each round's diff against the previous one is checked run by run.

The Round 2 voice kit's fraud app went through the same fixes (`run_eval.mjs --extractor kit`):

| Measure | Before | After |
|---|---|---|
| Reference text | 91.4% | 100% |
| Clean ASR | 37.5% | 43.0% |

## How we kept it honest

- **The reference text was the tuning set.** The 100% on reference text is a training score. The ASR transcripts are the test.
- **Dev and held-out voices.** Each language has two (English: three) Indian neural voices. We read only the first voice's transcripts when looking for patterns; the other voices are held out.
  - Held-out gained about as much as dev: 29.4% → 45.6%, against 24.6% → 41.1% for dev. The fixes generalise and are not fitted to one voice.
- **Fixes are rules, not word lists.** Examples:
  - Letters that sound alike (ர/ற, ত/ট, ण/न).
  - Vowel length.
  - A dropped virama.
  - Currency glued onto the number.

  The few aliases added are standard alternate spellings (అయిదు, সারে, కృతం).
- **Mutation fuzz** (`round2-kit/indic-numbers`, `tsx fuzz.ts <n> <seed> mutate`):
  - Each generated amount gets one ASR-style slip and is parsed with repair on and off.
  - With repair: **99.6-100% read correctly** in every language. Without: 24-65%.
  - Wrong values with repair: at most 0.4%. These are Bengali সাত/ষাট ambiguities, where it abstains on the word.
  - Laptop 2 runs this at 100k phrases per language per seed.
- **False-repair scan.** Every token of all 1,510 real Whisper transcripts was checked for words that turn into numbers only through repair.
  - 28 distinct words did, and all 28 are genuine misspelled numbers: తుమ్మిది = 9, ಎರ್ಡು = 2, কুডি = 20, अडिच = 2½ …
  - Ordinary words are never turned into numbers.
- **Aliases are vetted.** One candidate, ಆಯಿದು for 5, was dropped: it is also how Whisper writes ಆಯಿತು ("happened").
- **Plain fuzz:** 14k amounts and 7k times per run, plus 700k each on laptop 2 across 10 seeds, all 100%.

## Rules vs LLM (NVIDIA NIM, nemotron-3.5-bolt), same transcripts, same scorer

Run with `node llm_fill.mjs` and `run_eval.mjs --llm <slug> --policy <p>`.

| Policy | Reference | ASR clean | Held-out clean |
|---|---|---|---|
| rules (on-device, offline) | 100% | 39.7% | 43.1% |
| LLM only | 25.7% | 16.5% | 17.2% |
| rules + LLM fills any missing field | 30.0% | 18.5% | n/a |
| rules + LLM fills scam type, bank, app | 45.7% | 22.7% | n/a |
| rules + LLM fills bank, plus amount/phone/UTR only if visible in the text | 99.6% | 41.2% | 44.4% |
| **rules after round7 (offline)** | **100%** | **41.0%** | **44.1%** |

Why the LLM loses here:

- **It invents fields.** It fills "when" with "now" when no time was said, guesses a scam type, and flags "skip" when nobody skipped.
- **It gets day arithmetic wrong.** "कल शाम 7 बजे" (yesterday 7 pm) came back as today 7 pm.
- **Wrong fields fail the report.** In a police complaint an invented field is a real error.

The one thing it did better, garbled bank names, we then taught the offline matcher. Round7 matches the best hybrid without a network call, a 1.2 s wait, or any cost.

**Decision:** on-device rules first. An LLM is at most an optional online fallback for a missing bank.

## What is left

- **Remaining clean-ASR field errors** (round7):
  - 84% are the recogniser losing the words.
  - 16% have the value still in the transcript in a form we don't parse.
  - 0% are extractor bugs on correct text.
- **Ceiling for extractor work alone:** 47% of clean runs.
- **By language:**
  - Hindi and English are at 72-74% fully correct on clean speech.
  - Bengali, Tamil, Telugu and Kannada are at 16-25%. Whisper's word error rate there is 75-134%.
  - Most of the remaining gain is in speech recognition (a better Indic ASR, e.g. Sarvam, or hotword prompting) and in the confirmation UX, not in more extraction rules.
- **Whisper is a stand-in.** The app uses the phone's own speech recogniser (Web Speech), which cannot be benchmarked automatically. A real-phone test script is in `research/findings-2026-11-23.md`.
