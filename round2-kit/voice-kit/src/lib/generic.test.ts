// Generic slot behaviours found with harness/kit_apps_eval.mjs (khata / health / civic corpora).
import { describe, expect, it } from 'vitest';
import khata from '../apps/khata/config';
import health from '../apps/health/config';
import civic from '../apps/civic/config';
import { extractAll } from './slots';

const NOW = new Date(2026, 10, 21, 12, 0, 0);
const v = (cfg: unknown, t: string, k: string, o = {}) => (extractAll(cfg as never, t, { now: NOW, ...o } as never) as Record<string, { value: unknown } | undefined>)[k]?.value;

describe('names', () => {
  it('titles are skipped, never taken as the name', () => {
    expect(v(khata, 'Suresh bhaiya ne 5 kilo aata li, 320 rupaye udhaar', 'customer')).toBe('Suresh');
    expect(v(khata, 'गीता दीदी ने दो पैकेट दूध लिया, सत्तर रुपये', 'customer')).toBe('गीता');
  });
  it('"X aaya", a glued ने, and a story that opens with a name then a quantity', () => {
    expect(v(khata, 'Pappu aaya tha, 500 rupaye wapas de gaya', 'customer')).toBe('Pappu');
    expect(v(khata, 'सुनीलने दोन किलो साखर घेतली, ऐंशी रुपये', 'customer')).toBe('सुनील');
    expect(v(khata, 'রহিম দুই কেজি চাল নিয়েছে, দুশো টাকা', 'customer')).toBe('রহিম');
  });
});

describe('numbers and durations', () => {
  it('number slots fall back to the cross-language parser', () => {
    expect(v(health, 'baavan saal', 'age', { hint: 'age' })).toBe(52);
  });
  it('a unit with a "since" marker and no number means one', () => {
    expect(v(civic, 'आमच्या गल्लीत पाणी येत नाही, आठवड्यापासून', 'since')).toBe(7);
  });
  it('"half a kilo"', () => {
    expect(v(khata, 'two kilos of sugar and half a kilo of dal', 'items', { hint: 'items' })).toEqual([
      { qty: 2, unit: 'kg', item: 'Sugar' },
      { qty: 0.5, unit: 'kg', item: 'Dal' },
    ]);
  });
});

describe('text markers', () => {
  it('a marker glued onto the landmark (शाळेजवळ) still gives the place', () => {
    expect(String(v(civic, 'आमच्या गल्लीत पाणी येत नाही, शाळेजवळ, वॉर्ड 4', 'location'))).toContain('शाळे');
  });
});
