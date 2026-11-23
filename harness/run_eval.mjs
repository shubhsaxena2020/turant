// Turant end-to-end evaluation: reference text and cached ASR transcripts -> prototype extractor -> scores.
//
//   node run_eval.mjs                       # writes reports/latest.{md,json}
//   node run_eval.mjs --name round1         # writes reports/round1.{md,json}
//   node run_eval.mjs --compare baseline    # adds deltas against reports/baseline.json (default when it exists)
//
// It imports ../prototype/src/lib/extract.ts directly (Node 24 strips the types), so it always scores
// the current extractor. Only cached transcripts are used: run tts.py / noise.py / asr.py first.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  NOW, FIELDS, BANK_IDS, APP_IDS, canonicalExpected, fieldMatches, describeTime, wer, cer, foldDigits, valueInTranscript, numbersInText,
} from './lib.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXTRACT = path.resolve(HERE, '..', 'prototype', 'src', 'lib', 'extract.ts');
const X = await import(pathToFileURL(EXTRACT).href);
// --extractor kit: score the Round 2 voice kit's fraud app instead (run under tsx: the kit uses extensionless imports).
const KIT = process.argv.includes('--extractor') && process.argv[process.argv.indexOf('--extractor') + 1] === 'kit';
const KD = path.resolve(HERE, '..', 'round2-kit', 'voice-kit', 'src');
const K = KIT
  ? {
      cfg: (await import(pathToFileURL(path.join(KD, 'apps', 'fraud', 'config.ts')).href)).default,
      ...(await import(pathToFileURL(path.join(KD, 'lib', 'slots.ts')).href)),
      ...(await import(pathToFileURL(path.join(KD, 'lib', 'nlp.ts')).href)),
    }
  : null;
const IN = await import(pathToFileURL(path.resolve(HERE, '..', 'prototype', 'src', 'lib', 'indic', 'numbers.ts')).href);

const args = process.argv.slice(2);
const arg = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const NAME = arg('--name', 'latest');
// --transcripts <dir>: score another set of transcripts (e.g. transcripts_hw from asr_hotwords.py); jobs without one are skipped as missing.
const TRANSCRIPTS_DIR = arg('--transcripts', 'transcripts');
// --llm <slug>: also use cached LLM answers (llm_fill.mjs); only texts in the cache are scored.
// --policy rules | llm | fill (LLM fills any missing field) | fillcat (only scamType/bank/paymentApp)
//          | fillcheck (fillcat + numbers/IDs whose value is visible in the text)
const LLM = arg('--llm', null);
const POLICY = arg('--policy', LLM ? 'fill' : 'rules');
const llmCache = new Map();
if (LLM)
  for (const l of fs.readFileSync(path.join(HERE, 'llm-cache', `${LLM}.jsonl`), 'utf8').trim().split(/\r?\n/)) {
    const o = JSON.parse(l);
    llmCache.set(`${o.hint ?? ''}\u0001${o.text}`, llmFields(o.raw));
  }

