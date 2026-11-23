// The output is a document, not a textarea: typeset serif text on a sand band, one
// sticky "copy all" that confirms in place, then extra sections and a checklist.
import { useMemo } from 'react';
import type { Entry } from '../domain/types';
import { makeCtx, resolveAction, spokenSummary } from '../lib/outputs';
import { CopyButton } from '../components/CopyButton';
import { CheckIcon, SpeakerIcon } from '../components/icons';
import { ActionIcon } from './DoneScreen';
import type { UI } from '../ui';

/** Render the plain-text document as typeset text (line 1 title, line 2 subtitle, "1. SECTION", "Label: value"). */
function Typeset({ text, lang }: { text: string; lang: string }) {
  const lines = text.split('\n');
  return (
    <div className="font-serif text-ink" lang={lang}>
      {lines.map((line, i) => {
        if (i === 0) return <h3 key={i} className="text-title leading-snug">{line}</h3>;
        if (i === 1) return <p key={i} className="text-label text-muted">{line}</p>;
        if (!line.trim()) return <div key={i} className="h-3" />;
        if (/^\d\.\s+[A-Z'’ (),/-]+$/.test(line))
          return (
            <h4 key={i} className="mt-4 mb-1 font-sans text-label font-bold uppercase tracking-wide text-muted">
              {line.replace(/^\d\.\s+/, '')}
            </h4>
          );
        const m = /^([A-Za-z][A-Za-z0-9./ ()-]{1,38}):\s(.+)$/.exec(line);
        if (m)
          return (
            <p key={i} className="py-1 text-base">
              <span className="text-muted">{m[1]}</span>
              <br />
              <strong className="font-semibold">{m[2]}</strong>
            </p>
          );
        return (
          <p key={i} className="text-base leading-[1.8]">
            {line}
          </p>
        );
      })}
    </div>
  );
}

export function DocumentScreen(props: { ui: UI; entry: Entry; onChange: (r: Entry) => void; onNew: () => void }) {
  const { ui, entry } = props;
  const { t, cfg } = ui;
  const doc = cfg.document;
  const ctx = useMemo(() => makeCtx(cfg, entry, ui.lang), [cfg, entry, ui.lang]);
  const text = useMemo(() => doc.build(entry, ctx), [doc, entry, ctx]);
  const badge = doc.badge?.(entry, ctx);
  const items = doc.checklist?.items ?? [];
  const checks = entry.checks ?? items.map(() => false);

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 page-in">
        <section className="px-5 pt-4">
          <h1 className="text-display font-display">{ui.tx(doc.title)}</h1>
          <p className="mt-1 text-lg text-body">{ui.tx(doc.sub)}</p>
          <button className="link" onClick={() => void ui.say((l) => spokenSummary(cfg, entry, l))}>
            <SpeakerIcon className="w-5 h-5" /> {t('hearSummary')}
          </button>
        </section>

        <section className="mt-6 bg-sand px-5 py-7" data-testid="document">
          <Typeset text={text} lang={doc.lang ?? 'en'} />
        </section>
        {entry.summary ? (
          <p className="px-5 pt-3 text-label text-amber font-semibold" data-testid="ai-note">
            {t('aiSummary')}
          </p>
        ) : null}
        {badge ? (
          <p className="px-5 pt-3 flex items-center gap-2 text-label text-ok font-semibold" data-testid="badge">
            <CheckIcon className="w-5 h-5" /> {badge}
          </p>
        ) : null}

        {doc.actions?.length ? (
          <nav className="px-5 flex flex-col items-start">
            {doc.actions.map((a, i) => {
              const r = resolveAction(a, entry, ctx);
              if (a.kind === 'copy') return <CopyButton key={i} text={r.text ?? ''} label={ui.tx(a.label)} doneLabel={t('copiedAll')} variant="link" testId={`action-${i}`} />;
              return (
                <a key={i} className="link" href={r.href} data-testid={`action-${i}`} {...(a.kind === 'tel' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
                  <ActionIcon a={a} className="w-5 h-5" /> {ui.tx(a.label)}
                </a>
              );
            })}
          </nav>
        ) : null}

        {(doc.sections ?? []).map((s, i) => {
          const body = s.build(entry, ctx);
          return (
            <section key={i} className="px-5 mt-14" data-testid={`section-${i}`}>
              <h2 className="text-title font-display">{ui.tx(s.title)}</h2>
              <div className="mt-3 font-serif text-base leading-[1.8] text-ink whitespace-pre-line">{body}</div>
              <CopyButton text={body} label={s.copyLabel ? ui.tx(s.copyLabel) : t('copy')} doneLabel={t('copiedAll')} variant="link" testId={`copy-section-${i}`} />
            </section>
          );
        })}

        {doc.checklist || doc.ack ? (
          <section className="px-5 mt-14">
            {doc.checklist ? (
              <>
                <h2 className="text-title font-display">{ui.tx(doc.checklist.title)}</h2>
                <div className="rows mt-2">
                  {items.map((k, i) => (
                    <button
                      key={i}
                      role="checkbox"
                      aria-checked={checks[i]}
                      className="flex w-full items-start gap-4 py-4 text-left"
                      onClick={() => props.onChange({ ...entry, checks: checks.map((c, j) => (j === i ? !c : c)) })}
                    >
                      <span className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 ${checks[i] ? 'border-ok bg-ok text-white' : 'border-muted'}`}>
                        {checks[i] ? <CheckIcon className="w-4 h-4" /> : null}
                      </span>
                      <span className={`text-lg ${checks[i] ? 'text-muted line-through decoration-1' : 'text-ink'}`}>{ui.tx(k)}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            {doc.ack ? (
              <>
                <label className="mt-6 block text-label text-muted" htmlFor="ack">
                  {ui.tx(doc.ack.label)}
                </label>
                <input
                  id="ack"
                  className="line-input font-display tabular-nums"
                  value={entry.ack ?? ''}
                  placeholder={ui.tx(doc.ack.placeholder)}
                  onChange={(e) => props.onChange({ ...entry, ack: e.target.value })}
                />
              </>
            ) : null}
          </section>
        ) : null}

        <section className="px-5 mt-12 mb-4">
          <button className="link" onClick={props.onNew} data-testid="new">
            {t('newReport')}
          </button>
          <p className="text-label text-muted">{t('privacyNote')}</p>
        </section>
      </main>

      <div className="action-zone">
        <CopyButton text={text} label={doc.copyAllLabel ? ui.tx(doc.copyAllLabel) : t('copy')} doneLabel={t('copiedAll')} variant="main" testId="copy-all" />
      </div>
    </div>
  );
}
