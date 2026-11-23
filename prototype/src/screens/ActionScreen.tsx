import { useEffect, useMemo } from 'react';
import type { Report } from '../lib/report';
import { needsPoliceVisit } from '../lib/report';
import { build1930Script, buildBankMessage, buildComplaintText, buildPortalDescription, buildFamilyMessage, whatsappLink } from '../lib/outputs';
import { t as tr, type StrKey } from '../i18n/strings';
import { CopyButton, Section } from '../components/common';
import { CheckIcon, ExternalIcon, PhoneIcon, ShareIcon, SpeakerIcon, WhatsAppIcon } from '../components/icons';
import type { UI } from '../ui';

const CHECKS: StrKey[] = ['check_block', 'check_pin', 'check_otp', 'check_screens', 'check_ack'];

export function ActionScreen(props: { ui: UI; report: Report; onChange: (r: Report) => void; onNew: () => void }) {
  const { ui, report } = props;
  const script = useMemo(() => build1930Script(report, ui.lang), [report, ui.lang]);
  const complaint = useMemo(() => buildComplaintText(report), [report]);
  const description = useMemo(() => buildPortalDescription(report), [report]);
  const bankMsg = useMemo(() => buildBankMessage(report), [report]);
  const family = useMemo(() => buildFamilyMessage(report, ui.lang), [report, ui.lang]);
  const checks = report.checks ?? CHECKS.map(() => false);

  const sayScript = () => ui.say((l) => build1930Script(report, l, { spoken: true }).join(' '));
  const sayChecklist = () => ui.say((l) => `${tr(l, 'checklistTitle')}. ${CHECKS.map((k) => tr(l, k)).join(' ')}`);

  useEffect(() => {
    void ui.say((l) => `${tr(l, 'actionTitle')}. ${tr(l, 'callNowBig')}. ${tr(l, 'checklistTitle')}. ${CHECKS.map((k) => tr(l, k)).join(' ')}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shareBank = async () => {
    const nav = navigator as Navigator & { share?: (d: ShareData) => Promise<void> };
    if (nav.share) {
      try {
        await nav.share({ title: 'Fraud complaint', text: bankMsg });
        return;
      } catch {
        /* cancelled: fall through to WhatsApp */
      }
    }
    window.open(whatsappLink(bankMsg), '_blank', 'noopener');
  };

  return (
    <div className="px-4 pt-5 pb-12 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-14 h-14 rounded-full bg-leaf text-white flex items-center justify-center shadow-[0_2px_0_0_#0B5E41]">
          <CheckIcon className="w-8 h-8" />
        </span>
        <div>
          <h1 className="text-[1.8rem] font-black leading-tight">{ui.t('actionTitle')}</h1>
          <p className="text-ink-soft font-semibold leading-snug mt-1">{ui.t('actionSub')}</p>
        </div>
      </div>

      <a href="tel:1930" className="btn-go w-full min-h-[72px] text-[1.4rem]" data-testid="call-1930">
        <PhoneIcon className="w-8 h-8" /> {ui.t('callNowBig')}
      </a>

      {needsPoliceVisit(report.fields) ? (
        <p className="rounded-2xl bg-amberx-soft border-[1.5px] border-amberx/50 px-4 py-3 font-semibold leading-snug">{ui.t('policeAdvice')}</p>
      ) : null}

      <Section
        title={ui.t('scriptTitle')}
        aside={
          <button className="btn-quiet min-h-[44px] !px-2" onClick={() => void sayScript()} aria-label={ui.t('readAloud')}>
            <SpeakerIcon className="w-5 h-5" />
          </button>
        }
      >
        <ol className="flex flex-col gap-2.5" data-testid="script">
          {script.map((line, i) => (
            <li key={i} className="flex gap-3 text-[1.08rem] leading-snug font-semibold">
              <span className="shrink-0 w-7 h-7 rounded-full bg-ink text-card text-[0.85rem] font-black flex items-center justify-center mt-0.5">{i + 1}</span>
              <span>{line}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={ui.t('complaintTitle')}>
        <p className="text-ink-soft text-[0.95rem] -mt-1 mb-3">{ui.t('complaintSub')}</p>
        <pre className="ledger max-h-[22rem] overflow-auto rounded-xl border-[1.5px] border-line bg-white p-3 text-[0.8rem] leading-[1.6] font-mono whitespace-pre-wrap break-words" data-testid="complaint">
          {complaint}
        </pre>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <CopyButton text={complaint} ui={ui} />
          <a className="btn-primary" href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">
            <ExternalIcon className="w-5 h-5" /> {ui.t('openPortal')}
          </a>
        </div>
        <CopyButton text={description} ui={ui} label={ui.t('copyDesc')} className="btn-ghost w-full mt-3" />
      </Section>

      <Section title={ui.t('bankMsgTitle')}>
        <pre className="max-h-[14rem] overflow-auto rounded-xl border-[1.5px] border-line bg-white p-3 text-[0.85rem] leading-[1.55] whitespace-pre-wrap break-words font-sans">{bankMsg}</pre>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <CopyButton text={bankMsg} ui={ui} />
          <button className="btn-ghost" onClick={() => void shareBank()}>
            <ShareIcon className="w-5 h-5" /> {ui.t('share')}
          </button>
        </div>
      </Section>

      <Section title={ui.t('familyTitle')}>
        <p className="leading-snug">{family}</p>
        <a className="btn w-full mt-3 bg-[#1F7A4D] text-white hover:bg-[#17633E]" href={whatsappLink(family)} target="_blank" rel="noopener noreferrer" data-testid="whatsapp">
          <WhatsAppIcon className="w-6 h-6" /> {ui.t('whatsappFamily')}
        </a>
      </Section>

      <Section
        title={ui.t('checklistTitle')}
        aside={
          <button className="btn-quiet min-h-[44px] !px-2" onClick={() => void sayChecklist()} aria-label={ui.t('readAloud')}>
            <SpeakerIcon className="w-5 h-5" />
          </button>
        }
      >
        <ul className="flex flex-col gap-2">
          {CHECKS.map((k, i) => (
            <li key={k}>
              <label className="flex items-start gap-3 rounded-xl px-2 py-2 hover:bg-paper cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-6 h-6 accent-[#13805A] shrink-0"
                  checked={checks[i]}
                  onChange={() => props.onChange({ ...report, checks: checks.map((c, j) => (j === i ? !c : c)), updatedAt: new Date().toISOString() })}
                />
                <span className={`leading-snug font-semibold ${checks[i] ? 'line-through text-ink-faint' : ''}`}>{ui.t(k)}</span>
              </label>
            </li>
          ))}
        </ul>
        <label className="block mt-3">
          <span className="label-caps">{ui.t('ackLabel')}</span>
          <input
            value={report.ack ?? ''}
            onChange={(e) => props.onChange({ ...report, ack: e.target.value, updatedAt: new Date().toISOString() })}
            placeholder={ui.t('ackPlaceholder')}
            className="mt-1 w-full min-h-[52px] rounded-xl border-[1.5px] border-line bg-white px-3 text-[1.1rem] focus:border-ink outline-none"
          />
        </label>
      </Section>

      <p className="text-[0.9rem] text-ink-faint text-center leading-snug">{ui.t('privacyNote')}</p>
      <button className="btn-ghost w-full" onClick={props.onNew}>
        {ui.t('newReport')}
      </button>
    </div>
  );
}
