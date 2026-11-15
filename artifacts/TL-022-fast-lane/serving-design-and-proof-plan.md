# Fast lane (fast-lane) — Serving design and proof plan, 2026-11-15

TL-022 fast-lane · Seed · engineering material. Figures marked "estimate" come from the planning model in the scout brief (claude/scout-brief-fast-lane.md) and carry about ±30%; the proof replaces them. The proof kit (bench_grid.sh, bucket_sheet.py) is in the idea-lab repo at artifacts/TL-022-fast-lane/proof-kit/.

## 1. The design in one page

- **One cluster, many applications.** Every application sends its calls to one gateway. The gateway diverts each call to a bucket by its size (prompt tokens and reply cap), its service class, its task and its session.
- **Buckets publish a promise.** Each bucket states what it serves: "send requests in this range and you get these numbers" (p95 end to end, p95 first token, tokens per second per request). The promise is set at the bucket's range edge, so it holds for every request in the range.
- **Buckets are sized for their typical request.** Each bucket's pool is planned from its mean shape and expected rate. Replicas sitting idle in one bucket lend capacity to another bucket of the same model, at lower priority than the lender's own calls.
- **Two engine modes on the same model.** Latency mode runs few requests per replica, with 8 GPUs per replica and a draft model. Bulk mode runs many requests per replica, with more replicas and no draft model. A bucket picks the mode that fits its promise.
- **What is done now:** every production use case has its own dedicated, isolated machines, and the Relay model name is the use case's endpoint. **Decided (D-375, D-376):** shared bucket pools per model, with dedicated pools kept for applications that need isolation. Every replica of a model runs the same vLLM settings, so buckets are routing groups and borrowing is instant; a bucket gets its own settings only where the proof shows a gain of 20% or more. Promises are measured at the range edge plus a margin; GPUs are sized at the bucket mean. Relay names stay per use case and map to buckets at the gateway.

## 2. Request path

Relay → Envoy (ext_proc picker) → bucket pool → vLLM replica.

**What each call carries.** Relay sets these, or the ext_proc computes the missing ones:

| Header | Meaning |
| --- | --- |
| x-tl-app, x-tl-session | Application and session, used for cache affinity and fair share |
| x-tl-class | sla, standard or batch |
| x-tl-task | classify, extract, answer, summarize, write |
| x-tl-input-tokens | Prompt tokens, counted with the model's tokenizer (in Relay, or in the ext_proc) |
| x-tl-max-tokens | Reply cap the application sets; required for the fast lane |

**What the picker does, in order:**

1. **Classify.** Choose the model from the task, using the TL Index sufficiency table of which tasks may run on the 7B Core. Choose the bucket from prompt tokens and reply cap.
2. **Be honest about the promise.** A call whose shape cannot meet its class's ask goes to the bucket that fits it, with a response header naming the promise that applies, instead of a silent miss. For example, an sla call to the 27B with a 10K-token prompt fits Long-read, not a 200 ms promise.
3. **Pick a home replica.** Hash on application plus session with bounded load (no replica above 1.25× the pool average), so calls sharing a prompt prefix land where that prefix is cached. Skip any replica at its cap (running at the cap, or anything waiting).
4. **Borrow.** If the home bucket is full, pick an idle replica of another bucket of the same model: running at or below 2, nothing waiting. Tag the call with priority 10, so the lender's own calls (standard 0, sla −10) are scheduled first.
5. **Overflow, never queue without limit.** Next stop is the 7B lane where the task allows it, then the bulk lane. An sla call waits at most 20 ms before it overflows.
6. **Isolate caches between applications.** Inject a per-application cache_salt into the request body. vLLM salts prefix-cache reuse per request, so applications never share cached prefixes, while sessions within an application still do.
7. **Record.** Write bucket, class, borrowed flag, replica, priority, prompt and reply tokens, first-token time and end-to-end time to Langfuse (the TL-009 telemetry contract).

**Signals the picker reads** from each replica's /metrics: vllm:num_requests_running, vllm:num_requests_waiting and vllm:kv_cache_usage_perc.

**Priorities:** start vLLM with --scheduling-policy priority. The gateway sets the X-Vllm-Priority request header; lower values run first.

**Pattern to borrow:** llm-d's endpoint picker does this behind Envoy's ext_proc, using prefix-cache and queue scorers. It is Kubernetes-native, so port its scoring into the ext_proc you already run on Slurm rather than adopting the stack.

