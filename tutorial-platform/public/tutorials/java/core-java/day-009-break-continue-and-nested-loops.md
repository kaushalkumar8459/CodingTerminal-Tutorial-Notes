---
title: break continue and Nested Loops
slug: day-009-break-continue-and-nested-loops
dayLabel: Day 9
level: Beginner
estimatedMinutes: 35
order: 9
track: java
---
# Day 9 [Beginner]: break continue and Nested Loops

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
- [Day 9 Outcome](#day-9-outcome)

## Goal

Control loop flow using `break` and `continue`, and solve pattern problems with nested loops.

## Prerequisites

- Day 8 complete

## Explanation

Flow control statements make loops smarter by stopping early or skipping unwanted iterations.

## Topic by Topic

### Topic 1: break

Theory:
Exits current loop immediately.

Practical:
Stop search loop once element is found.

### Topic 2: continue

Theory:
Skips current iteration and moves to next.

Practical:
Print only odd numbers.

### Topic 3: Nested loops

Theory:
Loop inside loop for matrix-like tasks and patterns.

Practical:
Print star rectangle pattern.

### Topic 4: Readability tips

Theory:
Too many nested levels reduce clarity.

Practical:
Refactor deeply nested loop into helper method.

## Key Concepts

- Early exit
- Iteration skipping
- 2D iteration thinking
- Loop readability

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i == 6) {
                break;
            }
            System.out.println("Break flow: " + i);
        }

        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue;
            }
            System.out.println("Odd number: " + i);
        }

        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= 4; col++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

## Mini Exercise

Print right triangle pattern using nested loops.

## Assessment Quiz

1. Difference between `break` and `continue`?
2. Why nested loops are used?
3. What is one readability risk with nested loops?

Answers:

1. `break` exits loop; `continue` skips iteration.
2. For multi-dimensional or repeated grouped operations.
3. High complexity and harder debugging.

## Task

- Build one search example with `break`.
- Build one filter example with `continue`.

## Day 9 Outcome

You can precisely control loop behavior and solve nested iteration problems.
