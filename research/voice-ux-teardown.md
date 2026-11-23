# Turant: Voice & Conversational UX Teardown

Research for the Turant redesign. Scope: voice and conversational products, plus research on low-literacy and voice-first users. Mass-market Indian apps, elder-mode phones and general visual craft are covered by the second researcher.
Compiled 2026-11-21.

**Evidence tags (used throughout)**
- **[S]**: read directly from a source during this research. The URL is in §5 Sources.
- **[K]**: prior product knowledge, not re-checked this session. Treat as likely but verify against the live product before quoting.
- **[I]**: my inference or recommendation.

---

## 0. TL;DR for the product owner

1. **Model Turant on a phone call with a patient helper, not a form or a chat app.** In Medhi et al. (TOCHI 2011), a *live human operator* taking dictation over the phone was about 10x more accurate than electronic forms or SMS (0.45% vs 4.2–4.5% errors per entry). Not one low-literacy user could finish the text UI [S]. Turant should feel like that operator: you talk and it writes things down for you.
2. **Use one living "presence" on screen instead of boxes.** Every top voice product now draws its voice as a single soft, animated light: Siri's edge glow, Gemini's gradient glow, ChatGPT's orb, Alexa's light ring [S/K]. That light carries the state (listening, thinking, speaking). Words appear as large, plain sentences, not as fields.
3. **Show the facts as a story being written, not as a form.** Captured facts appear inline in large sentences ("**₹12,000** gaye, **kal shaam 7 baje**, **PhonePe** se"). The key words are emphasised with weight and colour only, with no borders. Tap a word, or say "nahi, 15,000", to fix it [I, built on Google's one-step correction rule, S].
4. **Confirm by risk level.** Amount, date and time, UTR/transaction ID, and the scammer's number or UPI ID get explicit confirmation, because Google's guidelines say a costly misunderstanding justifies it [S]. Everything else gets implicit confirmation. The complaint ends with one spoken read-back and one big "Haan, sahi hai."
5. **Always offer a touch way out and a human way out.** Voice-only flows lose people: 28% of first-time users in Medhi's study failed on the voice UI [S], and rural users completed more tasks with keypad than with speech [S, Patel 2009]. After 2 misses, offer a big keypad or screenshot option, plus "Call 1930 now".
6. **Make the listening state impossible to miss.** In the most relevant recent Indian study (Prabodhini, 2025), the main voice complaint was "not sure if it was listening" [S]. Use a sound cue, motion, haptics and a live transcript, all four together.

---

## 1. Catalogue (130 entries)

Columns: **Key concept** = what makes its voice UX work. **Steal / Avoid** = the lesson for Turant.

### 1a. AI voice assistants & companions

| # | Product | Key concept | Steal / Avoid for Turant | Src |
|---|---|---|---|---|
| 1 | ChatGPT Voice (Advanced Voice → in-chat, Nov 2025) | Voice moved into the chat thread, with a live transcript and visuals inline. A "Separate mode" toggle keeps the old full-screen orb | **Steal:** speech and its transcript live in one surface. Show the words as they are spoken, with no separate "results" screen | S |
| 2 | ChatGPT GPT-Live (Jul 2026) | Full-duplex: it listens while talking, backchannels ("mhm", "got it"), waits for natural pauses, and stays quiet when told "just listen" | **Steal:** backchannel acknowledgements ("haan… achha…") while the user tells their story. **Avoid** cutting a panicked user off | S |
| 3 | ChatGPT AVM orb (2024) | A single blue animated sphere replaced dots. It "breathes" when idle and reacts to audio | **Steal:** one presence object. **Avoid** the old version's lack of on-screen text | S/K |
| 4 | Gemini Live | Full-screen gradient glow, Hold/End buttons, optional captions, an "Interrupt Live responses" setting, and a later floating pill | **Steal:** "Hold" (pause without losing context) and an always-visible End. **Avoid** hiding captions behind a toggle | S |
| 5 | Gemini (overlay) | Gradients as the brand's "visual anchor". Motion shows "information coming together" | **Steal:** motion that shows facts being gathered | S |
| 6 | Siri iOS 18+ | A rainbow glow wraps the screen edge and ripples from the side button. Content stays visible underneath | **Steal:** an edge glow says "I'm listening" without covering what you are reading | S/K |
| 7 | Siri (HIG, revised Jun 2026) | "Which soup?" beats "Which one?" Keep it succinct. Speech must make sense without the screen. Errors name the specific problem | **Steal:** specific follow-up questions ("Kitne paise gaye?" not "Aur batayein") | S |
| 8 | Google Assistant (classic) | Four coloured dots bounce while listening and wave while speaking. The transcript streams word by word | **Steal:** streaming transcript as proof it is hearing you | K |
| 9 | Google Assistant (Hindi) | Hindi became Assistant's second-most-used language globally | **Steal:** proof that Indian users already talk to phones in Hindi | S |
| 10 | Alexa (Echo light ring) | Cyan ring with a brighter arc pointing at the speaker. Red = mic off, orange = connecting. Wake and end earcons | **Steal:** short earcons for "started" and "stopped" listening. Use colour for state, sparingly | K |
| 11 | Alexa app (phone) | Tap the Alexa button for a blue bar plus live transcription | **Steal:** one obvious entry point | K |
| 12 | Alexa+ (2025) | More conversational LLM Alexa, with multi-turn and no wake word between turns | **Steal:** no re-triggering between follow-up questions | K |
| 13 | Microsoft Copilot Voice | Calm, soft voices and a minimal animated shape. Pitched as a "companion" | **Steal:** a calm tone | K |
| 14 | Meta AI voice | Voice in WhatsApp, Instagram and glasses. Celebrity voices | **Avoid:** celebrity or novelty voices in a crisis tool | K |
| 15 | Grok voice | Selectable personalities, including edgy ones | **Avoid:** personality gimmicks | K |
| 16 | Perplexity voice | Particle or waveform visual, answers with sources | **Steal:** cite where each fact came from (here, the user's own words) | K |
| 17 | Claude voice mode | Voice turns appear in the conversation with text | **Steal:** text and voice parity | K |
| 18 | Pi (Inflection) | Warm, unhurried, empathetic voice that asks one question at a time | **Steal:** empathy first ("Ghabraiye mat, hum saath mein karte hain") | K |
| 19 | Sesame (Maya/Miles) | "Voice presence" = conversational dynamics (timing, pauses, interruptions, emphasis) + context + consistent personality. Founder: still "too eager… in tone, prosody and pacing" | **Steal:** pacing is the product. **Avoid** over-eager, too-human chatter | S |
| 20 | Hume EVI | Uses tone of voice for end-of-turn detection. Default 800 ms silence, range 0.5–3 s. Barge-in stops output immediately. **API sunset 13 Nov 2026** | **Steal:** tune silence longer (1.5–2.5 s) for elders. Don't build on EVI | S |
| 21 | ElevenLabs Conversational AI widget | An embeddable orb that changes with listening and speaking; low-latency agents | **Steal:** orb-as-widget proves the pattern works on mobile web | K |
| 22 | OpenAI Realtime / Gemini Live API | Server-side VAD, barge-in events, streaming transcripts | **Steal:** the technical basis for live captions and barge-in | K |
| 23 | Doubao voice call (ByteDance) | AI framed as a *phone call*, with call-style UI and an avatar | **Steal:** the phone-call metaphor is already mass-market | K |
| 24 | Character.AI / Replika calls | "Call" the character: a full-screen call UI with a hang-up button | **Steal:** call UI = zero learning curve | K |
| 25 | Snapchat My AI | Voice inside a familiar chat | Neutral | K |
| 26 | Samsung Bixby | Side-key hold-to-talk with a live transcript card | **Avoid:** card-heavy results | K |
| 27 | Google Duplex | AI makes calls for you and discloses that it is AI | **Steal:** say plainly that Turant is a helper app, not the police | K |
| 28 | Humane AI Pin | Screenless, laser projection. Failed on latency and reliability | **Avoid:** voice-only with no visual backup; slow replies | K |
| 29 | Rabbit R1 | Physical push-to-talk button | **Steal:** a deliberate "press to talk" suits novices | K |
| 30 | Apple HomePod | A swirl of colour on the top glass while Siri listens | Presence as light | K |
| 31 | Nest Hub | Glanceable large type, voice-first, four dots | **Steal:** big type for answers | K |
| 32 | Echo Show | Voice-first with a screen. Shows the transcript, then the answer | Same | K |
| 33 | Meta Ray-Ban glasses | Voice-only with an LED and chimes | **Steal:** chimes as state | K |
| 34 | SoundHound / Hound | Very fast speech-to-meaning and compound queries | **Steal:** let people say everything in one breath | K |
| 35 | Krutrim (Ola) | Indian LLM assistant with Indic voice | Indic voice is viable | K |

### 1b. Dictation, recording, transcription

| # | Product | Key concept | Steal / Avoid | Src |
|---|---|---|---|---|
| 36 | Wispr Flow | Hold a key and talk. A small floating pill with a waveform. Filler words removed, text cleaned up | **Steal:** messy speech in, clean prose out | K |
| 37 | Superwhisper | "Modes" rewrite dictation for context | **Steal:** rewrite the rambling story into complaint language for the user | K |
| 38 | AudioPen | Ramble, then get a clean, structured note | **Steal:** the "ramble → clean story" promise | K |
| 39 | Otter.ai | Live transcript with speaker labels; highlights | **Steal:** live words build trust | K |
| 40 | Granola | Light notes enhanced after a meeting; no bot | Neutral | K |
| 41 | Descript | Edit the audio by editing the text | **Steal:** fixing the text fixes the record | K |
| 42 | Abridge (medical scribe) | Each line of the generated note links to the exact audio moment ("linked evidence") | **Steal:** tap a fact → hear yourself saying it. A trust-builder for elders | K |
| 43 | Nuance DAX / Suki | Ambient listening produces a structured note | **Steal:** structure without making the user structure anything | K |
| 44 | Apple Voice Memos | A giant red record button and a scrolling live waveform | **Steal:** the visible waveform shows "it's recording" | K |
| 45 | Just Press Record | One tap to record, auto-transcribe | **Steal:** one action only | K |
| 46 | Google Recorder (Pixel) | On-device live transcript, searchable words | **Steal:** it works offline | K |
| 47 | Voicenotes / Letterly | Voice note → summary, list or tasks | Same as AudioPen | K |
| 48 | Plaud NotePin / Limitless / Bee | Wearable recorders, ambient | Neutral | K |
| 49 | Google Live Transcribe | Huge captions, sound-event alerts, "type back" | **Steal:** very large caption type and a type-back fallback | K |
| 50 | Android Live Caption | System-wide captions in a floating box | Captions as accessibility default | K |

### 1c. Messaging & social audio

| # | Product | Key concept | Steal / Avoid | Src |
|---|---|---|---|---|
| 51 | WhatsApp voice notes | Hold to record, slide to cancel, slide up to lock hands-free. Waveform, 1.5x/2x playback, transcripts | **Steal:** the most familiar voice gesture in India. Copy the lock affordance. **Avoid** forcing a long hold on elders | K |
| 52 | Telegram voice | Raise to speak; video circles | Neutral | K |
| 53 | Instagram / Signal voice | Same hold-to-record grammar | Confirms the convention | K |
| 54 | Discord / Clubhouse / X Spaces | A ring lights around the avatar of whoever is speaking | **Steal:** the ring pulses on whoever is talking (user vs Turant) | K |
| 55 | Zoom / Meet | Active-speaker highlight, live captions | Same | K |
| 56 | Jugalbandi (Microsoft + AI4Bharat) | WhatsApp voice note in, then ASR, translate, LLM, translate back, TTS. Answers come back as audio and text. Covered 10 languages | **Steal:** voice-note-in, voice-plus-text-out in the user's language | S |
| 57 | Kisan e-Mitra (PM-KISAN) | Government AI chatbot built on Bhashini, voice in Indian languages | Government precedent for voice | K |
| 58 | Farmer.Chat (Digital Green) | Voice Q&A for farmers in local languages | Same | K |

### 1d. Translation & language

| # | Product | Key concept | Steal / Avoid | Src |
|---|---|---|---|---|
| 59 | Google Translate conversation mode | Auto-detects which language is spoken. One mic when auto, two when manual. Face-to-face split screen. Auto-plays the translation on a pause | **Steal:** detect the language from speech, so the user doesn't have to pick | S |
| 60 | Microsoft Translator | Multi-device conversation rooms | Neutral | K |
| 61 | Bhashini app | Government Indic ASR/MT/TTS for 22 languages | Possible backend | K |
| 62 | Anuvadini | Translation for government documents | Neutral | K |
| 63 | Sarvam (Samvaad, Bulbul TTS, Saarika ASR) | Indic voice agents, code-mixed ASR | **Steal:** code-mixed Hinglish/Tanglish ASR is a must | K |
| 64 | Papago / iTranslate / SayHi | Big mic button, two-sided chat bubbles | **Avoid:** bubble clutter | K |
| 65 | Duolingo speaking | "Tap to speak". Words highlight as recognised. "Can't speak now" escape. Character reacts | **Steal:** a guilt-free "Abhi bol nahi sakte" escape to typing or tapping | K |
| 66 | ELSA Speak | Colour per phoneme (green/amber/red) | **Avoid:** judging the user's speech | K |
| 67 | Speak | AI tutor, hold to speak, gentle corrections | Gentle tone | K |
| 68 | Praktika / Loora | Avatar tutors | **Avoid:** avatars (uncanny, heavy) | K |
| 69 | Pimsleur | Audio-only, pauses for answers | **Steal:** deliberate pauses after questions | K |
| 70 | Google Read Along (formerly Bolo) | Diya the reading buddy listens and gives verbal and visual feedback. Help when stuck, stars. On-device, works offline | **Steal:** a named helper with a voice, reward-free encouragement, offline ASR | S |

### 1e. Payments, banking, fintech voice (mostly India)

| # | Product | Key concept | Steal / Avoid | Src |
|---|---|---|---|---|
| 71 | Hello! UPI (NPCI) | Conversational UPI payments in Hindi/English by app, phone call or IoT. Voice read-back of details: "confirm or edit". Models co-built with AI4Bharat | **Steal:** read back the money details, then "sahi hai / badlo" | S |
| 72 | UPI 123PAY (IVR) | UPI for feature phones by IVR call | IVR is a familiar Indian channel | K |
| 73 | Paytm Soundbox | An audible payment alert in 11 regional languages. Merchants trust a sound more than a screenshot; it works in noisy markets | **Steal:** a spoken, specific success cue ("₹12,000 ki shikayat taiyar") | S |
| 74 | PhonePe SmartSpeaker / Google Pay SoundPod | Same pattern, competitors copied it | Validates audio confirmation | S |
| 75 | Google Pay India | The Tez-era "cash mode" sound, a simple pay flow, Hindi UI | Sound as reassurance | K |
| 76 | BHIM / BHIM Vega | Government UPI app | Neutral | K |
| 77 | Bank of America Erica | Voice/text assistant built around banking intents, with proactive nudges | **Steal:** narrow domain = better recognition | K |
| 78 | HDFC EVA | Early Indian banking chatbot | **Avoid:** menu-chatbot feel | K |
| 79 | Kotak Keya | Voice bot inside the IVR | Voice-in-IVR precedent | K |
| 80 | ICICI iPal / Axis Aha! | Chat assistants | **Avoid:** chip and card overload | K |
| 81 | Truecaller AI Assistant (India) | Answers calls and shows a live transcript of the caller | **Steal:** the "live transcript of a call" pattern Indians already know | K |
| 82 | Google Call Screen | Live transcript of the caller plus tap replies | Same | K |
| 83 | Google "Direct My Call" | Transcribes IVR menus into tappable buttons (a visual IVR) | **Steal:** turn spoken options into big tappable words | K |
| 84 | Google "Hold for Me" | Waits on hold for you and alerts you | **Steal:** Turant could wait on the 1930 queue (future) | K |
| 85 | Visual IVR vendors (Zappix, etc.) | Replace "press 1" trees with screens | **Avoid:** deep trees (Medhi: hierarchy fails) | K |
| 86 | Gnani.ai / Haptik / Yellow.ai | Indic voice bots for banks | Possible vendors | K |
| 87 | Navi / CRED / Jupiter | Polished fintech UI | Out of scope (visual) | — |

### 1f. Maps, car, hands-busy

| # | Product | Key concept | Steal / Avoid | Src |
|---|---|---|---|---|
| 88 | Waze voice reports | "OK Google, report traffic". Big one-tap report buttons. Confirms in one line | **Steal:** one-line confirmations | K |
| 89 | Google Maps voice | A voice search button on the bar; speaks the turn before the visual | Voice leads, screen supports | K |
| 90 | Apple CarPlay Siri | A compact orb at the bottom; the map stays visible | **Steal:** the presence never hides context | K |
| 91 | Android Auto / Gemini | Voice-first, glanceable | Same | K |
| 92 | Mercedes MBUX | "Hey Mercedes", light ribbons on the display | Light = presence | K |
| 93 | BMW IPA / Tesla voice | Push-to-talk steering button | Explicit start suits novices | K |

### 1g. Accessibility & assistive voice

| # | Product | Key concept | Steal / Avoid | Src |
|---|---|---|---|---|
| 94 | Be My Eyes | One giant "Call first available volunteer" button; human help in seconds | **Steal:** a human fallback that is a single tap | K |
| 95 | Be My AI | AI description first, human if needed | **Steal:** AI first, human escalation | K |
| 96 | Microsoft Seeing AI | Mode "channels"; audio beeps guide the camera to a document edge | **Steal:** audio guidance for screenshot capture | K |
| 97 | Google Lookout | Text/Documents/Food label modes, spoken | Same | K |
| 98 | Envision / Aira | AI plus trained human agents | Human fallback | K |
| 99 | Voice Access / Voice Control | Number overlays: "tap 4" | **Steal:** say the label you see | K |
| 100 | VoiceOver / TalkBack | Screen reader | Must work with Turant (semantic HTML) | K |
| 101 | Project Relate / Voiceitt | ASR for atypical speech | Elder and impaired speech need tolerance | K |
| 102 | Apple Personal Voice / Live Speech | Type, then it speaks | Neutral | K |

### 1h. Audio content & calm

| # | Product | Key concept | Steal / Avoid | Src |
|---|---|---|---|---|
| 103 | Kuku FM / Pocket FM | Hindi audio stories with mass reach in Tier 2/3 | **Steal:** Indians already *listen* for long periods; spoken guidance is welcome | K |
| 104 | Spotify DJ | An AI voice host between tracks | Short voice interjections | K |
| 105 | Audible | Speed control | **Steal:** "slow down" control | K |
| 106 | Headspace / Calm | A breathing circle that expands and contracts; a slow, warm voice | **Steal:** a slow "breathing" idle motion calms a panicked user | K |
| 107 | Apple Watch Breathe | Petals expand with breath, with haptic taps | **Steal:** haptic rhythm | K |
| 108 | Shazam | The whole home screen is one button. Pulsing rings while listening | **Steal:** one-button home | K |
| 109 | SoundHound / Midomi | Hum to find a song | Neutral | K |
| 110 | YouTube voice search | The mic most Indian novices already use | **Steal:** the Prabodhini user said "It is like in Google." Match that mic convention | S |

### 1i. Development / research voice systems (India & Global South)

| # | Product | Key concept | Steal / Avoid | Src |
|---|---|---|---|---|
| 111 | Avaaj Otalo (Gujarat) | Voice forum for farmers by phone. Forum was the top feature. Threads cut to reduce complexity; 51 farmers over 7 months | **Steal:** simplicity beats features | S |
| 112 | CGNet Swara | Citizen journalism via IVR; 70k+ calls in 21 months | **Steal:** recording your story aloud is natural | S |
| 113 | Mobile Vaani (Gram Vaani) | "Missed call" IVR: call, it hangs up and calls back for free. Record or listen to messages in dialect. Volunteers moderate | **Steal:** human moderators in the loop; zero-cost access | S |
| 114 | Sangeet Swara | ~80% of users had never used social media; 25% visually impaired | Voice reaches non-users | S |
| 115 | Spoken Web / WWTW (IBM India) | "Voice sites" browsed by phone | Hierarchy fails, keep it flat | K |
| 116 | Kilkari (MoHFW) | Pre-recorded voice messages to pregnant women at scale | **Steal:** pre-recorded human voice for key lines | K |
| 117 | Mobile Kunji (BBC Media Action) | Physical cards plus IVR codes for health workers | Cards for offline help | K |
| 118 | Polly / Baang (Pakistan) | Viral voice games and social media for low-literate users | Voice spreads socially | K |
| 119 | Sangoshthi | Peer learning over IVR for health workers | Neutral | K |
| 120 | Awaaz.De | Avaaj Otalo spin-off, voice platform | Neutral | K |
| 121 | Medhi text-free UIs (MSR India) | Semi-abstract graphics + voice feedback + a consistent help feature | **Steal:** a consistent "?" that *speaks* | S |
| 122 | Prabodhini (BITS Hyderabad, 2025) | Voice-first RAG for welfare schemes vs the myScheme form app; voice preferred | **Steal:** the closest analogue to Turant (§3) | S |
| 123 | myScheme (Gov of India) | A form-based eligibility flow: only 2 of 15 users finished it alone | **Avoid:** exactly the "boxes" the PO hates | S |
| 124 | 1930 helpline IVR itself | Human operator takes details and issues an acknowledgement number | **Steal:** mirror the operator's questions so the user is ready | S |
| 125 | Kisan Call Centre | Human agronomists by phone, toll-free | Humans are trusted | K |

### 1j. Customer-service voice agents & misc.

| # | Product | Key concept | Steal / Avoid | Src |
|---|---|---|---|---|
| 126 | Sierra / Decagon / Retell / Vapi | Phone voice agents with interruption handling | Backend options | K |
| 127 | Hippocratic AI nurse agents | Slow, careful health calls with explicit read-backs | **Steal:** read-back discipline | K |
| 128 | Klarna AI assistant | Escalates to a human on request | Human escalation | K |
| 129 | Yoto / Toniebox | Screenless, tangible, child-proof | Simplicity | K |
| 130 | Moxie (robot) | Expressive "face" presence | **Avoid:** faces and avatars for Turant | K |

---

## 2. Deep teardowns (18)

Format per product: **States** (idle / listening / thinking / speaking) · **Turns & barge-in** · **Transcript** · **Errors** · **Confirmation** · **First run** · **Colour / type / motion / haptics / sound** · **Text-free-ness** · **Turant lesson**.

### 2.1 ChatGPT Voice (AVM → in-chat → GPT-Live)
- **States:** Originally a full-screen overlay with a blue animated sphere, which replaced the black dots shown at the May 2024 demo [S]. The orb breathes when idle and reacts with the audio while speaking [K]. Since Nov 2025, voice starts from a waveform icon next to the text field and runs *inside* the chat [S].
- **Turns & barge-in:** AVM used silence detection, which caused mistimed interruptions [S]. GPT-Live (8 Jul 2026) is full-duplex: it keeps listening while speaking, backchannels ("mhmm", "got it"), waits for natural pauses, handles fast interruptions, and goes quiet on request [S].
- **Transcript:** The in-chat mode shows a live transcript, and users can scroll back without interrupting the conversation [S]. The old orb mode showed no text, so users had to leave voice to read [S].
- **Thinking:** GPT-Live hands hard queries to GPT-5.5 in the background and keeps talking, so there is no dead air. The old cascade had about 1.7 s latency [S].
- **Visuals:** Cards for weather, maps and similar items appear in-thread [S]. These are cards, which Turant should not copy.
- **Controls:** Mute mic and End [K/S].
- **Turant lesson [I]:** (a) Put the transcript and the presence on one surface. (b) Fill "thinking" time with a short spoken acknowledgement rather than silence ("Achha… likh rahi hoon"). (c) Backchannel during long narratives so the user knows it is still listening.

### 2.2 Gemini Live
- **States:** Full-screen with a soft blue gradient glow, the "airy glow with a misty, ever-changing shape" [S]. In 2026 a floating pill and a circular visualizer with animated dots were tested [S]. Google Design says gradients are the "visual anchor" and that motion visualises "listening abilities" [S].
- **Controls:** **Hold** pauses the whole session, then **End** [S]. A mute button was added later so "you don't accidentally interrupt" [S].
- **Barge-in:** Interrupting is allowed and can be toggled off ("Interrupt Live responses") [S].
- **Transcript:** Captions sit behind a button in the top-right and only work in full-screen Live [S].
- **Turant lesson [I]:** Copy **Hold** ("Ruko" / "Ek minute"): a panicked user will need to find their SMS or screenshot mid-conversation. Do *not* hide captions behind a toggle. Low-literacy users still use partial reading, and Prabodhini users valued the transcript [S].

### 2.3 Siri (iOS 18+ glow)
- **States:** A rainbow glow wraps the screen edge and the display briefly distorts as Siri activates [S]. The glow reacts to the user's voice [K]. Underlying content stays visible. iOS 27 reportedly moves Siri into the Dynamic Island with a glowing cursor, dark-only [S, pre-release reporting].
- **Dialogue rules (HIG, Jun 2026) [S]:** Ask specific follow-ups ("Which soup?" not "Which one?"). Keep responses succinct, with no humour or extra words, because they get repeated. Voice must stand alone without the screen. Ask an open question when a list is too long. Make errors specific: "Sorry, we're out of chicken noodle soup", not "can't complete your order".
- **Turant lesson [I]:** An **edge glow** is the least intrusive "listening" signal and keeps the user's story text readable. Adopt the HIG wording rules as copy rules.

### 2.4 Google Assistant (classic)
- **States [K]:** Four brand-colour dots bounce while listening, sweep while thinking and wave while speaking. Partial transcription streams in as you talk, in large grey text that turns black when final.
- **Errors [K]:** "Sorry, I didn't understand", plus suggestion chips.
- **Turant lesson [I]:** Streaming, greying-to-final text is strong proof of hearing. Use it, but in very large type. Avoid chips that look like buttons-in-boxes. Use plain underlined words instead.

### 2.5 Alexa (Echo + app)
- **States [K]:** A cyan ring with a brighter arc pointing at the speaker while listening. Spinning cyan while thinking. Pulsing while speaking. Red = mic off. Optional earcons for "start" and "end of request".
- **Dialogue rules [S]:** The **one-breath test**: if you need a breath to read a prompt aloud, shorten it. Trim 2–5 words per line. Put breaths *between* ideas. Offer no more than three choices at a time. Use pauses (about 600 ms breaks) between list items.
- **Turant lesson [I]:** Use earcons as an always-on "mic open / mic closed" signal. Hold Turant's prompts to one breath.

### 2.6 Sesame (Maya / Miles)
- **Concept [S]:** "Voice presence" rests on conversational dynamics (timing, pauses, interruptions, emphasis), contextual awareness of tone, and consistent personality. Founder: "still too eager and often inappropriate in its tone, prosody and pacing."
- **UI [K]:** Nearly no UI, just a pulsing circle and a call timer. The voice *is* the interface.
- **Turant lesson [I]:** The quality of the voice (warm, measured, consistent) matters more than any animation. Pick one voice per language and never switch it. For a scam victim, "too eager" is worse than "slightly slow".

### 2.7 Hume EVI (turn-taking reference)
- **Turn detection [S]:** Uses tone of voice for end-of-turn. `end_of_turn_silence_ms` defaults to 800 ms (range 500–3000). Shorter replies faster but risks "responding mid-thought". For a "more patient interaction", raise silence and `min_interruption_ms` together.
- **Barge-in [S]:** By default it stops as soon as it hears speech and notifies the client.
- **Status [S]:** Hume is sunsetting EVI/TTS. Access ended 13 Nov 2026.
- **Turant lesson [I]:** Elders and panicked people pause mid-thought. Use about **1.8–2.5 s** end-of-turn silence while the user narrates and about 1.2 s for yes/no answers. Require about 400–600 ms of real speech before treating sound as a barge-in, so a cough or a TV doesn't kill Turant's sentence. Arxiv work on older adults notes fixed response windows "interrupt" slow speakers [S].

### 2.8 Google Translate — conversation mode
- **States [S]:** With auto-detect there is one microphone. Manual mode splits it into two, one per language. Face-to-face mode flips the top half for the other person. It auto-plays the translation when a speaker pauses.
- **Turant lesson [I]:** Detect the language from the first utterance. Ask "Aap kis bhasha mein baat karna chahenge?" only if confidence is low. Never open with a 22-language picker grid.

### 2.9 Google Read Along (Diya)
- **States [S]:** Diya, a named helper, listens while the child reads aloud. It gives verbal and visual feedback, helps "wherever they get stuck", and awards stars. Recognition runs on-device and **works offline**; data is not sent to servers.
- **Visual [K]:** The current word is highlighted as it is read. The cartoon helper sits small in a corner, and the text is the hero.
- **Turant lesson [I]:** Give the helper a name and a voice (for example "Turant Didi"), but keep the *words* as the hero, not a mascot. On-device or offline-tolerant recognition matters for patchy networks.

### 2.10 WhatsApp voice notes
- **Gestures [K]:** Hold mic to record. A timer and red dot show while recording. Slide left to cancel, slide up to lock hands-free. Release sends, and there is a waveform preview before sending in locked mode. Playback at 1x / 1.5x / 2x. Transcripts are available.
- **Why it matters:** This is the voice gesture Indian novices know best, and Prabodhini participants cite "voice notes on messaging platforms" as their reference [S].
- **Turant lesson [I]:** Borrow the *look* of the WhatsApp mic (green round button, waveform, timer) for instant recognition. Change the *gesture* to **tap-to-start / tap-to-stop with auto-stop**, because long holds are hard for tremor-prone or anxious hands. Offer "Suniye" (play back what I said) like a voice-note preview.

### 2.11 Hello! UPI (NPCI)
- **Flow [S]:** The user speaks the payment ("Ramesh ko 500 bhejo") by app, phone call or IoT device, in Hindi or English. The system gives a **voice-based confirmation of transaction details, asking the user to confirm or edit**, then processes the payment. Models were co-developed with AI4Bharat/Bhashini. Sources disagree on whether the PIN is spoken.
- **Turant lesson [I]:** Indian users are being taught the "speak → hear it back → confirm or edit" loop for *money* by NPCI itself. Reuse that exact loop and wording for amounts.

### 2.12 Paytm Soundbox (and SoundPod / SmartSpeaker)
- **Concept [S]:** A loud, specific spoken confirmation ("Paytm par ₹500 prapt hue") in about 11 regional languages. Merchants don't need to check their phone. It is harder to fake than a screenshot. It works in noisy markets. Newer models add a screen as a *secondary* channel.
- **Turant lesson [I]:** Indian users trust a **spoken, specific number** more than a screen. Every captured money fact gets a Soundbox-style spoken echo ("Barah hazaar rupaye — likh liya"). The success moment at the end is a spoken, specific statement, not a green tick alone.

### 2.13 Jugalbandi (WhatsApp, Microsoft/AI4Bharat)
- **Pipeline [S]:** Voice note → AI4Bharat ASR → Bhashini translation to English → LLM retrieval on schemes → translation back → TTS. The answer comes back as **audio plus text** in WhatsApp. It covered 10 languages and 171 schemes, and Microsoft openly says "Sometimes these models do make errors."
- **Turant lesson [I]:** The voice-in, voice-plus-text-out pattern is proven for rural users. Because translation errors happen, the *extracted facts* must be shown back in the user's script and spoken back.

### 2.14 Prabodhini vs myScheme (most relevant study)
- **Setup [S]:** 15 low-income, low-literate campus workers in South India (some with no formal education). They used myScheme, a government form app, and Prabodhini, a voice-first GPT-4o + RAG prototype in English, Hindi, Tamil and Telugu.
- **Findings [S]:**
  - Form problems: the forms were tedious, used jargon ("BPL", "organised/unorganised sector", "urban/rural"; users wanted "city/village"), and used dropdowns. **Only 2 of 15 completed the myScheme form independently.**
  - Prabodhini let users describe their situation in their own words ("I am from Ponnala village. I want to open a stationery shop…"). All 15 completed the task in 49 s on average.
  - Voice felt familiar ("It is like in Google").
  - Problem 1: users were **"unsure whether the app was actively listening"** because cues were unclear.
  - Problem 2: offline TTS without Indian prosody was hard to understand.
  - **The text transcript alongside speech** helped users recover.
  - Unreliable chatbots (hangs, no reply) eroded trust fast.
- **Turant lesson [I]:** This study is a near-replica of Turant's situation and validates the brief: let people tell the story in their own words, never ask them to classify ("fraud type: vishing/phishing…"). Over-signal listening. Use a good Indic TTS voice. Always pair speech with text. Never hang silently.

### 2.15 IVR voice forums: Avaaj Otalo, CGNet Swara, Mobile Vaani
- **Avaaj Otalo [S]:** 51 farmers over a 7-month pilot. The forum was the most popular feature. Threaded discussion was left out on purpose to cut complexity. Anonymous posting used a synthesized voice.
- **CGNet Swara [S]:** 70,000+ calls and 1,100 published messages in 21 months. People record their own reports.
- **Mobile Vaani [S]:** Missed-call model (call, it hangs up, it calls back free). Content is in local dialect, with volunteer moderation.
- **Cross-cutting [S]:** Most such services hit "hurdles of user training and technology adoption".
- **Turant lesson [I]:** (a) Recording "what happened" in your own voice is already natural. (b) Humans in the loop (moderators, volunteers) are what made these services work. Turant should lead to 1930 humans, not replace them. (c) Cut features hard.

### 2.16 Be My Eyes (human fallback)
- **UI [K]:** The home screen is essentially one huge button, "Call first available volunteer". Be My AI comes first, with a human one tap away.
- **Turant lesson [I]:** A persistent, single "**1930 pe call karein**" action, always visible and never buried, is the emotional safety net. It is also correct per "golden hour" advice: report immediately; one source cites 70–80% success within 2 hours [S, news/blog sources].

### 2.17 Abridge-style linked evidence (+ AudioPen-style clean-up)
- **Concept [K]:** Every generated statement links back to the exact moment in the audio. AudioPen turns rambling speech into a clean, structured note.
- **Turant lesson [I]:** Turant should rewrite the panicked ramble into a clean complaint story, and each key fact should be tappable to **hear your own words** ("Aapne kaha tha: '…'"). That builds trust without the user reading anything.

### 2.18 Shazam / Voice Memos (one-button grammar)
- **UI [K]:** The home screen is one large circular button. Listening is pulsing concentric rings, and the result replaces everything.
- **Turant lesson [I]:** At any moment there should be **one** primary thing to do. Use concentric rings or a glow, not a button inside a card.

---

## 3. Research: guidelines + academic findings → actionable rules

### 3.1 Low-literacy & emerging-market users
| Finding | Source | Rule for Turant |
|---|---|---|
| Text UI: **0%** of non-literate users completed a banking task. Voice UI 72%, graphical UI 100% (with heavy prompting). Voice completers were **>2x faster** and needed fewer prompts | Medhi 2011 TOCHI [S] | Voice is fastest *for those who get it*. Design for the 28% who don't: touch fallback and guided examples |
| Voice failures came from (a) not knowing you talk to a machine ("What Sir?", "Yes Sir"), (b) jargon ("account summary"), (c) unfamiliar concepts | Medhi 2011 [S] | First line: "Main ek app hoon. Aap mujhse aise baat kariye jaise kisi se phone pe." Ban jargon: no "UTR", say "SMS mein jo lamba number aaya" |
| Women's completion on the voice UI was 60% vs 88% for men | Medhi 2011 [S] | Test with elderly women specifically |
| Novices feared keypresses would **"spoil the phone"** | Medhi 2011 [S] | Reassure: nothing they tap can break anything. Undo everywhere |
| **Live operator: 0.45% error vs 4.2–4.5%** for forms/SMS (about 10x more accurate) | Medhi 2011 [S] | Interaction model = dictating to an operator |
| Recommendations: graphical cues, voice annotation everywhere, local language in text **and** audio, minimal hierarchy, no non-numeric text input, no scrolling menus, minimal soft keys, human mediators | Medhi 2011 [S] | Flat, no menus, no typing letters. Numbers by keypad are OK |
| Text-free UIs: semi-abstract graphics + voice feedback + a **consistent help feature** were strongly preferred | Medhi 2007 [S] | A permanent spoken "?" / "Madad" that re-explains the *current* step |
| Rural farmers: **keypad (DTMF) beat speech** on completion, especially for people under 30 and below 8th grade. 49% of speech tasks rated difficult vs 30% for touchtone | Patel 2009 CHI [S] | Numbers (amount, UTR, phone) should be enterable by big keypad as an equal, not a fallback of shame |
| New users **blame themselves** for misrecognition ("couldn't understand my accent") and give up after a few failures. Stigma about speaking aloud. Privacy in crowds. Pauses and code-switching | Google NBU Voice Playbook 2021 [S] | Always blame the app. Accept Hinglish. Allow pauses. Offer quiet typing or tapping |
| Mic should use a standard icon, be larger, and be reachable in ≤1 tap. Split long spoken output into short sentences | Google NBU [S] | One big standard mic. Sentences ≤12 words |
| Form jargon ("BPL", "urban/rural") blocked users. Only 2/15 finished the form alone. Voice preferred. "Is it listening?" confusion. Transcript helped | Prabodhini 2025 [S] | See §2.14 |

### 3.2 Older adults & voice assistants
| Finding | Source | Rule |
|---|---|---|
| Month-long in-home study: frequent intent-recognition errors; the assistant failed to accommodate forgetfulness | Mahmood, Wang & Huang (arXiv 2403.02421) [S] | Turant must hold context and let users repeat or skip freely. Remind them what's left |
| Older adults repair by rephrasing, repeating, asking for clarification. Errors compound during repair | arXiv 2510.06690 [S] | After 1 miss, *change strategy* (example, choices, keypad). Never repeat the same prompt |
| Fixed response windows cut off slow speakers | arXiv 2602.23436 (snippet) [S] | Long, adaptive end-of-turn silence |
| Older adults with low tech use: a 3-week Echo study (TOCHI 2020 Best Paper) found trust and accessibility concerns. Perceptions move between "object-like" and "human-like" | Pradhan, Lazar, Findlater [S] | Warm but not pretend-human. Say it is an app |
| Preferred TTS rate is **not** simply "slower for older people". One study found the oldest listeners preferred *faster* synthetic speech | 2009 AAC study [S] | Normal-to-slightly-slow default, plus a visible "dheere boliye" control, and slow down *only* numbers |

### 3.3 Mainstream voice-design guidelines
| Rule | Source |
|---|---|
| **Implicit confirmation is the default** for parameters. Restate details in context, "don't dwell" | Google [S] |
| **Explicit confirmation is rare**, reserved for when a misunderstanding is costly (names, addresses, messages sent on the user's behalf) or the action is irreversible | Google [S] |
| Support **one-step correction**: "No, 7 AM" is a correction, not a rejection. Let users change any parameter without restarting | Google [S] |
| No-match: 1st = rapid reprompt (short apology + condensed question, not verbatim). 2nd = escalate with examples or options and your best guess. Max 2 attempts, ≤3 errors in a row, then graceful exit to *another way* | Google [S] |
| No-input: assume they didn't hear. Never say "I didn't hear you". Rephrase concisely and offer options. After 2, exit gracefully | Google [S] |
| Blame the system, keep error copy short, never condescend | Google [S] |
| **One-breath test**. Trim 2–5 words per line. Breaths between ideas. Lists of **≤3** | Amazon Alexa [S] |
| Specific follow-ups ("Which soup?"). Succinct, no humour. Voice must stand alone. Errors must be specific | Apple HIG [S] |
| Assistants handle only simple queries well. Users "talk like a robot". Non-native accents must repeat themselves | NN/g [S] |
| Human turn gaps cluster near **~200 ms** (within ±250 ms of the mean across 10 languages). Overlap is avoided | Stivers et al. PNAS 2009 [S] |

### 3.4 Concrete numbers for Turant (derived)
- **End-of-turn silence [I, from Hume S + elder studies S]:** narrative 2.0 s (adaptive 1.5–3 s); short answers 1.2 s. After 6 s of silence, a soft "Main sun rahi hoon… aaram se boliye" (no-input level 1). After about 15 s, offer touch options.
- **Response onset [I, from Stivers S + GPT-Live S]:** start an acknowledgement within about 500 ms ("Hmm", earcon, or haptic), even if the full reply takes 2 s.
- **Prompt length [S Alexa + I]:** ≤1 breath, about ≤12 words, one question per turn, ≤3 options.
- **Examples [S Google + I]:** give an example on the *first* open question ("Jaise: 'Kisi ne bank wala banke call kiya aur 5000 kat gaye'"). Escalate to choices after a miss.
- **Numbers [I, building on S]:** amounts are spoken back in words in the user's language with lakh/hazaar ("barah hazaar rupaye") *and* shown as big numerals "₹12,000". IDs are read back in chunks of 3–4 digits with pauses. Rupees, dates and IDs always get explicit confirmation.
- **Retries [S Google]:** 2 misses on the same item, then switch modality (keypad, screenshot or choices), then "skip, 1930 will ask". Never block the complaint on one field.

---

## 4. Synthesis: what Turant should be

### 4.1 Interaction model: "a calm phone call with a helper who writes for you" [I, grounded in S]
- **The metaphor:** you are on a call with a kind 1930 helper. The helper listens, says "haan… achha", asks one simple question at a time, writes your complaint while you talk, reads it back, and then helps you call 1930 or file it.
- **Why not a chat:** chat bubbles are text-first and become a scrolling wall of boxes. Novices don't read back up.
- **Why not a form:** this is the myScheme failure [S].
- **Why a call:** Medhi's operator result [S]. The call UI is universally understood (Doubao, Character.AI calls) [K]. Indians already trust phone-based help: 1930, Kisan Call Centre, IVR forums [S/K].
- **Structure:** an invisible checklist, a visible conversation. The app knows the 1930 slots it needs (what happened, amount, when, which app or bank, transaction number, scammer's number or UPI ID, the user's own number) [S, 1930 checklists]. It *never shows them as empty fields*. It asks only for what's missing, in order of importance, after first letting the user tell the whole story freely.
- **Urgency first:** the very first screen says, in voice and large text, "Pehle 1930 pe call kar sakte hain — ya main aapki shikayat taiyar karun?" [I]. The "Call 1930" action stays visible throughout (Be My Eyes pattern).

### 4.2 Visual language of the voice presence [I]
- **One presence:** a soft, glowing, breathing light. Two variants work:
  - **(a) a bottom-anchored glow:** a horizon of warm light rising from the bottom edge, Siri/Gemini-like, so the story text above stays readable;
  - **(b) a large soft circle** placed low on the screen.
  - Pick one and use it everywhere. No face, no mascot, no avatar.
- **States, each with motion + sound + haptic + text:**

| State | Motion | Colour | Sound | Haptic | Text |
|---|---|---|---|---|---|
| Idle / ready | slow breathing (~5 s cycle, Headspace-like) | calm neutral (deep indigo or teal) | — | — | "Boliye" / "Tap karke boliye" |
| **Listening** | expands, reacts to *the user's* voice amplitude; edge glow brightens | warmer, brighter | rising 2-note earcon at open | one light tick at open | live words stream in, large, grey → black |
| Thinking | gentle slow rotation / shimmer, never a spinner | same hue, dimmer | soft "hmm" backchannel or none | — | "Likh rahi hoon…" |
| **Speaking** | ripples synced to Turant's voice; listening glow off | cooler | — | — | Turant's sentence appears as it is spoken (karaoke highlight) |
| Paused (Hold) | frozen, dim | grey | falling earcon | — | "Ruka hua hai — 'Chalo' boliye ya tap kariye" |
| Mic off / no permission | flat outline | muted | — | — | plain instruction + illustration of the browser prompt |

- **Contrast with the user:** Turant's lines and the user's lines differ by *position and weight* (helper lines centred and smaller; the user's story larger and left-aligned), not by bubbles [I].
- **Type:** large. Body about 22–26 px, key facts about 32–40 px. Native script first (Devanagari, Tamil, Bengali), with no English transliteration unless the user code-mixes [I]. The other researcher covers detailed type.

### 4.3 Extracted facts: no boxes, no fields, no cards [I]
- **"The letter being written":** below the presence, the complaint builds as **2–5 plain sentences** in the user's language, written in first person as if the user dictated it to a scribe:
  > "Kal shaam **7 baje** mujhe ek call aaya. Unhone bola woh **SBI** se hain. Maine **PhonePe** se **₹12,000** bhej diye. Unka number **98xx-xx-1234** tha."
- **Key facts are emphasised words, not boxes:** heavier weight plus an accent colour or a soft highlighter wash behind the word, like a marker on paper. A *just captured* fact gets a 300 ms highlight sweep, a haptic tick and a spoken echo ("Barah hazaar — likh liya"). This is the Soundbox principle [S].
- **Missing facts are a gentle dotted underline inside the sentence** ("Paise **_____** ko gaye"), never an empty input box. Turant asks about them by voice.
- **Tap a fact** to (1) hear it ("Maine likha: barah hazaar rupaye. Sahi hai?"), (2) hear the moment you said it (Abridge pattern [K]), and (3) fix it by speaking again or with a big keypad. The keypad only for numbers, per Patel/Medhi [S].
- **No labels like "Amount:" or "Date:".** The sentence *is* the label.
- **Behind the scenes:** the 1930 operator / portal version (structured fields) is generated at the end and shown only as "Yeh 1930 ko bataiye" in big readable lines, or read aloud for the user to repeat on the call [I].

### 4.4 Progress [I]
- **Don't use a stepper with numbered boxes.** Show progress as the **letter growing** plus a thin ring around the presence that fills as the essential facts arrive. Optionally add 5 small beads under the presence (one per essential fact) that fill in, with no labels.
- Speak progress at milestones: "Bas do cheezein aur" (just two more things) [I]. That fits the elder-memory finding: remind people what's left [S].

### 4.5 Correcting mistakes [S rules + I]
- **By voice:** one-step corrections work anywhere: "Nahi, pandrah hazaar", "Galat, kal nahi parson" [S Google]. Turant echoes only the changed fact.
- **By touch:** tap the word, then a big sheet with three huge options: 🔊 "Suniye", 🎤 "Phir se boliye", ⌨️ "Number dabaiye" (number facts only).
- **Undo:** "Waapas" always restores the previous value. Nothing is ever lost.
- **Never restart the whole flow** to fix one thing [S Google].

### 4.6 Confirmation policy [S Google + I]
| Fact | Confirmation |
|---|---|
| Story, scam type, how contacted | Implicit (restated in the letter) |
| **Amount** | Explicit: spoken in words + shown in numerals, "Sahi hai?" |
| **Date and time** | Explicit if relative ("kal shaam" → "Guruvaar, 20 Nov, shaam 7 baje?") |
| **Transaction / UTR / reference number** | Explicit, chunked digit read-back. Prefer screenshot or SMS paste over dictation |
| **Scammer's phone / UPI ID** | Explicit, chunked |
| User's own phone | Implicit (prefill from device if possible) |
| Final complaint | Explicit read-back of 3–4 sentences, then one big "Haan, sahi hai" / "Badlo" |

### 4.7 Error states [S Google/NBU + I]
- **No speech heard (no-input):** at 6 s, "Main sun rahi hoon. Aaram se boliye." At about 15 s, offer the 3 most common scam types as large spoken-and-shown choices ("Phone pe kisi ne dhokha diya / Link dabaya / QR scan kiya").
- **Not understood (no-match):** 1st: "Maaf kijiye, samajh nahi aaya — kitne paise gaye?" (shorter, not verbatim). 2nd: give an example or choices plus the keypad. 3rd: "Koi baat nahi, yeh 1930 wale poochh lenge" and skip the field.
- **Copy rules:** always blame the app, never the accent [S NBU].
- **Network down:** keep recording locally. Say "Internet dheema hai, main sun rahi hoon, baad mein bhej dungi." Never silent-hang. Prabodhini users lost trust on hangs [S].
- **Mic permission denied:** an illustrated one-step fix, plus "Ya tap karke batayein" (touch-only path).
- **Noisy place or privacy:** a visible "Chup-chaap batayein" (quiet mode) that turns on big tappable choices plus the keypad [S NBU privacy and stigma].

### 4.8 First-run experience (zero onboarding screens) [I]
1. Open → the presence breathes. Within 1 s Turant **speaks** a 1-breath greeting in the browser/OS language guess: "Namaste. Main Turant hoon, ek app. Aapke saath dhokha hua hai? Main shikayat likhne mein madad karungi."
2. Language: detect it from the first answer (Translate pattern [S]). Show 4–6 script samples ("हिंदी · தமிழ் · বাংলা · …") only as a fallback, never as a gate.
3. Explain the gesture once, by demonstration: the mic pulses gently and the voice says "Neeche ka gola dabaiye aur boliye — jaise WhatsApp pe awaaz bhejte hain." This uses the familiarity anchor [S Prabodhini].
4. First question is open, with an example (Google [S]): "Kya hua, apne shabdon mein bataiye. Jaise: 'Kisi ne bank wala banke call kiya aur paise kat gaye.'"
5. Let them talk as long as they want, with backchannels. Then fill the gaps.
6. Medhi: say it is a machine, and that they can talk normally [S].

### 4.9 Sound & haptics [I, building on S]
- **Earcons (3 only):** listen-open (soft rising), listen-close (soft falling), fact-captured (a gentle single "tick" chime). Plus one **success** sound at completion. Make it warm and short, never an alarm. Pair it with a specific spoken line (Soundbox [S]).
- **Haptics:** a light tick at mic open, a double tick at fact capture, one longer pulse at completion. Skip haptics on web where unsupported (`navigator.vibrate` is Android-only).
- **Voice:** one consistent, warm, Indian-accented voice per language (Sesame consistency [S]). Prabodhini shows a bad offline TTS breaks comprehension [S]. Use speech rate about 0.9x by default, numbers at about 0.75x with pauses, and a visible "Dheere / Phir se" control [S rate study + I].

### 4.10 Anti-patterns (explicit "never" list)
1. Bordered form fields, labelled inputs ("Amount: [____]"), dropdowns, date pickers as the primary path. The myScheme failure [S].
2. Cards and panels holding facts. Chat bubbles stacking into a wall.
3. Jargon: "UTR", "RRN", "NCRP", "vishing", "beneficiary", "acknowledgement". Translate to everyday words [S Medhi, Prabodhini].
4. Asking the user to *classify* their scam from a list before letting them speak [S Prabodhini].
5. An ambiguous mic state. Any moment where the user can't tell if it is listening [S Prabodhini].
6. Silent waiting or spinners with no voice acknowledgement. Hangs without explanation [S].
7. Short fixed end-of-turn timeouts that cut off slow speakers [S].
8. Repeating the same prompt verbatim after an error. "I didn't hear you." Blaming the accent [S Google, NBU].
9. Restarting the flow to fix one fact [S Google].
10. Long spoken paragraphs; more than 3 options; more than 1 question per turn [S Alexa/Apple].
11. Hiding captions behind a toggle. Voice-only output with no text [S Gemini/Prabodhini].
12. Voice-only input with no touch alternative for numbers [S Patel, Medhi].
13. Hold-to-talk as the *only* gesture (hard for elders) [I].
14. Mascots, avatars, faces, celebrity or novelty voices, humour [S Apple HIG, I].
15. Deep menus or multi-screen wizards, scrolling menus, soft-key mappings [S Medhi].
16. Pretending to be the police or the bank, or a human. Say "app" clearly [S Medhi, I].
17. Blocking the user from calling 1930 until the complaint is "complete". The golden hour matters more than data quality [S].
18. Red alarm colours and sirens for a panicked user [I].
19. A 22-language picker grid as the first screen [I, S Translate auto-detect].

### 4.11 Open questions to test with real users [I]
- Bottom horizon glow vs central breathing circle: which reads as "listening" for 60+ women in Hindi-belt towns?
- Female vs male helper voice for trust in a fraud context, by region.
- Does "tap a fact to hear your own voice" help or confuse?
- Is a screenshot of the payment SMS or app easier than dictating the UTR? (Likely yes. Needs on-device OCR.)

---

## 5. Sources (directly consulted this session = [S])
- ChatGPT voice in-chat: MacRumors https://www.macrumors.com/2025/11/26/chatgpt-voice-mode-update-seamless-chat/ ; Engadget https://www.engadget.com/ai/now-you-can-use-chatgpt-voice-without-leaving-your-chat-195000538.html ; TechCrunch https://techcrunch.com/2025/11/25/chatgpts-voice-mode-is-no-longer-a-separate-interface/
- GPT-Live: VentureBeat https://venturebeat.com/technology/openai-launches-gpt-live-a-full-duplex-voice-upgrade-that-lets-chatgpt-talk-more-like-a-person
- Gemini: Google Design "Illustrating the Gemini App" https://design.google/library/gemini-ai-visual-design ; Android Authority hold/hang-up https://www.androidauthority.com/gemini-live-hold-hang-up-buttons-3523189/ ; visualizer test https://www.androidauthority.com/gemini-live-neural-expressive-audio-visualizer-redesign-3728666/ ; 9to5Google floating redesign https://9to5google.com/2026/02/02/gemini-live-floating-redesign/
- Apple HIG Siri (rev. Jun 2026): https://developer.apple.com/design/human-interface-guidelines/siri ; iOS 27 Siri report https://9to5mac.com/2026/04/19/apple-has-already-teased-siris-new-design-coming-in-ios-27/
- Google conversation design: confirmations https://developers.google.com/assistant/conversation-design/confirmations ; errors https://developers.google.com/assistant/conversation-design/errors
- Alexa: Be Brief https://developer.amazon.com/en-US/alexa/alexa-haus/design-principles/be-brief ; one-breath test https://developer.amazon.com/blogs/alexa/post/531ffdd7-acf3-43ca-9831-9c375b08afe0/things-every-alexa-skill-should-do-pass-the-one-breath-test
- NN/g: https://www.nngroup.com/articles/intelligent-assistants-poor-usability-high-adoption/
- Medhi et al. 2011 TOCHI (full text read): https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ToCHI2711_Medhi.pdf
- Medhi, Sagar, Toyama 2007 text-free UIs: https://courses.cs.washington.edu/courses/cse490c/18au/readings/medhi-2007.pdf
- Patel et al. CHI 2009 speech vs dialed input: https://hci.stanford.edu/publications/2009/chi2009_patel.pdf
- Google NBU Voice Playbook: https://blog.google/technology/next-billion-users/voice-users-playbook/ ; Hindi on Assistant: https://blog.google/around-the-globe/google-asia/more-accessible-internet-india
- Prabodhini vs myScheme (full text read): https://aclanthology.org/2025.hcinlp-1.6.pdf
- Older adults: https://arxiv.org/abs/2403.02421 ; https://arxiv.org/abs/2510.06690 ; Pradhan et al. TOCHI 2020 https://thatlab.umd.edu/papers/2020_UseOf.pdf ; TTS rate https://informahealthcare.com/doi/abs/10.1080/07434610902728531
- Sesame: https://sesame.com/research
- Hume EVI: https://dev.hume.ai/docs/speech-to-speech-evi/configuration/turn-detection ; https://dev.hume.ai/docs/speech-to-speech-evi/features/interruptibility
- Hello! UPI: https://npci.org.in/what-we-do/hello-upi/product-overview ; https://npci.org.in/what-we-do/hello-upi/faqs
- Paytm Soundbox: https://paytm.com/blog/paytm-help/how-merchants-can-verify-payment-receipts ; TechCrunch https://techcrunch.com/2023/09/04/indian-fintechs-amplify-sound-box-pitches-to-woo-merchants ; SoundPod https://yourstory.com/2024/02/google-to-roll-out-soundpod-small-merchants
- Jugalbandi: https://news.microsoft.com/source/asia/features/with-help-from-next-generation-ai-indian-villagers-gain-easier-access-to-government-services/
- Avaaj Otalo: https://collablab.northwestern.edu/CollabolabDistro/nucmc/PatelEtAl-AvaajOtalo-VoiceForumForSmallFarmers-2010.pdf ; CGNet Swara https://research.microsoft.com/apps/pubs/default.aspx?id=194043 ; Mobile Vaani (Moitra et al. ICTD 2016) https://researchr.org/publication/MoitraDVKS16 ; CACM "Internet of the Orals" https://cacm.acm.org/research/the-internet-of-the-orals
- Google Read Along: https://support.google.com/readalong/answer/12279465 ; https://venturebeat.com/business/googles-read-along-taps-ai-to-improve-kids-reading-skills
- Google Translate conversation: https://support.google.com/translate/answer/6142474 ; https://9to5google.com/2024/02/01/google-translate-conversation-redesign/
- Turn-taking: Stivers et al. PNAS 2009 https://pmc.ncbi.nlm.nih.gov/articles/PMC2705608
- 1930 / golden hour (news and blogs, not official I4C): https://the420.in/cybercrime-helpline-1930-report-fraud-money-recovery-india/ ; https://telanganatoday.com/golden-hour-rule-to-rescue-of-cyber-fraud-victims-in-hyderabad

*Note: the Jina and Firecrawl search tools were unavailable (an authentication error and a timeout), so research used the built-in web search and fetch. No apps were installed and no browser was controlled. Every row marked [K] should be spot-checked before it is quoted externally.*
