import { describe, expect, it } from 'vitest';
import { detectIntent, detectLanguage, extractFields, normalize, parseCorrection } from './extract';
import { mergeExtraction, newReport, pendingQuestions, type Fields } from './report';
import { SAMPLE_ANSWERS, SAMPLE_STORIES } from '../i18n/samples';

// Fixed "now": 21 Nov 2026, 12:00 local time.
const NOW = new Date(2026, 10, 21, 12, 0, 0);
const minutesAgo = (iso: string | undefined) => (NOW.getTime() - new Date(iso!).getTime()) / 60_000;
const at = (iso: string | undefined) => new Date(iso!);

function toFields(text: string): Fields {
  return mergeExtraction({}, extractFields(text, { now: NOW }), { source: 'voice', mode: 'story' }).fields;
}

describe('acceptance test (spec)', () => {
  const sentence =
    'Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai, UPI ID tha rahul.kyc@ybl';

  it('extracts amount, time, scam type, bank and suspect UPI', () => {
    const ext = extractFields(sentence, { now: NOW });
    expect(ext.amount?.value).toBe(5000);
    expect(minutesAgo(ext.time?.value)).toBeCloseTo(10, 5);
    expect(ext.scamType?.value).toBe('fake_kyc');
    expect(ext.bank?.value).toBe('State Bank of India (SBI)');
    expect(ext.suspectUpi?.value).toBe('rahul.kyc@ybl');
    expect(ext.utr).toBeUndefined();
    expect(ext.suspectPhone).toBeUndefined();
  });

  it('then asks only for the UTR', () => {
    expect(pendingQuestions(toFields(sentence))).toEqual(['utr']);
  });

  it('works for the Devanagari version the browser recogniser returns', () => {
    const deva =
      'मेरे अकाउंट से पाँच हज़ार रुपये कट गए, दस मिनट पहले एक आदमी ने बोला केवाईसी अपडेट करो, एसबीआई का अकाउंट है, यूपीआई आईडी था rahul.kyc@ybl';
    const ext = extractFields(deva, { now: NOW });
    expect(ext.amount?.value).toBe(5000);
    expect(minutesAgo(ext.time?.value)).toBeCloseTo(10, 5);
    expect(ext.scamType?.value).toBe('fake_kyc');
    expect(ext.bank?.value).toBe('State Bank of India (SBI)');
    expect(ext.suspectUpi?.value).toBe('rahul.kyc@ybl');
    expect(pendingQuestions(toFields(deva))).toEqual(['utr']);
  });

  it('handles the Chrome hi-IN style output with digits and the rupee sign', () => {
    const ext = extractFields('मेरे अकाउंट से ₹5000 कट गए 10 मिनट पहले केवाईसी अपडेट के लिए कॉल आया था SBI का अकाउंट है', { now: NOW });
    expect(ext.amount?.value).toBe(5000);
    expect(minutesAgo(ext.time?.value)).toBeCloseTo(10, 5);
    expect(ext.scamType?.value).toBe('fake_kyc');
    expect(ext.bank?.value).toBe('State Bank of India (SBI)');
  });
});

describe('amounts', () => {
  const amount = (text: string, hint?: 'amount') => extractFields(text, { now: NOW, hint }).amount?.value;
  it.each([
    ['₹4,999 kat gaye', 4999],
    ['₹4,999', 4999],
    ['4999 rupees', 4999],
    ['Rs.4999 debited', 4999],
    ['saade teen hazaar', 3500],
    ['saade teen hazaar rupaye gaye', 3500],
    ['five thousand', 5000],
    ['I lost five thousand rupees', 5000],
    ['four thousand nine hundred and ninety nine rupees', 4999],
    ['do lakh', 200000],
    ['do lakh rupaye nikal gaye', 200000],
    ['dedh lakh', 150000],
    ['dhai hazaar rupaye', 2500],
    ['paune paanch hazaar', 4750],
    ['1,00,000 rupaye', 100000],
    ['2 lakh 50 hazaar', 250000],
    ['पांच हज़ार रुपये', 5000],
    ['पाँच हजार रुपए कट गए', 5000],
    ['साढ़े तीन हज़ार', 3500],
    ['दो लाख रुपये', 200000],
    ['৫০০০ টাকা কেটে গেছে', 5000],
    ['5000 ரூபாய் போய்விட்டது', 5000],
  ])('%s -> %d', (text, expected) => {
    expect(amount(text)).toBe(expected);
  });

  it('accepts a bare number when answering the amount question', () => {
    expect(amount('5999', 'amount')).toBe(5999);
  });

  it('does not mistake time or people for an amount', () => {
    expect(amount('das minute pehle ek aadmi ne call kiya')).toBeUndefined();
    expect(amount('kal shaam 7 baje')).toBeUndefined();
    expect(amount('UTR 456789012345')).toBeUndefined();
  });
});

