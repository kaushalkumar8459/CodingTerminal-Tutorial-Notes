# Day 064 — Solution: Classes

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  getInfo() {
    return `${this.name} <${this.email}>`;
  }
  sameEmail(other) {
    return this.email === other.email;
  }
}

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  applyDiscount(percent) {
    this.price *= 1 - percent / 100;
  }
  isExpensive(threshold) {
    return this.price > threshold;
  }
}

class Employee {
  constructor(name, department, salary) {
    this.name = name;
    this.department = department;
    this.salary = salary;
  }
  getAnnualSalary() {
    return this.salary * 12;
  }
  giveRaise(percent) {
    this.salary *= 1 + percent / 100;
  }
}

class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
  }
  getAverage() {
    return (
      Object.values(this.marks).reduce((sum, mark) => sum + mark, 0) /
      Object.keys(this.marks).length
    );
  }
  getGrade() {
    const average = this.getAverage();
    return average >= 90
      ? "A"
      : average >= 80
        ? "B"
        : average >= 70
          ? "C"
          : "D";
  }
}

const users = [
  new User("Asha", "asha@example.com"),
  new User("Ben", "ben@example.com"),
];
const products = [new Product("Book", 20), new Product("Laptop", 1000)];
const employees = [
  new Employee("Maya", "IT", 7000),
  new Employee("Leo", "HR", 6000),
];
const students = [new Student("Asha", { math: 90, science: 80 })];
const highPaid = employees
  .filter((employee) => employee.salary > 6500)
  .sort((a, b) => b.salary - a.salary);
```

## Interview-style questions

**11.** Classes provide clearer syntax for constructor functions and prototype methods, but instances still use prototypes underneath.

**12.** A class keeps related data and behavior together and gives every User instance the same readable API.
