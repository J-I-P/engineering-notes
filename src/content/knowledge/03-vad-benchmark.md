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
relations: []

---

## Hypothesis

Explicitly separating speech from non-speech before transcription should reduce a meaningful class of hallucinations caused by silence or low-information audio.

However, VAD should not be treated as a complete solution to ASR reliability.

Even if non-speech regions are filtered successfully, failures may still come from segmentation boundaries, weak speech, decoding behavior, context carry-over, or other parts of the transcription pipeline.

The experiment therefore asks a narrower question:

> **Does VAD materially reduce unsupported transcription on silence-heavy audio without introducing unacceptable loss of real speech?**

## Experiment design

The first benchmark should use the same audio samples, ASR model, and decoding configuration across two paths.

### Path A — Direct transcription

```text
Audio
  ↓
ASR inference
  ↓
Transcript
```

### Path B — VAD before transcription

```text
Audio
  ↓
Voice Activity Detection
  ↓
Speech segments
  ↓
ASR inference
  ↓
Transcript
```

Keeping the remaining configuration unchanged makes it easier to isolate the effect of speech segmentation.

## What to measure

Transcription accuracy alone is not enough for this experiment.

The benchmark should also capture:

### Unsupported transcription

How often does the system emit text during intervals where no meaningful speech exists?

### Boundary loss

Does VAD remove real speech near the beginning or end of detected segments?

### Segmentation stability

Does the same type of audio consistently produce reasonable speech boundaries?

### Transcription quality

How does the resulting transcript compare with the reference audio after segmentation?

### Latency

How much additional processing time does VAD introduce?

These measurements matter because an approach that reduces hallucination but frequently removes valid speech would simply replace one reliability problem with another.

## Test dataset

The initial dataset should intentionally contain different audio conditions rather than only clean speech.

Useful categories include:

* normal continuous speech,
* long silence,
* short pauses between sentences,
* background noise,
* weak or distant speech,
* speech beginning near a segment boundary,
* speech ending near a segment boundary.

The goal is not yet to build a comprehensive ASR benchmark.

The goal is to create a small reproducible dataset that exposes the failure mode observed in [[whisper-hallucination]].

## Success criteria

The experiment should provide evidence for or against the hypothesis by answering:

* Does VAD reduce false text during non-speech intervals?
* How much valid speech is lost at segmentation boundaries?
* Does transcription quality improve or degrade?
* What latency overhead is introduced?
* Are the results stable across different audio conditions?

A positive result should not simply mean:

> VAD produced fewer hallucinations on one sample.

It should show that the improvement is reproducible and does not introduce a larger failure elsewhere in the pipeline.

## Current result

No benchmark numbers are published yet.

This node remains in **Experimenting** until the test dataset, configuration, measurements, and results are reproducible.

The experiment is intentionally separated from the current working hypothesis so that the final conclusion can be based on measured behavior rather than assumption.

## Expected follow-up

If VAD materially improves reliability, the result will support the broader learning that ASR reliability depends on more than model selection.

That learning is tracked in [[asr-reliability-is-pipeline-problem]].

If the improvement is limited, the next investigation should focus on other parts of the pipeline, such as segmentation strategy, decoding behavior, context handling, and post-inference quality checks.
