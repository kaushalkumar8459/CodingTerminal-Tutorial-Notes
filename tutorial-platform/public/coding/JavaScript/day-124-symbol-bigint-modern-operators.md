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

<!-- codingterminal-solution:start -->

# Solution — Day 124: Symbol, BigInt & Modern JavaScript Operators

## Symbol
```js
const id = Symbol("id");
const user = { name: "Asha", [id]: 101 };

console.log(user[id]);
console.log(Symbol("x") === Symbol("x")); // false
```

`Symbol.for()` uses the global symbol registry:
```js
const a = Symbol.for("user");
const b = Symbol.for("user");
console.log(a === b); // true
```

## Custom iterator
```js
const range = {
  from: 1,
  to: 3,
  *[Symbol.iterator]() {
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

console.log([...range]);
```

## BigInt
```js
const huge = 9_007_199_254_740_993n;
console.log(huge + 10n);
```

Use BigInt for integers outside the safe Number range when exact integer arithmetic is required.

```js
function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) result *= i;
  return result;
}
```

Do not mix Number and BigInt directly:
```js
1n + 1; // TypeError
```

JSON requires explicit conversion because standard JSON serialization does not directly support BigInt.

## Optional chaining
```js
const city = user?.address?.city;
```

## Nullish coalescing
```js
const pageSize = config.pageSize ?? 20;
```

Unlike `||`, `??` preserves valid falsy values such as `0` and `false`.

## Logical assignment
```js
config.timeout ??= 5000;
settings.debug ||= false;
user.isActive &&= Boolean(user.id);
```

## Interview Answers

18. Symbols provide unique property keys that avoid accidental name collisions.
19. `Symbol.keyFor()` retrieves the registry key only for symbols created with `Symbol.for()`.
20. Use BigInt for exact integers larger than Number's safe integer range.
21. JSON serialization does not natively encode BigInt values.
22. `||` falls back for all falsy values; `??` falls back only for null or undefined.
23. Optional chaining returns undefined when the accessed chain encounters null or undefined.

<!-- codingterminal-solution:end -->

