// Everything the page derives from register.json. Nothing here is stored; the register is the source.
// Rules come from the Operating Model (portfolio view, staleness windows, links) and Portfolio session 1.
import type { Capability, Criterion, Idea, Link, Register, Stage, Weights } from './types';
import { calendarDaysUntil } from './day';
import { CRITERIA } from './types';
import { isClosed, nodeInfo, resolveMerged, tracksOf, type NodeInfo } from './tracks';

export type Lane = 'Now' | 'Next' | 'Later' | 'Graduated' | 'Capabilities' | 'Merged' | 'Killed';

export type ReasonKind =
  | 'decision'
  | 'score-proposed'
  | 'stale'
  | 'blocks-parent'
  | 'blocked'
  | 'parked-overdue'
  | 'open-blocking'
  | 'flag'
  | 'quiet';

export interface Reason {
  kind: ReasonKind;
  label: string;
  weight: number;
}

export interface Derived {
  id: string;
  lane: Lane;
  daysUntouched: number;
  daysInStage: number | null;
  window: number | null;
  stale: boolean;
  overdueDays: number;
  parkedOverdue: boolean;
  blockedBy: string[];
  blocks: string[];
  blocksParent: boolean;
  needsDecision: boolean;
  daysSinceDecision: number | null;
  pendingDecisions: number;
  reasons: Reason[];
  attention: number;
  compositeInForce: number | null;
  compositeProposed: number | null;
}

export type Mode = 'Brainstorm' | 'Critic' | 'Scout' | 'Spec' | 'Portfolio' | 'Comms';
export const MODES: Mode[] = ['Brainstorm', 'Critic', 'Scout', 'Spec', 'Portfolio', 'Comms'];

const DAY = 86_400_000;

/** Whole days from an ISO date (YYYY-MM-DD or date-time) to `now`, never negative. */
export function daysBetween(from: string, now: Date | string): number {
  // A calendar date against the viewer's today counts calendar days, local (TL-007 maintenance, B1).
  if (from.length === 10 && typeof now !== 'string') {
    const d = -calendarDaysUntil(from, now);
    return Number.isNaN(d) ? 0 : Math.max(0, d);
  }
  const a = Date.parse(from.length === 10 ? `${from}T00:00:00Z` : from);
  const b = typeof now === 'string' ? Date.parse(now.length === 10 ? `${now}T00:00:00Z` : now) : now.getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.max(0, Math.floor((b - a) / DAY));
}

/** Hours from an ISO date-time to `now`. */
export function hoursBetween(from: string, now: Date): number {
  const a = Date.parse(from);
  if (Number.isNaN(a)) return 0;
  return Math.max(0, (now.getTime() - a) / 3_600_000);
}

/** The lanes after the lifecycle change: Now is Building or Shipped, Next is Proposal, Stress test or Shaping, Later is seed or parked. */
export function laneOf(idea: Idea): Lane {
  if (idea.type === 'Capability') return 'Capabilities';
  switch (idea.stage) {
    case 'Building':
    case 'Shipped':
      return 'Now';
    case 'Proposal':
    case 'Shaping':
    case 'Stress test':
      return 'Next';
    case 'Seed':
    case 'Parked':
      return 'Later';
    case 'Graduated':
      return 'Graduated';
    case 'Merged':
      return 'Merged';
    case 'Killed':
      return 'Killed';
  }
}

/** The lifecycle lane a stage alone implies: used for tracks, which have a stage but no row of their own (D-387). */
export function laneOfStage(stage: Stage): Lane {
  return laneOf({ type: 'Idea', stage } as Idea);
}

/** Weighted composite from the eight criteria; null unless all eight are present. */
export function compositeWith(criteria: Partial<Record<Criterion, number>> | null | undefined, weights: Weights): number | null {
  if (!criteria) return null;
  let sum = 0;
  for (const c of CRITERIA) {
    const v = criteria[c];
    if (v == null) return null;
    sum += v * weights[c];
  }
  return Math.round(sum * 100) / 100;
}

/** The mode a session on this idea most likely wants, by stage. */
export function defaultMode(stage: Stage): Mode {
  switch (stage) {
    case 'Seed':
    case 'Shaping':
      return 'Brainstorm';
    case 'Stress test':
      return 'Critic';
    case 'Proposal':
      return 'Spec';
    case 'Building':
      return 'Spec';
    case 'Shipped':
      return 'Critic';
    case 'Graduated':
      return 'Critic';
    case 'Parked':
    case 'Merged':
    case 'Killed':
      return 'Portfolio';
  }
}

/** The line that opens a lab session, as the register's discoverability rule spells it. */
export function sessionLine(idea: Pick<Idea, 'id' | 'slug'>, mode: Mode): string {
  return `Lab session · ${idea.id} ${idea.slug} · ${mode}`;
}

