---
title: Loops for while do while
slug: day-008-loops-for-while-do-while
dayLabel: Day 8
level: Beginner
estimatedMinutes: 40
order: 8
track: java
---
# Day 8 [Beginner]: Loops for while do while

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
- [Day 8 Outcome](#day-8-outcome)

## Goal

Use loops to repeat logic efficiently with controlled exit conditions.

## Prerequisites

- Day 7 complete

## Explanation

Loops avoid repeated code. Choose loop type based on known or unknown iteration count.

## Topic by Topic

### Topic 1: for loop

Theory:
Best when iteration count is known.

Practical:
Print numbers 1 to 10.

### Topic 2: while loop

Theory:
Best when condition-based repetition is needed.

Practical:
Countdown until zero.

### Topic 3: do while loop

Theory:
Runs block at least once before condition check.

Practical:
Menu simulation.

### Topic 4: Infinite loop risks

Theory:
Condition or update mistakes can cause non-terminating loops.

Practical:
Inspect and fix one broken loop.

## Key Concepts

- Iteration
- Loop initialization, condition, update
- Entry-controlled vs exit-controlled loops
- Termination logic

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println("For loop: " + i);
        }

        int j = 1;
        while (j <= 3) {
            System.out.println("While loop: " + j);
            j++;
        }

        int k = 1;
        do {
            System.out.println("Do while loop: " + k);
            k++;
        } while (k <= 2);
    }
}
```

## Mini Exercise

Print multiplication table of any number using `for` loop.

## Assessment Quiz

1. Which loop guarantees at least one run?
2. What are three parts of `for` loop header?
3. Why are loop updates important?

Answers:

1. `do while`
2. Initialization, condition, update
3. They prevent infinite loops and control progress.

## Task

- Build table program and sum of first N numbers program.

## Day 8 Outcome

You can choose and implement loop types correctly for iterative tasks.
