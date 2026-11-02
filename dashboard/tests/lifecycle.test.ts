import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Register } from '../src/lib/types';
import { deriveAll, laneOf, readiness, stageCounts } from '../src/lib/derive';
import { buildingGate, dependencyConflicts, diffSnapshots, evaluateRules, funnel } from '../src/lib/derive2';

const read = (rel: string) => JSON.parse(readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')) as Register;
const reg = read('../../register/register.json');
const prev = read('../../register/history/2026-11-01T1805.json');
const NOW = new Date('2026-11-02T04:00:00Z');
const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x)) as T;

describe('lifecycle v1.2', () => {
  it('places Building and Shipped in Now and Proposal in Next', () => {
    const base = reg.ideas.find((i) => i.id === 'VI-007')!;
    expect(laneOf({ ...clone(base), stage: 'Building' })).toBe('Now');
    expect(laneOf({ ...clone(base), stage: 'Shipped' })).toBe('Now');
    expect(laneOf({ ...clone(base), stage: 'Proposal' })).toBe('Next');
    expect(stageCounts(reg.ideas).Building).toBe(1);
  });
  it('fails the Building gate for VAI (leads unnamed, no appetite) and passes it for the dashboard', () => {
    const vai = buildingGate(reg.ideas.find((i) => i.id === 'VI-004')!);
    expect(vai.passed).toBe(false);
    expect(vai.missing).toContain('an owner who is not Jithin');
    expect(vai.missing).toContain('an appetite in engineer-weeks');
    expect(buildingGate(reg.ideas.find((i) => i.id === 'VI-007')!).passed).toBe(true);
  });
  it('treats an owner of Jithin alone as not an owner', () => {
    const i = clone(reg.ideas.find((x) => x.id === 'VI-007')!);
    i.owner = 'Jithin';
    expect(buildingGate(i).ownerNamed).toBe(false);
  });
  it('fires the gate rule on a funded row that cannot start, and the governance rule on a critical-path review', () => {
    const hits = evaluateRules(reg, deriveAll(reg, NOW), NOW);
    expect(hits.some((h) => h.ruleId === 'R-17' && h.ideaId === 'VI-004' && h.level === 'alert')).toBe(true);
    expect(hits.some((h) => h.ruleId === 'R-18' && h.ideaId === 'VI-003' && h.level === 'warn')).toBe(true);
    expect(hits.some((h) => h.ruleId === 'R-18' && h.ideaId === 'VI-007')).toBe(false);
  });
  it('uses the shorter Proposal window', () => {
    const later = new Date('2026-11-17T04:00:00Z');
    const hits = evaluateRules(reg, deriveAll(reg, later), later);
    expect(hits.some((h) => h.ruleId === 'R-02b' && h.ideaId === 'VI-004' && h.level === 'alert')).toBe(true);
  });
  it('counts Shipped as a graduation gate', () => {
    const g = readiness(reg.ideas.find((i) => i.id === 'VI-001')!, reg);
    expect(g.find((x) => x.label.startsWith('Shipped'))!.met).toBe(false);
    const g6 = readiness(reg.ideas.find((i) => i.id === 'VI-006')!, reg);
    expect(g6.find((x) => x.label.startsWith('Shipped'))!.met).toBe(false); // shipped date but metric not read
  });
  it('does not treat a Shipped blocker as blocking', () => {
    const r = clone(reg);
    r.ideas.find((i) => i.id === 'VI-004')!.stage = 'Shipped';
    expect(dependencyConflicts(r)).toEqual([]);
  });
  it('sees the stage change in the snapshot diff', () => {
    const d = diffSnapshots(prev, reg);
    expect(d.changes.some((c) => c.ideaId === 'VI-007' && c.what === 'stage' && c.to === 'Building')).toBe(true);
    expect(d.changes.some((c) => c.ideaId === 'VI-007' && c.what === 'lane' && c.to === 'Now')).toBe(true);
  });
  it('extends the funnel through Building and Shipped', () => {
    const f = funnel(reg);
    expect(f.map((r) => r.stage)).toEqual(['Seed', 'Shaping', 'Stress test', 'Proposal', 'Building', 'Shipped', 'Graduated']);
    expect(f.find((r) => r.stage === 'Building')!.entered).toBe(1);
  });
});
