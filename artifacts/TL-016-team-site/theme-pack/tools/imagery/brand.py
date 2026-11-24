"""Shapes and colours for the ThinkLatent site imagery, taken from the design kit (colour v5, design-kit v0.11.5)
and the anatomy of its two candidate marks in design/marks: lobes are circles cut flat at a straight split,
sparks are four-point stars with a dark body, emerald upper strokes and white lower strokes."""
import math, random

FOREST = {50: '#EEF5F2', 100: '#D7E8E1', 200: '#B0D1C4', 300: '#7FB3A0', 400: '#4F917C', 500: '#2E7562',
          600: '#1F5E4E', 700: '#18493D', 800: '#12382F', 900: '#0C2822'}
EMER = {50: '#EAF6EE', 100: '#CFEBD8', 200: '#A6DDBC', 300: '#7FD3A4', 400: '#4CC787', 500: '#34B370',
        600: '#1E8F55', 700: '#0B5F33'}
SLATE = {50: '#F2F5F7', 100: '#E1E8EC', 200: '#C4D1D8', 300: '#9DB0BB', 400: '#7B8E9A', 500: '#5A6E7B',
         600: '#445664', 700: '#33434F'}
NEU = {0: '#FFFFFF', 50: '#F7F8F7', 100: '#EFF2F0', 150: '#E9EDEA', 200: '#E3E7E4', 250: '#D8DDD9', 300: '#CDD3CF',
       400: '#A3ABA6', 500: '#7A837D', 600: '#59625C', 700: '#3A413C', 800: '#1A1E1B'}
TEAL = {'deep': '#2A7A7A', 'mid': '#4FA3A3'}          # chart categorical 2, light and dark
GLASS = {'quiet': '#F7F9F8', 'green': '#E6F2EC', 'teal': '#E3F0EF', 'slate': '#E4EBF0', 'frost': '#EDF1EE',
         'deep': '#E9EEEB'}
INK = '#0B0F0C'
MARK_MID = '#2E8F6A'   # the brain mark's middle lobe (not a token yet; kit README open point)

# The brain mark's lobes, one half, base to top (cx, cy, r), from design/marks/generate.mjs
LOBES = [(20, 31, 18), (35, 11, 20), (14, 0, 25), (33, -15, 22), (15, -33, 21)]
SPLIT = 2.2

RAMPS = {   # five steps, base (first) to top (last)
    'mark':   [FOREST[600], FOREST[500], MARK_MID, EMER[500], EMER[400]],
    'green':  [FOREST[400], FOREST[300], EMER[300], EMER[200], EMER[100]],
    'emerald': [FOREST[500], EMER[600], EMER[500], EMER[400], EMER[300]],
    'teal':   [TEAL['deep'], TEAL['mid'], FOREST[300], FOREST[200], FOREST[100]],
    'deep':   [FOREST[900], FOREST[800], FOREST[700], FOREST[600], FOREST[500]],
    'slate':  [SLATE[600], SLATE[500], SLATE[400], SLATE[300], SLATE[200]],
    'ink':    [NEU[700], NEU[600], NEU[400], NEU[300], NEU[200]],
    'light':  [FOREST[200], FOREST[100], GLASS['teal'], EMER[50], FOREST[50]],
}


def f(v):
    return f'{v:.1f}'.rstrip('0').rstrip('.')


