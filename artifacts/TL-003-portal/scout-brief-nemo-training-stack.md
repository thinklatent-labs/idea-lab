# Scout brief · The NVIDIA NeMo training stack, and what TLM should use from it

TL-003 portal · Scout · 13 Nov 2026 · version 2 · for Jithin Pradeep, Head of ThinkLatent · written by Claude

**The question.** NeMo is now many GitHub repositories. Which are worth using directly for data work, pretraining, post-training and reinforcement learning, given that pruning the base model on the Enterprise's data is the first step of every base?

**How this was done.** NVIDIA's documentation and repository pages were read on 13 Nov 2026. Nothing was run. The GitHub organisation's own listing could not be opened from this session, so star counts and last-commit dates are not checked except where stated. Researched directly, with no research sub-agents.

**What changed in version 2.** Version 1 recommended Megatron-Bridge with Model Optimizer for shaping the base. Jithin corrected this the same day: the team decided not to use Megatron-Bridge during training and has been executing without it, because the TLM bases are Gemma and Phi. The brief now takes that as given.

## 1. Bottom line

1. **NeMo is no longer one package.** The original repository is now speech only. Its language-model collection was deprecated in late 2025 and replaced by two libraries, Megatron-Bridge and AutoModel. Any TLM code that still imports the old NeMo 2.0 language-model collection, or its pruning scripts, is on a path NVIDIA has ended.
2. **The team trains without Megatron-Bridge, and the reading supports that choice.** The bridge's list of supported model families has no Phi, and its support for dense Gemma 4 was incomplete. Staying on Hugging Face checkpoints also keeps every model in the format vLLM serves, with no conversion step to verify.
3. **Six pieces are worth using directly:** AutoModel as the training spine (continued pretraining, fine-tuning, adapters, distilling back), NeMo RL on its PyTorch-native backend, NeMo Gym, Curator, Data Designer and Evaluator. Model Optimizer is for quantisation. The Nemotron repository is the reference to read first: it holds NVIDIA's own recipes as chains of stages.
4. **Pruning stays the TLM package's own code.** NVIDIA's documented pruning for language models (Minitron) runs on the Megatron side, so it is not on this path. Its findings still apply to the order: adjust the full base to your data, prune by what your data uses, distil back. AutoModel can do the adjusting and the distilling back.

## 2. The map

| Repository | What it does | Stage it serves | Verdict |
|---|---|---|---|
| NVIDIA-NeMo/Automodel | PyTorch-native training of Hugging Face checkpoints with no conversion. Continued pretraining, fine-tuning, LoRA and QLoRA, and a distillation recipe in which a student learns from a frozen teacher's outputs. Lists Gemma and Phi among the families it covers. Runs on Slurm. | Adjusting the base, distilling back, fine-tuning, adapters | **Use: the spine** |
| NVIDIA-NeMo/RL | Post-training: supervised fine-tuning, DPO, GRPO, DAPO, reward-model training. Has a PyTorch-native backend beside its Megatron one, so it needs no Megatron. Generates with vLLM, distributes with Ray, handles multi-turn and tool use, supports LoRA. Replaces NeMo-Aligner. | Preferences and reinforcement learning | **Use**, on the PyTorch-native backend |
| NVIDIA-NeMo/Gym | Environments for reinforcement learning: a data set of tasks, an agent harness, a verifier and state. The verifier turns an attempt into a reward. Its tutorials also cover fine-tuning and preference training from collected attempts. | Tasks and checks | **Use, expect change** (young, 0.x) |
| NVIDIA-NeMo/Curator | Cleaning, filtering, classifying (domain, quality, safety, kind and difficulty of prompt), de-duplicating (exact, near and by meaning), removing items that overlap a benchmark, redacting personal data. Text, image, video, audio. | Data | **Use** |
| NVIDIA-NeMo/DataDesigner | Made-up data from scratch or from seed data. NVIDIA's recipes use it for fine-tuning, tool-use and preference sets. | Data | **Use** |
| NVIDIA-NeMo/Evaluator | Benchmark runs, on Slurm, against trained checkpoints. | The check at the end of each stage | **Use beside the TL Index** |
| NVIDIA/Model-Optimizer (ModelOpt) | Quantisation (FP8, INT8, INT4; after training or during it), distillation, and pruning. Its language-model pruning, Minitron, is built for Megatron models. A Hugging Face-side method, Puzzletron, appears only in preview documentation. | Make it lighter | **Use for quantisation.** Watch Puzzletron. |
| NVIDIA-NeMo/Nemotron | NVIDIA's complete recipes for its own models, each a chain of stages, each stage a step with its own configuration, including an AutoModel fine-tuning step. Also an estimator for machines, time and cost. | Recipes | **Read first; copy the structure** |
| NVIDIA-NeMo/Run | Submits jobs to Slurm (also Kubernetes, Docker, local) from reusable cluster profiles. | Running a stage | **Consider**, if the TLM package's own submitter is thin |
| NVIDIA-NeMo/Megatron-Bridge | Training on Megatron-Core with conversion to and from Hugging Face checkpoints. | — | **Not used.** The team's decision. |
| NVIDIA-NeMo/Skills | Pipelines from made-up data to training to evaluation, moving from a workstation to Slurm with a small change. | Overlaps the above | **Later** |
| NVIDIA-NeMo/Speech (was NVIDIA/NeMo) | Speech recognition and synthesis. | The speech-recognition model only | **Only for speech** |
| NeMo microservices (Customizer, Evaluator, Data Designer, Safe Synthesizer, Guardrails, Auditor) | A deployed product layer over the same ideas, installed with Helm charts. | — | **Skip for training.** The portal and the TLM package are that layer. |
| NVIDIA/NeMo-Aligner | The earlier alignment library. Deprecated. | — | **Do not start anything on it** |
| NeMo Safe Synthesizer | Private versions of sensitive tables. Early access. | — | **Later**, only if a tabular need appears |