describe('UTR, phone, account', () => {
  it('reads a 12-digit UTR spoken digit by digit', () => {
    expect(extractFields('4 5 6 7 8 9 0 1 2 3 4 5', { now: NOW, hint: 'utr' }).utr?.value).toBe('456789012345');
  });
  it('reads a 12-digit UTR as one block', () => {
    expect(extractFields('UTR number hai 456789012345', { now: NOW }).utr?.value).toBe('456789012345');
  });
  it('reads a UTR in groups and in digit words', () => {
    expect(extractFields('utr 4567 8901 2345', { now: NOW }).utr?.value).toBe('456789012345');
    expect(extractFields('four five six seven eight nine zero one two three four five', { now: NOW, hint: 'utr' }).utr?.value).toBe('456789012345');
  });
  it('finds the UTR when a bank SMS is read aloud', () => {
    expect(extractFields(SAMPLE_ANSWERS.utr!, { now: NOW, hint: 'utr' }).utr?.value).toBe('456789012345');
    const sms = 'Rs.5000 debited from A/c XX4321 to VPA rahul.kyc@ybl. UPI Ref No 4 5 6 7 8 9 0 1 2 3 4 5. Not you? Call your bank.';
    const ext = extractFields(sms, { now: NOW, hint: 'utr' });
    expect(ext.utr?.value).toBe('456789012345');
    expect(ext.amount?.value).toBe(5000);
    expect(ext.suspectUpi?.value).toBe('rahul.kyc@ybl');
  });
  it('reads a 10-digit phone number', () => {
    expect(extractFields('uska number 9876543210 tha', { now: NOW }).suspectPhone?.value).toBe('9876543210');
    expect(extractFields('his number was 98765 43210', { now: NOW }).suspectPhone?.value).toBe('9876543210');
    expect(extractFields('call aaya +91 98765 43210 se', { now: NOW }).suspectPhone?.value).toBe('9876543210');
  });
  it('ignores numbers that cannot be Indian mobiles', () => {
    expect(extractFields('number 1234567890', { now: NOW }).suspectPhone).toBeUndefined();
  });
  it('reads a suspect account number with context', () => {
    expect(extractFields('account number 50100234567812', { now: NOW }).suspectAccount?.value).toBe('50100234567812');
  });
});

describe('time', () => {
  const time = (text: string) => extractFields(text, { now: NOW }).time?.value;
  it('kal shaam 7 baje -> yesterday 19:00', () => {
    const d = at(time('kal shaam 7 baje'));
    expect(d.getDate()).toBe(20);
    expect(d.getHours()).toBe(19);
    expect(d.getMinutes()).toBe(0);
  });
  it('yesterday 7 pm -> yesterday 19:00', () => {
    const d = at(time('yesterday 7 pm'));
    expect(d.getDate()).toBe(20);
    expect(d.getHours()).toBe(19);
  });
  it('कल शाम 7 बजे -> yesterday 19:00', () => {
    const d = at(time('कल शाम 7 बजे'));
    expect(d.getDate()).toBe(20);
    expect(d.getHours()).toBe(19);
  });
  it('relative times', () => {
    expect(minutesAgo(time('10 minute pehle'))).toBeCloseTo(10, 5);
    expect(minutesAgo(time('20 minutes ago'))).toBeCloseTo(20, 5);
    expect(minutesAgo(time('do ghante pehle'))).toBeCloseTo(120, 5);
    expect(minutesAgo(time('aadha ghanta pehle'))).toBeCloseTo(30, 5);
    expect(minutesAgo(time('3 din pehle'))).toBeCloseTo(3 * 24 * 60, 5);
    expect(minutesAgo(time('१५ मिनट पहले'))).toBeCloseTo(15, 5);
    expect(minutesAgo(time('10 मिनिटांपूर्वी'))).toBeCloseTo(10, 5);
  });
  it('abhi -> now', () => {
    expect(minutesAgo(time('abhi abhi hua'))).toBeCloseTo(0, 5);
  });
  it('aaj subah 9:30', () => {
    const d = at(time('aaj subah 9:30 baje'));
    expect(d.getDate()).toBe(21);
    expect(d.getHours()).toBe(9);
    expect(d.getMinutes()).toBe(30);
  });
  it('saade saat baje (half past seven) without a day goes to the last past occurrence', () => {
    const d = at(time('shaam saade saat baje'));
    expect(d.getDate()).toBe(20); // 19:30 today is still in the future at 12:00
    expect(d.getHours()).toBe(19);
    expect(d.getMinutes()).toBe(30);
  });
  it('parso raat', () => {
    const d = at(time('parso raat'));
    expect(d.getDate()).toBe(19);
    expect(d.getHours()).toBe(22);
  });
});

