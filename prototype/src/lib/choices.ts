// Touch alternatives used after a voice miss (research: switch modality after 2 misses).
import type { FieldKey } from './extract';
import type { QuestionKey, Source } from './report';

export const TOP_BANKS: string[] = [
  'State Bank of India (SBI)',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank (PNB)',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Kotak Mahindra Bank',
  'India Post Payments Bank',
];

export const PAYMENT_APPS: string[] = ['PhonePe', 'Google Pay', 'Paytm', 'BHIM', 'Bank app'];

export type Via = 'voice' | 'typed' | 'sample' | 'tap';

export const viaToSource = (via: Via): Source =>
  via === 'typed' ? 'typed' : via === 'sample' ? 'sample' : via === 'tap' ? 'tap' : 'voice';

/** Fields whose spoken answer must be read back and confirmed (money, dates, IDs). */
export const EXPLICIT: QuestionKey[] = ['amount', 'time', 'utr', 'suspect'];

/** Which questions can be answered on a number keypad, and the field the digits fill. */
export function keypadField(q: QuestionKey | FieldKey): FieldKey | null {
  switch (q) {
    case 'amount':
      return 'amount';
    case 'utr':
      return 'utr';
    case 'suspect':
    case 'suspectPhone':
      return 'suspectPhone';
    case 'suspectAccount':
      return 'suspectAccount';
    default:
      return null;
  }
}

/** Validate keypad digits for a field. */
export function keypadValid(field: FieldKey, digits: string): boolean {
  if (field === 'amount') return /^\d{1,9}$/.test(digits) && Number(digits) > 0;
  if (field === 'utr') return /^\d{12}$/.test(digits);
  if (field === 'suspectPhone') return /^[6-9]\d{9}$/.test(digits);
  if (field === 'suspectAccount') return /^\d{9,18}$/.test(digits);
  return digits.length > 0;
}
