import re,json,glob,sys
P='/home/claude/canvas-root/project/'
HEX={'#F7F7F5':'#F7F9F8','#1A1A1A':'#0B0F0C','#3A3A38':'#3A413C','#5C5C5A':'#4A524D','#8A8A88':'#68716B','#9A9A96':'#7A837D','#6B6B68':'#59625C',
'#E6E6E2':'#E3E7E4','#EFEFEC':'#E9EDEA','#F2F2EF':'#EFF2F0','#ECECEA':'#E3E7E4','#ECECEC':'#E3E7E4','#D9D9D5':'#D8DDD9','#CFCFCB':'#CDD3CF','#FBFBFA':'#F7F8F7',
'#2E6B3C':'#0B5F33','#3E9A5C':'#2E7562','#6CB769':'#4F917C','#1B5128':'#18493D','#0C3F09':'#0C2822','#E9F3EC':'#E6F2EC','#CFE6D6':'#B0D1C4','#D6E9DB':'#B0D1C4',
'#A8D5B4':'#A6DDBC','#2F7A6D':'#2E7562','#1F4A44':'#12382F','#E6F1EF':'#E3F0EF','#D3ECE6':'#B0D1C4','#C4262E':'#C20028','#9A1B22':'#95141D','#FBEAEA':'#FCE6E4',
'#E8EEF1':'#E4EBF0','#355F6B':'#445664','#477C8B':'#5A6E7B','#EEF1F3':'#F2F5F7','#F8ECE6':'#EDF1EE','#9E4C27':'#3A433D','#C9663A':'#59625C','#EEF6F0':'#F7F8F7',
'#E2EFE7':'#EFF2F0','#6B3E10':'#6E4510'}
RGBA={'rgba(26,26,26,':'rgba(11,15,12,','rgba(108,183,105,':'rgba(46,117,98,','rgba(47,122,109,':'rgba(46,117,98,','rgba(27,81,40,':'rgba(24,73,61,','rgba(31,74,68,':'rgba(18,56,47,'}
def remap(s):
    s=re.sub(r'#[0-9A-Fa-f]{6}\b',lambda m:HEX.get(m.group(0).upper(),m.group(0)),s)
    for a,b in RGBA.items(): s=s.replace(a,b)
    return s
