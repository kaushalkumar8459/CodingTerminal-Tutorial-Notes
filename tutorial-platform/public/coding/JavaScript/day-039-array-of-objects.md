# Day 039 — Array of Objects

Matches Tutorial Day 39 (The reduce Method). Practice with realistic datasets (users,
products, employees, students, orders) — no limit on how many you solve.

Suggested starter datasets (define these yourself at the top of your file):

- `users`: `{id, name, age, isActive}`
- `products`: `{id, name, price, category, inStock}`
- `employees`: `{id, name, department, salary}`
- `students`: `{id, name, marks: {math, science, english}}`
- `orders`: `{id, userId, items: [{name, price, quantity}], status}`

## Basic

1. Find a specific user by `id` using `.find()`.
2. Filter products to only those in a specific category.
3. Sort employees by salary, ascending.
4. Map students to just their names.
5. Reduce orders to calculate the total revenue across all orders.

## Concept

6. Group employees by department (an object where each key is a department, value is an
   array of employees).
7. Find the average marks per subject across all students.
8. Filter orders to only `"completed"` status, then calculate their combined total.
9. Sort products by price, then by name for products with the same price (two-level sort).
10. Find the top 3 highest-paid employees.
11. Count how many users are active vs inactive.
12. For each student, calculate their average mark across all subjects, and add a `grade`
    field based on that average.
13. Find all products that are both `inStock` AND under a given price.
14. Build a lookup object mapping `userId` to that user's full order history.
15. Calculate the total quantity of items sold across all orders (looping into each
    order's `items` array).

## Interview-style questions

16. When working with a realistic dataset like this, how do you decide whether to use
    `.map()`, `.filter()`, or `.reduce()` for a given task?
17. What's the benefit of chaining `.filter().map()` vs writing one big `.reduce()` that
    does everything at once?
18. Why might grouping data (like employees by department) be more naturally expressed
    with `.reduce()` than `.map()` or `.filter()` alone?

## Notes

- This day is intentionally open-ended — treat these datasets like a personal sandbox
  and invent additional questions about them beyond the ones listed.
- Real interview and job tasks look almost exactly like this — practicing with realistic,
  multi-field objects (not just plain number arrays) is valuable.
