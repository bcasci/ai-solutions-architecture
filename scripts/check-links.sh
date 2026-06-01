#!/usr/bin/env bash
# Check all internal links in the build output.
# Scans dist/ HTML files for href="/..." and verifies each target exists as a file or directory.
set -euo pipefail

DIST="dist"
BASE_PATH="/ai-solutions-architecture"
ERRORS=0

if [ ! -d "$DIST" ]; then
  echo "Error: $DIST directory not found. Run 'npm run build' first."
  exit 1
fi

# Extract all internal href paths from HTML files
LINKS=$(grep -roh 'href="/[^"]*"' "$DIST" | sed 's/href="//;s/"$//' | sort -u)

for link in $LINKS; do
  # Strip trailing slash and anchor fragments
  clean="${link%%#*}"
  clean="${clean%/}"

  if [ -z "$clean" ]; then
    continue
  fi

  # Strip base path prefix if present
  clean="${clean#$BASE_PATH}"

  # Check if the target exists in dist (as dir with index.html, or as a file)
  target="${DIST}${clean}"
  if [ -f "${target}/index.html" ] || [ -f "$target" ] || [ -f "${target}.html" ]; then
    continue
  fi

  echo "BROKEN: $link"
  ERRORS=$((ERRORS + 1))
done

if [ "$ERRORS" -gt 0 ]; then
  echo ""
  echo "$ERRORS broken internal link(s) found."
  exit 1
else
  echo "All internal links OK."
fi
