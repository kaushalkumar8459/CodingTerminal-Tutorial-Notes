---
title: Connection Pooling with HikariCP
slug: day-059-connection-pooling-with-hikaricp
dayLabel: Day 59
level: Intermediate
estimatedMinutes: 45
order: 59
track: java
---
# Day 59 [Intermediate]: Connection Pooling with HikariCP

## Goal

Replace `DriverManager` with HikariCP to manage connections efficiently for real-world applications.

## Prerequisites

- Day 58 complete

## Explanation

Opening a new DB connection for every request is extremely expensive. Connection pools maintain a set of ready-to-use connections, dramatically improving throughput.

## Topic by Topic

### Topic 1: Why connection pooling

Theory:
Connection creation involves network round-trip, authentication, and resource allocation. Pooling amortizes this cost.

Practical:
Measure time for 100 operations with vs without pooling (conceptually).

### Topic 2: HikariCP configuration

Theory:
`maximumPoolSize`, `minimumIdle`, `connectionTimeout`, `idleTimeout`, `maxLifetime`.

Practical:
Configure pool with sensible defaults for a web service.

### Topic 3: Obtaining and returning connections

Theory:
`dataSource.getConnection()` borrows from pool; `connection.close()` returns it.

Practical:
Wrap in try-with-resources — `close()` returns, not destroys.

### Topic 4: Pool monitoring

Theory:
`HikariPoolMXBean` exposes active, idle, pending counts.

Practical:
Log pool stats every 5 seconds.

### Topic 5: Pool tuning guidelines

Theory:
Pool size ≈ number of DB cores × 2. Too large causes DB contention.

Practical:
Decide pool size for 4-core DB with 20 app threads.

## Key Concepts

- Pool borrow-return lifecycle
- HikariConfig vs properties file
- `close()` returns to pool
- Pool sizing formula
- Health monitoring

## Hands-on Coding

```java
import com.zaxxer.hikari.*;
import java.sql.*;

public class DatabasePool {
    private static final HikariDataSource DS;

    static {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1");
        config.setUsername("sa");
        config.setPassword("");
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setConnectionTimeout(30_000);
        config.setIdleTimeout(600_000);
        config.setMaxLifetime(1_800_000);
        DS = new HikariDataSource(config);
    }

    public static Connection getConnection() throws SQLException {
        return DS.getConnection();
    }

    public static void main(String[] args) throws Exception {
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.executeUpdate("CREATE TABLE test (id INT)");
            stmt.executeUpdate("INSERT INTO test VALUES (1)");
            ResultSet rs = stmt.executeQuery("SELECT * FROM test");
            while (rs.next()) System.out.println(rs.getInt(1));
        }
        DS.close();
    }
}
```

## Mini Exercise

Simulate 5 concurrent threads each making 3 DB queries through the same pool.

## Assessment Quiz

1. What happens when pool is exhausted and no connection is free?
2. What does `connection.close()` actually do with HikariCP?
3. Ideal pool size for 8-core DB?

Answers:

1. Thread waits up to `connectionTimeout`; then `SQLTimeoutException`.
2. Returns connection to pool for reuse.
3. ~16 (8 × 2), adjusted by benchmark.

## Task

- Refactor Day 56–58 code to use `DatabasePool` instead of `DriverManager`.

## Day 59 Outcome

You can configure and use HikariCP for production-grade database connection management.
