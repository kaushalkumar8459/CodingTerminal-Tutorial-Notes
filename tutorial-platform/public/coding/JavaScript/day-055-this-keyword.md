# Day 055 — this (Predict the Output, 20 Examples)

Matches Tutorial Day 55 (Callback Functions In Depth) — practice previews `this` here,
ahead of Tutorial Day 58's full explanation. Predict each output BEFORE running it.
No limit on adding more of your own afterward.

1. `console.log(this);` at the top level of a script (in a browser) — what does it refer to?
2. ```js
   const obj = {
     name: "A",
     show() {
       console.log(this.name);
     },
   };
   obj.show();
   ```
3. ```js
   const obj = {
     name: "A",
     show() {
       console.log(this.name);
     },
   };
   const fn = obj.show;
   fn();
   ```
   (Compare carefully with #2 — same function, called differently!)
4. ```js
   function regular() {
     console.log(this);
   }
   regular();
   ```
5. ```js
   const arrow = () => console.log(this);
   arrow();
   ```
6. ```js
   const obj = {
     name: "B",
     show: () => console.log(this.name),
   };
   obj.show();
   ```
   (Compare with #2 — arrow method vs regular method!)
7. ```js
   const obj = {
     name: "C",
     show() {
       function inner() {
         console.log(this);
       }
       inner();
     },
   };
   obj.show();
   ```
8. ```js
   const obj = {
     name: "D",
     show() {
       const inner = () => console.log(this.name);
       inner();
     },
   };
   obj.show();
   ```
   (Compare with #7 — regular inner function vs arrow inner function!)
9. ```js
   const obj1 = {
     name: "E",
     show() {
       console.log(this.name);
     },
   };
   const obj2 = { name: "F" };
   obj2.show = obj1.show;
   obj2.show();
   ```
10. What determines the value of `this` in a REGULAR function — is it fixed when the
    function is defined, or decided when it's called?
11. What determines the value of `this` in an ARROW function?
12. In strict mode, what is `this` inside a regular function called with no context
    (like example #4)?
13. Why does #3 behave differently from #2, even though `fn` and `obj.show` are the
    exact same function?
14. If you pass `obj.show` as a callback to `setTimeout`, will `this` inside it still
    refer to `obj`? (You can research or guess, then confirm on Day 58.)
15. Based on examples #6 and #8, when would using an arrow function as an object method
    cause unexpected behavior?
16. Write your own example demonstrating `this` inside a `.forEach()` callback used
    as a regular function vs an arrow function inside an object method.
17. Why might `this` be considered one of JavaScript's most commonly misunderstood features?
18. Summarize, in your own words, the general rule for what `this` refers to in a
    regular function call.
19. Summarize, in your own words, the general rule for what `this` refers to in an
    arrow function.
20. After finishing all of these, write down 3 things about `this` you're still unsure
    about — bring them into Day 58's tutorial to check your understanding.

## Notes

- Don't worry if several of these feel confusing right now — `this` is genuinely one of
  the trickiest parts of JavaScript, and today is meant to surface your questions before
  Day 58 answers them fully.
- Predicting first, then verifying, is far more valuable here than just reading the
  answers directly.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

