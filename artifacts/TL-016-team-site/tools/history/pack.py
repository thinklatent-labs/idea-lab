import numpy as np, math, json, re, subprocess, sys
from PIL import Image
sys.path.insert(0,'/home/claude/gen')
from common import spine_svg, fan_svg, board_svg, DG_CSS
OUT='/home/claude/theme-pack/'
def hx(h): h=h.lstrip('#'); return np.array([int(h[i:i+2],16) for i in (0,2,4)],dtype=np.float64)
def linear(W,H,deg,stops):
    th=math.radians(deg); dx,dy=math.sin(th),-math.cos(th)
    L=abs(W*dx)+abs(H*dy)
    y,x=np.mgrid[0:H,0:W].astype(np.float64)
    t=((x-W/2)*dx+(y-H/2)*dy)/L+0.5
    t=np.clip(t,0,1); img=np.zeros((H,W,3))
    for (a,ca),(b,cb) in zip(stops[:-1],stops[1:]):
        m=(t>=a)&(t<=b); u=((t-a)/(b-a))[m][:,None]
        img[m]=hx(ca)*(1-u)+hx(cb)*u
    return img
def glow(img,cx,cy,rx,ry,col,alpha,stop):
    H,W,_=img.shape; y,x=np.mgrid[0:H,0:W].astype(np.float64)
    d=np.sqrt(((x-cx)/rx)**2+((y-cy)/ry)**2)
    a=(alpha*np.clip(1-d/stop,0,1))[...,None]
    return img*(1-a)+hx(col)*a
def save(img,name):
    rng=np.random.default_rng(7); img=img+rng.uniform(-0.5,0.5,img.shape)
    Image.fromarray(np.clip(np.round(img),0,255).astype(np.uint8)).save(OUT+'gradients/'+name, optimize=True); print('wrote',name)
S=2  # CSS px at a ~1440 page, doubled for 2880
W,H=2880,1200
m=linear(W,H,180,[(0,'#F7F7F5'),(0.5,'#EEF6F0'),(1,'#E2EFE7')])
m=glow(m,.92*W,-.04*H,1100*S,560*S,'#6CB769',.38,.62); m=glow(m,-.04*W,1.04*H,900*S,520*S,'#2F7A6D',.22,.60); save(m,'meadow-2880x1200.png')
W,H=2880,900
c=linear(W,H,135,[(0,'#0C3F09'),(.40,'#1B5128'),(.76,'#1F4A44'),(1,'#2F7A6D')]); c=glow(c,.92*W,-.08*H,820*S,480*S,'#6CB769',.42,.62); save(c,'canopy-2880x900.png')
W,H=2880,1200
l=linear(W,H,140,[(0,'#1F4A44'),(1,'#2F7A6D')]); l=glow(l,.90*W,-.06*H,900*S,520*S,'#6CB769',.45,.60); save(l,'lagoon-2880x1200.png')
W,H=2880,600
r=linear(W,H,180,[(0,'#F7F7F5'),(1,'#E9F3EC')]); save(r,'mint-rise-2880x600.png')
# drawings: SVG with the drawing styles embedded, then PNG at 2x
css=re.findall(r'(\.dg[^{]*\{[^}]*\})',DG_CSS)
style='<style>'+''.join(x.replace('.dg ','').replace('.dg{','svg{') for x in css)+"text{font-family:Inter,sans-serif}</style>"
d3=board_svg(3).replace('each generation starts from what the last one learned','each generation is trained on more of the Enterprise’s own data')
items={'mandate-spine':spine_svg(),'mandate-01-today':board_svg(0),'mandate-02-vision':board_svg(1),'mandate-03-system':board_svg(2),'mandate-04-generations':d3,'mandate-close-fan':fan_svg()}
for name,sv in items.items():
    sv=re.sub(r'<svg class="dg"[^>]*?(viewBox="[^"]+")',lambda m:f'<svg xmlns="http://www.w3.org/2000/svg" {m.group(1)}',sv,count=1)
    sv=sv.replace('style="min-width:0"','')
    vb=[float(v) for v in re.search(r'viewBox="([^"]+)"',sv).group(1).split()]
    sv=sv.replace('<svg xmlns','<svg width="%d" height="%d" xmlns'%(vb[2],vb[3]),1)
    sv=sv.replace('>',' >'+style,1) if False else re.sub(r'(<svg[^>]*>)',r'\1'+style,sv,count=1)
    open(OUT+f'drawings/{name}.svg','w').write(sv)
    subprocess.run(['rsvg-convert','-z','3','-b','#FFFFFF','-o',OUT+f'drawings/{name}.png',OUT+f'drawings/{name}.svg'],check=True)
    print('wrote',name)
