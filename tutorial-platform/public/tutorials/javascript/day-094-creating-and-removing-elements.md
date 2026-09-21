---
title: Creating and Removing Elements
slug: day-094-creating-and-removing-elements
dayLabel: Day 94
level: Advanced
estimatedMinutes: 25
order: 94
track: javascript
---

# Day 94 [Advanced]: Creating and Removing Elements

## Goal

Learn to dynamically create, insert, and remove DOM elements using JavaScript — building fully dynamic pages instead of only editing existing HTML.

## Prerequisites

- Day 92–93 (DOM selection, manipulation)

## Explanation

So far, you've only worked with elements already present in your HTML. Real dynamic pages (like a to-do list where items are added/removed) need to CREATE new elements entirely with JavaScript. `document.createElement(tagName)` creates a new, empty element; `.append()`/`.prepend()` insert it into the page; `.remove()` deletes an existing element entirely; `.replaceWith()` swaps one element for another.

## Topic by Topic

### Topic 1: `createElement()` — building new elements

Theory:
`document.createElement(tagName)` creates a brand-new element, not yet attached to the page — you must set its content/attributes and then insert it somewhere.

Code Example:

```js
const newItem = document.createElement("li");
newItem.textContent = "New Task";
newItem.classList.add("task-item");

console.log(newItem); // exists in memory, but NOT visible on the page yet
```

**Explanation:** `newItem` is fully created and configured, but since it hasn't been inserted anywhere in the actual document yet, it's not visible on the page at all.

**Key Points:**

- `createElement()` only creates the element — it doesn't automatically appear anywhere.
- Configure the new element (text, classes, attributes) before or after creation, doesn't matter which.
- You must explicitly insert it into the DOM tree for it to become visible.

### Topic 2: `append()` and `prepend()` — inserting elements

Theory:
`.append(element)` adds a new child at the END of a parent's children; `.prepend(element)` adds it at the BEGINNING.

Code Example:

```js
const list = document.querySelector("#taskList");

const newItem = document.createElement("li");
newItem.textContent = "New Task";

list.append(newItem); // adds to the end of the list
// list.prepend(newItem); // would add to the beginning instead
```

**Explanation:** Once `append()`ed, `newItem` becomes a real child of `list` in the actual DOM tree — it's now genuinely visible on the page.

**Key Points:**

- `.append()` adds to the end; `.prepend()` adds to the beginning.
- Both can accept multiple elements or even plain text at once.
- This is the standard modern way to insert new elements (older code sometimes uses `.appendChild()`, which is similar but slightly less flexible).

### Topic 3: `.remove()` — removing elements

Theory:
`element.remove()` removes that specific element (and everything inside it) from the DOM entirely.

Code Example:

```js
const itemToDelete = document.querySelector("#task-3");
itemToDelete.remove(); // gone from the page immediately
```

**Explanation:** Once removed, the element (and its content) no longer exists anywhere on the visible page — this is the standard way to implement "delete" functionality for dynamic lists.

**Key Points:**

- `.remove()` is called directly on the element you want removed.
- The removed element is completely gone from the DOM, not just hidden visually.
- This is the direct DOM equivalent of the array `.filter()`/`.splice()` "remove an item" patterns from Module 3.

### Topic 4: `.replaceWith()` — swapping elements

Theory:
`element.replaceWith(newElement)` replaces an existing element with a completely different one, in the same position.

Code Example:

```js
const loadingMessage = document.querySelector("#loading");
const actualContent = document.createElement("p");
actualContent.textContent = "Data loaded successfully!";

loadingMessage.replaceWith(actualContent);
```

**Explanation:** `loadingMessage` is removed and `actualContent` takes its exact place in the DOM tree — a common pattern for swapping a "loading" placeholder with real content once it's ready.

**Key Points:**

- `.replaceWith()` swaps one element for another, in the same position in the tree.
- Useful for "loading placeholder → real content" patterns, connecting directly to Module 6's loading states.
- The original element is completely removed once replaced.

## Recap

- `createElement()` builds a new element, not yet visible until inserted.
- `.append()`/`.prepend()` insert an element at the end/beginning of a parent's children.
- `.remove()` deletes an element entirely; `.replaceWith()` swaps one element for another.

## What's Next

Practice for today: `public/coding/JavaScript/day-094-create-delete-dom.md` — build a Dynamic Todo List. Day 95 covers DOM events in depth.
