import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Boxes, Columns3, Gauge, GitCompareArrows, LayoutDashboard, ListChecks, ScrollText, Table2, Waypoints } from 'lucide-react';
import { Status } from '@kit/kit';
import type { Audience, Register, SnapshotIndex } from './lib/types';
import { deriveAll, attentionQueue, hoursBetween } from './lib/derive';
import { openNextSteps } from './lib/derive2';
import { ALL_AUDIENCE, LabContext, parseHash, toHash, useLab, VIEWS, type View } from './lib/context';
import { fmtDateTime, relHours } from './lib/format';
import { readLastVisit, writeLastVisit, readPrefs, writePrefs } from './lib/storage';
import { useInbox } from './lib/inbox';
import { Shell, type AgendaChip, type DockItem } from './kit/shell';
import { spring } from './kit/motion';
import { JarvisProvider, useJarvis } from './jarvis/useJarvis';
import { JarvisPanel } from './jarvis/JarvisPanel';
import { localBrief, whenText } from './jarvis/brain';
import Palette from './components/Palette';
import DetailSheet from './components/DetailSheet';
import Command from './views/Command';
import Queue from './views/Queue';
import RegisterView from './views/RegisterView';
import Board from './views/Board';
import Graph from './views/Graph';
import Log from './views/Log';
import Catalogue from './views/Catalogue';
import Scores from './views/Scores';
import Changes from './views/Changes';

const DATA_URL = 'data/register.json';
type LoadState = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; reg: Register };

const NAV: Record<View, { label: string; Icon: DockItem['Icon'] }> = {
  pulse: { label: 'Command center', Icon: LayoutDashboard },
  queue: { label: 'Queue', Icon: ListChecks },
  register: { label: 'Register', Icon: Table2 },
  board: { label: 'Board', Icon: Columns3 },
  graph: { label: 'Graph', Icon: Waypoints },
  catalogue: { label: 'Catalogue', Icon: Boxes },
  scores: { label: 'Scores', Icon: Gauge },
  changes: { label: 'Changes', Icon: GitCompareArrows },
  log: { label: 'Log', Icon: ScrollText },
};

function useWide(px: number): boolean {
  const q = `(min-width: ${px}px)`;
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setWide(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [q]);
  return wide;
}

