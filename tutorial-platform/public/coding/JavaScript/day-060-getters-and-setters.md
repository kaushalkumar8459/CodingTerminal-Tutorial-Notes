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

<!-- codingterminal-solution:start -->

# Day 060 — Solution: Getters & Setters

```js
const person = {
  firstName: "Asha",
  lastName: "Sharma",
  get fullName() { return `${this.firstName} ${this.lastName}`; },
  set fullName(value) { [this.firstName, this.lastName] = value.split(" "); }
};
console.log(person.fullName);
person.fullName = "Ben Stone";

const account = {
  _balance: 100,
  get balance() { return this._balance; },
  set balance(value) { if (value >= 0) this._balance = value; else console.warn("Balance cannot be negative"); }
};

const user = { age: 21, get isAdult() { return this.age >= 18; } };
const product = { price: 100, discountPercent: 10, get discountedPrice() { return this.price * (1 - this.discountPercent / 100); }, get formattedPrice() { return `$${this.price.toFixed(2)}`; } };
```

**6. Validated salary**

```js
const employee = {
  _salary: 5000,
  get salary() { return this._salary; },
  set salary(value) { if (typeof value === "number" && value > 0) this._salary = value; else console.error("Salary must be positive"); }
};
```

**7. Controlled bank account**

```js
const bankAccount = {
  _balance: 100,
  get balance() { return this._balance; },
  set balance(_) { console.warn("Use deposit or withdraw"); },
  deposit(amount) { if (amount > 0) this._balance += amount; },
  withdraw(amount) { if (amount > 0 && amount <= this._balance) this._balance -= amount; }
};
```

**8.** The `formattedPrice` getter above returns a display-ready string while keeping the raw numeric `price` available for calculations.

**9. Lowercase and trim email**

```js
const emailUser = {
  _email: "",
  get email() { return this._email; },
  set email(value) { this._email = value.trim().toLowerCase(); }
};
emailUser.email = "  USER@EXAMPLE.COM ";
```

## Interview-style questions

**10.** A getter can calculate or format a value while preserving property-style use, such as `product.discountedPrice`.

**11.** A setter creates one controlled place to validate or normalize data before storing it.

**12.** Getters/setters control access to state. Private class fields strengthen that idea by hiding storage from outside code, while methods can expose controlled operations.

<!-- codingterminal-solution:end -->

