import { useState } from 'react';
import { useLab } from '../lib/context';
import { CRITERIA, dueItems, type Idea } from '../lib/types';
import DueCard from './DueCard';
import { MODES, defaultMode, readiness, relatedIdeas, sessionLine, capabilityPriority, type Mode } from '../lib/derive';
import { canonicalId } from '../lib/graph';
import { healthOf, updateState, appetiteState, buildingGate } from '../lib/derive2';
import { RUBRIC, LINK_MEANING } from '../lib/rubric';
import { fmtDate, relDays } from '../lib/format';
import { CopyButton, Horizon, NewChip, ReasonChips, Section, StageMark, TypeBadge } from './ui';

export default function DetailPanel({ id, variant }: { id: string | null; variant: 'column' | 'sheet' }) {
  const { reg } = useLab();
  if (!id) {
    if (variant === 'sheet') return null;
    return (
      <div className="detail">
        <p className="empty">Select a row, a card or a node to see its lab record, links, decisions and next step here.</p>
      </div>
    );
  }
  if (id.startsWith('CAP-')) return <CapabilityDetail id={id} />;
  if (id.startsWith('T-')) return <ThemeDetail id={id} />;
  const idea = reg.ideas.find((i) => i.id === id);
  if (!idea) return <p className="empty">No row {id} in the register.</p>;
  return <IdeaDetail idea={idea} />;
}

function nameOf(reg: ReturnType<typeof useLab>['reg'], id: string | null, label: string): string {
  if (!id) return label;
  const i = reg.ideas.find((x) => x.id === id);
  if (i) return `${i.id} ${i.slug}`;
  const c = reg.capabilities.find((x) => x.id === id);
  if (c) return c.name;
  const t = reg.themes.find((x) => x.id === id);
  if (t) return `${t.id} ${t.name.split(':')[0]}`;
  return label;
}

