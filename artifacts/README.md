# Artifacts

Read-only mirrors of each idea's claude.ai artifacts and scout briefs, one folder per idea (`VI-###-slug/`), listed in `index.json`. The live versions on claude.ai and in the Idea Lab project knowledge are the source; edit there, then re-export. Each idea's page in `ideas/` links its own artifacts.

| Kind | What is here | Opens on its own? |
| --- | --- | --- |
| doc | Every tab of the idea's Claude Doc (idea card, proposal, inventory, design DNA) as Markdown | Yes. Embedded diagrams and charts appear as a placeholder line; open the live doc for them |
| brief | Scout briefs and seed notes from project knowledge, as Markdown | Yes |
| design | Design canvases (`project/canvas.json` and one `.dc.html` per artboard) | No: artboards need the claude.ai design runtime; read the live link |
| page | Built pages (the VI Portal playground; the lab dashboard is `docs/index.html`) | Yes, from a local web server |

Mirrors are refreshed at the end of every lab session that changes an artifact, and by the nightly sync when a live revision moves (`sourceRev` in `index.json`).
