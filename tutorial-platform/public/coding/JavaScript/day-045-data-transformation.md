# Day 045 — Data Transformation

Matches Tutorial Day 45 (Array and Object Practical Patterns). Use realistic datasets
(users, products, orders, employees) — no limit on how many you solve.

## Basic

1. Group an array of orders by their `status` field into an object of arrays.
2. Filter an array of products to only those within a price range (min and max).
3. Sort an array of employees by `department`, then by `name` within each department.
4. Map an array of orders to just their `id` and computed `total` (from nested items).
5. Aggregate: calculate the total revenue across all orders in an array.

## Concept

6. Group employees by department AND calculate the average salary per department.
7. Given orders with nested `items`, flatten all items across all orders into one single
   array (regardless of which order they came from).
8. Given a list of products, build a summary object showing count and average price per category.
9. Given a list of users with `signupDate` (as strings), sort them from newest to oldest.
10. Build a function `topN(array, key, n)` that returns the top N items sorted by a
    given numeric property (e.g. top 3 highest-paid employees).
11. Given nested order data, find the customer who has spent the most in total across
    all their orders.
12. Build a report object combining multiple aggregations at once (total revenue, order
    count, average order value) from one array of orders.

## Interview-style questions

13. What's a clean way to structure a "group by" operation using `.reduce()`?
14. Why is calculating multiple related aggregations (count, sum, average) often more
    efficient in ONE pass through the data using `.reduce()`, rather than three
    separate `.filter()`/`.map()` passes?
15. When dealing with nested data (orders containing items), what's the general
    two-step approach for problems that need to look "inside" every record?

## Notes

- These problems are intentionally similar to real analytics/reporting features —
  "group by," "top N," and "aggregate multiple metrics at once" are patterns you'll
  reuse constantly in real projects.
- Try solving a couple of these two different ways (chained `.filter().map()` vs a
  single `.reduce()`) and compare readability and performance mentally.
