import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMermaid from './src/plugins/remark-mermaid.mjs';

export default defineConfig({
  site: 'https://j-i-p.github.io',
  base: '/engineering-notes',
  output: 'static',
  markdown: {
    processor: unified({ remarkPlugins: [remarkMermaid] }),
  },
});
