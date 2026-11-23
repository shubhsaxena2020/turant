// Display + speech formatting helpers. Pure, locale-aware via Intl.

export function formatINR(n: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n);
}

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function below1000(n: number): string {
  const parts: string[] = [];
  if (n >= 100) {
    parts.push(ONES[Math.floor(n / 100)] + ' Hundred');
    n %= 100;
  }
  if (n >= 20) {
    parts.push(TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : ''));
  } else if (n > 0) {
    parts.push(ONES[n]);
  }
  return parts.join(' ');
}

/** Indian-system English words: 250000 -> "Two Lakh Fifty Thousand". */
export function amountInWords(amount: number): string {
  let n = Math.floor(amount);
  if (n === 0) return 'Zero';
  const parts: string[] = [];
  const crore = Math.floor(n / 1e7);
  n %= 1e7;
  const lakh = Math.floor(n / 1e5);
  n %= 1e5;
  const thousand = Math.floor(n / 1000);
  n %= 1000;
  if (crore) parts.push(amountInWords(crore) + ' Crore');
  if (lakh) parts.push(below1000(lakh) + ' Lakh');
  if (thousand) parts.push(below1000(thousand) + ' Thousand');
  if (n) parts.push(below1000(n));
  return parts.join(' ');
}

export function groupDigits(digits: string, size = 4): string {
  return (digits.match(new RegExp(`.{1,${size}}`, 'g')) ?? []).join(' ');
}

/** For speech: "456789012345" -> "4 5 6 7, 8 9 0 1, 2 3 4 5". */
export function spokenDigits(digits: string, size = 4): string {
  return (digits.match(new RegExp(`.{1,${size}}`, 'g')) ?? []).map((g) => g.split('').join(' ')).join(', ');
}

export function formatPhone(d: string): string {
  return d.length === 10 ? `${d.slice(0, 5)} ${d.slice(5)}` : d;
}

/** Only the last 4 digits of any account number are ever shown. */
export function maskAccount(d: string): string {
  const digits = d.replace(/\D/g, '');
  return 'XXXX' + digits.slice(-4);
}

export function formatDateTime(iso: string, lang: string): string {
  const d = new Date(iso);
  try {
    return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).format(d);
  } catch {
    return d.toLocaleString();
  }
}

export function formatRelative(iso: string, lang: string, now: Date = new Date()): string {
  const diff = (new Date(iso).getTime() - now.getTime()) / 1000;
  try {
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
    const abs = Math.abs(diff);
    if (abs < 60) return rtf.format(0, 'minute');
    if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute');
    if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
    return rtf.format(Math.round(diff / 86400), 'day');
  } catch {
    return '';
  }
}

/** "21 Nov, 11:50 am (10 minutes ago)" in the user's language. */
export function formatWhen(iso: string, lang: string, now: Date = new Date()): string {
  const abs = formatDateTime(iso, lang);
  const recent = Math.abs(now.getTime() - new Date(iso).getTime()) < 2 * 86_400_000;
  return recent ? `${abs} (${formatRelative(iso, lang, now)})` : abs;
}

/** Portal style: 21/11/2026 and 11:50 AM. */
export function portalDate(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function portalTime(iso: string): string {
  const d = new Date(iso);
  let h = d.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${ampm}`;
}

/** Value for datetime-local inputs in local time. */
export function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}
