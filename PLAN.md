# Solutions Architecture Site — Project Plan

## Vision

A topic-based solutions guide for builders using Anthropic's Claude. Not a course mirror — a practical, well-organized reference that shows patterns, strategies, and best practices. Quick-start oriented. No bullshit.

## Audience

Developers and teams building with Anthropic who want to get things done fast. They want patterns, code, and the "why" — not lectures.

## Source Material

Content scraped from [Anthropic Skilljar](https://anthropic.skilljar.com/), distilled, reorganized by topic, and enriched with external references (Anthropic docs, agentskills.io, cookbooks, etc.).

### Skilljar Entry Point

- Profile/start page: <https://anthropic.skilljar.com/accounts/profile/?next=/>

### Courses

| Course                       | URL                                                            |
| ---------------------------- | -------------------------------------------------------------- |
| Building with the Claude API | <https://anthropic.skilljar.com/claude-with-the-anthropic-api> |
| Claude Code in Action        | <https://anthropic.skilljar.com/claude-code-in-action>         |
| Introduction to Agent Skills | <https://anthropic.skilljar.com/introduction-to-agent-skills>  |

## Future Direction

The site is designed to eventually become provider-agnostic ("here's the pattern, here's how to do it with Claude / with open models / etc."). For v1, Claude-only — but the information architecture leaves room for expansion.

URL structure supports this: `/patterns/rag/` (concept) → `/patterns/rag/claude/` (implementation).

---

## Site Map (v2)

```
/
├── Start Here
│   ├── Quick Setup (API key, SDK install, first call — 60 seconds)
│   └── Choose Your Path (API / Claude Code / Agent SDK — decision tree)
│
├── Foundations
│   ├── Messages API
│   ├── Models & When to Use Which
│   ├── System Prompts & Prompt Design
│   ├── Streaming
│   └── Structured Output (Tool Use & JSON)
│
├── Patterns
│   ├── RAG (Retrieval-Augmented Generation)
│   ├── Multi-turn Conversations
│   ├── Tool Orchestration
│   ├── Classification & Routing
│   ├── Extraction & Transformation
│   └── Evaluation & Testing
│
├── Agents
│   ├── Agent Architecture (loops, memory, planning)
│   ├── Building with Agent SDK
│   ├── Tool Design
│   ├── Multi-Agent Systems
│   └── Claude Code as Platform
│
├── Production
│   ├── Error Handling & Retries
│   ├── Rate Limits & Scaling
│   ├── Safety & Guardrails
│   ├── Cost Optimization
│   └── Monitoring & Observability
│
├── Recipes (short, copy-paste solutions)
│   ├── Summarize a Document
│   ├── Build a Chatbot
│   ├── Analyze a CSV
│   ├── Generate & Review Code
│   └── [expanded from Skilljar content]
│
└── Reference
    ├── API Quick Ref
    ├── Glossary
    └── Links (docs, agentskills.io, cookbooks, GitHub repos)
```

---

## Design Direction

- **Clean, minimal content area** — max readability, generous whitespace, excellent typography
- **Creative header/hero** — bold, distinctive. Decorative SVG elements (geometric patterns, node/connection graphics, abstract waveforms). Color accent without overwhelming.
- **Dark sidebar, light content** — clear navigation hierarchy
- **Inspiration**: Stripe docs meets Vercel design language, with its own identity
- **Dark mode** — developers expect it
- 2-3 header concepts to be proposed during design phase

---

## Tech Stack

- Astro 6.x + MDX
- Tailwind CSS v4 + @tailwindcss/typography
- Pagefind (static search — to be added)
- Mermaid (architecture diagrams in MDX)
- Node.js 22.16.0

---

## Workflow

### Phase 0: Tooling (complete)

- [x] Write project plan
- [x] Build content-extraction skill
- [x] Build content-evaluation skill
- [x] Build page-writing skill

### Phase 1: Content Extraction (complete)

- [x] User logs into Skilljar via Playwright browser
- [x] Navigate to each course URL and map the full structure
- [x] Produce a course sitemap and get approval before scraping
- [x] Scrape each lesson page and capture into standardized inventory records
- [x] All inventory records written to `tmp/content-inventory.md`
- [x] Review inventory for completeness — all content pages covered

#### Results

- 110 pages scraped across 3 courses
- 85 pages with extractable text content (349K chars), 25 video-only
- 86 inventory records in `tmp/content-inventory.md`
- 100% coverage — every content page has an inventory record
- Course 3 (Agent Skills) uses a different page layout (`#lesson-main-content` vs hidden details pane) — initial scrape missed it, re-scraped with corrected selector
- Diagram images are presentation slides — illustrative only, no unique info beyond text
- Raw page captures stored in `tmp/snapshots/*.json`
- New topic tags proposed: `extended-thinking`, `files-api`, `parallelization`, `claude-code-commands`, `hooks`, `ci-cd`

### Phase 2: Content Mapping (main session)

- [ ] Map each inventory record to one or more site map sections (tag-based)
- [ ] Produce a mapping table: site section → inventory records → proposed page(s)
- [ ] Identify gaps — site sections with zero or insufficient coverage
- [ ] Identify redundancy — overlapping content across courses (e.g., Claude Code in both Course 1 and 2)
- [ ] Plan gap-filling strategy (fetch current Anthropic docs, cookbooks, public references)
- [ ] Adjust site map if needed (add/remove/merge sections based on actual coverage)
- [ ] Finalize the page list with section assignments and source inventory references

#### Known Gaps (from Phase 1)

- **Production section**: zero inventory coverage — courses don't cover error handling, rate limits, safety, cost, or monitoring
- **Agent SDK**: Course 3 covers skills but not the Agent SDK itself — source from docs and cookbooks
- **Multi-Agent Systems**: not covered in any course
- **Classification (as a pattern)**: only routing workflow exists, not dedicated classification content
- **Start Here / Recipes / Reference**: will be authored during writing, not extracted

### Phase 3: Writing (parallel subagents)

Dispatch pages to background subagents in batches of 4-5 pages each. Each subagent independently:

- [ ] Reads the relevant inventory entries for its assigned pages
- [ ] Synthesizes each page with runnable code examples, callouts, diagrams, and cross-references
- [ ] Scores each page against the quality rubric to determine SHIP/REVISE/REWRITE
- [ ] Revises and re-scores until the page ships
- [ ] Verifies accuracy against current Anthropic docs
- [ ] Adds external links and references

Main session coordinates dispatch, monitors progress, and handles any pages that need manual intervention. Start Phase 4 design work while writing subagents run in background.

#### Subagent Batching Strategy

- Group pages by site section so each subagent has thematic coherence
- ~5-6 subagents covering all pages
- Each subagent prompt includes: page list, inventory file path, site map for cross-linking, skill activation language
- Gap-fill pages (Production, Agent SDK) get their own subagent with explicit instructions to source from Anthropic docs via context7

### Phase 4: Design & Polish (main session + parallel where possible)

- [ ] Design header/hero concepts
- [ ] Build component library (callouts, code blocks, diagrams)
- [ ] Navigation sidebar
- [ ] Search (Pagefind)
- [ ] Mobile responsive
- [ ] Dark mode

### Phase 5: Review & Ship (main session)

- [ ] Full content review pass
- [ ] Cross-link audit (are related topics linked?)
- [ ] Verify production build works locally

---

## Git Strategy

Initialize git if not already done. Make logical commits at natural milestones — each commit should represent a coherent, reviewable unit of work. Suggested commit points:

1. After Phase 2 mapping is finalized and site map is adjusted
2. After each batch of content pages lands (per site section)
3. After component library and page layout are built
4. After navigation and search are added
5. After dark mode and responsive layout
6. After final review pass

Use descriptive commit messages that explain the "what and why." Don't commit broken builds.

---

## Content Pipeline

Three stages, each backed by a skill in `.claude/skills/`:

1. **Extract** — capture web page content into standardized inventory records with topic tags, importance ratings, code examples, key concepts, patterns, and gotchas
2. **Write** — synthesize inventory entries into polished MDX guide pages with runnable examples, callouts, diagrams, and cross-references
3. **Evaluate** — score pages against a quality rubric covering completeness, accuracy, conciseness, actionability, code quality, cross-linking, and structure to produce SHIP/REVISE/REWRITE verdicts

---

## Open Questions

- Deployment target (GitHub Pages / Vercel / Cloudflare) — decide later, no impact on architecture
- Additional Skilljar courses to add over time
- Competitive positioning (Claude vs others) — deferred to future provider-agnostic expansion
- Course 3 (Agent Skills) content extracted — covers skills deeply but not the broader Agent SDK
- Production section has zero Skilljar coverage — will need dedicated research from Anthropic docs
- New topic tags added to `references/topic-tags.md` (extended-thinking, files-api, parallelization, claude-code-commands, hooks, ci-cd, skills-authoring)
