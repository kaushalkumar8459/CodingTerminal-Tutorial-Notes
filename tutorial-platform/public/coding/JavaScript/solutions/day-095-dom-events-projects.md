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
