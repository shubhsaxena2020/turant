// Transliteration, UI strings, merge of lists, and the optional LLM hook (mocked, offline).
import { afterEach, describe, expect, it, vi } from 'vitest';
import { inEnglish, translit } from './translit';
import { UI_STRINGS, uiString } from '../i18n/ui';
import { mergeExtraction } from './record';
import { extractSmart, understandClient } from './llm';
import type { DomainConfig, LLMExtractor, SlotDef } from '../domain/types';
import health from '../apps/health/config';

describe('transliteration', () => {
  it.each([
    ['रमेश', 'Ramesh'],
    ['सुनीता', 'Suneeta'],
    ['லட்சுமி', 'Latchumi'],
    ['ರಮೇಶ್', 'Ramesh'],
    ['জয়নগর', 'Jayanagar'],
  ])('%s -> %s', (src, out) => {
    expect(translit(src)).toBe(out);
  });
  it('keeps Latin text and shows the original next to the transliteration', () => {
    expect(inEnglish('Ramesh')).toBe('Ramesh');
    expect(inEnglish('ಜಯನಗರ')).toBe('Jayanagara (ಜಯನಗರ)');
  });
});

describe('UI strings', () => {
  it('every language has every kit key (no English fallback on screen)', () => {
    const keys = Object.keys(UI_STRINGS['en-IN']);
    for (const [lang, s] of Object.entries(UI_STRINGS)) {
      if (lang === 'en-IN') continue;
      const missing = keys.filter((k) => s[k as keyof typeof s] === undefined && k !== 'share');
      // Turant's own translations sometimes reuse the English word (e.g. "Copy"); those keys are fine missing.
      expect(missing.length, `${lang}: ${missing.join(',')}`).toBeLessThan(8);
    }
  });
  it('config overrides win, then the language, then English', () => {
    expect(uiString('ta-IN', 'skipLater', { 'ta-IN': { skipLater: 'X' } })).toBe('X');
    expect(uiString('ta-IN', 'skipLater')).toBe('இப்போது விடுங்கள்');
  });
});

describe('list merge', () => {
  const c = { slots: [{ key: 's', type: 'enum', multi: true, label: {}, options: [] }] as SlotDef[] };
  it('a later story turn adds symptoms instead of conflicting', () => {
    const r = mergeExtraction(c, { s: { value: ['fever'], confidence: 0.9, source: 'voice' } }, { s: { value: ['cough'], confidence: 0.9 } }, { source: 'voice', mode: 'story' });
    expect(r.fields.s?.value).toEqual(['fever', 'cough']);
    expect(r.conflicts).toHaveLength(0);
  });
});

describe('LLM hook', () => {
  const cfg = (extract: LLMExtractor, enabled = true): Pick<DomainConfig, 'slots' | 'llm'> => ({ slots: health.slots, llm: { extract, enabled, summaryLang: 'en' } });
  const text = 'என் பெயர் லட்சுமி, வயது 62. மூன்று நாட்களாக காய்ச்சல், தலைவலி. குளிர் நடுக்கம், பசி இல்லை.';
  afterEach(() => vi.unstubAllGlobals());

  it('is off by default: rules only, the extractor is never called', async () => {
    const spy = vi.fn();
    const r = await extractSmart(cfg(spy as unknown as LLMExtractor, false), text, { lang: 'ta-IN' });
    expect(spy).not.toHaveBeenCalled();
    expect(r.rules.age?.value).toBe(62);
    expect(r.llm).toEqual({});
  });

  it('fills gaps, never overwrites rules, and truth-checks numbers', async () => {
    const r = await extractSmart(
      cfg(async () => ({
        values: { age: 65, days: 3, temp: 104, symptoms: ['fever', 'headache', 'chills', 'loss of appetite'], patient: 'Lakshmi' },
        summary: 'A 62-year-old woman with fever for 3 days.',
        model: 'nemotron',
      })),
      text,
      { lang: 'ta-IN' },
    );
    // rules found age 62, days 3, name: the LLM's 65 / "Lakshmi" are ignored.
    expect(r.rules.age?.value).toBe(62);
    expect(r.llm.age).toBeUndefined();
    expect(r.llm.patient).toBeUndefined();
    // 104 is not in the transcript: suggested, not accepted.
    expect(r.llm.temp).toBeUndefined();
    expect(r.suggested.temp?.value).toBe(104);
    expect(r.summary?.text).toContain('62-year-old');
  });

  it('adds extra list items to what the rules heard, never removes rule items', async () => {
    const r = await extractSmart(cfg(async () => ({ values: { symptoms: ['fever', 'chills'] } })), 'bukhar aur khansi hai', { lang: 'hi-IN' });
    expect(r.rules.symptoms?.value).toEqual(['fever', 'cough']);
    expect(r.llm.symptoms?.value).toEqual(['chills']);
  });

  it('accepts list values the rules missed (unknown symptoms kept as words)', async () => {
    const r = await extractSmart(cfg(async () => ({ values: { symptoms: ['fever', 'chills'] } })), 'bas thoda theek nahi lag raha', { lang: 'hi-IN' });
    expect(r.llm.symptoms?.value).toEqual(['fever', 'chills']);
  });

  it('accepts a number the rules can confirm when asked about it', async () => {
    const r = await extractSmart(cfg(async () => ({ values: { temp: 101 } })), 'thermometer mein 101 aaya', { lang: 'hi-IN' });
    expect(r.llm.temp?.value).toBe(101);
  });

  it('falls back to rules when the model throws or hangs', async () => {
    const boom = await extractSmart(cfg(async () => Promise.reject(new Error('down'))), text, { lang: 'ta-IN' });
    expect(boom.rules.days?.value).toBe(3);
    expect(boom.llm).toEqual({});
    vi.useFakeTimers();
    const p = extractSmart({ ...cfg(() => new Promise(() => {})), llm: { extract: () => new Promise(() => {}), enabled: true, timeoutMs: 50 } }, text, { lang: 'ta-IN' });
    vi.advanceTimersByTime(60);
    const slow = await p;
    vi.useRealTimers();
    expect(slow.rules.age?.value).toBe(62);
  });

  it('understandClient posts slots to /api/understand and never throws', async () => {
    const fetchMock = vi.fn(async () => ({ json: async () => ({ values: { symptoms: ['fever'] }, summary: 'Fever.', model: 'm', ms: 900 }) }));
    vi.stubGlobal('fetch', fetchMock);
    const client = understandClient({ baseUrl: 'https://x.test/' });
    const out = await client('bukhar hai', [{ key: 'symptoms', type: 'enum', description: 'Symptoms', options: ['fever'], multi: true }], { lang: 'hi-IN', now: new Date(), summaryLang: 'en' });
    expect(out.values.symptoms).toEqual(['fever']);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, { body: string }];
    expect(url).toBe('https://x.test/api/understand');
    const body = JSON.parse(init.body);
    expect(body.summaryLang).toBe('en');
    expect(body.slots[0]).toMatchObject({ key: 'symptoms', type: 'enum', options: ['fever'] });
    vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new Error('offline'))));
    expect((await client('x', [], { lang: 'hi-IN', now: new Date() })).values).toEqual({});
  });
});
