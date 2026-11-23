import { useState } from 'react';
import type { FieldKey } from '../lib/extract';
import { keypadValid } from '../lib/choices';
import { formatINR, groupDigits, formatPhone } from '../lib/format';

/** Big phone-style keypad: research says numbers by keypad beat dictation after a miss. */
export function Keypad(props: { field: FieldKey; doneLabel: string; onDone: (digits: string) => void; initial?: string }) {
  const [d, setD] = useState(props.initial ?? '');
  const ok = keypadValid(props.field, d);
  const shown =
    d === ''
      ? '—'
      : props.field === 'amount'
        ? formatINR(Number(d))
        : props.field === 'suspectPhone' && d.length === 10
          ? formatPhone(d)
          : groupDigits(d);
  const press = (k: string) => setD((v) => (k === '⌫' ? v.slice(0, -1) : v.length >= 18 ? v : v + k));
  return (
    <div data-testid="keypad">
      <p className="text-hero font-display tabular-nums break-words min-h-[4rem]" aria-live="polite">
        {shown}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-x-2">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((k, i) =>
          k === '' ? (
            <span key={i} />
          ) : (
            <button
              key={i}
              onClick={() => press(k)}
              aria-label={k === '⌫' ? 'delete' : k}
              className="h-[4.25rem] rounded-full text-[2rem] font-semibold tabular-nums active:bg-teal-wash"
            >
              {k}
            </button>
          ),
        )}
      </div>
      <button className="btn-main mt-3" disabled={!ok} onClick={() => props.onDone(d)} data-testid="keypad-done">
        {props.doneLabel}
      </button>
    </div>
  );
}
