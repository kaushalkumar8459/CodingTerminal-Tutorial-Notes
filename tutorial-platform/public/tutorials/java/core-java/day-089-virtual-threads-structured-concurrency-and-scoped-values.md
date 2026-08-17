---
title: Virtual Threads, Structured Concurrency, and Scoped Values
slug: day-089-virtual-threads-structured-concurrency-and-scoped-values
dayLabel: Day 89
level: Advanced
estimatedMinutes: 60
order: 89
track: java
---
# Day 89 [Advanced]: Virtual Threads, Structured Concurrency, and Scoped Values

## Goal

Use Project Loom's virtual threads for massive concurrency, structured concurrency for clean lifetime management, and Scoped Values as the safe ThreadLocal replacement.

## Prerequisites

- Day 88 complete

## Explanation

Project Loom (Java 21+) is the biggest concurrency change in Java's history. Virtual threads are cheap enough to create one per request — eliminating reactive programming complexity. Structured concurrency and Scoped Values complete the model.

## Topic by Topic

### Topic 1: Virtual threads vs platform threads

Theory:
Virtual threads are JVM-managed, mapped M:N onto OS threads. Creating 100,000 virtual threads costs ~100ms; same in platform threads = OOM.

Practical:
Launch 100,000 virtual threads; each sleeps 1 second. Total time ≈ 1s, not 100,000s.

### Topic 2: Creating virtual threads

Theory:
`Thread.ofVirtual().start(task)`, `Executors.newVirtualThreadPerTaskExecutor()`.

Practical:
Replace a fixed thread pool with virtual thread executor; measure throughput improvement for IO-bound tasks.

### Topic 3: Pinning — when virtual thread blocks platform thread

Theory:
`synchronized` blocks and `Object.wait()` inside virtual thread pin the carrier thread. Avoid with `ReentrantLock`.

Practical:
Identify pinning in a legacy `synchronized` method; replace with `ReentrantLock`.

### Topic 4: Structured concurrency

Theory:
`StructuredTaskScope` ensures child threads finish before scope exits. Two built-in policies: `ShutdownOnFailure`, `ShutdownOnSuccess`.

Practical:
Fan out three service calls; fail fast if any throws; collect results.

### Topic 5: Scoped Values — replacing ThreadLocal

Theory:
`ScopedValue` is immutable per scope; inherited by virtual thread children; no memory leak with millions of threads.

Practical:
Replace `ThreadLocal<String> requestId` with `ScopedValue<String>`; verify child threads inherit it.

## Key Concepts

- M:N virtual-to-platform thread mapping
- IO blocking unmounts virtual thread — carrier is free
- Pinning avoidance (`ReentrantLock`)
- `StructuredTaskScope` lifetime guarantees
- `ScopedValue` vs `ThreadLocal` memory model

## Hands-on Coding

```java
import java.util.concurrent.*;

// 100k virtual threads — completes in ~1s
public class VirtualDemo {
    public static void main(String[] args) throws InterruptedException {
        long start = System.currentTimeMillis();
        List<Thread> threads = new ArrayList<>();
        for (int i = 0; i < 100_000; i++) {
            threads.add(Thread.ofVirtual().start(() -> {
                try { Thread.sleep(1000); }
                catch (InterruptedException e) {}
            }));
        }
        for (Thread t : threads) t.join();
        System.out.println("Done in " + (System.currentTimeMillis() - start) + "ms");
    }
}
```

```java
// Structured concurrency — fail fast fan-out
import java.util.concurrent.StructuredTaskScope;

String fetchUser(int id) throws Exception {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        var user   = scope.fork(() -> userService.get(id));
        var orders = scope.fork(() -> orderService.get(id));
        var wallet = scope.fork(() -> walletService.get(id));

        scope.join().throwIfFailed();
        return user.get() + " " + orders.get() + " " + wallet.get();
    }
}
```

```java
// Scoped Values
static final ScopedValue<String> REQUEST_ID = ScopedValue.newInstance();

void handleRequest(String reqId) throws Exception {
    ScopedValue.where(REQUEST_ID, reqId).call(() -> {
        processRequest();
        return null;
    });
}

void processRequest() {
    log.info("Handling request: " + REQUEST_ID.get());
}
```

## Mini Exercise

Rewrite a `ThreadLocal`-based request-context holder using `ScopedValue`.

## Assessment Quiz

1. How many virtual threads can you create vs platform threads?
2. What causes virtual thread pinning?
3. Why does `ThreadLocal` cause memory bloat with virtual threads?

Answers:

1. Millions of virtual threads vs thousands of platform threads.
2. Entering a `synchronized` block or calling `Object.wait()`.
3. Each of millions of virtual threads gets a `ThreadLocal` map entry — massive memory overhead.

## Task

- Convert your Day 46 thread pool executor to virtual thread executor; verify throughput improvement.

## Day 89 Outcome

You can build massively concurrent IO services using Project Loom and write clean contextual code with Scoped Values.
