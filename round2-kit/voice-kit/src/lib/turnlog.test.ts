import { beforeEach, describe, expect, it, vi } from 'vitest';

const store: Record<string, string> = {};
vi.stubGlobal('localStorage', {
  getItem: (k: string) => store[k] ?? null,
  setItem: (k: string, v: string) => (store[k] = v),
  removeItem: (k: string) => delete store[k],
});

const { exportCases, logConfirmed, logTurn, markCorrected, turnStats } = await import('./turnlog');

describe('turn log -> harness cases', () => {
  beforeEach(() => Object.keys(store).forEach((k) => delete store[k]));

  it('a confirmed story becomes a user-confirmed case with corrections recorded', () => {
    logTurn({ app: 'fraud', entryId: 'e1', lang: 'hi-IN', kind: 'story', via: 'voice', transcript: 'umm mere paanch hazaar rupaye kat gaye das minute pehle', asrConfidence: 0.8, extracted: { amount: 5000 }, ms: 12 });
    markCorrected('e1', ['bank']);
    const told = Date.now();
    logConfirmed({ id: 'fraud' } as never, {
      id: 'e1',
      lang: 'hi-IN',
      fields: { amount: { value: 5000 }, time: { value: new Date(told - 10 * 60000).toISOString() }, bank: { value: 'HDFC Bank' } },
    });
    const lines = exportCases('fraud').trim().split('\n').map((l) => JSON.parse(l));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatchObject({ lang: 'hi', kind: 'story', source: 'user-confirmed', corrected: ['bank'], expected: { amount: 5000, bank: 'HDFC Bank' } });
    expect(Math.abs(lines[0].expected.time.ago - 10)).toBeLessThanOrEqual(1);
    expect(lines[0].text).toContain('paanch hazaar');
    expect(turnStats('fraud')).toEqual({ turns: 1, confirmed: 1, corrected: 1 });
  });

  it('turns keep a cleaned transcript (fillers removed)', () => {
    logTurn({ app: 'fraud', entryId: 'e2', lang: 'hi-IN', kind: 'story', via: 'voice', transcript: 'umm basically SBI se paise gaye', extracted: {}, ms: 1 });
    const saved = JSON.parse(store['voicekit.turnlog.v1']);
    expect(saved.turns[0].cleaned).toBe('SBI se paise gaye');
    expect(saved.turns[0].removed.length).toBeGreaterThan(0);
  });
});
