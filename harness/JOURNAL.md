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
| round20 | + Tamil Whisper forms (70தாயிரம், அயாயிரம், பதனேந்தாயிரம், ஒந்தரை, மோன்று), Tamil scam words; Bandhan only before "bank" (பண்டாங்க = "did") | 100.0% | 50.7% | 48.8% | 40.4% | 31.1% | 76.5 |
| round21 | + Kannada Whisper forms (ಸಾವರದ, ವಂದು ಅರೆ ಲಕ್ಷ, ಯಪತ್ತು …), "just now" split in two words, short/long vowel letters; one shared read-out digit reader (ಆಯದು = 5 only inside a read-out); an amount followed by an unreadable number-like word is incomplete: ask (21 wrong amounts → ask, 0 right ones lost) | 100.0% | 51.5% | 49.4% | 40.7% | 31.1% | 77.4 |
| round25 (24 Nov) | + spellings found on large-v3 transcripts (below): "7 p.m.", देड लाख, ருபீஸ், ಆಯದು ಸಾವಿರ, ಪೇಟಿಯಂ, केवा ऐसी, रुपे; Telugu written in Kannada letters read as Telugu | 100.0% | 52.0% | 50.3% | 41.1% | 31.4% | 77.7 |
| round26 | + a 12-digit UTR glued to a round amount ("4032187654325000 रुपए"); नमबर = number; a 7+ digit run under "number" is never an amount | 100.0% | 52.0% | 50.3% | 41.1% | 31.4% | 77.7 |
| round27 | + misspelled numbers in number context only (छै, बारा सौं, laak, লাক, পাঁছ / আঠ before হাজার, ಸಾವಿರು / ಸಾವಿಳ, ಎರ್ಡು, ವರೆ, இரண்டறே); "saade 3000" = 3,500 | 100.0% | 52.0% | 50.3% | 41.1% | 31.8% | 77.9 |
| round28 | + garbled "KYC update" (কাইক আপডেট, ಕೆಕ್ ಅಪ್ಪೇಟ್; not "कुछ अपडेट"); single digits inside a spoken read-out ("9, 8, 7 … பூஜ்யம்"); 9-10 digits after "who?" are not an account (13 spurious accounts gone) | 100.0% | 52.8% | 51.6% | 41.1% | 31.8% | 78.3 |

**Net change:** (round9 changed no outcome to correct; it turned 87 wrong amounts into "ask again", raising clean-ASR amount precision from 67% to 76%)

| Measure | Before | After |
|---|---|---|
| Clean speech, fully correct | 27.2% | 51.5% (+24.3 points, about 1.9×) |
| Field F1 | 51.0 | 77.4 |
| Reference text, fully correct | 55.7% | 100% |

Each round's per-run diff against the previous one was checked. Real regressions were fixed before committing. What remains as "newly wrong" in some rounds is the extractor now faithfully reading digits Whisper misheard (it used to miss them); the app reads those back for correction. Each commit message lists them.

The Round 2 voice kit's fraud app went through the same fixes (`run_eval.mjs --extractor kit`):

| Measure | Before | After |
|---|---|---|
| Reference text | 91.4% | 100% |
| Clean ASR | 37.5% | 50.5% |

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
| dev, after round22 (honorifics as Whisper writes them, "चार सो पचास", "टोटल 950") | 60% | 40% | 38% |
| dev, after round23 (digits then a number word are two numbers: "वय 40 दोन" ≠ 42; English number words in Devanagari, फाइव साल) | 60% | 50% | 38% |
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

## Experiment: Whisper large-v3 instead of large-v3-turbo (24 Nov), adopted as the second ASR

`asr_alt.py` loads OpenVINO's `whisper-large-v3-int8-ov` in-process on the laptop GPU and writes `transcripts_lv3/`; it does not touch the clipping project's ASR server. That covers all 1,510 clips (clean, noise, rate, auto-language), about 3.3 s per clip. Then `node run_eval.mjs --transcripts transcripts_lv3`.

Turbo has only 4 decoder layers, and it loses the most on low-resource languages.

| Same extractor (round 28) | turbo | large-v3 |
|---|---|---|
| Clean, fully correct | 52.8% | **65.7%** |
| Clean, held-out voice | 51.6% | **64.4%** |
| Noise 15 dB | 41.1% | 58.2% |
| Noise 5 dB | 31.8% | 43.9% |
| Rate ±15% | 48.6% | 60.7% |
| All forced-language runs | 45.6% | 59.0% |
| Field F1 (clean) | 78.3 | 84.3 |
| WER (clean) | 65.5% | 56.9% |

| Clean, fully correct | hi | en | mr | ta | te | kn | bn |
|---|---|---|---|---|---|---|---|
| turbo | 91% | 78% | 60% | 23% | 40% | 26% | 39% |
| large-v3 | 96% | 89% | 66% | 63% | 55% | 40% | 39% |

