// Merges and tracks (register schema 1.4, D-387). A merged row closes at stage Merged and points to the
// track that carries its purpose and open items inside a higher-order idea. Links keep naming the merged
// row; every view resolves them to the track here, so nothing in the register is rewritten.
import type { Idea, Register, Stage, Track } from './types';
import { CLOSED_STAGES } from './types';

export const isClosed = (stage: Stage): boolean => CLOSED_STAGES.includes(stage);

export function tracksOf(reg: Register, parentId: string): Track[] {
  return (reg.tracks ?? []).filter((t) => t.parentId === parentId);
}

export function trackById(reg: Register, id: string | null | undefined): Track | undefined {
  if (!id) return undefined;
  return (reg.tracks ?? []).find((t) => t.id === id);
}

/** The track a merged row became, or undefined for any other row. */
export function trackOfMerged(reg: Register, idea: Pick<Idea, 'stage' | 'trackId'>): Track | undefined {
  return idea.stage === 'Merged' ? trackById(reg, idea.trackId) : undefined;
}

/**
 * The node an id stands for today: a merged row resolves to its track (a merge of a merge follows the chain);
 * any other id is returned as it is.
 */
export function resolveMerged(reg: Register, id: string | null): string | null {
  if (!id) return null;
  let cur = id;
  for (let hop = 0; hop < 5; hop++) {
    const row = reg.ideas.find((i) => i.id === cur);
    if (!row || row.stage !== 'Merged' || !row.trackId) return cur;
    cur = row.trackId;
  }
  return cur;
}

/** The idea that owns a node: a track's parent, or the idea itself. */
export function ideaOf(reg: Register, id: string | null): Idea | undefined {
  if (!id) return undefined;
  const t = trackById(reg, id);
  return reg.ideas.find((i) => i.id === (t ? t.parentId : id));
}

export interface NodeInfo {
  id: string;
  /** The idea that owns the node (the parent, for a track). */
  ideaId: string;
  isTrack: boolean;
  label: string;
  stage: Stage;
  horizon: Idea['horizon'];
}

/** What the dependency and conflict checks need to know about either end of a link. */
export function nodeInfo(reg: Register, rawId: string | null): NodeInfo | undefined {
  const id = resolveMerged(reg, rawId);
  if (!id) return undefined;
  const t = trackById(reg, id);
  if (t) {
    const parent = reg.ideas.find((i) => i.id === t.parentId);
    const lead = reg.ideas.find((i) => i.id === t.mergedFrom[0]);
    return { id: t.id, ideaId: t.parentId, isTrack: true, label: `${parent?.slug ?? t.parentId} › ${t.name}`, stage: t.stage, horizon: lead?.horizon ?? parent?.horizon ?? null };
  }
  const i = reg.ideas.find((x) => x.id === id);
  if (!i) return undefined;
  return { id: i.id, ideaId: i.id, isTrack: false, label: `${i.id} ${i.slug}`, stage: i.stage, horizon: i.horizon };
}

/** A track's label as a person reads it: "TL-003 portal › TL Index". */
export function trackLabel(reg: Register, t: Track): string {
  const parent = reg.ideas.find((i) => i.id === t.parentId);
  return `${t.parentId} ${parent?.slug ?? ''} › ${t.name}`.replace('  ', ' ');
}

/** The line that opens a chat scoped to one track (D-387): "Lab session · TL-003 portal › TL Index · Spec". */
export function trackSessionLine(parent: Pick<Idea, 'id' | 'slug'>, t: Pick<Track, 'name'>, mode: string): string {
  return `Lab session · ${parent.id} ${parent.slug} › ${t.name} · ${mode}`;
}

/** Tracks whose parent is visible, for views that list live work. */
export function liveTracks(reg: Register, visibleIdeas: Idea[]): Track[] {
  const ids = new Set(visibleIdeas.filter((i) => !isClosed(i.stage)).map((i) => i.id));
  return (reg.tracks ?? []).filter((t) => ids.has(t.parentId) && t.status !== 'done' && t.status !== 'split-out');
}