describe('scam type, bank, app', () => {
  const ext = (text: string) => extractFields(text, { now: NOW });
  it.each([
    ['bank se call aaya KYC update karna hai', 'fake_kyc'],
    ['maine OTP bata diya', 'otp_shared'],
    ['google pe customer care number mila, usne AnyDesk download karwaya', 'fake_customer_care'],
    ['usne bola galti se paise bhej diye, wapas bhejo', 'wrong_transfer'],
    ['QR code scan kiya aur paise kat gaye', 'qr_scan'],
    ['telegram pe task diya, youtube like karne ka', 'investment_task'],
    ['video call record karke blackmail kar raha hai', 'sextortion'],
    ['I received a call saying my KYC is pending', 'fake_kyc'],
  ])('%s -> %s', (text, type) => {
    expect(ext(text).scamType?.value).toBe(type);
  });

  it.each([
    ['SBI', 'State Bank of India (SBI)'],
    ['state bank of india', 'State Bank of India (SBI)'],
    ['s b i ka account', 'State Bank of India (SBI)'],
    ['एसबीआई', 'State Bank of India (SBI)'],
    ['HDFC bank', 'HDFC Bank'],
    ['union bank of india', 'Union Bank of India'],
    ['bank of india', 'Bank of India'],
    ['पंजाब नेशनल बैंक', 'Punjab National Bank (PNB)'],
  ])('bank %s -> %s', (text, bank) => {
    expect(ext(text).bank?.value).toBe(bank);
  });

  it('does not read the bank from the suspect UPI handle', () => {
    expect(ext('UPI ID rahul@oksbi').bank).toBeUndefined();
    expect(ext('UPI ID rahul@oksbi').suspectUpi?.value).toBe('rahul@oksbi');
  });

  it('detects payment apps but not "phone pe call aaya"', () => {
    expect(ext('PhonePe se paise gaye').paymentApp?.value).toBe('PhonePe');
    expect(ext('Google Pay se bheja').paymentApp?.value).toBe('Google Pay');
    expect(ext('paytm').paymentApp?.value).toBe('Paytm');
    expect(ext('phone pe call aaya tha').paymentApp).toBeUndefined();
  });

  it('builds a spoken UPI ID ("rahul dot kyc at ybl")', () => {
    expect(ext('UPI ID rahul dot kyc at ybl').suspectUpi?.value).toBe('rahul.kyc@ybl');
    expect(ext('rahul.kyc at the rate ybl').suspectUpi?.value).toBe('rahul.kyc@ybl');
    expect(ext('my account at sbi').suspectUpi).toBeUndefined();
  });
});

describe('English transcripts', () => {
  it('extracts a full English story', () => {
    const e = extractFields(SAMPLE_STORIES['en-IN'], { now: NOW });
    expect(e.amount?.value).toBe(4999);
    expect(minutesAgo(e.time?.value)).toBeCloseTo(20, 5);
    expect(e.scamType?.value).toBe('qr_scan');
    expect(e.bank?.value).toBe('HDFC Bank');
    expect(e.paymentApp?.value).toBe('Google Pay');
    expect(e.suspectPhone?.value).toBe('9876543210');
    expect(pendingQuestions(toFields(SAMPLE_STORIES['en-IN']))).toEqual(['utr']);
  });
  it('extracts a second English story', () => {
    const e = extractFields('Yesterday 7 pm someone from fake customer care took two lakh rupees from my ICICI account', { now: NOW });
    expect(e.amount?.value).toBe(200000);
    expect(at(e.time?.value).getHours()).toBe(19);
    expect(e.scamType?.value).toBe('fake_customer_care');
    expect(e.bank?.value).toBe('ICICI Bank');
  });
});

describe('all language samples fill the required fields', () => {
  it.each(Object.entries(SAMPLE_STORIES))('%s', (_lang, story) => {
    const e = extractFields(story, { now: NOW });
    expect(e.amount?.value).toBeGreaterThan(0);
    expect(e.time).toBeDefined();
    expect(e.scamType).toBeDefined();
    expect(e.bank).toBeDefined();
    expect(pendingQuestions(toFields(story))).toEqual(['utr']);
  });
});

