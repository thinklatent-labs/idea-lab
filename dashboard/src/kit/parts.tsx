// Product wrappers over ThinkLatent kit for the Idea Lab: stage and health tags, section heads, segmented controls, copy
// buttons, meters and the empty states. Kit rules: status is glyph plus word; unmeasured is an em dash with a reason;
// every number has a caption. Nothing here hard-codes a colour: hues come from the kit's tokens via styles.css.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronRight, Copy } from 'lucide-react';
import { Status, type StatusTone } from '@kit/kit';
import { Badge } from '@kit/ui/components/badge';
import { Button } from '@kit/ui/components/button';
import { cn } from '@kit/ui/lib/utils';
import type { Health, Stage } from '../lib/types';
import type { Reason, ReasonKind } from '../lib/derive';
import { STAGE_MEANING } from '../lib/rubric';
import { spring } from './motion';

export const STAGE_VAR: Record<Stage, string> = {
  Seed: 'var(--lab-stage-seed)',
  Shaping: 'var(--lab-stage-shaping)',
  'Stress test': 'var(--lab-stage-stress)',
  Proposal: 'var(--lab-stage-proposal)',
  Building: 'var(--lab-stage-building)',
  Shipped: 'var(--lab-stage-shipped)',
  Graduated: 'var(--lab-stage-graduated)',
  Parked: 'var(--lab-stage-parked)',
  Killed: 'var(--lab-stage-killed)',
};

/** Stage: a dot in the stage hue and the stage word. */
export function StageTag({ stage, note, className }: { stage: Stage; note?: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap', className)} title={note ? `${stage}: ${note}` : STAGE_MEANING[stage]}>
      <span className="lab-stage-dot" style={{ ['--lab-stage' as string]: STAGE_VAR[stage] }} aria-hidden="true" />
      <span className="text-foreground/80">{stage}</span>
    </span>
  );
}

const HEALTH: Record<Health, { tone: StatusTone; word: string }> = {
  'on-track': { tone: 'good', word: 'On track' },
  'at-risk': { tone: 'warning', word: 'At risk' },
  'off-track': { tone: 'critical', word: 'Off track' },
};

export function HealthTag({ health, missing }: { health: Health | null | undefined; missing?: boolean }) {
  if (missing) return <Status tone="warning" word="Update missing" />;
  if (!health) return <Status tone="neutral" word="No call yet" />;
  return <Status tone={HEALTH[health].tone} word={HEALTH[health].word} />;
}

export const REASON_TONE: Record<ReasonKind, StatusTone> = {
  decision: 'critical',
  'score-proposed': 'info',
  stale: 'warning',
  'blocks-parent': 'critical',
  blocked: 'warning',
  'parked-overdue': 'warning',
  'open-blocking': 'warning',
  flag: 'neutral',
  quiet: 'neutral',
};

/** Why a row needs attention, as glyph-plus-word tags. */
export function ReasonTags({ reasons, max = 3, className }: { reasons: Reason[]; max?: number; className?: string }) {
  const shown = reasons.slice(0, max);
  const rest = reasons.length - shown.length;
  if (!reasons.length) return null;
  return (
    <div className={cn('flex flex-wrap items-center gap-x-3 gap-y-1', className)}>
      {shown.map((r, i) => (
        <Status key={i} tone={REASON_TONE[r.kind]} word={r.label} />
      ))}
      {rest > 0 && <span className="text-xs text-muted-foreground">+{rest} more</span>}
    </div>
  );
}

