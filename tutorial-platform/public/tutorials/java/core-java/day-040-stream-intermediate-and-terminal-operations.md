---
title: Stream Intermediate and Terminal Operations
slug: day-040-stream-intermediate-and-terminal-operations
dayLabel: Day 40
level: Intermediate
estimatedMinutes: 55
order: 40
track: java
---
# Day 40 [Intermediate]: Stream Intermediate and Terminal Operations

## Goal

Master the full set of intermediate and terminal operations including collectors, reduction, and flatMap.

## Prerequisites

- Day 39 complete

## Explanation

This lesson goes deeper into the stream API — grouping, partitioning, reduction, and flatMapping nested structures.

## Topic by Topic

### Topic 1: Collectors in depth

Theory:
`toList`, `toSet`, `toMap`, `groupingBy`, `partitioningBy`, `joining`, `counting`, `summarizingInt`.

Practical:
Group products by category.

### Topic 2: `flatMap`

Theory:
Maps each element to a stream and flattens into one stream.

Practical:
Flatten list of order items from list of orders.

### Topic 3: `reduce`

Theory:
Folds stream to single value using accumulator.

Practical:
Compute product of all numbers.

### Topic 4: `toMap` with merge function

Theory:
Handle duplicate keys with merge function.

Practical:
Build name → total salary map with merge.

### Topic 5: Numeric streams

Theory:
`IntStream`, `LongStream`, `DoubleStream` avoid boxing; provide `sum`, `average`, `range`.

Practical:
Print 1 to 10 with `IntStream.rangeClosed`; compute average salary.

## Key Concepts

- `groupingBy` / `partitioningBy`
- `flatMap` for nested collections
- `reduce` for custom aggregation
- Numeric stream specializations

## Hands-on Coding

```java
import java.util.*;
import java.util.stream.*;

record Employee(String name, String dept, double salary) {}

public class Main {
    public static void main(String[] args) {
        List<Employee> emps = List.of(
            new Employee("Asha", "Engineering", 90000),
            new Employee("Bob", "Engineering", 85000),
            new Employee("Cara", "HR", 60000),
            new Employee("Dan", "HR", 62000),
            new Employee("Eve", "Engineering", 95000)
        );

        // groupingBy + average salary per dept
        Map<String, Double> avgByDept = emps.stream()
            .collect(Collectors.groupingBy(
                Employee::dept,
                Collectors.averagingDouble(Employee::salary)));
        System.out.println("Avg by dept: " + avgByDept);

        // partitioningBy
        Map<Boolean, List<Employee>> highLow = emps.stream()
            .collect(Collectors.partitioningBy(e -> e.salary() > 80000));
        System.out.println("High earners: " +
            highLow.get(true).stream().map(Employee::name).toList());

        // flatMap
        List<List<String>> nested = List.of(
            List.of("a", "b"), List.of("c", "d"));
        List<String> flat = nested.stream()
            .flatMap(Collection::stream)
            .collect(Collectors.toList());
        System.out.println("Flat: " + flat);

        // IntStream
        int sum = IntStream.rangeClosed(1, 100).sum();
        System.out.println("Sum 1-100: " + sum);
    }
}
```

## Mini Exercise

Given list of orders each containing list of items, collect all unique item names.

## Assessment Quiz

1. What does `groupingBy` return?
2. Difference between `reduce` and `collect`?
3. When use `IntStream` over `Stream<Integer>`?

Answers:

1. `Map<K, List<T>>` (or downstream collector result).
2. `reduce` folds to a value; `collect` mutable accumulation into container.
3. When avoiding boxing overhead for numeric processing.

## Task

- Build full employee report: dept avg, top earner per dept, all names sorted.

## Day 40 Outcome

You can write production-grade stream pipelines with grouping, flat mapping, and numeric operations.
