---
description: Rules for writing and editing MDX content pages
globs: ["src/content/docs/**/*.mdx"]
---

# Content Page Rules

## Cross-reference, don't re-explain
When a concept is covered in depth on another page, link to it rather than re-explaining. Example: MCP pages reference `/the-api/tool-use` for the tool_use protocol instead of re-explaining tool_use/tool_result blocks.

## Verify links after editing
Run `npm run check-links` after adding or changing internal links. Cross-link validation is also covered by Playwright tests.

## Callout component
Import and use the Callout component for tips, warnings, and notes:
```mdx
import Callout from '../../../components/Callout.astro';

<Callout type="tip">Content here</Callout>
```
Types: `tip` (green), `warning` (amber), `info` (blue). All have dark mode support.

## Tone
- Practical, no bullshit — working code over theory
- Explain the "why" briefly, then show the "how" with runnable examples
- Don't re-explain Claude basics on every page — link to earlier sections
- Use "you" not "we" or "one"
