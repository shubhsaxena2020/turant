import type { UI } from '../ui';
import { BackIcon, PhoneIcon } from './icons';

/** Turant's mark: a small black pill with a waveform (our own mark, in the Flow Bar's colours). */
function Mark() {
  return (
    <svg viewBox="0 0 44 24" className="h-[22px] w-[40px]" aria-hidden>
      <rect x="0" y="0" width="44" height="24" rx="12" fill="#1A1A1A" />
      <rect x="10" y="9" width="3" height="6" rx="1.5" fill="#F0D7FF" />
      <rect x="16" y="6" width="3" height="12" rx="1.5" fill="#F0D7FF" />
      <rect x="22" y="4" width="3" height="16" rx="1.5" fill="#FFBCF2" />
      <rect x="28" y="7" width="3" height="10" rx="1.5" fill="#FFA946" />
      <rect x="34" y="10" width="3" height="4" rx="1.5" fill="#F0D7FF" />
    </svg>
  );
}

/** Wispr-style navigation: one rounded cream bar with a hairline border. Back or the wordmark, text size, and the
 *  always-visible 1930 call as the lilac button. Sized in px, not rem: the "Aa" control scales the page. */
export function TopBar(props: { ui: UI; tone: 'night' | 'paper' | 'ok'; onBack?: () => void; onScale: () => void }) {
  const { ui } = props;
  return (
    <header className="px-[12px] text-[16px] text-ink" style={{ paddingTop: 'max(10px, env(safe-area-inset-top))' }}>
      <div className="flex items-center gap-[4px] rounded-[14px] border border-hair bg-[#FFFFF5] py-[6px] pl-[6px] pr-[6px] shadow-[0_1px_2px_rgba(26,26,26,0.04)]">
        {props.onBack ? (
          <button onClick={props.onBack} className="flex min-w-0 items-center gap-[6px] min-h-[44px] px-[8px] font-semibold" data-testid="back">
            <BackIcon className="w-[22px] h-[22px] shrink-0" />
            <span className="truncate">{ui.t('back')}</span>
          </button>
        ) : (
          <span className="flex items-center gap-[8px] px-[8px] min-h-[44px]">
            <Mark />
            <span className="text-[21px] font-bold tracking-[-0.01em]">Turant</span>
          </span>
        )}
        <span className="flex-1" />
        <button onClick={props.onScale} className="shrink-0 min-h-[44px] min-w-[44px] px-[6px] font-semibold rounded-[10px] hover:bg-sand" aria-label={ui.t('textSize')}>
          <span className="text-[14px]">A</span>
          <span className="text-[18px]">a</span>
        </button>
        <a
          href="tel:1930"
          className="flex shrink-0 items-center gap-[6px] min-h-[40px] px-[12px] rounded-[8px] border-[1.6px] border-ink bg-dawn-500 font-semibold"
          data-testid="call-1930-top"
        >
          <PhoneIcon className="w-[18px] h-[18px]" />
          Call 1930
        </a>
      </div>
    </header>
  );
}
