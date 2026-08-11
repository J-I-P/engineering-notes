export type GraphRelation = {
  type: string;
  target: string;
};

export type GraphNode = {
  nodeId: string;
  locale?: string;
  type?: string;
  status?: string;
  source?: string;
  topics?: string[];
  draft?: boolean;
  parent?: GraphRelation;
  relations?: GraphRelation[];
};

export type ValidationIssue = {
  code:
    | 'duplicate-node-id'
    | 'broken-parent-target'
    | 'broken-relation-target'
    | 'parent-cycle'
    | 'duplicate-relation'
    | 'unknown-topic'
    | 'public-targets-draft'
    | 'translation-mismatch';
  message: string;
  source?: string;
};

export function validateGraph(nodes: GraphNode[], knownTopics?: Set<string>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const byId = new Map<string, GraphNode>();
  const localeFor = (node: GraphNode) => node.locale ?? 'en';
  const keyFor = (node: GraphNode) => `${localeFor(node)}\0${node.nodeId}`;
  const targetFor = (node: GraphNode, target: string) =>
    byId.get(`${localeFor(node)}\0${target}`) ?? byId.get(`en\0${target}`);

  for (const node of nodes) {
    const key = keyFor(node);
    const existing = byId.get(key);
    if (existing) {
      issues.push({
        code: 'duplicate-node-id',
        message: `Duplicate nodeId "${node.nodeId}" for locale "${localeFor(node)}" (also used by ${existing.source ?? 'another node'}).`,
        source: node.source,
      });
    } else {
      byId.set(key, node);
    }
  }

  const concepts = new Map<string, GraphNode[]>();
  for (const node of nodes) {
    const translations = concepts.get(node.nodeId) ?? [];
    translations.push(node);
    concepts.set(node.nodeId, translations);
  }
  for (const [nodeId, translations] of concepts) {
    const byLocale = new Map<string, GraphNode>();
    for (const translation of translations) {
      if (!byLocale.has(localeFor(translation))) byLocale.set(localeFor(translation), translation);
    }
    const localized = [...byLocale.values()];
    if (localized.length < 2) continue;
    const baseline = localized.find((node) => localeFor(node) === 'en') ?? localized[0]!;
    const graphShape = (node: GraphNode) => JSON.stringify({
      type: node.type,
      status: node.status,
      topics: node.topics ?? [],
      draft: node.draft ?? false,
      parent: node.parent,
      relations: node.relations ?? [],
    });
    for (const translation of localized) {
      if (translation === baseline || graphShape(translation) === graphShape(baseline)) continue;
      issues.push({
        code: 'translation-mismatch',
        message: `Translation "${localeFor(translation)}" for nodeId "${nodeId}" does not match the graph metadata in "${localeFor(baseline)}".`,
        source: translation.source,
      });
    }
  }

  for (const node of nodes) {
    if (node.parent && !targetFor(node, node.parent.target)) {
      issues.push({
        code: 'broken-parent-target',
        message: `Parent target "${node.parent.target}" does not exist.`,
        source: node.source,
      });
    }
    if (!node.draft && node.parent && targetFor(node, node.parent.target)?.draft) {
      issues.push({
        code: 'public-targets-draft',
        message: `Published node has draft parent "${node.parent.target}".`,
        source: node.source,
      });
    }

    const seenRelations = new Set<string>();
    if (node.parent) {
      seenRelations.add(`${node.parent.type}\0${node.parent.target}`);
    }
    for (const relation of node.relations ?? []) {
      if (!targetFor(node, relation.target)) {
        issues.push({
          code: 'broken-relation-target',
          message: `Relation target "${relation.target}" does not exist.`,
          source: node.source,
        });
      }
      if (!node.draft && targetFor(node, relation.target)?.draft) {
        issues.push({
          code: 'public-targets-draft',
          message: `Published node has relation to draft target "${relation.target}".`,
          source: node.source,
        });
      }

      const key = `${relation.type}\0${relation.target}`;
      if (seenRelations.has(key)) {
        issues.push({
          code: 'duplicate-relation',
          message: `Relation "${relation.type}" to "${relation.target}" is duplicated.`,
          source: node.source,
        });
      }
      seenRelations.add(key);
    }

    if (knownTopics) {
      for (const topic of node.topics ?? []) {
        if (!knownTopics.has(topic)) {
          issues.push({
            code: 'unknown-topic',
            message: `Topic "${topic}" is not present in the topic catalog.`,
            source: node.source,
          });
        }
      }
    }
  }

  const reportedCycles = new Set<string>();
  for (const node of nodes) {
    const path: string[] = [];
    const positions = new Map<string, number>();
    let current: GraphNode | undefined = node;

    while (current) {
      const currentKey = keyFor(current);
      const cycleStart = positions.get(currentKey);
      if (cycleStart !== undefined) {
        const cycle = path.slice(cycleStart);
        const signature = [...cycle].sort().join('\0');
        if (!reportedCycles.has(signature)) {
          issues.push({
            code: 'parent-cycle',
            message: `Parent cycle detected: ${[...cycle, currentKey].join(' -> ')}.`,
            source: current.source,
          });
          reportedCycles.add(signature);
        }
        break;
      }

      positions.set(currentKey, path.length);
      path.push(currentKey);
      current = current.parent ? targetFor(current, current.parent.target) : undefined;
    }
  }

  return issues;
}
