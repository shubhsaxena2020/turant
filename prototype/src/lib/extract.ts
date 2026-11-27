// Turant on-device extraction rules.
// Pure functions only: no DOM, no network, no storage. Works offline.
// Handles Hinglish (romanised Hindi), English, Devanagari Hindi/Marathi and the
// most common words in Bengali, Tamil, Telugu and Kannada.

import { findAmountHit, fold, numberGroups, readoutDigit } from './indic/numbers.ts';
import { joinSpelled, marathiRoman, spokenDigits, unifyScript } from './indic/cleanup.ts';
import { findTime, hourMinutePhrase, type TimeHit } from './indic/time.ts';
import { findBank, romanize, soundKey } from './indic/bank.ts';

export type FieldKey =
  | 'amount'
  | 'time'
  | 'scamType'
  | 'bank'
  | 'paymentApp'
  | 'utr'
  | 'suspectUpi'
  | 'suspectPhone'
  | 'suspectAccount';

export const FIELD_ORDER: FieldKey[] = [
  'amount',
  'time',
  'scamType',
  'bank',
  'paymentApp',
  'utr',
  'suspectUpi',
  'suspectPhone',
  'suspectAccount',
];

export type ScamType =
  | 'fake_kyc'
  | 'otp_shared'
  | 'fake_customer_care'
  | 'wrong_transfer'
  | 'qr_scan'
  | 'investment_task'
  | 'sextortion'
  | 'other';

export const SCAM_TYPES: ScamType[] = [
  'fake_kyc',
  'otp_shared',
  'fake_customer_care',
  'wrong_transfer',
  'qr_scan',
  'investment_task',
  'sextortion',
  'other',
];

export interface Extracted<T> {
  value: T;
  confidence: number;
}

export interface Extraction {
  amount?: Extracted<number>;
  /** ISO timestamp (absolute). */
  time?: Extracted<string>;
  scamType?: Extracted<ScamType>;
  bank?: Extracted<string>;
  paymentApp?: Extracted<string>;
  utr?: Extracted<string>;
  suspectUpi?: Extracted<string>;
  suspectPhone?: Extracted<string>;
  suspectAccount?: Extracted<string>;
}

/** A follow-up question can target one field, or "suspect" (UPI / phone / account). */
export type Hint = FieldKey | 'suspect';

export interface ExtractOptions {
  now?: Date;
  /** The field the user is answering; relaxes the rules for that field. */
  hint?: Hint;
  /** Prefer the last mentioned value (used for corrections: "SBI nahi, HDFC tha"). */
  preferLast?: boolean;
  /** The language the person chose to speak ("mr-IN"): turns on fixes that would misread other languages. */
  lang?: string;
}

// ---------------------------------------------------------------------------
// Normalisation
// ---------------------------------------------------------------------------

const DIGIT_BLOCKS = [0x0966, 0x09e6, 0x0a66, 0x0ae6, 0x0b66, 0x0be6, 0x0c66, 0x0ce6, 0x0d66];
const NATIVE_DIGIT_RE =
  /[०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯]/g;

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

const ACRONYMS = new Set(['sbi', 'hdfc', 'icici', 'pnb', 'bob', 'boi', 'iob', 'uco', 'idfc', 'upi', 'utr', 'kyc', 'otp', 'qr', 'rbl']);

