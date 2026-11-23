// The call. A calm helper listens, writes the complaint while you talk, asks only
// for what is missing (one breath, one question), and reads numbers back.
import { useEffect, useMemo, useRef, useState } from 'react';
import { detectIntent, extractFields, SCAM_TYPES, wordCount, type Extraction, type FieldKey } from '../lib/extract';
import { mergeExtraction, pendingQuestions, setField, type QuestionKey, type Report } from '../lib/report';
import { commitAnswer, interpret, shownValues, spokenValues } from '../lib/answer';
import { EXPLICIT, keypadField, TOP_BANKS, viaToSource, type Via } from '../lib/choices';
import { buildLetter } from '../lib/letter';
import { displayValue } from '../lib/outputs';
import { useListen, type Outcome } from '../lib/useListen';
import { cue } from '../lib/cues';
import { speech } from '../lib/speech';
import { SAMPLE_ANSWERS } from '../i18n/samples';
import { scamLabel, t as tr, type StrKey } from '../i18n/strings';
import { Presence, type PresenceState } from '../components/Presence';
import { LetterView } from '../components/LetterView';
import { Keypad } from '../components/Keypad';
import { Row, Sheet } from '../components/Sheet';
import { CheckIcon } from '../components/icons';
import type { UI } from '../ui';

const YES_SAMPLE: Record<string, string> = { 'en-IN': 'yes', 'hi-IN': 'haan' };

interface Pending {
  q: QuestionKey;
  ext: Extraction;
  keys: FieldKey[];
  via: Via;
  conf: number;
}

type SheetKind = null | 'keypad' | 'choices' | 'type';

