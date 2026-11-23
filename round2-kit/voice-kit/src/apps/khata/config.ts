// khata: a kirana shopkeeper's voice ledger. "Ramesh ne 3 kilo chawal aur 2 litre tel
// liya, 450 rupaye udhaar" -> customer, items, amount, paid / credit, in one breath.
import { defineDomain, type Entry, type ItemDef, type OutputCtx } from '../../domain/types';
import { amountInWords, formatINR, portalDate, portalTime } from '../../lib/format';

const ITEMS: ItemDef[] = [
  { name: { 'en-IN': 'Rice', 'hi-IN': 'चावल' }, keywords: ['rice', 'chawal', 'chaawal', 'chaval', 'चावल', 'அரிசி', 'ಅಕ್ಕಿ', 'চাল'] },
  { name: { 'en-IN': 'Wheat flour', 'hi-IN': 'आटा' }, keywords: ['atta', 'aata', 'flour', 'आटा', 'கோதுமை மாவு', 'ಹಿಟ್ಟು', 'আটা'] },
  { name: { 'en-IN': 'Sugar', 'hi-IN': 'चीनी' }, keywords: ['sugar', 'cheeni', 'chini', 'shakkar', 'चीनी', 'शक्कर', 'சர்க்கரை', 'ಸಕ್ಕರೆ', 'চিনি'] },
  { name: { 'en-IN': 'Oil', 'hi-IN': 'तेल' }, keywords: ['oil', 'tel', 'तेल', 'எண்ணெய்', 'ಎಣ್ಣೆ', 'তেল'] },
  { name: { 'en-IN': 'Dal', 'hi-IN': 'दाल' }, keywords: ['dal', 'daal', 'lentils', 'दाल', 'பருப்பு', 'ಬೇಳೆ', 'ডাল'] },
  { name: { 'en-IN': 'Milk', 'hi-IN': 'दूध' }, keywords: ['milk', 'doodh', 'dudh', 'दूध', 'பால்', 'ಹಾಲು', 'দুধ'] },
  { name: { 'en-IN': 'Salt', 'hi-IN': 'नमक' }, keywords: ['salt', 'namak', 'नमक', 'உப்பு', 'ಉಪ್ಪು', 'লবণ', 'নুন'] },
  { name: { 'en-IN': 'Tea', 'hi-IN': 'चाय पत्ती' }, keywords: ['tea', 'chai patti', 'chai', 'चाय', 'चायपत्ती', 'டீ', 'ಟೀ', 'চা'] },
  { name: { 'en-IN': 'Soap', 'hi-IN': 'साबुन' }, keywords: ['soap', 'sabun', 'साबुन', 'சோப்பு', 'ಸೋಪು', 'সাবান'] },
  { name: { 'en-IN': 'Biscuits', 'hi-IN': 'बिस्कुट' }, keywords: ['biscuit', 'biscuits', 'बिस्कुट', 'பிஸ்கட்', 'ಬಿಸ್ಕತ್', 'বিস্কুট'] },
  { name: { 'en-IN': 'Eggs', 'hi-IN': 'अंडे' }, keywords: ['egg', 'eggs', 'anda', 'ande', 'अंडा', 'अंडे', 'முட்டை', 'ಮೊಟ್ಟೆ', 'ডিম'] },
  { name: { 'en-IN': 'Onion', 'hi-IN': 'प्याज़' }, keywords: ['onion', 'onions', 'pyaz', 'pyaaz', 'प्याज', 'வெங்காயம்', 'ಈರುಳ್ಳಿ', 'পেঁয়াজ'] },
  { name: { 'en-IN': 'Potato', 'hi-IN': 'आलू' }, keywords: ['potato', 'potatoes', 'aloo', 'alu', 'आलू', 'உருளைக்கிழங்கு', 'ಆಲೂಗಡ್ಡೆ', 'আলু'] },
  { name: { 'en-IN': 'Bread', 'hi-IN': 'ब्रेड' }, keywords: ['bread', 'pav', 'ब्रेड', 'பிரெட்', 'ಬ್ರೆಡ್', 'পাউরুটি'] },
  { name: { 'en-IN': 'Noodles', 'hi-IN': 'मैगी' }, keywords: ['maggi', 'noodles', 'मैगी', 'நூடுல்ஸ்', 'ನೂಡಲ್ಸ್'] },
];

