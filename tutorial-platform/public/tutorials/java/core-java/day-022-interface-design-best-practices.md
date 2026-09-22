---
title: Interface Design Best Practices
slug: day-022-interface-design-best-practices
dayLabel: Day 22
level: Beginner
estimatedMinutes: 45
order: 22
track: java
---
# Day 22 [Beginner]: Interface Design Best Practices

## Goal

Design clean, focused interfaces and understand how Java supports multiple interface implementation.

## Prerequisites

- Day 21 complete

## Explanation

Good interface design produces flexible and testable code. Poorly designed interfaces cause tight coupling.

## Topic by Topic

### Topic 1: Interface Segregation

Theory:
Keep interfaces small and focused on one capability.

Practical:
Split a fat interface into two focused ones.

### Topic 2: Multiple interface implementation

Theory:
A class can implement many interfaces.

Practical:
Implement `Readable` and `Writable` in `FileProcessor`.

### Topic 3: Interface as type

Theory:
Declare variables using interface type for flexibility.

Practical:
Pass `List<Printable>` and iterate.

### Topic 4: Functional interfaces

Theory:
Single abstract method interface; used with lambdas (preview).

Practical:
Identify `Runnable`, `Comparator`, `Predicate` as examples.

### Topic 5: Naming conventions

Theory:
Use adjectives: `Runnable`, `Comparable`, `Serializable`.

Practical:
Rename poorly named interfaces.

## Key Concepts

- Interface segregation
- Multiple implementation
- Interface as type
- Functional interface awareness

## Hands-on Coding

```java
interface Readable {
    String read();
}

interface Writable {
    void write(String data);
}

class FileProcessor implements Readable, Writable {
    private String content = "";

    @Override
    public String read() { return content; }

    @Override
    public void write(String data) { content = data; }
}

public class Main {
    public static void main(String[] args) {
        FileProcessor fp = new FileProcessor();
        fp.write("Hello Interface");
        System.out.println(fp.read());
    }
}
```

## Mini Exercise

Design `Notifiable` and `Loggable` interfaces; implement both in `AlertService`.

## Assessment Quiz

1. Why split a large interface?
2. How many interfaces can a class implement?
3. What makes an interface functional?

Answers:

1. Reduces unneeded dependency.
2. Unlimited.
3. Exactly one abstract method.

## Task

- Refactor one of your earlier classes using a focused interface.

## Day 22 Outcome

You can design interfaces that are slim, stable, and testable.
