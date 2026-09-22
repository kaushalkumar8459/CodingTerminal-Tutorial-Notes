---
title: JDBC CRUD and PreparedStatement Best Practices
slug: day-057_1-jdbc-crud-and-preparedstatement-best-practices
dayLabel: Day 57_1
level: Intermediate
estimatedMinutes: 50
order: 57
track: java
---
# Day 57 [Intermediate]: JDBC CRUD and PreparedStatement Best Practices

## Goal

Implement full CRUD with `PreparedStatement` to prevent SQL injection and improve performance.

## Prerequisites

- Day 56 complete

## Explanation

`PreparedStatement` pre-compiles SQL, separates code from data, and is the only safe way to include user input in queries.

## Topic by Topic

### Topic 1: Why `PreparedStatement`

Theory:
Parameterized queries prevent SQL injection and allow DB to cache execution plan.

Practical:
Show SQL injection risk with raw `Statement`; fix with `PreparedStatement`.

### Topic 2: INSERT with parameters

Theory:
`?` placeholders; set by index starting at 1.

Practical:
Insert user with name and email parameters.

### Topic 3: SELECT with WHERE

Theory:
Parameterized SELECT; iterate `ResultSet`.

Practical:
Find user by email.

### Topic 4: UPDATE and DELETE

Theory:
Same pattern — bind parameters, call `executeUpdate`.

Practical:
Update user name; delete user by id.

### Topic 5: Generated keys

Theory:
`Statement.RETURN_GENERATED_KEYS` retrieves auto-incremented IDs.

Practical:
Insert and retrieve generated ID.

## Key Concepts

- SQL injection prevention
- Parameterized query pattern
- Full CRUD implementation
- Generated key retrieval

## Hands-on Coding

```java
import java.sql.*;

public class UserDao {
    private final Connection conn;

    UserDao(Connection conn) { this.conn = conn; }

    void insert(String name, String email) throws SQLException {
        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        try (PreparedStatement ps = conn.prepareStatement(sql,
                Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, name);
            ps.setString(2, email);
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) System.out.println("New ID: " + keys.getInt(1));
            }
        }
    }

    void update(int id, String newName) throws SQLException {
        String sql = "UPDATE users SET name = ? WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, newName);
            ps.setInt(2, id);
            ps.executeUpdate();
        }
    }

    void delete(int id) throws SQLException {
        try (PreparedStatement ps =
                conn.prepareStatement("DELETE FROM users WHERE id = ?")) {
            ps.setInt(1, id);
            ps.executeUpdate();
        }
    }
}
```

## Mini Exercise

Add `findById(int id)` returning `Optional<User>`.

## Assessment Quiz

1. Why is `Statement` with string concatenation dangerous?
2. What index does first `?` use?
3. How to get auto-generated key?

Answers:

1. User input can terminate the query and inject arbitrary SQL.
2. Index 1.
3. Pass `RETURN_GENERATED_KEYS` to `prepareStatement`; read `getGeneratedKeys()`.

## Task

- Implement full CRUD DAO for `Product` table with all 4 operations tested.

## Day 57 Outcome

You can safely implement full CRUD against a relational database using parameterized statements.
