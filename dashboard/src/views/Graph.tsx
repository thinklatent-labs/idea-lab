import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Surface } from '@kit/kit';
import { Button } from '@kit/ui/components/button';
import { Slider } from '@kit/ui/components/slider';
import { cn } from '@kit/ui/lib/utils';
import { useLab } from '../lib/context';
import { layoutGraph, neighbourhood, type GEdge, type GNode } from '../lib/graph';
import { fmtDate, plural } from '../lib/format';
import { LINK_MEANING } from '../lib/rubric';
import { LINK_TYPES, NODE_TYPES, type LinkType, type NodeType } from '../lib/types';
import { EmptyNote, SectionHead, Segmented, STAGE_VAR } from '../kit/parts';
import { spring } from '../kit/motion';

/** Edge styles by link type: the dash carries the type, so colour is never the only cue. */
const DASH: Partial<Record<LinkType, string>> = {
  'feature-of': '5 4',
  serves: '2 4',
  'related-to': '1 4',
  'competes-with': '6 3',
  supersedes: '8 3 2 3',
  enables: '3 3',
  'evidence-for': '2 2',
};
const WIDTH: Partial<Record<LinkType, number>> = { 'depends-on': 1.6, creates: 1.3, reuses: 1 };

type Depth = '1' | '2' | 'all';

/** A small shape per node type, so a node's type reads without its colour. */
function Glyph({ type, x, y, fill }: { type: NodeType; x: number; y: number; fill: string }) {
  const s = { fill };
  switch (type) {
    case 'Theme':
      return <circle cx={x + 4} cy={y + 4} r={4} style={s} />;
    case 'Idea':
      return <rect x={x} y={y} width={8} height={8} rx={1.5} style={s} />;
    case 'Feature':
      return <polygon points={`${x + 4},${y - 0.5} ${x + 8.5},${y + 4} ${x + 4},${y + 8.5} ${x - 0.5},${y + 4}`} style={s} />;
    case 'Capability':
      return <rect x={x - 0.5} y={y + 2} width={9} height={4.5} rx={1} style={s} />;
    case 'Experiment':
      return <polygon points={`${x + 4},${y} ${x + 8.5},${y + 8} ${x - 0.5},${y + 8}`} style={s} />;
  }
}

