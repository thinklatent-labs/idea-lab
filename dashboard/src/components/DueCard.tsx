import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquareText } from 'lucide-react';
import { Status } from '@kit/kit';
import { Button } from '@kit/ui/components/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@kit/ui/components/tooltip';
import { useLab } from '../lib/context';
import { sessionLine, defaultMode } from '../lib/derive';
import type { DueItem, Idea } from '../lib/types';
import { fmtDate } from '../lib/format';
import { CopyLine, StageTag } from '../kit/parts';
import { spring } from '../kit/motion';
import { useJarvis } from '../jarvis/useJarvis';

/** One decision waiting on Jithin. A quick call shows its options as pills; an input-needed item hands over to a
 *  chat with the session line, or to Jarvis to prepare it. */
export default function DueCard({ idea, item, showIdea = false }: { idea: Idea; item: DueItem; showIdea?: boolean }) {
  const { inbox, select } = useLab();
  const jarvis = useJarvis();
  const rec = inbox.docs.get(item.id);
  const [changing, setChanging] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const quick = item.kind === 'quick' && (item.options?.length ?? 0) > 0;
  const live = inbox.state === 'ready' || inbox.state === 'slow';
  const canPick = quick && live && inbox.canWrite;

  const pick = async (optId: string) => {
    const o = item.options!.find((x) => x.id === optId)!;
    setBusy(optId);
    await inbox.decide({ itemId: item.id, ideaId: idea.id, itemText: item.text, optionId: o.id, optionLabel: o.label, effect: o.effect });
    setBusy(null);
    setChanging(false);
  };

  return (
    <motion.div layout transition={spring.layout} className="lab-row px-4 py-3.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {showIdea && (
          <button type="button" onClick={() => select(idea.id)} className="inline-flex items-center gap-2 text-xs font-medium hover:underline">
            <span className="kit-num">{idea.id}</span>
            <span className="text-muted-foreground">{idea.slug}</span>
          </button>
        )}
        {showIdea && <StageTag stage={idea.stage} />}
        <span className="ml-auto">{quick ? <Status tone="critical" word="Quick call" /> : <Status tone="info" word="Needs the chat" />}</span>
      </div>
      <p className="mt-2 text-sm leading-snug">{item.text}</p>

      {quick && rec && !changing ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {rec.status === 'waiting' && (
            <>
              <Status tone="good" word={`Decided: ${rec.optionLabel}`} />
              <span className="text-xs text-muted-foreground">Recorded {fmtDate(rec.decidedAt)}; Claude applies it at the next lab chat or the morning pickup.</span>
              {canPick && (
                <span className="ml-auto flex gap-1.5">
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => setChanging(true)}>
                    Change
                  </Button>
                  <Button size="sm" variant="ghost" className="rounded-full" onClick={() => inbox.withdraw(item.id)}>
                    Withdraw
                  </Button>
                </span>
              )}
            </>
          )}
          {rec.status === 'applied' && (
            <>
              <Status tone="good" word={`Applied: ${rec.optionLabel}`} />
              <span className="text-xs text-muted-foreground">
                {rec.appliedNote ?? ''}
                {rec.decisionId ? ` (${rec.decisionId})` : ''} The register here refreshes at the next sync.
              </span>
            </>
          )}
          {rec.status === 'needs-chat' && (
            <div className="w-full space-y-2">
              <Status tone="warning" word="Claude needs you in the chat" />
              <p className="text-xs text-muted-foreground">{rec.appliedNote ?? 'Something changed since you decided.'}</p>
              <CopyLine text={sessionLine(idea, defaultMode(idea.stage))} label="Copy session line" />
            </div>
          )}
        </div>
      ) : quick ? (
        <>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.options!.map((o) => (
              <Tooltip key={o.id}>
                <TooltipTrigger
                  render={
                    <Button size="sm" variant="outline" className="h-8 rounded-full px-3.5 data-[busy=true]:opacity-70" data-busy={busy === o.id} disabled={!canPick || !!busy} onClick={() => pick(o.id)}>
                      {busy === o.id ? 'Saving…' : o.label}
                    </Button>
                  }
                />
                <TooltipContent className="max-w-xs">Applies: {o.effect}</TooltipContent>
              </Tooltip>
            ))}
            {changing && (
              <Button size="sm" variant="ghost" className="h-8 rounded-full" onClick={() => setChanging(false)}>
                Keep {rec?.optionLabel}
              </Button>
            )}
          </div>
          {!live && <p className="mt-2 text-xs text-muted-foreground">{inbox.state === 'loading' ? 'Connecting to the decision inbox…' : 'Decisions are made on the claude.ai dashboard; this copy is read-only.'}</p>}
          {live && !inbox.canWrite && <p className="mt-2 text-xs text-muted-foreground">Only Jithin records decisions here.</p>}
        </>
      ) : (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <CopyLine className="min-w-0 flex-1" text={sessionLine(idea, defaultMode(idea.stage))} label="Copy session line" />
          <Button size="sm" variant="outline" className="h-9 rounded-full" onClick={() => jarvis.ask(`Help me prepare this decision for ${idea.id} ${idea.slug}: "${item.text}". What does the register say, what are the options, and what would you recommend?`)}>
            <MessageSquareText /> Prepare with Jarvis
          </Button>
        </div>
      )}
    </motion.div>
  );
}
