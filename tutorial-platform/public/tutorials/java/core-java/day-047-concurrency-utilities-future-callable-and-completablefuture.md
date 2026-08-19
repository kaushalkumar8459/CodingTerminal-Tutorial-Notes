---
title: Concurrency Utilities Future Callable and CompletableFuture
slug: day-047-concurrency-utilities-future-callable-and-completablefuture
dayLabel: Day 47
level: Intermediate
estimatedMinutes: 55
order: 47
track: java
---
# Day 47 [Intermediate]: Concurrency Utilities Future Callable and CompletableFuture

## Goal

Retrieve async results with `Future`/`Callable` and compose non-blocking pipelines with `CompletableFuture`.

## Prerequisites

- Day 46 complete

## Explanation

`Future` models a pending result. `CompletableFuture` adds composable, non-blocking callbacks that remove the need to block and wait.

## Topic by Topic

### Topic 1: `Callable` and `Future`

Theory:
`Callable<V>` returns a value; `Future<V>` is the handle to retrieve it.

Practical:
Submit callable; do other work; call `get()`.

### Topic 2: `Future` limitations

Theory:
`get()` blocks; no composition; no exception chaining.

Practical:
Show blocking nature and discuss why it is a problem.

### Topic 3: `CompletableFuture` basics

Theory:
`supplyAsync`, `runAsync`, `thenApply`, `thenAccept`, `thenRun`.

Practical:
Fetch data async, transform, print without blocking main thread.

### Topic 4: Combining futures

Theory:
`thenCombine`, `allOf`, `anyOf`.

Practical:
Combine two async results; wait for all three to finish.

### Topic 5: Exception handling

Theory:
`exceptionally`, `handle`, `whenComplete`.

Practical:
Recover from async failure with default value.

## Key Concepts

- `Future.get()` blocking model
- `CompletableFuture` callback chains
- Combining and composing
- Async error handling

## Hands-on Coding

```java
import java.util.concurrent.*;

public class Main {
    static String fetchUser(int id) throws InterruptedException {
        Thread.sleep(300);
        return "User-" + id;
    }

    static String fetchScore(String user) throws InterruptedException {
        Thread.sleep(200);
        return user + ":Score=95";
    }

    public static void main(String[] args) throws Exception {
        CompletableFuture<String> pipeline = CompletableFuture
            .supplyAsync(() -> {
                try { return fetchUser(42); }
                catch (InterruptedException e) { throw new RuntimeException(e); }
            })
            .thenApply(user -> {
                try { return fetchScore(user); }
                catch (InterruptedException e) { throw new RuntimeException(e); }
            })
            .exceptionally(ex -> "Error: " + ex.getMessage());

        System.out.println(pipeline.get());

        // allOf — wait for multiple futures
        CompletableFuture<Void> all = CompletableFuture.allOf(
            CompletableFuture.supplyAsync(() -> "A"),
            CompletableFuture.supplyAsync(() -> "B"),
            CompletableFuture.supplyAsync(() -> "C")
        );
        all.get();
        System.out.println("All done");
    }
}
```

## Mini Exercise

Chain: fetch product price async → apply 10% discount → print final price; handle price-fetch failure.

## Assessment Quiz

1. Does `thenApply` block the calling thread?
2. Difference between `thenApply` and `thenAccept`?
3. What does `exceptionally` return on success?

Answers:

1. No; runs callback when future completes.
2. `thenApply` transforms to new value; `thenAccept` consumes with no return.
3. The original value unchanged.

## Task

- Simulate a 3-service aggregation: fetch user, orders, and balance concurrently; combine with `allOf`.

## Day 47 Outcome

You can compose non-blocking async pipelines and handle failures gracefully.
