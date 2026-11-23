// Spoken numbers and amounts in Indian languages (hi, mr, bn, ta, te, kn, en + code-mixed).
// Words are split into number parts (Tamil/Kannada glue them: நாற்பத்தேழாயிரம் = 40 + 7 + thousand),
// then combined with hundred / thousand / lakh / crore multipliers. Pure, no DOM.

type Part = { v: number } | { mul: number } | { half: true };

// ---------- lexicons (value words) ----------
const WORDS: Record<string, number> = {};
const add = (v: number, ...ws: string[]) => ws.forEach((w) => (WORDS[w.normalize('NFC')] = v));

// Hindi / Marathi (Devanagari + common Latin)
add(0, 'शून्य', 'shunya', 'zero', 'ज़ीरो', 'जीरो', 'झीरो');
// English number words written in Devanagari by the recogniser ("फाइव साल", "ट्वेंटी थाउज़ेंड")
add(2, 'टू'); // not वन ("forest") or सेवन ("intake"): ordinary Hindi words add(3, 'थ्री'); add(4, 'फोर'); add(5, 'फाइव', 'फ़ाइव'); add(6, 'सिक्स'); add(8, 'एट', 'ऐट'); add(9, 'नाइन'); add(10, 'टेन');
add(20, 'ट्वेंटी', 'ट्वेन्टी'); add(30, 'थर्टी'); add(40, 'फोर्टी'); add(50, 'फिफ्टी'); add(60, 'सिक्सटी'); add(70, 'सेवेंटी'); add(80, 'एटी', 'ऐटी'); add(90, 'नाइंटी');
// zero in ta / te / kn (was missing), and "zero" said in English in every script (phone and UTR read-outs)
add(0, 'பூஜ்ஜியம்', 'பூஜ்யம்', 'சைபர்', 'ஜீரோ', 'సున్నా', 'సున్న', 'జీరో', 'ಸೊನ್ನೆ', 'ಶೂನ್ಯ', 'ಜೀರೋ', 'জিরো');
add(1, 'एक', 'ek', 'one');
add(2, 'दो', 'दोन', 'do', 'don', 'two');
add(3, 'तीन', 'teen', 'tin', 'three');
add(4, 'चार', 'char', 'chaar', 'four');
add(5, 'पाँच', 'पांच', 'पाच', 'paanch', 'panch', 'five');
add(6, 'छह', 'छः', 'छे', 'सहा', 'chhe', 'chhah', 'six');
add(7, 'सात', 'saat', 'seven');
add(8, 'आठ', 'aath', 'eight');
add(9, 'नौ', 'नऊ', 'नव', 'nau', 'nine'); // नव: Marathi spoken form
add(10, 'दस', 'दहा', 'das', 'dus', 'ten');
add(11, 'ग्यारह', 'ग्यारा', 'ज्यारा', 'अकरा', 'gyarah', 'eleven'); // ग्यारा / ज्यारा: ASR spellings
add(12, 'बारह', 'बारा', 'barah', 'baarah', 'twelve');
add(13, 'तेरह', 'तेरा', 'terah', 'thirteen');
add(14, 'चौदह', 'चौदा', 'chaudah', 'fourteen');
add(15, 'पंद्रह', 'पंधरा', 'pandrah', 'fifteen');
add(16, 'सोलह', 'सोळा', 'solah', 'sixteen');
add(17, 'सत्रह', 'सतरा', 'satrah', 'seventeen');
add(18, 'अठारह', 'अठरा', 'atharah', 'eighteen');
add(19, 'उन्नीस', 'एकोणीस', 'unnis', 'nineteen');
add(20, 'बीस', 'वीस', 'bees', 'twenty');
add(25, 'पच्चीस', 'पंचवीस', 'pachchis', 'pachees', 'twenty-five');
add(30, 'तीस', 'tees', 'thirty');
add(40, 'चालीस', 'चाळीस', 'chalis', 'forty');
add(47, 'सैंतालीस', 'सत्तेचाळीस');
add(50, 'पचास', 'पन्नास', 'pachaas', 'pachas', 'fifty');
add(60, 'साठ', 'saath', 'sixty');
add(70, 'सत्तर', 'sattar', 'seventy');
add(75, 'पचहत्तर', 'पंचाहत्तर');
add(80, 'अस्सी', 'ऐंशी', 'assi', 'eighty');
add(90, 'नब्बे', 'नव्वद', 'nabbe', 'ninety');
add(99, 'निन्यानवे', 'नव्व्याण्णव');
add(100, 'सौ', 'शंभर', 'sau', 'hundred');
add(1.5, 'डेढ़', 'डेढ', 'दीड', 'देड़', 'देढ़', 'dedh'); // देड़: how ASR spells डेढ़
const HI_21_99 = 'इक्कीस बाईस तेईस चौबीस पच्चीस छब्बीस सत्ताईस अट्ठाईस उनतीस तीस इकतीस बत्तीस तैंतीस चौंतीस पैंतीस छत्तीस सैंतीस अड़तीस उनतालीस चालीस इकतालीस बयालीस तैंतालीस चवालीस पैंतालीस छियालीस सैंतालीस अड़तालीस उनचास पचास इक्यावन बावन तिरपन चौवन पचपन छप्पन सत्तावन अट्ठावन उनसठ साठ इकसठ बासठ तिरसठ चौंसठ पैंसठ छियासठ सड़सठ अड़सठ उनहत्तर सत्तर इकहत्तर बहत्तर तिहत्तर चौहत्तर पचहत्तर छिहत्तर सतहत्तर अठहत्तर उन्यासी अस्सी इक्यासी बयासी तिरासी चौरासी पचासी छियासी सत्तासी अट्ठासी नवासी नब्बे इक्यानवे बानवे तिरानवे चौरानवे पचानवे छियानवे सत्तानवे अट्ठानवे निन्यानवे'.split(' ');
HI_21_99.forEach((w, i) => add(21 + i, w, w.replace(/़/g, '')));
const HI_21_99_LATIN = 'ikkees baaees teyees chaubees pachchees chhabbees sattaaees atthaaees untees tees ikattees battees taintees chauntees paintees chhattees saintees adtees untaalees chaalees iktaalees bayaalees taintaalees chavaalees paintaalees chhiyaalees saintaalees adtaalees unchaas pachaas ikyaavan baavan tirpan chauvan pachpan chhappan sattaavan atthaavan unsath saath iksath baasath tirsath chausath painsath chhiyaasath sadsath adsath unhattar sattar ikahattar bahattar tihattar chauhattar pachhattar chhihattar satattar athattar unaasee assee ikyaasee bayaasee tiraasee chauraasee pachaasee chhiyaasee sattaasee athaasee navaasee nabbe ikyaanave baanave tiraanave chauraanave pachaanave chhiyaanave sattaanave atthaanave ninyaanave'.split(' ');
const vkey = (s: string) => s.replace(/aa/g, 'a').replace(/ee/g, 'i').replace(/oo/g, 'u').replace(/(.)\1+/g, '$1');
const LATIN_KEY: Record<string, number> = {};
HI_21_99_LATIN.forEach((w, i) => (LATIN_KEY[vkey(w)] = 21 + i));
'ek do teen char paanch chhah saat aath nau das gyaarah baarah terah chaudah pandrah solah satrah athaarah unnees bees'.split(' ').forEach((w, i) => (LATIN_KEY[vkey(w)] ??= i + 1));
const skel = (s: string) => s.replace(/[aeiou]/g, '').replace(/h/g, '').replace(/(.)\1+/g, '$1');
const LATIN_SKEL: Record<string, number | undefined> = {};
for (const [k, v] of Object.entries(LATIN_KEY)) {
  if (k.length < 5) continue;
  const sk = skel(k);
  if (sk.length < 3) continue;
  LATIN_SKEL[sk] = sk in LATIN_SKEL && LATIN_SKEL[sk] !== v ? undefined : v; // ambiguous skeletons are dropped
}
add(99, 'नव्याण्णव', 'नव्व्याण्णव');
add(25, 'पंचवीस');
add(2.5, 'ढाई', 'धाई', 'अडीच', 'dhai', 'adhai'); // धाई: ASR spelling

