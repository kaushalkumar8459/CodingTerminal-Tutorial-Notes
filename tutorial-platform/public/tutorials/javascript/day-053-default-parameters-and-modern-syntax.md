---
title: Default Parameters and Modern Syntax
slug: day-053-default-parameters-and-modern-syntax
dayLabel: Day 53
level: Intermediate
estimatedMinutes: 25
order: 53
track: javascript
---

# Day 53 [Intermediate]: Default Parameters and Modern Syntax

## Goal

Revisit default parameters in more depth, and consolidate the modern object syntax features (template literals, shorthand, computed properties) covered across earlier days.

## Prerequisites

- Day 11 (default parameters intro), Day 42 (shorthand/computed properties)

## Explanation

Today combines a deeper look at default parameters with a full recap of "modern JavaScript syntax" conveniences you've picked up across Modules 1–4: template literals for string building, enhanced object literals (property/method shorthand), and computed properties. Together, these features make everyday JavaScript noticeably shorter and more expressive compared to older styles.

## Topic by Topic

### Topic 1: Default parameters in depth

Theory:
Default parameters can reference earlier parameters in the same function, and can even be the result of a function call, not just a fixed value.

Code Example:

```js
function createOrder(item, price, tax = price * 0.18) {
  return { item, price, tax, total: price + tax };
}

console.log(createOrder("Book", 500));
// { item: "Book", price: 500, tax: 90, total: 590 }
```

**Explanation:** The default for `tax` is computed from `price`, another parameter — defaults aren't limited to plain fixed values; they can be full expressions evaluated at call time.

**Key Points:**

- A default parameter's expression can reference earlier parameters in the same list.
- Defaults are only evaluated when the argument is actually missing/`undefined`.
- This makes functions with "smart" fallbacks possible, without extra `if` checks inside the body.

### Topic 2: Template literals recap

Theory:
Template literals (from Day 28) remain the standard way to build dynamic strings — worth revisiting here since they combine so naturally with everything else covered in Module 4.

Code Example:

```js
function formatReceipt(item, price, tax) {
  return `Item: ${item}\nPrice: $${price}\nTax: $${tax}\nTotal: $${price + tax}`;
}

console.log(formatReceipt("Book", 500, 90));
```

**Explanation:** Template literals handle both variable embedding and multi-line text in one clean syntax — far cleaner than manual string concatenation with `+`.

**Key Points:**

- Prefer template literals over `+` concatenation for any non-trivial string building.
- `${expression}` can hold full expressions, including function calls.
- Multi-line strings work naturally, without special escape characters.

### Topic 3: Enhanced object literals (shorthand recap)

Theory:
Property shorthand, method shorthand, and computed properties (all from Day 42) combine to make object creation noticeably terser.

Code Example:

```js
function createProduct(name, price) {
  const discountRate = 0.1;

  return {
    name, // property shorthand
    price, // property shorthand
    [`${name}Discount`]: price * discountRate, // computed property name
    describe() {
      // method shorthand
      return `${name}: $${price}`;
    },
  };
}

console.log(createProduct("Pen", 50));
```

**Explanation:** All three modern syntax features combine naturally in one object literal — shorthand properties, a computed property name built from a template literal, and a shorthand method — producing compact, readable code.

**Key Points:**

- Property shorthand, method shorthand, and computed properties often appear together in real code.
- These are purely syntax conveniences — the resulting objects behave identically to the "old" verbose syntax.
- Getting comfortable combining these makes reading modern JavaScript (and frameworks like React) much easier.

### Topic 4: Bringing it together — a practical example

Theory:
Combining default parameters, template literals, and enhanced object literals produces clean, self-contained "factory" functions — functions whose whole job is to build and return objects.

Code Example:

```js
function createUser(name, role = "member") {
  return {
    name,
    role,
    displayName: `${name} (${role})`,
    isAdmin: role === "admin",
  };
}

console.log(createUser("Zoya"));
console.log(createUser("Rehan", "admin"));
```

**Explanation:** This "factory function" pattern — take some inputs, apply sensible defaults, and return a fully-formed object — is one of the most common everyday JavaScript patterns you'll write from here on.

**Key Points:**

- Factory functions (functions that build and return objects) benefit heavily from default parameters and shorthand syntax together.
- This pattern will reappear constantly — in constructor functions (Day 65), classes (Day 66), and beyond.
- Practicing combining these small features together is more valuable than knowing each one in isolation.

## Recap

- Default parameters can reference earlier parameters or use computed expressions.
- Template literals remain the standard for dynamic string building.
- Property/method shorthand and computed properties combine to make object creation concise and expressive.

## What's Next

Practice for today: `public/coding/JavaScript/day-053-closures.md`. Day 54 covers optional chaining and nullish coalescing in more advanced scenarios.
