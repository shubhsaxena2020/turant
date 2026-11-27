// When did it happen? Relative ("das minute pehle", "দশ মিনিট আগে", "பத்து நிமிஷம் முன்னாடி")
// and absolute ("kal shaam 7 baje", "গতকাল সন্ধ্যা সাতটায়", "நேற்று இரவு 9:30 மணிக்கு")
// in hi/mr/bn/ta/te/kn/en. Returns an absolute Date. Pure, no DOM.
import { combine, fold, foldParts, tokenize, wordParts } from './numbers';

export interface TimeHit {
  date: Date;
  kind: 'now' | 'ago' | 'clock' | 'daypart' | 'day' | 'date';
  /** minutes of uncertainty (a bare "yesterday evening" is fuzzy) */
  tolerance: number;
}

const N = (l: string[]) => l.map((w) => w.normalize('NFC'));
// ASR spells time words one letter off (மனிக்கு, নিমিশাল, শকাল): also compare sound-alike keys.
// Short keys must match the whole word: folded மணி would otherwise prefix-match மனிதன் ("person").
const FOLDED = new Map<string[], string[]>();
const folded = (list: string[]) => FOLDED.get(list) ?? (FOLDED.set(list, list.map(fold)), FOLDED.get(list)!);
const fuzzyPrefix = (f: string, k: string) => f === k || ([...k].length >= 4 && f.startsWith(k));
const has = (t: string, list: string[]) => list.some((w) => t === w || t.startsWith(w)) || folded(list).some((k) => fuzzyPrefix(fold(t), k));
const is = (t: string, list: string[]) => list.includes(t) || folded(list).includes(fold(t));
// English words must not prefix-match short time words: "amount" / "Amazon" are not "am", "rate" is not "rat" (night).
const wordHas = (t: string, list: string[]) =>
  /^[a-z]+$/.test(t) ? list.some((w) => t === w || (w.length >= 4 && t.startsWith(w))) || folded(list).some((k) => fuzzyPrefix(fold(t), k)) : has(t, list);

const NOW_WORDS = N(['अभी', 'abhi', 'এইমাত্র', 'এইমাত্রো', 'এইমত্র', 'এখনই', 'இப்பதான்', 'இப்போதான்', 'ఇప్పుడే', 'ఇపుడే', 'ಈಗಷ್ಟೇ', 'आत्ताच', 'just']);
const MIN = N(['minitaan', 'minutean', 'मिनट', 'मिनिट', 'minute', 'min', 'মিনিট', 'நிமிட', 'நிமிஷ', 'நிமிண', 'నిమిష', 'ನಿಮಿಷ']);
const HOUR = N(['taas', 'taasa', 'taasaa', 'घंटा', 'घंटे', 'घण्टा', 'तास', 'ghanta', 'ghante', 'hour', 'hr', 'ঘণ্টা', 'ঘন্টা', 'மணி நேர', 'நேரத்', 'గంట', 'ಗಂಟೆ']);
const DAY = N(['divas', 'divsaan', 'divasaan', 'दिन', 'दिवस', 'din', 'day', 'দিন', 'நாள', 'நாட்', 'రోజు', 'రోజుల', 'రోజిల', 'రోజల', 'ದಿನ']);
const AGO = N(['poorvi', 'purvi', 'apurvi', 'aappurvi', 'पहले', 'pehle', 'pahle', 'पूर्वी', 'कूर्वी', 'कूरवी', // कूर्वी: how Whisper writes Marathi पूर्वी
  'ago', 'back', 'before', 'আগে', 'முன்னாடி', 'முன்பு', 'முன்', 'க்கு', 'క్రితం', 'కృతం', 'క్రతం', 'ಹಿಂದೆ']);
const HALF_UNIT_WORDS: [string, number][] = [
  ['अरगंट', 30], ['అరగంట', 30], ['ಅರ್ಧಗಂಟೆ', 30], ['अर्ध्यातास', 30], ['अर्धातास', 30], ['आधा', 0.5], ['आध', 0.5], ['adha', 0.5], ['aadha', 0.5], ['half', 0.5], ['আধ', 0.5], ['আধা', 0.5], ['அரை', 0.5], ['అర', 0.5], ['ಅರ್ಧ', 0.5], ['अर्ध्या', 0.5], ['अर्धा', 0.5],
];

