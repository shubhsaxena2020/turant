// fraud: Turant parity. Report a UPI / online payment fraud by voice, leave with a
// 1930 call script and a cybercrime.gov.in complaint. Copy is Turant's, verbatim.
import { findBank } from '../../lib/indic/bank';
import { defineDomain, type EnumOption, type Text } from '../../domain/types';
import type { LangCode } from '../../lib/lang';
import type { UIKey } from '../../i18n/ui';
import { FRAUD_STRINGS, T, ft } from './strings';
import { build1930Script, buildBankMessage, buildComplaintText, buildFamilyMessage, buildPortalDescription, needsPoliceVisit } from './outputs';
import { formatINR } from '../../lib/format';

const LANGS: LangCode[] = ['hi-IN', 'en-IN', 'bn-IN', 'ta-IN', 'te-IN', 'mr-IN', 'kn-IN'];

// Scam rules in matching priority order (sextortion beats "video call", KYC beats "bank").
const SCAM_RULES: [string, string[], number?][] = [
  ['sextortion', ['sextortion', 'nude', 'naked', 'video call record', 'blackmail', 'blackmailing', 'blackmailed', 'ब्लाकमेल', 'ಬ್ಲಾಕ್ ಮೇಲ್', 'ಬ್ಲಾಕ್‌ಮೇಲ್', 'viral kar', 'obscene', 'अश्लील', 'ब्लैकमेल', 'न्यूड', 'ব্ল্যাকমেইল', 'மிரட்டல்', 'బ్లాక్‌మెయిల్', 'బ్లాక్ మేల్', 'ब्लॅकमेल', 'ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್']],
  ['investment_task', ['investment', 'invest', 'trading', 'stock tip', 'crypto', 'bitcoin', 'task', 'tasks', 'part time job', 'part-time job', 'work from home', 'youtube like', 'like karne', 'rating task', 'telegram', 'paisa double', 'double ho', 'high return', 'निवेश', 'टास्क', 'ट्रेडिंग', 'टेलीग्राम', 'इन्वेस्ट', 'डबल हो', 'दुप्पट', 'गुंतवणु', 'বিনিয়োগ', 'ইনভেস্ট', 'ডাবল', 'টেলিগ্রাম', 'টাস্ক', 'முதலீடு', 'இன்வெஸ்ட்', 'டெலிகிராம்', 'டாஸ்க்', 'పెట్టుబడి', 'పిటుబడి', 'ఇన్వెస్ట్', 'టెలిగ్రామ్', 'టాస్క్', 'गुंतवणूक', 'ಹೂಡಿಕೆ', 'ಇನ್ವೆಸ್ಟ್', 'ಟೆಲಿಗ್ರಾಮ್', 'ಟಾಸ್ಕ್']],
  ['qr_scan', ['qr', 'qr code', 'scan', 'scanner', 'scanned', 'क्यूआर', 'स्कैन', 'স্ক্যান', 'কিউআর', 'ஸ்கேன்', 'స్కాన్', 'క్యువార', 'క్యూఆర్', 'स्कॅन', 'ಸ್ಕ್ಯಾನ್']],
  ['fake_customer_care', ['customer care', 'customer service', 'customer support', 'helpline number', 'care number', 'anydesk', 'any desk', 'anydisk', 'any disk', 'एनीडेस्क', 'एनी डेस्क', 'एनीडिस्क', 'teamviewer', 'screen share', 'quick support', 'कस्टमर केयर', 'कस्टमर केअर', 'कस्टमर केर', 'কাস্টমার কেয়ার', 'கஸ்டமர் கேர்', 'కస్టమర్ కేర్', 'ಕಸ್ಟಮರ್ ಕೇರ್']],
  ['fake_kyc', ['kyc', 'के वाईसी', 'के वाइसी', 'ಕೇವ ಆಯಸಿ', 'ಕೆವಾಯಸಿ', 'కెవాయసి', 'కేవాయసి', 'కేవ ఆయసి', 'केवाईसी', 'केवायसी', 'কেওয়াইসি', 'কেওয়াইসি', 'கேஒய்சி', 'கேவாயசி', 'கேவைசி', 'కేవైసీ', 'ಕೆವೈಸಿ', 'ಕೈಕ ಅಪ್', 'ಕೈಕ್ಕ', 'pan card update', 'pan update', 'aadhaar update', 'aadhar update', 'account block', 'account band', 'account will be blocked', 'khata band', 'bank se call', 'bank se phone', 'bank wala', 'bank manager', 'bank official', 'bank se bol', 'बैंक से कॉल', 'बैंक से फोन', 'खाता बंद', 'केवाई सी', 'केवाय सी', 'के yc', 'yc अपडेट', 'yc update', 'पैन कार्ड', 'पॅन कार्ड', 'pan card', 'अकाउंट ब्लॉक', 'बैंक वाले', 'প্যান কার্ড', 'பான் கார்டு', 'పాన్ కార్డ్', 'ಪ್ಯಾನ್ ಕಾರ್ಡ್']],
  ['wrong_transfer', ['galti se', 'galati se', 'by mistake', 'mistakenly', 'wrong transfer', 'wrongly sent', 'refund', 'paise wapas', 'paisa wapas', 'wapas bhej', 'return the money', 'गलती से', 'वापस भेज', 'रिफंड', 'ভুল করে', 'রিফান্ড', 'தவறுதலாக', 'தவர்தலா', 'పొరపాటున', 'चुकून', 'ತಪ್ಪಾಗಿ']],
  // OTP alone is a mechanism, not the story: lower confidence.
  ['otp_shared', ['otp', 'ओटीपी', 'ওটিপি', 'ஓடிபி', 'ஓட்டிப்', 'ஓட்டிபி', 'ఓటీపీ', 'ఓటి పీ', 'ಒಟಿಪಿ', 'code bataya', 'code bata diya', 'pin bataya', 'pin bata diya'], 0.75],
];
const OTHER_WORDS = ['other', 'kuch aur', 'kuch or', 'dusra', 'something else', 'अन्य', 'कुछ और', 'दूसरा', 'অন্য', 'மற்றவை', 'ఇతర', 'इतर', 'ಇತರೆ'];
const SCAM_ORDER = ['fake_kyc', 'otp_shared', 'fake_customer_care', 'wrong_transfer', 'qr_scan', 'investment_task', 'sextortion', 'other'];

