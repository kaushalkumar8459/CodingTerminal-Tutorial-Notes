---
title: Introduction to JavaScript
slug: day-001-introduction-to-javascript
dayLabel: Day 1
level: Beginner
estimatedMinutes: 25
order: 1
track: javascript
---

# Day 1 [Beginner]: Introduction to JavaScript

## Goal

Understand what JavaScript actually is, where it runs, and how to look at it using simple developer tools — before writing any real code.

## Prerequisites

- A computer with any web browser (Chrome, Edge, Firefox)
- No prior programming knowledge needed

## Explanation

JavaScript is a programming language. In very simple words, it is a set of instructions you write so that a computer (usually a browser) does something for you — show a message, change text on a page, calculate a total, react to a button click, and so on.

Long ago, browsers could only show static pages — text and images that never changed after loading. JavaScript was created to make web pages **interactive**: clickable, dynamic, and able to respond to the user. Today JavaScript is not limited to browsers — it also runs outside the browser using a program called **Node.js**, which lets JavaScript build servers, tools, and even mobile apps.

You will often see the word **ECMAScript**. Don't let it confuse you — ECMAScript is just the official "rulebook" (specification) that defines how JavaScript should behave. JavaScript is the actual language you write; ECMAScript is the standard document that JavaScript follows so it behaves the same way in every browser.

To actually run JavaScript, something needs to read your code and execute it. That "something" is called a **JavaScript engine**. Every browser has one built in:

- Chrome and Edge use an engine called **V8**
- Firefox uses **SpiderMonkey**
- Safari uses **JavaScriptCore**

Node.js also uses V8 internally — that's how the same JavaScript language can run both in a browser and on a server.

## Topic by Topic

### Topic 1: What is JavaScript and why does it matter?

Theory:
JavaScript is the language that makes web pages interactive. Without it, a webpage is just fixed text and images. With it, a page can respond to clicks, validate a form, update content without reloading, and talk to servers.

Practical:
Every time you see a dropdown menu open, a "like" button change color instantly, or a form show "this field is required" without reloading the page — that is JavaScript at work.

Code Example:

```html
<button onclick="alert('Hello! You clicked the button.')">Click Me</button>
```

**Explanation:** This one line of JavaScript (`alert(...)`) reacts to a click and shows a popup message. That reaction — code running because of a user action — is the core idea of JavaScript.

**Key Points:**

- JavaScript adds behavior and interactivity to otherwise static web pages.
- It runs in response to events like clicks, typing, or page loading.
- It is one of the three core web technologies, alongside HTML (structure) and CSS (style).

### Topic 2: JavaScript vs ECMAScript

Theory:
ECMAScript (often shortened to "ES") is the official specification/standard. JavaScript is the real-world language that implements that standard. When you hear "ES6" or "ES2015", people mean a specific yearly version of the ECMAScript rules that JavaScript follows.

Practical:
You don't need to memorize the ECMAScript document. You just need to know that new JavaScript features (like `let`, `const`, arrow functions, etc.) exist because a new ECMAScript version introduced them.

Code Example:

```js
// "let" and "const" were introduced by ES6 (ECMAScript 2015)
let score = 10;
const passingScore = 5;
```

**Explanation:** `let` and `const` are JavaScript keywords that exist because the ECMAScript standard added them in 2015. Before that, JavaScript only had `var`.

**Key Points:**

- ECMAScript = the rulebook/standard.
- JavaScript = the language that follows that rulebook.
- New JavaScript features usually map to a specific ECMAScript version (ES6, ES2020, etc.).

### Topic 3: Where JavaScript runs — Browser vs Node.js

Theory:
JavaScript originally only ran inside browsers, to control web pages. Node.js later made it possible to run JavaScript outside the browser — directly on a computer or server — without needing any web page at all.

Practical:

- **Browser JavaScript** can access the webpage (the DOM), show alerts, read what the user typed, etc. It cannot directly read/write files on your computer for security reasons.
- **Node.js JavaScript** can read/write files, create servers, connect to databases — but it has no webpage or `alert()` because there is no browser involved.

Code Example:

```js
// This works only in a browser (it needs a webpage)
document.body.style.backgroundColor = "lightblue";

// This works only in Node.js (it needs the file system)
// const fs = require("fs");
// fs.writeFileSync("notes.txt", "Hello from Node.js");
```

**Explanation:** Same language, two very different environments. The environment decides what extra tools/APIs are available to your JavaScript code.

**Key Points:**

- Browser JS = interacts with web pages (DOM, events, alerts).
- Node.js = runs JavaScript outside the browser (files, servers, tools).
- The core JavaScript language (variables, functions, loops) is identical in both.

### Topic 4: JavaScript engines and developer tools

Theory:
A JavaScript engine is the program that actually reads and runs your JavaScript code. Every browser has one built in. Developer tools let you see what your code is doing — very useful for learning and fixing mistakes.

Practical:
Open your browser's Developer Tools (press `F12` or right-click a page → "Inspect") and click the **Console** tab. This is where you can type JavaScript directly and instantly see the result — perfect for practicing.

Code Example:

```js
console.log("Hello, JavaScript!");
console.log(2 + 3);
```

**Explanation:** `console.log()` prints a value to the Console tab in developer tools. It is the most-used command for checking what your code is doing while you learn.

**Key Points:**

- Engines (V8, SpiderMonkey, JavaScriptCore) run your JavaScript code.
- Developer Tools → Console is where you test small pieces of code and see output.
- `console.log()` will be your best friend throughout this course.

## Recap

- JavaScript makes web pages interactive; ECMAScript is the standard it follows.
- JavaScript runs in browsers (V8, SpiderMonkey, JavaScriptCore) and outside browsers via Node.js.
- Use your browser's Console (`F12`) and `console.log()` to try out JavaScript as you learn.

## What's Next

Practice for today is in the coding track: `public/coding/JavaScript/day-001-variables-and-output.md`. Tomorrow's tutorial (Day 2) covers environment setup and writing your first real JavaScript program.
