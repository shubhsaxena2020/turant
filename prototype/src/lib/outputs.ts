// Everything the Action screen hands the victim. Built fully offline from the fields.
import type { FieldKey, LangCode, ScamType } from './extract';
import type { Fields, Report } from './report';
import { scamLabel, t } from '../i18n/strings';
import {
  amountInWords,
  formatINR,
  formatPhone,
  formatWhen,
  groupDigits,
  maskAccount,
  portalDate,
  portalTime,
  spokenDigits,
} from './format';

const str = (f: Fields, k: FieldKey) => (f[k] !== undefined ? String(f[k]!.value) : undefined);

/** Human-readable value for a field card, in the user's language. */
export function displayValue(field: FieldKey, fields: Fields, lang: LangCode, now: Date = new Date()): string | undefined {
  const v = str(fields, field);
  if (v === undefined) return undefined;
  switch (field) {
    case 'amount':
      return formatINR(Number(v));
    case 'time':
      return formatWhen(v, lang, now);
    case 'scamType':
      return scamLabel(lang, v as ScamType);
    case 'utr':
      return groupDigits(v);
    case 'suspectPhone':
      return formatPhone(v);
    case 'suspectAccount':
      return maskAccount(v);
    default:
      return v;
  }
}

/** Value as it should be spoken: IDs digit by digit in groups of four. */
export function spokenValue(field: FieldKey, fields: Fields, lang: LangCode, now: Date = new Date()): string | undefined {
  const v = str(fields, field);
  if (v === undefined) return undefined;
  if (field === 'utr' || field === 'suspectPhone') return spokenDigits(v);
  if (field === 'suspectAccount') return spokenDigits(v.slice(-4));
  if (field === 'suspectUpi') return v.replace(/\./g, ' dot ').replace('@', ' at ');
  return displayValue(field, fields, lang, now);
}

function suspectPhrase(fields: Fields, lang: LangCode, spoken: boolean): string | undefined {
  const upi = str(fields, 'suspectUpi');
  const phone = str(fields, 'suspectPhone');
  const acct = str(fields, 'suspectAccount');
  const parts: string[] = [];
  if (upi) parts.push(t(lang, 'sus_upi', { v: spoken ? upi.replace(/\./g, ' dot ').replace('@', ' at ') : upi }));
  if (phone) parts.push(t(lang, 'sus_phone', { v: spoken ? spokenDigits(phone) : formatPhone(phone) }));
  if (acct) parts.push(t(lang, 'sus_account', { v: acct.slice(-4) }));
  return parts.length ? parts.join(', ') : undefined;
}

/** Four short lines to read to the 1930 operator, in the user's language. */
export function build1930Script(report: Report, lang: LangCode, opts: { spoken?: boolean; now?: Date } = {}): string[] {
  const f = report.fields;
  const unknown = t(lang, 'unknown');
  // unknown values must still read as a sentence: "Money was taken from my bank account", not "not known was taken"
  const amount = f.amount ? formatINR(Number(f.amount.value)) : t(lang, 'moneyWord');
  const bank = str(f, 'bank') ?? t(lang, 'bankWord');
  const when = f.time ? formatWhen(String(f.time.value), lang, opts.now) : undefined;
  const scam = f.scamType ? scamLabel(lang, f.scamType.value as ScamType) : unknown;
  const utr = str(f, 'utr');
  const suspect = suspectPhrase(f, lang, !!opts.spoken);
  return [
    t(lang, 'script1', { amount, bank }),
    // no time: keep only the "Type of fraud" sentence of script2
    when ? t(lang, 'script2', { when, scam }) : t(lang, 'script2', { when: '', scam }).split(/(?<=[.।])\s+/).slice(1).join(' '),
    utr ? t(lang, 'script3', { utr: opts.spoken ? spokenDigits(utr) : groupDigits(utr) }) : t(lang, 'script3none'),
    suspect ? t(lang, 'script4', { suspect }) : t(lang, 'script4none'),
  ];
}

const SCAM_STORY: Record<ScamType, string> = {
  fake_kyc: 'I received a call from a person who claimed to be from my bank and said my KYC had to be updated or my account would be blocked.',
  otp_shared: 'A person tricked me into sharing an OTP sent to my phone.',
  fake_customer_care: 'A person pretending to be customer care contacted me and asked me to make a payment or install an app.',
  wrong_transfer: 'A person claimed that money had been sent to me by mistake and asked me to return it or accept a refund request.',
  qr_scan: 'A person sent me a QR code saying I would receive money, and scanning it debited money from my account instead.',
  investment_task: 'I was offered an investment / part-time task job with high returns and was made to pay money.',
  sextortion: 'I am being blackmailed with an obscene video call / images and was forced to pay money.',
  other: 'I was cheated in an online payment fraud.',
};

