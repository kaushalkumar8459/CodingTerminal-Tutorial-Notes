---
title: Observability Logs Metrics Traces
slug: day-055-observability-logs-metrics-traces
dayLabel: Day 55
level: Intermediate
estimatedMinutes: 30
order: 55
track: nodejs
---
# Day 055 [Intermediate]: Observability Logs Metrics Traces

## Index

- Goal
- Prerequisites
- Explanation
- Topic by Topic
- Key Concepts
- Visual Concept Map
- End-to-End Practical
- Hands-on Coding
- Mini Exercise
- Assessment Quiz
- Task
- Self Check
- Interview Questions and Answers
- Day Outcome

## Goal

Implement practical observability in Node services using structured logs, metrics, and distributed traces.

## Prerequisites

- Day 054 cloud deployment flow
- Basic monitoring and logging awareness

## Explanation

Observability answers three questions: what happened, how often, and where it happened. Logs provide event detail, metrics show trends, and traces connect work across services.

## Topic by Topic

### Topic 1: Structured Logging

Theory:
Machine-readable logs improve searchability and incident triage.

Practical:
Log JSON with requestId, userId, route, and latency.

**Explanation:**
This topic explains Structured Logging in a practical Node.js backend context so you can build reliable, production-ready APIs and services.

**Key Points:**
- Understand the core idea behind Structured Logging.
- Apply the practical pattern with safe defaults and validation.
- Keep the implementation observable, maintainable, and secure where relevant.

### Topic 2: Metrics for Service Health

Theory:
Metrics quantify throughput, errors, and latency.

Practical:
Expose Prometheus metrics endpoint.

**Explanation:**
This topic explains Metrics for Service Health in a practical Node.js backend context so you can build reliable, production-ready APIs and services.

**Key Points:**
- Understand the core idea behind Metrics for Service Health.
- Apply the practical pattern with safe defaults and validation.
- Keep the implementation observable, maintainable, and secure where relevant.

### Topic 3: Distributed Tracing Basics

Theory:
Traces follow request flow through microservices.

Practical:
Propagate trace context via HTTP headers.

**Explanation:**
This topic explains Distributed Tracing Basics in a practical Node.js backend context so you can build reliable, production-ready APIs and services.

**Key Points:**
- Understand the core idea behind Distributed Tracing Basics.
- Apply the practical pattern with safe defaults and validation.
- Keep the implementation observable, maintainable, and secure where relevant.

### Topic 4: SLOs and Alerting

Theory:
Alerts should be tied to user-impacting objectives.

Practical:
Create alert on elevated error rate and p95 latency.

**Explanation:**
This topic explains SLOs and Alerting in a practical Node.js backend context so you can build reliable, production-ready APIs and services.

**Key Points:**
- Understand the core idea behind SLOs and Alerting.
- Apply the practical pattern with safe defaults and validation.
- Keep the implementation observable, maintainable, and secure where relevant.

### Topic 5: Incident Investigation Workflow

Theory:
Correlate logs, metrics, and traces to reduce mean time to resolution.

Practical:
Use one requestId to connect all telemetry signals.

**Explanation:**
This topic explains Incident Investigation Workflow in a practical Node.js backend context so you can build reliable, production-ready APIs and services.

**Key Points:**
- Understand the core idea behind Incident Investigation Workflow.
- Apply the practical pattern with safe defaults and validation.
- Keep the implementation observable, maintainable, and secure where relevant.

### Topic 6: Metric Cardinality and Instrumentation Discipline

Theory:
Metrics are powerful but expensive when labels explode (high cardinality). Good instrumentation keeps metrics stable and queryable.

Practical:
Use low-cardinality labels like route and status class, not userId or orderId.

**Explanation:**
This topic explains Metric Cardinality and Instrumentation Discipline in a practical Node.js backend context so you can build reliable, production-ready APIs and services.

**Key Points:**
- Understand the core idea behind Metric Cardinality and Instrumentation Discipline.
- Apply the practical pattern with safe defaults and validation.
- Keep the implementation observable, maintainable, and secure where relevant.

## Telemetry Signal Table

| Signal  | Best for                    | Typical Example                |
| ------- | --------------------------- | ------------------------------ |
| Logs    | Event details and debugging | Validation error payload       |
| Metrics | Trend monitoring and alerts | `http_request_duration_ms` p95 |
| Traces  | Cross-service latency path  | API -> auth -> payments chain  |

