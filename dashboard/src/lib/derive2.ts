// Wave 1 to 3 rules: health and update-missing, the rule table, conflicts, collisions, snapshot diffs,
// the funnel, the prediction ledger, the evidence map, open next steps and the decision index.
import type { Capability, Decision, Health, Idea, Register, Rule, Stage, Weights } from './types';
import { CRITERIA, STAGES } from './types';
import { daysBetween, hoursBetween, laneOf, type Derived, type Lane } from './derive';
import { canonicalId } from './graph';

export type Level = 'alert' | 'warn' | 'info';

export interface RuleHit {
  ruleId: string;
  rule: string;
  level: Level;
  text: string;
  ideaId?: string;
  capabilityId?: string;
}

const DAY = 86_400_000;

function daysUntil(date: string, now: Date): number {
  const t = Date.parse(`${date}T00:00:00Z`);
  return Math.floor((t - now.getTime()) / DAY);
}

/** The latest health call made at a session end on this idea. */
export function healthOf(reg: Register, ideaId: string): { health: Health; date: string; note?: string } | null {
  const calls = reg.sessions
    .map((s, idx) => ({ s, idx }))
    .filter(({ s }) => !!s.health && (s.ideaIds ?? []).includes(ideaId))
    .sort((a, b) => (a.s.date === b.s.date ? b.idx - a.idx : b.s.date.localeCompare(a.s.date)));
  const top = calls[0];
  if (!top) return null;
  return { health: top.s.health as Health, date: top.s.date, note: top.s.healthNote };
}

export function lastSessionDate(reg: Register, ideaId: string): string | null {
  let last: string | null = null;
  for (const s of reg.sessions) if ((s.ideaIds ?? []).includes(ideaId) && (!last || s.date > last)) last = s.date;
  return last;
}

export interface UpdateState {
  level: 'ok' | 'warn' | 'alert' | 'none';
  daysSinceSession: number | null;
  cadence: number | null;
}

/** Update missing: days since the last session on an active row against the no-session rule's cadence. */
export function updateState(reg: Register, idea: Idea, now: Date): UpdateState {
  const rule = (reg.rules ?? []).find((r) => r.kind === 'no-session' && (!r.stages || r.stages.includes(idea.stage)));
  if (!rule) return { level: 'none', daysSinceSession: null, cadence: null };
  const last = lastSessionDate(reg, idea.id);
  if (!last) return { level: 'warn', daysSinceSession: null, cadence: rule.warnDays ?? null };
  const d = daysBetween(last, now);
  const level = rule.alertDays != null && d >= rule.alertDays ? 'alert' : rule.warnDays != null && d >= rule.warnDays ? 'warn' : 'ok';
  return { level, daysSinceSession: d, cadence: rule.warnDays ?? null };
}

const LANE_RANK: Record<Lane, number> = { Graduated: -1, Now: 0, Capabilities: 0, Next: 1, Later: 2, Killed: 9 };
const H_RANK: Record<string, number> = { H1: 0, H2: 1, H3: 2 };
const STAGE_RANK: Record<Stage, number> = { Seed: 0, Shaping: 1, 'Stress test': 2, Proposal: 3, Building: 4, Shipped: 5, Graduated: 6, Parked: 1, Killed: 9 };

export interface Conflict {
  dependentId: string;
  blockerId: string;
  reason: string;
}

