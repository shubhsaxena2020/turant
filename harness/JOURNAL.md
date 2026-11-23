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
| round9 | + a bare "thousand" after an unreadable word is not ₹1,000 (abstain, the app asks); a rule that read only "thousand" defers to the full reading | 100.0% | 43.5% | 45.6% | 37.9% | 30.4% | 71.5 |
| round10-13 | + Telugu నూట, kit generic fixes, a `\x01` regex bug fix (no change here); ಆಯಿದು before a multiplier, read-out split before "<digit> thousand", sound-alike hour before o'clock (साथ वाजता), kn/te i/e, ಬಳಿಗ್ಗೆ, masked "ACXX" digits not money; Devanagari-vs-Latin keywords by sound | 100.0% | 44.0% | 45.9% | 37.9% | 30.4% | 72.0 |
| round14 | + Whisper's Hindi spellings (साधे, सुभा, ज्यारा, "के YC", "पेटी इन"); UTR digit groups that run into "<amount> रुपए" | 100.0% | 45.2% | 46.3% | 38.6% | 30.4% | 72.4 |
| round15 | + "fon pay" = PhonePe; a Latin bank acronym one letter off (HTFC = HDFC, 4+ letters only) | 100.0% | 45.5% | 46.3% | 38.6% | 30.4% | 72.6 |
| round16 | + Marathi Whisper forms (कूर्वी = पूर्वी, glued सालेतीन); digit read-outs accept sound slips inside the run (डोन = दोन, साथ = सात, never साठ: the context allows only 0-9), never starting on "ref नो" | 100.0% | 47.0% | 46.9% | 38.6% | 30.7% | 73.4 |
| round17 | + Bengali zero (শূন্য was missing), পাচ / সত্তোর / আরাই / নশো / হজার, শোয = ছয় only before a multiplier, glued পাঁচহাজার | 100.0% | 48.3% | 47.5% | 39.6% | 30.7% | 73.9 |
| round18 | + zero in Tamil / Telugu / Kannada (was missing) and "zero" as a loanword in every script (no change here; needed for real read-outs) | 100.0% | 48.3% | 47.5% | 39.6% | 30.7% | 73.9 |
| round19 | + Telugu Whisper spellings (అయదు, ఇరావాయ, తుమేది, glued రిండునరవేల), ఒంటి గంట = the digit 1 inside a read-out, independent-vowel slips (ఏ/ఎ), time units by sound; no amount if the money itself was misheard and no readable amount sits next to a currency word | 100.0% | 50.0% | 48.4% | 40.4% | 31.1% | 75.7 |

**Net change:** (round9 changed no outcome to correct; it turned 87 wrong amounts into "ask again", raising clean-ASR amount precision from 67% to 76%)

| Measure | Before | After |
|---|---|---|
| Clean speech, fully correct | 27.2% | 50.0% (+22.8 points, about 1.8×) |
| Field F1 | 51.0 | 75.7 |
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

## Confidence: can the app confirm only what is likely wrong? (`node calib.mjs round9`)

| Confidence of a returned value | Right |
|---|---|
| 0.80 or more | 89% |
| 0.60-0.79 | 71% |
| below 0.60 | 12% |

- **Time:** well calibrated (91% → 12% across the bands).
- **Amount:** was not (75% / 78% / 72%), so we looked for what predicts a wrong amount:
  - **Language:** Hindi 97% right, Tamil 26%.
  - **A missing currency word:** 57% right.
  - **A value under ₹100:** **0 of 23 right.** 12 had lost a "thousand", 6 a "lakh".
- **What the app does now:**
  - A spoken amount under ₹100 gets low confidence and is not written into the letter from the story.
  - When the user says it as an answer, the read-back offers the likely fix: "₹5. Is that right? Or ₹5,000?", with one-tap rows for ₹5,000 and ₹5,00,000.
  - End-to-end test with a scripted recogniser: `round2-kit/demo-video/e2e_magnitude.mjs`, PASS. Screenshots are in `prototype/screenshots/magnitude/`.

