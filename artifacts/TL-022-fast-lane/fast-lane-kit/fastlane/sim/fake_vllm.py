"""A simulated vLLM server for dry runs: same HTTP surface, made-up physics.

Serves /health, /v1/models, /v1/chat/completions (streaming and not, with
usage, min_tokens, priority and cache_salt) and /metrics with vLLM's metric
names. A small engine loop does continuous batching: admission up to
max_num_seqs in priority order, chunked prefill, decode steps whose length
grows with batch size, and speculative acceptance drawn per step.

It exists to test the kit end to end without GPUs. Its numbers are not
predictions.
"""

from __future__ import annotations

import argparse
import asyncio
import hashlib
import heapq
import itertools
import json
import random
import re
import time

from aiohttp import web

WEIGHTS_GB = {"target_fp8": 31.0, "target_bf16": 62.0, "target_w4a16": 18.0, "small": 5.0}
ALPHA = {"eagle3": 0.68, "dflash": 0.74, "dspark": 0.76, "mtp": 0.70, "suffix": 0.35, "ngram": 0.30}
DRAFT_MS = {"eagle3": 0.35, "dflash": 0.12, "dspark": 0.12, "mtp": 0.40, "suffix": 0.02, "ngram": 0.02}
ACCURACY = {"target_fp8": 0.92, "target_bf16": 0.92, "target_w4a16": 0.90, "small": 0.62}
_MATH = re.compile(r"What is (\d+) \+ (\d+)\?")


class Seq:
    _ids = itertools.count()

    def __init__(self, prompt_tokens: int, cached: int, out_tokens: list[str], priority: int):
        self.id = next(self._ids)
        self.prefill_left = max(1, prompt_tokens - cached)
        self.out = out_tokens
        self.emitted = 0
        self.priority = priority
        self.started = False
        self.queue: asyncio.Queue = asyncio.Queue()
        self.arrival = time.perf_counter()

    @property
    def remaining(self) -> int:
        return len(self.out) - self.emitted


class Engine:
    def __init__(self, a: argparse.Namespace):
        self.a = a
        self.rng = random.Random(a.seed)
        self.waiting: list = []
        self.running: list[Seq] = []
        self.wake = asyncio.Event()
        self.counters = {"drafts": 0, "draft_tokens": 0, "accepted": 0, "queries": 0, "hits": 0,
                         "prompt": 0, "generation": 0}
        self.per_pos = [0] * max(1, a.k)
        self.seen_prefixes: set = set()

    def step_ms(self, batch: int) -> float:
        w = WEIGHTS_GB.get(self.a.model_kind, 31.0)
        t_mem = w / (3.35 * self.a.tp * 0.75)
        t_fixed = 3.0 + (4.0 if self.a.tp > 1 else 0.0)
        t = t_mem + t_fixed + 0.06 * batch
        if self.a.method != "none" and self.a.k > 0:
            t *= 1.0 + 0.03 * self.a.k
            t += DRAFT_MS.get(self.a.method, 0.3) * (1 if self.a.method in ("dflash", "dspark") else self.a.k)
            t *= 1.0 + 0.004 * batch * self.a.k
        return t

    def prefill_ms(self, tokens: int) -> float:
        w = WEIGHTS_GB.get(self.a.model_kind, 31.0)
        return tokens * 0.017 * (w / 31.0) * (8.0 / self.a.tp)

    def accepted(self) -> int:
        if self.a.method == "none" or self.a.k <= 0:
            return 0
        alpha = ALPHA.get(self.a.method, 0.6)
        n = 0
        while n < self.a.k and self.rng.random() < alpha:
            n += 1
        return n

    def submit(self, seq: Seq) -> None:
        heapq.heappush(self.waiting, (seq.priority, seq.arrival, seq.id, seq))
        self.wake.set()

    async def loop(self) -> None:
        while True:
            if not self.waiting and not self.running:
                self.wake.clear()
                await self.wake.wait()
                continue
            while self.waiting and len(self.running) < self.a.max_num_seqs:
                self.running.append(heapq.heappop(self.waiting)[3])
            budget = 8192
            prefill_tokens = 0
            for s in self.running:
                if s.prefill_left > 0 and budget > 0:
                    take = min(s.prefill_left, budget)
                    s.prefill_left -= take
                    budget -= take
                    prefill_tokens += take
            decoding = [s for s in self.running if s.started]
            dt = self.step_ms(len(decoding)) + self.prefill_ms(prefill_tokens)
            await asyncio.sleep(dt * self.a.time_scale / 1000.0)
            for s in decoding:
                acc = self.accepted()
                if self.a.method != "none" and self.a.k > 0:
                    self.counters["drafts"] += 1
                    self.counters["draft_tokens"] += self.a.k
                    self.counters["accepted"] += acc
                    for i in range(acc):
                        self.per_pos[i] += 1
                n = min(1 + acc, s.remaining)
                s.queue.put_nowait(s.out[s.emitted:s.emitted + n])
                s.emitted += n
            for s in self.running:
                if not s.started and s.prefill_left == 0:
                    s.started = True
                    s.queue.put_nowait(s.out[:1])
                    s.emitted = 1
            done = [s for s in self.running if s.started and s.remaining <= 0]
            for s in done:
                s.queue.put_nowait(None)
                self.counters["generation"] += len(s.out)
            self.running = [s for s in self.running if not (s.started and s.remaining <= 0)]


