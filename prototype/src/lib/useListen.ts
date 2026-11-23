// One listening turn: mic (or a simulated transcript for the demo), live words,
// a voice "level" for the presence, earcons, and a single outcome callback.
import { useCallback, useEffect, useRef, useState } from 'react';
import { simulateListen, speech, type ListenHandle, type SpeechErrorCode } from './speech';
import { cue } from './cues';

export type Outcome =
  | { kind: 'heard'; text: string; confidence: number; simulated: boolean }
  | { kind: 'nothing' }
  | { kind: 'error'; code: SpeechErrorCode };

export interface ListenRequest {
  lang: string;
  /** Demo: play this transcript word by word instead of using the mic. */
  simulate?: string | null;
  /** End of turn after this much silence (2.0s for a story, 1.2s for yes/no). */
  silenceMs?: number;
  onOutcome: (o: Outcome) => void;
}

export function useListen() {
  const [listening, setListening] = useState(false);
  const [live, setLive] = useState('');
  const [level, setLevel] = useState(1);
  const handle = useRef<ListenHandle | null>(null);
  const cancelled = useRef(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      handle.current?.abort();
    };
  }, []);

  // Voice level decays during silence so the glow settles.
  useEffect(() => {
    if (!listening) return;
    const id = setInterval(() => setLevel((l) => Math.max(1, l * 0.9)), 120);
    return () => clearInterval(id);
  }, [listening]);

  const start = useCallback((req: ListenRequest) => {
    if (handle.current) return;
    speech.cancelSpeech();
    setLive('');
    setListening(true);
    cancelled.current = false;
    cue('open');
    let result: { text: string; conf: number } | null = null;
    let error: SpeechErrorCode | null = null;
    const cb = {
      onInterim: (s: string) => alive.current && setLive(s),
      onActivity: () => alive.current && setLevel(1.18),
      onFinal: (text: string, conf: number) => {
        result = { text, conf };
      },
      onError: (code: SpeechErrorCode) => {
        error = code;
      },
      onEnd: () => {
        handle.current = null;
        if (!alive.current) return;
        setListening(false);
        if (cancelled.current) return;
        cue('close');
        if (result) req.onOutcome({ kind: 'heard', text: result.text, confidence: result.conf, simulated: !!req.simulate });
        else if (error && error !== 'no-speech' && error !== 'aborted') req.onOutcome({ kind: 'error', code: error });
        else if (error !== 'aborted') req.onOutcome({ kind: 'nothing' });
      },
    };
    handle.current = req.simulate
      ? simulateListen(req.simulate, cb, 150)
      : speech.listen(req.lang, cb, { silenceMs: req.silenceMs ?? 2000, initialSilenceMs: 9000 });
  }, []);

  const stop = useCallback(() => handle.current?.stop(), []);
  const abort = useCallback(() => {
    cancelled.current = true;
    handle.current?.abort();
    handle.current = null;
    setListening(false);
  }, []);

  return { listening, live, level, start, stop, abort };
}