/** A dependent that sits ahead of what it waits on: earlier lane, earlier horizon, or a later stage. */
export function dependencyConflicts(reg: Register): Conflict[] {
  const byId = new Map(reg.ideas.map((i) => [i.id, i]));
  const out: Conflict[] = [];
  for (const l of reg.links) {
    if (l.type !== 'depends-on' || !l.toId) continue;
    const a = byId.get(l.fromId);
    const b = byId.get(canonicalId(reg, l.toId) ?? '');
    if (!a || !b || b.stage === 'Graduated' || b.stage === 'Shipped') continue;
    const reasons: string[] = [];
    if (LANE_RANK[laneOf(a)] < LANE_RANK[laneOf(b)]) reasons.push(`${a.id} is ${laneOf(a)} while ${b.id} is ${laneOf(b)}`);
    if (a.horizon && b.horizon && H_RANK[a.horizon] < H_RANK[b.horizon]) reasons.push(`${a.id} is ${a.horizon} while ${b.id} is ${b.horizon}`);
    if (STAGE_RANK[a.stage] > STAGE_RANK[b.stage] && a.stage !== 'Killed') reasons.push(`${a.id} is at ${a.stage} while ${b.id} is at ${b.stage}`);
    if (reasons.length) out.push({ dependentId: a.id, blockerId: b.id, reason: reasons.join('; ') });
  }
  return out;
}

export interface Collision {
  a: string;
  b: string;
  shared: string[];
}

/** Pairs of ideas that reuse or create three or more of the same capabilities, parent and child excluded. */
export function collisionCandidates(reg: Register, min = 3): Collision[] {
  const caps = new Map<string, Set<string>>();
  for (const l of reg.links) {
    if ((l.type !== 'reuses' && l.type !== 'creates') || !l.toId) continue;
    const to = canonicalId(reg, l.toId)!;
    if (!caps.has(l.fromId)) caps.set(l.fromId, new Set());
    caps.get(l.fromId)!.add(to);
  }
  const byId = new Map(reg.ideas.map((i) => [i.id, i]));
  const ids = [...caps.keys()].sort();
  const out: Collision[] = [];
  for (let i = 0; i < ids.length; i++)
    for (let j = i + 1; j < ids.length; j++) {
      const a = byId.get(ids[i]);
      const b = byId.get(ids[j]);
      if (!a || !b) continue;
      if (a.parentId === b.id || b.parentId === a.id) continue;
      const shared = [...caps.get(ids[i])!].filter((c) => caps.get(ids[j])!.has(c)).sort();
      if (shared.length >= min) out.push({ a: ids[i], b: ids[j], shared });
    }
  return out;
}

export function capabilityFlag(c: Capability): string | null {
  if (c.demand >= 3) return 'platform priority';
  if (c.demand === 0 && c.maturity !== 'Idea') return 'retirement watch';
  if (c.demand === 0) return 'no reuse yet';
  return null;
}

/** Composite and rank under any weight vector; rows without eight criteria rank last. */
export function rankUnder(reg: Register, weights: Weights): { id: string; composite: number | null; rank: number | null }[] {
  const rows = reg.ideas.map((i) => {
    const c = i.score.criteria;
    if (!c) return { id: i.id, composite: null as number | null };
    let sum = 0;
    for (const k of CRITERIA) {
      const v = c[k];
      if (v == null) return { id: i.id, composite: null as number | null };
      sum += v * weights[k];
    }
    return { id: i.id, composite: Math.round(sum * 100) / 100 };
  });
  const scored = rows.filter((r) => r.composite != null).sort((a, b) => b.composite! - a.composite!);
  return rows.map((r) => ({ ...r, rank: r.composite == null ? null : scored.findIndex((s) => s.id === r.id) + 1 }));
}

export interface Change {
  ideaId: string | null;
  what: string;
  from: string;
  to: string;
}

export interface Diff {
  changes: Change[];
  newIdeas: string[];
  removedIdeas: string[];
  decisionsAdded: Decision[];
  sessionsAdded: number;
  linksAdded: number;
  linksRemoved: number;
}

const field = (i: Idea, key: string): string => {
  switch (key) {
    case 'stage':
      return i.stage;
    case 'score':
      return i.score.composite == null ? 'unscored' : `${i.score.composite} ${i.score.status}`;
    case 'lane':
      return laneOf(i);
    case 'owner':
      return i.owner;
    case 'next step':
      return i.nextStep;
    case 'horizon':
      return i.horizon ?? 'none';
    case 'theme':
      return i.themeIds.join(', ') || 'none';
    case 'parent':
      return i.parentId ?? 'none';
    case 'decisions due':
      return String(i.decisionsDue.length);
    case 'appetite ends':
      return i.appetiteEnds ?? 'not set';
    default:
      return '';
  }
};

