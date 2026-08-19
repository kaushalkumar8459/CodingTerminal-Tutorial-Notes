---
title: Variables Data Types and Type Casting
slug: day-004-variables-data-types-and-type-casting
dayLabel: Day 4
level: Beginner
estimatedMinutes: 40
order: 4
track: java
---
# Day 4 [Beginner]: Variables Data Types and Type Casting

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
- [Day 4 Outcome](#day-4-outcome)

## Goal

Understand how Java stores values using types and how conversion between types works.

## Prerequisites

- Day 3 complete

## Explanation

Type safety is one of Java's biggest strengths. You must declare variable types before use.

## Topic by Topic

### Topic 1: Variables

Theory:
A variable is named memory location.

Practical:
Declare and print variables.

### Topic 2: Primitive data types

Theory:
`byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`.

Practical:
Use one variable of each type.

### Topic 3: Reference types

Theory:
Objects, arrays, and strings are reference types.

Practical:
Create one `String` and one array.

### Topic 4: Type casting

Theory:

- Widening: automatic safe conversion
- Narrowing: explicit conversion, possible data loss

Practical:
Cast `double` to `int` and observe truncation.

## Key Concepts

- Type declaration
- Primitive vs reference
- Widening casting
- Narrowing casting

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) {
        int age = 25;
        double salary = 45678.90;
        int roundedSalary = (int) salary;

        System.out.println("Age: " + age);
        System.out.println("Salary: " + salary);
        System.out.println("Rounded Salary: " + roundedSalary);
    }
}
```

## Mini Exercise

Create variables for student name, age, marks, and pass/fail status. Print all values.

## Assessment Quiz

1. Why is Java called strongly typed?
2. Difference between primitive and reference type?
3. What is narrowing conversion?

Answers:

1. Every variable has a defined type.
2. Primitive stores value directly, reference stores object reference.
3. Converting larger range type to smaller range type explicitly.

## Task

- Write one program demonstrating all primitive types.
- Add two casting examples.

## Day 4 Outcome

You can confidently declare typed variables and perform basic type conversions.
