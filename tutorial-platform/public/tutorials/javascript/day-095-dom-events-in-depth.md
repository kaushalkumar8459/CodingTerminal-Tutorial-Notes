---
title: DOM Events In Depth
slug: day-095-dom-events-in-depth
dayLabel: Day 95
level: Advanced
estimatedMinutes: 25
order: 95
track: javascript
---

# Day 95 [Advanced]: DOM Events In Depth

## Goal

Deepen your Day 13 event knowledge with the fuller range of DOM events — keyboard and mouse events specifically — needed for real interactive projects.

## Prerequisites

- Day 13 (JavaScript events introduction)

## Explanation

Beyond the basic `click`/`input`/`change`/`submit` events from Day 13, real applications often need **keyboard events** (`keydown`, `keyup`, `keypress`) and **mouse events** (`mousedown`, `mouseup`, `mouseover`, `mouseout`, `mousemove`) for richer interactivity — things like keyboard shortcuts, drag-and-drop, or hover effects.

## Topic by Topic

### Topic 1: Keyboard events

Theory:
`keydown` fires when a key is pressed down; `keyup` fires when it's released. The event object includes details like `event.key` (which key) and modifier keys (`event.shiftKey`, etc.).

Code Example:

```js
document.addEventListener("keydown", (event) => {
  console.log(`Key pressed: ${event.key}`);
  if (event.key === "Enter") {
    console.log("Enter was pressed!");
  }
});
```

**Explanation:** `event.key` gives you the actual key that was pressed (like `"Enter"`, `"a"`, `"ArrowUp"`) — this is the standard way to build keyboard shortcuts or Enter-to-submit behavior.

**Key Points:**

- `keydown`/`keyup` fire for physical key presses/releases.
- `event.key` tells you which specific key was involved.
- Combine with modifier checks (`event.ctrlKey`, `event.shiftKey`) for keyboard shortcuts like Ctrl+Enter.

### Topic 2: Mouse events

Theory:
Beyond `click`, mouse events include `mouseover`/`mouseout` (hover enter/exit), `mousedown`/`mouseup` (press/release, useful for drag interactions), and `mousemove` (continuous tracking).

Code Example:

```js
const box = document.querySelector(".hover-box");

box.addEventListener("mouseover", () => {
  box.classList.add("highlighted");
});
box.addEventListener("mouseout", () => {
  box.classList.remove("highlighted");
});
```

**Explanation:** `mouseover`/`mouseout` fire when the cursor enters/leaves the element — a common pattern for hover-based visual feedback, often achievable with CSS `:hover` alone, but sometimes needing JavaScript for more complex logic.

**Key Points:**

- `mouseover`/`mouseout` handle hover enter/exit.
- `mousedown`/`mouseup` are useful for press-and-hold or drag-style interactions.
- `mousemove` fires continuously and rapidly — use it sparingly, often combined with throttling (Day 107).

### Topic 3: Combining events for real interactions

Theory:
Real interactive features often combine multiple event types together — like a character counter using `input`, or a password toggle using `click`.

Code Example:

```js
const passwordInput = document.querySelector("#password");
const toggleButton = document.querySelector("#togglePassword");

toggleButton.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});
```

**Explanation:** Clicking the toggle button flips the input's `type` attribute between `"password"` (hidden) and `"text"` (visible) — a simple, common real-world feature combining event handling with attribute manipulation from Day 93.

**Key Points:**

- Real features usually combine event listening with DOM manipulation (Day 93) together.
- Think in terms of "what event triggers this, and what should change as a result?"
- This combination is exactly what today's coding projects will practice extensively.

### Topic 4: Removing event listeners

Theory:
`removeEventListener(type, handler)` removes a previously attached listener — but only if you pass the EXACT SAME function reference used when adding it.

Code Example:

```js
function handleClick() {
  console.log("Clicked!");
}

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick); // works - same function reference

// button.addEventListener("click", () => console.log("Clicked!"));
// button.removeEventListener("click", () => console.log("Clicked!")); // does NOT work - different function references!
```

**Explanation:** Anonymous inline arrow functions create a NEW function reference every time — `removeEventListener` can't match it to anything, so it silently fails; using a named function reference (stored in a variable) is required for this to work correctly.

**Key Points:**

- `removeEventListener()` requires the EXACT SAME function reference that was originally added.
- Anonymous inline functions can never be removed this way — always name and store the function first if you'll need to remove it later.
- This matters for cleanup in longer-lived applications (a preview of Day 106's memory management).

## Recap

- Keyboard events (`keydown`/`keyup`) and mouse events (`mouseover`/`mouseout`/`mousedown`/`mouseup`/`mousemove`) expand your event-handling toolkit beyond Day 13's basics.
- Real interactive features combine event listening with DOM manipulation.
- `removeEventListener()` requires the exact same function reference used when the listener was added.

## What's Next

Practice for today: `public/coding/JavaScript/day-095-dom-events-projects.md` — counter, calculator, character counter, password toggle, image preview. Day 96 covers event propagation — bubbling and capturing.
