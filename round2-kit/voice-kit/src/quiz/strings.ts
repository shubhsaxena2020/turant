// Quiz copy. Bhojpuri (bho) is written in Devanagari in everyday spoken style.
// NOTE: Bhojpuri lines need a native speaker's review before real use.
import type { QuizLang } from './bank';

const S = {
  title: { hi: 'बोलो क्विज़', bho: 'बोलीं क्विज़', en: 'Bolo Quiz' },
  hello: { hi: 'नमस्ते! चलो, बोलकर क्विज़ खेलें।', bho: 'प्रणाम! आईं, बोल के क्विज़ खेलल जाव।', en: 'Hello! Let’s play a quiz by speaking.' },
  pick: { hi: 'कौन सा विषय?', bho: 'कवन विषय?', en: 'Pick a topic' },
  pickHint: { hi: 'विषय का नाम बोलिए या दबाइए।', bho: 'विषय के नाम बोलीं भा दबाईं।', en: 'Say the topic or tap it.' },
  qOf: { hi: 'सवाल {n} / {m}', bho: 'सवाल {n} / {m}', en: 'Question {n} of {m}' },
  sayAnswer: { hi: 'गोला दबाओ और जवाब बोलो', bho: 'गोला दबाईं आ जवाब बोलीं', en: 'Tap the circle and say your answer' },
  listening: { hi: 'सुन रहा हूँ…', bho: 'सुनत बानी…', en: 'Listening…' },
  orTap: { hi: 'या सही विकल्प दबाओ', bho: 'भा सही विकल्प दबाईं', en: 'or tap the right option' },
  right: { hi: 'शाबाश! बिल्कुल सही।', bho: 'वाह! एकदम ठीक बा।', en: 'Well done! That’s right.' },
  wrong: { hi: 'कोई बात नहीं। सही जवाब है: {a}।', bho: 'कवनो बात ना। सही जवाब बा: {a}।', en: 'No problem. The right answer is: {a}.' },
  heard: { hi: 'आपने कहा: “{v}”', bho: 'रउआ कहनी: “{v}”', en: 'You said: “{v}”' },
  unclear: { hi: 'ठीक से सुनाई नहीं दिया, एक बार और बोलो।', bho: 'ठीक से सुनाई ना देहल, एक बेर अउरी बोलीं।', en: 'I didn’t quite catch that. Say it once more.' },
  tapNow: { hi: 'कोई बात नहीं, सही विकल्प दबा दो।', bho: 'कवनो बात ना, सही विकल्प दबा दीं।', en: 'That’s okay, just tap the answer.' },
  skipped: { hi: 'ठीक है। सही जवाब है: {a}।', bho: 'ठीक बा। सही जवाब बा: {a}।', en: 'Okay. The answer is: {a}.' },
  next: { hi: 'अगला सवाल', bho: 'अगिला सवाल', en: 'Next question' },
  finish: { hi: 'नतीजा देखो', bho: 'नतीजा देखीं', en: 'See how you did' },
  doneTitle: { hi: '{c} में से {t} सही!', bho: '{c} में {t} ठीक!', en: '{t} out of {c} right!' },
  doneGood: { hi: 'बहुत बढ़िया! आप तो कमाल हो।', bho: 'बहुत बढ़िया! रउआ त कमाल बानी।', en: 'Brilliant! You’re a star.' },
  doneOk: { hi: 'अच्छा खेला! हर बार थोड़ा और सीखते हैं।', bho: 'बढ़िया खेलनी! हर बेर तनी अउरी सीखल जाला।', en: 'Good game! Every round you learn a bit more.' },
  again: { hi: 'फिर से खेलो', bho: 'फेर से खेलीं', en: 'Play again' },
  otherTopic: { hi: 'दूसरा विषय', bho: 'दोसर विषय', en: 'Another topic' },
  sample: { hi: 'माइक नहीं है? नमूना देखो', bho: 'माइक नइखे? नमूना देखीं', en: 'No mic? See a sample' },
  typeIt: { hi: 'लिखकर जवाब दो', bho: 'लिख के जवाब दीं', en: 'Type the answer' },
  send: { hi: 'भेजो', bho: 'भेजीं', en: 'Send' },
  repeat: { hi: 'सवाल फिर सुनो', bho: 'सवाल फेर सुनीं', en: 'Hear the question again' },
  learnedTitle: { hi: 'आज सीखा', bho: 'आज सीखनी', en: 'What you learned' },
};

export type QKey = keyof typeof S;

export function qt(lang: QuizLang, key: QKey, vars?: Record<string, string | number>): string {
  let s = S[key][lang] ?? S[key].hi;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
  return s;
}

/** Speech recognition / synthesis language for each quiz language (no bho-IN voice exists: use Hindi). */
export const SPEECH_LANG: Record<QuizLang, string> = { hi: 'hi-IN', bho: 'hi-IN', en: 'en-IN' };
export const LANG_NAMES: Record<QuizLang, string> = { hi: 'हिन्दी', bho: 'भोजपुरी', en: 'English' };
