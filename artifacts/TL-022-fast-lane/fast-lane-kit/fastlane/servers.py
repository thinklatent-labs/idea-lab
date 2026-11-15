"""vLLM replica lifecycle: build the command, start each replica on its GPU slice,
wait until every replica is healthy, and stop them cleanly.

A profile (config.profiles) says: which model, tensor-parallel size, how many
replicas, which drafter and which scheduler mode. Replica i gets GPUs
[i*tp*dp, (i+1)*tp*dp) on its node. In a dry run every replica is a simulated
server (fastlane.sim.fake_vllm) with the same HTTP surface.

If a server fails to start, the group retries once without the optional flags
(serving.optional_flags) and records that, so a flag the installed vLLM does
not accept never costs a whole stage.
"""

from __future__ import annotations

import atexit
import json
import os
import signal
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path

from fastlane.config import Config, model_dir
from fastlane.util import LOG

_LIVE: set[subprocess.Popen] = set()


def _terminate(p: subprocess.Popen, grace: float = 60.0) -> None:
    if p.poll() is not None:
        _LIVE.discard(p)
        return
    try:
        os.killpg(p.pid, signal.SIGTERM)
    except (ProcessLookupError, PermissionError):
        pass
    try:
        p.wait(timeout=grace)
    except subprocess.TimeoutExpired:
        try:
            os.killpg(p.pid, signal.SIGKILL)
        except (ProcessLookupError, PermissionError):
            pass
        try:
            p.wait(timeout=30)
        except subprocess.TimeoutExpired:
            LOG.error("process %s did not exit after SIGKILL", p.pid)
    _LIVE.discard(p)


def stop_everything() -> None:
    for p in list(_LIVE):
        _terminate(p, grace=15)


atexit.register(stop_everything)


def install_signal_handlers() -> None:
    """On SIGTERM (Slurm time limit), SIGINT or SIGUSR1, stop every server we started."""
    def handler(signum, _frame):
        LOG.warning("received signal %s: stopping servers and exiting", signum)
        stop_everything()
        sys.exit(128 + signum)

    for s in (signal.SIGTERM, signal.SIGINT, signal.SIGUSR1):
        try:
            signal.signal(s, handler)
        except (ValueError, OSError):
            pass


def node_hosts() -> list[str]:
    """Hostnames of the Slurm allocation, or this host."""
    nodelist = os.environ.get("SLURM_JOB_NODELIST")
    if nodelist:
        try:
            out = subprocess.run(["scontrol", "show", "hostnames", nodelist],
                                 capture_output=True, text=True, check=True, timeout=30)
            hosts = [h.strip() for h in out.stdout.splitlines() if h.strip()]
            if hosts:
                return hosts
        except (OSError, subprocess.SubprocessError):
            pass
    return [socket.gethostname()]


