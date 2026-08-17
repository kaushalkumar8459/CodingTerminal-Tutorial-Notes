---
title: Transactions in JDBC and Error Recovery
slug: day-058-transactions-in-jdbc-and-error-recovery
dayLabel: Day 58
level: Intermediate
estimatedMinutes: 50
order: 58
track: java
---
# Day 58 [Intermediate]: Transactions in JDBC and Error Recovery

## Goal

Use JDBC transactions to ensure all-or-nothing data integrity and implement proper error recovery.

## Prerequisites

- Day 57 complete

## Explanation

A transaction groups multiple SQL operations so they either all succeed (commit) or all fail (rollback). Without transactions, partial failures leave data in a corrupt state.

## Topic by Topic

### Topic 1: ACID properties

Theory:
Atomicity, Consistency, Isolation, Durability — why they matter.

Practical:
Map each to a bank transfer scenario.

### Topic 2: Manual transaction control

Theory:
`conn.setAutoCommit(false)` disables auto-commit; `conn.commit()` / `conn.rollback()`.

Practical:
Transfer money between accounts in one transaction.

### Topic 3: Rollback on exception

Theory:
Always rollback in `catch`; always restore autocommit in `finally`.

Practical:
Simulate partial failure; verify DB is unchanged after rollback.

### Topic 4: Savepoints

Theory:
Partial rollback to a named point within a transaction.

Practical:
Insert 3 rows; set savepoint after row 2; rollback to it on error in row 3.

### Topic 5: Isolation levels

Theory:
READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE — concurrency vs consistency trade-off.

Practical:
Set `TRANSACTION_READ_COMMITTED` and explain what dirty reads it prevents.

## Key Concepts

- ACID
- Commit and rollback pattern
- `setAutoCommit(false)` discipline
- Savepoints for partial rollback
- Isolation level awareness

## Hands-on Coding

```java
import java.sql.*;

public class TransferService {
    void transfer(Connection conn, int fromId, int toId, double amount)
            throws SQLException {
        conn.setAutoCommit(false);
        try {
            debit(conn, fromId, amount);
            credit(conn, toId, amount);
            conn.commit();
            System.out.println("Transfer complete");
        } catch (SQLException e) {
            conn.rollback();
            System.out.println("Transfer failed — rolled back: " + e.getMessage());
            throw e;
        } finally {
            conn.setAutoCommit(true);
        }
    }

    private void debit(Connection conn, int id, double amount) throws SQLException {
        try (PreparedStatement ps = conn.prepareStatement(
                "UPDATE accounts SET balance = balance - ? WHERE id = ?")) {
            ps.setDouble(1, amount); ps.setInt(2, id); ps.executeUpdate();
        }
    }

    private void credit(Connection conn, int id, double amount) throws SQLException {
        try (PreparedStatement ps = conn.prepareStatement(
                "UPDATE accounts SET balance = balance + ? WHERE id = ?")) {
            ps.setDouble(1, amount); ps.setInt(2, id); ps.executeUpdate();
        }
    }
}
```

## Mini Exercise

Add a check: if debit would make balance negative, throw `InsufficientFundsException` before the credit call.

## Assessment Quiz

1. What does `setAutoCommit(false)` do?
2. Why restore `autoCommit` in finally?
3. When use a savepoint?

Answers:

1. Groups subsequent statements into a manual transaction.
2. Connection pool reuse would otherwise get a connection in non-autocommit state.
3. When you need partial rollback within a long transaction.

## Task

- Implement a batch order-insert that rolls back all if any row fails.

## Day 58 Outcome

You can implement robust transactional logic that correctly handles failures and preserves data integrity.
