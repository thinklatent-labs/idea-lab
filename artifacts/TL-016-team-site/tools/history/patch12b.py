"""Canvas v11.1 (D-498): the Imagery board and canvas.json."""
import json, re

P = '/home/claude/canvas-root/project/'
A = json.load(open('/home/claude/gen/assets.json'))
DID = 'D-498'


def blob(name):
    return f'/_blob/{A[name]}'


sysb = open(P + 'System.dc.html').read()
head = sysb[:sysb.index('</style>\n</helmet>')]
head = head.replace('<title>ThinkLatent · Site design system v11.1</title>', '<title>ThinkLatent · Imagery v11.1</title>')
CSS = """
/* Imagery board (v11.1, 2026-11-24, D-498) */
.im-hero{position:relative;margin:0;display:flex;flex-direction:column;gap:10px}
.im-hero .frame{position:relative;border-radius:20px;overflow:hidden;border:1px solid #E3E7E4;background:#FFFFFF}
.im-hero img{display:block;width:100%;height:auto}
.im-hero .mock{position:absolute;left:6%;top:50%;transform:translateY(-50%);max-width:46%;display:flex;flex-direction:column;gap:6px}
.im-hero .mock span{font-size:13px;font-weight:600;color:#0B5F33}
.im-hero .mock b{font-size:26px;line-height:1.08;font-weight:500;letter-spacing:-.02em;color:#0B0F0C}
.th-groups{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:36px 20px}
.th-group{grid-column:span 2;display:flex;flex-direction:column;gap:12px}
.th-group.wide{grid-column:span 4}
.th-set{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.th-group.wide .th-set{grid-template-columns:repeat(4,minmax(0,1fr))}
.th-note{grid-column:span 2;align-self:stretch;background:#FFFFFF;border:1px solid #E3E7E4;border-radius:20px;padding:24px;display:flex;flex-direction:column;gap:10px;font-size:16px}
.im-fig{margin:0;display:flex;flex-direction:column;gap:8px}
.im-fig img{display:block;width:100%;height:auto;border-radius:14px;border:1px solid #E3E7E4;background:#E6F2EC}
.im-fig figcaption{font-size:14px;color:#4A524D}
.im-fig figcaption b{color:#0B0F0C;font-weight:600}
.lg-table{width:100%;border-collapse:collapse;font-size:16px;line-height:1.5}
.lg-table th{text-align:left;font-weight:600;font-size:14px;color:#0B5F33;padding:0 16px 10px 0;border-bottom:1px solid #E3E7E4}
.lg-table td{padding:14px 16px 14px 0;border-bottom:1px solid #E3E7E4;vertical-align:top}
.lg-table td:first-child{font-weight:600;width:220px}
.lg-table .file{font-weight:500;color:#0B0F0C;word-break:break-word}
@media (max-width:900px){.th-groups{grid-template-columns:minmax(0,1fr)}.th-group,.th-group.wide,.th-note{grid-column:auto}.th-group.wide .th-set{grid-template-columns:repeat(2,minmax(0,1fr))}.im-hero .mock b{font-size:18px}}
"""


def fig(name, alt, cap, w, h):
    return (f'<figure class="im-fig"><img src="{blob(name)}" alt="{alt}" width="{w}" height="{h}">'
            f'<figcaption>{cap}</figcaption></figure>')


HEROES = [
    ('hero-meadow', 'Meadow', 'The default for every page hero. The soft field sits top right, clear of the title.', 'Page title', 'How the mandate is delivered.',
     'White hero with a soft green field at the top right'),
    ('hero-meadow-lobes', 'Meadow with lobes', 'For a hero with text only: the lobes rise from the bottom right.', 'Products', 'Owned models, inside the boundary.',
     'White hero with pale brain lobes rising at the bottom right'),
    ('hero-meadow-spark', 'Meadow with sparks', 'For releases, the quarterly awards and ThinkLatent Day.', 'Release', 'TLM4: Core, Distil and Domain.',
     'White hero with two sparks at the right'),
    ('hero-meadow-orbit', 'Meadow with an orbit', 'For AI Perspectives and events.', 'AI Perspectives', 'What the session means here.',
     'White hero with dotted orbits and two sparks at the right'),
]
hero_html = '\n'.join(
    f'''      <figure class="im-hero"><div class="frame"><img src="{blob(n)}" alt="{alt}" width="1440" height="600"><div class="mock" aria-hidden="true"><span>{k}</span><b>{tt}</b></div></div><figcaption class="meta"><b style="color:#0B0F0C;font-weight:600">{name}.</b> {use}</figcaption></figure>'''
    for n, name, use, k, tt, alt in HEROES)

