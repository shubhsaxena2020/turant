# Turant: beginner-friendly and world-class visual UX teardown

Compiled 2026-11-21. Scope: (a) Indian mass-market apps, (b) elder and simple-mode design, (c) visual craft that doesn't rely on boxes. Voice and conversational UI are covered by a separate document.

**Source labels used throughout**
- **[S]**: sourced web material, read this session. The URLs are in §6.
- **[D]**: the local brand pack at `C:\Users\shubh\Projects\awesome-design-md\design-md\<brand>\DESIGN.md`. These are third-party analyses of brand websites, not official specs.
- **[K]**: well-known public product behaviour, not re-verified this session. Treat it as reliable-ish and check it before quoting externally.
- **[I]**: my own inference or recommendation.

Research limits: Jina search was unauthenticated and the Firecrawl host timed out, so all research went through WebSearch and WebFetch. I could not open Mobbin or the app stores, and I took no screenshots.

---

## 0. The ten conclusions that matter

1. **Show one thing per screen.** GOV.UK starts every form with "one thing per page", meaning one question or one decision, because it is "much easier to communicate that thing" and it reduces cognitive load [S]. Medhi's work with low-literacy users in India found that 56 of 90 subjects could not navigate hierarchical menus, and that 0 of 40 non-users could [S]. Flatten the app into a linear sequence of full screens. Don't use dashboards, tabs or accordions.
2. **Separate content with space, type and colour fields.** Apple.com stacks full-bleed tiles with no gaps and lets the colour change act as the section divider [D]. Airbnb, Threads and Things separate content with photography or type and spacing, not borders [D/K]. Turant should use three devices: whitespace steps, a strong type scale, and two or three full-bleed colour bands. Use hairlines only inside a list of facts.
3. **Make the main thing big, high-contrast and labelled.** Google's Material 3 Expressive research covered 46 studies and more than 18,000 participants. A larger, more prominent Send button was spotted 4 times faster, and users aged 45+ found key elements as fast as younger users. The same research warned that removing text labels hurt usability [S]. So: big, filled, labelled buttons, and never icon-only buttons.
4. **Ease anxiety before anything else.** Medhi found first-time users "nervous that their keypress might 'break' or 'spoil' the phone" [S]. MicroSave found older users fear "making unintentional mistakes" [S]. Every screen should say what happens next and confirm that nothing is lost ("सब सुरक्षित है").
5. **Make the success moment calm and tactile, never a party.** UPI taught India that a tick plus a single sound means "done" (PhonePe's tone, GPay's tick) [S, weak/K]. Robinhood removed its confetti in 2021 after it was criticised as gamification [S]. Turant's user has just lost money. The right success screen is a calm green field, a tick that draws itself, one spoken sentence, and the next action.
6. **Use one primary action, in the thumb zone, at 56px or more.** PhonePe's 2025 redesign moved its key action, the scanner, to a larger footer button within thumb reach [S]. WCAG AAA asks for at least 44×44 px and Material for 48dp [S/K]. Turant should use one full-width 56–64px button per screen, with an optional text link as the only secondary action.
7. **Size type for Indic scripts, not Latin.** India's government design system, UX4G, uses Noto Sans with a 16px body minimum and **line-height 1.8 for Devanagari** [S]. Google and Material both note that Indic fonts look smaller at the same px value and need more vertical space [S]. Turant should use an 18–20px body, a 1.7–1.8 line-height for Indic text, and never apply negative letter-spacing to Indic text.
8. **Keep the palette calm, not alarming.** Use warm paper, deep ink and a deep teal action colour. Signal time pressure in amber and keep red for genuine stop-errors. A deep-night field is only for the "listening" moment. Every pair in §5.3 passes AA, and most pass AAA.
9. **Present the complaint as a document, not a textarea.** Show it as typeset text on a full-bleed sand-coloured band with one big "कॉपी करें" button. Highlight each paragraph as it is read aloud, the way Apple Music shows lyrics [K/I].
10. **Don't move learned things, and support people who help.** The PhonePe redesign backlash came from "everything moves around" [S]. Assistive Access is set up by "trusted supporters" [S], and Indian elders learn from family [S]. Add a "show to helper or officer" big-text mode and a WhatsApp share.

---

## 1. Catalogue (135 entries)

