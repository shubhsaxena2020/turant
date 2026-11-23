// The mic control, in Wispr Flow's language: a lilac pill to start, and while recording the black
// Flow Bar with a live waveform from the microphone and a stop button. Same element in every state,
// so the person always knows where to tap.
export type PresenceState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'off';

function MicIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

export function Presence(props: {
  state: PresenceState;
  /** Waveform bar heights 0..1 (from useListen). */
  bars?: number[];
  /** Kept for callers that only know a speech-activity level (1 .. 1.18). */
  level?: number;
  label: string;
  /** Smaller hint under the bar while it is busy ("Tap stop when you finish"). */
  hint?: string;
  onPress?: () => void;
  small?: boolean;
  testId?: string;
}) {
  const { state, label, onPress } = props;
  const bars = props.bars ?? Array.from({ length: 28 }, () => 0.06);
  if (state === 'off') return null;
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onPress}
        aria-label={label}
        aria-pressed={state === 'listening'}
        data-testid={props.testId ?? 'presence'}
        data-state={state}
        className="flow"
      >
        {state === 'idle' ? (
          <>
            <MicIcon />
            <span>{label}</span>
          </>
        ) : null}
        {state === 'listening' ? (
          <>
            <span className="wave" aria-hidden>
              {bars.map((h, i) => (
                <i key={i} style={{ ['--h' as string]: String(h) }} />
              ))}
            </span>
            <span className="stop" aria-hidden>
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <rect x="6" y="6" width="12" height="12" rx="3" fill="currentColor" />
              </svg>
            </span>
          </>
        ) : null}
        {state === 'thinking' ? (
          <>
            <span className="flex-1 text-left">{label}</span>
            <span className="dots pr-3" aria-hidden>
              <i />
              <i />
              <i />
            </span>
          </>
        ) : null}
        {state === 'speaking' ? (
          <>
            <span className="wave calm" aria-hidden>
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} style={{ animationDelay: `${i * 0.11}s`, ['--h' as string]: '0.35' }} />
              ))}
            </span>
            <span className="stop" aria-hidden>
              <MicIcon className="w-5 h-5" />
            </span>
          </>
        ) : null}
      </button>
      {state !== 'idle' ? (
        <p className="text-base font-medium text-ink/70 text-center" aria-live="polite">
          {state === 'thinking' ? null : label}
          {props.hint && state === 'listening' ? <span className="block text-sm text-ink/60">{props.hint}</span> : null}
        </p>
      ) : null}
    </div>
  );
}
