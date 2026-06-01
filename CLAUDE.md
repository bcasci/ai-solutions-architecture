# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Practical solutions guide for developers building with Anthropic's Claude. Static site built with Astro 6 + Tailwind CSS v4 + MDX. Content is topic-based (not course-mirrored), aimed at developers who want working code, not lectures.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `./dist/` (35 pages, ~5s)
- `npm run preview` — serve production build
- `npm run test` — Playwright tests (auto-starts preview server)
- `npm run check-links` — validate internal links

## Architecture

**Content pipeline:** MDX files in `src/content/docs/{section}/` → Zod-validated via `src/content.config.ts` → rendered by catch-all route `src/pages/[...slug].astro` → laid out by `src/layouts/DocLayout.astro`.

**Routing:** Single dynamic route `[...slug].astro` renders all content. The `doc.id` (e.g., `the-api/messages-api`) becomes the URL path. No explicit route definitions needed.

**Section system:** Sections are defined by the `section` field in MDX frontmatter (Zod enum in `content.config.ts`). Section metadata (labels, order) is duplicated in three places that must stay in sync:

- `src/components/Sidebar.astro` — sidebar navigation
- `src/pages/index.astro` — homepage cards
- `src/layouts/DocLayout.astro` — breadcrumb labels

**Sections (in order):** Start Here, The API, Prompting, RAG (Retrieval Augmented Generation), Agents, Claude Code, MCP, Production, Recipes, Reference.

**Navigation layers in DocLayout:**

- Breadcrumb — `Home / Section Label`
- Section nav ("In this section") — sibling pages, current highlighted, hidden for single-page sections
- Prev/Next — bottom of page, linear flow within section

**MDX frontmatter schema:**

```yaml
title: string (required)
description: string (required)
section: enum (required) — must match content.config.ts
order: number (required) — sort within section
tags: string[] (default [])
lastVerified: string (optional)
draft: boolean (default false) — drafts excluded from build
```

## Key Conventions

- **Adding a section:** Update the Zod enum in `content.config.ts`, then add matching entries to Sidebar, index.astro, DocLayout `sectionLabels`, and `tests/site.spec.ts` EXPECTED_SECTIONS.
- **Adding a page:** Create `src/content/docs/{section}/{slug}.mdx` with valid frontmatter. Routing, sidebar, and navigation are automatic.
- **Mermaid diagrams:** Use standard ` ```mermaid ` fenced blocks in MDX. The `astro-mermaid` integration (neutral theme) renders them client-side. No MDX imports needed.
- **Cross-links:** Use absolute paths like `[Tool Use](/the-api/tool-use)`. Tests verify internal links resolve.
- **Dark mode:** Via `prefers-color-scheme` in `src/styles/global.css`. All layout elements need both light and `dark:` variants.
- **Tests expect preview server at localhost:4321.** Playwright config auto-starts it via `npm run preview`. Run `npm run build` first if testing manually.

## Environment

- Node.js ≥22.12.0 (`.tool-versions` / asdf)
- Astro 6, Tailwind CSS v4 (Vite plugin), @tailwindcss/typography
