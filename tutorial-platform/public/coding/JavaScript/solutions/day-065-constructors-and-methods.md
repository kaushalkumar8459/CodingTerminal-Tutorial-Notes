# Day 065 — Solution: Bank Account System

```js
function BankAccount(owner, initialBalance) {
  this.owner = owner;
  this.balance = initialBalance;
  this.transactionHistory = [];
}

BankAccount.prototype.deposit = function (amount) {
  if (typeof amount !== "number" || amount <= 0) return false;
  this.balance += amount;
  this.transactionHistory.push({ type: "deposit", amount });
  return true;
};

BankAccount.prototype.withdraw = function (amount) {
  if (typeof amount !== "number" || amount <= 0 || amount > this.balance)
    return false;
  this.balance -= amount;
  this.transactionHistory.push({ type: "withdraw", amount });
  return true;
};

BankAccount.prototype.getBalance = function () {
  return this.balance;
};
BankAccount.prototype.transferTo = function (other, amount) {
  if (!this.withdraw(amount)) return false;
  other.deposit(amount);
  return true;
};
BankAccount.prototype.getStatement = function () {
  const lines = this.transactionHistory.map(
    (item) => `${item.type}: $${item.amount.toFixed(2)}`,
  );
  return `${this.owner}\n${lines.join("\n")}\nBalance: $${this.balance.toFixed(2)}`;
};

function richestAccount(accounts) {
  return accounts.reduce((best, account) =>
    account.balance > best.balance ? account : best,
  );
}
const first = new BankAccount("Asha", 100);
const second = new BankAccount("Ben", 50);
const third = new BankAccount("Maya", 200);
first.deposit(25);
first.transferTo(second, 40);
second.withdraw(10);
console.log(first.getStatement(), richestAccount([first, second, third]).owner);
```

## Interview-style questions

**10.** Prototype methods are shared by every instance, so one function is reused instead of allocating a new function for every account.

**11.** Without `new`, the constructor does not receive a fresh instance as `this`; strict mode throws or non-strict code may write to the wrong object.
