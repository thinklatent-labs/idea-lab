# Scout brief · The NVIDIA NeMo training stack, and what TLM should use from it

TL-003 portal · Scout · 13 Nov 2026 · for Jithin Pradeep, Head of ThinkLatent · written by Claude

**The question.** NeMo is now many GitHub repositories. Which are worth using directly for data work, pretraining, post-training and reinforcement learning, given that pruning the base model on the Enterprise's data is the first step of every base?

**How this was done.** NVIDIA's documentation and repository pages were read on 13 Nov 2026. Nothing was run. The GitHub organisation's own listing could not be opened from this session, so star counts and last-commit dates are not checked except where stated. Researched directly, with no research sub-agents.

## 1. Bottom line

1. **NeMo is no longer one package.** The original repository is now speech only. Its language-model collection was deprecated in late 2025 and replaced by two libraries, Megatron-Bridge and AutoModel. Any TLM code that still imports the old NeMo 2.0 language-model collection, or its pruning scripts, is on a path NVIDIA has ended. A migration guide exists.
2. **Seven pieces are worth using directly:** Megatron-Bridge with Model Optimizer (prune, distil, quantise), AutoModel (fine-tuning), NeMo RL (preference and reinforcement stages), NeMo Gym (tasks and checks), Curator (data), Data Designer (made-up data) and Evaluator (benchmarks beside the TL Index). The Nemotron repository is the reference to read first: it holds NVIDIA's own recipes as chains of stages.
3. **Pruning first is supported, and NVIDIA's own findings back the order:** adjust the full model to your data, prune by what your data activates, then distil back from the adjusted full model.
4. **One thing to test before anything else:** whether the pruning path covers the Gemma 4 base that Core uses. The 26B mixture-of-experts Gemma 4 is listed as fully supported; dense Gemma 4 was listed as not supported in one release and appears in the nightly recipes.

## 2. The map

| Repository | What it does | Stage it serves | Verdict |
|---|---|---|---|
| NVIDIA-NeMo/Megatron-Bridge | Training on Megatron-Core with two-way conversion to and from Hugging Face checkpoints. Pretraining, supervised fine-tuning, LoRA and DoRA. Hosts the pruning, distillation and quantisation workflows. | Shaping the base; continued pretraining; large fine-tunes | **Use** |
| NVIDIA/Model-Optimizer (ModelOpt) | Pruning (Minitron; a newer search-based method, Puzzletron, appears in its preview documentation), distillation, quantisation (FP8, INT8, INT4; after training or during it). | Prune, distil, quantise | **Use**, through Megatron-Bridge |
| NVIDIA-NeMo/Automodel | PyTorch-native training of Hugging Face checkpoints with no conversion. Fine-tuning, LoRA and QLoRA, pretraining, distillation. Runs on Slurm. | Supervised fine-tuning and adapters | **Use** |
| NVIDIA-NeMo/RL | Post-training: supervised fine-tuning, DPO, GRPO, DAPO, reward-model training. Generates with vLLM, distributes with Ray, handles multi-turn and tool use, supports LoRA. Replaces NeMo-Aligner. | Preferences and reinforcement learning | **Use** |
| NVIDIA-NeMo/Gym | Environments for reinforcement learning: a data set of tasks, an agent harness, a verifier and state. The verifier turns an attempt into a reward. Its tutorials also cover fine-tuning and preference training from collected attempts. | Tasks and checks | **Use, expect change** (young, 0.x) |
| NVIDIA-NeMo/Curator | Cleaning, filtering, classifying (domain, quality, safety, kind and difficulty of prompt), de-duplicating (exact, near and by meaning), removing items that overlap a benchmark, redacting personal data. Text, image, video, audio. | Data | **Use** |
| NVIDIA-NeMo/DataDesigner | Made-up data from scratch or from seed data. NVIDIA's recipes use it for fine-tuning, tool-use and preference sets. | Data | **Use** |
| NVIDIA-NeMo/Evaluator | Benchmark runs, on Slurm, against Megatron-Bridge and AutoModel checkpoints. | The check at the end of each stage | **Use beside the TL Index** |
| NVIDIA-NeMo/Nemotron | NVIDIA's complete recipes for its own models, each a chain of stages, each stage a step with its own configuration. Also an estimator for machines, time and cost. | Recipes | **Read first; copy the structure** |
| NVIDIA-NeMo/Run | Submits jobs to Slurm (also Kubernetes, Docker, local) from reusable cluster profiles. | Running a stage | **Consider**, if the TLM package's own submitter is thin |
| NVIDIA-NeMo/Skills | Pipelines from made-up data to training to evaluation, moving from a workstation to Slurm with a small change. | Overlaps the two above | **Later** |
| NVIDIA-NeMo/Speech (was NVIDIA/NeMo) | Speech recognition and synthesis. | The speech-recognition model only | **Only for speech** |
| NeMo microservices (Customizer, Evaluator, Data Designer, Safe Synthesizer, Guardrails, Auditor) | A deployed product layer over the same ideas, installed with Helm charts. | — | **Skip for training.** The portal and the TLM package are that layer. |
| NVIDIA/NeMo-Aligner | The earlier alignment library. Deprecated. | — | **Do not start anything on it** |
| NeMo Safe Synthesizer | Private versions of sensitive tables. Early access. | — | **Later**, only if a tabular need appears |

