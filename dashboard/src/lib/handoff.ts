// One-shot view presets passed between views (TL-007 maintenance, 2026-11-07): "awaiting your accept" on the
// command center opens the Log with the Pending filter on. Read once by the receiving view, then cleared.
import type { Decision } from './types';

let logStatus: 'proposed' | null = null;

export function presetLogPending(): void {
  logStatus = 'proposed';
}

export function takeLogPreset(): 'proposed' | null {
  const v = logStatus;
  logStatus = null;
  return v;
}

/** A decision line waiting for Jithin's accept: the same test the Log's Pending filter uses. */
export function awaitingAccept(d: Pick<Decision, 'status' | 'pending'>): boolean {
  return (d.status ?? (d.pending ? 'proposed' : 'accepted')) === 'proposed';
}
