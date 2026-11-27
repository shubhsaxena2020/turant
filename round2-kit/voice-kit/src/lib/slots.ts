// Generic, config-driven slot extraction. One typed extractor per slot type, all
// built on Turant's rules in nlp.ts. Pure functions: no DOM, no network (offline-first).
import { findAmountHit, fold, numberGroups, readoutDigit, tokenize as indicTokens, wordParts } from './indic/numbers';
import { findTime, hourMinutePhrase } from './indic/time';
import { joinSpelled, spokenDigits, unifyScript } from './indic/cleanup';
import type {
  AmountSlot,
  DigitsSlot,
  DomainConfig,
  DurationSlot,
  EnumSlot,
  Fields,
  GroupDef,
  ItemDef,
  NameSlot,
  NumberSlot,
  PhoneSlot,
  QtyItem,
  QuantitySlot,
  QuestionCopy,
  SlotDef,
  SlotType,
  SlotValue,
  TextSlot,
  UnitDef,
  YesNoSlot,
} from '../domain/types';
import * as N from './nlp';

export interface Extracted {
  value: SlotValue;
  confidence: number;
}
export type Extraction = Partial<Record<string, Extracted>>;

export interface ExtractOptions {
  now?: Date;
  /** Question being answered (slot key or group name): relaxes that slot's rules. */
  hint?: string;
  /** Prefer the last mentioned value (corrections: "SBI nahi, HDFC tha"). */
  preferLast?: boolean;
}

type SlotsLike = Pick<DomainConfig, 'slots'>;

interface Ctx {
  raw: string;
  text: string;
  tokens: string[];
  runs: N.NumRun[];
  claimed: Set<number>;
  upis: string[];
  opts: ExtractOptions;
  now: Date;
  /** Normalised keywords of other slots: never a person's name. */
  reserved: Set<string>;
}

const hinted = (s: SlotDef, o: ExtractOptions) => !!o.hint && (o.hint === s.key || (!!s.group && o.hint === s.group));
const freeRuns = (c: Ctx) => c.runs.map((r, i) => ({ r, i })).filter(({ r, i }) => !r.isSeq && !c.claimed.has(i));

// ---------------------------------------------------------------------------
// ids: digits + phone (UTR, account numbers, Aadhaar, mobiles)
// ---------------------------------------------------------------------------

const DEFAULT_PHONE_CTX = ['phone', 'mobile', 'mob', 'number', 'call', 'calling', 'whatsapp', 'फोन', 'मोबाइल', 'नंबर', 'कॉल', 'ফোন', 'নম্বর', 'போன்', 'நம்பர்', 'ఫోన్', 'నంబర్', 'ಫೋನ್', 'ನಂಬರ್', 'मोबाईल'];

interface IdSeq {
  start: number;
  end: number;
  digits: string;
  runs: number[];
}

/**
 * Digit sequences that may be IDs: digit runs, a number read out with a pause ("9 8 7 6 5... 4 3 2 1 0",
 * joined only when the halves make a mobile or a 12-digit UTR), and native-script digits read one word
 * at a time (নয় নয় আট আট…, ஒன்பது ஒன்பது எட்டு…).
 */
const UTR_WORDS = N.wordSet(['utr', 'ref', 'reference', 'refno', 'rrn', 'transaction', 'txn', 'upi', 'रेफ', 'রেফ', 'ரெஃப்', 'రెఫ్', 'ರೆಫ್']);
const UTR_STEMS = ['यूटीआर', 'रेफरन्स', 'रेफरेंस', 'ইউটিআর', 'রেফারেন্স', 'யூடிஆர்', 'యూటీఆర్', 'ಯುಟಿಆರ್'].map(fold);

function idSequences(c: Ctx): IdSeq[] {
  const seqs: IdSeq[] = [];
  c.runs.forEach((r, ri) => {
    if (r.isSeq) seqs.push({ start: r.start, end: r.end, digits: r.digits, runs: [ri] });
  });
  for (let i = 0; i + 1 < seqs.length; i++) {
    const [a, b] = [seqs[i], seqs[i + 1]];
    const d = a.digits + b.digits;
    if (b.start === a.end + 1 && c.tokens[a.end] === N.BOUNDARY && a.digits.length >= 3 && b.digits.length >= 3 && ((d.length === 10 && /^[6-9]/.test(d)) || d.length === 12))
      seqs.splice(i, 2, { start: a.start, end: b.end, digits: d, runs: [...a.runs, ...b.runs] });
  }
  // shared with Turant (indic/numbers.ts): exact-ish first digit, looser slips and read-out-only words inside the run
  // single digits may sit inside a spoken read-out ("9, 8, 7, 6, 5, 4, 3, 2, 1 பூஜ்யம்"); such a run needs a number word
  const digit = (t: string | undefined, inside = true) => {
    if (t && /^\d$/.test(t)) return t;
    const v = readoutDigit(t, !inside);
    return v === undefined ? undefined : String(v);
  };
  for (let i = 0; i < c.tokens.length; ) {
    let j = i;
    let d = '';
    for (let x = digit(c.tokens[j], false); x !== undefined; x = digit(c.tokens[++j])) {
      d += x;
      // Telugu: Whisper writes the digit 1 as ఒంటి గంట ("one o'clock"), sometimes glued to a zero (గంటసున్నా)
      if (c.tokens[j] === 'ఒంటి' && /^గంటా?$/.test(c.tokens[j + 1] ?? '')) j++;
      else if (c.tokens[j] === 'ఒంటి' && /^గంటసున్నా?$/.test(c.tokens[j + 1] ?? '')) (d += '0'), j++;
    }
    // the kit's own reader may have taken part of this read-out (it stops at साथ / ಎಳು): the longer reading wins
    const overlapping = seqs.filter((s) => s.start < j && i < s.end);
    if (d.length >= 7 && c.tokens.slice(i, j).some((t) => !/^\d+$/.test(t)) && overlapping.every((s) => s.digits.length < d.length)) {
      for (const s of overlapping) seqs.splice(seqs.indexOf(s), 1);
      seqs.push({ start: i, end: j, digits: d, runs: overlapping.flatMap((s) => s.runs) });
    }
    i = Math.max(j, i + 1);
  }
  // "UTR नंबर है 403218 765 432 5000 रुपए": the UTR's digit groups run straight into the amount. After UTR /
  // reference words, if the leading groups make exactly 12 digits and one group plus a currency word follows,
  // those 12 digits are the UTR (the amount is read separately).
  for (const s of seqs) {
    if (s.digits.length <= 12 || !c.tokens.slice(Math.max(0, s.start - 6), s.start).some((t) => UTR_WORDS.has(t) || UTR_STEMS.some((st) => /[^\x00-\x7f]/.test(t) && fold(t).startsWith(st)))) continue;
    let d = '';
    for (let k = s.start; k < s.end - 1 && /^\d+$/.test(c.tokens[k]); k++) {
      d += c.tokens[k];
      if (d.length >= 12) {
        if (d.length === 12 && k === s.end - 2 && N.isCurrency(c.tokens[s.end])) s.digits = d;
        break;
      }
    }
  }
  // "रेफ नो सहा 12345789012": after a UTR / reference word, ONE number word and ONE digit group that make exactly
  // 12 digits (same rule as Turant's mixedUtrRuns; other mixes are mostly misheard).
  for (let i = 0; i < c.tokens.length; i++) {
    if (!c.tokens.slice(Math.max(0, i - 4), i).some((t) => ctxMatch(t, UTR_WORDS, UTR_STEMS))) continue;
    let d = '';
    let words = 0;
    let groups = 0;
    let j = i;
    for (; j < c.tokens.length && d.length <= 12; j++) {
      const t = c.tokens[j];
      if (/^\d+$/.test(t)) (d += t), t.length > 1 && groups++;
      else {
        const v = readoutDigit(t, true);
        if (v === undefined) break;
        d += String(v);
        words++;
      }
    }
    if (d.length === 12 && words && groups === 1) {
      const overlapping = seqs.filter((s) => s.start < j && i < s.end);
      for (const s of overlapping) seqs.splice(seqs.indexOf(s), 1);
      seqs.push({ start: i, end: j, digits: d, runs: overlapping.flatMap((s) => s.runs) });
      i = j;
    }
  }
  return seqs.sort((a, b) => a.start - b.start);
}

