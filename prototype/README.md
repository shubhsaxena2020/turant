# Turant (तुरंत): report payment fraud by voice

A mobile-first PWA for someone who has just lost money to a UPI or online payment scam. They say what happened in their own language, Turant asks only for what is missing, and they leave with a complaint ready for the **1930** helpline and **cybercrime.gov.in**.

There is no backend, no login and no API keys. Extraction runs on the phone, so the core flow works offline.

## Run

```bash
npm install
npm run test      # 108 unit tests (vitest)
npm run build     # type-check + production build into dist/
npx vite preview --port 4317
```

Open http://localhost:4317 at phone width. **No microphone?** Tap **Try a sample** on Home. It plays a sample story word by word through the same pipeline as real speech. On the follow-up question, **Use sample answer** reads a bank SMS aloud so you can see the UTR being found. Voice input needs Chrome or Edge (Web Speech API). Other browsers go straight to typing mode.

## Spec → code map

| Spec item | Where |
|---|---|
| Extraction rules (amount, time, scam type, bank, app, UTR, UPI ID, phone, account) | `src/lib/extract.ts`. This is a pure module that handles Hinglish, English, Devanagari Hindi/Marathi, plus common Bengali/Tamil/Telugu/Kannada words and native digits. |
| Voice corrections ("amount galat hai, 5999 tha") | `parseCorrection()` in `extract.ts`. It returns exactly one field. |
| Intents: skip / "ek minute ruko" / yes / no, choosing a language by voice | `detectIntent()`, `detectLanguage()` in `extract.ts` |
| Question queue (required, then UTR, then suspect), merging, contradictions, police-station rule | `src/lib/report.ts` |
| 1930 script (4 lines, user's language), cybercrime.gov.in-style English complaint, bank message, WhatsApp link, spoken summary, account masking | `src/lib/outputs.ts`, `src/lib/format.ts` |
| SpeechService interface (STT + TTS), Web Speech implementation, 2.5 s silence stop, sample simulator | `src/lib/speech.ts`. To use Bhashini, implement `SpeechService`. |
| One translation file keyed by language code, with English fallback | `src/i18n/strings.ts`. hi-IN and en-IN are complete. bn/ta/te/mr/kn cover the key screens, the spoken questions, the checklist and the 1930 script. |
| Screens 1–7 | `src/screens/*`. The shared listen/retry/keyboard-fallback/pause logic is in `src/components/VoiceCapture.tsx`. |
| Error states: mic denied, no speech support, network ASR failure, missing device voice (falls back to Hindi/English with a notice), low confidence or <3 words ("Sorry, I didn't catch that"), keyboard after 2 failures, contradictory answers | `VoiceCapture.tsx`, `App.tsx` (`say`), `ConflictSheet` in `components/common.tsx` |
| IndexedDB storage, draft saved after every answer, Delete all | `src/lib/storage.ts`. It uses idb-keyval, then falls back to localStorage, then memory. |
| Offline shell, offline badge | `src/sw-template.js` (the precache list is injected at build time by a small plugin in `vite.config.ts`), `public/manifest.webmanifest` |

The spec's acceptance sentence gives amount 5000, time 10 minutes ago, fake KYC, SBI and rahul.kyc@ybl, and then asks only for the UTR. This is tested in Hinglish, in Devanagari, and in the Chrome hi-IN style ("₹5000 ... 10 मिनट पहले"), in `src/lib/extract.test.ts`. The sample story in every language is tested the same way.

## Known limitations

- **Waveform.** It reacts to recogniser activity events, not raw mic amplitude. Opening `getUserMedia` alongside Web Speech can break recognition on Android.
- **Web Speech API.** It needs network in Chrome. When the network is unavailable the app switches to typing and keeps the same steps. Chrome on Android sometimes reports confidence 0, which is treated as "unknown" rather than "low".
- **UPI IDs spoken in Indian scripts.** For example, "राहुल डॉट केवाईसी एट वाईबीएल" is not transliterated back to Latin. "rahul dot kyc at ybl" and typed IDs both work, and the user can fix the field with the pencil.
- **Native-script rules.** For Bengali, Tamil, Telugu and Kannada, the rules cover digits, common time, currency and bank words, and "KYC/OTP/QR". They do not cover every spelled-out number word in those languages.
- **Translations.** The bn/ta/te/mr/kn strings need review by native speakers. Missing keys fall back to English.
- **The 3-word minimum.** It applies only to the main story. Short follow-up answers like "SBI" are accepted.
- **Not built:** the optional online LLM extraction, PNG app icons (the manifest uses one SVG icon), and an in-app "install" prompt.
- **Language screen.** The app does not speak "Apni bhasha chuniye" on page load, because browsers block audio before a tap. It speaks it when the user taps "Say your language".

## Screenshots (390×844)

`screenshots/01-language.png`, `02-home.png`, `03-listening.png`, `04-review.png`, `05-action.png` (full page)
