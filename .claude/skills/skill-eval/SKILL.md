---
name: skill-eval
description: "Evaluates a skill's output quality by running natural language test instructions through the skill, grading the results against expected findings, and producing a scored assessment. Use to validate that a skill produces correct, complete, and actionable output before relying on it in production workflows. Activates when testing skills, grading skill output, validating skill accuracy, or running the eval-iterate loop on SKILL.md prompts."
compatibility: Designed for Claude Code. Requires file read access and Agent tool for cross-checking.
metadata:
  author: solutions-architecture
  version: "1.0"
---

# Skill Eval

Evaluate a skill by running test instructions through it, grading the output, and iterating on the SKILL.md.

## Core Insight

A SKILL.md is a prompt. The natural language instruction that invokes it is the user input. The skill's output is the response. This is the same prompt → run → grade → iterate loop from our evaluation page — applied to our own tooling.

## Procedure

### 1. Load or Create Test Cases

Check `test-cases/` for an existing test case file matching the skill name (e.g., `test-cases/prose-audit.md`). If none exists, create one by:

1. Identifying 3-5 representative natural language instructions a user would give to invoke the skill
2. For each instruction, defining expected output characteristics (what should be found, what should NOT be flagged, expected format)
3. Writing them in the test case format below

### 2. Run the Skill

For each test case:

1. Execute the natural language instruction as if a user typed it
2. Capture the full output (the skill's findings, scores, tables, etc.)
3. Save the output alongside the test case for comparison

### 3. Grade the Output

Score each test case output on four criteria:

| Criterion | Weight | What it measures |
| --- | --- | --- |
| **Recall** | 30% | Did it find all expected issues? Count hits vs expected findings. |
| **Precision** | 25% | Did it avoid false positives? Flag anything the skill reported that isn't a real issue. |
| **Actionability** | 25% | Are fixes specific enough to apply without interpretation? "Cut filler" = 0. "L42: delete 'In practice,'" = 10. |
| **Format compliance** | 20% | Does the output match the skill's declared output format? |

Each criterion scores 0-10. Weighted average is the overall score.

### 4. Cross-Check (Optional but Recommended)

Use a subagent to independently review the same input and compare findings against the skill's output. This catches both missed issues (recall gaps) and false positives (precision gaps).

The cross-checker should NOT see the skill's output — it works blind, then we compare.

### 5. Produce the Eval Report

Output the report in the format below.

### 6. Iterate

If overall score < 8.0:
1. Identify the weakest criterion
2. Trace the failures back to specific SKILL.md instructions (or missing instructions)
3. Propose a specific edit to the SKILL.md
4. Re-run the failing test cases to verify improvement
5. Repeat until score >= 8.0

## Test Case Format

Each test case file lives in `test-cases/{skill-name}.md`:

```markdown
# Test Cases: {skill-name}

## Test 1: {short description}

**Instruction:** "{the natural language prompt a user would type}"

**Input scope:** {file path or description of what the skill should process}

**Expected findings:**
- L{line}: {category} — "{problematic text}" → {expected fix}
- L{line}: {category} — "{problematic text}" → delete

**Should NOT flag:**
- L{line}: "{text that looks like an issue but isn't}" — reason it's fine

**Expected format:** {brief description of output structure}
```

## Eval Report Format

```markdown
# Skill Eval: {skill-name}

**Test cases run:** {count}
**Overall score:** {weighted average}/10

## Results by Test Case

### Test {n}: {description}

**Instruction:** "{what was passed}"

| Criterion | Score | Notes |
| --- | --- | --- |
| Recall | X/10 | Found {n}/{total} expected issues. Missed: {list} |
| Precision | X/10 | {n} false positives: {list} |
| Actionability | X/10 | {n} fixes too vague: {list} |
| Format | X/10 | {deviations from declared format} |

**Weighted score:** X/10

### Test {n+1}: ...

## Aggregate

| Criterion | Avg Score |
| --- | --- |
| Recall | X/10 |
| Precision | X/10 |
| Actionability | X/10 |
| Format | X/10 |
| **Overall** | **X/10** |

## SKILL.md Improvement Recommendations

1. {specific edit to SKILL.md with rationale}
2. {next edit}
```

## Gotchas

- **Test cases are ground truth.** If the skill disagrees with a test case and the skill is right, update the test case — not the scoring.
- **Don't grade on speed.** Skills run at Claude's pace. Only grade output quality.
- **Natural language variance matters.** The same intent phrased differently ("audit prose in X" vs "check X for filler") should produce equivalent results. Include phrasing variants in test cases.
- **One skill per eval run.** Don't mix skills in a single eval — each has its own test cases and grading context.
- **Re-read files before grading.** Line numbers in test cases reference the file at test creation time. If the file has been edited since, line numbers may have shifted.
