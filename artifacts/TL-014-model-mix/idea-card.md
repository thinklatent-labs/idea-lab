<!-- Exported from https://claude.ai/artifact/LEufPZM5G332V5Co5oDk8X (rev 30) on 2026-11-04. Read-only mirror; edit the live doc, not this file. -->
# TLM model mix (model-mix) — Idea card

Nov 2, 2026 · @Jithin Pradeep

## Lab record

| Field | Value |
| --- | --- |
| ID and slug | TL-014 model-mix |
| Type | Idea |
| Stage | Shaping (architecture decided 2026-11-03: B, label-token LoRA on the 7B Core, Gemma 4 E2B, FP8, vLLM /v1/systemone) |
| Theme | T-001 Sovereign AI |
| Horizon | H2 |
| Owner | Jithin (Head of ThinkLatent) |
| Aliases | model mix, model classes, CLM, CDM, decision models, System One decision models, TLM5, trajectory engine, Jev, Laya, Kev, CLM-8B |
| Links | related-to TL-011 domain-model-portfolio and TL-008 harness-served; TL-015 group-evolving-agents depends-on this idea |
| Standard | v1 |

## The seed

The TLM line today is made entirely of token models: BERT-style encoders (TLM1), sparse and dense LLMs (TLM2 to TLM4 Core), small distilled models (Distil) and Domain models built on Core. TL-014 adds two new model classes and composes them with the existing ones into one mix, all served on the same stack:

- **CLM, the Contrastive Language Model.** A non-autoregressive decision engine in the style of CLM-8B: the state and each candidate action are encoded contrastively and the closest match is chosen. It returns choices, scores and probabilities, not text. (Correction, 2026-11-02: the first draft read Jithin's "Jev type" as JEPA. Jev is TypeSafe AI's decision model, the product CLM-8B competes with.)
- **CDM, the Constrained Decoding Model.** A generator whose output is held to a grammar, schema or allowed set at decode time, served through vLLM.
- **TLM5, the System 1 thinking model.** The trajectory engine: an advanced class of System 1 thinking that learns from observation and predicts where a conversation or set of events is heading, weighing the factors in play. Referred to only as TLM5 (Jithin, 2026-11-02); the name System 1 is retired.

## CDM: what it is for

Jithin's interest (2026-11-02): the CDM is a decision tool, not a writer. A prompt goes in together with a set of predefined schemas or options; the exact option, or a populated rigid JSON object, comes out. It is a high-speed classifier and extractor rather than a generator of paragraphs.

Two mechanisms sit behind that:

- **Option choice.** Each allowed option is scored against the prompt and the most likely one is taken. This needs one forward pass over the prompt and options, with no generation loop at all.
- **Schema filling.** Decoding is masked by a grammar compiled from the schema. Fixed structure (keys, brackets, enumerations with one legal continuation) is skipped forward, and only the value tokens are generated. The loop is shortened, not removed, so latency depends on how much of the output is free values.

Where it plays: routing and intent, extraction from documents and calls, compliance pre-review flags, and agent tool choice. These are the bounded, high-volume workflows named in the draft strategy spine.

Questions this raises, for later sessions:

- **Against a fine-tuned BERT-style classifier.** The CDM's edge is that options and schemas are set per request, with no retraining. The encoder's edge is cost and latency on a fixed label set. Where is the crossover?
- **Against Core with vLLM structured outputs.** What does a dedicated CDM add: training on constrained tasks, calibrated option scores, a smaller model?
- **Calibration.** Can the option score serve as a confidence that triggers escalation in a cascade (option 3)?

Candidate hypothesis to pre-register at Shaping (H-CDM1): on Enterprise classification and extraction tasks, a CDM matches Core 27B's accuracy at a fraction of its latency and cost, and beats a fine-tuned encoder wherever the option set changes faster than the encoder can be retrained. Confirmed if both hold on the index; refuted if Core in constrained mode is as fast and cheap, or if the encoder wins even on changing option sets.

## Market: decision models (scout check, 2026-11-02)

A quick check prompted by Jithin naming the field. It is not the full Scout pass.

