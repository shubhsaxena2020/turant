// Fix one fact: hear it, say it again, press numbers, choose, or type.
// Never restarts the flow (research: one-step corrections, nothing is ever lost).
import { useState } from 'react';
import { extractFields, parseCorrection, SCAM_TYPES, type Extraction, type FieldKey } from '../lib/extract';
import type { QuestionKey, Report } from '../lib/report';
import { SUSPECT_FIELDS } from '../lib/report';
import { keypadField, PAYMENT_APPS, TOP_BANKS } from '../lib/choices';
import { shownValues, spokenValues } from '../lib/answer';
import { displayValue, spokenValue } from '../lib/outputs';
import { toLocalInput } from '../lib/format';
import { useListen } from '../lib/useListen';
import { scamLabel, t as tr, type StrKey } from '../i18n/strings';
import { Presence } from '../components/Presence';
import { Keypad } from '../components/Keypad';
import { Row, Sheet } from '../components/Sheet';
import { CheckIcon, KeyboardIcon, MicIcon, SpeakerIcon } from '../components/icons';
import type { UI } from '../ui';

export const fieldQuestion = (f: FieldKey): QuestionKey | null =>
  f === 'paymentApp' ? null : SUSPECT_FIELDS.includes(f) ? 'suspect' : (f as QuestionKey);

type Mode = 'menu' | 'listen' | 'confirm' | 'keypad' | 'choices' | 'type';

function interpretFor(field: FieldKey, text: string): { ext: Extraction; keys: FieldKey[] } | null {
  const hint = SUSPECT_FIELDS.includes(field) ? 'suspect' : field;
  const ext = extractFields(text, { now: new Date(), hint });
  const pool = SUSPECT_FIELDS.includes(field) ? SUSPECT_FIELDS : [field];
  const keys = pool.filter((k) => ext[k] !== undefined);
  return keys.length ? { ext, keys } : null;
}