const PORTAL_SUBCATEGORY: Record<ScamType, string> = {
  fake_kyc: 'Fraud Call / Vishing',
  otp_shared: 'Fraud Call / Vishing',
  fake_customer_care: 'Fraud Call / Vishing',
  wrong_transfer: 'UPI Related Frauds',
  qr_scan: 'UPI Related Frauds',
  investment_task: 'Online Investment / Task Fraud',
  sextortion: 'Online Financial Fraud (Sextortion)',
  other: 'UPI Related Frauds',
};

/** Fake customer care, told the way it happened: who contacted whom, and the remote-access app if one was named. */
function customerCareStory(said: string): string {
  const s = said.toLowerCase();
  const app = /any ?desk|एनी ?डेस्क/.test(s) ? 'the screen-sharing app AnyDesk' : /team ?viewer|टीम ?व्यूअर/.test(s) ? 'the screen-sharing app TeamViewer' : /rust ?desk/.test(s) ? 'the screen-sharing app RustDesk' : /quick ?support/.test(s) ? 'the screen-sharing app QuickSupport' : /screen ?shar|स्क्रीन शेयर/.test(s) ? 'a screen-sharing app' : undefined;
  const searched = /\b(searched|google|googled|online search|found (the|their|a) number|internet)\b|search kiya|सर्च|गूगल/.test(s);
  const start = searched ? 'I called a customer care number I found online, and the person' : 'A person pretending to be customer care contacted me and';
  return app ? `${start} made me install ${app}.` : `${start} asked me to make a payment or install an app.`;
}

/** "A person..." -> "a person..." but keep the pronoun "I". */
const lowerFirst = (s: string) => (/^I\b/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));

/**
 * Incident description for the portal's free-text box. The portal needs at least
 * 200 characters and rejects # $ @ ^ * ~ | !, so UPI IDs stay in the suspect field only.
 */
