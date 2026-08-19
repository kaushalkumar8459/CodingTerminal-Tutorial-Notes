---
title: List Set and Queue Implementations
slug: day-033-list-set-and-queue-implementations
dayLabel: Day 33
level: Intermediate
estimatedMinutes: 50
order: 33
track: java
---
# Day 33 [Intermediate]: List Set and Queue Implementations

## Goal

Use `ArrayList`, `LinkedList`, `HashSet`, `LinkedHashSet`, `TreeSet`, `ArrayDeque` with awareness of their performance characteristics.

## Prerequisites

- Day 32 complete

## Explanation

Each concrete implementation has different performance trade-offs for insertion, lookup, and ordering.

## Topic by Topic

### Topic 1: ArrayList vs LinkedList

Theory:

- `ArrayList`: fast random access `O(1)`, slow mid-insert `O(n)`
- `LinkedList`: fast insert/delete at ends, slow random access

Practical:
Use `ArrayList` for read-heavy list; `LinkedList` as queue/deque.

### Topic 2: HashSet vs LinkedHashSet vs TreeSet

Theory:

- `HashSet`: no order, `O(1)` ops
- `LinkedHashSet`: insertion order preserved
- `TreeSet`: natural/custom sorted order, `O(log n)` ops

Practical:
Show ordering difference for same input.

### Topic 3: ArrayDeque as Queue and Stack

Theory:
Preferred over `LinkedList` for queue/stack usage. No capacity restriction.

Practical:
Use `offer`/`poll` for queue; `push`/`pop` for stack.

### Topic 4: PriorityQueue

Theory:
Elements ordered by natural order or `Comparator`; min-heap by default.

Practical:
Process tasks by priority.

### Topic 5: Choosing between them

Theory:
Base choice on: ordering need, duplicate policy, and dominant operation.

Practical:
Justify choice for 3 different scenarios in one minute.

## Key Concepts

- ArrayList vs LinkedList trade-offs
- Set ordering variants
- ArrayDeque for queue/stack
- PriorityQueue for ordered processing

## Hands-on Coding

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // TreeSet — sorted, no duplicates
        Set<String> tags = new TreeSet<>(List.of("java", "oop", "java", "stream"));
        System.out.println("Tags: " + tags);

        // ArrayDeque as queue
        Deque<String> queue = new ArrayDeque<>();
        queue.offer("task1");
        queue.offer("task2");
        System.out.println("Polled: " + queue.poll());

        // PriorityQueue — min first
        PriorityQueue<Integer> pq = new PriorityQueue<>(List.of(5, 1, 3));
        while (!pq.isEmpty()) System.out.print(pq.poll() + " ");
    }
}
```

## Mini Exercise

Build a ticket system using `PriorityQueue` that processes lower ticket number first.

## Assessment Quiz

1. Why prefer `ArrayDeque` over `Stack`?
2. Which Set preserves insertion order?
3. Time complexity of `ArrayList.get(i)`?

Answers:

1. `Stack` is legacy and synchronized; `ArrayDeque` is faster.
2. `LinkedHashSet`.
3. `O(1)`.

## Task

- Implement a simple browser history using `ArrayDeque` (back/forward).

## Day 33 Outcome

You can pick the right List/Set/Queue implementation and explain the trade-off.