// Bengali
add(1, 'এক');
add(2, 'দুই', 'দু');
add(3, 'তিন');
add(4, 'চার');
add(5, 'পাঁচ', 'পাচ'); // পাচ: common spelling without chandrabindu
add(0, 'শূন্য', 'শুন্য', 'শুন্ন', 'সুন্ন'); // Bengali zero (was missing)
add(6, 'ছয়', 'ছয়', 'ছ');
add(7, 'সাত');
add(8, 'আট');
add(9, 'নয়', 'নয়'); // not a lone 'ন': a fragment (Whisper splits শুন্ন into 'শুন ন', জন্য into 'জন ন')
add(10, 'দশ');
add(11, 'এগারো');
add(12, 'বারো');
add(13, 'তেরো');
add(14, 'চোদ্দ', 'চৌদ্দ');
add(15, 'পনেরো');
add(16, 'ষোলো');
add(17, 'সতেরো');
add(18, 'আঠারো');
add(19, 'উনিশ');
add(20, 'কুড়ি', 'কুড়ি', 'বিশ');
add(21, 'একুশ');
add(22, 'বাইশ');
add(23, 'তেইশ');
add(24, 'চব্বিশ');
add(25, 'পঁচিশ');
add(26, 'ছাব্বিশ');
add(27, 'সাতাশ');
add(28, 'আঠাশ');
add(29, 'উনত্রিশ');
add(30, 'তিরিশ', 'ত্রিশ');
add(35, 'পঁয়ত্রিশ', 'পঁয়ত্রিশ');
add(40, 'চল্লিশ');
add(45, 'পঁয়তাল্লিশ', 'পঁয়তাল্লিশ');
add(47, 'সাতচল্লিশ');
add(50, 'পঞ্চাশ');
add(60, 'ষাট');
add(70, 'সত্তর', 'সত্তোর');
add(75, 'পঁচাত্তর');
add(80, 'আশি');
add(90, 'নব্বই');
add(99, 'নিরানব্বই');
add(1.5, 'দেড়', 'দেড়');
add(2.5, 'আড়াই', 'আড়াই', 'আরাই'); // আরাই: ASR
add(900, 'নশো', 'ন’শো', 'নসো');

// Telugu
add(1, 'ఒకటి', 'ఒక', 'ఒంటి'); // ఒంటి: 'one' as in ఒంటి గంట
add(2, 'రెండు', 'రిండు');
add(3, 'మూడు');
add(4, 'నాలుగు');
add(5, 'ఐదు', 'అయిదు', 'అయదు', 'అయ్దు', 'ఆయదు', 'ఆయిదు'); // spellings Whisper uses
add(6, 'ఆరు');
add(7, 'ఏడు');
add(8, 'ఎనిమిది');
add(9, 'తొమ్మిది', 'తుమేది');
add(10, 'పది');
add(11, 'పదకొండు');
add(12, 'పన్నెండు', 'పన్న్యండు');
add(13, 'పదమూడు');
add(14, 'పద్నాలుగు');
add(15, 'పదిహేను');
add(16, 'పదహారు');
add(17, 'పదిహేడు');
add(18, 'పద్దెనిమిది');
add(19, 'పందొమ్మిది');
add(20, 'ఇరవై', 'ఇరావాయ', 'ఇరావాయు');
add(30, 'ముప్పై', 'ముప్పే');
add(40, 'నలభై', 'నలభాయ్');
add(50, 'యాభై');
add(60, 'అరవై');
add(70, 'డెబ్బై');
add(80, 'ఎనభై');
add(90, 'తొంభై');
add(1.5, 'ఒకటిన్నర');

// Kannada
add(1, 'ಒಂದು', 'ವಂದು'); // Kannada as Whisper writes it (ವಂದು, ಇರಡು, ಆಯದು, ಇಳು, …)
add(2, 'ಎರಡು', 'ಇರಡು');
add(3, 'ಮೂರು');
add(4, 'ನಾಲ್ಕು');
add(5, 'ಐದು', 'ಅಯಿದು'); // not ಆಯದು / ಆಯಿದು: also how Whisper writes ಆಯಿತು ("happened"); see READOUT_ONLY // not ಆಯಿದು: that is also ಆಯಿತು ("happened") as ASR writes it
add(6, 'ಆರು');
add(7, 'ಏಳು', 'ಇಳು');
add(8, 'ಎಂಟು');
add(9, 'ಒಂಬತ್ತು');
add(10, 'ಹತ್ತು');
add(11, 'ಹನ್ನೊಂದು');
add(12, 'ಹನ್ನೆರಡು', 'ಹನ್ನೆಡು');
add(13, 'ಹದಿಮೂರು');
add(14, 'ಹದಿನಾಲ್ಕು');
add(15, 'ಹದಿನೈದು', 'ಹದಿನೆಯಿದು');
add(16, 'ಹದಿನಾರು');
add(17, 'ಹದಿನೇಳು');
add(18, 'ಹದಿನೆಂಟು');
add(19, 'ಹತ್ತೊಂಬತ್ತು');
add(20, 'ಇಪ್ಪತ್ತು', 'ಇಪಟ್ಟು');
add(30, 'ಮೂವತ್ತು');
add(40, 'ನಲವತ್ತು');
add(50, 'ಐವತ್ತು');
add(60, 'ಅರವತ್ತು');
add(70, 'ಎಪ್ಪತ್ತು', 'ಯಪತ್ತು', 'ಎಪತ್ತು');
add(80, 'ಎಂಬತ್ತು');
add(90, 'ತೊಂಬತ್ತು');
add(200, 'ಇನ್ನೂರು');
add(300, 'ಮುನ್ನೂರು');
add(400, 'ನಾನೂರು');
add(500, 'ಐನೂರು', 'ಆಯನೂರು');
add(0.5, 'ಅರೆ', 'ಒರೆ'); // "ವಂದು ಅರೆ ಲಕ್ಷ" = 1.5 lakh, "ಎರಡು ಒರೆ ಸಾವಿರ" = 2,500
add(600, 'ಆರುನೂರು');
add(700, 'ಏಳುನೂರು');
add(800, 'ಎಂಟುನೂರು');
add(900, 'ಒಂಬೈನೂರು', 'ಒಂಬತ್ತುನೂರು', 'ಒಂಬೆಯಿನೂರ');
add(0.5, 'ಅರ್ಧ');

