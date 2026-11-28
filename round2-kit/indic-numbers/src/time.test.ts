// Held-out time cases (written after tuning on the corpus).
import { describe, expect, it } from 'vitest';
import { findTime } from './time';

const NOW = new Date('2026-11-21T12:00:00+05:30');
const ago = (m: number) => NOW.getTime() - m * 60000;
const at = (day: number, h: number, m = 0) => {
  const d = new Date(NOW);
  d.setDate(d.getDate() + day);
  d.setHours(h, m, 0, 0);
  return d.getTime();
};

const cases: [string, number][] = [
  ['पाँच मिनट पहले', ago(5)],
  ['तीन घंटे पहले पैसे कटे', ago(180)],
  ['आज दोपहर 3 बजे', at(0, 15)],
  ['परसों रात 11 बजे फोन आया', at(-2, 23)],
  ['कल सुबह 8 बजे', at(-1, 8)],
  ['two hours back', ago(120)],
  ['yesterday at 6:45 pm', at(-1, 18, 45)],
  ['this morning around 9 they called', at(0, 9)],
  ['পাঁচ মিনিট আগে', ago(5)],
  ['গতকাল রাত এগারোটায়', at(-1, 23)],
  ['আজ বিকেল চারটায়', at(0, 16)],
  ['ஐந்து நிமிஷத்துக்கு முன்னாடி', ago(5)],
  ['நேற்று காலை 8 மணிக்கு', at(-1, 8)],
  ['இரண்டு மணி நேரத்துக்கு முன்னாடி', ago(120)],
  ['ఐదు నిమిషాల క్రితం', ago(5)],
  ['నిన్న ఉదయం 8 గంటలకు', at(-1, 8)],
  ['మూడు రోజుల క్రితం', ago(4320)],
  ['ಐದು ನಿಮಿಷಗಳ ಹಿಂದೆ', ago(5)],
  ['ನಿನ್ನೆ ಬೆಳಿಗ್ಗೆ 8 ಗಂಟೆಗೆ', at(-1, 8)],
  ['ಎರಡು ಗಂಟೆಗಳ ಹಿಂದೆ', ago(120)],
  ['पाच मिनिटांपूर्वी', ago(5)],
  ['काल सकाळी आठ वाजता', at(-1, 8)],
  ['दोन तासांपूर्वी', ago(120)],
];

describe('held-out times', () => {
  for (const [text, want] of cases) {
    it(text, () => {
      const hit = findTime(text, NOW);
      expect(hit, 'no time found').toBeTruthy();
      expect(Math.abs(hit!.date.getTime() - want) / 60000).toBeLessThanOrEqual(20);
    });
  }
});

describe('traps', () => {
  it('no time in money-only or counting sentences', () => {
    expect(findTime('एक QR कोड भेजा, ₹500 गए', NOW)).toBeUndefined();
    expect(findTime('একটা লিংক পাঠিয়েছিল', NOW)).toBeUndefined();
    expect(findTime('ஐயாயிரம் ரூபாய் போச்சு', NOW)).toBeUndefined();
  });
  it('a bare clock later than now means yesterday', () => {
    const hit = findTime('रात 10 बजे', NOW);
    expect(hit!.date.getTime()).toBe(at(-1, 22));
  });
});

// Misspellings Whisper produces for time words (seen in harness/transcripts, dev voices).
describe('ASR misspellings', () => {
  const asr: [string, number][] = [
    ['இன்று காலை பத்து மனிக்கு', at(0, 10)], // மணிக்கு
    ['அரை மணி நெரத்துக்கு முன்னாடி', ago(30)], // நேரத்துக்கு
    ['2 மணி நெரத்துக்கு முன்னாடி', ago(120)],
    ['పది నిమిశాల కృతం', ago(10)], // నిమిషాల క్రితం
    ['আদ ঘন্টা আগে', ago(30)], // আধ ঘণ্টা
    ['আজ শকাল দসটায়', at(0, 10)], // সকাল দশটায়
    ['গতকাল রাত সারে নটায়', at(-1, 21, 30)], // সাড়ে
    ['গতকাল রাত সারে নতায়', at(-1, 21, 30)], // নটায়
    ['ফোন পে দিয়ে এই মাত্রো', NOW.getTime()], // এইমাত্র
    ['काल रातरी साडे नव वाज्ता', at(-1, 21, 30)], // नव = 9 (mr), वाज्ता
    ['वे चुकीची, काल संध्याकारी सात वाजता', at(-1, 19)], // संध्याकाळी
    ['अडीच हजार रुपे कापले अर्ध्यातासा पूर्वी', ago(30)],
    ['कल दोपहर करीब धाई बजे', at(-1, 14, 30)],
    ['काल संध्याकाली साथ वाजता', at(-1, 19)], // साथ ~ सात, only before वाजता
    ['आज सुभा साधे 10 बजे', at(0, 10, 30)], // सुबह, साढ़े as Whisper writes them
    ['सुभा ज्यारा बजे एक कॉल आया', at(0, 11)],
    ['पंधरा मिनिटान कूरवी', ago(15)], // Marathi पूर्वी as Whisper writes it
    ['ಫೋನ್ಪೇ ಮೂಲಕ ಇಗ ಸ್ಟೇ ಆಯಿತು', NOW.getTime()], // ಈಗಷ್ಟೇ split in two
    ['ಇಂದು ಬಳಿಗೆ ಹತ್ತು ಗಂಟಿಗೆ', at(0, 10)], // ಬೆಳಿಗ್ಗೆ, ಗಂಟೆಗೆ
  ];
  for (const [text, want] of asr)
    it(text, () => {
      const hit = findTime(text, NOW);
      expect(hit && new Date(hit.date).getTime(), text).toBe(want);
    });
  it('folded matching does not turn ordinary words into time words', () => {
    expect(findTime('ஒரு மனிதன் கால் பண்ணாங்க', NOW)).toBeUndefined(); // மனிதன் = a person, not மணி
    expect(findTime('ఒక మనిషి ఫోన్ చేశాడు', NOW)).toBeUndefined();
    expect(findTime('around 4,999 rupees', NOW)).toBeUndefined(); // an amount, not 4 o'clock
  });
});

describe('pinned: times from the 27-28 Nov rounds', () => {
  it('articles, written amounts, dayparts at noon, weekdays', () => {
    expect(findTime('half an hour ago', NOW)?.date.getTime()).toBe(ago(30));
    expect(findTime('Rs 500 an hour ago', NOW)?.date.getTime()).toBe(ago(60)); // 500 is money, not the count
    const ev = findTime('evening', NOW)!;
    expect([ev.date.getTime(), ev.kind]).toEqual([at(-1, 19), 'daypart']); // said at noon: yesterday evening
    const wed = findTime('last wednesday', NOW)!;
    expect([wed.date.getTime(), wed.kind, wed.tolerance]).toEqual([at(-3, 12), 'date', 720]);
    expect(findTime('kal shaam 7 baje', NOW)?.date.getTime()).toBe(at(-1, 19));
  });
});

describe('a time said in the morning is never in the future', () => {
  const early = new Date('2026-11-21T08:49:00+05:30');
  it('"this morning" before 9 am and "today" before noon resolve to now, not later', () => {
    expect(findTime('இன்று காலை', early)?.date.getTime()).toBe(early.getTime());
    expect(findTime('aaj subah', early)?.date.getTime()).toBe(early.getTime());
    expect(findTime('today', early)?.date.getTime()).toBe(early.getTime());
    expect(findTime('aaj subah', NOW)?.date.getTime()).toBe(at(0, 9)); // said at noon: 9 am as before
  });
});
