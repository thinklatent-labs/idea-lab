from fastlane import metrics as M

BEFORE = """
# HELP vllm:spec_decode_num_drafts Number of spec decoding drafts.
# TYPE vllm:spec_decode_num_drafts counter
vllm:spec_decode_num_drafts_total{model_name="m"} 100
vllm:spec_decode_num_drafts_created{model_name="m"} 1.7e9
vllm:spec_decode_num_draft_tokens_total{model_name="m"} 300
vllm:spec_decode_num_accepted_tokens_total{model_name="m"} 150
vllm:spec_decode_num_accepted_tokens_per_pos_total{model_name="m",position="0"} 80
vllm:spec_decode_num_accepted_tokens_per_pos_total{model_name="m",position="1"} 50
vllm:spec_decode_num_accepted_tokens_per_pos_total{model_name="m",position="2"} 20
vllm:prefix_cache_queries_total{model_name="m"} 1000
vllm:prefix_cache_hits_total{model_name="m"} 100
vllm:num_requests_running{model_name="m"} 3
vllm:num_requests_waiting{model_name="m"} 1
vllm:num_requests_waiting_by_reason{model_name="m",reason="capacity"} 9
vllm:kv_cache_usage_perc{model_name="m"} 0.25
"""

AFTER = BEFORE.replace("drafts_total{model_name=\"m\"} 100", "drafts_total{model_name=\"m\"} 200") \
    .replace("accepted_tokens_total{model_name=\"m\"} 150", "accepted_tokens_total{model_name=\"m\"} 400") \
    .replace("draft_tokens_total{model_name=\"m\"} 300", "draft_tokens_total{model_name=\"m\"} 600") \
    .replace("queries_total{model_name=\"m\"} 1000", "queries_total{model_name=\"m\"} 3000") \
    .replace("hits_total{model_name=\"m\"} 100", "hits_total{model_name=\"m\"} 1100")


def test_parse_skips_created_and_comments():
    s = M.parse(BEFORE)
    assert M.total(s, "vllm:spec_decode_num_drafts") == 100
    assert all(not n.endswith("_created") for n, _ in s)


def test_waiting_is_not_mixed_with_by_reason():
    g = M.gauges(M.parse(BEFORE))
    assert g["waiting"] == 1 and g["running"] == 3 and g["kv_usage"] == 0.25


def test_tau_from_delta():
    d = M.delta(M.parse(BEFORE), M.parse(AFTER))
    st = M.spec_stats(d)
    assert st["drafts"] == 100 and st["accepted"] == 250
    assert abs(st["tau"] - 3.5) < 1e-9
    assert abs(st["acceptance_rate"] - 250 / 300) < 1e-9
    pre = M.prefix_stats(d)
    assert abs(pre["hit_rate"] - 0.5) < 1e-9