function initialDark(): boolean {
  const p = readPrefs();
  if (p.theme) return p.theme === 'dark';
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export default function App() {
  const [load, setLoad] = useState<LoadState>({ status: 'loading' });
  const [previous, setPrevious] = useState<{ reg: Register; label: string } | null>(null);
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  const [queueFilter, setQueueFilterState] = useState<string>(() => readPrefs().queueFilter ?? 'all');
  const [audienceId, setAudienceId] = useState<string>(() => readPrefs().audience ?? 'jithin');
  const [dark, setDark] = useState(initialDark);
  const [lastVisit] = useState<string | null>(() => {
    const prev = readLastVisit();
    writeLastVisit(new Date().toISOString().slice(0, 10));
    return prev;
  });
  const now = useMemo(() => new Date(), []);
  const inbox = useInbox();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    let alive = true;
    fetch(DATA_URL, { cache: 'no-store' })
      .then(async (r) => {
        if (!r.ok) throw new Error(`register.json: HTTP ${r.status}`);
        const reg = (await r.json()) as Register;
        const known = ['1.0', '1.1', '1.2', '1.3'];
        if (!known.includes(reg.schemaVersion)) throw new Error(`register.json schema ${reg.schemaVersion} is not one of ${known.join(', ')}; rebuild the page or re-export`);
        if (alive) setLoad({ status: 'ready', reg });
        if (reg.history?.indexUrl) {
          try {
            const ir = await fetch(reg.history.indexUrl, { cache: 'no-store' });
            if (!ir.ok) return;
            const idx = (await ir.json()) as SnapshotIndex;
            const earlier = idx.snapshots.filter((s) => s.asOf < reg.asOf).sort((a, b) => b.asOf.localeCompare(a.asOf))[0];
            if (!earlier) return;
            const sr = await fetch(earlier.file, { cache: 'no-store' });
            if (!sr.ok) return;
            const prevReg = (await sr.json()) as Register;
            if (alive) setPrevious({ reg: prevReg, label: `${fmtDateTime(earlier.asOf)}${earlier.registerRev != null ? `, rev ${earlier.registerRev}` : ''}` });
          } catch {
            /* no history: the Changes view says so */
          }
        }
      })
      .catch((e: unknown) => {
        if (alive) setLoad({ status: 'error', message: e instanceof Error ? e.message : String(e) });
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = useCallback((view: View, id?: string | null) => {
    const next = { view, id: id === undefined ? null : id };
    setRoute(next);
    const h = toHash(next.view, next.id);
    if (window.location.hash !== h) {
      try {
        window.history.replaceState(null, '', h);
      } catch {
        /* a frame may refuse; state already moved */
      }
    }
  }, []);
  const select = useCallback((id: string | null) => go(route.view, id), [go, route.view]);
  const setQueueFilter = useCallback((f: string) => {
    setQueueFilterState(f);
    writePrefs({ ...readPrefs(), queueFilter: f });
  }, []);
  const setAudience = useCallback((id: string) => {
    setAudienceId(id);
    writePrefs({ ...readPrefs(), audience: id });
  }, []);
  const toggleDark = useCallback(() => {
    setDark((d) => {
      writePrefs({ ...readPrefs(), theme: d ? 'light' : 'dark' });
      return !d;
    });
  }, []);

  const derived = useMemo(() => (load.status === 'ready' ? deriveAll(load.reg, now) : null), [load, now]);

  if (load.status === 'loading')
    return (
      <div className="flex min-h-dvh items-center justify-center p-6 text-sm text-muted-foreground">
        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity }}>
          Loading the register…
        </motion.span>
      </div>
    );
  if (load.status === 'error')
    return (
      <div className="flex min-h-dvh items-center justify-center p-6">
        <div className="kit-surface-content max-w-lg p-6">
          <Status tone="critical" word="The register could not be loaded" />
          <p className="mt-2 text-sm text-muted-foreground">{load.message}. The page reads data/register.json next to it; republish the data file from the nightly sync or the last export.</p>
        </div>
      </div>
    );

  const reg = load.reg;
  const audiences: Audience[] = reg.audiences && reg.audiences.length ? reg.audiences : [ALL_AUDIENCE];
  const audience = audiences.find((a) => a.id === audienceId) ?? audiences[0];
  const hidden = (section: string) => audience.hide.includes(section);
  const visibleIdeas = audience.hideFlaggedRows ? reg.ideas.filter((i) => i.sensitivity !== 'flagged') : reg.ideas;

  return (
    <LabContext.Provider
      value={{
        reg,
        derived: derived!,
        now,
        view: route.view,
        selectedId: route.id,
        lastVisit,
        select,
        go,
        queueFilter,
        setQueueFilter,
        audience,
        setAudience,
        hidden,
        visibleIdeas,
        previous: previous?.reg ?? null,
        previousLabel: previous?.label ?? null,
        inbox,
      }}
    >
      <MotionConfig reducedMotion="user">
        <JarvisProvider>
          <Frame dark={dark} toggleDark={toggleDark} audiences={audiences} />
        </JarvisProvider>
      </MotionConfig>
    </LabContext.Provider>
  );
}

function Frame({ dark, toggleDark, audiences }: { dark: boolean; toggleDark: () => void; audiences: Audience[] }) {
  const lab = useLab();
  const jarvis = useJarvis();
  const wide = useWide(1280);
  const [palette, setPalette] = useState(false);
  const { reg, derived, now, view, selectedId, go, select, inbox, visibleIdeas, audience, setAudience } = lab;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((p) => !p);
      } else if (mod && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        jarvis.toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [jarvis]);

  const queueCount = attentionQueue(reg, derived).filter((i) => derived.get(i.id)!.needsDecision).length;
  const changed = lab.lastVisit ? visibleIdeas.filter((i) => i.lastTouched > lab.lastVisit!).length : 0;
  const dock: DockItem[] = VIEWS.map((v) => ({ id: v, label: NAV[v].label, Icon: NAV[v].Icon, badge: v === 'queue' ? queueCount : v === 'changes' ? changed : undefined }));

  // The day's agenda in the pill bar: what is due, most urgent first; the lead chip carries the brand colour.
  const brief = localBrief(reg, derived, now, inbox.docs, visibleIdeas);
  const steps = openNextSteps(reg, now).filter((s) => s.daysLeft != null && s.daysLeft <= 7 && visibleIdeas.some((v) => v.id === s.ideaId));
  const agenda: AgendaChip[] = [];
  if (brief.counts.quick) agenda.push({ key: 'quick', label: `${brief.counts.quick} quick ${brief.counts.quick === 1 ? 'call' : 'calls'}`, lead: true, onClick: () => go('pulse', null) });
  for (const s of steps.slice(0, agenda.length ? 2 : 3)) agenda.push({ key: s.ideaId, label: `${s.ideaId} · ${whenText(s.due!, now)}`, lead: !agenda.length, onClick: () => select(s.ideaId) });
  const dayText = now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const ageH = hoursBetween(reg.asOf, now);

  const suggestions = [
    'Brief me',
    'What needs me today?',
    brief.lead ? `What is blocking ${brief.lead.ideaId}?` : 'Which rows are stale?',
    'Which ideas should the five streams take next?',
    'Where is the portfolio thin?',
  ];
  const Current = VIEW_COMPONENT[view];

  return (
    <Shell
      dock={dock}
      active={view}
      onRoute={(id) => go(id as View, null)}
      dark={dark}
      onToggleDark={toggleDark}
      onAsk={() => setPalette(true)}
      agendaDate={dayText}
      agenda={agenda}
      status={
        <span className="inline-flex items-center gap-2">
          {audiences.length > 1 && (
            <select aria-label="View as" value={audience.id} onChange={(e) => setAudience(e.target.value)} className="h-7 rounded-full border border-foreground/15 bg-background/70 px-2 text-xs">
              {audiences.map((a) => (
                <option key={a.id} value={a.id}>
                  View as {a.name}
                </option>
              ))}
            </select>
          )}
          <Status tone={ageH > 36 ? 'warning' : 'good'} word={`rev ${reg.source.registerRev} · ${ageH > 36 ? `${relHours(ageH)}, not refreshed` : `synced ${relHours(ageH)}`}`} />
        </span>
      }
      jarvisOpen={jarvis.open}
      jarvisState={jarvis.orb}
      onJarvis={jarvis.toggle}
      aside={<AnimatePresence>{jarvis.open && wide && <JarvisPanel key="docked" docked suggestions={suggestions} />}</AnimatePresence>}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ ...spring.soft, opacity: { duration: 0.16 } }}>
          <Current />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>{jarvis.open && !wide && <JarvisPanel key="float" docked={false} suggestions={suggestions} />}</AnimatePresence>
      <DetailSheet id={selectedId} onClose={() => select(null)} opaque={jarvis.open} rightInset={jarvis.open && wide ? 412 : 0} />
      <Palette open={palette} onOpenChange={setPalette} />
    </Shell>
  );
}

const VIEW_COMPONENT: Record<View, () => ReactNode> = {
  pulse: Command,
  queue: Queue,
  register: RegisterView,
  board: Board,
  graph: Graph,
  catalogue: Catalogue,
  scores: Scores,
  changes: Changes,
  log: Log,
};

