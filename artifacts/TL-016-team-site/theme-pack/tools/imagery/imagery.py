"""Generate the ThinkLatent site's imagery for SharePoint from the kit's mark anatomy (lobes, sparks) and colour v5.
Writes SVG sources and PNGs under the theme pack's images folder (or $TL_IMAGERY_OUT). No text in any image."""
import math, os, random, subprocess, sys
import numpy as np
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
PACK = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, HERE)
from brand import *

OUT = os.environ.get('TL_IMAGERY_OUT', os.path.join(PACK, 'images'))
for d in ('thumbnails', 'tiles', 'heroes', 'patterns', 'src'):
    os.makedirs(f'{OUT}/{d}', exist_ok=True)


def render(name, w, h, body, bg=None, folder='thumbnails'):
    s = svg(w, h, body, bg)
    p = f'{OUT}/src/{folder}-{name}.svg'
    open(p, 'w').write(s)
    png = f'{OUT}/{folder}/{name}.png'
    subprocess.run(['rsvg-convert', '-o', png, p], check=True)
    return png


# ---------- compositions (all coordinates for the frame given) ----------

def comp_brain(W, H, ramp, cx, cy, s, spark_kw=None, pair=True):
    b = brain(cx, cy, s, ramp)
    sx, sy, sr = cx + 48.6 * s, cy - 30.6 * s, 13.5 * s
    kw = spark_kw or {}
    b += sparks_pair(sx, sy, sr, **kw) if pair else spark(sx, sy, sr, **kw)
    return b


def comp_half(W, H, ramp, x, cy, s, side='right', spark_at=None, sr=None, kw=None):
    b = brain(x, cy, s, ramp, halves=side)
    if spark_at:
        b += sparks_pair(spark_at[0], spark_at[1], sr, **(kw or {}))
    return b


def comp_rise(W, H, ramp, x0, base, n=5, r0=60, r1=230, gap=40, kw=None, spark_scale=0.55, span=0.70):
    rs = [r0 + (r1 - r0) * (i / (n - 1)) ** 1.15 for i in range(n)]
    total = sum(2 * r * 0.84 for r in rs) + rs[-1] * 0.16
    k = (W * span) / total
    rs = [r * k for r in rs]
    out, x = [], x0
    for i, r in enumerate(rs):
        out.append(circle(x + r, base - r, r, ramp[min(4, i)]))
        last = (x + r, base - r, r)
        x += 2 * r * 0.84
    cx, cy, r = last
    out.append(sparks_pair(cx + r * 0.55, cy - r * 0.80, r * spark_scale, **(kw or {})))
    return ''.join(out)


def comp_rings(W, H, ramp, cx, cy, R, n=5, split=True, kw=None, sr=None):
    out = []
    cid = uid('rc')
    out.append(f'<defs><clipPath id="{cid}L"><rect x="0" y="0" width="{f(cx-6)}" height="{H}"/></clipPath>'
               f'<clipPath id="{cid}R"><rect x="{f(cx+6)}" y="0" width="{W}" height="{H}"/></clipPath></defs>')
    for side, dy in (('L', 0), ('R', -R * 0.14)) if split else (('', 0),):
        cp = f' clip-path="url(#{cid}{side})"' if side else ''
        g = [f'<g{cp}>']
        for i in range(n):
            r = R * (1 - i / n)
            g.append(circle(cx, cy + dy * (1 - i / n), r, ramp[min(4, i)]))
        g.append('</g>')
        out.append(''.join(g))
    if sr:
        out.append(sparks_pair(cx + R * 0.55, cy - R * 0.72, sr, **(kw or {})))
    return ''.join(out)


def comp_orbit(W, H, cx, cy, radii, core_ramp, core_s, sparks_on, kw=None, ring=FOREST[300], tilt=0):
    out = [f'<g transform="rotate({tilt} {f(cx)} {f(cy)})">']
    for (rx, ry) in radii:
        out.append(f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="{f(rx)}" ry="{f(ry)}" fill="none" stroke="{ring}" '
                   f'stroke-width="5" stroke-dasharray="2 18" stroke-linecap="round"/>')
    out.append('</g>')
    out.append(brain(cx, cy, core_s, core_ramp))
    for (k, ang, r) in sparks_on:
        rx, ry = radii[k]
        a = math.radians(ang)
        x, y = cx + rx * math.cos(a), cy + ry * math.sin(a)
        # rotate point by tilt
        t = math.radians(tilt)
        X = cx + (x - cx) * math.cos(t) - (y - cy) * math.sin(t)
        Y = cy + (x - cx) * math.sin(t) + (y - cy) * math.cos(t)
        out.append(spark(X, Y, r, **(kw or {})))
    return ''.join(out)


