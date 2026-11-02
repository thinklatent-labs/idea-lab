import { useMemo } from 'react';
import { useLab } from '../lib/context';
import { attentionQueue } from '../lib/derive';
import { SAVED_QUESTIONS, matchesQuestion } from '../lib/derive2';
import IdeaItem from '../components/IdeaItem';

export default function Queue() {
  const { reg, derived, now, queueFilter, setQueueFilter, visibleIdeas } = useLab();
  const queue = useMemo(() => attentionQueue(reg, derived), [reg, derived]);
  const visible = new Set(visibleIdeas.map((i) => i.id));
  const base = queueFilter === 'all' ? queue : visibleIdeas;
  const filtered = base.filter((i) => visible.has(i.id) && (queueFilter === 'all' || matchesQuestion(reg, derived, i, queueFilter, now)));
  const silent = visibleIdeas.length - queue.filter((i) => visible.has(i.id)).length;

  return (
    <>
      <div className="view-title">
        <div>
          <h2>Attention queue</h2>
          <p>
            Ranked by what the lab's rules weigh: decisions waiting on you first, then features holding a parent, stale rows, parked rows past re-check, and open blocking questions. Oldest touch breaks ties. The chips are saved questions.
          </p>
        </div>
      </div>
      <div className="row" role="group" aria-label="Saved questions">
        <button type="button" className="chip toggle" aria-pressed={queueFilter === 'all'} onClick={() => setQueueFilter('all')}>
          Everything with a reason
        </button>
        {SAVED_QUESTIONS.map((q) => (
          <button key={q.key} type="button" className="chip toggle" aria-pressed={queueFilter === q.key} onClick={() => setQueueFilter(q.key)}>
            {q.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="empty">Nothing matches this question today.{queue.length === 0 ? ' No row has a reason to be here.' : ''}</p>
      ) : (
        <div className="list">
          {filtered.map((i, n) => (
            <IdeaItem key={i.id} idea={i} rank={n + 1} />
          ))}
        </div>
      )}
      <p className="faint small">
        {filtered.length} of {visibleIdeas.length} rows shown{silent > 0 ? `; ${silent} ${silent === 1 ? 'row has' : 'rows have'} nothing to flag` : ''}.
      </p>
    </>
  );
}
