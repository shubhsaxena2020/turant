import { useEffect, useRef, useState } from 'react';
import { detectIntent, extractFields, SCAM_TYPES, type Extraction, type FieldKey, type ScamType } from '../lib/extract';
import { mergeExtraction, pendingQuestions, questionFields, type Fields, type QuestionKey, type Report } from '../lib/report';
import { displayValue, spokenValue } from '../lib/outputs';
import { SAMPLE_ANSWERS } from '../i18n/samples';
import { scamLabel, t as tr, type StrKey } from '../i18n/strings';
import { VoiceCapture, type Via } from '../components/VoiceCapture';
import { viaToSource } from './StoryScreen';
import { CheckIcon, PlayIcon } from '../components/icons';
import { speech } from '../lib/speech';
import type { UI } from '../ui';

const TOP_BANKS = [
  ['SBI', 'State Bank of India (SBI)'],
  ['HDFC', 'HDFC Bank'],
  ['ICICI', 'ICICI Bank'],
  ['Axis', 'Axis Bank'],
  ['PNB', 'Punjab National Bank (PNB)'],
  ['Baroda', 'Bank of Baroda'],
  ['Canara', 'Canara Bank'],
  ['Union', 'Union Bank of India'],
  ['Kotak', 'Kotak Mahindra Bank'],
] as const;

function toFields(ext: Extraction, keys: FieldKey[], via: Via): Fields {
  const f: Fields = {};
  for (const k of keys) {
    const hit = ext[k];
    if (hit) f[k] = { value: hit.value, confidence: hit.confidence, source: viaToSource(via) };
  }
  return f;
}

interface Pending {
  ext: Extraction;
  via: Via;
  conf: number;
}

