---
nodeId: measuring-asr-hallucination
title: "How Should ASR Hallucination Be Measured?"
description: "A measurement gap left by a qualitative VAD experiment: how should reduced unsupported transcription be quantified?"
type: question
status: seed
publishedAt: 2026-08-10
topics: [asr-reliability, evaluation, hallucination, metrics]
parent:
  target: vad-hallucination-evaluation
  relation: derived_from
evidence: []
relations: []
---

## Open question

During [[vad-hallucination-evaluation]], I observed that silence-induced unsupported transcription became less apparent after adding VAD, and the change was useful enough to retain. However, I did not record a formal quantitative benchmark at the time.

That leaves a concrete measurement gap: the practical improvement was observed through manual before-and-after evaluation, but its size, trade-offs, and generality remain unknown.

Word error rate is useful for comparing a transcription against a reference, but it may not fully describe the reliability problem observed in silence or non-speech intervals.

The specific failure I want to measure is:

> **How often does the system produce text that is not supported by meaningful speech in the input?**

Possible directions include:

- false-positive transcription duration;
- unsupported token rate;
- segment-level hallucination incidence;
- hallucinated output per minute of non-speech audio;
- a domain-specific reliability rubric.

## Why this is still open

I do not yet have enough evidence to decide which metric is the most useful, and the original experiment did not record the data needed to quantify the improvement retrospectively.

A useful metric should ideally be:

- reproducible;
- interpretable;
- comparable across transcription runs;
- sensitive to unsupported text;
- not dependent on manually inspecting every result.

This remains an open question until an evaluation approach is tested against real examples.
