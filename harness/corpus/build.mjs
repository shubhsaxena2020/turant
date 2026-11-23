// Merge corpus/parts/*.jsonl into corpus/cases.jsonl and validate every case.
// Usage: node corpus/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BANK_IDS, APP_IDS } from '../lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const LANGS = ['hi', 'en', 'bn', 'ta', 'te', 'mr', 'kn'];
const FIELDS = ['amount', 'time', 'scamType', 'bank', 'paymentApp', 'utr', 'suspectUpi', 'suspectPhone', 'suspectAccount', 'intent'];
const SCAMS = ['fake_kyc', 'otp_shared', 'fake_customer_care', 'wrong_transfer', 'qr_scan', 'investment_task', 'sextortion', 'other'];
const QUESTIONS = ['amount', 'time', 'scamType', 'bank', 'utr', 'suspect'];

const errors = [];
const cases = [];
const ids = new Set();
for (const lang of LANGS) {
  const file = path.join(here, 'parts', `${lang}.jsonl`);
  fs.readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, i) => {
    if (!line.trim()) return;
    let c;
    try {
      c = JSON.parse(line);
    } catch (e) {
      errors.push(`${lang}:${i + 1} bad JSON: ${e.message}`);
      return;
    }
    const err = (m) => errors.push(`${c.id ?? `${lang}:${i + 1}`}: ${m}`);
    if (ids.has(c.id)) err('duplicate id');
    ids.add(c.id);
    if (c.lang !== lang) err(`lang ${c.lang} in ${lang} file`);
    if (!c.text) err('no text');
    const kindOk = c.kind === 'story' || c.kind === 'correction' || (c.kind?.startsWith('answer:') && QUESTIONS.includes(c.kind.slice(7)));
    if (!kindOk) err(`bad kind ${c.kind}`);
    if (c.kind?.startsWith('answer:') && c.hint !== c.kind.slice(7)) err('hint must equal the answered question');
    const exp = c.expected ?? {};
    if (!Object.keys(exp).length) err('no expectations');
    if (c.kind === 'correction' && Object.keys(exp).length !== 1) err('correction must expect exactly one field');
    for (const [k, v] of Object.entries(exp)) {
      if (!FIELDS.includes(k)) err(`unknown field ${k}`);
      if (k === 'amount' && typeof v !== 'number') err('amount must be a number');
      if (k === 'time' && !(typeof v.ago === 'number' || (typeof v.day === 'number' && /^\d\d:\d\d$/.test(v.at)))) err('time must be {ago} or {day,at}');
      if (k === 'scamType' && !SCAMS.includes(v)) err(`bad scamType ${v}`);
      if (k === 'bank' && !BANK_IDS[v]) err(`bad bank id ${v}`);
      if (k === 'paymentApp' && !APP_IDS[v]) err(`bad app id ${v}`);
      if (k === 'utr' && !/^\d{12}$/.test(v)) err('utr must be 12 digits');
      if (k === 'suspectPhone' && !/^[6-9]\d{9}$/.test(v)) err('phone must be 10 digits');
      if (k === 'suspectAccount' && !/^\d{9,18}$/.test(v)) err('account must be 9-18 digits');
      if (k === 'suspectUpi' && !/^[a-z0-9._-]+@[a-z0-9]+$/.test(v)) err('bad upi');
      if (k === 'intent' && v !== 'skip') err('only skip intents are scored');
    }
    for (const a of c.ambiguous ?? []) if (!(a in exp)) err(`ambiguous field ${a} not expected`);
    cases.push(c);
  });
}

const byLang = Object.fromEntries(LANGS.map((l) => [l, cases.filter((c) => c.lang === l).length]));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
fs.writeFileSync(path.join(here, 'cases.jsonl'), cases.map((c) => JSON.stringify(c)).join('\n') + '\n');
console.log(`cases.jsonl: ${cases.length} cases`, byLang);