/** What changed between two snapshots: the fields a review cares about, plus rows, links and log lines. */
export function diffSnapshots(prev: Register, cur: Register): Diff {
  const keys = ['stage', 'lane', 'score', 'owner', 'horizon', 'theme', 'parent', 'next step', 'decisions due', 'appetite ends'];
  const prevBy = new Map(prev.ideas.map((i) => [i.id, i]));
  const curBy = new Map(cur.ideas.map((i) => [i.id, i]));
  const changes: Change[] = [];
  for (const i of cur.ideas) {
    const p = prevBy.get(i.id);
    if (!p) continue;
    for (const k of keys) {
      const a = field(p, k);
      const b = field(i, k);
      if (a !== b) changes.push({ ideaId: i.id, what: k, from: a, to: b });
    }
  }
  const linkKey = (l: { fromId: string; type: string; toId: string | null; toLabel: string }) => `${l.fromId}|${l.type}|${l.toId ?? l.toLabel}`;
  const prevLinks = new Set(prev.links.map(linkKey));
  const curLinks = new Set(cur.links.map(linkKey));
  const decisionKey = (d: Decision) => `${d.date}|${d.ideaId}|${d.decision}`;
  const prevDec = new Set(prev.decisions.map(decisionKey));
  for (const c of cur.capabilities) {
    const p = prev.capabilities.find((x) => x.id === c.id);
    if (p && p.demand !== c.demand) changes.push({ ideaId: null, what: `${c.name} demand`, from: String(p.demand), to: String(c.demand) });
    if (p && p.maturity !== c.maturity) changes.push({ ideaId: null, what: `${c.name} maturity`, from: p.maturity, to: c.maturity });
  }
  return {
    changes,
    newIdeas: cur.ideas.filter((i) => !prevBy.has(i.id)).map((i) => i.id),
    removedIdeas: prev.ideas.filter((i) => !curBy.has(i.id)).map((i) => i.id),
    decisionsAdded: cur.decisions.filter((d) => !prevDec.has(decisionKey(d))),
    sessionsAdded: Math.max(0, cur.sessions.length - prev.sessions.length),
    linksAdded: [...curLinks].filter((k) => !prevLinks.has(k)).length,
    linksRemoved: [...prevLinks].filter((k) => !curLinks.has(k)).length,
  };
}

export interface FunnelRow {
  stage: Stage;
  entered: number;
  conversion: number | null;
  medianDays: number | null;
  samples: number;
}

/** From each idea's stage history: how many rows ever entered a stage, how many moved on, and the median stay. */
export function funnel(reg: Register): FunnelRow[] {
  const order: Stage[] = ['Seed', 'Shaping', 'Stress test', 'Proposal', 'Building', 'Shipped', 'Graduated'];
  const entered = new Map<Stage, number>();
  const stays = new Map<Stage, number[]>();
  for (const i of reg.ideas) {
    const h = i.stageHistory ?? [];
    h.forEach((e, idx) => {
      entered.set(e.stage, (entered.get(e.stage) ?? 0) + 1);
      const next = h[idx + 1];
      if (next) {
        if (!stays.has(e.stage)) stays.set(e.stage, []);
        stays.get(e.stage)!.push(daysBetween(e.since, next.since));
      }
    });
  }
  return order.map((s, idx) => {
    const n = entered.get(s) ?? 0;
    const nextN = idx < order.length - 1 ? (entered.get(order[idx + 1]) ?? 0) : null;
    const st = (stays.get(s) ?? []).sort((a, b) => a - b);
    return {
      stage: s,
      entered: n,
      conversion: nextN == null || n === 0 ? null : Math.min(1, nextN / n),
      medianDays: st.length ? st[Math.floor(st.length / 2)] : null,
      samples: st.length,
    };
  });
}

export interface LedgerRow {
  ideaId: string;
  claim: string;
  confidence: number | null;
  evidence: 0 | 1 | 2 | null;
  resolveBy: string | null;
  result: 'confirmed' | 'refuted' | 'open' | null;
}

