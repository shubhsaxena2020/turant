// Score any voice-kit app on a text corpus, generically by slot type (Round 2: write cases for the new
// domain, then iterate like Turant). Run under tsx (the kit uses extensionless imports):
//   ..\round2-kit\indic-numbers\node_modules\.bin\tsx kit_apps_eval.mjs [app ...] [--name x] [--show]
// Corpus: corpus/kit/<app>.jsonl  {id, lang, kind: story|answer, hint?, text, expected: {slot: value}, ignore?: [slot]}
// Matching per slot type:
//   amount / number / duration: equal number    enum: equal (multi: same set)    yesno: equal boolean
//   phone / digits: same digits                  name: same sound (any script), honorifics ignored
//   text: every expected key word appears         quantity+unit: same items (qty, unit, item), any order
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const KD = path.resolve(HERE, '..', 'round2-kit', 'voice-kit', 'src');
const imp = (p) => import(pathToFileURL(path.join(KD, p)).href);
const { extractAll } = await imp('lib/slots.ts');
const { detectIntent } = await imp('lib/nlp.ts');
const { fold, foldDigits } = await imp('lib/indic/numbers.ts');
const { romanize, soundKey } = await imp('lib/indic/bank.ts');

const args = process.argv.slice(2);
const NAME = args.includes('--name') ? args[args.indexOf('--name') + 1] : 'latest';
const SHOW = args.includes('--show');
const CORPUS = args.includes('--corpus') ? args[args.indexOf('--corpus') + 1] : 'kit'; // corpus/<dir>/<app>.jsonl
const apps = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--name' && args[i - 1] !== '--corpus');
const list = apps.length ? apps : fs.readdirSync(path.join(HERE, 'corpus', CORPUS)).filter((f) => f.endsWith('.jsonl')).map((f) => f.replace('.jsonl', ''));
const NOW = new Date(2026, 10, 21, 12, 0, 0);

const lev = (a, b) => {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
};
const HONORIFIC = /\b(mr|mrs|ms|shri|smt|ji|bhaiya|bhai|didi|aunty|uncle|sahab|saheb)\b|\b(जी|दीदी|भैया|साहब)\b/gi;
const nameKey = (s) => soundKey(String(s).replace(HONORIFIC, ' ').split(/\s+/).filter(Boolean).map((w) => (/^[\x00-\x7f]+$/.test(w) ? w : romanize(w))).join(''));
const digits = (v) => String(v ?? '').replace(/\D/g, '');

function matches(slot, exp, got) {
  if (got === undefined || got === null) return false;
  switch (slot.type) {
    case 'amount':
    case 'number':
    case 'duration':
      return Number(got) === Number(exp);
    case 'yesno':
      return Boolean(got) === Boolean(exp);
    case 'phone':
    case 'digits':
      return digits(got) === digits(exp);
    case 'enum':
      if (Array.isArray(exp)) return Array.isArray(got) && got.length === exp.length && exp.every((e) => got.includes(e));
      return String(got).toLowerCase() === String(exp).toLowerCase();
    case 'name': {
      const a = nameKey(got);
      const b = nameKey(exp);
      return !!a && !!b && (a === b || a.includes(b) || b.includes(a) || 1 - lev(a, b) / Math.max(a.length, b.length) >= 0.8);
    }
    case 'text': {
      const g = fold(foldDigits(String(got)));
      return (Array.isArray(exp) ? exp : [exp]).every((k) => g.includes(fold(foldDigits(String(k)))));
    }
    case 'quantity+unit': {
      if (!Array.isArray(got) || got.length !== exp.length) return false;
      const left = [...got];
      return exp.every((e) => {
        const i = left.findIndex((g) => Number(g.qty) === Number(e.qty) && String(g.unit).toLowerCase() === String(e.unit).toLowerCase() && String(g.item).toLowerCase() === String(e.item).toLowerCase());
        return i >= 0 && left.splice(i, 1);
      });
    }
    default:
      return String(got) === String(exp);
  }
}

