"""Small, dependency-free SVG charts for the report (line and bar).

Follows the dataviz reference instance: the categorical palette in fixed slot
order (validated, light and dark steps), 2px lines, 8px markers with a 2px
surface ring, 4px rounded bar ends on the baseline, recessive grid, a legend
whenever there are two or more series plus direct labels at line ends for up
to four, and a <title> on every mark for hover. One y-axis per chart, always.
Each chart is paired with a table in the report.
"""

from __future__ import annotations

import html
import math

SERIES_LIGHT = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#6250d6", "#e34948"]
SERIES_DARK = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#0ca30c", "#9085e9", "#e66767"]

W, H = 720, 380
ML, MR, MT, MB = 70, 130, 64, 52


def _style() -> str:
    """Concrete colours per class (no CSS variables), so every SVG renderer draws them;
    the dark-mode steps apply where the viewer honours prefers-color-scheme."""
    def rules(series, surface, ink, ink2, grid, axis):
        r = [f".v .bg{{fill:{surface}}}", f".v .t{{fill:{ink};font-size:15px;font-weight:600}}",
             f".v .st{{fill:{ink2};font-size:12px}}", f".v .tk{{fill:{ink2};font-size:11px}}",
             f".v .lb{{fill:{ink};font-size:12px}}", f".v .gr{{stroke:{grid};stroke-width:1}}",
             f".v .ax{{stroke:{axis};stroke-width:1}}",
             f".v .rf{{stroke:{ink2};stroke-width:1;stroke-dasharray:4 4}}", f".v .rg{{stroke:{surface}}}"]
        for i, c in enumerate(series):
            r += [f".v .f{i + 1}{{fill:{c}}}", f".v .l{i + 1}{{stroke:{c}}}"]
        return "".join(r)

    font = ".v{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}"
    light = rules(SERIES_LIGHT, "#fcfcfb", "#0b0b0b", "#52514e", "#e6e5e0", "#b9b8b1")
    dark = rules(SERIES_DARK, "#1a1a19", "#f0efec", "#c3c2b7", "#2e2e2c", "#55554f")
    return f"<style>{font}{light}@media (prefers-color-scheme: dark){{{dark}}}</style>"


def _nice_ticks(lo: float, hi: float, n: int = 5) -> list[float]:
    if hi <= lo:
        hi = lo + 1
    raw = (hi - lo) / n
    mag = 10 ** math.floor(math.log10(raw))
    step = min((s * mag for s in (1, 2, 2.5, 5, 10) if s * mag >= raw), default=raw)
    v = math.floor(lo / step) * step
    ticks = []
    while True:  # always end on a tick at or above hi, so no mark sits above the plot
        ticks.append(round(v, 10))
        if v >= hi - 1e-9:
            return ticks
        v += step


def _fmt(v: float) -> str:
    if v is None:
        return ""
    if abs(v) >= 1000:
        return f"{v / 1000:.1f}k".replace(".0k", "k")
    if abs(v) >= 10 or v == int(v):
        return f"{v:.0f}"
    return f"{v:.2g}"


def _esc(s: str) -> str:
    return html.escape(str(s), quote=True)


