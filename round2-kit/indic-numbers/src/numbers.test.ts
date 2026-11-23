// Held-out cases: written AFTER tuning on the harness corpus, with different numbers and phrasing.
import { describe, expect, it } from 'vitest';
import { combine, findAmount, wordParts } from './numbers';

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
