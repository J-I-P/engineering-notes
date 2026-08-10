import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const nodeType = z.enum([
  'case',
  'project',
  'research',
  'experiment',
  'learning',
  'takeaway',
  'question',
]);

const nodeStatus = z.enum([
  'seed',
  'exploring',
  'experimenting',
  'learned',
  'applied',
  'verified',
]);

const relationType = z.enum([
  'derived_from',
  'investigates',
  'tested_by',
  'validates',
  'contradicts',
  'applies_to',
  'inspires',
  'supersedes',
  'related_to',
]);

const knowledge = defineCollection({
  loader: glob({ base: './src/content/knowledge', pattern: '**/*.md' }),
  schema: z.object({
    nodeId: z.string(),
    title: z.string(),
    description: z.string(),
    type: nodeType,
    status: nodeStatus,
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    topics: z.array(z.string()).default([]),
    project: z.string().optional(),
    parent: z.object({
      target: z.string(),
      relation: relationType,
    }).optional(),
    origin: z.object({
      kind: z.enum(['work', 'side_project', 'curiosity', 'paper', 'open_source']),
      disclosure: z.enum(['public', 'anonymized', 'private_source']).default('public'),
    }).optional(),
    evidence: z.array(z.enum([
      'official_docs',
      'source_code',
      'local_experiment',
      'production_observation',
      'external_reference',
    ])).default([]),
    relations: z.array(z.object({
      type: relationType,
      target: z.string(),
    })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { knowledge };
