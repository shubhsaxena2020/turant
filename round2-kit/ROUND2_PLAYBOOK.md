# Round 2 playbook: India Runs on Voice (Scaler × Wispr Flow)

Round 2 = **one problem statement for everyone, released 27 Nov; build submitted 29 Nov** (3 days). Shortlist 2 Dec. Finale on campus 13 Dec.
Round 1 score (out of 75) converts to **up to 10 points toward Round 2**, so Round 1 still counts.

We can't know the problem statement in advance, so this kit gets everything that *doesn't* depend on it ready now. On 27 Nov the team only has to write the domain logic.

---

## Status and what's left before 27 Nov (updated 23 Nov)

| # | Item | Status |
|---|---|---|
| 1 | Round 1 activities 1–3 | ✅ Submitted and passed (23 Nov). Team locked: Shubh + Sugandhi. |
| 2 | Wispr Flow: signed in with the registration email? | ⚠ Shubh to confirm. It decides R1 prize eligibility. |
| 3 | Masterclass RSVP (Tue 24 Nov) | ⏳ The dashboard still says "coming soon". Check it on the morning of the 24th. |
| 4 | Free speech-API key for Indian languages: **Sarvam AI** (dashboard.sarvam.ai), no card | ⚠ Shubh (needs his sign-up). Whisper fails on ta/kn/bn (see `research/findings-2026-11-23.md`). |
| 5 | 10-minute real-phone test of Chrome speech in hi/ta/bn/kn | ⚠ Shubh. Script in `research/findings-2026-11-23.md`. |
| 6 | Permission for public deploys (Vercel) for the Round 2 build | ⚠ Shubh to OK. The auto-mode classifier blocked it once; a live HTTPS link is needed for judges and for the mic. |

## Assets ready for Round 2 (all in this repo, all tested)

| Asset | Where | What it gives us on day 1 |
|---|---|---|
| Research-backed voice UX (v2) | `prototype/`, `research/DESIGN_SPEC.md` | The look and flow judges will see: phone-call model, breathing presence, letter with gaps, no boxes. |
| Configurable voice kit | `round2-kit/voice-kit/` | A new slot-filling app from ONE config file. Examples: fraud, khata (ledger), health (Tamil → English), civic grievance. |
| Quiz engine | `round2-kit/archetypes/quiz/` | Spoken-answer judging in Hindi/Bhojpuri/English, cross-script (Patna brief). |
| Elder-assistant engine | `round2-kit/archetypes/assistant/` | Bengali/Hindi intents: cab, bill, recharge, call, plus safe hand-off links (Kolkata brief). |
| AI understanding API | `round2-kit/llm-api/` | `/api/understand` on NVIDIA NIM (bolt), about 1 s, plus English summaries; the key stays on the server. **Measured (23 Nov): use it only as an optional fallback.** On real transcripts the LLM alone is 16.5% fully correct, against 43.5% for the on-device rules, because it invents times and scam types and gets "yesterday" wrong. Use it for summaries or free text, not for numbers, dates or IDs. |
| Evaluation harness | `harness/` (see `harness/JOURNAL.md`) | 280 fraud cases in 7 languages (TTS, noise, Whisper, per-field scoring) took Turant from 27% to 43.5% fully correct on clean speech. `kit_apps_eval.mjs` scores ANY kit app by slot type, from text or (`--asr`) speech. The audio pipeline runs on any corpus through the `HARNESS_CASES` / `HARNESS_PLAN` / `HARNESS_TIERS` env vars. |
| Cross-language parsers | `round2-kit/indic-numbers/` | Amounts, times and banks in 7 languages, including the misspellings speech recognisers make. 106 tests; fuzzed with millions of phrases on laptop 2. Already inside the kit and Turant. |
| Demo-video maker | `round2-kit/demo-video/` | `./make.sh scenarios/x.json` produces narrated, captioned vertical and landscape MP4s. |

## 3-day plan (27–29 Nov)

