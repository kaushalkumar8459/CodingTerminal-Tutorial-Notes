---
title: Enum and Date Time API Basics
slug: day-029-enum-and-date-time-api-basics
dayLabel: Day 29
level: Beginner
estimatedMinutes: 45
order: 29
track: java
---
# Day 29 [Beginner]: Enum and Date Time API Basics

## Goal

Use enums for fixed sets of constants and the modern Java Date/Time API for date handling.

## Prerequisites

- Day 28 complete

## Explanation

Enums provide type-safe constants. The `java.time` API (Java 8+) provides an immutable, clean approach to dates and times.

## Topic by Topic

### Topic 1: Enum basics

Theory:
`enum` is a special class with fixed named constants.

Practical:
Create `Day` enum and use in switch.

### Topic 2: Enum with fields and methods

Theory:
Enums can carry data and behavior.

Practical:
Add `displayName` field to `Status` enum.

### Topic 3: `LocalDate`, `LocalTime`, `LocalDateTime`

Theory:
Immutable, ISO-based date/time types in `java.time`.

Practical:
Print today, now, and combine both.

### Topic 4: Date manipulation

Theory:
`plusDays`, `minusMonths`, `isBefore`, `isAfter`.

Practical:
Calculate deadline 30 days from today.

### Topic 5: Formatting

Theory:
`DateTimeFormatter` formats date to string and parses string to date.

Practical:
Format `LocalDate` as `dd-MM-yyyy`.

## Key Concepts

- Type-safe constants
- Enum with behavior
- Immutable date/time
- Date arithmetic
- DateTimeFormatter

## Hands-on Coding

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

enum Status { PENDING, ACTIVE, CLOSED }

public class Main {
    public static void main(String[] args) {
        Status s = Status.ACTIVE;
        System.out.println("Status: " + s);

        LocalDate today = LocalDate.now();
        LocalDate deadline = today.plusDays(30);

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        System.out.println("Today: " + today.format(fmt));
        System.out.println("Deadline: " + deadline.format(fmt));
    }
}
```

## Mini Exercise

Create `Priority` enum (LOW, MEDIUM, HIGH) and print days until a task due date.

## Assessment Quiz

1. Why use enum over `String` constants?
2. Is `LocalDate` mutable?
3. How to format date as `yyyy/MM/dd`?

Answers:

1. Type-safe; invalid values impossible at compile time.
2. No, all operations return new instances.
3. `DateTimeFormatter.ofPattern("yyyy/MM/dd")`.

## Task

- Create one enum with fields.
- Build a date calculator for project deadlines.

## Day 29 Outcome

You can model constant sets with enums and handle dates cleanly with the modern API.
