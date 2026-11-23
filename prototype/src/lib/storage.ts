// Reports live only on this phone: IndexedDB via idb-keyval, falling back to
// localStorage, then memory (private mode / blocked storage). Never throws.
import { createStore, del, get, set } from 'idb-keyval';
import type { LangCode } from './extract';
import type { Report } from './report';

const KEY = 'reports';
const LS_KEY = 'turant.reports';
const LANG_KEY = 'turant.lang';
let memory: Report[] = [];
let store: ReturnType<typeof createStore> | null = null;

function idb() {
  if (store) return store;
  try {
    if (typeof indexedDB === 'undefined') return null;
    store = createStore('turant', 'kv');
    return store;
  } catch {
    return null;
  }
}

async function readAll(): Promise<Report[]> {
  const s = idb();
  if (s) {
    try {
      const v = await get<Report[]>(KEY, s);
      if (Array.isArray(v)) return v;
    } catch {
      /* fall through */
    }
  }
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as Report[];
  } catch {
    /* fall through */
  }
  return memory;
}

async function writeAll(list: Report[]): Promise<void> {
  memory = list;
  const s = idb();
  if (s) {
    try {
      await set(KEY, list, s);
      return;
    } catch {
      /* fall through */
    }
  }
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {
    /* memory only */
  }
}

export async function loadReports(): Promise<Report[]> {
  const list = await readAll();
  return [...list].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveReport(report: Report): Promise<void> {
  const list = await readAll();
  const i = list.findIndex((r) => r.id === report.id);
  const next = i >= 0 ? list.map((r) => (r.id === report.id ? report : r)) : [...list, report];
  await writeAll(next);
}

export async function deleteAllReports(): Promise<void> {
  memory = [];
  const s = idb();
  if (s) {
    try {
      await del(KEY, s);
    } catch {
      /* ignore */
    }
  }
  try {
    localStorage.removeItem(LS_KEY);
  } catch {
    /* ignore */
  }
}

export function loadLang(): LangCode | null {
  try {
    return (localStorage.getItem(LANG_KEY) as LangCode | null) ?? null;
  } catch {
    return null;
  }
}

export function saveLang(lang: LangCode): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* ignore */
  }
}
