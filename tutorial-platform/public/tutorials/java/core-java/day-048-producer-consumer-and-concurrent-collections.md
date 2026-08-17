---
title: Producer Consumer and Concurrent Collections
slug: day-048-producer-consumer-and-concurrent-collections
dayLabel: Day 48
level: Intermediate
estimatedMinutes: 50
order: 48
track: java
---
# Day 48 [Intermediate]: Producer Consumer and Concurrent Collections

## Goal

Implement the producer-consumer pattern and use thread-safe collections from `java.util.concurrent`.

## Prerequisites

- Day 47 complete

## Explanation

The producer-consumer pattern decouples data generation from processing. Java provides blocking queues and concurrent collections that eliminate manual synchronization.

## Topic by Topic

### Topic 1: `BlockingQueue`

Theory:
`put` blocks when full; `take` blocks when empty — built-in coordination.

Practical:
Use `LinkedBlockingQueue` as the shared channel.

### Topic 2: Producer-Consumer implementation

Theory:
Producer adds to queue; consumer takes from queue; both run concurrently.

Practical:
Build 2-producer, 3-consumer with poison-pill shutdown.

### Topic 3: `ConcurrentHashMap`

Theory:
Segment-level locking; safe concurrent reads and writes without full lock.

Practical:
Count word frequency concurrently across threads.

### Topic 4: `CopyOnWriteArrayList`

Theory:
Write creates new copy; safe for read-heavy scenarios with rare writes.

Practical:
Share event-listener list across threads.

### Topic 5: `AtomicInteger` and atomic classes

Theory:
Lock-free CAS (compare-and-swap) operations; faster than synchronized for counters.

Practical:
Replace synchronized counter with `AtomicInteger`.

## Key Concepts

- Blocking queue coordination
- Poison-pill shutdown pattern
- `ConcurrentHashMap` segment locking
- Copy-on-write for read-heavy lists
- Atomic CAS operations

## Hands-on Coding

```java
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    static final String POISON = "STOP";

    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<String> queue = new LinkedBlockingQueue<>(5);
        AtomicInteger processed = new AtomicInteger(0);

        Runnable producer = () -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    queue.put("Item-" + i);
                    System.out.println("Produced: Item-" + i);
                }
                queue.put(POISON);
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        };

        Runnable consumer = () -> {
            try {
                while (true) {
                    String item = queue.take();
                    if (POISON.equals(item)) { queue.put(POISON); break; }
                    System.out.println("Consumed: " + item +
                        " [total=" + processed.incrementAndGet() + "]");
                    Thread.sleep(100);
                }
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        };

        ExecutorService pool = Executors.newFixedThreadPool(3);
        pool.submit(producer);
        pool.submit(consumer);
        pool.submit(consumer);
        pool.shutdown();
        pool.awaitTermination(10, TimeUnit.SECONDS);
    }
}
```

## Mini Exercise

Build a log-processing pipeline: 1 producer writes log lines; 2 consumers filter errors.

## Assessment Quiz

1. Why use `BlockingQueue` instead of manual `wait`/`notify`?
2. When prefer `CopyOnWriteArrayList` over `ArrayList`?
3. What is CAS?

Answers:

1. Built-in blocking eliminates boilerplate and reduces bugs.
2. Mostly reads, rare writes, and iteration safety needed.
3. Compare-And-Swap — atomically updates value only if it matches expected.

## Task

- Build a task queue where 1 producer submits jobs and a pool of 3 workers processes them.

## Day 48 Outcome

You can build concurrent producer-consumer systems using Java's built-in concurrency primitives.
