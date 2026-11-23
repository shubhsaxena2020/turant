// Run the function locally against the real NIM endpoint: node test-local.mjs
// Needs NVIDIA_API_KEY in the environment (on this laptop: NVIDIA_API_KEY_4).
import handler from './api/understand.js';

process.env.NVIDIA_API_KEY ||= process.env.NVIDIA_API_KEY_4;

function call(body) {
  return new Promise((resolve) => {
    const res = {
      code: 200,
      headers: {},
      setHeader(k, v) { this.headers[k] = v; },
      status(c) { this.code = c; return this; },
      json(o) { resolve({ code: this.code, body: o }); },
      end() { resolve({ code: this.code }); },
    };
    handler({ method: 'POST', body }, res);
  });
}

const cases = [
  {
    name: 'Tamil fraud story',
    body: {
      text: 'என் SBI account-ல இருந்து ஐயாயிரம் ரூபாய் போச்சு, ஒரு ஆள் KYC update பண்ணனும்னு சொன்னான், பத்து நிமிஷம் முன்னாடி',
      slots: [
        { key: 'amount', type: 'integer rupees' },
        { key: 'bank', type: 'string' },
        { key: 'scamType', type: 'enum', options: ['fake_kyc', 'otp_shared', 'qr_scan', 'other'] },
      ],
      summaryLang: 'en',
    },
  },
  {
    name: 'Tamil symptoms → English summary',
    body: {
      text: 'மூணு நாளா காய்ச்சல், தலைவலி, இருமல் இருக்கு, ராத்திரி ரொம்ப குளிருது, சாப்பிட முடியல',
      slots: [
        { key: 'symptoms', type: 'array of English symptom names' },
        { key: 'sinceDays', type: 'integer days' },
      ],
      summaryLang: 'en',
    },
  },
];

for (const c of cases) {
  const r = await call(c.body);
  console.log(c.name, JSON.stringify(r, null, 1));
}