## 3. The order of stages for a TLM base, pruning first

| # | Stage | What it does | Library |
|---|---|---|---|
| 0 | Curate and tag | Clean, de-duplicate, redact, tag by use, pillar and category. Keep anything near the TL Index out. | Curator |
| 1 | Adjust the full base | A light fine-tune of the unpruned base on the Enterprise's data, so that it is the right teacher. | Megatron-Bridge or AutoModel |
| 2 | Prune | Measure which parts of the model the Enterprise's data uses, and remove the rest. Width before depth. | Model Optimizer through Megatron-Bridge |
| 3 | Distil back | The pruned model learns from the adjusted full model's outputs, on the Enterprise's text, until it recovers. | Model Optimizer through Megatron-Bridge |
| 4 | Learn from examples | Supervised fine-tuning, full or adapter, self-healing returns included. | AutoModel or NeMo RL |
| 5 | Learn from preferences | DPO on pairs picked by people or by a judge; a reward model where one is wanted. | NeMo RL |
| 6 | Learn from checks | GRPO or DAPO on tasks whose answers can be checked, in environments with tools. | NeMo RL with NeMo Gym |
| 7 | Make it lighter | Quantise for serving on vLLM. | Model Optimizer |
| 8 | Check at every stage | The TL Index slice the stage is held to, and public benchmarks beside it. | TL Index, Evaluator |

Stages 1 to 3 belong together and are done once per base: together they are "shaping the base". Stages 4 to 6 are repeated as data arrives. NVIDIA's published recipes for its own models follow the same spine: pretraining, then supervised fine-tuning, then reinforcement learning, then quantisation, with its largest model ending in a stage that distils several specialist teachers into one.

## 4. Pruning, in detail

**What the tool does.** It scores the parts of the model by how strongly they activate on a calibration sample, then removes the weakest: hidden size, feed-forward size, attention heads and whole layers. It can prune to an exact shape you name, or search for the best shape under a target size and rank the candidates on a benchmark.

**The defaults, and the two changes that make it ours.** Out of the box it calibrates on 1,024 samples from one of NVIDIA's public data sets, removes at most 20% of depth and 40% of each width dimension, and ranks the ten best candidates on a 5% sample of a public benchmark. For TLM:

- The calibration sample is drawn from the Enterprise's data, by tag. This is the literal meaning of "prune the base to align with company data": the model keeps what the Enterprise's data uses.
- The ranking benchmark is a slice of the TL Index, not a public test.

**What NVIDIA found when it did this itself** (the Minitron reports): pruning width kept more accuracy than pruning depth at the same size, while depth pruning ran faster; and when the base's original training data is not available, which is the case for any open base, fine-tuning the full model on your own data before pruning and distilling made the pruned model noticeably better. Skipping that step hurt.

**Coverage.** The method covers GPT-style, Mamba and hybrid models; preview documentation adds mixture-of-experts models and the language part of vision-language models. Megatron-Bridge lists Gemma, Gemma 2 and Gemma 3. For Gemma 4 it lists the 26B mixture-of-experts model as fully supported; one release listed dense Gemma 4 as not supported, and the nightly documentation carries a pretraining recipe for the dense E4B. Distillation needs teacher and student on the same parallelism strategy.

**Why the Data tab's mix matters here.** A pruning stage needs a small, deliberately mixed calibration set. That is a saved mix drawn by tag from the graph, the same object every other stage uses.

## 5. What this changes in the portal design

