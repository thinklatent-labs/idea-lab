"""The whole pipeline on simulated servers: every stage, the report, the verdicts."""

import os
import subprocess
import sys
from pathlib import Path

from fastlane.util import read_json

ROOT = Path(__file__).resolve().parent.parent


def test_smoke_plan_end_to_end(tmp_path):
    env = dict(os.environ,
               FASTLANE_RESULTS=str(tmp_path / "results"), FASTLANE_DATA=str(tmp_path / "data"),
               FASTLANE_WORK=str(tmp_path / "work"), FASTLANE_MODELS=str(tmp_path / "models"),
               FASTLANE_REPOS=str(tmp_path / "repos"), FASTLANE_ENVS=str(tmp_path / "envs"),
               PYTHONPATH=str(ROOT))
    p = subprocess.run([sys.executable, "-m", "fastlane", "run", "--plan", "smoke", "--dry-run", "--run-id", "t"],
                       cwd=ROOT, env=env, capture_output=True, text=True, timeout=1800)
    assert p.returncode == 0, p.stdout[-4000:] + p.stderr[-4000:]
    run_dir = tmp_path / "results" / "t"
    run = read_json(run_dir / "run.json")
    bad = {k: v for k, v in run["stages"].items() if v["status"] not in ("ok", "skipped")}
    assert not bad, bad
    assert (run_dir / "REPORT.md").exists() and (run_dir / "report.html").exists()
    verdicts = {v["id"]: v["verdict"] for v in read_json(run_dir / "hypotheses.json")}
    for h in ("H1", "H2", "H3", "H4", "H6", "H7", "H8", "H10"):
        assert verdicts.get(h) != "NOT RUN", (h, verdicts)
    assert any(k.startswith("H9") and v != "NOT RUN" for k, v in verdicts.items()), verdicts
