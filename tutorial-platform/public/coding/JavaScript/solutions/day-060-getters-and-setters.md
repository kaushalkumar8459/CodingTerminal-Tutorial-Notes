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
