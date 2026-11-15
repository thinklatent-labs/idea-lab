"""Train: our own draft models for Gemma 4 31B, by both routes (D-377), on public data.

Why on the 31B: the public drafters for the 31B are a known result, so
matching them proves the pipeline before it is pointed at the Core (H9).

  1. generate   Gemma 4 31B (BF16, TP2 x DP4) answers the training prompts
                (chat prompts plus 1,000 to 10,000-token document tasks).
                Training data must be the target's own replies.
  2. routes     speculators_eagle3 / speculators_dflash (vLLM Speculators):
                  launch_vllm.py serves hidden states on GPUs 0-3 (TP2 x DP2),
                  prepare-data renders and tokenises the conversations,
                  torchrun -m speculators.train trains online on GPUs 4-7.
                modelopt_eagle3 (NVIDIA Model Optimizer, NVIDIA's route):
                  launch_train.sh on all 8 GPUs, export_hf_checkpoint.py,
                  convert_to_vllm_ckpt.py for vLLM.
  3. evaluate   serve the FP8 target with each trained drafter and with its
                public counterpart on the same held-out prompts; compare
                tau and decode speed.

Commands follow the pinned Speculators and Model Optimizer commits in
config.versions (see scripts/setup.sh). Every command and its output is in
logs/train/. In a dry run the commands are logged, not executed.
"""

from __future__ import annotations

import os
import time
from pathlib import Path

from fastlane.client import Request, run_closed_loop
from fastlane.config import ad_hoc_profile, model_dir, profile, runtime_drafters
from fastlane.servers import ServerGroup, http_ok, run_logged, start_background, stop_background
from fastlane.stages.common import Ctx, record_failure, run_cell, warmup
from fastlane.util import LOG, read_json, read_jsonl, write_json, write_jsonl

PUBLIC_COUNTERPART = {"speculators_eagle3": "eagle3_redhat@3", "speculators_dflash": "dflash_redhat@8",
                      "modelopt_eagle3": "eagle3_redhat@3"}
METHOD = {"speculators_eagle3": "eagle3", "speculators_dflash": "dflash", "modelopt_eagle3": "eagle3"}


def run(ctx: Ctx) -> dict:
    cfg = ctx.cfg
    st = cfg.stage("train")
    routes = st.get("routes") or []
    if not routes:
        return {"status": "skipped"}
    work = cfg.path("work") / ctx.run_id / "train"
    work.mkdir(parents=True, exist_ok=True)
    tdir = ctx.sdir("train")
    timings = read_json(tdir / "timings.json", {}) or {}
    conv = work / "conversations.jsonl"
    if "generate" not in timings:
        t0 = time.time()
        n = generate(ctx, conv, st)
        timings["generate"] = {"seconds": time.time() - t0, "conversations": n}
        write_json(tdir / "timings.json", timings)
    status = {}
    for route in routes:
        if route in timings and timings[route].get("ok"):
            continue
        t0 = time.time()
        try:
            if route.startswith("speculators_"):
                ckpt = train_speculators(ctx, route.split("_", 1)[1], conv, work, st)
            elif route == "modelopt_eagle3":
                ckpt = train_modelopt(ctx, conv, work, st)
            else:
                raise ValueError(f"unknown route {route}")
            ok = ckpt is not None
            if ok:
                register(ctx, route, ckpt)
            timings[route] = {"seconds": time.time() - t0, "ok": ok, "checkpoint": str(ckpt) if ckpt else None}
        except Exception as e:
            LOG.exception("train route %s failed", route)
            timings[route] = {"seconds": time.time() - t0, "ok": False, "error": str(e)[-2000:]}
        write_json(tdir / "timings.json", timings)
        status[route] = timings[route].get("ok")
    evaluate(ctx, routes, st)
    return {"status": "ok" if all(status.values()) else "partial", "routes": status}


# ------------------------------------------------------------------------ 1. generate

def generate(ctx: Ctx, conv: Path, st: dict) -> int:
    cfg = ctx.cfg
    prompts = list(read_jsonl(ctx.lib.train_prompts_path()))[: int(st.get("samples", 20000))]
    have = {r["id"] for r in read_jsonl(conv)} if conv.exists() else set()
    todo = [p for p in prompts if p["id"] not in have]
    LOG.info("train: generating replies for %d prompts (%d already done)", len(todo), len(have))
    if not todo:
        return len(have)
    prof = profile(cfg, st.get("generator_profile", "gen_bf16_dp4"), ctx.run_dir)
    group = ServerGroup(cfg, prof, ctx.log_dir("train"))
    try:
        if not group.start():
            raise RuntimeError(f"generator failed to start: {group.error}")
        batch = int(st.get("generate_batch", 2000))
        for i in range(0, len(todo), batch):
            chunk = todo[i:i + batch]
            reqs = [Request(rid=p["id"], messages=p["messages"], max_tokens=int(st.get("max_new_tokens", 2048)),
                            temperature=float(st.get("generate_temperature", 0.0)), cache_salt="train-gen")
                    for p in chunk]
            results, _ = run_closed_loop(group.urls, group.served_name, reqs, int(st.get("generate_concurrency", 256)),
                                         stream=False, req_cfg=ctx.req_cfg, timeout_s=ctx.timeout_s, keep_text=True)
            by = {p["id"]: p for p in chunk}
            rows = [{"id": r["rid"], "conversations": by[r["rid"]]["messages"] +
                     [{"role": "assistant", "content": r["text"]}]}
                    for r in results if r.get("ok") and (r.get("text") or "").strip()]
            write_jsonl(conv, rows, append=True)
            LOG.info("train: %d/%d replies written", len(have) + i + len(chunk), len(prompts))
    finally:
        group.stop()
    return sum(1 for _ in read_jsonl(conv))


