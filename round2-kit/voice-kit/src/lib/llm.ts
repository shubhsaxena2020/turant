// Optional LLM understanding layer. OFF by default: the rules in slots.ts always run
// first, work offline, and stay the source of truth.
//
// Turn it on per app (config.llm.enabled) or per visit (?llm=1). What the model says
// is a SUGGESTION:
//  - Numbers, IDs, dates (amount, number, duration, digits, phone, UPI, datetime) are
//    accepted only if the rules also find the SAME value in the transcript when asked
//    about that slot (truth check). Otherwise they become `suggested`: the call asks
//    "I heard X. Is that right?" before anything is written.
//  - Enum, name, text and list slots fill gaps the rules left (source 'llm').
//  - The summary is kept separately and always labelled as auto-generated.
//  - A rule hit is never overwritten.
import type { DomainConfig, LLMExtractor, LLMResult, SlotDef, SlotSpec } from '../domain/types';
import type { LangCode } from './lang';
import { coerce, extractAll, type Extraction, type ExtractOptions } from './slots';
import { sameValue } from './record';

const TRUTH_CHECKED = new Set(['amount', 'number', 'duration', 'digits', 'phone', 'upi', 'datetime']);

export function slotSpecs(cfg: Pick<DomainConfig, 'slots'>): SlotSpec[] {
  return cfg.slots.map((s) => ({
    key: s.key,
    type: s.type,
    description: s.label['en-IN'] ?? Object.values(s.label)[0] ?? s.key,
    options: s.type === 'enum' ? s.options.map((o) => o.value) : undefined,
    multi: s.type === 'enum' ? !!s.multi : undefined,
  }));
}

export function llmEnabled(cfg: Pick<DomainConfig, 'llm'>): boolean {
  if (!cfg.llm) return false;
  if (cfg.llm.enabled) return true;
  try {
    return new URLSearchParams(globalThis.location?.search ?? '').get('llm') === '1';
  } catch {
    return false;
  }
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('llm timeout')), ms);
    p.then(
      (v) => (clearTimeout(id), resolve(v)),
      (e) => (clearTimeout(id), reject(e)),
    );
  });
}

/** LLM value coerced to a slot value; unknown symptoms etc. are kept as words in multi-selects. */
function coerceLLM(slot: SlotDef, raw: unknown) {
  if (slot.type === 'enum' && slot.multi && raw !== undefined && raw !== null) {
    const list = (Array.isArray(raw) ? raw : [raw]).map((x) => String(x).trim().toLowerCase()).filter((x) => x && x.length <= 40);
    const known = (x: string) => slot.options.find((o) => o.value === x || Object.values(o.label).some((l) => l?.toLowerCase() === x))?.value ?? x;
    const vals = [...new Set(list.map(known))];
    return vals.length ? vals : undefined;
  }
  return coerce(slot, raw);
}

export interface SmartResult {
  /** Rule hits (source of truth). */
  rules: Extraction;
  /** Accepted LLM values that fill gaps (truth-checked where needed). */
  llm: Extraction;
  /** LLM numbers / IDs / dates the rules could not confirm: ask the user first. */
  suggested: Extraction;
  summary?: { text: string; model?: string };
}

/** Rules first; then, if enabled and online, let the LLM suggest. Never throws. */
export async function extractSmart(
  cfg: Pick<DomainConfig, 'slots' | 'llm'>,
  text: string,
  opts: ExtractOptions & { lang: LangCode },
): Promise<SmartResult> {
  const rules = extractAll(cfg, text, opts);
  const empty: SmartResult = { rules, llm: {}, suggested: {} };
  if (!llmEnabled(cfg) || !cfg.llm) return empty;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return empty;
  let res: LLMResult;
  try {
    const ctx = { lang: opts.lang, hint: opts.hint, now: opts.now ?? new Date(), summaryLang: cfg.llm.summaryLang };
    res = await withTimeout(cfg.llm.extract(text, slotSpecs(cfg), ctx), cfg.llm.timeoutMs ?? 6500);
  } catch {
    return empty;
  }
  const out: SmartResult = { ...empty };
  for (const s of cfg.slots) {
    const v = coerceLLM(s, res?.values?.[s.key]);
    if (v === undefined) continue;
    if (rules[s.key]) {
      // Lists (symptoms...): keep every rule value, add only what the model heard extra.
      if (s.type === 'enum' && s.multi && Array.isArray(v)) {
        const have = new Set(rules[s.key]!.value as string[]);
        const extra = (v as string[]).filter((x) => !have.has(x));
        if (extra.length) out.llm[s.key] = { value: extra, confidence: 0.7 };
      }
      continue;
    }
    if (TRUTH_CHECKED.has(s.type)) {
      const check = extractAll(cfg, text, { ...opts, hint: s.group ?? s.key })[s.key];
      if (check && sameValue(s, check.value, v)) out.llm[s.key] = { value: check.value, confidence: 0.8 };
      else out.suggested[s.key] = { value: v, confidence: 0.5 };
    } else {
      out.llm[s.key] = { value: v, confidence: 0.7 };
    }
  }
  if (res?.summary && typeof res.summary === 'string') out.summary = { text: res.summary.trim(), model: res.model };
  return out;
}

/**
 * Client for the kit's serverless endpoint (round2-kit/llm-api, POST /api/understand).
 * The model key lives only on the server. Aborted after `timeoutMs`; offline -> skipped.
 *   llm: { extract: understandClient({ baseUrl: 'https://my-app.vercel.app' }), summaryLang: 'en' }
 */
export function understandClient(o: { baseUrl?: string; path?: string; timeoutMs?: number } = {}): LLMExtractor {
  return async (text, slots, ctx) => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return { values: {}, error: 'offline' };
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), o.timeoutMs ?? 6000);
    try {
      const res = await fetch(`${(o.baseUrl ?? '').replace(/\/$/, '')}${o.path ?? '/api/understand'}`, {
        method: 'POST',
        signal: ctrl.signal,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          text,
          lang: ctx.lang,
          hint: ctx.hint,
          summaryLang: ctx.summaryLang,
          now: ctx.now.toISOString(),
          slots: slots.map((s) => ({ key: s.key, type: s.type, desc: s.description + (s.multi ? ' (list, one or more)' : ''), options: s.options })),
        }),
      });
      const data = (await res.json()) as LLMResult;
      return { values: data?.values ?? {}, summary: data?.summary, model: data?.model, error: data?.error };
    } catch (e) {
      return { values: {}, error: String((e as Error)?.message ?? e) };
    } finally {
      clearTimeout(timer);
    }
  };
}

/** Env switch for a deployed endpoint: VITE_LLM_URL (base URL, '' = same origin). */
export function envLLMBase(): string | undefined {
  try {
    return (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_LLM_URL;
  } catch {
    return undefined;
  }
}
