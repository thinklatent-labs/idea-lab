import { useMemo, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Status, Surface } from '@vi/kit';
import { Button } from '@vi/ui/components/button';
import { cn } from '@vi/ui/lib/utils';
import { useLab } from '../lib/context';
import { diffSnapshots } from '../lib/derive2';
import { fmtDate, fmtDateTime, plural } from '../lib/format';
import { EmptyNote, IdLink, SectionHead, StageTag } from '../vi/parts';
import { CountUp, Stagger, StaggerItem } from '../vi/motion';

function ViewHeader({ kicker, title, caption, actions }: { kicker: ReactNode; title: string; caption: ReactNode; actions?: ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 pt-1">
      <div className="min-w-0">
        <div className="vi-caption">{kicker}</div>
        <h1 className="mt-1.5 text-[30px] leading-tight font-normal tracking-tight md:text-[34px]">{title}</h1>
        <p className="mt-1.5 max-w-[720px] text-sm text-muted-foreground">{caption}</p>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

/** One number with its caption, in a floating card. */
function Kpi({ n, label, caption, lit }: { n: number; label: string; caption: ReactNode; lit?: boolean }) {
  return (
    <div className={cn('vi-surface-content h-full px-5 pt-4 pb-4', lit && 'ring-2 ring-[color-mix(in_oklab,var(--vi-brand)_55%,transparent)]')}>
      <div className="text-[15px] font-medium">{label}</div>
      <div className="vi-display mt-3 text-[48px]">
        <CountUp value={n} />
      </div>
      <div className="mt-1.5 text-xs text-muted-foreground">{caption}</div>
    </div>
  );
}

/** A decision line on the timeline: a dot, the date and id, the text. */
function TimelineLine({ date, id, ideaId, text, by, onOpen }: { date: string; id?: string; ideaId: string; text: string; by?: string; onOpen: (id: string) => void }) {
  return (
    <li className="relative">
      <span className="absolute top-1.5 -left-[21px] size-2.5 rounded-full border-2 border-background bg-[var(--vi-brand)]" />
      <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
        <span className="vi-num">{fmtDate(date)}</span>
        {id && <span className="vi-num">{id}</span>}
        <IdLink id={ideaId} onOpen={onOpen} className="text-xs" />
      </div>
      <p className="mt-0.5 text-sm">{text}</p>
      {by && <p className="text-xs text-muted-foreground">{by}</p>}
    </li>
  );
}

export default function Changes() {
  const { reg, previous, previousLabel, select, lastVisit, hidden, go } = useLab();
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
    <div className="flex flex-col gap-5">
      <ViewHeader
        kicker={diff ? `${fmtDateTime(reg.asOf)} (rev ${reg.source.registerRev}) against ${previousLabel}` : `rev ${reg.source.registerRev} · no earlier snapshot beside this page`}
        title="What changed"
        caption="The current register against the latest earlier snapshot the sync kept: stage, lane, score, owner, horizon, theme, parent, next step, decisions due and appetite per row, plus rows, links and log lines."
        actions={
          <Button size="sm" variant="outline" className="rounded-full bg-background/60" onClick={() => go('log', null)}>
            Full log
          </Button>
        }
      />

      {!previous || !diff ? (
        <EmptyNote>No earlier snapshot is published beside this page yet, so there is nothing to diff. Once the nightly sync keeps one file per export in data/history, this view compares the two most recent.</EmptyNote>
      ) : (
        <>
          <Stagger className="grid grid-cols-2 gap-3 xl:grid-cols-4" gap={0.05}>
            <StaggerItem>
              <Kpi n={diff.changes.length} label="Field changes" caption={`across ${plural(byIdea.size, 'row')}`} lit={diff.changes.length > 0} />
            </StaggerItem>
            <StaggerItem>
              <Kpi n={diff.newIdeas.length} label="Rows added" caption={diff.removedIdeas.length ? `${diff.removedIdeas.length} removed` : 'none removed'} />
            </StaggerItem>
            <StaggerItem>
              <Kpi n={diff.decisionsAdded.length} label="Decisions logged" caption={`${plural(diff.sessionsAdded, 'session')} logged`} />
            </StaggerItem>
            <StaggerItem>
              <Kpi n={diff.linksAdded} label="Links added" caption={diff.linksRemoved ? `${diff.linksRemoved} removed` : 'none removed'} />
            </StaggerItem>
          </Stagger>

          <Surface>
            <SectionHead title="By row" count={byIdea.size + diff.newIdeas.length} caption="Each row that moved between the two snapshots, field by field: the old value struck through, then the new one." />
            <div className="mt-4 space-y-2">
              {byIdea.size === 0 && diff.newIdeas.length === 0 && <EmptyNote>No row changed between the two snapshots.</EmptyNote>}
              {diff.newIdeas.map((id) => {
                const i = reg.ideas.find((x) => x.id === id);
                return (
                  <div key={id} className="lab-row px-4 py-3.5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <IdLink id={id} onOpen={select}>{`${id} ${i?.slug ?? ''}`}</IdLink>
                      {i && <StageTag stage={i.stage} />}
                      <Status tone="good" word="New row" className="ml-auto" />
                    </div>
                    {i && <p className="mt-1.5 text-sm">{i.title}</p>}
                  </div>
                );
              })}
              {diff.removedIdeas.map((id) => (
                <div key={`rm-${id}`} className="lab-row flex flex-wrap items-center gap-3 px-4 py-3.5">
                  <span className="vi-num text-sm font-medium">{id}</span>
                  <Status tone="warning" word="Removed from the register" className="ml-auto" />
                </div>
              ))}
              {[...byIdea.entries()].map(([id, list]) => {
                const i = reg.ideas.find((x) => x.id === id);
                return (
                  <div key={id} className="lab-row px-4 py-3.5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      {id === 'catalogue' ? <span className="text-sm font-medium">Catalogue</span> : <IdLink id={id} onOpen={select}>{`${id} ${i?.slug ?? ''}`}</IdLink>}
                      {i && <StageTag stage={i.stage} />}
                      <span className="ml-auto text-xs text-muted-foreground">{plural(list.length, 'change')}</span>
                    </div>
                    <ul className="mt-2.5 space-y-2">
                      {list.map((c, n) => (
                        <li key={n} className="grid gap-1 text-sm sm:grid-cols-[130px_1fr] sm:gap-3">
                          <span className="vi-caption pt-0.5">{c.what}</span>
                          <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className="text-muted-foreground line-through decoration-foreground/30">{c.from || '—'}</span>
                            <ArrowRight className="size-3.5 shrink-0 self-center text-muted-foreground" aria-label="became" />
                            <span>{c.to || '—'}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Surface>

          {!hidden('decisions') && (
            <Surface>
              <SectionHead title="Decisions logged between the snapshots" count={diff.decisionsAdded.length} caption="Immutable lines; a reversal is a new line that supersedes the old." />
              {diff.decisionsAdded.length === 0 ? (
                <EmptyNote className="mt-4">None.</EmptyNote>
              ) : (
                <ol className="relative mt-4 space-y-3 border-l border-foreground/10 pl-4">
                  {diff.decisionsAdded.map((d, n) => (
                    <TimelineLine key={n} date={d.date} id={d.id} ideaId={d.ideaId} text={d.decision} by={hidden('decisions-by') ? undefined : d.by} onOpen={select} />
                  ))}
                </ol>
              )}
            </Surface>
          )}
        </>
      )}

      <Surface>
        <SectionHead title="Since your last visit" caption={lastVisit ? `Rows touched and decisions logged after ${fmtDate(lastVisit)}, the last time this browser opened the dashboard.` : 'This is the first visit from this browser.'} count={lastVisit ? touchedSinceVisit.length + decisionsSinceVisit.length : undefined} />
        <div className="mt-4">
          {!lastVisit ? (
            <EmptyNote>The next visit from this browser will list what moved in between.</EmptyNote>
          ) : touchedSinceVisit.length + decisionsSinceVisit.length === 0 ? (
            <EmptyNote>Nothing has been touched since {fmtDate(lastVisit)}.</EmptyNote>
          ) : (
            <div className="space-y-4">
              {touchedSinceVisit.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {touchedSinceVisit.map((i) => (
                    <button key={i.id} type="button" onClick={() => select(i.id)} className="lab-row flex items-center gap-2.5 px-3.5 py-2 text-left text-sm transition-transform active:scale-[0.98]">
                      <span className="vi-num font-medium">{i.id}</span>
                      <span>{i.slug}</span>
                      <span className="text-xs text-muted-foreground">touched {fmtDate(i.lastTouched)}</span>
                    </button>
                  ))}
                </div>
              )}
              {decisionsSinceVisit.length > 0 && !hidden('decisions') && (
                <ol className="relative space-y-3 border-l border-foreground/10 pl-4">
                  {decisionsSinceVisit.map((d, n) => (
                    <TimelineLine key={`d${n}`} date={d.date} id={d.id} ideaId={d.ideaId} text={d.decision} onOpen={select} />
                  ))}
                </ol>
              )}
            </div>
          )}
        </div>
      </Surface>
    </div>
  );
}
