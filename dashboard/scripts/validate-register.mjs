#!/usr/bin/env node
// Validates a register.json against the data contract (schema/register.schema.json)
// and runs the referential checks the schema cannot express.
// Usage: node scripts/validate-register.mjs public/data/register.json
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const here = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(here, '..', '..', 'register', 'schema', 'register.schema.json');
const dataPath = process.argv[2] ?? path.join(here, '..', '..', 'register', 'register.json');

const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
const data = JSON.parse(readFileSync(dataPath, 'utf8'));

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);
const problems = [];

if (!validate(data)) {
  for (const e of validate.errors ?? []) problems.push(`schema: ${e.instancePath || '/'} ${e.message}`);
}

// Referential checks
const ideaIds = new Set(data.ideas.map((i) => i.id));
const capIds = new Set(data.capabilities.map((c) => c.id));
const themeIds = new Set(data.themes.map((t) => t.id));
const tracks = data.tracks ?? [];
const trackIds = new Set(tracks.map((t) => t.id));
const seen = new Set();

// Merges (schema 1.4, D-387): a Merged row points to its parent and to the track that carries it;
// the track lists every row it absorbed. Nothing may point at a track that does not exist.
const byId = new Map(data.ideas.map((i) => [i.id, i]));
const seenTracks = new Set();
for (const t of tracks) {
  if (seenTracks.has(t.id)) problems.push(`duplicate track id ${t.id}`);
  seenTracks.add(t.id);
  const parent = byId.get(t.parentId);
  if (!parent) problems.push(`track ${t.id}: parent ${t.parentId} not in ideas`);
  else if (['Merged', 'Killed'].includes(parent.stage)) problems.push(`track ${t.id}: parent ${t.parentId} is ${parent.stage}`);
  if (!t.id.startsWith(`${t.parentId}.`)) problems.push(`track ${t.id}: id does not start with its parent ${t.parentId}`);
  const srcIds = new Set(t.sources.map((s) => s.id));
  for (const id of t.mergedFrom) {
    const row = byId.get(id);
    if (!row) problems.push(`track ${t.id}: mergedFrom ${id} not in ideas`);
    else if (row.stage !== 'Merged' || row.mergedInto !== t.parentId || row.trackId !== t.id)
      problems.push(`track ${t.id}: ${id} is not recorded as Merged into ${t.parentId} on this track`);
    if (!srcIds.has(id)) problems.push(`track ${t.id}: ${id} merged without a sources entry`);
  }
  for (const id of srcIds) if (!t.mergedFrom.includes(id)) problems.push(`track ${t.id}: source ${id} not in mergedFrom`);
}
for (const i of data.ideas) {
  if (i.stage === 'Merged') {
    if (!i.mergedInto || !ideaIds.has(i.mergedInto)) problems.push(`${i.id}: Merged without a parent in ideas (mergedInto ${i.mergedInto})`);
    if (!i.trackId || !trackIds.has(i.trackId)) problems.push(`${i.id}: Merged without a track (trackId ${i.trackId})`);
  } else if (i.mergedInto || i.trackId) problems.push(`${i.id}: mergedInto or trackId set on a row at ${i.stage}`);
}
for (const i of data.ideas) {
  if (seen.has(i.id)) problems.push(`duplicate idea id ${i.id}`);
  seen.add(i.id);
  if (i.parentId && !ideaIds.has(i.parentId)) problems.push(`${i.id}: parent ${i.parentId} not in ideas`);
  for (const t of i.themeIds) if (!themeIds.has(t)) problems.push(`${i.id}: theme ${t} not in themes`);
  if (i.capabilityId && !capIds.has(i.capabilityId)) problems.push(`${i.id}: capability ${i.capabilityId} not in catalogue`);
  if (i.type === 'Feature' && !i.parentId) problems.push(`${i.id}: a Feature needs a parent`);
  if (i.stage === 'Parked' && !i.recheckDate) problems.push(`${i.id}: Parked without a re-check date`);
  if (i.score.status !== 'none' && i.score.composite == null) problems.push(`${i.id}: score status ${i.score.status} without a composite`);
  if (i.score.criteria) {
    const vals = Object.values(i.score.criteria);
    if (vals.length === 8 && i.score.composite != null) {
      const w = Object.entries(i.score.criteria).reduce((a, [k, v]) => a + v * (data.weights[k] ?? 0), 0);
      const mean = vals.reduce((a, b) => a + b, 0) / 8;
      if (Math.abs(w - i.score.composite) > 0.051 && Math.abs(mean - i.score.composite) > 0.051) problems.push(`${i.id}: composite ${i.score.composite} matches neither the weights in force (${w.toFixed(2)}) nor the equal-weight mean (${mean.toFixed(2)})`);
    }
  }
}
for (const l of data.links) {
  if (!ideaIds.has(l.fromId) && !trackIds.has(l.fromId)) problems.push(`link from ${l.fromId}: not in ideas or tracks`);
  if (l.toId && !ideaIds.has(l.toId) && !trackIds.has(l.toId) && !capIds.has(l.toId) && !themeIds.has(l.toId)) problems.push(`link ${l.fromId} ${l.type} ${l.toId}: target unknown`);
  if (l.type === 'feature-of') {
    const from = data.ideas.find((i) => i.id === l.fromId);
    if (from && from.parentId !== l.toId) problems.push(`link ${l.fromId} feature-of ${l.toId} disagrees with parentId ${from?.parentId}`);
  }
}
for (const c of data.capabilities) {
  for (const id of c.reusedByIds) if (!ideaIds.has(id)) problems.push(`${c.id}: reusedBy ${id} not in ideas`);
  if (c.createdById && !ideaIds.has(c.createdById)) problems.push(`${c.id}: createdById ${c.createdById} not in ideas`);
  if (c.ideaId && !ideaIds.has(c.ideaId)) problems.push(`${c.id}: ideaId ${c.ideaId} not in ideas`);
}
for (const d of data.decisions) {
  if (!ideaIds.has(d.ideaId)) problems.push(`decision ${d.date} ${d.ideaId}: not in ideas`);
  if (d.trackId && !trackIds.has(d.trackId)) problems.push(`decision ${d.id}: track ${d.trackId} not in tracks`);
}
for (const s of data.sessions) {
  for (const id of s.ideaIds ?? []) if (!ideaIds.has(id)) problems.push(`session ${s.date}: ${id} not in ideas`);
  for (const id of s.trackIds ?? []) if (!trackIds.has(id)) problems.push(`session ${s.date}: track ${id} not in tracks`);
}
const sum = Object.values(data.weights).reduce((a, b) => a + b, 0);
if (Math.abs(sum - 1) > 0.001) problems.push(`weights sum to ${sum}, not 1`);
if (data.proposedWeights) {
  const ps = Object.values(data.proposedWeights).reduce((a, b) => a + b, 0);
  if (Math.abs(ps - 1) > 0.001) problems.push(`proposedWeights sum to ${ps}, not 1`);
}
if (data.portfolio) {
  for (const key of ['now', 'next', 'later', 'capabilitiesToWatch'])
    for (const id of data.portfolio[key] ?? []) if (!ideaIds.has(id)) problems.push(`portfolio.${key}: ${id} not in ideas`);
}

// Every snapshot the history index lists must exist next to it, or the Changes view diffs against nothing (audit N3).
const histIdx = path.join(path.dirname(dataPath), 'history', 'index.json');
if (existsSync(histIdx)) {
  const idx = JSON.parse(readFileSync(histIdx, 'utf8'));
  for (const sn of idx.snapshots ?? []) if (!existsSync(path.join(path.dirname(histIdx), path.basename(sn.file)))) problems.push(`history/index.json: ${sn.file} is listed but missing`);
}

if (problems.length) {
  console.error(`register.json: ${problems.length} problem(s)`);
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}
console.log(`register.json valid: ${data.ideas.length} ideas, ${data.links.length} links, ${data.capabilities.length} capabilities, ${data.decisions.length} decisions, as of ${data.asOf}`);
