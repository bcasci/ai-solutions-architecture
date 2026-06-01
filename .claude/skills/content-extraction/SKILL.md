---
name: content-extraction
description: "Extracts and inventories educational or technical content from a scraped web page into a standardized markdown inventory record. Use when processing content from any browsed or scraped web page — training courses, documentation, tutorials, blog posts — that needs to be captured with topic tags, importance ratings, code examples, key concepts, patterns, and gotchas for later synthesis into solutions guide pages. Activates during content scraping workflows, inventory building, or when the agent has page content that needs structured capture before writing guide pages."
compatibility: Designed for Claude Code. Requires file write access.
metadata:
  author: solutions-architecture
  version: "1.0"
---

# Content Extraction

Extract content from a scraped web page into a standardized inventory record and append it to `tmp/content-inventory.md`.

## Procedure

1. Identify the page metadata: source name, page title, URL, section/module position if applicable
2. Extract content into the categories below
3. Assign topic tags from the tag list (see [references/topic-tags.md](references/topic-tags.md))
4. Rate importance 1-5
5. Append the record to `tmp/content-inventory.md` (create the file if it doesn't exist)

## Extraction Categories

### Key Concepts
Every distinct concept on the page. One sentence each, precise technical language. Not summaries — specific facts.

### Code Examples
Every code snippet, verbatim. Note the language and what it demonstrates. Flag incomplete snippets that depend on prior context.

### Patterns & Best Practices
Recommended approaches, dos/don'ts, architectural guidance. These are the highest-value content for the solutions guide.

### Gotchas & Warnings
Common mistakes, limitations, edge cases. Things a builder would hit and waste time on.

### Diagrams & Images
Analyze any diagrams, architecture visuals, flowcharts, or concept maps on the page. Describe what the diagram shows — the components, relationships, data flows, or decision paths. If the diagram contains information not covered in the page text, flag it as unique visual content. Save or reference the image source if possible.

### External References
Links to docs, repos, tools, or other resources mentioned on the page.

## Importance Rating

- **5** — Core concept, must include in guide
- **4** — Important, strong candidate
- **3** — Useful, include if fits naturally
- **2** — Supplementary, sidebar or note
- **1** — Low value, skip unless needed for completeness

## Output Format

```markdown
---

## [Page Title]

**Source:** [Source Name] > [Section] > [Page Title]
**URL:** [page URL]
**Tags:** `tag1`, `tag2`, `tag3`
**Importance:** [1-5]

### Key Concepts
- [concept]

### Code Examples

\`\`\`[language]
[verbatim code]
\`\`\`
_Demonstrates: [what this shows]_

### Patterns & Best Practices
- [pattern]

### Gotchas & Warnings
- [gotcha]

### Diagrams & Images
- [description of diagram: components, relationships, flows]
- _Source: [image URL or screenshot reference]_

### External References
- [description](url)

### Notes
[Dependencies on other content, quality observations, gaps]
```

## Rules

- Extract ALL substantive content — do not summarize away details. Distillation happens later during page writing.
- Preserve technical accuracy — exact parameter names, method signatures, model names.
- Code examples must be verbatim, not paraphrased.
- If a page is mostly filler, say so in Notes and rate importance accordingly.
- If content references concepts from other pages, note the dependency in Notes.
- If a topic tag doesn't exist for the content, propose a new one in Notes.
- Skip video players — the page text covers their content.
- DO analyze diagram images, architecture visuals, and concept maps — these often contain information not in the text.
