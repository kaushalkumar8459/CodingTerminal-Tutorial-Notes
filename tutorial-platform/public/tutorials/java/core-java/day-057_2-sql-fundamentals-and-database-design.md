---
title: SQL Fundamentals and Database Design
slug: day-057_2-sql-fundamentals-and-database-design
dayLabel: Day 57_2
level: Intermediate
estimatedMinutes: 60
order: 57
track: java
---
# Day 57 [Intermediate]: SQL Fundamentals and Database Design

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Explanation](#explanation)
- [Topic by Topic](#topic-by-topic)
- [Key Concepts](#key-concepts)
- [Hands-on Coding](#hands-on-coding)
- [Mini Exercise](#mini-exercise)
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Day 57 Outcome](#day-57-outcome)

## Goal

Learn SQL basics, query optimization, and database design principles that you'll use when working with JDBC.

## Prerequisites

- Day 56: JDBC Fundamentals and Database Connectivity
- Day 2: Environment Setup (basic understanding of databases)

## Explanation

Before writing Java code to access databases, you need to understand SQL and good database design.

SQL has four main categories of commands:
1. **DDL** (Data Definition Language): CREATE, ALTER, DROP
2. **DML** (Data Manipulation Language): INSERT, UPDATE, DELETE
3. **DQL** (Data Query Language): SELECT
4. **DCL** (Data Control Language): GRANT, REVOKE

Good database design follows normalization rules to avoid data redundancy and maintain data integrity. This reduces bugs in your Java applications.

## Topic by Topic

### Topic 1: Basic SELECT and WHERE Clauses

Theory:
SELECT retrieves data from a table. The WHERE clause filters results based on conditions.

The basic pattern is:
```sql
SELECT column1, column2 FROM table_name WHERE condition;
```

Practical:
Query a users table to find specific records.

```sql
-- Get all users
SELECT id, name, email FROM users;

-- Get users from a specific city
SELECT id, name, email FROM users WHERE city = 'New York';

-- Get users with salary greater than 50000
SELECT name, salary FROM employees WHERE salary > 50000;

-- Multiple conditions
SELECT name, email FROM users WHERE city = 'New York' AND age > 25;
```

### Topic 2: JOINs - Combining Data from Multiple Tables

Theory:
JOIN combines rows from two or more tables based on related columns. Common types:
- INNER JOIN: returns only matching rows
- LEFT JOIN: returns all rows from left table + matching from right
- RIGHT JOIN: returns all rows from right table + matching from left
- FULL OUTER JOIN: returns all rows from both tables

Practical:
Join tables to get complete information.

```sql
-- INNER JOIN: Users with their orders
SELECT users.name, orders.order_date, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.amount > 100;

-- LEFT JOIN: All users, even those with no orders
SELECT users.name, COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.name;

-- Multiple JOINs: Users, Orders, Products
SELECT u.name, o.order_date, p.product_name, ol.quantity
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN order_lines ol ON o.id = ol.order_id
INNER JOIN products p ON ol.product_id = p.id;
```

### Topic 3: Aggregation and GROUP BY

Theory:
Aggregate functions (COUNT, SUM, AVG, MAX, MIN) compute values over multiple rows. GROUP BY groups results by one or more columns.

Practical:
Summarize data to get business insights.

```sql
-- Total number of users
SELECT COUNT(*) as user_count FROM users;

-- Average salary by department
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department;

-- Users with more than 5 orders
SELECT user_id, COUNT(*) as order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;

-- Total sales by product category
SELECT c.category_name, SUM(ol.quantity * ol.price) as total_sales
FROM products p
INNER JOIN order_lines ol ON p.id = ol.product_id
INNER JOIN categories c ON p.category_id = c.id
GROUP BY c.category_id, c.category_name
ORDER BY total_sales DESC;
```

### Topic 4: Indexes and Query Optimization

Theory:
Indexes speed up data retrieval but slow down writes. An index is like a book's table of contents—it helps find data faster.

Common indexes:
- Primary Key Index: automatic, ensures uniqueness
- Composite Index: on multiple columns
- WHERE clause columns are good candidates for indexing

Practical:
Create indexes strategically.

```sql
-- Create index on frequently searched column
CREATE INDEX idx_users_email ON users(email);

-- Composite index for multiple columns
CREATE INDEX idx_users_city_age ON users(city, age);

-- Avoid SELECT * which requires reading all columns
-- BAD (slow):
SELECT * FROM users WHERE city = 'New York';

-- GOOD (faster, uses only needed columns):
SELECT id, name, email FROM users WHERE city = 'New York';

-- Use EXPLAIN to see query plan
EXPLAIN SELECT id, name FROM users WHERE city = 'New York';
```

### Topic 5: Normalization and Database Design

Theory:
Normalization reduces data redundancy and improves data integrity. Common normal forms:
- 1NF: No repeating groups
- 2NF: No partial dependencies
- 3NF: No transitive dependencies

Bad design wastes storage and causes update problems. Good design follows normalization.

Practical:
Design tables properly.

```sql
-- BAD Design (denormalized): Repeating data
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    order1_id INT,
    order1_date DATE,
    order2_id INT,
    order2_date DATE,
    order3_id INT,
    order3_date DATE
);

-- GOOD Design (normalized): Separate tables
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- BAD: Storing derived data
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10, 2),
    item_count INT,
    average_item_price DECIMAL(10, 2)  -- Derived from total/count
);

-- GOOD: Store only raw data, compute derived data in queries
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10, 2)
);
```

## Key Concepts

- DDL, DML, DQL, DCL
- SELECT, WHERE, ORDER BY, LIMIT
- INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN
- GROUP BY, HAVING, Aggregate functions
- Primary keys and foreign keys
- Indexes and query plans
- Normalization (1NF, 2NF, 3NF)
- Query optimization best practices
- EXPLAIN and performance analysis

## Hands-on Coding

Complete SQL example with Java context:

```java
import java.sql.*;

public class SQLExamples {
    
    // Good query with explicit columns and index-friendly WHERE
    public static void findUsersByCity(Connection conn, String city) throws SQLException {
        String sql = "SELECT id, name, email FROM users WHERE city = ? ORDER BY name";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, city);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    System.out.println(rs.getString("name") + " - " + rs.getString("email"));
                }
            }
        }
    }
    
    // Example with JOIN
    public static void getUserOrdersSummary(Connection conn) throws SQLException {
        String sql = "SELECT u.name, COUNT(o.id) as order_count, SUM(o.amount) as total_spent " +
                     "FROM users u LEFT JOIN orders o ON u.id = o.user_id " +
                     "GROUP BY u.id, u.name " +
                     "ORDER BY total_spent DESC";
        try (Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                System.out.printf("%s: %d orders, $%.2f%n", 
                    rs.getString("name"), 
                    rs.getInt("order_count"), 
                    rs.getDouble("total_spent"));
            }
        }
    }
}
```

## Mini Exercise

Design a database for a library system with:
- Books (title, author, ISBN, pages)
- Members (name, email, join_date)
- Loans (which book, which member, loan date, return date)

Write normalized DDL statements and a query to find books currently on loan.

## Assessment Quiz

1. What is the difference between INNER JOIN and LEFT JOIN?
2. Why should you index columns used in WHERE clauses?
3. What does normalization prevent?
4. Write a query to find customers who have spent more than $1000.

Answers:

1. INNER JOIN returns only matching rows; LEFT JOIN returns all left table rows + matching right rows
2. Indexes speed up data retrieval by creating a lookup structure
3. Normalization prevents data redundancy and update anomalies
4. `SELECT customer_id, SUM(amount) as total FROM orders GROUP BY customer_id HAVING SUM(amount) > 1000;`

## Task

1. Design tables for a social media platform (users, posts, likes, comments)
2. Write queries to find: top 10 posts by likes, users with most followers, trending hashtags
3. Analyze query performance using EXPLAIN

## Day 57 Outcome

You understand SQL query fundamentals, JOINs, aggregation, and can write efficient queries. You know database design principles and how to optimize queries with indexes.
