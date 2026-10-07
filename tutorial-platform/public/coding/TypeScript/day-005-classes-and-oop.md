# Day 005 — Classes & OOP

## Learning Goals

- Access modifiers\n- parameter properties\n- inheritance\n- abstract classes\n- implements\n- static members

## Core Topics

### Access modifiers

Learn the syntax, behavior, trade-offs, and common mistakes of **Access modifiers**.

### parameter properties

Learn the syntax, behavior, trade-offs, and common mistakes of **parameter properties**.

### inheritance

Learn the syntax, behavior, trade-offs, and common mistakes of **inheritance**.

### abstract classes

Learn the syntax, behavior, trade-offs, and common mistakes of **abstract classes**.

### implements

Learn the syntax, behavior, trade-offs, and common mistakes of **implements**.

### static members

Learn the syntax, behavior, trade-offs, and common mistakes of **static members**.

## Practical Exercise

Build a small typed service hierarchy.

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

# Day 005 — Classes & OOP — Solutions

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

When asked about **Classes & OOP**, explain:

1. What problem it solves.
2. The TypeScript syntax involved.
3. A small practical example.
4. A common mistake or limitation.
5. Where you would use it in a real frontend application.

## 4. Practice Task

Build a small typed service hierarchy.

## 5. Self-Check

- [ ] Can I write the example without looking it up?
- [ ] Can I explain why the type is safe?
- [ ] Can I identify one limitation?
- [ ] Can I solve a variation under interview time pressure?

<!-- codingterminal-solution:end -->

