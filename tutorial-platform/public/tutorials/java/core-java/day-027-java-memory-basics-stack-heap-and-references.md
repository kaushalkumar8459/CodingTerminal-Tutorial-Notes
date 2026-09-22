---
title: Java Memory Basics Stack Heap and References
slug: day-027-java-memory-basics-stack-heap-and-references
dayLabel: Day 27
level: Beginner
estimatedMinutes: 45
order: 27
track: java
---
# Day 27 [Beginner]: Java Memory Basics Stack Heap and References

## Goal

Understand how Java uses stack and heap memory and how references work.

## Prerequisites

- Day 26 complete

## Explanation

Java memory management is automatic but understanding the model helps avoid subtle bugs and memory issues.

## Topic by Topic

### Topic 1: Stack memory

Theory:
Method call frames, local variables, and references live here. LIFO. Freed on method return.

Practical:
Trace what gets pushed/popped for a 3-level call chain.

### Topic 2: Heap memory

Theory:
Objects live here. Managed by GC.

Practical:
Create several objects; identify where they live.

### Topic 3: Reference vs value

Theory:
Primitives hold value directly; objects hold reference (memory address).

Practical:
Swap two primitives vs two objects; observe difference.

### Topic 4: null references

Theory:
Reference that points to no object; `NullPointerException` when dereferenced.

Practical:
Reproduce and handle NPE safely.

### Topic 5: Garbage collection basics

Theory:
GC reclaims unreachable heap objects automatically.

Practical:
Set reference to `null` and discuss eligibility.

## Key Concepts

- Stack: method frames and local vars
- Heap: all object instances
- Reference semantics
- null safety
- GC eligibility

## Hands-on Coding

```java
class Box {
    int value;
    Box(int v) { this.value = v; }
}

public class Main {
    static void modify(Box b, int x) {
        b.value = 99;  // modifies heap object
        x = 99;        // modifies local copy only
    }

    public static void main(String[] args) {
        Box box = new Box(1);
        int num = 1;
        modify(box, num);
        System.out.println("Box: " + box.value); // 99
        System.out.println("num: " + num);        // 1
    }
}
```

## Mini Exercise

Write two methods: one that correctly swaps object fields, one that fails with local variable swap.

## Assessment Quiz

1. Where do local variables live?
2. What causes `StackOverflowError`?
3. When is an object eligible for GC?

Answers:

1. Stack.
2. Infinite recursion exhausts stack frames.
3. When no live references point to it.

## Task

- Trace memory model diagram for a simple 3-class program.

## Day 27 Outcome

You understand Java memory model well enough to reason about bugs and object lifecycles.
