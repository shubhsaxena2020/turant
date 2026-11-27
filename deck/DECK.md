# Turant: pitch deck text

Build for Bharat 2026 (Scaler x Wispr Flow), Round 2. Theme: Public infrastructure and civic services.

## Slide 1: Turant

**Report a UPI fraud by voice, in the golden hour.**

- A fraud victim says what happened, in their own words and language.
- Turant turns it into a complete complaint, a 1930 call script and a bank message, in minutes.
- Hindi, English/Hinglish, Bengali, Tamil, Telugu, Marathi and Kannada.
- Runs on the phone. No account, no Turant server: the complaint stays on the device unless the user copies or shares it.
- Live: https://turant-voice.vercel.app

## Slide 2: The problem

**Stolen money can still be frozen, but only if the report is fast and complete.**

- **Losses:** ₹22,845 crore lost to cyber fraud in 2024, across 36.4 lakh financial-fraud incidents (MoS Home, Lok Sabha, Jul 2025). 2025: ₹22,495 crore across 24 lakh complaints.
- **Speed works:** 1930 / CFCFRMS has held back ₹11,158 crore in 32.8 lakh complaints, to 30 Jun 2026 (Rajya Sabha, Aug 2026).
- **Golden hour:** victims who report within about 1-3 hours may recover funds (Hyderabad Cyber Crime DCP, Jul 2024).
- **Reporting is slow:**
  - **1930:** each complaint takes 16-18 minutes to register by hand (Bihar, May 2026). Unanswered calls cost victims money, the Home Minister warned (Feb 2026).
  - **cybercrime.gov.in:** OTP login, captcha, ID upload, bank, UTR, date, amount, and a typed description of at least 200 characters. The form text is English. There is no speech input.
- A panicked person must find a 12-digit UTR in their SMS and type all this on a small keyboard. Many wait for a relative. By then the money has moved.

## Slide 3: Who suffers most

- **Senior citizens:** 1,03,488 complaints in 2025, ₹4,005 crore lost: about 4% of complaints but about 18% of the money (MHA, Aug 2026).
  - Per senior complaint: ₹4,005.12 crore ÷ 1,03,488 ≈ ₹3.87 lakh, about 4 times the overall average.
- **Indian-language users:** 870 million of India's 886 million internet users (98%) use the internet in Indian languages (IAMAI-Kantar 2024). The form is in English.
- **First-time and rural users:** 488 million internet users are rural. 140 million use voice commands, 55% of them rural (IAMAI-Kantar 2024). Talking is easy for them; an English form is not.

## Slide 4: The solution in one flow

1. **Speak.** Tap once and say what happened, in any of 7 languages, mixed with English if you like.
2. **Understood.** Turant picks out amount, time, scam type, bank, payment app, UTR, and the fraudster's UPI ID, phone or account.
3. **One question at a time** for what is missing. Answer by voice, typing or tapping.
4. **Read-back:** "Is this right?" Fix anything by voice.
5. **Ready to act:** a script for the 1930 operator; the complaint text in the portal's order, over 200 characters and free of the characters it rejects; a message for the bank; a checklist.

## Slide 5: A worked example

**The user says:** "Someone called from customer care, made me install AnyDesk, and two lakh rupees went from my ICICI account yesterday at 7 pm."

**Turant fills in:**
- Amount: ₹2,00,000
- Time: yesterday, 7:00 pm
- Scam type: fake customer care (portal category: Fraud Call / Vishing)
- Bank: ICICI Bank

**Then asks, one at a time:** "Please read the 12-digit UTR number from the bank SMS." Then the payment app, and the fraudster's phone or UPI ID if known.

**Hands over:** four lines to say on the 1930 call, the portal text, the bank message and the checklist. A detail the user cannot find is marked "Not known", never guessed.

## Slide 6: Why voice, and why on the device