GROUPS = [
    ('perspective', 'Perspective', 'Blog post, Perspective', 'Brain lobes with two sparks', 2),
    ('deep-dive', 'Deep dive', 'Blog post, Deep dive', 'Split rings with two sparks', 2),
    ('win', 'Win', 'Win story', 'Circles growing to the right, two sparks on the largest', 2),
    ('use-case', 'Use case', 'Use case', 'Lobes inside a rounded frame with two sparks', 2),
    ('paper', 'Paper', 'Paper explained', 'Outlined circles and a spark', 2),
    ('model-card', 'Model card', 'Model card', 'A grid of shapes with one spark tile', 2),
    ('release', 'Release', 'Release notes', 'Rising half circles with two sparks on the tallest', 2),
    ('leadership', 'Leadership', 'Leadership series', 'Half a brain in greys with two sparks', 2),
    ('session', 'Session', 'AI Perspectives session', 'A small brain inside dotted orbits', 4),
    ('roundup', 'Roundup', 'Conference roundup', 'Scattered dots around a spark', 2),
    ('partner', 'Partner', 'New partner', 'Two brain halves apart, a spark between', 2),
    ('awards', 'Awards', 'ThinkLatent quarterly awards', 'Sparks and lobes on green glass', 2),
]
LET = 'abcd'
parts = []
for key, name, tpl, alt, n in GROUPS:
    figs = ''.join(fig(f'thumb-{key}-{LET[i]}', f'{alt} ({LET[i]})', f'<b>{key}-{LET[i]}</b>', 800, 450) for i in range(n))
    wide = ' wide' if n == 4 else ''
    parts.append(f'''      <div class="th-group{wide}"><div><p style="font-weight:600;font-size:19px">{name}</p><p class="meta">{tpl} template · images/thumbnails/{key}-a.png{' to -d' if n == 4 else ' and -b'}</p></div><div class="th-set">{figs}</div></div>''')
parts.append('''      <div class="th-note"><p style="font-weight:600;font-size:19px">How the pairs work</p><p>Each category has an a and a b, so two posts of one kind can sit side by side in News without repeating. Sessions have four, one per session in a row.</p><p>The focus sits inside the centre 4:3 of every thumbnail, so the News web part's 4:3, 16:9 and 21:9 crops and the 16:9 of Highlighted content all keep it.</p></div>''')
groups_html = '\n'.join(parts)

TILES = [
    ('tlm', 'TLM', 'The TLM product card and its Hero tile.', 'Large brain mark on quiet glass'),
    ('portal', 'ThinkLatent Portal', 'The portal card until real screens replace it.', 'A grid of rounded tiles, one holding a spark'),
    ('tl-index', 'TL Index', 'The index tile: models placed along their scores.', 'Dots placed along five lines, one a spark'),
    ('responsible', 'How we build responsibly', 'The governance card.', 'Lobes inside a rounded frame'),
    ('bring-a-problem', 'Bring us a problem', 'The ask on Wins and Home.', 'Circles with a spark inside a dotted ring'),
    ('outcomes', 'Outcomes', 'The proof panel and win round-ups.', 'Circles growing to the right in teal'),
]
tiles_html = '\n'.join('      ' + fig(f'tile-{k}', alt, f'<b>{name}.</b> {use}', 800, 600) for k, name, use, alt in TILES)

