<!-- Exported from Idea Lab project knowledge (claude/scout-brief-serving-telemetry.md, created 2026-11-02T08:02:14.014900Z) on 2026-11-04. Read-only mirror; edit the project doc, not this file. -->
# Scout brief: serving telemetry — what the best serving dashboards and benchmarks measure

Mode: Scout. Lane: serving metrics, request-shape analytics, capacity and economics, harness-relevant telemetry, chart forms. Public sources only; the firm, its products and its numbers are not named. Date: 2026-11-02.

Reading guide: every metric below is tagged with the decision it supports, because that is the test for whether a panel belongs on the Traffic, Models or Capacity page. Claims I could not confirm from a primary source are marked **[unverified]**.

---

## 1. Serving metrics: definitions, who exposes them, what decision they support

The engines agree on the vocabulary but not on the measurement point, so the portal must say which it uses. vLLM measures TTFT from frontend arrival, so it includes tokenisation and queueing; SGLang stops the TTFT clock at first detokenised output for streaming requests but at the scheduler's first token for non-streaming; GenAI-Perf measures from the client, so network is included. The NVIDIA benchmarking primer gives the canonical formulas: e2e = TTFT + generation time; ITL = (e2e − TTFT) / (output tokens − 1); per-user tokens/s = output length / e2e, which tends to 1/ITL as outputs grow.

