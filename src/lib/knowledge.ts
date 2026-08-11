import type { CollectionEntry } from 'astro:content';
import { FEATURED_TOPICS, topicBySlug } from '../data/topics';
import { localizeTopic, t, type Locale } from '../i18n';
import { localizedHref } from './urls';

export { FEATURED_TOPICS, TOPICS, topicBySlug } from '../data/topics';

type KnowledgeEntry = CollectionEntry<'knowledge'>;
export type RelationType = KnowledgeEntry['data']['relations'][number]['type'];

export const TYPE_LABELS: Record<KnowledgeEntry['data']['type'], string> = {
  case: 'Engineering Case',
  project: 'Project',
  research: 'Research',
  experiment: 'Experiment',
  learning: 'Learning',
  takeaway: 'Takeaway',
  question: 'Open Question',
};

export const STATUS_LABELS: Record<KnowledgeEntry['data']['status'], string> = {
  seed: 'Seed',
  exploring: 'Exploring',
  experimenting: 'Experimenting',
  completed: 'Completed',
  learned: 'Learned',
  applied: 'Applied',
  verified: 'Verified',
};

export const RELATION_LABELS: Record<RelationType, string> = {
  derived_from: 'Derived from',
  investigates: 'Investigates',
  tested_by: 'Tested by',
  validates: 'Validates',
  contradicts: 'Contradicts',
  applies_to: 'Applies to',
  inspires: 'Inspired',
  supersedes: 'Supersedes',
  related_to: 'Related to',
};

export function entryLocale(entry: KnowledgeEntry): Locale {
  return entry.data.locale;
}

export function entriesForLocale(entries: KnowledgeEntry[], locale: Locale) {
  return entries.filter((entry) => entry.data.locale === locale);
}

export function translationFor(entry: KnowledgeEntry, entries: KnowledgeEntry[], locale: Locale) {
  return entries.find((candidate) => candidate.data.nodeId === entry.data.nodeId && candidate.data.locale === locale);
}

export function resolvedEntries(entries: KnowledgeEntry[], locale: Locale) {
  return entriesForLocale(entries, locale);
}

export function nodeHref(nodeId: string, locale: Locale = 'en') {
  return localizedHref(`/knowledge/${nodeId}/`, locale);
}

export function topicHref(topic: string, locale: Locale = 'en') {
  return localizedHref(`/explore/${topic}/`, locale);
}

export function labelsFor(locale: Locale) {
  const messages = t(locale);
  return {
    type: messages.typeLabels,
    status: messages.statusLabels,
    relation: messages.relationLabels,
    evidence: messages.evidenceLabels,
    disclosure: messages.disclosureLabels,
  };
}

export function compareByRecency(a: KnowledgeEntry, b: KnowledgeEntry) {
  const aDate = a.data.updatedAt ?? a.data.publishedAt;
  const bDate = b.data.updatedAt ?? b.data.publishedAt;
  return bDate.getTime() - aDate.getTime() || a.data.nodeId.localeCompare(b.data.nodeId);
}

export function indexByNodeId(entries: KnowledgeEntry[]) {
  return new Map(entries.map((entry) => [entry.data.nodeId, entry]));
}

export function explicitRelations(entry: KnowledgeEntry) {
  const items = [...entry.data.relations];
  if (entry.data.parent) {
    items.unshift({
      type: entry.data.parent.relation,
      target: entry.data.parent.target,
    });
  }
  return items;
}

export function backlinks(entry: KnowledgeEntry, allEntries: KnowledgeEntry[]) {
  return allEntries.flatMap((candidate) =>
    explicitRelations(candidate)
      .filter((relation) => relation.target === entry.data.nodeId)
      .map((relation) => ({ source: candidate, relation: relation.type })),
  );
}

export function featuredTopicFor(entry: KnowledgeEntry, locale: Locale = 'en') {
  const topic = FEATURED_TOPICS.find((item) => entry.data.topics.includes(item.slug));
  return topic ? localizeTopic(topic, locale) : undefined;
}

export function topicsFor(entry: KnowledgeEntry, locale: Locale = 'en') {
  return entry.data.topics.flatMap((slug) => {
    const topic = topicBySlug(slug);
    return topic ? [localizeTopic(topic, locale)] : [];
  });
}

export function sameFeaturedTopic(entry: KnowledgeEntry, allEntries: KnowledgeEntry[]) {
  const topic = featuredTopicFor(entry);
  if (!topic) return [];
  return allEntries.filter(
    (candidate) =>
      candidate.data.nodeId !== entry.data.nodeId &&
      candidate.data.topics.includes(topic.slug),
  );
}

export function knowledgePath(entry: KnowledgeEntry, allEntries: KnowledgeEntry[]) {
  const byId = indexByNodeId(allEntries);
  const path: KnowledgeEntry[] = [entry];
  const visited = new Set([entry.data.nodeId]);
  let current = entry;

  while (current.data.parent) {
    const parent = byId.get(current.data.parent.target);
    if (!parent || visited.has(parent.data.nodeId)) break;
    path.unshift(parent);
    visited.add(parent.data.nodeId);
    current = parent;
  }

  return path;
}
