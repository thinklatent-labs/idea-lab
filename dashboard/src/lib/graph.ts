// Deterministic layered layout for the idea graph: themes on top, ideas, features, capabilities,
// experiments at the bottom. The same register always draws the same picture.
import type { LinkType, NodeType, Register } from './types';
import { resolveMerged, trackById } from './tracks';

/** Register node types plus the tracks inside higher-order ideas (D-387). */
export type GNodeType = NodeType | 'Track';
/** Register link types plus the drawn track-of edge from a track to its parent. */
export type GLinkType = LinkType | 'track-of';

export interface GNode {
  id: string;
  type: GNodeType;
  label: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
  layer: number;
  wrapRow: number;
}

export interface GEdge {
  id: string;
  from: string;
  to: string;
  type: GLinkType;
  note?: string;
  directed: boolean;
  path: string;
  mx: number;
  my: number;
}

export interface GraphLayout {
  nodes: GNode[];
  edges: GEdge[];
  width: number;
  height: number;
  layerLabels: { y: number; label: string }[];
}

export const NODE_W = 152;
export const NODE_H = 46;
const COL = 172;
const ROW = 150;
const WRAP_ROW = 70;
const PAD_X = 24;
const TOP = 56;
const MAX_PER_ROW = 7;
const UNDIRECTED: LinkType[] = ['related-to', 'competes-with'];

const LAYERS: { type: GNodeType; label: string }[] = [
  { type: 'Theme', label: 'Themes' },
  { type: 'Idea', label: 'Ideas' },
  { type: 'Track', label: 'Tracks' },
  { type: 'Feature', label: 'Features' },
  { type: 'Capability', label: 'Capabilities' },
  { type: 'Experiment', label: 'Experiments' },
];

