Build "Turant", a mobile-first PWA (React + Vite + Tailwind, no login) where a UPI-fraud victim in India reports it by voice in their own language and leaves with a complete complaint for the 1930 helpline and cybercrime.gov.in.

Users: scam victims who are elders, first-time smartphone users, shopkeepers or gig workers, often with low literacy, cheap Android phones, noise and panic. Languages: Hindi, English, Hinglish, Bengali, Tamil, Telugu, Marathi, Kannada, with regional accents and code-mixing ("mere SBI account se 5000 kat gaye"). Preselect the language from the phone (changeable in the top bar); all text and spoken lines come from one translation file.

Model: a calm phone call with a helper who writes the complaint while you talk; never show empty form fields. One glowing circle at the bottom is the mic: tap to talk, tap to stop, auto-stop after 2 seconds of silence. Each state (idle, listening, thinking, speaking) gets motion, a short sound, vibration and a label. Speech uses the Web Speech API behind a SpeechService interface (swappable for Bhashini). Extraction runs on the phone, so it works offline.

Voice flow:

1. App shows and says: "Namaste. I am Turant, an app. What happened? Tell me in your own words. For example: someone called saying he was from the bank and ₹5,000 was taken."

2. User tells the story freely. Their words appear live in large text. The app extracts: amount ("paanch hazaar", "saade teen hazaar", "do lakh"), time ("das minute pehle", "kal shaam 7 baje"), scam type (fake KYC call, OTP shared, fake customer care, refund trick, QR scan, task job, sextortion), bank, payment app, 12-digit UTR, suspect UPI ID, phone and account.

3. App says what it caught and what is left: "Noted: ₹5,000, SBI, fake KYC call. Just one more thing." The complaint appears as first-person sentences in the user's language, facts highlighted, each missing fact a dotted gap.

4. App asks only for what is missing, one short question with an example at a time: "Please read the 12-digit UTR number from the bank SMS." Reading the whole SMS aloud works too.

5. Amounts and numbers are read back, digits in groups: "I heard 4567, 8901, 2345. Is that right?" User says "haan"/"yes" or taps Yes. "Nahi" re-asks; saying a new value replaces it.

6. Check screen "Is this right?": the amount large, then a plain list with "Change" links, read aloud. One-step corrections: "amount galat hai, 5999 tha" changes only the amount; the app replies "Changed: ₹5,999."

7. Done: "Your complaint is ready. You did the right thing, at the right time. The next 2 hours matter most." A giant "Call 1930 now" button and 4 lines to say on the call, which the app reads aloud.

8. Written complaint in English, in cybercrime.gov.in order, with one "Copy" button. The description is at least 200 characters with none of # $ @ ^ * ~ | ! (the portal rejects them), so UPI IDs stay in the suspect field. Plus a bank message and a safety checklist.

When things go wrong:

- Misheard or nothing usable, 1st time: never repeat word for word and blame the app, not the accent: "Sorry, my mistake. How many rupees? Like five thousand."
- 2nd miss: open a big number keypad (amount, UTR, phone) or a tap list (bank, scam type).
- 3rd miss: "No problem, the 1930 team will ask you this," skip, and show "(to be added later)" in the letter.
- Noise: confidence under 0.6 or a story under 3 words counts as a miss; always show what was heard.
- Silence: "I'm listening. Take your time." Never time out.
- Mixed languages and accents: accept Hinglish, Devanagari and Latin spellings, native digits and bank names in any script ("एसबीआई" = SBI).
- Contradictions ("5000", then later "2000"): ask "Which one is right?" with both values.
- No device voice for the language: speak Hindi or English, keep text in the chosen language.
- Microphone denied or recognition failing offline: say so in one line and switch to typing, keypad and lists.
- "Tell quietly" mode: no sound.
- Save the draft after every answer; offer "Continue your unfinished complaint".

Design: no cards or boxed inputs; one 60px button per screen in the thumb zone; text at least 16px; a 1930 call link and text-size control on every screen. Nothing leaves the phone unless the user taps Copy, Share or Call.

Acceptance test: "Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai, UPI ID tha rahul.kyc@ybl" fills ₹5,000, 10 minutes ago, fake KYC, SBI and rahul.kyc@ybl, then asks only for the UTR.
