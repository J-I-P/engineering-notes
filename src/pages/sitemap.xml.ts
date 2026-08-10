import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { TOPICS } from '../data/topics';

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://J-I-P.dev');
  const entries = await getCollection('knowledge', ({ data }) => !data.draft);
  const usedTopics = new Set(entries.flatMap((entry) => entry.data.topics));
  const paths = [
    '/',
    '/knowledge/',
    '/explore/',
    ...TOPICS.filter((topic) => usedTopics.has(topic.slug)).map((topic) => `/explore/${topic.slug}/`),
    ...entries.map((entry) => `/knowledge/${entry.data.nodeId}/`),
  ];
  const urls = paths.map((path) => `  <url><loc>${new URL(path, base).href}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
