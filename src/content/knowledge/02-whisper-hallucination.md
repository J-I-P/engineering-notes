---
nodeId: whisper-hallucination
title: "Why Silence Can Become Plausible Transcription"
description: "Researching why Whisper-family models can emit confident-looking text during silence or low-information audio."
type: research
status: exploring
publishedAt: 2026-08-10
topics: [whisper, asr, hallucination]
project: asr-reliability-branch
parent:
  target: asr-engine-migration
  relation: derived_from
evidence: [official_docs, source_code, external_reference]
relations:
  - type: tested_by
    target: vad-benchmark
---

## Research question

Why can silence, background noise, or weak speech produce text that *looks linguistically reasonable* even when the audio does not support it?

## Working model

A speech model is not a binary detector that first decides whether speech exists and only then transcribes. Decoding behavior, segment boundaries, probability thresholds, prompt/context carry-over, and upstream audio segmentation all shape the final output.

## What I still need to verify

- Which failure modes are dominated by segmentation versus decoding?
- How should hallucination rate be measured without relying only on WER?
- Which thresholds generalize across different audio domains?
