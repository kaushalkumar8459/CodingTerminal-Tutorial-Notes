# Day 049 — Hoisting Challenges (Predict the Output)

Matches Tutorial Day 49 (Hoisting). 20 predict-the-output questions — write down your
prediction BEFORE running each one. No limit on adding more of your own afterward.

1. `console.log(a); var a = 5;` — what prints?
2. `console.log(b); let b = 5;` — what happens?
3. `console.log(c); const c = 5;` — what happens?
4. `sayHello(); function sayHello() { console.log("hi"); }` — what prints?
5. `sayBye(); const sayBye = () => console.log("bye");` — what happens?
6. ```js
   var x = 1;
   function test() {
     console.log(x);
     var x = 2;
   }
   test();
   ```
   What prints, and why (think about hoisting WITHIN the function)?
7. ```js
   if (true) {
     var y = 10;
   }
   console.log(y);
   ```
   What prints?
8. ```js
   if (true) {
     let z = 10;
   }
   console.log(z);
   ```
   What happens?
9. ```js
   function outer() {
     console.log(typeof inner);
     function inner() {}
   }
   outer();
   ```
   What prints?
10. ```js
    console.log(typeof myVar);
    var myVar = "hello";
    ```
    What prints?
11. ```js
    for (var i = 0; i < 3; i++) {}
    console.log(i);
    ```
    What prints?
12. ```js
    for (let i = 0; i < 3; i++) {}
    console.log(i);
    ```
    What happens?
13. What is the Temporal Dead Zone, in your own words, based on questions 2-3 and 8?
14. Does hoisting move code around physically, or is that just a common misconception?
    Explain what's actually happening.
15. Why does calling a function declaration before its definition work, but calling a
    `const` arrow function before its definition does not?
16. ```js
    let value = "outer";
    function test() {
      console.log(value);
      let value = "inner";
    }
    test();
    ```
    What happens, and why (careful — this is trickier than it looks)?
17. Are `function*` (generator functions, previewed later) hoisted the same way as
    regular function declarations? (You can research this one, since generators haven't
    been covered yet.)
18. Write your own hoisting "gotcha" example using `var` inside a loop combined with a
    function that captures it (a preview of closures + hoisting interacting).
19. Explain why relying on hoisting for code style (calling functions before they're
    defined in the file) is generally discouraged, even though it technically works for
    function declarations.
20. Write a short explanation (a few sentences) of hoisting that you could give to
    someone who has never heard of it — teaching it back is a great way to confirm you
    understand it.

## Notes

- Always write your prediction down BEFORE running the code — comparing your prediction
  to the actual result is what actually builds understanding, not just seeing the
  answer.
- If several of these surprised you, that's completely normal — hoisting is one of the
  most commonly misunderstood JavaScript topics, even among experienced developers.
