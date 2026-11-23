// Spoken-quiz answer matching for Indian classrooms (Hindi, Bhojpuri, English and
// other Indian languages; ASR output in Devanagari or Latin script, code-mixed).
// Pure, no DOM. Rules first: an answer is "correct" only when we are confident.

export type QuizQuestion =
  | { kind: 'mcq'; options: string[][]; answer: number } // options[i] = accepted spellings (any script)
  | { kind: 'number'; answer: number; tolerance?: number }
  | { kind: 'text'; answers: string[] }; // accepted spellings (any script)

export type Verdict =
  | { verdict: 'correct'; chosen?: number; confidence: number }
  | { verdict: 'wrong'; chosen?: number; heard?: string | number; confidence: number }
  | { verdict: 'unclear' }
  | { verdict: 'skip' }
  | { verdict: 'repeat' };

// ---------- normalisation ----------
const NATIVE_DIGITS = ['०१२३४५६७८९', '০১২৩৪৫৬৭৮৯', '௦௧௨௩௪௫௬௭௮௯', '౦౧౨౩౪౫౬౭౮౯', '೦೧೨೩೪೫೬೭೮೯', '૦૧૨૩૪૫૬૭૮૯', '੦੧੨੩੪੫੬੭੮੯'];

export function foldDigits(s: string): string {
  let out = '';
  for (const ch of s) {
    let d = -1;
    for (const set of NATIVE_DIGITS) {
      const i = set.indexOf(ch);
      if (i >= 0) d = i;
    }
    out += d >= 0 ? String(d) : ch;
  }
  return out;
}

