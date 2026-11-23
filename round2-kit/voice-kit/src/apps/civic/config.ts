// civic: file a city grievance (pothole, garbage, streetlight, water, drainage) by voice
// in Kannada, English or Hindi; leave with a formatted complaint for the city corporation
// grievance desk / helpline. No photo needed to register.
import { defineDomain, type Entry, type OutputCtx } from '../../domain/types';
import { portalDate, portalTime } from '../../lib/format';
import { inEnglish } from '../../lib/translit';

const ISSUES: [string, string, string, string, string, string[]][] = [
  // value, en label, kn label, hi label, department, keywords
  ['pothole', 'Pothole / damaged road', 'ರಸ್ತೆ ಗುಂಡಿ', 'सड़क में गड्ढा', 'Roads and Infrastructure', ['गड़ा', 'गडा', 'गड्डा', 'pothole', 'potholes', 'gaddha', 'gadda', 'khadda', 'broken road', 'road damage', 'road kharab', 'गड्ढा', 'गड्ढे', 'टूटी सड़क', 'ಗುಂಡಿ', 'ರಸ್ತೆ ಹಾಳಾಗಿದೆ', 'குழி', 'சாலை சேதம்', 'গর্ত']],
  ['garbage', 'Garbage not cleared', 'ಕಸ ತೆಗೆದಿಲ್ಲ', 'कूड़ा नहीं उठा', 'Solid Waste Management', ['garbage', 'trash', 'waste', 'kachra', 'kachda', 'kooda', 'kuda', 'dump', 'कचरा', 'कूड़ा', 'कूडा', 'ಕಸ', 'ಕಸದ', 'குப்பை', 'আবর্জনা', 'ময়লা']],
  ['streetlight', 'Streetlight not working', 'ಬೀದಿ ದೀಪ ಕೆಟ್ಟಿದೆ', 'स्ट्रीट लाइट खराब', 'Electrical (Streetlights)', ['వీధి దీపం', 'వీధి లైట్', 'స్ట్రీట్ లైట్', 'streetlight', 'street light', 'street lights', 'light not working', 'batti', 'khamba', 'स्ट्रीट लाइट', 'बत्ती', 'ಬೀದಿ ದೀಪ', 'ದೀಪ', 'ಲೈಟ್', 'தெரு விளக்கு', 'விளக்கு', 'রাস্তার আলো']],
  ['water', 'No water / water leak', 'ನೀರಿನ ಸಮಸ್ಯೆ', 'पानी की समस्या', 'Water Supply', ['water supply', 'no water', 'water leak', 'pipe leak', 'pipeline', 'paani', 'pani', 'nal', 'पानी', 'नल', 'पाइप', 'ನೀರು', 'ನೀರಿನ', 'ಪೈಪ್', 'தண்ணீர்', 'குடிநீர்', 'জল', 'পানি']],
  ['drainage', 'Blocked drain / sewage', 'ಚರಂಡಿ ಕಟ್ಟಿದೆ', 'नाली जाम', 'Storm Water Drains / Sewerage', ['drain', 'drainage', 'sewage', 'sewer', 'gutter', 'naali', 'nali', 'नाली', 'गटर', 'सीवर', 'ಚರಂಡಿ', 'ಒಳಚರಂಡಿ', 'சாக்கடை', 'கால்வாய்', 'নর্দমা']],
];

