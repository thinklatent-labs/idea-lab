// Jarvis: the lab's assistant. It answers through Claude on claude.ai (the artifact's `sample` capability, on
// Jithin's own account), reading the register digest and calling page tools: it can show any view or record, read a
// row in full, search the register, put a quick call in front of Jithin, and draft a request for the next lab chat.
// It proposes; Jithin decides: nothing reaches the decision inbox until he confirms a card. Off claude.ai (the GitHub
// copy) it still navigates by command, and says plainly that it cannot reach Claude there.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useLab } from '../lib/context';
import type { View } from '../lib/context';
import { VIEWS } from '../lib/context';
import { dueItems } from '../lib/types';
import { healthOf, buildingGate } from '../lib/derive2';
import { briefPrompt, buildDigest, forSpeech, rules, VIEW_NAMES } from './brain';
import { canSpeak, hush, speak } from './voice';
import type { OrbState } from './Orb';
import { conversationCounter } from '../lib/usage';

export type Tier = 'quick' | 'default' | 'complex';
export type Proposal =
  | { pid: string; type: 'quick'; ideaId: string; itemId: string; itemText: string; optionId: string; label: string; effect: string; why: string; state: 'open' | 'recorded' | 'dismissed' | 'failed' }
  | { pid: string; type: 'request'; ideaId: string | null; text: string; state: 'open' | 'queued' | 'dismissed' | 'failed' };

export interface JMsg {
  id: string;
  role: 'user' | 'jarvis';
  text: string;
  at: string;
  kind?: 'answer' | 'brief' | 'local' | 'notice';
  status?: 'thinking' | 'streaming' | 'done' | 'error' | 'stopped';
  tierApplied?: string;
  reads?: string[];
  error?: string;
  proposals?: Proposal[];
}

export interface JarvisApi {
  open: boolean;
  setOpen: (b: boolean) => void;
  toggle: () => void;
  msgs: JMsg[];
  busy: boolean;
  orb: OrbState;
  availability: 'checking' | 'ready' | 'unavailable' | 'blocked';
  tier: Tier;
  setTier: (t: Tier) => void;
  voice: boolean;
  setVoice: (b: boolean) => void;
  canSpeak: boolean;
  ask: (text: string) => void;
  brief: () => void;
  briefMsg: JMsg | null;
  stop: () => void;
  clear: () => void;
  listen: (text: string) => void;
  confirm: (msgId: string, pid: string) => Promise<void>;
  dismiss: (msgId: string, pid: string) => void;
}

