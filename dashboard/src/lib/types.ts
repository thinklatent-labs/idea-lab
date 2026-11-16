// Types for register.json (data contract v1.4). Keep in step with schema/register.schema.json.

export const STAGES = ['Seed', 'Shaping', 'Stress test', 'Proposal', 'Building', 'Shipped', 'Graduated', 'Merged', 'Parked', 'Killed'] as const;
/** Rows that carry no live work: their next steps and open items live elsewhere or are finished (D-387). */
export const CLOSED_STAGES: readonly Stage[] = ['Graduated', 'Merged', 'Killed'];
export type Stage = (typeof STAGES)[number];

export const NODE_TYPES = ['Theme', 'Idea', 'Feature', 'Capability', 'Experiment'] as const;
export type NodeType = (typeof NODE_TYPES)[number];

export const HORIZONS = ['H1', 'H2', 'H3'] as const;
export type Horizon = (typeof HORIZONS)[number];

export const LINK_TYPES = [
  'serves',
  'feature-of',
  'depends-on',
  'enables',
  'reuses',
  'creates',
  'competes-with',
  'supersedes',
  'evidence-for',
  'related-to',
] as const;
export type LinkType = (typeof LINK_TYPES)[number];

export const CRITERIA = [
  'strategicFit',
  'evidenceOfNeed',
  'differentiation',
  'feasibility',
  'valueAtStake',
  'governanceExposure',
  'reversibility',
  'compounding',
] as const;
export type Criterion = (typeof CRITERIA)[number];

export type Weights = Record<Criterion, number>;

export interface Score {
  composite: number | null;
  status: 'none' | 'proposed' | 'set';
  date?: string | null;
  criteria?: Partial<Record<Criterion, number>> | null;
  note?: string;
}

export interface Hypothesis {
  claim: string;
  measurement: string;
  confirmedIf: string;
  refutedIf: string;
  evidence?: 0 | 1 | 2 | null;
  confidence?: number | null;
  resolveBy?: string | null;
  result?: 'confirmed' | 'refuted' | 'open' | null;
}

export interface KillSignal {
  signal: string;
  by?: string | null;
  status: 'open' | 'fired' | 'lapsed' | 'cleared';
  action?: string;
}

export interface Outcome {
  proposalSnapshot?: string;
  delivered?: string;
  retroAt?: string | null;
  retroResult?: string;
}

export interface Rule {
  id: string;
  name: string;
  kind:
    | 'untouched'
    | 'no-session'
    | 'high-score-idle'
    | 'pending-decision'
    | 'proposal-without-critique'
    | 'parked-recheck'
    | 'appetite'
    | 'kill-signal'
    | 'next-step-due'
    | 'review-due'
    | 'no-theme'
    | 'no-owner'
    | 'standard-behind'
    | 'dependency-conflict'
    | 'building-gate'
    | 'governance-blocked';
  stages?: Stage[];
  minScore?: number;
  warnDays?: number;
  alertDays?: number;
  pendingDays?: number;
  escalate?: string;
  note?: string;
}

export interface Audience {
  id: string;
  name: string;
  hide: string[];
  hideFlaggedRows?: boolean;
  note?: string;
}

export interface Mention {
  ideaId: string;
  inIdeaId: string;
  snippet: string;
  date?: string;
}

export interface DueOption {
  id: string;
  label: string;
  effect: string;
}

/** A decision waiting on Jithin. quick: picked on the dashboard; input: needs the chat. */
export interface DueItem {
  id: string;
  text: string;
  kind: 'quick' | 'input';
  options?: DueOption[];
}

/** Legacy string items are input-needed. */
export function dueItems(idea: { id: string; decisionsDue: (string | DueItem)[] }): DueItem[] {
  return idea.decisionsDue.map((d, n) => (typeof d === 'string' ? { id: `${idea.id}-q${n + 1}`, text: d, kind: 'input' as const } : d));
}

export type Health = 'on-track' | 'at-risk' | 'off-track';

