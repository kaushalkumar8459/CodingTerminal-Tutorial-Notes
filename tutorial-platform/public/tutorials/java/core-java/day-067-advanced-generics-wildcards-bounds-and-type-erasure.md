---
title: Advanced Generics Wildcards Bounds and Type Erasure
slug: day-067-advanced-generics-wildcards-bounds-and-type-erasure
dayLabel: Day 67
level: Advanced
estimatedMinutes: 55
order: 67
track: java
---
# Day 67 [Advanced]: Advanced Generics Wildcards Bounds and Type Erasure

## Goal

Master wildcards, bounded types, and understand the implications of type erasure for API design.

## Prerequisites

- Day 66 complete
- Day 31 (generics basics) complete

## Explanation

Generic wildcards (`? extends T`, `? super T`) give flexibility at the cost of some operation restrictions. Type erasure explains why certain generic operations fail at runtime.

## Topic by Topic

### Topic 1: Upper bounded wildcard `? extends T`

Theory:
Read-only producer; you can get `T` from it but not add.

Practical:
Write `sum(List<? extends Number>)` that works with any numeric list.

### Topic 2: Lower bounded wildcard `? super T`

Theory:
Write-only consumer; you can add `T` into it but get only `Object`.

Practical:
Write `addNumbers(List<? super Integer>)`.

### Topic 3: PECS principle

Theory:
Producer Extends, Consumer Super — mnemonic for choosing wildcard direction.

Practical:
Design `copy(List<? extends T> src, List<? super T> dest)`.

### Topic 4: Type erasure in depth

Theory:
Generic types are erased to their bounds at bytecode level; `List<String>` → `List` at runtime.

Practical:
Observe `ClassCastException` from unchecked heap pollution.

### Topic 5: Reifiable vs non-reifiable types

Theory:
Primitive arrays are reifiable; generic types are not. Cannot do `new T[]`.

Practical:
Work around non-reifiable array creation with `@SuppressWarnings("unchecked")` cast.

## Key Concepts

- PECS rule for wildcard direction
- Producer/consumer roles
- Heap pollution and `ClassCastException`
- Non-reifiable type workarounds
- Capture conversion

## Hands-on Coding

```java
import java.util.*;

public class GenericUtils {
    // PECS: src is producer (extends), dest is consumer (super)
    public static <T> void copy(List<? extends T> src, List<? super T> dest) {
        for (T item : src) dest.add(item);
    }

    public static double sum(List<? extends Number> nums) {
        return nums.stream().mapToDouble(Number::doubleValue).sum();
    }

    public static void main(String[] args) {
        List<Integer> ints = List.of(1, 2, 3);
        List<Double> doubles = List.of(1.5, 2.5);
        List<Number> target = new ArrayList<>();

        copy(ints, target);
        copy(doubles, target);

        System.out.println("Sum of ints: " + sum(ints));
        System.out.println("Combined: " + target);
    }
}
```

## Mini Exercise

Implement `findMax(List<? extends Comparable<T>>)` — return max element without knowing exact type.

## Assessment Quiz

1. Why can't you add to `List<? extends Number>`?
2. PECS mnemonic expanded?
3. What is heap pollution?

Answers:

1. Compiler can't verify which specific subtype the list actually holds.
2. Producer Extends, Consumer Super.
3. When a variable of a parameterized type refers to an object not of that type.

## Task

- Design a generic `EventBus<T>` with subscribe/publish using correct wildcard bounds.

## Day 67 Outcome

You can design safe, flexible generic APIs using wildcards and explain type erasure implications.
