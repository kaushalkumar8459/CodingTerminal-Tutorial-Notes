# Day 067 — Solution: Employee Management System

```js
class Employee {
  static count = 0;
  #salary;
  #department;

  constructor(name, department, salary) {
    this.name = name;
    this.department = department;
    this.salary = salary;
    Employee.count++;
  }

  get salary() {
    return this.#salary;
  }
  set salary(value) {
    if (typeof value === "number" && value > 0) this.#salary = value;
    else console.error("Salary must be a positive number");
  }
  get department() {
    return this.#department;
  }
  set department(value) {
    if (typeof value === "string" && value.trim())
      this.#department = value.trim();
    else console.error("Department must be a non-empty string");
  }
  getAnnualSalary() {
    return this.#salary * 12;
  }
  get isSenior() {
    return this.getAnnualSalary() > 100000;
  }
  static compareBySalary(first, second) {
    return first.salary - second.salary;
  }
}

const employees = [
  new Employee("Asha", "IT", 9000),
  new Employee("Ben", "HR", 6000),
  new Employee("Maya", "IT", 11000),
  new Employee("Leo", "Sales", 7500),
  new Employee("Nia", "Finance", 8500),
];
employees.sort(Employee.compareBySalary);
employees[0].salary = -500; // logs an error; old value remains
console.log(
  Employee.count,
  employees.map((employee) => employee.salary),
);
```

## Interview-style questions

**11.** A getter/setter exposes a controlled public API while keeping storage private and validation centralized.

**12.** `Employee.count` belongs to the class and cannot be accidentally confused with unrelated global counters.

**13.** Keep data public when callers may freely use it, validate through a getter/setter when controlled updates are allowed, and use a private field with no getter when callers should never read it directly.
