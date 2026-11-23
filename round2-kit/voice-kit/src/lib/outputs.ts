// Kit-level output helpers: the context handed to config builders, the spoken
// read-back, share links. Domain documents themselves live in the config.
import type { ActionDef, DomainConfig, Entry, OutputCtx } from '../domain/types';
import { tx, type LangCode } from './lang';
import { uiString, type UIKey } from '../i18n/ui';
import { displayValue, englishFieldValue, spokenValue } from './values';

type Cfg = Pick<DomainConfig, 'slots' | 'strings' | 'name'>;

export function makeCtx(cfg: Cfg, entry: Entry, lang: LangCode, now: Date = new Date()): OutputCtx {
  return {
    lang,
    now,
    value: (k) => entry.fields[k]?.value,
    show: (k, l) => displayValue(cfg, k, entry.fields, l ?? lang, now),
    spoken: (k, l) => spokenValue(cfg, k, entry.fields, l ?? lang, now),
    english: (k) => englishFieldValue(cfg, k, entry.fields, now),
    t: (text, vars, l) => tx(text, l ?? lang, vars),
    ui: (key: UIKey, vars) => uiText(cfg, lang, key, vars),
  };
}

/** Kit UI string with config overrides and {app} filled. */
export function uiText(cfg: Pick<DomainConfig, 'strings' | 'name'>, lang: LangCode, key: UIKey, vars?: Record<string, string | number>): string {
  return tx(uiString(lang, key, cfg.strings), lang, { app: tx(cfg.name, lang), ...vars });
}

/** Spoken review summary in the user's language: every known fact, then "Is this right?". */
export function spokenSummary(cfg: Cfg, entry: Entry, lang: LangCode, now: Date = new Date()): string {
  const parts = [uiText(cfg, lang, 'summaryIntro')];
  for (const s of cfg.slots) {
    const v = spokenValue(cfg, s.key, entry.fields, lang, now);
    if (v) parts.push(`${tx(s.label, lang)}: ${v}.`);
  }
  parts.push(uiText(cfg, lang, 'isThisRight'));
  return parts.join(' ');
}

export function whatsappLink(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/** Resolve an action to an href (tel:, https:, wa.me) and text to copy. */
export function resolveAction(a: ActionDef, entry: Entry, ctx: OutputCtx): { href?: string; text?: string } {
  const text = a.text?.(entry, ctx);
  if (a.kind === 'whatsapp') return { href: whatsappLink(text ?? ''), text };
  if (a.kind === 'copy') return { text };
  const href = typeof a.href === 'function' ? a.href(entry, ctx) : a.href;
  return { href, text };
}
