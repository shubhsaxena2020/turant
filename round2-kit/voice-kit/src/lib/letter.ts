// "The letter being written": the record as first-person sentences in the user's
// language, facts emphasised, missing facts as dotted gaps. No labels: the sentence
// is the label. Templates come from the domain config. Pure, no DOM.
import type { DomainConfig, Entry, Fields } from '../domain/types';
import { tx, type LangCode } from './lang';
import { uiString } from '../i18n/ui';
import { questionKeyOf, questionsOf } from './slots';
import { displayValue } from './values';

export type Segment =
  | { kind: 'text'; text: string }
  | { kind: 'fact'; q: string; fields: string[]; text: string }
  | { kind: 'gap'; q: string }
  | { kind: 'later'; q: string; text: string };

export type Sentence = Segment[];

type Cfg = Pick<DomainConfig, 'slots' | 'groups' | 'letter' | 'strings'>;

/** Slots behind a placeholder: a slot key, or a group name. */
function placeholderSlots(cfg: Cfg, name: string): string[] {
  const direct = cfg.slots.find((s) => s.key === name);
  if (direct) return [direct.key];
  return cfg.slots.filter((s) => s.group === name).map((s) => s.key);
}

/** Split "मेरे {bank} खाते से {amount} कट गए।" into text / fact / gap segments. */
export function fillTemplate(cfg: Cfg, template: string, fields: Fields, skipped: string[], lang: LangCode, now: Date): Sentence {
  const out: Sentence = [];
  const re = /\{(\w+)\}/g;
  // A gap only for facts we will actually ask about (askIf: e.g. pregnancy only for ages 12-50).
  const asked = new Set(
    questionsOf(cfg)
      .filter((q) => q.ask && q.slots.every((s) => !s.askIf || s.askIf(fields)))
      .map((q) => q.key),
  );
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(template))) {
    if (m.index > last) out.push({ kind: 'text', text: template.slice(last, m.index) });
    const keys = placeholderSlots(cfg, m[1]);
    const q = keys.length ? questionKeyOf(cfg, keys[0]) : m[1];
    const parts = keys.map((k) => displayValue(cfg, k, fields, lang, now)).filter((v): v is string => !!v);
    if (parts.length) out.push({ kind: 'fact', q, fields: keys, text: parts.join(', ') });
    else if (asked.has(q) && skipped.includes(q)) out.push({ kind: 'later', q, text: uiString(lang, 'later', cfg.strings) });
    else if (asked.has(q)) out.push({ kind: 'gap', q });
    last = re.lastIndex;
  }
  if (last < template.length) out.push({ kind: 'text', text: template.slice(last) });
  return out;
}

export function buildLetter(cfg: Cfg, entry: Pick<Entry, 'fields' | 'skipped'>, lang: LangCode, now: Date = new Date()): Sentence[] {
  return cfg.letter
    .filter((s) => !s.onlyIf || entry.fields[s.onlyIf] !== undefined)
    .map((s) => fillTemplate(cfg, tx(s.text, lang), entry.fields, entry.skipped, lang, now));
}

/** Plain text of the letter (gaps as "…"), e.g. for reading aloud or sharing. */
export function letterText(sentences: Sentence[]): string {
  return sentences
    .map((s) => s.map((seg) => (seg.kind === 'gap' ? '…' : seg.text)).join(''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
