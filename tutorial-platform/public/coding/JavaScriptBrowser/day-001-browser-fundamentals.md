# Day 001 — Browser Fundamentals

## Browser Environment

1. Explain the browser as a runtime environment for JavaScript.
2. Compare the Window object, Document object, and Browser APIs.
3. Explain the difference between BOM and DOM.
4. Identify common global browser APIs.
5. Explain how JavaScript interacts with HTML and CSS.

## Page Lifecycle

6. Explain HTML parsing at a high level.
7. Explain DOM construction.
8. Explain when scripts execute during page loading.
9. Compare normal, `defer`, and `async` scripts.
10. Explain `DOMContentLoaded` vs `load`.

## Global Objects

11. Use `window`, `document`, `location`, `history`, and `navigator`.
12. Explain why browser globals should not be confused with JavaScript language features.
13. Understand that some Web APIs are browser-specific rather than part of ECMAScript.

## Interview Questions

14. What is the BOM?
15. What is the DOM?
16. DOM vs BOM?
17. What does `DOMContentLoaded` mean?
18. What is the difference between `async` and `defer`?
19. What happens when a browser loads a webpage?

## Practice

Build a page that reports document readiness, current URL, viewport size, and navigation information without blocking initial rendering.

<!-- codingterminal-solution:start -->

# Day 001 Solutions — Browser Fundamentals

## async vs defer

For classic external scripts:

- `async`: downloads in parallel and executes as soon as ready; execution can interrupt parsing.
- `defer`: downloads in parallel but executes after HTML parsing, before DOMContentLoaded.

Example:

```html
<script src="analytics.js" async></script>
<script src="app.js" defer></script>
```

## DOMContentLoaded vs load

`DOMContentLoaded` means the HTML document has been parsed and deferred scripts have completed. `load` waits for the page's dependent resources such as images and stylesheets.

## Practice

```js
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready");
});

window.addEventListener("load", () => {
  console.log("Page resources loaded");
});

console.log(location.href);
console.log(innerWidth, innerHeight);
```

<!-- codingterminal-solution:end -->

