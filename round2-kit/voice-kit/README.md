# voice-kit: a voice-first app in one config file

Turant's research-backed voice UX (the calm phone call, the breathing presence, the
letter being written with dotted gaps, one question at a time, read-back of numbers,
escalation after misses, hairline check list, calm success screen, typeset document,
7 languages) turned into a **domain-agnostic kit**. A new app is **one `config.ts`**:
the slots you need, the words the helper says, and the documents it writes.

Four example apps ship with it, switchable with `?app=`:

| `?app=` | What | Languages (samples) | Output |
|---|---|---|---|
| `fraud` | Turant parity: report a UPI / payment fraud | 7 (all) | 1930 call script, cybercrime.gov.in complaint, bank message |
| `khata` | Kirana shopkeeper's voice ledger ("Ramesh ne 3 kilo chawal aur 2 litre tel liya, 450 rupaye udhaar") | hi, en | Ledger entry + WhatsApp reminder to the customer |
| `health` | ASHA / older patient symptom intake, spoken in Tamil | ta, en, hi | **English** doctor referral note (template + optional AI summary), danger-sign flags |
| `civic` | City grievance: pothole, garbage, streetlight, water, drainage | kn, en, hi | English grievance for the city corporation, 1533 call script |

No backend, no login, no keys. Extraction runs on the phone, so the core flow works offline.

## Run

```bash
npm install
npm run test          # 228 unit tests (vitest), all offline
npx tsc --noEmit      # type-check
npm run build         # type-check + production build into dist/
npx vite preview --port 4340
```

Open `http://localhost:4340/?app=khata&lang=hi` at phone width (390 px). Tap **"No mic? See a sample"**
and the sample story, the sample answers and a spoken "yes" play through the same pipeline as real speech.

- `?app=fraud|khata|health|civic`: which config (or `VITE_APP=<id>` at build time).
- `?lang=hi|en|ta|kn|...`: start language (otherwise the phone's language, then the app's first language).
- `?llm=1`: turn on the optional LLM layer for this visit (see below).

## Architecture

```
 DomainConfig (src/apps/<id>/config.ts)  ─────────────────────────────────────────────┐
   slots · questions · letter templates · check rows · done · document builders · samples │
                                                                                          ▼
 speech (Web Speech / simulate) ─► useListen ─► TalkScreen ─► CheckScreen ─► DoneScreen ─► DocumentScreen
                                       │            │              │
                          extractSmart │   interpret / commit  parseCorrection (voice fix)
                                       ▼            ▼
                     slots.ts: typed extractors per slot type (config-driven)
                                       │
                     nlp.ts: Turant's rules (Indian number words, lakh/hazaar/saade/dhai,
                     native digits, relative time, digit runs, UPI, intents, keyword matching
                     across scripts, clause boundaries)
                                       │
                     llm.ts (optional, OFF): suggestions with a truth check; rules stay the fallback
```

