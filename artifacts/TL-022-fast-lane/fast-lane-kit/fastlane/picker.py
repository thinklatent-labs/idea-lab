"""The picker: which replica serves a call, at what priority (CAP-039).

Pure logic with no I/O, so the same code can sit behind this kit's router, an
Envoy ext_proc service, or a test. Inputs per call come from headers the
client (Relay) sets: application, session, class (fast, standard, batch),
prompt tokens and reply limit.

Policies, from simplest to the design (D-375):
  round_robin   every healthy replica in turn
  least_load    fewest calls in flight (+ waiting, from vLLM metrics)
  affinity      rendezvous hash on application+session, so repeated prefixes
                land on the replica that already caches them; bounded load
                moves a call off its preferred replica when that replica holds
                more than (1 + eps) x the average
  bucketed      classify the call into a bucket by prompt and reply range and
                class; pick among the bucket's home replicas with affinity and
                bounded load; when every home replica is full, borrow an idle
                replica of another bucket, at a lower priority than that
                replica's own calls so the lender's promise holds

vLLM's --scheduling-policy priority serves lower numbers first.
"""

from __future__ import annotations

import hashlib
import math
from dataclasses import dataclass, field


@dataclass
class Bucket:
    name: str
    prompt: tuple[int, int]
    reply: tuple[int, int]
    classes: tuple[str, ...]

    def matches(self, cls: str, prompt_tokens: int, max_tokens: int) -> bool:
        return (cls in self.classes and self.prompt[0] <= prompt_tokens <= self.prompt[1]
                and self.reply[0] <= max_tokens <= self.reply[1])


@dataclass
class ReplicaState:
    name: str
    url: str
    home: set = field(default_factory=set)
    lendable: bool = True
    max_inflight: int = 8
    inflight: int = 0
    waiting: float = 0.0
    running: float = 0.0
    kv_usage: float | None = None
    healthy: bool = True

    @property
    def load(self) -> float:
        return self.inflight + self.waiting


@dataclass
class Meta:
    app: str = "default"
    session: str = ""
    cls: str = "standard"
    prompt_tokens: int = 0
    max_tokens: int = 256

    @property
    def key(self) -> str:
        return f"{self.app}:{self.session}" if self.session else self.app


@dataclass
class Choice:
    replica: ReplicaState
    bucket: str
    priority: int | None
    borrowed: bool
    reason: str


class NoReplica(RuntimeError):
    pass


def buckets_from_config(rows: list[dict]) -> list[Bucket]:
    return [Bucket(r["name"], tuple(r["prompt"]), tuple(r["reply"]), tuple(r["classes"])) for r in rows]


def classify(buckets: list[Bucket], m: Meta) -> str:
    for b in buckets:
        if b.matches(m.cls, m.prompt_tokens, m.max_tokens):
            return b.name
    return "overflow"


def _hrw_order(key: str, reps: list[ReplicaState]) -> list[ReplicaState]:
    def score(r: ReplicaState) -> int:
        return int.from_bytes(hashlib.blake2b(f"{key}|{r.name}".encode(), digest_size=8).digest(), "big")
    return sorted(reps, key=score, reverse=True)


class Picker:
    POLICIES = ("round_robin", "least_load", "affinity", "bucketed")

    def __init__(self, buckets: list[Bucket], replicas: list[ReplicaState], policy: str = "bucketed", *,
                 borrowing: bool = True, eps: float = 0.25, lend_max_load: float = 2,
                 class_priority: dict | None = None, borrow_penalty: int = 20, use_priority: bool = True):
        if policy not in self.POLICIES:
            raise ValueError(f"unknown policy {policy!r}")
        self.buckets = buckets
        self.replicas = replicas
        self.policy = policy
        self.borrowing = borrowing
        self.eps = eps
        self.lend_max_load = lend_max_load
        self.class_priority = class_priority or {"fast": 0, "standard": 5, "batch": 10}
        self.borrow_penalty = borrow_penalty
        self.use_priority = use_priority
        self._rr = 0
        self.counts = {"picks": 0, "borrowed": 0, "spilled": 0}

    def _bounded(self, key: str, reps: list[ReplicaState]) -> tuple[ReplicaState, bool]:
        order = _hrw_order(key, reps)
        total = sum(r.inflight for r in reps) + 1
        cap = math.ceil((1 + self.eps) * total / len(reps))
        for i, r in enumerate(order):
            if r.inflight < cap:
                return r, i > 0
        return min(reps, key=lambda r: (r.load, r.inflight)), True

    def pick(self, m: Meta) -> Choice:
        healthy = [r for r in self.replicas if r.healthy]
        if not healthy:
            raise NoReplica("no healthy replica")
        bucket = classify(self.buckets, m)
        prio = self.class_priority.get(m.cls, 5) if self.use_priority else None
        borrowed = False
        reason = self.policy
        if self.policy == "round_robin":
            r = healthy[self._rr % len(healthy)]
            self._rr += 1
        elif self.policy == "least_load":
            r = min(healthy, key=lambda x: (x.load, x.inflight, x.name))
        elif self.policy == "affinity":
            r, spilled = self._bounded(m.key, healthy)
            if spilled:
                self.counts["spilled"] += 1
                reason = "affinity-spill"
        else:
            home = [x for x in healthy if bucket in x.home] or healthy
            r, spilled = self._bounded(m.key, home)
            if spilled:
                self.counts["spilled"] += 1
                reason = "bucketed-spill"
            if self.borrowing and all(x.load >= x.max_inflight for x in home):
                lenders = [x for x in healthy if bucket not in x.home and x.lendable
                           and x.load <= self.lend_max_load]
                if lenders:
                    r = min(lenders, key=lambda x: (x.load, x.name))
                    borrowed = True
                    reason = "borrowed"
                    if prio is not None:
                        prio += self.borrow_penalty
        self.counts["picks"] += 1
        if borrowed:
            self.counts["borrowed"] += 1
        return Choice(replica=r, bucket=bucket, priority=prio, borrowed=borrowed, reason=reason)
