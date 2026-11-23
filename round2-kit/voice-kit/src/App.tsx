// "A calm phone call with a helper who writes it down while you talk" (research/DESIGN_SPEC.md).
// Stages in a fixed order: talk -> check -> done -> written document. Everything
// domain-specific comes from the DomainConfig picked by ?app= / VITE_APP.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { pickApp } from './domain/registry';
import type { Entry } from './domain/types';
import { LANGS, tx, type LangCode } from './lib/lang';
import { newEntry } from './lib/record';
import { pendingQuestions } from './lib/slots';
import { uiText } from './lib/outputs';
import { speech } from './lib/speech';
import { setCuesEnabled } from './lib/cues';
import { applyTheme } from './lib/theme';
import { loadEntries, loadLang, saveEntry, saveLang } from './lib/storage';
import type { UIKey } from './i18n/ui';
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
const cfg = pickApp();
const NIGHT = typeof document !== 'undefined' ? applyTheme(cfg.theme) : '#13233A';
const BG: Record<Stage, { cls: string; hex: string; tone: 'night' | 'paper' | 'ok' }> = {
  talk: { cls: 'bg-night text-night-text on-night', hex: NIGHT, tone: 'night' },
  check: { cls: 'bg-paper text-ink', hex: '#FAF7F2', tone: 'paper' },
  done: { cls: 'bg-ok-field text-ink', hex: '#E3EFE6', tone: 'ok' },
  doc: { cls: 'bg-paper text-ink', hex: '#FAF7F2', tone: 'paper' },
  history: { cls: 'bg-paper text-ink', hex: '#FAF7F2', tone: 'paper' },
};

/** First run: ?lang=, then the phone's language list, then the app's first language. Never a gate. */
function guessLang(): LangCode {
  const ok = (l: string | null | undefined): l is LangCode => !!l && cfg.languages.includes(l as LangCode);
  try {
    const q = new URLSearchParams(location.search).get('lang');
    const fromUrl = q && (cfg.languages.find((l) => l.startsWith(q)) ?? q);
    if (ok(fromUrl)) return fromUrl;
  } catch {
    /* ignore */
  }
  const saved = loadLang(cfg.id);
  if (ok(saved)) return saved;
  try {
    for (const l of navigator.languages ?? [navigator.language]) {
      const hit = cfg.languages.find((x) => x.slice(0, 2) === l.slice(0, 2).toLowerCase());
      if (hit) return hit;
    }
  } catch {
    /* ignore */
  }
  return cfg.languages[0];
}

function loadScale(): number {
  try {
    const v = Number(localStorage.getItem('voicekit.scale'));
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

const sampleFor = (lang: LangCode) => tx(cfg.samples.stories, lang) || null;

export default function App() {
  const [lang, setLang] = useState<LangCode>(guessLang);
  const [stage, setStage] = useState<Stage>('talk');
  const [entry, setEntry] = useState<Entry>(() => newEntry(cfg.id, guessLang()));
  const [sample, setSample] = useState<string | null>(null);
  const [draft, setDraft] = useState<Entry | null>(null);
  const [quiet, setQuietState] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [scale, setScale] = useState(loadScale);
  const [langSheet, setLangSheet] = useState(false);
  const speakCount = useRef(0);
  const online = useOnline();

  useEffect(() => {
    document.documentElement.style.setProperty('--scale', String(scale));
    try {
      localStorage.setItem('voicekit.scale', String(scale));
    } catch {
      /* ignore */
    }
  }, [scale]);

  useEffect(() => {
    document.documentElement.lang = lang.slice(0, 2);
    document.title = `${tx(cfg.name, lang)} · ${tx(cfg.tagline, lang)}`;
    document.body.style.background = BG[stage].hex;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BG[stage].hex);
  }, [lang, stage]);

  const refreshDraft = useCallback(() => {
    void loadEntries(cfg.id).then((list) => setDraft(list.find((r) => r.status === 'draft' && r.turns.length > 0) ?? null));
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

  const ui: UI = useMemo(
    () => ({
      cfg,
      lang,
      t: (key: UIKey, vars?: Record<string, string | number>) => uiText(cfg, lang, key, vars),
      tx: (text, vars) => tx(text, lang, vars),
      say,
      quiet,
      setQuiet,
      voice: speech.canListen && !quiet,
      speaking,
      online,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, say, quiet, speaking, online],
  );

  const go = (s: Stage) => {
    speech.cancelSpeech();
    setSpeaking(false);
    setStage(s);
    window.scrollTo(0, 0);
  };

  /** Save after every answer so a dropped connection or closed tab loses nothing. */
  const persist = (r: Entry) => {
    setEntry(r);
    if (r.turns.length > 0 || r.status === 'ready') void saveEntry(r);
  };

  const fresh = (opts: { sample?: boolean } = {}) => {
    const r = newEntry(cfg.id, lang, opts);
    setEntry(r);
    setSample(opts.sample ? sampleFor(lang) : null);
    refreshDraft();
    go('talk');
  };

  const open = (r: Entry) => {
    setEntry(r);
    setSample(null);
    if (r.status === 'ready') return go('doc');
    go(pendingQuestions(cfg, r.fields, r.skipped).length ? 'talk' : 'check');
  };

  const pickLang = (l: LangCode) => {
    setLang(l);
    saveLang(cfg.id, l);
    setLangSheet(false);
    if (entry.turns.length === 0) setEntry({ ...entry, lang: l });
    if (sample) setSample(sampleFor(l));
  };

  const back: Partial<Record<Stage, () => void>> = {
    talk: entry.turns.length ? () => fresh() : undefined,
    check: () => go('talk'),
    done: () => go('check'),
    doc: () => go('done'),
    history: () => go('talk'),
  };

  const bg = BG[stage];

  return (
    <div className={`min-h-[100dvh] overflow-x-clip ${bg.cls}`} data-app={cfg.id}>
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
            key={entry.id}
            ui={ui}
            entry={entry}
            sample={sample}
            hasDraft={!!draft && draft.id !== entry.id}
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
            entry={entry}
            onChange={persist}
            onConfirm={() => {
              persist({ ...entry, status: 'ready', updatedAt: new Date().toISOString() });
              go('done');
            }}
          />
        ) : null}
        {stage === 'done' ? <DoneScreen ui={ui} entry={entry} onWritten={() => go('doc')} /> : null}
        {stage === 'doc' ? <DocumentScreen ui={ui} entry={entry} onChange={persist} onNew={() => fresh()} /> : null}
        {stage === 'history' ? <HistoryScreen ui={ui} onOpen={open} onDeleted={refreshDraft} /> : null}
      </div>
      {langSheet ? <LanguageSheet ui={ui} langs={LANGS.filter((l) => cfg.languages.includes(l.code))} onPick={pickLang} onClose={() => setLangSheet(false)} /> : null}
    </div>
  );
}
