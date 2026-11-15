"""The report: verdicts first, then the bucket sheet, then the evidence.

Writes into results/<run-id>/:
  REPORT.md        readable on GitHub (charts as SVG files)
  report.html      one self-contained page (charts inline, hover on marks)
  summary.json     verdicts and key numbers, for the lab register
  hypotheses.json  the verdicts alone
  bucket_sheet.md  the promise sheet on its own
  tables/*.csv     every cell, flat
  charts/*.svg
"""

from __future__ import annotations

import html
import statistics
from pathlib import Path

from fastlane.analysis import svgchart
from fastlane.analysis.hypotheses import kill_signal
from fastlane.analysis.hypotheses import evaluate as evaluate_hypotheses
from fastlane.analysis.tables import (CELL_FIELDS, bucket_sheet, failures, flat, servers, stage_rows,
                                      write_csv)
from fastlane.util import LOG, fmt_num, now_iso, read_json, write_json


class Doc:
    def __init__(self) -> None:
        self.blocks: list[tuple] = []

    def h(self, level: int, text: str) -> None:
        self.blocks.append(("h", level, text))

    def p(self, text: str) -> None:
        self.blocks.append(("p", text))

    def table(self, head: list[str], rows: list[list]) -> None:
        if rows:
            self.blocks.append(("table", head, rows))

    def chart(self, name: str, svg: str, alt: str) -> None:
        if svg:
            self.blocks.append(("chart", name, svg, alt))

    def md(self) -> str:
        out = []
        for b in self.blocks:
            if b[0] == "h":
                out.append("#" * b[1] + " " + b[2])
            elif b[0] == "p":
                out.append(b[1])
            elif b[0] == "table":
                out.append("| " + " | ".join(b[1]) + " |")
                out.append("|" + "|".join(" --- " for _ in b[1]) + "|")
                for r in b[2]:
                    out.append("| " + " | ".join(str(c).replace("|", "/") for c in r) + " |")
            elif b[0] == "chart":
                out.append(f"![{b[3]}](charts/{b[1]}.svg)")
            out.append("")
        return "\n".join(out)

    def html(self, title: str) -> str:
        body = []
        for b in self.blocks:
            if b[0] == "h":
                body.append(f"<h{b[1]}>{html.escape(b[2])}</h{b[1]}>")
            elif b[0] == "p":
                body.append(f"<p>{_inline(b[1])}</p>")
            elif b[0] == "table":
                head = "".join(f"<th>{html.escape(str(c))}</th>" for c in b[1])
                rows = "".join("<tr>" + "".join(f"<td>{_inline(str(c))}</td>" for c in r) + "</tr>" for r in b[2])
                body.append(f'<div class="tw"><table><thead><tr>{head}</tr></thead><tbody>{rows}</tbody></table></div>')
            elif b[0] == "chart":
                body.append(f'<figure>{b[2]}</figure>')
        css = ("body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;"
               "max-width:1000px;margin:24px auto;padding:0 16px;color:#0b0b0b;background:#fcfcfb;line-height:1.5}"
               "@media (prefers-color-scheme: dark){body{color:#f0efec;background:#1a1a19}th{background:#262624}"
               "td,th{border-color:#3a3a37}}"
               "table{border-collapse:collapse;font-size:13px;margin:8px 0}th,td{border:1px solid #e0dfd9;padding:4px 8px;"
               "text-align:left;vertical-align:top}th{background:#f3f2ee}.tw{overflow-x:auto}figure{margin:12px 0}"
               "svg{max-width:100%;height:auto}code{font-size:12px}")
        return (f"<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" "
                f"content=\"width=device-width,initial-scale=1\"><title>{html.escape(title)}</title><style>{css}</style>"
                f"</head><body>{''.join(body)}</body></html>")


def _inline(s: str) -> str:
    s = html.escape(s)
    out, code = [], False
    for part in s.split("`"):
        out.append(f"<code>{part}</code>" if code else part.replace("**", ""))
        code = not code
    return "".join(out)


