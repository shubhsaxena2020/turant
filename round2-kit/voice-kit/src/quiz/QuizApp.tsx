// Bolo Quiz: a spoken quiz for school children (Patna brief: "Kids read less and listen more.
// Quizzes should work by speaking, in Bhojpuri too."). Built on the kit: presence, listening,
// speech, cues and the Wispr theme. One question per screen; "unclear" is never marked wrong.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Presence, type PresenceState } from '../components/Presence';
import { useListen, type Outcome } from '../lib/useListen';
import { speech } from '../lib/speech';
import { cue } from '../lib/cues';
import { answerSimilarity, matchAnswer, type Verdict } from './match';
import { BANK, QUIZ_LEN, SAMPLE_ANSWERS, TOPICS, type Q, type QuizLang, type Topic } from './bank';
import { LANG_NAMES, qt, SPEECH_LANG } from './strings';

type Stage = 'pick' | 'q' | 'done';
type Result = 'right' | 'wrong' | 'skip';

const store = {
  get: (k: string) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k: string, v: string) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* ignore */
    }
  },
};

const qText = (q: Q, lang: QuizLang) => (lang === 'en' ? q.en : q.hi);
const optLabel = (o: string[], lang: QuizLang) => (lang === 'en' ? o[1] : o[0]);
const ansText = (q: Q, lang: QuizLang) => (lang === 'en' ? q.answer.en : q.answer.hi);
const whyText = (q: Q, lang: QuizLang) => (lang === 'en' ? q.why.en : q.why.hi);

function pickQuestions(topic: Topic): Q[] {
  return BANK.filter((q) => q.topic === topic).slice(0, QUIZ_LEN);
}

