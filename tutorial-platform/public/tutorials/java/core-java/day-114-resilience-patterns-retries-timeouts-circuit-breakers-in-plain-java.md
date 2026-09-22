---
title: Resilience Patterns — Retries, Timeouts, Circuit Breakers in Plain Java
slug: day-114-resilience-patterns-retries-timeouts-circuit-breakers-in-plain-java
dayLabel: Day 114
level: Expert
estimatedMinutes: 60
order: 114
track: java
---
# Day 114 [Expert]: Resilience Patterns — Retries, Timeouts, Circuit Breakers in Plain Java

## Goal

Implement production-grade resilience patterns in pure Java without depending on Resilience4j or Spring.

## Prerequisites

- Day 113 complete
- Day 74 (HTTP client patterns) complete

## Explanation

Distributed systems fail partially. Resilience patterns prevent cascading failures, avoid wasted work on unavailable dependencies, and recover gracefully — all implementable in plain Java.

## Topic by Topic

### Topic 1: Retry with exponential backoff and jitter

Theory:
Retry transient failures; exponential delay reduces thundering herd. Jitter randomises delay to further spread load.

Practical:
`RetryPolicy.execute(callable, maxAttempts=3, baseDelayMs=100, multiplier=2, jitterMs=50)`.

### Topic 2: Timeout wrapper

Theory:
Run task in separate thread; `Future.get(timeout, unit)` cancels if too slow.

Practical:
Wrap any `Callable<T>` with configurable timeout using `ExecutorService`.

### Topic 3: Circuit breaker state machine

Theory:
CLOSED → (failure threshold) → OPEN → (wait period) → HALF_OPEN → (success) → CLOSED.

Practical:
Implement `CircuitBreaker` with configurable threshold and recovery window.

### Topic 4: Bulkhead — concurrency limiter

Theory:
Limit concurrent calls to a dependency using `Semaphore`. Callers over the limit fail fast, not queue indefinitely.

Practical:
Wrap service calls with `Semaphore(5).tryAcquire(100, MILLISECONDS)`.

### Topic 5: Composing patterns

Theory:
Apply: bulkhead → circuit breaker → retry → timeout, in that order. Each layer catches what the inner layer lets through.

Practical:
Compose all four into a `ResilientClient` wrapper class.

## Key Concepts

- Exponential backoff + jitter
- Timeout via `Future.get`
- Circuit breaker state: CLOSED/OPEN/HALF_OPEN
- Bulkhead via `Semaphore`
- Composition order matters

## Hands-on Coding

```java
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;
import java.util.function.Supplier;

// Circuit breaker
public class CircuitBreaker {
    enum State { CLOSED, OPEN, HALF_OPEN }

    private volatile State state = State.CLOSED;
    private final AtomicInteger failures = new AtomicInteger();
    private volatile long openedAt;

    private final int threshold;
    private final long recoveryMs;

    CircuitBreaker(int threshold, long recoveryMs) {
        this.threshold = threshold;
        this.recoveryMs = recoveryMs;
    }

    <T> T call(Supplier<T> supplier) {
        if (state == State.OPEN) {
            if (System.currentTimeMillis() - openedAt > recoveryMs) {
                state = State.HALF_OPEN;
            } else {
                throw new RuntimeException("Circuit open");
            }
        }
        try {
            T result = supplier.get();
            if (state == State.HALF_OPEN) { state = State.CLOSED; failures.set(0); }
            return result;
        } catch (Exception e) {
            if (failures.incrementAndGet() >= threshold) {
                state = State.OPEN; openedAt = System.currentTimeMillis();
            }
            throw e;
        }
    }
}

// Retry with exponential backoff
public class RetryPolicy {
    static <T> T execute(Callable<T> task, int maxAttempts, long baseMs) throws Exception {
        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try { return task.call(); }
            catch (Exception e) {
                if (attempt == maxAttempts) throw e;
                long delay = baseMs * (1L << (attempt - 1));  // exponential
                Thread.sleep(delay);
            }
        }
        throw new IllegalStateException("Unreachable");
    }
}
```

## Mini Exercise

Add jitter (`Random` ± 20% of delay) to the retry policy; verify different delays in unit tests.

## Assessment Quiz

1. What is the thundering herd problem?
2. When does circuit breaker enter HALF_OPEN?
3. Why apply bulkhead before circuit breaker?

Answers:

1. All clients retry simultaneously after an outage, overwhelming the recovering service.
2. After the recovery window expires while in OPEN state.
3. Bulkhead limits concurrent calls before they hit the circuit breaker's failure counter.

## Task

- Wrap Day 60 JDBC calls with retry + circuit breaker; test with a mock that fails 2 then succeeds.

## Day 114 Outcome

You can implement all four resilience patterns in pure Java and compose them correctly.
