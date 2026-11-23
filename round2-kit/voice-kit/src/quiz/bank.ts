// Question bank for the spoken quiz (Patna brief). Hindi text is used for both Hindi and
// Bhojpuri (Devanagari); English has its own text. Every question lists the spoken forms a
// child might use, in both scripts, so the matcher can accept "नई दिल्ली" or "new delhi".
import type { QuizQuestion } from './match';

export type QuizLang = 'hi' | 'bho' | 'en';
export type Topic = 'maths' | 'science' | 'gk';

export interface Q {
  id: string;
  topic: Topic;
  /** question text */
  hi: string;
  en: string;
  /** for MCQ: options as [hindi label, english label, ...extra accepted spellings] */
  options?: string[][];
  /** the matcher's question (MCQ / number / text) */
  check: QuizQuestion;
  /** the right answer to show/say, per language */
  answer: { hi: string; en: string };
  /** one-line why, per language */
  why: { hi: string; en: string };
}

export const TOPICS: { id: Topic; hi: string; bho: string; en: string; emoji: string }[] = [
  { id: 'maths', hi: 'गणित', bho: 'गणित', en: 'Maths', emoji: '➕' },
  { id: 'science', hi: 'विज्ञान', bho: 'विज्ञान', en: 'Science', emoji: '🌱' },
  { id: 'gk', hi: 'सामान्य ज्ञान', bho: 'आम जानकारी', en: 'General knowledge', emoji: '🌏' },
];

const mcq = (options: string[][], answer: number): QuizQuestion => ({ kind: 'mcq', options, answer });

