---
title: Input Output with Scanner and Formatting
slug: day-006-input-output-with-scanner-and-formatting
dayLabel: Day 6
level: Beginner
estimatedMinutes: 40
order: 6
track: java
---
# Day 6 [Beginner]: Input Output with Scanner and Formatting

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
- [Day 6 Outcome](#day-6-outcome)

## Goal

Take user input from terminal and print clean formatted output.

## Prerequisites

- Day 5 complete

## Explanation

Console interaction is the first practical layer of programming. Java provides `Scanner` for reading typed input.

## Topic by Topic

### Topic 1: Standard output

Theory:
`System.out.println`, `System.out.print`, and `System.out.printf` are core output methods.

Practical:
Print same data in all three ways.

### Topic 2: Scanner basics

Theory:
`Scanner` reads text from `System.in`.

Practical:
Read `int`, `double`, and `String`.

### Topic 3: Input pitfalls

Theory:
`nextInt()` leaves newline in buffer.

Practical:
Use `nextLine()` carefully after numeric reads.

### Topic 4: Formatting

Theory:
`printf` supports placeholders like `%d`, `%f`, `%s`.

Practical:
Format currency and marks output.

## Key Concepts

- Console input
- Console output
- Scanner lifecycle
- Formatted output

## Hands-on Coding

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter name: ");
        String name = sc.nextLine();

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        System.out.printf("Hello %s, age %d%n", name, age);
        sc.close();
    }
}
```

## Mini Exercise

Create a program that reads product name, quantity, and price, then prints bill summary.

## Assessment Quiz

1. Why use `Scanner`?
2. Difference between `print` and `println`?
3. What does `%n` do in `printf`?

Answers:

1. To read input from console.
2. `println` adds newline.
3. Platform-safe newline.

## Task

- Build one small billing input program.
- Use `printf` formatting at least twice.

## Day 6 Outcome

You can build interactive console programs with structured input and output.
