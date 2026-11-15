"""Prompt library: real-text prompts at exact token lengths, built from public data.

Why real text: draft models are judged on predictable text, so acceptance on
random tokens means nothing. Every prompt here is a document task (classify,
extract, answer, brief) over public news articles, which is the shape of the
service-level calls (1,000 to 10,000-token prompts of context plus a question).

Sources (licences recorded in data/manifest.json):
  documents  abisee/cnn_dailymail 3.0.0 (Apache-2.0): contexts for every cell
  chat       HuggingFaceH4/ultrachat_200k (MIT): chat prompts for drafter training
  math       openai/gsm8k (MIT): the 4-bit quality check
Evaluation contexts and training contexts come from disjoint documents.

Output length is fixed per cell with min_tokens = max_tokens, and each
instruction asks for more than the cell's length, so replies run to length
without forcing text after an end-of-sequence token.
"""

from __future__ import annotations

import random
import re
from pathlib import Path
from typing import Protocol

from fastlane.client import Request
from fastlane.config import Config, model_dir
from fastlane.util import LOG, read_json, read_jsonl, write_json, write_jsonl


class Tokenizer(Protocol):
    name: str

    def encode(self, text: str) -> list: ...

    def decode(self, ids: list) -> str: ...

    def count_chat(self, messages: list[dict]) -> int: ...


class HFTokenizer:
    def __init__(self, path: Path, chat_kwargs: dict | None = None):
        from transformers import AutoTokenizer  # installed with vLLM

        self.tok = AutoTokenizer.from_pretrained(str(path))
        self.chat_kwargs = chat_kwargs or {}
        self.name = str(path)

    def encode(self, text: str) -> list[int]:
        return list(self.tok(text, add_special_tokens=False)["input_ids"])

    def decode(self, ids: list) -> str:
        return self.tok.decode(ids, skip_special_tokens=False)

    def count_chat(self, messages: list[dict]) -> int:
        try:
            s = self.tok.apply_chat_template(messages, tokenize=False, add_generation_prompt=True,
                                             **self.chat_kwargs)
        except Exception:  # templates differ across versions; fall back to raw text
            s = "\n".join(str(m.get("content", "")) for m in messages)
        return len(self.encode(s))


# --------------------------------------------------------------------------- tasks

TOPICS = "Business, Politics, Sports, Technology, Health, Entertainment, World, Science"


def task_for(out_tokens: int) -> str:
    if out_tokens <= 16:
        return "classify"
    if out_tokens <= 96:
        return "extract"
    if out_tokens <= 400:
        return "answer"
    return "brief"


def instruction(task: str, out_tokens: int) -> str:
    words = max(40, int(out_tokens * 0.9))
    if task == "classify":
        return (f"Classify the main topic of the documents above as exactly one of: {TOPICS}. "
                "Then give a one-sentence reason.")
    if task == "extract":
        return ("Extract every person, organisation and place named in the documents above as JSON "
                'with keys "people", "organisations" and "places". Reply with the JSON only.')
    if task == "answer":
        return ("Using only the documents above, explain the most important development they describe, "
                f"who it affects and why it matters. Answer in about {words} words.")
    return ("Write a detailed briefing on the documents above. For each document give its key facts, "
            f"the figures it reports and the implications. Write at least {words} words.")


def gsm8k_prompt(question: str) -> list[dict]:
    return [{"role": "user", "content": (
        "Solve the problem. Show your working briefly, then give the final answer on its own line "
        f"as 'Answer: <number>'.\n\nProblem: {question}")}]


_ANS = re.compile(r"Answer:\s*\$?\s*(-?[\d,]*\.?\d+)")
_NUM = re.compile(r"-?[\d,]*\.?\d+")


def extract_number(text: str) -> str | None:
    m = _ANS.findall(text or "")
    if not m:
        m = _NUM.findall(text or "")
    if not m:
        return None
    v = m[-1].replace(",", "").rstrip(".")
    try:
        f = float(v)
        return str(int(f)) if f.is_integer() else str(f)
    except ValueError:
        return None


# --------------------------------------------------------------------------- library