describe('voice corrections', () => {
  it('"amount galat hai 5999 tha" updates only the amount', () => {
    const c = parseCorrection('amount galat hai 5999 tha', { now: NOW });
    expect(c).toEqual({ field: 'amount', value: 5999, confidence: expect.any(Number) });
    const before = toFields(SAMPLE_STORIES['hi-IN']);
    const after = mergeExtraction(before, { [c!.field]: { value: c!.value, confidence: c!.confidence } }, {
      source: 'voice',
      mode: 'answer',
      overwrite: [c!.field],
    }).fields;
    expect(after.amount?.value).toBe(5999);
    for (const k of ['time', 'scamType', 'bank', 'suspectUpi'] as const) expect(after[k]).toEqual(before[k]);
  });
  it('bank correction prefers the last-mentioned bank', () => {
    expect(parseCorrection('bank SBI nahi HDFC tha')).toMatchObject({ field: 'bank', value: 'HDFC Bank' });
    expect(parseCorrection('बैंक गलत है, केनरा बैंक था')).toMatchObject({ field: 'bank', value: 'Canara Bank' });
  });
  it('infers the field from the value when none is named', () => {
    expect(parseCorrection('nahi, 456789012345 tha')).toMatchObject({ field: 'utr', value: '456789012345' });
    expect(parseCorrection('time galat hai, kal shaam 7 baje tha', { now: NOW })?.field).toBe('time');
    expect(parseCorrection('UPI ID galat hai, fraud.pay@ybl tha')).toMatchObject({ field: 'suspectUpi', value: 'fraud.pay@ybl' });
  });
  it('returns null when nothing usable is said', () => {
    expect(parseCorrection('hmm')).toBeNull();
  });
});

describe('intents and language names', () => {
  it.each([
    ['pata nahi', 'skip'],
    ['पता नहीं', 'skip'],
    ["I don't know", 'skip'],
    ['ek minute ruko', 'wait'],
    ['wait', 'wait'],
    ['haan sahi hai', 'yes'],
    ['nahi', 'no'],
  ])('%s -> %s', (text, intent) => {
    expect(detectIntent(text)).toBe(intent);
  });
  it('"ek minute pehle" is a time, not a wait', () => {
    expect(detectIntent('ek minute pehle')).toBeNull();
  });
  it.each([
    ['Tamil', 'ta-IN'],
    ['हिंदी', 'hi-IN'],
    ['mujhe bangla chahiye', 'bn-IN'],
    ['ಕನ್ನಡ', 'kn-IN'],
    ['English please', 'en-IN'],
  ])('language %s -> %s', (text, code) => {
    expect(detectLanguage(text)).toBe(code);
  });
});

describe('normalisation', () => {
  it('folds native digits and Indian commas', () => {
    expect(normalize('₹१,००,०००')).toBe('₹ 100000');
    expect(normalize('৫০০০')).toBe('5000');
  });
});

describe('report merge', () => {
  it('flags contradictions between story turns', () => {
    const first = toFields('5000 rupaye kat gaye');
    const r = mergeExtraction(first, extractFields('6000 rupaye kat gaye', { now: NOW }), { source: 'voice', mode: 'story' });
    expect(r.conflicts).toHaveLength(1);
    expect(r.conflicts[0].field).toBe('amount');
    expect(r.fields.amount?.value).toBe(5000);
  });
  it('answers only fill gaps for other fields', () => {
    const first = toFields('5000 rupaye kat gaye');
    const r = mergeExtraction(first, extractFields('Rs 6000 debited UTR 456789012345', { now: NOW, hint: 'utr' }), {
      source: 'voice',
      mode: 'answer',
      overwrite: ['utr'],
    });
    expect(r.conflicts).toHaveLength(0);
    expect(r.fields.amount?.value).toBe(5000);
    expect(r.fields.utr?.value).toBe('456789012345');
  });
  it('skipped questions are not asked again', () => {
    const report = newReport('hi-IN');
    expect(pendingQuestions(report.fields, ['amount', 'utr'])).toEqual(['time', 'scamType', 'bank', 'suspect']);
  });
});

