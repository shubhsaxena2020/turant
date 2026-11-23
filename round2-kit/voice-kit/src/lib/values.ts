// How each slot type is shown, spoken and written in English. Pure, locale-aware.
import type { DomainConfig, Fields, QtyItem, SlotDef, SlotValue } from '../domain/types';
import { tx, type LangCode } from './lang';
import { uiString } from '../i18n/ui';
import { formatINR, formatPhone, formatWhen, groupDigits, maskAccount, spokenDigits } from './format';
import { inEnglish } from './translit';

type Cfg = Pick<DomainConfig, 'slots' | 'strings'>;

const UNIT_SHOW: Record<string, string> = { kg: 'kg', g: 'g', L: 'L', ml: 'ml', packet: 'packet', dozen: 'dozen', pc: 'pc', bottle: 'bottle', box: 'box' };

function itemName(slot: SlotDef, item: string, lang: LangCode): string {
  if (slot.type !== 'quantity+unit') return item;
  const hit = slot.items?.find((i) => i.name['en-IN'] === item);
  return hit ? tx(hit.name, lang) : item;
}

function durationText(days: number, lang: LangCode, cfg?: Cfg): string {
  if (days < 1) return uiString(lang, 'dur_hours', cfg?.strings).replace('{n}', String(Math.max(1, Math.round(days * 24))));
  if (days === 1) return uiString(lang, 'dur_day', cfg?.strings);
  return uiString(lang, 'dur_days', cfg?.strings).replace('{n}', String(Math.round(days * 10) / 10));
}

/** A value as shown on screen in the user's language. */
export function showValue(slot: SlotDef, v: SlotValue, lang: LangCode, now: Date = new Date(), cfg?: Cfg): string {
  switch (slot.type) {
    case 'amount':
      return formatINR(Number(v));
    case 'datetime':
      return formatWhen(String(v), lang, now);
    case 'duration':
      return durationText(Number(v), lang, cfg);
    case 'phone':
      return formatPhone(String(v));
    case 'digits':
      return slot.mask ? maskAccount(String(v)) : slot.group4 === false ? String(v) : groupDigits(String(v));
    case 'enum': {
      const vals = Array.isArray(v) ? (v as string[]) : [String(v)];
      return vals.map((x) => tx(slot.options.find((o) => o.value === x)?.label ?? x, lang)).join(', ');
    }
    case 'number':
      return slot.format ? tx(slot.format, lang, { v: String(v) }) : String(v);
    case 'quantity+unit':
      return (v as QtyItem[]).map((it) => [it.qty, UNIT_SHOW[it.unit] ?? it.unit, itemName(slot, it.item, lang)].filter((x) => x !== '').join(' ')).join(', ');
    case 'yesno':
      return v ? tx(slot.yesLabel ?? uiString(lang, 'yes', cfg?.strings), lang) : tx(slot.noLabel ?? uiString(lang, 'no', cfg?.strings), lang);
    default:
      return String(v);
  }
}

/** A value as it should be spoken: IDs digit by digit in groups, UPI with "dot" / "at". */
export function speakValue(slot: SlotDef, v: SlotValue, lang: LangCode, now: Date = new Date(), cfg?: Cfg): string {
  switch (slot.type) {
    case 'phone':
      return spokenDigits(String(v));
    case 'digits':
      return slot.mask ? spokenDigits(String(v).slice(-4)) : spokenDigits(String(v));
    case 'upi':
      return String(v).replace(/\./g, ' dot ').replace('@', ' at ');
    default:
      return showValue(slot, v, lang, now, cfg);
  }
}

/** A value for English documents: English labels, transliterated names ("Ramesh (रमेश)"). */
export function englishValue(slot: SlotDef, v: SlotValue, now: Date = new Date(), cfg?: Cfg): string {
  switch (slot.type) {
    case 'name':
    case 'text':
      return inEnglish(String(v));
    case 'quantity+unit':
      return (v as QtyItem[])
        .map((it) => [it.qty, UNIT_SHOW[it.unit] ?? it.unit, inEnglish(itemName(slot, it.item, 'en-IN'))].filter((x) => x !== '').join(' '))
        .join(', ');
    default:
      return showValue(slot, v, 'en-IN', now, cfg);
  }
}

const slotByKey = (cfg: Pick<DomainConfig, 'slots'>, key: string) => cfg.slots.find((s) => s.key === key);

export function displayValue(cfg: Cfg, key: string, fields: Fields, lang: LangCode, now: Date = new Date()): string | undefined {
  const slot = slotByKey(cfg, key);
  const f = fields[key];
  return slot && f !== undefined ? showValue(slot, f.value, lang, now, cfg) : undefined;
}

export function spokenValue(cfg: Cfg, key: string, fields: Fields, lang: LangCode, now: Date = new Date()): string | undefined {
  const slot = slotByKey(cfg, key);
  const f = fields[key];
  return slot && f !== undefined ? speakValue(slot, f.value, lang, now, cfg) : undefined;
}

export function englishFieldValue(cfg: Cfg, key: string, fields: Fields, now: Date = new Date()): string | undefined {
  const slot = slotByKey(cfg, key);
  const f = fields[key];
  return slot && f !== undefined ? englishValue(slot, f.value, now, cfg) : undefined;
}
