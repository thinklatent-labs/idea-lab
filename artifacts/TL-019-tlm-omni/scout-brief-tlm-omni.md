> Mirror of project-knowledge doc claude/scout-brief-tlm-omni.md, exported 2026-11-07. Registered as TL-019 tlm-omni (D-176), a feature of TL-018 tlm-roadmap; the "pre-idea, unregistered" status line below is historical.

# Scout brief — a real-time, full-duplex conversational model in the TLM line ("TLM omni")

Status: pre-idea, unregistered (Jithin, 2026-11-05: "not an idea yet"). No register row, no ID. Kept here so project search finds it if it becomes one. Prepared by the thinking partner across one Scout/Brainstorm chat on 2026-11-05, prompted by Block's Dessa announcement (2026-10-23).

## The target, as Jithin defined it in the session
A conversational model, not an analytics one: it listens, does the talking in real time, can be interrupted mid-utterance and realigns, carries the emotional register and the institutional knowledge of how calls are handled (who handles which operations, when to ask follow-up questions, how to advance a needs assessment), with reasoning that spans several pillars. Trained on Enterprise call data. Gemma-based, in the TLM line.

## Short answers
- No Gemma speaks. Gemma 4 (2026-04-02, Apache 2.0) listens on E2B, E4B and 12B Unified (ASR, speech translation, audio QA; a ~300M USM-style conformer on E2B/E4B, up to 30 s of audio, 16 kHz, 6.25 tokens/s) and outputs text. "Omni on Gemma" is a Gemma that hears plus a speech output stage and a duplex controller you add.
- Interruption and realignment is the full-duplex property. It is learned from dual-channel conversation data (both speakers on separate channels with timing), not from transcripts. The open full-duplex models (Moshi, PersonaPlex) were fine-tuned on the two-channel Fisher corpus; every full-duplex recipe starts there.
- The reasoning should live in a text stream inside the talking model (Moshi's inner monologue; Qwen3.5-Omni's Thinker-Talker; Apriel; GPT-Live), not in the audio path. Evidence: speech inputs consistently lag text on reasoning and text is the natural upper bound (ACL 2026); the gap is concentrated in logical reasoning needing entity tracking and is partly an elicitation failure fixed by chain-of-thought (June 2026); Big Bench Audio: GPT-4o 92% text vs 66% speech-to-speech; S2SBench names it "intelligence degradation"; τ³-Voice: voice agents 31–51% under clean audio, 26–38% under realistic conditions, against text agents well above. Dessa's text-free design is the research outlier with no published benchmarks; gpt-live-1 leads τ³-Voice at 81.7%.

## Pillar map — where each pillar lives in one full-duplex agent
| Pillar | Lives in | Trained from |
| --- | --- | --- |
| Needs assessment and follow-up questioning | Thinker (Core, text stream) | Call transcripts as dialogue demonstrations; outcome labels select the expert ones |
| Operations and routing knowledge (who handles what, what the system allows) | Thinker + tools | Transcripts plus case-system ground truth; policy documents |
| Policy and compliance boundaries | Thinker + Judge/Compliance adapters (TL-011) | Policy docs; compliance review labels |
| Emotional perception (distress, confusion, hesitation) | Listener (streaming audio front end) | Call audio |
| Emotional register in the reply | Talker (speech decoder) | Consented rep audio |
| Timing: interruption, backchannel, realignment | Duplex controller (Moshi-style multi-stream or a turn-taking model) | Dual-channel call audio with timing |
| Grounding in account facts | Tools via the harness (TL-008) | Not from the corpus |

Sequencing follows the map: Thinker first (the dialogue policy, on text from calls — the inner monologue of the talking model, not an ASR product), then Listener, Talker, Duplex. Each stage is testable on the index before the next.

## Build options for the duplex layer
- A. Moshi-style on Core: multi-stream model with a streaming codec (Mimi, 12.5 Hz, 80 ms frames) and inner monologue, Core as backbone. Kyutai's recipe (text LM → audio pretraining → multi-stream → two-channel dialogue fine-tune) is open (moshi, moshi-finetune); replacing Helium with Core is a pretraining-scale build (Dessa trained on one GB200 NVL72; Moshi on large audio corpora). Highest fidelity, highest cost, own serving stack (not vLLM).
- B. Thinker-Talker on Core (Qwen3.5-Omni pattern): Core thinks in text, a Talker streams codec tokens; semantic interruption via native turn-taking intent recognition; realignment is a re-plan on the Thinker. Nearer the stack; Talker serving on vLLM would be bespoke (vLLM-omni exists for Qwen-Omni, not Gemma).
- C. Cascade with a duplex controller: TLM1 ASR → Core → streaming TTS, with an open-weight turn-taking model (Tyger, OpenMDW-1.1, ~300 ms class) deciding when to yield, and the harness cutting TTS and re-planning on barge-in. What most production voice agents run; the control arm for every hypothesis; fastest to a real-time talking demo on the current stack.
- D. Fine-tune PersonaPlex-7B (NVIDIA Open Model License, commercial use subject to terms; Moshi base CC-BY-4.0; English) on de-identified dual-channel Enterprise calls: the cheapest true full-duplex spike, off-Gemma (Helium backbone). A research arm, not a product path, unless TL-014 admits a non-Gemma class.

Gemma 4's own audio encoder is a 30-second, non-streaming front end: right for turn-based omni (option B), wrong for real-time duplex, where the front end must be a streaming codec.

