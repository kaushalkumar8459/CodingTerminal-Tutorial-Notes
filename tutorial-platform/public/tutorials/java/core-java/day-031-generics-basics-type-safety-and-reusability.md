---
title: Generics Basics Type Safety and Reusability
slug: day-031-generics-basics-type-safety-and-reusability
dayLabel: Day 31
level: Intermediate
estimatedMinutes: 45
order: 31
track: java
---
# Day 31 [Intermediate]: Generics Basics Type Safety and Reusability

## Goal

Write type-safe, reusable classes and methods using generics.

## Prerequisites

- Day 30 complete
- Comfortable with classes and interfaces

## Explanation

Generics allow you to write one class or method that works with any type while keeping compile-time safety.

## Topic by Topic

### Topic 1: Why generics

Theory:
Without generics, collections accept `Object` — requiring casts and risking `ClassCastException` at runtime.

Practical:
Compare raw `List` vs `List<String>` behavior.

### Topic 2: Generic class

Theory:
Type parameter `<T>` declared on class name; used inside.

Practical:
Create `Box<T>` that wraps any value.

### Topic 3: Generic method

Theory:
Type parameter declared before return type; inferred from arguments.

Practical:
Write `swap(T[] arr, int i, int j)`.

### Topic 4: Bounded type parameters

Theory:
`<T extends Number>` restricts to Number subtypes.

Practical:
Sum a list of any `Number` subtype.

### Topic 5: Generic return type vs raw type

Theory:
Always prefer typed over raw; raw types exist only for legacy code.

Practical:
Identify raw type warning and fix it.

## Key Concepts

- Type parameter `<T>`
- Generic class and method
- Bounded type parameter
- Type erasure awareness
- Raw type avoidance

## Hands-on Coding

```java
class Box<T> {
    private T value;

    Box(T value) { this.value = value; }
    T get() { return value; }
    void set(T value) { this.value = value; }

    @Override
    public String toString() { return "Box[" + value + "]"; }
}

public class Main {
    static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    public static void main(String[] args) {
        Box<String> sBox = new Box<>("Hello");
        Box<Integer> iBox = new Box<>(42);

        System.out.println(sBox);
        System.out.println(iBox);
        System.out.println(max(10, 25));
        System.out.println(max("apple", "mango"));
    }
}
```

## Mini Exercise

Create generic `Pair<A, B>` class with `getFirst()`, `getSecond()`, and `swap()`.

## Assessment Quiz

1. What problem do generics solve?
2. What is type erasure?
3. Can you use `int` as a type parameter?

Answers:

1. Unsafe casts and `ClassCastException` in raw collections.
2. Generic type info is removed at compile time; JVM sees `Object`.
3. No; use `Integer` (wrapper type).

## Task

- Create `Stack<T>` class with push, pop, peek, isEmpty.

## Day 31 Outcome

You can write reusable type-safe generic classes and methods.
