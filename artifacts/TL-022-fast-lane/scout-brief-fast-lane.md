# Fast lane (fast-lane) — Scout brief: TLM4 Core 27B at over 1,000 tokens/s per request

Scout session, 2026-11-15. Engineering material: techniques are named in full. Enterprise-facing versions describe outcomes only.

## Lab record

| Field | Value |
| --- | --- |
| Register ID | TL-022 fast-lane (registered 2026-11-15, D-371) |
| Stage | Seed |
| Mode this session | Scout, with an engineering sizing |
| Sponsor and decider | Head of ThinkLatent (Jithin) |
| Lead | Serving lead (Claude) |
| Theme | T-001 Sovereign AI: owned models on owned infrastructure |
| Horizon | H1 (a production requirement today) |
| Related ideas | TL-008 harness-served (per-endpoint serving environments; the harness stays off the hot path), TL-014 model-mix (its 50 ms decision target is the same latency engineering on the 7B Core), TL-018 tlm-roadmap (one serving path for the TLM suite), TL-004 index (the quality gate for 4-bit weights and for the 7B track) |
| Hardware | About 16 H100s in hand. The proof runs on one 8× H100 node; more H100 nodes are added as they come (D-373) |
| Data rule | The lab works on public weights and public data. The Core weights, Enterprise traffic and drafters trained on that traffic belong to the company version |

## 1. The ask, in numbers

**As given.** Over 1,000 output tokens per second; some service levels need a request completed in under 200 ms when the output is under 300 tokens; the cluster takes about 1 million input tokens a minute. Jithin's direction: run all three targets together (D-372), prove the work on 8 H100s, then scale out with more H100s as they come (D-373).

