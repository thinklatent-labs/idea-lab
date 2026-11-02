import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Register, Idea } from '../src/lib/types';
import { alerts, attentionQueue, compositeWith, daysBetween, defaultMode, deriveAll, laneOf, readiness, sessionLine, stageCounts } from '../src/lib/derive';
import { layoutGraph, neighbourhood } from '../src/lib/graph';
import { parseHash, toHash } from '../src/lib/context';
import { fmtDate, fmtDateTime } from '../src/lib/format';

const reg = JSON.parse(readFileSync(fileURLToPath(new URL('./fixtures/register-v1.3.json', import.meta.url)), 'utf8')) as Register;
const NOW = new Date('2026-11-01T12:00:00Z');

function clone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x)) as T;
}

describe('dates', () => {
  it('counts whole days, never negative', () => {
    expect(daysBetween('2026-10-01', '2026-11-01')).toBe(31);
    expect(daysBetween('2026-11-02', '2026-11-01')).toBe(0);
    expect(daysBetween('2026-11-01T16:45:00+05:30', NOW)).toBe(0);
  });
  it('formats dates in the register\'s own offset', () => {
    expect(fmtDate('2026-11-01')).toBe('1 Nov 2026');
    expect(fmtDateTime('2026-11-01T16:45:00+05:30')).toBe('1 Nov 2026, 16:45 UTC+05:30');
  });
});

describe('composite', () => {
  it('matches the register for VAI on equal and proposed weights', () => {
    const vai = reg.ideas.find((i) => i.id === 'VI-004')!;
    expect(compositeWith(vai.score.criteria, reg.weights)).toBe(4);
    expect(compositeWith(vai.score.criteria, reg.proposedWeights!)).toBe(3.95);
  });
  it('is null unless all eight criteria are present', () => {
    expect(compositeWith({ strategicFit: 5 }, reg.weights)).toBeNull();
    expect(compositeWith(null, reg.weights)).toBeNull();
  });
});

describe('lanes and modes', () => {
  it('follows the Operating Model rule', () => {
    const base = reg.ideas.find((i) => i.id === 'VI-003')!;
    const at = (stage: Idea['stage'], type: Idea['type'] = 'Idea'): Idea => ({ ...clone(base), stage, type });
    expect(laneOf(at('Proposal'))).toBe('Next');
    expect(laneOf(at('Building'))).toBe('Now');
    expect(laneOf(at('Shipped'))).toBe('Now');
    expect(laneOf(at('Shaping'))).toBe('Next');
    expect(laneOf(at('Stress test'))).toBe('Next');
    expect(laneOf(at('Seed'))).toBe('Later');
    expect(laneOf(at('Parked'))).toBe('Later');
    expect(laneOf(at('Graduated'))).toBe('Graduated');
    expect(laneOf(at('Killed'))).toBe('Killed');
    expect(laneOf(at('Graduated', 'Capability'))).toBe('Capabilities');
  });
  it('picks the session mode by stage and writes the session line as the register spells it', () => {
    expect(defaultMode('Stress test')).toBe('Critic');
    expect(defaultMode('Proposal')).toBe('Spec');
    expect(sessionLine({ id: 'VI-004', slug: 'vai' }, 'Critic')).toBe('Lab session · VI-004 vai · Critic');
  });
});

describe('derive on the seed register', () => {
  const d = deriveAll(reg, NOW);
  it('flags decisions due and proposed scores as needing a decision', () => {
    expect(d.get('VI-004')!.needsDecision).toBe(true);
    expect(d.get('VI-003')!.needsDecision).toBe(true);
    expect(d.get('VI-001')!.needsDecision).toBe(false);
  });
  it('finds the dependency chain portal -> VAI', () => {
    expect(d.get('VI-003')!.blockedBy).toEqual(['VI-004']);
    expect(d.get('VI-004')!.blocks).toEqual(['VI-003']);
    expect(d.get('VI-004')!.blockedBy).toEqual([]); // self-healing is graduated
  });
  it('is not stale on the day of the snapshot', () => {
    for (const i of reg.ideas) expect(d.get(i.id)!.stale).toBe(false);
  });
  it('ranks the queue with decisions first and leaves settled rows out', () => {
    const q = attentionQueue(reg, d);
    expect(q[0].id).toBe('VI-004'); // three decisions due and a proposed score
    expect(q.slice(0, 3).map((i) => i.id)).toEqual(['VI-004', 'VI-003', 'VI-006']); // decisions due, then by weight
    expect(q.map((i) => i.id)).not.toContain('VI-001');
    expect(q.map((i) => i.id)).not.toContain('VI-002');
  });
  it('counts stages', () => {
    const c = stageCounts(reg.ideas);
    expect(c.Graduated).toBe(4);
    expect(c.Shaping).toBe(1);
    expect(c.Building).toBe(1);
    expect(c.Proposal).toBe(1);
  });
});

