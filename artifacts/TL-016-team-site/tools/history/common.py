import re, math
SRC='/home/claude/canvas-root/project/'
DG_CSS = """
.dg{display:block;width:100%;height:auto;color:#1A1A1A}
.dg text{font-family:Inter,system-ui,sans-serif}
.dg .nd{fill:#F2F2EF;stroke:#E6E6E2;stroke-width:1}
.dg .nd-key{stroke:#6CB769;stroke-width:1.4}
.dg .nd-strong{fill:#1B5128}
.dg .vd-good{stroke:#2F7A6D}.dg .vd-crit{stroke:#C4262E}.dg .vd-neutral{stroke:#8A8A88}
.dg .ln{stroke:#6B6B68;stroke-width:1.1;fill:none}
.dg .ln-d{stroke-dasharray:4 4}
.dg .ah{fill:#6B6B68}
.dg .gl{fill:none;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round}
.dg .s-good{stroke:#2F7A6D}.dg .s-crit{stroke:#C4262E}.dg .s-info{stroke:#477C8B}.dg .s-neutral{stroke:#8A8A88}
.dg .t1{font-size:12.5px;font-weight:600;fill:#1A1A1A}
.dg .t1s{font-size:12px;font-weight:600;fill:#1A1A1A}
.dg .t2{font-size:11.5px;fill:#5C5C5A}
.dg .t3{font-size:10.5px;fill:#8A8A88}
.dg .tm{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11.5px;fill:#1A1A1A}
.dg .t-on{font-size:13px;font-weight:600;fill:#FFFFFF}
.dg .cap{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:.08em;fill:#5C5C5A;text-transform:none}
.dg .c-brand{fill:#3E9A5C}.dg .c-teal{fill:#2F7A6D}.dg .c-muted{fill:#8A8A88}.dg .c-red{fill:#C4262E}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace}
.chn{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#2E6B3C;font-weight:500}
.spine{position:relative;padding-left:64px}
.spine::before{content:"";position:absolute;left:21px;top:8px;bottom:8px;border-left:2px dotted #3E9A5C}
.chap{position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:40px;align-items:start}
.chap .mark{position:absolute;left:-58px;top:2px;width:32px;height:32px;border-radius:50%;background:#FFFFFF;border:2px solid #3E9A5C;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;color:#1B5128;font-weight:600}
.fig{margin:0;background:#FFFFFF;border:1px solid #E6E6E2;border-radius:24px;padding:22px 24px 16px;display:flex;flex-direction:column;gap:12px}
.fig figcaption{font-size:13px;color:#5C5C5A}
.boardnote{font-size:13px;color:#7A4A12;background:#FFF6E5;border:1px dashed #D9A44A;border-radius:12px;padding:10px 14px}
.boardnote b{font-weight:600}
.quote{font-size:22px;line-height:1.4;letter-spacing:-.01em;padding:4px 0 4px 18px;border-left:3px solid #C4262E}
.statement{font-size:40px;line-height:1.1;font-weight:400;letter-spacing:-.025em;text-align:center;max-width:860px;margin:0 auto}
.ip{background:#F2F2EF;border-radius:20px;padding:24px 26px;display:flex;flex-direction:column;gap:14px}
.ip-big{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr));gap:16px;margin:0}
.ip-big div{display:flex;flex-direction:column;gap:4px}
.ip-big dt{font-size:13px;color:#5C5C5A}
.ip-big dd{margin:0;font-size:48px;font-weight:300;letter-spacing:-.03em;line-height:1;font-variant-numeric:tabular-nums}
.iprow{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,2fr) repeat(4,minmax(0,.6fr));gap:12px;align-items:center;background:#FFFFFF;border:1px solid #E6E6E2;border-radius:12px;padding:12px 16px;font-size:14px}
.iprow .n{font-variant-numeric:tabular-nums;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;color:#1A1A1A;font-weight:400}
.iprow.h{background:transparent;border:0;padding:0 16px;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#5C5C5A}
.pillar{display:flex;flex-direction:column;gap:10px;padding:28px;border-radius:20px;background:#FFFFFF;border:1px solid #E6E6E2}
.pillar .k{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;color:#2E6B3C;letter-spacing:.06em}
.names{display:flex;flex-wrap:wrap;gap:10px 28px;align-items:center}
.names span{font-size:17px;font-weight:500;color:#3A3A38}
@media (max-width:760px){.spine{padding-left:36px}.spine::before{left:10px}.chap .mark{left:-38px;width:24px;height:24px;font-size:10px}.iprow{grid-template-columns:minmax(0,1fr) repeat(2,minmax(0,.6fr))}.statement{font-size:28px}}
"""
FONT_OLD='family=Inter:wght@300;400;500;600&amp;display=swap'
FONT_NEW='family=Inter:wght@300;400;500;600&amp;family=JetBrains+Mono:wght@400;500;600&amp;display=swap'
def parts(fname):
    s=open(SRC+fname).read()
    head_end=s.index('</style>')
    i=s.index('<section class="hero"')
    j=s.index('<div class="wrap"><div class="comments">') if '<div class="wrap"><div class="comments">' in s else s.index('<footer')
    return s[:head_end], s[head_end:i], s[i:j], s[j:]
