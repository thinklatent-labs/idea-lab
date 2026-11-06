import { useMemo, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Gauge, Target } from 'lucide-react';
import { Bars, DotGrid, Status, Surface, Tile } from '@kit/kit';
import { Slider } from '@kit/ui/components/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@kit/ui/components/tooltip';
import { cn } from '@kit/ui/lib/utils';
import { useLab } from '../lib/context';
import { rankUnder, evidenceMap, predictionLedger, calibration } from '../lib/derive2';
import { fmtDate, plural } from '../lib/format';
import { CRITERIA, type Criterion, type Weights } from '../lib/types';
import { RUBRIC } from '../lib/rubric';
import { Dash, EmptyNote, IdLink, SectionHead, Segmented } from '../kit/parts';
import { CountUp, Stagger, StaggerItem, spring } from '../kit/motion';

type Preset = 'in-force' | 'proposed' | 'scenario';
const EVIDENCE = ['opinion', 'one experiment', 'repeated'] as const;
const SHORT: Record<Criterion, string> = {
  strategicFit: 'Fit',
  evidenceOfNeed: 'Need',
  differentiation: 'Diff',
  feasibility: 'Feas',
  valueAtStake: 'Value',
  governanceExposure: 'Gov',
  reversibility: 'Rev',
  compounding: 'Comp',
};

