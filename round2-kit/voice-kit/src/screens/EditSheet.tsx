// Fix one fact: hear it, say it again, press numbers, choose, or type.
// Never restarts the flow (research: one-step corrections, nothing is ever lost).
import { useState } from 'react';
import type { Entry, SlotValue } from '../domain/types';
import { coerce, extractAll, keypadValue, parseCorrection, slotOf, type Extraction } from '../lib/slots';
import { shownValues, spokenValues } from '../lib/answer';
import { displayValue, spokenValue } from '../lib/values';
import { uiText } from '../lib/outputs';
import { toLocalInput } from '../lib/format';
import { useListen } from '../lib/useListen';
import { Presence } from '../components/Presence';
import { Keypad } from '../components/Keypad';
import { Row, Sheet } from '../components/Sheet';
import { CheckIcon, KeyboardIcon, MicIcon, SpeakerIcon } from '../components/icons';
import type { UI } from '../ui';

type Mode = 'menu' | 'listen' | 'confirm' | 'keypad' | 'choices' | 'type';

export function EditSheet(props: { ui: UI; entry: Entry; field: string; onSave: (ext: Extraction, keys: string[], source: 'voice' | 'typed' | 'tap') => void; onClose: () => void }) {
  const { ui, entry, field } = props;
  const { t, cfg } = ui;
  const slot = slotOf(cfg, field)!;
  const mic = useListen();
  const [mode, setMode] = useState<Mode>('menu');
  const [pending, setPending] = useState<{ ext: Extraction; keys: string[] } | null>(null);
  const [miss, setMiss] = useState(false);
  const cur = entry.fields[field]?.value;
  const [picked, setPicked] = useState<string[]>(Array.isArray(cur) ? (cur as string[]) : []);
  const [typed, setTyped] = useState(slot.type === 'datetime' && cur ? toLocalInput(String(cur)) : '');
  const kp = slot.keypad ? slot : null;
  const has = cur !== undefined;
  const pool = slot.group ? cfg.slots.filter((s) => s.group === slot.group).map((s) => s.key) : [field];

  const interpretFor = (text: string) => {
    const ext = extractAll(cfg, text, { now: new Date(), hint: slot.group ?? field, lang: ui.lang });
    const keys = pool.filter((k) => ext[k] !== undefined);
    return keys.length ? { ext, keys } : null;
  };

  const listen = () => {
    setMode('listen');
    setMiss(false);
    mic.start({
      lang: ui.lang,
      silenceMs: 2000,
      onOutcome: (o) => {
        if (o.kind !== 'heard') return setMiss(true);
        const r = interpretFor(o.text);
        if (!r) {
          setMiss(true);
          void ui.say((l) => uiText(cfg, l, 'reprompt'));
          return;
        }
        setPending(r);
        setMode('confirm');
        void ui.say((l) => uiText(cfg, l, 'confirmQ', { v: spokenValues(cfg, r.ext, r.keys, l) }));
      },
    });
  };

  const options = slot.type === 'enum' ? (slot.choices ?? slot.options.map((o) => o.value)).map((v) => slot.options.find((o) => o.value === v)!).filter(Boolean) : [];
  const multi = slot.type === 'enum' && !!slot.multi;

  const saveValue = (value: SlotValue, source: 'typed' | 'tap') => props.onSave({ [field]: { value, confidence: 1 } }, [field], source);

  const saveTyped = () => {
    const text = typed.trim();
    if (!text) return;
    if (slot.type === 'datetime') {
      const d = new Date(text);
      if (!Number.isNaN(d.getTime())) return saveValue(d.toISOString(), 'typed');
    }
    const r = interpretFor(text);
    if (r) return props.onSave(r.ext, r.keys, 'typed');
    // Free text the rules can't shape (a bank name, a place, a UPI ID): keep it as typed.
    if (['upi', 'text', 'name', 'enum'].includes(slot.type) && !multi) {
      const v = slot.type === 'upi' ? coerce(slot, text) : text;
      if (v !== undefined) return saveValue(v, 'typed');
    }
    setMiss(true);
  };

  return (
    <Sheet title={ui.tx(slot.label)} closeLabel={t('closeSheet')} onClose={() => (mic.abort(), props.onClose())} testId="sheet-edit">
      {has ? <p className="text-title font-display tabular-nums break-words">{displayValue(cfg, field, entry.fields, ui.lang)}</p> : null}

      {mode === 'menu' ? (
        <div className="rows mt-2">
          {has ? (
            <Row onClick={() => void ui.say((l) => spokenValue(cfg, field, entry.fields, l) ?? '')}>
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
          {options.length ? (
            <Row onClick={() => setMode('choices')} testId="edit-choices">
              <span className="w-6 text-center font-bold text-teal">≡</span> {t('chooseInstead')}
            </Row>
          ) : null}
          {(!kp || slot.group) && !multi ? (
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
          <p className="text-hero font-display tabular-nums break-words">{shownValues(cfg, pending.ext, pending.keys, ui.lang)}</p>
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
          <Keypad slot={kp} doneLabel={t('save')} onDone={(d) => saveValue(keypadValue(kp, d), 'tap')} />
        </div>
      ) : null}

      {mode === 'choices' ? (
        <>
          {multi ? <p className="mt-2 text-label text-muted">{t('pickSome')}</p> : null}
          <div className="rows mt-2">
            {options.map((o) => (
              <Row
                key={o.value}
                onClick={() => (multi ? setPicked((p) => (p.includes(o.value) ? p.filter((x) => x !== o.value) : [...p, o.value])) : saveValue(o.value, 'tap'))}
                selected={multi ? picked.includes(o.value) : String(cur) === o.value}
                testId={`choice-${o.value}`}
              >
                {multi ? (
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 ${picked.includes(o.value) ? 'border-teal bg-teal text-white' : 'border-muted'}`}>
                    {picked.includes(o.value) ? <CheckIcon className="w-4 h-4" /> : null}
                  </span>
                ) : null}
                {ui.tx(o.label)}
              </Row>
            ))}
          </div>
          {multi ? (
            <button className="btn-main mt-4" disabled={!picked.length} onClick={() => saveValue(picked, 'tap')} data-testid="choices-done">
              {t('save')}
            </button>
          ) : null}
        </>
      ) : null}

      {mode === 'type' ? (
        <div className="mt-3">
          <input
            className="line-input"
            autoFocus
            type={slot.type === 'datetime' ? 'datetime-local' : 'text'}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveTyped()}
            placeholder={slot.ex ? ui.tx(slot.ex).replace(/"/g, '') : ''}
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
export function FixSheet(props: { ui: UI; onFix: (field: string, value: SlotValue) => void; onClose: () => void }) {
  const { ui } = props;
  const { t, cfg } = ui;
  const mic = useListen();
  const [msg, setMsg] = useState(t('fixPrompt'));
  const listen = () =>
    mic.start({
      lang: ui.lang,
      silenceMs: 2000,
      onOutcome: (o) => {
        if (o.kind !== 'heard') return setMsg(t('fixPrompt'));
        const c = parseCorrection(cfg, o.text, { now: new Date(), lang: ui.lang });
        if (!c) {
          setMsg(t('couldNotFix'));
          void ui.say((l) => uiText(cfg, l, 'couldNotFix'));
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
