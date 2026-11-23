// The one living presence (research: Siri/Gemini/ChatGPT use a single glowing
// light for listening / thinking / speaking). It is also the mic button.
export type PresenceState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'off';

/** Segmented level meter (Wispr Flow's chord-purple meter): shows the voice is being heard. */
function LevelMeter({ level }: { level: number }) {
  const lv = Math.max(0.12, Math.min(1, (level - 1) / 0.18)); // useListen level runs 1 .. 1.18
  const t = Date.now() / 160;
  return (
    <span className="meter" aria-hidden>
      {Array.from({ length: 9 }, (_, i) => {
        const shape = 1 - Math.abs(i - 4) / 5;
        const wobble = 0.55 + 0.45 * Math.abs(Math.sin(t + i * 1.3));
        return <i key={i} style={{ ['--h' as string]: String(Math.max(0.15, lv * shape * wobble)) }} />;
      })}
    </span>
  );
}

export function Presence(props: {
  state: PresenceState;
  level?: number;
  label: string;
  onPress?: () => void;
  small?: boolean;
  testId?: string;
}) {
  const { state, level = 1, label, onPress, small } = props;
  return (
    <button
      type="button"
      onClick={onPress}
      aria-label={label}
      aria-pressed={state === 'listening'}
      data-testid={props.testId ?? 'presence'}
      className="flex flex-col items-center gap-3 select-none"
    >
      <span
        className="presence"
        data-state={state}
        style={{ ['--level' as string]: String(level), ...(small ? { width: '5.5rem', height: '5.5rem' } : null) }}
        aria-hidden
      >
        <span className="glow" />
        <span className="ring" />
        <span className="ring r2" />
        <span className="core" />
        {state === 'off' ? null : (
          <svg viewBox="0 0 24 24" className="relative w-10 h-10 text-night" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {state === 'listening' ? (
              <rect x="5" y="5" width="14" height="14" rx="3.5" fill="currentColor" stroke="none" />
            ) : (
              <>
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
              </>
            )}
          </svg>
        )}
      </span>
      {state === 'listening' ? <LevelMeter level={level} /> : null}
      <span className="text-lg font-semibold text-night-text text-center leading-snug max-w-[18rem]" aria-live="polite">
        {label}
      </span>
    </button>
  );
}
