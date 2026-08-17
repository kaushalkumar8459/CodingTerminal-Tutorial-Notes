---
title: First Java Program and Compilation Flow
slug: day-003-first-java-program-and-compilation-flow
dayLabel: Day 3
level: Beginner
estimatedMinutes: 35
order: 3
track: java
---
# Day 3 [Beginner]: First Java Program and Compilation Flow

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
- [Day 3 Outcome](#day-3-outcome)

## Goal

Write your first Java program and understand each stage from source code to execution.

## Prerequisites

- Day 2 environment setup complete

## Explanation

Java execution flow is deterministic: write `.java`, compile with `javac`, run with `java`.

## Topic by Topic

### Topic 1: Main method

Theory:
`public static void main(String[] args)` is the JVM entry point.

Practical:
Explain each keyword briefly.

### Topic 2: Compile step

Theory:
`javac Main.java` creates `Main.class` bytecode.

Practical:
Confirm generated `.class` file.

### Topic 3: Run step

Theory:
`java Main` runs class by name (without extension).

Practical:
Run same class multiple times after edits.

### Topic 4: Common mistakes

Theory:
File name must match public class name.

Practical:
Intentionally mismatch names and read compiler error.

## Key Concepts

- `main` method
- Compile vs run
- `.java` vs `.class`
- Naming rules

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Java compile and run flow");
    }
}
```

Terminal commands:

```bash
javac Main.java
java Main
```

## Mini Exercise

Create `Greeting.java` that prints your name and city.

## Assessment Quiz

1. What does `javac` do?
2. Why `java Main` and not `java Main.java`?
3. What happens if class name and file name differ?

Answers:

1. Compiles source to bytecode.
2. JVM executes class name.
3. Compilation fails for public class mismatch.

## Task

- Compile and run two different classes.
- Break one file deliberately, fix it.

## Day 3 Outcome

You can independently create, compile, run, and debug first-level Java programs.
