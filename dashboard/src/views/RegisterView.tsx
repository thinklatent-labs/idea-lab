import { useMemo, useState, type KeyboardEvent, type ReactNode } from 'react';
import { LayoutGroup, motion } from 'motion/react';
import { ArrowDown, ArrowUp, ArrowUpRight, Search } from 'lucide-react';
import { Status } from '@kit/kit';
import { Badge } from '@kit/ui/components/badge';
import { Button } from '@kit/ui/components/button';
import { Input } from '@kit/ui/components/input';
import { NativeSelect, NativeSelectOption } from '@kit/ui/components/native-select';
import { cn } from '@kit/ui/lib/utils';
import { useLab } from '../lib/context';
import { STAGES, NODE_TYPES, HORIZONS, type Idea, type Stage } from '../lib/types';
import { fmtDate, plural } from '../lib/format';
import { healthOf, updateState } from '../lib/derive2';
import { Dash, EmptyNote, HealthTag, IdLink, Segmented, StageTag } from '../kit/parts';
import { spring } from '../kit/motion';

type SortKey = 'id' | 'stage' | 'score' | 'touched' | 'attention';
const STAGE_ORDER: Record<Stage, number> = { Seed: 0, Shaping: 1, 'Stress test': 2, Proposal: 3, Building: 4, Shipped: 5, Graduated: 6, Parked: 7, Killed: 8 };
const SORTS: { value: SortKey; label: string }[] = [
  { value: 'id', label: 'ID' },
  { value: 'stage', label: 'Stage' },
  { value: 'score', label: 'Score' },
  { value: 'touched', label: 'Touched' },
  { value: 'attention', label: 'Attention' },
];
// ID · title and next step · stage · in stage · health · score · stream and horizon · touched
const COLS = 'lg:grid-cols-[150px_minmax(0,1fr)_118px_100px_124px_92px_96px_96px]';
const COLS_NO_SCORE = 'lg:grid-cols-[150px_minmax(0,1fr)_118px_100px_124px_96px_96px]';

