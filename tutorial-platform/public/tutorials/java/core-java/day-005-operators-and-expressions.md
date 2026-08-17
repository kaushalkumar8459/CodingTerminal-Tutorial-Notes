---
title: Operators and Expressions
slug: day-005-operators-and-expressions
dayLabel: Day 5
level: Beginner
estimatedMinutes: 35
order: 5
track: java
---
# Day 5 [Beginner]: Operators and Expressions

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
- [Day 5 Outcome](#day-5-outcome)

## Goal

Use Java operators correctly to build expressions for calculations and decision logic.

## Prerequisites

- Day 4 complete

## Explanation

Operators are symbols that perform operations on values. Expressions combine values and operators.

## Topic by Topic

### Topic 1: Arithmetic operators

Theory:
`+ - * / %`

Practical:
Calculate total, average, and remainder.

### Topic 2: Relational operators

Theory:
`== != > < >= <=`

Practical:
Compare marks against passing score.

### Topic 3: Logical operators

Theory:
`&& || !`

Practical:
Build compound conditions.

### Topic 4: Assignment and unary operators

Theory:
`= += -= ++ --`

Practical:
Increment/decrement counter.

### Topic 5: Precedence

Theory:
Operator precedence controls expression evaluation order.

Practical:
Use parentheses for clarity.

## Key Concepts

- Arithmetic logic
- Comparison logic
- Compound boolean conditions
- Readable expressions

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;

        System.out.println("a + b = " + (a + b));
        System.out.println("a / b = " + (a / b));
        System.out.println("a % b = " + (a % b));

        boolean result = (a > b) && (b > 0);
        System.out.println("Condition result: " + result);
    }
}
```

## Mini Exercise

Create expression to check if a number is positive and even.

## Assessment Quiz

1. Difference between `==` and `=`?
2. What does `%` return?
3. Why use parentheses in expressions?

Answers:

1. `==` compares, `=` assigns.
2. Remainder.
3. To control and clarify evaluation order.

## Task

- Build a marks evaluator using arithmetic + logical operators.

## Day 5 Outcome

You can write and read Java expressions with correct operator usage.
