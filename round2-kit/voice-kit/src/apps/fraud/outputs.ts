// Turant's outputs (1930 script, portal complaint, bank message, family message),
// ported from prototype/src/lib/outputs.ts to read the generic Entry.
import type { Entry, OutputCtx } from '../../domain/types';
import type { LangCode } from '../../lib/lang';
import { amountInWords, formatINR, formatPhone, formatWhen, groupDigits, maskAccount, portalDate, portalTime, spokenDigits } from '../../lib/format';
import { ft } from './strings';

export type ScamType = 'fake_kyc' | 'otp_shared' | 'fake_customer_care' | 'wrong_transfer' | 'qr_scan' | 'investment_task' | 'sextortion' | 'other';

const str = (e: Entry, k: string) => (e.fields[k] !== undefined ? String(e.fields[k]!.value) : undefined);
export const scamLabel = (lang: LangCode, type: string) => ft(lang, `scam_${type}`);

function suspectPhrase(e: Entry, lang: LangCode, spoken: boolean): string | undefined {
  const upi = str(e, 'suspectUpi');
  const phone = str(e, 'suspectPhone');
  const acct = str(e, 'suspectAccount');
  const parts: string[] = [];
  if (upi) parts.push(ft(lang, 'sus_upi', { v: spoken ? upi.replace(/\./g, ' dot ').replace('@', ' at ') : upi }));
  if (phone) parts.push(ft(lang, 'sus_phone', { v: spoken ? spokenDigits(phone) : formatPhone(phone) }));
  if (acct) parts.push(ft(lang, 'sus_account', { v: acct.slice(-4) }));
  return parts.length ? parts.join(', ') : undefined;
}

/** Four short lines to read to the 1930 operator, in the user's language. */
export function build1930Script(e: Entry, lang: LangCode, opts: { spoken?: boolean; now?: Date } = {}): string[] {
  const f = e.fields;
  const unknown = ft(lang, 'unknown');
  const amount = f.amount ? formatINR(Number(f.amount.value)) : unknown;
  const bank = str(e, 'bank') ?? unknown;
  const when = f.time ? formatWhen(String(f.time.value), lang, opts.now) : unknown;
  const scam = f.scamType ? scamLabel(lang, String(f.scamType.value)) : unknown;
  const utr = str(e, 'utr');
  const suspect = suspectPhrase(e, lang, !!opts.spoken);
  return [
    ft(lang, 'script1', { amount, bank }),
    ft(lang, 'script2', { when, scam }),
    utr ? ft(lang, 'script3', { utr: opts.spoken ? spokenDigits(utr) : groupDigits(utr) }) : ft(lang, 'script3none'),
    suspect ? ft(lang, 'script4', { suspect }) : ft(lang, 'script4none'),
  ];
}

const SCAM_STORY: Record<ScamType, string> = {
  fake_kyc: 'I received a call from a person who claimed to be from my bank and said my KYC had to be updated or my account would be blocked.',
  otp_shared: 'A person tricked me into sharing an OTP sent to my phone.',
  fake_customer_care: 'I contacted a fake customer care number, and the person asked me to make a payment or install a screen-sharing app.',
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

/** "A person..." -> "a person..." but keep the pronoun "I". */
const lowerFirst = (s: string) => (/^I\b/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));

/**
 * Incident description for the portal's free-text box. The portal needs at least
 * 200 characters and rejects # $ @ ^ * ~ | !, so UPI IDs stay in the suspect field only.
 */
export const PORTAL_BANNED = /[#$@^*~|!]/g;
export function buildPortalDescription(e: Entry): string {
  const f = e.fields;
  const amount = f.amount ? Number(f.amount.value) : undefined;
  const scam = (str(e, 'scamType') as ScamType | undefined) ?? 'other';
  const time = str(e, 'time');
  const utr = str(e, 'utr');
  const upi = str(e, 'suspectUpi');
  const phone = str(e, 'suspectPhone');
  const acct = str(e, 'suspectAccount');
  const bank = str(e, 'bank');
  const app = str(e, 'paymentApp');
  const sentences = [
    `I wish to report an online financial fraud.`,
    time ? `On ${portalDate(time)} at about ${portalTime(time)}, ${lowerFirst(SCAM_STORY[scam])}` : SCAM_STORY[scam],
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
export function buildComplaintText(e: Entry, now: Date = new Date()): string {
  const f = e.fields;
  const NA = 'Not known';
  const amount = f.amount ? Number(f.amount.value) : undefined;
  const scam = (str(e, 'scamType') as ScamType | undefined) ?? 'other';
  const time = str(e, 'time');
  const utr = str(e, 'utr');
  const upi = str(e, 'suspectUpi');
  const phone = str(e, 'suspectPhone');
  const acct = str(e, 'suspectAccount');
  const bank = str(e, 'bank');
  const app = str(e, 'paymentApp');
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
    buildPortalDescription(e),
  ];
  if (e.turns.length) lines.push('', "5. VICTIM'S OWN WORDS (voice transcript)", ...e.turns.map((x) => `"${x}"`));
  if (e.ack) lines.push('', pad('Acknowledgement no.') + e.ack);
  return lines.join('\n');
}

/** English message for the victim's bank (banks act on English). */
export function buildBankMessage(e: Entry): string {
  const f = e.fields;
  const amount = f.amount ? formatINR(Number(f.amount.value)) : 'money';
  const time = str(e, 'time');
  const scam = str(e, 'scamType') ?? 'other';
  const utr = str(e, 'utr');
  const upi = str(e, 'suspectUpi');
  const phone = str(e, 'suspectPhone');
  const acct = str(e, 'suspectAccount');
  const bank = str(e, 'bank') ?? 'Bank';
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
    `3. Note that I am reporting it on the 1930 helpline / cybercrime.gov.in${e.ack ? ` (acknowledgement no. ${e.ack})` : ''}.`,
    '',
    'Name:',
    'Account number (last 4 digits): XXXX',
    'Registered mobile:',
  ]
    .filter((l, i, arr) => !(l === '' && arr[i - 1] === ''))
    .join('\n');
}

export function buildFamilyMessage(e: Entry, ctx: Pick<OutputCtx, 'lang'>): string {
  const f = e.fields;
  const lang = ctx.lang;
  const amount = f.amount ? formatINR(Number(f.amount.value)) : ft(lang, 'unknown');
  const scam = f.scamType ? scamLabel(lang, String(f.scamType.value)) : ft(lang, 'unknown');
  return ft(lang, 'familyMsg', { amount, scam });
}

/** Above ₹1 lakh or older than 3 days: also visit the cyber police station. */
export function needsPoliceVisit(fields: Entry['fields'], now: Date = new Date()): boolean {
  const amount = Number(fields.amount?.value ?? 0);
  const t = fields.time ? new Date(String(fields.time.value)).getTime() : NaN;
  return amount > 100000 || (!Number.isNaN(t) && now.getTime() - t > 3 * 86_400_000);
}
