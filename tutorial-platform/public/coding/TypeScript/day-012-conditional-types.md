# Day 012 — Conditional Types

## Learning Goals

Master **Conditional Types** with practical frontend examples, type-safety patterns, edge cases, and interview preparation.

## Core Topics

- Syntax and compiler behavior
- Practical application patterns
- Type-safety benefits
- Common mistakes and trade-offs
- Real-world frontend use cases

## Practical Exercise

Build a small TypeScript example demonstrating the topic. Include at least one edge case and avoid unnecessary `any`.

## Interview Focus

1. Explain the concept simply.
2. Write a small example from scratch.
3. Explain one limitation or trade-off.
4. Give a realistic frontend use case.

## Checklist

- [ ] Understand the concept
- [ ] Write a working example
- [ ] Handle an edge case
- [ ] Explain the trade-off
- [ ] Solve a variation without notes

<!-- codingterminal-solution:start -->

# Day 012 — Conditional Types — Solutions

## Practical Solution

```ts
type ApiResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function unwrap<T>(result: ApiResult<T>): T | undefined {
  if (result.status === "success") return result.data;
  console.error(result.message);
  return undefined;
}

const result: ApiResult<{ id: number; name: string }> = {
  status: "success",
  data: { id: 1, name: "Kaushal" }
};

console.log(unwrap(result));
```

## Key Learning

- Prefer precise types over `any`.
- Narrow unions before accessing variant-specific properties.
- Use generics when the same logic supports different data types.
- Let the compiler enforce application contracts.

## Interview Answer Pattern

1. Define the concept.
2. Show a concise example.
3. Explain the type-safety benefit.
4. Mention a limitation.
5. Connect it to frontend application code.

## Practice

Create a variation of the example and solve it without looking at the solution.

## Self-Check

- [ ] I can write the example from scratch.
- [ ] I can explain why it is type-safe.
- [ ] I can identify an edge case.
- [ ] I can explain a real-world use case.

<!-- codingterminal-solution:end -->

