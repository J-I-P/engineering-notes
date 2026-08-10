---
nodeId: asr-engine-migration
title: "When an ASR Migration Exposed a Reliability Problem"
description: "A real-world migration from a legacy speech recognizer to faster-whisper revealed that model replacement alone was not enough for reliable transcription."
type: case
status: exploring
publishedAt: 2026-08-10
topics: [asr-reliability, asr, whisper, reliability]
origin:
  kind: work
  disclosure: anonymized
evidence: [production_observation]
relations:
  - type: inspires
    target: transcript-quality-inspector
---

## What happened

An existing speech-recognition pipeline was migrated from a legacy recognizer to a Whisper-based implementation. The migration looked straightforward at the model boundary: preserve the input, replace inference, and keep the surrounding application unchanged.

The first realistic outputs showed why that mental model was incomplete. Silence-heavy and low-information segments could produce fluent-looking text that was not present in the audio.

## Why this became a knowledge branch

The interesting question was no longer *which ASR model is better?* It became *what makes an ASR pipeline trustworthy enough to use in a real system?*

That question produced separate research into hallucination behavior, voice activity detection, chunking, decoding behavior, and quality evaluation.

> Public note: the engineering case is intentionally generalized. Company-specific architecture, data, metrics, and implementation details are not part of this public node.