- **Training tab.** A recipe is a chain of stages, and the first block of every base recipe is *Shape the base*: adjust, prune, distil back. The methods library names the library each method is built on.
- **Recipe builder.** NVIDIA's recipes are built from steps, each with a declared list of settings. The portal's builder can show exactly those settings for a stage and save the result as a configuration file, so the portal and the code never hold two versions of a recipe.
- **Data tab.** Curator's classifiers are the tagging pipelines. Its benchmark-overlap removal is the "too close to the TL Index" pipeline. A Gym task (one row with the request and what the verifier needs) is the shape of "a task with a check".
- **Running.** A stage is a Slurm job on HyperPod, submitted by the TLM package or through NeMo-Run.

## 6. Where this is thin

- **Nothing was run.** "Effective" rests on NVIDIA training its own models with these libraries and publishing the recipes. That is good evidence the pieces work together at NVIDIA's scale, and weaker evidence for a far smaller cluster and a Gemma base.
- **The libraries are young.** RL, Gym and AutoModel are at 0.x versions and change monthly. Pin each to a commit, as the portal pins the design kit.
- **The organisation's listing was not opened**, so there may be repositories this brief misses, and popularity is not compared.
- **The TLM package was not read.** Which NeMo pieces it uses today is not known here.

## 7. What would confirm or refute it

**Hypothesis.** A Core base pruned on the Enterprise's data and distilled back holds within 2 points of the adjusted full base on every live TL Index pillar, at 70% of its size or less. (Both numbers are proposed here, for the foundation lead to set.)

- **Confirms:** the pruned and distilled base clears that on all five live pillars, and a fine-tune on top of it does no worse than the same fine-tune on the full base.
- **Refutes:** any pillar falls further than that after distillation; or dense Gemma 4 cannot go through the bridge, which would move pruning off this stack.

## 8. Asks

- **Foundation lead (Claude until named):** run the Gemma 4 check on the smallest Core: convert, prune 20% of width on a 1,024-item calibration mix of the Enterprise's data, distil back, score on the TL Index.
- **AI engineering lead (Claude until named):** say which NeMo pieces the TLM package uses today, and whether anything still imports the NeMo 2.0 language-model collection.

## Sources

- NVIDIA-NeMo organisation overview and repository table: https://github.com/nvidia-nemo
- NeMo 2.0 deprecation notice (speech-only pivot): https://pypi.org/project/nemo-toolkit/
- Megatron-Bridge overview: https://docs.nvidia.com/nemo/megatron-bridge/latest/
- Megatron-Bridge, supported models: https://docs.nvidia.com/nemo/megatron-bridge/0.6.0/models/README.html
- Megatron-Bridge, pruning: https://docs.nvidia.com/nemo/megatron-bridge/latest/modelopt/pruning.html
- Megatron-Bridge, distillation: https://docs.nvidia.com/nemo/megatron-bridge/latest/modelopt/distillation.html
- Megatron-Bridge, model optimisation overview: https://docs.nvidia.com/nemo/megatron-bridge/0.6.0/modelopt/README.html
- Megatron-Bridge, Gemma 4 text bridge: https://docs.nvidia.com/nemo/megatron-bridge/latest/apidocs/bridge/bridge.models.gemma.gemma4_bridge.html
- Megatron-Bridge, Gemma 4 dense recipe (nightly): https://docs.nvidia.com/nemo/megatron-bridge/nightly/apidocs/bridge/bridge.recipes.gemma.h100.gemma4.html
- Model Optimizer, pruning guide: https://nvidia.github.io/Model-Optimizer/guides/3_pruning.html
- "LLM Pruning and Distillation in Practice: The Minitron Approach": https://arxiv.org/abs/2408.11796
- NeMo AutoModel, key features: https://docs.nvidia.com/nemo/automodel/latest/about/key-features.html
- NeMo RL: https://docs.nvidia.com/nemo/rl/0.3.0/index.html
- NeMo Gym, key terminology: https://docs.nvidia.com/nemo/gym/about/concepts/key-terminology/
- NeMo Curator: https://github.com/NVIDIA-NeMo/Curator
- Nemotron training recipes: https://docs.nvidia.com/nemotron/nightly/index.html and https://github.com/NVIDIA-NeMo/Nemotron
- Nemotron step for distillation: https://docs.nvidia.com/nemotron/latest/train-models/reference/optimize/distill.html
- NeMo-Run with AutoModel: https://docs.nvidia.com/nemo/automodel/latest/launcher/nemo-run.html
- NeMo Skills: https://nvidia-nemo.github.io/Skills
- NeMo Framework changelog (Evaluator): https://docs.nvidia.com/nemo-framework/user-guide/25.11/changelog.html
- NeMo microservices overview: https://docs.nvidia.com/nemo/microservices/latest/about/index.html
- Survey of post-training methods: https://arxiv.org/abs/2604.07941
