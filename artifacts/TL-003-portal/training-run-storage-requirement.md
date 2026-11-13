# ThinkLatent Portal · Training runs: where a run lives, the process and the folder for each run id

TL-003 portal · requirement, version 1.0 · 13 Nov 2026 · for the AI engineering team, from Jithin Pradeep, Head of ThinkLatent · written by Claude

This is the requirement behind the boards *Training · a run* and *Training · a run's files*. It says where everything a training run reads and writes is kept, who writes it, and what is kept afterwards. Names in angle brackets are configuration, not fixed names.

## 1. What Jithin decided (13 Nov)

1. Training runs as Slurm jobs on HyperPod. A dedicated S3 bucket holds the runs. Each run has a run id and its own folder under it.
2. During training, what the run needs is brought into the FSx area of the cluster for fast access. When a checkpoint beats the best so far, it is written to the run's folder on S3.
3. Two checkpoints are kept for each stage: the best and the last.
4. The run's folder holds its configuration, its lineage and the list of the data it trained on. The data is listed by pointer, not copied.
5. Once the TL Index run confirms the model works, it is released to a standard place. Projects on the model are then told, and the portal runs each project's own evaluation ahead of them, so that the project team can decide.
6. A run's folder is kept for 180 days after the run ends. The small record of a run that produced a released model travels with the model and is kept as long as the model is.
7. A run's id is readable and meaningful: the model, what the run is for (the project where there is one), and the date.
8. Recipes are kept in the portal. ThinkLatent defines standard recipes at the start, and new ones can be built from the methods that are available. Starting a run freezes a copy of its recipe into the run's folder.
9. If a source withdraws rows while a run that uses them is going, the run finishes and the foundation lead then decides.

## 2. The four places

| Place | What it is | Who writes | Kept |
|---|---|---|---|
| **The training store** · `s3://<store-bucket>/` | Every data set, as versions that never change once cut | The data pipelines, when a version is cut | As long as the data may be held |
| **The runs bucket** · `s3://<runs-bucket>/runs/<run-id>/` | The record of one run: what it was asked to do, what it read, what it produced | The portal at the start and at each decision; the job as it trains | 180 days after the run ends |
| **The working area** · `/fsx/runs/<run-id>/` | The fast copy the job trains from, and its restart checkpoints | The job | Cleared when the run ends |
| **The released models** · `s3://<models-bucket>/released/<model>/<version>/` | What serving loads, with the small record of the run that made it | The portal, at release | As long as the model is kept |

The portal's own database holds the list of runs, their live numbers and every decision. It is what the portal's pages read. The folders are the evidence behind it.

## 3. The run id

`<model>-<what it is for>-<date>-<letter>`, lower case, hyphens only.

| Run | Run id |
|---|---|
| Core, run 7: more examples for choosing the right tool | `core-toolchoice-20261105-a` |
| Shaping trial of Core's base, 20% taken out | `core-shaping20-20261103-a` |
| Domain-Advice version 3, for Advisor desktop | `domainadvice-advisordesktop-20261109-a` |

- *What it is for* is the project's short name when the run is for one project, otherwise two or three words for the purpose.
- The letter separates two runs of the same thing started on the same day.
- The id never changes and is never reused. The portal also shows a plain name ("Shaping trial · 20% taken out"); the id is what names the folders.

## 4. The folder for each run id

```
s3://<runs-bucket>/runs/<run-id>/
├── RUN.json                   the run's card: id, plain name, model, recipe and its version,
│                              who started it, state, stage now, where its released copy is
├── config/
│   ├── recipe.yaml            the recipe exactly as it stood in the portal when the run started
│   ├── resolved.yaml          every setting of every stage, after defaults are filled in
│   ├── environment.json       TLM package commit, container image digest, library versions,
│   │                          seed, cluster and machine types
│   └── slurm/                 the job script and job id of each stage
├── data/
│   ├── <mix>@<version>/
│   │   ├── mix.json           the ask in tags, how it is drawn, the checks it passed, counts by tag
│   │   └── manifest.parquet   one line per file read: its path in the training store,
│   │                          its S3 version id, its checksum, the row numbers taken
│   ├── lineage.json           sources → data set versions → mixes → this run
│   └── withdrawn.jsonl        added later, if a source withdraws rows this run trained on
├── stages/
│   └── <nn>-<stage>/          one folder per stage, for example 02-prune
│       ├── status.json        queued, going, passed, failed or reused; times; GPU-hours
│       ├── checkpoints/
│       │   ├── best/          the best so far on the stage's check
│       │   ├── last/          the last written
│       │   └── POINTERS.json  which step each one is, when it was written, checksums
│       ├── metrics/           loss, speed and GPU use over time
│       ├── logs/
│       ├── check/             the stage's check on the whole TL Index: by pillar, differences,
│       │                      verdict. Question ids only, never the questions
│       └── decision.json      what the portal proposed, what the lead decided, when and why
├── output/
│   ├── model/                 the model as it will be served: weights, tokenizer, settings,
│   │                          and any lighter variants
│   └── model-card.md          what it is, what it learned from by tag, its checks, known limits
├── evaluation/
│   └── tl-index/<edition>/    the whole-Index run that decides release
├── record/
│   └── events.jsonl           every change of state, and who or what made it
└── MANIFEST.sha256            checksums of everything, written when the run ends
```

