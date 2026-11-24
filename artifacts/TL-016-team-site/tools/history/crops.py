import asyncio,sys,json
from playwright.async_api import async_playwright
# usage: crops.py '[["Board",y,h,"name"],...]'
spec=json.loads(sys.argv[1])
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(channel='chrome')
        pg=await b.new_page(viewport={'width':1440,'height':900})
        await pg.route('**/*',lambda r: r.continue_() if r.request.url.startswith('file:') else r.abort())
        for board,y,h,name in spec:
            await pg.goto(f'file:///home/claude/canvas-root/project/{board}.dc.html'); await pg.wait_for_timeout(150)
            await pg.screenshot(path=f'/home/claude/crops/{name}.png',full_page=True,clip={'x':0,'y':y,'width':1440,'height':h})
        await b.close()
asyncio.run(main())
