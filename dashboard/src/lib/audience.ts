// The register as an audience preset may see it (TL-007 maintenance, 2026-11-07, audit S4).
// Before this, views and Jarvis read the full register and each view hid sections on its own, so a
// section or a `sensitivity: flagged` row could leak through any path that forgot to check. Now App
// filters once and every view, rule, digest and Jarvis tool reads only this copy. Views keep their own
// `hidden()` checks as a second line.
import type { Audience, Idea, Register } from './types';

/**
 * `alsoHide`: rows to treat as flagged even if this copy does not flag them. The diff snapshot passes the rows flagged
 * in the current register, so a row flagged since the snapshot does not show up as "removed" (re-check N-B).
 */
export function audienceRegister(reg: Register, audience: Audience, alsoHide: Iterable<string> = []): Register {
  const hide = new Set(audience.hide);
  if (!audience.hideFlaggedRows && hide.size === 0) return reg;

  const hiddenIds = new Set(audience.hideFlaggedRows ? [...reg.ideas.filter((i) => i.sensitivity === 'flagged').map((i) => i.id), ...alsoHide] : []);
  const keep = (id: string | null | undefined) => !id || !hiddenIds.has(id);

  const ideas: Idea[] = reg.ideas
    .filter((i) => !hiddenIds.has(i.id))
    .map((i) => {
      const x: Idea = { ...i };
      if (hide.has('rubric')) x.score = { composite: null, status: 'none', criteria: null };
      if (hide.has('killCriteria')) {
        delete x.killCriteria;
        delete x.killSignals;
      }
      if (hide.has('hypotheses')) delete x.hypotheses;
      if (hide.has('openQuestions')) delete x.openQuestions;
      if (hide.has('flags')) x.flags = [];
      if (hide.has('decisions')) x.decisionsDue = [];
      return x;
    });

  return {
    ...reg,
    ideas,
    decisions: hide.has('decisions') ? [] : reg.decisions.filter((d) => keep(d.ideaId)).map((d) => (hide.has('decisions-by') ? { ...d, by: '' } : d)),
    sessions: hide.has('sessions') ? [] : reg.sessions.filter((s) => (s.ideaIds ?? []).every((id) => keep(id))),
    links: hide.has('links') ? [] : reg.links.filter((l) => keep(l.fromId) && keep(l.toId)),
    capabilities: reg.capabilities
      .filter((c) => keep(c.ideaId) && keep(c.createdById))
      .map((c) => (c.reusedByIds ? { ...c, reusedByIds: c.reusedByIds.filter((id) => keep(id)) } : c)),
    mentions: reg.mentions?.filter((m) => keep((m as { ideaId?: string }).ideaId)),
    // The rule table is internal machinery; presets that hide flags see no alerts or warnings either.
    rules: hide.has('flags') ? [] : reg.rules,
  };
}