const scamOptions: EnumOption[] = [
  ...SCAM_RULES.map(([value, keywords, confidence]) => ({ value, keywords, confidence, label: T(`scam_${value}`) })),
  { value: 'other', keywords: OTHER_WORDS, hintOnly: true, confidence: 0.7, label: T('scam_other') },
];

const BANKS: [string, string[]][] = [
  ['State Bank of India (SBI)', ['sbi', 'state bank', 'stay bank', 'state bank of india', 'yono', 'एसबीआई', 'स्टेट बैंक', 'স্টেট ব্যাংক', 'এসবিআই', 'எஸ்பிஐ', 'ஸ்டேட் பேங்க்', 'ఎస్బీఐ', 'ఎస్‌బీఐ', 'ఎస్బిఐ', 'స్టేట్ బ్యాంక్', 'ಎಸ್‌ಬಿಐ', 'ಎಸ್ಬಿಐ', 'ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್']],
  ['HDFC Bank', ['hdfc', 'एचडीएफसी', 'এইচডিএফসি', 'ஹெச்டிஎஃப்சி', 'హెచ్‌డీఎఫ్‌సీ', 'ಎಚ್‌ಡಿಎಫ್‌ಸಿ']],
  ['ICICI Bank', ['icici', 'आईसीआईसीआई', 'আইসিআইসিআই', 'ஐசிஐசிஐ', 'ఐసీఐసీఐ', 'ಐಸಿಐಸಿಐ']],
  ['Axis Bank', ['axis', 'access bank', 'access account', 'ஆக்சுஸ்', 'एक्सिस', 'অ্যাক্সিস', 'ஆக்சிஸ்', 'యాక్సిస్', 'ಆಕ್ಸಿಸ್']],
  ['Punjab National Bank (PNB)', ['pnb', 'punjab national', 'पीएनबी', 'पंजाब नेशनल']],
  ['Bank of Baroda', ['bank of baroda', 'baroda', 'बैंक ऑफ बड़ौदा', 'बड़ौदा', 'बडौदा']],
  ['Canara Bank', ['canara', 'kenara', 'केनरा', 'कैनरा', 'ಕೆನರಾ', 'கனரா']],
  ['Union Bank of India', ['union bank', 'union bank of india', 'यूनियन बैंक']],
  ['Kotak Mahindra Bank', ['kotak', 'कोटक', 'quote account', 'quote bank']],
  ['IndusInd Bank', ['indusind', 'induslnd', 'इंडसइंड']],
  ['Yes Bank', ['yes bank', 'यस बैंक']],
  ['IDFC FIRST Bank', ['idfc', 'आईडीएफसी']],
  ['Bank of India', ['bank of india', 'boi', 'बैंक ऑफ इंडिया']],
  ['Central Bank of India', ['central bank', 'central bank of india', 'सेंट्रल बैंक']],
  ['Indian Overseas Bank', ['indian overseas', 'iob']],
  ['Indian Bank', ['indian bank', 'इंडियन बैंक']],
  ['UCO Bank', ['uco', 'यूको']],
  ['Federal Bank', ['federal bank']],
  ['Bank of Maharashtra', ['bank of maharashtra', 'maharashtra bank', 'बँक ऑफ महाराष्ट्र', 'बैंक ऑफ महाराष्ट्र', 'महाराष्ट्र बँक', 'महाराष्ट्र बैंक']],
  ['Bandhan Bank', ['bandhan', 'बंधन']],
  ['India Post Payments Bank', ['india post', 'post office', 'ippb', 'पोस्ट ऑफिस', 'डाकघर']],
  ['Airtel Payments Bank', ['airtel payments', 'airtel bank']],
  ['Paytm Payments Bank', ['paytm bank', 'paytm payments bank']],
  ['Regional Rural (Gramin) Bank', ['gramin', 'grameen', 'ग्रामीण']],
];
// Cross-script bank matcher (round2-kit/indic-numbers: 97/97 on the corpus, 0 false positives).
const BANK_BY_KEY: Record<string, string> = {
  sbi: 'State Bank of India (SBI)', hdfc: 'HDFC Bank', icici: 'ICICI Bank', axis: 'Axis Bank', pnb: 'Punjab National Bank (PNB)',
  bob: 'Bank of Baroda', canara: 'Canara Bank', union: 'Union Bank of India', kotak: 'Kotak Mahindra Bank', indusind: 'IndusInd Bank',
  yes: 'Yes Bank', idfc: 'IDFC FIRST Bank', boi: 'Bank of India', central: 'Central Bank of India', iob: 'Indian Overseas Bank',
  indian: 'Indian Bank', federal: 'Federal Bank', bandhan: 'Bandhan Bank', ippb: 'India Post Payments Bank', airtel: 'Airtel Payments Bank', paytm: 'Paytm Payments Bank', mahb: 'Bank of Maharashtra',
};
const resolveBank = (raw: string) => {
  const hit = findBank(raw);
  return hit ? BANK_BY_KEY[hit.key] : undefined;
};
const TOP_BANKS = BANKS.slice(0, 8).map(([n]) => n).concat(['Kotak Mahindra Bank', 'India Post Payments Bank']);