// Regressions found by harness/ (reference text and Whisper transcripts).
describe('harness regressions', () => {
  const x = (t: string, o = {}) => extractFields(t, { now: NOW, ...o });
  it('cross-language amounts, times and banks', () => {
    expect(x('என் SBI கணக்கிலிருந்து ஐயாயிரம் ரூபாயி போச்சு').amount?.value).toBe(5000);
    expect(x('ಎರಡು ಲಕ್ಷರೂಪಾಯಿ ತೆಗೆದರು').amount?.value).toBe(200000);
    expect(x('আমি গুগল পে দিয়ে বারো হাজার পাঠিয়ে দিলাম').amount?.value).toBe(12000); // not just "thousand"
    expect(x('না না কোয হাজার তাকা কেটেছে').amount).toBeUndefined(); // unreadable word before thousand: ask, don't say 1000
    expect(x('না না শোয হাজার তাকা কেটেছে').amount?.value).toBe(6000); // শোয right before হাজার = ছয়
    expect(minutesAgo(x('পাঁচ মিনিট আগে কেটে গেছে').time?.value)).toBeCloseTo(5, 5);
    expect(x('আমার স্টেট ব্যাংক থেকে টাকা গেছে').bank?.value).toBe('State Bank of India (SBI)');
  });
  it('investment, PAN-card and blackmail stories in every language', () => {
    expect(x('টেলিগ্রামে পার্ট টাইম জবের টাস্ক দিয়েছিল, তারপর ইনভেস্ট করতে বলল').scamType?.value).toBe('investment_task');
    expect(x('அப்புறம் இன்விஸ்ட் பண்ண சொன்னாங்க').scamType?.value).toBe('investment_task'); // ASR spelling
    expect(x('अडीच लाख रुपये गुंतवणुकीच्या नावाखाली घेतले').scamType?.value).toBe('investment_task');
    expect(x('बोला पैन कार्ड अपडेट करो वरना अकाउंट ब्लॉक हो जाएगा').scamType?.value).toBe('fake_kyc');
    expect(x('they recorded it and are now blackmailing me').scamType?.value).toBe('sextortion');
  });
  it('IDs read out digit by digit', () => {
    expect(x('पैसे कट गए, यूटीआर नंबर है 4 0 3 2 1 8 7 6 5 4 3 2, पाँच हज़ार रुपये').utr?.value).toBe('403218765432');
    expect(x('पैसे कट गए UTR नंबर है 403218 765 432 5000 रुपए').utr?.value).toBe('403218765432'); // groups run into the amount
    expect(x('যে অ্যাকাউন্টে টাকা গেছে তার নম্বর 5 0 1 0 0 2 3 4 5 6 7 8 1 2').suspectAccount?.value).toBe('50100234567812');
    expect(x('ওর নম্বর নয় নয় আট আট সাত সাত ছয় ছয় পাঁচ পাঁচ').suspectPhone?.value).toBe('9988776655');
    expect(x('रेफ नो चार पाच सहा साथ आठ नौ शून्य एक डोन तीन चार पाच').utr?.value).toBe('456789012345'); // साथ = सात, डोन = दोन
    expect(x('அவன் நம்பர் ஒன்பது ஒன்பது எட்டு எட்டு ஏழு ஏழு ஆறு ஆறு ஐந்து ஐந்து').suspectPhone?.value).toBe('9988776655');
    expect(x('కాల్ వచ్చిన నంబర్ తుమ్మిది ఎనిమిది ఏడు ఆరు అయిదు నాలుగు మూడు రెండు ఒంటి గంటసున్నా').suspectPhone?.value).toBe('9876543210'); // ఒంటి గంట = 1
    expect(x('The number that called me was plus 91 70112 23344').suspectPhone?.value).toBe('7011223344');
  });
  it('false positives the harness caught', () => {
    expect(x('around 4,999 rupees').time).toBeUndefined();
    expect(x('Your ACXX 4321 has been debited via UPI. Not you? Call your bank.').amount).toBeUndefined(); // masked account
    expect(x('ರೆಕಾರ್ಡ್ ಮಾಡಿ ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ').time).toBeUndefined();
    expect(x('कस्टमर केयर का नंबर गूगल पे सर्च किया था').paymentApp).toBeUndefined();
    expect(x('दीड लाख रुपय गेले बंक आफ बडोदा खात').paymentApp).toBeUndefined(); // "bank of" is not "bank app"
    expect(x('पैसे पेटीएम से गए').paymentApp?.value).toBe('Paytm');
    expect(x('no, the bank was HDFC not SBI', { preferLast: true }).bank?.value).toBe('HDFC Bank');
    expect(x('பேங்க் தப்பு SBI إல்லா HDFC', { preferLast: true }).bank?.value).toBe('HDFC Bank'); // garbled negator: last name wins
  });
});

describe('round 30 (large-v3 dev transcripts)', () => {
  const x = (t: string, o = {}) => extractFields(t, { now: NOW, ...o });
  it('spellings and split words', () => {
    expect(x('एक आदमी ने बोला के वाईसी अपडेट करो').scamType?.value).toBe('fake_kyc');
    expect(x('आई-सी-ाई-सी-ाई बैंक के कस्टमर केयर').bank?.value).toBe('ICICI Bank'); // hyphen-spelled, orphan vowel sign
    expect(x('दो-तीन हज़ार रुपये गए').amount?.value).not.toBe(23000); // a two-part range is not an acronym
    expect(x('நான் கூபுள் பே மூலமா 12,500 ரூபாய் அனுப்பிட்டேன்').paymentApp?.value).toBe('Google Pay');
    expect(x('10 நிமிணங்களுக்கு முன்பு').time).toBeDefined();
    expect(x('माझा अकाउंट मदून 20,000 रूपीज देविट जाले').amount?.value).toBe(20000);
    expect(x('ನಿಮ್ಮ ಖಾತೆಯಿಂದ 5000 ಡೆಬಿಟ್ ಆಗಿದೆ').amount?.value).toBe(5000);
  });
  it('IDs', () => {
    expect(x('UPI ID Rahul.kyc at ybl.ki').suspectUpi?.value).toBe('rahul.kyc@ybl'); // Telugu "ki" glued on
    expect(x('mail me at rahul@gmail.com').suspectUpi).toBeUndefined();
    expect(x('रेफ नो सहा 12345789012').utr?.value).toBe('612345789012');
    expect(x('रेफ नो सहा 1234578901 दो').utr?.value).toBe('612345789012');
    expect(x('नंबर सहा 1234578901').suspectPhone).toBeUndefined(); // no reference word: not joined
    expect(x('అకాంట్ నంబర్ 5.00.1.00.2.3.4.5.6.7.8.1.2.').time).toBeUndefined(); // dotted read-out, not 5:00
    expect(x('कल शाम 7.30 बजे पैसे गए').time).toBeDefined();
  });
});

