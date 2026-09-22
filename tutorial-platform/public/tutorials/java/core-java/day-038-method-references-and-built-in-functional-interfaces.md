---
title: Method References and Built-in Functional Interfaces
slug: day-038-method-references-and-built-in-functional-interfaces
dayLabel: Day 38
level: Intermediate
estimatedMinutes: 45
order: 38
track: java
---
# Day 38 [Intermediate]: Method References and Built-in Functional Interfaces

## Goal

Replace verbose lambdas with method references and master the full set of built-in functional interfaces.

## Prerequisites

- Day 37 complete

## Explanation

Method references are shorthand for lambdas that simply delegate to an existing method.

## Topic by Topic

### Topic 1: Four kinds of method references

Theory:

- Static: `ClassName::staticMethod`
- Instance (specific): `instance::method`
- Instance (arbitrary): `ClassName::instanceMethod`
- Constructor: `ClassName::new`

Practical:
Rewrite 4 lambdas using each kind.

### Topic 2: `BiFunction`, `BiPredicate`, `BiConsumer`

Theory:
Two-argument variants of base functional interfaces.

Practical:
Compute power using `BiFunction<Double, Integer, Double>`.

### Topic 3: `UnaryOperator` and `BinaryOperator`

Theory:
Specializations of `Function` where input and output types match.

Practical:
Use `BinaryOperator<Integer>` to sum a list with `reduce`.

### Topic 4: Primitive specializations

Theory:
`IntPredicate`, `IntFunction`, `ToIntFunction`, etc. avoid boxing overhead.

Practical:
Use `IntStream.generate` with `IntSupplier`.

### Topic 5: Composing functions

Theory:
`Function.andThen`, `Function.compose`, `Predicate.and/or/negate`.

Practical:
Build a data-transformation pipeline.

## Key Concepts

- Four method reference forms
- Bi-variants
- Operator specializations
- Primitive functional interfaces
- Function composition

## Hands-on Coding

```java
import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class Main {
    static String shout(String s) { return s.toUpperCase() + "!"; }

    public static void main(String[] args) {
        // static reference
        Function<String, String> shouter = Main::shout;

        // constructor reference
        Function<String, StringBuilder> sbFactory = StringBuilder::new;

        // instance reference (arbitrary)
        Function<String, String> trimmer = String::trim;

        List<String> names = List.of("  alice  ", " bob ", "charlie");
        names.stream()
             .map(trimmer)
             .map(shouter)
             .forEach(System.out::println);

        // BinaryOperator
        BinaryOperator<Integer> sum = Integer::sum;
        System.out.println(List.of(1,2,3,4).stream().reduce(0, sum));
    }
}
```

## Mini Exercise

Build pipeline: trim → capitalize → check length > 3 → collect valid names.

## Assessment Quiz

1. When use instance method reference vs lambda?
2. What is `UnaryOperator<T>` equivalent to?
3. Why use primitive functional interfaces?

Answers:

1. When lambda body is just a single method call.
2. `Function<T, T>`.
3. Avoids autoboxing overhead for numeric operations.

## Task

- Rewrite your Day 37 validation pipeline using method references wherever possible.

## Day 38 Outcome

You can write maximally concise functional code using method references and composed functions.
