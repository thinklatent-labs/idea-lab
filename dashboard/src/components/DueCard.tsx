import { useState } from 'react';
import { useLab } from '../lib/context';
import { sessionLine, defaultMode } from '../lib/derive';
import type { DueItem, Idea } from '../lib/types';
import { fmtDate } from '../lib/format';
import { CopyButton } from './ui';

/** One decision waiting on Jithin. Quick calls get their options as buttons; input-needed items
 *  point to the chat with a copyable session line. */
export default function DueCard({ idea, item, showIdea = false }: { idea: Idea; item: DueItem; showIdea?: boolean }) {
  const { inbox, select } = useLab();
  const rec = inbox.docs.get(item.id);
  const [changing, setChanging] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const quick = item.kind === 'quick' && (item.options?.length ?? 0) > 0;
  const live = inbox.state === 'ready' || inbox.state === 'slow';
  const canPick = quick && live && inbox.canWrite;

  const pick = async (optId: string) => {
    const o = item.options!.find((x) => x.id === optId)!;
    setBusy(optId);
    await inbox.decide({ itemId: item.id, ideaId: idea.id, itemText: item.text, optionId: o.id, optionLabel: o.label, effect: o.effect });
    setBusy(null);
    setChanging(false);
  };

  return (
    <div className="duecard" data-kind={item.kind} data-status={rec?.status ?? 'open'}>
      <div className="duehead">
        {showIdea && (
          <button type="button" className="link" onClick={() => select(idea.id)}>
            {idea.id} {idea.slug}
          </button>
        )}
        <span className={`chip ${quick ? 'decision' : ''}`}>{quick ? 'quick call' : 'needs the chat'}</span>
      </div>
      <p className="duetext">{item.text}</p>

      {quick && rec && !changing ? (
        <div className="duestate">
          {rec.status === 'waiting' && (
            <>
              <strong>Decided: {rec.optionLabel}.</strong> <span className="faint small">Recorded {fmtDate(rec.decidedAt)}; Claude applies it at the next session or the morning pickup.</span>
              {canPick && (
                <div className="row" style={{ marginTop: 6 }}>
                  <button type="button" className="btn small" onClick={() => setChanging(true)}>
                    Change
                  </button>
                  <button type="button" className="btn small ghost" onClick={() => inbox.withdraw(item.id)}>
                    Withdraw
                  </button>
                </div>
              )}
            </>
          )}
          {rec.status === 'applied' && (
            <>
              <strong>Applied: {rec.optionLabel}.</strong> <span className="faint small">{rec.appliedNote ?? ''}{rec.decisionId ? ` (${rec.decisionId})` : ''} The register on this page refreshes at the next sync.</span>
            </>
          )}
          {rec.status === 'needs-chat' && (
            <>
              <strong>Claude needs you in the chat.</strong> <span className="faint small">{rec.appliedNote ?? 'Something changed since you decided.'}</span>
              <div style={{ marginTop: 6 }}>
                <CopyButton text={sessionLine(idea, defaultMode(idea.stage))} label="Copy session line" />
              </div>
            </>
          )}
        </div>
      ) : quick ? (
        <>
          <div className="dueopts">
            {item.options!.map((o) => (
              <button key={o.id} type="button" className="btn opt" disabled={!canPick || !!busy} title={`Applies: ${o.effect}`} onClick={() => pick(o.id)}>
                {busy === o.id ? 'Saving…' : o.label}
              </button>
            ))}
            {changing && (
              <button type="button" className="btn small ghost" onClick={() => setChanging(false)}>
                Keep {rec?.optionLabel}
              </button>
            )}
          </div>
          {!live && (
            <p className="faint small" style={{ marginTop: 6 }}>
              {inbox.state === 'loading' ? 'Connecting to the decision inbox…' : 'Decisions can be made only on the claude.ai dashboard; this copy is read-only.'}
            </p>
          )}
          {live && !inbox.canWrite && <p className="faint small" style={{ marginTop: 6 }}>Only Jithin records decisions here.</p>}
        </>
      ) : (
        <div style={{ marginTop: 6 }}>
          <CopyButton text={sessionLine(idea, defaultMode(idea.stage))} label="Copy session line" />
        </div>
      )}
    </div>
  );
}
