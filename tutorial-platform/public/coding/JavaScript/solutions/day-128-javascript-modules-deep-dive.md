# Day 128 Solutions — JavaScript Modules Deep Dive

## 1. Named and default exports

```js
// math.js
export const add = (a, b) => a + b;

export default function multiply(a, b) {
  return a * b;
}

// app.js
import multiply, { add } from "./math.js";
```

## 2. Dynamic import

```js
button.addEventListener("click", async () => {
  const { openEditor } = await import("./editor.js");
  openEditor();
});
```

Dynamic import returns a Promise and can create a lazy boundary in bundler-based applications.

## 3. Circular dependencies

Prefer:

```text
A → shared → B
```

over:

```text
A → B → A
```

Extract shared contracts or utilities when two modules depend on each other.

## Interview Takeaway

ES modules provide statically analyzable imports, live bindings, and a structure that bundlers can use for tree shaking.
