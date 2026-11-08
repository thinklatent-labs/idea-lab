// The decision inbox: quick calls Jithin makes on the dashboard, stored in the artifact's own
// database (collection "inbox", one document per due item). Claude reads it, applies each call to
// the register, syncs to GitHub and marks the document applied. Absent outside claude.ai (the
// GitHub copy is read-only), so every caller handles `available: false`.
import { useEffect, useState } from 'react';
import { jarvisDoc, visitDoc, type JarvisStart } from './usage';

export type InboxStatus = 'waiting' | 'applied' | 'needs-chat';

export interface InboxDoc {
  itemId: string;
  ideaId: string;
  itemText: string;
  optionId: string;
  optionLabel: string;
  effect: string;
  decidedAt: string;
  decidedBy: string | null;
  status: InboxStatus;
  /** "request": a request for the next lab chat that Jarvis drafted and Jithin queued; never applied as a quick call. */
  kind?: 'quick' | 'request';
  /** Where the card was confirmed: on the page, or from a Jarvis proposal (H5, TL-007 2026-11-07). Absent on cards before 2026-11-07. */
  via?: 'page' | 'jarvis';
  appliedAt?: string;
  appliedNote?: string;
  decisionId?: string;
}

export interface Inbox {
  state: 'loading' | 'ready' | 'unavailable' | 'slow';
  canWrite: boolean;
  docs: Map<string, InboxDoc>;
  decide: (doc: Omit<InboxDoc, 'decidedAt' | 'decidedBy' | 'status'>) => Promise<boolean>;
  request: (ideaId: string | null, text: string, via?: InboxDoc['via']) => Promise<boolean>;
  /** Count a Jarvis conversation the owner started (H5). Resolves true only when the write landed; never throws. */
  logJarvis: (how: JarvisStart) => Promise<boolean>;
  withdraw: (itemId: string) => Promise<void>;
  error: string | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type ClaudeGlobal = { use: (name: string) => Promise<any> };
const claudeGlobal = (): ClaudeGlobal | null => ((window as any).claude?.use ? ((window as any).claude as ClaudeGlobal) : null);

/**
 * Whether a call may still be changed: absent or waiting. Claude marks applied calls `applied` and chat-bound ones
 * `needs-chat`; a stale tab must not reset or delete those (audit S9). Returns the refusal text, or null when open.
 */
export async function refusalFor(db: any, itemId: string): Promise<string | null> {
  const snap = await db.collection('inbox').doc(itemId).get();
  const cur = snap?.exists ? (snap.data() as InboxDoc) : null;
  if (!cur || cur.status === 'waiting') return null;
  return cur.status === 'applied' ? `Claude already applied this call${cur.decisionId ? ` (${cur.decisionId})` : ''}; change it in a lab chat.` : 'This call was sent to a lab chat; change it there.';
}

/** Write one Jarvis conversation to usage (H5); true only when the write landed. */
export async function writeJarvisUsage(db: any, how: JarvisStart, now = new Date()): Promise<boolean> {
  const j = jarvisDoc(now, how);
  try {
    await db.collection('usage').doc(j.id).set(j.data);
    return true;
  } catch {
    return false;
  }
}

export function useInbox(): Inbox {
  const [state, setState] = useState<Inbox['state']>('loading');
  const [docs, setDocs] = useState<Map<string, InboxDoc>>(new Map());
  const [canWrite, setCanWrite] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [api, setApi] = useState<{ db: any; uid: string | null } | null>(null);

  useEffect(() => {
    let unsub: (() => void) | null = null;
    let offVisit: (() => void) | null = null;
    let alive = true;
    let timer: number | undefined;
    const start = async () => {
      // window.claude appears asynchronously; give it a moment before deciding it is absent
      let c = claudeGlobal();
      for (let n = 0; !c && n < 20; n++) {
        await new Promise((r) => setTimeout(r, 150));
        c = claudeGlobal();
      }
      if (!c) return alive && setState('unavailable');
      const [db, user] = await Promise.all([c.use('db'), c.use('user')]);
      if (!alive) return;
      if (!db) return setState('unavailable');
      const uid = user ? await user.id() : null;
      const write = user ? await user.canEdit() : false;
      if (!alive) return;
      setCanWrite(!!write);
      setApi({ db, uid });
      // H1: one document per day the owner opens the page (TL-007, 2026-11-07). Owner only; best-effort, never blocks the page.
      // A tab left open past midnight logs the new day when it is next looked at.
      if (write) {
        let day = '';
        const logVisit = () => {
          const v = visitDoc(new Date());
          if (v.id === day || document.visibilityState === 'hidden') return;
          day = v.id;
          db.collection('usage').doc(v.id).set(v.data).catch(() => undefined);
        };
        logVisit();
        document.addEventListener('visibilitychange', logVisit);
        offVisit = () => document.removeEventListener('visibilitychange', logVisit);
      }
      timer = window.setTimeout(() => alive && setState((s) => (s === 'loading' ? 'slow' : s)), 10000);
      unsub = db.collection('inbox').onSnapshot(
        (snap: any) => {
          const m = new Map<string, InboxDoc>();
          for (const d of snap.docs) if (d.exists) m.set(d.id, d.data() as InboxDoc);
          setDocs(m);
          if (!snap.metadata.fromCache) {
            window.clearTimeout(timer);
            setState('ready');
          }
        },
        (e: any) => {
          window.clearTimeout(timer);
          setError(e?.code === 'revoked' ? null : `The decision inbox stopped answering (${e?.code ?? 'error'}).`);
          setState('unavailable');
        },
      );
    };
    start().catch(() => alive && setState('unavailable'));
    return () => {
      alive = false;
      window.clearTimeout(timer);
      unsub?.();
      offVisit?.();
    };
  }, []);

  /**
   * Refuse to change a call Claude has already applied or sent to a chat (audit S9). The db has no conditional
   * write, so this reads the live document first: a stale tab showing "Change" or "Withdraw" can no longer
   * reset an applied call to waiting or delete its audit record.
   */
  const stillOpen = async (itemId: string): Promise<boolean> => {
    const refusal = await refusalFor(api!.db, itemId);
    if (refusal) setError(refusal);
    return !refusal;
  };

  const decide: Inbox['decide'] = async (d) => {
    if (!api) return false;
    setError(null);
    try {
      if (!(await stillOpen(d.itemId))) return false;
      await api.db.collection('inbox').doc(d.itemId).set({ kind: 'quick', via: 'page', ...d, decidedAt: new Date().toISOString(), decidedBy: api.uid, status: 'waiting' });
      return true;
    } catch (e: any) {
      setError(e?.code === 'invalid_argument' ? 'Only the dashboard owner can record decisions.' : 'The decision was not saved; try again.');
      return false;
    }
  };
  const request: Inbox['request'] = async (ideaId, text, via = 'page') => {
    if (!api) return false;
    setError(null);
    const itemId = `REQ-${Date.now().toString(36)}`;
    try {
      await api.db.collection('inbox').doc(itemId).set({
        kind: 'request',
        via,
        itemId,
        ideaId: ideaId ?? '',
        itemText: text,
        optionId: 'request',
        optionLabel: 'Request for the next lab chat',
        effect: `needs-chat: ${text}`,
        decidedAt: new Date().toISOString(),
        decidedBy: api.uid,
        status: 'waiting',
      });
      return true;
    } catch {
      setError('The request was not queued; try again.');
      return false;
    }
  };
  const withdraw: Inbox['withdraw'] = async (itemId) => {
    if (!api) return;
    setError(null);
    try {
      if (!(await stillOpen(itemId))) return;
      await api.db.collection('inbox').doc(itemId).delete();
    } catch {
      setError('The decision was not withdrawn; try again.');
    }
  };
  const logJarvis: Inbox['logJarvis'] = async (how) => (api && canWrite ? writeJarvisUsage(api.db, how) : false);
  return { state, canWrite, docs, decide, request, withdraw, logJarvis, error };
}
