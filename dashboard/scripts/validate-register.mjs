#!/usr/bin/env node
// Validates a register.json against the data contract (schema/register.schema.json)
// and runs the referential checks the schema cannot express.
// Usage: node scripts/validate-register.mjs public/data/register.json
import { readFileSync } from 'node:fs';
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
const seen = new Set();
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
      const mean = vals.reduce((a, b) => a + b, 0) / 8;
      if (Math.abs(mean - i.score.composite) > 0.051) problems.push(`${i.id}: composite ${i.score.composite} does not match the equal-weight mean ${mean.toFixed(2)}`);
    }
  }
}
for (const l of data.links) {
  if (!ideaIds.has(l.fromId)) problems.push(`link from ${l.fromId}: not in ideas`);
  if (l.toId && !ideaIds.has(l.toId) && !capIds.has(l.toId) && !themeIds.has(l.toId)) problems.push(`link ${l.fromId} ${l.type} ${l.toId}: target unknown`);
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
for (const d of data.decisions) if (!ideaIds.has(d.ideaId)) problems.push(`decision ${d.date} ${d.ideaId}: not in ideas`);
for (const s of data.sessions) for (const id of s.ideaIds ?? []) if (!ideaIds.has(id)) problems.push(`session ${s.date}: ${id} not in ideas`);
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

if (problems.length) {
  console.error(`register.json: ${problems.length} problem(s)`);
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}
console.log(`register.json valid: ${data.ideas.length} ideas, ${data.links.length} links, ${data.capabilities.length} capabilities, ${data.decisions.length} decisions, as of ${data.asOf}`);