def board_svg(n):
    return open(f'/home/claude/gen/d{n}.svg').read().replace('class="dg"','class="dg" style="min-width:0"')
def dots_on(points, r, fill, op=1.0):
    return ''.join(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{fill}" fill-opacity="{op}"/>' for x,y in points)
def bez(p0,p1,p2,n):
    return [((1-t)**2*p0[0]+2*(1-t)*t*p1[0]+t*t*p2[0],(1-t)**2*p0[1]+2*(1-t)*t*p1[1]+t*t*p2[1]) for t in [k/(n-1) for k in range(n)]]
def orb(cx,cy,base=34,step=17,amp=4.5,col=('#1B5128','#2E6B3C','#3E9A5C','#3E9A5C','#6CB769','#6CB769')):
    out=''
    for k in range(6):
        rk=base+k*step; n=int(2*math.pi*rk/9)
        pts=[]
        for i in range(n):
            th=2*math.pi*i/n
            r=rk+amp*math.sin(5*th+k*0.9)+1.8*math.sin(2*th+0.4)
            pts.append((cx+r*math.cos(th)*1.04, cy+r*math.sin(th)))
        out+=dots_on(pts,1.9 if k<3 else 1.6,col[k],1-0.09*k)
    return out
def spine_svg():
    W,H=560,520; cx,cy=280,236
    out=f'<svg class="dg" style="min-width:0" viewBox="0 0 {W} {H}" role="img" aria-label="Streams of dots fall into an orb of six wavy rings of dots; one dotted line drops out of the orb as the spine of the page.">'
    starts=[(40,0),(150,0),(300,0),(420,0),(530,0)]
    ctrl=[(70,150),(170,120),(330,110),(410,130),(500,170)]
    for (s,c) in zip(starts,ctrl):
        pts=bez(s,c,(cx,cy-40),22)[:-3]
        for idx,(x,y) in enumerate(pts):
            out+=f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{1.4+idx*0.04:.2f}" fill="#3E9A5C" fill-opacity="{0.25+0.7*idx/len(pts):.2f}"/>'
    out+=orb(cx,cy)
    for y in range(cy+130, H, 11): out+=f'<circle cx="{cx}" cy="{y}" r="2.2" fill="#1B5128"/>'
    return out+'</svg>'
def fan_svg():
    W,H=760,230; top=(380,0)
    labels=['Advice','Compliance review','Servicing','Cyber defence','Knowledge']
    xs=[80,230,380,530,680]
    out=f'<svg class="dg" style="min-width:0" viewBox="0 0 {W} {H}" role="img" aria-label="The dotted spine opens into five trails of dots that reach advice, compliance review, servicing, cyber defence and knowledge.">'
    for y in range(0,70,11): out+=f'<circle cx="380" cy="{y}" r="2.2" fill="#1B5128"/>'
    for x in xs:
        pts=bez((380,70),(380,140),(x,170),14)
        out+=''.join(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="2" fill="#3E9A5C" fill-opacity="{0.45+0.5*i/13:.2f}"/>' for i,(px,py) in enumerate(pts))
    for x,l in zip(xs,labels): out+=f'<text class="t1" x="{x}" y="200" text-anchor="middle">{l}</text>'
    return out+'</svg>'