## 3. The order of stages for a TLM base, pruning first

| # | Stage | What it does | Built on |
|---|---|---|---|
| 0 | Curate and tag | Clean, de-duplicate, redact, tag by use, pillar and category. Keep anything near the TL Index out. | Curator |
| 1 | Adjust the full base | A light fine-tune of the unpruned base on the Enterprise's data, so that it is the right teacher. | AutoModel |
| 2 | Prune | Measure which parts of the model the Enterprise's data uses, and remove the rest. | The TLM package's own pruning |
| 3 | Distil back | The pruned model learns from the adjusted full model's outputs, on the Enterprise's text, until it recovers. | AutoModel |
| 4 | Learn from examples | Supervised fine-tuning, full or adapter, self-healing returns included. | AutoModel or NeMo RL |
| 5 | Learn from preferences | DPO on pairs picked by people or by a judge; a reward model where one is wanted. | NeMo RL |
| 6 | Learn from checks | GRPO or DAPO on tasks whose answers can be checked, in environments with tools. | NeMo RL with NeMo Gym |
| 7 | Make it lighter | Quantise for serving on vLLM. | Model Optimizer |
| 8 | Check at every stage | The TL Index slice the stage is held to, and public benchmarks beside it. | TL Index, Evaluator |

Stages 1 to 3 belong together and are done once per base: together they are "shaping the base". Stages 4 to 6 are repeated as data arrives. NVIDIA's published recipes for its own models follow the same spine: pretraining, then supervised fine-tuning, then reinforcement learning, then quantisation.

## 4. Pruning without the bridge

**What is lost.** NVIDIA's documented pruning for language models scores parts of a model by how strongly they activate on a calibration sample and removes the weakest, across width and depth, and can search for the best shape under a target size. It is built for Megatron models and reached through Megatron-Bridge. Off the bridge, it is not available.

**What still carries over from NVIDIA's own reports on it.**

