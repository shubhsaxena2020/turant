// Interpreting one answer to one question, and committing it. Pure, no DOM.
import { detectIntent, extractFields, type Extraction, type FieldKey, type LangCode } from './extract';
import { mergeExtraction, questionFields, type QuestionKey, type Report, type Source } from './report';
import { displayValue, spokenValue } from './outputs';

export type Interpretation = { kind: 'skip' } | { kind: 'miss' } | { kind: 'value'; ext: Extraction; keys: FieldKey[] };

export function interpret(text: string, q: QuestionKey, now: Date = new Date()): Interpretation {
  if (detectIntent(text) === 'skip') return { kind: 'skip' };
  const ext = extractFields(text, { now, hint: q === 'suspect' ? 'suspect' : q });
  const keys = questionFields(q).filter((k) => ext[k] !== undefined);
  return keys.length ? { kind: 'value', ext, keys } : { kind: 'miss' };
}

/** Target fields overwrite; anything else heard (e.g. from a read-out SMS) only fills gaps. */
export function commitAnswer(
  report: Report,
  ext: Extraction,
  keys: FieldKey[],
  source: Source,
  asr?: number,
): { report: Report; changed: FieldKey[] } {
  const m = mergeExtraction(report.fields, ext, { source, asrConfidence: asr, mode: 'answer', overwrite: keys });
  return {
    report: { ...report, fields: m.fields, skipped: report.skipped, updatedAt: new Date().toISOString() },
    changed: m.changed,
  };
}

/** Values of an extraction as display text ("₹5,000"). */
export function shownValues(ext: Extraction, keys: FieldKey[], lang: LangCode, now: Date = new Date()): string {
  const f = Object.fromEntries(keys.filter((k) => ext[k]).map((k) => [k, { value: ext[k]!.value, confidence: 1, source: 'voice' as Source }]));
  return keys
    .map((k) => displayValue(k, f, lang, now))
    .filter(Boolean)
    .join(', ');
}

/** Values as they should be spoken: IDs digit by digit in groups. */
export function spokenValues(ext: Extraction, keys: FieldKey[], lang: LangCode, now: Date = new Date()): string {
  const f = Object.fromEntries(keys.filter((k) => ext[k]).map((k) => [k, { value: ext[k]!.value, confidence: 1, source: 'voice' as Source }]));
  return keys
    .map((k) => spokenValue(k, f, lang, now))
    .filter(Boolean)
    .join(', ');
}
