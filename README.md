# YPinLab Engineering Knowledge — V1 Prototype

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
- `project` — a buildable output or project root
- `question` — an unresolved branch

## Authoring rule

Only one primary relationship (`parent`) is encouraged when creating a new node. Additional semantic `relations` are optional and can later be suggested by AI.

## Run

Astro 6 requires Node 22.12+.

```bash
npm install
npm run dev
```

The current execution environment used to create this prototype did not expose Astro through its npm mirror, so the Astro dependency could not be installed here. The source follows the current Astro 6 Content Layer API (`src/content.config.ts`, `glob()` loader, `getCollection()`, `render()`, `getStaticPaths()`).

## Prototype preview

`prototype/index.html` is a dependency-free visual mock generated alongside the Astro source so the V1 UI can be reviewed immediately.

## Next iteration

1. Add a `promote-note` command that transforms private Obsidian notes into public draft nodes.
2. Add content validation for broken `target` IDs and cycles in `parent` paths.
3. Parse `[[wiki-links]]` as weak/automatic mentions.
4. Let AI suggest secondary semantic relations in PRs; human approves strong relations.
5. Replace the Explore lane mock with React Flow only when the graph has enough nodes to justify it.