- *The order.* When a base's original training data is not available, which is the case for Gemma and Phi, fine-tuning the full model on your own data before pruning and distilling made the pruned model noticeably better. This is the literal meaning of "prune the base to align with company data".
- *Which dimension.* Pruning width kept more accuracy than pruning depth at the same size, while depth pruning ran faster.
- *What a pruning stage has to expose.* A calibration sample (NVIDIA's default is about a thousand items), a limit per dimension, and a way to rank candidates. For TLM the sample is a mix of the Enterprise's data drawn by tag, and the ranking is a slice of the TL Index.

**What replaces it.** The team's own pruning in the TLM package. AutoModel covers the two stages either side of it: the light fine-tune before, and distilling back after, where a student learns from a frozen teacher's outputs. One limit to check: an early release required teacher and student to share a tokenizer, which a pruned copy of the same base does.

**Why the Data tab's mix matters here.** A pruning stage needs a small, deliberately mixed calibration set. That is a saved mix drawn by tag from the graph, the same object every other stage uses.

## 5. What this changes in the portal design

- **Training tab.** A recipe is a chain of stages, and the first block of every base recipe is *Shape the base*: adjust, prune, distil back. The methods library names what each method is built on; for Prune that is the TLM package, not a NeMo library.
- **Recipe builder.** NVIDIA's recipes are built from steps, each with a declared list of settings. The portal's builder can show exactly those settings for a stage and save the result as a configuration file, so the portal and the code never hold two versions of a recipe. For Prune the settings come from the TLM package, which this brief has not seen.
- **Data tab.** Curator's classifiers are the tagging pipelines. Its benchmark-overlap removal is the "too close to the TL Index" pipeline. A Gym task (one row with the request and what the verifier needs) is the shape of "a task with a check".
- **Running.** A stage is a Slurm job on HyperPod, submitted by the TLM package or through NeMo-Run.

## 6. Where this is thin

- **Nothing was run.** "Effective" rests on NVIDIA training its own models with these libraries and publishing the recipes. That is good evidence the pieces work together at NVIDIA's scale, and weaker evidence for a far smaller cluster with Gemma and Phi bases.
- **Pruning is outside what this brief can vouch for.** It is the team's own code and was not read. Version 1 got this row wrong by recommending the bridge without knowing the team had already ruled it out.
- **The libraries are young.** RL, Gym and AutoModel are at 0.x versions and change monthly. Pin each to a commit, as the portal pins the design kit.
- **The organisation's listing was not opened**, so there may be repositories this brief misses, and popularity is not compared.

## 7. What would confirm or refute it

**Hypothesis.** A Core base pruned on the Enterprise's data and distilled back holds within 2 points of the adjusted full base on every live TL Index pillar, at 70% of its size or less. (Both numbers are proposed here, for the foundation lead to set.)

- **Confirms:** the pruned and distilled base clears that on all five live pillars, and a fine-tune on top of it does no worse than the same fine-tune on the full base.
- **Refutes:** any pillar falls further than that after distilling back.

## 8. Asks

- **Foundation lead (Claude until named):** say which pruning method the TLM package uses and which settings it exposes, so the recipe builder's Prune stage shows the right ones.
- **AI engineering lead (Claude until named):** say which NeMo pieces the TLM package uses today, and whether anything still imports the NeMo 2.0 language-model collection.

## Sources

- NVIDIA-NeMo organisation overview and repository table: https://github.com/nvidia-nemo
- NeMo 2.0 deprecation notice (speech-only pivot): https://pypi.org/project/nemo-toolkit/
- NeMo AutoModel, key features: https://docs.nvidia.com/nemo/automodel/latest/about/key-features.html
- NeMo AutoModel, distillation recipe: https://docs.nvidia.com/nemo/automodel/latest/recipes-e2e-examples/knowledge-distillation
- NeMo AutoModel container, model coverage: https://catalog.ngc.nvidia.com/orgs/nvidia/containers/nemo-automodel
- NeMo RL: https://docs.nvidia.com/nemo/rl/0.3.0/index.html
- NeMo Gym, key terminology: https://docs.nvidia.com/nemo/gym/about/concepts/key-terminology/
- NeMo Curator: https://github.com/NVIDIA-NeMo/Curator
- Nemotron training recipes: https://docs.nvidia.com/nemotron/nightly/index.html and https://github.com/NVIDIA-NeMo/Nemotron
- NeMo-Run with AutoModel: https://docs.nvidia.com/nemo/automodel/latest/launcher/nemo-run.html
- NeMo Skills: https://nvidia-nemo.github.io/Skills
- NeMo Framework changelog (Evaluator): https://docs.nvidia.com/nemo-framework/user-guide/25.11/changelog.html
- NeMo microservices overview: https://docs.nvidia.com/nemo/microservices/latest/about/index.html
- Megatron-Bridge, supported models: https://docs.nvidia.com/nemo/megatron-bridge/0.6.0/models/README.html
- Megatron-Bridge, Gemma 4 text bridge: https://docs.nvidia.com/nemo/megatron-bridge/latest/apidocs/bridge/bridge.models.gemma.gemma4_bridge.html
- Megatron-Bridge, pruning (for reference): https://docs.nvidia.com/nemo/megatron-bridge/latest/modelopt/pruning.html
- Model Optimizer, pruning guide: https://nvidia.github.io/Model-Optimizer/guides/3_pruning.html
- "LLM Pruning and Distillation in Practice: The Minitron Approach": https://arxiv.org/abs/2408.11796
- Survey of post-training methods: https://arxiv.org/abs/2604.07941
