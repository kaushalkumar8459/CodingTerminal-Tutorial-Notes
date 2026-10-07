# Real Interview Set 2 — Output and Language Behavior

Predict the output before opening each solution. These questions test scope, coercion, references, and execution order.

## 1. Hoisting with `var`

**Predict the output before opening the solution.**

```js
console.log(value);
var value = 10;
```

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">undefined

// The declaration is initialized as undefined before the assignment runs.</code></pre></details>

## 2. Function declaration versus expression

**Predict the output before opening the solution.**

```js
sayHello();
var sayHello = function () {
  console.log("expression");
};
function sayHello() {
  console.log("declaration");
}
```

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">TypeError: sayHello is not a function

// The var binding exists, but its later function-expression assignment has not run yet.
// The function declaration is overwritten by the var binding during setup.</code></pre></details>

## 3. Closure in a loop

**Predict the output before opening the solution.**

```js
const callbacks = [];
for (var index = 0; index &lt; 3; index++) callbacks.push(() =&gt; index);
console.log(callbacks.map((callback) =&gt; callback()));
```

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">[3, 3, 3]

// All callbacks close over the same function-scoped var binding.</code></pre></details>

## 4. Promise versus timer

**Predict the output before opening the solution.**

```js
console.log("start");
setTimeout(() =&gt; console.log("timer"), 0);
Promise.resolve().then(() =&gt; console.log("promise"));
console.log("end");
```

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">start
end
promise
timer

// Synchronous code, microtasks, then timer tasks.</code></pre></details>

## 5. Reference assignment

**Predict the output before opening the solution.**

```js
const first = { name: "Asha" };
const second = first;
second.name = "Maya";
console.log(first.name);
```

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">Maya

// Both variables point to the same object.</code></pre></details>

## 6. Shallow copy

**Predict the output before opening the solution.**

```js
const first = { profile: { name: "Asha" } };
const second = { ...first };
second.profile.name = "Maya";
console.log(first.profile.name);
```

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">Maya

// Spread copies only the outer object; profile remains shared.</code></pre></details>

## 7. `this` in methods

**Predict the output before opening the solution.**

```js
const user = {
  name: "Asha",
  regular() { return this.name; },
  arrow: () =&gt; this.name
};
console.log(user.regular(), user.arrow());
```

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">Asha undefined

// regular() receives user as its receiver. The arrow captures outer lexical this.</code></pre></details>

## 8. Promise executor timing

**Predict the output before opening the solution.**

```js
console.log(1);
const promise = new Promise((resolve) =&gt; {
  console.log(2);
  resolve(3);
  console.log(4);
});
promise.then(console.log);
console.log(5);
```

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">1
2
4
5
3

// The Promise executor is synchronous; then handlers are microtasks.</code></pre></details>

<!-- codingterminal-solution:start -->

# Day 002 — Output & Language — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

coercion, equality, closures, hoisting and TDZ

## Executable JavaScript

```js
console.log(typeof null);       // "object"
console.log(typeof NaN);        // "number"
console.log(1 + "2" + 3);       // "123"
console.log(1 + 2 + "3");       // "33"

function createCounter() {
  let count = 0;
  return () => ++count;
}
// Explain coercion and lexical scope instead of memorizing outputs.
```

## How to Explain It

- Start with the requirement and assumptions.
- Explain the data structure or runtime behavior.
- State time and space complexity.
- Walk through one normal case and one edge case.
- Mention a production trade-off or failure mode.

## Edge Cases

- Empty input
- Single item
- Duplicate values
- Invalid input
- Large input
- Repeated calls or concurrent operations where applicable

## Follow-Up Questions

1. Can you improve the complexity?
2. What changes for very large input?
3. How would you test it?
4. How would you handle cancellation or failure?
5. What changes in a browser/UI implementation?

<!-- codingterminal-solution:end -->

