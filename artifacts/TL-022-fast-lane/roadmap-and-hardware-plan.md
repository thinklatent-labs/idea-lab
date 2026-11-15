# Fast lane (fast-lane): roadmap after the H100 proof, and the hardware plan, 2026-11-16

TL-022 fast-lane · Seed · Scout and Spec (roadmap) · engineering material
Head of ThinkLatent (Jithin), sponsor and decider; serving lead (Claude).

## The short version

- **Phase 0, the H100 proof, decides whether there is a fast lane at all.** Two numbers
  from it, acceptance (tau) and tokens per second per call, set the baseline that every
  other chip is compared with.
- **Then two tracks run side by side:**
  - Phase 1 makes the fast lane real on H100.
  - Phase 2 tests the other chips.
    - **G7e (Blackwell)** is cheap and quick to test, because the kit runs on it as is.
    - **Trainium** starts with a time-boxed porting check. vLLM on Neuron does not list
      Gemma among its supported models, and EAGLE-3 is its only learned drafter.
- **Phase 3 turns the per-chip numbers into a fleet.** Each bucket goes to the cheapest
  chip that keeps its promise, and the picker already routes by bucket.
- **One decision metric for every chip:** cost per million tokens at each bucket's
  promise, measured with the same kit, prompts, buckets and thresholds.

## Phases

| Phase | Target | What | Gate | Appetite |
| --- | --- | --- | --- | --- |
| 0. H100 proof | by 27 Nov | Quick and standard plans inside the Enterprise; numbers-only export; H1 to H10 recorded | Kill signal: H1 and H2 both refute, so the GPU fast lane for the 27B stops | Running |
| 1. Real on H100 | Dec | A drafter trained on the Core (on Enterprise traffic if allowed); bucket edges from Langfuse; two nodes, 16 GPUs (H5); the picker as an Envoy ext_proc service (CAP-039); a path to vLLM 0.33 in production | A critique pass (Stress test) before Proposal; then the Building gate: owner, stream, appetite, review slot | About 3 to 4 engineer-weeks |
| 2a. G7e bake-off | Dec, after Phase 0 numbers | The same kit with a G7e overlay: FP8 and 4-bit (NVFP4) Core, layouts TP1, TP2, TP4 and TP8 | H11, H12 | About 1 engineer-week, plus 2 to 3 days of one g7e.48xlarge |
| 2b. Trainium | Dec to Jan | First a porting check: the Core and an EAGLE-3 drafter on vLLM Neuron (Trn2). Then the kit with a Neuron backend, and the same bake-off | H13 decides whether 2b continues; then H14 | Check: 2 engineer-weeks; bake-off: about 1 |
| 3. Fleet design | Jan | Buckets to chip pools; capacity and cost plan for 1M input tokens a minute, and twice that | H15; Jithin decides the fleet | About 1 engineer-week |
| 4. Production | Feb onward | Shadow traffic, service levels, rollout; graduation to a Project of its own | Graduation criteria | Set in the Proposal |

The dates are targets for Jithin to set. TL-022 is at Seed, and a critique pass comes before Proposal.

## The chips

US East prices: on demand unless marked. Bandwidth is per chip.

| Instance | Chips | Memory per chip | Bandwidth | Chip-to-chip | Price per hour |
| --- | --- | --- | --- | --- | --- |
| p5.48xlarge | 8× H100 SXM | 80 GB HBM3 | 3.35 TB/s | NVLink | $55.04 |
| g7e.48xlarge | 8× RTX PRO 6000 Blackwell Server | 96 GB GDDR7 | 1.6 TB/s | PCIe, peer to peer | $33.14 |
| g7.48xlarge | 8× RTX PRO 4500 Blackwell Server | 32 GB GDDR7 | About 0.7 TB/s (2.45× an L4) | PCIe | $28.51 |
| trn2.48xlarge | 16× Trainium2 | 96 GB HBM3 | 2.9 TB/s | NeuronLink | $35.76 as a Capacity Block ($2.24 per chip); a discount is promised |
| Trn3 UltraServer | 64 or 144× Trainium3 | 144 GB HBM3e | 4.9 TB/s | NeuronSwitch, all to all | Sold as UltraServers |
| p6-b200.48xlarge (reference) | 8× B200 | | | NVLink | $113.93 |

**What sets the speed of one call.** Generating a reply is limited by memory bandwidth.

- **Each verify step reads all the weights once.** The Core 27B in FP8 is about 27 GB, so
  a chip's step ceiling is its bandwidth divided by 27 GB.
- **Speed per call is steps per second times tau.**
- **These are ceilings, not measurements.** Communication between chips, KV-cache reads
  and kernels usually take 30 to 60% off them.

