import re, glob, json, os
P='/home/claude/canvas-root/project/'
FONT_OLD='family=Inter:wght@300;400;500;600&amp;display=swap'
FONT_NEW='family=Inter:wght@300;400;500;600&amp;family=JetBrains+Mono:wght@400;500;600&amp;display=swap'
V10 = """
/* v10 · one type scale and palette gradients (2026-11-16, D-381) */
body{font-size:17px;line-height:1.6}
.wrap{max-width:1280px}
h1,h2,h3{font-weight:500}
.cap{font-size:14px;letter-spacing:0;text-transform:none;font-weight:600;color:#2E6B3C}
.meta{font-size:15px;line-height:1.5}
.h2{font-size:48px;line-height:1.06;font-weight:500;letter-spacing:-.032em}
.tag{height:28px;padding:0 12px;font-size:13px}
.nav a{font-size:15px}
.pill{min-height:48px;padding:0 22px;font-size:15px}
.pill.sm{min-height:40px;padding:0 16px;font-size:14px}
.panel{border-radius:28px}
.door{border-radius:24px;padding:26px}
.display{font-weight:300;letter-spacing:-.045em}
.jump a{font-size:14px;padding:8px 14px}
.tbl{font-size:15px}
.gl{font-size:17px}
.hero{background:radial-gradient(1100px 560px at 92% -4%,rgba(108,183,105,.38),rgba(108,183,105,0) 62%),radial-gradient(900px 520px at -4% 104%,rgba(47,122,109,.22),rgba(47,122,109,0) 60%),linear-gradient(180deg,#F7F7F5 0%,#EEF6F0 50%,#E2EFE7 100%)}
.hero.teal,.globe{background:radial-gradient(900px 520px at 90% -6%,rgba(108,183,105,.45),rgba(108,183,105,0) 60%),linear-gradient(140deg,#1F4A44 0%,#2F7A6D 100%)}
.wave,.green{background:radial-gradient(820px 480px at 92% -8%,rgba(108,183,105,.42),rgba(108,183,105,0) 62%),linear-gradient(135deg,#0C3F09 0%,#1B5128 40%,#1F4A44 76%,#2F7A6D 100%)}
.band{background:linear-gradient(180deg,#F7F7F5 0%,#E9F3EC 100%)}
.wave .pill.go,.green .pill.go,.globe .pill.go,.hero.teal .pill.go{background:#C4262E;color:#FFFFFF;border-color:rgba(255,255,255,.75)}
.wave .pill.go:hover,.green .pill.go:hover,.globe .pill.go:hover{background:#9A1B22;color:#FFFFFF}
.statement{font-size:56px;line-height:1.06;letter-spacing:-.035em;font-weight:500}
.chn{font-size:14px;text-transform:none;letter-spacing:.02em}
.ip-big dd{font-size:80px;letter-spacing:-.05em}
.iprow{font-size:16px}
.names span{font-size:20px}
.quote{font-size:26px}
.pillar{padding:32px;border-radius:28px}
.pillar .k{font-size:15px}
.fig figcaption{font-size:15px}
.boardnote{font-size:14px}
.mstrip{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.mchip{display:inline-flex;align-items:center;gap:10px;min-height:46px;padding:0 18px;border-radius:999px;background:#FFFFFF;border:1px solid #E6E6E2;font-size:15px;font-weight:500;color:#1A1A1A}
.mchip i{width:10px;height:10px;border-radius:50%;background:#3E9A5C;display:inline-block;flex:none}
.mchip.out{background:transparent;border-style:dashed;color:#5C5C5A}
.mchip.out i{background:#8A8A88}
.agent{display:grid;grid-template-columns:64px minmax(0,1.2fr) minmax(0,2fr) 150px 170px;gap:20px;align-items:center;padding:24px 0;border-bottom:1px solid #E6E6E2}
.agent .no{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:15px;color:#2E6B3C;font-weight:500}
.agent h3{font-size:22px}
.screen{border-radius:18px;aspect-ratio:16/10;background:radial-gradient(420px 220px at 88% -6%,rgba(108,183,105,.38),rgba(108,183,105,0) 62%),linear-gradient(160deg,#F2F2EF 0%,#E6F1EF 100%);border:1px solid #E6E6E2;display:flex;align-items:flex-end;padding:16px;font-size:14px;color:#5C5C5A}
.qa{display:flex;flex-direction:column;gap:10px;padding:28px;border-radius:24px;background:#FFFFFF;border:1px solid #E6E6E2}
.qa h3{font-size:22px}
.qa p{color:#3A3A38}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{display:inline-flex;align-items:center;min-height:38px;padding:0 14px;border-radius:999px;background:rgba(255,255,255,.78);border:1px solid #CFE6D6;font-size:14px;font-weight:500;color:#1B5128}
.sw{display:flex;flex-direction:column;gap:8px}
.sw b{display:block;height:88px;border-radius:18px;border:1px solid rgba(26,26,26,.08)}
.gfield{border-radius:28px;min-height:260px;padding:28px;display:flex;flex-direction:column;justify-content:flex-end;gap:6px}
.trow{display:grid;grid-template-columns:220px minmax(0,1fr) 300px;gap:24px;align-items:baseline;padding:22px 0;border-bottom:1px solid #E6E6E2}
@media (max-width:760px){.agent{grid-template-columns:44px minmax(0,1fr)}.agent>*:nth-child(n+3){grid-column:2}.trow{grid-template-columns:minmax(0,1fr)}}
"""
TMAP={'h1':{44:56,48:60,50:60,52:64,56:72,60:72,64:80,68:92},
 'h2':{20:24,22:26,24:28,26:30,30:36,32:40,34:40,36:44,40:56,44:56,48:60},
 'h3':{17:20,18:21,19:22,20:24,21:24,22:26,24:28},
 'p':{13:14,14:16,15:17,16:18,17:20,18:21,19:22,20:22,21:24,22:24,24:26,28:34,40:48,52:72,56:80,64:96,72:104,96:120,104:128},
 'span':{12:13,13:14,14:15,15:16,16:17,18:20,20:22,24:26,28:32,32:40,48:64},
 'a':{13:14,14:15},'div':{14:15},'figcaption':{14:15},'strong':{20:22}}
