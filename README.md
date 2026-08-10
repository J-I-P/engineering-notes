# J-I-P Engineering Knowledge — V1 Prototype

A developer blog prototype where Markdown entries are **knowledge nodes**, not isolated posts.

## V1 proves

- Markdown remains the source of truth.
- Work-originated engineering cases can start a branch without a side project.
- Semantic relations live in frontmatter and render into Knowledge Path / Relations / Backlinks.
- A side project can be the **result** of research and learning rather than the root of every branch.
- No database and no CMS backend are required for the first version.

## Content types

- `case` — what happened in a real engineering context
- `research` — why it might happen
- `experiment` — how a hypothesis is tested
- `learning` — current understanding
- `takeaway` — reusable engineering judgment
- `project` — a buildable output produced by a knowledge path
- `question` — an unresolved branch

## Authoring rule

Only one primary relationship (`parent`) is encouraged when creating a new node. Additional semantic `relations` are optional and can later be suggested by AI. Topics are browsing facets rather than hierarchy; every topic slug must be registered in `src/data/topics.ts`.

## Run

Astro 6 requires Node 22.12+.

```bash
npm install
npm run dev
```

Before publishing content, run the same quality gate used by CI:

```bash
npm run check
npm run validate
npm test
npm run build
```

The site includes a complete `/knowledge/` archive, topic-specific static Explore pages, semantic relations, backlinks, canonical/social metadata, a sitemap, and a responsive navigation menu.

## Deployment

The production site is deployed to GitHub Pages at <https://j-i-p.github.io/engineering-notes/>. The Pages workflow builds the Astro project on pushes to `main` and `agent/knowledge-system-foundation`, and it can also be started manually from GitHub Actions.

## Prototype preview

`prototype/index.html` is a dependency-free visual mock generated alongside the Astro source so the V1 UI can be reviewed immediately.

## Content integrity

`npm run validate` rejects duplicate node IDs, unknown topics, broken relation targets, duplicate edges, and cycles in primary parent paths. GitHub Actions runs install, type checking, validation, tests, and the production build on every push and pull request.

## Later iterations

1. Add a `promote-note` command that transforms private Obsidian notes into public draft nodes and sanitizes work-originated material.
2. Parse `[[wiki-links]]` as weak/automatic mentions.
3. Let AI suggest secondary semantic relations in PRs; human approves strong relations.
4. Replace the Explore lanes with a full graph visualization only when the corpus is large enough to justify it.
