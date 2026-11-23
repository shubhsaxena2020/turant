## Prioritised fixes for extract.ts (baseline round)

Ranked by how many ASR runs each fix can unblock. Run counts are field errors bucketed `extractor` + `extractor_form`
over the 1440 forced-language runs (see the tables above). Every item is reproducible on the reference text or on the
cached transcripts that are named. The ceiling if all of this lands: **27% -> ~59% of clean runs fully correct**
(hi 75%, en 80%, mr 63%, bn 51%, te 48%, ta 45%, kn 40%). The rest is ASR.

1. **Native number words for bn / ta / te / kn, and the gaps in mr / hi** (amount: 423 fixable errors, plus most time and ID errors). `UNITS` has only Hindi and English words. Bengali পাঁচ, দুই, দশ, পনেরো, কুড়ি, সাতচল্লিশ, Tamil ஐந்து, இரண்டு, பத்து, Telugu ఐదు, రెండు, పది, పదిహేను, నలభై ఏడు, and Kannada ಐದು, ಎರಡು, ಹತ್ತು, ಹದಿನೈದು, ನಲವತ್ತೇಳು are all unknown. Also add:
   - Hundreds: পাঁচশো, ছশো, নশো; ஐநூறு, அறுநூறு, தொள்ளாயிரத்து; వంద, వందల; ನೂರು, ಐನೂರು, ಆರುನೂರು, ಒಂಬೈನೂರ; Marathi पाचशे, सहाशे, नऊशे.
   - Oblique multipliers: Telugu **వేల** and **లక్షల** (only వేలు and లక్ష exist, so "ఐదు వేల రూపాయలు" fails), Kannada **ಸಾವಿರದ**, Tamil **ஆயிரத்து** and **லட்சத்து**.
   - Tamil fused thousands: split on the -ாயிரம் / -ஆயிரம் / -ாயிரத்து suffix, e.g. ஐயாயிரம் 5000, பத்தாயிரம், பன்னிரண்டாயிரத்து ஐநூறு 12500, நாற்பத்தேழாயிரம் 47000.
   - Fractions: সাড়ে, দেড়, আড়াই; ஒன்றரை, இரண்டரை; ఒకటిన్నర, రెండున్నర; ಒಂದೂವರೆ, ಎರಡೂವರೆ. Marathi fused साडेतीन, साडेनऊ, साडेदहा.
   - Missing Hindi tens: सैंतालीस, निन्यानवे, छब्बीस (hi-06, hi-13, hi-24, hi-26). Use a full 1-99 table, plus Hinglish ninyanve and saintalis.
   - Whisper's spellings: धाई (ढाई), देड़ (डेढ़), साड़े / साधे (साढ़े), बारा, पंद्रा, ज्यारा; ಆಯಿದು, ಎಳು, ವಂದು, ಇರಡು; అయ్దు, ఒంటి, తుమ్మిది.

   Measure with `node run_eval.mjs`: per-language amount F1 is currently ta 0.0, te 0.0, kn 2.9, bn 7.1 on ASR.

2. **Do not invent "1000" / "100000" from a lone multiplier.** When the word before হাজার / ಸಾವಿರ / লাখ / ಲಕ್ಷ is an unknown non-Latin word, `buildRun` uses `(current || 1) * mult`. So "পাঁচ হাজার" becomes 1000 and "দুই লাখ" / "ಎರಡು ಲಕ್ಷ" become 100000, at confidence 0.85-0.95 (bn-01..bn-24, kn-02..kn-23, ta-03, ta-11). These are confident wrong values, which is worse than a miss. Only default to 1× when the multiplier starts the run or follows a known "ek" / "one" / "एक", and otherwise abstain.

