// A whole voice-first app is ONE DomainConfig. The kit (screens, presence, letter,
// escalation, storage, speech) reads everything domain-specific from here.
import type { LangCode, Text } from '../lib/lang';
import type { UIKey } from '../i18n/ui';

export type { LangCode, Text };

// ---------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------

export interface QtyItem {
  qty: number;
  /** Canonical unit code: 'kg' | 'g' | 'L' | 'ml' | 'packet' | 'dozen' | 'pc' | ... */
  unit: string;
  /** Item as said (or the catalogue name when it matched one). */
  item: string;
}

export type SlotValue = string | number | boolean | string[] | QtyItem[];

export type Source = 'voice' | 'typed' | 'edited' | 'tap' | 'sample' | 'llm';

export interface FieldValue {
  value: SlotValue;
  confidence: number;
  source: Source;
}

export type Fields = Partial<Record<string, FieldValue>>;

// ---------------------------------------------------------------------------
// Slots
// ---------------------------------------------------------------------------

export type SlotType =
  | 'amount'
  | 'datetime'
  | 'duration'
  | 'phone'
  | 'digits'
  | 'upi'
  | 'enum'
  | 'name'
  | 'text'
  | 'number'
  | 'quantity+unit'
  | 'yesno';

/** Words the helper says and shows for one question. */
export interface QuestionCopy {
  /** First time asked: "How much money was taken?" */
  q?: Text;
  /** Shorter re-ask after a miss, never verbatim: "How many rupees?" */
  rq?: Text;
  /** Shown under the question: '"Five thousand rupees" or "₹4,999"' */
  ex?: Text;
  /** Optional help line under the question. */
  help?: Text;
  /** Name of the fact (Check screen label, read-back, corrections). */
  label: Text;
  /** Label on the Check screen if different (e.g. with a gloss). */
  checkLabel?: Text;
}

interface SlotBase extends QuestionCopy {
  /** Stable key used in templates ({amount}), outputs and storage. */
  key: string;
  /** Must be known; asked first, shown amber on Check when missing. */
  required?: boolean;
  /** Ask for it after the required ones even though it is optional. Default: same as `required`. */
  ask?: boolean;
  /** Only ask when this returns true (e.g. pregnancy only for ages 12-50). */
  askIf?: (fields: Fields) => boolean;
  /** Slots with the same group are asked as ONE question (e.g. suspect UPI / phone / account). */
  group?: string;
  /** 'explicit': the big value is shown + spoken and the user says/taps yes (money, dates, IDs).
   *  'implicit' (default): noted and moved on; the final read-back happens on Check. */
  confirm?: 'explicit' | 'implicit';
  /** Offer the big number keypad (amount, digits, phone, number). */
  keypad?: boolean;
  /** Words that name this slot in a voice correction ("rakam", "amount"). Labels are used too. */
  aliases?: string[];
}

