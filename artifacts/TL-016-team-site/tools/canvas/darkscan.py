"""Dark-block scan: lists large dark blocks on each board, so a deep field can only be where the design system allows it. Needs Python 3, Playwright and Chrome."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.abspath(os.path.join(HERE, '..', '..'))          # artifacts/TL-016-team-site
SRC = os.path.join(SITE, 'design-canvas', 'project')
import asyncio,json,sys
from playwright.async_api import async_playwright
order=['Main','Mandate','Products','TLTrust','Team','Wins','Research','Publications','Blog','Perspectives','TLDay','Glossary','Glance','Write','System','TplBlog','TplWin','TplPaper','TplModelCard','TplRelease','TplLeader','TplUseCase','TplSession','TplRoundup','TplPartner','TplAwards','Imagery']
JS=r'''
() => {
 const out=[];
 const lum=(r,g,b)=>{const f=c=>{c/=255;return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};
 for (const el of document.querySelectorAll('body *')) {
   const cs=getComputedStyle(el); const bg=cs.backgroundColor; const bi=cs.backgroundImage;
   const m=bg.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
   let dark=false, how='';
   if(m){const a=m[4]===undefined?1:parseFloat(m[4]); if(a>0.6 && lum(+m[1],+m[2],+m[3])<0.06){dark=true;how=bg}}
   if(bi && bi!=='none' && /gradient/.test(bi)){ // gradient with dark stops
     const stops=[...bi.matchAll(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/g)];
     const darkStops=stops.filter(s=>{const a=s[4]===undefined?1:parseFloat(s[4]);return a>0.6&&lum(+s[1],+s[2],+s[3])<0.06});
     if(darkStops.length){dark=true;how='gradient:'+bi.slice(0,80)}
   }
   if(!dark) continue;
   const r=el.getBoundingClientRect(); if(r.width*r.height<1500) continue;
   const txt=(el.innerText||'').replace(/\s+/g,' ').trim().slice(0,60);
   out.push({tag:el.tagName.toLowerCase(),cls:el.className&&el.className.baseVal===undefined?el.className:'',w:Math.round(r.width),h:Math.round(r.height),y:Math.round(r.top+window.scrollY),how,txt});
 }
 return out;
}'''
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(channel='chrome')
        pg=await b.new_page(viewport={'width':1440,'height':900})
        await pg.route('**/*',lambda r: r.continue_() if r.request.url.startswith('file:') else r.abort())
        res={}
        for n in order:
            await pg.goto('file://' + os.path.join(SRC, n + '.dc.html')); await pg.wait_for_timeout(150)
            res[n]=await pg.evaluate(JS)
        await b.close()
    for n,items in res.items():
        for it in items:
            print(f"{n:13} {it['tag']:7} {it['cls'][:28]:28} {it['w']:5}x{it['h']:<5} y={it['y']:<6} {it['how'][:32]:32} | {it['txt']}")
asyncio.run(main())
