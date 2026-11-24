"""Render every board of the TL-016 design canvas to a full-page PNG, 1440 px wide.

The boards load their pictures from the canvas's own store (/_blob/<id>); here each one is served from the
theme pack instead (assets.json maps the ids to files), so the PNGs look like the live canvas.
Needs Python 3, Playwright and Chrome.

  python3 render.py               # every board
  python3 render.py Main System   # some boards

PNGs go to $TL_PREVIEW_PNG (default /tmp/tl016-previews), named 01-Main.png to 27-Imagery.png;
post.py turns them into the WebP previews in design-canvas/previews."""
import asyncio, json, os, sys
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.abspath(os.path.join(HERE, '..', '..'))          # artifacts/TL-016-team-site
SRC = os.path.join(SITE, 'design-canvas', 'project')
PACK = os.path.join(SITE, 'theme-pack')
OUT = os.environ.get('TL_PREVIEW_PNG', '/tmp/tl016-previews')
ASSETS = json.load(open(os.path.join(HERE, 'assets.json')))
ORDER = ['Main', 'Mandate', 'Products', 'TLTrust', 'Team', 'Wins', 'Research', 'Publications', 'Blog', 'Perspectives',
         'TLDay', 'Glossary', 'Glance', 'Write', 'System', 'TplBlog', 'TplWin', 'TplPaper', 'TplModelCard', 'TplRelease',
         'TplLeader', 'TplUseCase', 'TplSession', 'TplRoundup', 'TplPartner', 'TplAwards', 'Imagery']


async def route(r):
    url = r.request.url
    if '/_blob/' in url:
        f = ASSETS.get(url.rsplit('/', 1)[1])
        if f:
            return await r.fulfill(path=os.path.join(PACK, f))
        return await r.abort()
    if url.startswith('file:'):
        return await r.continue_()
    return await r.abort()                                          # nothing outside the repo is fetched


async def main():
    only = sys.argv[1:] or ORDER
    os.makedirs(OUT, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch(channel='chrome', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width': 1440, 'height': 1000}, device_scale_factor=1)
        await pg.route('**/*', route)
        for i, name in enumerate(ORDER, 1):
            if name not in only:
                continue
            await pg.goto('file://' + os.path.join(SRC, name + '.dc.html'), wait_until='load')
            await pg.wait_for_timeout(400)
            out = os.path.join(OUT, f'{i:02d}-{name}.png')
            await pg.screenshot(path=out, full_page=True)
            print(out)
        await b.close()

asyncio.run(main())
