---
name: ux-evaluation
description: "Evaluates a page or component against UX heuristics for a developer documentation site. Produces scored assessments with specific issues and actionable fixes. Use before implementing visual changes, after building new layouts or components, or when reviewing page structure and styling. Activates when evaluating design decisions, auditing readability, checking dark/light mode, reviewing navigation patterns, or assessing information hierarchy. Covers scannability, visual hierarchy, consistency, responsiveness, dark mode, and pattern appropriateness."
compatibility: Designed for Claude Code. Requires file read access and Playwright MCP for visual verification.
metadata:
  author: solutions-architecture
  version: "1.0"
---

# UX Evaluation

Evaluate a page or component against 6 UX criteria specific to this developer documentation site. Produce a verdict and actionable fixes.

## Context

This site is a solutions guide for developers building with Claude. The audience scans quickly, wants code and decisions, not prose. The site uses Astro + Tailwind CSS v4 with a dark sidebar and light/dark content area. All design must work in both `prefers-color-scheme: light` and `dark`.

## Procedure

1. Identify what is being evaluated (page, component, layout change)
2. Take Playwright screenshots in both dark and light mode if visual
3. Score each criterion 1-5 using the rubric below
4. Determine verdict based on thresholds
5. List specific issues with actionable fixes
6. Output the evaluation in the format below

## Rubric

### 1. Scannability (1-5)
Can a developer find what they need in under 10 seconds?

- **5** = Clear headings, visual anchors, scannable structure. Key info is above the fold.
- **3** = Structure exists but requires reading to navigate. Some visual noise.
- **1** = Wall of text or undifferentiated content. No clear entry points.

**Key questions:** Is there a clear visual hierarchy? Can you skip to the relevant section? Are headings descriptive (not generic)?

### 2. Pattern Appropriateness (1-5)
Is the right UI pattern used for the information type?

- **5** = Pattern matches data shape perfectly. No simpler alternative exists.
- **3** = Pattern works but a simpler one would serve equally well.
- **1** = Pattern actively misrepresents the data or adds unnecessary complexity.

**Decision guide:**
- Ordered list of options with clear priority → numbered list or stepped ladder
- Side-by-side comparison of 2-4 options → table
- Binary choice → two bullet points or two-column layout
- Navigation index → single-column list with headings
- Branching decision with 3-4 questions → flowchart
- Branching decision with 5+ questions → NOT a flowchart (use criteria list)
- Dashboard of peer items with rich content → cards
- Dashboard of peer items with only text → NOT cards (use list)

### 3. Visual Hierarchy (1-5)
Do size, weight, color, and spacing communicate importance correctly?

- **5** = Primary content dominates. Secondary content supports without competing. Whitespace guides the eye.
- **3** = Hierarchy exists but some elements compete for attention or are under-differentiated.
- **1** = Everything looks the same weight, or decorative elements overpower content.

**Key questions:** Can you tell what's most important without reading? Do colors communicate meaning or are they decorative? Is there enough contrast between heading levels?

### 4. Dark/Light Mode Parity (1-5)
Does the design work equally well in both color schemes?

- **5** = Both modes are intentionally designed. Contrast ratios meet WCAG AA. No elements disappear or become unreadable.
- **3** = One mode works well, the other has minor contrast or styling issues.
- **1** = One mode is broken — unreadable text, invisible borders, clashing colors.

**Key questions:** Do all text elements have both light and `dark:` variants? Are borders visible in both modes? Do backgrounds provide sufficient contrast with text?

### 5. Consistency (1-5)
Does this match the patterns used elsewhere on the site?

- **5** = Uses the same spacing, typography, color, and component patterns as the rest of the site.
- **3** = Mostly consistent but introduces a new pattern without clear justification.
- **1** = Looks like a different site. New colors, spacing, or patterns with no precedent.

**Key questions:** Does this use the same heading styles as content pages? Are interactive elements styled like elsewhere? Does the color palette stay within the site's established tokens?

### 6. Mobile Readability (1-5)
Does the layout work when the sidebar is hidden on small screens?

- **5** = Content reflows naturally. No horizontal scroll. Touch targets are adequate. Navigation is accessible.
- **3** = Mostly works but some elements (tables, diagrams) overflow or are cramped.
- **1** = Layout breaks. Content is inaccessible or requires horizontal scrolling.

**Key questions:** Are tables horizontally scrollable? Do cards/grids stack to single column? Is text readable without zooming?

## Verdict Thresholds

- **SHIP** — All criteria score 4+. No individual score below 3.
- **REVISE** — Average score 3+, but one or more criteria score 2 or below. Fix the specific issues.
- **REDESIGN** — Average score below 3, or Pattern Appropriateness scores 1. The approach is wrong, not just the execution.

## Output Format

```
## UX Evaluation: [page/component name]

| Criterion | Score | Notes |
|-----------|-------|-------|
| Scannability | X/5 | ... |
| Pattern Appropriateness | X/5 | ... |
| Visual Hierarchy | X/5 | ... |
| Dark/Light Mode Parity | X/5 | ... |
| Consistency | X/5 | ... |
| Mobile Readability | X/5 | ... |

**Average:** X.X/5
**Verdict:** SHIP / REVISE / REDESIGN

### Issues
1. [specific issue] → [actionable fix]
2. ...

### What works
- ...
```

## Anti-Patterns Reference

Common UX mistakes this rubric is designed to catch:

| Anti-pattern | Why it fails | Better alternative |
|---|---|---|
| Cards for text-only lists | Adds visual weight without information. Creates height inconsistency. | Single-column list with section headings |
| Rainbow color coding with no semantic meaning | Decorative, not functional. Creates visual noise. | Single accent color, or colors that map to a system |
| Monolithic flowcharts (5+ decisions) | Too crowded, poor mobile rendering | Criteria list, stepped ladder, or table |
| Light-mode-only styling | Breaks for ~50% of developer users | Always add `dark:` variants |
| Duplicating navigation (sidebar + page content showing same info) | Redundant, wastes space | Each nav element serves a distinct purpose |
| Page-level TOC when section nav is more useful | Wrong granularity — users need to navigate between pages, not within them | Section nav ("In this section") |
