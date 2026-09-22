# Day 128 — JavaScript Modules Deep Dive

## ES Modules

1. Create named and default exports.
2. Import bindings from another module.
3. Explain live bindings in ES modules.
4. Use `export *` and explain re-exporting.
5. Use `import * as` namespace imports.

## Dynamic Imports

6. Load a module with dynamic `import()`.
7. Handle the Promise returned by dynamic import.
8. Explain when dynamic imports help code splitting.
9. Design a lazy-loaded feature boundary.

## ESM vs CommonJS

10. Compare ESM and CommonJS syntax.
11. Explain static ESM imports vs runtime `require()`.
12. Explain interoperability considerations.
13. Understand `package.json` `type` and module format selection at a practical level.

## Module Design

14. Avoid unnecessary barrel exports.
15. Recognize circular dependencies.
16. Explain how circular dependencies can produce initialization problems.
17. Separate side-effect-free modules from modules with startup side effects.
18. Explain why tree shaking depends on statically analyzable module structure.

## Interview Questions

19. What is the difference between named and default exports?
20. What is a live binding?
21. Why can dynamic import improve initial load performance?
22. What problems can circular dependencies create?
23. Why are ES modules friendly to tree shaking?
24. What is the practical difference between ESM and CommonJS?

## Practice Checklist

Create a small three-module application with one lazy-loaded feature and intentionally introduce, then remove, a circular dependency.
