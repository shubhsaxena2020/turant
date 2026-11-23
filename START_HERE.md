# Build for Bharat: status (21 Nov 2026, v2)

## ⚠ Read first: the age rule
The hackathon FAQ says: "Students and working professionals in India, **aged 18 or over**." Shubh turns 18 on 16 Dec 2026, after the 13 Dec finale. Decide this before submitting anything: ask the organisers (wispr.support@scaler.com / Discord), or let an 18+ teammate own the entry. Nothing has been submitted, so the team is still unlocked.

## Round 1 (closes end of day 26 Nov): ready to paste
| Activity | File | Words / limit | Points |
|---|---|---|---|
| 1 Idea | `round1/activity1_idea.md` | 459 / 500 | 0 (pass/fail check) |
| 2 Prompt | `round1/activity2_prompt.md` | 961 / 1000 | 50 |
| 3 Impact | `round1/activity3_impact.md` | 904 / 1000 | 25 |

- **Activity 2** was rewritten for the research-backed v2 design: the phone-call model, the presence, the letter with gaps, no boxes, and escalation after misses.
- **Order:** submit 1 → 2 → 3. **The first submit locks the team.**
- **Wispr Flow:** open the app and sign in with your registration email **before Activity 3**. Otherwise you can't win Round 1 prizes.
- **Sources:** every stat in Activity 3 is sourced in `research/facts.md`.

## The app: `prototype/` (Turant v2, fully rebuilt UI)
- **Standalone.** No code, imports or references to any other project (TrustShield etc.).
- **Research behind the redesign** (in `research/`):
  - `voice-ux-teardown.md`: 130 voice products, 18 deep teardowns, and low-literacy research.
  - `beginner-visual-ux-teardown.md`: 135 apps, 18 deep teardowns, and elder and accessibility rules.
  - `DESIGN_SPEC.md`: the rules taken from both.
- **Run:** `cd prototype && npm install && npm run test` (123 passing), then `npm run dev`. Tap "No mic? See a sample" to see the whole flow without speaking.
- **QA:** every path was checked in a browser and 13 bugs were fixed. All 7 languages pass at 360px with the largest text size. Screenshots are in `prototype/screenshots/` (Hindi, Tamil, English).
- **Not deployed.** The auto-mode permission check blocked a public deploy earlier. One command: `cd prototype && vercel deploy --prod --project turant-voice`.

### Native-speaker review needed (bn / ta / te / mr / kn)
1. The name for the round mic button ("गोला"): `likeWhatsapp`, `state_idle`, `tapToStop`.
2. "Voice off / sound back on": `state_off`, `quietMode`, `soundBack`. ta/te/kn use colloquial English loanwords.
3. "1930 people will ask": `skipLater`, `giveUp`, especially mr and kn.
4. Letter templates in Tamil and Kannada: `L_money`, `L_utr`, `L_suspect`.
5. `stopLine` ("don't pay to get money back") in all five.
6. `next1` "hold the money"; `docTitle` word order in ta, te and kn; Kannada `openEx` (dialect).

## Round 2 (27–29 Nov): `round2-kit/ROUND2_PLAYBOOK.md`
The problem statement is only released on 27 Nov. The playbook has the pre-work, a 3-day plan, and how to reuse Turant's voice core:
- `useListen` and SpeechService
- the presence
- the letter builder
- the escalation logic
- the design system

Git: local repo only, no remote.
