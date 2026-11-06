<!-- Exported from https://claude.ai/artifact/UyE1iU6au9kWBcVRoyangw (rev 3) on 2026-11-04. Read-only mirror; edit the live doc, not this file. -->
# Design kit inventory

Nov 2, 2026

Every component the ThinkLatent design kit needs, one row each, 85 rows in three tables. Source says whether it is shadcn code vendored and themed, or built by ThinkLatent. Priority: P0 is the kit test and the first blocks, P1 is ThinkLatent Portal phase 1, P2 waits for a page that asks. Change Priority and Status in place; add rows when a page asks for something new.

## Foundations, shell, navigation, data display

| # | Group | Component | Source | Priority | Status | First used in |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Foundations | Tokens (DTCG; light and dark; comfortable and compact) | ThinkLatent | P0 | Not started | Everything |
| 2 | Foundations | Theme switch (light and dark) | ThinkLatent | P0 | Not started | App shell |
| 3 | Foundations | Density switch (comfortable and compact) | ThinkLatent | P0 | Not started | Engineering view |
| 4 | Foundations | Typography styles | ThinkLatent | P0 | Not started | Everything |
| 5 | Foundations | Icon set (Lucide, two sizes, five status glyphs) | ThinkLatent | P0 | Not started | Status label |
| 6 | Foundations | Formatter library (numbers, intervals, percentages, dates, durations, placeholder) | ThinkLatent | P0 | Not started | Headline tile |
| 7 | Shell and layout | App shell | shadcn | P0 | Not started | Portal |
| 8 | Shell and layout | Sidebar | shadcn | P0 | Not started | Portal |
| 9 | Shell and layout | Page header with breadcrumb | shadcn | P0 | Not started | Overview page |
| 10 | Shell and layout | Top bar | shadcn | P1 | Not started | Portal |
| 11 | Shell and layout | Tabs | shadcn | P1 | Not started | Record page |
| 12 | Shell and layout | Resizable panels | shadcn | P1 | Not started | Workbench |
| 13 | Shell and layout | Scroll area | shadcn | P1 | Not started | Trace panel |
| 14 | Shell and layout | Separator | shadcn | P1 | Not started | Everything |
| 15 | Shell and layout | Stack and grid helpers | ThinkLatent | P1 | Not started | Page template |
| 16 | Navigation | Command palette | shadcn | P1 | Not started | Portal |
| 17 | Navigation | Dropdown menu and context menu | shadcn | P1 | Not started | Data table |
| 18 | Navigation | Keyboard-shortcut help | shadcn | P2 | Not started | Portal |
| 19 | Data display | Headline tile (number, interval, placeholder and status states) | ThinkLatent | P0 | Not started | Overview page |
| 20 | Data display | Data table (sort, filter, resize, virtual rows, density) | shadcn plus TanStack | P0 | Not started | Overview and Record |
| 21 | Data display | Status label (icon, colour, text) | ThinkLatent | P0 | Not started | Everything |
| 22 | Data display | Placeholder cell (unmeasured, with reason) | ThinkLatent | P0 | Not started | Tiles and tables |
| 23 | Data display | Tooltip | shadcn | P0 | Not started | Definitions |
| 24 | Data display | Description list (key and value) | shadcn | P1 | Not started | Record page |
| 25 | Data display | Tree | shadcn | P1 | Not started | Catalogue |
| 26 | Data display | Badge and tag | shadcn | P1 | Not started | Use-case record |
| 27 | Data display | Avatar | shadcn | P1 | Not started | Record header |
| 28 | Data display | Timeline and history list | ThinkLatent | P1 | Not started | Engineering view |
| 29 | Data display | Code block | shadcn | P1 | Not started | Engineering view |
| 30 | Data display | Hover card | shadcn | P1 | Not started | Model catalogue |

## Data display continued, charts, forms, feedback