export default function QuizApp() {
  const [lang, setLangState] = useState<QuizLang>(() => (store.get('quiz.lang') as QuizLang) || 'hi');
  const [stage, setStage] = useState<Stage>('pick');
  const [topic, setTopic] = useState<Topic>('gk');
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [verdict, setVerdict] = useState<(Verdict & { heard?: string }) | null>(null);
  const [misses, setMisses] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [typed, setTyped] = useState('');
  const [sample, setSample] = useState(false);
  const mic = useListen();
  const speakId = useRef(0);
  const qs = useMemo(() => pickQuestions(topic), [topic]);
  const q = qs[idx];
  const sl = SPEECH_LANG[lang];
  const t = useCallback((k: Parameters<typeof qt>[1], v?: Record<string, string | number>) => qt(lang, k, v), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'hi';
    const bg = stage === 'q' ? '#1A1A1A' : stage === 'done' ? '#E2F5F2' : '#FCFCFB';
    document.body.style.background = bg;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
  }, [lang, stage]);

  const say = useCallback(
    async (text: string) => {
      if (!speech.canSpeak) return;
      const id = ++speakId.current;
      setSpeaking(true);
      try {
        await speech.speak(text, sl);
      } finally {
        if (id === speakId.current) setSpeaking(false);
      }
    },
    [sl],
  );

  const setLang = (l: QuizLang) => {
    setLangState(l);
    store.set('quiz.lang', l);
  };

  // ----- asking -----
  const questionSpeech = (qq: Q) => {
    const opts = qq.options ? ' ' + qq.options.map((o, i) => `${i + 1}. ${optLabel(o, lang)}`).join(', ') : '';
    return qText(qq, lang) + opts;
  };

  const listen = (qq: Q) =>
    mic.start({
      lang: sl,
      simulate: sample ? SAMPLE_ANSWERS[qq.id] ?? null : null,
      silenceMs: 1600,
      onOutcome: (o) => onAnswer(qq, o),
    });

  useEffect(() => {
    if (stage !== 'q' || !q) return;
    let cancelled = false;
    setVerdict(null);
    setMisses(0);
    void say(questionSpeech(q)).then(() => {
      if (!cancelled && (speech.canListen || sample)) listen(q);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, idx, topic]);

  function judge(qq: Q, v: Verdict, heard?: string) {
    if (v.verdict === 'repeat') {
      void say(questionSpeech(qq)).then(() => (speech.canListen || sample) && listen(qq));
      return;
    }
    if (v.verdict === 'unclear') {
      const n = misses + 1;
      setMisses(n);
      setVerdict({ ...v, heard });
      void say(n >= 2 ? t('tapNow') : t('unclear')).then(() => n < 2 && (speech.canListen || sample) && listen(qq));
      return;
    }
    setVerdict({ ...v, heard });
    const r: Result = v.verdict === 'correct' ? 'right' : v.verdict === 'skip' ? 'skip' : 'wrong';
    setResults((x) => [...x.slice(0, idx), r]);
    if (r === 'right') {
      cue('success');
      void say(`${t('right')} ${whyText(qq, lang)}`);
    } else {
      cue('captured');
      void say(`${t(r === 'skip' ? 'skipped' : 'wrong', { a: ansText(qq, lang) })} ${whyText(qq, lang)}`);
    }
  }

  function onAnswer(qq: Q, o: Outcome) {
    if (o.kind !== 'heard') {
      judge(qq, { verdict: 'unclear' });
      return;
    }
    judge(qq, matchAnswer(qq.check, o.text), o.text);
  }

  const tapOption = (i: number) => {
    if (!q || verdict?.verdict === 'correct' || verdict?.verdict === 'wrong' || verdict?.verdict === 'skip') return;
    mic.abort();
    speech.cancelSpeech();
    const v: Verdict = q.check.kind === 'mcq' && i === q.check.answer ? { verdict: 'correct', chosen: i, confidence: 1 } : { verdict: 'wrong', chosen: i, confidence: 1 };
    judge(q, v, q.options ? optLabel(q.options[i], lang) : undefined);
  };

  const next = () => {
    mic.abort();
    speech.cancelSpeech();
    if (idx + 1 >= qs.length) {
      setStage('done');
      cue('success');
      const right = results.filter((r) => r === 'right').length;
      void say(`${t('doneTitle', { t: right, c: qs.length })} ${right >= Math.ceil(qs.length * 0.6) ? t('doneGood') : t('doneOk')}`);
      return;
    }
    setIdx((i) => i + 1);
  };

  const start = (tp: Topic, demo = false) => {
    setSample(demo);
    setTopic(tp);
    setIdx(0);
    setResults([]);
    setStage('q');
  };

  // topic by voice
  const listenTopic = () =>
    mic.start({
      lang: sl,
      silenceMs: 1400,
      onOutcome: (o) => {
        if (o.kind !== 'heard') return;
        const best = TOPICS.map((tp) => ({ tp, s: Math.max(answerSimilarity(o.text, tp.hi), answerSimilarity(o.text, tp.en), answerSimilarity(o.text, tp.bho)) })).sort((a, b) => b.s - a.s)[0];
        if (best.s >= 0.7) start(best.tp.id);
      },
    });

  const answered = verdict && (verdict.verdict === 'correct' || verdict.verdict === 'wrong' || verdict.verdict === 'skip');
  const pState: PresenceState = mic.listening ? 'listening' : speaking ? 'speaking' : speech.canListen || sample ? 'idle' : 'off';

  // ----- top bar -----
  const bar = (night: boolean) => (
    <header className={`flex items-center gap-1 px-[8px] text-[18px] ${night ? 'text-night-text' : 'text-ink'}`} style={{ paddingTop: 'max(8px, env(safe-area-inset-top))' }}>
      {stage !== 'pick' ? (
        <button className="min-h-[48px] px-[8px] font-semibold" onClick={() => (mic.abort(), speech.cancelSpeech(), setStage('pick'))} data-testid="quiz-back">
          ←
        </button>
      ) : null}
      <span className="px-[8px] font-display text-[21px] font-bold">{t('title')}</span>
      <span className="flex-1" />
      {(['hi', 'bho', 'en'] as QuizLang[]).map((l) => (
        <button key={l} onClick={() => setLang(l)} className={`min-h-[48px] px-[8px] ${l === lang ? 'font-bold underline decoration-2 underline-offset-[6px]' : 'opacity-70'}`} data-testid={`quiz-lang-${l}`}>
          {LANG_NAMES[l]}
        </button>
      ))}
    </header>
  );

  // ----- screens -----
  if (stage === 'pick') {
    return (
      <div className="min-h-[100dvh] bg-paper text-ink on-paper">
        <div className="mx-auto flex min-h-[100dvh] max-w-[560px] flex-col">
          {bar(false)}
          <main className="flex-1 px-5 pt-6 page-in">
            <p className="font-accent italic text-[1.7rem] leading-snug text-dawn-800">{t('hello')}</p>
            <h1 className="mt-2 text-display font-display">{t('pick')}</h1>
            <p className="mt-1 text-lg text-body">{t('pickHint')}</p>
            <div className="rows mt-6">
              {TOPICS.map((tp) => (
                <button key={tp.id} className="flex w-full items-center gap-4 py-5 text-left text-title font-display" onClick={() => start(tp.id)} data-testid={`topic-${tp.id}`}>
                  <span aria-hidden className="text-[1.8rem]">{tp.emoji}</span>
                  {lang === 'en' ? tp.en : lang === 'bho' ? tp.bho : tp.hi}
                </button>
              ))}
            </div>
          </main>
          <div className="action-zone flex flex-col items-center gap-2">
            {speech.canListen ? (
              <button className="btn-main" onClick={() => (mic.listening ? mic.stop() : listenTopic())} data-testid="quiz-say-topic">
                {mic.listening ? t('listening') : t('pickHint')}
              </button>
            ) : null}
            <button className="link" onClick={() => start('gk', true)} data-testid="quiz-sample">
              {t('sample')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'done') {
    const right = results.filter((r) => r === 'right').length;
    const missed = qs.filter((_, i) => results[i] !== 'right');
    return (
      <div className="min-h-[100dvh] bg-ok-field text-ink">
        <div className="mx-auto flex min-h-[100dvh] max-w-[560px] flex-col">
          {bar(false)}
          <main className="flex-1 px-5 pt-6 page-in" data-testid="quiz-done">
            <div className="flex gap-2" aria-hidden>
              {qs.map((_, i) => (
                <span key={i} className={`h-4 w-4 rounded-full ${results[i] === 'right' ? 'bg-ok' : 'border-2 border-ok/50'}`} />
              ))}
            </div>
            <h1 className="mt-5 text-display font-display">{t('doneTitle', { t: right, c: qs.length })}</h1>
            <p className="mt-1 text-lg text-body">{right >= Math.ceil(qs.length * 0.6) ? t('doneGood') : t('doneOk')}</p>
            {missed.length ? (
              <>
                <h2 className="mt-10 text-title font-display">{t('learnedTitle')}</h2>
                <div className="rows mt-2">
                  {missed.map((m) => (
                    <div key={m.id} className="py-4">
                      <p className="text-label text-muted">{qText(m, lang)}</p>
                      <p className="text-lg font-semibold">{ansText(m, lang)}</p>
                      <p className="text-base text-body">{whyText(m, lang)}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </main>
          <div className="action-zone on-ok flex flex-col items-center">
            <button className="btn-main" onClick={() => start(topic, sample)} data-testid="quiz-again">
              {t('again')}
            </button>
            <button className="link" onClick={() => setStage('pick')}>
              {t('otherTopic')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // question screen (Flow-Bar black)
  return (
    <div className="min-h-[100dvh] bg-night text-night-text on-night">
      <div className="mx-auto flex min-h-[100dvh] max-w-[560px] flex-col">
        {bar(true)}
        <main className="flex-1 px-5 pt-4" key={q?.id}>
          <div className="flex items-center gap-2" aria-label={t('qOf', { n: idx + 1, m: qs.length })}>
            {qs.map((_, i) => (
              <span key={i} className={`h-2.5 w-2.5 rounded-full ${i < idx ? (results[i] === 'right' ? 'bg-mint' : 'bg-night-muted') : i === idx ? 'bg-night-text' : 'border border-night-muted'}`} />
            ))}
            <span className="ml-2 text-label text-night-muted">{t('qOf', { n: idx + 1, m: qs.length })}</span>
          </div>
          <h1 className="mt-4 text-display font-display page-in" data-testid="quiz-question">
            {q ? qText(q, lang) : ''}
          </h1>
          {q?.options ? (
            <div className="rows mt-4">
              {q.options.map((o, i) => {
                const isAns = q.check.kind === 'mcq' && i === q.check.answer;
                const chosen = verdict && 'chosen' in verdict && verdict.chosen === i;
                const tone = answered && isAns ? 'text-mint font-bold' : answered && chosen ? 'line-through text-night-muted' : '';
                return (
                  <button key={i} className={`flex w-full items-center gap-4 py-4 text-left text-lg ${tone}`} onClick={() => tapOption(i)} data-testid={`quiz-opt-${i}`}>
                    <span className="w-6 font-display text-night-muted">{i + 1}</span>
                    {optLabel(o, lang)}
                  </button>
                );
              })}
            </div>
          ) : null}
          {mic.listening ? (
            <p className="mt-6 text-[1.5rem] font-medium text-night-text min-h-[3rem]" data-testid="quiz-live">
              {mic.live}
            </p>
          ) : null}
          {verdict ? (
            <section className="mt-6 fade-in" data-testid="quiz-feedback">
              {verdict.heard ? <p className="text-label text-night-muted">{t('heard', { v: verdict.heard })}</p> : null}
              {verdict.verdict === 'correct' ? (
                <p className="mt-1 text-title font-display text-mint">{t('right')}</p>
              ) : verdict.verdict === 'unclear' ? (
                <p className="mt-1 text-lg text-night-text">{misses >= 2 ? t('tapNow') : t('unclear')}</p>
              ) : (
                <p className="mt-1 text-title font-display text-[#FFBCF2]">{t(verdict.verdict === 'skip' ? 'skipped' : 'wrong', { a: q ? ansText(q, lang) : '' })}</p>
              )}
              {answered && q ? <p className="mt-2 text-lg text-night-muted">{whyText(q, lang)}</p> : null}
            </section>
          ) : null}
          {!answered && misses >= 2 && q && !q.options ? (
            <div className="mt-6">
              <input className="line-input" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={t('typeIt')} data-testid="quiz-type" />
              <button className="link mt-2" onClick={() => (judge(q, matchAnswer(q.check, typed), typed), setTyped(''))} disabled={!typed.trim()}>
                {t('send')}
              </button>
            </div>
          ) : null}
        </main>
        <div className="action-zone on-night flex flex-col items-center gap-1">
          {answered ? (
            <button className="btn-main" onClick={next} data-testid="quiz-next">
              {idx + 1 >= qs.length ? t('finish') : t('next')}
            </button>
          ) : (
            <>
              <Presence state={pState} level={mic.level} label={mic.listening ? t('listening') : t('sayAnswer')} onPress={() => (mic.listening ? mic.stop() : q && listen(q))} small testId="quiz-presence" />
              <button className="link-quiet" onClick={() => q && void say(questionSpeech(q))}>
                {t('repeat')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
