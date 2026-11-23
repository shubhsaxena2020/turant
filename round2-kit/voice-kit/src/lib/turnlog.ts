// Learn from users (Wispr Flow keeps `desiredAsr` / `desiredFormatted` per dictation).
// When a user confirms the Check screen, their final facts are ground truth for what they said.
// We keep that locally and export it as harness cases (JSONL), so every real-world test
// session grows the regression suite. Nothing leaves the device unless the user taps export.
import type { DomainConfig } from '../domain/types';
import { cleanup } from './indic/cleanup';

export interface TurnRecord {
  ts: string;
  app: string;
  entryId: string;
  lang: string;
  kind: 'story' | 'answer';
  question?: string;
  via: string;
  transcript: string;
  cleaned: string;
  removed: string[];
  asrConfidence?: number;
  extracted: Record<string, unknown>;
  ms: number;
}

export interface ConfirmedRecord {
  ts: string;
  app: string;
  entryId: string;
  lang: string;
  turns: { ts: string; text: string }[];
  fields: Record<string, unknown>;
  /** fields the user had to fix on the Check screen: the extractor's misses */
  corrected: string[];
}

const KEY = 'voicekit.turnlog.v1';
const MAX = 400;
const corrections = new Map<string, Set<string>>();

function readAll(): { turns: TurnRecord[]; confirmed: ConfirmedRecord[] } {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* private mode / blocked storage */
  }
  return { turns: [], confirmed: [] };
}

function writeAll(v: { turns: TurnRecord[]; confirmed: ConfirmedRecord[] }) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ turns: v.turns.slice(-MAX), confirmed: v.confirmed.slice(-MAX) }));
  } catch {
    /* quota or blocked: logging is best-effort */
  }
}

export function logTurn(r: Omit<TurnRecord, 'ts' | 'cleaned' | 'removed'>): void {
  const c = cleanup(r.transcript);
  const all = readAll();
  all.turns.push({ ...r, ts: new Date().toISOString(), cleaned: c.text, removed: c.removed });
  writeAll(all);
}

export function markCorrected(entryId: string, keys: string[]): void {
  const s = corrections.get(entryId) ?? new Set<string>();
  keys.forEach((k) => s.add(k));
  corrections.set(entryId, s);
}

export function logConfirmed(cfg: DomainConfig, entry: { id: string; lang: string; fields: Record<string, { value: unknown } | undefined> }): void {
  const all = readAll();
  const turns = all.turns.filter((t) => t.entryId === entry.id && t.kind === 'story').map((t) => ({ ts: t.ts, text: t.transcript }));
  const fields = Object.fromEntries(Object.entries(entry.fields).filter(([, v]) => v !== undefined).map(([k, v]) => [k, v!.value]));
  all.confirmed.push({ ts: new Date().toISOString(), app: cfg.id, entryId: entry.id, lang: entry.lang, turns, fields, corrected: [...(corrections.get(entry.id) ?? [])] });
  writeAll(all);
}

/** Harness cases (one per confirmed story): {id, lang, kind, text, expected, source, corrected}. */
export function exportCases(app: string): string {
  const { confirmed } = readAll();
  const out: string[] = [];
  for (const c of confirmed.filter((x) => x.app === app && x.turns.length)) {
    const told = new Date(c.turns[0].ts).getTime();
    const expected: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(c.fields)) {
      if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v)) expected[k] = { ago: Math.max(0, Math.round((told - new Date(v).getTime()) / 60000)) };
      else expected[k] = v;
    }
    out.push(
      JSON.stringify({
        id: `user-${c.entryId}`,
        lang: c.lang.slice(0, 2),
        kind: 'story',
        text: c.turns.map((t) => t.text).join(' '),
        expected,
        source: 'user-confirmed',
        corrected: c.corrected,
      }),
    );
  }
  return out.join('\n') + (out.length ? '\n' : '');
}

export function turnStats(app: string): { turns: number; confirmed: number; corrected: number } {
  const { turns, confirmed } = readAll();
  const mine = confirmed.filter((c) => c.app === app);
  return { turns: turns.filter((t) => t.app === app).length, confirmed: mine.length, corrected: mine.filter((c) => c.corrected.length).length };
}
