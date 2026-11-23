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
    expect(x('যে অ্যাকাউন্টে টাকা গেছে তার নম্বর 5 0 1 0 0 2 3 4 5 6 7 8 1 2').suspectAccount?.value).toBe('50100234567812');
    expect(x('ওর নম্বর নয় নয় আট আট সাত সাত ছয় ছয় পাঁচ পাঁচ').suspectPhone?.value).toBe('9988776655');
    expect(x('அவன் நம்பர் ஒன்பது ஒன்பது எட்டு எட்டு ஏழு ஏழு ஆறு ஆறு ஐந்து ஐந்து').suspectPhone?.value).toBe('9988776655');
    expect(x('The number that called me was plus 91 70112 23344').suspectPhone?.value).toBe('7011223344');
  });
  it('false positives the harness caught', () => {
    expect(x('around 4,999 rupees').time).toBeUndefined();
    expect(x('ರೆಕಾರ್ಡ್ ಮಾಡಿ ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ').time).toBeUndefined();
    expect(x('कस्टमर केयर का नंबर गूगल पे सर्च किया था').paymentApp).toBeUndefined();
    expect(x('no, the bank was HDFC not SBI', { preferLast: true }).bank?.value).toBe('HDFC Bank');
    expect(x('பேங்க் தப்பு SBI إல்லா HDFC', { preferLast: true }).bank?.value).toBe('HDFC Bank'); // garbled negator: last name wins
  });
});
