---
title: Conditional Statements if else switch
slug: day-007-conditional-statements-if-else-switch
dayLabel: Day 7
level: Beginner
estimatedMinutes: 40
order: 7
track: java
---
# Day 7 [Beginner]: Conditional Statements if else switch

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
- [Day 7 Outcome](#day-7-outcome)

## Goal

Control program flow using `if`, `else if`, `else`, and `switch`.

## Prerequisites

- Day 6 complete
- Operator basics

## Explanation

Conditional logic lets your program take different paths based on data.

## Topic by Topic

### Topic 1: if statement

Theory:
Use `if` when one condition controls a block.

Practical:
Check if number is positive.

### Topic 2: if else

Theory:
Two-way branching logic.

Practical:
Pass/fail condition.

### Topic 3: else if ladder

Theory:
Multiple ordered conditions.

Practical:
Grade calculator.

### Topic 4: switch

Theory:
Useful when comparing one variable against many fixed values.

Practical:
Day-of-week by number.

## Key Concepts

- Branching
- Boolean conditions
- Multi-path logic
- Readable decisions

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) {
        int marks = 82;

        if (marks >= 90) {
            System.out.println("Grade A+");
        } else if (marks >= 75) {
            System.out.println("Grade A");
        } else if (marks >= 60) {
            System.out.println("Grade B");
        } else {
            System.out.println("Grade C");
        }
    }
}
```

## Mini Exercise

Build menu choice system using `switch` with 4 options.

## Assessment Quiz

1. When to prefer `switch` over `if-else`?
2. Can `if` run without `else`?
3. Why condition order matters in `else if` ladder?

Answers:

1. Fixed value matching on one expression.
2. Yes.
3. First true branch executes and skips rest.

## Task

- Create grade + menu program in one file.

## Day 7 Outcome

You can write clean branching logic for real program decisions.