export interface AmountSlot extends SlotBase {
  type: 'amount';
  /** Extra context words that make a bare number an amount ("udhaar", "baaki"). */
  cues?: string[];
}
export interface DatetimeSlot extends SlotBase {
  type: 'datetime';
}
/** "teen din se", "for two weeks", "ಎರಡು ವಾರದಿಂದ": stored as days (fractions for hours). */
export interface DurationSlot extends SlotBase {
  type: 'duration';
}
/** Indian mobile number (10 digits, 6-9 first; +91 / 0 prefixes dropped). */
export interface PhoneSlot extends SlotBase {
  type: 'phone';
  /** Words just before the number that point at this slot ("mera number", "his number"). */
  context?: string[];
}
export interface DigitsSlot extends SlotBase {
  type: 'digits';
  /** Exact length (UTR: 12), or a range with min/max. */
  length?: number;
  min?: number;
  max?: number;
  /** Words just before the digits that point at this slot. Range slots need one (or the question). */
  context?: string[];
  /** Show XXXX + last 4 only (account numbers). */
  mask?: boolean;
  /** Group in fours when shown and spoken (default true). */
  group4?: boolean;
}
export interface UpiSlot extends SlotBase {
  type: 'upi';
}
export interface EnumOption {
  value: string;
  label: Text;
  /** Matched in every script: Latin whole words, Indian scripts as substrings. */
  keywords: string[];
  /** Regexes on the normalised text (for keywords that need context). */
  patterns?: RegExp[];
  /** Only accepted while this question is being answered ("other", "something else"). */
  hintOnly?: boolean;
  confidence?: number;
}
export interface EnumSlot extends SlotBase {
  type: 'enum';
  /** In matching priority order. */
  options: EnumOption[];
  /** Multi-select (symptoms): every mentioned option, negated ones dropped ("bukhar nahi"). */
  multi?: boolean;
  /** Values shown in the "choose from a list" sheet, in display order. Default: all options. */
  choices?: string[];
  /** 'priority' (default): first option in list order wins. 'longest': the longest keyword wins (banks).
   *  'first': the option mentioned first in the sentence wins. */
  pick?: 'priority' | 'longest' | 'first';
  /** Default confidence of a keyword hit (0.88). */
  confidence?: number;
  /** Optional resolver run before keyword matching (e.g. a cross-script bank-name matcher).
   *  Must return one of the option values, or undefined. */
  resolve?: (raw: string) => string | undefined;
}
export interface NameSlot extends SlotBase {
  type: 'name';
  /** Extra words before the name ("customer", "grahak"). Built-ins cover "naam X hai", "X ne", "my name is X". */
  markers?: string[];
}
export interface TextMarker {
  words: string[];
  /** 'after': words after the marker; 'before': words before it; 'clause': the whole clause. */
  take: 'after' | 'before' | 'clause';
  /** Max words captured (default 5). */
  max?: number;
  /** Keep the marker word in the value ("near Shiv temple"). */
  keep?: boolean;
}
export interface TextSlot extends SlotBase {
  type: 'text';
  markers?: TextMarker[];
}
export interface NumberSlot extends SlotBase {
  type: 'number';
  /** Unit words next to the number that identify this slot ("saal", "years", "degree"). */
  units?: string[];
  min?: number;
  max?: number;
  /** How to show it, with {v}: "{v} years", "{v}°F". */
  format?: Text;
}
export interface UnitDef {
  code: string;
  words: string[];
}
export interface ItemDef {
  /** Canonical name (English is used in English documents). */
  name: Text;
  keywords: string[];
}
export interface QuantitySlot extends SlotBase {
  type: 'quantity+unit';
  /** Defaults cover kg, g, litre, ml, packet, dozen, piece, bottle, box in 7 languages. */
  units?: UnitDef[];
  /** Optional catalogue so "chawal" / "அரிசி" / "rice" become one item. */
  items?: ItemDef[];
}
export interface YesNoSlot extends SlotBase {
  type: 'yesno';
  /** Topic words: "pregnant", "garbhvati", "கர்ப்ப". Topic + negation = no; topic alone = yes. */
  keywords: string[];
  yesLabel?: Text;
  noLabel?: Text;
}

export type SlotDef =
  | AmountSlot
  | DatetimeSlot
  | DurationSlot
  | PhoneSlot
  | DigitsSlot
  | UpiSlot
  | EnumSlot
  | NameSlot
  | TextSlot
  | NumberSlot
  | QuantitySlot
  | YesNoSlot;

export interface GroupDef extends QuestionCopy {
  confirm?: 'explicit' | 'implicit';
  /** Slot whose keypad answers the group question (e.g. suspectPhone). */
  keypadSlot?: string;
}

// ---------------------------------------------------------------------------
// Records (one complaint / ledger entry / intake)
// ---------------------------------------------------------------------------

export interface Conflict {
  field: string;
  current: FieldValue;
  incoming: FieldValue;
}

export interface Entry {
  id: string;
  app: string;
  lang: LangCode;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'ready';
  /** Every spoken / typed story turn, in order. */
  turns: string[];
  fields: Fields;
  /** Question keys (slot key or group name) the user skipped. */
  skipped: string[];
  conflicts: Conflict[];
  sample?: boolean;
  ack?: string;
  checks?: boolean[];
  /** LLM values that failed the truth check: asked as an explicit "I heard X, right?". */
  suggested?: Partial<Record<string, FieldValue>>;
  /** Auto-generated summary from the LLM (always labelled as such; never the only output). */
  summary?: { text: string; model?: string };
}

/** Helpers handed to every output builder so configs stay short. */
export interface OutputCtx {
  lang: LangCode;
  now: Date;
  /** Raw stored value. */
  value: (key: string) => SlotValue | undefined;
  /** Value as shown on screen in `lang` (₹5,000; 4567 8901 2345; XXXX7812). */
  show: (key: string, lang?: LangCode) => string | undefined;
  /** Value as spoken (digits in groups, "dot", "at"). */
  spoken: (key: string, lang?: LangCode) => string | undefined;
  /** Shown value in English with Indian-script words transliterated ("Ramesh (रमेश)"). */
  english: (key: string) => string | undefined;
  /** Resolve Text in `lang` (or the given language). */
  t: (text: Text | string | undefined, vars?: Record<string, string | number>, lang?: LangCode) => string;
  /** Kit UI string. */
  ui: (key: UIKey, vars?: Record<string, string | number>) => string;
}

