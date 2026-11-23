# Round 2 archetypes

The hackathon's own five city briefs show the shapes a Round 2 problem can take. `voice-kit/` covers the slot-filling shape: grievance, symptom intake, ledger, and fraud report. The two shapes it does not cover have their own pure, tested engines here. Each engine plugs into the kit's UI: presence, `useListen`, sheets, the success screen, and the design system.

| Brief (landing page) | Shape | Engine |
|---|---|---|
| Bengaluru: civic grievance (Kannada/English) | fill facts → document | `voice-kit` config `civic` |
| Madurai: symptoms in Tamil → English summary for the doctor | fill facts → translated summary | `voice-kit` config `health` (+ LLM summary, see `research/llm-options.md`) |
| Indore: kirana credit ledger | fill facts → running ledger | `voice-kit` config `khata` |
| Patna: spoken quiz (Hindi + Bhojpuri) | app asks, child answers, judge, explain | `archetypes/quiz` |
| Kolkata: elder books a cab or pays a bill (Bengali) | intent → missing slots → safe hand-off | `archetypes/assistant` |

## quiz/ (`src/match.ts`, 11 tests)

`matchAnswer(question, spoken)` returns one of correct, wrong, unclear, skip or repeat. It handles:
- MCQ by option word: "doosra", the Bhojpuri "dusarka" and "pahila", "option B", or a bare "do".
- MCQ by option text in any script: "नई दिल्ली" or "delhi".
- English words said in Devanagari: "फोटोसिंथेसिस" or "photo synthesis".
- Hindi, English and native-digit numbers: "पच्चीस", "do sau pachaas", "२५".
- Repeat and skip in 7 languages.

"Unclear" is never marked wrong; the app re-asks.

UX for the screen, kept to one question per screen:
1. The presence reads the question aloud with the options.
2. The child answers.
3. The app answers in one breath: "Sahi! Delhi is the capital" or "Almost. The answer is Delhi, because…".
4. Progress shows as filled dots, never as a red score.
5. The teacher view lists mistakes by topic.

## assistant/ (`src/intent.ts`, 12 tests)

`parse(text)` returns an intent (book_cab, pay_bill, recharge, call, or help) plus pickup and drop, bill type, amount, phone and person. It understands Bengali, Hindi and English, including Bengali case suffixes. `missing()` lists what to ask next.

Hand-off: `uberLink()` / `mapsLink()` fill the destination. Payments are never completed inside the app: it opens the official app or biller with the fields filled. `needsFamilyOk()` asks a family member to approve amounts over ₹2,000.

UX:
1. One question per screen. "Kahan jaana hai?" is answered with a big read-back of the place.
2. "Is this right?" is confirmed by voice ("haan") or a tap.
3. One big "Open Uber" or "Pay in PhonePe" button, plus "Call my son" always visible.

## Run tests

```bash
cd quiz && npx vitest run
cd ../assistant && npx vitest run
```