- **Voice:** in a panic, people can talk but cannot fill forms. Speaking removes the English barrier and the typing barrier when speed matters most.
- **No server:** extraction, questions and outputs run in the page. No login, no database of victims.
- **Offline after first load:** an installable web app (PWA). If the network drops, the report stays on the phone.
- **No install:** opens from a link, SMS or QR code.
- **Privacy, stated honestly:** the browser's own speech recognition (Chrome, Edge) may process audio on the browser maker's servers. Turant's Whisper fallback runs inside the page and uploads no audio.

## Slide 7: How it works

- **Two speech recognisers behind one interface (`speech.ts`):**
  - The browser's speech recognition shows live words.
  - Turant also records the audio. If the browser returns nothing, one misheard word, or stops early (all seen on Chrome for Windows), Whisper transcribes it in the page via transformers.js and ONNX Runtime Web. For Hindi, English and Marathi it uses Oriserve's Hindi2Hinglish Whisper, which writes clean Hinglish. About 100 MB, downloaded once, then cached; a 12-second story takes about 8 seconds.
  - Turant's own voice detection decides when the person has finished.
- **Rules, not an LLM:** the rules read numbers, dates, banks and IDs in 7 languages, including recogniser slips ("to lock rupees" = ₹2,00,000; "9 बजकर 30 मिनट" = 9:30; a UTR read digit by digit). On the same transcripts an LLM invented times and scam types: 16.5% fully correct, against 43.5% for the rules then.
- **Asking beats guessing:** a wrong amount on a police complaint is worse than a missing one. A spoken "₹5" is offered back as "₹5,000?". Unclear values are asked again.

## Slide 8: Measured quality

**Method:** 280 fraud reports in 7 languages, spoken by Indian neural voices (edge-tts), with noise at 15 and 5 dB, transcribed by Whisper, scored on every field. "Fully correct" = every field right, nothing invented.

| Fully correct reports | Whisper turbo | Whisper large-v3 |
|---|---|---|
| Tuning set, clean speech | 54.5% | 69.5% |
| Voices never used for tuning | 53.4% | 67.8% |
| **Blind set: 84 new sentences, never tuned on** | **52.2%** | **62.8%** |
| Reference text, no speech recognition | 100% | 100% |

- **Honest headline:** about 63% of brand-new spoken reports are fully correct on large-v3. The app asks for what it could not read.
- **By language** (large-v3, clean): Hindi 98%, English 90%, Marathi 70%, Tamil 66%, Telugu 61%, Kannada 46%, Bengali 44%.
- **About 92% of remaining errors** are the recogniser losing words, not the parsing.
- **Fuzz:** millions of generated amounts and times parse 100%; with one slip per number, 99.6-100%. 548 automated tests.
- **What ships in the page, measured on the same clips:** Hindi 90.0% fully correct (stock whisper-base: 13.8%), English 75.0%, Marathi 53.8% (40.0% on a voice never tuned on); on the blind set (new sentences) Hindi 91.7%, English 61.1%, Marathi 41.7%. Hindi in noise: 85.0% at 15 dB, 55.0% at 5 dB. Indian-language Whisper fine-tunes in the page (stock whisper-base: 2.5-6.3%): Telugu 68.8%, Kannada 50.0%, Tamil 47.5%, Bengali 36.3%.
- **Limits:** synthetic voices (edge-tts). Real phone tests in every language come next.

## Slide 9: Users and how many

**Core users: people reporting a financial fraud.**
- 24,02,579 complaints in 2025 (MHA): ÷ 365 ≈ 6,580 a day. 2024: 36,37,288 incidents.
- At stake per complaint: ₹22,495 crore ÷ 24,02,579 ≈ ₹93,600.

**Wider reach:** 870 million Indian-language internet users; 140 million voice users (IAMAI-Kantar 2024). UPI handled 25.47 billion transactions worth ₹31.53 lakh crore in Oct 2026 alone (NPCI, via media).

**Second users:** 1930 operators get a complete, ordered complaint. Banks get the UTR they need to freeze money.

**Planning number (assumption, not a forecast):** 10% of 2025's complainants ≈ 2.4 lakh reports a year, about 660 a day.

## Slide 10: What it depends on, and what if it fails