export interface Stream {
  id: string;
  name: string;
  owner?: string | null;
  focus?: string;
  startsWeek?: number | null;
  endsWeek?: number | null;
  slackPct?: number | null;
}

export interface ProgrammePhase {
  name: string;
  weeks: string;
  gate: string;
  streams?: string[];
  status?: 'planned' | 'active' | 'passed' | 'failed';
}

export interface ProductionSurface {
  users?: string;
  system?: string;
  metric?: string;
}

export interface Governance {
  review?: string;
  owner?: string;
  expectedWeeks?: number | null;
  status?: 'not needed' | 'not started' | 'in review' | 'cleared' | 'blocked';
  criticalPath?: boolean;
}

export interface Shipped {
  date?: string | null;
  firstUser?: string;
  metricRead?: string;
  metricDate?: string | null;
}

export interface OpenQuestion {
  question: string;
  owner: string;
  blocking: string;
}

export interface KillCriterion {
  criterion: string;
  checked: string;
  action: string;
}

export interface Phase {
  name: string;
  summary: string;
  exitGate?: string;
}

export interface Idea {
  id: string;
  slug: string;
  title: string;
  aliases?: string[];
  type: NodeType;
  parentId: string | null;
  themeIds: string[];
  stage: Stage;
  stageNote?: string;
  stageSince?: string | null;
  horizon: Horizon | null;
  appetite?: string | null;
  owner: string;
  score: Score;
  docUrl: string | null;
  docTitle?: string | null;
  standardVersion: string | null;
  lastTouched: string;
  nextStep: string;
  sensitivity: 'none' | 'flagged';
  priority?: 'P0' | 'P1' | 'P2' | null;
  critiqueRecorded?: boolean | null;
  capabilityId?: string | null;
  graduatedTo?: string | null;
  recheckDate?: string | null;
  decisionsDue: (string | DueItem)[];
  flags: string[];
  nextStepDue?: string | null;
  nextStepOrigin?: string | null;
  appetiteEnds?: string | null;
  createdOn?: string | null;
  stageHistory?: { stage: Stage; since: string }[];
  killSignals?: KillSignal[];
  outcome?: Outcome | null;
  streamId?: string | null;
  appetiteWeeks?: number | null;
  productionSurface?: ProductionSurface | null;
  governance?: Governance | null;
  shipped?: Shipped | null;
  rejectedBy?: string | null;
  buildingGate?: { ownerNamed?: boolean; streamNamed?: boolean; appetiteSet?: boolean; startedOn?: string | null; /** D-152: the weekly review slot Jithin commits to (schema 1.4). */ reviewSlot?: string | null } | null;
  hypotheses?: Hypothesis[];
  openQuestions?: OpenQuestion[];
  killCriteria?: KillCriterion[];
  phases?: Phase[];
  /** Merged rows only (schema 1.4, D-387): the higher-order idea this row was merged into. */
  mergedInto?: string | null;
  /** Merged rows only: the track that carries this row's purpose and open items; links naming the row resolve to it. */
  trackId?: string | null;
}

export type TrackStatus = 'active' | 'planned' | 'paused' | 'done' | 'split-out';

export interface TrackSource {
  id: string;
  slug?: string;
  title: string;
  type: NodeType;
  stageAtMerge: Stage;
  stageSince?: string | null;
  scoreAtMerge?: Score;
  docUrl?: string | null;
  docTitle?: string | null;
  lastTouched?: string | null;
  nextStepAtMerge?: string;
  nextStepDueAtMerge?: string | null;
  nextStepOriginAtMerge?: string | null;
}

