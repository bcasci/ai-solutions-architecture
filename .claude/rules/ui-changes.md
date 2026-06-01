---
description: Rules for making UI/styling changes to the site
globs: ["src/components/**", "src/layouts/**", "src/styles/**", "src/pages/**"]
---

# UI Change Rules

## Always verify visually
After any UI or styling change, rebuild and take a Playwright screenshot to verify the result. Do not assume CSS changes look correct — confirm with your eyes.

## Dark mode is mandatory
Every UI component must work in dark mode (`prefers-color-scheme: dark`). When creating or modifying a component:
- Add `dark:` Tailwind variants for all color classes
- Use the `dark:bg-{color}-950/40` pattern for tinted dark backgrounds (see Callout.astro)
- Use transparent border opacities (`border-gray-200/60`, `border-gray-800/60`) for softer dividers
- Test by taking a screenshot — the site renders in dark mode by default in most dev environments

## Build-verify cycle
After UI changes:
1. `npm run build` — verify it compiles
2. Restart preview: `lsof -ti:4321 | xargs kill -9 2>/dev/null; npm run preview`
3. Navigate to an affected page with Playwright
4. Take a screenshot and read it to verify
5. Run `npm run test` before committing

## Code block styling
Code blocks get language labels and copy buttons automatically via CSS and DocLayout script. Do not add per-page code block styling. If Shiki theme or code block structure changes, verify that `data-language` attributes and `.copy-btn` injection still work.

## Favicon changes
If `public/favicon.svg` is modified, regenerate `public/favicon.ico`:
```
rsvg-convert -w 16 -h 16 public/favicon.svg -o /tmp/fav-16.png
rsvg-convert -w 32 -h 32 public/favicon.svg -o /tmp/fav-32.png
rsvg-convert -w 48 -h 48 public/favicon.svg -o /tmp/fav-48.png
magick /tmp/fav-16.png /tmp/fav-32.png /tmp/fav-48.png public/favicon.ico
```
Verify the .ico visually before committing.
