import { useMemo } from 'react';
import { motion } from 'motion/react';
import { MessageSquareText } from 'lucide-react';
import { Status } from '@vi/kit';
import { Badge } from '@vi/ui/components/badge';
import { Button } from '@vi/ui/components/button';
import { cn } from '@vi/ui/lib/utils';
import { useLab } from '../lib/context';
import { attentionQueue } from '../lib/derive';
import { SAVED_QUESTIONS, matchesQuestion } from '../lib/derive2';
import type { Idea } from '../lib/types';
import { relDays, plural } from '../lib/format';
import { useJarvis } from '../jarvis/useJarvis';
import { EmptyNote, ReasonTags, Segmented, StageTag } from '../vi/parts';
import { Stagger, StaggerItem, spring } from '../vi/motion';

/** The attention queue: every row the lab's rules flag, ranked; the saved questions filter it. */
export default function Queue() {
  const { reg, derived, now, queueFilter, setQueueFilter, visibleIdeas } = useLab();
  const jarvis = useJarvis();
  const queue = useMemo(() => attentionQueue(reg, derived), [reg, derived]);
  const visible = useMemo(() => new Set(visibleIdeas.map((i) => i.id)), [visibleIdeas]);
  const inQueue = queue.filter((i) => visible.has(i.id));
  const counts = useMemo(() => Object.fromEntries(SAVED_QUESTIONS.map((q) => [q.key, visibleIdeas.filter((i) => matchesQuestion(reg, derived, i, q.key, now)).length])), [reg, derived, now, visibleIdeas]);
  const base = queueFilter === 'all' ? queue : visibleIdeas;
  const filtered = base.filter((i) => visible.has(i.id) && (queueFilter === 'all' || matchesQuestion(reg, derived, i, queueFilter, now)));
  const silent = visibleIdeas.length - inQueue.length;
  const known = queueFilter === 'all' || SAVED_QUESTIONS.some((q) => q.key === queueFilter);
  const label = queueFilter === 'all' ? 'Everything with a reason' : (SAVED_QUESTIONS.find((q) => q.key === queueFilter)?.label ?? 'Everything with a reason');

  const options = [{ value: 'all', label: 'Everything with a reason', count: inQueue.length }, ...SAVED_QUESTIONS.map((q) => ({ value: q.key, label: q.label, count: counts[q.key] }))];

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-4 pt-1">
        <div className="min-w-0">
          <div className="vi-caption">Attention queue · {plural(inQueue.length, 'row')} with a reason · ranked by the lab's rules</div>
          <h1 className="mt-1.5 text-[30px] leading-tight font-normal tracking-tight md:text-[34px]">Queue</h1>
          <p className="mt-1.5 max-w-[760px] text-sm text-muted-foreground">Decisions waiting on you come first, then features holding a parent, stale rows, parked rows past re-check and open blocking questions; the oldest touch breaks ties.</p>
        </div>
        <Button variant="outline" className="rounded-full bg-background/60" onClick={() => jarvis.ask(`Look at my attention queue (${label.toLowerCase()}). What should I do first, and why? Name the rows.`)}>
          <MessageSquareText /> What first?
        </Button>
      </header>

      <div className="flex min-w-0 flex-col gap-2">
        <span className="vi-caption">Saved questions</span>
        <Segmented id="queue-filter" size="sm" options={options} value={known ? queueFilter : 'all'} onChange={setQueueFilter} className="self-start" />
      </div>

      {filtered.length === 0 ? (
        <EmptyNote>
          Nothing matches “{label}” today.{queue.length === 0 ? ' No row has a reason to be here.' : ''}
        </EmptyNote>
      ) : (
        <Stagger key={queueFilter} className="flex flex-col gap-2" gap={0.035}>
          {filtered.map((i, n) => (
            <StaggerItem key={i.id}>
              <QueueRow idea={i} rank={n + 1} />
            </StaggerItem>
          ))}
        </Stagger>
      )}

      <p className="px-1 text-xs text-muted-foreground">
        {filtered.length} of {plural(visibleIdeas.length, 'row')} shown{silent > 0 ? `; ${silent} ${silent === 1 ? 'row has' : 'rows have'} nothing to flag` : ''}. The counts beside each question are rows that match it today.
      </p>
    </div>
  );
}

function QueueRow({ idea, rank }: { idea: Idea; rank: number }) {
  const { derived, select, selectedId, lastVisit } = useLab();
  const d = derived.get(idea.id)!;
  const isNew = !!lastVisit && idea.lastTouched > lastVisit;
  return (
    <motion.button
      type="button"
      onClick={() => select(idea.id)}
      aria-current={selectedId === idea.id ? 'true' : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={spring.snappy}
      className={cn('lab-row grid w-full grid-cols-[40px_1fr] gap-x-3 px-4 py-3.5 text-left sm:grid-cols-[56px_1fr]', selectedId === idea.id && 'ring-2 ring-[var(--vi-brand)]')}
    >
      <div className="text-center">
        <div className="vi-display text-[30px] sm:text-[36px]">{rank}</div>
        <div className="mt-1 text-[10px] text-muted-foreground">rank</div>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="vi-num text-xs font-medium">{idea.id}</span>
          <span className="text-xs text-muted-foreground">{idea.slug}</span>
          <StageTag stage={idea.stage} note={idea.stageNote} />
          {idea.horizon && (
            <Badge variant="outline" className="rounded-full">
              {idea.horizon}
            </Badge>
          )}
          <Badge variant="outline" className="hidden rounded-full sm:inline-flex">
            {idea.type}
          </Badge>
          {idea.score.composite != null && (
            <span className="text-xs text-muted-foreground" title={idea.score.note ?? idea.score.status}>
              score <span className="vi-num text-foreground">{idea.score.composite.toFixed(2)}</span> {idea.score.status}
            </span>
          )}
          <span className="ml-auto text-[11px] whitespace-nowrap text-muted-foreground">touched {relDays(d.daysUntouched)}</span>
        </div>
        <p className="mt-1.5 text-[15px] leading-snug font-medium">{idea.title}</p>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">Next: {idea.nextStep}</p>
        {(d.reasons.length > 0 || isNew) && (
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            {isNew && <Status tone="info" word="Changed since your last visit" />}
            <ReasonTags reasons={d.reasons} max={4} />
          </div>
        )}
      </div>
    </motion.button>
  );
}