3. **Digit sequences spoken as native words** (IDs: about 80 fixable errors). Whisper writes digit-by-digit speech as words in te, kn and bn: "నాలుగు సున్నా మూడు రెండు …" (te-14), "ಒಂಬತ್ತು ಎಂಟು ಎಳು ಆರು ಆಯಿದು …" (kn-09), "ছয় এক দুই তিন …" (bn-31). The share of clean ID runs whose digits survive as digits is only bn/te 12%, kn 25%, ta 0%. Once fix 1 lands, add zero words (শূন্য, பூஜ்ஜியம், సున్నా, ಸೊನ್ನೆ, शून्य) and ಡಬಲ್ / ಟ್ರಿಪಲ್ / ডাবল / டபுள் to `REPEAT`. Then `findNumberRuns` builds the sequence.

4. **Digit-run boundaries swallow the next number.**
   - "UTR … 4 3 2, पाँच हज़ार रुपये" (hi-15, mr-14) becomes amount 50000 with no UTR, because the comma is dropped in `tokenize` and the run continues into पाँच हज़ार.
   - The transcript "403218765432 5000 টাকা" (bn-14) becomes a 16-digit run.

   Treat commas and sentence punctuation as run breaks for sequences. Never extend a run that already has 10 or 12 digits with a token followed by a multiplier or currency.

5. **Time phrases** (224 fixable errors).
   - The number words from fix 1 (পনেরো মিনিট, பதினைந்து நிமிடம், పది నిమిషాల, ಹತ್ತು ಗಂಟೆಗೆ).
   - Bengali o'clock words: সাতটায়, দশটায়, নটায়, আড়াইটায়, সাড়ে দশটায়. Only the `\d+টায়` form is handled today, so bn-07 and bn-20 fall back to the 09:00 / 14:00 day-part default and come out confidently wrong.
   - Tamil colloquial நேத்து, இன்னைக்கு, சாயங்காலம், காலைல, ராத்திரி.
   - The two-word Tamil hour unit "மணி நேரத்துக்கு முன்னாடி".
   - Half-hour words: আধ ঘণ্টা, அரை மணி, అరగంట, ಅರ್ಧ ಗಂಟೆ, अर्ध्या तास.
   - "at 9.30" with a dot (en-12, the form Whisper writes) and "11 in the morning" (en-14).
   - When an hour word is present but unparsed, return nothing (or low confidence) rather than the day-part default.

6. **Bank names in every script** (180 fixable errors).
   - Add native keys for PNB, Kotak, Baroda, Canara, Axis, Union, Yes and Indian Bank in bn, ta, te, kn and mr. Marathi uses **बँक**, so 'स्टेट बँक' (mr-21, mr-29) and 'युनियन बँकेतून' miss.
   - Better: match "<name> + any bank word" (ব্যাংক / বাংক / பேங்க் / வங்கி / బ్యాంక్ / బాంక్ / ಬ್ಯಾಂಕ್ / बँक / बैंक).
   - Collapse spaced or dotted acronyms in any script before matching: "S.B.I." (hi-31), "आई सी आई सी आई" (hi-14), "এইচ টিএফসি", "এস্বিআই".
   - Accept close spellings: नैशनल, बड़ादा / बडोदा, अक्सिस, एक्सिस, কানাড়া, and "Canada Bank" for Canara.

7. **Scam keywords** (74 fixable errors).
   - Latin keywords need prefix matching: "blackmailing" misses 'blackmail' because of the word-boundary regex (en-11, on reference text too).
   - Native-script acronyms split by Whisper: केवाई सी / केवाय सी (hi-01, hi-37, mr-35).
   - Loanwords: इन्वेस्टमेंट, ইনভেস্ট, ইনভেস্টমেন্ট, இன்வெஸ்ட், ఇన్వెస్ట్; টেলিগ্রাম, டெலிகிராம், టెలిగ్రామ్; টাস্ক.
   - The Marathi stem गुंतवणु- (the inflected गुंतवणुकीच्या, mr-18).
   - Hindi "पैन कार्ड अपडेट" and "बैंक वाले बनके" (hi-22).
   - Whisper spellings: ब्लाकमेल, AnyDisk, स्कान, மிறட்டல்.

