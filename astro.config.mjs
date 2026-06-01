// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import mermaid from 'astro-mermaid';
import { remarkBasePath } from './src/plugins/remark-base-path.mjs';

const base = '/ai-solutions-architecture';

// https://astro.build/config
export default defineConfig({
  site: 'https://bcasci.github.io',
  base,
  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    remarkPlugins: [remarkBasePath({ base })],
  },

  integrations: [
    mermaid({
      theme: 'dark',
    }),
    mdx(),
  ]
});