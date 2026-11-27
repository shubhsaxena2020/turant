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
import { loadWhisper, transcribe } from './whisper';

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

/** `?speech=whisper`: skip the browser's recogniser and use only our recorder + in-page Whisper
 *  (machines where Chrome's recogniser misbehaves, and demo recordings that feed a voice clip as the microphone). */
const whisperOnly = () => {
  try {
    return new URLSearchParams(location.search).get('speech') === 'whisper';
  } catch {
    return false;
  }
};
const quietBars = () => Array.from({ length: BARS }, () => 0.06);

/** Phones: Chrome on Android can starve the speech service if we also hold the mic, so we only meter on desktop. */
const canMeter = () =>
  typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

interface Meter {
  peak: number;
  /** Background noise level (RMS), learned from the quiet frames. */
  floor: number;
  /** Called on every frame where the microphone hears a voice-level sound. */
  onVoice?: () => void;
  /** Stop recording and return what was recorded (null if this browser cannot record). */
  stopRecording(): Promise<Blob | null>;
  close(): void;
}

/** Open the microphone and feed a rolling waveform. Rejects with the getUserMedia error. */
async function openMeter(onBars: (b: number[]) => void): Promise<Meter> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  // Created after the permission prompt, the context can start suspended (no user gesture left): resume it.
  if (ctx.state === 'suspended') await ctx.resume().catch(() => undefined);
  const src = ctx.createMediaStreamSource(stream);
  const an = ctx.createAnalyser();
  an.fftSize = 1024;
  // Measure only the speech band (about 250 Hz to 3.8 kHz): fans, traffic rumble and hiss don't count as voice.
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 250;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 3800;
  src.connect(hp);
  hp.connect(lp);
  lp.connect(an);
  const buf = new Uint8Array(an.fftSize);
  let bars = quietBars();
  let floor = -1;
  let raf = 0;
  let last = 0;
  // Keep a recording too: if the browser's speech service returns nothing, Whisper reads this instead.
  const chunks: Blob[] = [];
  let rec: MediaRecorder | null = null;
  try {
    rec = new MediaRecorder(stream);
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    rec.start(250);
  } catch {
    rec = null;
  }
  const m: Meter = {
    peak: 0,
    floor: 0,
    stopRecording() {
      if (!rec) return Promise.resolve(null);
      const r = rec;
      rec = null;
      return new Promise((resolve) => {
        const done = () => resolve(chunks.length ? new Blob(chunks, { type: r.mimeType || 'audio/webm' }) : null);
        if (r.state === 'inactive') return done();
        r.onstop = done;
        try {
          r.stop();
        } catch {
          done();
        }
      });
    },
    close() {
      try {
        rec?.stop();
      } catch {
        /* already stopped */
      }
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
    // Background level (fan, TV, traffic): follows quiet frames at once, rises only slowly while someone talks.
    floor = floor < 0 ? rms : rms < floor ? rms : floor * 0.997 + rms * 0.003;
    m.floor = floor;
    // Relative to the room, so a quiet voice or a soft laptop mic still counts as speech.
    if (rms > Math.max(0.008, floor * 2.5)) m.onVoice?.();
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
  /** Whisper is reading the recording (after the browser's speech service returned nothing). */
  const [transcribing, setTranscribing] = useState(false);
  /** One-time model download, 0..1 (undefined once it is cached / not downloading). */
  const [modelProgress, setModelProgress] = useState<number | undefined>(undefined);
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
    const finish = async () => {
      handle.current = null;
      const m = meter.current;
      meter.current = null;
      const recording = m ? await m.stopRecording() : null;
      m?.close();
      if (!alive.current) return;
      setListening(false);
      setBars(quietBars());
      if (cancelled.current) return;
      cue('close');
      if (error === 'aborted') return;
      // A meter that read exact zeros was not running (suspended audio): let Whisper judge the recording.
      const meterDead = !!m && m.peak === 0;
      const spoke = !!m && (meterDead || m.peak > Math.max(0.015, m.floor * 4));
      const solid = (r: { text: string; conf: number }) => r.text.split(/\s+/).filter(Boolean).length >= 3 && (r.conf === 0 || r.conf >= 0.6);
      // Trust the browser's words when they look solid, or when we have no recording to fall back on.
      if (result && (solid(result) || !recording || !spoke)) {
        if (!req.simulate) console.info('[turant] browser recogniser heard:', result.text, result.conf);
        return req.onOutcome({ kind: 'heard', text: result.text, confidence: result.conf, simulated: !!req.simulate });
      }
      if (result) console.info('[turant] speech service gave a weak result, reading the recording instead:', result.text);
      // The browser's speech service gave nothing (or failed) although the person spoke: read the recording ourselves.
      if (error) console.info('[turant] speech service error:', error);
      if (m) console.info('[turant] meter peak', m.peak.toFixed(4), 'floor', m.floor.toFixed(4), 'recording', recording?.size ?? 0);
      // We hold the recording, so any speech-service failure (no words, network, a session that ended early) is recoverable.
      if (recording && spoke) {
        setTranscribing(true);
        try {
          const text = await transcribe(recording, req.lang, (f) => alive.current && setModelProgress(f < 1 ? f : undefined));
          if (!alive.current || cancelled.current) return;
          console.info('[turant] in-page Whisper heard:', text);
          if (text) return req.onOutcome({ kind: 'heard', text, confidence: 0, simulated: false });
        } catch (e) {
          console.warn('[turant] in-page Whisper failed', e); // model could not load (offline?): fall through to the message
        } finally {
          if (alive.current) {
            setTranscribing(false);
            setModelProgress(undefined);
          }
        }
        return req.onOutcome({ kind: 'error', code: error === 'network' ? 'network' : 'no-words' });
      }
      if (error && error !== 'no-speech') return req.onOutcome({ kind: 'error', code: error });
      // Nothing came back. With a meter we know whether the person actually spoke.
      if (spoke) return req.onOutcome({ kind: 'error', code: 'no-words' });
      if (m && !meterDead && m.peak < 0.006) return req.onOutcome({ kind: 'error', code: 'silent' });
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
      onEnd: () => void finish(),
    };
    if (req.simulate) {
      handle.current = simulateListen(req.simulate, cb, 150);
      return;
    }
    if (!speech.canListen) {
      error = 'unsupported';
      setTimeout(() => void finish(), 0);
      return;
    }
    const begin = () => {
      if (cancelled.current || !alive.current) return void finish();
      const silenceMs = req.silenceMs ?? 2000;
      const m = meter.current;
      if (!m) {
        handle.current = speech.listen(req.lang, cb, { silenceMs, initialSilenceMs: 9000 });
        return;
      }
      // With our own meter the turn ends on OUR voice detection, not on the speech service's session:
      // Chrome on Windows can end its session ~2 s in while the person is still talking (and return no words),
      // which used to cut the recording short. The speech service only adds live words when it works.
      const t0 = Date.now();
      let lastVoice = 0;
      let firstVoice = 0;
      let gotWords = false;
      let prefetched = false;
      let srDone = whisperOnly();
      let ended = false;
      let closing: ReturnType<typeof setTimeout> | undefined;
      const end = () => {
        if (ended) return;
        ended = true;
        clearInterval(watch);
        clearTimeout(closing);
        void finish();
      };
      /** Ask the speech service to deliver what it has, then end (at most 1.2 s later). */
      const wrapUp = () => {
        if (ended || closing) return;
        if (srDone) return end();
        try {
          sr.stop();
        } catch {
          /* already stopped */
        }
        closing = setTimeout(end, 1200);
      };
      const sr = whisperOnly()
        ? { stop: () => undefined, abort: () => undefined, poke: () => undefined }
        : speech.listen(
        req.lang,
        {
          ...cb,
          onInterim: (s: string) => {
            if (s.trim()) gotWords = true;
            cb.onInterim(s);
          },
          onEnd: () => {
            srDone = true;
            // The service may end early (or with one misheard word) while the person is still talking:
            // only our own voice detection, or a tap, ends the turn.
            if (closing || (result && Date.now() - lastVoice > silenceMs)) end();
          },
        },
        { silenceMs, initialSilenceMs: 120000 },
      );
      m.onVoice = () => {
        lastVoice = Date.now();
        if (!firstVoice) firstVoice = lastVoice;
        sr.poke?.();
      };
      const watch = setInterval(() => {
        const now = Date.now();
        const quietFor = lastVoice ? now - lastVoice : 0;
        // ~2 s of voice and still no words from the browser: it is probably failing. Start fetching the in-page
        // model now, while the person is still talking, instead of after they finish (first use: ~100 MB).
        if (!prefetched && firstVoice && (whisperOnly() || (!gotWords && now - firstVoice > 2000))) {
          prefetched = true;
          void loadWhisper(req.lang).catch(() => undefined);
        }
        if ((lastVoice && quietFor > silenceMs) || (!lastVoice && now - t0 > 9000) || now - t0 > 45000) wrapUp();
      }, 150);
      handle.current = {
        stop: wrapUp,
        abort: () => {
          ended = true;
          clearInterval(watch);
          clearTimeout(closing);
          sr.abort();
          void finish();
        },
      };
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
          return void finish();
        }
        begin();
      })
      .catch((e: unknown) => {
        handle.current = null;
        const name = (e as { name?: string })?.name ?? '';
        error = name === 'NotAllowedError' || name === 'SecurityError' ? 'not-allowed' : name === 'NotFoundError' || name === 'NotReadableError' || name === 'OverconstrainedError' ? 'audio-capture' : null;
        if (error) return void finish();
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

  return { listening, live, level, bars, transcribing, modelProgress, start, stop, abort };
}
