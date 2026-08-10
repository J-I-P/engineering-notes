---
nodeId: vad-benchmark
title: "Testing VAD Before ASR Inference"
description: "An experiment branch for measuring whether explicit speech segmentation reduces silence-induced transcription failures."
type: experiment
status: experimenting
publishedAt: 2026-08-10
topics: [asr-reliability, vad, whisper, evaluation]
parent:
  target: whisper-hallucination
  relation: investigates
evidence: [local_experiment]
relations:
  - type: validates
    target: asr-reliability-is-pipeline-problem
---

## Hypothesis

Explicitly separating speech from non-speech before transcription should reduce a meaningful class of hallucinations, but it will not solve every reliability failure.

## Experiment shape

The V1 benchmark should compare the same audio set under at least two paths:

1. direct transcription;
2. VAD-segmented transcription.

The important output is not only transcription accuracy. It should also record false text emitted during non-speech intervals, lost speech near boundaries, latency, and segmentation stability.

## Current result

This prototype intentionally does not invent benchmark numbers. The node stays in **Experimenting** until reproducible measurements are attached.
