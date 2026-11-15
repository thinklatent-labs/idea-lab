# fast-lane: the TL-022 proof kit

This kit runs on one 8× H100 node and measures, on public Gemma 4 31B with vLLM and
speculative decoding, everything the fast-lane design rests on:

- how fast each call can be served;
- what each prompt and reply range can promise;
- how much more total output the same GPUs give as many small replicas;
- whether a shared cluster behind a picker keeps those promises at 1 million input tokens a minute;
- whether we can train draft models as good as the public ones.

You run one Slurm job. It writes a report that marks each pre-registered
hypothesis confirmed or refuted, and it can push the results here.

ThinkLatent Idea Lab, TL-022 fast-lane. Private to thinklatent-labs. MIT licence.

## Quick start (HyperPod with Slurm, FSx at /fsx)

```bash
# On the login node (it needs internet access)
git clone git@github.com:thinklatent-labs/fast-lane.git /fsx/fastlane/fast-lane
cd /fsx/fastlane/fast-lane
bash scripts/setup.sh                      # Python environments on FSx, about 20 min
PLAN=standard bash scripts/download.sh     # weights (about 150 GB) and the prompt library

# Optional: the whole pipeline on simulated servers, 4 min, no GPUs needed
FL_PY=/fsx/envs/fastlane-serve/bin/python bash scripts/dry_run.sh

# The real runs
PLAN=quick sbatch scripts/proof.sbatch                  # about 3 h: every serving stage at small size
PLAN=standard PUBLISH=1 sbatch scripts/proof.sbatch     # about 24 h: the proof; pushes results when done
```

When a run finishes, the report is at `results/<run-id>/REPORT.md` (and
`report.html`). With `PUBLISH=1` the kit commits `results/<run-id>/` and pushes it,
so the next lab session can read it. The node needs push access to this repository
(a deploy key or token). Without it, run `python -m fastlane publish --run-id <id>`
from a machine that has access.

Runs resume where they stopped: submit again with the same `RUN_ID` and finished
cells and stages are skipped.

## Plans

| Plan | Time | What runs |
| --- | --- | --- |
| `smoke` | 4 min | Everything on simulated servers (`--dry-run`); tests the pipeline only |
| `quick` | about 3 h | Screen 4 drafters; grid for TP8 and TP4; small model; two layouts; 1x load |
| `standard` | about 24 h | Every hypothesis except H5. Full grid, 8 drafter settings, 4 layouts, capacity, policies, borrowing, one EAGLE-3 training run |
| `full` | about 60 h | Wider sweeps, plus all three training routes (Speculators EAGLE-3 and DFlash, Model Optimizer EAGLE-3) |
| `two_node` | about 1 h | H5: one unit at 1x against two units at 2x (`sbatch --nodes=2`) |

`python -m fastlane plans` lists them. Run a subset with
`--stages screen,grid,report`, and override any setting with
`--set key=value`. For example:
`--set load.input_tokens_per_minute=2000000`.

## What it measures

The hypotheses (H1 to H10) and the design behind them are in
[EXPERIMENT.md](EXPERIMENT.md). In one line each:

1. **Screen.** Every public Gemma 4 31B drafter (Red Hat EAGLE-3, DFlash and DSpark; Google MTP; suffix decoding), tried on identical prompts. Picks the fastest.
2. **Grid.** Prompts of 1,000 to 10,000 tokens × replies of 10 to 1,000 tokens × 1 to 16 in flight, for TP8, TP4 and 4-bit. Gives the bucket sheet.
3. **Small.** Gemma 4 E2B with MTP: can it hold 300 tokens in 200 ms?
4. **Layouts.** The same 8 GPUs as 1, 2, 4 or 8 replicas, from 1 to 512 in flight: speed per call against total output.
5. **Load.** Mixed applications through the picker at 0.5x to 2x of 1M input tokens a minute; four picking policies; borrowing between buckets.
6. **Train.** Our own EAGLE-3 (and DFlash) drafter trained on public data by Speculators, and by NVIDIA Model Optimizer. Compared with the public drafter.

## Layout

```
config/proof.yaml        every setting: models, drafters, profiles, buckets, traffic, thresholds, plans
fastlane/
  servers.py             vLLM replicas on GPU slices: start, health, stop (and srun for a second node)
  client.py              load generator: closed loop (fixed in flight) and open loop (Poisson)
  prompts.py             real-text prompts at exact token lengths from public datasets
  metrics.py             vLLM Prometheus metrics: acceptance (tau), prefix cache, queue
  picker.py              the picker: buckets, affinity, bounded load, borrowing, priority (CAP-039)
  router.py              HTTP front end that applies the picker (stand-in for Envoy ext_proc)
  stages/                preflight, data, screen, grid, small, layouts, load, scale, train
  analysis/              tables, hypothesis verdicts, SVG charts, the report
  sim/                   simulated vLLM server and corpus for dry runs
scripts/                 setup.sh, download.sh, proof.sbatch, dry_run.sh, env.sh
results/<run-id>/        REPORT.md, report.html, summary.json, hypotheses.json, bucket_sheet.md,
                         tables/*.csv, charts/*.svg, stages/* (per cell), log_tails/
```

## Versions

- vLLM 0.33.0 for serving: the latest release, with EAGLE-3, DFlash, DSpark and Gemma 4 MTP.
- vLLM 0.27.1 for the Speculators hidden-states server, the version Speculators' tutorial pins.
- Speculators and Model Optimizer are pinned to the commits in `config/proof.yaml`.

Production runs vLLM 0.26.0. The report's numbers are for 0.33.0, so moving
production up is part of what the results recommend.

Licences: the kit is MIT. Its runtime dependencies are Apache-2.0, MIT or BSD. The
datasets are CNN/DailyMail (Apache-2.0), UltraChat 200k (MIT) and GSM8K (MIT). The
Gemma 4 weights are Apache-2.0. The z-lab DFlash drafter is off by default because
it needs `--trust-remote-code`.

More in [RUNBOOK.md](RUNBOOK.md).
