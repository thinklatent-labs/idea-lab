import re,glob,os
os.chdir('/home/claude/canvas-root/project')
ADD='''/* v11.1 · attention blocks, closing cards, thumbnails and avatars */
.attn{background:#E6F2EC !important;border:1px solid #B0D1C4 !important;color:#0B0F0C !important;box-shadow:none !important}
.gen.attn .g{color:#0B5F33 !important}
.thumb.wave{background:#E3F0EF !important;color:#0B0F0C}
.close{background:#0C2822 !important;color:#FFFFFF}
:is(.wave,.close) .pill:not(.go){background:#FFFFFF;color:#0B0F0C;border-color:#FFFFFF}
:is(.wave,.close) .pill:not(.go):hover{background:#E6F2EC;color:#0B0F0C;border-color:#E6F2EC}
:is(.wave,.close) .pill.go{background:#C20028;color:#FFFFFF;border-color:rgba(255,255,255,.75)}
.wave :is(.panel,.glass,.card) :is(.cap,.meta){color:#4A524D}
:is(.hero.teal,.globe,.green,.glass.g,.glass.t,.attn) .av.ink,.av.ink{background:#0B0F0C !important;color:#FFFFFF !important;border-color:transparent !important}
'''
def sub1(t,old,new,f,count=1,allow_more=False):
    n=t.count(old)
    if n==0 or (n!=count and not allow_more): raise SystemExit(f'{f}: expected {count} of {old[:70]!r}, found {n}')
    return t.replace(old,new)
done=[]
for f in sorted(glob.glob('*.dc.html')):
    t=open(f).read()
    i=t.find('/* v11 · design kit'); j=t.find('</style>',i)
    assert i>0 and j>i, f
    blk=t[i:j]
    if 'v11.1' not in blk:
        blk=blk.replace(',.glass.g,.glass.t)',',.glass.g,.glass.t,.attn)')
        blk=blk.rstrip('\n')+'\n'+ADD
        t=t[:i]+blk+t[j:]
    # buttons that were green
    t=t.replace('background:#18493D;color:#FFFFFF;padding:0 20px;min-height:44px','background:#0B0F0C;color:#FFFFFF;padding:0 20px;min-height:44px')
    # template closing cards
    t=re.sub(r'<div class="card" style="background:#(?:12382F|0C2822);color:#FFFFFF;',r'<div class="card close" style="background:#0C2822;color:#FFFFFF;',t)
    open(f,'w').write(t); done.append(f)

def edit(f,pairs):
    t=open(f).read()
    for old,new,*c in pairs: t=sub1(t,old,new,f,*(c or [1]))
    open(f,'w').write(t)

edit('Main.dc.html',[
 ('<div class="panel" style="gap:12px;grid-column:1/-1;background:linear-gradient(150deg,#18493D 0%,#0C2822 100%);border-color:#0B5F33;display:flex;flex-direction:column;padding:28px">','<div class="panel attn" style="gap:12px;grid-column:1/-1;display:flex;flex-direction:column;padding:28px">'),
 ('<span class="tag" style="background:rgba(255,255,255,.12);color:#B0D1C4">This month','<span class="tag">This month'),
 ('<span class="meta" style="color:#A6DDBC">[MONTH]</span>','<span class="meta">[MONTH]</span>'),
 ('<h3 style="font-size:26px;color:#FFFFFF">[This month','<h3 style="font-size:26px">[This month'),
 ('gap:6px;font-size:15px;color:#B0D1C4"><li>[The biggest','gap:6px;font-size:15px;color:#3A413C"><li>[The biggest'),
 ('<a href="Blog.dc.html#archive" style="color:#FFFFFF;font-weight:500">Newsletter archive</a>','<a href="Blog.dc.html#archive" style="font-weight:500">Newsletter archive</a>'),
])
t=open('Blog.dc.html').read()
a=t.find('<section id="review"'); b=t.find('</section>',a)
sec=t[a:b]
for old,new in [('class="panel" style="padding:32px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:24px;align-items:center;background:#18493D;border-color:#0B5F33;color:#FFFFFF"','class="panel attn" style="padding:32px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:24px;align-items:center"'),
                ('<span class="tag" style="background:rgba(255,255,255,.12);color:#B0D1C4">','<span class="tag">'),
                (';margin-top:12px;color:#FFFFFF">ThinkLatent in 2026',';margin-top:12px">ThinkLatent in 2026'),
                ('<p style="color:#B0D1C4;margin-top:8px;max-width:560px">','<p style="color:#3A413C;margin-top:8px;max-width:560px">')]:
    assert sec.count(old)==1,(old,sec.count(old)); sec=sec.replace(old,new)