**What is done now** (from Jithin's notes). TLM4 Core 27B is Gemma 4 31B width-pruned to 27B and served in FP8 by vLLM 0.26.0 on HyperPod (Slurm). Each production use case has dedicated machines. Weights load from S3 through FSx. Envoy fronts the endpoints with consistent hashing for prefix caching. About 16 H100s are available. The compression pipeline lists NVFP4/FP8 and speculative-decoding tuning; the TP degree and whether a drafter serves the 27B today are not recorded.

**Finding 1: the targets are different requirements.** "Over 1,000 tok/s" and "300 tokens in 200 ms" are not the same bar. Once prefill, network and queueing are budgeted, 300 tokens in 200 ms needs about 1,700 to 2,000 tok/s per request.

Table A. Speed needed for 300 output tokens inside 200 ms (15 ms network and queue budgeted; prefill estimated on 8 GPUs)

| Input tokens | Prefill, H100 TP8 | Prefill, B300 TP8 | Decode speed needed (H100) | Decode speed needed (B300) |
| --- | --- | --- | --- | --- |
| 500 | 10 ms | 6 ms | 1,711 tok/s | 1,673 tok/s |
| 1,000 | 17 ms | 9 ms | 1,784 tok/s | 1,705 tok/s |
| 2,000 | 31 ms | 16 ms | 1,951 tok/s | 1,772 tok/s |
| 4,000 | 60 ms | 29 ms | 2,399 tok/s | 1,923 tok/s |

At 1,000 input tokens, the output that fits in 200 ms is about 175 tokens at 1,000 tok/s, 263 at 1,500 and 351 at 2,000.

**Finding 2: the volume is light; per-request speed is the hard part.** 1 million input tokens a minute is about 16,700 tokens arriving every second. Divided by the average prompt length, that gives requests per second. Requests in flight (being worked on at the same moment) are requests per second times how long each takes (Little's law), here about 0.2 s.

| Average prompt | Requests per second | Requests per minute | In flight at once | In flight at 3x bursts |
| --- | --- | --- | --- | --- |
| 250 tokens | 67 | 4,000 | about 13 | about 40 |
| 500 tokens | 33 | 2,000 | about 7 | about 20 |
| 1,000 tokens | 17 | 1,000 | about 3 | about 10 |
| 2,000 tokens | 8 | 500 | about 2 | about 5 |

The same 1 million tokens a minute can mean 500 or 4,000 requests a minute; the GPU count follows the requests in flight, so the real prompt and output lengths (Q1) decide the unit count. Either way the work is per-request decode speed, not throughput.

**Finding 3: more H100s add capacity, not per-request speed.** A single request's speed is set by one replica (8 GPUs on one NVLink domain) and by how many draft tokens the model accepts per step. Adding nodes adds replicas. Scaling out answers the 1 million tokens a minute; it does not make a 300-token reply faster.

## 2. What the fast providers do (Scout)

**Measured on our model's parent.** Artificial Analysis measures Gemma 4 31B per provider (median over 72 hours, 10,000-token prompts; a moving snapshot). Non-reasoning variant: Cerebras 1,812.6 tok/s in one snapshot and about 1,212 in another; SambaNova 194.5; FriendliAI 130.0; Together AI (FP8) 63.4. Reasoning variant: SambaNova 542.5, Modular (NVFP4) 281.6, FriendliAI 134.4. Cerebras prices Gemma 4 31B at $1.04 per million tokens blended; the cheapest provider is $0.11. Public GPU APIs run this model class at roughly 60 to 300 tok/s per request because they batch for cost.

**Family 1: keep the weights on the chip.**
- Cerebras: wafer-scale chips hold the model in on-chip SRAM, so a token step does not stream weights from HBM. A CS-4 rack has three WSE-3 Turbo wafers and 129.6 PB/s of aggregate memory bandwidth, and Cerebras reports more than 4,400 tok/s per user on gpt-oss-120B. AWS announced in March 2026 that it is deploying Cerebras CS-3 systems in AWS data centers behind Amazon Bedrock, with Trainium doing prefill and Cerebras doing decode, as a service in the second half of 2026.
- Groq: the LPU keeps all parameters in on-chip SRAM, so a model spans hundreds of networked chips. NVIDIA took a non-exclusive licence to the LPU technology for about $20 billion on 24 December 2025 and hired its founder; GroqCloud continues independently. NVIDIA's 256-LPU Groq 3 LPX system is in production, with Nebius as the first deployer.
- SambaNova: reconfigurable dataflow chips; the fastest non-Cerebras provider on Gemma 4 31B above.

**Family 2: make GPUs yield more tokens per step.**
- NVIDIA reached 1,038 tok/s per user on Llama 4 Maverick on one DGX B200 (8 GPUs), beating SambaNova's 792; Amazon and Groq measured near 300, and the other GPU clouds below 200. The recipe: TensorRT-LLM, FP8 GEMMs, MoE and attention, fused kernels (AllReduce with RMSNorm, FC with SwiGLU), programmatic dependent launch, CUDA graphs with an overlap scheduler, and an EAGLE-3 drafter trained for that model. The min-latency configuration caps the batch at 8 with a draft length of 3.
- DFlash (UC San Diego, February 2026): a block-diffusion drafter that proposes a whole block of tokens in one pass. On Gemma 4 31B in vLLM with the Speculators library, on one Blackwell Ultra GPU at one request in flight: 5.8x faster than plain decoding on Math500, 5.3x on GSM8K, 5.6x on HumanEval, 4.4x on MBPP and 3.0x on MT-Bench (chat). Chat-like outputs gain least.
- Google ships a 0.5B multi-token-prediction drafter for Gemma 4 31B, reported at up to 3x.
- Snowflake's Arctic Inference (an open vLLM plugin) uses Shift Parallelism: tensor parallelism at small batch for speed, sequence parallelism at large batch for throughput, in one deployment, because the KV cache layout is the same in both. Its SwiftKV cuts prefill compute by up to 50%.
- Low precision: NVIDIA's NVFP4 build of Gemma 4 31B stays within about a third of a point of the original on MMLU Pro and LiveCodeBench in its published comparison. NVFP4 needs Blackwell; on H100 the 4-bit option is weight-only quantization (W4A16, AWQ or GPTQ), and public 4-bit builds of Gemma 4 31B exist.

**What to borrow.** (1) A drafter trained for the exact served model. (2) 4-bit weights where quality holds. (3) A dedicated min-latency pool: 8 GPUs per replica, batch capped near 8. (4) Runtime settings that cut per-layer overhead (fused all-reduce, CUDA graphs, overlap scheduling). (5) Cache-aware routing, and a prefill/decode split only where prefill interference shows. (6) Price speed as a tier: the cost of speed is idle GPU capacity.

**The gap that remains.** On GPUs, per-request speed for a 60-layer, 27B dense model tops out around 1,000 to 1,500 tok/s on H100 and 1,400 to 2,000 on B300 at low concurrency, even with all of the above. Only SRAM-class hardware is measured clearly beyond that for this model class.

## 3. Why the 27B is slow per request on GPUs

- At small batch, every token step streams all the weights from HBM: about 28 GB per step in FP8 (including a 262K-vocabulary output layer kept in BF16), about 16 GB with 4-bit weights. Memory bandwidth per GPU: H100 3.35 TB/s, H200 4.8 TB/s, B300 7.7 TB/s.
- Tensor parallelism divides that stream across GPUs but adds two all-reduces per layer (120 per step at 60 layers). It leaves the fixed per-layer kernel cost untouched, so depth sets a floor.
- A drafter multiplies the tokens each step yields. At small batch, verifying a block of 16 draft tokens costs little more than one token.
- Width pruning, which the Core uses, keeps all 60 layers; depth pruning removes layers. NVIDIA's Minitron work found its depth-pruned 4B about 2.7x faster than the 8B teacher, against 1.8x for the width-pruned 4B, while width pruning kept more accuracy. On this model, the same bytes in 40 layers instead of 60 would lift the B300 estimate from about 1,380 to about 1,830 tok/s, and the H100 estimate from about 910 to about 1,100.
- Batch erodes per-request speed, so a fast lane caps how many requests each replica holds and sends overflow elsewhere.

## 4. Estimates for the Core 27B

Planning model, not measurements. Assumptions: 70% of peak memory bandwidth; 22 µs of fixed kernel cost per layer (15 to 30 µs moves the results by about ±20%); all-reduce latency of 6 µs on H100/H200 and 4.5 µs on B300; 0.25 ms per step for the drafter; 16 tokens verified per step; mean accepted tokens per step (τ) of 2.5, 3.5 or 5.0. Checked against NVIDIA's published Maverick record; treat every figure as ±30% until the proof measures it.

Table B. Per-request decode speed, one request in flight (tok/s)

| Hardware | TP | Weights | No drafter | τ 2.5 | τ 3.5 | τ 5.0 |
| --- | --- | --- | --- | --- | --- | --- |
| H100 (p5) | 1 | FP8 | 75 | 183 | 257 | 367 |
| H100 (p5) | 4 | FP8 | 198 | 471 | 659 | 942 |
| H100 (p5) | 8 | FP8 | 282 | 658 | 921 | 1,316 |
| H100 (p5) | 8 | W4A16 (4-bit) | 346 | 781 | 1,094 | 1,562 |
| H200 (p5en) | 8 | FP8 | 323 | 748 | 1,047 | 1,496 |
| B300 (p6-b300) | 4 | NVFP4 | 377 | 862 | 1,206 | 1,723 |
| B300 (p6-b300) | 8 | FP8 | 397 | 904 | 1,265 | 1,807 |
| B300 (p6-b300) | 8 | NVFP4 | 443 | 998 | 1,397 | 1,996 |

Drafter acceptance needed on one 8× H100 node: 1,000 tok/s needs τ of about 3.9 in FP8 (4.3 with eight in flight) or about 3.2 to 3.3 with 4-bit weights. 300 tokens in 200 ms (about 1,780 tok/s) needs τ of about 6.9 in FP8 or 5.7 to 6.0 with 4-bit weights. For comparison, on B300 TP8 NVFP4 the same 1,700 tok/s needs τ 4.3 to 4.5.

## 5. The path on HyperPod with vLLM

Ranked by expected effect. Each lever states what is done now.

1. **A drafter trained on the Core 27B.** Now: no drafter recorded. Proposed: train DFlash and EAGLE-3 drafters with Speculators, which trains EAGLE-3, P-EAGLE, DFlash, DSpark and MTP drafters for one's own target and serves them in vLLM; Gemma 4 31B already has EAGLE-3 and DFlash speculators. A width-pruned target changes the hidden states a drafter reads, so the public drafters will not fit the Core: retrain, and retrain on every Core refresh. vLLM 0.20 and later serve Speculators-trained DFlash drafters, and 0.26.0 adds hybrid sliding-window drafters, which suits Gemma 4's local and global attention, so no engine upgrade is needed. Expected 2.5x to 5x at small batch. Acceptance is the swing factor: greedy or low-temperature decoding and templated outputs raise it.
2. **4-bit weights.** Now: FP8. On H100: W4A16 (AWQ or GPTQ) cuts the bytes each step streams from about 28 GB to about 16 GB, worth about 20% per request at small batch and lowering the acceptance needed for 1,000 tok/s from about 3.9 to about 3.3. On Blackwell: NVFP4 with ModelOpt. Either way, gate it on the TL Index tasks of the fast-lane use cases (H3); a pruned model may lose more than the public 31B.
3. **A min-latency serving profile on one 8× H100 node.** TP8 (TP4 if measured within 10%); CUDA graphs captured for batch 1 to 8; at most 8 requests in flight per replica; chunked prefill sized so a prefill chunk does not stall decodes; prefix caching on; FP8 KV cache; tight max_tokens; structured-output decoding measured separately because grammar masking adds per-token cost.
4. **The 7B Core for the 200 ms class.** Four replicas at TP2 on one node, each with its own drafter. Estimated 300-token replies in about 185 ms at τ 4.0 and 150-token replies in about 110 ms. Used only where the TL Index shows the 7B is sufficient (TL-004's "sufficiency over size").
5. **Routing by service class.** Relay carries a service class on the call; Envoy sends that class to the fast pool and everything else to the bulk lane. Above a replica's cap, overflow goes to the 7B lane or the bulk lane instead of a queue (admission control). Provision for the burst rather than autoscaling reactively: a replica takes minutes to come up (instance, FSx weight load, CUDA graph capture).
6. **A clean hot path.** The harness steps aside on the call (TL-008 already designs this for first turns); Langfuse writes asynchronously; Okta tokens are checked once and cached at Envoy; clients sit in the same region and zone; connections stay alive. Budget no more than 15 ms for everything that is not the model.
7. **One engine bake-off.** vLLM against SGLang (Spec V2 with DFlash) and TensorRT-LLM on the same node at 1, 4 and 8 in flight. Stay on vLLM unless another engine is more than 20% faster at end-to-end p95: vLLM is the stack, Speculators targets it, and HyperPod's managed tiered KV cache and intelligent routing support only vLLM containers. A different engine or version per endpoint depends on TL-008's multi-environment work.
8. **Prefill/decode split at scale only.** Prefill is the 27B unit's capacity limit at longer prompts (about 17 ms per 1,000 tokens at TP8). When units multiply, a node dedicated to prefill is the lever to test; Shift Parallelism (Arctic Inference) is the candidate if one pool must serve both lanes.
9. **Model shape at the next Core refresh.** Evaluate a depth-aware prune (fewer layers) beside the width-pruned Core on the TL Index. Gemma 4 26B-A4B (30 layers, 3.8B active of 25.2B) is a candidate fast base. Caveat: verifying a 16-token draft block on a mixture-of-experts model touches many more experts per step, so its gain from speculation is smaller; measure it.
10. **Faster silicon only if (b) must hold on the 27B.** B300 nodes (p6-b300: 7.7 TB/s per GPU, FP4; $112.32 an hour per instance on capacity blocks in Oregon and N. Virginia, $142.42 on demand) bring the needed acceptance down to about 4.3. Cerebras on AWS is the only measured route well beyond that. Neither is decided (open question Q5).

## 6. Prove on one 8× H100 node, then scale out (D-373)

The unit is one p5 node (8 H100s), running either the Core 27B as one replica at TP8 or the 7B Core as four replicas at TP2. More nodes mean more units.

Table E. What one 8× H100 node can show for each target (1,000 input tokens; planning estimates)

| Target | Configuration on the node | Estimate | What it needs | Expected result |
| --- | --- | --- | --- | --- |
| (a) Over 1,000 tok/s on the Core 27B | One replica, TP8, drafter trained on the Core | FP8: 906 tok/s at τ 3.5, 1,113 at τ 4.3, 1,294 at τ 5.0; 4-bit: 1,094 at τ 3.5 (one in flight) | τ about 3.9 (FP8) or 3.3 (4-bit) | Pass if the drafter is strong on service-level outputs (H1, H2) |
| (b) 300 tokens in 200 ms on the Core 27B | Same | 152 to 262 tokens fit in 200 ms (FP8 τ 3.5 to 4-bit τ 5.0) | About 1,780 tok/s: τ about 6.9 (FP8) or 5.7 (4-bit) | Expected to fall short on H100 except on highly predictable outputs; the proof records the ceiling |
| (c) 200 ms class on the 7B Core | Four replicas at TP2, drafter | 300-token reply in 208 ms at τ 3.5, 185 at τ 4.0, 152 at τ 5.0; 150-token reply in about 110 ms | τ about 3.7 | Pass if the drafter reaches about 4 and the TL Index shows the 7B is sufficient (H4) |

Table F. What one unit carries, and units for 1 million input tokens a minute (mean in flight held at a third of the cap of 8 so 3x bursts fit; prefill held under 20% of the unit's time; 150-token mean replies; one spare unit)

| Unit | Input tokens per request | Requests/s per unit | Input tokens/min per unit | Units for 1M/min (incl. spare) | H100s |
| --- | --- | --- | --- | --- | --- |
| Core 27B, TP8, τ 4.3 | 500 | 15.2 | 0.46M | 4 | 32 |
| Core 27B, TP8, τ 4.3 | 1,000 | 11.8 | 0.71M | 3 | 24 |
| Core 27B, TP8, τ 4.3 | 2,000 | 6.4 | 0.77M | 3 | 24 |
| 7B Core, 4 × TP2, τ 4.0 | 500 | 98.8 | 2.96M | 2 | 16 |
| 7B Core, 4 × TP2, τ 4.0 | 1,000 | 96.8 | 5.81M | 2 | 16 |

Reading: one 27B unit carries roughly half to three-quarters of the stated load. The ~16 H100s in hand (two units) cover about 1.4 million input tokens a minute on the 27B at 1,000-token prompts with no spare, or 0.7 million with one. A single 7B unit covers the whole load. Prefix caching on shared system prompts raises the 27B unit's capacity.

Scaling rule: add one 27B unit per 8 requests of peak in flight (about 0.5 to 0.8 million input tokens a minute each), or one 7B unit per about 3 million; route with the prefix-aware Envoy hashing already in place; cap each replica at 8 in flight; send overflow to the 7B lane or bulk.

## 7. Cost reference if faster silicon is bought

Table D. B300 TP8 NVFP4, τ 3.5 (1,381 tok/s at one in flight, 1,279 at eight); planning cap 8 in flight per replica, 3x bursts, one spare replica, 150-token replies, list capacity-block rates (raised twice in 2026; negotiated rates differ)

| Mean input tokens | Requests/s | In flight, mean / burst | Replicas | GPUs | Capacity block $/h | $ a month | On demand $/h | $ per 1M tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 250 | 66.7 | 13.3 / 40 | 7 | 56 | $786 | $574K | $997 | $8.19 |
| 500 | 33.3 | 6.7 / 20 | 4 | 32 | $449 | $328K | $570 | $5.76 |
| 1,000 | 16.7 | 3.3 / 10 | 3 | 24 | $337 | $246K | $427 | $4.88 |
| 2,000 | 8.3 | 1.7 / 5 | 2 | 16 | $225 | $164K | $285 | $3.48 |

A dedicated low-batch fleet costs more per token than Cerebras's public price for Gemma 4 31B. The speed tier is paid for in utilisation, so fill it only with traffic that needs it.

## 8. Options

| Option | What it is | For | Against |
| --- | --- | --- | --- |
| A. H100 fast lane for the 27B (now) | Levers 1 to 3 and 5 to 7 on one 8× H100 node, scaled by units | Owned model on GPUs in hand; over 1,000 tok/s if the drafter is strong | 300 tokens in 200 ms only on highly predictable outputs |
| B. The 7B Core for the 200 ms class (now) | Lever 4: four TP2 replicas per node | 300 tokens in about 185 ms at τ 4.0; one unit carries the whole load | Only where the TL Index shows it is sufficient |
| C. Shorter outputs for service-level calls | Output contracts, structured outputs, stop rules | 150 tokens fits 200 ms at about 1,000 tok/s on the 27B | Needs the use cases to accept it |
| D. Faster silicon (B300, or Cerebras on AWS) | Lever 10 | The only routes to 300 tokens in 200 ms on the 27B for open-ended outputs | Cost; Cerebras's custom-model hosting, data handling and residency are unknown and sit against the sovereign stance unless the Core stays inside the Enterprise's boundary |
| E. Change nothing | vLLM defaults on H100 | No work | About 250 to 300 tok/s per request; 300 tokens take about a second |

## 9. Pre-registered hypotheses

| ID | Hypothesis | Confirms | Refutes |
| --- | --- | --- | --- |
| H1 | A DFlash or EAGLE-3 drafter trained on the served model reaches a mean accepted length of at least 3.5 on service-level calls at temperature 0.3 or lower | τ ≥ 3.5 on held-out service-level prompts | τ < 2.5: the 27B cannot pass 1,000 tok/s on H100, and the 200 ms class moves to B, C or D |
| H2 | One 8× H100 node serving the Core 27B at TP8 with that drafter gives at least 1,000 tok/s per request at p50 with up to 8 in flight | Met in the proof grid | p50 under 1,000 at 8 in flight |
| H3 | 4-bit weights (W4A16 on H100, NVFP4 on Blackwell) stay within 1 point of FP8 on the TL Index tasks of the fast-lane use cases, with no task worse by more than 2 points | Within bounds | Any task drops more than 2 points: stay on FP8 |
| H4 | The 7B Core with its drafter returns 300-token replies in 200 ms or less at p95 with up to 8 in flight per TP2 replica, and the TL Index shows it sufficient on those use cases | Both met | Either fails: the 200 ms class moves to C or D |
| H5 | Units scale linearly: two 27B units behind the prefix-aware Envoy carry twice one unit's load with p95 within 10% | Met on the second node | p95 rises more than 10% at twice the load |

Kill criterion: if H1 and H2 both refute, stop building a GPU fast lane for the 27B and choose B, C or D for the 200 ms class.

## 10. The proof (one 8× H100 node, public weights)

- Hardware: one p5 node (8 H100s) from the ~16 in hand; the second node only for H5.
- Stand-ins: public Gemma 4 31B (FP8 and 4-bit) for the Core 27B, with the public EAGLE-3 and DFlash drafters for Gemma 4 31B; public Gemma 4 E2B for the 7B Core, with Google's MTP drafter where one exists or an EAGLE-3 drafter trained with Speculators. This measures hardware and runtime. Acceptance on Enterprise outputs (H1) is measured in the company version, with drafters trained on the Core models.
- Engines: vLLM 0.26.0; SGLang current as the control.
- Grid: 27B at TP8 and TP4 × FP8 and 4-bit × no drafter, EAGLE-3, DFlash; 7B at TP1 and TP2; each × 1, 4, 8, 16 in flight × 500, 1,000, 2,000 input tokens × 150 and 300 output tokens × temperature 0 and 0.7.
- Measures: time to first token, time per output token, tok/s per request, end-to-end p50/p95/p99, accepted length, GPU utilisation, tokens per GPU-hour.
- Output: Tables B, E and F replaced with measurements, H2 and H4 read, the 27B's 200 ms ceiling recorded, and a go or no-go on training drafters on the Core models.

## 11. Capabilities reused and created

Reused: CAP-002 HyperPod serving with per-setting endpoints; CAP-003 model compression pipeline (FP8, 4-bit, speculative-decoding tuning); CAP-001 AI Gateway (Envoy routing); CAP-016 Relay SDK (carries the service class); CAP-017 Langfuse telemetry store (latency telemetry, written asynchronously); CAP-005 evaluation register and harness (the TL Index gates 4-bit weights and the 7B track).

Created, at Idea maturity: CAP-036 latency-tier serving profile (min-latency engine settings, service-class routing, admission control, the 8-GPU unit); CAP-037 drafter recipe and registry (one drafter per served TLM model, retrained on each Core refresh); CAP-038 latency benchmark harness (the proof grid as a repeatable job).

## 12. Open questions

| # | Question | Owner | Blocking |
| --- | --- | --- | --- |
| Q1 | Traffic shape of service-level calls: input and output token distributions, their share of the 1 million input tokens a minute, burst profile (from Langfuse) | Jithin | Yes, for unit counts |
| Q2 | Where is 200 ms measured: at the client, at the gateway, or at vLLM? | Jithin | Yes, for the budget |
| Q3 | The TP degree of today's 27B endpoints, and whether any drafter is in use | Jithin | No |
| Q4 | Which service-level use cases may move to the 7B Core if the TL Index shows it sufficient? | Jithin, with TL-004 | No |
| Q5 | Faster silicon (B300, or Cerebras on AWS): in scope if (b) must hold on the 27B? Recommendation: decide after the proof; track Cerebras on AWS as the benchmark | Jithin | No |
| Q6 | Sampling settings of service-level calls (temperature, structured outputs) | Jithin | No |

## 13. Thin spots

- Every speed figure for the Core models is a planning estimate calibrated on public records (about ±30%); none is measured.
- Drafter acceptance on Enterprise outputs is the swing factor, and it can only be measured inside the Enterprise.
- Target (b) on H100 rests on acceptance well above published chat results (DFlash on Gemma 4 31B: 3.0x on chat, 5.8x on math).
- The 7B track rests on the TL Index showing the 7B sufficient for service-level use cases; nothing yet shows it.
- Provider speeds are moving snapshots, measured on the public 31B, not the Core.
- Costs use list rates; negotiated rates differ.

## Decisions

| ID | Date | Decision | By |
| --- | --- | --- | --- |
| D-371 | 2026-11-15 | Registered as TL-022 fast-lane at Seed, its own row (not a feature of TL-008), linked to TL-008, TL-014, TL-018 and TL-004; this brief is its doc | Jithin (on a question with a recommendation) |
| D-372 | 2026-11-15 | Run the three targets together: (a) over 1,000 tok/s on the Core 27B, (b) 300 tokens in 200 ms on the Core 27B, (c) the 200 ms class on the 7B Core where the TL Index shows it sufficient. Dissent recorded: the recommendation was (a) with 200 ms for replies of 150 tokens or fewer first, because (b) on H100 needs acceptance beyond published chat results | Jithin |
| D-373 | 2026-11-15 | Prove the fast lane on one 8× H100 node from the ~16 H100s in hand, then scale out with more H100 nodes as they come. Recorded with it: more H100s add capacity, not per-request speed. Faster silicon stays open (Q5) | Jithin |

## Sources

- [Gemma 4 model card (Google)](https://ai.google.dev/gemma/docs/core/model_card_4) and [Gemma 4 primer](https://aman.ai/primers/ai/gemma-4/)
- [Gemma 4 31B MTP drafter (Google, Hugging Face)](https://huggingface.co/google/gemma-4-31B-it-assistant)
- [Artificial Analysis: Gemma 4 31B providers](https://artificialanalysis.ai/models/gemma-4-31b/providers) and [non-reasoning variant](https://artificialanalysis.ai/models/gemma-4-31b-non-reasoning/providers)
- [NVIDIA: Blackwell breaks 1,000 TPS/user on Llama 4 Maverick](https://developer.nvidia.com/blog/blackwell-breaks-the-1000-tps-user-barrier-with-metas-llama-4-maverick) and [Tom's Hardware on the record](https://www.tomshardware.com/tech-industry/artificial-intelligence/dgx-b200-blackwell-node-sets-world-record-breaking-over-1-000-tps-user)
- [NVIDIA: DFlash speculative decoding on Blackwell](https://developer.nvidia.com/blog/boost-inference-performance-up-to-15x-on-nvidia-blackwell-using-dflash-speculative-decoding/) and [DFlash paper](https://arxiv.org/abs/2602.06036v1)
- [Speculators documentation (vLLM)](https://docs.vllm.ai/projects/speculators) and [Speculators v0.5.0 (Red Hat)](https://developers.redhat.com/articles/2026/06/04/speculators-v050-dflash-support-and-online-training)
- [vLLM v0.26.0 release notes](https://newreleases.io/project/pypi/vllm/release/0.26.0)
- [Arctic Inference with Shift Parallelism (Snowflake)](https://www.snowflake.com/en/engineering-blog/arctic-inference-shift-parallelism)
- [LLM Pruning and Distillation in Practice: the Minitron approach](https://arxiv.org/html/2408.11796v1)
- [NVIDIA Gemma 4 31B NVFP4](https://huggingface.co/nvidia/Gemma-4-31B-IT-NVFP4) and [a 4-bit Gemma 4 31B build listing other 4-bit builds](https://huggingface.co/LilaRest/gemma-4-31B-it-NVFP4-turbo)
- [Cerebras CS-4 (AI Weekly)](https://aiweekly.co/alerts/cerebras-cs-4-posts-4400-tokenssec-up-to-30x-vs-gpus) and [AWS and Cerebras collaboration (Cerebras)](https://www.cerebras.ai/blog/cerebras-is-coming-to-aws)
- [NVIDIA and Groq licensing deal (W.Media)](https://w.media/nvidia-licenses-groqs-tech-for-ai-inference-in-us-20-billion-deal/) and [the Chip Letter on Groq](https://thechipletter.substack.com/p/jensen-groks-groq)
- [HyperPod managed tiered KV cache and intelligent routing (AWS)](https://aws.amazon.com/blogs/machine-learning/managed-tiered-kv-cache-and-intelligent-routing-for-amazon-sagemaker-hyperpod/)
- [Amazon EC2 P6-B300 regions (AWS)](https://aws.amazon.com/about-aws/whats-new/2026/08/amazon-ec2-p6-b300-instances-available-additional-regions), [P6-B300 specs (AWS Labs)](https://awslabs.github.io/accelerated-compute-tutorials/updates/p6-b300-seoul-launch/), [Capacity Block pricing (AWS)](https://aws.amazon.com/ec2/capacityblocks/pricing) and [AWS GPU pricing guide (GPU Smith)](https://gpusmith.com/articles/en/aws-gpu-instance-pricing)
