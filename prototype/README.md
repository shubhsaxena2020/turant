# Turant (तुरंत): report payment fraud by voice

A mobile-first PWA for someone who has just lost money to a UPI or online payment scam. They say what happened in their own language, Turant writes the complaint while they talk, and they leave with a complaint ready for the **1930** helpline and **cybercrime.gov.in**.

There is no backend, no login and no API keys. Extraction runs on the phone, so the core flow works offline.

## Run

```bash
npm install
npm run test      # unit tests (vitest)
npm run build     # type-check + production build into dist/
npx vite preview --port 4317
```

Open http://localhost:4317 at phone width.

- **No microphone?** Tap **"No mic? See a sample"**. A sample story and sample answers, including a bank SMS read aloud and a spoken "haan", play through the same pipeline as real speech.
- **Voice input** needs Chrome or Edge (Web Speech API). Other browsers get typing, the keypad and lists.

## Design (v2)

The UI was rebuilt from two research teardowns in `../research/`:
- `voice-ux-teardown.md`: 130 voice products, 18 deep teardowns, and academic work on low-literacy users.
- `beginner-visual-ux-teardown.md`: 135 apps, 18 deep teardowns, and elder and accessibility guidelines.

`../research/DESIGN_SPEC.md` has the rules. In short:

- **A calm phone call with a helper who writes your complaint while you talk.** Not a form, not a chat.
- **No cards, no bordered boxes, no textareas.**
  - Separation: full-bleed colour bands, a strong type scale, and hairlines between list rows only.
  - Actions: one filled 60px button per screen, in the thumb zone.
- **One breathing presence** is the mic. It has idle, listening, thinking and speaking states, each shown by motion, an earcon, Android vibration and a text label.
- **The letter.** The complaint builds as first-person sentences in the user's language. Facts are highlighted, and missing facts are dotted gaps.
- **Confirmation by risk.** Amounts and IDs are read back in digit groups; the story is confirmed implicitly; there is one final check.
- **Escalation after misses.**
  - 1st miss: a shorter re-ask.
  - 2nd miss: the keypad or a list.
  - 3rd miss: "1930 will ask", then skip.
  - It always blames the app, never the accent.
- **Calm success.** A tick that draws itself and a giant 1930. No confetti.
- **The complaint is a typeset document** with a copy button that confirms in place.
- **Always available:** the 1930 call link, "Aa" text size, quiet mode, and the language in the top bar. Language is never a gate.

## Code map

| What | Where |
|---|---|
| Stages talk → check → done → document → history | `src/App.tsx` |
| The call: story, one question at a time, read-back, fallbacks, conflicts | `src/screens/TalkScreen.tsx` |
| "यह सही है?" summary list, edit sheet, one-step voice fix | `src/screens/CheckScreen.tsx`, `src/screens/EditSheet.tsx` |
| Success + 1930 script + timeline | `src/screens/DoneScreen.tsx` |
| Typeset complaint, copy, bank message, checklist | `src/screens/DocumentScreen.tsx` |
| Presence, keypad, sheets, letter, copy button | `src/components/*` |
| Letter builder (sentences, facts, gaps) | `src/lib/letter.ts` (+ tests) |
| Answer interpretation and commit | `src/lib/answer.ts` (+ tests) |
| One listening turn (mic or demo transcript, live words, level, earcons) | `src/lib/useListen.ts` |
| Earcons + haptics | `src/lib/cues.ts` |
| Extraction rules: amount, time, scam type, bank, app, UTR, UPI ID, phone, account; voice corrections; intents | `src/lib/extract.ts` (+ tests) |
| Question queue, merging, contradictions, police-station rule | `src/lib/report.ts` |
| 1930 script, portal complaint (200+ chars, no banned characters), bank message, WhatsApp, masking | `src/lib/outputs.ts`, `src/lib/format.ts` (+ tests) |
| SpeechService (swap in Bhashini here) | `src/lib/speech.ts` |
| Translations (7 languages, English fallback) | `src/i18n/strings.ts` |
| Offline storage and shell | `src/lib/storage.ts`, `src/sw-template.js`, `vite.config.ts` |

## Known limitations

- **Web Speech API:** it needs network in Chrome. When it fails, the app switches to typing. The presence reacts to recogniser activity, not raw mic amplitude, because opening `getUserMedia` alongside Web Speech can break recognition on Android.
- **Browsers block audio before the first tap,** so the greeting is shown as text and speech starts after the first tap.
- **UPI IDs spoken in Indian scripts** are not transliterated back to Latin. "rahul dot kyc at ybl" works, and the user can type it.
- **Translations:** the bn/ta/te/mr/kn UI strings need a native-speaker review (list in `../START_HERE.md`).
- **Not built:** PNG app icons (one SVG icon) and server-side Indic ASR. The SpeechService interface is ready for it.
