# Enterprise benchmark: what exists, what we adopt, and the ask to the team

Lab session · TL-003 portal · Spec (TL Index work, now inside the portal). 2026-11-11. Owner: Index lead (Claude). Decider: Jithin, Head of ThinkLatent.

## 1. The short version

- Vals AI's benchmarks are the best public example of what we want: real professional tasks, written by practitioners, each with a gold answer, sources and a weighted rubric. Almost none of the data is free. Each benchmark has a small public sample, a larger set that is licensed on request, and a test set that is never released.
- The public samples are too small to score a model on (5 to 50 questions). They are the right thing to adopt on day one as the **format** and as a smoke test.
- The Enterprise holds better material than any vendor can buy: its own work. The ask below is for the team to write an Enterprise benchmark in the same shape, so the two can sit side by side on the TL Index under one category, "Real Enterprise".

## 2. What Vals AI has, and what can be had

Read from vals.ai on 2026-11-11. Vals publishes no price list; licensing is by contacting them.

| Benchmark | What it tests | Free | Licensed on request | Never released |
|---|---|---|---|---|
| Finance Agent v2.1 | Analyst research over company filings; nine task types | 27 questions and the agent harness (code MIT) | 450 "private validation" questions | 449 test questions |
| Finance Agent v1 | Same, first version | 50 questions, CC BY 4.0, CSV with Question, Answer, Rubric | 150 questions | 337 test questions |
| Legal Research Bench | Multi-step US legal research with cited sources | 5 questions and the harness | 200 questions | 208 test questions |
| Tax Agent Bench | Research-grade US corporate tax questions | 5 questions and the harness | 193 questions | 193 test questions |
| Excel Modeling Benchmark | Building financial models in a spreadsheet | Not stated on the pages read | Not stated | Test set private |
| HLAB (with a law-firm software company) | Long legal work product from documents | Not stated | Not stated | Private |
| ClaimBench | Does a filing excerpt support, contradict or say nothing about a claim | Not stated | Not stated | Not stated |
| LegalBench | Legal reasoning tasks | Open-source tasks (an outside academic set Vals runs) | Not applicable | Not applicable |
| CorpFin v2, CaseLaw v2 (archived) | Credit agreements; Canadian case law | No | Not stated | Private |

Vals's own rule, from its methodology page: a public validation set for transparency, a private validation set it licenses to companies, and a test set that stays private so models cannot train on it.

Also free: their evaluation infrastructure is open source. One caution: it is under the AGPL licence, which our licence check does not allow into a product without a decision. Use it for reference, not as a dependency, until that is decided.

Not verified in this pass: the exact file layout of the v2 public questions on GitHub (the fetch needed an approval that was not available). The v1 layout is confirmed: one CSV, columns `Question`, `Answer`, `Rubric`.

## 3. What we adopt on day one

1. **The shape of an item.** Question, gold answer, sources, weighted rubric with must-not-miss checks. Section 5 is our version of it.
2. **The three-way split.** Open inside the Enterprise, validation, and a held-out test set only the Index lead can read.
3. **Two scores per item.** All-pass (every check met) and partial credit (weighted share of checks, zero if a must-not-miss check fails).
4. **The public samples as a smoke test.** Finance Agent v1 (50) and v2 (27), Legal Research (5), Tax Agent (5). Run every TLM version and the frontier comparison on them and show them in the portal as "Public samples: too few to rank on".
5. **Judge calibration.** Vals reports its judge against a majority of three human experts. We do the same before any judge score is shown.

To decide (Jithin): whether to ask Vals for a quote on the licensed validation sets for Finance Agent, Legal Research and Tax Agent. The case for: an outside yardstick the team did not write. The case against: US public-company and US law content, a long way from the Enterprise's own work, and the test sets still stay with Vals.

## 4. The Enterprise benchmark: categories

Each category maps to a TL Index pillar, so a use case's score and the overall "Real Enterprise" score come from the same items.

| # | Category | What the model is asked to do | TL Index pillar |
|---|---|---|---|
| 1 | Client conversation summaries | Summarise a call or message thread into the fields an adviser files | Client care |
| 2 | Client questions answered from approved sources | Answer a client or adviser question using only approved documents, with citations | Client care; Safety and grounding |
| 3 | Fund and product document questions | Find and state charges, holdings, risk ratings and dates from product documents | Financial data processing |
| 4 | Numbers and tables | Work out fees, returns, contributions and dates from statements and tables, showing the working | Financial data processing |
| 5 | Financial analysis | Compare funds or companies, explain a change, build a short reasoned view from several sources | Financial data processing |
| 6 | Operations cases | Triage a claim, explain a reconciliation break, route a service request | Entity recognition; Client care |
| 7 | Entity and field extraction | Pull names, accounts, amounts, dates and products out of free text into a fixed form | Entity recognition |
| 8 | Policy and regulation lookup | Say what a policy or rule requires in a stated situation, citing the section | Compliance and regulatory |
| 9 | Suitability and disclosures | Spot a missing disclosure, an unsuitable recommendation, or advice the model must not give | Compliance and regulatory; Safety and grounding |
| 10 | Refusals and safe handling | Decline what is outside the approved use; resist instructions hidden in documents; never reveal another client's data | Safety and grounding |
| 11 | Long threads and long documents | The same tasks with 20 or more turns or 50 or more pages, where the answer is early or scattered | Every pillar (a difficulty band, not a pillar) |
| 12 | Multi-step tasks with tools | Search, open, calculate and write, in an agent harness, to produce a finished piece of work | Every pillar |

## 5. The item format

One JSON object per line (JSONL), one file per category and split. Field names are fixed.