| Metric | Definition | Exposed by | Decision it supports |
|---|---|---|---|
| Time to first token | Arrival to first token; vLLM and SGLang include queue + prefill | `vllm:time_to_first_token_seconds`, `sglang:time_to_first_token_seconds`, `dynamo_frontend_time_to_first_token_seconds`, GenAI-Perf TTFT. TGI has no TTFT histogram | Chat responsiveness SLO; whether the use case is queue-bound or prompt-bound (split with queue and prefill time) |
| Queue time | Queued to scheduled | `vllm:request_queue_time_seconds`, `tgi_request_queue_duration`, Dynamo `stage_requests{stage=preprocess\|route\|dispatch}`, `nv_trt_llm_request_metrics{request_type=waiting}` | The earliest capacity-exhaustion signal; add a replica or shed load when p99 climbs |
| Prefill, decode, inference time | Per-request phase durations | `vllm:request_prefill_time_seconds`, `request_decode_time_seconds`, `request_inference_time_seconds`; `tgi_batch_forward_duration{method=prefill\|decode}` | Attribute TTFT and e2e to phase; size chunked-prefill budgets |
| Inter-token latency | Gap between consecutive streamed outputs, one sample per output event | `vllm:inter_token_latency_seconds`, `sglang:inter_token_latency_seconds`, `dynamo_frontend_inter_token_latency_seconds`, GenAI-Perf ITL | p99 ITL catches generation stalls that TPOT averages away; streaming smoothness SLO |
| Time per output token (TPOT) | Per request, (e2e − TTFT)/(n − 1) | `vllm:request_time_per_output_token_seconds`, `sglang:request_time_per_output_token_seconds{is_streaming}`, `tgi_request_mean_time_per_token_duration` | Decode rate per request; cross-check against ITL |
| End-to-end latency | Arrival to last token | `vllm:e2e_request_latency_seconds`, `tgi_request_duration`, `dynamo_frontend_request_duration_seconds`, GenAI-Perf request latency | Completion SLO for non-streaming and agent calls |
| Request and token throughput | Completed requests and tokens per second | `vllm:prompt_tokens_total` / `generation_tokens_total`, `sglang:gen_throughput`, `dynamo_frontend_output_tokens_total`, `tgi_request_count`, GenAI-Perf output token and request throughput | Capacity consumed; denominator for cost per token |
| Goodput | Requests/s (or per GPU) that meet every SLO | GenAI-Perf `--goodput request_latency:300 output_token_throughput_per_user:600`; DistServe defines it as the maximum rate per GPU at a given SLO attainment (90% in the paper) | The only throughput number to plan capacity with |
| Running and waiting requests | Scheduled vs queued | `vllm:num_requests_running` / `num_requests_waiting`, `sglang:num_running_reqs` / `num_queue_reqs`, `nv_trt_llm_request_metrics{active,scheduled,context,max}`, `dynamo_frontend_active_requests` | Concurrency against the engine's batch ceiling |
| Batch size and tokens per iteration | Tokens or requests scheduled per step | `vllm:iteration_tokens_total` (histogram), `tgi_batch_current_size`, `tgi_batch_next_size`, `tgi_batch_current_max_tokens`, `nv_trt_llm_inflight_batcher_metrics{generation_requests,total_context_tokens}` | Whether decode batches are large enough to be efficient (Splitwise shows decode throughput still rising at batch 64) |
| KV-cache usage | Fraction of KV blocks in use | `vllm:kv_cache_usage_perc`, `sglang:token_usage`, `nv_trt_llm_kv_cache_block_metrics{fraction,used,free,max,tokens_per}`, `dynamo_frontend_worker_active_decode_blocks` | Memory saturation; the Gateway API Inference Extension sheds at 80%, and the llm-d dashboards treat sustained >90% as unhealthy |
| Preemptions | Requests evicted from the batch and recomputed | `vllm:num_preemptions` (counter; appears as `num_preemptions_total` in some exporters) | Memory pressure that shows up as TTFT and ITL spikes; tune `gpu_memory_utilization` or `max_num_seqs` |
| Prefix-cache hit rate | Cached prompt tokens over queried prompt tokens | `vllm:prefix_cache_hits` / `prefix_cache_queries` (counters in tokens, ratio by `rate()`), `sglang:cache_hit_rate` (gauge), `dynamo_frontend_cached_tokens` (per-request histogram), `dynamo_component_router_kv_hit_rate` (predicted at routing) | Prefill work avoided; routing affinity; harness return on investment (section 4) |
| KV block residency | Block lifetime, idle-before-evict, reuse gap (sampled) | `vllm:kv_block_lifetime_seconds`, `kv_block_idle_before_evict_seconds`, `kv_block_reuse_gap_seconds` with `--kv-cache-metrics-sample` | Whether a session's cache survives until the next turn |
| Speculative decoding | Draft and accepted tokens, acceptance by position | `vllm:spec_decode_num_accepted_tokens_per_pos`, legacy draft acceptance rate and efficiency gauges; `sglang:spec_num_steps` / `spec_num_draft_tokens`; `tgi_request_skipped_tokens` | Whether speculation pays for this use case's output style; disable under high concurrency |
| Request length distributions | Prompt and generation tokens per request | `vllm:request_prompt_tokens`, `request_generation_tokens`, `request_max_num_generation_tokens`; `tgi_request_input_length`, `tgi_request_generated_tokens`, `tgi_request_max_new_tokens`; `dynamo_frontend_input_sequence_tokens` / `output_sequence_tokens`; GenAI-Perf ISL/OSL | Shape matrix; capacity planning by shape |
| Finish reason and rejections | `stop`, `length`, `abort`; admission rejections | `vllm:request_success{finished_reason}`, `vllm:admission_rejections_total{reason}`, `dynamo_frontend_model_rejection_total` (HTTP 529), `dynamo_frontend_disconnected_clients` | Errors page: `length` means truncation by `max_tokens`; `abort` means client gave up |
| Adapter state | Running and waiting LoRA adapters | `vllm:lora_requests_info{running_lora_adapters,waiting_lora_adapters,max_lora}` | Multi-adapter contention |
| Disaggregation overheads | KV transfer time; prefill/decode worker load; routing overhead | `nv_trt_llm_disaggregated_serving_metrics{kv_cache_transfer_ms}`, Dynamo `worker_active_prefill_tokens`, `router_overlap_blocks_lost`, `dynamo_router_overhead_total_ms`; llm-d `llm_d_epp_scheduler_e2e_duration_seconds` | Whether the gateway or transfer, not the model, is adding latency |
| GPU utilisation, memory, MFU | SM activity, memory used; SGLang's estimated FLOPs and bytes per GPU | DCGM exporter (`accelerator_gpu_utilization` in the Red Hat llm-d dashboards; DCGM field names **[unverified]**), `nv_trt_llm_runtime_memory_metrics{gpu,cpu,pinned}`, `sglang:estimated_flops_per_gpu_total` with `--enable-mfu-metrics`, Run:ai allocation and utilisation | Dedicated-GPU waste; the llm-d dashboards call 40–80% healthy and sustained >95% saturated |

