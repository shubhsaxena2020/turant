// health: symptom intake by an ASHA worker or an older patient, spoken in Tamil (or
// English / Hindi); the doctor gets an ENGLISH referral note built from the slots.
// The optional LLM adds an English summary of the patient's own words (labelled
// auto-generated); the template summary below is always there as the fallback.
import { defineDomain, type Entry, type Fields, type OutputCtx } from '../../domain/types';
import { portalDate, portalTime } from '../../lib/format';
import { inEnglish } from '../../lib/translit';
import { langInfo } from '../../lib/lang';
import { envLLMBase, understandClient } from '../../lib/llm';

const SYMPTOMS: [string, string, string, string, string[]][] = [
  // value, en, ta, hi, keywords
  ['fever', 'Fever', 'காய்ச்சல்', 'बुखार', ['fever', 'bukhar', 'bukhaar', 'बुखार', 'ताप', 'காய்ச்சல்', 'ஜுரம்', 'ಜ್ವರ', 'জ্বর', 'జ్వరం']],
  ['cough', 'Cough', 'இருமல்', 'खांसी', ['cough', 'khansi', 'khaansi', 'खांसी', 'खाँसी', 'இருமல்', 'ಕೆಮ್ಮು', 'কাশি', 'దగ్గు', 'खोकला']],
  ['cold', 'Cold / runny nose', 'சளி', 'जुकाम', ['cold', 'runny nose', 'zukam', 'zukaam', 'jukam', 'जुकाम', 'नज़ला', 'சளி', 'ನೆಗಡಿ', 'সর্দি', 'జలుబు']],
  ['headache', 'Headache', 'தலைவலி', 'सिर दर्द', ['headache', 'sar dard', 'sir dard', 'sar me dard', 'sir mein dard', 'सिर दर्द', 'सिरदर्द', 'தலைவலி', 'தலை வலி', 'ತಲೆನೋವು', 'মাথাব্যথা', 'মাথা ব্যথা', 'తలనొప్పి', 'डोकेदुखी']],
  ['breathless', 'Breathlessness', 'மூச்சுத் திணறல்', 'साँस फूलना', ['breathless', 'breathlessness', 'shortness of breath', 'difficulty breathing', 'saans phool', 'saans lene mein', 'saans ki dikkat', 'सांस फूल', 'साँस फूल', 'सांस लेने में', 'மூச்சு திணறல்', 'மூச்சுத்திணறல்', 'மூச்சுத் திணறல்', 'ಉಸಿರಾಟದ ತೊಂದರೆ', 'শ্বাসকষ্ট', 'ఆయాసం']],
  ['chest_pain', 'Chest pain', 'நெஞ்சு வலி', 'सीने में दर्द', ['chest pain', 'seene mein dard', 'seene me dard', 'chhati mein dard', 'सीने में दर्द', 'छाती में दर्द', 'நெஞ்சு வலி', 'நெஞ்சுவலி', 'ಎದೆ ನೋವು', 'বুকে ব্যথা', 'ఛాతీ నొప్పి']],
  ['vomiting', 'Vomiting', 'வாந்தி', 'उल्टी', ['vomiting', 'vomit', 'ulti', 'ultee', 'उल्टी', 'उलटी', 'வாந்தி', 'ವಾಂತಿ', 'বমি', 'వాంతులు']],
  ['diarrhoea', 'Diarrhoea', 'வயிற்றுப்போக்கு', 'दस्त', ['diarrhoea', 'diarrhea', 'loose motion', 'loose motions', 'dast', 'दस्त', 'வயிற்றுப்போக்கு', 'பேதி', 'ಭೇದಿ', 'ডায়রিয়া', 'విరేచనాలు', 'जुलाब']],
  ['stomach_pain', 'Stomach pain', 'வயிற்று வலி', 'पेट दर्द', ['stomach pain', 'stomach ache', 'pet dard', 'pet mein dard', 'pet me dard', 'पेट दर्द', 'पेट में दर्द', 'வயிற்று வலி', 'வயிறு வலி', 'ಹೊಟ್ಟೆ ನೋವು', 'পেটে ব্যথা', 'కడుపు నొప్పి']],
  ['body_pain', 'Body ache', 'உடல் வலி', 'बदन दर्द', ['अंगदुखी', 'अंग दुखी', 'angdukhi', 'body pain', 'body ache', 'badan dard', 'badan mein dard', 'बदन दर्द', 'शरीर में दर्द', 'உடல் வலி', 'ಮೈ ನೋವು', 'গায়ে ব্যথা', 'ఒళ్ళు నొప్పులు']],
  ['rash', 'Rash', 'தடிப்பு', 'दाने / चकत्ते', ['rash', 'rashes', 'daane', 'chakatte', 'दाने', 'चकत्ते', 'தடிப்பு', 'ದದ್ದು', 'ফুসকুড়ি', 'దద్దుర్లు']],
  ['bleeding', 'Bleeding', 'ரத்தப்போக்கு', 'खून आना', ['bleeding', 'khoon aa', 'khoon nikal', 'खून आ', 'खून निकल', 'रक्तस्राव', 'ரத்தப்போக்கு', 'இரத்தப்போக்கு', 'ರಕ್ತಸ್ರಾವ', 'রক্তপাত', 'రక్తస్రావం']],
  ['dizziness', 'Dizziness', 'தலைசுற்றல்', 'चक्कर', ['dizzy', 'dizziness', 'chakkar', 'चक्कर', 'தலைசுற்றல்', 'தலை சுற்றல்', 'ತಲೆ ಸುತ್ತು', 'মাথা ঘোরা', 'కళ్ళు తిరగడం']],
];

