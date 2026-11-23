// Turant's letter, answer and output tests (prototype/src/lib/*.test.ts), on the kit.
import { describe, expect, it } from 'vitest';
import fraud from './config';
import { FRAUD_STRINGS, ft } from './strings';
import { build1930Script, buildBankMessage, buildComplaintText, buildFamilyMessage, buildPortalDescription, needsPoliceVisit, PORTAL_BANNED } from './outputs';
import { extractAll } from '../../lib/slots';
import { mergeExtraction, newEntry } from '../../lib/record';
import { buildLetter, fillTemplate, letterText } from '../../lib/letter';
import { commitAnswer, interpret, shownValues, spokenValues } from '../../lib/answer';
import { displayValue } from '../../lib/values';
import { spokenSummary, whatsappLink, uiText } from '../../lib/outputs';
import { amountInWords, formatINR, groupDigits, maskAccount, spokenDigits } from '../../lib/format';
import type { Entry, Fields } from '../../domain/types';
import type { LangCode } from '../../lib/lang';

const NOW = new Date(2026, 10, 21, 12, 0, 0);

function sampleEntry(): Entry {
  const r = newEntry('fraud', 'hi-IN', { now: NOW });
  const text = fraud.samples.stories['hi-IN']!;
  r.turns = [text];
  r.fields = mergeExtraction(fraud, {}, extractAll(fraud, text, { now: NOW }), { source: 'voice', mode: 'story' }).fields;
  r.fields.utr = { value: '456789012345', confidence: 0.95, source: 'voice' };
  r.fields.suspectAccount = { value: '50100234567812', confidence: 0.85, source: 'voice' };
  return r;
}

describe('answer', () => {
  const N = new Date('2026-11-21T13:30:00+05:30');
  it('reads an amount answer', () => {
    const r = interpret(fraud, 'paanch hazaar rupaye', 'amount', N);
    expect(r.kind).toBe('value');
    if (r.kind === 'value') {
      expect(r.keys).toEqual(['amount']);
      expect(shownValues(fraud, r.ext, r.keys, 'hi-IN')).toBe('₹5,000');
    }
  });
  it('treats "pata nahi" / "skip" as skip', () => {
    expect(interpret(fraud, 'skip', 'utr', N).kind).toBe('skip');
  });
  it('a miss when nothing usable is said', () => {
    expect(interpret(fraud, 'haan ji woh', 'utr', N).kind).toBe('miss');
  });
  it('suspect answer fills UPI or phone', () => {
    const r = interpret(fraud, 'uska number 98765 43210 tha', 'suspect', N);
    expect(r.kind === 'value' && r.keys).toEqual(['suspectPhone']);
  });
  it('spoken UTR is read in digit groups', () => {
    const r = interpret(fraud, '4 5 6 7 8 9 0 1 2 3 4 5', 'utr', N);
    expect(r.kind).toBe('value');
    if (r.kind === 'value') expect(spokenValues(fraud, r.ext, r.keys, 'en-IN')).toMatch(/4 5 6 7/);
  });
  it('commit overwrites the target and only fills gaps elsewhere', () => {
    let rep = newEntry('fraud', 'hi-IN', { now: N });
    rep = { ...rep, fields: { amount: { value: 4999, confidence: 0.9, source: 'voice' } } };
    const sms = interpret(fraud, 'Rs.5000 debited. UPI Ref No 456789012345', 'utr', N);
    expect(sms.kind).toBe('value');
    if (sms.kind !== 'value') return;
    const { entry, changed } = commitAnswer(fraud, rep, sms.ext, sms.keys, 'voice', 0.9);
    expect(entry.fields.utr?.value).toBe('456789012345');
    expect(entry.fields.amount?.value).toBe(4999);
    expect(changed).toContain('utr');
  });
});