const APPS: [string, string[]][] = [
  ['PhonePe', ['phonepe', 'ஹோன்பே', 'ஹோன் பே', 'phone pay', 'phonpe', 'phone-pe', 'fon pay', 'fon pe', 'fonpe', 'फोनपे', 'ফোনপে', 'போன்பே', 'ఫోన్‌పే', 'ఫోన్పే', 'ಫೋನ್‌ಪೇ', 'ফোন পে', 'ఫోన్ పే', 'போன் பே', 'ಫೋನ್ ಪೇ', 'फोन पे वरून', 'फोन पे द्वारे']],
  ['Google Pay', ['google pay', 'கூபுள் பே', 'గూబుల్ పే', 'गूबल पे', 'gpay', 'g pay', 'googlepay', 'tez', 'গুগল পে', 'கூகுள் பே', 'గూగుల్ పే', 'ಗೂಗಲ್ ಪೇ']],
  ['Paytm', ['paytm', 'pay tm', 'paidum', 'paytem', 'peitum', 'paitm', 'पेटीएम', 'পেটিএম', 'பேடிஎம்', 'పేటీఎం', 'పేటియం', 'ಪೇಟಿಎಂ', 'ಪೇಟಿಯೆ', 'पेटी एम', 'पे टी एम', 'पेटी इन', 'பேடியம்', 'পেটি এম']],
  ['BHIM', ['bhim', 'भीम ऐप', 'भीम यूपीआई']],
  ['Amazon Pay', ['amazon pay', 'अमेज़न पे']],
  ['CRED', ['cred']],
  ['Bank app / net banking', ['net banking', 'netbanking', 'internet banking', 'mobile banking', 'bank app', 'bank ka app', 'yono', 'imobile', 'नेट बैंकिंग']],
];