| Chip | Step ceiling per chip | Layout and ceiling | Per call at tau 3, ceiling |
| --- | --- | --- | --- |
| H100 | About 124 steps/s | TP8 over NVLink: about 990 | About 3,000 tok/s |
| G7e | About 59 | TP1: 59. TP4 over PCIe: under 237, and less after PCIe | TP1 about 180; TP4 under 700 tok/s. 4-bit roughly doubles both. |
| Trainium2 | About 107 | TP8: about 860 | About 2,600 tok/s; what Neuron reaches is unknown |
| Trainium3 | About 181 | TP4 (one server of 4 chips): about 725 | About 2,200 tok/s |

**What each chip is likely for:**

- **H100** is the only one measured soon, and the reference for the 1,000 tok/s fast lane.
- **G7e is a throughput and cost play, not a fast lane for the 27B.**
  - At FP8 even its TP4 ceiling is under 1,000 tok/s per call, so H11 is pre-registered
    to refute.
  - Each GPU holds a whole FP8 replica of the 27B with room for KV cache. That gives up
    to eight independent replicas per box, a good fit for the standard and bulk classes
    and long writes.
  - Blackwell's native 4-bit format (NVFP4) roughly doubles its ceiling. It needs the
    same quality check as H3.
- **G7 (RTX PRO 4500) is a poor fit for the 27B.** 32 GB cannot hold an FP8 replica with
  KV room, so it needs TP2 on slow memory. It may suit the 7B Core's bulk tier later.
  Recommendation: test G7e (Q10).
- **Trainium2 could carry the fast lane on paper.** Its bandwidth is close to an H100's,
  it has 16 chips per box, and it is cheaper, with a discount promised. The gate is
  software:
  - vLLM on Neuron lists Llama, Qwen, Llama 4 and Pixtral, not Gemma.
  - The newer vLLM Neuron plugin (beta, Trn2 and Trn3 only) has EAGLE-3 speculative
    decoding and a way to onboard new architectures.
  - So the Core has to be onboarded. Of our drafters, only the EAGLE-3 one we train can
    move across: DFlash, DSpark and Gemma MTP have no Neuron versions.
  - Neuron compiles ahead of time for fixed shapes. That needs measuring for the time
    to first token across 1K to 10K prompts.
- **Trainium3** has 1.7 times Trainium2's bandwidth. It is sold as UltraServers (4 chips
  per server), so we need to ask AWS what slice we can have (Q11).

## New hypotheses

These are proposed. Jithin fixes them before any chip run.

| ID | Claim | Confirmed if | Refuted if |
| --- | --- | --- | --- |
| H11 | The Core 27B on g7e.48xlarge, best layout and drafter, gives 1,000 tok/s per call at p50 with 8 in flight (Answer cells). Pre-registered expectation: refuted at FP8. | 1,000 or more | Under 1,000 |
| H12 | G7e keeps the standard, bulk and long-write promises at 30% or more below H100's cost per million output tokens (on-demand prices) | 30% or more cheaper | Not cheaper than H100 |
| H13 | Within 2 engineer-weeks, the Core 27B is served by vLLM Neuron on Trn2 with an EAGLE-3 drafter. Its plain-decoding replies match the GPU's on the screen prompts. | Both | The check ends without a served model: Trainium leaves the fast lane |
| H14 | At the discounted price, Trn2 keeps the fast buckets' promises at a lower cost per million tokens than H100 (stretch goal: 1,000 tok/s per call) | Cheaper at the promise | Dearer, or promises missed |
| H15 | A mixed fleet, each bucket on its cheapest chip that keeps the promise, costs 25% or more below all-H100 at equal attainment for 1M input tokens a minute. The extra operating cost of more than one chip type counts. | 25% or more cheaper | Under 10% cheaper |

## What the kit needs for each chip

- **G7e**, about 2 to 3 days:
  - an overlay (`config/g7e.example.yaml`) with layouts TP1×8, TP2×4, TP4×2 and TP8×1, and a 4-bit Core variant (quantised with Model Optimizer or llm-compressor);
  - the screen at TP1 and TP4 rather than TP8;
  - "the best layout" as a setting, because H1 and H2 read `fp8_tp8_best` today.

  Driver and CUDA 13 checks are already in preflight.
- **Trainium**: a 2-week porting check, then about 1 week of kit work.
  - The check onboards the Core into vLLM Neuron and exports our EAGLE-3 drafter.
  - The kit gets a Neuron server backend:
    - `vllm serve` with the Neuron plugin;
    - core assignment by `NEURON_RT_VISIBLE_CORES`;
    - long compile timeouts, with compiled artefacts cached;
    - a check of which metrics Neuron exposes.