export function normalize(input: string): string {
  let s = foldDigits(normalizeWord(input));
  s = s.replace(/o['’]?\s?clock/g, 'oclock');
  s = s.replace(/\+\s?91[\s-]*(?=\d)/g, ' '); // +91 country code
  s = s.replace(/₹\s*/g, ' ₹ ');
  s = s.replace(/(\d),(?=\d)/g, '$1'); // 4,999 and 1,00,000
  s = s.replace(/(^|[^a-z])(rs|inr)\.?(?=\s|\d|$)/g, '$1 rs ');
  s = s.replace(/(\d)(rs|rupees?|rupaye|rupay)\b/g, '$1 $2');
  s = s.replace(/(\d+(?:\.\d+)?)\s?k\b/g, '$1 thousand');
  s = s.replace(/(\d+)\s*\/-/g, '$1 ');
  // "s b i" spelled out by the recogniser -> "sbi"
  s = s.replace(/\b(?:[a-z] ){1,4}[a-z]\b/g, (m) => {
    const joined = m.replace(/ /g, '');
    return ACRONYMS.has(joined) ? joined : m;
  });
  return s.replace(/\s+/g, ' ').trim();
}

function tokenize(s: string): string[] {
  const out: string[] = [];
  for (const raw of s.split(/[\s,!?;"“”'‘’()[\]{}।॥|/\\]+/)) {
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

// ---------------------------------------------------------------------------
// Word lists (normalised once at load time)
// ---------------------------------------------------------------------------

const nw = (w: string) => normalizeWord(w);
const set = (words: string[]) => new Set(words.map(nw));
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
  // shoony / tin: how the Hindi2Hinglish Whisper (the app's in-page model for Hindi) spells shunya / teen
  shunya: 0, shoony: 0, shoonya: 0, shuny: 0, ek: 1, do: 2, teen: 3, tin: 3, char: 4, chaar: 4, paanch: 5, panch: 5, paach: 5, panj: 5,
  chhe: 6, chhah: 6, chah: 6, che: 6, cheh: 6, chhey: 6, saat: 7, aath: 8, aat: 8, nau: 9,
  das: 10, dus: 10, dahaa: 10, daha: 10, dahaan: 10, don: 2, saha: 6, sahaa: 6, gyarah: 11, gyara: 11, barah: 12, bara: 12, terah: 13, tera: 13, chaudah: 14, chauda: 14,
  pandrah: 15, pandra: 15, solah: 16, sola: 16, satrah: 17, satra: 17, atharah: 18, athara: 18, unnis: 19,
  unnees: 19, bees: 20, pachis: 25, pachees: 25, pachchis: 25, tees: 30, chalis: 40, chaalis: 40,
  pachas: 50, pachaas: 50, paanchas: 50, sattar: 70, assi: 80, nabbe: 90,
  // Devanagari (Hindi + Marathi)
  'शून्य': 0, 'एक': 1, 'दो': 2, 'दोन': 2, 'तीन': 3, 'चार': 4, 'पांच': 5, 'पाँच': 5, 'पाच': 5, 'छह': 6, 'छः': 6,
  'छे': 6, 'सहा': 6, 'सात': 7, 'आठ': 8, 'नौ': 9, 'नऊ': 9, 'दस': 10, 'दहा': 10, 'ग्यारह': 11, 'बारह': 12,
  'तेरह': 13, 'चौदह': 14, 'पंद्रह': 15, 'पन्द्रह': 15, 'सोलह': 16, 'सत्रह': 17, 'अठारह': 18, 'उन्नीस': 19,
  'बीस': 20, 'वीस': 20, 'पच्चीस': 25, 'तीस': 30, 'चालीस': 40, 'पचास': 50, 'पन्नास': 50, 'साठ': 60,
  'सत्तर': 70, 'अस्सी': 80, 'नब्बे': 90,
});
// "oh" (as in "nine eight oh") is only a digit inside a digit run.
const DIGIT_ONLY_WORDS = set(['oh']);
UNITS.set('oh', 0);

const HUNDRED = set(['hundred', 'sau', 'सौ', 'शंभर']);
const MULTS = map({
  thousand: 1000, hazaar: 1000, hazar: 1000, hajar: 1000, hajaar: 1000, hazzar: 1000, 'हजार': 1000, 'हज़ार': 1000,
  lakh: 100000, lakhs: 100000, lac: 100000, lacs: 100000, laakh: 100000, lak: 100000, 'लाख': 100000,
  million: 1000000,
  crore: 10000000, crores: 10000000, karod: 10000000, karor: 10000000, 'करोड़': 10000000, 'करोड': 10000000,
  // Bengali / Tamil / Telugu / Kannada thousand & lakh
  'হাজার': 1000, 'লাখ': 100000, 'ஆயிரம்': 1000, 'லட்சம்': 100000, 'వేలు': 1000, 'వెయ్యి': 1000, 'లక్ష': 100000,
  'ಸಾವಿರ': 1000, 'ಲಕ್ಷ': 100000,
});
const FRAC_PREFIX = map({ saade: 0.5, sade: 0.5, saadhe: 0.5, sadhe: 0.5, 'साढ़े': 0.5, 'साडे': 0.5, 'साधे': 0.5, sava: 0.25, sawa: 0.25, 'सवा': 0.25, paune: -0.25, pone: -0.25, 'पौने': -0.25, savva: 0.25, 'सव्वा': 0.25, paavne: -0.25, pavne: -0.25, 'पावणे': -0.25, ['সোয়া'.normalize('NFC')]: 0.25, ['সওয়া'.normalize('NFC')]: 0.25, 'পৌনে': -0.25 });
const STANDALONE = map({ dedh: 1.5, derh: 1.5, dhed: 1.5, 'डेढ़': 1.5, 'दीड': 1.5, dhai: 2.5, dhaai: 2.5, adhai: 2.5, 'ढाई': 2.5, 'अढ़ाई': 2.5, 'अडीच': 2.5 });
const REPEAT = map({ double: 2, triple: 3, 'डबल': 2, 'ट्रिपल': 3 });

const CURRENCY_EXACT = set(['rs', 'inr', '₹', 'rupaye', 'rupaiye', 'rupay', 'rupee', 'rupees', 'rupiya', 'rupiye', 'rupya', 'rupaiya', 'रुपे', 'रूपे', 'টাকা', 'টাকার']);
const CURRENCY_PREFIX = ['rupa', 'rupe', 'rupi', 'rupy', 'रुपय', 'रुपए', 'रुपये', 'रूपय', 'रूपए', 'रुपै', 'রুপি', 'টাকা', 'ரூபா', 'ருபா', 'ருபீ', 'ரூபீ', 'रूपीज', 'रुपीज', 'రూపాయ', 'ರೂಪಾಯ'].map(nw);

const MINUTE_UNITS = ['minute', 'minutes', 'min', 'mins', 'minat', 'mint', 'mnt', 'मिनट', 'मिनिट', 'মিনিট', 'நிமிட', 'நிமிண', 'నిమిష', 'ನಿಮಿಷ'].map(nw);
const HOUR_UNITS = ['hour', 'hours', 'hr', 'hrs', 'ghanta', 'ghante', 'ghanton', 'ghanta', 'घंटा', 'घंटे', 'घंटों', 'तास', 'ঘণ্টা', 'ঘন্টা', 'மணிநேர', 'గంట', 'ಗಂಟೆ'].map(nw);
const DAY_UNITS = ['day', 'days', 'din', 'dino', 'dinon', 'दिन', 'दिवस', 'দিন', 'நாள', 'நாட்க', 'రోజు', 'రోజుల', 'ದಿನ'].map(nw);
const AGO = ['pehle', 'pahle', 'phele', 'pehele', 'pahile', 'ago', 'back', 'before', 'पहले', 'पहिले', 'पूर्वी', 'आधी', 'আগে', 'முன்', 'முன்பு', 'முன்னாடி', 'క్రితం', 'క్రతం', 'ಹಿಂದೆ'].map(nw);
const ELAPSED = set(['hua', 'hue', 'huye', 'hogaye', 'ho', 'हुआ', 'हुए', 'हो']);

const CLOCK_MARKERS = set(['baje', 'bje', 'baj', 'bajhe', 'oclock', 'बजे', 'बज', 'वाजता', 'वाजे', 'মণিক্কு', 'மணிக்கு', 'మణి', 'గంటలకు', 'ಗಂಟೆಗೆ']);
const PM = set(['pm', 'p.m', 'p.m.']);
const AM = set(['am', 'a.m', 'a.m.']);

type DayPart = 'morning' | 'afternoon' | 'evening' | 'night';
const DAYPARTS: [DayPart, string[]][] = [
  ['morning', ['subah', 'subha', 'subeh', 'savere', 'morning', 'सुबह', 'सवेरे', 'सकाळी', 'सकाळ', 'সকাল', 'সকালে', 'காலை', 'ఉదయం', 'ಬೆಳಿಗ್ಗೆ']],
  ['afternoon', ['dopahar', 'dopehar', 'dupahar', 'dophar', 'afternoon', 'noon', 'दोपहर', 'दुपारी', 'দুপুর', 'দুপুরে', 'மதியம்', 'మధ్యాహ్నం', 'ಮಧ್ಯಾಹ್ನ']],
  ['evening', ['shaam', 'sham', 'shām', 'evening', 'शाम', 'संध्याकाळी', 'সন্ধ্যা', 'সন্ধ্যায়', 'மாலை', 'సాయంత్రం', 'ಸಂಜೆ']],
  ['night', ['raat', 'night', 'tonight', 'रात', 'रात्री', 'রাত', 'রাতে', 'இரவு', 'రాత్రి', 'ರಾತ್ರಿ']],
];
const DAYPART_HOUR: Record<DayPart, number> = { morning: 9, afternoon: 14, evening: 19, night: 22 };

const DAY_WORDS: [number, string[]][] = [
  [0, ['aaj', 'today', 'आज', 'আজ', 'இன்று', 'ఈరోజు', 'ಇಂದು']],
  [-1, ['kal', 'kaal', 'yesterday', 'कल', 'काल', 'গতকাল', 'কাল', 'நேற்று', 'నిన్న', 'ನಿನ್ನೆ']],
  [-2, ['parso', 'parson', 'parsoon', 'परसों', 'परसो', 'परवा', 'পরশু', 'முந்தாநாள்', 'మొన్న', 'ಮೊನ್ನೆ']],
];
// "abhi tak" = so far, "abhi bhi" = still: about the present, not when it happened
const NOT_NOW = /(?:abhi|अभी)\s+(?:tak|bhi|bhee|तक|भी)(?![\p{L}\p{M}])/giu;
const NOW_WORDS = ['abhi', 'abhi abhi', 'just now', 'abhi turant', 'अभी', 'अभी अभी', 'आत्ता', 'आताच', 'এইমাত্র', 'এখনই', 'இப்போது', 'இப்பொழுது', 'ఇప్పుడే', 'ಈಗಷ್ಟೇ'];

const DEBIT_EXACT = set(['debated', 'kaaple', 'kaapale', 'kaapla', 'kat', 'kaat', 'kate', 'kati', 'kata', 'cut', 'debit', 'debited', 'deducted', 'gaye', 'gaya', 'gye', 'gya', 'lost', 'loss', 'nikal', 'nikle', 'nikla', 'transfer', 'transferred', 'bheja', 'bheje', 'bhej', 'sent', 'paid', 'liya', 'liye', 'chale', 'chala', 'withdrawn', 'fraud', 'amount', 'rakam', 'रकम', 'राशि', 'took', 'taken', 'stole', 'stolen', 'cheated', 'scammed', 'charged', 'gone', 'fee', 'fees', 'penalty', 'फीस', 'फ़ीस', 'शुल्क', 'जुर्माना']);
const DEBIT_PREFIX = ['कट', 'काट', 'गए', 'गये', 'गया', 'निकल', 'भेज', 'डेबिट', 'डेविट', 'देविट', 'देबिट', 'ডেবিট', 'டெபிட்', 'డెబిట్', 'ಡೆಬಿಟ್', 'कापल', 'गेल', 'কেটে', 'গেছে', 'চলে', 'போய', 'போன', 'பிடிக்க', 'పోయ', 'కట్', 'ಕಡಿತ', 'ಹೋಯ', 'ಹೋಗಿ'].map(nw);

const UTR_CTX = set(['utr', 'ref', 'reference', 'refno', 'rrn', 'transaction', 'txn', 'trans', 'id', 'यूटीआर', 'ट्रांजैक्शन', 'ट्रांजेक्शन', 'रेफरेंस', 'आईडी', 'रेफ', 'রেফ', 'ரெஃப்', 'రెఫ్', 'ರೆಫ್']);
const PHONE_CTX = set(['phone', 'mobile', 'mob', 'call', 'calling', 'whatsapp', 'फोन', 'मोबाइल', 'कॉल', 'ফোন', 'போன்', 'ఫోన్', 'ಫೋನ್', 'मोबाईल']);
const ACCOUNT_CTX = set(['account', 'acct', 'ac', 'a/c', 'khata', 'khaata', 'akaunt', 'खाता', 'खाते', 'अकाउंट', 'অ্যাকাউন্ট', 'கணக்கு', 'ఖాతా', 'ಖಾತೆ']);

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
      // Digits read out one by one are an ID; the next number word starts a new quantity ("…3 2, पाँच हज़ार").
      if (kinds.length >= 2 && k.kind !== 'digits' && kinds.every((x) => x.kind === 'digits' && x.raw.length === 1)) break;
      // A long digit block never belongs to a spoken quantity ("ref no 4567...").
      if (isLongDigits(k) && kinds.some((x) => x.kind !== 'digits')) break;
      // digits written by the recogniser are a complete number: "वय 40 दोन दिवस" is 40 then 2, never 42
      const prev = kinds[kinds.length - 1];
      if (k.kind === 'unit' && prev.kind === 'digits' && Number(prev.raw) < 100) break;
      // a digit read-out (UTR, phone) followed by an amount: "…tin don paanch hazaar rupe" ends the ID before "paanch"
      if (k.kind === 'unit' && kinds.length >= 6 && kinds.every(isSingleDigit)) {
        const after = j + 1 < tokens.length ? numKind(tokens[j + 1]) : null;
        if (after && (after.kind === 'mult' || after.kind === 'hundred')) break;
      }
      // a number word right before "hours" / "days" counts them, it does not end a big amount:
      // "Rs 12,500 two hours ago", "one lakh twenty thousand, two days ago"
      if (k.kind === 'unit' && (prev.kind === 'mult' || prev.kind === 'hundred' || prev.kind === 'digits') && unitMs(tokens[j + 1])) break;
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
        // "सवा लाख" / "पौने लाख": a fraction with no number means one and a quarter / three quarters
        total += (current || 1 + frac) * k.v;
        current = 0;
        frac = 0;
        hasMult = true;
        break;
      default:
        break;
    }
  }
  const value = Math.round((total + current) * 100) / 100;
  return { start, end, value, isSeq: false, digits: String(value), hasMult };
}

function startsWithAny(tok: string, prefixes: string[]): boolean {
  return prefixes.some((p) => tok.startsWith(p));
}

function isCurrency(tok: string | undefined): boolean {
  if (!tok) return false;
  return CURRENCY_EXACT.has(tok) || startsWithAny(tok, CURRENCY_PREFIX);
}

function unitMs(tok: string | undefined): number {
  if (!tok) return 0;
  const latin = /^[a-z]+$/.test(tok);
  const match = (list: string[]) => (latin ? list.includes(tok) : startsWithAny(tok, list));
  if (match(MINUTE_UNITS)) return 60_000;
  if (match(HOUR_UNITS)) return 3_600_000;
  if (match(DAY_UNITS)) return 86_400_000;
  return 0;
}

function isClockMarker(tok: string | undefined): boolean {
  return !!tok && (CLOCK_MARKERS.has(tok) || PM.has(tok) || AM.has(tok));
}

function isDebitWord(tok: string): boolean {
  return DEBIT_EXACT.has(tok) || (!/^[a-z]+$/.test(tok) && startsWithAny(tok, DEBIT_PREFIX));
}

// ---------------------------------------------------------------------------
// Field extractors
// ---------------------------------------------------------------------------

function extractAmount(tokens: string[], runs: NumRun[], opts: ExtractOptions): Extracted<number> | undefined {
  const hinted = opts.hint === 'amount';
  let best: { score: number; value: number; conf: number } | undefined;
  for (const r of runs) {
    if (r.isSeq || r.value <= 0 || r.value >= 1e9) continue;
    if (/x{2,}/i.test(tokens[r.start - 1] ?? '')) continue; // bank SMS "A/c XX4321": masked account digits, not money
    if (/^(otp|pin|cvv|mpin|password|code)$/.test(tokens[r.start - 1] ?? '')) continue; // "he took the OTP 4567": a code, not money
    const next = tokens[r.end];
    if (unitMs(next) || isClockMarker(next)) continue;
    if (/^\d{1,2}(am|pm)$/.test(next ?? '')) continue;
    const cur = isCurrency(next) || isCurrency(tokens[r.start - 1]) || isCurrency(tokens[r.end + 1]);
    let debit = false;
    for (let k = Math.max(0, r.start - 5); k < Math.min(tokens.length, r.end + 5); k++) {
      if (isDebitWord(tokens[k])) debit = true;
    }
    // a debit word alone is weak evidence for a tiny number ("20 ருபிஸ் டெபிட்" = 20 thousand, misheard)
    if (!cur && !r.hasMult && r.value < 100 && !hinted) continue;
    if (!cur && !r.hasMult && !debit && !hinted) continue;
    const score = (cur ? 3 : 0) + (r.hasMult ? 1.5 : 0) + (debit ? 1 : 0) + (hinted ? 1 : 0);
    const conf = cur ? 0.95 : r.hasMult ? 0.85 : hinted ? 0.85 : 0.6;
    if (!best || score > best.score || (score === best.score && opts.preferLast)) {
      best = { score, value: r.value, conf };
    }
  }
  return best ? { value: best.value, confidence: best.conf } : undefined;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^$|()[\]{}\\]/g, '\\$&');
}