const TODAY = N(['आज', 'aaj', 'today', 'আজ', 'இன்று', 'இன்னைக்கு', 'இன்னிக்கு', 'ఈరోజు', 'ఈ రోజు', 'ಇಂದು', 'ಇವತ್ತು']);
const YESTERDAY = N(['kaal', 'कल', 'kal', 'काल', 'yesterday', 'গতকাল', 'গতোকাল', 'গতুকাল', 'কাল', 'நேற்று', 'நேத்து', 'నిన్న', 'ನಿನ್ನೆ']);
const DAY_BEFORE = N(['परसों', 'parso', 'parson', 'परवा', 'পরশু', 'முந்தாநாள்', 'మొన్న', 'ಮೊನ್ನೆ']);

const MORNING = N(['sakaali', 'sakaari', 'sakali', 'सुबह', 'सुभा', 'सुबा', 'subah', 'सकाळी', 'सकाळ', 'ಬಳಿಗ್ಗೆ', 'ಬಳಿಗೆ', 'morning', 'সকাল', 'সকালে', 'காலை', 'காலைல', 'ఉదయం', 'ಬೆಳಿಗ್ಗೆ', 'ಬೆಳಗ್ಗೆ', 'am']);
const AFTERNOON = N(['doopaari', 'dupari', 'dupaari', 'दोपहर', 'dopahar', 'dopehar', 'दुपारी', 'afternoon', 'দুপুর', 'দুপুরে', 'மதியம்', 'మధ్యాహ్నం', 'ಮಧ್ಯಾಹ್ನ']);
const EVENING = N(['sandhyaakaari', 'sandhyakali', 'sandhyaakaali', 'शाम', 'shaam', 'sham', 'संध्याकाळी', 'संध्या', // संध्याकाली / संध्याकारी (ASR)
  'evening', 'সন্ধ্যা', 'সন্ধ্যায়', 'সন্ধা', 'সুন্ধা', 'বিকেল', 'বিকেলে', 'மாலை', 'சாயங்காலம்', 'సాయంత్రం', 'ಸಂಜೆ', 'ಸಂಜಿ', 'pm']);
const NIGHT = N(['raatri', 'ratri', 'रात', 'raat', 'rat', 'रात्री', 'night', 'রাত', 'রাতে', 'இரவு', 'ராத்திரி', 'రాత్రి', 'ರಾತ್ರಿ']);

const OCLOCK = N(['vaajata', 'vaajta', 'vajta', 'vaajastha', 'बजे', 'baje', 'bajay', 'bajey', 'वाजता', 'वाजले', "o'clock", 'oclock', 'মণিক্কু', 'மணிக்கு', 'மணி', 'గంటలకు', 'గంటల', 'ಗಂಟೆಗೆ', 'ಗಂಟಗೆ', 'ಗಂಟಿಗೆ', 'ಕ್ಕೆ', 'కి', 'pm', 'am', 'baje']);
// "-টায়" = at … o'clock. Plain "-টা" is also the counting word (একটা = "a"), so it only counts before বাজে.
const BN_AT = new RegExp('(?:' + N(['টায়', 'টায়', 'তায়', 'টাই']).join('|') + ')$');
const BN_TA = new RegExp(N(['টা'])[0] + '$');

function dayOffset(toks: string[]): number | undefined {
  for (const t of toks) {
    if (has(t, DAY_BEFORE)) return -2;
    if (is(t, YESTERDAY)) return -1;
    if (is(t, TODAY)) return 0;
  }
  return undefined;
}

