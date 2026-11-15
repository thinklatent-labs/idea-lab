# Runbook

## Before the first run

1. **Node.** You need one `ml.p5.48xlarge` (8× H100 80 GB, NVSwitch) in the HyperPod Slurm cluster, with FSx at `/fsx`. Other paths go in `scripts/env.sh` (`FASTLANE_*`).
2. **Environments.** Run `bash scripts/setup.sh` on the login node. It makes four Python environments under `/fsx/envs`. For a serving-only run, `bash scripts/setup.sh serve` is enough.
3. **Weights and prompts.** Run `PLAN=standard bash scripts/download.sh` on the login node. It downloads the plan's weights (about 150 GB for standard) to `/fsx/models`. It also builds the prompt library in `/fsx/fastlane/data`, which needs internet access to reach Hugging Face datasets. All the repositories used are public. Set `HF_TOKEN` if your network or rate limits need it.
4. **Optional check.** `bash scripts/dry_run.sh` runs every stage against simulated servers in about 4 minutes.

## Running

```bash
PLAN=quick sbatch scripts/proof.sbatch                 # first: shakes out the real stack in about 3 h
PLAN=standard PUBLISH=1 sbatch scripts/proof.sbatch    # then the proof
```

To follow a run:

- `tail -f slurm-fastlane-proof-<jobid>.out`
- `python -m fastlane status`, which shows the stages and their times
- `results/<run-id>/stages/<stage>/`, where each finished cell appears as a JSON file

To resume after a time limit, a node failure or a fix, submit again with the same id:

```bash
RUN_ID=<run-id> PLAN=standard sbatch scripts/proof.sbatch
```

Finished cells, scenarios and stages are skipped.

To rerun one stage, use `python -m fastlane stage grid --run-id <run-id> --force`. Delete that stage's folder under `results/<run-id>/stages/` first if you want its cells measured again.

## When something fails

The kit never lets one failure stop the proof. A profile that will not start is recorded in `stages/<stage>/FAILED__<profile>.json`, and the run moves on. The report lists every failure with the end of its log.

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| A profile fails at start-up, and the retry without optional flags fails too | The installed vLLM lacks a method or flag | Read `logs/<stage>/<profile>.r0.log`. Remove that drafter from the plan (`--set`), or pin another vLLM in `versions.vllm_serve` and rerun setup. |
| MTP profiles fail | Gemma 4 MTP needs a vLLM with the Gemma4 MTP path. 0.33.0 has it. | Check `vllm --version` in the serve environment |
| `suffix@8` fails | `arctic-inference` is missing | `uv pip install --python /fsx/envs/fastlane-serve/bin/python arctic-inference` |
| Out of memory at TP1 or TP2 | 31B FP8 with a 12,288 context at high concurrency | Lower `max_num_seqs` in `serving.modes.bulk`, or drop the TP1 layout |
| Load scenarios show client lag p99 > 1 s | The client cannot keep up | Shorten `load.duration_s`, or run with fewer applications |
| Train: the hidden-states server never becomes healthy | vLLM 0.27.1 cannot load Gemma 4 on this driver | Read `logs/train/hs_server_eagle3.log`. Set `versions.vllm_hidden_states` to a newer vLLM and rerun `setup.sh train` |
| Train: `prepare-data` fails on render | The render server's max length is too small | It is set to `seq_length + 1024`. Lower `train.seq_length`. |
| Model Optimizer fails | Its examples change between commits | Read `logs/train/modelopt_*.log`. The Speculators route is independent and still reports. |
| Publish: `git push` fails | No push access from the node | Run `python -m fastlane publish --run-id <id>` from a machine that has access, or set `FASTLANE_S3=s3://bucket/path` to copy results to S3 |

## What a run leaves behind

- `results/<run-id>/REPORT.md`: verdicts first, then the bucket sheet, then each stage.
- `results/<run-id>/summary.json`: verdicts and key numbers (the lab reads this).
- `results/<run-id>/stages/<stage>/<cell>.json`: one summary per cell, with `<cell>.requests.jsonl.gz` holding every call.
- `results/<run-id>/stages/*/SERVER__<profile>.json`: the exact vLLM command line of every profile.
- `results/<run-id>/logs/`: full server logs. These stay on FSx and are not pushed; `log_tails/` is pushed instead.
- `/fsx/fastlane/work/<run-id>/train/`: training data, hidden states and checkpoints. These are large and are not pushed.

## Two nodes (H5)

```bash
PLAN=two_node sbatch --nodes=2 scripts/proof.sbatch
```

Replicas on the second node start through `srun --overlap`. The router runs on the first node.

## Changing the experiment

- **Bucket edges and the traffic mix:** `buckets:` and `load.apps:` in `config/proof.yaml`. Update them when the Langfuse lengths arrive. They do not change the hypotheses.
- **Hypothesis thresholds:** `hypotheses:`. Change these only with a decision line in the register.
