# Architecture Decisions

## Source boundaries

```text
PRIVATE OBSIDIAN REPO
Raw notes / work observations / private context
        |
        | promote + sanitize
        v
PUBLIC BLOG REPO
Markdown knowledge nodes + Astro renderer
        |
        | build
        v
STATIC HTML / VERCEL
```

The repositories share an ontology, not files.

## Relation strategy

Relations are deliberately layered:

1. Facets — `type` and registered `topics`; used for browsing, not hierarchy.
2. Primary — one `parent`; author supplies this when the origin is clear.
3. Mentions — future `[[wiki-links]]`; inferred automatically.
4. Semantic — `validates`, `contradicts`, `supersedes`, etc.; human-reviewed.

The author should never maintain a complete graph manually.

Topics are cataloged in `src/data/topics.ts`. A node may belong to multiple topics, while its optional `parent` expresses only the primary path by which the knowledge formed. A `project` is a node type and may be an output of any path; it is not required as a root or grouping container.

## Public safety for work-originated knowledge

A public `case` preserves the general engineering problem and removes company-identifying information, private endpoints, customer data, internal metrics, proprietary architecture, and confidential business logic.

## V1 non-goals

- CMS admin
- runtime API
- PostgreSQL / graph DB
- user accounts
- automatic AI publishing
- exhaustive graph visualization
