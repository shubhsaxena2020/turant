# Build for Bharat — status (21 Nov 2026)

## ⚠ Read first: age rule
The hackathon FAQ says: "Students and working professionals in India, **aged 18 or over**." Shubh turns 18 on 16 Dec 2026, which is after the 13 Dec finale. Decide this before submitting anything. Options: ask the organisers (wispr.support@scaler.com / Discord), or have an 18+ teammate own the entry. Nothing has been submitted, so the team is still unlocked.

## Round 1 (due end of day 26 Nov per dashboard countdown) — ready to paste
| Activity | File | Words / limit | Points |
|---|---|---|---|
| 1 Idea | `round1/activity1_idea.md` | 459 / 500 | 0 (pass/fail check) |
| 2 Prompt | `round1/activity2_prompt.md` | 936 / 1000 | 50 |
| 3 Impact | `round1/activity3_impact.md` | 904 / 1000 | 25 |

- Idea: **Turant**. Report a UPI / online payment fraud by voice, in your own language, inside the golden hour (Civic services track).
- Submit them in order 1 → 2 → 3. Each unlocks the next. **The first submit locks the team.** "Your accepted prompt is final."
- The site asks you to voice the answers through Wispr Flow. You can read the drafts aloud into Flow, or paste them.
- **Before Activity 3:** open the Wispr Flow app (installed, but it wasn't running) and sign in with the registration email. Otherwise you won't be eligible for R1 prizes.
- Stats in Activity 3 are sourced in `research/facts.md`. Unverified claims were left out.

## Prototype — `prototype/`
- Working React PWA of the Activity 2 prompt: 7 languages, voice + typing, follow-up questions, voice correction, 1930 script, portal-safe complaint, offline drafts.
- `npm install && npm run test` (110 passing) · `npm run dev`
- Screenshots: `prototype/screenshots/`
- **Not deployed.** The auto-mode permission check blocked a public Vercel deploy. To deploy: `cd prototype && vercel deploy --prod --project turant-voice`
- Known gaps: see "Limitations" in `prototype/README.md`. The 5 non-Hindi Indian-language translations need a native-speaker check.

## Round 2 (27–29 Nov) — `round2-kit/ROUND2_PLAYBOOK.md`
The problem statement is only released on 27 Nov. The playbook has the pre-work checklist, the 3-day plan, and how to reuse Turant's voice core.

Git: local repo only, no remote.