Rules for the folder:

- **Two checkpoints a stage.** `best/` is replaced only when a checkpoint beats it; `last/` is replaced on a timer and at the stage's end. Nothing else reaches S3. Restart checkpoints stay on FSx.
- **A stage reused from another run is not copied.** Its folder holds one file, `REUSED.json`, that names the other run's `best/`.
- **No rows.** The folder never holds a row of training data or the text of a TL Index question. It holds lists that point to them.
- **Written once.** After the run ends, nothing in the folder changes except `data/withdrawn.jsonl` and the pointer to a released copy in `RUN.json`.

## 5. The working area on FSx

```
/fsx/runs/<run-id>/
├── data/                  the files named in the manifests, copied in at the start
│                          and checked against their checksums
├── work/<nn>-<stage>/     checkpoints for restarting after a failure, temporary files
└── cache/                 tokenised data, a teacher's outputs

/fsx/shared/bases/<base>@<revision>/     open base models, brought in once, read-only
```

- The run trains only from `/fsx/runs/<run-id>/data/`. It takes that copy once, at the start, and uses it for every stage.
- The whole run folder on FSx is cleared when the run ends, and at once for any run not in progress when a withdrawal lands.

## 6. The released model

```
s3://<models-bucket>/released/<model>/<version>/
├── model/                 what serving loads
├── model-card.md
├── PROVENANCE.json        the run id, checksums, who confirmed it, when
└── record/                the small record that travels with the model:
    ├── config/            recipe.yaml, resolved.yaml, environment.json
    ├── data/              every mix.json and manifest, lineage.json, withdrawn.jsonl
    ├── checks/            each stage's check and decision
    ├── tl-index/          the summary of the whole-Index run
    └── events.jsonl
```

There is one step: released. A project's own evaluation results are held with the project, not here.

## 7. The process, and who writes what

| # | Step | Who | Writes |
|---|---|---|---|
| 1 | **Start.** The checks before a run pass. A run id is made. | Portal | `RUN.json`, `config/`, `data/` in the run's folder; a row in its database; stage 1 to Slurm, with the run id |
| 2 | **Bring in.** The files in the manifests are copied from the training store to FSx and checked. The base comes from the shared area. | Job | `/fsx/runs/<run-id>/data/` |
| 3 | **Train.** Restart checkpoints go to FSx. Live numbers go to the portal's database. | Job | `/fsx/.../work/`; the database |
| 4 | **Beat the best.** At each evaluation point, a checkpoint that beats the best is copied to S3. The last is copied on a timer. | Job | `stages/<nn>/checkpoints/best/`, `last/`, `POINTERS.json` |
| 5 | **End the stage.** Final best and last, numbers and logs go to S3. | Job | `stages/<nn>/metrics/`, `logs/`, `status.json` |
| 6 | **Check.** The best checkpoint is scored on the whole TL Index. The portal proposes; the foundation lead decides. | Portal, lead | `stages/<nn>/check/`, `decision.json` |
| 7 | **Next stage, or stop.** A passed check releases the next stage. A failed check stops the run until a person decides. | Portal | Next stage to Slurm; `record/events.jsonl` |
| 8 | **Finish.** The model is written as it will be served, with its card. The whole TL Index is run. | Job, portal | `output/`, `evaluation/tl-index/` |
| 9 | **Release.** The lead confirms it works. The model and its small record are copied to the released models. The catalogue is updated. | Lead, portal | `released/<model>/<version>/`; the pointer in `RUN.json` |
| 10 | **Tell the projects.** Every project on the model is told. The portal runs each project's own evaluation on the released model and shows the result in the project. | Portal | The project's offer |
| 11 | **Each project decides.** A switch travels as an increment. | Project owner | The increment |
| 12 | **Close.** Checksums are written. FSx is cleared. The 180 days begin. | Portal, job | `MANIFEST.sha256` |