const JarvisContext = createContext<JarvisApi | null>(null);
export const useJarvis = () => {
  const v = useContext(JarvisContext);
  if (!v) throw new Error('JarvisProvider missing');
  return v;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type SampleFn = ((input: any, opts?: any) => Promise<{ text: string; truncated: boolean; modelTierApplied: string }>) & { limits: () => Promise<any> };

const ERRORS: Record<string, string> = {
  not_granted: 'Jarvis needs your permission to use Claude on this page. Reload the page to be asked again.',
  sampling_disabled: 'Claude is not available to this account here, so Jarvis can only navigate.',
  not_declared: 'This copy of the dashboard was published without Claude access; republish it with the sample capability.',
  capability_disabled: 'Claude is switched off for this view, so Jarvis can only navigate.',
  rate_limited: 'Claude is busy for you right now (a usage or rate limit). Try again in a minute.',
  session_expired: 'Your claude.ai session expired. Sign in again, then ask.',
  refused: 'Claude declined that one. Ask it another way.',
  empty_completion: 'Claude returned nothing. Ask for less at a time.',
  prompt_too_large: 'The conversation is too long for one call. Clear it and ask again.',
  upstream_error: 'The connection to Claude broke off. Ask again.',
};
const BLOCKING = new Set(['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed']);

const uid = () => Math.random().toString(36).slice(2, 10);
const VIEW_WORDS: Record<string, View> = {
  command: 'pulse', home: 'pulse', pulse: 'pulse', center: 'pulse', centre: 'pulse', queue: 'queue', register: 'register', table: 'register', board: 'board', kanban: 'board', graph: 'graph', map: 'graph', catalogue: 'catalogue', catalog: 'catalogue', capabilities: 'catalogue', scores: 'scores', rubric: 'scores', changes: 'changes', diff: 'changes', log: 'log', decisions: 'log',
};
const VIEW_LABEL: Record<View, string> = { pulse: 'the command center', queue: 'the queue', register: 'the register', board: 'the board', graph: 'the graph', catalogue: 'the catalogue', scores: 'the scores', changes: 'the changes', log: 'the log' };

export function JarvisProvider({ children }: { children: ReactNode }) {
  const lab = useLab();
  const labRef = useRef(lab);
  labRef.current = lab;
  const [open, setOpenState] = useState(false);
  const [msgs, setMsgs] = useState<JMsg[]>([]);
  const msgsRef = useRef<JMsg[]>([]);
  msgsRef.current = msgs;
  const [busy, setBusy] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [availability, setAvailability] = useState<JarvisApi['availability']>('checking');
  const [tier, setTier] = useState<Tier>(() => (readPref('tier') as Tier) ?? 'quick');
  const [voice, setVoiceState] = useState<boolean>(() => readPref('voice') === '1');
  const [briefMsg, setBriefMsg] = useState<JMsg | null>(null);
  const sampleRef = useRef<SampleFn | null>(null);
  const toolsRef = useRef(false);
  const ctlRef = useRef<AbortController | null>(null);
  // H5: a conversation is counted once, when Claude first answers in it (a brief replayed from the page's cache counts,
  // a question that fails or is refused does not); Clear starts a new one. Marked counted only when the usage write
  // landed, so a conversation whose write failed is counted at its next answer (TL-007 maintenance, audit S8).
  const counterRef = useRef<ReturnType<typeof conversationCounter> | null>(null);
  if (!counterRef.current) counterRef.current = conversationCounter((how) => labRef.current.inbox.logJarvis(how));
  const countConversation = (how: 'ask' | 'brief') => counterRef.current!.count(how);

  useEffect(() => {
    let alive = true;
    (async () => {
      let c = (window as any).claude;
      for (let n = 0; !c?.use && n < 20; n++) {
        await new Promise((r) => setTimeout(r, 150));
        c = (window as any).claude;
      }
      if (!c?.use) return alive && setAvailability('unavailable');
      const s = (await c.use('sample').catch(() => null)) as SampleFn | null;
      if (!alive) return;
      if (!s) return setAvailability('unavailable');
      sampleRef.current = s;
      // A limits() call that never settles left Jarvis on "Connecting to Claude…" for good (audit N8).
      const lim = await Promise.race([s.limits().catch(() => null), new Promise<null>((r) => setTimeout(() => r(null), 8000))]);
      toolsRef.current = !!lim?.tools;
      if (alive) setAvailability('ready');
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => () => hush(), []);

  const patch = useCallback((id: string, fn: (m: JMsg) => JMsg) => {
    setMsgs((ms) => ms.map((m) => (m.id === id ? fn(m) : m)));
    setBriefMsg((b) => (b && b.id === id ? fn(b) : b));
  }, []);

  const say = useCallback(
    (text: string) => {
      speak(forSpeech(text), { start: () => setSpeaking(true), end: () => setSpeaking(false) });
    },
    [],
  );

  const digest = () => {
    const l = labRef.current;
    return buildDigest({ reg: l.reg, derived: l.derived, now: l.now, inbox: l.inbox.docs, lastVisit: l.lastVisit, visibleIdeas: l.visibleIdeas });
  };

  /** Commands Jarvis carries out on the page without Claude: "open TL-004", "show the board", a bare ID. */
  const localIntent = (text: string): string | null => {
    const l = labRef.current;
    const t = text.trim();
    const bare = /^(TL|CAP|T)-\d{3}$/i.exec(t);
    const m = bare ? [t, '', t] : /^(?:open|show(?: me)?|go to|take me to|pull up|bring up)\s+(?:the\s+)?(.+?)\s*[.!]?$/i.exec(t);
    if (!m) return null;
    const target = m[2].trim();
    const id = /^((?:TL|CAP|T)-\d{3})$/i.exec(target)?.[1]?.toUpperCase() ?? l.reg.ideas.find((i) => i.slug.toLowerCase() === target.toLowerCase() || (i.aliases ?? []).some((a) => a.toLowerCase() === target.toLowerCase()))?.id ?? null;
    if (id) {
      const known = l.reg.ideas.some((i) => i.id === id) || l.reg.capabilities.some((c) => c.id === id) || l.reg.themes.some((x) => x.id === id);
      if (!known) return `There is no ${id} in the register.`;
      l.go(l.view, id);
      const idea = l.reg.ideas.find((i) => i.id === id);
      return idea ? `Here is ${idea.id} ${idea.slug}: ${idea.stage}, next step ${idea.nextStep.charAt(0).toLowerCase()}${idea.nextStep.slice(1, 160)}${idea.nextStep.length > 160 ? '…' : ''}` : `Showing ${id}.`;
    }
    const v = VIEW_WORDS[target.toLowerCase().replace(/\s+view$/, '')];
    if (v) {
      l.go(v, null);
      return `Showing ${VIEW_LABEL[v]}.`;
    }
    return null;
  };

  const tools = (msgId: string) => {
    const l = () => labRef.current;
    const read = (s: string) => patch(msgId, (m) => ({ ...m, reads: [...(m.reads ?? []), s] }));
    return [
      {
        name: 'open_view',
        description: 'Show a view of the dashboard, optionally with one record open (a row TL-###, a capability CAP-### or a theme T-###). Returns what is now on screen.',
        inputSchema: { type: 'object', properties: { view: { type: 'string', enum: [...VIEW_NAMES] }, id: { type: 'string', description: 'TL-###, CAP-### or T-###; omit to show the view alone' } }, required: ['view'] },
        execute: (input: Record<string, unknown>) => {
          const view = String(input.view) as View;
          if (!VIEWS.includes(view)) throw new Error(`No view "${view}". Views: ${VIEWS.join(', ')}`);
          const id = input.id ? String(input.id).toUpperCase() : null;
          if (id && !l().reg.ideas.some((i) => i.id === id) && !l().reg.capabilities.some((c) => c.id === id) && !l().reg.themes.some((x) => x.id === id)) throw new Error(`No record ${id}`);
          l().go(view, id);
          read(`showed ${VIEW_LABEL[view]}${id ? ` with ${id}` : ''}`);
          return `Now showing ${VIEW_LABEL[view]}${id ? ` with ${id} open` : ''}.`;
        },
      },
      {
        name: 'get_idea',
        description: "One register row in full, as JSON: hypotheses, kill signals, open questions, phases, links in and out, the row's decisions and sessions, its health call and the Building gate.",
        inputSchema: { type: 'object', properties: { id: { type: 'string', description: 'TL-###' } }, required: ['id'] },
        execute: (input: Record<string, unknown>) => {
          const id = String(input.id).toUpperCase();
          const { reg, derived } = l();
          const i = reg.ideas.find((x) => x.id === id);
          if (!i) throw new Error(`No row ${id}`);
          read(`read ${id}`);
          const d = derived.get(id)!;
          const full = {
            ...i,
            derived: { daysInStage: d.daysInStage, daysUntouched: d.daysUntouched, stale: d.stale, reasons: d.reasons.map((r) => r.label), blockedBy: d.blockedBy, blocks: d.blocks },
            health: healthOf(reg, id),
            buildingGate: buildingGate(i),
            linksOut: reg.links.filter((k) => k.fromId === id).map((k) => `${k.type} → ${k.toId ?? k.toLabel}${k.note ? ` (${k.note})` : ''}`),
            linksIn: reg.links.filter((k) => k.toId === id).map((k) => `${k.fromId} ${k.type} →${k.note ? ` (${k.note})` : ''}`),
            decisions: reg.decisions.filter((x) => x.ideaId === id).map((x) => `${x.id ?? ''} ${x.date}: ${x.decision} (${x.by}${x.status === 'superseded' ? ', superseded' : ''})`),
            sessions: reg.sessions.filter((s) => (s.ideaIds ?? []).includes(id)).map((s) => `${s.date} ${s.mode} ${s.health ?? ''}: ${s.outcome}`),
          };
          const json = JSON.stringify(full);
          return json.length > 28000 ? `${json.slice(0, 28000)}… (cut)` : json;
        },
      },
      {
        name: 'search_register',
        description: 'Find rows, decisions, sessions and capabilities whose text mentions a word or phrase (case-insensitive). Returns up to 15 matching lines.',
        inputSchema: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] },
        execute: (input: Record<string, unknown>) => {
          const q = String(input.query).toLowerCase().trim();
          if (!q) throw new Error('Empty query');
          const { reg } = l();
          read(`searched “${String(input.query)}”`);
          const hits: string[] = [];
          for (const i of reg.ideas) if ([i.title, i.slug, i.nextStep, i.stageNote ?? '', ...(i.aliases ?? []), ...i.flags].join(' ').toLowerCase().includes(q)) hits.push(`row ${i.id} ${i.slug} (${i.stage}): ${i.title}`);
          for (const x of reg.decisions) if (x.decision.toLowerCase().includes(q)) hits.push(`decision ${x.id ?? ''} ${x.date} ${x.ideaId}: ${x.decision.slice(0, 200)}`);
          for (const c of reg.capabilities) if (`${c.name} ${c.reusedBy}`.toLowerCase().includes(q)) hits.push(`capability ${c.id} ${c.name} (${c.maturity}, demand ${c.demand})`);
          for (const s of reg.sessions) if (s.outcome.toLowerCase().includes(q)) hits.push(`session ${s.date} ${s.scope}: ${s.outcome.slice(0, 160)}`);
          return hits.length ? hits.slice(0, 15).join('\n') : 'No match.';
        },
      },
      {
        name: 'propose_quick_call',
        description: 'Put one quick call that is listed under "decisions due" in front of Jithin with the option you recommend, as a card he confirms or dismisses. Nothing is recorded until he confirms.',
        inputSchema: { type: 'object', properties: { itemId: { type: 'string', description: 'the due item id, e.g. TL-004-q2' }, optionId: { type: 'string' }, why: { type: 'string', description: 'one sentence' } }, required: ['itemId', 'optionId', 'why'] },
        execute: (input: Record<string, unknown>) => {
          const itemId = String(input.itemId);
          const { reg, inbox } = l();
          const idea = reg.ideas.find((i) => dueItems(i).some((x) => x.id === itemId));
          const item = idea ? dueItems(idea).find((x) => x.id === itemId) : null;
          if (!idea || !item) throw new Error(`No due item ${itemId}`);
          if (item.kind !== 'quick' || !item.options?.length) throw new Error(`${itemId} needs the chat; it is not a quick call`);
          const opt = item.options.find((o) => o.id === String(input.optionId));
          if (!opt) throw new Error(`${itemId} has no option ${String(input.optionId)}; options: ${item.options.map((o) => o.id).join(', ')}`);
          if (inbox.docs.has(itemId)) throw new Error(`Jithin already decided ${itemId} on the dashboard ("${inbox.docs.get(itemId)!.optionLabel}")`);
          const p: Proposal = { pid: uid(), type: 'quick', ideaId: idea.id, itemId, itemText: item.text, optionId: opt.id, label: opt.label, effect: opt.effect, why: String(input.why ?? ''), state: 'open' };
          patch(msgId, (m) => ({ ...m, proposals: [...(m.proposals ?? []), p] }));
          return 'Card shown. Jithin confirms or dismisses it; nothing is recorded yet.';
        },
      },
      {
        name: 'draft_request',
        description: 'Draft a request for the next lab chat (for example "move TL-009 to Shaping" or "book a Critic session on TL-004") as a card Jithin can queue. Queued requests are raised at the start of the next lab chat; nothing changes until then.',
        inputSchema: { type: 'object', properties: { ideaId: { type: 'string', description: 'TL-### it concerns, if one' }, text: { type: 'string', description: 'the request, one or two sentences, imperative' } }, required: ['text'] },
        execute: (input: Record<string, unknown>) => {
          const ideaId = input.ideaId ? String(input.ideaId).toUpperCase() : null;
          if (ideaId && !l().reg.ideas.some((i) => i.id === ideaId)) throw new Error(`No row ${ideaId}`);
          const p: Proposal = { pid: uid(), type: 'request', ideaId, text: String(input.text).slice(0, 600), state: 'open' };
          patch(msgId, (m) => ({ ...m, proposals: [...(m.proposals ?? []), p] }));
          return 'Request card shown. Jithin queues it or dismisses it.';
        },
      },
    ];
  };

  const run = async (msgId: string, input: any, opts: any, how: 'ask' | 'brief') => {
    const s = sampleRef.current!;
    const ctl = new AbortController();
    ctlRef.current = ctl;
    setBusy(true);
    try {
      const res = await s(input, {
        ...opts,
        signal: ctl.signal,
        onText: ({ text }: { text: string }) => patch(msgId, (m) => ({ ...m, text, status: 'streaming' })),
      });
      patch(msgId, (m) => ({ ...m, text: res.text, status: 'done', tierApplied: res.modelTierApplied, error: res.truncated ? 'Cut short; ask for less at a time.' : undefined }));
      if (voice) say(res.text);
      void countConversation(how);
    } catch (e: any) {
      const code: string = e?.code ?? 'upstream_error';
      if (code === 'cancelled') patch(msgId, (m) => ({ ...m, text: e?.text ?? m.text, status: 'stopped' }));
      else {
        if (BLOCKING.has(code)) setAvailability('blocked');
        patch(msgId, (m) => ({ ...m, text: code === 'refused' ? '' : (e?.text ?? m.text), status: 'error', error: ERRORS[code] ?? ERRORS.upstream_error }));
      }
    } finally {
      if (ctlRef.current === ctl) ctlRef.current = null;
      setBusy(false);
    }
  };

  const ask = (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    hush();
    setOpenState(true);
    const now = new Date().toISOString();
    const userMsg: JMsg = { id: uid(), role: 'user', text, at: now };
    const local = localIntent(text);
    if (local) {
      setMsgs((ms) => [...ms, userMsg, { id: uid(), role: 'jarvis', text: local, at: now, kind: 'local', status: 'done' }]);
      if (voice) say(local);
      return;
    }
    if (availability !== 'ready' || !sampleRef.current) {
      const why =
        availability === 'checking'
          ? 'Still connecting to Claude; ask again in a moment.'
          : availability === 'blocked'
            ? 'Claude is not available to Jarvis on this page any more (permission or account). I can still open views and rows: try "open TL-004" or "show the board".'
            : 'I answer through Claude on claude.ai, and this copy of the dashboard cannot reach it. I can still open views and rows: try "open TL-004" or "show the board".';
      setMsgs((ms) => [...ms, userMsg, { id: uid(), role: 'jarvis', text: why, at: now, kind: 'notice', status: 'done' }]);
      return;
    }
    const jm: JMsg = { id: uid(), role: 'jarvis', text: '', at: now, kind: 'answer', status: 'thinking', reads: [] };
    // The conversation the page keeps: instructions and digest first, then earlier answered turns, then this one.
    const history: { role: 'user' | 'assistant'; content: string }[] = [];
    const prior = msgsRef.current.filter((m) => m.role === 'user' || (m.kind === 'answer' && m.status === 'done' && m.text));
    for (let k = 0; k < prior.length; k++) {
      const m = prior[k];
      if (m.role === 'user' && prior[k + 1]?.role === 'jarvis') {
        history.push({ role: 'user', content: m.text }, { role: 'assistant', content: prior[k + 1].text });
        k++;
      }
    }
    const input = [{ role: 'user', content: rules(digest()) }, ...history.slice(-12), { role: 'user', content: text }];
    setMsgs((ms) => [...ms, userMsg, jm]);
    void run(jm.id, input, { modelTier: tier, cache: false, ...(toolsRef.current ? { tools: tools(jm.id) } : {}) }, 'ask');
  };

  const brief = () => {
    if (busy) return;
    hush();
    const now = new Date().toISOString();
    if (availability !== 'ready' || !sampleRef.current) {
      setOpenState(true);
      ask('Brief me');
      return;
    }
    const jm: JMsg = { id: uid(), role: 'jarvis', text: '', at: now, kind: 'brief', status: 'thinking' };
    setBriefMsg(jm);
    setMsgs((ms) => [...ms, { id: uid(), role: 'user', text: 'Brief me', at: now }, jm]);
    const l = labRef.current;
    // No tools, so the answer can be replayed for six hours while the register and inbox stay the same.
    void run(jm.id, briefPrompt(digest(), l.now, l.lastVisit), { modelTier: 'default', cache: { gcTime: 6 * 3600_000 } }, 'brief');
  };

  const confirm = async (msgId: string, pid: string) => {
    const m = msgsRef.current.find((x) => x.id === msgId);
    const p = m?.proposals?.find((x) => x.pid === pid);
    // A failed card can be tried again (audit S10).
    if (!p || (p.state !== 'open' && p.state !== 'failed')) return;
    const inbox = labRef.current.inbox;
    const ok = p.type === 'quick' ? await inbox.decide({ itemId: p.itemId, ideaId: p.ideaId, itemText: p.itemText, optionId: p.optionId, optionLabel: p.label, effect: p.effect, via: 'jarvis' }) : await inbox.request(p.ideaId, p.text, 'jarvis');
    patch(msgId, (mm) => ({ ...mm, proposals: mm.proposals?.map((x) => (x.pid === pid ? ({ ...x, state: ok ? (x.type === 'quick' ? 'recorded' : 'queued') : 'failed' } as Proposal) : x)) }));
  };
  const dismiss = (msgId: string, pid: string) => patch(msgId, (mm) => ({ ...mm, proposals: mm.proposals?.map((x) => (x.pid === pid ? ({ ...x, state: 'dismissed' } as Proposal) : x)) }));

  const stop = () => {
    ctlRef.current?.abort();
    hush();
    setSpeaking(false);
  };
  const clear = () => {
    stop();
    counterRef.current?.reset();
    setMsgs([]);
    setBriefMsg(null);
  };
  // Answers were written for one audience's register; switching "View as" must not leave them on screen (fix review 6).
  const audienceId = lab.audience.id;
  const firstAudience = useRef(audienceId);
  useEffect(() => {
    if (firstAudience.current === audienceId) return;
    firstAudience.current = audienceId;
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audienceId]);
  const setOpen = (b: boolean) => {
    setOpenState(b);
    if (!b) {
      hush();
      setSpeaking(false);
    }
  };
  const setVoice = (b: boolean) => {
    setVoiceState(b);
    writePref('voice', b ? '1' : '0');
    if (!b) {
      hush();
      setSpeaking(false);
    }
  };
  const setTierP = (t: Tier) => {
    setTier(t);
    writePref('tier', t);
  };

  const orb: OrbState = busy ? 'thinking' : speaking ? 'speaking' : 'idle';
  const api: JarvisApi = {
    open,
    setOpen,
    toggle: () => setOpen(!open),
    msgs,
    busy,
    orb,
    availability,
    tier,
    setTier: setTierP,
    voice,
    setVoice,
    canSpeak: canSpeak(),
    ask,
    brief,
    briefMsg,
    stop,
    clear,
    listen: say,
    confirm,
    dismiss,
  };
  const value = useMemo(() => api, [open, msgs, busy, orb, availability, tier, voice, briefMsg]); // eslint-disable-line react-hooks/exhaustive-deps
  return <JarvisContext.Provider value={value}>{children}</JarvisContext.Provider>;
}


function readPref(k: string): string | null {
  try {
    return window.localStorage.getItem(`lab-dashboard:jarvis:${k}`);
  } catch {
    return null;
  }
}
function writePref(k: string, v: string): void {
  try {
    window.localStorage.setItem(`lab-dashboard:jarvis:${k}`, v);
  } catch {
    /* per-viewer convenience only */
  }
}
