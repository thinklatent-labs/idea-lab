"""Shared helpers: logging, JSON files, percentiles, timing."""

from __future__ import annotations

import gzip
import json
import logging
import math
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable, Iterator

LOG = logging.getLogger("fastlane")


def setup_logging(log_file: Path | None = None, level: int = logging.INFO) -> None:
    """Log to stdout and, when given, to a file. Safe to call more than once."""
    fmt = logging.Formatter("%(asctime)s %(levelname)-7s %(name)s: %(message)s", "%Y-%m-%d %H:%M:%S")
    root = logging.getLogger()
    root.setLevel(level)
    if not any(getattr(h, "_fastlane_stdout", False) for h in root.handlers):
        sh = logging.StreamHandler(sys.stdout)
        sh.setFormatter(fmt)
        sh._fastlane_stdout = True  # type: ignore[attr-defined]
        root.addHandler(sh)
    if log_file is not None:
        log_file = Path(log_file)
        log_file.parent.mkdir(parents=True, exist_ok=True)
        if not any(getattr(h, "_fastlane_file", None) == str(log_file) for h in root.handlers):
            fh = logging.FileHandler(log_file)
            fh.setFormatter(fmt)
            fh._fastlane_file = str(log_file)  # type: ignore[attr-defined]
            root.addHandler(fh)
    logging.getLogger("aiohttp.access").setLevel(logging.WARNING)


def now_iso() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")


def write_json(path: Path, obj: Any) -> None:
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(path.name + ".tmp")
    tmp.write_text(json.dumps(obj, indent=2, ensure_ascii=False, default=_json_default) + "\n")
    tmp.replace(path)


def read_json(path: Path, default: Any = None) -> Any:
    path = Path(path)
    if not path.exists():
        return default
    return json.loads(path.read_text())


def _json_default(o: Any) -> Any:
    if isinstance(o, Path):
        return str(o)
    if isinstance(o, set):
        return sorted(o)
    if hasattr(o, "tolist"):
        return o.tolist()
    return str(o)


def write_jsonl(path: Path, rows: Iterable[dict], append: bool = False) -> int:
    """Write rows as JSON lines. A .gz suffix writes gzip. Returns the row count."""
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    mode = "at" if append else "wt"
    opener = gzip.open if path.suffix == ".gz" else open
    n = 0
    with opener(path, mode, encoding="utf-8") as f:  # type: ignore[operator]
        for row in rows:
            f.write(json.dumps(row, ensure_ascii=False, default=_json_default) + "\n")
            n += 1
    return n


def read_jsonl(path: Path) -> Iterator[dict]:
    path = Path(path)
    if not path.exists():
        return iter(())
    opener = gzip.open if path.suffix == ".gz" else open

    def _gen() -> Iterator[dict]:
        with opener(path, "rt", encoding="utf-8") as f:  # type: ignore[operator]
            for line in f:
                line = line.strip()
                if line:
                    yield json.loads(line)

    return _gen()


def percentile(values: Iterable[float], p: float) -> float | None:
    """Linear-interpolated percentile (same method as numpy's default). None if empty."""
    xs = sorted(v for v in values if v is not None and not (isinstance(v, float) and math.isnan(v)))
    if not xs:
        return None
    if len(xs) == 1:
        return float(xs[0])
    k = (len(xs) - 1) * (p / 100.0)
    lo = math.floor(k)
    hi = math.ceil(k)
    if lo == hi:
        return float(xs[int(k)])
    return float(xs[lo] + (xs[hi] - xs[lo]) * (k - lo))


def summarize(values: Iterable[float]) -> dict:
    xs = [float(v) for v in values if v is not None]
    if not xs:
        return {"n": 0}
    return {
        "n": len(xs),
        "mean": sum(xs) / len(xs),
        "p50": percentile(xs, 50),
        "p90": percentile(xs, 90),
        "p95": percentile(xs, 95),
        "p99": percentile(xs, 99),
        "min": min(xs),
        "max": max(xs),
    }


def human_s(seconds: float | None) -> str:
    if seconds is None:
        return "n/a"
    seconds = float(seconds)
    if seconds < 1:
        return f"{seconds * 1000:.0f} ms"
    if seconds < 120:
        return f"{seconds:.1f} s"
    if seconds < 7200:
        return f"{seconds / 60:.1f} min"
    return f"{seconds / 3600:.1f} h"


class Timer:
    def __init__(self) -> None:
        self.t0 = time.perf_counter()

    @property
    def elapsed(self) -> float:
        return time.perf_counter() - self.t0


def env_flag(name: str, default: bool = False) -> bool:
    v = os.environ.get(name)
    if v is None:
        return default
    return v.strip().lower() in ("1", "true", "yes", "on")


def fmt_num(v: Any, digits: int = 0) -> str:
    if v is None:
        return "n/a"
    try:
        f = float(v)
    except (TypeError, ValueError):
        return str(v)
    if math.isnan(f):
        return "n/a"
    if digits == 0:
        return f"{f:,.0f}"
    return f"{f:,.{digits}f}"
