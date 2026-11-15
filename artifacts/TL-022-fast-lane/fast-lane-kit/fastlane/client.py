"""Load generator for OpenAI-compatible chat endpoints (vLLM, the picker, the simulator).

Two ways to drive load:
  closed loop: N workers each send their next request as soon as the last one
               finishes (fixed concurrency; used by the grid and layouts);
  open loop:   requests leave on a schedule (Poisson arrivals) whatever the
               server's state (used by the mixed-traffic load tests).

Every request is timed on the client: time to first token, end to end, decode
speed after the first token, tokens per streamed chunk (about the accepted
tokens per step with speculative decoding), and the replica that answered when
the picker reports it.
"""

from __future__ import annotations

import asyncio
import hashlib
import json
import math
import time
from concurrent.futures import ProcessPoolExecutor
from dataclasses import asdict, dataclass, field

import aiohttp

from fastlane.util import percentile, summarize


@dataclass
class Request:
    rid: str
    messages: list
    max_tokens: int
    min_tokens: int = 0
    temperature: float = 0.0
    headers: dict = field(default_factory=dict)
    cache_salt: str | None = None
    priority: int | None = None
    meta: dict = field(default_factory=dict)
    extra: dict = field(default_factory=dict)


def request_body(req: Request, model: str, stream: bool, req_cfg: dict) -> dict:
    body: dict = {
        "model": model,
        "messages": req.messages,
        "max_tokens": int(req.max_tokens),
        "temperature": float(req.temperature),
        "stream": stream,
    }
    if stream:
        body["stream_options"] = {"include_usage": True}
    if req.min_tokens:
        body["min_tokens"] = int(req.min_tokens)
    if req.cache_salt:
        body["cache_salt"] = req.cache_salt
    if req.priority is not None:
        body["priority"] = int(req.priority)
    ctk = (req_cfg or {}).get("chat_template_kwargs")
    if ctk:
        body["chat_template_kwargs"] = ctk
    body.update(req.extra or {})
    return body


async def send(session: aiohttp.ClientSession, base_url: str, model: str, req: Request, *,
               stream: bool = True, req_cfg: dict | None = None, keep_text: bool = False,
               t_origin: float | None = None) -> dict:
    """Send one chat completion and time it. Never raises; errors are in the result."""
    body = request_body(req, model, stream, req_cfg or {})
    res: dict = {"rid": req.rid, "url": base_url, "ok": False, "status": None, "error": None,
                 "meta": req.meta, "max_tokens": req.max_tokens}
    t0 = time.perf_counter()
    if t_origin is not None:
        res["t_start"] = t0 - t_origin
    first = last = None
    gaps: list[float] = []
    chunks = 0
    parts: list[str] = []
    usage = None
    try:
        async with session.post(base_url.rstrip("/") + "/v1/chat/completions", json=body,
                                headers=req.headers or None) as resp:
            res["status"] = resp.status
            for h, k in (("x-tl-replica", "replica"), ("x-tl-bucket", "bucket"),
                         ("x-tl-borrowed", "borrowed"), ("x-tl-pick-us", "pick_us")):
                if h in resp.headers:
                    res[k] = resp.headers[h]
            if resp.status != 200:
                res["error"] = (await resp.text())[:500]
                return res
            if stream:
                async for raw in resp.content:
                    line = raw.strip()
                    if not line.startswith(b"data:"):
                        continue
                    data = line[5:].strip()
                    if data == b"[DONE]":
                        break
                    try:
                        obj = json.loads(data)
                    except json.JSONDecodeError:
                        continue
                    if obj.get("usage"):
                        usage = obj["usage"]
                    choices = obj.get("choices") or []
                    if not choices:
                        continue
                    delta = choices[0].get("delta") or {}
                    piece = delta.get("content") or delta.get("reasoning_content") or delta.get("reasoning") or ""
                    if piece:
                        now = time.perf_counter()
                        if first is None:
                            first = now
                        else:
                            gaps.append(now - last)  # type: ignore[operator]
                        last = now
                        chunks += 1
                        parts.append(piece)
            else:
                obj = await resp.json(content_type=None)
                usage = obj.get("usage")
                msg = (obj.get("choices") or [{}])[0].get("message") or {}
                parts.append(msg.get("content") or "")
                first = last = time.perf_counter()
                chunks = 1
    except (aiohttp.ClientError, asyncio.TimeoutError, OSError) as e:
        res["error"] = f"{type(e).__name__}: {e}"[:500]
        res["e2e"] = time.perf_counter() - t0
        return res
    t_end = time.perf_counter()
    text = "".join(parts)
    res["ok"] = True
    res["e2e"] = t_end - t0
    if first is not None:
        res["ttft"] = first - t0
    if usage:
        res["prompt_tokens"] = usage.get("prompt_tokens")
        res["completion_tokens"] = usage.get("completion_tokens")
        details = usage.get("prompt_tokens_details") or {}
        if details.get("cached_tokens") is not None:
            res["cached_tokens"] = details.get("cached_tokens")
    ct = res.get("completion_tokens")
    res["chunks"] = chunks
    if stream and ct and chunks:
        res["tokens_per_chunk"] = ct / chunks
    if stream and ct and ct > 1 and first is not None and last is not None and last > first:
        res["decode_tps"] = (ct - 1) / (last - first)
    if gaps:
        res["itl_p50"] = percentile(gaps, 50)
        res["itl_p95"] = percentile(gaps, 95)
    res["text_sha1"] = hashlib.sha1(text.encode("utf-8", "replace")).hexdigest()
    if keep_text:
        res["text"] = text
    return res


