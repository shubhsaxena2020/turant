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
