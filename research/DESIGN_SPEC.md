# Turant UI v2: design spec

Sources: `voice-ux-teardown.md` (130 voice products, 18 teardowns) and `beginner-visual-ux-teardown.md` (135 apps, 18 teardowns). Section refs like V4.3 point to the voice file; B5.4 points to the visual file.

## The model
**A calm phone call with a helper who writes your complaint while you talk** (V4.1). Not a form: the myScheme government-form app let only 2 of 15 users finish alone, while the voice-first Prabodhini let all 15 finish (V2.14). Not a chat: bubbles turn into a wall of boxes.

## Screens (one thing per page, fixed order; B5.1)
1. **Talk** (night band). The helper's line in small centred text; the user's live words, large and left-aligned; the complaint "letter" growing underneath; the breathing presence in the thumb zone. Language is never a gate: a row of script names is the fallback (V4.8, anti-pattern V19).
2. **Check: "यह सही है?"** (paper). Amount as the hero, then a GOV.UK-style list: label above value, a "बदलें" link, and a hairline between rows only (B5.4). Missing facts show in amber as "अभी नहीं पता". The whole summary is read aloud once.
3. **Done** (success field). A tick that draws itself, a calm line, the amber time line, a giant 1930, and a call button. Then the 4 lines to say on the call, and a "what happens next" timeline (B5.6). No confetti.
4. **Complaint document** (sand band). Typeset serif text, no textarea. A sticky "copy" button whose label morphs in place to show it was copied. Then the bank message, the checklist and the acknowledgement number (B5.5).
5. **My reports**: a plain list with hairlines.

## Rules
- **No cards, no bordered panels, no boxed inputs.** Separate content with full-bleed colour bands, type-scale jumps, space, and hairlines inside lists only (B4).
- **Actions:** one filled 60px button per screen in the thumb zone, plus text links. The primary button never moves (B5.1, PhonePe).
- **Type:** Noto Sans (system), Mukta for display, Tiro Devanagari Hindi for the document. Scale 48/32/24/20/18/16, never below 16px. No negative tracking on Indic text; Indic line-height 1.45–1.8 (B5.2). An "Aa" control steps text +12.5% / +25%.
- **Colour:** paper #FAF7F2, ink #1C1B18, body #45423C, muted #6B665D, teal #0E5C63 (the only action colour), night #13233A, mint #8FD6C6, sand #EFE8DC, success #1E6B43 / #E3EFE6, amber #7A4B00 on #FBEFD5, stop #A1271B. Red is only for "don't pay / don't share OTP" (B5.3).
- **Presence:** one soft glowing circle in the thumb zone. Idle breathes on a 5s cycle; listening is brighter and reacts to voice; thinking shimmers slowly; speaking ripples. Every state is shown in text too: "बोलिए", "सुन रहा हूँ…", "लिख रहा हूँ…" (V4.2).
- **Letter:** 3–6 first-person sentences in the user's language. Facts are bold, with a highlighter wash. A missing fact is a dotted gap inside the sentence. There are no "Amount:" labels; the sentence is the label (V4.3).
- **Confirmation by risk:** the story is confirmed implicitly. Amounts and IDs answered to a question are confirmed explicitly: the big value is shown and spoken, and the user says or taps "हाँ / नहीं" (V4.6). The final read-back happens on Check.
- **Errors** (V4.7):
  - 1st miss: a shorter re-ask, never verbatim.
  - 2nd miss: show choices or a big keypad.
  - 3rd miss: "कोई बात नहीं, 1930 वाले पूछ लेंगे", then skip.
  - Always blame the app, never the user's accent.
- **Always visible:** "1930" call link in the top bar (Be My Eyes pattern; anti-pattern V17).
- **Sound and haptics:** three earcons (open, close, captured) and one success chime, plus a vibrate tick on Android (V4.9). Quiet mode ("चुपचाप बताएं") turns off speech and switches to typing and choices.
- **Motion:** a 240ms page turn, transform and opacity only, and `prefers-reduced-motion` respected. No timeouts, no auto-advance on decisions, no toasts that vanish (B5.7, B5.9).
- **Jargon:** "UTR" is always glossed as "पैसे भेजने का नंबर (UTR)".
