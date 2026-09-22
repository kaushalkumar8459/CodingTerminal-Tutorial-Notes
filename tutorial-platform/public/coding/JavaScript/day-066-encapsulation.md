# Day 066 — Encapsulation (Private Fields #balance, #password, #salary)

Matches Tutorial Day 66 (JavaScript Classes). No limit on how many you build.

## Basic

1. Create a `class BankAccount` with a truly private field `#balance` (using the `#`
   syntax), accessible only via `getBalance()`/`deposit()`/`withdraw()` methods.
2. Try accessing `account.#balance` directly from outside the class and confirm it
   throws a syntax/reference error.
3. Create a `class User` with a private field `#password`, and a public method
   `checkPassword(attempt)` that compares it without ever exposing the real password.
4. Create a `class Employee` with a private field `#salary`, exposed only through a
   `getMonthlySalary()` method that calculates `salary / 12`.

## Concept

5. Add validation inside `BankAccount`'s `deposit()`/`withdraw()` methods that rejects
   invalid amounts (negative, zero, or non-numeric).
6. Add a private HELPER method (also using `#`, e.g. `#logTransaction()`) that's only
   callable from within the class itself, used internally by `deposit()`/`withdraw()`.
7. Compare this `#field` private syntax to the closure-based privacy pattern from Day 53
   (`createBankAccount()`) — which do you think is clearer, and are there situations
   where you'd prefer one over the other?
8. Create a `class User` with both a private `#password` AND a public `username`, and
   confirm `Object.keys(userInstance)` only shows `username`, not `#password`.

## Interview-style questions

9. What's the practical difference between a "private by convention" property
   (like `_balance`, from Day 62) and a truly private `#balance` field?
10. Why might you want a private HELPER method (not just private data) inside a class?
11. What happens if you try to access a `#privateField` from OUTSIDE the class it's
    defined in — is it just hidden, or does it actually error?

## Notes

- `#field` privacy is enforced by the JavaScript engine itself — it's not just a naming
  convention like `_field` was. Attempting outside access is a hard error, not just
  "impolite."
- This is the direct, modern successor to the closure-based privacy pattern from Day 53 —
  both achieve genuine privacy, but with very different syntax and mental models.
