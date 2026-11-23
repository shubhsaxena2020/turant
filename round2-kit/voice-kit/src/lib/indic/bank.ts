// Which bank? Names are usually English said in the local script: spelled initials
// (এইচডিএফসি = H-D-F-C, ஐசிஐசிஐ = I-C-I-C-I) or names (কানাড়া, ಕೆನರಾ, युनियन बँक).
// Brahmic blocks share one layout, so we map bn/ta/te/kn/gu/pa/or to Devanagari by
// code-point offset, romanise once, and compare voicing-insensitive sound keys. Pure.
import { tokenize, wordParts } from './numbers';

const BLOCKS = [0x0980, 0x0a00, 0x0a80, 0x0b00, 0x0b80, 0x0c00, 0x0c80, 0x0d00]; // bn pa gu or ta te kn ml

export function toDevanagari(s: string): string {
  let out = '';
  for (const ch of s.normalize('NFC').replace(/ஃப/g, 'फ़').replace(/ஃ/g, '')) {
    const cp = ch.codePointAt(0)!;
    const block = BLOCKS.find((b) => cp >= b && cp < b + 0x80);
    out += block !== undefined ? String.fromCodePoint(0x0900 + (cp - block)) : ch;
  }
  return out;
}

const CONS: Record<string, string> = {
  क: 'k', ख: 'k', ग: 'g', घ: 'g', ङ: 'n', च: 'c', छ: 'c', ज: 'j', झ: 'j', ञ: 'n', ट: 't', ठ: 't', ड: 'd', ढ: 'd', ण: 'n',
  त: 't', थ: 't', द: 'd', ध: 'd', न: 'n', ऩ: 'n', प: 'p', फ: 'f', ब: 'b', भ: 'b', म: 'm', य: 'y', र: 'r', ऱ: 'r', ल: 'l', ळ: 'l', ऴ: 'l',
  व: 'v', श: 's', ष: 's', स: 's', ह: 'h', ड़: 'r', ढ़: 'r', य़: 'y', फ़: 'f', ज़: 'z',
};
const VOW: Record<string, string> = { अ: 'a', आ: 'a', इ: 'i', ई: 'i', उ: 'u', ऊ: 'u', ऋ: 'ri', ए: 'e', ऎ: 'e', ऐ: 'ai', ओ: 'o', ऒ: 'o', औ: 'au', ऑ: 'o', ॲ: 'e', ऍ: 'e' };
const MATRA: Record<string, string> = { 'ा': 'a', 'ि': 'i', 'ी': 'i', 'ु': 'u', 'ू': 'u', 'ृ': 'ri', 'े': 'e', 'ॆ': 'e', 'ै': 'ai', 'ो': 'o', 'ॊ': 'o', 'ौ': 'au', 'ॉ': 'o', 'ॅ': 'e' };

export function romanize(word: string): string {
  const s = toDevanagari(word).normalize('NFC');
  const chars = [...s];
  let out = '';
  for (let i = 0; i < chars.length; i++) {
    let c = chars[i];
    if (chars[i + 1] === '़') {
      c = c + '़';
      i++;
    }
    const next = chars[i + 1];
    if (CONS[c] !== undefined) {
      out += CONS[c];
      if (next === '्') {
        i++;
        continue;
      }
      if (next && MATRA[next] !== undefined) {
        out += MATRA[next];
        i++;
        continue;
      }
      if (next && !/\s/.test(next)) out += 'a'; // incl. before ं: पंजाब = panjab
      continue;
    }
    if (VOW[c] !== undefined) out += VOW[c];
    else if (c === 'ं' || c === 'ँ') out += 'n';
    else if (/[a-z0-9]/i.test(c)) out += c.toLowerCase();
  }
  return out;
}

/** Sound key: voicing-insensitive (Tamil has no d/b/g), h and vowel length dropped. */
export function soundKey(latin: string): string {
  return latin
    .toLowerCase()
    .replace(/ph/g, 'f')
    .replace(/[^a-z]/g, '')
    .replace(/h/g, '')
    .replace(/[dt]/g, 't')
    .replace(/[bpf]/g, 'p')
    .replace(/[gkq]/g, 'k')
    .replace(/[cjzs]/g, 's')
    .replace(/[w]/g, 'v')
    .replace(/x/g, 'ks')
    .replace(/ee/g, 'i')
    .replace(/oo/g, 'u')
    .replace(/(.)\1+/g, '$1');
}

