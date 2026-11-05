// Shell D, as the kit fixes it for every VI screen: a floating pill top bar with the day's agenda, and the dock kept
// inside the content frame, top-anchored, in light and dark. No bottom bar: on a phone the dock becomes a
// top-anchored strip under the bar. The active dock item is one sage pill that springs between items.
import { AnimatePresence, motion } from 'motion/react';
import { Moon, Search, Sun } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { Button } from '@vi/ui/components/button';
import { Kbd } from '@vi/ui/components/kbd';
import { Tooltip, TooltipContent, TooltipTrigger } from '@vi/ui/components/tooltip';
import { cn } from '@vi/ui/lib/utils';
import { spring } from './motion';
import { JarvisOrb } from '../jarvis/Orb';

export interface DockItem {
  id: string;
  label: string;
  Icon: (p: { className?: string }) => ReactNode;
  badge?: number;
}

export interface AgendaChip {
  key: string;
  label: string;
  lead?: boolean;
  onClick: () => void;
}

export function Shell({
  dock,
  active,
  onRoute,
  dark,
  onToggleDark,
  onAsk,
  agendaDate,
  agenda,
  status,
  jarvisOpen,
  jarvisState,
  onJarvis,
  aside,
  children,
}: {
  dock: DockItem[];
  active: string;
  onRoute: (id: string) => void;
  dark: boolean;
  onToggleDark: () => void;
  onAsk: () => void;
  agendaDate: string;
  agenda: AgendaChip[];
  status: ReactNode;
  jarvisOpen: boolean;
  jarvisState: 'idle' | 'thinking' | 'speaking';
  onJarvis: () => void;
  aside?: ReactNode;
  children: ReactNode;
}) {
  // On a phone the dock strip scrolls; keep the active item in view when the route changes.
  const strip = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = strip.current?.querySelector<HTMLElement>('[aria-current="page"]');
    el?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [active]);
  return (
    <div className="relative min-h-dvh p-2 text-sm md:p-3">
      {!dark && (
        <div className="lab-fields" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      )}

      <header className="relative z-30 flex items-center gap-2 px-1 pt-1 md:gap-3 md:px-2 md:pt-2">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--vi-brand-green-900),var(--vi-brand-green-500))] text-xs font-semibold text-white" aria-label="VI Idea Lab">
          VI
        </span>
        <span className="hidden text-[15px] font-medium tracking-tight sm:inline">Idea Lab</span>
        <button
          type="button"
          onClick={onAsk}
          className="flex h-9 min-w-0 flex-1 items-center gap-2.5 rounded-full border border-foreground/15 bg-background/70 px-3.5 text-left text-muted-foreground backdrop-blur transition-colors hover:border-foreground/25 md:max-w-[340px] md:flex-none md:w-[340px]"
        >
          <Search className="size-4 shrink-0" />
          <span className="min-w-0 flex-1 truncate">Ask Jarvis or jump to a row</span>
          <Kbd className="hidden md:inline-flex">⌘K</Kbd>
        </button>

        <div className="mx-auto hidden h-10 min-w-0 items-center gap-1.5 rounded-full border border-foreground/15 bg-background/70 pr-1.5 pl-3.5 backdrop-blur xl:flex">
          <span className="mr-1.5 whitespace-nowrap">{agendaDate}</span>
          {agenda.length === 0 && <span className="pr-2 text-xs text-muted-foreground">Nothing due today</span>}
          {agenda.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={c.onClick}
              className={cn(
                'h-7 max-w-[220px] truncate rounded-full px-2.5 text-xs font-medium transition-transform active:scale-95',
                c.lead ? 'bg-[var(--vi-brand)] text-[var(--vi-brand-fg)]' : 'bg-secondary text-secondary-foreground hover:bg-accent',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 md:gap-2">
          <div className="hidden text-xs text-muted-foreground lg:block">{status}</div>
          <button
            type="button"
            onClick={onJarvis}
            aria-pressed={jarvisOpen}
            className={cn(
              'flex h-9 items-center gap-2 rounded-full border px-1.5 transition-colors md:pr-3.5',
              jarvisOpen ? 'border-transparent bg-foreground text-background' : 'border-foreground/15 bg-background/70 backdrop-blur hover:border-foreground/25',
            )}
          >
            <JarvisOrb size={24} state={jarvisState} />
            <span className="hidden font-medium md:inline">Jarvis</span>
          </button>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="outline" size="icon-lg" className="rounded-full bg-background/70 backdrop-blur" onClick={onToggleDark} aria-label={dark ? 'Light mode' : 'Dark mode'}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span key={dark ? 'sun' : 'moon'} initial={{ rotate: -90, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.6 }} transition={spring.snappy} className="inline-flex">
                      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                    </motion.span>
                  </AnimatePresence>
                </Button>
              }
            />
            <TooltipContent>Light is off-white; dark is black, nothing else</TooltipContent>
          </Tooltip>
        </div>
      </header>

      {/* Phone and tablet: the dock as a top-anchored strip. */}
      <nav ref={strip} aria-label="Views" className="vi-glass-overlay lab-noscroll sticky top-2 z-20 mx-1 mt-3 flex items-center gap-1 overflow-x-auto rounded-[22px] p-1.5 md:hidden">
        {dock.map((d) => {
          const on = d.id === active;
          return (
            <button key={d.id} type="button" aria-label={d.label} aria-current={on ? 'page' : undefined} onClick={() => onRoute(d.id)} className={cn('relative flex h-10 shrink-0 items-center gap-1.5 rounded-[14px] px-2.5', on ? 'text-[var(--vi-brand-fg)]' : 'text-foreground/75')}>
              {on && <motion.span layoutId="dock-pill-phone" className="absolute inset-0 rounded-[14px] bg-[var(--vi-brand)]" transition={spring.snappy} />}
              <d.Icon className="relative size-[18px]" />
              <AnimatePresence initial={false}>
                {on && (
                  <motion.span className="relative overflow-hidden text-xs font-medium whitespace-nowrap" initial={{ width: 0, opacity: 0 }} animate={{ width: 'auto', opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={spring.snappy}>
                    {d.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!!d.badge && <span className="relative flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">{d.badge}</span>}
            </button>
          );
        })}
      </nav>

      <div className="relative z-[2] mt-3 flex items-start gap-4 md:mt-5 md:px-1.5">
        {/* Desktop: the dock inside the frame, top-anchored, staying in reach as the page scrolls. */}
        <nav aria-label="Views" className="vi-glass-overlay sticky top-3 z-20 hidden w-[60px] shrink-0 flex-col items-center gap-1 rounded-[22px] p-2 md:flex">
          {dock.map((d) => {
            const on = d.id === active;
            return (
              <Tooltip key={d.id}>
                <TooltipTrigger
                  render={
                    <button type="button" aria-label={d.label} aria-current={on ? 'page' : undefined} onClick={() => onRoute(d.id)} className={cn('relative flex size-11 items-center justify-center rounded-[14px] transition-colors', on ? 'text-[var(--vi-brand-fg)]' : 'text-foreground/75 hover:bg-foreground/5 hover:text-foreground')}>
                      {on && <motion.span layoutId="dock-pill" className="absolute inset-0 rounded-[14px] bg-[var(--vi-brand)] shadow-[0_0_0_1px_color-mix(in_oklab,var(--vi-brand)_45%,transparent),0_8px_22px_color-mix(in_oklab,var(--vi-brand)_40%,transparent)]" transition={spring.snappy} />}
                      <d.Icon className="relative size-[18px]" />
                      {!!d.badge && <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">{d.badge}</span>}
                    </button>
                  }
                />
                <TooltipContent side="right">{d.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        <main className="min-w-0 flex-1 px-1 pb-10 md:px-0 md:pr-2">{children}</main>
        {aside}
      </div>
    </div>
  );
}
