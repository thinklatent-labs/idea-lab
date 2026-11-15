# Scout brief: Gemma on Trainium with vLLM (TL-022 fast-lane), 2026-11-16

TL-022 fast-lane · Seed · Scout · engineering material · for the Trainium track (Phase 2b) of the roadmap
Question from Jithin: has anyone got Gemma working on Trainium with vLLM, and what will block us?

## Answer

Nobody we found serves Gemma 4 on Trainium through vLLM.

- **AWS.** AWS's own stack does not support Gemma. The supported list for vLLM with NxD
  Inference is Llama 2/3.1/3.3, Llama 4, Qwen 2.5 and 3, Qwen2-VL, Qwen3-VL and Pixtral.
- **One community engineer.** He hand-ported the whole Gemma 4 family, 31B included, to
  Inferentia2, and ran the same image on Trn1. He bypassed vLLM because the AWS stack
  could not express the architecture:
  - optimum-neuron and the Neuron vLLM backend have no Gemma 4 model class;
  - the public Neuron vLLM/NxD endpoint loaded Gemma 4 and served fluent-looking gibberish.
- **The hand port's limits.** It compiles for fixed shapes (512 tokens in his demo,
  128 of them prompt), ignores tool definitions and has no speculative decoding. It
  reaches about 44 tok/s for E2B on one Inferentia2.
- **The closest non-NVIDIA precedent.** Gemma 4 31B on Intel Gaudi 3 via vLLM-Gaudi.
  It needed a sliding-window KV-cache fix (ring buffers), which took memory bandwidth
  use from 37% to 59% and decode speed up 1.6×.
- **Treat "it just works" with suspicion.** Guides that show
  `vllm serve google/gemma-4-31b-it --device neuron` working on Inferentia contradict
  these field reports.

## Blockers, most likely first

1. **No model class.** The Core has to be onboarded into the vLLM Neuron plugin (beta,
   Trn2 and Trn3 only), implemented with torch-neuronx and NKI kernels. That is most of
   the work.
2. **Gemma 4's own features.** Each one must be reimplemented, and each is a place to be
   silently wrong. From vLLM 0.33's Gemma 4 code and the reports:
   - **Interleaved attention:** 50 sliding-window layers (window 1,024) and 10 global
     layers in the 31B.
   - **Different shapes per layer type:** head dimension 256 on sliding layers and 512 on
     global ones, and different KV-head counts. Few KV heads on global layers do not
     split evenly across tensor-parallel ranks; the 12B's single global KV head could not
     be split even two ways.
   - **K equals V on global layers** (`attention_k_eq_v`).
   - **Dual RoPE:** standard on sliding layers, proportional on global ones.
   - **Logit soft-capping** (tanh at 30) over a 262,144-token vocabulary.
   - **Sliding-window KV handling.** The new plugin already trims block tables for
     sliding-window layers, which is a good sign.
3. **Silent wrongness.** The vendor path produced fluent gibberish without failing.
   Every step of the port needs greedy outputs compared token for token with the GPU,
   against a reference you trust. The porter warns that a broken reference passes
   everything.
4. **Compiler limits and fixed shapes.** neuronx-cc limits were one of the porter's three
   obstacles. Graphs compile ahead of time for each shape. Our 1K to 10K prompts and 10
   to 1,000-token replies need a bucket design, and the time to first token moves with
   the bucket.
5. **Speculative decoding.** Neuron has EAGLE only (V1 and V3).
   - EAGLE-3 needs hidden states from three target layers, which the Gemma port must
     expose.
   - The drafter itself, built for the Core's pruned width, must load too.
   - DFlash, DSpark and Gemma MTP have no Neuron versions.
6. **The pruned Core.** This is our judgement, not a report. Width pruning can leave
   sizes that do not suit Neuron's kernel tiles, so check the Core's hidden, head and MLP
   sizes against the kernels on day one.
7. **Version lag and formats.**
   - The vLLM Neuron plugin's latest release is v0.24.0.1.1.0 (beta); the NxD Inference
     path is on vLLM 0.16. Our kit runs 0.33, so its priority, cache-salt and metric names
     need checking there.
   - NxD quantisation is not wired into vLLM's quantisation settings, so the FP8 Core may
     need re-quantising in Neuron's format.

## What changes in the plan

- **H13 is split** (still proposed; Jithin fixes it before the run):
  - **H13a.** Within 2 engineer-weeks, vLLM Neuron on Trn2 serves the public Gemma 4 31B
    and then the Core, with greedy outputs matching the GPU token for token on the screen
    prompts.
  - **H13b.** Within up to 2 more weeks, an EAGLE-3 drafter runs on it.
  - If H13a fails, Trainium leaves the fast lane.
- **Ask AWS for help (Q13).** The discount is leverage. Recommendation: make Gemma 4
  support part of the deal, either Annapurna engineering help or an existing internal
  port, before spending our own weeks on it.
- **Evidence for that ask:** the community port proves the architecture can be expressed
  on Neuron. Check its licence before reusing any of it; the lab accepts only permissive
  licences.

## Sources

- Neuron docs, vLLM with NxD Inference (supported models; quantisation not integrated with vLLM's settings): https://awsdocs-neuron.readthedocs-hosted.com/en/latest/libraries/nxd-inference/developer_guides/vllm-user-guide-v1.html
- Neuron docs, vLLM Neuron plugin release notes (v0.24.0.1.1.0, beta): https://awsdocs-neuron.readthedocs-hosted.com/en/latest/release-notes/components/vllm-neuron.html
- Neuron docs, sliding-window block-table trimming in vLLM Neuron: https://awsdocs-neuron.readthedocs-hosted.com/en/latest/vllm-neuron/docs/design/vllm/decode-context-length-bucketing.html
- Five Gemma-4 models on Inferentia2 (community port, E2B to 31B): https://builder.aws.com/content/3GdIrF4DSLTszGvRldOusE46JAD/five-gemma-4-models-one-accelerator-what-porting-e2b-31b-to-aws-inferentia2-taught-me
- Porting Gemma-4 to Inferentia2 (mixed heads, vendor dead-ends, compiler limits): https://dev.to/gde/porting-gemma-4-2b-4b-12b-to-aws-inferentia2-2jnf
- Six AWS backends for Gemma 4 (why Neuron is hard to serve on; fixed shapes): https://aws.plainenglish.io/inference-on-aws-precision-memory-and-six-backends-behind-one-strands-agent-3802632b425d
- Gemma 4 31B architecture (5:1 interleave, window 1,024, dual RoPE): https://github.com/vllm-project/vllm/issues/39914
- Gemma 4 31B on Intel Gaudi 3 (sliding-window KV fix): https://sailresearch.com/blog/improving-decode-throughput-gaudi-3
- vLLM 0.33.0 Gemma 4 model code (per-layer head size and KV heads, attention_k_eq_v, KV sharing): the vllm-0.33.0 wheel, `vllm/model_executor/models/gemma4.py`
