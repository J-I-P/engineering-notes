---

nodeId: event-driven-moves-failure
title: "Event-Driven Architecture Moves Failure — It Does Not Remove It"
description: "CDC and Kafka reduced synchronous producer coupling, but moved reliability concerns into ordering, replay, offsets, infrastructure health, and downstream side effects."
type: takeaway
status: learned
publishedAt: 2026-08-11
topics: [event-driven-reliability, engineering-judgment, reliability, system-design]
parent:
    target: notification-cdc-migration
    relation: derived_from
evidence: [production_observation]
relations:
    - type: related_to
      target: kafka-ordering-boundary
    - type: related_to
      target: manual-offset-processing-contract
    - type: related_to
      target: notification-fanout-boundary
---

## Takeaway

Moving notification triggering from application calls to CDC improved architectural decoupling.

The original failure boundary looked roughly like:

```text
Business write
     ↓
Explicit notification trigger
     ↓
Notification service
```

After introducing Debezium and Kafka, the request path became less coupled:

```text
Business write
     ↓
MySQL binlog
     ↓
Debezium
     ↓
Kafka
     ↓
Consumer
     ↓
Notification pipeline
```

But this did not remove failure.

It redistributed it.

The system now had to reason about:

* connector health;
* topic availability;
* offsets;
* ordering;
* replay;
* consumer crashes;
* recipient fan-out;
* downstream worker failures;
* external push providers.

That is not an argument against event-driven architecture.

It is a reminder that **decoupling and simplicity are not synonyms**.

## Before and after

Synchronous coordination concentrates failure in one request path.

```text
Producer
   ↓
Notification API
```

Event-driven coordination separates the components:

```text
Producer
   ↓
Database
   ↓
CDC
   ↓
Broker
   ↓
Consumer
```

The second architecture can isolate services and improve recoverability.

It also requires the system to make asynchronous failure states explicit.

## Reusable questions

Before introducing an event-driven pipeline, I now want clear answers to:

* What is the source of truth for the event?
* What ordering boundary matters?
* When is work acknowledged?
* What happens after a crash?
* Can an event be replayed safely?
* Which side effects are idempotent?
* How is downstream fan-out bounded?
* How do we know an event stopped progressing?

If those questions have no answer, adding a broker may only make the original failure harder to see.

## Reusable principle

> **Event-driven architecture moves coordination out of the request path, but the reliability work still has to live somewhere.**

The goal is not to eliminate failure.

The goal is to move failure into boundaries that can be observed, retried, replayed, and reasoned about.
