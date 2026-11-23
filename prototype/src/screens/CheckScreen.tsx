// "यह सही है?" — the one explicit read-back. Hero amount, then a GOV.UK-style
// summary list: label above value, a "Change" link, hairlines between rows only.
import { useEffect, useState } from 'react';
import type { Extraction, FieldKey } from '../lib/extract';
import { needsPoliceVisit, setField, SUSPECT_FIELDS, type Report } from '../lib/report';
import { commitAnswer } from '../lib/answer';
import { buildSpokenSummary, displayValue } from '../lib/outputs';
import { cue } from '../lib/cues';
import type { StrKey } from '../i18n/strings';
import { EditSheet, fieldQuestion, FixSheet } from './EditSheet';
import { CheckIcon, MicIcon } from '../components/icons';
import type { UI } from '../ui';

const MAIN: FieldKey[] = ['time', 'scamType', 'bank', 'utr'];

export function CheckScreen(props: { ui: UI; report: Report; onChange: (r: Report) => void; onConfirm: () => void }) {
  const { ui, report } = props;
  const { t } = ui;
  const [edit, setEdit] = useState<FieldKey | null>(null);
  const [fix, setFix] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    void ui.say((l) => buildSpokenSummary(report, l));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = (ext: Extraction, keys: FieldKey[], source: 'voice' | 'typed' | 'tap') => {
    const { report: next } = commitAnswer(report, ext, keys, source);
    const q = fieldQuestion(keys[0]);
    props.onChange({ ...next, skipped: next.skipped.filter((s) => s !== q) });
    cue('captured');
    const v = keys.map((k) => displayValue(k, next.fields, ui.lang)).join(', ');
    setNote(t('changed', { v }));
    void ui.say((l) => (l === ui.lang ? t('changed', { v }) : v));
    setEdit(null);
  };

  const suspects = SUSPECT_FIELDS.filter((k) => report.fields[k] !== undefined);
  const extra: FieldKey[] = [...(report.fields.paymentApp ? (['paymentApp'] as FieldKey[]) : []), ...(suspects.length ? suspects : (['suspectPhone'] as FieldKey[]))];

  const row = (k: FieldKey, label?: string) => {
    const value = displayValue(k, report.fields, ui.lang);
    return (
      <div key={k} className="flex items-start gap-4 py-5" data-testid={`row-${k}`}>
        <div className="flex-1 min-w-0">
          <p className="text-label text-muted">{label ?? t(`f_${k}` as StrKey)}</p>
          {value ? (
            <p className="mt-0.5 text-lg font-medium text-ink break-words">{value}</p>
          ) : (
            <p className="mt-0.5 text-lg font-medium text-amber flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber" aria-hidden /> {t('notKnownYet')}
            </p>
          )}
        </div>
        <button className="link shrink-0" onClick={() => setEdit(k)} data-testid={`change-${k}`}>
          {value ? t('change') : t('tellIt')}
        </button>
      </div>
    );
  };

  const amount = displayValue('amount', report.fields, ui.lang);

  return (
    <div className="flex flex-1 flex-col on-paper">
      <main className="flex-1 px-5 pt-4 page-in">
        <h1 className="text-display font-display">{t('checkTitle')}</h1>
        <p className="mt-1 text-lg text-body">{t('checkSub')}</p>

        <section className="mt-8" data-testid="row-amount">
          <p className="text-label text-muted">{t('f_amount')}</p>
          <div className="flex items-end gap-4">
            {amount ? (
              <p className="flex-1 text-hero font-display tabular-nums">{amount}</p>
            ) : (
              <p className="flex-1 text-title text-amber">{t('notKnownYet')}</p>
            )}
            <button className="link shrink-0" onClick={() => setEdit('amount')} data-testid="change-amount">
              {amount ? t('change') : t('tellIt')}
            </button>
          </div>
        </section>

        <section className="rows mt-4">{MAIN.map((k) => row(k, k === 'utr' ? t('utrGloss') : undefined))}</section>

        <h2 className="mt-10 text-title font-display">{t('moreInfo')}</h2>
        <section className="rows">{extra.map((k) => row(k))}</section>

        {needsPoliceVisit(report.fields) ? (
          <p className="-mx-5 mt-8 bg-amber-field px-5 py-4 text-lg text-amber font-medium">{t('policeAdvice')}</p>
        ) : null}
      </main>

      <div className="action-zone">
        {/* In the thumb zone so it is seen whichever row was changed (it stays, no vanishing toast). */}
        <p className="mb-3 flex items-center gap-2 text-lg text-ok font-semibold empty:hidden" aria-live="polite" data-testid="changed-note">
          {note ? (
            <>
              <CheckIcon className="w-6 h-6 shrink-0" /> {note}
            </>
          ) : null}
        </p>
        <button className="btn-main" onClick={props.onConfirm} data-testid="all-right">
          <CheckIcon className="w-6 h-6" /> {t('yesAllRight')}
        </button>
        {ui.voice ? (
          <div className="flex justify-center">
            <button className="link" onClick={() => setFix(true)}>
              <MicIcon className="w-5 h-5" /> {t('fixByVoiceLink')}
            </button>
          </div>
        ) : null}
      </div>

      {edit ? <EditSheet ui={ui} report={report} field={edit} onSave={save} onClose={() => setEdit(null)} /> : null}
      {fix ? (
        <FixSheet
          ui={ui}
          onClose={() => setFix(false)}
          onFix={(field, value) => {
            const next = setField(report, field, { value, confidence: 1, source: 'voice' });
            props.onChange(next);
            const v = displayValue(field, next.fields, ui.lang) ?? String(value);
            setNote(t('changed', { v }));
            cue('captured');
            void ui.say((l) => (l === ui.lang ? t('changed', { v }) : v));
            setFix(false);
          }}
        />
      ) : null}
    </div>
  );
}