V11='''
/* v11 · design kit v0.11.4, colour v5 (2026-11-24, D-488): white canvas, ink #0B0F0C, black everyday buttons,
   red #C20028 only for the one main action, emerald links and focus, flat glass, one forest-and-signal field
   under the hero only, teal and green moments as flat tints, deep forest closing band */
body{background:#FFFFFF;color:#0B0F0C}
a{color:#0B5F33}a:hover{color:#0C2822}
a:focus-visible,button:focus-visible,input:focus-visible{outline:2px solid #0B5F33;outline-offset:2px}
.hero{background:radial-gradient(620px 420px at 88% 20%,rgba(46,117,98,.40),rgba(46,117,98,0) 70%),radial-gradient(380px 280px at 76% 4%,rgba(19,252,74,.18),rgba(19,252,74,0) 70%),#FFFFFF !important}
.hero.teal,.globe{background:#E3F0EF !important;color:#0B0F0C}
.band{background:#E6F2EC !important}
.wave{background:#0C2822 !important;color:#FFFFFF}
.green{background:#E6F2EC !important;color:#0B0F0C;border:1px solid #B0D1C4}
.screen{background:#EFF2F0 !important}
.panel,.gen,.proj,.post,.door,.stage,.pillar,.qa,.fam,.fig,.ladder,.mchip,.glass{background:#F7F9F8;border:1px solid #E3E7E4;box-shadow:none}
:is(.hero.teal,.globe,.band,.green,.wave) :is(.panel,.gen,.proj,.post,.door,.stage,.pillar,.qa,.fam,.fig,.glass){background:#FFFFFF}
.glass.g{background:#E6F2EC !important;border-color:#B0D1C4 !important;color:#0B0F0C !important}
.glass.t{background:#E3F0EF !important;border-color:#B0D1C4 !important;color:#0B0F0C !important}
:is(.hero.teal,.globe,.green,.glass.g,.glass.t) :is(h1,h2,h3,h4,p,li,span,small,b,strong,em,i,figcaption,div,dt,dd,td,th,blockquote){color:#0B0F0C !important}
:is(.hero.teal,.globe,.green,.glass.g,.glass.t) :is(.meta,.meta *,small){color:#3A433D !important}
:is(.hero.teal,.globe,.green,.glass.g,.glass.t) :is(.cap,.chn,.num,.k,.no){color:#0B5F33 !important}
:is(.hero.teal,.globe,.green,.glass.g,.glass.t) a:not(.pill){color:#0B5F33 !important}
:is(.hero.teal,.globe,.green,.glass.g,.glass.t) .tag{background:#FFFFFF !important;color:#0B5F33 !important}
:is(.hero.teal,.globe,.green,.glass.g,.glass.t) .thumb{background:#FFFFFF !important;border-color:#E3E7E4 !important}
.pill{background:#0B0F0C;color:#FFFFFF;border-color:#0B0F0C}
.pill:hover{background:#1A1E1B;color:#FFFFFF;border-color:#1A1E1B}
.pill *{color:inherit}
.pill.go{background:#C20028;color:#FFFFFF;border-color:#C20028}
.pill.go:hover{background:#95141D;color:#FFFFFF;border-color:#95141D}
:is(div,p,nav):has(> .pill ~ .pill ~ .pill) > .pill:not(.go){background:#FFFFFF;color:#0B0F0C;border-color:#CDD3CF}
:is(div,p,nav):has(> .pill ~ .pill ~ .pill) > .pill:not(.go):hover{background:#FFFFFF;color:#0B0F0C;border-color:#0B0F0C}
.pill.on,:is(div,p,nav):has(> .pill ~ .pill ~ .pill) > .pill.on{background:#0B0F0C !important;color:#FFFFFF !important;border-color:#0B0F0C !important}
:is(.hero.teal,.globe,.green,.glass.g,.glass.t) .pill:not(.go){background:#0B0F0C !important;color:#FFFFFF !important;border-color:#0B0F0C !important}
:is(.hero.teal,.globe,.green,.glass.g,.glass.t) .pill.go{background:#C20028 !important;border-color:#C20028 !important}
:is(.hero.teal,.globe,.green,.glass.g,.glass.t) .pill *{color:#FFFFFF !important}
.wave .pill:not(.go){background:#FFFFFF;color:#0B0F0C;border-color:#FFFFFF}
.wave .pill.go{background:#C20028;color:#FFFFFF;border-color:rgba(255,255,255,.75)}
.wave :is(.cap,.meta){color:#B0D1C4}
header .pill.go{background:#0B0F0C;border-color:#0B0F0C}
header .pill.go:hover{background:#1A1E1B;border-color:#1A1E1B}
.nav a.on{background:#0B0F0C;color:#FFFFFF}
.nav a:hover{background:#EFF2F0;color:#0B0F0C}
.play{background:#0B0F0C;border-color:#0B0F0C}
'''
SYS=[("Site design system · v10","Site design system · v11"),("Site design system v10","Site design system v11"),
("One type scale and four gradients, from the ThinkLatent palette.","One type scale and the design kit's colour v5."),
("Every page uses the same sizes and the same four fields of colour. Decision Red stays for the primary action and the header stripe.","Every page uses the same sizes and the kit's colours (design kit v0.11.4). Buttons are black; red is kept for the one main action and the header stripe."),
("semibold 600 · green 700 · sentence case","semibold 600 · emerald 700 · sentence case"),("medium 500 · green 700","medium 500 · emerald 700"),
('<p class="cap">Gradients</p>','<p class="cap">Backgrounds</p>'),("Four fields, made only from the palette","Four, flat except the hero's one field"),
("Off-white to mint, top to bottom, with a sage glow at the top right and a teal glow at the bottom left.","White, with one soft field of forest 500 (40%) and signal (18%) at the top right, kept clear of the text."),
("135°: #0C3F09 → #1B5128 → #1F4A44 → #2F7A6D, with a sage glow at the top right.","Deep forest #0C2822, flat."),
("The closing band on every page; dark tiles.","The closing band on every page."),
("White text over the forest and teal stops, never over the sage glow. The red button carries a white ring here.","White text; secondary text #B0D1C4. The red button carries a white ring here."),
("140°: #1F4A44 → #2F7A6D, with a sage glow at the top right.","Teal glass #E3F0EF, flat."),
("Text:</b> White text.</p>","Text:</b> Ink text.</p>"),
("Canvas #F7F7F5 to mint #E9F3EC, top to bottom.","Green glass #E6F2EC, flat."),
("Soft bands between sections.","Soft bands and attention sections."),
("Section background image, or the theme's Soft section (tier 1).","Section background image (tier 1)."),
("One deep field per page: the Canopy closing band. Lagoon only for the three teal moments.","One deep field per page: the deep forest closing band. Teal only for the three teal moments; green for attention."),
("Red only on the primary action and the 4 px header stripe; on a deep field the red button carries a white ring.","Buttons are black. Red is the one main action of a view and the 4 px header stripe; on the deep band the red button carries a white ring. Green never fills a button."),
("White text only over forest or teal, never over sage. No gradient text: SharePoint cannot render it.","White text only on the deep forest band. Glass is flat, with no gradients or grain; the only soft field is under the hero, clear of the text.")]
SW=[('#0B0F0C','Ink','Text, and the everyday button'),('#FFFFFF','Canvas','Page background'),('#0B5F33','Emerald 700','Links, labels, focus rings'),
('#2E7562','Forest 500','Lines, dots and data; the hero field'),('#0C2822','Forest 900','The closing band'),('#13FC4A','Signal','The one lit point; never text, never a button'),
('#E6F2EC','Green glass','Attention sections and cards'),('#E3F0EF','Teal glass','The three teal moments'),('#F7F9F8','Quiet glass','Cards'),
('#C20028','Enterprise red','The one main action and the header stripe')]
miss=[]
for f in sorted(glob.glob(P+'*.dc.html')):
    s=open(f).read(); name=f.split('/')[-1]
    if name=='System.dc.html':
        for a,b in SYS:
            if a not in s: miss.append(a[:60])
            s=s.replace(a,b)
        i=s.find('<p class="cap">Palette</p>'); j=s.find('</section>',i)
        g=re.search(r'<div class="(grid[^"]*)">',s[i:j])
        k=i+g.start()
        new='<div class="%s">'%g.group(1)+''.join('<div class="sw"><b style="background:%s"></b><p style="font-weight:600">%s</p><p class="meta">%s · %s</p></div>'%(h,n,h,jb) for h,n,jb in SW)+'</div>'
        s=s[:k]+new+s[j:]
    s=remap(s)
    k=s.rfind('</style>'); s=s[:k]+V11+s[k:]
    open(f,'w').write(s)