/** LLM JSON -> harness field values (bank/app keys -> display names, local datetime -> ISO). */
function llmFields(raw) {
  const m = String(raw).replace(/```(json)?/g, '').match(/\{[\s\S]*\}/);
  let j = {};
  try {
    j = m ? JSON.parse(m[0]) : {};
  } catch {
    return {};
  }
  const out = {};
  const digits = (v) => String(v ?? '').replace(/\D/g, '');
  if (Number(j.amount) > 0) out.amount = Math.round(Number(j.amount));
  const t = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/.exec(String(j.when ?? ''));
  if (t) out.time = new Date(+t[1], +t[2] - 1, +t[3], +t[4], +t[5]).toISOString();
  if (['fake_kyc', 'otp_shared', 'fake_customer_care', 'wrong_transfer', 'qr_scan', 'investment_task', 'sextortion', 'other'].includes(j.scamType)) out.scamType = j.scamType;
  if (BANK_IDS[String(j.bank ?? '').toLowerCase()]) out.bank = BANK_IDS[String(j.bank).toLowerCase()];
  if (APP_IDS[String(j.paymentApp ?? '').toLowerCase()]) out.paymentApp = APP_IDS[String(j.paymentApp).toLowerCase()];
  if (digits(j.utr).length >= 10) out.utr = digits(j.utr);
  if (digits(j.suspectPhone).length >= 10) out.suspectPhone = digits(j.suspectPhone).slice(-10);
  if (digits(j.suspectAccount).length >= 8) out.suspectAccount = digits(j.suspectAccount);
  if (/@/.test(String(j.suspectUpi ?? ''))) out.suspectUpi = String(j.suspectUpi).toLowerCase().replace(/\s/g, '');
  if (j.intent === 'skip') out.intent = 'skip';
  return out;
}

/** Is an LLM value visible in the text? Digits (any script) or a spoken number our parser reads. */
function visible(field, v, text) {
  const d = foldDigits(text).replace(/[\s,.-]/g, '');
  if (field === 'amount') return d.includes(String(v)) || IN.numberGroups(text).some((g) => g.value === v);
  if (['utr', 'suspectPhone', 'suspectAccount'].includes(field)) return d.includes(String(v));
  if (field === 'suspectUpi') return true;
  return false;
}
const COMPARE = arg('--compare', NAME !== 'baseline' && fs.existsSync(path.join(HERE, 'reports', 'baseline.json')) ? 'baseline' : null);

const cases = fs.readFileSync(path.join(HERE, 'corpus', 'cases.jsonl'), 'utf8').trim().split(/\r?\n/).map((l) => JSON.parse(l));
const caseById = Object.fromEntries(cases.map((c) => [c.id, c]));
const plan = JSON.parse(fs.readFileSync(path.join(HERE, 'plan.json'), 'utf8'));
const audioById = Object.fromEntries(plan.audios.map((a) => [a.audio, a]));
const clipById = Object.fromEntries(plan.clips.map((c) => [c.clip, c]));
const ALL_FIELDS = [...FIELDS, 'intent'];

// ---------------------------------------------------------------------------
// Running the prototype exactly the way the app does
// ---------------------------------------------------------------------------

/** story -> extractFields; answer -> interpret() from answer.ts; correction -> parseCorrection. */
function runPipeline(c, text) {
  const rules = rulePipeline(c, text);
  if (!LLM || POLICY === 'rules' || c.kind === 'correction') return rules;
  const L = llmCache.get(`${c.hint ?? ''}\u0001${text}`) ?? {};
  if (POLICY === 'llm') return c.kind.startsWith('answer:') && L.intent === 'skip' ? { intent: 'skip' } : Object.fromEntries(Object.entries(L).filter(([k]) => k !== 'intent'));
  if (rules.intent) return rules;
  const got = { ...rules };
  const CAT = ['scamType', 'bank', 'paymentApp'];
  // A field list ("bank,amount:check") fills only those fields; ":check" = only if visible in the text.
  const named = ['fill', 'fillcat', 'fillcheck'].includes(POLICY) ? null : Object.fromEntries(POLICY.split(',').map((p) => p.split(':')).map(([k, m]) => [k, m ?? 'fill']));
  for (const [k, v] of Object.entries(L)) {
    if (k === 'intent' || got[k] !== undefined) continue;
    if (named) {
      if (named[k] === 'fill' || (named[k] === 'check' && visible(k, v, text))) got[k] = v;
    } else if (POLICY === 'fill' || CAT.includes(k) || (POLICY === 'fillcheck' && visible(k, v, text))) got[k] = v;
  }
  return got;
}

function rulePipeline(c, text) {
  if (KIT) return kitPipeline(c, text);
  const got = {};
  if (c.kind === 'correction') {
    const r = X.parseCorrection(text, { now: NOW });
    if (r) got[r.field] = r.value;
    return got;
  }
  if (c.kind.startsWith('answer:') && X.detectIntent(text) === 'skip') return { intent: 'skip' };
  const e = X.extractFields(text, { now: NOW, hint: c.hint });
  for (const k of FIELDS) if (e[k]) got[k] = e[k].value;
  return got;
}

function kitPipeline(c, text) {
  const got = {};
  if (c.kind === 'correction') {
    const r = K.parseCorrection(K.cfg, text, { now: NOW });
    if (r) got[r.field] = r.value;
    return got;
  }
  if (c.kind.startsWith('answer:') && K.detectIntent(text) === 'skip') return { intent: 'skip' };
  const e = K.extractAll(K.cfg, text, { now: NOW, hint: c.hint });
  for (const k of FIELDS) if (e[k]) got[k] = e[k].value;
  return got;
}

/** Per-field outcome: tp | wrong (counts as FP and FN) | fn | fp. */
function score(c, got) {
  const out = {};
  for (const f of ALL_FIELDS) {
    const E = f in c.expected;
    const P = got[f] !== undefined;
    if (!E && !P) continue;
    if (E && P) out[f] = (f === 'intent' ? got[f] === c.expected[f] : fieldMatches(f, c.expected[f], got[f])) ? 'tp' : 'wrong';
    else out[f] = E ? 'fn' : 'fp';
  }
  const amb = new Set(c.ambiguous ?? []);
  const correct = Object.values(out).every((o) => o === 'tp');
  const correctUnamb = Object.entries(out).every(([f, o]) => o === 'tp' || amb.has(f));
  return { out, correct, correctUnamb };
}

// ---------------------------------------------------------------------------
// Attribution: why did a field fail on a transcript?
// ---------------------------------------------------------------------------

const tokensOf = (s) => s.split(/\s+/).filter(Boolean);
const squash = (s) => foldDigits(X.normalizeWord(s)).replace(/[\s\p{P}\p{S}]+/gu, '');

/** A minimal set of reference tokens that still lets the extractor get each correct field right
 *  (greedy ablation: drop every token whose removal keeps the field correct). */
function evidenceTokens(c) {
  const toks = tokensOf(c.text);
  const base = score(c, runPipeline(c, c.text)).out;
  const ev = {};
  for (const [f, o] of Object.entries(base)) {
    if (o !== 'tp') continue;
    const keep = toks.map(() => true);
    for (let i = 0; i < toks.length; i++) {
      keep[i] = false;
      const o2 = score(c, runPipeline(c, toks.filter((_, j) => keep[j]).join(' '))).out[f];
      if (o2 !== 'tp') keep[i] = true;
    }
    ev[f] = toks.filter((_, j) => keep[j]);
  }
  return ev;
}

function levenshtein(a, b) {
  const A = [...a], B = [...b];
  let prev = Array.from({ length: B.length + 1 }, (_, j) => j);
  for (let i = 1; i <= A.length; i++) {
    const cur = [i];
    for (let j = 1; j <= B.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (A[i - 1] === B[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[B.length];
}

/** Does a reference evidence token survive in the transcript? exact (ignoring spaces/punctuation),
 *  same number value, or a near-spelling variant (<= 20% edits) of a transcript word or word pair. */
function survives(tok, transcript, tNums) {
  const t = squash(tok);
  if (!t) return 'same';
  if (squash(transcript).includes(t)) return 'same';
  const nums = numbersInText(tok);
  if (nums.size && [...nums].every((n) => tNums.has(n))) return 'same';
  const words = tokensOf(transcript).map(squash).filter(Boolean);
  const cands = words.concat(words.slice(1).map((w, i) => words[i] + w));
  const best = Math.min(...cands.map((w) => levenshtein(t, w) / Math.max([...t].length, 1)));
  return best <= 0.2 ? 'variant' : null;
}

function attribute(field, outcome, c, ref, transcript, evidence) {
  if (ref.out[field] !== 'tp' && ref.out[field] !== undefined) {
    const kept = field in c.expected ? valueInTranscript(field, c.expected[field], transcript) : null;
    const tail = kept === false ? '; ASR also lost the value' : kept === true ? '; value is in the transcript' : '';
    return { cat: 'extractor', asrToo: kept === false, why: `fails on the reference text too (${ref.out[field]})${tail}` };
  }
  if (outcome === 'fp') {
    const near = cer(c.text, transcript);
    return near.errors / Math.max(1, near.length) <= 0.15
      ? { cat: 'extractor_form', why: 'spurious value from a near-correct transcript' }
      : { cat: 'asr', why: 'spurious value from a mis-recognised transcript' };
  }
  if (field === 'intent') {
    return X.detectIntent(c.text) === 'skip' && cer(c.text, transcript).errors <= 1
      ? { cat: 'extractor_form', why: 'skip phrase transcribed (almost) verbatim' }
      : { cat: 'asr', why: 'skip phrase not recognised' };
  }
  const present = valueInTranscript(field, c.expected[field], transcript);
  if (present === true) return { cat: 'extractor_form', why: 'value is in the transcript but not parsed' };
  if (present === false) return { cat: 'asr', why: 'value not in the transcript' };
  const ev = evidence[field] ?? [];
  const tNums = numbersInText(transcript);
  const st = ev.map((t) => [t, survives(t, transcript, tNums)]);
  const lost = st.filter(([, s]) => !s).map(([t]) => t);
  const variants = st.filter(([, s]) => s === 'variant').map(([t]) => t);
  if (lost.length) return { cat: 'asr', why: `ASR lost/changed: ${lost.slice(0, 4).join(' ')}` };
  if (variants.length) return { cat: 'extractor_form', why: `near-spelling variant of: ${variants.slice(0, 4).join(' ')}` };
  return { cat: 'extractor_form', why: `key words survive (${ev.slice(0, 5).join(' ')}) but the extractor fails` };
}

// ---------------------------------------------------------------------------
// Evaluate
// ---------------------------------------------------------------------------

const refRuns = {};
const evidence = {};
for (const c of cases) {
  const got = runPipeline(c, c.text);
  refRuns[c.id] = { got, ...score(c, got) };
  evidence[c.id] = evidenceTokens(c);
}

function readTranscript(tid) {
  const p = path.join(HERE, TRANSCRIPTS_DIR, `${tid}.json`);
  if (!fs.existsSync(p)) return null;
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  return (d.text ?? (d.segments ?? []).map((s) => s.text).join(' ')).trim();
}

function scriptOf(s) {
  const counts = {};
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    const sc = cp < 0x250 ? (/\p{L}/u.test(ch) ? 'latin' : null)
      : cp >= 0x900 && cp < 0x980 ? 'deva' : cp < 0xa00 ? 'beng' : cp >= 0xb80 && cp < 0xc00 ? 'taml'
      : cp >= 0xc00 && cp < 0xc80 ? 'telu' : cp >= 0xc80 && cp < 0xd00 ? 'knda' : 'other';
    if (sc) counts[sc] = (counts[sc] ?? 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'none';
}

const runs = [];
let missing = 0;
for (const j of plan.jobs) {
  const transcript = readTranscript(j.tid);
  if (transcript === null) {
    missing++;
    continue;
  }
  const c = caseById[j.case];
  if (LLM && c.kind !== 'correction' && !llmCache.has(`${c.hint ?? ''}\u0001${transcript}`)) continue;
  const a = audioById[j.audio];
  const clip = clipById[a.clip];
  const got = runPipeline(c, transcript);
  const s = score(c, got);
  const ref = refRuns[c.id];
  const attr = {};
  for (const [f, o] of Object.entries(s.out)) if (o !== 'tp') attr[f] = attribute(f, o, c, ref, transcript, evidence[c.id]);
  runs.push({
    tid: j.tid, case: c.id, lang: c.lang, kind: c.kind, tier: j.tier, voice: clip.voice, rate: clip.rate,
    noise: a.noise, snr: a.snr, asrLang: j.asr_lang || 'auto', transcript, got, out: s.out, correct: s.correct,
    correctUnamb: s.correctUnamb, attr, wer: wer(c.text, transcript), cer: cer(c.text, transcript),
    script: scriptOf(transcript), refScript: scriptOf(c.text),
  });
}

// ---------------------------------------------------------------------------
// Aggregation
// ---------------------------------------------------------------------------

const pct = (n, d) => (d ? (100 * n) / d : NaN);
const f1 = (p, r) => (Number.isNaN(p) || Number.isNaN(r) ? NaN : p + r ? (2 * p * r) / (p + r) : 0);
const ratio = (n, d) => (d ? n / d : NaN);

function fieldStats(items, fields = ALL_FIELDS) {
  const st = Object.fromEntries(fields.map((f) => [f, { tp: 0, wrong: 0, fn: 0, fp: 0 }]));
  for (const it of items) for (const [f, o] of Object.entries(it.out)) if (st[f]) st[f][o]++;
  const res = {};
  let T = { tp: 0, wrong: 0, fn: 0, fp: 0 };
  for (const [f, s] of Object.entries(st)) {
    const P = ratio(s.tp, s.tp + s.wrong + s.fp);
    const R = ratio(s.tp, s.tp + s.wrong + s.fn);
    res[f] = { ...s, support: s.tp + s.wrong + s.fn, precision: P, recall: R, f1: f1(P, R) };
    for (const k in T) T[k] += s[k];
  }
  const P = ratio(T.tp, T.tp + T.wrong + T.fp);
  const R = ratio(T.tp, T.tp + T.wrong + T.fn);
  res._micro = { ...T, support: T.tp + T.wrong + T.fn, precision: P, recall: R, f1: f1(P, R) };
  return res;
}

function summarize(items) {
  const W = items.reduce((a, r) => ({ e: a.e + (r.wer?.errors ?? 0), n: a.n + (r.wer?.length ?? 0) }), { e: 0, n: 0 });
  const C = items.reduce((a, r) => ({ e: a.e + (r.cer?.errors ?? 0), n: a.n + (r.cer?.length ?? 0) }), { e: 0, n: 0 });
  const fs_ = fieldStats(items);
  return {
    n: items.length,
    correct: pct(items.filter((r) => r.correct).length, items.length),
    correctUnamb: pct(items.filter((r) => r.correctUnamb).length, items.length),
    f1: fs_._micro.f1, precision: fs_._micro.precision, recall: fs_._micro.recall,
    wer: W.n ? (100 * W.e) / W.n : null, cer: C.n ? (100 * C.e) / C.n : null,
  };
}

const groupBy = (items, key) => {
  const g = {};
  for (const it of items) (g[typeof key === 'function' ? key(it) : it[key]] ??= []).push(it);
  return g;
};

const refItems = cases.map((c) => ({ case: c.id, lang: c.lang, kind: c.kind, ...refRuns[c.id] }));
const forced = runs.filter((r) => r.asrLang !== 'auto');
const base = forced.filter((r) => r.tier === 'base');
const LANGS = ['hi', 'en', 'bn', 'ta', 'te', 'mr', 'kn'];
const kindOf = (r) => (r.kind.startsWith('answer:') ? (caseById[r.case].expected.intent ? 'answer (skip intent)' : 'answer') : r.kind);

const summary = {
  name: NAME,
  generatedAt: new Date().toISOString(),
  extractor: KIT ? 'round2-kit/voice-kit (fraud app)' : path.relative(HERE, EXTRACT),
  cases: cases.length,
  runs: runs.length,
  missingTranscripts: missing,
  headline: {
    reference: summarize(refItems),
    asr_clean: summarize(base),
    asr_noise15: summarize(forced.filter((r) => r.snr === 15)),
    asr_noise5: summarize(forced.filter((r) => r.snr === 5)),
    asr_rate: summarize(forced.filter((r) => r.tier === 'rate')),
    asr_all_forced: summarize(forced),
  },
  // share of runs that would be fully correct if every extractor / extractor_form error were fixed
  ceiling: {
    asr_clean: pct(base.filter((r) => Object.values(r.attr).every((a) => a.cat !== 'asr')).length, base.length),
    asr_all_forced: pct(forced.filter((r) => Object.values(r.attr).every((a) => a.cat !== 'asr')).length, forced.length),
    byLang: Object.fromEntries(LANGS.map((l) => {
      const b = base.filter((r) => r.lang === l);
      return [l, pct(b.filter((r) => Object.values(r.attr).every((a) => a.cat !== 'asr')).length, b.length)];
    })),
  },
  fields: { reference: fieldStats(refItems), asr_clean: fieldStats(base), asr_all_forced: fieldStats(forced) },
  byLang: Object.fromEntries(LANGS.map((l) => {
    const ref = refItems.filter((r) => r.lang === l);
    const b = base.filter((r) => r.lang === l);
    const idRuns = b.filter((r) => ['utr', 'suspectPhone', 'suspectAccount'].some((f) => f in caseById[r.case].expected));
    const idKept = idRuns.filter((r) => ['utr', 'suspectPhone', 'suspectAccount'].every((f) => !(f in caseById[r.case].expected) || valueInTranscript(f, caseById[r.case].expected[f], r.transcript)));
    return [l, {
      reference: summarize(ref), asr_clean: summarize(b),
      asr_noise5: summarize(forced.filter((r) => r.lang === l && r.snr === 5)),
      idDigitsKept: pct(idKept.length, idRuns.length), idRuns: idRuns.length,
      fieldsRef: fieldStats(ref), fieldsAsr: fieldStats(b),
    }];
  })),
  byCondition: Object.fromEntries(Object.entries(groupBy(forced, (r) => (r.noise === 'clean' ? 'clean' : `${r.noise} ${r.snr} dB`))).map(([k, v]) => [k, summarize(v)])),
  bySnr: Object.fromEntries(Object.entries(groupBy(forced.filter((r) => r.tier !== 'rate'), (r) => (r.snr ? `${r.snr} dB` : 'clean'))).map(([k, v]) => [k, summarize(v)])),
  byVoice: Object.fromEntries(Object.entries(groupBy(base, 'voice')).map(([k, v]) => [k, summarize(v)])),
  byRate: Object.fromEntries(Object.entries(groupBy(forced.filter((r) => r.noise === 'clean'), 'rate')).map(([k, v]) => [k, summarize(v)])),
  byKind: Object.fromEntries(Object.entries(groupBy(base, kindOf)).map(([k, v]) => [k, { ...summarize(v), reference: summarize(refItems.filter((r) => kindOf(r) === k)) }])),
};

// language auto-detect vs forced language on the same audio
{
  const auto = runs.filter((r) => r.asrLang === 'auto');
  const forcedByAudio = Object.fromEntries(base.map((r) => [r.tid.replace(/__[a-z]{2}$/, ''), r]));
  const pairs = auto.map((r) => [r, forcedByAudio[r.tid.replace(/__auto$/, '')]]).filter(([, f]) => f);
  summary.autoDetect = {
    n: pairs.length,
    auto: summarize(pairs.map(([a]) => a)),
    forced: summarize(pairs.map(([, f]) => f)),
    wrongScript: pct(pairs.filter(([a]) => a.script !== a.refScript).length, pairs.length),
    byLang: Object.fromEntries(Object.entries(groupBy(pairs, ([a]) => a.lang)).map(([l, ps]) => [l, {
      n: ps.length, autoCorrect: summarize(ps.map(([a]) => a)).correct, forcedCorrect: summarize(ps.map(([, f]) => f)).correct,
      wrongScript: pct(ps.filter(([a]) => a.script !== a.refScript).length, ps.length),
    }])),
  };
}

// error attribution
{
  const fails = [];
  for (const r of forced) for (const [f, a] of Object.entries(r.attr)) fails.push({ ...a, field: f, lang: r.lang, outcome: r.out[f], run: r });
  const count = (xs) => ({ asr: xs.filter((x) => x.cat === 'asr').length, extractor_form: xs.filter((x) => x.cat === 'extractor_form').length, extractor: xs.filter((x) => x.cat === 'extractor').length, extractor_asrToo: xs.filter((x) => x.cat === 'extractor' && x.asrToo).length, total: xs.length });
  summary.attribution = {
    all: count(fails),
    clean: count(fails.filter((x) => x.run.tier === 'base')),
    byField: Object.fromEntries(Object.entries(groupBy(fails, 'field')).map(([k, v]) => [k, count(v)])),
    byLang: Object.fromEntries(Object.entries(groupBy(fails, 'lang')).map(([k, v]) => [k, count(v)])),
    bySnr: Object.fromEntries(Object.entries(groupBy(fails.filter((x) => x.run.tier !== 'rate'), (x) => (x.run.snr ? `${x.run.snr} dB` : 'clean'))).map(([k, v]) => [k, count(v)])),
  };
  // clusters: (field, lang, category, outcome) ranked by how many runs they break
  const clusters = Object.values(groupBy(fails, (x) => `${x.field}|${x.lang}|${x.cat}|${x.outcome}`)).map((xs) => ({
    field: xs[0].field, lang: xs[0].lang, cat: xs[0].cat, outcome: xs[0].outcome, runs: xs.length,
    cases: [...new Set(xs.map((x) => x.run.case))],
  }));
  summary.clusters = clusters.sort((a, b) => b.runs - a.runs);
}

// worst failures: cases that fail most often across their ASR runs
const display = (f, v) => (v === undefined ? '-' : f === 'time' ? describeTime(v) : String(v));
const expDisplay = (f, v) => (f === 'intent' ? v : f === 'time' ? describeTime(canonicalExpected(f, v)) : String(canonicalExpected(f, v)));
{
  const byCase = groupBy(forced, 'case');
  const ranked = Object.entries(byCase).map(([id, rs]) => {
    const failRate = rs.filter((r) => !r.correct).length / rs.length;
    const nFail = rs.reduce((a, r) => a + Object.keys(r.attr).length, 0);
    // representative: the clean run of the first voice, else the first failing run
    const rep = rs.find((r) => r.tier === 'base' && !r.correct) ?? rs.find((r) => !r.correct) ?? rs[0];
    return { id, failRate, nFail, runs: rs.length, rep };
  }).filter((w) => w.failRate > 0).sort((a, b) => b.failRate - a.failRate || b.nFail - a.nFail);
  // at most 6 per language so every language's failure modes show up, still ranked by failure rate
  const perLang = {};
  const worst = ranked.filter((w) => (perLang[caseById[w.id].lang] = (perLang[caseById[w.id].lang] ?? 0) + 1) <= 6).slice(0, 40);
  summary.worst = worst.map((w) => {
    const c = caseById[w.id];
    return {
      id: w.id, lang: c.lang, kind: c.kind, failRate: w.failRate, runs: w.runs, refCorrect: refRuns[w.id].correct,
      text: c.text, transcript: w.rep.transcript, tid: w.rep.tid,
      fields: Object.entries(w.rep.attr).map(([f, a]) => ({
        field: f, outcome: w.rep.out[f], expected: f in c.expected ? expDisplay(f, c.expected[f]) : '-',
        got: display(f, w.rep.got[f]), refGot: display(f, refRuns[w.id].got[f]), cat: a.cat, why: a.why,
      })),
    };
  });
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

fs.mkdirSync(path.join(HERE, 'reports'), { recursive: true });
const prev = COMPARE && fs.existsSync(path.join(HERE, 'reports', `${COMPARE}.json`))
  ? JSON.parse(fs.readFileSync(path.join(HERE, 'reports', `${COMPARE}.json`), 'utf8')).summary : null;

fs.writeFileSync(path.join(HERE, 'reports', `${NAME}.json`), JSON.stringify({
  summary,
  reference: cases.map((c) => ({ id: c.id, got: refRuns[c.id].got, out: refRuns[c.id].out, correct: refRuns[c.id].correct })),
  runs: runs.map(({ wer: w, cer: c, ...r }) => ({ ...r, wer: w.length ? w.errors / w.length : null, cer: c.length ? c.errors / c.length : null })),
}, null, 1));

const f = (x, d = 1) => (x === null || x === undefined || Number.isNaN(x) ? '-' : x.toFixed(d));
const p100 = (x) => f(100 * x);
const delta = (cur, old, scale = 1) => (old === undefined || old === null || Number.isNaN(old) ? '' : ` (${cur - old >= 0 ? '+' : ''}${((cur - old) * scale).toFixed(1)})`);
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const L = [];
const line = (s = '') => L.push(s);
const table = (head, rows) => {
  line(`| ${head.join(' | ')} |`);
  line(`|${head.map(() => '---').join('|')}|`);
  for (const r of rows) line(`| ${r.join(' | ')} |`);
  line();
};
const H = summary.headline;
const PH = prev?.headline;

line(`# Turant pipeline eval: ${NAME}`);
line();
line(`Generated ${summary.generatedAt}. Extractor: \`${summary.extractor}\`. ${summary.cases} cases, ${summary.runs} ASR transcripts scored${missing ? `, **${missing} transcripts missing** (run asr.py)` : ''}.`);
line(`Speech: edge-tts Indian neural voices (2 per language, 3 for en) -> 16 kHz mono -> optional synthetic noise -> local Whisper large-v3-turbo (int8, OpenVINO) with the language token forced -> \`extractFields\` / \`interpret\` / \`parseCorrection\`. Fixed clock: ${NOW.toString()}.`);
if (prev) line(`Deltas in brackets are against \`reports/${COMPARE}.json\`.`);
line();
line('## Headline');
line();
table(['Input', 'Runs', 'Case fully correct %', 'Unambiguous-only %', 'Field P', 'Field R', 'Field F1', 'WER %', 'CER %'],
  [['Reference text (perfect ASR)', 'reference'], ['ASR clean, normal rate', 'asr_clean'], ['ASR noise 15 dB', 'asr_noise15'], ['ASR noise 5 dB', 'asr_noise5'], ['ASR rate -15% / +15%', 'asr_rate'], ['ASR all (forced language)', 'asr_all_forced']].map(([label, k]) => [
    label, H[k].n, f(H[k].correct) + delta(H[k].correct, PH?.[k]?.correct), f(H[k].correctUnamb), p100(H[k].precision), p100(H[k].recall),
    p100(H[k].f1) + delta(H[k].f1, PH?.[k]?.f1, 100), f(H[k].wer), f(H[k].cer)]));
line(`**Ceiling for extract.ts work alone** (every \`extractor\` and \`extractor_form\` error below fixed, ASR unchanged): ${f(summary.ceiling.asr_clean)}% of clean runs and ${f(summary.ceiling.asr_all_forced)}% of all runs fully correct. Per language (clean): ${LANGS.map((l) => `${l} ${f(summary.ceiling.byLang[l], 0)}%`).join(', ')}. The rest needs ASR changes.`);
line();
line('"Case fully correct": every expected field right and nothing spurious. Field P/R/F1 are micro-averaged over all fields (a wrong value counts as both a false positive and a false negative). WER/CER are against the native-script reference after light normalisation; Whisper\'s choice of digits vs number words and Latin vs native script inflates them, so read WER as relative, not absolute.');
line();

line('## Per field');
line();
table(['Field', 'Support', 'Ref P', 'Ref R', 'Ref F1', 'ASR-clean P', 'ASR-clean R', 'ASR-clean F1', 'ASR-all F1'],
  ALL_FIELDS.concat('_micro').map((k) => {
    const r = summary.fields.reference[k], a = summary.fields.asr_clean[k], all = summary.fields.asr_all_forced[k];
    return [k === '_micro' ? '**micro**' : k, r.support, p100(r.precision), p100(r.recall), p100(r.f1), p100(a.precision), p100(a.recall), p100(a.f1) + delta(a.f1, prev?.fields?.asr_clean?.[k]?.f1, 100), p100(all.f1)];
  }));

line('## Per language');
line();
table(['Lang', 'Ref fully correct %', 'ASR-clean fully correct %', 'ASR 5 dB fully correct %', 'Ref F1', 'ASR-clean F1', 'WER %', 'CER %', 'ID digits kept in transcript %'],
  LANGS.map((l) => {
    const s = summary.byLang[l], ps = prev?.byLang?.[l];
    return [l, f(s.reference.correct) + delta(s.reference.correct, ps?.reference?.correct), f(s.asr_clean.correct) + delta(s.asr_clean.correct, ps?.asr_clean?.correct), f(s.asr_noise5.correct), p100(s.reference.f1), p100(s.asr_clean.f1), f(s.asr_clean.wer), f(s.asr_clean.cer), `${f(s.idDigitsKept)} (n=${s.idRuns})`];
  }));
line('Per-language, per-field F1 (reference text / ASR clean):');
line();
table(['Lang', ...FIELDS], LANGS.map((l) => [l, ...FIELDS.map((k) => {
  const r = summary.byLang[l].fieldsRef[k], a = summary.byLang[l].fieldsAsr[k];
  return r.support ? `${p100(r.f1)} / ${p100(a.f1)}` : (r.fp || a.fp ? `fp ${r.fp}/${a.fp}` : '');
})]));

line('## Noise, voice, speaking rate');
line();
table(['Condition', 'Runs', 'Fully correct %', 'Field F1', 'WER %', 'CER %'], Object.entries(summary.byCondition).sort().map(([k, s]) => [k, s.n, f(s.correct), p100(s.f1), f(s.wer), f(s.cer)]));
table(['SNR (clean = all base clips)', 'Runs', 'Fully correct %', 'Field F1', 'WER %'], Object.entries(summary.bySnr).map(([k, s]) => [k, s.n, f(s.correct), p100(s.f1), f(s.wer)]));
table(['Voice (clean, normal rate)', 'Runs', 'Fully correct %', 'Field F1', 'WER %', 'CER %'], Object.entries(summary.byVoice).sort().map(([k, s]) => [k, s.n, f(s.correct), p100(s.f1), f(s.wer), f(s.cer)]));
table(['Rate (clean)', 'Runs', 'Fully correct %', 'Field F1', 'WER %'], Object.entries(summary.byRate).map(([k, s]) => [{ r0: '+0%', rm15: '-15%', rp15: '+15%' }[k] ?? k, s.n, f(s.correct), p100(s.f1), f(s.wer)]));

line('## By utterance kind (ASR clean vs reference)');
line();
table(['Kind', 'Runs', 'Ref fully correct %', 'ASR fully correct %', 'ASR field F1'], Object.entries(summary.byKind).map(([k, s]) => [k, s.n, f(s.reference.correct), f(s.correct), p100(s.f1)]));

if (summary.autoDetect.n) {
  const A = summary.autoDetect;
  line('## Language auto-detect vs forced language token');
  line();
  line(`${A.n} clean clips transcribed twice. Forced: ${f(A.forced.correct)}% fully correct (WER ${f(A.forced.wer)}%). Auto-detect: ${f(A.auto.correct)}% (WER ${f(A.auto.wer)}%). Transcript in the wrong script under auto-detect: ${f(A.wrongScript)}%.`);
  line();
  table(['Lang', 'n', 'Forced fully correct %', 'Auto fully correct %', 'Auto wrong script %'], Object.entries(A.byLang).map(([l, s]) => [l, s.n, f(s.forcedCorrect), f(s.autoCorrect), f(s.wrongScript)]));
}

line('## Where the errors come from');
line();
line('Every field that is wrong, missing or spurious on an ASR transcript is put in one bucket:');
line('- **extractor**: the extractor also fails on the clean reference text (fix in extract.ts, no ASR involved).');
line('- **extractor_form**: the reference passes and the transcript still carries the value (digits present, UPI letters present, or every reference word the extractor relies on survives) but in a form extract.ts does not parse: script switch, digits instead of words, spacing, punctuation. Fixable in extract.ts.');
line('- **asr**: the recogniser lost or changed the words carrying the value. Fixable only with ASR changes (prompting/hotwords, model) or confirmation UX.');
line();
const AT = summary.attribution;
table(['Scope', 'Field errors', 'asr', 'extractor_form', 'extractor', '...of which ASR also lost the value'], [['all forced-language runs', AT.all], ...Object.entries(AT.bySnr).map(([k, v]) => [k, v])].map(([k, v]) => [k, v.total, `${v.asr} (${f(pct(v.asr, v.total), 0)}%)`, `${v.extractor_form} (${f(pct(v.extractor_form, v.total), 0)}%)`, `${v.extractor} (${f(pct(v.extractor, v.total), 0)}%)`, v.extractor_asrToo]));
table(['Field', 'Errors', 'asr', 'extractor_form', 'extractor'], Object.entries(AT.byField).sort((a, b) => b[1].total - a[1].total).map(([k, v]) => [k, v.total, v.asr, v.extractor_form, v.extractor]));
table(['Lang', 'Errors', 'asr', 'extractor_form', 'extractor'], LANGS.filter((l) => AT.byLang[l]).map((l) => [l, AT.byLang[l].total, AT.byLang[l].asr, AT.byLang[l].extractor_form, AT.byLang[l].extractor]));

line('## Biggest failure clusters (field x language x cause)');
line();
table(['#', 'Field', 'Lang', 'Cause', 'Outcome', 'Runs broken', 'Cases'], summary.clusters.slice(0, 30).map((c, i) => [i + 1, c.field, c.lang, c.cat, c.outcome, c.runs, c.cases.slice(0, 8).join(' ') + (c.cases.length > 8 ? ` +${c.cases.length - 8}` : '')]));

const notes = path.join(HERE, 'reports', `${NAME}.notes.md`);
if (fs.existsSync(notes)) {
  line(fs.readFileSync(notes, 'utf8').trim());
  line();
}

line('## Worst 40 failures');
line();
line('Ranked by the share of a case\'s ASR runs (all voices, noise, rates) that are not fully correct, at most 6 per language. Transcript shown is one failing run (clean run first where possible).');
line();
summary.worst.forEach((w, i) => {
  line(`### ${i + 1}. ${w.id} (${w.kind}) - fails ${f(100 * w.failRate, 0)}% of ${w.runs} runs${w.refCorrect ? '' : ', also fails on reference text'}`);
  line();
  line(`- Reference: ${w.text}`);
  line(`- Transcript (\`${w.tid}\`): ${w.transcript}`);
  line();
  table(['Field', 'Outcome', 'Expected', 'Got (ASR)', 'Got (reference)', 'Diagnosis'], w.fields.map((x) => [x.field, x.outcome, esc(x.expected), esc(x.got), esc(x.refGot), `**${x.cat}**: ${esc(x.why)}`]));
});

fs.writeFileSync(path.join(HERE, 'reports', `${NAME}.md`), L.join('\n'));
console.log(`reports/${NAME}.md + .json written: ${runs.length} runs (${missing} transcripts missing)`);
console.log(`reference fully correct ${f(H.reference.correct)}% | ASR clean ${f(H.asr_clean.correct)}% | 15 dB ${f(H.asr_noise15.correct)}% | 5 dB ${f(H.asr_noise5.correct)}% | field F1 ref ${p100(H.reference.f1)} / clean ${p100(H.asr_clean.f1)}`);