/** Context word in the window: exact, or a native-script stem on the sound-alike key (অ্যাকাউন্টে, खात्यात). */
function ctxMatch(t: string, set: Set<string>, stems: string[]): boolean {
  return set.has(t) || (/[^\x00-\x7f]/.test(t) && stems.some((st) => fold(t).startsWith(st)));
}

function extractIds(c: Ctx, slots: (DigitsSlot | PhoneSlot)[], out: Extraction) {
  if (!slots.length) return;
  const words = (s: DigitsSlot | PhoneSlot) => s.context ?? (s.type === 'phone' ? DEFAULT_PHONE_CTX : []);
  const ctxSets = new Map(slots.map((s) => [s.key, N.wordSet(words(s))]));
  const ctxStems = new Map(slots.map((s) => [s.key, words(s).filter((w) => /[^\x00-\x7f]/.test(w)).map(fold).filter((k) => [...k].length >= 3)]));
  idSequences(c).forEach((r) => {
    const d = r.digits;
    const before = c.tokens.slice(Math.max(0, r.start - 6), r.start);
    const plus = c.tokens[r.start - 1] === 'plus';
    let best: { key: string; value: string; conf: number; score: number } | undefined;
    for (const s of slots) {
      const ctxHit = before.some((t) => ctxMatch(t, ctxSets.get(s.key)!, ctxStems.get(s.key)!));
      const hint = hinted(s, c.opts);
      let value: string | undefined;
      let base = 0;
      let conf = 0;
      if (s.type === 'phone') {
        if (d.length === 10 && /^[6-9]/.test(d)) [value, base, conf] = [d, 2, ctxHit || hint ? 0.95 : 0.85];
        else if (d.length === 11 && /^0[6-9]/.test(d)) [value, base, conf] = [d.slice(1), 1.5, 0.9];
        else if (d.length === 12 && /^91[6-9]/.test(d)) [value, base, conf] = [d.slice(2), plus ? 9 : 1.5, 0.9]; // "plus 91 …\"
      } else if (s.length !== undefined) {
        if (d.length === s.length) [value, base, conf] = [d, 3, ctxHit || hint ? 0.95 : 0.85];
      } else {
        const min = s.min ?? 1;
        const max = s.max ?? 20;
        if (d.length >= min && d.length <= max && (ctxHit || hint)) [value, base, conf] = [d, 1, ctxHit ? 0.85 : 0.65];
      }
      if (value === undefined) continue;
      // Exact shapes (UTR length, mobile) beat a range slot that is only hinted.
      const score = base + (ctxHit ? 5 : 0) + (hint ? (base === 1 ? 1.5 : 4) : 0);
      if (!best || score > best.score) best = { key: s.key, value, conf, score };
    }
    if (!best) return;
    for (const ri of r.runs) c.claimed.add(ri);
    if (!out[best.key] || c.opts.preferLast) out[best.key] = { value: best.value, confidence: best.conf };
  });
}

// ---------------------------------------------------------------------------
// amount (rupees), number (with unit words), duration, quantity+unit
// ---------------------------------------------------------------------------

function extractAmount(c: Ctx, s: AmountSlot): Extracted | undefined {
  const hint = hinted(s, c.opts);
  const cues = s.cues ? N.wordSet(s.cues) : undefined;
  let best: { score: number; value: number; conf: number; i: number } | undefined;
  for (const { r, i } of freeRuns(c)) {
    if (r.value <= 0 || r.value >= 1e9) continue;
    if (/x{2,}/i.test(c.tokens[r.start - 1] ?? '')) continue; // bank SMS "A/c XX4321": masked account digits, not money
    if (/^(otp|pin|cvv|mpin|password|code)$/.test(c.tokens[r.start - 1] ?? '')) continue; // "he took the OTP 4567": a code, not money
    const tokens = c.tokens;
    const next = tokens[r.end];
    if (N.unitMs(next) || N.isClockMarker(next)) continue;
    if (/^\d{1,2}(am|pm)$/.test(next ?? '')) continue;
    const cur = N.isCurrency(next) || N.isCurrency(tokens[r.start - 1]) || N.isCurrency(tokens[r.end + 1]);
    let debit = false;
    for (let k = Math.max(0, r.start - 5); k < Math.min(tokens.length, r.end + 5); k++) {
      if (N.isDebitWord(tokens[k], cues)) debit = true;
    }
    // a debit word alone is weak evidence for a tiny number ("20 ருபிஸ் டெபிட்" = 20 thousand, misheard)
    if (!cur && !r.hasMult && r.value < 100 && !hint) continue;
    if (!cur && !r.hasMult && !debit && !hint) continue;
    const score = (cur ? 3 : 0) + (r.hasMult ? 1.5 : 0) + (debit ? 1 : 0) + (hint ? 1 : 0);
    const conf = cur ? 0.95 : r.hasMult ? 0.85 : hint ? 0.85 : 0.6;
    if (!best || score > best.score || (score === best.score && c.opts.preferLast)) best = { score, value: r.value, conf, i };
  }
  if (!best) return undefined;
  c.claimed.add(best.i);
  return { value: best.value, confidence: best.conf };
}

