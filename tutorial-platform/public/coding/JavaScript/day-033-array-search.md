# Day 033 — Array Search (includes, indexOf, find, findIndex)

Matches Tutorial Day 33 (Arrays Fundamentals). No limit on how many you solve.

## Basic

1. Use `.includes()` to check if a number exists in an array.
2. Use `.indexOf()` to find the position of a value in an array.
3. Use `.indexOf()` on a value that doesn't exist, and note the result (`-1`).
4. Use `.find()` to get the first number in an array greater than 50.
5. Use `.findIndex()` to get the position of the first number greater than 50.

## Concept

6. Given an array of user objects (`{id, name}`), use `.find()` to find a user by `id`.
7. Given an array of product objects (`{name, price}`), use `.find()` to find a product by name.
8. Use `.findIndex()` to locate an employee object by `id` in an array of employees.
9. Find the first even number in an array using `.find()`.
10. Check whether an array of strings `.includes()` a specific case-sensitive value.
11. Use `.lastIndexOf()` to find the LAST position of a repeated value in an array.
12. Write a function `findUserById(users, id)` that returns the matching user object, or
    `undefined` if not found — handle the "not found" case explicitly.
13. Given an array of objects, use `.find()` combined with multiple conditions (e.g. find
    a product that's both `inStock: true` AND `price < 500`).

## Interview-style questions

14. What's the difference between `.indexOf()` and `.find()` — in terms of what they
    search for and what they return?
15. What does `.find()` return when nothing matches?
16. When would `.includes()` be a better choice than `.indexOf()` for a simple existence
    check?

## Notes

- `.find()`/`.findIndex()` accept a **callback function** (a small function you provide)
  describing what to search for — this is your first real taste of the array-method
  style you'll use constantly starting tomorrow (`forEach`, `map`, `filter`, `reduce`).
- `.includes()`/`.indexOf()` work well for simple values; `.find()`/`.findIndex()` are
  needed once you're searching arrays of objects.
