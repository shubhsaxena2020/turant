// Wispr-style auto cleanup for Indian speech: drop pure fillers and resolve
// self-corrections ("पाँच... नहीं नहीं, छह हज़ार" -> "छह हज़ार"). Conservative:
// only words that never carry meaning are removed. Pure, no DOM.

const FILLERS = [
  // English / Hinglish
  'um', 'umm', 'ummm', 'uh', 'uhh', 'uhm', 'hmm', 'hmmm', 'er', 'erm', 'basically', 'actually', 'like', 'you know', 'i mean', 'so basically', 'matlab', 'yaani', 'yani', 'arre', 'arey',
  // Hindi
  'उम', 'उम्म', 'उम्म्म', 'अं', 'हम्म', 'मतलब', 'यानी', 'वो क्या है', 'क्या कहते हैं', 'बेसिकली', 'एक्चुअली',
  // Marathi
  'म्हणजे', 'अं', 'उम्म',
  // Bengali
  'উম', 'উম্ম', 'উম্‌ম', 'মানে', 'আসলে', 'ইয়ে',
  // Tamil
  'உம்', 'உம்ம்', 'அதாவது', 'அது வந்து',
  // Telugu
  'అంటే', 'ఉమ్', 'అదీ',
  // Kannada
  'ಅಂದರೆ', 'ಉಮ್', 'ಅದು ಏನಂದ್ರೆ',
].map((w) => w.normalize('NFC'));

const NEG = ['नहीं नहीं', 'नही नही', 'nahi nahi', 'nahin nahin', 'no no', 'not', 'sorry', 'नाही नाही', 'না না', 'இல்ல இல்ல', 'இல்லை இல்லை', 'కాదు కాదు', 'ಅಲ್ಲ ಅಲ್ಲ', 'ಇಲ್ಲ ಇಲ್ಲ'].map((w) => w.normalize('NFC'));

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const B = '(?<![\\p{L}\\p{M}\\p{N}])'; // Unicode-aware word boundaries (Indic marks count as letters)
const E = '(?![\\p{L}\\p{M}\\p{N}])';

const fillerRe = new RegExp(`${B}(?:${FILLERS.sort((a, b) => b.length - a.length).map(esc).join('|')})${E}[,.…]*`, 'giu');

export interface Cleaned {
  text: string;
  removed: string[];
  /** true when a self-correction was resolved */
  corrected: boolean;
}

export function cleanup(input: string): Cleaned {
  let text = input.normalize('NFC');
  const removed: string[] = [];
  let corrected = false;
  // 1. self-correction: "<A> ... nahi nahi, <B>" -> keep B (only when the clause before is short)
  for (const n of NEG) {
    const re = new RegExp(`([^,.!?।]{1,40}?)(?:\\.{2,}|…|,)?\\s*${esc(n)}\\s*[,.…]*\\s*`, 'iu');
    const m = text.match(re);
    if (m && m.index !== undefined && n !== 'not' && n !== 'sorry') {
      removed.push(m[0].trim());
      text = text.slice(0, m.index) + text.slice(m.index + m[0].length);
      corrected = true;
      break;
    }
  }
  // 2. fillers
  text = text.replace(fillerRe, (m) => {
    removed.push(m.replace(/[,.…]+$/, ''));
    return ' ';
  });
  // 3. stutters: "the the", "मेरे मेरे"
  text = text.replace(/(?<![\p{L}\p{M}])([\p{L}\p{M}]{2,})(\s+\1)+(?![\p{L}\p{M}])/giu, (m, w) => {
    removed.push(m.slice(w.length).trim());
    return w;
  });
  // tidy punctuation and spaces
  text = text
    .replace(/\s+([,.!?।])/g, '$1')
    .replace(/([,.!?।])(?:\s*[,.!?।])+/g, '$1')
    .replace(/^[\s,.…]+/, '')
    .replace(/\.{3,}|…/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return { text, removed, corrected };
}

/** Whisper large-v3 writes some Telugu words in Kannada letters ("రೂಪಾಯలు"). The two Unicode blocks are
 * parallel (+0x80), so once any Telugu letter is present, Kannada letters are read as Telugu.
 * Kannada speech never gets Telugu letters, so Kannada text is untouched. */
/** Whisper spells acronyms with hyphens and can orphan a vowel sign: "आई-सी-ाई-सी-ाई" = आईसीआईसीआई (ICICI). */
export function joinSpelled(text: string): string {
  return text.replace(/(?<![ऀ-෿])(?:[ऀ-෿]{1,3}-){2,}[ऀ-෿]{1,3}(?![ऀ-෿])/gu, (m) =>
    m.replace(/(^|-)ा/g, '$1आ').replace(/-/g, ''),
  );
}

export function unifyScript(text: string): string {
  if (!/[ఀ-౿]/.test(text)) return text;
  return text.replace(/[ಀ-೿]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x80));
}

