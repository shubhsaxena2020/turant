import { useCallback, useEffect, useRef, useState } from 'react';
import { detectIntent, wordCount } from '../lib/extract';
import { simulateListen, speech, type ListenHandle, type SpeechErrorCode } from '../lib/speech';
import { t as tr } from '../i18n/strings';
import type { UI } from '../ui';
import { KeyboardIcon, MicIcon } from './icons';

export type Via = 'voice' | 'typed' | 'sample';

interface Props {
  ui: UI;
  purpose: 'story' | 'answer' | 'correction' | 'language';
  listenLang?: string;
  /** Demo transcript played word by word instead of the microphone. */
  simulateText?: string | null;
  autoStart?: boolean;
  /** Minimum words for a spoken turn (the spec: under 3 words = retry for the story). */
  minWords?: number;
  validate?: (text: string) => boolean;
  invalidMessage?: string;
  micLabel: string;
  hero?: boolean;
  placeholder?: string;
  onResult: (text: string, confidence: number, via: Via) => void;
  onListeningChange?: (listening: boolean) => void;
}

type Phase = 'idle' | 'listening' | 'paused' | 'denied';

/** Live waveform: bars jump whenever the recogniser reports activity. */
function Waveform({ level }: { level: number }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 110);
    return () => clearInterval(id);
  }, []);
  const bars = 27;
  return (
    <div className="flex items-center justify-center gap-[5px] h-20" aria-hidden data-tick={tick}>
      {Array.from({ length: bars }, (_, i) => {
        const centre = 1 - Math.abs(i - (bars - 1) / 2) / (bars / 2);
        const wobble = 0.35 + 0.65 * Math.abs(Math.sin(tick * 0.9 + i * 1.7));
        const h = 8 + (12 + 58 * level * wobble) * (0.35 + 0.65 * centre);
        return <span key={i} className="w-[5px] rounded-full bg-saffron transition-[height] duration-100" style={{ height: `${h}px` }} />;
      })}
    </div>
  );
}

