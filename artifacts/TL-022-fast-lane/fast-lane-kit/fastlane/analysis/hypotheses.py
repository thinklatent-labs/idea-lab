"""Pre-registered hypotheses, judged mechanically from the stage outputs.

Thresholds live in config.hypotheses and were set before any run (EXPERIMENT.md).
Verdicts: CONFIRMED, REFUTED, INCONCLUSIVE (between the confirm and refute
lines, or a part missing), NOT RUN (the stage did not run or produced nothing).

H1-H6 are the register's TL-022 hypotheses, measured here on the public
Gemma 4 31B stand-in; H7-H10 were added for this proof. Where a register
hypothesis names the Core 27B, the stand-in result is evidence, not the final
word: the Core has about 13% fewer weights (faster per step) and its own
acceptance (measured in the company version).
"""

from __future__ import annotations

from pathlib import Path

from fastlane.analysis.tables import stage_rows
from fastlane.util import percentile, read_json, read_jsonl

CONFIRMED, REFUTED, INCONCLUSIVE, NOT_RUN = "CONFIRMED", "REFUTED", "INCONCLUSIVE", "NOT RUN"
CORE_RATIO = 31.0 / 27.0  # weights ratio, stand-in to Core; an optimistic upper bound for speed


def _req_values(run_dir: Path, stage: str, key: str, field: str) -> list[float]:
    p = Path(run_dir) / "stages" / stage / f"{key}.requests.jsonl.gz"
    return [r[field] for r in read_jsonl(p) if r.get("ok") and r.get(field) is not None]


def _pooled_tau(rows: list[dict]) -> float | None:
    drafts = sum((r.get("spec") or {}).get("drafts", 0) for r in rows)
    acc = sum((r.get("spec") or {}).get("accepted", 0) for r in rows)
    return 1.0 + acc / drafts if drafts else None


def _v(id_, claim, measurement, verdict, value=None, threshold=None, detail="", **extra) -> dict:
    return {"id": id_, "claim": claim, "measurement": measurement, "verdict": verdict, "value": value,
            "threshold": threshold, "detail": detail, **extra}


