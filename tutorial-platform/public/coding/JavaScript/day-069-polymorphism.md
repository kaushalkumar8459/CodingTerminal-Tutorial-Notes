# Day 069 — Polymorphism (calculateSalary, calculateArea, calculatePayment)

Matches Tutorial Day 69 (Inheritance with extends and super). No limit on how many you build.

## Basic

1. Create a base `class Shape` with a method `calculateArea()` that returns `0` by
   default (meant to be overridden).
2. Create `class Circle extends Shape` that overrides `calculateArea()` using
   `Math.PI * radius ** 2`.
3. Create `class Rectangle extends Shape` that overrides `calculateArea()` using
   `length * width`.
4. Create `class Triangle extends Shape` that overrides `calculateArea()` using
   `0.5 * base * height`.
5. Create an array containing one instance of each shape, and loop through calling
   `.calculateArea()` on each — notice each uses its own correct formula automatically.

## Concept

6. Create a base `class Employee` with a method `calculateSalary()` returning a basic
   fixed calculation.
7. Create `class Manager extends Employee` and `class Intern extends Employee`, each
   overriding `calculateSalary()` with their own specific formula (e.g. manager gets a
   bonus, intern gets a stipend).
8. Create a base `class PaymentMethod` with a method `calculatePayment(amount)`.
9. Create `class CreditCardPayment extends PaymentMethod` and
   `class CashPayment extends PaymentMethod`, each overriding `calculatePayment` (e.g.
   credit card adds a small processing fee, cash doesn't).
10. Write a function `processPayment(paymentMethodInstance, amount)` that calls
    `.calculatePayment(amount)` WITHOUT knowing or caring which specific subclass it
    received — demonstrating polymorphism directly.

## Interview-style questions

11. What is polymorphism, in your own words, based on what you just built?
12. Why is it useful that `processPayment()` doesn't need to know which specific
    payment method class it's dealing with?
13. How does polymorphism rely on both inheritance (Day 69) and method overriding
    together?

## Notes

- The core idea: the SAME method call (`.calculateArea()`, `.calculatePayment()`)
  behaves differently depending on which specific subclass instance you're calling it
  on — that's polymorphism in action.
- This pattern is extremely common in real applications (payment processors, shape
  libraries, notification systems) — you're building genuinely realistic examples today.

<!-- codingterminal-solution:start -->

# Day 069 — Solution: Polymorphism

```js
class Shape {
  calculateArea() {
    return 0;
  }
}
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  calculateArea() {
    return Math.PI * this.radius ** 2;
  }
}
class Rectangle extends Shape {
  constructor(length, width) {
    super();
    this.length = length;
    this.width = width;
  }
  calculateArea() {
    return this.length * this.width;
  }
}
class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }
  calculateArea() {
    return 0.5 * this.base * this.height;
  }
}

const shapes = [new Circle(2), new Rectangle(4, 5), new Triangle(6, 3)];
shapes.forEach((shape) => console.log(shape.calculateArea()));
```

**6–7. Employee salary polymorphism**

```js
class Employee {
  calculateSalary() {
    return 3000;
  }
}
class Manager extends Employee {
  calculateSalary() {
    return super.calculateSalary() + 2000;
  }
}
class Intern extends Employee {
  calculateSalary() {
    return 1200;
  }
}
```

**8–10. Payment polymorphism**

```js
class PaymentMethod {
  calculatePayment(amount) {
    return amount;
  }
}
class CreditCardPayment extends PaymentMethod {
  calculatePayment(amount) {
    return amount * 1.03;
  }
}
class CashPayment extends PaymentMethod {
  calculatePayment(amount) {
    return amount;
  }
}
function processPayment(paymentMethodInstance, amount) {
  return paymentMethodInstance.calculatePayment(amount);
}
console.log(processPayment(new CreditCardPayment(), 100));
console.log(processPayment(new CashPayment(), 100));
```

## Interview-style questions

**11.** Polymorphism means the same method call can produce different behavior depending on the actual object receiving it.

**12.** `processPayment()` depends on the common method contract, not on every concrete payment class, so new payment types can be added without rewriting it.

**13.** Inheritance provides the shared interface and method lookup; overriding supplies each subclass's specialized behavior.

<!-- codingterminal-solution:end -->

