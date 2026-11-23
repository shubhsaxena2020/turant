import { describe, expect, it } from 'vitest';
import { commitAnswer, interpret, shownValues, spokenValues } from './answer';
import { newReport } from './report';

const NOW = new Date('2026-11-21T13:30:00+05:30');

describe('answer', () => {
  it('reads an amount answer', () => {
    const r = interpret('paanch hazaar rupaye', 'amount', NOW);
    expect(r.kind).toBe('value');
    if (r.kind === 'value') {
      expect(r.keys).toEqual(['amount']);
      expect(shownValues(r.ext, r.keys, 'hi-IN')).toBe('₹5,000');
    }
  });

  it('treats "pata nahi" / "skip" as skip', () => {
    expect(interpret('skip', 'utr', NOW).kind).toBe('skip');
  });

  it('a miss when nothing usable is said', () => {
    expect(interpret('haan ji woh', 'utr', NOW).kind).toBe('miss');
  });

  it('suspect answer fills UPI or phone', () => {
    const r = interpret('uska number 98765 43210 tha', 'suspect', NOW);
    expect(r.kind === 'value' && r.keys).toEqual(['suspectPhone']);
  });

  it('spoken UTR is read in digit groups', () => {
    const r = interpret('4 5 6 7 8 9 0 1 2 3 4 5', 'utr', NOW);
    expect(r.kind).toBe('value');
    if (r.kind === 'value') expect(spokenValues(r.ext, r.keys, 'en-IN')).toMatch(/4 5 6 7/);
  });

  it('commit overwrites the target and only fills gaps elsewhere', () => {
    let rep = newReport('hi-IN', { now: NOW });
    rep = { ...rep, fields: { amount: { value: 4999, confidence: 0.9, source: 'voice' } } };
    const sms = interpret('Rs.5000 debited. UPI Ref No 456789012345', 'utr', NOW);
    expect(sms.kind).toBe('value');
    if (sms.kind !== 'value') return;
    const { report, changed } = commitAnswer(rep, sms.ext, sms.keys, 'voice', 0.9);
    expect(report.fields.utr?.value).toBe('456789012345');
    expect(report.fields.amount?.value).toBe(4999);
    expect(changed).toContain('utr');
  });
});
