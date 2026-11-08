// TL-007 maintenance pass (2026-11-07): one test group per audit finding fixed.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Audience, Register } from '../src/lib/types';
import { calendarDaysUntil, localDay } from '../src/lib/day';
import { daysBetween, deriveAll } from '../src/lib/derive';
import { appetiteState, buildingGate, evaluateRules, isScored } from '../src/lib/derive2';
import { whenText, buildDigest, briefPrompt } from '../src/jarvis/brain';
import { audienceRegister } from '../src/lib/audience';
import { awaitingAccept } from '../src/lib/handoff';
import { conversationCounter } from '../src/lib/usage';
import { refusalFor, writeJarvisUsage } from '../src/lib/inbox';
import { rollLastVisit } from '../src/lib/storage';
import { isTopLayer, pushLayer } from '../src/lib/layers';

const read = (rel: string) => JSON.parse(readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')) as Register;
const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x)) as T;
const base = read('./fixtures/register-v1.3.json');

// Day counts depend on the viewer's zone; pin it per test and restore after.
const ORIGINAL_TZ = process.env.TZ;
const inZone = (tz: string) => {
  process.env.TZ = tz;
};
afterEach(() => {
  if (ORIGINAL_TZ === undefined) delete process.env.TZ;
  else process.env.TZ = ORIGINAL_TZ;
});

describe('B1: day counts use the viewer\'s local calendar day', () => {
  it('a due date is "today" all day in US Eastern, including the morning', () => {
    inZone('America/New_York');
    const morning = new Date('2026-11-10T14:00:00Z'); // 09:00 ET on 10 Nov
    expect(calendarDaysUntil('2026-11-10', morning)).toBe(0);
    expect(whenText('2026-11-10', morning)).toBe('due today');
    const evening = new Date('2026-11-10T01:00:00Z'); // 20:00 ET on 9 Nov
    expect(localDay(evening)).toBe('2026-11-09');
    expect(whenText('2026-11-10', evening)).toBe('due tomorrow');
  });
  it('in India before 05:30 the day has already turned', () => {
    inZone('Asia/Kolkata');
    const early = new Date('2026-11-09T20:00:00Z'); // 01:30 IST on 10 Nov
    expect(localDay(early)).toBe('2026-11-10');
    expect(calendarDaysUntil('2026-11-10', early)).toBe(0);
    expect(calendarDaysUntil('2026-11-09', early)).toBe(-1);
  });
  it('a date that does not parse is never "due today"', () => {
    expect(Number.isNaN(calendarDaysUntil('soon', new Date()))).toBe(true);
    expect(whenText('soon', new Date())).toBe('due soon');
    expect(daysBetween('not-a-day', new Date())).toBe(0);
    const i = clone(base.ideas[0]);
    i.appetiteEnds = 'later';
    expect(appetiteState(i, new Date())).toBeNull();
  });
  it('counts whole calendar days, not floored hours (3 days away reads 3)', () => {
    inZone('Asia/Kolkata');
    const t = new Date('2026-11-07T13:00:00Z'); // 18:30 IST
    expect(calendarDaysUntil('2026-11-10', t)).toBe(3);
    expect(daysBetween('2026-11-04', t)).toBe(3);
  });
  it('R-11 does not call a step due today overdue in US Eastern', () => {
    inZone('America/New_York');
    const reg = clone(base);
    const idea = reg.ideas.find((i) => i.stage !== 'Killed' && i.stage !== 'Graduated')!;
    idea.nextStepDue = '2026-11-10';
    const now = new Date('2026-11-10T14:00:00Z');
    const hits = evaluateRules(reg, deriveAll(reg, now), now).filter((h) => h.ruleId === 'R-11' && h.ideaId === idea.id);
    expect(hits.every((h) => h.level !== 'alert')).toBe(true);
  });
  it("Jarvis's digest and brief name the viewer's own day", () => {
    inZone('America/New_York');
    const now = new Date('2026-11-10T01:00:00Z'); // Mon 9 Nov, 20:00 ET
    const digest = buildDigest({ reg: base, derived: deriveAll(base, now), now, inbox: new Map(), lastVisit: null, visibleIdeas: base.ideas });
    expect(digest).toContain('Today is 2026-11-09 (Monday)');
    expect(briefPrompt('x', now, null)).toContain('Monday 9 Nov');
  });
});

