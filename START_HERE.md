# Build for Bharat: status (23 Nov 2026, v3)

## Round 1: SUBMITTED and COMPLETE (23 Nov 2026)
All three activities passed the quality check. Scores appear after 27 Nov. The team (Shubh saxena, Sugandhi agrawal) is now locked. The texts as submitted are in `round1/`:

| Activity | Words (site limit) | Points |
|---|---|---|
| 1 Idea | 478 (50–500) | pass/fail |
| 2 Prompt | 781 (80–800) | 50 |
| 3 Impact | 477 (50–500) | 25 |

The real limits differed from the old page code (800 and 500, not 1000), so 2 and 3 were condensed before submitting. Screenshot: `round1/round1_complete_dashboard.png`.

Still open: the masterclass RSVP (Tue 24 Nov) showed "coming soon". The 18+ age rule in the FAQ remains your call.

## The app: `prototype/` (Turant v2, fully rebuilt UI)
- **Standalone.** No code, imports or references to any other project (TrustShield etc.).
- **Research behind the redesign** (in `research/`):
  - `voice-ux-teardown.md`: 130 voice products, 18 deep teardowns, and low-literacy research.
  - `beginner-visual-ux-teardown.md`: 135 apps, 18 deep teardowns, and elder and accessibility rules.
  - `DESIGN_SPEC.md`: the rules taken from both.
- **Run:** `cd prototype && npm install && npm run test` (127 passing), then `npm run dev`. Tap "No mic? See a sample" to see the whole flow without speaking.
- **QA:** every path was checked in a browser and 13 bugs were fixed. All 7 languages pass at 360px with the largest text size. Screenshots are in `prototype/screenshots/` (Hindi, Tamil, English).
- **Not deployed.** The auto-mode permission check blocked a public deploy earlier. One command: `cd prototype && vercel deploy --prod --project turant-voice`.

### Native-speaker review needed (bn / ta / te / mr / kn)
1. The name for the round mic button ("गोला"): `likeWhatsapp`, `state_idle`, `tapToStop`.
2. "Voice off / sound back on": `state_off`, `quietMode`, `soundBack`. ta/te/kn use colloquial English loanwords.
3. "1930 people will ask": `skipLater`, `giveUp`, especially mr and kn.
4. Letter templates in Tamil and Kannada: `L_money`, `L_utr`, `L_suspect`.
5. `stopLine` ("don't pay to get money back") in all five.
6. `next1` "hold the money"; `docTitle` word order in ta, te and kn; Kannada `openEx` (dialect).

## Speech-to-report accuracy: `harness/` (see `harness/JOURNAL.md`)
The harness takes 280 spoken reports in 7 languages through TTS, noise and Whisper into the extractor, and scores every field.

| Measure | Before (23 Nov) | Now |
|---|---|---|
| Clean speech, report fully correct | 27.2% | **47.0%** |
| Held-out voices | 29.4% | **46.9%** |
| Field F1 | 51 | 73 |

- **What changed:** the extractor now reads numbers, times, banks and IDs in all 7 languages, including the misspellings speech recognisers make.
- **Fuzz checks:** all clean. One mutation is recovered in 99.6-100% of cases, and no ordinary word in 1,510 real transcripts gets turned into a number.
- **Rules vs LLM:** measured head to head. On-device rules match the best LLM hybrid (41.2%); the LLM alone scores 16.5% because it invents fields. The decision is to stay offline-first.
- **Other voice-kit apps:** `kit_apps_eval.mjs` scores khata, health and civic on text or speech. On held-out text the first run scored 38%, 71% and 50%; the remaining gaps are domain words in each language, which is the Round 2 day-1 lesson.
- **Asking instead of guessing:** an amount under ₹100 is offered back as one-tap "₹5,000?" or "₹5,00,000?"; a bare "thousand" after a misheard word is asked about rather than read as ₹1,000.
- **Remaining errors:** 84% are speech recognition, mostly in bn/ta/te/kn. A better Indic ASR (Sarvam key needed) is the next big lever.
- **Re-run:** `cd harness; .\run.ps1 -Name x` (about 5 s, cached), then `node split.mjs x`.

## Round 2 (27–29 Nov): `round2-kit/ROUND2_PLAYBOOK.md`
The problem statement is only released on 27 Nov. The playbook has the pre-work, a 3-day plan, and how to reuse Turant's voice core:
- `useListen` and SpeechService
- the presence
- the letter builder
- the escalation logic
- the design system

The voice kit (`round2-kit/voice-kit`) has 251 passing tests. Apps are chosen with `?app=fraud|khata|health|civic|quiz`; the quiz app, "Bolo Quiz", is a spoken quiz in hi/bho/en. Its fraud app scores the same as Turant on the harness (`run_eval.mjs --extractor kit`).

Git: local repo only, no remote.