assert sec.count('style="color:#FFFFFF;border-color:rgba(255,255,255,.2)"')==2; sec=sec.replace('style="color:#FFFFFF;border-color:rgba(255,255,255,.2)"','style="color:#0B0F0C;border-color:#B0D1C4"')
assert sec.count('<span class="meta" style="color:#A6DDBC">')==2; sec=sec.replace('<span class="meta" style="color:#A6DDBC">','<span class="meta">')
open('Blog.dc.html','w').write(t[:a]+sec+t[b:])
edit('Products.dc.html',[
 ('<li class="gen" style="background:#18493D;border-color:#0B5F33"><span class="g" style="color:#A6DDBC">TLM4 · current</span><h3 style="font-size:21px;color:#FFFFFF">Core, Distil, Domain</h3><p class="meta" style="color:#B0D1C4">','<li class="gen attn"><span class="g">TLM4 · current</span><h3 style="font-size:21px">Core, Distil, Domain</h3><p class="meta">'),
 ('<a class="panel card" href="Wins.dc.html#talk" style="gap:10px;background:#18493D;border-color:#0B5F33"><span class="tag" style="align-self:flex-start;background:rgba(255,255,255,.12);color:#B0D1C4">Bring us a problem</span><h3 style="font-size:22px;color:#FFFFFF">Not sure which model fits?</h3><p class="meta" style="color:#B0D1C4">','<a class="panel card attn" href="Wins.dc.html#talk" style="gap:10px"><span class="tag" style="align-self:flex-start">Bring us a problem</span><h3 style="font-size:22px">Not sure which model fits?</h3><p class="meta">'),
])
edit('Team.dc.html',[('<span class="av" style="background:#18493D;color:#FFFFFF">+31</span>','<span class="av" style="background:#0B0F0C;color:#FFFFFF">+31</span>')])
edit('Research.dc.html',[('<span class="av lg" style="background:#C20028;color:#FFFFFF;border-color:transparent">JP','<span class="av lg ink" style="background:#0B0F0C;color:#FFFFFF;border-color:transparent">JP')])
edit('TplLeader.dc.html',[('.av{width:56px;height:56px;border-radius:50%;background:#3A413C;color:#0B0F0C;','.av{width:56px;height:56px;border-radius:50%;background:#E3E7E4;color:#0B0F0C;')])
edit('TplAwards.dc.html',[('<span class="tag" style="background:#C20028;color:#FFFFFF">ThinkLatent quarterly awards','<span class="tag" style="background:#FCE6E4;color:#95141D">ThinkLatent quarterly awards')])
edit('Write.dc.html',[
 ('<i style="width:40%;height:26px;background:#18493D"></i>','<i style="width:40%;height:26px;background:#0B5F33"></i>'),
 ('<div class="paper" style="background:#0B0F0C"><div class="top"><span style="background:#C20028"></span><i style="width:40px;background:#3A413C"></i></div><b style="background:#E3E7E4"></b><i style="width:90%;background:#3A413C"></i><i style="width:80%;background:#3A413C"></i><i style="width:60%;background:#FFF4CE"></i><i style="width:85%;background:#3A413C"></i></div>',
  '<div class="paper"><div class="top"><span style="background:#FCE6E4"></span><i style="width:40px"></i></div><b></b><i style="width:90%"></i><i style="width:80%"></i><i style="width:60%;background:#FFF4CE"></i><i style="width:85%"></i></div>',2),
 ('<div class="paper" style="background:#0C2822"><div class="top"><span style="background:#4F917C"></span><i style="width:40px;background:#18493D"></i></div><b style="background:#FFFFFF"></b><i style="width:50%;background:#FFFFFF;height:18px"></i><i style="width:80%;background:#18493D"></i><i style="width:60%;background:#FFF4CE"></i></div>',
  '<div class="paper"><div class="top"><span style="background:#0B0F0C"></span><i style="width:40px"></i></div><b></b><i style="width:50%;background:#0B5F33;height:18px"></i><i style="width:80%"></i><i style="width:60%;background:#FFF4CE"></i></div>'),
 ('<i style="width:100%;height:34px;background:#0B0F0C"></i>','<i style="width:100%;height:34px;background:#E3E7E4"></i>'),
])
print('patched',len(done),'boards')
for f in sorted(glob.glob('*.dc.html')):
    t=open(f).read(); print(f, 'close' if 'card close' in t else '', 'attn' if 'attn"' in t or 'attn ' in t else '')
