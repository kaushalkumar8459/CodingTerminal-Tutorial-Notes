# Day 101 — ES Modules: math.js, user.js, product.js, utils.js, app.js

Matches Tutorial Day 101 (ES Modules). No limit on how far you extend this modular setup.

## Build a modular application

Create these separate files (use `<script type="module">` in your HTML, or Node.js
with `"type": "module"` in `package.json`):

1. `math.js` — named exports: `add`, `subtract`, `multiply`, `divide`.
2. `user.js` — a default export `class User` with `name`, `email`, and a `describe()` method.
3. `product.js` — a default export `class Product` PLUS a named export `TAX_RATE`
   constant.
4. `utils.js` — named exports: several small utility functions (e.g. `formatCurrency`,
   `capitalize`, `slugify` — reuse ones you've already built in earlier days).
5. `app.js` — imports from ALL FOUR other files and uses each of them together to
   demonstrate a small combined program (e.g. create a user, create a product, apply
   tax using `math.js`, format the result using `utils.js`).

## Concept

6. Add a private (non-exported) helper function inside `utils.js`, used internally by
   one of its exported functions — confirm it's NOT accessible from `app.js`.
7. Rename an import using `as` (e.g. `import { add as sum } from "./math.js"`) and
   confirm it still works correctly under the new name.
8. Try creating a CIRCULAR import (two files importing from each other) and observe
   what happens — research why this is generally best avoided.

## Interview-style questions

9. What's the difference between a named export and a default export, in terms of
   how they're imported?
10. Why does splitting code across multiple files (modules) help with larger
    projects, compared to one single giant file?
11. What happens to a variable/function inside a module that is NEVER exported —
    can other files access it in any way?

## Notes

- If running this directly in a browser, remember to add `type="module"` to your
  `<script>` tag, and serve the files over `http://` (not `file://`) — modules have
  stricter loading rules than regular scripts.
- This modular structure (math/user/product/utils/app) is a small-scale preview of how
  real production codebases are organized across many files.
