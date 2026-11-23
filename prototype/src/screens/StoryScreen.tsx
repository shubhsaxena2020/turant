import { useState } from 'react';
import { extractFields, FIELD_ORDER, type FieldKey } from '../lib/extract';
import { mergeExtraction, pendingQuestions, REQUIRED, type Report, type Source } from '../lib/report';
import { displayValue } from '../lib/outputs';
import { VoiceCapture, type Via } from '../components/VoiceCapture';
import { ConfidenceDot } from '../components/common';
import { CheckIcon, MicIcon } from '../components/icons';
import { t as tr } from '../i18n/strings';
import type { UI } from '../ui';

export const viaToSource = (via: Via): Source => (via === 'typed' ? 'typed' : via === 'sample' ? 'sample' : 'voice');

export function StoryScreen(props: { ui: UI; report: Report; sampleText: string | null; onChange: (r: Report) => void; onContinue: () => void }) {
  const { ui, report } = props;
  const [capturing, setCapturing] = useState(report.turns.length === 0);
  const [round, setRound] = useState(0);
  const [changed, setChanged] = useState<FieldKey[]>([]);
  const useSample = !!props.sampleText && report.turns.length === 0;

  const onResult = (text: string, conf: number, via: Via) => {
    const now = new Date();
    const ext = extractFields(text, { now });
    const m = mergeExtraction(report.fields, ext, {
      source: viaToSource(via),
      asrConfidence: via === 'typed' ? undefined : conf,
      mode: 'story',
    });
    props.onChange({
      ...report,
      turns: [...report.turns, text],
      fields: m.fields,
      conflicts: [...report.conflicts, ...m.conflicts],
      updatedAt: now.toISOString(),
    });
    setChanged(m.changed);
    setCapturing(false);
    void ui.say((l) => tr(l, 'gotIt'));
  };

  const pending = pendingQuestions(report.fields, report.skipped);
  const found = FIELD_ORDER.filter((k) => report.fields[k]);
  const missingRequired = REQUIRED.filter((k) => !report.fields[k]);

  return (
    <div className="px-4 pt-5 pb-10 flex flex-col gap-5">
      {report.turns.length > 0 ? (
        <section className="paper-card p-4">
          <p className="label-caps">{ui.t('heard')}</p>
          <div className="mt-2 flex flex-col gap-2">
            {report.turns.map((turn, i) => (
              <p key={i} className="text-[1.15rem] leading-snug font-semibold border-l-4 border-saffron pl-3" data-testid="turn">
                {turn}
              </p>
            ))}
          </div>
        </section>
      ) : (
        <div>
          <h1 className="text-[1.7rem] font-black leading-tight">{ui.t('homeMic')}</h1>
          <p className="text-ink-soft mt-1">{ui.t('homeHint')}</p>
        </div>
      )}

      {capturing ? (
        <VoiceCapture
          key={round}
          ui={ui}
          purpose="story"
          hero
          minWords={3}
          simulateText={useSample ? props.sampleText : null}
          autoStart={useSample || round > 0 || ui.mode === 'voice'}
          micLabel={ui.t('tapToSpeak')}
          onResult={onResult}
        />
      ) : null}

      {!capturing && report.turns.length > 0 ? (
        <>
          <section className="paper-card p-4" data-testid="understood">
            <p className="label-caps">{ui.t('understood')}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {found.map((k, i) => (
                <li
                  key={k}
                  className={`rise flex items-center gap-3 rounded-xl border-[1.5px] border-line bg-white px-3 py-2.5 ${changed.includes(k) ? 'flash' : ''}`}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <span className="w-8 h-8 rounded-full bg-leaf text-white flex items-center justify-center shrink-0">
                    <CheckIcon className="w-5 h-5" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[0.85rem] font-semibold text-ink-soft">{ui.t(`f_${k}` as never)}</span>
                    <span className="block font-extrabold text-[1.1rem] break-words">{displayValue(k, report.fields, ui.lang)}</span>
                  </span>
                  <ConfidenceDot c={report.fields[k]!.confidence} ui={ui} />
                </li>
              ))}
              {missingRequired.map((k) => (
                <li key={k} className="flex items-center gap-3 rounded-xl border-[1.5px] border-dashed border-alarm/50 px-3 py-2.5">
                  <span className="w-8 h-8 rounded-full border-2 border-alarm/60 shrink-0" />
                  <span className="flex-1 font-semibold">{ui.t(`f_${k}` as never)}</span>
                  <span className="text-[0.85rem] font-bold text-alarm">{ui.t('needed')}</span>
                </li>
              ))}
            </ul>
          </section>
          <button className="btn-primary w-full min-h-[64px] text-[1.2rem]" onClick={props.onContinue} data-testid="story-continue">
            {ui.t('continue')} {pending.length ? `· ${ui.t('questionNofM', { n: 1, m: pending.length })}` : ''}
          </button>
          <button
            className="btn-ghost w-full"
            onClick={() => {
              setRound((r) => r + 1);
              setCapturing(true);
            }}
          >
            <MicIcon className="w-6 h-6 text-saffron-dark" /> {ui.t('sayMore')}
          </button>
        </>
      ) : null}
    </div>
  );
}
