import { useLab } from '../lib/context';
import type { Idea } from '../lib/types';
import { relDays } from '../lib/format';
import { Horizon, NewChip, ReasonChips, StageMark, TypeBadge } from './ui';

export default function IdeaItem({ idea, rank, showReasons = true, compact = false }: { idea: Idea; rank?: number; showReasons?: boolean; compact?: boolean }) {
  const { derived, selectedId, select, lastVisit } = useLab();
  const d = derived.get(idea.id)!;
  const isNew = !!lastVisit && idea.lastTouched > lastVisit;
  return (
    <button type="button" className="item" aria-current={selectedId === idea.id ? 'true' : undefined} onClick={() => select(idea.id)}>
      <span className="head">
        {rank != null && <span className="rank">{rank}</span>}
        <span className="id">{idea.id}</span>
        <span className="slug">{idea.slug}</span>
        <StageMark stage={idea.stage} note={idea.stageNote} />
        <Horizon h={idea.horizon} />
        {!compact && <TypeBadge type={idea.type} />}
        {idea.score.composite != null && (
          <span className="chip" title={idea.score.note ?? idea.score.status}>
            {idea.score.composite.toFixed(1)} {idea.score.status}
          </span>
        )}
        <span className="faint tiny" style={{ marginLeft: 'auto' }}>
          touched {relDays(d.daysUntouched)}
        </span>
      </span>
      <span className="title">{idea.title}</span>
      {!compact && <span className="next">Next: {idea.nextStep}</span>}
      {showReasons && (d.reasons.length > 0 || isNew) && (
        <span className="reasons">
          <NewChip show={isNew} />
          {d.reasons.length > 0 && <ReasonChips reasons={d.reasons} max={compact ? 2 : 4} />}
        </span>
      )}
    </button>
  );
}
