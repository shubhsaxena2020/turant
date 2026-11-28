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
  ['आज दोपहर 3 बजे', at(-1, 15)], // said at noon, 3 pm today has not happened: never a future time (round 62)
  ['परसों रात 11 बजे फोन आया', at(-2, 23)],
  ['कल सुबह 8 बजे', at(-1, 8)],
  ['two hours back', ago(120)],
  ['yesterday at 6:45 pm', at(-1, 18, 45)],
  ['this morning around 9 they called', at(0, 9)],
  ['পাঁচ মিনিট আগে', ago(5)],
  ['গতকাল রাত এগারোটায়', at(-1, 23)],
  ['আজ বিকেল চারটায়', at(-1, 16)], // same: 4 pm today is still ahead at noon
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

// The harness clock is fixed at noon, so time-of-day logic needs its own check: the same phrases said at
// 07:00, 11:59, 12:01, 23:50 and 00:10. A fraud report's time is never in the future; "kal" is yesterday.
describe('time of day: never in the future, at any clock', () => {
  const P: Record<string, { today: string[]; yest: string[]; ago: string[]; pastOnly: string[] }> = {
    en: { today: ['this morning', 'this afternoon', 'today', 'today morning'], yest: ['yesterday', 'yesterday night'], ago: ['an hour ago', 'one hour ago'], pastOnly: ['last night', 'at 11:30'] },
    hi: { today: ['aaj subah', 'aaj dopahar', 'aaj raat', 'aaj', 'आज सुबह', 'आज दोपहर', 'आज रात', 'आज'], yest: ['kal', 'kal raat', 'kal shaam', 'कल', 'कल रात'], ago: ['ek ghante pehle', 'एक घंटे पहले'], pastOnly: ['11:30 baje'] },
    mr: { today: ['आज सकाळी', 'आज दुपारी', 'आज रात्री', 'आज'], yest: ['काल', 'काल रात्री'], ago: ['एक तासापूर्वी'], pastOnly: [] },
    bn: { today: ['আজ সকালে', 'আজ দুপুরে', 'আজ রাতে', 'আজ'], yest: ['গতকাল', 'গতকাল রাতে', 'কাল'], ago: ['এক ঘণ্টা আগে'], pastOnly: [] },
    ta: { today: ['இன்று காலை', 'இன்று மதியம்', 'இன்று இரவு', 'இன்று'], yest: ['நேற்று', 'நேற்று இரவு'], ago: ['ஒரு மணி நேரத்துக்கு முன்'], pastOnly: [] },
    te: { today: ['ఈరోజు ఉదయం', 'ఈరోజు మధ్యాహ్నం', 'ఈరోజు రాత్రి', 'ఈరోజు'], yest: ['నిన్న', 'నిన్న రాత్రి'], ago: ['ఒక గంట క్రితం'], pastOnly: [] },
    kn: { today: ['ಇಂದು ಬೆಳಿಗ್ಗೆ', 'ಇಂದು ಮಧ್ಯಾಹ್ನ', 'ಇಂದು ರಾತ್ರಿ', 'ಇಂದು'], yest: ['ನಿನ್ನೆ', 'ನಿನ್ನೆ ರಾತ್ರಿ'], ago: ['ಒಂದು ಗಂಟೆ ಹಿಂದೆ'], pastOnly: [] },
  };
  for (const clock of ['07:00', '11:59', '12:01', '23:50', '00:10']) {
    it(`said at ${clock}`, () => {
      const now = new Date(`2026-11-21T${clock}:00+05:30`);
      const yday = new Date(now);
      yday.setDate(yday.getDate() - 1);
      for (const [lang, g] of Object.entries(P)) {
        for (const t of [...g.today, ...g.yest, ...g.ago, ...g.pastOnly]) {
          const r = findTime(t, now);
          expect(r, `${lang} "${t}" at ${clock}: a time`).toBeDefined();
          expect(r!.date.getTime(), `${lang} "${t}" at ${clock}: not in the future`).toBeLessThanOrEqual(now.getTime());
        }
        for (const t of g.yest) expect(findTime(t, now)!.date.getDate(), `${lang} "${t}" at ${clock}: yesterday`).toBe(yday.getDate());
        for (const t of g.ago) expect(findTime(t, now)!.date.getTime(), `${lang} "${t}" at ${clock}: an hour ago`).toBe(now.getTime() - 3600_000);
      }
    });
  }
  it('"tonight" said in the morning is the night just gone; "this afternoon" before it is earlier today', () => {
    const seven = new Date('2026-11-21T07:00:00+05:30');
    expect(findTime('आज रात', seven)!.date.getTime()).toBe(new Date('2026-11-20T21:00:00+05:30').getTime());
    expect(findTime('aaj dopahar', seven)!.date.getTime()).toBe(seven.getTime());
    expect(findTime('aaj raat', new Date('2026-11-21T23:50:00+05:30'))!.date.getTime()).toBe(new Date('2026-11-21T21:00:00+05:30').getTime());
  });
});

