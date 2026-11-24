import re,sys,json
sys.path.insert(0,'/home/claude/gen')
from copyx import walk, cls, style_px, norm
from bs4 import BeautifulSoup
from bs4 import Tag
PAGES=[('Main','Home'),('Mandate','Mandate'),('Products','Products'),('TLTrust','How we build responsibly'),('Team','Team'),
 ('Wins','Wins'),('Research','Research'),('Publications','Publications'),('Blog','Blog'),('Perspectives','AI Perspectives'),
 ('TLDay','ThinkLatent Day'),('Glossary','Glossary'),('Glance','ThinkLatent at a glance'),('Write','Write for ThinkLatent')]
TPL=[('TplBlog','Blog post','Perspective or Deep dive'),('TplWin','Win story','Win'),('TplPaper','Paper explained','Paper explained'),
 ('TplModelCard','Model card','Model card'),('TplRelease','Release notes','Release'),('TplLeader','Leadership series','Leadership'),
 ('TplUseCase','Use case','Use case'),('TplSession','AI Perspectives session','Session'),('TplRoundup','Conference roundup','Roundup'),
 ('TplPartner','New partner','Partner'),('TplAwards','ThinkLatent quarterly awards','Awards')]
NAME=dict(PAGES); NAME.update({t[0]:t[1]+' template' for t in TPL})
def target(href):
    if not href: return ''
    if href.startswith('#'): return 'this page, '+href[1:]+' section'
    m=re.match(r'([A-Za-z]+)\.dc\.html(#(\w+))?',href)
    if m and m.group(1).startswith('Tpl'):
        return 'the Write for ThinkLatent page, templates section'
    if m:
        pg=NAME.get(m.group(1),m.group(1))
        if m.group(3)=='talk': return 'the Bring us a problem form'
        return pg+(' page, '+m.group(3)+' section' if m.group(3) else ' page')
    return '[address to come]'
# collapse rules: page -> section -> list of (start_text, end_text|None, description, list_titles)
C={
 'Main':{4:[('The latest win',"This quarter's ThinkLatent awards",'List web part on the Wins list, one item: the featured win with its number, source, date, approved quote and what compounded. Nothing to type.',False),
            ("This quarter's ThinkLatent awards",'New partner','News web part, Category = Awards, the latest post; its button reads "All six winners".',False),
            ('New partner','This month · from the Head of ThinkLatent and the monthly email','News web part, Category = Partner, the latest post.',False)],
         7:[('Release','ThinkLatent community · Viva Engage web part','News web part, list layout, the newest four, filtered by the Category buttons above.',True),
            ('ThinkLatent community · Viva Engage web part','Use AI at the Enterprise','Viva Engage web part: the ThinkLatent community, titled "Questions, wins and follow-ups", with an "Open the community" button.',False)]},
 'Products':{10:[('TLM4 Core 7B in FP8: [what it is new for, in outcomes]',None,'News web part, Category = Release, the newest three.',False)]},
 'TLTrust':{5:[('Product',None,'List web part on the Process stage list (Stage formatted with stage-column-format.json). Seed rows are in process-stage.csv: TLM4 Core, TLM4 Distil, TLM4 Domain · Advice, TLM5.',False)],
            7:[("[Image from the team's set]",None,'News web part with two posts pinned, both Deep dive: "Where your request goes when you call TLM" (from your application to the gateway, the model and back, and what is kept on the way) and "Who runs the model behind the API" (the engineers behind every endpoint: serving, monitoring, on-call and change control).',False)]},
 'Team':{3:[('Jithin Pradeep','Everyone · People web part','People web part, heads first: Jithin Pradeep (Head of ThinkLatent · Director, the university lab · since [YEAR]); [Name], Head of Research; [Name], Head of Applied Research; [Name], Head of AI Products; [Name], Principal AI/ML Scientist (Advancing SLMs, Causal AI); [Name], Principal AI/ML Scientist (Responsible AI, Cognitive AI). Under it, Highlighted content filtered by author lists each person\'s posts and publications.',False),
            ('Everyone · People web part',None,'People web part, compact layout: everyone in ThinkLatent, searchable by name, function and location.',False)]},
 'Wins':{2:[('[Partner team]',None,'List web part on the Wins list, gallery layout, with the filter buttons above. Each card shows the partner team, what they can do now, the number and unit, what it measures with its date and tier, the approved quote with name and role, and what compounded.',False)],
         3:[('New partner',None,'News web part, Category = Partner, the newest three.',False)]},
 'Publications':{2:[('Type',None,'List web part on the Publications list: Type, Title and authors, Venue, Status, Year, with filters for type, year, theme, the university and status. Seed rows are in publications.csv.',False)],
                 3:[('Roundup',None,'News web part, Category = Roundup.',True)]},
 'Blog':{2:[('Paper explained',None,'News web part: the featured post first, then list layout, filtered by Category (Perspective, Deep dive).',True)]},
 'Perspectives':{4:[('Aligning pretraining data with downstream uses: small models, done right',None,'Highlighted content (or the Stream web part) showing the recordings library, newest first.',True)]},
 'Glossary':{2:[('Agent',None,'List web part on the Glossary list, filtered by letter with the buttons above. Import glossary.csv to create it.',False)]},
}
BG={'hero':'Meadow','wave':'Canopy','globe':'Lagoon','hero teal':'Lagoon'}
def background(page,i,c):
    if page=='Perspectives' and i==1: return 'Lagoon'
    if page=='Main' and i==6: return 'Mint rise'
    if 'wave' in c: return 'Canopy'
    if 'globe' in c or 'teal' in c: return 'Lagoon'
    if i==1 and page not in ('Glance',) and not page.startswith('Tpl'): return 'Meadow'
    return ''
