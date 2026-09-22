# Day 003 — Interfaces — Solutions

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

When asked about **Interfaces**, explain:

1. What problem it solves.
2. The TypeScript syntax involved.
3. A small practical example.
4. A common mistake or limitation.
5. Where you would use it in a real frontend application.

## 4. Practice Task

Model users, API responses, and configurable UI components.

## 5. Self-Check

- [ ] Can I write the example without looking it up?
- [ ] Can I explain why the type is safe?
- [ ] Can I identify one limitation?
- [ ] Can I solve a variation under interview time pressure?
