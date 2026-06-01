---
name: prose-audit
description: "Scans content for filler words, hedging, unsubstantiated claims, and redundancy. Produces a line-level issue list with specific replacements or deletions. Use after writing or revising content to tighten prose before shipping. Activates when auditing prose quality, cutting filler, removing noise, or tightening language across one or more MDX content pages."
compatibility: Designed for Claude Code. Requires file read access.
metadata:
  author: solutions-architecture
  version: "1.0"
---

# Prose Audit

Scan content pages for filler, noise, and unsubstantiated claims. Produce a line-level edit list.

## When to Use

Run this after content-evaluation scores a page, or after a batch of pages have been written/revised. Content-evaluation judges _what's on the page_. Prose audit judges _how it's said_ — sentence by sentence.

## Principles

1. **Delete filler, don't replace it.** "Simple keyword search" -> "Keyword search". Don't swap one adjective for another.
2. **Kill unsubstantiated claims.** "A complete support agent" -> "A support agent". If you can't prove it, don't say it.
3. **Cut hedging.** "In practice," "In general," "typically" — remove unless the hedge distinguishes a common case from an edge case.
4. **Remove redundancy.** If the code shows it, the prose doesn't need to repeat it. If the heading says it, the first sentence doesn't need to restate it.
5. **Preserve voice.** The site has personality ("dead silence", "scratch paper"). Cut noise, not character. Informal is fine; unsubstantiated is not.

## Procedure

1. **Determine scope.** If a specific file is given, audit that file. If no file is given, audit all MDX files in `src/content/docs/`.
2. **Read each file** and scan every prose line (skip code blocks, frontmatter, and import statements).
3. **Flag issues** using the pattern categories below. Record the file path, line number, the problematic text, and the recommended fix (replacement or deletion).
4. **Output the audit** in the format below.
5. **Do NOT apply edits automatically.** Present the findings for review first. Edits are applied in a separate step after the user approves.

## Pattern Categories

### Filler Words & Phrases

Words that add length without meaning. Delete them.

| Pattern                                             | Example                   | Fix                                  |
| --------------------------------------------------- | ------------------------- | ------------------------------------ |
| "simple/simply" (when not contrasting with complex) | "Simple keyword search"   | "Keyword search"                     |
| "just" (minimizer)                                  | "just pass the parameter" | "pass the parameter"                 |
| "basically/essentially/actually/really"             | "essentially a wrapper"   | "a wrapper"                          |
| "very/quite/rather/somewhat"                        | "very important"          | "important"                          |
| "in order to"                                       | "in order to connect"     | "to connect"                         |
| "a number of"                                       | "a number of issues"      | "several issues" or a specific count |
| "the fact that"                                     | "due to the fact that"    | "because"                            |
| "it should be noted that"                           | —                         | Delete entire phrase                 |
| "as mentioned earlier/above"                        | —                         | Delete or link directly              |

### Hedging (remove unless meaningful)

Hedges that don't distinguish common from edge cases.

| Pattern                        | When to cut               | When to keep                                    |
| ------------------------------ | ------------------------- | ----------------------------------------------- |
| "In practice,"                 | Opening filler            | When contrasting with theory                    |
| "In general,"                  | Opening filler            | When listing exceptions next                    |
| "typically/usually/often"      | Vague softener            | When the next sentence covers the atypical case |
| "can/may/might" (triple hedge) | "This can sometimes help" | "This may fail if X" (real caveat)              |
| "tends to"                     | "tends to be faster"      | Keep if benchmarked                             |

### Unsubstantiated Claims

Superlatives and absolutes without evidence. Downgrade or delete.

| Pattern                                | Example                       | Fix                                  |
| -------------------------------------- | ----------------------------- | ------------------------------------ |
| "complete/comprehensive/full"          | "A complete guide"            | "A guide"                            |
| "dramatically/significantly/vastly"    | "dramatically improves"       | "improves" or cite a number          |
| "perfectly/exactly"                    | "demonstrates this perfectly" | "demonstrates this"                  |
| "always/never" (unless literally true) | "always outperforms"          | "often outperforms" or cite evidence |
| "the best/the most"                    | "the best approach"           | "a strong approach" or justify       |
| "every major"                          | "every major pattern"         | "patterns from across"               |
| "consistently outperforms"             | —                             | "often beats" unless benchmarked     |

### Redundancy

Information stated twice in different forms.

| Pattern                                           | Example                                                                    | Fix                                      |
| ------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------- |
| Heading + first sentence restatement              | Heading: "Budget Sizing" / First line: "This section covers budget sizing" | Cut the first line                       |
| Code + prose duplication                          | Code shows a loop; prose says "the code loops through"                     | Cut the prose                            |
| Summary after code block                          | "The flow: discover tools, pass them..." when the code just showed this    | Delete the summary                       |
| "Development workflow:" followed by obvious steps | —                                                                          | Delete if steps are visible from context |
| Double instruction                                | "Copy and paste the script. Set API_KEY and run."                          | "Set API_KEY and run."                   |

## Output Format

```markdown
# Prose Audit: [scope description]

**Files scanned:** [count]
**Issues found:** [count]

## Issues by File

### [file path]

| Line | Category   | Current Text                  | Recommended Fix          |
| ---- | ---------- | ----------------------------- | ------------------------ |
| L9   | filler     | "Simple keyword search"       | "Keyword search"         |
| L42  | claim      | "dramatically improves"       | "improves"               |
| L118 | hedge      | "In practice, adjusting"      | "Adjusting"              |
| L200 | redundancy | "The flow: discover tools..." | Delete (code shows this) |

### [next file]

...

## Summary

| Category               | Count |
| ---------------------- | ----- |
| Filler                 | X     |
| Hedging                | X     |
| Unsubstantiated claims | X     |
| Redundancy             | X     |
| **Total**              | **X** |
```

## Applying Edits

After the user reviews the audit, apply approved edits using the Edit tool. Work file by file, top to bottom. For deletions, remove the text and any resulting double-spaces or orphaned punctuation.

## Gotchas

- **Don't over-trim.** Informal voice is a feature. "Dead silence" and "scratch paper" are personality, not filler.
- **Don't flag technical hedges.** "This may fail if the server is unreachable" is a real caveat, not noise.
- **Don't count code comments.** Only audit prose (paragraphs, callouts, list items, frontmatter descriptions).
- **Context matters for "simple".** "Simple" is filler when describing something already shown to be simple. It's meaningful when contrasting: "Start with a simple approach before adding complexity."
- **Don't flag the same pattern in code blocks.** Docstrings are fair game; inline code comments are not.
- **Line numbers shift after edits.** When presenting the audit, use the line numbers from the _original_ file. When applying edits, re-read the file first.
