// The complaint is a document, not a textarea: typeset serif text on a sand band,
// one sticky "copy all" that confirms in place, then the bank message and checklist.
import { useMemo } from 'react';
import type { Report } from '../lib/report';
import { buildBankMessage, buildComplaintText, buildFamilyMessage, buildPortalDescription, buildSpokenSummary, whatsappLink } from '../lib/outputs';
import type { StrKey } from '../i18n/strings';
import { CopyButton } from '../components/CopyButton';
import { CheckIcon, ExternalIcon, SpeakerIcon, WhatsAppIcon } from '../components/icons';
import type { UI } from '../ui';

const CHECKS: StrKey[] = ['check_block', 'check_pin', 'check_otp', 'check_screens', 'check_ack'];

/** Render the plain-text complaint as a typeset document. */
function Typeset({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="font-serif text-ink" lang="en">
      {lines.map((line, i) => {
        if (i === 0) return <h3 key={i} className="text-title leading-snug">{line}</h3>;
        if (i === 1) return <p key={i} className="text-label text-muted">{line}</p>;
        if (!line.trim()) return <div key={i} className="h-3" />;
        if (/^\d\.\s+[A-Z'’ ]+(?:\s\([^)]*\))?$/.test(line))
          return (
            <h4 key={i} className="mt-4 mb-1 font-sans text-label font-bold uppercase tracking-wide text-muted">
              {line.replace(/^\d\.\s+/, '')}
            </h4>
          );
        const m = /^([A-Za-z][A-Za-z./ ()-]{1,38}):\s(.+)$/.exec(line);
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

export function DocumentScreen(props: { ui: UI; report: Report; onChange: (r: Report) => void; onNew: () => void }) {
  const { ui, report } = props;
  const { t } = ui;
  const complaint = useMemo(() => buildComplaintText(report), [report]);
  const description = useMemo(() => buildPortalDescription(report), [report]);
  const bank = useMemo(() => buildBankMessage(report), [report]);
  const family = useMemo(() => buildFamilyMessage(report, ui.lang), [report, ui.lang]);
  const checks = report.checks ?? CHECKS.map(() => false);

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 page-in">
        <section className="px-5 pt-4">
          <div className="flex items-baseline justify-between gap-3">
            <h1 className="text-display font-display">{t('docTitle')}</h1>
          </div>
          <p className="mt-2 text-lg text-ink/70">{t('docSub')}</p>
          <button className="link" onClick={() => void ui.say((l) => buildSpokenSummary(report, l))}>
            <SpeakerIcon className="w-5 h-5" /> {t('hearSummary')}
          </button>
        </section>

        <section className="mt-6 bg-sand px-5 py-7" data-testid="complaint">
          <Typeset text={complaint} />
        </section>
        <p className="px-5 pt-3 flex items-center gap-2 text-label text-ok font-semibold">
          <CheckIcon className="w-5 h-5" /> {t('portalReady')} · {t('portalChars', { n: description.length })}
        </p>

        <nav className="px-5 flex flex-col items-start">
          <CopyButton text={description} label={t('copyDesc')} doneLabel={t('copiedAll')} variant="link" testId="copy-desc" />
          <a className="link" href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">
            <ExternalIcon className="w-5 h-5" /> {t('openPortal')}
          </a>
          <a className="link" href={whatsappLink(family)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="w-5 h-5" /> {t('whatsappFamily')}
          </a>
        </nav>

        <section className="px-5 mt-14">
          <h2 className="text-title font-display">{t('bankMsgTitle')}</h2>
          <div className="mt-3 font-serif text-base leading-[1.8] text-ink whitespace-pre-line" lang="en">
            {bank}
          </div>
          <CopyButton text={bank} label={t('copy')} doneLabel={t('copiedAll')} variant="link" testId="copy-bank" />
        </section>

        <section className="px-5 mt-14">
          <h2 className="text-title font-display">{t('checklistTitle')}</h2>
          <div className="rows mt-2">
            {CHECKS.map((k, i) => (
              <button
                key={k}
                role="checkbox"
                aria-checked={checks[i]}
                className="flex w-full items-start gap-4 py-4 text-left"
                onClick={() => props.onChange({ ...report, checks: checks.map((c, j) => (j === i ? !c : c)) })}
              >
                <span className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 ${checks[i] ? 'border-ok bg-ok text-white' : 'border-muted'}`}>
                  {checks[i] ? <CheckIcon className="w-4 h-4" /> : null}
                </span>
                <span className={`text-lg ${checks[i] ? 'text-muted line-through decoration-1' : 'text-ink'}`}>{t(k)}</span>
              </button>
            ))}
          </div>
          <label className="mt-6 block text-label text-muted" htmlFor="ack">
            {t('ackLabel')}
          </label>
          <input
            id="ack"
            className="line-input font-display tabular-nums"
            value={report.ack ?? ''}
            placeholder={t('ackPlaceholder')}
            onChange={(e) => props.onChange({ ...report, ack: e.target.value })}
          />
        </section>

        <section className="px-5 mt-12 mb-4">
          <button className="link" onClick={props.onNew}>
            {t('newReport')}
          </button>
          <p className="text-label text-muted">{t('privacyNote')}</p>
        </section>
      </main>

      <div className="action-zone">
        <CopyButton text={complaint} label={t('copyAll')} doneLabel={t('copiedAll')} variant="main" testId="copy-all" />
      </div>
    </div>
  );
}
