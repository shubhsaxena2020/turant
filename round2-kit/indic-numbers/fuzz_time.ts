// Property fuzz for findTime: generated relative ("N units ago") and clock phrases in 7 languages.
// Usage: node fuzz_time.mjs <iterationsPerLang> [seed]
import { findTime } from './src/time';

let seed = Number(process.argv[3] ?? 5);
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const pick = <T,>(a: T[]) => a[Math.floor(rnd() * a.length)];
const NOW = new Date('2026-11-21T12:00:00+05:30');

type T = {
  n: Record<number, string>;
  min: string; hour: string; day: string; ago: string;
  today: string; yest: string;
  parts: { morning: string; afternoon: string; evening: string; night: string };
  clock: (h: string) => string;
};
const L: Record<string, T> = {
  hi: { n: { 1: 'एक', 2: 'दो', 3: 'तीन', 4: 'चार', 5: 'पाँच', 6: 'छह', 7: 'सात', 8: 'आठ', 9: 'नौ', 10: 'दस', 15: 'पंद्रह', 20: 'बीस', 30: 'तीस' }, min: 'मिनट', hour: 'घंटे', day: 'दिन', ago: 'पहले', today: 'आज', yest: 'कल', parts: { morning: 'सुबह', afternoon: 'दोपहर', evening: 'शाम', night: 'रात' }, clock: (h) => `${h} बजे` },
  en: { n: { 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 15: 'fifteen', 20: 'twenty', 30: 'thirty' }, min: 'minutes', hour: 'hours', day: 'days', ago: 'ago', today: 'today', yest: 'yesterday', parts: { morning: 'morning', afternoon: 'afternoon', evening: 'evening', night: 'night' }, clock: (h) => `at ${h} o'clock` },
  mr: { n: { 1: 'एक', 2: 'दोन', 3: 'तीन', 4: 'चार', 5: 'पाच', 6: 'सहा', 7: 'सात', 8: 'आठ', 9: 'नऊ', 10: 'दहा', 15: 'पंधरा', 20: 'वीस', 30: 'तीस' }, min: 'मिनिटांपूर्वी', hour: 'तासांपूर्वी', day: 'दिवसांपूर्वी', ago: '', today: 'आज', yest: 'काल', parts: { morning: 'सकाळी', afternoon: 'दुपारी', evening: 'संध्याकाळी', night: 'रात्री' }, clock: (h) => `${h} वाजता` },
  bn: { n: { 1: 'এক', 2: 'দুই', 3: 'তিন', 4: 'চার', 5: 'পাঁচ', 6: 'ছয়', 7: 'সাত', 8: 'আট', 9: 'নয়', 10: 'দশ', 15: 'পনেরো', 20: 'কুড়ি', 30: 'তিরিশ' }, min: 'মিনিট', hour: 'ঘণ্টা', day: 'দিন', ago: 'আগে', today: 'আজ', yest: 'গতকাল', parts: { morning: 'সকাল', afternoon: 'দুপুর', evening: 'সন্ধ্যা', night: 'রাত' }, clock: (h) => `${h}টায়` },
  ta: { n: { 1: 'ஒரு', 2: 'இரண்டு', 3: 'மூன்று', 4: 'நான்கு', 5: 'ஐந்து', 6: 'ஆறு', 7: 'ஏழு', 8: 'எட்டு', 9: 'ஒன்பது', 10: 'பத்து', 15: 'பதினைந்து', 20: 'இருபது', 30: 'முப்பது' }, min: 'நிமிஷத்துக்கு', hour: 'மணி நேரத்துக்கு', day: 'நாட்களுக்கு', ago: 'முன்னாடி', today: 'இன்று', yest: 'நேற்று', parts: { morning: 'காலை', afternoon: 'மதியம்', evening: 'மாலை', night: 'இரவு' }, clock: (h) => `${h} மணிக்கு` },
  te: { n: { 1: 'ఒక', 2: 'రెండు', 3: 'మూడు', 4: 'నాలుగు', 5: 'ఐదు', 6: 'ఆరు', 7: 'ఏడు', 8: 'ఎనిమిది', 9: 'తొమ్మిది', 10: 'పది', 15: 'పదిహేను', 20: 'ఇరవై', 30: 'ముప్పై' }, min: 'నిమిషాల', hour: 'గంటల', day: 'రోజుల', ago: 'క్రితం', today: 'ఈరోజు', yest: 'నిన్న', parts: { morning: 'ఉదయం', afternoon: 'మధ్యాహ్నం', evening: 'సాయంత్రం', night: 'రాత్రి' }, clock: (h) => `${h} గంటలకు` },
  kn: { n: { 1: 'ಒಂದು', 2: 'ಎರಡು', 3: 'ಮೂರು', 4: 'ನಾಲ್ಕು', 5: 'ಐದು', 6: 'ಆರು', 7: 'ಏಳು', 8: 'ಎಂಟು', 9: 'ಒಂಬತ್ತು', 10: 'ಹತ್ತು', 15: 'ಹದಿನೈದು', 20: 'ಇಪ್ಪತ್ತು', 30: 'ಮೂವತ್ತು' }, min: 'ನಿಮಿಷಗಳ', hour: 'ಗಂಟೆಗಳ', day: 'ದಿನಗಳ', ago: 'ಹಿಂದೆ', today: 'ಇಂದು', yest: 'ನಿನ್ನೆ', parts: { morning: 'ಬೆಳಿಗ್ಗೆ', afternoon: 'ಮಧ್ಯಾಹ್ನ', evening: 'ಸಂಜೆ', night: 'ರಾತ್ರಿ' }, clock: (h) => `${h} ಗಂಟೆಗೆ` },
};
const PART_HOURS: Record<string, number[]> = { morning: [6, 7, 8, 9, 10, 11], afternoon: [1, 2, 3, 4], evening: [5, 6, 7, 8], night: [8, 9, 10, 11] };

