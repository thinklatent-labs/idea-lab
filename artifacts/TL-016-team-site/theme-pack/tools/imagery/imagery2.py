"""Hero images, patterns and SharePoint logo files for the ThinkLatent site (kit colour v5, the marks' anatomy)."""
import math, os, random, shutil, subprocess, sys
import numpy as np
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
PACK = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, HERE)
from brand import *

OUT = os.environ.get('TL_IMAGERY_OUT', os.path.join(PACK, 'images'))
SRC = f'{OUT}/src'
for _d in ('heroes', 'patterns', 'src'):
    os.makedirs(f'{OUT}/{_d}', exist_ok=True)


def to_png(svgtext, path, w=None, h=None):
    p = path.replace('.png', '.svg').replace(f'{OUT}/', f'{SRC}/').replace('/heroes/', '/heroes-').replace('/patterns/', '/patterns-').replace('/logo/', '/logo-')
    open(p, 'w').write(svgtext)
    args = ['rsvg-convert', '-o', path]
    if w: args += ['-w', str(w)]
    if h: args += ['-h', str(h)]
    subprocess.run(args + [p], check=True)


def hx(h):
    h = h.lstrip('#')
    return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], dtype=np.float64)


def glow(img, cx, cy, rx, ry, col, alpha, stop):
    H_, W_, _ = img.shape
    y, x = np.mgrid[0:H_, 0:W_].astype(np.float64)
    d = np.sqrt(((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2)
    a = (alpha * np.clip(1 - d / stop, 0, 1))[..., None]
    return img * (1 - a) + hx(col) * a


def field(img):
    """The kit's hero field, as the boards' CSS draws it (2x): signal 18% under forest 40%, top right."""
    H_, W_, _ = img.shape
    S = W_ / 1440
    img = glow(img, .76 * W_, .04 * H_, 380 * S, 280 * S, '#13FC4A', .18, .70)
    img = glow(img, .88 * W_, .20 * H_, 620 * S, 420 * S, FOREST[500], .40, .70)
    return img


def layer(base_rgb, svgbody, W_, H_):
    """Composite a transparent SVG layer over an RGB float image."""
    tmp = '/tmp/_layer.svg'
    open(tmp, 'w').write(svg(W_, H_, svgbody))
    subprocess.run(['rsvg-convert', '-o', '/tmp/_layer.png', tmp], check=True)
    L = np.asarray(Image.open('/tmp/_layer.png').convert('RGBA'), dtype=np.float64)
    a = L[..., 3:4] / 255.0
    return base_rgb * (1 - a) + L[..., :3] * a


def save(img, path):
    rng = np.random.default_rng(7)
    img = img + rng.uniform(-0.5, 0.5, img.shape)
    Image.fromarray(np.clip(np.round(img), 0, 255).astype(np.uint8)).save(path, optimize=True)


# ---------- heroes 2880x1200: white, the field, text kept clear on the left ----------
W, H = 2880, 1200
os.makedirs(f'{OUT}/heroes', exist_ok=True)
# Plain Meadow, the default hero, is gradients/meadow-2880x1200.png in the pack; the three variants follow.

white = np.ones((H, W, 3)) * 255.0

# lobes: the mark's silhouette, very light, at the right edge; the field over it
img = layer(white.copy(), brain(0.905 * W, 0.66 * H, 15.5, [FOREST[100], FOREST[50], GLASS['teal'], EMER[50], GLASS['quiet']]), W, H)
img = field(img)
save(img, f'{OUT}/heroes/meadow-lobes.png')

# spark: the field with the marks' two sparks at its centre
img = field(white.copy())
img = layer(img, sparks_pair(0.805 * W, 0.40 * H, 150), W, H)
save(img, f'{OUT}/heroes/meadow-spark.png')

# orbit: dotted orbits around the field, two small sparks travelling on them
cx, cy = 0.865 * W, 0.28 * H
rings = ''
cid = 'orbclip'
rings += f'<defs><clipPath id="{cid}"><rect x="{0.60*W}" y="0" width="{W}" height="{H}"/></clipPath></defs><g clip-path="url(#{cid})">'
for rx, ry in [(430, 250), (680, 400), (940, 560)]:
    rings += (f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="{FOREST[300]}" stroke-width="5" '
              f'stroke-dasharray="2 20" stroke-linecap="round"/>')
rings += '</g>'
pts = []
for (rx, ry, ang, r) in [(680, 400, 128, 46), (430, 250, 230, 30)]:
    a = math.radians(ang)
    pts.append(spark(cx + rx * math.cos(a), cy + ry * math.sin(a), r))
img = field(white.copy())
img = layer(img, rings + ''.join(pts), W, H)
save(img, f'{OUT}/heroes/meadow-orbit.png')

# ---------- patterns: seamless 240 px tiles (SVG) and full-size backgrounds (2880x1200 PNG) ----------
os.makedirs(f'{OUT}/patterns', exist_ok=True)
TS = 240


def wrap(items, draw):
    """Draw each (x, y, r, ...) item and its copies across tile edges so the tile repeats seamlessly."""
    out = []
    for it in items:
        x, y, r = it[0], it[1], it[2]
        for dx in (-TS, 0, TS):
            for dy in (-TS, 0, TS):
                if -r - 2 < x + dx < TS + r + 2 and -r - 2 < y + dy < TS + r + 2:
                    out.append(draw(x + dx, y + dy, *it[2:]))
    return ''.join(out)


rnd = random.Random(42)
P = {}
P['dots'] = (None, ''.join(circle(12 + 24 * i, 12 + 24 * j, 2.2, NEU[300]) for i in range(10) for j in range(10)))
sp = [(rnd.uniform(0, TS), rnd.uniform(0, TS), rnd.choice([7, 9, 12]), rnd.choice([FOREST[100], EMER[100], FOREST[200]])) for _ in range(9)]
P['sparks'] = (GLASS['green'], wrap(sp, lambda x, y, r, c: spark(x, y, r, plain=True, body=c)))
P['rings'] = (GLASS['teal'], wrap([(60, 70, 52), (180, 190, 52), (180, 70, 22), (60, 190, 22)],
              lambda x, y, r: ''.join(circle(x, y, r * k, 'none', stroke=FOREST[200], sw=2.5) for k in (1, .66, .33))))
lace = [(rnd.uniform(0, TS), rnd.uniform(0, TS), rnd.uniform(26, 64)) for _ in range(7)]
P['lace'] = (None, wrap(lace, lambda x, y, r: circle(x, y, r, 'none', stroke=NEU[250], sw=2)))
hd = []
for j in range(4):
    for i in range(4):
        hd.append((i * 60 + (30 if j % 2 else 0) + 30, j * 60 + 30, 18, 'right' if (i + j) % 2 else 'left'))
P['halves'] = (GLASS['green'], wrap(hd, lambda x, y, r, s: half_disc(x, y, r, FOREST[100], side=s)))

FULL = {'dots': '#FFFFFF', 'sparks': GLASS['green'], 'rings': GLASS['teal'], 'lace': '#FFFFFF', 'halves': GLASS['green']}
for name, (bg, body) in P.items():
    tile = svg(TS, TS, body, bg)
    open(f'{OUT}/patterns/{name}-tile.svg', 'w').write(tile)
    subprocess.run(['rsvg-convert', '-o', f'{OUT}/patterns/{name}-tile.png', f'{OUT}/patterns/{name}-tile.svg'], check=True)
    big = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'
           f'<defs><pattern id="p" width="{TS}" height="{TS}" patternUnits="userSpaceOnUse">{body}</pattern></defs>'
           f'<rect width="{W}" height="{H}" fill="{FULL[name]}"/><rect width="{W}" height="{H}" fill="url(#p)"/></svg>')
    p = f'{SRC}/patterns-{name}-2880x1200.svg'
    open(p, 'w').write(big)
    subprocess.run(['rsvg-convert', '-o', f'{OUT}/patterns/{name}-2880x1200.png', p], check=True)

# ---------- logo files for SharePoint ----------
K = os.environ.get('TL_KIT_MARKS')  # a design-kit checkout's design/marks/out/ folder
LOGO = os.path.join(PACK, 'logo')
if not K:
    print('heroes and patterns written; set TL_KIT_MARKS to the kit\'s design/marks/out/ to rebuild the logo files')
    sys.exit(0)
K = os.path.join(K, '')
os.makedirs(f'{LOGO}/alternate', exist_ok=True)
BOX = {'brain': '25.5 33.5 194 194', 'two-sparks': '34 24 200 200'}


def trimmed(src, box, dst):
    t = open(src).read()
    t = t.replace('viewBox="0 0 256 256"', f'viewBox="{box}"', 1)
    open(dst, 'w').write(t)
    return dst


for kit, base, box in [('brain-full-colour', 'brain-full-colour', BOX['brain']),
                       ('brain-white-tonal', 'brain-white-tonal', BOX['brain']),
                       ('two-sparks', 'two-sparks', BOX['two-sparks'])]:
    dst = f'{LOGO}/alternate' if base == 'two-sparks' else LOGO
    shutil.copy(K + kit + '.svg', f'{dst}/{base}.svg')
    tsvg = trimmed(K + kit + '.svg', box, f'{dst}/{base}-trimmed.svg')
    for px in (64, 256, 512):
        subprocess.run(['rsvg-convert', '-w', str(px), '-h', str(px), '-o', f'{dst}/{base}-{px}.png', tsvg], check=True)

# Site logo thumbnail on a white tile (for places that show it on colour), and the white tonal on deep forest
for px in (64, 256):
    for name, bgc, src in [('site-logo-thumbnail-white-tile', '#FFFFFF', 'brain-full-colour'),
                           ('site-logo-thumbnail-deep-tile', FOREST[900], 'brain-white-tonal')]:
        tile = Image.new('RGBA', (px, px), bgc)
        m = Image.open(f'{LOGO}/{src}-512.png').convert('RGBA').resize((int(px * 0.80), int(px * 0.80)), Image.LANCZOS)
        tile.alpha_composite(m, (int(px * 0.10), int(px * 0.10)))
        tile.save(f'{LOGO}/{name}-{px}.png', optimize=True)

print('heroes, patterns and logo files written')
