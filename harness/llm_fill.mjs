// LLM pass over the harness texts (reference + clean forced-language transcripts), cached, for
// comparing rules / LLM / hybrid policies with run_eval.mjs --llm <slug> --policy <p>.
//   node llm_fill.mjs [model] [--all]     (--all: every forced-language transcript, not just clean)
// Cache: llm-cache/<slug>.jsonl, one {text, hint, raw, sec} per distinct (text, hint).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { NOW } from './lib.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MODEL = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? 'nvidia/nemotron-3.5-bolt-e4b';
const ALL = process.argv.includes('--all');
const SLUG = MODEL.replace(/[^a-z0-9.-]+/gi, '__');
const KEY = execFileSync('powershell', ['-NoProfile', '-Command', "[Environment]::GetEnvironmentVariable('NVIDIA_API_KEY_4','User')"]).toString().trim();

const BANKS = 'sbi, hdfc, icici, axis, kotak, pnb, bob (Bank of Baroda), canara, union, boi (Bank of India), indian (Indian Bank), yes, idfc, indusind, ippb, other';
export const SYSTEM =
  'You extract facts from what an Indian UPI/online-fraud victim said (any Indian language, code-mixed, ASR output). ' +
  'Return ONLY a JSON object, no prose. Keys (omit or null when not said):\n' +
  'amount: integer rupees lost (understand number words in every Indian language, lakh/hazaar/saade/dhai);\n' +
  "when: local datetime 'YYYY-MM-DDTHH:MM' of the incident, computed from the current time given;\n" +
  'scamType: one of fake_kyc, otp_shared, fake_customer_care, wrong_transfer, qr_scan, investment_task, sextortion, other;\n' +
  `bank: victim's bank as one of: ${BANKS};\n` +
  'paymentApp: one of phonepe, gpay, paytm, bhim, bankapp;\n' +
  'utr: the 12-digit UPI transaction/reference number, digits only;\n' +
  "suspectUpi: fraudster's UPI ID as name@handle (convert 'dot'->'.', 'at'->'@');\n" +
  "suspectPhone: fraudster's 10-digit mobile, digits only;\n" +
  "suspectAccount: fraudster's bank account number, digits only;\n" +
  "intent: 'skip' if the speaker says they don't know / want to skip, else null.\n" +
  'If the speaker corrects themselves, use the corrected value. Never guess a value that was not said.';

const pad = (n) => String(n).padStart(2, '0');
const nowStr = `${NOW.getFullYear()}-${pad(NOW.getMonth() + 1)}-${pad(NOW.getDate())} ${pad(NOW.getHours())}:${pad(NOW.getMinutes())}`;

async function call(text, hint) {
  let user = `Current time: ${nowStr} (IST).\n`;
  if (hint) user += `The app had just asked about: ${hint}.\n`;
  user += `Speech: ${text}`;
  const body = JSON.stringify({
    model: MODEL, temperature: 0, max_tokens: 600, stream: false,
    messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }],
    chat_template_kwargs: { enable_thinking: false, thinking: false },
  });
  for (let attempt = 0; attempt < 4; attempt++) {
    const t = Date.now();
    try {
      const r = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST', body, signal: AbortSignal.timeout(90_000),
        headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      });
      if (r.status === 429) {
        await new Promise((s) => setTimeout(s, 15_000 * (attempt + 1)));
        continue;
      }
      if (!r.ok) return { raw: `HTTP ${r.status}`, sec: 0 };
      const j = await r.json();
      return { raw: j.choices?.[0]?.message?.content ?? '', sec: (Date.now() - t) / 1000 };
    } catch (e) {
      await new Promise((s) => setTimeout(s, 5000));
      if (attempt === 3) return { raw: `ERR ${e.name}`, sec: 0 };
    }
  }
  return { raw: 'ERR retries', sec: 0 };
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}` || process.argv[1].endsWith('llm_fill.mjs')) {
  const cases = fs.readFileSync(path.join(HERE, 'corpus', 'cases.jsonl'), 'utf8').trim().split(/\r?\n/).map((l) => JSON.parse(l));
  const byId = Object.fromEntries(cases.map((c) => [c.id, c]));
  const plan = JSON.parse(fs.readFileSync(path.join(HERE, 'plan.json'), 'utf8'));
  const audio = Object.fromEntries(plan.audios.map((a) => [a.audio, a]));
  const clip = Object.fromEntries(plan.clips.map((c) => [c.clip, c]));
  const todo = new Map();
  const add = (text, c) => {
    if (c.kind === 'correction') return; // corrections stay with the rules
    todo.set(`${c.hint ?? ''}\u0001${text}`, { text, hint: c.hint ?? null });
  };
  for (const c of cases) add(c.text, c);
  for (const j of plan.jobs) {
    if (!j.asr_lang) continue;
    const a = audio[j.audio];
    if (!ALL && !(a.noise === 'clean' && clip[a.clip].rate === 'r0')) continue;
    const f = path.join(HERE, 'transcripts', `${j.tid}.json`);
    if (!fs.existsSync(f)) continue;
    add(JSON.parse(fs.readFileSync(f, 'utf8')).text, byId[j.case]);
  }
  const dir = path.join(HERE, 'llm-cache');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${SLUG}.jsonl`);
  const done = new Set(fs.existsSync(file) ? fs.readFileSync(file, 'utf8').trim().split(/\r?\n/).filter(Boolean).map((l) => { const o = JSON.parse(l); return `${o.hint ?? ''}\u0001${o.text}`; }) : []);
  const queue = [...todo.entries()].filter(([k]) => !done.has(k)).map(([, v]) => v);
  console.log(`${MODEL}: ${todo.size} distinct texts, ${queue.length} to call`);
  let n = 0;
  let errs = 0;
  const worker = async () => {
    while (queue.length) {
      const it = queue.shift();
      const r = await call(it.text, it.hint);
      if (r.raw.startsWith('HTTP') || r.raw.startsWith('ERR')) errs++;
      else fs.appendFileSync(file, JSON.stringify({ ...it, ...r }) + '\n');
      if (++n % 50 === 0) console.log(`${n} done, ${errs} errors`);
    }
  };
  await Promise.all([worker(), worker(), worker()]);
  console.log(`finished: ${n} called, ${errs} errors (errors are not cached; re-run to retry)`);
}
