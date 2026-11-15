"""Proof stages. Each module exposes run(ctx) -> dict (a status record)."""

STAGE_ORDER = ["preflight", "data", "screen", "grid", "small", "layouts", "load", "scale", "train", "report"]