/** Fallback: the cross-language parser ("baavan saal", "ಐವತ್ತೈದು ವರ್ಷ"): next to a unit word, or the answer to its question. */
function indicNumber(c: Ctx, units: string[], inRange: (v: number) => boolean, hint: boolean): Extracted | undefined {
  const toks = indicTokens(c.raw).map((t) => t.toLowerCase());
  const unitAt = (k: number) => !!toks[k] && units.some((u) => toks[k] === u || fold(toks[k]).startsWith(fold(u)));
  const groups = numberGroups(c.raw).filter((g) => !g.unsure && inRange(g.value));
  const near = groups.find((g) => unitAt(g.end) || unitAt(g.start - 1));
  if (near) return { value: near.value, confidence: 0.8 };
  if (hint && groups.length) return { value: (c.opts.preferLast ? groups[groups.length - 1] : groups[0]).value, confidence: 0.8 };
  return undefined;
}

function extractNumber(c: Ctx, s: NumberSlot, allowHint: boolean): Extracted | undefined {
  const hint = allowHint && hinted(s, c.opts);
  const units = (s.units ?? []).map(N.nw);
  const inRange = (v: number) => v >= (s.min ?? -Infinity) && v <= (s.max ?? Infinity);
  const cands = freeRuns(c).filter(({ r }) => inRange(r.value));
  const near = (r: N.NumRun) =>
    units.length > 0 && [c.tokens[r.end], c.tokens[r.end + 1], c.tokens[r.start - 1], c.tokens[r.start - 2]].some((t) => N.tokenIs(t, units));
  let pick = cands.find(({ r }) => near(r));
  let conf = 0.9;
  if (c.opts.preferLast) pick = [...cands].reverse().find(({ r }) => near(r)) ?? pick;
  if (!pick && hint) {
    pick = c.opts.preferLast ? cands[cands.length - 1] : cands[0];
    conf = 0.85;
  }
  if (!pick) return indicNumber(c, units, inRange, hint);
  c.claimed.add(pick.i);
  return { value: pick.r.value, confidence: conf };
}

const SINCE_YESTERDAY = ['kal se', 'kal raat se', 'kal shaam se', 'kal subah se', 'since yesterday', 'since last night', 'from yesterday', 'कल से', 'कल रात से', 'कल शाम से', 'कल सुबह से', 'காலையிலிருந்து', 'நேற்றிலிருந்து', 'நேற்று முதல்', 'ನಿನ್ನೆಯಿಂದ', 'গতকাল থেকে', 'কাল থেকে', 'నిన్నటి నుండి', 'कालपासून'];
const SINCE_TODAY = ['aaj se', 'subah se', 'since morning', 'since today', 'आज से', 'सुबह से', 'இன்று காலை முதல்', 'ಬೆಳಿಗ್ಗೆಯಿಂದ', 'সকাল থেকে', 'ఉదయం నుండి', 'सकाळपासून'];

const SINCE_AFTER = ['se', 'से', 'पासून', 'ধরে', 'থেকে', 'ಇಂದ', 'ದಿಂದ', 'గా', 'నుంచి', 'லிருந்து', 'ஆக'].map(N.nw);

function extractDuration(c: Ctx, s: DurationSlot): Extracted | undefined {
  const hint = hinted(s, c.opts);
  const runs = freeRuns(c);
  const ordered = c.opts.preferLast ? [...runs].reverse() : runs;
  for (const { r, i } of ordered) {
    const ms = N.unitMs(c.tokens[r.end]);
    if (ms < 3_600_000) continue;
    // "10 din pehle" is a point in time, not a duration.
    if (c.tokens.slice(r.end, r.end + 3).some((t) => N.AGO.includes(t))) continue;
    c.claimed.add(i);
    return { value: Math.round(((r.value * ms) / 86_400_000) * 100) / 100, confidence: hint ? 0.92 : 0.85 };
  }
  // "hafte se", "आठवड्यापासून": a unit with no number but a "since" marker = one of it
  for (let k = 0; k < c.tokens.length; k++) {
    const t = c.tokens[k];
    const ms = N.unitMs(t);
    if (ms < 86_400_000 || (N.findNumberRuns([c.tokens[k - 1] ?? '']).length && !['a', 'an'].includes(c.tokens[k - 1] ?? ''))) continue;
    const since =
      SINCE_AFTER.some((m) => c.tokens[k + 1] === m || (t.length > m.length + 2 && t.endsWith(m))) ||
      (['a', 'an'].includes(c.tokens[k - 1] ?? '') && ['for', 'since', 'past', 'last'].includes(c.tokens[k - 2] ?? '')); // "for a week\"
    if (since) return { value: Math.round((ms / 86_400_000) * 100) / 100, confidence: 0.75 };
  }
  if (N.phraseIndex(c.text, SINCE_YESTERDAY) >= 0) return { value: 1, confidence: 0.8 };
  if (N.phraseIndex(c.text, SINCE_TODAY) >= 0) return { value: 0.5, confidence: 0.75 };
  if (hint && runs.length === 1 && runs[0].r.value > 0 && runs[0].r.value < 400) {
    c.claimed.add(runs[0].i);
    return { value: runs[0].r.value, confidence: 0.7 };
  }
  return undefined;
}