// Tamil (standalone forms; compounds are handled by splitTamil)
add(1, 'ஒன்று', 'ஒரு', 'ஒண்ணு');
add(2, 'இரண்டு', 'ரெண்டு');
add(3, 'மூன்று', 'மூணு', 'மோன்று');
add(4, 'நான்கு', 'நாலு');
add(5, 'ஐந்து', 'அஞ்சு');
add(6, 'ஆறு');
add(7, 'ஏழு');
add(8, 'எட்டு');
add(9, 'ஒன்பது');
add(10, 'பத்து');
add(12, 'பன்னிரண்டு');
add(15, 'பதினைந்து');
add(20, 'இருபது');
add(30, 'முப்பது');
add(40, 'நாற்பது');
add(50, 'ஐம்பது');
add(60, 'அறுபது');
add(70, 'எழுபது');
add(80, 'எண்பது');
add(90, 'தொண்ணூறு');
add(200, 'இருநூறு');
add(300, 'முந்நூறு', 'முன்னூறு');
add(400, 'நானூறு');
add(500, 'ஐநூறு');
add(600, 'அறுநூறு');
add(700, 'எழுநூறு');
add(800, 'எண்ணூறு');
add(900, 'தொள்ளாயிரம்');
add(1.5, 'ஒன்றரை', 'ஒந்தரை');
add(2.5, 'இரண்டரை');
add(0.5, 'அரை');

const MULT: Record<string, number> = {};
const mul = (v: number, ...ws: string[]) => ws.forEach((w) => (MULT[w.normalize('NFC')] = v));
mul(100, 'सौ', 'शे', 'শো', 'শ', 'వంద', 'వందల', 'వందలు', 'వందలా', 'నూట', 'నూరు', 'ನೂರು', 'நூறு', 'हंड्रेड', 'hundred', 'sau');
mul(1000, 'हज़ार', 'हजार', 'हज़ारों', 'हजारो', 'হাজার', 'হজার', 'হাজাত', 'వేలు', 'వేల', 'వేలా', 'వెయ్యి', 'ಸಾವರದ', 'ಸಾವರ', 'ಸಾವರಿದ', 'ಸಾವಿರ', 'ಸಾವಿರದ', 'தாயிரம்', 'தாயரம்', 'ஆயிரம்', 'ஆயிரத்து', 'थाउज़ेंड', 'थाउजेंड', 'thousand', 'hazaar', 'hazar', 'k');
mul(100000, 'लाख', 'লাখ', 'লক্ষ', 'లక్ష', 'లక్షల', 'లక్షలు', 'ಲಕ್ಷ', 'லட்சம்', 'லட்சத்து', 'lakh', 'lac', 'lakhs');
mul(10000000, 'करोड़', 'करोड', 'कोटी', 'কোটি', 'కోటి', 'ಕೋಟಿ', 'கோடி', 'crore', 'crores');

const HALF_PREFIX = ['साढ़े', 'साढे', 'साडे', 'साधे', 'সাড়ে', 'সারে', 'saadhe', 'sadhe', 'saade', 'sade', 'saare', 'sare', 'saadey'].map((w) => w.normalize('NFC'));

// Half prefixes accepted only glued onto a number: Whisper writes साडेतीन as सालेतीन, but a separate
// "साले" is a common Hindi insult, never "and a half".
const GLUED_HALF = ['साले'].map((w) => w.normalize('NFC'));

// ---------- Tamil / Kannada / Telugu / Marathi / Bengali compounds ----------
const TA_STEM: [string, number][] = [
  ['பன்னிரண்ட', 12], ['பதினைந்த', 15], ['பதனேந்த', 15], ['பதினொன்ற', 11], ['பதினாற', 16], ['பதினேழ', 17], ['பதினெட்ட', 18], ['பத்தொன்பத', 19],
  ['இருபத்', 20], ['இருபத', 20], ['முப்பத்', 30], ['முப்பத', 30], ['நாற்பத்', 40], ['நாற்பத', 40], ['ஐம்பத்', 50], ['ஐம்பத', 50],
  ['அறுபத்', 60], ['அறுபத', 60], ['எழுபத்', 70], ['எழுபத', 70], ['எண்பத்', 80], ['எண்பத', 80], ['தொண்ணூத்', 90], ['தொண்ணூற்', 90],
  ['இரண்ட', 2], ['ரெண்ட', 2], ['மூவ', 3], ['நால', 4], ['ஐய', 5], ['அய', 5], ['அஞ்ச', 5], ['ஆற', 6], ['ஏழ', 7], ['எட்ட', 8], ['ஒன்பத', 9], ['பத்த', 10], ['ஒர', 1],
  ['ஐநூற்', 500], ['அறுநூற்', 600], ['இருநூற்', 200], ['எழுநூற்', 700], ['எண்ணூற்', 800], ['நானூற்', 400], ['முந்நூற்', 300], ['தொள்ளாயிரத்', 900],
];
// sandhi: a tens stem ending in "த்" glues to a vowel-initial unit: த்+ஏழு = த்தேழு.
const TA_UNIT_AFTER_T: [string, number][] = [
  ['தொன்பது', 9], ['தொன்று', 1], ['திரண்டு', 2], ['தேழு', 7], ['தெட்டு', 8], ['தைந்து', 5], ['தாறு', 6], ['தொன்ப', 9], ['தேழ', 7], ['தெட்ட', 8], ['தைந்த', 5], ['தாற', 6],
  ['மூன்று', 3], ['நான்கு', 4], ['நாலு', 4],
];