| What | Where |
|---|---|
| The config type (every option documented) | `src/domain/types.ts` |
| App registry (`?app=` / `VITE_APP`, auto-discovers `src/apps/*/config.ts`) | `src/domain/registry.ts` |
| Language primitives (ported from Turant `extract.ts`) | `src/lib/nlp.ts` |
| Slot extractors, questions, corrections, keypad + value validation | `src/lib/slots.ts` |
| Entry model, merge, conflicts (lists merge, not conflict) | `src/lib/record.ts` |
| Answer interpretation | `src/lib/answer.ts` |
| Letter builder (facts, gaps, "later") | `src/lib/letter.ts` |
| Display / speech / English value per slot type | `src/lib/values.ts` |
| Indic → Latin transliteration for English documents ("Latchumi (லட்சுமி)") | `src/lib/translit.ts` |
| Optional LLM layer + `/api/understand` client | `src/lib/llm.ts` |
| Kit UI strings, 7 languages (Turant's reviewed translations + a few neutral ones) | `src/i18n/ui.ts` |
| Theme (primary / accent hue override on the fixed palette) | `src/lib/theme.ts`, `src/index.css` |
| Screens and components (Turant's, reading the config) | `src/screens/*`, `src/components/*` |
| Speech service (swap in Bhashini / Sarvam here), earcons, storage (per app) | `src/lib/speech.ts`, `cues.ts`, `storage.ts` |

### Slot types

| type | Understands | Stored as |
|---|---|---|
| `amount` | ₹4,999 · paanch hazaar · saade teen hazaar · do lakh · ಐದು ಸಾವಿರ ರೂಪಾಯಿ · ৫০০০ টাকা | number (rupees) |
| `datetime` | 10 minute pehle · kal shaam 7 baje · yesterday 7 pm · दस मिनट पहले · 2 hafte pehle | ISO time (past) |
| `duration` | teen din se · for two weeks · மூன்று நாட்களாக · ಎರಡು ವಾರದಿಂದ · kal se | days |
| `phone` | 98765 43210 · +91… · digit words | 10-digit string |
| `digits` | `length: 12` (UTR, Aadhaar) or `min`/`max` + `context` words (account no.); `mask` | digit string |
| `upi` | rahul dot kyc at ybl · rahul.kyc@ybl (e-mails ignored) | string |
| `enum` | keywords in every script; `multi` (symptoms, negation-aware: "bukhar nahi"); `hintOnly` options; `pick` mode | value / values |
| `name` | mera naam X hai · X ne… · my name is X · என் பெயர் X · ನನ್ನ ಹೆಸರು X; whole answer when asked | string |
| `text` | `markers` (near X · X ke paas · X ಹತ್ತಿರ · clause with "ward"); whole answer when asked | string |
| `number` | `units` words next to the number (26 saal, வயது 62, 101 degree), `min`/`max` | number |
| `quantity+unit` | 3 kilo chawal aur 2 litre tel · aadha kilo cheeni · 2 packets of biscuits; optional item catalogue | `{qty, unit, item}[]` |
| `yesno` | topic words + negation ("pregnant nahi hai", "கர்ப்பமாக இல்லை"); yes/no when asked | boolean |

Per slot you also set `required`, `ask` (optional but asked), `askIf(fields)`, `group` (several slots asked as one
question, e.g. suspect UPI / phone / account), `confirm: 'explicit'` (big read-back + yes/no), `keypad`, `aliases`
(words naming it in a voice correction), and the copy: `label`, `q`, `rq` (shorter re-ask), `ex`, `help`.

### Optional LLM layer (off by default)

`config.llm = { extract, enabled?, summaryLang? }`. Enable per visit with `?llm=1` or at build time with `VITE_LLM=1`.
`understandClient({ baseUrl })` calls `round2-kit/llm-api` (`POST /api/understand`, key only in the server env), is
aborted after 6 s, and is skipped when offline. The model only **suggests**:

- Numbers, IDs and dates (`amount`, `number`, `duration`, `digits`, `phone`, `upi`, `datetime`) are accepted only if
  the rules find the **same value** in the transcript. Otherwise the call asks "I heard 104°F. Is that right?" first.
- `enum`, `name`, `text` and list slots fill gaps; for multi-select lists, extra items are added to the rule ones.
  The Check screen marks them "Filled in by AI, please check".
- The summary is kept separately and always labelled "auto-generated (AI)". `health` prints it under its own
  heading; the template summary from the slots is always there as the fallback.
- A rule hit is never overwritten; any failure falls back to rules only.

## Make a new app in under an hour

```bash
npm run new-app -- ration-card                 # standalone ../ration-card, from the commented template
npm run new-app -- ration-card --from civic    # start from the closest example instead
npm run new-app -- ration-card --here          # or just add src/apps/ration-card/ inside this kit
cd ../ration-card && npm run dev
```

1. **(10 min) Slots.** Write the facts you need, most important first. Pick the type from the table above. Mark
   money, dates and IDs `confirm: 'explicit'` and give numbers a `keypad`.
2. **(10 min) Questions.** For each slot write `q` (full), `rq` (shorter, never verbatim), `ex`, `label` in every
   language you support.
3. **(5 min) Letter.** 3–6 first-person sentences with `{slot}` placeholders, in each language.
4. **(5 min) Check.** `hero` (the one big value), `main` rows, optional `more` rows, an optional amber `notice`.
5. **(10 min) Done + document.** The giant number / action, the lines to read on the call (`script`), next steps,
   and `document.build`: line 1 title, line 2 subtitle, `1. SECTION` headers, `Label: value` rows.
6. **(10 min) Samples.** One story per language (hi + en at least) that fills most slots, and a sample answer for
   every question it leaves open. `npm run test` checks every sample answer is understood.
7. **(10 min) Test on a phone.** Sample flow end to end, then real speech; add the keywords people actually said.

## Day 1 checklist (27 Nov)

- [ ] Read the problem statement twice; pick ONE user, ONE task; list the facts the output needs (these are slots).
- [ ] `npm run new-app -- <name> --from <closest example>`; set `name`, `tagline`, `theme`, `languages`.
- [ ] Slots + questions + letter in hi + en; `npm run test` green.
- [ ] The output the user leaves with (`done` + `document`): what they call, send, paste or show.
- [ ] Sample stories (hi + en + the problem's language) and sample answers; the sample flow passes end to end.
- [ ] Add the problem's language first if it's ta / kn / bn: number and time words already exist in `nlp.ts`; write
      the config copy, then add domain keywords in that script.
- [ ] `npm run build`, deploy `dist/` (static; `vercel --prod`), open the URL on a real phone.
- [ ] Optional: deploy `round2-kit/llm-api`, set `VITE_LLM_URL`, test with `?llm=1`. The app must still work without it.

## Adding a language (Kannada, Tamil and Bengali first)

- Kit UI strings already exist in all 7 languages (`src/i18n/ui.ts`; bn/ta/te/mr/kn need a native-speaker review).
- The rules already know number words (1–10, tens, hundred, thousand, lakh), day/week/month units, "ago", yes/no/
  skip words and negation in hi, mr, bn, ta, te, kn. Indian-script keywords match as substrings because the
  languages agglutinate (ದಿನದಿಂದ, நாட்களாக), and number runs stop at sentence punctuation.
- In the config: add the code to `languages`, add that language to every `Text`, and add keywords in that script
  to your enum options / yes-no topics / text markers. Write a sample story and answers in it; the tests check them.

## Known gaps

- **Speech:** Web Speech API (Chrome/Edge, needs network). Other browsers get typing, the keypad and lists. Server-side
  Indic ASR (Sarvam / Bhashini) plugs into `SpeechService` but is not wired.
- **Rules coverage:** names and free-text places use simple patterns (markers, "X ne", "my name is"). Unusual
  phrasings need the question (which accepts the whole answer) or the LLM layer. Hindi number *words* above 100 are
  covered; Tamil/Kannada/Bengali compound number words (e.g. ஐயாயிரம்) are not, though digits always work.
- **Translation:** English documents transliterate Indian-script names and places ("Shiva Devasthaanada Hattira
  (ಶಿವ ದೇವಸ್ಥಾನದ ಹತ್ತಿರ)") rather than translating them; transcripts are shown in both scripts. The LLM summary is the
  translation path when enabled.
- **Copy review:** ta / kn copy in `health` and `civic`, and the neutral kit strings in bn/ta/te/mr/kn, were written
  without a native-speaker review.
- **Layout:** in Tamil (long link labels) the story screen's sticky action zone covers the end of the greeting at
  390x844, the same as Turant; the page scrolls.
- **AI-added list items** inside a list the rules partly filled are not individually marked as AI on Check.
- Medical content in `health` is a demo intake form, not clinical advice; danger-sign rules need a clinician's review.
