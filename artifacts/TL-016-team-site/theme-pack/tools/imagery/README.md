# Imagery generator

Draws every picture in `images/` (and, given the design kit's marks, the files in `logo/`) from the design kit's mark geometry and colour tokens. No photographs, no image model, no text in any image, and nothing is fetched while it runs.

| File | What it does |
| --- | --- |
| `brand.py` | The kit's colours (colour v5) and the marks' shapes: lobes cut flat at a straight split, sparks with a dark body, emerald upper strokes and white lower strokes |
| `imagery.py` | The 26 post thumbnails (1600 × 900) and the six product tiles (1600 × 1200), with their SVG sources in `images/src` |
| `imagery2.py` | The three hero variants (2880 × 1200), the five patterns (240 px tiles and 2880 × 1200), and the logo files when `TL_KIT_MARKS` is set |

## Run it

Needs Python 3 with numpy and Pillow, and `rsvg-convert` (librsvg: `brew install librsvg` or `apt install librsvg2-bin`).

```
python3 imagery.py                   # thumbnails and tiles into ../../images
python3 imagery2.py                  # heroes and patterns into ../../images
TL_KIT_MARKS=<design-kit>/design/marks/out python3 imagery2.py   # also rebuilds ../../logo
TL_IMAGERY_OUT=/tmp/try python3 imagery.py                       # write somewhere else to compare first
```

The output is the same byte for byte on every run. To change a picture, change its composition in the script and run it again, so the set stays one family; never edit a PNG by hand. Plain Meadow, the default hero, is `gradients/meadow-2880x1200.png` and is not made here.
