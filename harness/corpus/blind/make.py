"""Blind set: new sentences, written 24 Nov 2026 after tuning round 29. Never tune on these.
Score once per change to measure generalisation to unseen wording (the held-out voice split only
changes the voice, not the sentence). Writes corpus/blind/<lang>.jsonl; then
  node corpus/build.mjs --src blind --out blind.jsonl
"""
import json
import os

S, AMT, TIM, UTR, SUS, BANK, COR, SCAM = "story", "answer:amount", "answer:time", "answer:utr", "answer:suspect", "answer:bank", "correction", "answer:scamType"
D = lambda day, at: {"day": day, "at": at}
A = lambda m: {"ago": m}

CASES = {
    "hi": [
        (S, "मेरे बेटे के फोन पर एक लिंक आया, उसने क्लिक किया और बैंक ऑफ बड़ौदा के खाते से बारह हज़ार पाँच सौ रुपये कट गए, आधा घंटा पहले", {"amount": 12500, "time": A(30), "bank": "bob"}),
        (S, "किसी ने बोला आपकी लॉटरी लगी है, फीस भेजो, मैंने पेटीएम से 2,999 रुपये भेज दिए कल रात नौ बजे", {"amount": 2999, "paymentApp": "paytm", "time": D(-1, "21:00")}),
        (S, "गलती से ओटीपी बता दिया, कोटक बैंक से पच्चीस हज़ार निकल गए, अभी पंद्रह मिनट हुए", {"amount": 25000, "scamType": "otp_shared", "bank": "kotak", "time": A(15)}),
        (S, "एक लड़का बोला गलती से आपको पैसे भेज दिए, वापस करो, मैंने गूगल पे से सात सौ पचास रुपये लौटा दिए, सुबह दस बजे", {"amount": 750, "scamType": "wrong_transfer", "paymentApp": "gpay", "time": D(0, "10:00")}),
        (S, "टेलीग्राम पर टास्क वाला काम था, पहले मुनाफा दिया फिर एक लाख बीस हज़ार रुपये डलवा लिए", {"amount": 120000, "scamType": "investment_task"}),
        (AMT, "लगभग अठारह सौ रुपये", {"amount": 1800}),
        (TIM, "आज सुबह साढ़े आठ बजे", {"time": D(0, "08:30")}),
        (UTR, "यूटीआर नंबर है 5 1 2 3 4 4 5 6 6 7 8 9", {"utr": "512344566789"}),
        (SUS, "उसका नंबर नौ आठ एक शून्य दो दो तीन चार पाँच छह", {"suspectPhone": "9810223456"}),
        (BANK, "यूनियन बैंक", {"bank": "union"}),
        (COR, "नहीं, चार हज़ार नहीं, चौदह हज़ार गए थे", {"amount": 14000}),
        (SCAM, "उसने क्यूआर कोड स्कैन करवाया था", {"scamType": "qr_scan"}),
    ],
    "en": [
        (S, "Someone called pretending to be Axis Bank customer care, I installed the app he said and lost 48,000 rupees about 2 hours ago", {"amount": 48000, "scamType": "fake_customer_care", "bank": "axis", "time": A(120)}),
        (S, "I scanned a QR code to receive money for my old sofa and instead 9,500 got debited from my PhonePe", {"amount": 9500, "scamType": "qr_scan", "paymentApp": "phonepe"}),
        (S, "This morning at 6:45 I got a message saying my KYC is pending, I clicked it and my ICICI account lost one lakh", {"amount": 100000, "scamType": "fake_kyc", "bank": "icici", "time": D(0, "06:45")}),
        (S, "My father told the OTP to a caller yesterday evening at 8, twenty two thousand rupees gone from his Canara Bank account", {"amount": 22000, "scamType": "otp_shared", "bank": "canara", "time": D(-1, "20:00")}),
        (AMT, "it was fifteen hundred", {"amount": 1500}),
        (TIM, "just now, maybe five minutes back", {"time": A(5)}),
        (UTR, "UTR is 3 0 9 8 7 6 5 4 3 2 1 0", {"utr": "309876543210"}),
        (SUS, "the UPI ID was refund dot help at okaxis", {"suspectUpi": "refund.help@okaxis"}),
        (SUS, "he called from 8 0 0 0 1 2 3 4 5 6", {"suspectPhone": "8000123456"}),
        (COR, "sorry, not Google Pay, it was Paytm", {"paymentApp": "paytm"}),
        (S, "A guy on Instagram threatened to leak my photos, I paid him 3000 on Google Pay at 11 last night", {"amount": 3000, "scamType": "sextortion", "paymentApp": "gpay", "time": D(-1, "23:00")}),
        (BANK, "Bank of India", {"bank": "boi"}),
    ],
    "bn": [
        (S, "কেউ ফোন করে বলল কেওয়াইসি আপডেট করতে হবে, তারপর আমার এসবিআই অ্যাকাউন্ট থেকে সাত হাজার টাকা কেটে নিল, আধ ঘণ্টা আগে", {"amount": 7000, "scamType": "fake_kyc", "bank": "sbi", "time": A(30)}),
        (S, "ওটিপি বলে দিয়েছিলাম, পনেরো হাজার টাকা চলে গেছে, ফোনপে থেকে", {"amount": 15000, "scamType": "otp_shared", "paymentApp": "phonepe"}),
        (S, "গতকাল সন্ধ্যা সাতটায় একটা কিউআর কোড স্ক্যান করলাম, দুই হাজার পাঁচশো টাকা কেটে গেল", {"amount": 2500, "scamType": "qr_scan", "time": D(-1, "19:00")}),
        (S, "টেলিগ্রামে টাস্ক দিয়ে এক লাখ টাকা ইনভেস্ট করিয়েছে, বলেছিল ডাবল হবে", {"amount": 100000, "scamType": "investment_task"}),
        (AMT, "আট হাজার টাকা", {"amount": 8000}),
        (TIM, "আজ সকাল দশটায়", {"time": D(0, "10:00")}),
        (UTR, "৪ ১ ২ ৩ ৫ ৬ ৭ ৮ ৯ ০ ১ ২", {"utr": "412356789012"}),
        (SUS, "নম্বরটা হল ৯ ৮ ৩ ০ ১ ২ ৪ ৫ ৬ ৭", {"suspectPhone": "9830124567"}),
        (BANK, "পাঞ্জাব ন্যাশনাল ব্যাংক", {"bank": "pnb"}),
        (COR, "না না, তিন হাজার নয়, তেরো হাজার", {"amount": 13000}),
        (S, "ভুল করে টাকা পাঠিয়েছি বলে একজন ফেরত চাইল, আমি গুগল পে থেকে বারোশো টাকা দিয়ে দিলাম", {"amount": 1200, "scamType": "wrong_transfer", "paymentApp": "gpay"}),
        (SUS, "ইউপিআই আইডি ছিল lucky dot win at ybl", {"suspectUpi": "lucky.win@ybl"}),
    ],
    "ta": [
        (S, "யாரோ போன் பண்ணி கேஒய்சி அப்டேட் பண்ணணும்னு சொன்னாங்க, என் இந்தியன் பேங்க் அக்கவுண்ட்ல இருந்து பத்தாயிரம் ரூபாய் போச்சு", {"amount": 10000, "scamType": "fake_kyc", "bank": "indian"}),
        (S, "ஓடிபி சொல்லிட்டேன், இருபதாயிரம் ரூபாய் போயிடுச்சு, ஒரு மணி நேரம் முன்னாடி", {"amount": 20000, "scamType": "otp_shared", "time": A(60)}),
        (S, "நேத்து ராத்திரி எட்டு மணிக்கு க்யூஆர் கோட் ஸ்கேன் பண்ணேன், போன்பே ல மூவாயிரம் ரூபாய் கட் ஆச்சு", {"amount": 3000, "scamType": "qr_scan", "time": D(-1, "20:00"), "paymentApp": "phonepe"}),
        (S, "டெலிகிராம்ல டாஸ்க் பண்ணா லாபம்னு சொல்லி ஐம்பதாயிரம் ரூபாய் வாங்கிட்டாங்க", {"amount": 50000, "scamType": "investment_task"}),
        (AMT, "ஆயிரத்து ஐநூறு ரூபாய்", {"amount": 1500}),
        (TIM, "இப்போதான், பத்து நிமிஷம் முன்னாடி", {"time": A(10)}),
        (UTR, "7 7 1 2 3 4 5 6 8 9 0 1", {"utr": "771234568901"}),
        (SUS, "அவன் நம்பர் 9 4 4 3 2 1 0 9 8 7", {"suspectPhone": "9443210987"}),
        (BANK, "கனரா பேங்க்", {"bank": "canara"}),
        (COR, "இல்ல, ஐயாயிரம் இல்ல, ஆறாயிரத்து ஐநூறு", {"amount": 6500}),
        (S, "தப்பா பணம் அனுப்பிட்டேன்னு ஒருத்தர் சொன்னார், நான் ஜிபே மூலமா எண்ணூறு ரூபாய் திருப்பி அனுப்பினேன்", {"amount": 800, "scamType": "wrong_transfer", "paymentApp": "gpay"}),
        (SUS, "யுபிஐ ஐடி cash dot back at paytm", {"suspectUpi": "cash.back@paytm"}),
    ],
    "te": [
        (S, "ఎవరో ఫోన్ చేసి కేవైసీ అప్డేట్ చేయాలని చెప్పారు, నా ఎస్బిఐ ఖాతా నుంచి ఎనిమిది వేల రూపాయలు పోయాయి", {"amount": 8000, "scamType": "fake_kyc", "bank": "sbi"}),
        (S, "ఓటీపీ చెప్పేశాను, ముప్పై వేల రూపాయలు కట్ అయ్యాయి, అరగంట క్రితం", {"amount": 30000, "scamType": "otp_shared", "time": A(30)}),
        (S, "నిన్న సాయంత్రం ఆరు గంటలకు క్యూఆర్ కోడ్ స్కాన్ చేశాను, ఫోన్‌పే లో రెండు వేల రూపాయలు పోయాయి", {"amount": 2000, "scamType": "qr_scan", "time": D(-1, "18:00"), "paymentApp": "phonepe"}),
        (S, "టెలిగ్రామ్ లో టాస్క్ అని చెప్పి డెబ్బై వేల రూపాయలు తీసుకున్నారు", {"amount": 70000, "scamType": "investment_task"}),
        (AMT, "పదిహేను వందల రూపాయలు", {"amount": 1500}),
        (TIM, "ఈ రోజు ఉదయం తొమ్మిది గంటలకు", {"time": D(0, "09:00")}),
        (UTR, "3 2 1 4 5 6 7 8 9 0 1 2", {"utr": "321456789012"}),
        (SUS, "అతని నంబర్ 7 8 9 0 1 2 3 4 5 6", {"suspectPhone": "7890123456"}),
        (BANK, "హెచ్‌డీఎఫ్‌సీ బ్యాంక్", {"bank": "hdfc"}),
        (COR, "కాదు, నాలుగు వేలు కాదు, నాలుగు వేల ఐదు వందలు", {"amount": 4500}),
        (S, "పొరపాటున డబ్బులు పంపానని ఒకతను అడిగాడు, నేను గూగుల్ పే లో తొమ్మిది వందలు తిరిగి పంపాను", {"amount": 900, "scamType": "wrong_transfer", "paymentApp": "gpay"}),
        (SUS, "యూపీఐ ఐడీ gift dot card at ybl", {"suspectUpi": "gift.card@ybl"}),
    ],
    "mr": [
        (S, "कोणीतरी फोन करून केवायसी अपडेट करायला सांगितलं, माझ्या एसबीआय खात्यातून सहा हजार रुपये गेले", {"amount": 6000, "scamType": "fake_kyc", "bank": "sbi"}),
        (S, "चुकून ओटीपी सांगितला, पंचवीस हजार रुपये गेले, अर्ध्या तासापूर्वी", {"amount": 25000, "scamType": "otp_shared", "time": A(30)}),
        (S, "काल रात्री आठ वाजता क्यूआर कोड स्कॅन केला, फोनपे वरून तीन हजार रुपये कापले गेले", {"amount": 3000, "scamType": "qr_scan", "time": D(-1, "20:00"), "paymentApp": "phonepe"}),
        (S, "टेलिग्रामवर टास्कचं काम सांगून चाळीस हजार रुपये घेतले", {"amount": 40000, "scamType": "investment_task"}),
        (AMT, "साडे चार हजार", {"amount": 4500}),
        (TIM, "आज सकाळी अकरा वाजता", {"time": D(0, "11:00")}),
        (UTR, "6 5 4 3 2 1 0 9 8 7 6 5", {"utr": "654321098765"}),
        (SUS, "त्याचा नंबर 9 8 2 2 0 1 2 3 4 5", {"suspectPhone": "9822012345"}),
        (BANK, "बँक ऑफ बडोदा", {"bank": "bob"}),
        (COR, "नाही, दोन हजार नाही, बारा हजार", {"amount": 12000}),
        (S, "चुकून पैसे पाठवले म्हणून एकाने परत मागितले, मी गुगल पे ने सातशे रुपये परत पाठवले", {"amount": 700, "scamType": "wrong_transfer", "paymentApp": "gpay"}),
        (SUS, "यूपीआय आयडी help dot desk at ybl", {"suspectUpi": "help.desk@ybl"}),
    ],
    "kn": [
        (S, "ಯಾರೋ ಫೋನ್ ಮಾಡಿ ಕೆವೈಸಿ ಅಪ್ಡೇಟ್ ಮಾಡಬೇಕು ಅಂದರು, ನನ್ನ ಕೆನರಾ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದ ಐದು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು", {"amount": 5000, "scamType": "fake_kyc", "bank": "canara"}),
        (S, "ಒಟಿಪಿ ಹೇಳಿಬಿಟ್ಟೆ, ಇಪ್ಪತ್ತು ಸಾವಿರ ರೂಪಾಯಿ ಹೋಯಿತು, ಅರ್ಧ ಗಂಟೆ ಹಿಂದೆ", {"amount": 20000, "scamType": "otp_shared", "time": A(30)}),
        (S, "ನಿನ್ನೆ ರಾತ್ರಿ ಒಂಬತ್ತು ಗಂಟೆಗೆ ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿದೆ, ಫೋನ್‌ಪೇ ನಲ್ಲಿ ಎರಡು ಸಾವಿರ ರೂಪಾಯಿ ಕಟ್ ಆಯಿತು", {"amount": 2000, "scamType": "qr_scan", "time": D(-1, "21:00"), "paymentApp": "phonepe"}),
        (S, "ಟೆಲಿಗ್ರಾಮ್ ನಲ್ಲಿ ಟಾಸ್ಕ್ ಅಂತ ಹೇಳಿ ಅರವತ್ತು ಸಾವಿರ ರೂಪಾಯಿ ತಗೊಂಡರು", {"amount": 60000, "scamType": "investment_task"}),
        (AMT, "ಸಾವಿರದ ಐನೂರು ರೂಪಾಯಿ", {"amount": 1500}),
        (TIM, "ಈಗಷ್ಟೇ, ಹತ್ತು ನಿಮಿಷದ ಹಿಂದೆ", {"time": A(10)}),
        (UTR, "8 1 2 3 4 5 6 7 9 0 1 2", {"utr": "812345679012"}),
        (SUS, "ಅವನ ನಂಬರ್ 9 9 0 0 1 2 3 4 5 6", {"suspectPhone": "9900123456"}),
        (BANK, "ಐಸಿಐಸಿಐ ಬ್ಯಾಂಕ್", {"bank": "icici"}),
        (COR, "ಇಲ್ಲ, ಮೂರು ಸಾವಿರ ಅಲ್ಲ, ಮೂವತ್ತು ಸಾವಿರ", {"amount": 30000}),
        (S, "ತಪ್ಪಾಗಿ ಹಣ ಕಳಿಸಿದೆ ಅಂತ ಒಬ್ಬರು ಕೇಳಿದರು, ನಾನು ಗೂಗಲ್ ಪೇ ಇಂದ ಆರುನೂರು ರೂಪಾಯಿ ವಾಪಸ್ ಕಳಿಸಿದೆ", {"amount": 600, "scamType": "wrong_transfer", "paymentApp": "gpay"}),
        (SUS, "ಯುಪಿಐ ಐಡಿ bonus dot pay at ybl", {"suspectUpi": "bonus.pay@ybl"}),
    ],
}

here = os.path.dirname(os.path.abspath(__file__))
for lang, rows in CASES.items():
    with open(os.path.join(here, f"{lang}.jsonl"), "w", encoding="utf-8", newline="\n") as fh:
        for i, (kind, text, exp) in enumerate(rows, 1):
            c = {"id": f"{lang}-b{i:02d}", "lang": lang, "kind": kind, "text": text, "expected": exp, "tags": ["blind"]}
            if kind.startswith("answer:"):
                c["hint"] = kind[7:]
            fh.write(json.dumps(c, ensure_ascii=False) + "\n")
print("ok")
