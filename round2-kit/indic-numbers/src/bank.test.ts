// Held-out bank cases (written after tuning on the corpus).
import { describe, expect, it } from 'vitest';
import { findBank } from './bank';

const cases: [string, string][] = [
  ['मेरा खाता बैंक ऑफ़ बड़ौदा में है', 'bob'],
  ['आईसीआईसीआई से पैसे गए', 'icici'],
  ['एक्सिस बैंक वाला अकाउंट', 'axis'],
  ['আমার ইউনিয়ন ব্যাংকের অ্যাকাউন্ট', 'union'],
  ['এক্সিস ব্যাংক থেকে কেটেছে', 'axis'],
  ['கனரா பேங்க் கணக்கு', 'canara'],
  ['எஸ்பிஐ கணக்கு', 'sbi'],
  ['ఎస్‌బీఐ ఖాతా', 'sbi'],
  ['కోటక్ బ్యాంక్ నుండి', 'kotak'],
  ['ಕೆನರಾ ಬ್ಯಾಂಕ್ ಖಾತೆ', 'canara'],
  ['ಐಸಿಐಸಿಐ ಬ್ಯಾಂಕ್', 'icici'],
  ['माझे खाते बँक ऑफ इंडिया मध्ये आहे', 'boi'],
  ['IndusInd bank se', 'indusind'],
  ['state bank of india', 'sbi'],
  ['पहले बोला एक्सिस, नहीं नहीं, कोटक बैंक है', 'kotak'],
];

describe('held-out banks', () => {
  for (const [text, want] of cases) it(text, () => expect(findBank(text)?.key).toBe(want));
});

describe('traps', () => {
  it('no bank in ordinary sentences', () => {
    expect(findBank('yes, that is right')).toBeUndefined();
    expect(findBank('पचास हज़ार रुपये गए')).toBeUndefined();
    expect(findBank('फोनपे से पैसे भेजे')).toBeUndefined();
    expect(findBank('state government scheme')).toBeUndefined();
    expect(findBank('ஐயாயிரம் ரூபாய் போச்சு')).toBeUndefined();
  });
});

describe('named "Bank of India" banks', () => {
  it('Union / Central Bank of India are not Bank of India', () => {
    expect(findBank('union bank of india')?.key).toBe('union');
    expect(findBank('central bank of india se')?.key).toBe('central');
    expect(findBank('mera bank of india mein khata hai')?.key).toBe('boi');
  });
});

// Bank names as Whisper writes them (harness/transcripts, dev voices).
describe('ASR spellings', () => {
  const cases: [string, string][] = [
    ['मेरे बैंक आफ बड़ादा का अकाउंट है', 'bob'], // ऑफ -> आफ
    ['S.B.I.', 'sbi'],
    ['आई सी आई सी आई बैंड के कस्टमर केयर का नंबर', 'icici'], // letters spoken one by one
    ['తర్వాత ఏచ్డి ఎఫ్సీ అకాంట్నుండి', 'hdfc'],
    ['আমি সাতচল্লিশ হাজার টাকা দিয়েছি কুটাক বেনক থেকে', 'kotak'],
    ['আমার পনেরো হাজার টাকা চলে গেছে, একসিস বাংক তিন দিন আগে', 'axis'],
    ['ఓటి పీ చెప్పాను కినరా బైంక', 'canara'],
  ];
  for (const [text, key] of cases) it(text, () => expect(findBank(text)?.key).toBe(key));
  it('loose name matching needs the word "bank" right after', () => {
    expect(findBank('कुटाक ने बोला')).toBeUndefined();
    expect(findBank('আমি একসিস দেখেছি')).toBeUndefined();
  });
});
