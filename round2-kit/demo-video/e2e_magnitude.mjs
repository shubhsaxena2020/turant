// E2E: a spoken amount under ₹100 (recogniser lost "thousand") is not written in silently; the
// confirm step offers ₹5,000 / ₹5,00,000 by voice and on screen, and one tap fixes it.
//   node e2e_magnitude.mjs <url> <outdir>
// The browser's speech recogniser is replaced by a scripted one (window.__said is the queue).
import { chromium } from 'playwright-core';
import { readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const [url, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const base = join(homedir(), 'AppData', 'Local', 'ms-playwright');
const dir = readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse()[0];
const exe = ['chrome-win64', 'chrome-win'].map((s) => join(base, dir, s, 'chrome.exe')).find(existsSync);
const b = await chromium.launch({ executablePath: exe, args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, permissions: ['microphone'] });
const p = await ctx.newPage();
const errors = [];
p.on('pageerror', (e) => errors.push(String(e)));
await p.addInitScript(() => {
  try {
    localStorage.setItem('turant.lang', 'hi-IN');
  } catch {}
  window.__said = ['mere account se paise kat gaye das minute pehle, SBI ka account hai, KYC update ke naam pe call aaya tha', 'paanch rupaye'];
  window.__spoken = [];
  if (window.speechSynthesis) window.speechSynthesis.speak = (u) => { window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(new Event('end')), 200); };
  class FakeRec {
    start() {
      const text = window.__said.shift();
      if (!text) return setTimeout(() => this.onend && this.onend(), 300);
      setTimeout(() => {
        this.onresult && this.onresult({ resultIndex: 0, results: { length: 1, 0: { isFinal: true, length: 1, 0: { transcript: text, confidence: 0.9 } } } });
        setTimeout(() => this.onend && this.onend(), 200);
      }, 400);
    }
    stop() { this.onend && this.onend(); }
    abort() {}
  }
  window.SpeechRecognition = FakeRec;
  window.webkitSpeechRecognition = FakeRec;
});
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
await p.click('[data-testid="presence"]');
await p.waitForSelector('[data-testid="confirm"]', { timeout: 30000 });
await p.waitForTimeout(600);
await p.screenshot({ path: join(out, 'm1-confirm-small-amount.png') });
const alts = await p.locator('[data-testid^="confirm-alt-"]').allInnerTexts();
const spokenConfirm = (await p.evaluate(() => window.__spoken)).find((s) => s.includes('5,000') || s.includes('5000') || s.includes('पाँच हज़ार'));
await p.click('[data-testid="confirm-alt-0"]');
await p.waitForTimeout(1500);
await p.screenshot({ path: join(out, 'm2-after-tap.png') });
const letter = await p.locator('[data-testid="letter"]').innerText().catch(() => '');
const spoken = await p.evaluate(() => window.__spoken);
await b.close();
const ok = alts.length === 2 && /5,000/.test(alts[0]) && /5,00,000/.test(alts[1]) && /5,000/.test(letter) && errors.length === 0;
console.log(JSON.stringify({ alts, spokenConfirm, letterHas5000: /5,000/.test(letter), errors, lastSpoken: spoken.slice(-3) }, null, 1));
console.log(ok ? 'PASS' : 'FAIL');
process.exit(ok ? 0 : 1);