function ViewHeader({ kicker, title, caption, actions }: { kicker: ReactNode; title: string; caption: ReactNode; actions?: ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 pt-1">
      <div className="min-w-0">
        <div className="kit-caption">{kicker}</div>
        <h1 className="mt-1.5 text-[30px] leading-tight font-normal tracking-tight @min-[640px]:text-[34px]">{title}</h1>
        <p className="mt-1.5 max-w-[720px] text-sm text-muted-foreground">{caption}</p>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export default function Graph() {
  const { reg, selectedId, select } = useLab();
  const layout = useMemo(() => layoutGraph(reg), [reg]);
  const [focus, setFocus] = useState<string | null>(selectedId);
  const [trail, setTrail] = useState<string[]>([]);
  const [hover, setHover] = useState<string | null>(null);
  const [kbd, setKbd] = useState<string | null>(null);
  const [depth, setDepth] = useState<Depth>('1');
  const dates = useMemo(() => [...new Set(reg.ideas.map((i) => i.createdOn ?? i.lastTouched))].sort(), [reg]);
  const [dateIdx, setDateIdx] = useState<number>(dates.length - 1);
  const cutoff = dates[dateIdx] ?? dates[dates.length - 1];
  const stageOf = useMemo(() => new Map(reg.ideas.map((i) => [i.id, i.stage])), [reg]);

  useEffect(() => {
    if (selectedId) focusOn(selectedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  function focusOn(id: string | null) {
    setFocus(id);
    if (id) setTrail((t) => [...t.filter((x) => x !== id), id].slice(-6));
  }
  const open = (id: string) => {
    focusOn(id);
    select(id);
  };

  const nb = focus ? (depth === 'all' ? { nodes: new Set(layout.nodes.map((n) => n.id)), edges: new Set(layout.edges.map((e) => e.id)) } : neighbourhood(layout, focus, Number(depth))) : null;
  const createdOn = new Map(reg.ideas.map((i) => [i.id, i.createdOn ?? i.lastTouched]));
  const afterCutoff = (id: string) => {
    const d = createdOn.get(id);
    return !!d && !!cutoff && d > cutoff;
  };
  const edgeLabel = (e: GEdge) => `${e.from} ${e.type} ${e.to}${e.note ? ` — ${e.note}` : ''}`;
  const focusEdges = focus ? layout.edges.filter((e) => nb!.edges.has(e.id)) : [];
  const nodeById = new Map(layout.nodes.map((n) => [n.id, n]));
  const fullName = (id: string) => {
    const i = reg.ideas.find((x) => x.id === id);
    if (i) return `${i.id} ${i.slug}`;
    const c = reg.capabilities.find((x) => x.id === id);
    if (c) return c.name;
    const t = reg.themes.find((x) => x.id === id);
    return t ? t.name.split(':')[0] : (nodeById.get(id)?.label ?? id);
  };
  const hue = (n: GNode) => {
    const st = stageOf.get(n.id);
    if (st) return STAGE_VAR[st];
    return n.type === 'Theme' ? 'var(--kit-companion)' : 'var(--muted-foreground)';
  };
  const typesShown = LINK_TYPES.filter((t) => layout.edges.some((e) => e.type === t));
  const layerOf = new Map(layout.nodes.map((n) => [n.id, n.layer]));

  return (
    <div className="flex flex-col gap-5">
      <ViewHeader
        kicker={`${plural(layout.nodes.length, 'node')} · ${plural(layout.edges.length, 'link')}`}
        title="Idea graph"
        caption="Themes on top, then ideas, features and the capabilities they reuse or create. Tap a node to light its neighbours and open its record; on a phone the graph scrolls inside its frame."
        actions={
          <>
            <Segmented
              id="graph-depth"
              size="sm"
              value={depth}
              onChange={setDepth}
              options={[
                { value: '1', label: '1 hop' },
                { value: '2', label: '2 hops' },
                { value: 'all', label: 'All' },
              ]}
            />
            {focus && (
              <Button
                size="sm"
                variant="outline"
                className="rounded-full bg-background/60"
                onClick={() => {
                  setFocus(null);
                  select(null);
                }}
              >
                Clear focus
              </Button>
            )}
          </>
        }
      />

      {(dates.length > 1 || trail.length > 1) && (
        <div className="flex flex-col gap-3 @min-[900px]:flex-row @min-[900px]:items-center @min-[900px]:gap-6">
          {dates.length > 1 && (
            <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-[22px] border border-foreground/10 bg-background/60 px-4 py-2.5 backdrop-blur sm:flex-row sm:items-center sm:gap-4 sm:rounded-full sm:py-2">
              <span className="kit-caption shrink-0">Time-lapse</span>
              <Slider className="min-w-0 flex-1" min={0} max={dates.length - 1} step={1} value={[dateIdx]} onValueChange={(v) => setDateIdx(Array.isArray(v) ? Number(v[0]) : Number(v))} aria-label="Show rows created on or before" />
              <span className="text-xs text-muted-foreground sm:shrink-0">
                rows on the register by <span className="kit-num text-foreground">{fmtDate(cutoff)}</span>
              </span>
            </div>
          )}
          {trail.length > 1 && (
            <div className="lab-noscroll flex items-center gap-1.5 overflow-x-auto">
              <span className="kit-caption shrink-0">Trail</span>
              {trail.map((id) => (
                <button key={id} type="button" aria-pressed={focus === id} onClick={() => open(id)} className={cn('kit-num shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors', focus === id ? 'border-transparent bg-[var(--kit-brand)] text-[var(--kit-brand-fg)]' : 'border-foreground/15 hover:bg-foreground/5')}>
                  {id}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <Surface padding="none" className="overflow-hidden">
        <div className="overflow-x-auto overscroll-x-contain px-2 py-3 @min-[640px]:px-4">
          <svg className="block h-auto w-full select-none" style={{ minWidth: Math.round(layout.width * 0.74) }} viewBox={`0 0 ${layout.width} ${layout.height}`} role="img" aria-label={`Idea graph: ${layout.nodes.length} nodes, ${layout.edges.length} links`}>
            <defs>
              <marker id="g-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" style={{ fill: 'var(--muted-foreground)' }} />
              </marker>
              <marker id="g-arrow-hi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" style={{ fill: 'var(--foreground)' }} />
              </marker>
            </defs>
            {layout.layerLabels.map((l) => (
              <g key={l.label}>
                <line x1={16} x2={layout.width - 16} y1={l.y + 6} y2={l.y + 6} style={{ stroke: 'var(--border)' }} strokeWidth={1} />
                <text x={16} y={l.y} fontSize={11} letterSpacing="0.02em" style={{ fill: 'var(--muted-foreground)' }}>
                  {l.label}
                </text>
              </g>
            ))}
            {layout.edges.map((e) => {
              const hi = !!nb && nb.edges.has(e.id);
              const dim = (!!nb && !hi) || afterCutoff(e.from) || afterCutoff(e.to);
              const stroke = e.type === 'competes-with' ? 'var(--kit-decision)' : hi ? 'var(--foreground)' : 'var(--muted-foreground)';
              return (
                <motion.path
                  key={e.id}
                  d={e.path}
                  fill="none"
                  style={{ stroke }}
                  strokeWidth={hi ? 1.9 : (WIDTH[e.type] ?? 1.2)}
                  strokeDasharray={DASH[e.type]}
                  markerEnd={e.directed ? (hi ? 'url(#g-arrow-hi)' : 'url(#g-arrow)') : undefined}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: dim ? 0.12 : hi ? 1 : 0.55 }}
                  transition={{ duration: 0.35, delay: nb ? 0 : 0.35 + Math.min(0.5, (layerOf.get(e.from) ?? 0) * 0.08) }}
                  onMouseEnter={() => setHover(e.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  <title>{edgeLabel(e)}</title>
                </motion.path>
              );
            })}
            {layout.edges
              .filter((e) => hover === e.id)
              .map((e) => (
                <text key={`${e.id}-l`} x={e.mx} y={e.my - 4} textAnchor="middle" fontSize="10" style={{ fill: 'var(--foreground)', paintOrder: 'stroke', stroke: 'var(--background)', strokeWidth: 3 }}>
                  {e.type}
                </text>
              ))}
            {layout.nodes.map((n, idx) => {
              const dim = (!!nb && !nb.nodes.has(n.id)) || afterCutoff(n.id);
              const isFocus = focus === n.id;
              const h = hue(n);
              return (
                <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                  <motion.g
                    role="button"
                    tabIndex={0}
                    aria-label={`${n.label}, ${n.sub}${isFocus ? ', focused' : ''}`}
                    aria-pressed={isFocus}
                    className="cursor-pointer outline-none"
                    style={{ filter: isFocus ? 'drop-shadow(0 0 10px color-mix(in oklab, var(--kit-lit) 75%, transparent))' : undefined }}
                    initial={{ opacity: 0, scale: 0.86, y: 6 }}
                    animate={{ opacity: dim ? 0.22 : 1, scale: 1, y: 0 }}
                    transition={{ ...spring.soft, delay: nb ? 0 : Math.min(0.6, n.layer * 0.08 + (idx % 8) * 0.025) }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => open(n.id)}
                    onFocus={() => setKbd(n.id)}
                    onBlur={() => setKbd((k) => (k === n.id ? null : k))}
                    onKeyDown={(ev) => {
                      if (ev.key === 'Enter' || ev.key === ' ') {
                        ev.preventDefault();
                        open(n.id);
                      }
                    }}
                  >
                    <rect width={n.w} height={n.h} rx={16} style={{ fill: 'var(--background)', opacity: 0.55 }} />
                    <rect width={n.w} height={n.h} rx={16} style={{ fill: h, opacity: isFocus ? 0.22 : 0.1 }} />
                    <rect width={n.w} height={n.h} rx={16} fill="none" style={{ stroke: isFocus ? 'var(--kit-lit)' : h, strokeOpacity: isFocus ? 1 : 0.6 }} strokeWidth={isFocus ? 2.2 : 1.2} />
                    {kbd === n.id && <rect x={-4} y={-4} width={n.w + 8} height={n.h + 8} rx={20} fill="none" style={{ stroke: 'var(--ring)' }} strokeWidth={2} />}
                    <Glyph type={n.type} x={12} y={11} fill={h} />
                    <text x={27} y={19} fontSize={12} fontWeight={600} style={{ fill: 'var(--foreground)' }}>
                      {n.label}
                    </text>
                    <text x={12} y={35} fontSize={10.5} style={{ fill: 'var(--muted-foreground)' }}>
                      {n.sub}
                    </text>
                  </motion.g>
                </g>
              );
            })}
          </svg>
        </div>
      </Surface>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1 text-xs text-muted-foreground" aria-label="Legend">
        {NODE_TYPES.map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5">
            <svg width={10} height={10} viewBox="-1 -1 10 10" aria-hidden="true">
              <Glyph type={t} x={0} y={0} fill="currentColor" />
            </svg>
            {t}
          </span>
        ))}
        <span className="hidden h-4 w-px bg-foreground/15 sm:inline-block" />
        {typesShown.map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5" title={LINK_MEANING[t]}>
            <svg width={26} height={6} aria-hidden="true">
              <line x1={0} x2={26} y1={3} y2={3} strokeWidth={WIDTH[t] ?? 1.4} strokeDasharray={DASH[t]} style={{ stroke: t === 'competes-with' ? 'var(--kit-decision)' : 'currentColor' }} />
            </svg>
            {t}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full border-2 border-[var(--kit-lit)] shadow-[0_0_8px_var(--kit-lit)]" /> focused
        </span>
      </div>

      {focus && (
        <motion.div key={focus} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={spring.soft}>
          <Surface>
            <SectionHead
              title={fullName(focus)}
              count={focusEdges.length}
              caption={`${nodeById.get(focus)?.sub ?? ''}. ${depth === '1' ? 'Its direct links' : depth === '2' ? 'Links within two hops' : 'Every link'}; tap one to move the focus there.`}
              actions={
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => select(focus)}>
                  Open the record
                </Button>
              }
            />
            <div className="mt-4 space-y-1.5">
              {focusEdges.length === 0 ? (
                <EmptyNote>No links recorded for this node.</EmptyNote>
              ) : (
                focusEdges.map((e) => {
                  const outgoing = e.from === focus;
                  const direct = outgoing || e.to === focus;
                  const other = outgoing ? e.to : e.from;
                  return (
                    <div key={e.id} className="lab-row flex flex-wrap items-baseline gap-x-2.5 gap-y-1 px-3.5 py-2.5 text-sm">
                      <span className="kit-caption shrink-0" title={LINK_MEANING[e.type]}>
                        {direct ? (outgoing ? e.type : `← ${e.type}`) : `${e.from} ${e.type} ${e.to}`}
                      </span>
                      <button type="button" onClick={() => open(direct ? other : e.to)} className="font-medium underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground">
                        {fullName(direct ? other : e.to)}
                      </button>
                      {e.note && <span className="text-xs text-muted-foreground">{e.note}</span>}
                    </div>
                  );
                })
              )}
            </div>
          </Surface>
        </motion.div>
      )}
    </div>
  );
}
