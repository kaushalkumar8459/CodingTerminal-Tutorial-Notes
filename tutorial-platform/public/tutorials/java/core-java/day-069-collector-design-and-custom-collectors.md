---
title: Collector Design and Custom Collectors
slug: day-069-collector-design-and-custom-collectors
dayLabel: Day 69
level: Advanced
estimatedMinutes: 55
order: 69
track: java
---
# Day 69 [Advanced]: Collector Design and Custom Collectors

## Goal

Understand the `Collector` contract and implement custom collectors for non-standard aggregations.

## Prerequisites

- Day 68 complete

## Explanation

All `Collectors.toList()`, `groupingBy`, etc. implement the same `Collector<T, A, R>` interface. Writing your own unlocks arbitrary aggregation patterns not covered by built-ins.

## Topic by Topic

### Topic 1: `Collector<T, A, R>` contract

Theory:

- `supplier()` — creates mutable container `A`
- `accumulator()` — folds element `T` into `A`
- `combiner()` — merges two `A` for parallel streams
- `finisher()` — converts `A` to result `R`
- `characteristics()` — `IDENTITY_FINISH`, `CONCURRENT`, `UNORDERED`

Practical:
Map each method to its role in a word-count collector.

### Topic 2: `Collector.of` factory

Theory:
`Collector.of(supplier, accumulator, combiner, finisher, characteristics)` — no class needed.

Practical:
Build a collector that joins strings with a separator and wraps in brackets.

### Topic 3: Custom statistics collector

Theory:
Collect min, max, sum, count, average in one pass without multiple streams.

Practical:
Implement `SalaryStats` collector returning record with all 5 values.

### Topic 4: Downstream collector composition

Theory:
`Collectors.groupingBy(key, downstreamCollector)` — compose with your custom collector.

Practical:
Group orders by status; for each group collect total amount using custom collector.

### Topic 5: Parallel collector correctness

Theory:
Combiner must merge two accumulators correctly; `CONCURRENT` characteristic changes semantics.

Practical:
Verify custom collector gives same result in sequential and parallel stream.

## Key Concepts

- Five-part Collector contract
- `Collector.of` vs class implementation
- Combiner for parallel correctness
- Composition with `groupingBy`
- Characteristics flags

## Hands-on Coding

```java
import java.util.*;
import java.util.stream.*;
import java.util.function.*;

// Custom joining collector with prefix/suffix
public class Main {
    static Collector<String, StringBuilder, String> wrappedJoiner(
            String sep, String prefix, String suffix) {
        return Collector.of(
            StringBuilder::new,
            (sb, s) -> { if (!sb.isEmpty()) sb.append(sep); sb.append(s); },
            (sb1, sb2) -> { if (!sb1.isEmpty() && !sb2.isEmpty()) sb1.append(sep);
                            return sb1.append(sb2); },
            sb -> prefix + sb + suffix
        );
    }

    // Stats record
    record Stats(long count, double sum, double min, double max) {
        double avg() { return count == 0 ? 0 : sum / count; }
    }

    static Collector<Double, double[], Stats> statsCollector() {
        // [count, sum, min, max]
        return Collector.of(
            () -> new double[]{0, 0, Double.MAX_VALUE, Double.MIN_VALUE},
            (a, v) -> { a[0]++; a[1]+=v; a[2]=Math.min(a[2],v); a[3]=Math.max(a[3],v); },
            (a, b) -> new double[]{a[0]+b[0], a[1]+b[1], Math.min(a[2],b[2]), Math.max(a[3],b[3])},
            a -> new Stats((long)a[0], a[1], a[2], a[3])
        );
    }

    public static void main(String[] args) {
        List<String> words = List.of("java", "streams", "collectors");
        System.out.println(words.stream().collect(wrappedJoiner(", ", "[", "]")));

        List<Double> salaries = List.of(50000.0, 75000.0, 60000.0, 90000.0);
        Stats stats = salaries.stream().collect(statsCollector());
        System.out.printf("count=%d sum=%.0f min=%.0f max=%.0f avg=%.0f%n",
            stats.count(), stats.sum(), stats.min(), stats.max(), stats.avg());
    }
}
```

## Mini Exercise

Write a collector that partitions elements into two lists based on a predicate (without using `partitioningBy`).

## Assessment Quiz

1. What does the `combiner` do?
2. What is `IDENTITY_FINISH` characteristic?
3. Can a collector accumulate into a thread-safe container?

Answers:

1. Merges two partial accumulators produced by parallel stream splits.
2. Signals that the finisher is identity function (`A` and `R` are same type), skipping finisher call.
3. Yes — declare `CONCURRENT` and ensure accumulator and combiner are thread-safe.

## Task

- Build a `TopN<T>` collector that keeps the N largest elements using a `PriorityQueue`.

## Day 69 Outcome

You can implement custom collectors for arbitrary aggregation and compose them with built-in collectors.
