# demo-video: scripted, narrated product demos in one command

Writes a scenario (JSON) and gets back a 1080x1920 vertical and a 1920x1080 landscape MP4:
- the real app recorded at phone size with Chrome's screencast at 2x (sharp text)
- narration with an Indian neural voice (edge-tts; default en-IN-NeerjaNeural), one line per step
- each step waits until its line has been spoken, so picture and voice stay in sync
- burned-in captions (Nirmala UI, so Hindi/Tamil/Bengali captions also render), title text
- loudness normalised to -16 LUFS

```bash
npm install                     # playwright-core only; uses the Chromium already in ms-playwright
./make.sh scenarios/turant.json # serve the app first at the scenario's url
```

Scenario format (see `scenarios/turant.json`):
`{ title, url, locale, voice, rate, init: [js], steps: [{ say, do: [{click|waitFor|fill|wait|scroll}], minMs?, padMs? }] }`.
Selectors: `testid:<id>`, `text:<visible text>`, or any CSS selector. In-app speech is muted while recording (the narration replaces it).

Round 2 use: write the 6-8 step story of the build (problem → speak → app understands → confirm → result → impact line), run it, upload the landscape cut, and keep the vertical one for social posts.
