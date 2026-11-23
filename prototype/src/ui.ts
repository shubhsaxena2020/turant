import type { LangCode } from './lib/extract';
import type { StrKey } from './i18n/strings';

export type InputMode = 'voice' | 'type';

/** Shared app context handed to every screen. */
export interface UI {
  lang: LangCode;
  t: (key: StrKey, vars?: Record<string, string | number>) => string;
  mode: InputMode;
  setMode: (m: InputMode) => void;
  /** Speak a sentence built for the voice language actually available on the device. */
  say: (build: (voiceLang: LangCode) => string) => Promise<void>;
  muted: boolean;
  notify: (msg: string) => void;
  online: boolean;
}