export const DEFAULT_UNITS: UnitDef[] = [
  { code: 'kg', words: ['kg', 'kgs', 'kilo', 'kilos', 'kilogram', 'kilograms', 'किलो', 'किलोग्राम', 'केजी', 'কেজি', 'কিলো', 'கிலோ', 'కిలో', 'ಕೆಜಿ', 'ಕಿಲೋ'] },
  { code: 'g', words: ['g', 'gm', 'gms', 'gram', 'grams', 'ग्राम', 'গ্রাম', 'கிராம்', 'గ్రాము', 'ಗ್ರಾಂ'] },
  { code: 'L', words: ['l', 'ltr', 'litre', 'litres', 'liter', 'liters', 'लीटर', 'लिटर', 'লিটার', 'லிட்டர்', 'లీటర్', 'ಲೀಟರ್'] },
  { code: 'ml', words: ['ml', 'मिली', 'எம்எல்'] },
  { code: 'packet', words: ['packet', 'packets', 'pkt', 'paket', 'packet', 'पैकेट', 'पाकिट', 'প্যাকেট', 'பாக்கெட்', 'ప్యాకెట్', 'ಪ್ಯಾಕೆಟ್'] },
  { code: 'dozen', words: ['dozen', 'darjan', 'darjen', 'दर्जन', 'ডজন', 'டஜன்', 'డజను', 'ಡಜನ್'] },
  { code: 'pc', words: ['piece', 'pieces', 'pc', 'pcs', 'nag', 'पीस', 'नग', 'পিস', 'பீஸ்', 'ముక్క', 'ಪೀಸ್'] },
  { code: 'bottle', words: ['bottle', 'bottles', 'botal', 'बोतल', 'বোতল', 'பாட்டில்', 'బాటిల్', 'ಬಾಟಲ್'] },
  { code: 'box', words: ['box', 'dabba', 'dibba', 'डब्बा', 'डिब्बा', 'বাক্স', 'டப்பா', 'డబ్బా', 'ಡಬ್ಬ'] },
];

const ITEM_STOP = N.wordSet([
  'aur', 'and', 'or', 'ya', 'of', 'the', 'a', 'liya', 'liye', 'li', 'le', 'diya', 'diye', 'de', 'gaya', 'gaye', 'ka', 'ki', 'ke', 'ko', 'ne', 'hai', 'tha', 'thi',
  'bought', 'took', 'taken', 'purchased', 'on', 'credit', 'udhaar', 'udhar', 'baaki', 'cash', 'nakad', 'rupaye', 'rupees', 'rs', '₹', 'total', 'sab',
  'और', 'लिया', 'ली', 'लिए', 'दिया', 'का', 'की', 'के', 'ने', 'है', 'था', 'उधार', 'बाकी', 'रुपये', 'রুপি', 'আর', 'এবং', 'মற்றும்', 'மற்றும்', 'ಮತ್ತು', 'మరియు',
]);

function findItem(c: Ctx, from: number, items: ItemDef[] | undefined): { name: string; end: number } | undefined {
  const window = c.tokens.slice(from, from + 3);
  if (items?.length) {
    const joined = window.join(' ');
    let best: { name: string; idx: number; len: number } | undefined;
    for (const it of items) {
      const m = N.phraseMatch(joined, it.keywords, false, 3); // right after a quantity: short names are safe (5 kilo आता)
      if (m && (!best || m.idx < best.idx || (m.idx === best.idx && m.len > best.len))) best = { name: it.name['en-IN'] ?? Object.values(it.name)[0]!, ...m };
    }
    // Only accept a catalogue hit that starts at the first or second word.
    if (best && joined.slice(0, best.idx).trim().split(/\s+/).filter(Boolean).length <= 1) return { name: best.name, end: from + 1 };
  }
  const tok = c.tokens[from];
  if (tok && !ITEM_STOP.has(tok) && !/^\d/.test(tok) && tok.length > 1) return { name: tok, end: from + 1 };
  return undefined;
}

function extractQuantities(c: Ctx, s: QuantitySlot): Extracted | undefined {
  const units = s.units ?? DEFAULT_UNITS;
  const items: QtyItem[] = [];
  for (const { r, i } of freeRuns(c)) {
    const next = c.tokens[r.end];
    const unit = units.find((u) => N.tokenIs(next, u.words.map(N.nw)));
    if (!unit || r.value <= 0) continue;
    let item = findItem(c, r.end + 1, s.items);
    if (!item && r.end + 1 < c.tokens.length && N.nw(c.tokens[r.end + 1]) === 'of') item = findItem(c, r.end + 2, s.items);
    if (!item && r.start > 0) item = findItem(c, r.start - 1, s.items);
    c.claimed.add(i);
    items.push({ qty: r.value, unit: unit.code, item: item ? titleIfLatin(item.name) : '' });
  }
  if (!items.length) return undefined;
  return { value: items, confidence: hinted(s, c.opts) ? 0.9 : 0.85 };
}

// ---------------------------------------------------------------------------
// enum (single / multi), yes-no
// ---------------------------------------------------------------------------

function extractEnum(c: Ctx, s: EnumSlot): Extracted | undefined {
  if (s.resolve && !s.multi) {
    const v = s.resolve(c.raw);
    if (v && s.options.some((o) => o.value === v)) return { value: v, confidence: s.confidence ?? 0.9 };
  }
  const hint = hinted(s, c.opts);
  const last = !!c.opts.preferLast;
  const hits: { value: string; idx: number; len: number; rank: number; conf: number }[] = [];
  s.options.forEach((o, rank) => {
    if (o.hintOnly && !hint) return;
    let m = N.phraseMatch(c.text, o.keywords, last);
    for (const re of o.patterns ?? []) {
      const pm = new RegExp(re.source, re.flags.replace('g', '')).exec(c.text);
      if (pm && (!m || pm.index < m.idx)) m = { idx: pm.index, len: pm[0].length };
    }
    if (m) hits.push({ value: o.value, idx: m.idx, len: m.len, rank, conf: o.confidence ?? s.confidence ?? 0.88 });
  });
  if (!hits.length) return undefined;
  if (s.multi) {
    const kept = hits.filter((h) => !N.negatedAt(c.text, h.idx)).sort((a, b) => a.rank - b.rank);
    if (!kept.length) return undefined;
    return { value: kept.map((h) => h.value), confidence: Math.min(...kept.map((h) => h.conf)) };
  }
  let pick = hits[0];
  const mode = s.pick ?? 'priority';
  for (const h of hits.slice(1)) {
    if (last) {
      if (h.idx > pick.idx || (h.idx === pick.idx && h.len > pick.len)) pick = h;
    } else if (mode === 'longest') {
      if (h.len > pick.len || (h.len === pick.len && h.idx < pick.idx)) pick = h;
    } else if (mode === 'first') {
      if (h.idx < pick.idx) pick = h;
    }
  }
  return { value: pick.value, confidence: pick.conf };
}

