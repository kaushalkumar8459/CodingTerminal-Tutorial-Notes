# Day 095 — DOM Events Projects

Matches Tutorial Day 95 (DOM Events In Depth). Build each as a small real HTML+JS page.
No limit on how far you extend them.

## Projects

1. **Counter** — buttons to increment/decrement a number displayed on the page, plus a
   reset button.
2. **Calculator** — a basic calculator UI (buttons for digits and `+ - * /`) that builds
   up an expression and calculates the result on `=`.
3. **Character Counter** — a `<textarea>` with a live character count that updates on
   every keystroke, and turns red if it exceeds a maximum length.
4. **Password Toggle** — a password field with a button/icon that shows/hides the
   password by toggling the input's `type`.
5. **Image Preview** — a file input (`<input type="file">`) that shows a preview of the
   selected image immediately, before any upload (hint: research `URL.createObjectURL()`
   or `FileReader`).

## Concept

6. Add keyboard support to the calculator: typing digits and operators on the keyboard
   should work the same as clicking the buttons.
7. Add a "Enter to calculate" keyboard shortcut to the calculator using `keydown` and
   checking `event.key === "Enter"`.
8. Add hover effects to the calculator buttons using `mouseover`/`mouseout` (or CSS
   `:hover` if you prefer, and note the tradeoff in a comment).
9. Add validation to the character counter: disable a "submit" button if the count is
   over the maximum.

## Interview-style questions

10. Why might you handle BOTH click events AND keyboard events for the same
    calculator actions?
11. What's the practical difference between using CSS `:hover` versus JavaScript
    `mouseover`/`mouseout` for a hover effect — when would you need JavaScript
    specifically?

## Notes

- These five projects are genuinely useful portfolio pieces — take the time to make
  them look reasonably polished, not just functionally correct.
- Test each project by actually clicking/typing in a real browser repeatedly — DOM
  event bugs often only show up through actual interaction, not code review alone.

<!-- codingterminal-solution:start -->

# Day 095 — Solution: DOM Events Projects

```js
let count = 0;
const output = document.querySelector("#output");
document
  .querySelector("#increment")
  .addEventListener("click", () => (output.textContent = ++count));
document
  .querySelector("#decrement")
  .addEventListener("click", () => (output.textContent = --count));
document
  .querySelector("#reset")
  .addEventListener("click", () => (output.textContent = count = 0));

let expression = "";
function press(value) {
  expression += value;
  document.querySelector("#expression").value = expression;
}
function calculate() {
  try {
    document.querySelector("#expression").value = Function(
      `return ${expression}`,
    )();
    expression = document.querySelector("#expression").value;
  } catch {
    expression = "";
  }
}
document
  .querySelectorAll("[data-value]")
  .forEach((button) =>
    button.addEventListener("click", () => press(button.dataset.value)),
  );
document.querySelector("#equals").addEventListener("click", calculate);
document.addEventListener("keydown", (event) => {
  if (/^[0-9+\-*/.]$/.test(event.key)) press(event.key);
  if (event.key === "Enter") calculate();
});

const textarea = document.querySelector("#message");
const limit = 100;
textarea.addEventListener("input", () => {
  const tooLong = textarea.value.length > limit;
  document.querySelector("#length").textContent = textarea.value.length;
  document.querySelector("#submit").disabled = tooLong;
  document.querySelector("#length").classList.toggle("error", tooLong);
});
const password = document.querySelector("#password");
document
  .querySelector("#toggle-password")
  .addEventListener(
    "click",
    () => (password.type = password.type === "password" ? "text" : "password"),
  );
document.querySelector("#image-file").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) document.querySelector("#preview").src = URL.createObjectURL(file);
});
```

CSS `:hover` is preferable for a visual-only hover because it is declarative; JavaScript is useful when hover must change application state or trigger non-CSS behavior.

## Interview-style questions

**10.** Click support works for mouse/touch users while keyboard support improves accessibility and speed.

**11.** CSS handles presentation efficiently. JavaScript is needed when the hover changes data, invokes logic, or must coordinate with other state.

<!-- codingterminal-solution:end -->