/** Latin phrases against native-script speech by sound: Whisper / Chrome write Hinglish in Devanagari. */
function crossScriptIndex(text: string, phrases: string[]): number {
  if (!/[^\x00-\x7f]/.test(text)) return -1;
  const words = [...text.matchAll(/\S+/g)].map((m) => ({ k: soundKey(/^[\x00-\x7f]+$/.test(m[0]) ? m[0] : romanize(m[0])), at: m.index ?? 0 }));
  let found = -1;
  for (const p of phrases) {
    if (!/^[a-z0-9 .@'&-]+$/.test(p)) continue;
    const pk = p.split(/\s+/).map((w) => soundKey(w));
    // every word needs 3+ sound letters: \"bank app\" would otherwise match \"बंक आफ\" (bank of)
    if (pk.join('').length < 4 || pk.some((k) => k.length < 3)) continue;
    for (let i = 0; i + pk.length <= words.length; i++) {
      if (pk.every((k, j) => words[i + j].k === k)) {
        if (found < 0 || words[i].at < found) found = words[i].at;
        break;
      }
    }
  }
  return found;
}

function hasPhrase(text: string, phrases: string[]): number {
  // returns index of the first phrase found, -1 if none (latin phrases need word boundaries)
  let found = -1;
  for (const p of phrases) {
    const k = nw(p);
    let idx: number;
    if (/^[a-z0-9 .@'&-]+$/.test(k)) {
      const m = new RegExp(`(^|[^a-z0-9])${escapeRe(k)}(?=[^a-z0-9]|$)`).exec(text);
      idx = m ? m.index + m[1].length : -1;
    } else {
      idx = text.indexOf(k);
      // ASR spells native words a letter off (இன்விஸ்ட் for இன்வெஸ்ட்): compare sound-alike keys too.
      if (idx < 0) {
        const fk = fold(k);
        if ([...fk].length >= 4) idx = fold(text).indexOf(fk);
      }
    }
    if (idx >= 0 && (found < 0 || idx < found)) found = idx;
  }
  return found >= 0 ? found : crossScriptIndex(text, phrases);
}

function extractTime(text: string, tokens: string[], runs: NumRun[], opts: ExtractOptions): Extracted<string> | undefined {
  const now = opts.now ?? new Date();
  const iso = (d: Date) => d.toISOString();

  // 1. Relative: "10 minute pehle", "2 hours ago", "दस मिनट पहले", "10 मिनिटांपूर्वी"
  for (const r of runs) {
    if (r.isSeq) continue;
    const unitTok = tokens[r.end];
    const ms = unitMs(unitTok);
    if (!ms) continue;
    const window = tokens.slice(r.end, r.end + 3);
    const ago = window.some((t) => AGO.includes(t)) || AGO.some((a) => unitTok.includes(a) && !/^[a-z]+$/.test(unitTok));
    const elapsed = window.some((t) => ELAPSED.has(t));
    if (!ago && !elapsed && ms !== 60_000) continue;
    const conf = ago ? 0.92 : 0.72;
    return { value: iso(new Date(now.getTime() - r.value * ms)), confidence: conf };
  }
  if (hasPhrase(text, ['half an hour', 'half hour', 'aadha ghanta', 'adha ghanta', 'aadhe ghante', 'आधा घंटा', 'आधे घंटे', 'अर्धा तास']) >= 0) {
    return { value: iso(new Date(now.getTime() - 30 * 60_000)), confidence: 0.85 };
  }
  if (hasPhrase(text, ['kuch der pehle', 'thodi der pehle', 'few minutes ago', 'some time ago', 'थोड़ी देर पहले', 'कुछ देर पहले']) >= 0) {
    return { value: iso(new Date(now.getTime() - 15 * 60_000)), confidence: 0.55 };
  }

  // 2. Absolute: day word + day part + clock hour
  let dayOffset: number | undefined;
  if (hasPhrase(text, ['day before yesterday']) >= 0) dayOffset = -2;
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
  for (let i = 0; i < tokens.length && hour === undefined; i++) {
    const t = tokens[i];
    let m = /^(\d{1,2})[:.](\d{2})(am|pm)?$/.exec(t);
    if (m && (t.includes(':') || m[3] || isClockMarker(tokens[i + 1]))) {
      hour = +m[1];
      minute = +m[2];
      if (m[3] === 'pm' || PM.has(tokens[i + 1] ?? '')) pm = true;
      if (m[3] === 'am' || AM.has(tokens[i + 1] ?? '')) am = true;
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
    for (const r of runs) {
      if (r.isSeq) continue;
      const next = tokens[r.end];
      if (isClockMarker(next) && r.value > 0 && r.value < 24) {
        hour = Math.floor(r.value);
        minute = Math.round((r.value - hour) * 60);
        if (PM.has(next) || PM.has(tokens[r.end + 1] ?? '')) pm = true;
        if (AM.has(next) || AM.has(tokens[r.end + 1] ?? '')) am = true;
        break;
      }
    }
  }
  if (hasPhrase(text.replace(NOT_NOW, ' '), NOW_WORDS) >= 0 && hour === undefined && dayOffset === undefined && !part) {
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
  return { value: iso(d), confidence: conf };
}

const SCAM_RULES: [ScamType, string[]][] = [
  ['sextortion', ['sextortion', 'nude', 'naked', 'video call record', 'blackmail', 'blackmailing', 'blackmailed', 'ब्लाकमेल', 'ಬ್ಲಾಕ್ ಮೇಲ್', 'ಬ್ಲಾಕ್‌ಮೇಲ್', 'viral kar', 'obscene', 'अश्लील', 'ब्लैकमेल', 'न्यूड', 'ব্ল্যাকমেইল', 'மிரட்டல்', 'బ్లాక్‌మెయిల్', 'బ్లాక్ మేల్', 'ब्लॅकमेल', 'ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್']],
  ['investment_task', ['investment', 'invest', 'trading', 'stock tip', 'crypto', 'bitcoin', 'task', 'tasks', 'part time job', 'part-time job', 'work from home', 'youtube like', 'like karne', 'rating task', 'telegram', 'paisa double', 'double ho', 'high return', 'निवेश', 'टास्क', 'ट्रेडिंग', 'टेलीग्राम', 'इन्वेस्ट', 'डबल हो', 'दुप्पट', 'दुपट', 'गुंतवणु', 'বিনিয়োগ', 'ইনভেস্ট', 'ডাবল', 'টেলিগ্রাম', 'টাস্ক', 'முதலீடு', 'இன்வெஸ்ட்', 'டெலிகிராம்', 'டாஸ்க்', 'పెట్టుబడి', 'పిటుబడి', 'ఇన్వెస్ట్', 'టెలిగ్రామ్', 'టాస్క్', 'गुंतवणूक', 'ಹೂಡಿಕೆ', 'ಇನ್ವೆಸ್ಟ್', 'ಟೆಲಿಗ್ರಾಮ್', 'ಟಾಸ್ಕ್']],
  ['qr_scan', ['qr', 'qr code', 'scan', 'scanner', 'scanned', 'क्यूआर', 'स्कैन', 'স্ক্যান', 'কিউআর', 'ஸ்கேன்', 'స్కాన్', 'క్యువార', 'క్యూఆర్', 'स्कॅन', 'ಸ್ಕ್ಯಾನ್']],
  ['fake_customer_care', ['customer care', 'customer service', 'customer support', 'helpline number', 'care number', 'anydesk', 'any desk', 'teamviewer', 'screen share', 'quick support', 'कस्टमर केयर', 'कस्टमर केअर', 'कस्टमर केर', 'কাস্টমার কেয়ার', 'கஸ்டமர் கேர்', 'కస్టమర్ కేర్', 'ಕಸ್ಟಮರ್ ಕೇರ್']],
  ['fake_kyc', ['kyc', 'केवाईसी', 'केवायसी', 'কেওয়াইসি', 'কেওয়াইসি', 'கேஒய்சி', 'கேவாயசி', 'கேவைசி', 'కేవైసీ', 'ಕೆವೈಸಿ', 'ಕೈಕ ಅಪ್', 'ಕೈಕ್ಕ', 'pan card update', 'pan update', 'aadhaar update', 'aadhar update', 'account block', 'account band', 'account will be blocked', 'khata band', 'bank se call', 'bank se phone', 'bank wala', 'bank manager', 'bank official', 'bank se bol', 'बैंक से कॉल', 'बैंक से फोन', 'खाता बंद', 'केवाई सी', 'केवाय सी', 'केवा ऐसी', 'केवाऐसी', 'के वाईसी', 'के वाइसी', 'ಕೇವ ಆಯಸಿ', 'ಕೆವಾಯಸಿ', 'కెవాయసి', 'కేవాయసి', 'కేవ ఆయసి', 'के yc', 'yc अपडेट', 'yc update', 'पैन कार्ड', 'पॅन कार्ड', 'pan card', 'अकाउंट ब्लॉक', 'बैंक वाले', 'প্যান কার্ড', 'பான் கார்டு', 'పాన్ కార్డ్', 'ಪ್ಯಾನ್ ಕಾರ್ಡ್']],
  ['wrong_transfer', ['galti se', 'galati se', 'by mistake', 'mistakenly', 'wrong transfer', 'wrongly sent', 'refund', 'paise wapas', 'paisa wapas', 'wapas bhej', 'return the money', 'गलती से', 'वापस भेज', 'रिफंड', 'ভুল করে', 'রিফান্ড', 'தவறுதலாக', 'தவர்தலா', 'పొరపాటున', 'चुकून', 'ತಪ್ಪಾಗಿ']],
  ['otp_shared', ['otp', 'ओटीपी', 'ওটিপি', 'ஓடிபி', 'ஓட்டிப்', 'ஓட்டிபி', 'ఓటీపీ', 'ఓటి పీ', 'ಒಟಿಪಿ', 'code bataya', 'code bata diya', 'pin bataya', 'pin bata diya']],
];

const OTHER_WORDS = ['other', 'kuch aur', 'kuch or', 'dusra', 'something else', 'अन्य', 'कुछ और', 'दूसरा', 'অন্য', 'மற்றவை', 'ఇతర', 'इतर', 'ಇತರೆ'];

function extractScamType(text: string, opts: ExtractOptions): Extracted<ScamType> | undefined {
  const hits: { type: ScamType; idx: number; rank: number }[] = [];
  SCAM_RULES.forEach(([type, words], rank) => {
    const idx = hasPhrase(text, words);
    if (idx >= 0) hits.push({ type, idx, rank });
  });
  if (hits.length) {
    let pick = hits[0];
    if (opts.preferLast) pick = hits.reduce((a, b) => (b.idx > a.idx ? b : a));
    // OTP alone is a mechanism, not the story: lower confidence.
    return { value: pick.type, confidence: pick.type === 'otp_shared' ? 0.75 : 0.88 };
  }
  if (opts.hint === 'scamType' && hasPhrase(text, OTHER_WORDS) >= 0) return { value: 'other', confidence: 0.7 };
  if (KYC_UPDATE.test(text)) return { value: 'fake_kyc', confidence: 0.7 };
  return undefined;
}

// "KYC update" with KYC garbled by the recogniser (কাইক আপডেট, ಕೆಕ್ ಅಪ್ಪೇಟ್, ಕೇಕ್ಷ ಅಪ್ಟೇಟ್): a short word that starts
// with a k-sound and has a second k- or s-sound, right before an "update" word. Not "कुछ अपडेट" (some update).
const KYC_UPDATE = /(?:^|\s)[कকಕకக](?=[^\s]{0,4}[कखसषকখসষಕಖಸಷకఖసషகச])[^\s]{1,5}\s+[अআঅಅఅஅ][पপಪపப][^\s]{0,5}[टটಟటட]/u;

export const BANKS: { name: string; keys: string[] }[] = [
  { name: 'State Bank of India (SBI)', keys: ['sbi', 'state bank', 'stay bank', 'state bank of india', 'yono', 'एसबीआई', 'स्टेट बैंक', 'স্টেট ব্যাংক', 'এসবিআই', 'எஸ்பிஐ', 'ஸ்டேட் பேங்க்', 'ఎస్బీఐ', 'ఎస్‌బీఐ', 'ఎస్బిఐ', 'స్టేట్ బ్యాంక్', 'ಎಸ್‌ಬಿಐ', 'ಎಸ್ಬಿಐ', 'ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್'] },
  { name: 'HDFC Bank', keys: ['hdfc', 'एचडीएफसी', 'এইচডিএফসি', 'ஹெச்டிஎஃப்சி', 'హెచ్‌డీఎఫ్‌సీ', 'ಎಚ್‌ಡಿಎಫ್‌ಸಿ'] },
  { name: 'ICICI Bank', keys: ['icici', 'आईसीआईसीआई', 'আইসিআইসিআই', 'ஐசிஐசிஐ', 'ఐసీఐసీఐ', 'ಐಸಿಐಸಿಐ'] },
  { name: 'Axis Bank', keys: ['axis', 'access bank', 'एक्सिस', 'অ্যাক্সিস', 'ஆக்சிஸ்', 'ஆக்சுஸ்', 'యాక్సిస్', 'ಆಕ್ಸಿಸ್'] },
  { name: 'Punjab National Bank (PNB)', keys: ['pnb', 'punjab national', 'पीएनबी', 'पंजाब नेशनल'] },
  { name: 'Bank of Baroda', keys: ['bank of baroda', 'baroda', 'बैंक ऑफ बड़ौदा', 'बड़ौदा', 'बडौदा'] },
  { name: 'Canara Bank', keys: ['canara', 'kenara', 'केनरा', 'कैनरा', 'ಕೆನರಾ', 'கனரா'] },
  { name: 'Union Bank of India', keys: ['union bank', 'union bank of india', 'यूनियन बैंक'] },
  { name: 'Kotak Mahindra Bank', keys: ['kotak', 'कोटक', 'quote account', 'quote bank'] },
  { name: 'IndusInd Bank', keys: ['indusind', 'induslnd', 'इंडसइंड'] },
  { name: 'Yes Bank', keys: ['yes bank', 'यस बैंक'] },
  { name: 'IDFC FIRST Bank', keys: ['idfc', 'आईडीएफसी'] },
  { name: 'Bank of India', keys: ['bank of india', 'boi', 'बैंक ऑफ इंडिया'] },
  { name: 'Central Bank of India', keys: ['central bank', 'central bank of india', 'सेंट्रल बैंक'] },
  { name: 'Indian Overseas Bank', keys: ['indian overseas', 'iob'] },
  { name: 'Indian Bank', keys: ['indian bank', 'इंडियन बैंक'] },
  { name: 'UCO Bank', keys: ['uco', 'यूको'] },
  { name: 'Federal Bank', keys: ['federal bank'] },
  { name: 'Bank of Maharashtra', keys: ['bank of maharashtra', 'maharashtra bank', 'बँक ऑफ महाराष्ट्र', 'बैंक ऑफ महाराष्ट्र', 'महाराष्ट्र बँक', 'महाराष्ट्र बैंक'] },
  { name: 'Bandhan Bank', keys: ['bandhan', 'बंधन'] },
  { name: 'India Post Payments Bank', keys: ['india post', 'post office', 'ippb', 'पोस्ट ऑफिस', 'डाकघर'] },
  { name: 'Airtel Payments Bank', keys: ['airtel payments', 'airtel bank'] },
  { name: 'Paytm Payments Bank', keys: ['paytm bank', 'paytm payments bank'] },
  { name: 'Regional Rural (Gramin) Bank', keys: ['gramin', 'grameen', 'ग्रामीण'] },
];

function extractBank(text: string, opts: ExtractOptions): Extracted<string> | undefined {
  let best: { name: string; len: number; idx: number } | undefined;
  for (const bank of BANKS) {
    for (const key of bank.keys) {
      const k = nw(key);
      const idx = hasPhrase(text, [key]);
      if (idx < 0) continue;
      // For corrections find the last occurrence instead.
      const at = opts.preferLast ? text.lastIndexOf(k) : idx;
      const better =
        !best ||
        (opts.preferLast ? at > best.idx || (at === best.idx && k.length > best.len) : k.length > best.len || (k.length === best.len && at < best.idx));
      if (better) best = { name: bank.name, len: k.length, idx: at };
    }
  }
  // "union bank of india" contains "bank of india": a longer match covering the same spot wins.
  return best ? { value: best.name, confidence: 0.95 } : undefined;
}

const APPS: { name: string; keys: string[] }[] = [
  { name: 'PhonePe', keys: ['phonepe', 'phone pay', 'phonpe', 'phone-pe', 'fon pay', 'fon pe', 'fonpe', 'फोनपे', 'ফোনপে', 'போன்பே', 'ఫోన్‌పే', 'ఫోన్పే', 'ಫೋನ್‌ಪೇ', 'ফোন পে', 'ఫోన్ పే', 'போன் பே', 'ಫೋನ್ ಪೇ', 'ஹோன்பே', 'ஹோன் பே', 'फोन पे वरून', 'फोन पे द्वारे'] },
  { name: 'Google Pay', keys: ['google pay', 'gpay', 'g pay', 'googlepay', 'tez', 'गूगल पे', 'গুগল পে', 'கூகுள் பே', 'గూగుల్ పే', 'ಗೂಗಲ್ ಪೇ', 'கூபுள் பே', 'గూబుల్ పే', 'गूबल पे'] },
  { name: 'Paytm', keys: ['paytm', 'pay tm', 'पेटीएम', 'পেটিএম', 'பேடிஎம்', 'పేటీఎం', 'పేటియం', 'ಪೇಟಿಎಂ', 'ಪೇಟಿಯೆ', 'ಪೇಟಿಯಂ', 'पेटी एम', 'पे टी एम', 'पेटी इन', 'பேடியம்', 'পেটি এম'] },
  { name: 'BHIM', keys: ['bhim', 'भीम ऐप', 'भीम यूपीआई'] },
  { name: 'Amazon Pay', keys: ['amazon pay', 'अमेज़न पे'] },
  { name: 'CRED', keys: ['cred'] },
  { name: 'Bank app / net banking', keys: ['net banking', 'netbanking', 'internet banking', 'mobile banking', 'bank app', 'bank ka app', 'yono', 'imobile', 'नेट बैंकिंग'] },
];

function extractPaymentApp(text: string): Extracted<string> | undefined {
  let best: { name: string; idx: number } | undefined;
  for (const app of APPS) {
    const idx = hasPhrase(text, app.keys);
    if (idx >= 0 && (!best || idx < best.idx)) best = { name: app.name, idx };
  }
  // "गूगल पे सर्च किया" = searched on Google, not Google Pay.
  if (best?.name === 'Google Pay' && /(google pe|गूगल पे)\s+(search|सर्च|ढूंढ|देख)/.test(text) && hasPhrase(text, ['gpay', 'google pay se', 'गूगल पे से']) < 0) best = undefined;
  if (!best) {
    // "phone pe" in Hindi also means "on the phone"; accept it only as an app mention.
    const m = /(^|[^a-z])(phone pe|फोन पे)\s+(se|app|ऐप|से|upi|यूपीआई)/.exec(text);
    if (m) best = { name: 'PhonePe', idx: m.index };
  }
  return best ? { value: best.name, confidence: 0.9 } : undefined;
}

const UPI_HANDLES = [
  'ybl', 'ibl', 'axl', 'okaxis', 'okhdfcbank', 'okicici', 'oksbi', 'paytm', 'ptyes', 'ptaxis', 'pthdfc', 'ptsbi', 'upi', 'apl', 'yapl',
  'ikwik', 'freecharge', 'axisbank', 'icici', 'sbi', 'hdfcbank', 'kotak', 'kmbl', 'yesbank', 'idfcfirst', 'federal', 'pnb', 'barodampay',
  'unionbank', 'indus', 'airtel', 'jio', 'fbl', 'waicici', 'wahdfcbank', 'waaxis', 'wasbi', 'abfspay', 'pingpay', 'superyes', 'mbk',
  'postbank', 'dbs', 'rbl', 'okbizaxis', 'yesg', 'naviaxis', 'slc', 'tapicici', 'axisb', 'icic', 'aubank', 'cnrb', 'boi', 'uco',
];

function prepUpi(s: string): string {
  let t = s;
  t = t.replace(/\s*(at the rate of|at the rate|at-the-rate|at rate|एट द रेट|एट दी रेट|एट रेट)\s*/g, '@');
  t = t.replace(/\s+(dot|डॉट|डोट)\s+/g, '.');
  t = t.replace(new RegExp(`((?:id|आईडी)\\s+(?:hai\\s+|tha\\s+|is\\s+|was\\s+)?)?([a-z0-9][a-z0-9._-]+)\\s+at\\s+(${UPI_HANDLES.join('|')})(?=[^a-z0-9]|$)`, 'g'), (m, pre: string | undefined, id: string, handle: string) =>
    pre || /[._\d]/.test(id) ? `${pre ?? ''}${id}@${handle}` : m,
  );
  t = t.replace(/\s*@\s*/g, '@');
  return t;
}

const UPI_ONLY = new Set(['ybl', 'ibl', 'axl', 'okaxis', 'okhdfcbank', 'okicici', 'oksbi', 'ptyes', 'ptaxis', 'pthdfc', 'ptsbi', 'apl', 'yapl', 'ikwik', 'waicici', 'wahdfcbank', 'waaxis', 'wasbi', 'abfspay', 'pingpay', 'superyes', 'okbizaxis', 'yesg', 'naviaxis', 'tapicici', 'axisb']);

const UPI_RE = /([a-z0-9][a-z0-9._-]{1,63})@([a-z][a-z0-9]{1,30})(\.[a-z]{2,})?/g;

function extractUpis(prepped: string): { ids: string[]; rest: string } {
  const ids: string[] = [];
  const rest = prepped.replace(UPI_RE, (m, _id: string, _h: string, tld: string | undefined) => {
    // looks like an e-mail address, unless the handle is a UPI-only one (ybl, okaxis…): "rahul.kyc at ybl.ki" is speech
    if (tld && !UPI_ONLY.has(_h)) return ' ';
    const id = (tld ? m.slice(0, m.length - tld.length) : m).replace(/\.$/, '');
    ids.push(id);
    return ' ';
  });
  return { ids, rest };
}

// Native-script ID context words, matched as stems on the sound-alike key (অ্যাকাউন্টে, खात्यात, அக்கவுண்ட்ல).
const ACCOUNT_STEMS = ['अकाउंट', 'खात', 'অ্যাকাউন্ট', 'একাউন্ট', 'খাত', 'அக்கவுண்ட்', 'கணக்க', 'అకౌంట్', 'ఖాతా', 'ಅಕೌಂಟ್', 'ಖಾತೆ'].map(fold);
const UTR_STEMS = ['यूटीआर', 'यूपीआय रेफरन्स', 'रेफरन्स', 'रेफरेंस', 'ইউটিআর', 'রেফারেন্স', 'யூடிஆர்', 'యూటీఆర్', 'ಯುಟಿಆರ್'].map(fold);
const nativeStem = (t: string, stems: string[]) => /[^\x00-\x7f]/.test(t) && stems.some((st) => fold(t).startsWith(st));

/** Native-script digits read out one word at a time (নয় নয় আট আট…, ஒன்பது ஒன்பது எட்டு…): an ID, never an amount. */
function spokenDigitRuns(tokens: string[]): { start: number; digits: string }[] {
  const out: { start: number; digits: string }[] = [];
  // shared with the voice kit (indic/numbers.ts): exact-ish first digit, looser slips inside the run
  // Single digits may sit inside a spoken read-out ("9, 8, 7, 6, 5, 4, 3, 2, 1 பூஜ்யம்"); such a run counts only
  // if it has a number word (all-digit runs are findNumberRuns' job). Not digit groups: "98765 ನಾಲ್ಕು 3710" mixes
  // are mostly misheard, and a wrong phone number is worse than asking.
  const digit = (t: string | undefined, inside = true) => {
    if (t && /^\d$/.test(t)) return t;
    const v = readoutDigit(t, !inside);
    return v === undefined ? undefined : String(v);
  };
  let i = 0;
  while (i < tokens.length) {
    let j = i;
    let d = '';
    for (let x = digit(tokens[j], false); x !== undefined && j < tokens.length; x = digit(tokens[++j])) {
      d += x;
      // Telugu: Whisper writes the digit 1 as ఒంటి గంట ("one o'clock"), sometimes glued to a zero (గంటసున్నా)
      if (tokens[j] === 'ఒంటి' && /^గంటా?$/.test(tokens[j + 1] ?? '')) j++;
      else if (tokens[j] === 'ఒంటి' && /^గంటసున్నా?$/.test(tokens[j + 1] ?? '')) (d += '0'), j++;
    }
    if (d.length >= 7 && tokens.slice(i, j).some((t) => !/^\d+$/.test(t))) out.push({ start: i, digits: d });
    i = Math.max(j, i + 1);
  }
  return out;
}

/**
 * "UTR नंबर है 403218 765 432 5000 रुपए": digit groups of a UTR run straight into the amount. After UTR / reference
 * words, if the leading groups make exactly 12 digits and more groups follow, those 12 digits are the UTR.
 */
function utrPrefix(tokens: string[], r: NumRun): string | undefined {
  if (r.digits.length <= 12) return undefined;
  const ctx = tokens.slice(Math.max(0, r.start - 6), r.start);
  if (!ctx.some((t) => UTR_CTX.has(t) || nativeStem(t, UTR_STEMS))) return undefined;
  let d = '';
  for (let k = r.start; k < r.end - 1; k++) {
    if (!/^\d+$/.test(tokens[k])) return undefined;
    d += tokens[k];
    // the rest must be exactly the amount: one group, then a currency word ("… 432 | 5000 रुपए")
    if (d.length === 12) return k === r.end - 2 && isCurrency(tokens[r.end]) ? d : undefined;
    if (d.length > 12) return undefined;
  }
  return undefined;
}

/**
 * "रेफ नो सहा 12345789012": after a UTR / reference word, a number word and digit groups that make exactly 12 digits.
 * Only exactly 12 and only after the context word: other mixes are mostly misheard (see spokenDigitRuns).
 */
function mixedUtrRuns(tokens: string[]): { start: number; digits: string }[] {
  const out: { start: number; digits: string }[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const ctx = tokens.slice(Math.max(0, i - 4), i);
    if (!ctx.some((t) => UTR_CTX.has(t) || nativeStem(t, UTR_STEMS))) continue;
    let d = '';
    let words = 0;
    let groups = 0;
    let j = i;
    for (; j < tokens.length && d.length <= 12; j++) {
      const t = tokens[j];
      if (/^\d+$/.test(t)) (d += t), t.length > 1 && groups++; // one group only: "161, 23, 45, 57, 90" is a garble
      else {
        const v = readoutDigit(t, true);
        if (v === undefined) break;
        d += String(v);
        words++;
      }
    }
    if (d.length === 12 && words && groups === 1) {
      out.push({ start: i, digits: d });
      i = j;
    }
  }
  return out;
}

function extractIds(tokens: string[], runs: NumRun[], opts: ExtractOptions) {
  const out: Pick<Extraction, 'utr' | 'suspectPhone' | 'suspectAccount'> = {};
  const seqs = [...runs.filter((r) => r.isSeq).map((r) => ({ start: r.start, digits: utrPrefix(tokens, r) ?? r.digits })), ...spokenDigitRuns(tokens), ...mixedUtrRuns(tokens)].sort((a, b) => a.start - b.start);
  for (const r of seqs) {
    const d = r.digits;
    const ctx = tokens.slice(Math.max(0, r.start - 6), r.start);
    const ctxUtr = ctx.some((t) => UTR_CTX.has(t) || nativeStem(t, UTR_STEMS));
    const ctxPhone = ctx.some((t) => PHONE_CTX.has(t));
    const ctxAcct = ctx.some((t) => ACCOUNT_CTX.has(t) || nativeStem(t, ACCOUNT_STEMS));
    const plus = tokens[r.start - 1] === 'plus' || tokens[r.start - 1] === '+';
    const put = <K extends keyof typeof out>(k: K, v: string, c: number) => {
      if (!out[k] || opts.preferLast) out[k] = { value: v, confidence: c };
    };
    if (d.length === 12 && !((ctxPhone || plus) && /^91[6-9]/.test(d)) && !(ctxAcct && !ctxUtr)) {
      put('utr', d, ctxUtr || opts.hint === 'utr' ? 0.95 : 0.85);
    } else if (d.length === 10 && /^[6-9]/.test(d)) {
      put('suspectPhone', d, ctxPhone || opts.hint === 'suspect' ? 0.95 : 0.85);
    } else if (d.length === 11 && /^0[6-9]/.test(d)) {
      put('suspectPhone', d.slice(1), 0.9);
    } else if (d.length === 12 && /^91[6-9]/.test(d)) {
      put('suspectPhone', d.slice(2), 0.9);
    // Without an account word, 9-10 digits after "who was it?" are a phone number with a digit lost, not an account.
    } else if (d.length >= 9 && d.length <= 18 && (ctxAcct || opts.hint === 'suspectAccount' || (opts.hint === 'suspect' && d.length >= 11))) {
      put('suspectAccount', d, ctxAcct ? 0.85 : 0.65);
    }
  }
  return out;
}

/** Extract every field the rules can find in one utterance (or a whole transcript). */
// Cross-language backstops from round2-kit/indic-numbers (vendored in ./indic): Tamil/Kannada
// number compounds, bn/te/kn/mr number words, relative and clock times in all 7 languages, and
// sound-alike bank names in native scripts. The rules above stay primary; these fill gaps and win
// a disagreement only when they have stronger evidence (a currency word next to the number, or an
// explicit clock / "ago" time).

const BARE_MULTS = [1000, 100000, 10000000];

function mergeAmount(k: Extracted<number> | undefined, ind: { value: number; currencyNear: boolean } | undefined, opts: ExtractOptions, text: string): Extracted<number> | undefined {
  // The rule read only "thousand" (বারো হাজার -> 1000): the cross-language reading has the number in front.
  if (k && BARE_MULTS.includes(k.value)) {
    // quarter steps too: साडेतीन / दीड / सव्वा लाख = 3.5 / 1.5 / 1.25 lakh
    if (ind && ind.value > k.value && (ind.value * 4) % k.value === 0) return { value: ind.value, confidence: 0.85 };
    // "শোয হাজার": a misheard number before "thousand". Ask, don't guess 1000.
    if (numberGroups(text).some((g) => g.unsure && g.value === k.value)) return undefined;
  }
  if (!ind) return k;
  const hinted = opts.hint === 'amount';
  if (!k) return ind.currencyNear || hinted ? { value: ind.value, confidence: ind.currencyNear ? 0.9 : 0.75 } : undefined;
  if (ind.currencyNear && ind.value !== k.value) return { value: ind.value, confidence: 0.9 };
  // the rule stopped at a round number and missed its tail: "तीन हजार पाचशे" = 3000 + 500 (Marathi -शे hundreds)
  const unit = k.value % 100000 === 0 ? 100000 : k.value % 1000 === 0 ? 1000 : k.value % 100 === 0 ? 100 : 0; // ...and "nau sau ninyanve" = 900 + 99
  if (unit && ind.value > k.value && ind.value - k.value < unit) return { value: ind.value, confidence: 0.85 };
  // Answering "how much?": a longer reading of the same spoken number wins ("चार हजार नऊशे नव्याण्णव" = 4999).
  if (hinted && ind.value > k.value) return { value: ind.value, confidence: 0.85 };
  return k;
}

function mergeTime(k: Extracted<string> | undefined, ind: TimeHit | undefined): Extracted<string> | undefined {
  if (!ind) return k;
  const sure = ind.kind === 'clock' || ind.kind === 'ago' || ind.kind === 'now' || ind.kind === 'date'; // an explicit date beats a bare "yesterday evening" guess
  if (k && !(sure && Math.abs(new Date(k.value).getTime() - ind.date.getTime()) > 20 * 60_000)) return k;
  if (ind.kind === 'day') return k;
  return { value: ind.date.toISOString(), confidence: ind.kind === 'daypart' ? 0.6 : 0.85 };
}

const BANK_BY_KEY: Record<string, string> = {
  sbi: 'State Bank of India (SBI)', hdfc: 'HDFC Bank', icici: 'ICICI Bank', axis: 'Axis Bank', pnb: 'Punjab National Bank (PNB)',
  bob: 'Bank of Baroda', canara: 'Canara Bank', union: 'Union Bank of India', kotak: 'Kotak Mahindra Bank', indusind: 'IndusInd Bank',
  yes: 'Yes Bank', idfc: 'IDFC FIRST Bank', boi: 'Bank of India', central: 'Central Bank of India', iob: 'Indian Overseas Bank',
  indian: 'Indian Bank', federal: 'Federal Bank', bandhan: 'Bandhan Bank', ippb: 'India Post Payments Bank', airtel: 'Airtel Payments Bank', paytm: 'Paytm Payments Bank',
  mahb: 'Bank of Maharashtra',
};

function indicBank(text: string): Extracted<string> | undefined {
  const hit = findBank(text);
  const name = hit && BANK_BY_KEY[hit.key];
  return name ? { value: name, confidence: Math.min(0.9, hit.confidence) } : undefined;
}

/** A 12-digit UTR glued to the amount by the recogniser: "UTR है 4032187654325000 रुपए" = 403218765432 + 5000.
 * No amount has 15+ digits; split only when the tail is one digit and zeros (5000, not 25000: a misheard extra digit
 * shifts the split) right before a currency word. */
export function splitGluedUtr(text: string): string {
  return text.replace(/(^|\D)(\d{12})([1-9]0{2,4})(?=\s?(?:rs|rupe|rupa|रुप|रूप|টাকা|ரூ|ரு|రూ|ರೂ))/gi, '$1$2 $3');
}

export function extractFields(text: string, opts: ExtractOptions = {}): Extraction {
  if (opts.lang?.startsWith('mr')) text = marathiRoman(text);
  text = hourMinutePhrase(splitGluedUtr(spokenDigits(joinSpelled(unifyScript(text)))));
  const norm = normalize(text);
  const prepped = prepUpi(norm);
  const { ids, rest } = extractUpis(prepped);
  const cleaned = rest.replace(/\s+/g, ' ').trim();
  const tokens = tokenize(cleaned);
  const runs = findNumberRuns(tokens);
  const out: Extraction = {};

  const amount = mergeAmount(extractAmount(tokens, runs, opts), findAmountHit(text), opts, text);
  // Under ₹100 in a fraud report: every one in the harness was a dropped "thousand" / "lakh" (5 for 5,000).
  // Keep it, but unsure: the app asks and offers ₹5,000 / ₹5,00,000.
  if (amount) out.amount = amount.value < 100 ? { ...amount, confidence: Math.min(amount.confidence, 0.45) } : amount;
  const time = mergeTime(extractTime(cleaned, tokens, runs, opts), findTime(text, opts.now ?? new Date()));
  if (time) out.time = time;
  const scam = extractScamType(cleaned, opts);
  if (scam) out.scamType = scam;
  // In a correction ("HDFC, not SBI") the cross-language matcher reads the negation; the rule only takes the last name.
  const negated = /(^|[^a-z])(not|no|nahi)([^a-z]|$)/i.test(text) || /नहीं|नही|नाही|না|இல்ல|కాదు|ಅಲ್ಲ|ಇಲ್ಲ/.test(text.normalize('NFC'));
  const bank = opts.preferLast && negated ? (indicBank(text) ?? extractBank(cleaned, opts)) : (extractBank(cleaned, opts) ?? indicBank(text));
  if (bank) out.bank = bank;
  const app = extractPaymentApp(cleaned);
  if (app) out.paymentApp = app;
  if (ids.length) out.suspectUpi = { value: opts.preferLast ? ids[ids.length - 1] : ids[0], confidence: 0.92 };
  Object.assign(out, extractIds(tokens, runs, opts));
  return out;
}

// ---------------------------------------------------------------------------
// Intents, language names and voice corrections
// ---------------------------------------------------------------------------

export type Intent = 'skip' | 'wait' | 'yes' | 'no';

const SKIP_WORDS = ['maahit naahi', 'mahit nahi', 'mahit nahin', 'maahit nahin', 'mahit naahi', 'skip', 'skip karo', 'pata nahi', 'pata nahin', 'pata nhi', 'nahi pata', 'nahin pata', 'maloom nahi', 'malum nahi', 'nahi maloom', "don't know", 'dont know', 'do not know', 'no idea', 'not sure', 'aage badho', 'छोड़ो', 'छोडो', 'पता नहीं', 'मालूम नहीं', 'स्किप', 'জানি না', 'தெரியாது', 'తెలియదు', 'माहित नाही', 'माहिद नाही', 'ಗೊತ್ತಿಲ್ಲ'];
const WAIT_WORDS = ['ek minute ruko', 'ek minute', 'ek min', 'ruko', 'ruk jao', 'rukiye', 'wait', 'hold on', 'one minute', 'रुको', 'रुकिए', 'एक मिनट', 'এক মিনিট', 'দাঁড়ান', 'ஒரு நிமிடம்', 'ஒரு நிமிஷம்', 'ఒక్క నిమిషం', 'थांबा', 'एक मिनिट', 'ಒಂದು ನಿಮಿಷ'];
const YES_WORDS = ['haan', 'han', 'haa', 'ha', 'ji', 'haan ji', 'yes', 'yeah', 'yep', 'sahi', 'sahi hai', 'theek hai', 'thik hai', 'correct', 'right', 'ok', 'okay', 'हाँ', 'हां', 'जी', 'सही', 'ठीक', 'হ্যাঁ', 'ঠিক', 'ஆம்', 'சரி', 'అవును', 'సరే', 'होय', 'बरोबर', 'ಹೌದು', 'ಸರಿ'];
const NO_WORDS = ['nahi', 'nahin', 'nhi', 'na', 'no', 'galat', 'wrong', 'नहीं', 'गलत', 'না', 'ভুল', 'இல்லை', 'தவறு', 'కాదు', 'లేదు', 'नाही', 'चूक', 'ಇಲ್ಲ', 'ತಪ್ಪು'];

export function detectIntent(text: string): Intent | null {
  text = unifyScript(text);
  const s = normalize(text);
  const words = wordCount(s);
  if (hasPhrase(s, SKIP_WORDS) >= 0) return 'skip';
  if (words <= 4 && hasPhrase(s, WAIT_WORDS) >= 0 && hasPhrase(s, AGO) < 0) return 'wait';
  if (words <= 4) {
    const y = hasPhrase(s, YES_WORDS);
    const n = hasPhrase(s, NO_WORDS);
    if (n >= 0 && (y < 0 || n <= y)) return 'no';
    if (y >= 0) return 'yes';
  }
  return null;
}

export type LangCode = 'hi-IN' | 'en-IN' | 'bn-IN' | 'ta-IN' | 'te-IN' | 'mr-IN' | 'kn-IN';

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
    const idx = hasPhrase(s, names);
    if (idx >= 0 && (!best || idx < best.idx)) best = { code, idx };
  }
  return best?.code ?? null;
}

const FIELD_WORDS: [FieldKey, string[]][] = [
  ['suspectAccount', ['account number', 'account no', 'khata number', 'खाता नंबर', 'अकाउंट नंबर']],
  ['utr', ['utr', 'reference', 'ref no', 'transaction id', 'transaction number', 'txn', 'यूटीआर']],
  ['suspectUpi', ['upi id', 'upi', 'यूपीआई']],
  ['suspectPhone', ['phone', 'mobile', 'number', 'फोन', 'मोबाइल', 'नंबर', 'नमबर']],
  ['paymentApp', ['app', 'ऐप', 'एप']],
  ['bank', ['bank', 'बैंक', 'ব্যাংক', 'வங்கி', 'బ్యాంక్', 'बँक', 'ಬ್ಯಾಂಕ್']],
  ['time', ['time', 'samay', 'waqt', 'vakt', 'date', 'tarikh', 'kab', 'समय', 'वक्त', 'वक़्त', 'तारीख', 'कब', 'সময়', 'நேரம்', 'సమయం', 'वेळ', 'ಸಮಯ']],
  ['scamType', ['scam', 'fraud type', 'type', 'tarika', 'tareeka', 'तरीका', 'प्रकार', 'धोखा']],
  ['amount', ['amount', 'rakam', 'raqam', 'paise', 'paisa', 'rupaye', 'rupees', 'rupee', 'रकम', 'राशि', 'पैसे', 'रुपये', 'টাকা', 'தொகை', 'ரூபாய்', 'మొత్తం', 'रक्कम', 'ಮೊತ್ತ']],
];

const TARGETS: Record<FieldKey, Hint> = {
  amount: 'amount', time: 'time', scamType: 'scamType', bank: 'bank', paymentApp: 'paymentApp',
  utr: 'utr', suspectUpi: 'suspect', suspectPhone: 'suspect', suspectAccount: 'suspectAccount',
};

export interface Correction {
  field: FieldKey;
  value: string | number;
  confidence: number;
}

/**
 * Parse a spoken correction such as "amount galat hai, 5999 tha" or
 * "bank SBI nahi HDFC tha". Returns exactly one field (or null).
 */
export function parseCorrection(text: string, opts: { now?: Date; lang?: string } = {}): Correction | null {
  text = unifyScript(text);
  const s = normalize(text);
  let field: FieldKey | undefined;
  let at = Infinity;
  for (const [key, words] of FIELD_WORDS) {
    const idx = hasPhrase(s, words);
    if (idx >= 0 && idx < at) {
      at = idx;
      field = key;
    }
  }
  const base = { now: opts.now, preferLast: true, lang: opts.lang };
  if (field) {
    const ext = extractFields(text, { ...base, hint: TARGETS[field] });
    let hit = ext[field];
    // "phone"/"number" may actually carry a UTR or a UPI ID; trust the value shape.
    if (!hit && field === 'suspectPhone') {
      for (const alt of ['utr', 'suspectUpi', 'suspectAccount', 'amount'] as FieldKey[]) {
        // a 7+ digit run under "number" is a phone with a digit lost, not a ₹98 crore amount: ask again
        if (ext[alt] && !(alt === 'amount' && Number(ext[alt]!.value) >= 1_000_000)) {
          field = alt;
          hit = ext[alt];
          break;
        }
      }
    }
    if (!hit && field === 'suspectUpi' && ext.utr) {
      field = 'utr';
      hit = ext.utr;
    }
    if (!hit) return null;
    return { field, value: hit.value, confidence: hit.confidence };
  }
  // No field named: infer from the shape of the value.
  const ext = extractFields(text, base);
  const order: FieldKey[] = ['suspectUpi', 'utr', 'suspectPhone', 'suspectAccount', 'bank', 'paymentApp', 'scamType', 'time', 'amount'];
  for (const k of order) {
    const hit = ext[k];
    if (hit) return { field: k, value: hit.value, confidence: hit.confidence };
  }
  const amt = extractFields(text, { ...base, hint: 'amount' }).amount;
  // "NOMOR BHUL 981112233": an ungrouped 7+ digit run is an ID with a digit lost (money is written 20,000 / 2,50,000)
  if (amt && Number(amt.value) >= 1_000_000 && /(^|[^\d,])\d{7,}(?![\d,])/.test(text)) return null;
  return amt ? { field: 'amount', value: amt.value, confidence: amt.confidence * 0.8 } : null;
}
