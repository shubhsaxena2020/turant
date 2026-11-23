// The seven languages the kit ships UI strings for. A domain config picks a subset.
export type LangCode = 'hi-IN' | 'en-IN' | 'bn-IN' | 'ta-IN' | 'te-IN' | 'mr-IN' | 'kn-IN';

export interface LangInfo {
  code: LangCode;
  native: string;
  english: string;
}

export const LANGS: LangInfo[] = [
  { code: 'hi-IN', native: 'हिन्दी', english: 'Hindi' },
  { code: 'en-IN', native: 'English', english: 'English / Hinglish' },
  { code: 'bn-IN', native: 'বাংলা', english: 'Bengali' },
  { code: 'ta-IN', native: 'தமிழ்', english: 'Tamil' },
  { code: 'te-IN', native: 'తెలుగు', english: 'Telugu' },
  { code: 'mr-IN', native: 'मराठी', english: 'Marathi' },
  { code: 'kn-IN', native: 'ಕನ್ನಡ', english: 'Kannada' },
];

export function langInfo(code: LangCode): LangInfo {
  return LANGS.find((l) => l.code === code) ?? LANGS[0];
}

/** Text in several languages. Missing languages fall back to English, then to any language present. */
export type Text = Partial<Record<LangCode, string>>;

export function fill(s: string, vars?: Record<string, string | number>): string {
  if (!vars) return s;
  for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
  return s;
}

export function tx(text: Text | string | undefined, lang: LangCode, vars?: Record<string, string | number>): string {
  if (text === undefined) return '';
  if (typeof text === 'string') return fill(text, vars);
  const s = text[lang] ?? text['en-IN'] ?? Object.values(text)[0] ?? '';
  return fill(s, vars);
}

/** True when the text has its own copy for this language (no English fallback). */
export function hasLang(text: Text | string | undefined, lang: LangCode): boolean {
  return typeof text === 'string' || (!!text && text[lang] !== undefined);
}
