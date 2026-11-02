#!/usr/bin/env node
// Writes ideas/<ID>-<slug>.md from register/register.json: the lab record as frontmatter, the
// sections the doc standard asks for as headings. Existing body text under a heading is kept;
// only the frontmatter and the generated blocks (marked) are rewritten.
// Usage: node scripts/render-ideas.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const reg = JSON.parse(readFileSync(path.join(root, 'register', 'register.json'), 'utf8'));
const outDir = path.join(root, 'ideas');
mkdirSync(outDir, { recursive: true });

const yaml = (v) => (v == null ? 'null' : typeof v === 'string' ? JSON.stringify(v) : Array.isArray(v) ? (v.length ? `[${v.map((x) => JSON.stringify(x)).join(', ')}]` : '[]') : JSON.stringify(v));
const GEN_START = '<!-- generated:start -->';
const GEN_END = '<!-- generated:end -->';

function table(rows, cols) {
  if (!rows?.length) return '_None recorded._';
  const head = `| ${cols.map((c) => c[0]).join(' | ')} |\n| ${cols.map(() => '---').join(' | ')} |`;
  const body = rows.map((r) => `| ${cols.map((c) => String(c[1](r) ?? '').replace(/\|/g, '\\|')).join(' | ')} |`).join('\n');
  return `${head}\n${body}`;
}

for (const i of reg.ideas) {
  const file = path.join(outDir, `${i.id}-${i.slug}.md`);
  const fm = [
    '---',
    `id: ${i.id}`,
    `slug: ${i.slug}`,
    `title: ${yaml(i.title)}`,
    `aliases: ${yaml(i.aliases ?? [])}`,
    `type: ${i.type}`,
    `parent: ${yaml(i.parentId)}`,
    `themes: ${yaml(i.themeIds)}`,
    `stage: ${yaml(i.stage)}`,
    `stage_since: ${yaml(i.stageSince)}`,
    `horizon: ${yaml(i.horizon)}`,
    `stream: ${yaml(i.streamId ?? null)}`,
    `appetite_weeks: ${yaml(i.appetiteWeeks ?? null)}`,
    `appetite_ends: ${yaml(i.appetiteEnds ?? null)}`,
    `owner: ${yaml(i.owner)}`,
    `score: ${yaml(i.score.composite)}`,
    `score_status: ${i.score.status}`,
    `doc_url: ${yaml(i.docUrl)}`,
    `standard: ${yaml(i.standardVersion)}`,
    `last_touched: ${i.lastTouched}`,
    `sensitivity: ${i.sensitivity}`,
    `critique_recorded: ${yaml(i.critiqueRecorded ?? null)}`,
    `next_step: ${yaml(i.nextStep)}`,
    `next_step_due: ${yaml(i.nextStepDue ?? null)}`,
    '---',
  ].join('\n');

  const generated = [
    GEN_START,
    `## Lab record`,
    '',
    `**${i.id} ${i.slug}** · ${i.type}${i.parentId ? ` of ${i.parentId}` : ''} · ${i.stage}${i.stageNote ? ` (${i.stageNote})` : ''} · ${i.horizon ?? 'no horizon'}${i.streamId ? ` · ${i.streamId}` : ''}`,
    '',
    `Owner: ${i.owner}. Appetite: ${i.appetiteWeeks != null ? `${i.appetiteWeeks} engineer-weeks` : (i.appetite ?? 'not set')}${i.appetiteEnds ? `, ends ${i.appetiteEnds}` : ''}. Score: ${i.score.composite ?? 'not scored'} ${i.score.status !== 'none' ? `(${i.score.status})` : ''}.`,
    '',
    `Next step: ${i.nextStep}${i.nextStepDue ? ` (due ${i.nextStepDue})` : ''}`,
    '',
    i.productionSurface ? `Production surface: ${i.productionSurface.users ?? ''} · ${i.productionSurface.system ?? ''} · ${i.productionSurface.metric ?? ''}` : 'Production surface: not named (reads as an H3 experiment).',
    '',
    i.governance ? `Governance (separate team): ${i.governance.status ?? 'not started'}${i.governance.review ? `, ${i.governance.review}` : ''}${i.governance.criticalPath ? ' — on the critical path' : ''}` : 'Governance: not recorded.',
    '',
    `### Decisions due`,
    i.decisionsDue.length ? i.decisionsDue.map((d) => (typeof d === 'string' ? `- ${d}` : `- ${d.text} (${d.kind === 'quick' ? `quick call on the dashboard: ${d.options.map((o) => o.label).join(' / ')}` : 'needs the chat'})`)).join('\n') : '_None._',
    '',
    `### Hypotheses`,
    table(i.hypotheses, [['Claim', (h) => h.claim], ['Confirmed if', (h) => h.confirmedIf], ['Refuted if', (h) => h.refutedIf], ['Evidence', (h) => (h.evidence == null ? 'not set' : ['opinion', 'one experiment', 'repeated'][h.evidence])], ['Confidence', (h) => (h.confidence == null ? 'not set' : `${h.confidence}%`)], ['Result', (h) => h.result ?? 'open']]),
    '',
    `### Kill signals`,
    table(i.killSignals, [['Signal', (k) => k.signal], ['By', (k) => k.by ?? 'no date'], ['Status', (k) => k.status], ['Action', (k) => k.action ?? '']]),
    '',
    `### Open questions`,
    table(i.openQuestions, [['Question', (q) => q.question], ['Owner', (q) => q.owner], ['Blocking', (q) => q.blocking]]),
    '',
    `### Links`,
    table(reg.links.filter((l) => l.fromId === i.id), [['Link', (l) => l.type], ['To', (l) => l.toLabel], ['Note', (l) => l.note ?? '']]),
    '',
    `### Decision log`,
    table(reg.decisions.filter((d) => d.ideaId === i.id), [['ID', (d) => d.id ?? ''], ['Date', (d) => d.date], ['Decision', (d) => d.decision], ['By', (d) => d.by], ['Status', (d) => d.status ?? (d.pending ? 'proposed' : 'accepted')]]),
    GEN_END,
  ].join('\n');

  let body = `\n# ${i.title}\n\n${generated}\n\n## Notes\n\n_Session notes and the idea card's prose live here; the register row and the generated block above are rewritten by \`scripts/render-ideas.mjs\`, this section is kept._\n`;
  if (existsSync(file)) {
    const cur = readFileSync(file, 'utf8');
    const afterFm = cur.replace(/^---[\s\S]*?---\n/, '');
    const s = afterFm.indexOf(GEN_START);
    const e = afterFm.indexOf(GEN_END);
    if (s >= 0 && e > s) body = afterFm.slice(0, s) + generated + afterFm.slice(e + GEN_END.length);
    else body = afterFm;
  }
  writeFileSync(file, `${fm}\n${body}`);
}
console.log(`ideas/: ${reg.ideas.length} docs rendered`);
