// Report model, follow-up question queue and merge rules. Pure, no DOM.
import type { Extraction, FieldKey, LangCode } from './extract';

export type QuestionKey = 'amount' | 'time' | 'scamType' | 'bank' | 'utr' | 'suspect';
export type Source = 'voice' | 'typed' | 'edited' | 'tap' | 'sample';

export interface FieldValue {
  value: string | number;
  confidence: number;
  source: Source;
  /** Shown on the read-back screen for the person to check (e.g. "7:00 pm today", a time still ahead). */
  note?: string;
}

export type Fields = Partial<Record<FieldKey, FieldValue>>;

export interface Conflict {
  field: FieldKey;
  current: FieldValue;
  incoming: FieldValue;
}

export interface Report {
  id: string;
  lang: LangCode;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'ready';
  /** Every spoken / typed story turn, in order. */
  turns: string[];
  fields: Fields;
  skipped: QuestionKey[];
  conflicts: Conflict[];
  sample?: boolean;
  ack?: string;
  checks?: boolean[];
}

export const REQUIRED: (FieldKey & QuestionKey)[] = ['amount', 'time', 'scamType', 'bank'];
export const SUSPECT_FIELDS: FieldKey[] = ['suspectUpi', 'suspectPhone', 'suspectAccount'];

export function newReport(lang: LangCode, opts: { sample?: boolean; now?: Date } = {}): Report {
  const now = (opts.now ?? new Date()).toISOString();
  return {
    id: 'r_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36),
    lang,
    createdAt: now,
    updatedAt: now,
    status: 'draft',
    turns: [],
    fields: {},
    skipped: [],
    conflicts: [],
    sample: opts.sample,
  };
}

/** Questions still to ask, in order: required fields first, then UTR, then suspect details. */
export function pendingQuestions(fields: Fields, skipped: QuestionKey[] = []): QuestionKey[] {
  const out: QuestionKey[] = [];
  for (const k of REQUIRED) if (fields[k] === undefined && !skipped.includes(k)) out.push(k);
  if (fields.utr === undefined && !skipped.includes('utr')) out.push('utr');
  if (SUSPECT_FIELDS.every((k) => fields[k] === undefined) && !skipped.includes('suspect')) out.push('suspect');
  return out;
}

export function questionFields(q: QuestionKey): FieldKey[] {
  return q === 'suspect' ? SUSPECT_FIELDS : [q];
}

export function sameValue(field: FieldKey, a: string | number, b: string | number): boolean {
  if (field === 'time') return Math.abs(new Date(a).getTime() - new Date(b).getTime()) <= 20 * 60_000;
  if (typeof a === 'number' || typeof b === 'number') return Number(a) === Number(b);
  return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
}

export interface MergeOptions {
  source: Source;
  /** Scale field confidence by recogniser confidence (0..1). 0 means unknown. */
  asrConfidence?: number;
  /** Fields the user is explicitly answering or correcting: always overwritten. */
  overwrite?: FieldKey[];
  /** "story": a different value for a known field is a contradiction to ask about.
   *  "answer": other fields only fill gaps, never contradict. */
  mode: 'story' | 'answer';
}

export interface MergeResult {
  fields: Fields;
  conflicts: Conflict[];
  changed: FieldKey[];
}

export function scaleConfidence(conf: number, asr?: number): number {
  const factor = asr && asr > 0 ? 0.6 + 0.4 * asr : asr === 0 ? 0.9 : 1;
  return Math.round(Math.min(1, conf * factor) * 100) / 100;
}

export function mergeExtraction(fields: Fields, ext: Extraction, opts: MergeOptions): MergeResult {
  const next: Fields = { ...fields };
  const conflicts: Conflict[] = [];
  const changed: FieldKey[] = [];
  for (const key of Object.keys(ext) as FieldKey[]) {
    const hit = ext[key];
    if (!hit) continue;
    const incoming: FieldValue = {
      value: hit.value,
      confidence: scaleConfidence(hit.confidence, opts.asrConfidence),
      source: opts.source,
      ...(hit.note ? { note: hit.note } : {}),
    };
    const cur = next[key];
    if (!cur) {
      next[key] = incoming;
      changed.push(key);
    } else if (opts.overwrite?.includes(key)) {
      next[key] = incoming;
      changed.push(key);
    } else if (sameValue(key, cur.value, incoming.value)) {
      next[key] = { ...cur, confidence: Math.max(cur.confidence, incoming.confidence) };
    } else if (opts.mode === 'story' && cur.source !== 'edited') {
      conflicts.push({ field: key, current: cur, incoming });
    }
  }
  return { fields: next, conflicts, changed };
}

export function setField(report: Report, field: FieldKey, value: FieldValue): Report {
  return {
    ...report,
    fields: { ...report.fields, [field]: value },
    conflicts: report.conflicts.filter((c) => c.field !== field),
    updatedAt: new Date().toISOString(),
  };
}

export function needsPoliceVisit(fields: Fields, now: Date = new Date()): boolean {
  const amount = Number(fields.amount?.value ?? 0);
  const t = fields.time ? new Date(String(fields.time.value)).getTime() : NaN;
  return amount > 100000 || (!Number.isNaN(t) && now.getTime() - t > 3 * 86_400_000);
}

export type ConfidenceLevel = 'high' | 'mid' | 'low';
export function confidenceLevel(c: number): ConfidenceLevel {
  return c >= 0.8 ? 'high' : c >= 0.6 ? 'mid' : 'low';
}
