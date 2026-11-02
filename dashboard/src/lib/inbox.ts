// The decision inbox: quick calls Jithin makes on the dashboard, stored in the artifact's own
// database (collection "inbox", one document per due item). Claude reads it, applies each call to
// the register, syncs to GitHub and marks the document applied. Absent outside claude.ai (the
// GitHub copy is read-only), so every caller handles `available: false`.
import { useEffect, useState } from 'react';

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
  appliedAt?: string;
  appliedNote?: string;
  decisionId?: string;
}

export interface Inbox {
  state: 'loading' | 'ready' | 'unavailable' | 'slow';
  canWrite: boolean;
  docs: Map<string, InboxDoc>;
  decide: (doc: Omit<InboxDoc, 'decidedAt' | 'decidedBy' | 'status'>) => Promise<void>;
  withdraw: (itemId: string) => Promise<void>;
  error: string | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type ClaudeGlobal = { use: (name: string) => Promise<any> };
const claudeGlobal = (): ClaudeGlobal | null => ((window as any).claude?.use ? ((window as any).claude as ClaudeGlobal) : null);

export function useInbox(): Inbox {
  const [state, setState] = useState<Inbox['state']>('loading');
  const [docs, setDocs] = useState<Map<string, InboxDoc>>(new Map());
  const [canWrite, setCanWrite] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [api, setApi] = useState<{ db: any; uid: string | null } | null>(null);

  useEffect(() => {
    let unsub: (() => void) | null = null;
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
    };
  }, []);

  const decide: Inbox['decide'] = async (d) => {
    if (!api) return;
    setError(null);
    try {
      await api.db.collection('inbox').doc(d.itemId).set({ ...d, decidedAt: new Date().toISOString(), decidedBy: api.uid, status: 'waiting' });
    } catch (e: any) {
      setError(e?.code === 'invalid_argument' ? 'Only the dashboard owner can record decisions.' : 'The decision was not saved; try again.');
    }
  };
  const withdraw: Inbox['withdraw'] = async (itemId) => {
    if (!api) return;
    try {
      await api.db.collection('inbox').doc(itemId).delete();
    } catch {
      setError('The decision was not withdrawn; try again.');
    }
  };
  return { state, canWrite, docs, decide, withdraw, error };
}