describe('a bare 7-12 o\'clock is the most recent past occurrence', () => {
  const at = (iso: string) => new Date(iso + '+05:30').getTime();
  const cases: [string, string][] = [
    ['07:00', '2026-11-20T23:30:00'],
    ['11:59', '2026-11-21T11:30:00'],
    ['12:01', '2026-11-21T11:30:00'],
    ['23:50', '2026-11-21T23:30:00'],
    ['00:10', '2026-11-20T23:30:00'],
  ];
  for (const [clock, want] of cases) {
    it(`"at 11:30" / "11:30 baje" said at ${clock}`, () => {
      const now = new Date(`2026-11-21T${clock}:00+05:30`);
      expect(findTime('at 11:30', now)!.date.getTime()).toBe(at(want));
      expect(findTime('11:30 baje', now)!.date.getTime()).toBe(at(want));
    });
  }
  it('am / pm, a 24-hour time, a part of the day or a day keep their meaning', () => {
    const late = new Date('2026-11-21T00:10:00+05:30');
    expect(findTime('at 11:30 am', late)!.date.getTime()).toBe(at('2026-11-20T11:30:00'));
    expect(findTime('at 11:30 pm', late)!.date.getTime()).toBe(at('2026-11-20T23:30:00'));
    expect(findTime('at 14:30', new Date('2026-11-21T12:01:00+05:30'))!.date.getTime()).toBe(at('2026-11-20T14:30:00'));
    expect(findTime('subah 11 baje', late)!.date.getTime()).toBe(at('2026-11-20T11:00:00'));
    expect(findTime('kal 10 baje', NOW)!.date.getTime()).toBe(at('2026-11-20T10:00:00'));
    expect(findTime('3 baje', NOW)!.date.getTime()).toBe(at('2026-11-20T15:00:00')); // 1-6 still mean pm
  });
});

describe('the invariant: no resolved time is later than now (round 62)', () => {
  const phrases = ['3 baje', 'shaam 7 baje', 'aaj shaam 7 baje', 'aaj 3 baje', 'आज रात 10 बजे', 'today at 5 pm', 'at 12:20', 'aaj subah 11 baje',
    'இன்று மாலை 6 மணிக்கு', 'আজ বিকেল চারটায়', 'आज दोपहर 3 बजे', 'ఈరోజు సాయంత్రం 6 గంటలకు', 'ಇಂದು ಸಂಜೆ 6 ಗಂಟೆಗೆ', 'आज संध्याकाळी 6 वाजता',
    'this morning', 'this afternoon', 'today', 'aaj raat', 'at 11:30', '11:30 baje', 'yesterday at 9 pm', 'kal raat 10 baje', 'an hour ago'];
  for (const clock of ['07:00', '10:00', '11:59', '12:01', '23:50', '00:10']) {
    it(`said at ${clock}`, () => {
      const now = new Date(`2026-11-21T${clock}:00+05:30`);
      for (const t of phrases) {
        const r = findTime(t, now);
        if (r) expect(r.date.getTime(), `"${t}" at ${clock}`).toBeLessThanOrEqual(now.getTime());
      }
    });
  }
  it('a little ahead is a rounded now; well ahead is the day before', () => {
    const now = new Date('2026-11-21T11:59:00+05:30');
    expect(findTime('at 12:20', now)!.date.getTime()).toBe(now.getTime());
    expect(findTime('today at 5 pm', now)!.date.getTime()).toBe(new Date('2026-11-20T17:00:00+05:30').getTime());
  });
});
