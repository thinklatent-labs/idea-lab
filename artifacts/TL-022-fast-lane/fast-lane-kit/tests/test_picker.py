from fastlane.picker import Meta, Picker, ReplicaState, buckets_from_config, classify

BUCKETS = buckets_from_config([
    {"name": "quick", "prompt": [0, 4000], "reply": [0, 64], "classes": ["fast"]},
    {"name": "answer", "prompt": [0, 4000], "reply": [65, 300], "classes": ["fast"]},
    {"name": "long_read", "prompt": [4001, 12000], "reply": [0, 300], "classes": ["fast"]},
    {"name": "long_write", "prompt": [0, 12000], "reply": [301, 1000], "classes": ["fast"]},
    {"name": "bulk", "prompt": [0, 12000], "reply": [0, 4000], "classes": ["standard", "batch"]},
])


def reps():
    return [ReplicaState("r0", "http://a", home={"quick", "answer", "bulk"}, max_inflight=8),
            ReplicaState("r1", "http://b", home={"long_read", "long_write", "bulk"}, max_inflight=8)]


def test_classify_edges():
    assert classify(BUCKETS, Meta(cls="fast", prompt_tokens=4000, max_tokens=64)) == "quick"
    assert classify(BUCKETS, Meta(cls="fast", prompt_tokens=4000, max_tokens=65)) == "answer"
    assert classify(BUCKETS, Meta(cls="fast", prompt_tokens=4001, max_tokens=300)) == "long_read"
    assert classify(BUCKETS, Meta(cls="fast", prompt_tokens=2000, max_tokens=800)) == "long_write"
    assert classify(BUCKETS, Meta(cls="standard", prompt_tokens=2000, max_tokens=1000)) == "bulk"
    assert classify(BUCKETS, Meta(cls="fast", prompt_tokens=20000, max_tokens=10)) == "overflow"


def test_bucketed_routes_home_and_keeps_affinity():
    p = Picker(BUCKETS, reps(), "bucketed")
    a = p.pick(Meta(app="x", session="s1", cls="fast", prompt_tokens=2000, max_tokens=200))
    b = p.pick(Meta(app="x", session="s1", cls="fast", prompt_tokens=2000, max_tokens=200))
    assert a.replica.name == "r0" and b.replica.name == "r0"
    c = p.pick(Meta(app="y", cls="fast", prompt_tokens=8000, max_tokens=200))
    assert c.replica.name == "r1" and c.bucket == "long_read"
    assert a.priority == 0 and not a.borrowed


def test_borrowing_only_when_home_full_and_lender_idle():
    rs = reps()
    p = Picker(BUCKETS, rs, "bucketed", borrowing=True, lend_max_load=2, borrow_penalty=20)
    rs[0].inflight = 8
    ch = p.pick(Meta(app="x", cls="fast", prompt_tokens=2000, max_tokens=200))
    assert ch.borrowed and ch.replica.name == "r1" and ch.priority == 20
    rs[1].inflight = 3  # lender now busy with its own work
    ch = p.pick(Meta(app="x", cls="fast", prompt_tokens=2000, max_tokens=200))
    assert not ch.borrowed and ch.replica.name == "r0"


def test_borrowing_off():
    rs = reps()
    rs[0].inflight = 8
    p = Picker(BUCKETS, rs, "bucketed", borrowing=False)
    ch = p.pick(Meta(app="x", cls="fast", prompt_tokens=2000, max_tokens=200))
    assert not ch.borrowed and ch.replica.name == "r0"


def test_bounded_load_spills():
    rs = [ReplicaState(f"r{i}", "u", home={"answer"}) for i in range(4)]
    p = Picker(BUCKETS, rs, "affinity", eps=0.25)
    first = p.pick(Meta(app="hot", cls="fast", prompt_tokens=100, max_tokens=100)).replica
    first.inflight = 10
    other = p.pick(Meta(app="hot", cls="fast", prompt_tokens=100, max_tokens=100)).replica
    assert other is not first


def test_round_robin_and_least_load():
    rs = reps()
    p = Picker(BUCKETS, rs, "round_robin")
    names = [p.pick(Meta()).replica.name for _ in range(4)]
    assert names == ["r0", "r1", "r0", "r1"]
    rs[0].inflight = 5
    p2 = Picker(BUCKETS, rs, "least_load")
    assert p2.pick(Meta()).replica.name == "r1"
