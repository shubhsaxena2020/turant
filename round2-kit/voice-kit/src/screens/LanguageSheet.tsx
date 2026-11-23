import type { LangCode, LangInfo } from '../lib/lang';
import { Row, Sheet } from '../components/Sheet';
import { CheckIcon } from '../components/icons';
import type { UI } from '../ui';

/** Language is never a gate: this sheet is the fallback behind the name in the top bar. */
export function LanguageSheet(props: { ui: UI; langs: LangInfo[]; onPick: (l: LangCode) => void; onClose: () => void }) {
  const { ui } = props;
  return (
    <Sheet title={ui.t('chooseLang')} closeLabel={ui.t('closeSheet')} onClose={props.onClose} testId="sheet-lang">
      <div className="rows">
        {props.langs.map((l) => (
          <Row key={l.code} onClick={() => props.onPick(l.code)} selected={l.code === ui.lang} testId={`lang-${l.code}`}>
            <span className="flex-1 text-title font-display" lang={l.code.slice(0, 2)}>
              {l.native}
            </span>
            <span className="text-label text-muted">{l.english}</span>
            {l.code === ui.lang ? <CheckIcon className="w-6 h-6 text-teal" /> : null}
          </Row>
        ))}
      </div>
    </Sheet>
  );
}