describe('letter', () => {
  const N = new Date('2026-11-21T13:30:00+05:30');
  const tenMinAgo = new Date(N.getTime() - 10 * 60_000).toISOString();
  const full: Fields = {
    amount: { value: 5000, confidence: 0.9, source: 'voice' },
    time: { value: tenMinAgo, confidence: 0.9, source: 'voice' },
    scamType: { value: 'fake_kyc', confidence: 0.9, source: 'voice' },
    bank: { value: 'State Bank of India (SBI)', confidence: 0.9, source: 'voice' },
    suspectUpi: { value: 'rahul.kyc@ybl', confidence: 0.9, source: 'voice' },
  };
  it('fills facts and leaves a gap for the missing UTR (Hindi)', () => {
    const letter = buildLetter(fraud, { fields: full, skipped: [] }, 'hi-IN', N);
    const segs = letter.flat();
    expect(segs.some((s) => s.kind === 'fact' && s.text === '₹5,000')).toBe(true);
    expect(segs.some((s) => s.kind === 'fact' && s.text.includes('SBI'))).toBe(true);
    expect(segs.filter((s) => s.kind === 'gap').map((s) => s.kind === 'gap' && s.q)).toEqual(['utr']);
    expect(letterText(letter)).toContain('rahul.kyc@ybl');
  });
  it('shows skipped facts as "later", not as a gap', () => {
    const segs = buildLetter(fraud, { fields: full, skipped: ['utr'] }, 'en-IN', N).flat();
    expect(segs.some((s) => s.kind === 'gap')).toBe(false);
    expect(segs.some((s) => s.kind === 'later' && s.q === 'utr')).toBe(true);
  });
  it('an empty record is all gaps in the natural order', () => {
    const gaps = buildLetter(fraud, { fields: {}, skipped: [] }, 'en-IN', N)
      .flat()
      .filter((s) => s.kind === 'gap')
      .map((s) => (s.kind === 'gap' ? s.q : ''));
    expect(gaps).toEqual(['time', 'scamType', 'amount', 'bank', 'utr', 'suspect']);
  });
  it('adds the payment-app sentence only when known', () => {
    expect(buildLetter(fraud, { fields: full, skipped: [] }, 'en-IN', N)).toHaveLength(5);
    const withApp = { ...full, paymentApp: { value: 'PhonePe', confidence: 1, source: 'voice' as const } };
    const l = buildLetter(fraud, { fields: withApp, skipped: [] }, 'en-IN', N);
    expect(l).toHaveLength(6);
    expect(letterText(l)).toContain('PhonePe');
  });
  it('keeps text around placeholders intact', () => {
    const s = fillTemplate(fraud, 'A {amount} B', full, [], 'en-IN', N);
    expect(s.map((x) => (x.kind === 'gap' ? '_' : x.text)).join('')).toBe('A ₹5,000 B');
  });
  it('every language has every letter template', () => {
    for (const lang of fraud.languages) for (const s of fraud.letter) expect(s.text[lang], `${lang}`).toBeTruthy();
  });
});

describe('format', () => {
  it('formats rupees the Indian way', () => {
    expect(formatINR(5000)).toBe('₹5,000');
    expect(formatINR(250000)).toBe('₹2,50,000');
  });
  it('writes amounts in words', () => {
    expect(amountInWords(5000)).toBe('Five Thousand');
    expect(amountInWords(4999)).toBe('Four Thousand Nine Hundred Ninety Nine');
    expect(amountInWords(250000)).toBe('Two Lakh Fifty Thousand');
  });
  it('groups and speaks digits in fours', () => {
    expect(groupDigits('456789012345')).toBe('4567 8901 2345');
    expect(spokenDigits('456789012345')).toBe('4 5 6 7, 8 9 0 1, 2 3 4 5');
  });
  it('masks account numbers to the last 4 digits', () => {
    expect(maskAccount('50100234567812')).toBe('XXXX7812');
  });
});

