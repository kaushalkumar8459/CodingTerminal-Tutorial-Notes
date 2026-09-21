# Day 064 — Classes (User, Product, Employee, Student)

Matches Tutorial Day 64 (OOP Introduction) — practice previews `class` syntax here,
ahead of Tutorial Day 66's full explanation. No limit on how many you build.

## Build these classes

1. `class User { constructor(name, email) { ... } }` with a method `getInfo()` that
   returns a formatted string.
2. `class Product { constructor(name, price) { ... } }` with a method
   `applyDiscount(percent)` that reduces the price.
3. `class Employee { constructor(name, department, salary) { ... } }` with a method
   `getAnnualSalary()`.
4. `class Student { constructor(name, marks) { ... } }` where `marks` is an object of
   subject-to-score pairs, with a method `getAverage()`.
5. Create 2-3 instances of each class using `new`, and call their methods.

## Concept

6. Add a method to `User` that checks equality with another `User` instance by email.
7. Add a method to `Product` that returns `true`/`false` for whether it's "expensive"
   (above some threshold).
8. Add a method to `Employee` that gives a raise (increases salary by a percentage).
9. Add a method to `Student` that returns their letter grade based on their average
   (reuse your Day 27 grading logic).
10. Create an array of 5 `Employee` instances, then use `.filter()`/`.sort()` on them
    just like you did with plain objects in Module 3 — confirm class instances work the
    same way with array methods.

## Interview-style questions

11. How does creating objects with a `class` compare to using a plain constructor
    function (Day 57) — does it feel meaningfully different, or mostly like syntax?
12. Why might it make sense to group `User`-related data and behavior into a `class`
    rather than a plain object literal?

## Notes

- `class` syntax will feel very similar to the constructor functions from Day 57 — that's
  intentional. Under the hood, they work almost identically (both rely on prototypes).
- Don't worry yet about private fields, static methods, or inheritance — those come in
  the next several days. Today is just getting comfortable with the basic shape.