const PAY_LABEL: Record<string, string> = { credit: 'Credit (udhaar), to be paid', paid: 'Paid in cash', upi: 'Paid by UPI', repay: 'Payment received against old dues' };

const shopDate = (ctx: OutputCtx) => `${portalDate(ctx.now.toISOString())} ${portalTime(ctx.now.toISOString())}`;

/** The message the shopkeeper sends the customer (their language). */
function reminder(e: Entry, ctx: OutputCtx): string {
  const name = ctx.show('customer') ?? '';
  const amount = ctx.show('amount') ?? '';
  const items = ctx.show('items');
  const credit = e.fields.payment?.value === 'credit';
  return ctx.t(
    credit
      ? { 'hi-IN': 'नमस्ते {name} जी, आज {items} का {amount} आपके खाते में उधार लिखा है। सुविधा से चुका दीजिए। धन्यवाद।', 'en-IN': 'Hello {name}, {amount} for {items} has been written in your khata as credit today. Please pay when convenient. Thank you.' }
      : { 'hi-IN': 'नमस्ते {name} जी, आज {amount} मिल गए ({items})। धन्यवाद।', 'en-IN': 'Hello {name}, received {amount} today ({items}). Thank you.' },
    { name, amount, items: items ?? ctx.t({ 'hi-IN': 'सामान', 'en-IN': 'items' }) },
  );
}

