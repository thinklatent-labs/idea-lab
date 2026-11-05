import { useState } from 'react';
import { Boxes, LayoutDashboard, MessageSquareText, Moon, Sparkles } from 'lucide-react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@vi/ui/components/command';
import { useLab, VIEWS, type View } from '../lib/context';
import { useJarvis } from '../jarvis/useJarvis';
import { StageTag } from '../vi/parts';

const LABEL: Record<View, string> = { pulse: 'Command center', queue: 'Queue', register: 'Register', board: 'Board', graph: 'Graph', catalogue: 'Catalogue', scores: 'Scores', changes: 'Changes', log: 'Log' };

/** ⌘K: jump to any view or record, or hand the question to Jarvis. */
export default function Palette({ open, onOpenChange }: { open: boolean; onOpenChange: (b: boolean) => void }) {
  const { reg, go, view, visibleIdeas } = useLab();
  const jarvis = useJarvis();
  const [q, setQ] = useState('');
  const close = () => {
    onOpenChange(false);
    setQ('');
  };
  const run = (fn: () => void) => () => {
    fn();
    close();
  };
  return (
    <CommandDialog open={open} onOpenChange={(b) => (b ? onOpenChange(true) : close())} title="Ask Jarvis or jump" description="Search views and register rows, or ask Jarvis a question" className="sm:max-w-xl">
      <Command>
      <CommandInput value={q} onValueChange={setQ} placeholder="Ask Jarvis, or type a row, a view, a capability…" />
      <CommandList className="max-h-[60dvh]">
        <CommandEmpty>Press Enter on “Ask Jarvis” to ask it instead.</CommandEmpty>
        {q.trim().length > 1 && (
          <CommandGroup heading="Jarvis" forceMount>
            <CommandItem value={`ask-jarvis ${q}`} forceMount onSelect={run(() => jarvis.ask(q))}>
              <MessageSquareText />
              <span className="truncate">
                Ask Jarvis: <span className="font-medium">{q}</span>
              </span>
              <CommandShortcut>↵</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        )}
        <CommandGroup heading="Rows">
          {visibleIdeas.map((i) => (
            <CommandItem key={i.id} value={`${i.id} ${i.slug} ${i.title} ${(i.aliases ?? []).join(' ')}`} onSelect={run(() => go(view, i.id))}>
              <span className="vi-num w-14 shrink-0 text-xs text-muted-foreground">{i.id}</span>
              <span className="min-w-0 flex-1 truncate">
                <span className="font-medium">{i.slug}</span> <span className="text-muted-foreground">{i.title}</span>
              </span>
              <StageTag stage={i.stage} className="ml-2 shrink-0" />
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Views">
          {VIEWS.map((v) => (
            <CommandItem key={v} value={`view ${LABEL[v]}`} onSelect={run(() => go(v, null))}>
              <LayoutDashboard />
              {LABEL[v]}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Capabilities">
          {reg.capabilities.map((c) => (
            <CommandItem key={c.id} value={`${c.id} ${c.name}`} onSelect={run(() => go('catalogue', c.id))}>
              <Boxes />
              <span className="vi-num w-16 shrink-0 text-xs text-muted-foreground">{c.id}</span>
              <span className="truncate">{c.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem value="brief me jarvis" onSelect={run(() => jarvis.brief())}>
            <Sparkles /> Brief me
          </CommandItem>
          <CommandItem value="open jarvis" onSelect={run(() => jarvis.setOpen(true))}>
            <MessageSquareText /> Open Jarvis
            <CommandShortcut>⌘J</CommandShortcut>
          </CommandItem>
          <CommandItem value="toggle theme dark light" onSelect={run(() => document.querySelector<HTMLButtonElement>('button[aria-label="Dark mode"],button[aria-label="Light mode"]')?.click())}>
            <Moon /> Switch light and dark
          </CommandItem>
        </CommandGroup>
      </CommandList>
      </Command>
    </CommandDialog>
  );
}