| Model | Who | Architecture | Access | Reported strengths and weaknesses |
| --- | --- | --- | --- | --- |
| Jev | TypeSafe AI, released 2026-09-15 | Proprietary, non-autoregressive | Hosted API only ($0.042 per million input tokens) | Strongest on large label sets in the reports seen; a hosted API, so not usable on Enterprise data under the sovereign stance; a benchmark only |
| Laya | Convai Innovations | Encoder (ModernBERT-large, 421M) with a typed decision head | Open weights, Apache 2.0 | Around 33 ms on a T4 and under 1 GB of memory; weak on large option sets (reported 0.425 on Banking77 against Jev's 0.870); fine-tunable |
| Kev | Jared Palmer | Open-source family on Qwen3.5 decoders, 0.8B to 27B; a local-first recipe to replicate Jev | Open weights | Jev-compatible interface; reported calibration drift greater than Jev's |
| CLM-8B | Contrastive-LM, released 2026-09-23 (reports differ: Stanford and Nvidia, or independent researchers) | Frozen Qwen3-8B backbone, state and action projection heads, InfoNCE contrastive training | Open weights, Apache 2.0 | Up to 9x faster than Jev zero-shot, most when the option menu is stable and its embeddings are cached; scores supplied candidates only |

The shared interface is typed questions: Choice (pick one), Score (a graded level) and a yes/no type, each returned with calibrated probabilities.

What this means for TL-014 (Brainstorm, not yet evaluated):

- **CLM and CDM may be one class.** Jithin's CDM description is the category the market calls "System One" decision models; the CLM is one architecture inside it. Option: one TLM class, the decision model, with three architectures under it.
- **TLM already holds a base for each architecture.** An encoder head on the Enterprise BERT (TLM1), as Laya does; adapters on Distil or Core, as Kev does on Qwen; contrastive heads on a frozen Core, as CLM-8B does.
- **Sovereign by construction.** Laya and CLM-8B are open weights and run inside the boundary; Jev is a comparison point, never a dependency.
- **A common interface for Relay.** One decision endpoint type (Choice, Score, yes/no) that any of the architectures can stand behind, so use cases switch models without code changes.
- **A cheap first experiment.** Shadow one existing routing or classification use case with Laya, CLM-8B and Kev against Core 27B in constrained mode and the TLM1 BERT, scored on the index for accuracy, calibration, latency and cost.
- **A governance point.** A model that cannot generate text offers a smaller prompt-injection surface, which one pentest paper argues directly.
- **Name clash resolved.** The trajectory engine is now referred to only as TLM5 (Jithin, 2026-11-02), so the market's System One term can be used for decision models without a collision.

Sources: [CLM-8B write-up (Kaya Today)](https://kayatoday.com/news/stanford-nvidia-clm-8b-faster-ai-agent-decision-model/); [CLM-8B specs and serving (aicybr)](https://aicybr.com/blog/clm-8b-contrastive-language-model-agent-decisions); [Jev and Laya in pentest harnesses (arXiv 2609.28940)](https://arxiv.org/html/2609.28940v1); [Laya vs Kev (Layer3Labs)](https://www.layer3labs.io/comparisons/laya-vs-kev); [Laya vs Jev](https://medium.com/@visrow/what-is-laya-laya-vs-jev-with-live-demo-42c2ab494e02)

## Critic pass: which one architecture to build (2026-11-03)

Jithin's framing: the Enterprise builds one decision-model architecture, not three. It is judged on general performance, on whether it can be trained further for specific applications, and on engineering feasibility.

|  | A. Encoder with decision head (Laya pattern) | B. Decoder adapter on TLM4 Core (Kev pattern) | C. Contrastive heads on a frozen backbone (CLM-8B pattern) |
| --- | --- | --- | --- |
| General performance | Fastest and smallest, but the weakest on large option sets and on reasoning-heavy decisions; a short context window | Carries Core's knowledge of Enterprise data; handles long context and open option sets; the option text and the state attend to each other, so close options are told apart | Strong on ranking many actions; the state and the options are encoded separately, so fine distinctions between near-identical options are where it is weakest |
| Further training per application | Cheap full fine-tunes, but each one is a separate small model and needs labelled data | A LoRA adapter per application on one shared Core, the same shape as the Domain tier; reuses the self-healing SFT pipeline and existing training data | Only the heads train, so it is cheap; the ceiling is set by a frozen backbone it cannot adapt; needs a new contrastive-pairs and hard-negatives pipeline |
| Engineering feasibility | Trivial to serve (CPU or a small GPU); a separate model line from TLM4 | Runs on what is there: Gemma Core on vLLM, HyperPod, multi-LoRA serving, Relay; the Kev recipe is open but built on Qwen and must be ported to Gemma | Two services (backbone pooling and scoring) plus an action-embedding cache; the heads must be retrained on Gemma embeddings |
| Covers both CDM jobs (choose an option and fill a schema) | Choice only | Both: single-pass scoring for choices, constrained decoding for schemas, on the same weights | Choice only |
| Fits the Core-only rule for Domain models, judges and classifiers | Only if a Core-derived encoder is built | Yes | Only with a frozen Core as the backbone |

**Strongest case against B.** It is the slowest and costliest of the three per decision. Kev's reported calibration drift is worse than Jev's. With 50 or more options, every option sits in the prompt each time, where C would score cached embeddings. Porting the recipe to Gemma is real work with no published result behind it.

**Strongest case for B.** It is the only architecture that does both jobs the CDM was wanted for: choosing an option and filling a rigid schema. It inherits Core's advantage on Enterprise data, which is the moat. It trains through the pipelines the team already runs. It serves on the stack already in production. A and C each need a new model line or new serving pieces, and neither can fill a schema.

**Recommendation: B, a decision adapter on the smallest TLM4 Core that meets the bar.** A and C are not built. Laya, CLM-8B and Kev are kept as open benchmarks, and A stays the fallback for latency-critical routes if B misses its latency target.

**Pre-registered hypothesis H-DM1.** A Core decision adapter that scores options in one forward pass:

- matches Core 27B in constrained-decoding mode on the index's decision tasks to within 2 points;
- has calibration error of 0.05 or less;
- answers a 5-option classification in under 50 ms (Jithin, 2026-11-03; taken as p50 model time per request on the production GPU; the end-to-end and concurrency figures are still to be set).

Confirmed if all three hold. Refuted if accuracy or calibration misses. If only latency misses, B stays for extraction and option choice moves to a distilled encoder (A).

Kill criteria: the hypothesis is refuted on two Core sizes; or Laya or CLM-8B, untrained, beats a trained B adapter on Enterprise tasks; or the Gemma port needs changes to the serving stack beyond multi-LoRA.

**What the 50 ms target implies.** Kev-4B is reported at about 18 ms model time on an H100 for one question; a 27B decoder on a prompt of a few hundred tokens is on the order of 30 to 60 ms for the prefill alone. The target therefore points the decision adapter at the smallest Core (the 4B class), not Core 27B, and makes prompt length a budgeted quantity (the instruction, the options and the input together). Core 27B in constrained mode remains the accuracy reference in H-DM1, not the deployment candidate. If the 4B-class adapter misses accuracy, the fallback order is: a mid-size Core with batching; then an encoder head (A) distilled from the adapter for the latency-critical routes.

**Candidate base: the 7B Core (Jithin, 2026-11-03).** TLM4 has a 7B Core comparable to the Gemma E4B variant (about 4B effective parameters per token, more in total). It is the proposed base for the decision adapter. Rough budget on an H100 at bf16, one request, a 400-token prompt: prefill of roughly 15 to 25 ms including overhead, with one output position read for the option logits, so no decode loop. That is inside 50 ms with room. The risks are elsewhere:

- *Concurrency.* Batching trades latency for throughput: a batch of 16 such prompts is a 6,400-token prefill, which is well over 50 ms per request. Holding 50 ms at load means capping batch size and adding replicas, so the target has a GPU cost.
- *Prompt length.* Latency scales with tokens. The budget is about 500 tokens for instruction, options and input together; long inputs (a full email thread, a document) break it.
- *Prefix caching.* The instruction and option block repeat across requests of one use case, so with vLLM prefix caching only the input tokens are prefilled on each call. This is the single biggest lever and should be in the shadow test.

The estimate is arithmetic, not a measurement. The first shadow-test step is a p50 and p95 latency curve for the 7B Core against batch size and prompt length, with prefix caching on and off.

**FP8 (Jithin, 2026-11-03).** The 7B Core can be served in FP8 through the team's existing quantization pipeline. On H100 that roughly halves weight memory and gives about 1.3x to 1.8x more prefill throughput against bf16, so it mainly buys concurrency headroom: more requests per GPU inside the 50 ms budget, or fewer replicas for the same load. For a single request the gain is smaller, since prefill at this size is compute-bound and FP8 matmuls run faster but overhead does not shrink. Two cautions for the shadow test: FP8 can move the option logits, so calibration is re-measured after quantization and H-DM1's calibration bound is checked on the FP8 model, not the bf16 one; and the LoRA adapter trains in bf16 and is applied over the FP8 base, which vLLM supports, but the accuracy comparison must be adapter-on-FP8 against the bf16 reference. The latency curve is run in both precisions.

### Serving options for the decision adapter (engineering note, 2026-11-03)

**Speculative decoding.** Not relevant to option choice, which has no decode loop to speed up. For schema filling it helps only when the value tokens are long (a multi-field extraction from a document); for short values the draft overhead cancels the gain, and vLLM's structured outputs and speculative decoding have to be verified to run together on the chosen version. Treat it as a later tuning knob for extraction, not part of the design.

**Pooled inference: the options, in order of engineering effort.**

1. *Generate runner, one token, with logprobs (zero new engineering).* The prompt ends at the answer position, `max_tokens=1`, and the option probabilities are read from the returned logprobs. Prefix caching keeps the instruction and option block cached. Works today on the current Relay and vLLM setup and is the baseline for the latency curve.
2. *Prompt logprobs over a JSON skeleton (small engineering).* The full answer skeleton with placeholders is sent as the prompt, and the logprobs at each placeholder position are read from one forward pass. This is the Intern-Decision pattern and gives several decisions per call (the multi-task requirement) with no decode. Needs a Relay helper that builds the skeleton and reads the positions.
3. *vLLM pooling runner with a classification head (moderate engineering).* The adapter is exported as a sequence-classification model (last-token pooling plus a linear head) and served on vLLM's classify or score task, which skips the LM head and sampler. Lowest latency of the four, but the endpoint cannot fill a schema, so it would run beside the generate runner as a second instance of the same weights, and the label set is fixed per head rather than per request.
4. *Custom logits processor or decision head inside vLLM (heavy).* A forked runner that scores all option tokens in one kernel. Only if 1 to 3 miss the target; unlikely to be needed at 7B.

**Shared by all options:** FP8 base, prefix caching, bf16 LoRA adapters through vLLM multi-LoRA so each application has its own adapter on one deployment, and a batch-size cap tuned to the 50 ms p50.

**Recommendation (revised after the scout note below):** serve on vLLM's `/v1/systemone` endpoint, which is options 1 and 2 built in; hold option 3 (a D3-style classification head) in reserve for latency-critical routes. Schema filling stays on the generate runner with structured outputs in every case.

### Scout: vLLM support for decision models and single-request parallel reads (2026-11-03)

**vLLM serves decision models natively.** Since v0.32 (October 2026) vLLM has a `/v1/systemone` endpoint (TypeSafe's System One request format) and an OpenAI-compatible `/v1/decisions` endpoint. Both are on by default for generation models with a registered read strategy; `Gemma4ForCausalLM` and `Qwen3ForCausalLM` are listed. The endpoint takes one state and up to 64 typed questions (choice up to 26 options, noul, score up to 10 levels) and returns probabilities per option plus a confidence. It needs `--logprobs-mode raw_logprobs`. This replaces option 1 in the serving list: no Relay helper is needed for multi-question calls.

**How one request is processed in parallel.** Three designs exist today:

| Design | Who uses it | Mechanism | Trade |
| --- | --- | --- | --- |
| Separate reads, shared prefix | vLLM `/v1/systemone` default; `open-alternative-jev` separate mode | Each question is its own sequence: state + question + options, read at the first reply token. With prefix caching the state is prefilled once and each question prefills only its own text, then reads one token. The N sequences run in one continuous batch. | Exact, no interference between questions; fastest mode on vLLM in the open-alternative-jev measurements (71.9 q/s against 38.7 packed on Qwen3.5-4B). |
| Packed sequence, several readouts | Kev (pointer head), `open-alternative-jev` packed mode, Intern-Decision | State and all questions in one sequence; logits read at each answer position (`prompt_logprobs` on vLLM). One forward pass. | Fewest tokens when the engine has no prefix cache; on vLLM it is slower than separate. Interference: 6 to 9% of individual answers change with their neighbours, and below 4B parameters accuracy drops. |
| Joint schema head | Cloudflare Clef-Flash and Clef-Omni | A head on the backbone scores every option of every question in one pooling pass (`token_classify`); no label tokens, confidence is the raw probability. | True single pass, but a custom head to train and a fixed prompt (no per-request instructions). |

A fourth, D3 (`vllm-sr/d3`), is a classification head with an answer-code readout: one pass per question, up to 255 options, served as a pooling model; its full-attention layers are bidirectional, so prefix caching is off.

**Correction to the Critic pass.** Kev's pointer-head architecture is not served by vLLM (only by vllm.cpp and Kev's own server). So "port the Kev recipe" is the wrong plan. The vLLM-native recipe for B is: post-train a LoRA on the 7B Core to answer a typed question with its label token at the first reply position (the Liquid d1 pattern), and serve it on `/v1/systemone` with multi-LoRA. Everything else in B is unchanged (Core base, FP8, schema filling on the same weights through generate).

**Measured points worth carrying into H-DM1:**

- Zero-shot label reading already works: a stock Qwen3.6-27B scored 73.7% at ECE 0.020 on the community typed-decisions benchmark, level with Jev's 72.7% at ECE 0.144; a stock 4B scored 59.3% at ECE 0.118. The adapter's job is to close the small-model gap.
- Position bias is real on small models: reversing option order moved a 4B's yes/no accuracy by 13.5 points. Averaging two option orders halves ECE at 1.7x the cost. Decide per use case.
- Confidence on `/v1/systemone` is the chosen label's probability over the whole vocabulary (share of labels times `label_mass`); `label_mass` is a free health signal the adapter should drive close to 1.
- Probabilities can differ between identical requests depending on batch composition and cache hits; `VLLM_BATCH_INVARIANT=1` fixes that at a throughput cost. Relevant to audit and to the calibration test.
- FP8 against bf16 made no difference at 0.6B; still to be measured at 7B.

**Check before Shaping:** confirm that the 7B Core's architecture class has a registered read strategy in the vLLM version the team runs (Gemma 4 is listed; an older Gemma class may return 501 and need a small registration).

**Decision (Jithin, 2026-11-03): Kev is out as a recipe.** The ThinkLatent stack is vLLM-based and Kev's architecture is not served by vLLM, so the decision model follows the vLLM-native path only: a label-token LoRA on the 7B Core, served on `/v1/systemone`. Kev stays in the market table as a published reference number and is not deployed, even for the shadow test.

**What vLLM serves on the decision endpoints (from the v0.32 and latest docs).** Two kinds:

1. *Any supported generation model, no training.* The read strategy takes the label token's logprobs at the first reply position. Listed architectures: `Gemma4ForCausalLM` (google/gemma-4-E2B-it), `Gemma4ForConditionalGeneration` and `Gemma4UnifiedForConditionalGeneration` (gemma-4-12B-it, with images, video and audio), `Qwen3ForCausalLM` (Qwen3-0.6B and up), `Qwen3_5ForConditionalGeneration` (Qwen3.5-0.8B and up) and `Qwen3_5MoeForConditionalGeneration` (Qwen3.5-35B-A3B), and `DiffusionGemmaForBlockDiffusion` (diffusiongemma-26B-A4B-it, which can also read several questions jointly from one canvas).
2. *Dedicated decision checkpoints:* Cloudflare Clef-Flash (Qwen3.5-9B backbone plus a joint schema head; every option of every question scored in one pooling pass; 16k context; text, images, video); Cloudflare Clef-Omni (the same head on the Qwen3-Omni thinker, adds audio); Decision 3.0 from vllm-sr (a Qwen3.5 backbone with a linear answer-code head read at the last token, one pass per question, up to 255 options, six sizes from 0.6B edge to 27B; bidirectional full-attention layers, so no prefix caching); Liquid d1-3B (LFM2.5-VL-3B post-trained to answer at the first token, served as a generative model).

For TL-014: the Gemma 4 E2B and E4B classes are supported out of the box. If the 7B Core is Gemma 4 E4B-based, `/v1/systemone` works with no registration; if it is an earlier Gemma class, a read strategy must be registered first (the check before Shaping).

**Base confirmed (Jithin, 2026-11-03): the 7B Core is built on google/gemma-4-E2B-it**, which vLLM lists for `/v1/systemone`, so no read-strategy registration is needed. Latency view for a 5-option classification, one question per request:

- The model runs about 2B effective parameters per token (E2B), so a 400-token prefill plus one read is on the order of 10 to 20 ms of model time on an H100 in bf16, and less in FP8. Published comparators: Kev-4B about 18 ms model time on an H100; Laya about 33 ms on a T4; Jev 236 to 276 ms p50 over its API. End-to-end on the same host adds the chat-template render, scheduling step and HTTP, roughly 5 to 15 ms more. Under 50 ms end-to-end at light load is the expectation; under 50 ms at production concurrency depends on the batch cap and replica count as noted above.
- Settings that matter: load the text-only class (`Gemma4ForCausalLM`), not the multimodal one, so no vision tower is loaded; thinking off in `chat_template_kwargs`, otherwise the first token is a thinking marker rather than a label; prefix caching on (the instruction and option block repeats); CUDA graphs on (no enforce-eager); `--logprobs-mode raw_logprobs`.
- The accuracy side moves the other way at E2B: independent measurements put stock 2B-class models well behind 4B on typed decisions (47% against 59%), with larger position bias and more interference when several questions are packed. For an E2B base the label-token adapter is mandatory rather than an improvement, questions should be read separately rather than packed, and H-DM1's accuracy condition (within 2 points of Core 27B in constrained mode) is the real risk, not latency.

The latency curve stays the first shadow-test step; the numbers above are estimates and comparators, not measurements.

**Published latency numbers for decision models on vLLM and on Gemma 4 E2B (scouted 2026-11-03).** vLLM has not published a standalone benchmark for `/v1/systemone`; the numbers come from the vLLM PR that added d3, the Red Hat article on DiffusionGemma decisions, and third parties.

| Source | Model and base | Hardware | Reported latency | Note |
| --- | --- | --- | --- | --- |
| vLLM PR #61565 (d3 support) | d3-edge 0.6B / d3-mini 4B / d3 27B, Qwen3.5 | not stated (datacenter GPU) | one request at a time, p50: 7.0 / 19.4 / 54.9 ms on the shortest workload; 29 to 48 ms (edge), 64 to 261 ms (mini) and 216 to 700 ms (27B) on longer states and multi-question requests | Serving: d3-mini 15.8 req/s at 30 ms p50, rising to 43 to 45 req/s at 166 ms to 1.4 s p50 under load; each question is its own engine request, so multi-question requests on small models are slower than in-process |
| Strands Decider (Gemma 4 family) | E2B / E4B / 12B / 26B-A4B decision LoRAs on google/gemma-4-E2B-it and siblings | one H100 80 GB | median per question: E2B 102 ms, E4B 139 ms, 12B 136 ms on JevBench v1 (231 tasks) | E2B scored 77.9% on JevBench; readout averages three heads; the release itself says to measure on your own stack |
| classone-gemma4-e2b | LoRA plus decision heads on gemma-4-e2b-it | RTX 5060 Ti, fp16 | 64.6 ms mean, 65.7 ms p95 single pass (against 845 ms for 50-token generation) | temperature calibration took ECE from 0.178 to 0.034 |
| Red Hat / Google, DiffusionGemma decisions on vLLM | diffusiongemma-26B-A4B | DGX Spark; Cloud Run | 120 ms at one request at a time, 8.7 req/s; 580 ms at 32 concurrent for 54 req/s (3 questions each); Cloud Run 35 to 60 ms single step, 100 to 123 req/s at batch 32 |  |
| vLLM-SR d3 27B submissions | d3 27B | RTX PRO 6000; H200 | median 108.8 ms per request, one at a time; server time 92 to 123 ms on the decision-bench corpus | 94.2% on decision-bench v4 |
| Decision-1.0-Kai-0.6B | 0.6B | AMD, local | 128 mixed questions in 163 ms with typed scheduling |  |

**What this says for the 50 ms target on the E2B-based Core.**

- The only direct Gemma 4 E2B decision-model measurement on an H100 is 102 ms median per question, twice the target. That workload (JevBench) carries long states; the vLLM PR shows a 4B model at 19 ms on short requests and over 100 ms on long ones. Prompt length, not model size, is the variable that decides whether 50 ms holds.
- Under load, p50 rises fast once batches fill (d3-mini: 30 ms at 16 req/s, 166 ms at 43 req/s). A 50 ms p50 at production concurrency needs a batch cap and replicas, as already noted.
- Each question in a multi-question request is a separate engine request on vLLM, so a 5-question call costs more than one 5-option question; the target as stated (one 5-option classification) is the easy case.

The latency curve therefore needs a prompt-length axis (100, 300, 500, 1,000 and 2,000 tokens) as well as batch size. The estimate of 10 to 20 ms stands only for prompts of a few hundred tokens.

Sources: [vLLM PR #61565](https://github.com/vllm-project/vllm/pull/61565); [Strands Decider Gemma 4 release](https://strandsagents.com/blog/strands-decider-gemma-4-models/); [classone-gemma4-e2b](https://huggingface.co/devops-thiago/classone-gemma4-e2b); [Red Hat: decision models on vLLM with DiffusionGemma](https://developers.redhat.com/articles/2026/09/28/run-decision-model-vllm-and-red-hat-ai); [decision-index PR #128](https://github.com/apolinario/decision-index/pull/128); [decision-bench PR #31](https://github.com/atlanai/decision-bench/pull/31); [Decision-1.0-Kai-0.6B](https://huggingface.co/vllm-sr/Decision-1.0-Kai-0.6B); [ThakiCloud on vLLM v0.32.0](https://thakicloud.com/tech-blog/en/dev/vllm-v0-32-0-systemone-structured-decisions/); for the Scout pass: [benchmarking System One models against trained classifiers (arXiv 2610.00346)](https://arxiv.org/pdf/2610.00346)

### Training recipe: Unsloth decision models (Jithin's link, 2026-11-03)

Unsloth ships a decision-model trainer (`FastDecisionModel`, `DecisionTrainer`) for Qwen3.5, Qwen3.8, Llama 3.2 and Gemma 4. Its design is the Clef pattern, not the label-token pattern: a LoRA on the backbone plus a small joint schema head that reads the LLM's output once over every question and option and scores all options together; it never generates text. Dataset rows are `state`, `questions` (choice, noul, score, with instructions and criteria) and `gold`; this is the same request shape as vLLM's `/v1/systemone`, so one labelled dataset serves either recipe. Reported results after LoRA r=64, one epoch, on a 12-source mix plus typed-decisions, decontaminated test set of 3,000 rows: Qwen3.5-0.8B from 36% to 73% on typed-decisions and from 7% to 74% on BANKING77; Qwen3.5-2B to 78% typed-decisions, 81% holdout; Gemma 4 E4B 77% holdout in 49 minutes on 14.4 GB; a fine-tuned Laya 77% in 10 minutes. Built-in calibration on the held-out split (temperature) with ECE reported; saves adapters plus head, or a merged 16-bit model.

**The catch for TL-014: serving.** Unsloth serves its trained models through its own Decision API (`unsloth studio`, a TypeSafe-compatible `/v1/systemone`), and the guide says nothing about vLLM. vLLM's joint-schema support is registered for Cloudflare's checkpoints (`ClefFlashForJointSchema` on Qwen3.5-9B, `ClefOmniForJointSchema`); whether a Gemma 4 E2B backbone with an Unsloth Clef head loads on vLLM is unverified and probably needs a model registration.

**Two recipes now sit on the table for B:**

|  | Label-token LoRA (d1 pattern) | Clef-head LoRA (Unsloth) |
| --- | --- | --- |
| Multi-question request | Each question is its own read; state shared through the prefix cache | All questions in one forward pass |
| vLLM serving | Native today on `/v1/systemone` with multi-LoRA | Not shown; needs a registration or Unsloth's server |
| Small-model accuracy | Zero-shot 2B-class around 47%; adapter gain unmeasured | 0.8B to 73 to 78% measured; strongest evidence for small backbones |
| Promptable instructions | Yes, through the chat template | Prompt is fixed by the head's format; options and instructions are data |
| Schema filling on the same weights | Yes (generate runner) | Only if the base weights are also served for generation |
| Training tooling | Standard SFT with label tokens; team's own pipeline | Ready-made trainer, calibration and evaluation |

**Decision (Jithin, 2026-11-03): Unsloth is reference only, not a path.** ThinkLatent keeps its own recipe (label-token LoRA on the 7B Core, served on vLLM's `/v1/systemone`) and its own training pipeline. The Unsloth page is kept here as evidence that the market is converging on the same pattern (LoRA on a small open base, typed questions, calibrated probabilities, no generation) and as a comparator for the accuracy a small base can reach after training. Its Clef head and its dataset format are things to learn from, not adopt. No paired recipe test.

Sources: [Train your own decision model with Unsloth](https://unsloth.ai/docs/basics/train-your-own-decision-model-with-unsloth); [Unsloth Decision API and serving](https://unsloth.ai/docs/models/decision-laya.md)

## Shaping: what it takes to train and serve the decision model (2026-11-03)

Architecture settled by Jithin: B, a label-token LoRA on the 7B Core (Gemma 4 E2B), served in FP8 on vLLM's `/v1/systemone` with multi-LoRA. Reuse-first check, to be confirmed against the capability catalogue in the register.

**Reuses (exists in ThinkLatent today):**

| Capability | Used for |
| --- | --- |
| 7B Core (Gemma 4 E2B base, Enterprise-curated) | The backbone; no new pretraining |
| Self-healing SFT pipeline | The LoRA training run; label-token SFT is ordinary SFT with a one-token answer |
| Model compression pipeline (FP8) | FP8 export of the base |
| HyperPod | Training and serving |
| vLLM serving on HyperPod, multi-LoRA | One deployment, one adapter per application |
| Relay SDK | Client surface for the new endpoint |
| Langfuse logging | Request and probability logging for audit |
| AI index (the TL Index) | Accuracy and calibration scoring against Core 27B constrained and the TLM1 BERT |
| Core 27B | Teacher for synthetic labels and the accuracy reference |

**Creates (new, and reusable by TL-011, TL-012 and TL-015):**

1. *Typed-decision dataset for the Enterprise.* Rows of `state`, `questions`, `gold` drawn from existing routing, intent, extraction-flag and compliance pre-review use cases, plus Core 27B-labelled synthetic rows with human spot checks. The first real work item and the gating one.
2. *Label-token prompt contract.* The training prompt must render exactly as vLLM's `/v1/systemone` renders a question (options labelled A to Z in request order, yes/no, levels 0 to 9, thinking off, one-token labels), so the adapter answers what the endpoint asks. Small, but it must be exact.
3. *Calibration step.* Temperature fitted on the held-out split per adapter; stored with the adapter and applied in Relay or at the endpoint.
4. *Decision evaluation suite on the index.* Accuracy, ECE, Brier and KL to gold, position-bias check (options in both orders), `label_mass` health, and the latency curve (batch size, prompt length, bf16 vs FP8). Reusable for TL-011 judges and classifiers.
5. *Serving configuration.* vLLM at v0.32 or later with `--logprobs-mode raw_logprobs`, prefix caching, CUDA graphs, batch cap tuned to the 50 ms p50, `VLLM_BATCH_INVARIANT` decision for audited routes.
6. *Relay decision client.* A `decide(state, questions)` call and typed answers mirroring the endpoint, so applications never build prompts.

**Open before the first training run (owner: Jithin unless named):**

- Which vLLM version runs on the HyperPod serving stack, and is multi-LoRA on? If below v0.32, `/v1/systemone` is absent and the upgrade is a dependency on TL-008.

  Answered (Jithin, 2026-11-03): the HyperPod environment runs vLLM 0.26.0, so `/v1/systemone` is absent. Jithin wants multiple environments so different endpoints can run different vLLM versions; that is a TL-008 (serving backend) item and TL-014 depends on it. Interim path on 0.26: the generate runner with `max_tokens=1`, `allowed_token_ids` over the label tokens and logprobs, plus prefix caching, which is the same read the endpoint performs; training, the index shadow test and most of the latency curve can proceed on it, and the endpoint swap happens when the new environment exists. Multi-LoRA status on 0.26 still to be confirmed.
- Which existing use case supplies the first labelled data, and how many rows (a few thousand questions is the floor the public results used)?
- 50 ms: model time or end-to-end through Relay?
- Who owns the dataset and the evaluation suite (a named engineer is a graduation requirement)?

### Dataset and deployment shape (2026-11-03)

Jithin's framing: the CDM is built on the current Core with a dataset; the question is one common dataset or one per use case, and whether an application with five tasks means five heads.

**No heads in the chosen recipe.** With the label-token adapter, a task is a question in the request, not a weight in the model. An application with five tasks sends one request with five questions to the same adapter; vLLM reads each at its own position with the state shared through the prefix cache. Heads are a feature of the Clef and Laya recipes, which are not the path.

**Proposed two-tier structure, mirroring the Core-then-Domain rule:**

1. *A common decision dataset and one general decision adapter.* Many question types across many Enterprise contexts (routing, intent, yes/no flags, extraction flags, pre-review, agent tool choice), in `state` / `questions` / `gold` form. Its job is to teach the format, the calibration and the ability to answer a question it has never seen, so new applications start with no training. This is the default endpoint.
2. *A per-application adapter only when earned.* Trained on the application's own rows, when the general adapter misses the accuracy bar on the index or the data cannot be pooled. Never per task: one LoRA per application at most, which keeps the multi-LoRA slot count bounded.

**Why not one dataset per use case from the start:** it fragments the data, multiplies adapters, and gives up the zero-shot property that makes a decision endpoint a platform rather than a set of classifiers. Why not only the common dataset: some applications will need rows the common set cannot hold (confidentiality, domain vocabulary), and the per-application tier is where the Enterprise-data advantage is sharpest.

**H-DM2 (pre-registered):** the general adapter, trained on the common dataset, answers a held-out application's questions within 5 points of an adapter trained on that application's own rows. Confirmed if it holds on two held-out applications; refuted if the gap exceeds 5 points on both, in which case the per-application tier becomes the default and the common dataset is the warm start.

**How the five questions run (clarified 2026-11-04).** On `/v1/systemone` the questions of one request are submitted together as separate engine requests and scheduled into the same continuous batch, so they run in parallel on the GPU, not one after another. The state is shared through the prefix cache, so each question adds only its own suffix and one read. The cost is per-request overhead: the vLLM d3 PR measured a 16-question request on a 0.6B model at 29 ms against 21 ms in-process, and whether questions arriving in the same step reuse each other's freshly computed state blocks, or each prefill it once, is to be measured rather than assumed. Latency-curve axis added: one request with 1, 5 and 10 questions over the same state, against five separate one-question requests.

**Improving one task: a ladder, cheapest first (2026-11-04).** A task never gets its own LoRA.

1. *Rewrite the question.* Sharper instructions and option descriptions in the request. Free, no training, takes effect at once.
2. *Calibrate the task.* A temperature and a decision threshold per task, fitted on a few hundred labelled held-out decisions. Minutes, no training; fixes over- or under-confidence without changing which option wins.
3. *Add the task's rows to the common dataset and retrain the general adapter.* Every application gains; guarded by a regression run on the index so other tasks do not drift (replay of existing rows in each retrain).
4. *Train the application's adapter.* Only when steps 1 to 3 leave a gap or the rows cannot be pooled; one adapter holds all of that application's tasks.

Data needs (estimates to confirm in the first run): a few hundred labelled examples per task to move accuracy, a few hundred more held out for calibration and the regression check.

Sources: [vLLM structured decisions (v0.32)](https://docs.vllm.ai/en/v0.32.0/serving/online_serving/structured_decisions/); [vLLM structured decisions models (latest)](https://docs.vllm.ai/en/latest/models/structured_decisions_models/); [open-alternative-jev benchmarks](https://github.com/ikermoel/open-alternative-jev); [Kev-27B model card](https://huggingface.co/jaredpalmer/kev-27b); [kev for vllm.cpp](https://huggingface.co/mudler/kev-0.8b-vllm-cpp); [vLLM classification pooling](https://docs.vllm.ai/en/stable/models/pooling_models/classify/)

### Requirements check (Jithin, 2026-11-03)

Jithin's required capabilities for the decision model are: yes/no decisions for agents; yes/no decisions routed to this model instead of an LLM; extraction; classification; a confidence score on every decision; several tasks in one call; and promptability (instructions and options given at request time).

| Requirement | A. Encoder head | B. Decoder adapter on Core | C. Contrastive heads |
| --- | --- | --- | --- |
| Confidence score | Yes, native probabilities from the decision head; reported well calibrated | Yes, probabilities from the option-token logits; Kev's reported calibration drifts, so calibrate per task (temperature scaling on held-out data) | Partly: similarity scores turned into probabilities relative to the candidates offered, so it is not an absolute confidence |
| Yes/no for agents and routing | Yes | Yes | Only by scoring against an explicit "no" candidate and a threshold |
| Classification | Yes, best on 20 or fewer labels | Yes, including large and changing label sets | Yes, strongest when labels are stable and cached |
| Extraction | No, unless a span head is trained per field | Yes, through constrained decoding into a schema | No |
| Several tasks in one call | Typed questions answered in parallel; limits not published | Yes: several fields scored in one forward pass from a JSON skeleton (the Intern-Decision pattern), with schema filling on the same call | The state embedding is reused across candidate sets, but it ignores the question unless the question is folded into the state |
| Promptable | Weak: a short context and limited instruction following | Strong: inherits Core's instruction following | Options set per request, but instructions are poorly followed |

Result: only B meets every requirement. Its weak point is calibration, which becomes the third condition of H-DM1.

All entries rest on published and community descriptions, not on Enterprise measurements. The shadow test checks them.

## Model-class taxonomy (draft)

| Class | What it is for | Output | Serving (first guess) | Exists today? |
| --- | --- | --- | --- | --- |
| BERT-style encoders (TLM1) | Classify, extract, embed, score | Labels, spans, vectors | vLLM pooling runner or current hosting | Yes |
| CLM (contrastive decision model) | Choose among candidate actions or labels for a state: route, rank, triage, select a tool | Choice, score, yes/no, ranking with probabilities | Backbone on vLLM's pooling server plus a small scoring service (CLM-8B's published pattern) | No |
| CDM | Generation that must land in an allowed space (schemas, labels, tool calls, approved phrasing) | Structured text | vLLM structured outputs | No as a class; vLLM has the feature |
| SLMs (TLM4 Distil and small Core) | Bounded, cheap generation | Text | vLLM on HyperPod | Yes |
| LLMs (TLM4 Core 27B, Domain) | Open generation and reasoning on Enterprise data | Text | vLLM on HyperPod | Yes |
| TLM5 (the trajectory engine; the LWM) | Advanced System 1 thinking: learns from observation and predicts where a conversation or set of events is heading, weighing the factors in play; guides a frontier model's prompting | States, guidance | Open | Yes, as the trajectory engine (formerly System 1); referred to only as TLM5 from 2026-11-02 |
| Judges (TL-011 Build 1) | Grade, reward, check groundedness | Scores, rationales | vLLM | Proposed |

## Divergent options: how the mix could work

The Brainstorm stage: options are listed, not evaluated.

1. **Catalogue.** The classes sit side by side and each use case picks one. The smallest change from today.
2. **System 1 router.** The CLM reads every request and sends it to the cheapest class that will be sufficient. The router is the product.
3. **Cascade.** System 1 answers when confident; otherwise it escalates to a CDM or SLM, and only then to an LLM.
4. **Anticipate, then generate.** The CLM predicts the next state; a CDM generates the constrained action for it; an LLM is called only for open text.
5. **Latent conditioning.** CLM embeddings condition the generators as soft prompts or retrieval keys. This is the nearest reading of TLM5 guiding a frontier model's prompting.
6. **Constraint as governance.** A CDM's grammar is the approved output space for a use case, so the governance artefact is the grammar itself, versioned on the use-case record.
7. **CLM as the expected-outcome signal.** The gap between the predicted next state and what actually happened flags drift, novel cases and failure. It can feed self-healing (TL-005) and serve as a fitness signal for TL-015.
8. **CLM as shared latent memory.** Agents in TL-012 and TL-015 read and write institutional knowledge as CLM embeddings rather than as text.
9. **CLM for task mining.** Contrastive embeddings of interactions cluster tasks per endpoint for TL-012 and choose TL-011's first adapters.
10. **CDM for reliable tool calls.** Every agent action in TL-012 goes through a CDM, so tool calls are well-formed by construction.
11. **Contrarian: no new classes.** A CLM is a better embedding model and a CDM is a vLLM feature; the mix is a router plus a policy, not new models.
12. **Contrarian: one model, many heads.** Contrastive decision heads on a frozen Core and constrained decoding on the same weights, instead of separate model classes.
13. **Contrarian: TLM5 subsumes the CLM.** TLM5 already learns from observation and predicts; a small contrastive decision model could be its fast front end rather than a separate class.

## Flags for the Critic session

Recorded now so they are not lost; not evaluated in this session.

- Decision models are weeks old: Jev was released on 2026-09-15 and CLM-8B on 2026-09-23. Published numbers are vendor- or community-reported and mostly not paired, and nothing has been measured on Enterprise tasks yet.
- Serving is largely answered for the CLM: CLM-8B runs its backbone on vLLM's pooling server with a small scoring service beside it. Still open for a TLM-built variant on Gemma.
- A CDM may be a serving mode on any generator rather than a separately trained model. Whether training under constraints beats constraining an existing model is an open, testable question.
- Resolved (Jithin, 2026-11-02): the trajectory engine is referred to only as TLM5, so the market's term System One for decision models no longer clashes with an Enterprise name.

## Open questions

| Question | Owner |
| --- | --- |
| Answered (Jithin, 2026-11-02): the trajectory engine is advanced System 1 thinking, referred to only as TLM5; decision models (CLM, CDM) are a separate, simpler class. | Jithin |
| CDM purpose answered (a decision and extraction tool). Still open: a dedicated trained model or Core in constrained mode, and where it beats a fine-tuned encoder? | Jithin |
| What is the CLM's first job, the one that would justify building it? | Jithin |
| Which composition option (1 to 13) is the bet, and which are later? | Jithin, at the next session |
| Can a TLM decision model be served the CLM-8B way (backbone on vLLM pooling, scoring heads beside it) on HyperPod? | Harness and platform lead (to be named) |

## Sessions

| Date | Mode | Outcome |
| --- | --- | --- |
| 2026-11-02 | Brainstorm | CLM and CDM defined by Jithin; draft taxonomy of eight model classes; thirteen composition options; four flags recorded for the Critic session |
| 2026-11-02 | Brainstorm (with a scout check) | CDM purpose set by Jithin; CLM placed in the decision-model market (Jev, Laya, Kev, CLM-8B); JEPA reading corrected; CLM and CDM proposed as one class with three architectures |
| 2026-11-02 | Brainstorm | Trajectory engine renamed: referred to only as TLM5 (advanced System 1 thinking); System 1 row merged into the TLM5 row; name clash resolved |
| 2026-11-03 | Critic | Three architectures compared on performance, trainability and feasibility; recommendation B (decision adapter on TLM4 Core); H-DM1 and kill criteria recorded; decision pending Jithin |
