"""Publish a run's results: commit them to this repository and push (and, if
FASTLANE_S3 is set, copy everything to S3 too).

What goes to git: the report, tables, charts, summaries, per-cell summaries,
per-request records (gzipped) and the last 400 lines of every server log.
Full server logs stay on shared storage (results/<run-id>/logs/), excluded by
.gitignore, because they can run to hundreds of megabytes.
"""

from __future__ import annotations

import gzip
import os
import subprocess
from pathlib import Path

from fastlane.config import REPO_ROOT
from fastlane.servers import tail
from fastlane.util import LOG


def _git(args: list[str], cwd: Path) -> tuple[int, str]:
    p = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True)
    return p.returncode, (p.stdout + p.stderr).strip()


def log_tails(run_dir: Path, lines: int = 400) -> int:
    src = run_dir / "logs"
    dst = run_dir / "log_tails"
    n = 0
    for p in src.rglob("*.log") if src.exists() else []:
        out = dst / p.relative_to(src)
        out = out.with_suffix(".log.gz")
        out.parent.mkdir(parents=True, exist_ok=True)
        with gzip.open(out, "wt") as f:
            f.write(tail(p, lines))
        n += 1
    return n


def run(run_dir: Path, *, push: bool = True) -> dict:
    run_dir = Path(run_dir).resolve()
    n = log_tails(run_dir)
    LOG.info("publish: %d log tails written", n)
    s3 = os.environ.get("FASTLANE_S3")
    if s3:
        rc = subprocess.run(["aws", "s3", "sync", str(run_dir), f"{s3.rstrip('/')}/{run_dir.name}/"]).returncode
        LOG.info("publish: S3 sync to %s %s", s3, "ok" if rc == 0 else f"failed ({rc})")
    try:
        rel = run_dir.relative_to(REPO_ROOT)
    except ValueError:
        LOG.warning("publish: %s is outside the repository; set FASTLANE_RESULTS to a folder inside it to push", run_dir)
        return {"status": "not in repo"}
    rc, out = _git(["add", "--", str(rel)], REPO_ROOT)
    if rc != 0:
        return {"status": "git add failed", "detail": out}
    rc, out = _git(["commit", "-m", f"results: {run_dir.name}", "--", str(rel)], REPO_ROOT)
    if rc != 0 and "nothing to commit" not in out:
        return {"status": "git commit failed", "detail": out}
    if not push:
        return {"status": "committed"}
    rc, out = _git(["push", "origin", "HEAD"], REPO_ROOT)
    if rc != 0:
        LOG.error("publish: git push failed. From a machine with access run:\n  cd %s && git push origin HEAD\n%s",
                  REPO_ROOT, out)
        return {"status": "push failed", "detail": out}
    LOG.info("publish: pushed %s", rel)
    return {"status": "pushed", "path": str(rel)}