export const BANK: Q[] = [
  // ---- maths (spoken numbers) ----
  { id: 'm1', topic: 'maths', hi: '7 और 8 को जोड़ें तो कितना होगा?', en: 'What is 7 plus 8?', check: { kind: 'number', answer: 15 }, answer: { hi: 'पंद्रह (15)', en: 'fifteen (15)' }, why: { hi: '7 में 8 जोड़ने पर 15 होता है।', en: '7 and 8 together make 15.' } },
  { id: 'm2', topic: 'maths', hi: '12 में से 5 घटाएँ तो कितना बचेगा?', en: 'What is 12 minus 5?', check: { kind: 'number', answer: 7 }, answer: { hi: 'सात (7)', en: 'seven (7)' }, why: { hi: '12 में से 5 हटाने पर 7 बचते हैं।', en: 'Take 5 away from 12 and 7 are left.' } },
  { id: 'm3', topic: 'maths', hi: '6 गुणा 4 कितना होता है?', en: 'What is 6 times 4?', check: { kind: 'number', answer: 24 }, answer: { hi: 'चौबीस (24)', en: 'twenty-four (24)' }, why: { hi: '6 को 4 बार जोड़ें: 6+6+6+6 = 24।', en: 'Four sixes: 6+6+6+6 = 24.' } },
  { id: 'm4', topic: 'maths', hi: '100 का आधा कितना होता है?', en: 'What is half of 100?', check: { kind: 'number', answer: 50 }, answer: { hi: 'पचास (50)', en: 'fifty (50)' }, why: { hi: '100 को दो बराबर हिस्सों में बाँटें तो हर हिस्सा 50।', en: 'Split 100 into two equal parts: 50 each.' } },
  { id: 'm5', topic: 'maths', hi: 'एक हफ़्ते में कितने दिन होते हैं?', en: 'How many days are there in a week?', check: { kind: 'number', answer: 7 }, answer: { hi: 'सात (7)', en: 'seven (7)' }, why: { hi: 'सोमवार से रविवार तक 7 दिन।', en: 'Monday to Sunday: 7 days.' } },
  { id: 'm6', topic: 'maths', hi: '9 गुणा 9 कितना होता है?', en: 'What is 9 times 9?', check: { kind: 'number', answer: 81 }, answer: { hi: 'इक्यासी (81)', en: 'eighty-one (81)' }, why: { hi: '9 का पहाड़ा: 9 नवाँ 81।', en: 'From the 9 times table: 9 × 9 = 81.' } },
  // ---- science ----
  {
    id: 's1', topic: 'science', hi: 'पौधे अपना भोजन किस क्रिया से बनाते हैं?', en: 'How do plants make their food?',
    options: [['प्रकाश संश्लेषण', 'Photosynthesis', 'फोटोसिंथेसिस', 'photo synthesis'], ['श्वसन', 'Respiration', 'रेस्पिरेशन'], ['पाचन', 'Digestion', 'डाइजेशन'], ['वाष्पीकरण', 'Evaporation', 'इवैपोरेशन']],
    check: mcq([['प्रकाश संश्लेषण', 'photosynthesis', 'फोटोसिंथेसिस', 'photo synthesis'], ['श्वसन', 'respiration', 'रेस्पिरेशन'], ['पाचन', 'digestion', 'डाइजेशन'], ['वाष्पीकरण', 'evaporation', 'इवैपोरेशन']], 0),
    answer: { hi: 'प्रकाश संश्लेषण', en: 'Photosynthesis' }, why: { hi: 'पौधे धूप, पानी और हवा से अपना भोजन बनाते हैं।', en: 'Plants use sunlight, water and air to make food.' },
  },
  { id: 's2', topic: 'science', hi: 'पानी कितने डिग्री सेल्सियस पर उबलता है?', en: 'At how many degrees Celsius does water boil?', check: { kind: 'number', answer: 100 }, answer: { hi: '100 डिग्री', en: '100 degrees' }, why: { hi: 'समुद्र तल पर पानी 100 डिग्री पर उबलता है।', en: 'At sea level water boils at 100 °C.' } },
  { id: 's3', topic: 'science', hi: 'सूरज किस दिशा में उगता है?', en: 'In which direction does the sun rise?', check: { kind: 'text', answers: ['पूरब', 'पूर्व', 'east', 'purab', 'poorab', 'purv'] }, answer: { hi: 'पूरब', en: 'East' }, why: { hi: 'पृथ्वी घूमती है, इसलिए सूरज रोज़ पूरब से निकलता दिखता है।', en: 'The Earth spins, so the sun appears in the east every morning.' } },
  {
    id: 's4', topic: 'science', hi: 'हम साँस में कौन सी गैस अंदर लेते हैं?', en: 'Which gas do we breathe in?',
    options: [['ऑक्सीजन', 'Oxygen', 'oxygen', 'प्राणवायु'], ['कार्बन डाइऑक्साइड', 'Carbon dioxide', 'carbon dioxide'], ['नाइट्रोजन', 'Nitrogen'], ['हाइड्रोजन', 'Hydrogen']],
    check: mcq([['ऑक्सीजन', 'oxygen', 'प्राणवायु'], ['कार्बन डाइऑक्साइड', 'carbon dioxide'], ['नाइट्रोजन', 'nitrogen'], ['हाइड्रोजन', 'hydrogen']], 0),
    answer: { hi: 'ऑक्सीजन', en: 'Oxygen' }, why: { hi: 'हमारा शरीर ऑक्सीजन से ऊर्जा बनाता है।', en: 'Our body uses oxygen to make energy.' },
  },
  // ---- general knowledge ----
  {
    id: 'g1', topic: 'gk', hi: 'भारत की राजधानी कौन सी है?', en: 'What is the capital of India?',
    options: [['मुंबई', 'Mumbai', 'bombay'], ['नई दिल्ली', 'New Delhi', 'दिल्ली', 'delhi'], ['कोलकाता', 'Kolkata', 'calcutta'], ['चेन्नई', 'Chennai', 'madras']],
    check: mcq([['मुंबई', 'mumbai', 'bombay'], ['नई दिल्ली', 'new delhi', 'दिल्ली', 'delhi'], ['कोलकाता', 'kolkata', 'calcutta'], ['चेन्नई', 'chennai', 'madras']], 1),
    answer: { hi: 'नई दिल्ली', en: 'New Delhi' }, why: { hi: 'संसद और राष्ट्रपति भवन नई दिल्ली में हैं।', en: 'Parliament and Rashtrapati Bhavan are in New Delhi.' },
  },
  { id: 'g2', topic: 'gk', hi: 'बिहार की राजधानी कौन सी है?', en: 'What is the capital of Bihar?', check: { kind: 'text', answers: ['पटना', 'patna'] }, answer: { hi: 'पटना', en: 'Patna' }, why: { hi: 'पटना गंगा नदी के किनारे बसा है।', en: 'Patna sits on the bank of the Ganga.' } },
  { id: 'g3', topic: 'gk', hi: 'भारत का राष्ट्रीय पक्षी कौन सा है?', en: 'What is the national bird of India?', check: { kind: 'text', answers: ['मोर', 'peacock', 'mor', 'मयूर'] }, answer: { hi: 'मोर', en: 'Peacock' }, why: { hi: 'मोर को 1963 में राष्ट्रीय पक्षी बनाया गया।', en: 'The peacock became the national bird in 1963.' } },
  {
    id: 'g4', topic: 'gk', hi: 'गंगा नदी कहाँ जाकर मिलती है?', en: 'Where does the river Ganga end?',
    options: [['बंगाल की खाड़ी', 'Bay of Bengal', 'bay of bengal', 'खाड़ी'], ['अरब सागर', 'Arabian Sea'], ['हिंद महासागर', 'Indian Ocean'], ['लाल सागर', 'Red Sea']],
    check: mcq([['बंगाल की खाड़ी', 'bay of bengal', 'खाड़ी'], ['अरब सागर', 'arabian sea'], ['हिंद महासागर', 'indian ocean'], ['लाल सागर', 'red sea']], 0),
    answer: { hi: 'बंगाल की खाड़ी', en: 'Bay of Bengal' }, why: { hi: 'गंगा पश्चिम बंगाल से होकर बंगाल की खाड़ी में मिलती है।', en: 'The Ganga flows through West Bengal into the Bay of Bengal.' },
  },
];

export const QUIZ_LEN = 5;

/** Spoken sample answers for the "No mic? See a sample" demo: right, wrong, unsure. */
export const SAMPLE_ANSWERS: Record<string, string> = {
  m1: 'पंद्रह', m2: 'आठ', m3: '24', m4: 'पचास', m5: 'सात', m6: 'पता नहीं',
  s1: 'फोटोसिंथेसिस', s2: 'सौ डिग्री', s3: 'पश्चिम', s4: 'दूसरा',
  g1: 'नई दिल्ली', g2: 'पटना', g3: 'मोर', g4: 'पता नहीं',
};
