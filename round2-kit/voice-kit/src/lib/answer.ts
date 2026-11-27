// Interpreting one answer to one question, and committing it. Pure, no DOM.
import type { DomainConfig, Entry, Source } from '../domain/types';
import type { LangCode } from './lang';
import { detectIntent } from './nlp';
import { extractAll, questionOf, type Extraction } from './slots';
import { mergeExtraction } from './record';
import { showValue, speakValue } from './values';

type Cfg = Pick<DomainConfig, 'slots' | 'groups' | 'strings'>;

export type Interpretation = { kind: 'skip' } | { kind: 'miss' } | { kind: 'value'; ext: Extraction; keys: string[] };

/** Read an answer to question `q` (slot key or group name). */
export function interpret(cfg: Cfg, text: string, q: string, now: Date = new Date(), lang?: string): Interpretation {
  if (detectIntent(text) === 'skip') return { kind: 'skip' };
  const ext = extractAll(cfg, text, { now, hint: q, lang });
  const slots = questionOf(cfg, q)?.slots ?? [];
  const keys = slots.map((s) => s.key).filter((k) => ext[k] !== undefined);
  return keys.length ? { kind: 'value', ext, keys } : { kind: 'miss' };
}

/** Target fields overwrite; anything else heard (e.g. from a read-out SMS) only fills gaps. */
export function commitAnswer(cfg: Cfg, entry: Entry, ext: Extraction, keys: string[], source: Source, asr?: number): { entry: Entry; changed: string[] } {
  const m = mergeExtraction(cfg, entry.fields, ext, { source, asrConfidence: asr, mode: 'answer', overwrite: keys });
  return { entry: { ...entry, fields: m.fields, updatedAt: new Date().toISOString() }, changed: m.changed };
}

/** Values of an extraction as display text ("₹5,000"). */
export function shownValues(cfg: Cfg, ext: Extraction, keys: string[], lang: LangCode, now: Date = new Date()): string {
  return keys
    .map((k) => {
      const s = cfg.slots.find((x) => x.key === k);
      return s && ext[k] ? showValue(s, ext[k]!.value, lang, now, cfg) : '';
    })
    .filter(Boolean)
    .join(', ');
}

/** Values as they should be spoken: IDs digit by digit in groups. */
export function spokenValues(cfg: Cfg, ext: Extraction, keys: string[], lang: LangCode, now: Date = new Date()): string {
  return keys
    .map((k) => {
      const s = cfg.slots.find((x) => x.key === k);
      return s && ext[k] ? speakValue(s, ext[k]!.value, lang, now, cfg) : '';
    })
    .filter(Boolean)
    .join(', ');
}
