# Day 065 — Constructors & Methods: Bank Account System

Matches Tutorial Day 65 (Constructor Functions Revisited). No limit on how far you extend
this project.

## Project: Bank Account System (constructor-function version)

Using ONLY constructor functions and prototype methods (no `class` syntax yet — that
starts tomorrow), build:

1. `BankAccount(owner, initialBalance)` constructor with instance properties `owner`,
   `balance`, and `transactionHistory` (an empty array to start).
2. `BankAccount.prototype.deposit(amount)` — increases balance, validates the amount is
   positive, and records the transaction in `transactionHistory`.
3. `BankAccount.prototype.withdraw(amount)` — decreases balance if sufficient funds
   exist, validates the amount, and records the transaction.
4. `BankAccount.prototype.getBalance()` — returns the current balance.
5. `BankAccount.prototype.getStatement()` — returns a formatted summary of all
   transactions plus the current balance.

## Concept

6. Add a `BankAccount.prototype.transferTo(otherAccount, amount)` method that withdraws
   from the current account and deposits into another `BankAccount` instance.
7. Create 3 `BankAccount` instances and perform several deposits/withdrawals/transfers
   between them, then print each one's final statement.
8. Add validation: `withdraw()` should refuse (and log an error) if the amount would
   make the balance negative.
9. Add a static-like helper function (not on the prototype, just a plain function) that
   takes an array of `BankAccount` instances and returns the one with the highest
   balance.

## Interview-style questions

10. Why are `deposit`/`withdraw`/`getBalance`/`getStatement` placed on
    `BankAccount.prototype` instead of being set with `this.deposit = function(){}`
    inside the constructor itself?
11. What would happen if you forgot `new` when creating a `BankAccount`? Try it and
    observe the actual error/behavior.

## Notes

- Keep this project's code around — tomorrow you'll rebuild the exact same system using
  `class` syntax, which makes for a great side-by-side comparison of the two approaches.
- Focus on correctness of the banking logic (validation, transaction history) as much as
  the constructor/prototype mechanics themselves.
