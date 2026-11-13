# ThinkLatent Portal (portal): model training and release requirement, v1.1, 2026-11-13

Lab session · TL-003 portal · Spec. Jithin settled how training works above the project (D-275): the foundation team continues training an existing model from its page in the portal, the run is visible while it runs, and the new version is then offered to every project on the model. This document says what the training job and the backend must report so the two boards drawn for it ("A model's Training tab" and "A new version offered to a project") can be filled from real data. It sits beside the trace and session requirement and the self-healing and training requirement.

**Version 1.1 (13 Nov).** The order after a run changed (D-301): a version is now released once the TL Index run confirms it works, and each project's own evaluation is run after release, not before. Recipes, runs with stages inside, and where a run's files live are in the newer requirement *Training runs: where a run lives, the process and the folder for each run id*; where the two differ on those points, that one holds. Decision 2 below is extended by it: a run now starts from a recipe, standard or built from the methods available.

Status words used in the tables:

- **The job writes it**: the training job (Slurm on HyperPod, running the TLM package) writes it to a store the portal reads. Jithin: the job keeps writing to a database and the portal picks it up, so nobody has to go to the backend.
- **The foundation team does it**: an action in the portal by someone with the foundation team's IAM role.
- **Portal works it out**: derived when read.
- **A runner writes it**: the TL Index runner, a project's evaluation runner, or self-healing, after the run.
- **To check**: to be confirmed by AI engineering against the training package as it is.

## 1. Decisions this rests on (12 Nov)

1. **Only the foundation team trains a shared model**, by IAM role, from the model's Training tab.
2. **Only "more data on an existing model".** A run starts here only where the training package already exists for that model. A new method or research is development work and stays outside the portal.
3. **The foundation team finds and prepares the data.** Project teams do not bring data sets. Data sets are placed in the training store first; the run points at them.
4. **Why a run happens is on the same page**: what projects reported while using the model, and the kinds of gap self-healing found across the projects on it. What self-healing built in those projects may be used in the run, inside the backend.
5. **The run is visible while it runs**: progress, loss on training and held-out data, held-out checks at each checkpoint, the log, and GPU use on the cluster.
6. **Nobody outside the foundation team sees a run.** They see the version when it is released.
7. **After a run, four steps, always in this order** (changed in v1.1): the whole TL Index is run and the foundation lead confirms the version works; the version is released and every project on the model is told; the portal runs each project's own evaluation on the released version, with the project's own gains re-applied first, so that the results are waiting; each project then decides, and a switch travels as an increment with a canary, or the project stays.
8. **No row of any data set is shown**, here or anywhere in the portal.

## 2. The shape

```
Model
  Version                      the one in service
    Run                        one continued-training run on it
      Data set in the run      a name, a count, its checks: never its rows
      Progress sample          written every 30 seconds
      Checkpoint               with its held-out check results
      Cluster sample           GPU use on the cluster
      Log line
    Candidate version          what the run produced
      Index run                the TL Index, whole edition; the foundation lead confirms
      Release                  only after the Index run confirms it works
        Project check          one per project on the model, run on the released
                               version, gains re-applied first
        Offer                  one per project, with that project's results
          Switch               an increment, a change request, a canary
```

## 3. Fields

### 3.1 Why a run (the two lists above the run)

