// Records live only on this phone, one store per app: IndexedDB via idb-keyval,
// falling back to localStorage, then memory (private mode / blocked storage). Never throws.
import { createStore, del, get, set } from 'idb-keyval';
import type { Entry } from '../domain/types';
import type { LangCode } from './lang';

const KEY = 'entries';
const memory = new Map<string, Entry[]>();
const stores = new Map<string, ReturnType<typeof createStore>>();
const lsKey = (app: string) => `voicekit.${app}.entries`;

function idb(app: string) {
  if (stores.has(app)) return stores.get(app)!;
  try {
    if (typeof indexedDB === 'undefined') return null;
    const s = createStore(`voicekit-${app}`, 'kv');
    stores.set(app, s);
    return s;
  } catch {
    return null;
  }
}

async function readAll(app: string): Promise<Entry[]> {
  const s = idb(app);
  if (s) {
    try {
      const v = await get<Entry[]>(KEY, s);
      if (Array.isArray(v)) return v;
    } catch {
      /* fall through */
    }
  }
  try {
    const raw = localStorage.getItem(lsKey(app));
    if (raw) return JSON.parse(raw) as Entry[];
  } catch {
    /* fall through */
  }
  return memory.get(app) ?? [];
}

async function writeAll(app: string, list: Entry[]): Promise<void> {
  memory.set(app, list);
  const s = idb(app);
  if (s) {
    try {
      await set(KEY, list, s);
      return;
    } catch {
      /* fall through */
    }
  }
  try {
    localStorage.setItem(lsKey(app), JSON.stringify(list));
  } catch {
    /* memory only */
  }
}

export async function loadEntries(app: string): Promise<Entry[]> {
  const list = await readAll(app);
  return [...list].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveEntry(entry: Entry): Promise<void> {
  const list = await readAll(entry.app);
  const i = list.findIndex((r) => r.id === entry.id);
  await writeAll(entry.app, i >= 0 ? list.map((r) => (r.id === entry.id ? entry : r)) : [...list, entry]);
}

export async function deleteAllEntries(app: string): Promise<void> {
  memory.set(app, []);
  const s = idb(app);
  if (s) {
    try {
      await del(KEY, s);
    } catch {
      /* ignore */
    }
  }
  try {
    localStorage.removeItem(lsKey(app));
  } catch {
    /* ignore */
  }
}

export function loadLang(app: string): LangCode | null {
  try {
    return (localStorage.getItem(`voicekit.${app}.lang`) as LangCode | null) ?? null;
  } catch {
    return null;
  }
}

export function saveLang(app: string, lang: LangCode): void {
  try {
    localStorage.setItem(`voicekit.${app}.lang`, lang);
  } catch {
    /* ignore */
  }
}