export const PORTAL_BANNED = /[#$@^*~|!]/g;
export function buildPortalDescription(report: Report): string {
  const f = report.fields;
  const amount = f.amount ? Number(f.amount.value) : undefined;
  const scam = (f.scamType?.value as ScamType | undefined) ?? 'other';
  const time = f.time ? String(f.time.value) : undefined;
  const utr = str(f, 'utr');
  const upi = str(f, 'suspectUpi');
  const phone = str(f, 'suspectPhone');
  const acct = str(f, 'suspectAccount');
  const bank = str(f, 'bank');
  const app = str(f, 'paymentApp');
  const story = scam === 'fake_customer_care' ? customerCareStory(report.turns.join(' ')) : SCAM_STORY[scam];
  const sentences = [
    `I wish to report an online financial fraud.`,
    time ? `On ${portalDate(time)} at about ${portalTime(time)}, ${lowerFirst(story)}` : story,
    amount !== undefined
      ? `An amount of Rs. ${amount} (Rupees ${amountInWords(amount)} only) was debited from my ${bank ?? 'bank'} account${app ? ` through ${app}` : ''} without my consent.`
      : `Money was debited from my ${bank ?? 'bank'} account without my consent.`,
    utr ? `The UTR or transaction ID is ${utr}.` : `I will add the UTR or transaction ID from the bank SMS.`,
    upi || phone || acct
      ? `The fraudster used ${[upi && 'the UPI ID given in the suspect details', phone && `mobile number ${phone}`, acct && `bank account ending ${maskAccount(acct).slice(-4)}`].filter(Boolean).join(', ')}.`
      : `I do not know the fraudster's details yet.`,
    `I request you to freeze the amount in the beneficiary account and help me get my money back.`,
  ];
  let text = sentences.join(' ').replace(PORTAL_BANNED, '').replace(/\s{2,}/g, ' ').trim();
  if (text.length < 200) text += ' I did not share this payment willingly and came to know of the fraud only after the debit. Kindly take urgent action.';
  return text;
}

/** English complaint laid out like the cybercrime.gov.in "Financial Fraud" form. */
export function buildComplaintText(report: Report, now: Date = new Date()): string {
  const f = report.fields;
  const NA = 'Not known';
  const amount = f.amount ? Number(f.amount.value) : undefined;
  const scam = (f.scamType?.value as ScamType | undefined) ?? 'other';
  const time = f.time ? String(f.time.value) : undefined;
  const utr = str(f, 'utr');
  const upi = str(f, 'suspectUpi');
  const phone = str(f, 'suspectPhone');
  const acct = str(f, 'suspectAccount');
  const bank = str(f, 'bank');
  const app = str(f, 'paymentApp');
  const hoursLate = time ? (now.getTime() - new Date(time).getTime()) / 3_600_000 : undefined;
  const sub = upi || app ? (scam === 'investment_task' || scam === 'sextortion' ? PORTAL_SUBCATEGORY[scam] : 'UPI Related Frauds') : PORTAL_SUBCATEGORY[scam];
  const pad = (label: string) => label + ': ';


  const lines = [
    'NATIONAL CYBER CRIME REPORTING PORTAL - FINANCIAL FRAUD COMPLAINT',
    '(cybercrime.gov.in  |  Helpline 1930)',
    '',
    '1. INCIDENT DETAILS',
    pad('Category of complaint') + 'Online Financial Fraud',
    pad('Sub-category') + sub,
    pad('Approx. date of incident') + (time ? portalDate(time) : NA),
    pad('Approx. time of incident') + (time ? portalTime(time) : NA),
    pad('Delay in reporting') + (hoursLate === undefined ? NA : hoursLate <= 24 ? 'No' : `Yes (about ${Math.round(hoursLate / 24)} day(s))`),
    '',
    '2. FRAUDULENT TRANSACTION DETAILS',
    pad('Bank / Wallet / Merchant') + (bank ?? NA),
    pad('Payment app') + (app ?? NA),
    pad('Transaction ID / UTR No.') + (utr ?? NA),
    pad('Date of transaction') + (time ? `${portalDate(time)} ${portalTime(time)}` : NA),
    pad('Amount (Rs.)') + (amount !== undefined ? `${amount} (${formatINR(amount)})` : NA),
    '',
    '3. SUSPECT DETAILS',
    pad('Suspect UPI ID') + (upi ?? NA),
    pad('Suspect mobile number') + (phone ?? NA),
    pad('Suspect bank account no.') + (acct ? maskAccount(acct) : NA),
    '',
    '4. INCIDENT DESCRIPTION',
    buildPortalDescription(report),
  ];
  if (report.turns.length) {
    lines.push('', "5. VICTIM'S OWN WORDS (voice transcript)", ...report.turns.map((x) => `"${x}"`));
  }
  if (report.ack) lines.push('', pad('Acknowledgement no.') + report.ack);
  return lines.join('\n');
}

/** English message for the victim's bank (banks act on English). */
export function buildBankMessage(report: Report): string {
  const f = report.fields;
  const amount = f.amount ? formatINR(Number(f.amount.value)) : 'money';
  const time = f.time ? String(f.time.value) : undefined;
  const scam = (f.scamType?.value as ScamType | undefined) ?? 'other';
  const utr = str(f, 'utr');
  const upi = str(f, 'suspectUpi');
  const phone = str(f, 'suspectPhone');
  const acct = str(f, 'suspectAccount');
  const bank = str(f, 'bank') ?? 'Bank';
  const label = scamLabel('en-IN', scam);
  const beneficiary = [upi && `UPI ID ${upi}`, phone && `mobile ${phone}`, acct && `account ${maskAccount(acct)}`].filter(Boolean).join(', ');
  return [
    `To: Customer Care / Branch Manager, ${bank}`,
    `Subject: Unauthorised debit of ${amount} - fraud - please block and raise dispute`,
    '',
    'Dear Sir/Madam,',
    `${amount} was debited from my account${time ? ` on ${portalDate(time)} at about ${portalTime(time)}` : ''} in an online fraud (${label}).`,
    utr ? `UTR / Transaction ID: ${utr}.` : 'UTR / Transaction ID: I will share it from the SMS.',
    beneficiary ? `Beneficiary: ${beneficiary}.` : '',
    'I did not authorise this transaction. Please:',
    '1. Block my UPI / debit card and net banking immediately.',
    '2. Raise a fraud dispute and request the beneficiary bank to freeze the amount.',
    `3. Note that I am reporting it on the 1930 helpline / cybercrime.gov.in${report.ack ? ` (acknowledgement no. ${report.ack})` : ''}.`,
    '',
    'Name:',
    'Account number (last 4 digits): XXXX',
    'Registered mobile:',
  ]
    .filter((l, i, arr) => !(l === '' && arr[i - 1] === ''))
    .join('\n');
}

export function buildFamilyMessage(report: Report, lang: LangCode): string {
  const f = report.fields;
  // unknown values: "I lost money in an online fraud.", not "I lost not known … (not known)"
  const money = t(lang, 'moneyWord');
  const amount = f.amount ? formatINR(Number(f.amount.value)) : money.charAt(0).toLowerCase() + money.slice(1);
  const scam = f.scamType ? scamLabel(lang, f.scamType.value as ScamType) : '';
  return t(lang, 'familyMsg', { amount, scam }).replace(/\s*\(\)/, '');
}

export function whatsappLink(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/** Spoken review summary in the user's language. */
export function buildSpokenSummary(report: Report, lang: LangCode, now: Date = new Date()): string {
  const keys: FieldKey[] = ['amount', 'time', 'scamType', 'bank', 'paymentApp', 'utr', 'suspectUpi', 'suspectPhone', 'suspectAccount'];
  const parts = [t(lang, 'summaryIntro')];
  for (const k of keys) {
    const v = spokenValue(k, report.fields, lang, now);
    if (v) parts.push(`${t(lang, `f_${k}` as never)}: ${v}.`);
  }
  parts.push(t(lang, 'isThisRight'));
  return parts.join(' ');
}
