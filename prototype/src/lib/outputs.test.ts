import { describe, expect, it } from 'vitest';
import { extractFields } from './extract';
import { amountInWords, formatINR, groupDigits, maskAccount, spokenDigits } from './format';
import {
  build1930Script,
  buildBankMessage,
  buildComplaintText,
  buildPortalDescription,
  PORTAL_BANNED,
  buildFamilyMessage,
  buildSpokenSummary,
  displayValue,
  whatsappLink,
} from './outputs';
import { mergeExtraction, needsPoliceVisit, newReport, type Report } from './report';
import { SAMPLE_STORIES } from '../i18n/samples';
import { STRINGS, t } from '../i18n/strings';

const NOW = new Date(2026, 10, 21, 12, 0, 0);

function sampleReport(): Report {
  const r = newReport('hi-IN', { now: NOW });
  const text = SAMPLE_STORIES['hi-IN'];
  r.turns = [text];
  r.fields = mergeExtraction({}, extractFields(text, { now: NOW }), { source: 'voice', mode: 'story' }).fields;
  r.fields.utr = { value: '456789012345', confidence: 0.95, source: 'voice' };
  r.fields.suspectAccount = { value: '50100234567812', confidence: 0.85, source: 'voice' };
  return r;
}

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
  const r = sampleReport();

  it('builds a 4-line 1930 script in Hindi', () => {
    const lines = build1930Script(r, 'hi-IN', { now: NOW });
    expect(lines).toHaveLength(4);
    expect(lines[0]).toContain('₹5,000');
    expect(lines[0]).toContain('State Bank of India (SBI)');
    expect(lines[0]).toMatch(/[ऀ-ॿ]/); // Devanagari
    expect(lines[1]).toContain('नकली KYC');
    expect(lines[2]).toContain('4567 8901 2345');
    expect(lines[3]).toContain('rahul.kyc@ybl');
    expect(lines.join(' ')).not.toContain('50100234567812');
  });

  it('speaks the UTR digit by digit', () => {
    const lines = build1930Script(r, 'hi-IN', { now: NOW, spoken: true });
    expect(lines[2]).toContain('4 5 6 7, 8 9 0 1, 2 3 4 5');
  });

  it('builds scripts in every language', () => {
    for (const lang of Object.keys(STRINGS) as Report['lang'][]) {
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
    expect(description.length).toBeGreaterThan(200); // portal minimum
  });

  it('builds a bank message', () => {
    const msg = buildBankMessage(r);
    expect(msg).toContain('State Bank of India (SBI)');
    expect(msg).toContain('UTR / Transaction ID: 456789012345');
    expect(msg).toContain('Block my UPI');
    expect(msg).not.toContain('50100234567812');
  });

  it('builds a WhatsApp link', () => {
    const link = whatsappLink(buildFamilyMessage(r, 'hi-IN'));
    expect(link.startsWith('https://wa.me/?text=')).toBe(true);
    expect(decodeURIComponent(link.split('text=')[1])).toContain('₹5,000');
  });

  it('builds a spoken summary with grouped digits', () => {
    const s = buildSpokenSummary(r, 'hi-IN', NOW);
    expect(s).toContain('4 5 6 7, 8 9 0 1, 2 3 4 5');
    expect(s).toContain(t('hi-IN', 'isThisRight'));
  });

  it('shows the account masked on cards', () => {
    expect(displayValue('suspectAccount', r.fields, 'hi-IN', NOW)).toBe('XXXX7812');
  });

  it('works with missing fields', () => {
    const empty = newReport('en-IN', { now: NOW });
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
  });
});

describe('translations', () => {
  it('falls back to English for missing keys', () => {
    expect(t('ta-IN', 'deleteAll')).toBe('Delete all');
  });
  it('every language has the key screen strings and spoken questions', () => {
    const keys = ['homeMic', 'alertStrip', 'sorryRetry', 'q_amount', 'q_time', 'q_scamType', 'q_bank', 'q_utr', 'q_suspect', 'reviewTitle', 'actionTitle', 'script1', 'check_otp'] as const;
    for (const [lang, s] of Object.entries(STRINGS)) {
      for (const k of keys) expect(s[k], `${lang}.${k}`).toBeTruthy();
    }
  });
});

describe('portal description', () => {
  it('is at least 200 chars, has no banned characters and keeps UPI IDs out', () => {
    const d = buildPortalDescription(sampleReport());
    expect(d.length).toBeGreaterThanOrEqual(200);
    expect(d).not.toMatch(PORTAL_BANNED);
    expect(d).not.toContain('@');
    expect(d).toContain('456789012345');
  });
  it('still reaches 200 chars when fields are missing', () => {
    const d = buildPortalDescription(newReport('en-IN', { now: NOW }));
    expect(d.length).toBeGreaterThanOrEqual(200);
    expect(d).not.toMatch(PORTAL_BANNED);
  });
});
