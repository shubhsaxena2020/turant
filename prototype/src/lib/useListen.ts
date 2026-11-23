// One listening turn: mic (or a simulated transcript for the demo), live words,
// a live waveform from the microphone, earcons, and a single outcome callback.
//
// Why the meter: the browser's speech service can fail silently (no permission prompt answered,
// a muted mic, or a browser whose speech service returns nothing). Reading the microphone
// ourselves shows the user that we are recording, and tells "you were silent" apart from
// "you spoke but this browser gave no words", so the app can say what went wrong.
import { useCallback, useEffect, useRef, useState } from 'react';
import { simulateListen, speech, type ListenHandle, type SpeechErrorCode } from './speech';
import { cue } from './cues';

/** 'no-words': sound reached the mic but the speech service returned nothing. 'silent': the mic gave no sound. */
export type ListenErrorCode = SpeechErrorCode | 'no-words' | 'silent';

export type Outcome =
  | { kind: 'heard'; text: string; confidence: number; simulated: boolean }
  | { kind: 'nothing' }
  | { kind: 'error'; code: ListenErrorCode };

export interface ListenRequest {
  lang: string;
  /** Demo: play this transcript word by word instead of using the mic. */
  simulate?: string | null;
  /** End of turn after this much silence (2.0s for a story, 1.2s for yes/no). */
  silenceMs?: number;
  onOutcome: (o: Outcome) => void;
}

const BARS = 28;
const quietBars = () => Array.from({ length: BARS }, () => 0.06);

/** Phones: Chrome on Android can starve the speech service if we also hold the mic, so we only meter on desktop. */
const canMeter = () =>
  typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

interface Meter {
  peak: number;
  close(): void;
}

/** Open the microphone and feed a rolling waveform. Rejects with the getUserMedia error. */
async function openMeter(onBars: (b: number[]) => void): Promise<Meter> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  const src = ctx.createMediaStreamSource(stream);
  const an = ctx.createAnalyser();
  an.fftSize = 1024;
  src.connect(an);
  const buf = new Uint8Array(an.fftSize);
  let bars = quietBars();
  let raf = 0;
  let last = 0;
  const m: Meter = {
    peak: 0,
    close() {
      cancelAnimationFrame(raf);
      stream.getTracks().forEach((t) => t.stop());
      void ctx.close().catch(() => undefined);
    },
  };
  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    if (now - last < 60) return;
    last = now;
    an.getByteTimeDomainData(buf);
    let sum = 0;
    for (let i = 0; i < buf.length; i++) {
      const v = (buf[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / buf.length);
    m.peak = Math.max(m.peak, rms);
    const h = Math.min(1, Math.max(0.06, Math.sqrt(rms) * 2.2)); // sqrt: quiet speech still moves the bars
    bars = [...bars.slice(1), h];
    onBars(bars);
  };
  raf = requestAnimationFrame(tick);
  return m;
}

export function useListen() {
  const [listening, setListening] = useState(false);
  const [live, setLive] = useState('');
  const [level, setLevel] = useState(1);
  const [bars, setBars] = useState<number[]>(quietBars);
  const handle = useRef<ListenHandle | null>(null);
  const meter = useRef<Meter | null>(null);
  const cancelled = useRef(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      handle.current?.abort();
      meter.current?.close();
    };
  }, []);

  // Without a real meter (demo, phones), the waveform follows speech activity and settles in silence.
  useEffect(() => {
    if (!listening || meter.current) return;
    const id = setInterval(() => {
      setLevel((l) => Math.max(1, l * 0.9));
      setBars((b) => {
        const lv = Math.max(0, (level - 1) / 0.18);
        const t = Date.now() / 140;
        return b.map((_, i) => Math.max(0.06, lv * (0.35 + 0.65 * Math.abs(Math.sin(t + i * 0.9)))));
      });
    }, 90);
    return () => clearInterval(id);
  }, [listening, level]);

  const start = useCallback((req: ListenRequest) => {
    if (handle.current) return;
    speech.cancelSpeech();
    setLive('');
    setBars(quietBars());
    setListening(true);
    cancelled.current = false;
    cue('open');
    let result: { text: string; conf: number } | null = null;
    let error: ListenErrorCode | null = null;
    const finish = () => {
      handle.current = null;
      const m = meter.current;
      meter.current = null;
      m?.close();
      if (!alive.current) return;
      setListening(false);
      setBars(quietBars());
      if (cancelled.current) return;
      cue('close');
      if (result) return req.onOutcome({ kind: 'heard', text: result.text, confidence: result.conf, simulated: !!req.simulate });
      if (error && error !== 'no-speech' && error !== 'aborted') return req.onOutcome({ kind: 'error', code: error });
      if (error === 'aborted') return;
      // Nothing came back. With a meter we know whether the person actually spoke.
      if (m && m.peak > 0.045) return req.onOutcome({ kind: 'error', code: 'no-words' });
      if (m && m.peak < 0.008) return req.onOutcome({ kind: 'error', code: 'silent' });
      req.onOutcome({ kind: 'nothing' });
    };
    const cb = {
      onInterim: (s: string) => alive.current && setLive(s),
      onActivity: () => alive.current && setLevel(1.18),
      onFinal: (text: string, conf: number) => {
        result = { text, conf };
      },
      onError: (code: SpeechErrorCode) => {
        error = code;
      },
      onEnd: finish,
    };
    if (req.simulate) {
      handle.current = simulateListen(req.simulate, cb, 150);
      return;
    }
    if (!speech.canListen) {
      error = 'unsupported';
      setTimeout(finish, 0);
      return;
    }
    const begin = () => {
      if (cancelled.current || !alive.current) return finish();
      handle.current = speech.listen(req.lang, cb, { silenceMs: req.silenceMs ?? 2000, initialSilenceMs: 9000 });
    };
    if (!canMeter()) return begin();
    // Ask for the microphone ourselves first: a clear permission prompt, and a real waveform.
    let pendingAbort = false;
    handle.current = {
      stop: () => {
        pendingAbort = true;
      },
      abort: () => {
        pendingAbort = true;
      },
    };
    openMeter((b) => alive.current && setBars(b))
      .then((m) => {
        meter.current = m;
        handle.current = null;
        if (pendingAbort) {
          cancelled.current = true;
          return finish();
        }
        begin();
      })
      .catch((e: unknown) => {
        handle.current = null;
        const name = (e as { name?: string })?.name ?? '';
        error = name === 'NotAllowedError' || name === 'SecurityError' ? 'not-allowed' : name === 'NotFoundError' || name === 'NotReadableError' || name === 'OverconstrainedError' ? 'audio-capture' : null;
        if (error) return finish();
        begin(); // no meter, but the speech service may still work
      });
  }, []);

  const stop = useCallback(() => handle.current?.stop(), []);
  const abort = useCallback(() => {
    cancelled.current = true;
    handle.current?.abort();
    handle.current = null;
    meter.current?.close();
    meter.current = null;
    setListening(false);
    setBars(quietBars());
  }, []);

  return { listening, live, level, bars, start, stop, abort };
}
