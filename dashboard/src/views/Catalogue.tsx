import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Boxes, GitMerge, Sparkles, Timer } from 'lucide-react';
import { DotGrid, Status, Surface, Tile, type StatusTone } from '@vi/kit';
import { Badge } from '@vi/ui/components/badge';
import { cn } from '@vi/ui/lib/utils';
import { useLab } from '../lib/context';
import { capabilityFlag, collisionCandidates } from '../lib/derive2';
import type { Capability } from '../lib/types';
import { plural } from '../lib/format';
import { EmptyNote, IdLink, SectionHead, Segmented } from '../vi/parts';
import { CountUp, Stagger, StaggerItem, spring } from '../vi/motion';

const MATURITY = ['Idea', 'Proposed', 'Building', 'Built', 'In production', 'Retiring'] as const;
const KINDS = ['Platform', 'Data', 'Process', 'Evidence', 'People'] as const;
type KindFilter = 'all' | (typeof KINDS)[number];

const FLAG_TONE: Record<string, StatusTone> = { 'platform priority': 'good', 'retirement watch': 'warning', 'no reuse yet': 'neutral' };
const FLAG_WORD: Record<string, string> = { 'platform priority': 'Platform priority', 'retirement watch': 'Retirement watch', 'no reuse yet': 'No reuse yet' };