def evaluate(run_dir: Path, cfg) -> list[dict]:
    H = cfg["hypotheses"]
    grid = stage_rows(run_dir, "grid")
    small = stage_rows(run_dir, "small")
    best = (read_json(Path(run_dir) / "drafters.json", {}) or {}).get("best") or {}
    best_profile = "fp8_tp8_best"
    out: list[dict] = []

    # H1: acceptance
    h = H["H1"]
    rows = [r for r in grid if r.get("profile") == best_profile and not r.get("prefix_share")
            and (r.get("temperature") or 0) <= h["temperature_max"] and r.get("L", 0) <= 4000 and r.get("out", 0) <= 300]
    tau = _pooled_tau(rows)
    if not rows:
        out.append(_v("H1", "The best drafter reaches a mean accepted length of 3.5 or more on service-level calls",
                      "tau on Quick and Answer cells, temperature <= 0.3", NOT_RUN, detail="grid did not run fp8_tp8_best"))
    elif tau is None:
        out.append(_v("H1", "The best drafter reaches a mean accepted length of 3.5 or more on service-level calls",
                      "tau on Quick and Answer cells, temperature <= 0.3", REFUTED, value=None,
                      threshold=f">= {h['tau_confirm']}", detail=f"no drafter beat plain decoding in the screen "
                                                                 f"(best: {best.get('spec')})"))
    else:
        verdict = CONFIRMED if tau >= h["tau_confirm"] else REFUTED if tau < h["tau_refute"] else INCONCLUSIVE
        out.append(_v("H1", "The best drafter reaches a mean accepted length of 3.5 or more on service-level calls",
                      "pooled tau on Quick and Answer cells (prompts <= 4,000, replies <= 300), temperature <= 0.3",
                      verdict, value=round(tau, 2), threshold=f"confirm >= {h['tau_confirm']}, refute < {h['tau_refute']}",
                      detail=f"drafter {best.get('spec')}; {len(rows)} cells"))

    # H2: 1,000 tok/s per request at 8 in flight
    h = H["H2"]
    rows = [r for r in grid if r.get("profile") == best_profile and not r.get("prefix_share")
            and r.get("concurrency") == h["concurrency"] and r.get("out") == h["reply"] and r.get("L", 0) <= h["prompt_max"]]
    vals: list[float] = []
    for r in rows:
        vals += _req_values(run_dir, "grid", r["key"], "decode_tps")
    p50 = percentile(vals, 50)
    by_c = {}
    for c in (1, 4, 8, 16):
        rr = [r for r in grid if r.get("profile") == best_profile and not r.get("prefix_share") and r.get("concurrency") == c
              and r.get("out") == h["reply"] and r.get("L", 0) <= h["prompt_max"]]
        vv = [x for r in rr for x in _req_values(run_dir, "grid", r["key"], "decode_tps")]
        if vv:
            by_c[c] = round(percentile(vv, 50) or 0)
    if p50 is None:
        out.append(_v("H2", "TP8 with the drafter gives 1,000 tok/s or more per call at p50 with 8 in flight",
                      "decode tok/s per call, Answer cells, 8 in flight", NOT_RUN, detail="no matching grid cells"))
    else:
        out.append(_v("H2", "TP8 with the drafter gives 1,000 tok/s or more per call at p50 with 8 in flight",
                      f"p50 decode tok/s per call over Answer cells (prompts <= {h['prompt_max']}, {h['reply']}-token replies)",
                      CONFIRMED if p50 >= h["tps_target"] else REFUTED, value=round(p50),
                      threshold=f">= {h['tps_target']}",
                      detail=f"p50 by calls in flight: {by_c}; 27B upper bound about {round(p50 * CORE_RATIO)}",
                      by_concurrency=by_c))

    # H3: 4-bit quality (GSM8K proxy for the TL Index check)
    h = H["H3"]
    q = {p.stem: read_json(p) for p in (Path(run_dir) / "stages" / "quality").glob("*.json")
         if not p.name.endswith(".answers.json")} if (Path(run_dir) / "stages" / "quality").exists() else {}
    fp8, w4 = q.get("fp8_tp8_best") or q.get("fp8_tp8_none"), q.get("w4a16_tp8_best") or q.get("w4a16_tp8_none")
    speed = None
    f1 = [r for r in grid if r.get("profile") == best_profile and r.get("concurrency") == 1 and not r.get("prefix_share")]
    w1 = [r for r in grid if r.get("profile") == "w4a16_tp8_best" and r.get("concurrency") == 1 and not r.get("prefix_share")]
    if f1 and w1:
        def med(rs):
            return percentile([(r.get("decode_tps") or {}).get("p50") for r in rs if (r.get("decode_tps") or {}).get("p50")], 50)
        if med(f1) and med(w1):
            speed = med(w1) / med(f1) - 1.0
    if not fp8 or not w4 or fp8.get("accuracy") is None or w4.get("accuracy") is None:
        out.append(_v("H3", "4-bit weights stay within 1 point of FP8 on quality", "GSM8K accuracy, W4A16 against FP8",
                      NOT_RUN, detail="quality check did not run for both profiles"))
    else:
        drop = (fp8["accuracy"] - w4["accuracy"]) * 100
        verdict = CONFIRMED if drop <= h["max_drop_points"] else REFUTED if drop > 2 * h["max_drop_points"] else INCONCLUSIVE
        out.append(_v("H3", "4-bit weights stay within 1 point of FP8 on quality",
                      "GSM8K accuracy points, FP8 minus W4A16 (proxy; the TL Index check is company-side)", verdict,
                      value=round(drop, 2), threshold=f"<= {h['max_drop_points']} (refute > {2 * h['max_drop_points']})",
                      detail=f"FP8 {fp8['accuracy'] * 100:.1f}% on {fp8['questions']}, W4A16 {w4['accuracy'] * 100:.1f}%"
                             + (f"; 4-bit speed at 1 in flight {speed * 100:+.0f}%" if speed is not None else ""),
                      speed_gain=speed))

    # H4: the small model's 200 ms class
    h = H["H4"]
    srows = [r for r in small if r.get("profile") == h["profile"] and r.get("out") == h["reply"]
             and r.get("concurrency", 99) <= h["concurrency_max"] and r.get("L") in h["prompts"]]
    if not srows:
        out.append(_v("H4", "The small model returns 300-token replies in 200 ms at p95 with up to 8 in flight per TP4 replica",
                      "p95 end to end", NOT_RUN, detail=f"no {h['profile']} cells"))
    else:
        worst = max(srows, key=lambda r: (r.get("e2e") or {}).get("p95") or 1e9)
        w = ((worst.get("e2e") or {}).get("p95") or 1e9) * 1000
        fails = [f"{r['L']}/{r['concurrency']}" for r in srows if ((r.get("e2e") or {}).get("p95") or 1e9) * 1000 > h["e2e_ms"]]
        missing = [L for L in h["prompts"] if not any(r.get("L") == L for r in srows)]
        verdict = REFUTED if fails else (INCONCLUSIVE if missing else CONFIRMED)
        out.append(_v("H4", "The small model returns 300-token replies in 200 ms at p95 with up to 8 in flight per TP4 replica",
                      f"worst p95 end to end over prompts {h['prompts']} and 1 to {h['concurrency_max']} in flight "
                      f"(the TL Index sufficiency half is company-side)", verdict, value=round(w),
                      threshold=f"<= {h['e2e_ms']} ms",
                      detail=(f"over the line at prompt/in-flight {', '.join(fails)}; " if fails else "")
                             + f"worst cell {worst['L']} tokens at {worst['concurrency']} in flight"))

    # H5: scale across nodes
    s = read_json(Path(run_dir) / "stages" / "scale" / "scale.json")
    if not s or s.get("rise") is None:
        out.append(_v("H5", "Units of 8 H100s scale linearly behind the picker", "p95 at 2x load on 2 nodes against 1x on 1",
                      NOT_RUN, detail=(s or {}).get("reason", "needs the two_node plan")))
    else:
        out.append(_v("H5", "Units of 8 H100s scale linearly behind the picker",
                      "rise in fast-class p95 end to end, 2 nodes at 2x load against 1 node at 1x",
                      CONFIRMED if s["rise"] <= H["H5"]["max_p95_rise"] else REFUTED, value=round(s["rise"] * 100, 1),
                      threshold=f"<= {H['H5']['max_p95_rise'] * 100:.0f}%"))

    # H6: borrowing
    b = read_json(Path(run_dir) / "stages" / "load" / "borrowing.json")
    if not b:
        out.append(_v("H6", "Borrowing raises a busy bucket's sustainable rate 50% and the lender keeps its promise",
                      "sustainable rate with and without borrowing; lender p95", NOT_RUN))
    else:
        vi = b.get("verdict_inputs") or {}
        gain, lok, measured = b.get("gain"), vi.get("lender_ok"), vi.get("gain_measured", True)
        if lok is False:
            verdict = REFUTED
        elif gain is not None and measured and gain >= H["H6"]["rate_gain"] and lok:
            verdict = CONFIRMED
        else:
            verdict = INCONCLUSIVE
        if not measured:
            b["rate_off_rps"] = f">= {b.get('rate_off_rps')} (never saturated; raise borrowing.max_steps)"
        out.append(_v("H6", "Borrowing raises a busy bucket's sustainable rate 50% and the lender keeps its promise",
                      "sustainable calls/s of the busy bucket (95% within promise), off and on; lender p95 against its promise",
                      verdict, value=None if gain is None else round(gain * 100),
                      threshold=f"gain >= {H['H6']['rate_gain'] * 100:.0f}% and lender inside promise",
                      detail=f"{b.get('rate_off_rps')} -> {b.get('rate_on_rps')} calls/s; lender p95 "
                             f"{(b.get('lender_p95_s') or 0) * 1000:,.0f} ms vs promise "
                             f"{(b.get('lender_promise_s') or 0) * 1000:,.0f} ms"))

    # H7: capacity at the target rate
    h = H["H7"]
    cap = read_json(Path(run_dir) / "stages" / "load" / f"capacity_x{float(h['multiplier']):g}.json")
    if not cap:
        out.append(_v("H7", "One 8x H100 node serves 1 million input tokens a minute with 95% of fast calls inside their promise",
                      "fast-class attainment at 1x", NOT_RUN))
    else:
        att = (cap["classes"].get("fast") or {}).get("attainment")
        out.append(_v("H7", "One 8x H100 node serves 1 million input tokens a minute with 95% of fast calls inside their promise",
                      "share of fast calls within their bucket's promise, mixed traffic at the target input rate",
                      NOT_RUN if att is None else CONFIRMED if att >= h["attainment"] else REFUTED,
                      value=None if att is None else round(att * 100, 1), threshold=f">= {h['attainment'] * 100:.0f}%",
                      detail=f"achieved {cap['input_tokens_per_min']:,.0f} input tok/min; errors {cap['errors']}"))

    # H8: picker against round robin
    h = H["H8"]
    rr = read_json(Path(run_dir) / "stages" / "load" / "policy_round_robin.json")
    if not cap or not rr:
        out.append(_v("H8", "The bucketed picker beats round robin on fast-call attainment", "attainment at 1x",
                      NOT_RUN))
    else:
        a_b = (cap["classes"].get("fast") or {}).get("attainment")
        a_r = (rr["classes"].get("fast") or {}).get("attainment")
        if a_b is None or a_r is None:
            out.append(_v("H8", "The bucketed picker beats round robin on fast-call attainment", "attainment at 1x", NOT_RUN))
        else:
            gain = (a_b - a_r) * 100
            verdict = CONFIRMED if gain >= h["attainment_gain_points"] else REFUTED if gain <= 0 else INCONCLUSIVE
            out.append(_v("H8", "The bucketed picker beats round robin on fast-call attainment",
                          "attainment points, bucketed minus round robin, same 1x traffic", verdict, value=round(gain, 1),
                          threshold=f">= {h['attainment_gain_points']} points",
                          detail=f"prefix-cache hit rate {_pct((cap.get('prefix') or {}).get('hit_rate'))} vs "
                                 f"{_pct((rr.get('prefix') or {}).get('hit_rate'))}"))

    # H9: our drafters against the public ones
    tr = [r for r in stage_rows(run_dir, "train") if r.get("stage") == "train-eval"]
    timings = read_json(Path(run_dir) / "stages" / "train" / "timings.json", {}) or {}
    routes = sorted({r.get("route") for r in tr if r.get("route")})
    if not routes:
        out.append(_v("H9", "Our drafter, trained on public data, comes within 10% of the public drafter's tau",
                      "tau ours / tau public, same prompts", NOT_RUN,
                      detail="train stage did not run" if not timings else f"routes: {list(timings)}"))
    from fastlane.stages.train import PUBLIC_COUNTERPART

    for route in routes:
        ours = _pooled_tau([r for r in tr if r.get("route") == route and r.get("kind") == "ours"])
        pub_spec = PUBLIC_COUNTERPART.get(route)
        pub = _pooled_tau([r for r in tr if r.get("drafter") == pub_spec and r.get("kind") == "public"])
        hours = ((timings.get(route) or {}).get("seconds") or 0) / 3600
        if ours is None or pub is None:
            out.append(_v(f"H9 ({route})", "Our drafter comes within 10% of the public drafter's tau", "tau ratio",
                          NOT_RUN, detail="evaluation incomplete"))
            continue
        ratio = ours / pub
        w = H["H9"]["tau_within"]
        verdict = CONFIRMED if ratio >= 1 - w else REFUTED if ratio < 1 - 2.5 * w else INCONCLUSIVE
        out.append(_v(f"H9 ({route})", "Our drafter comes within 10% of the public drafter's tau",
                      "tau ours / tau public on the same held-out prompts", verdict, value=round(ratio, 3),
                      threshold=f">= {1 - w:.2f}", detail=f"ours {ours:.2f}, public {pub:.2f} ({pub_spec}); "
                                                           f"training took {hours:.1f} h"))

    # H10: 300 tokens in 200 ms on the 31B
    h = H["H10"]
    rows = [r for r in grid if r.get("profile") == best_profile and r.get("L") == h["prompt"] and r.get("out") == h["reply"]
            and r.get("concurrency") == h["concurrency"] and not r.get("prefix_share")]
    if not rows:
        out.append(_v("H10", "Gemma 4 31B on 8x H100 returns 300 tokens in 200 ms at p95 (target b on the big model)",
                      "p95 end to end, 1,000-token prompt, 1 in flight", NOT_RUN))
    else:
        p95 = ((rows[0].get("e2e") or {}).get("p95") or 0) * 1000
        out.append(_v("H10", "Gemma 4 31B on 8x H100 returns 300 tokens in 200 ms at p95 (target b on the big model)",
                      "p95 end to end, 1,000-token prompt, 300-token reply, 1 in flight", CONFIRMED if p95 <= h["e2e_ms"] else REFUTED,
                      value=round(p95), threshold=f"<= {h['e2e_ms']} ms",
                      detail=f"pre-registered expectation: refuted (needs tau near 7 on H100); 27B lower bound about "
                             f"{round(p95 / CORE_RATIO)} ms"))
    return out


def _pct(v) -> str:
    return "n/a" if v is None else f"{v * 100:.0f}%"


def kill_signal(verdicts: list[dict]) -> bool:
    v = {x["id"]: x["verdict"] for x in verdicts}
    return v.get("H1") == REFUTED and v.get("H2") == REFUTED
