// Every example config: sample stories fill the right slots, the letter is valid,
// documents build, and the config itself is well-formed.
import { describe, expect, it } from 'vitest';
import { APPS } from '../domain/registry';
import type { DomainConfig, Entry } from '../domain/types';
import { extractAll, pendingQuestions, questionsOf } from '../lib/slots';
import { mergeExtraction, newEntry } from '../lib/record';
import { buildLetter, letterText } from '../lib/letter';
import { makeCtx, spokenSummary } from '../lib/outputs';
import type { LangCode } from '../lib/lang';
import khata from './khata/config';
import health, { redFlags } from './health/config';
import civic from './civic/config';

const NOW = new Date(2026, 10, 21, 12, 0, 0);

function entryFrom(cfg: DomainConfig, lang: LangCode, text: string): Entry {
  const e = newEntry(cfg.id, lang, { now: NOW });
  e.turns = [text];
  e.fields = mergeExtraction(cfg, {}, extractAll(cfg, text, { now: NOW }), { source: 'voice', mode: 'story' }).fields;
  return e;
}
const story = (cfg: DomainConfig, lang: LangCode) => entryFrom(cfg, lang, cfg.samples.stories[lang]!);
const val = (e: Entry, k: string) => e.fields[k]?.value;

describe('registry', () => {
  it('finds all four example apps', () => {
    expect(Object.keys(APPS).sort()).toEqual(['civic', 'fraud', 'health', 'khata']);
  });
});

describe('khata: kirana voice ledger', () => {
  it('the brief sentence fills customer, items, amount and credit (Hindi)', () => {
    const e = entryFrom(khata, 'hi-IN', 'Ramesh ne 3 kilo chawal aur 2 litre tel liya, 450 rupaye udhaar');
    expect(val(e, 'customer')).toBe('Ramesh');
    expect(val(e, 'items')).toEqual([
      { qty: 3, unit: 'kg', item: 'Rice' },
      { qty: 2, unit: 'L', item: 'Oil' },
    ]);
    expect(val(e, 'amount')).toBe(450);
    expect(val(e, 'payment')).toBe('credit');
    expect(pendingQuestions(khata, e.fields)).toEqual([]);
  });
  it('the Devanagari version', () => {
    const e = entryFrom(khata, 'hi-IN', 'रमेश ने 3 किलो चावल और 2 लीटर तेल लिया, 450 रुपये उधार');
    expect(val(e, 'customer')).toBe('रमेश');
    expect((val(e, 'items') as unknown[]).length).toBe(2);
    expect(val(e, 'amount')).toBe(450);
    expect(val(e, 'payment')).toBe('credit');
  });
  it('English sample asks only whether it was paid', () => {
    const e = story(khata, 'en-IN');
    expect(val(e, 'customer')).toBe('Sunita');
    expect(val(e, 'amount')).toBe(380);
    expect(pendingQuestions(khata, e.fields)).toEqual(['payment']);
  });
  it('shows items in Hindi on screen, English in the ledger', () => {
    const e = story(khata, 'hi-IN');
    expect(makeCtx(khata, e, 'hi-IN', NOW).show('items')).toBe('3 kg चावल, 2 L तेल');
    const doc = khata.document.build(e, makeCtx(khata, e, 'en-IN', NOW));
    expect(doc).toContain('Item 1: 3 kg Rice');
    expect(doc).toContain('Rupees Four Hundred Fifty only');
    expect(doc).toContain('Credit (udhaar)');
  });
  it('the WhatsApp reminder is in the shopkeeper’s language', () => {
    const e = story(khata, 'hi-IN');
    const msg = khata.done.primary.text!(e, makeCtx(khata, e, 'hi-IN', NOW));
    expect(msg).toContain('₹450');
    expect(msg).toContain('उधार');
  });
});

