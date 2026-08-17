---
title: Iterators and Enhanced for Loop Internals
slug: day-036-iterators-and-enhanced-for-loop-internals
dayLabel: Day 36
level: Intermediate
estimatedMinutes: 40
order: 36
track: java
---
# Day 36 [Intermediate]: Iterators and Enhanced for Loop Internals

## Goal

Use iterators correctly, understand how the enhanced for loop works under the hood, and write a custom `Iterable`.

## Prerequisites

- Day 35 complete

## Explanation

The enhanced for loop is syntactic sugar over `Iterator`. Understanding internals helps when you need safe removal or custom traversal.

## Topic by Topic

### Topic 1: `Iterator<T>` interface

Theory:
`hasNext()` checks; `next()` advances; `remove()` safely removes current.

Practical:
Iterate `ArrayList<String>` with explicit `Iterator`.

### Topic 2: Enhanced for loop desugared

Theory:
`for (T x : coll)` compiles to iterator-based loop.

Practical:
Show equivalent iterator code side by side.

### Topic 3: Safe removal during iteration

Theory:
Use `iterator.remove()`, not `list.remove()`, inside iteration.

Practical:
Remove all even numbers during traversal.

### Topic 4: `ListIterator`

Theory:
Bidirectional; supports `add`, `set`, `previous`.

Practical:
Traverse list backwards.

### Topic 5: Custom `Iterable`

Theory:
Implement `Iterable<T>` to make your own class work in for-each.

Practical:
Create `Range` class iterable from start to end.

## Key Concepts

- Iterator protocol
- For-each desugaring
- Safe removal during iteration
- Custom Iterable

## Hands-on Coding

```java
import java.util.*;

class Range implements Iterable<Integer> {
    private final int start, end;

    Range(int start, int end) { this.start = start; this.end = end; }

    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<>() {
            int current = start;
            public boolean hasNext() { return current < end; }
            public Integer next() { return current++; }
        };
    }
}

public class Main {
    public static void main(String[] args) {
        // safe removal
        List<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));
        Iterator<Integer> it = nums.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) it.remove();
        }
        System.out.println("Odds: " + nums);

        // custom iterable
        for (int i : new Range(1, 6)) {
            System.out.print(i + " ");
        }
    }
}
```

## Mini Exercise

Create `NumberBatch` class that iterates only even numbers in a given range.

## Assessment Quiz

1. Why does `list.remove()` inside for-each throw exception?
2. What does `ListIterator.previous()` do?
3. Minimum methods to implement `Iterable`?

Answers:

1. Structural modification detected by fail-fast iterator.
2. Returns previous element and moves cursor back.
3. `iterator()` returning an `Iterator<T>`.

## Task

- Implement a `CircularBuffer<T>` that is iterable.

## Day 36 Outcome

You understand iteration at the protocol level and can write custom iterable types.
