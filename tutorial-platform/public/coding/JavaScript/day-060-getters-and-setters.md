# Day 060 — Getters & Setters (BankAccount, User, Employee, Product)

Matches Tutorial Day 60 (Prototype Introduction) — practice previews getters/setters
here, ahead of Tutorial Day 62's deeper coverage. No limit on how many you build.

## Basic

1. Create an object with a `get fullName()` getter that combines `firstName` and
   `lastName` properties.
2. Create an object with a `set fullName(value)` setter that splits a full name string
   back into `firstName`/`lastName`.
3. Create a `BankAccount`-like object with a `get balance()` getter and a `set balance(value)`
   setter that REJECTS negative values (log a warning instead of setting it).
4. Create a `User` object with a `get isAdult()` getter computed from an `age` property.
5. Create a `Product` object with a `get discountedPrice()` getter computed from `price`
   and a fixed `discountPercent`.

## Concept

6. Build an `Employee` object where `set salary(value)` validates that the value is a
   positive number before accepting it, otherwise logs an error and leaves the salary
   unchanged.
7. Build a `BankAccount` object where `deposit`/`withdraw` are regular methods, but the
   balance itself is only readable via a getter (no direct external `balance =` assignment
   allowed — enforce this with a setter that always rejects direct changes, or by using
   a differently-named internal property).
8. Add a getter to a `Product` object that returns a formatted price string (e.g.
   `"$499.99"`) computed from a raw numeric `price` property.
9. Build a `User` object where updating a `set email(value)` setter automatically
   lowercases and trims the value before storing it.

## Interview-style questions

10. What's the practical benefit of a getter over just accessing a plain property
    directly?
11. Why might a setter be useful for VALIDATING data before it's actually stored?
12. How do getters/setters relate to what you'll build with private class fields
    starting Day 66 (just a conceptual comparison for now)?

## Notes

- Getters/setters look like plain properties when USED (`obj.balance`, not
  `obj.balance()`) but behave like functions internally — that's the whole point of
  their design.
- These patterns become much cleaner once combined with classes (Day 60 uses plain
  objects; Day 66+ will show the equivalent with `class` syntax).