def spark(cx, cy, r, body=FOREST[700], up=EMER[400], low='#FFFFFF', bw=0.30, lw=0.23, op=1.0, plain=False):
    """The kit's spark: curved four-point star. The white lower strokes (the V) are kept to the body, so on a
    tinted background they draw the V without a white outline (on white this matches the kit's mark exactly).
    plain=True draws the body only (for patterns)."""
    k = 0.16 * r
    d = (f'M{f(cx)} {f(cy-r)} Q{f(cx+k)} {f(cy-k)} {f(cx+r)} {f(cy)} Q{f(cx+k)} {f(cy+k)} {f(cx)} {f(cy+r)} '
         f'Q{f(cx-k)} {f(cy+k)} {f(cx-r)} {f(cy)} Q{f(cx-k)} {f(cy-k)} {f(cx)} {f(cy-r)}Z')
    if plain:
        return f'<path d="{d}" fill="{body}" stroke="{body}" stroke-width="{f(bw*r)}" stroke-linejoin="round" opacity="{op}"/>'
    upd = f'M{f(cx-r)} {f(cy)} Q{f(cx-k)} {f(cy-k)} {f(cx)} {f(cy-r)} Q{f(cx+k)} {f(cy-k)} {f(cx+r)} {f(cy)}'
    lod = f'M{f(cx-r)} {f(cy)} Q{f(cx-k)} {f(cy+k)} {f(cx)} {f(cy+r)} Q{f(cx+k)} {f(cy+k)} {f(cx+r)} {f(cy)}'
    m = uid('sm')
    pad = r * 2
    mask = (f'<mask id="{m}" maskUnits="userSpaceOnUse" x="{f(cx-pad)}" y="{f(cy-pad)}" width="{f(2*pad)}" height="{f(2*pad)}">'
            f'<path d="{d}" fill="#fff" stroke="#fff" stroke-width="{f(bw*r)}" stroke-linejoin="round"/></mask>')
    return (f'<g opacity="{op}"><defs>{mask}</defs><path d="{d}" fill="{body}" stroke="{body}" stroke-width="{f(bw*r)}" stroke-linejoin="round"/>'
            f'<path d="{upd}" fill="none" stroke="{up}" stroke-width="{f(lw*r)}" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{lod}" fill="none" stroke="{low}" stroke-width="{f(lw*r)}" stroke-linecap="round" stroke-linejoin="round" mask="url(#{m})"/></g>')


def sparks_pair(cx, cy, r, **kw):
    """The marks' pair: a large spark and a smaller one above right (as in both candidates)."""
    return spark(cx, cy, r, **kw) + spark(cx + 1.06 * r, cy - 1.0 * r, 0.44 * r, **kw)


_uid = [0]


def uid(p='c'):
    _uid[0] += 1
    return f'{p}{_uid[0]}'


def brain(cx, cy, s, ramp, gap=True, halves='both', op=1.0):
    """The mark's lobe silhouette at scale s around (cx, cy): each half clipped flat at the split."""
    out = []
    cid = uid('half')
    out.append(f'<defs><clipPath id="{cid}"><rect x="{SPLIT if gap else 0}" y="-90" width="100" height="180"/></clipPath></defs>')
    sides = {'both': (1, -1), 'right': (1,), 'left': (-1,)}[halves]
    for sx in sides:
        g = [f'<g transform="translate({f(cx)} {f(cy)}) scale({f(sx*s)} {f(s)})" opacity="{op}"><g clip-path="url(#{cid})">']
        for (x, y, r), col in zip(LOBES, ramp):
            g.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{col}"/>')
        g.append('</g></g>')
        out.append(''.join(g))
    return ''.join(out)


def circle(cx, cy, r, fill, op=1.0, stroke=None, sw=0):
    st = f' stroke="{stroke}" stroke-width="{f(sw)}"' if stroke else ''
    return f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="{fill}" opacity="{op}"{st}/>'


def half_disc(cx, cy, r, fill, side='right', op=1.0):
    """A lobe cut at the split: a half disc, flat side vertical."""
    if side == 'right':
        d = f'M{f(cx)} {f(cy-r)} A{f(r)} {f(r)} 0 0 1 {f(cx)} {f(cy+r)} Z'
    else:
        d = f'M{f(cx)} {f(cy-r)} A{f(r)} {f(r)} 0 0 0 {f(cx)} {f(cy+r)} Z'
    return f'<path d="{d}" fill="{fill}" opacity="{op}"/>'


def svg(w, h, body, bg=None):
    b = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{b}{body}</svg>'
