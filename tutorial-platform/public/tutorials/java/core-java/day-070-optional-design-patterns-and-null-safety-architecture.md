---
title: Optional Design Patterns and Null Safety Architecture
slug: day-070-optional-design-patterns-and-null-safety-architecture
dayLabel: Day 70
level: Advanced
estimatedMinutes: 50
order: 70
track: java
---
# Day 70 [Advanced]: Optional Design Patterns and Null Safety Architecture

## Goal

Apply advanced `Optional` patterns throughout a layered architecture to eliminate null-driven bugs.

## Prerequisites

- Day 69 complete
- Day 41 (Optional basics) complete

## Explanation

Day 41 covered the API. This day covers how to design an entire codebase layer-by-layer so null never propagates undetected.

## Topic by Topic

### Topic 1: Optional at layer boundaries

Theory:
Repository returns `Optional<T>`; service uses it to throw domain exceptions; controller never returns null response.

Practical:
Trace a "find by ID" request through all three layers.

### Topic 2: Chaining with `flatMap` for nested lookups

Theory:
When each lookup returns `Optional`, chain with `flatMap` to avoid `Optional<Optional<T>>`.

Practical:
Find city: `findOrder(id).flatMap(Order::customer).flatMap(Customer::address).map(Address::city)`.

### Topic 3: `Optional.ifPresentOrElse`

Theory:
Execute one of two runnables depending on presence — replaces if/else on Optional.

Practical:
Print found user or default message without `isPresent` check.

### Topic 4: `Optional.or` for fallback chains

Theory:
`optional.or(() -> Optional.of(fallback))` — tries another Optional source if first is empty.

Practical:
Lookup user from cache; fall back to DB; fall back to guest.

### Topic 5: Null Object pattern as alternative

Theory:
For collections and services, returning empty collection or no-op implementation avoids Optional entirely.

Practical:
Return empty list instead of `Optional<List<T>>`; use null object for notification service.

## Key Concepts

- Optional as return type only (not field/parameter)
- Layer contract: repository optional → service exception → API never null
- `flatMap` for nested optional chains
- `or` for multi-source fallback
- Null Object pattern for collections

## Hands-on Coding

```java
import java.util.Optional;

record Address(String city) {}
record Customer(String name, Address address) {}
record Order(String id, Customer customer) {}

class OrderRepository {
    Optional<Order> findById(String id) {
        if ("O1".equals(id))
            return Optional.of(new Order("O1", new Customer("Asha", new Address("Mumbai"))));
        return Optional.empty();
    }
}

class OrderService {
    private final OrderRepository repo = new OrderRepository();

    String getCityForOrder(String orderId) {
        return repo.findById(orderId)
            .map(Order::customer)
            .map(Customer::address)
            .map(Address::city)
            .orElse("Unknown city");
    }

    Order getOrderOrThrow(String orderId) {
        return repo.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
    }
}

public class Main {
    public static void main(String[] args) {
        OrderService svc = new OrderService();
        System.out.println(svc.getCityForOrder("O1"));
        System.out.println(svc.getCityForOrder("O99"));
    }
}
```

## Mini Exercise

Redesign `UserService.findByEmail` to return `Optional<User>`; add a `getOrRegister` method using `or`.

## Assessment Quiz

1. Should a service method return `Optional` or throw?
2. When to use Null Object instead of `Optional`?
3. What does `Optional.or` do that `orElse` cannot?

Answers:

1. Throw a domain exception — callers shouldn't need to handle absence again at every layer.
2. For collections, services, or callbacks where absence should behave silently.
3. `or` provides another `Optional` lazily; `orElse` provides a plain value.

## Task

- Apply layer-consistent `Optional` design across a 3-layer product lookup feature.

## Day 70 Outcome

You can architect entire features with null safety built in from the ground up.
