import { useState } from 'react';
import { detectLanguage, type LangCode } from '../lib/extract';
import { speech } from '../lib/speech';
import { LANGS, t } from '../i18n/strings';
import { VoiceCapture } from '../components/VoiceCapture';
import type { UI } from '../ui';
import { CheckIcon } from '../components/icons';

export function LanguageScreen({ ui, current, onPick }: { ui: UI; current: LangCode | null; onPick: (l: LangCode) => void }) {
  const [listen, setListen] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);

  const ask = async () => {
    setHeard(null);
    // The spec: the app says "Apni bhasha chuniye" and listens.
    if (!ui.muted) await speech.speak('अपनी भाषा चुनिए', 'hi-IN');
    setListen(true);
  };

  return (
    <div className="px-4 pt-6 pb-10 flex flex-col gap-6">
      <div>
        <h1 className="text-[2rem] font-black leading-tight">अपनी भाषा चुनिए</h1>
        <p className="text-[1.15rem] text-ink-soft font-semibold mt-1">Choose your language</p>
      </div>
      <div className="grid grid-cols-2 gap-3" role="radiogroup">
        {LANGS.map((l) => {
          const active = l.code === current;
          return (
            <button
              key={l.code}
              role="radio"
              aria-checked={active}
              onClick={() => onPick(l.code)}
              lang={l.code}
              className={`relative text-left rounded-2xl border-[1.5px] p-4 min-h-[104px] flex flex-col justify-between transition active:scale-[0.98] ${
                active ? 'bg-ink text-card border-ink shadow-stamp' : 'bg-card border-line hover:border-ink'
              } ${l.code === 'hi-IN' ? 'col-span-2 min-h-[92px]' : ''}`}
            >
              <span className="text-[1.75rem] font-extrabold leading-none">{l.native}</span>
              <span className={`text-[0.9rem] font-semibold ${active ? 'text-card/80' : 'text-ink-soft'}`}>{l.english}</span>
              {active ? <CheckIcon className="absolute top-3 right-3 w-6 h-6 text-saffron" /> : null}
            </button>
          );
        })}
      </div>

      {speech.canListen ? (
        <div className="flex flex-col gap-3">
          {listen ? (
            <VoiceCapture
              ui={{ ...ui, mode: 'voice' }}
              purpose="language"
              listenLang="hi-IN"
              autoStart
              micLabel={t('hi-IN', 'langSpeak')}
              validate={(text) => detectLanguage(text) !== null}
              onResult={(text) => {
                const code = detectLanguage(text);
                setListen(false);
                setHeard(text);
                if (code) onPick(code);
              }}
            />
          ) : (
            <button className="btn-ghost w-full min-h-[64px]" onClick={ask}>
              <span className="w-3 h-3 rounded-full bg-saffron" />
              {t('hi-IN', 'langSpeak')} · Say your language
            </button>
          )}
          {heard ? <p className="text-center text-ink-soft">“{heard}”</p> : null}
        </div>
      ) : null}
    </div>
  );
}