/** The capability catalogue: what ideas reuse and create. Demand (reuse count) drives the platform roadmap. */
export default function Catalogue() {
  const { reg, select, selectedId } = useLab();
  const caps = reg.capabilities;
  const [kind, setKind] = useState<KindFilter>('all');
  const collisions = useMemo(() => collisionCandidates(reg), [reg]);
  const family = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const l of reg.links) {
      if ((l.type !== 'reuses' && l.type !== 'creates') || !l.toId) continue;
      if (!m.has(l.fromId)) m.set(l.fromId, new Set());
      m.get(l.fromId)!.add(l.toId);
    }
    return reg.ideas
      .filter((i) => i.parentId && m.has(i.id) && m.has(i.parentId))
      .map((i) => ({ child: i.id, parent: i.parentId!, shared: [...m.get(i.id)!].filter((c) => m.get(i.parentId!)!.has(c)).length }))
      .filter((f) => f.shared >= 3);
  }, [reg]);
  const priority = caps.filter((c) => c.demand >= 3);
  const idle = caps.filter((c) => c.demand === 0);
  const built = caps.filter((c) => c.maturity === 'In production' || c.maturity === 'Built').length;
  const maxDemand = Math.max(1, ...caps.map((c) => c.demand));
  const idOf = (c: Capability) => c.ideaId ?? c.id;
  const listed = [...caps].filter((c) => kind === 'all' || c.kind === kind).sort((a, b) => b.demand - a.demand || a.name.localeCompare(b.name));

  // Bubble exhibit: x = maturity, y = kind, r = demand.
  const W = 760;
  const H = 420;
  const left = 96;
  const top = 40;
  const colW = (W - left - 16) / MATURITY.length;
  const rowH = (H - top - 20) / KINDS.length;
  // Capabilities sharing a cell are packed on a small grid inside it; a bubble's radius follows demand but never
  // outgrows its slot, so a crowded cell stays legible (the number on the bubble is the demand either way).
  const place = useMemo(() => {
    const out = new Map<string, { cx: number; cy: number; r: number }>();
    for (const m of MATURITY)
      for (const k of KINDS) {
        const sib = caps.filter((c) => c.maturity === m && c.kind === k).sort((a, b) => b.demand - a.demand || a.id.localeCompare(b.id));
        if (!sib.length) continue;
        const cols = Math.min(sib.length, Math.max(1, Math.floor(colW / 26)));
        const rows = Math.ceil(sib.length / cols);
        const sx = colW / cols;
        const sy = Math.min(rowH / rows, rowH);
        const x0 = left + MATURITY.indexOf(m) * colW;
        const y0 = top + KINDS.indexOf(k) * rowH + (rowH - sy * rows) / 2;
        sib.forEach((c, n) => {
          const col = n % cols;
          const row = Math.floor(n / cols);
          const inRow = row === rows - 1 ? sib.length - row * cols : cols;
          const offset = ((cols - inRow) * sx) / 2;
          const cap = Math.min(sx, sy) / 2 - 2;
          out.set(c.id, { cx: x0 + offset + col * sx + sx / 2, cy: y0 + row * sy + sy / 2, r: Math.max(6, Math.min(cap, 8 + (c.demand / maxDemand) * 16)) });
        });
      }
    return out;
  }, [caps, colW, rowH, maxDemand]);

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-4 pt-1">
        <div className="min-w-0">
          <div className="vi-caption">
            Capability catalogue · {plural(caps.length, 'capability', 'capabilities')} · {plural(reg.links.filter((l) => l.type === 'reuses' || l.type === 'creates').length, 'reuse or create link')}
          </div>
          <h1 className="mt-1.5 text-[30px] leading-tight font-normal tracking-tight md:text-[34px]">Catalogue</h1>
          <p className="mt-1.5 max-w-[760px] text-sm text-muted-foreground">What ideas reuse and create. A capability reused by three or more ideas is a platform priority whatever ships first; one nobody reuses after two quarters is reviewed for retirement.</p>
        </div>
      </header>

      <Stagger className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4" gap={0.06}>
        <StaggerItem>
          <Tile icon={<Boxes />} title="Capabilities" value={<CountUp value={caps.length} />} caption={`${built} built or in production`} spark={<DotGrid on={Math.min(12, built)} total={Math.min(12, Math.max(caps.length, 1))} />} />
        </StaggerItem>
        <StaggerItem>
          <Tile icon={<Sparkles />} tone="coloured" title="Platform priorities" value={<CountUp value={priority.length} />} caption={priority.length ? `${priority.slice(0, 4).map((c) => c.name.split(' ')[0]).join(', ')}${priority.length > 4 ? ` and ${priority.length - 4} more` : ''}; reused by three or more` : 'none at three reuses yet'} />
        </StaggerItem>
        <StaggerItem>
          <Tile icon={<Timer />} title="No reuse yet" value={<CountUp value={idle.length} />} caption={idle.length ? 'reviewed after two idle quarters' : 'every capability has a claimant'} />
        </StaggerItem>
        <StaggerItem>
          <Tile icon={<GitMerge />} tone={collisions.length ? 'ink' : 'default'} title="Collision candidates" value={<CountUp value={collisions.length} />} caption="pairs sharing three or more capabilities" />
        </StaggerItem>
      </Stagger>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring.soft, delay: 0.2 }}>
        <Surface>
          <SectionHead title="Demand by maturity and kind" caption="Each bubble is one capability, placed by its maturity (across) and kind (down); its size and number are demand, the rows that reuse it. Green bubbles are platform priorities. Tap one for its record." />
          <div className="lab-noscroll -mx-1 mt-4 overflow-x-auto px-1">
            <svg viewBox={`0 0 ${W} ${H}`} className="block w-full min-w-[620px]" role="img" aria-label="Capabilities by maturity, kind and demand">
              {MATURITY.map((m, i) => (
                <text key={m} x={left + i * colW + colW / 2} y={top - 16} textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.6">
                  {m}
                </text>
              ))}
              {KINDS.map((k, i) => (
                <g key={k}>
                  <text x={left - 12} y={top + i * rowH + rowH / 2 + 4} textAnchor="end" fontSize="11" fill="currentColor" opacity="0.6">
                    {k}
                  </text>
                  <line x1={left} x2={W - 16} y1={top + i * rowH + rowH} y2={top + i * rowH + rowH} stroke="currentColor" strokeOpacity="0.1" />
                </g>
              ))}
              {MATURITY.map((m, i) => (
                <line key={m} x1={left + i * colW} x2={left + i * colW} y1={top - 6} y2={H - 20} stroke="currentColor" strokeOpacity="0.05" />
              ))}
              {caps.map((c, n) => {
                const pos = place.get(c.id)!;
                const hot = c.demand >= 3;
                const sel = selectedId === idOf(c);
                return (
                  <motion.g
                    key={c.id}
                    onClick={() => select(idOf(c))}
                    style={{ cursor: 'pointer', transformBox: 'fill-box', transformOrigin: 'center' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ...spring.soft, delay: 0.3 + n * 0.035 }}
                    whileHover={{ scale: 1.12 }}
                  >
                    <title>{`${c.id} ${c.name}: demand ${c.demand}, ${c.maturity}, ${c.kind}`}</title>
                    {hot && <circle className="lab-ring-pulse" cx={pos.cx} cy={pos.cy} r={pos.r + 2} fill="none" stroke="var(--vi-brand)" strokeWidth="1.2" />}
                    <circle cx={pos.cx} cy={pos.cy} r={pos.r} fill={hot ? 'var(--vi-brand)' : 'currentColor'} fillOpacity={hot ? 0.9 : c.demand === 0 ? 0.12 : 0.22} stroke={sel ? 'var(--vi-brand)' : 'currentColor'} strokeOpacity={sel ? 1 : 0.35} strokeWidth={sel ? 2.5 : 1} />
                    <text x={pos.cx} y={pos.cy + 3.5} textAnchor="middle" fontSize={pos.r < 9 ? 9 : 11} fontWeight="600" fill={hot ? 'var(--vi-brand-fg)' : 'currentColor'} style={{ pointerEvents: 'none' }} className="vi-num">
                      {c.demand}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </div>
        </Surface>
      </motion.div>

      <Surface>
        <SectionHead
          title="Catalogue"
          count={listed.length}
          caption="Sorted by demand. Demand is the number of rows that reuse a capability; the note says which."
        />
        <div className="mt-3 flex max-w-full">
          <Segmented id="cat-kind" size="sm" options={[{ value: 'all' as KindFilter, label: 'All', count: caps.length }, ...KINDS.filter((k) => caps.some((c) => c.kind === k)).map((k) => ({ value: k as KindFilter, label: k, count: caps.filter((c) => c.kind === k).length }))]} value={kind} onChange={setKind} />
        </div>
        <div className="mt-4 hidden grid-cols-[minmax(0,1.4fr)_100px_120px_minmax(0,1fr)_minmax(0,1.2fr)_72px_150px] gap-3.5 px-4 xl:grid">
          {['Capability', 'Kind', 'Maturity', 'Created by', 'Reused by', 'Demand', 'Flag'].map((h) => (
            <span key={h} className="vi-caption uppercase tracking-wider">
              {h}
            </span>
          ))}
        </div>
        <Stagger key={kind} className="mt-2 flex flex-col gap-2" gap={0.03}>
          {listed.length === 0 && <EmptyNote>No capability of this kind.</EmptyNote>}
          {listed.map((c) => (
            <StaggerItem key={c.id}>
              <CapRow cap={c} onOpen={() => select(idOf(c))} selected={selectedId === idOf(c)} />
            </StaggerItem>
          ))}
        </Stagger>
      </Surface>

      <Surface>
        <SectionHead title="Collision candidates" count={collisions.length} caption="The Operating Model's rule: two ideas outside a parent-child pair that share three or more capabilities may be one idea, or should share a build." />
        <div className="mt-4 space-y-2">
          {collisions.length === 0 ? (
            <EmptyNote>
              No two ideas outside a parent-child pair share three or more capabilities.
              {family.length > 0 && ` ${family.map((f) => `${f.child} and ${f.parent} share ${f.shared}`).join('; ')}, but a feature and its parent are already one idea.`}
            </EmptyNote>
          ) : (
            collisions.map((c) => (
              <div key={`${c.a}-${c.b}`} className="lab-row flex flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 text-sm">
                <IdLink id={c.a} onOpen={select} />
                <span className="text-muted-foreground">and</span>
                <IdLink id={c.b} onOpen={select} />
                <span className="text-muted-foreground">share</span>
                <span className="vi-num font-medium">{c.shared.length}</span>
                <span className="text-xs text-muted-foreground">{c.shared.join(', ')}</span>
              </div>
            ))
          )}
        </div>
      </Surface>
    </div>
  );
}

function CapRow({ cap: c, onOpen, selected }: { cap: Capability; onOpen: () => void; selected: boolean }) {
  const flag = capabilityFlag(c);
  const flagEl = flag ? <Status tone={FLAG_TONE[flag] ?? 'neutral'} word={FLAG_WORD[flag] ?? flag} /> : <span className="text-xs text-muted-foreground">—</span>;
  return (
    <motion.button type="button" onClick={onOpen} whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} transition={spring.snappy} aria-current={selected ? 'true' : undefined} className={cn('lab-row w-full px-4 py-3.5 text-left', selected && 'ring-2 ring-[var(--vi-brand)]')}>
      {/* Wide */}
      <div className="hidden grid-cols-[minmax(0,1.4fr)_100px_120px_minmax(0,1fr)_minmax(0,1.2fr)_72px_150px] items-center gap-3.5 xl:grid">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium" title={c.name}>
            {c.name}
          </div>
          <div className="vi-num text-[11px] text-muted-foreground">
            {c.id}
            {c.ideaId ? ` · ${c.ideaId}` : ''}
          </div>
        </div>
        <span className="text-sm">{c.kind}</span>
        <Badge variant="outline" className="rounded-full">
          {c.maturity}
        </Badge>
        <span className="line-clamp-2 text-xs">{c.createdBy}</span>
        <span className="min-w-0 text-xs text-muted-foreground" title={c.demandNote ?? c.reusedBy}>
          <span className="line-clamp-2">{c.reusedBy}</span>
          {c.demandNote && c.demandNote !== String(c.demand) && <span className="mt-0.5 line-clamp-1 block text-[11px]">{c.demandNote}</span>}
        </span>
        <span title={c.demandNote ?? undefined}>
          <span className="vi-display text-[26px]">{c.demand}</span>
        </span>
        <span>{flagEl}</span>
      </div>
      {/* Narrow */}
      <div className="xl:hidden">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium">{c.name}</div>
            <div className="vi-num text-[11px] text-muted-foreground">
              {c.id}
              {c.ideaId ? ` · ${c.ideaId}` : ''} · {c.kind} · {c.maturity}
            </div>
          </div>
          <div className="text-right">
            <div className="vi-display text-[30px]">{c.demand}</div>
            <div className="text-[10px] text-muted-foreground">demand</div>
          </div>
        </div>
        <p className="mt-2 text-xs">
          <span className="text-muted-foreground">Created by</span> {c.createdBy}
        </p>
        <p className="mt-0.5 text-xs">
          <span className="text-muted-foreground">Reused by</span> {c.reusedBy}
        </p>
        {c.demandNote && c.demandNote !== String(c.demand) && <p className="mt-0.5 text-xs text-muted-foreground">{c.demandNote}</p>}
        <div className="mt-2">{flagEl}</div>
      </div>
    </motion.button>
  );
}