| # | App / system | Core concept that makes it easy or beautiful | Steal for Turant / avoid | Src |
|---|---|---|---|---|
| **India: mass market** |||||
| 1 | Google Pay India | Circles of people's faces instead of menus. Each person's history reads as a chat thread. Shows few contacts at a time to avoid overwhelm. | **Steal:** faces and plain words over menus. Show a small set of items. | S/K |
| 2 | Tez "audio QR" (2017) | Pay by sound between phones ("Tez moment") because cheap phones have poor cameras. Built for 1GB-RAM phones and 8 languages. Some users navigate by audio alone. | **Steal:** design for the worst device first, and use a physical metaphor. | S |
| 3 | GPay success screen | Full-screen tick and amount, with an animated check and particles (third-party clones show this) plus a sound. | **Steal:** a full-screen success field with a tick. **Avoid:** particles or confetti. | S(weak)/K |
| 4 | PhonePe 2025 redesign | Kept send, bank transfer and balance at the top. Moved the scanner to a larger footer button within thumb reach. | **Steal:** a primary action in the thumb zone. | S |
| 5 | PhonePe backlash | Long-time users "can't find things" after "everything moves around". | **Avoid:** moving a learned action between versions. | S |
| 6 | PhonePe success tone | A single-note confirmation that has become a "cultural marker" for a successful UPI payment. | **Steal:** one short, warm confirmation sound. | S(weak) |
| 7 | Paytm | A dense super-app icon grid. The Soundbox speaks the amount out loud. | **Steal:** speak the key fact. **Avoid:** the icon-grid home. | K |
| 8 | Paytm Soundbox / GPay SoundPod | A voice says "₹500 received", so nobody has to read the screen. | **Steal:** a spoken summary of the facts. | S |
| 9 | BHIM | A plain government UPI app with many languages and a big amount entry. | **Avoid:** its dated, form-like fields. | K |
| 10 | WhatsApp | Chat is the one mental model every Indian user already knows. Tick marks show status, and voice notes are hold-to-talk. | **Steal:** ticks for progress. Use rows separated by avatar and space, not boxes. | K |
| 11 | WhatsApp sharing | "Share to WhatsApp" is how documents travel in India. | **Steal:** share the complaint as a WhatsApp-ready message or PDF. | K |
| 12 | YouTube | Thumbnails and a mic in the search bar. Bharat users search by voice. | **Steal:** the mic as the most prominent entry point. | K |
| 13 | YouTube Go (retired) | Showed the data cost before a download, and worked offline. | **Steal:** "this needs no internet once loaded". | S |
| 14 | Instagram Reels | Full-bleed, one item per screen, swipe through. | **Steal:** vertical pacing with one thing per screen. | K |
| 15 | Meesho | Designed for "those who've never shopped online", so "design must be simple, not overwhelming". Vernacular-first. | **Steal:** assume zero prior app knowledge. | S |
| 16 | Meesho home fix | About 8% of first-time users left at the home screen. Hand-holding layouts fixed it. | **Steal:** a guided first screen, not a menu. | S |
| 17 | Meesho Vaani | A vernacular voice shopping assistant. | **Steal:** voice as the main entry, not an add-on. | S(weak) |
| 18 | JioMart on WhatsApp | Ordering inside chat. | **Steal:** meet users inside channels they already use. | K |
| 19 | MyJio | A dense tile dashboard. | **Avoid:** the dashboard home. | K |
| 20 | DigiLocker | Documents shown as official, trusted objects with the national emblem. | **Steal:** quiet authority cues. **Avoid:** government-form density. | K |
| 21 | UMANG | A catalogue of more than 1,000 services. | **Avoid:** a catalogue as the first thing users see. | K |
| 22 | Aarogya Setu | Risk status as a whole-screen colour plus one sentence ("You are safe"). | **Steal:** status as a full-bleed field plus one line. | K |
| 23 | CoWIN certificate | QR code plus a plain record that you show to someone. | **Steal:** a "show this" screen. | K |
| 24 | IRCTC | Captchas, long forms, timeouts. | **Avoid:** every part of it. It is the reference anti-pattern. | K |
| 25 | cybercrime.gov.in (NCRP) | 200-character minimum, ID upload, OTP and captcha, all in English. | **Avoid:** making the user fill this in. Turant fills it for them. | S(facts.md) |
| 26 | 1930 helpline | 16–18 minutes per call to register a complaint by hand. | **Steal:** a ready-to-read summary that shortens the call. | S(facts.md) |
| 27 | UX4G (Govt of India design system) | Noto Sans, 16px body minimum, Devanagari line-height 1.8, rem units. | **Steal:** these type floors. | S |
| 28 | Sanchar Saathi / Chakshu | Government fraud reporting for telecom. | **Avoid:** its form-first flow. Note it exists as a referral. | K |
| 29 | Swiggy | Live order tracker in narrative stages, warm microcopy and illustration. | **Steal:** named stages ("सुन लिया → समझ रहे हैं → लिख रहे हैं"). | K |
| 30 | Zepto | Time as the hero (a big countdown). | **Steal:** golden-hour urgency shown calmly as time, not as red. | K |
| 31 | Blinkit | A single brand colour field and a minimal tracker. | **Steal:** one-colour confidence. | K |
| 32 | Rapido / Ola | The ride OTP shown huge for showing to the driver. | **Steal:** show the one number they need (1930) huge. | K |
| 33 | Uber | Black and white, pill CTAs, one "Where to?" input. | **Steal:** one entry point. | D |
| 34 | Josh / Moj | Full-screen vertical video. | **Steal:** full-bleed. **Avoid:** an infinite feed. | K |
| 35 | ShareChat | Vernacular-first. The language picker is the first screen, with each language written in its own script. | **Steal:** "हिन्दी · தமிழ் · বাংলা" as large script names. | K |
| 36 | Kuku FM | Audio-first vernacular stories. | **Steal:** a "सुनिए" (listen) control on long text. | K |
| 37 | Pratilipi | Long-form reading in about 12 Indian languages. | **Steal:** generous Indic reading typography. | K |
| 38 | Khatabook | 13 languages including Urdu (right to left). Built from shopkeeper field visits. Money owed and paid shown as red and green numbers. | **Steal:** big numbers carry the meaning. | S |
| 39 | OkCredit | Voice notes for transactions. Aimed to be usable "without observing a demonstration". A shopkeeper kept paper records too, fearing data loss. | **Steal:** visible "saved" reassurance. | S |
| 40 | Vyapar | Invoice to PDF to WhatsApp in one tap. | **Steal:** a one-tap shareable document. | K |
| 41 | DeHaat / Kisan Suvidha | Big icon tiles for farmers. | **Avoid:** icon-only tiles without labels. | K |
| 42 | Krishify | A Hindi-first farmer social feed. | **Steal:** peer voice and tone. | K |
| 43 | Plantix | One big camera button: photograph the crop, get a diagnosis. | **Steal:** one big action. | K |
| 44 | Apna | A vernacular job app with voice and video intros. | **Steal:** speaking instead of typing. | K |
| 45 | Truecaller | Full-screen colour by caller type: red for spam, blue for verified. | **Steal:** colour fields as status. **Avoid:** alarm red as the default. | K |
| 46 | Practo | Doctor listing cards. | **Avoid:** stacks of cards. | K |
| 47 | mParivahan | A virtual driving licence. | **Steal:** a "show to officer" view. | K |
| 48 | Google Lens (India) | Camera-first, no typing. | **Steal:** optional screenshot evidence capture. | K |
| 49 | Files by Google | One cleaning suggestion at a time, each with a big action. | **Steal:** one suggestion per screen. | K |
| 50 | JioPhone / Jio Bharat (KaiOS) | A voice assistant on a feature phone with D-pad navigation. | **Steal:** works without fine motor control. | K |
| 51 | CRED | Dark, high-craft, neo-brutalist. | **Avoid:** style over clarity for elders. | K |
| 52 | Groww | White space and one big number per screen. | **Steal:** a numeric hero (the ₹ amount lost). | K |
| 53 | Zerodha Kite | Calm, plain, no dark patterns. | **Steal:** a trust-through-restraint tone. | K |
| 54 | Amazon / Flipkart Hindi voice | Voice shopping in Hindi, plus video help. | **Steal:** short "how it works" videos or animations. | K |
| 55 | SBI YONO | A dense grid of banners and tiles. | **Avoid:** banners and promo clutter. | K |
| 56 | Navi | A loan in a few screens with few fields. | **Steal:** cut fields brutally. | K |
| 57 | Google Read Along (Bolo) | The Diya character praises the child's reading. | **Steal:** warm encouragement ("आप सही कर रहे हैं"). | K |
| 58 | Google NBU research | Avoid "hierarchies understood only through language", minimise text input, use local semiotics, design for shared phones and data cost. | **Steal:** all of it. | S |
| **Elder / simple mode** |||||
| 59 | Apple Assistive Access | Choice of a **grid** layout (visual) or a **rows** layout (text). High-contrast buttons, large text labels. Set up by a trusted supporter. | **Steal:** rows with labels as the default. Add a helper setup. | S |
| 60 | Assistive Access: Calls app | Phone and FaceTime merged into one "Calls". | **Steal:** merge concepts ("1930 को कॉल करें", one path). | S |
| 61 | Assistive Access: Messages | Emoji-only keyboard and video messages. | **Steal:** non-text input options. | S |
| 62 | Samsung Easy Mode | Bigger icons, text, spacing, navigation and keyboard. Adjustable touch-and-hold delay (0.3–1.5 s). | **Steal:** tolerate slow or long presses, and never use long-press-only actions. | S |
| 63 | Samsung high-contrast keyboard | Black on yellow, among four themes. | **Steal:** offer a high-contrast theme toggle. | S |
| 64 | Xiaomi / Motorola Simple mode | A launcher with big labelled tiles. | **Steal:** labelled tiles. | K |
| 65 | Android font scale to 200% (non-linear) | Large text scales without breaking layouts. | **Steal:** use rem units and test at 200%. | K |
| 66 | iOS Dynamic Type (AX sizes) | Layouts reflow from rows to stacks at large sizes. | **Steal:** reflow, never truncate. | K |
| 67 | GrandPad | About 15 large, colourful labelled buttons. "Virtually impossible to get lost". A big back-to-home button. 16pt bold default text. | **Steal:** one obvious home and back path. | S |
| 68 | Lively Jitterbug Smart4 | A **list-based** menu that reviewers found "much more intuitive" than icon grids. Read-aloud menu. | **Steal:** lists of words over icon grids. | S |
| 69 | Lively Urgent Response | One physical button for help. | **Steal:** an always-visible "मदद" (help) control. | K |
| 70 | Doro | An assistance button, labelled tiles, remote set-up by family. | **Steal:** a family-helper role. | K |
| 71 | BIG Launcher | Giant tiles and an SOS button. | **Steal:** a giant target. **Avoid:** cartoonish heaviness. | K |
| 72 | Konnekt Videophone | One button to video-call (dementia care). | **Steal:** one-button paths. | K |
| 73 | BlindShell | Tactile keys and a linear menu where everything is spoken. | **Steal:** linear, fully speakable flows. | K |
| 74 | WeChat Care Mode (关怀模式) | Larger text, bolder colours, bigger buttons, listen to text. | **Steal:** a "बड़ा अक्षर" (large-text) mode. | K |
| 75 | Alipay / Taobao elder versions | Simplified elder layouts that followed China's 2021 age-friendly app rules. | **Steal:** elder mode as a first-class product, not a setting. | K |
| 76 | Be My Eyes | One big "Call a volunteer" button. | **Steal:** one primary action per screen. | K |
| 77 | Microsoft Seeing AI | Point the camera and it speaks. | **Steal:** automation over input. | K |
| 78 | Medhi text-free UI (MSR India) | Photos, graphics and voice instead of text. Strongly preferred by slum communities. | **Steal:** pair key labels with pictograms and voice. | S |
| 79 | Medhi mobile-banking study | Text UI: 0 of 20 completed. Graphical UI: all completed but needed prompting. Spoken dialog: fastest for those who succeeded. A live operator was 10× more accurate than forms. | **Steal:** voice plus graphics plus a human fallback (1930). | S |
| 80 | Medhi design rules | Graphical cues, voice annotation, local language, minimal hierarchy, no non-numeric text input, no scrolling menus, minimal soft keys, human mediators. | **Steal:** use these as the acceptance checklist. | S |
| 81 | UPI elders (Tamil Nadu thesis) | Elders trust family members to help them. | **Steal:** a helper mode. | S |
| **Global craft benchmarks** |||||
| 82 | Apple.com | Full-bleed tiles with **no gaps**. The colour change *is* the divider. 17px body. One blue accent. No borders and no chrome shadows. | **Steal:** colour-change dividers and a single accent. | D |
| 83 | Apple Weather | The sky gradient is the background. The temperature is a giant numeral. | **Steal:** atmosphere as a full-bleed field and a hero numeral. **Avoid:** its many translucent modules, which are still cards. | K |
| 84 | Apple Wallet / Apple Pay | Passes as physical objects. Payment confirms with a tick, haptic and the word "Done". | **Steal:** tick plus haptic plus one word. | K |
| 85 | Apple Fitness | Rings on black and celebratory closures. | **Steal:** progress as a shape. **Avoid:** award fanfare. | K |
| 86 | Apple Music lyrics | Huge full-screen type with the current line lit. | **Steal:** highlight each paragraph while the complaint is read aloud. | K |
| 87 | Apple Translate (conversation) | Big text facing the other person. | **Steal:** a "show to bank or police" big-text view. | K |
| 88 | Apple Medical ID | Critical info as a plain list, reachable from the lock screen. | **Steal:** a plain label/value list. | K |
| 89 | Apple HIG | 44×44pt minimum targets, 17pt default body. | **Steal:** these as floors (Turant goes larger). | K(official) |
| 90 | Headspace | Warm orange, round friendly illustration, one button, breathing onboarding. | **Steal:** warmth and one button. | K |
| 91 | Calm | Full-bleed nature and a slow "breathe" bubble. | **Steal:** slow motion that soothes panic. | K |
| 92 | Duolingo | One question per screen, a big bottom button, and a coloured feedback band that slides up. Five motion principles, including "get to the payoff quickly". | **Steal:** the feedback band and quick payoff. **Avoid:** streak guilt. | S/K |
| 93 | Duolingo characters (Rive) | Expressive mascots with mouth shapes that move with speech. | **Avoid** for Turant: a mascot trivialises loss. | S |
| 94 | Airbnb | Photography plus Cereal type at weight 500/600, a single Rausch accent, modest display sizes (22–28px). | **Steal:** one accent and modest weights. | D |
| 95 | Things 3 | Lists with no borders. Hierarchy from type and whitespace only. | **Steal:** borderless lists. | K |
| 96 | Arc Search ("Browse for me") | Builds a finished page for you. | **Steal:** "we wrote it for you", delivering a result rather than a form. | K |
| 97 | Linear | Hairlines and type on dark, calm motion. | **Steal:** restraint. **Avoid:** density for elders. | D |
| 98 | Revolut | 80–136px display type, black canvas. | **Steal:** a giant-numeral moment. **Avoid:** the full black UI. | D |
| 99 | Wise | Heavy display type, a lime accent, a transfer tracker timeline. | **Steal:** a "what happens next" timeline. | D/K |
| 100 | Monzo | "Simplicity isn't the absence of things, it's bringing order to complexity". Don't interrupt someone mid-task. | **Steal:** no interstitials during the flow. | S |
| 101 | Cash App | A huge number keypad on full-bleed green, one action. | **Steal:** one huge input field. | K |
| 102 | Toss (Korea) | One thing per screen, huge type, plain language. The benchmark for minimal fintech. | **Steal:** its rhythm. | K |
| 103 | Nubank | One brand colour, plain-language money. | **Steal:** plain words. | K |
| 104 | M-Pesa app | Mass-market, few large actions. | **Steal:** few actions. | K |
| 105 | Robinhood | Removed confetti in 2021 after gamification criticism. | **Avoid:** celebration that doesn't fit the user's mood. | S |
| 106 | Spotify | Achromatic UI where album art supplies the colour. | **Steal:** let content carry the colour. | D |
| 107 | Google Maps navigation | A giant "next step" instruction over a full-bleed map. | **Steal:** a giant next-step line. | K |
| 108 | Google Maps bottom sheet | Content rises from below over a full-bleed background. | **Steal:** a bottom sheet for "बदलें" (edit). | K |
| 109 | BeReal | One daily action. | **Steal:** single purpose. | K |
| 110 | Opal | Dark gradients and big numerals. | **Steal:** premium calm. | K |
| 111 | Bear | Writing with no chrome, typography only. | **Steal:** the complaint as a typeset document. | K |
| 112 | iA Writer focus mode | Dims everything except the current sentence. | **Steal:** focus highlight during read-aloud. | K |
| 113 | Stripe Checkout | One column, minimal fields, inline errors. | **Steal:** inline, human errors. | D/K |
| 114 | Telegram | Fast, crisp lists and expressive stickers. | **Steal:** speed. | K |
| 115 | Flighty | Departure-board type and status in plain words ("on time"). A timeline of what comes next. | **Steal:** a plain-language status line. | K |
| 116 | Carrot Weather | Personality-driven snarky copy. | **Avoid:** jokes with victims. | K |
| 117 | Rise | One number and one curve. | **Steal:** one-number focus. | K |
| 118 | Endel | Generative calm visuals with sound. | **Steal:** an ambient listening state. | K |
| 119 | Nike Run Club | Giant condensed numerals and an audio coach. | **Steal:** big numerals. | K |
| 120 | Strava | An orange accent on a white feed. | **Steal:** a single accent. | K |
| 121 | Threads | Text-first, no cards, separated by avatar, space and hairlines. | **Steal:** a list without boxes. | K |
| 122 | Medium | Long-form reading typography. | **Steal:** a reading measure of about 60–70 characters. | K |
| 123 | Notion | The page is a document, and blocks have no borders. | **Steal:** document feel. | D |
| 124 | Claude.ai | Warm cream canvas (#faf9f5), serif display at weight 400, a coral accent. | **Steal:** a warm canvas and serif for the document. | D |
| 125 | Typeform / Tally | One question at a time in big type. | **Steal:** one-question gap filling. | K |
| 126 | Crouton cook mode | Large step-by-step text you can read across a kitchen. | **Steal:** a step mode for 1930 instructions. | K |
| 127 | Finch | A kind, non-judgemental tone. | **Steal:** the tone. | K |
| 128 | How We Feel | Emotion picked from colour fields. | **Steal:** colour as feeling. | K |
| 129 | Structured | A timeline day view. | **Steal:** the timeline. | K |
| 130 | Google Pixel Recorder | Words appear live as you speak. | **Steal:** a live transcript in big type (visual side only). | K |
| 131 | Google Personal Safety | One big emergency action. | **Steal:** one big action. | K |
| 132 | Citizen | Alarm-red crime alerts. | **Avoid:** fear-driven red. | K |
| 133 | Material 3 Expressive | Size, colour, shape, containment and motion. Elements found up to 4× faster, and the age gap disappears. | **Steal:** size and contrast. **Avoid:** breaking familiar patterns in finance. | S |
| 134 | GOV.UK "Check your answers" | A summary list of label and value with a "Change" link on each row. No boxes. | **Steal:** use this exact pattern for the facts list. | K(official) |
| 135 | GOV.UK confirmation panel | A full-width green panel with a big reference number and plain next steps. | **Steal:** the success screen structure. | K(official) |

---

## 2. Deep teardowns (18)

Format for each: **Separation** (how it divides content without boxes) · **Action** · **Hierarchy and type** · **Colour** · **Motion and feedback** · **First-timers** · **Trust** · **Turant takeaway**.

### 2.1 GOV.UK Design System [S + K]
- **Separation:** a white page with one H1 question in large bold type. Content is separated only by space and the type scale, and summary lists use thin rules.
- **Action:** one green "Continue" button, full-width on mobile. "Back" is a text link at the top.
- **Hierarchy and type:** one question per page. The H1 *is* the question label. Hint text is grey below it. Answers are big radios or inputs.
- **Errors:** an error summary at the top, plus a red left bar and message beside the field. One question per page makes validation "much easier" [S].
- **First-timers:** no onboarding at all. The structure itself teaches the user. GDS moved away from accordions: "very simple one-question-per-page designs work better" [S].
- **Success:** the confirmation panel is a full-bleed green block with a large reference number, followed by "What happens next" as plain prose.
- **Turant takeaway:** use the whole skeleton. Each missing fact gets one question per screen. Then a "check your answers" list. Then a confirmation panel.

### 2.2 Google Pay India / Tez [S + K]
- **Separation:** people's faces in circles on a white field. Transaction history is a chat thread made of bubbles, not cards.
- **Action:** big "Scan any QR" and "Pay contacts" entries. The amount screen shows a giant numeral.
- **First-timers:** built for "women and new internet users", 8 languages, 1GB phones. Some users navigate by audio alone [S]. Contacts are shown in small numbers to avoid overwhelm [S].
- **Success:** a full-screen tick with the amount and a sound, the moment users rely on.
- **Trust:** never reveals the full phone number or bank details to the recipient [S].
- **Turant takeaway:** a giant ₹ numeral, faces and words, a success tick with sound, and privacy reassurance said out loud ("आपका नंबर किसी को नहीं दिखेगा").

### 2.3 PhonePe 2025 redesign [S]
- **Separation:** replaced icon-heavy grids with "contextual and clearly grouped layouts" and "visual breathing room".
- **Action:** the scanner moved to a larger footer button within thumb reach. The top actions people use most stayed where they were.
- **Trust:** the brief was that it "had to feel… like a continuation of what the user already believes about the brand".
- **Lesson from the backlash:** users said "everything moves around" [S].
- **Turant takeaway:** put the action at the bottom in the thumb zone. Fix the screen order once and never reshuffle it.

### 2.4 Apple Assistive Access [S]
- **Separation:** a big-button grid, or a rows layout with large text labels for people who prefer text.
- **Action:** a few large high-contrast buttons, and every app is reduced to its core tasks. Calls are merged into one app.
- **First-timers:** a trusted supporter configures it, and it was designed with people with cognitive disabilities [S].
- **Turant takeaway:** default to **rows of words** with an icon at the left, not icon grids. Provide a helper set-up link.

### 2.5 Samsung Easy Mode [S]
- **Separation:** larger spacing, bigger icons and text, a simplified home screen.
- **Input tolerance:** adjustable touch-and-hold delay (0.3–1.5 s), and a high-contrast black-on-yellow keyboard.
- **Turant takeaway:** never require long-press or swipe-only gestures. Debounce double taps, because elders press firmly and repeatedly [I]. Ship a high-contrast theme.

### 2.6 Jitterbug Smart4 and GrandPad [S]
- **Jitterbug:** a list-based menu that reviewers found "much more intuitive than… icon-based menus", with read-aloud.
- **GrandPad:** about 15 large colourful buttons, "virtually impossible to get 'lost'", a big back button, 16pt bold default text.
- **Turant takeaway:** words beat icons, and there should be one route home. Turant has about five screens in a line with a persistent "शुरू से" (start over) and "मदद" (help).

### 2.7 Material 3 Expressive research [S]
- **Findings:** 46 studies and 18,000+ participants. A bigger, more prominent Send button was spotted 4× faster. Users aged 45+ were as fast as younger users. Larger buttons and high-contrast containment helped people with motor and vision limits.
- **Caveats:** removing labels hurt usability. Unconventional layouts scored lower. In banking, "respect established UI patterns". A "strong minority preferred calmer designs". "No amount of emotion can compensate for a lack of clarity."
- **Turant takeaway:** be expressive in **size, colour and shape**, and conventional in **structure**. Turant serves panicked users, so lean calm.

### 2.8 Apple.com [D]
- **Separation:** edge-to-edge tiles alternate light (#ffffff / #f5f5f7) and near-black (#272729). The colour change is the divider, with 0 gap. About 80px padding inside each tile.
- **Type:** SF Pro, body at **17px** with line-height 1.47, headlines at weight 600 with negative tracking (Latin only), hero type 56px at line-height 1.07.
- **Colour:** a single blue accent (#0066cc) for every interactive element. No borders, gradients or chrome shadows.
- **Turant takeaway:** separate sections with full-bleed bands. Use one accent colour, and make body text 18px or larger.

### 2.9 Claude.ai [D]
- **Separation:** a warm cream canvas (#faf9f5), a slightly darker cream surface (#efe9de) and dark bands (#181715) set the page's rhythm. 96px between sections.
- **Type:** a serif display at weight 400 with a humanist sans body. It "reads like a long-form magazine column".
- **Turant takeaway:** a warm paper canvas feels humane, not clinical. A serif suits the complaint document (Tiro Devanagari / Tiro Tamil), giving it a "letter" register.

### 2.10 Airbnb [D]
- **Separation:** photography does the separating. Cards are mostly photo plus text with no visible border, on white, with hairlines (#dddddd) used sparingly.
- **Type:** modest display sizes (22–28px) at weights 500/600. "The brand trusts photography".
- **Colour:** a single "voltage" colour (#ff385c) for every primary CTA.
- **Turant takeaway:** reserve one colour for the primary action and nothing else.

### 2.11 Apple Wallet / Apple Pay success [K]
- **Feedback:** the confirm action resolves into a tick, a haptic and the word "Done", in under a second, with no extra screen.
- **Trust:** the system sheet and Face ID glyph look the same every time.
- **Turant takeaway:** success should be a short ritual of tick, haptic (`navigator.vibrate(30)`), sound and one word. It looks the same every time.

### 2.12 Cash App / Toss / Groww (one-number screens) [K]
- **Separation:** one giant numeral on a full-bleed colour or white field. Supporting text sits at a much smaller size, so the size ratio alone sets the hierarchy (about 4–5×).
- **Action:** one pill or full-width button.
- **Turant takeaway:** on the facts screen, the ₹ amount and the date and time are the two hero facts. Show them big. Everything else gets a smaller label/value row.

### 2.13 Duolingo [S + K]
- **Separation:** one question per screen and a fixed big bottom button. Feedback is a full-width colour band (green or red) that slides up from the bottom holding the next button.
- **Motion:** "get to the payoff quickly", with a consistent beat even with sound off [S].
- **Turant takeaway:** borrow the slide-up confirmation band ("ठीक है ✓ — अगला") after each answer. Skip the mascot, streaks and fanfare.

### 2.14 Headspace / Calm [K]
- **Separation:** full-bleed warm colour or nature, with a single central shape such as a breathing circle.
- **Motion:** slow cycles of about 4 seconds that slow the user's breathing.
- **Turant takeaway:** the listening state is a slow breathing glow on a deep-night field, not a frantic waveform. Calming a panicked person is part of the job.

### 2.15 Aarogya Setu / Truecaller (status as a colour field) [K]
- **Separation:** the whole screen tint *is* the status, with one sentence on top.
- **Risk:** Truecaller's red spam screen is alarming. For a victim, a red field would re-trigger panic.
- **Turant takeaway:** use the status-field idea in calm tones. Green means "complaint ready" and amber means "jaldi kijiye" (golden hour). Red is only for "stop, don't pay anyone".

### 2.16 Wise tracker / Flighty / Swiggy (what happens next) [D + K]
- **Separation:** a vertical timeline made of dots and a line. Done steps are filled, the current step pulses, future steps are muted. No cards.
- **Turant takeaway:** the last screen shows "1. शिकायत तैयार ✓ 2. 1930 पर कॉल करें ← अभी 3. पोर्टल पर डालें 4. बैंक को बताएं" as a timeline.

### 2.17 Meesho / Khatabook / OkCredit (Bharat builders) [S]
- **Lessons:** assume the user has never done this before. Go vernacular first, including right-to-left support for Urdu. Hand-holding on the first screen fixed Meesho's drop-off. OkCredit wanted to be usable "without observing a demonstration", yet a shopkeeper still kept paper records out of fear of data loss.
- **Turant takeaway:** the first screen must explain itself in about 6 words plus voice. Show a constant "आपकी बात सुरक्षित है" (saved locally) reassurance.

### 2.18 Robinhood confetti [S]
- **What happened:** confetti for "firsts" was cited in a Massachusetts complaint about gamification. It was removed and replaced by gentler milestone visuals.
- **Turant takeaway:** match the emotional register. Completing a fraud complaint deserves relief and direction, not celebration.

---

## 3. Research rules (concrete, citable)

| Rule | Value | Source |
|---|---|---|
| Target size, AA (WCAG 2.5.8) | at least 24×24 CSS px, or enough spacing | W3C [S] |
| Target size, AAA (WCAG 2.5.5) | at least 44×44 CSS px | W3C [S] |
| Material / Apple targets | 48dp / 44pt | official guidance [K] |
| Older-adult targets | 44–48 minimum plus extra spacing | NN/g 2019 via secondary [S] |
| Text contrast | 4.5:1 AA, 7:1 AAA (3:1 / 4.5:1 for large text) | WCAG 1.4.3 / 1.4.6 [K, standard] |
| Non-text UI contrast | 3:1 for component boundaries needed to identify them | WCAG 1.4.11 [K] |
| Body text minimum | 16px, 12px absolute floor, rem units, line-height at least 1.5 | UX4G (GoI) [S] |
| Devanagari line-height | **1.8** | UX4G [S] |
| Indic vertical space | Indic fonts "may appear smaller" at the same size and need more line spacing | Google Fonts / Material [S] |
| Tamil clipping | line-height equal to font-size clips Tamil. Give generous line-height | Mozilla bug 1035471 [S] |
| Text resize | let users enlarge text | NN/g [S] |
| One thing per page | one question, one decision, one piece of information per page, merged only after research | GOV.UK [S] |
| Hierarchy | 56 of 90 low-literacy subjects couldn't navigate menus, and 0 of 40 non-users could | Medhi ToCHI 2011 [S] |
| Text vs graphics vs voice | text UI 0% completion; graphical UI 100% with prompting; voice fastest for those who succeed; operator 10× more accurate than forms | Medhi [S] |
| Avoid | non-numeric text input, scrolling menus, soft-key mappings | Medhi [S] |
| Anxiety | first-timers fear they will "break" the phone | Medhi [S] |
| Expressive sizing | bigger and more prominent elements found 4× faster; age gap for 45+ removed; keep labels | Google M3E [S] |
| Don't interrupt | no prompts mid-task | Monzo [S] |
| Familiarity | don't relocate learned actions | PhonePe backlash [S] |
| Support people | supporter-led set-up and family trust | Apple AA, UPI elder thesis [S] |
| Data and shared devices | minimise data; devices are shared | Google NBU [S] |

---

## 4. What "boxes and stuff" means, and the replacement

The owner's complaint maps to these concrete current-UI tells [I]:
- Bordered cards around every block.
- Form-style labelled inputs and textareas.
- Panels inside panels.
- Shadows used for every surface.
- Many equally weighted elements on each screen.

The world-class apps above replace boxes with five tools:

| Instead of… | Use… | Seen in |
|---|---|---|
| a card around a section | a **full-bleed colour band** (the colour change is the divider) | Apple.com, Claude, Aarogya Setu |
| a card around a list item | **space plus alignment plus a 1px hairline** between rows | Things, Threads, GOV.UK summary list |
| a box around a heading | a **type-scale jump** (at least 1.5× size or 2 weight steps) | Toss, Cash App, Apple |
| a textarea for long text | **typeset text on the page**, like a document | Bear, Notion, Apple Music lyrics |
| many buttons | **one filled button** in the thumb zone plus one text link | GOV.UK, Duolingo, PhonePe |

---

## 5. Synthesis: Turant's visual direction (all [I] unless marked)

### 5.1 Layout system: "pages, not panels"
- **Structure:** one column, about 5 screens in a fixed linear order:
  1. **बोलिए** (listen)
  2. **यह सही है?** (check facts, with one-question pages only for missing facts)
  3. **आपकी शिकायत** (document)
  4. **अब यह करें** (next steps, plus the success state)
  5. Language choice comes first, on first run only.
- **Horizontal space:** side gutters of **20px** (on 360px-wide phones) and a max content width of 560px.
- **Vertical spacing scale:** 4 · 8 · 16 · 24 · 40 · 64 px.
  - 24 between related items.
  - 40 between groups.
  - 64 before a new section.
  - Bands touch edge to edge with 0 gap.
- **Bands:** three full-bleed band colours only. Night is for listening. Paper is the default. Sand holds the document. Success and amber are status fields.
- **Bottom bar:** a sticky bottom action zone that *fades* into the canvas over 24px, with no border or shadow line. It holds one full-width primary button (**60px tall**, radius 16, label at 20px weight 600, with an optional icon left of the label) and one text-link secondary below it (48px hit area).
- **Persistent controls:** a top row with "← पीछे" (text plus icon, 48px), and on the right "मदद" and "Aa" (text size). Nothing else.
- **Rules:** no tabs, accordions or carousels. Never more than 1 primary and 1 secondary action per screen. Content that would need scrolling for the decision belongs on two pages.

### 5.2 Type
**Fonts**
- **Default UI and body:** Noto Sans Devanagari / Noto Sans Tamil / Noto Sans (system fonts on almost all Android phones, so zero download for cheap devices). UX4G picked Noto for consistent Hindi and English rendering [S].
- **Display (optional, subset):** **Mukta** (Devanagari plus Latin; sibling **Mukta Malar** for Tamil) or **Anek** (a variable family covering many Indic scripts) at weight 600–700. For a warmer, rounder voice, use **Baloo 2** / **Baloo Thambi 2** (Tamil) only for the one hero line per screen.
- **Complaint document:** **Tiro Devanagari Hindi / Tiro Tamil** (serif) to give it a "formal letter" register, falling back to Noto Serif.
- **Avoid:** thin weights below 400 for Indic text, because matras disappear. Never apply negative letter-spacing to Indic text (it collides conjuncts and matras). Apply the "Apple tight" tracking to Latin only.

**Scale** (px; line-height for Latin / Indic):

| Token | Size | Weight | LH Latin | LH Devanagari/Tamil | Use |
|---|---|---|---|---|---|
| hero-num | 48 | 700 | 1.1 | 1.3 | ₹ amount, "1930" |
| display | 32 | 600 | 1.2 | 1.45 | the screen's one question or headline |
| title | 24 | 600 | 1.3 | 1.55 | sub-section ("क्या हुआ") |
| body-lg | 20 | 400 | 1.5 | 1.75 | prompts and key sentences |
| body | 18 | 400 | 1.55 | 1.8 | complaint text and facts |
| label | 16 | 500 | 1.4 | 1.6 | fact labels and links (**floor**) |

- **Floor:** nothing below 16px, ever. The "Aa" control steps everything by +2/+4/+6 px, and the layout reflows to stacks [S: NN/g, UX4G].
- **Tamil:** words are long and stacks are tall. Budget about 30% more horizontal space than Hindi [I, unverified ratio]. Let headlines wrap to 3 lines and never truncate with "…". Test every string at 200% scale.
- **Measure:** document text at 30–38 characters a line on phones, which at this size happens naturally.

### 5.3 Colour (contrast computed with the WCAG formula)

| Token | Hex | Role | Contrast |
|---|---|---|---|
| paper | `#FAF7F2` | default canvas (warm, not clinical white) | — |
| ink | `#1C1B18` | headings and key facts | 16.1:1 on paper (AAA) |
| body | `#45423C` | body text | 9.4:1 (AAA) |
| muted | `#6B665D` | labels and hints (16px or larger) | 5.3:1 (AA) |
| **teal** (action) | `#0E5C63` | the *only* interactive colour: primary button fill, links | 7.2:1 on paper; white on teal 7.7:1 (AAA) |
| night | `#13233A` | listening band (calm deep blue) | text `#F4EFE6` at 13.8:1; muted `#A9B7C9` at 7.8:1 |
| mint | `#8FD6C6` | listening glow and live-transcript highlight on night | 9.5:1 on night |
| sand | `#EFE8DC` | complaint-document band | ink 14.1:1, body 8.2:1 |
| success | `#1E6B43` / field `#E3EFE6` | success tick, "ready" status | 6.1:1 on paper; white on success 6.5:1; ink on field 14.6:1 |
| amber | text `#7A4B00` on field `#FBEFD5` | time-sensitive ("2 घंटे में कॉल करें") | 6.5:1 |
| stop | `#A1271B` | only for "रुकिए, किसी को पैसे/OTP न दें" and hard errors | 7.0:1 on paper |
| hairline | `#D9D2C5` | decorative row rules only | 1.4:1 (decorative, not a boundary that has to be seen) |

**Rationale:** deep blue and teal read as "bank / government / safe" in Indian fintech (GPay and Paytm blues) without being alarming. Warm paper is humane. Urgency is shown as *time in amber*, not red.

**High-contrast theme toggle:** ink `#000` on `#FFF`, teal `#004D52`, hairlines `#000` (Samsung-style) [S-inspired].

### 5.4 Presenting a list of facts without boxes (the "यह सही है?" screen)
- **Hero facts first:** the ₹ amount (hero-num 48) and the date and time (title 24) sit at the top on paper, with no container.
- **Then a GOV.UK-style summary list.** Each row has:
  - a **label** (16px, muted) on line 1;
  - a **value** (20px, ink, weight 500) on line 2;
  - a right-aligned text link **"बदलें"** with a mic icon (48×48 hit area);
  - 20px vertical padding, with a 1px `#D9D2C5` hairline *between* rows only (none at the top or bottom).
- **Missing required fact** (for example the UTR): the row shows value "अभी नहीं पता" in amber text with an amber dot. The primary button becomes "UTR बताइए" and opens a one-question page (a big question, big mic, "स्क्रीनशॉट से पढ़ें", and "बाद में" as a link).
- **Order:** follow the NCRP mandatory fields (date and time, bank or wallet, UTR, amount), then the optional suspect fields under a "और जानकारी (ज़रूरी नहीं)" title, which is just a 24px heading with no box.
- **Icons:** one 24px line icon to the left of each value (₹, calendar, bank, phone), always paired with the word.

### 5.5 Presenting the long copyable complaint without a textarea feel
- **Band:** the document sits on a **full-bleed sand band** that starts after a 64px gap, with **no border and no shadow**. The band edge marks "this is the document", like paper laid on a table.
- **Header:** inside the band, "सेवा में, साइबर क्राइम सेल" in serif title 24, then paragraphs in serif body 18 at line-height 1.8, with 16px paragraph gaps. Key facts (₹, UTR, date) are bolded inline so a 1930 operator can scan them.
- **Read-aloud:** a "सुनिए" control at the band's top right. While it plays, the current paragraph is ink and the others drop to `#45423C` at about 60% opacity (iA Writer / Apple Music lyrics style). Respect reduced motion.
- **Editing:** no caret or textarea by default. "कुछ बदलना है? बोलिए" is a text link. Tapping a paragraph opens a bottom sheet with "इसे फिर से बोलें" or "टाइप करें". Typing is the fallback, never the default (Medhi: avoid non-numeric text input [S]).
- **Copy:** the sticky primary button is **"पूरी शिकायत कॉपी करें"**.
  - On tap, the label morphs in place into "कॉपी हो गई ✓", the button fill turns success-green for 2 seconds, and the phone gives a 30ms haptic and a soft tick sound.
  - No toast that disappears before an elder reads it.
- **Second action:** "WhatsApp पर भेजें" (to a helper), as a text link.
- **Portal readiness:** a small success-coloured line under the band reads "✓ पोर्टल के लिए तैयार (200+ अक्षर)". It confirms the NCRP minimum without exposing the rule.

### 5.6 The success moment
1. **Transition:** a 300ms cross-fade from paper to a **success field `#E3EFE6`**, full-bleed.
2. **Tick:** a 96px circle in `#1E6B43` with a white tick that **draws its stroke** over about 500ms (ease-out). The phone gives a 30ms haptic and a single soft two-note chime (in UPI's tick-plus-tone grammar).
3. **Words:** one display line, "आपकी शिकायत तैयार है", and one body line, "आपने सही समय पर सही कदम उठाया।". Both are spoken aloud. The second line validates the user without celebrating.
4. **Next step:** directly below, an **amber time line**, "अगले 2 घंटे सबसे ज़रूरी हैं", then a **giant "1930"** (hero-num) and the primary button **"1930 पर कॉल करें"** as a `tel:` link.
5. **After that:** the Wise/Flighty timeline of what comes next, with no box, and "cybercrime.gov.in खोलें" as the secondary link.
6. **Never:** confetti, trophies, mascots, "Congratulations!", or share-your-achievement prompts (Robinhood lesson [S]).
7. **Reference number:** if the user later adds an NCRP acknowledgement number, show it GOV.UK confirmation-panel style, big and copyable.

### 5.7 Motion principles
- **Purpose only:** motion explains a change of state (page turn, saved, done) or calms the user (listening). It is never decoration.
- **Page transitions:** a 240ms horizontal slide plus fade (forward goes right to left, back goes left to right). This gives a physical "turning the page" model for the linear flow.
- **Listening state:** a slow 4s breathing glow (scale 1.0 to 1.08, opacity 0.6 to 1) on night, with the live transcript appearing word by word in mint. No jittery waveform bars.
- **Progress:** named stages instead of spinners (the Swiggy tracker idea): "सुन लिया ✓ → समझ रहे हैं… → शिकायत लिख रहे हैं…". Each stage fades in.
- **Performance:** on cheap Android, animate only `transform` and `opacity`. Use no `backdrop-filter` blur, no parallax, no Lottie with more than 50 layers, and nothing over 300ms except the breathing loop and the tick draw.
- **Reduced motion:** honour `prefers-reduced-motion` by replacing motion with instant state changes plus haptic.
- **No timeouts:** never auto-advance or time out. Elders read slowly.

### 5.8 Iconography and imagery
- Line icons at 24px with a 2px stroke, always next to a word. Never icon-only, except the universal ← back arrow, which also carries the word "पीछे".
- No stock photos of hackers, hoodies, padlocks or red warning triangles. They are fear imagery.
- One optional warm illustration on the language and welcome screen: hands holding a phone, in an Indian context (Google NBU: respect the "local semiotic landscape" [S]).

### 5.9 Explicit anti-pattern list (do NOT ship)
1. Bordered cards around content blocks, and nested panels.
2. Boxed `<textarea>` / `<input>` as the primary way to give information.
3. More than one filled button per screen. Icon-only buttons.
4. Text under 16px. Thin (300 or lighter) Indic weights. Negative tracking on Indic. `line-height: 1` on Indic.
5. Red as the ambient colour of the app. Siren or alert imagery. Fear copy ("आपका पैसा खतरे में है!").
6. Confetti, mascots, badges, streaks, "Congratulations".
7. Dashboards, tabs, hamburger menus, accordions, carousels, and multi-level menus (Medhi [S]).
8. Long-press-only, swipe-only or double-tap-only gestures. Time-limited screens. Auto-advance.
9. Toasts that vanish. Confirmations must stay in place.
10. Moving the primary button's position between screens (PhonePe backlash [S]).
11. Interstitials, ratings prompts or "update available" mid-flow (Monzo [S]).
12. English-only jargon such as "UTR", "NCRP" or "acknowledgement" without a plain-language gloss ("UTR = पैसे भेजने का नंबर, SMS में होता है").
13. Heavy web fonts (more than 150KB), blur effects, video backgrounds. They hurt on 1–2GB phones and cost data (Google NBU [S]).
14. Placeholder text as the only label. Grey-on-grey text below 4.5:1.

---

## 6. Sources

**India and NBU**
- Increment, "Case study: Mobile payments in India" (Tez): https://increment.com/frontend/case-study-mobile-payments-in-india/
- Google Design, "Connectivity, culture and credit": https://design.google/library/connectivity-culture-and-credit
- PhonePe Design, "Move fast, don't break trust": https://design.phonepe.com/stories/behind-phonepe-redesign · backlash: https://japm.substack.com/p/phonepe-fixed-what-wasnt-broken-and · scale: https://yourstory.com/2025/04/phonepe-reimagining-financial-empowerment
- UPI sound (weak, commercial): https://www.billcut.com/blogs/building-financial-trust-through-sound-design · SoundPod: https://blog.google/intl/en-in/products/explore-communicate/continuing-our-investments-to-accelerate-payments-with-soundpod/
- Meesho: https://meesho.io/tech · https://www.meesho.io/blog/how-we-reduced-drop-off-on-our-homepage-and-helped-first-time-users-explore-the-app-better · https://meesho.io/blog/meesho-adds-8-new-vernacular-languages-to-its-platform
- OkCredit / Khatabook: https://yourstory.com/smbstory/free-business-accounting-app-india-okcredit-msme · https://kr-asia.com/indian-mom-and-pop-stores-use-okcredit-to-digitize-sales-records-startup-stories · https://india.entrepreneur.com/finance/these-fintech-apps-are-digitizing-the-book-keeping-for/342364
- UX4G typography (Govt of India): https://www.ux4g.gov.in/foundations/typography
- Elders and UPI: https://jyx.jyu.fi/bitstream/handle/123456789/95943/1/URN%3ANBN%3Afi%3Ajyu-202406174709.pdf · https://www.microsave.net/2022/09/06/how-can-financial-institutions-provide-handholding-support-for-the-elderly/ · https://theprint.in/opinion/from-aadhaar-to-upi-how-indias-digital-rails-can-include-not-exclude-older-adults/3053392/
- Medhi et al., ToCHI 2011 (full text read): https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ToCHI2711_Medhi.pdf · Text-free UI: https://www.microsoft.com/en-us/research/?p=160568
- NCRP and 1930 facts: `research/facts.md` (this repo)

**Elder and simple mode**
- Apple Assistive Access: https://support.apple.com/en-mz/guide/assistive-access-iphone/welcome/ios · https://apple.com/accessibility/cognitive
- Samsung Easy Mode: https://www.samsung.com/ae/support/mobile-devices/using-easy-mode-on-my-samsung-phone · https://www.tomsguide.com/phones/samsung-phones/your-samsung-galaxy-phone-comes-with-a-hidden-easy-mode-heres-how-to-find-it
- GrandPad: https://www.laptopmag.com/reviews/grandpad · https://futurism.com/review-grandpad-tablet-for-seniors · https://reviewed.com/accessibility/content/grandpad-review-price-tablet-for-seniors-accessible
- Jitterbug Smart4: https://www.safewise.com/jitterbug-phone-review · https://seniorliving.org/cell-phone/jitterbug/smart
- NN/g on older adults: https://www.nngroup.com/articles/usability-seniors-improvements/

**Standards and craft**
- GOV.UK: https://www.gov.uk/service-manual/design/form-structure · https://designnotes.blog.gov.uk/2015/07/03/one-thing-per-page/ · https://design-system.service.gov.uk/patterns/question-pages · https://userresearch.blog.gov.uk/2015/08/13/no-more-accordions-how-to-choose-a-form-structure/
- WCAG 2.2 target size: https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced · https://w3.org/WAI/standards-guidelines/wcag/new-in-22/
- Indic typography: https://fonts.google.com/knowledge/using_type/language_support_in_fonts · https://m2.material.io/design/typography/language-support.html · https://bugzilla.mozilla.org/show_bug.cgi?id=1035471 · https://www.w3.org/TR/deva-lreq/
- Material 3 Expressive research: https://design.google/library/expressive-material-design-google-research
- Monzo home screen: https://www.monzo.com/blog/how-we-built-the-new-home-screen
- Robinhood confetti: https://www.cnbc.com/2021/03/31/robinhood-gets-rid-of-confetti-feature-amid-scrutiny-over-gamification.html
- Duolingo motion and Rive: https://rive.app/blog/creative-technologists-duolingo-s-solution-to-the-designer-to-developer-handoff · https://blog.duolingo.com/world-character-visemes
- Apple Design Awards 2025: https://www.apple.com/newsroom/2025/06/apple-unveils-winners-and-finalists-of-the-2025-apple-design-awards/
- Local brand packs [D]: apple, airbnb, claude, wise, revolut, uber, spotify, linear.app at `C:\Users\shubh\Projects\awesome-design-md\design-md\`

**Open verification items:**
- Tamil string expansion ratio (I couldn't find a source).
- GPay's exact success animation and sound spec.
- The NPCI "89% link success to sound" claim, which is cited only by a commercial blog and is **unverified**.
- NN/g's own numeric target-size and font guidance (the 2019 report, which I did not read).