- **Unchanged on every chip:** the client, picker, router, report and verdicts. They speak
  the OpenAI API and read Prometheus metrics.

## Risks, and what would stop each track

- **Attention.** Phase 0 comes first. No chip run before the H100 numbers exist, because
  there would be nothing to compare against.
- **G7e.** Speed per call is low, as expected. Other risks:
  - 4-bit quality;
  - vLLM kernel coverage on this Blackwell part. The screen shows which drafters and
    attention paths actually run.
- **Trainium.** In rough order of likelihood:
  - the porting effort;
  - compile time and fixed shapes;
  - EAGLE-3 being the only drafter;
  - Neuron SDK churn;
  - access to capacity;
  - discount terms not yet known.

  If the porting check fails, Trainium could still take the bulk class, through a model
  Neuron supports. That would be a different product decision.
- **Fleet.** Two or three chip types mean more images, drivers and on-call knowledge. H15
  counts that cost.

## Open questions

- **Q10: G7 or G7e?** Recommendation: G7e for the 27B, and G7 only later for the 7B bulk tier.
- **Q11: Trainium2 now, or wait for Trainium3?** Recommendation:
  - Run the porting check on Trn2 now, starting on a single chip (trn2.3xlarge), then
    trn2.48xlarge.
  - Ask AWS what slice of Trn3 is possible, and for the discount terms in writing (rate,
    term, minimum) before the bake-off.
- **Q12: Can the Enterprise account get g7e quota in US East for about three days?**

## Decision

D-384: Jithin wants two more chips tested after the H100 proof:
- AWS G7-family Blackwell, which is cheaper and easier to get now;
- Trainium, where a discount is promised.

Claude laid out phases 0 to 4 with their gates, proposed H11 to H15 (Jithin fixes them
before any chip run), and listed the kit work for each chip.

## Next step

Phase 0 is unchanged: run it by 27 Nov. In parallel, Jithin answers Q10 to Q12, and
Claude builds the G7e overlay once Q10 is settled.

## Sources

- AWS, Amazon EC2 G7e instances (96 GB GDDR7, 1,597 GB/s per GPU, up to 8 GPUs): https://aws.amazon.com/ec2/instance-types/g7e/ and https://aws.amazon.com/blogs/machine-learning/accelerate-generative-ai-inference-on-amazon-sagemaker-ai-with-g7e-instances/
- AWS, G7e regions (Mar 2026): https://aws.amazon.com/about-aws/whats-new/2026/03/amazon-ec2-g7e-seoul-spain-regions
- AWS, Amazon EC2 G7 instances (RTX PRO 4500 Blackwell, 32 GB per GPU, 2.45× G6 bandwidth): https://aws.amazon.com/blogs/aws/announcing-amazon-ec2-g7-instances-accelerated-by-nvidia-rtx-pro-4500-blackwell-server-edition-gpus/
- Prices: g7e.48xlarge https://instances.vantage.sh/aws/ec2/g7e.48xlarge; g7.48xlarge https://calculator.holori.com/aws/ec2/g7.48xlarge/us-east-1; p5.48xlarge https://calculator.holori.com/aws/ec2/p5.48xlarge/us-east-1; p6-b200 https://gpu-cost.pages.dev/provider/aws/; trn2 Capacity Blocks https://aws.amazon.com/ec2/capacityblocks/pricing
- Trainium2 chip (96 GB HBM3, 2.9 TB/s, 1.3 PFLOPs FP8): https://www.markaicode.com/vs/aws-trainium-2-vs-gpu-for-fine-tuning/
- AWS, Trainium3 (144 GB HBM3e, 4.9 TB/s per chip): https://aws.amazon.com/tw/machine-learning/trainium/ and https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-ec2-trn3-ultraservers
- Neuron docs, Trn3 architecture (UltraServer configurations, 4 chips per server): https://awsdocs-neuron.readthedocs-hosted.com/en/latest/about-neuron/arch/neuron-hardware/trn3-arch.html
- Neuron docs, vLLM with NxD Inference (supported models; EAGLE V1 and V3): https://awsdocs-neuron.readthedocs-hosted.com/en/latest/libraries/nxd-inference/developer_guides/vllm-user-guide-v1.html
- Neuron docs, vLLM Neuron plugin (beta, Trn2 and Trn3; EAGLE-3; model onboarding): https://awsdocs-neuron.readthedocs-hosted.com/en/latest/vllm-neuron/docs/index.html and https://awsdocs-neuron.readthedocs-hosted.com/en/latest/libraries/vllm-neuron/neuron-inference-overview.html