/** Every row as the register holds it: search, filter, sort, and the row's record one tap away. */
export default function RegisterView() {
  const { reg, derived, visibleIdeas, hidden } = useLab();
  const [stalledOnly, setStalledOnly] = useState(false);
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [stage, setStage] = useState('');
  const [horizon, setHorizon] = useState('');
  const [theme, setTheme] = useState('');
  const [sort, setSort] = useState<SortKey>('id');
  const [asc, setAsc] = useState(true);
  const showScore = !hidden('rubric');

  const isStalled = (i: Idea) => {
    const d = derived.get(i.id)!;
    return d.stale || (d.window != null && (d.daysInStage ?? 0) > d.window);
  };

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = visibleIdeas.filter((i) => {
      if (stalledOnly && !isStalled(i)) return false;
      if (type && i.type !== type) return false;
      if (stage && i.stage !== stage) return false;
      if (horizon && i.horizon !== horizon) return false;
      if (theme === 'none' ? i.themeIds.length > 0 : theme && !i.themeIds.includes(theme)) return false;
      if (needle) {
        const hay = [i.id, i.slug, i.title, i.owner, i.nextStep, ...(i.aliases ?? [])].join(' ').toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    const cmp = (a: Idea, b: Idea): number => {
      switch (sort) {
        case 'stage':
          return STAGE_ORDER[a.stage] - STAGE_ORDER[b.stage];
        case 'score':
          return (b.score.composite ?? -1) - (a.score.composite ?? -1);
        case 'touched':
          return b.lastTouched.localeCompare(a.lastTouched);
        case 'attention':
          return derived.get(b.id)!.attention - derived.get(a.id)!.attention;
        default:
          return a.id.localeCompare(b.id);
      }
    };
    return [...list].sort((a, b) => (asc ? cmp(a, b) : -cmp(a, b)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleIdeas, derived, q, type, stage, horizon, theme, sort, asc, stalledOnly]);

  const sortBy = (key: SortKey) => {
    if (sort === key) setAsc(!asc);
    else {
      setSort(key);
      setAsc(true);
    }
  };
  const filtersOn = !!(q || type || stage || horizon || theme || stalledOnly);
  const clear = () => {
    setQ('');
    setType('');
    setStage('');
    setHorizon('');
    setTheme('');
    setStalledOnly(false);
  };
  const w = reg.stalenessWindows;

  const head = (key: SortKey | null, label: string, className?: string) =>
    key ? (
      <button type="button" onClick={() => sortBy(key)} aria-sort={sort === key ? (asc ? 'ascending' : 'descending') : 'none'} className={cn('kit-caption inline-flex items-center gap-1 text-left uppercase tracking-wider hover:text-foreground', sort === key && 'text-foreground', className)}>
        {label}
        {sort === key && (asc ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />)}
      </button>
    ) : (
      <span className={cn('kit-caption uppercase tracking-wider', className)}>{label}</span>
    );

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-4 pt-1">
        <div className="min-w-0">
          <div className="kit-caption">
            Register · rev {reg.source.registerRev} · {plural(visibleIdeas.length, 'row')} · standard {reg.standardVersion}
          </div>
          <h1 className="mt-1.5 text-[30px] leading-tight font-normal tracking-tight md:text-[34px]">Register</h1>
          <p className="mt-1.5 max-w-[760px] text-sm text-muted-foreground">Every row as the live register holds it. Tap a row for its lab record, links, decisions and next step.</p>
        </div>
        <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2">
          <span className="kit-caption">Sort</span>
          <Segmented id="register-sort" size="sm" options={SORTS} value={sort} onChange={(v) => sortBy(v)} />
          <Button size="icon-sm" variant="outline" className="rounded-full bg-background/60" aria-label={asc ? 'Ascending; switch to descending' : 'Descending; switch to ascending'} onClick={() => setAsc(!asc)}>
            {asc ? <ArrowUp /> : <ArrowDown />}
          </Button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex h-9 min-w-0 flex-1 basis-full items-center gap-2 rounded-full border border-foreground/15 bg-background/70 px-3.5 backdrop-blur sm:basis-auto sm:max-w-[360px]">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input id="reg-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search id, slug, title, alias, owner…" aria-label="Search the register" className="h-8 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent" />
        </label>
        <Filter id="reg-type" label="Type" value={type} onChange={setType} all="All types">
          {NODE_TYPES.map((t) => (
            <NativeSelectOption key={t} value={t}>
              {t}
            </NativeSelectOption>
          ))}
        </Filter>
        <Filter id="reg-stage" label="Stage" value={stage} onChange={setStage} all="All stages">
          {STAGES.map((s) => (
            <NativeSelectOption key={s} value={s}>
              {s}
            </NativeSelectOption>
          ))}
        </Filter>
        <Filter id="reg-horizon" label="Horizon" value={horizon} onChange={setHorizon} all="All horizons">
          {HORIZONS.map((h) => (
            <NativeSelectOption key={h} value={h}>
              {h}
            </NativeSelectOption>
          ))}
        </Filter>
        <Filter id="reg-theme" label="Theme" value={theme} onChange={setTheme} all="All themes">
          {reg.themes.map((t) => (
            <NativeSelectOption key={t.id} value={t.id}>
              {t.id} {t.name.split(':')[0]}
            </NativeSelectOption>
          ))}
          <NativeSelectOption value="none">No theme</NativeSelectOption>
        </Filter>
        <Button variant="outline" aria-pressed={stalledOnly} onClick={() => setStalledOnly(!stalledOnly)} className={cn('h-9 rounded-full bg-background/60', stalledOnly && 'border-transparent bg-primary text-primary-foreground hover:bg-primary/85 hover:text-primary-foreground')}>
          Stalled only
        </Button>
        {filtersOn && (
          <Button variant="ghost" className="h-9 rounded-full" onClick={clear}>
            Clear filters
          </Button>
        )}
      </div>

      {/* Column heads, wide screens only; small screens get stacked cards. */}
      <div className={cn('hidden items-center gap-3.5 px-4 lg:grid', showScore ? COLS : COLS_NO_SCORE)}>
        {head('id', 'ID')}
        {head(null, 'Row and next step')}
        {head('stage', 'Stage')}
        {head(null, 'In stage')}
        {head(null, 'Health')}
        {showScore && head('score', 'Score')}
        {head(null, 'Stream')}
        {head('touched', 'Touched')}
      </div>

      {rows.length === 0 ? (
        <EmptyNote>
          No row matches these filters.{' '}
          <button type="button" className="underline underline-offset-4" onClick={clear}>
            Clear them
          </button>
          .
        </EmptyNote>
      ) : (
        <LayoutGroup>
          <div className="flex flex-col gap-2">
            {rows.map((i, n) => (
              <RegisterRow key={i.id} idea={i} index={n} showScore={showScore} stalled={isStalled(i)} />
            ))}
          </div>
        </LayoutGroup>
      )}

      <p className="px-1 text-xs text-muted-foreground">
        {rows.length} of {plural(visibleIdeas.length, 'row')}. Standard in force: {reg.standardVersion}. Staleness windows: Seed {w.Seed ?? '—'}, Shaping {w.Shaping ?? '—'}, Stress test {w['Stress test'] ?? '—'}, Proposal {w.Proposal ?? '—'}
        {w.Shipped != null ? `, Shipped ${w.Shipped}` : ''} days; Building runs by its appetite; Parked by its re-check date.
      </p>
    </div>
  );
}

function Filter({ id, label, value, onChange, all, children }: { id: string; label: string; value: string; onChange: (v: string) => void; all: string; children: ReactNode }) {
  return (
    <NativeSelect id={id} aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} className={cn('[&_select]:h-9 [&_select]:rounded-full [&_select]:bg-background/70 [&_select]:pl-3.5', value && '[&_select]:border-foreground/40')}>
      <NativeSelectOption value="">{all}</NativeSelectOption>
      {children}
    </NativeSelect>
  );
}

function RegisterRow({ idea: i, index, showScore, stalled }: { idea: Idea; index: number; showScore: boolean; stalled: boolean }) {
  const { reg, derived, now, select, selectedId, lastVisit } = useLab();
  const d = derived.get(i.id)!;
  const isNew = !!lastVisit && i.lastTouched > lastVisit;
  const ended = i.stage === 'Graduated' || i.stage === 'Killed';
  const h = healthOf(reg, i.id);
  const u = updateState(reg, i, now);
  const open = () => select(i.id);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  };
  const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

  const health = ended ? <Dash reason="not applicable" /> : <HealthTag health={h?.health} missing={u.level === 'warn' || u.level === 'alert'} />;
  const inStage =
    d.daysInStage != null ? (
      <span>
        <span className="kit-num">{d.daysInStage}</span> <span className="text-xs text-muted-foreground">days</span>
      </span>
    ) : (
      <Dash reason="not recorded" />
    );
  const score =
    i.score.composite != null ? (
      <span title={i.score.note ?? i.score.status}>
        <span className="kit-num">{i.score.composite.toFixed(2)}</span>
        <span className="block text-[11px] text-muted-foreground">{i.score.status}</span>
      </span>
    ) : (
      <Dash reason="not scored" />
    );
  const stream = (
    <span className="flex flex-wrap items-center gap-1">
      {i.streamId ? <Badge variant="secondary" className="rounded-full kit-num">{i.streamId}</Badge> : null}
      {i.horizon ? (
        <Badge variant="outline" className="rounded-full">
          {i.horizon}
        </Badge>
      ) : null}
      {!i.streamId && !i.horizon && <span className="text-xs text-muted-foreground">—</span>}
    </span>
  );
  const touched = (
    <span className="text-xs">
      <span className="kit-num">{fmtDate(i.lastTouched)}</span>
      {i.docUrl ? (
        <a href={i.docUrl} target="_blank" rel="noreferrer" onClick={stop} className="mt-0.5 flex items-center gap-0.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          doc <ArrowUpRight className="size-3" />
        </a>
      ) : (
        <span className="mt-0.5 block truncate text-muted-foreground" title={i.docTitle ?? undefined}>
          {i.docTitle ? 'doc pending' : 'no doc'}
        </span>
      )}
    </span>
  );
  const stageCell = (
    <span className="flex flex-col items-start gap-1">
      <StageTag stage={i.stage} note={i.stageNote} />
      {d.stale ? <Status tone="warning" word="Stale" /> : stalled ? <Status tone="warning" word="Stalled" /> : null}
    </span>
  );

  return (
    <motion.div
      layout="position"
      layoutId={`reg-${i.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring.layout, opacity: { duration: 0.25, delay: Math.min(index, 14) * 0.025 }, y: { ...spring.soft, delay: Math.min(index, 14) * 0.025 } }}
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={onKey}
      aria-current={selectedId === i.id ? 'true' : undefined}
      className={cn('lab-row cursor-pointer px-4 py-3.5 transition-shadow outline-none hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-ring', selectedId === i.id && 'ring-2 ring-[var(--kit-brand)]')}
    >
      {/* Wide: one grid row. */}
      <div className={cn('hidden items-center gap-3.5 lg:grid', showScore ? COLS : COLS_NO_SCORE)}>
        <div className="min-w-0">
          <div className="kit-num text-sm font-medium">{i.id}</div>
          <div className="truncate text-xs text-muted-foreground">{i.slug}</div>
          {isNew && <Status tone="info" word="Changed" className="mt-1" />}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium" title={i.title}>
            {i.title}
          </div>
          <Meta idea={i} />
          <div className="mt-1 line-clamp-1 text-xs text-muted-foreground" title={i.nextStep}>
            Next: {i.nextStep}
          </div>
        </div>
        <div>{stageCell}</div>
        <div className="text-sm">{inStage}</div>
        <div>{health}</div>
        {showScore && <div className="text-sm">{score}</div>}
        <div>{stream}</div>
        <div>{touched}</div>
      </div>

      {/* Phone and tablet: a stacked card with the same facts. */}
      <div className="lg:hidden">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="kit-num text-sm font-medium">{i.id}</span>
          <span className="text-xs text-muted-foreground">{i.slug}</span>
          {stageCell}
          {isNew && <Status tone="info" word="Changed" />}
        </div>
        <p className="mt-1.5 text-[15px] leading-snug font-medium">{i.title}</p>
        <Meta idea={i} />
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">Next: {i.nextStep}</p>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-4">
          <Cell label="In stage">{inStage}</Cell>
          <Cell label="Health">{health}</Cell>
          {showScore && <Cell label="Score">{score}</Cell>}
          <Cell label="Stream, horizon">{stream}</Cell>
          <Cell label="Touched">{touched}</Cell>
        </dl>
      </div>
    </motion.div>
  );
}

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="kit-caption">{label}</dt>
      <dd className="mt-0.5 text-sm">{children}</dd>
    </div>
  );
}

/** Type, parent and owner under the title. */
function Meta({ idea: i }: { idea: Idea }) {
  const { select } = useLab();
  return (
    <div className="mt-0.5 flex min-w-0 items-center gap-x-1.5 text-xs whitespace-nowrap text-muted-foreground">
      <span className="shrink-0">{i.type}</span>
      {i.parentId && (
        <span className="shrink-0" onClick={(e) => e.stopPropagation()}>
          of <IdLink id={i.parentId} onOpen={select} className="text-xs" />
        </span>
      )}
      <span className="min-w-0 truncate" title={i.owner}>
        · {i.owner}
      </span>
    </div>
  );
}
