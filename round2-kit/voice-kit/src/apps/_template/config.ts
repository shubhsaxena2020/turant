// TEMPLATE: copy me (npm run new-app -- <name>) and replace every TODO.
// One file = one app. Slots are the facts you need; the kit does the call, the
// letter, the read-back, the escalation, the check list and the document.
//
// Slot types: amount | datetime | duration | phone | digits | upi | enum | name |
// text | number | quantity+unit | yesno. See src/domain/types.ts for every option.
import { defineDomain } from '../../domain/types';

export default defineDomain({
  id: '__ID__',
  name: { 'en-IN': 'Saathi', 'hi-IN': 'साथी' }, // TODO: app name (top bar)
  tagline: { 'en-IN': 'Say it in your language. I write it down.', 'hi-IN': 'अपनी भाषा में बोलिए। मैं लिख लूँगा।' },
  theme: {}, // Wispr Flow default; override primary/accent/night only if the brief needs it (keep contrast >= 4.5:1)
  languages: ['hi-IN', 'en-IN'], // first one is the default; add 'ta-IN' / 'kn-IN' / 'bn-IN' copy below to add a language

  slots: [
    // TODO: the facts you need, in the order you want them asked. required -> asked first.
    {
      key: 'name', type: 'name', required: true,
      label: { 'en-IN': 'Name', 'hi-IN': 'नाम' },
      q: { 'en-IN': 'What is your name?', 'hi-IN': 'आपका नाम क्या है?' },
      rq: { 'en-IN': 'Your name?', 'hi-IN': 'नाम?' },
      ex: { 'en-IN': '"Meena"', 'hi-IN': '"मीना"' },
    },
    {
      key: 'need', type: 'enum', required: true,
      options: [
        // TODO: options with keywords in every script you support (Latin words match whole words, Indian scripts as substrings)
        { value: 'info', label: { 'en-IN': 'Information', 'hi-IN': 'जानकारी' }, keywords: ['information', 'jaankari', 'janna', 'जानकारी', 'जानना'] },
        { value: 'help', label: { 'en-IN': 'Help with a problem', 'hi-IN': 'किसी परेशानी में मदद' }, keywords: ['problem', 'help', 'pareshani', 'madad', 'परेशानी', 'मदद', 'समस्या'] },
        { value: 'other', label: { 'en-IN': 'Something else', 'hi-IN': 'कुछ और' }, keywords: ['other', 'kuch aur', 'कुछ और'], hintOnly: true },
      ],
      label: { 'en-IN': 'What you need', 'hi-IN': 'आपको क्या चाहिए' },
      q: { 'en-IN': 'What do you need?', 'hi-IN': 'आपको क्या चाहिए?' },
      rq: { 'en-IN': 'Information or help? You can choose below.', 'hi-IN': 'जानकारी या मदद? नीचे चुन सकते हैं।' },
      ex: { 'en-IN': '"help with a problem"', 'hi-IN': '"एक परेशानी में मदद"' },
    },
    {
      key: 'phone', type: 'phone', ask: true, confirm: 'explicit', keypad: true,
      label: { 'en-IN': 'Mobile number', 'hi-IN': 'मोबाइल नंबर' },
      q: { 'en-IN': 'Your mobile number?', 'hi-IN': 'आपका मोबाइल नंबर?' },
      rq: { 'en-IN': 'The 10-digit number?', 'hi-IN': '10 अंकों का नंबर?' },
      ex: { 'en-IN': '"98765 43210"', 'hi-IN': '"98765 43210"' },
    },
  ],

  copy: {
    greeting: { 'en-IN': 'Namaste. I am Saathi, an app.', 'hi-IN': 'नमस्ते। मैं साथी हूँ, एक ऐप।' },
    openQ: { 'en-IN': 'Tell me what you need, in your own words.', 'hi-IN': 'अपने शब्दों में बताइए, आपको क्या चाहिए।' },
    openEx: { 'en-IN': 'For example: "My name is Meena, I need help with a problem."', 'hi-IN': 'जैसे: "मेरा नाम मीना है, मुझे एक परेशानी में मदद चाहिए।"' },
    letterTitle: { 'en-IN': 'What I am writing down', 'hi-IN': 'मैं यह लिख रहा हूँ' },
  },

  // First-person sentences; {slot} becomes the fact, or a dotted gap while unknown.
  letter: [
    { text: { 'en-IN': 'My name is {name}.', 'hi-IN': 'मेरा नाम {name} है।' } },
    { text: { 'en-IN': 'I need: {need}.', 'hi-IN': 'मुझे चाहिए: {need}।' } },
    { text: { 'en-IN': 'My number is {phone}.', 'hi-IN': 'मेरा नंबर {phone} है।' } },
  ],

  check: { hero: 'name', main: ['need', 'phone'] },

  done: {
    title: { 'en-IN': 'It is written down', 'hi-IN': 'लिख लिया गया है' },
    sub: { 'en-IN': 'Share it, or read it out on the call.', 'hi-IN': 'शेयर कीजिए, या कॉल पर पढ़ दीजिए।' },
    script: (_e, ctx) => [ctx.t({ 'en-IN': 'My name is {n}. I need: {x}.', 'hi-IN': 'मेरा नाम {n} है। मुझे चाहिए: {x}।' }, { n: ctx.show('name') ?? '—', x: ctx.show('need') ?? '—' })],
    scriptTitle: { 'en-IN': 'Say this', 'hi-IN': 'यह बोलिए' },
    primary: { label: { 'en-IN': 'Share on WhatsApp', 'hi-IN': 'WhatsApp पर भेजें' }, kind: 'whatsapp', text: (_e, ctx) => `${ctx.english('name') ?? ''}: ${ctx.english('need') ?? ''}`, icon: 'whatsapp' },
    seeWritten: { 'en-IN': 'See it written', 'hi-IN': 'लिखा हुआ देखें' },
  },

  document: {
    title: { 'en-IN': 'Written request', 'hi-IN': 'लिखा हुआ अनुरोध' },
    sub: { 'en-IN': 'In English, ready to copy.', 'hi-IN': 'अंग्रेज़ी में, कॉपी के लिए तैयार।' },
    // Line 1 title, line 2 subtitle, "1. SECTION" headers, "Label: value" rows (typeset automatically).
    build: (e, ctx) =>
      [
        'REQUEST', // TODO
        '(Recorded by voice)',
        '',
        '1. DETAILS',
        `Name: ${ctx.english('name') ?? 'Not known'}`,
        `Need: ${ctx.english('need') ?? 'Not known'}`,
        `Mobile: ${ctx.show('phone') ?? 'Not given'}`,
        ...(e.turns.length ? ['', '2. OWN WORDS (VOICE TRANSCRIPT)', ...e.turns.map((x) => `"${x}"`)] : []),
      ].join('\n'),
  },

  samples: {
    // "No mic? See a sample": played through the same pipeline as real speech.
    stories: {
      'hi-IN': 'Mera naam Meena hai, mujhe ek pareshani mein madad chahiye',
      'en-IN': 'My name is Meena and I need help with a problem',
    },
    answers: { phone: '98765 43210', name: 'Meena', need: { 'hi-IN': 'madad chahiye', 'en-IN': 'help' } },
  },
});
