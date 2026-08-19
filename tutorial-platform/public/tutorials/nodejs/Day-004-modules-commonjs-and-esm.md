---
title: Modules, CommonJS, and ESM
slug: day-004-modules-commonjs-and-esm
dayLabel: Day 4
level: Beginner
estimatedMinutes: 30
order: 4
track: nodejs
---
# Day 004 [Beginner]: Modules, CommonJS, and ESM

## Index

- Goal
- Prerequisites
- Explanation
- Topic by Topic
- Key Concepts
- Visual Concept Map
- End-to-End Practical
- Hands-on Coding
- Mini Exercise
- Assessment Quiz
- Task
- Self Check
- Interview Questions and Answers
- Day Outcome

## Goal

Understand Node module systems deeply and implement reusable code with both CommonJS and ESM patterns.

## Prerequisites

- Day 003 JavaScript refresher
- Comfortable with functions and file structure

## Explanation

Modules are the foundation of maintainable Node projects. You must know how exports/imports work, when to use CJS or ESM, and how to avoid interop mistakes.

## Topic by Topic

### Topic 1: Why Modules Matter

Theory:
Modules split code by responsibility and improve reuse/testing.

Practical:
Move utility logic into separate files and import where needed.

**Explanation:** Modules matter because they help break applications into smaller, organized, reusable files instead of one large script.

**Key Points:**

- Modules improve organization.
- They support reuse and separation of concerns.
- Good module boundaries make projects easier to scale.

### Topic 2: CommonJS vs ESM

Theory:
Node supports both systems with different syntax and behavior.
ESM behavior also depends on file extension or package.json type configuration.

Practical:
Create same feature in both module styles.

Comparison table:

| Area          | CommonJS                      | ESM                  |
| ------------- | ----------------------------- | -------------------- |
| Export        | module.exports                | export               |
| Import        | require()                     | import               |
| File default  | .js (classic Node)            | .mjs or type: module |
| Loading style | Synchronous require semantics | Static import graph  |

Configuration tip:

```json
{
  "type": "module"
}
```

**Explanation:** CommonJS and ESM are two module systems with different syntax and runtime behavior, and Node.js supports both with some caveats.

**Key Points:**

- Learn the syntax and behavior differences.
- Know which module system your project uses.
- Mixing systems carelessly can create confusion.

### Topic 3: Interop and Migration

Theory:
Mixed codebases need careful interoperability.

Practical:
Define migration strategy rather than ad-hoc mixing.

**Explanation:** Interop and migration matter because real projects often need to work across older CommonJS code and newer ESM code.

**Key Points:**

- Migration should be planned, not rushed.
- Interop has edge cases to understand.
- Consistency reduces module confusion.

### Topic 6: ESM Path Utilities and Runtime Differences

Theory:
`__dirname` and `__filename` are not available by default in ESM.

Practical:
Use URL utilities to resolve file paths in ESM modules.

**Explanation:** ESM path utilities and runtime differences are important because file path handling changes when moving away from CommonJS globals.

**Key Points:**

- ESM changes how some path utilities are accessed.
- Runtime differences affect imports and file handling.
- Know these differences before migrating code.

### Topic 4: Module Design Best Practices

Theory:
Expose small public APIs and hide internals.

Practical:
Use index files to control exports.

**Explanation:** Module design best practices help keep files focused, APIs stable, and dependencies understandable.

**Key Points:**

- Export clear, intentional module interfaces.
- Avoid mixing unrelated responsibilities.
- Design modules for maintainability.

### Topic 5: Real-world Pitfalls

Theory:
Circular dependencies and wrong default/named imports are common issues.

Practical:
Refactor to avoid circular import chains.

**Explanation:** Real-world pitfalls appear when module syntax, runtime assumptions, or file boundaries are misunderstood, so practical caution is essential.

**Key Points:**

- Watch for subtle module mismatches.
- Test imports and exports carefully.
- Learn common pitfalls early to save debugging time.

## Key Concepts

- Module boundaries and reuse
- CJS and ESM syntax/behavior differences
- package.json type and extension impact
- Migration and interoperability planning
- Export surface design
- ESM path handling patterns
- Circular dependency awareness

## Visual Concept Map

```mermaid
flowchart LR
  A[Feature File] --> B[Import Module]
  B --> C[Execute Exported Function]
  C --> D[Return Value]
```

## End-to-End Practical

1. Create utility and service modules.
2. Implement CJS version.
3. Implement ESM version.
4. Compare import/export behavior.
5. Refactor exports for cleaner public API.

## Hands-on Coding

### Example 1: Case - CommonJS Utility Module

Scenario:
Legacy Node codebase uses CommonJS.

```js
// math.cjs
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

```js
// app.cjs
const { add } = require("./math.cjs");
console.log(add(2, 3));
```

### Example 2: Case - ESM Service Module

Scenario:
New service adopts ESM for modern syntax.

```js
// formatter.mjs
export function toTitleCase(text) {
  return text
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}
```

```js
// app.mjs
import { toTitleCase } from "./formatter.mjs";
console.log(toTitleCase("node module systems"));
```

### Example 3: Case - Public API Barrel

Scenario:
Team wants one import path for shared helpers.

```js
// utils/index.mjs
export { toTitleCase } from "./formatter.mjs";
export { default as logger } from "./logger.mjs";
```

### Example 4: Case - ESM \_\_dirname Alternative

Scenario:
Need local file path resolution in an ESM module.

```js
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

## Mini Exercise

Scenario:
Build two small modules: priceCalculator and invoicePrinter. Implement first in CommonJS, then convert to ESM.

Expected output:

- Both versions run successfully
- Exports are clean and minimal
- Notes include one migration challenge and fix

## Assessment Quiz

### Quiz Questions

1. What is the main purpose of modules?
2. One syntax difference between CJS and ESM?
3. True or False: Circular dependencies can cause unpredictable behavior.
4. Why create public API index files?
5. What common runtime difference surprises teams after moving to ESM?

### Quiz Answers

1. Split and reuse code by responsibility.
2. require/module.exports vs import/export.
3. True.
4. To control and simplify what the module exposes.
5. `__dirname`/`__filename` are unavailable unless derived from import.meta.url.

## Task

- Implement one feature using CommonJS and ESM
- Refactor exports into a clean module API
- Complete mini exercise and quiz

## Self Check

- You can explain and use both module systems
- You can avoid common import/export pitfalls
- You can answer at least 4 out of 5 quiz questions

## Interview Questions and Answers

### Beginner

Question: What is a module in Node.js?

Answer: A separate file/unit of code that exports reusable functionality.

### Middle

Question: When would you keep CommonJS instead of switching immediately to ESM?

Answer: In legacy ecosystems where tooling/packages are tightly coupled to CommonJS.

### Advanced

Question: How do you prevent module architecture from becoming tangled?

Answer: Enforce dependency direction, reduce circular references, and maintain explicit public APIs.

## Day 004 Outcome

- You can implement and reason about CJS and ESM confidently
- You can design cleaner module APIs for maintainable codebases
- You are ready for npm and package workflows in Day 005
