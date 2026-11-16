// Jarvis's brain, without React: the register digest Claude reads, the standing instructions, the brief the page
// writes by itself (no model), the reply parser and a small markdown reader. Pure functions, tested in tests/.
import type { Derived } from '../lib/derive';
import { attentionQueue } from '../lib/derive';
import { appetiteState, buildingGate, evaluateRules, healthOf, openNextSteps, type RuleHit } from '../lib/derive2';
import { dueItems, type DueItem, type Idea, type Register } from '../lib/types';
import type { InboxDoc } from '../lib/inbox';
import { calendarDaysUntil, localDay, weekdayOf } from '../lib/day';
import { liveTracks, trackLabel } from '../lib/tracks';
import type { Track } from '../lib/types';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const dayLabel = (iso: string) => {
  const d = new Date(`${iso.slice(0, 10)}T00:00:00Z`);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
};
const daysTo = (iso: string, now: Date) => calendarDaysUntil(iso, now);

/** "due Friday" within a week, "due 12 Nov" beyond, "3 days overdue" past. */
export function whenText(iso: string, now: Date): string {
  const d = daysTo(iso, now);
  if (Number.isNaN(d)) return `due ${iso}`;
  if (d < 0) return `${-d} ${d === -1 ? 'day' : 'days'} overdue`;
  if (d === 0) return 'due today';
  if (d === 1) return 'due tomorrow';
  if (d < 7) return `due ${WEEKDAYS[weekdayOf(iso)]}`;
  return `due ${dayLabel(iso)}`;
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

/** One line per row, with everything Jarvis needs to answer "what is going on with X". */
function rowLine(reg: Register, i: Idea, d: Derived, now: Date, inbox: Map<string, InboxDoc>): string {
  if (i.stage === 'Merged') return `${i.id} ${i.slug} — Merged into ${i.mergedInto} as track ${i.trackId} on ${i.stageSince ?? ''}; its next step and open items live on the track (see TRACKS)`;
  const parts: string[] = [`${i.id} ${i.slug} — ${clip(i.title, 110)}`];
  parts.push(`${i.type}${i.parentId ? ` of ${i.parentId}` : ''}`);
  parts.push(`${i.stage}${i.stageSince ? ` since ${i.stageSince}` : ''}${d.daysInStage != null ? ` (${d.daysInStage} d)` : ''}`);
  if (i.horizon) parts.push(i.horizon);
  parts.push(i.score.composite != null ? `score ${i.score.composite} ${i.score.status}` : 'not scored');
  parts.push(`owner: ${clip(i.owner, 90)}`);
  if (i.streamId) parts.push(`stream ${i.streamId}`);
  if (i.appetiteWeeks != null) parts.push(`appetite ${i.appetiteWeeks} engineer-weeks${i.appetiteEnds ? ` to ${i.appetiteEnds}` : ''}`);
  const ap = appetiteState(i, now);
  if (ap && ap.level !== 'ok') parts.push(ap.level === 'expired' ? `APPETITE EXPIRED ${-ap.daysLeft} d ago` : `appetite ends in ${ap.daysLeft} d`);
  if (i.stage === 'Proposal' || i.stage === 'Building') {
    const g = buildingGate(i);
    parts.push(g.passed ? 'Building gate passed' : `Building gate missing: ${g.missing.join(', ')}`);
  }
  const h = healthOf(reg, i.id);
  parts.push(h ? `health ${h.health} (${h.date})` : 'no health call');
  parts.push(`next: ${clip(i.nextStep, 220)}${i.nextStepDue ? ` (${whenText(i.nextStepDue, now)}, ${i.nextStepDue})` : ''}`);
  const due = dueItems(i);
  if (due.length) parts.push(`decisions due: ${due.map((x) => dueLine(x, inbox)).join(' | ')}`);
  if (d.stale) parts.push(`STALE ${d.overdueDays} d past its window`);
  if (d.blockedBy.length) parts.push(`waits on ${d.blockedBy.join(', ')}`);
  if (i.flags.length) parts.push(`flags: ${i.flags.slice(0, 3).map((f) => clip(f, 90)).join('; ')}`);
  if (i.graduatedTo) parts.push(`graduated to ${clip(i.graduatedTo, 80)}`);
  if (i.governance?.criticalPath) parts.push(`governance on the critical path: ${i.governance.status ?? ''}`);
  return parts.join(' · ');
}

/** One line per track (D-387): a merged row's work, open items and dates, under its parent. */
function trackLine(reg: Register, t: Track, now: Date, inbox: Map<string, InboxDoc>): string {
  const parts: string[] = [`${t.id} (${trackLabel(reg, t)}) — ${clip(t.purpose, 110)}`];
  parts.push(`merged from ${t.mergedFrom.join(', ')} on ${t.mergedOn}${t.decisionId ? ` (${t.decisionId})` : ''}`);
  parts.push(`${t.stage}, ${t.status}`);
  parts.push(`owner: ${clip(t.owner, 90)}`);
  if (t.streamId) parts.push(`stream ${t.streamId}`);
  if (t.appetiteWeeks != null) parts.push(`appetite ${t.appetiteWeeks} engineer-weeks${t.appetiteEnds ? ` to ${t.appetiteEnds}` : ''}`);
  if (t.reviewSlot) parts.push(`review ${clip(t.reviewSlot, 60)}`);
  parts.push(`next: ${clip(t.nextStep, 220)}${t.nextStepDue ? ` (${whenText(t.nextStepDue, now)}, ${t.nextStepDue})` : ''}`);
  const due = dueItems({ id: t.id, decisionsDue: t.decisionsDue });
  if (due.length) parts.push(`decisions due: ${due.map((x) => dueLine(x, inbox)).join(' | ')}`);
  const oq = t.openQuestions?.length ?? 0;
  const hy = t.hypotheses?.length ?? 0;
  const ks = (t.killSignals ?? []).filter((k) => k.status === 'open').length;
  if (oq || hy || ks) parts.push(`${oq} open questions, ${hy} hypotheses, ${ks} open kill signals`);
  return parts.join(' · ');
}

function dueLine(x: DueItem, inbox: Map<string, InboxDoc>): string {
  const rec = inbox.get(x.id);
  const state = rec ? ` [Jithin chose "${rec.optionLabel}" on the dashboard; ${rec.status}]` : '';
  if (x.kind === 'quick' && x.options?.length) return `${x.id} quick call "${clip(x.text, 160)}" options: ${x.options.map((o) => `${o.id}="${o.label}"`).join(', ')}${state}`;
  return `${x.id} needs the chat "${clip(x.text, 160)}"${state}`;
}

export interface DigestInput {
  reg: Register;
  derived: Map<string, Derived>;
  now: Date;
  inbox: Map<string, InboxDoc>;
  lastVisit: string | null;
  visibleIdeas: Idea[];
}

/** What Claude reads about the lab: compact, factual, and nothing the register does not say. */
export function buildDigest({ reg, derived, now, inbox, lastVisit, visibleIdeas }: DigestInput): string {
  const out: string[] = [];
  const live = visibleIdeas.filter((i) => !['Graduated', 'Killed', 'Merged'].includes(i.stage));
  out.push(`REGISTER rev ${reg.source.registerRev}, as of ${reg.asOf}. ${visibleIdeas.length} rows, ${live.length} live. Today is ${localDay(now)} (${WEEKDAYS[now.getDay()]}).${lastVisit ? ` Jithin last opened the dashboard on ${lastVisit}.` : ''}`);
  out.push('', 'ROWS (most in need of attention first):');
  const order = attentionQueue(reg, derived).filter((i) => visibleIdeas.includes(i));
  const rest = visibleIdeas.filter((i) => !order.includes(i));
  for (const i of [...order, ...rest]) out.push(`- ${rowLine(reg, i, derived.get(i.id)!, now, inbox)}`);
  const tracks = liveTracks(reg, visibleIdeas);
  if (tracks.length) {
    out.push('', 'TRACKS (workstreams inside higher-order ideas; a merged row\'s purpose and open items live here, D-387):');
    for (const t of tracks) out.push(`- ${trackLine(reg, t, now, inbox)}`);
  }

  if (reg.streams?.length) {
    out.push('', 'STREAMS (one engineer plus a coding agent each):');
    for (const s of reg.streams) {
      const rows = visibleIdeas.filter((i) => i.streamId === s.id).map((i) => `${i.id} ${i.stage}`);
      out.push(`- ${s.id} ${s.name}: engineer ${s.owner ?? 'not named'}; rows ${rows.join(', ') || 'none'}${s.focus ? `; focus ${clip(s.focus, 100)}` : ''}`);
    }
  }
  if (reg.portfolio) {
    const p = reg.portfolio;
    out.push('', `PORTFOLIO (${p.status}, ${p.asOf}): Now ${p.now?.join(', ') || 'none'}; Next ${p.next?.join(', ') || 'none'}; Later ${p.later?.join(', ') || 'none'}. Portfolio bar ${reg.portfolioBar ?? 'none in force'}.`);
  }
  const hits = evaluateRules(reg, derived, now).filter((h) => h.level !== 'info');
  if (hits.length) {
    out.push('', 'ALERTS from the rule table:');
    for (const h of hits.slice(0, 14)) out.push(`- ${h.ruleId} ${h.level}: ${clip(h.text, 160)}`);
  }
  const waiting = [...inbox.values()].filter((d) => d.status === 'waiting');
  if (waiting.length) out.push('', `DASHBOARD CALLS waiting for the next lab chat to apply: ${waiting.map((d) => `${d.itemId} → "${d.optionLabel}"`).join('; ')}`);
  out.push('', 'RECENT DECISIONS (newest first):');
  for (const x of reg.decisions.slice(-14).reverse()) out.push(`- ${x.id ?? ''} ${x.date} ${x.ideaId}: ${clip(x.decision, 200)} (${clip(x.by, 40)}${x.status === 'superseded' ? ', superseded' : ''})`);
  out.push('', 'RECENT SESSIONS:');
  for (const s of reg.sessions.slice(-6).reverse()) out.push(`- ${s.date} ${clip(s.scope, 60)} · ${s.mode} · ${s.health ?? 'no health call'}: ${clip(s.outcome, 220)}`);
  const plat = reg.capabilities.filter((c) => c.demand >= 3);
  if (plat.length) out.push('', `PLATFORM PRIORITIES (capabilities reused by three or more rows): ${plat.map((c) => `${c.id} ${c.name} (${c.demand})`).join('; ')}`);
  return out.join('\n');
}

export const VIEW_NAMES = ['pulse', 'queue', 'register', 'board', 'graph', 'catalogue', 'scores', 'changes', 'log'] as const;

/** The standing instructions: the first user turn of every call. */
export function rules(digest: string): string {
  return [
    "You are Jarvis, the assistant built into Jithin Pradeep's Idea Lab dashboard. Jithin is Head of ThinkLatent; the Idea Lab is where ThinkLatent initiatives are shaped before they become projects of their own.",
    'You know only the register snapshot below and what the page tools return. Never invent a row, score, owner, date, decision or number; when the register does not say, say "the register does not record that".',
    '',
    'How to answer:',
    '- Lead with the answer in one or two sentences, then at most five short bullets. Plain words, no preamble, no sign-off. Short paragraphs; Jithin reads this on a phone too.',
    '- Name rows by ID and slug (TL-004 index). Dates as "7 Nov". Honest critique by default: if a row is thin, stale, blocked or failing its gate, say so plainly and say what evidence would fix it.',
    '- Agents propose; Jithin decides. You cannot change the register. You can (1) propose a quick call already listed under "decisions due" with propose_quick_call, and (2) draft a request for the next lab chat with draft_request. Both wait for his confirmation on a card; say so.',
    '- When your answer is about one row or one view, call open_view so the page shows it. Use get_idea for a row\'s hypotheses, kill signals, open questions, links, decisions and sessions.',
    `- Views you can open: pulse (the command center), queue, register, board, graph, catalogue, scores, changes, log.`,
    '- End with exactly one line: "Confidence: high|medium|low — <what it rests on>".',
    '',
    'Lab rules: stages Seed, Shaping, Stress test, Proposal (funded by default; Jithin rejects explicitly), Building, Shipped (a first user in production and the metric read), Graduated, Merged (closed into a higher-order idea; its work continues as a track of the parent, D-387), Parked, Killed. When asked about a merged row, answer from its track. No idea passes Stress test without a recorded critique. The Building gate (D-152): an owner role (played by Claude until the company version; owner fields read role then player), a stream, an appetite in engineer-weeks, and a weekly review slot Jithin commits to; ideas in Building never outnumber his review slots. The register records the slot in the Building gate of each row (schema 1.4); where a row has none recorded, say it is not recorded rather than missing. Staleness windows: Seed 60, Shaping 30, Stress test 21, Proposal 14, Shipped 30 days; Building runs by its appetite. Five streams S-A to S-E. Modes: Brainstorm, Critic, Scout, Spec, Portfolio, Comms. A chat opens with "Lab session · TL-### slug · Mode", or "Lab session · TL-### slug › Track · Mode" when it is scoped to one track.',
    '',
    digest,
  ].join('\n');
}

export function briefPrompt(digest: string, now: Date, lastVisit: string | null): string {
  return `${rules(digest)}\n\nJithin asks for his lab brief for ${WEEKDAYS[now.getDay()]} ${dayLabel(localDay(now))}. In at most five sentences, spoken style (it may be read aloud), no bullets: what changed${lastVisit ? ` since ${dayLabel(lastVisit)}` : ' recently'}, what needs him today (most blocking first, with IDs), and the one move that would unblock the most. Then the Confidence line.`;
}

// ---------- The brief the page writes by itself ----------

export interface LocalBrief {
  headline: string;
  tail: string;
  counts: { quick: number; input: number; dueWeek: number; overdue: number; stale: number; gate: number; alerts: number };
  lead: { ideaId: string; why: string } | null;
}

export function localBrief(reg: Register, derived: Map<string, Derived>, now: Date, inbox: Map<string, InboxDoc>, visible: Idea[]): LocalBrief {
  const live = visible.filter((i) => !['Graduated', 'Killed', 'Merged'].includes(i.stage) && i.type !== 'Capability');
  const parentOf = new Map(visible.map((i) => [i.id, i]));
  const due = [
    ...visible.filter((i) => i.stage !== 'Killed' && i.stage !== 'Merged').flatMap((i) => dueItems(i).map((item) => ({ i, item }))),
    ...liveTracks(reg, visible).flatMap((t) => dueItems({ id: t.id, decisionsDue: t.decisionsDue }).map((item) => ({ i: parentOf.get(t.parentId)!, item }))),
  ];
  const quick = due.filter(({ item }) => item.kind === 'quick' && !inbox.has(item.id)).length;
  const input = due.filter(({ item }) => item.kind === 'input').length;
  const steps = openNextSteps(reg, now).filter((s) => visible.some((v) => v.id === s.ideaId));
  const overdue = steps.filter((s) => s.daysLeft != null && s.daysLeft < 0);
  const soon = steps.filter((s) => s.daysLeft != null && s.daysLeft >= 0 && s.daysLeft <= 7);
  const stale = live.filter((i) => derived.get(i.id)?.stale);
  const gate = live.filter((i) => i.stage === 'Building' && !buildingGate(i).passed);
  const alerts = evaluateRules(reg, derived, now).filter((h: RuleHit) => h.level === 'alert' && h.ruleId !== 'R-00');

  const pieces: string[] = [];
  if (quick) pieces.push(`${quick} quick ${quick === 1 ? 'call waits' : 'calls wait'} on you`);
  if (overdue.length) pieces.push(`${overdue[0].ideaId}'s next step is ${-overdue[0].daysLeft!} ${overdue[0].daysLeft === -1 ? 'day' : 'days'} overdue`);
  else if (soon.length) pieces.push(`${soon[0].ideaId}'s next step is ${whenText(soon[0].due!, now)}`);
  if (input && pieces.length < 2) pieces.push(`${input} ${input === 1 ? 'question needs' : 'questions need'} the chat`);
  if (gate.length && pieces.length < 2) pieces.push(`${gate[0].id} is building without a full gate`);
  if (stale.length && pieces.length < 2) pieces.push(`${stale.length} ${stale.length === 1 ? 'row has' : 'rows have'} gone stale`);

  const flagged = new Set([...overdue.map((s) => s.ideaId), ...soon.slice(0, 1).map((s) => s.ideaId), ...stale.map((i) => i.id), ...gate.map((i) => i.id), ...due.map(({ i }) => i.id)]);
  const calm = live.filter((i) => !flagged.has(i.id)).length;
  const headline = pieces.length ? `${cap(pieces.join(' and '))};` : 'Nothing waits on you today;';
  const tail = pieces.length ? (calm ? `the other ${calm} live ${calm === 1 ? 'row is' : 'rows are'} inside their windows.` : 'every live row has something open.') : `${live.length} live ${live.length === 1 ? 'row' : 'rows'}, all inside their windows.`;
  const top = attentionQueue(reg, derived).find((i) => visible.includes(i) && derived.get(i.id)!.attention > 0);
  return {
    headline,
    tail,
    counts: { quick, input, dueWeek: soon.length, overdue: overdue.length, stale: stale.length, gate: gate.length, alerts: alerts.length },
    lead: top ? { ideaId: top.id, why: derived.get(top.id)!.reasons[0]?.label ?? 'top of the queue' } : null,
  };
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------- Replies ----------

export interface Parsed {
  body: string;
  confidence: { level: 'high' | 'medium' | 'low'; why: string } | null;
  ids: string[];
}

/** Splits the closing Confidence line off and lists the IDs the answer names, in order. */
export function parseReply(text: string): Parsed {
  const lines = text.replace(/\s+$/, '').split('\n');
  let confidence: Parsed['confidence'] = null;
  for (let k = lines.length - 1; k >= Math.max(0, lines.length - 3); k--) {
    const m = /^\s*\**\s*confidence\s*\**\s*:\s*\**\s*(high|medium|low)\b\**\s*(?:[—–:-]+\s*)?(.*)$/i.exec(lines[k]);
    if (m) {
      confidence = { level: m[1].toLowerCase() as 'high' | 'medium' | 'low', why: m[2].trim() };
      lines.splice(k, 1);
      break;
    }
  }
  const body = lines.join('\n').trim();
  const ids = [...new Set(body.match(/\b(?:TL|CAP|T)-\d{3}\b/g) ?? [])];
  return { body, confidence, ids };
}

export type Inline = { t: 'text'; v: string } | { t: 'bold'; v: string } | { t: 'code'; v: string } | { t: 'id'; v: string };
export type Block = { t: 'p'; inl: Inline[] } | { t: 'ul'; items: Inline[][] } | { t: 'ol'; items: Inline[][] } | { t: 'h'; inl: Inline[] };

/** Inline markdown: **bold**, `code`, and register IDs as links. Everything else stays text. */
export function inline(s: string): Inline[] {
  const out: Inline[] = [];
  const re = /\*\*([^*]+)\*\*|`([^`]+)`|\b((?:TL|CAP|T)-\d{3})\b/g;
  let last = 0;
  for (let m = re.exec(s); m; m = re.exec(s)) {
    if (m.index > last) out.push({ t: 'text', v: s.slice(last, m.index) });
    if (m[1] != null) out.push({ t: 'bold', v: m[1] });
    else if (m[2] != null) out.push({ t: 'code', v: m[2] });
    else out.push({ t: 'id', v: m[3] });
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push({ t: 'text', v: s.slice(last) });
  return out;
}

/** Block markdown: paragraphs, - and 1. lists, # headings. Enough for Jarvis's answers. */
export function blocks(text: string): Block[] {
  const out: Block[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) out.push({ t: 'p', inl: inline(para.join(' ')) });
    para = [];
  };
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd();
    const ul = /^\s*[-*•]\s+(.*)$/.exec(line);
    const ol = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    const h = /^\s*#{1,4}\s+(.*)$/.exec(line);
    if (!line.trim()) flush();
    else if (ul || ol) {
      flush();
      const kind = ul ? 'ul' : 'ol';
      const prev = out[out.length - 1];
      const item = inline((ul ?? ol)![1]);
      if (prev && prev.t === kind) prev.items.push(item);
      else out.push(kind === 'ul' ? { t: 'ul', items: [item] } : { t: 'ol', items: [item] });
    } else if (h) {
      flush();
      out.push({ t: 'h', inl: inline(h[1]) });
    } else para.push(line.trim());
  }
  flush();
  return out;
}

/** What the voice reads: no markdown, IDs spelled the way people say them. */
export function forSpeech(text: string): string {
  return parseReply(text)
    .body.replace(/\*\*|`|#+\s/g, '')
    .replace(/^\s*[-*•]\s+/gm, '')
    .replace(/\bTL-0*(\d+)\b/g, 'T L $1')
    .replace(/\s+/g, ' ')
    .trim();
}

