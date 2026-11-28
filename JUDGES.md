# Turant in 5 minutes: a guide for judges

**Open:** https://turant-voice.vercel.app in **Chrome or Edge**, on an Android phone or a laptop. Allow the microphone when asked. No account, nothing to install.

## Before you speak

- Tap **"Speaking English · Change"** and pick the language you will speak: English (India), Hindi, Bengali, Tamil, Telugu, Marathi or Kannada. The screens stay in English.
- Then tap **"Tap to speak"**, tell what happened in one go, and stop talking (or tap the black bar).
- **No microphone, or would rather not speak?** Tap **"Type instead"** on the first screen and type the story, or tap **"No mic? See a sample"** to watch a recorded story go through.

## Four things to try (written for this guide, not from our test sets)

| Speaking language | Say or type | Turant fills in |
|---|---|---|
| English | *A man called saying he was from Paytm customer care. I installed AnyDesk and 18,500 rupees went from my Axis Bank account yesterday at 6 pm.* | ₹18,500 · yesterday 6:00 pm · fake customer care · Axis Bank · Paytm |
| Hindi | *कल रात नौ बजे किसी ने KYC अपडेट का लिंक भेजा, मैंने क्लिक किया और मेरे HDFC खाते से बारह हज़ार रुपये कट गए।* | ₹12,000 · yesterday 9:00 pm · fake KYC · HDFC Bank |
| Tamil | *இன்று காலை ஒருவர் ஓடிபி கேட்டார், நான் சொன்னேன், என் எஸ்பிஐ கணக்கிலிருந்து ஏழாயிரம் ரூபாய் போய்விட்டது.* | ₹7,000 · this morning · shared an OTP · SBI |
| Bengali | *গতকাল বিকেল চারটায় ফোনপে দিয়ে আমার পিএনবি অ্যাকাউন্ট থেকে নয় হাজার টাকা চলে গেছে।* | ₹9,000 · yesterday 4:00 pm · PNB · PhonePe |

Typed, each fills exactly these fields (checked on the live site, 28 Nov). Spoken, the speech recogniser can mishear a word, and then Turant asks for it.

## What a correct report looks like

1. **"Noted: ₹18,500, 27 Nov, 6:00 pm, Fake customer care, Axis Bank, Paytm."** Then it asks only for what is missing, one thing at a time (the 12-digit UTR from the bank SMS, the fraudster's number or UPI ID). Each question can be answered by voice, typing or a big keypad, or skipped.
2. **"Is this right?"**: one read-back screen. Change anything by tapping or by saying it. Nothing is guessed: an unknown detail is marked "Not known" for the 1930 operator.
3. **"Your complaint is ready"**: what to say on the 1930 call, the complaint text in the order cybercrime.gov.in asks for it, a message for the bank, and a checklist.

## On a weak connection

- The browser's own speech recognition needs the internet. If it fails, Turant reads your recording with a speech model inside the page. That model downloads once: about 100 MB (Bengali and Tamil about 290 MB), with a progress line. Estimated time: 1-2 minutes on Wi-Fi or good 4G (Bengali and Tamil about 4); measured 13 minutes (32 for Bengali and Tamil) on a slow 3G connection.
- If the download fails, Turant says so and keeps typing open. Your report stays on the phone; reopening the link works offline.

## How accurate is it, honestly

About **6 to 7 in 10** brand-new spoken reports come out fully correct (every field right, nothing invented), measured on sentences and speakers never used for tuning. For the rest, Turant asks instead of guessing. Most remaining errors are the speech recogniser losing words, not the understanding. The final blind-set number and the full method are in the README.

*Turant has no server and keeps no copy of what you say or type; Chrome's or Edge's own speech recognition may process the audio on the browser maker's servers (the in-page fallback does not). Code: https://github.com/shubhsaxena2020/turant*
