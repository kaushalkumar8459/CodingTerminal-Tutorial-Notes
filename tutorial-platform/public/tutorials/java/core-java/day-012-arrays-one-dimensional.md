---
title: Arrays One Dimensional
slug: day-012-arrays-one-dimensional
dayLabel: Day 12
level: Beginner
estimatedMinutes: 40
order: 12
track: java
---
# Day 12 [Beginner]: Arrays One Dimensional

## Goal

Store and process multiple values of the same type using one-dimensional arrays.

## Prerequisites

- Day 11 complete

## Explanation

Arrays provide fixed-size indexed storage with fast access.

## Topic by Topic

### Topic 1: Array declaration and initialization

Theory:
`int[] nums = new int[5];` and literal style.

Practical:
Create arrays using both approaches.

### Topic 2: Indexing and bounds

Theory:
Index starts at 0 and ends at `length - 1`.

Practical:
Access first/last element safely.

### Topic 3: Traversal

Theory:
Use `for` and enhanced `for-each` loops.

Practical:
Print all elements.

### Topic 4: Common operations

Theory:
Sum, max, min, and search are foundational array tasks.

Practical:
Implement all four.

## Key Concepts

- Fixed size container
- Zero-based indexing
- Traversal patterns
- Basic array algorithms

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) {
        int[] marks = {78, 85, 92, 67, 88};

        int sum = 0;
        int max = marks[0];

        for (int mark : marks) {
            sum += mark;
            if (mark > max) {
                max = mark;
            }
        }

        double avg = (double) sum / marks.length;
        System.out.println("Sum: " + sum);
        System.out.println("Max: " + max);
        System.out.println("Average: " + avg);
    }
}
```

## Mini Exercise

Take 10 numbers in array and count how many are even and odd.

## Assessment Quiz

1. Why arrays are fixed-size?
2. What is `ArrayIndexOutOfBoundsException`?
3. Difference between `for` and `for-each` here?

Answers:

1. Size is allocated at creation.
2. Accessing invalid index.
3. `for` gives index control; `for-each` gives direct values.

## Task

- Build sum, max, min, linear search in one program.

## Day 12 Outcome

You can model and process lists of primitive data using arrays.
