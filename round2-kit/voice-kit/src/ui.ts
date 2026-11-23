import type { DomainConfig } from './domain/types';
import type { LangCode, Text } from './lib/lang';
import type { UIKey } from './i18n/ui';

/** Shared app context handed to every screen. */
export interface UI {
  cfg: DomainConfig;
  lang: LangCode;
  /** Kit UI string (config overrides applied, {app} filled). */
  t: (key: UIKey, vars?: Record<string, string | number>) => string;
  /** Resolve config Text in the current language. */
  tx: (text: Text | string | undefined, vars?: Record<string, string | number>) => string;
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
