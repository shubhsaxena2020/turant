import { describe, expect, it } from 'vitest';
import { BANK_CHIPS, TOP_BANKS } from './choices';
import { BANKS, SCAM_TYPES } from './extract';
import { hasOwnString, scamLabel, STRINGS } from '../i18n/strings';
import type { LangCode } from './extract';

const LANGS = Object.keys(STRINGS) as LangCode[];

describe('one-tap answer chips', () => {
  it('bank chips are real banks: in the full list and the extractor, so a tap fills the same value as speech', () => {
    const names = new Set(BANKS.map((b) => b.name));
    expect(BANK_CHIPS).toHaveLength(8);
    for (const [value, label] of BANK_CHIPS) {
      expect(TOP_BANKS).toContain(value);
      expect(names.has(value)).toBe(true);
      expect(label.length).toBeLessThanOrEqual(14);
    }
  });
  it('every language has its own "other bank" chip and a label for every scam type', () => {
    expect(LANGS).toHaveLength(7);
    for (const lang of LANGS) {
      expect(hasOwnString(lang, 'otherBank')).toBe(true);
      for (const s of SCAM_TYPES) expect(scamLabel(lang, s)).toBeTruthy();
    }
  });
});