**Envoy wiring.** The picker sets the chosen replica in a header, and an original-destination cluster sends the call there. Keep Envoy's own limits as a backstop, not the main control:

```yaml
http_filters:
- name: envoy.filters.http.ext_proc            # the picker: classify, choose bucket and replica, set priority and cache salt
  typed_config:
    "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
    grpc_service: {envoy_grpc: {cluster_name: tl-picker}}
    processing_mode: {request_header_mode: SEND, request_body_mode: BUFFERED}
clusters:
- name: tl-replicas                            # routes to the host the picker chose
  type: ORIGINAL_DST
  lb_policy: CLUSTER_PROVIDED
  original_dst_lb_config: {use_http_header: true}   # reads x-envoy-original-dst-host set by the picker
  circuit_breakers: {thresholds: [{max_requests: 512}]}
# Without a picker, a static fallback: ring-hash per bucket pool, bounded load
- name: core27b-answer
  lb_policy: RING_HASH
  common_lb_config: {consistent_hashing_lb_config: {hash_balance_factor: 125}}
```

## 3. Buckets

These are drafts. Move the boundaries once Langfuse gives the real distribution of prompt and reply lengths.

| Bucket | Prompt tokens | Reply cap | What dominates | Engine mode |
| --- | --- | --- | --- | --- |
| Quick | up to 4,000 | up to 64 | Reading the prompt | Latency; a drafter adds little |
| Answer | up to 4,000 | 65 to 300 | Writing the reply | Latency with drafter |
| Long-read | 4,001 to 12,000 | up to 300 | Reading, then writing | Latency with drafter; cache affinity matters most |
| Long-write | any | 301 to 1,000 | Writing the reply | Latency with drafter (sla), or bulk (standard) |
| Bulk | any | any | Throughput | Bulk mode, for the standard and batch classes |

**Draft promises.** Estimates at each bucket's range edge, 8 in flight, no prefix-cache hits. The published promise will be the measured edge p95 plus a margin.

| Bucket | Core 27B (one TP8 replica per node, drafter 4.3) | 7B Core (two TP4 replicas per node, drafter 4.0) |
| --- | --- | --- |
| Quick | 139 ms at 4,000 in / 64 out | 59 ms |
| Answer | 377 ms at 4,000 in / 300 out; about 1,000 tok/s | 172 ms; about 2,100 tok/s |
| Long-read | 491 ms at 12,000 in / 300 out | 196 ms |
| Long-write | 1,195 ms at 12,000 in / 1,000 out; about 1,000 tok/s | 530 ms; about 2,100 tok/s |

**Pool sizing from the bucket's mean shape.** One replica's capacity is estimated with bursts at 3× the mean and prefill capped at 20% to 60% of the replica's time, depending on the bucket:

| Bucket (mean shape used) | 27B: requests/s per replica | 7B: requests/s per replica |
| --- | --- | --- |
| Quick (2,500 in / 32 out) | 15.6 | 67.1 |
| Answer (2,000 in / 200 out) | 6.4 | 22.6 |
| Long-read (8,000 in / 150 out) | 2.6 | 11.8 |
| Long-write (4,000 in / 600 out) | 3.3 | 8.5 |

Replicas per bucket = its peak requests per second ÷ capacity per replica, rounded up, plus a spare. The mean shapes are placeholders until Langfuse gives the real ones.

**The full grid.** Estimated end-to-end ms at 8 in flight, no prefix-cache hits; the proof replaces these cells.

Core 27B, one TP8 replica, drafter 4.3:

| Prompt \ reply | 10 | 64 | 150 | 300 | 500 | 1,000 |
| --- | --- | --- | --- | --- | --- | --- |
| 1,000 | 42 | 96 | 183 | 333 | 534 | 1,037 |
| 2,000 | 56 | 111 | 197 | 348 | 549 | 1,051 |
| 4,000 | 85 | 139 | 226 | 377 | 578 | 1,080 |
| 6,000 | 114 | 168 | 254 | 405 | 606 | 1,109 |
| 8,000 | 142 | 197 | 283 | 434 | 635 | 1,138 |
| 10,000 | 171 | 225 | 312 | 463 | 664 | 1,166 |

7B Core, TP4 replica, drafter 4.0:

| Prompt \ reply | 10 | 64 | 150 | 300 | 500 | 1,000 |
| --- | --- | --- | --- | --- | --- | --- |
| 1,000 | 24 | 50 | 91 | 163 | 258 | 497 |
| 2,000 | 27 | 53 | 94 | 166 | 261 | 500 |
| 4,000 | 33 | 59 | 100 | 172 | 267 | 506 |
| 6,000 | 39 | 65 | 106 | 178 | 273 | 512 |
| 8,000 | 45 | 71 | 112 | 184 | 279 | 518 |
| 10,000 | 51 | 77 | 118 | 190 | 285 | 524 |

## 4. Parallel requests, replicas and quantization

**How one replica runs requests in parallel.** vLLM does not give each request its own GPU. At every step it runs one forward pass for all running requests together: one new token (or a verified draft block) for each request that is writing, plus a chunk of any prompt being read. The weights are read once per step and shared by every request in it, so at small batches adding requests is nearly free. The ceiling per replica is --max-num-seqs, and the KV-cache memory the prompts need. Beyond that, requests wait in the queue, which shows as vllm:num_requests_waiting.

**Two different goals, two modes.**

| | Latency mode (every request fast) | Bulk mode (most tokens per GPU-hour) |
| --- | --- | --- |
| Requests in flight per replica | 8 or fewer | 64 to 256 |
| GPUs per replica | 8 (TP8): each step finishes sooner | 1 or 2: more replicas |
| Drafter | Yes: most gain at small batches | No: its verify work competes with other requests at large batches |
| Prefill chunk (--max-num-batched-tokens) | Small (2,048 to 4,096), so a long prompt never stalls the others for long | Large (8,192 to 16,384) |
| Weights | 4-bit on H100 helps here (fewer bytes per step) | FP8: large batches become compute-bound, and FP8 runs on the H100's FP8 tensor cores while 4-bit weights are unpacked to BF16 math |
| What you watch | p95 end to end, waiting = 0 | Output tokens per GPU-hour |

**Layouts of the 27B on one 8× H100 node** (estimates; KV-cache reads are not modelled, so bulk figures are optimistic at long prompts):

| Layout | Mode | In flight per replica | tok/s per request | Output tok/s for the node |
| --- | --- | --- | --- | --- |
| 1 × TP8 | latency, drafter | 8 | about 1,000 | about 8,000 |
| 2 × TP4 | latency, drafter | 8 | about 680 | about 10,800 |
| 1 × TP8 | bulk, no drafter | 64 | about 260 | about 16,800 |
| 8 × TP1 | bulk, no drafter | 64 | about 65 | about 33,000 |

So the same 8 GPUs give either about 1,000 tok/s to each of 8 requests, or about 65 tok/s to each of 512. That trade is the core of the design. The sla buckets run in latency mode and the standard and batch classes run in bulk mode, on separate replicas or as lower priority on the same ones.

**Quantization, specifically:**

- FP8 weights (what you run): good in both modes. FP8 KV cache halves KV memory, which raises how many long prompts fit in parallel.
- 4-bit weights (W4A16, AWQ or GPTQ): about 20% faster per request at small batches on H100 (estimate). At large batches they can be slower than FP8. Use them for latency pools only, and only if the TL Index shows no quality loss (H3).
- Drafter and precision: train the drafter on the target it will serve, or at least measure acceptance against the served precision, because quantization shifts the target's distribution slightly.

**Making sure every request starts at once.** This is a sizing rule, not a flag:

