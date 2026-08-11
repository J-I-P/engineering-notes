---
nodeId: what-should-remain-application-owned
title: "What Should Remain Application-Owned in a Managed Agent System?"
description: "An open question about where to place the boundary between model-driven orchestration and deterministic application behavior."
type: question
status: seed
publishedAt: 2026-08-10
topics: [ai-agent-architecture, ai-systems, system-design, engineering-judgment]
parent:
    target: managed-agent-system-boundary
    relation: derived_from
evidence: []
relations: []
---

## Open question

Moving orchestration into a managed agent platform creates a useful but difficult boundary question:

> **Which responsibilities should the agent own, and which should remain deterministic application code?**

Some responsibilities appear naturally application-owned:

* authorization;
* data validation;
* security boundaries;
* irreversible operations;
* strict business rules.

Others are less obvious:

* knowledge-source selection;
* retries;
* conversation state;
* tool sequencing;
* fallback behavior;
* output validation;
* deciding when clarification is required.

For each responsibility, several properties may matter:

```text
How deterministic must it be?
How explainable must it be?
What happens when the model chooses incorrectly?
Can the behavior be replayed?
Does it cross a security boundary?
Does failure have a reversible outcome?
```

## Why this remains open

There probably is not one fixed boundary for every agent system.

A low-risk internal assistant and a system capable of changing application state should not necessarily assign the same authority to an agent.

The boundary may also change as agent platforms gain stronger workflow, policy, evaluation, and observability capabilities.

For now, the question I want to keep visible is:

> **Which decisions benefit from model flexibility, and which decisions are too important to become probabilistic?**

That question should guide future agent architecture decisions rather than assuming that more agent ownership is always better.
