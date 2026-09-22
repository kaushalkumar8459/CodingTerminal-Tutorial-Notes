---
title: DOM Introduction
slug: day-092-dom-introduction
dayLabel: Day 92
level: Advanced
estimatedMinutes: 25
order: 92
track: javascript
---

# Day 92 [Advanced]: DOM Introduction

## Goal

Understand what the DOM is, how it represents a webpage as a tree structure, and how to select elements from it using JavaScript.

## Prerequisites

- Day 13 (JavaScript events, brief DOM intro)

## Explanation

The **DOM** (Document Object Model) is how the browser represents an HTML page as a structure JavaScript can read and modify — every HTML element becomes a JavaScript object you can interact with. The DOM is organized as a **tree**: the `document` is the root, containing elements, which contain other elements, forming a nested parent-child structure that mirrors your HTML's nesting.

To interact with a specific element, you first need to **select** it. The three main selection methods are `getElementById()` (finds one element by its `id`), `querySelector()` (finds the FIRST element matching a CSS selector), and `querySelectorAll()` (finds ALL elements matching a CSS selector, returned as a NodeList).

## Topic by Topic

### Topic 1: What is the DOM?

Theory:
The DOM is the browser's live, JavaScript-accessible representation of your HTML — changing the DOM changes what's actually shown on the page, immediately.

Code Example:

```html
<p id="greeting">Hello</p>
<script>
  const paragraph = document.getElementById("greeting");
  console.log(paragraph.textContent); // "Hello"
</script>
```

**Explanation:** `document` is JavaScript's entry point into the DOM — everything on the page is reachable through it, starting with methods like `getElementById()`.

**Key Points:**

- The DOM is a live representation — changes via JavaScript instantly reflect in the actual displayed page.
- `document` is the root object for accessing anything in the DOM.
- HTML and the DOM are closely related, but the DOM is the "live," JavaScript-interactive version.

### Topic 2: The DOM tree

Theory:
The DOM organizes elements as a tree — each element can have a parent, siblings, and children, mirroring the nested structure of your HTML.

Code Example:

```html
<div id="container">
  <h1>Title</h1>
  <p>Paragraph</p>
</div>
```

```js
const container = document.getElementById("container");
console.log(container.children.length); // 2 - h1 and p
console.log(container.children[0].tagName); // "H1"
```

**Explanation:** `container`'s children are the `<h1>` and `<p>` elements nested directly inside it — this parent-child relationship exists for every level of nesting in your HTML.

**Key Points:**

- The DOM tree mirrors your HTML's nesting structure exactly.
- Elements have parents, children, and siblings, navigable through DOM properties.
- Understanding this tree structure is essential for both selecting AND later manipulating elements correctly.

### Topic 3: `getElementById()` and `querySelector()`

Theory:
`getElementById(id)` finds one specific element by its unique `id` attribute. `querySelector(cssSelector)` finds the FIRST element matching any valid CSS selector (class, tag, attribute, etc.).

Code Example:

```html
<button id="submitBtn" class="primary-button">Submit</button>
```

```js
const byId = document.getElementById("submitBtn");
const byClass = document.querySelector(".primary-button");
const byTag = document.querySelector("button");

console.log(byId === byClass); // true - same element, found two different ways
```

**Explanation:** All three methods find the SAME button here, using different selector styles — `querySelector()` is more flexible since it accepts any CSS selector syntax, not just IDs.

**Key Points:**

- `getElementById()` is fast and simple, but only works with IDs.
- `querySelector()` accepts any CSS selector (`.class`, `#id`, `tag`, `[attribute]`, combinations) and returns the FIRST match.
- If no element matches, both return `null` — always check for this before using the result.

### Topic 4: `querySelectorAll()` for multiple elements

Theory:
`querySelectorAll(cssSelector)` returns ALL matching elements as a `NodeList` — similar to an array, but not exactly one (though it supports `.forEach()`).

Code Example:

```html
<ul>
  <li class="item">Apple</li>
  <li class="item">Banana</li>
  <li class="item">Cherry</li>
</ul>
```

```js
const items = document.querySelectorAll(".item");
console.log(items.length); // 3

items.forEach((item) => console.log(item.textContent));
```

**Explanation:** `items` is a `NodeList` containing all three `<li>` elements — it supports `.forEach()` directly, though for other array methods (`.map()`, `.filter()`) you'd need to convert it to a real array first (`[...items]` or `Array.from(items)`).

**Key Points:**

- `querySelectorAll()` returns a `NodeList` of ALL matches, even if there's only one or zero.
- `NodeList` supports `.forEach()` directly, but not every array method — convert with `[...items]` if needed.
- This is the standard way to select and work with multiple similar elements at once.

## Recap

- The DOM is the browser's live, tree-structured representation of your HTML, accessible and modifiable via JavaScript.
- `getElementById()` finds one element by ID; `querySelector()` finds the first CSS-selector match.
- `querySelectorAll()` finds all matches as a `NodeList`, supporting `.forEach()` directly.

## What's Next

Practice for today: `public/coding/JavaScript/day-092-dom-selection.md` — build a Dynamic User List. Day 93 covers DOM manipulation — changing content, attributes, and styles.
