import { useEffect, useState } from 'react';
import { extractFields, FIELD_ORDER, parseCorrection, SCAM_TYPES, type FieldKey, type ScamType } from '../lib/extract';
import { needsPoliceVisit, REQUIRED, setField, type FieldValue, type QuestionKey, type Report } from '../lib/report';
import { buildSpokenSummary, displayValue, spokenValue } from '../lib/outputs';
import { toLocalInput } from '../lib/format';
import { scamLabel, t as tr, type StrKey } from '../i18n/strings';
import { VoiceCapture } from '../components/VoiceCapture';
import { ConfidenceDot } from '../components/common';
import { PencilIcon, SpeakerIcon } from '../components/icons';
import type { UI } from '../ui';

function parseTyped(field: FieldKey, raw: string): string | number | undefined {
  const v = raw.trim();
  if (!v) return undefined;
  switch (field) {
    case 'amount': {
      const n = Number(v.replace(/[^\d.]/g, ''));
      return n > 0 ? n : extractFields(v, { hint: 'amount' }).amount?.value;
    }
    case 'time': {
      const d = new Date(v);
      return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
    }
    case 'bank':
      return extractFields(v, { hint: 'bank' }).bank?.value ?? v;
    case 'utr':
    case 'suspectPhone':
    case 'suspectAccount': {
      const d = v.replace(/\D/g, '');
      return d.length >= 4 ? d : undefined;
    }
    default:
      return v;
  }
}

function FieldCard(props: { ui: UI; report: Report; field: FieldKey; flash: boolean; onSave: (v: FieldValue) => void; onAdd: () => void }) {
  const { ui, report, field } = props;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const fv = report.fields[field];
  const required = (REQUIRED as FieldKey[]).includes(field);
  const shown = displayValue(field, report.fields, ui.lang);
  const isId = field === 'utr' || field === 'suspectPhone' || field === 'suspectAccount' || field === 'suspectUpi';

  const begin = () => {
    setDraft(
      !fv
        ? ''
        : field === 'time'
          ? toLocalInput(String(fv.value))
          : field === 'suspectAccount'
            ? ''
            : String(fv.value),
    );
    setEditing(true);
  };
  const save = () => {
    const value = parseTyped(field, draft);
    if (value !== undefined) props.onSave({ value, confidence: 1, source: 'edited' });
    setEditing(false);
  };

  return (
    <li className={`paper-card p-4 ${props.flash ? 'flash' : ''} ${!fv && required ? 'border-alarm/60 border-dashed' : ''}`} data-testid={`card-${field}`}>
      <div className="flex items-center gap-2">
        <span className="label-caps flex-1">{ui.t(`f_${field}` as StrKey)}</span>
        {fv ? <ConfidenceDot c={fv.confidence} ui={ui} /> : null}
        {!editing ? (
          <button className="w-11 h-11 -mr-1 rounded-xl flex items-center justify-center hover:bg-paper" onClick={begin} aria-label={`${ui.t('edit')} ${ui.t(`f_${field}` as StrKey)}`}>
            <PencilIcon className="w-5 h-5" />
          </button>
        ) : null}
      </div>
      {editing ? (
        <div className="mt-2 flex flex-col gap-2">
          {field === 'scamType' ? (
            <select value={draft} onChange={(e) => setDraft(e.target.value)} className="w-full min-h-[52px] rounded-xl border-[1.5px] border-ink bg-white px-3 text-[1.05rem]">
              <option value="" disabled>
                —
              </option>
              {SCAM_TYPES.map((s: ScamType) => (
                <option key={s} value={s}>
                  {scamLabel(ui.lang, s)}
                </option>
              ))}
            </select>
          ) : (
            <input
              autoFocus
              type={field === 'time' ? 'datetime-local' : 'text'}
              inputMode={field === 'amount' || isId && field !== 'suspectUpi' ? 'numeric' : 'text'}
              value={draft}
              placeholder={field === 'suspectAccount' && fv ? displayValue(field, report.fields, ui.lang) : ''}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && save()}
              className="w-full min-h-[52px] rounded-xl border-[1.5px] border-ink bg-white px-3 text-[1.1rem]"
            />
          )}
          <div className="grid grid-cols-2 gap-2">
            <button className="btn-primary min-h-[50px]" onClick={save}>
              {ui.t('save')}
            </button>
            <button className="btn-quiet min-h-[50px]" onClick={() => setEditing(false)}>
              {ui.t('cancel')}
            </button>
          </div>
        </div>
      ) : shown ? (
        <p className={`mt-1 text-[1.35rem] font-extrabold leading-tight break-words ${isId ? 'font-mono tracking-tight' : ''}`}>{shown}</p>
      ) : required ? (
        <div className="mt-1 flex items-center justify-between">
          <span className="font-bold text-alarm">{ui.t('needed')}</span>
          <button className="btn-ghost min-h-[46px] px-4" onClick={props.onAdd}>
            {ui.t('add')}
          </button>
        </div>
      ) : (
        <p className="mt-1 text-ink-faint font-semibold">{ui.t('notGiven')}</p>
      )}
    </li>
  );
}

