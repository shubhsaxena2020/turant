# Turant: report a UPI fraud by voice, in the golden hour

**Live:** https://turant-voice.vercel.app · **Run it yourself:** `docker compose up`, then open http://localhost:3000 (the first run builds for about 3 minutes; no keys, no `.env`, no GPU; [requirements](#run-and-develop))
Theme: *Public infrastructure and civic services* (Build for Bharat, Scaler × Wispr Flow, Round 2)

![Turant, left to right: tell what happened → it listens and writes → one read-back screen → call 1930 with a script → the complaint for cybercrime.gov.in](docs/img/flow.png)

**Judges:** a one-page guide with sample sentences in four languages is in [`JUDGES.md`](JUDGES.md) (PDF: [`docs/Turant-judges-guide.pdf`](docs/Turant-judges-guide.pdf)).

Demo video (1:52, a real Hindi voice going through the live app): [`demo/turant_demo_landscape.mp4`](demo/turant_demo_landscape.mp4)

Someone has just lost money to a UPI scam. The money can still be frozen if it is reported within the first hour or two, but reporting means a 1930 call queue or the cybercrime.gov.in form: an OTP login, a captcha, and a 200-character description with the bank, UTR, date and amount typed in English.

Turant turns that into a conversation. You tap once and say what happened in your own words, for example: *"Someone called from customer care, made me install AnyDesk, and two lakh rupees went from my ICICI account yesterday at 7 pm."* Turant then:

1. **Writes the complaint while you talk.** It picks out the amount, time, type of scam, bank, payment app, UTR and the fraudster's UPI ID, phone or account number.
2. **Asks only for what is missing,** one short question at a time ("Please read the 12-digit UTR number from the bank SMS"). Each answer is spoken, or typed or tapped if you prefer.
3. **Reads it back** ("Is this right?") so you can change anything by voice.
4. **Hands you what to do next:** a script to read to the 1930 operator, the complaint text in the order the cybercrime.gov.in portal asks for it, a message for your bank, and a checklist.

No account, no Turant server, and the complaint never leaves the device unless you copy or share it. The understanding (rules) runs on the device. One caveat on audio: when the browser's built-in speech recognition is used (Chrome / Edge), the browser maker may process the audio on its servers. The in-page Whisper fallback keeps audio on the device.

## Try it in one minute

- **No microphone?** Tap **"No mic? See a sample"** to watch a recorded story go through the same pipeline as real speech.
- **With a microphone:** tap **"Tap to speak"**, tell a short fraud story, then stop talking (or tap the black bar).
- **Browsers:** Chrome or Edge on a laptop or Android phone. The microphone needs HTTPS or `localhost`.

## Why voice, and why now

- **Losses:** Indians reported losing **₹22,845 crore to cyber fraud in 2024**, across **36 lakh** financial-fraud incidents (MoS Home, Lok Sabha, Jul 2025). In 2025 it was ₹22,495 crore across 24 lakh complaints.
- **Speed works:** the 1930 / CFCFRMS system has held back **₹11,158 crore** in **32.8 lakh** complaints (to 30 Jun 2026). Police describe a "golden hour": victims who report within about 1-3 hours are the ones whose money can still be frozen.
- **Reporting is slow and English-heavy:**
  - **1930 calls:** each complaint takes about 16-18 minutes to register by hand (Bihar).
  - **The portal:** it asks for typed details, a UTR and an ID upload.
  - **Official plans:** the Home Minister has directed an AI and multi-language revamp of 1930 (Jun 2026).
- **Who uses Indian languages:** 98% of India's 886 million internet users use the internet in Indian languages (IAMAI-Kantar 2024).
- **Elderly victims:** senior citizens filed 4% of complaints but lost about 18% of the money (2025).

Sources with links: [`research/facts.md`](research/facts.md).

## How the voice works

