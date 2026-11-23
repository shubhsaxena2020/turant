import { describe, expect, it } from 'vitest';
import { cleanup } from './cleanup';
import { findAmount } from './numbers';
import { findBank } from './bank';

describe('fillers', () => {
  it('drops pure fillers in several languages', () => {
    expect(cleanup('umm basically mere 5000 rupaye kat gaye').text).toBe('mere 5000 rupaye kat gaye');
    expect(cleanup('मतलब, कल शाम को फोन आया').text).toBe('कल शाम को फोन आया');
    expect(cleanup('উম্ম... মানে, গতকাল দুপুরে টাকা গেছে').text).toBe('গতকাল দুপুরে টাকা গেছে');
    expect(cleanup('அதாவது நேற்று மதியம் பணம் போச்சு').text).toBe('நேற்று மதியம் பணம் போச்சு');
    expect(cleanup('అంటే నిన్న డబ్బులు పోయాయి').text).toBe('నిన్న డబ్బులు పోయాయి');
  });
  it('keeps meaningful words that look like fillers inside other words', () => {
    expect(cleanup('Umesh ne paise bheje').text).toBe('Umesh ne paise bheje');
    expect(cleanup('I like this app').text).toBe('I this app'); // "like" is treated as filler: documented trade-off
  });
  it('collapses stutters', () => {
    expect(cleanup('मेरे मेरे पैसे गए').text).toBe('मेरे पैसे गए');
  });
});

describe('self-corrections', () => {
  it('keeps the corrected value and extraction still works', () => {
    const c = cleanup('Bhaiya paanch... nahi nahi chhe hazaar rupaye gaye');
    expect(c.corrected).toBe(true);
    expect(c.text).toBe('chhe hazaar rupaye gaye');
    expect(findAmount(c.text)).toBe(6000);
    const t = cleanup('मेरे खाते से पाँच... नहीं नहीं, छह हज़ार रुपये कट गए');
    expect(findAmount(t.text)).toBe(6000);
    expect(t.text).toBe('छह हज़ार रुपये कट गए');
  });
  it('a bank correction survives cleanup', () => {
    expect(findBank(cleanup('बैंक गलत है, एसबीआई नहीं नहीं, एचडीएफसी था').text)?.key).toBe('hdfc');
  });
});
