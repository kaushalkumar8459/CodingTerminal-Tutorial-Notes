---
title: Records Sealed Classes and Pattern Matching
slug: day-066-records-sealed-classes-and-pattern-matching
dayLabel: Day 66
level: Advanced
estimatedMinutes: 55
order: 66
track: java
---
# Day 66 [Advanced]: Records Sealed Classes and Pattern Matching

## Goal

Use modern Java language features — records, sealed classes, and pattern matching — to write safer, more expressive code.

## Prerequisites

- Day 65 complete

## Explanation

Java 16–21 introduced a cluster of interrelated features that together enable algebraic data type style modelling in Java.

## Topic by Topic

### Topic 1: Records

Theory:
Compact immutable data carriers; auto-generates constructor, accessors, `equals`, `hashCode`, `toString`.

Practical:
Replace a POJO with a record; observe generated API.

### Topic 2: Record customisation

Theory:
Compact constructors for validation; custom methods; implement interfaces.

Practical:
Add validation in compact constructor of `Money(double amount, String currency)`.

### Topic 3: Sealed classes and interfaces

Theory:
`sealed` restricts which classes can extend/implement. Combined with `permits`.

Practical:
Model `Shape` sealed class with `permits Circle, Rectangle, Triangle`.

### Topic 4: Pattern matching for `instanceof`

Theory:
`if (obj instanceof String s)` binds variable — no separate cast needed.

Practical:
Rewrite cast-heavy visitor with pattern matching.

### Topic 5: Switch expressions with pattern matching (Java 21)

Theory:
`switch` as expression; type patterns; guards with `when`.

Practical:
Compute area for sealed `Shape` hierarchy without casts.

## Key Concepts

- Records as transparent data carriers
- Sealed hierarchy as closed type set
- Pattern matching eliminates redundant casts
- Exhaustive switch over sealed types
- Modern algebraic data modelling

## Hands-on Coding

```java
// Records
record Point(double x, double y) {
    Point { // compact constructor
        if (Double.isNaN(x) || Double.isNaN(y))
            throw new IllegalArgumentException("NaN not allowed");
    }
    double distanceTo(Point other) {
        return Math.hypot(x - other.x, y - other.y);
    }
}

// Sealed class hierarchy
sealed interface Shape permits Circle, Rectangle, Triangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}
record Triangle(double base, double height) implements Shape {}

// Exhaustive pattern switch
double area(Shape s) {
    return switch (s) {
        case Circle c       -> Math.PI * c.radius() * c.radius();
        case Rectangle r    -> r.w() * r.h();
        case Triangle t     -> 0.5 * t.base() * t.height();
    };
}

public class Main {
    public static void main(String[] args) {
        var shapes = new Shape[]{
            new Circle(5), new Rectangle(4, 6), new Triangle(3, 8)};
        for (Shape s : shapes)
            System.out.printf("%s -> area=%.2f%n", s, area(s));
    }
}
```

## Mini Exercise

Model a payment result: `sealed interface PaymentResult permits Success, Failure, Pending`.
Switch over it and print a message for each case.

## Assessment Quiz

1. Can a record extend another class?
2. What does `sealed` guarantee to the compiler?
3. Why is the switch over sealed types exhaustive?

Answers:

1. No; records implicitly extend `java.lang.Record`.
2. All subtypes are known at compile time.
3. All permitted subtypes are covered — compiler verifies completeness.

## Task

- Model a domain event hierarchy with sealed classes and process with switch expression.

## Day 66 Outcome

You can model data and type hierarchies concisely using records, sealed classes, and pattern matching.
