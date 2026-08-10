---

nodeId: whisper-hallucination
title: "Why Silence Can Become Plausible Transcription"
description: "Researching why Whisper-family models can emit confident-looking text during silence or low-information audio."
type: research
status: exploring
publishedAt: 2026-08-10
topics: [asr-reliability, whisper, asr, hallucination]
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

This question came from the reliability issue observed during the [[asr-engine-migration]] case.

The difficult part is that hallucinated output does not necessarily look broken. It can resemble normal language closely enough to be treated as a valid transcription by downstream systems.

## Working model

My current working model is that transcription should not be viewed as:

```text
Speech exists?
    ↓
Yes
    ↓
Transcribe
```

The actual pipeline has more interacting decisions:

```text
Audio
  ↓
Segmentation
  ↓
Speech / silence signals
  ↓
Model inference
  ↓
Decoding
  ↓
Context handling
  ↓
Transcript
```

A Whisper-family model is still performing sequence generation under uncertainty. When the audio provides weak evidence, the final result can therefore depend heavily on surrounding factors such as:

* how audio is segmented,
* how silence or non-speech regions are handled,
* decoding parameters,
* thresholds such as no-speech detection,
* previous context or prompts,
* and the quality of the incoming audio.

This means hallucination may not have a single cause.

A silence-related failure, for example, could originate from inappropriate segmentation before inference, from how the model interprets an ambiguous segment, or from the decision logic that accepts the generated text afterward.

## Why this matters

A pipeline that only checks whether inference succeeded cannot distinguish between:

```text
Valid transcription
```

and:

```text
Plausible-looking but unsupported transcription
```

That makes hallucination a reliability problem rather than only an accuracy problem.

The system may need signals outside the generated text itself to decide whether a segment should be trusted, rejected, retried, or flagged for further processing.

## Research directions

The main areas I want to understand are:

### Silence and speech detection

How useful are signals such as `no_speech_prob`, and when should Voice Activity Detection prevent a segment from reaching transcription in the first place?

### Segmentation

Do long silence regions, short chunks, or poorly chosen boundaries make hallucination more likely?

### Decoding

How much do decoding parameters and fallback behavior influence unsupported text generation?

### Context

Can previously generated text or prompt context influence what gets produced when the current audio contains weak information?

### Evaluation

WER alone may not fully describe this failure mode.

A hallucinated sentence can add content that never existed in the reference audio, so evaluation may also need to explicitly measure false transcription or unsupported text.

## What I still need to verify

* Which failure modes are dominated by segmentation versus decoding?
* How strongly does VAD reduce silence-related hallucination?
* How should hallucination rate be measured without relying only on WER?
* Which no-speech or confidence thresholds are useful in practice?
* Which thresholds generalize across different audio domains?
* How much does previous context affect low-information segments?
* Which protections belong before inference versus after inference?

## Next experiment

The first practical experiment is to isolate one variable:

> **Does removing non-speech regions with VAD reduce the hallucination observed on silence-heavy audio?**

That experiment is tracked in [[vad-benchmark]].

For now, the working conclusion is intentionally limited:

> **Hallucination should be investigated as a pipeline behavior, not assumed to be a model-only failure.**

Further experiments are needed before turning that into a stronger engineering recommendation.
