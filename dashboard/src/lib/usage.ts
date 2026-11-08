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

import { localDay } from './day';
/** Local calendar day as YYYY-MM-DD (not UTC: a late-evening visit counts on the day it happened). */
export { localDay };

/** One document per day: repeat visits on the same day overwrite it, so the collection counts days, not loads. */
export function visitDoc(now: Date): { id: string; data: UsageDoc } {
  const date = localDay(now);
  return { id: `visit-${date}`, data: { kind: 'visit', date } };
}

/** One document per conversation started; the id carries the millisecond so two on one day stay distinct. */
export function jarvisDoc(now: Date, how: JarvisStart): { id: string; data: UsageDoc } {
  return { id: `jarvis-${localDay(now)}-${now.getTime().toString(36)}`, data: { kind: 'jarvis', date: localDay(now), how } };
}

/**
 * H5's once-per-conversation counter (audit S8). `count` is called after each answer Claude gives; the conversation
 * is marked counted only when `log` resolves true, and a write already in flight is not doubled. `reset` (Clear)
 * starts a new conversation.
 */
export function conversationCounter(log: (how: JarvisStart) => Promise<boolean>) {
  let counted = false;
  let inFlight = false;
  // A Clear during a write starts a new conversation; the old write must not mark the new one counted.
  let generation = 0;
  return {
    async count(how: JarvisStart): Promise<void> {
      if (counted || inFlight) return;
      inFlight = true;
      const gen = generation;
      let ok = false;
      try {
        ok = await log(how);
      } catch {
        ok = false;
      } finally {
        if (gen === generation) {
          counted = ok;
          inFlight = false;
        }
      }
    },
    reset() {
      generation++;
      counted = false;
      inFlight = false;
    },
    get counted() {
      return counted;
    },
  };
}