def comp_row(W, H, ramp, x0, base, rs, gap, kw=None, sr_k=0.5):
    out, x = [], x0
    cid = uid('row')
    out.append(f'<defs><clipPath id="{cid}"><rect x="0" y="0" width="{W}" height="{f(base)}"/></clipPath></defs><g clip-path="url(#{cid})">')
    centres = []
    for i, r in enumerate(rs):
        out.append(circle(x + r, base, r, ramp[min(4, i)]))
        centres.append((x + r, base, r))
        x += 2 * r + gap
    out.append('</g>')
    out.append(f'<rect x="{f(x0-40)}" y="{f(base)}" width="{f(x-x0+40)}" height="6" rx="3" fill="{ramp[0]}"/>')
    cx, cy, r = centres[-1]
    out.append(sparks_pair(cx + r * 0.2, cy - r * 1.18, r * sr_k, **(kw or {})))
    return ''.join(out)


def comp_grid(W, H, cols, rows, x0, y0, step, r, tones, hot, kw=None, shape='circle', seed=1):
    rnd = random.Random(seed)
    out = []
    for j in range(rows):
        for i in range(cols):
            x, y = x0 + i * step, y0 + j * step
            col = tones[rnd.randrange(len(tones))]
            if (i, j) == hot:
                if shape == 'circle':
                    out.append(circle(x, y, r, FOREST[700]))
                else:
                    out.append(f'<rect x="{f(x-r)}" y="{f(y-r)}" width="{f(2*r)}" height="{f(2*r)}" rx="{f(r*0.42)}" fill="{FOREST[700]}"/>')
                out.append(spark(x, y, r * 0.52, body=FOREST[700], up=EMER[400], low='#FFFFFF'))
            else:
                if shape == 'circle':
                    out.append(circle(x, y, r, col))
                else:
                    out.append(f'<rect x="{f(x-r)}" y="{f(y-r)}" width="{f(2*r)}" height="{f(2*r)}" rx="{f(r*0.42)}" fill="{col}"/>')
    return ''.join(out)


def comp_scatter(W, H, n, seed, tones, big, kw=None, area=(0, 0, 1600, 900), rmin=10, rmax=34):
    rnd = random.Random(seed)
    out = []
    x0, y0, x1, y1 = area
    pts = []
    tries = 0
    while len(pts) < n and tries < 20000:
        tries += 1
        r = rnd.uniform(rmin, rmax) * (1 if rnd.random() > 0.12 else 2.2)
        x, y = rnd.uniform(x0, x1), rnd.uniform(y0, y1)
        if all((x - a) ** 2 + (y - b) ** 2 > (r + c + 10) ** 2 for a, b, c in pts) and \
           all((x - a) ** 2 + (y - b) ** 2 > (r + c + 30) ** 2 for a, b, c in big):
            pts.append((x, y, r))
    for x, y, r in pts:
        out.append(circle(x, y, r, tones[rnd.randrange(len(tones))]))
    for x, y, r in big:
        out.append(circle(x, y, r, FOREST[200]))
    return ''.join(out)


def comp_venn(W, H, cx, cy, s, ramp_l, ramp_r, overlap, kw=None):
    b = brain(cx - overlap, cy, s, ramp_l, halves='left')
    b += brain(cx + overlap, cy, s, ramp_r, halves='right')
    return b


def comp_lines(W, H, items, stroke, sw, fills):
    out = []
    for (x, y, r, k) in items:
        if k < 0:
            out.append(circle(x, y, r, 'none', stroke=stroke, sw=sw))
        else:
            out.append(circle(x, y, r, fills[k]))
    return ''.join(out)


def squircle(x, y, w, h, r, fill='none', stroke=None, sw=0, dash=None):
    st = f' stroke="{stroke}" stroke-width="{f(sw)}"' if stroke else ''
    da = f' stroke-dasharray="{dash}" stroke-linecap="round"' if dash else ''
    return f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" rx="{f(r)}" fill="{fill}"{st}{da}/>'


# ---------- thumbnails 1600x900, focal content inside the 4:3 and 21:9 crops ----------
W, H = 1600, 900
T = {}
T['perspective-a'] = (GLASS['green'], comp_brain(W, H, RAMPS['green'], 640, 590, 8.2))
T['perspective-b'] = (GLASS['green'], comp_half(W, H, RAMPS['green'], 330, 560, 10.5, 'right',
                                                 spark_at=(1010, 330), sr=118))
