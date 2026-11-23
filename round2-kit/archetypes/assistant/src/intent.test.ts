import { describe, expect, it } from 'vitest';
import { missing, needsFamilyOk, parse, parseAmount, parseRoute, uberLink } from './intent';

describe('intents', () => {
  it('Bengali cab request with route', () => {
    const p = parse('পার্ক স্ট্রিট থেকে হাওড়া স্টেশন যাব, একটা ট্যাক্সি ডাকো');
    expect(p.intent).toBe('book_cab');
    expect(p.pickup).toBe('পার্ক স্ট্রিট');
    expect(p.drop).toContain('হাওড়া স্টেশন');
  });
  it('Hindi cab request', () => {
    const p = parse('mujhe abhi Lake Town se Salt Lake sector 5 jana hai, cab book karo');
    expect(p.intent).toBe('book_cab');
    expect(p.pickup).toBe('lake town');
    expect(p.drop).toContain('salt lake sector 5');
    expect(p.when).toBe('now');
  });
  it('a destination alone is a cab request', () => {
    const p = parse('হাওড়া স্টেশন যাব');
    expect(p.intent).toBe('book_cab');
    expect(missing(p)).toEqual(['pickup']);
  });
  it('electricity bill in Bengali with amount', () => {
    const p = parse('কারেন্ট বিল জমা দিতে হবে, ১২৫০ টাকা');
    expect(p.intent).toBe('pay_bill');
    expect(p.billType).toBe('electricity');
    expect(p.amount).toBe(1250);
  });
  it('gas bill in Hindi without amount', () => {
    const p = parse('गैस का बिल भरना है');
    expect(p).toMatchObject({ intent: 'pay_bill', billType: 'gas' });
  });
  it('recharge with phone and amount', () => {
    const p = parse('9876543210 pe 299 ka recharge karo');
    expect(p).toMatchObject({ intent: 'recharge', amount: 299, phone: '9876543210' });
  });
  it('call family', () => {
    expect(parse('ছেলেকে ফোন করো')).toMatchObject({ intent: 'call', person: 'son' });
    expect(parse('beti ko phone karo')).toMatchObject({ intent: 'call', person: 'daughter' });
  });
  it('unknown speech asks for the intent', () => {
    expect(missing(parse('haan ji'))).toEqual(['intent']);
  });
});

describe('amounts and routes', () => {
  it('reads amount words', () => {
    expect(parseAmount('do hazaar paanch sau')).toBe(2500);
    expect(parseAmount('দুই হাজার টাকা')).toBe(2000);
    expect(parseAmount('₹1,250')).toBe(1250);
  });
  it('route parsing', () => {
    expect(parseRoute('Esplanade to Dum Dum airport')).toEqual({ pickup: 'esplanade', drop: 'dum dum airport' });
  });
});

describe('safety and hand-off', () => {
  it('family OK for bigger payments', () => {
    expect(needsFamilyOk({ intent: 'pay_bill', amount: 5000, confidence: 1 })).toBe(true);
    expect(needsFamilyOk({ intent: 'pay_bill', amount: 500, confidence: 1 })).toBe(false);
  });
  it('Uber link carries the destination', () => {
    const url = uberLink({ intent: 'book_cab', drop: 'Howrah Station', confidence: 1 });
    expect(url).toContain('m.uber.com/ul');
    expect(new URL(url).searchParams.get('dropoff[formatted_address]')).toBe('Howrah Station');
    expect(url).toContain('pickup=my_location');
  });
});