// A weekday or a calendar date, as days before today: "on Monday", "last Friday", "25th November", "Nov 25", "25/11",
// "25 नवंबर", "सोमवार को". Always in the past (a fraud already happened): a date later than today is last year's.
const WEEKDAYS: [number, string[]][] = [
  [0, ['sunday', 'ravivar', 'raviwar', 'itvaar', 'itwar', 'रविवार', 'इतवार', 'रविवारी']],
  [1, ['monday', 'somvar', 'somwar', 'सोमवार', 'सोमवारी']],
  [2, ['tuesday', 'mangalvar', 'mangalwar', 'मंगलवार', 'मंगळवार', 'मंगळवारी']],
  [3, ['wednesday', 'budhvar', 'budhwar', 'बुधवार', 'बुधवारी']],
  [4, ['thursday', 'guruvar', 'guruwar', 'brihaspativar', 'गुरुवार', 'गुरुवारी', 'बृहस्पतिवार']],
  [5, ['friday', 'shukravar', 'shukrawar', 'शुक्रवार', 'शुक्रवारी']],
  [6, ['saturday', 'shanivar', 'shaniwar', 'शनिवार', 'शनिवारी']],
];
const LAST = ['last', 'pichhle', 'pichle', 'पिछले', 'मागच्या', 'गेल्या'];
const MONTHS: [number, string[]][] = [
  [0, ['january', 'jan', 'जनवरी', 'जानेवारी']],
  [1, ['february', 'feb', 'फरवरी', 'फेब्रुवारी']],
  [2, ['march', 'mar', 'मार्च']],
  [3, ['april', 'apr', 'अप्रैल', 'एप्रिल']],
  [4, ['may', 'मई', 'मे']],
  [5, ['june', 'jun', 'जून']],
  [6, ['july', 'jul', 'जुलाई', 'जुलै']],
  [7, ['august', 'aug', 'अगस्त', 'ऑगस्ट']],
  [8, ['september', 'sept', 'sep', 'सितंबर', 'सितम्बर', 'सप्टेंबर']],
  [9, ['october', 'oct', 'अक्टूबर', 'ऑक्टोबर']],
  [10, ['november', 'nov', 'नवंबर', 'नवम्बर', 'नोव्हेंबर']],
  [11, ['december', 'dec', 'दिसंबर', 'दिसम्बर', 'डिसेंबर']],
].map(([m, w]) => [m as number, N(w as string[])]);
const MONTH_RE = MONTHS.flatMap(([, w]) => w).sort((a, b) => b.length - a.length).join('|');

function dateOffset(text: string, toks: string[], now: Date): number | undefined {
  const midnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  for (const [dow, words] of WEEKDAYS) {
    if (!toks.some((t) => words.includes(t))) continue;
    let back = (now.getDay() - dow + 7) % 7;
    if (back === 0 && toks.some((t) => LAST.includes(t))) back = 7;
    return -back;
  }
  const monthOf = (w: string) => MONTHS.find(([, ws]) => ws.includes(w.toLowerCase().replace(/\.$/, '')))?.[0];
  let day: number | undefined;
  let month: number | undefined;
  let year: number | undefined;
  let dm = new RegExp(`(?<![\\d.:])(\\d{1,2})(st|nd|rd|th)?\\s+(of\\s+)?(${MONTH_RE})(?![\\p{L}\\p{M}])\\.?(?:,?\\s+(\\d{4}))?`, 'iu').exec(text);
  let md = new RegExp(`(?<![\\p{L}\\p{M}])(${MONTH_RE})\\.?\\s+(\\d{1,2})(st|nd|rd|th)?(?![\\d:.])(?:,?\\s+(\\d{4}))?`, 'iu').exec(text);
  // "may" / मे are also everyday words ("2 may be 3 thousand"): a month only with an ordinal, "of" or a year
  const vague = (w: string) => /^(may|मे)$/i.test(w);
  if (dm && vague(dm[4]) && !dm[2] && !dm[3] && !dm[5]) dm = null;
  if (md && vague(md[1]) && !md[3] && !md[4]) md = null;
  let num = /(?<![\d.:/])(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?(?![\d/])|(?<![\d.:-])(\d{1,2})-(\d{1,2})-(\d{2,4})(?![\d-])/.exec(text);
  // a bare "10/12" is a fraction or a range ("10/12 minutes", "1/2 of my salary") unless it has a year, a date cue, or is the whole answer
  if (num && num[1] && !num[3]) {
    const before = text.slice(0, num.index).trim().split(/\s+/).pop()?.toLowerCase() ?? '';
    const after = text.slice(num.index + num[0].length).trim().split(/\s+/)[0]?.toLowerCase() ?? '';
    const cue = ['on', 'date', 'dated', 'tarikh', 'tareekh', 'तारीख', 'दिनांक'].includes(before) || ['ko', 'को', 'la', 'ला', 'रोजी'].includes(after);
    if (!cue && text.trim() !== num[0]) num = null;
  }
  if (dm) [day, month, year] = [Number(dm[1]), monthOf(dm[4]), dm[5] ? Number(dm[5]) : undefined];
  else if (md) [day, month, year] = [Number(md[2]), monthOf(md[1]), md[4] ? Number(md[4]) : undefined];
  else if (num) {
    const [d, m, y] = num[1] ? [num[1], num[2], num[3]] : [num[4], num[5], num[6]];
    [day, month, year] = [Number(d), Number(m) - 1, y ? (y.length === 2 ? 2000 + Number(y) : Number(y)) : undefined];
  }
  if (day === undefined || month === undefined || day < 1 || day > 31 || month < 0 || month > 11) return undefined;
  let date = new Date(year ?? now.getFullYear(), month, day);
  if (date.getMonth() !== month) return undefined; // 31/11
  if (year === undefined && midnight(date) > midnight(now)) date = new Date(now.getFullYear() - 1, month, day);
  const days = Math.round((midnight(date) - midnight(now)) / 86_400_000);
  return days <= 0 && days > -400 ? days : undefined;
}

function daypart(toks: string[]): 'morning' | 'afternoon' | 'evening' | 'night' | undefined {
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    // "am" is a daypart only after a number ("9 am"), never in "I am"
    if (t === 'am' && !(i > 0 && (/^\d/.test(toks[i - 1]) || wordParts(toks[i - 1])))) continue;
    if (wordHas(t, NIGHT)) return 'night';
    if (wordHas(t, EVENING)) return 'evening';
    if (wordHas(t, AFTERNOON)) return 'afternoon';
    if (wordHas(t, MORNING)) return 'morning';
  }
  return undefined;
}