## Beyond fraud: any voice-kit app (`kit_apps_eval.mjs`, Round 2 readiness)

For the Round 2 problem, whatever it turns out to be, this harness scores any voice-kit app on a text corpus, matching every field by its slot type:

```
..\round2-kit\indic-numbers\node_modules\.bin\tsx kit_apps_eval.mjs [app] [--corpus kit|kit-heldout] [--show]
```

Results, by corpus:

| Corpus | khata | health | civic | Note |
|---|---|---|---|---|
| `corpus/kit`, 42 fresh cases, first run | 38% | 79% | 42% | before any kit changes |
| `corpus/kit` after fixes | 100% | 100% | 100% | these cases were then used for tuning |
| `corpus/kit-heldout`, 21 cases written later in other styles, **first run** | **38%** | **71%** | **50%** | the honest generality number |
| `corpus/kit-heldout` after 5 generic fixes | 50% | 86% | 50% | now partly dev too |

The generic fixes that came out of this:

- **Names:**
  - Titles (bhaiya, दीदी, Mrs) are skipped.
  - "X aaya", a glued ने (सुनीलने), a name followed by a quantity, and "This is Rahul" all give the name.
- **Number slots** fall back to the cross-language parser ("baavan saal" = 52).
- **Durations:**
  - "hafte se" and "for a week" mean one week.
  - "कल रात से" ("since last night") means one day.
- **Location markers** glued onto the landmark (शाळेजवळ) still give the place.
- **Quantities:** "half a kilo".
- **English keywords** match their inflections ("coughing" for "cough").

**On speech** (`kit_apps_eval.mjs --asr plan_kit.json`, 136 Whisper transcripts, 2 voices per language, clean):

| Set | khata | health | civic |
|---|---|---|---|
| dev, first run (fair scoring) | 40% | 37% | 15% |
| dev, after speech fixes | 46% | 40% | 38% |
| held-out, first run | 12% | 27% | 23% |

"Fair scoring" means text fields are compared by sound across scripts, so Whisper writing "स्टेशन रोड" for "station road" isn't marked wrong.

The speech fixes were generic:
- **Unit words** match by sound: हफते = हफ्ते.
- **Latin keywords** match words spoken in Devanagari by sound: आता = aata, डूढ = doodh, नकत = nakad. Whisper and Chrome write Hinglish this way.
- **Misheard "ward":** वाड, wad, watt.

Speech, not text, is the bottleneck for every app, and the gap is largest in bn/ta/te/kn.

**Lesson for Round 2:** what's left on the held-out set is almost entirely domain vocabulary in each language:

- फोनपे written in Devanagari
- "owes me"
- পরে দেবে ("will pay later")
- ஜிபே (GPay)
- कूड़े (garbage)
- డ్రైనేజ్ (drainage)

So on day 1 of Round 2: write the keyword lists in all languages, write 30-50 cases, then loop this harness.

## Experiment: biasing Whisper with domain words (`asr_hotwords.py`), not adopted

The 600 clean clips were re-transcribed with per-language hotwords (currency, thousand / lakh, time words, bank and app names), then scored with the same round-16 extractor (`run_eval.mjs --transcripts transcripts_hw`).

| | Without hotwords | With hotwords |
|---|---|---|
| Word error rate (clean) | 75% | 70% |
| Fully correct, all clean | 47.0% | 46.5% |
| Fully correct, dev voice | 47.1% | 45.4% |
| Fully correct, held-out voice | 46.9% | 47.5% |

- **By language (fully correct):**
  - Gains: Telugu 26% → 33%, Tamil 16% → 20%.
  - Losses: Hindi 90% → 83%, Marathi 60% → 53%.
- **By field:** scam type and bank F1 rise (+3 to +5), amount F1 falls about 2 points.
- **Lesson:** fewer word errors do not mean more correct reports. The words the extractor needs (numbers) did not improve.
- **Decision:** not adopted. The app uses the phone's own recogniser, which has no hotword control; per-language hotwords (te/ta only) are worth revisiting if we move to a server-side ASR.

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
