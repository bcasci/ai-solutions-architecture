/**
 * Remark plugin that prefixes internal markdown links with Astro's base path.
 * Handles links like [Tool Use](/the-api/tool-use) → [Tool Use](/ai-solutions-architecture/the-api/tool-use)
 * Only rewrites links starting with "/" that don't already include the base.
 */
import { visit } from 'unist-util-visit';

export function remarkBasePath({ base = '/' } = {}) {
  const prefix = base === '/' ? '' : base.replace(/\/$/, '');

  if (!prefix) return () => {};

  return () => (tree) => {
    visit(tree, 'link', (node) => {
      if (
        typeof node.url === 'string' &&
        node.url.startsWith('/') &&
        !node.url.startsWith(prefix)
      ) {
        node.url = prefix + node.url;
      }
    });
  };
}
