---
title: Polymorphism Method Overriding
slug: day-020-polymorphism-method-overriding
dayLabel: Day 20
level: Beginner
estimatedMinutes: 45
order: 20
track: java
---
# Day 20 [Beginner]: Polymorphism Method Overriding

## Goal

Understand runtime polymorphism and method overriding in Java.

## Prerequisites

- Day 19 complete

## Explanation

Polymorphism lets one interface (parent reference) represent different actual behaviors (child implementations).

## Topic by Topic

### Topic 1: Method overriding

Theory:
Child class provides specific implementation of parent method.

Practical:
Override `sound()` in multiple child classes.

### Topic 2: Runtime dispatch

Theory:
Method call resolves at runtime based on actual object.

Practical:
Use parent reference to call overridden methods.

### Topic 3: `@Override` annotation

Theory:
Prevents accidental signature mismatch.

Practical:
Add `@Override` above child methods.

### Topic 4: Polymorphic collections

Theory:
Store multiple child objects in parent-type array/list.

Practical:
Iterate and call common method.

## Key Concepts

- Runtime polymorphism
- Dynamic method dispatch
- Overriding rules
- Parent reference, child object

## Hands-on Coding

```java
class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Bark");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Meow");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a1 = new Dog();
        Animal a2 = new Cat();

        a1.sound();
        a2.sound();
    }
}
```

## Mini Exercise

Create `Payment` parent class and override `pay()` in `CardPayment` and `UpiPayment`.

## Assessment Quiz

1. Overloading vs overriding?
2. Why use `@Override`?
3. What is dynamic dispatch?

Answers:

1. Overloading changes parameters, overriding changes implementation in child.
2. Compile-time safety and clarity.
3. Runtime method resolution based on object type.

## Task

- Build one polymorphic example with 3 child classes.

## Day 20 Outcome

You can design polymorphic behavior using inheritance and overriding.