export function predictionLedger(reg: Register): LedgerRow[] {
  const out: LedgerRow[] = [];
  for (const i of reg.ideas)
    for (const h of i.hypotheses ?? [])
      out.push({ ideaId: i.id, claim: h.claim, confidence: h.confidence ?? null, evidence: h.evidence ?? null, resolveBy: h.resolveBy ?? null, result: h.result ?? null });
  return out;
}

/** Calibration: among resolved predictions with a confidence, the share confirmed per confidence band. */
export function calibration(rows: LedgerRow[]): { band: string; n: number; confirmed: number }[] {
  const bands = [
    { band: '0-39', lo: 0, hi: 39 },
    { band: '40-59', lo: 40, hi: 59 },
    { band: '60-79', lo: 60, hi: 79 },
    { band: '80-100', lo: 80, hi: 100 },
  ];
  return bands.map((b) => {
    const in_ = rows.filter((r) => r.confidence != null && r.confidence >= b.lo && r.confidence <= b.hi && (r.result === 'confirmed' || r.result === 'refuted'));
    return { band: b.band, n: in_.length, confirmed: in_.filter((r) => r.result === 'confirmed').length };
  });
}

export interface EvidencePoint {
  ideaId: string;
  score: number | null;
  evidence: number | null; // mean evidence strength 0..2
  sessions: number;
  hypotheses: number;
}

export function evidenceMap(reg: Register): EvidencePoint[] {
  return reg.ideas
    .filter((i) => i.stage !== 'Killed')
    .map((i) => {
      const hs = (i.hypotheses ?? []).filter((h) => h.evidence != null);
      const ev = hs.length ? hs.reduce((a, h) => a + (h.evidence ?? 0), 0) / hs.length : null;
      return {
        ideaId: i.id,
        score: i.score.composite,
        evidence: ev,
        sessions: reg.sessions.filter((s) => (s.ideaIds ?? []).includes(i.id)).length,
        hypotheses: (i.hypotheses ?? []).length,
      };
    });
}

export interface OpenStep {
  ideaId: string;
  step: string;
  due: string | null;
  daysLeft: number | null;
  origin: Decision | null;
}

export function openNextSteps(reg: Register, now: Date): OpenStep[] {
  return reg.ideas
    .filter((i) => i.stage !== 'Killed' && i.nextStep.trim().length > 0)
    .map((i) => ({
      ideaId: i.id,
      step: i.nextStep,
      due: i.nextStepDue ?? null,
      daysLeft: i.nextStepDue ? daysUntil(i.nextStepDue, now) : null,
      origin: i.nextStepOrigin ? (reg.decisions.find((d) => d.id === i.nextStepOrigin) ?? null) : null,
    }))
    .sort((a, b) => (a.daysLeft ?? 9999) - (b.daysLeft ?? 9999));
}

export function appetiteState(idea: Idea, now: Date): { daysLeft: number; level: 'ok' | 'warn' | 'expired' } | null {
  if (!idea.appetiteEnds) return null;
  const d = daysUntil(idea.appetiteEnds, now);
  return { daysLeft: d, level: d < 0 ? 'expired' : d <= 14 ? 'warn' : 'ok' };
}