const report = { name: NAME, apps: {} };
for (const app of list) {
  const cfgFile = path.join(KD, 'apps', app, 'config.ts');
  const cfg = fs.existsSync(cfgFile) ? (await import(pathToFileURL(cfgFile).href)).default : null; // registry.ts needs Vite's import.meta.glob
  if (!cfg) {
    console.log(`no kit app "${app}"`);
    continue;
  }
  const slots = Object.fromEntries(cfg.slots.map((s) => [s.key, s]));
  const cases = fs.readFileSync(path.join(HERE, 'corpus', CORPUS, `${app}.jsonl`), 'utf8').trim().split(/\r?\n/).map((l) => JSON.parse(l));
  const st = {};
  const runs = [];
  for (const c of cases) {
    const got = {};
    if (!(c.kind === 'answer' && detectIntent(c.text) === 'skip')) {
      const e = extractAll(cfg, c.text, { now: NOW, hint: c.hint });
      for (const [k, v] of Object.entries(e)) if (v) got[k] = v.value;
    }
    const out = {};
    for (const k of new Set([...Object.keys(c.expected), ...Object.keys(got)])) {
      if (!slots[k] || c.ignore?.includes(k)) continue;
      const E = k in c.expected;
      const P = got[k] !== undefined;
      out[k] = E && P ? (matches(slots[k], c.expected[k], got[k]) ? 'tp' : 'wrong') : E ? 'fn' : 'fp';
      const s = (st[k] ??= { tp: 0, wrong: 0, fn: 0, fp: 0 });
      s[out[k]]++;
    }
    const correct = Object.values(out).every((o) => o === 'tp');
    runs.push({ id: c.id, lang: c.lang, kind: c.kind, text: c.text, expected: c.expected, got, out, correct });
  }
  const f = (s) => {
    const p = (s.tp / (s.tp + s.wrong + s.fp)) * 100 || 0;
    const r = (s.tp / (s.tp + s.wrong + s.fn)) * 100 || 0;
    return { p, r, f1: p + r ? (2 * p * r) / (p + r) : 0 };
  };
  const full = runs.filter((r) => r.correct).length;
  console.log(`\n${app}: ${full}/${runs.length} cases fully correct (${((100 * full) / runs.length).toFixed(0)}%)`);
  console.log('  ' + 'field'.padEnd(12) + 'P'.padStart(6) + 'R'.padStart(6) + 'F1'.padStart(6) + '   tp/wrong/fn/fp');
  for (const [k, s] of Object.entries(st)) {
    const m = f(s);
    console.log('  ' + k.padEnd(12) + m.p.toFixed(0).padStart(6) + m.r.toFixed(0).padStart(6) + m.f1.toFixed(0).padStart(6) + `   ${s.tp}/${s.wrong}/${s.fn}/${s.fp}`);
  }
  const byLang = {};
  for (const r of runs) (byLang[r.lang] ??= [0, 0])[r.correct ? 0 : 1]++;
  console.log('  by language: ' + Object.entries(byLang).map(([l, [ok, bad]]) => `${l} ${ok}/${ok + bad}`).join(', '));
  if (SHOW)
    for (const r of runs.filter((x) => !x.correct)) {
      const bad = Object.entries(r.out).filter(([, o]) => o !== 'tp');
      console.log(`  x ${r.id} ${bad.map(([k, o]) => `${k}:${o} exp=${JSON.stringify(r.expected[k])} got=${JSON.stringify(r.got[k])}`).join(' | ')}`);
    }
  report.apps[app] = { cases: runs.length, fullyCorrect: full, fields: st, runs };
}
fs.mkdirSync(path.join(HERE, 'reports'), { recursive: true });
fs.writeFileSync(path.join(HERE, 'reports', `kitapps-${NAME}.json`), JSON.stringify(report, null, 1));
