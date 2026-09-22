---
title: Functional Interfaces and Lambda Expressions
slug: day-037-functional-interfaces-and-lambda-expressions
dayLabel: Day 37
level: Intermediate
estimatedMinutes: 50
order: 37
track: java
---
# Day 37 [Intermediate]: Functional Interfaces and Lambda Expressions

## Goal

Use lambda expressions to write concise, expressive code with functional interfaces.

## Prerequisites

- Day 36 complete

## Explanation

A lambda is an anonymous function. It can be passed anywhere a functional interface (single abstract method) is expected.

## Topic by Topic

### Topic 1: Functional interface

Theory:
Interface with exactly one abstract method; `@FunctionalInterface` annotation is optional but recommended.

Practical:
Create `Validator<T>` and use with lambda.

### Topic 2: Lambda syntax

Theory:
`(params) -> expression` or `(params) -> { body; }`.

Practical:
Rewrite anonymous inner class as lambda.

### Topic 3: Built-in functional interfaces

Theory:

- `Predicate<T>`: `test(T)` → boolean
- `Function<T,R>`: `apply(T)` → R
- `Consumer<T>`: `accept(T)` → void
- `Supplier<T>`: `get()` → T
- `BiFunction<T,U,R>`, `UnaryOperator<T>`

Practical:
Use each in a realistic scenario.

### Topic 4: Lambdas with collections

Theory:
`list.forEach`, `list.removeIf`, `list.replaceAll` accept lambdas.

Practical:
Filter and transform a product list.

### Topic 5: Closures and effectively final

Theory:
Lambdas can capture local variables only if they are effectively final.

Practical:
Observe compile error when captured variable is mutated.

## Key Concepts

- Functional interface contract
- Lambda syntax forms
- Core `java.util.function` types
- Effectively final capture rule

## Hands-on Coding

```java
import java.util.*;
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(
            List.of("alice", "bob", "charlie", "ann"));

        // Predicate
        Predicate<String> startsWithA = s -> s.startsWith("a");
        names.removeIf(startsWithA.negate());
        System.out.println("Starts with a: " + names);

        // Function
        Function<String, String> upperCase = String::toUpperCase;
        names.replaceAll(upperCase);
        System.out.println("Upper: " + names);

        // Consumer
        Consumer<String> printer = System.out::println;
        names.forEach(printer);

        // Supplier
        Supplier<List<String>> listFactory = ArrayList::new;
        List<String> newList = listFactory.get();
        System.out.println("New empty list: " + newList);
    }
}
```

## Mini Exercise

Write a method `applyTwice(Function<T,T>, T)` that applies function twice.

## Assessment Quiz

1. Can a functional interface have default methods?
2. What does `Predicate.and(other)` do?
3. Why must captured variables be effectively final?

Answers:

1. Yes; only one abstract method is the constraint.
2. Returns composed predicate that is true only if both are true.
3. Thread-safety and stack frame lifecycle mismatch prevention.

## Task

- Build a mini validation pipeline using `Predicate` composition.

## Day 37 Outcome

You can write concise, composable behavior using lambdas and built-in functional interfaces.
