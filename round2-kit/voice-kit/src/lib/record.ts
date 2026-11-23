// Entry model and merge rules (port of Turant's report.ts). Pure, no DOM.
import type { Conflict, DomainConfig, Entry, Fields, FieldValue, QtyItem, SlotDef, SlotValue, Source } from '../domain/types';
import type { LangCode } from './lang';
import type { Extraction } from './slots';

export function newEntry(app: string, lang: LangCode, opts: { sample?: boolean; now?: Date } = {}): Entry {
  const now = (opts.now ?? new Date()).toISOString();
  return {
    id: 'r_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36),
    app,
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

const isList = (s: SlotDef | undefined) => !!s && ((s.type === 'enum' && !!s.multi) || s.type === 'quantity+unit');
const listKey = (x: string | QtyItem) => (typeof x === 'string' ? x : `${x.item.toLowerCase()}|${x.unit}|${x.qty}`);

export function sameValue(slot: SlotDef | undefined, a: SlotValue, b: SlotValue): boolean {
  if (slot?.type === 'datetime') return Math.abs(new Date(String(a)).getTime() - new Date(String(b)).getTime()) <= 20 * 60_000;
  if (Array.isArray(a) || Array.isArray(b)) {
    const k = (v: SlotValue) => (Array.isArray(v) ? (v as (string | QtyItem)[]).map(listKey).sort().join(',') : String(v));
    return k(a) === k(b);
  }
  if (typeof a === 'number' || typeof b === 'number') return Number(a) === Number(b);
  if (typeof a === 'boolean' || typeof b === 'boolean') return a === b;
  return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
}

export interface MergeOptions {
  source: Source;
  /** Scale field confidence by recogniser confidence (0..1). 0 means unknown. */
  asrConfidence?: number;
  /** Fields the user is explicitly answering or correcting: always overwritten. */
  overwrite?: string[];
  /** "story": a different value for a known field is a contradiction to ask about
   *  (lists like symptoms and items are added to instead).
   *  "answer": other fields only fill gaps, never contradict. */
  mode: 'story' | 'answer';
}

export interface MergeResult {
  fields: Fields;
  conflicts: Conflict[];
  changed: string[];
}

export function scaleConfidence(conf: number, asr?: number): number {
  const factor = asr && asr > 0 ? 0.6 + 0.4 * asr : asr === 0 ? 0.9 : 1;
  return Math.round(Math.min(1, conf * factor) * 100) / 100;
}

export function mergeExtraction(cfg: Pick<DomainConfig, 'slots'>, fields: Fields, ext: Extraction, opts: MergeOptions): MergeResult {
  const next: Fields = { ...fields };
  const conflicts: Conflict[] = [];
  const changed: string[] = [];
  for (const key of Object.keys(ext)) {
    const hit = ext[key];
    if (!hit) continue;
    const slot = cfg.slots.find((s) => s.key === key);
    const incoming: FieldValue = { value: hit.value, confidence: scaleConfidence(hit.confidence, opts.asrConfidence), source: opts.source };
    const cur = next[key];
    if (!cur || opts.overwrite?.includes(key)) {
      next[key] = incoming;
      changed.push(key);
    } else if (sameValue(slot, cur.value, incoming.value)) {
      next[key] = { ...cur, confidence: Math.max(cur.confidence, incoming.confidence) };
    } else if (isList(slot) && opts.mode === 'story') {
      const seen = new Set((cur.value as (string | QtyItem)[]).map(listKey));
      const add = (incoming.value as (string | QtyItem)[]).filter((x) => !seen.has(listKey(x)));
      next[key] = { ...cur, value: [...(cur.value as (string | QtyItem)[]), ...add] as SlotValue };
      changed.push(key);
    } else if (opts.mode === 'story' && cur.source !== 'edited') {
      conflicts.push({ field: key, current: cur, incoming });
    }
  }
  return { fields: next, conflicts, changed };
}

export function setField(entry: Entry, field: string, value: FieldValue): Entry {
  return {
    ...entry,
    fields: { ...entry.fields, [field]: value },
    conflicts: entry.conflicts.filter((c) => c.field !== field),
    updatedAt: new Date().toISOString(),
  };
}

export type ConfidenceLevel = 'high' | 'mid' | 'low';
export function confidenceLevel(c: number): ConfidenceLevel {
  return c >= 0.8 ? 'high' : c >= 0.6 ? 'mid' : 'low';
}
