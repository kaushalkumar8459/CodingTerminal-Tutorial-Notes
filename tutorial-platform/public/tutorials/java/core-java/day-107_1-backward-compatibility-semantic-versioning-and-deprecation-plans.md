---
title: Backward Compatibility, Semantic Versioning, and Deprecation Plans
slug: day-107_1-backward-compatibility-semantic-versioning-and-deprecation-plans
dayLabel: Day 107_1
level: Expert
estimatedMinutes: 50
order: 107
track: java
---
# Day 107 [Expert]: Backward Compatibility, Semantic Versioning, and Deprecation Plans

## Goal

Evolve Java APIs and libraries without breaking consumers by applying semantic versioning and structured deprecation strategies.

## Prerequisites

- Day 106 complete

## Explanation

Breaking changes in published APIs are one of the biggest sources of pain in Java ecosystems. This day covers how to change APIs safely and communicate changes clearly.

## Topic by Topic

### Topic 1: Semantic versioning (SemVer)

Theory:
`MAJOR.MINOR.PATCH`. MAJOR = breaking change. MINOR = backward-compatible addition. PATCH = bug fix.

Practical:
Classify 10 hypothetical changes as MAJOR/MINOR/PATCH.

### Topic 2: What constitutes a breaking change in Java

Theory:

- Removing public method/constructor
- Changing method signature
- Narrowing throws clause
- Changing return type (except covariant)
- Removing public field
- Changing accessible exception type

Practical:
Review a diff; identify which changes are breaking.

### Topic 3: `@Deprecated` and `@SuppressWarnings`

Theory:
`@Deprecated(since="2.1", forRemoval=true)` documents timeline. Consumers get compile warnings.

Practical:
Deprecate `findByName(String)` with a `since` annotation; add Javadoc pointing to replacement.

### Topic 4: Deprecation migration path

Theory:
Keep old method as delegation to new; document replacement; remove only in next major version.

Practical:
Rename `computeTotal()` to `total()`; keep `computeTotal()` as deprecated delegation.

### Topic 5: API evolution patterns

Theory:

- Add overloads (don't remove)
- Default methods on interfaces for new behaviour
- New subtype instead of modifying existing
- New module instead of changing existing

Practical:
Add a new `findById(AccountId)` overload without changing `findById(String)`.

## Key Concepts

- SemVer MAJOR.MINOR.PATCH
- Java breaking change checklist
- `@Deprecated(forRemoval=true)`
- Delegation pattern for migration
- Evolution without removal

## Hands-on Coding

```java
// Deprecated with migration path
public interface AccountRepository {

    /**
     * @deprecated Use {@link #findById(AccountId)} instead.
     */
    @Deprecated(since = "2.0", forRemoval = true)
    default Account findById(String id) {
        return findById(AccountId.of(id));   // delegate to new method
    }

    Account findById(AccountId id);          // new typed API
    void save(Account account);
}

// Interface evolution via default method
public interface Validator<T> {
    List<String> validate(T value);

    // New in v2.1 — default avoids breaking implementors
    default boolean isValid(T value) {
        return validate(value).isEmpty();
    }
}
```

## Mini Exercise

Take the Day 101 `Order` aggregate; rename `addLine` to `addItem` while keeping a deprecated `addLine` bridge.

## Assessment Quiz

1. When should MAJOR version bump?
2. Is adding a new method to an interface breaking?
3. What does `forRemoval=true` communicate?

Answers:

1. Any change that can break existing consumers.
2. Yes for non-`default` methods in classic interfaces; no for `default` methods.
3. The deprecated element will be removed in a future major version.

## Task

- Apply SemVer to your Day 103 project; add a deprecation plan for `TransferMoneyUseCase` interface evolution.

## Day 107 Outcome

You can evolve Java APIs systematically without breaking consumers and communicate changes clearly.