8. **Payment apps** (48 fixable errors, mostly `extractor_form`).
   - The "phone pe" guard only accepts se / app / upi after it. Whisper writes "फोन पे वरून" (mr), "ফোন পে দিয়ে" / "ফোন পেথেকে" (bn), "ఫోన్ పే ద్వారా" (te), "போன்பை மூலமா" (ta). Accept the postpositions वरून, ने, দিয়ে, থেকে, ద్వారా, மூலமா, ಮೂಲಕ.
   - Accept spaced or variant brands: पेटीम, पेटी एम, পেটিম, பேடியம், ಪೇಟಿಯಂ, ಫೋನ್ಪೆ, கூகுள்பே.
   - Fix the false positive in hi-14: "गूगल पे सर्च किया" means "searched on Google".

9. **ID context and spurious numbers.**
   - `ACCOUNT_CTX` is an exact-match set, so inflected or other-script forms miss: অ্যাকাউন্টে, அக்கவுண்ட், అకౌంట్ (bn-19, ta-19 and te-19 fail on reference text).
   - "plus 91 70112 23344" is read as UTR 917011223344 (en-15). Treat the spoken word "plus" like "+".
   - A masked account in an SMS, "A/c XX4321" / "ACXX 4321", becomes a spurious ₹4321 (en-31). Skip numbers right after XX / A/c.

10. **Corrections, negation and false "now".**
    - `parseCorrection('no, the bank was HDFC not SBI')` returns SBI because `preferLast` picks the negated mention (en-38). Prefer the value that is not followed or preceded by not / nahi / नहीं / না / இல்ல / కాదు / ಅಲ್ಲ / नाही.
    - 'ಈಗ' ("now") in "ಈಗ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿದ್ದಾರೆ" ("they are blackmailing now") sets time = now (kn-08). Only accept NOW words in a past-event phrase or as the whole answer.
    - Skip intents need Whisper's spellings: জনিনা, माहित नही, திரியாது.

### ASR-side findings (not fixable in extract.ts)

- **Whisper large-v3-turbo is the bottleneck for bn / ta / te / kn**: CER about 50% on clean TTS speech, and 38-51% of field errors there are pure ASR (bn 38%, te 44%, ta 46%, kn 51%). Typical outputs: "Dead luck takachuleg" for দেড় লাখ টাকা চলে গেছে, ఆయిసియాయి for ICICI, ಸಬೈ for SBI. Evaluate an Indic model (AI4Bharat IndicConformer / IndicWhisper) or the browser recogniser for these locales with this harness. Add a backend by writing transcripts under a new language tag.
- **Always force the language token.** Under auto-detect, 100% of bn / te / kn transcripts came back in the wrong script, at roughly equal accuracy.
- **Hinglish through `<|en|>` is unreliable.** Whisper translates ("Your account is 5,000 rupees …", en-02) or hallucinates ("5,000,000,000,000…", "। । । ।"; en-04, en-13). Decode Hinglish speakers with `<|hi|>`; the extractor already handles the Devanagari output.
- **Pass `hotwords`** (the server supports them): KYC, OTP, UPI, AnyDesk, PhonePe, Paytm, Google Pay and the bank names. Scam type has 168 ASR errors, mostly the acronyms ("के YC", "కేవాయసి", "ಕೈಕ").
- **Babble is the harmful noise:** 13% fully correct at 5 dB babble, against 27% at 5 dB traffic and 27% clean. Speaking rate barely matters (-15%: 23%, +15%: 29%).
- **Read IDs back for confirmation.** Even on clean audio only about 70-75% of hi/en UTR and phone digit strings survive ASR intact ("98765-4321", "601-34567890").

### Caveats

The speech is TTS read speech from 15 neural voices, not panicked humans, so real-world ASR will be worse. The bn / ta / te / mr / kn cases are deliberately parallel (same 40 scenarios, native phrasing), so per-language numbers are comparable. Three expectations are marked `ambiguous`. The ASR / extractor split is heuristic (field oracles plus token ablation; see "Where the errors come from"); spot-check it in the worst-40 list below.
