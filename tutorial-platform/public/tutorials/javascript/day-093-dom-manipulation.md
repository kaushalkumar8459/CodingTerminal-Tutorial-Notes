---
title: DOM Manipulation
slug: day-093-dom-manipulation
dayLabel: Day 93
level: Advanced
estimatedMinutes: 25
order: 93
track: javascript
---

# Day 93 [Advanced]: DOM Manipulation

## Goal

Learn to change an element's text, HTML content, attributes, classes, and styles using JavaScript.

## Prerequisites

- Day 92 (DOM selection)

## Explanation

Once you've selected an element, you can change nearly everything about it: its displayed **text** (`textContent`), its inner **HTML markup** (`innerHTML`), its **attributes** (like `src`, `href`, `disabled`), its CSS **classes** (`classList`), and its inline **styles** (`style`). Understanding the difference between `textContent` and `innerHTML` is especially important for both correctness and security.

## Topic by Topic

### Topic 1: `textContent` vs `innerHTML`

Theory:
`textContent` sets/gets an element's text ONLY, treating everything as plain text (safe from HTML injection). `innerHTML` sets/gets the element's actual HTML markup, parsing any tags you provide.

Code Example:

```js
const box = document.getElementById("box");

box.textContent = "<strong>Bold</strong>"; // shows the LITERAL text, tags NOT parsed
box.innerHTML = "<strong>Bold</strong>"; // shows actual BOLD text, tags parsed
```

**Explanation:** `textContent` treats `<strong>Bold</strong>` as plain text to display exactly as typed; `innerHTML` interprets it as real HTML, rendering the word "Bold" in bold.

**Key Points:**

- `textContent` is safe and simple for plain text — never parses HTML tags.
- `innerHTML` parses HTML markup — powerful, but risky if used with untrusted user input (a security concern, see Topic 4).
- Prefer `textContent` unless you specifically need to insert actual HTML structure.

### Topic 2: Working with attributes

Theory:
`.getAttribute()`/`.setAttribute()` read/write any HTML attribute; many common attributes also have direct JavaScript properties (like `.src`, `.href`, `.disabled`).

Code Example:

```js
const img = document.querySelector("img");

console.log(img.getAttribute("src")); // reads the current src
img.setAttribute("src", "new-image.jpg"); // changes it
img.src = "another-image.jpg"; // equivalent shortcut property, for common attributes

const button = document.querySelector("button");
button.disabled = true; // disables the button directly
```

**Explanation:** `setAttribute`/`getAttribute` work generically for ANY attribute; direct properties like `.src`/`.disabled` are convenient shortcuts for the most commonly used ones.

**Key Points:**

- `setAttribute(name, value)`/`getAttribute(name)` work for any HTML attribute.
- Common attributes often have direct property shortcuts (`.src`, `.href`, `.disabled`, `.value`).
- Both approaches ultimately affect the same underlying attribute.

### Topic 3: Working with classes via `classList`

Theory:
`element.classList` provides methods to add, remove, toggle, and check CSS classes without manually manipulating the whole `className` string.

Code Example:

```js
const card = document.querySelector(".card");

card.classList.add("highlighted");
card.classList.remove("hidden");
card.classList.toggle("active"); // adds if missing, removes if present
console.log(card.classList.contains("highlighted")); // true
```

**Explanation:** `classList` methods let you manage individual classes cleanly, without worrying about accidentally overwriting other existing classes (a common problem with directly setting `className = "..."`).

**Key Points:**

- `.add()`/`.remove()`/`.toggle()`/`.contains()` are the standard `classList` methods.
- `.toggle()` is especially useful for show/hide or active/inactive UI states.
- Prefer `classList` methods over directly setting `element.className` to avoid accidentally clobbering other classes.

### Topic 4: Inline styles and security with `innerHTML`

Theory:
`element.style.propertyName` sets individual CSS properties directly (inline styles); `innerHTML` should be used cautiously with any user-provided content, due to XSS (Cross-Site Scripting) risk.

Code Example:

```js
const box = document.getElementById("box");
box.style.backgroundColor = "lightblue";
box.style.fontSize = "20px";

// SECURITY RISK - never do this with untrusted input:
// box.innerHTML = userProvidedText; // could inject malicious <script> content!
box.textContent = userProvidedText; // SAFE - always treats it as plain text
```

**Explanation:** CSS property names in JavaScript use camelCase (`backgroundColor`, not `background-color`); setting `innerHTML` directly from untrusted user input is a classic security vulnerability, since it could include malicious script content.

**Key Points:**

- `element.style.property` sets individual inline CSS properties, using camelCase names.
- NEVER set `innerHTML` directly from untrusted/unescaped user input — this is a genuine security risk (XSS).
- Use `textContent` for any user-provided text to stay safe by default.

## Recap

- `textContent` sets plain text safely; `innerHTML` parses actual HTML markup (use cautiously with user input).
- Attributes can be read/written via `getAttribute`/`setAttribute` or direct property shortcuts.
- `classList` methods (`add`/`remove`/`toggle`/`contains`) are the standard way to manage CSS classes.

## What's Next

Practice for today: `public/coding/JavaScript/day-093-dom-manipulation.md`. Day 94 covers creating and removing DOM elements dynamically.
