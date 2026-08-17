---
title: JDBC Fundamentals and Database Connectivity
slug: day-056-jdbc-fundamentals-and-database-connectivity
dayLabel: Day 56
level: Intermediate
estimatedMinutes: 50
order: 56
track: java
---
# Day 56 [Intermediate]: JDBC Fundamentals and Database Connectivity

## Goal

Connect Java to a relational database using JDBC and execute basic SQL statements.

## Prerequisites

- Day 55 complete
- PostgreSQL or H2 available locally

## Explanation

JDBC is the standard Java API for relational database access. Every higher-level ORM (Hibernate, JPA) uses JDBC underneath.

## Topic by Topic

### Topic 1: JDBC architecture

Theory:
`DriverManager` → `Connection` → `Statement`/`PreparedStatement` → `ResultSet`.

Practical:
Draw the call chain and map each to its purpose.

### Topic 2: Establishing connection

Theory:
`DriverManager.getConnection(url, user, password)` with JDBC URL format.

Practical:
Connect to H2 in-memory DB: `jdbc:h2:mem:testdb`.

### Topic 3: Executing a query

Theory:
`Statement.executeQuery` for SELECT; `executeUpdate` for INSERT/UPDATE/DELETE.

Practical:
Create table and insert one row.

### Topic 4: Reading `ResultSet`

Theory:
`rs.next()` advances cursor; `rs.getString`, `rs.getInt` retrieve columns.

Practical:
Read and print all rows of `users` table.

### Topic 5: Resource cleanup

Theory:
Always close `ResultSet`, `Statement`, `Connection` — use try-with-resources.

Practical:
Wrap all JDBC calls in nested try-with-resources.

## Key Concepts

- JDBC URL format
- Connection lifecycle
- Statement vs ResultSet
- try-with-resources discipline
- H2 for local testing

## Hands-on Coding

```java
import java.sql.*;

public class Main {
    static final String URL = "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1";

    public static void main(String[] args) throws Exception {
        try (Connection conn = DriverManager.getConnection(URL, "sa", "")) {
            // create table
            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(
                    "CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100))");
                stmt.executeUpdate("INSERT INTO users VALUES (1, 'Asha')");
                stmt.executeUpdate("INSERT INTO users VALUES (2, 'Bob')");
            }

            // read rows
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("SELECT * FROM users")) {
                while (rs.next()) {
                    System.out.println(rs.getInt("id") + " - " + rs.getString("name"));
                }
            }
        }
    }
}
```

## Mini Exercise

Add `email` column; insert 3 users; query and print only names where id > 1.

## Assessment Quiz

1. What does `executeUpdate` return?
2. Why close `ResultSet` before `Statement`?
3. What is the H2 in-memory URL?

Answers:

1. Number of rows affected.
2. Resources must be closed in reverse order of creation.
3. `jdbc:h2:mem:testdb`.

## Task

- Create `products` table; implement insert-all and list-all methods.

## Day 56 Outcome

You can connect to a relational database and execute SQL through the standard JDBC API.
