---
title: StringBuilder StringBuffer and Common String Problems
slug: day-015-stringbuilder-stringbuffer-and-common-string-problems
dayLabel: Day 15
level: Beginner
estimatedMinutes: 45
order: 15
track: java
---
# Day 15 [Beginner]: StringBuilder StringBuffer and Common String Problems

## Goal

Use mutable string helpers for efficient string manipulation and solve standard string tasks.

## Prerequisites

- Day 14 complete

## Explanation

Repeated string concatenation creates many objects. `StringBuilder` and `StringBuffer` solve this.

## Topic by Topic

### Topic 1: Why StringBuilder

Theory:
Mutable sequence avoids repeated object creation.

Practical:
Append many values in loop using builder.

### Topic 2: StringBuilder vs StringBuffer

Theory:

- `StringBuilder`: faster, non-synchronized
- `StringBuffer`: synchronized, thread-safe

Practical:
Use builder in single-threaded utility.

### Topic 3: Common methods

Theory:
`append`, `insert`, `delete`, `reverse`, `toString`.

Practical:
Build formatted report line.

### Topic 4: Common string problems

Theory:
Reverse string, palindrome check, frequency count.

Practical:
Implement palindrome check.

## Key Concepts

- Mutable strings
- Performance-aware concatenation
- Thread safety tradeoff
- Basic string problem solving

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) {
        String text = "level";
        String reversed = new StringBuilder(text).reverse().toString();

        System.out.println("Reversed: " + reversed);
        System.out.println("Palindrome: " + text.equals(reversed));

        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) {
            sb.append("Item").append(i).append(" ");
        }
        System.out.println(sb.toString().trim());
    }
}
```

## Mini Exercise

Write program to remove spaces from sentence and print reversed output.

## Assessment Quiz

1. Why `StringBuilder` is preferred in loops?
2. When to use `StringBuffer`?
3. Which method converts builder to string?

Answers:

1. Avoids many temporary immutable strings.
2. Multi-threaded shared string mutation.
3. `toString()`

## Task

- Solve 3 string problems using `StringBuilder`.

## Day 15 Outcome

You can write efficient string-processing logic using the right Java utilities.
