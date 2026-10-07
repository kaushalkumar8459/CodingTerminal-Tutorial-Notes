# Day 001 — TypeScript Fundamentals

## Learning Goals

- TS setup\n- annotations\n- inference\n- primitives\n- arrays\n- tuples\n- enums\n- unknown/never/void\n- strict mode

## Core Topics

### TS setup

Learn the syntax, behavior, trade-offs, and common mistakes of **TS setup**.

### annotations

Learn the syntax, behavior, trade-offs, and common mistakes of **annotations**.

### inference

Learn the syntax, behavior, trade-offs, and common mistakes of **inference**.

### primitives

Learn the syntax, behavior, trade-offs, and common mistakes of **primitives**.

### arrays

Learn the syntax, behavior, trade-offs, and common mistakes of **arrays**.

### tuples

Learn the syntax, behavior, trade-offs, and common mistakes of **tuples**.

### enums

Learn the syntax, behavior, trade-offs, and common mistakes of **enums**.

### unknown/never/void

Learn the syntax, behavior, trade-offs, and common mistakes of **unknown/never/void**.

### strict mode

Learn the syntax, behavior, trade-offs, and common mistakes of **strict mode**.

## Practical Exercise

Create typed variables, tuples, enums, and strict-mode examples.

## Interview Focus

- Explain the concept without relying on memorized definitions.
- Compare it with the closest JavaScript/TypeScript alternative.
- Identify common type-safety pitfalls.
- Write a small example from scratch.

## Checklist

- [ ] Understand the concept
- [ ] Write a working example
- [ ] Handle an edge case
- [ ] Explain the interview trade-off
- [ ] Avoid `any` unless there is a documented reason

<!-- codingterminal-solution:start -->

# Day 001 — TypeScript Fundamentals — Solutions

## 1. Practical Solution

```ts
type ApiResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };

interface User {
  id: number;
  name: string;
}

function getResult<T>(result: ApiResult<T>): T | undefined {
  if (result.status === "success") {
    return result.data;
  }

  console.error(result.message);
  return undefined;
}

const result: ApiResult<User> = {
  status: "success",
  data: { id: 1, name: "Kaushal" }
};

const user = getResult(result);
```

## 2. Key Learning

- Prefer precise types over `any`.
- Use narrowing before accessing variant-specific properties.
- Keep reusable types generic when the data shape changes.
- Let the compiler document the contract of your code.

## 3. Interview Answer Pattern

When asked about **TypeScript Fundamentals**, explain:

1. What problem it solves.
2. The TypeScript syntax involved.
3. A small practical example.
4. A common mistake or limitation.
5. Where you would use it in a real frontend application.

## 4. Practice Task

Create typed variables, tuples, enums, and strict-mode examples.

## 5. Self-Check

- [ ] Can I write the example without looking it up?
- [ ] Can I explain why the type is safe?
- [ ] Can I identify one limitation?
- [ ] Can I solve a variation under interview time pressure?

<!-- codingterminal-solution:end -->