function editDistance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}

function similarity(a: string, b: string): number {
  if (a === b) return 1;
  const m = a.length;
  const n = b.length;
  if (!m || !n) return 0;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return 1 - prev[n] / Math.max(m, n);
}

// English letter names as Indians say them (for spelled acronyms).
const LETTER: Record<string, string> = {
  a: 'e', b: 'bi', c: 'si', d: 'di', e: 'i', f: 'ef', g: 'ji', h: 'ech', i: 'ai', j: 'je', k: 'ke', l: 'el', m: 'em', n: 'en', o: 'o', p: 'pi',
  q: 'kyu', r: 'ar', s: 'es', t: 'ti', u: 'yu', v: 'vi', w: 'dablyu', x: 'eks', y: 'vai', z: 'jed',
};
const spell = (acr: string) => [...acr].map((c) => LETTER[c]).join('');

export interface BankDef {
  key: string;
  name: string;
  /** single-token names (romanised) */
  names?: string[];
  /** acronyms said letter by letter */
  acronyms?: string[];
  /** generic words that only count when followed by a word for "bank" */
  needsBankWord?: string[];
}

export const BANKS: BankDef[] = [
  { key: 'sbi', name: 'State Bank of India (SBI)', acronyms: ['sbi'], needsBankWord: ['state', 'stet', 'estet'] },
  { key: 'hdfc', name: 'HDFC Bank', acronyms: ['hdfc'], names: ['hechdiefsi', 'aichdiefsi'] },
  { key: 'icici', name: 'ICICI Bank', acronyms: ['icici'] },
  { key: 'axis', name: 'Axis Bank', names: ['aksis', 'eksis', 'aksisa', 'aiksis', 'yaksis'] },
  { key: 'kotak', name: 'Kotak Mahindra Bank', names: ['kotak', 'kotek', 'kottak', 'kotakmahindra'] },
  { key: 'pnb', name: 'Punjab National Bank (PNB)', acronyms: ['pnb'], names: ['panjab', 'punjab', 'panjabnesanal'] },
  { key: 'bob', name: 'Bank of Baroda', acronyms: ['bob'], names: ['baroda', 'barodaa', 'badoda', 'baroda'] },
  { key: 'canara', name: 'Canara Bank', names: ['kenara', 'kanara', 'kanada', 'kanra', 'canara', 'kenra'] },
  { key: 'union', name: 'Union Bank of India', needsBankWord: ['yuniyan', 'yunian', 'union', 'yuniyana'] },
  { key: 'boi', name: 'Bank of India', acronyms: ['boi'] },
  { key: 'indian', name: 'Indian Bank', needsBankWord: ['indiyan', 'indian', 'intiyan'] },
  { key: 'yes', name: 'Yes Bank', needsBankWord: ['yes', 'yesa', 'yesh', 'yas'] },
  { key: 'idfc', name: 'IDFC First Bank', acronyms: ['idfc'] },
  { key: 'indusind', name: 'IndusInd Bank', names: ['indasind', 'indusind'] },
  { key: 'iob', name: 'Indian Overseas Bank', acronyms: ['iob'], names: ['ovarsis', 'overseas'] },
  { key: 'central', name: 'Central Bank of India', needsBankWord: ['sentral', 'central'] },
  { key: 'bandhan', name: 'Bandhan Bank', names: ['bandhan', 'bandan'] },
  { key: 'federal', name: 'Federal Bank', needsBankWord: ['federal', 'fedral'] },
  { key: 'ippb', name: 'India Post Payments Bank', acronyms: ['ippb'], names: ['indiapost'] },
  { key: 'paytm', name: 'Paytm Payments Bank', needsBankWord: ['paytm', 'petiem'] },
  { key: 'airtel', name: 'Airtel Payments Bank', needsBankWord: ['airtel', 'eyartel'] },
];

