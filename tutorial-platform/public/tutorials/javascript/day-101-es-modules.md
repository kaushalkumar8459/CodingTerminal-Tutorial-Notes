---
title: ES Modules
slug: day-101-es-modules
dayLabel: Day 101
level: Advanced
estimatedMinutes: 30
order: 101
track: javascript
---

# Day 101 [Advanced]: ES Modules

## Goal

Learn `export`/`import` — the standard way to organize JavaScript code across multiple files — including named and default exports.

## Prerequisites

- Module 3-5 (functions, classes — the things you'll actually be exporting)

## Explanation

Up until now, every day's practice has likely lived in one single file. Real projects split code across MULTIPLE files (**modules**) for organization — each module can **export** specific functions/values/classes it wants to make available, and other files can **import** exactly what they need. This keeps related code together, avoids one giant file, and makes dependencies between files explicit and traceable.

There are two kinds of exports: **named exports** (export multiple specific things by name) and a **default export** (one "main" thing per file, imported without needing to match an exact name).

## Topic by Topic

### Topic 1: Named exports

Theory:
`export` in front of a function/variable/class declaration makes it available to other files, by that SAME name.

Code Example:

```js
// math.js
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}
export const PI = 3.14159;
```

```js
// app.js
import { add, subtract, PI } from "./math.js";
console.log(add(2, 3)); // 5
```

**Explanation:** `math.js` exports three separate named things; `app.js` imports exactly the ones it needs, using curly braces and matching the exact names used in `math.js`.

**Key Points:**

- A file can have as many named exports as needed.
- Imports must use the EXACT same name (unless renamed with `as`, e.g. `import { add as sum }`).
- Named exports are ideal for utility files with multiple related functions (like `math.js` here).

### Topic 2: Default exports

Theory:
`export default` marks ONE main thing per file as the default export — imported WITHOUT curly braces, and the importing file can name it anything it wants.

Code Example:

```js
// user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}
```

```js
// app.js
import User from "./user.js"; // no curly braces, and the name doesn't have to match exactly
const u = new User("Zara");
```

**Explanation:** Since `User` is the default export, `app.js` can import it under ANY name it chooses (even `import Anything from "./user.js"` would work) — this is the key difference from named exports, which require exact name matching.

**Key Points:**

- Only ONE default export is allowed per file.
- Default exports are imported without curly braces, and can be named anything on import.
- Use default exports for files whose "main purpose" is one single thing (like one class or one main function).

### Topic 3: Combining named and default exports

Theory:
A single file can have BOTH a default export AND additional named exports at the same time.

Code Example:

```js
// product.js
export default class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

export const TAX_RATE = 0.18; // an additional named export
```

```js
// app.js
import Product, { TAX_RATE } from "./product.js";
```

**Explanation:** The import statement combines both styles in one line — `Product` (default, no braces) and `TAX_RATE` (named, in braces) — this is a common, valid pattern.

**Key Points:**

- A file can mix one default export with any number of named exports.
- The import statement combines both styles: `import Default, { named1, named2 } from "./file.js"`.
- Choose based on what makes sense for each specific file's purpose.

### Topic 4: Module scope

Theory:
Each module has its OWN scope — variables/functions NOT explicitly exported are entirely private to that file, invisible to any other file.

Code Example:

```js
// utils.js
const internalHelper = () => "only used inside this file"; // NOT exported - stays private

export function publicFunction() {
  return internalHelper(); // fine to use internally
}
```

```js
// app.js
import { publicFunction } from "./utils.js";
// internalHelper is completely inaccessible here - it was never exported
```

**Explanation:** `internalHelper` is used freely WITHIN `utils.js`, but is completely invisible to `app.js` — modules give you genuine, built-in encapsulation between files, without needing closures or classes for this specific purpose.

**Key Points:**

- Anything not explicitly exported is private to that module — genuinely inaccessible elsewhere.
- This module-level encapsulation reduces naming conflicts and hides implementation details between files.
- This scoping behavior is one of the biggest practical benefits of using modules at all.

## Recap

- `export`/`import` organize code across multiple files; named exports require exact names, default exports can be imported under any name.
- A file can combine one default export with multiple named exports.
- Each module has its own private scope — only explicitly exported things are accessible elsewhere.

## What's Next

Practice for today: `public/coding/JavaScript/day-101-es-modules.md` — build a small modular application. Day 102 covers dynamic imports and lazy loading.
