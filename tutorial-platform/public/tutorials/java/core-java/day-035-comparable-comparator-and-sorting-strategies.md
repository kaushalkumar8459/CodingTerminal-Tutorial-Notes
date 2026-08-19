---
title: Comparable Comparator and Sorting Strategies
slug: day-035-comparable-comparator-and-sorting-strategies
dayLabel: Day 35
level: Intermediate
estimatedMinutes: 45
order: 35
track: java
---
# Day 35 [Intermediate]: Comparable Comparator and Sorting Strategies

## Goal

Sort objects using natural ordering (`Comparable`) and custom ordering (`Comparator`).

## Prerequisites

- Day 34 complete

## Explanation

Sorting collections of objects requires telling Java how to compare them. Two mechanisms exist for different scenarios.

## Topic by Topic

### Topic 1: `Comparable<T>`

Theory:
Implemented by the class itself; defines natural order via `compareTo`.

Practical:
Make `Student` comparable by marks.

### Topic 2: `Comparator<T>`

Theory:
External comparison strategy; doesn't modify the class.

Practical:
Sort same list by name, then by age.

### Topic 3: Chained comparators

Theory:
`Comparator.comparing(...).thenComparing(...)` for multi-field sort.

Practical:
Sort employees by department then by name.

### Topic 4: Reverse order

Theory:
`Comparator.reverseOrder()`, `.reversed()`.

Practical:
Sort marks descending.

### Topic 5: `Collections.sort` vs `List.sort` vs `Stream.sorted`

Theory:
All accept `Comparator`; stream is non-mutating.

Practical:
Sort same list three ways and compare results.

## Key Concepts

- Natural order via `Comparable`
- External order via `Comparator`
- Chained multi-key sort
- Reverse and null-safe comparators

## Hands-on Coding

```java
import java.util.*;

class Employee implements Comparable<Employee> {
    String name;
    int age;
    double salary;

    Employee(String name, int age, double salary) {
        this.name = name; this.age = age; this.salary = salary;
    }

    @Override
    public int compareTo(Employee other) {
        return Double.compare(this.salary, other.salary);
    }

    @Override
    public String toString() {
        return name + "(" + salary + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        List<Employee> emps = new ArrayList<>(List.of(
            new Employee("Zara", 30, 75000),
            new Employee("Amit", 25, 55000),
            new Employee("Priya", 28, 90000)
        ));

        Collections.sort(emps);
        System.out.println("By salary: " + emps);

        emps.sort(Comparator.comparing((Employee e) -> e.name));
        System.out.println("By name: " + emps);

        emps.sort(Comparator.comparingDouble((Employee e) -> e.salary).reversed());
        System.out.println("Salary desc: " + emps);
    }
}
```

## Mini Exercise

Sort a list of products by category ascending then price descending.

## Assessment Quiz

1. Difference between `Comparable` and `Comparator`?
2. How to sort `null`-safe with comparator?
3. Does `Comparator.comparing` mutate the list?

Answers:

1. `Comparable` is in-class natural order; `Comparator` is external flexible strategy.
2. `Comparator.nullsFirst` / `Comparator.nullsLast`.
3. No; it returns a new comparator — the sorting call mutates the list.

## Task

- Sort a student list by grade (desc), then name (asc), then age (asc).

## Day 35 Outcome

You can implement flexible multi-field sorting strategies without modifying the target class.