function splitTamil(w: string): Part[] | undefined {
  if (WORDS[w] !== undefined) return [{ v: WORDS[w] }];
  // "...ரை" = and a half (ஒன்றரை, இரண்டரை, மூன்றரை)
  if (w.endsWith('ரை') && w.length > 3) {
    const base = splitTamil(w.slice(0, -2) + 'ு') ?? splitTamil(w.slice(0, -2));
    if (base?.length === 1 && 'v' in base[0]) return [{ v: base[0].v + 0.5 }];
  }
  let rest = w;
  const parts: Part[] = [];
  // thousand / lakh / hundred tails
  const tails: [RegExp, number][] = [
    [/ாயிர(ம்|த்து)$/, 1000],
    [/ஆயிர(ம்|த்து)$/, 1000],
    [/நூற(ு|்று)$/, 100],
  ];
  let tail: number | undefined;
  for (const [re, v] of tails) {
    if (re.test(rest) && !/^தொள்ளாயிர/.test(rest)) {
      rest = rest.replace(re, '');
      tail = v;
      break;
    }
  }
  if (/^தொள்ளாயிரத்?து?$/.test(w) || w === 'தொள்ளாயிரம்') return [{ v: 900 }];
  if (tail === 100) {
    const h = WORDS[rest + 'நூறு'];
    if (h !== undefined) return [{ v: h }];
  }
  // stems (greedy, longest first)
  let guard = 0;
  while (rest && guard++ < 4) {
    const hit = TA_STEM.filter(([s]) => rest.startsWith(s)).sort((a, b) => b[0].length - a[0].length)[0];
    if (hit) {
      parts.push({ v: hit[1] });
      rest = rest.slice(hit[0].length);
      continue;
    }
    const u = TA_UNIT_AFTER_T.find(([s]) => rest.startsWith(s) || rest.startsWith('த' + s.slice(1)));
    if (u && parts.length) {
      parts.push({ v: u[1] });
      rest = rest.slice(u[0].length);
      continue;
    }
    if (WORDS[rest] !== undefined) {
      parts.push({ v: WORDS[rest] });
      rest = '';
      continue;
    }
    break;
  }
  if (rest && !/^[ுு்]?$/.test(rest)) return undefined;
  if (!parts.length && tail) parts.push({ v: 1 });
  if (!parts.length) return undefined;
  if (tail === 1000) parts.push({ mul: 1000 });
  if (tail === 100) parts.push({ mul: 100 });
  return parts;
}

const KN_TENS: [string, number][] = [
  ['ಇಪ್ಪತ್ತ', 20], ['ಮೂವತ್ತ', 30], ['ನಲವತ್ತ', 40], ['ಐವತ್ತ', 50], ['ಆಯವತ್ತ', 50], ['ಅರವತ್ತ', 60], ['ಎಪ್ಪತ್ತ', 70], ['ಎಂಬತ್ತ', 80], ['ತೊಂಬತ್ತ', 90],
];
const KN_UNIT_SIGN: [string, number][] = [
  ['ೊಂದು', 1], ['ೆರಡು', 2], ['ಮೂರು', 3], ['ನಾಲ್ಕು', 4], ['ೈದು', 5], ['ಯಿದು', 5], ['ೆಯದು', 5], ['ಾರು', 6], ['ೇಳು', 7], ['ೆಂಟು', 8], ['ೊಂಬತ್ತು', 9],
];

function splitKannada(w: string): Part[] | undefined {
  if (WORDS[w] !== undefined) return [{ v: WORDS[w] }];
  if (WORDS[w + 'ು'] !== undefined) return [{ v: WORDS[w + 'ು'] }]; // connective: ಒಂಬೈನೂರ -> ಒಂಬೈನೂರು
  if (w.endsWith('ೂವರೆ')) {
    const base = WORDS[w.slice(0, -'ೂವರೆ'.length) + 'ು'];
    if (base !== undefined) return [{ v: base + 0.5 }];
  }
  for (const suf of ['ಸಾವಿರದ', 'ಸಾವಿರ']) {
    if (!w.endsWith(suf) || w.length <= suf.length) continue;
    const pre = splitKannada(w.slice(0, -suf.length)); // "ಎಳುಸಾವಿರದ" = 7 thousand
    if (pre) return [...pre, { mul: 1000 }];
  }
  for (const [stem, tv] of KN_TENS) {
    if (w.startsWith(stem)) {
      const r = w.slice(stem.length);
      const u = KN_UNIT_SIGN.find(([s]) => r === s);
      if (u) return [{ v: tv }, { v: u[1] }];
    }
  }
  return undefined;
}

function splitTelugu(w: string): Part[] | undefined {
  if (WORDS[w] !== undefined) return [{ v: WORDS[w] }];
  // "రిండునరవేల": a number glued onto thousand / lakh
  for (const [suf, m] of [['వేలు', 1000], ['వేలా', 1000], ['వేల', 1000], ['లక్షల', 100000], ['లక్ష', 100000]] as [string, number][]) {
    if (w.endsWith(suf) && w.length > suf.length) {
      const pre = splitTelugu(w.slice(0, -suf.length));
      if (pre?.length === 1 && 'v' in pre[0]) return [pre[0], { mul: m }];
    }
  }
  for (const half of ['న్నర', 'నర']) {
    if (!w.endsWith(half) || w.length <= half.length) continue;
    const stem = w.slice(0, -half.length);
    const base = WORDS[stem + 'ు'] ?? WORDS[stem + 'ి'] ?? WORDS[stem];
    if (base !== undefined) return [{ v: base + 0.5 }];
  }
  return undefined;
}

function splitDevanagari(w: string): Part[] | undefined {
  if (WORDS[w] !== undefined) return [{ v: WORDS[w] }];
  // Marathi "साडेतीन" (3.5), "पाचशे" (500)
  for (const h of [...HALF_PREFIX, ...GLUED_HALF]) if (w.startsWith(h) && WORDS[w.slice(h.length)] !== undefined) return [{ v: WORDS[w.slice(h.length)] + 0.5 }];
  if (w.endsWith('शे') && WORDS[w.slice(0, -2)] !== undefined) return [{ v: WORDS[w.slice(0, -2)] * 100 }];
  return undefined;
}

function splitBengali(w: string): Part[] | undefined {
  if (WORDS[w] !== undefined) return [{ v: WORDS[w] }];
  // "পাঁচহাজার": number glued onto thousand / lakh
  for (const [suf, m] of [['হাজার', 1000], ['লাখ', 100000]] as [string, number][]) {
    if (w.endsWith(suf) && w.length > suf.length) {
      const pre = WORDS[w.slice(0, -suf.length)];
      if (pre !== undefined) return [{ v: pre }, { mul: m }];
    }
  }
  for (const suf of ['শো', 'শ']) {
    if (w.endsWith(suf) && w.length > suf.length) {
      const pre = WORDS[w.slice(0, -suf.length)];
      if (pre !== undefined) return [{ v: pre * 100 }];
    }
  }
  return undefined;
}

// ---------- tokens ----------
const DIGIT_SETS = ['०१२३४५६७८९', '০১২৩৪৫৬৭৮৯', '௦௧௨௩௪௫௬௭௮௯', '౦౧౨౩౪౫౬౭౮౯', '೦೧೨೩೪೫೬೭೮೯'];
export function foldDigits(s: string): string {
  let out = '';
  for (const ch of s) {
    let d = -1;
    for (const set of DIGIT_SETS) {
      const i = set.indexOf(ch);
      if (i >= 0) d = i;
    }
    out += d >= 0 ? String(d) : ch;
  }
  return out;
}

const SCRIPT = (w: string) =>
  /[஀-௿]/.test(w) ? 'ta' : /[ಀ-೿]/.test(w) ? 'kn' : /[ఀ-౿]/.test(w) ? 'te' : /[ঀ-৿]/.test(w) ? 'bn' : /[ऀ-ॿ]/.test(w) ? 'dev' : 'lat';

