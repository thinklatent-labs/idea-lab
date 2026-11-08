import { useMemo } from 'react';
import { motion } from 'motion/react';
import { CircleCheck, Hammer, Layers, TriangleAlert } from 'lucide-react';
import { Bars, DotGrid, Status, Surface, Tile } from '@kit/kit';
import { Badge } from '@kit/ui/components/badge';
import { Button } from '@kit/ui/components/button';
import { cn } from '@kit/ui/lib/utils';
import { useLab } from '../lib/context';
import { attentionQueue, stageCounts } from '../lib/derive';
import { decisionIndex, evaluateRules, funnel, healthOf, openNextSteps, updateState, appetiteState, buildingGate, type RuleHit } from '../lib/derive2';
import { dueItems, type Idea, type Stage } from '../lib/types';
import { fmtDate, fmtDateTime, plural } from '../lib/format';
import DueCard from '../components/DueCard';
import { BriefHero } from '../jarvis/BriefHero';
import { whenText } from '../jarvis/brain';
import { EmptyNote, Fold, IdLink, Meter, SectionHead, STAGE_VAR, StageTag } from '../kit/parts';
import { awaitingAccept, presetLogPending } from '../lib/handoff';
import { CountUp, Stagger, StaggerItem, spring } from '../kit/motion';

const PIPE: Stage[] = ['Seed', 'Shaping', 'Stress test', 'Proposal', 'Building', 'Shipped', 'Graduated'];
const DAY = 86_400_000;

