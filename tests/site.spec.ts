import { test, expect } from "@playwright/test";

const BASE = "http://localhost:4321/ai-solutions-architecture";

const EXPECTED_SECTIONS = [
  "Start Here",
  "The API",
  "Prompting",
  "RAG (Retrieval Augmented Generation)",
  "Agents",
  "Claude Code",
  "MCP",
  "Production",
  "Scenarios",
  "Reference",
];

test.describe("Sidebar", () => {
  test("renders all sections in correct order", async ({ page }) => {
    await page.goto(BASE);
    const headings = (await page.locator("nav h3").allTextContents()).map((t) =>
      t.trim()
    );
    expect(headings).toEqual(EXPECTED_SECTIONS);
  });

  test("every sidebar link navigates successfully", async ({ page }) => {
    await page.goto(BASE);
    const links = await page.locator("nav a[href^='/ai-solutions-architecture/']").all();
    const hrefs: string[] = [];
    for (const link of links) {
      const href = await link.getAttribute("href");
      if (href && href !== "/ai-solutions-architecture/") hrefs.push(href);
    }
    expect(hrefs.length).toBeGreaterThan(27);

    for (const href of hrefs) {
      const url = href.startsWith("http") ? href : `http://localhost:4321${href}`;
      const res = await page.request.get(url);
      expect(res.status(), `${href} returned ${res.status()}`).toBe(200);
    }
  });
});

test.describe("Homepage", () => {
  test("section cards match sidebar sections", async ({ page }) => {
    await page.goto(BASE);
    const cardHeadings = (
      await page.locator("main h2").allTextContents()
    ).map((t) => t.trim());
    expect(cardHeadings).toEqual(EXPECTED_SECTIONS);
  });
});

test.describe("Mermaid diagrams", () => {
  test("renders SVG diagrams on tool-use page", async ({ page }) => {
    await page.goto(`${BASE}/the-api/tool-use/`);
    await page.waitForSelector(".mermaid svg", { timeout: 10000 });
    const diagrams = await page.locator(".mermaid svg").count();
    expect(diagrams).toBeGreaterThanOrEqual(1);
  });
});

test.describe("Cross-links", () => {
  test("internal links on Messages API page resolve", async ({ page }) => {
    await page.goto(`${BASE}/the-api/messages-api/`);
    const links = await page
      .locator("article a[href^='/ai-solutions-architecture/']")
      .all();

    for (const link of links) {
      const href = await link.getAttribute("href");
      if (!href) continue;
      const res = await page.request.get(`http://localhost:4321${href}`);
      expect(res.status(), `${href} returned ${res.status()}`).toBe(200);
    }
  });

  test("internal links on Agents section pages resolve", async ({ page }) => {
    const agentPages = [
      "/ai-solutions-architecture/agents/agent-architecture",
      "/ai-solutions-architecture/agents/orchestration",
      "/ai-solutions-architecture/retrieval/rag",
    ];
    for (const pagePath of agentPages) {
      await page.goto(`http://localhost:4321${pagePath}/`);
      const links = await page
        .locator("article a[href^='/ai-solutions-architecture/']")
        .all();
      for (const link of links) {
        const href = await link.getAttribute("href");
        if (!href) continue;
        const res = await page.request.get(`http://localhost:4321${href}`);
        expect(
          res.status(),
          `${pagePath} → ${href} returned ${res.status()}`
        ).toBe(200);
      }
    }
  });
});
