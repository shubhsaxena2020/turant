// Low-end-phone performance of the live site: CPU + network throttling via CDP, a recorded clip as the microphone.
// usage: node harness/perf_lowend.mjs <mode: tti|dl|asr|fail> [args]   (PERF_URL to test another build)
// Needs playwright-core (round2-kit/demo-video) and a Playwright Chromium. Run it pinned to a few cores, e.g.
//   cmd /c "start /b /wait /affinity 1F /belownormal node harness/perf_lowend.mjs tti"
import { chromium } from '../round2-kit/demo-video/node_modules/playwright-core/index.mjs';
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const HERE = join(process.cwd(), '.perf'); // browser profiles and mic copies (throwaway)
mkdirSync(HERE, { recursive: true });
const SITE = process.env.PERF_URL ?? 'https://turant-voice.vercel.app/';
const CLIP = new URL('./audio/clean/hi-01__Madhur__r0.wav', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'); // 11.3 s Hindi story
const CLIP_S = 11.27;
// Network presets (bytes/s): Chrome DevTools "Fast 3G" and Lighthouse's mobile "Slow 4G"
const NET = {
  none: null,
  fast3g: { latency: 562.5, downloadThroughput: (1.44e6 / 8) * 0.9, uploadThroughput: (675e3 / 8) * 0.9 },
  slow4g: { latency: 150, downloadThroughput: (1.6e6 / 8) * 0.9, uploadThroughput: (750e3 / 8) * 0.9 },
};
const base = join(homedir(), 'AppData', 'Local', 'ms-playwright');
const exe = readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse()
  .flatMap((d) => ['chrome-win64', 'chrome-win'].map((s) => join(base, d, s, 'chrome.exe'))).find(existsSync);

async function open(profile, { fresh = true, mic = false } = {}) {
  if (fresh) rmSync(profile, { recursive: true, force: true });
  mkdirSync(profile, { recursive: true });
  const args = ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--enable-precise-memory-info'];
  if (mic) { const m = join(HERE, `mic_${Date.now()}.wav`); copyFileSync(CLIP, m); args.push(`--use-file-for-fake-audio-capture=${m}%noloop`); }
  const ctx = await chromium.launchPersistentContext(profile, { executablePath: exe, headless: true, viewport: { width: 390, height: 844 }, permissions: ['microphone'], args });
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  return { ctx, page, cdp };
}
async function throttle(cdp, cpu, net) {
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
  const n = NET[net];
  await cdp.send('Network.emulateNetworkConditions', n ? { offline: false, ...n } : { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
}
const heap = (page) => page.evaluate(() => (performance.memory ? performance.memory.usedJSHeapSize : 0)).catch(() => 0);
// input latency: click "Aa" (text size) and time until the scale variable changes
async function inputLatency(page) {
  const before = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--scale'));
  const t = Date.now();
  await page.getByRole('button', { name: /^Aa$|text size/i }).first().click({ timeout: 20000 }).catch(() => {});
  for (let i = 0; i < 200; i++) {
    const now = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--scale'));
    if (now !== before) return Date.now() - t;
    await page.waitForTimeout(25);
  }
  return -1;
}

const mode = process.argv[2];
const out = {};

if (mode === 'tti') {
  for (const net of ['fast3g', 'slow4g']) for (const cpu of [4, 6]) {
    const { ctx, page, cdp } = await open(join(HERE, 'prof_tti'));
    await throttle(cdp, cpu, net);
    await page.addInitScript(() => { window.__lt = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([e.startTime, e.duration]); }).observe({ type: 'longtask', buffered: true }); });
    const t0 = Date.now();
    await page.goto(SITE, { waitUntil: 'commit', timeout: 120000 });
    await page.getByRole('button', { name: 'Tap to speak' }).waitFor({ state: 'visible', timeout: 120000 });
    const tButton = Date.now() - t0;
    await page.waitForTimeout(5000);
    const m = await page.evaluate(() => {
      const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? null;
      const lt = window.__lt; const lastLong = lt.length ? Math.max(...lt.map(([s, d]) => s + d)) : 0;
      return { fcp: Math.round(fcp), lastLongTaskEnd: Math.round(lastLong), longTasks: lt.length, longTaskMs: Math.round(lt.reduce((a, [, d]) => a + d, 0)) };
    });
    const lat = await inputLatency(page);
    out[`${net}_cpu${cpu}`] = { tapToSpeakVisibleMs: tButton, ...m, tti_est_ms: Math.max(tButton, m.lastLongTaskEnd), textSizeClickMs: lat, heapMB: +((await heap(page)) / 1e6).toFixed(1) };
    await ctx.close();
  }
}

if (mode === 'dl') {
  // model download under throttled network: progress over time, UI responsiveness while it downloads
  const net = process.argv[3] ?? 'fast3g';
  const cpu = Number(process.argv[4] ?? 4);
  const { ctx, page, cdp } = await open(join(HERE, 'prof_dl'), { mic: true });
  await page.goto(SITE + '?speech=whisper', { timeout: 120000 });
  await page.evaluate(() => localStorage.setItem('turant.lang', 'hi-IN'));
  await page.reload();
  await page.getByRole('button', { name: 'Tap to speak' }).waitFor();
  await throttle(cdp, cpu, net);
  let bytes = 0; const t0 = Date.now();
  cdp.on('Network.dataReceived', (e) => { bytes += e.dataLength; });
  await page.getByRole('button', { name: 'Tap to speak' }).click();
  const samples = []; const lats = [];
  for (let s = 0; s < 120; s += 10) {
    await page.waitForTimeout(10000);
    const prog = await page.evaluate(() => document.querySelector('[data-testid=model-progress]')?.textContent?.trim() ?? null);
    samples.push({ s: s + 10, MB: +(bytes / 1e6).toFixed(2), progress: prog });
    if (s % 30 === 0) lats.push(await inputLatency(page));
  }
  const secs = (Date.now() - t0) / 1000;
  const rate = bytes / secs;
  out.dl = { net, cpu, seconds: Math.round(secs), MB: +(bytes / 1e6).toFixed(1), MBps: +(rate / 1e6).toFixed(3), textSizeClickMs: lats, samples, heapMB: +((await heap(page)) / 1e6).toFixed(1) };
  await ctx.close();
}

if (mode === 'asr') {
  // clip end -> filled report, in-page model cached (warm-up run first, unthrottled)
  const prof = join(HERE, 'prof_asr');
  for (const [i, cpu] of [[0, 1], [1, 1], [2, 4], [3, 6]]) {
    const { ctx, page, cdp } = await open(prof, { fresh: i === 0, mic: true });
    await page.goto(SITE + '?speech=whisper', { timeout: 120000 });
    await page.evaluate(() => { localStorage.setItem('turant.lang', 'hi-IN'); for (const k of Object.keys(localStorage)) if (k.startsWith('turant.report')) localStorage.removeItem(k); });
    await page.reload();
    await page.getByRole('button', { name: 'Tap to speak' }).waitFor();
    await throttle(cdp, cpu, 'none');
    let peak = 0; let tTranscribing = null; let tFilled = null; let progSeen = false;
    const t0 = Date.now();
    await page.getByRole('button', { name: 'Tap to speak' }).click();
    for (let k = 0; k < 1200 && !tFilled; k++) {
      await page.waitForTimeout(250);
      const st = await page.evaluate(() => ({ t: document.querySelector('main')?.innerText ?? '', p: !!document.querySelector('[data-testid=model-progress]') }));
      progSeen ||= st.p;
      if (!tTranscribing && /Turning your voice into words|transcrib/i.test(st.t)) tTranscribing = Date.now() - t0;
      if (/Noted:|Please read|Is this right/i.test(st.t)) tFilled = Date.now() - t0;
      if (k % 8 === 0) peak = Math.max(peak, await heap(page));
    }
    const text = (await page.locator('main').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 160);
    out[i === 0 ? 'warmup_cpu1' : `cpu${cpu}`] = { tapToFilledMs: tFilled, clipEndToFilledMs: tFilled && Math.round(tFilled - CLIP_S * 1000), tapToTranscribingMs: tTranscribing, modelProgressShown: progSeen, peakHeapMB: +(peak / 1e6).toFixed(1), filled: text };
    await ctx.close();
  }
}

if (mode === 'fail') {
  // a failed model download: what the person sees, and whether a second try recovers
  const { ctx, page } = await open(join(HERE, 'prof_fail'), { mic: true });
  await page.goto(SITE + '?speech=whisper', { timeout: 120000 });
  await page.evaluate(() => localStorage.setItem('turant.lang', 'hi-IN'));
  await page.reload();
  let blocked = 0;
  await ctx.route(/\.onnx(\?|$)|onnx_data/, (r) => { blocked++; return r.abort('connectionreset'); });
  await page.getByRole('button', { name: 'Tap to speak' }).click();
  await page.waitForTimeout(45000);
  out.failed = { blocked, notice: await page.evaluate(() => document.querySelector('[data-testid=mic-problem]')?.textContent?.trim() ?? null), text: (await page.locator('main').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 400), buttons: await page.evaluate(() => [...document.querySelectorAll('button')].map((b) => b.textContent.trim()).filter(Boolean)) };
  await ctx.unroute(/\.onnx(\?|$)|onnx_data/);
  // second try, network back
  await page.reload();
  await page.getByRole('button', { name: 'Tap to speak' }).click().catch(() => {});
  let filled = null; const t0 = Date.now();
  for (let k = 0; k < 120 && !filled; k++) { await page.waitForTimeout(1000); const t = await page.locator('main').innerText().catch(() => ''); if (/Noted:|Please read|Is this right/i.test(t)) filled = t.replace(/\s+/g, ' ').slice(0, 200); }
  out.retry = { recovered: !!filled, seconds: Math.round((Date.now() - t0) / 1000), text: filled };
  await ctx.close();
}

console.log(JSON.stringify(out, null, 1));