def port_free(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            s.bind(("0.0.0.0", port))
            return True
        except OSError:
            return False


def http_ok(url: str, timeout: float = 3.0) -> bool:
    try:
        with urllib.request.urlopen(url, timeout=timeout) as r:
            return r.status == 200
    except (urllib.error.URLError, OSError, ValueError):
        return False


def tail(path: Path, n: int = 40) -> str:
    try:
        lines = Path(path).read_text(errors="replace").splitlines()
        return "\n".join(lines[-n:])
    except OSError:
        return ""


@dataclass
class Replica:
    index: int
    node: int
    host: str
    gpus: list[int]
    port: int
    log_path: Path
    argv: list[str] = field(default_factory=list)
    env: dict = field(default_factory=dict)
    proc: subprocess.Popen | None = None

    @property
    def url(self) -> str:
        return f"http://{self.host}:{self.port}"


def vllm_argv(cfg: Config, prof: dict, port: int, *, drop_optional: bool = False) -> list[str]:
    s = cfg["serving"]
    m = cfg["models"][prof["model"]]
    mode = s["modes"][prof.get("mode", "latency")]
    argv = [
        cfg.env_bin(prof.get("venv", "serve"), "vllm"), "serve", str(model_dir(cfg, prof["model"])),
        "--served-model-name", m["served_name"],
        "--host", "0.0.0.0", "--port", str(port),
        "--tensor-parallel-size", str(prof["tp"]),
        "--max-model-len", str(prof.get("max_model_len", s["max_model_len"])),
        "--gpu-memory-utilization", str(prof.get("gpu_memory_utilization", s["gpu_memory_utilization"])),
        "--max-num-seqs", str(prof.get("max_num_seqs", mode["max_num_seqs"])),
        "--max-num-batched-tokens", str(mode["max_num_batched_tokens"]),
    ]
    if mode.get("long_prefill_token_threshold"):
        argv += ["--long-prefill-token-threshold", str(mode["long_prefill_token_threshold"])]
    if int(prof.get("dp", 1)) > 1:
        argv += ["--data-parallel-size", str(prof["dp"])]
    argv += [str(x) for x in s.get("base_flags", [])]
    argv += [str(x) for x in m.get("extra_flags", [])]
    d = prof.get("drafter")
    if d:
        spec = {"method": d["method"], "num_speculative_tokens": int(d["k"])}
        if d.get("dir"):
            spec["model"] = d["dir"]
        spec.update(d.get("spec_extra") or {})
        argv += ["--speculative-config", json.dumps(spec)]
        argv += [str(x) for x in d.get("server_flags") or []]
    argv += [str(x) for x in prof.get("extra_flags") or []]
    if not drop_optional:
        argv += [str(x) for x in s.get("optional_flags") or []]
    return argv


def sim_argv(cfg: Config, prof: dict, port: int, index: int) -> list[str]:
    s = cfg["serving"]
    mode = s["modes"][prof.get("mode", "latency")]
    d = prof.get("drafter") or {}
    sim = cfg.get("sim", {})
    return [
        sys.executable, "-m", "fastlane.sim.fake_vllm",
        "--port", str(port),
        "--served-name", cfg["models"][prof["model"]]["served_name"],
        "--model-kind", prof["model"],
        "--tp", str(prof["tp"]),
        "--method", d.get("method") or "none",
        "--k", str(d.get("k") or 0),
        "--max-num-seqs", str(prof.get("max_num_seqs", mode["max_num_seqs"])),
        "--time-scale", str(sim.get("time_scale", 1.0)),
        "--seed", str(index),
    ]


class ServerGroup:
    """All replicas of one profile. Use as a context manager."""

    def __init__(self, cfg: Config, prof: dict, log_dir: Path, *, port_base: int | None = None,
                 first_gpu: int = 0, nodes: list[str] | None = None):
        self.cfg = cfg
        self.prof = prof
        self.log_dir = Path(log_dir)
        self.port_base = port_base or int(cfg["hardware"].get("base_port", 8100))
        self.first_gpu = first_gpu
        self.nodes = nodes or [node_hosts()[0]]
        self.replicas: list[Replica] = []
        self.ok = False
        self.error: str | None = None
        self.optional_flags_used = True
        self.started_s: float | None = None
        self.served_name = cfg["models"][prof["model"]]["served_name"]

    # ------------------------------------------------------------------ layout
    def _layout(self) -> list[tuple[int, list[int]]]:
        per = int(self.prof["gpus_per_replica"])
        gpn = int(self.cfg["hardware"]["gpus_per_node"])
        per_node = max(1, (gpn - self.first_gpu) // per)
        out = []
        for i in range(int(self.prof["replicas"])):
            node = i // per_node
            slot = i % per_node
            start = self.first_gpu + slot * per
            out.append((node, list(range(start, start + per))))
        if out and out[-1][0] >= len(self.nodes):
            raise RuntimeError(
                f"profile {self.prof['name']} needs {out[-1][0] + 1} node(s); allocation has {len(self.nodes)}")
        return out

    @property
    def urls(self) -> list[str]:
        return [r.url for r in self.replicas]

    # ------------------------------------------------------------------ start / stop
    def _launch(self, drop_optional: bool) -> None:
        self.replicas = []
        self.log_dir.mkdir(parents=True, exist_ok=True)
        local_host = "127.0.0.1"
        port = self.port_base
        for i, (node, gpus) in enumerate(self._layout()):
            while node == 0 and not self.cfg.dry_run and not port_free(port):
                port += 1
            if self.cfg.dry_run:
                while not port_free(port):
                    port += 1
            remote = node > 0 and not self.cfg.dry_run
            host = self.nodes[node] if remote else local_host
            argv = (sim_argv(self.cfg, self.prof, port, i) if self.cfg.dry_run
                    else vllm_argv(self.cfg, self.prof, port, drop_optional=drop_optional))
            env = dict(os.environ)
            env.update({k: str(v) for k, v in (self.cfg["serving"].get("env") or {}).items()})
            env["CUDA_VISIBLE_DEVICES"] = ",".join(str(g) for g in gpus)
            if remote:
                argv = ["srun", "--overlap", "--nodes=1", "--ntasks=1", "-w", host, "--export=ALL",
                        "env", f"CUDA_VISIBLE_DEVICES={env['CUDA_VISIBLE_DEVICES']}"] + argv
            log_path = self.log_dir / f"{self.prof['name']}.r{i}.log"
            rep = Replica(index=i, node=node, host=host, gpus=gpus, port=port, log_path=log_path,
                          argv=argv, env=env)
            with open(log_path, "ab") as lf:
                lf.write(("\n# " + " ".join(argv) + "\n").encode())
                lf.flush()
                rep.proc = subprocess.Popen(argv, stdout=lf, stderr=subprocess.STDOUT, env=env,
                                            start_new_session=True)
            _LIVE.add(rep.proc)
            self.replicas.append(rep)
            LOG.info("started %s replica %d on %s GPUs %s port %d (pid %d)", self.prof["name"], i,
                     host, gpus, port, rep.proc.pid)
            port += 1
            if not self.cfg.dry_run and i + 1 < int(self.prof["replicas"]):
                time.sleep(5)  # stagger startups so torch.distributed port picks do not race

    def _wait(self) -> tuple[bool, str | None]:
        timeout = float(self.prof.get("startup_timeout_s", self.cfg["serving"].get("startup_timeout_s", 2400)))
        if self.cfg.dry_run:
            timeout = min(timeout, 60)
        deadline = time.time() + timeout
        pending = set(range(len(self.replicas)))
        while pending and time.time() < deadline:
            for i in list(pending):
                rep = self.replicas[i]
                if rep.proc is not None and rep.proc.poll() is not None:
                    return False, f"replica {i} exited with code {rep.proc.returncode}:\n{tail(rep.log_path)}"
                if http_ok(rep.url + "/health"):
                    pending.discard(i)
            if pending:
                time.sleep(0.2 if self.cfg.dry_run else 5)
        if pending:
            return False, f"timed out after {timeout:.0f}s waiting for replicas {sorted(pending)}"
        return True, None

    def start(self) -> bool:
        t0 = time.time()
        attempts = [False]
        if self.cfg["serving"].get("optional_flags") and not self.cfg.dry_run:
            attempts.append(True)
        for drop in attempts:
            self._launch(drop_optional=drop)
            ok, err = self._wait()
            if ok:
                self.ok = True
                self.optional_flags_used = not drop
                self.started_s = time.time() - t0
                LOG.info("profile %s healthy in %.0fs (optional flags %s)", self.prof["name"],
                         self.started_s, "on" if not drop else "off")
                return True
            self.error = err
            LOG.warning("profile %s failed to start%s: %s", self.prof["name"],
                        " (retrying without optional flags)" if not drop and len(attempts) > 1 else "",
                        (err or "")[-2000:])
            self.stop(wait_gpu=False)
        return False

    def stop(self, wait_gpu: bool = True) -> None:
        for rep in self.replicas:
            if rep.proc is not None:
                _terminate(rep.proc, grace=5 if self.cfg.dry_run else 90)
        if wait_gpu and not self.cfg.dry_run:
            gpus = sorted({g for r in self.replicas if r.node == 0 for g in r.gpus})
            wait_gpus_free(gpus)

    def __enter__(self) -> "ServerGroup":
        self.start()
        return self

    def __exit__(self, *exc) -> None:
        self.stop()


def wait_gpus_free(gpus: list[int], limit_mib: int = 3000, timeout: float = 180.0) -> None:
    """Wait until the given GPUs hold less than limit_mib each (memory released)."""
    if not gpus:
        return
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            out = subprocess.run(["nvidia-smi", "--query-gpu=index,memory.used", "--format=csv,noheader,nounits"],
                                 capture_output=True, text=True, timeout=30).stdout
        except (OSError, subprocess.SubprocessError):
            return
        used = {}
        for line in out.splitlines():
            parts = [p.strip() for p in line.split(",")]
            if len(parts) == 2 and parts[0].isdigit():
                used[int(parts[0])] = float(parts[1])
        if all(used.get(g, 0) < limit_mib for g in gpus):
            return
        time.sleep(3)
    LOG.warning("GPUs %s still hold memory after %.0fs", gpus, timeout)


def run_logged(argv: list[str], log_path: Path, *, env: dict | None = None, cwd: str | Path | None = None,
               timeout: float | None = None, dry_run: bool = False) -> int:
    """Run a command to completion with output appended to log_path. Returns the exit code."""
    log_path = Path(log_path)
    log_path.parent.mkdir(parents=True, exist_ok=True)
    with open(log_path, "ab") as lf:
        lf.write(("\n# " + " ".join(str(a) for a in argv) + (f"  (cwd={cwd})" if cwd else "") + "\n").encode())
        if dry_run:
            lf.write(b"# dry run: not executed\n")
            return 0
        lf.flush()
        p = subprocess.Popen([str(a) for a in argv], stdout=lf, stderr=subprocess.STDOUT,
                             env=env, cwd=cwd, start_new_session=True)
        _LIVE.add(p)
        try:
            return p.wait(timeout=timeout)
        except subprocess.TimeoutExpired:
            _terminate(p, grace=30)
            return -9
        finally:
            _LIVE.discard(p)


def start_background(argv: list[str], log_path: Path, *, env: dict | None = None,
                     cwd: str | Path | None = None) -> subprocess.Popen:
    log_path = Path(log_path)
    log_path.parent.mkdir(parents=True, exist_ok=True)
    lf = open(log_path, "ab")
    lf.write(("\n# " + " ".join(str(a) for a in argv) + "\n").encode())
    lf.flush()
    p = subprocess.Popen([str(a) for a in argv], stdout=lf, stderr=subprocess.STDOUT, env=env, cwd=cwd,
                         start_new_session=True)
    _LIVE.add(p)
    return p


def stop_background(p: subprocess.Popen | None, grace: float = 60.0) -> None:
    if p is not None:
        _terminate(p, grace=grace)
