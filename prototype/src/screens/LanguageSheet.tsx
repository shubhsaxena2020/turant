import type { LangCode } from '../lib/extract';
import { LANGS } from '../i18n/strings';
import { Row, Sheet } from '../components/Sheet';
import { CheckIcon } from '../components/icons';
import type { UI } from '../ui';

/** Which language the person will speak. Names are in English. The screen follows it unless "English screen" is on. */
export function LanguageSheet(props: { ui: UI; onPick: (l: LangCode) => void; englishUI: boolean; onEnglishUI: (v: boolean) => void; onClose: () => void }) {
  const { ui } = props;
  const names: Record<string, string> = { 'en-IN': 'English (India)', 'hi-IN': 'Hindi', 'bn-IN': 'Bengali', 'ta-IN': 'Tamil', 'te-IN': 'Telugu', 'mr-IN': 'Marathi', 'kn-IN': 'Kannada' };
  const order: LangCode[] = ['en-IN', ...LANGS.map((l) => l.code).filter((c) => c !== 'en-IN')];
  return (
    <Sheet title={ui.t('chooseLang')} closeLabel={ui.t('closeSheet')} onClose={props.onClose} testId="sheet-lang">
      <p className="text-base text-ink/70 -mt-1 mb-2">{ui.t('langSub')}</p>
      <div className="rows">
        {order.map((code) => (
          <Row key={code} onClick={() => props.onPick(code)} selected={code === ui.speakLang} testId={`lang-${code}`}>
            <span className="flex-1 text-title">{names[code]}</span>
            {code === ui.speakLang ? <CheckIcon className="w-6 h-6 text-ink" /> : null}
          </Row>
        ))}
      </div>
      {/* The screen follows the language above; this keeps it in English for people who read English more easily. */}
      <label className="mt-4 flex min-h-[3rem] items-center gap-3 text-lg font-medium" data-testid="english-ui">
        <input type="checkbox" className="h-6 w-6 accent-ink" checked={props.englishUI} onChange={(e) => props.onEnglishUI(e.target.checked)} />
        <span lang="en">English screen</span>
      </label>
    </Sheet>
  );
}