// ---------- sound-alike repair ----------
// Whisper often writes an Indian-language number word one letter off: ஆராயிரம் for ஆறாயிரம்,
// সাডে for সাড়ে, ನಲ್ವತ್ತೇಳು for ನಲವತ್ತೇಳು. If a native word is not a number, try every single
// edit from a small table of letters that sound alike (or differ only in vowel length), plus adding or
// dropping a virama / nukta. Accept only when every variant that parses agrees on one value.
const CONFUSABLE = [
  'ரற', 'லளழ', 'நணன', 'ிீ', 'ுூ', 'ெே', 'ொோ', 'எஏ', 'ஒஓ', // Tamil
  'তট', 'দড', 'থঠ', 'ধঢ', 'নণ', 'শষস', 'িী', 'ুূ', 'জয', 'রড', 'ঁং', // Bengali (ঁ/ং: chandrabindu vs anusvara)
  'తట', 'దడ', 'నణ', 'లళ', 'ిీ', 'ుూొో', 'ెే', 'ఎఏ', 'ఒఓ', // Telugu
  'ತಟ', 'ದಡ', 'ನಣ', 'ಲಳ', 'ಿೀ', 'ುೂೊೋ', 'ೆೇ', 'ಎಏ', 'ಒಓ', // Kannada
  'िी', 'ुू', 'नण', 'शषस', 'ेै', 'ोौ', 'ँं', // Devanagari
].map((g) => [...g.normalize('NFC')]);
const CONF_OF: Record<string, string[]> = {};
for (const g of CONFUSABLE) for (const c of g) CONF_OF[c] = [...(CONF_OF[c] ?? []), ...g.filter((x) => x !== c)];
const CONSONANT = /[क-हক-হக-ஹక-హಕ-ಹ]/;
const VIRAMA_NUKTA = /[़়्্்్್]/;
const NUKTA_BASE = /[डढডঢয]/; // ड ढ ড ঢ য take a nukta
const block = (c: string) => c.codePointAt(0)! & ~0x7f;

/** Every single sound-alike edit of a word (exported for the mutation fuzzer). */
export function variants(w: string): Set<string> {
  const ch = [...w];
  const out = new Set<string>();
  const at = (i: number, ins: string[], skip = 1) => out.add([...ch.slice(0, i), ...ins, ...ch.slice(i + skip)].join(''));
  for (let i = 0; i < ch.length; i++) {
    for (const alt of CONF_OF[ch[i]] ?? []) at(i, [alt]);
    if (VIRAMA_NUKTA.test(ch[i])) at(i, []);
    if (CONSONANT.test(ch[i]) && (!ch[i + 1] || CONSONANT.test(ch[i + 1]))) at(i, [ch[i], String.fromCodePoint(block(ch[i]) + 0x4d)]); // incl. a dropped final virama: ஆயிரம -> ஆயிரம்
    if (NUKTA_BASE.test(ch[i]) && ch[i + 1] !== '़' && ch[i + 1] !== '়') at(i, [ch[i], String.fromCodePoint(block(ch[i]) + 0x3c)]);
  }
  out.delete(w);
  return out;
}

const repairCache = new Map<string, Part[] | null>();
let repairOn = true;
/** Turn sound-alike repair off / on (for measuring it; on by default). */
export function setRepair(on: boolean) {
  repairOn = on;
}
function soundAlike(w: string, minLen: number): Part[] | undefined {
  if (!repairOn || SCRIPT(w) === 'lat' || [...w].length < minLen) return undefined;
  const hit = repairCache.get(w);
  if (hit !== undefined) return hit ?? undefined;
  let found: Part[] | null = null;
  let value: number | undefined;
  for (const v of variants(w)) {
    const p = exactParts(v);
    if (!p) continue;
    const c = combine(p);
    if (value !== undefined && c !== value) {
      found = null; // two readings: ambiguous, leave it alone
      break;
    }
    value = c;
    found = p;
  }
  if (repairCache.size > 20000) repairCache.clear();
  repairCache.set(w, found);
  return found ?? undefined;
}

/**
 * A short word (ಲಕಷ = ಲಕ್ಷ without its virama) read as a multiplier. Only used right after a number,
 * where "five ___" can only be a magnitude: short words are otherwise too easy to confuse (వెల "price" ~ వేల).
 */
function shortMultiplier(raw: string): Part[] | undefined {
  if (!repairOn) return undefined;
  const w = raw.normalize('NFC').toLowerCase();
  if (SCRIPT(w) === 'lat') return undefined;
  const muls = new Set([...variants(w)].map((v) => MULT[v]).filter((m) => m !== undefined && m >= 1000));
  return muls.size === 1 ? [{ mul: [...muls][0] }] : undefined;
}

/** Words that are digits only inside a digit read-out (alone they are ordinary words: ಆಯದು = ಆಯಿತು "happened"). */
const READOUT_ONLY: Record<string, number> = Object.fromEntries(Object.entries({ 'ಆಯದು': 5, 'ಆಯಿದು': 5 }).map(([w, v]) => [w.normalize('NFC'), v]));

/**
 * One digit (0-9) of a number read out word by word ("ನಾಲ್ಕು ಸೊನ್ನೆ ಮೂರು…", "चार पाच सहा साथ…").
 * first: the first word of the run must be a digit word or a one-letter slip of one; inside the run, looser
 * sound matches (साथ = सात) and read-out-only words are accepted too. "ref नो" never starts a run.
 */
export function readoutDigit(t: string | undefined, first = false): number | undefined {
  if (!t || !/[^\x00-\x7f]/.test(t)) return undefined;
  const one = (p: Part[] | undefined) => (p?.length === 1 && 'v' in p[0] && Number.isInteger(p[0].v) && p[0].v <= 9 ? p[0].v : undefined);
  if (first) return ['नो', 'नं', 'नं.'].includes(t) ? undefined : one(wordParts(t, 2));
  const w = t.normalize('NFC');
  return READOUT_ONLY[w] ?? one(wordParts(w, 2) ?? foldParts(w, (v) => Number.isInteger(v) && v <= 9));
}

/** Number words keyed by their sound-alike fold (built lazily: fold is defined further down). */
let FOLD_NUM: Map<string, number[]> | undefined;
/**
 * A word whose sound-alike fold equals a number word's (साथ ~ सात). Only for strong contexts: साथ also means
 * "with", and folds like both सात (7) and साठ (60). `allowed` says which values the context permits (a digit
 * read-out: 0-9; before "o'clock": 1-12); the word is read only if exactly one allowed value matches.
 */
export function foldParts(raw: string, allowed: (v: number) => boolean = () => true): Part[] | undefined {
  if (!FOLD_NUM) {
    FOLD_NUM = new Map();
    for (const [w, v] of Object.entries(WORDS)) {
      if (SCRIPT(w) === 'lat') continue;
      const k = fold(w);
      const vs = FOLD_NUM.get(k) ?? [];
      if (!vs.includes(v)) vs.push(v);
      FOLD_NUM.set(k, vs);
    }
  }
  const vs = (FOLD_NUM.get(fold(raw)) ?? []).filter(allowed);
  return vs.length === 1 ? [{ v: vs[0] }] : undefined;
}

