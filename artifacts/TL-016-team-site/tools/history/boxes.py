import asyncio, json, sys
from playwright.async_api import async_playwright
SRC='/home/claude/canvas-root/project/'
Q={'Main':['header','.thumb.img'],'Blog':['.thumb.img'],'Perspectives':['.thumb.img'],'Products':['.thumb.img'],
   'System':['#logo','#imagery'],'TplWin':['aside[aria-label="Page properties"]'],'TplSession':['aside[aria-label="Page properties"]']}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(channel='chrome',args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':1440,'height':1000})
        await pg.route('**/*', lambda r: r.continue_() if r.request.url.startswith('file:') else r.abort())
        out={}
        for name,sels in Q.items():
            await pg.goto('file://'+SRC+name+'.dc.html', wait_until='load'); await pg.wait_for_timeout(300)
            for s in sels:
                bx=await pg.eval_on_selector_all(s,'els=>els.map(e=>{const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y+scrollY),Math.round(r.width),Math.round(r.height)]})')
                out[f'{name} {s}']=bx
        # check images loaded
        await pg.goto('file://'+SRC+'Imagery.dc.html', wait_until='load'); await pg.wait_for_timeout(500)
        st=await pg.eval_on_selector_all('img','els=>els.map(e=>[e.complete,e.naturalWidth])')
        out['imagery imgs']=[len(st), sum(1 for c,w in st if w>0)]
        await b.close()
    print(json.dumps(out))
asyncio.run(main())
