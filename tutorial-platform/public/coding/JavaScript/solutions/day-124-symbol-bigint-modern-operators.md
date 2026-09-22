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