function greeting(now: Date): string {
  const h = now.getHours();
  return h < 5 ? 'Working late' : h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

/** The command center: orient, judge, decide, act, trace, in that order (kit rule 1). One expressive exhibit, the
 *  pipeline; at most six numbers in the tiles; every number captioned. */
export default function Command() {
  const { reg, derived, now, go, select, setQueueFilter, lastVisit, hidden, visibleIdeas, inbox } = useLab();
  const counts = useMemo(() => stageCounts(visibleIdeas), [visibleIdeas]);
  const queue = useMemo(() => attentionQueue(reg, derived), [reg, derived]);
  const hits: RuleHit[] = useMemo(() => evaluateRules(reg, derived, now), [reg, derived, now]);
  const steps = useMemo(() => openNextSteps(reg, now).filter((s) => s.daysLeft != null && s.daysLeft <= 7 && visibleIdeas.some((v) => v.id === s.ideaId)), [reg, now, visibleIdeas]);
  const reviews = useMemo(() => decisionIndex(reg, now).filter((d) => d.reviewDays != null && d.reviewDays <= 7 && d.status !== 'superseded'), [reg, now]);
  const fun = useMemo(() => funnel(reg), [reg]);

  const live = visibleIdeas.filter((i) => !['Graduated', 'Killed'].includes(i.stage));
  const allDue = visibleIdeas.filter((i) => i.stage !== 'Killed').flatMap((i) => dueItems(i).map((item) => ({ idea: i, item })));
  const quickOpen = allDue.filter(({ item }) => item.kind === 'quick' && inbox.docs.get(item.id)?.status !== 'applied');
  const quickPending = quickOpen.filter(({ item }) => !inbox.docs.has(item.id)).length;
  const inputDue = allDue.filter(({ item }) => item.kind === 'input');
  const requests = [...inbox.docs.values()].filter((d) => d.kind === 'request');
  // Lines the thinking partner proposed that wait for Jithin's accept: shown apart from the quick calls (S6).
  const awaiting = hidden('decisions') ? 0 : reg.decisions.filter(awaitingAccept).length;
  const toPending = () => {
    presetLogPending();
    go('log', null);
  };
  const alerts = hits.filter((h) => h.level === 'alert');
  const warns = hits.filter((h) => h.level === 'warn');
  const lead = queue.find((i) => visibleIdeas.includes(i) && derived.get(i.id)!.attention > 0) ?? null;

  const streams = reg.streams ?? [];
  const building = visibleIdeas.filter((i) => i.stage === 'Building' || i.stage === 'Shipped');
  const streamsUsed = new Set(building.map((i) => i.streamId).filter(Boolean)).size;
  const named = streams.filter((s) => s.owner).length;

  const health = live.map((i) => ({ h: healthOf(reg, i.id), u: updateState(reg, i, now) }));
  const hc = {
    on: health.filter((x) => x.h?.health === 'on-track').length,
    risk: health.filter((x) => x.h?.health === 'at-risk').length,
    off: health.filter((x) => x.h?.health === 'off-track').length,
    missing: health.filter((x) => x.u.level === 'warn' || x.u.level === 'alert').length,
  };
  const dwell = (() => {
    const vals = live.map((i) => derived.get(i.id)!.daysInStage).filter((d): d is number => d != null).sort((a, b) => a - b);
    return vals.length ? vals[Math.floor(vals.length / 2)] : null;
  })();
  const since = lastVisit ? reg.decisions.filter((d) => d.date >= lastVisit) : reg.decisions.slice(-6);
  const toQueue = (f: string) => {
    setQueueFilter(f);
    go('queue', null);
  };
  const stageBars = PIPE.slice(0, 6).map((s) => counts[s]);
  const maxStage = stageBars.indexOf(Math.max(...stageBars));

  return (
    <div className="flex flex-col gap-5">
      {/* Orient */}
      <header className="flex flex-wrap items-end justify-between gap-4 pt-1">
        <div>
          <div className="kit-caption">
            {now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} · register rev {reg.source.registerRev} · {plural(visibleIdeas.length, 'row')}, {live.length} live
          </div>
          <h1 className="mt-1.5 text-[30px] leading-tight font-normal tracking-tight @min-[640px]:text-[34px]">{greeting(now)}, Jithin</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="rounded-full" onClick={() => toQueue('decision')}>
            Decisions <span className="kit-num opacity-70">{quickPending + inputDue.length}</span>
          </Button>
          <Button variant="outline" className="rounded-full bg-background/60" onClick={() => go('board', null)}>
            Board
          </Button>
          <Button variant="outline" className="rounded-full bg-background/60" onClick={() => go('scores', null)}>
            Portfolio
          </Button>
          <Button variant="outline" className="rounded-full bg-background/60" onClick={() => go('changes', null)}>
            Changes
          </Button>
        </div>
      </header>

      {/* Judge: Jarvis's brief and the tiles */}
      <Stagger className="grid gap-4 @min-[640px]:grid-cols-2 @min-[1150px]:grid-cols-[1.3fr_1fr_1fr]" gap={0.06}>
        <StaggerItem className="@min-[640px]:col-span-2 @min-[1150px]:col-span-1 @min-[1150px]:row-span-2">
          <BriefHero />
        </StaggerItem>
        <StaggerItem>
          <Tile className="h-full" icon={<Layers />} title="Live rows" value={<CountUp value={live.length} />} unit={`of ${visibleIdeas.length}`} caption="Seed to Shipped; Graduated and Killed left the lab" onOpen={() => go('register', null)} spark={<Bars values={stageBars.map((v) => Math.max(v, 0.15))} lit={maxStage} />} />
        </StaggerItem>
        <StaggerItem>
          <Tile className="h-full" icon={<CircleCheck />} title="Needs you" value={<CountUp value={quickPending + inputDue.length} />} unit={quickPending + inputDue.length === 1 ? 'decision' : 'decisions'} caption={`${plural(quickPending, 'quick call')} here · ${inputDue.length} for the chat${awaiting ? ` · ${plural(awaiting, 'line')} awaiting your accept` : ''}`} onOpen={() => toQueue('decision')} spark={<DotGrid on={Math.min(12, quickPending + inputDue.length)} />} />
        </StaggerItem>
        <StaggerItem>
          <Tile className="h-full" icon={<Hammer />} title="Streams building" value={<CountUp value={streamsUsed} />} unit={`of ${streams.length || 5}`} caption={`${named} of ${streams.length || 5} engineers named; ${plural(building.length, 'row')} in Building or Shipped`} onOpen={() => go('board', null)} spark={<DotGrid on={streamsUsed} total={streams.length || 5} cols={5} />} />
        </StaggerItem>
        {!hidden('flags') && (
        <StaggerItem>
          <Tile
            className="h-full"
            icon={<TriangleAlert />}
            title="Alerts"
            tone="ink"
            value={<CountUp value={alerts.length} />}
            unit={`${warns.length} warnings`}
            caption={alerts[0] ? `${alerts[0].ruleId}: ${alerts[0].rule}` : 'No rule at alert level today'}
            onOpen={() => toQueue('all')}
            spark={alerts[0]?.ideaId ? <Badge className="rounded-full bg-[var(--kit-decision)] text-white">{alerts[0].ideaId}</Badge> : undefined}
          />
        </StaggerItem>
        )}
      </Stagger>

      {/* The one exhibit: the pipeline */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring.soft, delay: 0.25 }}>
        <Surface>
          <SectionHead
            title="Where the lab stands"
            caption="Each chip is one register row, in its stage, left to right through the lifecycle; the ring marks the row that most needs you. Graduated rows have left the lab for projects of their own."
            actions={
              <Button size="sm" variant="outline" className="rounded-full" onClick={() => go('register', null)}>
                View as table
              </Button>
            }
          />
          <div className="mt-5 grid items-end gap-6 @min-[900px]:grid-cols-[200px_1fr]">
            <div>
              <div className="kit-display text-[88px] @min-[640px]:text-[96px]">
                <CountUp value={live.length} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                live rows{dwell != null ? ` · median ${dwell} days in stage` : ''}
                {counts.Parked + counts.Killed > 0 ? ` · ${counts.Parked} parked, ${counts.Killed} killed` : ''}
              </div>
            </div>
            <Pipeline ideas={visibleIdeas} leadId={lead?.id ?? null} fun={fun} />
          </div>
        </Surface>
      </motion.div>

      {/* Decide */}
      <Surface>
        <SectionHead
          title="Needs you"
          count={quickOpen.length + inputDue.length + requests.filter((r) => r.status === 'waiting').length}
          caption="Quick calls are recorded here and applied by Claude at the next lab chat or the morning pickup, then synced to GitHub. Anything that needs your input goes to a chat; Jarvis can prepare it."
        />
        <div className="mt-4 space-y-2">
          {quickOpen.length === 0 && inputDue.length === 0 && requests.length === 0 && <EmptyNote>Nothing waits on you. The next decision will appear here the moment a session records one.</EmptyNote>}
          {quickOpen.map(({ idea, item }) => (
            <DueCard key={item.id} idea={idea} item={item} showIdea />
          ))}
          {inputDue.map(({ idea, item }) => (
            <DueCard key={item.id} idea={idea} item={item} showIdea />
          ))}
          {requests.length > 0 && (
            <div className="lab-row px-4 py-3.5">
              <div className="kit-caption">Requests you queued for the next lab chat</div>
              <ul className="mt-2 space-y-2">
                {requests.map((r) => (
                  <li key={r.itemId} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <Status tone={r.status === 'waiting' ? 'info' : r.status === 'applied' ? 'good' : 'warning'} word={r.status === 'waiting' ? 'Queued' : r.status === 'applied' ? 'Handled' : 'Raised in the chat'} />
                    <span className="min-w-0 flex-1">
                      {r.ideaId && <span className="font-medium">{r.ideaId}: </span>}
                      {r.itemText}
                    </span>
                    {r.status === 'waiting' && inbox.canWrite && (
                      <Button size="xs" variant="ghost" className="rounded-full" onClick={() => inbox.withdraw(r.itemId)}>
                        Withdraw
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {awaiting > 0 && (
            <button type="button" onClick={toPending} className="lab-row flex w-full flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-3 text-left text-sm transition-transform active:scale-[0.99]">
              <Status tone="neutral" word="Awaiting your accept" />
              <span className="min-w-[12rem] flex-1 text-muted-foreground">{plural(awaiting, 'decision line')} the thinking partner proposed; accept or amend them in a chat.</span>
              <span className="kit-num shrink-0 text-xs">Open the Log</span>
            </button>
          )}
          {inbox.error && <p className="text-sm text-[var(--lab-crit)]">{inbox.error}</p>}
        </div>
      </Surface>

      {/* Act */}
      <div className="grid gap-4 @min-[1150px]:grid-cols-[1.45fr_1fr]">
        <Surface>
          <SectionHead title="Streams" caption="Five streams, one engineer plus a coding agent each (played by Claude until the company version). A row starts Building only with an owner role, a stream, an appetite in engineer-weeks and a weekly review slot Jithin commits to (D-152); Building never outnumbers his review slots. The bar is the appetite used." />
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 @min-[1400px]:grid-cols-3">
            {streams.map((st) => (
              <StreamCard key={st.id} id={st.id} name={st.name} owner={st.owner ?? null} focus={st.focus} rows={visibleIdeas.filter((i) => i.streamId === st.id)} />
            ))}
          </div>
          {reg.phases && reg.phases.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {reg.phases.map((ph) => (
                <div key={ph.name} className="lab-row min-w-[180px] flex-1 px-3.5 py-2.5" title={`Gate: ${ph.gate}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{ph.name}</span>
                    <Status tone={ph.status === 'active' ? 'info' : ph.status === 'passed' ? 'good' : ph.status === 'failed' ? 'critical' : 'neutral'} word={ph.status ?? 'planned'} />
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Weeks {ph.weeks}</div>
                </div>
              ))}
            </div>
          )}
        </Surface>

        <Surface>
          <SectionHead title="Due this week" count={steps.length + reviews.length} caption="Next steps and decision reviews due within seven days, overdue first." />
          <div className="mt-4 space-y-2">
            {steps.length + reviews.length === 0 && <EmptyNote>Nothing falls due this week.</EmptyNote>}
            {steps.map((s) => (
              <button key={s.ideaId} type="button" onClick={() => select(s.ideaId)} className="lab-row block w-full px-4 py-3 text-left transition-transform active:scale-[0.99]">
                <div className="flex items-center gap-3">
                  <Status tone={s.daysLeft! < 0 ? 'critical' : s.daysLeft! <= 2 ? 'warning' : 'neutral'} word={whenText(s.due!, now)} />
                  <span className="kit-num text-xs font-medium">{s.ideaId}</span>
                  {s.origin?.id && <span className="ml-auto text-[11px] text-muted-foreground">from {s.origin.id}</span>}
                </div>
                <p className="mt-1.5 line-clamp-2 text-sm">{s.step}</p>
              </button>
            ))}
            {reviews.map((d) => (
              <button key={d.id ?? d.decision} type="button" onClick={() => select(d.ideaId)} className="lab-row block w-full px-4 py-3 text-left">
                <div className="flex items-center gap-3">
                  <Status tone={d.reviewDays! < 0 ? 'critical' : 'warning'} word={d.reviewDays! < 0 ? `Review ${-d.reviewDays!} days overdue` : `Review in ${d.reviewDays} days`} />
                  <span className="kit-num text-xs font-medium">{d.ideaId}</span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-sm">
                  {d.id}: {d.decision}
                </p>
              </button>
            ))}
          </div>
        </Surface>
      </div>

      {/* Trace */}
      <div className="grid gap-4 @min-[1150px]:grid-cols-2">
        {!hidden('decisions') && (
        <Surface>
          <SectionHead
            title={lastVisit ? 'Since your last visit' : 'Latest decisions'}
            caption={lastVisit ? `Decisions logged since ${fmtDate(lastVisit)}, newest first.` : 'The most recent lines in the decision log.'}
            count={since.length}
            actions={
              <Button size="sm" variant="outline" className="rounded-full" onClick={() => go('changes', null)}>
                All changes
              </Button>
            }
          />
          <ol className="mt-4 space-y-2">
            {since.length === 0 && <EmptyNote>No decision since then.</EmptyNote>}
            {since
              .slice()
              .reverse()
              .slice(0, 7)
              .map((x, i) => (
                <li key={x.id ?? i} className="lab-row px-4 py-3">
                  <div className="flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
                    <span className="kit-num">{fmtDate(x.date)}</span>
                    {x.id && <span className="kit-num">{x.id}</span>}
                    <IdLink id={x.ideaId} onOpen={select} className="text-xs" />
                    {x.type === 'rejection' && <Status tone="critical" word="Rejection" />}
                  </div>
                  <p className={cn('mt-1 line-clamp-2 text-sm', x.status === 'superseded' && 'text-muted-foreground line-through')}>{x.decision}</p>
                </li>
              ))}
          </ol>
        </Surface>
        )}

        {!hidden('flags') && (
        <Surface>
          <SectionHead title="Health and alerts" caption="Health is the thinking partner's call at the end of each session; alerts come from the register's rule table (R-01 to R-18)." />
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { n: hc.on, tone: 'good' as const, word: 'On track' },
              { n: hc.risk, tone: 'warning' as const, word: 'At risk' },
              { n: hc.off, tone: 'critical' as const, word: 'Off track' },
              { n: hc.missing, tone: 'warning' as const, word: 'Update missing' },
            ].map((h) => (
              <div key={h.word} className="lab-row px-3.5 pt-3 pb-2.5">
                <div className="kit-display text-[30px]">
                  <CountUp value={h.n} />
                </div>
                <div className="mt-1">
                  <Status tone={h.tone} word={h.word} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            {hits.length === 0 && <EmptyNote>No rule fires today.</EmptyNote>}
            {[...alerts, ...warns].slice(0, 7).map((a, i) => (
              <button key={i} type="button" onClick={() => (a.ideaId ? select(a.ideaId) : undefined)} className="lab-row flex w-full items-start gap-3 px-3.5 py-2.5 text-left">
                <span className="mt-px shrink-0">
                  <Status tone={a.level === 'alert' ? 'critical' : 'warning'} word={a.ruleId} />
                </span>
                <span className="text-sm leading-snug">{a.text}</span>
              </button>
            ))}
            {hits.length > 7 && (
              <Button size="sm" variant="ghost" className="rounded-full" onClick={() => toQueue('all')}>
                {hits.length - 7} more in the queue
              </Button>
            )}
          </div>
          {reg.rules && reg.rules.length > 0 && (
            <Fold className="mt-3" title="Rule table" aside={`${reg.rules.length} rules`}>
              <div className="space-y-2">
                {reg.rules.map((r) => (
                  <div key={r.id} className="grid grid-cols-[48px_1fr] gap-3 text-sm">
                    <span className="kit-num text-xs text-muted-foreground">{r.id}</span>
                    <span>
                      {r.name}
                      <span className="block text-xs text-muted-foreground">
                        {r.stages?.join(', ') ?? 'all stages'} · warn {r.warnDays != null ? `${r.warnDays} d` : '—'} · alert {r.alertDays != null ? (r.alertDays === 0 ? 'on event' : `${r.alertDays} d`) : '—'}
                        {r.note ? ` · ${r.note}` : ''}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Fold>
          )}
        </Surface>
        )}
      </div>

      {reg.portfolio && !hidden('portfolio') && (
        <Surface>
          <SectionHead
            title={`Portfolio (${reg.portfolio.status})`}
            caption={`Set ${fmtDate(reg.portfolio.asOf)}. ${reg.portfolioBar != null ? `Portfolio bar ${reg.portfolioBar} in force; ` : ''}weights for the quarter on the Scores view.`}
            actions={
              <Button size="sm" variant="outline" className="rounded-full" onClick={() => go('scores', null)}>
                Scores
              </Button>
            }
          />
          <div className="mt-4 grid gap-2.5 @min-[640px]:grid-cols-3">
            {(
              [
                ['Now', reg.portfolio.now],
                ['Next', reg.portfolio.next],
                ['Later', reg.portfolio.later],
              ] as [string, string[] | undefined][]
            ).map(([label, ids]) => (
              <div key={label} className="lab-row px-4 py-3.5">
                <div className="kit-caption">{label}</div>
                <div className="mt-2 flex flex-col gap-1.5">
                  {(ids ?? []).length === 0 && <span className="text-sm text-muted-foreground">none</span>}
                  {(ids ?? []).map((id) => {
                    const i = reg.ideas.find((x) => x.id === id);
                    return (
                      <button key={id} type="button" onClick={() => select(id)} className="flex items-center gap-2 text-left text-sm hover:underline">
                        <span className="kit-num text-xs text-muted-foreground">{id}</span>
                        <span className="min-w-0 flex-1 truncate">{i?.slug ?? ''}</span>
                        {i && <StageTag stage={i.stage} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {reg.portfolio.digest && <p className="mt-3 text-sm text-muted-foreground">{reg.portfolio.digest}</p>}
          <div className="mt-3 space-y-2">
            {(reg.portfolio.spine || reg.portfolio.diagnosis) && (
              <Fold title="ThinkLatent strategy spine" aside="draft">
                <dl className="space-y-3 text-sm">
                  {(
                    [
                      ['Diagnosis', reg.portfolio.diagnosis],
                      ['Winning aspiration', reg.portfolio.spine?.winningAspiration],
                      ['Where to play', reg.portfolio.spine?.whereToPlay],
                      ['How to win', reg.portfolio.spine?.howToWin],
                      ['Capabilities required', reg.portfolio.spine?.capabilitiesRequired],
                      ['Management systems', reg.portfolio.spine?.managementSystems],
                    ] as [string, string | undefined][]
                  )
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k}>
                        <dt className="kit-caption">{k}</dt>
                        <dd className="mt-0.5">{v}</dd>
                      </div>
                    ))}
                </dl>
              </Fold>
            )}
            {reg.portfolio.horizonMixNote && (
              <Fold title="Horizon mix">
                <p className="text-sm">{reg.portfolio.horizonMixNote}</p>
              </Fold>
            )}
            {reg.portfolio.redTeam && reg.portfolio.redTeam.length > 0 && (
              <Fold title="Red-team roster" aside={reg.portfolio.redTeam.every((r) => !r.person) ? 'roles proposed, nobody named' : 'named'}>
                <div className="space-y-2.5 text-sm">
                  {reg.portfolio.redTeam.map((r, i) => (
                    <div key={i}>
                      <span className="font-medium">{r.role}</span> <span className="text-muted-foreground">attacks {r.attacks}</span>
                      <span className="block text-xs text-muted-foreground">{r.person ?? 'nobody named yet'}</span>
                    </div>
                  ))}
                </div>
              </Fold>
            )}
            {reg.themes.length > 0 && (
              <Fold title="Themes" aside={`${reg.themes.length} set`}>
                <div className="space-y-2 text-sm">
                  {reg.themes.map((t) => (
                    <div key={t.id} className="flex flex-wrap items-baseline gap-x-2">
                      <IdLink id={t.id} onOpen={select}>{`${t.id} ${t.name}`}</IdLink>
                      <span className="text-xs text-muted-foreground">{plural(visibleIdeas.filter((i) => i.themeIds.includes(t.id)).length, 'row')}</span>
                    </div>
                  ))}
                </div>
              </Fold>
            )}
          </div>
        </Surface>
      )}

      <p className="px-1 text-xs text-muted-foreground">
        Source: the register (rev {reg.source.registerRev}, as of {fmtDateTime(reg.asOf)}), synced from thinklatent-labs/idea-lab.
      </p>
    </div>
  );
}

/** The lifecycle as columns; rows as chips that spring into their stage. */
function Pipeline({ ideas, leadId, fun }: { ideas: Idea[]; leadId: string | null; fun: ReturnType<typeof funnel> }) {
  const { select, derived } = useLab();
  const off = ideas.filter((i) => i.stage === 'Parked' || i.stage === 'Killed');
  return (
    <div className="min-w-0">
      <div className="lab-noscroll -mx-1 overflow-x-auto px-1 pb-1">
        <div className="grid min-w-[760px] grid-cols-7 gap-2">
          {PIPE.map((stage, col) => {
            const rows = ideas.filter((i) => i.stage === stage).sort((a, b) => (derived.get(b.id)!.attention ?? 0) - (derived.get(a.id)!.attention ?? 0));
            const f = fun.find((x) => x.stage === stage);
            return (
              <div key={stage} className="flex min-w-0 flex-col">
                <div className="mb-2 flex items-center gap-1.5 px-1">
                  <span className="lab-stage-dot" style={{ ['--lab-stage' as string]: STAGE_VAR[stage] }} />
                  <span className="truncate text-xs font-medium">{stage}</span>
                  <span className="kit-num ml-auto text-xs text-muted-foreground">{rows.length}</span>
                </div>
                <div className={cn('flex min-h-[132px] flex-1 flex-col gap-1.5 rounded-[18px] p-1.5', stage === 'Graduated' ? 'border border-dashed border-foreground/15' : 'bg-foreground/[0.035] dark:bg-white/[0.03]')}>
                  {rows.map((i, k) => {
                    const isLead = i.id === leadId;
                    return (
                      <motion.button
                        key={i.id}
                        type="button"
                        layoutId={`pipe-${i.id}`}
                        onClick={() => select(i.id)}
                        initial={{ opacity: 0, x: -18, scale: 0.92 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ ...spring.soft, delay: 0.3 + col * 0.06 + k * 0.04 }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        title={`${i.id} ${i.slug}: ${i.title}`}
                        className={cn('relative w-full rounded-[14px] border px-2.5 py-2 text-left', isLead ? 'border-[var(--kit-brand)] bg-background shadow-[0_0_0_3px_color-mix(in_oklab,var(--kit-brand)_35%,transparent)]' : 'border-[var(--lab-row-border)] bg-[var(--lab-row)]')}
                      >
                        {isLead && <span className="lab-ring-pulse absolute inset-0 rounded-[14px] border-2 border-[var(--kit-brand)]" aria-hidden="true" />}
                        <span className="kit-num block text-[10px] text-muted-foreground">{i.id}</span>
                        <span className="block truncate text-[13px] font-medium">{i.slug}</span>
                        {i.score.composite != null && <span className="kit-num block text-[10px] text-muted-foreground">{i.score.composite.toFixed(2)}</span>}
                      </motion.button>
                    );
                  })}
                </div>
                <div className="mt-1.5 px-1 text-[10px] leading-tight text-muted-foreground">{f && f.entered > 0 ? `${f.entered} entered${f.conversion != null ? ` · ${Math.round(f.conversion * 100)}% moved on` : ''}` : '—'}</div>
              </div>
            );
          })}
        </div>
      </div>
      {off.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          Off the line:
          {off.map((i) => (
            <button key={i.id} type="button" onClick={() => select(i.id)} className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-2.5 py-1 hover:bg-foreground/5">
              <StageTag stage={i.stage} /> {i.id} {i.slug}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StreamCard({ id, name, owner, focus, rows }: { id: string; name: string; owner: string | null; focus?: string; rows: Idea[] }) {
  const { select, now } = useLab();
  const active = rows.filter((i) => i.stage === 'Building' || i.stage === 'Shipped' || i.stage === 'Proposal');
  return (
    <div className="lab-row flex min-w-0 flex-col gap-2.5 px-4 py-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="kit-num text-xs text-muted-foreground">{id}</div>
          <div className="truncate text-sm font-medium">{name}</div>
        </div>
        {owner ? <Status tone="good" word={owner} /> : <Status tone="warning" word="Engineer to be named" />}
      </div>
      {focus && <p className="line-clamp-2 text-xs text-muted-foreground">{focus}</p>}
      {active.length === 0 ? (
        <span className="text-xs text-muted-foreground">No row assigned yet</span>
      ) : (
        active.map((i) => {
          const ap = appetiteState(i, now);
          const start = i.buildingGate?.startedOn ?? i.stageSince ?? null;
          const total = start && i.appetiteEnds ? Math.max(1, (Date.parse(i.appetiteEnds) - Date.parse(start)) / DAY) : null;
          const used = start ? Math.max(0, (now.getTime() - Date.parse(start)) / DAY) : null;
          const gate = buildingGate(i);
          return (
            <button key={i.id} type="button" onClick={() => select(i.id)} className="text-left">
              <div className="flex items-center gap-2 text-xs">
                <span className="kit-num font-medium">{i.id}</span>
                <span className="min-w-0 flex-1 truncate">{i.slug}</span>
                <StageTag stage={i.stage} />
              </div>
              {total != null && used != null ? (
                <div className="mt-1.5 text-foreground/70">
                  <Meter value={Math.min(used, total)} max={total} over={ap?.level === 'expired'} label={`${i.id} appetite used`} />
                  <div className="mt-1 text-[10px] text-muted-foreground">{ap ? (ap.level === 'expired' ? `appetite expired ${-ap.daysLeft} days ago` : `${ap.daysLeft} days of appetite left`) : ''}{i.appetiteWeeks != null ? ` · ${i.appetiteWeeks} engineer-weeks` : ''}</div>
                </div>
              ) : (
                <div className="mt-1 text-[10px] text-muted-foreground">{gate.passed ? 'appetite dates not recorded' : `gate missing ${gate.missing.join(', ')}`}</div>
              )}
            </button>
          );
        })
      )}
    </div>
  );
}