def line_chart(title: str, series: list[dict], *, x_label: str, y_label: str, subtitle: str = "",
               x_log: bool = False, ref: list[tuple[float, str]] | None = None, y_max: float | None = None,
               y_cap: float | None = None, value_fmt=_fmt) -> str:
    series = [s for s in series if s.get("points")][:8]
    xs = [x for s in series for x, _ in s["points"]]
    ys = [y for s in series for _, y in s["points"] if y is not None]
    if not xs or not ys:
        return ""
    x0, x1 = min(xs), max(xs)
    ytop = max(ys + [r[0] for r in (ref or [])])
    if y_max:
        ytop = max(ytop, y_max)
    yt = _nice_ticks(0, y_cap if y_cap else ytop * 1.05)
    y1 = yt[-1]
    longest = max((len(str(s["name"])) for s in series), default=0) if len(series) <= 4 else 0
    mr = min(260, max(MR, 7 * longest + 28))
    pw, ph = W - ML - mr, H - MT - MB

    def fx(x):
        if x_log:
            a, b = math.log10(max(x0, 1e-9)), math.log10(max(x1, x0 * 1.0001))
            return ML + (math.log10(max(x, 1e-9)) - a) / (b - a or 1) * pw
        return ML + (x - x0) / ((x1 - x0) or 1) * pw

    def fy(y):
        return MT + ph - (y / (y1 or 1)) * ph

    out = [f'<svg xmlns="http://www.w3.org/2000/svg" class="v" viewBox="0 0 {W} {H}" width="{W}" height="{H}" '
           f'role="img" aria-label="{_esc(title)}">', _style(), f'<rect class="bg" width="{W}" height="{H}"/>',
           f'<text class="t" x="{ML}" y="24">{_esc(title)}</text>']
    if subtitle:
        out.append(f'<text class="st" x="{ML}" y="42">{_esc(subtitle)}</text>')
    for t in yt:
        out.append(f'<line class="gr" x1="{ML}" x2="{W - mr}" y1="{fy(t):.1f}" y2="{fy(t):.1f}"/>')
        out.append(f'<text class="tk" x="{ML - 8}" y="{fy(t) + 4:.1f}" text-anchor="end">{_fmt(t)}</text>')
    xticks = sorted(set(xs))
    if len(xticks) > 10:
        xticks = xticks[:: math.ceil(len(xticks) / 10)]
    for t in xticks:
        out.append(f'<text class="tk" x="{fx(t):.1f}" y="{H - MB + 18}" text-anchor="middle">{_fmt(t)}</text>')
    out.append(f'<line class="ax" x1="{ML}" x2="{W - mr}" y1="{MT + ph}" y2="{MT + ph}"/>')
    out.append(f'<text class="tk" x="{ML + pw / 2:.0f}" y="{H - 10}" text-anchor="middle">{_esc(x_label)}</text>')
    out.append(f'<text class="tk" transform="translate(16,{MT + ph / 2:.0f}) rotate(-90)" text-anchor="middle">'
               f'{_esc(y_label)}</text>')
    for yv, lab in ref or []:
        out.append(f'<line class="rf" x1="{ML}" x2="{W - mr}" y1="{fy(yv):.1f}" y2="{fy(yv):.1f}"/>')
        ly = fy(yv) - 5 if fy(yv) - MT > 18 else fy(yv) + 14
        out.append(f'<text class="tk" x="{ML + 6}" y="{ly:.1f}">{_esc(lab)}</text>')
    if len(series) >= 2:  # legend row
        lx = ML
        for i, s in enumerate(series):
            out.append(f'<rect x="{lx}" y="{MT - 16}" width="12" height="3" rx="1.5" class="f{i + 1}"/>')
            out.append(f'<text class="tk" x="{lx + 16}" y="{MT - 12}">{_esc(s["name"])}</text>')
            lx += 24 + 7 * len(str(s["name"]))
    label_ys: list[float] = []
    for i, s in enumerate(series):
        pts = sorted((x, y) for x, y in s["points"] if y is not None)
        d = " ".join(f'{"M" if j == 0 else "L"}{fx(x):.1f},{fy(y):.1f}' for j, (x, y) in enumerate(pts))
        out.append(f'<path d="{d}" class="l{i + 1}" fill="none" stroke-width="2" stroke-linejoin="round"/>')
        for x, y in pts:
            out.append(f'<circle cx="{fx(x):.1f}" cy="{fy(y):.1f}" r="4" class="f{i + 1} rg" stroke-width="2">'
                       f'<title>{_esc(s["name"])}: {_fmt(x)} -> '
                       f'{value_fmt(y)}</title></circle>')
        if len(series) <= 4 and pts:
            ly = fy(pts[-1][1]) + 4
            while any(abs(ly - o) < 14 for o in label_ys):
                ly += 14
            label_ys.append(ly)
            out.append(f'<text class="lb" x="{fx(pts[-1][0]) + 10:.1f}" y="{ly:.1f}">{_esc(s["name"])}</text>')
    out.append("</svg>")
    return "\n".join(out)