export function stageCounts(ideas: Idea[]): Record<Stage, number> {
  const counts = { Seed: 0, Shaping: 0, 'Stress test': 0, Proposal: 0, Building: 0, Shipped: 0, Graduated: 0, Merged: 0, Parked: 0, Killed: 0 } as Record<Stage, number>;
  for (const i of ideas) counts[i.stage] += 1;
  return counts;
}

function ownerNamed(owner: string): boolean {
  return !/to be named|tbd|unassigned/i.test(owner) && owner.trim().length > 0;
}

export function deriveAll(reg: Register, now: Date): Map<string, Derived> {
  const byId = new Map(reg.ideas.map((i) => [i.id, i]));
  const out = new Map<string, Derived>();
  const lastDecision = new Map<string, string>();
  const pendingCount = new Map<string, number>();
  for (const d of reg.decisions) {
    const prev = lastDecision.get(d.ideaId);
    if (!prev || d.date > prev) lastDecision.set(d.ideaId, d.date);
    if (d.pending) pendingCount.set(d.ideaId, (pendingCount.get(d.ideaId) ?? 0) + 1);
  }

  for (const idea of reg.ideas) {
    const lane = laneOf(idea);
    const daysUntouched = daysBetween(idea.lastTouched, now);
    const daysInStage = idea.stageSince ? daysBetween(idea.stageSince, now) : null;
    const window = idea.stage === 'Parked' ? null : (reg.stalenessWindows[idea.stage] ?? null);
    const stale = window != null && daysUntouched > window;
    const overdueDays = stale && window != null ? daysUntouched - window : 0;
    const parkedOverdue = idea.stage === 'Parked' && !!idea.recheckDate && daysBetween(idea.recheckDate, now) > 0 && Date.parse(idea.recheckDate) < now.getTime();

    // A programme waits on what its tracks wait on outside it, and blocks whatever waits on its tracks (D-387).
    // Links keep naming merged rows; resolveMerged turns them into the track that carries the work.
    const myTracks = new Set(tracksOf(reg, idea.id).map((t) => t.id));
    const mine = (id: string | null) => id === idea.id || (id != null && myTracks.has(id));
    const blockedBy =
      idea.stage === 'Merged'
        ? []
        : [
            ...new Set(
              reg.links
                .filter((l) => l.type === 'depends-on' && l.toId && mine(resolveMerged(reg, l.fromId)))
                .map((l) => nodeInfo(reg, l.toId))
                .filter((n): n is NodeInfo => !!n && n.ideaId !== idea.id && n.stage !== 'Graduated')
                .map((n) => n.id),
            ),
          ];
    const blocks =
      idea.stage === 'Graduated' || idea.stage === 'Merged'
        ? []
        : [
            ...new Set(
              reg.links
                .filter((l) => l.type === 'depends-on' && mine(resolveMerged(reg, l.toId)))
                .map((l) => nodeInfo(reg, l.fromId))
                .filter((n): n is NodeInfo => !!n && n.ideaId !== idea.id && !isClosed(n.stage))
                .map((n) => n.id),
            ),
          ];

    const parent = idea.parentId ? byId.get(idea.parentId) : undefined;
    const blocksParent =
      !!parent &&
      idea.priority === 'P0' &&
      (idea.stage === 'Seed' || idea.stage === 'Shaping') &&
      (parent.stage === 'Proposal' || parent.stage === 'Building' || parent.stage === 'Shipped' || parent.stage === 'Graduated');

    const pending = pendingCount.get(idea.id) ?? 0;
    // A programme answers for its tracks' decisions and questions: they wait on Jithin through it (D-387).
    const openTracks = isClosed(idea.stage) ? [] : tracksOf(reg, idea.id).filter((t) => t.status !== 'done' && t.status !== 'split-out');
    const trackDue = openTracks.filter((t) => t.decisionsDue.length > 0);
    const dueCount = idea.decisionsDue.length + trackDue.reduce((a, t) => a + t.decisionsDue.length, 0);
    const needsDecision = dueCount > 0 || idea.score.status === 'proposed';
    const last = lastDecision.get(idea.id);
    const daysSinceDecision = last ? daysBetween(last, now) : null;

    const reasons: Reason[] = [];
    if (dueCount > 0) {
      const where = trackDue.length ? ` (${[...(idea.decisionsDue.length ? ['the row'] : []), ...trackDue.map((t) => t.name)].join(', ')})` : '';
      reasons.push({ kind: 'decision', label: `${dueCount === 1 ? '1 decision due' : `${dueCount} decisions due`}${where}`, weight: 100 + 10 * Math.min(dueCount, 3) });
    }
    if (idea.score.status === 'proposed') reasons.push({ kind: 'score-proposed', label: 'score proposed, not set', weight: 60 });
    if (blocksParent) reasons.push({ kind: 'blocks-parent', label: `P0 feature holding ${parent!.id}`, weight: 70 });
    if (stale) reasons.push({ kind: 'stale', label: `stale ${overdueDays} ${overdueDays === 1 ? 'day' : 'days'} past window`, weight: 50 + Math.min(overdueDays, 30) });
    if (parkedOverdue) reasons.push({ kind: 'parked-overdue', label: 'parked past re-check', weight: 45 });
    const openBlocking = [...(idea.openQuestions ?? []), ...openTracks.flatMap((t) => t.openQuestions ?? [])].filter((q) => /^yes/i.test(q.blocking) && !ownerNamed(q.owner));
    if (openBlocking.length) reasons.push({ kind: 'open-blocking', label: `${openBlocking.length} blocking question${openBlocking.length === 1 ? '' : 's'} without an owner`, weight: 20 });
    if (blockedBy.length) reasons.push({ kind: 'blocked', label: `waits on ${blockedBy.join(', ')}`, weight: 15 });
    const active = !isClosed(idea.stage);
    if (active) for (const f of idea.flags.slice(0, 3)) reasons.push({ kind: 'flag', label: f, weight: 8 });
    // With the decision log hidden from an audience, silence is not evidence of a quiet row (fix review 5).
    const decisionsKnown = reg.decisions.length > 0;
    if (active && decisionsKnown && daysSinceDecision != null && daysSinceDecision >= 30) reasons.push({ kind: 'quiet', label: `no decision in ${daysSinceDecision} days`, weight: 20 });
    if (active && decisionsKnown && daysSinceDecision == null) reasons.push({ kind: 'quiet', label: 'no decision logged yet', weight: 10 });

    const attention = idea.stage === 'Killed' || idea.stage === 'Merged' ? 0 : reasons.reduce((a, r) => a + r.weight, 0);

    out.set(idea.id, {
      id: idea.id,
      lane,
      daysUntouched,
      daysInStage,
      window,
      stale,
      overdueDays,
      parkedOverdue,
      blockedBy,
      blocks,
      blocksParent,
      needsDecision,
      daysSinceDecision,
      pendingDecisions: pending,
      reasons,
      attention,
      compositeInForce: compositeWith(idea.score.criteria, reg.weights),
      compositeProposed: reg.proposedWeights ? compositeWith(idea.score.criteria, reg.proposedWeights) : null,
    });
  }
  return out;
}

