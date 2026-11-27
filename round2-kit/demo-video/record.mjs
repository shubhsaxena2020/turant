// Step 2: drive the app through the scenario at phone size and record a video.
// Each step's actions run, then we hold until that step's narration has had time to play.
// node record.mjs scenario.json out/   -> out/screen.webm + out/timeline.json
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';

const [scenarioPath, outDir] = process.argv.slice(2);
const sc = JSON.parse(readFileSync(scenarioPath, 'utf8'));
const timing = JSON.parse(readFileSync(join(outDir, 'timing.json'), 'utf8'));

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const base = join(homedir(), 'AppData', 'Local', 'ms-playwright');
  const dirs = readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse();
  for (const d of dirs) {
    for (const sub of ['chrome-win64', 'chrome-win']) {
      const p = join(base, d, sub, 'chrome.exe');
      if (existsSync(p)) return p;
    }
  }
  throw new Error('no Chromium found; set CHROME_PATH');
}

const sel = (t) => (t.startsWith('testid:') ? `[data-testid="${t.slice(7)}"]` : t.startsWith('text:') ? `text=${t.slice(5)}` : t);

const vw = sc.viewport ?? { width: 390, height: 844 };
// sc.mic: a voice clip Chrome uses as its microphone, so the app's real speech pipeline runs on real audio
// (a fresh copy per run: Chrome can keep the previous file open). sc.profile: a persistent profile that keeps
// the app's downloaded speech model between runs. Both need a headed browser (fake audio is flaky headless).
const args = ['--autoplay-policy=no-user-gesture-required'];
let micCopy = null;
if (sc.mic) {
  micCopy = resolve(outDir, `mic_${Date.now()}.wav`); // absolute: Chrome resolves relative paths against its own cwd
  copyFileSync(sc.mic, micCopy);
  args.push('--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', `--use-file-for-fake-audio-capture=${micCopy}%noloop`);
}
const headless = !(sc.mic || sc.profile);
const ctxOpts = { viewport: vw, deviceScaleFactor: 2, locale: sc.locale ?? 'hi-IN', permissions: sc.mic ? ['microphone'] : [] };
let browser = null;
let context;
if (sc.profile) {
  context = await chromium.launchPersistentContext(sc.profile, { executablePath: sc.chrome ?? findChrome(), headless, args, ...ctxOpts });
} else {
  browser = await chromium.launch({ executablePath: sc.chrome ?? findChrome(), headless, args });
  context = await browser.newContext(ctxOpts);
}
const page = context.pages()[0] ?? (await context.newPage());
// Sharp capture: Chrome's screencast at device pixels (2x), every frame time-stamped.
const framesDir = join(outDir, 'frames');
rmSync(framesDir, { recursive: true, force: true });
mkdirSync(framesDir, { recursive: true });
const frames = [];
const cdp = await context.newCDPSession(page);
cdp.on('Page.screencastFrame', async (f) => {
  const name = `f${String(frames.length).padStart(6, '0')}.jpg`;
  writeFileSync(join(framesDir, name), Buffer.from(f.data, 'base64'));
  frames.push({ name, t: f.metadata.timestamp });
  try { await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }); } catch {}
});
// Mute in-app speech (the narration track replaces it) but keep the UI flowing.
await page.addInitScript(() => {
  try {
    const synth = window.speechSynthesis;
    if (synth) synth.speak = (u) => setTimeout(() => u.onend && u.onend(new Event('end')), 400);
  } catch {}
});
await page.goto(sc.url, { waitUntil: 'networkidle' });
for (const init of sc.init ?? []) await page.evaluate(init);
if (sc.init?.length) await page.reload({ waitUntil: 'networkidle' });
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: vw.width * 2, maxHeight: vw.height * 2, everyNthFrame: 1 });
await page.waitForTimeout(300);
const t0 = Date.now();

const timeline = [];
const logs = [];
page.on('console', (m) => logs.push(m.text().slice(0, 300)));
for (const [i, step] of sc.steps.entries()) {
  const start = Date.now() - t0;
  try {
  for (const a of step.do ?? []) {
    if (a.click) await page.locator(sel(a.click)).first().click({ timeout: a.timeout ?? 20000 });
    if (a.fill) await page.locator(sel(a.fill[0])).first().fill(a.fill[1]);
    if (a.waitFor) await page.locator(sel(a.waitFor)).first().waitFor({ timeout: a.timeout ?? 60000 });
    if (a.wait) await page.waitForTimeout(a.wait);
    if (a.scroll) await page.mouse.wheel(0, a.scroll);
    if (a.press) await page.keyboard.press(a.press);
    // clickUntil: keep clicking (e.g. "skip") while it is there, until another element appears
    if (a.clickUntil) {
      for (let k = 0; k < (a.max ?? 6); k++) {
        if (await page.locator(sel(a.until)).count()) break;
        const btn = page.locator(sel(a.clickUntil)).first();
        if (await btn.count()) await btn.click({ timeout: 5000 }).catch(() => {});
        await page.waitForTimeout(a.gap ?? 900);
      }
      await page.locator(sel(a.until)).first().waitFor({ timeout: a.timeout ?? 30000 });
    }
  }
  } catch (e) {
    await page.screenshot({ path: join(outDir, `fail_step${i}.png`) }).catch(() => {});
    const text = await page.evaluate(() => document.body.innerText).catch(() => '');
    writeFileSync(join(outDir, `fail_step${i}.txt`), `${text}\n--- console\n${logs.join('\n')}`);
    console.error(`step ${i} failed: ${String(e.message).split('\n')[0]} (see fail_step${i}.png)`);
    await context.close();
    if (browser) await browser.close();
    process.exit(1);
  }
  const need = Math.max(timing[i]?.ms ?? 0, step.minMs ?? 0) + (step.padMs ?? 500);
  const spent = Date.now() - t0 - start;
  if (need > spent) await page.waitForTimeout(need - spent);
  timeline.push({ i, startMs: start, endMs: Date.now() - t0 });
  console.log(`step ${i} ${start}-${Date.now() - t0}ms`);
}
await page.waitForTimeout(800);
await cdp.send('Page.stopScreencast');
const tEnd = Date.now();
await context.close();
if (browser) await browser.close();
// concat list with real per-frame durations, clipped to [t0, tEnd] (wall clock, seconds)
const s0 = t0 / 1000;
const keep = frames.filter((f, i) => f.t >= s0 || (frames[i + 1] && frames[i + 1].t > s0));
let list = '';
for (let i = 0; i < keep.length; i++) {
  const start = Math.max(keep[i].t, s0);
  const end = i + 1 < keep.length ? keep[i + 1].t : tEnd / 1000;
  list += `file 'frames/${keep[i].name}'
duration ${Math.max(0.001, end - start).toFixed(4)}
`;
}
if (keep.length) list += `file 'frames/${keep[keep.length - 1].name}'
`;
writeFileSync(join(outDir, 'frames.txt'), list);
writeFileSync(join(outDir, 'timeline.json'), JSON.stringify(timeline, null, 1));
console.log('recorded', keep.length, 'frames ->', join(outDir, 'frames.txt'));