T['deep-dive-a'] = (GLASS['deep'], comp_rings(W, H, [FOREST[100], FOREST[200], FOREST[300], FOREST[500], FOREST[700]], 700, 540, 400, n=5, split=True,
                                              sr=84))
T['deep-dive-b'] = (GLASS['deep'], comp_rings(W, H, [SLATE[100], FOREST[200], FOREST[400], FOREST[600], FOREST[800]],
                                              900, 560, 360, n=5, split=True, sr=78))
T['win-a'] = (GLASS['green'], comp_rise(W, H, RAMPS['emerald'][::-1], 200, 800, n=5, r0=52, r1=250, span=0.66))
T['win-b'] = (GLASS['green'], comp_rise(W, H, [EMER[200], EMER[300], EMER[400], EMER[500], EMER[600]], 260, 820, n=4, r0=70, r1=270, span=0.62))
T['paper-a'] = (GLASS['frost'], comp_lines(W, H, [(620, 470, 300, -1), (900, 400, 230, -1), (760, 610, 170, 1),
                                                  (1020, 560, 120, 0), (520, 330, 90, 2), (1150, 330, 60, -1)],
                                           FOREST[400], 5, [FOREST[300], FOREST[200], FOREST[100]]) +
                 sparks_pair(1110, 300, 70))
T['paper-b'] = (GLASS['frost'], comp_lines(W, H, [(800, 450, 380, -1), (800, 450, 280, -1), (800, 450, 180, 1),
                                                  (980, 300, 90, 0), (560, 640, 70, 2)],
                                           FOREST[400], 5, [FOREST[300], FOREST[200], FOREST[100]]) +
                 sparks_pair(1090, 270, 64))
T['release-a'] = (GLASS['teal'], comp_row(W, H, RAMPS['teal'][::-1], 200, 760, [70, 105, 150, 205], 34))
T['release-b'] = (GLASS['teal'], comp_row(W, H, [FOREST[200], FOREST[300], TEAL['mid'], TEAL['deep']], 260, 780, [90, 130, 175, 220], 26, sr_k=0.45))
T['session-a'] = (GLASS['teal'], comp_orbit(W, H, 800, 470, [(330, 190), (520, 300), (720, 420)], RAMPS['teal'], 3.2,
                                             [(1, -38, 46), (2, 152, 30)], ring=TEAL['mid'], tilt=-12))
T['session-b'] = (GLASS['teal'], comp_orbit(W, H, 640, 520, [(280, 280), (460, 460), (660, 660)], RAMPS['teal'], 3.0,
                                             [(1, -55, 44), (0, 40, 26)], ring=TEAL['mid'], tilt=0))
T['session-c'] = (GLASS['teal'], comp_orbit(W, H, 960, 430, [(300, 150), (500, 250), (720, 360)], RAMPS['deep'], 2.9,
                                             [(1, 200, 42), (2, -20, 30)], ring=FOREST[300], tilt=8))
T['session-d'] = (GLASS['green'], comp_orbit(W, H, 700, 500, [(300, 300), (500, 500), (720, 720)], RAMPS['green'], 3.1,
                                             [(1, -40, 44), (2, 200, 30)], ring=FOREST[300], tilt=0))
T['leadership-a'] = (GLASS['quiet'], comp_half(W, H, [NEU[500], NEU[400], NEU[300], NEU[250], NEU[150]], 300, 560, 10.5, 'right', spark_at=(990, 330), sr=112))
T['leadership-b'] = (GLASS['quiet'], comp_half(W, H, [NEU[500], NEU[400], NEU[300], NEU[250], NEU[150]], 1300, 560, 10.5, 'left', spark_at=(560, 300), sr=104))
T['use-case-a'] = (GLASS['teal'], comp_half(W, H, RAMPS['teal'], 340, 600, 10.0, 'right', spark_at=(1030, 320), sr=104) +
                   f'<path d="M560 700 C 760 760, 900 560, 990 420" fill="none" stroke="{TEAL["deep"]}" stroke-width="6" stroke-dasharray="2 20" stroke-linecap="round"/>')
T['use-case-b'] = (GLASS['teal'], squircle(420, 160, 760, 580, 150, stroke=FOREST[500], sw=7) +
                   brain(800, 470, 5.0, RAMPS['teal']) + sparks_pair(1060, 300, 62))
