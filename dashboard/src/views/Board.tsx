import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { Status } from '@kit/kit';
import { Badge } from '@kit/ui/components/badge';
import { cn } from '@kit/ui/lib/utils';
import { useLab } from '../lib/context';
import type { Lane } from '../lib/derive';
import { HORIZONS, type Idea } from '../lib/types';
import { relDays, plural } from '../lib/format';
import { EmptyNote, ReasonTags, Segmented, StageTag } from '../kit/parts';
import { spring } from '../kit/motion';

type LaneKey = Lane | 'Unplaced';
type Lens = 'lifecycle' | 'portfolio';
type HFilter = 'all' | 'H1' | 'H2' | 'H3' | 'none';

const LIFECYCLE_LANES: { key: LaneKey; label: string; rule: string }[] = [
  { key: 'Now', label: 'Now', rule: 'Building against an appetite, or Shipped and waiting on the metric read' },
  { key: 'Next', label: 'Next', rule: 'Proposal (funded, not started), Stress test or Shaping' },
  { key: 'Later', label: 'Later', rule: 'Seed or Parked' },
  { key: 'Graduated', label: 'Graduated', rule: 'in a Project of its own; the lab keeps a pointer' },
];
const PORTFOLIO_LANES: { key: LaneKey; label: string; rule: string }[] = [
  { key: 'Now', label: 'Now', rule: 'nothing placed in Now by the portfolio session' },
  { key: 'Next', label: 'Next', rule: 'nothing placed in Next by the portfolio session' },
  { key: 'Later', label: 'Later', rule: 'nothing placed in Later by the portfolio session' },
  { key: 'Unplaced', label: 'Not placed', rule: 'every row is placed' },
];

/** The portfolio board. Lanes follow the lifecycle, or the in-force portfolio session; switch the lens and the cards
 *  spring to their lanes in the other view, which shows where the two disagree. */
