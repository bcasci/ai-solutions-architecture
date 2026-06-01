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

| Course | URL |
| --- | --- |
| Building with the Claude API | <https://anthropic.skilljar.com/claude-with-the-anthropic-api> |
| Claude Code in Action | <https://anthropic.skilljar.com/claude-code-in-action> |
| Introduction to Agent Skills | <https://anthropic.skilljar.com/introduction-to-agent-skills> |

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
- [x] Build content-extraction skill (standardized inventory capture from any web page)
- [x] Build content-evaluation skill (7-criterion quality rubric with SHIP/REVISE/REWRITE verdicts)
- [x] Build page-writing skill (MDX synthesis with template, style guide, and conventions)

### Phase 1: Content Extraction

- [ ] User logs into Skilljar via Playwright browser (auth-gated, requires manual login)
- [ ] Navigate to each course URL and map the full structure (modules, lessons, sub-pages)
- [ ] Produce a course sitemap before extracting content (confirms scope, identifies lesson count)
- [ ] Scrape each lesson page using Playwright, then run the content-extraction skill on each
- [ ] All inventory records appended to `tmp/content-inventory.md`
- [ ] Review inventory for completeness — verify all lessons captured

#### Scraping Strategy

1. Start at the profile page: <https://anthropic.skilljar.com/accounts/profile/?next=/>
2. Navigate to each course URL (see table above)
3. On each course page, identify and follow all module/lesson links
4. For each lesson: capture the page content, then process through content-extraction skill
5. Repeat until all lessons across all 3 courses are inventoried

#### Content Handling

- **Videos:** Skip. The page text covers their content.
- **Diagram images:** Analyze. Architecture visuals, flowcharts, and concept maps often contain information not in the text. Describe components, relationships, and flows.
- **Parallelism:** Playwright browses pages sequentially (single browser). Content extraction processing can be parallelized via subagents after page capture.

### Phase 2: Content Mapping

- [ ] Map extracted content → site sections
- [ ] Identify gaps (topics courses skip that builders need)
- [ ] Identify redundancy (same concept repeated across courses)
- [ ] Finalize section assignments

### Phase 3: Writing

- [ ] Write each page — synthesized, not copied
- [ ] Run content-evaluation skill on each page
- [ ] Revise based on evaluation until verdict is SHIP
- [ ] Cross-reference with Anthropic public docs for accuracy
- [ ] Add external links and references

### Phase 4: Design & Polish

- [ ] Design header/hero concepts
- [ ] Build component library (callouts, code blocks, diagrams)
- [ ] Navigation sidebar
- [ ] Search (Pagefind)
- [ ] Mobile responsive
- [ ] Dark mode

### Phase 5: Review & Ship

- [ ] Full content review pass
- [ ] Cross-link audit (are related topics linked?)
- [ ] Deploy

---

## Content Pipeline Skills

The evaluation rubric, extraction format, and page writing conventions are defined in the skills — not duplicated here. See:

- `.claude/skills/content-extraction/SKILL.md` — inventory capture format and topic tags
- `.claude/skills/content-evaluation/SKILL.md` — 7-criterion rubric and SHIP/REVISE/REWRITE verdicts
- `.claude/skills/page-writing/SKILL.md` — page template, writing voice, and conventions

---

## Open Questions

- Deployment target (GitHub Pages / Vercel / Cloudflare) — decide later, no impact on architecture
- Additional Skilljar courses to add over time
- Competitive positioning (Claude vs others) — deferred to future provider-agnostic expansion