export default defineDomain({
  id: 'khata',
  name: { 'en-IN': 'Hisaab', 'hi-IN': 'हिसाब' },
  tagline: { 'en-IN': 'Your shop ledger, by voice.', 'hi-IN': 'दुकान का खाता, बोलकर।' },
  theme: {}, // Wispr Flow default theme (src/lib/theme.ts)
  languages: ['hi-IN', 'en-IN'],
  slots: [
    {
      key: 'customer', type: 'name', required: true, markers: ['customer', 'grahak', 'ग्राहक'],
      label: { 'en-IN': 'Customer', 'hi-IN': 'ग्राहक' },
      q: { 'en-IN': "Whose entry is this? Say the customer's name.", 'hi-IN': 'किसका हिसाब है? ग्राहक का नाम बोलिए।' },
      rq: { 'en-IN': "The customer's name?", 'hi-IN': 'ग्राहक का नाम?' },
      ex: { 'en-IN': '"Ramesh" or "Sharma ji"', 'hi-IN': '"रमेश" या "शर्मा जी"' },
      aliases: ['naam', 'name', 'customer', 'grahak', 'नाम', 'ग्राहक'],
    },
    {
      key: 'items', type: 'quantity+unit', ask: true, items: ITEMS,
      label: { 'en-IN': 'Items', 'hi-IN': 'सामान' },
      q: { 'en-IN': 'What did they take?', 'hi-IN': 'क्या-क्या सामान लिया?' },
      rq: { 'en-IN': 'Which items, and how much?', 'hi-IN': 'कौन सा सामान, कितना?' },
      ex: { 'en-IN': '"3 kilo rice and 2 litres oil"', 'hi-IN': '"3 किलो चावल और 2 लीटर तेल"' },
      aliases: ['saman', 'samaan', 'items', 'सामान'],
    },
    {
      key: 'amount', type: 'amount', required: true, confirm: 'explicit', keypad: true,
      cues: ['udhaar', 'udhar', 'baaki', 'baki', 'credit', 'total', 'hisaab', 'jama', 'diye', 'उधार', 'बाकी', 'कुल', 'हिसाब', 'जमा', 'दिए'],
      label: { 'en-IN': 'Amount', 'hi-IN': 'रकम' },
      q: { 'en-IN': 'How much is the total?', 'hi-IN': 'कुल कितने रुपये हुए?' },
      rq: { 'en-IN': 'How many rupees?', 'hi-IN': 'कितने रुपये?' },
      ex: { 'en-IN': '"450 rupees"', 'hi-IN': '"साढ़े चार सौ रुपये" या "450"' },
      aliases: ['amount', 'rakam', 'paise', 'rupaye', 'total', 'रकम', 'पैसे', 'रुपये'],
    },
    {
      key: 'payment', type: 'enum', required: true,
      options: [
        { value: 'credit', label: { 'en-IN': 'On credit (udhaar)', 'hi-IN': 'उधार' }, keywords: ['udhaar', 'udhar', 'udhari', 'credit', 'baaki', 'baki', 'baad mein', 'baad me', 'likh do', 'likh lo', 'khate mein', 'later', 'उधार', 'बाकी', 'बाद में', 'लिख दो', 'खाते में'] },
        { value: 'repay', label: { 'en-IN': 'Paid back old dues', 'hi-IN': 'पुराना हिसाब चुकाया' }, keywords: ['jama', 'jama kiye', 'wapas', 'lautaye', 'chukaya', 'chuka diye', 'purana hisaab', 'paid back', 'cleared', 'जमा', 'लौटाए', 'चुकाए', 'चुकाया'] },
        { value: 'upi', label: { 'en-IN': 'Paid by UPI', 'hi-IN': 'UPI से दिए' }, keywords: ['upi', 'gpay', 'google pay', 'phonepe', 'paytm', 'online', 'qr', 'यूपीआई', 'ऑनलाइन'] },
        { value: 'paid', label: { 'en-IN': 'Paid in cash', 'hi-IN': 'नकद दिए' }, keywords: ['nakad', 'naqad', 'cash', 'paid', 'de diye', 'de diya', 'paise diye', 'नकद', 'कैश', 'दे दिए'] },
      ],
      label: { 'en-IN': 'Paid or credit', 'hi-IN': 'नकद या उधार' },
      q: { 'en-IN': 'Did they pay now, or is it on credit?', 'hi-IN': 'पैसे अभी दिए, या उधार है?' },
      rq: { 'en-IN': 'Cash, UPI or udhaar?', 'hi-IN': 'नकद, UPI या उधार?' },
      ex: { 'en-IN': '"udhaar" or "paid in cash"', 'hi-IN': '"उधार" या "नकद दिए"' },
      aliases: ['udhaar ya nakad', 'payment', 'भुगतान'],
    },
    {
      key: 'phone', type: 'phone', keypad: true,
      label: { 'en-IN': "Customer's mobile", 'hi-IN': 'ग्राहक का मोबाइल' },
      q: { 'en-IN': "Customer's mobile number?", 'hi-IN': 'ग्राहक का मोबाइल नंबर?' },
      ex: { 'en-IN': '"98765 43210"', 'hi-IN': '"98765 43210"' },
    },
  ],
  copy: {
    greeting: { 'en-IN': 'Namaste. I am Hisaab, your shop ledger.', 'hi-IN': 'नमस्ते। मैं हिसाब हूँ, आपकी दुकान का खाता।' },
    openQ: { 'en-IN': 'Who took what? Just say it.', 'hi-IN': 'किसने क्या लिया? बस बोल दीजिए।' },
    openEx: { 'en-IN': 'For example: "Ramesh took 3 kg rice and 2 litres oil, 450 rupees on credit."', 'hi-IN': 'जैसे: "रमेश ने 3 किलो चावल और 2 लीटर तेल लिया, 450 रुपये उधार।"' },
    letterTitle: { 'en-IN': 'The entry, as I write it', 'hi-IN': 'खाते में ऐसे लिख रहा हूँ' },
  },
  letter: [
    { text: { 'en-IN': '{customer} took {items}.', 'hi-IN': '{customer} ने {items} लिया।' } },
    { text: { 'en-IN': 'Total: {amount}.', 'hi-IN': 'कुल: {amount}।' } },
    { text: { 'en-IN': 'Payment: {payment}.', 'hi-IN': 'भुगतान: {payment}।' } },
  ],
  check: { hero: 'amount', main: ['customer', 'payment', 'items'], more: [{ any: ['phone'], empty: 'phone' }] },
  done: {
    title: { 'en-IN': 'Written in the khata', 'hi-IN': 'खाते में लिख लिया' },
    sub: { 'en-IN': 'Saved on this phone. Nothing is lost if the internet goes.', 'hi-IN': 'इसी फ़ोन में सेव है। इंटरनेट जाए तो भी कुछ नहीं खोएगा।' },
    scriptTitle: { 'en-IN': 'Tell the customer', 'hi-IN': 'ग्राहक को बताइए' },
    script: (e, ctx) => [reminder(e, ctx)],
    nextTitle: { 'en-IN': 'Next', 'hi-IN': 'आगे' },
    next: [
      { 'en-IN': 'Send the customer this message on WhatsApp.', 'hi-IN': 'यह संदेश ग्राहक को WhatsApp पर भेजिए।' },
      { 'en-IN': 'When they pay, just say: "Ramesh ne 450 jama kiye".', 'hi-IN': 'जब पैसे दें, बस बोलिए: "रमेश ने 450 जमा किए"।' },
    ],
    primary: { label: { 'en-IN': 'Send on WhatsApp', 'hi-IN': 'WhatsApp पर भेजें' }, kind: 'whatsapp', text: reminder, icon: 'whatsapp' },
    seeWritten: { 'en-IN': 'See the ledger entry', 'hi-IN': 'खाते की एंट्री देखें' },
  },
  document: {
    title: { 'en-IN': 'Ledger entry', 'hi-IN': 'खाते की एंट्री' },
    sub: { 'en-IN': 'A clean record you can copy into any register or app.', 'hi-IN': 'साफ़ रिकॉर्ड, किसी भी रजिस्टर या ऐप में कॉपी कीजिए।' },
    build: (e, ctx) => {
      const amount = e.fields.amount ? Number(e.fields.amount.value) : undefined;
      const items = (ctx.english('items') ?? '').split(', ').filter(Boolean);
      return [
        'KHATA ENTRY - CUSTOMER LEDGER',
        `(Recorded by voice · ${shopDate(ctx)})`,
        '',
        '1. CUSTOMER',
        `Name: ${ctx.english('customer') ?? 'Not known'}`,
        `Mobile: ${ctx.show('phone') ?? 'Not given'}`,
        '',
        '2. ITEMS',
        ...(items.length ? items.map((it, i) => `Item ${i + 1}: ${it}`) : ['Items: Not listed']),
        '',
        '3. PAYMENT',
        `Amount: ${amount !== undefined ? `${formatINR(amount)} (Rupees ${amountInWords(amount)} only)` : 'Not known'}`,
        `Status: ${e.fields.payment ? PAY_LABEL[String(e.fields.payment.value)] : 'Not known'}`,
        ...(e.turns.length ? ['', "4. SHOPKEEPER'S OWN WORDS", ...e.turns.map((x) => `"${x}"`)] : []),
      ].join('\n');
    },
    copyAllLabel: { 'en-IN': 'Copy the entry', 'hi-IN': 'एंट्री कॉपी करें' },
    actions: [{ kind: 'whatsapp', label: { 'en-IN': 'Send to the customer', 'hi-IN': 'ग्राहक को भेजें' }, text: reminder, icon: 'whatsapp' }],
    sections: [{ title: { 'en-IN': 'Message for the customer', 'hi-IN': 'ग्राहक के लिए संदेश' }, build: reminder }],
  },
  history: {
    title: (_e, ctx) => [ctx.show('customer'), ctx.show('amount')].filter(Boolean).join(' · ') || '—',
  },
  samples: {
    stories: {
      'hi-IN': 'Ramesh ne 3 kilo chawal aur 2 litre tel liya, 450 rupaye udhaar',
      'en-IN': 'Sunita took 5 kg atta and 2 packets of biscuits, 380 rupees.',
    },
    answers: {
      customer: { 'hi-IN': 'Ramesh', 'en-IN': 'Sunita' },
      items: { 'hi-IN': '3 kilo chawal', 'en-IN': '5 kg atta' },
      amount: { 'hi-IN': 'saade chaar sau rupaye', 'en-IN': '380 rupees' },
      payment: { 'hi-IN': 'udhaar likh do', 'en-IN': 'on credit, she will pay later' },
    },
  },
  strings: {
    'en-IN': { skipLater: 'Skip', pastReports: 'Earlier entries', newReport: 'New entry', draftAgain: 'Finish the last entry', summaryIntro: 'Here is the entry.', noReports: 'No entries yet.' },
    'hi-IN': { skipLater: 'छोड़िए', pastReports: 'पुरानी एंट्री', newReport: 'नई एंट्री', draftAgain: 'पिछली एंट्री पूरी करें', summaryIntro: 'यह रही एंट्री।', noReports: 'अभी कोई एंट्री नहीं।' },
  },
});
