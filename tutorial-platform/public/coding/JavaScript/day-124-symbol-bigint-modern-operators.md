# Day 124 — Symbol, BigInt & Modern JavaScript Operators

## Symbol

1. Create a unique identifier using `Symbol()`.
2. Add a symbol-keyed property to an object and retrieve it correctly.
3. Explain why two symbols created with the same description are still different.
4. Use `Symbol.iterator` to make a custom object iterable.
5. Compare `Symbol()` and `Symbol.for()`.

## BigInt

6. Create and calculate values larger than `Number.MAX_SAFE_INTEGER`.
7. Demonstrate why normal Number arithmetic can lose integer precision for very large integers.
8. Compare two BigInt values safely.
9. Write a factorial function that returns a BigInt.
10. Convert between safe Number values and BigInt where appropriate.
11. Explain why BigInt cannot be mixed directly with Number in arithmetic expressions.

## Modern Operators

12. Use optional chaining to safely read deeply nested data.
13. Use nullish coalescing when `0`, `false`, or an empty string should remain valid values.
14. Compare `||` with `??` using practical examples.
15. Use `??=`, `||=`, and `&&=` appropriately.
16. Rewrite nested property checks using optional chaining.
17. Build a configuration resolver using optional chaining and nullish coalescing.

## Interview-style Questions

18. Why are Symbols useful for object keys?
19. What is the difference between `Symbol.keyFor()` and a symbol's description?
20. When should BigInt be used instead of Number?
21. Why does `JSON.stringify()` require special handling for BigInt?
22. What is the difference between `||` and `??`?
23. What does optional chaining return when an intermediate value is nullish?

## Practice Checklist

Test zero, false, empty strings, null, undefined, very large integers, symbol-keyed properties, and mixed Number/BigInt expressions.