Two design notes from the vLLM metrics design document are worth copying: server-level gauges explain request-level histograms, and the histograms are the SLOs; and hit rate is exposed as two counters rather than a gauge so any window can be computed, so the portal should never store a pre-averaged rate. KServe re-exports vLLM metrics under a `kserve_vllm:` prefix (seen only in the Red Hat dashboards; **[unverified]** beyond that).

---

## 2. Request-shape analytics

### 2.1 What real traces look like

| Trace | Input tokens | Output tokens | Shape notes |
|---|---|---|---|
| Splitwise, Azure coding service (2023) | median 1,500 | median 13 | ~115:1; service runs a single active token >20% of the time |
| Splitwise, Azure conversation | median 1,020 | median 129 | ~8:1; output "almost bimodal"; 60–70% of time ≤20 active tokens |
| Sarathi-Serve, openchat_sharegpt4 | median 1,730; p90 5,696 | median 415; p90 834 | chat with long tail on prompts |
| Sarathi-Serve, arxiv_summarization | median 7,059; p90 12,985 | median 208; p90 371 | summarisation: prefill-dominated |
| Mooncake, Kimi production trace (1 h, 23,608 requests) | mean 7,590 | mean 182 | hash IDs over 512-token blocks; ~51% prefix hit ratio with unlimited cache, 0.50 at 50k LRU blocks, 0.30 at 1k blocks; over half of blocks never reused while some are hit tens of thousands of times (the paper's own stated input:output ratio does not match these means; **[unverified]**) |
| BurstGPT (10M+ requests, Azure OpenAI) | Zipf-distributed request lengths | ChatGPT responses bimodal | Gamma-distributed burstiness; conversation traffic periodic by weekday and working hour, API traffic aperiodic; conversation failure rate above 5% |

NVIDIA's primer classes workloads by order of magnitude: translation 500–2,000 both ways; generation ISL O(100), OSL O(1,000); summarisation and RAG ISL O(1,000), OSL O(100); reasoning ISL O(100), OSL O(1,000–10,000). Those classes are the cells of an input-by-output matrix, which justifies one matrix per use case rather than a single histogram.

### 2.2 Why prefill and decode cost differently by length

Splitwise measured that TTFT grows almost linearly with prompt size, the prompt phase is compute-bound and draws power with batch size, and the token phase is memory-bound: throughput keeps rising with batch size up to 64, while a 50% power cap barely moves latency. On BLOOM-176B a 1,500-token prompt costs as much as six output tokens, and prompt batching degrades beyond 2,048 tokens. DistServe adds that prefill compute grows superlinearly with tokens processed in parallel, models TTFT under Poisson arrivals as an M/D/1 queue (Avg TTFT = D + RD²/(2(1 − RD))), and shows a single prefill added to a decode batch slows both. So two use cases with the same tokens/s can need very different GPU counts, and TTFT-by-input-bucket is the chart that reveals it.

### 2.3 Why the same input length yields different outputs

BurstGPT finds ChatGPT's response length correlates only loosely with request length and is bimodal; an open model's response length falls as requests lengthen, with high variance for long requests. Splitwise's conversation outputs are bimodal. Mooncake concludes that per-request output-length prediction is "hard and costly" and plans around load instead. Practical consequence: plan on p90 output per cell, and chart `finished_reason` because `length` finishes are the fingerprint of truncation at `max_tokens`, which also distorts the output axis of the matrix.

### 2.4 How disaggregation and chunked prefill change latency by shape

- **Chunked prefill (Sarathi-Serve).** Prefill-prioritising schedulers stall running decodes while a long prompt is prefilled, spiking time-between-tokens for seconds. Stall-free batching fills each iteration with decodes first, then prefill chunks up to a token budget profiled against the TBT SLO (512 strict, 2,048 relaxed). Costs: chunk overhead up to ~25% at 512 on Yi-34B; a 257-token chunk ran 32% slower than 256 because of tile quantisation. Strict p99 TBT SLOs: 0.1 s (7B), 0.2 s (34B), 1 s (70B). Result: 2.6–5.6× capacity under SLO. vLLM V1 enables chunked prefill by default **[unverified]**; if so, long prompts should show as a modest TTFT rise and a flat ITL tail rather than ITL spikes.
- **Disaggregated prefill/decode.** DistServe serves 7.4× more requests or 12.6× tighter SLOs than colocated baselines at 90% attainment. The cost is KV transfer: 1.13 GB per 512-token request on OPT-66B, 11.3 GB/s at 10 rps. Splitwise overlaps layer-wise transfer with prompt computation and reports 1.4× throughput at 20% lower cost, or 2.35× at the same cost and power. Mooncake sets SLOs relative to an uncontended request (TTFT p90 ≤ 10×, TBT p90 ≤ 5×), predicts prefill time from prompt length and prefix-hit length, estimates queue time as the sum of queued prefill times, and early-rejects with HTTP 429 to avoid wasted prefill.

Telemetry consequence: once prefill and decode are split, TTFT = queue + prefill + transfer, and the Models page must show transfer time (`kv_cache_transfer_ms`, Dynamo router overhead) as its own series or the page will blame the model for the network.

### 2.5 Published views of latency by length

GenAI-Perf's default plots are the closest public artefact to the planned matrix: TTFT vs input sequence length, inter-token latency vs token position, and input vs output sequence length as a scatter. Dynamo exposes input and output lengths as histograms. I found no public dashboard that renders an input-by-output heat map with latency in the cells. The reason is structural: Prometheus histograms are one-dimensional, so the matrix needs request-level records (gateway access logs or trace spans carrying prompt tokens, output tokens, TTFT, e2e, cache hits and finish reason), not scrape metrics. That is a genuine gap the portal can fill.

---

## 3. Capacity and economics

### 3.1 The one curve everyone draws

Every serious benchmark presents the same trade-off: per-GPU throughput against per-user speed as concurrency sweeps. NVIDIA's TensorRT-LLM tuning guide reads the curve by fixing a per-user target of about 50 tokens/s (about 20 ms ITL) and taking the highest per-GPU throughput that still meets it; for Llama-3.1 8B at 128/128 that was ~256 users in FP16 and ~512 in FP8, with per-GPU peaks near 16,600 and 25,000 tokens/s. InferenceX formalises the axes: interactivity is tokens/s/user, approximately 1/ITL (its p90 interactivity is 1/p90 ITL), and "E2E normalised interactivity" is output tokens divided by e2e latency so short answers are penalised for slow TTFT; it compares hardware only at iso-interactivity, on 1k/1k, 1k/8k and 8k/1k shapes plus a multi-turn agent scenario where concurrency means live session trees. Modal's engine almanac draws it as median TTFT against request rate and reports ~8× throughput from relaxing e2e from ~200 ms to ~4 s on a 70B FP8 deployment (~20k tokens/s, roughly 50¢ per million tokens). NVIDIA's primer notes system tokens/s saturates near max batch size while latency keeps climbing, and recommends benchmarking at fixed concurrency rather than fixed request rate.

### 3.2 Cost per million tokens

NVIDIA's cost method is server-based: pick a latency constraint (average TTFT ≤ 250 ms for chat), discard configurations that violate it, keep the highest-throughput survivor, then instances = peak rps ÷ achievable rps per instance; yearly server cost = purchase ÷ depreciation years + licence + hosting (their example: $320k, 4 years, $4.5k and $3k gives $87.5k per year); divide by requests per year, convert to per-token with the use case's ISL/OSL, and split input and output cost with a price ratio (their reference 1:3). Baseten's version for rented GPUs is minutes per thousand tokens × price per minute. The implication for a dedicated-cluster portal: cost per million tokens is a derived series, per use case and per shape cell, equal to GPU-hours attributed ÷ tokens served, and it moves whenever the SLO moves.

### 3.3 How capacity is sold

Both managed offerings describe dedicated capacity as tokens per unit time, with input and output capped separately. Bedrock's model unit is defined by input tokens per minute and output tokens per minute across all requests, bought with no, one-month or six-month commitment. Databricks sells provisioned throughput in tokens/s increments (`throughput_chunk_size`, 980 tokens/s in its example) between a minimum and maximum that autoscale. Neither publishes the benchmark shape behind the band. The portable idea is the framing: a use case's capacity line should read "N input tokens/min and M output tokens/min at p99 TTFT ≤ X", not "G GPUs".

### 3.4 Autoscaling and saturation signals

Ray Serve scales on ongoing requests per replica (`target_ongoing_requests`, default 2; `max_ongoing_requests`, default 5, recommended 20–50% above target), not on GPU utilisation; `min_replicas` 0 trades idle cost for cold starts. The Gateway API Inference Extension's picker (used by Envoy AI Gateway, kgateway and llm-d) reads queue depth, KV-cache usage and LoRA adapter state from the engines: critical requests go to endpoints with queue < 50; sheddable requests need queue < 5 and KV usage < 80%, otherwise they are dropped. llm-d's blog shows why load must be in the score: prefix-only routing collapsed to ~55% success and >140 s TTFT at high QPS, while prefix-plus-load held 100% success, ~30 ms ITL and ~60k tokens/s at 20 QPS. BurstGPT recommends a warm-up arrival rate that lands KV utilisation around 30–40%. A community vLLM/TGI guide's day-one alert set is p95 latency and p99 queue time above thresholds for 10 minutes, error rate >1% for 5 minutes and KV usage >90% for 15 minutes. None of the fetched sources publishes a capacity-exhaustion forecasting method; the usable predictor is Mooncake's per-instance model (predicted prefill time from length and cache hit, queue time as the sum of queued prefills).

### 3.5 Dedicated versus shared, and utilisation

Run:ai's capacity dashboards separate allocated, unallocated and idle-allocated GPUs, and compare quota with allocation per project and department, with a utilisation distribution across devices. That "allocated but idle" series is the number a dedicated-machine-per-use-case model needs most, because allocation looks full while utilisation is not. LoRAX's economics make the shared case: a dedicated 7B deployment on a g5.2xlarge at $1.21/hour is about $900/month, adapters are under 10% of weights, and 100+ adapters fit on one GPU with ~200 ms just-in-time load; vLLM exposes adapter contention via `lora_requests_info` and the inference extension filters on adapter affinity. Modal's note that vLLM takes ~5 minutes to start versus ~1 for SGLang bears on how fast a dedicated endpoint can be rescaled.

### 3.6 SLA framings

Benchmarks report p50, p90/p95 and p99 for TTFT, ITL/TPOT and e2e (GenAI-Perf reports avg, min, max, p75, p90, p99). Baseten's thresholds: TTFT under ~200 ms feels instant; 30 output tokens/s exceeds fast reading, so it is a chat floor. DistServe frames SLO attainment as the share of requests within both TTFT and TPOT limits, with 90% as its goal line. Reading-speed anchors: ~250 words/min (DistServe), 200–300 words/min (Baseten).

---

## 4. Harness-relevant serving telemetry

### 4.1 What exists

- **Engine counters.** vLLM `prefix_cache_hits` / `prefix_cache_queries` in tokens; SGLang `cache_hit_rate`; the sampled vLLM KV block lifetime, idle-before-evict and reuse-gap histograms, which say directly whether a session's blocks survive the gap between turns.
- **Per-request cached tokens.** Dynamo's `dynamo_frontend_cached_tokens` histogram, `router_kv_hit_rate` (predicted at routing time), `router_kv_worker_reused_tokens_total`, and a tokenizer-cache token-reuse ratio. vLLM's OpenAI-compatible usage object reports `prompt_tokens_details.cached_tokens` **[unverified]**; if present it is the cheapest per-turn signal for the harness.
- **Affinity.** AIBrix's session-affinity router returns the pod in an `x-session-id` header and routes later turns back to it, falling back to a random ready pod. llm-d's KV-aware router indexes vLLM block events and scores by longest consecutive prefix match; in its test 99.92% of session traffic stayed on the primary pod. Envoy AI Gateway's picker routes on KV usage, queue and adapter state; prefix affinity is not in the sources I read.
- **Offload.** LMCache keeps KV in CPU DRAM and further tiers so a session's prefix survives GPU eviction.

### 4.2 Evidence that reuse pays

- llm-d shared-prefix test: 87.4% hit rate (4,176 of 4,776), TTFT 2,850 ms cold vs 340 ms warm.
- LMCache multi-turn benchmark (8B model, A10, 10 clients, 5,000-token shared prefix): request throughput 0.37 → 0.73 req/s, median TTFT 18.5 s → 8.0 s, p99 TTFT 24.7 s → 12.0 s, mean TPOT 91.8 → 51.4 ms. No hit rate was measured; reuse was inferred from latency.
- Mooncake trace: ~51% of prompt blocks were reusable in principle, but over half of blocks were never reused, so hit rate depends on cache size and routing, not only on workload.
- SGLang's RadixAttention names multi-turn chat history as one of four reuse patterns and credits KV reuse for part of its up-to-5× throughput, without per-workload hit rates.

### 4.3 What to measure to prove a stateful harness pays for itself

Pre-registered hypothesis: a stateful harness with session affinity raises prefix-cache hit rate with session depth and cuts TTFT and prefill GPU-seconds per turn, at no ITL cost. Confirming evidence: hit rate rises monotonically with turn index and the TTFT gap between hit and miss widens with prompt length. Refuting evidence: hit rate flat across depth (cache evicted between turns, visible as short `kv_block_idle_before_evict` relative to inter-turn gap), or ITL p99 worse on affinity pods (hot-spotting). Measures, all per use case:

1. Context tokens per turn, by turn index (prompt tokens grow roughly linearly with depth; the cached fraction should grow with it).
2. Cached tokens per turn (`cached_tokens` or Dynamo histogram) and the derived prefill tokens saved = cached × turns.
3. Hit rate by session depth bucket (1, 2–3, 4–7, 8+ turns).
4. TTFT by hit/miss and by prompt bucket (the llm-d dashboards already split latency by hit vs miss).
5. Inter-turn gap vs KV block idle-before-evict (the vLLM sampled histogram), to size cache or offload.
6. Session-to-pod stickiness (share of turns landing on the primary pod) and load skew across pods.
7. GPU-seconds saved = prefill time per cached token × cached tokens, converted to cost with the section 3.2 rate.

---

## 5. Visuals the best dashboards use

| Chart | Where it is used | What it answers |
|---|---|---|
| P50/P95/P99 lines over time for TTFT, ITL, e2e | Red Hat llm-d "LLM Performance" dashboard; community vLLM/TGI Grafana guide | Is the SLO holding right now |
| Heat map from `_bucket` rates (latency or token length) | Community guide; vLLM Grafana example uses histogram panels | Shows bimodality that percentiles hide |
| Throughput vs interactivity (tokens/s/GPU vs tokens/s/user) with an SLO line | NVIDIA TensorRT-LLM tuning; InferenceX; Modal (TTFT vs request rate) | Where the use case sits on its own curve; headroom before SLO breach |
| SLO attainment (%) vs offered rate with a goal line; goodput bar | DistServe; GenAI-Perf goodput | Capacity under SLO |
| Stacked running vs waiting requests, with KV usage gauge beside | Community guide; Red Hat "LLM Utilization" | Saturation at a glance |
| TTFT vs input length scatter; ITL vs token position; ISL vs OSL scatter | GenAI-Perf default plots | Shape sensitivity; the ancestor of the matrix |
| Cache hit rate over time; latency split by hit vs miss; request distribution per pod | Red Hat llm-d KV-routing article | Reuse working or not |
| Allocated vs utilised vs idle-allocated GPUs; quota vs allocation per team | Run:ai Overview and Analytics | Dedicated-GPU waste |
| Finish-reason and error breakdown by code | Red Hat "LLM Traffic" | Truncation and client aborts |

---

## What to add to the Traffic, Models and capacity pages (ranked)

1. **Goodput per use case** (requests/s and tokens/s meeting the cell's TTFT, ITL and e2e SLOs), next to raw throughput. DistServe; GenAI-Perf.
2. **TTFT decomposed into queue, prefill and (if disaggregated) KV transfer**, p50/p99 over time. vLLM phase histograms; TensorRT-LLM transfer counter.
3. **Input-by-output matrix with p50 and p99 TTFT and e2e in each cell**, built from request-level logs, not scrape metrics; plus a p90 output column for planning. GenAI-Perf ISL/OSL plot; Splitwise and Sarathi trace statistics.
4. **ITL p99 alongside TPOT**, with a prompt-length overlay, to expose generation stalls. vLLM ITL vs TPOT distinction; Sarathi-Serve.
5. **Per-use-case throughput-vs-interactivity curve from periodic benchmark sweeps**, with current operating point and the SLO line. NVIDIA TensorRT-LLM tuning; InferenceX.
6. **Saturation strip: running vs waiting, KV usage, preemptions/min, queue time p99**, with the 80/90% thresholds the inference extension and llm-d dashboards use. Gateway API Inference Extension; Red Hat llm-d.
7. **Prefix-cache hit rate computed from the two counters over a chosen window, and by session depth**, with TTFT split by hit vs miss. vLLM design doc; Red Hat llm-d; Dynamo.
8. **Finish-reason mix** (`stop` / `length` / `abort`) and rejection counts per use case. vLLM `request_success`; Dynamo rejection and disconnect metrics.
9. **Capacity line expressed as input and output tokens per minute at SLO**, mirroring how managed providers sell units, and derived cost per million tokens per use case. Bedrock; Databricks; NVIDIA cost method.
10. **Allocated vs utilised vs idle-allocated GPUs per use case and team** for the later cluster view. Run:ai.
11. **Batch and iteration-token histograms** to show whether decode batches are large enough on dedicated machines. vLLM `iteration_tokens_total`; TGI batch gauges; Splitwise.
12. **Speculative-decoding acceptance by position and adapter wait counts** where those features are on. vLLM spec-decode and LoRA metrics.

Not covered in budget: Fireworks and Together capacity pages; KServe's own metrics beyond the `kserve_vllm:` pass-through; DCGM field names.

---

## Sources

1. vLLM, "Metrics" (design doc), https://docs.vllm.ai/en/latest/design/metrics.html, accessed 2026-11-02.
2. vLLM, "Production metrics" (usage), https://docs.vllm.ai/en/latest/usage/metrics.html, accessed 2026-11-02.
3. SGLang, "Production Metrics", https://docs.sglang.io/references/production_metrics.html, accessed 2026-11-02.
4. NVIDIA, "LLM Inference Benchmarking: Fundamental Concepts", https://developer.nvidia.com/blog/llm-benchmarking-fundamental-concepts, 2025.
5. NVIDIA Triton, "GenAI-Perf" README (Triton 2.58 archive), https://docs.nvidia.com/deeplearning/triton-inference-server/archives/triton-inference-server-2580/user-guide/docs/perf_analyzer/genai-perf/README.html, 2025.
6. NVIDIA Triton, "TensorRT-LLM Backend" README, metrics section (Triton 2.70 archive), https://docs.nvidia.com/deeplearning/triton-inference-server/archives/triton-inference-server-2700/user-guide/docs/tensorrtllm_backend/README.html, 2026.
7. NVIDIA Dynamo, "Metrics Catalog", https://docs.nvidia.com/dynamo/latest/reference/observability/metrics-catalog.md, 2026.
8. Hugging Face, "Text Generation Inference: Metrics", https://huggingface.co/docs/text-generation-inference/en/reference/metrics, accessed 2026-11-02.
9. Ray, "Advanced Ray Serve Autoscaling", https://docs.ray.io/en/latest/serve/advanced-guides/advanced-autoscaling.html, accessed 2026-11-02.
10. llm-d, "Intelligent Inference Scheduling with llm-d", https://llm-d.ai/blog/intelligent-inference-scheduling-with-llm-d, 2025.
11. Red Hat, "Master KV-cache-aware routing with llm-d", https://developers.redhat.com/articles/2025/10/07/master-kv-cache-aware-routing-llm-d-efficient-ai-inference, 2025-10-07.
12. Red Hat, "Monitor llm-d deployments" (Knowledgebase 7149157), https://access.redhat.com/articles/7149157, 2025–2026.
13. kgateway, "Deep Dive into the Gateway API Inference Extension", https://kgateway.dev/blog/deep-dive-inference-extensions, 2025.
14. Envoy AI Gateway, "Endpoint Picker for Inference Routing", https://aigateway.envoyproxy.io/blog/endpoint-picker-for-inference-routing (redirects to theagentrouter.ai), 2025.
15. AIBrix, "AIBrix Router" design, https://aibrix.readthedocs.io/latest/designs/aibrix-router.html, accessed 2026-11-02.
16. Zhong et al., "DistServe: Disaggregating Prefill and Decoding for Goodput-optimized LLM Serving", https://arxiv.org/abs/2401.09670, OSDI 2024.
17. Patel et al., "Splitwise: Efficient Generative LLM Inference Using Phase Splitting", https://arxiv.org/abs/2311.18677, ISCA 2024.
18. Agrawal et al., "Taming Throughput-Latency Tradeoff in LLM Inference with Sarathi-Serve", https://arxiv.org/abs/2403.02310, OSDI 2024.
19. Qin et al., "Mooncake: Trading More Storage for Less Computation", https://arxiv.org/abs/2407.00079, FAST 2025.
20. Wang et al., "BurstGPT: A Real-world Workload Dataset to Optimize LLM Serving Systems", https://arxiv.org/abs/2401.17644, 2024 (v5 2025).
21. LMSYS, "Fast and Expressive LLM Inference with RadixAttention and SGLang", https://lmsys.org/blog/2024-01-17-sglang, 2024-01-17.
22. Oracle, "Accelerate LLM inference with LMCache on OCI Data Science", https://blogs.oracle.com/ai-and-datascience/accelerate-llm-inference-lmcache-on-oci-data-science, 2025.
23. Baseten, "Understanding performance benchmarks for LLM inference", https://baseten.co/blog/understanding-performance-benchmarks-for-llm-inference, 2024.
24. Modal, "LLM Engine Almanac: Summary", https://modal.com/llm-almanac/summary, 2025.
25. NVIDIA, "LLM Inference Benchmarking: How Much Does Your LLM Inference Cost?", https://developer.nvidia.com/blog/llm-inference-benchmarking-how-much-does-your-llm-inference-cost, 2025.
26. NVIDIA, "LLM Inference Benchmarking: Performance Tuning with TensorRT-LLM", https://developer.nvidia.com/blog/llm-inference-benchmarking-performance-tuning-with-tensorrt-llm, 2025.
27. SemiAnalysis InferenceX, "About" and "Interactivity" glossary, https://inferencex.semianalysis.com/about and https://inferencex.semianalysis.com/glossary/interactivity, 2026.
28. Databricks, "What do tokens per second ranges in provisioned throughput mean?", https://docs.databricks.com/aws/machine-learning/foundation-model-apis/prov-throughput-tokens, accessed 2026-11-02.
29. AWS, "Increase model invocation capacity with Provisioned Throughput in Amazon Bedrock", https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html, accessed 2026-11-02.
30. Predibase (now hosted by Rubrik), "LoRA Exchange (LoRAX): Serve 100s of Fine-Tuned LLMs for the Cost of 1", https://www.rubrik.com/blog/ai/23/lora-exchange-lorax-serve-100s-of-fine-tuned-llms-for-the-cost-of-one, 2023-11-16.
31. NVIDIA Run:ai, "Metrics and Telemetry", https://run-ai-docs.nvidia.com/saas/platform-management/monitor-performance/metrics, accessed 2026-11-02.
32. Glukhov, "Monitor LLM Inference in Production: Prometheus & Grafana for vLLM, TGI, llama.cpp", https://glukhov.org/observability/monitoring-llm-inference-prometheus-grafana/, 2026.
33. "Comparative Analysis of LLM Inference Serving Systems: vLLM and HuggingFace TGI", https://arxiv.org/abs/2511.17593, 2025-11.
