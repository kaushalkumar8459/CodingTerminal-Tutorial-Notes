# Day 102 — Dynamic Import: Lazy-Loaded Calculator

Matches Tutorial Day 102 (Dynamic Modules). No limit on how far you extend this.

## Basic

1. Create a small `calculator.js` module (named exports: `add`, `subtract`, `multiply`,
   `divide`).
2. In a separate `app.js`, use dynamic `import()` inside an `async function` to load
   `calculator.js` and call one of its functions.
3. Add a `console.log` BEFORE and AFTER the `await import(...)` line, and observe
   that code after it doesn't run until the module has actually finished loading.
4. Try dynamically importing a module that DOESN'T EXIST (a typo'd filename), wrap it
   in `try/catch`, and confirm you can handle the loading failure gracefully.

## Project: Lazy-loaded feature module

5. Build a page with a button labeled "Load Calculator" — clicking it dynamically
   imports `calculator.js` and reveals a simple calculator UI, only at that point.
6. Add a loading indicator that shows while the module is being fetched (even if it
   loads almost instantly locally, structure the code as if it might take a moment —
   this matters more in real production apps loading from a network).
7. Add a SECOND lazy-loaded feature (e.g. a "Load Unit Converter" button with its own
   module) to the same page, confirming multiple independent dynamic imports work
   correctly on one page.

## Interview-style questions

8. Why does dynamic `import()` return a Promise, while static `import` statements
   don't need to be awaited at all?
9. What's a realistic real-world scenario where lazy loading a module would
   meaningfully improve a website's initial load performance?
10. What's the difference between accessing a NAMED export vs a DEFAULT export from a
    dynamically imported module's result object?

## Notes

- In a real production app, lazy loading genuinely reduces the amount of JavaScript
  downloaded upfront — today's exercise focuses on the SYNTAX and behavior, since the
  actual performance benefit is hard to observe with small local files.
- This lazy-loading pattern (button click → dynamic import → reveal feature) is
  directly usable in real projects, especially for rarely-used or heavy features.

<!-- codingterminal-solution:start -->

# Day 102 — Solution: Dynamic Import

**calculator.js**

```js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => a / b;
```

**app.js**

```js
async function useCalculator() {
  console.log("before loading");
  try {
    const calculator = await import("./calculator.js");
    console.log("after loading", calculator.add(2, 3));
  } catch (error) {
    console.error("Could not load calculator", error);
  }
}
useCalculator();
```

**Lazy-loaded features**

```js
async function loadFeature(button, modulePath) {
  button.textContent = "Loading...";
  try {
    const module = await import(modulePath);
    button.nextElementSibling.textContent =
      module.default?.() || module.describe?.();
  } catch (error) {
    button.nextElementSibling.textContent = "Feature failed to load";
  } finally {
    button.textContent = "Loaded";
  }
}
document
  .querySelector("#calculator")
  .addEventListener("click", (event) =>
    loadFeature(event.currentTarget, "./calculator.js"),
  );
document
  .querySelector("#converter")
  .addEventListener("click", (event) =>
    loadFeature(event.currentTarget, "./converter.js"),
  );
```

Dynamic `import()` returns a Promise because loading can happen asynchronously. It is useful for rarely used routes, editors, reports, or heavy feature libraries. Named exports are properties such as `module.add`; a default export is `module.default`.

<!-- codingterminal-solution:end -->

