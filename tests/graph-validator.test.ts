import assert from 'node:assert/strict';
import test from 'node:test';
import { validateGraph, type GraphNode } from '../scripts/graph-validator.ts';

test('accepts a valid graph and known topics', () => {
  const nodes: GraphNode[] = [
    { nodeId: 'root', topics: ['reliability'], relations: [{ type: 'inspires', target: 'child' }] },
    { nodeId: 'child', topics: ['reliability'], parent: { type: 'derived_from', target: 'root' } },
  ];
  assert.deepEqual(validateGraph(nodes, new Set(['reliability'])), []);
});

test('reports duplicate ids, broken targets, duplicate relations, and unknown topics', () => {
  const nodes: GraphNode[] = [
    {
      nodeId: 'same',
      source: 'first.md',
      topics: ['unknown'],
      parent: { type: 'derived_from', target: 'missing-parent' },
      relations: [
        { type: 'related_to', target: 'missing-relation' },
        { type: 'related_to', target: 'missing-relation' },
      ],
    },
    { nodeId: 'same', source: 'second.md' },
  ];
  const codes = validateGraph(nodes, new Set()).map((issue) => issue.code);
  assert.deepEqual(codes.sort(), [
    'broken-parent-target',
    'broken-relation-target',
    'broken-relation-target',
    'duplicate-node-id',
    'duplicate-relation',
    'unknown-topic',
  ].sort());
});

test('reports each parent cycle once', () => {
  const nodes: GraphNode[] = [
    { nodeId: 'a', parent: { type: 'derived_from', target: 'b' } },
    { nodeId: 'b', parent: { type: 'derived_from', target: 'c' } },
    { nodeId: 'c', parent: { type: 'derived_from', target: 'a' } },
  ];
  const cycles = validateGraph(nodes).filter((issue) => issue.code === 'parent-cycle');
  assert.equal(cycles.length, 1);
});

test('treats a repeated parent edge as a duplicate relation', () => {
  const nodes: GraphNode[] = [
    { nodeId: 'root' },
    {
      nodeId: 'child',
      parent: { type: 'derived_from', target: 'root' },
      relations: [{ type: 'derived_from', target: 'root' }],
    },
  ];
  assert.equal(validateGraph(nodes)[0]?.code, 'duplicate-relation');
});

test('rejects public links to draft nodes while allowing draft-to-draft links', () => {
  const nodes: GraphNode[] = [
    { nodeId: 'draft-root', draft: true },
    { nodeId: 'public-child', parent: { type: 'derived_from', target: 'draft-root' } },
    { nodeId: 'public-related', relations: [{ type: 'related_to', target: 'draft-root' }] },
    { nodeId: 'draft-child', draft: true, parent: { type: 'derived_from', target: 'draft-root' } },
  ];
  const issues = validateGraph(nodes).filter((issue) => issue.code === 'public-targets-draft');
  assert.equal(issues.length, 2);
});
