import type { LangCode } from './lib/extract';
import type { StrKey } from './i18n/strings';

/** Shared app context handed to every screen. */
export interface UI {
  /** Display language: always English. */
  lang: LangCode;
  /** The language the person speaks; only the recogniser uses it. */
  speakLang: LangCode;
  onSpeakLang: () => void;
  t: (key: StrKey, vars?: Record<string, string | number>) => string;
  /** Speak a sentence built for the voice language actually available on the device. Resolves when done. */
  say: (build: (voiceLang: LangCode) => string) => Promise<void>;
  /** Quiet mode: no speech, no earcons; typing / tapping instead of the mic. */
  quiet: boolean;
  setQuiet: (q: boolean) => void;
  /** Can this browser listen at all (and is the user not in quiet mode)? */
  voice: boolean;
  speaking: boolean;
  online: boolean;
}
