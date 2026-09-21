---
title: Composition In Depth
slug: day-072-composition-in-depth
dayLabel: Day 72
level: Intermediate
estimatedMinutes: 25
order: 72
track: javascript
---

# Day 72 [Intermediate]: Composition In Depth

## Goal

Deepen the Day 70 preview of composition — understanding "composition over inheritance" and building flexible objects from smaller, reusable pieces.

## Prerequisites

- Day 69–70 (inheritance, polymorphism), Day 70 practice (composition preview)

## Explanation

**Composition** means building complex objects by combining ("composing") smaller, focused objects together, rather than through inheritance hierarchies. The common guideline "favor composition over inheritance" reflects a real, practical concern: deep inheritance chains can become rigid and hard to change — a change to a base class can unexpectedly ripple through many descendants. Composition tends to be more flexible, since pieces can be mixed, matched, and replaced independently.

The key question when designing relationships: is this an "is-a" relationship (inheritance fits — a `Dog` IS-A `Animal`), or a "has-a"/"uses-a" relationship (composition fits — an `Order` HAS-A `Payment`, a `Car` HAS-AN `Engine`)?

## Topic by Topic

### Topic 1: Composition vs inheritance — choosing correctly

Theory:
Ask "is this an IS-A relationship, or a HAS-A relationship?" to decide between inheritance and composition for a given design.

Code Example:

```js
// IS-A relationship - inheritance fits
class Animal {
  /* ... */
}
class Dog extends Animal {
  /* ... */
}

// HAS-A relationship - composition fits
class Engine {
  start() {
    console.log("Engine started");
  }
}
class Car {
  constructor() {
    this.engine = new Engine(); // Car HAS-A Engine, it isn't "a type of" Engine
  }
  start() {
    this.engine.start();
  }
}
```

**Explanation:** `Dog` genuinely IS a specific kind of `Animal` (inheritance fits naturally); a `Car` isn't "a type of" `Engine` — it merely CONTAINS/USES one, so composition is the better fit.

**Key Points:**

- IS-A relationships (a specific kind of something) fit inheritance well.
- HAS-A relationships (contains or uses something) fit composition well.
- Misusing inheritance for a HAS-A relationship (e.g. `Car extends Engine`) usually leads to confusing, unnatural designs.

### Topic 2: Building flexible objects from smaller pieces

Theory:
Composition lets you build a complex object's behavior by combining multiple smaller, focused objects — each responsible for one specific concern.

Code Example:

```js
class Logger {
  log(message) {
    console.log(`[LOG] ${message}`);
  }
}

class Validator {
  isValidAmount(amount) {
    return amount > 0;
  }
}

class PaymentProcessor {
  constructor() {
    this.logger = new Logger();
    this.validator = new Validator();
  }

  process(amount) {
    if (!this.validator.isValidAmount(amount)) {
      this.logger.log("Invalid amount");
      return;
    }
    this.logger.log(`Processing payment of ${amount}`);
  }
}
```

**Explanation:** `PaymentProcessor` doesn't implement logging or validation itself — it delegates those specific responsibilities to separate, focused `Logger` and `Validator` objects, composed together.

**Key Points:**

- Each composed piece (`Logger`, `Validator`) has one focused responsibility.
- `PaymentProcessor` combines these pieces rather than inheriting their behavior.
- This makes each piece independently testable and reusable in other classes too.

### Topic 3: Swapping composed pieces flexibly

Theory:
Since composed objects are just properties, they can be swapped out for different implementations without changing the containing class's structure.

Code Example:

```js
class ConsoleLogger {
  log(message) {
    console.log(message);
  }
}

class SilentLogger {
  log(message) {
    /* does nothing - useful for tests */
  }
}

class Service {
  constructor(logger) {
    this.logger = logger; // composed piece, injected from outside
  }
  doWork() {
    this.logger.log("Work done");
  }
}

const realService = new Service(new ConsoleLogger());
const testService = new Service(new SilentLogger());
```

**Explanation:** `Service` doesn't care WHICH specific logger it receives, as long as it has a `.log()` method — this flexibility (called "dependency injection") is a natural benefit of composition.

**Key Points:**

- Composed pieces can be swapped freely, as long as they support the same expected methods.
- This flexibility is much harder to achieve with rigid inheritance hierarchies.
- This pattern (passing dependencies into a constructor) is widely used in real-world application architecture.

### Topic 4: "Favor composition over inheritance" — a practical guideline

Theory:
This doesn't mean "never use inheritance" — it means default to composition unless there's a genuinely clear, stable IS-A relationship that benefits from it.

Practical:
When you're unsure whether to use inheritance or composition for a new class relationship, composition is usually the safer starting choice — it's easier to combine/replace pieces later than to untangle a rigid inheritance chain.

**Key Points:**

- Inheritance is still valuable for genuine IS-A relationships (like the shapes/payment examples from Day 69-70).
- Composition is generally more flexible for combining behaviors that don't have a natural "is-a" relationship.
- Real-world, well-designed systems typically use BOTH, applied to the situations where each fits best.

## Recap

- Composition builds complex objects from smaller, focused pieces combined together, rather than through inheritance.
- IS-A relationships fit inheritance; HAS-A/uses-A relationships fit composition.
- Composition offers more flexibility — composed pieces can be swapped or replaced independently.

## What's Next

Practice for today: `public/coding/JavaScript/day-072-set.md`. Day 73 is the Module 5 OOP project — Bank Account / Shopping Cart System.