## 8. What if the data changes during a run

| What changes | What happens |
|---|---|
| **New data arrives** | It becomes a new version. A run named its versions at the start and is not affected. |
| **A file is changed in place** | It should not be possible: a version is written once. If it happens, the checksum in the manifest no longer matches and the job stops at step 2. The S3 version id in the manifest still reaches the original. |
| **A tag is corrected** | Tags are fixed in a mix at the moment the mix's version is saved. A correction applies from the mix's next version. |
| **Rows are withdrawn by their source** | The only real change. The store cuts a new version without them and removes them from older versions. A run that is going finishes on the copy it took, and is flagged at once. The withdrawn rows are listed in `data/withdrawn.jsonl`. The foundation lead then decides whether its model may be used. The FSx copy is cleared when the run ends. |
| **The run lasts for days** | It makes no difference: the copy is taken once, at the start, for every stage. |

After a withdrawal, a run can no longer be repeated exactly. That is recorded in its folder and shown on the run and on any model built from it.

## 9. What is kept, and for how long

- **A run's folder:** 180 days after the run ends, then deleted. This includes the checkpoints of stopped and failed trials.
- **A released model and its small record:** as long as the model is kept.
- **The portal's database:** every run's numbers and decisions stay, after its folder has gone.
- **FSx:** nothing, once the run ends.

## 10. Recipes

- The portal keeps recipes and their versions.
- ThinkLatent defines the standard recipes at the start: a base from a new open model, continue a model on new data, a domain model on Core, a smaller model from a larger one's answers.
- A new recipe can be built from any method that is available.
- Starting a run freezes the recipe into `config/recipe.yaml`. The job reads only its own folder, never the portal.

## 11. Open choices for AI engineering

Each has a recommendation. None is decided.

1. **How files move between S3 and FSx.** FSx for Lustre can be linked to an S3 prefix so that files load on first read and written files are exported by themselves. *Recommended:* copy explicitly for everything the job writes, so that exactly two checkpoints a stage reach S3; consider a read-only link for bringing data in.
2. **Restart checkpoints.** HyperPod can requeue a job on healthy machines after a failure, and offers a managed way to checkpoint to memory with a backup on S3. *Recommended:* use the requeue; try the managed checkpointing for the restart copies only, never for `best/` and `last/`.
3. **Written once.** *Recommended:* versioning on all three buckets; deny overwrites under a data set version; a lock on `released/`.
4. **The 180 days.** *Recommended:* a lifecycle rule keyed on a tag the portal sets when a run closes, so that a run still going is never deleted.
5. **A checkpoint another run reuses.** The shaping trials reuse the adjusted base of an earlier run. After 180 days that base would be gone. *To be asked of Jithin:* whether a checkpoint that later runs reuse is kept past 180 days.

## 12. Where this is thin

- **Deleting at 180 days removes the evidence of trials that did not release.** The numbers stay in the portal; the weights do not, so a trial cannot be scored again after that.
- **"Best" during training is judged on a quick check.** The whole TL Index is run on that one checkpoint at the stage's end. A checkpoint that was not best on the quick check is never scored on the whole Index.
- **Two checkpoints for each of seven stages is a lot of storage for the largest Core.** Roughly fourteen full copies for a base recipe, before the served model.
- **Nothing here has been built or tried.** The S3 and FSx behaviour is taken from AWS's documentation.

## Sources

- FSx for Lustre, linking a file system to an S3 bucket: https://docs.aws.amazon.com/fsx/latest/LustreGuide/create-dra-linked-data-repo.html
- FSx for Lustre, automatic export to S3: https://docs.aws.amazon.com/fsx/latest/LustreGuide/autoexport-data-repo-dra.html
- FSx for Lustre and S3, loading on first read: https://aws.amazon.com/blogs/storage/new-enhancements-for-moving-data-between-amazon-fsx-for-lustre-and-amazon-s3
- SageMaker HyperPod with Slurm, resuming after a failure: https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-hyperpod-slurm.html
- HyperPod, mounting FSx for Lustre: https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-hyperpod-lifecycle-best-practices-slurm-slurm-setup-with-fsx.html
