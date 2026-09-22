---
title: CompletableFuture Composition and Error Recovery
slug: day-080-completablefuture-composition-and-error-recovery
dayLabel: Day 80
level: Advanced
estimatedMinutes: 55
order: 80
track: java
---
# Day 80 [Advanced]: CompletableFuture Composition and Error Recovery

## Goal

Master advanced `CompletableFuture` composition, timeout, cancellation, and fan-out/fan-in patterns.

## Prerequisites

- Day 79 complete
- Day 47 (CompletableFuture basics) complete

## Explanation

Day 47 covered the basics. This day covers production patterns: custom executors, timeouts (`orTimeout`), fan-out aggregation, error recovery with retries, and cancellation propagation.

## Topic by Topic

### Topic 1: Custom executor for async stages

Theory:
Default `ForkJoinPool.commonPool()` is shared; use a dedicated pool for IO-bound tasks.

Practical:
Create `httpPool = Executors.newFixedThreadPool(20)` and pass to `supplyAsync`.

### Topic 2: Timeout with `orTimeout` and `completeOnTimeout`

Theory:
`orTimeout(5, SECONDS)` completes exceptionally; `completeOnTimeout(default, 5, SECONDS)` completes with value.

Practical:
Wrap slow API call with 3-second timeout and fallback.

### Topic 3: Fan-out and fan-in

Theory:
Start N futures in parallel; `allOf` waits for all; `anyOf` for fastest.

Practical:
Fetch prices from 3 providers simultaneously; return first that responds.

### Topic 4: Retry with `CompletableFuture`

Theory:
No built-in retry; implement recursive retry using `exceptionallyCompose`.

Practical:
Retry failed HTTP fetch up to 3 times with exponential backoff.

### Topic 5: Cancellation and propagation

Theory:
`future.cancel(true)` marks cancelled; downstream stages check `isCancelled`; does not stop running thread.

Practical:
Cancel a slow search when user navigates away; propagate to in-progress futures.

## Key Concepts

- Dedicated executor for IO futures
- `orTimeout` vs `completeOnTimeout`
- `allOf` fan-in with result collection
- Recursive retry via `exceptionallyCompose`
- Cancellation limitations

## Hands-on Coding

```java
import java.util.*;
import java.util.concurrent.*;
import java.util.stream.*;

public class Main {
    static final ExecutorService HTTP_POOL = Executors.newFixedThreadPool(10);

    static CompletableFuture<String> fetchPrice(String provider) {
        return CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(new Random().nextInt(1000)); }
            catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return provider + ":$" + (100 + new Random().nextInt(50));
        }, HTTP_POOL);
    }

    public static void main(String[] args) throws Exception {
        List<String> providers = List.of("PriceA", "PriceB", "PriceC");

        // fan-out then collect all results
        List<CompletableFuture<String>> futures = providers.stream()
            .map(Main::fetchPrice)
            .map(f -> f.orTimeout(2, TimeUnit.SECONDS)
                       .exceptionally(ex -> "TIMEOUT"))
            .toList();

        CompletableFuture<List<String>> all = CompletableFuture
            .allOf(futures.toArray(new CompletableFuture[0]))
            .thenApply(v -> futures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList()));

        System.out.println("Prices: " + all.get());
        HTTP_POOL.shutdown();
    }
}
```

## Mini Exercise

Implement `fetchFirstSuccessful(List<CF<T>>)` that returns the first non-exceptional result and cancels the rest.

## Assessment Quiz

1. Does `future.cancel(true)` stop a running thread?
2. Difference between `orTimeout` and `completeOnTimeout`?
3. Why use a dedicated pool for `supplyAsync` in IO scenarios?

Answers:

1. No — it sets the interrupted flag; actual interruption depends on the task checking it.
2. `orTimeout` completes exceptionally; `completeOnTimeout` completes with a fallback value.
3. Avoids starving `ForkJoinPool.commonPool()` which serves other parallel tasks.

## Task

- Build a `SearchAggregator` that queries 4 search services in parallel, applies 2-second timeout, and merges results.

## Day 80 Outcome

You can build production-grade async pipelines with proper timeouts, fan-out, error recovery, and cancellation.
