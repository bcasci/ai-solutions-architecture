import { test, expect } from "@playwright/test";

const BASE = "http://localhost:4321";

const EXPECTED_SECTIONS = [
  "Start Here",
  "The API",
  "Prompting",
  "Agents",
  "Production",
  "Recipes",
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
    const links = await page.locator("nav a[href^='/']").all();
    const hrefs: string[] = [];
    for (const link of links) {
      const href = await link.getAttribute("href");
      if (href && href !== "/") hrefs.push(href);
    }
    expect(hrefs.length).toBeGreaterThan(25);

    for (const href of hrefs) {
      const res = await page.request.get(`${BASE}${href}`);
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

test.describe("Cross-links", () => {
  test("internal links on Messages API page resolve", async ({ page }) => {
    await page.goto(`${BASE}/the-api/messages-api`);
    const links = await page
      .locator("article a[href^='/']")
      .all();

    for (const link of links) {
      const href = await link.getAttribute("href");
      if (!href) continue;
      const res = await page.request.get(`${BASE}${href}`);
      expect(res.status(), `${href} returned ${res.status()}`).toBe(200);
    }
  });

  test("internal links on Agents section pages resolve", async ({ page }) => {
    const agentPages = [
      "/agents/agent-architecture",
      "/agents/orchestration",
      "/agents/rag",
    ];
    for (const pagePath of agentPages) {
      await page.goto(`${BASE}${pagePath}`);
      const links = await page
        .locator("article a[href^='/']")
        .all();
      for (const link of links) {
        const href = await link.getAttribute("href");
        if (!href) continue;
        const res = await page.request.get(`${BASE}${href}`);
        expect(
          res.status(),
          `${pagePath} → ${href} returned ${res.status()}`
        ).toBe(200);
      }
    }
  });
});
