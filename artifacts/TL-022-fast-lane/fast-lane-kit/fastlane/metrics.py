"""vLLM Prometheus metrics: scrape, diff, and read speculative-decoding acceptance.

Names verified against vLLM 0.33.0 (vllm/v1/metrics):
  vllm:spec_decode_num_drafts, vllm:spec_decode_num_draft_tokens,
  vllm:spec_decode_num_accepted_tokens, vllm:spec_decode_num_accepted_tokens_per_pos{position},
  vllm:prefix_cache_queries, vllm:prefix_cache_hits,
  vllm:num_requests_running, vllm:num_requests_waiting, vllm:kv_cache_usage_perc.
Counters are exposed with a _total suffix; the parser strips it and ignores
the _created samples Prometheus clients add.

Mean accepted length (tau) = 1 + accepted tokens / drafts: the tokens each
verify step emits for a request. tau is what turns the hardware's step rate
into tokens per second.
"""

from __future__ import annotations

import re
import urllib.error
import urllib.request

_LINE = re.compile(r'^([a-zA-Z_:][a-zA-Z0-9_:]*)(?:\{(.*)\})?\s+(\S+)')
_LABEL = re.compile(r'([a-zA-Z_][a-zA-Z0-9_]*)="((?:[^"\\]|\\.)*)"')

Samples = dict  # {(name, ((label, value), ...)): float}


def parse(text: str) -> Samples:
    out: Samples = {}
    for line in text.splitlines():
        if not line or line.startswith("#"):
            continue
        m = _LINE.match(line)
        if not m:
            continue
        name, labels_s, value_s = m.group(1), m.group(2) or "", m.group(3)
        if name.endswith("_created"):
            continue
        try:
            value = float(value_s)
        except ValueError:
            continue
        labels = tuple(sorted(_LABEL.findall(labels_s)))
        out[(name, labels)] = value
    return out


def scrape(base_url: str, timeout: float = 5.0) -> Samples | None:
    try:
        with urllib.request.urlopen(base_url.rstrip("/") + "/metrics", timeout=timeout) as r:
            return parse(r.read().decode("utf-8", "replace"))
    except (urllib.error.URLError, OSError, ValueError):
        return None


def scrape_all(urls: list[str]) -> list[Samples | None]:
    return [scrape(u) for u in urls]


def _base(name: str) -> str:
    return name[:-6] if name.endswith("_total") else name


def total(samples: Samples | None, base: str) -> float:
    if not samples:
        return 0.0
    return sum(v for (n, _l), v in samples.items() if _base(n) == base)


def by_label(samples: Samples | None, base: str, label: str) -> dict[str, float]:
    out: dict[str, float] = {}
    if not samples:
        return out
    for (n, labels), v in samples.items():
        if _base(n) != base:
            continue
        lv = dict(labels).get(label)
        if lv is not None:
            out[lv] = out.get(lv, 0.0) + v
    return out


def delta(before: Samples | None, after: Samples | None) -> Samples:
    """after - before for every sample in after (counters); missing before counts as 0."""
    if not after:
        return {}
    before = before or {}
    return {k: v - before.get(k, 0.0) for k, v in after.items()}


def merge(deltas: list[Samples]) -> Samples:
    out: Samples = {}
    for d in deltas:
        for k, v in (d or {}).items():
            out[k] = out.get(k, 0.0) + v
    return out


def spec_stats(d: Samples) -> dict:
    drafts = total(d, "vllm:spec_decode_num_drafts")
    draft_tokens = total(d, "vllm:spec_decode_num_draft_tokens")
    accepted = total(d, "vllm:spec_decode_num_accepted_tokens")
    per_pos = by_label(d, "vllm:spec_decode_num_accepted_tokens_per_pos", "position")
    out = {"drafts": drafts, "draft_tokens": draft_tokens, "accepted": accepted}
    if drafts > 0:
        out["tau"] = 1.0 + accepted / drafts
        out["per_position"] = [per_pos[k] / drafts for k in sorted(per_pos, key=lambda x: int(x))]
    if draft_tokens > 0:
        out["acceptance_rate"] = accepted / draft_tokens
    return out


def prefix_stats(d: Samples) -> dict:
    q = total(d, "vllm:prefix_cache_queries")
    h = total(d, "vllm:prefix_cache_hits")
    return {"queries": q, "hits": h, "hit_rate": (h / q) if q > 0 else None}


def gauges(samples: Samples | None) -> dict:
    kv = [v for (n, _l), v in (samples or {}).items() if _base(n) == "vllm:kv_cache_usage_perc"]
    return {
        "running": total(samples, "vllm:num_requests_running"),
        "waiting": total(samples, "vllm:num_requests_waiting"),
        "kv_usage": max(kv) if kv else None,
    }