1. Cap each latency replica at the concurrency where the benchmark still meets the bucket's promise (--max-num-seqs, and the picker's cap).
2. Size the replicas: peak requests per second × time per request (Little's law) × burst factor ÷ cap.
3. Overflow instead of queueing, and watch vllm:num_requests_waiting stay at 0 on sla pools.
4. Bound prefill interference: keep the prefill chunk small, use --long-prefill-token-threshold, and from the second node on, test a prefill/decode split.

**The experiment that answers it:** concurrency sweeps per layout and precision, giving tok/s per request and total throughput against requests in flight. The knee of each curve sets the cap. This is part of the proof, below.

## 5. vLLM profiles

The flag spellings below were checked against the vLLM documentation. Check each one against `vllm serve --help` on 0.26.0 before the run.

**Profile A — Core 27B, latency, one replica on 8 GPUs** (Answer, Long-read, Long-write; and Quick if engines stay identical):

```bash
vllm serve /fsx/models/core-27b-fp8 \
  --served-model-name core-27b-fast \
  --tensor-parallel-size 8 \
  --max-model-len 12288 \
  --max-num-seqs 8 \
  --max-num-batched-tokens 4096 \
  --enable-chunked-prefill \
  --long-prefill-token-threshold 2048 \
  --enable-prefix-caching \
  --kv-cache-dtype fp8 \
  --gpu-memory-utilization 0.90 \
  --scheduling-policy priority \
  --async-scheduling \
  --speculative-config '{"method": "eagle3", "model": "/fsx/drafters/core-27b-eagle3", "num_speculative_tokens": 3}'
```

- DFlash arm: `--speculative-config '{"method": "dflash", "model": "/fsx/drafters/core-27b-dflash", "num_speculative_tokens": N}'`. Set N to match the block the drafter was trained with (its config.json), and sweep two values.
- 4-bit arm: point at a W4A16 checkpoint (AWQ or GPTQ); vLLM reads the quantization method from it.
- A Speculators checkpoint is self-describing. `vllm serve <drafter checkpoint>` loads the target and the drafter together, which suits quick checks.

**Profile B — Core 27B, Quick bucket, used only if buckets get their own engine settings:** same as A, but no --speculative-config, `--max-num-seqs 16` and `--max-num-batched-tokens 16384`, so a 10K-token prompt is read in one step.

**Profile C — 7B Core, latency, two TP4 replicas per node.** Run two separate servers so the picker can choose each one:

```bash
CUDA_VISIBLE_DEVICES=0,1,2,3 vllm serve /fsx/models/core-7b-fp8 --port 8001 --served-model-name core-7b-fast \
  --tensor-parallel-size 4 --max-model-len 12288 --max-num-seqs 8 --max-num-batched-tokens 4096 \
  --enable-chunked-prefill --enable-prefix-caching --kv-cache-dtype fp8 --scheduling-policy priority --async-scheduling \
  --speculative-config '{"method": "eagle3", "model": "/fsx/drafters/core-7b-eagle3", "num_speculative_tokens": 3}'
CUDA_VISIBLE_DEVICES=4,5,6,7 vllm serve ... --port 8002   # same flags
```

**Profile D — Core 27B, bulk.** Eight TP1 replicas, one per GPU on ports 8101 to 8108, or `--data-parallel-size` behind one port when no picker is in front:

```bash
CUDA_VISIBLE_DEVICES=0 vllm serve /fsx/models/core-27b-fp8 --port 8101 --served-model-name core-27b-bulk \
  --tensor-parallel-size 1 --max-model-len 12288 --max-num-seqs 128 --max-num-batched-tokens 16384 \
  --enable-chunked-prefill --enable-prefix-caching --kv-cache-dtype fp8 --gpu-memory-utilization 0.92
```

**What each flag is for:**

| Flag | Why |
| --- | --- |
| --tensor-parallel-size 8 | Splits each step's weight reads across 8 GPUs: lowest time per token |
| --max-model-len 12288 | 10K-token prompts plus a 1,000-token reply plus margin; any 27B replica can take any bucket, which is what makes borrowing possible |
| --max-num-seqs 8 | The latency cap; set it from the knee of the concurrency sweep |
| --max-num-batched-tokens 4096 and --long-prefill-token-threshold 2048 | Long prompts are read in chunks, so writers in flight are not stalled for long |
| --enable-prefix-caching | Shared prompt prefixes are read once, the largest lever on first-token time at 1K to 10K-token prompts |
| --kv-cache-dtype fp8 | Halves KV memory, so more long prompts fit |
| --scheduling-policy priority | sla calls first, borrowed calls last (set through the X-Vllm-Priority header) |
| --async-scheduling | Overlaps scheduling with the GPU step |
| --speculative-config | The drafter; num_speculative_tokens 3 for EAGLE-3 first, as in NVIDIA's Maverick setup, then 2 and 4 |

**Left at their defaults on purpose:** the default optimization level (-O2) already turns on AllReduce+RMSNorm fusion for TP above 1 on Hopper (5% to 20% end to end). CUDA graph sizes are inferred from --max-num-seqs and the speculative config; set them with -cc only if the logs show eager fallbacks.

**Later, when scaling out:** a prefill/decode split with `--kv-transfer-config` (NIXL connector), using one prefill node and one decode node. Check the connector name in your vLLM build.

## 6. The benchmark: the bucket sheet

**Grid.** Prompt 1,000, 2,000, 4,000, 6,000, 8,000 and 10,000 tokens × reply 10, 64, 150, 300, 500 and 1,000 tokens.

**Concurrency.** 1, 4, 8 and 16 in flight for latency profiles; 16, 32, 64 and 128 for bulk.

**Prefix share.** 0%, 50% and 80% of the prompt repeated across calls, at 4,000 and 10,000-token prompts.

**Two kinds of data:**

- Random tokens for prefill timing and every arm without a drafter.
- Real text for every drafter arm. Draft models are judged on predictable text, and acceptance on random tokens means nothing. Use a public prompt set shaped like your calls, trimmed to each prompt length (prompts_<length>.jsonl), or vLLM bench's spec_bench dataset.

**Commands.** proof-kit/bench_grid.sh wraps `vllm bench serve` with --percentile-metrics ttft,tpot,itl,e2el, --metric-percentiles 50,95,99 and --goodput e2el:<ms>. It writes one result file per cell, and proof-kit/bucket_sheet.py turns the folder into the bucket sheet:

```bash
BASE_URL=http://127.0.0.1:8000 MODEL=core-27b-fast PROFILE=27b-tp8-fp8-eagle3 DATA=text PROMPTS_DIR=./prompts ./bench_grid.sh
python3 bucket_sheet.py results/27b-tp8-fp8-eagle3 --concurrency 8 > sheet-27b-tp8-fp8-eagle3.md
```

**Sustainable load per bucket.** Send Poisson arrivals (--request-rate R) and raise R until fewer than 95% of requests meet the bucket's promise (the goodput threshold). That R is the replica's capacity for the bucket, and it replaces the estimates in section 3.

## 7. The proof on one 8× H100 node (about four days)

| Day | What | Answers |
| --- | --- | --- |
| 0 | Weights to FSx: public Gemma 4 31B (FP8 and 4-bit) as the 27B stand-in, public Gemma 4 E2B as the 7B stand-in, and public EAGLE-3 and DFlash drafters for Gemma 4 31B. vLLM 0.26.0 for serving, plus a separate environment with vLLM 0.27.1 or later for drafter training | Setup |
| 1 | Profile A at TP8: no drafter, EAGLE-3 and DFlash; FP8 and 4-bit; the full grid at 1, 4, 8 and 16 in flight | Targets (a) and (b); H2, H3; the 27B's 200 ms ceiling |
| 2 | Layouts and bulk: 2 × TP4, 4 × TP2 and 8 × TP1 at bulk concurrency, then Profile C (7B, two TP4 replicas) on the grid | The parallel-processing curves; target (c), H4 |
| 3 | Buckets live: two TP4 replicas of the 27B as two buckets behind Envoy and the picker. Replay a mixed traffic file, then idle one bucket to test borrowing | Bucket promises under mixed load; borrowing (H6) |
| 4 | Drafter training dry run (drafter recipe doc) on public data for Gemma 4 31B, with 4 GPUs serving hidden states and 4 training | Pipeline timing; whether our own drafter matches the public one |

**Pre-registered on top of H1 to H5:** H6 says that with one bucket idle, a busy bucket's sustainable rate rises at least 50% through borrowing, and the lender's p95 stays inside its promise once its own traffic returns. It is refuted if the lender's p95 breaks its promise.

## 8. Decisions

| ID | Decision | By |
| --- | --- | --- |
| D-375 | One shared cluster for many applications. The gateway diverts each call by bucket (prompt size × reply cap), service class, task and session, keeping an application's or session's calls on the same replica. Buckets publish per-range promises, pools are planned at each bucket's mean, and idle replicas lend capacity across buckets. Replaces dedicated machines per use case for the fast lane | Jithin |
| D-376 | Every replica of a model runs the same vLLM settings, with per-bucket tuning only where the proof shows 20% or more. Promises are p95 at the range edge plus a margin, with GPUs sized at the bucket mean. Shared by default, dedicated pools on request, with per-application cache salt, priorities and quotas | Jithin (on questions with recommendations) |
| D-377 | Draft models are trained by both routes, Speculators and Model Optimizer, and compared on acceptance (drafter recipe doc). Dissent recorded: it costs an extra training run per model | Jithin (against the recommendation of Speculators with Model Optimizer as a cross-check) |

## 9. Lines for other ideas (one line each in their register rows)

- TL-008: the fast lane uses shared bucket pools instead of dedicated machines per use case, with Relay names mapped to buckets at the gateway. Drafter training needs a vLLM 0.27.1 or later environment beside 0.26.0.
- TL-009: the telemetry contract gains bucket, class, borrowed flag, priority, replica, and prompt and reply tokens.
- TL-003: the bucket sheet is what an application team sees at onboarding: "send requests in these ranges and you get these numbers".