const UTR_CTX = ['utr', 'ref', 'reference', 'refno', 'rrn', 'transaction', 'txn', 'trans', 'id', 'यूटीआर', 'ट्रांजैक्शन', 'ट्रांजेक्शन', 'रेफरेंस', 'आईडी'];
const PHONE_CTX = ['phone', 'mobile', 'mob', 'call', 'calling', 'whatsapp', 'फोन', 'मोबाइल', 'कॉल', 'ফোন', 'போன்', 'ఫోన్', 'ಫೋನ್', 'मोबाईल'];
const ACCOUNT_CTX = ['account', 'acct', 'ac', 'a/c', 'khata', 'khaata', 'akaunt', 'खाता', 'खाते', 'खात', 'अकाउंट', 'অ্যাকাউন্ট', 'একাউন্ট', 'খাত', 'கணக்கு', 'அக்கவுண்ட்', 'ఖాతా', 'అకౌంట్', 'ಖಾತೆ', 'ಅಕೌಂಟ್'];

// Turant-specific overrides of kit UI strings ("Skip, 1930 will ask", "Past complaints").
const OVERRIDE: UIKey[] = ['summaryIntro', 'skipLater', 'giveUp', 'later', 'draftAgain', 'pastReports', 'newReport', 'noReports', 'deleteConfirm', 'fixPrompt', 'couldNotFix', 'state_speaking', 'moreInfo'];
const strings = Object.fromEntries(
  LANGS.map((l) => [l, Object.fromEntries(OVERRIDE.filter((k) => FRAUD_STRINGS[l][k] !== undefined).map((k) => [k, FRAUD_STRINGS[l][k]]))]),
) as Partial<Record<LangCode, Partial<Record<UIKey, string>>>>;

const all = (s: string): Text => Object.fromEntries(LANGS.map((l) => [l, s]));