class PromptLibrary:
    def __init__(self, cfg: Config):
        self.cfg = cfg
        self.dir = cfg.path("data") / ("sim" if cfg.dry_run else "real")
        self.p = cfg["prompts"]
        self._tok: Tokenizer | None = None
        self._pools: dict[int, list[dict]] = {}
        self._ids_cache: dict[str, list] = {}
        self._prefix_cache: dict[tuple[str, int], str] = {}

    # ------------------------------------------------------------ tokenizer
    @property
    def tok(self) -> Tokenizer:
        if self._tok is None:
            if self.cfg.dry_run:
                from fastlane.sim.corpus import WordTokenizer
                self._tok = WordTokenizer()
            else:
                keys = [self.p.get("tokenizer_model", "target_fp8"), "target_bf16", "target_fp8"]
                path = next((model_dir(self.cfg, k) for k in keys
                             if (model_dir(self.cfg, k) / "tokenizer_config.json").exists()), None)
                if path is None:
                    raise FileNotFoundError("no tokenizer found; run scripts/download.sh first")
                self._tok = HFTokenizer(path, self.cfg["request"].get("chat_template_kwargs"))
        return self._tok

    @property
    def system(self) -> str:
        return self.p.get("system_prompt", "You are a helpful assistant.")

    def overhead(self) -> int:
        """Template + system + longest instruction tokens, with no context."""
        worst = 0
        for out in (10, 64, 300, 1000):
            msgs = [{"role": "system", "content": self.system},
                    {"role": "user", "content": "\n\n" + instruction(task_for(out), out)}]
            worst = max(worst, self.tok.count_chat(msgs))
        return worst + 8

    # ------------------------------------------------------------ build
    def manifest_path(self) -> Path:
        return self.dir / "manifest.json"

    def built(self) -> bool:
        m = read_json(self.manifest_path())
        if not m:
            return False
        want = sorted(int(x) for x in self.p["lengths"])
        return sorted(m.get("lengths", [])) == want and int(m.get("pool_size", 0)) >= int(self.p["pool_size"])

    def build(self, *, train_samples: int = 0, long_share: float = 0.3, force: bool = False) -> dict:
        if self.built() and not force and (not train_samples or (self.dir / "train_prompts.jsonl").exists()):
            LOG.info("prompt library already built at %s", self.dir)
            return read_json(self.manifest_path())
        self.dir.mkdir(parents=True, exist_ok=True)
        n_eval = int(self.p.get("eval_documents", 6000))
        n_train = int(self.p.get("train_documents", 30000)) if train_samples else 0
        docs_eval, docs_train = self._load_documents(n_eval, n_train)
        write_jsonl(self.dir / "docs_eval.jsonl", docs_eval)
        if docs_train:
            write_jsonl(self.dir / "docs_train.jsonl", docs_train)
        overhead = self.overhead()
        manifest = {"lengths": [], "pool_size": int(self.p["pool_size"]), "overhead_tokens": overhead,
                    "tokenizer": getattr(self.tok, "name", "?"), "sources": self.p.get("sources"),
                    "eval_documents": len(docs_eval), "train_documents": len(docs_train), "pools": {}}
        doc_ids = [self.tok.encode(d["text"]) for d in docs_eval]
        for L in sorted(int(x) for x in self.p["lengths"]):
            pool = self._make_pool(L, docs_eval, doc_ids, overhead, int(self.p["pool_size"]))
            write_jsonl(self.dir / f"contexts_L{L}.jsonl", pool)
            toks = [c["ctx_tokens"] for c in pool]
            manifest["pools"][str(L)] = {"n": len(pool), "ctx_tokens_min": min(toks), "ctx_tokens_max": max(toks)}
            manifest["lengths"].append(L)
            LOG.info("pool L=%d: %d contexts of %d-%d tokens", L, len(pool), min(toks), max(toks))
        math = self._load_math()
        write_jsonl(self.dir / "gsm8k.jsonl", math)
        manifest["math_questions"] = len(math)
        if train_samples:
            n_train_prompts = self._build_train_prompts(train_samples, long_share, docs_train)
            manifest["train_prompts"] = n_train_prompts
        write_json(self.manifest_path(), manifest)
        self._pools.clear()
        return manifest

    def _load_documents(self, n_eval: int, n_train: int) -> tuple[list[dict], list[dict]]:
        if self.cfg.dry_run:
            from fastlane.sim.corpus import documents
            return documents(n_eval, seed=11), documents(n_train, seed=12) if n_train else []
        src = self.p["sources"]["documents"]
        from datasets import load_dataset  # Apache-2.0; installed by scripts/setup.sh

        LOG.info("downloading %d documents from %s", n_eval + n_train, src["dataset"])
        ds = load_dataset(src["dataset"], src.get("config"), split=src.get("split", "train"), streaming=True)
        docs: list[dict] = []
        for i, row in enumerate(ds):
            text = (row.get(src.get("field", "text")) or "").strip()
            if len(text.split()) < 200:
                continue
            docs.append({"id": f"{src['dataset']}:{i}", "text": text})
            if len(docs) >= n_eval + n_train:
                break
        if len(docs) < n_eval:
            raise RuntimeError(f"only {len(docs)} documents available, need {n_eval}")
        return docs[:n_eval], docs[n_eval:n_eval + n_train]

    def _make_pool(self, L: int, docs: list[dict], doc_ids: list[list], overhead: int, size: int) -> list[dict]:
        rng = random.Random(f"pool-{L}")
        budget = max(64, L - overhead)
        sep = self.tok.encode("\n\n")
        pool = []
        order = list(range(len(docs)))
        for j in range(size):
            rng.shuffle(order)
            ids: list = []
            used = []
            for di in order:
                head = self.tok.encode(f"Document {len(used) + 1}:\n")
                ids += head + doc_ids[di] + sep
                used.append(docs[di]["id"])
                if len(ids) >= budget:
                    break
            ids = ids[:budget]
            text = self.tok.decode(ids)
            pool.append({"id": f"L{L}-{j}", "L": L, "text": text, "ctx_tokens": len(self.tok.encode(text)),
                         "docs": used})
        return pool

    def _load_math(self) -> list[dict]:
        if self.cfg.dry_run:
            from fastlane.sim.corpus import math_questions
            return math_questions(200)
        src = self.p["sources"]["math"]
        from datasets import load_dataset

        ds = load_dataset(src["dataset"], src.get("config"), split=src.get("split", "test"))
        out = []
        for i, row in enumerate(ds):
            ans = str(row["answer"]).split("####")[-1].strip().replace(",", "")
            out.append({"id": f"gsm8k-{i}", "question": row["question"], "answer": ans})
        return out

    def _build_train_prompts(self, n: int, long_share: float, docs_train: list[dict]) -> int:
        """Prompts for drafter training: chat prompts plus long document tasks.

        Long prompts matter: a drafter trained only on short contexts loses
        acceptance at 10,000 tokens. Documents here never appear in evaluation."""
        rng = random.Random("train-prompts")
        n_doc = int(n * long_share)
        n_chat = n - n_doc
        if self.cfg.dry_run:
            from fastlane.sim.corpus import chat_prompts
            chats = chat_prompts(n_chat)
        else:
            src = self.p["sources"]["chat"]
            from datasets import load_dataset

            ds = load_dataset(src["dataset"], split=src.get("split", "train_sft"), streaming=True)
            chats = []
            for row in ds:
                t = (row.get(src.get("field", "prompt")) or "").strip()
                if t:
                    chats.append(t)
                if len(chats) >= n_chat:
                    break
        rows = [{"id": f"chat-{i}", "messages": [{"role": "user", "content": t}]} for i, t in enumerate(chats)]
        lengths = [L for L in sorted(int(x) for x in self.p["lengths"])]
        doc_ids = None
        if docs_train:
            doc_ids = [self.tok.encode(d["text"]) for d in docs_train[: min(len(docs_train), 20000)]]
            overhead = self.overhead()
            for i in range(n_doc):
                L = rng.choice(lengths)
                out = rng.choice([64, 300, 1000])
                ctx = self._cut(doc_ids, rng, L - overhead)
                rows.append({"id": f"doc-{i}", "messages": [
                    {"role": "system", "content": self.system},
                    {"role": "user", "content": ctx + "\n\n" + instruction(task_for(out), out)}]})
        rng.shuffle(rows)
        write_jsonl(self.dir / "train_prompts.jsonl", rows)
        LOG.info("training prompts: %d (%d chat, %d documents)", len(rows), n_chat, n_doc)
        return len(rows)

    def _cut(self, doc_ids: list[list], rng: random.Random, n_tokens: int) -> str:
        ids: list = []
        sep = self.tok.encode("\n\n")
        while len(ids) < n_tokens:
            ids += doc_ids[rng.randrange(len(doc_ids))] + sep
        return self.tok.decode(ids[:n_tokens])

    # ------------------------------------------------------------ use
    def pool(self, L: int) -> list[dict]:
        if L not in self._pools:
            path = self.dir / f"contexts_L{L}.jsonl"
            rows = list(read_jsonl(path))
            if not rows:
                raise FileNotFoundError(f"no prompt pool for length {L} at {path}; run the data stage")
            self._pools[L] = rows
        return self._pools[L]

    def _ids(self, text_key: str, text: str) -> list:
        if text_key not in self._ids_cache:
            self._ids_cache[text_key] = self.tok.encode(text)
        return self._ids_cache[text_key]

    def shared_prefix(self, key: str, n_tokens: int) -> str:
        """A deterministic block of n_tokens shared by every call of one application or cell."""
        ck = (key, n_tokens)
        if ck not in self._prefix_cache:
            pool = self.pool(max(int(x) for x in self.p["lengths"]))
            rng = random.Random(f"prefix-{key}")
            c = pool[rng.randrange(len(pool))]
            ids = self._ids(c["id"], c["text"])
            head = f"Reference handbook for {key}. Follow it when you answer.\n"
            self._prefix_cache[ck] = head + self.tok.decode(ids[: max(0, n_tokens - 16)])
        return self._prefix_cache[ck]

    def context(self, n_tokens: int, rng: random.Random) -> str:
        """A context of about n_tokens cut from the longest pool (load tests)."""
        pool = self.pool(max(int(x) for x in self.p["lengths"]))
        c = pool[rng.randrange(len(pool))]
        ids = self._ids(c["id"], c["text"])
        return self.tok.decode(ids[: max(16, n_tokens)])

    def cell_requests(self, L: int, out: int, n: int, *, cell_id: str, temperature: float,
                      prefix_share: float = 0.0, seed: int = 0, fixed_length: bool = True) -> list[Request]:
        pool = self.pool(L)
        rng = random.Random(f"{cell_id}:{seed}")
        idx = rng.sample(range(len(pool)), min(n, len(pool)))
        while len(idx) < n:
            idx.append(rng.randrange(len(pool)))
        task = task_for(out)
        instr = instruction(task, out)
        system = self.system
        if prefix_share > 0:
            shared_tokens = int(L * prefix_share)
            system = self.system + "\n\n" + self.shared_prefix(cell_id, shared_tokens)
        # More requests than distinct contexts: give each request its own cache salt
        # so a repeated context never hits the prefix cache.
        per_request_salt = n > len(pool) and prefix_share <= 0
        reqs = []
        for j, i in enumerate(idx):
            c = pool[i]
            ctx = c["text"]
            if prefix_share > 0:
                keep = max(32, c["ctx_tokens"] - int(L * prefix_share))
                ctx = self.tok.decode(self._ids(c["id"], c["text"])[:keep])
            reqs.append(Request(
                rid=f"{cell_id}-{j}",
                messages=[{"role": "system", "content": system},
                          {"role": "user", "content": ctx + "\n\n" + instr}],
                max_tokens=out, min_tokens=out if fixed_length else 0, temperature=temperature,
                cache_salt=f"{cell_id}-{j}" if per_request_salt else cell_id,
                meta={"L": L, "out": out, "task": task, "ctx": c["id"],
                                          "prefix_share": prefix_share}))
        return reqs

    def gsm8k(self, n: int) -> list[dict]:
        rows = list(read_jsonl(self.dir / "gsm8k.jsonl"))
        return rows[:n] if n else rows

    def train_prompts_path(self) -> Path:
        return self.dir / "train_prompts.jsonl"
