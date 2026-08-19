---
title: Advanced Logging Strategy with SLF4J and Logback
slug: day-084_1-advanced-logging-strategy-with-slf4j-and-logback
dayLabel: Day 84_1
level: Advanced
estimatedMinutes: 50
order: 84
track: java
---
# Day 84 [Advanced]: Advanced Logging Strategy with SLF4J and Logback

## Goal

Design a production-grade logging strategy including structured logging, async appenders, rate limiting, and multi-environment configuration.

## Prerequisites

- Day 83 complete
- Day 52 (logging basics) complete

## Explanation

Day 52 covered basic setup. This day covers how to design logging for high-throughput production services where naive logging causes measurable latency spikes.

## Topic by Topic

### Topic 1: Async appender for low-latency logging

Theory:
`AsyncAppender` queues log events in memory; a background thread writes to file. Eliminates I/O on request thread.

Practical:
Wrap `RollingFileAppender` in `AsyncAppender` with `queueSize=512`.

### Topic 2: Structured JSON logging

Theory:
JSON logs are machine-parseable and searchable in ELK/Splunk. Use `logstash-logback-encoder`.

Practical:
Replace pattern appender with JSON encoder; add `traceId` MDC field.

### Topic 3: Per-environment configuration

Theory:
Use `logback-spring.xml` or environment variable to switch between console (dev) and file JSON (prod).

Practical:
Create profile-based config: `dev` = CONSOLE/DEBUG, `prod` = FILE-JSON/INFO.

### Topic 4: Log sampling and rate limiting

Theory:
Log at most N messages per second from a high-volume path to prevent log flooding.

Practical:
Use a token-bucket counter to sample 1% of cache-miss logs.

### Topic 5: Avoiding common logging anti-patterns

Theory:

- Logging in a tight loop
- `log.debug(expensiveCompute())` without guard
- Logging passwords or PII
- Swallowing exceptions without logging

Practical:
Audit and fix 4 anti-patterns in a sample codebase.

## Key Concepts

- Async appender queue model
- JSON structured logs
- MDC for request correlation
- Conditional log level check (`isDebugEnabled`)
- PII exclusion discipline

## Hands-on Coding

```xml
<!-- logback.xml — async JSON for production -->
<configuration>
    <appender name="JSON_FILE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/app.json</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/app.%d{yyyy-MM-dd}.json</fileNamePattern>
            <maxHistory>7</maxHistory>
        </rollingPolicy>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <includeMdcKeyName>traceId</includeMdcKeyName>
            <includeMdcKeyName>userId</includeMdcKeyName>
        </encoder>
    </appender>

    <appender name="ASYNC" class="ch.qos.logback.classic.AsyncAppender">
        <queueSize>512</queueSize>
        <discardingThreshold>0</discardingThreshold>
        <appender-ref ref="JSON_FILE"/>
    </appender>

    <root level="INFO">
        <appender-ref ref="ASYNC"/>
    </root>
</configuration>
```

```java
// Expensive debug — always guard
if (log.isDebugEnabled()) {
    log.debug("State: {}", expensiveCompute());
}
```

## Mini Exercise

Add `requestId` and `userId` MDC fields to every request in a simulated HTTP handler loop.

## Assessment Quiz

1. What happens if `AsyncAppender` queue fills up?
2. Why guard `log.debug` with `isDebugEnabled()`?
3. What is discardingThreshold in `AsyncAppender`?

Answers:

1. With `discardingThreshold=0` — blocks; otherwise discards older events.
2. Prevents argument evaluation overhead even when debug level is off.
3. Percentage of queue remaining below which events start being discarded (0 = never discard).

## Task

- Add async JSON logging to your Day 60 banking project with request ID tracing.

## Day 84 Outcome

You can design production-grade logging that is low-latency, structured, and operationally safe.
