// The rubric, as the Operating Model writes it. Shown beside scores so a number is never alone.
import type { Criterion } from './types';

export const RUBRIC: Record<Criterion, { name: string; five: string; one: string }> = {
  strategicFit: {
    name: 'Strategic fit',
    five: 'Advances sovereign AI, the ThinkLatent Portal and the foundation-model roadmap directly',
    one: 'Interesting but orthogonal to where ThinkLatent is going',
  },
  evidenceOfNeed: {
    name: 'Evidence of need',
    five: 'Named users, observed pain, a number that moves if it works',
    one: 'A hunch with no one asking for it',
  },
  differentiation: {
    name: 'Differentiation',
    five: 'Something only the Enterprise can do, or a contrarian truth we hold',
    one: 'Available off the shelf from a vendor',
  },
  feasibility: {
    name: 'Feasibility',
    five: 'Buildable by the team with what exists; appetite fits',
    one: 'Needs capability, data or approvals we do not have',
  },
  valueAtStake: {
    name: 'Value at stake',
    five: 'Spend, risk or revenue impact that leadership would notice',
    one: 'Marginal improvement to one workflow',
  },
  governanceExposure: {
    name: 'Governance exposure',
    five: 'Clear path through Risk, Compliance and Security',
    one: 'Touches regulated data or client advice with no obvious path',
  },
  reversibility: {
    name: 'Reversibility',
    five: 'Two-way door; cheap to try and stop',
    one: 'One-way door; commits the organisation',
  },
  compounding: {
    name: 'Compounding',
    five: 'Makes later ideas easier (shared data, platform, evidence)',
    one: 'Stands alone',
  },
};

export const LINK_MEANING: Record<string, string> = {
  serves: 'serves a theme',
  'feature-of': 'is a feature of',
  'depends-on': 'cannot ship without',
  enables: 'makes possible or cheaper',
  reuses: 'consumes the capability',
  creates: 'produces the capability',
  'competes-with': 'alternative route to the same outcome',
  supersedes: 'replaces',
  'evidence-for': 'result bears on',
  'related-to': 'shares users, data or a thesis with',
};

export const STAGE_MEANING: Record<string, string> = {
  Seed: 'A thought worth not losing; a register row with a one-line hypothesis',
  Shaping: 'Problem statement, users, why now, first version; the idea card',
  'Stress test': 'Critic and Scout: pre-mortem, kill criteria, prior art, rubric score',
  Proposal: 'Funded by default; Jithin rejects explicitly, everything else proceeds. Leaves when owner, stream and appetite are named',
  Building: 'Work running against the appetite; no owner, no stream or no appetite means no start',
  Shipped: 'A first user in production and the metric read; retrospectives count this',
  Graduated: 'A Project of its own with the Shipped evidence behind it; the lab keeps a pointer',
  Parked: 'Good but not now; a trigger and a re-check date',
  Killed: 'Fails the stress test or the decision; the reason is kept as evidence',
};
