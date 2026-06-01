---
name: content-evaluation
description: "Evaluates a draft solutions guide page against a 7-criterion quality rubric and produces a scored assessment with specific issues and actionable revision instructions. Use after writing or revising any content page for the solutions architecture guide to determine whether it should ship, be revised, or be rewritten. Activates when reviewing page quality, checking content completeness against the inventory, scoring draft pages, or running the evaluation step in the write-evaluate-revise loop. The rubric covers completeness, accuracy, conciseness, actionability, code quality, cross-linking, and structure."
compatibility: Designed for Claude Code. Requires file read access. Benefits from context7 MCP for accuracy verification against Anthropic docs.
metadata:
  author: solutions-architecture
  version: "1.0"
---

# Content Evaluation

Score a draft guide page against 7 criteria. Produce a verdict and revision instructions.

## Procedure

1. Read the draft page
2. Read `tmp/content-inventory.md` to cross-reference source material for completeness
3. Score each criterion 1-5 using the rubric below
4. Determine verdict based on thresholds
5. List specific issues and revision instructions
6. Output the evaluation in the format below

## Rubric

### 1. Completeness (1-5)
Does this page cover everything from the source inventory tagged for this topic?

- **5** = All relevant source content included, nothing meaningful left behind
- **3** = Some important content missing
- **1** = Most relevant source content is missing

**Check:** Compare against inventory entries tagged for this topic. List any missing concepts, code examples, or practices.

### 2. Accuracy (1-5)
Is the technical content correct and current?

- **5** = All code, API calls, and technical claims verified against current docs
- **3** = Some claims need verification
- **1** = Significant errors present

**Check:** Cross-reference API methods, parameters, model names against Anthropic public docs (use context7 if available). Flag anything potentially outdated.

### 3. Conciseness (1-5)
Does the page respect the reader's time?

- **5** = Every sentence earns its place, zero filler
- **3** = Some unnecessary explanation or repetition
- **1** = Walls of text, excessive hand-holding

**Check:** Flag paragraph-level bloat: redundant explanations, text walls that should be lists, sections that repeat what code already shows. For line-level filler, hedging, and noise patterns, run a dedicated prose audit pass instead.

### 4. Actionability (1-5)
Does the reader know what to DO after reading?

- **5** = Clear, runnable examples; reader can immediately apply the knowledge
- **3** = Explains concepts but light on practical application
- **1** = Purely theoretical, reader can't act on it

**Check:** Can you copy a code example and run it? Does the page answer "when would I use this?" and "how do I start?"

### 5. Code Quality (1-5)
Are the code examples correct, minimal, and instructive?

- **5** = All examples run, are minimal, and clearly demonstrate the concept
- **3** = Examples work but are verbose or unclear
- **1** = Examples are broken or missing

**Check:** Syntax errors, missing imports, unnecessary complexity, hardcoded values, outdated API usage.

### 6. Cross-linking (1-5)
Does the page connect to related content?

- **5** = Links to all related internal pages, relevant Anthropic docs, and external resources
- **3** = Some links but missing obvious connections
- **1** = No cross-references

**Check:** Every concept with its own page should link to it. Anthropic docs should be linked for API details. Check for agentskills.io, cookbook, and GitHub repo links where relevant.

### 7. Structure (1-5)
Is the page well-organized and scannable?

- **5** = Logical flow, scannable headings, good use of lists/tables/callouts
- **3** = Readable but could be better organized
- **1** = Disorganized, no clear structure

**Check:** Can a reader scan headings and understand the page? Are there text walls that should be lists or tables?

## Verdicts

- **SHIP** — Average >= 4.0 AND no criterion below 3
- **REVISE** — Average >= 3.0 OR any criterion at 2
- **REWRITE** — Average < 3.0 OR any criterion at 1

## Output Format

```markdown
# Evaluation: [Page Title]

**File:** [file path]
**Overall Score:** [average, 1 decimal] / 5
**Verdict:** [SHIP | REVISE | REWRITE]

| Criterion | Score | Summary |
| --- | --- | --- |
| Completeness | X/5 | [1 sentence] |
| Accuracy | X/5 | [1 sentence] |
| Conciseness | X/5 | [1 sentence] |
| Actionability | X/5 | [1 sentence] |
| Code Quality | X/5 | [1 sentence] |
| Cross-linking | X/5 | [1 sentence] |
| Structure | X/5 | [1 sentence] |

## Must Fix
- [specific issue with location]

## Should Fix
- [specific issue with location]

## Missing Content
- [inventory entries not covered, with source reference]

## Revision Instructions
1. [specific change, in priority order]
```

## Gotchas

- Do not inflate scores. A 3 is a normal score for decent content. Reserve 5 for genuinely excellent work.
- If accuracy can't be verified (no docs access), score it 3 and note what needs checking.
- "Missing Content" must reference specific inventory entries by title — not vague claims.
- Revision instructions must be actionable. "Improve conciseness" is useless. "Cut paragraph 3 under 'Setup' — it repeats what the code example already shows" is useful.
