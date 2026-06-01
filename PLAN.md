# Solutions Architecture Site — Project Plan

## Vision

A topic-based solutions guide for builders using Anthropic's Claude. Not a course mirror — a practical, well-organized reference that shows patterns, strategies, and best practices. Quick-start oriented. No bullshit.

## Audience

Developers and teams building with Anthropic who want to get things done fast. They want patterns, code, and the "why" — not lectures.

## Source Material

Content scraped from Anthropic Skilljar (https://anthropic.skilljar.com/):

- **Building with the Claude API**
- **Claude Code in Action**
- **Introduction to Agent Skills**

Content is distilled, reorganized by topic, and enriched with external references (Anthropic docs, agentskills.io, cookbooks, etc.).

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

### Phase 0: Tooling (current)
- [x] Write project plan
- [ ] Build content evaluation skill (rubric-based prompt for scoring/critiquing draft pages)

### Phase 1: Content Extraction
- [ ] Log into Skilljar (user assists with auth)
- [ ] Scrape all 3 courses systematically using Playwright
- [ ] Produce content inventory (markdown file: every piece of content, source, topic tags, importance)

### Phase 2: Content Mapping (Plan Mode)
- [ ] Map extracted content → site sections
- [ ] Identify gaps (topics courses skip that builders need)
- [ ] Identify redundancy (same concept repeated across courses)
- [ ] Finalize section assignments

### Phase 3: Writing
- [ ] Write each page — synthesized, not copied
- [ ] Run evaluation skill on each page
- [ ] Revise based on evaluation
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

## Content Evaluation Rubric

Each page is scored on these criteria (built into evaluation skill):

| Criterion | Description |
|---|---|
| **Completeness** | Covers everything from source material on this topic |
| **Accuracy** | Cross-referenced against Anthropic public docs |
| **Conciseness** | No filler, respects reader's time |
| **Actionability** | Reader knows what to DO after reading |
| **Code Quality** | Examples are correct, minimal, and runnable |
| **Cross-linking** | Links to related topics and external references |
| **Structure** | Logical flow, scannable headings, good use of lists/tables |

---

## Open Questions

- Deployment target (GitHub Pages / Vercel / Cloudflare) — decide later, no impact on architecture
- Additional Skilljar courses to add over time
- Competitive positioning (Claude vs others) — deferred to future provider-agnostic expansion
