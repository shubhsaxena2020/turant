// Held-out cases: written AFTER tuning on the harness corpus, with different numbers and phrasing.
import { describe, expect, it } from 'vitest';
import { combine, findAmount, findAmountHit, wordParts } from './numbers';

const cases: [string, string, number | undefined][] = [
  // Hindi / Hinglish
  ['hi', 'मेरे खाते से तीन हज़ार चार सौ रुपये निकल गए', 3400],
  ['hi', 'करीब सवा लाख नहीं, डेढ़ लाख रुपये गए', 150000],
  ['hi', 'बयालीस हज़ार रुपये का नुकसान हुआ', 42000],
  ['hi', '₹ 7,250 कट गए कल शाम 6 बजे', 7250],
  ['en', 'mere 18 hazaar rupaye gaye yaar', 18000],
  ['en', 'chhappan sau rupaye', 5600],
  ['en', 'about 2.5 lakh rupees were taken', 250000],
  ['en', 'He took 45k from my account', 45000],
  // Marathi
  ['mr', 'माझे साडेचार हजार रुपये गेले', 4500],
  ['mr', 'तीनशे रुपये कापले', 300],
  ['mr', 'दहा लाख रुपये गेले, काल दुपारी तीन वाजता', 1000000],
  // Bengali
  ['bn', 'আমার তিন হাজার চারশো টাকা কেটে গেছে', 3400],
  ['bn', 'সাড়ে সাত হাজার টাকা গেছে, বিকেল চারটায়', 7500],
  ['bn', 'পঁচিশ হাজার টাকা পাঠিয়েছি', 25000],
  ['bn', 'দুই লাখ টাকা', 200000],
  // Tamil
  ['ta', 'மூவாயிரம் ரூபாய் போச்சு', 3000],
  ['ta', 'என் பத்தாயிரம் ரூபாய் போயிடுச்சு', 10000],
  ['ta', 'இருபதாயிரம் ரூபாய் அனுப்பினேன்', 20000],
  ['ta', 'ஏழாயிரத்து ஐநூறு ரூபாய் கட் ஆச்சு', 7500],
  ['ta', 'மூன்றரை லட்சம் ரூபாய்', 350000],
  // Telugu
  ['te', 'మూడు వేల నాలుగు వందల రూపాయలు పోయాయి', 3400],
  ['te', 'ముప్పై వేల రూపాయలు పంపాను', 30000],
  ['te', 'మూడున్నర లక్షల రూపాయలు', 350000],
  // Kannada
  ['kn', 'ಮೂರು ಸಾವಿರ ಐನೂರು ರೂಪಾಯಿ ಹೋಯಿತು', 3500],
  ['kn', 'ಇಪ್ಪತ್ತೈದು ಸಾವಿರ ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ', 25000],
  ['kn', 'ಮೂರೂವರೆ ಲಕ್ಷ ರೂಪಾಯಿ', 350000],
];

describe('held-out amounts', () => {
  for (const [lang, text, want] of cases) {
    it(`${lang}: ${text}`, () => expect(findAmount(text)).toBe(want));
  }
});

describe('traps', () => {
  it('a time is not an amount', () => {
    expect(findAmount('कल शाम सात बजे फोन आया')).toBeUndefined();
    expect(findAmount('10 मिनट पहले')).toBeUndefined();
    expect(findAmount('பத்து நிமிஷம் முன்னாடி')).toBeUndefined();
  });
  it('a phone number is not an amount', () => {
    expect(findAmount('उसका नंबर 9876543210 था')).toBeUndefined();
    expect(findAmount('उसका नंबर नौ आठ सात छह पाँच, चार तीन दो एक शून्य')).toBeUndefined();
    expect(findAmount('his number was nine eight seven six five')).toBeUndefined();
    expect(findAmount('அவன் நம்பர் ஒன்பது எட்டு ஏழு ஆறு ஐந்து')).toBeUndefined();
  });
  it('a read-out UTR is not an amount, the real amount still wins', () => {
    expect(findAmount('UTR 4 0 3 2 1 8 7 6 5 4 3 2')).toBeUndefined();
    expect(findAmount('UTR 4 0 3 2 1 8 7 6 5 4 3 2, तीन हज़ार रुपये')).toBe(3000);
  });
  it('self-correction keeps the last amount', () => {
    expect(findAmount('चार हज़ार... नहीं नहीं, पाँच हज़ार रुपये')).toBe(5000);
    expect(findAmount('மூவாயிரம்... இல்ல, நாலாயிரம் ரூபாய்')).toBe(4000);
  });
});

describe('parts', () => {
  it('Tamil compounds split into parts', () => {
    expect(combine(wordParts('நாற்பத்தேழாயிரம்')!)).toBe(47000);
    expect(combine(wordParts('தொண்ணூத்தொன்பது')!)).toBe(99);
  });
  it('Kannada tens+units glue', () => {
    expect(combine(wordParts('ನಲವತ್ತೇಳು')!)).toBe(47);
  });
});