| Field | Type | Where it comes from |
|---|---|---|
| `mt.reported[]`: problem id, one-line title, project and feature, date, how many other projects say the same | list | Requests: problems logged against this model (open to everyone on the model's Overview) |
| `mt.reported[].in_run` (in this run, not in this run) | enum | The foundation team does it |
| `mt.gap_kinds[]`: the kind of gap in plain words, how many features show it, in how many it is confirmed by its owner | list | Portal works it out from `sh.gap.*` across the projects on this model and the models built on it |
| `mt.gap_kinds[].handling` (in this run, not in this run, handled in its project) | enum | The foundation team does it |
| `mt.brought_back.count`, `mt.brought_back.features` | int | A runner writes it: examples from self-healing made available to this run, as counts |

### 3.2 Setting a run up

| Field | Type | Where it comes from |
|---|---|---|
| `mt.run.id`, `tl.model.id`, `mt.run.base_version`, `mt.run.would_become` | string | Portal |
| `mt.run.started_by`, `mt.run.started_at`, `mt.run.started_from` (portal, outside) | mixed | The foundation team does it; a run started outside the portal is still recorded here |
| `mt.run.datasets[]`: name, kind (public, brought back from self-healing, replay of an earlier mix), example count, licence check with its date, format check, a reference to where it is stored | list | The foundation team picks them; the checks are written by the training store |
| `mt.run.replay_share` (how much of the last mix is replayed so nothing learned is lost) | share | The foundation team does it |
| `mt.run.recipe_ref` (the commit of the TLM package) and `mt.run.new_method` (always false here) | string, bool | The job writes it. A run that needs a new method cannot be started from the portal |
| `mt.run.machines` (how many GPUs, which cluster), `mt.run.total_steps` | mixed | The foundation team asks; the job confirms |
| `mt.run.dry_run`: 60 steps, passed or not, what failed, the estimate of time and cost that came out of it | record | The job writes it |

### 3.3 Progress (every 30 seconds)

| Field | Type | Where it comes from |
|---|---|---|
| `mt.run.status` (queued, dry run, running, paused, stopping, checking, done, failed, cancelled) | enum | The job writes it |
| `mt.run.step`, `mt.run.epoch`, `mt.run.tokens_per_second` | number | The job writes it |
| `mt.run.eta`, `mt.run.ends_about` | duration, time | The job writes it |
| `mt.run.cost_so_far` | money | Portal works it out from machine time |
| `mt.run.heartbeat_at` (so a silent job is seen as silent, not as running) | timestamp | The job writes it |
| `mt.run.fail_reason`, `mt.run.last_good_checkpoint` | text, ref | The job writes it |

### 3.4 Curves

| Field | Type | Where it comes from |
|---|---|---|
| `mt.curve.train_loss` by step | series | The job writes it |
| `mt.curve.heldout_loss` at each evaluation step | series | The job writes it |
| `mt.curve.learning_rate`, `mt.curve.grad_norm` by step | series | The job writes them; shown on request |

### 3.5 Checkpoints and held-out checks

| Field | Type | Where it comes from |
|---|---|---|
| `mt.checkpoint.step`, `mt.checkpoint.saved_at`, `mt.checkpoint.ref`, `mt.checkpoint.kept`, `mt.checkpoint.best` | mixed | The job writes it |
| `mt.heldout.sets[]`: name, how many items, never trained on | list | The foundation team sets them with the run |
| `mt.heldout.score` per set per checkpoint | number | The job writes it |
| `mt.heldout.rule` per set (aim for a level, or must not drop) and `mt.heldout.base` (the same set on the base version) | record | The foundation team sets the rule; a runner writes the base once |

### 3.6 The cluster

| Field | Type | Where it comes from |
|---|---|---|
| `mt.gpu[]`: busy share, memory used and total, per GPU of the run | list, sampled | The job or the cluster's own counters (to check which) |
| `mt.cluster.on_this_run`, `mt.cluster.on_other_jobs`, `mt.cluster.free`, `mt.cluster.queue_behind[]` | int, list | The scheduler |
| `mt.cluster.serving_separate` (training never takes serving machines) | bool | Portal works it out from the deployment record |

### 3.7 The log

| Field | Type | Where it comes from |
|---|---|---|
| `mt.log[]`: time, level (info, warning, error), text | lines | The job writes it |
| `mt.log.warnings`, `mt.log.errors` | int | Portal works it out |

The job must never write an example, or any part of one, into the log.

### 3.8 Controls

| Field | Type | Where it comes from |
|---|---|---|
| `mt.control[]`: start, pause, resume, stop keeping the last checkpoint; who and when | list | The foundation team does it; every one is kept |

### 3.9 After the run

| Field | Type | Where it comes from |
|---|---|---|
| `mt.index.edition`, overall and each pillar for the candidate and for the base, and `mt.index.verdict` (better where it aimed and level elsewhere, or stops here) | record | The TL Index runner writes it |
| `mt.project_check[]`, written after release, per project on the model or on a model built on it: `started_at`, `finished_at`, the released version it ran on, whether its own gains were re-applied (and the run that did it), every line of its three checks for today's version and the candidate, and a verdict | list | Self-healing, the TL Index runner and the project's evaluation runner write it (`sh.check.*` in the self-healing requirement) |
| `mt.release.version`, `mt.release.at`, `mt.release.confirmed_by` (the foundation lead, on the TL Index run), `mt.release.notes` (what is new, in plain words), `mt.release.run_id` (the run's folder, see the run storage requirement) | record | The foundation lead does it |
| `mt.lineage[]` (what was built from what, down to each project's own version) | graph | Portal works it out |
| `mt.offer[]` per project: offered at, seen by, decision (plan the switch, not now), decided by and when | list | Portal; the decision is the project team's |
| `mt.switch`: the increment, the change request reference (approved outside), the canary's stages, what it watches, the way back and until when the old version is kept | record | Portal and the gateway |

## 4. Who sees what

- **The foundation team** (IAM role): everything in 3.1 to 3.8, and the controls.
- **Everyone else:** nothing of a run. After release: the new version on the model's page with its TL Index result and lineage.
- **A project's members:** the offer for their project, with their own results (3.9).
- **Problems projects logged against the model** are open to everyone, as they are today.

## 5. Every number on the two boards, from these fields

| The board shows | Worked out as |
|---|---|
| "What projects reported" with "in this run" tags | `mt.reported[]` |
| "What self-healing found" with how many features | `mt.gap_kinds[]`; "brought back: 11.2k examples from 4 features" is `mt.brought_back.*` |
| Run 7 · step 4,230 of 9,000 · 47% | `mt.run.step`, `mt.run.total_steps` |
| The two loss lines and the checkpoint marks | `mt.curve.*`, `mt.checkpoint.step` |
| Time left, speed, checkpoints kept, cost so far | `mt.run.eta`, `mt.run.tokens_per_second`, `mt.checkpoint.kept`, `mt.run.cost_so_far` |
| What is in this run, with counts | `mt.run.datasets[]`, `mt.run.replay_share` |
| Held-out checks at each checkpoint, with what each is held to | `mt.heldout.*` |
| The cluster | `mt.gpu[]`, `mt.cluster.*` |
| The log's last lines, warnings and errors | `mt.log[]` |
| When it ends: four steps in the new order, and who is waiting | `mt.index.*`, `mt.release.*`, `mt.project_check[]`, `mt.offer[]` |
| On the offer: where it comes from | `mt.lineage[]`, `mt.release.notes` |
| On the offer: today's version beside the one offered, on every line | `mt.project_check[]` for that project |
| On the offer: if you plan the switch | `mt.switch` |

## 6. Thin spots and open questions

- Re-applying each project's own gains on a new base is a training run per project per release. Its time and cost are not known, and with many projects it may be what limits how often a model can be released.
- "Level elsewhere" has no number. The boards treat a pillar as level when the intervals overlap; whether that is the rule is for the foundation team to say.
- Settled in v1.1: the foundation lead confirms a version on its TL Index run, and that is the release. The Head of ThinkLatent signs off each monthly TL Index edition, not each release.
- New in v1.1: a version is now released before any project has checked it. A project sees "a new version is ready" before its own results exist. The offer must say plainly that its evaluation is still running, and how long that takes; with many projects the wait may be long.
- What the canary watches, and the level at which it rolls back on its own, are drawn as examples (thumbs, a requirement's score, time). They need to be set per feature.
- "Version 2 is kept in service for as long as a project runs on it" is drawn on the offer. That is a cost: every version kept is machines kept. The real rule for retiring a version is not decided.
- A project that says "not now" twice falls behind the base. Whether there is a point at which staying is no longer allowed is not decided.
- The self-healing data used in a run is counted here, never shown. That it is used at all is not explained to project teams (the self-healing requirement, decision 15).
- Whether the job can write every 30 seconds without slowing training, and where it writes, is for AI engineering to say.

## Sources

Jithin's answers of 12 Nov 2026 (D-275) and of 13 Nov 2026 (D-301, D-302); the boards "A model's Training tab" and "A new version offered to a project" on the design canvas; the self-healing and training requirement v1.2 and the trace and session requirement v1.3 for the fields they share.
