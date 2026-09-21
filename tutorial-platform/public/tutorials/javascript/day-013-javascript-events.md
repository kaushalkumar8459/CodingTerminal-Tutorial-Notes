---
title: JavaScript Events
slug: day-013-javascript-events
dayLabel: Day 13
level: Beginner
estimatedMinutes: 30
order: 13
track: javascript
---

# Day 13 [Beginner]: JavaScript Events

## Goal

Understand what browser events are, how to listen for them with `addEventListener()`, and how to read information from the event object.

## Prerequisites

- Day 1–12 (core language basics)
- Basic HTML knowledge (elements, attributes)

## Explanation

An **event** is something that happens on a webpage that JavaScript can react to — a user clicking a button, typing into a field, submitting a form, and so on. To "listen" for an event, you attach an **event handler** — a function that runs whenever that event happens.

The modern, standard way to attach an event handler is `element.addEventListener("eventName", handlerFunction)`. This is preferred over inline `onclick="..."` attributes because it keeps JavaScript separate from HTML and lets you attach multiple handlers to the same element if needed.

Whenever an event fires, JavaScript automatically passes an **event object** into your handler function, containing useful details — like which key was pressed, which element was clicked, or the current value of an input field.

## Topic by Topic

### Topic 1: What are events?

Theory:
Events are signals the browser sends out when something happens — a click, a key press, a page finishing loading, and so on. JavaScript can "listen" for these signals and respond.

Practical:
Common events you'll use constantly: `click`, `input`, `change`, `submit`, `keydown`, `mouseover`.

Code Example:

```html
<button id="myButton">Click Me</button>
<script>
  const button = document.getElementById("myButton");
  button.addEventListener("click", function () {
    console.log("Button was clicked!");
  });
</script>
```

**Explanation:** The browser fires a `"click"` event whenever the button is clicked; `addEventListener` tells JavaScript to run our function every time that happens.

**Key Points:**

- Events are things that "happen" — clicks, typing, submitting, and more.
- `addEventListener(eventName, handlerFunction)` is how you react to them.
- The same element can have multiple listeners for different events.

### Topic 2: Common event types

Theory:
Different HTML elements commonly work with different event types — buttons with `click`, text inputs with `input`/`change`, forms with `submit`.

Practical:
`input` fires on every keystroke/change immediately; `change` fires only after the element loses focus (or a selection is finalized) — the two are not interchangeable.

Code Example:

```html
<input id="nameInput" type="text" placeholder="Type your name" />
<script>
  const nameInput = document.getElementById("nameInput");

  nameInput.addEventListener("input", function (event) {
    console.log("Typing:", event.target.value);
  });
</script>
```

**Explanation:** Every keystroke fires an `"input"` event, letting us read the current value live via `event.target.value` as the user types.

**Key Points:**

- `click` = mouse click on an element.
- `input` = fires immediately as a value changes (great for live feedback).
- `change` = fires once a change is "committed" (e.g. field loses focus).
- `submit` = fires when a `<form>` is submitted.

### Topic 3: The event object

Theory:
Every event handler automatically receives an event object as its first parameter, packed with details about what just happened.

Practical:
`event.target` refers to the exact element the event happened on — extremely useful for reading input values or identifying which button was clicked in a list.

Code Example:

```html
<form id="loginForm">
  <input id="username" type="text" />
  <button type="submit">Login</button>
</form>
<script>
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stops the page from reloading
    const username = document.getElementById("username").value;
    console.log("Submitted username:", username);
  });
</script>
```

**Explanation:** `event.preventDefault()` stops the browser's default behavior (reloading the page on form submit), so you can handle the submission yourself with JavaScript instead.

**Key Points:**

- The event object is automatically passed to every handler.
- `event.target` = the element the event actually happened on.
- `event.preventDefault()` stops a default browser action, like a form reloading the page.

### Topic 4: `addEventListener()` in practice

Theory:
`addEventListener(type, handler)` is the standard, flexible way to attach event behavior — it can be added, and later removed, without touching your HTML.

Practical:
Prefer `addEventListener()` over inline `onclick="..."` HTML attributes — it keeps your JavaScript logic organized in one place (usually a separate `.js` file).

Code Example:

```js
const counterButton = document.getElementById("counterButton");
let count = 0;

counterButton.addEventListener("click", function () {
  count++;
  console.log("Count:", count);
});
```

**Explanation:** Each click increments and prints `count` — a simple but complete example of reacting to user interaction with state that changes over time.

**Key Points:**

- `addEventListener()` is the standard, reusable way to handle events.
- Keeps JavaScript out of your HTML — easier to maintain.
- You can attach as many listeners as needed to the same element.

## Recap

- Events are things that happen on a page (clicks, typing, submitting) that JavaScript can react to.
- `addEventListener(eventType, handler)` is the standard way to listen for them.
- The event object (`event`) carries useful details, like `event.target` and `event.preventDefault()`.

## What's Next

Practice for today: `public/coding/JavaScript/day-013-events.md` — small browser projects (counter, character counter, password toggle). Day 14 covers browser storage — Local Storage and Session Storage.