/** Section head: title, a caption in plain words, a count and actions on the right. */
export function SectionHead({ title, caption, count, actions, className }: { title: ReactNode; caption?: ReactNode; count?: number | string; actions?: ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-start justify-between gap-3', className)}>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-[17px] font-medium">
          {title}
          {count != null && (
            <Badge variant="secondary" className="rounded-full kit-num">
              {count}
            </Badge>
          )}
        </div>
        {caption && <div className="mt-1 max-w-[720px] text-xs text-muted-foreground">{caption}</div>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/** iOS-style segmented control: the selected pill slides between options. */
export function Segmented<T extends string>({ options, value, onChange, id, size = 'md', className }: { options: { value: T; label: ReactNode; count?: number }[]; value: T; onChange: (v: T) => void; id: string; size?: 'sm' | 'md'; className?: string }) {
  return (
    <div role="tablist" className={cn('lab-noscroll inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-foreground/10 bg-background/60 p-1 backdrop-blur', className)}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o.value)}
            className={cn('relative shrink-0 rounded-full font-medium whitespace-nowrap transition-colors', size === 'sm' ? 'h-7 px-3 text-xs' : 'h-8 px-3.5 text-[13px]', on ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
          >
            {on && <motion.span layoutId={`seg-${id}`} className="absolute inset-0 rounded-full bg-primary" transition={spring.snappy} />}
            <span className="relative inline-flex items-center gap-1.5">
              {o.label}
              {o.count != null && <span className={cn('kit-num text-[11px]', on ? 'opacity-80' : 'opacity-60')}>{o.count}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Copies inside the click; falls back to selecting the text when the clipboard refuses (a framed page may). */
export function CopyLine({ text, label = 'Copy', className }: { text: string; label?: string; className?: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<'idle' | 'done' | 'failed'>('idle');
  useEffect(() => {
    if (state === 'idle') return;
    const t = window.setTimeout(() => setState('idle'), 1800);
    return () => window.clearTimeout(t);
  }, [state]);
  const copy = () => {
    const finish = (ok: boolean) => {
      setState(ok ? 'done' : 'failed');
      if (!ok && ref.current) {
        const range = document.createRange();
        range.selectNodeContents(ref.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    };
    try {
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => finish(true), () => finish(false));
      else finish(false);
    } catch {
      finish(false);
    }
  };
  return (
    <div className={cn('flex min-w-0 items-center gap-2 rounded-full border border-foreground/10 bg-background/60 py-1 pr-1 pl-3.5', className)}>
      <code ref={ref} className="min-w-0 flex-1 truncate font-mono text-xs">
        {text}
      </code>
      <Button size="sm" variant={state === 'done' ? 'secondary' : 'default'} className="rounded-full" onClick={copy}>
        {state === 'done' ? <Check /> : <Copy />}
        {state === 'done' ? 'Copied' : state === 'failed' ? 'Select and copy' : label}
      </Button>
    </div>
  );
}

/** A thin bar: share of a whole, with the decision colour past the line. */
export function Meter({ value, max, over, className, label }: { value: number; max: number; over?: boolean; className?: string; label: string }) {
  const pct = Math.max(0, Math.min(1, max ? value / max : 0));
  return (
    <div className={cn('lab-track h-1.5 overflow-hidden rounded-full', className)} role="meter" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <motion.div className="h-full rounded-full" style={{ background: over ? 'var(--kit-decision)' : 'currentColor' }} initial={{ width: 0 }} animate={{ width: `${pct * 100}%` }} transition={spring.soft} />
    </div>
  );
}

/** Unmeasured: an em dash and the reason, never a zero. */
export function Dash({ reason }: { reason: 'not scored' | 'not measured' | 'not recorded' | 'not due' | 'not applicable' }) {
  return (
    <span className="text-muted-foreground" title={reason}>
      — <span className="text-xs">{reason}</span>
    </span>
  );
}

export function EmptyNote({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('rounded-[20px] border border-dashed border-foreground/15 px-4 py-3.5 text-sm text-muted-foreground', className)}>{children}</p>;
}

/** An ID that opens its record. */
export function IdLink({ id, children, onOpen, className }: { id: string; children?: ReactNode; onOpen: (id: string) => void; className?: string }) {
  return (
    <button type="button" onClick={() => onOpen(id)} className={cn('inline-flex items-center gap-1 rounded-full font-medium text-foreground underline decoration-foreground/20 underline-offset-4 transition-colors hover:decoration-foreground', className)}>
      {children ?? id}
    </button>
  );
}

/** Label above value, for facts whose values are sentences. */
export function FactList({ items, className }: { items: [ReactNode, ReactNode][]; className?: string }) {
  return (
    <dl className={cn('grid gap-2', className)}>
      {items.map(([k, v], i) => (
        <div key={i} className="lab-row px-4 py-3">
          <dt className="kit-caption">{k}</dt>
          <dd className="mt-1 text-sm">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A section that opens in place, springing to its height. */
export function Fold({ title, aside, children, defaultOpen = false, className }: { title: ReactNode; aside?: ReactNode; children: ReactNode; defaultOpen?: boolean; className?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cn('lab-row overflow-hidden', className)}>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 px-4 py-3 text-left">
        <span className="min-w-0 flex-1 text-sm font-medium">{title}</span>
        {aside && <span className="shrink-0 text-xs text-muted-foreground">{aside}</span>}
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={spring.snappy} className="inline-flex text-muted-foreground">
          <ChevronRight className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={spring.sheet} className="overflow-hidden">
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** A titled block of a page or a sheet. */
export function Block({ title, caption, count, actions, children, className }: { title: ReactNode; caption?: ReactNode; count?: number | string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn('space-y-3', className)}>
      <SectionHead title={title} caption={caption} count={count} actions={actions} />
      {children}
    </section>
  );
}
