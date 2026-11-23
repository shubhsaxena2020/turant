// node probe.mjs <wav> <lang> [headless=1]  -> prints JSON {text, conf, error, ms}
import { chromium } from '../round2-kit/demo-video/node_modules/playwright-core/index.mjs';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
const [wav, lang, headless = '1'] = process.argv.slice(2);
const profile = mkdtempSync(join(tmpdir(), 'wsprobe-'));
const ctx = await chromium.launchPersistentContext(profile, {
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: headless === '1',
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', `--use-file-for-fake-audio-capture=${resolve(wav).split(String.fromCharCode(92)).join('/')}%noloop`, '--autoplay-policy=no-user-gesture-required'],
  permissions: ['microphone'],
  ignoreDefaultArgs: ['--disable-background-networking', '--disable-component-update', '--mute-audio', '--disable-default-apps', '--disable-extensions'],
});
const page = await ctx.newPage();
await page.goto('http://localhost:4322/index.html');
const t = Date.now();
await page.evaluate((l) => go(l), lang);
let res;
for (let i = 0; i < 60; i++) {
  await page.waitForTimeout(500);
  res = await page.evaluate(() => window.result);
  if (res.done) break;
}
try { await page.evaluate(() => window.rec && window.rec.stop()); await page.waitForTimeout(800); res = await page.evaluate(() => window.result); } catch {}
await ctx.close();
rmSync(profile, { recursive: true, force: true });
const text = [...res.finals.map((f) => f.t), res.interim].join(' ').trim();
console.log(JSON.stringify({ text, conf: res.finals[0]?.c ?? null, error: res.error, events: res.events, ms: Date.now() - t }));