describe('round 31 (large-v3 dev transcripts)', () => {
  const x = (t: string, o = {}) => extractFields(t, { now: NOW, ...o });
  it('time words', () => {
    expect(x('ಅರ್ಧಗಂಟೆ ಹಿಂದೆ').time?.value).toBe(x('ಅರ್ಧ ಗಂಟೆ ಹಿಂದೆ').time?.value); // glued half-hour
    expect(x('ನಿನ್ನೆ ಸಂಜಿ ಏಳು ಗಂಟಗೆ').time?.value).toBe(x('ನಿನ್ನೆ ಸಂಜೆ ಏಳು ಗಂಟೆಗೆ').time?.value);
    expect(x('আজ সকাল দস্টায়').time?.value).toBe(x('আজ সকাল দশটায়').time?.value); // virama left on the stem
    expect(x('গতকাল সুন্ধা সাত্তায়').time?.value).toBe(x('গতকাল সন্ধ্যা সাতটায়').time?.value);
  });
  it('a lost-digit phone number in a correction is not an amount', () => {
    expect(parseCorrection('NOMOR BHUL 981112233', { now: NOW })).toBeNull();
    expect(parseCorrection('15,00,000', { now: NOW })?.value).toBe(1500000);
  });
});

describe('round 32 (hour-and-minute phrases)', () => {
  const x = (t: string, o = {}) => extractFields(t, { now: NOW, ...o });
  const at = (t: string) => new Date(x(t).time!.value).getTime();
  const ist = (d: string) => new Date(d + '+05:30').getTime();
  it('clock and duration', () => {
    expect(at('कल रात 9 बजकर 30 मिनट पर पैसे गए')).toBe(ist('2026-11-20T21:30:00'));
    expect(x('कल रात 9 बजकर 30 मिनट पर पैसे गए').amount).toBeUndefined();
    expect(x('कल रात 9:30 पर पैसे गए').amount).toBeUndefined(); // a clock time is not ₹30
    expect(at('நேற்று இரவு 9 மணி 30 நிமிடம் மணிக்கு')).toBe(ist('2026-11-20T21:30:00'));
    expect(at('மூன்று மணி நேரம் 30 நிமிடம் முன்னாடி')).toBe(ist('2026-11-21T08:30:00'));
    expect(at('2 hours 30 minutes ago')).toBe(ist('2026-11-21T09:30:00'));
    expect(x('1.00 1.00 2.00 3.00 3.00 4.00').time).toBeUndefined(); // a digit read-out
  });
  it('KYC in Kannada letters', () => {
    expect(x('ಕೇವ ಆಯಸಿ ಅಪ್ಡೇಟ್ ಮಾಡಿ').scamType?.value).toBe('fake_kyc');
  });
});

describe('round 34 (Hinglish as the in-page Hindi Whisper writes it)', () => {
  const x = (t: string, o = {}) => extractFields(t, { now: NOW, ...o });
  it('numbers and read-outs', () => {
    expect(x('mere HDFC account se do laakh rupe nikaal lie').amount?.value).toBe(200000);
    expect(x('Dedh laakh rupe gae hain').amount?.value).toBe(150000);
    expect(x('Uska number saat shoony ek ek do do tin tin chaar chaar.').suspectPhone?.value).toBe('7011223344');
    expect(x('UTR number hai chaar paanch chhah saat aath nau shoony ek do tin chaar paanch').utr?.value).toBe('456789012345');
    expect(x('tis hazaar rupe cut gae access bank se').bank?.value).toBe('Axis Bank');
  });
  it('skip', () => {
    expect(detectIntent('Pata nahin chhodo.')).toBe('skip');
  });
});

describe('round 35 (read-outs as the in-page Hinglish Whisper writes English)', () => {
  const x = (t: string, o = {}) => extractFields(t, { now: NOW, ...o });
  it('a clock-looking group inside a read-out is digits, not a time', () => {
    expect(x('The reference number is 06:01 to 34567 890.').time).toBeUndefined();
    expect(x('UPI refer number 45678 08:01 2 345. Not you, call your bank.').time).toBeUndefined();
    expect(x('This happened yesterday at 7:30 pm.').time).toBeDefined();
  });
  it('double / triple digits', () => {
    expect(x('his number is 98765 double 4 3 2 1').suspectPhone?.value).toBe('9876544321');
    expect(x('his number is nine eight seven six five double four three two one').suspectPhone?.value).toBe('9876544321');
  });
  it('spellings', () => {
    expect(x('Do laakh paanchas hazaar rupe invest karvae').amount?.value).toBe(250000);
    expect(x('I lost 47000 rupees from my quote account').bank?.value).toBe('Kotak Mahindra Bank');
  });
});