export default defineDomain({
  id: 'fraud',
  name: all('तुरंत'),
  tagline: { 'en-IN': 'Report payment fraud by voice, in your language.', 'hi-IN': 'पेमेंट धोखाधड़ी की शिकायत, अपनी भाषा में, बोलकर।' },
  languages: LANGS,
  slots: [
    {
      key: 'amount', type: 'amount', required: true, confirm: 'explicit', keypad: true,
      label: T('f_amount'), q: T('q_amount'), rq: T('rq_amount'), ex: T('ex_amount'),
      aliases: ['amount', 'rakam', 'raqam', 'paise', 'paisa', 'rupaye', 'rupees', 'rupee', 'रकम', 'राशि', 'पैसे', 'रुपये', 'টাকা', 'தொகை', 'ரூபாய்', 'మొత్తం', 'रक्कम', 'ಮೊತ್ತ'],
    },
    {
      key: 'time', type: 'datetime', required: true, confirm: 'explicit',
      label: T('f_time'), q: T('q_time'), rq: T('rq_time'), ex: T('ex_time'),
      aliases: ['time', 'samay', 'waqt', 'vakt', 'date', 'tarikh', 'kab', 'समय', 'वक्त', 'वक़्त', 'तारीख', 'कब', 'সময়', 'நேரம்', 'సమయం', 'वेळ', 'ಸಮಯ'],
    },
    {
      key: 'scamType', type: 'enum', required: true, options: scamOptions, choices: SCAM_ORDER,
      label: T('f_scamType'), q: T('q_scamType'), rq: T('rq_scamType'), ex: T('ex_scamType'),
      aliases: ['scam', 'fraud type', 'type', 'tarika', 'tareeka', 'तरीका', 'प्रकार', 'धोखा'],
    },
    {
      key: 'bank', type: 'enum', required: true, pick: 'longest', confidence: 0.95, choices: TOP_BANKS, resolve: resolveBank,
      options: BANKS.map(([name, keywords]) => ({ value: name, keywords, label: { 'en-IN': name } })),
      label: T('f_bank'), q: T('q_bank'), rq: T('rq_bank'), ex: T('ex_bank'),
      aliases: ['bank', 'बैंक', 'ব্যাংক', 'வங்கி', 'బ్యాంక్', 'बँक', 'ಬ್ಯಾಂಕ್'],
    },
    {
      key: 'paymentApp', type: 'enum', pick: 'first', confidence: 0.9, choices: ['PhonePe', 'Google Pay', 'Paytm', 'BHIM', 'Bank app / net banking'],
      options: APPS.map(([name, keywords]) => ({
        value: name,
        keywords,
        label: { 'en-IN': name },
        // "phone pe" in Hindi also means "on the phone"; accept it only as an app mention.
        patterns:
          name === 'PhonePe'
            ? [/(^|[^a-z])(phone pe|फोन पे)\s+(se|app|ऐप|से|upi|यूपीआई)/]
            : name === 'Google Pay'
              ? [/गूगल पे(?!\s+(सर्च|ढूंढ|देख))/] // "गूगल पे सर्च किया" = searched on Google
              : undefined,
      })),
      label: T('f_paymentApp'),
      aliases: ['app', 'ऐप', 'एप'],
    },
    {
      key: 'utr', type: 'digits', length: 12, ask: true, confirm: 'explicit', keypad: true, context: UTR_CTX,
      label: T('f_utr'), checkLabel: T('utrGloss'), q: T('q_utr'), rq: T('rq_utr'), ex: T('ex_utr'), help: T('help_utr'),
      aliases: ['utr', 'reference', 'ref no', 'transaction id', 'transaction number', 'txn', 'यूटीआर'],
    },
    { key: 'suspectUpi', type: 'upi', group: 'suspect', ask: true, label: T('f_suspectUpi'), aliases: ['upi id', 'upi', 'यूपीआई'] },
    { key: 'suspectPhone', type: 'phone', group: 'suspect', ask: true, keypad: true, context: PHONE_CTX, label: T('f_suspectPhone'), aliases: ['phone', 'mobile', 'number', 'फोन', 'मोबाइल', 'नंबर'] },
    {
      key: 'suspectAccount', type: 'digits', min: 9, max: 18, mask: true, group: 'suspect', ask: true, keypad: true, context: ACCOUNT_CTX,
      label: T('f_suspectAccount'), aliases: ['account number', 'account no', 'khata number', 'खाता नंबर', 'अकाउंट नंबर'],
    },
  ],
  groups: {
    suspect: {
      label: { 'en-IN': "Fraudster's details", 'hi-IN': 'धोखेबाज़ की जानकारी' },
      q: T('q_suspect'), rq: T('rq_suspect'), ex: T('ex_suspect'),
      confirm: 'explicit', keypadSlot: 'suspectPhone',
    },
  },
  copy: { greeting: T('greetHello'), openQ: T('openQ'), openEx: T('openEx'), letterTitle: T('letterTitle') },
  letter: [
    { text: T('L_when') },
    { text: T('L_scam') },
    { text: T('L_money') },
    { text: T('L_app'), onlyIf: 'paymentApp' },
    { text: T('L_utr') },
    { text: T('L_suspect') },
  ],
  check: {
    hero: 'amount',
    main: ['time', 'scamType', 'bank', 'utr'],
    more: ['paymentApp', { any: ['suspectUpi', 'suspectPhone', 'suspectAccount'], empty: 'suspectPhone' }],
    notice: (f, now) => (needsPoliceVisit(f, now) ? T('policeAdvice') : null),
  },
  done: {
    title: T('readyTitle'),
    sub: T('rightStep'),
    urgent: T('urgentLine'),
    big: { text: '1930', href: 'tel:1930' },
    scriptTitle: T('onCallSay'),
    script: (e, ctx) => build1930Script(e, ctx.lang, { spoken: ctx.aloud, now: ctx.now }),
    warning: T('stopLine'),
    next: [T('next1'), T('next2'), T('next3'), T('next4')],
    primary: { label: T('callNowBig'), kind: 'tel', href: 'tel:1930', icon: 'phone' },
    seeWritten: T('seeWritten'),
  },
  document: {
    title: T('docTitle'),
    sub: T('docSub'),
    build: (e, ctx) => buildComplaintText(e, ctx.now),
    badge: (e, ctx) => `${ft(ctx.lang, 'portalReady')} · ${buildPortalDescription(e).length}+`,
    copyAllLabel: T('copyAll'),
    actions: [
      { kind: 'copy', label: T('copyDesc'), text: (e) => buildPortalDescription(e), icon: 'copy' },
      { kind: 'link', label: T('openPortal'), href: 'https://cybercrime.gov.in', icon: 'external' },
      { kind: 'whatsapp', label: T('whatsappFamily'), text: (e, ctx) => buildFamilyMessage(e, ctx), icon: 'whatsapp' },
    ],
    sections: [{ title: T('bankMsgTitle'), build: (e) => buildBankMessage(e) }],
    checklist: { title: T('checklistTitle'), items: [T('check_block'), T('check_pin'), T('check_otp'), T('check_screens'), T('check_ack')] },
    ack: { label: T('ackLabel'), placeholder: T('ackPlaceholder') },
  },
  history: { title: (e) => (e.fields.amount ? formatINR(Number(e.fields.amount.value)) : '—') },
  topCall: { label: '1930', href: 'tel:1930' },
  samples: {
    stories: {
      // The spec's acceptance sentence, verbatim (Hinglish).
      'hi-IN': 'Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai, UPI ID tha rahul.kyc@ybl',
      'en-IN': 'Someone sent me a QR code saying I will receive money for my old sofa. I scanned it and 4,999 rupees got debited from my HDFC account through Google Pay about 20 minutes ago. His number was 98765 43210.',
      'bn-IN': 'আমার এসবিআই অ্যাকাউন্ট থেকে ৫০০০ টাকা কেটে গেছে, ১৫ মিনিট আগে একজন KYC আপডেটের জন্য ফোন করেছিল, UPI ID ছিল rahul.kyc@ybl',
      'ta-IN': 'என் SBI கணக்கிலிருந்து 5000 ரூபாய் போய்விட்டது, 10 நிமிடங்களுக்கு முன்பு ஒருவர் KYC அப்டேட் செய்யச் சொன்னார், UPI ID rahul.kyc@ybl',
      'te-IN': 'నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు, UPI ID rahul.kyc@ybl',
      'mr-IN': 'माझ्या SBI खात्यातून 5000 रुपये कापले गेले, 10 मिनिटांपूर्वी एका माणसाने KYC अपडेट करायला सांगितले, UPI ID rahul.kyc@ybl',
      'kn-IN': 'ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು, UPI ID rahul.kyc@ybl',
    },
    answers: {
      amount: 'paanch hazaar rupaye',
      time: 'das minute pehle',
      scamType: 'KYC update ke naam pe call aaya tha',
      bank: 'State Bank of India',
      // Amount-free on purpose: the same SMS is used by every language's sample story.
      utr: 'Your A/c XX4321 has been debited via UPI. UPI Ref No 4 5 6 7 8 9 0 1 2 3 4 5. Not you? Call your bank.',
      suspect: 'rahul dot kyc at ybl',
    },
  },
  strings,
});