/** The attention queue: every row with a reason, strongest first, oldest touch breaking ties. */
export function attentionQueue(reg: Register, derived: Map<string, Derived>): Idea[] {
  return reg.ideas
    .filter((i) => (derived.get(i.id)?.attention ?? 0) > 0)
    .sort((a, b) => {
      const da = derived.get(a.id)!;
      const db = derived.get(b.id)!;
      if (db.attention !== da.attention) return db.attention - da.attention;
      return a.lastTouched.localeCompare(b.lastTouched);
    });
}

export type Severity = 'critical' | 'warning' | 'info';
export interface Alert {
  severity: Severity;
  rule: string;
  text: string;
  ideaId?: string;
}

/** Fixed-rule alerts, the lab's own rules rendered as a panel. */
export function alerts(reg: Register, derived: Map<string, Derived>, now: Date): Alert[] {
  const list: Alert[] = [];
  const ageH = hoursBetween(reg.asOf, now);
  if (ageH > 36) {
    const days = Math.floor(ageH / 24);
    list.push({
      severity: 'critical',
      rule: 'freshness',
      text: `This snapshot is ${days === 0 ? `${Math.floor(ageH)} hours` : `${days} ${days === 1 ? 'day' : 'days'}`} old. ${reg.generatedBy}`,
    });
  }
  const byId = new Map(reg.ideas.map((i) => [i.id, i]));
  for (const i of reg.ideas) {
    if (i.stage === 'Merged') continue; // closed into a track; the track's items surface through its parent
    const d = derived.get(i.id)!;
    if (d.stale) list.push({ severity: 'warning', rule: 'staleness', text: `${i.id} ${i.slug} untouched ${d.daysUntouched} days; the ${i.stage} window is ${d.window}.`, ideaId: i.id });
    if (d.parkedOverdue) list.push({ severity: 'warning', rule: 'parked', text: `${i.id} ${i.slug} is parked past its re-check date (${i.recheckDate}).`, ideaId: i.id });
    if (d.blocksParent && i.parentId) list.push({ severity: 'warning', rule: 'feature-blocks-parent', text: `${i.id} ${i.slug} is a P0 feature still ${i.stage}; ${i.parentId} cannot graduate.`, ideaId: i.id });
    if ((i.stage === 'Proposal' || i.stage === 'Building' || i.stage === 'Shipped' || i.stage === 'Graduated') && i.critiqueRecorded === false && i.type !== 'Capability')
      list.push({ severity: 'critical', rule: 'critique', text: `${i.id} ${i.slug} is at ${i.stage} with no recorded critique pass.`, ideaId: i.id });
    if (i.score.status === 'proposed') list.push({ severity: 'info', rule: 'score', text: `${i.id} ${i.slug}: rubric ${i.score.composite} proposed on ${i.score.date}, waiting to be set.`, ideaId: i.id });
    if (i.stage !== 'Killed' && i.themeIds.length === 0 && i.type !== 'Capability')
      list.push({ severity: 'info', rule: 'theme', text: `${i.id} ${i.slug} serves no theme.`, ideaId: i.id });
    if (!ownerNamed(i.owner.split(';')[0]))
      list.push({ severity: 'info', rule: 'owner', text: `${i.id} ${i.slug} has no named owner.`, ideaId: i.id });
    if (i.standardVersion && i.standardVersion !== reg.standardVersion && i.stage !== 'Graduated' && i.stage !== 'Killed')
      list.push({ severity: 'info', rule: 'standard', text: `${i.id} ${i.slug} follows ${i.standardVersion}; current is ${reg.standardVersion}.`, ideaId: i.id });
  }
  for (const dcn of reg.decisions) {
    if (dcn.pending && daysBetween(dcn.date, now) > 7)
      list.push({ severity: 'warning', rule: 'pending-decision', text: `${dcn.ideaId} ${byId.get(dcn.ideaId)?.slug ?? ''}: a decision has waited ${daysBetween(dcn.date, now)} days (${dcn.date}).`, ideaId: dcn.ideaId });
  }
  const order: Record<Severity, number> = { critical: 0, warning: 1, info: 2 };
  return list.sort((a, b) => order[a.severity] - order[b.severity]);
}

