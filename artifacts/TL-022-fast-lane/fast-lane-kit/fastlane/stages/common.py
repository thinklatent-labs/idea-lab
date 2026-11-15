"""What every stage shares: the run context, running one measured cell, warm-up,
and running many cells in parallel across a profile's replicas."""

from __future__ import annotations

import queue
import threading
from dataclasses import dataclass, field
from pathlib import Path

from fastlane import metrics as M
from fastlane.client import Request, run_closed_loop, summarize_results
from fastlane.config import Config
from fastlane.prompts import PromptLibrary
from fastlane.servers import ServerGroup
from fastlane.util import LOG, read_json, write_json, write_jsonl


@dataclass
class Ctx:
    cfg: Config
    run_dir: Path
    run_id: str
    _lib: PromptLibrary | None = field(default=None, repr=False)

    @property
    def lib(self) -> PromptLibrary:
        if self._lib is None:
            self._lib = PromptLibrary(self.cfg)
        return self._lib

    def sdir(self, stage: str) -> Path:
        p = self.run_dir / "stages" / stage
        p.mkdir(parents=True, exist_ok=True)
        return p

    def log_dir(self, stage: str) -> Path:
        p = self.run_dir / "logs" / stage
        p.mkdir(parents=True, exist_ok=True)
        return p

    @property
    def req_cfg(self) -> dict:
        return self.cfg["request"]

    @property
    def temperature(self) -> float:
        return float(self.cfg["request"].get("temperature", 0.0))

    @property
    def timeout_s(self) -> float:
        return float(self.cfg["request"].get("timeout_s", 900))

    @property
    def fixed_length(self) -> bool:
        return bool(self.cfg["request"].get("fix_output_length", True))


def cell_key(**kw) -> str:
    parts = []
    for k, v in kw.items():
        if isinstance(v, float):
            v = f"{v:g}"
        parts.append(f"{k}{v}")
    return "__".join(parts).replace("@", "k").replace("/", "-")


def run_cell(ctx: Ctx, url: str | list[str], served_name: str, reqs: list[Request], concurrency: int, *,
             out_dir: Path, key: str, meta: dict, stream: bool = True, procs: int = 1,
             bind_workers: bool = False, metric_urls: list[str] | None = None) -> dict:
    """Run one cell (fixed concurrency), record per-request results and a summary.
    Resumable: an existing summary file is returned as is."""
    out_file = out_dir / f"{key}.json"
    prev = read_json(out_file)
    if prev is not None:
        return prev
    urls = url if isinstance(url, list) else [url]
    murls = metric_urls or urls
    before = M.scrape_all(murls)
    results, wall = run_closed_loop(urls, served_name, reqs, concurrency, stream=stream, req_cfg=ctx.req_cfg,
                                    timeout_s=ctx.timeout_s, bind_workers=bind_workers, procs=procs)
    after = M.scrape_all(murls)
    d = M.merge([M.delta(b, a) for b, a in zip(before, after)])
    summary = summarize_results(results, wall, concurrency)
    summary["spec"] = M.spec_stats(d)
    summary["prefix"] = M.prefix_stats(d)
    row = {"key": key, **meta, "concurrency": concurrency, **summary}
    write_jsonl(out_dir / f"{key}.requests.jsonl.gz", results)
    write_json(out_file, row)
    tau = row["spec"].get("tau")
    LOG.info("  %s: ok %d/%d  ttft p50 %s  e2e p95 %s  decode p50 %s tok/s%s", key, row["ok"], row["requests"],
             _ms(row["ttft"].get("p50")), _ms(row["e2e"].get("p95")),
             f"{row['decode_tps'].get('p50') or 0:,.0f}", f"  tau {tau:.2f}" if tau else "")
    return row


def _ms(v: float | None) -> str:
    return "n/a" if v is None else f"{v * 1000:,.0f} ms"


def warmup(ctx: Ctx, group: ServerGroup, n: int = 4) -> None:
    """A few short calls per replica so first-call compilation does not land in a cell."""
    L = min(int(x) for x in ctx.cfg["prompts"]["lengths"])
    for i, url in enumerate(group.urls):
        reqs = ctx.lib.cell_requests(L, 32, n, cell_id=f"warmup-{group.prof['name']}-{i}", temperature=0.0)
        run_closed_loop([url], group.served_name, reqs, 2, req_cfg=ctx.req_cfg, timeout_s=ctx.timeout_s)


def run_cells_parallel(ctx: Ctx, group: ServerGroup, jobs: list[dict], out_dir: Path) -> list[dict]:
    """Run cells across the group's replicas, one worker thread per replica.

    Each job: {"key", "meta", "L", "out", "n", "concurrency", "prefix_share", "temperature", "cell_id"}.
    A cell runs on one replica, so its metrics delta is that replica's alone."""
    q: queue.Queue = queue.Queue()
    for j in jobs:
        q.put(j)
    rows: list[dict] = []
    lock = threading.Lock()

    def worker(url: str) -> None:
        while True:
            try:
                j = q.get_nowait()
            except queue.Empty:
                return
            try:
                reqs = ctx.lib.cell_requests(j["L"], j["out"], j["n"], cell_id=j["cell_id"],
                                             temperature=j.get("temperature", ctx.temperature),
                                             prefix_share=j.get("prefix_share", 0.0),
                                             fixed_length=ctx.fixed_length)
                row = run_cell(ctx, url, group.served_name, reqs, j["concurrency"], out_dir=out_dir,
                               key=j["key"], meta=j["meta"])
                with lock:
                    rows.append(row)
            except Exception as e:  # one bad cell never stops the stage
                LOG.exception("cell %s failed: %s", j["key"], e)

    threads = [threading.Thread(target=worker, args=(u,), daemon=True) for u in group.urls]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    return rows


def record_failure(out_dir: Path, name: str, error: str | None) -> dict:
    row = {"profile": name, "failed": True, "error": (error or "unknown")[-4000:]}
    write_json(out_dir / f"FAILED__{name}.json", row)
    return row
