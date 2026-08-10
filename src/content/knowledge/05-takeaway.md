---
nodeId: model-replacement-is-not-system-replacement
title: "Model Replacement Is Not System Replacement"
description: "A reusable engineering principle extracted from the ASR migration branch."
type: takeaway
status: verified
publishedAt: 2026-08-10
topics: [engineering-judgment, reliability, ai-systems]
project: asr-reliability-branch
parent:
  target: asr-reliability-is-pipeline-problem
  relation: derived_from
evidence: [production_observation, local_experiment]
relations:
  - type: inspires
    target: transcript-quality-inspector
---

## Takeaway

Replacing a model can improve one component while exposing new system-level failure modes.

The migration is complete only when the *behavior of the whole pipeline* meets the reliability requirement—not when a new model successfully returns output.

## Reusable question

Whenever an AI component is swapped, ask: **which assumptions made by the surrounding system are no longer true?**
