---
title: Environment Setup JDK IDE and Project Structure
slug: day-002-environment-setup-jdk-ide-and-project-structure
dayLabel: Day 2
level: Beginner
estimatedMinutes: 40
order: 2
track: java
---
# Day 2 [Beginner]: Environment Setup JDK IDE and Project Structure

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
- [Day 2 Outcome](#day-2-outcome)

## Goal

Set up a clean Java development environment and understand a basic Java project layout.

## Prerequisites

- Day 1 complete
- Admin access to install software

## Explanation

A stable setup removes friction while learning. You need JDK, an IDE, and a repeatable folder structure.

## Topic by Topic

### Topic 1: Install JDK

Theory:
JDK includes compiler (`javac`) and runtime (`java`).

Practical:
Verify installation:

```bash
java -version
javac -version
```

### Topic 2: Configure IDE

Theory:
Use IntelliJ IDEA Community or VS Code with Java extensions.

Practical:
Create one sample Java class and run it via IDE.

### Topic 3: Project structure basics

Theory:
Use separate folders for source and output.

Practical:

```text
my-java-app/
  src/
    Main.java
  out/
```

### Topic 4: PATH and JAVA_HOME

Theory:
Environment variables help tools locate Java.

Practical:
Check if terminal can run Java from any path.

## Key Concepts

- JDK vs JRE
- Compiler and runtime
- IDE productivity
- Folder conventions

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Setup complete");
    }
}
```

## Mini Exercise

Create a new folder `java-day2-practice`, add `Main.java`, compile and run from terminal.

## Assessment Quiz

1. Difference between JDK and JRE?
2. What command compiles Java code?
3. What command runs bytecode?
4. Why use `src/` and `out/` separation?

Answers:

1. JDK has compiler/tools, JRE is runtime only.
2. `javac`
3. `java`
4. Cleaner build organization.

## Task

- Set up JDK + IDE.
- Compile and run one class from terminal.

## Day 2 Outcome

Your Java environment is ready for daily coding with clean project structure.
