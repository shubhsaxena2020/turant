// Demo transcripts for the "Try a sample" button (no microphone needed).
// They run through exactly the same extraction and question flow as real speech.
import type { LangCode } from '../lib/extract';
import type { QuestionKey } from '../lib/report';

export const SAMPLE_STORIES: Record<LangCode, string> = {
  // The spec's acceptance sentence, verbatim (Hinglish).
  'hi-IN':
    'Mere account se paanch hazaar rupaye kat gaye, das minute pehle ek aadmi ne bola KYC update karo, SBI ka account hai, UPI ID tha rahul.kyc@ybl',
  'en-IN':
    'Someone sent me a QR code saying I will receive money for my old sofa. I scanned it and 4,999 rupees got debited from my HDFC account through Google Pay about 20 minutes ago. His number was 98765 43210.',
  'bn-IN': 'আমার এসবিআই অ্যাকাউন্ট থেকে ৫০০০ টাকা কেটে গেছে, ১৫ মিনিট আগে একজন KYC আপডেটের জন্য ফোন করেছিল, UPI ID ছিল rahul.kyc@ybl',
  'ta-IN': 'என் SBI கணக்கிலிருந்து 5000 ரூபாய் போய்விட்டது, 10 நிமிடங்களுக்கு முன்பு ஒருவர் KYC அப்டேட் செய்யச் சொன்னார், UPI ID rahul.kyc@ybl',
  'te-IN': 'నా SBI ఖాతా నుండి 5000 రూపాయలు పోయాయి, 10 నిమిషాల క్రితం ఒకరు KYC అప్‌డేట్ చేయమని చెప్పారు, UPI ID rahul.kyc@ybl',
  'mr-IN': 'माझ्या SBI खात्यातून 5000 रुपये कापले गेले, 10 मिनिटांपूर्वी एका माणसाने KYC अपडेट करायला सांगितले, UPI ID rahul.kyc@ybl',
  'kn-IN': 'ನನ್ನ SBI ಖಾತೆಯಿಂದ 5000 ರೂಪಾಯಿ ಕಡಿತವಾಗಿದೆ, 10 ನಿಮಿಷಗಳ ಹಿಂದೆ ಒಬ್ಬರು KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಹೇಳಿದರು, UPI ID rahul.kyc@ybl',
};

/** Sample answers to follow-up questions. The UTR one is a bank SMS read aloud. */
export const SAMPLE_ANSWERS: Partial<Record<QuestionKey, string>> = {
  amount: 'paanch hazaar rupaye',
  time: 'das minute pehle',
  scamType: 'KYC update ke naam pe call aaya tha',
  bank: 'State Bank of India',
  // Amount-free on purpose: the same SMS is used by every language's sample story.
  utr: 'Your A/c XX4321 has been debited via UPI. UPI Ref No 4 5 6 7 8 9 0 1 2 3 4 5. Not you? Call your bank.',
  suspect: 'rahul dot kyc at ybl',
};