TAGRE=re.compile(r'<(h1|h2|h3|p|span|a|div|figcaption|strong)\b([^>]*?)style="([^"]*)"')
def remap(s):
    def f(m):
        tag,pre,st=m.group(1),m.group(2),m.group(3)
        st=re.sub(r'font-size:(\d+)px',lambda k:f"font-size:{TMAP.get(tag,{}).get(int(k.group(1)),int(k.group(1)))}px",st)
        if tag in('h1','h2'): st=st.replace('font-weight:400','font-weight:500')
        return f'<{tag}{pre}style="{st}"'
    return TAGRE.sub(f,s)
BAND='''<section class="wave" style="margin-top:96px">
  <div class="wrap" style="padding-top:112px;padding-bottom:112px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:22px">
    <h2 style="font-size:60px;line-height:1.04;font-weight:500;letter-spacing:-.035em;max-width:900px">Which part of your work should the model learn next?</h2>
    <p style="color:#D6E9DB;font-size:20px;max-width:620px">Tell us in your words. Every use case makes the next one easier.</p>
    <a class="pill go" href="Wins.dc.html#talk">Start a use case</a>
  </div>
</section>
'''
PAGES_BAND=['Blog','Glance','Glossary','Perspectives','Products','Publications','Research','TLDay','TLTrust','Team','Write']
log=[]
def rep(s,a,b,f,count=None,regex=False):
    n=len(re.findall(a,s)) if regex else s.count(a)
    if n==0: log.append(f'MISS {f}: {a[:60]}'); return s
    log.append(f'ok {f}: {n}x {a[:50]}')
    return re.sub(a,b,s) if regex else s.replace(a,b)

