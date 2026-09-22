---
title: java.util.concurrent — Advanced Executors and Scheduling
slug: day-079-java-util-concurrent-advanced-executors-and-scheduling
dayLabel: Day 79
level: Advanced
estimatedMinutes: 55
order: 79
track: java
---
# Day 79 [Advanced]: java.util.concurrent — Advanced Executors and Scheduling

## Goal

Master advanced executor configurations, synchronization utilities, and scheduling for complex concurrent workloads.

## Prerequisites

- Day 78 complete
- Day 46 (executor basics) complete

## Explanation

Beyond the simple pool factories, `java.util.concurrent` offers powerful synchronizers (`CountDownLatch`, `CyclicBarrier`, `Phaser`, `Semaphore`) and custom `ThreadPoolExecutor` configuration.

## Topic by Topic

### Topic 1: `ThreadPoolExecutor` internals

Theory:
Core pool, max pool, keep-alive, `BlockingQueue`, `RejectedExecutionHandler`.

Practical:
Create a custom `ThreadPoolExecutor` with bounded queue and `CallerRunsPolicy`.

### Topic 2: `CountDownLatch`

Theory:
N threads signal completion; one thread waits for all N.

Practical:
Parallel service warm-up: main waits until all services report ready.

### Topic 3: `CyclicBarrier`

Theory:
N threads rendezvous at a barrier point repeatedly; optional barrier action.

Practical:
Simulate map-reduce workers synchronising between phases.

### Topic 4: `Phaser`

Theory:
Flexible alternative to `CyclicBarrier`; supports dynamic thread registration.

Practical:
Multi-phase pipeline where threads register/deregister between phases.

### Topic 5: `Semaphore` for resource throttling

Theory:
Permits limit concurrency; `acquire` blocks if none available; `release` returns permit.

Practical:
Limit concurrent DB connections to 5 regardless of thread pool size.

## Key Concepts

- `ThreadPoolExecutor` tuning knobs
- `CallerRunsPolicy` as backpressure
- Latch vs barrier vs phaser
- Semaphore for throttling
- Phaser phase advancement

## Hands-on Coding

```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        int workers = 4;
        CountDownLatch ready = new CountDownLatch(workers);
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done  = new CountDownLatch(workers);

        for (int i = 0; i < workers; i++) {
            final int id = i;
            new Thread(() -> {
                try {
                    System.out.println("Worker " + id + " warming up");
                    ready.countDown();
                    start.await();       // wait for start signal
                    System.out.println("Worker " + id + " processing");
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    done.countDown();
                }
            }).start();
        }

        ready.await();       // all ready
        System.out.println("All workers ready — starting");
        start.countDown();   // fire!
        done.await();        // all done
        System.out.println("All workers finished");
    }
}
```

## Mini Exercise

Use `Semaphore(3)` to throttle a pool of 10 threads to at most 3 concurrent "API calls".

## Assessment Quiz

1. Difference between `CountDownLatch` and `CyclicBarrier`?
2. What is `CallerRunsPolicy`?
3. When use `Phaser` over `CyclicBarrier`?

Answers:

1. Latch fires once, non-reusable; barrier resets for next phase.
2. Rejected task runs on the submitting thread — provides backpressure.
3. When number of parties changes dynamically between phases.

## Task

- Implement a parallel data-import pipeline with 3 phases using `Phaser`.

## Day 79 Outcome

You can orchestrate complex concurrent workflows using the full `java.util.concurrent` synchronizer toolkit.