/** Links touching a node, split by direction. Themes and capabilities count as nodes too. */
export function linksOf(reg: Register, id: string): { out: Link[]; in: Link[] } {
  return {
    out: reg.links.filter((l) => l.fromId === id),
    in: reg.links.filter((l) => l.toId === id),
  };
}

/** Ideas within two hops, plus ideas sharing a capability: the "related" list under a detail. */
export function relatedIdeas(reg: Register, id: string): string[] {
  const adj = new Map<string, Set<string>>();
  const add = (a: string, b: string) => {
    if (!adj.has(a)) adj.set(a, new Set());
    adj.get(a)!.add(b);
  };
  for (const l of reg.links) {
    if (!l.toId) continue;
    add(l.fromId, l.toId);
    add(l.toId, l.fromId);
  }
  const seen = new Set<string>([id]);
  let frontier = [id];
  for (let hop = 0; hop < 2; hop++) {
    const next: string[] = [];
    for (const n of frontier) for (const m of adj.get(n) ?? []) if (!seen.has(m)) { seen.add(m); next.push(m); }
    frontier = next;
  }
  seen.delete(id);
  const ideaIds = new Set(reg.ideas.map((i) => i.id));
  return [...seen].filter((x) => ideaIds.has(x)).sort();
}

export interface Readiness {
  label: string;
  met: boolean;
  detail: string;
}

/** The lab's graduation gates, as a checklist. */
export function readiness(idea: Idea, reg: Register): Readiness[] {
  const decidedByJithin = reg.decisions.some((d) => d.ideaId === idea.id && /jithin/i.test(d.by) && !/pending/i.test(d.by));
  return [
    { label: 'Idea doc exists', met: !!idea.docUrl, detail: idea.docUrl ? (idea.docTitle ?? 'linked') : 'no doc linked from the register' },
    { label: 'Critique pass recorded', met: idea.critiqueRecorded === true, detail: idea.critiqueRecorded === true ? 'recorded' : idea.critiqueRecorded === false ? 'not yet' : 'not recorded in the register' },
    { label: 'Owner named', met: ownerNamed(idea.owner), detail: idea.owner },
    { label: 'Decision from Jithin logged', met: decidedByJithin, detail: decidedByJithin ? 'in the decision log' : 'only thinking-partner lines so far' },
    { label: 'Shipped: a first user and the metric read', met: !!idea.shipped?.date && !!idea.shipped?.metricRead, detail: idea.shipped?.date ? (idea.shipped.metricRead ? `${idea.shipped.firstUser ?? 'first user'}; ${idea.shipped.metricRead}` : `${idea.shipped.firstUser || 'first user'} on ${idea.shipped.date}; metric not read yet`) : 'not shipped' },
    { label: 'Project of its own', met: !!idea.graduatedTo, detail: idea.graduatedTo ?? 'not yet' },
  ];
}

export function capabilityPriority(c: Capability): 'platform priority' | 'watch' | null {
  if (c.demand >= 3) return 'platform priority';
  if (c.demand === 0 && c.maturity !== 'Idea') return 'watch';
  return null;
}