describe('health: symptom intake -> English doctor note', () => {
  it('Tamil sample fills name, age, symptoms, days and temperature', () => {
    const e = story(health, 'ta-IN');
    expect(val(e, 'patient')).toBe('லட்சுமி');
    expect(val(e, 'age')).toBe(62);
    expect(val(e, 'symptoms')).toEqual(['fever', 'cough', 'headache']);
    expect(val(e, 'days')).toBe(3);
    expect(val(e, 'temp')).toBe(101);
    // 62 years: the pregnancy question is not asked.
    expect(pendingQuestions(health, e.fields)).toEqual([]);
  });
  it('the doctor note is English even when the patient spoke Tamil', () => {
    const e = story(health, 'ta-IN');
    const doc = health.document.build(e, makeCtx(health, e, 'ta-IN', NOW));
    expect(doc).toContain('Name: Latchumi (லட்சுமி)');
    expect(doc).toContain('Symptoms: Fever, Cough, Headache');
    expect(doc).toContain('Duration: 3 days');
    expect(doc).toContain('Temperature: 101°F');
    expect(doc).toContain('Recorded by voice in Tamil');
    const summary = doc.split('4. SUMMARY\n')[1].split('\n')[0];
    expect(summary).toMatch(/^Latchumi/);
    expect(summary).toContain('62 years old');
  });
  it('English sample: pregnant, asks the temperature', () => {
    const e = story(health, 'en-IN');
    expect(val(e, 'patient')).toBe('Meena');
    expect(val(e, 'pregnant')).toBe(true);
    expect(pendingQuestions(health, e.fields)).toEqual(['temp']);
    expect(redFlags(e.fields)).toContain('Fever in pregnancy');
  });
  it('Hindi sample asks temperature and pregnancy (age 26)', () => {
    const e = story(health, 'hi-IN');
    expect(val(e, 'patient')).toBe('Sunita');
    expect(pendingQuestions(health, e.fields)).toEqual(['temp', 'pregnant']);
  });
  it('flags danger signs', () => {
    const e = entryFrom(health, 'hi-IN', 'Raju, 40 saal, do din se seene mein dard aur saans phool rahi hai, 103 degree bukhar');
    expect(redFlags(e.fields)).toEqual(expect.arrayContaining(['Chest pain', 'Breathlessness', 'High fever (103°F)']));
    expect(health.check.notice!(e.fields, NOW)).not.toBeNull();
  });
  it('an LLM summary is printed separately and labelled', () => {
    const e = { ...story(health, 'ta-IN'), summary: { text: 'Elderly woman with fever and cough.', model: 'm' } };
    const doc = health.document.build(e, makeCtx(health, e, 'ta-IN', NOW));
    expect(doc).toContain('AUTO-GENERATED SUMMARY (AI, PLEASE VERIFY)');
    expect(doc).toContain('4. SUMMARY');
  });
});

describe('civic: grievance', () => {
  it('Kannada sample fills issue, landmark, ward and duration; asks the phone', () => {
    const e = story(civic, 'kn-IN');
    expect(val(e, 'issue')).toBe('pothole');
    expect(val(e, 'location')).toBe('ಶಿವ ದೇವಸ್ಥಾನದ ಹತ್ತಿರ');
    expect(val(e, 'ward')).toBe('ಜಯನಗರ ವಾರ್ಡ್ 167');
    expect(val(e, 'since')).toBe(14);
    expect(pendingQuestions(civic, e.fields)).toEqual(['phone']);
  });
  it('English sample fills everything', () => {
    const e = story(civic, 'en-IN');
    expect(val(e, 'location')).toBe('near Shiv temple');
    expect(val(e, 'ward')).toBe('Jayanagar ward 167');
    expect(val(e, 'phone')).toBe('9845012345');
    expect(pendingQuestions(civic, e.fields)).toEqual([]);
  });
  it('writes an English complaint with transliterated Kannada places', () => {
    const e = story(civic, 'kn-IN');
    e.fields.phone = { value: '9845012345', confidence: 1, source: 'voice' };
    const doc = civic.document.build(e, makeCtx(civic, e, 'kn-IN', NOW));
    expect(doc).toContain('Department: Roads and Infrastructure');
    expect(doc).toMatch(/Landmark: Shiva .* \(ಶಿವ ದೇವಸ್ಥಾನದ ಹತ್ತಿರ\)/);
    expect(doc).toContain('Problem since: about 14 days');
    expect(doc).toContain('Photo: Not attached');
    expect(doc).toContain('Mobile number: 98450 12345');
  });
});

