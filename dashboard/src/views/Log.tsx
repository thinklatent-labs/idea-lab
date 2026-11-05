import { useState, type ReactNode } from 'react';
import { Status, Surface } from '@vi/kit';
import { Badge } from '@vi/ui/components/badge';
import { Button } from '@vi/ui/components/button';
import { NativeSelect, NativeSelectOption } from '@vi/ui/components/native-select';
import { cn } from '@vi/ui/lib/utils';
import { useLab } from '../lib/context';
import { fmtDate, plural } from '../lib/format';
import { decisionIndex } from '../lib/derive2';
import { EmptyNote, HealthTag, IdLink, SectionHead, Segmented } from '../vi/parts';

type StatusFilter = 'all' | 'proposed' | 'accepted' | 'superseded';
type TypeFilter = 'all' | 'decision' | 'rejection' | 'gate' | 'retro';

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

const PAGE = 25;

export default function Log() {
  const { reg, now, select, lastVisit, hidden } = useLab();
  const [pendingFirst, setPendingFirst] = useState(true);
  const [ideaFilter, setIdeaFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [shown, setShown] = useState(PAGE);
  const [sessionsShown, setSessionsShown] = useState(6);
  const indexed = decisionIndex(reg, now);
  const statusOf = (d: (typeof indexed)[number]) => d.status ?? (d.pending ? 'proposed' : 'accepted');
  const decisions = indexed
    .filter((d) => !ideaFilter || d.ideaId === ideaFilter)
    .filter((d) => statusFilter === 'all' || statusOf(d) === statusFilter)
    .filter((d) => typeFilter === 'all' || (d.type ?? 'decision') === typeFilter)
    .sort((a, b) => {
      if (pendingFirst && !!a.pending !== !!b.pending) return a.pending ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
  const sessions = [...reg.sessions].reverse();
  const pendingCount = reg.decisions.filter((d) => d.pending).length;
  const count = (f: (d: (typeof indexed)[number]) => boolean) => indexed.filter((d) => (!ideaFilter || d.ideaId === ideaFilter) && f(d)).length;

  return (
    <div className="flex flex-col gap-5">
      <ViewHeader
        kicker={`${plural(reg.decisions.length, 'decision line')} · ${pendingCount} pending · ${plural(reg.sessions.length, 'session')} · ${plural(reg.syncLog.length, 'sync run')}`}
        title="Log"
        caption="The decision log is the memory of the lab: one line per decision per idea, never edited; a reversal is a new line that supersedes the old. Sessions and sync runs follow."
      />

      <Surface>
        <SectionHead title="Decisions" count={decisions.length} caption={`Newest first${pendingFirst ? ', pending lines on top' : ''}. Dots: the brand colour for a decision in force, the decision colour for a rejection, grey for one superseded.`} />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Segmented
            id="log-status"
            size="sm"
            value={statusFilter}
            onChange={(v) => {
              setStatusFilter(v);
              setShown(PAGE);
            }}
            options={[
              { value: 'all', label: 'All' },
              { value: 'proposed', label: 'Pending', count: count((d) => statusOf(d) === 'proposed') },
              { value: 'accepted', label: 'Accepted', count: count((d) => statusOf(d) === 'accepted') },
              { value: 'superseded', label: 'Superseded', count: count((d) => statusOf(d) === 'superseded') },
            ]}
          />
          <Segmented
            id="log-type"
            size="sm"
            value={typeFilter}
            onChange={(v) => {
              setTypeFilter(v);
              setShown(PAGE);
            }}
            options={[
              { value: 'all', label: 'All types' },
              { value: 'decision', label: 'Decisions' },
              { value: 'rejection', label: 'Rejections', count: count((d) => d.type === 'rejection') },
              { value: 'gate', label: 'Gates', count: count((d) => d.type === 'gate') },
              { value: 'retro', label: 'Retros', count: count((d) => d.type === 'retro') },
            ]}
          />
          <NativeSelect
            size="sm"
            value={ideaFilter}
            onChange={(e) => {
              setIdeaFilter(e.target.value);
              setShown(PAGE);
            }}
            aria-label="Filter by idea"
            className="[&_select]:rounded-full [&_select]:bg-background/60"
          >
            <NativeSelectOption value="">All ideas</NativeSelectOption>
            {reg.ideas.map((i) => (
              <NativeSelectOption key={i.id} value={i.id}>
                {i.id} {i.slug}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <Button size="sm" variant={pendingFirst ? 'default' : 'outline'} className="rounded-full" aria-pressed={pendingFirst} onClick={() => setPendingFirst(!pendingFirst)}>
            Pending first
          </Button>
        </div>

        {hidden('decisions') ? (
          <EmptyNote className="mt-4">Decisions are not part of this audience's view.</EmptyNote>
        ) : decisions.length === 0 ? (
          <EmptyNote className="mt-4">No decision line matches these filters.</EmptyNote>
        ) : (
          <>
            <ol className="relative mt-5 ml-1.5 space-y-2 border-l border-foreground/10 pl-5">
              {decisions.slice(0, shown).map((d, n) => {
                const isNew = !!lastVisit && d.date > lastVisit;
                const status = statusOf(d);
                return (
                  <li key={`${d.id ?? ''}-${n}`} className="relative">
                    <span
                      className={cn(
                        'absolute top-4 -left-[26px] size-2.5 rounded-full border-2 border-background',
                        status === 'superseded' ? 'bg-foreground/25' : d.type === 'rejection' ? 'bg-[var(--vi-decision)]' : status === 'proposed' ? 'bg-[var(--lab-warn)]' : 'bg-[var(--vi-brand)]',
                      )}
                    />
                    <div className="lab-row px-4 py-3">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
                        <span className="vi-num">{fmtDate(d.date)}</span>
                        {d.id && <span className="vi-num">{d.id}</span>}
                        <IdLink id={d.ideaId} onOpen={select} className="text-xs">{`${d.ideaId} ${d.slug}`}</IdLink>
                        {status === 'proposed' && <Status tone="warning" word="Pending" />}
                        {status === 'superseded' && <Status tone="neutral" word="Superseded" />}
                        {isNew && <Status tone="info" word="New since your last visit" />}
                      </div>
                      <p className={cn('mt-1 text-sm leading-relaxed', status === 'superseded' && 'text-muted-foreground line-through decoration-foreground/30')}>{d.decision}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                        {!hidden('decisions-by') && <span className="mr-1 text-xs text-muted-foreground">{d.by}</span>}
                        {d.type === 'rejection' && <Status tone="critical" word="Rejection" />}
                        {d.type === 'gate' && (
                          <Badge variant="outline" className="rounded-full">
                            Gate record
                          </Badge>
                        )}
                        {d.type === 'retro' && (
                          <Badge variant="outline" className="rounded-full">
                            Retro
                          </Badge>
                        )}
                        {d.door && (
                          <Badge variant="outline" className="rounded-full">
                            {d.door} door
                          </Badge>
                        )}
                        {d.infoLevel != null && (
                          <Badge variant="outline" className="rounded-full">
                            {d.infoLevel}% information
                          </Badge>
                        )}
                        {d.reviewOn && <Status tone={d.reviewDays != null && d.reviewDays <= 7 ? 'warning' : 'neutral'} word={`Review ${fmtDate(d.reviewOn)}`} />}
                        {d.supersedes && (
                          <Badge variant="outline" className="rounded-full">
                            supersedes {d.supersedes}
                          </Badge>
                        )}
                        {!d.door && !d.reviewOn && <span className="text-[11px] text-muted-foreground">door and review date not recorded</span>}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            {decisions.length > shown && (
              <div className="mt-3 flex justify-center">
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => setShown(decisions.length)}>
                  Show all {decisions.length} lines ({decisions.length - shown} more)
                </Button>
              </div>
            )}
          </>
        )}
      </Surface>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Surface>
          <SectionHead title="Sessions" count={reg.sessions.length} caption="One row per lab chat, newest first, with the health call it ended on." />
          <ol className="relative mt-5 ml-1.5 space-y-2 border-l border-foreground/10 pl-5">
            {sessions.slice(0, sessionsShown).map((s, n) => (
              <li key={n} className="relative">
                <span className="absolute top-4 -left-[26px] size-2.5 rounded-full border-2 border-background bg-foreground/40" />
                <div className="lab-row px-4 py-3">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
                    <span className="vi-num">{fmtDate(s.date)}</span>
                    <span className="font-medium text-foreground/80">{s.mode}</span>
                    {s.health && <HealthTag health={s.health} />}
                  </div>
                  <p className="mt-1 text-sm font-medium">{s.scope}</p>
                  <p className="mt-0.5 text-sm leading-relaxed">{s.outcome}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Docs: {s.docsTouched}</p>
                  {s.healthNote && <p className="mt-0.5 text-[11px] text-muted-foreground">{s.healthNote}</p>}
                </div>
              </li>
            ))}
          </ol>
          {sessions.length > sessionsShown && (
            <div className="mt-3 flex justify-center">
              <Button size="sm" variant="outline" className="rounded-full" onClick={() => setSessionsShown(sessions.length)}>
                Show all {sessions.length} sessions
              </Button>
            </div>
          )}
        </Surface>

        <Surface>
          <SectionHead title="Sync runs" count={reg.syncLog.length} caption="Each run of the lab sync: what it scanned, what changed and what it flagged." />
          {reg.syncLog.length === 0 ? (
            <EmptyNote className="mt-4">No sync run recorded.</EmptyNote>
          ) : (
            <div className="mt-4 space-y-1.5">
              {[...reg.syncLog].reverse().map((s, n) => (
                <div key={n} className="lab-row px-4 py-3">
                  <div className="flex flex-wrap items-center gap-x-2.5 text-xs text-muted-foreground">
                    <span className="vi-num">{fmtDate(s.date)}</span>
                    <span className="font-medium text-foreground/80">{s.run}</span>
                  </div>
                  <p className="mt-1 text-sm">Scanned {s.docsScanned}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Rows changed: {s.rowsChanged}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Flags: {s.flags}</p>
                </div>
              ))}
            </div>
          )}
        </Surface>
      </div>
    </div>
  );
}
