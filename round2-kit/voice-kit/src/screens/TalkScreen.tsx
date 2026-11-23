// The call. A calm helper listens, writes it down while you talk, asks only for what
// is missing (one breath, one question), and reads numbers back. Domain-free: the
// questions, choices and keypads come from the DomainConfig.
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Entry, EnumSlot, FieldValue } from '../domain/types';
import { detectIntent, wordCount } from '../lib/nlp';
import { keypadValue, pendingQuestions, questionOf, slotOf, type Extraction } from '../lib/slots';
import { mergeExtraction, setField } from '../lib/record';
import { commitAnswer, interpret, shownValues, spokenValues } from '../lib/answer';
import { extractSmart } from '../lib/llm';
import { buildLetter } from '../lib/letter';
import { displayValue, showValue } from '../lib/values';
import { uiText } from '../lib/outputs';
import { tx, type LangCode, type Text } from '../lib/lang';
import { useListen, type Outcome } from '../lib/useListen';
import { cue } from '../lib/cues';
import { speech } from '../lib/speech';
import type { UIKey } from '../i18n/ui';
import { Presence, type PresenceState } from '../components/Presence';
import { LetterView } from '../components/LetterView';
import { Keypad } from '../components/Keypad';
import { Row, Sheet } from '../components/Sheet';
import { CheckIcon } from '../components/icons';
import type { UI } from '../ui';
import { logTurn } from '../lib/turnlog';

type Via = 'voice' | 'typed' | 'sample' | 'tap';
const viaToSource = (via: Via) => (via === 'typed' ? 'typed' : via === 'sample' ? 'sample' : via === 'tap' ? 'tap' : 'voice') as FieldValue['source'];

interface Pending {
  q: string;
  ext: Extraction;
  keys: string[];
  via: Via;
  conf: number;
}

type SheetKind = null | 'keypad' | 'choices' | 'type';

const delay = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

