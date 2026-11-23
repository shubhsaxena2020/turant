// One block per slot type, on a small inline config (not tied to any domain).
import { describe, expect, it } from 'vitest';
import type { SlotDef } from '../domain/types';
import { coerce, extractAll, keypadValid, parseCorrection, pendingQuestions, questionsOf } from './slots';

const NOW = new Date(2026, 10, 21, 12, 0, 0);
const cfg = (...slots: SlotDef[]) => ({ slots });
const label = { 'en-IN': 'x' };
const one = (s: SlotDef, text: string, hint?: string) => extractAll(cfg(s), text, { now: NOW, hint })[s.key]?.value;

describe('amount', () => {
  const s: SlotDef = { key: 'amt', type: 'amount', label };
  it('rupees in words, digits and scripts', () => {
    expect(one(s, 'saade chaar sau rupaye')).toBe(450);
    expect(one(s, '₹1,250')).toBe(1250);
    expect(one(s, 'ಐದು ಸಾವಿರ ರೂಪಾಯಿ')).toBe(5000);
    expect(one(s, 'மூன்று ஆயிரம் ரூபாய்')).toBe(3000);
  });
  it('a bare number only when asked, or with a cue word', () => {
    expect(one(s, 'Ramesh ka 450')).toBeUndefined();
    expect(one(s, '450', 'amt')).toBe(450);
    expect(one({ ...s, cues: ['udhaar'] } as SlotDef, '450 udhaar')).toBe(450);
  });
});

describe('datetime', () => {
  const s: SlotDef = { key: 'when', type: 'datetime', label };
  it('relative and absolute past times', () => {
    expect((NOW.getTime() - new Date(String(one(s, '2 ghante pehle'))).getTime()) / 60_000).toBeCloseTo(120);
    expect(new Date(String(one(s, 'kal raat 10 baje'))).getHours()).toBe(22);
  });
});

describe('duration', () => {
  const s: SlotDef = { key: 'd', type: 'duration', label };
  it.each([
    ['teen din se bukhar', 3],
    ['for two weeks', 14],
    ['ek mahine se', 30],
    ['மூன்று நாட்களாக', 3],
    ['ಎರಡು ವಾರದಿಂದ', 14],
    ['তিন দিন ধরে', 3],
    ['kal se', 1],
  ])('%s -> %d days', (text, days) => {
    expect(one(s, text)).toBe(days);
  });
  it('"10 din pehle" is a point in time, not a duration', () => {
    expect(one(s, '10 din pehle')).toBeUndefined();
  });
  it('a bare number of days when asked', () => {
    expect(one(s, '4', 'd')).toBe(4);
  });
});

describe('phone and digits', () => {
  const phone: SlotDef = { key: 'ph', type: 'phone', label };
  const aadhaar: SlotDef = { key: 'aadhaar', type: 'digits', length: 12, context: ['aadhaar', 'aadhar', 'आधार'], label };
  const acct: SlotDef = { key: 'acct', type: 'digits', min: 9, max: 18, mask: true, context: ['account'], label };
  it('mobile numbers with +91 / spaces / digit words', () => {
    expect(one(phone, 'mera number +91 98450 12345 hai')).toBe('9845012345');
    expect(one(phone, 'nine eight four five zero one two three four five')).toBe('9845012345');
  });
  it('exact-length digits and range digits with context', () => {
    const c = cfg(phone, aadhaar, acct);
    expect(extractAll(c, 'aadhaar 1234 5678 9012').aadhaar?.value).toBe('123456789012');
    expect(extractAll(c, 'account 50100234567812').acct?.value).toBe('50100234567812');
    expect(extractAll(c, '50100234567812').acct).toBeUndefined();
  });
  it('keypad validation', () => {
    expect(keypadValid(phone, '9845012345')).toBe(true);
    expect(keypadValid(phone, '1845012345')).toBe(false);
    expect(keypadValid(aadhaar, '123456789012')).toBe(true);
    expect(keypadValid(aadhaar, '12345')).toBe(false);
  });
});

describe('upi', () => {
  const s: SlotDef = { key: 'upi', type: 'upi', label };
  it('spoken and written UPI IDs, not e-mails', () => {
    expect(one(s, 'shop dot ramesh at okaxis')).toBe('shop.ramesh@okaxis');
    expect(one(s, 'ramesh@ybl')).toBe('ramesh@ybl');
    expect(one(s, 'mail me at ramesh@gmail.com')).toBeUndefined();
  });
});

