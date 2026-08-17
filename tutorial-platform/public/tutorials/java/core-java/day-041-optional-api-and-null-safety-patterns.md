---
title: Optional API and Null Safety Patterns
slug: day-041-optional-api-and-null-safety-patterns
dayLabel: Day 41
level: Intermediate
estimatedMinutes: 45
order: 41
track: java
---
# Day 41 [Intermediate]: Optional API and Null Safety Patterns

## Goal

Use `Optional<T>` to express nullable results explicitly and eliminate null checks from business logic.

## Prerequisites

- Day 40 complete

## Explanation

`Optional` is a container that may or may not hold a value. It forces callers to handle the absent case, replacing null-check chains with expressive API calls.

## Topic by Topic

### Topic 1: Creating Optional

Theory:
`Optional.of(value)`, `Optional.ofNullable(value)`, `Optional.empty()`.

Practical:
Wrap nullable repository result.

### Topic 2: Consuming Optional safely

Theory:
`isPresent`, `isEmpty`, `get` (avoid), `orElse`, `orElseGet`, `orElseThrow`.

Practical:
Return default user when not found.

### Topic 3: Transforming with map and flatMap

Theory:
`map` transforms value if present; `flatMap` for nested Optional.

Practical:
Extract city from `Optional<User>` that has `Optional<Address>`.

### Topic 4: filter

Theory:
Returns empty if predicate fails.

Practical:
Find first active premium user.

### Topic 5: Anti-patterns

Theory:

- Don't use `Optional` as field type or method parameter
- Don't call `get()` without `isPresent()`
- Don't use it to replace all null checks

Practical:
Identify and fix three anti-pattern usages.

## Key Concepts

- Explicit absence modeling
- `orElse` vs `orElseGet` (lazy vs eager)
- `map`/`flatMap` chaining
- Return type only — not field/parameter

## Hands-on Coding

```java
import java.util.Optional;

record Address(String city) {}
record User(String name, Address address) {}

public class Main {
    static Optional<User> findUser(boolean present) {
        return present
            ? Optional.of(new User("Asha", new Address("Mumbai")))
            : Optional.empty();
    }

    public static void main(String[] args) {
        String city = findUser(true)
            .map(User::address)
            .map(Address::city)
            .orElse("Unknown");
        System.out.println("City: " + city);

        // orElseGet is lazy — supplier only called when empty
        User fallback = findUser(false)
            .orElseGet(() -> new User("Guest", new Address("N/A")));
        System.out.println("Fallback: " + fallback.name());
    }
}
```

## Mini Exercise

Chain: `findOrder(id)` → `getCustomer()` → `getEmail()` → print or "no email".

## Assessment Quiz

1. Difference between `orElse` and `orElseGet`?
2. Why avoid `Optional` as a field type?
3. What does `flatMap` do that `map` cannot?

Answers:

1. `orElse` always evaluates the default; `orElseGet` evaluates lazily.
2. Serialization issues, memory overhead, not intended usage.
3. Unwraps nested `Optional<Optional<T>>` to `Optional<T>`.

## Task

- Refactor a null-heavy method chain using `Optional`.

## Day 41 Outcome

You can eliminate null-check chains with expressive, composable `Optional` pipelines.
