"""Fast-lane proof kit (ThinkLatent Idea Lab, TL-022).

Proves, on one 8x H100 node, how fast public Gemma 4 31B can be served with
vLLM and speculative decoding, what each prompt and reply range can promise,
and how a shared cluster behind a picker holds those promises under load.
"""

__version__ = "0.1.0"
