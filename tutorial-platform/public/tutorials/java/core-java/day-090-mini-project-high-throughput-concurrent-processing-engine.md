---
title: Mini Project — High-Throughput Concurrent Processing Engine
slug: day-090-mini-project-high-throughput-concurrent-processing-engine
dayLabel: Day 90
level: Advanced
estimatedMinutes: 120
order: 90
track: java
---
# Day 90 [Advanced]: Mini Project — High-Throughput Concurrent Processing Engine

## Goal

Apply all advanced concurrency and performance topics (Days 78–89) in a production-pattern pipeline.

## Prerequisites

- Days 78–89 complete

## Project Description

Build a concurrent event processing engine that:

1. Ingests events from an in-memory `BlockingQueue` (simulating a message broker)
2. Dispatches events to topic-specific virtual thread workers
3. Applies rate-limiting per topic using `Semaphore`
4. Persists processed results to an in-memory store with `ConcurrentHashMap`
5. Exposes metrics: total processed, error rate, per-topic latency

## Design

```text
EventProducer
  → BlockingQueue<Event>(capacity=1000)
  → EventDispatcher (virtual thread per task)
      → TopicHandler (per-topic Semaphore, max 5 concurrent)
          → ProcessingResult
  → ResultStore (ConcurrentHashMap)
  → MetricsCollector (AtomicLong counters + ScheduledExecutorService reporter)
```

## Hands-on Coding

```java
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;

record Event(String topic, String payload, long timestamp) {}
record ProcessingResult(String topic, String result, long latencyMs) {}

class EventEngine {
    private final BlockingQueue<Event>       queue  = new LinkedBlockingQueue<>(1_000);
    private final ConcurrentHashMap<String, Semaphore> topicLimits = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, List<ProcessingResult>> results = new ConcurrentHashMap<>();
    private final AtomicLong totalProcessed = new AtomicLong();
    private final AtomicLong totalErrors    = new AtomicLong();
    private final ExecutorService workers   = Executors.newVirtualThreadPerTaskExecutor();

    void publish(Event e) throws InterruptedException { queue.put(e); }

    void startDispatcher() {
        Thread.ofVirtual().start(() -> {
            while (!Thread.currentThread().isInterrupted()) {
                try {
                    Event e = queue.take();
                    workers.submit(() -> handle(e));
                } catch (InterruptedException ex) {
                    Thread.currentThread().interrupt();
                }
            }
        });
    }

    private void handle(Event e) {
        Semaphore sem = topicLimits.computeIfAbsent(e.topic(), k -> new Semaphore(5));
        try {
            sem.acquire();
            long start = System.currentTimeMillis();
            String result = process(e);
            long latency = System.currentTimeMillis() - start;
            results.computeIfAbsent(e.topic(), k -> new CopyOnWriteArrayList<>())
                   .add(new ProcessingResult(e.topic(), result, latency));
            totalProcessed.incrementAndGet();
        } catch (Exception ex) {
            totalErrors.incrementAndGet();
        } finally {
            sem.release();
        }
    }

    private String process(Event e) throws InterruptedException {
        Thread.sleep(10);   // simulate processing
        return "processed:" + e.payload();
    }

    void printMetrics() {
        System.out.printf("Processed=%d Errors=%d%n",
            totalProcessed.get(), totalErrors.get());
        results.forEach((topic, list) -> {
            double avg = list.stream().mapToLong(ProcessingResult::latencyMs).average().orElse(0);
            System.out.printf("  %s: count=%d avgLatency=%.1fms%n", topic, list.size(), avg);
        });
    }
}
```

## What to Add

1. Graceful shutdown — drain queue before shutdown, wait for in-flight to complete
2. JFR recording that captures the engine for 30 seconds
3. JMH benchmark for `handle` throughput
4. Thread dump integration (DeadlockMonitor from Day 83)
5. Structured concurrency for multi-step event processing pipeline

## Assessment Quiz

1. Why virtual threads instead of fixed pool?
2. What prevents per-topic overload?
3. How to safely shut down without losing queued events?

Answers:

1. IO-bound processing benefits from massive concurrency without platform thread exhaustion.
2. `Semaphore(5)` per topic limits concurrent handlers.
3. Stop producer; call `executor.shutdown()`; await termination; drain remaining queue items.

## Day 90 Outcome

You have built a production-pattern concurrent processing engine applying all Advanced concurrency and performance tools.
