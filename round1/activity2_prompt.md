Build "Turant", a mobile-first installable web app (PWA) where a victim of UPI or online payment fraud in India reports it by voice, in their own language, within minutes, and leaves with a complete complaint for the 1930 helpline and cybercrime.gov.in.

Target users: people who just lost money to a scam: elders, first-time smartphone users, shopkeepers, gig workers. Assume weak English, a cheap Android phone, shaky 3G, a noisy shop and a person in panic. Design for one thumb: text at least 18px, high contrast, one clear action per screen.

Languages: Hindi, English, Hinglish (code-mixed), Bengali, Tamil, Telugu, Marathi, Kannada. All UI strings and spoken prompts come from one translation file keyed by language code (hi-IN, en-IN, bn-IN, ta-IN, te-IN, mr-IN, kn-IN). Accept mixed-language speech and Indian accents; never force English.

Tech: React + Vite + Tailwind, no login. Speech-to-text with the browser Web Speech API using the chosen language code, behind a SpeechService interface so it can later be swapped for Bhashini or another Indic ASR. Text-to-speech with speechSynthesis, same interface. All extraction runs on the device so the core flow works offline. Store complaints in IndexedDB.

Screens and voice steps:

1. Language screen. Large tiles with each language name in its own script. The app also says "Apni bhasha chuniye" and listens: if the user says "Tamil" or "Hindi", select it.

2. Home. One giant mic button labelled "Tell us what happened". Under it, a red strip: "Lost money? Report within 1 hour. Call 1930." with a tap-to-call link.

3. Listening. Show a live waveform and the transcript word by word so the user knows they are heard. Stop automatically after 2.5 seconds of silence or when the user taps Done. Allow multiple turns, appending each to the transcript.

4. Follow-up questions. Parse the transcript into these fields: amount (handle "4999", "₹4,999", "paanch hazaar", "five thousand", "saade teen hazaar"), date and time (handle "abhi", "10 minute pehle", "kal shaam", "yesterday 7 pm" and convert to an absolute timestamp), scam type (fake KYC or bank call, OTP shared, fake customer care, wrong-transfer or refund trick, QR code scan, investment or task job scam, sextortion, other), victim bank, payment app (PhonePe, Google Pay, Paytm, BHIM, bank app), UTR or transaction ID (12-digit number), suspect UPI ID (pattern name@handle), suspect phone number (10 digits starting 6-9), suspect bank account if spoken. For every required field still empty, ask one short spoken question in the user's language and show it as text too, with an example answer. If the user doesn't know, offer help ("Read the bank SMS aloud") and allow Skip. Required: amount, time, scam type, bank. UTR and suspect details are strongly recommended but skippable.

5. Review. Show each field as a card with a confidence dot (green, amber, red). Read the whole summary aloud. Numbers must be read digit by digit in groups ("4 5 6 7, 8 9 0 1"). The user corrects by voice: "amount galat hai, 5999 tha" updates only that field. Every card also has a small edit pencil for typing.

6. Done / Action screen. Show: (a) "Call 1930 now" button plus a 4-line script in the user's language to read to the operator, built from the fields; (b) the cybercrime.gov.in financial fraud fields (bank, UTR, date, amount, suspect UPI ID or phone) plus an English incident description of at least 200 characters with none of # $ @ ^ * ~ | ! (the portal rejects them, so UPI IDs go only in the suspect field), each with Copy, and an "Open portal" link; (c) a message to send to the bank, with Copy and Share; (d) a share-to-family WhatsApp link; (e) a spoken and written checklist: block card or UPI, change PIN, do not share OTP, keep screenshots, note the complaint acknowledgement number.

7. My reports. List of saved reports with status Draft or Ready and the time saved.

Noise and speech errors: If the ASR confidence is below 0.6 or the transcript is under 3 words, say "Sorry, I didn't catch that, please say it again a bit closer to the phone" and keep previous text. After two failures in a row, show a keyboard fallback with the same question. Always show what was heard. "Ek minute ruko" or "wait" pauses listening for 20 seconds.

Low connectivity: The app shell, translations and extraction rules are cached by a service worker. If speech recognition fails because it needs the network, tell the user and switch to typing in their language, keeping the same steps. Save the draft after every answer so a dropped connection or closed tab loses nothing. Show an offline badge. Generate the 1930 script and bank message fully offline.

Error states: Microphone permission denied (show how to allow it, with a big "Type instead" button); browser without speech support (go straight to typing mode); language not supported by the device voice (fall back to Hindi or English and say so); contradictory answers (ask which one is right); amount above ₹1,00,000 or older than 3 days (also advise visiting the nearest cyber police station).

Privacy: no data leaves the phone unless the user taps Share or Copy. Show only the last 4 digits of account numbers. "Delete all" on My reports.

Acceptance test: Speak "Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai, UPI ID tha rahul.kyc@ybl". The app should fill amount 5000, time 10 minutes ago, scam type fake KYC call, bank SBI, suspect UPI rahul.kyc@ybl, then ask only for the UTR, then produce the review and the 1930 script in Hindi.
