---
title: Event-Driven Design in Core Java without Framework Coupling
slug: day-105-event-driven-design-in-core-java-without-framework-coupling
dayLabel: Day 105
level: Expert
estimatedMinutes: 55
order: 105
track: java
---
# Day 105 [Expert]: Event-Driven Design in Core Java without Framework Coupling

## Goal

Implement event-driven communication between aggregates and bounded contexts using pure Java — no Spring Events, no Kafka, no Spring ApplicationContext.

## Prerequisites

- Day 104 complete
- Day 101 (domain events) complete

## Explanation

Event-driven design decouples producers from consumers. In pure Java this is achievable with a domain event dispatcher, an in-process event bus, and a transactional outbox pattern — all without framework coupling.

## Topic by Topic

### Topic 1: Domain event lifecycle

Theory:
Aggregates collect events; use case pulls them after save; dispatcher routes to handlers.

Practical:
`Order.place()` collects `OrderPlaced`; `PlaceOrderUseCase` pulls and dispatches after `repo.save()`.

### Topic 2: In-process event bus

Theory:
`EventBus` maps event type to list of handlers. Handlers are registered at startup in composition root.

Practical:
Build type-safe `EventBus<T>` using `Class<T>` as key.

### Topic 3: Event handler registration and composition root

Theory:
All wiring happens in `main` or a `Configuration` class — not inside domain or use-case code.

Practical:
Wire `OrderPlacedHandler` and `InventoryUpdateHandler` to `OrderPlaced` in `Main`.

### Topic 4: Synchronous vs asynchronous dispatch

Theory:
Sync: handler runs on same thread — simple, transactional. Async: handler on worker thread — non-blocking, but requires careful error handling.

Practical:
Add async dispatch option using `CompletableFuture.runAsync`.

### Topic 5: Transactional outbox (pure Java)

Theory:
Save domain events to outbox table in same transaction as aggregate; background thread reads and dispatches to external systems.

Practical:
Implement `OutboxRepository` and `OutboxPublisher` using JDBC + `ScheduledExecutorService`.

## Key Concepts

- Events collected in aggregate, dispatched outside
- Type-safe in-process event bus
- Composition root as wiring point
- Sync vs async dispatch tradeoffs
- Transactional outbox for reliable external publishing

## Hands-on Coding

```java
// Type-safe event bus
public class EventBus {
    private final Map<Class<?>, List<Consumer<Object>>> handlers = new HashMap<>();

    @SuppressWarnings("unchecked")
    public <T> void register(Class<T> type, Consumer<T> handler) {
        handlers.computeIfAbsent(type, k -> new ArrayList<>())
                .add(e -> handler.accept((T) e));
    }

    public void dispatch(Object event) {
        handlers.getOrDefault(event.getClass(), List.of())
                .forEach(h -> h.accept(event));
    }
}

// Use case dispatches after aggregate save
class PlaceOrderUseCase {
    private final OrderRepository repo;
    private final EventBus bus;

    void execute(PlaceOrderCommand cmd) {
        Order order = Order.create(cmd.customerId(), cmd.lines());
        order.place();
        repo.save(order);
        order.pullEvents().forEach(bus::dispatch);  // dispatch after commit
    }
}

// Composition root wiring
EventBus bus = new EventBus();
bus.register(OrderPlaced.class, e ->
    inventoryService.reserveStock(e.orderId()));
bus.register(OrderPlaced.class, e ->
    notificationService.sendConfirmation(e.customerId()));
```

## Mini Exercise

Add an `OrderCancelled` event; register two handlers: refund and restock.

## Assessment Quiz

1. Why dispatch events after `repo.save()` not inside the aggregate?
2. What is the transactional outbox pattern for?
3. Risk of async dispatch without error handling?

Answers:

1. Save may fail; dispatching before would produce events for uncommitted state.
2. Guarantees at-least-once delivery to external systems even if the process crashes after commit.
3. Silent handler failures — use `exceptionally` or dead-letter queue.

## Task

- Add outbox pattern to Day 103 banking project; verify no event is lost when DB write succeeds.

## Day 105 Outcome

You can implement clean, testable event-driven communication across domain boundaries without framework coupling.
