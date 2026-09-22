---
title: API Design Principles for Java Libraries and SDKs
slug: day-106-api-design-principles-for-java-libraries-and-sdks
dayLabel: Day 106
level: Expert
estimatedMinutes: 55
order: 106
track: java
---
# Day 106 [Expert]: API Design Principles for Java Libraries and SDKs

## Goal

Design Java APIs that are intuitive, safe, backward-compatible, and pleasant to use — applying principles from the Java standard library itself.

## Prerequisites

- Day 105 complete

## Explanation

A good API is used correctly without reading the docs. A bad API leads to accidental misuse even by experienced developers. This day applies the principles Joshua Bloch established in Effective Java to library design.

## Topic by Topic

### Topic 1: Minimise surface area

Theory:
Expose only what is necessary. Every public method is a commitment. Mark internals `package-private` or in an `internal` package.

Practical:
Audit Day 103 use-case layer — make every non-port class package-private.

### Topic 2: Naming: be clear not clever

Theory:
Methods are verbs (`calculate`, `find`, `create`). Types are nouns. Avoid abbreviations. Prefer consistency with JDK conventions.

Practical:
Rename 5 poorly named methods following JDK conventions (`List.of`, `Optional.empty` style).

### Topic 3: Design for misuse prevention

Theory:
Use types to prevent invalid states. `Money` instead of `double`. `NonEmptyList<T>` instead of `List<T>`.

Practical:
Replace method taking `(String type, String status, boolean flag)` with a record or builder.

### Topic 4: Fluent API and builder design

Theory:
Return `this` from mutating builders; return new instance from record-style builders.

Practical:
Design `QueryBuilder` that prevents calling `.execute()` before `.from()`.

### Topic 5: Fail loudly at the earliest point

Theory:
Validate constructor and method arguments immediately. Throw `IllegalArgumentException` not `NullPointerException`.

Practical:
Add `Objects.requireNonNull` + range checks to every public constructor and method entry.

## Key Concepts

- Minimal API surface
- Consistent JDK-style naming
- Types as misuse prevention
- Builder state machine
- Fail-fast validation

## Hands-on Coding

```java
// Misuse prevention via types
record SearchQuery(
    NonEmptyString term,
    int page,
    int pageSize
) {
    SearchQuery {
        Objects.requireNonNull(term);
        if (page < 0)      throw new IllegalArgumentException("page >= 0");
        if (pageSize < 1)  throw new IllegalArgumentException("pageSize >= 1");
        if (pageSize > 200) throw new IllegalArgumentException("pageSize <= 200");
    }
}

// Fluent builder with compile-time state enforcement
class QueryBuilder {
    private String from;
    private final List<String> conditions = new ArrayList<>();

    QueryBuilder from(String table) {
        this.from = Objects.requireNonNull(table);
        return this;
    }

    QueryBuilder where(String condition) {
        conditions.add(condition);
        return this;
    }

    String build() {
        if (from == null) throw new IllegalStateException("from() must be called before build()");
        return "SELECT * FROM " + from + (conditions.isEmpty() ? "" :
            " WHERE " + String.join(" AND ", conditions));
    }
}
```

## Mini Exercise

Design a `HttpRequest` builder that prevents calling `body()` on a GET request at the API level.

## Assessment Quiz

1. Why minimise public API surface?
2. What does "fail loudly at the earliest point" mean?
3. How do types prevent misuse?

Answers:

1. Every public element is a backward-compatibility commitment.
2. Throw an informative exception at the entry point where bad input is received, not later.
3. Invalid combinations are unrepresentable as valid types — compiler catches errors.

## Task

- Audit Day 31 `Stack<T>` API — hide internals, add argument validation, ensure clear naming.

## Day 106 Outcome

You can design Java APIs that are safe to use, hard to misuse, and pleasant to read.
