---
nodeId: asr-reliability-is-pipeline-problem
title: "ASR Reliability Is a Pipeline Problem"
description: "The current engineering understanding: production reliability emerges from segmentation, inference, validation, and evaluation—not model selection alone."
type: learning
status: learned
publishedAt: 2026-08-10
topics: [asr-reliability, asr, reliability, system-design]
parent:
  target: vad-benchmark
  relation: validates
evidence: [production_observation, local_experiment]
relations:
  - type: inspires
    target: model-replacement-is-not-system-replacement
---

## Previous understanding

A model migration could be treated mostly as an inference-layer replacement: switch the engine, adapt the interface, and compare output quality.

## Current understanding

For a user-facing speech system, reliability is distributed across the pipeline. Audio segmentation, no-speech handling, decoding configuration, post-processing, observability, and evaluation all affect whether the result is trustworthy.

This does not imply that every pipeline needs maximal complexity. It means the system boundary has to match the failure modes observed in realistic data.
