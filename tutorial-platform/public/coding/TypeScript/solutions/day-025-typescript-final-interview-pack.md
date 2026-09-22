# Day 025 — Final TypeScript Interview Pack — Solutions

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