print('system misses',miss)
c=json.load(open(P+'canvas.json')); n=c['notes']
c['title']='ThinkLatent site — v11: design kit colour v5'
n['fid']['text']=("Fidelity (v11, 2026-11-24, D-488): the design kit's colour v5 (v0.11.4) on every board, at Jithin's ask. White canvas, ink #0B0F0C. Buttons black; red #C20028 only for the one main action of a view and the header stripe (the header's Write for ThinkLatent button is now black). Emerald 700 for links, labels and focus. Glass flat, no gradients or grain. Each hero keeps one soft forest-and-signal field at the top right, clear of the text; the teal moments and green attention sections are flat tints; the closing band is deep forest #0C2822, flat. Jithin's calls: SharePoint theme primary black, backgrounds as the kit says, deep forest band. The type scale is v10's, unchanged. Before (v10): "+n['fid']['text'])
n['n_system']['text']=("Site design system · v11 (2026-11-24, D-488): the type scale of v10 unchanged, and the design kit's colour v5 (v0.11.4): ink, white canvas, emerald 700 for links, labels and focus, forest for lines and depth, signal as the one lit point, green and teal glass as flat attention tints, quiet glass for cards, the Enterprise red #C20028 for the one main action and the stripe. Four backgrounds: Meadow (white with one hero field), Canopy (deep forest, flat), Lagoon (teal glass, flat), Mint rise (green glass, flat). SharePoint: theme primary black, so every native button is the kit's black button with no IT; the red main action, emerald links and the type sizes come with custom.css (tier 2); the backgrounds ship as images (tier 1).")
n['nav']['text']=n['nav']['text'].replace('plus the red Write for ThinkLatent button','plus the black Write for ThinkLatent button').replace('Active item sage with green 900 text (custom.css)','Active item black with white text (custom.css)')
for r in ('row1','row2','row3','row4'): n[r]['text']=n[r]['text'].replace('(v10)','(v11)')
json.dump(c,open(P+'canvas.json','w'),indent=1,ensure_ascii=False)
left=[]
for f in glob.glob(P+'*.dc.html'):
    t=open(f).read(); body=t[:t.rfind('/* v11')]
    for h in HEX:
        if re.search(re.escape(h),body,re.I): left.append((f.split('/')[-1],h))
print('old colours left:',left[:10])
