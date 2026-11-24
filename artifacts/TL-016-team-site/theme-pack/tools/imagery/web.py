"""Web renditions of the pictures, in images/web: WebP, heroes and patterns 1440 px wide, thumbnails and
tiles 800 px wide, for web pages and decks where a lighter file is better. Plain Meadow comes from
gradients/. Run it after imagery.py and imagery2.py; the output is the same on every run.

  python3 web.py"""
import glob, os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
PACK = os.path.abspath(os.path.join(HERE, '..', '..'))
IMG = os.environ.get('TL_IMAGERY_OUT', os.path.join(PACK, 'images'))
OUT = os.path.join(IMG, 'web')
SETS = [('heroes', 1440, [os.path.join(PACK, 'gradients', 'meadow-2880x1200.png')]),
        ('thumbnails', 800, []), ('tiles', 800, []), ('patterns', 1440, [])]

n = 0
for folder, width, extra in SETS:
    os.makedirs(os.path.join(OUT, folder), exist_ok=True)
    files = sorted(glob.glob(os.path.join(IMG, folder, '*.png'))) + extra
    if folder == 'patterns':
        files = [f for f in files if f.endswith('-2880x1200.png')]
    for f in files:
        name = os.path.basename(f).replace('-2880x1200', '').replace('.png', '.webp')
        im = Image.open(f).convert('RGB')
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        im.save(os.path.join(OUT, folder, name), quality=82, method=6)
        n += 1
print(n, 'web renditions in', OUT)
