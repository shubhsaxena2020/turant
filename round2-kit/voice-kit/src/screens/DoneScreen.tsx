// The success moment: calm, not a party (no confetti — Robinhood lesson).
// A tick that draws itself, one validating line, the time that matters, a giant number.
import { useEffect, useMemo } from 'react';
import type { ActionDef, Entry } from '../domain/types';
import { makeCtx, resolveAction } from '../lib/outputs';
import { tx } from '../lib/lang';
import { cue } from '../lib/cues';
import { CopyButton } from '../components/CopyButton';
import { CopyIcon, ExternalIcon, PhoneIcon, ShareIcon, SpeakerIcon, WhatsAppIcon } from '../components/icons';
import type { UI } from '../ui';

export function ActionIcon({ a, className }: { a: ActionDef; className: string }) {
  const icon = a.icon ?? (a.kind === 'tel' ? 'phone' : a.kind === 'whatsapp' ? 'whatsapp' : a.kind === 'copy' ? 'copy' : 'external');
  if (icon === 'phone') return <PhoneIcon className={className} />;
  if (icon === 'whatsapp') return <WhatsAppIcon className={className} />;
  if (icon === 'copy') return <CopyIcon className={className} />;
  if (icon === 'share') return <ShareIcon className={className} />;
  return <ExternalIcon className={className} />;
}

export function DoneScreen(props: { ui: UI; entry: Entry; onWritten: () => void }) {
  const { ui, entry } = props;
  const { t, cfg } = ui;
  const d = cfg.done;
  const ctx = useMemo(() => makeCtx(cfg, entry, ui.lang), [cfg, entry, ui.lang]);
  const script = useMemo(() => d.script?.(entry, { ...ctx, aloud: false }) ?? [], [d, entry, ctx]);
  const primary = resolveAction(d.primary, entry, ctx);

  useEffect(() => {
    cue('success');
    void ui.say((l) => [tx(d.title, l), tx(d.sub, l), tx(d.urgent, l)].filter(Boolean).join('. '));
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
            {ui.tx(d.title)}
          </h1>
          <p className="mt-1 text-lg text-body">{ui.tx(d.sub)}</p>
        </section>

        {d.urgent ? <p className="mt-6 bg-amber-field px-5 py-3 text-lg font-semibold text-amber">{ui.tx(d.urgent)}</p> : null}

        <section className="px-5 pt-6">
          {d.big ? (
            <a href={d.big.href} className="block font-display text-[4.5rem] leading-none font-bold text-ink tabular-nums" aria-label={ui.tx(d.primary.label)}>
              {d.big.text}
            </a>
          ) : null}
          {script.length ? (
            <>
              <div className={`${d.big ? 'mt-8' : 'mt-2'} flex flex-wrap items-baseline justify-between gap-x-3`}>
                <h2 className="text-title font-display">{ui.tx(d.scriptTitle)}</h2>
                <button className="link shrink-0" onClick={() => void ui.say((l) => (d.script?.(entry, { ...makeCtx(cfg, entry, l), aloud: true }) ?? []).join(' '))}>
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
            </>
          ) : null}

          {d.warning ? <p className="mt-6 text-lg font-semibold text-stop">{ui.tx(d.warning)}</p> : null}

          {d.next?.length ? (
            <>
              <h2 className="mt-10 text-title font-display">{d.nextTitle ? ui.tx(d.nextTitle) : t('nextTitle')}</h2>
              <ol className="relative mt-3 ml-3 border-l-2 border-ok/40 pl-6" data-testid="timeline">
                {d.next.map((n, i) => (
                  <li key={i} className="relative pb-5">
                    <span className={`absolute -left-[2.05rem] top-1.5 h-4 w-4 rounded-full border-2 border-ok ${i === 0 ? 'bg-ok' : 'bg-ok-field'}`} aria-hidden />
                    <span className="text-lg text-ink">{ui.tx(n)}</span>
                  </li>
                ))}
              </ol>
            </>
          ) : null}
          <button className="link mb-4" onClick={props.onWritten} data-testid="see-written">
            {ui.tx(d.seeWritten)} →
          </button>
        </section>
      </main>

      <div className="action-zone on-ok">
        {d.primary.kind === 'copy' ? (
          <CopyButton text={primary.text ?? ''} label={ui.tx(d.primary.label)} doneLabel={t('copiedAll')} variant="main" testId="primary" />
        ) : (
          <a href={primary.href} className="btn-main" data-testid="primary" {...(d.primary.kind === 'tel' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
            <ActionIcon a={d.primary} className="w-6 h-6" /> {ui.tx(d.primary.label)}
          </a>
        )}
      </div>
    </div>
  );
}
