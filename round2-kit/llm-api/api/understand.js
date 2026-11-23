// Vercel serverless function: POST /api/understand
// Body: { text: string, lang?: string, slots: [{ key, type, desc, options? }], hint?: string,
//         summaryLang?: 'en' | null, now?: ISO string }
// Returns: { values: {key: value}, summary?: string, model, ms } or { values: {}, error } (never throws).
//
// The app treats this as a SUGGESTION layer: rules stay the source of truth, and any number or
// ID suggested here is accepted only if the rules can also find it in the transcript (truth check,
// client side). The NVIDIA key lives only in the server env var NVIDIA_API_KEY.

const MODELS = ['nvidia/nemotron-3.5-bolt-e4b', 'nvidia/nemotron-3-ultra-550b-a55b'];
const ENDPOINT = 'https://integrate.api.nvidia.com/v1/chat/completions';
const TIMEOUT_MS = 6000;

function systemPrompt(slots, summaryLang) {
  const lines = slots.map((s) => {
    const opts = s.options ? ` (one of: ${s.options.join(', ')})` : '';
    return `${s.key}: ${s.type}${opts}. ${s.desc || ''}`.trim();
  });
  return [
    'You extract facts from what an Indian user said (any Indian language, code-mixed, possibly speech-recognition output).',
    'Return ONLY a JSON object. Omit a key when it was not said. Never guess.',
    'Understand number words in every Indian language (lakh, hazaar, saade, dhai, ஐயாயிரம், হাজার...). Use the corrected value when the speaker corrects themselves.',
    'Keys:',
    ...lines,
    summaryLang ? `Also add "summary": a short, factual ${summaryLang === 'en' ? 'English' : summaryLang} summary of what was said (no new facts).` : '',
  ].join('\n');
}

async function callModel(model, key, system, user) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      signal: ctrl.signal,
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        temperature: 0,
        max_tokens: 700,
        stream: false,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        chat_template_kwargs: { enable_thinking: false, thinking: false },
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content || '';
    const m = content.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : {};
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ values: {}, error: 'POST only' });
  const key = process.env.NVIDIA_API_KEY;
  if (!key) return res.status(200).json({ values: {}, error: 'not configured' });
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const text = String(body.text || '').slice(0, 2000);
  const slots = Array.isArray(body.slots) ? body.slots.slice(0, 30) : [];
  if (!text || !slots.length) return res.status(400).json({ values: {}, error: 'text and slots required' });
  const now = body.now || new Date().toISOString();
  const user = `Current time: ${now}.${body.hint ? ` The app just asked about: ${body.hint}.` : ''}\nSpeech: ${text}`;
  const system = systemPrompt(slots, body.summaryLang ?? null);
  const t = Date.now();
  for (const model of MODELS) {
    try {
      const out = await callModel(model, key, system, user);
      const { summary, ...values } = out;
      const allowed = new Set(slots.map((s) => s.key));
      const clean = Object.fromEntries(Object.entries(values).filter(([k, v]) => allowed.has(k) && v !== null && v !== ''));
      return res.status(200).json({ values: clean, summary: summary || undefined, model, ms: Date.now() - t });
    } catch (e) {
      // try the next model; rules remain the fallback in the app
    }
  }
  return res.status(200).json({ values: {}, error: 'all models failed', ms: Date.now() - t });
}