/**
 * Number parts of one word, or undefined if it is not a number word.
 * minRepair: shortest native word (in code points) that may be sound-alike repaired. Short words are
 * too easy to confuse with ordinary words, so only lower it where context already says "number"
 * (a stem glued to "o'clock", like দস-টায়).
 */
export function wordParts(raw: string, minRepair = 4): Part[] | undefined {
  const w = raw.normalize('NFC').toLowerCase();
  return exactParts(w) ?? soundAlike(w, minRepair);
}

function exactParts(w: string): Part[] | undefined {
  if (MULT[w] !== undefined) return [{ mul: MULT[w] }];
  if (HALF_PREFIX.includes(w)) return [{ half: true }];
  const digits = foldDigits(w).replace(/^(?:₹|rs\.?|रु\.?|ரூ\.?|రూ\.?|ರೂ\.?)/, '').replace(/,(?=\d{2,3}\b)/g, '');
  if (/^\d+(\.\d+)?$/.test(digits)) return [{ v: Number(digits) }];
  const kMatch = digits.match(/^(\d+(?:\.\d+)?)k$/);
  if (kMatch) return [{ v: Number(kMatch[1]) }, { mul: 1000 }];
  switch (SCRIPT(w)) {
    case 'ta':
      return splitTamil(w);
    case 'kn':
      return splitKannada(w);
    case 'te':
      return splitTelugu(w);
    case 'bn':
      return splitBengali(w);
    case 'dev':
      return splitDevanagari(w);
    default:
      if (WORDS[w] !== undefined) return [{ v: WORDS[w] }];
      if (LATIN_KEY[vkey(w)] !== undefined) return [{ v: LATIN_KEY[vkey(w)] }];
      // ASR spells Hindi numbers inconsistently ("ninyanve" / "ninyaanave"): match on consonants
      return w.length >= 5 && skel(w).length >= 3 && LATIN_SKEL[skel(w)] !== undefined ? [{ v: LATIN_SKEL[skel(w)]! }] : undefined;
  }
}

/** Combine parts: "দুই লাখ পঞ্চাশ হাজার" -> 250000, "சாடே तीन हज़ार" -> 3500. */
export function combine(parts: Part[]): number | undefined {
  let total = 0;
  let cur = 0;
  let half = false;
  let any = false;
  for (const p of parts) {
    if ('half' in p) {
      half = true;
      continue;
    }
    if ('v' in p) {
      cur += p.v + (half && p.v < 100 ? 0.5 : 0); // "साढ़े 3,500": the half is already in the digits
      half = false;
      any = true;
      continue;
    }
    any = true;
    if (p.mul === 100) cur = (cur || 1) * 100;
    else {
      total += (cur || 1) * p.mul;
      cur = 0;
    }
  }
  return any ? Math.round((total + cur) * 100) / 100 : undefined;
}

// ---------- amounts in sentences ----------
const CURRENCY = ['দাকা', 'रुपये', 'रुपए', 'रुपया', 'रुपयांचे', 'रूपये', 'rupees', 'rupee', 'rupaye', 'rupaiya', 'rs', 'inr', 'টাকা', 'টাকার', 'ரூபாய்', 'ரூபா', 'ருபாய்', 'ருபீஸ்', 'ரூபீஸ்', 'రూపాయలు', 'రూపాయల', 'రూపాయి', 'ರೂಪಾಯಿ', 'ರೂಪಾಯ್', 'ರೂ', 'taka', 'paise', 'पैसे'].map((w) => w.normalize('NFC'));
// Currency words as ASR spells them: ருபாய், ரூபாயி, তাকা, రోపాయలు. Compared after folding
// sound-alike letters and vowel length (same table as above), by prefix.
// Folding also merges aspirated / unaspirated letters (আধ ~ আদ, ঘণ্টা ~ গন্টা); those are left out of the
// number repair above, where they would only add candidates. Tamil ி/ெ (i/e) too: இன்விஸ்ட் ~ இன்வெஸ்ட்.
// Union-find keeps the classes transitive.
const FOLD_ONLY = ['ிெ', 'ಿೆ', 'ిె', 'ಇಈ', 'ఇఈ', 'இஈ', 'इई', 'ইঈ', 'ಉಊ', 'ఉఊ', 'உஊ', 'उऊ', 'উঊ', 'তথটঠ', 'দধডঢ', 'কখ', 'গঘ', 'চছ', 'জঝ', 'বভ', 'পফ', 'తథటఠ', 'దధడఢ', 'కఖ', 'గఘ', 'చఛ', 'జఝ', 'బభ', 'పఫ', 'శషస', 'ತಥಟಠ', 'ದಧಡಢ', 'ಕಖ', 'ಗಘ', 'ಚಛ', 'ಜಝ', 'ಬಭ', 'ಪಫ', 'ಶಷಸ', 'तथटठ', 'दधडढ', 'कख', 'गघ', 'चछ', 'जझ', 'बभ', 'पफ'];
const ROOT: Record<string, string> = {};
const root = (c: string): string => (ROOT[c] && ROOT[c] !== c ? (ROOT[c] = root(ROOT[c])) : c);
for (const g of [...CONFUSABLE, ...FOLD_ONLY.map((x) => [...x.normalize('NFC')])])
  for (const c of g.slice(1)) {
    const a = root(g[0]);
    const b = root(c);
    if (a !== b) ROOT[b] = a;
  }
/** Sound-alike key: confusable letters, vowel length, aspiration, virama and nukta collapsed. For matching small word lists. */
export const fold = (s: string) => [...s.normalize('NFC').toLowerCase()].map(root).join('').replace(/[़়्্்్್]/g, '');
const CURRENCY_STEMS = ['ரூபா', 'రూపాయ', 'ರೂಪಾಯ', 'টাকা', 'রুপি', 'रुपय', 'रुपए', 'रुपै', 'rupa', 'rupe', 'rupi', 'rupy'].map(fold);
const isCurrency = (t: string | undefined) => !!t && (CURRENCY.includes(t.toLowerCase()) || CURRENCY_STEMS.some((s) => fold(t).startsWith(s)));
// The same stems glued onto the word before ("ಸಾವಿರರೂಪಾಯಿ", "వేలరూపాయలు"), raw and as ASR spells them.
const GLUED_CURRENCY = /(\S{2,}?)(ரூபா|ருபா|ರೂಪಾಯ|ರುಪಾಯ|రూపాయ|రుపాయ|రోపాయ|টাকা|তাকা|रुपय|रुपए|रुपये|रूपय)/g;

