"""Canvas v11.1 (D-498): the design kit's brain mark in every header, imagery on the thumbs and tiles,
a logo section and an imagery section on System, thumbnails in the templates' page properties, and a new
Imagery board. Runs once on the v11 boards (backup in canvas-root/project-v11-bak)."""
import json, re

P = '/home/claude/canvas-root/project/'
LOGO = '/home/claude/imagery/logo/'
A = json.load(open('/home/claude/gen/assets.json'))
DID = 'D-498'


def blob(name):
    return f'/_blob/{A[name]}'


def mark(kind, size, prefix, label=None):
    s = open(f'{LOGO}{kind}-trimmed.svg').read().strip()
    for i in re.findall(r'id="([^"]+)"', s):
        s = s.replace(f'id="{i}"', f'id="{prefix}-{i}"').replace(f'url(#{i})', f'url(#{prefix}-{i})')
    s = re.sub(r'<title>.*?</title>', '', s)
    s = s.replace('<svg xmlns="http://www.w3.org/2000/svg"', f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}"', 1)
    if label:
        s = s.replace(' role="img"', f' role="img" aria-label="{label}" style="flex:none;display:block"', 1)
    else:
        s = s.replace(' role="img"', ' aria-hidden="true" focusable="false" style="flex:none;display:block"', 1)
    return s


def read(name):
    return open(P + name).read()


def write(name, t):
    open(P + name, 'w').write(t)


def add_css(t, css):
    i = t.rfind('</style>\n</helmet>')
    assert i > 0
    return t[:i] + css.strip() + '\n' + t[i:]


def sub1(t, old, new, count=1):
    assert t.count(old) == count, (old[:80], t.count(old))
    return t.replace(old, new)


# 1. Header: the red TL tile becomes the brain mark, full colour on the white header -----------------
TL_SPAN = ('<span style="width:40px;height:40px;border-radius:12px;background:#C20028;color:#FFFFFF;display:inline-flex;'
           'align-items:center;justify-content:center;font-weight:600;font-size:14px">TL</span>')
boards = sorted(json.load(open(P + 'canvas.json'))['boards'])
n_hdr = 0
for b in boards:
    t = read(b)
    if TL_SPAN in t:
        t = sub1(t, TL_SPAN, mark('brain-full-colour', 40, 'hdr'))
        write(b, t)
        n_hdr += 1
print('headers', n_hdr)

# 2. Thumbs and tiles: images from the set, by board and position ---------------------------------
THUMBS = {
    'Blog.dc.html': ['thumb-leadership-a', 'thumb-paper-a', 'thumb-perspective-b', 'thumb-win-a', 'thumb-deep-dive-a',
                     'thumb-release-a', 'thumb-session-a', 'thumb-paper-b', 'thumb-deep-dive-b'],
    'Main.dc.html': ['tile-tlm', 'tile-portal', 'tile-tl-index', 'thumb-release-a', 'thumb-paper-a', 'thumb-leadership-a',
                     'thumb-deep-dive-b'],
    'Perspectives.dc.html': ['thumb-session-c', 'thumb-session-b', 'thumb-session-a', 'thumb-session-d'],
    'Products.dc.html': ['tile-portal'],
}
CSS_THUMB = """
/* v11.1 (2026-11-24, {did}): post thumbnails and product tiles drawn from the design kit's brain mark */
.thumb.img.img.img{{background-color:#E6F2EC !important;background-position:center !important;background-size:cover !important;background-repeat:no-repeat !important;border-color:#E3E7E4 !important;overflow:hidden}}
{rules}
.thumb.img.img .tag{{background:#FFFFFF !important;color:#0B5F33 !important;box-shadow:0 1px 2px rgba(11,15,12,.10)}}
.thumb.img.img .tag.teal{{color:#12382F !important}}
.thumb.img.img .tag.grey{{color:#3A413C !important}}
.thumb.img.img .tag.steel{{color:#445664 !important}}
.thumb.img.img .tag.terra{{color:#3A433D !important}}
.thumb.img.img .tag.red{{background:#FCE6E4 !important;color:#95141D !important}}
.thumb.img.img .tag.dark{{background:#0B0F0C !important;color:#FFFFFF !important;box-shadow:none}}
.thumb.img.img.rec{{align-items:flex-end !important;justify-content:flex-start !important;padding:14px !important}}
"""
for b, names in THUMBS.items():
    t = read(b)
    head, body = t.split('</helmet>', 1)
    found = list(re.finditer(r'<div class="thumb([^"]*)"', body))
    assert len(found) == len(names), (b, len(found))
    out, last, rules, seen = [], 0, [], set()
    for m, name in zip(found, names):
        cls = m.group(1)
        tag_end = body.index('>', m.end())
        has_play = 'class="play"' in body[tag_end:tag_end + 120]
        extra = f' img img-{name}' + (' rec' if has_play else '')
        out.append(body[last:m.start()] + f'<div class="thumb{cls}{extra}"')
        last = m.end()
        if name not in seen:
            pos = ' !important;background-position:center 55% !important' if (b == 'Products.dc.html' and name == 'tile-portal') else ' !important'
            rules.append(f'.thumb.img.img-{name}.img{{background-image:url({blob(name)}){pos}}}')
            seen.add(name)
    body = ''.join(out) + body[last:]
    t = head + '</helmet>' + body
    t = add_css(t, CSS_THUMB.format(did=DID, rules='\n'.join(rules)))
    write(b, t)
    print(b, len(names), 'thumbs')

