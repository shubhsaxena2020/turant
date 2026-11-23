import { useState } from 'react';
import { CheckIcon, CopyIcon } from './icons';
import { cue } from '../lib/cues';

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch {
      /* ignore */
    }
    ta.remove();
  }
}

/**
 * Copy that confirms in place: the label morphs to "Copied ✓" and stays,
 * instead of a toast that vanishes before an elder can read it.
 */
export function CopyButton(props: { text: string; label: string; doneLabel: string; variant: 'main' | 'link'; testId?: string }) {
  const [done, setDone] = useState(false);
  const onClick = async () => {
    await copyText(props.text);
    cue('captured');
    setDone(true);
  };
  if (props.variant === 'main')
    return (
      <button className={`btn-main ${done ? 'is-done' : ''}`} onClick={onClick} data-testid={props.testId}>
        {done ? <CheckIcon className="w-6 h-6" /> : <CopyIcon className="w-6 h-6" />}
        {done ? props.doneLabel : props.label}
      </button>
    );
  return (
    <button className={`link ${done ? '!text-ok' : ''}`} onClick={onClick} data-testid={props.testId}>
      {done ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
      {done ? props.doneLabel : props.label}
    </button>
  );
}