```
microphone ──► browser speech recognition (Chrome / Edge, live words)
     │                 │  returns nothing, or ends early?
     │                 ▼
     └──► our own recorder + voice detection ──► Whisper in the page (transformers.js, on-device)
                                   │
                                   ▼
             rule-based extractor (7 languages) ──► one question at a time ──► read-back ──► complaint
```

- **Two speech recognisers:**
  - The browser's own speech recognition gives live words when it works.
  - Turant also records the audio itself. If the browser returns nothing, returns a single misheard word or ends early (all seen with Chrome on Windows), Whisper reads the recording **inside the page**. This path uploads no audio.
  - **The in-page model depends on the speaking language:**
    - Hindi, English (India) and Marathi use **Whisper-Hindi2Hinglish-Swift** (Oriserve, Apache-2.0), which writes clean Hinglish.
    - Bengali uses a Bangla whisper-small fine-tune (arif11/bangla-ASR-v5, Apache-2.0); Telugu, Kannada and Tamil use IIT Madras's **IndicWhisper** fine-tunes (vasista22, Apache-2.0), converted to ONNX by `harness/convert_whisper.py` and served with the site from `/models/`.
  - **Download and speed:** about 100 MB (Bengali and Tamil about 290 MB; the app shows the size for the chosen language while it downloads), downloaded once and then cached. A 12-second story transcribes in about 8 seconds on a laptop: cross-origin isolation lets it use several CPU threads.
  - Turant's own voice detection decides when the person has finished, so a recogniser that gives up early can't cut them off.
  - Add `?speech=whisper` to the link to skip the browser recogniser and use only the in-page path.
- **Understanding is rules, not an LLM.** On the same transcripts, an LLM invented times and scam types. On its own it was fully correct on 16.5% of reports, against 43.5% for the rules at the time (see `harness/JOURNAL.md`). The rules read numbers, dates, banks and IDs in **Hindi, English/Hinglish, Bengali, Tamil, Telugu, Marathi and Kannada**, including the misspellings speech recognisers make:
  - "पाँच हज़ार" = ₹5,000.
  - "to lock rupees" = ₹2,00,000.
  - "9 बजकर 30 मिनट" = 9:30.
  - A UTR read out digit by digit.
- **Asking beats guessing.** A wrong amount on a police complaint is worse than a missing one. A spoken "₹5" (where "thousand" was probably lost) is offered back as "₹5,000?", and an unclear value is asked again rather than written in.
- **UI:** English text, with a choice of *speaking* language. The look is in the style of Wispr Flow's website: cream paper, a serif headline, lilac buttons, and a black waveform bar while recording.

## How well it works (measured, reproducible)

The `harness/` turns written fraud reports into speech with Indian neural voices (edge-tts). It adds noise (pink, babble and traffic, at 15 and 5 dB), runs the speech through Whisper, then scores every field the extractor fills.

| Fully correct reports (every field right, nothing spurious) | Whisper turbo | Whisper large-v3 |
|---|---|---|
| Tuning corpus, clean speech (280 cases, 7 languages) | 54.5% | 70.2% |
| Voices never used for tuning | 53.4% | 68.4% |
| **Blind set: 84 new sentences written after tuning, never tuned on** | **52.2%** | **63.9%** |
| Reference text (no speech recognition) | 100% | 100% |

