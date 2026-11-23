// The success moment: calm, not a party (no confetti — Robinhood lesson).
// A tick that draws itself, one validating line, the time that matters, a giant 1930.
import { useEffect, useMemo } from 'react';
import type { Report } from '../lib/report';
import { build1930Script } from '../lib/outputs';
import { cue } from '../lib/cues';
import { t as tr, type StrKey } from '../i18n/strings';
import { PhoneIcon, SpeakerIcon } from '../components/icons';
import type { UI } from '../ui';

export function DoneScreen(props: { ui: UI; report: Report; onWritten: () => void }) {
  const { ui, report } = props;
  const { t } = ui;
  const script = useMemo(() => build1930Script(report, ui.lang), [report, ui.lang]);

  useEffect(() => {
    cue('success');
    void ui.say((l) => `${tr(l, 'readyTitle')}. ${tr(l, 'rightStep')} ${tr(l, 'urgentLine')}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-1 flex-col bg-ok-field">
      <main className="flex-1 page-in">
        <section className="px-5 pt-6">
          <svg viewBox="0 0 96 96" className="w-24 h-24" aria-hidden>
            <circle className="tick-circle" cx="48" cy="48" r="46" fill="#034F46" style={{ transformOrigin: 'center' }} />
            <path className="tick-path" d="M30 49 L43 62 L67 36" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1 className="mt-5 text-display font-display text-ink" data-testid="ready-title">
            {t('readyTitle')}
          </h1>
          <p className="mt-1 text-lg text-body">{t('rightStep')}</p>
        </section>

        <p className="mt-6 bg-amber-field px-5 py-3 text-lg font-semibold text-amber">{t('urgentLine')}</p>

        <section className="px-5 pt-6">
          <a href="tel:1930" className="block font-display text-[4.5rem] leading-none font-bold text-ink tabular-nums" aria-label={t('callNowBig')}>
            1930
          </a>
          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-3">
            <h2 className="text-title font-display">{t('onCallSay')}</h2>
            <button className="link shrink-0" onClick={() => void ui.say((l) => build1930Script(report, l, { spoken: true }).join(' '))}>
              <SpeakerIcon className="w-5 h-5" /> {t('hearIt')}
            </button>
          </div>
          <ol className="mt-2" data-testid="script">
            {script.map((line, i) => (
              <li key={i} className="flex gap-4 py-2.5">
                <span className="w-6 shrink-0 font-display text-title text-muted tabular-nums">{i + 1}</span>
                <span className="min-w-0 break-words text-lg text-ink">{line}</span>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-lg font-semibold text-stop">{t('stopLine')}</p>

          <h2 className="mt-10 text-title font-display">{t('nextTitle')}</h2>
          <ol className="relative mt-3 ml-3 border-l-2 border-ok/40 pl-6" data-testid="timeline">
            {(['next1', 'next2', 'next3', 'next4'] as StrKey[]).map((k, i) => (
              <li key={k} className="relative pb-5">
                <span className={`absolute -left-[2.05rem] top-1.5 h-4 w-4 rounded-full border-2 border-ok ${i === 0 ? 'bg-ok' : 'bg-ok-field'}`} aria-hidden />
                <span className="text-lg text-ink">{t(k)}</span>
              </li>
            ))}
          </ol>
          <button className="link mb-4" onClick={props.onWritten} data-testid="see-written">
            {t('seeWritten')} →
          </button>
        </section>
      </main>

      <div className="action-zone on-ok">
        <a href="tel:1930" className="btn-main" data-testid="call-1930">
          <PhoneIcon className="w-6 h-6" /> {t('callNowBig')}
        </a>
      </div>
    </div>
  );
}
