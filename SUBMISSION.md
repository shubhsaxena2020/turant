# Round 2 submission: what goes in the form

Deadline **Mon 30 Nov 2026, 11:59 pm**. One submission per team, final once verified (a failed link check sends it back to draft).

| Field | Value |
|---|---|
| This build is | An extension of my Round 1 idea |
| Project name | Turant |
| Theme | Public infrastructure and civic services |
| State | (your state) |
| 1 · Code on GitHub | https://github.com/shubhsaxena2020/turant |
| 2 · YouTube demo | (upload `demo/turant_demo_landscape.mp4` as **Unlisted**, paste the youtu.be link) |
| 3 · Pitch deck (PDF) | `deck/Turant-pitch-deck.pdf` (0.4 MB, 15 pages) |
| 4 · Live link | https://turant-voice.vercel.app |

Tick all four boxes only after checking them:
- [ ] The GitHub repo is public and starts with `docker compose up` (checked strictly on 28 Nov: fresh anonymous GitHub clone, empty build cache, exactly `docker compose up`, ready in 164 s with all three self-hosted speech models; the build also finishes with the model host down or on a throttled, flaky connection. Details in the brief at the top of `harness/JOURNAL.md`).
- [ ] The YouTube video is Unlisted or Public, and at most 3 minutes (ours is 1:52).
- [ ] The deck is a PDF.
- [ ] The build instructions were read and followed.

## YouTube upload text

**Title:** Turant: report a UPI scam by voice, in your language (Build for Bharat 2026)

**Description:**

> A UPI fraud victim speaks in their own words. Here, a caller speaks Hindi. Turant turns the speech into a complete complaint: amount, time, type of scam, bank and the UTR. It asks only for what is missing, reads it back, and hands over a script for the 1930 helpline plus the complaint text for cybercrime.gov.in.
>
> In this demo a real recorded Hindi voice is fed to the browser as the microphone. The app transcribes it on the device with an in-page Whisper model, then extracts the details with rules that work in 7 Indian languages.
>
> Live: https://turant-voice.vercel.app
> Code: https://github.com/shubhsaxena2020/turant
> Build for Bharat 2026 (Scaler × Wispr Flow), Round 2. Theme: Public infrastructure and civic services.

## Before submitting
1. Open the live link on a phone and on a laptop. Tap "No mic? See a sample", then try "Tap to speak" once.
2. Make sure the repo's README opens with the live link and `docker compose up`.
3. Keep everything public and working until results on 2 Dec. The repo must stay public until Round 3 ends if we are shortlisted.
