// Shared helpers for the Turant eval harness: canonical names, time targets,
// text normalisation, WER/CER, and the "is the value still in the transcript?" oracles
// used to split ASR errors from extraction errors.

/** Fixed evaluation clock: Sat 21 Nov 2026, 12:00 local time (same as extract.test.ts). */
export const NOW = new Date(2026, 10, 21, 12, 0, 0);

export const BANK_IDS = {
  sbi: 'State Bank of India (SBI)', hdfc: 'HDFC Bank', icici: 'ICICI Bank', axis: 'Axis Bank',
  pnb: 'Punjab National Bank (PNB)', bob: 'Bank of Baroda', canara: 'Canara Bank', union: 'Union Bank of India',
  kotak: 'Kotak Mahindra Bank', indusind: 'IndusInd Bank', yes: 'Yes Bank', idfc: 'IDFC FIRST Bank',
  boi: 'Bank of India', central: 'Central Bank of India', iob: 'Indian Overseas Bank', indian: 'Indian Bank',
  uco: 'UCO Bank', federal: 'Federal Bank', bandhan: 'Bandhan Bank', ippb: 'India Post Payments Bank',
  airtel: 'Airtel Payments Bank', paytmbank: 'Paytm Payments Bank', gramin: 'Regional Rural (Gramin) Bank',
};
export const APP_IDS = {
  phonepe: 'PhonePe', gpay: 'Google Pay', paytm: 'Paytm', bhim: 'BHIM', amazonpay: 'Amazon Pay', cred: 'CRED',
  bankapp: 'Bank app / net banking',
};
export const FIELDS = ['amount', 'time', 'scamType', 'bank', 'paymentApp', 'utr', 'suspectUpi', 'suspectPhone', 'suspectAccount'];
export const DEFAULT_TIME_TOL_MIN = 20;

export function timeTarget(exp, now = NOW) {
  if (typeof exp.ago === 'number') return new Date(now.getTime() - exp.ago * 60_000);
  const d = new Date(now.getTime());
  d.setDate(d.getDate() + exp.day);
  const [h, m] = exp.at.split(':').map(Number);
  d.setHours(h, m, 0, 0);
  return d;
}

/** Expected value in the extractor's own vocabulary (for display and comparison). */
export function canonicalExpected(field, v) {
  if (field === 'bank') return BANK_IDS[v];
  if (field === 'paymentApp') return APP_IDS[v];
  if (field === 'time') return timeTarget(v).toISOString();
  return v;
}

export function fieldMatches(field, expected, got) {
  if (got === undefined || got === null) return false;
  switch (field) {
    case 'amount':
      return Number(got) === Number(expected);
    case 'time': {
      const tol = (expected.tol ?? DEFAULT_TIME_TOL_MIN) * 60_000;
      const t = new Date(got).getTime();
      return !Number.isNaN(t) && Math.abs(t - timeTarget(expected).getTime()) <= tol;
    }
    case 'bank':
      return String(got).toLowerCase() === BANK_IDS[expected].toLowerCase();
    case 'paymentApp':
      return String(got).toLowerCase() === APP_IDS[expected].toLowerCase();
    case 'utr':
    case 'suspectPhone':
    case 'suspectAccount':
      return String(got).replace(/\D/g, '') === String(expected).replace(/\D/g, '');
    case 'suspectUpi':
      return String(got).toLowerCase().replace(/\s/g, '') === String(expected).toLowerCase();
    default:
      return String(got) === String(expected);
  }
}

/** Human-readable relative time for reports ("-1d 19:00", "10 min ago"). */
export function describeTime(iso, now = NOW) {
  if (!iso) return '';
  const d = new Date(iso);
  const mins = Math.round((now.getTime() - d.getTime()) / 60_000);
  const day0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayD = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dd = Math.round((dayD - day0) / 86_400_000);
  const hm = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  return `${dd === 0 ? 'today' : `${dd}d`} ${hm} (${mins} min ago)`;
}

// ---------------------------------------------------------------------------
// Text normalisation, WER / CER
// ---------------------------------------------------------------------------

