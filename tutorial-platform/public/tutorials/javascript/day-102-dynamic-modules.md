---
title: Dynamic Modules
slug: day-102-dynamic-modules
dayLabel: Day 102
level: Advanced
estimatedMinutes: 25
order: 102
track: javascript
---

# Day 102 [Advanced]: Dynamic Modules

## Goal

Learn dynamic `import()` for lazy loading — loading module code only when it's actually needed, rather than all upfront.

## Prerequisites

- Day 101 (ES Modules), Day 86 (async/await)

## Explanation

The `import { ... } from "./file.js"` syntax from Day 101 is **static** — it's resolved and loaded when the program STARTS, regardless of whether that code is actually used right away. **Dynamic `import()`** is different: it's a function call, returning a Promise, that loads a module ONLY when you actually call it — at any point in your code, conditionally, in response to user action, etc. This is called **lazy loading**, and it's a real performance technique used in production applications to avoid loading code the user might never actually need.

## Topic by Topic

### Topic 1: Static vs dynamic imports

Theory:
Static imports (`import ... from "..."`) must be at the top level of a file and load immediately. Dynamic `import()` is a function call that can happen ANYWHERE, loading the module only at that moment.

Code Example:

```js
// Static - loads immediately when this file loads, always
import { add } from "./math.js";

// Dynamic - loads ONLY when this line actually runs
async function loadMathModule() {
  const mathModule = await import("./math.js");
  console.log(mathModule.add(2, 3));
}
```

**Explanation:** `loadMathModule()`'s dynamic `import()` doesn't fetch/run `math.js` until this specific function is actually CALLED — if it's never called, `math.js` is never loaded at all, unlike the static import at the top.

**Key Points:**

- Static imports load unconditionally, immediately, at the top of a file.
- Dynamic `import()` is a function returning a Promise — loads only when actually called.
- This makes dynamic imports perfect for conditional or "only sometimes needed" code.

### Topic 2: Lazy loading — loading code on demand

Theory:
Lazy loading means delaying the loading of some code until it's ACTUALLY needed — commonly used for features not needed on initial page load (like a rarely-used settings panel or a heavy chart library).

Code Example:

```js
document
  .getElementById("openCalculator")
  .addEventListener("click", async () => {
    const calculatorModule = await import("./calculator.js");
    calculatorModule.openCalculator(); // only loaded once the button is actually clicked
  });
```

**Explanation:** `calculator.js` isn't loaded at all until the user actually clicks the button — if they never click it, that code is never fetched or executed, potentially saving load time for users who don't need that feature.

**Key Points:**

- Lazy loading defers loading code until it's genuinely needed.
- This is a real, production-used performance optimization technique, especially for large applications.
- Common candidates: rarely-used features, heavy libraries, or content behind a "click to expand" interaction.

### Topic 3: Working with the dynamic import's result

Theory:
`import()` returns a Promise that resolves to the module's exports object — access named exports as properties, or `.default` for the default export.

Code Example:

```js
async function useProductModule() {
  const module = await import("./product.js");
  const ProductClass = module.default; // access the default export explicitly
  const { TAX_RATE } = module; // destructure a named export

  const p = new ProductClass("Pen", 20);
  console.log(TAX_RATE);
}
```

**Explanation:** Unlike static imports (where `import Product, { TAX_RATE } from "..."` handles default/named exports automatically), a dynamic import's resolved value is a single object where the default export specifically lives under `.default`.

**Key Points:**

- The dynamic import's resolved value is an object containing all the module's exports.
- Access the default export via `.default`; named exports are direct properties.
- Destructuring works normally on this resolved object, just like any other object.

### Topic 4: When to use dynamic imports

Theory:
Dynamic imports add complexity (async handling) compared to static imports — reserve them for genuine cases where deferring load time provides real benefit.

Practical:
Good candidates: code behind a rarely-used button/feature, heavy libraries only needed in specific scenarios, or code that depends on a runtime condition (like loading a different module based on user preference). For most everyday code, static imports remain simpler and perfectly appropriate.

**Key Points:**

- Dynamic imports are a deliberate optimization tool, not a default replacement for static imports.
- Use them when there's a genuine, measurable benefit to deferring load time.
- Most code in most applications is fine with simple, static imports.

## Recap

- Dynamic `import()` loads a module on demand, returning a Promise, unlike static imports which load immediately.
- Lazy loading defers loading code until it's genuinely needed — a real performance technique.
- The resolved value from dynamic `import()` contains all exports; access the default via `.default`.

## What's Next

Practice for today: `public/coding/JavaScript/day-102-dynamic-import.md` — a lazy-loaded calculator module. Day 103 covers regular expressions in depth.