- **By language** (large-v3, clean): Hindi 98%, English 91%, Marathi 73%, Tamil 66%, Telugu 61%, Kannada 46%, Bengali 44%.
- **Where the errors are:** about 92% of the remaining errors are the recogniser losing words, mostly in Bengali and Kannada, not the parsing. The rules alone can reach at most about 71% on these transcripts.
- **What ships in the page** (`harness/asr_wbase.mjs` runs the app's own in-page models on the same clips; clean, fully correct reports):

  | In-page model | Hindi | English | Marathi | Bengali / Tamil / Telugu / Kannada |
  |---|---|---|---|---|
  | whisper-base | 13.8% | 50.0% | 10.0% | 2.5-6.3% |
  | **Hindi2Hinglish-Swift + rules tuned to its Hinglish** | **90.0%** | **75.8%** | **53.8%** (held-out voice 40.0%) | not used |
  | **Indian-language Whisper fine-tunes** (Bangla small; IndicWhisper Telugu / Kannada base, Tamil small) | | | | **Telugu 68.8%, Kannada 50.0%, Tamil 50.0%, Bengali 37.5%** |

  On the **blind set** (new sentences, never tuned on), the in-page model gets Hindi **91.7%** (the same as the text-only ceiling for those sentences), English 61.1% and Marathi 45.8%. In noise, Hindi stays at 85.0% at 15 dB (a busy room) and 55.0% at 5 dB (a roadside).
  The Indian-language models were measured on both voices with no rule changes. Telugu and Kannada in the page now beat server Whisper large-v3 (61% and 46%). Tamil's 196 MB decoder is split into chunks under the host's 100 MB per-file limit (`harness/split_onnx.py`; same weights, identical transcripts). The Telugu, Kannada and Tamil files are not in git: the Docker build fetches them from the live site (`prototype/scripts/fetch-models.mjs`), and if that fails the app uses whisper-base for them. `harness/convert_whisper.py` rebuilds them from the original models.
- **Generalisation: speakers never used for tuning.** The rules were tuned by reading one Indian voice per language. To check they generalise, every case was also read by four Azure multilingual voices that were never used for tuning (French, Italian and Brazilian speakers reading the Indian-language text: a harder, accented test). Fully correct reports, clean speech (`harness/unseen_report.mjs`):

  | Path | Tuned voice | Held-out Indian voice | **Unseen speakers** | Unseen, 15 dB noise |
  |---|---|---|---|---|
  | Server Whisper large-v3, all 7 languages | 71.8% | 69.7% | **62.7%** | 62.4% |
  | Server Whisper turbo, all 7 languages | 52.4% | 53.9% | **47.1%** | 44.4% |
  | In-page Hinglish model: Hindi / English / Marathi | 87.5 / 75.0 / 67.5% | 92.5 / 76.3 / 40.0% | **83.8 / 47.5 / 43.8%** | 77.5 / 52.5 / 40.0% |
  | In-page Telugu / Kannada / Tamil / Bengali | 70.0 / 50.0 / 52.5 / 35.0% | 67.5 / 50.0 / 47.5 / 40.0% | **70.0 / 57.5 / 53.8 / 38.5%** | 62.5 / 47.5 / 47.5 / 35.9% |

  A **second blind set** (42 cases, written after the night's tuning, scored only in aggregate, three times: when written and after the English rounds, then frozen): reference text 97.6%; large-v3 68% fully correct on the tuning voices and 73% on unseen speakers; the in-page models 71% (69% with unseen speakers).

<!-- blind3 -->
  **Blind set 3, the headline** (42 new sentences in 7 languages, committed before any scoring; measured once at the 12:00 freeze, commit 52759d8 / round 63, run 28 Nov 12:01-12:23 IST; never re-scored): reference text 95.2%; spoken, fully correct reports: server Whisper large-v3 **65%** (62% tuning voices, 68% unseen speakers; 174 runs), the in-page models **72%** (72% / 73%; 174 runs).
<!-- /blind3 -->

  The unseen numbers agree with the blind set (63.9% on large-v3), so about 6 in 10 brand-new spoken reports come out fully correct and the app asks for the rest. Hindi, Telugu, Kannada and Tamil hold up on new speakers; the Marathi tuned-voice number is inflated (held-out and unseen are about 40%); English drops on these voices mostly because 18 of the English cases are romanised Hindi read with a European accent (11-17% fully correct, not a realistic speaker); on the English sentences themselves, unseen speakers get 58.1% in the page and 87.1% on large-v3.
- **What is left is the recogniser, not the rules.** On the unseen speakers' analysis half, Bengali / Tamil / Telugu / Kannada in the page have 72 field errors; 69 are the recogniser losing the words and 3 were a form the rules missed (fixed in round 58; the Telugu and Bengali unseen numbers above include them, gained on the analysis half only). A bigger Kannada model (IndicWhisper small, 288 MB) was measured as the next lever and **not adopted**: no gain on unseen speakers (53.8% both), worse on Indian voices (41.3% vs 50.0%), 3x the download (`harness/JOURNAL.md`, item 17). A Marathi whisper-small fine-tune was worse still (unseen 16.3% vs 42.5% on the Hinglish model; item 18), so Marathi stays on the Hinglish model.
- **Fuzz testing:** millions of generated amounts and times are parsed 100% correctly. With one recogniser-style slip per number, 99.6-100% are still read correctly.
- **Tests:** 183 unit tests in the app, 152 in the parsers and 261 in the voice kit.
- **Lighthouse** (mobile, live site, 28 Nov): accessibility 100, best practices 100, SEO 100, performance 96 (first paint 1.1 s, largest paint 2.5 s on a throttled phone connection). Fonts are self-hosted, so the page loads with no third-party requests (the Hinglish and Bengali speech models are fetched from Hugging Face only when the in-page fallback is needed; Telugu, Kannada and Tamil are served by Turant).

### Performance on low-end phones

Measured on the live site in Chromium with DevTools throttling (CPU 4x and 6x slower; network "Fast 3G" 1.44 Mbit/s with 562 ms latency and "Slow 4G" 1.6 Mbit/s with 150 ms latency, both run at 90%), Chromium limited to 5 laptop cores, a cold cache, and a recorded 11.3-second Hindi story as the microphone (`?speech=whisper`, the in-page path). Throttling emulates a slow phone; it is not one.

| | Slow 4G | Fast 3G |
|---|---|---|
| App ready ("Tap to speak" usable, main thread settled), CPU 4x / 6x | 2.6 s / 3.0 s | 3.7 s / 4.2 s |
| JS heap after load | 4 MB | 4 MB |

- **The first in-page speech download** happens only when the browser's own recogniser fails, then it is cached. Measured at 0.16 MB/s on Fast 3G: Hindi / English / Marathi, Telugu or Kannada (about 125 MB with the runtime) take about 13 minutes; Bengali or Tamil (about 310 MB) about 32 minutes; Slow 4G is about 10% faster. A progress line shows the size and percentage, the page stays usable (taps answered in 120-150 ms while downloading), and typing is always offered.
- **From the end of speech to a filled report** (Hindi model cached): 4.6 s at normal speed, 11.2 s at CPU 4x, 15.9 s at CPU 6x. Peak JS heap 115-190 MB.
- **Known limit on slow CPUs:** the app warms the model up while the person is still talking, so it is ready when they stop. On a 6x slower CPU that warm-up keeps the main thread busy, and the "Listening" bar ends about 8 s after the person stops (on time at normal speed). Tapping the bar ends it at once, and the screen says so. The fix is running the speech model in a worker (ONNX Runtime's proxy mode); it is not shipped before Round 2 because it needs real-phone testing.
- **A failed download** (weak signal) now says so: "the voice model could not download on this connection; tap to speak again when the signal is better, or type below". Retrying with the network back filled the report in 19 s.

The full log of every tuning round, what changed and what it gained is in [`harness/JOURNAL.md`](harness/JOURNAL.md).

## Run and develop

```bash
docker compose up                # http://localhost:3000, no keys or .env needed (.env.example lists the optional port)

# or, for development
cd prototype
npm install
npm run dev                      # http://localhost:5173
npm test                         # unit tests
```

`docker compose up` needs nothing else: no API keys, no `.env`, no GPU, no git-lfs and no local model files.
- **Docker:** Docker with Compose v2 (the `docker compose` command): Docker Desktop, or Docker Engine 20.10+ with the compose plugin. Checked on 28 Nov with Docker 29.9.3 and Compose 5.7.0, from a fresh GitHub clone with an empty build cache: ready on http://localhost:3000 in 164 s.
- **Machine:** about 4 GB free disk (base images, build cache and the 0.9 GB image) and about 2 GB of memory available to Docker (the build peaked at 1.1 GB); the running server uses about 10 MB.
- **Internet during the build:** npm packages, the two Docker base images, and the Telugu, Kannada and Tamil speech models (about 490 MB, fetched from the live site). Each file is retried, and a stalled download times out and is retried. A model that still fails is skipped: the build finishes and the app uses stock whisper-base for that language (checked with the model host blocked).
- **In the browser:** on first use, the Hindi, English and Marathi model and the Bengali model download from Hugging Face, and the speech runtime from cdn.jsdelivr.net. Typing a report works without them.
- **Port 3000 taken?** `TURANT_PORT=3001 docker compose up`, or put `TURANT_PORT=3001` in a `.env` file (see `.env.example`).

Re-run the speech evaluation (needs Python, edge-tts and a Whisper server; see `harness/README.md`): `cd harness && node run_eval.mjs --name x`.

## What is in this repository

| Folder | What |
|---|---|
| `prototype/` | **The app** (React + TypeScript + Vite PWA, works offline): extraction rules, the question flow, outputs, and the in-page Whisper fallback. |
| `harness/` | Speech-to-report evaluation: corpus (280 cases), three blind sets (84 + 42 cases scored only in aggregate; a third, 42 cases, committed unscored and scored once at the end), a 40-case robustness set, 4 unseen speakers, TTS, noise, ASR, scoring (`eval_all.sh`, `unseen_report.mjs`) and the tuning journal. |
| `round2-kit/indic-numbers/` | Shared parsers for numbers, times and banks in 7 languages, with fuzz tests. |
| `round2-kit/voice-kit/` | The same voice engine as a reusable kit, where one config file makes a new slot-filling voice app (examples: khata ledger, health, civic grievance). |
| `research/` | Sourced facts, voice-UX and accessibility research, and the design spec. |
| `round1/` | Our Round 1 submission (idea, build prompt, impact). |

## Dependencies and their risks

| Dependency | Used for | If it gets costly or disappears |
|---|---|---|
| Browser speech recognition (Chrome / Edge) | Live words while speaking | Free. It already fails on some machines, and the in-page Whisper takes over. |
| Whisper via transformers.js + ONNX Runtime Web (open source); models: Oriserve Hindi2Hinglish-Swift and a Bangla whisper-small (from Hugging Face), IIT Madras IndicWhisper Telugu / Kannada / Tamil (converted, served by Turant), whisper-base; all Apache-2.0 | On-device speech recognition fallback | Free and open source; self-hosted where the app serves them. |
| Hosting (Vercel now; any static host or the Docker image) | Serving the app | Static files only, so near-zero cost. |
| Server-grade Indian-language ASR (option: Bhashini / AI4Bharat IndicConformer / Sarvam) | Accuracy beyond the on-device models, mainly Bengali | Behind one small interface (`src/lib/speech.ts`), so the provider can be swapped without touching the screens. |

## Honest limitations

- **Speech accuracy:** about 6 in 10 brand-new spoken reports come out fully correct (blind set and unseen speakers); the app asks for the rest. Bengali is the weakest (in the page about 37%); Marathi and English drop on accented, unseen speakers. Most remaining errors are the recogniser losing words, not the parsing.
- **Whisper fallback:** the first use downloads about 100 MB (290 MB for Bengali and Tamil). Live words appear only when the browser's own recogniser works. Every language now has an Indian-language model for the in-page fallback.
- **Filing:** Turant prepares the complaint and the call script. Filing still happens on the official 1930 line or cybercrime.gov.in, which have no public API.
- **Test speech:** our harness voices are synthetic (edge-tts). Real phone tests in each language are the next step.

## Team

Shubh Saxena and Sugandhi Agrawal ("Shubh's team"), Build for Bharat 2026.