function to24(h: number, part?: string): number {
  if (part === 'morning') return h === 12 ? 0 : h;
  if (part === 'afternoon') return h < 12 ? h + 12 : h;
  if (part === 'evening') return h < 12 ? h + 12 : h;
  if (part === 'night') return h < 5 ? h + 24 /* past midnight = same night */ : h < 12 ? h + 12 : h;
  return h;
}

/** Clock time in the sentence as decimal hours (9.5 = 9:30), or undefined. */
function clockHours(text: string, toks: string[]): number | undefined {
  // not inside a dotted digit chain ("5.00.1.00.2.3" is a number read out, not 5:00)
  // three or more "N.00" are a digit read-out ("1.00, 2.00, 3.00"), not a clock
  const dotted = (text.match(/\b\d{1,2}\.\d{2}\b/g) ?? []).length >= 3;
  const hm = dotted ? text.match(/(?<![\d.:])\b(\d{1,2}):(\d{2})(?![.:]?\d)\s*(am|pm)?/i) : text.match(/(?<![\d.:])\b(\d{1,2})[:.](\d{2})(?![.:]?\d)\s*(am|pm)?/i);
  if (hm) {
    let h = Number(hm[1]) + Number(hm[2]) / 60;
    if (hm[3]?.toLowerCase() === 'pm' && h < 12) h += 12;
    return h;
  }
  for (let i = 0; i < toks.length; i++) {
    // Bengali glues "o'clock" onto the number: সাতটায় / নটায় / আড়াইটায়
    const bnAt = BN_AT.test(toks[i]);
    const bnTa = !bnAt && BN_TA.test(toks[i]) && (toks[i + 1] ?? '').startsWith('বাজ');
    if (bnAt || bnTa) {
      const stem = toks[i].replace(bnAt ? BN_AT : BN_TA, '').replace(/্$/, ''); // দস্টায়: ASR leaves a virama on the stem
      // "4টায়" is split into "4" + "টায়" by the tokenizer: the hour is the previous token
      const p = stem ? (wordParts(stem, 2) ?? (stem === 'ন' ? [{ v: 9 }] : undefined)) : i > 0 ? wordParts(toks[i - 1]) : undefined; // নটায় = 9 o'clock; a lone ন is not 9
      if (p) {
        const prev = i > 0 ? wordParts(toks[i - 1]) : undefined;
        const half = prev?.some((x) => 'half' in x) ? 0.5 : 0;
        const v = combine(p);
        if (v !== undefined && v <= 12) return v + half;
      }
    }
    if ((wordHas(toks[i], OCLOCK) || toks[i] === 'clock') && i > 0) {
      // number words right before "बजे" (saade nau baje, ढाई बजे, 7 मणिक्कु, "four o'clock")
      let j = toks[i] === 'clock' && toks[i - 1] === 'o' ? i - 2 : i - 1;
      const parts = [];
      while (j >= 0 && j >= i - 3) {
        // right before "o'clock" a sound-alike number is safe: साथ वाजता = सात (7) वाजता
        const p = wordParts(toks[j]) ?? (j === i - 1 ? foldParts(toks[j], (v) => v >= 1 && v <= 12) : undefined);
        if (!p) break;
        parts.unshift(...p);
        j--;
      }
      const v = parts.length ? combine(parts) : undefined;
      if (v !== undefined && v > 0 && v <= 12.75) return v;
    }
  }
  // "7 pm" written as one token, or "around 10" next to a day part
  const pm = text.match(/\b(\d{1,2})\s*(am|pm)\b/i);
  if (pm) return Number(pm[1]) + (pm[2].toLowerCase() === 'pm' && Number(pm[1]) < 12 ? 12 : 0);
  // not "around 4,999 rupees", not "about 1 lakh" / "around 5 thousand" (an amount)
  const around = text.match(
    /(?:around|at|about|karib|lagbhag)\s+(\d{1,2})\b(?![,.]\d)(?!\s*(?:lakhs?|lacs?|laakhs?|thousand|hazaa?r|hajar|crores?|k\b|hundred|sau|rupees?|rs\b|rupaye|rupaiye|₹|%|percent|times|minutes?|mins?|hours?|hrs?|days?|ghante|din))/i,
  );
  if (around && Number(around[1]) <= 12) return Number(around[1]);
  return undefined;
}