const DIGIT_BLOCKS = [0x0966, 0x09e6, 0x0a66, 0x0ae6, 0x0b66, 0x0be6, 0x0c66, 0x0ce6, 0x0d66];
export function foldDigits(s) {
  return s.replace(/[०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯]/g, (ch) => {
    const c = ch.codePointAt(0);
    return String(c - DIGIT_BLOCKS.find((b) => c >= b && c <= b + 9));
  });
}

/** Normalisation for WER/CER: NFC, lower case, native digits folded, punctuation removed. */
export function normText(s) {
  return foldDigits(String(s ?? '').normalize('NFC').toLowerCase())
    .replace(/[​-‍﻿]/g, '')
    .replace(/(\d),(?=\d)/g, '$1')
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function editDistance(a, b) {
  const n = a.length;
  const m = b.length;
  if (!n) return m;
  if (!m) return n;
  let prev = Array.from({ length: m + 1 }, (_, j) => j);
  for (let i = 1; i <= n; i++) {
    const cur = [i];
    for (let j = 1; j <= m; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[m];
}

/** Returns {errors, length} so corpus-level rates can be micro-averaged. */
export function wer(ref, hyp) {
  const r = normText(ref).split(' ').filter(Boolean);
  const h = normText(hyp).split(' ').filter(Boolean);
  return { errors: editDistance(r, h), length: r.length };
}
export function cer(ref, hyp) {
  const r = [...normText(ref).replace(/ /g, '')];
  const h = [...normText(hyp).replace(/ /g, '')];
  return { errors: editDistance(r, h), length: r.length };
}

// ---------------------------------------------------------------------------
// Oracles: is the expected value still recoverable from the transcript?
// true  -> the transcript carries the value: a miss is an EXTRACTION error
// false -> the value was lost / misheard: an ASR error
// ---------------------------------------------------------------------------

const SQUASH_STOP = new Set(['dot', 'at', 'the', 'rate', 'of', 'डॉट', 'एट', 'द', 'रेट', 'ডট', 'অ্যাট', 'டாட்', 'அட்', 'డాట్', 'ఎట్', 'ಡಾಟ್']);

function digitsOnly(s) {
  return foldDigits(String(s)).replace(/\D/g, '');
}

// Oracle-only number lexicon (independent of extract.ts, deliberately broader). Kinds:
// u = unit/tens (adds), h = x100, m = multiplier (1000 / lakh), f = fused value that adds as-is
// (Tamil ஐயாயிரம் = 5000, Marathi पाचशे = 500 ...), s = standalone fraction (डेढ़ = 1.5), p = +0.5 prefix (साढ़े).
const NUM_LEX = (() => {
  const L = new Map();
  const add = (kind, obj) => { for (const [w, v] of Object.entries(obj)) for (const k of w.split('/')) L.set(normWord(k), [kind, v]); };
  add('u', {
    'zero/oh/shunya': 0, 'one/ek/एक/এক/ஒன்று/ஒரு/ఒక/ఒకటి/ಒಂದು/ఒక్క': 1, 'two/do/दो/दोन/দুই/দু/இரண்டு/ரெண்டு/రెండు/ಎರಡು': 2,
    'three/teen/तीन/তিন/மூன்று/మూడు/ಮೂರು': 3, 'four/char/chaar/चार/চার/நான்கு/நாலு/నాలుగు/ನಾಲ್ಕು': 4,
    'five/paanch/panch/पांच/पाँच/पाच/পাঁচ/ஐந்து/అయిదు/ఐదు/ಐದು': 5, 'six/chhe/chhah/छह/छः/छे/सहा/ছয়/ছয়/ஆறு/ఆరు/ಆರು': 6,
    'seven/saat/सात/সাত/ஏழு/ఏడు/ಏಳು': 7, 'eight/aath/आठ/আট/எட்டு/ఎనిమిది/ಎಂಟು': 8,
    'nine/nau/नौ/नऊ/নয়/নয়/ஒன்பது/తొమ్మిది/ಒಂಬತ್ತು': 9, 'ten/das/दस/दहा/দশ/பத்து/పది/ಹತ್ತು': 10,
    'eleven/gyarah/ग्यारह': 11, 'twelve/barah/बारह/बारा/বারো/பன்னிரண்டு/పన్నెండు/ಹನ್ನೆರಡು': 12, 'fourteen/chaudah/चौदह/চোদ্দ': 14,
    'fifteen/pandrah/पंद्रह/पन्द्रह/पंधरा/পনেরো/பதினைந்து/పదిహేను/ಹದಿನೈದು': 15, 'eighteen/atharah/अठारह/আঠারো': 18,
    'twenty/bees/बीस/वीस/কুড়ি/বিশ/இருபது/ఇరవై/ಇಪ್ಪತ್ತು': 20, 'chhabbis/छब्बीस/ছাব্বিশ': 26, 'thirty/tees/तीस/ত্রিশ/முப்பது/ముప్పై/ಮೂವತ್ತು': 30,
    'forty/chalis/चालीस/চল্লিশ/நாற்பது/నలభై/ನಲವತ್ತು': 40, 'saintalis/सैंतालीस/सत्तेचाळीस/সাতচল্লিশ/ನಲವತ್ತೇಳು': 47,
    'fifty/pachas/पचास/पन्नास/পঞ্চাশ/ஐம்பது/యాభై/ಐವತ್ತು': 50, 'sixty/साठ/ষাট': 60,
    'seventy/sattar/सत्तर/সত্তর/எழுபது/డెబ్బై/ಎಪ್ಪತ್ತು': 70, 'eighty/assi/अस्सी/আশি': 80, 'ninety/nabbe/नब्बे/নব্বই/తొంభై/ತೊಂಬತ್ತು': 90,
    'ninyanve/निन्यानवे/नव्याण्णव/নিরানব্বই/தொண்ணூத்தொன்பது/ತೊಂಬತ್ತೊಂಬತ್ತು': 99,
  });
  // spellings Whisper actually produces for spoken digits (colloquial / phonetic variants)
  add('u', { 'ವಂದು/ఒంటి': 1, 'ಇರಡು/రిండు': 2, 'మోడు': 3, 'ಆಯಿದು/ಆಯದು/అయ్దు': 5, 'ಎಳು/ఏళు': 7, 'తుమ్మిది/తోమ్మిది': 9 });
  add('h', { 'hundred/sau/सौ/शंभर/শো/শ/నూరు/వంద/వందల/ನೂರು/ನೂರ': 100 });
  add('m', { 'thousand/hazaar/hazar/हजार/হাজার/ஆயிரம்/ஆயிரத்து/వేలు/వేల/వెయ్యి/ಸಾವಿರ/ಸಾವಿರದ': 1000, 'lakh/lakhs/lac/लाख/লাখ/லட்சம்/லட்சத்து/లక్ష/లక్షల/లక్షలు/ಲಕ್ಷ': 100000, 'crore/करोड': 10000000 });
  add('f', {
    'पाचशे/পাঁচশো/ஐநூறு/ಐನೂರು': 500, 'सहाशे/ছশো/அறுநூறு/ಆರುನೂರು': 600, 'नऊशे/নশো/தொள்ளாயிரத்து/ಒಂಬೈನೂರ': 900,
    'இரண்டாயிரத்து/இரண்டாயிரம்': 2000, 'நாலாயிரத்து': 4000, 'ஐயாயிரம்/ஐந்தாயிரம்': 5000, 'ஆறாயிரம்': 6000, 'எட்டாயிரம்': 8000,
    'ஒன்பதாயிரம்': 9000, 'பத்தாயிரம்': 10000, 'பன்னிரண்டாயிரத்து': 12000, 'பதினைந்தாயிரம்': 15000, 'இருபதாயிரம்': 20000,
    'நாற்பத்தேழாயிரம்': 47000, 'எழுபதாயிரம்': 70000,
  });
  add('s', { 'dedh/डेढ़/डेढ/देड़/देढ़/दीड/দেড়/ஒன்றரை/ఒకటిన్నర/ಒಂದೂವರೆ': 1.5, 'dhai/ढाई/धाई/अडीच/আড়াই/இரண்டரை/రెండున్నర/ಎರಡೂವರೆ': 2.5, 'साडेतीन/మూడున్నర/ಮೂರುವರೆ': 3.5, 'साडेनऊ': 9.5, 'साडेदहा': 10.5 });
  add('p', { 'saade/sade/साढ़े/साढे/साडे/সাড়ে/সাড়ে': 0.5 });
  return L;
})();

function normWord(w) {
  return w.normalize('NFC').toLowerCase().replace(/[​-‍﻿]/g, '').replace(/[़়਼઼଼಼]/g, '').replace(/ँ/g, 'ं').replace(/ঁ/g, 'ং');
}

/** Every number a transcript can be read as saying: digit groups, digits + multiplier, and spoken number words. */
export function numbersInText(t) {
  const s = foldDigits(normWord(String(t))).replace(/(\d),(?=\d)/g, '$1');
  const toks = s.split(/[\s₹,;!?।"'()]+|(?<=\d)(?=[^\d.:])|(?<=[^\d.:])(?=\d)/u).map((x) => x.replace(/^[.\-]+|[.\-]+$/g, '')).filter(Boolean);
  const out = new Set();
  let total = 0, cur = 0, half = 0, inRun = false;
  const flush = () => {
    if (inRun) out.add(Math.round((total + cur) * 100) / 100);
    total = cur = half = 0;
    inRun = false;
  };
  for (const tok of toks) {
    if (/^\d+(\.\d+)?$/.test(tok)) {
      if (inRun && cur && !total) flush();
      cur += parseFloat(tok);
      inRun = true;
      continue;
    }
    const lex = NUM_LEX.get(tok);
    if (!lex) { flush(); continue; }
    const [kind, v] = lex;
    inRun = true;
    if (kind === 'u') { cur += v + half; half = 0; }
    else if (kind === 'p') half = v;
    else if (kind === 's') cur += v;
    else if (kind === 'h') cur = (cur || 1) * 100;
    else if (kind === 'm') { total += (cur || 1) * v; cur = 0; }
    else if (kind === 'f') { if (v >= 1000) total += v; else cur += v; }
  }
  flush();
  return out;
}

function amountsInText(t) {
  return numbersInText(t);
}

const ZERO_WORDS = new Set(['zero', 'oh', 'shunya', 'शून्य', 'सुन्ना', 'শূন্য', 'শুন্য', 'সুন্না', 'பூஜ்ஜியம்', 'ஜீரோ', 'சைபர்', 'సున్నా', 'ಸೊನ್ನೆ', 'ಶೂನ್ಯ'].map(normWord));
const REPEAT_WORDS = new Map([['double', 2], ['triple', 3], ['डबल', 2], ['ডাবল', 2], ['டபுள்', 2], ['డబుల్', 2], ['ಡಬಲ್', 2]].map(([k, v]) => [normWord(k), v]));

/** Digits as spoken one by one, in digits or number words of any language ("ఒంబత్తు ఎనిమిది" -> "98"). */
export function digitSequence(t) {
  let out = '';
  let rep = 1;
  for (const raw of foldDigits(normWord(String(t))).split(/[\s,;.!?।"'()\-]+/)) {
    if (!raw) continue;
    if (/^\d+$/.test(raw)) { out += raw[0].repeat(rep) + raw.slice(1); rep = 1; continue; }
    if (REPEAT_WORDS.has(raw)) { rep = REPEAT_WORDS.get(raw); continue; }
    const lex = NUM_LEX.get(raw);
    const d = ZERO_WORDS.has(raw) ? 0 : lex && lex[0] === 'u' && lex[1] <= 9 ? lex[1] : null;
    if (d !== null) { out += String(d).repeat(rep); rep = 1; }
  }
  return out;
}

export function valueInTranscript(field, expected, transcript) {
  const t = String(transcript ?? '');
  switch (field) {
    case 'utr':
    case 'suspectPhone':
    case 'suspectAccount':
      return digitsOnly(t).includes(String(expected)) || digitSequence(t).includes(String(expected));
    case 'suspectUpi': {
      const squash = (x) =>
        foldDigits(x.normalize('NFC').toLowerCase())
          .replace(/@/g, ' ')
          .replace(/\./g, ' ')
          .split(/\s+/)
          .filter((w) => w && !SQUASH_STOP.has(w))
          .join('')
          .replace(/[^\p{L}\p{N}]/gu, '');
      return squash(t).includes(squash(expected));
    }
    case 'amount':
      return amountsInText(t).has(Number(expected));
    default:
      return null; // categorical / time: decided by transcript similarity in run_eval
  }
}