function IdeaDetail({ idea }: { idea: Idea }) {
  const { reg, derived, now, select, lastVisit, hidden, inbox } = useLab();
  const d = derived.get(idea.id)!;
  const health = healthOf(reg, idea.id);
  const upd = updateState(reg, idea, now);
  const appetite = appetiteState(idea, now);
  const active = idea.stage !== 'Graduated' && idea.stage !== 'Killed';
  const mentions = (reg.mentions ?? []).filter((m) => m.ideaId === idea.id);
  const stepDue = idea.nextStepDue ? Math.floor((Date.parse(`${idea.nextStepDue}T00:00:00Z`) - now.getTime()) / 86_400_000) : null;
  const gate = buildingGate(idea);
  const stream = idea.streamId ? (reg.streams ?? []).find((st) => st.id === idea.streamId) : null;
  const rejection = idea.rejectedBy ? reg.decisions.find((x) => x.id === idea.rejectedBy) : null;
  const showGate = idea.type !== 'Capability' && (idea.stage === 'Proposal' || idea.stage === 'Building' || idea.stage === 'Stress test');
  const [mode, setMode] = useState<Mode>(defaultMode(idea.stage));
  const parent = idea.parentId ? reg.ideas.find((i) => i.id === idea.parentId) : null;
  const children = reg.ideas.filter((i) => i.parentId === idea.id);
  const out = reg.links.filter((l) => l.fromId === idea.id);
  const inbound = reg.links.filter((l) => canonicalId(reg, l.toId) === idea.id);
  const related = relatedIdeas(reg, idea.id);
  const decisions = reg.decisions.filter((x) => x.ideaId === idea.id).slice().reverse();
  const sessions = reg.sessions.filter((s) => (s.ideaIds ?? []).includes(idea.id));
  const gates = readiness(idea, reg);
  const isNew = !!lastVisit && idea.lastTouched > lastVisit;
  const asCapability = idea.capabilityId ? reg.capabilities.find((c) => c.id === idea.capabilityId) : null;
  const blockingFirst = [...(idea.openQuestions ?? [])].sort((a, b) => Number(/^yes/i.test(b.blocking)) - Number(/^yes/i.test(a.blocking)));

  return (
    <div className="detail">
      <div className="meta">
        <span className="id">{idea.id}</span>
        <span className="slug">{idea.slug}</span>
        <TypeBadge type={idea.type} />
        <Horizon h={idea.horizon} />
        <NewChip show={isNew} />
      </div>
      <h2 style={{ marginTop: 6 }}>{idea.title}</h2>
      <div className="meta" style={{ marginTop: 8 }}>
        <StageMark stage={idea.stage} note={idea.stageNote} />
        {idea.stageNote && <span className="faint small">{idea.stageNote}</span>}
      </div>
      {active && (
        <div className="meta" style={{ marginTop: 8 }}>
          {health ? (
            <span className="health" data-h={health.health} title={health.note ? `${health.note} (${fmtDate(health.date)})` : fmtDate(health.date)}>
              {health.health.replace('-', ' ')} as of {fmtDate(health.date)}
            </span>
          ) : (
            <span className="health" data-h="missing">no health call yet</span>
          )}
          {(upd.level === 'warn' || upd.level === 'alert') && <span className={`chip ${upd.level}`}>update missing{upd.daysSinceSession != null ? `: last session ${upd.daysSinceSession} days ago` : ''}</span>}
          {appetite && <span className={`chip ${appetite.level === 'expired' ? 'alert' : appetite.level === 'warn' ? 'warn' : ''}`}>{appetite.level === 'expired' ? `appetite expired ${-appetite.daysLeft} days ago` : `appetite: ${appetite.daysLeft} days left`}</span>}
        </div>
      )}
      {health?.note && <p className="faint small" style={{ marginTop: 4 }}>{health.note}</p>}
      {d.reasons.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <ReasonChips reasons={d.reasons} max={6} />
        </div>
      )}

      {(idea.decisionsDue.length > 0 || idea.score.status === 'proposed') && (
        <section className="due">
          <h3>Needs your decision</h3>
          {idea.score.status === 'proposed' && !dueItems(idea).some((x) => /score|rubric/i.test(x.text)) && (
            <p className="small">Set the rubric composite ({idea.score.composite} proposed{idea.score.date ? ` on ${fmtDate(idea.score.date)}` : ''}).</p>
          )}
          <div className="duelist">
            {dueItems(idea).map((item) => (
              <DueCard key={item.id} idea={idea} item={item} />
            ))}
          </div>
          {inbox.error && <p className="small" style={{ color: 'var(--crit)', marginTop: 6 }}>{inbox.error}</p>}
        </section>
      )}

      {rejection && (
        <section className="due">
          <h3>Rejected by Jithin</h3>
          <p className="small">
            {rejection.id} on {fmtDate(rejection.date)}: {rejection.decision}
          </p>
        </section>
      )}

      {showGate && (
        <Section title="Building gate" aside={gate.passed ? (idea.stage === 'Building' ? 'passed; building' : 'passed; can start') : idea.stage === 'Proposal' ? 'funded, cannot start yet' : 'not yet'}>
          <ul className="checklist">
            <li>
              <span className={`mark${gate.ownerNamed ? ' met' : ''}`} />
              <span>
                An owner who is not Jithin <span className="faint small">— {idea.owner}</span>
              </span>
            </li>
            <li>
              <span className={`mark${gate.streamNamed ? ' met' : ''}`} />
              <span>
                A stream <span className="faint small">— {stream ? `${stream.id} ${stream.name}${stream.owner ? `, ${stream.owner}` : ', engineer to be named'}` : 'none'}</span>
              </span>
            </li>
            <li>
              <span className={`mark${gate.appetiteSet ? ' met' : ''}`} />
              <span>
                An appetite in engineer-weeks <span className="faint small">— {idea.appetiteWeeks != null ? `${idea.appetiteWeeks} engineer-weeks${idea.appetiteEnds ? `, ends ${fmtDate(idea.appetiteEnds)}` : ''}` : idea.appetite ?? 'not set'}</span>
              </span>
            </li>
          </ul>
          <p className="faint small" style={{ marginTop: 6 }}>
            {idea.stage === 'Proposal' ? 'Funded by default at Proposal; a rejection is a logged decision. The row starts Building when all three are present.' : 'VAI\'s rule, generalised: unnamed, not started.'}
          </p>
        </Section>
      )}

      {idea.type !== 'Capability' && (
        <Section title="Production surface" aside={idea.productionSurface ? 'named' : 'not named'}>
          {idea.productionSurface ? (
            <dl className="kv">
              <dt>Who uses it</dt>
              <dd>{idea.productionSurface.users || '—'}</dd>
              <dt>Where it lives</dt>
              <dd>{idea.productionSurface.system || '—'}</dd>
              <dt>The number that moves</dt>
              <dd>{idea.productionSurface.metric || '—'}</dd>
            </dl>
          ) : (
            <p className="empty">Not named at Shaping. Until it is, this row counts as an H3 experiment, not a product.</p>
          )}
        </Section>
      )}

      <Section title="Next step" aside={idea.nextStepDue ? `due ${fmtDate(idea.nextStepDue)}` : 'no due date recorded'}>
        <p>{idea.nextStep}</p>
        {stepDue != null && (
          <p className="small" style={{ marginTop: 4, color: stepDue < 0 ? 'var(--crit)' : stepDue <= 7 ? 'var(--warn)' : 'var(--ink-3)' }}>
            {stepDue < 0 ? `${-stepDue} days overdue` : stepDue === 0 ? 'due today' : `${stepDue} days left`}
            {idea.nextStepOrigin ? `; set by decision ${idea.nextStepOrigin}` : ''}
          </p>
        )}
      </Section>

      <Section title="Open a session" aside="paste into a new chat">
        <div className="row" style={{ marginBottom: 6 }}>
          <label htmlFor={`mode-${idea.id}`} className="faint small">
            Mode
          </label>
          <select id={`mode-${idea.id}`} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            {MODES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <CopyButton text={sessionLine(idea, mode)} label="Copy session line" />
      </Section>

      <Section title="Lab record">
        <dl className="kv">
          <dt>Owner</dt>
          <dd>{idea.owner}</dd>
          <dt>Parent</dt>
          <dd>
            {parent ? (
              <button type="button" className="link" onClick={() => select(parent.id)}>
                {parent.id} {parent.slug}
              </button>
            ) : (
              '—'
            )}
          </dd>
          {children.length > 0 && (
            <>
              <dt>Features</dt>
              <dd>
                {children.map((c) => (
                  <button key={c.id} type="button" className="link" style={{ marginRight: 8 }} onClick={() => select(c.id)}>
                    {c.id} {c.slug}
                  </button>
                ))}
              </dd>
            </>
          )}
          <dt>Theme</dt>
          <dd>{idea.themeIds.length ? idea.themeIds.map((t) => nameOf(reg, t, t)).join(', ') : 'none'}</dd>
          <dt>Stream</dt>
          <dd>{stream ? `${stream.id} ${stream.name}` : 'none'}</dd>
          <dt>Appetite</dt>
          <dd>{idea.appetiteWeeks != null ? `${idea.appetiteWeeks} engineer-weeks${idea.appetite ? ` (${idea.appetite})` : ''}` : idea.appetite ?? 'not set'}</dd>
          <dt>Governance</dt>
          <dd>
            {idea.governance ? (
              <>
                {idea.governance.status ?? 'not started'}
                {idea.governance.review ? `: ${idea.governance.review}` : ''}
                {idea.governance.owner ? ` (${idea.governance.owner})` : ''}
                {idea.governance.expectedWeeks != null && idea.governance.expectedWeeks > 0 ? `, about ${idea.governance.expectedWeeks} weeks` : ''}
                {idea.governance.criticalPath && <span className="chip warn" style={{ marginLeft: 6 }}>critical path</span>}
              </>
            ) : (
              'not recorded; handled by a separate team'
            )}
          </dd>
          <dt>Doc</dt>
          <dd>
            {idea.docUrl ? (
              <a href={idea.docUrl} target="_blank" rel="noreferrer">
                {idea.docTitle ?? 'Open the doc'}
              </a>
            ) : (
              (idea.docTitle ?? 'none')
            )}
          </dd>
          <dt>Standard</dt>
          <dd>{idea.standardVersion ?? '—'}{idea.standardVersion && idea.standardVersion !== reg.standardVersion ? ` (current ${reg.standardVersion})` : ''}</dd>
          <dt>Last touched</dt>
          <dd>
            {fmtDate(idea.lastTouched)} ({relDays(d.daysUntouched)}){d.window != null ? `; window ${d.window} days` : ''}
          </dd>
          <dt>In stage</dt>
          <dd>{d.daysInStage != null ? `${d.daysInStage} days (since ${fmtDate(idea.stageSince!)})` : 'not recorded'}</dd>
          {idea.priority && (
            <>
              <dt>Priority</dt>
              <dd>{idea.priority}</dd>
            </>
          )}
          {idea.graduatedTo && (
            <>
              <dt>Graduated to</dt>
              <dd>{idea.graduatedTo}</dd>
            </>
          )}
          {idea.recheckDate && (
            <>
              <dt>Re-check</dt>
              <dd>{fmtDate(idea.recheckDate)}</dd>
            </>
          )}
          <dt>Sensitivity</dt>
          <dd>{idea.sensitivity === 'flagged' ? 'flagged' : 'none'}</dd>
          <dt>Critique</dt>
          <dd>{idea.critiqueRecorded === true ? 'recorded' : idea.critiqueRecorded === false ? 'not yet' : 'not recorded in the register'}</dd>
        </dl>
      </Section>

      {!hidden('rubric') && (
      <Section title="Rubric" aside={idea.score.date ? fmtDate(idea.score.date) : undefined}>
        {idea.score.composite == null ? (
          <p className="empty">{idea.score.note ?? 'Not scored; scored at Stress test or later.'}</p>
        ) : (
          <>
            <div className="composite">
              <span className="n">{idea.score.composite.toFixed(1)}</span>
              <span className="small">
                {idea.score.status}
                {d.compositeProposed != null && reg.proposedWeights ? `; ${d.compositeProposed.toFixed(2)} on the proposed weights` : ''}
                {reg.proposedPortfolioBar != null ? `; proposed bar ${reg.proposedPortfolioBar}` : ''}
              </span>
            </div>
            {idea.score.note && <p className="faint small" style={{ margin: '4px 0 8px' }}>{idea.score.note}</p>}
            {idea.score.criteria && (
              <div className="score-bars">
                {CRITERIA.map((c) => {
                  const v = idea.score.criteria?.[c];
                  if (v == null) return null;
                  return (
                    <div key={c} className="score-bar" title={`${RUBRIC[c].name}: a 5 is “${RUBRIC[c].five}”; a 1 is “${RUBRIC[c].one}”`}>
                      <span>{RUBRIC[c].name}</span>
                      <span className="track">
                        <span className="fill" style={{ width: `${(v / 5) * 100}%` }} />
                      </span>
                      <span>{v}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </Section>
      )}

      {!hidden('links') && (
      <Section title="Links" aside={`${out.length + inbound.length}`}>
        {out.length + inbound.length === 0 ? (
          <p className="empty">No links recorded.</p>
        ) : (
          <div className="linklist">
            {out.map((l, i) => (
              <div key={`o${i}`}>
                <span className="ltype" title={LINK_MEANING[l.type]}>
                  {l.type}
                </span>
                {canonicalId(reg, l.toId) ? (
                  <button type="button" className="link" onClick={() => select(canonicalId(reg, l.toId))}>
                    {nameOf(reg, canonicalId(reg, l.toId), l.toLabel)}
                  </button>
                ) : (
                  <span>{l.toLabel}</span>
                )}
                {l.note && <span className="faint small"> — {l.note}</span>}
              </div>
            ))}
            {inbound.map((l, i) => (
              <div key={`i${i}`}>
                <span className="ltype" title={LINK_MEANING[l.type]}>
                  ← {l.type}
                </span>
                <button type="button" className="link" onClick={() => select(l.fromId)}>
                  {nameOf(reg, l.fromId, l.fromId)}
                </button>
                {l.note && <span className="faint small"> — {l.note}</span>}
              </div>
            ))}
          </div>
        )}
        {d.blockedBy.length > 0 && <p className="small" style={{ marginTop: 6, color: 'var(--warn)' }}>Waits on {d.blockedBy.join(', ')} before it can graduate.</p>}
        {d.blocks.length > 0 && <p className="small" style={{ marginTop: 6 }}>{d.blocks.join(', ')} cannot graduate until this does.</p>}
        {related.length > 0 && (
          <p className="faint small" style={{ marginTop: 8 }}>
            Within two hops:{' '}
            {related.map((r, i) => (
              <span key={r}>
                {i > 0 && ', '}
                <button type="button" className="link" onClick={() => select(r)}>
                  {r}
                </button>
              </span>
            ))}
          </p>
        )}
        <p className="faint small" style={{ marginTop: 6 }}>
          Mentions in other docs: {mentions.length === 0 ? 'none found; the sync does not scan doc text yet' : mentions.map((m, i) => (
            <span key={i}>
              {i > 0 && '; '}
              <button type="button" className="link" onClick={() => select(m.inIdeaId)}>
                {m.inIdeaId}
              </button>{' '}
              “{m.snippet}”
            </span>
          ))}
        </p>
      </Section>
      )}

      {asCapability && (
        <Section title="As a catalogue capability">
          <dl className="kv">
            <dt>Kind</dt>
            <dd>{asCapability.kind}</dd>
            <dt>Maturity</dt>
            <dd>{asCapability.maturity}</dd>
            <dt>Reused by</dt>
            <dd>{asCapability.reusedBy}</dd>
            <dt>Demand</dt>
            <dd>
              {asCapability.demand} {capabilityPriority(asCapability) ? `(${capabilityPriority(asCapability)})` : ''}
            </dd>
          </dl>
        </Section>
      )}

      {idea.type !== 'Capability' && (
        <Section title="Graduation gates" aside={`${gates.filter((g) => g.met).length} of ${gates.length}`}>
          <ul className="checklist">
            {gates.map((g) => (
              <li key={g.label}>
                <span className={`mark${g.met ? ' met' : ''}`} />
                <span>
                  {g.label} <span className="faint small">— {g.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

 {blockingFirst.length > 0 && !hidden('openQuestions') && (
        <Section title="Open questions" aside={`${blockingFirst.filter((q) => /^yes/i.test(q.blocking)).length} blocking`}>
          <table className="plain">
            <thead>
              <tr>
                <th>Question</th>
                <th>Owner</th>
                <th>Blocking</th>
              </tr>
            </thead>
            <tbody>
              {blockingFirst.map((q, i) => (
                <tr key={i}>
                  <td>{q.question}</td>
                  <td>{q.owner}</td>
                  <td style={{ color: /^yes/i.test(q.blocking) ? 'var(--warn)' : undefined }}>{q.blocking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {idea.hypotheses && idea.hypotheses.length > 0 && !hidden('hypotheses') && (
        <details>
          <summary>
            Hypotheses <small>{idea.hypotheses.length}, pre-registered; {idea.hypotheses.filter((h) => h.result === 'confirmed' || h.result === 'refuted').length} resolved</small>
          </summary>
          <table className="plain">
            <thead>
              <tr>
                <th>Claim</th>
                <th>Confirmed if</th>
                <th>Refuted if</th>
                <th>Evidence</th>
                <th>Confidence</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {idea.hypotheses.map((h, i) => (
                <tr key={i}>
                  <td>
                    {h.claim}
                    <div className="faint">{h.measurement}</div>
                  </td>
                  <td>{h.confirmedIf}</td>
                  <td>{h.refutedIf}</td>
                  <td>{h.evidence != null ? ['opinion', 'one experiment', 'repeated'][h.evidence] : 'not set'}</td>
                  <td>{h.confidence != null ? `${h.confidence}%` : 'not set'}</td>
                  <td>
                    {h.result ?? 'open'}
                    {h.resolveBy && <div className="faint tiny">by {fmtDate(h.resolveBy)}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}

      {idea.killSignals && idea.killSignals.length > 0 && !hidden('killCriteria') && (
        <details>
          <summary>
            Kill signals <small>{idea.killSignals.filter((k) => k.status === 'open').length} open, {idea.killSignals.filter((k) => k.by).length} dated</small>
          </summary>
          <table className="plain">
            <thead>
              <tr>
                <th>Signal</th>
                <th>By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {idea.killSignals.map((k, i) => (
                <tr key={i}>
                  <td>{k.signal}</td>
                  <td>{k.by ? fmtDate(k.by) : 'no date'}</td>
                  <td style={{ color: k.status === 'fired' || k.status === 'lapsed' ? 'var(--crit)' : undefined }}>{k.status}</td>
                  <td>{k.action ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}

      {idea.killCriteria && idea.killCriteria.length > 0 && !hidden('killCriteria') && (!idea.killSignals || idea.killSignals.length === 0) && (
        <details>
          <summary>
            Kill and park criteria <small>{idea.killCriteria.length}</small>
          </summary>
          <table className="plain">
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Checked</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {idea.killCriteria.map((k, i) => (
                <tr key={i}>
                  <td>{k.criterion}</td>
                  <td>{k.checked}</td>
                  <td>{k.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}

      {idea.phases && idea.phases.length > 0 && (
        <details>
          <summary>
            Phasing <small>{idea.phases.length} phases</small>
          </summary>
          <ol style={{ paddingLeft: 18, margin: '6px 0 0', fontSize: '0.86rem' }}>
            {idea.phases.map((p, i) => (
              <li key={i} style={{ marginTop: 6 }}>
                <strong>{p.name}.</strong> {p.summary}
                {p.exitGate && <div className="faint">Exit gate: {p.exitGate}</div>}
              </li>
            ))}
          </ol>
        </details>
      )}

 {(idea.stage === 'Shipped' || idea.stage === 'Graduated' || idea.shipped) && idea.type !== 'Capability' && (
        <Section title="Shipped" aside={idea.shipped?.date ? fmtDate(idea.shipped.date) : 'no Shipped line'}>
          {idea.shipped?.date ? (
            <dl className="kv">
              <dt>First user</dt>
              <dd>{idea.shipped.firstUser || 'not recorded'}</dd>
              <dt>Metric read</dt>
              <dd>{idea.shipped.metricRead ? `${idea.shipped.metricRead}${idea.shipped.metricDate ? ` (${fmtDate(idea.shipped.metricDate)})` : ''}` : 'not read yet; the Shipped window is 30 days'}</dd>
            </dl>
          ) : (
            <p className="empty">Graduated without a Shipped line. The retrospective asks whether anyone uses it.</p>
          )}
        </Section>
      )}

      {idea.stage === 'Graduated' && idea.type !== 'Capability' && (
        <Section title="Retrospective" aside={idea.outcome?.retroAt ? `due ${fmtDate(idea.outcome.retroAt)}` : 'not scheduled'}>
          <div className="retro">
            <div>
              <div className="label">What the proposal said</div>
              <div>{idea.outcome?.proposalSnapshot || 'No proposal snapshot recorded (pre-standard graduation).'}</div>
            </div>
            <div>
              <div className="label">What was delivered</div>
              <div>{idea.outcome?.delivered || 'Not yet recorded; filled at the retrospective.'}</div>
            </div>
          </div>
          {idea.outcome?.retroResult && <p className="small" style={{ marginTop: 6 }}>{idea.outcome.retroResult}</p>}
        </Section>
      )}

      {!hidden('decisions') && (
      <Section title="Decisions" aside={`${decisions.length}`}>
        {decisions.length === 0 ? (
          <p className="empty">No decision logged for this row yet.</p>
        ) : (
          decisions.map((x, i) => (
            <div key={i} className="log-row">
              <div>
                <div className="small">{fmtDate(x.date)}</div>
                {x.id && <div className="faint tiny">{x.id}</div>}
                {x.pending && <div className="pending">pending</div>}
              </div>
              <div>
                <div style={{ textDecoration: x.status === 'superseded' ? 'line-through' : undefined }}>{x.decision}</div>
                {!hidden('decisions-by') && <div className="by">{x.by}</div>}
                <div className="row" style={{ gap: 6, marginTop: 2 }}>
                  {x.type === 'rejection' && <span className="chip alert">rejection</span>}
                  {x.type === 'gate' && <span className="chip">gate</span>}
                  {x.type === 'retro' && <span className="chip">retro</span>}
                  {x.door && <span className="chip">{x.door} door</span>}
                  {x.reviewOn && <span className="chip">review {fmtDate(x.reviewOn)}</span>}
                  {x.supersedes && <span className="chip">supersedes {x.supersedes}</span>}
                </div>
              </div>
            </div>
          ))
        )}
      </Section>
      )}

      {sessions.length > 0 && !hidden('sessions') && (
        <Section title="Sessions" aside={`${sessions.length}`}>
          {sessions.map((s, i) => (
            <div key={i} className="log-row">
              <div className="small">{fmtDate(s.date)}</div>
              <div>
                <div className="small">
                  <strong>{s.mode}</strong> · {s.outcome}
                </div>
                {s.health && <div className="row" style={{ gap: 6, marginTop: 2 }}><span className="health" data-h={s.health}>{s.health.replace('-', ' ')}</span>{s.healthNote && <span className="faint tiny">{s.healthNote}</span>}</div>}
              </div>
            </div>
          ))}
        </Section>
      )}

      {idea.flags.length > 0 && !hidden('flags') && (
        <Section title="Audit flags" aside="from the sync">
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.86rem' }}>
            {idea.flags.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

function CapabilityDetail({ id }: { id: string }) {
  const { reg, select } = useLab();
  const cap = reg.capabilities.find((c) => c.id === id);
  if (!cap) return <p className="empty">No capability {id} in the catalogue.</p>;
  const inbound = reg.links.filter((l) => l.toId === id);
  const prio = capabilityPriority(cap);
  return (
    <div className="detail">
      <div className="meta">
        <span className="id">{cap.id}</span>
        <TypeBadge type="Capability" />
      </div>
      <h2 style={{ marginTop: 6 }}>{cap.name}</h2>
      <Section title="Catalogue row">
        <dl className="kv">
          <dt>Kind</dt>
          <dd>{cap.kind}</dd>
          <dt>Maturity</dt>
          <dd>{cap.maturity}</dd>
          <dt>Created by</dt>
          <dd>
            {cap.createdById ? (
              <button type="button" className="link" onClick={() => select(cap.createdById!)}>
                {cap.createdBy}
              </button>
            ) : (
              cap.createdBy
            )}
          </dd>
          <dt>Reused by</dt>
          <dd>{cap.reusedBy}</dd>
          <dt>Demand</dt>
          <dd>
            {cap.demandNote ?? cap.demand}
            {prio === 'platform priority' && <span className="chip decision" style={{ marginLeft: 8 }}>platform priority: 3+ reuses</span>}
            {prio === 'watch' && <span className="chip stale" style={{ marginLeft: 8 }}>no reuse yet</span>}
          </dd>
        </dl>
        <p className="faint small" style={{ marginTop: 8 }}>
          A capability reused by three or more ideas is a platform priority; one nobody reuses after two quarters is reviewed for retirement. An idea that depends on a capability still at Idea or Proposed maturity inherits that risk.
        </p>
      </Section>
      <Section title="Links" aside={`${inbound.length}`}>
        {inbound.length === 0 ? (
          <p className="empty">No idea links to this capability yet.</p>
        ) : (
          <div className="linklist">
            {inbound.map((l, i) => (
              <div key={i}>
                <span className="ltype">← {l.type}</span>
                <button type="button" className="link" onClick={() => select(l.fromId)}>
                  {nameOf(reg, l.fromId, l.fromId)}
                </button>
                {l.note && <span className="faint small"> — {l.note}</span>}
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

function ThemeDetail({ id }: { id: string }) {
  const { reg, select } = useLab();
  const theme = reg.themes.find((t) => t.id === id);
  if (!theme) return <p className="empty">No theme {id}.</p>;
  const serving = reg.ideas.filter((i) => i.themeIds.includes(id));
  return (
    <div className="detail">
      <div className="meta">
        <span className="id">{theme.id}</span>
        <TypeBadge type="Theme" />
      </div>
      <h2 style={{ marginTop: 6 }}>{theme.name}</h2>
      {theme.note && <p className="muted small" style={{ marginTop: 6 }}>{theme.note}</p>}
      <Section title="Ideas serving it" aside={`${serving.length} of ${reg.ideas.length}`}>
        {serving.length === 0 ? (
          <p className="empty">No idea names this theme yet.</p>
        ) : (
          <div className="linklist">
            {serving.map((i) => (
              <div key={i.id}>
                <button type="button" className="link" onClick={() => select(i.id)}>
                  {i.id} {i.slug}
                </button>{' '}
                <span className="faint small">{i.stage}</span>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