for path in sorted(glob.glob(P+'*.dc.html')):
    f=os.path.basename(path); name=f[:-8]
    if name=='System': continue
    s=open(path).read()
    s=s.replace(FONT_OLD,FONT_NEW)
    if '/* v10 ·' not in s:
        k=s.index('</style>'); s=s[:k]+V10+s[k:]
    s=remap(s)
    # dark panels get the forest gradient
    s=re.sub(r'(<div class="panel" style="[^"]*?)background:#1B5128',r'\1background:linear-gradient(150deg,#1B5128 0%,#0C3F09 100%)',s)
    # global number format: whole percentages and points
    s=s.replace('± 0.0[N]','± [N] pts').replace('↑ 0.0[N]','+[N] pts').replace('0.[NN]','[NN]%').replace('0.0[N]','[N] pts')
    if name=='Glance':
        s=rep(s,'Status: in shaping.','Status: in build; Retail Advice goes first.',f)
        s=rep(s,'Status: proposal.','Status: in build.',f)
        s=rep(s,r'35M(?:<[^>]+>)?\+?(?:</[^>]+>)?\s*\(Head of ThinkLatent · \[DATE\]\)','[N] (AI Gateway telemetry · [DATE])',f,regex=True)
        s=rep(s,'TLM generations in production: 3 (Products · [DATE])','TLM generations in use: 3 (model inventory · [DATE])',f)
        s=rep(s,'in production or preview','in use or in preview',f)
        s=rep(s,'Relay SDK, AI Gateway, HyperPod, the compression pipeline, self-healing. All in production.','Relay SDK, AI Gateway, HyperPod and the compression pipeline are in production; self-healing is built.',f)
        s=rep(s,'self-healing (in production)','self-healing (built)',f)
        s=rep(s,'TLM4 is in production and reached through Relay','TLM4 is in use and reached through Relay',f)
    if name=='Main':
        s=rep(s,'>In shaping<','>In build<',f); s=rep(s,'>Proposal<','>In build<',f); s=rep(s,'>3 generations live<','>3 generations in use<',f)
    if name=='Wins':
        s=rep(s,'Three generations of TLM are in production today.','Three generations of TLM are in use today.',f)
    if name=='Research':
        s=rep(s,r'In production(</span>\s*(?:<[^>]+>\s*)*Self-healing)',r'Built\1',f,regex=True)
    if name=='TplModelCard':
        s=rep(s,'[In production · Preview · Retired]','[In use · Preview · Retired] · inventory record [link]',f)
        s=rep(s,'[In production · Preview]','[In use · Preview]',f)
    if name=='Glossary':
        s=rep(s,'It registers each usage and logs every call.',"It registers each usage and logs calls as each use case's approval requires.",f)
        iv='<div class="gl" id="I"><b>Independent validation</b><span style="color:#3A3A38">Step four of How we build responsibly: the Enterprise\'s model risk management checks a model independently before it is approved. ThinkLatent supplies the evidence and does not sign.</span></div>'
        mi='<div class="gl" id="M"><b>Model inventory</b><span style="color:#3A3A38">The Enterprise\'s record of every model and its approval and validation status. Where this site and the inventory differ, the inventory is right.</span></div>'
        a=s.find('<div class="gl" id="I"><b>Index run</b>'); s=s[:a]+iv+s[a:] if a>0 else s; log.append(f'{"ok" if a>0 else "MISS"} glossary IV')
        a=s.find('<div class="gl" id="M"><b>Monitoring</b>'); s=s[:a]+mi+s[a:] if a>0 else s; log.append(f'{"ok" if a>0 else "MISS"} glossary MI')
    if name=='Mandate':
        s=rep(s,'Target: [TARGET, e.g. p95 ms per call]','Target: replies under 300 tokens in under 200 ms for the fastest service class, and over 1,000 tokens a second per request on TLM4 Core 27B',f)
    if name=='Products':
        s=rep(s,'>In shaping<','>In build<',f)
        s=rep(s,'>In production<','>In use<',f)
        s=rep(s,'TLM1 · in production','TLM1 · in use',f)
        s=rep(s,'telemetry on every call','request telemetry kept as each approval requires',f)
        s=rep(s,r'>3</p><p class="meta" style="margin-top:8px">in production</p>','>3</p><p class="meta" style="margin-top:8px">generations in use · model inventory · [date]</p>',f)
        s=rep(s,r'35M<span[^>]*>\+</span>','[n]',f,regex=True)
        s=rep(s,'client interactions a year, across voice, chat, web, email and SMS','client interactions a year across voice, chat, web, email and SMS · AI Gateway telemetry · [date]',f)
        s=rep(s,'Every model with its full card; every use case with its status, business unit and the one number it is measured by; try a model before you build.','Self-serve from first test to production: evaluate a use case, choose a model, train, deploy, run and watch it in one place, through five stages: Set up, Try, Build, Pilot, Production. Retail Advice goes first.',f)
        s=rep(s,'against a target of [N].','against a threshold of [N]%.',f)
        s=rep(s,'judging, coding and agent skills.',"judging, coding and agent skills, plus a Real Enterprise category built from every use case's own score.",f)
        STRIP='''<section id="models" class="sec">
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:16px"><div><p class="cap">The models</p><h2 class="h2" style="max-width:900px">TLM first. Frontier models where the TL Index shows they win.</h2><p style="color:#5C5C5A;margin-top:12px;max-width:760px;font-size:18px">Every team starts on a TLM model. An outside model is used only where the TL Index shows it does the task better, and the index runs those models every month so the comparison stays fair.</p></div><a class="pill" href="#index">How the index compares</a></div>
    <div class="mstrip"><span class="mchip"><i></i>TLM4 Core 27B</span><span class="mchip"><i></i>TLM4 Core 7B</span><span class="mchip"><i></i>TLM4 Distil</span><span class="mchip"><i style="background:#2F7A6D"></i>TLM4 Domain: Advice, Compliance, Judge, Cybersecurity</span><span class="mchip"><i style="background:#1B5128"></i>TLM1 speech and classifiers</span><span class="mchip"><i style="background:#6CB769"></i>TLM5, in work</span><span class="mchip out"><i></i>Frontier and open models, as the comparison set</span></div>
  </section>
  <section class="sec">
    <div><p class="cap">What you can use</p><h2 class="h2">Six things, each shown as it looks</h2><p style="color:#5C5C5A;margin-top:12px;max-width:760px;font-size:18px">Each card opens the real screen. The pictures are captures of the ThinkLatent Portal, refreshed at each release.</p></div>
    <div class="grid g3">'''+''.join(f'''
      <a class="panel card" href="{h}" style="padding:14px;gap:0"><div class="screen">{cap}</div><div style="padding:18px 8px 8px;display:flex;flex-direction:column;gap:6px"><h3 style="font-size:24px">{t}</h3><p class="meta">{g}</p></div></a>''' for h,cap,t,g in [
 ('#portal','[Capture: the command centre]','ThinkLatent Portal','Take a use case from first test to production in one place.'),
 ('#tlm',"[Capture: a model's page]",'TLM',"Models trained on the Enterprise's own knowledge, sized for the job."),
 ('#index','[Capture: Head to head]','The TL Index','See which model wins on your task before you choose one.'),
 ('TLTrust.dc.html','[Capture: the six steps]','How we build responsibly','See the steps every model goes through, and who is responsible for each.'),
 ('#portal','[Capture: a Relay call]','Relay','Call a ThinkLatent model the way you already call any model.'),
 ('#portal',"[Capture: a use case's gaps]",'Self-healing',"Models that find what they don't know yet and learn it.")])+'''
    </div>
  </section>
  '''
        WHERE='''<section class="globe" style="border-radius:32px;padding:56px;display:flex;flex-direction:column;gap:28px">
    <div><p class="cap" style="color:#D3ECE6">Where TLM works</p><h2 class="h2" style="color:#FFFFFF;max-width:860px">Six kinds of work, each on the model built for it</h2></div>
    <div class="grid g3" style="gap:0 40px">'''+''.join(f'''
      <div style="padding:22px 0;border-top:1px solid rgba(255,255,255,.24);display:flex;flex-direction:column;gap:10px"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><h3 style="font-size:24px;color:#FFFFFF">{t}</h3><span class="tag" style="background:rgba(255,255,255,.16);color:#FFFFFF">{st}</span></div><p style="color:#D3ECE6;font-size:17px">{d}</p></div>''' for t,st,d in [
 ('Advice','Domain · preview','Helps advisors prepare and check guidance the way the Enterprise gives it.'),
 ('Compliance','Domain · preview','Pre-reviews documents and marketing, so reviewers start from flagged and explained passages.'),
 ('Judge','Domain · preview',"Scores other models' answers against a rubric, so quality is measured the same way everywhere."),
 ('Cybersecurity','Domain · preview',"Reads alerts and logs with the Enterprise's own context."),
 ('Knowledge','Core',"Answers from the Enterprise's own documents, with the sources shown."),
 ('Servicing','TLM1 · Core','Turns client calls into text and helps teams act on what was asked.')])+'''
    </div>
  </section>
  <section id="agents" class="sec">
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:16px"><div><p class="cap">What runs on TLM</p><h2 class="h2">Agents, in the order they ship</h2><p style="color:#5C5C5A;margin-top:12px;max-width:760px;font-size:18px">Each one is a packaged pattern a team can adopt from the agent library in the ThinkLatent Portal. Agents propose; people decide.</p></div><a class="pill" href="#">Open the agent library ↗</a></div>
    <div style="border-top:1px solid #E6E6E2">'''+''.join(f'''
      <div class="agent"><span class="no">0{n}</span><h3>{t}</h3><p style="color:#3A3A38">{d}</p><span class="tag grey" style="justify-self:start">[Status]</span><a href="#" style="font-weight:500">Open in the portal ↗</a></div>''' for n,t,d in [
 (1,'Knowledge agent',"Answers from the Enterprise's own documents, with the sources shown."),
 (2,'After-call agent','Drafts the call summary and the notes for the advisor to check and send.'),
 (3,'Marketing pre-review','Flags, explains and suggests a rewrite before compliance review.'),
 (4,'Task mining','Finds the tasks a team repeats most, to choose what a model learns next.')])+'''
    </div>
    <p class="boardnote"><b>Board note.</b> Order from the agent library (TL-012, TL-003): the knowledge agent ships first; the other three are wave 1. Status words stay in brackets until each one is live.</p>
  </section>
  '''
        a=s.index('<section id="tlm" class="sec">'); s=s[:a]+STRIP+s[a:]
        b=s.index('<section id="tlm" class="sec">'); c=s.index('<section class="sec">',b); s=s[:c]+WHERE+s[c:]
        log.append('ok Products sections')
    if name=='TLTrust':
        s=rep(s,'<a href="#lifecycle">The steps</a>','<a href="#lifecycle">The steps</a><a href="#questions">Six questions</a>',f)
        CH='<div class="chips" aria-label="In short" style="margin-top:6px">'+''.join(f'<span class="chip">{c}</span>' for c in ['Hosted inside the Enterprise','No calls out to outside AI services [to confirm]','Requests logged as each approval requires','Approval by model risk management','Break-glass access logged [to confirm]','Cost shown per use case'])+'</div>'
        k=s.index('</nav>',s.index('<nav class="jump" aria-label="On this page">'))+6; s=s[:k]+'\n    '+CH+s[k:]
        Q='''<section id="questions" class="sec">
    <div><p class="cap">Six questions teams ask first</p><h2 class="h2">Where your data goes, and who decides</h2></div>
    <div class="grid g3">'''+''.join(f'''
      <div class="qa"><h3>{q}</h3><p>{a}</p></div>''' for q,a in [
 ('Where does my data live?',"Inside the Enterprise, on ThinkLatent's own serving, reached through the AI Gateway. [Locations and retention, to confirm with IT security.]"),
 ('Who can see it?','Members of your use case and the ThinkLatent engineers who run the service, under the access your approval sets. [Roles, to confirm with governance.]'),
 ('How is a model approved?',"By the Enterprise's model risk management, after ThinkLatent's own evaluation on the TL Index. ThinkLatent does not approve its own models."),
 ('What is logged?',"Requests and responses, as each use case's approval requires, so an answer can be traced back. [Retention, to confirm.]"),
 ('What is break-glass?','Emergency access for a named person when production must be fixed fast: time-limited, approved and logged. [Duration and approver, pending Risk.]'),
 ('What does it cost?','Each use case sees its own spend in the ThinkLatent Portal, beside the cost avoided against an outside model. [Charging model, to confirm.]')])+'''
    </div>
  </section>
  '''
        a=s.index('<section id="show"'); s=s[:a]+Q+s[a:]
        EX='''<section class="sec">
    <div><p class="cap">The two hard questions, explained</p><h2 class="h2">Pinned for anyone who asks</h2></div>
    <div class="grid g2">
      <a class="panel card" href="TplBlog.dc.html" style="padding:14px;gap:0"><div class="screen">[Image from the team's set]</div><div style="padding:18px 8px 8px;display:flex;flex-direction:column;gap:8px"><span class="tag" style="align-self:flex-start">Pinned · Deep dive</span><h3 style="font-size:26px">Where your request goes when you call TLM</h3><p class="meta">From your application to the gateway, the model and back, and what is kept on the way.</p></div></a>
      <a class="panel card" href="TplBlog.dc.html" style="padding:14px;gap:0"><div class="screen">[Image from the team's set]</div><div style="padding:18px 8px 8px;display:flex;flex-direction:column;gap:8px"><span class="tag" style="align-self:flex-start">Pinned · Deep dive</span><h3 style="font-size:26px">Who runs the model behind the API</h3><p class="meta">The engineers behind every endpoint: serving, monitoring, on-call and change control.</p></div></a>
    </div>
  </section>
  '''
        a=s.index('<section class="grid g2" style="align-items:start">\n    <div id="ask"'); s=s[:a]+EX+s[a:]
        log.append('ok TLTrust sections')
    if name in PAGES_BAND and 'class="wave"' not in s:
        a=s.find('<div class="wrap"><div class="comments">')
        if a<0: a=s.find('<footer')
        s=s[:a]+BAND+s[a:]; log.append(f'ok band {name}')
    open(path,'w').write(s)
print('\n'.join(l for l in log if l.startswith('MISS')) or 'no misses'); print(len([l for l in log if l.startswith('ok')]),'ok')
