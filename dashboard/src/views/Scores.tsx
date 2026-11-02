import { useMemo, useState } from 'react';
import { useLab } from '../lib/context';
import { rankUnder, evidenceMap, predictionLedger, calibration } from '../lib/derive2';
import { fmtDate } from '../lib/format';
import { CRITERIA, type Criterion, type Weights } from '../lib/types';
import { RUBRIC } from '../lib/rubric';
import { Section } from '../components/ui';

export default function Scores() {
  const { reg, select, hidden, visibleIdeas } = useLab();
  const [trial, setTrial] = useState<Weights>({ ...reg.weights });
  const [preset, setPreset] = useState<'in-force' | 'proposed' | 'scenario'>('in-force');

  const sum = CRITERIA.reduce((a, c) => a + trial[c], 0);
  const normalised = useMemo(() => {
    const out = {} as Weights;
    for (const c of CRITERIA) out[c] = sum > 0 ? trial[c] / sum : 1 / CRITERIA.length;
    return out;
  }, [trial, sum]);
  const inForce = useMemo(() => rankUnder(reg, reg.weights), [reg]);
  const scenario = useMemo(() => rankUnder(reg, normalised), [reg, normalised]);
  const scored = visibleIdeas.filter((i) => i.score.criteria);
  const unscored = visibleIdeas.length - scored.length;
  const bar = reg.portfolioBar ?? reg.proposedPortfolioBar ?? null;
  const points = useMemo(() => evidenceMap(reg).filter((p) => visibleIdeas.some((i) => i.id === p.ideaId)), [reg, visibleIdeas]);
  const ledger = useMemo(() => predictionLedger(reg).filter((r) => visibleIdeas.some((i) => i.id === r.ideaId)), [reg, visibleIdeas]);
  const cal = useMemo(() => calibration(ledger), [ledger]);
  const resolved = ledger.filter((r) => r.result === 'confirmed' || r.result === 'refuted').length;

  const apply = (w: Weights, p: typeof preset) => {
    setTrial({ ...w });
    setPreset(p);
  };
  const setOne = (c: Criterion, v: number) => {
    setTrial({ ...trial, [c]: v });
    setPreset('scenario');
  };

  if (hidden('rubric'))
    return (
      <>
        <div className="view-title">
          <h2>Scores</h2>
        </div>
        <p className="empty">Rubric scores are not part of this audience's view.</p>
      </>
    );

  return (
    <>
      <div className="view-title">
        <div>
          <h2>Scores and evidence</h2>
          <p>
            The eight criteria by idea, the composite under the weights in force and under a trial set, then score against evidence, and the predictions every proposal pre-registered. Sliders re-rank live and save nothing.
          </p>
        </div>
      </div>

      <div className="card pad">
        <Section title="Weights" aside={preset === 'in-force' ? 'in force' : preset === 'proposed' ? 'proposed for this quarter' : 'scenario, unsaved'}>
          <div className="row" style={{ marginBottom: 10 }}>
            <button type="button" className="chip toggle" aria-pressed={preset === 'in-force'} onClick={() => apply(reg.weights, 'in-force')}>
              In force (equal)
            </button>
            {reg.proposedWeights && (
              <button type="button" className="chip toggle" aria-pressed={preset === 'proposed'} onClick={() => apply(reg.proposedWeights!, 'proposed')}>
                Proposed
              </button>
            )}
            <span className="faint tiny">weights are normalised to sum to 1</span>
          </div>
          <div className="sliders">
            {CRITERIA.map((c) => (
              <label key={c} className="slider-row" title={`A 5 is “${RUBRIC[c].five}”; a 1 is “${RUBRIC[c].one}”`}>
                <span>{RUBRIC[c].name}</span>
                <input id={`w-${c}`} type="range" min={0} max={40} step={1} value={Math.round(trial[c] * 100)} onChange={(e) => setOne(c, Number(e.target.value) / 100)} />
                <span className="faint">{Math.round(normalised[c] * 100)}%</span>
              </label>
            ))}
          </div>
        </Section>
      </div>

      <div className="card pad">
        <Section title="Matrix" aside={`${scored.length} scored${unscored ? `, ${unscored} not yet (scored at Stress test)` : ''}`}>
          {scored.length === 0 ? (
            <p className="empty">No idea carries the eight criteria yet; scores land at Stress test.</p>
          ) : (
            <div className="table-wrap">
            <table className="matrix">
              <thead>
                <tr>
                  <th>Idea</th>
                  {CRITERIA.map((c) => (
                    <th key={c} title={RUBRIC[c].name}>
                      {RUBRIC[c].name.split(' ')[0]}
                    </th>
                  ))}
                  <th>In force</th>
                  <th>Scenario</th>
                  <th>Rank</th>
                </tr>
              </thead>
              <tbody>
                {scored
                  .map((i) => ({ i, a: inForce.find((r) => r.id === i.id)!, b: scenario.find((r) => r.id === i.id)! }))
                  .sort((x, y) => (y.b.composite ?? 0) - (x.b.composite ?? 0))
                  .map(({ i, a, b }) => (
                    <tr key={i.id} style={{ cursor: 'pointer' }} onClick={() => select(i.id)}>
                      <td>
                        <strong>{i.id}</strong> {i.slug}
                        <div className="faint tiny">{i.score.status}{i.score.date ? `, ${i.score.date}` : ''}</div>
                      </td>
                      {CRITERIA.map((c) => (
                        <td key={c} className="cell" style={{ ['--v' as string]: i.score.criteria?.[c] ?? 0 }}>
                          {i.score.criteria?.[c] ?? '—'}
                        </td>
                      ))}
                      <td>{a.composite?.toFixed(2)}</td>
                      <td style={{ fontWeight: 600, color: bar != null && b.composite != null && b.composite < bar ? 'var(--warn)' : undefined }}>{b.composite?.toFixed(2)}</td>
                      <td>
                        {b.rank}
                        {a.rank != null && b.rank != null && a.rank !== b.rank ? <span className="faint tiny"> (was {a.rank})</span> : ''}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>
          )}
          <p className="faint small" style={{ marginTop: 8 }}>
            {bar != null ? `Portfolio bar ${bar}${reg.portfolioBar == null ? ' (proposed, not in force)' : ''}: a composite below it does not proceed to Proposal without a stated reason.` : 'No portfolio bar is set yet.'}{' '}
            Reversibility and compounding are tie-breakers, not drivers.
          </p>
        </Section>
      </div>

      <div className="card pad evmap">
        <Section title="Score against evidence" aside="bubble size = sessions">
          {points.every((p) => p.score == null && p.evidence == null) ? (
            <p className="empty">No idea has both a score and an evidence value yet. Evidence strength per hypothesis (0 opinion, 1 one experiment, 2 repeated) is a proposed register field; scores land at Stress test.</p>
          ) : (
            <>
              <EvidenceChart points={points} onPick={select} />
              {points.filter((p) => p.score == null || p.evidence == null).length > 0 && (
                <p className="faint tiny">Not plotted (no score or no evidence value): {points.filter((p) => p.score == null || p.evidence == null).map((p) => p.ideaId).join(', ')}.</p>
              )}
            </>
          )}
          <p className="faint small" style={{ marginTop: 8 }}>
            Strategyzer's rule, as the lab adopts it: nothing reaches Proposal on strategic fit alone. A high score with evidence at 0 is opinion.
          </p>
        </Section>
      </div>

      <div className="card pad">
        <Section title="Prediction ledger" aside={`${ledger.length} predictions, ${resolved} resolved`}>
          {ledger.length === 0 ? (
            <p className="empty">No pre-registered hypotheses in the register yet.</p>
          ) : (
            <div className="table-wrap">
              <table className="plain ledger">
                <thead>
                  <tr>
                    <th>Idea</th>
                    <th>Claim</th>
                    <th>Confidence</th>
                    <th>Evidence</th>
                    <th>Resolve by</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {ledger.map((r, n) => (
                    <tr key={n} style={{ cursor: 'pointer' }} onClick={() => select(r.ideaId)}>
                      <td>{r.ideaId}</td>
                      <td>{r.claim}</td>
                      <td className="conf">{r.confidence != null ? `${r.confidence}%` : 'not set'}</td>
                      <td>{r.evidence != null ? ['opinion', 'one experiment', 'repeated'][r.evidence] : 'not set'}</td>
                      <td>{r.resolveBy ? fmtDate(r.resolveBy) : '—'}</td>
                      <td>{r.result ?? 'open'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="faint small" style={{ marginTop: 8 }}>
            Calibration, once predictions resolve: {resolved === 0 ? 'nothing has resolved yet, so there is no chart to draw; the first reads land at the six-month retrospectives.' : cal.filter((b) => b.n > 0).map((b) => `${b.band}% confidence: ${b.confirmed} of ${b.n} confirmed`).join('; ')}
          </p>
        </Section>
      </div>
    </>
  );
}

function EvidenceChart({ points, onPick }: { points: ReturnType<typeof evidenceMap>; onPick: (id: string) => void }) {
  const W = 640;
  const H = 260;
  const left = 48;
  const bottom = H - 36;
  const x = (e: number) => left + 36 + (e / 2) * (W - left - 72);
  const y = (s: number) => bottom - ((s - 1) / 4) * (bottom - 24);
  const maxS = Math.max(1, ...points.map((p) => p.sessions));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Score against evidence strength">
      <line className="axis" x1={left} x2={W - 24} y1={bottom} y2={bottom} />
      <line className="axis" x1={left} x2={left} y1={24} y2={bottom} />
      {[1, 2, 3, 4, 5].map((v) => (
        <text key={v} x={left - 8} y={y(v) + 4} textAnchor="end">
          {v}
        </text>
      ))}
      {[0, 1, 2].map((e) => (
        <text key={e} x={x(e)} y={bottom + 16} textAnchor="middle">
          {['opinion', 'one experiment', 'repeated'][e]}
        </text>
      ))}
      <text x={left - 8} y={14} textAnchor="end" fontSize="10">
        score
      </text>
      <text x={W - 24} y={bottom + 30} textAnchor="end" fontSize="10">
        evidence
      </text>
      {points
        .filter((p) => p.score != null && p.evidence != null)
        .map((p) => (
          <g key={p.ideaId} onClick={() => onPick(p.ideaId)}>
            <circle cx={x(p.evidence!)} cy={y(p.score!)} r={6 + (p.sessions / maxS) * 14}>
              <title>{`${p.ideaId}: score ${p.score}, evidence ${p.evidence!.toFixed(1)}, ${p.sessions} sessions`}</title>
            </circle>
            <text x={x(p.evidence!)} y={y(p.score!) - 10 - (p.sessions / maxS) * 14} textAnchor="middle">
              {p.ideaId}
            </text>
          </g>
        ))}
    </svg>
  );
}