/** "das minute pehle" -> minutes ago. */
function agoMinutes(toks: string[]): number | undefined {
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    // glued half-hour words (అరగంట)
    const glued = HALF_UNIT_WORDS.find(([w, v]) => v === 30 && t.startsWith(w));
    if (glued) return 30;
    const unit = has(t, MIN) ? 1 : has(t, HOUR) || (is(t, ['மணி']) && fold(toks[i + 1] ?? '').startsWith(fold('நேர'))) ? 60 : has(t, DAY) ? 1440 : 0;
    if (!unit) continue;
    // need an "ago" marker in the unit word itself (मिनिटांपूर्वी) or within the next 3 tokens
    const window = [t, ...toks.slice(i + 1, i + 4)];
    const agoHere = window.some((w) => AGO.some((a) => w === a || w.endsWith(a) || w.startsWith(a)) || has(w, AGO));
    if (!agoHere) continue;
    // count: number words just before the unit, or half/one
    let j = i - 1;
    const parts = [];
    while (j >= 0 && j >= i - 3) {
      // a hedge word starts the count: "Rs 12,500 about 2 hours ago" is 2 hours, not 12,502
      if (['about', 'around', 'karib', 'lagbhag', 'करीब', 'लगभग'].includes(toks[j])) break;
      // "half an hour": skip the article, but written digits before it are not the count ("Rs 500 an hour ago")
      if (['an', 'a'].includes(toks[j])) {
        if (/^[\d,.]+$/.test(toks[j - 1] ?? '')) break;
        j--;
        continue;
      }
      // written digits never join a count that already has a word after them ("12,500 two hours")
      if (parts.length && /^[\d,.]+$/.test(toks[j])) break;
      const half = HALF_UNIT_WORDS.find(([w]) => toks[j] === w || toks[j].startsWith(w) || fold(toks[j]) === fold(w));
      if (half && half[1] < 1) {
        parts.unshift({ v: half[1] });
        j--;
        continue;
      }
      const p = wordParts(toks[j]);
      if (!p || p.some((x) => 'mul' in x && x.mul >= 1000)) break;
      parts.unshift(...p);
      j--;
    }
    const n = parts.length ? combine(parts as never) : 1;
    if (n === undefined) continue;
    return Math.round(n * unit);
  }
  return undefined;
}