describe('round 36 (romanised Marathi, as the in-page model writes it)', () => {
  const x = (t: string, o = {}) => extractFields(t, { now: NOW, ...o });
  const hhmm = (iso?: string) => (iso ? new Date(iso).toTimeString().slice(0, 5) : '');
  it('amounts', () => {
    expect(x('Mag HDFC khaate tum don laakh rupe kaadle').amount?.value).toBe(200000);
    expect(x('Din laakh roope gale').amount?.value).toBe(150000); // दीड लाख
    expect(x('Aditi hazaar rupe gele').amount?.value).toBe(2500); // अडीच हजार
    expect(x('saha hazaar rupe gale').amount?.value).toBe(6000);
    expect(x('I sat at the bank din for an hour').amount).toBeUndefined(); // din alone is not 1.5
  });
  it('times', () => {
    expect(hhmm(x('Kaal sandhyaakaari saat vaajata phone aala').time?.value)).toBe('19:00');
    expect(hhmm(x('Kaal raatri saadhe nau vaajastha').time?.value)).toBe('21:30');
    expect(x('Pandrah minutean poorvi').time).toBeDefined();
    expect(x('tin divsaan poorvi').time).toBeDefined();
  });
  it('read-out and skip', () => {
    expect(x('Tyaacha number saat shoony ek ek don don tin tin chaar chaar.').suspectPhone?.value).toBe('7011223344');
    expect(detectIntent('maahit naahi')).toBe('skip');
  });
});

describe('round 37 (English false times, plain money words, padded read-outs)', () => {
  const x = (t: string, o = {}) => extractFields(t, { now: NOW, ...o });
  it('"I am" / "amount" / "rate" are not times', () => {
    expect(x('I am very scared').time).toBeUndefined();
    expect(x('the amount was 5000 on Amazon').time).toBeUndefined();
    expect(x('he said the rate is low').time).toBeUndefined();
    expect(x('yesterday at 9 am he called').time).toBeDefined();
  });
  it('"right now", "abhi tak", "abhi bhi" are the present, not when it happened', () => {
    expect(x('My husband is not at home right now').time).toBeUndefined();
    expect(x('abhi tak paise wapas nahi aaye').time).toBeUndefined();
    expect(x('वो अभी भी फोन कर रहा है').time).toBeUndefined();
    expect(x('abhi abhi paanch hazaar kat gaye').time).toBeDefined();
    expect(x('it happened just now').time).toBeDefined();
  });
  it('a number before "hours" / "days" counts them; "about 1 lakh" is money, not a clock time', () => {
    const a = x('Someone called pretending to be from SBI and I lost Rs 12,500 about 2 hours ago');
    expect(a.amount?.value).toBe(12500);
    expect(new Date(a.time!.value).getTime()).toBe(NOW.getTime() - 2 * 3600e3);
    expect(x('lost Rs 12,500 two hours ago').amount?.value).toBe(12500);
    expect(x('Money was stolen, about one lakh twenty thousand, two days ago').amount?.value).toBe(120000);
    expect(x('about 1 lakh 20 thousand was stolen').time).toBeUndefined();
    expect(x('I got a call yesterday evening around 6').time).toBeDefined();
    expect(x('After I told him, 4,500 was gone from my Canara Bank account').amount?.value).toBe(4500);
  });
  it('fees and penalties are money', () => {
    expect(x('Teen din pehle job ke naam pe 5000 registration fees li').amount?.value).toBe(5000);
    expect(x('तीन दिन पहले नौकरी के नाम पे 5000 रजिस्ट्रेशन फीस ली').amount?.value).toBe(5000);
  });
  it('"amount", "took", "stole" mark money, but not an OTP', () => {
    expect(x('the amount was 5000').amount?.value).toBe(5000);
    expect(x('he took 5000 from me').amount?.value).toBe(5000);
    expect(x('he took my OTP 4567').amount).toBeUndefined();
  });
  it('a padded clock group in a read-out loses its 0; split letters name the bank', () => {
    expect(x('I sent money to account number 05:01 00234567812 around 4000 rupees.').suspectAccount?.value).toBe('50100234567812');
    expect(x('bis hazaar roopij debit jha le ICI C I bank').bank?.value).toBe('ICICI Bank');
    expect(x('I sent it to a b i account').bank).toBeUndefined();
  });
});

