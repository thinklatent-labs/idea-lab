#!/usr/bin/env node
// Keeps one dated copy of the register per export in register/history and maintains the index.
// A snapshot is written only when the register's asOf is newer than the latest snapshot.
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const regPath = path.join(root, 'register', 'register.json');
const histDir = path.join(root, 'register', 'history');
const idxPath = path.join(histDir, 'index.json');
const reg = JSON.parse(readFileSync(regPath, 'utf8'));
const idx = existsSync(idxPath) ? JSON.parse(readFileSync(idxPath, 'utf8')) : { snapshots: [] };
// Compare instants, not strings: an export in another offset (a nightly job writing Z) sorts wrongly as text (audit N2).
const t = (iso) => Date.parse(iso);
const latest = idx.snapshots.map((s) => s.asOf).sort((a, b) => t(a) - t(b)).at(-1);
if (latest && t(latest) >= t(reg.asOf)) {
  console.log(`snapshot: latest (${latest}) is current; nothing written`);
  process.exit(0);
}
const stamp = reg.asOf.replace(/[:]/g, '').replace(/\+.*$|Z$/, '').replace(/(\d{4}-\d{2}-\d{2})T(\d{4})\d*/, '$1T$2');
const file = `${stamp}.json`;
copyFileSync(regPath, path.join(histDir, file));
// Drop index entries whose file is gone, so the dashboard never diffs against a missing snapshot (audit N3).
idx.snapshots = idx.snapshots.filter((s) => existsSync(path.join(histDir, path.basename(s.file))));
idx.snapshots.push({ asOf: reg.asOf, file: `data/history/${file}`, registerRev: reg.source.registerRev, generatedBy: reg.generatedBy.split('.')[0] });
writeFileSync(idxPath, JSON.stringify(idx, null, 2) + '\n');
console.log(`snapshot: wrote ${file} (rev ${reg.source.registerRev})`);