// One hour-and-minute phrase. With an "ago" word it is a duration ("3 மணி நேரம் 30 நிமிடம் முன்னாடி" = 210 minutes ago);
// with a clock word and no "ago" it is a clock time ("कल रात 9 बजकर 30 मिनट", "9 மணி 30 நிமிடம் மணிக்கு", "2 గంటల 30 నిమిషాలు కి").
// A pure duration word with no "ago" ("2 घंटे 30 मिनट") is left alone.
const CLOCK_HOUR = N(['बजकर', 'बजके', 'वाजून', 'மணி', 'గంటల', 'గంటలు', 'ಗಂಟೆ']);
export function hourMinutePhrase(text: string): string {
  const w = text.split(/\s+/);
  const clean = (t: string | undefined) => (t ?? '').replace(/[.,!?।]+$/, '').normalize('NFC').toLowerCase();
  const num = (t: string | undefined) => {
    const c = clean(t);
    if (/^\d{1,2}$/.test(c)) return Number(c);
    const p = c && !/\d/.test(c) ? wordParts(c) : undefined;
    return p ? combine(p) : undefined;
  };
  for (let i = 0; i + 3 < w.length; i++) {
    const h = num(w[i]);
    if (h === undefined || h < 0 || h > 23 || !Number.isInteger(h)) continue;
    let j = i + 1;
    const ht = clean(w[j]);
    const clockWord = CLOCK_HOUR.includes(ht);
    let duration = !clockWord && has(ht, HOUR);
    if (!clockWord && !duration) continue;
    if (clean(w[j + 1]).startsWith('நேர')) (duration = true), j++; // மணி நேரம் = hour (duration)
    const m = num(w[j + 1]);
    if (m === undefined || m < 1 || m > 59 || !Number.isInteger(m) || !has(clean(w[j + 2]), MIN)) continue;
    const ago = [w[j + 3], w[j + 4]].some((t) => t && has(clean(t), AGO));
    if (ago) w.splice(i, j + 2 - i, String(h * 60 + m));
    else if (!duration) w.splice(i, j + 3 - i, `${h}:${String(m).padStart(2, '0')}`);
  }
  return w.join(' ');
}

export function findTime(text: string, now: Date = new Date()): TimeHit | undefined {
  text = hourMinutePhrase(text.replace(/\b([ap])\.\s?m\b\.?/gi, '$1m')); // "7 p.m."
  const toks = tokenize(text).map((t) => t.toLowerCase());
  const low = text.toLowerCase();
  const ago = agoMinutes(toks);
  if (ago !== undefined) return { date: new Date(now.getTime() - ago * 60_000), kind: 'ago', tolerance: Math.max(5, ago * 0.15) };
  // also split in two by the recogniser: "এই মাত্র", "ಇಗ ಸ್ಟೇ" (ಈಗಷ್ಟೇ)
  // "abhi tak" = so far, "abhi bhi" = still: about the present, not when it happened
  const notNow = (i: number) => ['tak', 'bhi', 'bhee', 'तक', 'भी'].includes(toks[i + 1] ?? '');
  const nowWord = toks.some((t, i) => (is(t, NOW_WORDS) && !notNow(i)) || (!!toks[i + 1] && /[^\x00-\x7f]/.test(t) && [...t].length <= 3 && is(t + (toks[i + 1] ?? ''), NOW_WORDS)));
  if (nowWord && !/\bjust\b/.test(low.replace('just now', ''))) {
    return { date: new Date(now), kind: 'now', tolerance: 10 };
  }
  if (/\bjust now\b/.test(low)) return { date: new Date(now), kind: 'now', tolerance: 10 };
  const dayWord = dayOffset(toks);
  // an explicit date or weekday ("25th November", "on Monday") is an answer in itself; a bare "today" is not
  const dated = dayWord === undefined ? dateOffset(text, toks, now) : undefined;
  const day = dayWord ?? dated;
  const part = daypart(toks);
  const clock = clockHours(text, toks);
  if (day === undefined && part === undefined && clock === undefined) return undefined;
  const d = new Date(now);
  d.setDate(d.getDate() + (day ?? 0));
  if (clock !== undefined) {
    const h = to24(clock, part ?? (clock < 7 ? 'evening' : undefined));
    d.setHours(Math.floor(h), Math.round((h % 1) * 60), 0, 0);
    // "10 baje" with no day said and later than now: it was yesterday
    if (day === undefined && d.getTime() > now.getTime() + 30 * 60_000) d.setDate(d.getDate() - 1);
    return { date: d, kind: 'clock', tolerance: 20 };
  }
  if (part) {
    const h = { morning: 9, afternoon: 14, evening: 19, night: 21 }[part];
    d.setHours(h, 0, 0, 0);
    // "evening" said at noon with no day: it was yesterday evening (the fraud already happened)
    if (day === undefined && d.getTime() > now.getTime() + 30 * 60_000) d.setDate(d.getDate() - 1);
    return { date: d, kind: 'daypart', tolerance: 120 };
  }
  d.setHours(12, 0, 0, 0);
  return { date: d, kind: dated !== undefined ? 'date' : 'day', tolerance: 720 };
}
