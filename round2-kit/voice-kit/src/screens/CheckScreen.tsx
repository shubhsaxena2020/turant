// "Is this right?": the one explicit read-back. A hero value, then a GOV.UK-style
// summary list: label above value, a "Change" link, hairlines between rows only.
import { useEffect, useState } from 'react';
import type { Entry } from '../domain/types';
import { setField } from '../lib/record';
import { commitAnswer } from '../lib/answer';
import { questionKeyOf, slotOf, type Extraction } from '../lib/slots';
import { displayValue } from '../lib/values';
import { spokenSummary } from '../lib/outputs';
import { cue } from '../lib/cues';
import { EditSheet, FixSheet } from './EditSheet';
import { CheckIcon, MicIcon } from '../components/icons';
import type { UI } from '../ui';

export function CheckScreen(props: { ui: UI; entry: Entry; onChange: (r: Entry) => void; onConfirm: () => void }) {
  const { ui, entry } = props;
  const { t, cfg } = ui;
  const [edit, setEdit] = useState<string | null>(null);
  const [fix, setFix] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    void ui.say((l) => spokenSummary(cfg, entry, l));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changedNote = (keys: string[], next: Entry) => {
    const v = keys.map((k) => displayValue(cfg, k, next.fields, ui.lang)).join(', ');
    setNote(t('changed', { v }));
    cue('captured');
    void ui.say((l) => (l === ui.lang ? t('changed', { v }) : v));
  };

  const save = (ext: Extraction, keys: string[], source: 'voice' | 'typed' | 'tap') => {
    const { entry: next } = commitAnswer(cfg, entry, ext, keys, source);
    const q = questionKeyOf(cfg, keys[0]);
    props.onChange({ ...next, skipped: next.skipped.filter((s) => s !== q) });
    changedNote(keys, next);
    setEdit(null);
  };

  const f = entry.fields;
  const moreRows = (cfg.check.more ?? []).flatMap((r) => {
    if (typeof r === 'string') return f[r] !== undefined ? [r] : [];
    const filled = r.any.filter((k) => f[k] !== undefined);
    return filled.length ? filled : [r.empty];
  });

  const row = (k: string) => {
    const slot = slotOf(cfg, k);
    const value = displayValue(cfg, k, f, ui.lang);
    return (
      <div key={k} className="flex items-start gap-4 py-5" data-testid={`row-${k}`}>
        <div className="flex-1 min-w-0">
          <p className="text-label text-muted">{ui.tx(slot?.checkLabel ?? slot?.label)}</p>
          {value ? (
            <>
              <p className="mt-0.5 text-lg font-medium text-ink break-words">{value}</p>
              {f[k]?.source === 'llm' ? <p className="text-label text-amber">{t('aiSuggested')}</p> : null}
            </>
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

  const hero = cfg.check.hero;
  const heroSlot = hero ? slotOf(cfg, hero) : undefined;
  const heroValue = hero ? displayValue(cfg, hero, f, ui.lang) : undefined;
  const notice = cfg.check.notice?.(f, new Date());

  return (
    <div className="flex flex-1 flex-col on-paper">
      <main className="flex-1 px-5 pt-4 page-in">
        <h1 className="text-display font-display">{t('checkTitle')}</h1>
        <p className="mt-1 text-lg text-body">{t('checkSub')}</p>

        {hero && heroSlot ? (
          <section className="mt-8" data-testid={`row-${hero}`}>
            <p className="text-label text-muted">{ui.tx(heroSlot.checkLabel ?? heroSlot.label)}</p>
            <div className="flex items-end gap-4">
              {heroValue ? (
                <p className={`flex-1 min-w-0 font-display tabular-nums break-words ${heroValue.length > 14 ? 'text-display' : 'text-hero'}`}>{heroValue}</p>
              ) : (
                <p className="flex-1 text-title text-amber">{t('notKnownYet')}</p>
              )}
              <button className="link shrink-0" onClick={() => setEdit(hero)} data-testid={`change-${hero}`}>
                {heroValue ? t('change') : t('tellIt')}
              </button>
            </div>
          </section>
        ) : null}

        <section className="rows mt-4">{cfg.check.main.map((k) => row(k))}</section>

        {moreRows.length ? (
          <>
            <h2 className="mt-10 text-title font-display">{cfg.check.moreTitle ? ui.tx(cfg.check.moreTitle) : t('moreInfo')}</h2>
            <section className="rows">{moreRows.map((k) => row(k))}</section>
          </>
        ) : null}

        {notice ? (
          <p className="-mx-5 mt-8 bg-amber-field px-5 py-4 text-lg text-amber font-medium" data-testid="notice">
            {ui.tx(notice)}
          </p>
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

      {edit ? <EditSheet ui={ui} entry={entry} field={edit} onSave={save} onClose={() => setEdit(null)} /> : null}
      {fix ? (
        <FixSheet
          ui={ui}
          onClose={() => setFix(false)}
          onFix={(field, value) => {
            const next = setField(entry, field, { value, confidence: 1, source: 'voice' });
            props.onChange(next);
            changedNote([field], next);
            setFix(false);
          }}
        />
      ) : null}
    </div>
  );
}
