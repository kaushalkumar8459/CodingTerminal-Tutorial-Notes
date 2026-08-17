---
title: Abstraction Abstract Class and Interface
slug: day-021-abstraction-abstract-class-and-interface
dayLabel: Day 21
level: Beginner
estimatedMinutes: 45
order: 21
track: java
---
# Day 21 [Beginner]: Abstraction Abstract Class and Interface

## Goal

Hide implementation details and define contracts using abstract classes and interfaces.

## Prerequisites

- Day 20 complete

## Explanation

Abstraction separates what a class does from how it does it. Java provides two mechanisms: abstract classes and interfaces.

## Topic by Topic

### Topic 1: Abstract class

Theory:
Cannot be instantiated; may have abstract and concrete methods.

Practical:
Create `Shape` with abstract `area()` and concrete `describe()`.

### Topic 2: Abstract method

Theory:
Declared without body; subclass must provide implementation.

Practical:
Override `area()` in `Circle` and `Rectangle`.

### Topic 3: Interface

Theory:
Pure contract; all methods are implicitly abstract (pre-Java 8).

Practical:
Create `Printable` interface with `print()`.

### Topic 4: Abstract class vs interface

Theory:

- Abstract class: shared base + partial implementation
- Interface: unrelated classes sharing a capability

Practical:
Model `Vehicle` hierarchy and `Flyable` interface separately.

### Topic 5: Default methods in interfaces (Java 8+)

Theory:
Interfaces can have `default` methods with body.

Practical:
Add `default log()` to existing interface.

## Key Concepts

- Abstraction principle
- Abstract class vs interface decision
- Contract-based design
- Default method usage

## Hands-on Coding

```java
abstract class Shape {
    abstract double area();

    void describe() {
        System.out.println("I am a shape with area: " + area());
    }
}

class Circle extends Shape {
    double radius;

    Circle(double radius) { this.radius = radius; }

    @Override
    double area() { return Math.PI * radius * radius; }
}

interface Printable {
    void print();
    default void log() { System.out.println("Logged"); }
}

public class Main {
    public static void main(String[] args) {
        Shape c = new Circle(5);
        c.describe();
    }
}
```

## Mini Exercise

Create `Animal` abstract class with abstract `sound()`. Implement in `Dog` and `Cat`.

## Assessment Quiz

1. Can abstract class have a constructor?
2. Can interface have fields?
3. When prefer interface over abstract class?

Answers:

1. Yes, called by subclass via `super()`.
2. Only `public static final` constants.
3. When unrelated classes share a capability.

## Task

- Build shape hierarchy using abstract class.
- Add one interface to existing class.

## Day 21 Outcome

You can design clean abstraction layers using both abstract classes and interfaces.