# 3. Templates: the post's thumbnail at the top of its page properties -----------------------------
TPL = {
    'TplBlog.dc.html': ('thumb-perspective-a', 'perspective-a or -b; deep-dive-a or -b for a deep dive'),
    'TplWin.dc.html': ('thumb-win-a', 'win-a or win-b'),
    'TplPaper.dc.html': ('thumb-paper-a', 'paper-a or paper-b'),
    'TplModelCard.dc.html': ('thumb-model-card-a', 'model-card-a or model-card-b'),
    'TplRelease.dc.html': ('thumb-release-a', 'release-a or release-b'),
    'TplLeader.dc.html': ('thumb-leadership-a', 'leadership-a or leadership-b'),
    'TplUseCase.dc.html': ('thumb-use-case-a', 'use-case-a or use-case-b'),
    'TplSession.dc.html': ('thumb-session-a', 'session-a to session-d, in turn'),
    'TplRoundup.dc.html': ('thumb-roundup-a', 'roundup-a or roundup-b'),
    'TplPartner.dc.html': ('thumb-partner-a', 'partner-a or partner-b'),
    'TplAwards.dc.html': ('thumb-awards-a', 'awards-a or awards-b'),
}
CAP = '<p class="cap" style="margin-bottom:4px">Page properties</p>'
for b, (name, value) in TPL.items():
    t = read(b)
    t = sub1(t, CAP, CAP + f'\n      <img src="{blob(name)}" alt="" width="800" height="450" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:14px;border:1px solid #E3E7E4;margin:6px 0 4px">')
    m = re.search(r'<p class="prop"><span>Category</span><span>[^<]*</span></p>', t)
    assert m, b
    t = t[:m.end()] + f'\n      <p class="prop"><span>Thumbnail</span><span>{value} (Page details; images/thumbnails in the theme pack)</span></p>' + t[m.end():]
    write(b, t)
print('templates', len(TPL))

# 4. System board: logo section, imagery section, red rule, motifs --------------------------------
SYS_CSS = """
/* v11.1 (2026-11-24, {did}): the design kit's brain mark and the imagery set */
.lg-tile{{border-radius:24px;height:220px;display:flex;align-items:center;justify-content:center}}
.lg-card{{display:flex;flex-direction:column;gap:8px}}
.lg-table{{width:100%;border-collapse:collapse;font-size:16px;line-height:1.5}}
.lg-table th{{text-align:left;font-weight:600;font-size:14px;color:#0B5F33;padding:0 16px 10px 0;border-bottom:1px solid #E3E7E4}}
.lg-table td{{padding:14px 16px 14px 0;border-bottom:1px solid #E3E7E4;vertical-align:top}}
.lg-table td:first-child{{font-weight:600;width:220px}}
.lg-table .file{{font-weight:500;color:#0B0F0C;word-break:break-word}}
.im-fig{{margin:0;display:flex;flex-direction:column;gap:8px}}
.im-fig img{{display:block;width:100%;height:auto;border-radius:16px;border:1px solid #E3E7E4;background:#E6F2EC}}
""".format(did=DID)
t = read('System.dc.html')
t = add_css(t, SYS_CSS)
t = sub1(t, '<p class="cap">Site design system · v11</p>', '<p class="cap">Site design system · v11.1</p>')
t = sub1(t, "Every page uses the same sizes and the kit's colours (design kit v0.11.4). Buttons are black; red is kept for the one main action and the header stripe.",
         "Every page uses the same sizes, the kit's colours (design kit v0.11.4) and the kit's brain mark. Buttons are black; red is kept for the one main action and the header stripe.")