- **Before any rule changes**, the model swap alone moved clean runs from 51.5% to 59.7% (held-out from 49.4% to 60.6%).
- **Rounds 25-28 were tuned on large-v3 dev-voice transcripts.** That added +6.0 points on clean runs, and held-out moved 60.6% → 64.4%. On turbo the same rules were neutral to slightly positive (51.5% → 52.8%), with every per-run diff checked.
- **A new large-v3 quirk:** in 21 of 80 Telugu transcripts it writes some words in Kannada letters. `unifyScript` (shared `indic/cleanup.ts`) maps them back.
- **Kit fraud app on large-v3:** 63.7% clean.
- **Product meaning:** this is still a stand-in for the phone recogniser. A server-side large-v3 (or IndicConformer, which needs a gated Hugging Face download that Shubh has to accept) is a real option for a low-end-phone or kiosk mode. It also gives a more realistic tuning target than turbo, whose Tamil WER was 134%.
- **Beam search (`--beams 4`) is not run:** OpenVINO's Whisper pipeline on this GPU rejects it ("Not Implemented" / "Logits batch size doesn't match the number of beams"). On the CPU it would break the 75% CPU cap for about 45 minutes, so it is left out.
- **Rounds 29+ on large-v3:** "bajay" = baje, दुपट = दुप्पट. Clean 66.2%, held-out 64.7%.
- **Round 30 on large-v3** (24 Nov): "के वाईसी" (split KYC), hyphen-spelled acronyms with an orphan vowel sign ("आई-सी-ाई-सी-ाई" = ICICI), நிமிண = minutes, క్రతం = ago, கூபுள்/గూబుల్/गूबल = Google, ஹோன்பே = PhonePe, ஆக்சுஸ் = Axis, रूपीज = rupees, debit words in every script, माहिद नाही = don't know; UPI-only handles keep a glued suffix ("rahul.kyc at ybl.ki"); after a reference word, one number word + one digit group making exactly 12 digits is a UTR ("रेफ नो सहा 12345789012"); a dotted digit chain ("5.00.1.00.2.3", "1.500") is no longer a clock time. Two first drafts made wrong values (a lone debit word turned "20 ருபிஸ்" into ₹20; four comma groups became a UTR) and were tightened (debit-only evidence needs ≥ 100; exactly one group). Clean 66.2 → **66.7%**, held-out 64.7 → **65.0%**, 15 dB 58.6 → 60.4%; turbo 52.8 → 53.0% (held-out 51.6 → 51.9%). Every changed run is an improvement on both ASRs.
- **Round 31 on large-v3** (time words): ಅರ್ಧಗಂಟೆ (glued half-hour), ಸಂಜಿ / সুন্ধা / সন্ধা = evening, ಗಂಟಗೆ / ಗಂಟಿಗೆ = o'clock, গতোকাল / গতুকাল = yesterday, a virama left on a Bengali hour stem (দস্টায় = দশটায়) and -টাই for -টায়; "evening" said with no day and no hour now rolls back to yesterday when it is later than now (the clock branch already did); a correction whose only number is an ungrouped 7+ digit run ("NOMOR BHUL 981112233") asks again instead of filing ₹98 crore. Clean 66.7 → **68.0%**, held-out 65.0 → **66.6%**; turbo 53.0 → **53.7%** (held-out 51.9 → 52.5%). One run got a wrong time where it had none (bn-11: the night word was lost, so দস্টায় reads as 10 am).
- **Round 32** (hour-and-minute phrases, shared `time.ts` `hourMinutePhrase`): "कल रात 9 बजकर 30 मिनट", "9 மணி 30 நிமிடம் மணிக்கு", "2 గంటల 30 నిమిషాలు కి" are clock times (they were read as "30 minutes ago"), and "3 மணி நேரம் 30 நிமிடம் முன்னாடி" / "2 hours 30 minutes ago" are 210 / 150 minutes ago; a clock time is never an amount ("कल रात 9:30 पर पैसे गए" was ₹30); three or more "N.00" are a digit read-out, not 1 o'clock; రోజల = days; KYC in Kannada / Telugu letters (ಕೇವ ಆಯಸಿ, కెవాయసి). Clean 68.0 → **69.3%**, held-out 66.6 → **67.5%**; turbo 53.7 → **54.2%** (held-out 52.5 → 53.1%). No run got worse on either ASR.
- **Kit parity after round 32:** the round 30-32 keyword, currency, debit, time, skip and UPI-suffix fixes, the under-100 rule, the reference words and the `joinSpelled` + `hourMinutePhrase` preprocessing were ported to the voice kit (`joinSpelled` now lives in the shared `cleanup.ts`). Kit fraud app on large-v3: 66.3 → **67.0%** clean (held-out 64.7 → 65.3%); turbo 53.0%. Khata / health / civic unchanged on text and on both ASRs. Not ported yet: the word + digit-group UTR join and the lost-digit correction rule.
- **Kit apps on large-v3 speech** (after भाईया / तैल / वॉड): dev khata 63%, health 57%, civic 38% (turbo 60 / 50 / 42); held-out 12 / 33 / 23%.
- **Extractor-only ceiling on large-v3:** 68.0% of clean runs (we are at 65.7%). By language: hi 98, en 90, mr 73, ta 64, te 56, kn 43, bn 43.

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

