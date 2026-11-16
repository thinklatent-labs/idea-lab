// Merges and tracks (register schema 1.4, D-387): merged rows close, their work lives on tracks, links resolve to
// the tracks, and nothing a merged row carried drops out of the views that surface due work.
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Register } from '../src/lib/types';
import { deriveAll, laneOf } from '../src/lib/derive';
import { dependencyConflicts, evaluateRules, openNextSteps, predictionLedger } from '../src/lib/derive2';
import { layoutGraph } from '../src/lib/graph';
import { nodeInfo, resolveMerged, trackSessionLine, tracksOf } from '../src/lib/tracks';
import { buildDigest } from '../src/jarvis/brain';

const reg = JSON.parse(readFileSync(fileURLToPath(new URL('./fixtures/register-v1.4.json', import.meta.url)), 'utf8')) as Register;
const NOW = new Date('2026-11-16T16:00:00Z');
const byId = new Map(reg.ideas.map((i) => [i.id, i]));

describe('merged rows and tracks', () => {
  it('resolves a merged row to its track and leaves other ids alone', () => {
    expect(resolveMerged(reg, 'TL-004')).toBe('TL-003.index');
    expect(resolveMerged(reg, 'TL-022')).toBe('TL-018.fast-lane');
    expect(resolveMerged(reg, 'TL-003')).toBe('TL-003');
    expect(resolveMerged(reg, 'CAP-005')).toBe('CAP-005');
    expect(nodeInfo(reg, 'TL-012')).toMatchObject({ id: 'TL-003.agents', ideaId: 'TL-003', isTrack: true, stage: 'Stress test' });
  });

  it('gives each programme its tracks, and every merged row a track that names it', () => {
    expect(tracksOf(reg, 'TL-003').map((t) => t.id)).toEqual(['TL-003.index', 'TL-003.telemetry', 'TL-003.agents']);
    expect(tracksOf(reg, 'TL-018')).toHaveLength(7);
    for (const i of reg.ideas.filter((x) => x.stage === 'Merged')) {
      const t = reg.tracks!.find((x) => x.id === i.trackId)!;
      expect(t.mergedFrom).toContain(i.id);
      expect(t.parentId).toBe(i.mergedInto);
      expect(laneOf(i)).toBe('Merged');
    }
  });

  it('keeps every carried item on the track', () => {
    const fast = reg.tracks!.find((t) => t.id === 'TL-018.fast-lane')!;
    expect(fast.hypotheses).toHaveLength(15);
    expect(fast.openQuestions).toHaveLength(13);
    expect(fast.decisionsDue).toHaveLength(1);
    const agents = reg.tracks!.find((t) => t.id === 'TL-003.agents')!;
    expect(agents.mergedFrom).toEqual(['TL-012', 'TL-010']);
    expect(agents.killCriteria).toHaveLength(9);
    expect(byId.get('TL-022')!.decisionsDue).toHaveLength(0);
  });

  it('draws tracks, not merged rows, and points links at the tracks', () => {
    const g = layoutGraph(reg);
    const ids = new Set(g.nodes.map((n) => n.id));
    expect(ids.has('TL-004')).toBe(false);
    expect(ids.has('TL-003.index')).toBe(true);
    expect(g.nodes.find((n) => n.id === 'TL-003.index')!.type).toBe('Track');
    expect(g.edges.some((e) => e.from === 'TL-003.index' && e.to === 'TL-003' && e.type === 'track-of')).toBe(true);
    // TL-022 depends-on TL-004: both merged, drawn between their tracks
    expect(g.edges.some((e) => e.from === 'TL-018.fast-lane' && e.to === 'TL-003.index' && e.type === 'depends-on')).toBe(true);
    // a programme and its own tracks share only the track-of edge
    expect(g.edges.filter((e) => (e.from === 'TL-003' && e.to.startsWith('TL-003.')) || (e.to === 'TL-003' && e.from.startsWith('TL-003.') && e.type !== 'track-of'))).toHaveLength(0);
    for (const e of g.edges) {
      expect(ids.has(e.from)).toBe(true);
      expect(ids.has(e.to)).toBe(true);
    }
  });

  it('closes merged rows for attention and carries dependencies to the programme', () => {
    const d = deriveAll(reg, NOW);
    expect(d.get('TL-004')!.attention).toBe(0);
    expect(d.get('TL-018')!.blockedBy).toContain('TL-003.index');
    expect(d.get('TL-003')!.blocks).toContain('TL-018.fast-lane');
    expect(d.get('TL-003')!.blockedBy).not.toContain('TL-003.index');
  });

  it('surfaces track due dates in the rules and the open steps, attributed to the parent', () => {
    const d = deriveAll(reg, NOW);
    const hits = evaluateRules(reg, d, NOW);
    expect(hits.some((h) => h.ruleId === 'R-11' && h.ideaId === 'TL-003' && /› TL Index: next step due in 4 days/.test(h.text))).toBe(true);
    expect(hits.some((h) => h.ideaId === 'TL-004')).toBe(false);
    const steps = openNextSteps(reg, NOW);
    expect(steps.some((s) => s.trackId === 'TL-018.fast-lane' && s.ideaId === 'TL-018' && s.due === '2026-11-27')).toBe(true);
    expect(steps.some((s) => s.ideaId === 'TL-004')).toBe(false);
  });

  it('reads predictions from tracks once, not from the merged rows', () => {
    const rows = predictionLedger(reg);
    expect(rows.filter((r) => r.trackId === 'TL-018.fast-lane')).toHaveLength(15);
    expect(rows.some((r) => r.ideaId === 'TL-022')).toBe(false);
  });

  it('compares dependencies at track level, a track by its own stage', () => {
    const c = dependencyConflicts(reg);
    // the portal (Building) leans on its own telemetry contract (Seed): the honest signal stays
    expect(c.some((x) => x.dependentId === 'TL-003' && x.blockerId === 'TL-003.telemetry')).toBe(true);
    // the TL Index track is Building like its parent: no conflict
    expect(c.some((x) => x.blockerId === 'TL-003.index' && x.dependentId === 'TL-003')).toBe(false);
    // the agents track (Stress test, so Next) waits on the Domain tier track (Seed, so Later), as TL-012 did on TL-011
    expect(c.find((x) => x.dependentId === 'TL-003' && x.blockerId === 'TL-018.domain-tier')?.reason).toMatch(/TL-003\.agents is Next while TL-018\.domain-tier is Later/);
    for (const x of c) expect(byId.has(x.dependentId)).toBe(true);
  });

  it('puts a track\'s decision due on its programme, and a merged row\'s pending line under its programme', () => {
    const d = deriveAll(reg, NOW);
    expect(d.get('TL-018')!.needsDecision).toBe(true);
    expect(d.get('TL-018')!.reasons.find((r) => r.kind === 'decision')?.label).toMatch(/Fast lane/);
    const hits = evaluateRules(reg, d, NOW);
    expect(hits.filter((h) => h.ruleId === 'R-06').every((h) => byId.get(h.ideaId!)?.stage !== 'Merged')).toBe(true);
  });

  it('writes a session line for a track and lists tracks for Jarvis', () => {
    expect(trackSessionLine(byId.get('TL-003')!, { name: 'TL Index' }, 'Spec')).toBe('Lab session · TL-003 portal › TL Index · Spec');
    const digest = buildDigest({ reg, derived: deriveAll(reg, NOW), now: NOW, inbox: new Map(), lastVisit: null, visibleIdeas: reg.ideas });
    expect(digest).toContain('TRACKS');
    expect(digest).toContain('TL-018.fast-lane');
    expect(digest).toMatch(/TL-004 index — Merged into TL-003 as track TL-003\.index/);
  });
});