function extractYesNo(c: Ctx, s: YesNoSlot): Extracted | undefined {
  const m = N.phraseMatch(c.text, s.keywords, !!c.opts.preferLast);
  if (m) return { value: !N.negatedAt(c.text, m.idx), confidence: 0.85 };
  if (hinted(s, c.opts)) {
    const intent = N.detectIntent(c.raw);
    if (intent === 'yes') return { value: true, confidence: 0.9 };
    if (intent === 'no') return { value: false, confidence: 0.9 };
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// name, free text
// ---------------------------------------------------------------------------

const isLatinWord = (w: string) => /^[A-Za-z][A-Za-z'.-]*$/.test(w);
export const titleIfLatin = (w: string) => (isLatinWord(w) ? w.charAt(0).toUpperCase() + w.slice(1) : w);

const NAME_MARKERS = ['naam', 'name', 'named', 'नाम', 'नाव', 'নাম', 'பெயர்', 'பேர்', 'పేరు', 'ಹೆಸರು'];
const NAME_LEAD = N.wordSet(['is', 'hai', 'he', 'tha', 'was', 'ka', 'ki', 'ke', 'mera', 'meri', 'my', 'her', 'his', 'patient', 'है', 'था', 'मेरा', 'का', 'की', 'আমার', 'என்', 'என்னுடைய', 'ನನ್ನ']);
const NAME_STOP = N.wordSet([
  'hai', 'he', 'hain', 'tha', 'thi', 'is', 'was', 'and', 'aur', 'ji', 'saal', 'sal', 'umar', 'age', 'years', 'year', 'old', 'ki', 'ka', 'ke', 'ko', 'ne', 'se', 'mein', 'me',
  'वर्ष', 'साल', 'है', 'था', 'थी', 'और', 'जी', 'की', 'का', 'के', 'ने', 'को', 'வயது', 'ವಯಸ್ಸು', 'বয়স', 'বছর', 'ఏళ్ళు', 'वय',
]);
const NOT_NAMES = N.wordSet([
  'maine', 'mai', 'main', 'mein', 'mujhe', 'usne', 'usko', 'unhone', 'unko', 'humne', 'hum', 'tum', 'aap', 'aapne', 'kisi', 'koi', 'ek', 'aadmi', 'admi', 'banda', 'ladka', 'ladki',
  'aurat', 'bhaiya', 'bhai', 'didi', 'uncle', 'aunty', 'aunti', 'customer', 'grahak', 'dukaan', 'dukan', 'mera', 'meri', 'mere', 'uska', 'uski', 'unka', 'iska', 'account',
  'bank', 'phone', 'mobile', 'paise', 'paisa', 'rupaye', 'ghar', 'sab', 'kal', 'aaj', 'abhi', 'woh', 'wo', 'yeh', 'ye', 'is', 'us', 'time', 'din', 'raat', 'patient',
  'मैंने', 'मैं', 'उसने', 'उन्होंने', 'हमने', 'किसी', 'कोई', 'आदमी', 'मेरा', 'मेरे', 'मेरी', 'उसका', 'ग्राहक', 'आज', 'कल', 'वो', 'यह', 'मरीज',
]);
const PARTICLES: string[][] = [['ne', 'ने'], ['ko', 'को'], ['ji', 'जी'], ['aaya', 'aayi', 'aaye', 'aya', 'आया', 'आई', 'आए'], ['ka', 'ki', 'ke', 'का', 'की', 'के']];
// Titles said around a name ("Suresh bhaiya ne", "गीता दीदी"): never the name itself.
const HONORIFICS = N.wordSet(['ji', 'जी', 'bhaiya', 'bhai', 'भैया', 'भया', 'भाया', 'भइया', 'भाईया', 'भईया', 'भाई', 'didi', 'दीदी', 'दीधी', 'दिदी', 'aunty', 'uncle', 'अंकल', 'आंटी', 'sir', 'madam', 'mr', 'mrs', 'ms', 'shri', 'श्री', 'sahab', 'saheb', 'साहब', 'garu', 'గారు', 'அண்ணா', 'ಅಣ್ಣ', 'দা', 'দি']);
const EN_VERBS = N.wordSet(['took', 'bought', 'borrowed', 'owes', 'paid', 'purchased', 'has', 'gave', 'took']);

function rawWords(raw: string): { w: string; n: string }[] {
  return N.foldDigits(raw.normalize('NFC'))
    .split(/[\s,!?;"“”()[\]{}।॥|/\\]+/)
    .map((w) => w.replace(/^[.\-:]+|[.\-:]+$/g, ''))
    .filter(Boolean)
    .map((w) => ({ w, n: N.normalizeWord(w) }));
}

function extractName(c: Ctx, s: NameSlot): Extracted | undefined {
  const words = rawWords(c.raw);
  const plausible = (i: number) => {
    const x = words[i];
    if (!x || x.n.length < 2 || /\d/.test(x.n) || NAME_STOP.has(x.n) || NOT_NAMES.has(x.n) || HONORIFICS.has(x.n) || c.reserved.has(x.n)) return false;
    return !/@/.test(x.w);
  };
  const takeFrom = (i: number, max = 3) => {
    const out: string[] = [];
    for (let k = i; k < words.length && out.length < max; k++) {
      if (!plausible(k)) break;
      out.push(titleIfLatin(words[k].w));
    }
    return out.join(' ');
  };
  // 1. "mera naam Sunita hai", "patient name is Ramesh", "என் பெயர் லட்சுமி"
  const markers = [...NAME_MARKERS, ...(s.markers ?? [])].map(N.nw);
  for (let i = 0; i < words.length; i++) {
    if (!markers.some((m) => words[i].n === m || (!N.isLatin(m) && words[i].n.startsWith(m)))) continue;
    let k = i + 1;
    while (k < words.length && (NAME_LEAD.has(words[k].n) || markers.includes(words[k].n))) k++;
    const name = takeFrom(k);
    if (name) return { value: name, confidence: 0.9 };
  }
  // 2. "Ramesh ne 3 kilo chawal liya", "रमेश को 500 दिए"
  for (const parts of PARTICLES) {
    const set = N.wordSet(parts);
    for (let i = 1; i < words.length; i++) {
      if (!set.has(words[i].n)) continue;
      let j = i - 1;
      while (j > 0 && HONORIFICS.has(words[j].n)) j--; // "Suresh bhaiya ne"
      if (!plausible(j)) continue;
      const two = j >= 1 && plausible(j - 1) && /^[A-Z]/.test(words[j - 1].w) && /^[A-Z]/.test(words[j].w);
      const name = (two ? [words[j - 1].w, words[j].w] : [words[j].w]).map(titleIfLatin).join(' ');
      return { value: name, confidence: parts[0] === 'ka' || parts[0] === 'aaya' ? 0.7 : 0.8 };
    }
  }
  // 2b. Marathi glues the particle on: "सुनीलने दोन किलो…"
  if (words[0] && /..ने$/.test(words[0].n)) {
    const stem = words[0].w.replace(/ने$/, '');
    if (!NAME_STOP.has(N.nw(stem)) && !NOT_NAMES.has(N.nw(stem)) && !c.reserved.has(N.nw(stem))) return { value: stem, confidence: 0.7 };
  }
  // 3. English: "Ramesh took 3 kg rice"
  for (let i = 0; i < words.length - 1; i++) {
    if (EN_VERBS.has(words[i + 1].n) && /^[A-Z][a-z]/.test(words[i].w) && plausible(i)) return { value: words[i].w, confidence: 0.75 };
  }
  // 3b. A story that opens with a name then a quantity: "রহিম দুই কেজি চাল…", "ಮಂಜು ಐದು ಕೆಜಿ…"
  if (!c.opts.hint && plausible(0) && words[1] && (/^\d/.test(words[1].n) || wordParts(words[1].w)) && !wordParts(words[0].w))
    return { value: titleIfLatin(words[0].w), confidence: 0.65 };
  // 3c. English introductions: "This is Rahul, he is 12"
  const intro = /(?:^|[.,]\s*)(?:[Tt]his is|[Ii]t is|[Ii]t's|[Mm]eet)\s+([A-Z][a-z]+)/.exec(c.raw);
  if (intro && !NOT_NAMES.has(N.nw(intro[1])) && !c.reserved.has(N.nw(intro[1]))) return { value: intro[1], confidence: 0.75 };
  // 4. Answering "What is the name?": the answer minus filler words.
  if (hinted(s, c.opts) && !N.detectIntent(c.raw)) {
    const name = words
      .filter((x) => !NAME_LEAD.has(x.n) && !NAME_STOP.has(x.n) && !markers.includes(x.n) && !/\d/.test(x.n))
      .slice(0, 3)
      .map((x) => titleIfLatin(x.w))
      .join(' ');
    if (name) return { value: name, confidence: 0.85 };
  }
  return undefined;
}

const TEXT_STOP = N.wordSet(['for', 'since', 'from', 'hai', 'he', 'tha', 'is', 'was', 'se', 'है', 'था', 'से', 'and', 'aur', 'और']);

function clauses(raw: string): string[] {
  return raw
    .normalize('NFC')
    .split(/[,;!?।\n]+|\.(?=\s|$)/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function extractText(c: Ctx, s: TextSlot): Extracted | undefined {
  const all = clauses(c.raw);
  const list = c.opts.preferLast ? [...all].reverse() : all;
  for (const mk of s.markers ?? []) {
    const max = mk.max ?? 5;
    const marks = mk.words.map((w) => w.split(/\s+/).map(N.nw));
    for (const clause of list) {
      const words = clause.split(/\s+/).filter(Boolean);
      const lw = words.map((w) => N.normalizeWord(w).replace(/[.,:]+$/, ''));
      for (const m of marks) {
        for (let i = 0; i + m.length <= lw.length; i++) {
          // a native one-word marker may be glued on as a suffix too: शाळेजवळ = शाळे + जवळ ("near the school")
          const ok = m.every((p, k) => lw[i + k] === p || (!N.isLatin(p) && (lw[i + k].startsWith(p) || (m.length === 1 && lw[i + k].length > p.length + 1 && lw[i + k].endsWith(p)))));
          if (!ok) continue;
          let value: string[];
          if (mk.take === 'clause') value = words;
          else if (mk.take === 'after') {
            const got: string[] = [];
            for (let k = i + m.length; k < words.length && got.length < max && !TEXT_STOP.has(lw[k]); k++) got.push(words[k]);
            value = mk.keep ? [...words.slice(i, i + m.length), ...got] : got;
          } else {
            const got: string[] = [];
            for (let k = i - 1; k >= 0 && got.length < max && !TEXT_STOP.has(lw[k]); k--) got.unshift(words[k]);
            value = mk.keep ? [...got, ...words.slice(i, i + m.length)] : got;
          }
          const text = value.join(' ').replace(/[.,;:]+$/, '').trim();
          const glued = m.length === 1 && lw[i] !== m[0] && !lw[i].startsWith(m[0]); // "शाळेजवळ" carries its landmark
          if (text && (mk.take === 'clause' || glued || value.length > (mk.keep ? m.length : 0))) return { value: text, confidence: 0.8 };
        }
      }
    }
  }
  if (hinted(s, c.opts) && !N.detectIntent(c.raw)) {
    const text = c.raw.trim().replace(/[.,;:!?।]+$/, '');
    if (text) return { value: text, confidence: 0.85 };
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// The pipeline
// ---------------------------------------------------------------------------

const reservedCache = new WeakMap<object, Set<string>>();
function reservedWords(slots: SlotDef[]): Set<string> {
  const hit = reservedCache.get(slots);
  if (hit) return hit;
  const out = new Set<string>();
  const add = (words: string[]) => words.forEach((w) => w.split(/\s+/).forEach((x) => out.add(N.nw(x))));
  for (const s of slots) {
    if (s.type === 'enum') s.options.forEach((o) => add(o.keywords));
    if (s.type === 'yesno') add(s.keywords);
    if (s.type === 'quantity+unit') {
      (s.units ?? DEFAULT_UNITS).forEach((u) => add(u.words));
      (s.items ?? []).forEach((i) => add(i.keywords));
    }
    if (s.type === 'number') add(s.units ?? []);
  }
  reservedCache.set(slots, out);
  return out;
}

/** Extract every slot the rules can find in one utterance (or a whole story). */
export function extractAll(cfg: SlotsLike, text: string, opts: ExtractOptions = {}): Extraction {
  text = hourMinutePhrase(spokenDigits(joinSpelled(unifyScript(text))));
  const norm = N.normalize(text);
  const { ids, rest } = N.extractUpis(N.prepUpi(norm));
  const cleaned = rest.replace(/\s+/g, ' ').trim();
  const tokens = N.tokenize(cleaned);
  const c: Ctx = {
    raw: text,
    text: cleaned,
    tokens,
    runs: N.findNumberRuns(tokens),
    claimed: new Set(),
    upis: ids,
    opts,
    now: opts.now ?? new Date(),
    reserved: reservedWords(cfg.slots),
  };
  const out: Extraction = {};
  const of = <T extends SlotType>(...types: T[]) => cfg.slots.filter((s): s is Extract<SlotDef, { type: T }> => (types as SlotType[]).includes(s.type));
  const put = (key: string, e: Extracted | undefined) => {
    if (e) out[key] = e;
  };

  for (const s of of('upi')) if (ids.length) put(s.key, { value: opts.preferLast ? ids[ids.length - 1] : ids[0], confidence: 0.92 });
  extractIds(c, of('digits', 'phone'), out);
  for (const s of of('datetime')) {
    const hit = N.parsePastTime(cleaned, tokens, c.runs, c.now);
    // Cross-language time parser (bn/ta/te/kn/mr relative + clock times; 113/113 on the corpus).
    const ind = findTime(text, c.now);
    const sure = ind && (ind.kind === 'clock' || ind.kind === 'ago' || ind.kind === 'now');
    const differs = hit && ind && Math.abs(new Date(String(hit.value)).getTime() - ind.date.getTime()) > 20 * 60_000;
    if (hit && !(sure && differs)) {
      if (hit.run !== undefined) c.claimed.add(hit.run);
      put(s.key, { value: hit.value, confidence: hit.confidence });
    } else if (ind && ind.kind !== 'day') {
      put(s.key, { value: ind.date.toISOString(), confidence: ind.kind === 'daypart' ? 0.6 : 0.85 });
    }
  }
  for (const s of of('duration')) put(s.key, extractDuration(c, s));
  for (const s of of('quantity+unit')) put(s.key, extractQuantities(c, s));
  // Numbers with unit words first, so a bare hinted number can't steal "26 saal".
  const nums = of('number');
  for (const s of nums) put(s.key, extractNumber(c, s, false));
  for (const s of nums.filter((x) => !out[x.key])) put(s.key, extractNumber(c, s, true));
  for (const s of of('amount')) {
    const k = extractAmount(c, s);
    // Backstop: the cross-language amount parser (Tamil/Kannada compounds, bn/te number words).
    // It wins a disagreement only with a currency word right next to its number.
    const ind = findAmountHit(text);
    // The rule read only "thousand" (বারো হাজার -> 1000): take the full reading, or ask if the number was misheard.
    if (k && [1000, 100000, 10000000].includes(Number(k.value))) {
      if (ind && ind.value > Number(k.value) && ind.value % Number(k.value) === 0) {
        put(s.key, { value: ind.value, confidence: 0.85 });
        continue;
      }
      if (numberGroups(text).some((g) => g.unsure && g.value === Number(k.value))) continue;
    }
    if (!k && ind && (ind.currencyNear || hinted(s, opts))) put(s.key, { value: ind.value, confidence: ind.currencyNear ? 0.9 : 0.75 });
    else if (k && ind && ind.currencyNear && ind.value !== Number(k.value)) put(s.key, { value: ind.value, confidence: 0.9 });
    // Answering "how much?": a longer reading of the same spoken number wins ("चार हजार नऊशे नव्याण्णव" = 4999, not 4000).
    else if (k && ind && hinted(s, opts) && ind.value > Number(k.value)) put(s.key, { value: ind.value, confidence: 0.85 });
    else put(s.key, k);
  }
  for (const s of of('enum')) put(s.key, extractEnum(c, s));
  for (const s of of('yesno')) put(s.key, extractYesNo(c, s));
  for (const s of of('name')) put(s.key, extractName(c, s));
  for (const s of of('text')) put(s.key, extractText(c, s));
  // Config order (not extraction order), so "Noted: ₹5,000, ..." reads in the order the domain defines.
  return Object.fromEntries(cfg.slots.filter((s) => out[s.key]).map((s) => [s.key, out[s.key]]));
}

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export interface Question {
  /** Slot key, or the group name for grouped slots. */
  key: string;
  slots: SlotDef[];
  copy: QuestionCopy;
  required: boolean;
  ask: boolean;
  explicit: boolean;
  /** Slot answered by the keypad, if any. */
  keypad: SlotDef | null;
  /** Enum slot answered from a list, if any. */
  choices: EnumSlot | null;
}

type QuestionCfg = Pick<DomainConfig, 'slots' | 'groups'>;
const qCache = new WeakMap<object, Question[]>();

export function questionsOf(cfg: QuestionCfg): Question[] {
  const hit = qCache.get(cfg);
  if (hit) return hit;
  const list: Question[] = [];
  for (const s of cfg.slots) {
    const key = s.group ?? s.key;
    if (list.some((q) => q.key === key)) continue;
    const slots = s.group ? cfg.slots.filter((x) => x.group === s.group) : [s];
    const g: GroupDef | undefined = s.group ? cfg.groups?.[s.group] : undefined;
    const kp = g?.keypadSlot ? slots.find((x) => x.key === g.keypadSlot) : slots.find((x) => x.keypad);
    list.push({
      key,
      slots,
      copy: g ?? s,
      required: slots.some((x) => x.required),
      ask: slots.some((x) => x.ask ?? x.required ?? false),
      explicit: g?.confirm ? g.confirm === 'explicit' : slots.some((x) => x.confirm === 'explicit'),
      keypad: kp ?? null,
      choices: slots.length === 1 && s.type === 'enum' ? s : null,
    });
  }
  const ordered = [...list.filter((q) => q.required), ...list.filter((q) => !q.required)];
  qCache.set(cfg, ordered);
  return ordered;
}

export function questionOf(cfg: QuestionCfg, key: string): Question | undefined {
  return questionsOf(cfg).find((q) => q.key === key);
}

export function slotOf(cfg: Pick<DomainConfig, 'slots'>, key: string): SlotDef | undefined {
  return cfg.slots.find((s) => s.key === key);
}

/** The question a slot belongs to (its group, or itself). */
export function questionKeyOf(cfg: Pick<DomainConfig, 'slots'>, slotKey: string): string {
  const s = slotOf(cfg, slotKey);
  return s?.group ?? slotKey;
}

/** Questions still to ask, in order: required first, then optional ones marked `ask`. */
export function pendingQuestions(cfg: QuestionCfg, fields: Fields, skipped: string[] = []): string[] {
  return questionsOf(cfg)
    .filter((q) => q.ask && !skipped.includes(q.key))
    .filter((q) => q.slots.every((s) => !s.askIf || s.askIf(fields)))
    .filter((q) => q.slots.every((s) => fields[s.key] === undefined))
    .map((q) => q.key);
}

// ---------------------------------------------------------------------------
// Voice corrections ("amount galat hai, 5999 tha")
// ---------------------------------------------------------------------------

export interface Correction {
  field: string;
  value: SlotValue;
  confidence: number;
}

const SHAPE_ORDER: SlotType[] = ['upi', 'digits', 'phone', 'enum', 'datetime', 'duration', 'quantity+unit', 'number', 'amount', 'yesno'];

/** Parse a spoken correction for exactly one slot (or null). Slot names come from aliases + labels. */
/** "NOMOR BHUL 981112233": an ungrouped 7+ digit run read as ₹98 crore is an ID with a digit lost (money is written 20,000 / 2,50,000). */
const lostDigitId = (text: string, value: unknown) => Number(value) >= 1_000_000 && /(^|[^\d,])\d{7,}(?![\d,])/.test(text);

export function parseCorrection(cfg: QuestionCfg, text: string, opts: { now?: Date } = {}): Correction | null {
  text = unifyScript(text);
  const s = N.normalize(text);
  let named: SlotDef | undefined;
  let at = { idx: Infinity, len: 0 };
  for (const slot of cfg.slots) {
    const words = [...(slot.aliases ?? []), ...Object.values(slot.label)].filter((w): w is string => !!w);
    const m = N.phraseMatch(s, words);
    if (m && (m.idx < at.idx || (m.idx === at.idx && m.len > at.len))) {
      at = m;
      named = slot;
    }
  }
  const base = { now: opts.now, preferLast: true };
  if (named) {
    const ext = extractAll(cfg, text, { ...base, hint: named.group ?? named.key });
    let field = named.key;
    let hit = ext[field];
    if (!hit) {
      // "number" may really carry a UTR or a UPI ID: trust the value's shape.
      const alt = [
        ...cfg.slots.filter((x) => named!.group && x.group === named!.group),
        ...cfg.slots.filter((x) => ['upi', 'digits', 'phone'].includes(x.type) && x.type !== named!.type),
        ...cfg.slots.filter((x) => x.type === 'amount' && ['phone', 'digits'].includes(named!.type)),
      ].find((x) => ext[x.key] && !(x.type === 'amount' && lostDigitId(text, ext[x.key]!.value)));
      if (alt) {
        field = alt.key;
        hit = ext[alt.key];
      }
    }
    return hit ? { field, value: hit.value, confidence: hit.confidence } : null;
  }
  const ext = extractAll(cfg, text, base);
  for (const type of SHAPE_ORDER) {
    const slot = cfg.slots.find((x) => x.type === type && ext[x.key]);
    if (slot) return { field: slot.key, value: ext[slot.key]!.value, confidence: ext[slot.key]!.confidence };
  }
  const amountSlot = cfg.slots.find((x) => x.type === 'amount');
  if (amountSlot) {
    const amt = extractAll(cfg, text, { ...base, hint: amountSlot.key })[amountSlot.key];
    if (amt && !lostDigitId(text, amt.value)) return { field: amountSlot.key, value: amt.value, confidence: amt.confidence * 0.8 };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Validation (keypad digits, typed text, LLM output)
// ---------------------------------------------------------------------------

/** Keypad digits valid for a slot? */
export function keypadValid(slot: SlotDef, digits: string): boolean {
  switch (slot.type) {
    case 'amount':
      return /^\d{1,9}$/.test(digits) && Number(digits) > 0;
    case 'phone':
      return /^[6-9]\d{9}$/.test(digits);
    case 'digits':
      return slot.length !== undefined ? digits.length === slot.length && /^\d+$/.test(digits) : /^\d+$/.test(digits) && digits.length >= (slot.min ?? 1) && digits.length <= (slot.max ?? 20);
    case 'number':
    case 'duration': {
      const n = Number(digits);
      const min = slot.type === 'number' ? slot.min ?? 0 : 0;
      const max = slot.type === 'number' ? slot.max ?? 1e9 : 3650;
      return digits.length > 0 && n >= min && n <= max;
    }
    default:
      return digits.length > 0;
  }
}

/** Keypad digits as the slot's value. */
export function keypadValue(slot: SlotDef, digits: string): SlotValue {
  return slot.type === 'amount' || slot.type === 'number' || slot.type === 'duration' ? Number(digits) : digits;
}

/** Coerce an untrusted value (LLM JSON, typed text) into a valid slot value, or undefined. */
export function coerce(slot: SlotDef, raw: unknown): SlotValue | undefined {
  if (raw === null || raw === undefined || raw === '') return undefined;
  switch (slot.type) {
    case 'amount':
    case 'number':
    case 'duration': {
      const n = typeof raw === 'number' ? raw : Number(String(raw).replace(/[₹,\s]/g, ''));
      if (!Number.isFinite(n) || n <= 0) return undefined;
      if (slot.type === 'number' && (n < (slot.min ?? -Infinity) || n > (slot.max ?? Infinity))) return undefined;
      return n;
    }
    case 'datetime': {
      const d = new Date(String(raw));
      return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
    }
    case 'phone': {
      let d = String(raw).replace(/\D/g, '');
      if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
      if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
      return /^[6-9]\d{9}$/.test(d) ? d : undefined;
    }
    case 'digits': {
      const d = String(raw).replace(/\D/g, '');
      return keypadValid(slot, d) ? d : undefined;
    }
    case 'upi': {
      const v = String(raw).trim().toLowerCase();
      return /^[a-z0-9._-]{2,64}@[a-z][a-z0-9]{1,30}$/.test(v) ? v : undefined;
    }
    case 'enum': {
      const find = (x: unknown) =>
        slot.options.find((o) => o.value === x || Object.values(o.label).some((l) => !!l && l.toLowerCase() === String(x).toLowerCase()))?.value;
      if (slot.multi) {
        const vals = (Array.isArray(raw) ? raw : [raw]).map(find).filter((v): v is string => !!v);
        return vals.length ? [...new Set(vals)] : undefined;
      }
      return find(Array.isArray(raw) ? raw[0] : raw);
    }
    case 'yesno':
      if (typeof raw === 'boolean') return raw;
      if (/^(yes|true|haan|y)$/i.test(String(raw))) return true;
      if (/^(no|false|nahi|n)$/i.test(String(raw))) return false;
      return undefined;
    case 'quantity+unit': {
      if (!Array.isArray(raw)) return undefined;
      const items = raw
        .map((x) => x as Partial<QtyItem>)
        .filter((x) => typeof x === 'object' && x && Number(x.qty) > 0)
        .map((x) => ({ qty: Number(x.qty), unit: String(x.unit ?? ''), item: String(x.item ?? '') }));
      return items.length ? items : undefined;
    }
    case 'name':
    case 'text': {
      const v = String(raw).trim();
      return v ? v : undefined;
    }
  }
}
