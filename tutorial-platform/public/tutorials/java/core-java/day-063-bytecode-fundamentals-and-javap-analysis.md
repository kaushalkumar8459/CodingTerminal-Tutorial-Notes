---
title: Bytecode Fundamentals and javap Analysis
slug: day-063-bytecode-fundamentals-and-javap-analysis
dayLabel: Day 63
level: Advanced
estimatedMinutes: 50
order: 63
track: java
---
# Day 63 [Advanced]: Bytecode Fundamentals and javap Analysis

## Goal

Read JVM bytecode using `javap` to understand how Java constructs compile and spot performance implications.

## Prerequisites

- Day 62 complete

## Explanation

Bytecode is the intermediate language JVM executes. Reading it reveals how the compiler translates lambdas, try-with-resources, string concatenation, and autoboxing — essential knowledge for performance engineering.

## Topic by Topic

### Topic 1: JVM bytecode overview

Theory:
Stack-based instruction set: `iload`, `istore`, `iadd`, `invokevirtual`, `invokestatic`, `new`, `dup`.

Practical:
Compile `int add(int a, int b){ return a+b; }` and read its bytecode.

### Topic 2: `javap -c` and `javap -verbose`

Theory:
`-c` shows instructions; `-verbose` adds constant pool, stack depth, local variable table.

Practical:
Run `javap -c -p MyClass.class` on three different methods.

### Topic 3: How lambdas compile

Theory:
Lambdas become `invokedynamic` + generated synthetic methods — not anonymous inner classes.

Practical:
Compare bytecode of lambda vs anonymous inner class for `Runnable`.

### Topic 4: String concatenation bytecode

Theory:
Since Java 9, `+` concatenation uses `invokedynamic StringConcatFactory` instead of `StringBuilder` chain.

Practical:
Inspect concatenation in loop vs `StringBuilder`.

### Topic 5: Try-with-resources compiled form

Theory:
Compiler adds synthetic variable and nested try-finally blocks.

Practical:
Read compiled form of one try-with-resources block.

## Key Concepts

- Stack-based execution model
- Constant pool
- `invokedynamic` for lambdas
- Synthetic compiler-generated code
- Performance reading from bytecode

## Hands-on Coding

```java
public class BytecodeDemo {
    public int add(int a, int b) { return a + b; }

    public String greet(String name) { return "Hello, " + name + "!"; }

    public Runnable makeRunnable() {
        return () -> System.out.println("Lambda");
    }
}
```

```bash
javac BytecodeDemo.java
javap -c -p BytecodeDemo.class
javap -verbose BytecodeDemo.class
```

## Mini Exercise

Find the bytecode difference between `Integer.valueOf(5)` and `(int) integerObj` (autoboxing/unboxing).

## Assessment Quiz

1. What instruction calls an instance method?
2. How do lambdas differ from anonymous inner classes in bytecode?
3. What is the constant pool?

Answers:

1. `invokevirtual` (or `invokeinterface` for interfaces).
2. Lambdas use `invokedynamic`; inner classes generate a new `.class` file.
3. Per-class table of literals, class names, method references used by bytecode.

## Task

- Analyze the bytecode of your `Optional.map` chain from Day 41 and count method calls.

## Day 63 Outcome

You can read and interpret JVM bytecode to diagnose compiler behavior and performance characteristics.