describe('enum', () => {
  const single: SlotDef = {
    key: 'mode', type: 'enum', label,
    options: [
      { value: 'credit', label, keywords: ['udhaar', 'उधार', 'ಸಾಲ'] },
      { value: 'cash', label, keywords: ['cash', 'nakad', 'नकद'] },
      { value: 'other', label, keywords: ['kuch aur'], hintOnly: true },
    ],
  };
  const multi: SlotDef = {
    key: 'sym', type: 'enum', multi: true, label,
    options: [
      { value: 'fever', label, keywords: ['fever', 'bukhar', 'காய்ச்சல்', 'ಜ್ವರ'] },
      { value: 'cough', label, keywords: ['cough', 'khansi', 'இருமல்', 'ಕೆಮ್ಮು'] },
      { value: 'headache', label, keywords: ['headache', 'sar dard', 'தலைவலி'] },
    ],
  };
  it('keywords across scripts', () => {
    expect(one(single, 'उधार लिख दो')).toBe('credit');
    expect(one(single, 'ಸಾಲ ಬರೆಯಿರಿ')).toBe('credit');
    expect(one(single, 'nakad diye')).toBe('cash');
  });
  it('hint-only options', () => {
    expect(one(single, 'kuch aur')).toBeUndefined();
    expect(one(single, 'kuch aur', 'mode')).toBe('other');
  });
  it('multi-select collects every option, drops negated ones', () => {
    expect(one(multi, 'bukhar aur khansi hai')).toEqual(['fever', 'cough']);
    expect(one(multi, 'bukhar hai, khansi nahi hai')).toEqual(['fever']);
    expect(one(multi, 'no fever, only headache')).toEqual(['headache']);
    expect(one(multi, 'காய்ச்சல், இருமல் இருக்கு')).toEqual(['fever', 'cough']);
    expect(one(multi, 'ಜ್ವರ ಇಲ್ಲ, ಕೆಮ್ಮು ಇದೆ')).toEqual(['cough']);
  });
  it('corrections prefer the last option said', () => {
    expect(extractAll(cfg(single), 'cash nahi, udhaar', { preferLast: true }).mode?.value).toBe('credit');
  });
});

describe('name', () => {
  const s: SlotDef = { key: 'who', type: 'name', label, markers: ['customer'] };
  it.each([
    ['Ramesh ne 3 kilo chawal liya', 'Ramesh'],
    ['Ramesh Kumar ne 500 diye', 'Ramesh Kumar'],
    ['रमेश ने तेल लिया', 'रमेश'],
    ['mera naam Sunita hai', 'Sunita'],
    ['patient ka naam sunita devi hai', 'Sunita Devi'],
    ['my name is Meena', 'Meena'],
    ['என் பெயர் லட்சுமி, வயது 62', 'லட்சுமி'],
    ['ನನ್ನ ಹೆಸರು ರಮೇಶ್', 'ರಮೇಶ್'],
    ['customer Anil', 'Anil'],
    ['Priya took two packets of milk', 'Priya'],
  ])('%s -> %s', (text, name) => {
    expect(one(s, text)).toBe(name);
  });
  it('pronouns and common nouns are not names', () => {
    expect(one(s, 'maine 3 kilo chawal liya')).toBeUndefined();
    expect(one(s, 'ek aadmi ne call kiya')).toBeUndefined();
  });
  it('answering the name question takes the answer', () => {
    expect(one(s, 'Sharma ji', 'who')).toBe('Sharma');
    expect(one(s, 'naam hai Kavya', 'who')).toBe('Kavya');
    expect(one(s, 'pata nahi', 'who')).toBeUndefined();
  });
});

describe('text', () => {
  const s: SlotDef = {
    key: 'where', type: 'text', label,
    markers: [
      { words: ['near', 'opposite'], take: 'after', keep: true },
      { words: ['ke paas', 'ಹತ್ತಿರ'], take: 'before', keep: true },
    ],
  };
  const ward: SlotDef = { key: 'ward', type: 'text', label, markers: [{ words: ['ward', 'ವಾರ್ಡ್'], take: 'clause' }] };
  it('captures around markers, inside one clause', () => {
    expect(one(s, 'big pothole near the bus stop, 5th Cross')).toBe('near the bus stop');
    expect(one(s, 'school ke paas kachra hai')).toBe('school ke paas');
    expect(one(s, 'ನಮ್ಮ ರಸ್ತೆ, ಶಿವ ದೇವಸ್ಥಾನದ ಹತ್ತಿರ')).toBe('ಶಿವ ದೇವಸ್ಥಾನದ ಹತ್ತಿರ');
    expect(one(ward, 'pothole hai, Jayanagar ward 167. Do hafte se')).toBe('Jayanagar ward 167');
  });
  it('answering the question takes the whole answer', () => {
    expect(one(s, 'Main market, gate 2', 'where')).toBe('Main market, gate 2');
  });
});

describe('number', () => {
  const ageS: SlotDef = { key: 'age', type: 'number', units: ['saal', 'years', 'வயது', 'ವಯಸ್ಸು'], min: 0, max: 120, label };
  const tempS: SlotDef = { key: 'temp', type: 'number', units: ['degree', 'डिग्री'], min: 93, max: 108, label };
  const c = cfg(ageS, tempS);
  it('unit words pick the right number', () => {
    const e = extractAll(c, 'umar 45 saal, bukhar 102 degree');
    expect(e.age?.value).toBe(45);
    expect(e.temp?.value).toBe(102);
    expect(extractAll(c, 'வயது 62').age?.value).toBe(62);
    expect(extractAll(c, '101°F').temp?.value).toBe(101);
    expect(extractAll(c, 'bukhar 101.5 डिग्री').temp?.value).toBe(101.5);
  });
  it('a bare number only when asked, and only in range', () => {
    expect(extractAll(c, '45').age).toBeUndefined();
    expect(extractAll(c, '45', { hint: 'age' }).age?.value).toBe(45);
    expect(extractAll(c, '45', { hint: 'temp' }).temp).toBeUndefined();
  });
  it('sentence boundaries split numbers ("62. three days" is not 65)', () => {
    expect(extractAll(c, 'வயது 62. மூன்று நாட்களாக').age?.value).toBe(62);
  });
});

