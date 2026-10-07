# Day 013 — Events (Browser)

Matches Tutorial Day 13 (JavaScript Events). Build these as small standalone HTML+JS pages.
No limit on how many you build/extend.

## Basic

1. Add a button that logs "Clicked!" to the console using `addEventListener("click", ...)`.
2. Add a text input that logs its current value on every keystroke (`input` event).
3. Add a text input that logs its value only when it loses focus (`change` event).
4. Add a form with one field and prevent the default submit reload using `event.preventDefault()`.
5. Add a button that changes its own text when clicked.

## Concept / Projects

6. **Counter** — a button that increases a number shown on the page each time it's clicked,
   plus a second button that resets it to 0.
7. **Character Counter** — a text area where a live character count updates as the user types.
8. **Password Visibility Toggle** — a password field with a button/icon that switches the
   input's type between `password` and `text` to show/hide the value.
9. **Button Color Changer** — a button that changes its own background color each time it's
   clicked (cycle through a fixed list of colors).
10. **Live Input Preview** — a text input that mirrors what's typed into a `<p>`/`<div>` on
    the page in real time.

## Interview-style questions

11. What is the difference between the `input` and `change` events on a text field?
12. What does `event.preventDefault()` do, and when would you need it?
13. What does `event.target` refer to, and why is it useful in a click handler attached to
    a list of buttons?

## Notes

- These are meant to be tiny real HTML pages (one `.html` + one `.js` file each, or inline
  `<script>` for speed) — actually click around in a browser to see the behavior, don't just
  read the code.
- Keep using `console.log()` liberally while building these — it's the fastest way to
  confirm an event handler actually fired.

<!-- codingterminal-solution:start -->

# Day 013 — Solution: Events (Browser)

Reference solutions for `day-013-events.md`. These are small HTML+JS snippets — build
each as a real page and click around to see them work.

## Basic

**1. Log "Clicked!" on button click**

```html
<button id="btn">Click Me</button>
<script>
  document.getElementById("btn").addEventListener("click", () => {
    console.log("Clicked!");
  });
</script>
```

**2. Log value on every keystroke**

```html
<input id="liveInput" type="text" />
<script>
  document.getElementById("liveInput").addEventListener("input", (event) => {
    console.log(event.target.value);
  });
</script>
```

**3. Log value only when the field loses focus**

```html
<input id="blurInput" type="text" />
<script>
  document.getElementById("blurInput").addEventListener("change", (event) => {
    console.log(event.target.value);
  });
</script>
```

**4. Prevent default form submission**

```html
<form id="myForm">
  <input type="text" />
  <button type="submit">Submit</button>
</form>
<script>
  document.getElementById("myForm").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted without reloading the page");
  });
</script>
```

**5. Button changes its own text on click**

```html
<button id="toggleText">Click me</button>
<script>
  document.getElementById("toggleText").addEventListener("click", (event) => {
    event.target.textContent = "Clicked!";
  });
</script>
```

## Concept / Projects

**6. Counter with reset**

```html
<p id="count">0</p>
<button id="increment">+1</button>
<button id="reset">Reset</button>
<script>
  let count = 0;
  const countDisplay = document.getElementById("count");

  document.getElementById("increment").addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;
  });

  document.getElementById("reset").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
  });
</script>
```

**7. Character counter**

```html
<textarea id="text"></textarea>
<p id="charCount">0 characters</p>
<script>
  document.getElementById("text").addEventListener("input", (event) => {
    document.getElementById("charCount").textContent =
      `${event.target.value.length} characters`;
  });
</script>
```

**8. Password visibility toggle**

```html
<input id="password" type="password" />
<button id="togglePassword">Show</button>
<script>
  const passwordInput = document.getElementById("password");
  const toggleButton = document.getElementById("togglePassword");

  toggleButton.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleButton.textContent = isHidden ? "Hide" : "Show";
  });
</script>
```

**9. Button color changer (cycling colors)**

```html
<button id="colorButton">Change Color</button>
<script>
  const colors = ["tomato", "royalblue", "seagreen", "goldenrod"];
  let colorIndex = 0;
  const button = document.getElementById("colorButton");

  button.addEventListener("click", () => {
    colorIndex = (colorIndex + 1) % colors.length;
    button.style.backgroundColor = colors[colorIndex];
  });
</script>
```

**10. Live input preview**

```html
<input id="previewInput" type="text" placeholder="Type something..." />
<p id="preview"></p>
<script>
  document.getElementById("previewInput").addEventListener("input", (event) => {
    document.getElementById("preview").textContent = event.target.value;
  });
</script>
```

## Interview-style questions

**11. `input` vs `change`**

`input` fires immediately on every keystroke/value change — great for live feedback.
`change` fires only once the value is "committed," typically when the field loses
focus. Use `input` for real-time updates, `change` for "final value" checks.

**12. `event.preventDefault()`**

It stops the browser's default behavior for that specific event — most commonly used
to stop a form from reloading the page on submit, or a link from navigating away.

**13. `event.target`**

`event.target` is the exact element the event actually happened on. It's essential
inside a single click handler attached to a container of many similar elements (like a
list), so you can tell WHICH specific child was clicked — the foundation of event
delegation (Day 97).

<!-- codingterminal-solution:end -->

