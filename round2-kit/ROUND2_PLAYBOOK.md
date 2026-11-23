# Round 2 playbook: India Runs on Voice (Scaler × Wispr Flow)

Round 2 = **one problem statement for everyone, released 27 Nov; build submitted 29 Nov** (3 days). Shortlist 2 Dec. Finale on campus 13 Dec.
Round 1 score (out of 75) converts to **up to 10 points toward Round 2**, so Round 1 still counts.

We can't know the problem statement in advance, so this kit gets everything that *doesn't* depend on it ready now. On 27 Nov the team only has to write the domain logic.

---

## Before 27 Nov (do these now)

| # | To-do | Who | Why |
|---|---|---|---|
| 1 | **Open Wispr Flow and sign in with the same email you registered with on the hackathon site**. It's installed (`%LOCALAPPDATA%\WisprFlow`) but wasn't running. | Shubh | Sign-up before Activity 3 is required for **R1 prizes**. The dashboard matches it every 30 min. |
| 2 | Submit Round 1 activities 1→2→3 (drafts in `../round1/`). Ideally re-dictate them through Wispr Flow, since the site asks for that. | Shubh | Due end of day 26/27 Nov. **Submitting locks the team.** |
| 3 | RSVP for the masterclass (week of 23 Nov, "RSVP opens soon" on the dashboard). | Shubh + team | Strongly recommended, and it'll probably hint at what Round 2 judges value. |
| 4 | Optional: get an Indic speech API key: **Sarvam AI** (dashboard.sarvam.ai, free credits; Saarika STT / Bulbul TTS for 10+ Indian languages) and/or **Bhashini** (bhashini.gov.in ULCA API key). | Shubh | Browser speech (Web Speech API) works with no key but needs Chrome + internet and is weaker on Tamil/Bengali/etc. A server-side key makes the demo much more robust. |
| 5 | Check the team: names and emails of both members, and who does what (see roles below). | Team | Team changes lock at the first submission. |
| 6 | Make sure Vercel + GitHub accounts are logged in on the build laptop (already true: `gh` logged in as shubhsaxena2020, Vercel CLI 58 installed). | — | One-command deploy on day 3. |

## Reusable assets already built

- `../prototype/`: **Turant** (the Round 1 idea, built from the Activity 2 prompt). It contains the reusable *voice core*:
  - `SpeechService` (speech-to-text + text-to-speech behind one interface, so Sarvam/Bhashini can be swapped in later)
  - translation file pattern for 7 Indian languages + native-script language picker
  - slot-filling engine: extract fields from free speech → ask only for what's missing → spoken read-back → voice correction ("amount galat hai, 5999 tha")
  - Indian number parsing (paanch hazaar, saade teen hazaar, do lakh, Devanagari numerals and words), relative times ("10 minute pehle", "kal shaam")
  - offline drafts + PWA service worker, typing fallback, mic-denied state, "Try a sample" demo button
- This playbook + the submission checklist below.

**On 27 Nov:** copy `prototype/` to `round2/`, then replace the domain-specific parts (fields, questions, output screen) with the new problem. Keep the voice core, the error states and the design system.

## 3-day plan (27–29 Nov)

**Day 1 (27 Nov) — understand and design (≈ first 6 h)**
1. Read the problem statement twice, word by word. Underline every noun (users, tasks, constraints) and every evaluation criterion.
2. Pick ONE user and ONE task. Write the "before" story in 5 lines (who, where, what breaks).
3. Write the build prompt the way we did for Activity 2 (screens → voice steps → languages → noise → low connectivity → error states → acceptance test). Dictate it with Wispr Flow.
4. Fork the voice core, rename it, define the new fields and questions. Get the happy path working end-to-end by night, even if it's ugly.

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

## Submission checklist (29 Nov)
- [ ] Live URL (Vercel) opens on a phone, sample flow works without a mic
- [ ] Public GitHub repo with README
- [ ] Demo video (≤ 2 min) uploaded unlisted on YouTube / Drive with link access on
- [ ] Wispr Flow build clip
- [ ] Screenshots
- [ ] Submission text (problem, solution, languages, impact), dictated via Flow
- [ ] All team members listed correctly
