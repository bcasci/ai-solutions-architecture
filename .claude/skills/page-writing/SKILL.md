---
name: page-writing
description: "Synthesizes raw content inventory entries into a polished, practical MDX solutions guide page with runnable code examples, callouts, diagrams, and cross-references. Use when creating or rewriting a solutions guide page from content inventory entries that have been mapped to a specific topic or site section. Activates during the page writing phase of the content pipeline, after content extraction and mapping are complete. Produces pages that follow the project's page template, writing voice, and file conventions. After writing, the content-evaluation skill should be used to score the result."
compatibility: Designed for Claude Code. Requires file write access. Benefits from context7 MCP for verifying API details against current Anthropic docs.
metadata:
  author: solutions-architecture
  version: "1.0"
---

# Page Writing

Synthesize content inventory entries into an MDX guide page. Save to the correct location. Prompt for evaluation after.

## Procedure

1. Identify the page to write from the site map in `PLAN.md`
2. Read `tmp/content-inventory.md` and filter entries tagged for this topic
3. Check for existing related pages to avoid duplication and ensure cross-linking
4. Consult Anthropic public docs (via context7 if available) for accuracy and completeness
5. Write the page using the template in [assets/page-template.mdx](assets/page-template.mdx)
6. Save to `src/content/[section]/[page-slug].mdx`
7. Inform the user to run the content-evaluation skill on the result

## File Location Convention

```
src/content/start-here/       → "Start Here" section
src/content/foundations/       → "Foundations" section
src/content/patterns/          → "Patterns" section
src/content/agents/            → "Agents" section
src/content/production/        → "Production" section
src/content/recipes/           → "Recipes" section
src/content/reference/         → "Reference" section
```

## Writing Voice

- Direct, practical, confident
- Write for builders who code 8 hours a day
- "Here's how" not "In this section, we'll explore how"
- "You" not "we" or "one"
- Active voice always
- State facts. Show code. Explain tradeoffs. Move on.

## Content Rules

- Lead with the most important information
- Code examples within the first scroll of each major section
- Python as primary language, TypeScript where relevant
- Every example must be runnable (include imports, setup)
- Minimal examples — show the concept, not a production app
- Use Mermaid diagrams for complex flows instead of text walls
- Max 2-3 callout boxes (tip/warning) per page
- Headings should be scannable — a reader should understand the page from headings alone

## Kill List (never write these)

- "As you can see" / "Let's take a look" / "It's worth noting"
- "Claude was developed by..." (history lessons)
- "This powerful feature enables you to..." (motivational framing)
- "In this section, we will..." (narrator voice)
- Paragraphs that restate what the code example already shows

## Length Targets

- Standard pages: 800-1500 words (excluding code blocks)
- Recipes: 300-600 words
- If a page exceeds 2000 words, split it

## After Writing

Tell the user:
```
Page written to [file path].
Run content-evaluation on this file to score it against the quality rubric.
```

## Gotchas

- Never copy sentences verbatim from source material — always synthesize.
- Always include at least one runnable code example (except glossary/reference pages).
- Always include a "Related" section with internal and external links.
- Set `lastVerified` in frontmatter to today's date.
- If source material is insufficient for a complete page, note the gaps explicitly rather than padding with filler.
- Check model names and API parameters against current docs — training content may be outdated.