def style(tag,e,t):
    k=cls(e).split(); s=style_px(e)
    if 'boardnote' in k: return 'Note'
    if 'web part' in t.lower() and len(t)<=110: return 'Web part'
    if tag=='BTN': return 'Button (red)' if 'go' in k else 'Button'
    if tag=='ROW': return 'Table row'
    if tag=='HEAD': return 'Table header'
    if 'av' in k: return None
    if tag=='h1': return f'Heading 1 · {s or 72}'
    if tag=='h2': return f'Heading 1 · {s or 48}'
    if tag=='h3':
        s=s or 26
        return f'Heading 2 · {s}' if s>=24 else f'Heading 3 · {s}'
    if tag=='h4': return 'Heading 3 · 22'
    if 'statement' in k: return 'Heading 1 · 48, centred'
    if 'display' in k: return f'Number · {s or 80}'
    if 'cap' in k or 'chn' in k: return 'Label'
    if 'tag' in k or 'mark' in k or 'k' in k or 'no' in k or 'fact' in k: return 'Label'
    if 'mchip' in k: return 'Quick link'
    if 'guide' in k: return 'Instruction box'
    if 'prop' in k: return 'Page property'
    if 'fill' in k: return 'Body'
    if 'screen' in k: return 'Image'
    if tag=='blockquote': return 'Pull quote'
    if tag=='figcaption': return 'Caption'
    if tag=='li': return 'Bullet'
    if tag in ('dt',): return 'Label'
    if tag in ('dd',): return 'Number · 80'
    if tag=='strong' or tag=='b': return 'Link title' if '↗' in t else 'Bold'
    if tag=='a': return 'Link'
    if 'meta' in k or 'note' in k: return 'Small'
    if tag=='p':
        if s and s>=20: return f'Lead · {s}'
        if s and s<=15: return 'Small'
        return 'Body'
    return 'Text'
def rows_of(sec):
    out=[]
    for tag,e,t in walk(sec):
        out.append([tag,e,t])
    # group table rows
    res=[];
    for tag,e,t in out:
        tr=e.find_parent('tr') if tag in('td','th') else None
        rowdiv=None
        p=e.parent
        while p is not None and p is not sec:
            if any(c in ('iprow','trow') for c in (p.get('class') or [])): rowdiv=p; break
            p=p.parent
        grp=tr or rowdiv
        if grp is not None:
            if res and res[-1][1] is grp: res[-1][2].append(t); continue
            res.append(['HEAD' if (tr is not None and tag=='th') or (rowdiv is not None and 'h' in (rowdiv.get('class') or [])) else 'ROW',grp,[t]]); continue
        res.append([tag,e,t])
    return [[a,b,(' · '.join(c) if isinstance(c,list) else c)] for a,b,c in res]
def esc(t): return t.replace('|','/').replace('\n',' ')
def blocks_of(path):
    s=BeautifulSoup(open(path).read(),'lxml')
    for t in s(['script','style','svg']): t.decompose()
    for t in s.select('span.av'): t.decompose()
    root=s.find('header').parent
    out=[]; owners=None
    def take(c):
        nonlocal owners
        if c.name in('header','footer','script'): return
        t=' '.join(c.get_text(' ').split())
        if not t: return
        if c.find(class_='owners') is not None or 'owners' in (c.get('class') or []):
            owners=c.find(class_='owners') or c; return
        if c.find(class_='comments') is not None or 'comments' in (c.get('class') or []): return
        if c.name!='section' and c.find('strong') is not None and t.startswith('Template ·'): out.append(('intro',c)); return
        if c.name=='section': out.append(('section',c)); return
        if c.find('section') is not None or c.name=='main' or (c.find('article') is not None and c.find('aside') is not None):
            for k in c.find_all(recursive=False): take(k)
            return
        out.append(('div',c))
    for c in root.find_all(recursive=False): take(c)
    if owners is not None: out.append(('owners',owners))
    return out
