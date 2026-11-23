// Indic script -> Latin, for names and places in English documents ("लक्ष्मी" -> "Lakshmi",
// "லட்சுமி" -> "Latchumi"). The Brahmic Unicode blocks (Devanagari, Bengali, Gurmukhi,
// Gujarati, Oriya, Tamil, Telugu, Kannada, Malayalam) share one layout, so one offset
// table covers them all. Readable, not scholarly: it is shown next to the original.

const BLOCKS = [0x0900, 0x0980, 0x0a00, 0x0a80, 0x0b00, 0x0b80, 0x0c00, 0x0c80, 0x0d00];
/** Scripts where a word-final inherent "a" is silent (Hindi "रमेश" -> Ramesh). */
const SCHWA_DROP = new Set([0x0900, 0x0980, 0x0a00, 0x0a80]);

const VOWELS: Record<number, string> = {
  0x05: 'a', 0x06: 'aa', 0x07: 'i', 0x08: 'ee', 0x09: 'u', 0x0a: 'oo', 0x0b: 'ri', 0x0e: 'e', 0x0f: 'e', 0x10: 'ai', 0x12: 'o', 0x13: 'o', 0x14: 'au',
};
const SIGNS: Record<number, string> = {
  0x3e: 'aa', 0x3f: 'i', 0x40: 'ee', 0x41: 'u', 0x42: 'oo', 0x43: 'ri', 0x46: 'e', 0x47: 'e', 0x48: 'ai', 0x4a: 'o', 0x4b: 'o', 0x4c: 'au', 0x57: 'au',
};
const CONS: Record<number, string> = {
  0x15: 'k', 0x16: 'kh', 0x17: 'g', 0x18: 'gh', 0x19: 'n', 0x1a: 'ch', 0x1b: 'chh', 0x1c: 'j', 0x1d: 'jh', 0x1e: 'n',
  0x1f: 't', 0x20: 'th', 0x21: 'd', 0x22: 'dh', 0x23: 'n', 0x24: 't', 0x25: 'th', 0x26: 'd', 0x27: 'dh', 0x28: 'n', 0x29: 'n',
  0x2a: 'p', 0x2b: 'ph', 0x2c: 'b', 0x2d: 'bh', 0x2e: 'm', 0x2f: 'y', 0x30: 'r', 0x31: 'r', 0x32: 'l', 0x33: 'l', 0x34: 'zh', 0x35: 'v',
  0x36: 'sh', 0x37: 'sh', 0x38: 's', 0x39: 'h',
  0x58: 'q', 0x59: 'kh', 0x5a: 'gh', 0x5b: 'z', 0x5c: 'r', 0x5d: 'rh', 0x5e: 'f', 0x5f: 'y',
};
const VIRAMA = 0x4d;
const MARKS: Record<number, string> = { 0x01: 'n', 0x02: 'n', 0x03: 'h', 0x64: '.', 0x65: '.' };

function block(cp: number): number | undefined {
  return BLOCKS.find((b) => cp >= b && cp < b + 0x80);
}

export function hasIndic(s: string): boolean {
  return /[ऀ-ൿ]/.test(s);
}

function word(w: string): string {
  const cps = [...w.normalize('NFC')].map((c) => c.codePointAt(0)!);
  let out = '';
  for (let i = 0; i < cps.length; i++) {
    const cp = cps[i];
    const b = block(cp);
    if (b === undefined) {
      out += String.fromCodePoint(cp);
      continue;
    }
    const off = cp - b;
    if (off === 0x3c) continue; // nukta
    if (CONS[off] !== undefined) {
      out += CONS[off];
      const next = cps[i + 1];
      const nOff = next !== undefined && block(next) === b ? next - b : -1;
      if (nOff === 0x3c) {
        // nukta: ज़ -> z, फ़ -> f
        if (off === 0x1c) out = out.slice(0, -1) + 'z';
        if (off === 0x2b) out = out.slice(0, -2) + 'f';
        i++;
      }
      const after = cps[i + 1];
      const aOff = after !== undefined && block(after) === b ? after - b : -1;
      if (SIGNS[aOff] !== undefined) {
        out += SIGNS[aOff];
        i++;
      } else if (aOff === VIRAMA) {
        i++;
      } else {
        const last = i === cps.length - 1;
        if (!(last && SCHWA_DROP.has(b) && out.length > 2)) out += 'a';
      }
      continue;
    }
    if (VOWELS[off] !== undefined) out += VOWELS[off];
    else if (SIGNS[off] !== undefined) out += SIGNS[off];
    else if (MARKS[off] !== undefined) out += MARKS[off];
    else if (off >= 0x66 && off <= 0x6f) out += String(off - 0x66);
    else if (cp === 0x09ce) out += 't'; // Bengali khanda ta
  }
  return out;
}

/** Transliterate every Indic-script word to Latin; Latin words pass through. */
export function translit(s: string): string {
  return s
    .split(/(\s+)/)
    .map((w) => {
      if (!hasIndic(w)) return w;
      // Word-final long vowels read better short in English: Suneetaa -> Suneeta, Lakshmee -> Lakshmi.
      const t = word(w).replace(/aa$/, 'a').replace(/ee$/, 'i').replace(/oo$/, 'u');
      return t.charAt(0).toUpperCase() + t.slice(1);
    })
    .join('');
}

/** For English documents: "Latchumi (லட்சுமி)"; Latin text is returned as is. */
export function inEnglish(s: string): string {
  return hasIndic(s) ? `${translit(s)} (${s})` : s;
}