| # | Group | Component | Source | Priority | Status | First used in |
| --- | --- | --- | --- | --- | --- | --- |
| 31 | Data display | Empty state | shadcn | P1 | Not started | Every list |
| 32 | Data display | Skeleton | shadcn | P1 | Not started | Every page |
| 33 | Data display | Progress | shadcn | P1 | Not started | Build workspace |
| 34 | Data display | Diff view | shadcn | P2 | Not started | Generation deltas |
| 35 | Data display | Kbd | shadcn | P2 | Not started | Shortcut help |
| 36 | Charts | Chart frame (title, caption, source, legend, view-as-table toggle, threshold labels) | ThinkLatent | P0 | Not started | Overview page |
| 37 | Charts | Bar and stacked bar | ThinkLatent wrapper | P0 | Not started | Overview page |
| 38 | Charts | Scatter with thresholds | ThinkLatent wrapper | P0 | Not started | Record page |
| 39 | Charts | Line | ThinkLatent wrapper | P1 | Not started | Usage over time |
| 40 | Charts | Heatmap | ThinkLatent wrapper | P1 | Not started | Index sufficiency map |
| 41 | Charts | Funnel | ThinkLatent wrapper | P1 | Not started | Adoption |
| 42 | Charts | Small multiples | ThinkLatent wrapper | P1 | Not started | Per-model views |
| 43 | Charts | Sparkline | ThinkLatent wrapper | P2 | Not started | Tiles |
| 44 | Charts | Distribution with whiskers | ThinkLatent wrapper | P2 | Not started | Score intervals |
| 45 | Forms and input | Field (label, help, error) | shadcn | P1 | Not started | Onboarding |
| 46 | Forms and input | Input | shadcn | P1 | Not started | Onboarding |
| 47 | Forms and input | Textarea | shadcn | P1 | Not started | Onboarding |
| 48 | Forms and input | Select and combobox | shadcn | P1 | Not started | Filters |
| 49 | Forms and input | Checkbox | shadcn | P1 | Not started | Filters |
| 50 | Forms and input | Radio group | shadcn | P1 | Not started | Onboarding |
| 51 | Forms and input | Switch | shadcn | P1 | Not started | Engineering toggle |
| 52 | Forms and input | Slider | shadcn | P1 | Not started | Thresholds |
| 53 | Forms and input | Date picker | shadcn | P1 | Not started | Filters |
| 54 | Forms and input | File upload | shadcn | P2 | Not started | Contribution flow |
| 55 | Forms and input | Search | shadcn | P1 | Not started | Catalogue |
| 56 | Forms and input | Form layout | shadcn | P1 | Not started | Onboarding |
| 57 | Feedback and overlay | Dialog | shadcn | P1 | Not started | Approvals |
| 58 | Feedback and overlay | Alert dialog | shadcn | P1 | Not started | Withdraw endpoint |
| 59 | Feedback and overlay | Sheet and drawer | shadcn | P1 | Not started | Record detail |
| 60 | Feedback and overlay | Popover | shadcn | P1 | Not started | Definitions |

## Feedback continued, governance, engineering view, AI elements, utilities

| # | Group | Component | Source | Priority | Status | First used in |
| --- | --- | --- | --- | --- | --- | --- |
| 61 | Feedback and overlay | Toast | shadcn | P1 | Not started | Save and submit |
| 62 | Feedback and overlay | Alert and banner | shadcn | P1 | Not started | Grace policy notices |
| 63 | Feedback and overlay | Confirmation | shadcn | P1 | Not started | Approvals |
| 64 | Governance and record | Record header (who, what, when, why) | ThinkLatent | P0 | Not started | Record page |
| 65 | Governance and record | Decision card | ThinkLatent | P1 | Not started | Use-case record |
| 66 | Governance and record | Approval stepper | ThinkLatent | P1 | Not started | Usage approval |
| 67 | Governance and record | Audit and history list | ThinkLatent | P1 | Not started | Engineering view |
| 68 | Governance and record | Threshold table | ThinkLatent | P1 | Not started | Every exhibit |
| 69 | Governance and record | Policy citation | ThinkLatent | P2 | Not started | Thresholds |
| 70 | Engineering view | Engineering toggle (layer over the business view) | ThinkLatent | P0 | Not started | Every page |
| 71 | Engineering view | Trace panel | shadcn Trace | P1 | Not started | Use-case page |
| 72 | Engineering view | Raw JSON viewer | shadcn Code block | P1 | Not started | Use-case page |
| 73 | Engineering view | Log view | ThinkLatent | P1 | Not started | Use-case page |
| 74 | AI elements | Chat and message | shadcn AI Elements | P2 | Not started | Agent library |
| 75 | AI elements | Prompt input | shadcn AI Elements | P2 | Not started | Agent library |
| 76 | AI elements | Reasoning | shadcn AI Elements | P2 | Not started | Agent library |
| 77 | AI elements | Tool call | shadcn AI Elements | P2 | Not started | Agent library |
| 78 | AI elements | Sources and inline citation | shadcn AI Elements | P2 | Not started | Agent library |
| 79 | AI elements | Model selector | shadcn AI Elements | P2 | Not started | Workbench |
| 80 | AI elements | Plan and task | shadcn AI Elements | P2 | Not started | Agent library |
| 81 | AI elements | Subagent | shadcn AI Elements | P2 | Not started | Agent library |
| 82 | AI elements | Test results | shadcn AI Elements | P2 | Not started | Harness view |
| 83 | AI elements | Confirmation and checkpoint | shadcn AI Elements | P2 | Not started | Agent library |
| 84 | Utilities | Copy button | shadcn | P1 | Not started | Ids and hashes |
| 85 | Utilities | Relative time | ThinkLatent | P1 | Not started | Record header |

Not in the kit: marketing and landing patterns, carousels, rich text editors, maps, and anything no ThinkLatent page has asked for.