const TIME_AFTER = ['मिनट', 'मिनिट', 'मिनिटांपूर्वी', 'घंटे', 'घंटा', 'तास', 'तासांपूर्वी', 'दिन', 'दिवस', 'दिवसांपूर्वी', 'बजे', 'वाजता', 'मिनिटे', 'মিনিট', 'ঘণ্টা', 'দিন', 'টায়', 'টায়', 'நிமிடங்களுக்கு', 'நிமிஷம்', 'நிமிஷத்துக்கு', 'மணிக்கு', 'மணி', 'நாட்களுக்கு', 'నిమిషాల', 'గంటల', 'గంటలకు', 'రోజుల', 'ನಿಮಿಷ', 'ನಿಮಿಷದ', 'ಗಂಟೆ', 'ಗಂಟೆಗೆ', 'ದಿನ', 'ದಿನಗಳ', 'minute', 'minutes', 'min', 'hour', 'hours', 'baje', 'din', 'days', 'pm', 'am', 'ghante'].map((w) => w.normalize('NFC'));
const NEGATE = ['नहीं', 'नही', 'नाही', 'nahi', 'nahin', 'no', 'না', 'இல்ல', 'இல்லை', 'కాదు', 'ಅಲ್ಲ', 'ಇಲ್ಲ'].map((w) => w.normalize('NFC'));

interface Group {
  value: number;
  /** Just "thousand / lakh" after a word we could not read (শোয হাজার = misheard ছয় হাজার): don't guess 1000. */
  unsure: boolean;
  start: number;
  end: number;
  currencyNear: boolean;
  timeAfter: boolean;
  digitsOnly: boolean;
}

