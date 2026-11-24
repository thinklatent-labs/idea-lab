import re,sys
from bs4 import BeautifulSoup, NavigableString, Tag
EMIT={'h1','h2','h3','h4','p','li','figcaption','blockquote','td','th','button','summary','dt','dd'}
def norm(t): return ' '.join(t.split())
def cls(e): return ' '.join(e.get('class') or [])
def style_px(e):
    m=re.search(r'font-size:\s*(\d+)px',e.get('style') or '')
    return int(m.group(1)) if m else None
def walk(sec):
    out=[]
    def rec(e):
        for c in e.children:
            if not isinstance(c,Tag): continue
            if c.name in ('script','style','svg','img','x-dc','template'): continue
            k=cls(c)
            if c.name=='a' and ('pill' in k or 'btn' in k):
                out.append(('BTN',c,norm(c.get_text(' ')))); continue
            if c.name in EMIT or (c.name in('span','div','a') and any(w in k.split() for w in ('cap','lead','kicker','num','big','stat','label','tag','chip','mchip','meta','src','note','q','quote','caption'))):
                t=norm(c.get_text(' '))
                if t: out.append((c.name,c,t))
                continue
            # bare text nodes inside div/span with no element children
            direct=''.join(x for x in c.children if isinstance(x,NavigableString)).strip()
            if direct and not c.find(['p','h1','h2','h3','h4','li','div','span','a']):
                out.append((c.name,c,norm(c.get_text(' '))))
                continue
            rec(c)
    rec(sec)
    return out
def load(p):
    s=BeautifulSoup(open(p).read(),'lxml')
    for t in s(['script','style','svg']): t.decompose()
    return [x for x in s.find_all('section') if not x.find_parent('section')]
if __name__=='__main__':
    for p in sys.argv[1:]:
        print('=====',p)
        for i,sec in enumerate(load(p)):
            print(f'--- {i+1} [{cls(sec)}] id={sec.get("id")}')
            for tag,e,t in walk(sec):
                print(f'  {tag}.{cls(e)[:18]}|{style_px(e) or ""}| {t[:110]}')
