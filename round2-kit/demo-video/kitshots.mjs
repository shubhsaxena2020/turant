import { chromium } from 'playwright-core';
import { readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
const out = process.argv[2]; mkdirSync(out, { recursive: true });
const base = join(homedir(), 'AppData', 'Local', 'ms-playwright');
const dir = readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse()[0];
const exe = ['chrome-win64', 'chrome-win'].map((s) => join(base, dir, s, 'chrome.exe')).find(existsSync);
const b = await chromium.launch({ executablePath: exe });
for (const app of ['health', 'khata', 'civic']) {
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })).newPage();
  await p.addInitScript(() => { window.speechSynthesis && (window.speechSynthesis.speak = (u) => setTimeout(() => u.onend && u.onend(new Event('end')), 300)); });
  await p.goto(`http://localhost:4324/?app=${app}`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(700);
  await p.screenshot({ path: join(out, `${app}-1.png`) });
  try {
    await p.click('[data-testid="sample"]');
    await p.waitForSelector('[data-testid="all-right"]', { timeout: 150000 });
    await p.waitForTimeout(700);
    await p.screenshot({ path: join(out, `${app}-2.png`) });
    await p.click('[data-testid="all-right"]');
    await p.waitForTimeout(1400);
    await p.screenshot({ path: join(out, `${app}-3.png`) });
  } catch (e) { console.log(app, 'flow error', e.message.slice(0, 120)); }
}
await b.close(); console.log('ok');
