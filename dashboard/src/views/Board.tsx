import { useLab } from '../lib/context';
import type { Lane } from '../lib/derive';
import { HORIZONS, type Idea } from '../lib/types';
import IdeaItem from '../components/IdeaItem';

const LANES: { key: Lane; label: string; rule: string }[] = [
  { key: 'Now', label: 'Now', rule: 'Building against an appetite, or Shipped and waiting on the metric read' },
  { key: 'Next', label: 'Next', rule: 'Proposal (funded, not started), Stress test or Shaping' },
  { key: 'Later', label: 'Later', rule: 'seed or parked' },
  { key: 'Graduated', label: 'Graduated', rule: 'in a Project of its own; the lab keeps a pointer' },
];

export default function Board() {
  const { reg, derived, visibleIdeas } = useLab();
  const byLane = (lane: Lane): Idea[] => visibleIdeas.filter((i) => derived.get(i.id)!.lane === lane);
  const caps = byLane('Capabilities');
  const killed = byLane('Killed');
  const proposed = reg.portfolio && reg.portfolio.status === 'proposed' ? reg.portfolio : null;

  return (
    <>
      <div className="view-title">
        <div>
          <h2>Portfolio board</h2>
          <p>
            Lanes follow the lifecycle: Now is Building or Shipped, Next is Proposal, Stress test or Shaping, Later is Seed or Parked. Rows are grouped by horizon inside each lane.
            {proposed && ' The Portfolio session 1 draft placed VAI in Now; under the new lifecycle VAI sits in Next until its leads are named and it starts Building.'}
          </p>
        </div>
      </div>
      <div className="lanes">
        {LANES.map((lane) => {
          const rows = byLane(lane.key);
          return (
            <div key={lane.key} className="lane">
              <h3>
                {lane.label} <small>{rows.length}</small>
              </h3>
              {rows.length === 0 ? (
                <p className="empty">Nothing here: {lane.rule}.</p>
              ) : (
                [...HORIZONS, null].map((h) => {
                  const group = rows.filter((i) => (i.horizon ?? null) === h);
                  if (group.length === 0) return null;
                  return (
                    <div key={h ?? 'none'} className="hgroup">
                      <p className="faint tiny">{h ?? 'No horizon'}</p>
                      <div className="list">
                        {group.map((i) => (
                          <IdeaItem key={i.id} idea={i} compact />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </div>
      {caps.length > 0 && (
        <div className="lane">
          <h3>
            Capabilities to watch <small>{caps.length}</small>
          </h3>
          <div className="list">
            {caps.map((i) => (
              <IdeaItem key={i.id} idea={i} compact />
            ))}
          </div>
        </div>
      )}
      {killed.length > 0 && (
        <div className="lane">
          <h3>
            Killed <small>{killed.length}</small>
          </h3>
          <div className="list">
            {killed.map((i) => (
              <IdeaItem key={i.id} idea={i} compact showReasons={false} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