export function VoiceCapture(props: Props) {
  const { ui, purpose, simulateText, autoStart, minWords = 1, validate, invalidMessage, micLabel, hero, onResult, onListeningChange } = props;
  const { t } = ui;
  const [phase, setPhase] = useState<Phase>('idle');
  const [live, setLive] = useState('');
  const [lastHeard, setLastHeard] = useState('');
  const [sorry, setSorry] = useState<string | null>(null);
  const [failures, setFailures] = useState(0);
  const [pauseLeft, setPauseLeft] = useState(0);
  const [typed, setTyped] = useState('');
  const [keyboard, setKeyboard] = useState(false);
  const [level, setLevel] = useState(0.15);
  const handle = useRef<ListenHandle | null>(null);
  const mounted = useRef(true);
  const resultRef = useRef<{ text: string; conf: number } | null>(null);
  const errorRef = useRef<SpeechErrorCode | null>(null);

  const showKeyboard = ui.mode === 'type' || keyboard || failures >= 2;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      handle.current?.abort();
    };
  }, []);

  // activity decays so the waveform settles during silence
  useEffect(() => {
    if (phase !== 'listening') return;
    const id = setInterval(() => setLevel((l) => Math.max(0.12, l * 0.82)), 120);
    return () => clearInterval(id);
  }, [phase]);

  const fail = useCallback(
    (message?: string) => {
      setFailures((f) => f + 1);
      const msg = message ?? t('sorryRetry');
      setSorry(msg);
      // Speak in the voice language actually available (may be a fallback).
      void ui.say((l) => (message && l === ui.lang ? message : tr(l, 'sorryRetry')));
    },
    [t, ui],
  );

  const handleFinal = useCallback(
    (text: string, conf: number, via: Via) => {
      setLastHeard(text);
      if (via !== 'typed' && purpose !== 'language' && detectIntent(text) === 'wait') {
        setPhase('paused');
        setPauseLeft(20);
        return;
      }
      const lowConf = via === 'voice' && conf > 0 && conf < 0.6;
      const tooShort = via !== 'typed' && wordCount(text) < minWords;
      const invalid = validate ? !validate(text) : false;
      if (lowConf || tooShort) return fail();
      if (invalid) return fail(invalidMessage);
      setFailures(0);
      setSorry(null);
      onResult(text, conf, via);
    },
    [purpose, minWords, validate, invalidMessage, fail, onResult],
  );

  const start = useCallback(() => {
    if (handle.current) return;
    speech.cancelSpeech();
    setLive('');
    setSorry(null);
    setPhase('listening');
    setLevel(0.3);
    onListeningChange?.(true);
    resultRef.current = null;
    errorRef.current = null;
    const via: Via = simulateText ? 'sample' : 'voice';
    const cb = {
      onInterim: (s: string) => mounted.current && setLive(s),
      onActivity: () => mounted.current && setLevel(1),
      onFinal: (text: string, conf: number) => {
        resultRef.current = { text, conf };
      },
      onError: (code: SpeechErrorCode) => {
        errorRef.current = code;
      },
      onEnd: () => {
        handle.current = null;
        if (!mounted.current) return;
        onListeningChange?.(false);
        setPhase((p) => (p === 'listening' ? 'idle' : p));
        const res = resultRef.current;
        const err = errorRef.current;
        if (res) return handleFinal(res.text, res.conf, via);
        if (err === 'not-allowed' || err === 'audio-capture') return setPhase('denied');
        if (err === 'network') {
          ui.notify(t('networkError'));
          return ui.setMode('type');
        }
        if (err === 'unsupported') {
          ui.notify(t('noSpeech'));
          return ui.setMode('type');
        }
        if (err === 'aborted') return;
        fail();
      },
    };
    handle.current = simulateText ? simulateListen(simulateText, cb) : speech.listen(props.listenLang ?? ui.lang, cb, { silenceMs: 2500 });
  }, [simulateText, props.listenLang, ui, t, handleFinal, fail, onListeningChange]);

  // Auto start (after a question has been spoken, or for the demo sample).
  useEffect(() => {
    if (autoStart && (simulateText || (ui.mode === 'voice' && speech.canListen))) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, simulateText]);

  // "Ek minute ruko" / "wait": pause for 20 seconds, then listen again.
  useEffect(() => {
    if (phase !== 'paused') return;
    if (pauseLeft <= 0) {
      setPhase('idle');
      start();
      return;
    }
    const id = setTimeout(() => setPauseLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, pauseLeft, start]);

  const submitTyped = () => {
    const text = typed.trim();
    if (!text) return;
    setTyped('');
    handleFinal(text, 1, 'typed');
  };

  if (phase === 'listening') {
    return (
      <div className="paper-card p-5 rise" role="status" aria-live="polite">
        <div className="flex items-center justify-between">
          <span className="label-caps flex items-center gap-2 text-saffron-dark">
            <span className="w-2.5 h-2.5 rounded-full bg-alarm animate-pulse" /> {t('listening')}
          </span>
          {simulateText ? <span className="text-[0.8rem] font-semibold text-ink-faint">{t('trySample')}</span> : null}
        </div>
        <Waveform level={level} />
        <p className="min-h-[6rem] text-[1.3rem] leading-snug font-semibold text-ink break-words" data-testid="live-transcript">
          {live || <span className="text-ink-faint font-normal">{t('listenHint')}</span>}
        </p>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
          <button className="btn-primary" onClick={() => handle.current?.stop()}>
            {t('done')}
          </button>
          <button className="btn-quiet" onClick={() => handle.current?.abort()}>
            {t('cancel')}
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'paused') {
    return (
      <div className="paper-card p-5 text-center rise">
        <p className="text-[1.2rem] font-bold">{t('paused', { s: pauseLeft })}</p>
        <button className="btn-primary w-full mt-4" onClick={() => setPauseLeft(0)}>
          {t('resumeNow')}
        </button>
      </div>
    );
  }

  if (phase === 'denied') {
    return (
      <div className="paper-card p-5 border-alarm rise">
        <p className="text-[1.25rem] font-extrabold text-alarm">{t('micDeniedTitle')}</p>
        <p className="mt-2 text-ink-soft">{t('micDeniedBody')}</p>
        <button
          className="btn-primary w-full mt-4 text-[1.2rem] min-h-[64px]"
          onClick={() => {
            setPhase('idle');
            ui.setMode('type');
          }}
        >
          <KeyboardIcon /> {t('typeInstead')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {sorry ? (
        <div className="rounded-2xl bg-alarm-soft border-[1.5px] border-alarm/40 p-4 rise" role="alert">
          <p className="font-bold text-alarm-dark">{sorry}</p>
          {lastHeard ? (
            <p className="mt-1 text-ink-soft">
              {t('iHeard')}: “{lastHeard}”
            </p>
          ) : null}
        </div>
      ) : null}

      {(ui.mode === 'voice' && speech.canListen) || simulateText ? (
        hero ? (
          <div className="flex flex-col items-center gap-4 py-2">
            <button
              onClick={start}
              aria-label={micLabel}
              className="mic-ring relative w-[188px] h-[188px] rounded-full bg-ink text-card flex items-center justify-center shadow-lift active:scale-95 transition"
            >
              <span className="absolute inset-[10px] rounded-full border-[3px] border-saffron/70" />
              <MicIcon className="w-[76px] h-[76px]" />
            </button>
            <span className="text-[1.45rem] font-extrabold text-center leading-tight">{sorry ? t('tryAgain') : micLabel}</span>
          </div>
        ) : (
          <button onClick={start} className="btn-primary w-full min-h-[64px] text-[1.15rem]">
            <MicIcon className="w-7 h-7 text-saffron" /> {sorry ? t('tryAgain') : micLabel}
          </button>
        )
      ) : null}

      {showKeyboard ? (
        <div className="paper-card p-4 rise">
          {failures >= 2 && ui.mode === 'voice' ? <p className="font-semibold mb-2">{t('keyboardFallback')}</p> : null}
          <textarea
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitTyped();
              }
            }}
            rows={purpose === 'story' ? 4 : 2}
            placeholder={props.placeholder ?? t('typeHere')}
            className="w-full rounded-xl border-[1.5px] border-line bg-white p-3 text-[1.1rem] focus:border-ink outline-none"
            aria-label={props.placeholder ?? t('typeHere')}
          />
          <button className="btn-primary w-full mt-3" onClick={submitTyped} disabled={!typed.trim()}>
            {t('send')}
          </button>
          {ui.mode === 'type' && speech.canListen ? (
            <button className="btn-quiet w-full mt-1" onClick={() => ui.setMode('voice')}>
              <MicIcon className="w-5 h-5" /> {t('answerByVoice')}
            </button>
          ) : null}
        </div>
      ) : ui.mode === 'voice' && speech.canListen ? (
        <button className="btn-quiet self-center" onClick={() => setKeyboard(true)}>
          <KeyboardIcon className="w-5 h-5" /> {t('typeInstead')}
        </button>
      ) : null}
    </div>
  );
}