LEAF={'p','h1','h2','h3','h4','li','figcaption','blockquote','a','span','strong'}
def render(page,label,tpl=None):
    bl=blocks_of(f'/home/claude/canvas-root/project/{page}.dc.html')
    rules=[r for rs in C.get(page,{}).values() for r in rs]; used=set()
    md=[]; brackets=[]; n=0
    intro=[' '.join(x.get_text(' ').split()) for k,x in bl if k=='intro' for x in x.find_all(['span'])]
    if intro: md.append('*'+' '.join(intro)+'*'); md.append('')
    for kind,sec in bl:
        if kind=='intro': continue
        n+=1
        if sec.name in LEAF and not sec.find(['p','h2','h3','li','div']):
            rows=[[sec.name,sec,norm(sec.get_text(' '))]]
        elif kind=='owners':
            rows=[['prop',None,norm(x.get_text(' '))] for x in sec.find_all('span',recursive=False)] or [['prop',None,norm(sec.get_text(' '))]]
        else:
            rows=rows_of(sec)
        for ri,(st,en,desc,titles) in enumerate(rules):
            if ri in used: continue
            idx=[j for j,r in enumerate(rows) if r[2]==st or r[2].startswith(st+' ·')]
            if not idx: continue
            used.add(ri); a=idx[0]; b=len(rows)
            if en:
                e2=[j for j,r in enumerate(rows) if j>a and r[2]==en]
                b=e2[0] if e2 else len(rows)
            d=desc
            if titles:
                ts=[r[2] for r in rows[a:b] if r[0]=='h3']
                if ts: d+=' First posts to write: '+'; '.join(ts)+'.'
            rows=rows[:a]+[['WP',None,d]]+rows[b:]
        if kind=='owners': title='Page owners and review'
        else:
            heads=[r[2] for r in rows if r[0] in('h1','h2')]
            caps=[r[2] for r in rows if r[1] is not None and r[0] not in('WP','prop') and 'cap' in cls(r[1]).split()]
            h3=[r[2] for r in rows if r[0]=='h3']
            if heads or caps or h3: title=(heads or caps or h3)[0]
            elif rows and all(r[0]=='BTN' for r in rows): title='Filter buttons'
            elif rows: title=rows[0][2].split(' · ')[0].split(':')[0]
            else: title='Continued'
        title=re.sub(r'\s+',' ',title)
        if len(title)>64: title=title[:61].rsplit(' ',1)[0]+'…'
        bg='' if kind=='owners' else background(page,n,cls(sec))
        md.append(f"### {n} · {esc(title)}"+(f" · background {bg}" if bg else '')); md.append('')
        md.append('| Style | Copy |'); md.append('| --- | --- |')
        for tag,e,t in rows:
            if tag=='WP': st='Web part'
            elif tag=='prop': st='Page property'
            else:
                st=style(tag,e,t)
                if st is None: continue
            if t.startswith('(source link withheld)'): t="The lab's own site ↗"
            extra=None
            if st not in('Web part','Builder note','Note') and 'web part' in t.lower():
                sents=re.split(r'(?<=[.:])\s+',t)
                keep=[x for x in sents if 'web part' not in x.lower()]; wp=[x for x in sents if 'web part' in x.lower()]
                if keep: t=' '.join(keep); extra=' '.join(wp)
                else: st='Web part'
            if st=='Note': t='*'+re.sub(r'^Board note[^.]*\.\s*','',t)+'*'; st='Builder note'
            if tag=='BTN':
                tg=target(e.get('href'))
                if tg: t=f'{t} → {tg}'
            elif tag=='a' and e is not None:
                tg=target(e.get('href'))
                if tg and '↗' not in t: t=f'{t} → {tg}'
            brackets+= [(page,n,title,bk,t) for bk in re.findall(r'\[[^\]]{1,90}\]',t)]
            md.append(f'| {st} | {esc(t)} |')
            if extra: md.append(f'| Web part | {esc(extra)} |')
        md.append('')
    return '\n'.join(md), brackets
if __name__=='__main__':
    allb=[]
    for p,l in PAGES:
        m,b=render(p,l); allb+=b
        open(f'/home/claude/copydoc/{p}.md','w').write(m)
    for p,l,cat in TPL:
        m,b=render(p,l); open(f'/home/claude/copydoc/{p}.md','w').write(m)
    json.dump(allb,open('/home/claude/copydoc/brackets.json','w'),ensure_ascii=False,indent=0)
    print('brackets on pages',len(allb),'distinct',len({(x[0],x[3]) for x in allb}))
