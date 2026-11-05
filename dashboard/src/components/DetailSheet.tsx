import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useDragControls } from 'motion/react';
import { ArrowUpRight, MessageSquareText, X } from 'lucide-react';
import { Status, type StatusTone } from '@vi/kit';
import { Badge } from '@vi/ui/components/badge';
import { Button } from '@vi/ui/components/button';
import { cn } from '@vi/ui/lib/utils';
import { useLab } from '../lib/context';
import { CRITERIA, dueItems, type Idea } from '../lib/types';
import { MODES, defaultMode, readiness, relatedIdeas, sessionLine, capabilityPriority, type Mode } from '../lib/derive';
import { canonicalId } from '../lib/graph';
import { healthOf, updateState, appetiteState, buildingGate } from '../lib/derive2';
import { RUBRIC, LINK_MEANING } from '../lib/rubric';
import { fmtDate, relDays } from '../lib/format';
import DueCard from './DueCard';
import { Block, CopyLine, Dash, EmptyNote, FactList, Fold, HealthTag, IdLink, ReasonTags, Segmented, StageTag } from '../vi/parts';
import { CountUp, spring } from '../vi/motion';
import { useJarvis } from '../jarvis/useJarvis';

function useWide(px: number) {
  const [w, setW] = useState(() => window.matchMedia(`(min-width: ${px}px)`).matches);
  useEffect(() => {
    const m = window.matchMedia(`(min-width: ${px}px)`);
    const on = () => setW(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [px]);
  return w;
}

/** The record of one row, capability or theme: a glass sheet that springs in from the right (a bottom sheet you can
 *  drag down on a phone). Opaque when Jarvis is open beside it, so only one glass layer shows at a time. */
export default function DetailSheet({ id, onClose, opaque, rightInset = 0 }: { id: string | null; onClose: () => void; opaque: boolean; rightInset?: number }) {
  const wide = useWide(768);
  const drag = useDragControls();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!id) return;
    if (!returnTo.current) returnTo.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [id, onClose]);
  useEffect(() => {
    if (id) return;
    returnTo.current?.focus?.({ preventScroll: true });
    returnTo.current = null;
  }, [id]);

  // Portalled to the body so the sheet sits above the shell's top bar and dock, whatever stacking they create.
  return createPortal(
    <AnimatePresence>
      {id && (
        <>
          <motion.div key="scrim" className="fixed inset-0 z-40 bg-black/15 dark:bg-black/55" style={{ right: wide ? rightInset : 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={onClose} />
          <motion.aside
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={`Record ${id}`}
            className={cn(
              'fixed z-50 flex flex-col overflow-hidden',
              wide ? 'top-2 bottom-2 rounded-[28px]' : 'inset-x-0 bottom-0 h-[92dvh] rounded-t-[28px]',
              opaque ? 'border border-border bg-[var(--vi-role-light-tint)] shadow-2xl dark:bg-[var(--vi-neutral-900)]' : 'vi-glass-overlay',
            )}
            style={wide ? { right: 8 + rightInset, width: `min(620px, calc(100vw - ${16 + rightInset + 96}px))` } : undefined}
            initial={wide ? { x: '104%' } : { y: '100%' }}
            animate={wide ? { x: 0 } : { y: 0 }}
            exit={wide ? { x: '104%' } : { y: '100%' }}
            transition={spring.sheet}
            drag={wide ? false : 'y'}
            dragListener={false}
            dragControls={drag}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
          >
            {!wide && (
              <div className="flex cursor-grab justify-center pt-2.5 pb-1 active:cursor-grabbing" onPointerDown={(e) => drag.start(e)} style={{ touchAction: 'none' }}>
                <span className="h-1.5 w-10 rounded-full bg-foreground/25" />
              </div>
            )}
            <div className="flex items-center justify-between px-5 pt-3">
              <span className="vi-caption">{id.startsWith('CAP-') ? 'Capability' : id.startsWith('T-') ? 'Theme' : 'Register row'}</span>
              <Button ref={closeRef} variant="ghost" size="icon-sm" className="rounded-full" aria-label="Close" onClick={onClose}>
                <X />
              </Button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-1 pb-8">
              <Record id={id} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Record({ id }: { id: string }) {
  const { reg } = useLab();
  if (id.startsWith('CAP-')) return <CapabilityDetail id={id} />;
  if (id.startsWith('T-')) return <ThemeDetail id={id} />;
  const idea = reg.ideas.find((i) => i.id === id);
  if (!idea) return <EmptyNote>No row {id} in the register.</EmptyNote>;
  return <IdeaDetail key={idea.id} idea={idea} />;
}

function nameOf(reg: ReturnType<typeof useLab>['reg'], id: string | null, label: string): string {
  if (!id) return label;
  const i = reg.ideas.find((x) => x.id === id);
  if (i) return `${i.id} ${i.slug}`;
  const c = reg.capabilities.find((x) => x.id === id);
  if (c) return c.name;
  const t = reg.themes.find((x) => x.id === id);
  if (t) return `${t.id} ${t.name.split(':')[0]}`;
  return label;
}

/** Up to four facts across the top of a record, each with its caption. */
function MiniKpis({ items }: { items: { label: string; value: ReactNode; caption: ReactNode }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map((k) => (
        <div key={k.label} className="lab-row min-w-0 px-3.5 pt-3 pb-2.5">
          <div className="vi-caption truncate">{k.label}</div>
          <div className="vi-display mt-1.5 truncate text-[28px]">{k.value}</div>
          <div className="mt-1 truncate text-[11px] text-muted-foreground">{k.caption}</div>
        </div>
      ))}
    </div>
  );
}

function Check({ met, label, detail }: { met: boolean; label: string; detail: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5">
        <Status tone={met ? 'good' : 'warning'} word={met ? 'Met' : 'Missing'} />
      </span>
      <span className="min-w-0 text-sm">
        {label} <span className="text-muted-foreground">— {detail}</span>
      </span>
    </li>
  );
}

function IdeaDetail({ idea }: { idea: Idea }) {
  const { reg, derived, now, select, lastVisit, hidden, inbox } = useLab();
  const jarvis = useJarvis();
  const d = derived.get(idea.id)!;
  const health = healthOf(reg, idea.id);
  const upd = updateState(reg, idea, now);
  const appetite = appetiteState(idea, now);
  const active = idea.stage !== 'Graduated' && idea.stage !== 'Killed';
  const mentions = (reg.mentions ?? []).filter((m) => m.ideaId === idea.id);
  const stepDue = idea.nextStepDue ? Math.floor((Date.parse(`${idea.nextStepDue}T00:00:00Z`) - now.getTime()) / 86_400_000) : null;
  const gate = buildingGate(idea);
  const stream = idea.streamId ? (reg.streams ?? []).find((st) => st.id === idea.streamId) : null;
  const rejection = idea.rejectedBy ? reg.decisions.find((x) => x.id === idea.rejectedBy) : null;
  const showGate = idea.type !== 'Capability' && (idea.stage === 'Proposal' || idea.stage === 'Building' || idea.stage === 'Stress test');
  const [mode, setMode] = useState<Mode>(defaultMode(idea.stage));
  const parent = idea.parentId ? reg.ideas.find((i) => i.id === idea.parentId) : null;
  const children = reg.ideas.filter((i) => i.parentId === idea.id);
  const out = reg.links.filter((l) => l.fromId === idea.id);
  const inbound = reg.links.filter((l) => canonicalId(reg, l.toId) === idea.id);
  const related = relatedIdeas(reg, idea.id);
  const decisions = reg.decisions.filter((x) => x.ideaId === idea.id).slice().reverse();
  const sessions = reg.sessions.filter((s) => (s.ideaIds ?? []).includes(idea.id)).slice().reverse();
  const gates = readiness(idea, reg);
  const isNew = !!lastVisit && idea.lastTouched > lastVisit;
  const asCapability = idea.capabilityId ? reg.capabilities.find((c) => c.id === idea.capabilityId) : null;
  const blockingFirst = [...(idea.openQuestions ?? [])].sort((a, b) => Number(/^yes/i.test(b.blocking)) - Number(/^yes/i.test(a.blocking)));
  const due = dueItems(idea);

  return (
    <div className="space-y-7">
      {/* Orient */}
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="vi-num font-medium text-foreground">{idea.id}</span>
          <span>{idea.slug}</span>
          <Badge variant="outline" className="rounded-full">
            {idea.type}
          </Badge>
          {idea.horizon && (
            <Badge variant="outline" className="rounded-full">
              {idea.horizon}
            </Badge>
          )}
          {isNew && <Status tone="info" word="Changed since your last visit" />}
        </div>
        <h2 className="mt-2 text-[24px] leading-tight font-normal tracking-tight">{idea.title}</h2>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <StageTag stage={idea.stage} note={idea.stageNote} />
          {active && <HealthTag health={health?.health} missing={upd.level === 'warn' || upd.level === 'alert'} />}
          {appetite && <Status tone={appetite.level === 'expired' ? 'critical' : appetite.level === 'warn' ? 'warning' : 'neutral'} word={appetite.level === 'expired' ? `Appetite expired ${-appetite.daysLeft} days ago` : `Appetite: ${appetite.daysLeft} days left`} />}
        </div>
        {idea.stageNote && <p className="mt-2 text-sm text-muted-foreground">{idea.stageNote}</p>}
        {health?.note && <p className="mt-1 text-sm text-muted-foreground">Health note ({fmtDate(health.date)}): {health.note}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button className="rounded-full" onClick={() => jarvis.ask(`Brief me on ${idea.id} ${idea.slug}: where it stands, what is thin, and the next move.`)}>
            <MessageSquareText /> Ask Jarvis about this
          </Button>
          {idea.docUrl && (
            <Button variant="outline" className="rounded-full" nativeButton={false} render={<a href={idea.docUrl} target="_blank" rel="noreferrer" />}>
              <ArrowUpRight /> {idea.docTitle ? 'Idea card' : 'Open the doc'}
            </Button>
          )}
        </div>
      </div>

      <MiniKpis
        items={[
          { label: 'In stage', value: d.daysInStage != null ? <CountUp value={d.daysInStage} /> : '—', caption: d.daysInStage != null ? `days since ${fmtDate(idea.stageSince!)}` : 'stage date not recorded' },
          { label: 'Score', value: idea.score.composite != null ? <CountUp value={idea.score.composite} decimals={2} /> : '—', caption: idea.score.composite != null ? `${idea.score.status}${reg.portfolioBar != null ? `; bar ${reg.portfolioBar}` : ''}` : 'not scored yet' },
          { label: 'Next step', value: stepDue != null ? <CountUp value={Math.abs(stepDue)} /> : '—', caption: stepDue == null ? 'no due date' : stepDue < 0 ? 'days overdue' : stepDue === 0 ? 'due today' : 'days left' },
          { label: 'Touched', value: <CountUp value={d.daysUntouched} />, caption: `days ago${d.window != null ? `; window ${d.window}` : ''}` },
        ]}
      />

      {/* Judge */}
      {d.reasons.length > 0 && (
        <Block title="Why it needs attention" caption="Derived from the register by the dashboard's rules; strongest first.">
          <ReasonTags reasons={d.reasons} max={8} />
        </Block>
      )}

      {/* Decide */}
      {(due.length > 0 || idea.score.status === 'proposed') && (
        <Block title="Needs your decision" count={due.length || undefined} caption="A quick call is recorded here and applied by Claude at the next lab chat or the morning pickup.">
          {idea.score.status === 'proposed' && !due.some((x) => /score|rubric/i.test(x.text)) && (
            <EmptyNote>
              Set the rubric composite ({idea.score.composite} proposed{idea.score.date ? ` on ${fmtDate(idea.score.date)}` : ''}).
            </EmptyNote>
          )}
          <div className="space-y-2">
            {due.map((item) => (
              <DueCard key={item.id} idea={idea} item={item} />
            ))}
          </div>
          {inbox.error && <p className="text-sm text-[var(--lab-crit)]">{inbox.error}</p>}
        </Block>
      )}

      {rejection && (
        <Block title="Rejected by Jithin">
          <p className="text-sm">
            {rejection.id} on {fmtDate(rejection.date)}: {rejection.decision}
          </p>
        </Block>
      )}

      {/* Act */}
      <Block title="Next step" caption={idea.nextStepDue ? `Due ${fmtDate(idea.nextStepDue)}${idea.nextStepOrigin ? `; set by ${idea.nextStepOrigin}` : ''}` : 'No due date recorded'}>
        <div className="lab-row px-4 py-3.5">
          <p className="text-sm leading-relaxed">{idea.nextStep}</p>
          {stepDue != null && (
            <div className="mt-2">
              <Status tone={stepDue < 0 ? 'critical' : stepDue <= 7 ? 'warning' : 'neutral'} word={stepDue < 0 ? `${-stepDue} days overdue` : stepDue === 0 ? 'Due today' : `${stepDue} days left`} />
            </div>
          )}
        </div>
      </Block>

      <Block title="Open a session" caption="Paste the line into a new chat in the Idea Lab project; the chat reads the row back before it acts.">
        <Segmented id={`mode-${idea.id}`} size="sm" options={MODES.map((m) => ({ value: m, label: m }))} value={mode} onChange={setMode} />
        <CopyLine text={sessionLine(idea, mode)} label="Copy session line" />
      </Block>

      {showGate && (
        <Block title="Building gate" caption={gate.passed ? (idea.stage === 'Building' ? 'Passed; building.' : 'Passed; it can start.') : idea.stage === 'Proposal' ? 'Funded by default at Proposal; it starts Building when all three are present.' : "VAI's rule, generalised: unnamed, not started."}>
          <ul className="lab-row space-y-2.5 px-4 py-3.5">
            <Check met={gate.ownerNamed} label="An owner who is not Jithin" detail={idea.owner} />
            <Check met={gate.streamNamed} label="A stream" detail={stream ? `${stream.id} ${stream.name}${stream.owner ? `, ${stream.owner}` : ', engineer to be named'}` : 'none'} />
            <Check met={gate.appetiteSet} label="An appetite in engineer-weeks" detail={idea.appetiteWeeks != null ? `${idea.appetiteWeeks} engineer-weeks${idea.appetiteEnds ? `, ends ${fmtDate(idea.appetiteEnds)}` : ''}` : (idea.appetite ?? 'not set')} />
          </ul>
        </Block>
      )}

      {idea.type !== 'Capability' && (
        <Block title="Production surface" caption={idea.productionSurface ? 'Where it lives once shipped, and the number that moves.' : undefined}>
          {idea.productionSurface ? (
            <FactList
              items={[
                ['Who uses it', idea.productionSurface.users || <Dash reason="not recorded" />],
                ['Where it lives', idea.productionSurface.system || <Dash reason="not recorded" />],
                ['The number that moves', idea.productionSurface.metric || <Dash reason="not recorded" />],
              ]}
            />
          ) : (
            <EmptyNote>Not named at Shaping. Until it is, this row counts as an H3 experiment, not a product.</EmptyNote>
          )}
        </Block>
      )}

      {!hidden('rubric') && (
        <Block title="Rubric" caption={idea.score.date ? `Scored ${fmtDate(idea.score.date)}. Hover a criterion for what a 5 and a 1 mean.` : 'Scored at Stress test or later.'}>
          {idea.score.composite == null ? (
            <EmptyNote>{idea.score.note ?? 'Not scored yet.'}</EmptyNote>
          ) : (
            <div className="lab-row px-4 py-4">
              <div className="flex items-end gap-3">
                <div className="vi-display text-[52px]">
                  <CountUp value={idea.score.composite} decimals={2} />
                </div>
                <div className="pb-1.5 text-xs text-muted-foreground">
                  {idea.score.status}
                  {d.compositeProposed != null && reg.proposedWeights ? `; ${d.compositeProposed.toFixed(2)} on the proposed weights` : ''}
                  {reg.portfolioBar != null ? `; portfolio bar ${reg.portfolioBar}` : ''}
                </div>
              </div>
              {idea.score.note && <p className="mt-2 text-xs text-muted-foreground">{idea.score.note}</p>}
              {idea.score.criteria && (
                <div className="mt-4 space-y-2.5">
                  {CRITERIA.map((c, k) => {
                    const v = idea.score.criteria?.[c];
                    if (v == null) return null;
                    return (
                      <div key={c} className="grid grid-cols-[minmax(0,150px)_1fr_28px] items-center gap-3" title={`${RUBRIC[c].name}: a 5 is “${RUBRIC[c].five}”; a 1 is “${RUBRIC[c].one}”`}>
                        <span className="truncate text-xs">{RUBRIC[c].name}</span>
                        <span className="lab-track h-1.5 overflow-hidden rounded-full">
                          <motion.span className="block h-full rounded-full bg-foreground" initial={{ width: 0 }} animate={{ width: `${(v / 5) * 100}%` }} transition={{ ...spring.soft, delay: 0.05 * k }} />
                        </span>
                        <span className="vi-num text-right text-xs">{v}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </Block>
      )}

      {idea.type !== 'Capability' && (
        <Block title="Graduation gates" caption={`${gates.filter((g) => g.met).length} of ${gates.length} met. A row leaves the lab with a commented proposal, an owner, Jithin's decision and a project of its own.`}>
          <ul className="lab-row space-y-2.5 px-4 py-3.5">
            {gates.map((g) => (
              <Check key={g.label} met={g.met} label={g.label} detail={g.detail} />
            ))}
          </ul>
        </Block>
      )}

      {/* Trace */}
      <Block title="Lab record">
        <FactList
          items={[
            ['Owner', idea.owner],
            ['Parent', parent ? <IdLink id={parent.id} onOpen={select}>{`${parent.id} ${parent.slug}`}</IdLink> : <Dash reason="not applicable" />],
            ...(children.length
              ? ([
                  [
                    'Features',
                    <span className="flex flex-wrap gap-x-3 gap-y-1">
                      {children.map((c) => (
                        <IdLink key={c.id} id={c.id} onOpen={select}>{`${c.id} ${c.slug}`}</IdLink>
                      ))}
                    </span>,
                  ],
                ] as [ReactNode, ReactNode][])
              : []),
            ['Theme', idea.themeIds.length ? idea.themeIds.map((t) => nameOf(reg, t, t)).join(', ') : 'none'],
            ['Stream and appetite', `${stream ? `${stream.id} ${stream.name}` : 'no stream'}; ${idea.appetiteWeeks != null ? `${idea.appetiteWeeks} engineer-weeks${idea.appetite ? ` (${idea.appetite})` : ''}` : (idea.appetite ?? 'appetite not set')}`],
            [
              'Governance',
              idea.governance ? (
                <>
                  {idea.governance.status ?? 'not started'}
                  {idea.governance.review ? `: ${idea.governance.review}` : ''}
                  {idea.governance.owner ? ` (${idea.governance.owner})` : ''}
                  {idea.governance.expectedWeeks != null && idea.governance.expectedWeeks > 0 ? `, about ${idea.governance.expectedWeeks} weeks` : ''}
                  {idea.governance.criticalPath && <Status tone="warning" word="Critical path" className="ml-2" />}
                </>
              ) : (
                'not recorded; handled by a separate team'
              ),
            ],
            ['Doc', idea.docUrl ? <a className="underline decoration-foreground/30 underline-offset-4" href={idea.docUrl} target="_blank" rel="noreferrer">{idea.docTitle ?? 'Open the doc'}</a> : (idea.docTitle ?? 'none')],
            ['Last touched', `${fmtDate(idea.lastTouched)} (${relDays(d.daysUntouched)})${d.window != null ? `; staleness window ${d.window} days` : ''}`],
            ['Standard, critique, sensitivity', `${idea.standardVersion ?? '—'}${idea.standardVersion && idea.standardVersion !== reg.standardVersion ? ` (current ${reg.standardVersion})` : ''}; critique ${idea.critiqueRecorded === true ? 'recorded' : idea.critiqueRecorded === false ? 'not yet' : 'not recorded'}; ${idea.sensitivity === 'flagged' ? 'flagged' : 'not sensitive'}`],
            ...((idea.priority ? [['Priority', idea.priority]] : []) as [ReactNode, ReactNode][]),
            ...((idea.graduatedTo ? [['Graduated to', idea.graduatedTo]] : []) as [ReactNode, ReactNode][]),
            ...((idea.recheckDate ? [['Re-check', fmtDate(idea.recheckDate)]] : []) as [ReactNode, ReactNode][]),
          ]}
        />
      </Block>

      {!hidden('links') && (
        <Block title="Links" count={out.length + inbound.length} caption="Typed links in and out; hover a type for its meaning.">
          {out.length + inbound.length === 0 ? (
            <EmptyNote>No links recorded.</EmptyNote>
          ) : (
            <div className="space-y-1.5">
              {[...out.map((l) => ({ l, dir: 'out' as const })), ...inbound.map((l) => ({ l, dir: 'in' as const }))].map(({ l, dir }, i) => {
                const target = dir === 'out' ? canonicalId(reg, l.toId) : l.fromId;
                return (
                  <div key={i} className="lab-row flex flex-wrap items-baseline gap-x-2.5 gap-y-1 px-3.5 py-2.5 text-sm">
                    <span className="vi-caption shrink-0" title={LINK_MEANING[l.type]}>
                      {dir === 'in' ? '← ' : ''}
                      {l.type}
                    </span>
                    {target ? <IdLink id={target} onOpen={select}>{nameOf(reg, target, l.toLabel)}</IdLink> : <span>{l.toLabel}</span>}
                    {l.note && <span className="text-xs text-muted-foreground">{l.note}</span>}
                  </div>
                );
              })}
            </div>
          )}
          {d.blockedBy.length > 0 && <Status tone="warning" word={`Waits on ${d.blockedBy.join(', ')} before it can graduate`} />}
          {d.blocks.length > 0 && <Status tone="info" word={`${d.blocks.join(', ')} cannot graduate until this does`} />}
          {related.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Within two hops:{' '}
              {related.map((r, i) => (
                <span key={r}>
                  {i > 0 && ', '}
                  <IdLink id={r} onOpen={select} />
                </span>
              ))}
            </p>
          )}
          {mentions.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Mentioned in:{' '}
              {mentions.map((m, i) => (
                <span key={i}>
                  {i > 0 && '; '}
                  <IdLink id={m.inIdeaId} onOpen={select} /> “{m.snippet}”
                </span>
              ))}
            </p>
          )}
        </Block>
      )}

      {asCapability && (
        <Block title="As a catalogue capability">
          <FactList
            items={[
              ['Kind and maturity', `${asCapability.kind}; ${asCapability.maturity}`],
              ['Reused by', asCapability.reusedBy],
              ['Demand', `${asCapability.demand}${capabilityPriority(asCapability) ? ` (${capabilityPriority(asCapability)})` : ''}`],
            ]}
          />
        </Block>
      )}

      <div className="space-y-2">
        {blockingFirst.length > 0 && !hidden('openQuestions') && (
          <Fold title="Open questions" aside={`${blockingFirst.filter((q) => /^yes/i.test(q.blocking)).length} blocking`} defaultOpen={blockingFirst.some((q) => /^yes/i.test(q.blocking))}>
            <div className="space-y-3">
              {blockingFirst.map((q, i) => (
                <div key={i} className="text-sm">
                  <p>{q.question}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
                    <span>Owner: {q.owner}</span>
                    <Status tone={/^yes/i.test(q.blocking) ? 'warning' : 'neutral'} word={`Blocking: ${q.blocking}`} />
                  </div>
                </div>
              ))}
            </div>
          </Fold>
        )}

        {idea.hypotheses && idea.hypotheses.length > 0 && !hidden('hypotheses') && (
          <Fold title="Hypotheses" aside={`${idea.hypotheses.length} pre-registered; ${idea.hypotheses.filter((h) => h.result === 'confirmed' || h.result === 'refuted').length} resolved`}>
            <div className="space-y-4">
              {idea.hypotheses.map((h, i) => {
                const tone: StatusTone = h.result === 'confirmed' ? 'good' : h.result === 'refuted' ? 'critical' : 'neutral';
                return (
                  <div key={i} className="text-sm">
                    <p className="font-medium">{h.claim}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Measured by {h.measurement}</p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      <p className="text-xs">
                        <span className="vi-caption block">Confirmed if</span>
                        {h.confirmedIf}
                      </p>
                      <p className="text-xs">
                        <span className="vi-caption block">Refuted if</span>
                        {h.refutedIf}
                      </p>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <Status tone={tone} word={h.result ? `${h.result[0].toUpperCase()}${h.result.slice(1)}` : 'Open'} />
                      <span>Evidence: {h.evidence != null ? ['opinion', 'one experiment', 'repeated'][h.evidence] : 'not set'}</span>
                      <span>Confidence: {h.confidence != null ? `${h.confidence}%` : 'not set'}</span>
                      {h.resolveBy && <span>Resolve by {fmtDate(h.resolveBy)}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Fold>
        )}

        {idea.killSignals && idea.killSignals.length > 0 && !hidden('killCriteria') && (
          <Fold title="Kill signals" aside={`${idea.killSignals.filter((k) => k.status === 'open').length} open, ${idea.killSignals.filter((k) => k.by).length} dated`}>
            <div className="space-y-3">
              {idea.killSignals.map((k, i) => (
                <div key={i} className="text-sm">
                  <p>{k.signal}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
                    <Status tone={k.status === 'fired' || k.status === 'lapsed' ? 'critical' : k.status === 'cleared' ? 'good' : 'neutral'} word={k.status} />
                    <span>{k.by ? `By ${fmtDate(k.by)}` : 'No date'}</span>
                    {k.action && <span>Then: {k.action}</span>}
                  </div>
                </div>
              ))}
            </div>
          </Fold>
        )}

        {idea.killCriteria && idea.killCriteria.length > 0 && !hidden('killCriteria') && (!idea.killSignals || idea.killSignals.length === 0) && (
          <Fold title="Kill and park criteria" aside={`${idea.killCriteria.length}`}>
            <div className="space-y-3">
              {idea.killCriteria.map((k, i) => (
                <div key={i} className="text-sm">
                  <p>{k.criterion}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Checked: {k.checked}. Then: {k.action}
                  </p>
                </div>
              ))}
            </div>
          </Fold>
        )}

        {idea.phases && idea.phases.length > 0 && (
          <Fold title="Phasing" aside={`${idea.phases.length} phases`}>
            <ol className="space-y-3">
              {idea.phases.map((p, i) => (
                <li key={i} className="text-sm">
                  <span className="font-medium">{p.name}.</span> {p.summary}
                  {p.exitGate && <p className="mt-0.5 text-xs text-muted-foreground">Exit gate: {p.exitGate}</p>}
                </li>
              ))}
            </ol>
          </Fold>
        )}
      </div>

      {(idea.stage === 'Shipped' || idea.stage === 'Graduated' || idea.shipped) && idea.type !== 'Capability' && (
        <Block title="Shipped" caption={idea.shipped?.date ? `Shipped ${fmtDate(idea.shipped.date)}` : 'No Shipped line'}>
          {idea.shipped?.date ? (
            <FactList
              items={[
                ['First user', idea.shipped.firstUser || <Dash reason="not recorded" />],
                ['Metric read', idea.shipped.metricRead ? `${idea.shipped.metricRead}${idea.shipped.metricDate ? ` (${fmtDate(idea.shipped.metricDate)})` : ''}` : 'not read yet; the Shipped window is 30 days'],
              ]}
            />
          ) : (
            <EmptyNote>Graduated without a Shipped line. The retrospective asks whether anyone uses it.</EmptyNote>
          )}
        </Block>
      )}

      {idea.stage === 'Graduated' && idea.type !== 'Capability' && (
        <Block title="Retrospective" caption={idea.outcome?.retroAt ? `Due ${fmtDate(idea.outcome.retroAt)}` : 'Not scheduled'}>
          <FactList
            items={[
              ['What the proposal said', idea.outcome?.proposalSnapshot || 'No proposal snapshot recorded (pre-standard graduation).'],
              ['What was delivered', idea.outcome?.delivered || 'Not yet recorded; filled at the retrospective.'],
              ...((idea.outcome?.retroResult ? [['Result', idea.outcome.retroResult]] : []) as [ReactNode, ReactNode][]),
            ]}
          />
        </Block>
      )}

      {!hidden('decisions') && (
        <Block title="Decisions" count={decisions.length} caption="Immutable; a reversal is a new line that supersedes the old.">
          {decisions.length === 0 ? (
            <EmptyNote>No decision logged for this row yet.</EmptyNote>
          ) : (
            <ol className="relative space-y-3 border-l border-foreground/10 pl-4">
              {decisions.map((x, i) => (
                <li key={i} className="relative">
                  <span className={cn('absolute top-1.5 -left-[21px] size-2.5 rounded-full border-2 border-background', x.status === 'superseded' ? 'bg-foreground/25' : x.type === 'rejection' ? 'bg-[var(--vi-decision)]' : 'bg-[var(--vi-brand)]')} />
                  <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                    <span className="vi-num">{fmtDate(x.date)}</span>
                    {x.id && <span className="vi-num">{x.id}</span>}
                    {x.pending && <Status tone="warning" word="Pending" />}
                    {x.type === 'rejection' && <Status tone="critical" word="Rejection" />}
                    {x.door && <span>{x.door} door</span>}
                    {x.reviewOn && <span>review {fmtDate(x.reviewOn)}</span>}
                    {x.supersedes && <span>supersedes {x.supersedes}</span>}
                  </div>
                  <p className={cn('mt-0.5 text-sm', x.status === 'superseded' && 'text-muted-foreground line-through')}>{x.decision}</p>
                  {!hidden('decisions-by') && <p className="text-xs text-muted-foreground">{x.by}</p>}
                </li>
              ))}
            </ol>
          )}
        </Block>
      )}

      {sessions.length > 0 && !hidden('sessions') && (
        <Fold title="Sessions" aside={`${sessions.length}, newest first`}>
          <div className="space-y-3">
            {sessions.map((s, i) => (
              <div key={i} className="text-sm">
                <div className="flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
                  <span className="vi-num">{fmtDate(s.date)}</span>
                  <span className="font-medium text-foreground/80">{s.mode}</span>
                  {s.health && <HealthTag health={s.health} />}
                </div>
                <p className="mt-0.5">{s.outcome}</p>
                {s.healthNote && <p className="text-xs text-muted-foreground">{s.healthNote}</p>}
              </div>
            ))}
          </div>
        </Fold>
      )}

      {idea.flags.length > 0 && !hidden('flags') && (
        <Fold title="Audit flags" aside="from the sync">
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {idea.flags.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </Fold>
      )}
    </div>
  );
}

function CapabilityDetail({ id }: { id: string }) {
  const { reg, select } = useLab();
  const cap = reg.capabilities.find((c) => c.id === id);
  if (!cap) return <EmptyNote>No capability {id} in the catalogue.</EmptyNote>;
  const inbound = reg.links.filter((l) => l.toId === id);
  const prio = capabilityPriority(cap);
  return (
    <div className="space-y-7">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="vi-num font-medium text-foreground">{cap.id}</span>
          <Badge variant="outline" className="rounded-full">
            {cap.kind}
          </Badge>
        </div>
        <h2 className="mt-2 text-[24px] leading-tight font-normal tracking-tight">{cap.name}</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Status tone="neutral" word={cap.maturity} />
          {prio === 'platform priority' && <Status tone="good" word="Platform priority: reused by three or more" />}
          {prio === 'watch' && <Status tone="warning" word="No reuse yet" />}
        </div>
      </div>
      <MiniKpis items={[{ label: 'Demand', value: <CountUp value={cap.demand} />, caption: 'rows that reuse it' }, { label: 'Links', value: <CountUp value={inbound.length} />, caption: 'links pointing at it' }]} />
      <Block title="Catalogue row" caption="Reused by three or more ideas: a platform priority. No reuse after two quarters: reviewed for retirement.">
        <FactList
          items={[
            ['Created by', cap.createdById ? <IdLink id={cap.createdById} onOpen={select}>{cap.createdBy}</IdLink> : cap.createdBy],
            ['Reused by', cap.reusedBy],
            ['Demand', cap.demandNote ?? String(cap.demand)],
          ]}
        />
      </Block>
      <Block title="Links" count={inbound.length}>
        {inbound.length === 0 ? (
          <EmptyNote>No idea links to this capability yet.</EmptyNote>
        ) : (
          <div className="space-y-1.5">
            {inbound.map((l, i) => (
              <div key={i} className="lab-row flex flex-wrap items-baseline gap-x-2.5 px-3.5 py-2.5 text-sm">
                <span className="vi-caption">← {l.type}</span>
                <IdLink id={l.fromId} onOpen={select}>{nameOf(reg, l.fromId, l.fromId)}</IdLink>
                {l.note && <span className="text-xs text-muted-foreground">{l.note}</span>}
              </div>
            ))}
          </div>
        )}
      </Block>
    </div>
  );
}

function ThemeDetail({ id }: { id: string }) {
  const { reg, select } = useLab();
  const theme = reg.themes.find((t) => t.id === id);
  if (!theme) return <EmptyNote>No theme {id}.</EmptyNote>;
  const serving = reg.ideas.filter((i) => i.themeIds.includes(id));
  return (
    <div className="space-y-7">
      <div>
        <span className="vi-num text-xs font-medium">{theme.id}</span>
        <h2 className="mt-2 text-[24px] leading-tight font-normal tracking-tight">{theme.name}</h2>
        {theme.note && <p className="mt-2 text-sm text-muted-foreground">{theme.note}</p>}
      </div>
      <Block title="Ideas serving it" count={`${serving.length} of ${reg.ideas.length}`}>
        {serving.length === 0 ? (
          <EmptyNote>No idea names this theme yet.</EmptyNote>
        ) : (
          <div className="space-y-1.5">
            {serving.map((i) => (
              <div key={i.id} className="lab-row flex items-center gap-3 px-3.5 py-2.5 text-sm">
                <IdLink id={i.id} onOpen={select}>{`${i.id} ${i.slug}`}</IdLink>
                <StageTag stage={i.stage} className="ml-auto" />
              </div>
            ))}
          </div>
        )}
      </Block>
    </div>
  );
}
