---
title: Observability Foundations — Metrics, Traces, and Structured Logs
slug: day-115-observability-foundations-metrics-traces-and-structured-logs
dayLabel: Day 115
level: Expert
estimatedMinutes: 55
order: 115
track: java
---
# Day 115 [Expert]: Observability Foundations — Metrics, Traces, and Structured Logs

## Goal

Instrument a Java application with the three pillars of observability — metrics, distributed traces, and structured logs — using standards-based pure Java tooling.

## Prerequisites

- Day 114 complete
- Day 84 (advanced logging) complete

## Explanation

Observability is what allows you to understand production behaviour without attaching a debugger. The three pillars — metrics, traces, logs — are distinct and complementary; all three are needed for production confidence.

## Topic by Topic

### Topic 1: Metrics with Micrometer

Theory:
Micrometer is a vendor-neutral metrics facade. `Counter`, `Timer`, `Gauge`, `DistributionSummary`. Backends: Prometheus, Datadog, CloudWatch.

Practical:
Count `transfer.executed` events; record `transfer.latency` as timer; expose via Prometheus scrape endpoint.

### Topic 2: Distributed tracing with OpenTelemetry

Theory:
A trace is a tree of spans. `TraceId` links spans across services. `SpanId` identifies one operation. Propagate via W3C `traceparent` header.

Practical:
Add OTel Java SDK; create parent span for use case; child span for JDBC call; export to Jaeger.

### Topic 3: Structured logs as events

Theory:
JSON logs keyed with `traceId`, `spanId`, `userId`, `operation`, `latencyMs`. Makes logs queryable in ELK.

Practical:
Enrich every log line with current span context via OTel `Span.current()`.

### Topic 4: Correlating the three signals

Theory:
All three share the same `traceId`. In a log search, click trace link; in a trace, click log line; in a metric spike, drill to traces.

Practical:
Trigger one transfer; find its trace in Jaeger; find its log in ELK; find its metric in Prometheus.

### Topic 5: Health and readiness checks

Theory:
`/health/live` (JVM alive) and `/health/ready` (DB connected, dependencies up). Return `200` or `503`.

Practical:
Implement both as plain Java HTTP handlers; connect to HikariCP pool status.

## Key Concepts

- Metrics: counter/timer/gauge aggregates
- Traces: `traceId`/`spanId` across services
- Logs: structured JSON with trace context
- Three signals correlated via `traceId`
- Health: liveness vs readiness distinction

## Hands-on Coding

```java
// Micrometer counter + timer
import io.micrometer.core.instrument.*;

MeterRegistry registry = new PrometheusMeterRegistry(PrometheusConfig.DEFAULT);

Counter transferCounter = registry.counter("transfer.executed");
Timer transferTimer = registry.timer("transfer.latency");

void executeTransfer(TransferCommand cmd) {
    transferTimer.record(() -> {
        useCase.transfer(cmd);
        transferCounter.increment();
    });
}

// OpenTelemetry span creation
import io.opentelemetry.api.trace.*;

Tracer tracer = openTelemetry.getTracer("com.example.banking");

void executeTransfer(TransferCommand cmd) {
    Span span = tracer.spanBuilder("transfer")
        .setAttribute("from.account", cmd.fromId())
        .setAttribute("amount", cmd.amount().toString())
        .startSpan();
    try (var scope = span.makeCurrent()) {
        useCase.transfer(cmd);
        span.setStatus(StatusCode.OK);
    } catch (Exception e) {
        span.recordException(e);
        span.setStatus(StatusCode.ERROR);
        throw e;
    } finally {
        span.end();
    }
}
```

## Mini Exercise

Add a `Gauge` that tracks current queue depth in Day 90 processing engine.

## Assessment Quiz

1. What is a distributed trace?
2. Difference between `Counter` and `Timer`?
3. Difference between liveness and readiness probe?

Answers:

1. A tree of spans across services sharing the same `traceId` — shows the full request path.
2. `Counter` counts occurrences; `Timer` records duration and count with percentiles.
3. Liveness: JVM is running (restart if fails); readiness: app is ready to serve traffic (remove from load balancer if fails).

## Task

- Add Micrometer + OTel tracing to Day 60 banking project; instrument every use case execution.

## Day 115 Outcome

You can instrument any Java application with all three observability pillars using standards-based tooling.
