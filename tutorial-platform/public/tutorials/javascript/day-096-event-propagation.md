---
title: Event Propagation - Bubbling and Capturing
slug: day-096-event-propagation
dayLabel: Day 96
level: Advanced
estimatedMinutes: 25
order: 96
track: javascript
---

# Day 96 [Advanced]: Event Propagation — Bubbling and Capturing

## Goal

Understand how events travel through the DOM tree — capturing phase, target phase, and bubbling phase — and how to control this with `stopPropagation()`/`preventDefault()`.

## Prerequisites

- Day 92 (DOM tree), Day 95 (DOM events)

## Explanation

When an event happens on an element, it doesn't just affect that ONE element — it travels through the DOM tree in three phases: **capturing** (from the outermost ancestor DOWN to the target), **target** (the element the event actually happened on), and **bubbling** (back UP from the target through all its ancestors). By default, `addEventListener()` listens during the bubbling phase — meaning a click on a deeply nested element also triggers click listeners on its parents, grandparents, and so on, unless stopped.

`event.stopPropagation()` stops the event from continuing to bubble (or capture) further. `event.preventDefault()` (from Day 13) is unrelated to propagation — it stops the browser's DEFAULT behavior for that event (like a link navigating, or a form submitting).

## Topic by Topic

### Topic 1: Event bubbling — the default behavior

Theory:
By default, an event fired on a child element "bubbles" up, also triggering matching listeners on its parent, grandparent, and so on, up to `document`.

Code Example:

```html
<div id="outer">
  <button id="inner">Click Me</button>
</div>
```

```js
document.getElementById("outer").addEventListener("click", () => {
  console.log("Outer div clicked");
});
document.getElementById("inner").addEventListener("click", () => {
  console.log("Inner button clicked");
});

// Clicking the button logs BOTH:
// "Inner button clicked"
// "Outer div clicked"
```

**Explanation:** Clicking the button fires ITS OWN click listener first, then the event bubbles up to the parent `div`, firing its listener too — both run, in that specific order (innermost first).

**Key Points:**

- By default, events bubble UP from the target through all its ancestors.
- Multiple listeners on different ancestor elements can all fire from ONE click.
- The target's own listener fires FIRST, then ancestors' listeners fire in order, outward.

### Topic 2: `stopPropagation()` — stopping the bubble

Theory:
`event.stopPropagation()` prevents the event from continuing to bubble further up (or capture further down).

Code Example:

```js
document.getElementById("inner").addEventListener("click", (event) => {
  console.log("Inner button clicked");
  event.stopPropagation(); // stops bubbling here - outer's listener will NOT fire
});
```

**Explanation:** With `stopPropagation()` called, the outer `div`'s click listener never fires for this click — the event stops bubbling right after the inner button's own listener runs.

**Key Points:**

- `stopPropagation()` stops an event from continuing to bubble (or capture) beyond the current listener.
- Use it deliberately, when you specifically want to prevent parent listeners from also reacting.
- Overusing `stopPropagation()` can make debugging harder later — use it only when genuinely needed.

### Topic 3: The capturing phase

Theory:
Before bubbling even begins, events actually travel DOWN from the outermost ancestor to the target first — this is the capturing phase, though it's rarely used explicitly in everyday code.

Code Example:

```js
document.getElementById("outer").addEventListener(
  "click",
  () => console.log("Outer - capturing phase"),
  { capture: true }, // listen during CAPTURING instead of the default bubbling
);
```

**Explanation:** Passing `{ capture: true }` as the third argument makes this listener fire during the capturing phase (on the way DOWN to the target), instead of the default bubbling phase (on the way back UP).

**Key Points:**

- Capturing happens BEFORE bubbling, traveling from outermost ancestor down to the target.
- Almost all real-world code relies on the default bubbling phase; capturing is rarely needed explicitly.
- Knowing capturing exists helps you fully understand `stopPropagation()`'s effect on BOTH phases.

### Topic 4: `preventDefault()` vs `stopPropagation()`

Theory:
These are two DIFFERENT, unrelated things: `preventDefault()` stops the browser's built-in default behavior for an event; `stopPropagation()` stops the event from continuing to travel through the DOM tree.

Code Example:

```js
document.querySelector("a").addEventListener("click", (event) => {
  event.preventDefault(); // stops the link from actually navigating
  console.log("Link clicked, but navigation prevented");
  // stopPropagation() is a SEPARATE concern - this event would still bubble normally
});
```

**Explanation:** `preventDefault()` here only stops the browser's default "navigate to the link's URL" behavior — it has NOTHING to do with whether this click event still bubbles up to parent elements (which it still does, unless `stopPropagation()` is ALSO called).

**Key Points:**

- `preventDefault()`: stops the browser's default action (form submit, link navigation, checkbox toggle, etc.).
- `stopPropagation()`: stops the event from continuing to travel through the DOM tree.
- These are independent — you can call either, both, or neither, depending on what you actually need.

## Recap

- Events travel through capturing (down), target, and bubbling (up) phases; `addEventListener()` listens during bubbling by default.
- `stopPropagation()` stops an event from continuing to travel further through the tree.
- `preventDefault()` is unrelated — it stops the browser's default action for that event type.

## What's Next

Practice for today: `public/coding/JavaScript/day-096-event-bubbling-capturing.md` — a hands-on propagation experiment. Day 97 covers event delegation, a practical application of bubbling.