const AGE_UNITS = ['years', 'year', 'yrs', 'yr', 'saal', 'sal', 'baras', 'varsh', 'age', 'umar', 'umr', 'aged', 'old', 'साल', 'वर्ष', 'बरस', 'उम्र', 'उमर', 'வயது', 'வயசு', 'ವಯಸ್ಸು', 'ವರ್ಷ', 'বছর', 'বয়স', 'సంవత్సరాలు', 'వయసు', 'वय'];
const TEMP_UNITS = ['bukhar', 'बुखार', 'fever', 'taap', 'ताप', 'জ্বর', 'காய்ச்சல்', 'జ్వరం', 'ಜ್ವರ', 'degree', 'degrees', 'digri', 'degri', 'fahrenheit', 'f', 'temperature', 'temp', 'tapman', 'डिग्री', 'तापमान', 'டிகிரி', 'வெப்பநிலை', 'ಡಿಗ್ರಿ', 'ডিগ্রি', 'డిగ్రీ'];

const age = (f: Fields) => (f.age ? Number(f.age.value) : undefined);
const symptoms = (f: Fields) => (Array.isArray(f.symptoms?.value) ? (f.symptoms!.value as string[]) : []);

/** Danger signs the note flags for the doctor (not a diagnosis). */
export function redFlags(f: Fields): string[] {
  const s = symptoms(f);
  const out: string[] = [];
  if (s.includes('breathless')) out.push('Breathlessness');
  if (s.includes('chest_pain')) out.push('Chest pain');
  if (s.includes('bleeding')) out.push(f.pregnant?.value === true ? 'Bleeding in pregnancy' : 'Bleeding');
  const t = f.temp ? Number(f.temp.value) : undefined;
  if (t !== undefined && t >= 103) out.push(`High fever (${t}°F)`);
  if (f.pregnant?.value === true && s.includes('fever')) out.push('Fever in pregnancy');
  if (f.days && Number(f.days.value) >= 7 && s.includes('fever')) out.push('Fever for 7 days or more');
  const a = age(f);
  if (a !== undefined && a < 1) out.push('Infant under 1 year');
  return [...new Set(out)];
}

/** Template English summary from the slots: always available, offline. */
export function templateSummary(e: Entry, ctx: OutputCtx): string {
  const f = e.fields;
  const name = ctx.english('patient') ?? 'The patient';
  const a = age(f);
  const s = ctx.english('symptoms');
  const parts = [
    `${name}${a !== undefined ? `, ${a} years old,` : ''} reports ${s ? s.toLowerCase() : 'symptoms not yet recorded'}${f.days ? ` for ${ctx.english('days')}` : ''}.`,
    f.temp ? `Temperature measured at ${f.temp.value}°F.` : 'Temperature not measured.',
    f.pregnant ? (f.pregnant.value ? 'The patient is pregnant.' : 'Not pregnant.') : '',
    redFlags(f).length ? `Danger signs: ${redFlags(f).join(', ')}. Please see today.` : 'No danger signs reported.',
  ];
  return parts.filter(Boolean).join(' ');
}

