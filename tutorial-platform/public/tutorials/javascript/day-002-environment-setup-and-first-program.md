---
title: Environment Setup and First Program
slug: day-002-environment-setup-and-first-program
dayLabel: Day 2
level: Beginner
estimatedMinutes: 30
order: 2
track: javascript
---

# Day 2 [Beginner]: Environment Setup and First Program

## Goal

Set up a comfortable place to write JavaScript, understand the three ways to add JavaScript to a page, write your first real program, and see how the browser actually executes your code.

## Prerequisites

- Day 1 (What is JavaScript, browser vs Node.js, console basics)
- VS Code installed (or any code editor)
- A modern browser (Chrome, Edge, Firefox)

## Explanation

To write JavaScript comfortably, you need two things: a place to **write** code and a place to **run/see** it. **VS Code** is the editor most developers use to write code — it has syntax highlighting, autocomplete, and useful extensions. To **run and see** the result, you use your browser, along with its built-in **Developer Tools** (press `F12` or right-click → Inspect).

There are three ways to add JavaScript to a webpage:

1. **Inline** — JavaScript written directly inside an HTML tag's attribute (e.g. `onclick="..."`). Quick, but messy for anything beyond a one-liner.
2. **Internal** — JavaScript written inside a `<script>` tag directly in the HTML file.
3. **External** — JavaScript written in a separate `.js` file and linked using `<script src="file.js"></script>`. This is the standard approach for real projects because it keeps HTML and JavaScript organized separately.

Once the browser loads a page, it reads the HTML from top to bottom. When it reaches a `<script>` tag, it stops and runs that JavaScript before continuing (unless you use `defer` or `async`, which we won't worry about yet). This "top to bottom, one line at a time" behavior is why the **placement** of your `<script>` tag matters.

## Topic by Topic

### Topic 1: VS Code and Browser DevTools

Theory:
VS Code is where you write and organize your code. Browser DevTools is where you observe what your code actually does — including any errors.

Practical:
Open any webpage, press `F12`, and click the **Console** tab. Any `console.log()` in the page's JavaScript will print here. This is the fastest way to check if your code works.

Code Example:

```js
console.log("Setup check: JavaScript is running!");
```

**Explanation:** If you see this text appear in the Console tab, your JavaScript is connected and running correctly.

**Key Points:**

- VS Code = write code. Browser DevTools = observe/debug code.
- The Console tab is where `console.log()` output appears.
- Errors also show in the Console, in red — always read them, they usually tell you exactly what's wrong.

### Topic 2: Inline, Internal, and External JavaScript

Theory:
JavaScript can live in three places: directly inside an HTML attribute (inline), inside a `<script>` tag in the HTML (internal), or in its own `.js` file (external).

Practical:
Use external JavaScript for anything beyond a quick test — it's easier to read, reuse, and maintain.

Code Example:

```html
<!-- 1. Inline -->
<button onclick="console.log('Inline click')">Inline</button>

<!-- 2. Internal -->
<script>
  console.log("Internal script running");
</script>

<!-- 3. External -->
<script src="app.js"></script>
```

**Explanation:** All three run JavaScript, but external (`app.js`) is the standard for real projects — it keeps your HTML clean and your JavaScript reusable across pages.

**Key Points:**

- Inline: fine for tiny demos, avoid in real projects.
- Internal: okay for a single small page.
- External: preferred — separate file, reusable, easier to maintain.

### Topic 3: Your First JavaScript Program

Theory:
A "program" here just means a small piece of JavaScript that does something specific and visible — printing output is the simplest starting point.

Practical:
Create a file called `app.js`, write a couple of lines, and link it to an HTML file (or just run it directly in Node.js if installed).

Code Example:

```js
// app.js
console.log("My first JavaScript program");

let city = "Delhi";
console.log("I am learning JavaScript in " + city);
```

**Explanation:** This program stores a value in a variable and combines it with text using `+`, then prints the result. Every JavaScript program you write is just a sequence of steps like this — declare data, do something with it, show the result.

**Key Points:**

- A `.js` file is just plain text with JavaScript instructions.
- `console.log()` is your main tool for seeing what's happening while learning.
- Small, simple programs are the best way to build confidence early on.

### Topic 4: How JavaScript Code Executes

Theory:
The browser (or Node.js) reads your JavaScript **top to bottom, one statement at a time**, in the order it appears — unless something (like a function) tells it to jump elsewhere.

Practical:
If your `<script>` tag is placed _before_ the HTML elements it needs to interact with, it might run before those elements even exist. This is a common beginner mistake.

Code Example:

```js
console.log("Step 1");
console.log("Step 2");
console.log("Step 3");
// Output is always Step 1, Step 2, Step 3 — in that exact order
```

**Explanation:** JavaScript doesn't skip around randomly. Understanding this "one line after another" execution order is the foundation for understanding loops, functions, and later, asynchronous code.

**Key Points:**

- Code runs top to bottom, in order, by default.
- Placement of `<script>` tags matters when your code needs to touch the page's HTML.
- This predictable order is what makes debugging with `console.log()` so effective — you can always trace exactly what ran and when.

## Recap

- VS Code is for writing code; browser DevTools (Console tab) is for observing it.
- JavaScript can be inline, internal, or external — external is the standard for real projects.
- Code executes top to bottom, one statement at a time.

## What's Next

Practice for today is in the coding track: `public/coding/JavaScript/day-002-data-types.md`. Tomorrow's tutorial (Day 3) covers JavaScript syntax basics — statements, expressions, comments, and naming conventions.
