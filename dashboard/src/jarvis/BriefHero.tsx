import { motion } from 'motion/react';
import { MessageSquareText, Sparkles, Square, Volume2 } from 'lucide-react';
import { Status, Surface } from '@vi/kit';
import { Button } from '@vi/ui/components/button';
import { useLab } from '../lib/context';
import { localBrief, parseReply } from './brain';
import { JarvisOrb } from './Orb';
import { useJarvis } from './useJarvis';
import { Answer } from './JarvisPanel';
import { CountUp, TypeIn } from '../vi/motion';

/** The command center's hero: Jarvis's brief. The page writes the first one itself from the rule table (no model,
 *  instant, free); "Brief me" asks Claude for the narrative, streams it in and, with voice on, reads it aloud. */
export function BriefHero() {
  const { reg, derived, now, inbox, visibleIdeas, go, setQueueFilter } = useLab();
  const j = useJarvis();
  const local = localBrief(reg, derived, now, inbox.docs, visibleIdeas);
  const b = j.briefMsg;
  const writing = b?.status === 'thinking' || b?.status === 'streaming';
  const parsed = b?.text ? parseReply(b.text) : null;
  const toQueue = (f: string) => {
    setQueueFilter(f);
    go('queue', null);
  };
  const glassBtn = 'rounded-full border-white/30 bg-white/15 text-current hover:bg-white/25 dark:border-white/20';
  const cells: { n: number; label: string; filter: string }[] = [
    { n: local.counts.quick + local.counts.input, label: local.counts.input ? `decisions (${local.counts.input} for the chat)` : 'decisions to make', filter: 'decision' },
    { n: local.counts.dueWeek + local.counts.overdue, label: local.counts.overdue ? `next steps due (${local.counts.overdue} overdue)` : 'next steps due this week', filter: 'due-week' },
    { n: local.counts.stale + local.counts.gate, label: local.counts.gate ? 'stale or building without a gate' : 'rows past their window', filter: 'stale' },
  ];

  return (
    <Surface surface="coloured" className="flex h-full min-h-[340px] flex-col justify-between gap-6">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="vi-caption inline-flex items-center gap-2 text-current/80">
            <JarvisOrb size={26} state={writing ? 'thinking' : j.orb === 'speaking' ? 'speaking' : 'idle'} rings />
            Jarvis · {b ? `Claude, ${b.tierApplied === 'complex' ? 'deep' : b.tierApplied === 'quick' ? 'fast' : 'thorough'}` : 'from the rule table, no model'}
          </span>
          <span className="vi-num text-xs text-current/70">{b ? new Date(b.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : `rev ${reg.source.registerRev}`}</span>
        </div>
        {b && (b.text || writing) ? (
          <div className="mt-5 max-w-[620px] text-[17px] leading-relaxed">
            {b.text ? (
              <Answer text={b.status === 'done' ? parsed!.body : b.text} onOpen={(id) => go('pulse', id)} className={writing ? 'lab-caret text-[17px]' : 'text-[17px]'} />
            ) : (
              <motion.p animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 1.6, repeat: Infinity }}>
                Reading the register…
              </motion.p>
            )}
            {b.error && <p className="mt-2 text-sm opacity-80">{b.error}</p>}
          </div>
        ) : (
          <p className="mt-5 max-w-[580px] text-2xl leading-snug">
            <TypeIn text={local.headline} /> <span className="opacity-70">{local.tail}</span>
          </p>
        )}
        {b?.status === 'done' && parsed && (
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-current/80">
            {parsed.confidence && <Status tone={parsed.confidence.level === 'high' ? 'good' : parsed.confidence.level === 'medium' ? 'info' : 'warning'} word={`${parsed.confidence.level[0].toUpperCase()}${parsed.confidence.level.slice(1)} confidence`} className="[&_span]:text-current" />}
            <span>Basis: register rev {reg.source.registerRev}{parsed.confidence?.why ? `; ${parsed.confidence.why}` : ''}</span>
            {parsed.ids.length > 0 && (
              <span className="flex flex-wrap gap-1">
                Sources:{' '}
                {parsed.ids.slice(0, 5).map((id) => (
                  <button key={id} type="button" className="rounded-full border border-current/30 px-1.5 hover:bg-white/15" onClick={() => go('pulse', id)}>
                    {id}
                  </button>
                ))}
              </span>
            )}
          </div>
        )}
      </div>

      <div>
        <div className="vi-caption mb-2.5 text-current/75">Contributing</div>
        <div className="grid grid-cols-3 gap-2.5">
          {cells.map((c) => (
            <motion.button key={c.filter} type="button" onClick={() => toQueue(c.filter)} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="min-w-0 rounded-[18px] border border-white/20 bg-white/15 px-3.5 py-3 text-left backdrop-blur-sm">
              <div className="vi-display text-[30px]">
                <CountUp value={c.n} />
              </div>
              <div className="mt-1.5 text-xs leading-snug opacity-80">{c.label}</div>
            </motion.button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {writing ? (
            <Button className="rounded-full bg-white text-[var(--vi-role-light-ink)] hover:bg-white/90" onClick={j.stop}>
              <Square className="fill-current" /> Stop
            </Button>
          ) : (
            <Button className="rounded-full bg-white text-[var(--vi-role-light-ink)] hover:bg-white/90" onClick={j.brief}>
              <Sparkles /> {b ? 'Brief me again' : 'Brief me'}
            </Button>
          )}
          <Button variant="outline" className={glassBtn} onClick={() => j.setOpen(true)}>
            <MessageSquareText /> Ask Jarvis
          </Button>
          {b?.status === 'done' && j.canSpeak && (
            <Button variant="outline" className={glassBtn} onClick={() => j.listen(b.text)}>
              <Volume2 /> Listen
            </Button>
          )}
          {local.lead && !b && (
            <Button variant="outline" className={glassBtn} onClick={() => go('pulse', local.lead!.ideaId)}>
              Open {local.lead.ideaId}
            </Button>
          )}
        </div>
      </div>
    </Surface>
  );
}
