---
title: Exception Handling try catch finally
slug: day-025-exception-handling-try-catch-finally
dayLabel: Day 25
level: Beginner
estimatedMinutes: 45
order: 25
track: java
---
# Day 25 [Beginner]: Exception Handling try catch finally

## Goal

Handle runtime errors gracefully using try-catch-finally and understand the exception hierarchy.

## Prerequisites

- Day 24 complete

## Explanation

Exceptions are objects representing runtime problems. Proper handling prevents crashes and provides useful feedback.

## Topic by Topic

### Topic 1: Exception hierarchy

Theory:
`Throwable` -> `Exception` -> checked/unchecked, `Error`.

Practical:
Map common exceptions to their category.

### Topic 2: try-catch block

Theory:
Wraps risky code; catch handles specific exception type.

Practical:
Catch `ArithmeticException` for division by zero.

### Topic 3: Multiple catch blocks

Theory:
Handle different exceptions differently; more specific first.

Practical:
Catch `NumberFormatException` and `ArrayIndexOutOfBoundsException`.

### Topic 4: finally block

Theory:
Always runs; used for cleanup.

Practical:
Close scanner in finally.

### Topic 5: try-with-resources

Theory:
Auto-closes `AutoCloseable` resources; cleaner than finally.

Practical:
Use try-with-resources for file reading.

## Key Concepts

- Checked vs unchecked exceptions
- Catch specificity order
- finally guarantee
- try-with-resources

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Caught: " + e.getMessage());
        } finally {
            System.out.println("Finally always runs");
        }

        try {
            int n = Integer.parseInt("abc");
        } catch (NumberFormatException e) {
            System.out.println("Bad number format: " + e.getMessage());
        }
    }
}
```

## Mini Exercise

Read two numbers from user; handle invalid input and division by zero separately.

## Assessment Quiz

1. Difference between checked and unchecked exception?
2. Does finally run if exception is uncaught?
3. What is try-with-resources?

Answers:

1. Checked must be declared/handled; unchecked are runtime.
2. Yes, before propagation.
3. Automatically closes `AutoCloseable` resources.

## Task

- Write one program demonstrating all three: try-catch, multiple-catch, finally.

## Day 25 Outcome

You can handle runtime errors predictably and keep resources clean.
