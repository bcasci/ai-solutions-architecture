# Solutions Architecture

A static site built with [Astro](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and [MDX](https://mdxjs.com).

## Prerequisites

- **Node.js 22.16.0** — managed via `.tool-versions` (install with [asdf](https://asdf-vm.com/) or [mise](https://mise.jdx.dev/))

## Getting Started

```bash
# Install the correct Node version
asdf install

# Install dependencies
npm install

# Start the dev server (http://localhost:4321)
npm run dev
```

## Commands

| Command           | Description                            |
| :---------------- | :------------------------------------- |
| `npm run dev`     | Start dev server at `localhost:4321`   |
| `npm run build`   | Build production site to `./dist/`     |
| `npm run preview` | Preview the production build locally   |

## Project Structure

```
src/
  layouts/        # Page layouts (BaseLayout.astro)
  pages/          # File-based routing (.astro, .mdx)
  styles/         # Global CSS (Tailwind imports)
public/           # Static assets (favicon, images)
astro.config.mjs  # Astro configuration
```

## Stack

- **Astro** — static site generator, zero JS by default
- **Tailwind CSS v4** — utility-first styling via Vite plugin
- **@tailwindcss/typography** — `prose` classes for styled markdown content
- **MDX** — write content in markdown, embed custom components where needed

## Playwright MCP

This project uses the [Playwright MCP server](https://github.com/anthropics/mcp-playwright) for browser automation within Claude Code.

```bash
# Install the MCP server
claude mcp add playwright npx @playwright/mcp@latest

# Install Playwright browsers
npx playwright install
```
