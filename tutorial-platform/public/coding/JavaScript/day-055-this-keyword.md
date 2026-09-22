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
