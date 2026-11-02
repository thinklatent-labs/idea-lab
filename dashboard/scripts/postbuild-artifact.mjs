// Turns dist/index.html (a full document from vite-plugin-singlefile) into dist/artifact.html,
// the fragment the Artifact tool wraps in its own skeleton: title + meta + font links + style + root + script.
import { readFileSync, writeFileSync } from 'node:fs';

const src = readFileSync('dist/index.html', 'utf8');
const head = /<head>([\s\S]*?)<\/head>/i.exec(src)?.[1] ?? '';
const body = /<body>([\s\S]*?)<\/body>/i.exec(src)?.[1] ?? '';
const keep = [];
const tag = (re) => { const m = re.exec(head); if (m) keep.push(m[0]); };
tag(/<title>[\s\S]*?<\/title>/i);
tag(/<meta name="claude:viewport-fit-sides"[^>]*>/i);
for (const m of head.matchAll(/<link[^>]*>/gi)) keep.push(m[0]);
for (const m of head.matchAll(/<style[^>]*>[\s\S]*?<\/style>/gi)) keep.push(m[0]);
for (const m of head.matchAll(/<script[^>]*>[\s\S]*?<\/script>/gi)) keep.push(m[0]);
const out = `${keep.join('\n')}\n${body.trim()}\n`;
writeFileSync('dist/artifact.html', out);
console.log(`dist/artifact.html: ${(out.length / 1024).toFixed(0)} kB, ${keep.length} head parts`);
