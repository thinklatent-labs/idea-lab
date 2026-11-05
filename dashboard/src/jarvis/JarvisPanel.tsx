import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, Bot, Check, Eraser, Inbox, Square, Volume2, VolumeX, X } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Status } from '@vi/kit';
import { Badge } from '@vi/ui/components/badge';
import { Button } from '@vi/ui/components/button';
import { Textarea } from '@vi/ui/components/textarea';
import { cn } from '@vi/ui/lib/utils';
import { useLab } from '../lib/context';
import { blocks, parseReply, type Inline } from './brain';
import { JarvisOrb } from './Orb';
import { useJarvis, type JMsg, type Proposal, type Tier } from './useJarvis';
import { Segmented } from '../vi/parts';
import { spring } from '../vi/motion';

const TIERS: { value: Tier; label: string }[] = [
  { value: 'quick', label: 'Fast' },
  { value: 'default', label: 'Thorough' },
  { value: 'complex', label: 'Deep' },
];
const TIER_WORD: Record<string, string> = { quick: 'fast', default: 'thorough', complex: 'deep' };

/** Inline runs: bold, code, and register IDs that open their record. */
export function Inlines({ parts, onOpen }: { parts: Inline[]; onOpen: (id: string) => void }) {
  return (
    <>
      {parts.map((p, i) =>
        p.t === 'bold' ? (
          <strong key={i} className="font-semibold">
            {p.v}
          </strong>
        ) : p.t === 'code' ? (
          <code key={i} className="rounded bg-foreground/5 px-1 font-mono text-[0.92em]">
            {p.v}
          </code>
        ) : p.t === 'id' ? (
          <button key={i} type="button" onClick={() => onOpen(p.v)} className="rounded-full bg-[color-mix(in_oklab,var(--vi-brand)_22%,transparent)] px-1.5 font-medium text-foreground transition-colors hover:bg-[color-mix(in_oklab,var(--vi-brand)_40%,transparent)]">
            {p.v}
          </button>
        ) : (
          <span key={i}>{p.v}</span>
        ),
      )}
    </>
  );
}

