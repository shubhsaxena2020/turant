import type { UI } from '../ui';
import { langInfo } from '../lib/lang';
import { hasIndic } from '../lib/translit';
import { BackIcon, PhoneIcon } from './icons';

/** Back (word + arrow), language, text size, and the always-visible call link. Nothing else.
 *  Sized in px, not rem: the "Aa" control scales the page, and a scaled bar pushed the call link off a 360px screen. */
export function TopBar(props: { ui: UI; tone: 'night' | 'paper' | 'ok'; onBack?: () => void; onLanguage: () => void; onScale: () => void }) {
  const { ui, tone } = props;
  const night = tone === 'night';
  const text = night ? 'text-night-text' : 'text-ink';
  const brand = ui.tx(ui.cfg.name);
  const call = ui.cfg.topCall;
  return (
    <header className={`flex items-center gap-[2px] px-[8px] text-[18px] ${text}`} style={{ paddingTop: 'max(8px, env(safe-area-inset-top))' }}>
      {props.onBack ? (
        <button onClick={props.onBack} className="flex min-w-0 items-center gap-[6px] min-h-[48px] px-[8px] font-semibold" data-testid="back">
          <BackIcon className="w-[24px] h-[24px] shrink-0" />
          <span className="truncate">{ui.t('back')}</span>
        </button>
      ) : (
        <span className="px-[8px] font-display text-[23px] font-bold tracking-normal" lang={hasIndic(brand) ? ui.lang.slice(0, 2) : 'en'} data-testid="brand">
          {brand}
        </span>
      )}
      <span className="flex-1" />
      {ui.cfg.languages.length > 1 ? (
        <button onClick={props.onLanguage} className="shrink-0 min-h-[48px] px-[8px] font-semibold underline decoration-1 underline-offset-[6px]" aria-label={ui.t('chooseLang')} data-testid="lang">
          {langInfo(ui.lang).native}
        </button>
      ) : null}
      <button onClick={props.onScale} className="shrink-0 min-h-[48px] min-w-[48px] px-[6px] font-bold" aria-label={ui.t('textSize')}>
        <span className="text-[16px]">A</span>
        <span className="text-[20px]">a</span>
      </button>
      {call ? (
        <a
          href={call.href}
          className={`flex shrink-0 items-center gap-[6px] min-h-[48px] px-[10px] rounded-full font-bold ${night ? 'text-mint' : 'text-amber bg-amber-field'}`}
          data-testid="call-top"
        >
          <PhoneIcon className="w-[20px] h-[20px]" />
          {call.label}
        </a>
      ) : null}
    </header>
  );
}
