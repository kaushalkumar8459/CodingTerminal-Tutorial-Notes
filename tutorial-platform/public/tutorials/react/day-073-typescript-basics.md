---
title: TypeScript Basics
slug: day-073-typescript-basics
dayLabel: Day 73
level: Advanced
estimatedMinutes: 30
order: 73
track: react
---
# Day 73 [Advanced]: TypeScript Basics

## Goal

Learn core TypeScript patterns to improve safety, maintainability, and refactoring confidence in frontend modules.

## Prerequisites

- Day 72 completed
- Solid JavaScript fundamentals

## Explanation

TypeScript adds static typing on top of JavaScript, helping detect errors at build time and documenting data contracts clearly. It does not replace runtime validation: data coming from APIs, storage, forms, or users still needs runtime checks when correctness matters.

## Topic by Topic

### Topic 1: Primitive and Object Types

Theory:
Types define valid shape and values.

Practical:
Type user model and function params.

Code Example:

```ts
type User = { id: number; name: string; active: boolean };

function activateUser(user: User): User {
  return { ...user, active: true };
}
```

**Explanation:** Types make your data shape explicit. That means teammates and tools can both understand what values are expected.

**Key Points:**

- Type both primitives and object shapes.
- Keep type names readable and meaningful.
- Use types to reduce guesswork in large codebases.
- Remember that TypeScript types are erased at runtime.

### Topic 2: Arrays, Unions, and Literals

Theory:
Unions represent multiple allowed value sets.

Practical:
Use status union instead of free-form strings.

Code Example:

```ts
type Status = "idle" | "loading" | "success" | "error";

type StatusHistory = Status[];
```

**Explanation:** Unions are safer than loose strings because they restrict values to known valid states.

**Key Points:**

- Use unions for finite UI states.
- Prevent invalid string values at compile time.
- Improve refactor safety for state-driven logic.
- Use arrays such as `Status[]` when a collection contains one known element type.

### Topic 3: Function Typing

Theory:
Explicit return and param types reduce ambiguity.

Practical:
Type utility module strictly.

Code Example:

```ts
function add(a: number, b: number): number {
  return a + b;
}

const formatUser = (user: User): string => user.name.trim();
```

**Explanation:** Typed function inputs and outputs clarify how a helper should be used and what it promises to return.

**Key Points:**

- Type parameters and return values clearly.
- Catch mismatch errors before runtime.
- Keep utility contracts small and explicit.
- Let TypeScript infer obvious local types instead of adding unnecessary annotations everywhere.

### Topic 4: Interfaces and Reuse

Theory:
Interfaces help define reusable contracts.

Practical:
Use shared interfaces for API objects.

Code Example:

```ts
interface Product {
  id: string;
  title: string;
  price: number;
}

function getProductLabel(product: Product): string {
  return `${product.title} - ${product.price}`;
}
```

**Explanation:** Interfaces help you reuse the same contract in components, API layers, and helper functions.

**Key Points:**

- Reuse shared data contracts.
- Keep models consistent across modules.
- Avoid duplicate shape definitions.
- Choose `type` or `interface` based on the modeling need and team convention; both can describe object contracts.

### Topic 5: Strict Mode and Any Avoidance

Theory:
`any` removes type safety and should be minimized.

Practical:
Enable strict checks and fix inference gaps.

Code Example:

```ts
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```

**Explanation:** Strict mode pushes the codebase toward safer assumptions. It may feel harder at first, but it prevents many silent type holes.

**Key Points:**

- Enable strict mode early.
- Reduce `any` wherever possible.
- Fix inference gaps instead of suppressing them.
- Prefer `unknown` for values whose type is not yet known, then narrow before use.

### Topic 6: Scalability Decisions for TypeScript Basics

Theory:
As projects grow, architectural and typing decisions should optimize team velocity, change safety, and long-term consistency.

Practical:
Document one design decision for this topic with tradeoff notes so future contributors understand why it was chosen.

Code Example:

```ts
// types/user.ts
export interface User {
  id: string;
  name: string;
}

// Keep domain types close to their domain and reuse them at module boundaries.
```

**Explanation:** TypeScript strategy should be deliberate in large codebases. Documenting tradeoffs helps teams migrate consistently instead of mixing styles randomly.

**Key Points:**

- Document where types live and why.
- Explain migration rules from JS to TS.
- Keep team conventions consistent over time.
- Avoid creating one giant global type file that becomes a dependency hotspot.

## Key Concepts

- Static type checking
- Type composition and unions
- Function and object contracts
- Reusable interfaces
- Strict typing discipline
- `unknown` and type narrowing
- Compile-time vs runtime validation
- Scalable architecture thinking

## Visual Concept Map

