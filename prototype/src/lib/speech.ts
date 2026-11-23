// SpeechService: one small interface for speech-to-text and text-to-speech.
// Today it is backed by the browser Web Speech API; it can be swapped for
// Bhashini or another Indic ASR/TTS without touching the screens.

export type SpeechErrorCode = 'not-allowed' | 'network' | 'no-speech' | 'unsupported' | 'audio-capture' | 'aborted' | 'other';

export interface ListenCallbacks {
  /** Running transcript (final + interim) for word-by-word display. */
  onInterim(text: string): void;
  /** Called once with the whole utterance and average recogniser confidence (0 = unknown). */
  onFinal(text: string, confidence: number): void;
  onActivity?(): void;
  onError(code: SpeechErrorCode): void;
  onEnd(): void;
}

export interface ListenOptions {
  /** Stop after this much silence once speech has started. */
  silenceMs?: number;
  /** Give up if nothing is heard at all for this long. */
  initialSilenceMs?: number;
}

export interface ListenHandle {
  /** Stop and deliver what was heard so far ("Done"). */
  stop(): void;
  /** Voice heard by our own meter: keep the turn open (the speech service may be returning nothing). */
  poke?(): void;
  /** Stop and discard. */
  abort(): void;
}

export interface SpeechService {
  readonly canListen: boolean;
  readonly canSpeak: boolean;
  listen(lang: string, cb: ListenCallbacks, opts?: ListenOptions): ListenHandle;
  speak(text: string, lang: string): Promise<void>;
  cancelSpeech(): void;
  /** true / false once the device voice list is known, undefined while unknown. */
  hasVoice(lang: string): boolean | undefined;
}

// Minimal typings for the vendor-prefixed API.
interface RecResultAlt {
  transcript: string;
  confidence: number;
}
interface RecResult {
  isFinal: boolean;
  0: RecResultAlt;
  length: number;
}
interface RecEvent {
  resultIndex: number;
  results: { length: number; [i: number]: RecResult };
}
interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: RecEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  onsoundstart: (() => void) | null;
}
type RecognitionCtor = new () => Recognition;

