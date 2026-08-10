export type GraphRelation = {
  type: string;
  target: string;
};

export type GraphNode = {
  nodeId: string;
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
    | 'public-targets-draft';
  message: string;
  source?: string;
};

export function validateGraph(nodes: GraphNode[], knownTopics?: Set<string>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const byId = new Map<string, GraphNode>();

  for (const node of nodes) {
    const existing = byId.get(node.nodeId);
    if (existing) {
      issues.push({
        code: 'duplicate-node-id',
        message: `Duplicate nodeId "${node.nodeId}" (also used by ${existing.source ?? 'another node'}).`,
        source: node.source,
      });
    } else {
      byId.set(node.nodeId, node);
    }
  }

  for (const node of nodes) {
    if (node.parent && !byId.has(node.parent.target)) {
      issues.push({
        code: 'broken-parent-target',
        message: `Parent target "${node.parent.target}" does not exist.`,
        source: node.source,
      });
    }
    if (!node.draft && node.parent && byId.get(node.parent.target)?.draft) {
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
      if (!byId.has(relation.target)) {
        issues.push({
          code: 'broken-relation-target',
          message: `Relation target "${relation.target}" does not exist.`,
          source: node.source,
        });
      }
      if (!node.draft && byId.get(relation.target)?.draft) {
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
      const cycleStart = positions.get(current.nodeId);
      if (cycleStart !== undefined) {
        const cycle = path.slice(cycleStart);
        const signature = [...cycle].sort().join('\0');
        if (!reportedCycles.has(signature)) {
          issues.push({
            code: 'parent-cycle',
            message: `Parent cycle detected: ${[...cycle, current.nodeId].join(' -> ')}.`,
            source: current.source,
          });
          reportedCycles.add(signature);
        }
        break;
      }

      positions.set(current.nodeId, path.length);
      path.push(current.nodeId);
      current = current.parent ? byId.get(current.parent.target) : undefined;
    }
  }

  return issues;
}
