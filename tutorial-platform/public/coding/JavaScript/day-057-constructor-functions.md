# Day 057 — Constructor Functions (User, Product, Employee, BankAccount)

Matches Tutorial Day 57 (Closures In Depth) — practice previews constructor functions
here, ahead of Tutorial Day 65's full explanation. No limit on how many you build.

## Build these constructor functions

1. `function User(name, email) { this.name = name; this.email = email; }` — then
   create 2-3 instances using `new User(...)`.
2. `function Product(name, price) { ... }` with a method `describe()` added to
   `Product.prototype` (don't worry yet about why prototype — that's Day 58-59) that
   returns a formatted string.
3. `function Employee(name, department, salary) { ... }` with a method
   `getAnnualSalary()` that returns `salary * 12`.
4. `function BankAccount(owner, balance) { ... }` with methods `deposit(amount)` and
   `withdraw(amount)` added via the constructor itself (as `this.deposit = function(){}`)
   — compare this approach to the closure-based bank account from Day 53/57.

## Concept

5. Create 3 `User` instances and confirm each one has its own independent `name`/`email`
   (not shared).
6. Add a method to `Product` that checks if the current instance's price is greater than
   a given `Product` passed as an argument (comparing two instances of the same
   constructor).
7. Use `console.log(typeof someUser)` and `console.log(someUser instanceof User)` to
   explore what `new` actually produces.
8. Compare creating the SAME `BankAccount` behavior two ways: (a) with a constructor
   function like today, and (b) with a closure-based factory function like Day 53 —
   which feels more natural to you right now, and why?
9. Try calling one of your constructor functions WITHOUT `new` (e.g. `User("A", "b@x.com")`
   instead of `new User(...)`) and observe what goes wrong.

## Interview-style questions

10. What does the `new` keyword actually do when calling a constructor function (in
    your own words, even if it's a partial understanding for now — Day 65 will complete it)?
11. Why does forgetting `new` when calling a constructor function cause problems?
12. What's the practical difference between the closure-based `createBankAccount()`
    (Day 53) and this constructor-function-based `BankAccount`?

## Notes

- Don't worry about fully understanding `new`, `this`, and prototypes yet — today is
  about getting hands-on practice with the SYNTAX and behavior, before Days 58-59-65
  explain the mechanics in full.
- Comparing the closure approach vs the constructor approach for the same problem
  (bank account) is a great way to start building intuition for OOP, coming up in Module 5.
