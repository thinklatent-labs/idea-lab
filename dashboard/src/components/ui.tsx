import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { NodeType, Stage } from '../lib/types';
import { STAGE_MEANING } from '../lib/rubric';
import type { Reason } from '../lib/derive';

export function StageMark({ stage, note }: { stage: Stage; note?: string }) {
  return (
    <span className="stage" data-stage={stage} title={note ? `${stage}: ${note}` : STAGE_MEANING[stage]}>
      {stage}
    </span>
  );
}

export function TypeBadge({ type }: { type: NodeType }) {
  return (
    <span className="type" data-type={type}>
      {type}
    </span>
  );
}

export function Horizon({ h }: { h: string | null }) {
  if (!h) return null;
  return <span className="horizon">{h}</span>;
}

export function ReasonChips({ reasons, max = 4 }: { reasons: Reason[]; max?: number }) {
  const shown = reasons.slice(0, max);
  const rest = reasons.length - shown.length;
  return (
    <div className="reasons">
      {shown.map((r, i) => (
        <span key={i} className={`chip ${r.kind}`}>
          {r.label}
        </span>
      ))}
      {rest > 0 && <span className="chip">+{rest} more</span>}
    </div>
  );
}

export function NewChip({ show }: { show: boolean }) {
  return show ? <span className="chip new">changed since your last visit</span> : null;
}

/** Copies text inside the click handler; falls back to selecting the text when the clipboard refuses. */
export function CopyButton({ text, label = 'Copy', onDone }: { text: string; label?: string; onDone?: (ok: boolean) => void }) {
  const codeRef = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<'idle' | 'done' | 'failed'>('idle');
  useEffect(() => {
    if (state === 'idle') return;
    const t = window.setTimeout(() => setState('idle'), 1800);
    return () => window.clearTimeout(t);
  }, [state]);
  const copy = () => {
    const finish = (ok: boolean) => {
      setState(ok ? 'done' : 'failed');
      onDone?.(ok);
      if (!ok && codeRef.current) {
        const range = document.createRange();
        range.selectNodeContents(codeRef.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    };
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(() => finish(true), () => finish(false));
      } else finish(false);
    } catch {
      finish(false);
    }
  };
  return (
    <div className="copybox">
      <code ref={codeRef}>{text}</code>
      <button type="button" className="btn small" onClick={copy}>
        {state === 'done' ? 'Copied' : state === 'failed' ? 'Select and copy' : label}
      </button>
    </div>
  );
}

export function Section({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section>
      <h3>
        {title}
        {aside && <small>{aside}</small>}
      </h3>
      {children}
    </section>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="empty">{children}</p>;
}