describe('round 39 (typed Marathi and quarter amounts)', () => {
  const x = (t: string) => extractFields(t, { now: NOW, lang: 'mr-IN' } as never);
  it('Marathi spellings of banks', () => {
    expect(x('माझ्या एसबीआय खात्यातून दहा हजार रुपये कापले गेले').bank?.value).toBe('State Bank of India (SBI)');
    expect(x('माझ्या आयसीआयसीआय बँक खात्यातून पैसे गेले').bank?.value).toBe('ICICI Bank');
    expect(x('माझ्या बाबांच्या खात्यातून दीड लाख रुपये गेले, बँक ऑफ महाराष्ट्र आहे').bank?.value).toBe('Bank of Maharashtra');
    expect(x('I live in Maharashtra and 5000 was debited').bank).toBeUndefined();
  });
  it('quarters, halves and Marathi hundreds', () => {
    expect(x('सवा लाख रुपये कट गए').amount?.value).toBe(125000);
    expect(x('पावणे दोन लाख रुपये गेले').amount?.value).toBe(175000);
    expect(x('साडेतीन लाख काढून घेतले').amount?.value).toBe(350000);
    expect(x('माझ्या फोनपे वरून तीन हजार पाचशे गेले').amount?.value).toBe(3500);
    expect(extractFields('সোয়া লাখ টাকা কেটে নিয়েছে', { now: NOW, lang: 'bn-IN' } as never).amount?.value).toBe(125000);
  });
});

describe('round 40 (dates and weekdays as answers)', () => {
  const FRI = new Date('2026-11-27T15:00:00+05:30');
  const day = (t: string, hint?: string) => {
    const v = extractFields(t, { now: FRI, lang: 'en-IN', ...(hint ? { hint } : {}) } as never).time?.value;
    return v ? new Date(v).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }) : undefined;
  };
  it('weekdays and calendar dates, always in the past', () => {
    expect(day('on Monday', 'time')).toBe('2026-11-23');
    expect(day('last Friday', 'time')).toBe('2026-11-20');
    expect(day('25th November', 'time')).toBe('2026-11-25');
    expect(day('25/11', 'time')).toBe('2026-11-25');
    expect(day('on 2nd December', 'time')).toBe('2025-12-02');
    expect(day('25 नवंबर को शाम 7 बजे', 'time')).toBe('2026-11-25');
    expect(day('On 25th November I lost 5000 rupees from my SBI account')).toBe('2026-11-25');
    expect(day('25 तारीख को', 'time')).toBe('2026-11-25');
    expect(day('28 tarikh ko shaam ko', 'time')).toBe('2026-10-28');
    expect(day('pichhle somvar', 'time')).toBe('2026-11-23');
  });
  it('fractions, ranges and "may be" are not dates', () => {
    expect(day('I lost 2 may be 3 thousand rupees')).toBeUndefined();
    expect(day('it took 10/12 minutes')).toBeUndefined();
    expect(day('5000 rupees, 1/2 of my salary')).toBeUndefined();
  });
});

describe('round 41 (romanised Marathi from the in-page model, only when speaking Marathi)', () => {
  const mr = (t: string) => extractFields(t, { now: NOW, lang: 'mr-IN' });
  it('reads Marathi spellings', () => {
    expect(mr('UPI reference number chaar shoony tin don ek aath saat saahab paanch chaar tin don').utr?.value).toBe('403218765432');
    expect(mr('Chaar hazaar nau se navaayant nau.').amount?.value).toBe(4999);
    expect(mr('Manje, kal doopaari adhik vaajata phone par varun don hazaar sahaashay rupe ke lie.').paymentApp?.value).toBe('PhonePe');
  });
  it('leaves Hindi alone', () => {
    expect(extractFields('saahab, paanch se zyada log the', { now: NOW, lang: 'hi-IN' }).amount).toBeUndefined();
    expect(extractFields('mera phone par varun se baat hui', { now: NOW, lang: 'hi-IN' }).paymentApp).toBeUndefined();
  });
});

describe('round 42 (UPI IDs and read-outs as Whisper writes them)', () => {
  const x = (t: string) => extractFields(t, { now: NOW, lang: 'en-IN' });
  it('handles said aloud, digits written as a time, "two" written "to"', () => {
    expect(x('It was fraud dot pay at Vibyal.').suspectUpi?.value).toBe('fraud.pay@ybl');
    expect(x('The UPI ID was sharma 01:23 at Paytm. I sent in 3500.').suspectUpi?.value).toBe('sharma123@paytm');
    expect(x('The reference number is 06:01 to 34567 890.').utr?.value).toBe('601234567890');
  });
  it('a sum paid at an app is money, not an ID', () => {
    const r = x('my name is priya and I paid 2000 at paytm');
    expect(r.suspectUpi).toBeUndefined();
    expect(r.amount?.value).toBe(2000);
    expect(x('I paid rahul 9876543210 at ybl').suspectUpi?.value).toBe('9876543210@ybl');
  });
});
