import { describe, expect, it } from 'vitest';
import { cleanup, marathiRoman, spokenDigits, unifyScript } from './cleanup';
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

describe('unifyScript', () => {
  it('reads Kannada letters as Telugu once Telugu is present', () => {
    expect(unifyScript('నా అకాంట్ నంದಿ 5000 రೂಪಾಯలు')).toBe('నా అకాంట్ నంది 5000 రూపాయలు');
    expect(findAmount(unifyScript('నా అకాంట్ నంದಿ 5000 రೂಪಾಯలు పోయాయి'))).toBe(5000);
  });
  it('leaves Kannada text alone', () => {
    expect(unifyScript('ಐದು ಸಾವಿರ ರೂಪಾಯಿ')).toBe('ಐದು ಸಾವಿರ ರೂಪಾಯಿ');
  });
});

describe('spokenDigits', () => {
  it('expands double / triple', () => {
    expect(spokenDigits('triple 0 and double 9')).toBe('0 0 0 and 9 9');
    expect(spokenDigits('double four three')).toBe('four four three');
    expect(spokenDigits('9 double 8754321')).toBe('9 88754321');
  });
  it('turns a clock group inside a read-out into digits, but keeps real times', () => {
    expect(spokenDigits('plus 9 1 07:01 to 2344')).toBe('plus 9 1 701 to 2344');
    expect(spokenDigits('account number 05:01 00234567812')).toBe('account number 501 00234567812');
    expect(spokenDigits('UTR is 03:09 876')).toBe('UTR is 309 876');
    expect(spokenDigits('yesterday at 07:00')).toBe('yesterday at 07:00');
    expect(spokenDigits('kal shaam 7:30 baje')).toBe('kal shaam 7:30 baje');
  });
});

describe('marathiRoman (Marathi in Latin letters, as the in-page Whisper writes it)', () => {
  it('digits, hundreds and 99', () => {
    expect(marathiRoman("saat shoony ek ek don't don't tin tin")).toBe('saat shoony ek ek don don tin tin');
    expect(marathiRoman('aath saat saahab paanch')).toBe('aath saat saha paanch');
    expect(marathiRoman('chaar hazaar nau se navaayant nau')).toBe('chaar hazaar nau sau ninyanve');
    expect(marathiRoman('ek hazaar donashahar rupe')).toBe('ek hazaar don sau rupe');
  });
  it('clock, ago, apps', () => {
    expect(marathiRoman('kaal raatri dahaavaastha')).toBe('kaal raatri dahaa vaajata');
    expect(marathiRoman("paathavle, don'taasaanpurvi.")).toBe('paathavle, don taasaanpurvi.');
    expect(marathiRoman('bis minute aappur bhi')).toBe('bis minute purvi');
    expect(marathiRoman('kal doopaari adhik vaajata phone par varun')).toBe('kal doopaari saadhe don vaajata PhonePe varun');
  });
});
