---
title: Clean Architecture in Pure Java Applications
slug: day-103-clean-architecture-in-pure-java-applications
dayLabel: Day 103
level: Expert
estimatedMinutes: 60
order: 103
track: java
---
# Day 103 [Expert]: Clean Architecture in Pure Java Applications

## Goal

Structure a Java application using Clean Architecture layers so business logic is independent of frameworks, databases, and delivery mechanisms.

## Prerequisites

- Day 102 complete

## Explanation

Clean Architecture places business rules at the centre and pushes infrastructure (DB, HTTP, messaging) to the outermost ring. The key rule: inner rings must never depend on outer rings — only on abstractions.

## Topic by Topic

### Topic 1: Layer overview

Theory:

- **Entities**: enterprise-wide business rules (Day 101 domain model)
- **Use Cases**: application-specific business rules
- **Interface Adapters**: convert data between use cases and frameworks
- **Frameworks & Drivers**: DB, HTTP, CLI

Practical:
Map Day 60 banking system to the four rings.

### Topic 2: Dependency rule enforcement

Theory:
Source code dependencies must point inward only. Use interfaces at boundaries; inject implementations.

Practical:
Create `AccountRepository` interface in use-case layer; implement in infrastructure.

### Topic 3: Use case as single-purpose class

Theory:
One class, one use case. `PlaceOrderUseCase.execute(PlaceOrderCommand)`.

Practical:
Extract `TransferMoneyUseCase` from Day 60 `BankService`.

### Topic 4: Ports and adapters at boundaries

Theory:
Input port = use case interface; output port = repository/gateway interface; adapters implement output ports.

Practical:
`AccountGateway` (port) + `JdbcAccountGateway` (adapter).

### Topic 5: Testing without infrastructure

Theory:
Use cases are tested with in-memory implementations — no DB, no Spring context.

Practical:
Test `TransferMoneyUseCase` with `InMemoryAccountRepository`.

## Key Concepts

- Dependency Rule: inner never depends on outer
- Use case as orchestrator
- Repository as output port
- Adapter implements port
- Test without infrastructure

## Hands-on Coding

```
src/
  domain/                 ← Entities + Value Objects (no deps)
    model/
      Account.java
      Money.java
  application/            ← Use Cases (depends only on domain)
    port/
      in/  TransferMoneyUseCase.java
      out/ AccountRepository.java
    usecase/
      TransferMoneyUseCaseImpl.java
  adapter/                ← Adapters (depends on application)
    persistence/
      JdbcAccountRepository.java
    cli/
      ConsoleBankingApp.java
```

```java
// Output port — in application layer
interface AccountRepository {
    Account findById(AccountId id);
    void save(Account account);
}

// Use case — in application layer
class TransferMoneyUseCaseImpl implements TransferMoneyUseCase {
    private final AccountRepository repo;

    TransferMoneyUseCaseImpl(AccountRepository repo) { this.repo = repo; }

    @Override
    public void transfer(AccountId from, AccountId to, Money amount) {
        Account fromAcc = repo.findById(from);
        Account toAcc   = repo.findById(to);
        fromAcc.debit(amount);
        toAcc.credit(amount);
        repo.save(fromAcc);
        repo.save(toAcc);
    }
}

// In-memory adapter for tests
class InMemoryAccountRepository implements AccountRepository {
    private final Map<AccountId, Account> store = new HashMap<>();
    public Account findById(AccountId id) { return store.get(id); }
    public void save(Account a) { store.put(a.id(), a); }
}
```

## Mini Exercise

Restructure your Day 30 student management app into four Clean Architecture layers.

## Assessment Quiz

1. Can a use case import from `java.sql`?
2. What is the dependency rule?
3. Why test use cases with in-memory repos?

Answers:

1. No — that couples it to infrastructure.
2. Source code dependencies point inward only; outer can depend on inner, never reverse.
3. Fast, isolated, no I/O — tests core logic only.

## Task

- Restructure Day 60 banking project into Clean Architecture; add use-case tests with in-memory adapters.

## Day 103 Outcome

You can structure Java applications so business logic never depends on frameworks or infrastructure.