**Day 1 (27 Nov) — understand and design (≈ first 6 h)**
1. Read the problem statement twice, word by word. Underline every noun (users, tasks, constraints) and every evaluation criterion.
2. Pick ONE user and ONE task. Write the "before" story in 5 lines (who, where, what breaks).
3. Write the build prompt the way we did for Activity 2 (screens → voice steps → languages → noise → low connectivity → error states → acceptance test). Dictate it with Wispr Flow.
4. Match the problem to an archetype (slot-filling → `voice-kit` config; quiz → `archetypes/quiz`; intents → `archetypes/assistant`). Scaffold with `voice-kit/scripts/new-app.mjs`, write the config and the copy in hi + en first. Get the happy path working end to end by night.
5. **Measure from the first hour.** This is how Turant went from 27% to 43.5%. The biggest gap on the kit's held-out cases was missing domain words in each language.
   - Write the keyword lists for every enum option in all 7 languages, including the English loanwords people actually say (फोनपे, ஜிபே, "owes me").
   - Write 30-50 cases in `harness/corpus/kit/<app>.jsonl`, plus 15 more in `corpus/kit-heldout/` that nobody tunes on.
   - Loop: `tsx kit_apps_eval.mjs <app> --show`, fix, re-run (seconds).
   - Overnight, run speech: build `_all.jsonl`, then `HARNESS_CASES=corpus/kit/_all.jsonl HARNESS_PLAN=plan_kit.json HARNESS_TIERS=base`, run `python common.py`, `tts.py` and `asr.py`, then `kit_apps_eval.mjs --asr plan_kit.json`.

**Day 2 (28 Nov) — make it real**
1. Error states: mic denied, no speech, low confidence, offline, unsupported language.
2. At least Hindi + English fully; 2–3 more Indian languages for key screens.
3. Unit tests for the extraction / core logic.
4. Deploy to Vercel early (`vercel --prod`) so the live URL exists, then keep redeploying.
5. Show it to 2–3 real people (family, shopkeeper, elder). Note what confused them and fix the top 3 things.

**Day 3 (29 Nov) — polish and submit (stop building by the afternoon)**
1. Visual polish pass, mobile at 390 px width, accessibility (large text, contrast).
2. Record a **2-minute demo video**: 15 s problem → 75 s live voice demo in Hindi (real phone, real speech) → 20 s error/offline handling → 10 s impact. Screen-record plus a phone camera shot of speaking.
3. Record a **30–60 s clip of building with Wispr Flow** (dictating a prompt into Claude/Cursor). The hackathon theme is "built hands-free with Wispr Flow", so proof of that likely matters.
4. README: problem, user, how voice works, languages, architecture diagram, how to run, limitations, team.
5. Submit early (hours before the deadline), then verify the submission page shows it.

## Roles for a 2–3 person team
- **Builder** (Shubh): app + voice core + deploy.
- **Researcher / tester**: real-user interviews, test phrases in different languages and accents, edge cases.
- **Storyteller**: README, demo script, video, submission text, and the impact numbers.

## What judges will likely reward (based on the Round 1 rubrics)
- **Theme fit**: voice is the *main* way in, not a bolt-on mic icon. Every step works by speaking.
- **Completeness**: languages, accents, noise, low connectivity, error states are all handled visibly.
- **Specificity**: one named user, one task, real numbers.
- **Buildability / it works**: a live URL that works on a phone, plus a sample button so judges without a mic still see it.
- **Originality**: a sharp angle, not a generic chatbot.
- **Impact + adoption**: who benefits, a before/after, what blocks adoption and how you'd fix it.

## Numbers we can show judges (all reproducible from `harness/`)
- **Speech to report, 7 languages:** fully correct reports went from 27% to 51.5% on clean speech, and from 29% to 49% on voices never used for tuning. Field F1 rose from 51 to 77.
- **Reference text:** 100%.
- **Robustness:** one ASR-style misspelling per number is still read correctly 99.6-100% of the time (24-65% without repair). No ordinary word in 1,510 real transcripts gets turned into a number.
- **Honest about limits:**
  - Bengali, Tamil, Telugu and Kannada are 16-25% fully correct on clean speech, because Whisper mishears 75-134% of the words.
  - 84% of the remaining errors are speech recognition, not our parsing.
  - Mitigations: read-backs, one-tap fixes (₹5 → "₹5,000?"), and asking rather than guessing.

## Submission checklist (29 Nov)
- [ ] Live URL (Vercel) opens on a phone, sample flow works without a mic
- [ ] Public GitHub repo with README
- [ ] Demo video (≤ 2 min) uploaded unlisted on YouTube / Drive with link access on
- [ ] Wispr Flow build clip
- [ ] Screenshots
- [ ] Submission text (problem, solution, languages, impact), dictated via Flow
- [ ] All team members listed correctly