export function EditSheet(props: { ui: UI; report: Report; field: FieldKey; onSave: (ext: Extraction, keys: FieldKey[], source: 'voice' | 'typed' | 'tap') => void; onClose: () => void }) {
  const { ui, report, field } = props;
  const { t } = ui;
  const mic = useListen();
  const [mode, setMode] = useState<Mode>('menu');
  const [pending, setPending] = useState<{ ext: Extraction; keys: FieldKey[] } | null>(null);
  const [miss, setMiss] = useState(false);
  const [typed, setTyped] = useState(field === 'time' && report.fields.time ? toLocalInput(String(report.fields.time.value)) : '');
  const kp = keypadField(field);
  const has = report.fields[field] !== undefined;
  const title = t(`f_${field}` as StrKey);

  const listen = () => {
    setMode('listen');
    setMiss(false);
    mic.start({
      lang: ui.lang,
      silenceMs: 2000,
      onOutcome: (o) => {
        if (o.kind !== 'heard') {
          setMiss(true);
          return;
        }
        const r = interpretFor(field, o.text);
        if (!r) {
          setMiss(true);
          void ui.say((l) => tr(l, 'reprompt'));
          return;
        }
        setPending(r);
        setMode('confirm');
        void ui.say((l) => tr(l, 'confirmQ', { v: spokenValues(r.ext, r.keys, l) }));
      },
    });
  };

  const choices: [string, string][] =
    field === 'scamType'
      ? SCAM_TYPES.map((s) => [s, scamLabel(ui.lang, s)])
      : field === 'bank'
        ? TOP_BANKS.map((b) => [b, b])
        : field === 'paymentApp'
          ? PAYMENT_APPS.map((b) => [b, b])
          : [];

  const saveTap = (value: string | number) => props.onSave({ [field]: { value, confidence: 1 } } as Extraction, [field], 'tap');

  const saveTyped = () => {
    const text = typed.trim();
    if (!text) return;
    if (field === 'time') {
      const d = new Date(text);
      if (!Number.isNaN(d.getTime())) return props.onSave({ time: { value: d.toISOString(), confidence: 1 } }, ['time'], 'typed');
    }
    const r = interpretFor(field, text);
    if (r) return props.onSave(r.ext, r.keys, 'typed');
    if (field === 'suspectUpi' || field === 'bank') return props.onSave({ [field]: { value: text, confidence: 0.8 } } as Extraction, [field], 'typed');
    setMiss(true);
  };

  return (
    <Sheet title={title} closeLabel={t('closeSheet')} onClose={() => (mic.abort(), props.onClose())} testId="sheet-edit">
      {has ? <p className="text-title font-display tabular-nums break-words">{displayValue(field, report.fields, ui.lang)}</p> : null}

      {mode === 'menu' ? (
        <div className="rows mt-2">
          {has ? (
            <Row onClick={() => void ui.say((l) => spokenValue(field, report.fields, l) ?? '')}>
              <SpeakerIcon className="w-6 h-6 text-teal" /> {t('listenValue')}
            </Row>
          ) : null}
          {ui.voice ? (
            <Row onClick={listen} testId="edit-say">
              <MicIcon className="w-6 h-6 text-teal" /> {t('sayAgain')}
            </Row>
          ) : null}
          {kp ? (
            <Row onClick={() => setMode('keypad')} testId="edit-keypad">
              <span className="w-6 text-center font-bold text-teal">123</span> {t('pressNumbers')}
            </Row>
          ) : null}
          {choices.length ? (
            <Row onClick={() => setMode('choices')} testId="edit-choices">
              <span className="w-6 text-center font-bold text-teal">≡</span> {t('chooseInstead')}
            </Row>
          ) : null}
          {!kp || SUSPECT_FIELDS.includes(field) ? (
            <Row onClick={() => setMode('type')} testId="edit-type">
              <KeyboardIcon className="w-6 h-6 text-teal" /> {t('typeIt')}
            </Row>
          ) : null}
        </div>
      ) : null}

      {mode === 'listen' ? (
        <div className="-mx-5 mt-3 bg-night px-5 py-6 text-night-text on-night flex flex-col items-center gap-3">
          <p className="min-h-[3rem] self-stretch text-title break-words">{mic.live || (miss ? t('reprompt') : '')}</p>
          <Presence state={mic.listening ? 'listening' : 'idle'} level={mic.level} label={mic.listening ? t('state_listening') : t('state_idle')} onPress={() => (mic.listening ? mic.stop() : listen())} small />
        </div>
      ) : null}

      {mode === 'confirm' && pending ? (
        <div className="mt-3">
          <p className="text-lg text-muted">{t('iHeard')}</p>
          <p className="text-hero font-display tabular-nums break-words">{shownValues(pending.ext, pending.keys, ui.lang)}</p>
          <button className="btn-main mt-4" onClick={() => props.onSave(pending.ext, pending.keys, 'voice')} data-testid="edit-confirm">
            <CheckIcon className="w-6 h-6" /> {t('yesRight')}
          </button>
          <button className="link mt-1" onClick={listen}>
            {t('noAgain')}
          </button>
        </div>
      ) : null}

      {mode === 'keypad' && kp ? (
        <div className="mt-2">
          <Keypad field={kp} doneLabel={t('save')} onDone={(d) => props.onSave({ [kp]: { value: kp === 'amount' ? Number(d) : d, confidence: 1 } } as Extraction, [kp], 'tap')} />
        </div>
      ) : null}

      {mode === 'choices' ? (
        <div className="rows mt-2">
          {choices.map(([value, text]) => (
            <Row key={value} onClick={() => saveTap(value)} selected={String(report.fields[field]?.value) === value} testId={`choice-${value}`}>
              {text}
            </Row>
          ))}
        </div>
      ) : null}

      {mode === 'type' ? (
        <div className="mt-3">
          <input
            className="line-input"
            autoFocus
            type={field === 'time' ? 'datetime-local' : 'text'}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveTyped()}
            placeholder={fieldQuestion(field) ? t(`ex_${fieldQuestion(field)}` as StrKey).replace(/"/g, '') : ''}
          />
          {miss ? <p className="mt-2 text-amber">{t('couldNotFix')}</p> : null}
          <button className="btn-main mt-5" onClick={saveTyped} disabled={!typed.trim()}>
            {t('save')}
          </button>
        </div>
      ) : null}
    </Sheet>
  );
}

/** "Change something by speaking": one-step voice corrections like "amount 5999 tha". */
export function FixSheet(props: { ui: UI; onFix: (field: FieldKey, value: string | number) => void; onClose: () => void }) {
  const { ui } = props;
  const { t } = ui;
  const mic = useListen();
  const [msg, setMsg] = useState(t('fixPrompt'));
  const listen = () =>
    mic.start({
      lang: ui.lang,
      silenceMs: 2000,
      onOutcome: (o) => {
        if (o.kind !== 'heard') return setMsg(t('fixPrompt'));
        const c = parseCorrection(o.text, { now: new Date() });
        if (!c) {
          setMsg(t('couldNotFix'));
          void ui.say((l) => tr(l, 'couldNotFix'));
          return;
        }
        props.onFix(c.field, c.value);
      },
    });
  return (
    <Sheet title={t('fixByVoiceLink')} closeLabel={t('closeSheet')} onClose={() => (mic.abort(), props.onClose())} testId="sheet-fix">
      <div className="-mx-5 mt-2 bg-night px-5 py-6 text-night-text on-night flex flex-col items-center gap-4">
        <p className="self-stretch text-title break-words min-h-[3rem]">{mic.live || msg}</p>
        <Presence state={mic.listening ? 'listening' : 'idle'} level={mic.level} label={mic.listening ? t('state_listening') : t('state_idle')} onPress={() => (mic.listening ? mic.stop() : listen())} small />
      </div>
    </Sheet>
  );
}
