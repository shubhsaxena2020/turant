Build "Turant", a mobile-first installable web app (PWA) where a victim of UPI or online payment fraud in India reports it by voice, in their own language, within minutes, and leaves with a complete complaint for the 1930 helpline and cybercrime.gov.in.

Users: people who just lost money to a scam: elders, first-time smartphone users, shopkeepers, gig workers. Assume low literacy, a cheap Android phone, shaky 3G, noise and panic.

Interaction model: a calm phone call with a helper who writes the complaint while you talk. Not a form, not a chat; never show empty input fields.

Design rules: no cards, bordered boxes or textareas. Separate content with full-bleed colour bands, large type and hairlines between list rows. One filled 60px button per screen in the thumb zone, plus text links. Text never below 16px. Calm palette: warm paper, night blue, teal actions; urgency in amber, red only for "never share an OTP". A "1930" call link on every screen, and an "Aa" text-size control.

Languages: Hindi, English, Hinglish, Bengali, Tamil, Telugu, Marathi, Kannada, from one translation file keyed by language code. Language is never a gate: preselect it from the phone, changeable from the top bar.

Tech: React + Vite + Tailwind, no login. Web Speech API speech-to-text and speechSynthesis behind a SpeechService interface (swappable for Bhashini). Extraction runs on the device; reports in IndexedDB.

Screens and voice steps:

1. Talk (night blue). Greeting: "Namaste. I am Turant, an app. What happened? Tell me in your own words", plus an example. At the bottom, one breathing glowing circle is the mic: tap to talk, tap to stop, auto-stop after 2 seconds of silence. Four states, each shown by motion, sound, vibration and a text label: idle, listening (brighter, reacts to voice), thinking ("Writing it down…") and speaking (ripples). While listening, the user's words stream in large text.

2. The letter. After the first answer, show the complaint as 4 to 6 first-person sentences in the user's language: "It happened 10 minutes ago. My SBI account lost ₹5,000…". Facts are bold with a highlighter wash, and a missing fact is a dotted gap inside the sentence. Extract amount ("4999", "paanch hazaar", "saade teen hazaar", "do lakh", Devanagari numerals), time ("das minute pehle", "kal shaam 7 baje"), scam type (fake KYC call, OTP shared, fake customer care, refund trick, QR scan, investment/task job, sextortion, other), bank, payment app, 12-digit UTR (also from a bank SMS read aloud), suspect UPI ID, phone and account.

3. One question at a time, only for what is missing, in one breath with an example: "Which bank is your account in?". Say "Noted: ₹5,000, SBI. Just two more things." Read amounts and IDs back, digits in groups ("4567, 8901, 2345"), and ask "Is that right?"; accept a spoken "haan" or a tap. Explain jargon: "money-transfer number (UTR), from the bank SMS". Links: "Press the numbers", "Choose from a list", "Type it", "Skip, 1930 will ask".

4. Check: "Is this right?" Amount in 48px as the hero, then a list with a label above each value, a "Change" link and hairlines between rows. Missing facts show "Not known yet" in amber. Read the summary aloud. "Change" opens a bottom sheet: Listen, Say it again, Press numbers, Choose, or Type. "Change something by speaking" accepts one-step corrections like "amount galat hai, 5999 tha".

5. Done (soft green). A tick draws itself: "Your complaint is ready. You did the right thing, at the right time." Then "The next 2 hours matter most" in amber, a giant 1930 and "Call 1930 now". Below: 4 lines to say on the call, a warning never to pay anyone to "get money back", and a "what happens next" timeline. No confetti.

6. Written complaint. The English complaint in the cybercrime.gov.in financial-fraud order, typeset in a serif font on a sand band like a document. The incident description is at least 200 characters without # $ @ ^ * ~ | ! (the portal rejects them, so UPI IDs stay in the suspect field). A sticky "Copy the whole complaint" button turns green and says "Copied" in place, with no vanishing toast. Also: copy description only, open portal, WhatsApp to family, the bank message, a tick-off checklist and the acknowledgement number.

7. Past complaints: plain list, Draft or Ready, "Delete all".

Speech errors: never repeat a prompt verbatim; blame the app, not the accent. On the 1st miss, ask a shorter question. On the 2nd, open the keypad or list. On the 3rd, say "No problem, the 1930 team will ask you this" and skip. Low confidence (under 0.6) or a story under 3 words counts as a miss. Never auto-advance a decision or time out.

Low connectivity: a service worker caches the app and rules. Save the draft after every answer and offer "Continue your unfinished complaint" on reopening. Show an offline note. Everything is built offline. If speech recognition needs the network and fails, say so and switch to typing.

Error states: microphone denied (how to allow it, plus typing), no speech support (typing), no device voice (speak Hindi or English), contradictory answers ("Which one is right?"), over ₹1,00,000 or older than 3 days (also visit the cyber police station). "Tell quietly" mode turns off all sound and switches to typing and lists.

Privacy: nothing leaves the phone unless the user taps Copy, Share or Call; account numbers show only the last 4 digits.

Acceptance test: say "Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai, UPI ID tha rahul.kyc@ybl". The letter fills ₹5,000, 10 minutes ago, fake KYC call, SBI and rahul.kyc@ybl. The app asks only for the UTR, reads it back, then shows Check and the Hindi 1930 script.