const LOCATION_MARKERS = [
  { words: ['near', 'opposite', 'in front of', 'behind', 'next to', 'beside', 'close to'], take: 'after' as const, keep: true, max: 5 },
  { words: ['in'], take: 'after' as const, keep: false, max: 3 }, // "no water for 4 days in Gandhi Nagar"
  { words: ['ke paas', 'ke pass', 'ke saamne', 'ke samne', 'ke peeche', 'ke bagal', 'के पास', 'के सामने', 'के पीछे', 'के बगल', 'वाली गली', 'wali gali'], take: 'before' as const, keep: true, max: 6 },
  { words: ['ಹತ್ತಿರ', 'ಎದುರು', 'ಬಳಿ', 'ಪಕ್ಕ', 'ಹಿಂದೆ', 'அருகில்', 'எதிரில்', 'பக்கத்தில்', 'பக்கத்துல', 'কাছে', 'সামনে', 'దగ్గర', 'పక్కన', 'ఎదురుగా', 'जवळ', 'समोर'], take: 'before' as const, keep: true, max: 4 },
];

function description(e: Entry, ctx: OutputCtx): string {
  const issue = e.fields.issue ? ISSUES.find((i) => i[0] === e.fields.issue!.value)?.[1].toLowerCase() : 'a civic problem';
  const where = ctx.english('location');
  const ward = ctx.english('ward');
  const since = ctx.english('since');
  return [
    `I wish to report ${issue}${where ? ` ${/^(near|opposite|in front|behind|next|beside|close)/i.test(where) ? '' : 'at '}${where}` : ''}${ward ? `, ${ward}` : ''}.`,
    since ? `The problem has been there for about ${since}.` : '',
    'It is causing difficulty to residents and passers-by. Please register this complaint and send the concerned team to fix it.',
  ]
    .filter(Boolean)
    .join(' ');
}