def _session(timeout_s: float) -> aiohttp.ClientSession:
    conn = aiohttp.TCPConnector(limit=0, ttl_dns_cache=300, keepalive_timeout=60)
    return aiohttp.ClientSession(connector=conn, timeout=aiohttp.ClientTimeout(total=timeout_s))


async def closed_loop(urls: list[str], model: str, requests: list[Request], concurrency: int, *,
                      stream: bool = True, req_cfg: dict | None = None, timeout_s: float = 900,
                      keep_text: bool = False, bind_workers: bool = False) -> tuple[list[dict], float]:
    """Fixed concurrency. With bind_workers, worker w always uses urls[w % len(urls)]
    (even per-replica concurrency); otherwise request i goes to urls[i % len(urls)]."""
    queue: asyncio.Queue = asyncio.Queue()
    for i, r in enumerate(requests):
        queue.put_nowait((i, r))
    results: list[dict | None] = [None] * len(requests)
    t_origin = time.perf_counter()
    async with _session(timeout_s) as s:
        async def worker(w: int) -> None:
            while True:
                try:
                    i, r = queue.get_nowait()
                except asyncio.QueueEmpty:
                    return
                url = urls[w % len(urls)] if bind_workers else urls[i % len(urls)]
                res = await send(s, url, model, r, stream=stream, req_cfg=req_cfg, keep_text=keep_text,
                                 t_origin=t_origin)
                res["worker"] = w
                results[i] = res

        n = max(1, min(concurrency, len(requests)))
        await asyncio.gather(*(worker(w) for w in range(n)))
    wall = time.perf_counter() - t_origin
    return [r for r in results if r is not None], wall


def _closed_loop_proc(args: tuple) -> tuple[list[dict], float]:
    urls, model, reqs, conc, stream, req_cfg, timeout_s, keep_text, bind = args
    reqs = [Request(**r) for r in reqs]
    return asyncio.run(closed_loop(urls, model, reqs, conc, stream=stream, req_cfg=req_cfg,
                                   timeout_s=timeout_s, keep_text=keep_text, bind_workers=bind))


