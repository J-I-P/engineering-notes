import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { TOPICS } from '../data/topics';
import type { Locale } from '../i18n';
import { entriesForLocale } from '../lib/knowledge';
import { localizedHref } from '../lib/urls';

const locales: Locale[] = ['en', 'zh-tw'];

export const GET: APIRoute = async ({ site }) => {
  const siteURL = site ?? new URL('https://j-i-p.github.io');
  const allEntries = await getCollection('knowledge', ({ data }) => !data.draft);
  const entries = Object.fromEntries(locales.map((locale) => [locale, entriesForLocale(allEntries, locale)])) as Record<Locale, typeof allEntries>;
  const paths = new Map<string, Set<Locale>>();

  const addPath = (path: string, locale: Locale) => {
    const available = paths.get(path) ?? new Set<Locale>();
    available.add(locale);
    paths.set(path, available);
  };

  for (const locale of locales) {
    addPath('/', locale);
    addPath('/knowledge/', locale);
    addPath('/explore/', locale);
    const usedTopics = new Set(entries[locale].flatMap((entry) => entry.data.topics));
    for (const topic of TOPICS.filter((item) => usedTopics.has(item.slug))) addPath(`/explore/${topic.slug}/`, locale);
    for (const entry of entries[locale]) addPath(`/knowledge/${entry.data.nodeId}/`, locale);
  }

  const absolute = (path: string, locale: Locale) => new URL(localizedHref(path, locale), siteURL).href;
  const urlEntries = [...paths.entries()].flatMap(([path, available]) => [...available].map((locale) => {
    const alternates = [...available]
      .map((alternateLocale) => `    <xhtml:link rel="alternate" hreflang="${alternateLocale === 'zh-tw' ? 'zh-TW' : 'en'}" href="${absolute(path, alternateLocale)}" />`);
    if (available.has('en')) alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(path, 'en')}" />`);
    return `  <url>\n    <loc>${absolute(path, locale)}</loc>\n${alternates.join('\n')}\n  </url>`;
  }));

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries.join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
