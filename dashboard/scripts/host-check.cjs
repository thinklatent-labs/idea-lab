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
  // Layout at the widths people use, phone to wide desk (TL-007 maintenance, audit S1 to S3): the pixel comparison above only proves host
  // and plain agree at 1440, so a clipped logo passed it. Here, on the plain page: no sideways scroll, no text spilling
  // out of its box in the header or the view, no truncated header chip, and the same with Jarvis docked at 1280.
  const layoutProbe = () => {
    const out = [];
    const vw = window.innerWidth;
    if (document.documentElement.scrollWidth > vw + 1) out.push(`page scrolls sideways (${document.documentElement.scrollWidth} > ${vw})`);
    const label = (el) => `${el.tagName.toLowerCase()} "${(el.textContent || '').trim().slice(0, 28)}"`;
    const hasText = (el) => [...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim());
    for (const el of document.querySelectorAll('[data-app-header] *, header *, main *')) {
      if (!hasText(el) || el.closest('svg,[data-layout-truncate-ok]')) continue;
      const cs = getComputedStyle(el);
      // Skip inline runs, hidden text and screen-reader-only labels (1 px boxes clipped on purpose).
      if (cs.display === 'inline' || cs.visibility === 'hidden' || el.clientWidth <= 1 || el.closest('.sr-only,[hidden]') || cs.clip !== 'auto' || cs.clipPath !== 'none') continue;
      if (cs.textOverflow === 'ellipsis') {
        if (el.closest('[data-app-header]') && el.scrollWidth - el.clientWidth > 1) out.push(`header text truncated: ${label(el)}`);
        continue;
      }
      // Measure the text itself, so overflow on both sides of a centred box counts (scrollWidth sees only the right).
      const box = el.getBoundingClientRect();
      const range = document.createRange();
      const lines = new Set();
      let left = Infinity;
      let right = -Infinity;
      for (const c of el.childNodes) {
        if (c.nodeType !== 3 || !c.textContent.trim()) continue;
        range.selectNodeContents(c);
        for (const r of range.getClientRects()) {
          if (r.width === 0) continue;
          left = Math.min(left, r.left);
          right = Math.max(right, r.right);
          lines.add(Math.round(r.top));
        }
      }
      if (left === Infinity) continue;
      const spill = Math.max(box.left - left, right - box.right);
      if (spill > 1 && cs.overflowX === 'visible') out.push(`text spills ${Math.round(spill)}px out of its box: ${label(el)}`);
      if (el.closest('[data-app-header]') && lines.size > 1) out.push(`header text wraps onto ${lines.size} lines: ${label(el)}`);
    }
    return [...new Set(out)].slice(0, 8);
  };
  const layouts = [
    { w: 390, h: 844, view: '' },
    { w: 768, h: 1024, view: '' },
    { w: 1024, h: 768, view: '' },
    { w: 1024, h: 768, view: '', jarvis: true },
    { w: 1280, h: 800, view: '' },
    { w: 1280, h: 800, view: '', jarvis: true },
    { w: 1920, h: 1080, view: '' },
    { w: 1280, h: 800, view: 'scores' },
    { w: 390, h: 844, view: 'register' },
  ];
  for (const scheme of ['light', 'dark']) {
    for (const L of layouts) {
      const ctx = await browser.newContext({ viewport: { width: L.w, height: L.h }, colorScheme: scheme, reducedMotion: 'reduce' });
      const pg = await ctx.newPage();
      await pg.goto(`${pageOrigin}/plain/${L.view ? `#${L.view}` : ''}`, { waitUntil: 'networkidle' });
      await pg.waitForTimeout(1200);
      if (L.jarvis) {
        await pg.locator('header button[aria-pressed]').first().click();
        await pg.waitForTimeout(900);
      }
      const problems = await pg.evaluate(layoutProbe);
      await ctx.close();
      if (problems.length) failed++;
      console.log(`${problems.length ? 'LAYOUT' : 'layout'} ${scheme.padEnd(5)} ${String(L.w).padEnd(4)} ${(L.view || 'command center') + (L.jarvis ? ' + Jarvis' : '')}${problems.length ? `: ${problems.join('; ')}` : ' ok'}`);
    }
  }

  await browser.close();
  pageServer.close();
  hostServer.close();
  console.log(failed ? `${failed} check(s) failed (host renders or layout): not published.` : 'Every render matches under host conditions (D-107) and every layout check passes.');
  process.exit(failed ? 1 : 0);
})();