describe('quantity+unit', () => {
  const s: SlotDef = { key: 'items', type: 'quantity+unit', label, items: [{ name: { 'en-IN': 'Rice', 'hi-IN': 'चावल' }, keywords: ['chawal', 'rice', 'चावल', 'அரிசி'] }] };
  it('several items with units, catalogue names, half-kilo', () => {
    expect(one(s, '3 kilo chawal aur 2 litre tel')).toEqual([
      { qty: 3, unit: 'kg', item: 'Rice' },
      { qty: 2, unit: 'L', item: 'Tel' },
    ]);
    expect(one(s, 'aadha kilo cheeni')).toEqual([{ qty: 0.5, unit: 'kg', item: 'Cheeni' }]);
    expect(one(s, '2 packets of biscuits')).toEqual([{ qty: 2, unit: 'packet', item: 'Biscuits' }]);
    expect(one(s, '2 கிலோ அரிசி')).toEqual([{ qty: 2, unit: 'kg', item: 'Rice' }]);
    expect(one(s, '500g dal')).toEqual([{ qty: 500, unit: 'g', item: 'Dal' }]);
  });
});

describe('yesno', () => {
  const s: SlotDef = { key: 'preg', type: 'yesno', keywords: ['pregnant', 'गर्भवती', 'கர்ப்ப'], label };
  it('topic alone = yes, topic + negation = no', () => {
    expect(one(s, 'woh pregnant hai')).toBe(true);
    expect(one(s, 'pregnant nahi hai')).toBe(false);
    expect(one(s, 'not pregnant')).toBe(false);
    expect(one(s, 'கர்ப்பமாக இல்லை')).toBe(false);
    expect(one(s, 'bukhar hai')).toBeUndefined();
  });
  it('plain yes / no when asked', () => {
    expect(one(s, 'haan', 'preg')).toBe(true);
    expect(one(s, 'இல்லை', 'preg')).toBe(false);
    expect(one(s, 'ಹೌದು', 'preg')).toBe(true);
  });
});

describe('questions', () => {
  const c = {
    slots: [
      { key: 'a', type: 'amount', required: true, label },
      { key: 'opt', type: 'text', label },
      { key: 'u', type: 'upi', group: 'g', ask: true, label },
      { key: 'p', type: 'phone', group: 'g', ask: true, keypad: true, label },
      { key: 'y', type: 'yesno', keywords: ['x'], ask: true, askIf: (f) => Number(f.a?.value) > 10, label },
    ] as SlotDef[],
    groups: { g: { label, confirm: 'explicit' as const } },
  };
  it('required first, groups asked once, askIf respected, optional not asked', () => {
    expect(pendingQuestions(c, {})).toEqual(['a', 'g']);
    expect(pendingQuestions(c, { a: { value: 50, confidence: 1, source: 'typed' } })).toEqual(['g', 'y']);
    expect(pendingQuestions(c, { p: { value: '9845012345', confidence: 1, source: 'typed' } })).toEqual(['a']);
    const g = questionsOf(c).find((q) => q.key === 'g')!;
    expect(g.explicit).toBe(true);
    expect(g.keypad?.key).toBe('p');
  });
});

describe('corrections and coercion', () => {
  const c = cfg(
    { key: 'age', type: 'number', units: ['saal'], min: 0, max: 120, label: { 'en-IN': 'Age', 'hi-IN': 'उम्र' }, aliases: ['umar'] },
    { key: 'name', type: 'name', label: { 'en-IN': 'Name' }, aliases: ['naam'] },
  );
  it('a slot named by alias or label', () => {
    expect(parseCorrection(c, 'umar galat hai, 46 saal')).toMatchObject({ field: 'age', value: 46 });
    expect(parseCorrection(c, 'उम्र 50 है')).toMatchObject({ field: 'age', value: 50 });
  });
  it('coerce validates untrusted values per type', () => {
    expect(coerce({ key: 'p', type: 'phone', label }, '+91 98450-12345')).toBe('9845012345');
    expect(coerce({ key: 'p', type: 'phone', label }, '12345')).toBeUndefined();
    expect(coerce({ key: 'e', type: 'enum', label, options: [{ value: 'fever', label: { 'en-IN': 'Fever' }, keywords: [] }] }, 'Fever')).toBe('fever');
    expect(coerce({ key: 'n', type: 'number', min: 90, max: 110, label }, '150')).toBeUndefined();
  });
});
