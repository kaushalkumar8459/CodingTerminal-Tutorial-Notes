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