export type Builder<T = string> = (e: Entry, ctx: OutputCtx) => T;

export interface ActionDef {
  label: Text;
  /** tel:/https: link, or WhatsApp share of `text`, or copy `text`. */
  kind: 'tel' | 'link' | 'whatsapp' | 'copy';
  href?: string | Builder;
  text?: Builder;
  icon?: 'phone' | 'external' | 'whatsapp' | 'copy' | 'share';
}

export interface LetterSentence {
  /** "{amount} was taken from my {bank} account." Placeholders are slot keys or group names. */
  text: Text;
  /** Only include the sentence when this slot is known. */
  onlyIf?: string;
}

export interface DomainConfig {
  /** URL / env switch: ?app=<id> or VITE_APP=<id>. */
  id: string;
  /** Brand in the top bar (in the user's language). */
  name: Text;
  tagline: Text;
  /** Override the action colour (teal) and the night-band accent (mint). Hex. */
  theme?: { primary?: string; accent?: string; night?: string };
  /** First one is the default when the phone's language is not supported. */
  languages: LangCode[];

  slots: SlotDef[];
  groups?: Record<string, GroupDef>;

  /** Opening screen and helper lines. */
  copy: {
    greeting: Text; // "Namaste. I am Turant, an app."
    openQ: Text; // "What happened? Tell me in your own words."
    openEx: Text; // 'For example: "..."'
    letterTitle: Text; // "Your complaint, as I write it"
  };

  /** The "letter being written": first-person sentences with {slot} placeholders. */
  letter: LetterSentence[];

  /** "Is this right?": a hero value, then hairline rows. */
  check: {
    hero?: string;
    main: string[];
    /** Optional rows, shown only when filled. `{ any, empty }`: the filled ones of a set,
     *  or the `empty` row (as "not known yet") when none is filled. */
    more?: (string | { any: string[]; empty: string })[];
    moreTitle?: Text;
    /** Amber advice band (e.g. "Above ₹1 lakh: also visit the police station"). */
    notice?: (fields: Fields, now: Date) => Text | null;
  };

  done: {
    title: Text;
    sub: Text;
    urgent?: Text;
    /** The giant number / word (1930). */
    big?: { text: string; href: string };
    scriptTitle?: Text;
    /** Lines to read on the call / to the counter. */
    script?: (e: Entry, ctx: OutputCtx & { aloud: boolean }) => string[];
    warning?: Text;
    nextTitle?: Text;
    next?: Text[];
    primary: ActionDef;
    seeWritten: Text;
  };

  document: {
    title: Text;
    sub: Text;
    /** Typeset text: line 1 title, line 2 subtitle, "1. SECTION" headers, "Label: value" rows. */
    build: Builder;
    /** BCP-47 tag of the document text (default 'en'). */
    lang?: string;
    badge?: Builder;
    copyAllLabel?: Text;
    actions?: ActionDef[];
    sections?: { title: Text; build: Builder; copyLabel?: Text }[];
    checklist?: { title: Text; items: Text[] };
    ack?: { label: Text; placeholder: Text };
  };

  history?: { title?: Builder; sub?: Builder };

  /** Always-visible call link in the top bar (Be My Eyes pattern). */
  topCall?: { label: string; href: string };

  /** "No mic? See a sample": stories per language, answers per question key. */
  samples: {
    stories: Text;
    answers?: Record<string, Text | string>;
  };

  /** Override any kit UI string per language ("Skip, 1930 will ask"). */
  strings?: Partial<Record<LangCode, Partial<Record<UIKey, string>>>>;

  /** Optional LLM extraction (OFF unless enabled or ?llm=1). Rules always run first and stay the
   *  fallback; numbers / IDs / dates from the model must pass a truth check against the rules. */
  llm?: { extract: LLMExtractor; enabled?: boolean; timeoutMs?: number; summaryLang?: 'en' };
}

/** What an LLM extractor sees about each slot. */
export interface SlotSpec {
  key: string;
  type: SlotType;
  description: string;
  options?: string[];
  multi?: boolean;
}

export interface LLMResult {
  /** Raw suggested values per slot key (validated and truth-checked by the kit). */
  values: Partial<Record<string, unknown>>;
  summary?: string;
  model?: string;
  error?: string;
}

export type LLMExtractor = (
  text: string,
  slots: SlotSpec[],
  ctx: { lang: LangCode; hint?: string; now: Date; summaryLang?: 'en' },
) => Promise<LLMResult>;

/** Identity helper for nice inference + type checking in config files. */
export function defineDomain(cfg: DomainConfig): DomainConfig {
  return cfg;
}
