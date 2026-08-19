---
title: Constructors this and Object Lifecycle
slug: day-017-constructors-this-and-object-lifecycle
dayLabel: Day 17
level: Beginner
estimatedMinutes: 45
order: 17
track: java
---
# Day 17 [Beginner]: Constructors this and Object Lifecycle

## Goal

Initialize objects correctly with constructors and understand basic object lifecycle in Java.

## Prerequisites

- Day 16 complete

## Explanation

Constructors enforce valid object creation and improve class reliability.

## Topic by Topic

### Topic 1: Constructor basics

Theory:
Constructor has class name, no return type.

Practical:
Add constructor to `Student` class.

### Topic 2: Constructor overloading

Theory:
Multiple constructors provide flexible initialization paths.

Practical:
Create default and parameterized constructors.

### Topic 3: `this` keyword

Theory:
Refers to current object and resolves name clashes.

Practical:
Use `this.name = name` assignment.

### Topic 4: Object lifecycle overview

Theory:
Create -> use -> eligible for GC.

Practical:
Create objects in loop and observe references.

## Key Concepts

- Initialization contract
- Overloaded constructors
- `this` reference
- Lifecycle awareness

## Hands-on Coding

```java
class Student {
    String name;
    int age;

    Student() {
        this("Unknown", 0);
    }

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void printInfo() {
        System.out.println(name + " - " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Ravi", 21);
        s.printInfo();
    }
}
```

## Mini Exercise

Create `Employee` class with two constructors and `printInfo()` method.

## Assessment Quiz

1. Can constructor return value?
2. Why use `this(...)` inside constructor?
3. What happens when no constructor is written?

Answers:

1. No.
2. Constructor chaining and duplication reduction.
3. Java provides default no-arg constructor.

## Task

- Add constructor overload to one of your old classes.

## Day 17 Outcome

You can construct objects safely and use `this` correctly in class design.
