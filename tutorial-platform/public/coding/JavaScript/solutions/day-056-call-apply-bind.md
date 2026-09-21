# Day 056 — Solution: call, apply, bind

```js
function introduce(greeting, punctuation) { return `${greeting}, ${this.name}${punctuation}`; }
const person = { name: "Asha" };
console.log(introduce.call(person, "Hello", "!"));
console.log(introduce.apply(person, ["Hello", "!"]));
const boundIntroduce = introduce.bind(person, "Hi");
console.log(boundIntroduce("."));
console.log(introduce.call(person, "Hello", "!") === introduce.apply(person, ["Hello", "!"]));
```

**5. Partial application**

```js
function multiply(a, b) { return a * b; }
const double = multiply.bind(null, 2);
console.log(double(5)); // 10
```

**6–8. Borrowing helpers**

```js
const first = { name: "Asha", introduce() { return `I am ${this.name}`; } };
const second = { name: "Ben" };
console.log(first.introduce.call(second));
function borrowFunction(sourceObj, methodName, targetObj) { return sourceObj[methodName].call(targetObj); }
function bindFunction(fn, context) { return (...args) => fn.apply(context, args); }
```

**9. Apply with Math.max**

```js
console.log(Math.max.apply(null, [4, 12, 7])); // 12
```

**10. Bind extracted method**

```js
const boundMethod = first.introduce.bind(first);
setTimeout(boundMethod, 0);
```

## Interview-style questions

**11.** `call` receives individual arguments; `apply` receives one arguments array.

**12.** `bind` returns a new function and does not invoke the original function immediately.

**13.** Extracting a method or passing it as a callback can remove its object receiver. `bind` permanently supplies the intended `this` value.