def run_closed_loop(urls: list[str], model: str, requests: list[Request], concurrency: int, *,
                    stream: bool = True, req_cfg: dict | None = None, timeout_s: float = 900,
                    keep_text: bool = False, bind_workers: bool = False, procs: int = 1) -> tuple[list[dict], float]:
    """Synchronous wrapper. procs > 1 shards the load across processes (for hundreds in flight)."""
    procs = max(1, min(procs, concurrency, len(requests)))
    if procs == 1:
        return asyncio.run(closed_loop(urls, model, requests, concurrency, stream=stream, req_cfg=req_cfg,
                                       timeout_s=timeout_s, keep_text=keep_text, bind_workers=bind_workers))
    shards = []
    for p in range(procs):
        sub = [asdict(r) for r in requests[p::procs]]
        conc = concurrency // procs + (1 if p < concurrency % procs else 0)
        # keep each shard's url binding aligned with the global worker index
        shard_urls = urls[p % len(urls):] + urls[:p % len(urls)] if bind_workers else urls
        shards.append((shard_urls, model, sub, max(1, conc), stream, req_cfg, timeout_s, keep_text, bind_workers))
    results: list[dict] = []
    walls = []
    with ProcessPoolExecutor(max_workers=procs) as ex:
        for res, wall in ex.map(_closed_loop_proc, shards):
            results.extend(res)
            walls.append(wall)
    return results, max(walls) if walls else 0.0


async def open_loop(url: str, model: str, schedule: list[tuple[float, Request]], *,
                    stream: bool = True, req_cfg: dict | None = None, timeout_s: float = 900,
                    max_inflight: int = 4096) -> tuple[list[dict], float]:
    """Send each request at its scheduled offset (seconds from start)."""
    sem = asyncio.Semaphore(max_inflight)
    t_origin = time.perf_counter()
    async with _session(timeout_s) as s:
        async def one(t_sched: float, r: Request) -> dict:
            async with sem:
                res = await send(s, url, model, r, stream=stream, req_cfg=req_cfg, t_origin=t_origin)
                res["t_sched"] = t_sched
                res["lag"] = res.get("t_start", t_sched) - t_sched
                return res

        tasks = []
        for t_sched, r in sorted(schedule, key=lambda x: x[0]):
            delay = t_origin + t_sched - time.perf_counter()
            if delay > 0:
                await asyncio.sleep(delay)
            tasks.append(asyncio.create_task(one(t_sched, r)))
        results = await asyncio.gather(*tasks)
    return list(results), time.perf_counter() - t_origin


def run_open_loop(url: str, model: str, schedule: list[tuple[float, Request]], **kw) -> tuple[list[dict], float]:
    return asyncio.run(open_loop(url, model, schedule, **kw))


# ---------------------------------------------------------------- summaries

def trimmed(results: list[dict], concurrency: int) -> list[dict]:
    """Drop the first round of a closed-loop run (the synchronised start burst)."""
    ok = [r for r in results if r.get("ok")]
    ok.sort(key=lambda r: (r.get("t_start", 0) + r.get("e2e", 0)))
    drop = min(max(concurrency - 1, 0), len(ok) // 4)
    return ok[drop:] if len(ok) - drop >= 3 else ok


def summarize_results(results: list[dict], wall: float, concurrency: int | None = None) -> dict:
    ok = [r for r in results if r.get("ok")]
    use = trimmed(results, concurrency) if concurrency else ok
    out = {
        "requests": len(results),
        "ok": len(ok),
        "errors": len(results) - len(ok),
        "error_sample": next((r.get("error") for r in results if not r.get("ok")), None),
        "measured": len(use),
        "wall_s": wall,
        "ttft": summarize(r.get("ttft") for r in use),
        "e2e": summarize(r.get("e2e") for r in use),
        "decode_tps": summarize(r.get("decode_tps") for r in use),
        "tokens_per_chunk": summarize(r.get("tokens_per_chunk") for r in use),
        "prompt_tokens_mean": _mean(r.get("prompt_tokens") for r in ok),
        "completion_tokens_mean": _mean(r.get("completion_tokens") for r in ok),
    }
    tot_out = sum((r.get("completion_tokens") or 0) for r in ok)
    tot_in = sum((r.get("prompt_tokens") or 0) for r in ok)
    if wall > 0:
        out["output_tps_total"] = tot_out / wall
        out["input_tps_total"] = tot_in / wall
    return out


def _mean(values) -> float | None:
    xs = [float(v) for v in values if v is not None]
    return sum(xs) / len(xs) if xs else None


def poisson_times(rate: float, duration_s: float, rng) -> list[float]:
    """Arrival offsets of a Poisson process with the given rate (per second)."""
    t = 0.0
    out = []
    if rate <= 0:
        return out
    while True:
        t += -math.log(1.0 - rng.random()) / rate
        if t >= duration_s:
            return out
        out.append(t)