# ------------------------------------------------------------------------ 2a. Speculators

def train_speculators(ctx: Ctx, kind: str, conv: Path, work: Path, st: dict) -> Path | None:
    cfg = ctx.cfg
    repo = cfg.path("repos") / "speculators"
    target = model_dir(cfg, "target_bf16")
    seq = int(st.get("seq_length", 12288))
    layers = [str(x) for x in (st.get("layer_ids") or {}).get(kind) or []]
    hs_dir, prep, ckpt = work / f"hs_{kind}", work / "prepared", work / f"ckpt_{kind}"
    logs = ctx.log_dir("train")
    port = int(cfg["hardware"].get("base_port", 8100)) + 100
    env_hs = dict(os.environ, CUDA_VISIBLE_DEVICES="0,1,2,3")
    argv = [cfg.env_bin("hs", "python"), repo / "scripts" / "launch_vllm.py", target,
            "--hidden-states-path", hs_dir]
    if layers:
        argv += ["--target-layer-ids", *layers]
    argv += ["--", "--port", str(port), "--tensor-parallel-size", "2", "--data-parallel-size", "2",
             "--max-model-len", str(seq + 1024), "--gpu-memory-utilization", "0.85"]
    server = None
    try:
        if cfg.dry_run:
            run_logged(argv, logs / f"hs_server_{kind}.log", dry_run=True)
        else:
            server = start_background(argv, logs / f"hs_server_{kind}.log", env=env_hs, cwd=repo / "scripts")
            t0 = time.time()
            while not http_ok(f"http://127.0.0.1:{port}/health"):
                if server.poll() is not None:
                    raise RuntimeError(f"hidden-states server exited ({server.returncode}); see logs/train")
                if time.time() - t0 > 3600:
                    raise RuntimeError("hidden-states server did not become healthy in an hour")
                time.sleep(10)
        if not (prep / "PREPARED").exists():
            rc = run_logged([cfg.env_bin("train", "speculators"), "prepare-data", "--model", target,
                             "--data", conv, "--render-endpoint", f"http://127.0.0.1:{port}",
                             "--output", prep, "--seq-length", str(seq), "--no-skip-token-freq",
                             "--max-samples", str(int(st.get("samples", 20000)))],
                            logs / "prepare_data.log", dry_run=cfg.dry_run, timeout=6 * 3600)
            if rc != 0:
                raise RuntimeError(f"prepare-data failed ({rc}); see logs/train/prepare_data.log")
            prep.mkdir(parents=True, exist_ok=True)
            (prep / "PREPARED").write_text("ok\n")
        lr = (st.get("lr") or {}).get(kind, 1e-4)
        targs = [cfg.env_bin("train", "torchrun"), "--standalone", "--nproc_per_node", "4", "-m",
                 "speculators.train", "--verifier-name-or-path", target, "--data-path", prep,
                 "--vllm-endpoint", f"http://127.0.0.1:{port}/v1", "--on-missing", "generate",
                 "--hidden-states-path", hs_dir, "--save-path", ckpt, "--draft-vocab-size",
                 str(st.get("draft_vocab_size", 32000)), "--epochs", str(st.get("epochs", 3)), "--lr", str(lr),
                 "--total-seq-len", str(seq), "--speculator-type", kind, "--scheduler-type", "cosine",
                 "--save-best"]
        if layers:
            targs += ["--target-layer-ids", *layers]
        if kind == "dflash":
            targs += ["--num-layers", "5", "--max-anchors", "3072", "--draft-hidden-act", "silu"]
        targs += [str(x) for x in (st.get("extra_train_args") or {}).get(kind, [])]
        env_tr = dict(os.environ, CUDA_VISIBLE_DEVICES="4,5,6,7")
        rc = run_logged(targs, logs / f"train_{kind}.log", env=env_tr, dry_run=cfg.dry_run,
                        timeout=float(st.get("timeout_h", 30)) * 3600)
        if rc != 0:
            raise RuntimeError(f"speculators train failed ({rc}); see logs/train/train_{kind}.log")
    finally:
        stop_background(server, grace=60)
    best = ckpt / "checkpoint_best"
    if cfg.dry_run:
        best.mkdir(parents=True, exist_ok=True)
        (best / "config.json").write_text('{"dry_run": true}\n')
    if best.exists():
        return best
    epochs = sorted((p for p in ckpt.glob("[0-9]*") if p.is_dir()), key=lambda p: int(p.name))
    return epochs[-1] if epochs else None


