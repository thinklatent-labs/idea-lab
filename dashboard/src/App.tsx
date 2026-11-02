import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Audience, Register, SnapshotIndex } from './lib/types';
import { deriveAll, attentionQueue, hoursBetween } from './lib/derive';
import { ALL_AUDIENCE, LabContext, parseHash, toHash, type View } from './lib/context';
import { fmtDateTime, fmtDate, relHours } from './lib/format';
import { readLastVisit, writeLastVisit, readPrefs, writePrefs } from './lib/storage';
import Pulse from './views/Pulse';
import Queue from './views/Queue';
import RegisterView from './views/RegisterView';
import Board from './views/Board';
import Graph from './views/Graph';
import Log from './views/Log';
import Catalogue from './views/Catalogue';
import Scores from './views/Scores';
import Changes from './views/Changes';
import DetailPanel from './components/DetailPanel';

const DATA_URL = 'data/register.json';

type LoadState = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; reg: Register };

const NAV: Record<View, { label: string; icon: string; primary: boolean }> = {
  pulse: { label: 'Pulse', icon: 'M4 12h3l2-6 4 12 2-6h5', primary: true },
  queue: { label: 'Queue', icon: 'M4 6h16M4 12h10M4 18h7', primary: true },
  register: { label: 'Register', icon: 'M4 5h16v14H4zM4 10h16M9 10v9', primary: true },
  board: { label: 'Board', icon: 'M4 5h4v14H4zM10 5h4v9h-4zM16 5h4v6h-4z', primary: false },
  graph: { label: 'Graph', icon: 'M6 6h4v4H6zM14 14h4v4h-4zM10 8l4 8M8 10v4', primary: true },
  catalogue: { label: 'Catalogue', icon: 'M5 5h14v4H5zM5 11h14v4H5zM5 17h9v2H5z', primary: false },
  scores: { label: 'Scores', icon: 'M4 19V9M10 19V5M16 19v-8M22 19H2', primary: false },
  changes: { label: 'Changes', icon: 'M4 7h16M4 12h16M4 17h10M17 15l3 2-3 2', primary: false },
  log: { label: 'Log', icon: 'M5 4h14v16H5zM8 9h8M8 13h8M8 17h5', primary: false },
};

