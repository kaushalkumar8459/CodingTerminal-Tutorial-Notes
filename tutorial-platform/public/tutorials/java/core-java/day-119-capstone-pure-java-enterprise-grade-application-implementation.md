---
title: Capstone — Pure Java Enterprise-Grade Application Implementation
slug: day-119-capstone-pure-java-enterprise-grade-application-implementation
dayLabel: Day 119
level: Expert
estimatedMinutes: 180
order: 119
track: java
---
# Day 119 [Expert]: Capstone — Pure Java Enterprise-Grade Application Implementation

## Goal

Build a complete, production-quality Java application that integrates all expert-level skills from Days 91–118.

## Prerequisites

- Days 91–118 complete

## Project: Order Management System

Build a console + HTTP-capable order management system with:

1. Domain model (Day 101)
2. Clean/Hexagonal Architecture (Days 103–104)
3. JDBC persistence with transactions and HikariCP (Days 57–59)
4. Event-driven domain event dispatch (Day 105)
5. Resilience: retry + circuit breaker on DB (Day 114)
6. Observability: metrics, structured logs, distributed traces (Day 115)
7. Error taxonomy with Result type (Day 113)
8. CLI interface via picocli (Day 116)
9. Full test suite: unit, integration (Testcontainers), property-based (jqwik) (Days 53–55, 97)
10. GraalVM native image build (Day 96)

## Architecture

```text
order-management/
  core-domain/            ← Order, OrderLine, Money, OrderId
  core-application/       ← PlaceOrderUseCase, CancelOrderUseCase, ports
  adapter-jdbc/           ← JdbcOrderRepository, JdbcEventOutbox
  adapter-cli/            ← picocli commands
  adapter-http/           ← Lightweight HTTP server (com.sun.net.httpserver)
  infra-config/           ← HikariCP, CircuitBreaker, Metrics, OTel
  tests/                  ← Unit, integration, property-based
```

## Domain Model

```java
record OrderId(UUID value) { static OrderId generate() { return new OrderId(UUID.randomUUID()); } }
record Money(BigDecimal amount, Currency currency) { /* validation + add/subtract */ }
record ProductId(String value) {}

class Order {
    private final OrderId id;
    private OrderStatus status;
    private final List<OrderLine> lines;
    private final List<Object> events;
    private final Clock clock;

    Order(OrderId id, Clock clock) { this.id = id; this.clock = clock; this.status = OrderStatus.DRAFT; }

    void addItem(ProductId product, int qty, Money price) { /* invariants */ }
    void place()   { /* status check, raise OrderPlaced */ }
    void cancel()  { /* status check, raise OrderCancelled */ }
    Money total()  { /* sum lines */ }
    List<Object> pullEvents() { /* drain */ }
}
```

## Key Integration Points to Implement

1. `PlaceOrderUseCase.execute()` → domain.place() → repo.save() → outbox.store() → eventBus.dispatch()
2. `JdbcOrderRepository.save()` wrapped with `RetryPolicy` + `CircuitBreaker`
3. Every use-case method instrumented with OTel span + Micrometer timer
4. All domain failures returned as `Result<T, DomainException>`
5. CLI: `order place --product PROD-1 --qty 2 --price 9.99`
6. Architecture test (ArchUnit): domain must not import from adapter layers

## Test Plan

```java
// Unit: PlaceOrderUseCase with in-memory repo
// Integration: real H2 DB via @TestcontainersH2
// Property: Order.total() is sum of all line subtotals for any list of items
// Architecture: ArchUnit layering rule
```

## Production Checklist (preview for Day 120)

- [ ] All inputs validated at port boundary
- [ ] Secrets from environment (Day 100)
- [ ] GC configured: `-XX:+UseZGC`
- [ ] JFR continuous recording enabled
- [ ] OWASP scan: zero HIGH findings
- [ ] ArchUnit tests passing
- [ ] Mutation score > 80%
- [ ] Native image build succeeds

## Day 119 Outcome

You have implemented a complete, production-pattern Java application integrating all expert-level knowledge from the curriculum.
