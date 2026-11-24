# ThinkLatent site — page copy for SharePoint (v10)

Nov 16, 2026 · @Jithin Pradeep

## How to use this copy

Every page of the ThinkLatent site in SharePoint's own terms: one heading per page, one table per section, top to bottom, with the words from design canvas v10 (D-381), restyled as canvas v11 on 23 Nov 2026 (D-490, the design kit's colour v5; no word changed). Copy a cell, paste it into the web part named, and set the style shown on the left. The [build guide](https://claude.ai/artifact/8aaC53w8XNkk4UVcoErQMr) says how to make each page; this doc says what goes on it.

**Styles.** In a Text web part, pick the style, then type the size in the font size box (it takes any size from 8 to 250). The sizes are the canvas's own; check the first Heading 1 at 48 against the canvas on the test site before doing the rest. Once custom.css is live, headings and body text take their sizes by themselves and the typing can stop.

| Style in this doc | In SharePoint |
| --- | --- |
| Heading 1 · 48 | Text web part, Heading 1, size 48 (the number is the size) |
| Heading 2 · 26 | Heading 2, size 26 |
| Heading 3 · 22 | Heading 3, size 22 |
| Lead · 22 | Normal text, size 22 |
| Body | Normal text, size 17 |
| Small | Normal text, size 15 |
| Label | Normal text, size 14, bold, font colour #0B5F33 |
| Number · 80 | Normal text, size 80 |
| Pull quote | The Pull quote style |
| Bullet | A bulleted list |
| Table header, Table row | A table inside the Text web part |
| Caption | The caption of the Image web part above it |
| Image | Image web part: the capture or picture named |
| Button, Button (red) | Button web part: the label, then where it goes after the arrow. Button (red) is the page's main action: end its link with ?tl=main and custom.css turns it red; until then it is the theme's black, like every button |
| Quick link, Link title | One item in a Quick links web part |
| Link | A link inside the text, to where the arrow says |
| Web part | Add this web part; nothing to type |
| Page property | A page property: Owner, Second owner, Review by |
| Instruction box | Templates only: highlighted text the author deletes before publishing |
| Builder note | For you, not for the page |

**Brackets.** Text in \[brackets\] is a value only the Enterprise holds. Fill it from the system named beside it, or leave that block off the live page: a number goes live only with its source and date, and a person is not a source (D-192). The [launch brackets doc](https://claude.ai/artifact/38RGiipB795FZiQZCkzwAu) lists every one, grouped by the system it comes from, so each system is opened once.

**Names.** The lab writes "the Enterprise" wherever the company's name goes and "the university" for the partner university. Put the names you want on the live site as you paste.

**Backgrounds.** A section marked "background Meadow" takes that image from Site Assets, folder ThinkLatent, as its section background. One marked Canopy, Lagoon or Mint rise takes the theme's colour pair with that background (#0C2822, #E3F0EF or #E6F2EC), or the flat image of the same name where no pair is offered (build guide, step 5). Unmarked sections stay white.

## Home

Home page: no title area. Comments off on this page only. Every section below is one row of sections on the page, top to bottom.

### 1 · The Enterprise shouldn't have to start from zero. · background Meadow

| Style | Copy |
| --- | --- |
| Heading 1 · 92 | The Enterprise shouldn't have to start from zero. |
| Lead · 34 | Owned models. Inside the boundary. |
| Lead · 21 | ThinkLatent builds the Enterprise's own models, trained on what it already knows, so every use case makes the next one better. |
| Button (red) | Start a use case → the Bring us a problem form |
| Button | How we build responsibly → How we build responsibly page |
| Label | The ThinkLatent Portal, running |
| Web part | Looping capture · Stream web part |
| Caption | A short looping capture of the portal's command centre goes here once the portal runs. Until then this static snapshot holds the slot; every count is a placeholder. |

### 2 · Running on TLM

| Style | Copy |
| --- | --- |
| Label | Running on TLM |
| Text | \[Business line\] |
| Text | \[Business line\] |
| Text | \[Business line\] |
| Text | \[IT engagement\] |
| Text | \[Office: Canada\] |
| Text | \[Office: India\] |
| Builder note | *Names, not logos: each team is listed only with its own agreement, and only if it is in production on TLM.* |

### 3 · Kept, proven, compounding

| Style | Copy |
| --- | --- |
| Label | What changes |
| Heading 1 · 48 | Kept, proven, compounding |
| Label | 01 |
| Heading 2 · 28 | Kept |
| Body | What the Enterprise's teams teach the models stays in the Enterprise's own models and feeds the next one. What didn't work is kept too. |
| Label | 02 |
| Heading 2 · 28 | Proven |
| Body | Every model is scored on the Enterprise's own tasks, with a source and a date on every score. Approval stays with the Enterprise's model risk management. |
| Label | 03 |
| Heading 2 · 28 | Compounding |
| Body | Each new use case adds signal, so the next team starts further ahead than the last. |

### 4 · What the Enterprise's models did this week

| Style | Copy |
| --- | --- |
| Label | Proof |
| Heading 1 · 48 | What the Enterprise's models did this week |
| Body | Four numbers and a row per business line, each with its source and as-of date. A number with no source does not go up. |
| Button | All wins → Wins page |
| Label | This week |
| Small | Source: the ThinkLatent Portal · as of \[date\] |
| Label | Use cases live |
| Number · 80 | \[n\] |
| Label | Requests this week |
| Number · 80 | \[n\] |
| Label | Corrections kept |
| Number · 80 | \[n\] |
| Label | Models retrained |
| Number · 80 | \[n\] |
| Table header | Business line · This week · Use cases · Requests · Corrections · Retrained |
| Table row | \[Business line\] · \[One line from its product lead on what changed\] · \[n\] · \[n\] · \[n\] · \[n\] |
| Table row | \[Business line\] · \[One line from its product lead on what changed\] · \[n\] · \[n\] · \[n\] · \[n\] |
| Table row | \[Business line\] · \[One line from its product lead on what changed\] · \[n\] · \[n\] · \[n\] · \[n\] |
| Builder note | *The panel replaces v8's compounding strip, so 35M+ and \~200 (sourced only to a person) come off Home. The numerals map to the three success measures: solutions in people's hands, cycle time, an AI-native workforce. Until the portal supplies counts, the panel launches with the rows that have a source, or not at all.* |
| Web part | List web part on the Wins list, one item: the featured win with its number, source, date, approved quote and what compounded. Nothing to type. |
| Web part | News web part, Category = Awards, the latest post; its button reads "All six winners". |
| Web part | News web part, Category = Partner, the latest post. |
| Label | This month · from the Head of ThinkLatent and the monthly email |
| Small | \[MONTH\] |
| Heading 2 · 26 | \[This month's reflection title\] |
| Bullet | \[The biggest thing that shipped, and for whom\] |
| Bullet | \[A win, with its number\] |
| Bullet | \[A paper, talk or release\] |
| Bullet | \[What changed in AI outside the Enterprise\] |
| Bullet | \[Who we are recognising this month\] |
| Link | Newsletter archive → Blog page, archive section |

### 5 · Named products, built on the Enterprise's own data

| Style | Copy |
| --- | --- |
| Label | How the mandate is delivered |
| Heading 1 · 48 | Named products, built on the Enterprise's own data |
| Body | The mandate first, then the products that carry it, then the proof. Each product has an outcome card here and a full card in the ThinkLatent Portal. |
| Button | All products → Products page |
| Label | TLM |
| Label | 3 generations in use |
| Heading 2 · 24 | TLM line |
| Small | Core, Distil and Domain tiers that know the Enterprise's work; TLM5 next, predicting where an interaction is going. |
| Label | ThinkLatent Portal |
| Label | In build |
| Heading 2 · 24 | One place to find, try, train and run ThinkLatent's models |
| Small | The catalogue, the use-case record, the playground and the full model cards. |
| Label | TL Index |
| Label | In build |
| Heading 2 · 24 | How models score on the skills the Enterprise needs |
| Small | Open-source against frontier, on Enterprise tasks; every ThinkLatent release is measured against the last. |

### 6 · Where to start, by who you are · background Mint rise

| Style | Copy |
| --- | --- |
| Label | Four doors |
| Heading 1 · 48 | Where to start, by who you are |
| Body | Each door leads to one page and one named person. The ladder underneath says what working with ThinkLatent gets you at each step. |
| Label | Business partner |
| Heading 2 · 24 | Bring us a problem |
| Small | What takes too long, costs too much, or cannot be done today. A form, a named owner, a reply within a week. |
| Text | Open the form |
| Label | Developer |
| Heading 2 · 24 | Build on TLM |
| Small | Relay, the SDK that follows the client patterns you already know; endpoints, the playground and model cards in the ThinkLatent Portal. |
| Text | Start building |
| Label | Executive |
| Heading 2 · 24 | See the outcomes |
| Small | Wins with a sourced number and the partner's own words; the year in review; the numbers that compound. |
| Text | Read the wins |
| Label | Governance |
| Heading 2 · 24 | How we build responsibly |
| Small | ThinkLatent's steps alongside the Enterprise's model risk management, which approves and validates. |
| Text | See the steps |
| Label | Work with ThinkLatent · step 1 |
| Heading 3 · 22 | Consult |
| Small | Bring the problem. We say whether ThinkLatent can help, which model fits and how long it takes, within a week. No cost to the team. |
| Label | Step 2 |
| Heading 3 · 22 | Co-build |
| Small | A product lead from ThinkLatent with your team, on an existing TLM tier: from pilot to production with one sourced number at the end. |
| Label | Step 3 |
| Heading 3 · 22 | Dedicated model |
| Small | A Domain model for a business with a queue of use cases, built on Core, evaluated on the index, carried in the roadmap. |

### 7 · Posts, papers, wins and releases

| Style | Copy |
| --- | --- |
| Label | Latest from the team |
| Heading 1 · 48 | Posts, papers, wins and releases |
| Button | All → Blog page |
| Button | Perspective → Blog page |
| Button | Deep dive → Blog page |
| Button | Papers → Publications page |
| Button | Wins → Wins page |
| Button | Releases → Products page, releases section |
| Web part | News web part, list layout, the newest four, filtered by the Category buttons above. First posts to write: TLM4: Core, Distil and Domain, in outcomes; Can a small model beat a large one? What the university pretraining project means here; Proprietary only counts if it fuels the business; From endpoint to use case in a week, with Relay. |
| Web part | Viva Engage web part: the ThinkLatent community, titled "Questions, wins and follow-ups", with an "Open the community" button. |
| Label | Use AI at the Enterprise |
| Heading 2 · 24 | The things ThinkLatent links to, and does not copy |
| Small | Policy, the approved tools and firm-wide training belong to the Enterprise's AI governance owner. The playground and the full model cards live in the ThinkLatent Portal; the scores live in the TL Index. |
| Label | Governance owner |
| Link title | Approved AI tools ↗ |
| Small | The list every team should check first. |
| Label | Governance owner |
| Link title | AI training paths ↗ |
| Small | Firm-wide literacy, by role. |
| Label | ThinkLatent Portal |
| Link title | Playground and model cards ↗ |
| Small | Try a model; read its full card. |
| Label | The TL Index |
| Link title | TL Index ↗ |
| Small | How models score on the Enterprise's skills. |

### 8 · Which part of your work should the model learn next? · background Canopy

| Style | Copy |
| --- | --- |
| Heading 1 · 60 | Which part of your work should the model learn next? |
| Lead · 20 | Tell us in your words. Every use case makes the next one easier. |
| Button (red) | Start a use case → the Bring us a problem form |

## Mandate

Title area: Plain, title "Mandate". Comments on. The dotted spine is not built: the chapters stand as numbered sections, and the spine appears in the opening and closing images.

### 1 · ThinkLatent builds the Enterprise's own AI, and keeps… · background Meadow

| Style | Copy |
| --- | --- |
| Label | The mandate |
| Heading 1 · 72 | ThinkLatent builds the Enterprise's own AI, and keeps everything it learns. |
| Lead · 21 | Language models, speech, omni and thinking models, foundation models: whatever the work needs, trained on what the Enterprise already knows. Five chapters on why, and how. |
| Small | Chapters: |
| Link | 01 Today → this page, ch1 section |
| Link | 02 Vision → this page, ch2 section |
| Link | 03 Approach → this page, ch3 section |
| Link | 04 Generations → this page, ch4 section |
| Link | 05 The loop → this page, ch5 section |

### 2 · Most AI at a large company is rented.

| Style | Copy |
| --- | --- |
| Label | 01 |
| Label | 01 · Today |
| Heading 1 · 48 | Most AI at a large company is rented. |
| Lead · 20 | A general model, used one project at a time. Each team starts from zero, waits months for a first answer, and what the model learned leaves with the project. |
| Pull quote | "Anyone using a vendor's AI only gets as good as the vendor." Jithin Pradeep, Head of ThinkLatent |
| Caption | Today: a use case, a general model, months of setup, one answer. The dots scatter: the lesson leaves with the project. |

### 3 · What one team learns should carry into the next team's work.

| Style | Copy |
| --- | --- |
| Label | 02 |
| Label | 02 · Vision |
| Heading 1 · 48 | What one team learns should carry into the next team's work. |
| Lead · 20 | The Enterprise's models should carry what one team learns into the next team's work. Every document, conversation and correction makes the next answer better. |
| Caption | What the Enterprise knows, gathered into TLM, and the work it powers. Knowledge arrives as dots; work leaves as lines. |

### 4 · One system, every team, every lesson kept.

| Style | Copy |
| --- | --- |
| Heading 1 · 48, centred | One system, every team, every lesson kept. |

### 5 · One system builds, measures and improves every model.

| Style | Copy |
| --- | --- |
| Label | 03 |
| Label | 03 · Approach |
| Heading 1 · 48 | One system builds, measures and improves every model. |
| Lead · 20 | The TLM line; a self-healing loop that finds what a model does not know yet; and the TL Index, which scores each model on the Enterprise's own work. Approval and validation stay with the Enterprise's model risk management. |
| Body | See the products · How we build responsibly |
| Caption | The system, as a snapshot. States are samples and every count is a placeholder; in the ThinkLatent Portal each count is live and links to the page behind it. |

### 6 · Each TLM generation is trained on more of the Enterprise's…

| Style | Copy |
| --- | --- |
| Label | 04 |
| Label | 04 · Generations |
| Heading 1 · 48 | Each TLM generation is trained on more of the Enterprise's own data. |
| Lead · 20 | Experiments that win are scaled. The ones that fall short are kept as evidence, so no team repeats them. |
| Builder note | *Line to confirm with Applied Research before publishing. The brief's original, "Each TLM generation starts from what the last one learned", holds only if each generation carries weights or data forward; if a generation starts from a new base model, the page says what carries forward (the Enterprise's data and evaluations).* |
| Caption | TLM1 to TLM5, and every TL Index verdict kept for the next model: Better, Tie, Below threshold. |

### 7 · Every use case in production sends signal back.

| Style | Copy |
| --- | --- |
| Label | 05 |
| Label | 05 · The loop |
| Heading 1 · 48 | Every use case in production sends signal back. |
| Lead · 20 | What worked, what was corrected, what was missed. The models improve where the Enterprise actually works, and the numbers show it. |
| Label | What the Enterprise's models did this week |
| Small | Source: the ThinkLatent Portal · as of \[date\] |
| Label | Use cases live |
| Number · 80 | \[n\] |
| Label | Requests this week |
| Number · 80 | \[n\] |
| Label | Corrections kept |
| Number · 80 | \[n\] |
| Label | Models retrained |
| Number · 80 | \[n\] |
| Table header | Business line · This week · Use cases · Requests · Corrections · Retrained |
| Table row | \[Business line\] · \[One line from its product lead on what changed this week\] · \[n\] · \[n\] · \[n\] · \[n\] |
| Table row | \[Business line\] · \[One line from its product lead on what changed this week\] · \[n\] · \[n\] · \[n\] · \[n\] |
| Table row | \[Business line\] · \[One line from its product lead on what changed this week\] · \[n\] · \[n\] · \[n\] · \[n\] |
| Builder note | *Layout only. The panel goes on the site once the ThinkLatent Portal supplies real counts with a source and an as-of date; until then it lives in presentations. No number here is estimated.* |

### 8 · Four things, measured

| Style | Copy |
| --- | --- |
| Label | What we hold ourselves to |
| Heading 1 · 48 | Four things, measured |
| Body | The mandate is judged on outcomes. Each has a target and where it stands today, with a source and a date. They sit under the loop because the loop is what moves them. |
| Label | Latency |
| Heading 3 · 22 | Fast enough to sit in front of the work |
| Small | Decision models answer in milliseconds; the desk model answers while the client is still on the line. |
| Body | Target: replies under 300 tokens in under 200 ms for the fastest service class, and over 1,000 tokens a second per request on TLM4 Core 27B |
| Small | Today: \[TODAY\] · \[SOURCE\] · \[DATE\] |
| Label | Cost |
| Heading 3 · 22 | A fraction of frontier cost |
| Small | Pruned, distilled and quantized models that run on our own serving, at a cost that lets them be everywhere. |
| Body | Target: \[TARGET, e.g. cost per 1,000 calls vs frontier\] |
| Small | Today: \[TODAY\] · \[SOURCE\] · \[DATE\] |
| Label | Scale |
| Heading 3 · 22 | Every client, the same quality |
| Small | Use cases in production and business units served, compounding quarter on quarter. |
| Body | Target: \[TARGET, e.g. use cases in production by YEAR\] |
| Small | Today: \[TODAY\] · \[SOURCE\] · \[DATE\] |
| Label | Competitive advantage |
| Heading 3 · 22 | Intelligence nobody else can buy |
| Small | Models that carry the Enterprise's knowledge and its customers' voice, improving from the feedback only we have. |
| Body | Target: \[TARGET, e.g. TL Index lead on Enterprise skills\] |
| Small | Today: \[TODAY\] · \[SOURCE\] · \[DATE\] |

### 9 · Intelligence the Enterprise owns, and that grows every time…

| Style | Copy |
| --- | --- |
| Heading 1 · 56 | Intelligence the Enterprise owns, and that grows every time it is used. |
| Lead · 20 | ThinkLatent. |
| Button (red) | Start a use case → the Bring us a problem form |
| Button | How we build responsibly → How we build responsibly page |

### 10 · Page owners and review

| Style | Copy |
| --- | --- |
| Page property | Page owners: \[Site editor, TPM\] · Head of ThinkLatent |
| Page property | Review by: \[DATE + 1 quarter\] |
| Page property | Last reviewed: \[DATE\] |

## Products

Title area: Plain, title "Products". Comments on.

### 1 · How the mandate is delivered. · background Meadow

| Style | Copy |
| --- | --- |
| Label | Products |
| Heading 1 · 72 | How the mandate is delivered. |
| Lead · 21 | TLM, the models that carry the Enterprise's knowledge; the ThinkLatent Portal, where teams find, try, train and run them; the TL Index, which says how good they are; and How we build responsibly, which sets out ThinkLatent's steps alongside the Enterprise's model risk management. |
| Button | TLM → this page, tlm section |
| Button | ThinkLatent Portal → this page, portal section |
| Button | TL Index → this page, index section |
| Button | How we build responsibly → How we build responsibly page |
| Button | Releases → this page, releases section |
| Number · 72 | 5 |
| Small | generations |
| Number · 72 | 3 |
| Small | generations in use · model inventory · \[date\] |
| Number · 72 | \[n\] |
| Small | client interactions a year across voice, chat, web, email and SMS · AI Gateway telemetry · \[date\] |

### 2 · TLM first. Frontier models where the TL Index shows they win.

| Style | Copy |
| --- | --- |
| Label | The models |
| Heading 1 · 48 | TLM first. Frontier models where the TL Index shows they win. |
| Body | Every team starts on a TLM model. An outside model is used only where the TL Index shows it does the task better, and the index runs those models every month so the comparison stays fair. |
| Button | How the index compares → this page, index section |
| Quick link | TLM4 Core 27B |
| Quick link | TLM4 Core 7B |
| Quick link | TLM4 Distil |
| Quick link | TLM4 Domain: Advice, Compliance, Judge, Cybersecurity |
| Quick link | TLM1 speech and classifiers |
| Quick link | TLM5, in work |
| Quick link | Frontier and open models, as the comparison set |

### 3 · Six things, each shown as it looks

| Style | Copy |
| --- | --- |
| Label | What you can use |
| Heading 1 · 48 | Six things, each shown as it looks |
| Body | Each card opens the real screen. The pictures are captures of the ThinkLatent Portal, refreshed at each release. |
| Image | \[Capture: the command centre\] |
| Heading 2 · 24 | ThinkLatent Portal |
| Small | Take a use case from first test to production in one place. |
| Image | \[Capture: a model's page\] |
| Heading 2 · 24 | TLM |
| Small | Models trained on the Enterprise's own knowledge, sized for the job. |
| Image | \[Capture: Head to head\] |
| Heading 2 · 24 | The TL Index |
| Small | See which model wins on your task before you choose one. |
| Image | \[Capture: the six steps\] |
| Heading 2 · 24 | How we build responsibly |
| Small | See the steps every model goes through, and who is responsible for each. |
| Image | \[Capture: a Relay call\] |
| Heading 2 · 24 | Relay |
| Small | Call a ThinkLatent model the way you already call any model. |
| Image | \[Capture: a use case's gaps\] |
| Heading 2 · 24 | Self-healing |
| Small | Models that find what they don't know yet and learn it. |

### 4 · Five generations, one line of descent

| Style | Copy |
| --- | --- |
| Label | TLM · the lineage |
| Heading 1 · 48 | Five generations, one line of descent |
| Body | Each generation is a different bet. TLM4 branches into three tiers built on one base. The picture is an image on this page; the interactive version lives in the ThinkLatent Portal. |
| Button | TLM4 release notes → the Write for ThinkLatent page, templates section |
| Label | Core · 27B and 7B |
| Label | In use |
| Heading 2 · 24 | Knows the Enterprise best |
| Small | For: anything that needs the Enterprise's knowledge |
| Small | Used by: the advice desk, \[N\] use cases |
| Small | Limits, plainly: best on the Enterprise's own work; slower and dearer than Distil; the 7B trades some accuracy for speed |
| Small | Owner: \[Name\] Full card in the ThinkLatent Portal ↗ |
| Label | Distil |
| Label | In use |
| Heading 2 · 24 | The cheaper path, kept open |
| Small | For: high-volume, bounded tasks |
| Small | Used by: \[N\] use cases |
| Small | Limits, plainly: does not carry Core's full knowledge; pick it when the task is narrow |
| Small | Owner: \[Name\] Full card in the ThinkLatent Portal ↗ |
| Label | Domain |
| Label | Preview |
| Heading 2 · 24 | Specialists for a business domain |
| Small | For: a domain with a queue of use cases: Advice, Compliance, Judge, Cybersecurity |
| Small | Used by: \[Business units\] |
| Small | Limits, plainly: built only on Core, only where several use cases justify it |
| Small | Owner: \[Name\] Full card in the ThinkLatent Portal ↗ |

### 5 · Six kinds of work, each on the model built for it · background Lagoon

| Style | Copy |
| --- | --- |
| Label | Where TLM works |
| Heading 1 · 48 | Six kinds of work, each on the model built for it |
| Heading 2 · 24 | Advice |
| Label | Domain · preview |
| Body | Helps advisors prepare and check guidance the way the Enterprise gives it. |
| Heading 2 · 24 | Compliance |
| Label | Domain · preview |
| Body | Pre-reviews documents and marketing, so reviewers start from flagged and explained passages. |
| Heading 2 · 24 | Judge |
| Label | Domain · preview |
| Body | Scores other models' answers against a rubric, so quality is measured the same way everywhere. |
| Heading 2 · 24 | Cybersecurity |
| Label | Domain · preview |
| Body | Reads alerts and logs with the Enterprise's own context. |
| Heading 2 · 24 | Knowledge |
| Label | Core |
| Body | Answers from the Enterprise's own documents, with the sources shown. |
| Heading 2 · 24 | Servicing |
| Label | TLM1 · Core |
| Body | Turns client calls into text and helps teams act on what was asked. |

### 6 · Agents, in the order they ship

| Style | Copy |
| --- | --- |
| Label | What runs on TLM |
| Heading 1 · 48 | Agents, in the order they ship |
| Body | Each one is a packaged pattern a team can adopt from the agent library in the ThinkLatent Portal. Agents propose; people decide. |
| Button | Open the agent library ↗ → this page,  section |
| Label | 01 |
| Heading 2 · 26 | Knowledge agent |
| Body | Answers from the Enterprise's own documents, with the sources shown. |
| Label | \[Status\] |
| Link | Open in the portal ↗ |
| Label | 02 |
| Heading 2 · 26 | After-call agent |
| Body | Drafts the call summary and the notes for the advisor to check and send. |
| Label | \[Status\] |
| Link | Open in the portal ↗ |
| Label | 03 |
| Heading 2 · 26 | Marketing pre-review |
| Body | Flags, explains and suggests a rewrite before compliance review. |
| Label | \[Status\] |
| Link | Open in the portal ↗ |
| Label | 04 |
| Heading 2 · 26 | Task mining |
| Body | Finds the tasks a team repeats most, to choose what a model learns next. |
| Label | \[Status\] |
| Link | Open in the portal ↗ |
| Builder note | *Order from the agent library (TL-012, TL-003): the knowledge agent ships first; the other three are wave 1. Status words stay in brackets until each one is live.* |

### 7 · Each generation, in outcomes

| Style | Copy |
| --- | --- |
| Label | Generations |
| Heading 1 · 48 | Each generation, in outcomes |
| Body | What each one made possible. Techniques live in the engineering series and the portal. |
| Bullet | TLM1 · in use Before LLMs An Enterprise BERT and the speech model that processes the Enterprise's phone calls. |
| Bullet | TLM2 Built in-house A 108B sparse mixture-of-experts model, the Enterprise's own. |
| Bullet | TLM3 Smaller and faster TLM2 pruned and distilled to 20 to 30B for lower cost and latency. |
| Bullet | TLM4 · current Core, Distil, Domain Base moved to Gemma; Core 27B and 7B on curated Enterprise data; the tier that drives adoption today. |
| Bullet | TLM5 · next Sees where things are heading A text-only large world model that learns from observation and predicts where an interaction is going, and can guide a frontier model from the Enterprise's past interactions. |

### 8 · One place to find, try, train and run ThinkLatent's models

| Style | Copy |
| --- | --- |
| Label | ThinkLatent Portal |
| Heading 1 · 48 | One place to find, try, train and run ThinkLatent's models |
| Body | The site tells the story; the portal is where the work happens. Intake requests from this site hand off to the portal when its intake ships. |
| Label | ThinkLatent Portal |
| Label | In build |
| Heading 3 · 22 | The catalogue, the use-case record and the playground |
| Small | Self-serve from first test to production: evaluate a use case, choose a model, train, deploy, run and watch it in one place, through five stages: Set up, Try, Build, Pilot, Production. Retail Advice goes first. |
| Label | Relay SDK · in production |
| Heading 3 · 22 | The way developers reach TLM |
| Small | Python and Node.js packages that follow the OpenAI client patterns your team already knows, exposing every hosted TLM endpoint. |
| Label | AI Gateway and HyperPod · in production |
| Heading 3 · 22 | Serving at enterprise grade |
| Small | Dedicated endpoints per use case, multi-tenant memory, request telemetry kept as each approval requires, trained and served on HyperPod. |
| Label | Compression pipeline · in production |
| Heading 3 · 22 | Pruning, distillation, quantization |
| Small | How a 108B model becomes a 27B one, and a 27B becomes a 7B that runs in FP8, without losing what matters. |
| Label | Self-healing · built |
| Heading 3 · 22 | A model that closes its own gaps |
| Small | Finds a model's domain and skill gaps and generates or locates the data to close them; fed by the index's datasets. |
| Label | Bring us a problem |
| Heading 3 · 22 | Not sure which model fits? |
| Small | Tell us the problem in your words. We say which tier, how long, and what it costs, within a week. |

### 9 · Three lines on the TL Index

| Style | Copy |
| --- | --- |
| Label | TL Index · summary |
| Small | as of \[DATE\] · run \[N\] |
| Number · 104 | \[NN\]% ± \[N\] pts |
| Small | Sufficiency of TLM4 Core on the Enterprise's skills, against a threshold of \[N\]%. The number comes from the index; this page never computes one. |
| Label | vs last release |
| Body | +\[N\] pts |
| Label | vs frontier baseline |
| Body | \[N\] |
| Label | Skills measured |
| Body | 9 |
| Button | Open the index ↗ → this page,  section |
| Label | What the index measures, and why |
| Heading 1 · 48 | Three lines on the TL Index |
| Lead · 20 | It scores models, ours and others, on the skills the Enterprise needs: financial data, customer-care language, compliance, cybersecurity, safety, entity recognition, judging, coding and agent skills, plus a Real Enterprise category built from every use case's own score. |
| Lead · 20 | Every ThinkLatent release is measured against the last one, in the same way, and the worse results are shown too. |
| Lead · 20 | A number without its method is not a number; the index publishes its method, its data and a plain-language explainer with each run. |
| Label | How we build responsibly |
| Heading 3 · 22 | How a score becomes a decision |
| Small | The index is ThinkLatent's own evaluation, step three of six; approval and validation stay with the Enterprise's model risk management. |
| Text | See the steps |

### 10 · Use AI at the Enterprise

| Style | Copy |
| --- | --- |
| Label | Use AI at the Enterprise |
| Heading 2 · 24 | The things ThinkLatent links to, and does not copy |
| Small | Policy, the approved tools and firm-wide training belong to the Enterprise's AI governance owner. The playground and the full model cards live in the ThinkLatent Portal; the scores live in the TL Index. |
| Label | Governance owner |
| Link title | Approved AI tools ↗ |
| Small | The list every team should check first. |
| Label | Governance owner |
| Link title | AI training paths ↗ |
| Small | Firm-wide literacy, by role. |
| Label | ThinkLatent Portal |
| Link title | Playground and model cards ↗ |
| Small | Try a model; read its full card. |
| Label | The TL Index |
| Link title | TL Index ↗ |
| Small | How models score on the Enterprise's skills. |

### 11 · Releases · News filtered by Category = Release

| Style | Copy |
| --- | --- |
| Label | Releases · News filtered by Category = Release |
| Button | Release-day playbook → the Write for ThinkLatent page, templates section |
| Web part | News web part, Category = Release, the newest three. |

### 12 · Which part of your work should the model learn next? · background Canopy

| Style | Copy |
| --- | --- |
| Heading 1 · 60 | Which part of your work should the model learn next? |
| Lead · 20 | Tell us in your words. Every use case makes the next one easier. |
| Button (red) | Start a use case → the Bring us a problem form |

### 13 · Page owners and review

| Style | Copy |
| --- | --- |
| Page property | Page owners: \[Site editor, TPM\] · Head of AI Products |
| Page property | Review by: \[DATE + 1 quarter\] |
| Page property | Last reviewed: \[DATE\] |

## How we build responsibly

Title area: Plain, title "How we build responsibly". Comments on. Goes live only after the real Risk review of its wording (company version).

### 1 · How ThinkLatent builds, alongside the Enterprise's model… · background Meadow

| Style | Copy |
| --- | --- |
| Label | How we build responsibly |
| Heading 1 · 72 | How ThinkLatent builds, alongside the Enterprise's model risk management. |
| Lead · 21 | ThinkLatent's delivery process supports, and does not replace, the Enterprise's model risk management. These are the steps ThinkLatent takes before and after a model is used in a business process, and who is responsible for each. Approval and validation sit with Risk and the model inventory; we link to them rather than restate them. |
| Small | On this page: |
| Link | The steps → this page, lifecycle section |
| Link | Six questions → this page, questions section |
| Link | What we show and what we don't → this page, show section |
| Link | Status by product → this page, status section |
| Link | Policy and who owns it → this page, policy section |
| Link | Ask a governance question → this page, ask section |
| Text | Hosted inside the Enterprise |
| Text | No calls out to outside AI services \[to confirm\] |
| Text | Requests logged as each approval requires |
| Text | Approval by model risk management |
| Text | Break-glass access logged \[to confirm\] |
| Text | Cost shown per use case |

### 2 · Six steps, and who is responsible

| Style | Copy |
| --- | --- |
| Label | The steps |
| Heading 1 · 48 | Six steps, and who is responsible |
| Body | A use case that does not meet a step does not proceed. A model in use that falls below its agreed bar is escalated under the Enterprise's model risk management, which may restrict or suspend its use. |
| Bullet | Step 01 Intake A team brings the problem through the form or the portal. ThinkLatent records the business purpose, the data involved, who the model will affect and what it must not do, and the model is registered in the Enterprise's model inventory. Responsible: the ThinkLatent product lead with the partner team's owner You see: the request, its owner and its stage |
| Bullet | Step 02 Risk classification Every use case is referred to Risk for classification before training starts. Risk decides the class and the validation required. Responsible: the product lead refers; Risk decides the class You see: the class Risk set and its conditions |
| Bullet | Step 03 Developer evaluation The model is scored on the TL Index for the skills the use case needs, against the last release and a reference baseline, with weaker results shown too. This is ThinkLatent's own evaluation, not model validation. Responsible: the index lead You see: the result, its interval and the run, labelled developer evaluation |
| Bullet | Step 04 Independent validation Validation under the Enterprise's model risk management, as Risk requires for the use case. ThinkLatent supplies the evidence. Responsible: Risk; ThinkLatent does not sign You see: the inventory record, linked |
| Bullet | Step 05 Human review Reviewers from the partner team check outputs at the level and frequency the approval sets out. Agents propose; people decide. Responsible: the partner team's reviewers You see: the review's findings and what changed |
| Bullet | Step 06 Monitoring Calls through the ThinkLatent gateway are logged as the approval requires; drift, refusals and escalations are watched. A use case below its agreed bar is reported to Risk through the model risk issue process. Responsible: AI Products with the use case's owner; periodic revalidation by Risk You see: the stage on the use case record |

### 3 · Where your data goes, and who decides

| Style | Copy |
| --- | --- |
| Label | Six questions teams ask first |
| Heading 1 · 48 | Where your data goes, and who decides |
| Heading 2 · 26 | Where does my data live? |
| Body | Inside the Enterprise, on ThinkLatent's own serving, reached through the AI Gateway. \[Locations and retention, to confirm with IT security.\] |
| Heading 2 · 26 | Who can see it? |
| Body | Members of your use case and the ThinkLatent engineers who run the service, under the access your approval sets. \[Roles, to confirm with governance.\] |
| Heading 2 · 26 | How is a model approved? |
| Body | By the Enterprise's model risk management, after ThinkLatent's own evaluation on the TL Index. ThinkLatent does not approve its own models. |
| Heading 2 · 26 | What is logged? |
| Body | Requests and responses, as each use case's approval requires, so an answer can be traced back. \[Retention, to confirm.\] |
| Heading 2 · 26 | What is break-glass? |
| Body | Emergency access for a named person when production must be fixed fast: time-limited, approved and logged. \[Duration and approver, pending Risk.\] |
| Heading 2 · 26 | What does it cost? |
| Body | Each use case sees its own spend in the ThinkLatent Portal, beside the cost avoided against an outside model. \[Charging model, to confirm.\] |

### 4 · The control, every time

| Style | Copy |
| --- | --- |
| Label | What we show |
| Heading 1 · 30 | The control, every time |
| Bullet | Each product's ThinkLatent process stage, with an as-of date |
| Bullet | Developer evaluation results for registered models, with interval and run, labelled on every chart |
| Bullet | What each model must not do, in plain words |
| Bullet | For approved models only, the limits and use conditions stated in the approval |
| Bullet | Who to ask, by name, for every product |
| Label | What we don't |
| Heading 1 · 30 | The code, the data, the architecture |
| Bullet | How a model is built: that belongs in the engineering series and the portal, for the people who build |
| Bullet | Training data details |
| Bullet | Client names |
| Bullet | Approval and validation status: the model inventory holds it, linked below |
| Bullet | Limits of models still in validation, which stay with their sponsors and Risk |
| Bullet | Policy text: it is the Enterprise's, and it is linked below |

### 5 · ThinkLatent process stage, as of \[DATE\]

| Style | Copy |
| --- | --- |
| Label | Status by product |
| Heading 1 · 48 | ThinkLatent process stage, as of \[DATE\] |
| Body | The Enterprise's model inventory is authoritative for approval and validation. ThinkLatent reconciles this list against it before each update and at least monthly; any difference is unpublished within one working day and corrected. stage as a glyph and a word, never a colour alone. |
| Web part | List web part: |
| Web part | List web part on the Process stage list (Stage formatted with stage-column-format.json). Seed rows are in process-stage.csv: TLM4 Core, TLM4 Distil, TLM4 Domain · Advice, TLM5. |

### 6 · The Enterprise owns the policy, approval and validation.

| Style | Copy |
| --- | --- |
| Label | Policy and who owns it |
| Heading 1 · 48 | The Enterprise owns the policy, approval and validation. |
| Lead · 20 | Model risk, data use and the approved-tools list are the Enterprise's, set by the AI governance owner and Risk. These steps are how ThinkLatent works within them, and they change when they do. |
| Label | Governance owner |
| Heading 3 · 22 | The Enterprise's AI policy ↗ |
| Small | The rules every AI use at the Enterprise follows. |
| Label | Risk |
| Heading 3 · 22 | Model risk management ↗ |
| Small | How models are classed, validated and reviewed. |
| Label | Risk |
| Heading 3 · 22 | The model inventory ↗ |
| Small | The record of every model's approval and validation. |
| Label | Governance owner |
| Heading 3 · 22 | Approved AI tools and training ↗ |
| Small | What every team may use today, and how to learn it. |

### 7 · Pinned for anyone who asks

| Style | Copy |
| --- | --- |
| Label | The two hard questions, explained |
| Heading 1 · 48 | Pinned for anyone who asks |
| Web part | News web part with two posts pinned, both Deep dive: "Where your request goes when you call TLM" (from your application to the gateway, the model and back, and what is kept on the way) and "Who runs the model behind the API" (the engineers behind every endpoint: serving, monitoring, on-call and change control). |

### 8 · Microsoft Forms web part

| Style | Copy |
| --- | --- |
| Web part | Microsoft Forms web part |
| Heading 2 · 26 | Ask a governance question |
| Small | Routed to the product's owner. Questions for Risk are passed to Risk under Risk's own process. |
| Bullet | Your team |
| Bullet | The product or use case |
| Bullet | The question, in your words |
| Bullet | Whether it blocks something today |
| Link | Open the form → this page, ask section |
| Label | Page owners |
| Heading 2 · 24 | Owners, review and corrections |
| Small | Owned by the Head of AI Products with \[Risk co-owner role\]. Wording reviewed by the Enterprise's model risk management on \[DATE\]. This review is not approval or validation of any model. |
| Small | Corrections: anything restated is dated here, with what changed. Last correction: \[none yet\] |

### 9 · Which part of your work should the model learn next? · background Canopy

| Style | Copy |
| --- | --- |
| Heading 1 · 60 | Which part of your work should the model learn next? |
| Lead · 20 | Tell us in your words. Every use case makes the next one easier. |
| Button (red) | Start a use case → the Bring us a problem form |

### 10 · Page owners and review

| Style | Copy |
| --- | --- |
| Page property | Page owners: Head of AI Products · \[Risk co-owner role\] |
| Page property | Review by: \[DATE + 1 quarter\] |
| Page property | Last reviewed: \[DATE\] |

## Team

Title area: Plain, title "Team". Comments on.

### 1 · One team, three functions, one way of working with AI. · background Meadow

| Style | Copy |
| --- | --- |
| Label | Team |
| Heading 1 · 72 | One team, three functions, one way of working with AI. |
| Lead · 21 | Research proves the method, Applied Research makes it the Enterprise's, AI Products puts it in production. Three locations, one mandate. |
| Number · 72 | 45 |
| Small | people |
| Number · 72 | 3 |
| Small | functions |
| Number · 72 | 3 |
| Small | countries |

### 2 · From a paper to a solution in people's hands

| Style | Copy |
| --- | --- |
| Label | Our three functions |
| Heading 1 · 48 | From a paper to a solution in people's hands |
| Body | Each function has a mission line, a head, and an output count the editors update every quarter: posts, releases, papers and wins. |
| Label | Research |
| Small | \[N\] outputs this quarter |
| Heading 2 · 26 | The engine |
| Body | Prove the method before anyone builds on it. |
| Body | Three themes: autonomous AI, trustworthy AI and cybersecurity. Publishes, and runs the university lab. Never uses vendor data. |
| Text | \[Name\] |
| Small | Head of Research |
| Label | Applied Research |
| Small | \[N\] outputs this quarter |
| Heading 2 · 26 | The heartbeat |
| Body | Make the method the Enterprise's. |
| Body | Proves the methods on the Enterprise's own data and builds TLM: the Core, Distil and Domain models that carry the Enterprise's knowledge, and the generation after them. |
| Text | \[Name\] |
| Small | Head of Applied Research |
| Label | AI Products |
| Small | \[N\] outputs this quarter |
| Heading 2 · 26 | Production, at enterprise grade |
| Body | Put it in people's hands, and keep it there. |
| Body | Owns the ThinkLatent Portal, the gateway, Relay and the infrastructure behind them; the standards; How we build responsibly; and every push to production. |
| Text | \[Name\] |
| Small | Head of AI Products |

### 3 · Profiles that stay current

| Style | Copy |
| --- | --- |
| Label | People |
| Heading 1 · 48 | Profiles that stay current |
| Body | At launch: the Head of ThinkLatent, the three heads and the principal scientists. Each profile lists the person's posts and publications automatically, so it never goes stale. |
| Web part | Everyone else is in the People web part below, and gets a profile when they publish. |
| Web part | People web part, heads first: Jithin Pradeep (Head of ThinkLatent · Director, the university lab · since \[YEAR\]); \[Name\], Head of Research; \[Name\], Head of Applied Research; \[Name\], Head of AI Products; \[Name\], Principal AI/ML Scientist (Advancing SLMs, Causal AI); \[Name\], Principal AI/ML Scientist (Responsible AI, Cognitive AI). Under it, Highlighted content filtered by author lists each person's posts and publications. |
| Web part | People web part, compact layout: everyone in ThinkLatent, searchable by name, function and location. |

### 4 · Three locations, one team

| Style | Copy |
| --- | --- |
| Label | Where we are |
| Heading 1 · 48 | Three locations, one team |
| Label | United States |
| Heading 2 · 24 | \[N\] people |
| Small | The Head of ThinkLatent, AI Products, Applied Research |
| Label | Canada |
| Heading 2 · 24 | \[N\] people |
| Small | Research and the university lab; the advocates who carry ThinkLatent's news into the office |
| Label | \[City\], India |
| Heading 2 · 24 | \[N\] people |
| Small | \[Functions\]; the advocates who carry ThinkLatent's news into the office |

### 5 · An AI-augmented team, in the open

| Style | Copy |
| --- | --- |
| Label | How we work with AI |
| Heading 1 · 48 | An AI-augmented team, in the open |
| Body | The principles we hold each other to, and three numbers that show it is real. Updated monthly; any Enterprise team is welcome to copy it. |
| Button | Join a "how we work" session → AI Perspectives page |
| Number · 40 | 01 |
| Heading 3 · 21 | Draft with AI, decide as people |
| Small | \[One line on what this means day to day\] |
| Number · 40 | 02 |
| Heading 3 · 21 | Show the gain before the build |
| Small | \[One line\] |
| Number · 40 | 03 |
| Heading 3 · 21 | Ship small, show often |
| Small | \[One line\] |
| Number · 40 | 04 |
| Heading 3 · 21 | Write it down once |
| Small | \[One line\] |
| Number · 40 | 05 |
| Heading 3 · 21 | Measure how we work |
| Small | \[One line\] |
| Number · 96 | \[N\] hrs |
| Body | saved per person per week · \[SOURCE, DATE\] |
| Number · 96 | \[N\] days |
| Body | from draft to published page · \[SOURCE, DATE\] |
| Number · 96 | \[N\] % |
| Body | of pages drafted with AI, edited by a person · \[SOURCE, DATE\] |

### 6 · Six awards, every quarter

| Style | Copy |
| --- | --- |
| Label | ThinkLatent quarterly awards |
| Heading 1 · 48 | Six awards, every quarter |
| Body | Three map to how ThinkLatent is judged, three to the habits we want more of. Winners are featured on the Home page for the quarter and get a shout-out in the Viva Engage community. A category can go unawarded; it is never given to fill a slot. |
| Button | \[Q · YEAR\] winners → the Write for ThinkLatent page, templates section |
| Label | Scoreboard · cycle time |
| Heading 2 · 24 | Research to Production |
| Small | Took a method from a write-up to people's hands fastest, without cutting corners. |
| Small | Evidence: weeks from Research write-up to production, from Jira |
| Label | Scoreboard · in people's hands |
| Heading 2 · 24 | In People's Hands |
| Small | Shipped a solution that changed how a partner team works. |
| Small | Evidence: the partner's number and their words |
| Label | Scoreboard · AI-native workforce |
| Heading 2 · 24 | AI-Native |
| Small | Showed how work changes when AI is a teammate, and taught others to do it. |
| Small | Evidence: time saved, or people taught |
| Label | Habit · telling the story |
| Heading 2 · 24 | Storyteller |
| Small | Made ThinkLatent's work understood outside ThinkLatent: a post, a session, a talk to a business team. |
| Small | Evidence: what was published, and who it reached |
| Label | Habit · research that travels |
| Heading 2 · 24 | Published |
| Small | A paper, talk or patent that put ThinkLatent's research in front of the field. |
| Small | Evidence: the venue, and the Publications row |
| Label | Habit · enterprise grade |
| Heading 2 · 24 | Production Grade |
| Small | Kept what we run steady, safe and fast, often where nobody sees it. |
| Small | Evidence: uptime, incidents avoided, time to recover |
| Label | Recognition |
| Heading 2 · 26 | Shout-outs monthly, awards quarterly, nominations in the Enterprise's portal |
| Small | Every nomination goes through the Enterprise's recognition portal. ThinkLatent leadership reviews the quarter's nominations in its quarterly meeting, picks the ThinkLatent award winners, posts them here and features them on Home. ThinkLatent Day hackathon winners join the same quarter's list. |
| Body | Nominations close \[DATE\] |
| Body | ThinkLatent awards announced · town hall \[DATE\] |
| Body | Recognition points · how we use them \[Rule\] |
| Button (red) | Open \[Enterprise recognition portal\] ↗ → this page,  section |

### 7 · Work in ThinkLatent

| Style | Copy |
| --- | --- |
| Label | After launch |
| Heading 2 · 26 | Work in ThinkLatent |
| Small | Open internal roles and rotations, linked from here once they exist. MScAC interns are listed under the university lab on the Research page. |
| Small | Placeholder: links to internal mobility; nothing is posted here before launch. |

### 8 · Which part of your work should the model learn next? · background Canopy

| Style | Copy |
| --- | --- |
| Heading 1 · 60 | Which part of your work should the model learn next? |
| Lead · 20 | Tell us in your words. Every use case makes the next one easier. |
| Button (red) | Start a use case → the Bring us a problem form |

## Wins

Title area: Plain, title "Wins". Comments on.

### 1 · What the Enterprise can do now. · background Meadow

| Style | Copy |
| --- | --- |
| Label | Our work · Wins |
| Heading 1 · 72 | What the Enterprise can do now. |
| Lead · 21 | Every win is a research-to-production story with one before-and-after number, its source and date, the partner's own words, and the line that matters most: what it made possible next. Three generations of TLM are in use today. |
| Button | Wins → Wins page |
| Button | Research → Research page |
| Button | Publications → Publications page |
| Label | Featured · \[Partner team\] |
| Heading 1 · 40 | \[Partner team\] now \[does what\] in \[time\] instead of \[time\]. |
| Body | \[One line: the problem, in their words.\] |
| Body | What compounded: this made \[the next use case\] possible for \[team\]. |
| Text | Read the story |
| Number · 128 | \[N\] \[unit\] |
| Small | before: \[N\] · after: \[N\] · \[What the number measures\] · \[SOURCE\], \[DATE\] |
| Small | Carried by TLM4 Core |

### 2 · List web part

| Style | Copy |
| --- | --- |
| Web part | List web part · filter and sort: |
| Button | All → this page,  section |
| Button | 2026 → this page,  section |
| Button | 2025 → this page,  section |
| Button | By business unit → this page,  section |
| Button | By product → this page,  section |
| Button | Gallery · List → this page,  section |
| Web part | List web part on the Wins list, gallery layout, with the filter buttons above. Each card shows the partner team, what they can do now, the number and unit, what it measures with its date and tier, the approved quote with name and role, and what compounded. |

### 3 · Every engagement gets a post

| Style | Copy |
| --- | --- |
| Label | New partners |
| Heading 1 · 48 | Every engagement gets a post |
| Body | When a business unit or an IT engagement starts with ThinkLatent, a short post says who, the problem in their words, what starts first and the first milestone. The win comes later; the start is news too. |
| Button | The new-partner template → the Write for ThinkLatent page, templates section |
| Web part | News web part, Category = Partner, the newest three. |

### 4 · What partner teams say

| Style | Copy |
| --- | --- |
| Label | In their words |
| Heading 1 · 48 | What partner teams say |
| Body | One quote per win, approved in writing; one of them rotates on the Home page each month. No logo walls. |
| Lead · 22 | "\[What the partner says, in their words, approved in writing.\]" |
| Caption | \[Name\] \[Role\], \[partner team\] |
| Lead · 22 | "\[Quote.\]" |
| Caption | \[Name\] \[Role\], \[partner team\] |
| Lead · 22 | "\[Quote.\]" |
| Caption | \[Name\] \[Role\], \[partner team\] |

### 5 · Have a problem that looks like one of these? · background Canopy

| Style | Copy |
| --- | --- |
| Label | Bring us a problem |
| Heading 1 · 56 | Have a problem that looks like one of these? |
| Body | Tell us in your words. \[Named owner\] reads every request and comes back within a week with whether ThinkLatent can help, how, and how soon. When the ThinkLatent Portal's intake ships, your request moves there and you can follow its status. |
| Web part | Microsoft Forms web part |
| Heading 2 · 26 | Bring us a problem |
| Small | A named owner; a reply within a week. |
| Bullet | Your team |
| Bullet | The problem: what takes too long, costs too much, or cannot be done today |
| Bullet | Who we should talk to |
| Bullet | How urgent it is |
| Link | Open the form → this page, talk section |

## Research

Title area: Plain, title "Research". Comments on.

### 1 · We prove the method before anyone builds on it. · background Meadow

| Style | Copy |
| --- | --- |
| Label | Our work · Research |
| Heading 1 · 72 | We prove the method before anyone builds on it. |
| Lead · 21 | Three research themes, each tied to what it means for the Enterprise, and a joint lab with the university's Department of Computer Science. Research here never touches vendor data. |
| Button | Wins → Wins page |
| Button | Research → Research page |
| Button | Publications → Publications page |

### 2 · Building and improving language models

| Style | Copy |
| --- | --- |
| Label | Autonomous AI |
| Heading 1 · 28 | Building and improving language models |
| Body | The methods behind TLM: how models are developed, pruned, distilled, self-healed and trained on the Enterprise's data; and when a small model is enough. Includes SLM feasibility, telling a team from its data whether a small model will work before anyone trains it. |
| Body | What it means for the Enterprise Models that know the Enterprise's work, at a fraction of frontier cost, and an answer on feasibility before the budget is spent. |
| Label | Trustworthy AI |
| Heading 1 · 28 | Testing AI the way an adversary would, and earning trust |
| Body | Red-teaming methods and guardrails on the offensive side, including M-cube, a published red-teaming method. On the other side, what makes people trust an AI's help with a decision, how emotion shapes that decision, and how an AI should respond. |
| Body | What it means for the Enterprise AI that holds up under attack and under scrutiny, in a firm where trust is the product. |
| Label | Cybersecurity |
| Heading 1 · 28 | AI that defends, and resists other AI |
| Body | Models and techniques that make infrastructure more robust against attacks, including attacks run by other AIs. Built on TLM Core, reuse evaluated before anything new is trained. |
| Body | What it means for the Enterprise Defences that learn as fast as the attacks do. |

### 3 · The university lab · background Lagoon

| Style | Copy |
| --- | --- |
| Label | Partnership |
| Heading 1 · 44 | The university lab |
| Body | A joint initiative with the university's Department of Computer Science, announced in May 2025, on top of a decade of MScAC student projects. Faculty, post-doctoral fellows and students working with ThinkLatent's Canada-based researchers on co-authored papers, seminars and recruitment. This page carries what the lab's own site does not yet: the joint outputs, the interns and the partner stories. |
| Button | The lab's own site ↗ → \[address to come\] |
| Label | Advancing SLMs |
| Heading 3 · 20 | Aligning LM Pretraining Data with Downstream Uses |
| Small | Curating and reformatting pretraining data so smaller models can outperform larger ones and hallucinate less. |
| Small | Faculty lead: \[Name\] · the Enterprise: a principal scientist, the Head of Research |
| Label | Causal AI |
| Heading 3 · 20 | Cause-Effect Inference for Task-Oriented AI Training |
| Small | Causal inference in unstructured text, such as how the words in an earnings call relate to market behaviour. |
| Small | Faculty lead: \[Name\] · the Enterprise: a principal scientist, the Head of Research |
| Label | Responsible AI |
| Heading 3 · 20 | Safeguarding Compliant Responses |
| Small | Context-aware safeguards for conversational AI in high-stakes settings: policies turned into constraints, fewer hallucinations. |
| Small | Faculty lead: \[Name\] · the Enterprise: a principal scientist, the Head of Research |
| Label | Cognitive AI |
| Heading 3 · 20 | Emotion-Aware Conversational Adaptation |
| Small | Responses that adapt to a person's emotional cues to be clearer and more empathetic, without diagnosing or labelling anyone. |
| Small | Faculty lead: \[Name\] · the Enterprise: a principal scientist, the Head of Research |
| Lead · 24 | "\[Two sentences from the Head of ThinkLatent on why the lab exists and what the Enterprise gets from it.\]" |
| Caption | Jithin Pradeep Head of ThinkLatent · Director, the university lab |
| Label | Joint outputs · from the Publications list |
| Text | \[Paper title\] |
| Small | \[Venue\] · \[Year\] |
| Text | \[Paper title\] |
| Small | under review |
| Text | \[Talk at ARIA 2025\] |
| Small | 2025 |
| Link | All joint work, filtered the university → Publications page |
| Label | MScAC interns |
| Heading 3 · 20 | A decade of applied projects |
| Small | Master of Science in Applied Computing students work eight months on a ThinkLatent problem, with a faculty supervisor and a ThinkLatent lead. \[N\] this year; \[N\] since the program began. |
| Label | Events |
| Text | ARIA research showcase |
| Small | November 2026 |
| Text | Lab day · Canada |
| Small | \[DATE\] |
| Text | Enterprise AI Summit · lab track |
| Small | \[DATE\] |
| Small | Recent: ARIA 2025 · Enterprise AI Summit, Oct 2025 · Lab off-site at the university, Oct 2025 |
| Label | Director, the Enterprise |
| Body | Jithin Pradeep |
| Label | Directors, the university |
| Body | \[Name\] · \[Name\] · \[Name\] · \[Name\] |
| Label | Partner stories |
| Body | \[A faculty lead on the collaboration\] · \[An intern's project, in outcomes\] |
| Label | Later |
| Body | Lab tours with the university · recorded seminars |

### 4 · Research that already shapes our work

| Style | Copy |
| --- | --- |
| Label | Methods in use |
| Heading 1 · 48 | Research that already shapes our work |
| Label | Published |
| Heading 2 · 24 | M-cube |
| Small | A red-teaming method from Research. \[One line on what it lets us do, and the venue.\] |
| Small | Explained for a product manager |
| Label | Built |
| Heading 2 · 24 | Self-healing models |
| Small | Finds a model's domain and skill gaps, then generates or locates the data to close them. Every TLM4 Core model is self-healed before it ships. |
| Small | How it works |
| Label | In use |
| Heading 2 · 24 | SLM feasibility, before training |
| Small | A team brings its data; we say whether a small model will work, and what is missing if not, before any training starts. |
| Small | Bring your data |
| Label | In the lab |
| Heading 2 · 24 | Decision models |
| Small | A fast yes-or-no, classification and extraction model on TLM Core, with a confidence score, for agents that must decide in milliseconds. |
| Small | On the roadmap |

### 5 · Which part of your work should the model learn next? · background Canopy

| Style | Copy |
| --- | --- |
| Heading 1 · 60 | Which part of your work should the model learn next? |
| Lead · 20 | Tell us in your words. Every use case makes the next one easier. |
| Button (red) | Start a use case → the Bring us a problem form |

## Publications

Title area: Plain, title "Publications". Comments on.

### 1 · Everything we have published, presented or been written about. · background Meadow

| Style | Copy |
| --- | --- |
| Label | Our work · Publications and press |
| Heading 1 · 64 | Everything we have published, presented or been written about. |
| Button | Wins → Wins page |
| Button | Research → Research page |
| Button | Publications → Publications page |
| Button (red) | Add a publication → the Write for ThinkLatent page, templates section |

### 2 · List web part

| Style | Copy |
| --- | --- |
| Web part | List web part · filters: |
| Button | All → this page,  section |
| Button | Papers → this page,  section |
| Button | Talks → this page,  section |
| Button | Patents → this page,  section |
| Button | Internal memos → this page,  section |
| Button | In the news → this page, press section |
| Button | 2026 → this page,  section |
| Button | 2025 → this page,  section |
| Button | Autonomous AI → this page,  section |
| Button | Trustworthy AI → this page,  section |
| Button | Cybersecurity → this page,  section |
| Button | the university → this page,  section |
| Button | In production → this page,  section |

### 3 · List web part on the Publications list

| Style | Copy |
| --- | --- |
| Web part | List web part on the Publications list: Type, Title and authors, Venue, Status, Year, with filters for type, year, theme, the university and status. Seed rows are in publications.csv. |

### 4 · ThinkLatent at \[conference\]

| Style | Copy |
| --- | --- |
| Label | Conference roundups |
| Heading 1 · 48 | ThinkLatent at \[conference\] |
| Body | One post per conference ThinkLatent attends: who went, the talks and papers, three things we bring back, and who to ask about each. |
| Button | The roundup template → the Write for ThinkLatent page, templates section |
| Web part | News web part, Category = Roundup. First posts to write: ThinkLatent at Ai4 2026; ThinkLatent at ARIA 2025; ThinkLatent at \[conference\]. |

### 5 · Where ThinkLatent has been written about

| Style | Copy |
| --- | --- |
| Label | In the news |
| Heading 1 · 48 | Where ThinkLatent has been written about |
| Label | BetaKit · 29 May 2025 |
| Heading 3 · 21 | The university and the Enterprise team up to expand AI research in finance |
| Small | The partnership announced; several CS labs working with ThinkLatent's Canada-based researchers. |
| Label | CTV News · May 2025 |
| Heading 3 · 21 | The Enterprise, the university launch AI partnership that will create several research labs |
| Small | National coverage of the announcement. |
| Label | BNN Bloomberg · 29 May 2025 |
| Heading 3 · 21 | The Enterprise, the university launch AI partnership |
| Small | Business coverage of the research labs. |
| Label | Finextra · May 2025 |
| Heading 3 · 21 | The Enterprise and the university create AI research labs |
| Small | Fintech trade coverage. |
| Label | FStech · May 2025 |
| Heading 3 · 21 | The Enterprise and the university ink AI research partnership |
| Small | UK financial-services technology coverage. |
| Label | Enterprise Canada · 28 May 2025 |
| Heading 3 · 21 | The press release |
| Small | The Enterprise's own announcement of the partnership. |
| Label | The intranet · \[DATE\] |
| Heading 3 · 21 | \[First ThinkLatent success story on the intranet\] |
| Small | \[One line\] |
| Label | The external blog · \[DATE\] |
| Heading 3 · 21 | \[Headline\] |
| Small | \[One line\] |
| Small | We link to coverage rather than copying it. Anything external has passed Comms; the approval reference is kept with each row. |

### 6 · Which part of your work should the model learn next? · background Canopy

| Style | Copy |
| --- | --- |
| Heading 1 · 60 | Which part of your work should the model learn next? |
| Lead · 20 | Tell us in your words. Every use case makes the next one easier. |
| Button (red) | Start a use case → the Bring us a problem form |

## Blog

Title area: Plain, title "Blog". Comments on.

### 1 · What the team is thinking. · background Meadow

| Style | Copy |
| --- | --- |
| Label | Stories · Blog |
| Heading 1 · 64 | What the team is thinking. |
| Lead · 21 | Written by the people who build ThinkLatent, edited by two or three of them, published at most twice a month. Two kinds of post: a Perspective for business readers, a Deep dive for practitioners. |
| Button (red) | Write a post → Write for ThinkLatent page |

### 2 · Filter buttons

| Style | Copy |
| --- | --- |
| Button | All → this page,  section |
| Button | Perspective → this page,  section |
| Button | Deep dive → this page,  section |
| Button | Leadership series → this page, series section |
| Button | Papers explained → Publications page |
| Button | Wins → Wins page |
| Button | Releases → Products page, releases section |
| Button | Sessions → AI Perspectives page |
| Button | Conference roundups → Publications page, roundups section |
| Button | Year in review → this page, review section |
| Button | Newsletter archive → this page, archive section |

### 3 · Proprietary only counts if it fuels the business

| Style | Copy |
| --- | --- |
| Label | Featured |
| Label | Leadership series · No. \[N\] |
| Label | Perspective |
| Heading 1 · 40 | Proprietary only counts if it fuels the business |
| Body | \[Two-sentence summary: the problem in plain words and why it matters at the Enterprise.\] |
| Small | Jithin Pradeep, Head of ThinkLatent · \[DATE\] · 5 min read |

### 4 · News web part

| Style | Copy |
| --- | --- |
| Web part | News web part: the featured post first, then list layout, filtered by Category (Perspective, Deep dive). First posts to write: Can a small model beat a large one? What the university pretraining project means here; Self-healing: a model that finds its own gaps and closes them; \[Partner team\] now \[does what\] in \[time\]; Will an SLM work on your data? We can tell before training; TLM4: Core, Distil and Domain, in outcomes; M-cube: red teaming a model before an attacker does; Safeguarding compliant responses: policy as a constraint on a chatbot; From endpoint to use case in a week, with Relay. |

### 5 · ThinkLatent in 2026

| Style | Copy |
| --- | --- |
| Label | Year in review · every January |
| Heading 1 · 40 | ThinkLatent in 2026 |
| Body | One post a year, by function and by product, with the numbers that compounded. Published in January 2027, ahead of launch; the one page executives reliably read. |
| Text | ThinkLatent in 2026 |
| Small | January 2027 |
| Text | ThinkLatent in 2027 |
| Small | January 2028 |

### 6 · One leadership post a month, the four leaders in turn

| Style | Copy |
| --- | --- |
| Label | Leadership series |
| Heading 1 · 40 | One leadership post a month, the four leaders in turn |
| Label | Head of ThinkLatent |
| Heading 3 · 21 | \[Series name\] |
| Small | Why proprietary, how we are judged, the AI-native team |
| Small | Latest: No. \[N\] |
| Label | Head of Research |
| Heading 3 · 21 | \[Series name\] |
| Small | Research, explained for the people who use it |
| Small | Latest: No. \[N\] |
| Label | Head of Applied Research |
| Heading 3 · 21 | \[Series name\] |
| Small | How a method becomes a TLM model |
| Small | Latest: No. \[N\] |
| Label | Head of AI Products |
| Heading 3 · 21 | \[Series name\] |
| Small | Production, the portal, onboarding |
| Small | Latest: No. \[N\] |

### 7 · How the blog runs

| Style | Copy |
| --- | --- |
| Label | How the blog runs |
| Heading 2 · 26 | Researchers write. Three editors keep it moving. |
| Bullet | Written by the people who did the work; drafted with AI if they like, authored by them |
| Bullet | An editorial board of two or three, with one function head as advisor; review within five working days |
| Bullet | At most two posts a month, one leadership post (the four leaders in turn) and one from the team: fewer, better posts beat a feed |
| Bullet | Every post is a Perspective (outcomes, for business readers) or a Deep dive (technique allowed, for practitioners) |
| Bullet | Shared to the intranet and the Canada and India office news; the external blog later, through Comms |
| Bullet | Comments are on, moderated by the editors |
| Label | Newsletter archive · the monthly email |
| Text | \[MONTH YEAR\] · the TL;DR |
| Small | Read the email |
| Text | \[MONTH YEAR\] · the TL;DR |
| Small | Read the email |
| Text | \[MONTH YEAR\] · the TL;DR |
| Small | Read the email |
| Small | The newsletter stays an email; this is where past issues live. |

### 8 · Which part of your work should the model learn next? · background Canopy

| Style | Copy |
| --- | --- |
| Heading 1 · 60 | Which part of your work should the model learn next? |
| Lead · 20 | Tell us in your words. Every use case makes the next one easier. |
| Button (red) | Start a use case → the Bring us a problem form |

## AI Perspectives

Title area: Plain, title "AI Perspectives". Comments on. The hero sits on Lagoon, not Meadow.

### 1 · A paper, what it means at the Enterprise, and the… · background Lagoon

| Style | Copy |
| --- | --- |
| Label | Stories · AI Perspectives · a monthly seminar series |
| Heading 1 · 72 | A paper, what it means at the Enterprise, and the ThinkLatent solution that carries it. |
| Lead · 21 | Then you tell us what to build next. About 200 people come; every request is answered on the open roadmap within two weeks. Every session is recorded with captions, and the library doubles as onboarding. |
| Button (red) | Join the next session → this page, next section |
| Button | Ask for it on the roadmap → this page, ask section |
| Label | Last session |
| Small | \[DATE\] · \[N\] attended |
| Heading 2 · 24 | \[Session topic\]: what it means for the Enterprise |
| Small | Recording, the Enterprise slide and the \[N\] requests it raised. |
| Button | Watch the recording → the Write for ThinkLatent page, templates section |

### 2 · \[Session topic\]

| Style | Copy |
| --- | --- |
| Label | Next session |
| Small | \[DATE · TIME · Teams link\] |
| Heading 1 · 40 | \[Session topic\] |
| Body | Abstract. \[Three sentences: the paper or technology, what it means at the Enterprise, and the ThinkLatent solution that carries it.\] |
| Text | \[Host name\] |
| Small | \[Role\] · \[one line of bio: what they work on and why they picked this paper\] |
| Text | \[Guest, if any\] |
| Small | \[Business leader · role\] |
| Button (red) | Add to calendar → this page, next section |
| Button | The session template → the Write for ThinkLatent page, templates section |
| Bullet | 10 The paper or technology What it is, in plain words |
| Bullet | 5 What it means at the Enterprise The problem it solves here, and for whom |
| Bullet | 5 The ThinkLatent solution that carries it Which product, which TLM, and when |
| Bullet | 10 Your requests Ask for it on the roadmap, live |

### 3 · The next three, as text

| Style | Copy |
| --- | --- |
| Label | Schedule |
| Heading 1 · 48 | The next three, as text |
| Body | Dates, topics and hosts in a table anyone can search, never an image. |
| Web part | Events web part underneath for calendar invites. |
| Button | Propose a topic or host → this page, ask section |
| Table header | Date · Topic · Host · Guest · Format |
| Table row | \[DATE\] · \[Session topic\] \[one line\] · \[Name\] · \[Business leader\] · Seminar |
| Table row | \[DATE\] · \[Session topic\] \[one line\] · \[Name\] · — · Seminar |
| Table row | \[DATE\] · Demo edition · \[theme\] 8 to 12 minute talks, a live demo each, one Q&A at the end · \[Name\] · \[Business leader\] · Demo day · coming |

### 4 · Past sessions, with the Enterprise slide

| Style | Copy |
| --- | --- |
| Label | Recordings library |
| Heading 1 · 48 | Past sessions, with the Enterprise slide |
| Body | Every recording carries its requests and their answer dates. New joiners watch three of these in their first week. |
| Button | All recordings · Stream → this page,  section |
| Web part | Highlighted content (or the Stream web part) showing the recordings library, newest first. First posts to write: Aligning pretraining data with downstream uses: small models, done right; M-cube: red teaming a model before an attacker does; Decision models: a yes or no in under 50 milliseconds. |

### 5 · Microsoft Forms web part

| Style | Copy |
| --- | --- |
| Web part | Microsoft Forms web part |
| Heading 2 · 26 | Ask for it on the roadmap |
| Small | Every request gets an answer within two weeks, on the open roadmap. |
| Bullet | Your team |
| Bullet | The problem you want solved, in your words |
| Bullet | Which session sparked it |
| Bullet | How much it matters |
| Link | Open the form → this page, ask section |
| Web part | ThinkLatent community · Viva Engage web part |
| Heading 2 · 24 | Questions, wins and follow-ups |
| Button | Open the community → this page,  section |
| Body | \[Name\], \[Business team\] · 2 h |
| Body | Request from Thursday: can Distil handle the \[task\] queue? Answered on the roadmap, \[DATE\]. |
| Body | \[Name\], ThinkLatent · 1 d |
| Body | Recording and the Enterprise slide are up; every request has its answer date. |
| Body | \[Name\], \[Business team\] · 3 d |
| Body | Who is hosting the demo edition? I have a use case to show. |

### 6 · The demo edition

| Style | Copy |
| --- | --- |
| Label | Coming · quarterly, after launch |
| Heading 1 · 28 | The demo edition |
| Body | One session a quarter becomes a demo day: 8 to 12 minute talks, a live demo in each, one Q&A at the end, recorded, with a written recap. Expect a fifth to a third of those who sign up to come; one strong live use case converts more sceptics than any post. |
| Label | Coming · pilot, after launch |
| Heading 1 · 28 | ThinkLatent Perspectives, the podcast |
| Body | "ThinkLatent Perspectives: \[topic\] with \[business leader\]": twenty minutes, hosted by the team members who already podcast, piloted once two sessions are recorded. |
| Button | Suggest a guest → this page, ask section |

### 7 · Which part of your work should the model learn next? · background Canopy

| Style | Copy |
| --- | --- |
| Heading 1 · 60 | Which part of your work should the model learn next? |
| Lead · 20 | Tell us in your words. Every use case makes the next one easier. |
| Button (red) | Start a use case → the Bring us a problem form |

## ThinkLatent Day

Title area: Plain, title "ThinkLatent Day". Build it on the test site and publish it once the AI Summit date is set.

### 1 · Build on the Enterprise's own intelligence, in two days. · background Meadow

| Style | Copy |
| --- | --- |
| Label | Stories · ThinkLatent Day · yearly, alongside the Enterprise's AI Summit |
| Heading 1 · 72 | Build on the Enterprise's own intelligence, in two days. |
| Lead · 21 | A hackathon on ThinkLatent's products: business teams and ThinkLatent builders, together, on TLM, the ThinkLatent Portal and the TL Index. Demos on the second afternoon, judged by the Head of ThinkLatent and two business leaders. Winners join the quarter's ThinkLatent awards; the best idea enters the Idea Lab. |
| Button (red) | Sign up a team → this page, signup section |
| Button | ThinkLatent at the AI Summit → this page, summit section |
| Number · 72 | \[DD\] |
| Small | \[MONTH\] · next ThinkLatent Day |
| Number · 72 | 2 |
| Small | days |
| Number · 72 | \[N\] |
| Small | teams last year |

### 2 · Mixed teams, real problems, a working demo

| Style | Copy |
| --- | --- |
| Label | How it runs |
| Heading 1 · 48 | Mixed teams, real problems, a working demo |
| Body | One business partner with two or three ThinkLatent builders per team. The problem comes from the business side; the build runs on ThinkLatent's products; the demo shows what a team can do now. |
| Bullet | Before Bring a problem Business teams sign up with the problem in their words. ThinkLatent matches each with builders and a product: TLM Core or Distil, the portal, or the index. |
| Bullet | Day 1 Build Relay endpoints, the playground and a ThinkLatent coach per team. Office hours from Risk for anything client-facing. Nothing touches client data. |
| Bullet | Day 2 Demo Eight minutes a team, a live demo in each, one Q&A at the end. Judged by the Head of ThinkLatent and two business leaders on the gain, the number and whether it could ship. |
| Bullet | After Carry it on Winners join the quarter's ThinkLatent awards and are featured on Home. The best idea enters the Idea Lab as a Seed. Every demo is recorded and recapped. |

### 3 · This year's three

| Style | Copy |
| --- | --- |
| Label | Themes |
| Heading 1 · 48 | This year's three |
| Body | Problems ThinkLatent wants to see solved on its products. A team can bring its own instead. |
| Label | TLM |
| Heading 3 · 21 | \[Theme one\] |
| Small | \[One line on the problem and which tier fits\] |
| Label | ThinkLatent Portal |
| Heading 3 · 21 | \[Theme two\] |
| Small | \[One line\] |
| Label | The TL Index |
| Heading 3 · 21 | \[Theme three\] |
| Small | \[One line\] |
| Label | Judging · three questions |
| Text | What can the team do now that it could not before? |
| Small | the gain |
| Text | What is the number, and where does it come from? |
| Small | the proof |
| Text | Could it pass ThinkLatent's steps and the Enterprise's model risk review in a quarter? |
| Small | the path |
| Web part | Microsoft Forms web part |
| Heading 2 · 26 | Sign up a team |
| Small | Business teams first; ThinkLatent builders are matched by the organisers. Sign-up closes \[DATE\]. |
| Bullet | Your team and the business you serve |
| Bullet | The problem, in your words |
| Bullet | Who from your team will be in the room |
| Bullet | Which theme, or your own |
| Link | Open the form → this page, signup section |

### 4 · ThinkLatent Day runs alongside the Summit, not instead of it

| Style | Copy |
| --- | --- |
| Label | ThinkLatent at the Enterprise's AI Summit |
| Heading 1 · 48 | ThinkLatent Day runs alongside the Summit, not instead of it |
| Lead · 20 | The Enterprise's internal AI conference is where the firm meets AI; ThinkLatent Day is where it builds on ThinkLatent's products. ThinkLatent's Summit sessions, the Head of ThinkLatent's fireside and the lab's track are listed here each year, with recordings afterwards. |
| Label | Summit sessions · \[YEAR\] |
| Text | Fireside: the Head of ThinkLatent with \[business leader\] |
| Small | \[DATE · TIME\] |
| Text | TLM in production: three wins, three numbers |
| Small | \[DATE · TIME\] |
| Text | The university lab: what a year of joint work produced |
| Small | \[DATE · TIME\] |
| Text | Hands-on: build on TLM in an hour |
| Small | \[DATE · TIME\] |

### 5 · What the last ThinkLatent Day produced

| Style | Copy |
| --- | --- |
| Label | Past winners |
| Heading 1 · 48 | What the last ThinkLatent Day produced |
| Body | Every demo recorded and recapped; winners joined the quarter's ThinkLatent awards. |
| Label | Winner · \[YEAR\] |
| Small | \[Business team\] + ThinkLatent |
| Heading 3 · 22 | \[What the team built, in outcomes\] |
| Small | \[One number\] · now at process stage \[N\] |
| Label | Runner-up |
| Small | \[Business team\] + ThinkLatent |
| Heading 3 · 22 | \[What the team built\] |
| Small | \[One number\] · entered the Idea Lab as a Seed |
| Label | Recordings |
| Small | \[N\] demos |
| Heading 3 · 22 | All demos, recorded and recapped |
| Small | In the AI Perspectives recordings library |

### 6 · Which part of your work should the model learn next? · background Canopy

| Style | Copy |
| --- | --- |
| Heading 1 · 60 | Which part of your work should the model learn next? |
| Lead · 20 | Tell us in your words. Every use case makes the next one easier. |
| Button (red) | Start a use case → the Bring us a problem form |

## Glossary

Title area: Plain, title "Glossary". Comments on. The terms come from glossary.csv, not from typing.

### 1 · The words we use, in plain words. · background Meadow

| Style | Copy |
| --- | --- |
| Label | Glossary |
| Heading 1 · 64 | The words we use, in plain words. |
| Lead · 21 | Forty-odd terms, one line each, kept by the blog editors. Perspective posts link here instead of explaining; if a term needs more than a line, it belongs in a Deep dive. |
| Button | Suggest a term → Write for ThinkLatent page, submit section |

### 2 · List web part

| Style | Copy |
| --- | --- |
| Web part | List web part · filter by letter: |
| Button | A → this page, A section |
| Button | C → this page, C section |
| Button | D → this page, D section |
| Button | E → this page, E section |
| Button | F → this page, F section |
| Button | G → this page, G section |
| Button | H → this page, H section |
| Button | I → this page, I section |
| Button | J → this page, J section |
| Button | L → this page, L section |
| Button | M → this page, M section |
| Button | N → this page, N section |
| Button | O → this page, O section |
| Button | P → this page, P section |
| Button | Q → this page, Q section |
| Button | R → this page, R section |
| Button | S → this page, S section |
| Button | U → this page, U section |
| Button | V → this page, V section |
| Button | W → this page, W section |

### 3 · List web part on the Glossary list, filtered by letter with…

| Style | Copy |
| --- | --- |
| Web part | List web part on the Glossary list, filtered by letter with the buttons above. Import glossary.csv to create it. |

### 4 · Owned by the editorial board

| Style | Copy |
| --- | --- |
| Small | Owned by the editorial board · last reviewed \[DATE\] · 44 terms |

### 5 · Which part of your work should the model learn next? · background Canopy

| Style | Copy |
| --- | --- |
| Heading 1 · 60 | Which part of your work should the model learn next? |
| Lead · 20 | Tell us in your words. Every use case makes the next one easier. |
| Button (red) | Start a use case → the Bring us a problem form |

### 6 · Page owners and review

| Style | Copy |
| --- | --- |
| Page property | Page owners: \[Editorial board\] · \[Site editor, TPM\] |
| Page property | Review by: \[DATE + 1 quarter\] |
| Page property | Last reviewed: \[DATE\] |

## ThinkLatent at a glance

Title area: Plain, title "ThinkLatent at a glance". Text only, so search and Copilot can read it; refreshed each quarter.

### 1 · Everything about ThinkLatent on one plain page.

| Style | Copy |
| --- | --- |
| Label | ThinkLatent at a glance · the index page |
| Heading 1 · 56 | Everything about ThinkLatent on one plain page. |
| Body | Written so that Copilot, search and a new colleague can answer "what has ThinkLatent done on X?" from one place. Plain headings, plain lists, every number with a source. Kept current each quarter by the site editor. Last updated \[DATE\]. |

### 2 · Mandate

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | Mandate |
| Bullet | ThinkLatent builds the AI infused with the Enterprise's proprietary data: language, speech, omni and foundation models. |
| Bullet | Purpose: the Enterprise's own intelligence compounds; vendor models make everyone as good as the vendor, only the Enterprise's models carry its customers' feedback loop. |
| Bullet | Measured on latency, cost, scale and competitive advantage. Head of ThinkLatent: Jithin Pradeep. |

### 3 · Products

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | Products |
| Bullet | TLM, TLM line: five generations; TLM4 Core (27B, 7B), Distil and Domain in use or in preview; TLM5 (a world model) next. Owner: \[Name\]. Full cards in the ThinkLatent Portal. |
| Bullet | ThinkLatent Portal: find, try, train and run ThinkLatent's models; intake. Status: in build; Retail Advice goes first. Owner: \[Name\]. |
| Bullet | TL Index (the TL Index): how models score on the Enterprise's skills. Status: in build. Owner: \[Name\]. |
| Bullet | How we build responsibly: ThinkLatent's six steps (intake, risk classification, developer evaluation, independent validation by Risk, human review, monitoring); approval and validation belong to the Enterprise's model risk management. |
| Bullet | Platform: Relay SDK, AI Gateway, HyperPod and the compression pipeline are in production; self-healing is built. |

### 4 · Numbers that compound (source · as of)

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | Numbers that compound (source · as of) |
| Bullet | Use cases in production: \[N\] (ThinkLatent Portal registry · \[DATE\]) |
| Bullet | Business units served: \[N\] (ThinkLatent Portal registry · \[DATE\]) |
| Bullet | Client interactions a year: \[N\] (AI Gateway telemetry · \[DATE\]) |
| Bullet | TLM generations in use: 3 (model inventory · \[DATE\]) |
| Bullet | Papers, talks and patents: \[N\] (Publications list · \[DATE\]) |
| Bullet | AI Perspectives attendance: about 200 live per session (Head of ThinkLatent · \[DATE\]) |

### 5 · Wins (one number each)

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | Wins (one number each) |
| Bullet | \[Partner team\]: \[what they can do now\] · \[N\] \[unit\] · \[SOURCE\] · \[DATE\] · TLM4 |
| Bullet | \[Partner team\]: \[what they can do now\] · \[N\] \[unit\] · \[SOURCE\] · \[DATE\] · TLM4 |
| Bullet | \[Partner team\]: \[what they can do now\] · \[N\] \[unit\] · \[SOURCE\] · \[DATE\] · TLM3 |

### 6 · Research

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | Research |
| Bullet | Themes: autonomous AI, trustworthy AI, cybersecurity. Never uses vendor data. |
| Bullet | The university lab (since May 2025): four projects on advancing SLMs, causal AI, responsible AI and cognitive AI; four faculty leads; Enterprise leads: the two principal scientists and the Head of Research. Site: (source link withheld) |
| Bullet | Methods in use: M-cube (red teaming, published), self-healing (built), SLM feasibility (in use), decision models (in the lab). |

### 7 · Publications

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | Publications |
| Bullet | \[N\] papers, \[N\] talks, \[N\] patents; filterable list on the Publications page by type, year, theme and status. |
| Bullet | Press: the university partnership, May 2025 (BetaKit, CTV, BNN Bloomberg, Finextra, FStech, Enterprise Canada). |
| Bullet | Awards: AI150, MachineCon USA 2026 (Jithin Pradeep). |

### 8 · Team

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | Team |
| Bullet | Three functions, three countries (United States, Canada, \[City\] India). |
| Bullet | Research, head \[Name\] · Applied Research, head \[Name\] · AI Products, head \[Name\]. |
| Bullet | Principal scientists: \[Name\], \[Name\]. |

### 9 · How to engage

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | How to engage |
| Bullet | Bring us a problem: the form on the Wins page; owner \[Name\]; reply within a week. |
| Bullet | Work with ThinkLatent: consult, then co-build, then a dedicated Domain model. |
| Bullet | Developers: Relay SDK and the ThinkLatent Portal playground. |
| Bullet | Governance questions: the form on How we build responsibly. |
| Bullet | Write for ThinkLatent: eleven templates; the editors review within five working days. |

### 10 · The questions teams ask first

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | The questions teams ask first |
| Bullet | What is TLM? \[One line\] · ask \[Name\] |
| Bullet | Can my team use it today? Yes. TLM4 is in use and reached through Relay, the Python and Node SDK that follows the OpenAI client patterns your developers already know. Tell us the problem first; we will tell you which model fits and how long it takes. · ask \[Name\] |
| Bullet | Do you train on my team's data? \[One line\] · ask \[Name\] |
| Bullet | How does a model get approved? Through the Enterprise's model risk management; How we build responsibly shows ThinkLatent's part: \[One line\] · ask \[Name\] |
| Bullet | How do I bring a problem to ThinkLatent? The Bring us a problem form on Wins ; \[One line\] · ask \[Name\] |
| Bullet | Why not just use a vendor model? See the Mandate : \[One line\] · ask \[Name\] |
| Bullet | What does a dedicated Domain model take? \[One line\] · ask \[Name\] |
| Bullet | Can I ask for something on the roadmap? Yes, on AI Perspectives : \[One line\] · ask \[Name\] |

### 11 · Recurring

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | Recurring |
| Bullet | AI Perspectives: monthly seminar, recorded; quarterly demo edition and podcast pilot coming after launch. |
| Bullet | ThinkLatent Day: yearly hackathon on ThinkLatent products, alongside the Enterprise's AI Summit. |
| Bullet | ThinkLatent awards: quarterly, six categories, nominations in the Enterprise's recognition portal. |
| Bullet | Monthly newsletter by email; year in review every January. |

### 12 · Site owners

| Style | Copy |
| --- | --- |
| Small | Site owners: \[Site editor, TPM\] · \[Function head\]. This page is reviewed every quarter. |

### 13 · Which part of your work should the model learn next? · background Canopy

| Style | Copy |
| --- | --- |
| Heading 1 · 60 | Which part of your work should the model learn next? |
| Lead · 20 | Tell us in your words. Every use case makes the next one easier. |
| Button (red) | Start a use case → the Bring us a problem form |

### 14 · Page owners and review

| Style | Copy |
| --- | --- |
| Page property | Page owners: \[Site editor, TPM\] · \[Function head\] |
| Page property | Review by: \[DATE + 1 quarter\] |
| Page property | Last reviewed: \[DATE\] |

## Write for ThinkLatent

Title area: Plain, title "Write for ThinkLatent". Comments on.

### 1 · Pick a template. Write it. We review it in five working days. · background Meadow

| Style | Copy |
| --- | --- |
| Label | Write for ThinkLatent |
| Heading 1 · 72 | Pick a template. Write it. We review it in five working days. |
| Lead · 21 | Every piece on this site starts from one of eleven templates. The highlighted boxes tell you what to write; you delete them before you publish. |
| Small | On this page: |
| Link | Templates → this page, templates section |
| Link | Perspective or Deep dive → this page, tiers section |
| Link | How to publish → this page, steps section |
| Link | How the blog runs → this page, runs section |
| Link | The ThinkLatent voice → this page, voice section |
| Link | Submit → this page, submit section |

### 2 · A problem you solved, or one you want to

| Style | Copy |
| --- | --- |
| Label | Blog post |
| Heading 1 · 24 | A problem you solved, or one you want to |
| Small | For anyone. The problem in plain words, why it matters here, what we did, an invitation. Marked Perspective or Deep dive. |
| Text | Who Anyone |
| Text | Length 600–1,200 words |
| Text | Cadence Any time |
| Label | Win story |
| Heading 1 · 24 | What a partner team can do now |
| Small | For product leads with the partner team. The research-to-production story, one before-and-after number with its source, the partner's words, and what it made possible next. One moment, one number; it links to the use case page. |
| Text | Who Product leads |
| Text | Length 500–900 words |
| Text | Cadence A win a month |
| Label | Paper explained |
| Heading 1 · 24 | A paper, talk or patent, for the people who use it |
| Small | For authors. The finding in one sentence, why it matters at the Enterprise, where it goes next. |
| Text | Who Authors |
| Text | Length 500–800 words |
| Text | Cadence Each publication |
| Label | Model card |
| Heading 1 · 24 | The short card every model carries on this site |
| Small | For the model's owner. What it is for, who uses it, status, limits in plain words, the owner, and the link to the full card in the ThinkLatent Portal. |
| Text | Who Model owner |
| Text | Length One screen |
| Text | Cadence Each model, each release |
| Label | Release notes |
| Heading 1 · 24 | A new model or product, in outcomes |
| Small | For the release owner. What is new, the index result against the last generation, who should move, known limits, getting started, acknowledgments, a contact. |
| Text | Who Release owner |
| Text | Length 300–600 words |
| Text | Cadence Each release |
| Label | Leadership series |
| Heading 1 · 24 | A leader's view, one a month in turn |
| Small | For the Head of ThinkLatent and the three heads, taking turns: each writes about once a quarter. A stance, the evidence, what it means for the team and for the Enterprise, one ask. |
| Text | Who Four leaders |
| Text | Length 700–1,000 words |
| Text | Cadence Monthly |
| Label | Use case |
| Heading 1 · 24 | What the Enterprise can do now, by use case |
| Small | For product leads with the partner team. The gain, in their words, one number and its source, their consent. One page per use case, kept current as it grows; a Win story is one moment and one number. |
| Text | Who Product leads |
| Text | Length 400–700 words |
| Text | Cadence Each use case |
| Label | AI Perspectives session |
| Heading 1 · 24 | The session, written up in two days |
| Small | For the host. The paper, the Enterprise slide, the carrier, every request raised, the recording. |
| Text | Who Host |
| Text | Length 300–500 words |
| Text | Cadence Each session |
| Label | Conference roundup |
| Heading 1 · 24 | ThinkLatent at \[conference\] |
| Small | For whoever went. Who was there, the talks and papers, three things we bring back, and who to ask about each. |
| Text | Who Attendees |
| Text | Length 400–700 words |
| Text | Cadence Each conference |
| Label | New partner |
| Heading 1 · 24 | \[Business unit\] starts with ThinkLatent |
| Small | For the ThinkLatent product lead. Who, the problem in their words, what starts first, the first milestone and its date, the contact. |
| Text | Who Product lead |
| Text | Length 200–400 words |
| Text | Cadence Each new engagement |
| Label | ThinkLatent quarterly awards |
| Heading 1 · 24 | The quarter's winners, with citations |
| Small | For the editor and leadership, after the quarterly review. One block per award, evidence for each, consent for every name. |
| Text | Who Editor, Head of ThinkLatent |
| Text | Length One block per award |
| Text | Cadence Quarterly |

### 3 · For business readers

| Style | Copy |
| --- | --- |
| Label | Perspective |
| Heading 1 · 30 | For business readers |
| Body | What changed for the people who use it, and why it matters at the Enterprise. No architecture, no parameter counts, no benchmark names. If a term needs the glossary, link it; if it needs a paragraph, it belongs in a Deep dive. |
| Small | Most posts. Every win, release and leadership post is a Perspective. |
| Label | Deep dive |
| Heading 1 · 30 | For practitioners |
| Body | How it was done, for the people who will build on it: methods, trade-offs, what did not work. Still no client names and nothing unreleased; the editor checks. |
| Small | Marked Deep dive on the card so a business reader knows before clicking. |

### 4 · Three steps

| Style | Copy |
| --- | --- |
| Label | How to publish |
| Heading 1 · 48 | Three steps |
| Bullet | 1 Start from the template In SharePoint: New › News post › pick the template. The category, properties and layout are already set. Draft with AI if you like; you are the author. |
| Bullet | 2 Submit for review Save as draft and send the link with the form below. One peer and the editor review within five working days for clarity, anything unreleased, client names and approvals. |
| Bullet | 3 Publish and share The editor publishes; it lands on Home, the Blog and the next monthly email automatically, and goes to the intranet and the office news when it fits. Share the link with the people who have the problem. |

### 5 · Researchers write. A small board keeps it moving.

| Style | Copy |
| --- | --- |
| Label | How the blog runs |
| Heading 1 · 48 | Researchers write. A small board keeps it moving. |
| Lead · 20 | Borrowed from the labs that keep a blog alive for years: the people who did the work write it; a board of two or three edits it; one function head advises; the cadence is fixed and modest. |
| Text | Editorial board |
| Small | \[Name\], \[Name\], \[Name\] |
| Text | Advisor |
| Small | \[Function head\] |
| Text | Cadence |
| Small | at most two posts a month: one leadership, one from the team |
| Text | Review |
| Small | one peer + the editor, five working days |
| Text | Syndication |
| Small | The intranet · Canada and India office news · the external blog via Comms, later |
| Text | Comments |
| Small | on, moderated by the editors |

### 6 · Four rules for everything we write

| Style | Copy |
| --- | --- |
| Label | The ThinkLatent voice |
| Heading 1 · 48 | Four rules for everything we write |
| Heading 3 · 21 | Gain before build |
| Small | Lead with what someone can now do, not what we built. |
| Heading 3 · 21 | Their problem first |
| Small | Say it in the reader's words, before ours. |
| Heading 3 · 21 | One number |
| Small | Dated and sourced. No number we cannot back. |
| Heading 3 · 21 | End with an invitation |
| Small | "Do you have this problem? Talk to us." |
| Label | Instead of |
| Lead · 20 | "We fine-tuned a domain model on \[N\] documents and improved accuracy on our benchmark." |
| Label | Write |
| Lead · 20 | "\[Partner team\] now \[does what\] in \[time\] instead of \[time\]. If your team \[has the same problem\], let's talk." |

### 7 · Draft ready?

| Style | Copy |
| --- | --- |
| Heading 1 · 30 | Draft ready? |
| Small | Send the link; the editor replies within five working days. |
| Button (red) | Submit for review → this page,  section |

### 8 · Which part of your work should the model learn next? · background Canopy

| Style | Copy |
| --- | --- |
| Heading 1 · 60 | Which part of your work should the model learn next? |
| Lead · 20 | Tell us in your words. Every use case makes the next one easier. |
| Button (red) | Start a use case → the Bring us a problem form |

### 9 · Page owners and review

| Style | Copy |
| --- | --- |
| Page property | Page owners: \[Site editor, TPM\] · \[Editorial board advisor\] |
| Page property | Review by: \[DATE + 1 quarter\] |
| Page property | Last reviewed: \[DATE\] |

## Templates

The eleven templates authors start from. Highlighted instruction boxes stay in the template and are deleted by the author before publishing. In a post, Heading 1 is SharePoint's own size (24), so no size is typed.

### Blog post

News post template, Category = Perspective or Deep dive. Build it once as a post with the blocks below, then Page details > Save as template.

*Highlighted boxes are instructions: delete them before you publish. Replace every \[BRACKET\]. Category is preset to Blog.*

#### 1 · \[Title: the problem or the gain, under 70 characters\]

| Style | Copy |
| --- | --- |
| Label | Blog |
| Page title | \[Title: the problem or the gain, under 70 characters\] |
| Bold | \[Your name\] |
| Text | \[Function\] · \[DATE\] · \[N\] min read |

#### 2 · The problem

| Style | Copy |
| --- | --- |
| Instruction box | Title area The title sits on the ThinkLatent pattern (the page's title area, Image and title layout, with the net pattern as the image; swap in a picture of the problem if you have one with no client data and no people without consent). Name the problem or what someone can now do, not the technique. "From endpoint to use case in a week" beats "Our new deployment pipeline". |
| Heading 1 · 24 | The problem |
| Instruction box | Three sentences, no acronyms Who has the problem, what it costs them today, and what they have tried. Write it so someone outside AI understands it on first read. |
| Body | \[The problem in plain words.\] |
| Heading 1 · 24 | Why it matters at the Enterprise |
| Instruction box | Make it ours Which teams, clients or decisions it touches. If you have a number, give it with its source and date. Never a client name without consent. |
| Body | \[Why it matters here.\] |
| Heading 1 · 24 | Where we have heard it |
| Instruction box | Show it is not just us The teams, forums or sessions where the same problem came up. Name a team only if they agreed. |
| Body | \[Where else this problem lives.\] |
| Heading 1 · 24 | What we did, or what we think |
| Instruction box | The gain before the build Lead with what changed for someone. Then, briefly, how. One picture or diagram if it helps. Link deeper material rather than pasting it. |
| Body | \[What we did and what changed.\] |
| Heading 1 · 26 | Do you have this problem? |
| Body | \[One line on who should get in touch, and what happens when they do.\] |
| Button | Talk to us → the Bring us a problem form |
| Instruction box | Before you submit 600 to 900 words · one number, sourced · nothing unreleased · no client data · an AI draft is fine, you are the author · send for review from Write for ThinkLatent. |

#### 3 · Page properties

| Style | Copy |
| --- | --- |
| Label | Page properties |
| Page property | Category Blog (preset) |
| Page property | Thumbnail perspective-a or -b; deep-dive-a or -b for a deep dive (images/thumbnails in the theme pack; Page details > Change thumbnail, as the last step before posting) |
| Page property | Function \[Research · Applied Research · AI Products\] |
| Page property | Author \[You\] |
| Page property | Why it matters \[One line; shows on the card\] |
| Page property | Reviewed by \[Editor, DATE\] |

### Win story

News post template, Category = Win. Build it once as a post with the blocks below, then Page details > Save as template.

*One per win; the research-to-production story with the number, the partner's words and what it made possible next. Highlighted boxes are instructions: delete them. Category is preset to Win.*

#### 1 · \[Partner team\] now \[does what\] in \[time\] instead of \[time\].

| Style | Copy |
| --- | --- |
| Label | Win |
| Label | \[Partner team\] |
| Page title | \[Partner team\] now \[does what\] in \[time\] instead of \[time\]. |

#### 2 · Title area

| Style | Copy |
| --- | --- |
| Bold | Title area |

#### 3 · Partner team \[Team\]

| Style | Copy |
| --- | --- |
| Label | Partner team \[Team\] |
| Label | The number \[N\] \[unit\] |
| Label | Source \[Jira · telemetry · survey\], \[DATE\] |
| Label | Carried by \[TLM tier\] |

#### 4 · The problem, in their words

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | The problem, in their words |
| Instruction box | One paragraph What took too long, cost too much, or could not be done, as the partner team said it. Quote them if you can. |
| Body | \[The problem.\] |
| Heading 1 · 24 | From research to production |
| Instruction box | The story in four steps The method it came from, the pilot, what changed on the way to production, and the day it went live. Outcomes, not architecture. |
| Bullet | \[The method\] |
| Bullet | \[The pilot\] |
| Bullet | \[What changed\] |
| Bullet | \[Live\] |
| Heading 1 · 24 | The number |
| Instruction box | Before and after, sourced One measure, its value before and after, where it comes from and when it was read. Link the use-case record in the portal. |
| Body | \[Before: N · After: N · Source · DATE\] |
| Heading 1 · 24 | In their words |
| Instruction box | The partner's quote A sentence or two from the partner team, approved in writing. Name and role. |
| Body | "\[Quote.\]" — \[Name\], \[Role\] |
| Heading 1 · 24 | What compounded |
| Instruction box | The line that matters What this win made possible next: the use case it unlocked, the data it produced, the team that came because of it. |
| Body | \[What compounded.\] |
| Heading 1 · 26 | Have the same problem? |
| Body | Tell us in your words; a named owner replies within a week. |
| Button | Bring us a problem → the Bring us a problem form |
| Button | All wins → Wins page |
| Instruction box | Before you publish Partner quoted and approved in writing · one number with before, after, source and date · use-case record linked · 'what compounded' written · 500 to 900 words. |

#### 5 · Page properties

| Style | Copy |
| --- | --- |
| Label | Page properties |
| Page property | Category Win (preset) |
| Page property | Thumbnail win-a or win-b (images/thumbnails in the theme pack; Page details > Change thumbnail, as the last step before posting) |
| Page property | Partner team \[Team\] |
| Page property | Business unit \[Unit\] |
| Page property | Product \[TLM tier\] |
| Page property | Use-case record \[Portal link\] |
| Page property | Quarter \[Q · YEAR\] |

### Paper explained

News post template, Category = Paper explained. Build it once as a post with the blocks below, then Page details > Save as template.

*For a paper, talk or patent that is already public and approved. Highlighted boxes are instructions: delete them. Category is preset to Paper.*

#### 1 · \[Title: what we found, in plain words\]

| Style | Copy |
| --- | --- |
| Label | Paper explained |
| Label | \[Theme: autonomous AI · trustworthy AI · cybersecurity\] |
| Page title | \[Title: what we found, in plain words\] |
| Bold | \[Author, with co-authors\] |
| Text | Research · \[DATE\] · \[N\] min read |

#### 2 · The question we asked

| Style | Copy |
| --- | --- |
| Instruction box | Title area The finding, not the paper's title: "We can tell if an SLM will work before training" beats the formal title, which goes in the citation card below. The title area uses the globe pattern. |
| Label | The finding in one sentence |
| Lead · 22 | \[One sentence a product manager could repeat.\] |
| Heading 1 · 24 | The question we asked |
| Instruction box | Start where the reader is What we did not know, and why someone at the Enterprise should care that we did not know it. |
| Body | \[The question.\] |
| Heading 1 · 24 | What we found |
| Instruction box | One result, one picture The main result with its number and the conditions it holds under. One figure, redrawn for this page if the paper's is too dense. Limits stated plainly. |
| Text | Figure · redrawn for readers outside research |
| Body | \[What we found, and where it does not hold.\] |
| Heading 1 · 24 | Why it matters at the Enterprise |
| Instruction box | Translate it Which teams, decisions or products it changes. Outcomes, not techniques: this section is for the business reader. |
| Body | \[Why it matters here.\] |
| Heading 1 · 24 | Where it goes next |
| Instruction box | Name the carrier The ThinkLatent product or TLM generation that will carry it, and roughly when. If nothing carries it yet, say what would have to be true. |
| Body | \[Next step, product and timing.\] |
| Label | The paper |
| Body | \[Formal title\] |
| Body | \[Authors\] · \[Venue\] · \[Year\] |
| Button | Read the paper → this page,  section |
| Button | In Publications → Publications page |
| Heading 1 · 26 | Could this help your team? |
| Body | \[One line on who should get in touch.\] |
| Button | Talk to the authors → the Bring us a problem form |
| Instruction box | Before you submit 500 to 800 words · the approval reference is filled in · only what is already public · the Publications row exists or is added at the same time. |

#### 3 · Page properties

| Style | Copy |
| --- | --- |
| Label | Page properties |
| Page property | Category Paper (preset) |
| Page property | Thumbnail paper-a or paper-b (images/thumbnails in the theme pack; Page details > Change thumbnail, as the last step before posting) |
| Page property | Theme \[Autonomous AI · Trustworthy AI · Cybersecurity\] |
| Page property | Venue and year \[Venue, YEAR\] |
| Page property | Authors \[Names\] |
| Page property | Approval reference required \[Comms or Legal reference\] |
| Page property | Publications row \[Link\] |

### Model card

News post template, Category = Model card. Build it once as a post with the blocks below, then Page details > Save as template.

*One per model and per release; the short card on the site, the full card in the ThinkLatent Portal. Where they differ, the portal card wins; the site editor checks this card against it every quarter. Highlighted boxes are instructions: delete them. Category is preset to Model card.*

#### 1 · \[Model name, tier and version\]: \[what it is for, in one line\]

| Style | Copy |
| --- | --- |
| Label | Model card |
| Label | \[In use · Preview · Retired\] · inventory record \[link\] |
| Page title | \[Model name, tier and version\]: \[what it is for, in one line\] |

#### 2 · Title area

| Style | Copy |
| --- | --- |
| Bold | Title area |

#### 3 · Owner \[Name\]

| Style | Copy |
| --- | --- |
| Label | Owner \[Name\] |
| Label | Status \[In use · Preview\] |
| Label | Since \[DATE\] |
| Label | Full card \[ThinkLatent Portal link\] |

#### 4 · What it is for

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | What it is for |
| Instruction box | Two sentences The jobs it does well, in outcomes. Who should pick it over the other tiers. |
| Body | \[What it is for.\] |
| Heading 1 · 24 | Who uses it |
| Instruction box | Teams, not systems The business units and use cases running on it today, with a link to each use-case record in the portal. |
| Body | \[Who uses it.\] |
| Heading 1 · 24 | Limits, plainly |
| Instruction box | Say what it does not do Where it is weaker, what it must never be used for, and what to use instead. This is the part Risk reads first. |
| Body | \[Limits.\] |
| Heading 1 · 24 | The index |
| Instruction box | One number, one run The latest sufficiency score with its interval and run number, from the TL Index. Never computed here. |
| Body | \[0.NN ± 0.0N · run N · DATE\] |
| Heading 1 · 24 | How to get access |
| Instruction box | Three links Request access, the Relay call, the playground in the portal. |
| Body | \[Links.\] |
| Heading 1 · 26 | The full card |
| Body | Architecture, training data at the level allowed, evaluations and the changelog live in the ThinkLatent Portal. |
| Button | Open in the ThinkLatent Portal → this page,  section |
| Button | Release notes → the Write for ThinkLatent page, templates section |
| Instruction box | Before you publish Owner named · process stage current · inventory record linked · index run referenced · limits written in plain words · portal link live · reviewed each release · checked against the portal card every quarter. |

#### 5 · Page properties

| Style | Copy |
| --- | --- |
| Label | Page properties |
| Page property | Category Model card (preset) |
| Page property | Thumbnail model-card-a or model-card-b (images/thumbnails in the theme pack; Page details > Change thumbnail, as the last step before posting) |
| Page property | Product \[TLM Core · Distil · Domain · other\] |
| Page property | Version \[Value\] |
| Page property | Owner \[Name\] |
| Page property | Index run \[Reference\] |
| Page property | Process stage \[1–6\] |
| Page property | Inventory record \[Link\] |
| Page property | Portal card \[Link\] |

### Release notes

News post template, Category = Release. Build it once as a post with the blocks below, then Page details > Save as template.

*One per TLM generation or product release, published on release day. Highlighted boxes are instructions: delete them. Category is preset to Release.*

#### 1 · \[TLM generation or product, version\]: \[what is new, in outcomes\]

| Style | Copy |
| --- | --- |
| Label | Release |
| Label | \[Generally available · Preview\] |
| Page title | \[TLM generation or product, version\]: \[what is new, in outcomes\] |

#### 2 · Title area

| Style | Copy |
| --- | --- |
| Bold | Title area |

#### 3 · Released \[DATE\]

| Style | Copy |
| --- | --- |
| Label | Released \[DATE\] |
| Label | Replaces \[Previous generation\] |
| Label | Who should move \[Teams\] |
| Label | Move by \[DATE\] |

#### 4 · What is new

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | What is new |
| Instruction box | Three outcomes Three bullets, each something a user can now do or do better. No architecture, no parameter counts on this page. |
| Bullet | \[Outcome one\] |
| Bullet | \[Outcome two\] |
| Bullet | \[Outcome three\] |
| Heading 1 · 24 | Compared with \[previous generation\] |
| Instruction box | From the index only Every number comes from the TL Index run named in page properties. Show where it got worse too. |
| Table header | Skill · \[Previous\] · \[This release\] · Change |
| Table row | \[Skill\] · \[N\] · \[N\] · \[±N\] |
| Table row | \[Skill\] · \[N\] · \[N\] · \[±N\] |
| Table row | \[Skill\] · \[N\] · \[N\] · \[±N\] |
| Heading 1 · 24 | Who should move, and how |
| Instruction box | Be specific Which teams or use cases should switch, by when, and what they need to change. Link the step-by-step in the ThinkLatent Portal. |
| Body | \[Who should move and how.\] |
| Heading 1 · 24 | Known limits |
| Instruction box | Say it plainly What it does not do yet, where it is weaker, and what to use instead. Trust is built here. |
| Body | \[Known limits.\] |
| Heading 1 · 24 | Getting started |
| Instruction box | How a team starts Three steps, each a link: where to request access, the Relay call that reaches it, and the portal page with the full model card and the playground. No architecture. |
| Bullet | \[Request access · link\] |
| Bullet | \[The call, in Relay · link\] |
| Bullet | \[The full model card and playground in the ThinkLatent Portal · link\] |
| Heading 1 · 24 | Acknowledgments |
| Instruction box | Who built it, who tried it first The people and the partner teams, by name, with consent. The first team to run it in production gets the first line. |
| Body | \[Built by · tried first by.\] |
| Heading 1 · 24 | Contact |
| Instruction box | One name The release owner, and where to ask: the Viva Engage community or the form on the Products page. |
| Body | \[Release owner · where to ask.\] |
| Heading 1 · 26 | See it live |
| Body | Ten-minute demo at AI Perspectives on \[DATE\]. Questions before then go to \[owner\]. |
| Button | Join the demo → AI Perspectives page |
| Button | Start in the ThinkLatent Portal → Products page |
| Instruction box | Release day checklist This page, a the intranet line, the demo slot, and the portal entry, all on the same day; links to the portal card and the index run, never to weights or code. 300 to 600 words. |

#### 5 · Page properties

| Style | Copy |
| --- | --- |
| Label | Page properties |
| Page property | Category Release (preset) |
| Page property | Thumbnail release-a or release-b (images/thumbnails in the theme pack; Page details > Change thumbnail, as the last step before posting) |
| Page property | Product \[TLM Core · Distil · Domain · Portal · Index · Gateway\] |
| Page property | Generation or version \[Value\] |
| Page property | Index run \[Reference\] |
| Page property | Release owner \[Name\] |
| Page property | Portal card \[Link\] |

### Leadership series

News post template, Category = Leadership. Build it once as a post with the blocks below, then Page details > Save as template.

*For the Head of ThinkLatent and the three heads, one post a month across the four, in turn. Highlighted boxes are instructions: delete them. Category is preset to Leadership.*

#### 1 · \[Title: the stance, as a claim someone could disagree with\]

| Style | Copy |
| --- | --- |
| Label | \[Series name\] |
| Text | No. \[N\] · \[MONTH YEAR\] |
| Page title | \[Title: the stance, as a claim someone could disagree with\] |
| Bold | \[Leader's name\] |
| Text | \[Head of ThinkLatent · Head of Research · Head of Applied Research · Head of AI Products\] |

#### 2 · What I am seeing

| Style | Copy |
| --- | --- |
| Instruction box | Title and series A stance, not a topic. "Proprietary only counts if it fuels the business" beats "Thoughts on proprietary AI". Keep the series name the same every month; number each post. |
| Lead · 26 | \[The stance in one or two sentences: the thing you want every reader to leave with.\] |
| Instruction box | Pull-quote This line is what gets quoted in the newsletter and the town hall. Write it last. |
| Heading 1 · 24 | What I am seeing |
| Instruction box | Evidence, not opinion Two or three things you have seen this month: a number, a conversation, a result. Sourced and dated. Inside and outside the Enterprise. |
| Body | \[What you are seeing.\] |
| Heading 1 · 24 | What it means for the Enterprise |
| Instruction box | For the business reader Outcomes, not techniques. Which decision, team or client experience changes, and how much. |
| Body | \[What it means for the Enterprise.\] |
| Heading 1 · 24 | What it means for us |
| Instruction box | For the team What we will do differently, stop doing or start. Name the work, not the people. |
| Body | \[What it means for the team.\] |
| Heading 1 · 24 | What I am asking of you |
| Instruction box | One ask One concrete thing for the reader: a problem to send, a session to join, a post to write, a nomination to make. |
| Body | \[The ask.\] |
| Heading 1 · 26 | Disagree, or have the same problem? |
| Body | \[One line inviting a reply, a session or a coffee.\] |
| Button | Reply to \[Leader\] → the Bring us a problem form |
| Instruction box | Before you publish 700 to 1,000 words · one stance · evidence sourced · nothing a Comms review has not seen if it touches strategy or clients · draft with AI if you like; the voice is yours. |

#### 3 · Page properties

| Style | Copy |
| --- | --- |
| Label | Page properties |
| Page property | Category Leadership (preset) |
| Page property | Thumbnail leadership-a or leadership-b (images/thumbnails in the theme pack; Page details > Change thumbnail, as the last step before posting) |
| Page property | Series \[Series name\] |
| Page property | Number \[N\] |
| Page property | Leader \[Name, role\] |
| Page property | Previous in series \[Link\] |

### Use case

News post template, Category = Use case. Build it once as a post with the blocks below, then Page details > Save as template.

*One page per use case, updated as it grows (new numbers, new teams); a Win story is one moment with one number and links here. Written with the partner team, published only with their written consent. Highlighted boxes are instructions: delete them. Category is preset to Win.*

#### 1 · \[Partner team\] now \[does what\] in \[time\].

| Style | Copy |
| --- | --- |
| Label | What the Enterprise can do now |
| Page title | \[Partner team\] now \[does what\] in \[time\]. |
| Lead · 21 | \[One sentence: the problem they had, in their words.\] |
| Number · 120 | \[N\] \[unit\] |
| Body | \[What the number measures, compared with before\] |
| Small | Source: \[Jira item or use-case record\] · \[DATE\] |
| Label | Partner team \[Team\] |
| Label | Carried by \[TLM generation · product\] |
| Label | Research to production \[N\] weeks |
| Label | In use since \[MONTH YEAR\] |

#### 2 · Headline and number

| Style | Copy |
| --- | --- |
| Bold | Headline and number |

#### 3 · Before

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | Before |
| Instruction box | Their problem, their words What the work looked like before, what it cost, who felt it. Use the partner's own phrases; they approve this section. |
| Body | \[Before.\] |
| Heading 1 · 24 | What changed |
| Instruction box | The gain What people can do now, how often, at what volume. Outcomes only; no architecture on this page. |
| Body | \[What changed.\] |
| Heading 1 · 24 | How we got there |
| Instruction box | Short Three or four sentences: how long, how many people, which ThinkLatent capabilities were reused. Credit the people from both teams by name if they agree. |
| Body | \[How we got there.\] |
| Lead · 24 | "\[What the partner says, in their words.\]" |
| Caption | \[Name\], \[role\], \[partner team\] |
| Instruction box | Quote Only a quote the partner wrote or approved, in writing. No quote is better than an invented one. |
| Heading 1 · 24 | What is next |
| Instruction box | Where it goes The next team it could help, the next generation that will carry it, or the next number to move. |
| Body | \[What is next.\] |
| Heading 1 · 26 | Does your team have this problem? |
| Body | \[One line: who should talk to us, and what the first conversation looks like.\] |
| Button | Talk to us → the Bring us a problem form |
| Instruction box | Before you submit 400 to 700 words · consent reference filled in · the number's source filled in · no client data · the partner has read the final version. |

#### 4 · Page properties

| Style | Copy |
| --- | --- |
| Label | Page properties |
| Page property | Category Win (preset) |
| Page property | Thumbnail use-case-a or use-case-b (images/thumbnails in the theme pack; Page details > Change thumbnail, as the last step before posting) |
| Page property | Partner team \[Team\] |
| Page property | Partner owner \[Name, role\] |
| Page property | Consent reference required \[Email or record, DATE\] |
| Page property | Number source required \[Jira item or use-case record\] |
| Page property | TLM generation \[Generation\] |
| Page property | Function \[Applied Research · AI Products\] |

### AI Perspectives session

News post template, Category = Session. Build it once as a post with the blocks below, then Page details > Save as template.

*The host posts it within two days of the session. Highlighted boxes are instructions: delete them. Category is preset to Session.*

#### 1 · \[Topic\]: what it means for the Enterprise

| Style | Copy |
| --- | --- |
| Label | AI Perspectives · \[DATE\] |
| Page title | \[Topic\]: what it means for the Enterprise |

#### 2 · Title area

| Style | Copy |
| --- | --- |
| Bold | Title area |

#### 3 · Continued

| Style | Copy |
| --- | --- |

#### 4 · Host \[Name\]

| Style | Copy |
| --- | --- |
| Label | Host \[Name\] |
| Label | Guest \[Business leader, if any\] |
| Label | Attended \[N\] |
| Label | Requests raised \[N\] |

#### 5 · The paper, in plain words

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | The paper, in plain words |
| Instruction box | Five sentences What it is and why people are talking about it. Link the paper or source; credit the authors. |
| Body | \[The paper or technology.\] |
| Heading 1 · 24 | What it means at the Enterprise |
| Instruction box | The Enterprise slide Paste the one slide that answered this in the session, then say it in words: the problem it solves here, and for whom. |
| Text | The Enterprise slide |
| Body | \[What it means here.\] |
| Heading 1 · 24 | The ThinkLatent solution that carries it |
| Instruction box | Name it Which ThinkLatent product or TLM generation carries this, and when. If nothing does yet, say so and link the roadmap item. |
| Body | \[The carrier and timing.\] |
| Heading 1 · 24 | What people asked for |
| Instruction box | Every request, with an answer date Each request from the session, the team that raised it, and when it will be answered on the open roadmap (within two weeks). |
| Table header | Request · Team · Answer by |
| Table row | \[Request\] · \[Team\] · \[DATE\] |
| Table row | \[Request\] · \[Team\] · \[DATE\] |
| Heading 1 · 26 | Next session: \[topic\] |
| Body | \[DATE · TIME\] · Missed this one? Your request is still welcome. |
| Button | Add to calendar → AI Perspectives page |
| Button | Ask for it on the roadmap → AI Perspectives page, ask section |
| Instruction box | Before you publish Within two days · recording linked with captions · the Enterprise slide in · every request listed · 300 to 500 words. |

#### 6 · Page properties

| Style | Copy |
| --- | --- |
| Label | Page properties |
| Page property | Category Session (preset) |
| Page property | Thumbnail session-a to session-d, in turn (images/thumbnails in the theme pack; Page details > Change thumbnail, as the last step before posting) |
| Page property | Session date \[DATE\] |
| Page property | Host \[Name\] |
| Page property | Paper or source \[Link\] |
| Page property | Recording \[Link\] |

### Conference roundup

News post template, Category = Roundup. Build it once as a post with the blocks below, then Page details > Save as template.

*One per conference ThinkLatent attends, within a week of coming back. Highlighted boxes are instructions: delete them. Category is preset to Roundup.*

#### 1 · ThinkLatent at \[conference\]: three things we bring back

| Style | Copy |
| --- | --- |
| Label | Conference roundup |
| Label | \[Conference · YEAR\] |
| Page title | ThinkLatent at \[conference\]: three things we bring back |

#### 2 · Title area

| Style | Copy |
| --- | --- |
| Bold | Title area |

#### 3 · Conference \[Name

| Style | Copy |
| --- | --- |
| Label | Conference \[Name · city · dates\] |
| Label | From ThinkLatent \[N\] people |
| Label | We presented \[N\] talks · \[N\] papers |
| Label | Written by \[Name\] |

#### 4 · Who went, and what we presented

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | Who went, and what we presented |
| Instruction box | A list Names, and for each talk or paper a line and a link to its Publications row. |
| Bullet | \[Name · talk or paper · link\] |
| Bullet | \[Name · talk or paper · link\] |
| Heading 1 · 24 | Three things we bring back |
| Instruction box | Three, not ten What changes in how we work, or what we will try, because of what we heard. Each with the person to ask. |
| Bullet | \[Thing one · ask Name\] |
| Bullet | \[Thing two · ask Name\] |
| Bullet | \[Thing three · ask Name\] |
| Heading 1 · 24 | What it means at the Enterprise |
| Instruction box | One paragraph Which ThinkLatent product or roadmap item it touches, and whether anything on the roadmap moves. |
| Body | \[What it means here.\] |
| Heading 1 · 24 | Who to ask |
| Instruction box | Names For each theme, the ThinkLatent person who followed it. |
| Body | \[Theme · Name\] |
| Heading 1 · 26 | Want the slides? |
| Body | Talks are in the Publications list; ask the presenter for the deck. |
| Button | Publications → Publications page |
| Button | Propose an AI Perspectives session → AI Perspectives page, ask section |
| Instruction box | Before you publish Within a week of returning · every talk and paper linked to Publications · three things, each with a name · nothing confidential about what others presented · 400 to 700 words. |

#### 5 · Page properties

| Style | Copy |
| --- | --- |
| Label | Page properties |
| Page property | Category Roundup (preset) |
| Page property | Thumbnail roundup-a or roundup-b (images/thumbnails in the theme pack; Page details > Change thumbnail, as the last step before posting) |
| Page property | Conference \[Name\] |
| Page property | Year \[Year\] |
| Page property | Attendees \[Names\] |
| Page property | Publications rows \[Links\] |

### New partner

News post template, Category = Partner. Build it once as a post with the blocks below, then Page details > Save as template.

*One each time a business unit or an IT engagement starts with ThinkLatent; the start is news too. Highlighted boxes are instructions: delete them. Category is preset to Partner.*

#### 1 · \[Business unit\] starts with ThinkLatent on \[problem\]

| Style | Copy |
| --- | --- |
| Label | New partner |
| Label | \[Business unit · IT engagement\] |
| Page title | \[Business unit\] starts with ThinkLatent on \[problem\] |

#### 2 · Title area

| Style | Copy |
| --- | --- |
| Bold | Title area |

#### 3 · Partner \[Business unit or team\]

| Style | Copy |
| --- | --- |
| Label | Partner \[Business unit or team\] |
| Label | Their lead \[Name\] |
| Label | ThinkLatent lead \[Name\] |
| Label | First milestone \[What\] by \[DATE\] |

#### 4 · The problem, in their words

| Style | Copy |
| --- | --- |
| Heading 1 · 24 | The problem, in their words |
| Instruction box | Two sentences What they want to do that they cannot today, as they put it. |
| Body | \[The problem.\] |
| Heading 1 · 24 | What starts first |
| Instruction box | The first step on the ladder Consult, co-build or a dedicated model; which ThinkLatent product; who is in the room. |
| Body | \[What starts.\] |
| Heading 1 · 24 | The first milestone |
| Instruction box | One date What will be true on the date, and how we will know. |
| Body | \[Milestone · DATE.\] |
| Heading 1 · 24 | Contact |
| Instruction box | Two names The partner's lead and the ThinkLatent lead, and where to follow progress: the use-case record once it exists. |
| Body | \[Names · link.\] |
| Heading 1 · 26 | Follow this engagement |
| Body | The use-case record in the ThinkLatent Portal carries its status from here; the win story comes when the number exists. |
| Button | The use-case record → this page,  section |
| Button | Bring us a problem → the Bring us a problem form |
| Instruction box | Before you publish Partner lead agreed to the post · milestone dated · no client names · 200 to 400 words · the win story follows when the number exists. |

#### 5 · Page properties

| Style | Copy |
| --- | --- |
| Label | Page properties |
| Page property | Category Partner (preset) |
| Page property | Thumbnail partner-a or partner-b (images/thumbnails in the theme pack; Page details > Change thumbnail, as the last step before posting) |
| Page property | Business unit \[Unit\] |
| Page property | ThinkLatent lead \[Name\] |
| Page property | Ladder step \[Consult · Co-build · Dedicated model\] |
| Page property | Use-case record \[Portal link, when it exists\] |

### ThinkLatent quarterly awards

News post template, Category = Awards. Build it once as a post with the blocks below, then Page details > Save as template.

*One post a quarter, after the leadership review. Highlighted boxes are instructions: delete them. Category is preset to Award.*

#### 1 · The people who moved ThinkLatent forward in Q\[N\].

| Style | Copy |
| --- | --- |
| Label | ThinkLatent quarterly awards |
| Text | Q\[N\] \[YEAR\] |
| Page title | The people who moved ThinkLatent forward in Q\[N\]. |
| Lead · 21 | \[Two sentences from the Head of ThinkLatent: what this quarter was about, and thanks to everyone nominated.\] |

#### 2 · How to fill this

| Style | Copy |
| --- | --- |
| Bold | How to fill this |

#### 3 · Research to Production

| Style | Copy |
| --- | --- |
| Label | Research to Production |
| Bold | \[Winner, or team\] |
| Text | \[Function\] · \[Location\] |
| Body | \[Citation: what they did, in two or three sentences, gain before build.\] |
| Body | What it changed: \[number\] · \[source, DATE\] |
| Link | See the work → this page,  section |

#### 4 · Citation

| Style | Copy |
| --- | --- |
| Bold | Citation |

#### 5 · In People's Hands

| Style | Copy |
| --- | --- |
| Label | In People's Hands |
| Bold | \[Winner, or team\] |
| Text | \[Function\] · \[Location\] |
| Body | \[Citation.\] |
| Body | What it changed: \[partner's number\] · \[source, DATE\] |
| Link | Read the win → Wins page |

#### 6 · AI-Native

| Style | Copy |
| --- | --- |
| Label | AI-Native |
| Bold | \[Winner, or team\] |
| Text | \[Function\] · \[Location\] |
| Body | \[Citation.\] |
| Body | What it changed: \[time saved or people taught\] · \[source, DATE\] |

#### 7 · Storyteller

| Style | Copy |
| --- | --- |
| Label | Storyteller |
| Bold | \[Winner\] |
| Text | \[Function\] · \[Location\] |
| Body | \[Citation.\] |
| Body | Reached: \[who, how many\] · \[the post or session\] |

#### 8 · Published

| Style | Copy |
| --- | --- |
| Label | Published |
| Bold | \[Winner, with co-authors\] |
| Text | \[Function\] · \[Location\] |
| Body | \[Citation.\] |
| Body | Where: \[venue, YEAR\] |
| Link | In Publications → Publications page |

#### 9 · Production Grade

| Style | Copy |
| --- | --- |
| Label | Production Grade |
| Bold | \[Winner, or team\] |
| Text | \[Function\] · \[Location\] |
| Body | \[Citation.\] |
| Body | What it changed: \[uptime, incidents avoided, time to recover\] · \[source, DATE\] |

#### 10 · Also nominated this quarter

| Style | Copy |
| --- | --- |
| Label | Also nominated this quarter |
| Body | \[Names, each with one line, only with their agreement.\] |

#### 11 · Nominees

| Style | Copy |
| --- | --- |
| Bold | Nominees |

#### 12 · Next quarter's nominations close \[DATE\]

| Style | Copy |
| --- | --- |
| Heading 1 · 26 | Next quarter's nominations close \[DATE\] |
| Body | Nominate in the Enterprise's recognition portal. |
| Button | Open \[Enterprise recognition portal\] ↗ → this page,  section |

#### 13 · Before you publish

| Style | Copy |
| --- | --- |
| Bold | Before you publish |

#### 14 · Page properties

| Style | Copy |
| --- | --- |
| Label | Page properties |
| Page property | Category Award (preset) |
| Page property | Thumbnail awards-a or awards-b (images/thumbnails in the theme pack; Page details > Change thumbnail, as the last step before posting) |
| Page property | Quarter Q\[N\] \[YEAR\] |
| Page property | Review date \[DATE of leadership review\] |
| Page property | Consent to name and photo required \[Yes, for every winner\] |
| Page property | Approved by Head of ThinkLatent |