describe('B2: a composite without criteria counts as scored', () => {
  it('counts composite-only rows and still skips unscored ones', () => {
    const i = clone(base.ideas[0]);
    i.score = { composite: 3.75, status: 'set', criteria: null };
    expect(isScored(i)).toBe(true);
    i.score = { composite: null, status: 'none', criteria: null };
    expect(isScored(i)).toBe(false);
  });
});

describe('S4: audience presets filter the register once', () => {
  const enterprise: Audience = { id: 'enterprise', name: 'Enterprise', hide: ['rubric', 'decisions', 'sessions', 'killCriteria', 'hypotheses', 'openQuestions', 'links', 'flags', 'audit'], hideFlaggedRows: true };
  it('drops flagged rows and everything that points at them', () => {
    const reg = clone(base);
    const flagged = reg.ideas[1];
    flagged.sensitivity = 'flagged';
    const team: Audience = { id: 'team', name: 'Team', hide: [], hideFlaggedRows: true };
    const v = audienceRegister(reg, team);
    expect(v.ideas.some((i) => i.id === flagged.id)).toBe(false);
    expect(v.decisions.some((d) => d.ideaId === flagged.id)).toBe(false);
    expect(v.links.some((l) => l.fromId === flagged.id || l.toId === flagged.id)).toBe(false);
    expect(v.sessions.some((s) => (s.ideaIds ?? []).includes(flagged.id))).toBe(false);
    expect(v.capabilities.some((c) => (c.reusedByIds ?? []).includes(flagged.id))).toBe(false);
  });
  it('strips hidden sections so no view or Jarvis tool can read them', () => {
    const v = audienceRegister(clone(base), enterprise);
    expect(v.decisions).toEqual([]);
    expect(v.sessions).toEqual([]);
    expect(v.links).toEqual([]);
    expect(v.rules).toEqual([]);
    for (const i of v.ideas) {
      expect(i.score.composite).toBeNull();
      expect(i.hypotheses).toBeUndefined();
      expect(i.killCriteria).toBeUndefined();
      expect(i.decisionsDue).toEqual([]);
    }
  });
  it('does not invent quiet rows when the decision log is hidden', () => {
    const now = new Date('2026-11-07T12:00:00Z');
    const v = audienceRegister(clone(base), enterprise);
    for (const d of deriveAll(v, now).values()) expect(d.reasons.some((r) => r.kind === 'quiet')).toBe(false);
  });
  it('filters the diff snapshot the same way, so Changes shows no hidden scores', () => {
    const a = audienceRegister(clone(base), enterprise);
    const b = audienceRegister(clone(read('./fixtures/2026-11-01T1805.json')), enterprise);
    for (const i of [...a.ideas, ...b.ideas]) expect(i.score.composite).toBeNull();
    expect(b.links).toEqual([]);
  });
  it('keeps a row flagged since the snapshot out of the snapshot too', () => {
    const team: Audience = { id: 'team', name: 'Team', hide: [], hideFlaggedRows: true };
    const id = base.ideas[1].id;
    const old = audienceRegister(clone(base), team, [id]);
    expect(old.ideas.some((i) => i.id === id)).toBe(false);
  });
  it("leaves Jithin's view untouched", () => {
    const jithin: Audience = { id: 'jithin', name: 'Jithin', hide: [], hideFlaggedRows: false };
    expect(audienceRegister(base, jithin)).toBe(base);
  });
});

describe('S5: the Building gate follows D-152', () => {
  it('names an owner role, and reports the review slot as not recorded until the register has the field', () => {
    const i = clone(base.ideas.find((x) => x.id === 'TL-007')!);
    const g = buildingGate(i);
    expect(g.reviewSlot).toBe('not-recorded');
    expect(g.missing).not.toContain('a weekly review slot');
    i.buildingGate = { ownerNamed: true, streamNamed: true, appetiteSet: true, reviewSlot: null };
    expect(buildingGate(i).missing).toContain('a weekly review slot');
    i.buildingGate.reviewSlot = 'Thursday';
    expect(buildingGate(i).reviewSlot).toBe('set');
    i.owner = 'Jithin';
    expect(buildingGate(i).missing).toContain('an owner role');
  });
});

