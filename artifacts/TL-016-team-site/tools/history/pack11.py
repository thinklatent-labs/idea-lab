import numpy as np, json, re, subprocess, os, glob
from PIL import Image
OUT='/home/claude/theme-pack/'
src=open('/home/claude/gen/v11.py').read()
HEX=eval(re.search(r"HEX=(\{.*?\})\n",src,re.S).group(1))
RGBA=eval(re.search(r"RGBA=(\{.*?\})\n",src,re.S).group(1))
def hx(h): h=h.lstrip('#'); return np.array([int(h[i:i+2],16) for i in (0,2,4)],dtype=np.float64)

# 1. Backgrounds: Meadow keeps the one field; the other three are flat kit tints.
def glow(img,cx,cy,rx,ry,col,alpha,stop):
    H,W,_=img.shape; y,x=np.mgrid[0:H,0:W].astype(np.float64)
    d=np.sqrt(((x-cx)/rx)**2+((y-cy)/ry)**2)
    a=(alpha*np.clip(1-d/stop,0,1))[...,None]
    return img*(1-a)+hx(col)*a
W,H=2880,1200; S=2
m=np.ones((H,W,3))*255.0
m=glow(m,.76*W,.04*H,380*S,280*S,'#13FC4A',.18,.70)   # signal 400 at 18%, painted first (under)
m=glow(m,.88*W,.20*H,620*S,420*S,'#2E7562',.40,.70)   # forest 500 at 40%, on top, as in the boards' CSS
rng=np.random.default_rng(7); m=m+rng.uniform(-0.5,0.5,m.shape)
Image.fromarray(np.clip(np.round(m),0,255).astype(np.uint8)).save(OUT+'gradients/meadow-2880x1200.png',optimize=True)
for name,(w,h),col in [('canopy-2880x900.png',(2880,900),'#0C2822'),('lagoon-2880x1200.png',(2880,1200),'#E3F0EF'),('mint-rise-2880x600.png',(2880,600),'#E6F2EC')]:
    Image.new('RGB',(w,h),col).save(OUT+'gradients/'+name,optimize=True)
print('backgrounds written')

# 2. Drawings: the v11 colour map, then status marks on the kit's status colours, then PNG at 3x.
STATUS=[(r'(\.(?:vd|s)-crit\{stroke:)#[0-9A-Fa-f]{6}',r'\g<1>#D04408'),(r'(\.c-red\{fill:)#[0-9A-Fa-f]{6}',r'\g<1>#D04408'),
        (r'(\.(?:vd|s)-good\{stroke:)#[0-9A-Fa-f]{6}',r'\g<1>#16754F'),(r'(\.s-info\{stroke:)#[0-9A-Fa-f]{6}',r'\g<1>#2E5E8C')]
for f in sorted(glob.glob(OUT+'drawings/*.svg')):
    t=open(f).read()
    if '#3E9A5C' in t or '#6CB769' in t:     # still v10: map once
        t=re.sub(r'#[0-9A-Fa-f]{6}',lambda mm: HEX.get(mm.group(0).upper(),mm.group(0)),t)
        for a,b in RGBA.items(): t=t.replace(a,b)
    for a,b in STATUS: t=re.sub(a,b,t)
    open(f,'w').write(t)
    subprocess.run(['rsvg-convert','-z','3','-b','#FFFFFF','-o',f[:-4]+'.png',f],check=True)
print('drawings recoloured:',len(glob.glob(OUT+'drawings/*.svg')))
