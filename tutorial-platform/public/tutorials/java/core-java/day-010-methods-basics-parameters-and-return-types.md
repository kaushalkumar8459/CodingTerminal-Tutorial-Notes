---
title: Methods Basics Parameters and Return Types
slug: day-010-methods-basics-parameters-and-return-types
dayLabel: Day 10
level: Beginner
estimatedMinutes: 40
order: 10
track: java
---
# Day 10 [Beginner]: Methods Basics Parameters and Return Types

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Explanation](#explanation)
- [Topic by Topic](#topic-by-topic)
- [Key Concepts](#key-concepts)
- [Hands-on Coding](#hands-on-coding)
- [Mini Exercise](#mini-exercise)
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Day 10 Outcome](#day-10-outcome)

## Goal

Create reusable methods with parameters and return values to reduce duplication.

## Prerequisites

- Day 9 complete

## Explanation

Methods break large logic into reusable units. They improve clarity, testing, and maintainability.

## Topic by Topic

### Topic 1: What is a method

Theory:
Method is a named block that performs a task.

Practical:
Create method that prints greeting.

### Topic 2: Parameters

Theory:
Parameters accept input values.

Practical:
Pass two numbers to addition method.

### Topic 3: Return types

Theory:
Method can return computed value using `return`.

Practical:
Return max of two values.

### Topic 4: `void` methods

Theory:
Use `void` when method performs action but does not return data.

Practical:
Build print utility method.

### Topic 5: Method naming

Theory:
Use verbs and meaningful names.

Practical:
Rename unclear method names for readability.

## Key Concepts

- Method declaration
- Parameters and arguments
- Return value
- `void` vs non-void methods
- Reusability

## Hands-on Coding

```java
public class Main {
    public static void greet(String name) {
        System.out.println("Hello, " + name);
    }

    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        greet("Karan");
        int total = add(10, 20);
        System.out.println("Total: " + total);
    }
}
```

## Mini Exercise

Create methods for:

- subtract
- multiply
- isEven

Then call each from `main`.

## Assessment Quiz

1. Difference between parameter and argument?
2. When do we use `void`?
3. Why methods are better than repeated code blocks?

Answers:

1. Parameter is method variable, argument is passed value.
2. When no return value is needed.
3. Better reuse and maintenance.

## Task

- Write at least 4 methods in one class.
- Use both returning and non-returning methods.

## Day 10 Outcome

You can design and call methods with clear parameters and return contracts.
