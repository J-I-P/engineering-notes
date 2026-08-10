import { opendir, readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from 'yaml';
import { validateGraph, type GraphNode } from './graph-validator.ts';

const contentDirectory = resolve('src/content/knowledge');
const catalogPath = resolve('src/data/topics.ts');

async function markdownFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await opendir(directory);
  for await (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(path));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}

function frontmatter(contents: string, source: string): GraphNode {
  const match = contents.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/);
  if (!match) throw new Error(`${source}: missing YAML frontmatter.`);
  const data = parse(match[1]);
  if (!data || typeof data.nodeId !== 'string') {
    throw new Error(`${source}: frontmatter must contain a string nodeId.`);
  }
  return { ...data, source } as GraphNode;
}

async function topicCatalog(): Promise<Set<string> | undefined> {
  try {
    await access(catalogPath);
  } catch {
    return undefined;
  }

  const catalog = await import(`${pathToFileURL(catalogPath).href}?t=${Date.now()}`);
  const candidate = catalog.TOPICS ?? catalog.FEATURED_TOPICS ?? catalog.default;
  if (!Array.isArray(candidate)) {
    throw new Error('src/data/topics.ts must export TOPICS, FEATURED_TOPICS, or a default array.');
  }

  return new Set(candidate.map((topic: unknown) => {
    if (typeof topic === 'string') return topic;
    if (topic && typeof topic === 'object' && 'slug' in topic && typeof topic.slug === 'string') {
      return topic.slug;
    }
    throw new Error('Each topic catalog entry must be a slug string or an object with a string slug.');
  }));
}

const files = (await markdownFiles(contentDirectory)).sort();
const nodes = await Promise.all(files.map(async (file) => frontmatter(await readFile(file, 'utf8'), file)));
const knownTopics = await topicCatalog();
const issues = validateGraph(nodes, knownTopics);

if (issues.length > 0) {
  for (const issue of issues) {
    console.error(`[${issue.code}] ${issue.source ?? 'content'}: ${issue.message}`);
  }
  console.error(`Content validation failed with ${issues.length} issue(s).`);
  process.exitCode = 1;
} else {
  const catalogMessage = knownTopics ? ` against ${knownTopics.size} catalog topics` : '';
  console.log(`Validated ${nodes.length} knowledge nodes${catalogMessage}.`);
}
