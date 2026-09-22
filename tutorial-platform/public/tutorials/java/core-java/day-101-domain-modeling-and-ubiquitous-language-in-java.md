---
title: Domain Modeling and Ubiquitous Language in Java
slug: day-101-domain-modeling-and-ubiquitous-language-in-java
dayLabel: Day 101
level: Expert
estimatedMinutes: 55
order: 101
track: java
---
# Day 101 [Expert]: Domain Modeling and Ubiquitous Language in Java

## Goal

Model a business domain using DDD tactical patterns in plain Java and establish a shared ubiquitous language between code and domain experts.

## Prerequisites

- Day 100 complete

## Explanation

Domain-Driven Design tactical patterns — entities, value objects, aggregates, and domain events — translate domain expert knowledge directly into code. Applied in plain Java, they produce highly readable and testable business logic.

## Topic by Topic

### Topic 1: Ubiquitous language

Theory:
Code names must match domain expert terms exactly. No technical synonyms. `Customer` not `UserRecord`. `placeOrder()` not `submitForm()`.

Practical:
Take a domain description; extract 10 terms; write them into class/method names.

### Topic 2: Value objects

Theory:
Immutable; identity by value not reference. Use records.

Practical:
Create `Money(BigDecimal amount, Currency currency)` record with arithmetic helpers.

### Topic 3: Entities

Theory:
Mutable; identity by ID. `equals`/`hashCode` based on ID only.

Practical:
Create `Order` entity with `OrderId` value object; business invariants in methods.

### Topic 4: Aggregates and aggregate roots

Theory:
Cluster of entities/VOs with one root. External code touches only root. Root ensures invariant consistency.

Practical:
`Order` root with `List<OrderLine>` — `addLine`, `removeItem`, `totalAmount` enforce rules.

### Topic 5: Domain events

Theory:
Named past-tense facts: `OrderPlaced`, `PaymentReceived`. Published by aggregate; consumed by other aggregates.

Practical:
Raise `OrderPlaced` from `Order.place()`; collect events; dispatch after save.

## Key Concepts

- Ubiquitous language in code
- Immutable value objects via records
- Entity identity by ID
- Aggregate root as invariant guardian
- Domain events for cross-aggregate communication

## Hands-on Coding

```java
// Value objects
record Money(BigDecimal amount, Currency currency) {
    Money {
        Objects.requireNonNull(amount);
        Objects.requireNonNull(currency);
        if (amount.compareTo(BigDecimal.ZERO) < 0)
            throw new IllegalArgumentException("Amount cannot be negative");
    }

    Money add(Money other) {
        if (!currency.equals(other.currency))
            throw new IllegalArgumentException("Currency mismatch");
        return new Money(amount.add(other.amount), currency);
    }
}

record OrderId(UUID value) {
    static OrderId generate() { return new OrderId(UUID.randomUUID()); }
}

// Aggregate root
class Order {
    private final OrderId id;
    private final List<OrderLine> lines = new ArrayList<>();
    private final List<Object> domainEvents = new ArrayList<>();

    Order(OrderId id) { this.id = id; }

    void addLine(Product product, int qty) {
        if (qty <= 0) throw new IllegalArgumentException("Qty must be positive");
        lines.add(new OrderLine(product, qty));
    }

    void place() {
        if (lines.isEmpty()) throw new IllegalStateException("Cannot place empty order");
        domainEvents.add(new OrderPlaced(id, LocalDateTime.now()));
    }

    Money total() {
        return lines.stream()
            .map(OrderLine::subtotal)
            .reduce(new Money(BigDecimal.ZERO, Currency.getInstance("USD")), Money::add);
    }

    List<Object> pullEvents() {
        var events = List.copyOf(domainEvents);
        domainEvents.clear();
        return events;
    }
}

record OrderPlaced(OrderId orderId, LocalDateTime at) {}
```

## Mini Exercise

Model a `BankAccount` aggregate with `deposit`, `withdraw`, `AccountDebited`, and `AccountCredited` events.

## Assessment Quiz

1. What makes a value object different from an entity?
2. Why only access aggregate internals through the root?
3. Why are domain events past tense?

Answers:

1. VOs have no identity — equality is by value; entities have identity by ID.
2. Root is the invariant enforcer; bypassing it risks corruption.
3. They represent something that already happened — immutable facts.

## Task

- Model an e-commerce `Cart` aggregate; raise `ItemAdded` and `CartCheckedOut` domain events.

## Day 101 Outcome

You can translate a business domain into clean, expressive Java code using DDD tactical patterns.