```json
{
  "id": "ENT-03-0142",
  "category": "Fund and product document questions",
  "pillar": "Financial data processing",
  "use_cases": ["UC-0307"],
  "instruction_type": "question_with_documents",
  "difficulty": "standard",
  "input": {
    "instruction": "What is the ongoing charge of the fund, and when did it last change?",
    "context": [{"doc_id": "D-0031", "title": "Factsheet", "kind": "pdf", "path": "docs/D-0031.pdf"}],
    "turns": []
  },
  "gold_answer": "The ongoing charge is 0.22%. It last changed on 1 April 2026, from 0.25%.",
  "answer_type": "short_text_with_citation",
  "sources": [{"doc_id": "D-0031", "locator": "page 2, Charges table"}],
  "rubric": [
    {"check": "States the ongoing charge as 0.22%", "weight": 3, "must_not_miss": true},
    {"check": "States the date of the last change as 1 April 2026", "weight": 2, "must_not_miss": false},
    {"check": "Cites the factsheet charges table", "weight": 1, "must_not_miss": false},
    {"check": "Does not state a charge for any other share class", "weight": 2, "must_not_miss": true}
  ],
  "split": "test",
  "sensitivity": "synthetic",
  "author": "role: fund operations analyst",
  "reviewer": "role: second fund operations analyst",
  "written": "2026-11-18",
  "notes": "Footnote 3 gives the old charge; a model that reads only the headline misses the change."
}
```

Rules for the fields:

- `instruction_type`, one of: `question_with_documents`, `question_no_documents`, `summarise`, `extract_to_form`, `classify_and_route`, `calculate`, `compare`, `draft`, `multi_turn`, `agent_task`, `must_refuse`.
- `answer_type`, one of: `short_text`, `short_text_with_citation`, `number_with_unit`, `structured_form` (give the JSON schema), `label` (give the allowed labels), `long_text` (rubric carries all the grading), `refusal`.
- `difficulty`: `standard`, `hard` (needs two or more sources or a footnote), `long` (category 11).
- `sensitivity`: `synthetic`, `public`, `de-identified`. No item may hold client data or anything that identifies a person. De-identified items need sign-off from the data owner before they are filed.
- `rubric`: 3 to 12 checks. Each is something a correct answer must contain or must not contain, written so two reviewers would mark it the same way. Weight 1 to 3. At least one `must_not_miss`.
- `gold_answer`: one unambiguous answer. If two analysts would answer differently, the item is not ready.
- `sources`: every fact in the gold answer points to a document and a place in it.
- `must_refuse` items: the gold answer is the refusal and what to offer instead; the rubric checks both.

## 6. How it is scored

- All-pass: 100% if every check is met, else 0.
- Partial credit: weighted share of checks met; 0 if any `must_not_miss` check fails. An answer that offers two candidate values without choosing fails the check.
- The judge is a model; before its scores are shown, 100 answers are marked by three people and the judge must agree with their majority at least as often as one person does.
- Per use case: the items tagged with that use case. "Real Enterprise" on the TL Index: every category, weighted by each use case's share of requests, restated each quarter.
- Each score is shown with its number of items; under 30 items it is shown as too few to rank on.

## 7. Splits and handling

| Split | Share | Who can read it | Used for |
|---|---|---|---|
| Open | 10% | Anyone at the Enterprise | Showing what the benchmark asks; prompt work |
| Validation | 40% | Application teams and the Foundation team | Practice runs, tuning |
| Test | 50% | Index lead only | Official runs; the only numbers the TL Index cites |

Test items are never used in training, never pasted into a chat tool, and are retired to the open set when they stop separating models or after a suspected leak. Every retirement is logged.

## 8. The ask

First tranche: 600 items, 50 per category, in six weeks. Second tranche takes each category to 150.

| Team role | Categories | First tranche | What they bring |
|---|---|---|---|
| Advice and client service practitioners | 1, 2, 9 | 150 items | Real question types, rewritten on synthetic clients |
| Fund operations and product analysts | 3, 4, 5 | 150 items | Product documents that are already public; worked answers |
| Operations analysts | 6, 7 | 100 items | Case types and the forms they fill today |
| Compliance analysts | 8, 9, 10 | 100 items | Policy sections, disclosure rules, what must be refused |
| Foundation team (Research function) | 10, 11, 12 | 100 items | Hidden-instruction tests, long-context variants, agent tasks and the harness |
| Index lead (Claude) | All | Review | Format checks, split assignment, judge calibration, the first Official run |

Each item passes four checks before it is accepted: the format validates; a second person from the same role answers it cold and matches the gold answer; the rubric marks a known-good and a known-bad answer correctly; the sensitivity mark is right.

## 9. Where this is thin

- The category list is drafted from the six use cases in the lab's sample, not from a survey of the Enterprise's real work. The first week should be the practitioners correcting it.
- 50 items a category gives wide intervals. It is enough to see large gaps, not to rank close models.
- Writing rubrics is the slow part; expect 30 to 45 minutes an item for the first hundred.
- An outside yardstick is still missing unless a Vals licence is bought.

## 10. What would confirm or refute the bet

Confirm: on the test split, the domain-trained TLM versions beat the base model by more than the interval in at least 8 of 12 categories, and the ranking differs from the public samples. Refute: no category separates the trained version from the base, or the ranking simply copies the general leaderboard, in which case the Enterprise benchmark is not measuring anything the public ones do not.

Sources: vals.ai/benchmarks, /methodology, /benchmarks/fabv2-1, /benchmarks/legal_research, /benchmarks/tax_agent_bench, /llms.txt; arXiv 2508.00828 (Finance Agent Benchmark).
