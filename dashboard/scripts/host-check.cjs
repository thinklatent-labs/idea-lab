// The publishing check the lab adopted in D-107: a page counts as published only when a headless render inside the
// artifact host's conditions (the host's page wrapper, served under a path, in a cross-origin frame, with storage
// blocked) matches the plain page pixel for pixel, in light and dark.
//
//   node scripts/host-check.cjs            checks dist/ (run npm run build first)
//
// Needs Playwright with Chromium (preinstalled in the Claude workspace; not part of CI). Motion is reduced for both
// renders so the comparison is deterministic.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const dist = path.resolve(__dirname, '..', 'dist');
const fragment = fs.readFileSync(path.join(dist, 'artifact.html'), 'utf8');
// What the host wraps a published fragment in: its skeleton, with unlayered page styles of its own.
const wrapped = `<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light}body{margin:0;font:14px system-ui;background:#fff;color:#000}</style></head><body>${fragment}</body></html>`;
const types = { '.html': 'text/html; charset=utf-8', '.json': 'application/json' };

function serve(port, handler) {
  return new Promise((resolve) => {
    const s = http.createServer(handler).listen(port, '127.0.0.1', () => resolve(s));
  });
}
const pagePort = 4191;
const hostPort = 4192;
const pageOrigin = `http://127.0.0.1:${pagePort}`;
const hostOrigin = `http://localhost:${hostPort}`;

(async () => {
  const pageServer = await serve(pagePort, (req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    if (u === '/artifact/x/' || u === '/artifact/x/index.html') return res.writeHead(200, { 'content-type': types['.html'] }), res.end(wrapped);
    if (u === '/plain/' || u === '/plain/index.html') return res.writeHead(200, { 'content-type': types['.html'] }), res.end(fs.readFileSync(path.join(dist, 'index.html')));
    const rel = u.replace(/^\/(artifact\/x|plain)\//, '');
    const f = path.join(dist, rel);
    if (!f.startsWith(dist) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return res.writeHead(404), res.end();
    res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  const hostServer = await serve(hostPort, (req, res) => {
    const hash = decodeURIComponent((req.url.split('#')[1] || req.url.split('?h=')[1] || '').trim());
    res.writeHead(200, { 'content-type': types['.html'] });
    res.end(`<!doctype html><html><body style="margin:0"><iframe id="f" src="${pageOrigin}/artifact/x/${hash ? `#${hash}` : ''}" style="border:0;width:100vw;height:100vh;display:block"></iframe></body></html>`);
  });

  const browser = await chromium.launch();
  const views = ['', 'queue', 'graph'];
  let failed = 0;
  for (const scheme of ['light', 'dark']) {
    for (const view of views) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, reducedMotion: 'reduce' });
      const plain = await ctx.newPage();
      await plain.goto(`${pageOrigin}/plain/${view ? `#${view}` : ''}`, { waitUntil: 'networkidle' });
      await plain.waitForTimeout(1800);
      const a = await plain.screenshot();
      await ctx.close();

      const hctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, reducedMotion: 'reduce' });
      // Storage blocked inside the frame, as in a viewer that refuses it.
      await hctx.addInitScript(() => {
        if (window === window.top) return;
        for (const k of ['localStorage', 'sessionStorage'])
          Object.defineProperty(window, k, {
            configurable: true,
            get() {
              throw new DOMException('blocked', 'SecurityError');
            },
          });
      });
      const host = await hctx.newPage();
      const errors = [];
      host.on('pageerror', (e) => errors.push(e.message));
      await host.goto(`${hostOrigin}/?h=${view}`, { waitUntil: 'networkidle' });
      await host.waitForTimeout(1800);
      const b = await host.locator('#f').screenshot();
      const crossOrigin = await host.evaluate(() => {
        try {
          return !document.getElementById('f').contentWindow.document;
        } catch {
          return true;
        }
      });
      await hctx.close();

      const cmp = await browser.newPage();
      const diff = await cmp.evaluate(
        async ([x, y]) => {
          const load = (src) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = src; });
          const [ia, ib] = await Promise.all([load(x), load(y)]);
          if (ia.width !== ib.width || ia.height !== ib.height) return { size: `${ia.width}x${ia.height} vs ${ib.width}x${ib.height}`, n: -1 };
          const c = document.createElement('canvas');
          c.width = ia.width;
          c.height = ia.height;
          const g = c.getContext('2d');
          g.drawImage(ia, 0, 0);
          const da = g.getImageData(0, 0, c.width, c.height).data;
          g.clearRect(0, 0, c.width, c.height);
          g.drawImage(ib, 0, 0);
          const db = g.getImageData(0, 0, c.width, c.height).data;
          let n = 0;
          for (let k = 0; k < da.length; k += 4) if (da[k] !== db[k] || da[k + 1] !== db[k + 1] || da[k + 2] !== db[k + 2]) n++;
          return { n, of: da.length / 4 };
        },
        [`data:image/png;base64,${a.toString('base64')}`, `data:image/png;base64,${b.toString('base64')}`],
      );
      await cmp.close();
      const ok = diff.n === 0 && crossOrigin && errors.length === 0;
      if (!ok) failed++;
      console.log(`${ok ? 'match' : 'DIFFERS'}  ${scheme.padEnd(5)} ${(view || 'command center').padEnd(14)} ${diff.n === -1 ? diff.size : `${diff.n} of ${diff.of} pixels differ`}${crossOrigin ? '' : '; frame was not cross-origin'}${errors.length ? `; errors: ${errors.join(' | ')}` : ''}`);
      if (!ok && process.env.HOST_CHECK_OUT) {
        fs.writeFileSync(path.join(process.env.HOST_CHECK_OUT, `plain-${scheme}-${view || 'home'}.png`), a);
        fs.writeFileSync(path.join(process.env.HOST_CHECK_OUT, `host-${scheme}-${view || 'home'}.png`), b);
      }
    }
  }
  await browser.close();
  pageServer.close();
  hostServer.close();
  console.log(failed ? `${failed} render(s) differ under host conditions: not published.` : 'Every render matches under host conditions (D-107).');
  process.exit(failed ? 1 : 0);
})();