// "bank" in any script, with case endings: बैंक बँकेतून ব্যাংকের பேங்க்ல వంకి ಬ್ಯಾಂಕ್‌ನಿಂದ வங்கி
const isBankWord = (tok: string) => {
  const k = soundKey(/^[a-z]+$/i.test(tok) ? tok : romanize(tok));
  return /^p[aeiyou]*n[aeiou]?k/.test(k) || /^van?ki/.test(k); // বেনক / బైంక: ASR puts a vowel in
};
const DEBUG = !!(globalThis as { process?: { env?: Record<string, string> } }).process?.env?.BANK_DEBUG;
const NEGATE = ['नहीं', 'नही', 'नाही', 'nahi', 'not', 'no', 'না', 'இல்ல', 'இல்லை', 'కాదు', 'ಅಲ್ಲ', 'ಇಲ್ಲ'].map((w) => w.normalize('NFC'));
const skel = (k: string) => k.replace(/[aeiouy]/g, '');
const indic = (w: string) => /[ऀ-෿]/.test(w);

/** Candidate keys (sound keys) for every bank, precomputed. */
const KEYS = BANKS.map((b) => ({
  b,
  exact: [...(b.acronyms ?? []), ...(b.names ?? [])].map((x) => x.toLowerCase()),
  sounds: [...(b.acronyms ?? []).map(spell), ...(b.names ?? [])].map(soundKey),
  nameSounds: (b.names ?? []).map(soundKey),
  spelled: (b.acronyms ?? []).map((a) => soundKey(spell(a))),
  acronymSkels: (b.acronyms ?? []).map((a) => skel(soundKey(spell(a)))).filter((k) => k.length >= 4),
  generic: (b.needsBankWord ?? []).map(soundKey),
}));

export interface BankHit {
  key: string;
  name: string;
  confidence: number;
}

