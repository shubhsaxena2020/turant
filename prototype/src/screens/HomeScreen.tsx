import type { Report } from '../lib/report';
import { speech } from '../lib/speech';
import { formatINR } from '../lib/format';
import { AlertStrip } from '../components/common';
import { KeyboardIcon, MicIcon, PlayIcon } from '../components/icons';
import type { UI } from '../ui';

export function HomeScreen(props: {
  ui: UI;
  draft: Report | null;
  onStart: (opts: { sample: boolean; typed?: boolean }) => void;
  onContinue: (r: Report) => void;
}) {
  const { ui, draft } = props;
  const voice = ui.mode === 'voice' && speech.canListen;
  return (
    <div className="px-4 pt-5 pb-10 flex flex-col gap-5">
      <p className="text-[1.05rem] font-semibold text-ink-soft leading-snug">{ui.t('tagline')}</p>

      <div className="paper-card ledger px-4 pt-8 pb-6 flex flex-col items-center text-center">
        <button
          onClick={() => props.onStart({ sample: false, typed: !voice })}
          aria-label={ui.t('homeMic')}
          className="mic-ring relative w-[196px] h-[196px] rounded-full bg-ink text-card flex items-center justify-center shadow-lift active:scale-95 transition"
          data-testid="home-mic"
        >
          <span className="absolute inset-[11px] rounded-full border-[3px] border-saffron/70" />
          {voice ? <MicIcon className="w-[80px] h-[80px]" /> : <KeyboardIcon className="w-[80px] h-[80px]" />}
        </button>
        <h1 className="mt-6 text-[1.9rem] font-black leading-tight">{ui.t('homeMic')}</h1>
        <p className="mt-2 text-ink-soft text-[1.05rem] leading-snug max-w-[20rem]">{ui.t('homeHint')}</p>
        {!speech.canListen ? <p className="mt-3 text-[0.95rem] font-semibold text-amberx">{ui.t('noSpeech')}</p> : null}
      </div>

      <AlertStrip ui={ui} />

      <div className="grid grid-cols-2 gap-3">
        <button className="btn-ghost flex-col !gap-1 py-3 min-h-[84px]" onClick={() => props.onStart({ sample: true })} data-testid="try-sample">
          <PlayIcon className="w-6 h-6 text-saffron-dark" />
          <span>{ui.t('trySample')}</span>
        </button>
        <button className="btn-ghost flex-col !gap-1 py-3 min-h-[84px]" onClick={() => props.onStart({ sample: false, typed: true })}>
          <KeyboardIcon className="w-6 h-6 text-saffron-dark" />
          <span>{ui.t('typeInstead')}</span>
        </button>
      </div>
      <p className="-mt-2 text-[0.9rem] text-ink-faint text-center leading-snug">{ui.t('trySampleHint')}</p>

      {draft ? (
        <button className="paper-card p-4 text-left flex items-center gap-3 hover:border-ink" onClick={() => props.onContinue(draft)}>
          <span className="w-3 h-3 rounded-full bg-amberx shrink-0" />
          <span className="flex-1">
            <span className="block font-extrabold">{ui.t('continueDraft')}</span>
            <span className="block text-ink-soft text-[0.95rem]">
              {draft.fields.amount ? formatINR(Number(draft.fields.amount.value)) + ' · ' : ''}
              {ui.t('statusDraft')}
            </span>
          </span>
          <span className="text-[1.5rem] font-black text-ink-faint">›</span>
        </button>
      ) : null}

      <p className="text-[0.9rem] text-ink-faint text-center leading-snug">{ui.t('privacyNote')}</p>
    </div>
  );
}