describe('S6: lines awaiting the accept use one test everywhere', () => {
  it('matches the Log filter: status first, then the pending flag', () => {
    expect(awaitingAccept({ status: 'proposed' })).toBe(true);
    expect(awaitingAccept({ pending: true })).toBe(true);
    expect(awaitingAccept({ status: 'accepted', pending: true })).toBe(false);
    expect(awaitingAccept({})).toBe(false);
  });
});

describe('S8: H5 counts a conversation once, only when the write lands', () => {
  it('does not mark a failed write as counted, and retries at the next answer', async () => {
    const results = [false, true];
    let calls = 0;
    const c = conversationCounter(async () => results[calls++]);
    await c.count('ask');
    expect(c.counted).toBe(false);
    await c.count('ask');
    expect(c.counted).toBe(true);
    await c.count('ask');
    expect(calls).toBe(2);
  });
  it('does not double-count while a write is in flight, and Clear starts a new conversation', async () => {
    let calls = 0;
    let release: (v: boolean) => void = () => undefined;
    const c = conversationCounter(() => {
      calls++;
      return new Promise<boolean>((r) => (release = r));
    });
    const first = c.count('brief');
    void c.count('brief');
    release(true);
    await first;
    expect(calls).toBe(1);
    c.reset();
    const again = c.count('ask');
    release(true);
    await again;
    expect(calls).toBe(2);
  });
  it('a Clear during a write starts a fresh conversation the old write cannot mark counted', async () => {
    const pending: ((v: boolean) => void)[] = [];
    const c = conversationCounter(() => new Promise<boolean>((r) => pending.push(r)));
    const old = c.count('ask');
    c.reset();
    pending[0](true);
    await old;
    expect(c.counted).toBe(false);
    const fresh = c.count('ask');
    pending[1](true);
    await fresh;
    expect(c.counted).toBe(true);
  });
  it('writeJarvisUsage reports a rejected write as false', async () => {
    const db = { collection: () => ({ doc: () => ({ set: () => Promise.reject(new Error('denied')) }) }) };
    expect(await writeJarvisUsage(db, 'ask')).toBe(false);
    const ok = { collection: () => ({ doc: () => ({ set: () => Promise.resolve() }) }) };
    expect(await writeJarvisUsage(ok, 'ask')).toBe(true);
  });
});

describe('S9: a stale tab cannot change an applied call', () => {
  const dbWith = (doc: unknown) => ({ collection: () => ({ doc: () => ({ get: async () => (doc ? { exists: true, data: () => doc } : { exists: false }) }) }) });
  it('allows an absent or waiting call and refuses applied or chat-bound ones', async () => {
    expect(await refusalFor(dbWith(null), 'TL-012-q3')).toBeNull();
    expect(await refusalFor(dbWith({ status: 'waiting' }), 'TL-012-q3')).toBeNull();
    expect(await refusalFor(dbWith({ status: 'applied', decisionId: 'D-174' }), 'TL-012-q3')).toContain('D-174');
    expect(await refusalFor(dbWith({ status: 'needs-chat' }), 'TL-012-q3')).toContain('lab chat');
  });
});

describe('N1: last visit is the previous day, stable across reloads', () => {
  let store: Map<string, string>;
  beforeEach(() => {
    store = new Map();
    (globalThis as unknown as { window: unknown }).window = { localStorage: { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v) } };
  });
  it('returns null on a first visit, then the previous day on every reload of a later day', () => {
    expect(rollLastVisit('2026-11-05')).toBeNull();
    expect(rollLastVisit('2026-11-05')).toBeNull();
    expect(rollLastVisit('2026-11-07')).toBe('2026-11-05');
    expect(rollLastVisit('2026-11-07')).toBe('2026-11-05');
    expect(rollLastVisit('2026-11-08')).toBe('2026-11-07');
  });
});

describe('Escape closes only the top overlay', () => {
  it('tracks the order overlays opened, whichever opened last is on top', () => {
    const dropJarvis = pushLayer('jarvis');
    const dropSheet = pushLayer('sheet');
    expect(isTopLayer('sheet')).toBe(true);
    expect(isTopLayer('jarvis')).toBe(false);
    dropSheet();
    expect(isTopLayer('jarvis')).toBe(true);
    dropJarvis();
    expect(isTopLayer('jarvis')).toBe(false);
  });
});
