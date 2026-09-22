---
title: static final and Utility Class Patterns
slug: day-023-static-final-and-utility-class-patterns
dayLabel: Day 23
level: Beginner
estimatedMinutes: 40
order: 23
track: java
---
# Day 23 [Beginner]: static final and Utility Class Patterns

## Goal

Use `static` and `final` correctly and design proper utility classes.

## Prerequisites

- Day 22 complete

## Explanation

`static` belongs to the class, not instances. `final` prevents change. Together they form constants and utility patterns.

## Topic by Topic

### Topic 1: `static` fields and methods

Theory:
Shared across all instances; accessed via class name.

Practical:
Track instance count using `static` counter.

### Topic 2: `static` initializer block

Theory:
Runs once when class is loaded.

Practical:
Use to set up complex static state.

### Topic 3: `final` variables and constants

Theory:
`final` prevents reassignment; `static final` creates constants.

Practical:
Define `MAX_RETRIES`, `PI` as constants.

### Topic 4: Utility class pattern

Theory:
Private constructor, all `static` methods; no state.

Practical:
Create `MathUtils` with `square`, `clamp`.

### Topic 5: When not to overuse `static`

Theory:
Overusing `static` leads to hidden dependencies and harder testing.

Practical:
Identify one bad `static` usage and refactor.

## Key Concepts

- Class-level vs instance-level members
- Constants via `static final`
- Utility class design
- Testing implications of `static`

## Hands-on Coding

```java
public class MathUtils {
    public static final double PI = 3.14159;

    private MathUtils() {}

    public static double square(double n) { return n * n; }

    public static double clamp(double val, double min, double max) {
        return Math.min(Math.max(val, min), max);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(MathUtils.square(4));
        System.out.println(MathUtils.clamp(15, 0, 10));
    }
}
```

## Mini Exercise

Create `StringUtils` with static methods `isEmpty`, `capitalize`, and `reverse`.

## Assessment Quiz

1. Can `static` method access instance fields?
2. Why private constructor in utility class?
3. What does `final` on a local variable mean?

Answers:

1. No.
2. Prevents instantiation.
3. Cannot be reassigned after initialization.

## Task

- Create one utility class with at least 4 static methods.

## Day 23 Outcome

You can use `static`/`final` deliberately and design clean utility classes.
