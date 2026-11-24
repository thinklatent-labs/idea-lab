"""Turn render.py's PNGs into the previews kept in GitHub: one WebP per board in design-canvas/previews,
and overview.jpg (the fourteen pages and the design system, five across). Needs Python 3 and Pillow.

  python3 post.py"""
import glob, os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.abspath(os.path.join(HERE, '..', '..'))
PNG = os.environ.get('TL_PREVIEW_PNG', '/tmp/tl016-previews')
OUT = os.path.join(SITE, 'design-canvas', 'previews')
Image.MAX_IMAGE_PIXELS = None

pngs = sorted(glob.glob(os.path.join(PNG, '[0-9][0-9]-*.png')))
for p in pngs:
    im = Image.open(p).convert('RGB')
    im.save(os.path.join(OUT, os.path.splitext(os.path.basename(p))[0] + '.webp'), quality=82, method=6)

W, H, G = 288, 900, 16
ov = Image.new('RGB', (G + 5 * (W + G), G + 3 * (H + G)), '#E9EDEA')
for k, p in enumerate(pngs[:15]):
    im = Image.open(p).convert('RGB')
    im = im.resize((W, int(im.height * W / im.width)), Image.LANCZOS).crop((0, 0, W, min(H, int(im.height * W / im.width))))
    ov.paste(im, (G + (k % 5) * (W + G), G + (k // 5) * (H + G)))
if len(pngs) >= 15:
    ov.save(os.path.join(OUT, 'overview.jpg'), quality=86, optimize=True)
print(len(pngs), 'previews written to', OUT)
