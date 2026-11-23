// Language primitives shared by every slot extractor. Ported from Turant's
// battle-tested extract.ts. Pure functions only: no DOM, no network. Works offline.
// Handles Hinglish (romanised Hindi), English, Devanagari Hindi/Marathi and the most
// common words in Bengali, Tamil, Telugu and Kannada.
//
// Adding a language: add its number words to UNITS/HUNDRED/MULTS, its time words to
// the unit lists below, and its yes/no/skip words to the intent lists. Keywords in
// Indian scripts match as substrings (they agglutinate: ದಿನದಿಂದ, நாட்களாக), Latin ones
// match whole words.

import type { LangCode } from './lang';
import { fold } from './indic/numbers';
import { romanize, soundKey } from './indic/bank';

// ---------------------------------------------------------------------------
// Normalisation
// ---------------------------------------------------------------------------

const DIGIT_BLOCKS = [0x0966, 0x09e6, 0x0a66, 0x0ae6, 0x0b66, 0x0be6, 0x0c66, 0x0ce6, 0x0d66];
const NATIVE_DIGIT_RE = /[०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯]/g;

/** Light normalisation used for every word list and every input. */
export function normalizeWord(input: string): string {
  return input
    .normalize('NFC')
    .toLowerCase()
    .replace(/[​-‍﻿]/g, '') // zero-width joiners (common in Kannada/Telugu)
    .replace(/[़়਼઼଼಼]/g, '') // nukta: हज़ार -> हजार
    .replace(/ँ/g, 'ं') // chandrabindu -> anusvara: पाँच -> पांच
    .replace(/ঁ/g, 'ং');
}

export function foldDigits(s: string): string {
  return s.replace(NATIVE_DIGIT_RE, (ch) => {
    const c = ch.codePointAt(0)!;
    const base = DIGIT_BLOCKS.find((b) => c >= b && c <= b + 9)!;
    return String(c - base);
  });
}

const ACRONYMS = new Set(['sbi', 'hdfc', 'icici', 'pnb', 'bob', 'boi', 'iob', 'uco', 'idfc', 'upi', 'utr', 'kyc', 'otp', 'qr', 'rbl', 'bp', 'kg', 'bbmp']);

