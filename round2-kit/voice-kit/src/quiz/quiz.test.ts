import { describe, expect, it } from 'vitest';
import { BANK, SAMPLE_ANSWERS } from './bank';
import { matchAnswer } from './match';
import { qt } from './strings';

describe('question bank is self-consistent', () => {
  for (const q of BANK) {
    it(`${q.id}: every accepted form of the right answer is judged correct`, () => {
      if (q.check.kind === 'mcq') {
        for (const form of q.check.options[q.check.answer]) expect(matchAnswer(q.check, form).verdict, form).toBe('correct');
        // and every wrong option is wrong
        q.check.options.forEach((opt, i) => {
          if (i !== (q.check as { answer: number }).answer) expect(matchAnswer(q.check, opt[0]).verdict, opt[0]).toBe('wrong');
        });
      } else if (q.check.kind === 'number') {
        expect(matchAnswer(q.check, String(q.check.answer)).verdict).toBe('correct');
      } else {
        for (const form of q.check.answers) expect(matchAnswer(q.check, form).verdict, form).toBe('correct');
      }
    });
  }
  it('options shown to the child match the options the matcher knows', () => {
    for (const q of BANK.filter((x) => x.options)) expect(q.options!.length).toBe((q.check as { options: unknown[] }).options.length);
  });
});

describe('sample answers give a mix of outcomes (for the demo)', () => {
  it('right, wrong and skip all occur', () => {
    const verdicts = BANK.map((q) => matchAnswer(q.check, SAMPLE_ANSWERS[q.id]).verdict);
    expect(verdicts).toContain('correct');
    expect(verdicts).toContain('wrong');
    expect(verdicts).toContain('skip');
  });
});

describe('copy', () => {
  it('fills placeholders in every language', () => {
    for (const l of ['hi', 'bho', 'en'] as const) expect(qt(l, 'doneTitle', { t: 3, c: 5 })).toMatch(/3.*5|5.*3/);
  });
});
