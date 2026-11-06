// Type-checks the dashboard. The vendored kit (vendor/design-kit) is compiled with the kit's own strictness, which does
// not include noUnusedLocals, so "declared but never read" in vendor files is not ours to fix (we never edit them);
// every other diagnostic, in our code or the kit's, fails the check.
import { spawnSync } from 'node:child_process';

const r = spawnSync('npx', ['tsc', '--noEmit', '-p', 'tsconfig.json', '--pretty', 'false'], { encoding: 'utf8', shell: process.platform === 'win32' });
const lines = `${r.stdout}${r.stderr}`.split('\n').filter((l) => l.trim());
const ignorable = (l) => /^vendor\//.test(l) && /error TS(6133|6192|6196|6198):/.test(l);
const real = lines.filter((l) => /error TS\d+/.test(l) && !ignorable(l));
const skipped = lines.filter(ignorable).length;
if (real.length) {
  console.error(real.join('\n'));
  process.exit(1);
}
console.log(`typecheck clean${skipped ? ` (${skipped} unused-import notes in vendor/design-kit ignored)` : ''}`);
