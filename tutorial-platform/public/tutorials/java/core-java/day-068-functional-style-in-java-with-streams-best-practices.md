---
title: Functional Style in Java with Streams Best Practices
slug: day-068-functional-style-in-java-with-streams-best-practices
dayLabel: Day 68
level: Advanced
estimatedMinutes: 55
order: 68
track: java
---
# Day 68 [Advanced]: Functional Style in Java with Streams Best Practices

## Goal

Write idiomatic, readable functional Java — knowing when streams improve clarity and when they hurt it.

## Prerequisites

- Day 67 complete
- Days 37–40 (lambdas and streams) complete

## Explanation

Functional style is about describing _what_ not _how_. Good functional Java reads like a specification. Bad functional Java is unreadable chain soup.

## Topic by Topic

### Topic 1: Stateless, side-effect-free lambdas

Theory:
Stream operations should not mutate external state — correctness depends on it for parallel streams.

Practical:
Replace state-mutating lambda with pure transformation.

### Topic 2: Prefer method references over verbose lambdas

Theory:
`String::trim` > `s -> s.trim()`. Single-purpose methods are reusable and testable.

Practical:
Refactor a 5-lambda pipeline to use method references throughout.

### Topic 3: Stream vs loop — readability threshold

Theory:
Stream wins for filter-map-collect; loop wins for complex multi-step mutations or early exit logic with state.

Practical:
Identify 2 cases each where stream and loop are preferable.

### Topic 4: Parallel streams — when and when not

Theory:
Parallel streams win for CPU-bound, large, independent data. Wrong for IO, small datasets, or ordered-sensitive ops.

Practical:
Benchmark parallel vs sequential for 1M number summation.

### Topic 5: Avoiding common mistakes

Theory:

- Mutating shared collection inside `forEach`
- Using `peek` for business logic (not just debugging)
- Calling `stream()` on result of another `stream()` without terminal op
- `Optional.get()` without `isPresent()`

Practical:
Fix three broken stream pipelines.

## Key Concepts

- Pure lambdas
- Method reference preference
- Parallel stream preconditions
- Debug-only `peek`
- Readability as primary criterion

## Hands-on Coding

```java
import java.util.*;
import java.util.stream.*;

record Order(String id, String status, double amount) {}

public class Main {
    public static void main(String[] args) {
        List<Order> orders = List.of(
            new Order("O1", "PAID", 1200),
            new Order("O2", "PENDING", 450),
            new Order("O3", "PAID", 880),
            new Order("O4", "CANCELLED", 300)
        );

        // idiomatic: filter → map → sum
        double revenue = orders.stream()
            .filter(o -> "PAID".equals(o.status()))
            .mapToDouble(Order::amount)
            .sum();

        // idiomatic: group by status → count
        Map<String, Long> countByStatus = orders.stream()
            .collect(Collectors.groupingBy(Order::status, Collectors.counting()));

        System.out.println("Revenue: " + revenue);
        System.out.println("By status: " + countByStatus);

        // parallel for large independent computation
        long count = LongStream.rangeClosed(1, 1_000_000)
            .parallel()
            .filter(n -> n % 2 == 0)
            .count();
        System.out.println("Even count: " + count);
    }
}
```

## Mini Exercise

Refactor: given a list of strings, remove nulls, trim, uppercase, remove duplicates, sort — using idiomatic stream.

## Assessment Quiz

1. Why should `peek` not contain business logic?
2. When is a parallel stream harmful?
3. What is a pure function in functional style?

Answers:

1. `peek` is not guaranteed to be called (optimised away); unreliable for side effects.
2. IO-bound, ordered, small dataset, or shared mutable state.
3. One that has no side effects and always returns same output for same input.

## Task

- Rewrite your Day 60 reporting logic using idiomatic stream style.

## Day 68 Outcome

You write functional Java that is readable, correct, and performant.
