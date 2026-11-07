import { describe, expect, it } from 'vitest';
import { jarvisDoc, localDay, visitDoc } from '../src/lib/usage';

describe('usage counters (TL-007)', () => {
  it('counts days, not page loads: two visits on one day share a document', () => {
    const a = visitDoc(new Date(2026, 10, 7, 9, 0));
    const b = visitDoc(new Date(2026, 10, 7, 23, 59));
    expect(a.id).toBe('visit-2026-11-07');
    expect(b.id).toBe(a.id);
    expect(a.data).toEqual({ kind: 'visit', date: '2026-11-07' });
  });
  it('uses the local calendar day', () => {
    expect(localDay(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05');
  });
  it('keeps one document per Jarvis conversation, with dates and how it started only', () => {
    const t = new Date(2026, 10, 7, 10, 0, 0, 1);
    const a = jarvisDoc(t, 'ask');
    const b = jarvisDoc(new Date(t.getTime() + 1), 'brief');
    expect(a.id).not.toBe(b.id);
    expect(a.id.startsWith('jarvis-2026-11-07-')).toBe(true);
    expect(Object.keys(a.data).sort()).toEqual(['date', 'how', 'kind']);
    expect(b.data.how).toBe('brief');
  });
});
