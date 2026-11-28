# Round 2 submission checklist

Deadline: **Mon 30 Nov 2026, 11:59 pm**. The form fields and the YouTube text are in [`SUBMISSION.md`](SUBMISSION.md). This file covers what is ready, what only Shubh can do, and where every number in the deck comes from.

## Only Shubh can do these

- [ ] **Eligibility (18+ question):** read the FAQ / form wording and answer it yourself. Nothing here answers it for you.
- [ ] **State** field in the form.
- [ ] **Upload the demo video** to YouTube as **Unlisted** (`demo/turant_demo_landscape.mp4`, 1:52), using the title and description in `SUBMISSION.md`, and paste the youtu.be link into the form.
- [ ] **Try it with your own voice** on your phone: open https://turant-voice.vercel.app, tap "Tap to speak", tell a short fraud story in Hindi or English. Expect most fields filled; the app asks for the rest.
- [ ] **Submit the form.** It is final once the links verify.

## Ready (checked 28 Nov)

| Deliverable | Where | Checked |
|---|---|---|
| Live app | https://turant-voice.vercel.app | Live bundle matches the build; Lighthouse mobile 96 / 100 / 100 / 100; 360 / 412 / 1280 px; offline reload |
| Code | https://github.com/shubhsaxena2020/turant (public) | `docker compose up` from a fresh clone builds and serves all three self-hosted speech models (fixed 28 Nov; before that Kannada and Tamil were silently missing) |
| Pitch deck | `deck/Turant-pitch-deck.pdf` (15 pages, 0.4 MB), text in `deck/DECK.md` | Numbers traced below; no slide overflows |
| Demo video | `demo/turant_demo_landscape.mp4` (1:52), `demo/turant_demo_vertical.mp4` | Under the 3-minute limit; not uploaded |
| Tests | app 180, parsers 152, voice kit 261 | All pass |
| Judges' quick guide | `JUDGES.md`, one page as `docs/Turant-judges-guide.pdf` (attach or link it if the form allows) | Every step and sample checked on the live site, 28 Nov |

## Demo video: shot list (the existing 1:52 cut)

| Time | On screen | Caption / voice |
|---|---|---|
| 0:00-0:16 | Home screen: "Lost money to a scam? Just tell me what happened." | The first hour decides whether money can be frozen; reporting means a phone queue or a long English form with a 12-digit number. |
| 0:16-0:24 | "Speaking Hindi" chosen once, "Tap to speak" | Turant turns reporting into a conversation. |
| 0:24-0:40 | Listening bar with live waveform | A real recorded Hindi caller: "Yesterday at 7 pm a customer care call came, he made me download AnyDesk, and took two lakh rupees from my HDFC account." |
| 0:40-0:48 | "Turning your voice into words" | Transcribed on the phone itself; amount, time, scam type and bank go straight into the complaint. |
| 0:48-1:04 | "Please read the 12-digit UTR number", big keypad | It asks only for what is missing, one thing at a time. |
| 1:04-1:20 | "Is this right?" read-back: ₹2,00,000, 26 Nov 7:00 pm, fake customer care, HDFC Bank | Anything can be changed by tapping or saying it; anything unknown is left for the 1930 operator, never guessed. |
| 1:20-1:28 | "Your complaint is ready", 1930 call script | What to say on the 1930 call. |
| 1:28-1:52 | The written complaint in the portal's order, "Copy the whole complaint" | Seven Indian languages, a complete complaint in minutes, nothing to install. |

If it is re-shot: same order, a real phone screen, one Indian-language speaker other than Hindi, and keep it under 3 minutes.

## Links

- Live: https://turant-voice.vercel.app
- Code: https://github.com/shubhsaxena2020/turant
- Measurement log: `harness/JOURNAL.md`; overnight backlog: `harness/BACKLOG.md`

## Where every number in the deck comes from

Recomputed on 28 Nov from the round-58 reports in `harness/reports/` (current rules). "Clean" = no added noise, normal speed.

| Deck claim (slide 8 unless noted) | Value | Report(s) |
|---|---|---|
| Tuning set, clean: turbo / large-v3 | 54.5% / 69.8% | `round58`, `lv3r58` |
| Voices never used for tuning: turbo / large-v3 | 53.4% / 68.4% | `round58`, `lv3r58` (held-out voices) |
| Blind set 1 (84 sentences): turbo / large-v3 | 52.2% / 62.8% | `blind_turbo_r58`, `blind_lv3_r58` |
| By language, large-v3: hi 98, en 91, mr 73, ta 66, te 61, kn 46, bn 44 | | `lv3r58` |
| In-page Hinglish model: Hindi 90.0, English 75.8, Marathi 53.8 (held-out voice 40.0) | | `swift58` |
| In-page, Hindi in noise: 85.0% at 15 dB, 55.0% at 5 dB | | `swift58` |
| In-page on blind set 1: Hindi 91.7, English 61.1, Marathi 45.8 | | `blind_swift58` |
| In-page Indian-language models: Telugu 68.8, Kannada 50.0, Tamil 50.0, Bengali 37.5 | | `te_page58`, `kn_page58`, `ta_page58`, `bn_page58` |
| Unseen speakers, large-v3: 62.2% (tuned voice 71.8%) | | `unseen_report.mjs lv3r58 unseen_lv3_58` |
| Unseen speakers, turbo: 47.1% | | `unseen_report.mjs round58 unseen_turbo_58` |
| Unseen, in-page: Hindi 83.8, English 47.5, Marathi 42.5; Telugu 70.0, Kannada 53.8, Tamil 53.8, Bengali 37.2 | | `unseen_swift58`; `te/kn/ta/bn_unseen58` |
| Blind set 2: large-v3 68% / 73% unseen; in-page 71% / 69% | | `blind2_report.sh 56` (frozen after three aggregate scorings) |
| "About 92% of remaining errors are the recogniser" | | Round 21 error split on turbo (`harness/JOURNAL.md`); round 58 in-page bn/te/kn/ta: 69 of 72 |
| 593 automated tests (slide 8) | | app 180 + parsers 152 + kit 261 |
| Lighthouse 96 / 100 / 100 / 100 (slide 13) | | live site, 28 Nov |
| Blind set 3 (headline) | **pending** | scored once at the 12:00 IST freeze by `harness/blind3_report.sh --final` |

Population and fraud figures (slides 2, 3, 9) come from the sources in `research/facts.md`, not the harness.