describe('every config', () => {
  for (const cfg of Object.values(APPS)) {
    describe(cfg.id, () => {
      it('has hi or its first language, and en sample stories', () => {
        expect(cfg.samples.stories['en-IN']).toBeTruthy();
        expect(cfg.samples.stories[cfg.languages[0]]).toBeTruthy();
      });
      it('every sample story fills every required slot', () => {
        for (const lang of Object.keys(cfg.samples.stories) as LangCode[]) {
          const e = story(cfg, lang);
          const missing = questionsOf(cfg).filter((q) => q.required && q.slots.every((s) => e.fields[s.key] === undefined)).map((q) => q.key);
          // A sample may leave required questions so the demo shows a question, but each must have a sample answer.
          for (const q of missing) expect(cfg.samples.answers?.[q], `${cfg.id}/${lang} needs a sample answer for ${q}`).toBeTruthy();
        }
      });
      it('every pending question has a sample answer that answers it', () => {
        for (const q of questionsOf(cfg).filter((x) => x.ask)) {
          const ans = cfg.samples.answers?.[q.key];
          if (!ans) continue;
          for (const lang of cfg.languages) {
            const text = typeof ans === 'string' ? ans : ans[lang] ?? ans['en-IN'];
            if (!text) continue;
            const ext = extractAll(cfg, text, { now: NOW, hint: q.key });
            expect(q.slots.some((s) => ext[s.key]), `${cfg.id} ${q.key} ${lang}: "${text}"`).toBe(true);
          }
        }
      });
      it('letter placeholders are slot keys or group names', () => {
        const names = new Set([...cfg.slots.map((s) => s.key), ...Object.keys(cfg.groups ?? {})]);
        for (const s of cfg.letter) for (const t of Object.values(s.text)) for (const m of t!.matchAll(/\{(\w+)\}/g)) expect(names.has(m[1]), `${cfg.id}: {${m[1]}}`).toBe(true);
      });
      it('check rows point at real slots', () => {
        const keys = new Set(cfg.slots.map((s) => s.key));
        const rows = [cfg.check.hero, ...cfg.check.main, ...(cfg.check.more ?? []).flatMap((r) => (typeof r === 'string' ? [r] : [...r.any, r.empty]))].filter(Boolean);
        for (const r of rows) expect(keys.has(r!), `${cfg.id}: ${r}`).toBe(true);
      });
      it('every asked question has words in every language of the app', () => {
        for (const q of questionsOf(cfg).filter((x) => x.ask))
          for (const lang of cfg.languages) {
            const qq = q.copy.q?.[lang] ?? q.copy.q?.['en-IN'];
            expect(qq, `${cfg.id} ${q.key} ${lang}`).toBeTruthy();
          }
      });
      it('builds the letter, documents and summary for every sample without placeholders left', () => {
        for (const lang of Object.keys(cfg.samples.stories) as LangCode[]) {
          const e = story(cfg, lang);
          const ctx = makeCtx(cfg, e, lang, NOW);
          const letter = letterText(buildLetter(cfg, e, lang, NOW));
          expect(letter.length).toBeGreaterThan(10);
          expect(letter).not.toMatch(/\{\w+\}/);
          const doc = cfg.document.build(e, ctx);
          expect(doc.split('\n').length).toBeGreaterThan(5);
          expect(doc).not.toMatch(/\{\w+\}|undefined|NaN/);
          expect(spokenSummary(cfg, e, lang, NOW)).not.toMatch(/undefined/);
          const script = cfg.done.script?.(e, { ...ctx, aloud: false }) ?? [];
          for (const l of script) expect(l).not.toMatch(/\{\w+\}|undefined/);
          for (const s of cfg.document.sections ?? []) expect(s.build(e, ctx)).not.toMatch(/undefined/);
        }
      });
    });
  }
});
