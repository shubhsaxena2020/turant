// When did it happen? Relative ("das minute pehle", "দশ মিনিট আগে", "பத்து நிமிஷம் முன்னாடி")
// and absolute ("kal shaam 7 baje", "গতকাল সন্ধ্যা সাতটায়", "நேற்று இரவு 9:30 மணிக்கு")
// in hi/mr/bn/ta/te/kn/en. Returns an absolute Date. Pure, no DOM.
import { combine, tokenize, wordParts } from './numbers';

export interface TimeHit {
  date: Date;
  kind: 'now' | 'ago' | 'clock' | 'daypart' | 'day';
  /** minutes of uncertainty (a bare "yesterday evening" is fuzzy) */
  tolerance: number;
}

const N = (l: string[]) => l.map((w) => w.normalize('NFC'));
const has = (t: string, list: string[]) => list.some((w) => t === w || t.startsWith(w));

const NOW_WORDS = N(['अभी', 'abhi', 'এইমাত্র', 'এখনই', 'இப்பதான்', 'இப்போதான்', 'ఇప్పుడే', 'ಈಗಷ್ಟೇ', 'आत्ताच', 'just']);
const MIN = N(['मिनट', 'मिनिट', 'minute', 'min', 'মিনিট', 'நிமிட', 'நிமிஷ', 'నిమిష', 'ನಿಮಿಷ']);
const HOUR = N(['घंटा', 'घंटे', 'घण्टा', 'तास', 'ghanta', 'ghante', 'hour', 'hr', 'ঘণ্টা', 'ঘন্টা', 'மணி நேர', 'நேரத்', 'గంట', 'ಗಂಟೆ']);
const DAY = N(['दिन', 'दिवस', 'din', 'day', 'দিন', 'நாள', 'நாட்', 'రోజు', 'రోజుల', 'ದಿನ']);
const AGO = N(['पहले', 'pehle', 'pahle', 'पूर्वी', 'ago', 'back', 'before', 'আগে', 'முன்னாடி', 'முன்பு', 'முன்', 'க்கு', 'క్రితం', 'ಹಿಂದೆ']);
const HALF_UNIT_WORDS: [string, number][] = [
  ['अरगंट', 30], ['అరగంట', 30], ['आधा', 0.5], ['आध', 0.5], ['adha', 0.5], ['aadha', 0.5], ['half', 0.5], ['আধ', 0.5], ['আধা', 0.5], ['அரை', 0.5], ['అర', 0.5], ['ಅರ್ಧ', 0.5], ['अर्ध्या', 0.5], ['अर्धा', 0.5],
];

const TODAY = N(['आज', 'aaj', 'today', 'আজ', 'இன்று', 'இன்னைக்கு', 'இன்னிக்கு', 'ఈరోజు', 'ఈ రోజు', 'ಇಂದು', 'ಇವತ್ತು']);
const YESTERDAY = N(['कल', 'kal', 'काल', 'yesterday', 'গতকাল', 'কাল', 'நேற்று', 'நேத்து', 'నిన్న', 'ನಿನ್ನೆ']);
const DAY_BEFORE = N(['परसों', 'parso', 'parson', 'परवा', 'পরশু', 'முந்தாநாள்', 'మొన్న', 'ಮೊನ್ನೆ']);

const MORNING = N(['सुबह', 'subah', 'सकाळी', 'सकाळ', 'morning', 'সকাল', 'সকালে', 'காலை', 'காலைல', 'ఉదయం', 'ಬೆಳಿಗ್ಗೆ', 'ಬೆಳಗ್ಗೆ', 'am']);
const AFTERNOON = N(['दोपहर', 'dopahar', 'dopehar', 'दुपारी', 'afternoon', 'দুপুর', 'দুপুরে', 'மதியம்', 'మధ్యాహ్నం', 'ಮಧ್ಯಾಹ್ನ']);
const EVENING = N(['शाम', 'shaam', 'sham', 'संध्याकाळी', 'evening', 'সন্ধ্যা', 'সন্ধ্যায়', 'বিকেল', 'বিকেলে', 'மாலை', 'சாயங்காலம்', 'సాయంత్రం', 'ಸಂಜೆ', 'pm']);
const NIGHT = N(['रात', 'raat', 'rat', 'रात्री', 'night', 'রাত', 'রাতে', 'இரவு', 'ராத்திரி', 'రాత్రి', 'ರಾತ್ರಿ']);