export function Answer({ text, onOpen, className }: { text: string; onOpen: (id: string) => void; className?: string }) {
  return (
    <div className={cn('space-y-2 text-[14px] leading-relaxed', className)}>
      {blocks(text).map((b, i) =>
        b.t === 'p' ? (
          <p key={i}>
            <Inlines parts={b.inl} onOpen={onOpen} />
          </p>
        ) : b.t === 'h' ? (
          <p key={i} className="font-semibold">
            <Inlines parts={b.inl} onOpen={onOpen} />
          </p>
        ) : (
          <ul key={i} className={cn('space-y-1 pl-5', b.t === 'ol' ? 'list-decimal' : 'list-disc')}>
            {b.items.map((it, k) => (
              <li key={k}>
                <Inlines parts={it} onOpen={onOpen} />
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

function ProposalCard({ p, msgId }: { p: Proposal; msgId: string }) {
  const j = useJarvis();
  const { inbox, select } = useLab();
  const canWrite = inbox.canWrite && (inbox.state === 'ready' || inbox.state === 'slow');
  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring.soft} className="rounded-[18px] border border-[color-mix(in_oklab,var(--vi-brand)_45%,transparent)] bg-[color-mix(in_oklab,var(--vi-brand)_10%,transparent)] p-3.5">
      <div className="vi-caption flex items-center gap-1.5">
        {p.type === 'quick' ? 'Proposed quick call' : 'Draft request for the next lab chat'}
        {p.type === 'quick' && (
          <button type="button" className="underline decoration-foreground/30 underline-offset-2" onClick={() => select(p.ideaId)}>
            {p.ideaId}
          </button>
        )}
      </div>
      {p.type === 'quick' ? (
        <>
          <p className="mt-1.5 text-sm">{p.itemText}</p>
          <p className="mt-1.5 text-sm">
            <span className="font-semibold">{p.label}</span>
            {p.why && <span className="text-muted-foreground"> — {p.why}</span>}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Applies: {p.effect}</p>
        </>
      ) : (
        <p className="mt-1.5 text-sm">
          {p.ideaId && <span className="font-medium">{p.ideaId}: </span>}
          {p.text}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {p.state === 'open' && (
          <>
            <Button size="sm" className="rounded-full" disabled={!canWrite} onClick={() => j.confirm(msgId, p.pid)}>
              {p.type === 'quick' ? <Check /> : <Inbox />}
              {p.type === 'quick' ? 'Record my decision' : 'Queue for the chat'}
            </Button>
            <Button size="sm" variant="outline" className="rounded-full" onClick={() => j.dismiss(msgId, p.pid)}>
              Dismiss
            </Button>
            {!canWrite && <span className="text-xs text-muted-foreground">Only Jithin, on claude.ai, can confirm.</span>}
          </>
        )}
        {p.state === 'recorded' && <Status tone="good" word="Recorded; Claude applies it at the next lab chat or the morning pickup" />}
        {p.state === 'queued' && <Status tone="good" word="Queued; raised at the start of the next lab chat" />}
        {p.state === 'dismissed' && <Status tone="neutral" word="Dismissed" />}
        {p.state === 'failed' && <Status tone="critical" word="Not saved; try again from the card" />}
      </div>
    </motion.div>
  );
}

function JarvisMessage({ m }: { m: JMsg }) {
  const j = useJarvis();
  const { select } = useLab();
  const parsed = parseReply(m.text);
  const writing = m.status === 'thinking' || m.status === 'streaming';
  const showText = m.status === 'done' ? parsed.body : m.text;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <JarvisOrb size={18} state={writing ? 'thinking' : 'idle'} />
        <span className="font-medium text-foreground/80">Jarvis</span>
        <span>
          {m.kind === 'local' ? 'on the page' : m.kind === 'notice' ? 'note' : `Claude · ${TIER_WORD[m.tierApplied ?? ''] ?? (m.kind === 'brief' ? 'thorough' : TIER_WORD[j.tier])}`}
        </span>
        <span className="ml-auto vi-num">{new Date(m.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="rounded-[20px] rounded-tl-md border border-[var(--lab-row-border)] bg-[var(--lab-row)] px-4 py-3">
        {m.status === 'thinking' && !m.text ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }}>
              {m.reads?.length ? `${m.reads[m.reads.length - 1].charAt(0).toUpperCase()}${m.reads[m.reads.length - 1].slice(1)}…` : 'Thinking…'}
            </motion.span>
          </div>
        ) : (
          <Answer text={showText} onOpen={(id) => select(id)} className={writing ? 'lab-caret' : undefined} />
        )}
        {m.error && <p className="mt-2 text-sm text-[var(--lab-crit)]">{m.error}</p>}
      </div>
      {m.proposals?.map((p) => <ProposalCard key={p.pid} p={p} msgId={m.id} />)}
      {(m.status === 'done' || m.status === 'stopped') && (m.kind === 'answer' || m.kind === 'brief') && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-1 text-xs text-muted-foreground">
          {parsed.confidence ? <Status tone={parsed.confidence.level === 'high' ? 'good' : parsed.confidence.level === 'medium' ? 'info' : 'warning'} word={`${parsed.confidence.level[0].toUpperCase()}${parsed.confidence.level.slice(1)} confidence`} /> : <Status tone="neutral" word="Confidence not stated" />}
          <span className="min-w-0">Basis: register digest{m.reads?.length ? `; ${m.reads.join('; ')}` : ''}{parsed.confidence?.why ? `. ${parsed.confidence.why}` : ''}</span>
          {parsed.ids.length > 0 && (
            <span className="flex flex-wrap items-center gap-1">
              Sources:
              {parsed.ids.slice(0, 6).map((id) => (
                <button key={id} type="button" className="rounded-full border border-foreground/15 px-1.5 py-px font-medium text-foreground/80 hover:bg-foreground/5" onClick={() => select(id)}>
                  {id}
                </button>
              ))}
            </span>
          )}
          {j.canSpeak && m.text && (
            <button type="button" className="ml-auto inline-flex items-center gap-1 hover:text-foreground" onClick={() => j.listen(m.text)}>
              <Volume2 className="size-3.5" /> Listen
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function JarvisPanel({ docked, suggestions }: { docked: boolean; suggestions: string[] }) {
  const j = useJarvis();
  const { reg } = useLab();
  const [draft, setDraft] = useState('');
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const last = j.msgs[j.msgs.length - 1];
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });
  }, [j.msgs.length, last?.text, last?.proposals?.length]);
  useEffect(() => {
    if (j.open) window.setTimeout(() => input.current?.focus(), 120);
  }, [j.open]);
  const send = () => {
    if (!draft.trim() || j.busy) return;
    j.ask(draft);
    setDraft('');
  };
  const statusLine: ReactNode =
    j.orb === 'thinking' ? 'Thinking…' : j.orb === 'speaking' ? 'Speaking…' : j.availability === 'ready' ? `Ready · reads register rev ${reg.source.registerRev}` : j.availability === 'checking' ? 'Connecting to Claude…' : j.availability === 'blocked' ? 'Claude unavailable here; navigation only' : 'Off claude.ai: navigation only';

  const panel = (
    <motion.aside
      aria-label="Jarvis"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={spring.sheet}
      className={cn('vi-glass-overlay flex flex-col overflow-hidden rounded-[28px]', docked ? 'sticky top-3 h-[calc(100dvh-24px)] w-[400px] shrink-0' : 'fixed inset-y-2 right-2 z-50 w-[min(420px,calc(100vw-16px))]')}
    >
      <div className="flex items-center gap-3 border-b border-foreground/10 px-4 py-3.5">
        <JarvisOrb size={40} state={j.orb} rings />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold tracking-tight">Jarvis</div>
          <div className="truncate text-xs text-muted-foreground" aria-live="polite">
            {statusLine}
          </div>
        </div>
        {j.canSpeak && (
          <Button variant="ghost" size="icon-sm" className="rounded-full" aria-pressed={j.voice} aria-label={j.voice ? 'Voice on: Jarvis reads answers aloud' : 'Voice off'} title={j.voice ? 'Voice on: answers are read aloud' : 'Voice off'} onClick={() => j.setVoice(!j.voice)}>
            {j.voice ? <Volume2 /> : <VolumeX />}
          </Button>
        )}
        <Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Clear the conversation" title="Clear the conversation" onClick={j.clear} disabled={!j.msgs.length}>
          <Eraser />
        </Button>
        <Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Close Jarvis" onClick={() => j.setOpen(false)}>
          <X />
        </Button>
      </div>

      <div ref={scroller} className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4">
        {j.msgs.length === 0 ? (
          <div className="flex h-full flex-col justify-end gap-4 pb-2">
            <div>
              <div className="text-2xl leading-snug tracking-tight">How can I help with the lab?</div>
              <p className="mt-2 text-sm text-muted-foreground">I read the register, open any view or row for you, and can put a decision or a request in front of you. You decide; I never change the register.</p>
            </div>
            <div className="flex flex-col items-start gap-2">
              {suggestions.map((s) => (
                <button key={s} type="button" onClick={() => (s === 'Brief me' ? j.brief() : j.ask(s))} className="rounded-full border border-foreground/15 bg-background/60 px-3.5 py-1.5 text-left text-sm transition-colors hover:bg-foreground/5">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {j.msgs.map((m) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={spring.soft}>
                {m.role === 'user' ? (
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-[20px] rounded-tr-md bg-foreground px-3.5 py-2 text-sm text-background">{m.text}</div>
                  </div>
                ) : (
                  <JarvisMessage m={m} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="border-t border-foreground/10 p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Segmented id="jarvis-tier" size="sm" options={TIERS} value={j.tier} onChange={j.setTier} />
          <Badge variant="outline" className="rounded-full">
            <Bot /> proposes; you decide
          </Badge>
        </div>
        <div className="flex items-end gap-2 rounded-[22px] border border-foreground/15 bg-background/70 p-1.5 pl-3.5 focus-within:border-foreground/30">
          <Textarea
            ref={input}
            value={draft}
            rows={1}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask about the lab, or say “open VI-004”"
            className="max-h-36 min-h-9 flex-1 resize-none border-0 bg-transparent px-0 py-2 shadow-none focus-visible:ring-0 dark:bg-transparent"
            aria-label="Message Jarvis"
          />
          {j.busy ? (
            <Button size="icon" className="size-9 rounded-full" aria-label="Stop" onClick={j.stop}>
              <Square className="size-3.5 fill-current" />
            </Button>
          ) : (
            <Button size="icon" className="size-9 rounded-full" aria-label="Send" disabled={!draft.trim()} onClick={send}>
              <ArrowUp />
            </Button>
          )}
        </div>
        <p className="mt-2 px-1 text-[11px] text-muted-foreground">Answers come from Claude on your account and use your Claude usage. Voice uses this device's own voices.</p>
      </div>
    </motion.aside>
  );
  // Docked, Jarvis is a column of the frame; floating (narrower screens), it is portalled above the shell.
  return docked ? panel : createPortal(panel, document.body);
}