export function findBank(text: string): BankHit | undefined {
  // "S.B.I." -> sbi
  const toks = tokenize(text).filter((t) => t !== '|').map((t) => (/^([a-z]\.)+[a-z]$/i.test(t) ? t.replace(/\./g, '') : t));
  const short = (t: string | undefined) => !!t && !wordParts(t) && (/^[a-z]+$/i.test(t) ? t : romanize(t)).length <= 5;
  const hits: (BankHit & { at: number })[] = [];
  let at = 0;
  const consider = (hit: BankHit) => {
    const prev = hits.find((h) => h.at === at);
    if (!prev) hits.push({ ...hit, at });
    else if (hit.confidence > prev.confidence) Object.assign(prev, hit);
  };
  for (let i = 0; i < toks.length; i++) {
    const raw = toks[i];
    at = i;
    const low = raw.toLowerCase();
    const exactHit = KEYS.find((k) => k.exact.includes(low));
    if (exactHit) {
      consider({ key: exactHit.b.key, name: exactHit.b.name, confidence: 1 });
      continue;
    }
    // a Latin acronym one letter off a 4+ letter one ("HTFC" = HDFC); 3-letter ones (SBI, PNB) collide too easily
    if (/^[a-z]{4,5}$/.test(low)) {
      const near = KEYS.filter((k) => (k.b.acronyms ?? []).some((a) => a.length >= 4 && editDistance(low, a) === 1));
      if (near.length === 1) consider({ key: near[0].b.key, name: near[0].b.name, confidence: 0.8 });
    }
    if (wordParts(raw)) continue; // पचास / পঞ্চাশ are numbers, not Punjab
    const latin = /^[a-z]+$/.test(low) ? low : romanize(raw);
    const key = soundKey(latin);
    const nextIsBank = !!toks[i + 1] && isBankWord(toks[i + 1]);
    // "Bank of Baroda" / "Bank of India" / "State Bank of India"
    const ofNext = ['of', 'ऑफ', 'অফ', 'ஆஃப்', 'ఆఫ్', 'ಆಫ್', 'ऑफ़'].includes(toks[i + 1] ?? '') || ['op', 'ap'].includes(soundKey(romanize(toks[i + 1] ?? ''))); // आफ
    if (isBankWord(raw) && ofNext) {
      const after = soundKey(romanize(toks[i + 2] ?? ''));
      const prev = soundKey(romanize(toks[i - 1] ?? ''));
      const named = KEYS.find((k) => k.generic.some((g) => similarity(prev, g) >= 0.75));
      if (similarity(prev.slice(0, 4), 'stet') >= 0.75) consider({ key: 'sbi', name: BANKS[0].name, confidence: 0.95 });
      else if (named) consider({ key: named.b.key, name: named.b.name, confidence: 0.95 }); // Union/Central Bank of India
      else if (similarity(after, soundKey('baroda')) >= 0.6) consider({ key: 'bob', name: 'Bank of Baroda', confidence: 0.95 });
      else if (similarity(after.slice(0, 5), soundKey('india')) >= 0.6) consider({ key: 'boi', name: 'Bank of India', confidence: 0.9 });
    }
    // an acronym spoken letter by letter over several words: आई सी आई सी आई, ఏచ్డి ఎఫ్సీ
    if (short(raw))
      for (let n = 2; n <= 5 && short(toks[i + n - 1]); n++) {
        const joined = soundKey(toks.slice(i, i + n).map((t) => (/^[a-z]+$/i.test(t) ? t.toLowerCase() : romanize(t))).join(''));
        const hit = KEYS.find((k) => k.spelled.some((sp) => sp.length >= 5 && similarity(joined, sp) >= 0.85));
        if (hit) consider({ key: hit.b.key, name: hit.b.name, confidence: 0.85 });
      }
    for (const { b, exact, sounds, nameSounds, acronymSkels, generic } of KEYS) {
      if (exact.includes(low)) consider({ key: b.key, name: b.name, confidence: 1 });
      for (const s of sounds) {
        if (s.length < 3) continue;
        // allow case suffixes glued on (बँकेतून, ব্যাংকের): compare the token's prefix too
        let sim = Math.max(similarity(key, s), key.length > s.length ? similarity(key.slice(0, s.length + 1), s) : 0);
        // a name one sound off (কুটাক, একসিস, కినరా) counts only right before the word "bank"
        if (sim >= 0.85 || (sim >= 0.75 && nextIsBank && nameSounds.includes(s) && s.length >= 5)) {
          if (DEBUG) console.log('  name/acronym', raw, key, '~', s, sim.toFixed(2), b.key);
          consider({ key: b.key, name: b.name, confidence: 0.6 + 0.4 * sim });
        }
      }
      // spoken acronyms keep an unpronounced inherent vowel in Devanagari/Bengali spelling (एचडीएफसी)
      if (indic(raw) && acronymSkels.includes(skel(key))) {
        if (DEBUG) console.log('  skeleton', raw, skel(key), b.key);
        consider({ key: b.key, name: b.name, confidence: 0.9 });
      }
      if (nextIsBank) {
        for (const g of generic) {
          if (similarity(key, g) >= 0.75 || (key.length > g.length && similarity(key.slice(0, g.length), g) >= 0.8))
            consider({ key: b.key, name: b.name, confidence: 0.85 });
        }
      }
    }
  }
  if (!hits.length) return undefined;
  // Corrections: English "HDFC, not SBI" rejects what comes AFTER "not";
  // Indian languages "एसबीआई नहीं, एचडीएफसी" reject what comes BEFORE the negator.
  const lowToks = toks.map((t) => t.toLowerCase());
  const neg = (j: number) => NEGATE.includes(lowToks[j] ?? '');
  const rejected = (h: { at: number }) =>
    (['not', 'no'].includes(lowToks[h.at - 1] ?? '') && !['not', 'no'].includes(lowToks[h.at + 1] ?? '')) ||
    (neg(h.at + 1) && !['not', 'no'].includes(lowToks[h.at + 1] ?? ''));
  const corrected = lowToks.some((_, j) => neg(j));
  const kept = corrected ? hits.filter((h) => !rejected(h)) : hits;
  const pool = kept.length ? kept : hits;
  const pick = corrected ? pool[pool.length - 1] : pool.reduce((a, b) => (b.confidence > a.confidence ? b : a));
  return { key: pick.key, name: pick.name, confidence: pick.confidence };
}
