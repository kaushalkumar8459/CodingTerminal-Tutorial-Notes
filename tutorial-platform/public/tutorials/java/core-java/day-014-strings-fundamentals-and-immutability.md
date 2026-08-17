---
title: Strings Fundamentals and Immutability
slug: day-014-strings-fundamentals-and-immutability
dayLabel: Day 14
level: Beginner
estimatedMinutes: 40
order: 14
track: java
---
# Day 14 [Beginner]: Strings Fundamentals and Immutability

## Goal

Understand Java `String` behavior and why immutability matters.

## Prerequisites

- Day 13 complete

## Explanation

Strings are heavily used in Java. They are immutable, which affects memory, performance, and safety.

## Topic by Topic

### Topic 1: Creating strings

Theory:
String literals and `new String()` differ in memory behavior.

Practical:
Compare references and values.

### Topic 2: Common string operations

Theory:
`length`, `charAt`, `substring`, `equals`, `contains`, `toUpperCase`.

Practical:
Apply operations on user input.

### Topic 3: Immutability

Theory:
Any modification returns new string object.

Practical:
Show that original string remains unchanged.

### Topic 4: String pool basics

Theory:
Literals are interned for memory efficiency.

Practical:
Check behavior of identical literals.

## Key Concepts

- String immutability
- Value comparison with `equals`
- String pool
- Safe string operations

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) {
        String name = "java";
        String upper = name.toUpperCase();

        System.out.println("Original: " + name);
        System.out.println("Upper: " + upper);
        System.out.println("Length: " + name.length());
        System.out.println("Equals 'java': " + name.equals("java"));
    }
}
```

## Mini Exercise

Take a sentence and print:

- first character
- last character
- total words (simple split)

## Assessment Quiz

1. Why are Java strings immutable?
2. `==` vs `equals` for strings?
3. What is string pool?

Answers:

1. Safety, thread-friendliness, caching benefits.
2. `==` compares references, `equals` compares content.
3. Special memory area for interned literals.

## Task

- Build a string analyzer utility for one input sentence.

## Day 14 Outcome

You can use string APIs correctly and reason about immutability.