function speak(e: Entry, ctx: OutputCtx): string[] {
  const t = (x: Record<string, string>, v?: Record<string, string>) => ctx.t(x, v);
  const lines = [
    t({ 'en-IN': 'Patient: {n}, {a}.', 'ta-IN': 'நோயாளி: {n}, {a}.', 'hi-IN': 'मरीज़: {n}, {a}।' }, { n: ctx.show('patient') ?? '—', a: ctx.show('age') ?? '—' }),
    t({ 'en-IN': 'Problems: {s}, for {d}.', 'ta-IN': 'பிரச்சனைகள்: {s}. எத்தனை நாளாக: {d}.', 'hi-IN': 'तकलीफ़: {s}, {d} से।' }, { s: ctx.show('symptoms') ?? '—', d: ctx.show('days') ?? '—' }),
    t({ 'en-IN': 'Temperature: {v}.', 'ta-IN': 'காய்ச்சல் அளவு: {v}.', 'hi-IN': 'बुखार: {v}।' }, { v: ctx.show('temp') ?? ctx.ui('unknown') }),
  ];
  if (redFlags(e.fields).length)
    lines.push(t({ 'en-IN': 'Danger signs. Please see today.', 'ta-IN': 'ஆபத்து அறிகுறிகள் உள்ளன. இன்றே பாருங்கள்.', 'hi-IN': 'ख़तरे के लक्षण हैं। आज ही दिखाइए।' }));
  return lines;
}

const base = envLLMBase();