const n = Number(process.argv[2] ?? 1000);
let ok = 0, total = 0;
const fails: string[] = [];
for (const [lang, l] of Object.entries(L)) {
  let lok = 0;
  for (let k = 0; k < n; k++) {
    let text: string, want: number;
    if (rnd() < 0.5) {
      const unit = pick(['min', 'hour', 'day'] as const);
      const nums = Object.keys(l.n).map(Number).filter((x) => (unit === 'day' ? x <= 7 : unit === 'hour' ? x <= 10 : true));
      const q = pick(nums);
      const word = rnd() < 0.3 ? String(q) : l.n[q];
      text = `${word} ${l[unit]} ${l.ago}`.trim() + (rnd() < 0.5 ? ' paise gaye' : '');
      want = NOW.getTime() - q * (unit === 'min' ? 1 : unit === 'hour' ? 60 : 1440) * 60000;
    } else {
      const part = pick(['morning', 'afternoon', 'evening', 'night'] as const);
      const h = pick(PART_HOURS[part]);
      const day = pick([0, -1]);
      if (day === 0 && part !== 'morning') { k--; continue; } // only past times for "today" (now = 12:00)
      const hw = rnd() < 0.5 || !l.n[h] ? String(h) : l.n[h];
      text = `${day === 0 ? l.today : l.yest} ${l.parts[part]} ${l.clock(hw)}`;
      const H = part === 'morning' ? h : h === 12 ? 12 : h + 12;
      const d = new Date(NOW); d.setDate(d.getDate() + day); d.setHours(H, 0, 0, 0);
      want = d.getTime();
    }
    const got = findTime(text, NOW);
    total++;
    if (got && Math.abs(got.date.getTime() - want) <= 20 * 60000) { ok++; lok++; } else if (fails.length < 50) fails.push(`${lang} want ${new Date(want).toISOString()} got ${got?.date.toISOString()} ${got?.kind} | ${text}`);
  }
  console.log(lang, `${lok}/${n}`);
}
console.log('ALL', `${ok}/${total}`, ((100 * ok) / total).toFixed(2) + '%');
console.log(fails.join('\n'));