function short(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

/** Catalogue capabilities that are also register rows (TL-005 is CAP-004) draw once, as the register row. */
export function canonicalId(reg: Register, id: string | null): string | null {
  if (!id) return null;
  const cap = reg.capabilities.find((c) => c.id === id);
  if (cap?.ideaId) return cap.ideaId;
  return id;
}

/** Where a link end draws: canonical, then a merged row moves to the track that carries it (D-387). */
export function drawnId(reg: Register, id: string | null): string | null {
  return resolveMerged(reg, canonicalId(reg, id));
}

export function layoutGraph(reg: Register): GraphLayout {
  const raw: Omit<GNode, 'x' | 'y' | 'w' | 'h' | 'layer' | 'wrapRow'>[] = [];
  for (const t of reg.themes) raw.push({ id: t.id, type: 'Theme', label: short(t.name.split(':')[0], 19), sub: t.id });
  for (const i of reg.ideas) {
    if (i.stage === 'Merged') continue; // drawn as its track, under the parent
    raw.push({ id: i.id, type: i.type, label: short(i.slug, 19), sub: `${i.id} · ${i.stage}` });
  }
  // tracks grouped by parent, in the order the parents appear
  const parentOrder = new Map(reg.ideas.map((i, n) => [i.id, n]));
  const tracks = [...(reg.tracks ?? [])].sort((a, b) => (parentOrder.get(a.parentId) ?? 0) - (parentOrder.get(b.parentId) ?? 0));
  for (const t of tracks) raw.push({ id: t.id, type: 'Track', label: short(t.name, 19), sub: `${t.parentId} · ${t.stage}` });
  for (const c of reg.capabilities) {
    if (c.ideaId) continue;
    raw.push({ id: c.id, type: 'Capability', label: short(c.name, 19), sub: `${c.maturity} · demand ${c.demand}` });
  }

  const nodes: GNode[] = [];
  const layerLabels: { y: number; label: string }[] = [];
  let y = TOP;
  let maxCols = 1;
  for (const [li, layer] of LAYERS.entries()) {
    const members = raw.filter((n) => n.type === layer.type);
    if (members.length === 0) continue;
    const rows = Math.ceil(members.length / MAX_PER_ROW);
    const perRow = Math.ceil(members.length / rows);
    maxCols = Math.max(maxCols, perRow);
    layerLabels.push({ y: y - 14, label: layer.label });
    members.forEach((m, idx) => {
      const r = Math.floor(idx / perRow);
      const c = idx % perRow;
      nodes.push({ ...m, layer: li, wrapRow: r, x: c * COL, y: y + r * WRAP_ROW, w: NODE_W, h: NODE_H });
    });
    y += (rows - 1) * WRAP_ROW + ROW;
  }
  const width = Math.max(720, maxCols * COL - (COL - NODE_W) + COL / 2 + PAD_X * 2);
  // centre each row inside the width; wrapped rows sit half a column over, like bricks, so an edge
  // dropping into a lower row passes between the boxes above it
  const byRow = new Map<number, GNode[]>();
  for (const n of nodes) {
    const key = n.y;
    if (!byRow.has(key)) byRow.set(key, []);
    byRow.get(key)!.push(n);
  }
  for (const row of byRow.values()) {
    row.sort((a, b) => a.x - b.x);
    const total = row.length * COL - (COL - NODE_W);
    const stagger = row[0].wrapRow % 2 === 1 ? COL / 2 : 0;
    const start = (width - total - COL / 2) / 2 + stagger;
    row.forEach((n, i) => {
      n.x = start + i * COL;
    });
  }
  const height = y - ROW + NODE_H + 32;
  const pos = new Map(nodes.map((n) => [n.id, n]));

  const edges: GEdge[] = [];
  const seen = new Set<string>();
  // a track and its own parent are joined by one track-of edge; their other links are internal to the programme
  const internal = (x: string, y: string) => trackById(reg, x)?.parentId === y || trackById(reg, y)?.parentId === x;
  for (const t of tracks) {
    const a = pos.get(t.id);
    const b = pos.get(t.parentId);
    if (!a || !b) continue;
    const key = `${t.id}|track-of|${t.parentId}`;
    seen.add(key);
    edges.push(makeEdge(key, a, b, 'track-of', `merged from ${t.mergedFrom.join(', ')} (${t.decisionId ?? t.mergedOn})`, nodes));
  }
  for (const l of reg.links) {
    const to = drawnId(reg, l.toId);
    const from = drawnId(reg, l.fromId);
    if (!to || !from || to === from || internal(from, to)) continue;
    const a = pos.get(from);
    const b = pos.get(to);
    if (!a || !b) continue;
    const key = `${from}|${l.type}|${to}`;
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push(makeEdge(key, a, b, l.type, l.note, nodes));
  }
  // theme membership not spelled as a link row still draws as "serves"
  for (const i of reg.ideas) {
    if (i.stage === 'Merged') continue;
    for (const t of i.themeIds) {
      const key = `${i.id}|serves|${t}`;
      if (seen.has(key)) continue;
      const a = pos.get(i.id);
      const b = pos.get(t);
      if (!a || !b) continue;
      seen.add(key);
      edges.push(makeEdge(key, a, b, 'serves', 'from the register row', nodes));
    }
  }
  return { nodes, edges, width, height, layerLabels };
}

function makeEdge(id: string, a: GNode, b: GNode, type: GLinkType, note: string | undefined, all: GNode[]): GEdge {
  const directed = !(UNDIRECTED as string[]).includes(type);
  let path: string;
  let mx: number;
  let my: number;
  if (a.y === b.y) {
    // same row: an arc above the boxes
    const x1 = a.x + a.w / 2;
    const x2 = b.x + b.w / 2;
    const top = a.y - 28;
    path = `M${x1},${a.y} C${x1},${top} ${x2},${top} ${x2},${b.y}`;
    mx = (x1 + x2) / 2;
    my = top + 8;
  } else {
    const down = a.y < b.y;
    const lower = down ? b : a;
    const upper = down ? a : b;
    const x1 = a.x + a.w / 2;
    const y1 = down ? a.y + a.h : a.y;
    const x2 = b.x + b.w / 2;
    const y2 = down ? b.y : b.y + b.h;
    if (lower.wrapRow > 0 && upper.layer !== lower.layer) {
      // the lower node sits in a wrapped row: curve to just above that layer's first row, then drop
      // straight down through the gap between the staggered boxes
      const firstRowY = Math.min(...all.filter((n) => n.layer === lower.layer).map((n) => n.y));
      const yg = firstRowY - 10;
      if (down) {
        const cy = (y1 + yg) / 2;
        path = `M${x1},${y1} C${x1},${cy} ${x2},${cy} ${x2},${yg} V${y2}`;
        mx = x2;
        my = yg - 6;
      } else {
        const cy = (y2 + yg) / 2;
        path = `M${x1},${y1} V${yg} C${x1},${cy} ${x2},${cy} ${x2},${y2}`;
        mx = x1;
        my = yg - 6;
      }
    } else {
      const cy = (y1 + y2) / 2;
      path = `M${x1},${y1} C${x1},${cy} ${x2},${cy} ${x2},${y2}`;
      mx = (x1 + x2) / 2;
      my = cy;
    }
  }
  return { id, from: a.id, to: b.id, type, note, directed, path, mx, my };
}

/** Nodes within `depth` hops of `id` (including itself) and the edges among the hops. */
export function neighbourhood(layout: GraphLayout, id: string, depth = 1): { nodes: Set<string>; edges: Set<string> } {
  const nodes = new Set<string>([id]);
  const edges = new Set<string>();
  let frontier = [id];
  for (let hop = 0; hop < depth; hop++) {
    const next: string[] = [];
    for (const n of frontier)
      for (const e of layout.edges) {
        if (e.from !== n && e.to !== n) continue;
        edges.add(e.id);
        const other = e.from === n ? e.to : e.from;
        if (!nodes.has(other)) {
          nodes.add(other);
          next.push(other);
        }
      }
    frontier = next;
  }
  return { nodes, edges };
}
