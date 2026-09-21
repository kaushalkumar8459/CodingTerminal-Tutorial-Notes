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
