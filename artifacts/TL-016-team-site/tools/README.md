# TL-016 build tools

The scripts that made and checked the files in this folder, so any of them can be checked or made again. Nothing here touches SharePoint, and nothing fetches from outside the repo.

| Folder | What it is | When to run it |
| --- | --- | --- |
| `canvas/` | `render.py` draws each board to a PNG, with the board pictures served from the theme pack. `post.py` turns those PNGs into the WebP previews and `overview.jpg` in `design-canvas/previews`. `contrast.py` lists every text under WCAG AA on every board; TOTAL 0 is the bar before a publish. `darkscan.py` lists large dark blocks. `assets.json` maps the canvas's picture ids to theme-pack files. | After any board change: render, post, contrast |
| `../theme-pack/tools/imagery/` | The imagery generator: hero variants, post thumbnails, product tiles, patterns and the logo files, from the design kit's mark and colours | To change a picture |
| `history/` | The one-off scripts that made each canvas and pack version, kept as the record. They carry the lab session's own paths and are not meant to be run again: `v10.py` (D-381), `v11.py` and `v11b.py` (D-490), `patch12.py` and `patch12b.py` (D-498), `pack.py` and `pack11.py` (the pack's gradients and drawings), `home.py`, `mandate.py` and `common.py` (the v9 Home and Mandate boards and drawings), `copydoc.py` and `copyx.py` (page copy taken from the boards), `crops.py` and `boxes.py` (close-up checks) | Never; read them to see how a version was made |

## Set up once

Python 3.10 or later, then:

```
pip install playwright pillow numpy
python -m playwright install chrome     # or use a Chrome that is already installed
```

The imagery generator also needs `rsvg-convert` (`brew install librsvg` or `apt install librsvg2-bin`). Install the Inter font locally if the previews should use the canvas's type; without it they fall back to a system font.

## After a board change

```
cd artifacts/TL-016-team-site/tools/canvas
python3 render.py            # or name boards: python3 render.py Main System
python3 post.py
python3 contrast.py          # must end TOTAL 0
```

Opened straight from disk, the board HTML files show no pictures, because the canvas serves them from its own store. `render.py` serves them from the theme pack instead, and the WebP previews carry them.
