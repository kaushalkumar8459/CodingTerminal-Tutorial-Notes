---
title: Mini Project — JDBC Based Banking System
slug: day-060-mini-project-jdbc-based-banking-system
dayLabel: Day 60
level: Intermediate
estimatedMinutes: 120
order: 60
track: java
---
# Day 60 [Intermediate]: Mini Project — JDBC Based Banking System

## Goal

Build a complete console banking application that applies JDBC, transactions, connection pooling, logging, and testing from Days 56–59.

## Prerequisites

- Days 56–59 complete

## Project Requirements

1. Create account (name, initial deposit)
2. Deposit money
3. Withdraw money (with balance check)
4. Transfer between accounts (transactional)
5. View account statement (last N transactions)
6. List all accounts

## Design

```text
Schema:
  accounts (id SERIAL PK, name VARCHAR, balance DECIMAL)
  transactions (id SERIAL PK, account_id INT FK, type VARCHAR,
                amount DECIMAL, timestamp TIMESTAMP)

Layers:
  AccountDao       — CRUD on accounts table
  TransactionDao   — insert and query transactions
  BankService      — business logic, transaction management
  Main             — console menu loop
```

## Hands-on Coding

```java
// Schema setup (H2 compatible)
CREATE TABLE accounts (
    id    INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00
);

CREATE TABLE transactions (
    id         INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    account_id INT NOT NULL REFERENCES accounts(id),
    type       VARCHAR(20) NOT NULL,   -- DEPOSIT, WITHDRAWAL, TRANSFER_IN, TRANSFER_OUT
    amount     DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```java
// BankService.transfer — transactional money movement
void transfer(int fromId, int toId, double amount) throws SQLException {
    try (Connection conn = DatabasePool.getConnection()) {
        conn.setAutoCommit(false);
        try {
            debit(conn, fromId, amount);
            credit(conn, toId, amount);
            recordTx(conn, fromId, "TRANSFER_OUT", amount);
            recordTx(conn, toId,   "TRANSFER_IN",  amount);
            conn.commit();
            log.info("Transfer of {} from {} to {} committed", amount, fromId, toId);
        } catch (SQLException e) {
            conn.rollback();
            log.error("Transfer rolled back", e);
            throw e;
        } finally {
            conn.setAutoCommit(true);
        }
    }
}
```

## What to Implement

1. All DAO methods with `PreparedStatement`
2. `BankService` wrapping business logic and transactions
3. Console menu with input validation
4. SLF4J logging for every operation
5. JUnit 5 + Mockito tests for `BankService`

## Extension Challenges

- Add `@NotNull` annotation-based validation for account name
- Store balance history with timestamps
- Add CSV export for account statement

## Assessment Quiz

1. Why is the transfer inside a single transaction?
2. What layer should hold connection pool usage?
3. Should `AccountDao.findById` throw or return `Optional`?

Answers:

1. Debit and credit must both succeed or both fail for consistency.
2. Service layer — DAOs receive `Connection`; service controls lifecycle.
3. Return `Optional<Account>` — absence is a valid result, not an error.

## Day 60 Outcome

You have built a production-pattern JDBC application with layered design, transactions, pooling, logging, and tests.