## Blind set: new sentences, never tuned on (24 Nov)

The held-out split only changes the *voice*; after 30 tuning rounds the *sentences* are known. So 84 new cases (12 per language, same field mix: stories, answers, corrections; new amounts, banks, apps, names) were written in `corpus/blind/make.py` after round 29, rendered with the same voices, noise and rates (432 clips, `plan_blind.json`), and are scored only in aggregate. Nobody reads the per-case blind failures, and no rule is written from them.

| Extractor | Reference text | large-v3 clean | large-v3 15 dB | turbo clean | turbo 15 dB |
|---|---|---|---|---|---|
| round 29 (before the blind set existed) | 90.5% | 59.4% | 58.3% | 50.6% | 39.3% |
| round 32 | 90.5% | **62.8%** | 61.9% | **51.1%** | 39.3% |
| round 39 (typed-story probes, Marathi, quarter amounts) | **92.9%** | 62.8% | 61.9% | **52.2%** | 40.5% |
| *tuning corpus, round 32, for comparison* | *100%* | *69.3%* | *62.9%* | *54.2%* | *42.9%* |

- **The honest headline number is the blind one:** about 63% of brand-new spoken reports come out fully correct on large-v3, 51% on turbo.
- **Overfitting gap:** about 10 points on clean reference text (90.5% vs 100%) and 6.5 points on large-v3 speech. Rounds 30-32 still gained 3.4 points on the blind set, so the ASR-spelling rules generalise; the text gap is wording the rules have never seen.
- **Re-run:** `node run_eval.mjs --cases corpus/blind.jsonl --plan plan_blind.json [--transcripts transcripts_lv3] --name blind_x --compare none`. To add clips: `HARNESS_CASES=corpus/blind.jsonl HARNESS_PLAN=plan_blind.json HARNESS_TIERS=base,noise,rate python tts.py` (then noise.py, asr.py / asr_alt.py).

## What actually ships: the in-page models (27 Nov)

Everything above measured server-grade Whisper (turbo, large-v3). When the browser's own recogniser fails (it does on Chrome for Windows: it ends its session about 2 s in, or returns one misheard word), the app transcribes **inside the page** with a small ONNX Whisper. `asr_wbase.mjs` runs that exact model on the harness clips (transformers.js on Node, same files, q8), so the numbers below are what a user gets on that path.

| Fully correct reports, clean speech | hi | en | mr | bn | ta | te | kn |
|---|---|---|---|---|---|---|---|
| whisper-base (what shipped until today) | 13.8% | 50.0% | 10.0% | 5.0% | 6.3% | 6.3% | 2.5% |
| Hindi2Hinglish-Swift, before tuning | 58.8% | 57.9%* | 15.0% | | | | |
| **Hindi2Hinglish-Swift, after round 34** | **85.0%** | **61.7%** | **15.0%** | | | | |

\* partial run. Hindi2Hinglish-Swift is Oriserve's whisper-base fine-tune (Apache-2.0, about 102 MB). It writes clean Hinglish ("Mere account se paanch hazaar rupe cut gae… KYC update karo, SBI ka account hai"), where whisper-base wrote Hindi in mixed Urdu, Cyrillic and Latin letters.

- **The app now picks the model by speaking language:** Hindi, English (India) and Marathi use Swift, the rest stay on whisper-base.
- **Round 34** tuned the extractor to Swift's Hinglish:
  - `laakh` = lakh; `shoony` / `tin` = 0 / 3;
  - Hinglish digit read-outs for phones, UTRs and accounts (they were ignored);
  - `pata nahin` = don't know; `access bank` / `stay bank` = Axis / SBI.
  - Hindi went 58.8% → 85.0%. large-v3 and turbo were unchanged run for run.
- **Bengali, Tamil, Telugu and Kannada on the in-page fallback are 2.5-6.3%.** In those languages the browser's recogniser is the real path, and an Indian-language model (IndicConformer, Sarvam, Bhashini, or a converted vasista22 small model) is the next step.
- **Speed:** cross-origin isolation (COOP same-origin + COEP credentialless on Vercel, nginx and vite) gives ONNX Runtime threads. A cached 12-second Hindi story transcribes in about 8.0 s (12.8 s without isolation; the A/B used the same build, clip and profile). The first use downloads the model once (about 100 MB).
- **Recording fixes found on Shubh's laptop** (Chrome, Windows):
  - Our own voice detection ends the turn, so the browser recogniser's early end no longer cuts the recording.
  - A weak browser result (fewer than 3 words or confidence below 0.6) defers to Whisper on the full recording.
  - A suspended AudioContext is resumed.
  - `?speech=whisper` skips the browser recogniser entirely. In tests with a fake microphone, Chrome's recogniser listens to the real room microphone, so demos use this option.