def count_tokens(messages: list[dict]) -> int:
    return sum(len(str(m.get("content", "")).split()) for m in messages) + 4 * len(messages) + 2


def make_output(a: argparse.Namespace, messages: list[dict], max_tokens: int, min_tokens: int) -> list[str]:
    text = " ".join(str(m.get("content", "")) for m in messages)
    seed = int(hashlib.sha1(text.encode()).hexdigest()[:8], 16)
    rng = random.Random(seed)
    m = _MATH.search(text)
    if m:
        right = int(m.group(1)) + int(m.group(2))
        ok = random.Random(f"{seed}-{a.model_kind}").random() < ACCURACY.get(a.model_kind, 0.9)
        words = [f"w{rng.randint(1, 999)}" for _ in range(rng.randint(10, 30))]
        return words + ["Answer:", str(right if ok else right + 1)]
    n = max_tokens if min_tokens >= max_tokens else max(1, min(max_tokens, int(max_tokens * rng.uniform(0.6, 1.4))))
    return [f"w{rng.randint(1, 999)}" for _ in range(n)]


def build_app(a: argparse.Namespace) -> web.Application:
    eng = Engine(a)
    app = web.Application(client_max_size=256 * 1024 * 1024)

    async def on_start(app_: web.Application) -> None:
        app_["engine_task"] = asyncio.create_task(eng.loop())

    async def on_stop(app_: web.Application) -> None:
        app_["engine_task"].cancel()

    async def health(_r: web.Request) -> web.Response:
        return web.Response(text="ok")

    async def models(_r: web.Request) -> web.Response:
        return web.json_response({"data": [{"id": a.served_name, "object": "model"}]})

    async def metrics(_r: web.Request) -> web.Response:
        c = eng.counters
        lines = [
            "# HELP vllm:num_requests_running Number of requests in model execution batches.",
            "# TYPE vllm:num_requests_running gauge",
            f'vllm:num_requests_running{{model_name="{a.served_name}"}} {len(eng.running)}',
            f'vllm:num_requests_waiting{{model_name="{a.served_name}"}} {len(eng.waiting)}',
            f'vllm:num_requests_waiting_by_reason{{model_name="{a.served_name}",reason="capacity"}} 0',
            f'vllm:kv_cache_usage_perc{{model_name="{a.served_name}"}} {min(1.0, len(eng.running) / max(1, a.max_num_seqs)):.3f}',
            f'vllm:prefix_cache_queries_total{{model_name="{a.served_name}"}} {c["queries"]}',
            f'vllm:prefix_cache_queries_created{{model_name="{a.served_name}"}} 1.7e9',
            f'vllm:prefix_cache_hits_total{{model_name="{a.served_name}"}} {c["hits"]}',
            f'vllm:prompt_tokens_total{{model_name="{a.served_name}"}} {c["prompt"]}',
            f'vllm:generation_tokens_total{{model_name="{a.served_name}"}} {c["generation"]}',
        ]
        if a.method != "none" and a.k > 0:
            lines += [
                f'vllm:spec_decode_num_drafts_total{{model_name="{a.served_name}"}} {c["drafts"]}',
                f'vllm:spec_decode_num_draft_tokens_total{{model_name="{a.served_name}"}} {c["draft_tokens"]}',
                f'vllm:spec_decode_num_accepted_tokens_total{{model_name="{a.served_name}"}} {c["accepted"]}',
            ]
            lines += [f'vllm:spec_decode_num_accepted_tokens_per_pos_total{{model_name="{a.served_name}",position="{i}"}} {v}'
                      for i, v in enumerate(eng.per_pos)]
        return web.Response(text="\n".join(lines) + "\n", content_type="text/plain")

    async def chat(request: web.Request) -> web.StreamResponse:
        body = await request.json()
        msgs = body.get("messages") or []
        max_tokens = int(body.get("max_tokens") or 256)
        min_tokens = int(body.get("min_tokens") or 0)
        prompt_tokens = count_tokens(msgs)
        system = next((str(m.get("content", "")) for m in msgs if m.get("role") == "system"), "")
        key = (body.get("cache_salt"), hashlib.sha1(system.encode()).hexdigest())
        cached = 0
        if system and key in eng.seen_prefixes:
            cached = len(system.split())
        eng.seen_prefixes.add(key)
        eng.counters["queries"] += prompt_tokens
        eng.counters["hits"] += cached
        eng.counters["prompt"] += prompt_tokens
        out = make_output(a, msgs, max_tokens, min_tokens)
        seq = Seq(prompt_tokens, cached, out, int(body.get("priority") or 0))
        eng.submit(seq)
        rid = f"chatcmpl-{seq.id}"
        usage = {"prompt_tokens": prompt_tokens, "completion_tokens": len(out),
                 "total_tokens": prompt_tokens + len(out)}
        if not body.get("stream"):
            parts = []
            while True:
                item = await seq.queue.get()
                if item is None:
                    break
                parts += item
            return web.json_response({"id": rid, "object": "chat.completion", "model": a.served_name,
                                      "choices": [{"index": 0, "message": {"role": "assistant",
                                                                          "content": " ".join(parts)},
                                                   "finish_reason": "length"}],
                                      "usage": usage})
        resp = web.StreamResponse(headers={"Content-Type": "text/event-stream"})
        await resp.prepare(request)

        async def send(obj: dict) -> None:
            await resp.write(b"data: " + json.dumps(obj).encode() + b"\n\n")

        await send({"id": rid, "choices": [{"index": 0, "delta": {"role": "assistant", "content": ""}}]})
        while True:
            item = await seq.queue.get()
            if item is None:
                break
            await send({"id": rid, "choices": [{"index": 0, "delta": {"content": " ".join(item) + " "}}]})
        await send({"id": rid, "choices": [{"index": 0, "delta": {}, "finish_reason": "length"}]})
        if (body.get("stream_options") or {}).get("include_usage"):
            await send({"id": rid, "choices": [], "usage": usage})
        await resp.write(b"data: [DONE]\n\n")
        await resp.write_eof()
        return resp

    app.on_startup.append(on_start)
    app.on_cleanup.append(on_stop)
    app.router.add_get("/health", health)
    app.router.add_get("/v1/models", models)
    app.router.add_get("/metrics", metrics)
    app.router.add_post("/v1/chat/completions", chat)
    return app


def main(argv: list[str] | None = None) -> None:
    ap = argparse.ArgumentParser(description="simulated vLLM server (dry runs only)")
    ap.add_argument("--port", type=int, required=True)
    ap.add_argument("--served-name", default="sim")
    ap.add_argument("--model-kind", default="target_fp8")
    ap.add_argument("--tp", type=int, default=8)
    ap.add_argument("--method", default="none")
    ap.add_argument("--k", type=int, default=0)
    ap.add_argument("--max-num-seqs", type=int, default=16)
    ap.add_argument("--time-scale", type=float, default=1.0)
    ap.add_argument("--seed", type=int, default=0)
    a = ap.parse_args(argv)
    web.run_app(build_app(a), host="127.0.0.1", port=a.port, access_log=None, print=None)


if __name__ == "__main__":
    main()
