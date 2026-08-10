import assert from 'node:assert/strict';
import test from 'node:test';
import remarkMermaid from '../src/plugins/remark-mermaid.mjs';

test('turns Mermaid fences into safe render containers', () => {
  const tree = {
    type: 'root',
    children: [
      { type: 'code', lang: 'js', value: 'const value = 1;' },
      {
        type: 'blockquote',
        children: [{ type: 'code', lang: 'mermaid', meta: 'example', value: 'A --> B & C' }],
      },
    ],
  };

  remarkMermaid()(tree);

  assert.deepEqual(tree.children[0], {
    type: 'code',
    lang: 'js',
    value: 'const value = 1;',
  });
  assert.deepEqual(tree.children[1]!.children![0], {
    type: 'html',
    value: '<div class="mermaid">A --&gt; B &amp; C</div>',
  });
});
