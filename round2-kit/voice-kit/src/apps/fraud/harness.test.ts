// Regressions found by harness/ (run_eval.mjs --extractor kit): reference corpus and Whisper transcripts.
import { describe, expect, it } from 'vitest';
import cfg from './config';
import { extractAll } from '../../lib/slots';

const NOW = new Date('2026-11-21T12:00:00+05:30');
const x = (t: string, o = {}) => extractAll(cfg as never, t, { now: NOW, ...o } as never) as Record<string, { value: unknown } | undefined>;

describe('fraud app: harness regressions', () => {
  it('phone read out with a pause, in digits or words', () => {
    expect(x('जिस नंबर से फोन आया था वो है 9 8 7 6 5... 4 3 2 1 0, उसने बोला').suspectPhone?.value).toBe('9876543210');
    expect(x('His number was nine eight seven six five, four three two one zero.').suspectPhone?.value).toBe('9876543210');
    expect(x('uh the guy called from 9 8 1 1 1, 2 2 2 3 3 and said').suspectPhone?.value).toBe('9811122233');
    expect(x('The number that called me was plus 91 70112 23344').suspectPhone?.value).toBe('7011223344');
  });
  it('native-script read-outs and account context', () => {
    expect(x('ওর নম্বর নয় নয় আট আট সাত সাত ছয় ছয় পাঁচ পাঁচ').suspectPhone?.value).toBe('9988776655');
    expect(x('ज्या खात्यात पैसे गेले त्याचा नंबर 5 0 1 0 0 2 3 4 5 6 7 8 1 2').suspectAccount?.value).toBe('50100234567812');
    expect(x('பணம் போன அக்கவுண்ட் நம்பர் 5 0 1 0 0 2 3 4 5 6 7 8 1 2').suspectAccount?.value).toBe('50100234567812');
  });
  it('scam type in every language, incl. ASR spellings', () => {
    expect(x('టెలిగ్రామ్‌లో పార్ట్ టైమ్ జాబ్ టాస్క్‌లు ఇచ్చారు, తర్వాత ఇన్వెస్ట్ చేయమన్నారు').scamType?.value).toBe('investment_task');
    expect(x('அப்புறம் இன்விஸ்ட் பண்ண சொன்னாங்க').scamType?.value).toBe('investment_task');
    expect(x('बोला पैन कार्ड अपडेट करो वरना अकाउंट ब्लॉक हो जाएगा').scamType?.value).toBe('fake_kyc');
  });
  it('false positives', () => {
    expect(x('कस्टमर केयर का नंबर गूगल पे सर्च किया था').paymentApp).toBeUndefined();
    expect(x('गूगल पे से पाँच हज़ार भेजे').paymentApp?.value).toBe('Google Pay');
    expect(x('ರೆಕಾರ್ಡ್ ಮಾಡಿ ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ').time).toBeUndefined();
  });
});