export default function App() {
  const [load, setLoad] = useState<LoadState>({ status: 'loading' });
  const [previous, setPrevious] = useState<{ reg: Register; label: string } | null>(null);
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  const [queueFilter, setQueueFilterState] = useState<string>(() => readPrefs().queueFilter ?? 'all');
  const [audienceId, setAudienceId] = useState<string>(() => readPrefs().audience ?? 'jithin');
  const [moreOpen, setMoreOpen] = useState(false);
  const [lastVisit] = useState<string | null>(() => {
    const prev = readLastVisit();
    writeLastVisit(new Date().toISOString().slice(0, 10));
    return prev;
  });
  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    let alive = true;
    fetch(DATA_URL, { cache: 'no-store' })
      .then(async (r) => {
        if (!r.ok) throw new Error(`register.json: HTTP ${r.status}`);
        const reg = (await r.json()) as Register;
        const known = ['1.0', '1.1', '1.2'];
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
    setMoreOpen(false);
    const h = toHash(next.view, next.id);
    if (window.location.hash !== h) {
      try {
        window.location.hash = h;
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

  const derived = useMemo(() => (load.status === 'ready' ? deriveAll(load.reg, now) : null), [load, now]);

  if (load.status === 'loading') return <div className="loading">Loading the register…</div>;
  if (load.status === 'error')
    return (
      <div className="errorbox">
        <strong>The register could not be loaded.</strong>
        <p className="small" style={{ marginTop: 6 }}>
          {load.message}. The page reads data/register.json next to it; republish the data file from the nightly sync or the last manual export.
        </p>
      </div>
    );

  const reg = load.reg;
  const audiences: Audience[] = reg.audiences && reg.audiences.length ? reg.audiences : [ALL_AUDIENCE];
  const audience = audiences.find((a) => a.id === audienceId) ?? audiences[0];
  const hidden = (section: string) => audience.hide.includes(section);
  const visibleIdeas = audience.hideFlaggedRows ? reg.ideas.filter((i) => i.sensitivity !== 'flagged') : reg.ideas;
  const queueCount = attentionQueue(reg, derived!).filter((i) => derived!.get(i.id)!.needsDecision).length;
  const ageH = hoursBetween(reg.asOf, now);
  const old = ageH > 36;

  const content = (() => {
    switch (route.view) {
      case 'pulse':
        return <Pulse />;
      case 'queue':
        return <Queue />;
      case 'register':
        return <RegisterView />;
      case 'board':
        return <Board />;
      case 'graph':
        return <Graph />;
      case 'catalogue':
        return <Catalogue />;
      case 'scores':
        return <Scores />;
      case 'changes':
        return <Changes />;
      case 'log':
        return <Log />;
    }
  })();

  const navButton = (v: View) => (
    <button key={v} type="button" aria-current={route.view === v ? 'page' : undefined} onClick={() => go(v, route.id)}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={NAV[v].icon} />
      </svg>
      {NAV[v].label}
      {v === 'queue' && queueCount > 0 && <span className="count">{queueCount}</span>}
    </button>
  );
  const secondary = (Object.keys(NAV) as View[]).filter((v) => !NAV[v].primary);

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
      }}
    >
      <div className="app">
        <header className="topbar">
          <div className="brand">
            <h1>Idea Lab</h1>
            <small>{reg.ideas.length} rows · register rev {reg.source.registerRev}</small>
          </div>
          <div className="asof" title={reg.generatedBy}>
            {audiences.length > 1 && (
              <label className="aud">
                <span className="faint tiny">View as</span>
                <select id="audience" value={audience.id} onChange={(e) => setAudience(e.target.value)} aria-label="Audience preset">
                  {audiences.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <span>as of {fmtDateTime(reg.asOf)}</span>
            <span className={`freshness${old ? ' old' : ''}`}>
              <span className="dot" />
              {old ? `${relHours(ageH)}, not refreshed` : relHours(ageH)}
            </span>
          </div>
        </header>
        <div className="frame">
          <nav className="nav" aria-label="Views">
            {(Object.keys(NAV) as View[]).filter((v) => NAV[v].primary).map(navButton)}
            <button type="button" className="more" aria-expanded={moreOpen} aria-current={secondary.includes(route.view) ? 'page' : undefined} onClick={() => setMoreOpen(!moreOpen)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h.01M12 12h.01M19 12h.01" />
              </svg>
              {secondary.includes(route.view) ? NAV[route.view].label : 'More'}
            </button>
            <div className="rail-secondary">{secondary.map(navButton)}</div>
          </nav>
          {moreOpen && (
            <div className="more-menu" role="menu">
              {secondary.map((v) => (
                <button key={v} type="button" role="menuitem" aria-current={route.view === v ? 'page' : undefined} onClick={() => go(v, route.id)}>
                  {NAV[v].label}
                </button>
              ))}
            </div>
          )}
          <main className="main">{content}</main>
          <aside className="detail-col">
            <DetailPanel id={route.id} variant="column" />
          </aside>
          {route.id && (
            <>
              <div className="sheet-backdrop" onClick={() => select(null)} />
              <div className="sheet" role="dialog" aria-label="Detail">
                <div className="sheet-head">
                  <button type="button" className="btn small" onClick={() => select(null)}>
                    Close
                  </button>
                  <span className="faint small">Detail</span>
                  {previous && <span className="faint tiny" style={{ marginLeft: 'auto' }}>vs {fmtDate(previous.reg.asOf)}</span>}
                </div>
                <div className="sheet-body">
                  <DetailPanel id={route.id} variant="sheet" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </LabContext.Provider>
  );
}
