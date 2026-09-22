---
title: Inheritance Basics and Code Reuse
slug: day-019-inheritance-basics-and-code-reuse
dayLabel: Day 19
level: Beginner
estimatedMinutes: 45
order: 19
track: java
---
# Day 19 [Beginner]: Inheritance Basics and Code Reuse

## Goal

Reuse common behavior through inheritance and understand parent-child relationships.

## Prerequisites

- Day 18 complete

## Explanation

Inheritance allows one class to extend another and reuse existing fields/methods.

## Topic by Topic

### Topic 1: `extends` keyword

Theory:
Child class inherits from parent class.

Practical:
Create `Animal` -> `Dog` example.

### Topic 2: `super` keyword

Theory:
Access parent constructor or methods.

Practical:
Call parent constructor from child.

### Topic 3: IS-A relationship

Theory:
Inheritance should model true hierarchy.

Practical:
Decide valid/invalid inheritance examples.

### Topic 4: Reuse vs overuse

Theory:
Prefer composition when relationship is not strict IS-A.

Practical:
Discuss why `Car extends Engine` is wrong.

## Key Concepts

- Parent-child hierarchy
- Constructor chaining
- `super`
- Meaningful inheritance

## Hands-on Coding

```java
class Animal {
    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.eat();
        d.bark();
    }
}
```

## Mini Exercise

Create `Vehicle` base class and `Car` child class with one extra method.

## Assessment Quiz

1. What does `extends` do?
2. Why use `super()`?
3. What is IS-A relationship?

Answers:

1. Creates inheritance relationship.
2. Calls parent constructor.
3. Child is a specialized form of parent.

## Task

- Build one valid inheritance hierarchy with at least 3 classes.

## Day 19 Outcome

You can apply inheritance properly for real code reuse scenarios.
