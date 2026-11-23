// Turant v2: "a calm phone call with a helper who writes your complaint while you talk".
// Stages in a fixed order: talk → check → done → written complaint. See research/DESIGN_SPEC.md.
import { useCallback, useEffect, useRef, useState } from 'react';
import type { LangCode } from './lib/extract';
import { newReport, pendingQuestions, type Report } from './lib/report';
import { speech } from './lib/speech';
import { setCuesEnabled } from './lib/cues';
import { loadLang, loadReports, saveLang, saveReport } from './lib/storage';
import { LANGS, t as tr, type StrKey } from './i18n/strings';
import { SAMPLE_STORIES } from './i18n/samples';
import { TopBar } from './components/TopBar';
import { TalkScreen } from './screens/TalkScreen';
import { CheckScreen } from './screens/CheckScreen';
import { DoneScreen } from './screens/DoneScreen';
import { DocumentScreen } from './screens/DocumentScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { LanguageSheet } from './screens/LanguageSheet';
import type { UI } from './ui';

type Stage = 'talk' | 'check' | 'done' | 'doc' | 'history';

const SCALES = [1, 1.125, 1.25];
const BG: Record<Stage, { cls: string; hex: string; tone: 'night' | 'paper' | 'ok' }> = {
  talk: { cls: 'bg-night text-night-text on-night', hex: '#13233A', tone: 'night' },
  check: { cls: 'bg-paper text-ink', hex: '#FAF7F2', tone: 'paper' },
  done: { cls: 'bg-ok-field text-ink', hex: '#E3EFE6', tone: 'ok' },
  doc: { cls: 'bg-paper text-ink', hex: '#FAF7F2', tone: 'paper' },
  history: { cls: 'bg-paper text-ink', hex: '#FAF7F2', tone: 'paper' },
};

/** First run: guess from the phone's language list, default Hindi. Never a gate. */
function guessLang(): LangCode {
  const saved = loadLang();
  if (saved) return saved;
  try {
    for (const l of navigator.languages ?? [navigator.language]) {
      const hit = LANGS.find((x) => x.code.slice(0, 2) === l.slice(0, 2).toLowerCase());
      if (hit) return hit.code;
    }
  } catch {
    /* ignore */
  }
  return 'hi-IN';
}

