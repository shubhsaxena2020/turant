import { describe, expect, it } from 'vitest';
import { buildLetter, fillTemplate, letterText } from './letter';
import type { Fields } from './report';
import { STRINGS } from '../i18n/strings';

const NOW = new Date('2026-11-21T13:30:00+05:30');
const tenMinAgo = new Date(NOW.getTime() - 10 * 60_000).toISOString();

const full: Fields = {
  amount: { value: 5000, confidence: 0.9, source: 'voice' },
  time: { value: tenMinAgo, confidence: 0.9, source: 'voice' },
  scamType: { value: 'fake_kyc', confidence: 0.9, source: 'voice' },
  bank: { value: 'State Bank of India (SBI)', confidence: 0.9, source: 'voice' },
  suspectUpi: { value: 'rahul.kyc@ybl', confidence: 0.9, source: 'voice' },
};

describe('letter', () => {
  it('fills facts and leaves a gap for the missing UTR (Hindi)', () => {
    const letter = buildLetter({ fields: full, skipped: [] }, 'hi-IN', NOW);
    const segs = letter.flat();
    expect(segs.some((s) => s.kind === 'fact' && s.text === '₹5,000')).toBe(true);
    expect(segs.some((s) => s.kind === 'fact' && s.text.includes('SBI'))).toBe(true);
    expect(segs.filter((s) => s.kind === 'gap').map((s) => s.kind === 'gap' && s.q)).toEqual(['utr']);
    expect(letterText(letter)).toContain('rahul.kyc@ybl');
  });

  it('shows skipped facts as "later", not as a gap', () => {
    const segs = buildLetter({ fields: full, skipped: ['utr'] }, 'en-IN', NOW).flat();
    expect(segs.some((s) => s.kind === 'gap')).toBe(false);
    expect(segs.some((s) => s.kind === 'later' && s.q === 'utr')).toBe(true);
  });

  it('an empty report is all gaps in the natural order', () => {
    const gaps = buildLetter({ fields: {}, skipped: [] }, 'en-IN', NOW)
      .flat()
      .filter((s) => s.kind === 'gap')
      .map((s) => (s.kind === 'gap' ? s.q : ''));
    expect(gaps).toEqual(['time', 'scamType', 'amount', 'bank', 'utr', 'suspect']);
  });

  it('adds the payment-app sentence only when known', () => {
    expect(buildLetter({ fields: full, skipped: [] }, 'en-IN', NOW)).toHaveLength(5);
    const withApp = { ...full, paymentApp: { value: 'PhonePe', confidence: 1, source: 'voice' as const } };
    const l = buildLetter({ fields: withApp, skipped: [] }, 'en-IN', NOW);
    expect(l).toHaveLength(6);
    expect(letterText(l)).toContain('PhonePe');
  });

  it('keeps text around placeholders intact', () => {
    const s = fillTemplate('A {amount} B', full, [], 'en-IN', NOW);
    expect(s.map((x) => (x.kind === 'gap' ? '_' : x.text)).join('')).toBe('A ₹5,000 B');
  });

  it('every language has every letter template with valid slots', () => {
    const keys = ['L_when', 'L_scam', 'L_money', 'L_app', 'L_utr', 'L_suspect'] as const;
    for (const [lang, s] of Object.entries(STRINGS)) {
      for (const k of keys) {
        const tpl = s[k];
        expect(tpl, `${lang}.${k}`).toBeTruthy();
        for (const m of tpl!.matchAll(/\{(\w+)\}/g)) expect(['when', 'scam', 'bank', 'amount', 'app', 'utr', 'suspect']).toContain(m[1]);
      }
    }
  });
});