def bar_chart(title: str, items: list[tuple[str, float]], *, y_label: str, subtitle: str = "",
              label_items: set | None = None, ref: list[tuple[float, str]] | None = None, value_fmt=_fmt) -> str:
    items = [(k, v) for k, v in items if v is not None]
    if not items:
        return ""
    ytop = max([v for _, v in items] + [r[0] for r in (ref or [])])
    yt = _nice_ticks(0, ytop * 1.08)
    y1 = yt[-1]
    pw, ph = W - ML - MR, H - MT - MB - 20
    n = len(items)
    slot = pw / n
    bw = max(6.0, min(56.0, slot - 2))

    def fy(y):
        return MT + ph - (y / (y1 or 1)) * ph

    out = [f'<svg xmlns="http://www.w3.org/2000/svg" class="v" viewBox="0 0 {W} {H}" width="{W}" height="{H}" '
           f'role="img" aria-label="{_esc(title)}">', _style(), f'<rect class="bg" width="{W}" height="{H}"/>',
           f'<text class="t" x="{ML}" y="24">{_esc(title)}</text>']
    if subtitle:
        out.append(f'<text class="st" x="{ML}" y="42">{_esc(subtitle)}</text>')
    for t in yt:
        out.append(f'<line class="gr" x1="{ML}" x2="{W - MR}" y1="{fy(t):.1f}" y2="{fy(t):.1f}"/>')
        out.append(f'<text class="tk" x="{ML - 8}" y="{fy(t) + 4:.1f}" text-anchor="end">{_fmt(t)}</text>')
    base = MT + ph
    for i, (k, v) in enumerate(items):
        cx = ML + slot * i + slot / 2
        x = cx - bw / 2
        top = fy(v)
        h = max(0.0, base - top)
        r = min(4.0, h / 2, bw / 2)
        path = (f"M{x:.1f},{base:.1f} L{x:.1f},{top + r:.1f} Q{x:.1f},{top:.1f} {x + r:.1f},{top:.1f} "
                f"L{x + bw - r:.1f},{top:.1f} Q{x + bw:.1f},{top:.1f} {x + bw:.1f},{top + r:.1f} L{x + bw:.1f},{base:.1f} Z")
        out.append(f'<path d="{path}" class="f1"><title>{_esc(k)}: {value_fmt(v)}</title></path>')
        if label_items and k in label_items:
            out.append(f'<text class="lb" x="{cx:.1f}" y="{top - 6:.1f}" text-anchor="middle">{value_fmt(v)}</text>')
        out.append(f'<text class="tk" x="{cx:.1f}" y="{base + 16:.1f}" text-anchor="end" '
                   f'transform="rotate(-25 {cx:.1f} {base + 16:.1f})">{_esc(k)}</text>')
    for yv, lab in ref or []:
        out.append(f'<line class="rf" x1="{ML}" x2="{W - MR}" y1="{fy(yv):.1f}" y2="{fy(yv):.1f}"/>')
        out.append(f'<text class="tk" x="{ML + 6}" y="{fy(yv) - 5:.1f}">{_esc(lab)}</text>')
    out.append(f'<line class="ax" x1="{ML}" x2="{W - MR}" y1="{base}" y2="{base}"/>')
    out.append(f'<text class="tk" transform="translate(16,{MT + ph / 2:.0f}) rotate(-90)" text-anchor="middle">'
               f'{_esc(y_label)}</text>')
    out.append("</svg>")
    return "\n".join(out)