```mermaid
flowchart TD
		A[JavaScript Module] --> B[Add Types]
		B --> C[Compile-time Validation]
		C --> D[Safer Refactor]
		D --> E[Fewer Runtime Bugs]
```

## End-to-End Practical

1. Pick one JS helper module.
2. Rename file to `.ts`.
3. Add explicit types to data and functions.
4. Replace avoidable `any` with safer types such as `unknown` where appropriate.
5. Compile and fix strict-mode issues.
6. Add runtime validation at external data boundaries where needed.

## Hands-on Coding

### Example 1: Case - Typing an API Response Model

Scenario:
A learning app consumes course API and needs safe model access.

```ts
type Course = {
  id: string;
  title: string;
  lessons: number;
  published: boolean;
};

function getCourseTitle(course: Course): string {
  return course.title;
}
```

### Example 2: Case - Union for UI State

Scenario:
A dashboard status flag should allow only known values.

```ts
type LoadState = "idle" | "pending" | "success" | "error";

function renderStatus(state: LoadState): string {
  if (state === "pending") return "Loading";
  if (state === "success") return "Done";
  if (state === "error") return "Failed";
  return "Idle";
}
```

### Example 3: Case - Strictly Typed Utility Module

Scenario:
An e-commerce app needs reliable cart math utilities.

```ts
type CartItem = { price: number; qty: number };

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}
```

## Mini Exercise

Scenario:
You are migrating a `payments.js` helper with parsing and summary functions.

Convert to TypeScript, define interfaces for payment records, eliminate avoidable `any` usage, and decide where runtime validation is required for external payment data.

Expected output:

- Module compiles in strict mode
- Function signatures are explicit
- Data contracts are reusable and clear
- External/untrusted data is not assumed to be valid merely because it has a TypeScript type

## Assessment Quiz

### Quiz Questions

1. What is the biggest benefit of TypeScript in large codebases?
2. Why are unions better than generic strings for status flags?
3. True or False: `any` increases type safety.
4. What does strict mode encourage?
5. Why type API response objects?
6. What is the difference between `unknown` and `any`?
7. True or False: TypeScript types automatically validate JSON received from an API at runtime.
8. When is type inference preferable to adding an explicit annotation?

### Quiz Answers

1. Early error detection and safer refactoring
2. They constrain values to valid states
3. False
4. Explicit contracts and fewer silent type holes
5. Prevent unsafe property access and mismatched assumptions inside the typed codebase
6. `unknown` requires narrowing before most operations, while `any` disables many compile-time checks for that value.
7. False. Runtime data must be validated separately when its shape cannot be trusted.
8. When the type is obvious from the expression and the annotation does not add useful documentation or enforce a boundary contract.

## Task

- Convert one JS module to TS with strict typing
- Remove avoidable `any` usage
- Use `unknown` and narrowing where input types are genuinely uncertain
- Identify one external data boundary that needs runtime validation
- Complete mini exercise

## Self Check

- You can migrate JavaScript modules into strongly typed TypeScript
- You can design reusable type contracts
- You understand compile-time typing versus runtime validation
- You can choose between `any`, `unknown`, inference, `type`, and `interface` appropriately
- You can answer at least 6 out of 8 quiz questions correctly

## Interview Questions and Answers

### Beginner

**Question:** Why use TypeScript with React?

**Answer:** It catches many bugs during development and improves code clarity.

**Question:** What is a union type?

**Answer:** A type that allows one value from a defined set.

### Middle

**Question:** How do interfaces help in team projects?

**Answer:** They standardize contracts across modules and reduce misunderstandings.

**Question:** What is a practical way to reduce `any`?

**Answer:** Start from function boundaries, then type inputs/outputs incrementally and use `unknown` when a value genuinely needs narrowing.

### Advanced

**Question:** How does strict mode influence architecture quality?

**Answer:** It forces explicit data modeling and exposes hidden coupling early.

**Question:** What is a safe migration strategy for JS-to-TS at scale?

**Answer:** Migrate feature by feature with strict settings and CI type checks, while keeping module boundaries clear and avoiding a large unplanned rewrite.

**Question:** Why isn't a TypeScript interface enough to secure an API response?

**Answer:** Interfaces exist only at compile time. Runtime data can violate the declared shape, so untrusted external data should be validated before the application relies on it.

**Question:** When should you prefer `unknown` over `any`?

**Answer:** Use `unknown` when the value's type is not known yet. It preserves type safety by requiring explicit narrowing before unsafe operations.

## Day 73 Outcome

- You can apply TypeScript fundamentals in real modules
- You can enforce stricter data and function contracts
- You understand the boundary between compile-time types and runtime validation
- You are ready for typed React components in Day 74
