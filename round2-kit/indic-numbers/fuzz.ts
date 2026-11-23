// Property fuzz: random amounts rendered as words/digits in sentences with distractors,
// parsed back with findAmount. Usage: node fuzz.mjs <iterationsPerLang> [seed]
import { findAmount } from './src/numbers';

let seed = Number(process.argv[3] ?? 7);
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const pick = <T,>(a: T[]) => a[Math.floor(rnd() * a.length)];

type Lang = { units: string[]; tens: Record<number, string>; sau: string; hazaar: string; lakh: string; cur: string; tpl: string[]; time: string[]; ids: string[] };
// units[1..10] and multiples of ten are the forms we know are standard in each language.
const L: Record<string, Lang> = {
  hi: { units: ['', 'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस'], tens: { 20: 'बीस', 30: 'तीस', 40: 'चालीस', 50: 'पचास', 60: 'साठ', 70: 'सत्तर', 80: 'अस्सी', 90: 'नब्बे' }, sau: 'सौ', hazaar: 'हज़ार', lakh: 'लाख', cur: 'रुपये', tpl: ['मेरे खाते से {A} कट गए', '{T} {A} गए, {I}', 'उसने {A} ले लिए'], time: ['दस मिनट पहले', 'कल शाम 7 बजे', 'आज सुबह'], ids: ['UTR 4 0 3 2 1 8 7 6 5 4 3 2', 'नंबर 9876543210', 'नंबर नौ आठ सात छह पाँच'] },
  mr: { units: ['', 'एक', 'दोन', 'तीन', 'चार', 'पाच', 'सहा', 'सात', 'आठ', 'नऊ', 'दहा'], tens: { 20: 'वीस', 30: 'तीस', 40: 'चाळीस', 50: 'पन्नास', 60: 'साठ', 70: 'सत्तर', 80: 'ऐंशी', 90: 'नव्वद' }, sau: 'शे', hazaar: 'हजार', lakh: 'लाख', cur: 'रुपये', tpl: ['माझ्या खात्यातून {A} गेले', '{T} {A} कापले, {I}'], time: ['दहा मिनिटांपूर्वी', 'काल संध्याकाळी सात वाजता'], ids: ['नंबर 9876543210'] },
  en: { units: ['', 'ek', 'do', 'teen', 'chaar', 'paanch', 'chhe', 'saat', 'aath', 'nau', 'das'], tens: { 20: 'bees', 30: 'tees', 40: 'chaalees', 50: 'pachaas', 60: 'saath', 70: 'sattar', 80: 'assi', 90: 'nabbe' }, sau: 'sau', hazaar: 'hazaar', lakh: 'lakh', cur: 'rupaye', tpl: ['mere {A} kat gaye', '{T} {A} gaye yaar, {I}'], time: ['das minute pehle', 'kal shaam 7 baje'], ids: ['UTR 4 0 3 2 1 8 7 6 5 4 3 2', 'number 98765 43210'] },
  bn: { units: ['', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়', 'দশ'], tens: { 20: 'কুড়ি', 30: 'তিরিশ', 40: 'চল্লিশ', 50: 'পঞ্চাশ', 60: 'ষাট', 70: 'সত্তর', 80: 'আশি', 90: 'নব্বই' }, sau: 'শো', hazaar: 'হাজার', lakh: 'লাখ', cur: 'টাকা', tpl: ['আমার {A} কেটে গেছে', '{T} {A} চলে গেছে, {I}'], time: ['দশ মিনিট আগে', 'গতকাল রাত দশটায়'], ids: ['নম্বর 9876543210'] },
  te: { units: ['', 'ఒక', 'రెండు', 'మూడు', 'నాలుగు', 'ఐదు', 'ఆరు', 'ఏడు', 'ఎనిమిది', 'తొమ్మిది', 'పది'], tens: { 20: 'ఇరవై', 30: 'ముప్పై', 40: 'నలభై', 50: 'యాభై', 60: 'అరవై', 70: 'డెబ్బై', 80: 'ఎనభై', 90: 'తొంభై' }, sau: 'వందల', hazaar: 'వేల', lakh: 'లక్షల', cur: 'రూపాయలు', tpl: ['నా {A} పోయాయి', '{T} {A} కట్ అయ్యాయి, {I}'], time: ['పది నిమిషాల క్రితం', 'నిన్న రాత్రి 10 గంటలకు'], ids: ['నంబర్ 9876543210'] },
  kn: { units: ['', 'ಒಂದು', 'ಎರಡು', 'ಮೂರು', 'ನಾಲ್ಕು', 'ಐದು', 'ಆರು', 'ಏಳು', 'ಎಂಟು', 'ಒಂಬತ್ತು', 'ಹತ್ತು'], tens: { 20: 'ಇಪ್ಪತ್ತು', 30: 'ಮೂವತ್ತು', 40: 'ನಲವತ್ತು', 50: 'ಐವತ್ತು', 60: 'ಅರವತ್ತು', 70: 'ಎಪ್ಪತ್ತು', 80: 'ಎಂಬತ್ತು', 90: 'ತೊಂಬತ್ತು' }, sau: 'ನೂರು', hazaar: 'ಸಾವಿರ', lakh: 'ಲಕ್ಷ', cur: 'ರೂಪಾಯಿ', tpl: ['ನನ್ನ {A} ಹೋಯಿತು', '{T} {A} ಕಟ್ ಆಯಿತು, {I}'], time: ['ಹತ್ತು ನಿಮಿಷಗಳ ಹಿಂದೆ', 'ನಿನ್ನೆ ರಾತ್ರಿ 10 ಗಂಟೆಗೆ'], ids: ['ನಂಬರ್ 9876543210'] },
};

// A small number in [1, 99] using only "unit" or "ten" or "ten unit" forms (tens+units are spoken separately in te/kn/en).
function small(l: Lang, lang: string): [number, string] {
  if (rnd() < 0.5 || lang === 'hi' || lang === 'mr' || lang === 'bn') {
    if (rnd() < 0.6) { const u = 1 + Math.floor(rnd() * 10); return [u, l.units[u]]; }
    const t = 20 + 10 * Math.floor(rnd() * 8); return [t, l.tens[t]];
  }
  const t = 20 + 10 * Math.floor(rnd() * 8); const u = 1 + Math.floor(rnd() * 9);
  return [t + u, `${l.tens[t]} ${l.units[u]}`];
}

function render(lang: string): [number, string] {
  const l = L[lang];
  const parts: string[] = [];
  let v = 0;
  if (rnd() < 0.25) { const [a, w] = small(l, lang); v += a * 100000; parts.push(w, l.lakh); }
  if (rnd() < 0.8 || v === 0) { const [b, w] = small(l, lang); v += b * 1000; parts.push(w, l.hazaar); }
  if (rnd() < 0.4) {
    const c = 1 + Math.floor(rnd() * 9);
    v += c * 100;
    if (lang === 'mr' || lang === 'bn') parts.push(l.units[c] + l.sau); // पाचशे, পাঁচশো
    else if (lang === 'kn') parts.push(l.units[c], l.sau);
    else parts.push(l.units[c], l.sau);
  }
  return [v, parts.join(' ')];
}

const n = Number(process.argv[2] ?? 2000);
let total = 0, ok = 0;
const fails: string[] = [];
for (const lang of Object.keys(L)) {
  const l = L[lang];
  let lok = 0;
  for (let k = 0; k < n; k++) {
    let [v, words] = render(lang);
    // a third of the time: digits with Indian commas and ₹
    if (rnd() < 0.33) { words = (rnd() < 0.5 ? '₹' : '') + v.toLocaleString('en-IN'); }
    const text = pick(l.tpl).replace('{A}', `${words} ${l.cur}`).replace('{T}', pick(l.time)).replace('{I}', pick(l.ids));
    const got = findAmount(text);
    total++;
    if (got === v) { ok++; lok++; } else if (fails.length < 40) fails.push(`${lang} want ${v} got ${got} | ${text}`);
  }
  console.log(lang, `${lok}/${n}`);
}
console.log('ALL', `${ok}/${total}`, ((100 * ok) / total).toFixed(2) + '%');
console.log(fails.join('\n'));
