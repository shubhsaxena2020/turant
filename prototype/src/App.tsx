import { useCallback, useEffect, useRef, useState } from 'react';
import type { LangCode } from './lib/extract';
import { newReport, pendingQuestions, setField, type QuestionKey, type Report } from './lib/report';
import { speech } from './lib/speech';
import { loadLang, loadReports, saveLang, saveReport } from './lib/storage';
import { langInfo, t as tr, type StrKey } from './i18n/strings';
import { SAMPLE_STORIES } from './i18n/samples';
import { ConflictSheet, Header } from './components/common';
import { LanguageScreen } from './screens/LanguageScreen';
import { HomeScreen } from './screens/HomeScreen';
import { StoryScreen } from './screens/StoryScreen';
import { QuestionsScreen } from './screens/QuestionsScreen';
import { ReviewScreen } from './screens/ReviewScreen';
import { ActionScreen } from './screens/ActionScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import type { InputMode, UI } from './ui';

type Screen = 'language' | 'home' | 'story' | 'questions' | 'review' | 'action' | 'reports';

function useOnline() {
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);
  return online;
}

export default function App() {
  const [lang, setLang] = useState<LangCode | null>(() => loadLang());
  const [screen, setScreen] = useState<Screen>(() => (loadLang() ? 'home' : 'language'));
  const [report, setReport] = useState<Report | null>(null);
  const [draft, setDraft] = useState<Report | null>(null);
  const [sampleText, setSampleText] = useState<string | null>(null);
  const [mode, setMode] = useState<InputMode>(speech.canListen ? 'voice' : 'type');
  const [muted, setMuted] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const online = useOnline();
  const warnedVoice = useRef(false);
  const noticeTimer = useRef<ReturnType<typeof setTimeout>>();

  const uiLang: LangCode = lang ?? 'hi-IN';

  const notify = useCallback((msg: string) => {
    setNotice(msg);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 7000);
  }, []);

  // Device may lack a voice for the chosen language: fall back to Hindi, then English, and say so.
  const voiceLang = useCallback((l: LangCode): LangCode => {
    if (speech.hasVoice(l) !== false) return l;
    if (speech.hasVoice('hi-IN')) return 'hi-IN';
    return 'en-IN';
  }, []);

  const say = useCallback(
    async (build: (l: LangCode) => string) => {
      if (muted || !speech.canSpeak) return;
      const v = voiceLang(uiLang);
      if (v !== uiLang && !warnedVoice.current) {
        warnedVoice.current = true;
        notify(tr(uiLang, 'voiceFallback', { lang: langInfo(uiLang).native, fallback: langInfo(v).native }));
      }
      await speech.speak(build(v), v);
    },
    [muted, uiLang, voiceLang, notify],
  );

  const ui: UI = {
    lang: uiLang,
    t: (key: StrKey, vars?: Record<string, string | number>) => tr(uiLang, key, vars),
    mode,
    setMode,
    say,
    muted,
    notify,
    online,
  };

  const refreshDraft = useCallback(() => {
    void loadReports().then((list) => setDraft(list.find((r) => r.status === 'draft' && r.turns.length > 0) ?? null));
  }, []);
  useEffect(refreshDraft, [refreshDraft]);

  const go = (s: Screen) => {
    speech.cancelSpeech();
    setScreen(s);
    window.scrollTo(0, 0);
  };

  /** Save after every answer so a dropped connection or closed tab loses nothing. */
  const persist = (r: Report) => {
    setReport(r);
    void saveReport(r);
  };

  const start = ({ sample, typed }: { sample: boolean; typed?: boolean }) => {
    const r = newReport(uiLang, { sample });
    persist(r);
    setSampleText(sample ? SAMPLE_STORIES[uiLang] : null);
    if (typed) setMode('type');
    else if (speech.canListen && !sample) setMode('voice');
    go('story');
  };

  const nextAfterStory = (r: Report) => go(pendingQuestions(r.fields, r.skipped).length ? 'questions' : 'review');

  const open = (r: Report) => {
    setReport(r);
    setSampleText(null);
    if (r.status === 'ready') go('action');
    else if (r.turns.length === 0) go('story');
    else nextAfterStory(r);
  };

  const pickLang = (l: LangCode) => {
    setLang(l);
    saveLang(l);
    warnedVoice.current = false;
    if (report) persist({ ...report, lang: l });
    go(report && screen !== 'language' ? screen : 'home');
  };

  const backTarget: Partial<Record<Screen, Screen>> = {
    story: 'home',
    questions: 'home',
    review: 'home',
    action: 'review',
    reports: 'home',
    language: lang ? 'home' : undefined,
  };
  const onBack = backTarget[screen]
    ? () => {
        if (backTarget[screen] === 'home') refreshDraft();
        go(backTarget[screen]!);
      }
    : undefined;

  const conflict = report && ['story', 'questions', 'review'].includes(screen) ? report.conflicts[0] : undefined;

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[440px] min-h-screen bg-paper shadow-[0_0_60px_-20px_rgba(18,40,74,0.35)] relative" lang={uiLang.slice(0, 2)}>
        <Header
          ui={ui}
          onBack={onBack}
          onLanguage={() => go('language')}
          onReports={() => go('reports')}
          onToggleSound={() => {
            if (!muted) speech.cancelSpeech();
            setMuted((m) => !m);
          }}
        />
        {!online ? (
          <p className="mx-4 mt-3 rounded-xl bg-ink text-card px-4 py-2.5 text-[0.95rem] font-semibold">{ui.t('offlineNote')}</p>
        ) : null}
        {notice ? (
          <button
            className="mx-4 mt-3 w-[calc(100%-2rem)] text-left rounded-xl bg-amberx-soft border-[1.5px] border-amberx/60 px-4 py-3 font-semibold leading-snug rise"
            role="alert"
            onClick={() => setNotice(null)}
          >
            {notice}
          </button>
        ) : null}

        <main>
          {screen === 'language' ? <LanguageScreen ui={ui} current={lang} onPick={pickLang} /> : null}
          {screen === 'home' ? <HomeScreen ui={ui} draft={draft} onStart={start} onContinue={open} /> : null}
          {screen === 'story' && report ? (
            <StoryScreen ui={ui} report={report} sampleText={sampleText} onChange={persist} onContinue={() => nextAfterStory(report)} />
          ) : null}
          {screen === 'questions' && report ? <QuestionsScreen ui={ui} report={report} onChange={persist} onDone={() => go('review')} /> : null}
          {screen === 'review' && report ? (
            <ReviewScreen
              ui={ui}
              report={report}
              onChange={persist}
              onAsk={(q: QuestionKey) => {
                persist({ ...report, skipped: report.skipped.filter((s) => s !== q) });
                go('questions');
              }}
              onConfirm={() => {
                persist({ ...report, status: 'ready', updatedAt: new Date().toISOString() });
                go('action');
              }}
            />
          ) : null}
          {screen === 'action' && report ? (
            <ActionScreen
              ui={ui}
              report={report}
              onChange={persist}
              onNew={() => {
                setReport(null);
                refreshDraft();
                go('home');
              }}
            />
          ) : null}
          {screen === 'reports' ? <ReportsScreen ui={ui} onOpen={open} onDeleted={refreshDraft} /> : null}
        </main>

        {conflict && report ? (
          <ConflictSheet
            ui={ui}
            conflict={conflict}
            onPick={(which) => {
              const chosen = which === 'current' ? conflict.current : conflict.incoming;
              persist(setField(report, conflict.field, { ...chosen, confidence: 1 }));
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
