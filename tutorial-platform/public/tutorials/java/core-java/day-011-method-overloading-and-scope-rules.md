---
title: Method Overloading and Scope Rules
slug: day-011-method-overloading-and-scope-rules
dayLabel: Day 11
level: Beginner
estimatedMinutes: 40
order: 11
track: java
---
# Day 11 [Beginner]: Method Overloading and Scope Rules

## Goal

Understand how Java supports multiple methods with the same name and how variable scope works.

## Prerequisites

- Day 10 complete

## Explanation

Method overloading improves API readability, while scope rules prevent accidental variable misuse.

## Topic by Topic

### Topic 1: Method overloading basics

Theory:
Same method name, different parameter list.

Practical:
Create `add(int, int)` and `add(double, double)`.

### Topic 2: How Java resolves overloaded methods

Theory:
Compiler selects best matching signature at compile time.

Practical:
Call overloaded methods with different argument types.

### Topic 3: Invalid overloading

Theory:
Changing only return type does not overload a method.

Practical:
Try invalid case and read compiler error.

### Topic 4: Scope rules

Theory:

- Local scope: inside method/block
- Class scope: fields
- Parameter scope: method input variables

Practical:
Use same variable name in different valid scopes.

### Topic 5: Shadowing

Theory:
Local variable can shadow class field.

Practical:
Use `this` to access class field.

## Key Concepts

- Compile-time polymorphism
- Signature matching
- Local/class scope
- Variable shadowing

## Hands-on Coding

```java
public class Calculator {
    int value = 100;

    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }

    void printValue(int value) {
        System.out.println("Local: " + value);
        System.out.println("Field: " + this.value);
    }

    public static void main(String[] args) {
        Calculator c = new Calculator();
        System.out.println(c.add(2, 3));
        System.out.println(c.add(2.5, 3.5));
        c.printValue(50);
    }
}
```

## Mini Exercise

Create overloaded `area` methods for square, rectangle, and circle.

## Assessment Quiz

1. What defines a unique overloaded method?
2. Can return type alone overload method?
3. Why use `this`?

Answers:

1. Different parameter list.
2. No.
3. To refer to current object fields/methods.

## Task

- Write 3 overloaded methods.
- Add one shadowing example and fix with `this`.

## Day 11 Outcome

You can apply overloading correctly and avoid scope-related confusion.