T['model-card-a'] = (GLASS['slate'], comp_grid(W, H, 6, 3, 420, 230, 152, 58, [SLATE[200], SLATE[300], SLATE[100], SLATE[400]], (4, 0), seed=3))
T['model-card-b'] = (GLASS['slate'], comp_grid(W, H, 5, 3, 480, 230, 160, 62, [SLATE[200], SLATE[300], SLATE[100]], (1, 1), seed=8, shape='squircle'))
T['roundup-a'] = (SLATE[50], comp_scatter(W, H, 46, 11, [SLATE[200], SLATE[300], SLATE[100], FOREST[200]], [(820, 450, 120)], area=(60, 60, 1540, 840)) + sparks_pair(820, 450, 74))
T['roundup-b'] = (SLATE[50], comp_scatter(W, H, 40, 23, [SLATE[200], SLATE[300], SLATE[100], FOREST[100]], [(600, 520, 110)], area=(60, 60, 1540, 840)) + sparks_pair(600, 520, 70))
T['partner-a'] = (GLASS['quiet'], comp_venn(W, H, 800, 560, 9.0, RAMPS['green'], RAMPS['teal'], 30) + sparks_pair(800, 190, 64))
T['partner-b'] = (GLASS['quiet'], comp_venn(W, H, 800, 600, 8.0, RAMPS['teal'], RAMPS['green'], 120) + sparks_pair(800, 230, 58))
T['awards-a'] = (GLASS['green'], comp_brain(W, H, RAMPS['emerald'], 620, 610, 7.6) +
                 ''.join(spark(x, y, r, plain=True, body=EMER[300]) for x, y, r in [(1240, 220, 16), (1320, 420, 11), (300, 230, 13), (1180, 560, 9)]))
T['awards-b'] = (GLASS['green'], sparks_pair(760, 520, 190) +
                 ''.join(spark(x, y, r, plain=True, body=c) for x, y, r, c in [(420, 300, 22, EMER[300]), (1180, 640, 18, EMER[200]), (1240, 300, 12, EMER[300]), (360, 640, 14, EMER[200]), (560, 170, 10, EMER[300])]))

made = []
for name, (bg, body) in T.items():
    made.append(render(name, W, H, body, bg, 'thumbnails'))

# ---------- tiles 1600x1200 (4:3) for Quick links and Hero web part tiles ----------
W2, H2 = 1600, 1200
TL = {}
TL['tlm'] = (GLASS['quiet'], comp_brain(W2, H2, RAMPS['mark'], 700, 700, 9.6))
TL['portal'] = (GLASS['slate'], comp_grid(W2, H2, 4, 3, 380, 360, 280, 108, [SLATE[200], SLATE[100], SLATE[300], NEU[0]], (2, 0), seed=5, shape='squircle'))
idx = []
for j, (dx, hot) in enumerate([(0.84, False), (0.75, True), (0.66, False), (0.55, False), (0.42, False)]):
    y = 260 + j * 170
    idx.append(f'<rect x="220" y="{y-5}" width="1160" height="10" rx="5" fill="{NEU[200]}"/>')
    x = 220 + 1160 * dx
    if hot:
        idx.append(circle(x, y, 70, FOREST[700]) + spark(x, y, 40))
    else:
        idx.append(circle(x, y, 44, [SLATE[400], FOREST[400], SLATE[300], FOREST[300], SLATE[300]][j]))
TL['tl-index'] = (GLASS['quiet'], ''.join(idx))
TL['responsible'] = (GLASS['green'], squircle(370, 230, 860, 740, 200, stroke=FOREST[500], sw=8) +
                     brain(800, 640, 6.4, RAMPS['green']) + sparks_pair(1080, 430, 70))
TL['bring-a-problem'] = (GLASS['green'], ''.join(circle(x, y, r, c) for x, y, r, c in
                                                  [(560, 720, 200, FOREST[300]), (820, 540, 170, EMER[300]), (600, 420, 130, EMER[200]),
                                                   (840, 820, 150, FOREST[400])]) +
                         circle(1060, 380, 140, 'none', stroke=FOREST[500], sw=7) .replace('/>', ' stroke-dasharray="2 22" stroke-linecap="round"/>') +
                         sparks_pair(1060, 390, 74))
TL['outcomes'] = (GLASS['teal'], comp_rise(W2, H2, RAMPS['teal'][::-1], 240, 1000, n=5, r0=60, r1=270, span=0.64))
for name, (bg, body) in TL.items():
    made.append(render(name, W2, H2, body, bg, 'tiles'))

print(len(made), 'images')
