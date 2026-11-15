"""The router: an HTTP front end that applies the picker to every call.

  python -m fastlane router --spec spec.json --port 9000

spec.json:
  {"policy": "bucketed", "borrowing": true, "salt_prefix": "cap-1.0",
   "buckets": [...], "class_priority": {...}, "borrow_penalty": 20,
   "eps": 0.25, "lend_max_load": 2, "log": "router.jsonl",
   "replicas": [{"name": "r0", "url": "http://127.0.0.1:8100",
                 "home": ["quick", "answer", "bulk"], "max_inflight": 8}]}

It streams responses through unchanged and adds x-tl-replica, x-tl-bucket,
x-tl-borrowed and x-tl-pick-us headers. A background task reads each
replica's /metrics every 250 ms (waiting requests, KV use, health). Per-call
records go to the log as JSON lines.

This is the proof's stand-in for the Envoy ext_proc picker: the picking logic
(fastlane/picker.py) is the part that carries over.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import time
from pathlib import Path

import aiohttp
from aiohttp import web

from fastlane import metrics as M
from fastlane.picker import Meta, NoReplica, Picker, ReplicaState, buckets_from_config


class Router:
    def __init__(self, spec: dict):
        self.spec = spec
        self.replicas = [ReplicaState(name=r["name"], url=r["url"].rstrip("/"), home=set(r.get("home", [])),
                                      lendable=r.get("lendable", True), max_inflight=int(r.get("max_inflight", 8)))
                         for r in spec["replicas"]]
        self.picker = Picker(buckets_from_config(spec["buckets"]), self.replicas, spec.get("policy", "bucketed"),
                             borrowing=bool(spec.get("borrowing", True)), eps=float(spec.get("eps", 0.25)),
                             lend_max_load=float(spec.get("lend_max_load", 2)),
                             class_priority=spec.get("class_priority"),
                             borrow_penalty=int(spec.get("borrow_penalty", 20)),
                             use_priority=bool(spec.get("use_priority", True)))
        self.salt_prefix = spec.get("salt_prefix", "")
        self.log_path = Path(spec["log"]) if spec.get("log") else None
        self._log_buf: list[str] = []
        self.session: aiohttp.ClientSession | None = None
        self.fail_counts = {r.name: 0 for r in self.replicas}

    async def start(self, app: web.Application) -> None:
        self.session = aiohttp.ClientSession(connector=aiohttp.TCPConnector(limit=0),
                                             timeout=aiohttp.ClientTimeout(total=None, sock_read=900))
        app["poller"] = asyncio.create_task(self._poll())
        app["flusher"] = asyncio.create_task(self._flush_loop())

    async def stop(self, app: web.Application) -> None:
        for k in ("poller", "flusher"):
            app[k].cancel()
        self._flush()
        if self.session:
            await self.session.close()

    async def _poll(self) -> None:
        assert self.session is not None
        while True:
            for r in self.replicas:
                try:
                    async with self.session.get(r.url + "/metrics", timeout=aiohttp.ClientTimeout(total=1.0)) as resp:
                        text = await resp.text()
                    g = M.gauges(M.parse(text))
                    r.waiting, r.running, r.kv_usage = g["waiting"], g["running"], g["kv_usage"]
                    self.fail_counts[r.name] = 0
                    r.healthy = True
                except (aiohttp.ClientError, asyncio.TimeoutError, OSError):
                    self.fail_counts[r.name] += 1
                    if self.fail_counts[r.name] >= 8:
                        r.healthy = False
            await asyncio.sleep(0.25)

    async def _flush_loop(self) -> None:
        while True:
            await asyncio.sleep(2)
            self._flush()

    def _flush(self) -> None:
        if self.log_path and self._log_buf:
            with open(self.log_path, "a") as f:
                f.write("\n".join(self._log_buf) + "\n")
            self._log_buf.clear()

    async def handle(self, request: web.Request) -> web.StreamResponse:
        assert self.session is not None
        raw = await request.read()
        try:
            body = json.loads(raw)
        except json.JSONDecodeError:
            return web.json_response({"error": "invalid JSON"}, status=400)
        h = request.headers
        meta = Meta(app=h.get("x-tl-app", "default"), session=h.get("x-tl-session", ""),
                    cls=h.get("x-tl-class", "standard"),
                    prompt_tokens=int(h.get("x-tl-prompt-tokens") or 0),
                    max_tokens=int(h.get("x-tl-max-tokens") or body.get("max_tokens") or 256))
        t0 = time.perf_counter()
        try:
            choice = self.picker.pick(meta)
        except NoReplica as e:
            return web.json_response({"error": str(e)}, status=503)
        pick_us = int((time.perf_counter() - t0) * 1e6)
        if choice.priority is not None:
            body["priority"] = choice.priority
        if self.salt_prefix is not None and "cache_salt" not in body:
            body["cache_salt"] = f"{self.salt_prefix}:{meta.app}"
        rep = choice.replica
        rep.inflight += 1
        status = 0
        t_start = time.time()
        try:
            async with self.session.post(rep.url + "/v1/chat/completions", json=body) as up:
                status = up.status
                resp = web.StreamResponse(status=up.status, headers={
                    "Content-Type": up.headers.get("Content-Type", "application/json"),
                    "x-tl-replica": rep.name, "x-tl-bucket": choice.bucket,
                    "x-tl-borrowed": "1" if choice.borrowed else "0", "x-tl-pick-us": str(pick_us)})
                await resp.prepare(request)
                async for chunk in up.content.iter_any():
                    await resp.write(chunk)
                await resp.write_eof()
                return resp
        except (aiohttp.ClientError, asyncio.TimeoutError, OSError) as e:
            status = 502
            return web.json_response({"error": f"upstream {rep.name}: {e}"}, status=502)
        finally:
            rep.inflight -= 1
            self._log_buf.append(json.dumps({
                "t": t_start, "dur": time.time() - t_start, "app": meta.app, "cls": meta.cls,
                "prompt_tokens": meta.prompt_tokens, "max_tokens": meta.max_tokens,
                "bucket": choice.bucket, "replica": rep.name, "borrowed": choice.borrowed,
                "priority": choice.priority, "reason": choice.reason, "pick_us": pick_us, "status": status}))

    async def health(self, _request: web.Request) -> web.Response:
        return web.json_response({"ok": any(r.healthy for r in self.replicas)})

    async def stats(self, _request: web.Request) -> web.Response:
        return web.json_response({
            "policy": self.picker.policy, "counts": self.picker.counts,
            "replicas": [{"name": r.name, "inflight": r.inflight, "waiting": r.waiting, "running": r.running,
                          "kv_usage": r.kv_usage, "healthy": r.healthy, "home": sorted(r.home)}
                         for r in self.replicas]})


def make_app(spec: dict) -> web.Application:
    router = Router(spec)
    app = web.Application(client_max_size=256 * 1024 * 1024)
    app.on_startup.append(router.start)
    app.on_cleanup.append(router.stop)
    app.router.add_post("/v1/chat/completions", router.handle)
    app.router.add_get("/health", router.health)
    app.router.add_get("/stats", router.stats)
    return app


def main(argv: list[str] | None = None) -> None:
    ap = argparse.ArgumentParser(description="fast-lane picker router")
    ap.add_argument("--spec", required=True)
    ap.add_argument("--port", type=int, default=9000)
    ap.add_argument("--host", default="0.0.0.0")
    a = ap.parse_args(argv)
    spec = json.loads(Path(a.spec).read_text())
    web.run_app(make_app(spec), host=a.host, port=a.port, access_log=None, print=None)


if __name__ == "__main__":
    main()
