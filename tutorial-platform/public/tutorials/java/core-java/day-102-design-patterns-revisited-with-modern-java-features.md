---
title: Design Patterns Revisited with Modern Java Features
slug: day-102-design-patterns-revisited-with-modern-java-features
dayLabel: Day 102
level: Expert
estimatedMinutes: 55
order: 102
track: java
---
# Day 102 [Expert]: Design Patterns Revisited with Modern Java Features

## Goal

Re-implement classic GoF patterns using records, sealed classes, lambdas, and modern Java — replacing ceremony with conciseness.

## Prerequisites

- Day 101 complete

## Explanation

Many classic patterns were workarounds for Java's lack of first-class functions, immutability, and algebraic types. Modern Java can express most patterns with far less code.

## Topic by Topic

### Topic 1: Strategy — lambda replaces anonymous class

Theory:
Strategy pattern: extract algorithm behind interface. Lambda = inline strategy with zero boilerplate.

Practical:
Replace 3-class strategy hierarchy with a `Map<String, UnaryOperator<BigDecimal>>`.

### Topic 2: Command — record as immutable command

Theory:
Record captures intent as a value; can be queued, logged, serialized, replayed.

Practical:
`record TransferCommand(String fromId, String toId, Money amount)`.

### Topic 3: Visitor — sealed class + switch expression

Theory:
Exhaustive switch over sealed hierarchy replaces accept/visit double dispatch.

Practical:
`ShapeRenderer` that switches over `sealed Shape` — no visitor interface needed.

### Topic 4: Builder — simplify or eliminate

Theory:
Records with compact constructors cover most builder use cases. Only use builder when parameters > 5 or optional fields are complex.

Practical:
Replace 30-line builder with record + factory methods.

### Topic 5: Observer — functional event bus

Theory:
Map of topic to list of `Consumer<T>` listeners; lambda registration; no listener interface.

Practical:
`EventBus.subscribe("order.placed", e -> log.info("Order: " + e))`.

## Key Concepts

- Lambda as inline strategy
- Records as commands/events
- Sealed switch as visitor
- Builder only where necessary
- Functional observer (no interface)

## Hands-on Coding

```java
// Strategy via lambda map
Map<String, UnaryOperator<BigDecimal>> discounts = Map.of(
    "STUDENT",   price -> price.multiply(BigDecimal.valueOf(0.9)),
    "PREMIUM",   price -> price.multiply(BigDecimal.valueOf(0.8)),
    "NONE",      price -> price
);

BigDecimal applyDiscount(String type, BigDecimal price) {
    return discounts.getOrDefault(type, discounts.get("NONE")).apply(price);
}

// Visitor via sealed + switch
sealed interface Expr permits Num, Add, Mul {}
record Num(double value) implements Expr {}
record Add(Expr left, Expr right) implements Expr {}
record Mul(Expr left, Expr right) implements Expr {}

double eval(Expr e) {
    return switch (e) {
        case Num n   -> n.value();
        case Add a   -> eval(a.left()) + eval(a.right());
        case Mul m   -> eval(m.left()) * eval(m.right());
    };
}

// Functional event bus
class EventBus {
    private final Map<String, List<Consumer<Object>>> listeners = new HashMap<>();

    @SuppressWarnings("unchecked")
    <T> void subscribe(String topic, Consumer<T> handler) {
        listeners.computeIfAbsent(topic, k -> new ArrayList<>())
                 .add(e -> handler.accept((T) e));
    }

    void publish(String topic, Object event) {
        listeners.getOrDefault(topic, List.of()).forEach(h -> h.accept(event));
    }
}
```

## Mini Exercise

Implement a `Pipeline<T>` using functional composition (`Function.andThen`) that replaces Chain-of-Responsibility.

## Assessment Quiz

1. How does sealed class + switch replace Visitor?
2. When is a traditional Builder still justified?
3. Why is `record` preferred for Command pattern?

Answers:

1. Switch over known subtypes is exhaustive — compiler verifies all cases handled.
2. When constructing an object with many optional parameters or a complex validation chain.
3. Records are immutable, auto-implement equals/hashCode, and serialize cleanly.

## Task

- Refactor Day 101 `Order` domain events to use the functional `EventBus`.

## Day 102 Outcome

You can apply GoF patterns idiomatically in modern Java — using the right language feature for each.
