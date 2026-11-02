import { useState } from 'react';
import { useLab } from '../lib/context';
import { fmtDate } from '../lib/format';
import { decisionIndex } from '../lib/derive2';

export default function Log() {
  const { reg, now, select, lastVisit, hidden } = useLab();
  const [pendingFirst, setPendingFirst] = useState(true);
  const [ideaFilter, setIdeaFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const indexed = decisionIndex(reg, now);
  const decisions = indexed
    .filter((d) => !ideaFilter || d.ideaId === ideaFilter)
    .filter((d) => !statusFilter || (d.status ?? (d.pending ? 'proposed' : 'accepted')) === statusFilter)
    .filter((d) => !typeFilter || (d.type ?? 'decision') === typeFilter)
    .sort((a, b) => {
      if (pendingFirst && !!a.pending !== !!b.pending) return a.pending ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
  const sessions = [...reg.sessions].reverse();
  const pendingCount = reg.decisions.filter((d) => d.pending).length;

  return (
    <>
      <div className="view-title">
        <div>
          <h2>Log</h2>
          <p>The decision log is the memory of the lab: one line per decision per idea. Sessions and sync runs below it.</p>
        </div>
      </div>

      <div className="card pad">
        <h3>
          Decisions <small className="faint">{reg.decisions.length} lines, {pendingCount} pending</small>
        </h3>
        <div className="row" style={{ margin: '8px 0 4px' }}>
          <button type="button" className="chip toggle" aria-pressed={pendingFirst} onClick={() => setPendingFirst(!pendingFirst)}>
            Pending first
          </button>
          <select id="log-status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status">
            <option value="">All statuses</option>
            <option value="proposed">Proposed</option>
            <option value="accepted">Accepted</option>
            <option value="superseded">Superseded</option>
          </select>
          <select id="log-type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} aria-label="Filter by type">
            <option value="">All types</option>
            <option value="decision">Decisions</option>
            <option value="rejection">Rejections</option>
            <option value="gate">Gate records</option>
            <option value="retro">Retros</option>
          </select>
          <select id="log-idea" value={ideaFilter} onChange={(e) => setIdeaFilter(e.target.value)} aria-label="Filter by idea">
            <option value="">All ideas</option>
            {reg.ideas.map((i) => (
              <option key={i.id} value={i.id}>
                {i.id} {i.slug}
              </option>
            ))}
          </select>
        </div>
        {hidden('decisions') ? (
          <p className="empty">Decisions are not part of this audience's view.</p>
        ) : (
          decisions.map((d, n) => {
            const isNew = !!lastVisit && d.date > lastVisit;
            const status = d.status ?? (d.pending ? 'proposed' : 'accepted');
            return (
              <div key={n} className="log-row">
                <div>
                  <div className="small">{fmtDate(d.date)}</div>
                  {d.id && <div className="faint tiny">{d.id}</div>}
                  {status === 'proposed' && <div className="pending">pending</div>}
                  {status === 'superseded' && <div className="faint tiny">superseded</div>}
                  {isNew && <div className="tiny" style={{ color: 'var(--accent)' }}>new</div>}
                </div>
                <div>
                  <button type="button" className="link" onClick={() => select(d.ideaId)}>
                    {d.ideaId} {d.slug}
                  </button>
                  <div style={{ textDecoration: status === 'superseded' ? 'line-through' : undefined, color: status === 'superseded' ? 'var(--ink-3)' : undefined }}>{d.decision}</div>
                  <div className="row" style={{ gap: 6, marginTop: 2 }}>
                    {!hidden('decisions-by') && <span className="by">{d.by}</span>}
                    {d.type === 'rejection' && <span className="chip alert">rejection</span>}
                    {d.type === 'gate' && <span className="chip">gate</span>}
                    {d.type === 'retro' && <span className="chip">retro</span>}
                    {d.door && <span className="chip">{d.door} door</span>}
                    {d.infoLevel != null && <span className="chip">{d.infoLevel}% info</span>}
                    {d.reviewOn && <span className={`chip ${d.reviewDays != null && d.reviewDays <= 7 ? 'warn' : ''}`}>review {fmtDate(d.reviewOn)}</span>}
                    {d.supersedes && <span className="chip">supersedes {d.supersedes}</span>}
                    {!d.door && !d.reviewOn && <span className="faint tiny">door and review date not recorded</span>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="card pad">
        <h3>
          Sessions <small className="faint">{reg.sessions.length}</small>
        </h3>
        {sessions.map((s, n) => (
          <div key={n} className="log-row">
            <div className="small">{fmtDate(s.date)}</div>
            <div>
              <div>
                <strong>{s.scope}</strong> <span className="faint small">· {s.mode}</span>
              </div>
              <div className="small">{s.outcome}</div>
              <div className="by">Docs: {s.docsTouched}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card pad">
        <h3>
          Sync runs <small className="faint">{reg.syncLog.length}</small>
        </h3>
        {reg.syncLog.length === 0 ? (
          <p className="empty">No sync run recorded.</p>
        ) : (
          [...reg.syncLog].reverse().map((s, n) => (
            <div key={n} className="log-row">
              <div className="small">{fmtDate(s.date)}</div>
              <div>
                <div>
                  {s.run} · scanned {s.docsScanned}
                </div>
                <div className="small">Rows changed: {s.rowsChanged}</div>
                <div className="by">Flags: {s.flags}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