export default function Board() {
  const { reg, derived, visibleIdeas } = useLab();
  const [lens, setLens] = useState<Lens>('lifecycle');
  const [hf, setHf] = useState<HFilter>('all');
  const p = reg.portfolio ?? null;

  const laneOf = (i: Idea): LaneKey => {
    const lane = derived.get(i.id)!.lane;
    if (lens === 'lifecycle' || lane === 'Capabilities' || lane === 'Killed') return lane;
    if (p?.now?.includes(i.id)) return 'Now';
    if (p?.next?.includes(i.id)) return 'Next';
    if (p?.later?.includes(i.id)) return 'Later';
    return 'Unplaced';
  };
  const shown = visibleIdeas.filter((i) => hf === 'all' || (hf === 'none' ? !i.horizon : i.horizon === hf));
  const lanes = lens === 'lifecycle' ? LIFECYCLE_LANES : PORTFOLIO_LANES;
  const byLane = (k: LaneKey) => shown.filter((i) => laneOf(i) === k);
  const caps = byLane('Capabilities');
  const killed = byLane('Killed');
  const disagree = useMemo(
    () =>
      p
        ? visibleIdeas.filter((i) => {
            const life = derived.get(i.id)!.lane;
            const placed = p.now?.includes(i.id) ? 'Now' : p.next?.includes(i.id) ? 'Next' : p.later?.includes(i.id) ? 'Later' : null;
            return placed != null && placed !== life;
          })
        : [],
    [p, visibleIdeas, derived],
  );
  const hCounts = (h: HFilter) => visibleIdeas.filter((i) => (h === 'all' ? true : h === 'none' ? !i.horizon : i.horizon === h)).length;

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-4 pt-1">
        <div className="min-w-0">
          <div className="kit-caption">
            Portfolio board · {plural(visibleIdeas.length, 'row')}
            {p ? ` · portfolio session ${p.status}` : ''}
          </div>
          <h1 className="mt-1.5 text-[30px] leading-tight font-normal tracking-tight md:text-[34px]">Board</h1>
          <p className="mt-1.5 max-w-[760px] text-sm text-muted-foreground">
            {lens === 'lifecycle'
              ? 'Lanes follow the lifecycle: Now is Building or Shipped, Next is Proposal, Stress test or Shaping, Later is Seed or Parked; rows are grouped by horizon inside each lane.'
              : 'Lanes follow the portfolio session in force; rows it did not place sit in Not placed. Switch back to see where the lifecycle puts them.'}
          </p>
        </div>
        <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2">
          <Segmented
            id="board-lens"
            size="sm"
            options={[
              { value: 'lifecycle' as Lens, label: 'Lifecycle' },
              { value: 'portfolio' as Lens, label: 'Portfolio session' },
            ]}
            value={lens}
            onChange={setLens}
          />
          <Segmented
            id="board-horizon"
            size="sm"
            options={[
              { value: 'all' as HFilter, label: 'All', count: hCounts('all') },
              ...HORIZONS.map((h) => ({ value: h as HFilter, label: h, count: hCounts(h) })),
              { value: 'none' as HFilter, label: 'No horizon', count: hCounts('none') },
            ]}
            value={hf}
            onChange={setHf}
          />
        </div>
      </header>

      {p && disagree.length > 0 && (
        <div className="lab-row flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-3 text-sm">
          <Status tone="info" word={`${plural(disagree.length, 'row')} placed differently`} />
          <span className="text-muted-foreground">
            The portfolio session ({p.status}, {p.asOf}) and the lifecycle disagree on {disagree.map((i) => `${i.id} ${i.slug}`).join(', ')}; switch the lens to watch them move.
          </span>
        </div>
      )}

      <LayoutGroup id="board">
        <div className="@container">
        <div className="grid gap-3 @2xl:grid-cols-2 @6xl:grid-cols-4">
          {lanes.map((lane) => {
            const rows = byLane(lane.key);
            return (
              <motion.section key={lane.key} layout transition={spring.layout} className="kit-surface-frame flex min-w-0 flex-col gap-3 p-3.5" aria-label={`${lane.label} lane`}>
                <div className="flex items-baseline justify-between gap-2 px-1">
                  <h2 className="text-[17px] font-medium">{lane.label}</h2>
                  <span className="text-xs text-muted-foreground">
                    <span className="kit-num text-foreground">{rows.length}</span> {rows.length === 1 ? 'row' : 'rows'}
                  </span>
                </div>
                {rows.length === 0 ? (
                  <motion.p layout className="px-1 text-xs text-muted-foreground">
                    Nothing here: {lane.rule}.
                  </motion.p>
                ) : (
                  [...HORIZONS, null].map((h) => {
                    const group = rows.filter((i) => (i.horizon ?? null) === h);
                    if (group.length === 0) return null;
                    return (
                      <motion.div key={h ?? 'none'} layout transition={spring.layout} className="flex flex-col gap-2">
                        <span className="kit-caption px-1">{h ?? 'No horizon'}</span>
                        <AnimatePresence initial={true} mode="popLayout">
                          {group.map((i, k) => (
                            <BoardCard key={i.id} idea={i} index={k} />
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                )}
              </motion.section>
            );
          })}
        </div>
        </div>

        {(caps.length > 0 || killed.length > 0) && (
          <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
            {caps.length > 0 && (
              <motion.section layout className="kit-surface-frame flex min-w-0 flex-col gap-2 p-3.5" aria-label="Capabilities to watch">
                <div className="flex items-baseline justify-between px-1">
                  <h2 className="text-[17px] font-medium">Capabilities to watch</h2>
                  <span className="kit-num text-xs text-muted-foreground">{caps.length}</span>
                </div>
                <AnimatePresence mode="popLayout">
                  {caps.map((i, k) => (
                    <BoardCard key={i.id} idea={i} index={k} />
                  ))}
                </AnimatePresence>
              </motion.section>
            )}
            {killed.length > 0 && (
              <motion.section layout className="kit-surface-frame flex min-w-0 flex-col gap-2 p-3.5" aria-label="Killed">
                <div className="flex items-baseline justify-between px-1">
                  <h2 className="text-[17px] font-medium">Killed</h2>
                  <span className="kit-num text-xs text-muted-foreground">{killed.length}</span>
                </div>
                <p className="px-1 text-xs text-muted-foreground">Kept with their reasons; killed ideas are evidence for later ones.</p>
                <AnimatePresence mode="popLayout">
                  {killed.map((i, k) => (
                    <BoardCard key={i.id} idea={i} index={k} quiet />
                  ))}
                </AnimatePresence>
              </motion.section>
            )}
          </div>
        )}
      </LayoutGroup>

      {shown.length === 0 && <EmptyNote>No row has this horizon.</EmptyNote>}

      {p?.status === 'proposed' && (
        <p className="px-1 text-xs text-muted-foreground">The portfolio session is a proposal: nothing in its lanes is in force until Jithin approves or amends it.</p>
      )}
    </div>
  );
}

function BoardCard({ idea, index, quiet = false }: { idea: Idea; index: number; quiet?: boolean }) {
  const { derived, select, selectedId, lastVisit } = useLab();
  const d = derived.get(idea.id)!;
  const isNew = !!lastVisit && idea.lastTouched > lastVisit;
  return (
    <motion.button
      type="button"
      layout
      layoutId={`board-${idea.id}`}
      initial={{ opacity: 0, scale: 0.94, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ ...spring.layout, delay: Math.min(index, 8) * 0.03 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => select(idea.id)}
      aria-current={selectedId === idea.id ? 'true' : undefined}
      className={cn('lab-row w-full px-3.5 py-3 text-left', selectedId === idea.id && 'ring-2 ring-[var(--kit-brand)]')}
    >
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="kit-num text-xs font-medium">{idea.id}</span>
        <span className="min-w-0 truncate text-xs text-muted-foreground">{idea.slug}</span>
        <StageTag stage={idea.stage} note={idea.stageNote} className="ml-auto" />
      </div>
      <p className="mt-1.5 line-clamp-2 text-sm leading-snug font-medium">{idea.title}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-muted-foreground">
        {idea.score.composite != null && (
          <span>
            score <span className="kit-num text-foreground">{idea.score.composite.toFixed(2)}</span> {idea.score.status}
          </span>
        )}
        {idea.streamId && (
          <Badge variant="secondary" className="rounded-full">
            {idea.streamId}
          </Badge>
        )}
        <span>touched {relDays(d.daysUntouched)}</span>
        {isNew && <Status tone="info" word="Changed" />}
      </div>
      {!quiet && d.reasons.length > 0 && <ReasonTags reasons={d.reasons} max={2} className="mt-2" />}
    </motion.button>
  );
}