LOGO_SEC = f'''  <section class="sec" id="logo"><div><p class="cap">Logo</p><h2 class="h2">The design kit's brain mark</h2></div>
    <div class="grid g3">
      <div class="lg-card"><div class="lg-tile" style="background:#FFFFFF;border:1px solid #E3E7E4">{mark('brain-full-colour', 150, 'lg1', 'Brain mark, full colour')}</div><p style="font-weight:600">Full colour</p><p class="meta">On white, off-white and black: the header, the site logo and the site logo thumbnail.</p></div>
      <div class="lg-card"><div class="lg-tile" style="background:#0C2822">{mark('brain-white-tonal', 150, 'lg2', 'Brain mark, white tonal')}</div><p style="font-weight:600">White tonal</p><p class="meta">On the deep forest band and on any other colour; on a photo, only inside a dark tile.</p></div>
      <div class="lg-card"><div class="lg-tile" style="background:#FFFFFF;border:1px solid #E3E7E4">{mark('two-sparks', 150, 'lg3', 'Two-spark mark')}</div><p style="font-weight:600">Alternate: two sparks</p><p class="meta">The kit's second candidate, on white only: it has no version for colour yet.</p></div>
    </div>
    <table class="lg-table">
      <thead><tr><th scope="col">SharePoint slot</th><th scope="col">Where</th><th scope="col">File in the theme pack</th></tr></thead>
      <tbody>
        <tr><td>Site logo thumbnail</td><td>Settings &gt; Change the look &gt; Header. Required and square; shown in search results, on site cards and wherever a square logo is needed. Recommended 64 × 64.</td><td class="file">logo/site-logo-thumbnail-white-tile-256.png</td></tr>
        <tr><td>Site logo</td><td>The same panel. Shown in the header beside the site title, transparent; 64 × 64 up to 192 × 64.</td><td class="file">logo/brain-full-colour-256.png</td></tr>
        <tr><td>Deep fields</td><td>The closing band or a dark tile, if a mark is ever placed there.</td><td class="file">logo/brain-white-tonal-256.png</td></tr>
      </tbody>
    </table>
    <p class="boardnote"><b>Board note.</b> The marks are the design kit's own files (design/marks). The kit has not yet chosen between its two candidates, and its components keep the placeholder mark until it does. The site uses the brain because it alone has a version for coloured backgrounds; if the two-spark mark is chosen, the header and both SharePoint slots each take one new file. PNG throughout, because SharePoint refuses SVG logos on group-connected sites.</p>
  </section>
'''
t = sub1(t, '  <section class="sec"><div><p class="cap">Type</p>', LOGO_SEC + '  <section class="sec"><div><p class="cap">Type</p>')
IMG_SEC = f'''  <section class="sec" id="imagery"><div><p class="cap">Imagery</p><h2 class="h2">Pictures drawn from the mark</h2></div>
    <p style="font-size:19px;max-width:880px">Heroes, post thumbnails, product tiles and patterns, drawn by script from the mark's lobes and sparks in the kit's colours. No picture carries text, so one file works for any title.</p>
    <div class="grid g4">
      <figure class="im-fig"><img src="{blob('hero-meadow-spark')}" alt="Meadow hero with two sparks at the right" width="1440" height="600"><figcaption class="meta">Hero, 2880 × 1200: the art on the right, the title's half clear.</figcaption></figure>
      <figure class="im-fig"><img src="{blob('thumb-perspective-a')}" alt="Brain lobes with two sparks on green glass" width="800" height="450"><figcaption class="meta">Post thumbnail, 1600 × 900: two per category.</figcaption></figure>
      <figure class="im-fig"><img src="{blob('tile-tlm')}" alt="Large brain mark on quiet glass" width="800" height="600"><figcaption class="meta">Product tile, 1600 × 1200: Quick links and the Hero web part.</figcaption></figure>
      <figure class="im-fig"><img src="{blob('pattern-sparks')}" alt="Small sparks spaced on green glass" width="1440" height="600"><figcaption class="meta">Pattern: optional, one quiet section a page at most.</figcaption></figure>
    </div>
    <p><a class="pill" href="Imagery.dc.html">Every picture, and where it goes</a></p>
  </section>
'''
t = sub1(t, '  <section class="sec"><div><p class="cap">Rules</p>', IMG_SEC + '  <section class="sec"><div><p class="cap">Rules</p>')
t = sub1(t, '<p class="meta">#C20028 · The one main action, the header stripe and the logo tile</p>', '<p class="meta">#C20028 · The one main action and the header stripe</p>')
t = sub1(t, 'Red is the one main action of a view, the 4 px header stripe and the placeholder logo tile; on the deep band',
         'Red is the one main action of a view and the 4 px header stripe; on the deep band')
t = sub1(t, '<li>Dots stay the only motif: they gather when a lesson is kept and scatter when it is lost.</li>',
         "<li>The mark's shapes are the only motifs: lobes, sparks, rings and dots. Dots gather when a lesson is kept and scatter when it is lost.</li>\n"
         "      <li>The logo is the kit's brain mark: full colour on white, white tonal on the deep band or any colour. Pictures carry no text, and a title never sits on the art.</li>")
t = sub1(t, '<title>ThinkLatent · Site design system v11</title>', '<title>ThinkLatent · Site design system v11.1</title>')
t = sub1(t, '"$preview":{"width":1440,"height":3600}', '"$preview":{"width":1440,"height":5000}')
write('System.dc.html', t)
print('system done')
