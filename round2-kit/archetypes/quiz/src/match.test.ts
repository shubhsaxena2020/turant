import { describe, expect, it } from 'vitest';
import { answerSimilarity, matchAnswer, parseNumber, pickOption, romanize, skeleton, type QuizQuestion } from './match';

const capital: QuizQuestion = {
  kind: 'mcq',
  options: [['Mumbai', 'मुंबई', 'Bombay'], ['New Delhi', 'Delhi', 'दिल्ली', 'नई दिल्ली'], ['Kolkata', 'कोलकाता', 'Calcutta'], ['Chennai', 'चेन्नई']],
  answer: 1,
};
const plants: QuizQuestion = { kind: 'text', answers: ['photosynthesis', 'प्रकाश संश्लेषण', 'फोटोसिंथेसिस'] };
const sum: QuizQuestion = { kind: 'number', answer: 25 };

describe('normalisation', () => {
  it('romanizes Devanagari roughly', () => {
    expect(romanize('फोटोसिंथेसिस')).toBe('fotosinthesis');
    expect(romanize('पाँच')).toBe('panch');
    expect(romanize('दिल्ली')).toBe('dilli');
  });
  it('skeletons survive spelling drift', () => {
    expect(skeleton('photosynthesis')).toBe(skeleton('फोटोसिंथेसिस'));
    expect(skeleton('Calcutta')).toBe(skeleton('kalkatta'));
  });
});

describe('numbers', () => {
  it('reads digits, native digits and Hindi/English words', () => {
    expect(parseNumber('25')).toBe(25);
    expect(parseNumber('२५')).toBe(25);
    expect(parseNumber('pachchees')).toBe(25);
    expect(parseNumber('पच्चीस')).toBe(25);
    expect(parseNumber('twenty five')).toBe(25);
    expect(parseNumber('teen sau')).toBe(300);
    expect(parseNumber('do sau pachaas')).toBe(250);
  });
  it('number answers', () => {
    expect(matchAnswer(sum, 'उत्तर पच्चीस है').verdict).toBe('correct');
    expect(matchAnswer(sum, 'chaubees').verdict).toBe('wrong');
    expect(matchAnswer(sum, 'hmm').verdict).toBe('unclear');
  });
});

describe('mcq', () => {
  it('ordinals in Hindi, Bhojpuri and English', () => {
    expect(pickOption('doosra wala', 4)).toBe(1);
    expect(pickOption('दुसरका', 4)).toBe(undefined); // unknown dialect form → falls through to text matching
    expect(pickOption('dusarka', 4)).toBe(1);
    expect(pickOption('हमार जवाब तीसरा', 4)).toBe(2);
    expect(pickOption('option B', 4)).toBe(1);
    expect(pickOption('B', 4)).toBe(1);
  });
  it('matches option text across scripts', () => {
    expect(matchAnswer(capital, 'नई दिल्ली').verdict).toBe('correct');
    expect(matchAnswer(capital, 'mujhe lagta hai delhi hai').verdict).toBe('correct');
    expect(matchAnswer(capital, 'कोलकाता').verdict).toBe('wrong');
    expect(matchAnswer(capital, 'pahila')).toMatchObject({ verdict: 'wrong', chosen: 0 });
    expect(matchAnswer(capital, 'दूसरा')).toMatchObject({ verdict: 'correct', chosen: 1 });
  });
  it('a bare number can pick an option', () => {
    expect(matchAnswer(capital, 'do')).toMatchObject({ verdict: 'correct', chosen: 1 });
  });
  it('ambiguous speech is unclear, not wrong', () => {
    expect(matchAnswer(capital, 'hmm haan woh').verdict).toBe('unclear');
  });
});

describe('text answers', () => {
  it('accepts English said in Devanagari and vice versa', () => {
    expect(matchAnswer(plants, 'फोटोसिंथेसिस').verdict).toBe('correct');
    expect(matchAnswer(plants, 'iska jawab photo synthesis hai').verdict).toBe('correct');
    expect(matchAnswer(plants, 'प्रकाश संश्लेषण').verdict).toBe('correct');
    expect(matchAnswer(plants, 'respiration').verdict).toBe('wrong');
  });
  it('similarity is high for small ASR drift', () => {
    expect(answerSimilarity('fotosinthesis', 'photosynthesis')).toBeGreaterThan(0.8);
  });
});

describe('intents', () => {
  it('repeat and skip in several languages', () => {
    expect(matchAnswer(capital, 'phir se bolo').verdict).toBe('repeat');
    expect(matchAnswer(capital, 'फेर से').verdict).toBe('repeat');
    expect(matchAnswer(capital, 'pata nahi').verdict).toBe('skip');
    expect(matchAnswer(capital, 'नइखे पता').verdict).toBe('skip');
    expect(matchAnswer(capital, 'জানি না').verdict).toBe('skip');
  });
});