export function QuestionsScreen(props: { ui: UI; report: Report; onChange: (r: Report) => void; onDone: () => void }) {
  const { ui, report } = props;
  const queue = pendingQuestions(report.fields, report.skipped);
  const q: QuestionKey | undefined = queue[0];
  const total = useRef(queue.length);
  if (queue.length > total.current) total.current = queue.length;
  const n = Math.max(1, total.current - queue.length + 1);

  const [confirm, setConfirm] = useState<Pending | null>(null);
  const [auto, setAuto] = useState(false);
  const [round, setRound] = useState(0);
  const [sim, setSim] = useState<string | null>(null);

  useEffect(() => {
    if (!q) props.onDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  // Ask each question aloud, then listen (voice mode, real users only).
  useEffect(() => {
    if (!q) return;
    let cancelled = false;
    setConfirm(null);
    setAuto(false);
    setSim(null);
    void ui
      .say((l) => `${tr(l, `q_${q}` as StrKey)} ${tr(l, 'example')}: ${tr(l, `ex_${q}` as StrKey)}`)
      .then(() => {
        if (!cancelled && ui.mode === 'voice' && speech.canListen && !report.sample) setAuto(true);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  if (!q) return null;
  const keys = questionFields(q);

  const commit = (fields: Fields) => {
    const ext: Extraction = {};
    for (const [k, v] of Object.entries(fields)) (ext as Record<string, unknown>)[k] = { value: v!.value, confidence: v!.confidence };
    const m = mergeExtraction(report.fields, ext, {
      source: Object.values(fields)[0]?.source ?? 'voice',
      mode: 'answer',
      overwrite: Object.keys(fields) as FieldKey[],
    });
    props.onChange({ ...report, fields: m.fields, updatedAt: new Date().toISOString() });
  };

  const commitPending = (p: Pending) => {
    // Target field(s) overwrite; anything else heard (e.g. from an SMS) only fills gaps.
    const m = mergeExtraction(report.fields, p.ext, {
      source: viaToSource(p.via),
      asrConfidence: p.via === 'typed' ? undefined : p.conf,
      mode: 'answer',
      overwrite: keys,
    });
    props.onChange({ ...report, fields: m.fields, updatedAt: new Date().toISOString() });
    void ui.say((l) => tr(l, 'gotIt'));
  };

  const skip = () => {
    props.onChange({ ...report, skipped: [...report.skipped, q], updatedAt: new Date().toISOString() });
  };

  const validate = (text: string) => detectIntent(text) === 'skip' || keys.some((k) => extractFields(text, { hint: q })[k]);

  const onResult = (text: string, conf: number, via: Via) => {
    if (detectIntent(text) === 'skip') return skip();
    const ext = extractFields(text, { now: new Date(), hint: q });
    const p = { ext, via, conf };
    setConfirm(p);
    // Always read numbers back before saving them.
    const shown = toFields(ext, keys, via);
    void ui.say((l) => {
      const vals = keys.map((k) => spokenValue(k, shown, l)).filter(Boolean).join(', ');
      return `${tr(l, 'iHeard')}: ${vals}. ${tr(l, 'isThisRight')}`;
    });
  };

  const shownFields = confirm ? toFields(confirm.ext, keys, confirm.via) : {};

  return (
    <div className="px-4 pt-5 pb-10 flex flex-col gap-5" data-testid={`question-${q}`}>
      <div className="flex items-center gap-3">
        <span className="label-caps">{ui.t('questionNofM', { n, m: total.current })}</span>
        <div className="flex-1 h-2 rounded-full bg-line overflow-hidden">
          <div className="h-full bg-saffron rounded-full transition-all" style={{ width: `${(n / Math.max(total.current, 1)) * 100}%` }} />
        </div>
      </div>

      <div className="rise" key={q}>
        <h1 className="text-[1.75rem] font-black leading-tight">{ui.t(`q_${q}` as StrKey)}</h1>
        <p className="mt-2 text-ink-soft text-[1.05rem]">
          <span className="font-bold">{ui.t('example')}:</span> {ui.t(`ex_${q}` as StrKey)}
        </p>
      </div>

      {q === 'utr' || q === 'suspect' ? (
        <div className="rounded-2xl bg-saffron-soft border-[1.5px] border-saffron/40 p-4 flex gap-3">
          <span className="shrink-0 w-10 h-10 rounded-xl bg-saffron text-white font-black flex items-center justify-center">SMS</span>
          <p className="font-semibold leading-snug">{ui.t(q === 'utr' ? 'help_utr' : 'help_suspect')}</p>
        </div>
      ) : null}

      {confirm ? (
        <div className="paper-card p-5 rise" data-testid="confirm">
          <p className="label-caps">{ui.t('iHeard')}</p>
          <div className="mt-2 flex flex-col gap-1">
            {keys
              .filter((k) => shownFields[k])
              .map((k) => (
                <p key={k} className="text-[1.9rem] font-black font-mono tracking-tight break-all leading-tight">
                  {displayValue(k, shownFields, ui.lang)}
                </p>
              ))}
          </div>
          <p className="mt-3 text-[1.15rem] font-bold">{ui.t('isThisRight')}</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button className="btn-go" onClick={() => commitPending(confirm)} data-testid="confirm-yes">
              <CheckIcon className="w-5 h-5" /> {ui.t('yesRight')}
            </button>
            <button
              className="btn-ghost"
              onClick={() => {
                setConfirm(null);
                setSim(null);
                setRound((r) => r + 1);
                setAuto(ui.mode === 'voice' && !report.sample);
              }}
            >
              {ui.t('noAgain')}
            </button>
          </div>
        </div>
      ) : (
        <>
          {q === 'scamType' ? (
            <div className="grid grid-cols-2 gap-3">
              {SCAM_TYPES.map((s: ScamType) => (
                <button
                  key={s}
                  className="paper-card min-h-[76px] p-3 text-left font-bold leading-snug hover:border-ink active:scale-[0.98]"
                  onClick={() => commit({ scamType: { value: s, confidence: 1, source: 'tap' } })}
                >
                  {scamLabel(ui.lang, s)}
                </button>
              ))}
            </div>
          ) : null}
          {q === 'bank' ? (
            <div className="grid grid-cols-3 gap-2.5">
              {TOP_BANKS.map(([short, full]) => (
                <button
                  key={full}
                  className="paper-card min-h-[60px] font-extrabold hover:border-ink active:scale-[0.98]"
                  onClick={() => commit({ bank: { value: full, confidence: 1, source: 'tap' } })}
                  title={full}
                >
                  {short}
                </button>
              ))}
            </div>
          ) : null}

          <VoiceCapture
            key={`${q}-${round}-${sim ?? ''}`}
            ui={ui}
            purpose="answer"
            simulateText={sim}
            autoStart={auto || !!sim}
            micLabel={ui.t('answerByVoice')}
            validate={validate}
            placeholder={ui.t(`ex_${q}` as StrKey).replace(/"/g, '')}
            onResult={onResult}
          />

          {report.sample && SAMPLE_ANSWERS[q] ? (
            <button className="btn-ghost w-full" onClick={() => setSim(SAMPLE_ANSWERS[q]!)} data-testid="sample-answer">
              <PlayIcon className="w-5 h-5 text-saffron-dark" /> {ui.t('useSampleAnswer')}
            </button>
          ) : null}

          <button className="btn-quiet self-center" onClick={skip} data-testid="skip">
            {ui.t('skip')}
          </button>
        </>
      )}
    </div>
  );
}