- **Round 35** (English as the Hinglish model writes it): a clock-looking group inside a read-out ("plus 9 1 07:01 2344", "reference number is 06:01 to 34567") is digits, not a time; "double / triple" digits and digit words (Indian English); paanchas = 50; debated = debited; "quote account" = Kotak (shared `cleanup.ts` `spokenDigits`, also in the kit). Hinglish model +3 runs; large-v3, turbo and whisper-base unchanged run for run. Where the model dropped a digit inside a read-out, the app now gives no value instead of a fake time.
- **Blind set on the in-page Hinglish model** (new sentences, never tuned on; `blind_swift35`): Hindi **91.7%** fully correct, equal to the reference-text score for those sentences, so speech recognition loses nothing there. English 52.8% (reference 83.3%), Marathi 25.0% (reference 83.3%).
- **First use is faster:** the in-page model is prefetched while the person is still talking (after ~2 s of voice with no words from the browser, or right away with `?speech=whisper`). Fresh profile, 12-second Hindi story: the wait after speaking drops from ~12.6 s to ~1 s.
- **Round 36** (romanised Marathi, as the in-page model writes it): number words don, saha, dahaa/daah; fractions din / adich / aditi, only right before lakh or thousand; time words vaajata, sakaari, sandhyaakaari, raatri, doopaari, kaal, poorvi, taas, divas, minitaan; kaaple = debited; roope = rupees; maahit naahi = don't know. Context-only number lookups are now case-insensitive ("Din laakh…", "To lock…" at the start of a sentence). Hinglish model +8 runs: Marathi 15.0% → **23.8%**, English 64.2% → 65.0%; blind Marathi 25.0% → **33.3%**. turbo +1, whisper-base +3, large-v3 unchanged, no regressions.
- **Round 37** (generic English fixes found while reading the in-page model's misses):
  - **False times in English, a real bug:** time words matched by prefix, so "I am…", "amount" and "Amazon" read as 9 am today, and "rate" as night. Latin words now match short time words only as whole words, and "am" counts only right after a number ("9 am").
  - **Plain money words:** "the amount was 5000", "he took 5000" gave no amount. amount / rakam / took / taken / stole / cheated / scammed / charged now mark money; a number right after OTP / PIN / CVV / code never does.
  - **Padded read-outs:** Whisper writes a spoken "5 0 1" as "05:01". In every dev read-out the 0 was padding, never spoken (8 of 8), so a clock group inside a read-out now drops it (account 50100234567812, not 0501…).
  - **Split letters:** "ICI C I bank" = ICICI (letter groups that join into a known acronym; 3-letter ones only in capitals).
  - **Present, not past:** "right now" ("my husband is not at home right now"), "abhi tak" (so far) and "abhi bhi" (still) no longer fill the time as "just now"; "abhi abhi" and "just now" still do. Found with 40 neutral English sentences a victim might say (now 1 of 40 fills a field: "post office" = India Post, which is right).
  - Hinglish model 58.9% → **60.4%** (English 65.0% → **68.3%**); **blind 58.3% → 61.9%** (English 52.8% → **61.1%**), on sentences never tuned on. large-v3 69.3% → 69.5% (held-out voices 67.5% → 67.8%), turbo and blind large-v3 unchanged, kit 67.0% → 67.2%. No regressions.
- **Round 38** (12 new English stories written the way a judge might type them; 9 of 12 were fully right, now 12 of 12):
  - "lost Rs 12,500 about 2 hours ago" was read as **12,502 hours** ago (June 2025): the count walked back past "about" into the amount. A hedge word (about / around / lagbhag) now starts the count, and written digits never join a count that already has a word.
  - "Rs 12,500 two hours ago" and "one lakh twenty thousand, two days ago" lost the amount: the number word before hours / days was glued onto it (12,502; 1,20,002). A number word right before a duration word now ends the amount.
  - "about 1 lakh 20 thousand was stolen" got the time 1 pm: "about N" is a clock time only when no amount word (lakh, thousand, rupees…) or duration follows.
  - "4,500 was gone" = money; so are fee / fees / penalty / फीस / शुल्क / जुर्माना ("5000 registration fees li"). 12 new Hinglish stories (Latin script, as the in-page model writes) went 11 → 12 of 12, and 10 in Devanagari (as Chrome writes) 9 → 10 of 10.
  - Harness unchanged run for run on all six report sets (one reference case, "half an hour ago", broke on the first try and was fixed before committing).
- **Round 39** (8 typed Marathi stories in Devanagari, as Chrome writes them; 5 of 8 were fully right, now 8 of 8):
  - Marathi spells the letter I as आय: "एसबीआय", "आयसीआयसीआय" now match SBI / ICICI (an "ay" / "aya" spelling of every acronym).
  - **Bank of Maharashtra** was missing from the bank list ("Bank of Maharashtra", "महाराष्ट्र बँक"; the state name alone is not a bank).
  - Quarter amounts: सवा / सव्वा / সোয়া = 1¼, पौने / पावणे / পৌনে = ¾ ("सवा लाख" = 1,25,000 gave nothing at all; "पावणे दोन लाख" gave 2 lakh). In both the rule extractor and the shared parser.
  - "साडेतीन लाख" gave 1 lakh and "तीन हजार पाचशे" 3,000: the rule read a bare multiplier / a round number and ignored the parser's longer reading. The parser now wins when it only adds a fraction or a smaller tail.
  - Typed stories in Bengali, Tamil, Telugu and Kannada (15, as Chrome writes them): 14 of 15 were already right; the miss was সোয়া লাখ.
  - **Blind set, reference text 90.5% → 92.9%**; blind turbo 51.1% → 52.2%; turbo +1 run; everything else unchanged run for run. Parser fuzz and scorers all still 100%.
- **Round 40** (short answers to the follow-up questions, 30 probes; 28 were right):
  - "When did it happen?" now understands **weekdays and dates**: "on Monday", "last Friday", "25th November", "Nov 25", "25/11", "25 नवंबर", "सोमवार को", and with a time ("on Monday at 7 pm"). Always in the past: a date later than today is last year's.
  - Hindi "25 तारीख को" / "28 tarikh" = that day of this month (last month's if it has not come yet); "pichhle somvar" = last Monday. A date with a day part ("28 tarikh ko shaam ko") beats the bare "evening = yesterday" guess.
  - Not dates: "2 may be 3 thousand" (May needs an ordinal, "of" or a year), "10/12 minutes", "1/2 of my salary" (a bare d/m needs a year, a cue such as "on" / "को", or to be the whole answer).
  - A new `date` kind keeps a bare "today" / "yesterday" from overriding better readings, as before. All six harness report sets unchanged run for run; parser time scorer and fuzz still 100%.
- **Round 41** (romanised Marathi, as the in-page Hinglish model writes it; read only on the dev voice Aarohi):
  - The extractor now takes the **speaking language** the person picked (`lang`; the app passes `ui.speakLang`, the harness each case's language). Marathi-only fixes go in `marathiRoman` (shared `cleanup.ts`), because several are ordinary Hindi words ("se" = from, "saahab" = sir).
  - Digits: "don't" = don (2), "saahab" / "saahas" = saha (6). Hundreds: "nau se" (नऊशे), "paanch se rupe", "donashahar", "sahaashay"; 99: "navyaan / navaay nau". Clock: "dahaavaastha", "vaaraasta", "adhik vaajata" (2:30), "sandhya kar hi" (evening). Ago: "minitaanpurvin", "aappur bhi", "taaza poorvi", "taazaapur bhi", "arthaat taasaapoorvi" (half an hour). "aatach…" = just now. "phone par varun" / "google par varun" = PhonePe / Google Pay. "mahit nahin" = don't know.
  - For all languages: a digit read-out of 6+ digits ends before "<number> hazaar" (a UTR followed by an amount); the parser's reading wins when it only adds a tail below a round hundred ("nau sau ninyanve" = 900 + 99); "ardha" = half; "sandhya" = evening.
  - **In-page model 60.4% → 69.6%** (+36 runs, none lost). Marathi **23.8% → 53.8%**: dev voice 27.5% → 67.5%, **held-out voice 20.0% → 40.0%** (the honest number; the gap is voice-specific spellings). Hindi 85.0% → 87.5%. In noise 55.8% → 60.0% (15 dB) and 35.0% → 39.2% (5 dB). **Blind 61.9% → 64.3%** (Marathi 33.3% → 41.7%). large-v3 +1 run; turbo, kit and blind large-v3 / turbo unchanged run for run.
- **Round 42** (English UPI IDs and read-outs as the in-page model writes them; dev voice NeerjaExpressive):
  - "at Vibyal" = ybl (the letters Y B L said aloud). "sharma 01:23 at Paytm" = sharma123@paytm (digits written as a time, right before "at <handle>"). "06:01 to 34567 890" = 601234567890 (the spoken "two" after a clock group is written "to").
  - **A real bug for every recogniser:** "I paid 2000 at paytm" became the UPI ID 2000@paytm and lost the amount. An all-digit ID now has to be a 10-digit phone number.
  - In-page model **69.6% → 72.5%** (+9 runs, none lost). English 68.3% → **75.0%**, and the gain is as large on the voices never read: Neerja 72.5% → 77.5%, Prabhat 65.0% → 72.5% (dev 67.5% → 75.0%). Everything else unchanged run for run.
- **Round 43:** "phone par se 2600 rupe gae" = PhonePe se ("from phone-par"; "phone par" alone stays "on the phone"). In-page model 72.5% → **73.2%** (Hindi 87.5% → **90.0%**; 2 of the 3 runs on the held-out voice), none lost.
- "Yesterday at 07:00" (spoken "7 pm", Whisper dropped the pm) is left alone on purpose: guessing pm for a bare 7 would only fit this corpus. The read-back lets the person fix it.
- **Indian-language models in the page (28 Nov):** the other four languages were on stock whisper-base (2.5-6.3%). Three open fine-tunes, converted to transformers.js ONNX with `convert_whisper.py` (8-bit weights; the two decoders quantised first and merged after so the 8-bit weights are shared; exported with transformers 4.40 because 4.43+ adds a `cache_position` input transformers.js 3.8 does not send). Measured with `asr_wbase.mjs --local` on all 80 clean clips per language (both voices, no rule changes):

  | Language | whisper-base | Fine-tune | Size | Fully correct | Fields right | Word error |
  |---|---|---|---|---|---|---|
  | Telugu | 6.3% | vasista22/whisper-telugu-base | 103 MB | **68.8%** | 82.0% | 228 → 45 |
  | Kannada | 2.5% | vasista22/whisper-kannada-base | 103 MB | **50.0%** | 71.9% | 388 → 48 |
  | Tamil | 6.3% | vasista22/whisper-tamil-small | 289 MB | **47.5%** | 68.1% | 171 → 49 |
  | Bengali | 5.0% | shamim1122/whisper-small-bangla-onnx | 287 MB | **36.3%** | 56.4% | 165 → 47 |

  - Telugu and Kannada in the page now beat server large-v3 on those languages (61% and 46%).
  - **Shipped:** Bengali (loaded from Hugging Face), Telugu and Kannada (served from the site's `/models/`, not in git). **Tamil, shipped later the same night:** its 196 MB decoder is over Vercel's 100 MB per-file limit, so `split_onnx.py` moves the 8-bit weights into external-data chunks (90 / 66 / 40 MB) that transformers.js 3.8 loads (`use_external_data_format` in config.json). Same weights: 10 of 10 transcripts byte-identical to the unsplit model; checked in the browser (45 s first use).
  - The Docker build fetches the Telugu and Kannada files from the live site (checked from a fresh clone: Kannada clip filled amount and time). A specialised model that fails to load falls back to whisper-base. Checked end to end in Chromium with a harness clip as the microphone (`?speech=whisper`): Bengali (first use 58 s including the 287 MB download), Kannada (29 s), Telugu on the live site (31 s), each filling amount and time.
- **Rounds 44-45 (28 Nov night, robustness):** new `corpus/robust.jsonl` (40 cases, all 7 languages): code-mixed sentences, English digits and "thousand" inside Indian-language speech, lakh / crore / dedh / sava / dhai, self-corrections after the amount ("दीड लाख रुपये गेले, नाही नाही, अडीच लाख"), "5 thousand" as an answer. Reference text **97.5% → 100%**.
  - Tamil spoken thousands: ஐந்தாயிரம் / நான்காயிரம் / மூன்றாயிரம் (the formal ஐயாயிரம் was the only 5,000 known). In-page Tamil 47.5% → 50.0% (both voices +1).
  - A correction after the amount: the first value after the last "no" replaces the money before it, even without a currency word, if it is the same order (×20). The first try broke 7 runs: "UPI Ref **No.** 4321…" read as a correction; "no" before digits or after an ID word is now "number". Final: all seven report sets unchanged run for run, robust set 100%.
  - `eval_all.sh <new> <old>`: every report set (tuning, held-out, blind, kit, robust) re-scored and diffed run by run in one command.
- **Unseen speakers (28 Nov night):** tiers `unseen` / `unseen_noise` (plan_unseen.json): every case read by 2 of 4 Azure multilingual voices never used for tuning (fr-FR Remy / Vivienne, it-IT Giuseppe, pt-BR Thalita; 558 clips + noise). Error analysis reads only the Remy / Vivienne half; Giuseppe / Thalita is the check. `unseen_report.mjs <base> <unseen>`:

  | Path | tuned | held-out | unseen | unseen 15 dB | unseen 5 dB |
  |---|---|---|---|---|---|
  | large-v3, all 7 | 71.8% | 68.8% | **61.6%** | 62.0% | 53.0% |
  | turbo, all 7 | 52.4% | 53.9% | **47.1%** | 44.4% | 34.4% |
  | in-page hi / en / mr | 87.5 / 75.0 / 67.5 | 92.5 / 75.0 / 40.0 | **83.8 / 47.5 / 42.5** | 77.5 / 52.5 / 37.5 | 55.0 / 42.5 / 20.0 |
  | in-page te / kn / ta / bn | 70.0 / 50.0 / 52.5 / 35.0 | 67.5 / 50.0 / 47.5 / 37.5 | **68.8 / 53.8 / 53.8 / 25.6** | 62.5 / 47.5 / 47.5 / 28.2 | 45.0 / 17.5 / 45.0 / 20.5 |

  - **English, split:** on English sentences, unseen speakers get 58.1% in the page (tuning voices 76.3%) and 87.1% on large-v3; on the 18 romanised-Hindi "English" cases read with a European accent, 11.1% and 16.7%. That accent is not a realistic Indian speaker, so the English unseen drop is mostly a property of the test, not the rules.
  - Rounds 47-48 from the analysis half: Marathi spellings (unseen mr 40.0 → 42.5, +1 on each half), Hindi "der laakh" = डेढ़ लाख and "Badauda" (unseen hi 81.3 → 83.8; check half 0, but **blind +1**). No run lost anywhere.
- **Round 49 (robustness audio):** the 40 robustness cases rendered with the tuning and unseen voices (167 clips) and run through every in-page model. Read the tuning-voice failures only; the unseen voices are the check.
  - **"karod" (crore in Latin) was unknown to the shared parser**: "Do karod pachaas laakh" gave 50 lakh, "Dedh karod" 1.5. Fixed (karod / karor / kror).
  - "1 point to laakh" = 1.2 lakh (a decimal read out, "two" as "to"); "access account" = Axis; "through phone par" = PhonePe; Marathi "na hi" = नाही, "adhik laakh" = अडीच लाख.
  - Robust audio, in-page Hinglish model: Hindi tuning 69 → 81%, **unseen 69 → 85%**; English tuning 52 → 86%; Marathi 38 → 50% on both. Telugu / Kannada / Tamil 75% on both voice sets. All report sets unchanged run for run.
- **Round 50 (Bengali spellings of the in-page model, unseen analysis half):** নৈশ্য / নৈশো (900), দূষো (200), নিরানবই / নিরানবী (99), দেড (1.5), লাক (lakh, also glued: দেডলাক), হাজা (thousand). In-page Bengali unseen **25.6% → 34.6%** (analysis +10, **check +1**, held-out tuning voice +1; mostly an analysis-half gain, recorded as such). Turbo +2 in noise. Mutation fuzz unchanged (99.7%); all report sets unchanged run for run.
- **Smaller Bengali model, rejected:** arif11/bangla-ASR-v5 re-converted with 4-bit matrix weights (`convert_whisper.py --bits 4`): 287 → 205 MB, but about 3× slower per clip on CPU and less accurate on the same 25 clips (16.0% vs 20.0% fully correct, word error 43.5 vs 36.9). The 8-bit model stays.
- **Round 51 (large-v3, unseen analysis half):** "AnyDisk" = AnyDesk; Marathi "पूर्वे" = पूर्वी; debit stems without the virama ("ಡೆಬಿಟಾಗಿದೆ"); IDs written in hyphen groups ("501-002-345-678-1-2", 9+ digits; dates untouched); account stem "खत्य". Analysis half +4, check half 0 (none of these patterns occurs there), but **blind turbo 15 dB +1** and large-v3 / turbo / kit tuning sets +2 / +1 / +2: kept.
  - **Tried and reverted:** an 11-digit mobile with a doubled last digit ("98765432100") trimmed to 10. The check half has "99988776655", where the *first* digit is the extra one: trimming guesses, and a wrong number is worse than asking.
- **Blind set 2 (written 28 Nov ~06:00, after round 51):** `corpus/blind2.jsonl`, 42 new cases (6 per language: two stories, a time, an amount, a bank / suspect answer, a correction), committed before any audio was scored. Same rule as blind 1: aggregate scores only, nobody reads its per-case failures, no rule is written from it. **Reference text 97.6%** (41 / 42; blind 1 was 90.5% when it was written at round 29).
  - **How much it was used (weigh it accordingly):** scored three times in aggregate: after round 52 (when written), after round 54 and after round 56 (the English rounds). No rule was written from it and no case was read, but repeated aggregate checks still leak a little. **Frozen after round 56: not re-scored again.** A third blind set, written and committed before scoring, is scored once at the very end for the submission headline.
  - **Audio, aggregate only** (`blind2_report.sh 52`; about 12 clips per language and voice set, so single cells are noisy): large-v3 **68% tuning voices / 73% unseen voices**; in-page models **67% / 67%**. Per language (tuning / unseen), large-v3: hi 83/75, en 72/58, mr 75/50, bn 75/92, ta 42/83, te 75/83, kn 50/67; in-page: hi 83/75, en 33/33, mr 58/42, bn 58/58, ta 75/75, te 92/92, kn 83/92. In-page English is the weak cell and is reported as is (blind cases are not read).
- **Round 52:** Kannada "ನೂರ" (oblique form of ನೂರು, hundred): "ಒಂಬತ್ತು ಸಾವಿರ ಒಂಬತ್ತು ನೂರ ತೊಂಬತ್ತೊಂಬತ್ತು" was 99, now 9,999 (a field-level gain; that run still lacks the bank). All report sets unchanged run for run.
- **Rounds 53-54 (Indian-English phrasing; new `corpus/en_tune.jsonl`, 30 English cases, separate from both blind sets):**
  - Numbers: "one point five lakh" was read as **5 lakh**, "nineteen ninety nine rupees" as **118**; "one and a half lakh", "two and a half thousand", "a lakh and a half", "5 grand" gave nothing. Now 1,50,000 / 1,999 / 1,50,000 / 2,500 / 1,50,000 / 5,000; a year ("in nineteen ninety nine") and a duration ("two and a half hours") stay non-money.
  - Clock: "7 30 pm" = 7:30 pm (was 6 am the next day); "half past nine", "quarter past six", "quarter to eight".
  - Corrections: "it was fifteen hundred, not five hundred" now keeps 1,500 (the value after a final "not" is the rejected one).
  - en_tune reference text 80% → 100%. All report sets unchanged run for run. **Blind set 2, in-page English 33% → 50%** (tuning and unseen voices; aggregate only), in-page overall 67% → 70% / 69%.
- **Rounds 55-56 (English set audio: 300 clips, tuning voices + noise + speed + unseen halves A / B):** large-v3 94% tuning / 87% unseen A / 90% unseen B; in-page 72% / 67% / 87% (clean).
  - From the tuning-voice failures: "half-past nine" with a hyphen; "a lot and a half" (Whisper for "a lakh and a half"); digit groups before rupees ("18 250 rupees" = 18,250; "19 99 rupees" = 1,999); an ordinal before a multiplier ("Twelfth thousand 900" = 12,900); "quota account" = Kotak.
  - In-page English set: tuning +13, **unseen A +6**, unseen B 0 (none of these shapes there). Tuning corpus in-page +1; all other report sets unchanged run for run; **blind set 2 in-page English 50% → 56%** (tuning voices, aggregate only), in-page overall 71% / 69%.
- **Round 57** (from the English tuning voices): a 12-digit UTR whose last group Whisper writes as a time ("UTR 67 23 4589 01:23"). The padding rule from round 36 dropped the 0; it now keeps it only when keeping it, and not dropping it, makes a 10- or 12-digit run. In-page English set unseen A +1 field; every other report set unchanged run for run. Blind set 2 not re-scored.
- **The in-page model in noise** (first measurement, `plan_noise_hienmr.json`, 120 clips per level, traffic / babble / pink noise):

  | Fully correct, Hinglish model | Clean | 15 dB | 5 dB |
  |---|---|---|---|
  | Hindi | 85.0% | 80.0% | 52.5% |
  | English | 68.3% | 62.5% | 32.5% |
  | Marathi | 23.8% | 25.0% | 20.0% |
  | All three | 60.4% | 55.8% | 35.0% |
  | *after round 41:* Hindi / English / Marathi | 87.5% / 68.3% / 53.8% | 82.5% / 62.5% / 35.0% | 55.0% / 32.5% / 30.0% |
  | *after round 41:* all three | **69.6%** | **60.0%** | **39.2%** |
  | *after round 42:* Hindi / English / Marathi | 87.5% / 75.0% / 53.8% | 82.5% / 65.0% / 35.0% | 55.0% / 32.5% / 30.0% |
  | *after round 42:* all three | **72.5%** | **60.8%** | **39.2%** |
  | *after round 43:* all three (Hindi 90.0% / 85.0% / 55.0%) | **73.2%** | **61.7%** | **39.2%** |

  Moderate noise (15 dB, a busy room) costs Hindi 5 points. Loud noise (5 dB, a road) costs about a third, as with server Whisper (large-v3: 69.5% → 46.1%).
- **whisper-small for Bengali / Tamil / Telugu / Kannada, not adopted:** on 40 dev clips it scored 2.5% fully correct (whisper-base 0%). Field F1: ta 53 vs 27, te 38 vs 33, kn 19 vs 13, bn 36 vs 44. It is a 250 MB download and several times slower. These languages need an Indian-language recogniser, not a bigger generic Whisper.

## What is left

- **On large-v3** (round 28, clean), the extractor-only ceiling is 68.0%; we are at 65.7%. The rest is the recogniser losing words. That is concentrated in Bengali (39%; large-v3 did not help it) and Kannada (40%).
- **On turbo:**
  - Remaining clean-ASR field errors (round 21) were 92% the recogniser losing the words and 8% a value still in the transcript in a form we don't parse.
  - The extractor-only ceiling was 54.5%.
- **Biggest lever** is still the recogniser: large-v3 already gave +13 points over turbo with no rule changes. Next candidates: IndicConformer (gated download), Sarvam (needs a key), or Chrome's own recogniser on a real phone.
- **Whisper is a stand-in.** The app uses the phone's own speech recogniser (Web Speech), which cannot be benchmarked automatically. A real-phone test script is in `research/findings-2026-11-23.md`.