describe('action outputs', () => {
  const r = sampleEntry();
  it('builds a 4-line 1930 script in Hindi', () => {
    const lines = build1930Script(r, 'hi-IN', { now: NOW });
    expect(lines).toHaveLength(4);
    expect(lines[0]).toContain('₹5,000');
    expect(lines[0]).toContain('State Bank of India (SBI)');
    expect(lines[0]).toMatch(/[ऀ-ॿ]/);
    expect(lines[1]).toContain('नकली KYC');
    expect(lines[2]).toContain('4567 8901 2345');
    expect(lines[3]).toContain('rahul.kyc@ybl');
    expect(lines.join(' ')).not.toContain('50100234567812');
  });
  it('speaks the UTR digit by digit', () => {
    expect(build1930Script(r, 'hi-IN', { now: NOW, spoken: true })[2]).toContain('4 5 6 7, 8 9 0 1, 2 3 4 5');
  });
  it('builds scripts in every language', () => {
    for (const lang of Object.keys(FRAUD_STRINGS) as LangCode[]) {
      const lines = build1930Script(r, lang, { now: NOW });
      expect(lines).toHaveLength(4);
      expect(lines.every((l) => l.length > 10 && !l.includes('{'))).toBe(true);
    }
  });
  it('builds a portal-style English complaint with masked account', () => {
    const text = buildComplaintText(r, NOW);
    expect(text).toContain('Online Financial Fraud');
    expect(text).toContain('UPI Related Frauds');
    expect(text).toContain('Transaction ID / UTR No.: 456789012345');
    expect(text).toContain('21/11/2026');
    expect(text).toContain('11:50 AM');
    expect(text).toContain('Rupees Five Thousand only');
    expect(text).toContain('11:50 AM, I received a call');
    expect(text).toContain('rahul.kyc@ybl');
    expect(text).toContain('XXXX7812');
    expect(text).not.toContain('50100234567812');
    const description = text.split('4. INCIDENT DESCRIPTION\n')[1].split('\n')[0];
    expect(description.length).toBeGreaterThan(200);
  });
  it('builds a bank message', () => {
    const msg = buildBankMessage(r);
    expect(msg).toContain('State Bank of India (SBI)');
    expect(msg).toContain('UTR / Transaction ID: 456789012345');
    expect(msg).toContain('Block my UPI');
    expect(msg).not.toContain('50100234567812');
  });
  it('builds a WhatsApp link', () => {
    const link = whatsappLink(buildFamilyMessage(r, { lang: 'hi-IN' }));
    expect(link.startsWith('https://wa.me/?text=')).toBe(true);
    expect(decodeURIComponent(link.split('text=')[1])).toContain('₹5,000');
  });
  it('builds a spoken summary with grouped digits', () => {
    const s = spokenSummary(fraud, r, 'hi-IN', NOW);
    expect(s).toContain('4 5 6 7, 8 9 0 1, 2 3 4 5');
    expect(s).toContain(uiText(fraud, 'hi-IN', 'isThisRight'));
    expect(s).toContain(ft('hi-IN', 'summaryIntro'));
  });
  it('shows the account masked on cards', () => {
    expect(displayValue(fraud, 'suspectAccount', r.fields, 'hi-IN', NOW)).toBe('XXXX7812');
  });
  it('works with missing fields', () => {
    const empty = newEntry('fraud', 'en-IN', { now: NOW });
    expect(build1930Script(empty, 'en-IN')[2]).toContain('do not have the UTR');
    expect(buildComplaintText(empty, NOW)).toContain('Not known');
  });
});

describe('police advice', () => {
  it('above 1 lakh or older than 3 days', () => {
    expect(needsPoliceVisit({ amount: { value: 150000, confidence: 1, source: 'typed' } }, NOW)).toBe(true);
    expect(needsPoliceVisit({ amount: { value: 5000, confidence: 1, source: 'typed' } }, NOW)).toBe(false);
    const old = new Date(NOW.getTime() - 4 * 86_400_000).toISOString();
    expect(needsPoliceVisit({ time: { value: old, confidence: 1, source: 'typed' } }, NOW)).toBe(true);
    expect(fraud.check.notice!({ amount: { value: 150000, confidence: 1, source: 'typed' } }, NOW)).not.toBeNull();
  });
});

describe('portal description', () => {
  it('is at least 200 chars, has no banned characters and keeps UPI IDs out', () => {
    const d = buildPortalDescription(sampleEntry());
    expect(d.length).toBeGreaterThanOrEqual(200);
    expect(d).not.toMatch(PORTAL_BANNED);
    expect(d).not.toContain('@');
    expect(d).toContain('456789012345');
  });
  it('still reaches 200 chars when fields are missing', () => {
    const d = buildPortalDescription(newEntry('fraud', 'en-IN', { now: NOW }));
    expect(d.length).toBeGreaterThanOrEqual(200);
    expect(d).not.toMatch(PORTAL_BANNED);
  });
});

describe('Turant copy is kept', () => {
  it('Turant overrides of kit strings', () => {
    expect(uiText(fraud, 'hi-IN', 'skipLater')).toBe('छोड़िए, 1930 वाले पूछ लेंगे');
    expect(uiText(fraud, 'en-IN', 'state_speaking')).toBe('Turant is speaking…');
  });
});
