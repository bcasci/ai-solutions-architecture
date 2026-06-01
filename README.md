# Solutions Architecture

## Bootstrap Instructions

### Prerequisites

- Node.js 22.16.0 (see `.tool-versions`)
- [asdf](https://asdf-vm.com/) or compatible version manager (e.g., mise)

### Setup

1. Install the correct Node version:
   ```bash
   asdf install
   ```

2. Initialize the project:
   ```bash
   npm init -y
   ```

3. Install dependencies (once a package.json exists):
   ```bash
   npm install
   ```

### Playwright MCP

This project uses the [Playwright MCP server](https://github.com/anthropics/mcp-playwright) for browser automation within Claude Code.

To install the Playwright MCP for this project:

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

Then install Playwright browsers:

```bash
npx playwright install
```