## Key Concepts

- Structured and correlated logs
- Golden signals and service metrics
- Distributed tracing fundamentals
- SLO-driven alert design
- Incident triage methodology
- Metric cardinality control
- Stable telemetry instrumentation patterns

## Visual Concept Map

```mermaid
flowchart LR
  A[Incoming Request] --> B[Log with requestId]
  B --> C[Record Metrics]
  C --> D[Create Trace Span]
  D --> E[Dashboards + Alerts]
```

## End-to-End Practical

1. Add request-level structured logging.
2. Capture request counters and latency histograms.
3. Add basic tracing instrumentation.
4. Build one dashboard for key API signals.
5. Configure two actionable alerts.

## Hands-on Coding

### Example 1: Case - Structured Request Logging

Scenario:
Production support needs searchable logs per request.

```js
app.use((req, res, next) => {
  const start = Date.now();
  const requestId = req.headers["x-request-id"] || crypto.randomUUID();
  res.setHeader("x-request-id", requestId);

  res.on("finish", () => {
    logger.info(
      {
        requestId,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        durationMs: Date.now() - start,
      },
      "request_complete",
    );
  });

  next();
});
```

### Example 2: Case - Prometheus Metrics Endpoint

Scenario:
Ops team needs live request and latency metrics.

```js
const client = require("prom-client");
const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
```

### Example 3: Case - Trace Header Propagation

Scenario:
Order service must forward trace context to payment service.

```js
const traceId = req.headers["x-trace-id"] || crypto.randomUUID();
await fetch("http://payment/api/pay", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-trace-id": traceId,
  },
  body: JSON.stringify({ orderId: req.body.orderId }),
});
```

### Example 4: Case - Low-cardinality HTTP Metrics

Scenario:
Dashboard becomes slow because labels include unique IDs.

```js
const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["route", "method", "statusClass"],
  registers: [register],
});

app.use((req, res, next) => {
  res.on("finish", () => {
    const statusClass = `${String(res.statusCode)[0]}xx`;
    httpRequests.inc({
      route: req.route?.path || req.path,
      method: req.method,
      statusClass,
    });
  });
  next();
});
```

### Example 5: Case - Traceparent Propagation

Scenario:
Downstream services already use W3C trace context format.

```js
const traceparent = req.headers["traceparent"];

await fetch("http://payment/api/pay", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    ...(traceparent ? { traceparent } : {}),
  },
  body: JSON.stringify({ orderId: req.body.orderId }),
});
```

## Mini Exercise

Scenario:
Instrument one Node API route with logs, metrics, and trace context, then debug a simulated latency incident.

Expected output:

- Correlated log and trace identifiers
- Live metric visibility for route behavior
- Incident timeline with root-cause hypothesis

## Assessment Quiz

### Quiz Questions

1. Why are logs alone insufficient for modern distributed systems?
2. Which metric usually indicates latency degradation best?
3. True or False: Skipping edge-case handling is acceptable in production.
4. Why should alerts map to SLO impact?
5. Why avoid high-cardinality metric labels?

### Quiz Answers

1. They lack aggregated trends and end-to-end context by themselves.
2. p95 or p99 request duration.
3. False.
4. It avoids noisy alerts and focuses team response on real user impact.
5. They increase storage/query cost and make monitoring systems unstable.

## Task

- Add log, metrics, and tracing to one module
- Define alert thresholds for error and latency
- Complete mini exercise and quiz.

## Self Check

- You can build practical observability into Node services.
- You can investigate incidents using correlated telemetry.
- You can answer at least 4 out of 5 quiz questions.

## Interview Questions and Answers

### Beginner

Question: What are the three pillars of observability?

Answer: Logs, metrics, and traces.

### Middle

Question: Why include requestId in every log entry?

Answer: It connects events for one request across middleware and services.

### Advanced

Question: What is one observability tradeoff?

Answer: More telemetry gives better diagnosis but increases storage cost and instrumentation overhead.

## Day 055 Outcome

- You can implement log-metric-trace observability patterns in Node
- You can connect telemetry signals for faster incident response
- You are ready for advanced reliability engineering topics next
