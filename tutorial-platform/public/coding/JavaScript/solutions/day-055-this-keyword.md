# Day 055 — Solution: this

These results assume browser-style non-module examples; strict mode and modules change some top-level details.

**1.** At browser script top level, `this` is generally `window`.

**2.** Prints `A`: a regular method call gets `this === obj`.

**3.** `fn()` loses the object receiver. In strict mode `this` is `undefined`; in a non-strict browser script it may be `window`, so `this.name` is usually `undefined`.

**4.** A plain regular call has `this === undefined` in strict mode and the global object in non-strict mode.

**5.** An arrow captures lexical `this`; it does not create its own receiver.

**6.** Usually `undefined`: an arrow method does not get `obj` as `this`.

**7.** The regular `inner()` call has its own plain-call `this`, not the outer object's `this`.

**8.** Prints `D`: the arrow captures `this` from `show()`, where `this === obj`.

**9.** Prints `F`: method `this` is the object to the left of the dot at call time.

**10.** Regular-function `this` is determined by how the function is called.

**11.** Arrow-function `this` is inherited lexically from the surrounding scope.

**12.** `undefined` in strict mode.

**13.** `obj.show()` supplies `obj` as the receiver; assigning it to `fn` removes that receiver.

**14.** Usually no. A timer callback is called without the original object receiver; bind it if the method needs `obj`.

**15.** An arrow used as an object method cannot receive the object as its dynamic `this`.

**16.**

```js
const object = {
  name: "Asha",
  show() {
    [1].forEach(function () { console.log(this); });
    [1].forEach(() => console.log(this.name));
  }
};
object.show();
```

**17–20.** `this` depends on call form for regular functions but lexical scope for arrows, so visually similar code can behave differently. A regular function's `this` comes from its call site; an arrow's comes from its surrounding function/scope. Record remaining questions about strict mode, callbacks, and class methods for Day 58.
