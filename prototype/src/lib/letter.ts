// "The letter being written": the complaint as first-person sentences in the
// user's language, with facts emphasised and missing facts as dotted gaps.
// No labels, no fields: the sentence is the label. Pure, no DOM.
import type { FieldKey, LangCode } from './extract';
import type { Fields, QuestionKey, Report } from './report';
import { displayValue } from './outputs';
import { t, type StrKey } from '../i18n/strings';

export type Segment =
  | { kind: 'text'; text: string }
  | { kind: 'fact'; q: QuestionKey | 'paymentApp'; fields: FieldKey[]; text: string }
  | { kind: 'gap'; q: QuestionKey }
  | { kind: 'later'; q: QuestionKey; text: string };

export type Sentence = Segment[];

const SLOT_Q: Record<string, QuestionKey | 'paymentApp'> = {
  when: 'time',
  scam: 'scamType',
  bank: 'bank',
  amount: 'amount',
  app: 'paymentApp',
  utr: 'utr',
  suspect: 'suspect',
};

const SLOT_FIELDS: Record<string, FieldKey[]> = {
  when: ['time'],
  scam: ['scamType'],
  bank: ['bank'],
  amount: ['amount'],
  app: ['paymentApp'],
  utr: ['utr'],
  suspect: ['suspectUpi', 'suspectPhone', 'suspectAccount'],
};

function slotValue(slot: string, fields: Fields, lang: LangCode, now: Date): string | undefined {
  const keys = SLOT_FIELDS[slot];
  const parts = keys.map((k) => displayValue(k, fields, lang, now)).filter((v): v is string => !!v);
  return parts.length ? parts.join(', ') : undefined;
}

/** Split "मेरे {bank} खाते से {amount} कट गए।" into text / fact / gap segments. */
export function fillTemplate(template: string, fields: Fields, skipped: QuestionKey[], lang: LangCode, now: Date): Sentence {
  const out: Sentence = [];
  const re = /\{(\w+)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(template))) {
    if (m.index > last) out.push({ kind: 'text', text: template.slice(last, m.index) });
    const slot = m[1];
    const q = SLOT_Q[slot];
    const value = slotValue(slot, fields, lang, now);
    if (value !== undefined) out.push({ kind: 'fact', q, fields: SLOT_FIELDS[slot], text: value });
    else if (q !== 'paymentApp' && skipped.includes(q)) out.push({ kind: 'later', q, text: t(lang, 'later') });
    else if (q !== 'paymentApp') out.push({ kind: 'gap', q });
    last = re.lastIndex;
  }
  if (last < template.length) out.push({ kind: 'text', text: template.slice(last) });
  return out;
}

const ORDER: { key: StrKey; onlyIf?: FieldKey }[] = [
  { key: 'L_when' },
  { key: 'L_scam' },
  { key: 'L_money' },
  { key: 'L_app', onlyIf: 'paymentApp' },
  { key: 'L_utr' },
  { key: 'L_suspect' },
];

export function buildLetter(report: Pick<Report, 'fields' | 'skipped'>, lang: LangCode, now: Date = new Date()): Sentence[] {
  return ORDER.filter((s) => !s.onlyIf || report.fields[s.onlyIf] !== undefined).map((s) =>
    fillTemplate(t(lang, s.key), report.fields, report.skipped, lang, now),
  );
}

/** Plain text of the letter (gaps as "…"), e.g. for reading aloud or sharing. */
export function letterText(sentences: Sentence[]): string {
  return sentences
    .map((s) => s.map((seg) => (seg.kind === 'gap' ? '…' : seg.text)).join(''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