PATTERNS = [
    ('dots', 'Dots', 'On white.', 'Small green and grey dots spaced on white'),
    ('sparks', 'Sparks', 'On Mint rise, the green glass.', 'Small sparks spaced on green glass'),
    ('rings', 'Rings', 'On Lagoon, the teal glass.', 'Thin rings spaced on teal glass'),
    ('lace', 'Lace', 'On white, at the lowest contrast.', 'Fine linked circles on white'),
    ('halves', 'Halves', 'On Mint rise.', 'Half circles in rows on green glass'),
]
pat_html = '\n'.join('      ' + fig(f'pattern-{k}', alt, f'<b>{name}.</b> {use} 240 px tile (SVG, PNG) and a 2880 × 1200 PNG.', 1440, 600) for k, name, use, alt in PATTERNS)

BODY = f'''</style>
</helmet>
<div style="min-height:100vh;background:#F7F9F8">
<section class="hero"><div class="wrap" style="padding-top:88px;padding-bottom:64px;display:flex;flex-direction:column;gap:20px">
  <p class="cap">Imagery · v11.1</p>
  <h1 style="font-size:72px;line-height:1;font-weight:500;letter-spacing:-.04em;max-width:1000px">Heroes, thumbnails, tiles and patterns from the mark.</h1>
  <p style="font-size:22px;color:#3A413C;max-width:780px">Every picture is drawn by script from the brain mark's lobes and sparks, in the design kit's colours. None carries text, so one file works for any title. The files are in the theme pack under images.</p>
</div></section>
<main class="wrap" style="display:flex;flex-direction:column;gap:88px;padding-top:72px;padding-bottom:96px">
  <section class="sec" id="heroes"><div><p class="cap">Heroes</p><h2 class="h2">Four hero backgrounds, 2880 × 1200</h2><p style="color:#4A524D;margin-top:10px;max-width:760px;font-size:17px">The art sits on the right; the left half stays clear for the title. Meadow is the default, and the other three are for heroes with text only.</p></div>
    <div class="grid g2">
{hero_html}
    </div>
  </section>
  <section class="sec" id="thumbnails"><div><p class="cap">Post thumbnails</p><h2 class="h2">Two per category, 1600 × 900</h2><p style="color:#4A524D;margin-top:10px;max-width:760px;font-size:17px">One category for each template. Set a post's thumbnail in Page details, as the last step before posting.</p></div>
    <div class="th-groups">
{groups_html}
    </div>
  </section>
  <section class="sec" id="tiles"><div><p class="cap">Product tiles</p><h2 class="h2">Six tiles, 1600 × 1200</h2><p style="color:#4A524D;margin-top:10px;max-width:760px;font-size:17px">At 4:3, for Quick links in the Tiles layout and the Hero web part's tiles.</p></div>
    <div class="grid g3">
{tiles_html}
    </div>
  </section>
  <section class="sec" id="patterns"><div><p class="cap">Patterns</p><h2 class="h2">Five patterns, optional</h2><p style="color:#4A524D;margin-top:10px;max-width:760px;font-size:17px">At most one a page, behind a section with little text; never behind a hero or the closing band.</p></div>
    <div class="grid g2">
{pat_html}
    </div>
  </section>
  <section class="sec" id="sharepoint"><div><p class="cap">SharePoint</p><h2 class="h2">Where each file goes</h2></div>
    <table class="lg-table">
      <thead><tr><th scope="col">What</th><th scope="col">Where</th><th scope="col">File in the theme pack</th></tr></thead>
      <tbody>
        <tr><td>Site logo thumbnail</td><td>Settings &gt; Change the look &gt; Header &gt; Site logo thumbnail. Recommended 64 × 64.</td><td class="file">logo/site-logo-thumbnail-white-tile-256.png</td></tr>
        <tr><td>Site logo</td><td>Settings &gt; Change the look &gt; Header &gt; Site logo.</td><td class="file">logo/brain-full-colour-256.png</td></tr>
        <tr><td>A post's thumbnail</td><td>Edit &gt; Page details &gt; Change thumbnail. Set it last, after the final edit, then check it in News: SharePoint can swap it for the first image in the post.</td><td class="file">images/thumbnails/[category]-a.png or -b.png</td></tr>
        <tr><td>Product tiles</td><td>Quick links (Tiles layout) or the Hero web part: edit the item &gt; Change image.</td><td class="file">images/tiles/[name].png</td></tr>
        <tr><td>A page hero</td><td>Edit section &gt; Background &gt; Image, on the top section.</td><td class="file">images/heroes/meadow-[variant].png</td></tr>
        <tr><td>A quiet section</td><td>Edit section &gt; Background &gt; Image.</td><td class="file">images/patterns/[name]-2880x1200.png</td></tr>
      </tbody>
    </table>
    <p class="boardnote"><b>Board note.</b> Drawn by script from the design kit's mark geometry and colour tokens: no photographs and no image model. To change a picture, change the script in the theme pack (tools/imagery) and run it again, so the set stays one family. Previews on this board are WebP; the pack holds the full-size PNG files.</p>
  </section>
</main>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":1440,"height":7400}}}}'>
class Component extends DCLogic {{
  renderVals() {{ return {{}}; }}
}}
</script>
</body>
</html>
'''
out = head + CSS.strip() + '\n' + BODY
open(P + 'Imagery.dc.html', 'w').write(out)
print('imagery board', len(out))