describe('context-only number words', () => {
  it('ಆಯಿದು is 5 only right before thousand/lakh', () => {
    expect(findAmount('ಆಯಿದು ಸಾವಿರ ರೂಪಾಯ ಹೋಯಿತು')).toBe(5000);
    expect(findAmount('ಆರು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿದು')).toBe(6000);
  });
  it('a digit read-out ends before "<digit> thousand"', () => {
    expect(findAmount('ರೆಫ್ರೆನ್ಸ್ ನಂಬರ್ ನಾಲ್ಕು ಸೊನ್ನೆ ಮೂರು ಎರ್ಡು ಒಂಡು ಎಂಟು ಆಯಿದು ಸಾವಿರ ರೂಪಾಯ ಹೋಯಿತು')).toBe(5000);
  });
});

describe('Hinglish spellings', () => {
  it('doubled letters collapse (chhabbees ~ chabbis ~ chhabis = 26)', () => {
    expect(findAmount('chabbis hazaar rupaye')).toBe(26000);
    expect(findAmount('chhabis hazaar rupaye')).toBe(26000);
  });
});

describe('connectors', () => {
  it('"and" / "aur" inside a number joins it', () => {
    expect(findAmount('four thousand nine hundred and ninety nine rupees')).toBe(4999);
    expect(findAmount('do sau aur pachaas rupaye')).toBe(250);
  });
});

// Misspellings Whisper produces for Indian-language number and currency words
// (seen in harness/transcripts). Repaired by single sound-alike edits.
describe('ASR misspellings', () => {
  it('currency word variants still count as currency', () => {
    expect(findAmountHit('ஐயாயிரம் ரூபாயி போச்சு')).toEqual({ value: 5000, currencyNear: true });
    expect(findAmountHit('ஐயாயிரம் ருபாய் போச்சு')).toEqual({ value: 5000, currencyNear: true });
    expect(findAmountHit('পাঁচ হাজার তাকা কেটে গেছে')).toEqual({ value: 5000, currencyNear: true });
    expect(findAmountHit('ఐదు వేల రోపాయలు పోయాయి')).toEqual({ value: 5000, currencyNear: true });
  });
  it('currency glued to the number is split off', () => {
    expect(findAmountHit('ನಲವತ್ತೇಳು ಸಾವಿರರೂಪಾಯಿ ಹಾಕಿದೆ')).toEqual({ value: 47000, currencyNear: true });
    expect(findAmountHit('ಎರಡು ಲಕ್ಷರೂಪಾಯಿ ತೆಗೆದರು')).toEqual({ value: 200000, currencyNear: true });
    expect(findAmountHit('అయిదు వేలరూపాయలు పోయాయి')).toEqual({ value: 5000, currencyNear: true });
  });
  it('one sound-alike slip in a number word is repaired', () => {
    expect(findAmount('ஐயாயிரம் இல்லை இல்லை ஆராயிரம் ருபாய் போச்சு')).toBe(6000); // ற -> ர
    expect(findAmount('সাডে তিন হাজার টাকা চলে গেছে')).toBe(3500); // ড় -> ড
    expect(findAmount('পাঁচ হাজাড টাকা')).toBe(5000); // র -> ড
    expect(findAmount('পাংচ হাজার টাকা')).toBe(5000); // ং for ঁ
    expect(findAmount('ನಲ್ವತ್ತೇಳು ಸಾವಿರ ರೂಪಾಯಿ')).toBe(47000); // extra virama
    expect(findAmount('అయిదు వేల రూపాయలు')).toBe(5000); // spelling variant of ఐదు
    expect(findAmount('साड़े 3,500 रुपए गेले')).toBe(3500); // half already in the digits
    expect(findAmount('देड़ लाख रुपए गए हैं')).toBe(150000);
    expect(findAmount('धाई हजार रुपय कटे')).toBe(2500);
    expect(findAmount('ಆರು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿದು')).toBe(6000);
    // an unreadable word before "thousand" is a misheard number: abstain rather than say 1000
    expect(findAmount('না না শোয হাজার তাকা কেটেছে')).toBeUndefined();
    expect(findAmount('ఇరావాయ వేలు రుపీస్ డెబిటాయి')).toBeUndefined();
    expect(findAmount('a thousand rupees were taken')).toBe(1000);
    expect(findAmount('हज़ार रुपये कट गए')).toBe(1000); // ಆಯಿದು = ಆಯಿತು "happened", not 5
    expect(findAmount('UPI reference 40321 7 6 5 4 3 రిండు 5 వేల రూపాయలు పోయాయి')).toBe(5000); // ID digits, then the amount
    expect(findAmount('రిండు లక్షల రూపాయలు తీసేసారు')).toBe(200000);
  });
  it('repair never invents numbers from ordinary words', () => {
    expect(findAmountHit('என் அக்கவுண்ட்ல இருந்து பணம் போச்சு')).toBeUndefined();
    expect(findAmountHit('আমার স্টেট ব্যাংক থেকে টাকা চলে গেছে')).toBeUndefined();
    expect(findAmountHit('ನನ್ನ ಖಾತೆಯಿಂದ ಹಣ ಹೋಯಿತು')).toBeUndefined();
    expect(findAmountHit('నా అకౌంట్ నుండి డబ్బులు పోయాయి')).toBeUndefined();
  });
});