function ViewHeader({ kicker, title, caption, actions }: { kicker: ReactNode; title: string; caption: ReactNode; actions?: ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 pt-1">
      <div className="min-w-0">
        <div className="kit-caption">{kicker}</div>
        <h1 className="mt-1.5 text-[30px] leading-tight font-normal tracking-tight md:text-[34px]">{title}</h1>
        <p className="mt-1.5 max-w-[720px] text-sm text-muted-foreground">{caption}</p>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

const pct = (v: number) => `${Math.round(v * 100)}%`;

export default function Scores() {
  const { reg, select, hidden, visibleIdeas } = useLab();
  const [trial, setTrial] = useState<Weights>({ ...reg.weights });
  const [preset, setPreset] = useState<Preset>('in-force');

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

  const rows = scored
    .map((i) => ({ i, a: inForce.find((r) => r.id === i.id)!, b: scenario.find((r) => r.id === i.id)! }))
    .sort((x, y) => (y.b.composite ?? 0) - (x.b.composite ?? 0));
  const above = bar != null ? rows.filter((r) => r.b.composite != null && r.b.composite >= bar).length : null;
  const presetWord = preset === 'in-force' ? 'in-force' : preset === 'proposed' ? 'proposed' : 'trial';

  const apply = (p: Preset) => {
    if (p === 'in-force') setTrial({ ...reg.weights });
    if (p === 'proposed' && reg.proposedWeights) setTrial({ ...reg.proposedWeights });
    setPreset(p);
  };
  const setOne = (c: Criterion, v: number) => {
    setTrial((t) => ({ ...t, [c]: v }));
    setPreset('scenario');
  };

  const header = (
    <ViewHeader
      kicker={`${scored.length} of ${plural(visibleIdeas.length, 'row')} scored · ${bar != null ? `portfolio bar ${bar}${reg.portfolioBar == null ? ' (proposed)' : ''}` : 'no portfolio bar'}`}
      title="Scores and evidence"
      caption="The eight criteria by idea, the composite under the weights in force and under a trial set, score against evidence, and the predictions every proposal pre-registered. The sliders re-rank live and save nothing."
      actions={
        hidden('rubric') ? undefined : (
          <Segmented
            id="score-preset"
            size="sm"
            value={preset}
            onChange={apply}
            options={[
              { value: 'in-force' as Preset, label: 'In force' },
              ...(reg.proposedWeights ? [{ value: 'proposed' as Preset, label: 'Proposed' }] : []),
              { value: 'scenario' as Preset, label: 'Trial' },
            ]}
          />
        )
      }
    />
  );

  if (hidden('rubric'))
    return (
      <div className="flex flex-col gap-5">
        {header}
        <EmptyNote>Rubric scores are not part of this audience's view.</EmptyNote>
      </div>
    );

  return (
    <div className="flex flex-col gap-5">
      {header}

      <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" gap={0.06}>
        <StaggerItem>
          <Tile icon={<Gauge />} title="Scored rows" value={<CountUp value={scored.length} />} unit={`of ${visibleIdeas.length}`} caption={unscored ? `${plural(unscored, 'row')} not yet; scores land at Stress test` : 'every row carries the eight criteria'} spark={<DotGrid on={scored.length} total={Math.max(scored.length, Math.min(24, visibleIdeas.length))} cols={8} />} />
        </StaggerItem>
        <StaggerItem>
          <Tile
            icon={<Target />}
            title="At or above the bar"
            value={above != null ? <CountUp value={above} /> : '—'}
            unit={above != null ? `of ${rows.length}` : undefined}
            caption={bar != null ? `composite ${bar} or more under the ${presetWord} weights` : 'no portfolio bar is set yet'}
            spark={rows.length > 1 ? <Bars values={rows.map((r) => r.b.composite ?? 0)} lit={0} /> : undefined}
          />
        </StaggerItem>
        <StaggerItem className="sm:col-span-2 xl:col-span-1">
          <Tile icon={<FlaskConical />} title="Predictions" value={<CountUp value={ledger.length} />} unit={`${resolved} resolved`} caption="pre-registered hypotheses; calibration needs resolved ones" spark={ledger.length ? <DotGrid on={resolved} total={Math.min(24, ledger.length)} cols={8} /> : undefined} />
        </StaggerItem>
      </Stagger>

      <Surface>
        <SectionHead
          title="Weights"
          caption={`${preset === 'in-force' ? 'The weights in force this quarter' : preset === 'proposed' ? 'The weights proposed for the quarter' : 'A trial set, unsaved'}; normalised to sum to 1. Hover a criterion for what a 5 and a 1 mean.`}
        />
        <div className="mt-4 hidden grid-cols-[minmax(0,190px)_1fr_150px_64px] items-center gap-4 px-4 pb-1 md:grid">
          <span className="kit-caption">Criterion</span>
          <span className="kit-caption">Trial weight</span>
          <span className="kit-caption">In force and proposed</span>
          <span className="kit-caption text-right">Trial</span>
        </div>
        <div className="mt-2 space-y-1.5 md:mt-0">
          {CRITERIA.map((c, k) => {
            const f = reg.weights[c];
            const p = reg.proposedWeights?.[c];
            return (
              <div key={c} className="lab-row grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-4 py-3 md:grid-cols-[minmax(0,190px)_1fr_150px_64px]">
                <Tooltip>
                  <TooltipTrigger render={<span className="w-fit cursor-help text-sm font-medium underline decoration-foreground/15 decoration-dotted underline-offset-4">{RUBRIC[c].name}</span>} />
                  <TooltipContent className="max-w-xs">
                    A 5 is “{RUBRIC[c].five}”; a 1 is “{RUBRIC[c].one}”
                  </TooltipContent>
                </Tooltip>
                <span className="kit-display kit-num text-right text-[22px] md:order-last">{pct(normalised[c])}</span>
                <Slider className="col-span-2 md:col-span-1" min={0} max={40} step={1} value={[Math.round(trial[c] * 100)]} onValueChange={(v) => setOne(c, (Array.isArray(v) ? Number(v[0]) : Number(v)) / 100)} aria-label={`${RUBRIC[c].name} trial weight`} />
                <div className="col-span-2 space-y-1 md:col-span-1">
                  <PairBar label="in force" value={f} delay={0.03 * k} />
                  {p != null ? <PairBar label="proposed" value={p} delay={0.03 * k + 0.05} brand /> : <span className="text-[11px] text-muted-foreground">no proposed set</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Surface>

      <Surface>
        <SectionHead
          title="Matrix"
          count={scored.length}
          caption={`${bar != null ? `Portfolio bar ${bar}${reg.portfolioBar == null ? ' (proposed, not in force)' : ''}: a composite below it does not proceed to Proposal without a stated reason. ` : 'No portfolio bar is set yet. '}Reversibility and compounding are tie-breakers, not drivers. Ranked under the ${presetWord} weights.`}
        />
        {scored.length === 0 ? (
          <EmptyNote className="mt-4">No idea carries the eight criteria yet; scores land at Stress test.</EmptyNote>
        ) : (
          <div className="lab-noscroll -mx-2 mt-4 overflow-x-auto px-2">
            <div className="min-w-[780px]">
              <div className="grid grid-cols-[minmax(150px,1.3fr)_repeat(8,46px)_minmax(170px,1fr)_64px] items-end gap-2 px-3.5 pb-2">
                <span className="kit-caption">Idea</span>
                {CRITERIA.map((c) => (
                  <span key={c} className="kit-caption text-center" title={RUBRIC[c].name}>
                    {SHORT[c]}
                  </span>
                ))}
                <span className="kit-caption">Composite</span>
                <span className="kit-caption text-right">Rank</span>
              </div>
              <Stagger className="space-y-1.5" gap={0.04}>
                {rows.map(({ i, a, b }) => {
                  const below = bar != null && b.composite != null && b.composite < bar;
                  return (
                    <StaggerItem key={i.id} y={8}>
                      <button type="button" onClick={() => select(i.id)} className="lab-row grid w-full grid-cols-[minmax(150px,1.3fr)_repeat(8,46px)_minmax(170px,1fr)_64px] items-center gap-2 px-3.5 py-2.5 text-left transition-transform active:scale-[0.995]">
                        <span className="min-w-0">
                          <span className="block truncate text-sm">
                            <span className="kit-num font-medium">{i.id}</span> {i.slug}
                          </span>
                          <span className="block text-[11px] text-muted-foreground">
                            {i.score.status}
                            {i.score.date ? `, ${fmtDate(i.score.date)}` : ''}
                          </span>
                        </span>
                        {CRITERIA.map((c) => {
                          const v = i.score.criteria?.[c];
                          return (
                            <span key={c} className="kit-num relative flex h-8 items-center justify-center rounded-[10px] text-xs" title={`${RUBRIC[c].name}: ${v ?? 'not scored'}`}>
                              <span className="absolute inset-0 rounded-[10px] bg-[var(--kit-brand)]" style={{ opacity: v == null ? 0 : 0.08 + (v / 5) * 0.5 }} />
                              <span className="relative">{v ?? '—'}</span>
                            </span>
                          );
                        })}
                        <span className="min-w-0">
                          <span className="flex items-baseline justify-between gap-2">
                            <span className="kit-num text-sm font-medium">{b.composite?.toFixed(2) ?? '—'}</span>
                            <span className="truncate text-[11px] text-muted-foreground">{below ? 'below the bar' : a.composite != null && a.composite !== b.composite ? `in force ${a.composite.toFixed(2)}` : ''}</span>
                          </span>
                          <span className="lab-track relative mt-1.5 block h-1.5 rounded-full">
                            <motion.span className="absolute inset-y-0 left-0 rounded-full" style={{ background: below ? 'var(--kit-decision)' : 'currentColor' }} initial={{ width: 0 }} animate={{ width: `${((b.composite ?? 0) / 5) * 100}%` }} transition={spring.soft} />
                            {bar != null && <span className="absolute -top-1 h-3.5 w-px bg-foreground/60" style={{ left: `${(bar / 5) * 100}%` }} title={`Portfolio bar ${bar}`} />}
                          </span>
                        </span>
                        <span className="text-right">
                          <span className="kit-num text-sm font-medium">{b.rank != null ? `#${b.rank}` : '—'}</span>
                          {a.rank != null && b.rank != null && a.rank !== b.rank && <span className="block text-[11px] text-muted-foreground">was #{a.rank}</span>}
                        </span>
                      </button>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </div>
        )}
      </Surface>

      <Surface>
        <SectionHead title="Score against evidence" caption="Each bubble is a scored row: up the side by its composite, along the bottom by the mean evidence behind its hypotheses; bubble size is the number of sessions. Nothing reaches Proposal on strategic fit alone: a high score with evidence at 0 is opinion." />
        {points.every((p) => p.score == null || p.evidence == null) ? (
          <EmptyNote className="mt-4">No idea has both a score and an evidence value yet. Evidence strength per hypothesis (0 opinion, 1 one experiment, 2 repeated) comes from the register; scores land at Stress test.</EmptyNote>
        ) : (
          <>
            <div className="lab-noscroll -mx-2 mt-3 overflow-x-auto px-2">
              <EvidenceChart points={points} onPick={select} />
            </div>
            {points.filter((p) => p.score == null || p.evidence == null).length > 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                Not plotted (no score or no evidence value):{' '}
                {points
                  .filter((p) => p.score == null || p.evidence == null)
                  .map((p) => p.ideaId)
                  .join(', ')}
                .
              </p>
            )}
          </>
        )}
      </Surface>

      <Surface>
        <SectionHead title="Prediction ledger" count={ledger.length} caption={`Every hypothesis a proposal pre-registered, with the confidence it was given; ${resolved} resolved so far.`} />
        {ledger.length === 0 ? (
          <EmptyNote className="mt-4">No pre-registered hypotheses in the register yet.</EmptyNote>
        ) : (
          <div className="mt-4 space-y-1.5">
            <div className="hidden grid-cols-[72px_1fr_96px_120px_104px_110px] gap-3 px-4 pb-1 md:grid">
              {['Idea', 'Claim', 'Confidence', 'Evidence', 'Resolve by', 'Result'].map((h) => (
                <span key={h} className="kit-caption">
                  {h}
                </span>
              ))}
            </div>
            {ledger.map((r, n) => (
              <div key={n} className="lab-row grid gap-x-3 gap-y-1.5 px-4 py-3 md:grid-cols-[72px_1fr_96px_120px_104px_110px] md:items-center">
                <IdLink id={r.ideaId} onOpen={select} className="kit-num w-fit text-xs" />
                <p className="text-sm leading-snug">{r.claim}</p>
                <span className="text-sm">
                  {r.confidence != null ? (
                    <>
                      <span className="kit-num font-medium">{r.confidence}%</span> <span className="text-[11px] text-muted-foreground md:block">confident</span>
                    </>
                  ) : (
                    <Dash reason="not recorded" />
                  )}
                </span>
                <span className="text-sm">{r.evidence != null ? EVIDENCE[r.evidence] : <Dash reason="not recorded" />}</span>
                <span className="kit-num text-sm">{r.resolveBy ? fmtDate(r.resolveBy) : <Dash reason="not due" />}</span>
                <span>
                  <Status tone={r.result === 'confirmed' ? 'good' : r.result === 'refuted' ? 'critical' : 'neutral'} word={r.result ? `${r.result[0].toUpperCase()}${r.result.slice(1)}` : 'Open'} />
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <div className="kit-caption mb-2">Calibration by confidence band</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {cal.map((b) => (
              <div key={b.band} className="lab-row px-3.5 pt-3 pb-2.5">
                <div className="kit-caption">{b.band}% confident</div>
                {b.n === 0 ? (
                  <div className="mt-1.5 text-sm">
                    <Dash reason="not measured" />
                  </div>
                ) : (
                  <>
                    <div className="kit-display mt-1.5 text-[26px]">
                      {b.confirmed}
                      <span className="ml-1 text-sm tracking-normal opacity-60">of {b.n}</span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">resolved predictions confirmed</div>
                  </>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{resolved === 0 ? 'Nothing has resolved yet, so there is nothing to calibrate; the first reads land at the six-month retrospectives.' : 'A well-calibrated lab confirms about as often as it said it would in each band.'}</p>
        </div>
      </Surface>
    </div>
  );
}

/** One weight as a thin bar on a 0 to 40% scale, with its value. */
function PairBar({ label, value, brand, delay }: { label: string; value: number; brand?: boolean; delay: number }) {
  return (
    <div className="grid grid-cols-[58px_1fr_34px] items-center gap-2 text-[11px] text-muted-foreground">
      <span>{label}</span>
      <span className="lab-track block h-1.5 overflow-hidden rounded-full">
        <motion.span className={cn('block h-full rounded-full', brand ? 'bg-[var(--kit-brand)]' : 'bg-foreground')} initial={{ width: 0 }} animate={{ width: `${Math.min(1, value / 0.4) * 100}%` }} transition={{ ...spring.soft, delay }} />
      </span>
      <span className="kit-num text-right text-foreground/80">{pct(value)}</span>
    </div>
  );
}

function EvidenceChart({ points, onPick }: { points: ReturnType<typeof evidenceMap>; onPick: (id: string) => void }) {
  const W = 680;
  const H = 280;
  const left = 52;
  const bottom = H - 40;
  const x = (e: number) => left + 40 + (e / 2) * (W - left - 80);
  const y = (s: number) => bottom - ((s - 1) / 4) * (bottom - 28);
  const maxS = Math.max(1, ...points.map((p) => p.sessions));
  const plotted = points.filter((p) => p.score != null && p.evidence != null);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto block h-auto w-full max-w-[860px] min-w-[560px]" role="img" aria-label="Score against evidence strength">
      {[1, 2, 3, 4, 5].map((v) => (
        <g key={v}>
          <line x1={left} x2={W - 24} y1={y(v)} y2={y(v)} style={{ stroke: 'var(--border)' }} strokeDasharray={v === 1 ? undefined : '2 4'} />
          <text x={left - 10} y={y(v) + 4} textAnchor="end" fontSize={11} style={{ fill: 'var(--muted-foreground)' }}>
            {v}
          </text>
        </g>
      ))}
      <line x1={left} x2={left} y1={24} y2={bottom} style={{ stroke: 'var(--border)' }} />
      {[0, 1, 2].map((e) => (
        <text key={e} x={x(e)} y={bottom + 18} textAnchor="middle" fontSize={11} style={{ fill: 'var(--muted-foreground)' }}>
          {EVIDENCE[e]}
        </text>
      ))}
      <text x={left - 10} y={14} textAnchor="end" fontSize={10} style={{ fill: 'var(--muted-foreground)' }}>
        score
      </text>
      <text x={W - 24} y={bottom + 34} textAnchor="end" fontSize={10} style={{ fill: 'var(--muted-foreground)' }}>
        evidence behind the hypotheses
      </text>
      {plotted.map((p, k) => {
        const r = 7 + (p.sessions / maxS) * 15;
        return (
          <g key={p.ideaId} className="cursor-pointer" onClick={() => onPick(p.ideaId)} role="button" tabIndex={0} aria-label={`${p.ideaId}: score ${p.score}, evidence ${p.evidence!.toFixed(1)}, ${p.sessions} sessions`} onKeyDown={(ev) => (ev.key === 'Enter' || ev.key === ' ') && onPick(p.ideaId)}>
            <motion.circle cx={x(p.evidence!)} cy={y(p.score!)} initial={{ r: 0 }} animate={{ r }} transition={{ ...spring.soft, delay: 0.1 + k * 0.05 }} style={{ fill: 'var(--kit-brand)', fillOpacity: 0.3, stroke: 'var(--kit-brand)' }} strokeWidth={1.5}>
              <title>{`${p.ideaId}: score ${p.score}, evidence ${p.evidence!.toFixed(1)}, ${p.sessions} sessions`}</title>
            </motion.circle>
            <text x={x(p.evidence!)} y={y(p.score!) - r - 5} textAnchor="middle" fontSize={11} fontWeight={600} style={{ fill: 'var(--foreground)' }}>
              {p.ideaId}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