/** The rule table, evaluated. Kinds the rule table does not name fall back to the fixed alerts. */
export function evaluateRules(reg: Register, derived: Map<string, Derived>, now: Date): RuleHit[] {
  const hits: RuleHit[] = [];
  const rules = reg.rules ?? [];
  const byId = new Map(reg.ideas.map((i) => [i.id, i]));
  const push = (rule: Rule, level: Level, text: string, ideaId?: string, capabilityId?: string) => hits.push({ ruleId: rule.id, rule: rule.name, level, text, ideaId, capabilityId });
  const ageH = hoursBetween(reg.asOf, now);
  if (ageH > 36) hits.push({ ruleId: 'R-00', rule: 'Freshness', level: 'alert', text: `This snapshot is ${Math.floor(ageH / 24) || Math.floor(ageH)} ${ageH >= 48 ? 'days' : ageH >= 24 ? 'day' : 'hours'} old. ${reg.generatedBy}` });

  for (const rule of rules) {
    const inStage = (i: Idea) => !rule.stages || rule.stages.includes(i.stage);
    const level = (days: number): Level | null => (rule.alertDays != null && days >= rule.alertDays ? 'alert' : rule.warnDays != null && days >= rule.warnDays ? 'warn' : null);
    switch (rule.kind) {
      case 'untouched':
        for (const i of reg.ideas) {
          if (!inStage(i)) continue;
          const d = derived.get(i.id)!;
          const lv = level(d.daysUntouched);
          if (lv) push(rule, lv, `${i.id} ${i.slug} untouched ${d.daysUntouched} days (${i.stage}).`, i.id);
        }
        break;
      case 'no-session':
        for (const i of reg.ideas) {
          if (!inStage(i)) continue;
          const u = updateState(reg, i, now);
          if (u.daysSinceSession == null) push(rule, 'warn', `${i.id} ${i.slug}: no session logged yet, so no health call.`, i.id);
          else if (u.level === 'alert' || u.level === 'warn') push(rule, u.level, `${i.id} ${i.slug}: update missing, last session ${u.daysSinceSession} days ago.`, i.id);
        }
        break;
      case 'high-score-idle':
        for (const i of reg.ideas) {
          if (!inStage(i) || i.score.composite == null || (rule.minScore != null && i.score.composite < rule.minScore)) continue;
          const d = derived.get(i.id)!;
          const days = d.daysInStage ?? d.daysUntouched;
          const lv = level(days);
          if (lv) push(rule, lv, `${i.id} ${i.slug} scores ${i.score.composite} and has sat in ${i.stage} for ${days} days.`, i.id);
        }
        break;
      case 'pending-decision':
        for (const dcn of reg.decisions) {
          if (!dcn.pending) continue;
          const days = daysBetween(dcn.date, now);
          const lv = level(days);
          if (lv) push(rule, lv, `${dcn.ideaId} ${byId.get(dcn.ideaId)?.slug ?? ''}: a decision has waited ${days} days (${dcn.id ?? dcn.date}).${rule.escalate ? ` Escalation: ${rule.escalate}.` : ''}`, dcn.ideaId);
        }
        break;
      case 'proposal-without-critique':
        for (const i of reg.ideas) if (inStage(i) && i.critiqueRecorded === false && i.type !== 'Capability') push(rule, 'alert', `${i.id} ${i.slug} is at ${i.stage} with no recorded critique pass.`, i.id);
        break;
      case 'parked-recheck':
        for (const i of reg.ideas) if (i.stage === 'Parked' && derived.get(i.id)!.parkedOverdue) push(rule, 'alert', `${i.id} ${i.slug} is parked past its re-check date (${i.recheckDate}).`, i.id);
        break;
      case 'appetite':
        for (const i of reg.ideas) {
          const a = appetiteState(i, now);
          if (!a || i.stage === 'Graduated' || i.stage === 'Killed') continue;
          if (a.level === 'expired') push(rule, 'alert', `${i.id} ${i.slug}: appetite expired ${-a.daysLeft} days ago; back to Shaping, not extended.`, i.id);
          else if (rule.warnDays != null && a.daysLeft <= rule.warnDays) push(rule, 'warn', `${i.id} ${i.slug}: appetite ends in ${a.daysLeft} days (${i.appetiteEnds}).`, i.id);
        }
        break;
      case 'kill-signal':
        for (const i of reg.ideas)
          for (const k of i.killSignals ?? []) {
            if (k.status === 'fired') push(rule, 'alert', `${i.id} ${i.slug}: kill signal fired: ${k.signal}${k.action ? ` → ${k.action}` : ''}.`, i.id);
            else if (k.status === 'open' && k.by && daysUntil(k.by, now) < 0) push(rule, 'alert', `${i.id} ${i.slug}: kill signal lapsed on ${k.by} without a verdict: ${k.signal}.`, i.id);
            else if (k.status === 'open' && k.by && daysUntil(k.by, now) <= 14) push(rule, 'warn', `${i.id} ${i.slug}: kill signal due ${k.by}: ${k.signal}.`, i.id);
          }
        break;
      case 'next-step-due':
        for (const i of reg.ideas) {
          if (!i.nextStepDue || i.stage === 'Killed') continue;
          const d = daysUntil(i.nextStepDue, now);
          if (d < 0) push(rule, 'alert', `${i.id} ${i.slug}: next step overdue by ${-d} days (${i.nextStepDue}).`, i.id);
          else if (rule.warnDays != null && d <= rule.warnDays) push(rule, 'warn', `${i.id} ${i.slug}: next step due in ${d} days (${i.nextStepDue}).`, i.id);
        }
        break;
      case 'review-due':
        for (const dcn of reg.decisions) {
          if (!dcn.reviewOn || dcn.status === 'superseded') continue;
          const d = daysUntil(dcn.reviewOn, now);
          if (d < 0) push(rule, 'alert', `${dcn.ideaId}: decision ${dcn.id ?? ''} review overdue by ${-d} days (${dcn.reviewOn}).`, dcn.ideaId);
          else if (rule.warnDays != null && d <= rule.warnDays) push(rule, 'warn', `${dcn.ideaId}: decision ${dcn.id ?? ''} up for review in ${d} days (${dcn.reviewOn}).`, dcn.ideaId);
        }
        break;
      case 'no-theme':
        for (const i of reg.ideas) if (i.stage !== 'Killed' && i.themeIds.length === 0 && i.type !== 'Capability') push(rule, 'info', `${i.id} ${i.slug} serves no theme.`, i.id);
        break;
      case 'no-owner':
        for (const i of reg.ideas) if (/to be named|tbd|unassigned/i.test(i.owner.split(';')[0]) || !i.owner.trim()) push(rule, 'info', `${i.id} ${i.slug} has no named owner.`, i.id);
        break;
      case 'standard-behind':
        for (const i of reg.ideas) if (i.standardVersion && i.standardVersion !== reg.standardVersion && i.stage !== 'Graduated' && i.stage !== 'Killed') push(rule, 'info', `${i.id} ${i.slug} follows ${i.standardVersion}; current is ${reg.standardVersion}.`, i.id);
        break;
      case 'dependency-conflict':
        for (const c of dependencyConflicts(reg)) push(rule, 'warn', `${c.dependentId} depends on ${c.blockerId} but sits ahead of it: ${c.reason}.`, c.dependentId);
        break;
      case 'building-gate':
        for (const i of reg.ideas) {
          if (!inStage(i) || i.type === 'Capability') continue;
          const g = buildingGate(i);
          if (i.stage === 'Proposal' && !g.passed) push(rule, 'alert', `${i.id} ${i.slug} is funded but cannot start: needs ${g.missing.join(', ')}.`, i.id);
          if (i.stage === 'Building' && !g.passed) push(rule, 'alert', `${i.id} ${i.slug} is Building without ${g.missing.join(', ')}; the gate rule says it should not have started.`, i.id);
        }
        break;
      case 'governance-blocked':
        for (const i of reg.ideas) {
          const gv = i.governance;
          if (!gv || gv.status === 'not needed' || gv.status === 'cleared') continue;
          if (gv.status === 'blocked') push(rule, 'alert', `${i.id} ${i.slug}: governance review blocked (${gv.review ?? 'review'}; ${gv.owner ?? 'separate team'}).`, i.id);
          else if (gv.criticalPath) push(rule, 'warn', `${i.id} ${i.slug}: governance is on the critical path (${gv.review ?? 'review'}, ${gv.status ?? 'not started'}${gv.expectedWeeks != null ? `, about ${gv.expectedWeeks} weeks` : ''}).`, i.id);
        }
        break;
    }
  }
  const order: Record<Level, number> = { alert: 0, warn: 1, info: 2 };
  return hits.sort((a, b) => order[a.level] - order[b.level]);
}