export function TalkScreen(props: {
  ui: UI;
  entry: Entry;
  sample: string | null;
  hasDraft: boolean;
  onChange: (r: Entry) => void;
  onCheck: () => void;
  onSample: () => void;
  onDraft: () => void;
  onHistory: () => void;
}) {
  const { ui, entry } = props;
  const { t, cfg } = ui;
  const tr = (l: LangCode, key: UIKey, vars?: Record<string, string | number>) => uiText(cfg, l, key, vars);
  const tl = (text: Text | undefined, l: LangCode) => tx(text, l);
  const mic = useListen();
  const [typing, setTyping] = useState(!ui.voice);
  const [thinking, setThinking] = useState(false);
  const [misses, setMisses] = useState<Record<string, number>>({});
  const [askRound, setAskRound] = useState(0);
  const [confirm, setConfirm] = useState<Pending | null>(null);
  const [line, setLine] = useState<string | null>(null);
  const [sheet, setSheet] = useState<SheetKind>(null);
  const [fresh, setFresh] = useState<string[]>([]);
  const [typed, setTyped] = useState('');
  const [picked, setPicked] = useState<string[]>([]);
  const [denied, setDenied] = useState(false);
  const ack = useRef('');
  const rep = useRef(entry);
  rep.current = entry;
  // Read after speech ends: a sheet opened while the question was spoken must stop auto-listening.
  const sheetOpen = useRef(sheet);
  sheetOpen.current = sheet;

  const storyMode = entry.turns.length === 0;
  const q: string | undefined = storyMode ? undefined : pendingQuestions(cfg, entry.fields, entry.skipped)[0];
  const Q = q ? questionOf(cfg, q) : undefined;
  const letter = useMemo(() => buildLetter(cfg, entry, ui.lang), [cfg, entry, ui.lang]);
  const conflict = entry.conflicts[0];
  const sampleRun = !!entry.sample;
  const canMic = ui.voice && !typing && !denied;
  const switchToMic = ui.voice && typing && !denied;
  /** Back from Check with every question answered: the user may add to the story, then continue. */
  const tellMore = !storyMode && !q && askRound === 0;

  useEffect(() => setTyping(!ui.voice), [ui.voice]);

  const sampleAnswer = (question: string): string | null => {
    const a = cfg.samples.answers?.[question];
    if (!a) return null;
    return typeof a === 'string' ? a : tx(a, ui.lang) || null;
  };

  // ---------- listening ----------
  const listenStory = () => mic.start({ lang: ui.lang, simulate: sampleRun && storyMode ? props.sample : null, silenceMs: 2000, onOutcome: onStory });
  const listenAnswer = (question: string) =>
    mic.start({ lang: ui.lang, simulate: sampleRun ? sampleAnswer(question) : null, silenceMs: 2000, onOutcome: (o) => onAnswerOutcome(question, o) });
  const listenYesNo = (p: Pending) =>
    mic.start({ lang: ui.lang, simulate: sampleRun ? t('sampleYes') : null, silenceMs: 1200, onOutcome: (o) => onConfirmOutcome(p, o) });

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
    void acceptStory(o.text, o.confidence, o.simulated ? 'sample' : 'voice');
  }

  async function acceptStory(text: string, conf: number, via: Via) {
    if (via === 'voice' && (wordCount(text) < 3 || (conf > 0 && conf < 0.6))) {
      setMisses((m) => ({ ...m, story: (m.story ?? 0) + 1 }));
      setLine(`${t('reprompt')} ${ui.tx(cfg.copy.openQ)}`);
      void ui.say((l) => `${tr(l, 'reprompt')} ${tl(cfg.copy.openQ, l)}`);
      return;
    }
    setThinking(true);
    setLine(null);
    const now = new Date();
    const t0 = performance.now();
    // Rules always; the optional LLM only adds suggestions (truth-checked), never blocks.
    const [smart] = await Promise.all([extractSmart(cfg, text, { now, lang: ui.lang }), delay(450)]);
    logTurn({
      app: cfg.id, entryId: rep.current.id, lang: ui.lang, kind: 'story', via, transcript: text,
      asrConfidence: via === 'typed' ? undefined : conf,
      extracted: Object.fromEntries(Object.entries(smart.rules).map(([k, v]) => [k, (v as { value?: unknown } | undefined)?.value])),
      ms: Math.round(performance.now() - t0),
    });
    setThinking(false);
    const r = rep.current;
    const asr = via === 'typed' ? undefined : conf;
    const m = mergeExtraction(cfg, r.fields, smart.rules, { source: viaToSource(via), asrConfidence: asr, mode: 'story' });
    // LLM values fill gaps; for list slots (symptoms) they are added to what the rules heard.
    const isList = (k: string) => {
      const s = slotOf(cfg, k);
      return !!s && s.type === 'enum' && !!s.multi;
    };
    const llmExt = Object.fromEntries(Object.entries(smart.llm).filter(([k]) => m.fields[k] === undefined || isList(k)));
    const m2 = mergeExtraction(cfg, m.fields, llmExt, { source: 'llm', mode: 'story' });
    const changed = [...m.changed, ...m2.changed];
    if (changed.length) cue('captured');
    setFresh(changed);
    const suggested = { ...r.suggested };
    for (const [k, v] of Object.entries(smart.suggested)) if (v && m2.fields[k] === undefined) suggested[k] = { value: v.value, confidence: v.confidence, source: 'llm' };
    const next: Entry = {
      ...r,
      turns: [...r.turns, text],
      fields: m2.fields,
      conflicts: [...r.conflicts, ...m.conflicts],
      suggested,
      summary: smart.summary ?? r.summary,
      updatedAt: now.toISOString(),
    };
    ack.current = notedLine(next, changed);
    props.onChange(next);
    setAskRound((n) => n + 1);
  }

  /** "Noted: ₹5,000, SBI. Just two more things." in the user's language. */
  function notedLine(r: Entry, changed: string[]) {
    const vals = changed.map((k) => displayValue(cfg, k, r.fields, ui.lang)).filter(Boolean).join(', ');
    const left = pendingQuestions(cfg, r.fields, r.skipped).length;
    return [vals ? t('noted', { v: vals }) : '', left > 1 ? t('moreN', { n: left }) : left === 1 ? t('more1') : ''].filter(Boolean).join(' ');
  }

  // ---------- asking one question at a time ----------
  useEffect(() => {
    if (storyMode || conflict) return;
    let cancelled = false;
    const said = ack.current;
    ack.current = '';
    if (!q || !Q) {
      // Came back from Check to add more (nothing answered on this visit yet): stay here.
      if (askRound === 0) return;
      void ui.say(() => said).then(() => !cancelled && props.onCheck());
      return;
    }
    setLine(said || null);
    // An LLM suggestion for this question: ask "I heard X. Is that right?" before writing it.
    const sugKey = Q.slots.map((s) => s.key).find((k) => entry.suggested?.[k]);
    if (sugKey && !misses[q]) {
      const sug = entry.suggested![sugKey]!;
      const p: Pending = { q, ext: { [sugKey]: { value: sug.value, confidence: sug.confidence } }, keys: [sugKey], via: 'voice', conf: sug.confidence };
      setConfirm(p);
      void ui
        .say((l) => [said && l === ui.lang ? said : '', tr(l, 'confirmQ', { v: spokenValues(cfg, p.ext, p.keys, l) })].filter(Boolean).join(' '))
        .then(() => !cancelled && (canMic || sampleRun) && listenYesNo(p));
      return () => {
        cancelled = true;
      };
    }
    const first = !misses[q];
    void ui
      .say((l) => [said && l === ui.lang ? said : '', first ? tl(Q.copy.q, l) : `${tr(l, 'reprompt')} ${tl(Q.copy.rq ?? Q.copy.q, l)}`].filter(Boolean).join(' '))
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

  function onAnswerOutcome(question: string, o: Outcome) {
    if (o.kind === 'error') return handleError(o);
    if (o.kind === 'nothing') return miss(question);
    answer(question, o.text, o.confidence, o.simulated ? 'sample' : 'voice');
  }

  function answer(question: string, text: string, conf: number, via: Via) {
    const r = interpret(cfg, text, question);
    if (r.kind === 'skip') return skip(question);
    if (r.kind === 'miss') return miss(question);
    if (questionOf(cfg, question)?.explicit && via !== 'typed') {
      const p: Pending = { q: question, ext: r.ext, keys: r.keys, via, conf };
      setConfirm(p);
      void ui.say((l) => tr(l, 'confirmQ', { v: spokenValues(cfg, r.ext, r.keys, l) })).then(() => {
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

  const withoutSuggested = (r: Entry, keys: string[]): Entry =>
    r.suggested && keys.some((k) => r.suggested![k]) ? { ...r, suggested: Object.fromEntries(Object.entries(r.suggested).filter(([k]) => !keys.includes(k))) } : r;

  function retryConfirm(question: string) {
    mic.abort();
    setConfirm(null);
    const keys = questionOf(cfg, question)?.slots.map((s) => s.key) ?? [];
    if (entry.suggested && keys.some((k) => entry.suggested![k])) props.onChange(withoutSuggested(rep.current, keys));
    void ui.say((l) => tl(questionOf(cfg, question)?.copy.rq ?? questionOf(cfg, question)?.copy.q, l)).then(() => (canMic || sampleRun) && listenAnswer(question));
  }

  function commit(ext: Extraction, keys: string[], via: Via, conf: number) {
    mic.abort();
    const { entry: next, changed } = commitAnswer(cfg, withoutSuggested(rep.current, keys), ext, keys, viaToSource(via), via === 'typed' || via === 'tap' ? undefined : conf);
    cue('captured');
    setFresh(changed);
    setConfirm(null);
    setSheet(null);
    setPicked([]);
    ack.current = notedLine(next, changed);
    props.onChange(next);
    setAskRound((n) => n + 1);
  }

  function skip(question: string, why: 'asked' | 'gaveUp' = 'asked') {
    mic.abort();
    setConfirm(null);
    setSheet(null);
    ack.current = why === 'gaveUp' ? t('giveUp') : '';
    props.onChange({ ...rep.current, skipped: [...rep.current.skipped, question], updatedAt: new Date().toISOString() });
    setAskRound((n) => n + 1);
  }

  function miss(question: string) {
    const n = (misses[question] ?? 0) + 1;
    setMisses((m) => ({ ...m, [question]: n }));
    if (n >= 3) return skip(question, 'gaveUp');
    const QQ = questionOf(cfg, question);
    if (n === 2) setSheet(QQ?.keypad ? 'keypad' : QQ?.choices ? 'choices' : 'type');
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
    if (storyMode || !q) void acceptStory(text, 1, 'typed');
    else answer(q, text, 1, 'typed');
  };

  const tapValue = (key: string, value: FieldValue['value']) => commit({ [key]: { value, confidence: 1 } }, [key], 'tap', 1);

  // ---------- view ----------
  const micReady = canMic || sampleRun || switchToMic;
  const state: PresenceState = mic.listening ? 'listening' : thinking ? 'thinking' : ui.speaking ? 'speaking' : micReady ? 'idle' : 'off';
  const label = mic.listening ? t('state_listening') : thinking ? t('state_thinking') : ui.speaking ? t('state_speaking') : micReady ? t('state_idle') : t('state_off');
  const question = Q ? (misses[Q.key] ? ui.tx(Q.copy.rq ?? Q.copy.q) : ui.tx(Q.copy.q)) : null;
  const kp = Q?.keypad ?? null;
  const choiceSlot: EnumSlot | null = Q?.choices ?? null;
  const choiceList = choiceSlot ? (choiceSlot.choices ?? choiceSlot.options.map((o) => o.value)).map((v) => choiceSlot.options.find((o) => o.value === v)!).filter(Boolean) : [];
  const placeholder = Q?.copy.ex ? ui.tx(Q.copy.ex).replace(/"/g, '') : t('typeHere');

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 px-5 pb-2">
        {storyMode && !mic.listening && !thinking ? (
          <section className="pt-6 fade-in" data-testid="greeting">
            <p className="font-accent italic text-[1.7rem] leading-snug text-mint">{ui.tx(cfg.copy.greeting)}</p>
            <h1 className="mt-2 text-display font-display text-night-text">{ui.tx(cfg.copy.openQ)}</h1>
            <p className="mt-3 text-lg text-night-muted">{ui.tx(cfg.copy.openEx)}</p>
            {micReady ? <p className="mt-6 text-base text-night-muted">{t('likeWhatsapp')}</p> : null}
          </section>
        ) : null}

        {!storyMode && question && !confirm ? (
          <section className="pt-6 fade-in" key={`${q}-${askRound}`} data-testid={`ask-${q}`}>
            {line ? <p className="text-lg text-mint">{line}</p> : null}
            <h1 className="mt-1 text-display font-display text-night-text">{question}</h1>
            {!misses[q!] && Q?.copy.ex ? (
              <p className="mt-2 text-lg text-night-muted">
                {t('example')}: {ui.tx(Q.copy.ex)}
              </p>
            ) : null}
            {Q?.copy.help ? <p className="mt-2 text-base text-night-muted">{ui.tx(Q.copy.help)}</p> : null}
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
            <p className="mt-1 text-hero font-display text-night-text tabular-nums break-words">{shownValues(cfg, confirm.ext, confirm.keys, ui.lang)}</p>
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
            <p className="text-label text-night-muted">{ui.tx(cfg.copy.letterTitle)}</p>
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
                  placeholder={q ? placeholder : t('typeHere')}
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
                  {!sampleRun && tx(cfg.samples.stories, ui.lang) ? (
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
                  <button className="link-quiet" onClick={props.onHistory} data-testid="history">
                    {t('pastReports')}
                  </button>
                </>
              ) : q ? (
                <>
                  {kp ? (
                    <button className="link" onClick={() => setSheet('keypad')} data-testid="open-keypad">
                      {t('pressNumbers')}
                    </button>
                  ) : null}
                  {choiceSlot ? (
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

      {sheet === 'keypad' && q && kp ? (
        <Sheet title={question ?? ''} closeLabel={t('closeSheet')} onClose={() => setSheet(null)} testId="sheet-keypad">
          <Keypad slot={kp} doneLabel={t('send')} onDone={(d) => tapValue(kp.key, keypadValue(kp, d))} />
        </Sheet>
      ) : null}

      {sheet === 'choices' && q && choiceSlot ? (
        <Sheet title={question ?? ''} closeLabel={t('closeSheet')} onClose={() => setSheet(null)} testId="sheet-choices">
          {choiceSlot.multi ? <p className="text-label text-muted">{t('pickSome')}</p> : null}
          <div className="rows">
            {choiceList.map((o) => (
              <Row
                key={o.value}
                selected={picked.includes(o.value)}
                onClick={() => (choiceSlot.multi ? setPicked((p) => (p.includes(o.value) ? p.filter((x) => x !== o.value) : [...p, o.value])) : tapValue(choiceSlot.key, o.value))}
                testId={`choice-${o.value}`}
              >
                {choiceSlot.multi ? (
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 ${picked.includes(o.value) ? 'border-teal bg-teal text-white' : 'border-muted'}`}>
                    {picked.includes(o.value) ? <CheckIcon className="w-4 h-4" /> : null}
                  </span>
                ) : null}
                {ui.tx(o.label)}
              </Row>
            ))}
          </div>
          {choiceSlot.multi ? (
            <button className="btn-main mt-4" disabled={!picked.length} onClick={() => tapValue(choiceSlot.key, picked)} data-testid="choices-done">
              <CheckIcon className="w-6 h-6" /> {t('multiDone')}
            </button>
          ) : null}
        </Sheet>
      ) : null}

      {sheet === 'type' ? (
        <Sheet title={question ?? ui.tx(cfg.copy.openQ)} closeLabel={t('closeSheet')} onClose={() => setSheet(null)} testId="sheet-type">
          <input
            className="line-input"
            autoFocus
            value={typed}
            placeholder={q ? placeholder : t('typeHere')}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitTyped()}
          />
          <button className="btn-main mt-5" onClick={submitTyped} disabled={!typed.trim()}>
            {t('send')}
          </button>
        </Sheet>
      ) : null}

      {conflict ? (
        <Sheet title={t('conflictTitle')} closeLabel={t('closeSheet')} onClose={() => props.onChange({ ...entry, conflicts: entry.conflicts.slice(1) })} testId="sheet-conflict">
          <p className="text-lg text-body">{t('conflictBody', { field: ui.tx(slotOf(cfg, conflict.field)?.label) })}</p>
          <div className="rows mt-2">
            {[conflict.current, conflict.incoming].map((v, i) => (
              <Row key={i} onClick={() => props.onChange(setField(entry, conflict.field, { ...v, confidence: 1 }))}>
                <span className="text-title">{slotOf(cfg, conflict.field) ? showValue(slotOf(cfg, conflict.field)!, v.value, ui.lang, new Date(), cfg) : String(v.value)}</span>
              </Row>
            ))}
          </div>
        </Sheet>
      ) : null}
    </div>
  );
}
