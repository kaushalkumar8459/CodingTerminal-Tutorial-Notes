# Day 057 — Solution: Constructor Functions

```js
function User(name, email) { this.name = name; this.email = email; }
const userA = new User("Asha", "asha@example.com");
const userB = new User("Ben", "ben@example.com");

function Product(name, price) { this.name = name; this.price = price; }
Product.prototype.describe = function () { return `${this.name}: $${this.price}`; };
Product.prototype.isMoreExpensiveThan = function (other) { return this.price > other.price; };

function Employee(name, department, salary) { this.name = name; this.department = department; this.salary = salary; }
Employee.prototype.getAnnualSalary = function () { return this.salary * 12; };

function BankAccount(owner, balance) {
  this.owner = owner;
  this.balance = balance;
  this.deposit = (amount) => { this.balance += amount; };
  this.withdraw = (amount) => { if (amount <= this.balance) this.balance -= amount; };
}

const laptop = new Product("Laptop", 1000);
console.log(laptop.describe());
console.log(typeof userA, userA instanceof User);
```

**8. Closure alternative**

```js
function createBankAccount(owner, initialBalance) {
  let balance = initialBalance;
  return { owner, deposit: (amount) => balance += amount, getBalance: () => balance };
}
```

**9. Without `new`:** In strict mode, `this` is `undefined` and property assignment throws. In non-strict mode it may write properties to the global object and return `undefined`, which is dangerous.

## Interview-style questions

**10.** `new` creates a fresh object, connects it to the constructor's prototype, calls the constructor with that object as `this`, and returns the object.

**11.** Without `new`, the constructor does not receive a fresh instance as `this`.

**12.** A closure factory hides state in a function scope. A constructor stores instance properties on objects and commonly shares methods through a prototype.