def _ms(v) -> str:
    return "n/a" if v is None else f"{v:,.0f} ms"


def _cell(rows: list[dict], **kw) -> dict | None:
    for r in rows:
        if all(r.get(k) == v for k, v in kw.items()):
            return r
    return None


def build(run_dir: Path, cfg) -> dict:
    run_dir = Path(run_dir)
    run = read_json(run_dir / "run.json", {}) or {}
    env = read_json(run_dir / "env.json", {}) or {}
    charts_dir = run_dir / "charts"
    tables_dir = run_dir / "tables"
    charts_dir.mkdir(parents=True, exist_ok=True)

    stages = {s: stage_rows(run_dir, s) for s in ("screen", "grid", "small", "layouts", "train")}
    for s, rows in stages.items():
        write_csv(tables_dir / f"{s}.csv", [flat(r) for r in rows], CELL_FIELDS)
    verdicts = evaluate_hypotheses(run_dir, cfg)
    write_json(run_dir / "hypotheses.json", verdicts)
    pc = cfg["promise"]
    sheets = {}
    for prof, stage in (("fp8_tp8_best", "grid"), (cfg["load"]["cluster"]["profile"], "grid"),
                        ("small_tp4_mtp", "small")):
        sh = bucket_sheet(stages[stage], cfg["buckets"], profile=prof, concurrency=int(pc["concurrency"]),
                          margin=float(pc["margin"]))
        if any(x.get("measured") for x in sh):
            sheets[prof] = sh
    best = (read_json(run_dir / "drafters.json", {}) or {}).get("best") or {}

    doc = Doc()
    title = f"Fast-lane proof: {run.get('run_id', run_dir.name)}"
    doc.h(1, title)
    if cfg.dry_run:
        doc.p("**DRY RUN on simulated servers. These numbers test the pipeline; they say nothing about real speed.**")
    doc.p(f"Plan `{cfg.plan_name}` · started {run.get('started', '?')} · finished {now_iso()} · host "
          f"{env.get('host', '?')} · serving stack `{env.get('serve_env', 'n/a')}` · model: public Gemma 4 31B "
          f"(stand-in for TLM4 Core 27B) and Gemma 4 E2B (stand-in for the 7B Core) · prompts: real text, "
          f"1,000 to 10,000 tokens · times measured at the client.")

    doc.h(2, "Verdicts")
    doc.table(["ID", "Hypothesis", "Measured", "Line", "Verdict", "Detail"],
              [[v["id"], v["claim"], fmt_num(v.get("value"), 2) if isinstance(v.get("value"), float) else
                (v.get("value") if v.get("value") is not None else "n/a"), v.get("threshold") or "", f"**{v['verdict']}**",
                v.get("detail", "")] for v in verdicts])
    ks = kill_signal(verdicts)
    doc.p(f"Kill signal (H1 and H2 both refuted): **{'FIRED' if ks else 'not fired'}**. Best drafter from the screen: "
          f"`{best.get('spec', 'n/a')}`.")

    doc.h(2, "Bucket sheet: what each range can promise")
    doc.p(f"Promise = p95 end to end at the range's edge (largest measured prompt and reply inside it) with up to "
          f"{pc['concurrency']} calls in flight per replica, plus {float(pc['margin']) * 100:.0f}% margin. Ranges are "
          "draft edges until Langfuse gives real per-application lengths.")
    sheet_md = []
    for prof, sh in sheets.items():
        rows = [[s["bucket"], f"{s['prompt_range'][0]:,}-{s['prompt_range'][1]:,}", f"{s['reply_range'][0]}-{s['reply_range'][1]}",
                 f"{s['edge_prompt']:,} / {s['edge_reply']}", s["in_flight"], _ms(s.get("e2e_p50_ms")),
                 _ms(s.get("e2e_p95_ms")), f"**{_ms(s.get('promise_e2e_ms'))}**", _ms(s.get("promise_ttft_ms")),
                 fmt_num(s.get("decode_tps_p50")), fmt_num(s.get("tau"), 2)]
                for s in sh if s.get("measured")]
        doc.h(3, f"Profile `{prof}`")
        head = ["Bucket", "Prompt tokens", "Reply tokens", "Edge measured", "In flight", "p50", "p95",
                "Promise", "TTFT promise", "Decode tok/s p50", "tau"]
        doc.table(head, rows)
        sheet_md.append(f"## {prof}\n\n| " + " | ".join(head) + " |\n|" + "|".join(" --- " for _ in head) + "|\n"
                        + "\n".join("| " + " | ".join(str(c) for c in r) + " |" for r in rows) + "\n")
    (run_dir / "bucket_sheet.md").write_text("# Bucket sheet\n\n" + "\n".join(sheet_md))

    # screen
    scr = [r for r in stages["screen"] if r.get("temperature") == 0.0]
    if scr:
        doc.h(2, "Drafter screen (Gemma 4 31B FP8, TP8, one call at a time)")
        by: dict[str, list] = {}
        for r in scr:
            by.setdefault(r["drafter"], []).append(r)
        items = sorted(((d, statistics.median([(x.get("decode_tps") or {}).get("p50") or 0 for x in rs])) for d, rs in by.items()),
                       key=lambda x: -x[1])
        doc.chart("screen_decode", svgchart.bar_chart(
            "Decode speed per call by draft model", items, y_label="tokens/s per call (median)",
            subtitle="Temperature 0; median over screened prompt and reply lengths",
            label_items={items[0][0], "none"}), "decode speed by drafter")
        rows = []
        for d, _v in items:
            rs = by[d]
            taus = [(x.get("spec") or {}).get("tau") for x in rs if (x.get("spec") or {}).get("tau")]
            ident = [x.get("identical_to_baseline") for x in rs if x.get("identical_to_baseline") is not None]
            rows.append([d, fmt_num(_v), fmt_num(statistics.median(taus), 2) if taus else "n/a",
                         _ms(statistics.median([(x.get("ttft") or {}).get("p50") or 0 for x in rs]) * 1000),
                         f"{statistics.mean(ident) * 100:.0f}%" if ident else "n/a"])
        doc.table(["Drafter", "Decode tok/s (median p50)", "tau", "TTFT p50", "Same reply as no drafter"], rows)
        f = failures(run_dir, "screen")
        if f:
            doc.p("Failed to start: " + "; ".join(f"`{x['profile']}`" for x in f) + " (logs/screen/).")

    # grid
    grid = stages["grid"]
    if grid:
        doc.h(2, "Speed across prompt and reply lengths (grid)")
        order = list((cfg.stage("grid") or {}).get("profiles") or [])
        for prof in sorted({r["profile"] for r in grid}, key=lambda p: (order.index(p) if p in order else 99, p)):
            rows_p = [r for r in grid if r["profile"] == prof and not r.get("prefix_share")]
            for c in sorted({r["concurrency"] for r in rows_p}):
                if c not in (1, 8):
                    continue
                series = []
                for out in sorted({r["out"] for r in rows_p if r["out"] > 10}):
                    pts = [(r["L"], (r.get("decode_tps") or {}).get("p50")) for r in rows_p
                           if r["out"] == out and r["concurrency"] == c]
                    series.append({"name": f"{out}-token replies", "points": pts})
                doc.chart(f"grid_{prof}_c{c}_decode", svgchart.line_chart(
                    f"Decode speed per call: {prof}, {c} in flight", series, x_label="prompt tokens",
                    y_label="tokens/s per call (p50)", ref=[(1000.0, "1,000 tok/s")]), f"decode speed {prof} c{c}")
            rows = []
            for r in sorted(rows_p, key=lambda r: (r["concurrency"], r["L"], r["out"])):
                fr = flat(r)
                rows.append([r["L"], r["out"], r["concurrency"], _ms(fr["ttft_p50_ms"]), _ms(fr["e2e_p50_ms"]),
                             _ms(fr["e2e_p95_ms"]), fmt_num(fr["decode_tps_p50"]), fmt_num(fr["tau"], 2),
                             fmt_num(fr["output_tps_total"]), r.get("errors", 0)])
            doc.h(3, f"`{prof}`")
            doc.table(["Prompt", "Reply", "In flight", "TTFT p50", "E2E p50", "E2E p95", "Decode tok/s p50", "tau",
                       "Output tok/s (replica)", "Errors"], rows)
            px = [r for r in grid if r["profile"] == prof and r.get("prefix_share")]
            if px:
                doc.p("Prefix sharing (same prompt start across calls): " + "; ".join(
                    f"{int(r['prefix_share'] * 100)}% of {r['L']:,} tokens: TTFT p50 {_ms((r.get('ttft') or {}).get('p50', 0) * 1000)}"
                    f" (cache hit {((r.get('prefix') or {}).get('hit_rate') or 0) * 100:.0f}%)" for r in px))
        doc.p("Every cell: `tables/grid.csv`.")

    # layouts
    lay = stages["layouts"]
    if lay:
        doc.h(2, "Latency against bulk: the same 8 GPUs, four ways")
        profs = sorted({r["profile"] for r in lay})
        s1 = [{"name": p, "points": [(r["concurrency"], (r.get("decode_tps") or {}).get("p50")) for r in lay if r["profile"] == p]}
              for p in profs]
        s2 = [{"name": p, "points": [(r["concurrency"], r.get("output_tps_total")) for r in lay if r["profile"] == p]}
              for p in profs]
        doc.chart("layouts_per_call", svgchart.line_chart("Speed each call gets", s1, x_label="calls in flight (log)",
                                                          y_label="tokens/s per call (p50)", x_log=True), "per-call speed")
        doc.chart("layouts_total", svgchart.line_chart("Total output of the node", s2, x_label="calls in flight (log)",
                                                       y_label="output tokens/s, all replicas", x_log=True), "total output")
        doc.table(["Layout", "In flight", "Decode tok/s per call p50", "Output tok/s total", "E2E p95", "Errors"],
                  [[r["profile"], r["concurrency"], fmt_num((r.get("decode_tps") or {}).get("p50")),
                    fmt_num(r.get("output_tps_total")), _ms(((r.get("e2e") or {}).get("p95") or 0) * 1000), r.get("errors", 0)]
                   for r in sorted(lay, key=lambda r: (r["profile"], r["concurrency"]))])

    # small
    sm = stages["small"]
    if sm:
        doc.h(2, "The 200 ms class on the small model (Gemma 4 E2B FP8 with MTP)")
        reply = int(cfg["hypotheses"]["H4"]["reply"])
        series = []
        for p in sorted({r["profile"] for r in sm}):
            for c in sorted({r["concurrency"] for r in sm if r["profile"] == p}):
                if c not in (1, 8):
                    continue
                pts = [(r["L"], ((r.get("e2e") or {}).get("p95") or 0) * 1000) for r in sm
                       if r["profile"] == p and r["concurrency"] == c and r["out"] == reply]
                series.append({"name": f"{p.replace('small_', '')}, {c} in flight", "points": pts})
        doc.chart("small_e2e", svgchart.line_chart(f"{reply}-token replies: p95 end to end", series,
                                                   x_label="prompt tokens", y_label="ms (p95)",
                                                   ref=[(float(cfg['hypotheses']['H4']['e2e_ms']), "200 ms")]),
                  "small model e2e")
        doc.table(["Profile", "Prompt", "Reply", "In flight", "TTFT p50", "E2E p95", "Decode tok/s p50", "tau"],
                  [[r["profile"], r["L"], r["out"], r["concurrency"], _ms(((r.get("ttft") or {}).get("p50") or 0) * 1000),
                    _ms(((r.get("e2e") or {}).get("p95") or 0) * 1000), fmt_num((r.get("decode_tps") or {}).get("p50")),
                    fmt_num((r.get("spec") or {}).get("tau"), 2)]
                   for r in sorted(sm, key=lambda r: (r["profile"], r["concurrency"], r["L"], r["out"]))])

    # quality
    qd = run_dir / "stages" / "quality"
    qs = [read_json(p) for p in sorted(qd.glob("*.json"))] if qd.exists() else []
    if qs:
        doc.h(2, "4-bit quality check (GSM8K, temperature 0)")
        doc.table(["Profile", "Questions", "Correct", "Accuracy"],
                  [[q["profile"], q["questions"], q["correct"], f"{(q.get('accuracy') or 0) * 100:.1f}%"] for q in qs])

    # load
    ld = run_dir / "stages" / "load"
    if ld.exists():
        scen = [read_json(p) for p in sorted(ld.glob("*.json")) if (read_json(p) or {}).get("classes") is not None]
        prom = read_json(ld / "promises.json") or {}
        if scen:
            doc.h(2, "The shared cluster under mixed traffic")
            doc.p(f"Cluster: `{cfg['load']['cluster']['profile']}` behind the picker. Promises "
                  f"({prom.get('source', '?')}): " + ", ".join(f"{k} {v * 1000:,.0f} ms" for k, v in (prom.get('promises') or {}).items())
                  + f". Target: {float(cfg['load']['input_tokens_per_minute']):,.0f} input tokens a minute.")
            caps = sorted([s for s in scen if s["name"].startswith("capacity_x")], key=lambda s: float(s["name"][10:]))
            if caps:
                doc.chart("load_capacity", svgchart.line_chart(
                    "Fast calls inside their promise as load rises",
                    [{"name": "bucketed picker", "points": [(float(s["name"][10:]), ((s["classes"].get("fast") or {}).get("attainment") or 0) * 100)
                                                            for s in caps]}],
                    x_label="load (x 1M input tokens a minute)", y_label="% of fast calls within promise",
                    ref=[(float(cfg["hypotheses"]["H7"]["attainment"]) * 100, "95% line")], y_cap=100), "capacity")
            pol = [s for s in scen if s["name"].startswith("policy_")]
            c1 = next((s for s in caps if float(s["name"][10:]) == 1.0), None)
            if pol and c1:
                items = [(s["name"].replace("policy_", ""), ((s["classes"].get("fast") or {}).get("attainment") or 0) * 100) for s in pol]
                items.append(("bucketed", ((c1["classes"].get("fast") or {}).get("attainment") or 0) * 100))
                doc.chart("load_policies", svgchart.bar_chart("Fast calls within promise at 1x, by picking policy", items,
                                                              y_label="% within promise", label_items={k for k, _ in items}),
                          "policies")
            rows = []
            for s in caps + pol + [x for x in scen if x["name"].startswith(("borrow_", "one_", "two_"))]:
                f = s["classes"].get("fast") or {}
                rows.append([s["name"], s.get("policy"), f"{s['input_tokens_per_min']:,.0f}",
                             f"{(f.get('attainment') or 0) * 100:.1f}%" if f.get("attainment") is not None else "n/a",
                             _ms(((f.get("ttft") or {}).get("p95") or 0) * 1000), _ms(((f.get("e2e") or {}).get("p95") or 0) * 1000),
                             f"{s.get('borrowed_share', 0) * 100:.0f}%",
                             f"{((s.get('prefix') or {}).get('hit_rate') or 0) * 100:.0f}%", s.get("errors", 0),
                             f"{(s.get('client_lag_p99_s') or 0) * 1000:,.0f} ms"])
            doc.table(["Scenario", "Policy", "Input tok/min", "Fast within promise", "Fast TTFT p95", "Fast E2E p95",
                       "Borrowed", "Prefix-cache hits", "Errors", "Client lag p99"], rows)
            b = read_json(ld / "borrowing.json")
            if b:
                doc.p(f"Borrowing: the `{b['busy_app']}` bucket sustained {b.get('rate_off_rps')} calls/s alone and "
                      f"{b.get('rate_on_rps')} with borrowing; with `{b['lender_app']}` traffic back, the lender's p95 was "
                      f"{_ms((b.get('lender_p95_s') or 0) * 1000)} against a promise of {_ms((b.get('lender_promise_s') or 0) * 1000)}.")

    # train
    tr = [r for r in stages["train"] if r.get("stage") == "train-eval"]
    timings = read_json(run_dir / "stages" / "train" / "timings.json")
    if timings:
        doc.h(2, "Drafter training on public data")
        doc.table(["Step", "Time", "Result"], [[k, f"{(v.get('seconds') or 0) / 3600:.1f} h",
                                               "ok" if v.get("ok", True) and not v.get("error") else f"failed: {v.get('error', '')[:200]}"]
                                              for k, v in timings.items()])
        if tr:
            doc.table(["Drafter", "Route", "Ours or public", "Prompt", "Reply", "tau", "Decode tok/s p50"],
                      [[r["drafter"], r.get("route"), r.get("kind"), r["L"], r["out"], fmt_num((r.get("spec") or {}).get("tau"), 2),
                        fmt_num((r.get("decode_tps") or {}).get("p50"))] for r in tr])

    # failures and notes
    notes = []
    for s in ("grid", "small", "layouts", "load", "train", "scale"):
        for f in failures(run_dir, s):
            notes.append([s, f.get("profile"), (f.get("error") or "")[-300:].replace("\n", " ")])
    for s in ("grid", "small", "layouts"):
        for sv in servers(run_dir, s):
            if sv.get("optional_flags") is False:
                notes.append([s, sv.get("profile"), "started only without the optional flags (kv-cache fp8, async scheduling)"])
    doc.h(2, "Failures and notes")
    if notes:
        doc.table(["Stage", "Profile", "Note"], notes)
    else:
        doc.p("None.")
    stages_status = run.get("stages", {})
    if stages_status:
        doc.table(["Stage", "Status", "Time"], [[k, v.get("status"), f"{(v.get('seconds') or 0) / 60:.0f} min"]
                                                for k, v in stages_status.items()])

    doc.h(2, "How to read this")
    doc.p("Decode tok/s per call excludes the first token (output speed after the first token). E2E is the client's "
          "end-to-end time. tau is vLLM's mean accepted length per verify step (1 + accepted draft tokens per step). "
          "Every replica of a profile runs the same settings; the command lines are in stages/*/SERVER__*.json. "
          "Stand-in caveat: the Core 27B has about 13% fewer weights than the 31B (faster per step) and its own "
          "acceptance, which the company version measures with drafters trained on the Core.")

    md = doc.md()
    (run_dir / "REPORT.md").write_text(md)
    (run_dir / "report.html").write_text(doc.html(title))
    for b in doc.blocks:
        if b[0] == "chart":
            (charts_dir / f"{b[1]}.svg").write_text(b[2])
    summary = {"run_id": run.get("run_id", run_dir.name), "plan": cfg.plan_name, "dry_run": cfg.dry_run,
               "generated": now_iso(), "best_drafter": best.get("spec"), "kill_signal": ks,
               "verdicts": [{k: v.get(k) for k in ("id", "verdict", "value", "threshold", "detail")} for v in verdicts],
               "bucket_sheets": sheets, "stages": stages_status}
    write_json(run_dir / "summary.json", summary)
    LOG.info("report written: %s", run_dir / "REPORT.md")
    return summary