export function tokenize(text: string): string[] {
  return foldDigits(text.normalize('NFC'))
    .replace(GLUED_CURRENCY, '$1 $2')
    .replace(/(\d),(\d{2,3})(?!\d)/g, '$1$2')
    .replace(/(\d),(\d{2,3})(?!\d)/g, '$1$2')
    .replace(/(₹|rs\.?|रु\.?|ரூ\.?|రూ\.?|ರೂ\.?)\s*(\d)/gi, '$1 $2')
    .replace(/(\d)(?=[^\d\s.,:])/g, '$1 ')
    .replace(/[-–—](?=\S)/g, ' ')
    .replace(/[,;!?।॥]|\.{2,}|…/g, ' | ')
    .split(/[\s:"“”'‘’()]+/)
    .map((t) => t.replace(/^[.]+|[.]+$/g, '').replace(/^(₹|rs|रु|ரூ|రూ|ರೂ)\.?$/i, 'rs'))
    .filter(Boolean);
}

/** Every token so far is a single-digit word: digits being read out (an ID), keep them together. */
function spokenRun(toks: string[], start: number, i: number): boolean {
  if (i - start < 2) return false;
  return toks.slice(start, i).every((t) => {
    const p = wordParts(t);
    return !!p && p.length === 1 && 'v' in p[0] && Number.isInteger(p[0].v) && p[0].v <= 9;
  });
}

// Words before a real "hundred": "मेरे सौ रुपये" (my hundred rupees)
const POSSESSIVE = ['मेरे', 'मेरा', 'मेरी', 'हमारे', 'आपके', 'उसके', 'उनके', 'माझे', 'माझा', 'আমার', 'আমাদের', 'என்னுடைய', 'எங்க', 'నాకు', 'మా', 'ನನ್ನ', 'ನಮ್ಮ'].map((w) => w.normalize('NFC'));
// Words that mean "one thousand" on their own (Tamil ஆயிரம், Telugu singular వెయ్యి; misheard "X thousand" uses వేల).
const ONE_THOUSAND = ['ஆயிரம்', 'ஆயிரத்து', 'వెయ్యి'].map((w) => fold(w));
// Multipliers only between numbers: "चार सो पचास" = 450, but सो alone is "sleep" / "so".
const CONTEXT_MULT: Record<string, number> = { [('सो').normalize('NFC')]: 100 };
// Number only right before "thousand / lakh": ಆಯಿದು ಸಾವಿರ = 5,000, but "ಕಟ್ ಆಯಿದು" = "got cut" (ಆಯಿತು).
const BEFORE_MULT: Record<string, number> = Object.fromEntries(
  Object.entries({ 'ಆಯಿದು': 5, 'ಆಯದು': 5, 'শোয': 6, 'ছযি': 6, 'देड': 1.5, 'डेड': 1.5 }).map(([w, v]) => [w.normalize('NFC'), v]), // শোয(়) alone = "lie down"
);
// Words that may stand right before a bare "thousand": "a thousand", "around thousand rupees".
const BARE_OK = ['a', 'one', 'about', 'around', 'approx', 'only', 'just', 'karib', 'lagbhag', 'sirf', 'bas', 'करीब', 'लगभग', 'सिर्फ', 'बस', 'and', 'aur', 'और'];

/** All number groups in a sentence, with context flags. */
export function numberGroups(text: string): Group[] {
  const toks = tokenize(text);
  const groups: Group[] = [];
  let i = 0;
  while (i < toks.length) {
    const beforeMul = !!toks[i + 1] && !!wordParts(toks[i + 1])?.every((x) => 'mul' in x && x.mul >= 1000);
    const p = toks[i] === '|' ? undefined : (wordParts(toks[i]) ?? (beforeMul && BEFORE_MULT[toks[i]] !== undefined ? [{ v: BEFORE_MULT[toks[i]] }] : undefined));
    if (!p) {
      i++;
      continue;
    }
    const start = i;
    const parts: Part[] = [...p];
    let digitsOnly = /^\d+$/.test(toks[i]);
    i++;
    while (i < toks.length) {
      if (toks[i] === '|') break;
      // "four thousand nine hundred AND ninety nine", "do sau aur pachaas"
      if (['and', 'aur', 'और', 'আর', 'ani', 'आणि'].includes(toks[i].toLowerCase()) && toks[i + 1] && wordParts(toks[i + 1]) && !/^\d+$/.test(toks[i + 1])) {
        i++;
        continue;
      }
      const last = parts[parts.length - 1];
      const nextIsMul = !!toks[i + 1] && !!wordParts(toks[i + 1])?.every((x) => 'mul' in x && x.mul >= 1000);
      const q = wordParts(toks[i]) ?? (last && 'v' in last ? (shortMultiplier(toks[i]) ?? (CONTEXT_MULT[toks[i]] ? [{ mul: CONTEXT_MULT[toks[i]] }] : undefined)) : undefined) ?? (nextIsMul && BEFORE_MULT[toks[i]] !== undefined ? [{ v: BEFORE_MULT[toks[i]] }] : undefined);
      if (!q) break;
      // a read-out ID (single spaced digits) never runs into number words
      // digits written by the recogniser are a complete number: \"वय 40 दोन दिवस\" is 40 then 2, never 42
      const prevDigit = /^\d+$/.test(toks[i - 1]);
      const isWord = !/^\d+$/.test(toks[i]);
      // ...except a round thousands figure followed by smaller words: "2,000 सहाशे" = 2,600
      const prevN = Number(toks[i - 1]);
      const smallerTail = prevN >= 1000 && prevN % 100 === 0 && (combine(q) ?? Infinity) < Math.min(prevN, 1000);
      if (prevDigit && isWord && !q.every((x) => 'mul' in x) && !smallerTail) break;
      // single spaced digits are an ID being read out (UTR / phone), not an amount
      if (/^\d$/.test(toks[i]) && /^\d$/.test(toks[i - 1])) {
        parts.push(...q);
        i++;
        digitsOnly = true;
        continue;
      }
      if (/^\d+$/.test(toks[i]) && /^\d+$/.test(toks[i - 1])) break;
      // two bare single digits are never one amount ("…3 రెండు, 5 వేల" = an ID's last digit, then 5,000)
      const prev = parts[parts.length - 1];
      if (prev && 'v' in prev && prev.v < 10 && q.length === 1 && 'v' in q[0] && q[0].v < 10 && Number.isInteger(q[0].v) && !spokenRun(toks, start, i)) break; // a half (ಅರೆ) joins
      const nextMul = !!toks[i + 1] && !!wordParts(toks[i + 1])?.every((x) => 'mul' in x && x.mul >= 1000);
      if (nextMul && q.length === 1 && 'v' in q[0] && q[0].v < 10 && spokenRun(toks, start, i)) break;
      parts.push(...q);
      digitsOnly = digitsOnly && /^\d+$/.test(toks[i]);
      i++;
    }
    const spacedDigits = toks.slice(start, i).every((t) => /^\d$/.test(t)) && i - start >= 4;
    // digits read out as words ("नौ आठ सात छह पाँच", "nine eight seven"): an ID or phone, never an amount
    const tokenParts = toks.slice(start, i).map((t) => wordParts(t) ?? []);
    const spokenDigits =
      i - start >= 3 && tokenParts.every((tp) => tp.length === 1 && 'v' in tp[0] && Number.isInteger(tp[0].v) && tp[0].v <= 9);
    const value = spacedDigits || spokenDigits ? NaN : combine(parts);
    if (value === undefined || Number.isNaN(value)) continue;
    const near = (k: number) => k >= 0 && k < toks.length && isCurrency(toks[k]);
    const before = toks[start - 1];
    const bare = parts.every((x) => 'mul' in x) && parts.some((x) => 'mul' in x && x.mul >= 1000);
    // a bare "hundred" too, but only after an unreadable native word ("తుమ్నిది వందలా" = misheard ఎనిమిది వందల);
    // "सौ रुपये" alone or "मेरे सौ रुपये" is a real 100
    const bareHundred = parts.length === 1 && 'mul' in parts[0] && parts[0].mul === 100 && !!before && /[^\x00-\x7f]/.test(before) && [...before].length >= 4 && !wordParts(before) && !POSSESSIVE.includes(before);
    // the number goes on in a word we can't read ("ನಾಲ್ಕು ಸಾವರದ ಒಂಬೆಯಿನೂರ ತೊಂಬತೊ" = 4,99? not 4,900): incomplete, ask
    const trailing = !!toks[i] && toks[i] !== '|' && !isCurrency(toks[i]) && numberLike(toks[i]);
    const unsure = (bare && !!before && before !== '|' && !BARE_OK.includes(before.toLowerCase()) && !isCurrency(before) && !ONE_THOUSAND.includes(fold(toks[start]))) || bareHundred || trailing;
    groups.push({
      unsure,
      value,
      start,
      end: i,
      currencyNear: near(i) || near(i + 1) || near(start - 1) || near(start - 2) || toks[start - 1]?.toLowerCase() === 'rs',
      timeAfter: TIME_AFTER.some((t) => toks[i]?.toLowerCase().startsWith(t) || (!!toks[i] && [...t].length >= 3 && fold(toks[i]).startsWith(fold(t)))) || toks[i]?.endsWith('টায়'),
      digitsOnly,
    });
  }
  return groups;
}

/** Folded native number words per script, for numberLike (built lazily). */
let NUM_FOLDS: Map<string, string[]> | undefined;
/**
 * An unreadable native word that sounds like a number word (ತೊಂಬತೊ ~ ತೊಂಬತ್ತು): >= 0.75 similar on the
 * sound-alike key to some number word of the same script, and 4+ letters. Used only right after a number.
 */
function numberLike(raw: string): boolean {
  const w = raw.normalize('NFC');
  if (SCRIPT(w) === 'lat' || [...w].length < 4 || wordParts(w)) return false;
  if (!NUM_FOLDS) {
    NUM_FOLDS = new Map();
    for (const k of [...Object.keys(WORDS), ...Object.keys(MULT)]) {
      if (SCRIPT(k) === 'lat' || [...k].length < 3) continue;
      const list = NUM_FOLDS.get(SCRIPT(k)) ?? [];
      list.push(fold(k));
      NUM_FOLDS.set(SCRIPT(k), list);
    }
  }
  const f = fold(w);
  const sim = (a: string, b: string) => {
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let x = 1; x <= a.length; x++) {
      const cur = [x];
      for (let y = 1; y <= b.length; y++) cur[y] = Math.min(prev[y] + 1, cur[y - 1] + 1, prev[y - 1] + (a[x - 1] === b[y - 1] ? 0 : 1));
      prev = cur;
    }
    return 1 - prev[b.length] / Math.max(a.length, b.length);
  };
  return (NUM_FOLDS.get(SCRIPT(w)) ?? []).some((k) => sim(f, k) >= 0.75);
}

/**
 * The amount of money in a sentence. Prefers numbers next to a currency word,
 * skips times, phones and read-out IDs, and follows self-corrections
 * ("पाँच... नहीं नहीं, छह हज़ार" -> 6000).
 */
export function findAmount(text: string): number | undefined {
  return findAmountHit(text)?.value;
}

/** Like findAmount, plus whether the number sat next to a currency word (strong evidence). */
export function findAmountHit(text: string): { value: number; currencyNear: boolean } | undefined {
  const all = numberGroups(text);
  const groups = all.filter((g) => !g.unsure && !g.timeAfter && g.value >= 1 && g.value < 1e9 && !(g.digitsOnly && String(g.value).length >= 10));
  // "ఏనిమిది వేల రూపాయలు … ఇరవై నిమిషాల": the amount itself was misheard ("? thousand") and no readable amount sits
  // next to a currency word. Any other number in the sentence is not the money; ask rather than pick it.
  if (all.some((g) => g.unsure) && !groups.some((g) => g.currencyNear)) return undefined;
  if (!groups.length) return undefined;
  const toks = tokenize(text).map((t) => t.toLowerCase());
  const corrected = toks.some((t) => NEGATE.includes(t));
  const money = groups.filter((g) => g.currencyNear);
  const pool = money.length ? money : groups.filter((g) => g.value >= 10);
  if (!pool.length) return undefined;
  const pick = corrected ? pool[pool.length - 1] : pool.reduce((a, b) => (b.value > a.value && b.currencyNear >= a.currencyNear ? b : a));
  return { value: pick.value, currencyNear: pick.currencyNear };
}