function loadScale(): number {
  try {
    const v = Number(localStorage.getItem('turant.scale'));
    return SCALES.includes(v) ? v : 1;
  } catch {
    return 1;
  }
}

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
  const [lang, setLang] = useState<LangCode>(guessLang);
  const [stage, setStage] = useState<Stage>('talk');
  const [report, setReport] = useState<Report>(() => newReport(guessLang()));
  const [sample, setSample] = useState<string | null>(null);
  const [draft, setDraft] = useState<Report | null>(null);
  const [quiet, setQuietState] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [scale, setScale] = useState(loadScale);
  const [langSheet, setLangSheet] = useState(false);
  const speakCount = useRef(0);
  const online = useOnline();

  useEffect(() => {
    document.documentElement.style.setProperty('--scale', String(scale));
    try {
      localStorage.setItem('turant.scale', String(scale));
    } catch {
      /* ignore */
    }
  }, [scale]);

  useEffect(() => {
    document.documentElement.lang = lang.slice(0, 2);
    document.body.style.background = BG[stage].hex;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BG[stage].hex);
  }, [lang, stage]);

  const refreshDraft = useCallback(() => {
    void loadReports().then((list) => setDraft(list.find((r) => r.status === 'draft' && r.turns.length > 0) ?? null));
  }, []);
  useEffect(refreshDraft, [refreshDraft]);

  const setQuiet = (q: boolean) => {
    setQuietState(q);
    setCuesEnabled(!q);
    if (q) speech.cancelSpeech();
  };

  // Device may lack a voice for the chosen language: fall back to Hindi, then English.
  const voiceLang = useCallback((l: LangCode): LangCode => {
    if (speech.hasVoice(l) !== false) return l;
    if (speech.hasVoice('hi-IN')) return 'hi-IN';
    return 'en-IN';
  }, []);

  const say = useCallback(
    async (build: (l: LangCode) => string) => {
      if (quiet || !speech.canSpeak) return;
      const text = build(voiceLang(lang)).trim();
      if (!text) return;
      const id = ++speakCount.current;
      setSpeaking(true);
      try {
        await speech.speak(text, voiceLang(lang));
      } finally {
        if (id === speakCount.current) setSpeaking(false);
      }
    },
    [quiet, lang, voiceLang],
  );

  const ui: UI = {
    lang,
    t: (key: StrKey, vars?: Record<string, string | number>) => tr(lang, key, vars),
    say,
    quiet,
    setQuiet,
    voice: speech.canListen && !quiet,
    speaking,
    online,
  };

  const go = (s: Stage) => {
    speech.cancelSpeech();
    setSpeaking(false);
    setStage(s);
    window.scrollTo(0, 0);
  };

  /** Save after every answer so a dropped connection or closed tab loses nothing. */
  const persist = (r: Report) => {
    setReport(r);
    if (r.turns.length > 0 || r.status === 'ready') void saveReport(r);
  };

  const fresh = (opts: { sample?: boolean } = {}) => {
    const r = newReport(lang, opts);
    setReport(r);
    setSample(opts.sample ? SAMPLE_STORIES[lang] : null);
    refreshDraft();
    go('talk');
  };

  const open = (r: Report) => {
    setReport(r);
    setSample(null);
    if (r.status === 'ready') return go('doc');
    go(pendingQuestions(r.fields, r.skipped).length ? 'talk' : 'check');
  };

  const pickLang = (l: LangCode) => {
    setLang(l);
    saveLang(l);
    setLangSheet(false);
    if (report.turns.length === 0) setReport({ ...report, lang: l });
    if (sample) setSample(SAMPLE_STORIES[l]);
  };

  const back: Partial<Record<Stage, () => void>> = {
    talk: report.turns.length ? () => fresh() : undefined,
    check: () => go('talk'),
    done: () => go('check'),
    doc: () => go('done'),
    history: () => go('talk'),
  };

  const bg = BG[stage];

  return (
    <div className={`min-h-[100dvh] overflow-x-clip ${bg.cls}`}>
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[560px] flex-col" lang={lang.slice(0, 2)}>
        <TopBar
          ui={ui}
          tone={bg.tone}
          onBack={back[stage]}
          onLanguage={() => setLangSheet(true)}
          onScale={() => setScale((s) => SCALES[(SCALES.indexOf(s) + 1) % SCALES.length])}
        />
        {!online ? <p className="px-5 text-label font-semibold text-amber bg-amber-field py-2">{ui.t('offlineNote')}</p> : null}

        {stage === 'talk' ? (
          <TalkScreen
            key={report.id}
            ui={ui}
            report={report}
            sample={sample}
            hasDraft={!!draft && draft.id !== report.id}
            onChange={persist}
            onCheck={() => go('check')}
            onSample={() => fresh({ sample: true })}
            onDraft={() => draft && open(draft)}
            onHistory={() => go('history')}
          />
        ) : null}
        {stage === 'check' ? (
          <CheckScreen
            ui={ui}
            report={report}
            onChange={persist}
            onConfirm={() => {
              persist({ ...report, status: 'ready', updatedAt: new Date().toISOString() });
              go('done');
            }}
          />
        ) : null}
        {stage === 'done' ? <DoneScreen ui={ui} report={report} onWritten={() => go('doc')} /> : null}
        {stage === 'doc' ? <DocumentScreen ui={ui} report={report} onChange={persist} onNew={() => fresh()} /> : null}
        {stage === 'history' ? <HistoryScreen ui={ui} onOpen={open} onDeleted={refreshDraft} /> : null}
      </div>
      {langSheet ? <LanguageSheet ui={ui} onPick={pickLang} onClose={() => setLangSheet(false)} /> : null}
    </div>
  );
}
