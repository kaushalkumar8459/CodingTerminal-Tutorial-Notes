# Day 098 — Solution: Registration Form

```js
const form = document.querySelector("#registration");
const fields = ["name", "email", "phone", "password", "confirmPassword"];
function setError(name, message) {
  const field = form.elements[name];
  document.querySelector(`#${name}-error`).textContent = message;
  field.classList.toggle("invalid", Boolean(message));
}
function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  const at = data.email.indexOf("@");
  if (at < 1 || data.email.indexOf(".", at) === -1)
    errors.email = "Enter a valid email";
  if (!/^\d{10}$/.test(data.phone))
    errors.phone = "Phone must contain 10 digits";
  if (data.password.length < 8)
    errors.password = "Password must have 8 characters";
  if (data.confirmPassword !== data.password)
    errors.confirmPassword = "Passwords must match";
  return errors;
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const errors = validate(data);
  fields.forEach((name) => setError(name, errors[name] || ""));
  if (Object.keys(errors).length === 0) {
    console.log(data);
    form.reset();
  }
});
form.elements.email.addEventListener("blur", (event) =>
  setError(
    "email",
    validate({
      email: event.target.value,
      name: "x",
      phone: "0000000000",
      password: "12345678",
      confirmPassword: "12345678",
    }).email || "",
  ),
);
form.elements.password.addEventListener("input", (event) => {
  document.querySelector("#strength").textContent =
    event.target.value.length >= 12
      ? "strong"
      : event.target.value.length >= 8
        ? "medium"
        : "weak";
});
form.addEventListener("input", () => {
  document.querySelector("#submit").disabled = fields.some(
    (name) => !form.elements[name].value,
  );
});
```

## Interview-style questions

**13.** Showing all errors lets users fix the complete form in one pass instead of repeatedly submitting to discover one issue at a time.

**14.** Blur validation gives timely feedback while the user still has context, while submit validation remains the final safety check.

**15.** `preventDefault()` stops the browser from navigating or reloading before your validation and error display code runs.