| Dependency | Cost today | Risk | Fallback |
|---|---|---|---|
| Browser speech recognition | Free | Fails on some machines; may process audio off the device | In-page Whisper; typing and tapping |
| Whisper-base, transformers.js, ONNX Runtime Web | Free, open source | 100 MB first download; slow on low-end phones | WebGPU falls back to WebAssembly; typing |
| Hugging Face model hosting | Free | Outage or policy change | Serve the model files from our own host |
| Static hosting (Vercel) | Near zero, no backend | Pricing changes | Any static host or our Docker image; PWA works offline |
| LLM or paid API | None used | Nothing to get costly | Not needed |

**Planned Indian-language ASR** for Bengali, Kannada, Tamil and Telugu: Bhashini (MeitY, 23 voice languages per its Mar 2026 announcement; we will check each language), AI4Bharat IndicConformer (open models), or Sarvam (commercial). All plug in behind the same interface. If one gets costly, we switch, or fall back to the free path.

## Slide 11: Launch plan

**Reach victims where they already turn for help. These are plans; no partnership is signed.**

- **Weeks 1-4:** real-phone tests with 30-50 people across 7 languages, including seniors and first-time smartphone users.
- **Weeks 3-8:** approach one district cyber cell or state 1930 centre. After each call, operators send the Turant link by SMS or WhatsApp.
- **The official revamp:** the Home Minister directed an AI, multi-language 1930 (Jun 2026). We will offer our 7-language extractor to it.
- **Banks:** a link on fraud-reporting pages and in "report fraud" SMS.
- **QR posters** at bank branches and police stations: "Lost money to a UPI scam? Scan, speak, report."
- **Community:** senior-citizen groups, RWAs and college NSS units: "save this link before you need it".

**90-day targets:**
1. Median time from fraud to complete report under 1 hour.
2. At least 70% of reports include the UTR.
3. At least 40% in a language other than English.
4. Completion above 80% for users over 60.
5. More money held per complaint than the pilot area's baseline.

Turant keeps no server data, so we will measure with an opt-in anonymous count (language, fields filled, never content) agreed with the partner, plus the partner's records.

## Slide 12: Sustainability

- **Free for citizens, always.**
- **Near-zero running cost:** speech and understanding run on the user's phone, so one more user costs almost nothing. Hosting is static files.
- **Funding to pursue:** a state police or I4C pilot; bank CSR or fraud-prevention budgets; a white-label version for banks, routed to their own fraud desk.
- **Reuse:** the engine is also a voice kit, where one config file makes a new form-filling voice app (examples in the repo: khata ledger, health intake, civic grievance).

## Slide 13: Accessibility

- **Large text:** never below 16px, with an "Aa" control for +12.5% and +25%.
- **Read-back:** the summary is spoken and shown; numbers are confirmed.
- **When speech fails:** a shorter re-ask, then choices or a big keypad, then skip. The app blames itself, never the accent.
- **Typing and tapping** for every answer. **Quiet mode** turns speech off.
- **1930 is one tap away** in the top bar. "UTR" is always explained in plain words.
- **No timeouts, no auto-advance;** reduced motion respected.
- **Lighthouse (mobile):** accessibility 100, best practices 100, performance 94. The page loads with no third-party requests: even the fonts are served by Turant.

## Slide 14: Roadmap

1. **Indian-language ASR** for Bengali, Kannada, Tamil and Telugu, measured on the same harness and blind set.
2. **Real-phone tests** in every language, with real voices.
3. **Direct hand-off to 1930 or NCRP** if a public API appears. Today there is none, so the user files.
4. **More scam types** and payment apps.
5. **IVR and feature-phone access** for people without a smartphone.

## Slide 15: Team and links

- **Team:** Shubh Saxena and Sugandhi Agrawal.
- **Live:** https://turant-voice.vercel.app
- **Code:** https://github.com/shubhsaxena2020/turant
- **Try it:** open in Chrome or Edge, tap "Tap to speak", tell a short fraud story. No mic? Tap "No mic? See a sample".
- **Sources:** Parliament replies, official statements, NPCI and IAMAI-Kantar data, with links in `research/facts.md`.
