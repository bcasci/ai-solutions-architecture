import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum([
      'start-here',
      'the-api',
      'prompting',
      'agents',
      'production',
      'recipes',
      'reference',
    ]),
    order: z.number(), // sort order within section
    tags: z.array(z.string()).default([]),
    lastVerified: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { docs };