export default defineDomain({
  id: 'civic',
  name: { 'en-IN': 'Nagarika', 'kn-IN': 'ನಾಗರಿಕ', 'hi-IN': 'नागरिक' },
  tagline: { 'en-IN': 'Report a civic problem by voice.', 'kn-IN': 'ನಗರದ ಸಮಸ್ಯೆಯನ್ನು ಮಾತಿನಲ್ಲೇ ದೂರು ನೀಡಿ.', 'hi-IN': 'शहर की समस्या, बोलकर शिकायत।' },
  theme: {}, // Wispr Flow default theme (src/lib/theme.ts)
  languages: ['kn-IN', 'en-IN', 'hi-IN'],
  slots: [
    {
      key: 'issue', type: 'enum', required: true,
      options: [
        ...ISSUES.map(([value, en, kn, hi, , keywords]) => ({ value, keywords, label: { 'en-IN': en, 'kn-IN': kn, 'hi-IN': hi } })),
        { value: 'other', hintOnly: true, keywords: ['other', 'something else', 'kuch aur', 'ಬೇರೆ', 'ಇತರೆ', 'अन्य', 'कुछ और'], label: { 'en-IN': 'Something else', 'kn-IN': 'ಬೇರೆ ಸಮಸ್ಯೆ', 'hi-IN': 'कुछ और' } },
      ],
      label: { 'en-IN': 'Problem', 'kn-IN': 'ಸಮಸ್ಯೆ', 'hi-IN': 'समस्या' },
      q: { 'en-IN': 'What is the problem?', 'kn-IN': 'ಏನು ಸಮಸ್ಯೆ?', 'hi-IN': 'क्या समस्या है?' },
      rq: { 'en-IN': 'Pothole, garbage, light, water or drain? You can choose below.', 'kn-IN': 'ಗುಂಡಿ, ಕಸ, ದೀಪ, ನೀರು ಅಥವಾ ಚರಂಡಿ? ಕೆಳಗೆ ಆರಿಸಬಹುದು.', 'hi-IN': 'गड्ढा, कूड़ा, बत्ती, पानी या नाली? नीचे चुन सकते हैं।' },
      ex: { 'en-IN': '"a big pothole on our road"', 'kn-IN': '"ನಮ್ಮ ರಸ್ತೆಯಲ್ಲಿ ದೊಡ್ಡ ಗುಂಡಿ"', 'hi-IN': '"गली में कूड़ा पड़ा है"' },
      aliases: ['problem', 'issue', 'samasya', 'ಸಮಸ್ಯೆ', 'समस्या'],
    },
    {
      key: 'location', type: 'text', required: true, markers: LOCATION_MARKERS,
      label: { 'en-IN': 'Where (landmark)', 'kn-IN': 'ಎಲ್ಲಿ (ಗುರುತು)', 'hi-IN': 'कहाँ (पहचान की जगह)' },
      q: { 'en-IN': 'Where exactly? Name a landmark nearby.', 'kn-IN': 'ಸರಿಯಾಗಿ ಎಲ್ಲಿ? ಹತ್ತಿರದ ಒಂದು ಗುರುತು ಹೇಳಿ.', 'hi-IN': 'ठीक कहाँ? पास की कोई पहचान की जगह बताइए।' },
      rq: { 'en-IN': 'Near which shop, temple or bus stop?', 'kn-IN': 'ಯಾವ ಅಂಗಡಿ, ದೇವಸ್ಥಾನ ಅಥವಾ ಬಸ್ ನಿಲ್ದಾಣದ ಹತ್ತಿರ?', 'hi-IN': 'किस दुकान, मंदिर या बस स्टॉप के पास?' },
      ex: { 'en-IN': '"near Shiv temple, 5th Cross"', 'kn-IN': '"ಶಿವ ದೇವಸ್ಥಾನದ ಹತ್ತಿರ"', 'hi-IN': '"हनुमान मंदिर के सामने"' },
      aliases: ['location', 'place', 'jagah', 'address', 'ಜಾಗ', 'ವಿಳಾಸ', 'जगह', 'पता'],
    },
    {
      key: 'ward', type: 'text', required: true, markers: [{ words: ['ward', 'wad', 'watt', 'वाड', 'वार्ड', 'वॉर्ड', 'ವಾರ್ಡ್', 'வார்டு', 'ওয়ার্ড', 'వార్డు', 'వార్డ్'], take: 'clause' }],
      label: { 'en-IN': 'Ward / area', 'kn-IN': 'ವಾರ್ಡ್ / ಪ್ರದೇಶ', 'hi-IN': 'वार्ड / इलाक़ा' },
      q: { 'en-IN': 'Which area or ward is it in?', 'kn-IN': 'ಯಾವ ಪ್ರದೇಶ ಅಥವಾ ವಾರ್ಡ್?', 'hi-IN': 'कौन सा इलाक़ा या वार्ड?' },
      rq: { 'en-IN': 'The area name?', 'kn-IN': 'ಪ್ರದೇಶದ ಹೆಸರು?', 'hi-IN': 'इलाक़े का नाम?' },
      ex: { 'en-IN': '"Jayanagar, ward 167"', 'kn-IN': '"ಜಯನಗರ ವಾರ್ಡ್ 167"', 'hi-IN': '"इंदिरानगर वार्ड 80"' },
      aliases: ['ward', 'area', 'ilaka', 'ವಾರ್ಡ್', 'ಪ್ರದೇಶ', 'वार्ड', 'इलाका'],
    },
    {
      key: 'since', type: 'duration', ask: true, keypad: true,
      label: { 'en-IN': 'Since', 'kn-IN': 'ಎಷ್ಟು ದಿನದಿಂದ', 'hi-IN': 'कब से' },
      q: { 'en-IN': 'Since how long has it been like this?', 'kn-IN': 'ಎಷ್ಟು ದಿನದಿಂದ ಹೀಗಿದೆ?', 'hi-IN': 'कितने दिन से ऐसा है?' },
      rq: { 'en-IN': 'How many days?', 'kn-IN': 'ಎಷ್ಟು ದಿನ?', 'hi-IN': 'कितने दिन?' },
      ex: { 'en-IN': '"two weeks"', 'kn-IN': '"ಎರಡು ವಾರದಿಂದ"', 'hi-IN': '"एक हफ़्ते से"' },
    },
    {
      key: 'phone', type: 'phone', required: true, confirm: 'explicit', keypad: true,
      context: ['my', 'mera', 'mere', 'meri', 'number', 'mobile', 'phone', 'नंबर', 'मोबाइल', 'ನನ್ನ', 'ನಂಬರ್', 'ಮೊಬೈಲ್', 'என்', 'நம்பர்'],
      label: { 'en-IN': 'Your mobile number', 'kn-IN': 'ನಿಮ್ಮ ಮೊಬೈಲ್ ನಂಬರ್', 'hi-IN': 'आपका मोबाइल नंबर' },
      q: { 'en-IN': 'Your mobile number, for updates?', 'kn-IN': 'ಮಾಹಿತಿಗಾಗಿ ನಿಮ್ಮ ಮೊಬೈಲ್ ನಂಬರ್?', 'hi-IN': 'जानकारी के लिए आपका मोबाइल नंबर?' },
      rq: { 'en-IN': 'The 10-digit number?', 'kn-IN': '10 ಅಂಕಿಯ ನಂಬರ್?', 'hi-IN': '10 अंकों का नंबर?' },
      ex: { 'en-IN': '"98450 12345"', 'kn-IN': '"98450 12345"', 'hi-IN': '"98450 12345"' },
      aliases: ['number', 'mobile', 'phone', 'ನಂಬರ್', 'नंबर'],
    },
  ],
  copy: {
    greeting: { 'en-IN': 'Namaskara. I am Nagarika, an app.', 'kn-IN': 'ನಮಸ್ಕಾರ. ನಾನು ನಾಗರಿಕ, ಒಂದು ಆ್ಯಪ್.', 'hi-IN': 'नमस्ते। मैं नागरिक हूँ, एक ऐप।' },
    openQ: { 'en-IN': 'What is the problem, and where is it?', 'kn-IN': 'ಏನು ಸಮಸ್ಯೆ, ಎಲ್ಲಿ?', 'hi-IN': 'क्या समस्या है, और कहाँ?' },
    openEx: { 'en-IN': 'For example: "A big pothole near Shiv temple, Jayanagar ward 167, for two weeks."', 'kn-IN': 'ಉದಾಹರಣೆಗೆ: "ಶಿವ ದೇವಸ್ಥಾನದ ಹತ್ತಿರ ದೊಡ್ಡ ಗುಂಡಿ, ಜಯನಗರ ವಾರ್ಡ್ 167, ಎರಡು ವಾರದಿಂದ."', 'hi-IN': 'जैसे: "हनुमान मंदिर के सामने कूड़ा पड़ा है, इंदिरानगर वार्ड 80, एक हफ़्ते से।"' },
    letterTitle: { 'en-IN': 'Your complaint, as I write it', 'kn-IN': 'ನಿಮ್ಮ ದೂರು, ನಾನು ಬರೆಯುತ್ತಿರುವಂತೆ', 'hi-IN': 'आपकी शिकायत, जैसा मैं लिख रहा हूँ' },
  },
  letter: [
    { text: { 'en-IN': 'The problem: {issue}.', 'kn-IN': 'ಸಮಸ್ಯೆ: {issue}.', 'hi-IN': 'समस्या: {issue}।' } },
    { text: { 'en-IN': 'It is {location}, in {ward}.', 'kn-IN': 'ಜಾಗ: {location}, {ward}.', 'hi-IN': 'जगह: {location}, {ward}।' } },
    { text: { 'en-IN': 'It has been like this for {since}.', 'kn-IN': 'ಹೀಗಾಗಿ {since} ಆಯಿತು.', 'hi-IN': '{since} से ऐसा है।' } },
    { text: { 'en-IN': 'My number for updates is {phone}.', 'kn-IN': 'ಮಾಹಿತಿಗಾಗಿ ನನ್ನ ನಂಬರ್ {phone}.', 'hi-IN': 'जानकारी के लिए मेरा नंबर {phone}।' } },
  ],
  check: { hero: 'issue', main: ['location', 'ward', 'since', 'phone'] },
  done: {
    title: { 'en-IN': 'Your complaint is ready', 'kn-IN': 'ನಿಮ್ಮ ದೂರು ಸಿದ್ಧ', 'hi-IN': 'आपकी शिकायत तैयार है' },
    sub: { 'en-IN': 'No photo needed. Call the helpline and read it out, or share it.', 'kn-IN': 'ಫೋಟೋ ಬೇಕಿಲ್ಲ. ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ ಓದಿ ಹೇಳಿ, ಅಥವಾ ಹಂಚಿಕೊಳ್ಳಿ.', 'hi-IN': 'फ़ोटो की ज़रूरत नहीं। हेल्पलाइन पर कॉल करके पढ़ दीजिए, या शेयर कीजिए।' },
    big: { text: '1533', href: 'tel:1533' },
    scriptTitle: { 'en-IN': 'On the call, say this', 'kn-IN': 'ಕರೆಯಲ್ಲಿ ಹೀಗೆ ಹೇಳಿ', 'hi-IN': 'कॉल पर यह बोलिए' },
    script: (_e, ctx) => [
      ctx.t({ 'en-IN': 'I want to register a complaint: {v}.', 'kn-IN': 'ನಾನು ದೂರು ನೀಡಬೇಕು: {v}.', 'hi-IN': 'मुझे शिकायत दर्ज करनी है: {v}।' }, { v: ctx.show('issue') ?? ctx.ui('unknown') }),
      ctx.t({ 'en-IN': 'Place: {l}, {w}.', 'kn-IN': 'ಜಾಗ: {l}, {w}.', 'hi-IN': 'जगह: {l}, {w}।' }, { l: ctx.show('location') ?? ctx.ui('unknown'), w: ctx.show('ward') ?? '' }),
      ctx.t({ 'en-IN': 'My number is {p}. Please send me the complaint number.', 'kn-IN': 'ನನ್ನ ನಂಬರ್ {p}. ದಯವಿಟ್ಟು ದೂರು ಸಂಖ್ಯೆ ಕಳಿಸಿ.', 'hi-IN': 'मेरा नंबर {p} है। कृपया शिकायत नंबर भेजिए।' }, { p: (ctx.aloud ? ctx.spoken('phone') : ctx.show('phone')) ?? ctx.ui('unknown') }),
    ],
    nextTitle: { 'en-IN': 'What happens next', 'kn-IN': 'ಮುಂದೆ ಏನಾಗುತ್ತದೆ', 'hi-IN': 'आगे क्या होगा' },
    next: [
      { 'en-IN': 'Call 1533 and read the lines above.', 'kn-IN': '1533ಗೆ ಕರೆ ಮಾಡಿ ಮೇಲಿನ ಸಾಲುಗಳನ್ನು ಓದಿ.', 'hi-IN': '1533 पर कॉल करके ऊपर की लाइनें पढ़िए।' },
      { 'en-IN': 'Note the complaint number they give you.', 'kn-IN': 'ಅವರು ಕೊಡುವ ದೂರು ಸಂಖ್ಯೆ ಬರೆದುಕೊಳ್ಳಿ.', 'hi-IN': 'वे जो शिकायत नंबर दें, लिख लीजिए।' },
      { 'en-IN': 'If nothing happens in 7 days, share the written complaint with your ward office.', 'kn-IN': '7 ದಿನದಲ್ಲಿ ಏನೂ ಆಗದಿದ್ದರೆ, ಬರೆದ ದೂರನ್ನು ವಾರ್ಡ್ ಕಚೇರಿಗೆ ಕಳಿಸಿ.', 'hi-IN': '7 दिन में कुछ न हो तो लिखी शिकायत वार्ड दफ़्तर को भेजिए।' },
    ],
    primary: { label: { 'en-IN': 'Call 1533 now', 'kn-IN': 'ಈಗ 1533ಗೆ ಕರೆ ಮಾಡಿ', 'hi-IN': 'अभी 1533 पर कॉल करें' }, kind: 'tel', href: 'tel:1533', icon: 'phone' },
    seeWritten: { 'en-IN': 'See the written complaint', 'kn-IN': 'ಬರೆದ ದೂರು ನೋಡಿ', 'hi-IN': 'लिखी हुई शिकायत देखें' },
  },
  document: {
    title: { 'en-IN': 'Your written complaint', 'kn-IN': 'ನಿಮ್ಮ ಬರೆದ ದೂರು', 'hi-IN': 'आपकी लिखी हुई शिकायत' },
    sub: { 'en-IN': 'In English, in the order grievance portals ask. Copy and paste it.', 'kn-IN': 'ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ, ದೂರು ಪೋರ್ಟಲ್ ಕೇಳುವ ಕ್ರಮದಲ್ಲಿ. ಕಾಪಿ ಮಾಡಿ ಹಾಕಿ.', 'hi-IN': 'अंग्रेज़ी में, उसी क्रम में जैसे शिकायत पोर्टल पूछते हैं। कॉपी करके चिपकाइए।' },
    build: (e, ctx) => {
      const issue = e.fields.issue ? ISSUES.find((i) => i[0] === e.fields.issue!.value) : undefined;
      const when = `${portalDate(ctx.now.toISOString())} ${portalTime(ctx.now.toISOString())}`;
      return [
        'CIVIC GRIEVANCE - CITY CORPORATION',
        `(Filed by voice · ${when} · helpline 1533)`,
        '',
        '1. COMPLAINT',
        `Department: ${issue?.[4] ?? 'To be assigned'}`,
        `Category: ${issue?.[1] ?? (e.fields.issue ? 'Other' : 'Not known')}`,
        '',
        '2. LOCATION',
        `Landmark: ${ctx.english('location') ?? 'Not known'}`,
        `Ward / area: ${ctx.english('ward') ?? 'Not known'}`,
        '',
        '3. DETAILS',
        `Problem since: ${ctx.english('since') ? `about ${ctx.english('since')}` : 'Not known'}`,
        'Photo: Not attached (not needed to register)',
        '',
        '4. COMPLAINANT',
        `Mobile number: ${ctx.show('phone') ?? 'Not given'}`,
        '',
        '5. DESCRIPTION',
        description(e, ctx),
        ...(e.turns.length ? ['', "6. CITIZEN'S OWN WORDS (VOICE TRANSCRIPT)", ...e.turns.map((x) => `"${inEnglish(x)}"`)] : []),
        ...(e.ack ? ['', `Complaint no.: ${e.ack}`] : []),
      ].join('\n');
    },
    badge: (_e, ctx) => ctx.t({ 'en-IN': 'Ready to register', 'kn-IN': 'ದಾಖಲಿಸಲು ಸಿದ್ಧ', 'hi-IN': 'दर्ज करने के लिए तैयार' }),
    copyAllLabel: { 'en-IN': 'Copy the whole complaint', 'kn-IN': 'ಪೂರ್ತಿ ದೂರು ಕಾಪಿ ಮಾಡಿ', 'hi-IN': 'पूरी शिकायत कॉपी करें' },
    actions: [
      { kind: 'copy', label: { 'en-IN': 'Copy description only', 'kn-IN': 'ವಿವರಣೆ ಮಾತ್ರ ಕಾಪಿ', 'hi-IN': 'सिर्फ़ विवरण कॉपी करें' }, text: description, icon: 'copy' },
      { kind: 'whatsapp', label: { 'en-IN': 'Share on WhatsApp', 'kn-IN': 'WhatsApp ನಲ್ಲಿ ಹಂಚಿ', 'hi-IN': 'WhatsApp पर शेयर करें' }, text: (e, ctx) => description(e, ctx), icon: 'whatsapp' },
    ],
    ack: { label: { 'en-IN': 'Complaint number', 'kn-IN': 'ದೂರು ಸಂಖ್ಯೆ', 'hi-IN': 'शिकायत नंबर' }, placeholder: { 'en-IN': 'From the helpline or portal', 'kn-IN': 'ಸಹಾಯವಾಣಿ ಅಥವಾ ಪೋರ್ಟಲ್‌ನಿಂದ', 'hi-IN': 'हेल्पलाइन या पोर्टल से' } },
  },
  history: { title: (_e, ctx) => [ctx.show('issue'), ctx.show('ward')].filter(Boolean).join(' · ') || '—' },
  topCall: { label: '1533', href: 'tel:1533' },
  samples: {
    stories: {
      'kn-IN': 'ನಮ್ಮ ರಸ್ತೆಯಲ್ಲಿ ದೊಡ್ಡ ಗುಂಡಿ ಇದೆ, ಶಿವ ದೇವಸ್ಥಾನದ ಹತ್ತಿರ, ಜಯನಗರ ವಾರ್ಡ್ 167. ಎರಡು ವಾರದಿಂದ ಹೀಗೇ ಇದೆ.',
      'en-IN': 'There is a big pothole near Shiv temple, 5th Cross, Jayanagar ward 167. It has been like this for two weeks. My number is 98450 12345.',
      'hi-IN': 'Hamari gali mein bahut kachra pada hai, Hanuman mandir ke saamne, Indiranagar ward 80. Ek hafte se kisi ne nahi uthaya.',
    },
    answers: {
      issue: { 'kn-IN': 'ರಸ್ತೆ ಗುಂಡಿ', 'en-IN': 'pothole', 'hi-IN': 'kachra' },
      location: { 'kn-IN': 'ಶಿವ ದೇವಸ್ಥಾನದ ಹತ್ತಿರ', 'en-IN': 'near Shiv temple', 'hi-IN': 'Hanuman mandir ke saamne' },
      ward: { 'kn-IN': 'ಜಯನಗರ', 'en-IN': 'Jayanagar', 'hi-IN': 'Indiranagar' },
      since: { 'kn-IN': 'ಎರಡು ವಾರದಿಂದ', 'en-IN': 'two weeks', 'hi-IN': 'ek hafte se' },
      phone: { 'kn-IN': 'ನನ್ನ ನಂಬರ್ 98450 12345', 'en-IN': '98450 12345', 'hi-IN': 'mera number 98450 12345' },
    },
  },
  strings: {
    'en-IN': { skipLater: 'Skip, the helpline will ask', pastReports: 'Past complaints', newReport: 'New complaint', draftAgain: 'Continue your unfinished complaint', summaryIntro: 'Here is your complaint.', noReports: 'No complaints yet.' },
    'kn-IN': { skipLater: 'ಬಿಡಿ, ಸಹಾಯವಾಣಿ ಕೇಳುತ್ತದೆ', pastReports: 'ಹಳೆಯ ದೂರುಗಳು', newReport: 'ಹೊಸ ದೂರು', draftAgain: 'ಅರ್ಧ ಆಗಿರುವ ದೂರನ್ನು ಮುಂದುವರಿಸಿ', summaryIntro: 'ಇದೋ ನಿಮ್ಮ ದೂರು.', noReports: 'ಇನ್ನೂ ಯಾವುದೇ ದೂರು ಇಲ್ಲ.' },
    'hi-IN': { skipLater: 'छोड़िए, हेल्पलाइन वाले पूछ लेंगे', pastReports: 'पुरानी शिकायतें', newReport: 'नई शिकायत', draftAgain: 'अधूरी शिकायत पूरी करें', summaryIntro: 'यह रही आपकी शिकायत।', noReports: 'अभी कोई शिकायत नहीं।' },
  },
});
