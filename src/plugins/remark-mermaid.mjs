const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

export default function remarkMermaid() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'code' && node.lang === 'mermaid') {
        node.type = 'html';
        node.value = `<div class="mermaid">${escapeHtml(node.value)}</div>`;
        delete node.lang;
        delete node.meta;
        return;
      }

      node.children?.forEach(visit);
    };

    visit(tree);
  };
}