const OCLOCK = N(['बजे', 'baje', 'वाजता', 'वाजले', "o'clock", 'oclock', 'মণিক্কু', 'மணிக்கு', 'மணி', 'గంటలకు', 'గంటల', 'ಗಂಟೆಗೆ', 'ಕ್ಕೆ', 'కి', 'pm', 'am', 'baje']);
// "-টায়" = at … o'clock. Plain "-টা" is also the counting word (একটা = "a"), so it only counts before বাজে.
const BN_AT = new RegExp('(?:' + N(['টায়', 'টায়']).join('|') + ')$');
const BN_TA = new RegExp(N(['টা'])[0] + '$');

function dayOffset(toks: string[]): number | undefined {
  for (const t of toks) {
    if (has(t, DAY_BEFORE)) return -2;
    if (YESTERDAY.includes(t)) return -1;
    if (TODAY.includes(t)) return 0;
  }
  return undefined;
}

function daypart(toks: string[]): 'morning' | 'afternoon' | 'evening' | 'night' | undefined {
  for (const t of toks) {
    if (has(t, NIGHT)) return 'night';
    if (has(t, EVENING)) return 'evening';
    if (has(t, AFTERNOON)) return 'afternoon';
    if (has(t, MORNING)) return 'morning';
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
  const hm = text.match(/\b(\d{1,2})[:.](\d{2})\s*(am|pm)?/i);
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
      const stem = toks[i].replace(bnAt ? BN_AT : BN_TA, '');
      const p = wordParts(stem);
      if (p) {
        const prev = i > 0 ? wordParts(toks[i - 1]) : undefined;
        const half = prev?.some((x) => 'half' in x) ? 0.5 : 0;
        const v = combine(p);
        if (v !== undefined && v <= 12) return v + half;
      }
    }
    if (has(toks[i], OCLOCK) && i > 0) {
      // number words right before "बजे" (saade nau baje, ढाई बजे, 7 मणिक्कु)
      let j = i - 1;
      const parts = [];
      while (j >= 0 && j >= i - 3) {
        const p = wordParts(toks[j]);
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
  const around = text.match(/(?:around|at|about|karib|lagbhag)\s+(\d{1,2})\b/i);
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
    const unit = has(t, MIN) ? 1 : has(t, HOUR) || (t === 'மணி' && toks[i + 1]?.startsWith('நேர')) ? 60 : has(t, DAY) ? 1440 : 0;
    if (!unit) continue;
    // need an "ago" marker in the unit word itself (मिनिटांपूर्वी) or within the next 3 tokens
    const window = [t, ...toks.slice(i + 1, i + 4)];
    const agoHere = window.some((w) => AGO.some((a) => w === a || w.endsWith(a) || w.startsWith(a)));
    if (!agoHere) continue;
    // count: number words just before the unit, or half/one
    let j = i - 1;
    const parts = [];
    while (j >= 0 && j >= i - 3) {
      if (['an', 'a', 'about', 'around', 'karib', 'lagbhag', 'करीब', 'लगभग'].includes(toks[j])) {
        j--;
        continue;
      }
      const half = HALF_UNIT_WORDS.find(([w]) => toks[j] === w || toks[j].startsWith(w));
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

export function findTime(text: string, now: Date = new Date()): TimeHit | undefined {
  const toks = tokenize(text).map((t) => t.toLowerCase());
  const low = text.toLowerCase();
  const ago = agoMinutes(toks);
  if (ago !== undefined) return { date: new Date(now.getTime() - ago * 60_000), kind: 'ago', tolerance: Math.max(5, ago * 0.15) };
  if (toks.some((t) => NOW_WORDS.includes(t)) && !/\bjust\b/.test(low.replace('just now', ''))) {
    return { date: new Date(now), kind: 'now', tolerance: 10 };
  }
  if (/\bjust now\b|right now/.test(low)) return { date: new Date(now), kind: 'now', tolerance: 10 };
  const day = dayOffset(toks);
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
    return { date: d, kind: 'daypart', tolerance: 120 };
  }
  d.setHours(12, 0, 0, 0);
  return { date: d, kind: 'day', tolerance: 720 };
}