export function normalize(s: string): string {
  return foldDigits(s.normalize('NFC'))
    .toLowerCase()
    .replace(/[​-‍﻿]/g, '')
    .replace(/़/g, '') // nukta: ज़ → ज
    .replace(/ँ/g, 'ं') // chandrabindu → anusvara
    .replace(/[.,!?;:'"“”‘’()[\]{}।॥\-–—/\\]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Devanagari → rough Latin, so "फोटोसिंथेसिस" and "photosynthesis" meet.
const DEV_CONS: Record<string, string> = {
  क: 'k', ख: 'kh', ग: 'g', घ: 'gh', ङ: 'n', च: 'ch', छ: 'chh', ज: 'j', झ: 'jh', ञ: 'n', ट: 't', ठ: 'th', ड: 'd', ढ: 'dh', ण: 'n',
  त: 't', थ: 'th', द: 'd', ध: 'dh', न: 'n', प: 'p', फ: 'f', ब: 'b', भ: 'bh', म: 'm', य: 'y', र: 'r', ल: 'l', व: 'v', श: 'sh', ष: 'sh',
  स: 's', ह: 'h', ळ: 'l', क्ष: 'ksh', ज्ञ: 'gy',
};
const DEV_VOW: Record<string, string> = { अ: 'a', आ: 'a', इ: 'i', ई: 'i', उ: 'u', ऊ: 'u', ऋ: 'ri', ए: 'e', ऐ: 'ai', ओ: 'o', औ: 'au', ऑ: 'o' };
const DEV_MATRA: Record<string, string> = { 'ा': 'a', 'ि': 'i', 'ी': 'i', 'ु': 'u', 'ू': 'u', 'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ॉ': 'o' };

export function romanize(s: string): string {
  let out = '';
  const chars = [...s];
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    const next = chars[i + 1];
    if (DEV_CONS[c] !== undefined) {
      out += DEV_CONS[c];
      if (next === '्') {
        i++;
        continue;
      }
      if (next && DEV_MATRA[next] !== undefined) {
        out += DEV_MATRA[next];
        i++;
        continue;
      }
      // inherent 'a' (dropped at word end, as in Hindi speech)
      const atEnd = !next || /\s/.test(next);
      if (!atEnd && next !== 'ं') out += 'a';
      continue;
    }
    if (DEV_VOW[c] !== undefined) {
      out += DEV_VOW[c];
      continue;
    }
    if (c === 'ं' || c === 'ँ') {
      out += 'n';
      continue;
    }
    if (c === 'ः') continue;
    out += c;
  }
  return out;
}

/** Consonant skeleton: survives most transliteration variation (ph/f, w/v, sh/s, doubled letters, vowels). */
export function skeleton(s: string): string {
  return romanize(normalize(s))
    .replace(/ph/g, 'f')
    .replace(/w/g, 'v')
    .replace(/sh/g, 's')
    .replace(/z/g, 'j')
    .replace(/ck/g, 'k')
    .replace(/c(?=[eiy])/g, 's')
    .replace(/c/g, 'k')
    .replace(/q/g, 'k')
    .replace(/x/g, 'ks')
    .replace(/[aeiouy\s]/g, '')
    .replace(/h/g, '')
    .replace(/(.)\1+/g, '$1');
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}

const sim = (a: string, b: string) => (a.length || b.length ? 1 - levenshtein(a, b) / Math.max(a.length, b.length) : 0);

/** How well does the spoken text contain this candidate answer (0..1)? */
export function answerSimilarity(spoken: string, candidate: string): number {
  const sp = normalize(spoken);
  const ca = normalize(candidate);
  if (!ca) return 0;
  if (sp === ca) return 1;
  const spR = romanize(sp);
  const caR = romanize(ca);
  if (` ${spR} `.includes(` ${caR} `)) return 0.97;
  const words = spR.split(' ');
  const n = caR.split(' ').length;
  let best = sim(spR, caR);
  const caS = skeleton(ca);
  const caJoined = caR.replace(/ /g, '');
  for (let size = n; size <= n + 2; size++) {
    for (let i = 0; i + size <= words.length; i++) {
      const joined = words.slice(i, i + size).join('');
      if (joined === caJoined) best = Math.max(best, 0.95);
      else if (caJoined.length >= 6) best = Math.max(best, sim(joined, caJoined) * 0.95);
    }
  }
  for (let i = 0; i + n <= words.length; i++) {
    const window = words.slice(i, i + n).join(' ');
    best = Math.max(best, sim(window, caR));
    const ws = skeleton(window);
    if (caS.length >= 3 && ws === caS) best = Math.max(best, 0.9);
    else if (caS.length >= 4) best = Math.max(best, sim(ws, caS) * 0.92);
  }
  return best;
}

// ---------- numbers ----------
const HI_NUM = (
  'shoonya ek do teen chaar paanch chhah saat aath nau das gyaarah baarah terah chaudah pandrah solah satrah athaarah unnees bees ' +
  'ikkees baaees teyees chaubees pachchees chhabbees sattaaees atthaaees untees tees ikattees battees taintees chauntees paintees chhattees saintees adtees untaalees chaalees ' +
  'iktaalees bayaalees taintaalees chavaalees paintaalees chhiyaalees saintaalees adtaalees unchaas pachaas ikyaavan baavan tirpan chauvan pachpan chhappan sattaavan atthaavan unsath saath ' +
  'iksath baasath tirsath chausath painsath chhiyaasath sadsath adsath unhattar sattar ikahattar bahattar tihattar chauhattar pachhattar chhihattar satattar athattar unaasee assee ' +
  'ikyaasee bayaasee tiraasee chauraasee pachaasee chhiyaasee sattaasee athaasee navaasee nabbe ikyaanave baanave tiraanave chauraanave pachaanave chhiyaanave sattaanave atthaanave ninyaanave'
).split(' ');
const EXTRA_WORDS: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13,
  fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60,
  seventy: 70, eighty: 80, ninety: 90, hundred: 100, sau: 100, so: 100, char: 4, chhe: 6, che: 6, chhah: 6, panch: 5, nav: 9, dus: 10, shunya: 0,
  // Bhojpuri / colloquial forms
  ekko: 1, duno: 2, teenon: 3, chaar: 4, chhav: 6, satt: 7,
};

/** Collapse long-vowel spellings so 'paanch', 'panch' and पाँच meet. */
const vkey = (s: string) => s.replace(/aa/g, 'a').replace(/ee/g, 'i').replace(/oo/g, 'u').replace(/(.)+/g, '$1');
const HI_KEYS = HI_NUM.map(vkey);

function wordToNumber(w: string): number | undefined {
  const r = vkey(romanize(w));
  const i = HI_KEYS.indexOf(r);
  if (i >= 0) return i;
  const ex = Object.entries(EXTRA_WORDS).find(([k]) => vkey(k) === r);
  if (ex) return ex[1];
  // tolerant match for long Hindi number words (ASR spelling drift)
  if (r.length >= 5) {
    let best = -1;
    let bs = 0;
    HI_KEYS.forEach((h, idx) => {
      const s = sim(r, h);
      if (s > bs) {
        bs = s;
        best = idx;
      }
    });
    if (bs >= 0.8) return best;
  }
  return undefined;
}

export function parseNumber(spoken: string): number | undefined {
  const s = normalize(spoken);
  const dig = s.match(/-?\d+(?:\.\d+)?/);
  if (dig) return Number(dig[0]);
  const words = s.split(' ');
  // "twenty five", "teen sau", "do sau pachaas"
  let total: number | undefined;
  let cur = 0;
  let seen = false;
  for (const w of words) {
    const v = wordToNumber(w);
    if (v === undefined) continue;
    seen = true;
    if (v === 100) cur = (cur || 1) * 100;
    else if (v >= 20 && v % 10 === 0 && v < 100 && cur % 100 === 0 && cur >= 0) cur += v;
    else cur += v;
    total = cur;
  }
  return seen ? total : undefined;
}

// ---------- intents & option picking ----------
const ORDINALS: string[][] = [
  ['a', 'option a', 'pehla', 'pahla', 'pehala', 'pahila', 'pahilka', 'first', 'pratham', 'प्रथम', 'पहला', 'पहिला', 'প্রথম', 'முதல்', 'మొదటి', 'ಮೊದಲ', 'ಮೊದಲನೆಯ', 'onnu', 'ek number'],
  ['b', 'option b', 'doosra', 'dusra', 'doosara', 'dusar', 'dusarka', 'second', 'दूसरा', 'दुसरा', 'दूसर', 'দ্বিতীয়', 'இரண்டாவது', 'రెండవ', 'ಎರಡನೆಯ', 'do number'],
  ['c', 'option c', 'teesra', 'tisra', 'teesara', 'tisar', 'tisarka', 'third', 'तीसरा', 'तिसरा', 'तीसर', 'তৃতীয়', 'மூன்றாவது', 'మూడవ', 'ಮೂರನೆಯ', 'teen number'],
  ['d', 'option d', 'chautha', 'chautha', 'chotha', 'chauth', 'fourth', 'चौथा', 'चउथा', 'চতুর্থ', 'நான்காவது', 'నాలుగవ', 'ನಾಲ್ಕನೆಯ', 'char number', 'chaar number'],
];
const LETTER_NAMES: [RegExp, number][] = [
  [/(^| )(a|ए|ae|ay)( |$)/, 0],
  [/(^| )(b|बी|bee|be)( |$)/, 1],
  [/(^| )(c|सी|see|si)( |$)/, 2],
  [/(^| )(d|डी|dee|di)( |$)/, 3],
];

const SKIP = ['skip', 'pata nahi', 'pata nahin', 'nahi pata', 'maloom nahi', 'agla', 'next', 'नहीं पता', 'पता नहीं', 'ना पता', 'ना मालूम', 'नइखे पता', 'pata naikhe', "don't know", 'dont know', 'জানি না', 'தெரியாது', 'తెలియదు', 'माहीत नाही', 'ಗೊತ್ತಿಲ್ಲ'];
const REPEAT = ['repeat', 'phir se', 'fir se', 'dobara', 'dubara', 'again', 'फिर से', 'दोबारा', 'फेर से', 'pher se', 'ek baar aur', 'আবার', 'மீண்டும்', 'మళ్ళీ', 'पुन्हा', 'ಮತ್ತೆ'];

function hasPhrase(text: string, list: string[]): boolean {
  const t = ` ${normalize(text)} `;
  const r = ` ${romanize(normalize(text))} `;
  return list.some((p) => {
    const n = normalize(p);
    return t.includes(` ${n} `) || r.includes(` ${romanize(n)} `);
  });
}

export function pickOption(spoken: string, count: number): number | undefined {
  const t = normalize(spoken);
  for (let i = 0; i < Math.min(count, ORDINALS.length); i++) if (hasPhrase(t, ORDINALS[i])) return i;
  const words = t.split(' ');
  if (words.length <= 3) {
    for (const [re, i] of LETTER_NAMES) if (i < count && re.test(t)) return i;
  }
  return undefined;
}

// ---------- the matcher ----------
export function matchAnswer(q: QuizQuestion, spoken: string): Verdict {
  const t = normalize(spoken);
  if (!t) return { verdict: 'unclear' };
  if (hasPhrase(t, REPEAT) && t.split(' ').length <= 4) return { verdict: 'repeat' };
  if (hasPhrase(t, SKIP) && t.split(' ').length <= 5) return { verdict: 'skip' };

  if (q.kind === 'number') {
    const n = parseNumber(t);
    if (n === undefined) return { verdict: 'unclear' };
    const ok = Math.abs(n - q.answer) <= (q.tolerance ?? 0);
    return ok ? { verdict: 'correct', confidence: 0.95 } : { verdict: 'wrong', heard: n, confidence: 0.9 };
  }

  if (q.kind === 'text') {
    const best = Math.max(...q.answers.map((a) => answerSimilarity(t, a)));
    if (best >= 0.8) return { verdict: 'correct', confidence: best };
    if (best >= 0.6) return { verdict: 'unclear' };
    return { verdict: 'wrong', heard: spoken, confidence: 1 - best };
  }

  // MCQ: an explicit option word ("doosra", "option B") wins; otherwise match option text.
  const picked = pickOption(t, q.options.length);
  if (picked !== undefined) {
    return picked === q.answer ? { verdict: 'correct', chosen: picked, confidence: 0.95 } : { verdict: 'wrong', chosen: picked, confidence: 0.9 };
  }
  const scores = q.options.map((variants) => Math.max(...variants.map((v) => answerSimilarity(t, v))));
  const order = scores.map((s, i) => [s, i] as const).sort((a, b) => b[0] - a[0]);
  const [top, second] = order;
  if (top[0] >= 0.75 && top[0] - (second?.[0] ?? 0) >= 0.1) {
    return top[1] === q.answer ? { verdict: 'correct', chosen: top[1], confidence: top[0] } : { verdict: 'wrong', chosen: top[1], confidence: top[0] };
  }
  // a bare number can name an option ("teen" → option 3) when it is not itself an option text
  const n = parseNumber(t);
  if (n !== undefined && n >= 1 && n <= q.options.length && t.split(' ').length <= 2) {
    const i = n - 1;
    return i === q.answer ? { verdict: 'correct', chosen: i, confidence: 0.8 } : { verdict: 'wrong', chosen: i, confidence: 0.8 };
  }
  return { verdict: 'unclear' };
}
