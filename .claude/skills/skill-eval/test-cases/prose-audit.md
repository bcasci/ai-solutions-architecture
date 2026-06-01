# Test Cases: prose-audit

Ground truth derived from commit 8886171 (prose audit edits across 11 files).
To restore pre-edit state for a test file: `git show HEAD~1:{path}`

## Test 1: MCP page — mixed categories

**Instruction:** "Run a prose audit on src/content/docs/mcp/mcp.mdx"

**Input scope:** `src/content/docs/mcp/mcp.mdx` at commit HEAD~1 (pre-edit state)

**Expected findings:**
- L9: filler — "without writing integration code from scratch" → "without custom integration code" or cut
- L22: filler — "the growing ecosystem of pre-built MCP servers" → "pre-built MCP servers"
- L56: filler — "a high-level class that turns Python functions into MCP-compatible tools with one decorator" → "a class that decorates Python functions as MCP tools"
- L172: filler — "for testing servers in isolation — no client or Claude connection needed" → "for testing servers locally"
- L180: redundancy — "Development workflow: code your server, test in the inspector, iterate, then connect to your application." → delete (obvious from context)
- L248: redundancy — "The flow: discover tools via `list_tools()`..." summary → delete (code shows this)

**Should NOT flag:**
- L9: "MCP (Model Context Protocol) is a standard communication layer" — not filler, it's a definition
- L45: "MCP is transport-agnostic" — technical term, not a claim
- L105: "Raise ValueError with descriptive messages — Claude can read and recover from them" — actionable guidance, not filler

**Expected format:** Issues-by-file table with Line, Category, Current Text, Recommended Fix columns; summary counts by category.

## Test 2: Agent architecture — unsubstantiated claims

**Instruction:** "Audit the prose in agents/agent-architecture.mdx for noise"

**Input scope:** `src/content/docs/agents/agent-architecture.mdx` at commit HEAD~1

**Expected findings:**
- L10: claim — "Most tasks that feel like they need an 'agent' actually need a workflow" → "Most tasks labeled 'agent' work better as workflows"
- L22: claim — "Reliability and predictability matter more to users than architectural elegance" → "Workflows are more reliable and predictable"
- L61: claim — "consistently outperforms a single complex prompt" → "often beats a single complex prompt"
- L141: claim — "significantly better quality than one generic prompt handling everything" → "better than one generic prompt"
- L217: filler — "The power of agents comes from Claude's ability to combine simple tools in unexpected ways" → "Agents gain flexibility from tool composition"
- L219: filler — "demonstrates this perfectly" → "demonstrates this"
- L223: claim — "more powerful than" → "more composable than"

**Should NOT flag:**
- L149: "When you genuinely need an agent — the task is open-ended and you cannot predefine steps" — the hedge "genuinely" is meaningful here (contrasts with the workflow default)
- L233: "After a click, take a screenshot. After a file write, read it back." — imperative instructions, not filler
- L9 (post-edit): "Most tasks labeled 'agent' work better as workflows" — direct claim with evidence (the table follows)

**Expected format:** Same table format. Majority of findings should be categorized as "claim."

## Test 3: Evaluation page — hedging and redundancy

**Instruction:** "Check prompting/evaluation.mdx for filler and noise"

**Input scope:** `src/content/docs/prompting/evaluation.mdx` at commit HEAD~1

**Expected findings:**
- L9: claim — "ship with confidence" → "catch regressions before they reach users"
- L21: redundancy — "The upfront investment pays for itself the first time you catch a regression" → "Evals catch regressions before users do"
- L160: claim — "model graders default to middling scores around 6" → "scores cluster in the middle range"
- L200: hedge — "stable enough for prompt comparison" → "consistent for prompt comparison"
- L205: filler — "They are deterministic, fast, and free." → "They are deterministic and fast." (free is implied by "code grader")
- L295: claim — "objectively better. This is the basis for confident, data-driven prompt development." → "better. This is empirical prompt development."

**Should NOT flag:**
- L13: "most engineers test it manually once or twice and ship" — this is voice/personality, not a claim
- L46: "Hand-crafting test cases is slow" — factual statement
- L156: "Return structured result dicts (not just scores) so you can inspect output text alongside scores when debugging" — practical guidance

**Expected format:** Same table format. Mix of claim, hedge, filler, and redundancy categories.

## Test 4: Phrasing variant — same intent, different words

**Instruction:** "Tighten the language in the MCP overview page — cut any noise"

**Input scope:** Same as Test 1 (`src/content/docs/mcp/mcp.mdx` at HEAD~1)

**Expected findings:** Same as Test 1 (the skill should produce equivalent results regardless of how the instruction is phrased).

**Should NOT flag:** Same as Test 1.

**Expected format:** Same table format.

## Test 5: Clean page — low noise baseline

**Instruction:** "Audit src/content/docs/the-api/messages-api.mdx for prose quality"

**Input scope:** `src/content/docs/the-api/messages-api.mdx` at commit HEAD~1

**Expected findings:**
- L77: filler — "Claude generates what it deems appropriate and stops" → "Claude stops when it finishes"

**Should NOT flag:**
- L9: "Every interaction with Claude goes through the Messages API" — direct statement
- L23: "A minimal request needs three parameters" — factual
- L60: "Never expose your API key in client-side code" — imperative warning

**Expected format:** Same table format. Only 1 finding — skill should report the page is largely clean, not invent issues to fill the report.
