---
title: Executor Framework and Thread Pools
slug: day-046-executor-framework-and-thread-pools
dayLabel: Day 46
level: Intermediate
estimatedMinutes: 50
order: 46
track: java
---
# Day 46 [Intermediate]: Executor Framework and Thread Pools

## Goal

Manage thread lifecycles and workloads using the Executor framework instead of raw threads.

## Prerequisites

- Day 45 complete

## Explanation

Creating raw threads for every task is expensive. The Executor framework reuses threads via pools and separates task submission from execution.

## Topic by Topic

### Topic 1: Why thread pools

Theory:
Thread creation is costly; pools reuse threads and bound concurrency.

Practical:
Submit 10 tasks to a 3-thread pool and observe reuse.

### Topic 2: `ExecutorService` and factory methods

Theory:
`Executors.newFixedThreadPool`, `newCachedThreadPool`, `newSingleThreadExecutor`, `newScheduledThreadPool`.

Practical:
Use each and describe its use case.

### Topic 3: Submitting tasks

Theory:
`execute(Runnable)` — fire and forget; `submit(Callable)` — returns `Future`.

Practical:
Submit callable returning computed value.

### Topic 4: Shutdown

Theory:
`shutdown()` graceful; `shutdownNow()` forceful; always call one.

Practical:
Wrap executor in try-finally to guarantee shutdown.

### Topic 5: `ScheduledExecutorService`

Theory:
Run tasks after delay or at fixed rate.

Practical:
Print heartbeat every 2 seconds; cancel after 10.

## Key Concepts

- Thread pool reuse
- Executor vs ExecutorService
- `submit` vs `execute`
- Graceful shutdown discipline
- Scheduled execution

## Hands-on Coding

```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(3);

        for (int i = 1; i <= 6; i++) {
            final int id = i;
            pool.submit(() -> {
                System.out.println("Task " + id +
                    " on " + Thread.currentThread().getName());
                Thread.sleep(200);
                return id * id;
            });
        }

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);
        System.out.println("All tasks done");
    }
}
```

## Mini Exercise

Submit 5 `Callable<String>` tasks; collect all `Future` results and print in order.

## Assessment Quiz

1. Difference between `execute` and `submit`?
2. What is `awaitTermination`?
3. Which pool is best for short-lived, unpredictable task counts?

Answers:

1. `execute` is fire-and-forget; `submit` returns a `Future`.
2. Blocks until pool terminates or timeout expires.
3. `newCachedThreadPool` — grows/shrinks dynamically.

## Task

- Build a parallel file processor that reads 5 files concurrently using a fixed pool of 2.

## Day 46 Outcome

You can manage concurrent workloads efficiently using thread pools and executor services.