export default defineDomain({
  id: 'health',
  name: { 'en-IN': 'Nalam', 'ta-IN': 'நலம்', 'hi-IN': 'नलम' },
  tagline: { 'en-IN': 'Say the symptoms. The doctor gets an English note.', 'ta-IN': 'அறிகுறிகளைச் சொல்லுங்கள். மருத்துவருக்கு ஆங்கிலக் குறிப்பு கிடைக்கும்.', 'hi-IN': 'लक्षण बोलिए। डॉक्टर को अंग्रेज़ी नोट मिलेगा।' },
  theme: {}, // Wispr Flow default theme (src/lib/theme.ts)
  languages: ['ta-IN', 'en-IN', 'hi-IN'],
  slots: [
    {
      key: 'patient', type: 'name', required: true, markers: ['patient', 'मरीज', 'மரீஜ்', 'நோயாளி'],
      label: { 'en-IN': "Patient's name", 'ta-IN': 'நோயாளியின் பெயர்', 'hi-IN': 'मरीज़ का नाम' },
      q: { 'en-IN': "What is the patient's name?", 'ta-IN': 'நோயாளியின் பெயர் என்ன?', 'hi-IN': 'मरीज़ का नाम क्या है?' },
      rq: { 'en-IN': 'The name?', 'ta-IN': 'பெயர்?', 'hi-IN': 'नाम?' },
      ex: { 'en-IN': '"Meena"', 'ta-IN': '"லட்சுமி"', 'hi-IN': '"सुनीता"' },
      aliases: ['name', 'naam', 'பெயர்', 'नाम'],
    },
    {
      key: 'age', type: 'number', required: true, confirm: 'explicit', keypad: true, units: AGE_UNITS, min: 0, max: 120,
      format: { 'en-IN': '{v} years', 'ta-IN': '{v} வயது', 'hi-IN': '{v} साल' },
      label: { 'en-IN': 'Age', 'ta-IN': 'வயது', 'hi-IN': 'उम्र' },
      q: { 'en-IN': 'How old is the patient?', 'ta-IN': 'நோயாளிக்கு வயது என்ன?', 'hi-IN': 'मरीज़ की उम्र कितनी है?' },
      rq: { 'en-IN': 'Age in years?', 'ta-IN': 'எத்தனை வயது?', 'hi-IN': 'कितने साल?' },
      ex: { 'en-IN': '"62 years"', 'ta-IN': '"62 வயது"', 'hi-IN': '"26 साल"' },
      aliases: ['age', 'umar', 'उम्र', 'வயது'],
    },
    {
      key: 'symptoms', type: 'enum', multi: true, required: true,
      options: SYMPTOMS.map(([value, en, ta, hi, keywords]) => ({ value, keywords, label: { 'en-IN': en, 'ta-IN': ta, 'hi-IN': hi } })),
      label: { 'en-IN': 'Symptoms', 'ta-IN': 'அறிகுறிகள்', 'hi-IN': 'लक्षण' },
      q: { 'en-IN': 'What is troubling the patient?', 'ta-IN': 'நோயாளிக்கு என்ன தொந்தரவு?', 'hi-IN': 'मरीज़ को क्या तकलीफ़ है?' },
      rq: { 'en-IN': 'Fever, cough, pain? You can choose below.', 'ta-IN': 'காய்ச்சல், இருமல், வலி? கீழே தேர்ந்தெடுக்கலாம்.', 'hi-IN': 'बुखार, खांसी, दर्द? नीचे चुन सकते हैं।' },
      ex: { 'en-IN': '"fever and cough"', 'ta-IN': '"காய்ச்சல், இருமல்"', 'hi-IN': '"बुखार और खांसी"' },
      aliases: ['symptom', 'symptoms', 'takleef', 'लक्षण', 'तकलीफ', 'அறிகுறி'],
    },
    {
      key: 'days', type: 'duration', required: true, keypad: true,
      label: { 'en-IN': 'Since', 'ta-IN': 'எத்தனை நாளாக', 'hi-IN': 'कब से' },
      q: { 'en-IN': 'Since how many days?', 'ta-IN': 'எத்தனை நாட்களாக இருக்கிறது?', 'hi-IN': 'कितने दिन से है?' },
      rq: { 'en-IN': 'How many days?', 'ta-IN': 'எத்தனை நாள்?', 'hi-IN': 'कितने दिन?' },
      ex: { 'en-IN': '"3 days" or "since yesterday"', 'ta-IN': '"மூன்று நாட்களாக"', 'hi-IN': '"तीन दिन से"' },
      aliases: ['days', 'din', 'दिन', 'நாள்'],
    },
    {
      key: 'temp', type: 'number', ask: true, confirm: 'explicit', keypad: true, units: TEMP_UNITS, min: 93, max: 108,
      format: { 'en-IN': '{v}°F' },
      label: { 'en-IN': 'Temperature', 'ta-IN': 'காய்ச்சல் அளவு', 'hi-IN': 'बुखार (तापमान)' },
      q: { 'en-IN': 'What does the thermometer show?', 'ta-IN': 'தெர்மாமீட்டரில் எவ்வளவு காட்டுகிறது?', 'hi-IN': 'थर्मामीटर में कितना है?' },
      rq: { 'en-IN': 'The temperature, like "101"?', 'ta-IN': 'அளவு, "101" மாதிரி?', 'hi-IN': 'तापमान, जैसे "101"?' },
      ex: { 'en-IN': '"101 degrees"', 'ta-IN': '"101 டிகிரி"', 'hi-IN': '"102 डिग्री"' },
      help: { 'en-IN': 'No thermometer? Say "skip".', 'ta-IN': 'தெர்மாமீட்டர் இல்லையா? "தெரியாது" என்று சொல்லுங்கள்.', 'hi-IN': 'थर्मामीटर नहीं है? "पता नहीं" बोलिए।' },
      aliases: ['temperature', 'temp', 'bukhar kitna', 'तापमान', 'டிகிரி'],
    },
    {
      key: 'pregnant', type: 'yesno', ask: true,
      askIf: (f) => age(f) === undefined || (age(f)! >= 12 && age(f)! <= 50),
      keywords: ['pregnant', 'pregnancy', 'garbhvati', 'garbhwati', 'गर्भवती', 'गर्भ से', 'प्रेग्नेंट', 'கர்ப்ப', 'ಗರ್ಭಿಣಿ', 'গর্ভবতী', 'గర్భిణి'],
      label: { 'en-IN': 'Pregnant', 'ta-IN': 'கர்ப்பம்', 'hi-IN': 'गर्भवती' },
      q: { 'en-IN': 'Is the patient pregnant? Say no if not, or if a man.', 'ta-IN': 'நோயாளி கர்ப்பமாக இருக்கிறாரா? இல்லை என்றால் "இல்லை" சொல்லுங்கள்.', 'hi-IN': 'क्या मरीज़ गर्भवती है? नहीं तो "नहीं" बोलिए।' },
      rq: { 'en-IN': 'Pregnant, yes or no?', 'ta-IN': 'கர்ப்பமா, ஆம் அல்லது இல்லை?', 'hi-IN': 'गर्भवती, हाँ या नहीं?' },
      ex: { 'en-IN': '"yes" or "no"', 'ta-IN': '"ஆம்" அல்லது "இல்லை"', 'hi-IN': '"हाँ" या "नहीं"' },
    },
  ],
  copy: {
    greeting: { 'en-IN': 'Vanakkam. I am Nalam. I will write a note for the doctor.', 'ta-IN': 'வணக்கம். நான் நலம். மருத்துவருக்கு ஒரு குறிப்பு எழுதுகிறேன்.', 'hi-IN': 'नमस्ते। मैं नलम हूँ। डॉक्टर के लिए नोट लिखूँगा।' },
    openQ: { 'en-IN': 'Who is the patient, and what is troubling them?', 'ta-IN': 'நோயாளி யார், அவருக்கு என்ன தொந்தரவு?', 'hi-IN': 'मरीज़ कौन है, और उन्हें क्या तकलीफ़ है?' },
    openEx: { 'en-IN': 'For example: "Patient name is Meena, 24 years, fever and vomiting for two days."', 'ta-IN': 'உதாரணம்: "என் பெயர் லட்சுமி, வயது 62, மூன்று நாட்களாக காய்ச்சல்."', 'hi-IN': 'जैसे: "मरीज़ का नाम सुनीता है, 26 साल, तीन दिन से बुखार।"' },
    letterTitle: { 'en-IN': 'The note, as I write it', 'ta-IN': 'நான் எழுதும் குறிப்பு', 'hi-IN': 'नोट, जैसा मैं लिख रहा हूँ' },
  },
  letter: [
    { text: { 'en-IN': 'The patient is {patient}, {age}.', 'ta-IN': 'நோயாளி {patient}, {age}.', 'hi-IN': 'मरीज़ {patient} हैं, {age}।' } },
    { text: { 'en-IN': 'Problems: {symptoms}, for {days}.', 'ta-IN': 'பிரச்சனைகள்: {symptoms}. எத்தனை நாளாக: {days}.', 'hi-IN': 'तकलीफ़: {symptoms}, {days} से।' } },
    { text: { 'en-IN': 'Temperature: {temp}.', 'ta-IN': 'காய்ச்சல் அளவு: {temp}.', 'hi-IN': 'तापमान: {temp}।' } },
    { text: { 'en-IN': 'Pregnant: {pregnant}.', 'ta-IN': 'கர்ப்பம்: {pregnant}.', 'hi-IN': 'गर्भवती: {pregnant}।' } },
  ],
  check: {
    hero: 'patient',
    main: ['age', 'symptoms', 'days', 'temp'],
    more: ['pregnant'],
    notice: (f) =>
      redFlags(f).length
        ? { 'en-IN': `Danger signs: ${redFlags(f).join(', ')}. Take the patient to the doctor today, or call 108.`, 'ta-IN': 'ஆபத்து அறிகுறிகள் உள்ளன. இன்றே மருத்துவரிடம் அழைத்துச் செல்லுங்கள், அல்லது 108 அழையுங்கள்.', 'hi-IN': 'ख़तरे के लक्षण हैं। आज ही डॉक्टर को दिखाइए, या 108 पर कॉल कीजिए।' }
        : null,
  },
  done: {
    title: { 'en-IN': 'The note is ready', 'ta-IN': 'குறிப்பு தயார்', 'hi-IN': 'नोट तैयार है' },
    sub: { 'en-IN': 'The doctor gets it in English. You heard it in your language.', 'ta-IN': 'மருத்துவருக்கு ஆங்கிலத்தில் கிடைக்கும். நீங்கள் உங்கள் மொழியில் கேட்டீர்கள்.', 'hi-IN': 'डॉक्टर को अंग्रेज़ी में मिलेगा। आपने अपनी भाषा में सुना।' },
    scriptTitle: { 'en-IN': 'Tell the doctor', 'ta-IN': 'மருத்துவரிடம் சொல்லுங்கள்', 'hi-IN': 'डॉक्टर को बताइए' },
    script: (e, ctx) => speak(e, ctx),
    warning: { 'en-IN': 'Breathless, chest pain, fits, or bleeding? Call 108 now.', 'ta-IN': 'மூச்சுத் திணறல், நெஞ்சு வலி, வலிப்பு, ரத்தப்போக்கு? உடனே 108 அழையுங்கள்.', 'hi-IN': 'साँस फूलना, सीने में दर्द, दौरे, या खून? अभी 108 पर कॉल करें।' },
    nextTitle: { 'en-IN': 'Next', 'ta-IN': 'அடுத்து', 'hi-IN': 'आगे' },
    next: [
      { 'en-IN': 'Send the English note to the PHC doctor or nurse.', 'ta-IN': 'ஆங்கிலக் குறிப்பை PHC மருத்துவர் அல்லது செவிலியருக்கு அனுப்புங்கள்.', 'hi-IN': 'अंग्रेज़ी नोट PHC डॉक्टर या नर्स को भेजिए।' },
      { 'en-IN': 'Give medicine only as the doctor says.', 'ta-IN': 'மருத்துவர் சொன்னபடி மட்டும் மருந்து கொடுங்கள்.', 'hi-IN': 'दवा सिर्फ़ डॉक्टर के कहे अनुसार दीजिए।' },
      { 'en-IN': 'Check on the patient again tomorrow.', 'ta-IN': 'நாளை மீண்டும் நோயாளியைப் பாருங்கள்.', 'hi-IN': 'कल फिर मरीज़ का हाल पूछिए।' },
    ],
    primary: { label: { 'en-IN': 'Send note on WhatsApp', 'ta-IN': 'WhatsApp-இல் அனுப்பு', 'hi-IN': 'WhatsApp पर भेजें' }, kind: 'whatsapp', text: (e, ctx) => `Referral note: ${templateSummary(e, ctx)}`, icon: 'whatsapp' },
    seeWritten: { 'en-IN': "See the doctor's note", 'ta-IN': 'மருத்துவர் குறிப்பைப் பாருங்கள்', 'hi-IN': 'डॉक्टर का नोट देखें' },
  },
  document: {
    title: { 'en-IN': "Doctor's note (English)", 'ta-IN': 'மருத்துவர் குறிப்பு (ஆங்கிலம்)', 'hi-IN': 'डॉक्टर का नोट (अंग्रेज़ी)' },
    sub: { 'en-IN': 'Built from what was said. Check it before sharing.', 'ta-IN': 'சொன்னதிலிருந்து எழுதப்பட்டது. பகிர்வதற்கு முன் சரிபாருங்கள்.', 'hi-IN': 'जो बोला गया, उससे बना है। भेजने से पहले जाँच लीजिए।' },
    build: (e, ctx) => {
      const f = e.fields;
      const flags = redFlags(f);
      const when = `${portalDate(ctx.now.toISOString())} ${portalTime(ctx.now.toISOString())}`;
      return [
        'PATIENT SYMPTOM INTAKE - REFERRAL NOTE',
        `(Recorded by voice in ${langInfo(e.lang).english.split(' ')[0]} · ${when})`,
        '',
        '1. PATIENT',
        `Name: ${ctx.english('patient') ?? 'Not known'}`,
        `Age: ${f.age ? `${f.age.value} years` : 'Not known'}`,
        `Pregnant: ${f.pregnant ? (f.pregnant.value ? 'Yes' : 'No') : age(f) !== undefined && (age(f)! < 12 || age(f)! > 50) ? 'Not applicable' : 'Not asked'}`,
        '',
        '2. PRESENTING COMPLAINTS',
        `Symptoms: ${ctx.english('symptoms') ?? 'Not recorded'}`,
        `Duration: ${ctx.english('days') ?? 'Not known'}`,
        `Temperature: ${f.temp ? `${f.temp.value}°F` : 'Not measured'}`,
        '',
        '3. DANGER SIGNS',
        `Danger signs: ${flags.length ? flags.join(', ') : 'None reported'}`,
        `Priority: ${flags.length ? 'URGENT - see today' : 'Routine'}`,
        '',
        '4. SUMMARY',
        templateSummary(e, ctx),
        ...(e.summary ? ['', '5. AUTO-GENERATED SUMMARY (AI, PLEASE VERIFY)', e.summary.text] : []),
        ...(e.turns.length ? ['', `${e.summary ? 6 : 5}. PATIENT'S OWN WORDS (VOICE TRANSCRIPT)`, ...e.turns.map((x) => `"${inEnglish(x)}"`)] : []),
      ].join('\n');
    },
    badge: (e, ctx) => (redFlags(e.fields).length ? ctx.t({ 'en-IN': 'Urgent: danger signs', 'ta-IN': 'அவசரம்: ஆபத்து அறிகுறிகள்', 'hi-IN': 'ज़रूरी: ख़तरे के लक्षण' }) : ctx.t({ 'en-IN': 'Ready for the doctor', 'ta-IN': 'மருத்துவருக்குத் தயார்', 'hi-IN': 'डॉक्टर के लिए तैयार' })),
    copyAllLabel: { 'en-IN': 'Copy the note', 'ta-IN': 'குறிப்பை நகலெடு', 'hi-IN': 'नोट कॉपी करें' },
    actions: [
      { kind: 'whatsapp', label: { 'en-IN': 'Send to the doctor', 'ta-IN': 'மருத்துவருக்கு அனுப்பு', 'hi-IN': 'डॉक्टर को भेजें' }, text: (e, ctx) => `Referral note: ${templateSummary(e, ctx)}`, icon: 'whatsapp' },
      { kind: 'tel', label: { 'en-IN': 'Emergency: call 108', 'ta-IN': 'அவசரம்: 108 அழை', 'hi-IN': 'इमरजेंसी: 108 पर कॉल' }, href: 'tel:108', icon: 'phone' },
    ],
  },
  history: { title: (_e, ctx) => [ctx.show('patient'), ctx.show('symptoms')].filter(Boolean).join(' · ') || '—' },
  topCall: { label: '108', href: 'tel:108' },
  samples: {
    stories: {
      'ta-IN': 'என் பெயர் லட்சுமி, வயது 62. மூன்று நாட்களாக காய்ச்சல், இருமல், தலைவலி இருக்கு. காய்ச்சல் 101 டிகிரி.',
      'en-IN': 'Patient name is Meena, 24 years old. She has had fever and vomiting for two days. She is pregnant.',
      'hi-IN': 'Mareez ka naam Sunita hai, umar 26 saal. Teen din se bukhar aur ulti ho rahi hai.',
    },
    answers: {
      patient: { 'ta-IN': 'லட்சுமி', 'en-IN': 'Meena', 'hi-IN': 'Sunita' },
      age: { 'ta-IN': '62 வயது', 'en-IN': '24 years', 'hi-IN': '26 saal' },
      symptoms: { 'ta-IN': 'காய்ச்சல், இருமல்', 'en-IN': 'fever and vomiting', 'hi-IN': 'bukhar aur ulti' },
      days: { 'ta-IN': 'மூன்று நாட்களாக', 'en-IN': 'two days', 'hi-IN': 'teen din se' },
      temp: { 'ta-IN': '101 டிகிரி', 'en-IN': '102 degrees', 'hi-IN': '101 degree' },
      pregnant: { 'ta-IN': 'இல்லை', 'en-IN': 'yes', 'hi-IN': 'nahi' },
    },
  },
  strings: {
    'en-IN': { skipLater: 'Skip, the doctor will ask', giveUp: 'No problem. The doctor will ask this.', pastReports: 'Earlier notes', newReport: 'New patient', draftAgain: 'Finish the last note', summaryIntro: 'Here is the note.', noReports: 'No notes yet.' },
    'ta-IN': { skipLater: 'விடுங்கள், மருத்துவர் கேட்பார்', giveUp: 'பரவாயில்லை. இதை மருத்துவர் கேட்பார்.', pastReports: 'முந்தைய குறிப்புகள்', newReport: 'புதிய நோயாளி', draftAgain: 'கடைசி குறிப்பை முடியுங்கள்', summaryIntro: 'இதோ குறிப்பு.', noReports: 'இன்னும் குறிப்பு இல்லை.' },
    'hi-IN': { skipLater: 'छोड़िए, डॉक्टर पूछ लेंगे', giveUp: 'कोई बात नहीं। यह डॉक्टर पूछ लेंगे।', pastReports: 'पुराने नोट', newReport: 'नया मरीज़', draftAgain: 'पिछला नोट पूरा करें', summaryIntro: 'यह रहा नोट।', noReports: 'अभी कोई नोट नहीं।' },
  },
  // OFF by default. Enable with ?llm=1 (or VITE_LLM=1 at build); VITE_LLM_URL points at the
  // deployed round2-kit/llm-api (same origin when empty). Rules + the template summary stay the fallback.
  llm: {
    extract: understandClient({ baseUrl: base ?? '' }),
    enabled: (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_LLM === '1',
    summaryLang: 'en',
  },
});
