---
title: Event Delegation
slug: day-097-event-delegation
dayLabel: Day 97
level: Advanced
estimatedMinutes: 25
order: 97
track: javascript
---

# Day 97 [Advanced]: Event Delegation

## Goal

Learn event delegation — a practical, powerful application of event bubbling for efficiently handling events on many (including dynamically created) elements.

## Prerequisites

- Day 94 (creating elements dynamically), Day 96 (event bubbling)

## Explanation

**Event delegation** means attaching ONE event listener to a PARENT element, instead of attaching separate listeners to each individual child — relying on event bubbling (Day 96) to catch events from children as they bubble up to the parent. This solves a real problem from Day 94: dynamically created elements (like new todo items) don't automatically get event listeners unless you remember to attach one to each new element individually — event delegation avoids this entirely by listening once, on a parent that already exists.

Inside the delegated listener, `event.target` tells you exactly WHICH child element was actually interacted with, letting you respond appropriately.

## Topic by Topic

### Topic 1: The problem event delegation solves

Theory:
Attaching a separate listener to every individual list item (especially ones created dynamically later) is repetitive and easy to forget for newly added elements.

Code Example:

```js
// PROBLEM APPROACH - must remember to attach a listener to EVERY new item
function addTodoItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  li.addEventListener("click", () => console.log("Clicked:", text)); // must remember this every time!
  list.append(li);
}
```

**Explanation:** This works, but it's repetitive, and it's easy to forget to attach the listener if items are created in multiple different places in your code — event delegation avoids this problem entirely.

**Key Points:**

- Attaching listeners individually to every dynamic element is repetitive and error-prone.
- This problem is exactly what Day 94's Dynamic Todo List practice may have already run into.
- Event delegation solves this by listening once, on a stable parent element instead.

### Topic 2: Implementing event delegation

Theory:
Attach ONE listener to a parent element that already exists in the page; use `event.target` inside the handler to determine which specific child was actually clicked.

Code Example:

```js
const list = document.querySelector("#taskList");

list.addEventListener("click", (event) => {
  console.log("Something inside the list was clicked:", event.target);
});

// New items added later are AUTOMATICALLY covered - no extra listener needed!
function addTodoItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  list.append(li); // no click listener needed here at all
}
```

**Explanation:** Because clicks on any `<li>` bubble up to `list`, the ONE listener on `list` catches clicks from every item — including ones added AFTER the listener was set up, since bubbling doesn't care when an element was created.

**Key Points:**

- One listener on a stable parent catches events from ALL current AND future children.
- This directly solves the Day 94 "remember to attach a listener to every new item" problem.
- `event.target` is essential here — it tells you exactly which child element triggered the event.

### Topic 3: Using `event.target` to identify the specific element

Theory:
`event.target` gives you the exact element that was actually clicked — you often need to check its properties (class, `data-*` attributes) to decide how to respond.

Code Example:

```js
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const item = event.target.closest("li"); // find the parent <li> to remove
    item.remove();
  }
});
```

**Explanation:** `event.target` might be the delete button itself (nested inside an `<li>`) — `.closest("li")` walks UP from the clicked element to find the nearest ancestor `<li>`, which is what actually needs to be removed.

**Key Points:**

- `event.target` is the exact element clicked — often a CHILD of the element you actually care about.
- `.closest(selector)` finds the nearest ancestor (or the element itself) matching a selector — extremely useful in delegation.
- Checking `event.target`'s class/attributes lets one listener handle multiple different kinds of interactions (like both "click item" and "click delete button").

### Topic 4: When to use event delegation

Theory:
Event delegation shines for lists/collections of similar items, especially when items are added/removed dynamically — but isn't always necessary for simple, static, one-off elements.

Practical:
Use delegation when: (1) you have many similar child elements, (2) items are added/removed dynamically, or (3) you want to reduce the number of individual listeners for performance/simplicity. For a single, static button that never changes, a direct listener is perfectly fine.

**Key Points:**

- Event delegation is ideal for dynamic lists, tables, or any collection of similar repeated elements.
- It reduces the total number of listeners needed and automatically covers future elements.
- Not every situation needs delegation — use it deliberately where it solves a genuine problem.

## Recap

- Event delegation attaches one listener to a stable parent, relying on bubbling to catch events from (including future) children.
- `event.target` identifies exactly which child was interacted with; `.closest()` finds the relevant ancestor.
- Delegation is ideal for dynamic lists/collections, directly solving the "remember to attach a listener to every new item" problem.

## What's Next

Practice for today: `public/coding/JavaScript/day-097-event-delegation.md` — rebuild the Dynamic Todo List using event delegation. Day 98 covers forms and validation.
