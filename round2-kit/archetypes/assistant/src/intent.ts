// Hands-free assistant for older users: "book a cab" / "pay a bill" / "recharge" /
// "call my son" by speaking Bengali, Hindi or English. Pure, no DOM.
// Safety first: money actions always need an explicit spoken or tapped confirmation
// and never complete inside this app — we hand off to the official app with fields filled.

export type Intent = 'book_cab' | 'pay_bill' | 'recharge' | 'call' | 'help';
export type BillType = 'electricity' | 'water' | 'gas' | 'broadband' | 'dth' | 'mobile_postpaid';

export interface Parsed {
  intent?: Intent;
  /** 0..1, how sure the keyword match is */
  confidence: number;
  pickup?: string;
  drop?: string;
  when?: 'now' | 'later';
  billType?: BillType;
  amount?: number;
  phone?: string;
  person?: string;
}

const norm = (s: string) =>
  s
    .normalize('NFC')
    .toLowerCase()
    .replace(/[.,!?;:'"“”‘’()।॥\-–—]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Indian scripts glue case suffixes onto words (ছেলেকে = ছেলে + কে, बेटे को): allow prefix matches there.
const nonLatin = (w: string) => /[^\x00-\x7f]/.test(w);
const has = (t: string, words: string[]) =>
  words.some((w) => {
    const n = norm(w);
    return ` ${t} `.includes(` ${n} `) || (n.length > 4 && t.includes(n)) || (nonLatin(n) && n.length >= 3 && ` ${t}`.includes(` ${n}`));
  });

const INTENT_WORDS: Record<Intent, string[]> = {
  book_cab: ['cab', 'taxi', 'uber', 'ola', 'rapido', 'auto', 'gaadi', 'gari', 'गाड़ी', 'गाडी', 'टैक्सी', 'कैब', 'ऑटो', 'ট্যাক্সি', 'গাড়ি', 'ক্যাব', 'অটো', 'উবার', 'ওলা', 'book a ride', 'le chalo', 'jana hai', 'जाना है', 'যাব', 'যেতে চাই', 'নিয়ে চলো'],
  pay_bill: ['bill', 'बिल', 'বিল', 'bijli', 'बिजली', 'বিদ্যুৎ', 'electricity', 'current bill', 'কারেন্ট', 'पानी का बिल', 'জলের বিল', 'gas', 'गैस', 'গ্যাস', 'broadband', 'wifi', 'dth', 'cesc', 'wbsedcl', 'jama karna', 'জমা দিতে', 'bharna', 'भरना'],
  recharge: ['recharge', 'रिचार्ज', 'রিচার্জ', 'balance dalwana', 'talktime', 'data pack'],
  call: ['call', 'phone karo', 'फोन करो', 'फ़ोन लगाओ', 'कॉल', 'ফোন করো', 'ফোন কর', 'কল করো', 'baat karao', 'বাত'],
  help: ['help', 'madad', 'मदद', 'সাহায্য', 'bachao', 'emergency'],
};

const BILL_WORDS: Record<BillType, string[]> = {
  electricity: ['bijli', 'बिजली', 'electricity', 'current', 'কারেন্ট', 'বিদ্যুৎ', 'cesc', 'wbsedcl', 'light bill', 'লাইট'],
  water: ['paani', 'pani', 'पानी', 'water', 'জল', 'জলের'],
  gas: ['gas', 'गैस', 'গ্যাস', 'cylinder', 'सिलेंडर', 'সিলিন্ডার', 'indane', 'bharat gas', 'hp gas'],
  broadband: ['broadband', 'wifi', 'internet', 'वाईफाई', 'ইন্টারনেট'],
  dth: ['dth', 'tata play', 'dish tv', 'airtel dth', 'টিভি', 'cable'],
  mobile_postpaid: ['postpaid', 'mobile bill', 'मोबाइल बिल', 'মোবাইল বিল'],
};

const NOW_WORDS = ['abhi', 'अभी', 'এখন', 'এক্ষুনি', 'now', 'turant', 'तुरंत', 'jaldi', 'জলদি'];
const LATER_WORDS = ['kal', 'कल', 'কাল', 'baad mein', 'बाद में', 'পরে', 'tomorrow', 'later', 'shaam ko', 'সন্ধ্যায়'];

const PERSON_WORDS: [string, string[]][] = [
  ['son', ['beta', 'बेटा', 'बेटे', 'ছেলে', 'chhele', 'son']],
  ['daughter', ['beti', 'बेटी', 'মেয়ে', 'meye', 'daughter']],
  ['wife', ['wife', 'patni', 'पत्नी', 'বউ', 'স্ত্রী', 'gharwali']],
  ['husband', ['husband', 'pati', 'पति', 'স্বামী']],
  ['doctor', ['doctor', 'डॉक्टर', 'ডাক্তার']],
  ['grandson', ['pota', 'पोता', 'নাতি', 'grandson']],
  ['granddaughter', ['poti', 'पोती', 'নাতনি', 'granddaughter']],
];

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const DEV_DIGITS = '०१२३४५६७८९';
const foldDigits = (s: string) => [...s].map((c) => (BN_DIGITS.includes(c) ? String(BN_DIGITS.indexOf(c)) : DEV_DIGITS.includes(c) ? String(DEV_DIGITS.indexOf(c)) : c)).join('');

// Small, safe number reader for bill amounts: digits, "hazaar/হাজার", "sau/শো".
const SMALL: Record<string, number> = {
  ek: 1, do: 2, teen: 3, char: 4, chaar: 4, paanch: 5, panch: 5, chhe: 6, saat: 7, aath: 8, nau: 9, das: 10,
  এক: 1, দুই: 2, তিন: 3, চার: 4, পাঁচ: 5, ছয়: 6, সাত: 7, আট: 8, নয়: 9, দশ: 10,
  एक: 1, दो: 2, तीन: 3, चार: 4, पांच: 5, पाँच: 5, छह: 6, सात: 7, आठ: 8, नौ: 9, दस: 10,
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
};
const MULT: Record<string, number> = { hazaar: 1000, hazar: 1000, हज़ार: 1000, हजार: 1000, হাজার: 1000, thousand: 1000, sau: 100, सौ: 100, শো: 100, hundred: 100, 'শ': 100 };

export function parseAmount(text: string): number | undefined {
  // thousands commas and phone numbers first, so 98765 43210 is never read as an amount
  const t = norm(foldDigits(text).replace(/(\d),(\d)/g, '$1$2')).replace(/(^|\D)[6-9]\d{9}(?=\D|$)/g, '$1 ');
  const m = t.match(/(?:₹|rs|rupees?|रुपये|रुपए|টাকা)?\s*(\d{2,7})\s*(?:₹|rs|rupees?|रुपये|रुपए|টাকা|taka|rupaye)?/);
  if (m) return Number(m[1]);
  const words = t.split(' ');
  let total = 0;
  let cur = 0;
  let seen = false;
  for (const w of words) {
    if (SMALL[w] !== undefined) {
      cur += SMALL[w];
      seen = true;
    } else if (MULT[w] !== undefined) {
      total += (cur || 1) * MULT[w];
      cur = 0;
      seen = true;
    }
  }
  return seen ? total + cur : undefined;
}

/** "Park Street se Howrah station", "Howrah station jabo", "from X to Y". */
export function parseRoute(text: string): { pickup?: string; drop?: string } {
  const t = norm(text);
  const pats: RegExp[] = [
    /(?:from\s+)?(.+?)\s+(?:se|से|থেকে|theke|to)\s+(.+?)(?:\s+(?:tak|तक|পর্যন্ত|porjonto|jana hai|जाना है|jabo|যাব|যেতে চাই|le chalo|chalo|ले चलो|নিয়ে চলো))?$/,
  ];
  for (const re of pats) {
    const m = t.match(re);
    if (m) return { pickup: clean(m[1]), drop: clean(m[2]) };
  }
  const only = t.match(/(.+?)\s+(?:jana hai|जाना है|jabo|যাব|যেতে চাই|le chalo|ले चलो|নিয়ে চলো|tak)$/);
  if (only) return { drop: clean(only[1]) };
  return {};
}

const FILLER = ['mujhe', 'मुझे', 'amake', 'আমাকে', 'ami', 'আমি', 'ek', 'একটা', 'cab', 'taxi', 'gaadi', 'गाड़ी', 'ট্যাক্সি', 'book', 'karo', 'करो', 'please', 'abhi', 'अभी', 'এখন', 'auto'];
function clean(s: string): string | undefined {
  const words = s.split(' ').filter((w) => !FILLER.includes(w));
  const out = words.join(' ').trim();
  return out.length >= 2 ? out : undefined;
}

export function parse(text: string): Parsed {
  const t = foldDigits(norm(text));
  const scores = (Object.keys(INTENT_WORDS) as Intent[]).map((k) => [k, INTENT_WORDS[k].filter((w) => has(t, [w])).length] as const);
  scores.sort((a, b) => b[1] - a[1]);
  const [top, second] = scores;
  const out: Parsed = { confidence: 0 };
  if (top[1] > 0) {
    out.intent = top[0];
    out.confidence = top[1] > (second?.[1] ?? 0) ? Math.min(1, 0.6 + 0.2 * top[1]) : 0.5;
  }
  // a route alone ("Howrah station jabo") is a cab request
  const route = parseRoute(text);
  if (!out.intent && route.drop) {
    out.intent = 'book_cab';
    out.confidence = 0.6;
  }
  if (out.intent === 'book_cab') {
    Object.assign(out, route);
    out.when = has(t, LATER_WORDS) ? 'later' : 'now';
  }
  if (out.intent === 'pay_bill') {
    for (const [k, words] of Object.entries(BILL_WORDS) as [BillType, string[]][]) if (has(t, words)) out.billType ??= k;
    out.amount = parseAmount(text);
  }
  if (out.intent === 'recharge') {
    out.amount = parseAmount(text);
    const ph = t.match(/(?:^|\D)([6-9]\d{9})(?:\D|$)/);
    if (ph) out.phone = ph[1];
  }
  if (out.intent === 'call') {
    for (const [who, words] of PERSON_WORDS) if (has(t, words)) out.person ??= who;
  }
  void NOW_WORDS;
  return out;
}

/** What is still missing for this intent, in the order we should ask. */
export function missing(p: Parsed): string[] {
  switch (p.intent) {
    case 'book_cab':
      return [!p.drop && 'drop', !p.pickup && 'pickup'].filter(Boolean) as string[];
    case 'pay_bill':
      return [!p.billType && 'billType'].filter(Boolean) as string[];
    case 'recharge':
      return [!p.amount && 'amount'].filter(Boolean) as string[];
    case 'call':
      return [!p.person && 'person'].filter(Boolean) as string[];
    default:
      return p.intent ? [] : ['intent'];
  }
}

// ---------- hand-off links (the official apps do the payment / booking) ----------
export function uberLink(p: Parsed): string {
  const q = new URLSearchParams({ action: 'setPickup' });
  q.set('pickup', p.pickup ? '' : 'my_location');
  if (p.pickup) q.set('pickup[formatted_address]', p.pickup);
  if (p.drop) q.set('dropoff[formatted_address]', p.drop);
  if (!p.pickup) q.delete('pickup[formatted_address]');
  return `https://m.uber.com/ul/?${q.toString()}`;
}

export function mapsLink(p: Parsed): string {
  const q = new URLSearchParams({ api: '1', travelmode: 'driving' });
  if (p.pickup) q.set('origin', p.pickup);
  if (p.drop) q.set('destination', p.drop);
  return `https://www.google.com/maps/dir/?${q.toString()}`;
}

/** Elder-safe money rule: never auto-confirm. Amounts above the family limit need a family OK. */
export function needsFamilyOk(p: Parsed, limit = 2000): boolean {
  return (p.intent === 'pay_bill' || p.intent === 'recharge') && (p.amount ?? 0) > limit;
}
