import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Register } from '../src/lib/types';
import { deriveAll } from '../src/lib/derive';
import {
  appetiteState,
  calibration,
  collisionCandidates,
  dependencyConflicts,
  diffSnapshots,
  evaluateRules,
  funnel,
  healthOf,
  openNextSteps,
  predictionLedger,
  rankUnder,
  updateState,
} from '../src/lib/derive2';
import { neighbourhood, layoutGraph } from '../src/lib/graph';

const read = (rel: string) => JSON.parse(readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')) as Register;
const reg = read('./fixtures/register-v1.3.json');
const prev = read('./fixtures/2026-11-01T1645.json');
const NOW = new Date('2026-11-01T13:00:00Z');
const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x)) as T;

describe('health and update state', () => {
  it('takes the latest health call on the idea', () => {
    expect(healthOf(reg, 'TL-004')?.health).toBe('at-risk');
    expect(healthOf(reg, 'TL-007')?.health).toBe('on-track');
    expect(healthOf(reg, 'TL-001')).toBeNull();
  });
  it('computes update missing from the no-session rule', () => {
    expect(updateState(reg, reg.ideas.find((i) => i.id === 'TL-004')!, NOW).level).toBe('ok');
    const later = new Date('2026-12-05T12:00:00Z');
    expect(updateState(reg, reg.ideas.find((i) => i.id === 'TL-004')!, later).level).toBe('alert');
    expect(updateState(reg, reg.ideas.find((i) => i.id === 'TL-003')!, new Date('2026-11-20T12:00:00Z')).level).toBe('warn');
  });
});

describe('conflicts and collisions', () => {
  it('finds no dependency conflict in the seed', () => {
    expect(dependencyConflicts(reg)).toEqual([]);
  });
  it('flags a dependent that sits ahead of its blocker', () => {
    const r = clone(reg);
    r.ideas.find((i) => i.id === 'TL-003')!.stage = 'Proposal';
    r.ideas.find((i) => i.id === 'TL-004')!.stage = 'Shaping';
    const c = dependencyConflicts(r);
    expect(c).toHaveLength(1);
    expect(c[0].dependentId).toBe('TL-003');
    expect(c[0].reason).toContain('Proposal');
  });
  it('excludes parent and child from collision candidates', () => {
    expect(collisionCandidates(reg)).toEqual([]);
    const r = clone(reg);
    r.ideas.find((i) => i.id === 'TL-004')!.parentId = null;
    const c = collisionCandidates(r);
    expect(c).toHaveLength(1);
    expect(c[0].shared.length).toBeGreaterThanOrEqual(3);
  });
});

describe('weights and ranking', () => {
  it('ranks scored rows and leaves the rest unranked', () => {
    const rows = rankUnder(reg, reg.proposedWeights!);
    expect(rows.find((r) => r.id === 'TL-004')!.composite).toBe(3.95);
    expect(rows.find((r) => r.id === 'TL-004')!.rank).toBe(1);
    expect(rows.find((r) => r.id === 'TL-003')!.rank).toBeNull();
  });
});

describe('snapshot diff', () => {
  it('finds the next-step change and the logged decisions between the two seeds', () => {
    const fixed = read('./fixtures/2026-11-02T0915.json');
    const d = diffSnapshots(prev, fixed);
    expect(d.changes.some((c) => c.ideaId === 'TL-007' && c.what === 'next step')).toBe(true);
    expect(d.decisionsAdded.length).toBe(4);
    expect(d.sessionsAdded).toBe(2);
    expect(d.newIdeas).toEqual([]);
  });
});

describe('funnel, ledger and rules', () => {
  it('counts stage entries from stage histories', () => {
    const f = funnel(reg);
    expect(f.find((r) => r.stage === 'Shaping')!.entered).toBe(4);
    expect(f.find((r) => r.stage === 'Proposal')!.entered).toBe(2);
  });
  it('lists predictions and reports no calibration before anything resolves', () => {
    const rows = predictionLedger(reg);
    expect(rows.length).toBe(11);
    expect(calibration(rows).every((b) => b.n === 0)).toBe(true);
  });
  it('evaluates appetite, next-step and review-due rules a month on', () => {
    const later = new Date('2026-12-05T12:00:00Z');
    expect(appetiteState(reg.ideas.find((i) => i.id === 'TL-007')!, later)?.level).toBe('expired');
    const hits = evaluateRules(reg, deriveAll(reg, later), later);
    expect(hits.some((h) => h.ruleId === 'R-09' && h.level === 'alert')).toBe(true);
    expect(hits.some((h) => h.ruleId === 'R-11' && h.level === 'alert')).toBe(true);
    expect(hits.some((h) => h.ruleId === 'R-12')).toBe(true);
    expect(hits.some((h) => h.ruleId === 'R-04' && h.ideaId === 'TL-004')).toBe(true);
  });
  it('orders open next steps by due date', () => {
    const steps = openNextSteps(reg, NOW);
    expect(steps[0].ideaId).toBe('TL-004'); // leads due 15 Nov
    expect(steps[1].ideaId).toBe('TL-007');
  });
});

describe('graph depth', () => {
  it('widens the neighbourhood with depth', () => {
    const g = layoutGraph(reg);
    const one = neighbourhood(g, 'TL-007', 1);
    const two = neighbourhood(g, 'TL-007', 2);
    expect(two.nodes.size).toBeGreaterThan(one.nodes.size);
    expect(one.nodes.has('TL-006')).toBe(true);
  });
});
