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
export function unifyScript(text: string): string {
  if (!/[ఀ-౿]/.test(text)) return text;
  return text.replace(/[ಀ-೿]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x80));
}
