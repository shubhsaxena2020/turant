// Three earcons + one success chime (generated, no audio files) and Android haptics.
// Research: listening must be signalled by sound + motion + haptic + text at once.

type Cue = 'open' | 'close' | 'captured' | 'success';

let ctx: AudioContext | null = null;
let enabled = true;

export function setCuesEnabled(on: boolean): void {
  enabled = on;
}

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx ??= new Ctor();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(a: AudioContext, freq: number, start: number, dur: number, gain = 0.08): void {
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, a.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, a.currentTime + start + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + start + dur);
  o.connect(g).connect(a.destination);
  o.start(a.currentTime + start);
  o.stop(a.currentTime + start + dur + 0.02);
}

const NOTES: Record<Cue, [number, number, number][]> = {
  open: [
    [523.25, 0, 0.12],
    [783.99, 0.09, 0.16],
  ],
  close: [
    [783.99, 0, 0.12],
    [523.25, 0.09, 0.16],
  ],
  captured: [[1046.5, 0, 0.14]],
  success: [
    [659.25, 0, 0.22],
    [987.77, 0.16, 0.42],
  ],
};

const BUZZ: Record<Cue, number | number[]> = { open: 12, close: 8, captured: [10, 60, 10], success: 40 };

export function cue(kind: Cue): void {
  if (!enabled) return;
  try {
    navigator.vibrate?.(BUZZ[kind]);
  } catch {
    /* not supported (iOS / desktop) */
  }
  const a = audio();
  if (!a) return;
  for (const [f, s, d] of NOTES[kind]) tone(a, f, s, d);
}