function getRecognitionCtor(): RecognitionCtor | undefined {
  if (typeof window === 'undefined') return undefined;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

function mapError(code: string): SpeechErrorCode {
  switch (code) {
    case 'not-allowed':
    case 'service-not-allowed':
      return 'not-allowed';
    case 'network':
      return 'network';
    case 'no-speech':
      return 'no-speech';
    case 'audio-capture':
      return 'audio-capture';
    case 'aborted':
      return 'aborted';
    case 'language-not-supported':
      return 'unsupported';
    default:
      return 'other';
  }
}

export class WebSpeechService implements SpeechService {
  readonly canListen: boolean;
  readonly canSpeak: boolean;
  private voices: SpeechSynthesisVoice[] = [];
  private voicesKnown = false;

  constructor() {
    this.canListen = !!getRecognitionCtor();
    this.canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
    if (this.canSpeak) {
      const load = () => {
        this.voices = window.speechSynthesis.getVoices();
        if (this.voices.length) this.voicesKnown = true;
      };
      load();
      window.speechSynthesis.addEventListener?.('voiceschanged', load);
    }
  }

  listen(lang: string, cb: ListenCallbacks, opts: ListenOptions = {}): ListenHandle {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      setTimeout(() => {
        cb.onError('unsupported');
        cb.onEnd();
      }, 0);
      return { stop() {}, abort() {} };
    }
    const silenceMs = opts.silenceMs ?? 2500;
    const initialMs = opts.initialSilenceMs ?? 8000;
    const rec = new Ctor();
    rec.lang = lang;
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    let finals: { text: string; conf: number }[] = [];
    let interim = '';
    let heardAnything = false;
    let aborted = false;
    let finished = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const arm = (ms: number) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          rec.stop();
        } catch {
          /* already stopped */
        }
      }, ms);
    };

    rec.onresult = (e) => {
      heardAnything = true;
      // Rebuild from all results; Android Chrome repeats growing results, so
      // a final that extends the previous one replaces it.
      const nextFinals: { text: string; conf: number }[] = [];
      interim = '';
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        const text = r[0].transcript.trim();
        if (!text) continue;
        if (r.isFinal) {
          const last = nextFinals[nextFinals.length - 1];
          if (last && text.startsWith(last.text)) nextFinals[nextFinals.length - 1] = { text, conf: r[0].confidence };
          else nextFinals.push({ text, conf: r[0].confidence });
        } else {
          interim += ' ' + text;
        }
      }
      finals = nextFinals;
      cb.onInterim([...finals.map((f) => f.text), interim.trim()].join(' ').trim());
      cb.onActivity?.();
      arm(silenceMs);
    };
    rec.onsoundstart = () => cb.onActivity?.();
    rec.onerror = (e) => {
      const code = mapError(e.error);
      if (code === 'aborted') return;
      if (code === 'no-speech' && heardAnything) return;
      cb.onError(code);
    };
    rec.onend = () => {
      clearTimeout(timer);
      if (finished) return;
      finished = true;
      if (!aborted) {
        const text = [...finals.map((f) => f.text), interim.trim()].join(' ').replace(/\s+/g, ' ').trim();
        const confs = finals.map((f) => f.conf).filter((c) => c > 0);
        // Interim-only text (user tapped Done mid-word) counts as unknown confidence.
        const conf = confs.length ? confs.reduce((a, b) => a + b, 0) / confs.length : 0;
        if (text) cb.onFinal(text, conf);
      }
      cb.onEnd();
    };

    try {
      rec.start();
      arm(initialMs);
    } catch {
      setTimeout(() => {
        cb.onError('other');
        cb.onEnd();
      }, 0);
    }

    return {
      stop: () => {
        try {
          rec.stop();
        } catch {
          /* ignore */
        }
      },
      poke: () => {
        if (!finished) arm(silenceMs);
      },
      abort: () => {
        aborted = true;
        try {
          rec.abort();
        } catch {
          /* ignore */
        }
      },
    };
  }

  private pickVoice(lang: string): SpeechSynthesisVoice | undefined {
    const norm = (l: string) => l.replace('_', '-').toLowerCase();
    const want = norm(lang);
    const prefix = want.slice(0, 2);
    return this.voices.find((v) => norm(v.lang) === want) ?? this.voices.find((v) => norm(v.lang).startsWith(prefix));
  }

  hasVoice(lang: string): boolean | undefined {
    if (!this.canSpeak) return false;
    if (!this.voicesKnown) return undefined;
    return !!this.pickVoice(lang);
  }

  speak(text: string, lang: string): Promise<void> {
    if (!this.canSpeak || !text) return Promise.resolve();
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      const v = this.pickVoice(lang);
      if (v) u.voice = v;
      u.rate = 0.95;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(guard);
        resolve();
      };
      // Some devices never fire onend (or have no voice): never block the flow.
      const guard = setTimeout(finish, Math.min(30000, 2500 + text.length * 90));
      u.onend = finish;
      u.onerror = finish;
      try {
        synth.speak(u);
      } catch {
        finish();
      }
    });
  }

  cancelSpeech(): void {
    if (this.canSpeak) window.speechSynthesis.cancel();
  }
}

/**
 * Plays a known transcript word by word through the same callbacks as real
 * speech. Used by the "Try a sample" demo so the flow works without a mic.
 */
export function simulateListen(text: string, cb: ListenCallbacks, wordMs = 170): ListenHandle {
  const words = text.split(/\s+/).filter(Boolean);
  let i = 0;
  let stopped = false;
  const finish = (deliver: boolean) => {
    if (stopped) return;
    stopped = true;
    clearInterval(timer);
    if (deliver) cb.onFinal(words.join(' '), 0.93);
    cb.onEnd();
  };
  const timer = setInterval(() => {
    i++;
    cb.onInterim(words.slice(0, i).join(' '));
    cb.onActivity?.();
    if (i >= words.length) setTimeout(() => finish(true), 450);
    if (i >= words.length) clearInterval(timer);
  }, wordMs);
  return { stop: () => finish(true), abort: () => finish(false) };
}

export const speech: SpeechService = new WebSpeechService();
