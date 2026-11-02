import { useMemo, useState } from 'react';
import { useLab } from '../lib/context';
import { STAGES, NODE_TYPES, HORIZONS, type Idea, type Stage } from '../lib/types';
import { fmtDate } from '../lib/format';
import { Horizon, NewChip, StageMark, TypeBadge } from '../components/ui';
import { healthOf, updateState } from '../lib/derive2';

type SortKey = 'id' | 'stage' | 'score' | 'touched' | 'attention';
const STAGE_ORDER: Record<Stage, number> = { Seed: 0, Shaping: 1, 'Stress test': 2, Proposal: 3, Building: 4, Shipped: 5, Graduated: 6, Parked: 7, Killed: 8 };

export default function RegisterView() {
  const { reg, derived, now, selectedId, select, lastVisit, visibleIdeas, hidden } = useLab();
  const [stalledOnly, setStalledOnly] = useState(false);
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [stage, setStage] = useState('');
  const [horizon, setHorizon] = useState('');
  const [theme, setTheme] = useState('');
  const [sort, setSort] = useState<SortKey>('id');
  const [asc, setAsc] = useState(true);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = visibleIdeas.filter((i) => {
      if (stalledOnly && !(derived.get(i.id)!.stale || (derived.get(i.id)!.window != null && (derived.get(i.id)!.daysInStage ?? 0) > derived.get(i.id)!.window!))) return false;
      if (type && i.type !== type) return false;
      if (stage && i.stage !== stage) return false;
      if (horizon && i.horizon !== horizon) return false;
      if (theme === 'none' ? i.themeIds.length > 0 : theme && !i.themeIds.includes(theme)) return false;
      if (needle) {
        const hay = [i.id, i.slug, i.title, i.owner, i.nextStep, ...(i.aliases ?? [])].join(' ').toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    const cmp = (a: Idea, b: Idea): number => {
      switch (sort) {
        case 'stage':
          return STAGE_ORDER[a.stage] - STAGE_ORDER[b.stage];
        case 'score':
          return (b.score.composite ?? -1) - (a.score.composite ?? -1);
        case 'touched':
          return b.lastTouched.localeCompare(a.lastTouched);
        case 'attention':
          return derived.get(b.id)!.attention - derived.get(a.id)!.attention;
        default:
          return a.id.localeCompare(b.id);
      }
    };
    list = [...list].sort((a, b) => (asc ? cmp(a, b) : -cmp(a, b)));
    return list;
  }, [visibleIdeas, derived, q, type, stage, horizon, theme, sort, asc, stalledOnly]);

  const head = (key: SortKey, label: string) => (
    <th
      onClick={() => {
        if (sort === key) setAsc(!asc);
        else {
          setSort(key);
          setAsc(true);
        }
      }}
      aria-sort={sort === key ? (asc ? 'ascending' : 'descending') : 'none'}
    >
      {label}
      {sort === key ? (asc ? ' ↑' : ' ↓') : ''}
    </th>
  );

  return (
    <>
      <div className="view-title">
        <div>
          <h2>Register</h2>
          <p>Every row as the live register holds it. Tap a row for its lab record, links, decisions and next step.</p>
        </div>
      </div>
      <div className="row">
        <input id="reg-search" type="search" placeholder="Search id, slug, title, alias, owner…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search the register" />
        <select id="reg-type" value={type} onChange={(e) => setType(e.target.value)} aria-label="Type">
          <option value="">All types</option>
          {NODE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select id="reg-stage" value={stage} onChange={(e) => setStage(e.target.value)} aria-label="Stage">
          <option value="">All stages</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select id="reg-horizon" value={horizon} onChange={(e) => setHorizon(e.target.value)} aria-label="Horizon">
          <option value="">All horizons</option>
          {HORIZONS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <select id="reg-theme" value={theme} onChange={(e) => setTheme(e.target.value)} aria-label="Theme">
          <option value="">All themes</option>
          {reg.themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.id} {t.name.split(':')[0]}
            </option>
          ))}
          <option value="none">No theme</option>
        </select>
        <button type="button" className="chip toggle" aria-pressed={stalledOnly} onClick={() => setStalledOnly(!stalledOnly)}>
          Stalled only
        </button>
        <select id="reg-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Sort">
          <option value="id">Sort: ID</option>
          <option value="stage">Sort: stage</option>
          <option value="score">Sort: score</option>
          <option value="touched">Sort: last touched</option>
          <option value="attention">Sort: attention</option>
        </select>
      </div>
      <div className="table-wrap">
        <table className="register">
          <thead>
            <tr>
              {head('id', 'ID')}
              <th>Title</th>
              <th>Type</th>
              <th>Parent</th>
              <th>Stream</th>
              {head('stage', 'Stage')}
              <th>In stage</th>
              <th>Health</th>
              <th>Horizon</th>
              {!hidden('rubric') && head('score', 'Score')}
              <th>Owner</th>
              <th>Doc</th>
              {head('touched', 'Touched')}
              <th>Next step</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((i) => {
              const d = derived.get(i.id)!;
              return (
                <tr key={i.id} aria-current={selectedId === i.id ? 'true' : undefined} onClick={() => select(i.id)}>
                  <td className="lead" data-label="ID">
                    <span className="id">{i.id}</span> <span className="slug">{i.slug}</span>
                    <NewChip show={!!lastVisit && i.lastTouched > lastVisit} />
                  </td>
                  <td className="lead" data-label="Title">
                    {i.title}
                  </td>
                  <td data-label="Type">
                    <TypeBadge type={i.type} />
                  </td>
                  <td data-label="Parent">{i.parentId ?? '—'}</td>
                  <td data-label="Stream">{i.streamId ?? '—'}</td>
                  <td data-label="Stage">
                    <StageMark stage={i.stage} note={i.stageNote} />
                    {d.stale && <span className="chip stale" style={{ marginLeft: 6 }}>stale</span>}
                  </td>
                  <td data-label="In stage">{d.daysInStage != null ? `${d.daysInStage} d` : 'not recorded'}{d.window != null && d.daysInStage != null && d.daysInStage > d.window ? <span className="chip warn" style={{ marginLeft: 6 }}>stalled</span> : null}</td>
                  <td data-label="Health">
                    {(() => {
                      const h = healthOf(reg, i.id);
                      const u = updateState(reg, i, now);
                      if (i.stage === 'Graduated' || i.stage === 'Killed') return <span className="faint">—</span>;
                      if (u.level === 'warn' || u.level === 'alert') return <span className="health" data-h="missing">update missing</span>;
                      return h ? <span className="health" data-h={h.health}>{h.health.replace('-', ' ')}</span> : <span className="faint">no call yet</span>;
                    })()}
                  </td>
                  <td data-label="Horizon">
                    <Horizon h={i.horizon} />
                  </td>
                  {!hidden('rubric') && <td data-label="Score">{i.score.composite != null ? `${i.score.composite.toFixed(1)} ${i.score.status}` : '—'}</td>}
                  <td data-label="Owner">{i.owner}</td>
                  <td data-label="Doc">
                    {i.docUrl ? (
                      <a href={i.docUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                        open
                      </a>
                    ) : (
                      (i.docTitle ?? '—')
                    )}
                  </td>
                  <td data-label="Touched">{fmtDate(i.lastTouched)}</td>
                  <td className="next" data-label="Next">
                    {i.nextStep}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="faint small">
        {rows.length} of {visibleIdeas.length} rows. Standard in force: {reg.standardVersion}. Staleness windows: Seed {reg.stalenessWindows.Seed}, Shaping {reg.stalenessWindows.Shaping}, Stress test{' '}
        {reg.stalenessWindows['Stress test']}, Proposal {reg.stalenessWindows.Proposal}{reg.stalenessWindows.Shipped != null ? `, Shipped ${reg.stalenessWindows.Shipped}` : ''} days; Building by its appetite; Parked by its re-check date.
      </p>
    </>
  );
}