describe('staleness and parking a month later', () => {
  const later = new Date('2026-12-05T12:00:00Z');
  const d = deriveAll(reg, later);
  it('marks Shaping rows stale past 30 days and Proposal rows past 30 days', () => {
    expect(d.get('VI-003')!.stale).toBe(true);
    expect(d.get('VI-003')!.overdueDays).toBe(34 - 30);
    expect(d.get('VI-004')!.stale).toBe(true);
    expect(d.get('VI-001')!.stale).toBe(false); // graduated: no window
  });
  it('flags a parked row past its re-check date', () => {
    const r = clone(reg);
    const idea = r.ideas.find((i) => i.id === 'VI-003')!;
    idea.stage = 'Parked';
    idea.recheckDate = '2026-11-20';
    const dd = deriveAll(r, later);
    expect(dd.get('VI-003')!.parkedOverdue).toBe(true);
    expect(dd.get('VI-003')!.lane).toBe('Later');
  });
  it('flags a P0 feature still Shaping under a parent at Proposal', () => {
    const r = clone(reg);
    const parent = r.ideas.find((i) => i.id === 'VI-003')!;
    parent.stage = 'Proposal';
    const child = r.ideas.find((i) => i.id === 'VI-004')!;
    child.stage = 'Shaping';
    child.priority = 'P0';
    const dd = deriveAll(r, later);
    expect(dd.get('VI-004')!.blocksParent).toBe(true);
    expect(alerts(r, dd, later).some((a) => a.rule === 'feature-blocks-parent')).toBe(true);
  });
  it('raises a freshness alert when the snapshot is old', () => {
    const a = alerts(reg, d, later);
    expect(a[0].rule).toBe('freshness');
    expect(a[0].severity).toBe('critical');
  });
});

describe('readiness', () => {
  it('reads the graduation gates off the record', () => {
    const vai = reg.ideas.find((i) => i.id === 'VI-004')!;
    const g = readiness(vai, reg);
    expect(g.find((x) => x.label === 'Idea doc exists')!.met).toBe(true);
    expect(g.find((x) => x.label === 'Critique pass recorded')!.met).toBe(true);
    expect(g.find((x) => x.label === 'Owner named')!.met).toBe(false);
    expect(g.find((x) => x.label === 'Decision from Jithin logged')!.met).toBe(true);
    expect(g.find((x) => x.label === 'Project of its own')!.met).toBe(false);
  });
});

describe('graph layout', () => {
  const g = layoutGraph(reg);
  it('is deterministic and draws every row once', () => {
    const again = layoutGraph(reg);
    expect(JSON.stringify(again)).toBe(JSON.stringify(g));
    expect(g.nodes.filter((n) => n.id === 'VI-005')).toHaveLength(1);
    expect(g.nodes.some((n) => n.id === 'CAP-004')).toBe(false); // drawn as VI-005
  });
  it('keeps every node inside the frame', () => {
    for (const n of g.nodes) {
      expect(n.x).toBeGreaterThanOrEqual(0);
      expect(n.x + n.w).toBeLessThanOrEqual(g.width);
      expect(n.y + n.h).toBeLessThanOrEqual(g.height);
    }
  });
  it('routes VAI\'s reuse of self-healing to the register row', () => {
    const e = g.edges.find((x) => x.from === 'VI-004' && x.type === 'reuses' && x.to === 'VI-005');
    expect(e).toBeDefined();
    const nb = neighbourhood(g, 'VI-005');
    expect(nb.nodes.has('VI-004')).toBe(true);
    expect(nb.nodes.has('VI-003')).toBe(true);
  });
});

describe('hash routing', () => {
  it('round-trips plain names only', () => {
    expect(parseHash('#queue-VI-004')).toEqual({ view: 'queue', id: 'VI-004' });
    expect(parseHash('#graph-CAP-005')).toEqual({ view: 'graph', id: 'CAP-005' });
    expect(parseHash('#nonsense/path')).toEqual({ view: 'pulse', id: null });
    expect(toHash('board', null)).toBe('#board');
    expect(toHash('register', 'VI-007')).toBe('#register-VI-007');
  });
});

describe('graph routing into wrapped rows', () => {
  const g = layoutGraph(reg);
  it('staggers wrapped rows so a drop passes between the boxes above', () => {
    const caps = g.nodes.filter((n) => n.type === 'Capability');
    const row0 = caps.filter((n) => n.wrapRow === 0).sort((a, b) => a.x - b.x);
    const row1 = caps.filter((n) => n.wrapRow === 1);
    expect(row1.length).toBeGreaterThan(0);
    for (const n of row1) {
      const cx = n.x + n.w / 2;
      const crosses = row0.some((m) => cx > m.x && cx < m.x + m.w);
      expect(crosses).toBe(false);
    }
  });
  it('routes an edge into a wrapped row with a vertical drop at the target centre', () => {
    const target = g.nodes.find((n) => n.type === 'Capability' && n.wrapRow === 1)!;
    const e = g.edges.find((x) => x.to === target.id)!;
    expect(e.path).toMatch(new RegExp(`${target.x + target.w / 2},\\S+ V${target.y}$`));
  });
});
