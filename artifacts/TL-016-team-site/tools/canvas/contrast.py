"""Text contrast scan: prints every text whose contrast with its background is under WCAG AA (4.5:1, or 3:1 for large text) on each board, then TOTAL. Needs Python 3, Playwright and Chrome.
  python3 contrast.py               # every board
  python3 contrast.py Main,System   # some boards"""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.abspath(os.path.join(HERE, '..', '..'))          # artifacts/TL-016-team-site
SRC = os.path.join(SITE, 'design-canvas', 'project')
import asyncio,sys
from playwright.async_api import async_playwright
order=['Main','Mandate','Products','TLTrust','Team','Wins','Research','Publications','Blog','Perspectives','TLDay','Glossary','Glance','Write','System','TplBlog','TplWin','TplPaper','TplModelCard','TplRelease','TplLeader','TplUseCase','TplSession','TplRoundup','TplPartner','TplAwards','Imagery']
if len(sys.argv)>1: order=sys.argv[1].split(',')
JS=r'''
() => {
 const parse=s=>{const m=s&&s.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);return m?[+m[1],+m[2],+m[3],m[4]===undefined?1:+m[4]]:null};
 const lum=c=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2])};
 const over=(top,bot)=>{const a=top[3];return [top[0]*a+bot[0]*(1-a),top[1]*a+bot[1]*(1-a),top[2]*a+bot[2]*(1-a),1]};
 const bgOf=el=>{ // composite backgrounds from root down to el
   const chain=[];let e=el;while(e&&e.nodeType===1){chain.push(e);e=e.parentElement}
   let c=[255,255,255,1];
   for(let i=chain.length-1;i>=0;i--){const cs=getComputedStyle(chain[i]);const b=parse(cs.backgroundColor);if(b&&b[3]>0)c=over(b,c);
     // gradient: if opaque stop present and element is a band-like block, approximate with first opaque stop
     const bi=cs.backgroundImage; if(bi&&bi.includes('linear-gradient')){const st=[...bi.matchAll(/rgba?\([^)]*\)/g)].map(x=>parse(x[0])).filter(x=>x&&x[3]>0.9); if(st.length)c=st[0]}
   }
   return c};
 const out=[];
 for(const el of document.querySelectorAll('body *')){
   const own=[...el.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim().length>0); if(!own.length) continue;
   const cs=getComputedStyle(el); if(cs.visibility==='hidden'||cs.display==='none'||parseFloat(cs.opacity)<0.2) continue;
   const r=el.getBoundingClientRect(); if(r.width<2||r.height<2) continue;
   let fg=parse(cs.color); const bg=bgOf(el); if(fg[3]<1) fg=over(fg,bg);
   const L1=lum(fg),L2=lum(bg); const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
   const fs=parseFloat(cs.fontSize), fw=parseInt(cs.fontWeight); const large=fs>=24||(fs>=18.66&&fw>=700);
   const need=large?3:4.5;
   if(ratio<need){out.push({tag:el.tagName.toLowerCase(),cls:(typeof el.className==='string'?el.className:''),txt:own.map(n=>n.textContent).join(' ').replace(/\s+/g,' ').trim().slice(0,50),fg:fg.slice(0,3).map(Math.round).join(','),bg:bg.slice(0,3).map(Math.round).join(','),ratio:Math.round(ratio*100)/100,y:Math.round(r.top+scrollY),fs})}
 }
 return out}'''
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(channel='chrome')
        pg=await b.new_page(viewport={'width':1440,'height':900})
        await pg.route('**/*',lambda r: r.continue_() if r.request.url.startswith('file:') else r.abort())
        tot=0
        for n in order:
            await pg.goto('file://' + os.path.join(SRC, n + '.dc.html')); await pg.wait_for_timeout(120)
            res=await pg.evaluate(JS); tot+=len(res)
            for it in res: print(f"{n:13} {it['tag']:6} {it['cls'][:22]:22} {it['ratio']:5} fg={it['fg']:13} bg={it['bg']:13} y={it['y']:<6} fs={it['fs']:<4} | {it['txt']}")
        print('TOTAL',tot)
        await b.close()
asyncio.run(main())
