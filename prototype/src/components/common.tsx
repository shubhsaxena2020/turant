import { useState, type ReactNode } from 'react';
import type { FieldKey } from '../lib/extract';
import { confidenceLevel, type Conflict } from '../lib/report';
import { displayValue } from '../lib/outputs';
import type { UI } from '../ui';
import { BackIcon, CheckIcon, CopyIcon, GlobeIcon, ListIcon, PhoneIcon, SpeakerIcon } from './icons';
import { langInfo } from '../i18n/strings';

export function Header(props: {
  ui: UI;
  onBack?: () => void;
  onLanguage: () => void;
  onReports: () => void;
  onToggleSound: () => void;
}) {
  const { ui } = props;
  return (
    <header className="sticky top-0 z-20 bg-paper/95 backdrop-blur border-b-[1.5px] border-line">
      <div className="tricolour h-[5px]" />
      <div className="flex items-center gap-1 px-2 h-[60px]">
        {props.onBack ? (
          <button className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-card" onClick={props.onBack} aria-label={ui.t('back')}>
            <BackIcon className="w-7 h-7" />
          </button>
        ) : (
          <span className="w-2" />
        )}
        <div className="flex items-baseline gap-2 mr-auto select-none">
          <span className="text-[1.45rem] font-black tracking-tight">Turant</span>
          <span className="text-[1.05rem] font-bold text-saffron-dark">तुरंत</span>
        </div>
        {!ui.online ? (
          <span className="mr-1 rounded-full bg-ink text-card text-[0.78rem] font-bold px-2.5 py-1 flex items-center gap-1" data-testid="offline-badge">
            <span className="w-2 h-2 rounded-full bg-amberx" /> {ui.t('offline')}
          </span>
        ) : null}
        <button
          className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-card"
          onClick={props.onToggleSound}
          aria-label={ui.muted ? ui.t('soundOff') : ui.t('soundOn')}
          aria-pressed={!ui.muted}
        >
          <SpeakerIcon off={ui.muted} className="w-6 h-6" />
        </button>
        <button className="h-12 px-2 rounded-xl flex items-center gap-1 hover:bg-card font-bold" onClick={props.onLanguage} aria-label={ui.t('language')}>
          <GlobeIcon className="w-5 h-5" />
          <span className="text-[0.9rem]">{langInfo(ui.lang).native}</span>
        </button>
        <button className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-card" onClick={props.onReports} aria-label={ui.t('myReports')}>
          <ListIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}

export function AlertStrip({ ui }: { ui: UI }) {
  return (
    <a
      href="tel:1930"
      className="flex items-center gap-3 rounded-2xl bg-alarm text-white px-4 py-3.5 shadow-[0_2px_0_0_#8A1A12] active:scale-[0.99]"
    >
      <span className="shrink-0 w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">
        <PhoneIcon className="w-6 h-6" />
      </span>
      <span className="font-bold leading-snug text-[1.02rem]">{ui.t('alertStrip')}</span>
      <span className="ml-auto shrink-0 rounded-xl bg-white text-alarm font-black px-3 py-2 text-[1.05rem]">1930</span>
    </a>
  );
}

export function ConfidenceDot({ c, ui }: { c: number; ui: UI }) {
  const lvl = confidenceLevel(c);
  const color = lvl === 'high' ? 'bg-leaf' : lvl === 'mid' ? 'bg-amberx' : 'bg-alarm';
  const label = ui.t(lvl === 'high' ? 'conf_high' : lvl === 'mid' ? 'conf_mid' : 'conf_low');
  return (
    <span className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-ink-soft" title={label}>
      <span className={`w-3 h-3 rounded-full ${color} ring-2 ring-white`} aria-hidden />
      {label}
    </span>
  );
}

export function CopyButton({ text, ui, className, label }: { text: string; ui: UI; className?: string; label?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* ignore */
      }
      ta.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  };
  return (
    <button className={className ?? 'btn-ghost'} onClick={copy}>
      {done ? <CheckIcon className="w-5 h-5 text-leaf" /> : <CopyIcon className="w-5 h-5" />}
      {done ? ui.t('copied') : (label ?? ui.t('copy'))}
    </button>
  );
}

export function Section({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="paper-card p-4">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-[1.15rem] font-extrabold leading-tight">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function ConflictSheet({ ui, conflict, onPick }: { ui: UI; conflict: Conflict; onPick: (which: 'current' | 'incoming') => void }) {
  const field = conflict.field as FieldKey;
  const label = ui.t(`f_${field}` as never);
  const show = (v: Conflict['current']) => displayValue(field, { [field]: v }, ui.lang) ?? String(v.value);
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/40" role="dialog" aria-modal="true">
      <div className="w-full max-w-[440px] bg-paper rounded-t-3xl p-5 pb-8 rise">
        <p className="label-caps">{label}</p>
        <h2 className="text-[1.5rem] font-black mt-1">{ui.t('conflictTitle')}</h2>
        <p className="text-ink-soft mt-1">{ui.t('conflictBody', { field: label })}</p>
        <div className="grid gap-3 mt-4">
          <button className="btn-ghost text-[1.2rem] justify-start" onClick={() => onPick('current')}>
            {show(conflict.current)}
          </button>
          <button className="btn-ghost text-[1.2rem] justify-start" onClick={() => onPick('incoming')}>
            {show(conflict.incoming)}
          </button>
        </div>
      </div>
    </div>
  );
}