export function ReviewScreen(props: { ui: UI; report: Report; onChange: (r: Report) => void; onAsk: (q: QuestionKey) => void; onConfirm: () => void }) {
  const { ui, report } = props;
  const [flash, setFlash] = useState<FieldKey | null>(null);
  const [fixing, setFixing] = useState(false);
  const [round, setRound] = useState(0);
  const [note, setNote] = useState<string | null>(null);

  const readAll = () => ui.say((l) => buildSpokenSummary(report, l));
  useEffect(() => {
    void readAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apply = (field: FieldKey, v: FieldValue) => {
    const next = setField(report, field, v);
    props.onChange(next);
    setFlash(field);
    setTimeout(() => setFlash(null), 1700);
    const label = ui.t(`f_${field}` as StrKey);
    setNote(`${ui.t('updated', { field: label })}: ${displayValue(field, next.fields, ui.lang)}`);
    void ui.say((l) => `${tr(l, 'updated', { field: tr(l, `f_${field}` as StrKey) })}: ${spokenValue(field, next.fields, l)}. ${tr(l, 'isThisRight')}`);
  };

  const order: FieldKey[] = FIELD_ORDER.filter((k) => (REQUIRED as FieldKey[]).includes(k) || report.fields[k] || k === 'utr' || k === 'suspectUpi');
  const police = needsPoliceVisit(report.fields);

  return (
    <div className="px-4 pt-5 pb-10 flex flex-col gap-4">
      <div>
        <h1 className="text-[1.8rem] font-black leading-tight">{ui.t('reviewTitle')}</h1>
        <p className="mt-1 text-ink-soft leading-snug">{ui.t('reviewHint')}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="btn-ghost" onClick={() => void readAll()}>
          <SpeakerIcon className="w-5 h-5" /> {ui.t('readAloud')}
        </button>
        <button
          className={fixing ? 'btn-primary' : 'btn-ghost'}
          onClick={() => {
            setFixing((f) => !f);
            setRound((r) => r + 1);
          }}
          data-testid="fix-by-voice"
        >
          <PencilIcon className="w-5 h-5" /> {ui.t('fixByVoice')}
        </button>
      </div>

      {fixing ? (
        <VoiceCapture
          key={round}
          ui={ui}
          purpose="correction"
          autoStart={ui.mode === 'voice'}
          micLabel={ui.t('fixByVoice')}
          placeholder="amount galat hai, 5999 tha"
          validate={(text) => parseCorrection(text) !== null}
          invalidMessage={ui.t('couldNotFix')}
          onResult={(text) => {
            const c = parseCorrection(text, { now: new Date() });
            if (!c) return;
            apply(c.field, { value: c.value, confidence: Math.max(c.confidence, 0.9), source: 'voice' });
            setFixing(false);
          }}
        />
      ) : null}

      {note ? (
        <p className="rounded-2xl bg-leaf-soft border-[1.5px] border-leaf/40 px-4 py-3 font-bold text-leaf-dark rise" role="status" data-testid="update-note">
          {note}
        </p>
      ) : null}

      {police ? <p className="rounded-2xl bg-amberx-soft border-[1.5px] border-amberx/50 px-4 py-3 font-semibold leading-snug">{ui.t('policeAdvice')}</p> : null}

      <ul className="flex flex-col gap-3">
        {order.map((k) => (
          <FieldCard
            key={k}
            ui={ui}
            report={report}
            field={k}
            flash={flash === k}
            onSave={(v) => apply(k, v)}
            onAdd={() => props.onAsk(k as QuestionKey)}
          />
        ))}
      </ul>

      <button className="btn-go w-full min-h-[66px] text-[1.2rem] mt-2" onClick={props.onConfirm} data-testid="all-correct">
        {ui.t('allCorrect')}
      </button>
    </div>
  );
}