export function TalkScreen(props: {
  ui: UI;
  report: Report;
  sample: string | null;
  hasDraft: boolean;
  onChange: (r: Report) => void;
  onCheck: () => void;
  onSample: () => void;
  onDraft: () => void;
  onHistory: () => void;
}) {
  const { ui, report } = props;
  const { t } = ui;
  const mic = useListen();
  const [typing, setTyping] = useState(!ui.voice);
  const [thinking, setThinking] = useState(false);
  const [misses, setMisses] = useState<Partial<Record<QuestionKey | 'story', number>>>({});
  const [askRound, setAskRound] = useState(0);
  const [confirm, setConfirm] = useState<Pending | null>(null);
  const [line, setLine] = useState<string | null>(null);
  const [sheet, setSheet] = useState<SheetKind>(null);
  const [fresh, setFresh] = useState<FieldKey[]>([]);
  const [typed, setTyped] = useState('');
  const [denied, setDenied] = useState(false);
  const ack = useRef('');
  const rep = useRef(report);
  rep.current = report;
  // Read after speech ends: a sheet opened while the question was spoken must stop auto-listening.
  const sheetOpen = useRef(sheet);
  sheetOpen.current = sheet;

  const storyMode = report.turns.length === 0;
  const q: QuestionKey | undefined = storyMode ? undefined : pendingQuestions(report.fields, report.skipped)[0];
  const letter = useMemo(() => buildLetter(report, ui.lang), [report, ui.lang]);
  const conflict = report.conflicts[0];
  const sampleRun = !!report.sample;
  const canMic = ui.voice && !typing && !denied;
  const switchToMic = ui.voice && typing && !denied;
  /** Back from Check with every question answered: the user may add to the story, then continue. */
  const tellMore = !storyMode && !q && askRound === 0;

  useEffect(() => setTyping(!ui.voice), [ui.voice]);

  // ---------- listening ----------
  const listenStory = () =>
    mic.start({ lang: ui.lang, simulate: sampleRun && storyMode ? props.sample : null, silenceMs: 2000, onOutcome: onStory });
  const listenAnswer = (question: QuestionKey) =>
    mic.start({
      lang: ui.lang,
      simulate: sampleRun ? SAMPLE_ANSWERS[question] ?? null : null,
      silenceMs: 2000,
      onOutcome: (o) => onAnswerOutcome(question, o),
    });
  const listenYesNo = (p: Pending) =>
    mic.start({
      lang: ui.lang,
      simulate: sampleRun ? YES_SAMPLE[ui.lang] ?? 'yes' : null,
      silenceMs: 1200,
      onOutcome: (o) => onConfirmOutcome(p, o),
    });

  const handleError = (o: Outcome) => {
    if (o.kind !== 'error') return;
    if (o.code === 'not-allowed' || o.code === 'audio-capture') {
      setDenied(true);
      setTyping(true);
      setLine(`${t('micDeniedTitle')}. ${t('micDeniedBody')}`);
    } else {
      setTyping(true);
      setLine(o.code === 'network' ? t('networkError') : t('noSpeech'));
    }
  };

  // ---------- the story ----------
  function onStory(o: Outcome) {
    if (o.kind === 'error') return handleError(o);
    if (o.kind === 'nothing') {
      setLine(t('stillListening'));
      void ui.say((l) => tr(l, 'stillListening'));
      return;
    }
    acceptStory(o.text, o.confidence, o.simulated ? 'sample' : 'voice');
  }

  function acceptStory(text: string, conf: number, via: Via) {
    if (via === 'voice' && (wordCount(text) < 3 || (conf > 0 && conf < 0.6))) {
      setMisses((m) => ({ ...m, story: (m.story ?? 0) + 1 }));
      setLine(`${t('reprompt')} ${t('openQ')}`);
      void ui.say((l) => `${tr(l, 'reprompt')} ${tr(l, 'openQ')}`);
      return;
    }
    setThinking(true);
    setLine(null);
    window.setTimeout(() => {
      setThinking(false);
      const now = new Date();
      const r = rep.current;
      const ext = extractFields(text, { now });
      const m = mergeExtraction(r.fields, ext, { source: viaToSource(via), asrConfidence: via === 'typed' ? undefined : conf, mode: 'story' });
      if (m.changed.length) cue('captured');
      setFresh(m.changed);
      const next: Report = { ...r, turns: [...r.turns, text], fields: m.fields, conflicts: [...r.conflicts, ...m.conflicts], updatedAt: now.toISOString() };
      ack.current = notedLine(next, m.changed);
      props.onChange(next);
      setAskRound((n) => n + 1);
    }, 450);
  }

  /** "Noted: ₹5,000, SBI. Just two more things." in the voice language. */
  function notedLine(r: Report, changed: FieldKey[]) {
    const vals = changed.map((k) => displayValue(k, r.fields, ui.lang)).filter(Boolean).join(', ');
    const left = pendingQuestions(r.fields, r.skipped).length;
    return [vals ? t('noted', { v: vals }) : '', left > 1 ? t('moreN', { n: left }) : left === 1 ? t('more1') : ''].filter(Boolean).join(' ');
  }

  // ---------- asking one question at a time ----------
  useEffect(() => {
    if (storyMode || conflict) return;
    let cancelled = false;
    const said = ack.current;
    ack.current = '';
    if (!q) {
      // Came back from Check to add more (nothing answered on this visit yet): stay here.
      if (askRound === 0) return;
      void ui.say(() => said).then(() => !cancelled && props.onCheck());
      return;
    }
    const first = !misses[q];
    setLine(said || null);
    void ui
      .say((l) => [said && l === ui.lang ? said : '', first ? tr(l, `q_${q}` as StrKey) : `${tr(l, 'reprompt')} ${tr(l, `rq_${q}` as StrKey)}`].filter(Boolean).join(' '))
      .then(() => {
        if (cancelled || sheetOpen.current) return;
        if ((canMic || sampleRun) && !confirm) listenAnswer(q);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, askRound, conflict]);

  // Demo: the sample story plays itself through the exact same pipeline as real speech.
  useEffect(() => {
    if (sampleRun && storyMode && props.sample) listenStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onAnswerOutcome(question: QuestionKey, o: Outcome) {
    if (o.kind === 'error') return handleError(o);
    if (o.kind === 'nothing') return miss(question);
    answer(question, o.text, o.confidence, o.simulated ? 'sample' : 'voice');
  }

  function answer(question: QuestionKey, text: string, conf: number, via: Via) {
    const r = interpret(text, question);
    if (r.kind === 'skip') return skip(question);
    if (r.kind === 'miss') return miss(question);
    if (EXPLICIT.includes(question) && via !== 'typed') {
      const p: Pending = { q: question, ext: r.ext, keys: r.keys, via, conf };
      setConfirm(p);
      void ui.say((l) => tr(l, 'confirmQ', { v: spokenValues(r.ext, r.keys, l) })).then(() => {
        if (canMic || sampleRun) listenYesNo(p);
      });
      return;
    }
    commit(r.ext, r.keys, via, conf);
  }

  function onConfirmOutcome(p: Pending, o: Outcome) {
    if (o.kind !== 'heard') return; // stay on the confirm screen; buttons still work
    const intent = detectIntent(o.text);
    if (intent === 'yes') return commit(p.ext, p.keys, p.via, p.conf);
    if (intent === 'no') return retryConfirm(p.q);
    answer(p.q, o.text, o.confidence, o.simulated ? 'sample' : 'voice'); // they just said the right value
  }

  function retryConfirm(question: QuestionKey) {
    mic.abort();
    setConfirm(null);
    void ui.say((l) => tr(l, `rq_${question}` as StrKey)).then(() => (canMic || sampleRun) && listenAnswer(question));
  }

  function commit(ext: Extraction, keys: FieldKey[], via: Via, conf: number) {
    mic.abort();
    const { report: next, changed } = commitAnswer(rep.current, ext, keys, viaToSource(via), via === 'typed' || via === 'tap' ? undefined : conf);
    cue('captured');
    setFresh(changed);
    setConfirm(null);
    setSheet(null);
    ack.current = notedLine(next, changed);
    props.onChange(next);
    setAskRound((n) => n + 1);
  }

  function skip(question: QuestionKey, why: 'asked' | 'gaveUp' = 'asked') {
    mic.abort();
    setConfirm(null);
    setSheet(null);
    ack.current = why === 'gaveUp' ? t('giveUp') : '';
    props.onChange({ ...rep.current, skipped: [...rep.current.skipped, question], updatedAt: new Date().toISOString() });
    setAskRound((n) => n + 1);
  }

  function miss(question: QuestionKey) {
    const n = (misses[question] ?? 0) + 1;
    setMisses((m) => ({ ...m, [question]: n }));
    if (n >= 3) return skip(question, 'gaveUp');
    if (n === 2) setSheet(keypadField(question) ? 'keypad' : question === 'scamType' || question === 'bank' ? 'choices' : 'type');
    setAskRound((x) => x + 1);
  }

  // ---------- taps ----------
  const onPresence = () => {
    if (mic.listening) return mic.stop();
    if (ui.speaking) speech.cancelSpeech(); // barge-in
    if (!canMic && !sampleRun) {
      // The typing box is already on screen; in "Type instead" mode the circle switches back to the mic.
      if (!switchToMic) return document.getElementById('typed')?.focus();
      setTyping(false);
    }
    if (storyMode) return listenStory();
    if (confirm) return listenYesNo(confirm);
    if (q) return listenAnswer(q);
    return listenStory();
  };

  const submitTyped = () => {
    const text = typed.trim();
    if (!text) return;
    setTyped('');
    setSheet(null);
    if (storyMode || !q) acceptStory(text, 1, 'typed');
    else answer(q, text, 1, 'typed');
  };

  const tapValue = (field: FieldKey, value: string | number) =>
    commit({ [field]: { value, confidence: 1 } } as Extraction, [field], 'tap', 1);

  // ---------- view ----------
  const micReady = canMic || sampleRun || switchToMic;
  const state: PresenceState = mic.listening ? 'listening' : thinking ? 'thinking' : ui.speaking ? 'speaking' : micReady ? 'idle' : 'off';
  const label = mic.listening ? t('state_listening') : thinking ? t('state_thinking') : ui.speaking ? t('state_speaking') : micReady ? t('state_idle') : t('state_off');
  const question = q ? (misses[q] ? t(`rq_${q}` as StrKey) : t(`q_${q}` as StrKey)) : null;
  const kpField = q ? keypadField(q) : null;

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 px-5 pb-2">
        {storyMode && !mic.listening && !thinking ? (
          <section className="pt-6 fade-in" data-testid="greeting">
            <p className="font-accent italic text-[1.7rem] leading-snug text-mint">{t('greetHello')}</p>
            <h1 className="mt-2 text-display font-display text-night-text">{t('openQ')}</h1>
            <p className="mt-3 text-lg text-night-muted">{t('openEx')}</p>
            {micReady ? <p className="mt-6 text-base text-night-muted">{t('likeWhatsapp')}</p> : null}
          </section>
        ) : null}

        {!storyMode && question && !confirm ? (
          <section className="pt-6 fade-in" key={`${q}-${askRound}`} data-testid={`ask-${q}`}>
            {line ? <p className="text-lg text-mint">{line}</p> : null}
            <h1 className="mt-1 text-display font-display text-night-text">{question}</h1>
            {!misses[q!] ? (
              <p className="mt-2 text-lg text-night-muted">
                {t('example')}: {t(`ex_${q}` as StrKey)}
              </p>
            ) : null}
            {q === 'utr' ? <p className="mt-2 text-base text-night-muted">{t('help_utr')}</p> : null}
          </section>
        ) : null}

        {tellMore && !confirm && !mic.listening && !thinking ? (
          <section className="pt-6 fade-in" data-testid="tell-more">
            {line ? <p className="text-lg text-mint">{line}</p> : null}
            <h1 className="mt-1 text-display font-display text-night-text">{t('sayMore')}</h1>
          </section>
        ) : null}

        {confirm ? (
          <section className="pt-6 fade-in" data-testid="confirm">
            <p className="text-lg text-night-muted">{t('iHeard')}</p>
            <p className="mt-1 text-hero font-display text-night-text tabular-nums break-words">{shownValues(confirm.ext, confirm.keys, ui.lang)}</p>
            <p className="mt-2 text-title text-night-text">{t('isThisRight')}</p>
          </section>
        ) : null}

        {storyMode && line && !mic.listening ? <p className="mt-6 text-lg text-mint">{line}</p> : null}

        {mic.listening || thinking ? (
          <p className="pt-6 text-[1.6rem] leading-[1.55] font-medium text-night-text min-h-[6rem] break-words" data-testid="live" aria-live="polite">
            {mic.live || <span className="text-night-muted">{t('listenHint')}</span>}
          </p>
        ) : null}

        {!storyMode ? (
          <section className="mt-8">
            <p className="text-label text-night-muted">{t('letterTitle')}</p>
            <LetterView sentences={letter} fresh={fresh} asking={q} className="mt-2 text-lg text-night-text" />
          </section>
        ) : null}
      </main>

      <div className="action-zone on-night flex flex-col items-center gap-1" data-testid="talk-actions">
        {confirm ? (
          <div className="w-full flex flex-col items-center gap-1">
            <button className="btn-main" onClick={() => commit(confirm.ext, confirm.keys, confirm.via, confirm.conf)} data-testid="confirm-yes">
              <CheckIcon className="w-6 h-6" /> {t('yesRight')}
            </button>
            <button className="link" onClick={() => retryConfirm(confirm.q)} data-testid="confirm-no">
              {t('noAgain')}
            </button>
          </div>
        ) : (
          <>
            {state === 'off' ? (
              <p className="text-lg font-semibold text-night-text">{label}</p>
            ) : (
              <Presence state={state} level={mic.level} label={label} onPress={onPresence} small={!storyMode} />
            )}
            {mic.listening ? <p className="text-base text-night-muted">{t('tapToStop')}</p> : null}
            {!canMic && !sampleRun ? (
              <div className="w-full mt-2">
                <label className="sr-only" htmlFor="typed">
                  {t('typeHere')}
                </label>
                <input
                  id="typed"
                  className="line-input"
                  value={typed}
                  placeholder={q ? t(`ex_${q}` as StrKey).replace(/"/g, '') : t('typeHere')}
                  onChange={(e) => setTyped(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitTyped()}
                />
                <button className="btn-main mt-4" onClick={submitTyped} disabled={!typed.trim()} data-testid="typed-send">
                  {t('send')}
                </button>
              </div>
            ) : null}
            <nav className={`flex flex-wrap justify-center gap-x-5 ${mic.listening ? 'invisible' : ''}`}>
              {storyMode ? (
                <>
                  {!sampleRun ? (
                    <button className="link" onClick={props.onSample} data-testid="sample">
                      {t('sampleLink')}
                    </button>
                  ) : null}
                  {props.hasDraft ? (
                    <button className="link-quiet" onClick={props.onDraft}>
                      {t('draftAgain')}
                    </button>
                  ) : null}
                  {canMic ? (
                    <button className="link-quiet" onClick={() => setTyping(true)}>
                      {t('typeInstead')}
                    </button>
                  ) : null}
                  <button className="link-quiet" onClick={() => ui.setQuiet(!ui.quiet)}>
                    {ui.quiet ? t('soundBack') : t('quietMode')}
                  </button>
                  <button className="link-quiet" onClick={props.onHistory}>
                    {t('pastReports')}
                  </button>
                </>
              ) : q ? (
                <>
                  {kpField ? (
                    <button className="link" onClick={() => setSheet('keypad')} data-testid="open-keypad">
                      {t('pressNumbers')}
                    </button>
                  ) : null}
                  {q === 'scamType' || q === 'bank' ? (
                    <button className="link" onClick={() => setSheet('choices')} data-testid="open-choices">
                      {t('chooseInstead')}
                    </button>
                  ) : null}
                  {canMic ? (
                    <button className="link-quiet" onClick={() => setSheet('type')}>
                      {t('typeIt')}
                    </button>
                  ) : null}
                  <button className="link-quiet" onClick={() => skip(q)} data-testid="skip">
                    {t('skipLater')}
                  </button>
                </>
              ) : tellMore ? (
                <>
                  <button className="link" onClick={props.onCheck} data-testid="to-check">
                    {t('continue')}
                  </button>
                  {canMic ? (
                    <button className="link-quiet" onClick={() => setSheet('type')}>
                      {t('typeIt')}
                    </button>
                  ) : null}
                </>
              ) : null}
            </nav>
          </>
        )}
      </div>

      {sheet === 'keypad' && q && kpField ? (
        <Sheet title={t(`q_${q}` as StrKey)} closeLabel={t('closeSheet')} onClose={() => setSheet(null)} testId="sheet-keypad">
          <Keypad field={kpField} doneLabel={t('send')} onDone={(d) => tapValue(kpField, kpField === 'amount' ? Number(d) : d)} />
        </Sheet>
      ) : null}

      {sheet === 'choices' && q ? (
        <Sheet title={t(`q_${q}` as StrKey)} closeLabel={t('closeSheet')} onClose={() => setSheet(null)} testId="sheet-choices">
          <div className="rows">
            {(q === 'scamType' ? SCAM_TYPES.map((s) => [s, scamLabel(ui.lang, s)]) : TOP_BANKS.map((b) => [b, b])).map(([value, text]) => (
              <Row key={value} onClick={() => tapValue(q as FieldKey, value)} testId={`choice-${value}`}>
                {text}
              </Row>
            ))}
          </div>
        </Sheet>
      ) : null}

      {sheet === 'type' ? (
        <Sheet title={question ?? t('openQ')} closeLabel={t('closeSheet')} onClose={() => setSheet(null)} testId="sheet-type">
          <input
            className="line-input"
            autoFocus
            value={typed}
            placeholder={q ? t(`ex_${q}` as StrKey).replace(/"/g, '') : t('typeHere')}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitTyped()}
          />
          <button className="btn-main mt-5" onClick={submitTyped} disabled={!typed.trim()}>
            {t('send')}
          </button>
        </Sheet>
      ) : null}

      {conflict ? (
        <Sheet title={t('conflictTitle')} closeLabel={t('closeSheet')} onClose={() => props.onChange({ ...report, conflicts: report.conflicts.slice(1) })} testId="sheet-conflict">
          <p className="text-lg text-body">{t('conflictBody', { field: t(`f_${conflict.field}` as StrKey) })}</p>
          <div className="rows mt-2">
            {[conflict.current, conflict.incoming].map((v, i) => (
              <Row key={i} onClick={() => props.onChange(setField(report, conflict.field, { ...v, confidence: 1 }))}>
                <span className="text-title">{displayValue(conflict.field, { [conflict.field]: v }, ui.lang)}</span>
              </Row>
            ))}
          </div>
        </Sheet>
      ) : null}
    </div>
  );
}
