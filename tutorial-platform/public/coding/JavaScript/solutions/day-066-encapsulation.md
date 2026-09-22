# Day 066 — Solution: Encapsulation

```js
class BankAccount {
  #balance;
  #transactions = [];
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
  #logTransaction(type, amount) {
    this.#transactions.push({ type, amount });
  }
  getBalance() {
    return this.#balance;
  }
  deposit(amount) {
    if (typeof amount !== "number" || amount <= 0) return false;
    this.#balance += amount;
    this.#logTransaction("deposit", amount);
    return true;
  }
  withdraw(amount) {
    if (typeof amount !== "number" || amount <= 0 || amount > this.#balance)
      return false;
    this.#balance -= amount;
    this.#logTransaction("withdraw", amount);
    return true;
  }
}

class User {
  #password;
  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }
  checkPassword(attempt) {
    return attempt === this.#password;
  }
}

class Employee {
  #salary;
  constructor(salary) {
    this.#salary = salary;
  }
  getMonthlySalary() {
    return this.#salary / 12;
  }
}

const account = new BankAccount(100);
account.deposit(25);
console.log(account.getBalance());
// account.#balance is a syntax error outside the class and cannot be accessed.
const user = new User("asha", "secret");
console.log(user.checkPassword("secret"));
console.log(Object.keys(user)); // ["username"]
```

## Interview-style questions

**9.** `_balance` is only a naming convention and remains accessible. `#balance` is enforced by the language and cannot be accessed outside the declaring class.

**10.** A private helper keeps repeated validation or bookkeeping internal and prevents callers from bypassing the intended public API.

**11.** Accessing a private field outside its class is a hard syntax or runtime error, not merely an inaccessible `undefined` property.
