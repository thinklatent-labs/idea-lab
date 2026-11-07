// Usage counters for TL-007's pre-registered hypotheses (TL-007, 2026-11-07): H1 (weekly use) reads the days the owner opened the
// page, H5 (Jarvis use) reads the Jarvis conversations he started. Documents in the artifact's own database,
// collection "usage", written only for the owner. Dates and counts only: no text, no view, no row, no question.
// Measurement-only exception to TL-007's run-only rule until the 2026-12-01 review.

export type UsageKind = 'visit' | 'jarvis';
export type JarvisStart = 'ask' | 'brief';

export interface UsageDoc {
  kind: UsageKind;
  /** The owner's local calendar day, YYYY-MM-DD. */
  date: string;
  /** For Jarvis: how the conversation started. */
  how?: JarvisStart;
}

/** Local calendar day as YYYY-MM-DD (not UTC: a late-evening visit counts on the day it happened). */
export function localDay(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** One document per day: repeat visits on the same day overwrite it, so the collection counts days, not loads. */
export function visitDoc(now: Date): { id: string; data: UsageDoc } {
  const date = localDay(now);
  return { id: `visit-${date}`, data: { kind: 'visit', date } };
}

/** One document per conversation started; the id carries the millisecond so two on one day stay distinct. */
export function jarvisDoc(now: Date, how: JarvisStart): { id: string; data: UsageDoc } {
  return { id: `jarvis-${localDay(now)}-${now.getTime().toString(36)}`, data: { kind: 'jarvis', date: localDay(now), how } };
}