# canvas.json ---------------------------------------------------------------------------------------
c = json.load(open(P + 'canvas.json'))
c['title'] = "ThinkLatent site — v11.1: the design kit's brain mark and imagery"
c['boards']['System.dc.html']['title'] = 'Site design system · v11.1'
c['boards']['System.dc.html']['h'] = 5000
c['boards']['Imagery.dc.html'] = {'x': 9120, 'y': 0, 'w': 1440, 'h': 7400, 'title': 'Imagery · v11.1', 'expand': 'fill', 'is_interactive': False}
o = c['order']
o.insert(o.index('System.dc.html') + 1, 'Imagery.dc.html')
nt = c['notes']
for k, x in (('src', 13680), ('fid', 12160), ('nav', 10640)):
    nt[k]['x'] = x
nt['n_imagery'] = {'x': 9120, 'y': -620, 'w': 420, 'size': 's', 'fill': 'blue', 'text':
    "Imagery · v11.1 (2026-11-24, D-498): pictures drawn by script from the design kit's brain mark, in the kit's colours, with no text in any of them. "
    "Four hero backgrounds (2880 × 1200; Meadow plus lobes, sparks and an orbit, the art on the right and the title's half clear), 26 post thumbnails "
    "(1600 × 900; an a and a b per category, four for sessions, the focus inside the centre 4:3 so every News crop keeps it), six product tiles "
    "(1600 × 1200) and five optional patterns. SharePoint: Page details > Change thumbnail for posts, Quick links and Hero tiles for the products, "
    "Edit section > Background > Image for heroes and patterns (tier 1). Shown on Blog, Home, AI Perspectives, Products and in every template's page properties."}
nt['n_system']['text'] = (
    "Site design system · v11.1 (2026-11-24, D-498): the design kit's brain mark replaces the red TL tile, full colour on the white header and as the "
    "SharePoint site logo and thumbnail (Change the look > Header), white tonal on deep fields; the two-spark mark is the alternate until Jithin picks "
    "(quick call TL-016-q1). New Logo and Imagery sections; red now marks only the one main action and the header stripe; the mark's shapes are the motifs. "
    "Before (v11, 2026-11-23, D-490): " + nt['n_system']['text'].split('(2026-11-23, D-490): ', 1)[1])
nt['fid']['text'] = (
    "Fidelity (v11.1, 2026-11-24, D-498): at Jithin's ask, the site takes the design kit's new mark: the brain candidate in every header in place of the red TL tile, "
    "post thumbnails and product tiles from the new imagery on Blog, Home, AI Perspectives and Products, each template's page properties showing its thumbnail, "
    "and an Imagery board. Before: " + nt['fid']['text'])
for k in ('row1', 'row2', 'row3', 'row4'):
    nt[k]['text'] = nt[k]['text'].replace('(v11)', '(v11.1)')
json.dump(c, open(P + 'canvas.json', 'w'), ensure_ascii=False, indent=1)
print('canvas.json', len(c['boards']), 'boards')
