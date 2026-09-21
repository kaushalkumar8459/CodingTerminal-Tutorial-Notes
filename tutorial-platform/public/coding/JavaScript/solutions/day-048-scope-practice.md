# Day 048 — Solution: Scope Practice

**1–5. Function and block scope**

```js
const globalMessage = "global";
function readGlobal() {
  return globalMessage;
}

function functionScope() {
  var inside = "private";
  return inside;
}
console.log(functionScope());

if (true) {
  let blockValue = 1;
  console.log(blockValue);
}
if (true) {
  var leakedValue = 2;
}
console.log(leakedValue); // 2

function first() {
  const value = "first";
  return value;
}
function second() {
  const value = "second";
  return value;
}
```

**6. Nested scope**

```js
function outer() {
  const message = "outer";
  function inner() {
    return message;
  }
  return inner();
}
```

**7. `let` in a loop**

```js
const readers = [];
for (let index = 0; index < 3; index++) readers.push(() => index);
console.log(readers.map((read) => read())); // [0, 1, 2]
```

**8. Independent parameters**

```js
function addTax(price) {
  price += 10;
  return price;
}
function addFee(price) {
  price += 5;
  return price;
}
```

**9. Standalone block**

```js
{
  const blockOnly = "inside";
  console.log(blockOnly);
}
```

**10. Temporal Dead Zone**

```js
{
  // console.log(value); // ReferenceError: value is in the TDZ
  let value = 10;
}
```

## Interview-style questions

**11.** Function scope lasts for a whole function; block scope lasts for a `{}` block. `let` and `const` are block-scoped, while `var` is function-scoped.

**12.** `var` ignores ordinary block boundaries, but `let` and `const` create bindings for each block.

**13.** Lexical scope is determined by where code is written. A function can access bindings from its written outer scopes, regardless of where it is later called.
