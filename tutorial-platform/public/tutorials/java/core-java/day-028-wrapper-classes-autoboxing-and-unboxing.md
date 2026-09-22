---
title: Wrapper Classes Autoboxing and Unboxing
slug: day-028-wrapper-classes-autoboxing-and-unboxing
dayLabel: Day 28
level: Beginner
estimatedMinutes: 35
order: 28
track: java
---
# Day 28 [Beginner]: Wrapper Classes Autoboxing and Unboxing

## Goal

Use wrapper classes to work with primitives as objects and understand auto-conversion behavior.

## Prerequisites

- Day 27 complete

## Explanation

Collections and generics require objects, not primitives. Wrapper classes bridge this gap.

## Topic by Topic

### Topic 1: Wrapper class overview

Theory:
Each primitive has an object equivalent: `int` -> `Integer`, `double` -> `Double`, etc.

Practical:
Use `Integer.parseInt`, `Double.valueOf`.

### Topic 2: Autoboxing

Theory:
Java automatically wraps primitive in wrapper when object is needed.

Practical:
Add `int` to `List<Integer>`.

### Topic 3: Unboxing

Theory:
Automatic unwrapping from wrapper to primitive.

Practical:
Assign `Integer` to `int`.

### Topic 4: Caching pitfall

Theory:
Integer cache: `-128` to `127` reuses instances. Outside range, `==` fails.

Practical:
Compare two `Integer` objects and observe `==` vs `equals`.

### Topic 5: Useful utility methods

Theory:
`Integer.MAX_VALUE`, `Integer.toBinaryString`, `Integer.compare`.

Practical:
Parse, convert, and compare integers.

## Key Concepts

- Primitive to object bridge
- Autoboxing/unboxing
- Integer cache range
- Utility static methods

## Hands-on Coding

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // autoboxing
        List<Integer> nums = new ArrayList<>();
        nums.add(10);
        nums.add(20);

        // unboxing
        int sum = 0;
        for (int n : nums) { sum += n; }
        System.out.println("Sum: " + sum);

        // cache pitfall
        Integer a = 127, b = 127;
        Integer x = 128, y = 128;
        System.out.println(a == b);  // true (cached)
        System.out.println(x == y);  // false (not cached)
        System.out.println(x.equals(y));  // true
    }
}
```

## Mini Exercise

Store 5 user-entered numbers in `List<Integer>` and find max using `Integer.compare`.

## Assessment Quiz

1. Why do collections require wrapper types?
2. What is autoboxing?
3. Safe way to compare two `Integer` objects?

Answers:

1. Generics work only with objects.
2. Automatic primitive-to-object conversion by compiler.
3. `equals()`.

## Task

- Demonstrate autoboxing, unboxing, and cache pitfall in one file.

## Day 28 Outcome

You can confidently mix primitives and collections without boxing-related bugs.
