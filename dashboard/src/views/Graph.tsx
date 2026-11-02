import { useEffect, useMemo, useState } from 'react';
import { useLab } from '../lib/context';
import { layoutGraph, neighbourhood, type GEdge } from '../lib/graph';
import { fmtDate } from '../lib/format';
import { LINK_MEANING } from '../lib/rubric';
import { LINK_TYPES, NODE_TYPES } from '../lib/types';

export default function Graph() {
  const { reg, selectedId, select } = useLab();
  const layout = useMemo(() => layoutGraph(reg), [reg]);
  const [focus, setFocus] = useState<string | null>(selectedId);
  const [trail, setTrail] = useState<string[]>([]);
  const [hover, setHover] = useState<string | null>(null);
  const [depth, setDepth] = useState<1 | 2 | 0>(1);
  const dates = useMemo(() => [...new Set(reg.ideas.map((i) => i.createdOn ?? i.lastTouched))].sort(), [reg]);
  const [dateIdx, setDateIdx] = useState<number>(dates.length - 1);
  const cutoff = dates[dateIdx] ?? dates[dates.length - 1];

  useEffect(() => {
    if (selectedId) setFocusWithTrail(selectedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  function setFocusWithTrail(id: string | null) {
    setFocus(id);
    if (id) setTrail((t) => [...t.filter((x) => x !== id), id].slice(-6));
  }

  const nb = focus ? (depth === 0 ? { nodes: new Set(layout.nodes.map((n) => n.id)), edges: new Set(layout.edges.map((e) => e.id)) } : neighbourhood(layout, focus, depth)) : null;
  const createdOn = new Map(reg.ideas.map((i) => [i.id, i.createdOn ?? i.lastTouched]));
  const afterCutoff = (id: string) => {
    const d = createdOn.get(id);
    return !!d && !!cutoff && d > cutoff;
  };
  const edgeLabel = (e: GEdge) => `${e.from} ${e.type} ${e.to}${e.note ? ` — ${e.note}` : ''}`;
  const focusEdges = focus ? layout.edges.filter((e) => nb!.edges.has(e.id)) : [];
  const nodeById = new Map(layout.nodes.map((n) => [n.id, n]));

  return (
    <>
      <div className="view-title">
        <div>
          <h2>Idea graph</h2>
          <p>
            Themes on top, ideas, features, then the capabilities they reuse or create. Tap a node to focus on its neighbours; the page scrolls sideways on a phone.
          </p>
        </div>
        <div className="row">
          <span className="faint tiny">Depth</span>
          {([1, 2, 0] as const).map((d) => (
            <button key={d} type="button" className="chip toggle" aria-pressed={depth === d} onClick={() => setDepth(d)}>
              {d === 0 ? 'all' : `${d} hop${d === 1 ? '' : 's'}`}
            </button>
          ))}
          {focus && (
            <button type="button" className="btn small" onClick={() => { setFocus(null); select(null); }}>
              Clear focus
            </button>
          )}
        </div>
      </div>
      {dates.length > 1 && (
        <div className="timelapse">
          <span className="faint tiny">Time-lapse</span>
          <input id="graph-date" type="range" min={0} max={dates.length - 1} value={dateIdx} onChange={(e) => setDateIdx(Number(e.target.value))} aria-label="Show rows created on or before" />
          <span className="small">rows on the register by {fmtDate(cutoff)}</span>
        </div>
      )}

      {trail.length > 1 && (
        <div className="trail">
          <span className="faint tiny">Trail</span>
          {trail.map((id) => (
            <button key={id} type="button" className="chip toggle" aria-pressed={focus === id} onClick={() => { setFocus(id); select(id); }}>
              {id}
            </button>
          ))}
        </div>
      )}

      <div className="graph-wrap">
        <svg width={layout.width} height={layout.height} viewBox={`0 0 ${layout.width} ${layout.height}`} role="img" aria-label={`Idea graph: ${layout.nodes.length} nodes, ${layout.edges.length} links`}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--ink-3)" />
            </marker>
            <marker id="arrow-hi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--ink)" />
            </marker>
          </defs>
          {layout.layerLabels.map((l) => (
            <g key={l.label}>
              <line className="glane" x1={16} x2={layout.width - 16} y1={l.y + 6} y2={l.y + 6} />
              <text className="glayer" x={16} y={l.y}>
                {l.label}
              </text>
            </g>
          ))}
          {layout.edges.map((e) => {
            const hi = !!nb && nb.edges.has(e.id);
            const dim = (!!nb && !hi) || afterCutoff(e.from) || afterCutoff(e.to);
            return (
              <path
                key={e.id}
                className={`gedge${hi ? ' hi' : ''}${dim ? ' dim' : ''}`}
                data-type={e.type}
                d={e.path}
                markerEnd={e.directed ? (hi ? 'url(#arrow-hi)' : 'url(#arrow)') : undefined}
                onMouseEnter={() => setHover(e.id)}
                onMouseLeave={() => setHover(null)}
              >
                <title>{edgeLabel(e)}</title>
              </path>
            );
          })}
          {layout.edges
            .filter((e) => hover === e.id)
            .map((e) => (
              <text key={`${e.id}-l`} x={e.mx} y={e.my - 4} textAnchor="middle" fontSize="10" fill="var(--ink-2)" style={{ paintOrder: 'stroke', stroke: 'var(--surface)', strokeWidth: 3 }}>
                {e.type}
              </text>
            ))}
          {layout.nodes.map((n) => {
            const dim = (!!nb && !nb.nodes.has(n.id)) || afterCutoff(n.id);
            const isFocus = focus === n.id;
            return (
              <g
                key={n.id}
                className={`gnode${isFocus ? ' focus' : ''}${dim ? ' dim' : ''}`}
                data-type={n.type}
                transform={`translate(${n.x},${n.y})`}
                onClick={() => {
                  setFocusWithTrail(n.id);
                  select(n.id);
                }}
                tabIndex={0}
                role="button"
                aria-label={`${n.label}, ${n.sub}`}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault();
                    setFocusWithTrail(n.id);
                    select(n.id);
                  }
                }}
              >
                <rect width={n.w} height={n.h} rx={7} />
                <text x={10} y={19} fontWeight={600}>
                  {n.label}
                </text>
                <text className="sub" x={10} y={35}>
                  {n.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="legend" aria-label="Legend">
        {NODE_TYPES.map((t) => (
          <span key={t} className="type" data-type={t}>
            {t}
          </span>
        ))}
        {LINK_TYPES.filter((t) => layout.edges.some((e) => e.type === t)).map((t) => (
          <span key={t} className="edge" data-type={t} title={LINK_MEANING[t]}>
            <i /> {t}
          </span>
        ))}
      </div>

      {focus && (
        <div className="card pad">
          <h3>
            {nodeById.get(focus)?.label ?? focus} <small className="faint">{focusEdges.length} links</small>
          </h3>
          {focusEdges.length === 0 ? (
            <p className="empty">No links recorded for this node.</p>
          ) : (
            <div className="linklist" style={{ marginTop: 8 }}>
              {focusEdges.map((e) => {
                const other = e.from === focus ? e.to : e.from;
                const outgoing = e.from === focus;
                return (
                  <div key={e.id}>
                    <span className="ltype">{outgoing ? e.type : `← ${e.type}`}</span>
                    <button type="button" className="link" onClick={() => { setFocusWithTrail(other); select(other); }}>
                      {nodeById.get(other)?.label ?? other}
                    </button>
                    {e.note && <span className="faint small"> — {e.note}</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
