---
title: Hexagonal Architecture — Ports, Adapters, and Testability
slug: day-104-hexagonal-architecture-ports-adapters-and-testability
dayLabel: Day 104
level: Expert
estimatedMinutes: 55
order: 104
track: java
---
# Day 104 [Expert]: Hexagonal Architecture — Ports, Adapters, and Testability

## Goal

Apply Hexagonal Architecture (Ports and Adapters) to maximise testability and make the application core driver-agnostic.

## Prerequisites

- Day 103 complete

## Explanation

Hexagonal Architecture (Alistair Cockburn) makes the application interchangeable across delivery mechanisms and infrastructure backends — you can drive it from HTTP, CLI, tests, or message queues without changing the core.

## Topic by Topic

### Topic 1: Hexagon model

Theory:

- **Driving side** (left): how actors invoke the app — HTTP, CLI, test
- **Driven side** (right): what the app invokes — DB, external services
- **Application core**: domain + use cases with no infrastructure dependency

Practical:
Draw the hexagon for the banking system with 3 driving and 2 driven ports.

### Topic 2: Driving ports (input)

Theory:
Interfaces in the application core that define use-case operations.

Practical:
`TransferMoneyPort.transfer(AccountId, AccountId, Money)`.

### Topic 3: Driving adapters

Theory:
Translate incoming calls (HTTP request, CLI args, test call) into port calls.

Practical:
`RestBankingAdapter` parses HTTP JSON and calls `TransferMoneyPort`.

### Topic 4: Driven ports (output)

Theory:
Interfaces in the core that define what external services must provide.

Practical:
`NotificationPort.notify(AccountId, String message)`.

### Topic 5: Driven adapters and test doubles

Theory:
Production: `EmailNotificationAdapter`. Tests: `InMemoryNotificationAdapter`.

Practical:
Swap adapters without touching application core.

## Key Concepts

- Driving vs driven side
- Port as the application's "plug"
- Adapter as the "cable" connecting technology to port
- Test doubles as driven adapters
- No coupling between core and Spring/JDBC

## Hands-on Coding

```
core/
  domain/  Account.java Money.java
  port/
    in/   TransferMoneyPort.java
    out/  AccountStore.java NotificationPort.java
  service/ TransferService.java

adapter/
  in/  rest/   RestAdapter.java
       cli/    CliAdapter.java
       test/   (test drives core directly)
  out/ jdbc/   JdbcAccountStore.java
       email/  EmailNotificationAdapter.java
       test/   InMemoryAccountStore.java  FakeNotification.java
```

```java
// Core — TransferService uses only port interfaces
class TransferService implements TransferMoneyPort {
    private final AccountStore accounts;
    private final NotificationPort notification;

    TransferService(AccountStore accounts, NotificationPort notification) {
        this.accounts = accounts;
        this.notification = notification;
    }

    @Override
    public void transfer(AccountId from, AccountId to, Money amount) {
        Account f = accounts.load(from);
        Account t = accounts.load(to);
        f.debit(amount);
        t.credit(amount);
        accounts.save(f);
        accounts.save(t);
        notification.notify(to, "Received " + amount);
    }
}

// Test — wires test adapters directly to core
@Test
void transferUpdatesBalances() {
    var store  = new InMemoryAccountStore();
    var notify = new FakeNotification();
    var svc    = new TransferService(store, notify);

    store.save(new Account(AccountId.of("A"), Money.of(1000)));
    store.save(new Account(AccountId.of("B"), Money.of(200)));

    svc.transfer(AccountId.of("A"), AccountId.of("B"), Money.of(300));

    assertEquals(Money.of(700), store.load(AccountId.of("A")).balance());
    assertEquals(Money.of(500), store.load(AccountId.of("B")).balance());
}
```

## Mini Exercise

Add an SMS `NotificationPort` implementation and switch from email to SMS in tests.

## Assessment Quiz

1. Difference between Hexagonal and Clean Architecture?
2. Can a driving adapter depend on the domain model?
3. Why is the test a driving adapter?

Answers:

1. They share the same idea; Hexagonal focuses on port-adapter naming convention and symmetric driving/driven sides.
2. Yes — adapters can import domain types.
3. Tests drive the application through its port — exactly what a driving adapter does.

## Task

- Add a CLI driving adapter to your Day 103 banking project.

## Day 104 Outcome

You can design a fully testable application core that is completely independent of delivery and infrastructure technology.
