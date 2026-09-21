---
title: Polymorphism
slug: day-070-polymorphism
dayLabel: Day 70
level: Intermediate
estimatedMinutes: 25
order: 70
track: javascript
---

# Day 70 [Intermediate]: Polymorphism

## Goal

Formally understand polymorphism — how method overriding lets different objects respond to the same method call in their own way, and why this is powerful.

## Prerequisites

- Day 69 (extends/super), Day 69 practice (calculateSalary/Area/Payment)

## Explanation

**Polymorphism** ("many forms") means different classes can share a common method name (usually via inheritance), while each providing its OWN specific implementation of that method. Code that calls the method doesn't need to know or check which specific subclass it's dealing with — it just calls the method, and the correct behavior happens automatically based on the actual object's type.

This connects directly to what you practiced on Day 69: `processPayment()` calling `.calculatePayment()` on any `PaymentMethod` subclass, without an `if/else` chain checking "is this a CreditCardPayment? Is this a CashPayment?" — polymorphism eliminates that kind of type-checking entirely.

## Topic by Topic

### Topic 1: Method overriding as the mechanism for polymorphism

Theory:
Polymorphism is enabled by method overriding — each subclass defines its own version of an inherited method, replacing the parent's default behavior for that specific type.

Code Example:

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

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  calculateArea() {
    return this.side * this.side;
  }
}
```

**Explanation:** Both `Circle` and `Square` override `calculateArea()` with formulas specific to their own shape — this is the raw mechanism; the "polymorphism" happens in how this gets USED, shown next.

**Key Points:**

- Overriding a method is the technical mechanism that makes polymorphism possible.
- Each subclass's override completely replaces the parent's default for that specific type.
- This alone is just inheritance + overriding — polymorphism is about how it's leveraged.

### Topic 2: Calling the same method without knowing the specific type

Theory:
The real power of polymorphism shows up when you write code that calls a method on a general "type" (like `Shape`), without checking which SPECIFIC subclass each object actually is.

Code Example:

```js
const shapes = [new Circle(5), new Square(4)];

shapes.forEach((shape) => {
  console.log(shape.calculateArea()); // works correctly for EACH shape, automatically
});
```

**Explanation:** This loop never checks "is this a Circle or a Square?" — it simply calls `.calculateArea()` on each item, and each object automatically runs its own correct version.

**Key Points:**

- Polymorphic code doesn't need `if (shape instanceof Circle) { ... } else if (...) { ... }` type-checking.
- Each object "knows" how to respond correctly to the same method call.
- This dramatically simplifies code that needs to work with many different related types.

### Topic 3: Avoiding brittle type-checking

Theory:
Without polymorphism, you'd need explicit type checks for every new subclass added — polymorphism avoids this entirely, since each subclass handles its own behavior.

Code Example:

```js
// WITHOUT polymorphism - brittle, needs updating for every new shape type
function getAreaBad(shape) {
  if (shape.type === "circle") return Math.PI * shape.radius ** 2;
  if (shape.type === "square") return shape.side * shape.side;
  // must add a new "if" for every new shape type added later!
}

// WITH polymorphism - never needs updating for new shape types
function getAreaGood(shape) {
  return shape.calculateArea(); // works for ANY shape subclass, forever
}
```

**Explanation:** `getAreaGood` never needs to change, even if you add a `Triangle` or `Pentagon` class later — as long as each new shape correctly implements `calculateArea()`, everything just works.

**Key Points:**

- Polymorphic code is more maintainable — adding new subclasses doesn't require modifying existing code.
- Type-checking chains (`if (x.type === "...")`) are a common sign that polymorphism could simplify the code.
- This principle scales especially well as a codebase grows with more related object types.

### Topic 4: Polymorphism in real applications

Theory:
Polymorphism shows up constantly in real systems — payment methods, notification types, UI components, and more, all sharing common method names with type-specific implementations.

Practical:
Whenever you have several related "kinds" of something that all need to respond to the same action (calculate, render, process, validate), consider whether a shared parent class with overridden methods would simplify your code — this is exactly the design behind the payment system you built on Day 69.

**Key Points:**

- Polymorphism is a design tool, not just an abstract concept — reach for it when you notice repeated type-checking logic.
- The payment/shape examples from today and Day 69 are realistic, common real-world applications of the idea.
- Recognizing this pattern will help you design cleaner class hierarchies going forward.

## Recap

- Polymorphism means different subclasses respond to the same method call, each with its own implementation.
- Code that calls the shared method doesn't need to check which specific subclass it's dealing with.
- This avoids brittle type-checking chains and makes adding new subclasses easier without touching existing code.

## What's Next

Practice for today: `public/coding/JavaScript/day-070-composition.md`. Day 71 covers abstraction as an OOP principle.