/** A workstream inside a higher-order idea, made when a row is merged into it (schema 1.4, D-387). */
export interface Track {
  id: string;
  parentId: string;
  name: string;
  slug?: string;
  purpose: string;
  mergedFrom: string[];
  mergedOn: string;
  decisionId?: string | null;
  stage: Stage;
  status: TrackStatus;
  owner: string;
  streamId?: string | null;
  appetiteWeeks?: number | null;
  appetiteEnds?: string | null;
  reviewSlot?: string | null;
  nextStep: string;
  nextStepDue: string | null;
  nextStepOrigin?: string | null;
  docUrl?: string | null;
  docTitle?: string | null;
  lastTouched?: string;
  critiqueRecorded?: boolean | null;
  openQuestions?: OpenQuestion[];
  hypotheses?: Hypothesis[];
  killCriteria?: KillCriterion[];
  killSignals?: KillSignal[] | null;
  phases?: Phase[] | null;
  decisionsDue: (string | DueItem)[];
  governance?: Governance | null;
  productionSurface?: ProductionSurface | null;
  buildingGate?: Idea['buildingGate'];
  flags?: string[];
  sources: TrackSource[];
}

export interface Link {
  fromId: string;
  type: LinkType;
  toId: string | null;
  toLabel: string;
  note?: string;
}

export interface Capability {
  id: string;
  name: string;
  kind: 'Platform' | 'Data' | 'Process' | 'Evidence' | 'People';
  maturity: 'Idea' | 'Proposed' | 'Building' | 'Built' | 'In production' | 'Retiring';
  createdBy: string;
  createdById?: string | null;
  ideaId?: string | null;
  reusedBy: string;
  reusedByIds: string[];
  demand: number;
  demandNote?: string;
}

export interface Theme {
  id: string;
  name: string;
  note?: string;
}

export interface Session {
  date: string;
  scope: string;
  ideaIds?: string[];
  mode: string;
  outcome: string;
  docsTouched: string;
  health?: Health | null;
  healthNote?: string;
  nextStepDue?: string | null;
  trackIds?: string[];
}

export interface Decision {
  date: string;
  ideaId: string;
  decision: string;
  by: string;
  pending?: boolean;
  id?: string;
  status?: 'proposed' | 'accepted' | 'superseded';
  door?: 'one-way' | 'two-way' | null;
  infoLevel?: number | null;
  reviewOn?: string | null;
  supersedes?: string | null;
  type?: 'decision' | 'rejection' | 'gate' | 'retro' | null;
  trackId?: string | null;
}

export interface SyncRow {
  date: string;
  run: string;
  docsScanned: string;
  rowsChanged: string;
  flags: string;
}

export interface Portfolio {
  status: 'in force' | 'proposed';
  asOf: string;
  now?: string[];
  next?: string[];
  later?: string[];
  capabilitiesToWatch?: string[];
  horizonMixNote?: string;
  diagnosis?: string;
  spine?: {
    winningAspiration?: string;
    whereToPlay?: string;
    howToWin?: string;
    capabilitiesRequired?: string;
    managementSystems?: string;
  };
  digest?: string;
  redTeam?: { role: string; attacks: string; why?: string; person?: string | null }[];
}

export interface Register {
  schemaVersion: '1.0' | '1.1' | '1.2' | '1.3' | '1.4';
  asOf: string;
  generatedBy: string;
  source: { registerUrl: string; registerRev: number; operatingModelUrl?: string };
  standardVersion: string;
  weights: Weights;
  proposedWeights?: Weights;
  portfolioBar: number | null;
  proposedPortfolioBar?: number | null;
  stalenessWindows: Partial<Record<Stage, number | null>>;
  themes: Theme[];
  ideas: Idea[];
  /** Schema 1.4 (D-387); absent in older snapshots. */
  tracks?: Track[];
  links: Link[];
  capabilities: Capability[];
  sessions: Session[];
  decisions: Decision[];
  syncLog: SyncRow[];
  portfolio?: Portfolio;
  history?: { indexUrl: string; note?: string };
  rules?: Rule[];
  audiences?: Audience[];
  mentions?: Mention[];
  streams?: Stream[];
  phases?: ProgrammePhase[];
}

export interface SnapshotIndex {
  snapshots: { asOf: string; file: string; registerRev?: number; generatedBy?: string }[];
}