# ------------------------------------------------------------------------ 2b. Model Optimizer

def train_modelopt(ctx: Ctx, conv: Path, work: Path, st: dict) -> Path | None:
    cfg = ctx.cfg
    ex = cfg.path("repos") / "Model-Optimizer" / "examples" / "speculative_decoding"
    target = model_dir(cfg, "target_bf16")
    out, exp, vck = work / "modelopt_out", work / "modelopt_export", work / "modelopt_vllm"
    logs = ctx.log_dir("train")
    mo = st.get("modelopt") or {}
    venv_bin = str(Path(cfg["envs"]["modelopt"]) / "bin")
    env = dict(os.environ, CUDA_VISIBLE_DEVICES="0,1,2,3,4,5,6,7", PATH=venv_bin + os.pathsep + os.environ.get("PATH", ""),
               VIRTUAL_ENV=str(Path(cfg["envs"]["modelopt"])))
    steps = [
        (["bash", "launch_train.sh", "--config", "../../modelopt_recipes/general/speculative_decoding/eagle3.yaml",
          f"model.model_name_or_path={target}", f"data.data_path={conv}", f"training.output_dir={out}",
          f"training.num_train_epochs={st.get('epochs', 3)}",
          f"training.training_seq_len={mo.get('training_seq_len', 8192)}",
          f"training.learning_rate={mo.get('learning_rate', 1e-4)}",
          # cp_size > 1 makes main.py shard with FSDP (full_shard): the 31B base does not fit
          # unsharded beside the draft at long sequence lengths
          f"training.cp_size={mo.get('cp_size', 2)}"], "modelopt_train.log",
         float(st.get("timeout_h", 30)) * 3600),
        ([cfg.env_bin("modelopt", "python"), "scripts/export_hf_checkpoint.py", "--model_path", out,
          "--export_path", exp], "modelopt_export.log", 3600),
        ([cfg.env_bin("modelopt", "python"), "scripts/convert_to_vllm_ckpt.py", "--input", exp, "--verifier", target,
          "--output", vck], "modelopt_convert.log", 3600),
    ]
    for argv, log, timeout in steps:
        rc = run_logged(argv, logs / log, env=env, cwd=ex, dry_run=cfg.dry_run, timeout=timeout)
        if rc != 0:
            raise RuntimeError(f"Model Optimizer step failed ({rc}); see logs/train/{log}")
    if cfg.dry_run:
        vck.mkdir(parents=True, exist_ok=True)
        (vck / "config.json").write_text('{"dry_run": true}\n')
    return vck if vck.exists() else None


def register(ctx: Ctx, route: str, ckpt: Path) -> None:
    rt = runtime_drafters(ctx.run_dir)
    k = int(PUBLIC_COUNTERPART[route].split("@")[1])
    rt.setdefault("trained", {})[f"trained_{route}"] = {"path": str(ckpt), "method": METHOD[route], "k": k,
                                                        "route": route}
    write_json(ctx.run_dir / "drafters.json", rt)


# ------------------------------------------------------------------------ 3. evaluate

def evaluate(ctx: Ctx, routes: list[str], st: dict) -> list[dict]:
    cfg = ctx.cfg
    ev = st.get("eval") or {}
    out_dir = ctx.sdir("train")
    trained = (runtime_drafters(ctx.run_dir).get("trained") or {})
    specs = []
    for route in routes:
        name = f"trained_{route}"
        if name in trained:
            specs.append((f"{name}@{trained[name]['k']}", route, "ours"))
            specs.append((PUBLIC_COUNTERPART[route], route, "public"))
    seen, rows = set(), []
    for spec, route, kind in specs:
        if spec in seen:
            continue
        seen.add(spec)
        prof = ad_hoc_profile(cfg, model="target_fp8", tp=8, replicas=1, drafter=spec, mode="latency",
                              name=f"traineval_{spec.replace('@', 'k')}", run_dir=ctx.run_dir)
        keys = [(L, o, f"eval__{spec.replace('@', 'k')}__in{L}__out{o}") for L in ev.get("inputs", [2000, 8000])
                for o in ev.get("outputs", [300])]
        if all(read_json(out_dir / f"{k}.json") for _, _, k in keys):
            rows += [read_json(out_dir / f"{k}.json") for _, _, k in keys]
            continue
        group = ServerGroup(cfg, prof, ctx.log_dir("train"))
        try:
            if not group.start():
                record_failure(out_dir, prof["name"], group.error)
                continue
            warmup(ctx, group)
            for L, o, key in keys:
                reqs = ctx.lib.cell_requests(L, o, int(ev.get("requests", 24)), cell_id=f"traineval-in{L}-out{o}",
                                             temperature=0.0, fixed_length=ctx.fixed_length)
                rows.append(run_cell(ctx, group.urls[0], group.served_name, reqs, 1, out_dir=out_dir, key=key,
                                     meta={"stage": "train-eval", "profile": prof["name"], "drafter": spec,
                                           "route": route, "kind": kind, "L": L, "out": o, "temperature": 0.0}))
        finally:
            group.stop()
    return rows