export interface GateCheck {
  ownerNamed: boolean;
  streamNamed: boolean;
  appetiteSet: boolean;
  passed: boolean;
  missing: string[];
}

/** The Building gate: VAI's rule generalised. No owner, no stream or no appetite means no start. */
export function buildingGate(idea: Idea): GateCheck {
  // The sponsor is not an owner; a segment that says "to be named" is unmet; anything left that is not Jithin counts.
  const segments = idea.owner.split(/[;,]/).map((x) => x.trim()).filter(Boolean);
  const named = segments.filter((seg) => !/to be named|tbd|unassigned/i.test(seg) && !/sponsor/i.test(seg) && !/^jithin\b/i.test(seg) && !/^head of vi\b/i.test(seg));
  const ownerNamed = named.length > 0 && !segments.some((seg) => /to be named|tbd|unassigned/i.test(seg));
  const streamNamed = !!idea.streamId;
  const appetiteSet = idea.appetiteWeeks != null && idea.appetiteWeeks > 0;
  const missing: string[] = [];
  if (!ownerNamed) missing.push('an owner who is not Jithin');
  if (!streamNamed) missing.push('a stream');
  if (!appetiteSet) missing.push('an appetite in engineer-weeks');
  return { ownerNamed, streamNamed, appetiteSet, passed: missing.length === 0, missing };
}

