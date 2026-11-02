import { createContext, useContext } from 'react';
import type { Audience, Register } from './types';
import type { Derived } from './derive';
import type { Inbox } from './inbox';

export type View = 'pulse' | 'queue' | 'register' | 'board' | 'graph' | 'log' | 'catalogue' | 'scores' | 'changes';
export const VIEWS: View[] = ['pulse', 'queue', 'register', 'board', 'graph', 'catalogue', 'scores', 'changes', 'log'];

export interface LabState {
  reg: Register;
  derived: Map<string, Derived>;
  now: Date;
  view: View;
  selectedId: string | null;
  lastVisit: string | null; // ISO day of the previous visit, or null on first visit
  select: (id: string | null) => void;
  go: (view: View, id?: string | null) => void;
  queueFilter: string;
  setQueueFilter: (f: string) => void;
  audience: Audience;
  setAudience: (id: string) => void;
  hidden: (section: string) => boolean;
  visibleIdeas: Register['ideas'];
  previous: Register | null; // the latest earlier snapshot, when the history index lists one
  previousLabel: string | null;
  inbox: Inbox;
}

export const LabContext = createContext<LabState | null>(null);

export function useLab(): LabState {
  const v = useContext(LabContext);
  if (!v) throw new Error('LabContext missing');
  return v;
}

/** Hash routing: "#view" or "#view-VI-004" (plain names only; the viewer keeps anything else out). */
export function parseHash(hash: string): { view: View; id: string | null } {
  const raw = hash.replace(/^#/, '');
  if (!raw) return { view: 'pulse', id: null };
  const m = /^([a-z]+)(?:-(VI-\d{3}|CAP-\d{3}|T-\d{3}))?$/.exec(raw);
  if (!m) return { view: 'pulse', id: null };
  const view = (VIEWS as string[]).includes(m[1]) ? (m[1] as View) : 'pulse';
  return { view, id: m[2] ?? null };
}

export function toHash(view: View, id: string | null): string {
  return id ? `#${view}-${id}` : `#${view}`;
}

export const ALL_AUDIENCE: Audience = { id: 'jithin', name: 'Jithin', hide: [], hideFlaggedRows: false };
