"""Offline stand-ins for dry runs: a synthetic corpus and a whitespace tokenizer.

They let the whole pipeline (prompt pools, requests, picker, stages, report)
run without network access or model weights. Numbers from a dry run say
nothing about real performance.
"""

from __future__ import annotations

import random

_WORDS = (
    "the market report shows revenue growth across regions while costs rose in the third quarter "
    "analysts expect the company to expand its services and hire more engineers next year "
    "officials said the new policy would reduce delays for customers and improve safety on roads "
    "researchers found that the treatment improved outcomes for patients in a large clinical trial "
    "the team won the final after a strong second half and the coach praised the players "
    "a storm caused flooding in coastal towns and emergency crews worked through the night "
    "the court ruled that the agency must publish the documents within thirty days "
    "investors reacted to the announcement and shares closed higher on the exchange "
    "the minister met leaders from neighbouring countries to discuss trade and energy "
    "engineers tested the system under heavy load and reported fewer failures than expected"
).split()

_TOPICS = ["Business", "Politics", "Sports", "Technology", "Health", "World", "Science"]


def _sentence(rng: random.Random) -> str:
    n = rng.randint(8, 22)
    words = [rng.choice(_WORDS) for _ in range(n)]
    words[0] = words[0].capitalize()
    return " ".join(words) + "."


def documents(n: int, seed: int = 0) -> list[dict]:
    rng = random.Random(seed)
    out = []
    for i in range(n):
        k = rng.randint(25, 70)
        text = f"{rng.choice(_TOPICS)} desk. " + " ".join(_sentence(rng) for _ in range(k))
        out.append({"id": f"sim-{seed}-{i}", "text": text})
    return out


def chat_prompts(n: int, seed: int = 1) -> list[str]:
    rng = random.Random(seed)
    stems = ["Explain how", "Write a short note on why", "Give three reasons that", "Summarise how"]
    return [f"{rng.choice(stems)} {' '.join(rng.choice(_WORDS) for _ in range(rng.randint(6, 14)))}?"
            for _ in range(n)]


def math_questions(n: int, seed: int = 2) -> list[dict]:
    rng = random.Random(seed)
    out = []
    for i in range(n):
        a, b = rng.randint(2, 500), rng.randint(2, 500)
        out.append({"id": f"simmath-{i}", "question": f"What is {a} + {b}?", "answer": str(a + b)})
    return out


class WordTokenizer:
    """Whitespace 'tokenizer' with the same interface as prompts.HFTokenizer."""

    name = "whitespace (dry run)"

    def encode(self, text: str) -> list[str]:
        return text.split()

    def decode(self, ids: list) -> str:
        return " ".join(str(i) for i in ids)

    def count_chat(self, messages: list[dict]) -> int:
        return sum(len(str(m.get("content", "")).split()) for m in messages) + 4 * len(messages) + 2
