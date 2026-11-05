// Pulls VI Kit (thinklatent-labs/vi-kit) into vendor/vi-kit, pinned to the kit's commit, and builds its tokens.
//
//   node scripts/kit-pull.mjs                  pull from ../../vi-kit (a vi-kit checkout next to idea-lab)
//   node scripts/kit-pull.mjs --from <path>    pull from another checkout
//   node scripts/kit-pull.mjs --check          verify vendor/vi-kit still matches KIT.json (CI runs this)
//   node scripts/kit-pull.mjs --force          overwrite files that were edited here (ejected)
//
// The vendored kit is never edited in this repo. Product extensions live in src/vi and src/jarvis and wrap the
// kit; a vendored file whose hash no longer matches KIT.json has been ejected, and this script says so.
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dashboard = path.resolve(here, '..');
const vendor = path.join(dashboard, 'vendor', 'vi-kit');
const kitJson = path.join(vendor, 'KIT.json');
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f, d) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);

// What a product needs from the kit: the shadcn layer, the VI layer, the bridge it imports, and the tokens.
const SETS = [
  'packages/ui/src',
  'packages/ui/UPSTREAM.json',
  'packages/vi-kit/src',
  'packages/vi-kit/styles',
  'packages/motion/styles/bridge.css',
  'packages/tokens/src',
  'packages/tokens/sd.config.mjs',
];

const sha = (file) => createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 16);
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const vendoredFiles = () => (existsSync(vendor) ? walk(vendor).filter((f) => f !== kitJson) : []);
const rel = (f) => path.relative(vendor, f).split(path.sep).join('/');

function audit() {
  if (!existsSync(kitJson)) return { pinned: null, ejected: [], added: [], missing: [] };
  const pinned = JSON.parse(readFileSync(kitJson, 'utf8'));
  const files = vendoredFiles().map(rel);
  const ejected = files.filter((f) => pinned.files[f] && pinned.files[f] !== sha(path.join(vendor, f)));
  const added = files.filter((f) => !pinned.files[f]);
  const missing = Object.keys(pinned.files).filter((f) => !files.includes(f));
  return { pinned, ejected, added, missing };
}

if (flag('--check')) {
  const { pinned, ejected, added, missing } = audit();
  if (!pinned) {
    console.error('vendor/vi-kit has no KIT.json; run node scripts/kit-pull.mjs');
    process.exit(1);
  }
  const bad = [...ejected.map((f) => `edited here (ejected): ${f}`), ...added.map((f) => `not from the kit: ${f}`), ...missing.map((f) => `missing: ${f}`)];
  if (bad.length) {
    console.error(`vendor/vi-kit differs from VI Kit ${pinned.commit.slice(0, 7)}:\n  ${bad.join('\n  ')}\nExtend the kit in src/vi instead; to take the kit back, run kit-pull --force.`);
    process.exit(1);
  }
  console.log(`vendor/vi-kit matches VI Kit ${pinned.commit.slice(0, 7)} (${Object.keys(pinned.files).length} files)`);
  process.exit(0);
}

const from = path.resolve(opt('--from', path.join(dashboard, '..', '..', 'vi-kit')));
if (!existsSync(path.join(from, 'packages', 'vi-kit'))) {
  console.error(`No vi-kit checkout at ${from}. Clone thinklatent-labs/vi-kit next to idea-lab, or pass --from <path>.`);
  process.exit(1);
}

const { ejected, added } = audit();
if ((ejected.length || added.length) && !flag('--force')) {
  console.error(`Not pulling: files in vendor/vi-kit were changed here.\n  ${[...ejected.map((f) => `ejected: ${f}`), ...added.map((f) => `added: ${f}`)].join('\n  ')}\nMove the change into src/vi (a wrapper or variant), or upstream it to vi-kit; --force overwrites.`);
  process.exit(1);
}

const git = (...a) => execFileSync('git', ['-C', from, ...a], { encoding: 'utf8' }).trim();
let commit = 'unknown';
let commitDate = null;
let subject = null;
try {
  commit = git('rev-parse', 'HEAD');
  [commitDate, subject] = git('log', '-1', '--format=%cI%x09%s').split('\t');
  if (git('status', '--porcelain', '--', 'packages')) console.warn('Warning: the vi-kit checkout has uncommitted changes under packages/; KIT.json pins the commit, not those changes.');
} catch {
  console.warn('Warning: the vi-kit checkout is not a git repository; KIT.json records no commit.');
}

rmSync(vendor, { recursive: true, force: true });
for (const s of SETS) {
  const src = path.join(from, s);
  if (!existsSync(src)) {
    console.error(`The kit has no ${s}; its layout changed. Update SETS in this script.`);
    process.exit(1);
  }
  mkdirSync(path.dirname(path.join(vendor, s)), { recursive: true });
  cpSync(src, path.join(vendor, s), { recursive: true });
}

// Build the tokens (DTCG → CSS variables) with the kit's own Style Dictionary config.
const tokensDir = path.join(vendor, 'packages', 'tokens');
const cwd = process.cwd();
process.chdir(tokensDir);
const { default: StyleDictionary } = await import('style-dictionary');
const { default: config } = await import(path.join(tokensDir, 'sd.config.mjs'));
const sd = new StyleDictionary({ ...config, log: { verbosity: 'silent', warnings: 'disabled' } });
await sd.buildPlatform('css');
process.chdir(cwd);

const files = Object.fromEntries(vendoredFiles().map((f) => [rel(f), sha(f)]).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(
  kitJson,
  `${JSON.stringify(
    {
      source: 'thinklatent-labs/vi-kit',
      commit,
      commitDate,
      subject,
      pulledAt: new Date().toISOString(),
      note: 'Vendored by scripts/kit-pull.mjs. Never edit these files: extend the kit in src/vi. kit-pull --check fails when a file here changes.',
      files,
    },
    null,
    2,
  )}\n`,
);
console.log(`vendor/vi-kit: VI Kit ${commit.slice(0, 7)}${subject ? ` (${subject})` : ''}, ${Object.keys(files).length} files, tokens built`);
