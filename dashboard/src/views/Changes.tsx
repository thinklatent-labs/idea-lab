import { useMemo } from 'react';
import { useLab } from '../lib/context';
import { diffSnapshots } from '../lib/derive2';
import { fmtDate, fmtDateTime } from '../lib/format';
import { Section } from '../components/ui';

export default function Changes() {
  const { reg, previous, previousLabel, select, lastVisit, hidden } = useLab();
  const diff = useMemo(() => (previous ? diffSnapshots(previous, reg) : null), [previous, reg]);
  const byIdea = useMemo(() => {
    const m = new Map<string, { what: string; from: string; to: string }[]>();
    for (const c of diff?.changes ?? []) {
      const k = c.ideaId ?? 'catalogue';
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(c);
    }
    return m;
  }, [diff]);
  const touchedSinceVisit = lastVisit ? reg.ideas.filter((i) => i.lastTouched > lastVisit) : [];
  const decisionsSinceVisit = lastVisit ? reg.decisions.filter((d) => d.date > lastVisit) : [];

  return (
    <>
      <div className="view-title">
        <div>
          <h2>What changed</h2>
          <p>
            The current register against the latest earlier snapshot the sync kept: stage, lane, score, owner, horizon, theme, parent, next step, decisions due and appetite per idea, plus rows, links and log lines. Snapshots are kept by the nightly export.
          </p>
        </div>
      </div>

      {!previous || !diff ? (
        <div className="card pad">
          <p className="empty">
            No earlier snapshot is published beside this page yet, so there is nothing to diff. Once the nightly sync keeps one file per export in data/history, this view compares the two most recent.
          </p>
        </div>
      ) : (
        <>
          <p className="faint small">
            Comparing {fmtDateTime(reg.asOf)} (rev {reg.source.registerRev}) with {previousLabel}.
          </p>
          <div className="tiles">
            <div className="tile">
              <span className={`n${diff.changes.length ? ' accent' : ''}`}>{diff.changes.length}</span>
              <span className="label">field changes</span>
              <span className="sub">across {byIdea.size} {byIdea.size === 1 ? 'row' : 'rows'}</span>
            </div>
            <div className="tile">
              <span className="n">{diff.newIdeas.length}</span>
              <span className="label">rows added</span>
              <span className="sub">{diff.removedIdeas.length ? `${diff.removedIdeas.length} removed` : 'none removed'}</span>
            </div>
            <div className="tile">
              <span className="n">{diff.decisionsAdded.length}</span>
              <span className="label">decisions logged</span>
              <span className="sub">{diff.sessionsAdded} sessions logged</span>
            </div>
            <div className="tile">
              <span className="n">{diff.linksAdded}</span>
              <span className="label">links added</span>
              <span className="sub">{diff.linksRemoved ? `${diff.linksRemoved} removed` : 'none removed'}</span>
            </div>
          </div>

          <div className="card pad">
            <Section title="By row" aside={`${byIdea.size}`}>
              {byIdea.size === 0 && diff.newIdeas.length === 0 ? (
                <p className="empty">No row changed between the two snapshots.</p>
              ) : (
                <>
                  {diff.newIdeas.map((id) => {
                    const i = reg.ideas.find((x) => x.id === id)!;
                    return (
                      <div key={id} className="change-row">
                        <button type="button" className="link" onClick={() => select(id)}>
                          {id} {i.slug}
                        </button>
                        <div>
                          <span className="chip good">new row</span> {i.stage} · {i.title}
                        </div>
                      </div>
                    );
                  })}
                  {[...byIdea.entries()].map(([id, list]) => (
                    <div key={id} className="change-row">
                      {id === 'catalogue' ? (
                        <span className="faint">catalogue</span>
                      ) : (
                        <button type="button" className="link" onClick={() => select(id)}>
                          {id} {reg.ideas.find((x) => x.id === id)?.slug ?? ''}
                        </button>
                      )}
                      <div className="stack" style={{ gap: 4 }}>
                        {list.map((c, n) => (
                          <div key={n}>
                            <span className="faint tiny">{c.what}: </span>
                            <span className="from">{c.from}</span> → {c.to}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Section>
          </div>

          {!hidden('decisions') && (
            <div className="card pad">
              <Section title="Decisions logged since" aside={`${diff.decisionsAdded.length}`}>
                {diff.decisionsAdded.length === 0 ? (
                  <p className="empty">None.</p>
                ) : (
                  diff.decisionsAdded.map((d, n) => (
                    <div key={n} className="log-row">
                      <div className="small">{fmtDate(d.date)}</div>
                      <div>
                        <button type="button" className="link" onClick={() => select(d.ideaId)}>
                          {d.ideaId}
                        </button>{' '}
                        {d.decision}
                        {!hidden('decisions-by') && <div className="by">{d.by}</div>}
                      </div>
                    </div>
                  ))
                )}
              </Section>
            </div>
          )}
        </>
      )}

      <div className="card pad">
        <Section title="Since your last visit" aside={lastVisit ? fmtDate(lastVisit) : 'first visit'}>
          {!lastVisit ? (
            <p className="empty">This is your first visit from this browser; the next one will list what moved in between.</p>
          ) : touchedSinceVisit.length + decisionsSinceVisit.length === 0 ? (
            <p className="empty">Nothing has been touched since {fmtDate(lastVisit)}.</p>
          ) : (
            <div className="linklist">
              {touchedSinceVisit.map((i) => (
                <div key={i.id}>
                  <button type="button" className="link" onClick={() => select(i.id)}>
                    {i.id} {i.slug}
                  </button>{' '}
                  <span className="faint small">touched {fmtDate(i.lastTouched)}</span>
                </div>
              ))}
              {decisionsSinceVisit.map((d, n) => (
                <div key={`d${n}`}>
                  <span className="faint small">decision {fmtDate(d.date)}: </span>
                  {d.ideaId} {d.decision}
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </>
  );
}