export interface DecisionRow extends Decision {
  slug: string;
  reviewDays: number | null;
}

export function decisionIndex(reg: Register, now: Date): DecisionRow[] {
  const byId = new Map(reg.ideas.map((i) => [i.id, i]));
  return reg.decisions.map((d) => ({ ...d, slug: byId.get(d.ideaId)?.slug ?? '', reviewDays: d.reviewOn ? daysUntil(d.reviewOn, now) : null }));
}

export const SAVED_QUESTIONS: { key: string; label: string }[] = [
  { key: 'decision', label: 'Decisions pending on me' },
  { key: 'due-week', label: 'Due within 7 days' },
  { key: 'stale', label: 'Stale or past re-check' },
  { key: 'update-missing', label: 'Update missing' },
  { key: 'blocked', label: 'Blocked or blocking' },
  { key: 'no-theme', label: 'No theme' },
  { key: 'open-blocking', label: 'Blocking questions, no owner' },
  { key: 'appetite', label: 'Appetite ending' },
  { key: 'quiet', label: 'Quiet' },
];

export function matchesQuestion(reg: Register, derived: Map<string, Derived>, idea: Idea, key: string, now: Date): boolean {
  const d = derived.get(idea.id)!;
  switch (key) {
    case 'decision':
      return d.needsDecision;
    case 'due-week': {
      const step = idea.nextStepDue ? daysUntil(idea.nextStepDue, now) : null;
      const reviews = reg.decisions.filter((x) => x.ideaId === idea.id && x.reviewOn && x.status !== 'superseded').map((x) => daysUntil(x.reviewOn!, now));
      return (step != null && step <= 7) || reviews.some((r) => r <= 7);
    }
    case 'stale':
      return d.stale || d.parkedOverdue;
    case 'update-missing': {
      const u = updateState(reg, idea, now);
      return u.level === 'warn' || u.level === 'alert';
    }
    case 'blocked':
      return d.blockedBy.length > 0 || d.blocksParent;
    case 'no-theme':
      return idea.themeIds.length === 0 && idea.stage !== 'Killed' && idea.type !== 'Capability';
    case 'open-blocking':
      return (idea.openQuestions ?? []).some((q) => /^yes/i.test(q.blocking) && /to be named|tbd|unassigned/i.test(q.owner));
    case 'appetite': {
      const a = appetiteState(idea, now);
      return !!a && a.level !== 'ok';
    }
    case 'quiet':
      return d.reasons.some((r) => r.kind === 'quiet');
    default:
      return true;
  }
}

export const STAGE_ORDER = STAGES;