export function normalize(input: string): string {
  let s = foldDigits(normalizeWord(input));
  s = s.replace(/o['’]?\s?clock/g, 'oclock');
  s = s.replace(/\+\s?91[\s-]*(?=\d)/g, ' '); // +91 country code
  s = s.replace(/₹\s*/g, ' ₹ ');
  s = s.replace(/\s*°\s*(?:[fc](?![a-z]))?/g, ' degree '); // 101°F
  s = s.replace(/(\d),(?=\d)/g, '$1'); // 4,999 and 1,00,000
  s = s.replace(/(^|[^a-z])(rs|inr)\.?(?=\s|\d|$)/g, '$1 rs ');
  s = s.replace(/(\d)(rs|rupees?|rupaye|rupay)\b/g, '$1 $2');
  s = s.replace(/(\d)(kg|kilo|gm|g|ml|l|ltr|litre|liter)\b/g, '$1 $2'); // 3kg, 500g
  s = s.replace(/(\d+(?:\.\d+)?)\s?k\b/g, '$1 thousand');
  s = s.replace(/(\d+)\s*\/-/g, '$1 ');
  s = s.replace(/\bhalf an? (?=[a-z])/g, 'half '); // "half a kilo\"
  // "s b i" spelled out by the recogniser -> "sbi"
  s = s.replace(/\b(?:[a-z] ){1,4}[a-z]\b/g, (m) => {
    const joined = m.replace(/ /g, '');
    return ACRONYMS.has(joined) ? joined : m;
  });
  return s.replace(/\s+/g, ' ').trim();
}

/** Clause boundary token: number runs never cross it ("வயது 62. மூன்று நாட்களாக" is 62 and 3, not 65). */
export const BOUNDARY = '¦';

export function tokenize(s: string): string[] {
  const out: string[] = [];
  const marked = s.replace(/[,;!?।॥]+|\.(?=\s|$)/g, ` ${BOUNDARY} `);
  for (const raw of marked.split(/[\s,!?;"“”'‘’()[\]{}।॥|/\\]+/)) {
    if (raw === BOUNDARY) {
      if (out.length && out[out.length - 1] !== BOUNDARY) out.push(BOUNDARY);
      continue;
    }
    // keep clock times like 7:30 / 7:30pm together, split any other colon
    const parts = /^\d{1,2}:\d{2}(am|pm)?\.?$/.test(raw) ? [raw] : raw.split(':');
    for (const part of parts) {
      const tok = part.replace(/^[.\-+*_]+|[.\-+*_]+$/g, '');
      if (!tok) continue;
      if (/^\d+(-\d+)+$/.test(tok)) out.push(...tok.split('-'));
      else out.push(tok);
    }
  }
  return out;
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export const isLatin = (tok: string) => /^[a-z0-9]+$/.test(tok);

// ---------------------------------------------------------------------------
// Word lists (normalised once at load time)
// ---------------------------------------------------------------------------

export const nw = (w: string) => normalizeWord(w);
export const wordSet = (words: string[]) => new Set(words.map(nw));
const map = (obj: Record<string, number>) => {
  const m = new Map<string, number>();
  for (const [k, v] of Object.entries(obj)) m.set(nw(k), v);
  return m;
};

const UNITS = map({
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
  nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
  // Hinglish
  shunya: 0, ek: 1, do: 2, teen: 3, char: 4, chaar: 4, paanch: 5, panch: 5, paach: 5, panj: 5,
  chhe: 6, chhah: 6, chah: 6, che: 6, cheh: 6, chhey: 6, saat: 7, aath: 8, aat: 8, nau: 9,
  das: 10, dus: 10, gyarah: 11, gyara: 11, barah: 12, bara: 12, terah: 13, tera: 13, chaudah: 14, chauda: 14,
  pandrah: 15, pandra: 15, solah: 16, sola: 16, satrah: 17, satra: 17, atharah: 18, athara: 18, unnis: 19,
  unnees: 19, bees: 20, pachis: 25, pachees: 25, pachchis: 25, tees: 30, chalis: 40, chaalis: 40,
  pachas: 50, pachaas: 50, saath: 60, sattar: 70, assi: 80, nabbe: 90,
  // Devanagari (Hindi + Marathi)
  'शून्य': 0, 'एक': 1, 'दो': 2, 'दोन': 2, 'तीन': 3, 'चार': 4, 'पांच': 5, 'पाँच': 5, 'पाच': 5, 'छह': 6, 'छः': 6,
  'छे': 6, 'सहा': 6, 'सात': 7, 'आठ': 8, 'नौ': 9, 'नऊ': 9, 'दस': 10, 'दहा': 10, 'ग्यारह': 11, 'बारह': 12,
  'तेरह': 13, 'चौदह': 14, 'पंद्रह': 15, 'पन्द्रह': 15, 'सोलह': 16, 'सत्रह': 17, 'अठारह': 18, 'उन्नीस': 19,
  'बीस': 20, 'वीस': 20, 'पच्चीस': 25, 'तीस': 30, 'चालीस': 40, 'पचास': 50, 'पन्नास': 50, 'साठ': 60,
  'सत्तर': 70, 'अस्सी': 80, 'नब्बे': 90,
  // Bengali
  'শূন্য': 0, 'এক': 1, 'দুই': 2, 'দু': 2, 'তিন': 3, 'চার': 4, 'পাঁচ': 5, 'ছয়': 6, 'সাত': 7, 'আট': 8,
  'দশ': 10, 'বিশ': 20, 'কুড়ি': 20, 'ত্রিশ': 30, 'চল্লিশ': 40, 'পঞ্চাশ': 50, 'ষাট': 60, 'সত্তর': 70, 'আশি': 80, 'নব্বই': 90,
  // Tamil (spoken forms too: ரெண்டு, மூணு, நாலு, அஞ்சு)
  'பூஜ்யம்': 0, 'ஒன்று': 1, 'ஒரு': 1, 'இரண்டு': 2, 'ரெண்டு': 2, 'மூன்று': 3, 'மூணு': 3, 'நான்கு': 4, 'நாலு': 4,
  'ஐந்து': 5, 'அஞ்சு': 5, 'ஆறு': 6, 'ஏழு': 7, 'எட்டு': 8, 'ஒன்பது': 9, 'பத்து': 10, 'இருபது': 20, 'முப்பது': 30,
  'நாற்பது': 40, 'ஐம்பது': 50, 'அறுபது': 60, 'எழுபது': 70, 'எண்பது': 80, 'தொண்ணூறு': 90,
  // Telugu
  'సున్నా': 0, 'ఒకటి': 1, 'ఒక': 1, 'రెండు': 2, 'మూడు': 3, 'నాలుగు': 4, 'ఐదు': 5, 'ఆరు': 6, 'ఏడు': 7, 'ఎనిమిది': 8,
  'తొమ్మిది': 9, 'పది': 10, 'ఇరవై': 20, 'ముప్పై': 30, 'నలభై': 40, 'యాభై': 50,
  // Kannada
  'ಸೊನ್ನೆ': 0, 'ಒಂದು': 1, 'ಒಂದ': 1, 'ಎರಡು': 2, 'ಮೂರು': 3, 'ನಾಲ್ಕು': 4, 'ಐದು': 5, 'ಆರು': 6, 'ಏಳು': 7, 'ಎಂಟು': 8,
  'ಒಂಬತ್ತು': 9, 'ಹತ್ತು': 10, 'ಇಪ್ಪತ್ತು': 20, 'ಮೂವತ್ತು': 30, 'ನಲವತ್ತು': 40, 'ಐವತ್ತು': 50, 'ಅರವತ್ತು': 60,
  'ಎಪ್ಪತ್ತು': 70, 'ಎಂಬತ್ತು': 80, 'ತೊಂಬತ್ತು': 90,
});
// "oh" (as in "nine eight oh") is only a digit inside a digit run.
const DIGIT_ONLY_WORDS = wordSet(['oh']);
UNITS.set('oh', 0);

const HUNDRED = wordSet(['hundred', 'sau', 'सौ', 'शंभर', 'শো', 'நூறு', 'వంద', 'ನೂರು']);
const MULTS = map({
  thousand: 1000, hazaar: 1000, hazar: 1000, hajar: 1000, hajaar: 1000, hazzar: 1000, 'हजार': 1000, 'हज़ार': 1000,
  lakh: 100000, lakhs: 100000, lac: 100000, lacs: 100000, laakh: 100000, lak: 100000, 'लाख': 100000,
  million: 1000000,
  crore: 10000000, crores: 10000000, karod: 10000000, karor: 10000000, 'करोड़': 10000000, 'करोड': 10000000,
  // Bengali / Tamil / Telugu / Kannada thousand & lakh
  'হাজার': 1000, 'লাখ': 100000, 'ஆயிரம்': 1000, 'லட்சம்': 100000, 'వేలు': 1000, 'వెయ్యి': 1000, 'లక్ష': 100000,
  'ಸಾವಿರ': 1000, 'ಲಕ್ಷ': 100000,
});
const FRAC_PREFIX = map({ saade: 0.5, sade: 0.5, saadhe: 0.5, sadhe: 0.5, 'साढ़े': 0.5, 'साडे': 0.5, sava: 0.25, sawa: 0.25, 'सवा': 0.25, paune: -0.25, pone: -0.25, 'पौने': -0.25 });
const STANDALONE = map({
  dedh: 1.5, derh: 1.5, dhed: 1.5, 'डेढ़': 1.5, 'दीड': 1.5, dhai: 2.5, dhaai: 2.5, adhai: 2.5, 'ढाई': 2.5, 'अढ़ाई': 2.5, 'अडीच': 2.5,
  aadha: 0.5, adha: 0.5, aadhi: 0.5, half: 0.5, 'आधा': 0.5, 'आधी': 0.5, 'অর্ধেক': 0.5, 'আধা': 0.5, 'அரை': 0.5, 'ಅರ್ಧ': 0.5, 'అర': 0.5,
  'একশো': 100,
});
const REPEAT = map({ double: 2, triple: 3, 'डबल': 2, 'ट्रिपल': 3 });

const CURRENCY_EXACT = wordSet(['rs', 'inr', '₹', 'rupaye', 'rupaiye', 'rupay', 'rupee', 'rupees', 'rupiya', 'rupiye', 'rupya', 'rupaiya', 'টাকা', 'টাকার']);
const CURRENCY_PREFIX = ['rupa', 'rupe', 'rupi', 'rupy', 'रुपय', 'रुपए', 'रुपये', 'रूपय', 'रूपए', 'रुपै', 'রুপি', 'টাকা', 'ரூபா', 'రూపాయ', 'ರೂಪಾಯ'].map(nw);

const MINUTE_UNITS = ['minute', 'minutes', 'min', 'mins', 'minat', 'mint', 'mnt', 'मिनट', 'मिनिट', 'মিনিট', 'நிமிட', 'నిమిష', 'ನಿಮಿಷ'].map(nw);
const HOUR_UNITS = ['hour', 'hours', 'hr', 'hrs', 'ghanta', 'ghante', 'ghanton', 'घंटा', 'घंटे', 'घंटों', 'तास', 'ঘণ্টা', 'ঘন্টা', 'மணிநேர', 'மணி நேர', 'గంట', 'ಗಂಟೆ'].map(nw);
const DAY_UNITS = ['day', 'days', 'din', 'dino', 'dinon', 'दिन', 'दिवस', 'দিন', 'நாள', 'நாட்க', 'రోజు', 'రోజుల', 'ದಿನ'].map(nw);
const WEEK_UNITS = ['week', 'weeks', 'hafta', 'hafte', 'hafton', 'haftey', 'saptah', 'हफ्ता', 'हफ्ते', 'हफ्तों', 'सप्ताह', 'आठवडा', 'आठवडे', 'आठवड्या', 'সপ্তাহ', 'வார', 'వారం', 'వారాల', 'ವಾರ'].map(nw);
const MONTH_UNITS = ['month', 'months', 'mahina', 'mahine', 'mahino', 'mahinon', 'महीना', 'महीने', 'महिना', 'महिने', 'মাস', 'மாத', 'నెల', 'ತಿಂಗಳ'].map(nw);
export const AGO = ['pehle', 'pahle', 'phele', 'pehele', 'pahile', 'ago', 'back', 'before', 'पहले', 'पहिले', 'पूर्वी', 'आधी', 'আগে', 'முன்', 'முன்பு', 'முன்னாடி', 'క్రితం', 'ಹಿಂದೆ'].map(nw);
const ELAPSED = wordSet(['hua', 'hue', 'huye', 'hogaye', 'ho', 'हुआ', 'हुए', 'हो']);

const CLOCK_MARKERS = wordSet(['baje', 'bje', 'baj', 'bajhe', 'oclock', 'बजे', 'बज', 'वाजता', 'वाजे', 'মণিক্কு', 'மணிக்கு', 'మణి', 'గంటలకు', 'ಗಂಟೆಗೆ']);
const PM = wordSet(['pm', 'p.m', 'p.m.']);
const AM = wordSet(['am', 'a.m', 'a.m.']);

type DayPart = 'morning' | 'afternoon' | 'evening' | 'night';
const DAYPARTS: [DayPart, string[]][] = [
  ['morning', ['subah', 'subha', 'subeh', 'savere', 'morning', 'सुबह', 'सवेरे', 'सकाळी', 'सकाळ', 'সকাল', 'সকালে', 'காலை', 'ఉదయం', 'ಬೆಳಿಗ್ಗೆ']],
  ['afternoon', ['dopahar', 'dopehar', 'dupahar', 'dophar', 'afternoon', 'noon', 'दोपहर', 'दुपारी', 'দুপুর', 'দুপুরে', 'மதியம்', 'మధ్యాహ్నం', 'ಮಧ್ಯಾಹ್ನ']],
  ['evening', ['shaam', 'sham', 'shām', 'evening', 'शाम', 'संध्याकाळी', 'সন্ধ্যা', 'সন্ধ্যায়', 'மாலை', 'సాయంత్రం', 'ಸಂಜೆ']],
  ['night', ['raat', 'night', 'tonight', 'रात', 'रात्री', 'রাত', 'রাতে', 'இரவு', 'రాత్రి', 'ರಾತ್ರಿ']],
];
const DAYPART_HOUR: Record<DayPart, number> = { morning: 9, afternoon: 14, evening: 19, night: 22 };

export const DAY_WORDS: [number, string[]][] = [
  [0, ['aaj', 'today', 'आज', 'আজ', 'இன்று', 'ఈరోజు', 'ಇಂದು']],
  [-1, ['kal', 'kaal', 'yesterday', 'कल', 'काल', 'গতকাল', 'কাল', 'நேற்று', 'నిన్న', 'ನಿನ್ನೆ']],
  [-2, ['parso', 'parson', 'parsoon', 'परसों', 'परसो', 'परवा', 'পরশু', 'முந்தாநாள்', 'మొన్న', 'ಮೊನ್ನೆ']],
];
const NOW_WORDS = ['abhi', 'abhi abhi', 'just now', 'right now', 'abhi turant', 'अभी', 'अभी अभी', 'आत्ता', 'आताच', 'এইমাত্র', 'এখনই', 'இப்போது', 'இப்பொழுது', 'ఇప్పుడే', 'ಈಗಷ್ಟೇ'];

const DEBIT_EXACT = wordSet(['kat', 'kaat', 'kate', 'kati', 'kata', 'cut', 'debit', 'debited', 'deducted', 'gaye', 'gaya', 'gye', 'gya', 'lost', 'loss', 'nikal', 'nikle', 'nikla', 'transfer', 'transferred', 'bheja', 'bheje', 'bhej', 'sent', 'paid', 'liya', 'liye', 'chale', 'chala', 'withdrawn', 'fraud']);
const DEBIT_PREFIX = ['कट', 'काट', 'गए', 'गये', 'गया', 'निकल', 'भेज', 'डेबिट', 'कापल', 'गेल', 'কেটে', 'গেছে', 'চলে', 'போய', 'போன', 'பிடிக்க', 'పోయ', 'కట్', 'ಕಡಿತ', 'ಹೋಯ', 'ಹೋಗಿ'].map(nw);

// ---------------------------------------------------------------------------
// Phrase matching
// ---------------------------------------------------------------------------

export function escapeRe(s: string): string {
  return s.replace(/[.*+?^$|()[\]{}\\]/g, '\\$&');
}

/** Index of the earliest phrase found in normalised text, -1 if none. Latin phrases need word boundaries. */
export function phraseIndex(text: string, phrases: string[]): number {
  return phraseMatch(text, phrases)?.idx ?? -1;
}

/**
 * Latin keywords against native-script speech: Whisper and Chrome write Hinglish in Devanagari
 * ("आता" = aata, "डूढ" = doodh, "नकत" = nakad). Words are romanised and compared on sound keys.
 * minKey: shortest keyword sound key to trust (short keys collide with ordinary words: आता also means "comes").
 */
function crossScript(text: string, phrases: string[], last: boolean, minKey: number): { idx: number; len: number } | null {
  if (!/[^\x00-\x7f]/.test(text)) return null;
  const words: { k: string; at: number; len: number }[] = [];
  for (const m of text.matchAll(/\S+/g)) {
    const w = m[0].replace(/[.,!?;:।]+$/, '');
    words.push({ k: soundKey(isLatin(w) ? w : romanize(w)), at: m.index ?? 0, len: w.length });
  }
  let found: { idx: number; len: number } | null = null;
  for (const p of phrases) {
    if (!isLatin(p)) continue;
    const pk = p.split(/\s+/).map((w) => soundKey(w));
    // every word needs 3+ sound letters: \"bank app\" would otherwise match \"बंक आफ\" (bank of)
    if (pk.join('').length < minKey || pk.some((k) => k.length < 3)) continue;
    for (let i = 0; i + pk.length <= words.length; i++) {
      if (!pk.every((k, j) => words[i + j].k === k)) continue;
      const idx = words[i].at;
      const len = words[i + pk.length - 1].at + words[i + pk.length - 1].len - idx;
      if (!found || (last ? idx > found.idx : idx < found.idx)) found = { idx, len };
      if (!last) break;
    }
  }
  return found;
}

export function phraseMatch(text: string, phrases: string[], last = false, crossMinKey = 4): { idx: number; len: number } | null {
  let found: { idx: number; len: number } | null = null;
  for (const p of phrases) {
    const k = nw(p);
    if (!k) continue;
    let idx: number;
    if (/^[a-z0-9 .@'&°-]+$/.test(k)) {
      // plain English inflections of one-word keywords: cough -> coughs / coughing, block -> blocked
      const infl = !k.includes(' ') && k.length >= 4 ? '(?:s|es|ing|ed)?' : '';
      const re = new RegExp(`(^|[^a-z0-9])${escapeRe(k)}${infl}(?=[^a-z0-9]|$)`, 'g');
      idx = -1;
      let m: RegExpExecArray | null;
      while ((m = re.exec(text))) {
        idx = m.index + m[1].length;
        if (!last) break;
        re.lastIndex = idx + 1;
      }
    } else {
      idx = last ? text.lastIndexOf(k) : text.indexOf(k);
      // ASR spells native words a letter off (இன்விஸ்ட் for இன்வெஸ்ட்): compare sound-alike keys too.
      if (idx < 0) {
        const fk = fold(k);
        if ([...fk].length >= 4) idx = last ? fold(text).lastIndexOf(fk) : fold(text).indexOf(fk);
      }
    }
    if (idx < 0) continue;
    const better = !found || (last ? idx > found.idx || (idx === found.idx && k.length > found.len) : idx < found.idx || (idx === found.idx && k.length > found.len));
    if (better) found = { idx, len: k.length };
  }
  return found ?? crossScript(text, phrases, last, crossMinKey);
}

const foldCache = new Map<string, string>();
const folded = (w: string) => {
  let k = foldCache.get(w);
  if (k === undefined) foldCache.set(w, (k = fold(w)));
  return k;
};
export function startsWithAny(tok: string, prefixes: string[]): boolean {
  if (prefixes.some((p) => tok.startsWith(p))) return true;
  // ASR spells native words a letter off (हफते for हफ्ते): compare sound-alike keys of 3+ letters
  if (isLatin(tok)) return false;
  const ft = folded(tok);
  return prefixes.some((p) => !isLatin(p) && [...folded(p)].length >= 3 && ft.startsWith(folded(p)));
}

/** Token equals a Latin word, or (Indian scripts) starts with it. */
export function tokenIs(tok: string | undefined, words: string[]): boolean {
  if (!tok) return false;
  return isLatin(tok) ? words.includes(tok) : startsWithAny(tok, words.filter((w) => !isLatin(w)));
}

const NEG = wordSet(['nahi', 'nahin', 'nhi', 'na', 'no', 'not', 'nai', 'नहीं', 'नही', 'ना', 'नाही', 'না', 'নেই', 'இல்லை', 'இல்ல', 'లేదు', 'కాదు', 'ಇಲ್ಲ', 'ಇಲ್ಲಾ']);
const NEG_BEFORE = wordSet(['no', 'not', 'without', 'bina', 'बिना', 'never']);

/** Is the word at character index `idx` negated ("bukhar nahi hai", "no fever", "காய்ச்சல் இல்லை")? */
export function negatedAt(text: string, idx: number): boolean {
  const before = text.slice(0, idx).trim().split(/\s+/).filter(Boolean).slice(-2);
  if (before.some((w) => NEG_BEFORE.has(w))) return true;
  const rest = text.slice(idx);
  const after = rest.split(/\s+/).slice(1, 3);
  const own = rest.split(/\s+/)[0] ?? '';
  return after.some((w) => NEG.has(w.replace(/[.,!?]+$/, ''))) || /(?:இல்லை|ಇಲ್ಲ|নেই|లేదు)$/.test(own);
}

// ---------------------------------------------------------------------------
// Numbers
// ---------------------------------------------------------------------------

type NumKind =
  | { kind: 'digits'; raw: string }
  | { kind: 'unit'; v: number }
  | { kind: 'hundred' }
  | { kind: 'mult'; v: number }
  | { kind: 'frac'; v: number }
  | { kind: 'standalone'; v: number }
  | { kind: 'repeat'; n: number }
  | { kind: 'and' };

function numKind(tok: string): NumKind | null {
  if (/^\d+(\.\d+)?$/.test(tok)) return { kind: 'digits', raw: tok };
  if (UNITS.has(tok)) return { kind: 'unit', v: UNITS.get(tok)! };
  if (HUNDRED.has(tok)) return { kind: 'hundred' };
  if (MULTS.has(tok)) return { kind: 'mult', v: MULTS.get(tok)! };
  if (FRAC_PREFIX.has(tok)) return { kind: 'frac', v: FRAC_PREFIX.get(tok)! };
  if (STANDALONE.has(tok)) return { kind: 'standalone', v: STANDALONE.get(tok)! };
  if (REPEAT.has(tok)) return { kind: 'repeat', n: REPEAT.get(tok)! };
  if (tok === 'and') return { kind: 'and' };
  return null;
}

export interface NumRun {
  start: number;
  end: number; // exclusive
  value: number;
  /** A digit-by-digit sequence (UTR, phone, account) rather than a quantity. */
  isSeq: boolean;
  digits: string;
  hasMult: boolean;
}

function isLongDigits(k: NumKind): boolean {
  return k.kind === 'digits' && k.raw.length >= 6;
}

function isSingleDigit(k: NumKind): boolean {
  return (k.kind === 'digits' && k.raw.length === 1) || (k.kind === 'unit' && k.v <= 9);
}

export function findNumberRuns(tokens: string[]): NumRun[] {
  const runs: NumRun[] = [];
  let i = 0;
  while (i < tokens.length) {
    const first = numKind(tokens[i]);
    const nextK = i + 1 < tokens.length ? numKind(tokens[i + 1]) : null;
    const canStart =
      first &&
      first.kind !== 'and' &&
      !(first.kind === 'frac' && !nextK) &&
      !(first.kind === 'repeat' && !(nextK && isSingleDigit(nextK)));
    if (!canStart) {
      i++;
      continue;
    }
    const kinds: NumKind[] = [first!];
    let j = i + 1;
    while (j < tokens.length) {
      const k = numKind(tokens[j]);
      if (!k) break;
      // A long digit block never belongs to a spoken quantity ("ref no 4567...").
      if (isLongDigits(k) && kinds.some((x) => x.kind !== 'digits')) break;
      if (kinds.some(isLongDigits) && k.kind !== 'digits') break;
      if (k.kind === 'and') {
        const after = j + 1 < tokens.length ? numKind(tokens[j + 1]) : null;
        const hasBig = kinds.some((x) => x.kind === 'mult' || x.kind === 'hundred');
        if (!after || after.kind === 'digits' || !hasBig) break;
      }
      kinds.push(k);
      j++;
    }
    // Lone digit-only words ("no", "oh") are not numbers outside a digit run.
    if (kinds.length === 1 && first!.kind === 'unit' && DIGIT_ONLY_WORDS.has(tokens[i])) {
      i++;
      continue;
    }
    runs.push(buildRun(kinds, i, j));
    i = j;
  }
  return runs;
}

function buildRun(kinds: NumKind[], start: number, end: number): NumRun {
  const digitish = kinds.every((k) => k.kind === 'digits' || isSingleDigit(k) || k.kind === 'repeat');
  const allAscii = kinds.every((k) => k.kind === 'digits');
  const singleLong = kinds.length === 1 && kinds[0].kind === 'digits' && kinds[0].raw.replace('.', '').length >= 9;
  const isSeq = singleLong || (digitish && (kinds.length >= 4 || (kinds.length >= 2 && allAscii)));
  if (isSeq) {
    let digits = '';
    let rep = 1;
    for (const k of kinds) {
      if (k.kind === 'repeat') {
        rep = k.n;
        continue;
      }
      const d = k.kind === 'digits' ? k.raw.replace('.', '') : k.kind === 'unit' ? String(k.v) : '';
      digits += rep > 1 ? d[0].repeat(rep) + d.slice(1) : d;
      rep = 1;
    }
    return { start, end, value: Number(digits), isSeq: true, digits, hasMult: false };
  }
  let total = 0;
  let current = 0;
  let frac = 0;
  let hasMult = false;
  for (const k of kinds) {
    switch (k.kind) {
      case 'digits':
        current += parseFloat(k.raw);
        break;
      case 'unit':
        current += k.v + frac;
        frac = 0;
        break;
      case 'standalone':
        current += k.v;
        break;
      case 'frac':
        frac = k.v;
        break;
      case 'hundred':
        current = (current || 1) * 100;
        hasMult = true;
        break;
      case 'mult':
        total += (current || 1) * k.v;
        current = 0;
        hasMult = true;
        break;
      default:
        break;
    }
  }
  const value = Math.round((total + current) * 100) / 100;
  return { start, end, value, isSeq: false, digits: String(value), hasMult };
}

export function isCurrency(tok: string | undefined): boolean {
  if (!tok) return false;
  return CURRENCY_EXACT.has(tok) || startsWithAny(tok, CURRENCY_PREFIX);
}

/** Milliseconds per unit word (minute / hour / day / week / month), 0 if not a time unit. */
export function unitMs(tok: string | undefined): number {
  if (!tok) return 0;
  const latin = /^[a-z]+$/.test(tok);
  const match = (list: string[]) => (latin ? list.includes(tok) : startsWithAny(tok, list));
  if (match(MINUTE_UNITS)) return 60_000;
  if (match(HOUR_UNITS)) return 3_600_000;
  if (match(DAY_UNITS)) return 86_400_000;
  if (match(WEEK_UNITS)) return 7 * 86_400_000;
  if (match(MONTH_UNITS)) return 30 * 86_400_000;
  return 0;
}

export function isClockMarker(tok: string | undefined): boolean {
  return !!tok && (CLOCK_MARKERS.has(tok) || PM.has(tok) || AM.has(tok));
}

export function isDebitWord(tok: string, extra?: Set<string>): boolean {
  return DEBIT_EXACT.has(tok) || !!extra?.has(tok) || (!/^[a-z]+$/.test(tok) && startsWithAny(tok, DEBIT_PREFIX));
}

// ---------------------------------------------------------------------------
// Date and time (past events: "10 minute pehle", "kal shaam 7 baje")
// ---------------------------------------------------------------------------

export interface TimeHit {
  value: string;
  confidence: number;
  /** Index of the number run used, if any (so other slots skip it). */
  run?: number;
}

export function parsePastTime(text: string, tokens: string[], runs: NumRun[], now: Date = new Date()): TimeHit | undefined {
  const iso = (d: Date) => d.toISOString();

  // 1. Relative: "10 minute pehle", "2 hours ago", "दस मिनट पहले", "10 मिनिटांपूर्वी"
  for (let ri = 0; ri < runs.length; ri++) {
    const r = runs[ri];
    if (r.isSeq) continue;
    const unitTok = tokens[r.end];
    const ms = unitMs(unitTok);
    if (!ms) continue;
    const window = tokens.slice(r.end, r.end + 3);
    const ago = window.some((t) => AGO.includes(t)) || AGO.some((a) => unitTok.includes(a) && !/^[a-z]+$/.test(unitTok));
    const elapsed = window.some((t) => ELAPSED.has(t));
    if (!ago && !elapsed && ms !== 60_000) continue;
    const conf = ago ? 0.92 : 0.72;
    return { value: iso(new Date(now.getTime() - r.value * ms)), confidence: conf, run: ri };
  }
  if (phraseIndex(text, ['half an hour', 'half hour', 'aadha ghanta', 'adha ghanta', 'aadhe ghante', 'आधा घंटा', 'आधे घंटे', 'अर्धा तास']) >= 0) {
    return { value: iso(new Date(now.getTime() - 30 * 60_000)), confidence: 0.85 };
  }
  if (phraseIndex(text, ['kuch der pehle', 'thodi der pehle', 'few minutes ago', 'some time ago', 'थोड़ी देर पहले', 'कुछ देर पहले']) >= 0) {
    return { value: iso(new Date(now.getTime() - 15 * 60_000)), confidence: 0.55 };
  }

  // 2. Absolute: day word + day part + clock hour
  let dayOffset: number | undefined;
  if (phraseIndex(text, ['day before yesterday']) >= 0) dayOffset = -2;
  else
    for (const [off, words] of DAY_WORDS) {
      if (dayOffset === undefined && tokens.some((t) => words.map(nw).includes(t))) dayOffset = off;
    }
  let part: DayPart | undefined;
  for (const [p, words] of DAYPARTS) {
    const list = words.map(nw);
    if (!part && tokens.some((t) => list.includes(t) || (!/^[a-z]+$/.test(t) && list.some((w) => t.startsWith(w))))) part = p;
  }
  let hour: number | undefined;
  let minute = 0;
  let pm = false;
  let am = false;
  let run: number | undefined;
  for (let i = 0; i < tokens.length && hour === undefined; i++) {
    const t = tokens[i];
    let m = /^(\d{1,2})[:.](\d{2})(am|pm)?$/.exec(t);
    if (m && (t.includes(':') || m[3] || isClockMarker(tokens[i + 1]))) {
      hour = +m[1];
      minute = +m[2];
      if (m[3] === 'pm' || PM.has(tokens[i + 1] ?? '')) pm = true;
      if (m[3] === 'am' || AM.has(tokens[i + 1] ?? '')) am = true;
      run = runs.findIndex((r) => r.start === i);
      continue;
    }
    m = /^(\d{1,2})(am|pm)$/.exec(t);
    if (m) {
      hour = +m[1];
      pm = m[2] === 'pm';
      am = m[2] === 'am';
      continue;
    }
    m = /^(\d{1,2})(টা|টায়|টার)/.exec(t);
    if (m) hour = +m[1];
  }
  if (hour === undefined) {
    for (let ri = 0; ri < runs.length; ri++) {
      const r = runs[ri];
      if (r.isSeq) continue;
      const next = tokens[r.end];
      if (isClockMarker(next) && r.value > 0 && r.value < 24) {
        hour = Math.floor(r.value);
        minute = Math.round((r.value - hour) * 60);
        if (PM.has(next) || PM.has(tokens[r.end + 1] ?? '')) pm = true;
        if (AM.has(next) || AM.has(tokens[r.end + 1] ?? '')) am = true;
        run = ri;
        break;
      }
    }
  }
  if (phraseIndex(text, NOW_WORDS) >= 0 && hour === undefined && dayOffset === undefined && !part) {
    return { value: iso(now), confidence: 0.85 };
  }
  if (hour === undefined && dayOffset === undefined && !part) return undefined;

  const d = new Date(now.getTime());
  if (dayOffset) d.setDate(d.getDate() + dayOffset);
  let conf: number;
  if (hour !== undefined) {
    let h = hour % 24;
    if (pm && h < 12) h += 12;
    if (am && h === 12) h = 0;
    if (!pm && !am && part && h < 12) {
      if (part === 'afternoon' || part === 'evening') h += 12;
      if (part === 'night' && h >= 6) h += 12;
    }
    d.setHours(h, minute, 0, 0);
    conf = dayOffset !== undefined || part || pm || am ? 0.9 : 0.75;
  } else if (part) {
    d.setHours(DAYPART_HOUR[part], 0, 0, 0);
    conf = dayOffset !== undefined ? 0.65 : 0.6;
  } else {
    d.setHours(12, 0, 0, 0);
    conf = 0.5;
  }
  if (dayOffset === undefined && d.getTime() > now.getTime()) d.setDate(d.getDate() - 1);
  return { value: iso(d), confidence: conf, run: run !== undefined && run >= 0 ? run : undefined };
}

// ---------------------------------------------------------------------------
// UPI IDs ("rahul dot kyc at ybl")
// ---------------------------------------------------------------------------

const UPI_HANDLES = [
  'ybl', 'ibl', 'axl', 'okaxis', 'okhdfcbank', 'okicici', 'oksbi', 'paytm', 'ptyes', 'ptaxis', 'pthdfc', 'ptsbi', 'upi', 'apl', 'yapl',
  'ikwik', 'freecharge', 'axisbank', 'icici', 'sbi', 'hdfcbank', 'kotak', 'kmbl', 'yesbank', 'idfcfirst', 'federal', 'pnb', 'barodampay',
  'unionbank', 'indus', 'airtel', 'jio', 'fbl', 'waicici', 'wahdfcbank', 'waaxis', 'wasbi', 'abfspay', 'pingpay', 'superyes', 'mbk',
  'postbank', 'dbs', 'rbl', 'okbizaxis', 'yesg', 'naviaxis', 'slc', 'tapicici', 'axisb', 'icic', 'aubank', 'cnrb', 'boi', 'uco',
];

export function prepUpi(s: string): string {
  let t = s;
  t = t.replace(/\s*(at the rate of|at the rate|at-the-rate|at rate|एट द रेट|एट दी रेट|एट रेट)\s*/g, '@');
  t = t.replace(/\s+(dot|डॉट|डोट)\s+/g, '.');
  t = t.replace(new RegExp(`((?:id|आईडी)\\s+(?:hai\\s+|tha\\s+|is\\s+|was\\s+)?)?([a-z0-9][a-z0-9._-]+)\\s+at\\s+(${UPI_HANDLES.join('|')})(?=[^a-z0-9]|$)`, 'g'), (m, pre: string | undefined, id: string, handle: string) =>
    pre || /[._\d]/.test(id) ? `${pre ?? ''}${id}@${handle}` : m,
  );
  t = t.replace(/\s*@\s*/g, '@');
  return t;
}

const UPI_RE = /([a-z0-9][a-z0-9._-]{1,63})@([a-z][a-z0-9]{1,30})(\.[a-z]{2,})?/g;

/** Pull UPI IDs out of prepped text (e-mail addresses are dropped, not returned). */
export function extractUpis(prepped: string): { ids: string[]; rest: string } {
  const ids: string[] = [];
  const rest = prepped.replace(UPI_RE, (m, _id: string, _h: string, tld: string | undefined) => {
    if (tld) return ' '; // looks like an e-mail address
    ids.push(m.replace(/\.$/, ''));
    return ' ';
  });
  return { ids, rest };
}

// ---------------------------------------------------------------------------
// Intents and language names
// ---------------------------------------------------------------------------

export type Intent = 'skip' | 'wait' | 'yes' | 'no';

const SKIP_WORDS = ['skip', 'skip karo', 'pata nahi', 'pata nhi', 'nahi pata', 'nahin pata', 'maloom nahi', 'malum nahi', 'nahi maloom', "don't know", 'dont know', 'do not know', 'no idea', 'not sure', 'aage badho', 'छोड़ो', 'छोडो', 'पता नहीं', 'मालूम नहीं', 'स्किप', 'জানি না', 'தெரியாது', 'తెలియదు', 'माहित नाही', 'ಗೊತ್ತಿಲ್ಲ'];
const WAIT_WORDS = ['ek minute ruko', 'ek minute', 'ek min', 'ruko', 'ruk jao', 'rukiye', 'wait', 'hold on', 'one minute', 'रुको', 'रुकिए', 'एक मिनट', 'এক মিনিট', 'দাঁড়ান', 'ஒரு நிமிடம்', 'ஒரு நிமிஷம்', 'ఒక్క నిమిషం', 'थांबा', 'एक मिनिट', 'ಒಂದು ನಿಮಿಷ'];
export const YES_WORDS = ['haan', 'han', 'haa', 'ha', 'ji', 'haan ji', 'yes', 'yeah', 'yep', 'sahi', 'sahi hai', 'theek hai', 'thik hai', 'correct', 'right', 'ok', 'okay', 'हाँ', 'हां', 'जी', 'सही', 'ठीक', 'হ্যাঁ', 'ঠিক', 'ஆம்', 'ஆமா', 'சரி', 'అవును', 'సరే', 'होय', 'बरोबर', 'ಹೌದು', 'ಸರಿ'];
export const NO_WORDS = ['nahi', 'nahin', 'nhi', 'na', 'no', 'galat', 'wrong', 'नहीं', 'गलत', 'না', 'ভুল', 'இல்லை', 'தவறு', 'కాదు', 'లేదు', 'नाही', 'चूक', 'ಇಲ್ಲ', 'ತಪ್ಪು'];

export function detectIntent(text: string): Intent | null {
  const s = normalize(text);
  const words = wordCount(s);
  if (phraseIndex(s, SKIP_WORDS) >= 0) return 'skip';
  if (words <= 4 && phraseIndex(s, WAIT_WORDS) >= 0 && phraseIndex(s, AGO) < 0) return 'wait';
  if (words <= 4) {
    const y = phraseIndex(s, YES_WORDS);
    const n = phraseIndex(s, NO_WORDS);
    if (n >= 0 && (y < 0 || n <= y)) return 'no';
    if (y >= 0) return 'yes';
  }
  return null;
}

const LANG_NAMES: [LangCode, string[]][] = [
  ['hi-IN', ['hindi', 'hindī', 'हिंदी', 'हिन्दी', 'hindustani']],
  ['en-IN', ['english', 'angrezi', 'angreji', 'इंग्लिश', 'अंग्रेजी', 'अंग्रेज़ी']],
  ['bn-IN', ['bengali', 'bangla', 'bangali', 'বাংলা', 'बंगाली', 'बांग्ला', 'बंगला']],
  ['ta-IN', ['tamil', 'தமிழ்', 'तमिल']],
  ['te-IN', ['telugu', 'తెలుగు', 'तेलुगु', 'तेलगु']],
  ['mr-IN', ['marathi', 'मराठी']],
  ['kn-IN', ['kannada', 'kanada', 'kannad', 'ಕನ್ನಡ', 'कन्नड़', 'कन्नड']],
];

export function detectLanguage(text: string): LangCode | null {
  const s = normalize(text);
  let best: { code: LangCode; idx: number } | null = null;
  for (const [code, names] of LANG_NAMES) {
    const idx = phraseIndex(s, names);
    if (idx >= 0 && (!best || idx < best.idx)) best = { code, idx };
  }
  return best?.code ?? null;
}
