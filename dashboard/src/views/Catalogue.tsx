import { useMemo } from 'react';
import { useLab } from '../lib/context';
import { capabilityFlag, collisionCandidates } from '../lib/derive2';
import type { Capability } from '../lib/types';
import { Section } from '../components/ui';

const MATURITY = ['Idea', 'Proposed', 'Building', 'Built', 'In production', 'Retiring'] as const;
const KINDS = ['Platform', 'Data', 'Process', 'Evidence', 'People'] as const;

export default function Catalogue() {
  const { reg, select, selectedId } = useLab();
  const caps = reg.capabilities;
  const collisions = useMemo(() => collisionCandidates(reg), [reg]);
  const family = useMemo(() => {
    const caps = new Map<string, Set<string>>();
    for (const l of reg.links) {
      if ((l.type !== 'reuses' && l.type !== 'creates') || !l.toId) continue;
      if (!caps.has(l.fromId)) caps.set(l.fromId, new Set());
      caps.get(l.fromId)!.add(l.toId);
    }
    return reg.ideas
      .filter((i) => i.parentId && caps.has(i.id) && caps.has(i.parentId))
      .map((i) => ({ child: i.id, parent: i.parentId!, shared: [...caps.get(i.id)!].filter((c) => caps.get(i.parentId!)!.has(c)).length }))
      .filter((f) => f.shared >= 3);
  }, [reg]);
  const priority = caps.filter((c) => c.demand >= 3);
  const idle = caps.filter((c) => c.demand === 0);
  const maxDemand = Math.max(1, ...caps.map((c) => c.demand));

  // bubble chart: x = maturity, y = kind, r = demand
  const W = 720;
  const H = 300;
  const left = 90;
  const top = 36;
  const colW = (W - left - 20) / MATURITY.length;
  const rowH = (H - top - 40) / KINDS.length;
  const x = (c: Capability) => left + MATURITY.indexOf(c.maturity) * colW + colW / 2;
  const y = (c: Capability) => top + KINDS.indexOf(c.kind) * rowH + rowH / 2;
  const r = (c: Capability) => 6 + (c.demand / maxDemand) * 16;
  const idOf = (c: Capability) => c.ideaId ?? c.id;

  return (
    <>
      <div className="view-title">
        <div>
          <h2>Capability catalogue</h2>
          <p>
            What ideas reuse and create. A capability reused by three or more ideas is a platform priority whatever ships first; one nobody reuses after two quarters is reviewed for retirement. Bubble size is demand.
          </p>
        </div>
      </div>

      <div className="tiles">
        <div className="tile">
          <span className="n">{caps.length}</span>
          <span className="label">capabilities</span>
          <span className="sub">{caps.filter((c) => c.maturity === 'In production' || c.maturity === 'Built').length} in production or built</span>
        </div>
        <div className="tile">
          <span className={`n${priority.length ? ' accent' : ''}`}>{priority.length}</span>
          <span className="label">platform priorities</span>
          <span className="sub">{priority.length ? priority.map((c) => c.name.split(' ')[0]).join(', ') : 'none at three reuses yet'}</span>
        </div>
        <div className="tile">
          <span className="n">{idle.length}</span>
          <span className="label">with no reuse yet</span>
          <span className="sub">{idle.length ? 'review after two idle quarters' : 'every row has a claimant'}</span>
        </div>
        <div className="tile">
          <span className="n">{collisions.length}</span>
          <span className="label">collision candidates</span>
          <span className="sub">pairs sharing three or more capabilities</span>
        </div>
      </div>

      <div className="card pad bubbles">
        <Section title="Demand by maturity and kind" aside="tap a bubble">
          <div className="table-wrap">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Capabilities by maturity, kind and demand">
            {MATURITY.map((m, i) => (
              <text key={m} x={left + i * colW + colW / 2} y={top - 12} textAnchor="middle">
                {m}
              </text>
            ))}
            {KINDS.map((k, i) => (
              <g key={k}>
                <text x={left - 8} y={top + i * rowH + rowH / 2 + 4} textAnchor="end">
                  {k}
                </text>
                <line className="axis" x1={left} x2={W - 20} y1={top + i * rowH + rowH} y2={top + i * rowH + rowH} />
              </g>
            ))}
            {caps.map((c) => {
              const siblings = caps.filter((o) => o.maturity === c.maturity && o.kind === c.kind);
              const k = siblings.findIndex((o) => o.id === c.id);
              const dx = siblings.length > 1 ? (k - (siblings.length - 1) / 2) * 24 : 0;
              return (
                <g key={c.id} onClick={() => select(idOf(c))} style={{ cursor: 'pointer' }}>
                  <circle className={c.demand >= 3 ? 'flag' : ''} cx={x(c) + dx} cy={y(c)} r={r(c)}>
                    <title>{`${c.name}: demand ${c.demand}, ${c.maturity}`}</title>
                  </circle>
                  <text x={x(c) + dx} y={y(c) + 4} textAnchor="middle" fontSize="10" style={{ pointerEvents: 'none' }}>
                    {c.demand}
                  </text>
                </g>
              );
            })}
            <text x={W - 20} y={H - 12} textAnchor="end" fontSize="10">
              accent = platform priority (demand 3+)
            </text>
          </svg>
          </div>
        </Section>
      </div>

      <div className="table-wrap card pad">
        <Section title="Catalogue" aside={`${caps.length} rows`}>
          <table className="plain">
            <thead>
              <tr>
                <th>Capability</th>
                <th>Kind</th>
                <th>Maturity</th>
                <th>Created by</th>
                <th>Reused by</th>
                <th>Demand</th>
                <th>Flag</th>
              </tr>
            </thead>
            <tbody>
              {[...caps]
                .sort((a, b) => b.demand - a.demand || a.name.localeCompare(b.name))
                .map((c) => {
                  const flag = capabilityFlag(c);
                  const id = idOf(c);
                  return (
                    <tr key={c.id} style={{ cursor: 'pointer', background: selectedId === id ? 'var(--surface-2)' : undefined }} onClick={() => select(id)}>
                      <td>
                        <strong>{c.name}</strong>
                        <div className="faint tiny">{c.id}{c.ideaId ? ` · ${c.ideaId}` : ''}</div>
                      </td>
                      <td>{c.kind}</td>
                      <td>{c.maturity}</td>
                      <td>{c.createdBy}</td>
                      <td>{c.reusedBy}</td>
                      <td>{c.demandNote ?? c.demand}</td>
                      <td>{flag ? <span className={`chip ${flag === 'platform priority' ? 'decision' : 'stale'}`}>{flag}</span> : ''}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Section>
      </div>

      <div className="card pad">
        <Section title="Collision candidates" aside="the Operating Model's rule">
          {collisions.length === 0 ? (
            <p className="empty">
              No two ideas outside a parent-child pair share three or more capabilities.
              {family.length > 0 && ` ${family.map((f) => `${f.child} and ${f.parent} share ${f.shared}`).join('; ')}, but a feature and its parent are already one idea.`}
            </p>
          ) : (
            <div className="linklist">
              {collisions.map((c) => (
                <div key={`${c.a}-${c.b}`}>
                  <button type="button" className="link" onClick={() => select(c.a)}>
                    {c.a}
                  </button>{' '}
                  and{' '}
                  <button type="button" className="link" onClick={() => select(c.b)}>
                    {c.b}
                  </button>{' '}
                  share {c.shared.length}: <span className="faint small">{c.shared.join(', ')}</span>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </>
  );
}
