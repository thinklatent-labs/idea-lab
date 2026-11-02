import { useMemo } from 'react';
import { useLab } from '../lib/context';
import { alerts, attentionQueue, stageCounts } from '../lib/derive';
import { evaluateRules, healthOf, openNextSteps, updateState, decisionIndex, dependencyConflicts, funnel, type RuleHit } from '../lib/derive2';
import { STAGES, dueItems, type Stage } from '../lib/types';
import DueCard from '../components/DueCard';
import { fmtDate, fmtDateTime, plural } from '../lib/format';
import { Section } from '../components/ui';

const STAGE_VAR: Record<Stage, string> = {
  Seed: 'var(--stage-seed)',
  Shaping: 'var(--stage-shaping)',
  'Stress test': 'var(--stage-stress)',
  Proposal: 'var(--stage-proposal)',
  Building: 'var(--stage-building)',
  Shipped: 'var(--stage-shipped)',
  Graduated: 'var(--stage-graduated)',
  Parked: 'var(--stage-parked)',
  Killed: 'var(--stage-killed)',
};

export default function Pulse() {
  const { reg, derived, now, go, select, setQueueFilter, lastVisit, hidden, visibleIdeas, inbox } = useLab();
  const counts = useMemo(() => stageCounts(visibleIdeas), [visibleIdeas]);
  const queue = useMemo(() => attentionQueue(reg, derived), [reg, derived]);
  const due = queue.filter((i) => derived.get(i.id)!.needsDecision);
  const stale = visibleIdeas.filter((i) => derived.get(i.id)!.stale || derived.get(i.id)!.parkedOverdue);
  const blocked = visibleIdeas.filter((i) => derived.get(i.id)!.blockedBy.length > 0 || derived.get(i.id)!.blocksParent);
  const pendingLines = reg.decisions.filter((d) => d.pending);
  const hits: RuleHit[] = useMemo(
    () =>
      reg.rules && reg.rules.length
        ? evaluateRules(reg, derived, now)
        : alerts(reg, derived, now).map((a): RuleHit => ({ ruleId: a.rule, rule: a.rule, level: a.severity === 'critical' ? 'alert' : a.severity === 'warning' ? 'warn' : 'info', text: a.text, ideaId: a.ideaId })),
    [reg, derived, now],
  );
  const lastSync = reg.syncLog[reg.syncLog.length - 1];
  const total = visibleIdeas.length;
  const active = visibleIdeas.filter((i) => i.stage !== 'Graduated' && i.stage !== 'Killed');
  const changed = lastVisit ? visibleIdeas.filter((i) => i.lastTouched > lastVisit).length + reg.decisions.filter((d) => d.date > lastVisit).length : 0;
  const dwell = (() => {
    const vals = active.map((i) => derived.get(i.id)!.daysInStage).filter((d): d is number => d != null);
    if (!vals.length) return null;
    vals.sort((a, b) => a - b);
    return vals[Math.floor(vals.length / 2)];
  })();
  const unknownStageSince = active.filter((i) => !i.stageSince).length;
  const health = active.map((i) => ({ i, h: healthOf(reg, i.id), u: updateState(reg, i, now) }));
  const hc = {
    'on-track': health.filter((x) => x.h?.health === 'on-track').length,
    'at-risk': health.filter((x) => x.h?.health === 'at-risk').length,
    'off-track': health.filter((x) => x.h?.health === 'off-track').length,
    missing: health.filter((x) => x.u.level === 'warn' || x.u.level === 'alert').length,
    none: health.filter((x) => !x.h).length,
  };
  const steps = useMemo(() => openNextSteps(reg, now).filter((s) => s.daysLeft != null && s.daysLeft <= 7), [reg, now]);
  const reviews = useMemo(() => decisionIndex(reg, now).filter((d) => d.reviewDays != null && d.reviewDays <= 7 && d.status !== 'superseded'), [reg, now]);
  const conflicts = useMemo(() => dependencyConflicts(reg), [reg]);
  const themes = reg.themes.map((t) => {
    const rows = visibleIdeas.filter((i) => i.themeIds.includes(t.id));
    const fits = rows.map((i) => i.score.criteria?.strategicFit).filter((v): v is number => v != null);
    return { t, rows, fit: fits.length ? fits.reduce((a, b) => a + b, 0) / fits.length : null };
  });
  const noTheme = visibleIdeas.filter((i) => i.themeIds.length === 0 && i.type !== 'Capability' && i.stage !== 'Killed');
  const fun = useMemo(() => funnel(reg), [reg]);
  const funMax = Math.max(1, ...fun.map((f) => f.entered));
  const withHistory = reg.ideas.filter((i) => (i.stageHistory ?? []).length > 0).length;

  const allDue = visibleIdeas.filter((i) => i.stage !== 'Killed').flatMap((i) => dueItems(i).map((item) => ({ idea: i, item })));
  const quickOpen = allDue.filter(({ item }) => item.kind === 'quick' && inbox.docs.get(item.id)?.status !== 'applied');
  const quickPending = quickOpen.filter(({ item }) => !inbox.docs.has(item.id)).length;
  const inputDue = allDue.filter(({ item }) => item.kind === 'input');
  const toQueue = (f: string) => {
    setQueueFilter(f);
    go('queue');
  };

  return (
    <>
      <div className="view-title">
        <div>
          <h2>Pulse</h2>
          <p>
            {total} rows, {active.length} active. Register as of {fmtDateTime(reg.asOf)}
            {lastSync ? `; last sync ${fmtDate(lastSync.date)} (${lastSync.run.toLowerCase()})` : '; no sync run recorded'}.
            {lastVisit ? ` ${changed === 0 ? 'Nothing has changed' : plural(changed, 'row or decision has changed', 'rows and decisions have changed')} since you last looked (${fmtDate(lastVisit)}).` : ''}
          </p>
        </div>
      </div>

      <div className="tiles">
        <button type="button" className="tile" onClick={() => toQueue('decision')}>
          <span className={`n${due.length ? ' accent' : ''}`}>{due.length}</span>
          <span className="label">need your decision</span>
          <span className="sub">{due.length ? due.map((i) => i.slug).join(', ') : 'nothing waiting on you'}</span>
        </button>
        <button type="button" className="tile" onClick={() => toQueue('due-week')}>
          <span className={`n${steps.length + reviews.length ? ' accent' : ''}`}>{steps.length + reviews.length}</span>
          <span className="label">due within 7 days</span>
          <span className="sub">{steps.length} next steps, {reviews.length} decision reviews</span>
        </button>
        <button type="button" className="tile" onClick={() => toQueue('stale')}>
          <span className="n">{stale.length}</span>
          <span className="label">stale or past re-check</span>
          <span className="sub">{stale.length ? stale.map((i) => i.slug).join(', ') : 'every row inside its window'}</span>
        </button>
        <button type="button" className="tile" onClick={() => toQueue('blocked')}>
          <span className="n">{blocked.length}</span>
          <span className="label">blocked or blocking</span>
          <span className="sub">{conflicts.length ? `${conflicts.length} dependency conflict${conflicts.length === 1 ? '' : 's'}` : blocked.length ? blocked.map((i) => i.slug).join(', ') : 'no dependency chains waiting'}</span>
        </button>
      </div>

      {allDue.length > 0 && (
        <div className="card pad">
          <Section title="Your decisions" aside={`${quickPending} quick ${quickPending === 1 ? 'call' : 'calls'} to make, ${inputDue.length} for the chat`}>
            {quickOpen.length > 0 && (
              <div className="duelist">
                {quickOpen.map(({ idea, item }) => (
                  <DueCard key={item.id} idea={idea} item={item} showIdea />
                ))}
              </div>
            )}
            {inputDue.length > 0 && (
              <details style={{ marginTop: 10 }}>
                <summary>
                  Needs the chat <small>{inputDue.length}</small>
                </summary>
                <div className="duelist" style={{ marginTop: 8 }}>
                  {inputDue.map(({ idea, item }) => (
                    <DueCard key={item.id} idea={idea} item={item} showIdea />
                  ))}
                </div>
              </details>
            )}
            {inbox.error && <p className="small" style={{ color: 'var(--crit)', marginTop: 6 }}>{inbox.error}</p>}
            <p className="faint small" style={{ marginTop: 8 }}>
              A quick call is recorded here and applied by Claude at the next session or the morning pickup, then synced to GitHub. Anything that needs your input goes to the chat.
            </p>
          </Section>
        </div>
      )}

      <div className="card pad">
        <Section title="Health of active rows" aside={`${active.length} rows`}>
          <div className="row">
            <span className="health" data-h="on-track">{hc['on-track']} on track</span>
            <span className="health" data-h="at-risk">{hc['at-risk']} at risk</span>
            <span className="health" data-h="off-track">{hc['off-track']} off track</span>
            <span className="health" data-h="missing">{hc.missing} update missing</span>
            {hc.none > 0 && <span className="faint small">{hc.none} with no health call yet</span>}
          </div>
          <p className="faint small" style={{ marginTop: 8 }}>
            Health is the thinking partner's call at the end of each session; update missing means no session on the row inside its cadence. {pendingLines.length} decision {pendingLines.length === 1 ? 'line is' : 'lines are'} pending on you in the log.
          </p>
        </Section>
      </div>

      {reg.streams && reg.streams.length > 0 && (
        <div className="card pad">
          <Section title="Streams and phases" aside={`${reg.streams.length} streams, one engineer plus a coding agent each`}>
            <div className="table-wrap">
              <table className="plain">
                <thead>
                  <tr>
                    <th>Stream</th>
                    <th>Owner</th>
                    <th>Weeks</th>
                    <th>Rows</th>
                    <th>Focus</th>
                  </tr>
                </thead>
                <tbody>
                  {reg.streams.map((st) => {
                    const rows = visibleIdeas.filter((i) => i.streamId === st.id);
                    return (
                      <tr key={st.id}>
                        <td>
                          <strong>{st.id}</strong> {st.name}
                          {st.slackPct ? <div className="faint tiny">{st.slackPct}% uncommitted</div> : null}
                        </td>
                        <td>{st.owner ?? <span className="chip warn">to be named</span>}</td>
                        <td>{st.startsWeek != null ? `${st.startsWeek}–${st.endsWeek ?? ''}` : '—'}</td>
                        <td>
                          {rows.length === 0 ? <span className="faint">none yet</span> : rows.map((i) => (
                            <button key={i.id} type="button" className="link" style={{ marginRight: 6 }} onClick={() => select(i.id)}>
                              {i.id}
                            </button>
                          ))}
                        </td>
                        <td className="small">{st.focus}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {reg.phases && reg.phases.length > 0 && (
              <ol style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: '0.88rem' }}>
                {reg.phases.map((ph, i) => (
                  <li key={i} style={{ marginTop: 4 }}>
                    <strong>{ph.name}</strong> (weeks {ph.weeks}){ph.status ? <span className={`chip ${ph.status === 'active' ? 'decision' : ph.status === 'passed' ? 'good' : ph.status === 'failed' ? 'alert' : ''}`} style={{ marginLeft: 6 }}>{ph.status}</span> : null}
                    <div className="faint small">Gate: {ph.gate}</div>
                  </li>
                ))}
              </ol>
            )}
          </Section>
        </div>
      )}

      {(steps.length > 0 || reviews.length > 0) && (
        <div className="card pad">
          <Section title="Due this week" aside={`${steps.length + reviews.length}`}>
            <div className="linklist">
              {steps.map((s) => (
                <div key={s.ideaId}>
                  <span className={`chip ${s.daysLeft! < 0 ? 'alert' : 'warn'}`}>{s.daysLeft! < 0 ? `${-s.daysLeft!} days overdue` : s.daysLeft === 0 ? 'today' : `in ${s.daysLeft} days`}</span>{' '}
                  <button type="button" className="link" onClick={() => select(s.ideaId)}>
                    {s.ideaId}
                  </button>{' '}
                  {s.step}
                  {s.origin && <span className="faint small"> (from {s.origin.id})</span>}
                </div>
              ))}
              {reviews.map((d) => (
                <div key={d.id ?? d.decision}>
                  <span className={`chip ${d.reviewDays! < 0 ? 'alert' : 'warn'}`}>review {d.reviewDays! < 0 ? `${-d.reviewDays!} days overdue` : `in ${d.reviewDays} days`}</span>{' '}
                  <button type="button" className="link" onClick={() => select(d.ideaId)}>
                    {d.ideaId}
                  </button>{' '}
                  {d.id}: {d.decision}
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      <div className="card pad">
        <Section title="Where the rows stand" aside={`${total} rows`}>
          <div className="stagebar" role="img" aria-label={STAGES.map((s) => `${s} ${counts[s]}`).join(', ')}>
            {STAGES.filter((s) => counts[s] > 0).map((s) => (
              <span key={s} style={{ flex: counts[s], ['--s' as string]: STAGE_VAR[s] }} title={`${s}: ${counts[s]}`} />
            ))}
          </div>
          <div className="stage-legend">
            {STAGES.map((s) => (
              <button key={s} type="button" onClick={() => go('register')} title="Open the register">
                <span className="stage" data-stage={s}>
                  {s}
                </span>
                <span className="n">{counts[s]}</span>
              </button>
            ))}
          </div>
          <p className="faint small" style={{ marginTop: 10 }}>
            {dwell != null ? `Median days in stage across active rows: ${dwell}.` : 'Days in stage cannot be computed yet.'}{' '}
            {unknownStageSince > 0 && `${unknownStageSince} active ${unknownStageSince === 1 ? 'row has' : 'rows have'} no stage-since date (a register gap); last-touched stands in for staleness.`}
          </p>
          <details style={{ marginTop: 10 }}>
            <summary>
              Funnel <small>{withHistory} of {reg.ideas.length} rows carry a stage history</small>
            </summary>
            {withHistory === 0 ? (
              <p className="empty">No stage history is recorded yet, so conversion and median days cannot be computed.</p>
            ) : (
              <div className="funnel" style={{ marginTop: 8 }}>
                <div className="funnel-row faint tiny">
                  <span>stage</span>
                  <span>entered</span>
                  <span>moved on</span>
                  <span>median days</span>
                </div>
                {fun.map((f) => (
                  <div key={f.stage} className="funnel-row">
                    <span className="stage" data-stage={f.stage}>{f.stage}</span>
                    <span>
                      <span className="bar" style={{ width: `${(f.entered / funMax) * 100}%`, display: 'inline-block' }} /> <span className="faint small">{f.entered}</span>
                    </span>
                    <span className="small">{f.conversion == null ? '—' : `${Math.round(f.conversion * 100)}%`}</span>
                    <span className="small">{f.medianDays == null ? 'no sample' : `${f.medianDays} (n=${f.samples})`}</span>
                  </div>
                ))}
                <p className="faint tiny">Counts are rows that ever entered a stage, from each row's stage history; with fewer than ten rows the numbers describe, they do not predict.</p>
              </div>
            )}
          </details>
        </Section>
      </div>

      <div className="card pad">
        <Section title="Alerts" aside={hits.length ? `${hits.length} by the rule table` : 'none'}>
          {hits.length === 0 ? (
            <p className="empty">No rule fires today.</p>
          ) : (
            <div className="alerts">
              {hits.map((a, i) => (
                <button key={i} type="button" className="alert" data-sev={a.level === 'alert' ? 'critical' : a.level === 'warn' ? 'warning' : 'info'} onClick={() => (a.ideaId ? go('queue', a.ideaId) : undefined)}>
                  <span className="bar" />
                  <span>
                    <span className="rule">{a.ruleId}</span>
                    {a.text}
                  </span>
                </button>
              ))}
            </div>
          )}
          {reg.rules && reg.rules.length > 0 && (
            <details style={{ marginTop: 10 }}>
              <summary>
                Rule table <small>{reg.rules.length} rules</small>
              </summary>
              <table className="plain">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Rule</th>
                    <th>Stages</th>
                    <th>Warn</th>
                    <th>Alert</th>
                  </tr>
                </thead>
                <tbody>
                  {reg.rules.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>
                        {r.name}
                        {r.note && <div className="faint tiny">{r.note}</div>}
                        {r.escalate && <div className="faint tiny">Escalates: {r.escalate}</div>}
                      </td>
                      <td>{r.stages?.join(', ') ?? 'all'}</td>
                      <td>{r.warnDays != null ? `${r.warnDays} d` : '—'}</td>
                      <td>{r.alertDays != null ? (r.alertDays === 0 ? 'on event' : `${r.alertDays} d`) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          )}
        </Section>
      </div>

      <div className="card pad">
        <Section title="Themes" aside={`${reg.themes.length} set`}>
          <div className="linklist">
            {themes.map(({ t, rows, fit }) => (
              <div key={t.id}>
                <button type="button" className="link" onClick={() => select(t.id)}>
                  {t.id} {t.name}
                </button>{' '}
                <span className="faint small">
                  {rows.length} of {total} rows{fit != null ? `; mean strategic fit ${fit.toFixed(1)} where scored` : '; none scored yet'}
                </span>
              </div>
            ))}
            {noTheme.length > 0 && (
              <div className="faint small">
                Serving no theme: {noTheme.map((i) => i.id).join(', ')}. Further themes wait on the strategy spine.
              </div>
            )}
          </div>
        </Section>
      </div>

      {reg.portfolio && !hidden('portfolio') && (
        <div className="card pad">
          <Section title={`Portfolio session (${reg.portfolio.status})`} aside={fmtDate(reg.portfolio.asOf)}>
            <dl className="kv">
              <dt>Now</dt>
              <dd>{idsText(reg, reg.portfolio.now)}</dd>
              <dt>Next</dt>
              <dd>{idsText(reg, reg.portfolio.next)}</dd>
              <dt>Later</dt>
              <dd>{idsText(reg, reg.portfolio.later)}</dd>
              <dt>Capabilities to watch</dt>
              <dd>{idsText(reg, reg.portfolio.capabilitiesToWatch)}</dd>
              <dt>Weights</dt>
              <dd>
                {reg.proposedWeights ? 'Equal weights in force; a weighted set proposed' : 'Equal weights in force'}
                {reg.proposedPortfolioBar != null && reg.portfolioBar == null ? `; bar ${reg.proposedPortfolioBar} proposed, none in force` : ''}
                {reg.portfolioBar != null ? `; bar ${reg.portfolioBar} in force` : ''}
              </dd>
              {reg.portfolio.horizonMixNote && (
                <>
                  <dt>Horizon mix</dt>
                  <dd>{reg.portfolio.horizonMixNote}</dd>
                </>
              )}
              {reg.portfolio.digest && (
                <>
                  <dt>Digest</dt>
                  <dd>{reg.portfolio.digest}</dd>
                </>
              )}
            </dl>
            {reg.portfolio.status === 'proposed' && (
              <p className="faint small" style={{ marginTop: 8 }}>
                Proposed by the thinking partner; nothing here is in force until Jithin approves or amends it.
              </p>
            )}
            {(reg.portfolio.spine || reg.portfolio.diagnosis) && (
              <details style={{ marginTop: 10 }}>
                <summary>
                  VI strategy spine <small>draft</small>
                </summary>
                <dl className="spine">
                  {reg.portfolio.diagnosis && (
                    <>
                      <dt>Diagnosis</dt>
                      <dd>{reg.portfolio.diagnosis}</dd>
                    </>
                  )}
                  {reg.portfolio.spine?.winningAspiration && (
                    <>
                      <dt>Winning aspiration</dt>
                      <dd>{reg.portfolio.spine.winningAspiration}</dd>
                    </>
                  )}
                  {reg.portfolio.spine?.whereToPlay && (
                    <>
                      <dt>Where to play</dt>
                      <dd>{reg.portfolio.spine.whereToPlay}</dd>
                    </>
                  )}
                  {reg.portfolio.spine?.howToWin && (
                    <>
                      <dt>How to win</dt>
                      <dd>{reg.portfolio.spine.howToWin}</dd>
                    </>
                  )}
                  {reg.portfolio.spine?.capabilitiesRequired && (
                    <>
                      <dt>Capabilities required</dt>
                      <dd>{reg.portfolio.spine.capabilitiesRequired}</dd>
                    </>
                  )}
                  {reg.portfolio.spine?.managementSystems && (
                    <>
                      <dt>Management systems</dt>
                      <dd>{reg.portfolio.spine.managementSystems}</dd>
                    </>
                  )}
                </dl>
              </details>
            )}
            {reg.portfolio.redTeam && reg.portfolio.redTeam.length > 0 && (
              <details>
                <summary>
                  Red-team roster <small>{reg.portfolio.redTeam.every((r) => !r.person) ? 'roles proposed, nobody named' : 'named'}</small>
                </summary>
                <table className="plain">
                  <thead>
                    <tr>
                      <th>Seat</th>
                      <th>Attacks</th>
                      <th>Person</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reg.portfolio.redTeam.map((r, i) => (
                      <tr key={i}>
                        <td>{r.role}</td>
                        <td>{r.attacks}</td>
                        <td>{r.person ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            )}
          </Section>
        </div>
      )}

      <p className="faint small">
        Source: the live <a href={reg.source.registerUrl} target="_blank" rel="noreferrer">Idea Register</a> (rev {reg.source.registerRev}), exported as register.json. {reg.generatedBy}
      </p>
    </>
  );
}

function idsText(reg: ReturnType<typeof useLab>['reg'], ids?: string[]): string {
  if (!ids || ids.length === 0) return 'none';
  return ids.map((id) => `${id} ${reg.ideas.find((i) => i.id === id)?.slug ?? ''}`.trim()).join(', ');
}
