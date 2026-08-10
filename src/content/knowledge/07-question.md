---
nodeId: quantify-asr-hallucination
title: "How Should ASR Hallucination Be Quantified?"
description: "WER alone may miss fluent false text during silence. What metric should capture this failure mode?"
type: question
status: seed
publishedAt: 2026-08-10
topics: [asr-reliability, asr, evaluation, metrics]
parent:
  target: whisper-hallucination
  relation: derived_from
evidence: []
relations: []
---

## Open question

Word error rate is useful, but a reliability dashboard may need a separate metric for unsupported text emitted during silence or non-speech intervals.

Possible directions include false-positive transcription duration, unsupported token rate, segment-level hallucination incidence, or a domain-specific quality rubric.