## "Expert" as a label, not a hope
Imitation learns the median rep, errors included. Outcomes exist per call (resolution, repeat call within N days, QA score, escalation): select top-decile demonstrations per intent, and decompose the session-level outcome into turn-level rewards for RL fine-tuning of the dialogue policy (LLM-GELI, 2025, uses an LLM as the decomposition oracle, with multimodal listener cues). Precedents for the pipeline: Call2Instruct (3,000 dual-channel telecom recordings → instruction dataset → Llama 2 7B); contact-centre instruction tuning on ASR transcripts at 14.3 WER.

## Evaluation — the index pillars for a conversational agent
τ-bench (Sierra): simulated users, domain tools, a policy manual, final database state checked exactly, pass^k reliability; failure modes: wrong arguments or information 55.5%, policy violations 25%, partial resolution 22.2%. τ³-bench (March 2026) adds a banking domain with ~700 knowledge documents and full-duplex voice evaluation. An Enterprise τ-style environment is the eval for pillars 1–3 and 7; its known con, that simulated users do not reproduce emotional volatility, is exactly what a model trained on real calls can fix — see sequencing below.

## Governance and product sequencing (brainstorm, for Jithin to react to)
Full-duplex, client-facing, advancing a needs assessment is the most exposed thing in the portfolio: live, no human in the loop, advice-adjacent. Three places the same model could talk first:
1. As the simulated caller: a conversational model that plays clients for rep training and for the Enterprise τ-style eval environment. Uses the corpus's emotion and reasoning pillars, zero client exposure, and it manufactures the eval environment TL-004 needs.
2. As the rep's co-pilot in the live call: listens full-duplex, speaks only to the rep (next question, routing, policy flag) — propose-only in a form that works in real time.
3. To clients on bounded intents (authentication, status, routing) with propose-only on any account action; needs assessment last.

## Data gates
- Dual-channel recordings with per-channel timing (telephony often records mixed mono; without separation there is no duplex training data).
- Outcome labels per call joined to the recording.
- Legal position on training on recorded calls (consent-notice scope) and on rep voices (biometric).
- 8 kHz narrowband audio vs 16/24 kHz front ends; chunking or streaming for multi-minute calls.

## What would make it an idea
Any one of: confirmation that dual-channel recordings with outcomes exist; Legal's position; or a two-week spike (option D on 500 de-identified dual-channel calls) showing the corpus carries the Enterprise's turn-taking and register. If registered: slug tlm-duplex (or tlm-omni), type Idea, theme T-001, H3, links depends-on TL-008 and TL-014, reuses TLM1 speech model and corpus, Core, self-healing, Judge family (TL-011), evidence-for TL-012, competes-with the cascade (control arm).

## Candidate hypotheses (pre-registered only if registered)
- H1: a Thinker trained on outcome-selected call demonstrations beats base Core on an Enterprise τ-style environment (pass^1 and pass^k); refuted if no lift.
- H2: a duplex front end on that Thinker beats the cascade-plus-turn-taking control on interruption handling and caller-rated naturalness at equal task success; refuted if task success drops more than the index's noise band.
- H3: rep-imitation SFT without outcome selection raises the compliance-flag rate; if confirmed, outcome selection and the governed path are mandatory.

## Sources
- Gemma 4 E4B model card: https://huggingface.co/google/gemma-4-E4B-it
- Gemma 4 audio inputs guide: https://dev.to/pulkitgovrani/gemma-4s-audio-and-video-inputs-a-hands-on-guide-nobody-has-written-yet-2m2c
- Gemma 4 family overview: https://aimlapi.com/blog/gemma-4---google-deepminds-most-powerful-open-weight-ai-model-family
- Community Gemma omni builds: https://huggingface.co/nphearum/PsarAI-Omni · https://github.com/andr-lab/gemma-4-omni · https://github.com/bicro/gemma4-audio · https://huggingface.co/walln/parley
- Apriel Voice 27B Preview: https://huggingface.co/ServiceNow-AI/Apriel-Voice-27B-preview
- Qwen3.5-Omni: https://arxiv.org/pdf/2604.15804
- NVIDIA PersonaPlex: https://github.com/NVIDIA/personaplex · https://pasqualepillitteri.it/en/news/26826/nvidia-personaplex-explained-full-duplex-voice-ai
- Tyger turn-taking model: https://huggingface.co/nineninesix/tyger
- Closing the Modality Reasoning Gap (ACL 2026): https://arxiv.org/abs/2601.05543
- Entity Binding Failures in Speech LLM Reasoning (2026): https://arxiv.org/html/2606.04474
- Big Bench Audio: https://huggingface.co/blog/big-bench-audio-release
- S2SBench: https://awesomepapers.io/speech-audio/papers/2505.14438
- τ-bench and τ³-bench: https://alphaxiv.org/benchmarks/sierra/tau-bench · https://www.layer3labs.io/guides/tau-bench-explained
- LLM-GELI reward decomposition: https://arxiv.org/pdf/2505.15922
- Call2Instruct: https://arxiv.org/pdf/2601.14263
- Contact-centre LLM instruction tuning: https://arxiv.org/pdf/2312.15922
- Dessa coverage: https://www.unite.ai/?p=493586 · https://glitchwire.com/news/blocks-dessa-learns-to-talk-by-listening-not-reading/
- basal-omni-1.0-max (capture for TL-014): https://featherless.ai/models/Remek/basal-omni-1.0-max
