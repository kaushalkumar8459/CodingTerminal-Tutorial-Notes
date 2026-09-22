---
title: Stream API Fundamentals
slug: day-039-stream-api-fundamentals
dayLabel: Day 39
level: Intermediate
estimatedMinutes: 50
order: 39
track: java
---
# Day 39 [Intermediate]: Stream API Fundamentals

## Goal

Create streams, understand the lazy pipeline model, and apply basic operations.

## Prerequisites

- Day 38 complete

## Explanation

Streams provide a declarative pipeline for processing data sequences without mutating the source.

## Topic by Topic

### Topic 1: What is a Stream

Theory:

- Not a data structure; it is a view of data
- Lazy: intermediate ops execute only on terminal op
- Single-use: consumed once

Practical:
Create streams from `Collection`, array, and `Stream.of`.

### Topic 2: Intermediate operations

Theory:
`filter`, `map`, `flatMap`, `distinct`, `sorted`, `limit`, `skip`, `peek`.

Practical:
Filter active products and map to name.

### Topic 3: Terminal operations

Theory:
`collect`, `forEach`, `count`, `findFirst`, `anyMatch`, `allMatch`, `min`, `max`, `reduce`.

Practical:
Collect filtered names into new list.

### Topic 4: Pipeline laziness

Theory:
Nothing executes until a terminal op triggers the pipeline.

Practical:
Add `peek` and observe execution order.

### Topic 5: Stream vs loop

Theory:
Streams are more expressive; loops give more control. Know when each is right.

Practical:
Rewrite complex loop as stream pipeline; compare readability.

## Key Concepts

- Source → intermediate ops → terminal op
- Lazy evaluation
- Stateless vs stateful intermediate ops
- Single-use constraint

## Hands-on Coding

```java
import java.util.*;
import java.util.stream.*;

record Product(String name, String category, double price) {}

public class Main {
    public static void main(String[] args) {
        List<Product> products = List.of(
            new Product("Laptop", "Electronics", 75000),
            new Product("Phone", "Electronics", 45000),
            new Product("Desk", "Furniture", 12000),
            new Product("Chair", "Furniture", 8000),
            new Product("Monitor", "Electronics", 22000)
        );

        // pipeline: filter → map → sorted → collect
        List<String> expensiveElectronics = products.stream()
            .filter(p -> p.category().equals("Electronics"))
            .filter(p -> p.price() > 30000)
            .map(Product::name)
            .sorted()
            .collect(Collectors.toList());

        System.out.println(expensiveElectronics);

        // count
        long count = products.stream()
            .filter(p -> p.price() < 20000)
            .count();
        System.out.println("Budget products: " + count);
    }
}
```

## Mini Exercise

Given a list of integers, find sum of squares of all even numbers greater than 10.

## Assessment Quiz

1. Can you reuse a stream after terminal op?
2. Is `sorted()` stateful or stateless?
3. What triggers stream execution?

Answers:

1. No; `IllegalStateException`.
2. Stateful — needs all elements before proceeding.
3. A terminal operation.

## Task

- Build a product report: top 3 most expensive per category.

## Day 39 Outcome

You can construct clean, readable stream pipelines and reason about lazy evaluation.