const CLOCK_WORDS = /^(at|around|by|before|after|till|until|since|from|yesterday|today|tonight|morning|evening|night|aaj|kal|subah|shaam|raat|baje|am|pm|a\.m\.?|p\.m\.?|o'clock|hrs?|hours?)$/i;
const ID_WORDS = /^(number|no\.?|num|ref\.?|reference|account|a\/c|utr|id|plus|mobile|phone|upi)$/i;

/**
 * Digits read out one by one, as speech recognisers write them:
 * - "9 double 8 7 6" / "triple 0" / "double 8754321" (common in Indian English) -> "9 88 7 6" / "000" / "88754321".
 * - A clock-looking group inside a read-out ("plus 9 1 07:01 2344", "reference number is 06:01 to 34567",
 *   "45678 08:01 2 345") -> its digits ("701", without Whisper's padded 0), when it sits next to other digits or after an ID word and no
 *   time word is near. "yesterday at 07:00" and "7:30 pm" are left alone.
 */
export function spokenDigits(text: string): string {
  // only the first digit is repeated: "double 8754321" = 88754321; a lone digit stays a lone digit ("4 4"),
  // so a one-by-one read-out keeps its shape; digit words too ("double four" = "four four")
  let t = text.replace(/\b(double|triple)\s+(\d)(\d*)\b/gi, (_, k: string, d: string, rest: string) => {
    const n = k.toLowerCase() === 'double' ? 2 : 3;
    return rest ? d.repeat(n) + rest : Array(n).fill(d).join(' ');
  });
  t = t.replace(/\b(double|triple)\s+(zero|oh|one|two|three|four|five|six|seven|eight|nine)\b/gi, (_, k: string, w: string) =>
    Array(k.toLowerCase() === 'double' ? 2 : 3).fill(w).join(' '),
  );
  const w = t.split(/(\s+)/);
  const clean = (s: string | undefined) => (s ?? '').replace(/[.,;:!?]+$/, '').toLowerCase();
  const word = (k: number, dir: 1 | -1) => {
    for (let j = k + dir; j >= 0 && j < w.length; j += dir) if (w[j].trim()) return w[j];
    return undefined;
  };
  for (let i = 0; i < w.length; i++) {
    const m = /^(\d{1,2}):(\d{2})([.,]?)$/.exec(w[i]);
    if (!m) continue;
    const prev = clean(word(i, -1));
    const next = clean(word(i, 1));
    if (CLOCK_WORDS.test(prev) || CLOCK_WORDS.test(next)) continue;
    const nextAfterTo = next === 'to' ? clean(word(w.indexOf(word(i, 1)!, i + 1), 1)) : '';
    const idCtx = /^\+?\d+$/.test(prev) || ID_WORDS.test(prev) || prev === 'is' || /^\d+$/.test(next) || /^\d+$/.test(nextAfterTo);
    // Whisper pads the hour ("5 0 1" -> "05:01"); in every read-out in the harness the 0 was padding, never spoken
    if (idCtx) w[i] = m[1].replace(/^0(?=\d)/, '') + m[2] + m[3];
  }
  t = w.join('');
  return t;
}
