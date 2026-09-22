---
title: Introduction to OOP and Class Design
slug: day-016_1-introduction-to-oop-and-class-design
dayLabel: Day 16_1
level: Beginner
estimatedMinutes: 45
order: 16
track: java
---
# Day 16 [Beginner]: Introduction to OOP and Class Design

## Goal

Understand object-oriented thinking and design simple classes with clear responsibilities.

## Prerequisites

- Day 15 complete

## Explanation

OOP models real-world entities as classes and objects to improve modularity and reuse.

## Topic by Topic

### Topic 1: Class vs object

Theory:
Class is blueprint; object is runtime instance.

Practical:
Create `Student` class and instantiate two objects.

### Topic 2: Fields and methods

Theory:
Fields hold state; methods define behavior.

Practical:
Add `name`, `marks`, and `printReport()`.

### Topic 3: Good class design basics

Theory:
Keep one class focused on one concept.

Practical:
Avoid putting unrelated utilities into model class.

### Topic 4: OOP pillars preview

Theory:
Encapsulation, inheritance, polymorphism, abstraction.

Practical:
Map each pillar to one everyday example.

## Key Concepts

- Blueprint mindset
- Object state and behavior
- Responsibility-focused class design
- OOP foundation

## Hands-on Coding

```java
class Student {
    String name;
    int marks;

    void printReport() {
        System.out.println(name + " scored " + marks);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "Asha";
        s1.marks = 91;
        s1.printReport();
    }
}
```

## Mini Exercise

Create `Book` class with fields `title`, `author`, `price` and method `printDetails()`.

## Assessment Quiz

1. Class vs object?
2. Why OOP helps large codebases?
3. What is a field?

Answers:

1. Blueprint vs instance.
2. Better structure and reuse.
3. Variable inside class representing object state.

## Task

- Build two small classes and instantiate both.

## Day 16 Outcome

You can model simple real-world entities with classes and objects.
